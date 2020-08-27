import React from 'react'

import Swiper from 'react-native-deck-swiper'

import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

const DATA = [
  "Test", "asd", "mnore", "giv", "me"
]

const HistoryScreen = () => {
  return (
    <View style={[ styles.container ]}>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white"
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  }
});

export default HistoryScreen