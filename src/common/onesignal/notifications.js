
import OneSignal from 'react-native-onesignal';

export const postNotification = (contents, data, playerId, otherParameters) => {
  try {
    const ids = [playerId, ];
    console.log('======= postNotification : ', contents);
    OneSignal.postNotification(contents, data, ids, otherParameters);
  } catch (error) {
    console.log('======= error: ', error);
  }
};

export const TINA_NOTIFICATION_TYPES = {
  REGISTERED_FIRST: 'REGISTERED_FIRST',
  PASSED_QUIZ: 'PASSED_QUIZ',
  CONNECTED_CARD: 'CONNECTED_CARD',
  GAVE_FEEDBACK: 'GAVE_FEEDBACK'
};

export const postTestNotification = (userId) => {
  // Send push notification
  const testEmail = 'test@email.com';
  var contents = {
    'en': `You are registered firstly with your ${testEmail} account.`,
    'fr': `Vous vous êtes inscrit avec votre compte ${testEmail}.`
  }
  var message = {
    type: TINA_NOTIFICATION_TYPES.REGISTERED_FIRST
  };
  var otherParameters = {
    headings: {
      "en": "Welcome to Tina!",
      "fr": "Bienvenue sur l’application de Tina !"
    },
  }
  postNotification(
    contents,
    message,
    userId,
    otherParameters
  );
  console.log('==== sent test notification. userId: ', userId);
}

export const postARegisterNotification = (userId, email) => {
  var contents = {
    'en': `You are registered firstly with your ${email} account.`,
    'fr': `Vous vous êtes inscrit avec votre compte ${email}.`
  }
  var message = {
    type: TINA_NOTIFICATION_TYPES.REGISTERED_FIRST
  };
  var otherParameters = {
    headings: {
      "en": "Welcome to Tina!",
      "fr": "Bienvenue sur l’application de Tina !"
    },
  }
  postNotification(
    contents,
    message,
    userId,
    otherParameters
  );
  console.log('==== sent a register notification. userId: ', userId);
}

export const postAnswerResultNotification = (userId, question) => {
  var contents = {
    'en': `You have found an answer for your question: "${question}".`,
    'fr': `You have found an answer for your question: « ${question} » .`
  }
  var message = {
    type: TINA_NOTIFICATION_TYPES.PASSED_QUIZ
  };
  var otherParameters = {
    headings: {
      "en": "Survey",
      "fr": "Questionnarie"
    },
  }
  postNotification(
    contents,
    message,
    userId,
    otherParameters
  );
  console.log('==== sent a suvey notification. userId: ', userId);
}