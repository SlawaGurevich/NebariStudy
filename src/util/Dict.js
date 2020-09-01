import Kanji from '../libs/language/jmdict.kanji.json'
import Words from '../libs/language/anki.vocab.json'

const Dict = {
  getAllKanji: function() {
    return Kanji
  },

  getAllKanjiAsArray: function() {
    return Object.keys(Kanji).map( (kanjiKey) => ( this.appendingName(kanjiKey) ) )
  },

  getOneKanji: function(kanjiKey) {
    return this.appendingName(kanjiKey)
  },

  getKanjiWithMeaning: function(meaning) {
    return this.getAllKanjiAsArray().filter( (kanji) => {
      return kanji['meanings'].filter( (mn) => mn.toLowerCase().includes(meaning.toLowerCase()) ).length > 0
    } )
  },

  getAllKanjiOfJlptLevel: function(level) {
    return this.getAllKanjiAsArray().filter( (kanji) => kanji.jlpt_new == level)
  },

  getAllVocabOfJlptLevel: function(level) {
    return this.getAllVocab().filter(vocab => vocab.jlpt_new == level)
  },

  getAllVocab: function() {
    return Words
  },

  appendingName(kanjiKey) {
    let obj = Kanji[kanjiKey]
    obj['entry'] = kanjiKey;
    return obj
  },

}

export default Dict