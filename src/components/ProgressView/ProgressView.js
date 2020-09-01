import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

import * as Constants from '../../constants/styleConstants'

import { _getOption, _listenForChanges } from '../../util/database'

const Column = ({color, percent, stickies}) => {
  return (
    <View style={[ styles.column, { height: percent+"%", backgroundColor: color }]}>
      <Text style={{ color: "white", fontWeight: "700" }}>{ stickies }</Text>
    </View>
  )
}

class ProgressView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedDeck: ""
    }
    this.updateSelectedDeck = this.updateSelectedDeck.bind(this)
  }

  updateSelectedDeck() {
    _getOption("SelectedDeck").then(res => {
      console.log(res)
      this.setState({selectedDeck: res.value})
    }).catch(err => {console.log(err)})
  }

  componentDidMount() {
    this.updateSelectedDeck()
    _listenForChanges().on('change', change => {
      console.log(change)
      this.updateSelectedDeck()
    })
  }

  render() {
    return(
      <View>
        <Text>{ this.state.selectedDeck || "" }</Text>
        <View style={styles.progressViewContainer}>
          <Column color={Constants.c_level1} stickies={9999} percent={20} />
          <Column color={Constants.c_level2} stickies={9999} percent={40} />
          <Column color={Constants.c_level3} stickies={9999} percent={32} />
          <Column color={Constants.c_level4} stickies={9999} percent={27} />
          <Column color={Constants.c_level5} stickies={9999} percent={100} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  progressViewContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 250,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
    backgroundColor: "white",
    shadowColor: "black",

  },
  column: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    flexBasis: "10%",
    flexGrow: 1,
    marginHorizontal: 5,
    paddingBottom: 10
  }
})

export default ProgressView