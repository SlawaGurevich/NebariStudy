import PouchDB from 'pouchdb-react-native'

import Dict from './Dict'

import * as wanakana from 'wanakana';

PouchDB.plugin(require('pouchdb-upsert'));
PouchDB.plugin(require('pouchdb-find'));

const db = new PouchDB('mydb')

PouchDB.replicate('mydb', 'http://localhost:5984/mydb', {live: true});

// Decks

const _addDeck = (name, cards = []) => {
  db.put({
    _id: "Deck"+name,
    type: "Deck",
    name: name,
    cardList: cards,
  }).then((doc) => {
    // console.log(doc)
  }).catch((err) => {
    console.log(err)
  })
}

const _getDecks = () => {
  return db.find({
    selector: {type: "Deck"}
  })
}

const _getDeck = (name) => {
  return db.get("Deck"+name)
}

const _deleteDeck = (name) => {
  return db.get("Deck"+name).then(doc => {
    // console.log("doc")
    // console.log(name)
    return db.remove(doc._id, doc._rev)
  })
}

const _deleteAllDecks = () => {
  return db.find({
    selector: {type: "Deck"}
  }).then( doc => {
    db.remove(doc)
  })
}

// Cards

const _addCard = (doc, wordtype) => {
  doc.type = "Card"
  doc.wordtype = wordtype
  doc._id = doc.entry
  doc.timesRight = 0
  doc.timesWrong = 0
  doc.timesStudied = 0
  doc.lastStudied = null
  doc.level = 1

  return db.put({...doc})
}

const _getCard = (entry) => {
  return db.get(entry)
}

const _getRelatedCards = (kanji, limit = 9999) => {
  return db.find({
    selector: {
      type: "Card",
      _id: {$regex: `${kanji}+`, $ne: kanji},
    },
    limit: limit
  })
}

const _getCards = (array) => {
  return db.find({
    selector: {
      type: "Card",
      _id: {$in: array}
    }
  })
}

const _getAllCards = () => {
  return db.find({
    selector: {
      type: "Card"
    }
  })
}

const _getCardsFromDeck = (deck) => {
  return db.find({
    selector: { type: "Deck", name: deck }
  })
}

const _setOption = (name, kind, value) => {
  return db.upsert("Option"+name, (doc) => {
    doc.kind = kind
    doc.value = value
    doc.type = "Option"
    // console.log(doc)
    return doc
  })
}

// Options

const _getOption = (name) => {
  return db.get("Option"+name)
}

const _removeOption = (name) => {
  db.get("Option"+name).then((doc) => {
    return db.remove(doc)
  }).then( (doc) => {
    // console.log(doc)
  }).catch( (err) => {
    console.log(err)
  })
}

// Dictionary

const _dictionarySearch = (search) => {
  let isKanji = wanakana.isKanji(search)
  let isRomaji = wanakana.isRomaji(search)
  let isHiragana = wanakana.isHiragana(search)
  let isKatakana = wanakana.isKatakana(search)

  if ( isKanji ) {
    return db.find({
      selector: {
        type: "Card",
        _id: {$regex: `${search}`},
      },
    })
  // } else if (isRomaji) {
  //   return db.find({
  //     selector: {
  //       _id: { $eq: "日" }
  //     }
  //   })
  } else {
    return db.find({
      selector: {
        type: "Card",
        $or: [
          {
            entry: {$regex: `(${search})+`}
          },
          {
            meanings: {$elemMatch: search}
          },
          {
            readings_on: {$regex: `${wanakana.toHiragana(search)}`}
          },
          {
            readings_kun: {$regex: `${wanakana.toHiragana(search)}`}
          },
          {
            readings: {$regex: `${wanakana.toHiragana(search)}`}
          }
        ]
      }
    })
  }
}

// Listener

const _listenForChanges = () => {
  return db.changes({
    since: 'now'
  })
}

// Debug

const _firstTimeSetup = () => {
  let kanji = Dict.getAllKanjiAsArray()
  let vocab = Dict.getAllVocab()

  for (let i = 0; i < 1000; i++) {
    _addCard(kanji[i], "Kanji").then(doc => {
      console.log(doc)
    }).catch(err => {
      console.log(err)
    })
  }

  for (let i = 0; i < 1000; i++) {
    _addCard(vocab[i], "Vocab").then(doc => {
      console.log(doc)
    }).catch(err => {
      console.log(err)
    })
  }

  createDecks()
}

const createDecks = () => {
  _addDeck("N1 Kanji", Dict.getAllKanjiOfJlptLevel(1))
  _addDeck("N2 Kanji", Dict.getAllKanjiOfJlptLevel(2))
  _addDeck("N3 Kanji", Dict.getAllKanjiOfJlptLevel(3))
  _addDeck("N4 Kanji", Dict.getAllKanjiOfJlptLevel(4))
  _addDeck("N5 Kanji", Dict.getAllKanjiOfJlptLevel(5))

  _addDeck("N1 Vocab", Dict.getAllVocabOfJlptLevel(1))
  _addDeck("N2 Vocab", Dict.getAllVocabOfJlptLevel(2))
  _addDeck("N3 Vocab", Dict.getAllVocabOfJlptLevel(3))
  _addDeck("N4 Vocab", Dict.getAllVocabOfJlptLevel(4))
  _addDeck("N5 Vocab", Dict.getAllVocabOfJlptLevel(5))
}

const _destroyDb = () => {
  db.destroy().then(() => {
    console.log("destroyed")
  }).catch((err) => {
    console.log(err)
  })
}

export {  _addCard,
          _destroyDb,
          _getAllCards,
          _getCard,
          _getCards,
          _getRelatedCards,
          _getOption,
          _addDeck,
          _deleteDeck,
          _getDecks,
          _getDeck,
          _getCardsFromDeck,
          _setOption,
          _removeOption,
          _dictionarySearch,
          _firstTimeSetup,
          _listenForChanges }