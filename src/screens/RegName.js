import React, { Component} from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar, TouchableHighlightBase } from 'react-native';
import MenuBtn from '../components/MenuBtn';
import { Actions } from 'react-native-router-flux';
import {WIDTH, em} from '../common/constants';
import MyTextInput from '../components/MyTextInput';
import { showRootToast } from '../common/utils';

class RegName extends Component {
  constructor(props){
    super(props)
    this.state = {
      username:""
    }
  }

  handleContinue = () => {
    const {email} = this.props;
    const {username} = this.state;

    if (username == ""){
      showRootToast("S'il vous plaît entrez votre nom");
    }else{
      const splits = username.split(" ");
      let firstname = "", lastname = " ";
      if (splits.length == 1){
        firstname = splits[0];
      }else if (splits.length == 2){
        firstname = splits[0];
        lastname = splits[1];
      }else if (splits.length > 2){
        firstname = splits[0];
        lastname = username.substring(firstname.length + 1);
      }
      Actions.regpostcode({email, firstname, lastname})
    }
  }

  render(){
    return (
        <View style={styles.mainContainer}>
          <StatusBar barstyle="light-content" backgroundColor={"#28c7ee"} />

          <View style={styles.menuWrapper}>
            <MenuBtn image={"back"} onPress={() => Actions.pop()}/>
          </View>

          <View style={styles.contentContainer}>
            <Image source={require('../Assets/tina-start.png')} style={styles.tinaLogo} />

            <Text style={styles.titleText}>Super</Text>

            <Text style={styles.contentText}>Quelle est votre nom?</Text>

            <View style={styles.contentWrapper}>
              <Text style={styles.descText}>Nom</Text>
              <MyTextInput style={styles.TextInput} autoFocus={true} value={this.state.username} handleChange={(text)=>this.setState({username:text})} />

              <TouchableOpacity disabled ={!this.state.username } style={!this.state.username ? styles.ActionButtondis: styles.ActionButton} onPress={this.handleContinue.bind(this)}>
                  <Text style={styles.ActionText}>Continuer</Text>
              </TouchableOpacity>
            </View>
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

  contentContainer: {
    flexDirection: "column",
    marginTop:45*em,
    alignItems:"center",
    zIndex:-1
  },

  tinaLogo:{
    width: WIDTH * 0.3,
    height:90*em,
    marginBottom: 15*em
  },

  contentWrapper:{
    width:WIDTH,
    paddingLeft: 20*em,
    paddingRight: 20*em,
    paddingTop: 15*em
  },

  titleText:{
    fontSize: 25*em,
    color:"#251b4d",
    fontFamily:"Merriweather-Black"
  },

  contentText:{
    fontSize: 15*em,
    marginTop: 8*em,
    color:"#251b4d",
    fontFamily:"OpenSans-Regular"
  },

  descText:{
    fontSize: 12*em,
    marginTop: 10*em,
    color:"#928da6",
    fontFamily:"OpenSans-Regular"
  },
  ActionButton: {
    overflow: 'hidden',
    borderRadius: 18*em,
    height: 50*em,
    alignItems: 'center',
    backgroundColor: '#28C7ED',
    justifyContent: 'center',
    marginTop: -20*em
  },
  ActionButtondis: {
    
    overflow: 'hidden',
    borderRadius: 18*em,
    height: 50*em,
    alignItems: 'center',
    backgroundColor: '#918da6',
    justifyContent: 'center',
    marginTop: -20*em
  },
  TextInput:{
    height: 45*em,
    fontSize: 13*em,
    color:"#28c7ee",
    borderBottomWidth:1*em,
    borderBottomColor:"#28c7ee",
    marginBottom: 60*em,
    fontFamily:"OpenSans-Regular"
  },

  ActionText:{
    color:"#fff",
    fontSize: 14*em,
    fontFamily: "OpenSans-SemiBold"
  }
}

export default RegName;
