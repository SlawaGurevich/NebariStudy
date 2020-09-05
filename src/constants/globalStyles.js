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
  loadingView: {
    display: "flex",
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  }
})

export default globalStyles