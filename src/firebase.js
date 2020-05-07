import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
  apiKey: 'AIzaSyCopTgXzQRiWxTuzigxUaX-pYUlReCMycc',
  authDomain: 'todolist-clone-3be36.firebaseapp.com',
  databaseURL: 'https://todolist-clone-3be36.firebaseio.com',
  projectId: 'todolist-clone-3be36',
  storageBucket: 'todolist-clone-3be36.appspot.com',
  messagingSenderId: '1096950431183',
  appId: '1:1096950431183:web:0e9fa4e5cad8ebcd8ce6ba',
});

export { firebaseConfig as firebase };
