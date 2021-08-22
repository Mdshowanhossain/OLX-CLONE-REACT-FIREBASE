import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBn-iIznaMcq4CtnAZHl3L9396_HC8yUBg",
  authDomain: "olx-clone-fe315.firebaseapp.com",
  projectId: "olx-clone-fe315",
  storageBucket: "olx-clone-fe315.appspot.com",
  messagingSenderId: "998546988317",
  appId: "1:998546988317:web:27e74d1d6a1127ac5795f4"
};



export default firebase.initializeApp(firebaseConfig);

// const firebaseConfig = {
//   apiKey: "AIzaSyBn-iIznaMcq4CtnAZHl3L9396_HC8yUBg",
//   authDomain: "olx-clone-fe315.firebaseapp.com",
//   projectId: "olx-clone-fe315",
//   storageBucket: "olx-clone-fe315.appspot.com",
//   messagingSenderId: "998546988317",
//   appId: "1:998546988317:web:27e74d1d6a1127ac5795f4"
// };


// const firebaseConfig = {
//   apiKey: "AIzaSyA5_IsMUu7hhghgq6p3-excItNggy36J4s",
//   authDomain: "olx-clone-dddd3.firebaseapp.com",
//   projectId: "olx-clone-dddd3",
//   storageBucket: "olx-clone-dddd3.appspot.com",
//   messagingSenderId: "26156682228",
//   appId: "1:26156682228:web:dd840e461f53850a7c87a1",
//   measurementId: "G-LPWSYFSWZ6",
// };