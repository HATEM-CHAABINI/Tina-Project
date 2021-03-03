import React, { Component} from 'react';
import { View, Text, TouchableOpacity, StatusBar} from 'react-native';
import MenuBtn from '../components/MenuBtn';
import { Actions } from 'react-native-router-flux';

import { em } from '../common/constants';
import { LoginActions } from '../actions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateUserEmail, loginInWithEmailPassword } from '../common/firebase/auth';
import { validateEmail, showRootToast } from '../common/utils';
import { checkUserEmail, updateUserInfo } from '../common/firebase/database';
import MyTextInputSettings from '../components/MyTextInputSettings';

class MyEmail extends Component {
  constructor(props){
    super(props)

    this.state = {
      email: ""
    }
  }

  UNSAFE_componentWillMount(){
    const {_user} = this.props.auth.credential;
    this.setState({
      email: _user.email
    })
  }

  handleOnClickSave = () => {
    const {email} = this.state;
    const {loginActions} = this.props;
    const {_user} = this.props.auth.credential;
    const curemail = _user.email;
    const password = _user.password;
    
    if (!validateEmail(email)){
      showRootToast('Please enter valid email address')
    }else{
      // Update the email on firebase auth.
      checkUserEmail(email).then(res => {
        if (res){
          showRootToast('The email address already exists')
        }else{
          //This is from firebase doc, because this kind of sensitive data (email change) needs the credentials should be recent one.
          //Othewise error occurs
          loginInWithEmailPassword({email:curemail, password}).then(result => {
            let credential = result.credential;
            loginActions.loginUpdateInfo({...credential, _user});
            updateUserEmail(email).then(success => {
              // If susccessfully signed in, and changed the email successfully
              if (success){
                updateUserInfo({email}).then(r => {
                  if (r){
                    // Update user info with new credential, email
                    loginActions.loginUpdateInfo({...credential, _user:{..._user, email}})
                    Actions.pop();
                  }
                });              
              }
            })
          })
          
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
            <Text style={styles.titleText}>Email</Text>

            <View style={styles.contentWrapper}>
              <Text style={styles.descText}>Adresse email</Text>
              <MyTextInputSettings style={styles.TextInput} autoFocus={true} value={this.state.email} handleChange={(text)=>this.setState({email:text})} />

              <TouchableOpacity style={styles.ActionButton} onPress={this.handleOnClickSave.bind(this)}>
                  <Text style={styles.ActionText}>Valider</Text>
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
    marginTop: 90*em, 
    paddingLeft:20*em, 
    paddingRight: 20*em
  },

  contentWrapper:{
    flexDirection:"column",
    paddingTop: 18*em,
  },

  titleText:{
    fontSize: 24*em,  
    color:"#251b4d", 
    fontFamily:"Merriweather-Black"
  },

  descText:{
    fontSize: 11*em, 
    marginTop: 11*em, 
    color:"#928da6", 
    fontFamily:"OpenSans-Regular"
  },
  
  ActionButton: {
    overflow: 'hidden',
    borderRadius: 18*em,
    height: 50*em, 
    alignItems: 'center',
    backgroundColor: '#28c7ee',
    justifyContent: 'center',
    marginTop: 100*em
  },

  TextInput:{
    width: '98%',
    height: 35*em, 
    fontSize: 15*em, 
    color:"#28c7ee", 
    borderBottomWidth:1*em, 
    borderBottomColor:"#28c7ee", 
    fontFamily:"OpenSans-Regular"
  },

  ActionText:{
    color:"#fff", 
    fontSize: 14*em, 
    fontFamily: "OpenSans-SemiBold"
  }
}

const mapStateToProps = state => ({
  auth: state.auth || {}
});

const mapDispatchToProps = dispatch => ({
  loginActions: bindActionCreators(LoginActions, dispatch)
});

export default connect(
    mapStateToProps, 
    mapDispatchToProps)(MyEmail);