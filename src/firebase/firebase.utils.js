import firebase from 'firebase/compat/app';

import 'firebase/compat/firestore';

import 'firebase/compat/auth';

const Config = {
    apiKey: "AIzaSyD0ARHoLE2r_X11p6f_hDhc-9KzheXXUds",
    authDomain: "crwn-clothing-8216a.firebaseapp.com",
    projectId: "crwn-clothing-8216a",
    storageBucket: "crwn-clothing-8216a.appspot.com",
    messagingSenderId: "1049846490345",
    appId: "1:1049846490345:web:1c37cb037c528548953c78",
    measurementId: "G-XBEZF6DBZD"
  };

  firebase.initializeApp(Config);

  export const auth = firebase.auth();

  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();

  provider.setCustomParameters({ prompt : 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup( provider );

  export default firebase;