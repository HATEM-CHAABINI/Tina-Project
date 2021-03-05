import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, Image, 
  Dimensions, Platform, Alert
} from 'react-native'
import NonVersion from './svgicons/NonVersion'
import Arrow from './svgicons/Arrow'
import User from './svgicons/User'
import Help from './svgicons/Help'
import History from './svgicons/History'
import Announceur from './svgicons/Announceur'
import Setting from './svgicons/Setting'
import RectangleImage from './RectangleImage'
import Modal from 'react-native-modal'
import MenuBtn from './MenuBtn'
import { BlurView } from "@react-native-community/blur";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Tina from './svgicons/Tina'
import LeftArrow from './svgicons/LeftArrow'
import { em } from '../common/constants'
import ConfirmPaymentModal from './ConfirmPaymentModal';
import stripe from 'tipsi-stripe'
import { initStripe } from '../common/stripe/stripe';
import Spinner from 'react-native-loading-spinner-overlay';
import { updateUserInfo } from '../common/firebase/database';
import moment from 'moment';
import { LoginActions } from '../actions';

var {height, width} = Dimensions.get('window');

class MenuModal extends Component {
  state = {
    token: null,
    loadingCard: false,
    showConfirmPayModal: false,
    stripeMode: null,
    doingPayment: false
  }

  handleErrorAlert = () => {
    Alert.alert(
      'Annulé.',
      'Votre paiement a été annulé.',
      [{
        text: 'Ok',
        onPress: () => console.log('==== ok')
      }],
      { cancelable: true },
    );
  }

  handleSuccessAlert = () => {
    Alert.alert(
      'Payment success.',
      'You paid successfully. Thank you!',
      [{
        text: 'Ok',
        onPress: () => console.log('==== ok')
      }],
      { cancelable: true },
    );
  }

  handlePayer = async () => {
    console.log('===== handlePayer');
    const { auth } = this.props;
    const userInfo = (auth && auth.credential && auth.credential._user) || null;
    console.log('===== userInfo: ', userInfo)
    if (!userInfo) return;
    // this.setState({ loadingCard: false, showConfirmPayModal: true })
    const stripeMode = await initStripe();
    if (!stripeMode) {
      this.handleAlert();
      return;
    }

    const items = [{
  label: 'TOTAL',
  amount: '19.00',

}]

const shippingMethods = [{
  id: 'fedex',
  label: 'FedEX',
  detail: 'Test @ 10',
  amount: '10.00',
}]

const options = {
  shippingContact: "full",
  currencyCode: 'EUR',
}
this.setState({ loadingCard: true, token: null, stripeMode }, async () => {
    try {
const token = await stripe.paymentRequestWithNativePay( options,items)

console.log('===== token: ', token);
    this.setState({ loadingCard: false, token, showConfirmPayModal: true })
    stripe.completeNativePayRequest()
    this.doPayment();

  } catch (error) {
      console.log('===== token: error: ', error);
      this.setState(
        { loadingCard: false, showConfirmPayModal: false },
         () => this.handleErrorAlert()
      );
    }
  })


// Or cancel if an error occurred
// stripe.cancelApplePayRequest()

    // this.setState({ loadingCard: true, token: null, stripeMode }, async () => {
    //   try {
    //     const token = await stripe.paymentRequestWithCardForm({
    //       // Only iOS support this options
    //       smsAutofillDisabled: true,
    //     });
    //     console.log('===== token: ', token);
    //     this.setState({ loadingCard: false, token, showConfirmPayModal: true })
    //   } catch (error) {
    //     console.log('===== token: error: ', error);
    //     this.setState(
    //       { loadingCard: false, showConfirmPayModal: false },
    //        () => this.handleErrorAlert()
    //     );
    //   }
    // })
  }

  doPayment = async () => {
    console.log("zeeeeeeeeeeeeeeeeee");
    const that = this;
    const { stripeMode, token } = this.state;
    const { auth, loginActions } = this.props;
    const credential = (auth && auth.credential) || null;
    const _user = (credential && auth.credential._user) || null;
    const userInfo = _user;
    const description = userInfo 
      ? `${userInfo.firstname} ${userInfo.lastname} (${userInfo.email}) paid on Tina mobile app (${Platform.OS}).`
      : `User paid on Tina mobile app (${Platform.OS})`;
    const statementDescriptor = `Charged with card.`;
    const functionName = (stripeMode === 'test') 
      ? 'https://us-central1-tina-project-a9ad6.cloudfunctions.net/test-payWithStripe'
      : 'https://us-central1-tina-project-a9ad6.cloudfunctions.net/live-payWithStripe';
    console.log('===== functionName: ', functionName);

    this.setState({ doingPayment: true });

    const body = JSON.stringify({
        amount: 1900,
        currency: "eur",
        token: token,
        description: description,
        statement_descriptor: statementDescriptor,
      });
    console.log('====== body: ', body);

    fetch(functionName, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: body,
    })
      .then((response) => {
        console.log('==== doPayment: response: ', response);
        return response.json()
      })
      .then((responseJson) => {
        console.log('==== doPayment: responseJson: ', responseJson);
        console.log(responseJson);
        // Add user paid option
        updateUserInfo({
          paid: true,
          paid_date: moment().format('llll'),
        }).then(res => {
          if (res) {
            // Update user info with new credential, changed the zipcode, lat, lng
            loginActions.loginUpdateInfo({
              ...credential,
              _user: {
                ..._user,
                paid: true,
                paid_date: moment().format('llll'),
              } 
            });
          }
        });
        that.setState({ showConfirmPayModal: false, doingPayment: false }, () => this.handleSuccessAlert());
      })
      .catch((error) => {
        console.log('==== doPayment: error: ', error);
        this.setState({ doingPayment: true }, () => this.handleErrorAlert());
      });;
  }

  renderConfirmPaymentModal = () => {
    const { token, showConfirmPayModal } = this.state;
    console.log('===== showConfirmPayModal: ', token);
  }

  render() {
    const {
      isModalVisible, isLoggedIn, onPress, 
      onPressNonAd, onPressHistory, onPressFAQ, 
      onPressSignIn, onPressRegister, onPressBecomeAdvertiser, 
      onPressSettings, onPressAbout, onPressLogout,
      auth,
    } = this.props;
    const { doingPayment } = this.state;
    const credential = (auth && auth.credential) || null;
    const _user = (credential && auth.credential._user) || null;
    const isPaidUser = (_user && _user.paid) || false;

    return (
      <View style={styles.absolute}>
        <BlurView
          style={styles.absolute}
          blurType="dark"
          blurAmount={15}
          reducedTransparencyFallbackColor="black"
        />

        {(!isLoggedIn) ?
          (<View style={styles.absolute}>
            <View style={{ position: 'absolute', left: 10 * em, top: 80 * em }}>
              <RectangleImage image={"B1"} size={33 * em} />
            </View>

            <View style={{ position: 'absolute', left: 40 * em, bottom: 100 * em }}>
              <RectangleImage image={"B2"} size={25 * em} />
            </View>

            <View style={{ position: 'absolute', right: 30 * em, bottom: 150 * em }}>
              <RectangleImage image={"B3"} size={17 * em} />
            </View>
          </View>) : null}

        <View style={styles.absolute}>
          <Modal isVisible={isModalVisible} backdropOpacity={0} animationIn={"slideInDown"} styles={{ flex: 1, margin: 0 }}>
            <View style={{ marginTop: Platform.OS === 'android' ? 60 * em : 120 * em, height: height, alignItems: "flex-end" }}>
              <MenuBtn image="close" onPress={onPress} />

              {isLoggedIn ?
                (<View style={styles.menuWrapper}>
                  <Text style={styles.menuText}>Historique de pannes</Text>
                  <TouchableOpacity style={styles.menuBtn} onPress={onPressHistory} elevation={2}>
                    <History width={15 * em} height={15 * em} />
                  </TouchableOpacity>
                </View>) : null}

              <View style={styles.menuWrapper}>
                <Text style={styles.menuText}>Version sans publicité</Text>
                <TouchableOpacity style={styles.menuBtn} onPress={onPressNonAd} elevation={2}>
                  <NonVersion width={15 * em} height={15 * em} />
                </TouchableOpacity>
              </View>

              {!isLoggedIn ?
                (<View style={styles.menuWrapper}>
                  <Text style={styles.menuText}>Se connecter</Text>
                  <TouchableOpacity style={styles.menuBtn} onPress={onPressSignIn} elevation={2}>
                    <Arrow width={15 * em} height={15 * em} />
                  </TouchableOpacity>
                </View>) : null}

              {isLoggedIn ?
                (<View style={styles.menuWrapper}>
                  <Text style={styles.menuText}>Réglages</Text>
                  <TouchableOpacity style={styles.menuBtn} onPress={onPressSettings} elevation={2}>
                    <Setting width={15 * em} height={15 * em} />
                  </TouchableOpacity>
                </View>) : null}

              {!isLoggedIn ?
                (<View style={styles.menuWrapper}>
                  <Text style={styles.menuText}>S'inscrire</Text>
                  <TouchableOpacity style={styles.menuBtn} onPress={onPressRegister} elevation={2}>
                    <User width={15 * em} height={15 * em} />
                  </TouchableOpacity>
                </View>) : null}

              {isLoggedIn ?
                (<View style={styles.menuWrapper}>
                  <Text style={styles.menuText}>FAQ</Text>
                  <TouchableOpacity style={styles.menuBtn} onPress={onPressFAQ} elevation={2}>
                    <Help width={15 * em} height={15 * em} />
                  </TouchableOpacity>
                </View>) : null}

              <View style={styles.menuWrapper}>
                <Text style={styles.menuText}>À Propos</Text>
                <TouchableOpacity style={styles.menuBtn} onPress={onPressAbout} elevation={2}>
                  <Image source={require('../Assets/tina-question.png')} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
              </View>

              {!isLoggedIn ?
                (<View style={styles.menuWrapper}>
                  <Text style={styles.menuText}>FAQ</Text>
                  <TouchableOpacity style={styles.menuBtn} onPress={onPressFAQ} elevation={2}>
                    <Help width={15 * em} height={15 * em} />
                  </TouchableOpacity>
                </View>) : null}

              <View style={styles.menuWrapper}>
                <Text style={styles.menuText}>Devenir annonceur</Text>
                <TouchableOpacity style={styles.menuBtn} onPress={onPressBecomeAdvertiser} elevation={2}>
                  <Announceur width={25 * em} height={25 * em} />
                </TouchableOpacity>
              </View>

              {(isLoggedIn && !isPaidUser) && (
                <View style={styles.menuWrapper}>
                  <Text style={styles.menuText}>Payer</Text>
                  <TouchableOpacity style={styles.menuBtn} onPress={this.handlePayer} elevation={2}>
                    {/* <LeftArrow width={15 * em} height={15 * em} color={"#928ea7"} /> */}
                    <Image source={require('../Assets/menu-payment.png')} style={{ width: 22, height: 15 }} />
                  </TouchableOpacity>
                </View>
              )}

              {isLoggedIn ?
                (<View style={styles.menuWrapper}>
                  <Text style={styles.menuText}>Se déconnecter</Text>
                  <TouchableOpacity style={styles.menuBtn} onPress={onPressLogout} elevation={2}>
                    <LeftArrow width={15 * em} height={15 * em} color={"#928ea7"} />
                  </TouchableOpacity>
                </View>) : null}

              {isLoggedIn && this.renderConfirmPaymentModal()}
            </View>
          </Modal>
        </View>

        {isLoggedIn ?
          (<View style={[styles.absolute, styles.bottomWrapper]}>
            <Tina width={80} height={30} />
            <Text style={styles.versionText}>Version 1.0</Text>
          </View>) : null}

        <Spinner
          visible={doingPayment}
          textContent={'Doing payment...'}
          textStyle={{ color: '#FFF' }}
        />
      </View>
    );
  }
}

const styles = {
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  menuWrapper: {
    flexDirection: "row",
    marginTop: 16*em,
    alignItems:"center",
    justifyContent:"flex-end"
  },

  menuText: {
    color: "#fff",
    fontSize: 15*em,
    fontFamily: "OpenSans-Regular"
  },

  menuBtn: {
    overflow: 'hidden',
    borderRadius: 15*em,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    width:40*em,
    height:40*em,
    justifyContent: 'center',
    marginLeft: 15*em
  },

  bottomWrapper:{
    alignItems:'center',
    justifyContent:'flex-end',
    flexDirection:"column"
  },

  versionText:{
    color:"#fff",
    fontSize:12*em,
    fontFamily:"OpenSans-Regular",
    marginTop: 15*em,
    marginBottom: 30*em
  }
}

const mapStateToProps = state => ({
  auth: state.auth || {}
});

const mapDispatchToProps = dispatch => ({
  loginActions: bindActionCreators(LoginActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuModal);