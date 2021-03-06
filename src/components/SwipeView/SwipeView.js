import React, { Component, createRef, useState } from 'react'

import { Button,
         StyleSheet,
         Text,
         TouchableHighlight,
         TouchableWithoutFeedback,
         View } from 'react-native'

import GLOBALS from '../../util/global'

import Header from '../Header'

import { SingleCard } from '../SingleCardView'
import Swiper from '../Swiper'

import { _uplevelCard, _downlevelCard } from '../../util/database'

import globalStyles from '../../constants/globalStyles'

class SwipeView extends Component {
  constructor (props) {
    super()
    this.route = props.route
    this.navigation = props.navigation
    this.data = props.route.params.deck

    this.cardIndex = 0
  }

  uplevelCard = (card) => {
    _uplevelCard(card.entry).then((doc) => {console.log(doc)})
  }

  downlevelCard = (card) => {
    _downlevelCard(card.entry).then((doc) => {console.log(doc)})
  }

  render() {
  return (
    <View style={styles.mainView}>
      <Header leftItem={<TouchableHighlight onPress={() => { console.log("back"); this.navigation.goBack() }}><Text>Back</Text></TouchableHighlight>}/>
      <Swiper navigation={this.navigation} deck={this.data}/>
    </View>
  )}
}

const styles = StyleSheet.create({
  mainView: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    backgroundColor: "pink"
  },
  swiper: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue"
  }
});

export default SwipeView

      /* {<SwipeCards style={styles.swiper} cards={this.route.params.data} ref={swiper => { this.swiper = swiper; }}
              renderCard={(card) => {
                return (
                  <SingleCard word={card.entry}
                              level={card.level}

                              readings={card.wordtype == "Kanji" ? [card.readings_on, card.readings_kun] : card.readings}
                              wordtype={card.wordtype}
                              meanings={card.meanings}
                              navigation={this.navigation}
                              revealed={card.revealed || 0} />
                )
            }}
            onClickHandler={() => { console.log("click") }}
            onSwiped={(cardIndex) => {console.log(cardIndex)}}
            onTapCard={(cardIndex) => { this.swiper.state.cards[cardIndex].revealed=1; this.cardIndex = this.1cardIndex+1; console.log(this.cardIndex) }}
            onSwipedRight={(cardIndex) => { this.uplevelCard(this.route.params.data[cardIndex]) }}
            onSwipedLeft={(cardIndex) => { this.downlevelCard(this.route.params.data[cardIndex]) }}
            onSwipedAll={() => {console.log('onSwipedAll')}}
            cardIndex={0}
            backgroundColor={'transparent'}
            stackSize= {2}
            cardIndex={this.cardIndex}
            >

      </SwipeCards>} */