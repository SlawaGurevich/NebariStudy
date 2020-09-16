import { StyleSheet } from 'react-native'
import * as Constants from './styleConstants'

const globalStyles = StyleSheet.create({
  generalView: {
    display: 'flex',
    justifyContent: "flex-start",
    height: "100%",
    padding: 10,
    overflow: "scroll"
  },
  cardView: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "white",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: .1,
    shadowRadius: 4,
    elevation: 5,
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
  }
})

export default globalStyles