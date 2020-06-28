import React, { useState, useEffect, useContext } from "react";
import { Card } from "antd";
import { AuthContext } from "../Auth";
import firebase from "../config/firebase";

const BooksList = () => {
  const { currentUser } = useContext(AuthContext);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    firebase
      .getBooks()
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
  }, []);

  if (currentUser != null) {
    return (
      <div>
        <h1>Other Books Registered</h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {books.items && books.items !== undefined
            ? books.items.map((book, key) => {
                return (
                  <Card
                    key={key}
                    title={book.data.title}
                    style={{
                      width: "250px",
                      textAlign: "center",
                      margin: "20px 10px",
                      maxHeight: "400px",
                      overflow: "hidden",
                    }}
                  >
                    <h3>Year: {book.data.year}</h3>
                    <p style={{ textAlign: "left" }}>{book.data.description}</p>
                  </Card>
                );
              })
            : null}
        </div>
      </div>
    );
  }
};

export default BooksList;
