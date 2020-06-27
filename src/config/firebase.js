import App from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

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

  async userRegister(firstName, lastName, email, password, role) {
    try {
      await this.auth.createUserWithEmailAndPassword(email, password);
      const docRef = await this.db.collection("users").add({
        first: firstName,
        last: lastName,
        email: email,
        role: role,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.log("Error creating user: ");
    }
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

  async bookRegister(title, description, author, year, user) {
    try {
      const docRef = await this.db.collection("books").add({
        title: title,
        description: description,
        author: author,
        year: year,
        user: user,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.log("Error creating book: ");
    }
  }
}

export default new Firebase();
