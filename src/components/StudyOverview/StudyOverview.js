import React, { Component, useEffect, useState } from 'react'

import { TouchableHighlight, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from '../Header'

import GLOBALS from '../../util/global'

import globalStyles from '../../constants/globalStyles'

import ProgressBar from '../ProgressBar'
import ProgressView from '../ProgressView'

import Dict from '../../util/Dict'

import { _getOption, _getDeck, _getCardsFromDeck } from '../../util/database'
import { set } from 'react-native-reanimated';

class StudyOverview extends Component {
  constructor(props) {
    super(props)
    this.progressView = React.createRef()

    this.state = {
      selectedDeck: "",
      percentage: 20
    }
  }

  updateDeck() {
    _getOption("SelectedDeck").then(doc => {
      this.setState({selectedDeck: doc.value})
      this.calculatePercentage()
    })
  }

  calculatePercentage() {
    if ( this.state.selectedDeck ) {
      let cards = this.state.selectedDeck.cardList
      let totalIterations = cards.length * 4

      console.log(totalIterations)

      let level2cards = cards.filter(card => card.level == 2).length
      let level3cards = cards.filter(card => card.level == 3).length * 2
      let level4cards = cards.filter(card => card.level == 4).length * 3
      let level5cards = cards.filter(card => card.level == 5).length * 4

      console.log(level2cards, level3cards, level4cards, level5cards)

      let percent = level2cards + level3cards + level4cards + level5cards
      // console.log(percent)

      this.setState({percentage: percent})
    }
  }

  componentDidMount() {
    this.updateDeck()
    this.props.navigation.addListener('focus', () => { this.updateDeck() })
  }

  render() {
  return (
    <View >
      <Header leftItem={
        <TouchableHighlight onPress={ () => { this.props.navigation.navigate('DeckSelect') } } >
          <Icon name={"book"} size={26} color={"white"} />
        </TouchableHighlight>
      } title="Study"/>
      <View style={[ globalStyles.generalView ]}>
        <ProgressView selectedDeck={ this.state.selectedDeck } />
        <ProgressBar progress={ this.state.percentage }/>
        <TouchableHighlight onPress={() => this.props.navigation.navigate('SwipeView', {
          data: this.state.selectedDeck.cardList
        })}>
          <View>
            <Text>Start studying</Text>
          </View>
        </TouchableHighlight>

      </View>
    </View>
  ) }
}

export default StudyOverview