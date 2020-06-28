import firebase from "../config/firebase";

const getRole = async (user, setUser) => {
  await firebase.db
    .collection("users")
    .where("email", "==", user.email)
    .get()
    .then((snapShots) => {
      setUser(snapShots.docs[0].data());
    })
    .catch(function (error) {
      console.log("Error getting role: ", error);
    });
};

export default getRole;
