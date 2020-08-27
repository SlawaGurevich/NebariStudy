import React, { useState } from 'react'

import { FlatList, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

import globalStyles from '../../constants/globalStyles'
import * as Constants from '../../constants/styleConstants'

import Header from '../Header'

const ListItem = ({ title, reading, translation }) => {
  return (
    <View style={styles.listItemWrapper}>
      <View style={styles.listItemOuter}>
        <View style={styles.listItemFirstLine}>
          <Text style={{fontWeight: "700", color: Constants.c_opal}}>{title}</Text><Text>{reading}</Text>
        </View>
        <View tyle={styles.listItemTranslations}>
          <Text>{translation.de}</Text>
          <Text>{translation.ru}</Text>
        </View>
      </View>
      <Icon name="angle-right" size={20} />
    </View>
  )
}

const DictionaryScreen = () => {
  const [searchValue, setSearchValue] = useState("")

  const DATA = [
    { title: "東京",
      reading: "とうきょう",
      translation: {
        de: "Tokyo",
        ru: "Токио"
      }
    }
  ]

  return (
    <View>
      <Header title="Dictionary"/>
      <View style={styles.searchInput}>
          <Icon size={16} name="search" color={Constants.c_ash_gray}/>
          <TextInput value={searchValue} onChangeText={ (text) => { setSearchValue(text) } } style={ styles.searchInputText } placeholder="Search" />
          {searchValue !== "" && <TouchableHighlight onPress={() => {setSearchValue("")}}>
            <Icon name="times-circle" size={20} />
          </TouchableHighlight>}
        </View>
      <View>
        <FlatList data={DATA}
                  keyExtractor={(item, index) => 'key' + index}
                  renderItem={ ({ item }) => (
                    <ListItem title={item.title} reading={item.reading} translation={item.translation} />
                  ) }/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  searchInput: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: Constants.c_ash_gray
  },
  searchInputText: {
    flexGrow: 1,
    paddingHorizontal: 10
  },
  listItemWrapper: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    borderBottomColor: Constants.c_ash_gray,
    borderBottomWidth: 1,
    padding: 10
  },
  listItemOuter: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1
  },
  listItemFirstLine: {
    display: "flex",
    flexDirection: "row"
  },
  listItemTranslations: {
    display: "flex"
  }
})

export default DictionaryScreen