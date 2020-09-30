import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

import _ from "lodash"

import * as Constants from '../../constants/styleConstants'

import { _getDeck, _getOption, _getCardsFromDeck } from '../../util/database'

const Column = ({color, percent, stickies}) => {
  return (
    <View style={[ styles.column, { height: percent+"%", backgroundColor: color }]}>
      <View style={{ width: "100%", height: 2, backgroundColor: "white" }}></View>
      <Text style={{ color: "white", fontWeight: "700", paddingVertical: 5 }}>{ stickies }</Text>
    </View>
  )
}

class ProgressView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cardLevels: [],
      selectedDeck: props.selectedDeck
    }
  }

  componentDidMount() {
    this.getNumberOfCardsByLevel()
  }

  componentDidUpdate(previousProps, previousState) {
    if( previousProps.selectedDeck != this.props.selectedDeck ) {
      this.getNumberOfCardsByLevel()
    }
  }

  getNumberOfCardsByLevel() {
    let cards = this.props.selectedDeck ? this.props.selectedDeck.cardList : []

    if ( cards.length > 0 ){
      let cardLevels = {}

      // console.log("cards")
      // console.log(cards.map(ca => ca.level))

      cardLevels.level1 = cards.filter(card => card.level == 1 || card.level == null).length
      cardLevels.level2 = cards.filter(card => card.level == 2).length
      cardLevels.level3 = cards.filter(card => card.level == 3).length
      cardLevels.level4 = cards.filter(card => card.level == 4).length
      cardLevels.level5 = cards.filter(card => card.level == 5).length
      cardLevels.total = cards.length || 0

      this.setState({cardLevels: cardLevels})
    }
  }

  render() {
    return(
      <View style={styles.viewOuter}>
        <Text style={styles.viewHeaderText}>{ this.props.selectedDeck ? this.props.selectedDeck.name : "loading..." }</Text>
        { this.props.selectedDeck ? <View style={styles.progressViewContainer}>
          <Column color={Constants.c_level1} stickies={this.state.cardLevels.level1} percent={15 + 85 * this.state.cardLevels.level1 / this.state.cardLevels.total} />
          <Column color={Constants.c_level2} stickies={this.state.cardLevels.level2} percent={15 + 85 * this.state.cardLevels.level2 / this.state.cardLevels.total} />
          <Column color={Constants.c_level3} stickies={this.state.cardLevels.level3} percent={15 + 85 * this.state.cardLevels.level3 / this.state.cardLevels.total} />
          <Column color={Constants.c_level4} stickies={this.state.cardLevels.level4} percent={15 + 85 * this.state.cardLevels.level4 / this.state.cardLevels.total} />
          <Column color={Constants.c_level5} stickies={this.state.cardLevels.level5} percent={15 + 85 * this.state.cardLevels.level5 / this.state.cardLevels.total} />
        </View> : <Text>Loading</Text> }
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
    width: "100%",
    height: 250,
  },
  viewOuter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingTop: 5,
    borderRadius: 5,
    shadowColor: "black",
  },
  viewHeaderText: {
    width: "100%",
    marginBottom: 10,
    textAlignVertical: "center",
    textAlign: "center",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    width: 65,
    borderRadius: 10
  }
})

export default ProgressView