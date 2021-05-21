import React, { Component} from 'react';
import { View, Text, StatusBar, Image ,TouchableOpacity,TextInput,Linking, FlatList, ActivityIndicator} from 'react-native';
import MenuBtn from '../components/MenuBtn';
import { Actions } from 'react-native-router-flux';
import { ScrollView } from 'react-native-gesture-handler';
import { WIDTH, colors,HEIGHT, em, Q_TYPE_STRINGS } from '../common/constants';
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
import MyTextInput from '../components/MyTextInput';
import { ListItem, SearchBar } from 'react-native-elements';
import { getAllTheHistoryList } from '../common/firebase/database';
import moment from 'moment';
import RechercheItem from '../components/RechercheItem';


const ContentItem = ({id, title, description}) => (
  <View style={styles.contentItem}>
    {THUMB[id - 1]}
    <Text style={styles.contentTitle}>{title}</Text>
    <Text style={styles.contentDesc}>{description}</Text>
  </View>
)

class RechercheR extends Component {
  constructor(props){
    super(props)
    this.state = {
      value: "",
      text:"", 
      loading: false,
      data: [],
      error: null,
      histories:[]

        }
        this.arrayholder = [];

  }
  UNSAFE_componentWillMount(){
    getAllTheHistoryList().then(res => {
      if (res){
        let histories = [];
        res.map(item => {
          const dateString = moment(item.created).format("DD/MM/YYYY");
          const title = "Panne " + Q_TYPE_STRINGS[item.type];
          histories.push({...item, dateString, title})
        })
        this.setState({histories})
      }
    },
    reject => {
      console.log("no histories data");
    })
  }



 
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.state.histories.filter(item => {
      const itemData = `${item.title.toUpperCase()} ${item.solution.toUpperCase()} ${item.type.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    return (
        // <MyTextInput style={styles.TextInput}
        //  placeholder ={"Rechercher par mot clés"}
        //  textContentType={"jobTitle"} autoFocus={true} 
        // //  value={this.state.text} 
        // round
        //  onChangeText={text => this.searchFilterFunction(text)}
        //  value={this.state.value}

        // //  handleChange={(text)=>this.setState({text:text})} 
         
        //  />

<View>
        <MyTextInput style={styles.TextInput}
         placeholder ={"Rechercher par mot clés"} 
         textContentType={"jobTitle"} 
         autoFocus={true} 
         value={this.state.value}
         handleChange={text => this.searchFilterFunction(text)} />
     
     { this.state.value =="" ?
         <Text style={styles.textReche}>Essayez : Error, écran bleu, mise à jour windows…</Text>:
         <View></View>
         }
         </View>
   
    );
  };


  render(){
    const {histories} = this.state;

    if (this.state.loading) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator />
          </View>
        );
      }
    
    return (

      

        <View style={styles.mainContainer}>
          <StatusBar barstyle="light-content" />

          <View style={styles.menuWrapper}>
            <MenuBtn image={"close"} onPress={() => Actions.pop()}/>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>Rechercher</Text>
           {/*  <MyTextInput style={styles.TextInput} placeholder ={"Rechercher par mot clés"} textContentType={"jobTitle"} autoFocus={true} value={this.state.text} handleChange={(text)=>this.setState({text:text})} /> */}
          
          
          { this.state.value !="" ?
            <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <RechercheItem id={item.id} type={item.type} title={item.title} date={item.dateString} solution={item.solution} questions={item.questions}/>
          )}
          keyExtractor={item => item.email}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />:
        
        <FlatList
        // data={this.state.data}
        
        ListHeaderComponent={this.renderHeader}
      />
        }
           
    
          </View>
        </View>
    )
  }
}

const styles = { 
    descText:{
        fontSize: 12*em,
        marginTop: 10*em,
        color:"#928da6",
        fontFamily:"OpenSans-Regular"
      },
    TextInput:{
        height: 45*em,
        width:333*em,
        fontSize: 13*em,
        color:"#28c7ee",
        borderBottomWidth:1*em,
        borderBottomColor:"#28c7ee",
        fontFamily:"OpenSans-Regular"
      },
      textReche:{
          height:18*em,
          fontSize:13*em,
          fontFamily:"OpenSans-Regular",
          marginTop:5*em,
          color:'#928DA6'
        },
  mainContainer :{
 
    flex: 1,
    backgroundColor: "#FFFFFF",
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
    zIndex:-1,
    marginLeft: 21*em,

  },
  
  titleText:{
    fontSize: 25*em,
    color:"#251b4d",
    fontFamily:"Merriweather-Black",
    marginBottom:43*em
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
    paddingBottom: 10*em,
    textAlign: 'left',
    textAlignVertical: 'top',
    width:'90%',
    height: 70*em,
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

export default RechercheR;