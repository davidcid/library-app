import App from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXeY6PE7aKV9jXAKRbO4e_N8sORovgWrE",
  authDomain: "libraryapp-5d238.firebaseapp.com",
  databaseURL: "https://libraryapp-5d238.firebaseio.com",
  projectId: "libraryapp-5d238",
  storageBucket: "libraryapp-5d238.appspot.com",
  messagingSenderId: "1096907759529",
  appId: "1:1096907759529:web:6d002ef4a4c7cb5c0deeb8",
};

class Firebase {
  constructor() {
    App.initializeApp(firebaseConfig);
    this.auth = App.auth();
    this.db = App.firestore();
  }
}

export default new Firebase();
