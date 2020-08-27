import React from 'react'
import { View, Text, Button } from 'react-native'

import globalStyles from '../../constants/globalStyles'

const SingleView = ({ navigation }) => {
  return (
    <View style={ globalStyles.generalView }>
      <Text>SingleView</Text>
      <Button title="To welcome" onPress={() => navigation.navigate("Welcome") } />
    </View>
  )
}

export default SingleView