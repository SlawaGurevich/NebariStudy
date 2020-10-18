import React from 'react'
import { StyleSheet } from 'react-native'
import * as Constants from './styleConstants'
import Androw from 'react-native-androw'

const globalStyles = StyleSheet.create({
  generalView: {
    display: 'flex',
    justifyContent: "flex-start",
    height: "100%",
    overflow: "scroll"
  },
  cardView: {
    marginBottom: 20,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    overflow: "hidden",
  },
  cardViewListItem: {
    display: "flex",
    flexDirection: "row",
    height: 20,
  },
  cardViewListItemLeft: {
    flexGrow: 1
  },
  cardViewListItemRight: {
    flexGrow: 0,
    color: Constants.c_dark_blue,
    fontWeight: "600"
  },
  cardViewSeparator: {
    width: "100%",
    height: 1,
    backgroundColor: Constants.c_light_gray,
    marginVertical: 10
  },
  loadingView: {
    display: "flex",
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonActive: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: Constants.s_grid_row,
    backgroundColor: Constants.c_highlight,
    borderRadius: Constants.c_borderRadiusDefault
  },
  separatorBright: {
    width: "100%",
    height: 1,
    marginVertical: 10,
    backgroundColor: Constants.c_light_gray
  },
  cardShadowDefault: {
    shadowColor: Constants.c_coral,
    shadowOffset:{
      width: 0,
      height: 5,
    },
    shadowOpacity: .4,
    shadowRadius: 4
  }
})

export default globalStyles