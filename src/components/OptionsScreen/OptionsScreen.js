import React, { useEffect } from 'react'

import { TouchableHighlight,
         Text,
         Button,
         StyleSheet,
         SafeAreaView,
         SectionList,
         View } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';
import * as Constants from '../../constants/styleConstants';

import VasernDB from '../../util/database'

const Item = ({ title, link = "" }) => {
  useEffect(() => {
    console.log(VasernDB.Options.data())
  },[])


  return (
    <TouchableHighlight style={styles.item}>
      <View style={styles.itemView}>
        <Text>{ title }</Text>
        <Icon name="angle-right" />
      </View>
    </TouchableHighlight>
  )
}

const DATA = [
  {
    title: "General",
    data: ["Theme", "Sync"]
  },
  {
    title: "Studying",
    data: ["One", "Two"]
  },
]

const OptionsScreen = () => {
  return (
    <SafeAreaView>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Item title={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
      <Button onPress={ () => { console.log( VasernDB.Options.insert({ name: "Option", value: "Value" }) ) } } title="test" />
      <Button onPress={ () => { VasernDB.Options.remove({}) } } title="Remove all options" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  itemView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: Constants.g_fontSize,
    textAlign: "left",
    backgroundColor: "red"
  },
  item: {
    height: 40,
    width: "100%",
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontWeight: "bold",
    fontSize: Constants.g_fontSizeSectionHeader,
    backgroundColor: "#fff"
  },
});

export default OptionsScreen