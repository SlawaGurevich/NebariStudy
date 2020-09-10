import React, { Component } from 'react'


import GLOBALS from '../../util/global'

import globalStyles from '../../constants/globalStyles'

import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native'

import Dialog from "react-native-dialog";

import Icon from 'react-native-vector-icons/FontAwesome';

import Header from '../Header'
import * as Constants from '../../constants/styleConstants'

import { _getDecks, _deleteDeck, _addDeck, _setOption, _getOption, _getDeck } from '../../util/database'
import { TouchableHighlight } from 'react-native-gesture-handler';

const DeckButton = (props) => {
  return (
      <TouchableHighlight onPress={() => {
        props.setSelectedDeck(props.name)
      }}>
        <View style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          height: 60,
          borderBottomColor: Constants.c_ash_gray,
          borderBottomWidth: 1
        }}>
          <View style={{
            display: "flex",
            flexGrow: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            marginEnd: 20
          }}>
            <Text style={{fontWeight: props.isSelected ? "bold" : "normal"}}>{props.name}</Text>
            <Text>{props.size}</Text>
          </View>
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
      </TouchableHighlight>
  )
}

class DeckSelect extends Component {
  constructor (props){
    super (props)
    this.navigation = props.navigation
    this.handleChange = this.handleChange.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.setSelectedDeck = this.setSelectedDeck.bind(this)

    _getOption("SelectedDeck").then(res => {
      this.setState({selectedDeck: res.value})
    }).catch(err => { console.log(err) })

    this.state = {
      decks: [],
      dialogVisible: false,
      deckName: "",
      selectedDeck: "",
      loading: true
    }

    this.getDecks = this.getDecks.bind(this)
  }

  componentDidMount() {
    this.getDecks()
  }

  setSelectedDeck(name) {
    _getDeck(name).then(deck => {
      _setOption("SelectedDeck", "String", deck).then(doc => {
        GLOBALS.WrapperState.setState({selectedDeck: deck, refreshDeck: true})
        this.setState({ selectedDeck: deck })
      })
    })
  }

  getDecks() {
    this.setState({loading: true})
   _getDecks().then( (res) => {
      this.setState({decks: res.docs})
      this.setState({loading: false})
      for( let i = 0; i < res.docs.length; i++) {
        console.log(res.docs[i].cardList.length)
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  handleChange(event) {
    this.setState({deckName: event.nativeEvent.text})
    console.log(event.nativeEvent.text)
  }

  handleCancel = () => {
    this.setState({dialogVisible: false})
  }

  handleCreate = () => {
    _addDeck(this.state.deckName)
    this.getDecks()
    this.setState({deckName:"", dialogVisible: false})
  }

  render() {
    return (
      <View style={ styles.parentView }>
        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>Account delete</Dialog.Title>
          <Dialog.Description>
            Enter the name for the new Deck.
          </Dialog.Description>
          <Dialog.Input label="Deck name" style={{backgroundColor: '#ccc'}} type="text" value={this.state.deckName} onChange={ this.handleChange } />
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
          <Dialog.Button label="Create" onPress={this.handleCreate} />
        </Dialog.Container>
        <Header leftItem={
          <TouchableWithoutFeedback onPress={ () => { this.navigation.goBack() } }>
            <Icon name="close" color="white" size={20} />
          </TouchableWithoutFeedback>
        } title="Select a deck to study"
        rightItem={
          <TouchableWithoutFeedback onPress={() => {
            this.setState({dialogVisible: true})
          } } >
            <Icon name="plus" color="white" size={20} />
          </TouchableWithoutFeedback>
        }/>
        { !this.state.loading ? <ScrollView style={{flexBasis: "100%"}}>
          {
            this.state.decks.length > 0 ? this.state.decks.map( (deck, i) => (
              <DeckButton key={i} name={deck.name} isSelected={deck.name == this.state.selectedDeck.name } size={deck.cardList ? deck.cardList.length : 0} getDecks={this.getDecks} setSelectedDeck={this.setSelectedDeck} />
            ) ) : <View styles={ globalStyles.loadingView }><Text>No decks. Please create some.</Text></View>
          }
        </ScrollView> : <View style={ globalStyles.loadingView }><Text>Loading...</Text></View> }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  parentView: {
    display: "flex",
    height: "100%",
  }
})

export default DeckSelect