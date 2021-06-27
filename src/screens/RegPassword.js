import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Platform,StatusBar } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import MenuBtn from '../components/MenuBtn';
import { Actions } from 'react-native-router-flux';
import { WIDTH, em } from '../common/constants';
import TermsNormal from '../components/svgicons/TermsNormal';
import CheckPsw from '../components/svgicons/CheckPsw';
import CheckPswDone from '../components/svgicons/CheckPswDone';

import MyTextInput from '../components/MyTextInput';
import { showRootToast, showBiggerRootToast } from '../common/utils';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppActions, SignupActions } from '../actions'
import RoundedCheckbox from "react-native-rounded-checkbox";

//const checkShapeSize = { width: 26 * hm, height: 26 * hm };
class RegPassword extends Component {
  constructor(props) {
    super(props)

    this.state = {
      password: "",
      isTermChecked: false,
    }
  }

  handleLoginDone() {
    const { password, isTermChecked } = this.state;
    const { email, firstname, lastname, zipcode, lat, lng, signupActions, appActions } = this.props;
    const { isFetching } = this.props.signup;

    if (password == "" || password.length < 6) {
      showBiggerRootToast('Le mot de passe doit contenir au moins six caractères');
      return;
    }

    if (!isTermChecked) {
      showBiggerRootToast("Vous devez accepter les conditions génerales d'utilisation");
      return;
    }

    const timerId = setTimeout(() => {
      if (isFetching) {
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

  render() {
    const { signup } = this.props;
    const signingUp = false;  // signup.isFetching
    console.log("isFetching", signingUp)
    const { app, appActions } = this.props;

    if (app.globalNotification && app.globalNotification.message) {
      const { message, type, duration } = app.globalNotification;
      showRootToast(message);
      appActions.setGlobalNotification({ "message": "" });
    }

    return (
      <View style={styles.mainContainer}>
        <StatusBar barstyle="light-content" backgroundColor={"#28c7ee"} />

        <View style={styles.menuWrapper}>
          <MenuBtn image={"back"} onPress={() => Actions.pop()} />
        </View>

        <View style={styles.contentContainer}>
          <Image source={require('../Assets/tina-start.png')} style={styles.tinaLogo} />

          <Text style={styles.titleText}>Pour finir</Text>

          <Text style={styles.contentText}>Créez un mot de passe</Text>

          <View style={styles.contentWrapper}>
            <MyTextInput style={styles.TextInput} secureTextEntry={true} textContentType={"password"} autoFocus={true} placeholder={"Mot de passe"} value={this.state.password} handleChange={(text) => this.setState({ password: text })} />

            <View style={{ flexDirection: "row", justifyContent: "flex-start", marginTop: 80 * em, marginBottom: 20 * em, marginRight: 20 * em }}>

              {/* <TouchableOpacity onPress={this.state.isTermChecked ? this.setState({ isTermChecked: false }) : this.setState({ isTermChecked: true })} >
                {this.state.isTermChecked ?
                  <CheckPswDone width={20 * em} height={20 * em} /> :
                  <CheckPsw width={20 * em} height={20 * em} />
                }
              </TouchableOpacity> */}


              {/* {this.state.isTermChecked ?
                <TouchableOpacity style={styles.checkBox} onPress={() => this.setState({ isTermChecked: false })}>
                  <CheckPswDone width={20 * em} height={20 * em} />
                </TouchableOpacity>
                : <TouchableOpacity style={styles.checkBox} onPress={() => this.setState({ isTermChecked: true })}>
                  <CheckPsw width={20 * em} height={20 * em} />
                </TouchableOpacity>

              } */}
{Platform.OS === 'ios' ?
                     <CheckBox style={styles.checkBox} value={this.state.isTermChecked} onValueChange={(isSelected) => this.setState({ isTermChecked: isSelected })} />

          :   
          <RoundedCheckbox style={styles.checkBox} component={<CheckPsw width={20 * em} height={20 * em} />} outerBorderColor={"#928DA6"} checkedColor={"#F6F5FA"} outerSize={20 * em} uncheckedColor={"#F6F5FA"} onPress={(checked) => this.setState({ isTermChecked: checked })} />

                }   
                 <Text style={styles.TermsText}>
                En cochant cette case j'accepte les
                    <Text style={styles.linkText} onPress={() => { Actions.cgu(); }}> Conditions d'utilisation </Text>
                    et la
                    <Text style={styles.linkText} onPress={() => { Actions.rgpd(); }}> Politique de confidentiallte</Text>
                    de Tina.
                  </Text>

            </View>

            <TouchableOpacity disabled={!this.state.password || !this.state.isTermChecked} style={!this.state.password || !this.state.isTermChecked ? styles.ActionButtondis : styles.ActionButton} onPress={this.handleLoginDone.bind(this)} >
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

  menuWrapper: {
    position: "absolute",
    left: 20 * em,
    top: 20 * em
  },

  contentContainer: {
    flexDirection: "column",
    marginTop: 45 * em,
    alignItems: "center",
    zIndex: -1
  },

  tinaLogo: {
    width: WIDTH * 0.3,
    height: 90 * em,
    marginBottom: 15 * em
  },

  contentWrapper: {
    width: WIDTH,
    paddingLeft: 20 * em,
    paddingRight: 20 * em,
    paddingTop: 15 * em
  },

  titleText: {
    fontSize: 25 * em,
    color: "#251b4d",
    fontFamily: "Merriweather-Black"
  },

  contentText: {
    fontSize: 15 * em,
    marginTop: 8 * em,
    color: "#251b4d",
    fontFamily: "OpenSans-Regular"
  },

  ActionButton: {
    overflow: 'hidden',
    borderRadius: 18 * em,
    height: 50 * em,
    alignItems: 'center',
    backgroundColor: '#28C7ED',
    justifyContent: 'center',
    marginTop: 18 * em
  },
  ActionButtondis: {

    overflow: 'hidden',
    borderRadius: 18 * em,
    height: 50 * em,
    alignItems: 'center',
    backgroundColor: '#918da6',
    justifyContent: 'center',
    marginTop: 18 * em
  },

  TextInput: {
    height: 45 * em,
    fontSize: 13 * em,
    color: "#28c7ee",
    borderBottomWidth: 1 * em,
    borderBottomColor: "#28c7ee",
    fontFamily: "OpenSans-Regular"
  },

  ActionText: {
    color: "#fff",
    fontSize: 14 * em,
    fontFamily: "OpenSans-SemiBold"
  },

  TermsText: {
    paddingLeft: 15 * em,
    paddingRight: 15 * em,
    fontSize: 10 * em,
    //marginTop: 0 * em,
    color: "#928da6",
    lineHeight: 18 * em,
    fontFamily: "OpenSans-Regular"
  },

  linkText: {
    color: "#28c7ee",
    fontFamily: "OpenSans-Bold"
  },

  checkBox: {
    //justifyContent: "flex-start",
    // alignItems: "flex-start"
    alignSelf: "flex-start",
    borderColor: "#928DA6"
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
