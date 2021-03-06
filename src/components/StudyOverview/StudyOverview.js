import React, { Component, useEffect, useState } from 'react'
import { withNavigationFocus } from "@react-navigation/native"

import { Text,
         TouchableHighlight,
         View,
         ScrollView,
         StyleSheet} from 'react-native'

import Androw from 'react-native-androw'

import Icon from 'react-native-vector-icons/FontAwesome';

import Header from '../Header'

import GLOBALS from '../../util/global'

import globalStyles from '../../constants/globalStyles'
import * as Constants from '../../constants/styleConstants'

import ProgressBar from '../ProgressBar'
import ProgressView from '../ProgressView'

import Dict from '../../util/Dict'

import { _getOption, _getDeck, _getCardsFromDeck, _getCards } from '../../util/database'
import { set } from 'react-native-reanimated';
import { c_highlight, c_borderRadiusDefault, fz_sm, c_light_gray } from '../../constants/styleConstants';

class StudyOverview extends Component {
  constructor(props) {
    super(props)
    this.progressView = React.createRef()

    this.state = {
      currentDeck: "",
      percentage: 20
    }

    this.updateDeck = this.updateDeck.bind(this)
  }

  updateDeck() {
    if(this.state.currentDeck !== GLOBALS.WrapperState.state.selectedDeck) {
      this.calculatePercentage()
    }
  }

  calculatePercentage() {
    _getDeck(GLOBALS.WrapperState.state.selectedDeck).then((doc) => {
      let cards = doc.cardList
      let totalIterations = cards.length * 4

      let level2cards = cards.filter(card => card.level == 2).length
      let level3cards = cards.filter(card => card.level == 3).length * 2
      let level4cards = cards.filter(card => card.level == 4).length * 3
      let level5cards = cards.filter(card => card.level == 5).length * 4

      let percent = Math.floor((level2cards + level3cards + level4cards + level5cards) / totalIterations)

      this.setState({percentage: percent, currentDeck: GLOBALS.WrapperState.state.selectedDeck})
    }).catch((err) => {console.log(err)})

  }

  componentDidMount() {
    this.calculatePercentage()
    this.updateDeck()
    this.props.navigation.addListener('focus', this.updateDeck)

    // this.props.navigation.addListener('focus', () => { this.updateDeck() })
  }

  render() {
  return (
      <View style={{flex: 1}}>
        <Header leftItem={
          <TouchableHighlight onPress={ () => { this.props.navigation.navigate('DeckSelect') } } >
            <Icon name={"book"} size={26} color={globalStyles.c_ming} />
          </TouchableHighlight>
        } title="Study"/>
        <ScrollView>
          <Androw style={[globalStyles.cardShadowDefault, {paddingTop: 10}]}>
            <View style={[ globalStyles.cardView ]}>
              <ProgressView selectedDeck={ GLOBALS.WrapperState.state.selectedDeck } />
              <View style={globalStyles.separatorBright}></View>
              <ProgressBar progress={ this.state.percentage }/>
              <TouchableHighlight style={globalStyles.buttonActive} onPress={
                () => {
                  _getDeck(GLOBALS.WrapperState.state.selectedDeck).then((doc) => {
                    console.log("deck")
                    console.log(doc)
                    this.props.navigation.navigate('SwipeView', {
                      deck: doc
                    })
                  }).catch(err => {console.log(err)})
                 }
              }>
              <Text style={{ color: "white" }}>Start studying</Text>
            </TouchableHighlight>
          </View>
        </Androw>
        <Androw style={globalStyles.cardShadowDefault} >
          <View style={globalStyles.cardView}>
            <View style={ globalStyles.cardViewListItem }>
              <Text style={ globalStyles.cardViewListItemLeft }>Studied today:</Text>
              <Text style={ globalStyles.cardViewListItemRight }>30m</Text>
            </View>
            <View style={ globalStyles.cardViewSeparator }></View>
            <View style={ globalStyles.cardViewListItem }>
              <Text style={ globalStyles.cardViewListItemLeft }>Studied total:</Text>
              <Text style={ globalStyles.cardViewListItemRight }>20h 30m</Text>
            </View>
            <View style={ globalStyles.cardViewSeparator }></View>
            <View style={ globalStyles.cardViewListItem }>
              <Text style={ globalStyles.cardViewListItemLeft }>Studied this deck:</Text>
              <Text style={ globalStyles.cardViewListItemRight }>1h 13m</Text>
            </View>
          </View>
        </Androw>
        <Androw style={globalStyles.cardShadowDefault} >
          <View style={[globalStyles.cardView, {flexDirection: "row" }]}>
            <View style={styles.daysToGo}>
              <Text style={{ color: "white", fontSize: 45, fontWeight: "600"}}>65</Text>
              <Text style={{ color: "white", fontSize: fz_sm, fontWeight: "700" }}>days to go</Text>
            </View>
            <View style={ styles.daysToGoView }>
              <View style={ globalStyles.cardViewListItem }>
                <Text style={ globalStyles.cardViewListItemLeft }>Left to study:</Text>
                <Text style={ globalStyles.cardViewListItemRight }>34</Text>
              </View>
              <View style={ globalStyles.cardViewSeparator }></View>
              <View style={ globalStyles.cardViewListItem }>
                <Text style={ globalStyles.cardViewListItemLeft }>Study per day:</Text>
                <Text style={ globalStyles.cardViewListItemRight }>65</Text>
              </View>
              <View style={ globalStyles.cardViewSeparator }></View>
              <View style={ globalStyles.cardViewListItem }>
                <Text style={ globalStyles.cardViewListItemLeft }>Studied this deck:</Text>
                <Text style={ globalStyles.cardViewListItemRight }>1 day ago</Text>
              </View>
            </View>
            <View style={ styles.daysToGoDisabled }>
              <Text style={{ marginBottom: 10 }}>No due date set.</Text>
              <TouchableHighlight style={[globalStyles.buttonActive, {width: 160}]}>
                <Text style={{ color: "white" }}>set one now</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Androw>
        </ScrollView>
      </View>
  ) }
}

const styles = StyleSheet.create({
  daysToGoView: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1
  },
  daysToGo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    marginRight: 10,
    padding: 10,
    borderRadius: c_borderRadiusDefault,
    backgroundColor: c_highlight,
  },
  daysToGoDisabled: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: c_light_gray
  }
})

export default StudyOverview