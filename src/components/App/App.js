/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/FontAwesome';

import {
  StyleSheet,
  StatusBar,
  Text
} from 'react-native';

import * as Constants from '../../constants/styleConstants'
import WelcomeScreen from '../WelcomeScreen'
import OptionsScreen from '../OptionsScreen'
import StudyScreen from '../StudyScreen'

const styles = StyleSheet.create({
  welcomeView: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    width: "100%",
    height: '100%'
  }
})

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={Constants.c_sage} />

      <Tab.Navigator
      backgroundColor="red"
        screenOptions={({ route }) => ({
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
          showIcon: true
        }}
        initialRouteName="Study">
        <Tab.Screen name="Study" component={StudyScreen} />
        <Tab.Screen name="Browse" component={WelcomeScreen} />
        <Tab.Screen name="History" component={WelcomeScreen} />
        <Tab.Screen name="Dictionary" component={WelcomeScreen} />
        <Tab.Screen name="Options" component={OptionsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
