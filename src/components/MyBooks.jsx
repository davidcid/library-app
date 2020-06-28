import React, { useState, useEffect, useContext } from "react";
import { Button } from "antd";
import { AuthContext } from "../Auth";
import firebase from "../config/firebase";

const BooksList = ({ user }) => {
  const { currentUser } = useContext(AuthContext);
  const [myBooks, setMyBooks] = useState([]);
  const [editedBook, setEditedBook] = useState();

  useEffect(() => {
    const getBooks = async () => {
      await firebase.db
        .collection("books")
        .where("user", "==", user)
        .get()
        .then(function (snapShots) {
          setMyBooks({
            items: snapShots.docs.map((doc) => {
              return {
                id: doc.id,
                data: doc.data(),
              };
            }),
          });
        });
    };

    getBooks();
  }, []);

  const deleteBook = async (id) => {
    await firebase.db.collection("books").doc(id).delete();
    console.log(`The book ${id} has been deleted`);
  };

  if (currentUser != null) {
    return (
      <div>
        <h1>My books</h1>
        {myBooks.items && myBooks.items !== undefined ? (
          <ul>
            {myBooks.items.map((book, key) => (
              <li
                key={key}
                style={{ listStyle: "none", padding: "8px", fontSize: "16px" }}
              >
                <p
                  style={{
                    display: "inline-block",
                    minWidth: "250px",
                    marginRight: "20px",
                    textAlign: "right",
                  }}
                >
                  {book.data.title}
                </p>
                <Button
                  type="warning"
                  style={{
                    padding: "0px 5px",
                    margin: "0 5px",
                    minWidth: "55px",
                    backgroundColor: "#f2bf20",
                  }}
                  onClick={() => {
                    // getBook(book.id);
                  }}
                >
                  Edit
                </Button>
                <Button
                  type="danger"
                  style={{
                    padding: "0px 5px",
                    margin: "0 5px",
                    minWidth: "55px",
                  }}
                  onClick={() => deleteBook(book.id)}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }
};

export default BooksList;
