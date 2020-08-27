import React from 'react'

import {
  Text,
  View,
  StyleSheet
} from 'react-native'

const SingleCardView = ({ route, navigation}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text>{route.params.id}</Text>
      </View>
      <View>
        <Text>{route.params.word}</Text>
      </View>
    </View>
  )
}

let styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
    padding: 20,
    backgroundColor: "white",

  }
})

export default SingleCardView