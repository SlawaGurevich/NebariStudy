import React, { useState, Component } from 'react'

import GLOBALS from '../../util/global'

import {  Dimensions,
          StyleSheet,
          Text,
          TouchableHighlight,
          View } from 'react-native'


import Androw from 'react-native-androw'

import { FlatGrid } from 'react-native-super-grid'

import Header from '../Header'
import StickyThumb from './StickyThumb'

import * as wanakana from 'wanakana';

import globalStyles from '../../constants/globalStyles'
import * as styleConstants from '../../constants/styleConstants'

import { _getOption, _getDeck, _getCardsFromDeck } from '../../util/database'

let cardSize = ( Math.floor(Dimensions.get('window').width) - (2 * 20) - (3 * 10) ) / 4

class BrowseScreen extends Component {
  _isMounted = false

  constructor(props) {
    super(props)
    console.log(props.selectedDeck)
    this.state = {
      stickies: [],
      loading: true,
    }
    this.navigation = props.navigation
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true
    _getDeck(GLOBALS.WrapperState.state.selectedDeck).then(doc => {
      this.setState({stickies: doc.cardList, loading: false})
    }).catch(err => { console.log(err) })
  }

  componentDidUpdate(previousProps, previousState) {
    if( previousProps.selectedDeck != this.props.selectedDeck ) {
      this.setState({loading: true})
      this.getCards()
    }
  }

  getCards = () => {
    _getDeck(this.props.selectedDeck).then(doc => {
      this.setState({stickies: doc.cardList, loading: false})
    })
    .catch(err => {console.log(err)})
  }


  render(){
    return (
      <View key={GLOBALS.WrapperState.state.selectedDeck}>
        <Header title={`Browse ${GLOBALS.WrapperState.state.selectedDeck}`}/>
        <View style={[ globalStyles.generalView ]}>
          { this.state.stickies.length > 0 && !this.state.loading ? <FlatGrid data={this.state.stickies}
                    itemDimension={cardSize}
                    contentContainerStyle={{paddingBottom: 100}}
                    renderItem={ ({ item, index }) => (
                      <Androw style={styles.shadow}>
                        <TouchableHighlight onPress={() => { this.navigation.navigate("SingleCardView", {
                          word: item.entry,
                          level: item.level,
                          id: index,
                          readings: item.wordtype == "Kanji" ? [item.readings_on, item.readings_kun] : item.readings,
                          wordtype: item.wordtype,
                          meanings: item.meanings,
                          revealed: 1,
                          previous: "Browse"
                        }) }} >
                          <StickyThumb id={index} readings={item.wordtype == "Kanji" ? (item.readings_kun[0] || wanakana.toKatakana(item.readings_on[0]) ) : wanakana.tokenize(item.readings).filter(word => wanakana.isHiragana(word) ) } meanings={item.meanings} word={item.entry} level={item.level} />
                        </TouchableHighlight>
                      </Androw>
                    ) }
                    /> : <View style={[ globalStyles.loadingView, {marginBottom: 100} ]}><Text style={{color: "gray"}}>Loading...</Text></View> }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: styleConstants.c_coral,
    shadowOffset:{
      width: 0,
      height: 0,
    },
    shadowOpacity: .4,
    shadowRadius: 4
  }
})

export default BrowseScreen