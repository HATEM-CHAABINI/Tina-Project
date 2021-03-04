import React, { Component} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import MenuBtn from '../components/MenuBtn';
import { Actions } from 'react-native-router-flux';
import {WIDTH, em} from '../common/constants';
import MyTextInput from '../components/MyTextInput';
import { AppActions } from '../actions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { validateEmail, showRootToast } from '../common/utils';
import { checkUserEmail } from '../common/firebase/database';

class RegEmail extends Component {
  constructor(props){
    super(props)

    this.state = {
      email: ""
    }
  }

  handleGoLogin = () => {
    Actions.pop();
    Actions.signin();
  }

  handleContinue = () => {
    const {email} = this.state;

    if (!validateEmail(email)){
      showRootToast('Please enter valid email address')
    }else{
      checkUserEmail(email).then(res => {
        if (res){
          showRootToast('The email address already exists')
        }else{
          Actions.regname({email});
        }
      });
    }
  }

  render(){
    return (
        <View style={styles.mainContainer}>
          <StatusBar barstyle="light-content" backgroundColor={"#28c7ee"} />

          <View style={styles.menuWrapper}>
            <MenuBtn image={"close"} onPress={() => Actions.pop()}/>
          </View>

          <View style={styles.contentContainer}>
            <Image source={require('../Assets/tina-start.png')} style={styles.tinaLogo}  />

            <Text style={styles.titleText}>Bievenue!</Text>

            <Text style={styles.contentText}>Quel est votre email?</Text>

            <View style={styles.contentWrapper}>
              <Text style={styles.descText}>Adresse email</Text>
              <MyTextInput style={styles.TextInput} textContentType={"emailAddress"} autoFocus={true} value={this.state.email} handleChange={(text)=>this.setState({email:text})} />

              <Text style={StyleSheet.flatten([styles.descText, {alignSelf:"center", fontSize: 14*em}])}>
                Déjà un compte?
                <Text style={styles.linkText} onPress={this.handleGoLogin}> Se connecter ici</Text>
              </Text>

              <TouchableOpacity style={styles.ActionButton} onPress={this.handleContinue.bind(this)}>
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
    right:20*em,
    top:20*em
  },

  contentContainer: {
    flexDirection: "column",
    marginTop: 45*em,
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

  linkText:{
    color:"#28c7ee",
    fontFamily:"OpenSans-SemiBold"
  },

  ActionButton: {
    overflow: 'hidden',
    borderRadius: 18*em,
    height: 50*em,
    alignItems: 'center',
    backgroundColor: '#918da6',
    justifyContent: 'center',
    marginTop: 18*em
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

const mapStateToProps = state => ({
  app: state.app || {},
});

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(AppActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps)(RegEmail);
