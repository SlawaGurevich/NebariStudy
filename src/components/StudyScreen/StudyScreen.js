import React from 'react'

import { Text,
         View,
         TouchableHighlight } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import StudyOverview from '../StudyOverview';


const Stack = createStackNavigator();

const StudyScreen = () => {
  return (
    <Stack.Navigator initialRouteName="StudyOverview" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StudyOverview" component={StudyOverview} />
    </Stack.Navigator>
  )
}

export default StudyScreen