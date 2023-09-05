// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
// import {cityDb} from './temp/m-city-export';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdFZNJ7lvenQ1sS7sNwWNWXOPbzgips3Q",
  authDomain: "mcity-d8d2d.firebaseapp.com",
  projectId: "mcity-d8d2d",
  storageBucket: "mcity-d8d2d.appspot.com",
  messagingSenderId: "892513382464",
  appId: "1:892513382464:web:71540036f6b30e83d3efa5",
  measurementId: "G-QGYHH1MRRJ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const DB = firebase.firestore();
const matchesCollection = DB.collection('matches');
const playersCollection = DB.collection('players');
const promotionsCollection  = DB.collection('promotions');
const teamsCollection  = DB.collection('teams');
const positionsCollection  = DB.collection('positions');

// cityDb.matches.forEach((item) => {
//     matchesCollection.add(item)
// })

// cityDb.players.forEach(item =>{
//     playersCollection.add(item)
// })

// cityDb.positions.forEach(item =>{
//     positionsCollection.add(item)
// })

// cityDb.promotions.forEach(item =>{
//     promotionsCollection.add(item)
// })

// cityDb.teams.forEach(item =>{
//     teamsCollection.add(item)
// })



export {
    firebase,
    matchesCollection,
    playersCollection,
    positionsCollection,
    teamsCollection,
    promotionsCollection
}