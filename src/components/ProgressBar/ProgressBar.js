import React from 'react'

import { StyleSheet, View, Text } from 'react-native'
import * as Constants from '../../constants/styleConstants'

const ProgressBar = ({ progress }) => {
  return (
    <View style={styles.progressBar}>
      <View style={[ styles.progressBarInner, {width: progress + "%"} ]} ></View>
      <Text style={styles.progressBarLabel}>{ progress }%</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  progressBar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 40,
    marginBottom: 10,
    borderRadius: Constants.c_borderRadiusDefault,
    borderWidth: 1,
    borderColor: Constants.c_highlight,
    overflow: "hidden"
  },
  progressBarInner: {
    position: "absolute",
    height: '100%',
    left: 0,
    backgroundColor: Constants.c_highlight
  },
  progressBarLabel: {
    color: Constants.c_blueish_gray,
    fontWeight: "bold"
  }
})

export default ProgressBar