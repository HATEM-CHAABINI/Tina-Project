import React, { Component} from 'react';
import { View, Text, FlatList, StatusBar, TouchableOpacity, Linking } from 'react-native';
import MenuBtn from '../components/MenuBtn';
import { Actions } from 'react-native-router-flux';
import { ScrollView } from 'react-native-gesture-handler';
import FAQDetailItem from '../components/FAQDetailItem';
import {em} from '../common/constants'
import { goToWebBrowser } from '../common/utils';

class FAQDetail extends Component {
  constructor(props){
    super(props)
  }

  convertPropToData = () => {
    const {faq} = this.props;
    const data = [{id:faq.id, title:faq.title, description:faq.description}];
    const answerKeys = Object.keys(faq.answers).reverse();
    answerKeys.map(item => {
      data.push({...faq.answers[item], id:item})
    })
    return data;
  }

  handleContactUs = () => {
    const {url} = this.props;
    goToWebBrowser(url);
  }

  render(){
    const DATA = this.convertPropToData();
    let content = DATA.map((item, index) => 
      <FAQDetailItem key={item.id.toString()} id={item.id} index={index} title={item.title} description={item.description} />
    );
    return (
        <View style={styles.mainContainer}>
          <StatusBar barstyle="light-content" backgroundColor={"#28c7ee"} />

          <ScrollView style={{flex:1, paddingLeft: 20*em, paddingRight: 20*em}}>
            {content}

            <View style={styles.bottomTitle}>
              <Text style={[styles.descText, {color:"#251b4d"}]}>Vous n'avez pas trouvé votre réponse ?</Text>
              <TouchableOpacity onPress={this.handleContactUs.bind(this)}><Text style={[styles.descText, {color:"#26c8ee", paddingTop:8*em}]}>Contacter notre service client ici</Text></TouchableOpacity>
            </View>
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

  headerContainer: {
    flex: 1
  },

  menuWrapper:{
    position:"absolute", 
    left:20*em,
    top:20*em
  },

  descText:{
    fontSize: 13*em,
    fontFamily:"OpenSans-SemiBold"
  },

  bottomTitle:{
    justifyContent:"center", 
    alignItems:"center",
    flexDirection:"column", 
    paddingTop: 30*em, 
    paddingBottom:80*em
  }
}

export default FAQDetail;