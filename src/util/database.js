import PouchDB from 'pouchdb-react-native'

import Dict from './Dict'

PouchDB.plugin(require('pouchdb-upsert'));
PouchDB.plugin(require('pouchdb-find'));

const db = new PouchDB('mydb')

PouchDB.replicate('mydb', 'http://localhost:5984/mydb', {live: true});

const _addDeck = (name, cards = []) => {
  db.put({
    _id: "Deck"+name,
    type: "Deck",
    name: name,
    cardList: cards,
  }).then((doc) => {
    console.log(doc)
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
    console.log("doc")
    console.log(name)
    return db.remove(doc._id, doc._rev)
  })
}

const _getCardsFromDeck = (array) => {
  return db.find({
    selector: {
      $or:[
        {
          type: "Card",
          wordtype: "Kanji",
          freq: { $in: array}
        },
        {
          type: "Card",
          wordtype: "Vocab",
          id: { $in: array}
        }
      ]
    }
  })
}

const _deleteAllDecks = () => {
  return db.find({
    selector: {type: "Deck"}
  }).then( doc => {
    db.remove(doc)
  })
}

const _dictionarySearch = (search) => {
  db.find({
    selector: {
      $or: {

      }
    }
  })
}

const _setOption = (name, kind, value) => {
  db.upsert("Option"+name, (doc) => {
    doc.kind = kind
    doc.value = value
    doc.type = "Option"
    console.log(doc)
    return doc
  }).then((res) => {
    console.log(res)
  }).catch( (err) => {
    console.log(err)
  } )
}

const _listenForChanges = () => {
  return db.changes({
    since: 'now'
  })
}

const _getOption = (name) => {
  return db.get("Option"+name)
}

const _removeOption = (name) => {
  db.get("Option"+name).then((doc) => {
    return db.remove(doc)
  }).then( (doc) => {
    console.log(doc)
  }).catch( (err) => {
    console.log(err)
  })
}

const _addCard = (doc, wordtype) => {
  doc.type = "Card"
  doc.wordtype = wordtype
  doc.timesRight = 0
  doc.timesWrong = 0
  doc.timesStudied = 0
  doc.lastStudied = null
  doc.level = 1

  db.post({...doc}).then((doc)=>{
    console.log(doc)
  }).catch((err) => {
    console.log(err)
  })
}

const _getAllCards = () => {
  return db.find({
    selector: {
      type: "Card"
    }
  })

  // db.allDocs({
  //   include_docs: true,
  //   attachments: true
  // }).then(function (result) {
  //   console.log(result)
  // }).catch(function (err) {
  //   console.log(err);
  // });
}

const _firstTimeSetup = () => {
  let kanji = Dict.getAllKanjiAsArray()
  let vocab = Dict.getAllVocab()

  for (let i = 0; i < 1000; i++) {
    _addCard(kanji[i], "Kanji")
  }

  for (let i = 0; i < 1000; i++) {
    _addCard(vocab[i], "Vocab")
  }

  createDecks()
}

const createDecks = () => {
  _addDeck("N1 Kanji", Dict.getAllKanjiOfJlptLevel(1).map(kanji => kanji.freq))
  _addDeck("N2 Kanji", Dict.getAllKanjiOfJlptLevel(2).map(kanji => kanji.freq))
  _addDeck("N3 Kanji", Dict.getAllKanjiOfJlptLevel(3).map(kanji => kanji.freq))
  _addDeck("N4 Kanji", Dict.getAllKanjiOfJlptLevel(4).map(kanji => kanji.freq))
  _addDeck("N5 Kanji", Dict.getAllKanjiOfJlptLevel(5).map(kanji => kanji.freq))

  _addDeck("N1 Vocab", Dict.getAllVocabOfJlptLevel(1).map(vocab => vocab.id))
  _addDeck("N2 Vocab", Dict.getAllVocabOfJlptLevel(2).map(vocab => vocab.id))
  _addDeck("N3 Vocab", Dict.getAllVocabOfJlptLevel(3).map(vocab => vocab.id))
  _addDeck("N4 Vocab", Dict.getAllVocabOfJlptLevel(4).map(vocab => vocab.id))
  _addDeck("N5 Vocab", Dict.getAllVocabOfJlptLevel(5).map(vocab => vocab.id))
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
          _getOption,
          _addDeck,
          _deleteDeck,
          _getDecks,
          _getDeck,
          _getCardsFromDeck,
          _setOption,
          _removeOption,
          _firstTimeSetup,
          _listenForChanges }