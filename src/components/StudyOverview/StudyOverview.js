import React, { Component, useEffect, useState } from 'react'

import { TouchableHighlight, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

import GLOBALS from '../../util/global'

import Header from '../Header'

import globalStyles from '../../constants/globalStyles'

import ProgressBar from '../ProgressBar'
import ProgressView from '../ProgressView'

import Dict from '../../util/Dict'

import { _getOption, _getDeck, _getCardsFromDeck } from '../../util/database'

class StudyOverview extends Component {
  constructor(props) {
    super(props)

    this.state = {
      stickyData: []
    }
  }

  componentDidMount() {
    _getOption("SelectedDeck").then(doc => {
      // this.props.store.set("selectedDeck")

      // _getDeck(this.props.store.get("selectedDeck")).then(deck => {
      //   // console.log(deck.cardList)
      //   _getCardsFromDeck(deck.cardList).then(cards => {
      //     // console.log(cards.docs)
      //     setState({stickyData: cards.docs})
      //   })
      // }).catch(err => console.log(err))
    }).catch(err => (console.log(err)))
  }

  render() {
  return (
    <View >
      <Header leftItem={
        <TouchableHighlight onPress={ () => { this.props.navigation.navigate('DeckSelect') } } >
          <Icon name={"book"} size={20} color={"white"} />
        </TouchableHighlight>
      } title="Study"/>
      <View style={[ globalStyles.generalView ]}>
        <ProgressBar progress={30}/>
        <ProgressView selectedDeck={GLOBALS.WrapperState.state.selectedDeck}/>
        <TouchableHighlight onPress={() => this.props.navigation.navigate('SwipeView', {
          data: this.state.stickies
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