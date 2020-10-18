import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import Androw from 'react-native-androw'

import * as Constants from '../../../constants/styleConstants'
import globalStyles from '../../../constants/globalStyles'

const ProgressBar = (levels, size) => {
  return (
    <View style={ styles.progressOuter }>
      <View style={[ styles.progressInner, { width: getPercentage(levels, size) }]}></View>
    </View>
  )
}

const getPercentage = ({levels, size}) => {
  console.log(Math.floor( 100 * ( levels.level2 + levels.level3 * 2 + levels.level4 * 3 + levels.level5 * 4) / (size * 4) ))
  return Math.floor( 100 * ( levels.level2 + levels.level3 * 2 + levels.level4 * 3 + levels.level5 * 4) / (size * 4) ) + "%"
}

const DeckButton = (props) => {
  return (
    <Androw style={[styles.shadowProps(1)]}>
      <Androw style={[styles.shadowProps(2)]}>
        <Androw style={[styles.shadowProps(4)]}>
          <TouchableHighlight onPress={() => {
            props.setSelectedDeck(props.name)
          }}>
              <View style={[
                  styles.deckCard
              ]}>
                <View style={{
                  display: "flex",
                  flexGrow: 1,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}>
                  <Text style={{fontWeight: props.isSelected ? "bold" : "normal"}}>{props.name}</Text>
                  <TouchableWithoutFeedback onPress={ () => {
                    _deleteDeck(props.name).then(res => {
                      // console.log(res)
                      getDecks()
                    }).catch(err => {
                      console.log("err")
                    })
                  }}>
                    <Icon name="trash" color="red" size={20} />
                  </TouchableWithoutFeedback>
                </View>
                <View>
                  <ProgressBar levels={props.levels} size={props.size} />
                </View>
                <View style={styles.cardCountContainer}>
                  <View style={[styles.cardCount, {backgroundColor: Constants.c_level1}]}>
                    <Text style={styles.cardCountText}>{ props.levels.level1 }</Text>
                  </View>
                  <View style={[styles.cardCount, {backgroundColor: Constants.c_level2}]}>
                    <Text style={styles.cardCountText}>{ props.levels.level2 }</Text>
                  </View>
                  <View style={[styles.cardCount, {backgroundColor: Constants.c_level3}]}>
                    <Text style={styles.cardCountText}>{ props.levels.level3 }</Text>
                  </View>
                  <View style={[styles.cardCount, {backgroundColor: Constants.c_level4}]}>
                    <Text style={styles.cardCountText}>{ props.levels.level4 }</Text>
                  </View>
                  <View style={[styles.cardCount, {backgroundColor: Constants.c_level5}]}>
                    <Text style={styles.cardCountText}>{ props.levels.level5 }</Text>
                  </View>
                  <View style={[styles.cardCount, {backgroundColor: Constants.c_gray, marginRight: 0}]}>
                    <Text style={styles.cardCountText}>{ props.size }</Text>
                  </View>
                </View>
              </View>
            </TouchableHighlight>
          </Androw>
        </Androw>
      </Androw>
  )
}

const styles = StyleSheet.create({
  deckCard: {
    padding: 10,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "white",
    overflow: "visible",
    borderRadius: Constants.c_borderRadiusDefault,
  },
  shadowProps: (multiple = 1) => { return {
    shadowColor: Constants.c_highlight,
    shadowOpacity: .05,
    shadowOffset: {
      width: 0,
      height: 2 * multiple
    },
    shadowRadius: 1 * multiple

  } },
  firstShadow: {
    shadowOffset: {
      width: 0,
      height: 40
    },
    shadowRadius: 40
  },
  secondShadow: {
    shadowOffset: {
      width: 0,
      height: 80
    },
    shadowRadius: 80
  },
  thirdShadow: {
    shadowOffset: {
      width: 0,
      height: 120
    },
    shadowRadius: 120
  },
  fourthShadow: {
    shadowOffset: {
      width: 0,
      height: 160
    },
    shadowRadius: 160
  },
  fifthShadow: {
    shadowOffset: {
      width: 0,
      height: 200
    },
    shadowRadius: 200
  },
  progressOuter: {
    height: 5,
    width: "100%",
    marginVertical: 15,
    backgroundColor: Constants.c_gray,
    borderRadius: 3
  },
  progressInner: {
    height: "100%",
    backgroundColor: Constants.c_highlight,
    borderRadius: 3
  },
  cardCountContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap"
  },
  cardCount: {
    flexShrink: 1,
    flexBasis: 200,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 6,
    borderRadius: Constants.c_borderRadiusDefault,
  },
  cardCountText: {
    fontWeight: 'bold',
    fontSize: Constants.fz_md,
    textAlign: 'center'
  }
})

export default DeckButton