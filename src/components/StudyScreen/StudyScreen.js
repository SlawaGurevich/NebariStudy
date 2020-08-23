import React from 'react'

import { Text,
         View } from 'react-native'

import ProgressBar from 'react-native-progress/Bar';
import Header from '../Header'

const StudyScreen = () => {
  return (
    <View>
      <Header centerItem={<Text>Test</Text>} />
      <View>
        <Text>Test</Text>
      </View>
      <ProgressBar progress={0.3} width={ null }/>
    </View>
  )
}

export default StudyScreen