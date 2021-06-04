import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import {resetPasswordWithEmail} from '../firebase/auth';

const USER_TABLE_NAME = 'users';
const MAPS_TABLE_NAME = 'maps';
const DEPANNEUR_TABLE_NAME = 'stores';
const HISTORY_TABLE_NAME = 'histories';
const FAQS_TABLE_NAME = 'faqs';
const SETTINGS_TABLE_NAME = 'settings';
const ABOUT_TABLE_NAME = 'about';
const ADMOB_TABLE_NAME = 'admob';
const ADVERTISEMENTS_TABLE_NAME = 'advertisements';
const PAYMENTES_TABLE_NAME = 'payments'

export async function createAccount({credential, signupInfo}) {
  const { firstname, lastname, zipcode, lat, lng, password } = signupInfo;
  const user = credential.user._user;
  const { uid } = user;
  if (uid) {
    var userData = {
      uid,
      actived: true,
      signedUp: firebase.database.ServerValue.TIMESTAMP,
      lastLoggedIn: firebase.database.ServerValue.TIMESTAMP,
      firstname,
      lastname,
      zipcode,
      password,
      lat,
      lng,
      receiveNoti: true,
      ...user
    };
    try {
      return firebase.database().ref(`${USER_TABLE_NAME}/${uid}`)
        .set(userData).then(() => {
          return userData;
        });
    } catch (e) {
      console.log('==== error: ', e)
      return null
    }
  }
  return null;
}

export async function getUserInfo(uid) {
  return firebase.database()
    .ref(`${USER_TABLE_NAME}/${uid}`)
    .once('value')
    .then((snapshot) => {
      if (snapshot.exists) return snapshot.val();
      else return null;
    }
  );
}

export async function getCurrentUserInfo() {
  const uid = firebase.auth().currentUser.uid;
  return getUserInfo(uid)
}

export async function updateUserInfo(data){
  const uid = firebase.auth().currentUser.uid;
  if (uid) {
    return firebase.database().ref(`${USER_TABLE_NAME}/${uid}`)
      .update(data).then(() => {
        return uid;
    });
  }
  return null;
}

export async function createDummyJSON(){
  let maps = {
      "ordinateur":{
        "root":{
          "qid":"-MB4fBwDHDo37X5UIaKn",
          "title":"Is your computer Windows?",
          "yid":"-MB4fLmbHFnsrgAoTOgD",
          "nid":"-MB4fPazOcmCyTsISq5J",
          "did":"-MB4fS_ab6Tw0f5_ySOW"
        },
        "-MB4fLmbHFnsrgAoTOgD":{
        "qid":"-MB4fLmbHFnsrgAoTOgD",
        "title":"Operating system is Windows7?",
        "yid":"-MB4gxTDW3gXOwPXYmyF",
        "nid":"-MB4gyUif5B_NG4qLurg",
        "did":"-MB4gzZqV1vIOpzu8cB4"
        },
        "-MB4gxTDW3gXOwPXYmyF":{
          "qid":"-MB4gxTDW3gXOwPXYmyF",
          "title":"Do you have antivirus program installed?",
          "yid":"-MB4hmTUuOq19lLND0KT",
          "nid":"-MB4hnbbZZ-NEuGUhtQO",
          "did":"-MB4hoiEYQPVDxHYu7Yc"
        },
        "-MB4hmTUuOq19lLND0KT":{
          "qid":"-MB4hmTUuOq19lLND0KT",
          "title":"Is the real-time check turned on?",
          "yid":"-MB4iUoqLRgCIB7MM2-M",
          "nid":"-MB4iVnD6bba4d_TgoBQ",
          "did":"-MB4iX8DLVKzV4PsMxRY"
        },
        "-MB4iUoqLRgCIB7MM2-M":{
          "solution":"Please turn off the real-time check and start the program as you want."
        },
        "-MB4iVnD6bba4d_TgoBQ":{
          "solution":""
        },
        "-MB4iX8DLVKzV4PsMxRY":{
          "solution":""
        },
        "-MB4hnbbZZ-NEuGUhtQO":{
          "solution":"Please try to install anti-virus program."
        },
        "-MB4hoiEYQPVDxHYu7Yc":{
          "solution":""
        },
        "-MB4gyUif5B_NG4qLurg":{
          "solution":"Hi, this is dummy solution for testing. Thanks."
        },
        "-MB4gzZqV1vIOpzu8cB4":{
          "solution":"Hi, this is the solution you are looking for."
        },
        "-MB4fPazOcmCyTsISq5J":{
          "qid":"-MB4fPazOcmCyTsISq5J",
          "title":"Is your computer MAC OS?",
          "yid":"-MB6jxDzmRlV-Epcunj2",
          "nid":"-MB6li8sSGdltuZvTljp",
          "did":"-MB6k-5bngaA3a4FST9U"
        },
        "-MB6jxDzmRlV-Epcunj2":{
          "solution":"Please try to restart your PC. This way you can reset all the running process and make it working!"
        },
        "-MB6li8sSGdltuZvTljp":{
          "qid":"-MB6li8sSGdltuZvTljp",
          "title":"Is your computer Ubuntu?",
          "yid":"-MB6kpnFcw9EHOOt-IF9",
          "nid":"-MB6kr3cuPL9TwxodmR7",
          "did":"-MB6ksTkhQz6AWVsaic9",
          "info":{
            "title":"Ubuntu Operating System",
            "content":"Ubuntu is linux based operating system, which most of developers are using. You can just use sudo to install apps.",
            "image":"http://anr.gwl.mybluehost.me/depanneur_fibrotech.png"
          }
        },
        "-MB6kpnFcw9EHOOt-IF9":{
          "solution":"Please try to using the 'sudo apt install' command and see if everything works."
        },
        "-MB6kr3cuPL9TwxodmR7":{
          "solution":""
        },
        "-MB6ksTkhQz6AWVsaic9":{
          "solution":""
        },
        "-MB6k-5bngaA3a4FST9U":{
          "solution":""
        },
        "-MB4fS_ab6Tw0f5_ySOW":{
          "solution":""
        }
      }
  }

  try {
    return firebase.database().ref(`${MAPS_TABLE_NAME}`)
      .set(maps).then(() => {
        return null;
      });
  } catch (e) {
    return e;
  }
}

export async function createUserDummyJSON(){
  let users = {
    "-MBC5lHoTRfthA545U7Y":{
      "email":"alex@gmail.com",
      "firstname":"Alex",
      "lastname":"Hong",
      "zipcode":"391029"
    },
    "-MBC6RCGSgLNcGJglgSi":{
      "email":"james@gmail.com",
      "firstname":"James",
      "lastname":"Bruto",
      "zipcode":"385043"
    }
  }

  try {
    return firebase.database().ref(`${USER_TABLE_NAME}`)
      .set(users).then(() => {
        return null;
      });
  } catch (e) {
    return e;
  }
}

export async function createStoresDummyJSON(){
  let stores = {
    "-MBL0z2CURWQKV58VvCw":{
      "id":"-MBL0z2CURWQKV58VvCw",
      "title":"Fibrotech",
      "phone":"00 00 00 00 01",
      "email":"fibrotech@store.com",
      "latitude":24.0001,
      "longitude":10.0001,
      "address":"11 rue de preside",
      "image":"http://anr.gwl.mybluehost.me/depanneur_fibrotech.png"
    },
    "-MBL11apGxIpMSFXuS6r":{
      "id":"-MBL11apGxIpMSFXuS6r",
      "title":"igeek",
      "phone":"00 00 00 00 02",
      "email":"igeek@store.com",
      "latitude":25.0001,
      "longitude":11.0001,
      "address":"12 rue de preside",
      "image":"http://anr.gwl.mybluehost.me/depanneur_igeek.png"
    },
    "-MBL15TxRmYxAUNweJXN":{
      "id":"-MBL15TxRmYxAUNweJXN",
      "title":"Cultura",
      "phone":"00 00 00 00 03",
      "email":"Cultura@store.com",
      "latitude":26.0001,
      "longitude":12.0001,
      "address":"13 rue de preside",
      "image":"http://anr.gwl.mybluehost.me/depanneur_cultura.png"
    },
    "-MBL19n4cA4AuZz-O5QJ":{
      "id":"-MBL19n4cA4AuZz-O5QJ",
      "title":"fnac",
      "phone":"00 00 00 00 04",
      "email":"fnac@store.com",
      "latitude":27.0001,
      "longitude":13.0001,
      "address":"14 rue de preside",
      "image":"http://anr.gwl.mybluehost.me/depanneur_fnac.png"
    }
  }

  try {
    return firebase.database().ref(`${DEPANNEUR_TABLE_NAME}`)
      .set(stores).then(() => {
        return null;
      });
  } catch (e) {
    return e;
  }
}

export async function createFAQDummyJSON(){
  let faqs = {
    "-MBL0z2CURWQKV58VvCw":{
      "displayOrder":1,
      "title":"Qu",
      "description":"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam noumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eoset accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et doloreundefined",
      "answers":{
        "-MBPd3aLhT3Z0SxJ7NA_":{
          "title":"Lorem ipsumundefined1",
          "description":"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam noumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eoset accusam et justo duo dolores et ea rebum."
        },
        "-MBPdCmTmuFVm2hOHTEA":{
          "title":"Lorem ipsumundefined2",
          "description":"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam noumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eoset accusam et justo duo dolores et ea rebum."
        },
        "-MBPdIjMENvUolMEI4OB":{
          "title":"Lorem ipsumundefined3",
          "description":"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam noumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eoset accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et doloreundefined"
        },
      }
    },
    "-MBPWwEiG2kHgmO11zQp":{
      "displayOrder":2,
      "title":"Question 2",
      "description":"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam noumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eoset accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et doloreundefined",
      "answers":{
        "-MBPdXXNahNi3Xwssag2":{
          "title":"Lorem ipsumundefined1",
          "description":"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam noumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eoset accusam et justo duo dolores et ea rebum."
        },
        "-MBPdZR7wJbj9s7qSmIS":{
          "title":"Lorem ipsumundefined2",
          "description":"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam noumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eoset accusam et justo duo dolores et ea rebum."
        },
        "-MBPd_XMr6bLvO8hh1rh":{
          "title":"Lorem ipsumundefined3",
          "description":"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam noumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eoset accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et doloreundefined"
        },
      }
    },
    "-MBPX-W534yv4bn7oB3D":{
      "displayOrder":3,
      "title":"Question 3",
      "description":"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam noumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eoset accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et doloreundefined",
      "answers":{
        "-MBPdbJVBzLGg-ce5n0x":{
          "title":"Lorem ipsumundefined1",
          "description":"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam noumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eoset accusam et justo duo dolores et ea rebum."
        },
        "-MBPdCmTmuFVm2hOHTEA":{
          "title":"Lorem ipsumundefined2",
          "description":"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam noumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eoset accusam et justo duo dolores et ea rebum."
        },
        "-MBPdeWVEVZKc5KnhBmk":{
          "title":"Lorem ipsumundefined3",
          "description":"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam noumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eoset accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et doloreundefined"
        },
      }
    },
  }

  try {
    return firebase.database().ref(`${FAQS_TABLE_NAME}`)
      .set(faqs).then(() => {
        return null;
      });
  } catch (e) {
    return e;
  }
}

export async function createAboutusDummyJSON(){
  let aboutus = {
    "-MBRQOSzqyoc1zwxLald":{
      "displayOrder":1,
      "title":"À propos de Tina",
      "url":"http://www.tina.com/about"
    },
    "-MBRQdkTsqd39fLhIhzA":{
      "displayOrder":2,
      "title":"Conditions générales d'utilisation",
      "url":"http://www.tina.com/terms"
    },
    "-MBRQf_jE0743t4G647T":{
      "displayOrder":3,
      "title":"RGPD: autorisation de la conservation des données",
      "url":"http://www.tina.com/conservation"
    }
  }

  try {
    return firebase.database().ref(`${ABOUT_TABLE_NAME}`)
      .set(aboutus).then(() => {
        return null;
      });
  } catch (e) {
    return e;
  }
}

export async function createSettingDummyJSON(){
  let settings = {
    "contact_us":{
      "url":"http://www.tina.com/contact"
    }
  }

  try {
    return firebase.database().ref(`${SETTINGS_TABLE_NAME}`)
      .set(settings).then(() => {
        return null;
      });
  } catch (e) {
    return e;
  }
}
export async function getQuestionByCategory(category){
  return firebase.database()
    .ref(`${MAPS_TABLE_NAME}/${category}`)
    .once('value')
        .then((snapshot) => {
      if (snapshot.exists) {
        var items = [];
        snapshot.forEach((child) => {


        items.push({
          id: child.val().id,
          did: child.val().did,
          nid: child.val().nid,
          qid: child.val().qid,
          title: child.val().title,
          solution:child.val().solution,
          yid: child.val().yid });    });
          return items;

      }
      else {return null;}
    });
}

export async function getQuestionByCategoryAndId(category, id){
  return firebase.database()
    .ref(`${MAPS_TABLE_NAME}/${category}/${id}`)
    .once('value')
    .then((snapshot) => {
      if (snapshot.exists) return snapshot.val();
      else return null;
    });
}

export async function checkUserEmail(email){
  return await new Promise((resolve, reject) => {
    // const timerId = setTimeout(() => { reject(new Error('DB: Timeout')); }, 5000);
    firebase.database()
      .ref(`${USER_TABLE_NAME}`)
      .orderByChild("email")
      .startAt(email)
      .endAt(email)
      .on('value', (snap) => {
        items = [];
        snap.forEach((child) => {
          items.push(child);
        });
        // clearTimeout(timerId);
        resolve(items.length > 0);
      })
  });
}

export async function getAllStores(){
  var items = [];
  return firebase.database().ref(`${DEPANNEUR_TABLE_NAME}`)
    .once('value')
    .then((snapshot) => {
      if (snapshot.exists) {
        items = [];
        snapshot.forEach((child) => {
          items.push({...child.val(), id:child.key});
        });
        return items;
      } else {
        throw new Error('Stores table does not exist')
      }
  });
}

export async function addTinaHistory({type, questions, solution}){
  try{
    const uid = firebase.auth().currentUser.uid;
    if (uid) {
      let data = {uid, type, questions, solution, created: firebase.database.ServerValue.TIMESTAMP}
      firebase.database().ref(`${HISTORY_TABLE_NAME}`).push(data)
    }
  }catch(e){
    console.log("======= error", e);
  }
  return null;
}
export async function getAllTheHistoryList(){
  return await new Promise((resolve, reject) => {
    // const timerId = setTimeout(() => { reject(new Error('DB: Timeout')); }, 5000);
    var items = [];
   
      firebase.database()
        .ref(`${HISTORY_TABLE_NAME}`)
        .on('value', (snap) => {
          items = [];
          snap.forEach((child) => {
            // We only get the history that solution found ones.
            if (child.val().solution != ""){
              items.push({...child.val(), id:child.key});
            }
          });
          // clearTimeout(timerId);
          resolve(items);
        })
    
  });
}


export async function getAllHistoryList(){
  return await new Promise((resolve, reject) => {
    // const timerId = setTimeout(() => { reject(new Error('DB: Timeout')); }, 5000);
    const uid = firebase.auth().currentUser.uid;
    var items = [];
    if (uid){
      firebase.database()
        .ref(`${HISTORY_TABLE_NAME}`)
        .orderByChild("uid")
        .startAt(uid)
        .endAt(uid)
        .on('value', (snap) => {
          items = [];
          snap.forEach((child) => {
            // We only get the history that solution found ones.
            if (child.val().solution != ""){
              items.push({...child.val(), id:child.key});
            }
          });
          // clearTimeout(timerId);
          resolve(items);
        })
    }else{
      reject(null)
    }
  });
}

export async function getAllFAQsList(){
  var items = [];
  return firebase.database().ref(`${FAQS_TABLE_NAME}`)
    .once('value')
    .then((snapshot) => {
    if (snapshot.exists) {
      items = [];
      snapshot.forEach((child) => {
        items.push({...child.val(), id:child.key});
      });
      //console.log("===== Items", items)
      return items;
    } else {
      throw new Error('FAQs table does not exist')
    }
  });
}

export async function getAllAboutList(){
  var items = [];

  return firebase.database().ref(`${ABOUT_TABLE_NAME}`)
    .orderByChild("displayOrder")
    .once('value')
    .then((snapshot) => {
    if (snapshot.exists) {
      items = [];
      snapshot.forEach((child) => {
        items.push({...child.val(), id:child.key});
      });
      //console.log("===== Items", items)
      return items;
    } else {
      throw new Error('About table does not exist')
    }
  });
}

export async function getSettingsInfo(){
  return firebase.database().ref(`${SETTINGS_TABLE_NAME}`)
    .once('value')
    .then((snapshot) => {
    if (snapshot.exists) {
      return snapshot.val()
    } else {
      throw new Error('Settings table does not exist')
    }
  });
}

export async function getAdmob() {
  return firebase.database().ref(`${ADMOB_TABLE_NAME}`)
    .once('value')
    .then((snapshot) => {
      if (snapshot.exists) {
        return snapshot.val()
      } else {
        throw new Error('Admob table does not exist')
      }
    });
}

export async function getAllAdvertisements() {
  return firebase.database().ref(`${ADVERTISEMENTS_TABLE_NAME}`)
    .once('value')
    .then((snapshot) => {
      if (snapshot.exists) {
        return snapshot.val()
      } else {
        throw new Error('Advertisements table does not exist')
      }
    });
}

export async function getAllPayments() {
  return firebase.database().ref(`${PAYMENTES_TABLE_NAME}`)
    .once('value')
    .then((snapshot) => {
      if (snapshot.exists) {
        return snapshot.val()
      } else {
        throw new Error('Advertisements table does not exist')
      }
    });
}

export async function passwordReset(email) {
  return resetPasswordWithEmail(email);
}
