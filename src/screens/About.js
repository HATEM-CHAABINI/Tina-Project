import React, { Component} from 'react';
import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import MenuBtn from '../components/MenuBtn';
import { Actions } from 'react-native-router-flux';
import {em} from '../common/constants';
import ArrowSmall from '../components/svgicons/ArrowSmall'
import { getAllAboutList } from '../common/firebase/database';
import { goToWebBrowser } from '../common/utils';


/*()=>goToWebBrowser(url)*/
const Item = ({title, url, hasDivider}) => (
  <View styles={{flexDirection:"column"}}>
    <TouchableOpacity onPress={()=> 
       {Actions.pop();
        Actions.abouttina();}}> 
      <View style={styles.mainWrapper}>            
        <Text style={styles.itemText}>{title}</Text>
        <ArrowSmall width={14*em} height={14*em} />
      </View>
    </TouchableOpacity>

    {hasDivider? (<View style={styles.listDivider} />):null}
  </View>
)

class About extends Component {
  constructor(props){
    super(props)

    this.state = {
      abouts:[]
    }
  }

  handleGoToAboutTina = () => {
    Actions.pop();
    Actions.abouttina();
  }

  UNSAFE_componentWillMount(){
    getAllAboutList().then(res => {
      this.setState({
        abouts: res || null
      });
    })
  }
  
  render(){
    let aboutus = [];
    const {abouts} = this.state;
    abouts.map((item, index) => {
      aboutus.push(<Item key={item.id} title={item.title} url={item.url} hasDivider={index < abouts.length - 1}/>)
    })
    return (
        <View style={styles.mainContainer}>
          <StatusBar barstyle="light-content" backgroundColor={"#28c7ee"} />
          
          <View style={styles.menuWrapper}>
            <MenuBtn image={"back"} onPress={() => Actions.pop()}/>                  
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>À propos</Text>

            <View style={styles.listWrapper}>

              <View styles={{flexDirection:"column"}}>
              <TouchableOpacity onPress={()=> { Actions.abouttina();}}> 
                <View style={styles.mainWrapper}>            
                  <Text style={styles.itemText}>À propos de Tina</Text>
                  <ArrowSmall width={14*em} height={14*em} />
                </View>
              </TouchableOpacity>
              <View style={styles.listDivider} />
              </View>

              <View styles={{flexDirection:"column"}}>
              <TouchableOpacity onPress={()=> {  Actions.cgu();}}> 
                <View style={styles.mainWrapper}>            
                  <Text style={styles.itemText}>Conditions générales d'utilisation</Text>
                  <ArrowSmall width={14*em} height={14*em} />
                </View>
              </TouchableOpacity>
              <View style={styles.listDivider} />
              </View>

              <View styles={{flexDirection:"column"}}>
              <TouchableOpacity onPress={()=> { Actions.rgpd();}}> 
                <View style={styles.mainWrapper}>            
                  <Text style={styles.itemText}>Politique de confidentialité</Text>
                  <ArrowSmall width={14*em} height={14*em} />
                </View>
              </TouchableOpacity>
              
              </View>

                

            </View>
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

  headerContainer: {
    flex: 1
  },

  menuWrapper:{
    position:"absolute", 
    left:20*em,
    top:20*em
  },
  
  listWrapper:{
    borderRadius:18*em, 
    marginTop: 18*em,
    backgroundColor:"#fff", 
    elevation:10
  },

  contentContainer: {
    flex: 1,
    flexDirection: "column", 
    marginTop: 100*em, 
    paddingLeft: 20*em,
    paddingRight:20*em
  },

  listDivider:{
    height:1*em, 
    marginLeft:18*em, 
    backgroundColor:"#eee"
  },

  titleText:{
    fontSize: 24*em, 
    color:"#251b4d", 
    fontFamily:"Merriweather-Black"
  },

  mainWrapper:{
    flexDirection:"row", 
    alignItem:"center", 
    justifyContent:"center", 
    alignItems:"center", 
    paddingLeft: 18*em, 
    paddingRight:18*em, 
    paddingTop:23*em, 
    paddingBottom:23*em
  },

  itemText:{
    fontSize: 14*em, 
    flex: 1, 
    color:"#251b4d", 
    fontFamily:"OpenSans-SemiBold"
  },
  
}

export default About;