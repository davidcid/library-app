import React, { useState, useEffect, useContext } from "react";
import { Card, List } from "antd";
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

  if (currentUser != null) {
    return (
      <div>
        <h1>My books</h1>
        {books.items && books.items !== undefined
          ? //   ?
            books.items.map((book, key) => <p key={key}>{book.data.title}</p>)
          : null}
      </div>
    );
  }
};

export default BooksList;
