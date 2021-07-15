import React, { Component } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity, TextInput, Linking } from 'react-native';
import MenuBtn from '../components/MenuBtn';
import { Actions } from 'react-native-router-flux';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { WIDTH, colors, em } from '../common/constants';
import CheckNormal from '../components/svgicons/CheckNormal';
import CheckSelected from '../components/svgicons/CheckSelected';
import DropDownPicker from 'react-native-dropdown-picker';
import { showRootToast, showBiggerRootToast } from '../common/utils';
import Icon from 'react-native-vector-icons/Feather';
import qs from 'qs';

const DATA = [
  {
    id: '1',
    title: 'Publicité',
  },
  {
    id: '2',
    title: 'Plainte',
  },
  {
    id: '3',
    title: 'Problème technique',
  },
  {
    id: '4',
    title: 'Partenariat',
  },
  {
    id: '5',
    title: 'Autres',
  },
];
const Item = ({ id, title }) => (
  <View style={styles.contentItem}>
    {/* {THUMB[id - 1]} */}
    <Text style={styles.contentTitle}>{title}</Text>

  </View>
)

class FAQDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemValue: "Publicité",
      value: null,
      text: "",
      showButton: false,
      showList: false,
      selected: false,
      selectedIndex: 1,
      id: 1
    }

  }

  renderItem = ({ item }) => (

    <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 30 * em }}
      onPress={
        () => this.setState({ selected: true, value: item.title })
      }>
      <Item title={item.title} />

      {this.state.selected && item.title == this.state.value ? <View style={{ marginLeft: 0 * em }} ><CheckSelected width={18 * em} height={18 * em} /></View>
        : <View style={{ marginLeft: 0 * em }}><CheckNormal width={18 * em} height={18 * em} /></View>}
    </TouchableOpacity>


  );

  renderSubject = () => {
    if (this.state.selected) {
      return this.state.value;
    } else {
      return null;
    }
  }


  handleSendForm = () => {
    const { itemValue, value, text } = this.state;
    if (value == null) {
      showRootToast("Veuillez Choisir un des choix.")
      return;
    }
    if (text == "") {
      showRootToast("Veuillez Saisir un message.")
      return;
    }

    let url = `mailto:${'contact@absolutemicro.fr'}`;

    // Create email link query
    const query = qs.stringify({
      subject: itemValue,
      body: text,
    });

    if (query.length) {
      url += `?${query}`;
    }

    Linking.openURL(url)


  }

  render() {
    const { showButton, selected, showList } = this.state;
    const PROP = [
      {
        key: 'Publicité',
        text: 'Publicité',
      },
      {
        key: 'Plainte',
        text: 'Plainte',
      },
      {
        key: 'Problème technique',
        text: 'Problème technique',
      },
      {
        key: 'Partenariat',
        text: 'Partenariat',
      },
      {
        key: 'Autres',
        text: 'Autres',
      },
    ];

    return (


      <ScrollView style={styles.mainContainer}>

        <View style={styles.mainContainer}>
          <StatusBar barstyle="light-content" backgroundColor={"#28c7ee"} />

          <View style={styles.menuWrapper}>
            <MenuBtn image={"close"} onPress={() => Actions.pop()} />
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>Nous Contacter</Text>

            <Text style={styles.contentText}>
              Nous sommes à votre écoute
            </Text>


            {!selected && !showList ? (
              <TouchableOpacity style={{ flex: 1, flexDirection: "row", alignSelf: "flex-start", justifyContent: 'space-between', width: "90%", marginHorizontal: 21 * em, marginBottom: 23 * em }}
                onPress={() => this.setState({ showList: true })}>
                <Text style={{ fontFamily: "OpenSans-Regular", fontSize: 20, color: '#928DA6' }}>Votre Sujet</Text>
                <Icon name="chevron-down" size={30} color={'#928DA6'} />
              </TouchableOpacity>
            ) : null}

            {selected ? (<Text style={styles.subtitleText}>Votre Sujet</Text>) : null}
            {/* {selected ? <Text style={{ width: "90%", height: 43 * em, fontFamily: "OpenSans-Regular", fontSize: 21, color: '#251B4D', borderBottomWidth: 2 * em, borderBottomColor: "#28c7ee", marginBottom: 20 * em }}>{this.state.value}</Text> : null} */}
            {selected && showList ? (
              <TouchableOpacity style={{ flex: 1, flexDirection: "row", alignSelf: "flex-start", justifyContent: 'space-between', width: "90%", marginHorizontal: 21 * em, borderBottomWidth: 2 * em, borderBottomColor: "#28c7ee", height: 43 * em, marginBottom: 20 * em }}
                onPress={() => this.setState({ showList: false })}>
                <Text style={{ width: "90%", fontFamily: "OpenSans-Regular", fontSize: 21, color: '#251B4D' }}>{this.state.value}</Text>
                <Icon name="chevron-up" size={30} color={'#28C7ED'} />
              </TouchableOpacity>
            ) : null}

            {this.state.showList && !selected ?
              <TouchableOpacity style={{ flex: 1, flexDirection: "row", alignSelf: "flex-start", justifyContent: 'space-between', width: "90%", marginHorizontal: 21 * em, marginBottom: 24 * em }}
                onPress={() => this.setState({ showList: false })}>
                <Text style={{ fontFamily: "OpenSans-Regular", fontSize: 20, color: '#928DA6' }}>Votre Sujet</Text>
                <Icon name="chevron-up" size={30} color={'#928DA6'} />
              </TouchableOpacity> : null}
            {selected && !showList ?
              <TouchableOpacity style={{ flex: 1, flexDirection: "row", alignSelf: "flex-start", justifyContent: 'space-between', width: "90%", marginHorizontal: 21 * em, marginBottom: 23 * em }}
                onPress={() => this.setState({ showList: true })}>
                <Text style={{ fontFamily: "OpenSans-Regular", fontSize: 20, color: '#928DA6' }}>{this.state.value}</Text>
                <Icon name="chevron-down" size={30} color={'#928DA6'} />
              </TouchableOpacity> : null}

            {this.state.showList ?

              <FlatList
                data={DATA}
                renderItem={this.renderItem}
                keyExtractor={item => item.id}
              />
              : null}



            {/* <DropDownPicker
              items={[
                { label: 'Publicité', value: 'Publicité', icon: () => selected && itemValue == "Publicité" ? <View style={{ marginLeft: 0 * em }} ><CheckSelected width={18 * em} height={18 * em} /></View> : <View style={{ marginLeft: 0 * em }}><CheckNormal width={18 * em} height={18 * em} /></View> },
                { label: 'Plainte', value: 'Plainte', icon: () => selected && itemValue == "Plainte" ? <View style={{ marginLeft: 240 * em }} ><CheckSelected width={18 * em} height={18 * em} /></View> : <View style={{ marginLeft: 233.7 * em }}><CheckNormal width={18 * em} height={18 * em} /></View> },
                { label: 'Problème technique', value: 'Problème technique', icon: () => selected && itemValue == "Problème technique" ? <View style={{ marginLeft: 240 * em }} ><CheckSelected width={18 * em} height={18 * em} /></View> : <View style={{ marginLeft: 233.7 * em }}><CheckNormal width={18 * em} height={18 * em} /></View> },
                { label: 'Partenariat', value: 'Partenariat', icon: () => selected && itemValue == "Partenariat" ? <View style={{ marginLeft: 240 * em }} ><CheckSelected width={18 * em} height={18 * em} /></View> : <View style={{ marginLeft: 233.7 * em }}><CheckNormal width={18 * em} height={18 * em} /></View> },
                { label: 'Autres', value: 'Autres', icon: () => selected && itemValue == "Autres" ? <View style={{ marginLeft: 240 * em }} ><CheckSelected width={18 * em} height={18 * em} /></View> : <View style={{ marginLeft: 233.7 * em }}><CheckNormal width={18 * em} height={18 * em} /></View> },
              ]}
              placeholder="Votre sujet"
              defaultNull
              containerStyle={{ height: em * 60, width: "100%" }}
              style={{
                backgroundColor: '#f6f5fa',
                borderWidth: 0,
                marginLeft: 10 * em,
              }}
              dropDownStyle={{
                height: 1000 * em,
                width: '90%',
                marginLeft: 20 * em,

                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderTopWidth: 2,
                borderTopColor: '#28C7ED',
                backgroundColor: '#f6f5fa',
              }}
              dropDownMaxHeight={1000 * em}
              itemStyle={{
                flexDirection: 'row-reverse',
                justifyContent: 'flex-start',

              }}
              arrowStyle={{ marginRight: 10 }}
              arrowSize={30}
              arrowColor={'#928DA6'}
              customArrowUp={(size, color) => <Icon name="chevron-up" size={size} color={'#28C7ED'} />}
              placeholderStyle={{
                fontFamily: "OpenSans-Regular",
                fontWeight: 'normal',
                fontSize: 20,
                color: '#928DA6'
              }}
              labelStyle={{
                fontFamily: "OpenSans-Regular",
                fontWeight: 'bold',
                marginBottom: 10 * em,
                fontSize: 15,
                textAlign: 'left',
                color: '#251B4D',

              }}
              selectedLabelStyle={{
                fontFamily: "OpenSans-Regular",
                fontWeight: 'normal',
                fontSize: 20,
                color: '#251B4D',

              }}

              activeItemStyle={{}}
              onChangeItem={
                item => this.setState({
                  itemValue: item.value,
                  value: item.value,
                  selected: true,
                  //     showButton: false
                })
              }
            /> */}

            {!showList ?
              <TextInput
                style={styles.TextInputStyleClass}
                underlineColorAndroid="transparent"
                placeholder={"Écrivez votre message ici"}
                placeholderTextColor={"#BCB8CC"}
                multiline
                numberOfLines={4}
                maxLength={400}
                onFocus={() => this.setState({ showButton: true })}
                //onEndEditing={() => this.setState({ showButton: false })}
                //onSelectionChange={()=>this.setState({showButton: false})}
                onChangeText={text => this.setState({
                  text: text,
                })}
                value={this.state.text}
              /> : null}
            {(showButton && selected) ?
              (<TouchableOpacity style={[styles.ActionButton]} onPress={this.handleSendForm} >
                <Text style={styles.ActionText}>Continuer</Text>
              </TouchableOpacity>) : null}

            <Image source={require('../Assets/announcer_bottom_round.png')} style={{ width: WIDTH, height: WIDTH * 0.245 }} resizeMode="stretch" />

          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = {

  mainContainer: {

    flex: 1,
    backgroundColor: '#f6f5fa',
    flexDirection: 'column',

  },
  menuWrapper: {
    position: "absolute",
    right: 20 * em,
    top: 20 * em
  },
  contentContainer: {
    flexDirection: "column",
    marginTop: 80 * em,
    marginBottom: 50 * em,
    alignItems: "center",
    zIndex: -1
  },

  titleText: {

    fontSize: 25 * em,
    color: "#251b4d",
    fontFamily: "Merriweather-Black"
  },

  contentText: {
    fontSize: 14 * em,
    marginTop: 8 * em,
    marginBottom: 50 * em,
    color: "#251b4d",
    fontFamily: "OpenSans-Regular"
  },

  subtitleText: {
    fontSize: 13 * em,
    marginLeft: 20 * em,
    marginBottom: 4 * em,
    alignSelf: "flex-start",
    color: "#928DA6",
    fontFamily: "OpenSans-Regular",

  },

  TextInputStyleClass: {
    marginTop: 0,
    paddingTop: 20 * em,
    paddingBottom: 10 * em,
    textAlign: 'left',
    textAlignVertical: 'top',
    width: '90%',
    borderWidth: 2,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#EBEAF1',

    backgroundColor: "#F6F5FA",


    fontFamily: "OpenSans-Regular",
    fontSize: 20,

  },

  contentItem: {
    width: "80%",
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },

  contentTitle: {
    fontSize: 15 * em,
    color: "#251B4D",
    //marginTop: 14 * em,
    //marginBottom: 14 * em,
    fontFamily: "OpenSans-SemiBold",

  },

  contentDesc: {
    fontSize: 12 * em,
    textAlign: "center",
    color: "#a099b0",
    fontFamily: "OpenSans-Regular",
    lineHeight: 20 * em
  },

  iconCircle: {
    width: 90 * em,
    height: 90 * em,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 45 * em,
  },

  ActionText: {
    color: "#fff",
    fontSize: 14 * em,
    fontFamily: "OpenSans-SemiBold"
  },

  ActionButton: {
    overflow: 'hidden',
    width: "90%",
    borderRadius: 18 * em,
    height: 50 * em,
    alignItems: 'center',
    backgroundColor: '#918da6',
    justifyContent: 'center',
  },
}

export default FAQDetail;