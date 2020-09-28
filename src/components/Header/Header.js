import React from 'react'

import { StyleSheet,
         Text,
         View } from 'react-native'

import * as Constants from '../../constants/styleConstants'

const Placeholder = () => {
  return (
    <View style={styles.placeholder}></View>
  )
}

const Header = ({leftItem, title, rightItem}) => {
  return (
    <View style={styles.header}>
      { leftItem ? leftItem : <Placeholder /> }
      { title ? <Text style={{fontWeight: "bold", color: "#000"}}>{title}</Text> : <Placeholder /> }
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
    height: 60,
    flexBasis: 50,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 20,
    shadowColor: "#eeeeee",
    shadowOffset: {
      width: 7,
      height: 7,
    },
    shadowOpacity: .1,
    shadowRadius: 4,
    elevation: 15,
  },
  placeholder: {
    width: 20,
    height: "100%",
  }
})

export default Header