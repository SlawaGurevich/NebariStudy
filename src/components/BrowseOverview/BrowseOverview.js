import React, { Component } from 'react'

import GLOBALS from '../../util/global'

import BrowseScreen from '../BrowseScreen'

import { _getDeck } from '../../util/database'

class BrowseOverview extends Component {
  constructor(props) {
    super(props)
    this.navigation = props.navigation
    this.state = {
      selectedDeck: ""
    }

    this.getDeck = this.getDeck.bind(this)
    this.props.navigation.addListener('focus', this.updateDeck)
  }

  updateDeck = () => {
    console.log("update deck")
    console.log(this.state.selectedDeck)
    if( this.state.selectedDeck != GLOBALS.WrapperState.state.selectedDeck ){
      this.getDeck()
    }
  }


  componentDidUpdate(previousProps, previousState) {
    console.log("component did update")
    if(previousState.selectedDeck != this.state.selectedDeck) {
      this.getDeck()
    }
  }

  componentDidMount() {
    this.getDeck()
  }

  getDeck = () => {
    this.setState({selectedDeck: GLOBALS.WrapperState.state.selectedDeck})
  }

  render() {
    return (
      <BrowseScreen selectedDeck={ this.state.selectedDeck } navigation={ this.navigation } />
    )
  }
}

export default BrowseOverview