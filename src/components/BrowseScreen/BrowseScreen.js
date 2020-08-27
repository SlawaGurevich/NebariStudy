import React from 'react'

import {  Dimensions,
          StyleSheet,
          TouchableHighlight,
          View,
          TouchableHighlightBase} from 'react-native'

import { FlatGrid } from 'react-native-super-grid'

import Header from '../Header'
import StickyThumb from './StickyThumb'

import globalStyles from '../../constants/globalStyles'

let cardSize = ( Math.floor(Dimensions.get('window').width) - (2 * 20) - (3 * 10) ) / 4

let stickies = [
  {id: 1, word: "暖房", level: 3},
  {id: 2, word: "激励", level: 1},
  {id: 3, word: "出張", level: 3},
  {id: 4, word: "蛋白質", level: 4},
  {id: 5, word: "雌", level: 5},
  {id: 6, word: "東京", level: 2},
  {id: 1, word: "暖房", level: 3},
  {id: 2, word: "激励", level: 1},
  {id: 3, word: "出張", level: 3},
  {id: 4, word: "蛋白質", level: 4},
  {id: 5, word: "雌", level: 5},
  {id: 6, word: "東京", level: 2},
  {id: 1, word: "暖房", level: 3},
  {id: 2, word: "激励", level: 1},
  {id: 3, word: "出張", level: 3},
  {id: 4, word: "蛋白質", level: 4},
  {id: 5, word: "雌", level: 5},
  {id: 6, word: "東京", level: 2},
  {id: 1, word: "暖房", level: 3},
  {id: 2, word: "激励", level: 1},
  {id: 2, word: "激励", level: 1},
  {id: 2, word: "激励", level: 1},
  {id: 3, word: "出張", level: 3},
  {id: 4, word: "蛋白質", level: 4},
  {id: 5, word: "雌", level: 5},
  {id: 6, word: "東京", level: 2},
  {id: 1, word: "暖房", level: 3},
  {id: 2, word: "激励", level: 1},
  {id: 2, word: "激励", level: 1},
  {id: 2, word: "激励", level: 1},
  {id: 3, word: "出張", level: 3},
  {id: 4, word: "sadas", level: 4},
  {id: 5, word: "雌", level: 5},
  {id: 6, word: "東京", level: 2},
  {id: 1, word: "暖房", level: 3},
  {id: 2, word: "激励", level: 1},
  {id: 3, word: "出張", level: 3},
  {id: 4, word: "蛋白質", level: 4},
  {id: 5, word: "雌", level: 5},
  {id: 6, word: "sdsd", level: 2},
]

const BrowseScreen = ({navigation}) => {
  return (
    <View>
      <Header title="Browse"/>
      <View style={[ globalStyles.generalView ]}>
        <FlatGrid data={stickies}
                  itemDimension={cardSize}
                  renderItem={ ({ item }) => (
                    <TouchableHighlight onPress={() => { navigation.navigate("SingleCardView", {
                      word: item.word,
                      level: item.level,
                      id: item.id
                    }) }} >
                      <StickyThumb id={item.id} word={item.word} level={item.level} />
                    </TouchableHighlight>
                   ) }
                   />
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