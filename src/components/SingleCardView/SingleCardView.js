import React, { useState, useEffect } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import * as Constants from '../../constants/styleConstants'
import Icon from 'react-native-vector-icons/FontAwesome';
import * as wanakana from 'wanakana';


import {
  Text,
  View,
  StyleSheet
} from 'react-native'

import { _getCards } from '../../util/database'


const SingleCardView = ({ route, navigation }) => {
  let color
  const [kanji, setKanji] = useState([])

  useEffect(() => {
    let usedKanji = route.params.word.split("").filter(char => wanakana.isKanji(char))
    _getCards(usedKanji).then(kn => {
      setKanji(kn.docs)
    })
    .catch(err => { console.log(err) })
  }, [])

  switch (route.params.level) {
    case 1:
      color = Constants.c_level1
      break;
    case 2:
      color = Constants.c_level2
      break;
    case 3:
      color = Constants.c_level3
      break;
    case 4:
      color = Constants.c_level4
      break;
    case 5:
      color = Constants.c_level5
      break;
  }

  return (
    <View style={styles.container}>
        <View style={[styles.header, {backgroundColor: color}]}>
          <Text style={styles.headerText}>{route.params.id}</Text>
        </View>
        <View style={styles.content}>
          { route.params.wordtype == "Kanji" ?
            <View style={styles.kanjiView}>
              <Text style={styles.contentText}>{route.params.word}</Text>
              <View style={{marginLeft: 20}}>
                <Text style={styles.readingText}>{wanakana.toKatakana( route.params.readings[0].join(", ") )}</Text>
                <Text style={styles.readingText}>{route.params.readings[1].join(", ")}</Text>
              </View>
            </View>
            :
            <View>
              <Text style={styles.contentText} numberOfLines={1} adjustsFontSizeToFit={true}>{route.params.word}</Text>
              <Text style={styles.readingText}>{wanakana.tokenize(route.params.readings).filter(word => wanakana.isHiragana(word)) }</Text>
            </View>
          }
          <Text style={styles.meaningText}>
            {route.params.meanings.join(", ")}
          </Text>
        </View>
        { route.params.wordtype == "Vocab" && <View style={styles.section}>
          <View>
            <Text style={styles.headline}>Kanji</Text>
          </View>
          { kanji.length > 0 ? kanji.map((card, i) => (
            <TouchableWithoutFeedback key={i} onPress={() => { navigation.push("SingleCardView", {
                word: card.entry,
                level: card.level,
                id: card.entry,
                readings: [card.readings_on, card.readings_kun],
                wordtype: card.wordtype,
                meanings: card.meanings
              }) }}>
              <View style={styles.sectionEntry}>
                <Text style={sectionStyles.kanji}>{card.entry}</Text>
                <View style={{flexGrow: 1, flexShrink: 1}}>
                  <View style={{display: "flex", flexDirection: "row"}}>
                    <Text numberOfLines={1} style={{fontWeight: "700",
                                                    color: Constants.c_ming }}>
                      { card.readings_on.map(k => wanakana.toKatakana(k)).join("、") }
                    </Text>
                    <Text numberOfLines={1} style={{fontWeight: "700",
                                  color: Constants.c_indian_red,
                                  marginLeft: 10,
                                  flexShrink: 1
                                  }}>
                      { card.readings_kun.join("、") }
                    </Text>
                  </View>
                  <Text numberOfLines={1} style={styles.sectionEntryMeanings}>{ card.meanings.join(", ") }</Text>
                </View>
                <Icon style={{ marginLeft: 5 }} name="angle-right" size={20} color={ Constants.c_ash_gray } />
              </View>
            </TouchableWithoutFeedback>
          )) : <View style={[styles.sectionEntry, {borderBottomWidth: 0}]}><Text style={{color: Constants.c_light_gray}}>Loading...</Text></View>}
        </View> }
        <View style={styles.section}>
          <View>
            <Text style={styles.headline}>Stats</Text>
          </View>
          <View style={styles.sectionEntry} >
            <Text style={{flexGrow: 1}}>Times Wrong</Text><Text style={{fontWeight: "bold"}}>0</Text>
          </View>
          <View style={styles.sectionEntry} >
            <Text style={{flexGrow: 1}}>Times Right</Text><Text style={{fontWeight: "bold"}}>0</Text>
          </View>
          <View style={styles.sectionEntry} >
            <Text style={{flexGrow: 1}}>Last studied</Text><Text style={{fontWeight: "bold"}}>3 days ago</Text>
          </View>
        </View>
    </View>
  )
}

let sectionStyles = StyleSheet.create({
  kanji: {
    fontSize: 30,
    marginRight: 10
  }
})

let styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
    backgroundColor: "white",
    borderRadius: 6,
    overflow: "hidden"
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  kanjiView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    textAlign: "left"
  },
  headerText: {
    color: "white",
    fontWeight: "700"
  },
  content: {
    display: "flex",
    alignItems: "center",
    padding: 20,
  },
  contentText: {
    fontSize: 70,
    paddingHorizontal: 20
  },
  readingText: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center"
  },
  meaningText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
    lineHeight: 26
  },
  section: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    paddingHorizontal: 20,
    marginBottom: 20
  },
  headline: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Constants.c_ash_gray,
    color: Constants.c_ash_gray,
    textAlign: "center"
  },
  sectionEntryMeanings: {
    flexShrink: 1,
    flexGrow: 0,
    fontSize: Constants.fz_md,
    marginRight: 5
  },
  sectionEntry: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: Constants.c_ash_gray,
    overflow: "hidden"
  }
})

export default SingleCardView