import React, { Component} from 'react';
import { View, Text, FlatList, StatusBar, TouchableOpacity , Linking ,Platform} from 'react-native';
import MenuBtn from '../components/MenuBtn';
import { Actions } from 'react-native-router-flux';
import {em} from '../common/constants';
import FAQItem from '../components/FAQItem';
import { getAllFAQsList, getSettingsInfo } from '../common/firebase/database';
import { goToWebBrowser } from '../common/utils';

class FAQ extends Component {
  constructor(props){
    super(props)

    this.state = {
      faqs:null,
      contact_us:""
    }
  }

  UNSAFE_componentWillMount(){
    getAllFAQsList().then(res => {
      // console.log('====== getAllFaqs: res: ', res);
      this.setState({
        faqs: res || null
      });
    })

    getSettingsInfo().then(res => {
      // console.log('====== Settings: res: ', res['contact_us']);
      if (res)
        this.setState({contact_us: res['contact_us']['url']})
    })
  }

  renderDivider = () => (<View style={styles.listDivider} />)

  // convertFAQtoArray = () => {
  //   const {faqs} = this.state;
  //   if (!faqs) return [];

  //   const faqKeys = Object.keys(faqs);

  //   console.log(faqKeys);

  //   const farray = [];
  //   faqKeys.map(item => {
  //     farray.push({...faqs[item], id:item})
  //   })
  //   return farray;
  // }

  handleGoFAQDetail = (item) => {
    const {contact_us} = this.state;
    Actions.faqdetail({faq:item, url:contact_us});
  }

  handleContactUs = () => {
    const {contact_us} = this.state;
    Linking.openURL(`mailto:bflorin@absolutemicro.fr`)
  }

  render(){
    const {faqs} = this.state;
    return (
        <View style={styles.mainContainer}>
          <StatusBar barstyle="light-content" backgroundColor={"#28c7ee"} />

          <View style={styles.menuWrapper}>
            <MenuBtn image={"back"} onPress={() => Actions.pop()}/>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>Foire aux questions</Text>

            <View style={{flex:1}}>
              <View style={styles.listWrapper}>
                <FlatList data={faqs}
                  ItemSeparatorComponent={this.renderDivider}
                  renderItem={({item}) => <FAQItem id={item.id} title={item.title} onPress={() => this.handleGoFAQDetail(item)}/>}
                  keyExtractor={item => item.id.toString()} />
              </View>
            </View>
            <View style={styles.bottomTitle}>
              <Text style={[styles.descText, {color:"#251b4d"}]}>Vous n'avez pas trouvé votre réponse ?</Text>
              <TouchableOpacity onPress={this.handleContactUs.bind(this)}><Text style={[styles.descText, {color:"#26c8ee", paddingTop:8*em}]}>Contacter notre service client ici</Text></TouchableOpacity>
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
    marginTop: 15*em,
    backgroundColor:"#fff",
    elevation:10,
    flexGrow:0,
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

  descText:{
    fontSize: 13*em,
    fontFamily:"OpenSans-SemiBold"
  },

  bottomTitle:{
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
    marginTop: 50*em,
    marginBottom:40*em
  }
}

export default FAQ;
