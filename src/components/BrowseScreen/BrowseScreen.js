import React, { useState, useEffect } from 'react'

import GLOBALS from '../../util/global'

import {  Dimensions,
          StyleSheet,
          Text,
          TouchableHighlight,
          View } from 'react-native'

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
      checkCurrentDeck()
      navigation.addListener('focus', checkCurrentDeck)
  }, [])

  const checkCurrentDeck = () => {
    console.log("Browse")
    // console.log("showinng " + GLOBALS.WrapperState.state.showingDeck)
    // console.log("selected " + GLOBALS.WrapperState.state.selectedDeck)
    if ( GLOBALS.WrapperState.state.showingDeck != GLOBALS.WrapperState.state.selectedDeck ) {
      console.log("Getting cards")
      setLoading(true)
      getCards()
    }
  }

  const getCards = () => {
    // console.log(res)
    _getDeck(GLOBALS.WrapperState.state.selectedDeck).then(deck => {
      _getCardsFromDeck(deck.cardList).then(cards => {
        GLOBALS.WrapperState.setState({showingDeck: GLOBALS.WrapperState.state.selectedDeck})
        setStickies(cards.docs)
        setLoading(false)
      })
    }).catch(err => console.log(err))
  }

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
                      <StickyThumb id={index} readings={item.wordtype == "Kanji" ? item.readings_kun[0] : item.readings} meanings={item.meanings} word={item.entry} level={item.level} />
                    </TouchableHighlight>
                   ) }
                   /> : <View style={[ globalStyles.loadingView, {marginBottom: 100} ]}><Text style={{color: "gray"}}>Loading...</Text></View> }
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