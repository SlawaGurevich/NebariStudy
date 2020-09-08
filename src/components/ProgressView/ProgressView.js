import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

import _ from "lodash"

import GLOBALS from '../../util/global'

import * as Constants from '../../constants/styleConstants'

import { _getDeck, _getOption, _getCardsFromDeck } from '../../util/database'

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
      cardLevels: [],
    }
  }

  componentDidMount() {
    this.getNumberOfCardsByLevel()
  }

  getNumberOfCardsByLevel() {

      _getDeck(this.props.selectedDeck).then(doc => {
        _getCardsFromDeck(doc.cardList).then(res => {
          let cards = res.docs
          let cardLevels = {}

          console.log(cards[0])

          cardLevels.level1 = cards.filter(card => card.level == 1).length
          cardLevels.level2 = cards.filter(card => card.level == 2).length
          cardLevels.level3 = cards.filter(card => card.level == 3).length
          cardLevels.level4 = cards.filter(card => card.level == 4).length
          cardLevels.level5 = cards.filter(card => card.level == 5).length
          cardLevels.total = cards.length

          console.log(cardLevels)
          this.setState({cardLevels: cardLevels})
        }).catch(err => { console.log(err) })
      }).catch( err => { console.log(err) })

  }

  render() {
    return(
      <View>
        <Text>{ this.props.selectedDeck }</Text>
        <View style={styles.progressViewContainer}>
          <Column color={Constants.c_level1} stickies={this.state.cardLevels.level1} percent={100 * this.state.cardLevels.level1 / this.state.cardLevels.total} />
          <Column color={Constants.c_level2} stickies={this.state.cardLevels.level2} percent={100 * this.state.cardLevels.level2 / this.state.cardLevels.total} />
          <Column color={Constants.c_level3} stickies={this.state.cardLevels.level3} percent={100 * this.state.cardLevels.level3 / this.state.cardLevels.total} />
          <Column color={Constants.c_level4} stickies={this.state.cardLevels.level4} percent={100 * this.state.cardLevels.level4 / this.state.cardLevels.total} />
          <Column color={Constants.c_level5} stickies={this.state.cardLevels.level5} percent={100 * this.state.cardLevels.level5 / this.state.cardLevels.total} />
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