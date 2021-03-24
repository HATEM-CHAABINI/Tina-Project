import React, { Component} from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar} from 'react-native';
import CheckBox from '@react-native-community/checkbox'
import MenuBtn from '../components/MenuBtn';
import { Actions } from 'react-native-router-flux';
import {WIDTH, em} from '../common/constants';
import TermsNormal from '../components/svgicons/TermsNormal';
import MyTextInput from '../components/MyTextInput';
import { showRootToast, showBiggerRootToast } from '../common/utils';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppActions, SignupActions } from '../actions'

class RegPassword extends Component {
  constructor(props){
    super(props)

    this.state = {
      password: "",
      isTermChecked: false,
    }
  }

  handleLoginDone(){
    const {password, isTermChecked} = this.state;
    const {email, firstname, lastname, zipcode, lat, lng, signupActions, appActions} = this.props;
    const {isFetching} = this.props.signup;

    if (password == "" || password.length <6 ){
      showBiggerRootToast('Le mot de passe doit contenir au moins six caractères');
      return;
    }

    if (!isTermChecked){
      showBiggerRootToast("Vous devez accepter les conditions génerales d'utilisation");
      return;
    }

    const timerId = setTimeout(() => {
       if (isFetching){
         signupActions.signUpFailed("DB: Timeout")
         appActions.setGlobalNotification({
          message: "Check the device network connection",
        })
       }
    }, 5000);
    signupActions.trySignup({
      email,
      firstname,
      lastname,
      zipcode,
      password,
      lat,
      lng,
      onesignal: this.props.app.onesignal
    })
  }

  render(){
    const {signup} = this.props;
    const signingUp = false;  // signup.isFetching
    console.log("isFetching", signingUp)
    const {app, appActions} = this.props;

    if (app.globalNotification && app.globalNotification.message) {
      const { message, type, duration } = app.globalNotification;
      showRootToast(message);
      appActions.setGlobalNotification({"message":""});
    }

    return (
        <View style={styles.mainContainer}>
          <StatusBar barstyle="light-content" backgroundColor={"#28c7ee"} />

          <View style={styles.menuWrapper}>
            <MenuBtn image={"back"} onPress={() => Actions.pop()}/>
          </View>

          <View style={styles.contentContainer}>
            <Image source={require('../Assets/tina-start.png')} style={styles.tinaLogo}/>

            <Text style={styles.titleText}>Pour finir</Text>

            <Text style={styles.contentText}>Créez un mot de passe</Text>

            <View style={styles.contentWrapper}>
              <MyTextInput style={styles.TextInput} secureTextEntry={true} textContentType={"password"} autoFocus={true} placeholder={"Mot de passe"} value={this.state.password} handleChange={(text)=>this.setState({password:text})}/>

                <View style={{flexDirection:"row", marginTop:80*em, marginBottom: 20*em}}>

                  <CheckBox style={styles.checkBox} value={this.state.isTermChecked} onValueChange={(isSelected) => this.setState({isTermChecked:isSelected})} />
                  <Text style={styles.TermsText}>
                    En cochant cette case j'accepte les
                    <Text style={styles.linkText} onPress={()=>{ Actions.cgu();}}> Conditions d'utilisation </Text>
                    et la
                    <Text style={styles.linkText} onPress={()=>{ Actions.rgpd();}}> Politique de confidentiallte</Text>
                    de Tina.
                  </Text>

                </View>

              <TouchableOpacity disabled={!this.state.password || !this.state.isTermChecked} style={!this.state.password || !this.state.isTermChecked ? styles.ActionButtondis: styles.ActionButton} onPress={this.handleLoginDone.bind(this)} >
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

  ActionButton: {
    overflow: 'hidden',
    borderRadius: 18*em,
    height: 50*em,
    alignItems: 'center',
    backgroundColor: '#28C7ED',
    justifyContent: 'center',
    marginTop: 18*em
  },
  ActionButtondis: {
    
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
    fontFamily:"OpenSans-Regular"
  },

  ActionText:{
    color:"#fff",
    fontSize: 14*em,
    fontFamily: "OpenSans-SemiBold"
  },

  TermsText:{
    paddingLeft:15*em,
    paddingRight:15*em,
    fontSize: 11*em,
    marginTop:-2*em,
    color:"#928da6",
    lineHeight: 18*em,
    fontFamily:"OpenSans-Regular"
  },

  linkText:{
    color:"#28c7ee",
    fontFamily:"OpenSans-Regular"
  },

  checkBox: {
    alignSelf: "center"
  }
}

const mapStateToProps = state => ({
  app: state.app || {},
  signup: state.signup || {}
});

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(AppActions, dispatch),
  signupActions: bindActionCreators(SignupActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegPassword);
