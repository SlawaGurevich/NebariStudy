import React from 'react'
import { View, Text, Button } from 'react-native'

const WelcomeScreen = ({ navigation }) => {
  return(
    <View>
      <Text>WelcomeScreen</Text>
      <Button title="To home" onPress={() => navigation.navigate("Home") } />
    </View>
  )
}

export default WelcomeScreen