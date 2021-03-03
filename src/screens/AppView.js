import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppActions } from '../actions';
import Toast from 'react-native-root-toast';
import { RootSiblingParent } from 'react-native-root-siblings'
import {
  StyleSheet, View, SafeAreaView
} from 'react-native';
import RootRoutes from '../routes';
import { em } from '../common/constants';
import OneSignal from 'react-native-onesignal';
import onesignalConfig from '../common/config/onesignal';
import { initStripe } from '../common/stripe/stripe';

class AppView extends Component {
  state = {
    loaded: false,
  };

  async UNSAFE_componentWillMount() {
    // Init stripe.
    initStripe();
    console.log('==== init Stripe')
  }

  async UNSAFE_componentWillReceiveProps(nextProps) {
    const { app } = nextProps;
    const { loaded } = this.state;

    if (app.loaded && !loaded) {
      const _this = this;
      console.log('======= AppView: loaded');
      this.setState({loaded: true}, () => {
        console.log('======= AppView: initialize');
        // _this.initializeAdMob();
        _this.initialize();
      });
    }
  }

  async initialize() {
    // Onsignal
    // OneSignal.setLogLevel(6, 0);
    console.log('====== onesignalConfig.appId: ', onesignalConfig.appId);
    OneSignal.init(
      onesignalConfig.appId,
      {
        kOSSettingsKeyAutoPrompt: false,
        kOSSettingsKeyInAppLaunchURL: false,
        kOSSettingsKeyInFocusDisplayOption: 2
      }
    );
    OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.

    // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
    OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', (device) => this.onIds(device, this));
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log('Notification received: ', notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device, _this) {
    console.log('Device info: ', device, _this);
    _this.props.appActions && _this.props.appActions.setPushNotificationIds({ device });
    // For test firstly. If notification is working, this is not needed.
    // device && device.userId && notifications.postTestNotification(device.userId);
  }

  render() {
    return (
      <RootSiblingParent>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <RootRoutes />
          </View>
        </SafeAreaView>
      </RootSiblingParent>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  safeArea: {
    flex: 1
  }
});

function myiOSPromptCallback(permission) {
  // do something with permission value
}

//export default AppView;
// const mapStateToProps = state => ({
//   app: state.app || {},
// });

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  // mapStateToProps,
  null,
  mapDispatchToProps,
)(AppView);
