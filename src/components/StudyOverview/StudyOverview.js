import React from 'react'

import { TouchableHighlight, Text, View } from 'react-native'
import Header from '../Header'

import globalStyles from '../../constants/globalStyles'

import ProgressBar from '../ProgressBar'

const StudyOverview = ({ navigation }) => {
  return (
    <View >
      <Header title="Study"/>
      <View style={[ globalStyles.generalView ]}>
        <ProgressBar progress={30}/>
        <TouchableHighlight onPress={() => navigation.navigate('SwipeView', {
          data: ["Test", "asd", "mnore", "giv", "me"]
        })}>
          <View>
            <Text>Start studying</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  )
}

export default StudyOverview