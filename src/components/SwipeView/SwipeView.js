import React from 'react'

import Swiper from 'react-native-deck-swiper'

import { Button,
         StyleSheet,
         Text,
         TouchableHighlight,
         View } from 'react-native'

import Header from '../Header'

import globalStyles from '../../constants/globalStyles'

const SwipeView = ({ route, navigation }) => {

  return (
    <View style={styles.mainView}>
      <Header leftItem={<TouchableHighlight onPress={() => { navigation.goBack() }}><Text>Back</Text></TouchableHighlight>}/>
      <Swiper style={styles.swiper} cards={route.params.data}
              renderCard={(card) => {
                return (
                    <View style={styles.card}>
                        <Text style={styles.text}>{card.entry}</Text>
                    </View>
                )
            }}
            onSwiped={(cardIndex) => {console.log(cardIndex)}}
            onSwipedAll={() => {console.log('onSwipedAll')}}
            cardIndex={0}
            backgroundColor={'transparent'}
            stackSize= {5}
            >

      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  test: {
    width: 20,
    height: 20,
    backgroundColor: "red",
  },
  swiper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50
  },
  card: {
    position: "absolute",
    flex: 1,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: "auto",
    height: "auto",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white"
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  }
});

export default SwipeView