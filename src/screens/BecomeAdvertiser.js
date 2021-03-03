import React, { Component} from 'react';
import { View, Text, StatusBar, Image } from 'react-native';
import MenuBtn from '../components/MenuBtn';
import { Actions } from 'react-native-router-flux';
import { ScrollView } from 'react-native-gesture-handler';
import { WIDTH, colors, em } from '../common/constants';
import Tina from '../components/svgicons/Tina';
import Binoculars from '../components/svgicons/Binoculars';
import Rocket from '../components/svgicons/Rocket'
import GameBoy from '../components/svgicons/GameBoy'
import Ticket from '../components/svgicons/Ticket'

const DATA = [
  {
    id: 1,
    title: "Devenir annonceur",
    description: "Lorem ipsum dolor sit amet, conseteur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et eolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
  },

  {
    id: 2,
    title: "Devenir annonceur",
    description: "Lorem ipsum dolor sit amet, conseteur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et eolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
  },

  {
    id: 3,
    title: "Devenir annonceur",
    description: "Lorem ipsum dolor sit amet, conseteur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et eolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
  },

  {
    id: 4,
    title: "Devenir annonceur",
    description: "Lorem ipsum dolor sit amet, conseteur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et eolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
  }
]

const DevenirIcon = ({color, icon}) => (
  <View style={[styles.iconCircle, {backgroundColor:color}]}>
    {icon}
  </View>
)

const THUMB = [
  <DevenirIcon color={colors.ordinateur[3]} icon={<Binoculars width={60*em} height={60*em} />} />,
  <DevenirIcon color={colors.logiciel[3]} icon={<Rocket width={40*em} height={40*em} />} />,
  <DevenirIcon color={colors.astuce[3]} icon={<GameBoy width={40*em} height={40*em} />} />,
  <DevenirIcon color={colors.periferique[3]} icon={<Ticket width={40*em} height={40*em} />} />
]

const ContentItem = ({id, title, description}) => (
  <View style={styles.contentItem}>
    {THUMB[id - 1]}
    <Text style={styles.contentTitle}>{title}</Text>
    <Text style={styles.contentDesc}>{description}</Text>
  </View>
)

class FAQDetail extends Component {
  constructor(props){
    super(props)
  }

  render(){
    let content = DATA.map((item) => 
      <ContentItem key={item.id.toString()} id={item.id} title={item.title} description={item.description}/>
    );
    return (
        <View style={styles.mainContainer}>
          <StatusBar barstyle="light-content" backgroundColor={"#28c7ee"} />

          <ScrollView style={styles.scrollStyle}>
            <Image source={require('../Assets/announcer_header_round.png')} style={styles.headerBg} resizeMode="stretch"/>

            <View style={styles.tinaWrapper}>
              <Tina width={60*em} height={22*em} />
              <Image source={require('../Assets/tina-reussi.png')} style={styles.tinaLogo} />
              {content}
            </View>

            <Image source={require('../Assets/announcer_bottom_round.png')} style={{width:WIDTH, height:WIDTH*0.245}} resizeMode="stretch"/>
          </ScrollView>
          
          <View style={styles.menuWrapper}>
            <MenuBtn image={"back"} onPress={() => Actions.pop()}/>                  
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
    flex:1, 
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
    fontSize: 12*em, 
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

export default FAQDetail;