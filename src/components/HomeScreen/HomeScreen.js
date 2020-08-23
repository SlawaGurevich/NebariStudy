import React from 'react'
import { View, Text, Button } from 'react-native'

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="To welcome" onPress={() => navigation.navigate("Welcome") } />
    </View>
  )
}

export default HomeScreen