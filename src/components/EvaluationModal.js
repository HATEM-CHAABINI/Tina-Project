import React from 'react'
import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import { BlurView } from "@react-native-community/blur";
import RatingStars from './RatingStars';
import {WIDTH, em, hm} from '../common/constants';
import { EventEmitter } from 'react-native';

var {height, width} = Dimensions.get('window');

const renderStar = (rate) => {
  if (rate == 4){
    return (<Text style={styles.relevantText}>Très Pertinente</Text> )
  }else if (rate == 3){
    return (<Text style={styles.relevantText}>Pertinente</Text>)
  }else if (rate == 2){
    return (<Text style={styles.relevantText}>Peu Pertinente</Text>)
  }else if (rate == 1){
    return (<Text style={styles.relevantText}>Non Pertinente</Text>)
  }
}

export default ElevationModal = ({isModalVisible, onPressSend, onPressSkip, rate}) => (
  <View style={styles.absolute}>
    
    <BlurView
      style={styles.absolute}
      blurType="dark"
      blurAmount={10}
      reducedTransparencyFallbackColor="black"
    />

    <View style={styles.absolute}>
        <Modal isVisible={isModalVisible} 
            backdropOpacity={0} 
            animationIn={"slideInUp"}
            style={{flex:1, justifyContent:'flex-end', alignItems:'center'}}>

            <View style={styles.modalWrapper}>
              <Image source={require('../Assets/tina-reussi.png')} style={styles.tinaLogo} resizeMode={"contain"}/>

              <View style={{backgroundColor:"#fff", borderRadius:20*em, padding:38*em, marginTop:-30*em, zIndex:-1}}>
                <Text style={styles.infoTextTitle}>Je suis ravie de vous avoir dépanné(e)!</Text>

                <Text style={styles.infoTextContent}>Évaluez notre dépannage :</Text>
<View style={{  
   
    
    paddingLeft:50*em, 
    paddingRight:50*em, 
   
    }}> 
                <RatingStars rating={0} />
</View>
              </View>

              <View style={styles.ActionWrapper}>
                <TouchableOpacity style={styles.ActionButtonBlue} onPress={onPressSend}>
                  <Text style={styles.ActionWhiteText}>Envoyer</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.ActionButtonNoBg} onPress={onPressSkip}>
                  <Text style={StyleSheet.flatten([styles.ActionWhiteText, {padding:20*em}])}>Passer</Text>
                </TouchableOpacity>
              </View>
            </View>
        </Modal>
    </View>
  </View>    
  
)

const styles = {
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0, 
  }, 

  modalWrapper:{
    width: WIDTH - 40*em,
    flexDirection: "column", 
    justifyContent:'center', 
    alignItems: 'center',
  },

  tinaLogo:{
    width: 230*em,
    height: 230*em,
    marginBottom:-1*hm

  },

  infoTextTitle: {
    color:"#251b4d", 
    fontSize: 18*em, 
    textAlign:"center",
    fontFamily:"Merriweather-Black"
  },

  infoTextContent: {
    color:"#928da6", 
    textAlign: "center", 
    fontSize: 15*em, 
    paddingLeft:40*em, 
    paddingRight:40*em, 
    marginTop: 20*em,
    fontFamily: "OpenSans-Regular"
  },

  relevantText: {
    color:"#f7d100", 
    textAlign: "center", 
    fontSize: 13*em,
    fontFamily: "OpenSans-Bold"
  },

  ActionButtonBlue: {
    overflow: 'hidden',
    borderRadius: 18*em,
    alignItems: 'center',
    backgroundColor: '#28c7ee',
    height: 50*em,
    justifyContent: 'center',
    marginLeft:20*em, 
    marginRight:20*em,
    fontFamily: "OpenSans-Regular"
  },

  ActionWrapper:{
    width:WIDTH, 
    paddingTop: 20*em, 
    justifyContent:"center"
  },

  ActionButtonNoBg: {
    justifyContent:"center", alignSelf:"center"
  },

  ActionWhiteText:{
    color:"#fff", 
    fontSize: 14*em,
    fontFamily: "OpenSans-Regular"
  },
}