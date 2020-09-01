import React, { useEffect } from 'react'

import Dict from '../../util/Dict'

import { _getDecks, _setOption, _destroyDb, _getAllCards, _addDeck, _getOption, _removeOption, _firstTimeSetup } from '../../util/database'

import { TouchableHighlight,
         Text,
         Button,
         StyleSheet,
         SafeAreaView,
         SectionList,
         View } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';
import * as Constants from '../../constants/styleConstants';

const Item = ({ title, link = "", navigateTo }) => {
  useEffect(() => {
  },[])


  return (
    <TouchableHighlight style={styles.item} onPress={ () => {
      navigateTo('SubOptionsScreen', title)
    } }>
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
  {
    title: "Debug",
    data: ["Data creation"]
  }
]

const OptionsScreen = ({ route, navigation }) => {
  navigateTo = (link, title) => {
    navigation.navigate(link, {
      title: title
    });
  }

  return (
    <SafeAreaView>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Item navigateTo={navigateTo} title={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />


      <Button onPress={ () => { console.log(_firstTimeSetup()) } } title="First Time Setup" />
      <Button onPress={ () => {
        _getAllCards()
        .then(res => {console.log(res.docs)})
        .catch( err => {console.log(err)} ) } }
        title="Log all Cards" />
      <Button onPress={ () => {
        _getDecks().then(doc => {console.log(doc.docs)}).catch(err => console.log(err))
       } } title="Log All Decks" />
      <Button onPress={ () => { console.log(_destroyDb()) } } title="Destroy DB" />


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