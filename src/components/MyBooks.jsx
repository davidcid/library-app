import React, { useState, useEffect, useContext } from "react";
import { Button } from "antd";
import { AuthContext } from "../Auth";
import firebase from "../config/firebase";

const BooksList = ({ user }) => {
  const { currentUser } = useContext(AuthContext);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    firebase
      .getBooks()
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
  }, [user]);

  const deleteBook = (id) => {
    firebase.deleteBook(id);
  };

  if (currentUser != null) {
    return (
      <div>
        <h1>My books</h1>
        {books.items && books.items !== undefined ? (
          //   ?
          <ul>
            {books.items.map((book, key) => (
              <li
                style={{ listStyle: "none", padding: "8px", fontSize: "16px" }}
              >
                <p
                  key={key}
                  style={{ display: "inline-block", minWidth: "200px" }}
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
