import { PermissionsAndroid } from 'react-native';

export const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Autoriser "Tina" a acceder a votre position?',
        message:
          "Pour mieux vous aider, nous avons besoin d'utiliser la geolocalisation, ces donnees resteront strictement confidentielles.",
        buttonNeutral: "Demande moi plus tard",
        buttonNegative: "Annuler",
        buttonPositive: "D'accord"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the location");
      return true;
    } else {
      console.log("Location permission denied");
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};