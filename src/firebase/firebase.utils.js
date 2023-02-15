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

  export const createUserProfileDocument = async (userAuth , additionalData) => {
    if (!userAuth) return; 

    const userRef = firestore.doc(`users/${userAuth.uid}`);


    const snapShot = await userRef.get();

    if (!snapShot.exists) {
      const  { displayName , email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set( {
          createdAt,
          displayName,
          email,
          ...additionalData
        })
         
      } catch (error) {
         console.log('error creating user', error.message)
      }
    } 
    return userRef;   
  };

  firebase.initializeApp(Config);

  export const addCollectionAndDocuments = async (collectionKey , objectsToAdd ) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach( obj => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef , obj);
    });
    return await batch.commit();
  };

  export  const convertCollectionsSnapshopToMap = (collections) => {
    const transformedCollection = collections.docs.map( doc => {
      const { title , items } = doc.data();
      return{
        routeName : encodeURI(title.toLowerCase()),
        id:doc.id,
        items,
        title
      }
    });
     return  transformedCollection.reduce((accumulator , collection ) => {
        accumulator[collection.title.toLowerCase()] = collection;     
        return accumulator;
    } , {});
  };

  export const getCurrentUser = () => {
    return new Promise((resolve , reject) => {
      const unsubscribe = auth.onAuthStateChanged(userAuth => {
        unsubscribe();
        resolve(userAuth);
      },reject)
    });
  }

  export const auth = firebase.auth();

  export const firestore = firebase.firestore();

  export  const googleprovider = new firebase.auth.GoogleAuthProvider();
   googleprovider.setCustomParameters({ prompt : 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup( googleprovider );

  export default firebase;