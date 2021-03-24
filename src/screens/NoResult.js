import React, { Component} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors, WIDTH, Q_TYPES, em} from '../common/constants';
import Ordinateur from '../components/svgicons/Ordinateur';
import Periferique from '../components/svgicons/Periferique';
import Astuce from '../components/svgicons/Astuce';
import Logiciel from '../components/svgicons/Logiciel';
import AnswerNotFound from '../components/svgicons/AnswerNotFound';
import Internet from '../components/svgicons/Internet';
import BottomArrow from '../components/svgicons/BottomArrow';
import Alert from '../components/svgicons/Alert';
import CheckBox from '../components/CheckBox';
import Tool from '../components/svgicons/Tool';
import { Actions } from 'react-native-router-flux';
import { AppActions, QuestionActions } from '../actions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTinaHistory } from '../common/firebase/database';
import { showRootToast } from '../common/utils';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

class NoResult extends Component {
  constructor(props){
    super(props)
    this.state = {solutionIndex: 1}
  }

  renderIcons(){
    return (<Image source={require('../Assets/tina-question-2.png')} style={{width: scale(60), height: verticalScale(60), resizeMode:'contain'}}  />)
  }

  handleContinueClick = () => {
    const {solutionIndex} = this.state;
    const {questions} = this.props.question;
    const {qType} = this.props;
    if (solutionIndex == 1){
      Actions.depanneurs()
    }else{
      const {isAuthenticated} = this.props.auth;
      if (isAuthenticated){
        // notify this answer when it's solved... just add it to history
        const solution = "";
        addTinaHistory({type:qType, questions, solution})
        showRootToast("Les questions ont été enregistrées");

        this.props.questionActions.clearQuestions();
        Actions.reset('home');
      }else{
        Actions.signin();
      }
    }
  }

  handleBackToHome = () => {
    this.props.questionActions.clearQuestions();
    Actions.reset('home');
  }

  componentWillUnmount(){
    if (this.props.question.questions.length > 0){
      this.props.questionActions.removeLastQuestion()
    }
  }

  render(){
    return (
        <View style={styles.mainContainer}>
          <StatusBar barstyle="light-content" backgroundColor={colors[this.props.qType][0]} />
          <View style={styles.headerContainer}>
            <LinearGradient
              start={{x: 0, y: 0}} end={{x: 0, y: 1}}
              colors={colors[this.props.qType]}
              style={{flex:0.9}}>

                <View style={styles.headerContentContainer}>
                  <View style={styles.circleOverlay}>

                    {this.renderIcons()}

                    <View style={styles.AnswerNotFoundWrapper}>
                        <AnswerNotFound width={25*em} height={25*em} />
                    </View>
                  </View>

                  <Text style={styles.titleText}>Je suis désolée</Text>
                  <Text style={styles.descText}>Je n'ai pas trouvé de solution</Text>
                </View>
            </LinearGradient>
          </View>

          <View style={styles.contentContainer}>

            <Image source={require('../Assets/result_split.png')} style={styles.SplitImage} resizeMode={'stretch'} />

            <View style={styles.ArrowWrapper}>
                <BottomArrow width={45*em} height={45*em} />
            </View>

            <View style={styles.contentWrapper}>

              <Text style={styles.solutionText}>
              Voici d’autres solutions :
              </Text>

              <View style={styles.ChoiceWrapper}>
                  <TouchableOpacity style={styles.ActionButton} onPress={() => {this.setState({solutionIndex: 0})}}>
                    <View style={styles.CheckWrapper}>
                        <View style={StyleSheet.flatten([styles.circleIconOverlay, {backgroundColor:"#fef8d9"}])}>
                            <Alert width={16*em} height={16*em} />
                        </View>

                        <Text style={styles.CheckContent}>
                        Être averti dès que Tina aura trouvé une solution à votre panne.
                        </Text>

                        <CheckBox checked={this.state.solutionIndex == 0} />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity style={StyleSheet.flatten([styles.ActionButton, {marginTop:18*em}])} onPress={() => {this.setState({solutionIndex: 1})}}>
                    <View style={styles.CheckWrapper}>
                        <View style={StyleSheet.flatten([styles.circleIconOverlay, {backgroundColor:"#f1eeff"}])}>
                            <Tool width={16*em} height={16*em} />
                        </View>

                        <Text style={styles.CheckContent}>
                          Être mis en contact avec un dépanneur le plus proche
                        </Text>

                        <CheckBox checked={this.state.solutionIndex == 1} />
                    </View>
                  </TouchableOpacity>
              </View>

              <View style={{flex:1, justifyContent:"flex-end"}}>
                <View style={styles.ActionWrapper}>

                  <TouchableOpacity style={styles.ActionButtonBlue} onPress={this.handleContinueClick}>
                    <Text style={styles.ActionBlueText}>Continuer</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.ActionButtonNoBg} onPress={this.handleBackToHome}>
                    <Text style={styles.ActionNoBgText}>Fermer</Text>
                  </TouchableOpacity>
                </View>
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
    flex: 0.8
  },

  contentContainer: {
    flex:1,
    marginTop: -150*em,
    flexDirection: "column"
  },

  contentWrapper:{
    flex: 1,
    flexDirection:"column",
    marginTop:-100*em
  },

  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  headerContentContainer:{
    flex: 1,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80*em
  },

  titleText:{
    color:"#fff",
    fontSize: 18*em,
    marginTop: 20*em,
    fontFamily:"Merriweather-Black"
  },

  descText:{
    color:"#fff",
    fontSize: 14*em,
    marginTop: 8*em,
    fontFamily:"OpenSans-Regular"
  },

  AnswerNotFoundWrapper:{
    position: "absolute",
    right: 0,
    top: 0,
  },

  SplitImage: {
    width: WIDTH,
    height: WIDTH*0.4
  },

  ArrowWrapper: {
    position:'absolute',
    left:0,
    right: 0,
    alignItems:'center',
    marginTop: 15*em
  },

  ChoiceWrapper:{
    flex: 1,
    flexDirection: "column",
    paddingLeft: 20*em,
    paddingRight: 20*em,
    marginTop: 18*em
  },

  CheckWrapper:{
    flex: 1,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    paddingTop:18*em,
    paddingBottom:18*em
  },

  CheckContent:{
    flex:1,
    color:"#251b4d",
    fontSize: 12*em,
    paddingLeft: 18*em,
    paddingRight: 13*em,
    fontFamily:"OpenSans-Regular",
    height:34*em,
  },

  ActionButton: {
    overflow: 'hidden',
    borderRadius: 18*em,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingLeft:20*em,
    paddingRight:20*em,
    paddingTop:15*em,
    paddingBottom:15*em,
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 2,
  },

  solutionText:{
    paddingLeft: 60*em,
    paddingRight: 60*em,
    marginTop: 18*em,
    fontSize: 16*em,
    color:"#251b4d",
    textAlign: "center",
    fontFamily: "Merriweather-Black"
  },

  circleOverlay: {
    width: 80*em,
    height: 80*em,
    borderRadius: 40*em,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"#fff",
    elevation: 20
  },

  circleIconOverlay: {
    width: 34*em,
    height: 34*em,
    borderRadius: 17*em,
    alignItems: 'center',
    justifyContent: 'center',
  },

  ActionButtonBlue: {
    overflow: 'hidden',
    borderRadius: 18*em,
    alignItems: 'center',
    backgroundColor: '#28c7ee',
    height: 50*em,
    justifyContent: 'center',
    marginLeft:20*em,
    marginRight:20*em,
  },

  ActionWrapper:{
    backgroundColor:"#fff",
    borderTopLeftRadius:20*em,
    borderTopRightRadius: 20*em,
    width:WIDTH,
    paddingTop: 13*em,
    paddingBottom: 13*em,
    justifyContent:"center"
  },

  ActionButtonNoBg: {
    justifyContent:"center", alignSelf:"center"
  },

  ActionBlueText:{
    color:"#fff",
    fontSize: 14*em,
    fontFamily:"OpenSans-SemiBold"
  },

  ActionNoBgText:{
    color:"#a099b0",
    fontSize: 14*em,
    padding: 15*em,
    fontFamily:"OpenSans-SemiBold"
  }
}

const mapStateToProps = state => ({
  app: state.app || {},
  auth: state.auth || {},
  question: state.question || {}
});

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(AppActions, dispatch),
  questionActions: bindActionCreators(QuestionActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps)(NoResult);
