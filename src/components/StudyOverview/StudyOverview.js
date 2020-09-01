import React, { useEffect, useState } from 'react'

import { TouchableHighlight, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from '../Header'

import globalStyles from '../../constants/globalStyles'

import ProgressBar from '../ProgressBar'
import ProgressView from '../ProgressView'

import Dict from '../../util/Dict'

import { _getOption, _getDeck, _getCardsFromDeck } from '../../util/database'

const StudyOverview = ({ navigation }) => {
  const [stickies, setStickies] = useState([])

  useEffect(() => {
    _getOption("SelectedDeck").then(res => {
      console.log(res)
      _getDeck(res.value).then(deck => {
        console.log(deck.cardList)
        _getCardsFromDeck(deck.cardList).then(cards => {
          console.log(cards.docs)
          setStickies(cards.docs)
        })
      }).catch(err => console.log(err))
    }).catch(err => console.log(err))
  }, [])

  console.log( Dict.getAllKanjiOfJlptLevel(5).length )
  return (
    <View >
      <Header leftItem={
        <TouchableHighlight onPress={ () => { navigation.navigate('DeckSelect') } } >
          <Icon name={"book"} size={20} color={"white"} />
        </TouchableHighlight>
      } title="Study"/>
      <View style={[ globalStyles.generalView ]}>
        <ProgressBar progress={30}/>
        <ProgressView />
        <TouchableHighlight onPress={() => navigation.navigate('SwipeView', {
          data: stickies
        })}>
          <View>
            <Text>Start studying</Text>
          </View>
        </TouchableHighlight>

      </View>
    </View>
  )
}

export default StudyOverview