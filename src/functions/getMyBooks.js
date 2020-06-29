import firebase from "../config/firebase";

const getBooks = async (setBooks, user) => {
  await firebase.db
    .collection("books")
    .where("user", "==", user)
    .get()
    .then(function (snapShots) {
      setBooks({
        items: snapShots.docs.map((doc) => {
          return {
            id: doc.id,
            data: doc.data(),
          };
        }),
      });
    });
};

export default getBooks;
