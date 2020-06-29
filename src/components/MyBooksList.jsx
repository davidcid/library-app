import React, { useEffect, useContext } from "react";
import { Button } from "antd";
import { AuthContext } from "../Auth";
import firebase from "../config/firebase";
import getMyBooks from "../functions/getMyBooks";
import getBooks from "../functions/getBooks";

const BooksList = ({ user, myBooks, setMyBooks, setBooks }) => {
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    getMyBooks(setMyBooks, user);
    console.log("hey");
  }, [setMyBooks, user]);

  const deleteBook = async (id) => {
    await firebase.db.collection("books").doc(id).delete();
    console.log(`The book ${id} has been deleted`);
    getMyBooks(setMyBooks, user);
    getBooks(setBooks);
  };

  if (currentUser != null) {
    return (
      <div style={{ marginTop: "25px" }}>
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
