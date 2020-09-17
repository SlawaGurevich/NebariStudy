import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import * as Constants from '../../../constants/styleConstants'
import * as wanakana from 'wanakana';

const StickyThumb = ({ word, level, id, readings }) => {
  let color = "white"
  let cardSize = ( Math.floor(Dimensions.get('window').width) - (2 * 20) - (3 * 10) ) / 4

  switch (level) {
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
    <View style={[ styles.sticky, { width: cardSize, height: cardSize }]}>
      <Text style={[ styles.header, {backgroundColor: color}]}>{ id+1 }</Text>
      <View style={styles.wordContainer}>
        <Text adjustsFontSizeToFit={true} numberOfLines={1} style={styles.word}>{ word }</Text>
        <Text numberOfLines={1} adjustsFontSizeToFit={true} style={styles.meanings}>{ readings }</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  sticky: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 1,
    borderRadius: 6,
    overflow: "hidden",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: .05,
    shadowRadius: 2,
    elevation: 6,
  },
  header: {
    width: "100%",
    textAlign: "center",
    color: "white",
    fontWeight: "700"
  },
  wordContainer:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  word: {
    textAlign: "center",
    textAlignVertical: "center",
    paddingHorizontal: 5,
    fontSize: 22,
    fontWeight: "600",
  },
  meanings: {
    color: "#666",
    paddingHorizontal: 5
  }
})

export default StickyThumb