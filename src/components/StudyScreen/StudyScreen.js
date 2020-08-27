import React from 'react'

import { Text,
         View,
         TouchableHighlight } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../Header'
import SwipeView from '../SwipeView'
import StudyOverview from '../StudyOverview';

import globalStyles from '../../constants/globalStyles'


const Stack = createStackNavigator();

const StudyScreen = () => {
  return (
    <Stack.Navigator initialRouteName="StudyOverview" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StudyOverview" component={StudyOverview} />
    </Stack.Navigator>
  )
}

export default StudyScreen