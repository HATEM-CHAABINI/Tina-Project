import React, { Component, useState } from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import MenuBtn from '../components/MenuBtn';
import { Actions } from 'react-native-router-flux';
import DepanneurItem from '../components/DepanneurItem';
import { FlatList } from 'react-native-gesture-handler';
import { em } from '../common/constants';
import { getAllStores } from '../common/firebase/database';
import { connect } from 'react-redux';
import {getDistance} from 'geolib';
import EvaluationModal from '../components/EvaluationModal';
import { AppActions } from '../actions'
import { bindActionCreators } from 'redux';
class Depanneurs extends Component {
  constructor(props){
    super(props)

    this.state = {
      stores: [],
      evaluationVisible: false
    }
  }

  UNSAFE_componentWillMount() {
    const _this = this;
    const {lat, lng} = _this.props.app;
    getAllStores().then(res => {
      console.log('====== getAllStores: res: ', res);
      let allstores = res;
      if (allstores.length > 0){
        let sortedStores = allstores.sort((a, b) => (getDistance(a, {latitude:lat, longitude:lng}) > getDistance(b, {latitude:lat, longitude:lng}) ? 1:-1));
        allstores = sortedStores;
      }

      let index = 0;
      let stores = [];
      allstores.map(item => {
        if (index++ < 10){
          item.addr = (getDistance(item, {latitude:lat, longitude:lng}) / 1000).toFixed(2) + "km, " + item.address;
          stores.push(item);
        }
      })
      _this.setState({stores});
    }).catch(e => {
      console.log("======= error", e);
    });
  }

  handleResetPostal = () => {
    const {isAuthenticated} = this.props.auth;
    if (isAuthenticated){
      Actions.regpostcode();
    }else{
      Actions.signin();
    }
  }

  handleClickStore = (store) => {
    const {app} = this.props;
    console.log(app);
    //if (!app.evaluated){
      this.setState({evaluationVisible:true});
    //}
  }

  handleEvaluationSendClick(){
    this.setState({evaluationVisible:false})
    this.props.appActions.setEvaluated({evaluated:true});
    // Actions.foundresult(this.props)
  }

  handleEvaluationSkipClick(){
    this.setState({evaluationVisible:false})
  }

  renderEvaluationModal(){
    if (this.state.evaluationVisible){
      return (
        <EvaluationModal isModalVisible={true} onPressSend={this.handleEvaluationSendClick.bind(this)} onPressSkip={this.handleEvaluationSkipClick.bind(this)}/>
      )
    }else{
      return null;
    }
  }

  changeImageUrl2Https = (imageUrl) => {
    if (imageUrl.substring(0, 7) === 'http://')
      return imageUrl.replace('http://', 'https://');
    return imageUrl;
  }

  render(){
    const {stores} = this.state;
    return (
      <View style={{flex:1}}>
        <View style={styles.mainContainer}>
          <StatusBar barstyle="light-content" backgroundColor={"#28c7ee"} />

          <View style={styles.menuWrapper}>
            <MenuBtn image={"close"} onPress={() => Actions.pop()}/>
          </View>

          <View style={styles.headerContainer}>
            <Text style={styles.titleText}>Dépanneurs</Text>
            <Text style={styles.contentText}>
              Si la localisation de nos partenaires ne correspondent pas à votre localisation
              <Text style={styles.linkText} onPress={this.handleResetPostal.bind(this)}> cliquer ici pour modifier votre code postal</Text>
            </Text>
          </View>

          <View style={{flex: 1}}>

            <FlatList data={stores}
          
              renderItem={({item}) => <DepanneurItem id={item.id} image={{uri:item.image}} title={item.title} location={item.addr} phone={item.phone} email={item.email} onPress={() => this.handleClickStore(item)}/>}
              keyExtractor={item => item.id.toString()} />

          </View>
        </View>

        {this.renderEvaluationModal()}

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
    flexDirection: "column",
    paddingLeft:16*em,
    paddingRight:16*em,
    paddingTop: 80*em,
    paddingBottom: 10*em,
    zIndex:-1
  },

  menuWrapper:{
    position:"absolute",
    right:20*em,
    top:20*em
  },

  titleText:{
    fontSize: 24*em,
    color:"#251b4d",
    fontFamily:"Merriweather-Black"
  },

  contentText:{
    fontSize: 12*em,
    marginTop: 12*em,
    color:"#928da6",
    fontFamily:"OpenSans-Regular"
  },

  linkText:{
    color:"#28c7ee",
    fontFamily:"OpenSans-Regular"
  }
}

const mapStateToProps = state => ({
  app: state.app || {},
  auth: state.auth || {}
});

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(AppActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps)(Depanneurs);
