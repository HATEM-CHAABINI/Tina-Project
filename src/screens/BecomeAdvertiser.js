import React, { Component} from 'react';
import { View, Text, StatusBar, Image ,TouchableOpacity,TextInput,Linking} from 'react-native';
import MenuBtn from '../components/MenuBtn';
import { Actions } from 'react-native-router-flux';
import { ScrollView } from 'react-native-gesture-handler';
import { WIDTH, colors, em } from '../common/constants';
import Tina from '../components/svgicons/Tina';
import Binoculars from '../components/svgicons/Binoculars';
import Rocket from '../components/svgicons/Rocket'
import GameBoy from '../components/svgicons/GameBoy'
import Ticket from '../components/svgicons/Ticket'
import {Picker} from '@react-native-picker/picker';
import { showRootToast,showBiggerRootToast } from '../common/utils';

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
    this.state = {
      itemValue:"Logiciel",
      value: null,
      text:""
        }
    
  }

  handleSendForm = () => {
    const {itemValue, value,text} = this.state;
    if (value == null){
      showRootToast("Veuillez Choisir un des choix.")
      return;
    }
    if (text ==""){
      showRootToast("Veuillez Saisir un message.")
      return;
    }
    body = "Sujet : "+itemValue+" \nA propos de : "+value+" \nMessage: "+text
    Linking.openURL(`mailto:contact@absolutemicro.fr?subject=Nous contacter&body=${body}`)

   
  }

  render(){
    const { value } = this.state;
    const PROP = [
      {
        key:  'Publicité',
        text: 'Publicité                        ',
      },
      {
        key:  'Plainte',
        text: 'Plainte                            ',
      },
      {
        key:  'Problème technique',
        text: 'Problème technique',
      },
      {
        key:  'Partenariat',
        text: 'Partenariat                   ',
      },
      {
        key:  'Autres',
        text: 'Autres                             ',
      },
    ];
    
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
            

<Text style ={{ fontSize:22*em,
    fontFamily:"Merriweather-Black",
    color:"#251b4d", paddingTop:em*10}}>Sujet</Text>

              <Picker style={{height: 250, width: 300}}
  selectedValue={this.state.itemValue}
  onValueChange={(itemValue, itemIndex) =>
    this.setState({itemValue: itemValue})
  }>
  <Picker.Item label="Ordinateur" value="Ordinateur" />
  <Picker.Item label="Périphérique" value="Périphérique" />
  <Picker.Item label="Logiciel" value="Logiciel" />
  <Picker.Item label="Internet/Réseaux" value="Internet/Réseaux" />
  <Picker.Item label="Astuce" value="Astuce" />

</Picker>



{PROP.map(res => {
                return (
                    <View key={res.key} style={styles.container}>
                        <Text style={styles.radioText}>{res.text}</Text>
                        <TouchableOpacity
                            style={styles.radioCircle}
                            onPress={() => {
                                this.setState({
                                    value: res.key,
                                });
                            }}>
                              {value === res.key && <View style={styles.selectedRb} />}
                        </TouchableOpacity>
                    </View>
                );
            })}
           


         <TextInput
            style={styles.TextInputStyleClass}
            underlineColorAndroid="transparent"
            placeholder={"Votre message"}
            placeholderTextColor={"#9E9E9E"}
            numberOfLines={10}
            multiline={true}
            onChangeText={text => this.setState({
              text: text,
          })}
      value={this.state.text}
          />

        {/* <Text> Selected: {this.state.value} </Text>
            <Text> Selected: {this.state.itemValue} </Text>
            <Text> message: {this.state.text} </Text> */}

            
</View>
      
<TouchableOpacity style={[styles.ActionButton, {marginTop:25*em, marginBottom:8*em}]} onPress={this.handleSendForm}>
                  <Text style={styles.ActionText}>Continuer</Text>
              </TouchableOpacity>

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
  ActionButton: {
    overflow: 'hidden',
    borderRadius: 18*em,
    height: 50*em,
    alignItems: 'center',
    backgroundColor: '#9E9E9E',
    justifyContent: 'center',
    marginTop: 18*em
  },
  MainContainers :{
 
  flex:1,
  paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
  justifyContent: 'center',
  margin:20
    
  },
 
  TextInputStyleClass:{

    textAlign: 'center',
    width:em*300,
    height: 50,
    borderWidth: 2,
    borderColor: '#9E9E9E',
    borderRadius: 20 ,
    backgroundColor : "#FFFFFF",
    height: 150
     
    },
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
  },



  container: {
    marginBottom: 35,
    alignItems: 'center',
    flexDirection: 'row',
justifyContent: 'space-between',
},
radioText: {
    marginRight: 35,
    fontSize: 20,
    color: '#000',
    fontWeight: '700'
},
radioCircle: {
height: 30,
width: 30,
borderRadius: 100,
borderWidth: 2,
borderColor: '#3740ff',
alignItems: 'center',
justifyContent: 'center',
},
selectedRb: {
width: 15,
height: 15,
borderRadius: 50,
backgroundColor: '#3740ff',
},
result: {
    marginTop: 20,
    color: 'white',
    fontWeight: '600',
    backgroundColor: '#F3FBFE',
},
}

export default FAQDetail;