import Vasern from 'vasern'

var OptionsSchema = {
  name: "Options",
  props: {
    name: "string",
    value: "?string"
  }
}

var KanjiCardSchema = {
  name: "Card",
  props: {
    dictionaryEntry: "string",
    level: "?int"
  }
}

var DeckSchema = {
  name: "Deck",
  props: {
    name: "string",
    cards: "[]#Card"
  }
}

const VasernDB = new Vasern({
  schemas: [OptionsSchema, KanjiCardSchema, DeckSchema],
  version: 1
})

export default VasernDB