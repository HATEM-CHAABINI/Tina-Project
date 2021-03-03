/**
 * Tina React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {Text, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Home from './screens/Home';
import Questionnaire from './screens/Questionnaire';
import NoResult from './screens/NoResult'
import Depanneurs from './screens/Depanneurs'
import FoundResult from './screens/FoundResult'
import RegEmail from './screens/RegEmail'
import RegPostcode from './screens/RegPostcode'
import { Router } from 'react-native-router-flux';
import RootRoutes from './routes';
import RegPassword from './screens/RegPassword';
import SignIn from './screens/SignIn';
import Settings from './screens/Settings'
import History from './screens/History'
import FAQDetail from './screens/FAQDetail'
import About from './screens/About'
import BecomeAdvertiser from './screens/BecomeAdvertiser'
import MyAccount from './screens/MyAccount'
import MyName from './screens/MyName'
import MyEmail from './screens/MyEmail'
import SearchPostcode from './screens/SearchPostcode';
import { Provider } from 'react-redux';
import AppView from './screens/AppView';
import store from './store/store';

class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      visible: false,
    }
  }

  onComplete = () => {

  };

  onFailedLoad = () => {

  };

  componentDidMount(){
    setTimeout(() => {
     SplashScreen.hide();
     this.setState({visible: true});
    }, 2500)
  }

  render(){
    if (this.state.visible) {
      return(
          // <NoResult qType={"ordinateur"}/>
          // <Home />
          <Provider store={store(this.onComplete, this.onFailedLoad)}>
            <AppView />
          </Provider>
          //  <RootRoutes />
          // <Depanneurs />
          // <FoundResult qType={"ordinateur"}/>
          //  <RegEmail />
          // <RegPassword />
          // <RegPostcode />
          // <Settings />
          // <History />
          // <FoundResult qType={"ordinateur"} />
          // // <FAQDetail />
          // <BecomeAdvertiser />
          // <MyAccount />
          // <MyName />
          // <MyEmail />
          // <SearchPostcode />
      )
    }else{
      return null;
    }
  }
}

export default App;
