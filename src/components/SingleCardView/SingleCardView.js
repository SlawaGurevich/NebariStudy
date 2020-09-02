import React, { useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import * as Constants from '../../constants/styleConstants'
import Icon from 'react-native-vector-icons/FontAwesome';
import * as wanakana from 'wanakana';


import {
  Text,
  View,
  StyleSheet
} from 'react-native'
import { withSafeAreaInsets } from 'react-native-safe-area-context'


const SingleCardView = ({ route, navigation}) => {
  let color
  const [isFlipped, setIsFlipped] = useState(false)

  const revealCard = () => {
    setIsFlipped(true)
  }

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
    <TouchableWithoutFeedback onPress={revealCard}>
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
                <Text style={styles.contentText}>{route.params.word}</Text>
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
            { route.params.word.split("").map((letter, i) => (
              <View key={i} style={styles.sectionEntry}>
                <Text style={sectionStyles.kanji}>{letter}</Text>
                <View style={{flexGrow: 1}}>
                  <View style={{display: "flex", flexDirection: "row"}}>
                    <Text style={{fontWeight: "700", color: Constants.c_opal}}>オン</Text>
                    <Text style={{fontWeight: "700", color: Constants.c_sage, marginLeft: 5}}>くん</Text>
                  </View>
                  <Text>Translation</Text>
                </View>
                <Icon name="angle-right" size={20} color={Constants.c_ash_gray} />
              </View>
            )) }
          </View> }
      </View>
    </TouchableWithoutFeedback>
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
    fontSize: 70
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
  },
  headline: {
    color: Constants.c_ash_gray,
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: Constants.c_ash_gray
  },
  sectionEntry: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: Constants.c_ash_gray
  }
})

export default SingleCardView