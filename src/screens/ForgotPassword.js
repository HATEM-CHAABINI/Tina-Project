import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import MyTextInput from '../components/MyTextInput';
import { WIDTH, em } from '../common/constants';
import { Actions } from 'react-native-router-flux';
import { validateEmail, showRootToast } from '../common/utils';
import { passwordReset } from '../common/firebase/database';
import { Alert } from 'react-native';

class ForgotPassword extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: ""
    }
  }

  async handlePasswordReset() {
    console.log('**************** Password reset');
    console.log('**************** email: this: ', this.state.email);
    if (this.state.email === '') {
      Alert.alert('Enter details to signin!')
    } else {
      //try {

      await passwordReset(this.state.email);
      Actions.pop();
      Actions.signin();
    }

    /*} catch (error) {
      actions.setFieldError('general', error.message);
    }*/
  }

  render() {
    const { email } = this.state;
    const { app, appActions } = this.props;



    /*if (!validateEmail(email)){
      showRootToast('Please enter valid email address')
      return;
    }*/

    /*if (app.globalNotification && app.globalNotification.message) {
      const { message, type, duration } = app.globalNotification;
      showRootToast(message);
      appActions.setGlobalNotification({"message":""});
    }*/

    return (
      <View style={styles.mainContainer}>
        <StatusBar barstyle="light-content" backgroundColor={"#28c7ee"} />

        <View style={styles.menuWrapper}>
          <MenuBtn image={"close"} onPress={() => Actions.pop()} />
        </View>

        <View style={styles.contentContainer}>
          <Image source={require('../Assets/tina-start.png')} style={styles.tinaLogo} resizeMode={'contain'} />

          <Text style={styles.titleText}>Mot de passe oublié ?</Text>

          <Text style={styles.contentText}>
            Réinitialiser votre mot de passe
          </Text>

          <View style={styles.contentWrapper}>
            <MyTextInput style={styles.TextInput} textContentType={"emailAddress"} autoFocus={true} placeholder={"Renseignez votre email"} value={email} handleChange={(text) => this.setState({ email: text })} />

            <TouchableOpacity style={!this.state.email ? styles.ActionButtondis : styles.ActionButton} onPress={this.handlePasswordReset.bind(this)} >
              <Text style={styles.ActionText}>Réinitialiser</Text>
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
    right: 20 * em,
    top: 20 * em
  },

  contentContainer: {
    flexDirection: "column",
    marginTop: 45 * em,
    alignItems: "center",
    zIndex: -1
  },

  tinaLogo: {
    width: 100 * em,
    height: 85 * em,
    marginBottom: 15 * em
  },

  contentWrapper: {
    width: WIDTH,
    paddingLeft: 20 * em,
    paddingRight: 20 * em,
    paddingTop: 15 * em
  },

  titleText: {
    fontSize: 22 * em,
    color: "#251b4d",
    fontFamily: "Merriweather-Black"
  },

  contentText: {
    fontSize: 13 * em,
    marginTop: 8 * em,
    color: "#251b4d",
    fontFamily: "OpenSans-Regular"
  },

  descText: {
    alignSelf: "center",
    fontSize: 13 * em,
    marginTop: 13 * em,
    color: "#928da6",
    fontFamily: "OpenSans-Regular"
  },

  ActionButton: {
    overflow: 'hidden',
    borderRadius: 18 * em,
    height: 50 * em,
    alignItems: 'center',
    backgroundColor: '#28C7ED',
    justifyContent: 'center',
    marginTop: 80 * em
  },
  ActionButtondis: {

    overflow: 'hidden',
    borderRadius: 18 * em,
    height: 50 * em,
    alignItems: 'center',
    backgroundColor: '#918da6',
    justifyContent: 'center',
    marginTop: 80 * em
  },
  TextInput: {
    height: 45 * em,
    fontSize: 13 * em,
    color: "#28c7ee",
    borderBottomWidth: 1 * em,
    fontFamily: "OpenSans-Regular"
  },

  ActionText: {
    color: "#fff",
    fontSize: 14 * em,
    fontFamily: "OpenSans-SemiBold"
  },

  linkText: {
    color: "#28c7ee",
    fontFamily: "OpenSans-SemiBold"
  }
}

export default ForgotPassword;