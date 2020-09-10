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
    borderRadius: Constants.c_borderRadiusDefault,
    borderWidth: 1,
    borderColor: Constants.c_coral,
    backgroundColor: Constants.c_fluffy
  },
  progressBarInner: {
    position: "absolute",
    height: '100%',
    left: 0,
    borderTopRightRadius: Constants.c_borderRadiusDefault,
    borderBottomRightRadius: Constants.c_borderRadiusDefault,
    backgroundColor: Constants.c_coral
  },
  progressBarLabel: {

  }
})

export default ProgressBar