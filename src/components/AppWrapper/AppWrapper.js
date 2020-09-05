import 'react-native-gesture-handler';
import React, { Component } from 'react';

import GLOBAL from '../../util/global'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { _getOption } from '../../util/database'
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  StatusBar
} from 'react-native';

import * as Constants from '../../constants/styleConstants'
import WelcomeScreen from '../WelcomeScreen'
import OptionsScreen from '../OptionsScreen'
import SubOptionsScreen from '../SubOptionsScreen'
import StudyScreen from '../StudyScreen'
import BrowseScreen from '../BrowseScreen'
import HistoryScreen from '../HistoryScreen'
import DictionaryScreen from '../DictionaryScreen'
import SingleCardView from '../SingleCardView'
import SwipeView from '../SwipeView'
import DeckSelect from '../DeckSelect'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <Tab.Navigator
      backgroundColor="red"
        screenOptions={({ route }) => ({
          tabBarVisible: route.name !== "SwipeView",
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Study') {
              iconName = "book";
            } else if ( route.name == 'Browse' ) {
              iconName = 'th';
            } else if ( route.name == 'History' ) {
              iconName = "bar-chart"
            } else if ( route.name == 'Dictionary' ) {
              iconName = "list-alt"
            } else if ( route.name == 'Options' ) {
              iconName = "gears"
            } else
            {
              iconName = focused ? 'question-circle' : 'question-circle-o';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
          showIcon: true,
          keyboardHidesTabBar: true
        }}
        initialRouteName="Study">
        <Tab.Screen name="Study" component={StudyScreen} />
        <Tab.Screen name="Browse" component={BrowseScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
        <Tab.Screen name="Dictionary" component={DictionaryScreen} />
        <Tab.Screen name="Options" component={OptionsScreen} />
      </Tab.Navigator>
  )
}

class AppWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedDeck: null,
    }

    GLOBAL.WrapperState = this
  }

  componentDidMount() {
    _getOption("SelectedDeck").then(res => {
      this.setState({
        selectedDeck: res.value
      })
    }).catch(err => { console.log(err) })
  }

  render() {
    return (
      <NavigationContainer>
        <StatusBar backgroundColor={Constants.c_sage} />

        <Stack.Navigator screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}>
          <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
          <Stack.Screen name="SingleCardView" component={SingleCardView} options={({ route }) => ({ title: route.params.word + " " + route.params.meanings.join(", ") })}/>
          <Stack.Screen name="SwipeView" options={{headerShown: false}} component={SwipeView} />
          <Stack.Screen name="SubOptionsScreen" component={SubOptionsScreen} options={({ route }) => ({ title: route.params.title })} />
          <Stack.Screen name="DeckSelect" component={DeckSelect} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default AppWrapper