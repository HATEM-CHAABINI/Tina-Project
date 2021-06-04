import React, { Component, useState } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import MenuBtn from '../components/MenuBtn';
import RectangleImage from '../components/RectangleImage';
import Ordinateur from '../components/svgicons/Ordinateur';
import Periferique from '../components/svgicons/Periferique';
import Astuce from '../components/svgicons/Astuce';
import Logiciel from '../components/svgicons/Logiciel';
import Internet from '../components/svgicons/Internet';
import Recherche from '../components/svgicons/Recherche';
import MenuModal from '../components/MenuModal';
import ConfirmPaymentModal from '../components/ConfirmPaymentModal';
import { Actions } from 'react-native-router-flux';
import { Q_TYPES, Q_TYPE_STRINGS, WIDTH, HEIGHT, em } from '../common/constants';
import { AppActions, QuestionActions, LoginActions } from '../actions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createDummyJSON, createUserDummyJSON, createStoresDummyJSON, createFAQDummyJSON, createSettingDummyJSON, createAboutusDummyJSON } from '../common/firebase/database'
import { getQuestionByCategoryAndId } from '../common/firebase/database';
import { logout } from '../common/firebase/auth';
import { showRootToast } from '../common/utils';
import { requestLocationPermission } from '../common/utils';
import GeoLocation from '@react-native-community/geolocation';
import admobConfig from '../common/config/admob';
import { getAdmob, getAllAdvertisements } from '../common/firebase/database';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Dimensions } from 'react-native';


const admobConf = Platform.OS === 'ios' ? admobConfig.ios : admobConfig.android;

class Home extends Component {
  _isMounted = false;

  state = {
    menuVisible: false,
  }

  watchID = null;

  getCurrentLocation = () => {
    const { appActions } = this.props;

    GeoLocation.getCurrentPosition(
      info => {
        console.log("=====Location", info);
        const coords = info.coords;
        appActions.setGeoLocation({
          lat: coords.latitude,
          lng: coords.longitude
        })
      },
      error => {
        console.log(error);
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 0 },
    )
  }

  async UNSAFE_componentWillMount() {
    // await this.initializeAdMob();
    await this.initializeAdvertisements();
  }

  componentDidMount() {
    const { appActions, loginActions } = this.props;
    this._isMounted = true;

    if (Platform.OS === 'android') {
      console.log('====== Home.js: componentDidMount')
      requestLocationPermission().then(res => {
        if (res) {
          this.getCurrentLocation();
        }
      });
    } else {
      this.getCurrentLocation();
    }

    // this.setDummyJSON();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  initializeAdMob = async () => {
    /** Get Admob ID from firebase database */
    console.log('===== initializeAdMob: this: ', this);
    const adMobSettings = await getAdmob();
    console.log('==== adMobSettings: ', adMobSettings);
    this.props.appActions && this.props.appActions.setAdMobId({ adMobId: adMobSettings.bannerId });
  }

  initializeAdvertisements = async () => {
    /** Get all advertisements from firebase database */
    const advertisements = await getAllAdvertisements();
    this.props.appActions && this.props.appActions.setAdvertisements({ advertisements });
  }

  handleOnLogout = () => {
    logout().then(() => {
      const { loginActions } = this.props;
      loginActions.doLogout();
      this.setState({ menuVisible: false })
    })
  }

  renderMenu() {
    const { isAuthenticated } = this.props.auth;
    console.log('====== isAuthenticated: ', isAuthenticated);
    if (this.state.menuVisible) {
      return (
        <MenuModal
          isModalVisible={true}
          isLoggedIn={isAuthenticated}
          onPress={() => this.setState({ menuVisible: false })}
          onPressNonAd={() => this.setState({ menuVisible: false })}
          onPressHistory={() => { this.setState({ menuVisible: false }); Actions.history() }}
          onPressFAQ={() => { this.setState({ menuVisible: false }); Actions.faq() }}
          onPressSignIn={() => { this.setState({ menuVisible: false }); Actions.signin() }}
          onPressRegister={() => { this.setState({ menuVisible: false }); Actions.regemail() }}
          onPressBecomeAdvertiser={() => { this.setState({ menuVisible: false }); Actions.becomeadvertiser() }}
          onPressSettings={() => { this.setState({ menuVisible: false }); Actions.settings() }}
          onPressAbout={() => { this.setState({ menuVisible: false }); Actions.about() }}
          onPressLogout={() => this.handleOnLogout()} />
      )
    } else {
      return null;
    }
  }

  setDummyJSON = () => {
    createDummyJSON().then(res => {
      if (this._isMounted) {
        console.log("=====Dummy Maps created!");
      }
    }).catch(e => {
      console.log(e)
    });
    createUserDummyJSON().then(res => {
      if (this._isMounted) {
        console.log("=====Dummy Users created!");
      }
    }).catch(e => {
      console.log(e)
    });

    createStoresDummyJSON().then(res => {
      if (this._isMounted) {
        console.log("=====Dummy stores created!");
      }
    }).catch(e => {
      console.log(e)
    });

    createFAQDummyJSON().then(res => {
      if (this._isMounted) {
        console.log("=====Dummy FAQs created!");
      }
    })

    createSettingDummyJSON().then(res => {
      if (this._isMounted) {
        console.log("=====Dummy Settings created!");
      }
    })

    createAboutusDummyJSON().then(res => {
      if (this._isMounted) {
        console.log("=====Dummy Aboutus created!");
      }
    })
  }

  moveToQuestionnair = (type) => {
    const _this = this;
    getQuestionByCategoryAndId(type, "root").then(res => {
      if (res == null) {
        //_this.props.appActions.setGlobalNotification({"message":"No Questions ready yet!"})
        showRootToast('Aucune question prête pour le moment!')
      } else {
        _this.props.questionActions.clearQuestions();
        console.log(res);
        Actions.questionnaire({ qType: type, qinfo: res, b: false })
      }
    });
  }

  render() {
    const { isAuthenticated, credential } = this.props.auth;
    console.log("wwwwwwwwwww " + Dimensions.get('window').width);
    console.log("hhhhhhhhhhh " + Dimensions.get('window').height);
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.mainContainer}>

          <View style={styles.helloContainer}>
            <ImageBackground source={require('../Assets/home_hello_bg.png')} style={styles.helloLogo} resizeMode={'stretch'}>
              <Text style={styles.helloText}>
                {isAuthenticated && credential ? ('Hello \n' + credential._user.firstname + '!') : 'Hello!'}
              </Text>
            </ImageBackground>
          </View>

          <View style={{ flex: 1, flexDirection: 'column' }}>

            <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'flex-end' }}>
            </View>

            <View style={{ position: 'absolute', right: 32 * em, bottom: 150 * em }}>
            </View>

            <View style={styles.tinaLogoWrapper}>
              <Image source={require('../Assets/tina-start.png')} style={{ width: scale(309.8), height: verticalScale(237.33), resizeMode: 'contain' }} />
              <Text style={styles.titleText}>Votre question porte sur :</Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "flex-start" }} >
              <View style={{ position: 'absolute', left: 0 }}>
              </View>

            </View>

            <View style={{ position: "absolute", right: 21 * em, top: 21 * em }}>
              <MenuBtn image={"burger"} onPress={() => { this.setState({ 'menuVisible': true }) }} />
            </View>

          </View>

          <View style={{ flex: 1 }}>
            <View style={styles.menuBackgroundWrapper} >
              <View style={{ flex: 1, flexDirection: "column", marginRight: 15 * em }}>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity style={styles.mainBtn} onPress={this.moveToQuestionnair.bind(this, Q_TYPES.O)}>
                    <View style={StyleSheet.flatten([styles.circleOverlay, { backgroundColor: "#d4f4fc" }])}>
                      <Ordinateur width={21 * em} height={21 * em} />
                    </View>
                    <Text style={styles.menuText}>Ordinateur</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ flex: 1 }}>
                  <TouchableOpacity style={styles.mainBtn} onPress={this.moveToQuestionnair.bind(this, Q_TYPES.P)}>
                    <View style={StyleSheet.flatten([styles.circleOverlay, { backgroundColor: "#ccf7f4" }])}>
                      <Periferique width={21 * em} height={21 * em} />
                    </View>
                    <Text style={styles.menuText}>Périphérique</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ flex: 1 }}>
                  <TouchableOpacity style={styles.mainBtn} onPress={this.moveToQuestionnair.bind(this, Q_TYPES.A)}>
                    <View style={StyleSheet.flatten([styles.circleOverlay, { backgroundColor: "#ffefe2" }])}>
                      <Astuce width={21 * em} height={21 * em} />
                    </View>
                    <Text style={styles.menuText}>Astuce</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: "column" }}>

                <View style={{ flex: 1 }}>
                  <TouchableOpacity style={styles.mainBtn} onPress={this.moveToQuestionnair.bind(this, Q_TYPES.L)}>
                    <View style={StyleSheet.flatten([styles.circleOverlay, { backgroundColor: "#e9e5fb" }])}>
                      <Logiciel width={21 * em} height={21 * em} />
                    </View>
                    <Text style={styles.menuText}>Logiciel</Text>
                  </TouchableOpacity>
                </View>




                <View style={{ flex: 1 }}>
                  <TouchableOpacity style={styles.mainBtn} onPress={this.moveToQuestionnair.bind(this, Q_TYPES.I)}>
                    <View style={StyleSheet.flatten([styles.circleOverlay, { backgroundColor: "#edf3ff" }])}>
                      <Internet width={21 * em} height={21 * em} />
                    </View>
                    <Text style={styles.menuText}>Internet/Réseaux</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity style={styles.mainBtn} onPress={Actions.recherche}>
                    <View style={StyleSheet.flatten([styles.circleOverlay, { backgroundColor: "#EBEAF1" }])}>
                      <Recherche width={21 * em} height={21 * em} />
                    </View>
                    <Text style={styles.menuText}>Recherche rapide</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          </View>

        </View>

        {this.renderMenu()}
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
    flex: 1,
    width: WIDTH,
    height: HEIGHT
  },

  helloLogo: {
    width: 100 * em,
    height: 114 * em,
    justifyContent: "center",
    alignItems: "center"
  },

  helloText: {
    color: "#fff",
    fontSize: 18 * em,
    fontFamily: "Merriweather-BlackItalic",
    paddingRight: 10 * em,
    paddingBottom: 10 * em,
    textAlign: 'center'
  },

  helloContainer: {
    position: "absolute",
    left: 0,
    top: 0
  },

  mainBtn: {
    flex: 1,
    marginTop: 8 * em,
    marginBottom: 8 * em,
    overflow: 'hidden',
    borderRadius: 20 * em,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    flexDirection: 'column'
  },

  circleOverlay: {
    width: scale(40),
    height: verticalScale(40),
    borderRadius: 20 * em,
    alignItems: 'center',
    justifyContent: 'center'
  },

  titleText: {
    fontSize: 22 * em,
    fontFamily: "Merriweather-Black",
    color: "#251b4d"
  },

  menuText: {
    color: "#251b4d",
    fontSize: 11 * em,
    paddingTop: 4 * em,
    fontFamily: "OpenSans-SemiBold"
  },

  menuBackgroundWrapper: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    paddingTop: 25 * em,
    paddingLeft: 20 * em,
    paddingRight: 20 * em,
    paddingBottom: 10 * em
  },

  tinaLogoWrapper: {
    //marginTop: 20*em,
    //flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
}

const mapStateToProps = state => ({
  app: state.app || {},
  auth: state.auth || {}
});

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(AppActions, dispatch),
  questionActions: bindActionCreators(QuestionActions, dispatch),
  loginActions: bindActionCreators(LoginActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
