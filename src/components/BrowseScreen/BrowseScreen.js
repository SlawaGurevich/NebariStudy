import React, { useState, useEffect } from 'react'

import {  Dimensions,
          StyleSheet,
          TouchableHighlight,
          View,
          TouchableHighlightBase} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';


import { FlatGrid } from 'react-native-super-grid'

import Header from '../Header'
import StickyThumb from './StickyThumb'

import globalStyles from '../../constants/globalStyles'

import { _getOption, _getDeck, _getCardsFromDeck } from '../../util/database'

let cardSize = ( Math.floor(Dimensions.get('window').width) - (2 * 20) - (3 * 10) ) / 4

const BrowseScreen = ({navigation}) => {
  const [stickies, setStickies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    _getOption("SelectedDeck").then(res => {
      console.log(res)
      _getDeck(res.value).then(deck => {
        console.log(deck.cardList)
        _getCardsFromDeck(deck.cardList).then(cards => {
          console.log(cards.docs)
          setStickies(cards.docs)
          setLoading(false)
        })
      }).catch(err => console.log(err))
    }).catch(err => console.log(err))
  }, [])

  return (
    <View>
      <Header title="Browse"/>
      <View style={[ globalStyles.generalView ]}>
        { stickies.length > 0 && !loading ? <FlatGrid data={stickies}
                  itemDimension={cardSize}
                  contentContainerStyle={{paddingBottom: 100}}
                  renderItem={ ({ item, index }) => (
                    <TouchableHighlight onPress={() => { navigation.navigate("SingleCardView", {
                      word: item.entry,
                      level: item.level,
                      id: index,
                      readings: item.wordtype == "Kanji" ? [item.readings_on, item.readings_kun] : item.readings,
                      wordtype: item.wordtype,
                      meanings: item.meanings
                    }) }} >
                      <StickyThumb id={index} meanings={item.meanings} word={item.entry} level={item.level} />
                    </TouchableHighlight>
                   ) }
                   /> : <Icon name="trash" size={20} color="red" /> }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  stickyView: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  }
})

export default BrowseScreen