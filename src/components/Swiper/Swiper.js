import React, { Component } from 'react'
import { Animated,
         Dimensions,
         PanResponder,
         StyleSheet,
         Text,
         View  } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';

import GLOBALS from '../../util/global'

import { SingleCard } from '../SingleCardView'

import { _updateDeck } from '../../util/database'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

class Swiper extends Component {
  constructor(props) {
    super()

    let level1Cards = props.deck.cardList.filter((c) => c.level == 1)
    let level2Cards = props.deck.cardList.filter((c) => c.level == 2)
    let level3Cards = props.deck.cardList.filter((c) => c.level == 3)
    let level4Cards = props.deck.cardList.filter((c) => c.level == 4)
    let level5Cards = props.deck.cardList.filter((c) => c.level == 5)

    this.navigation = props.navigation
    console.log(props.navigation)

    this.state = {
      currentIndex: 0,
      data: props.cards || {},
      currentCard: props.deck.cardList[0],
      nextCard: props.deck.cardList[1],
      revealed: 1,
    }

    console.log(this.state.currentCard)

    this.levelCard = (updown) => {
      let currentDeck = GLOBALS.WrapperState.state.selectedDeck
      let cardIndex = GLOBALS.WrapperState.state.selectedDeck.cardList.indexOf(this.state.currentCard)

      currentDeck.cardList[cardIndex].level = updown == "up" ? (currentDeck.cardList[cardIndex].level < 5 ? currentDeck.cardList[cardIndex].level + 1 : 5) : 1

      GLOBALS.WrapperState.setState({selectedDeck: currentDeck})
      _updateDeck(currentDeck).then(() => {
        console.log("deck updated")
      })
      this.getNextCard()
    }

    this.getNextCard = () => {
      let nextCard = props.deck.cardList[Math.floor(Math.random() * props.deck.cardList.length)]
      this.setState({
        currentCard: this.state.nextCard,
        nextCard: nextCard
      })
    }

    this.position = new Animated.ValueXY();

    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp'
    })

    this.rotateAndTranslate = {
      transform: [{
        rotate: this.rotate
      },
      ...this.position.getTranslateTransform()
      ]
    }

    this.yepOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    })

    this.nopeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    })

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp'
   })

   this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp'
    })

    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
         this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },

      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
            useNativeDriver: true
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
              this.levelCard("up")
            })
          })
        } else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
            useNativeDriver: true
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
              this.levelCard("down")
            })
          })

        } else {
          Animated.spring(this.position, {
             toValue: { x: 0, y: 0 },
             friction: 4,
             useNativeDriver: true
             }).start()
          }
      }
    })
  }

  render() {
    return (
      <View style={{flex:1, position: "absolute", width: "100%", height: "100%"}}>
          <Animated.View
            {...this.PanResponder.panHandlers}
            style={[ {position: "relative", zIndex: 999}, this.rotateAndTranslate, styles.card]}
          >
            <View style={{flex: 1}}>
              <SingleCard word={this.state.currentCard.entry}
                              level={this.state.currentCard.level}

                              readings={this.state.currentCard.wordtype == "Kanji" ? [this.state.currentCard.readings_on, this.state.currentCard.readings_kun] : this.state.currentCard.readings}
                              wordtype={this.state.currentCard.wordtype}
                              meanings={this.state.currentCard.meanings}
                              navigation={this.navigation}
                              revealed={this.state.revealed || 0} />
            </View>
            <Animated.View style={[styles.cross, { opacity: this.nopeOpacity }]}>
              <Icon name="close" size={36} color={"red"} />
            </Animated.View>
            <Animated.View style={[styles.checkmark, { opacity: this.yepOpacity } ]} >
              <Icon name="check" size={36} color={"green"}/>
            </Animated.View>
          </Animated.View>



          <Animated.View
            {...this.PanResponder.panHandlers}
            style={[{ opacity: this.nextCardOpacity, transform: [{ scale: this.nextCardScale }]}, styles.card]}
          >
            <SingleCard word={this.state.nextCard.entry}
                              level={this.state.nextCard.level}

                              readings={this.state.nextCard.wordtype == "Kanji" ? [this.state.nextCard.readings_on, this.state.nextCard.readings_kun] : this.state.nextCard.readings}
                              wordtype={this.state.nextCard.wordtype}
                              meanings={this.state.nextCard.meanings}
                              navigation={this.navigation}
                              revealed={this.state.revealed || 0} />
          </Animated.View>
        </View>
        )
  }
}

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    top: 50,
    height: SCREEN_HEIGHT - 75,
    width: SCREEN_WIDTH,
  },
  cardInner: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "red"
  },
  shadow: {

  },
  checkmark: {
    transform: [{ rotate: "30deg" }],
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: 50,
    left: 40,
    width: 70,
    height: 70,
    padding: 10,

    borderRadius: 35,
    borderColor: "green",
    borderWidth: 2,
  },
  cross: {
    transform: [{ rotate: "-30deg" }],
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: 50,
    right: 40,
    width: 70,
    height: 70,
    padding: 10,

    borderRadius: 35,
    borderColor: "red",
    borderWidth: 2,
  }
})

export default Swiper