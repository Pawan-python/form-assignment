import firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyBz2P5OpqCC7BK3KIgAllmew_tfqihGHXg",
    authDomain: "myredux-form.firebaseapp.com",
    projectId: "myredux-form",
    storageBucket: "myredux-form.appspot.com",
    messagingSenderId: "943920431316",
    appId: "1:943920431316:web:bbd21c7d12c526e0bffb41"
  };
const  fire = firebase.initializeApp(firebaseConfig);
export default fire;