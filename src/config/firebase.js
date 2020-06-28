import App from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfPy4SE3z2MDy8HC6n7FEufj0JAnlEYrw",
  authDomain: "library-51347.firebaseapp.com",
  databaseURL: "https://library-51347.firebaseio.com",
  projectId: "library-51347",
  storageBucket: "library-51347.appspot.com",
  messagingSenderId: "312544816686",
  appId: "1:312544816686:web:4fa2d8a865d6bc0a5bf9bf",
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

  async userRegister(firstName, lastName, email, password, role) {
    const docRef = await this.db.collection("users").add({
      first: firstName,
      last: lastName,
      email: email,
      role: role,
    });
    console.log("Document written with ID: ", docRef.id);
    return await this.auth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  getUser() {
    const user = this.auth.currentUser();
    console.log(user);
  }

  authChange(user) {
    return this.auth.onAuthStateChanged(user);
  }

  getRole() {
    return this.db.collection("users");
  }
}

export default new Firebase();
