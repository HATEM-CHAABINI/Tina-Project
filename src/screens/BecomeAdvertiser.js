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
import DropDownPicker from 'react-native-dropdown-picker';
import { showRootToast,showBiggerRootToast } from '../common/utils';
import Icon from 'react-native-vector-icons/Feather';
import CheckSelected from '../components/svgicons/CheckSelected';
import qs from 'qs';


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
      itemValue:"",
      value: null,
      text:"", 
      showButton: false,
      selected: false,
      
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
    

    let url = `mailto:${'contact@absolutemicro.fr'}`;

    // Create email link query
    const query = qs.stringify({
        subject: itemValue,
        body: text,
    });

    if (query.length) {
        url += `?${query}`;
    }

    Linking.openURL(url)

   
  }

  render(){
    const { showButton, selected } = this.state;
    const PROP = [
      {
        key:  'Publicité',
        text: 'Publicité',
      },
      {
        key:  'Plainte',
        text: 'Plainte',
      },
      {
        key:  'Problème technique',
        text: 'Problème technique',
      },
      {
        key:  'Partenariat',
        text: 'Partenariat',
      },
      {
        key:  'Autres',
        text: 'Autres',
      },
    ];
    
    return (

      

        <View style={styles.mainContainer}>
          <StatusBar barstyle="light-content" backgroundColor={"#28c7ee"} />

          <View style={styles.menuWrapper}>
            <MenuBtn image={"close"} onPress={() => Actions.pop()}/>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>Nous Contacter</Text>
    
            <Text style={styles.contentText}>
              Nous sommes à votre écoute
           </Text>

           {selected ?(<Text style={styles.subtitleText}>Votre Sujet</Text>):null}

            <DropDownPicker
              items={[
                {label: 'Publicité', value: 'Publicité'},
                {label: 'Plainte', value: 'Plainte' },
                {label: 'Problème technique', value: 'Problème technique'},
                {label: 'Partenariat', value: 'Partenariat'},
                {label: 'Autres', value: 'Autres'},
              ]}
              placeholder="Votre sujet"
              defaultNull
              containerStyle={{height: em*60, width: "100%"}}
              style={{
                backgroundColor: '#f6f5fa',
                borderWidth: 0,
                marginLeft: 10*em,
              }}
              dropDownStyle={{
                height: 1000*em,
                width: '90%',
                marginLeft: 20*em,
                
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderTopWidth: 2,
                borderTopColor: '#28C7ED',
                backgroundColor: '#f6f5fa', 
              }}
              dropDownMaxHeight={1000*em} 
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              arrowStyle={{marginRight: 10}}
              arrowSize={30}
              arrowColor={'#928DA6'}
              customArrowUp={(size, color) => <Icon name="chevron-up" size={size} color={'#28C7ED'} />} 
              placeholderStyle={{
                fontFamily:"OpenSans-Regular",
                fontWeight: 'normal',
                fontSize: 20,
                color: '#928DA6'
              }}
              labelStyle={{
                fontFamily:"OpenSans-Regular",
                fontWeight: 'bold',
                marginBottom: 10 *em,
                fontSize: 15,
                textAlign: 'left',
                color: '#251B4D'
              }}
              selectedLabelStyle={{
                fontFamily:"OpenSans-Regular",
                fontWeight: 'normal',
                fontSize: 20,
                color: '#251B4D'
            }}
              
              activeItemStyle={{ }}
              onChangeItem={
                item => this.setState({
                  itemValue: item.value,
                  value: item.value,
                  selected: true,
             //     showButton: false
                })
              }
          />

           
         <TextInput
            style={styles.TextInputStyleClass}
            underlineColorAndroid="transparent"
            placeholder={"Écrivez votre message ici"}
            placeholderTextColor={"#BCB8CC"}
            numberOfLines={3}
            multiline={true}
            onFocus={()=>this.setState({showButton: true})}
            onEndEditing={()=>this.setState({showButton: false})}
            //onSelectionChange={()=>this.setState({showButton: false})}
            onChangeText={text => this.setState({
              text: text,
          })}
          value={this.state.text}
          />
            {(showButton && selected) ?
            (<TouchableOpacity style={[styles.ActionButton, {marginBottom:8*em}]} onPress={this.handleSendForm} >
              <Text style={styles.ActionText}>Continuer</Text>
            </TouchableOpacity>):null }

          <Image source={require('../Assets/announcer_bottom_round.png')} style={{width:WIDTH, height:WIDTH*0.245}} resizeMode="stretch"/>
            
          </View>
        </View>
    )
  }
}

const styles = { 
 
  mainContainer :{
 
    flex: 1,
    backgroundColor: '#f6f5fa',
    flexDirection: 'column',
    
  },
  menuWrapper:{
    position:"absolute",
      right: 20*em,
      top: 20*em
  },
  contentContainer: {
    flexDirection: "column",
    marginTop: 80*em,
    marginBottom: 50*em,
    alignItems:"center",
    zIndex:-1
  },
  
  titleText:{
    
    fontSize: 25*em,
    color:"#251b4d",
    fontFamily:"Merriweather-Black"
  },

  contentText:{
    fontSize: 14*em,
    marginTop: 8*em,
    marginBottom: 50*em,
    color:"#251b4d",
    fontFamily:"OpenSans-Regular"
  },

  subtitleText:{
    fontSize: 13*em,
    marginLeft: 20*em,
    alignSelf: "flex-start",
    color:"#928DA6",
    fontFamily:"OpenSans-Regular"
  },
 
  TextInputStyleClass:{
    marginTop: 0,
    paddingTop: 20*em,
    paddingBottom: 20*em,
    textAlign: 'left',
    textAlignVertical: 'top',
    width:'90%',
    height: 60*em,
    borderWidth: 2,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#EBEAF1',
    
    backgroundColor : "#F6F5FA",


    fontFamily: "OpenSans-Regular",
    fontSize: 20,
     
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

ActionText:{
  color:"#fff",
  fontSize: 14*em,
  fontFamily: "OpenSans-SemiBold"
},

ActionButton: {
  overflow: 'hidden',
  width: "90%",
  borderRadius: 18*em,
  height: 50*em,
  alignItems: 'center',
  backgroundColor: '#918da6',
  justifyContent: 'center',
},
}

export default FAQDetail;