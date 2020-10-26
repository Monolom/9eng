import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyD9ytFW5Mhe2bAZaYQRtJPRrFaHvVMn7LU",
    authDomain: "eng-dev-de51e.firebaseapp.com",
    databaseURL: "https://eng-dev-de51e.firebaseio.com",
    projectId: "eng-dev-de51e",
    storageBucket: "eng-dev-de51e.appspot.com",
    messagingSenderId: "844765440012",
    appId: "1:844765440012:web:f527ae909569319f8fe629",
    measurementId: "G-39FQN76CJL"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };