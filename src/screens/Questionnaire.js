import React, { Component, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import MenuBtn from '../components/MenuBtn';
import RectangleImage from '../components/RectangleImage';
import Back from '../components/svgicons/Back';
import LinearGradient from 'react-native-linear-gradient';
import Info from '../components/svgicons/Info';
import { Actions } from 'react-native-router-flux';
import InfoModal from '../components/InfoModal';
import { colors, WIDTH, em, Q_TYPES, Q_TYPE_STRINGS, HEIGHT, hm } from '../common/constants';
import EvaluationModal from '../components/EvaluationModal';
import { getQuestionByCategoryAndId } from '../common/firebase/database';
import { getQuestionByCategory } from '../common/firebase/database';
import { AppActions, QuestionActions } from '../actions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as notifications from '../common/onesignal/notifications';
import { goToWebBrowser } from '../common/utils/misc';
import { AdMobBanner } from 'react-native-admob';
import ReactInterval from 'react-interval';
import moment from 'moment';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

let advIndex = 0;
class Cat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      idyy: 0,
    }
  }


  componentDidMount() {
    ny = 0;
    nn = 0;
    nd = 0;
    idy = 0;
    idn = 0;
    by = true;
    bn = true;
    bd = true;
    bo = true
    i = 0;
    getQuestionByCategory(this.props.qType).then(res => {
      idy = res.find(data => data.qid == this.props.ques).yid
      idn = res.find(data => data.qid == this.props.ques).nid
      while (by) {

        if (idy != undefined && res.find(data => data.qid == idy)) {
          ny++
          idy = res.find(data => data.qid == idy).yid

        } else {
          by = false
        }
      }

      while (bn) {

        if (idn != undefined && res.find(data => data.qid == idn)) {
          nn++
          idn = res.find(data => data.qid == idn).nid

        } else {
          bn = false
        }
      }


      i = (this.state.idyy + (1 / ((ny + nn) + 1)))

      if (i == "Infinity") {
        i = 1;
      }
      this.setState({
        idyy: i,
      })

    })


  }


  render(props) {
    return (
      <View style={styles.progressWrapper}>

        <LinearGradient
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          colors={colors[this.props.qType]}

          style={{ width: this.state.idyy * WIDTH, height: 20 * em }}>

        </LinearGradient>
      </View>
    );
  }
}

class Questionnaire extends Component {
  ANSWER_TYPE_YES = 1;
  ANSWER_TYPE_NO = 2;
  ANSWER_TYPE_DUNNO = 3;

  qType = "";
  solution = "";
  isFromHistory = false;
  constructor(props) {
    super(props)
    this.state = {
      infoVisible: false,
      evaluationVisible: false,
      selectedAds: null,
      stopTimer: true,
      backBtn: false,
    }
  }

  // UNSAFE_componentWillMount() {
  //   this.setAdvertisements();
  // }

  componentDidMount() {
    console.log('======= questionnaire ======== ');
    this.setAdvertisements();
    console.log('======= qinfo ======== ');
    console.log(this.props.qinfo);

  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('===== nextState: ', nextState);
    if (this.state.infoVisible == nextState.infoVisible &&
      this.state.evaluationVisible == nextState.evaluationVisible) {
      if (this.state.selectedAds !== nextState.selectedAds)
        return true;
      return false;
    }
    return true;
  }

  componentWillUnmount() {
    if (this.props.question.questions.length > 0) {
      this.props.questionActions.removeLastQuestion()
    }
  }

  renderInfoModal() {
    const { info } = this.props.qinfo;
    if (!info) return null;

    const { title, content, image } = info;

    if (this.state.infoVisible) {
      return (
        <InfoModal title={title} content={content} image={{ uri: image }} isModalVisible={true} onPress={() => { this.setState({ infoVisible: false }) }} />
      )
    } else {
      return null;
    }
  }

  handleEvaluationSendClick() {
    this.setState({ evaluationVisible: false })
    this.props.appActions.setEvaluated({ evaluated: true });

    Actions.foundresult({ qType: this.qType, solution: this.solution, isFromHistory: this.isFromHistory })
  }

  handleEvaluationSkipClick() {
    this.setState({ evaluationVisible: false })

    Actions.foundresult({ qType: this.qType, solution: this.solution, isFromHistory: this.isFromHistory })
  }

  processFoundAnswer(qType, solution, isFromHistory) {
    const { app } = this.props;
    //if (!app.evaluated){
    this.qType = qType;
    this.solution = solution;
    this.isFromHistory = isFromHistory;
    this.setState({ evaluationVisible: true });
    //}else{
    //  Actions.foundresult({qType, solution, isFromHistory})
    //}
  }

  handleAnswerClick(type) {
    const { qinfo, qType, questionActions } = this.props;
    let qid = "";
    let answerText = "";
    if (type == this.ANSWER_TYPE_YES) {
      qid = qinfo.yid;
      answerText = "Oui";
    } else if (type == this.ANSWER_TYPE_NO) {
      qid = qinfo.nid;
      answerText = "Non";
    } else if (type == this.ANSWER_TYPE_DUNNO) {
      qid = qinfo.did;
      answerText = "Je ne sais pas";
    }
    this.setState({ backBtn: true })

    questionActions.addQuestion({
      "qid": qinfo['qid'],
      "title": qinfo['title'],
      "answerId": qid,
      "answerText": answerText
    })

    if (qid != "") {
      // Get the corresponding question
      const _this = this;
      getQuestionByCategoryAndId(qType, qid).then(res => {
        if (!res) {
          Actions.noresult(this.props)
        } else if ((res['qid'] != undefined)) {
          this.setState({ backBtn: true });
          Actions.questionnaire({ qType: qType, qinfo: res, b: true })
        } else if ((res['solution'] != undefined) && (res['solution'] != "")) {
          if (_this.props) {
            const app = _this.props.app;
            const auth = _this.props.auth;
            const onesignalUserId = (app && app.onesignal && app.onesignal.userId) ? app.onesignal.userId : null;
            const isNotify = auth && auth.credential && auth.credential._user && auth.credential._user.receiveNoti;
            onesignalUserId && isNotify &&
              notifications.postAnswerResultNotification(onesignalUserId, res['solution']);
          }

          this.processFoundAnswer(qType, res['solution'], false)
        } else if ((res['solution'] != undefined) && (res['solution'] == "")) {
          Actions.noresult(this.props)
        }
      });
    }
  }

  handleGoBack() {
    Actions.pop();
  }

  handleClose(event) {
    this.props.questionActions.clearQuestions();
    Actions.popTo('home');
  }

  handleAdFailedToLoad = (error) => {
    console.log('==== handleAdFailedToLoad: ', error);
    this.setState({ selectedAds: null });
    /* In the case gogle admob
    if (error && error.message) {
      if (error.message === "Invalid ad width or height: (414, 0)") return;
      // if (error.message === "Request Error: No ad to show.")
      // this.props.appActions && this.props.appActions.setAdMobId({adMobId: null});
    }
    */
  };

  onClickAds = (url) => {
    goToWebBrowser(url);
  }

  handleGoInfoWindow = () => {
    this.setState({ infoVisible: true })
  }

  changeImageUrl2Https = (imageUrl) => {
    if (imageUrl.substring(0, 7) === 'http://')
      return imageUrl.replace('http://', 'https://');
    return imageUrl;
  }

  renderEvaluationModal() {
    if (this.state.evaluationVisible) {
      return (
        <EvaluationModal
          rate={4}
          isModalVisible={true}
          onPressSend={this.handleEvaluationSendClick.bind(this)}
          onPressSkip={this.handleEvaluationSkipClick.bind(this)} />
      )
    } else {
      return null;
    }
  }

  renderAdmob = () => {
    const { adMobId } = this.props.app;
    return (
      adMobId ? <AdMobBanner
        adSize="fullBanner"
        adUnitID={adMobId}
        testDevices={[AdMobBanner.simulatorId]}
        onAdFailedToLoad={error => this.handleAdFailedToLoad(error)}
      /> :
        null
    );
  };

  setAdvertisements = () => {
    const { advertisements } = this.props.app;
    //console.log('===== advertisements: ', advertisements);
    const res = [];
    if (advertisements) {
      // Filtering due date
      const adsKeys = Object.keys(advertisements).reverse();
      //console.log('====== adsKeys: ', adsKeys)
      for (var i = 0; i < adsKeys.length; i++) {
        const key = adsKeys[i];
        const adv = advertisements[key];
        var startDate = moment(adv.start_date);
        var endDate = moment(adv.end_date);
        var now = moment();
        if (now >= startDate && now <= endDate) {
          res.push(adv);
        }
      }
      //console.log('===== res: ', res)
      // Set adv
      for (var i = 0; i < res.length; i++) {
        const adv = res[i];
        //console.log('===== i, advIndex: ', i, advIndex)
        if (i === advIndex) {
          this.setState({ selectedAds: adv }, () => {
            advIndex = ((advIndex + 1) === (adsKeys.length - 1)) ? 0 : (advIndex + 1);
          });
          break;
        }
      }
    }
  };

  renderAdvertisements = () => {
    const { selectedAds } = this.state;
    console.log('==== renderAdvertisements: selectedAds: ', selectedAds && this.changeImageUrl2Https(selectedAds.image));
    return selectedAds ? (
      <TouchableOpacity
        // key={`touchableopacity-${i}`}
        onPress={() => this.onClickAds(selectedAds.linked_url)}
      >
        <Image
          // key={`image-${i}`}
          style={styles.advertisementImge}
          source={{ uri: this.changeImageUrl2Https(selectedAds.image) }}
          resizeMode={'cover'}
          onError={error => this.handleAdFailedToLoad(error)}
        />
      </TouchableOpacity>
    ) : null;
  }

  renderImage() {
    if (this.props.qType == Q_TYPES.L) {
      return (<Image source={require('../Assets/tina-question-2.png')} style={{ width: scale(550), height: verticalScale(230), resizeMode: 'contain' }} />)
    } else if (this.props.qType == Q_TYPES.O) {
      return (<Image source={require('../Assets/tina-question-3.png')} style={{ width: scale(500), height: verticalScale(220), resizeMode: 'contain' }} />)
    } else if (this.props.qType == Q_TYPES.P) {
      return (<Image source={require('../Assets/tina-question.png')} style={{ width: scale(500), height: verticalScale(220), resizeMode: 'contain' }} />)
    } else if (this.props.qType == Q_TYPES.I) {
      return (<Image source={require('../Assets/tina-question-2.png')} style={{ width: scale(550), height: verticalScale(230), resizeMode: 'contain' }} />)
    } else if (this.props.qType == Q_TYPES.A) {
      return (<Image source={require('../Assets/tina-question-2.png')} style={{ width: scale(550), height: verticalScale(230), resizeMode: 'contain' }} />)
    }
  }

  handleBackk = (type, info) => {
    // console.log("###############################################");
    // const id = this.state.idyy;
    // console.log("########## idyy ############");
    // console.log(this.props.question.questions);
    // console.log("########## le graaal ############");
    // console.log(info);
    // const { qinfo, qType, questionActions } = this.props;
    // console.log("########## le diamand ############");
    // console.log(this.props.question.questions[this.props.question.questions.length - 1]);
    // Actions.questionnaire({ qType: qType, qinfo: this.props.question.questions[this.props.question.questions.length - 1] })

    Actions.pop()
  }
  render() {
    const { qinfo, auth } = this.props;
    const { info } = qinfo;
    const { selectedAds } = this.state;
    const credential = (auth && auth.credential) || null;
    const _user = (credential && auth.credential._user) || null;
    const isPaidUser = (_user && _user.paid) || false;



    console.log('===== selectedAds: ', selectedAds);
    console.log("QUESTIONNAIR!", qinfo['title']);
    return (
      <View style={{ flex: 1 }}>

        <View style={styles.mainContainer}>
          <StatusBar barstyle="light-content" backgroundColor={colors[this.props.qType][0]} />
          <View style={styles.headerContainer}>
            <LinearGradient
              start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
              colors={colors[this.props.qType]}
              style={{ flex: 0.9 }}>

              <View style={{ flex: 1, flexDirection: "column" }}>

                <View style={{
                  flexDirection: 'row',
                  padding: 20 * em,
                  justifyContent: 'flex-end',
                  alignItems: 'center'
                }}>
                  <View style={{ flex: 1, paddingLeft: 50 * em, alignItems: 'center' }}>
                    <Image source={require("../Assets/tina_header.png")} style={{ height: 30 * em, width: 71 * em }} resizeMode={"cover"} />
                  </View>
                  <MenuBtn image={"close"} onPress={this.handleClose.bind(this)} />

                </View>

                <View style={{ flex: 1 }}>
                  <View style={styles.absolute}>
                    <View style={{ position: 'absolute', right: 30 * em, bottom: 100 * em }}>
                      <RectangleImage image={"T1"} size={33 * em} />
                    </View>

                    <View style={{ position: 'absolute', left: 30 * em, bottom: 150 * em }}>
                      <RectangleImage image={"T2"} size={25 * em} />
                    </View>

                    <View style={{ position: 'absolute', right: 80 * em, top: 60 * em }}>
                      <RectangleImage image={"T3"} size={17 * em} />
                    </View>
                  </View>

                  <View style={styles.absolute, { flex: 1, alignItems: "center", flexDirection: "column-reverse", padding: 37 * em }}>
                    {this.renderImage()}
                  </View>
                </View>
              </View>
            </LinearGradient>
          </View>

          <View style={styles.contentContainer}>
            <Image source={require('../Assets/questionair_split.png')} style={{ width: WIDTH, height: WIDTH * 0.4 }} resizeMode={'stretch'} />


            {/* back button
            {this.state.BackBtn == true ?
              <TouchableOpacity style={styles.ButtonWrapper} elevation={20} onPress={this.handleGoBack}>
                <Back width={15 * em} height={15 * em} />
              </TouchableOpacity> : <></>} */}

            <View style={styles.contentWrapper}>
              {this.props.b == true ?
                <TouchableOpacity style={{ left: 24 * em, bottom: 40 * hm, zIndex: 7 }}
                  onPress={() => this.handleBackk(this.props.qtype, qinfo)}>
                  <View style={{
                    backgroundColor: "#FFF",
                    width: 39 * em, height: 39 * em,
                    borderRadius: 14 * em,
                    elevation: 5,
                    shadowColor: '#254D56',
                    shadowOffset: {
                      width: 0,
                      height: 12 * em,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 25 * em,
                    alignItems: "center",
                    justifyContent: "center"
                  }} >
                    <Back width={15 * em} height={13 * em} />
                    {/* <View style={{ position: 'absolute', left: 10 * em, top: 12 * em, zIndex: 7 }}><Back width={15 * em} height={13 * em} /></View> */}

                  </View>

                </TouchableOpacity> : <></>}
              <View>
                <Text style={styles.questionText}>
                  {/* .substring(0, this.props.qinfo.title.length - 1) */}
                  {this.props.qinfo.title}
                </Text>

                {info != null ? (
                  <View style={{ position: 'absolute', right: 138 * em, top: 55 * em }}>
                    <Info width={11 * em} height={11 * em} color={colors[this.props.qType][0]} />
                  </View>) : null}



              </View>

              <View style={{ flex: 1, flexDirection: "column-reverse" }}>
                <Cat qType={this.props.qType} ques={qinfo['qid']} />

                {/* <View style={styles.progressWrapper}>

                  <LinearGradient
                    start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                    colors={colors[this.props.qType]}
                    style={{width: Math.random() * WIDTH, height: 20*em}}>
                  </LinearGradient>

                </View> */}

                <View style={styles.answerWrapper}>
                  <TouchableOpacity style={StyleSheet.flatten([styles.ActionButtion, { flex: 1 }])} onPress={this.handleAnswerClick.bind(this, this.ANSWER_TYPE_YES)}>
                    <Text style={StyleSheet.flatten([styles.answerText, { color: colors[this.props.qType][0] }])}>Oui</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={StyleSheet.flatten([styles.ActionButtion, { flex: 1, marginLeft: 15 * em }])} onPress={this.handleAnswerClick.bind(this, this.ANSWER_TYPE_NO)}>
                    <Text style={StyleSheet.flatten([styles.answerText, { color: colors[this.props.qType][0] }])}>Non</Text>
                  </TouchableOpacity>
                </View>

                <View styles={{ backgroundColor: "#fff" }}>
                  <TouchableOpacity style={styles.ActionButtionNoShadow} onPress={this.handleAnswerClick.bind(this, this.ANSWER_TYPE_DUNNO)}>
                    <Text style={styles.dunnoText}>Je ne sais pas</Text>
                  </TouchableOpacity>

                </View>

                {info != null ? (
                  <TouchableOpacity style={styles.infoWrapper} onPress={this.handleGoInfoWindow.bind(this)}>
                    <Info width={12 * em} height={12 * em} color={colors[this.props.qType][0]} />
                    <Text style={StyleSheet.flatten([styles.infoText, { color: colors[this.props.qType][0] }])}> +info</Text>
                  </TouchableOpacity>) : null
                }
              </View>

            </View>

          </View>
        </View>

        {this.renderInfoModal()}

        {this.renderEvaluationModal()}

        {!isPaidUser && this.renderAdvertisements()}
        {!isPaidUser && <ReactInterval timeout={5000} enabled={true}
          callback={() => this.setAdvertisements()} />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f6f5fa',
    flexDirection: 'column',
  },

  headerContainer: {
    flex: 1
  },

  contentContainer: {
    flex: 1,
    marginTop: -125 * em,
    flexDirection: "column"
  },

  contentWrapper: {
    flex: 1,
    flexDirection: "column",
    marginTop: -80 * em
  },

  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  ButtonWrapper: {
    overflow: 'hidden',
    borderRadius: 15 * em,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    width: 40 * em,
    height: 40 * em,
    justifyContent: 'center',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 15,
    position: "absolute",
    left: WIDTH * 48 / 750,
    top: WIDTH * 0.4 * 50 / 300
  },

  ActionButtion: {
    overflow: 'hidden',
    borderRadius: 15 * em,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    height: 50 * em,
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
      },
      android: {
        elevation: 5,
      }
    }),

  },


  ActionButtionNoShadow: {
    overflow: 'hidden',
    borderRadius: 15 * em,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    height: 50 * em,
    justifyContent: 'center',

    marginLeft: 20 * em,
    marginRight: 20 * em,
    zIndex: -1
  },

  infoWrapper: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12 * em
  },

  infoText: {
    fontSize: 12 * em,
    fontFamily: "OpenSans-Regular",
  },

  dunnoText: {
    color: "#908ea6",
    fontSize: 14 * em,
    fontFamily: "OpenSans-SemiBold"
  },

  answerWrapper: {
    paddingLeft: 20 * em,
    paddingRight: 20 * em,
    paddingBottom: 20 * em,
    paddingTop: 15 * em,
    flexDirection: "row",
    zIndex: -1
  },

  answerText: {
    fontSize: 14 * em,
    fontFamily: "OpenSans-SemiBold"
  },

  progressWrapper: {
    width: WIDTH,
    height: 20 * em,
    backgroundColor: "#e1e0e5"
  },

  questionText: {
    paddingLeft: 50 * em,
    paddingRight: 50 * em,
    fontSize: 18 * em,
    color: "#251b4d",
    textAlign: "center",
    fontFamily: "Merriweather-Black",
    paddingTop: 20 * em,
    lineHeight: 35 * em
  },
  advertisementImge: {
    width: '100%', //370,
    height: 50
  }
});

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
  mapDispatchToProps
)(Questionnaire);
