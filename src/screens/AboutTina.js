import React, { Component} from 'react';
import { View, Text, StatusBar, Image } from 'react-native';
import MenuBtn from '../components/MenuBtn';
import { Actions } from 'react-native-router-flux';
import { ScrollView } from 'react-native-gesture-handler';
import { WIDTH, colors, em } from '../common/constants';
import Tina from '../components/svgicons/Tina';

class AboutTina extends Component {
  constructor(props){
    super(props)
  }

  render(){
    
    return (
        <View style={styles.mainContainer}>
          <StatusBar barstyle="light-content" backgroundColor={"#28c7ee"} />

          <View style={styles.scrollStyle}>
            <Image source={require('../Assets/announcer_header_round.png')} style={styles.headerBg} resizeMode="stretch"/>

            <View style={styles.tinaWrapper}>
              <Tina width={60*em} height={22*em} />
              <Image source={require('../Assets/tina-reussi.png')} style={styles.tinaLogo} />
              <Text style={styles.contentTitle}>Tina, votre assistante digitale !</Text>
              <Text style={styles.contentDesc}>
              Vous êtes en difficulté avec votre matériel informatique ?
Vous êtes à la recherche d'une solution à un problème que vous pensez être compliqué à résoudre ?
Laissez-vous guider par Tina. A travers quelques questions, Tina va vous apporter la solution à travers les centaines de milliers de solutions qui existent, elle trouvera celle qui convient exactement à votre problème.
Les solutions qui vous seront proposées ont pour la plupart été validées par les utilisateurs qui se sont trouvés dans la même position que vous. Alors pourquoi pas vous ? Prêts à tenter l'aventure ?                </Text>
            </View>

            <Image source={require('../Assets/announcer_bottom_round.png')} style={{width:WIDTH, height:WIDTH*0.245}} resizeMode="stretch"/>
          </View>
          
          <View style={styles.menuWrapper}>
            <MenuBtn image={"back"} onPress={() => Actions.pop()}/>                  
          </View>
        </View>
    )
  }
}

const styles = {
  mainContainer: {
    backgroundColor: '#f6f5fa',
    flexDirection: 'column',
    flex: 1,
    
  },  

  menuWrapper:{
    position:"absolute", 
    left:20*em,
    top:20*em
  },
  
  headerBg:{
    width:WIDTH, 
    height:WIDTH*0.70,
    marginTop:-100*em
  },

  tinaWrapper:{
    justifyContent:"center", 
    alignItems:"center", 
    flexDirection:"column", 
    paddingLeft:20*em, 
    paddingRight: 20*em,
    marginTop:-140*em
  },

  tinaLogo:{
    width:80*em, 
    height:80*em, 
    marginTop: 10*em
  },

  scrollStyle:{
     
    backgroundColor:"#fff"
  },

  contentItem:{
    paddingTop:25*em, 
    paddingBottom: 30*em, 
    alignItems:"center", 
    justifyContent:"center"
  },

  contentTitle:{
    fontSize: 16*em, 
    color:"#251b4d", 
    marginTop: 14*em, 
    marginBottom: 14*em, 
    fontFamily:"Merriweather-Black"
  },

  contentDesc:{
    fontSize: 15*em, 
    textAlign:"center", 
    color:"#a099b0", 
    fontFamily: "OpenSans-Regular", 
    lineHeight:20*em
  },

  iconCircle:{
    width: 90*em, 
    height:90*em, 
    justifyContent:"center",
    alignItems:"center",     
    borderRadius:45*em, 
  }
}

export default AboutTina;