import * as firebase from "firebase";

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_Id,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };

// database.ref('expenses').push({
//   description: 'Water bill', amount: 27000, createdAt: -21000
// });
// database.ref('expenses').push({
//   description: 'Electricity bill', amount: 45000, createdAt: 1000
// });
// database.ref('expenses').push({
//   description: 'Rent', amount: 80000, createdAt: -1000
// });

// database.ref("attr").remove()
// .then(()=> {
//   console.log("Remove succeeded.")
// })
// .catch((error)=> {
//   console.log("Remove failed: " + error.message)
// });

// database.ref().once('value')
// .then((snapshot)=>{
//   console.log(snapshot.val());
// })
// .catch((error)=>{
//   console.log('walo');
// })

// database.ref('expenses').on('value', (snapshot) =>{
//   const expenses = [];

//   snapshot.forEach((childSnapshot) => {
//     expenses.push({
//       id: childSnapshot.key,
//       ...childSnapshot.val()
//     })
//   })

//   console.log(expenses)
// });
