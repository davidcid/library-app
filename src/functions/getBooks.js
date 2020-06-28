import firebase from "../config/firebase";

const getBooks = async (setBooks) => {
  await firebase.db
    .collection("books")
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
  console.log("hey desde funcion");
};

export default getBooks;
