import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar, PermissionsAndroid } from 'react-native';
import MenuBtn from '../components/MenuBtn';
import { Actions } from 'react-native-router-flux';
import { WIDTH, em } from '../common/constants';
import Position from '../components/svgicons/Position';
import MyTextInput from '../components/MyTextInput';
import { showRootToast } from '../common/utils';
import GeoLocation from '@react-native-community/geolocation';
import { requestLocationPermission } from '../common/utils';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateUserInfo } from '../common/firebase/database';
import { LoginActions, AppActions } from '../actions';

class RegPostcode extends Component {
  constructor(props) {
    super(props)

    this.state = {
      zipcode: "",
      address: "",
      lat: "",
      lng: ""
    }
  }

  getCurrentLocation = () => {
    const { appActions } = this.props;

    GeoLocation.getCurrentPosition(
      info => {
        console.log("=====Location", info);
        const coords = info.coords;
        const data = {
          lat: coords.latitude,
          lng: coords.longitude
        };
        this.setState(data);
        appActions.setGeoLocation(data);
      },
      error => {
        console.log(error);
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 0 },
    )
  }

  componentDidMount() {
    const { isAuthenticated } = this.props.auth;

    if (Platform.OS === 'android') {
      requestLocationPermission().then(res => {
        if (res) {
          this.getCurrentLocation();
        }
      });
    } else {
      this.getCurrentLocation();
    }

    if (isAuthenticated) {
      const { _user } = this.props.auth.credential;
      this.setState({ zipcode: _user.zipcode })
    }

  }

  onPickedZipcode = (zipcode, address) => {
    this.setState({ zipcode, address })
  }

  handleFocus = () => {
    Actions.searchpostcode({ cb: this.onPickedZipcode })
  }

  handleContinue = () => {
    const { email, firstname, lastname } = this.props;
    const { isAuthenticated } = this.props.auth;
    const { zipcode, lat, lng } = this.state;

    if (zipcode == "") {
      showRootToast("S'il vous plait, entrer votre code postal");
    } else {
      if (!isAuthenticated) {
        Actions.regpassword({ email, firstname, lastname, zipcode, lat, lng })
      } else {
        const { loginActions } = this.props;
        const { credential } = this.props.auth;
        const { _user } = credential;
        updateUserInfo({ zipcode, lat, lng }).then(res => {
          if (res) {
            // Update user info with new credential, changed the zipcode, lat, lng
            loginActions.loginUpdateInfo({ ...credential, _user: { ..._user, zipcode, lat, lng } })
            Actions.pop();
          }
        })
      }
    }
  }

  render() {
    const { zipcode, address } = this.state;
    return (
      <View style={styles.mainContainer}>
        <StatusBar barstyle="light-content" backgroundColor={"#28c7ee"} />

        <View style={styles.menuWrapper}>
          <MenuBtn image={"back"} onPress={() => Actions.pop()} />
        </View>

        <View style={styles.contentContainer}>
          <Image source={require('../Assets/tina-start.png')} style={styles.tinaLogo} />

          <Text style={styles.titleText}>Pour mieux vous aider</Text>

          <Text style={styles.contentText}>Quel est votre code postal?</Text>

          {(zipcode == null || address == "") &&
            <Text style={styles.descText}>Votre code postal nous permet d'améliorer votre expérience sur Tina en vous proposant les meilleures solutions autour de vous.</Text>
          }

          <View style={styles.contentWrapper}>
            <MyTextInput handleFocus={this.handleFocus} style={styles.TextInput} textContentType={"telephoneNumber"} placeholder={"Code postal"} value={zipcode} />
            {(zipcode != null && address != "") &&
              <View style={styles.positionWrapper}>
                <Position width={14 * em} height={14 * em} />
                <Text style={styles.contentBlueText}>Position actuelle: {address}</Text>
              </View>
            }
            <TouchableOpacity disabled={!this.state.zipcode} style={!this.state.zipcode ? styles.ActionButtondis : styles.ActionButton} onPress={this.handleContinue.bind(this)}>
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

  descText: {
    fontSize: 12 * em,
    paddingLeft: 20 * em,
    paddingRight: 20 * em,
    marginTop: 10 * em,
    color: "#928da6",
    fontFamily: "OpenSans-Regular",
    textAlign: 'center'
  },

  contentBlueText: {
    fontSize: 13 * em,
    fontFamily: "OpenSans-Regular",
    color: "#28c7ee",
    marginLeft: 10 * em
  },

  positionWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15 * em,
    marginBottom: 60 * em
  },

  ActionButton: {
    overflow: 'hidden',
    borderRadius: 18 * em,
    height: 50 * em,
    alignItems: 'center',
    backgroundColor: '#28C7ED',
    justifyContent: 'center',
    marginTop: 62 * em
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
  }
}

const mapStateToProps = state => ({
  auth: state.auth || {}
});

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(AppActions, dispatch),
  loginActions: bindActionCreators(LoginActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps)(RegPostcode);
