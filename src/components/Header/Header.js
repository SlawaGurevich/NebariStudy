import React from 'react'

import { StyleSheet,
         View } from 'react-native'

import * as Constants from '../../constants/styleConstants'

const Placeholder = () => {
  return (
    <View style={styles.placeholder}></View>
  )
}

const Header = ({leftItem, centerItem, rightItem}) => {
  return (
    <View style={styles.header}>
      { leftItem ? leftItem : <Placeholder /> }
      { centerItem ? centerItem : <Placeholder /> }
      { rightItem ? rightItem : <Placeholder /> }
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    backgroundColor: Constants.c_ash_gray,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  placeholder: {
    width: 20,
    height: "100%",
  }
})

export default Header