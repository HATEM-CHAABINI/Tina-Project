import React, { Component} from 'react';
import { View, Text, FlatList, StatusBar } from 'react-native';
import MenuBtn from '../components/MenuBtn';
import { Actions } from 'react-native-router-flux';
import {WIDTH, HEIGHT, em, Q_TYPE_STRINGS} from '../common/constants';
import {Q_TYPES} from '../common/constants';
import HistoryItem from '../components/HistoryItem';
import { getAllHistoryList } from '../common/firebase/database';
import moment from 'moment';

class History extends Component {
  constructor(props){
    super(props)

    this.state = {
      histories:[]
    }
  }

  UNSAFE_componentWillMount(){
    getAllHistoryList().then(res => {
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

  renderDivider = () => (<View style={styles.listDivider} />)

  render(){
    const {histories} = this.state;
    return (
        <View style={styles.mainContainer}>
          <StatusBar barstyle="light-content" backgroundColor={"#28c7ee"} />

          <View style={styles.menuWrapper}>
            <MenuBtn image={"back"} onPress={() => Actions.pop()}/>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>Historique</Text>

            {histories.length > 0?
              (<View style={styles.listWrapper}>
                <FlatList data={histories}
                  ItemSeparatorComponent={this.renderDivider}
                  renderItem={({item}) => <HistoryItem id={item.id} type={item.type} title={item.title} date={item.dateString} solution={item.solution} questions={item.questions}/>}
                  keyExtractor={item => item.id} />
              </View>):null
            }

            {histories.length <= 0?
              (<Text style={styles.noDataText}>
                Il n'y a pas encore d'historique.
              </Text>):null
            }
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
    elevation:10,
    flexGrow:0,
    marginBottom: 100*em
  },

  contentContainer: {
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

  noDataText:{
    paddingTop:150*em,
    fontSize: 15*em,
    color:"#928da6",
    fontFamily:"OpenSans-Regular",
    textAlign:'center'
  },
}

export default History;
