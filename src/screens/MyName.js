import React, { Component} from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import MenuBtn from '../components/MenuBtn';
import { Actions } from 'react-native-router-flux';
import MyTextInputSettings from '../components/MyTextInputSettings';
import {em} from '../common/constants'
import { LoginActions } from '../actions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateUserInfo } from '../common/firebase/database';
import AnswerNotFound from '../components/svgicons/AnswerNotFound';

class MyName extends Component {
  constructor(props){
    super(props)
    this.state = {
      firstname: "",
      lastname: ""
    }
  }

  UNSAFE_componentWillMount(){
    const {_user} = this.props.auth.credential;
    this.setState({
      firstname: _user.firstname,
      lastname: _user.lastname
    })
  }

  handleOnClickSave = () => {
    const {firstname, lastname} = this.state;
    const {loginActions} = this.props;
    const {credential} = this.props.auth;
    const {_user} = credential;

    if (firstname == ""){
      showRootToast('Please enter your firstname')
    }else{
      updateUserInfo({firstname, lastname}).then(res => {
        if (res){
          // Update user info with new credential, changed the zipcode, lat, lng
          loginActions.loginUpdateInfo({...credential, _user:{..._user, firstname, lastname}})
          Actions.pop();
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
            <Text style={styles.titleText}>Nom / Prénom</Text>

            <View style={styles.contentWrapper}>
              <Text style={styles.descText}>Nom</Text>
              
              
              
              <MyTextInputSettings style={styles.TextInput} autoFocus={true} value={this.state.firstname} handleChange={(text)=>this.setState({firstname:text} )}/>
  
              

              <Text style={[styles.descText, {marginTop:20}]}>Prénom</Text>
              <MyTextInputSettings style={styles.TextInput} autoFocus={false} value={this.state.lastname} handleChange={(text)=>this.setState({lastname:text})}/>

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
    fontSize: 13*em, 
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
    height: 40*em, 
    fontSize: 15*em, 
    color:"#28c7ee", 
    borderBottomWidth:1*em, 
    borderBottomColor:"#28c7ee", 
    fontFamily:"OpenSans-Regular",
    
    
    
  },

  ActionText:{
    color:"#fff", 
    fontSize: 14*em, 
    fontFamily: "OpenSans-SemiBold"
  },
  closeButton: {
    height: 16,
    width: 16,
  },
  closeButtonParent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    
    
     
    
  },
  clear:{
    flexDirection: 'row',
    
    
    
     
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
    mapDispatchToProps)(MyName);