import React, { Component} from 'react';
import { View, StatusBar, Platform } from 'react-native';
import MenuBtn from '../components/MenuBtn';
import { Actions } from 'react-native-router-flux';
import {em} from '../common/constants';
import { FlatList } from 'react-native-gesture-handler';
import MyTextInput from '../components/MyTextInput';
import PostcodeItem from '../components/PostcodeItem';
// import {byCode} from 'fr-zip';
//import {zipcodes} from '../zipcodes.json'
// import {RNFetchBlob} from 'react-native-fs'

class SearchPostcode extends Component {
  constructor(props){
    super(props)

    this.state = {
      postCode: "",
      listData: []
    }
  }

  async lookupZipcodes(partialZip){
    let jsonFile = partialZip.slice(0, 2);
    var RNFS = require('react-native-fs');
    let asset_content = null;
    try {
        if (Platform.OS === 'android'){
          asset_content = await RNFS.readFileAssets(`zipcodes/${jsonFile}.json`, 'utf8')
        }else{
          asset_content = await RNFS.readFile(RNFS.MainBundlePath + `/${jsonFile}.json`, 'utf8');
        }
      } catch (err) {
        console.log('ERROR:', err);
    }

    //console.log(asset_content);

    if (!asset_content){
      return [];
    }

    const assets = JSON.parse(asset_content);
    var list = [];
    var r = new RegExp(`^${partialZip}.*`);

    assets.map((item) => {
      if (r.test(item['fields']['code_postal'])){
        list.push({id:item['recordid'], zipcode:item['fields']['code_postal'], title:item['fields']['code_postal'] + " " + item['fields']['nom_de_la_commune']});
      }
    })

    return list;
  }

  handleChange = (text) => {
    this.setState({postCode: text})

    if (text.length >= 2){
      this.lookupZipcodes(text).then((list) =>
        this.setState({listData: list})
      )
    }else{
      this.setState({listData:[]})
    }
  }

  handleOnItemClick = (zipcode, title) => {
    this.props.cb(zipcode, title)
    Actions.pop()
  }

  renderDivider = () => (<View style={styles.listDivider} />)

  render(){
    let _this = this;
    return (
        <View style={styles.mainContainer}>
          <StatusBar barstyle="light-content" backgroundColor={"#28c7ee"} />

          <View style={styles.menuWrapper}>
            <MenuBtn image={"back"} onPress={() => Actions.pop()}/>
          </View>

          <View style={{paddingLeft:20*em, paddingRight:20*em, marginTop:100*em, zIndex:-1}}>
            <MyTextInput handleChange={this.handleChange.bind(this)} style={styles.TextInput} keyboardType={'numeric'} textContentType={"telephoneNumber"} autoFocus={true} placeholder={"Code postal"} value={this.state.postCode} />
            <FlatList data={this.state.listData}
                ItemSeparatorComponent={this.renderDivider}
                renderItem={({item}) => <PostcodeItem id={item.id} title={item.title} onClick={() => this.handleOnItemClick(item.zipcode, item.title)}/>}
                keyExtractor={item => item.id.toString()} />
          </View>
        </View>
    )
  }
}

const styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: '#f6f5fa',
    flexDirection: 'column',
  },

  headerContainer: {
    flex: 1
  },

  menuWrapper:{
    position:"absolute",
    left:20*em,
    top:20*em
  },

  TextInput:{
    height: 45*em,
    fontSize: 13*em,
    color:"#28c7ee",
    borderBottomWidth:1*em,
    borderBottomColor:"#28c7ee",
    fontFamily:"OpenSans-Regular"
  },

  listDivider:{
    height:1.2*em,
    backgroundColor:"#eee"
  },
}

export default SearchPostcode;
