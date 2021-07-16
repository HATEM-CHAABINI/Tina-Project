import React, { Component } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity, TextInput, Linking, FlatList, ActivityIndicator } from 'react-native';
import MenuBtn from '../components/MenuBtn';
import { Actions } from 'react-native-router-flux';
import { ScrollView } from 'react-native-gesture-handler';
import { WIDTH, colors, HEIGHT, em, Q_TYPE_STRINGS, hm } from '../common/constants';
import Tina from '../components/svgicons/Tina';
import Binoculars from '../components/svgicons/Binoculars';
import Rocket from '../components/svgicons/Rocket'
import GameBoy from '../components/svgicons/GameBoy'
import Ticket from '../components/svgicons/Ticket'
import DropDownPicker from 'react-native-dropdown-picker';
import { showRootToast, showBiggerRootToast } from '../common/utils';
import Icon from 'react-native-vector-icons/Feather';
import CheckSelected from '../components/svgicons/CheckSelected';
import qs from 'qs';
import MyTextInput from '../components/MyTextInput';
import { ListItem, SearchBar } from 'react-native-elements';
import { getAllTheHistoryList } from '../common/firebase/database';
import moment from 'moment';
import RechercheItem from '../components/RechercheItem';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ListView from "deprecated-react-native-listview";
import CloseR from '../components/svgicons/CloseR';
import AnswerNotFound from '../components/svgicons/DeleteNew'
import RechercheHeader from '../components/RechercheHeader';
import MyTextInputRecherche from '../components/MyTextInputRecherche';
const ContentItem = ({ id, title, description }) => (
  <View style={styles.contentItem}>
    {THUMB[id - 1]}
    <Text style={styles.contentTitle}>{title}</Text>
    <Text style={styles.contentDesc}>{description}</Text>
  </View>
)

class RechercheR extends Component {

  constructor(props) {
    super(props)
    this.textInput = React.createRef();
    this.state = {
      value: "",
      text: "",
      loading: false,
      data: [],
      error: null,
      histories: [],
      scrollPosition: -STICKY_HEADER_HEIGHT,
      isFocused: false,

    }
    this.arrayholder = [];

  }

  UNSAFE_componentWillMount() {
    getAllTheHistoryList().then(res => {
      if (res) {
        let histories = [];
        res.map(item => {
          const dateString = moment(item.created).format("DD/MM/YYYY");
          const title = "Panne " + Q_TYPE_STRINGS[item.type];
          histories.push({ ...item, dateString, title })
        })
        this.setState({ histories })
        console.log("************************************** histories data ***********************************");
        console.log(this.state.histories);
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
      // key={item1.id}
      />
    );
  };

  searchFilterFunction = text => {
    console.log("ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");


    const newData = this.state.histories.filter(item => {
      const itemData = `${item.title.toUpperCase()} ${item.solution.toUpperCase()} ${item.type.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      data: newData,
    });

    console.log(newData);
  };

  handleChange = (text) => {
    this.setState({ value: text })

    if (text.length > 0) {
      this.searchFilterFunction(text)
    } else {
      this.setState({ data: [] })
    }
  }

  clearText = (text) => {
    console.log("fffffffffffffffffffffffffrrrfffffffffffffffffffffffffffffffff");
    this.setState({
      value: "",
      isFocused: false
    });
  };
  handleFocus = () => {
    this.setState({ isFocused: true })
    //if (this.props.handleFocus) this.props.handleFocus()
  }

  handleBlur = () => this.setState({ isFocused: false })
  renderHeader = () => {
    return (

      <View style={styles.first}>
        <View style={styles.menuWrapper}>
          <MenuBtn image={"close"} onPress={() => Actions.pop()} />
        </View>


        <Text style={styles.titleText}>Rechercher</Text>
        <View style={styles.clear}>
          <TextInput
            onChangeText={text => this.searchFilterFunction(text)}
            value={this.state.value}
            //editable={this.props.editable}
            // clearButtonMode="while-editing"
            onFocus={this.handleFocus}
            //keyboardType={this.keyboardType}
            onBlur={this.handleBlur}
            style={[styles.TextInput, { color: "#251b4d", fontSize: 16 * em, borderBottomColor: this.state.isFocused ? "#28c7ee" : '#928da6' }]}
            autoFocus={true}
            //secureTextEntry={this.props.secureTextEntry}
            //textContentType={"jobTitle"}
            placeholder={"Rechercher par mot clés"}
          />
          {this.state.isFocused ? (
            <TouchableOpacity
              style={styles.closeButtonParent}
              onPress={() => this.setState({
                value: "",
                data: []
              })}>
              <AnswerNotFound width={18 * em} height={18 * em} />
            </TouchableOpacity>) : null}
        </View>
        {this.state.value == "" ?
          <Text style={styles.textReche}>Essayez : Error, écran bleu, mise à jour windows…</Text> :
          null
        }
      </View>

    );
  };

  setScrollPosition = (e) => {
    this.setState({
      scrollPosition: e,
    });
  }



  render() {
    const { histories } = this.state;

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
        <RechercheHeader />
        <View style={{ paddingLeft: 20 * em, paddingRight: 20 * em, marginTop: 0 * em, zIndex: -1 }}>
          <MyTextInputRecherche handleChange={text => this.handleChange(text)} style={styles.TextInput} autoFocus={true} placeholder={"Rechercher par mot clés"} value={this.state.value} />
          {this.state.value == "" ?
            <Text style={styles.textReche}>Essayez : Error, écran bleu, mise à jour windows…</Text> :
            null
          }
          <FlatList
            ref="ListView"
            style={styles.container}
            data={this.state.data}
            renderItem={({ item }) => (
              <RechercheItem id={item.id} type={item.type} title={item.title} date={item.dateString} solution={item.solution} questions={item.questions} />
            )}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </View>
      </View>
    )
  }
}

//160 130
const PARALLAX_HEADER_HEIGHT = 150 * em;
const STICKY_HEADER_HEIGHT = 120 * em;
const styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    flexDirection: 'column',
    paddingBottom: 159 * hm
  },

  TextInput: {
    height: 45 * em,
    fontSize: 21 * em,
    color: "#28c7ee",
    borderBottomWidth: 1 * em,
    borderBottomColor: "#28c7ee",
    fontFamily: "OpenSans-Regular",
    //backgroundColor: "#FFF",
    //marginLeft: 20 * em,
    // marginRight: 20 * em,

  },
  textReche: {
    height: 18 * em,
    fontSize: 13 * em,
    fontFamily: "OpenSans-Regular",
    marginTop: 5 * em,
    color: '#928DA6',
    backgroundColor: '#FFF'
  },
  textRecheI: {
    height: 18 * em,
    fontSize: 13 * em,
    fontFamily: "OpenSans-Regular",
    marginTop: 5 * em,
    color: '#FFF',
    backgroundColor: '#FFF'
  },
  container: {
    backgroundColor: "#FFFFFF",
    //marginTop: 300 * em
  },

  menuWrapper: {
    position: "absolute",
    right: 20 * em,
    top: 10 * em,
    backgroundColor: "#FFF"
  },
  menuWrappernew: {
    position: "absolute",
    left: 20 * em,
    top: 90 * em,
    backgroundColor: "#FFF",

  },
  menuWrapperSti: {
    position: "absolute",
    right: 20 * em,
    top: 20 * em
  },
  contentF: {
    left: 10 * em, right: 10 * em, top: 70 * em, position: 'absolute', backgroundColor: "#FFF"
  },
  contentContainer: {
    flexDirection: "column",
    marginTop: 80 * em,
    marginBottom: 50 * em,
    zIndex: -1,
    marginLeft: 21 * em,
    backgroundColor: "#FFF"
  },

  titleText: {
    fontSize: 30 * em,
    color: "#251b4d",
    fontFamily: "Merriweather-Black",
    marginBottom: 10 * em
  },
  titleTextS: {
    fontSize: 16 * em,
    color: "#251b4d",
    fontFamily: "Merriweather-Black",
    marginBottom: 10 * em
  },

  contentItem: {
    paddingTop: 25 * em,
    paddingBottom: 30 * em,
    alignItems: "center",
    justifyContent: "center"
  },

  contentTitle: {
    fontSize: 16 * em,
    color: "#251b4d",
    marginTop: 14 * em,
    marginBottom: 14 * em,
    fontFamily: "Merriweather-Black"
  },

  contentDesc: {
    fontSize: 12 * em,
    textAlign: "center",
    color: "#a099b0",
    fontFamily: "OpenSans-Regular",
    lineHeight: 20 * em
  },

  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    backgroundColor: "#FFF",
    paddingTop: 30 * em,
    alignItems: 'center',

  },

  fixedSection: {
    width: "100%",
    position: 'absolute',
    //flexDirection: 'column',
    top: 70,
    right: 21,
    left: 21,
    zIndex: 5
    // paddingRight: -60 * em,
  },

  parallaxHeader: {
    //alignItems: 'flex-start',
    //flex: 1,
    //flexDirection: 'column',
    paddingTop: 80 * em,
    paddingLeft: 20 * em,
    // paddingRight: -60 * em,
    backgroundColor: "#FFF",
    // zIndex: 5
  },

  closeButton: {
    height: 16,
    width: 16,
  },
  closeButtonParent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginTop: 8,
    position: "absolute",
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  clear: {



  },
  closeButt: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 41 * em,
    marginTop: 8,
    position: "absolute",
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    width: "100%",
    position: 'absolute',
    //flexDirection: 'column',
    top: 0,
    right: 21,
    left: 21,
    zIndex: 5
    // paddingRight: -60 * em,
  }

}

export default RechercheR;