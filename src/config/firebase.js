import App from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAF53LnK16LZnnSech21gArFUHUABPpNpU",
  authDomain: "library-app-5dc65.firebaseapp.com",
  databaseURL: "https://library-app-5dc65.firebaseio.com",
  projectId: "library-app-5dc65",
  storageBucket: "library-app-5dc65.appspot.com",
  messagingSenderId: "12259679673",
  appId: "1:12259679673:web:38f2d078c70a55e2136a68",
};

class Firebase {
  constructor() {
    App.initializeApp(firebaseConfig);
    this.auth = App.auth();
    this.db = App.firestore();
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async register(firstName, lastName, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: firstName + " " + lastName,
    });
  }

  logout() {
    return this.auth.signOut();
  }

  getUser() {
    return this.auth.currentUser();
  }

  authChange(user) {
    return this.auth.onAuthStateChanged(user);
  }
}

export default new Firebase();
