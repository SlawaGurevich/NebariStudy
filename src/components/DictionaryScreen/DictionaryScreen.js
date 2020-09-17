import React, { Component } from 'react'

import { FlatList, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

import globalStyles from '../../constants/globalStyles'
import * as Constants from '../../constants/styleConstants'

import { _dictionarySearch } from '../../util/database'

import Header from '../Header'

const ListItem = ({ title, readings, meanings, wordtype }) => {
  return (
    <View style={styles.listItemWrapper}>
      <View style={styles.listItemOuter}>
        <View style={styles.listItemFirstLine}>
          <Text style={{fontWeight: "700", color: Constants.c_opal}}>{title}</Text><Text>{readings}</Text>
        </View>
        <View tyle={styles.listItemTranslations}>
          <Text>{meanings}</Text>
        </View>
      </View>
      <Icon name="angle-right" size={20} />
    </View>
  )
}

class DictionaryScreen extends Component {
  constructor(props) {
    super(props)
    this.input = React.createRef()
    this.state = {
      searchString: "",
      results: []
    }
  }

  DATA = [
    { title: "東京",
      reading: "とうきょう",
      translation: {
        de: "Tokyo",
        ru: "Токио"
      }
    }
  ]

  changeText = (search) => {
    this.setState({searchString: search})
  }

  searchDictionary = () => {
    _dictionarySearch(this.state.searchString).then(docs => {
      console.log(docs.docs)
      this.setState({results: docs.docs})
    }).catch(err => {console.log(err)})
  }

  render() {
    return (
      <View>
        <Header title="Dictionary"/>
        <View style={styles.searchInput}>
            <Icon size={16} name="search" color={Constants.c_ash_gray}/>
            <TextInput ref={ (inp) => { this.input = inp; }}
                       value={this.state.searchString}
                       onChangeText={ (text) => { this.changeText(text) } }
                       onSubmitEditing={this.searchDictionary}
                       style={ styles.searchInputText }
                       placeholder="Search" />
            {this.state.searchString !== "" && <TouchableHighlight onPress={() => { this.setState({searchString: "", results:[] }); this.input.focus() } }>
              <Icon name="times-circle" size={20} />
            </TouchableHighlight>}
          </View>
        <View>
          <FlatList data={this.state.results}
                    keyExtractor={(item, index) => 'key' + index}
                    renderItem={ ({ item }) => (
                      <ListItem title={item.entry}
                                reading={item.readings || [item.readings_on, item.readings_kun]}
                                wordtype={item.wordtype}
                                meanings={item.meanings} />
                    ) }/>
      {}
        </View>
      </View>
    )
  }
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