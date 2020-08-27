import React from 'react'

import { StyleSheet, View, Text } from 'react-native'
import * as Constants from '../../constants/styleConstants'

const ProgressBar = ({ progress }) => {
  return (
    <View style={styles.progressBar}>
      <View style={[ styles.progressBarInner, {width: progress + "%"} ]} >
        <Text style={styles.progressBarLabel}>{ progress }</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  progressBar: {
    width: "100%",
    height: 40,
    borderRadius: Constants.c_borderRadiusDefault,
    borderWidth: 1,
    borderColor: Constants.c_dark_olive_green,
    backgroundColor: Constants.c_sage
  },
  progressBarInner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: '100%',
    borderRadius: Constants.c_borderRadiusDefault,
    backgroundColor: Constants.c_dark_olive_green
  },
  progressBarLabel: {
    color: "white"
  }
})

export default ProgressBar