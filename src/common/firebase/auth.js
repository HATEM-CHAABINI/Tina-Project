import firebase from '@react-native-firebase/app';

export const AUTH_PROVIDER = 'password';

export async function loginInWithEmailPassword({email, password}) {
  try {
    console.log('===== signInWithEmailAndPassword: ', email, password);
    const firebaseUserCredential = await firebase.auth()
      .signInWithEmailAndPassword(email, password);
    console.log('===== signInWithEmailAndPassword: credential: ', firebaseUserCredential);
    return { credential: firebaseUserCredential, error: null, errorType: null};
  } catch (e) {
    console.log('====== error: ', e);
    var errorMessage = 'Firebase auth failed.';
    var errorType = e.code;
    switch (e.code) {
      case 'auth/invalid-email':
        errorMessage = "S'il vous plaît, mettez une adresse email valide.";
        break;
      case 'auth/user-disabled':
        errorMessage = 'Ce compte a été désactivé.';
        break;
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        errorMessage = "Utilisateur inexistent ou mot de passe incorrect.";
        break;
      case 'auth/internal-error':
        errorMessage = "Une erreur interne s'est produite, veuillez réessayer."
        break;
      default:
        break;
    }
    return {credential: null, error: errorMessage, errorType };
  }
}

export async function attemptSignInWithPhone(phoneNumber) {
  var confirmation = null;
  var error = null;
  try {
    confirmation = await firebase.auth().signInWithPhoneNumber(phoneNumber);
    console.log('===== confirmation: ', confirmation);
  } catch (e) {
    console.log('===== error: ', e);
    error = "Échec de la connexion avec le numéro de téléphone.";
    switch (e.code) {
      case 'auth/invalid-phone-number':
          error = "Veuillez entrer un numéro de téléphone valide.";
        break;
      case 'auth/too-many-requests':
          error = "Nous avons bloqué toutes les demandes de cet appareil en raison d'une activité inhabituelle. Réessayez plus tard.";
        break;
      default:
        console.error(e);
        break;
    }
  } finally {
    console.log('===== finally')
  }
  return {confirmation, error};
}

export async function resetPasswordWithEmail(email) {
  try {
    const result = await firebase.auth().sendPasswordResetEmail(email);
    console.log('==== resetPasswordWithEmail: result: ', result);
    return {token: result, error: null, errorMessage: null};
  } catch (error) {
    console.log('==== resetPasswordWithEmail: ', resetPasswordWithEmail);
    var errorMessage = 'Échec de la réinitialisation du mot de passe.';
    switch(error.code) {
      case 'auth/invalid-email':
        errorMessage = 'Vous avez entré un e-mail non valide. Veuillez saisir un e-mail au format correct.';
        break;
      case 'auth/user-not-found':
        errorMessage = "Impossible de trouver l'utilisateur.";
        break;

    }
    return {token: null, errorType: error.code, errorMessage};
  }
}

export async function logout(){
  try{
    return firebase.auth().signOut().then(() => console.log('User signed out!'));
  }catch (error){
    console.log("===== logout error", error);
  } 
}

export async function updateUserEmail(email){
  try{
    //let credential = await firebase.auth().signInWithEmailAndPassword(email, password);
    await firebase.auth().currentUser.updateEmail(email);
    return true;
  }catch(error){
    console.log("===== update user info error", error);
    return false;
  }
}