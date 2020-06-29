import React, { useEffect, useContext } from "react";
import { Card } from "antd";
import { HeartTwoTone } from "@ant-design/icons";
import { AuthContext } from "../Auth";
import getBooks from "../functions/getBooks";
import firebase from "../config/firebase";

const BooksList = ({ books, setBooks }) => {
  const { currentUser } = useContext(AuthContext);

  const subscribe = async (id) => {
    function subBook(book) {
      return book.id === id;
    }
    console.log(books.items.find(subBook).data.subscribed);
    // if (books.items.find(subBook).data.subscribed.includes(currentUser.email)) {
    //   console.log("already in the list");
    // }
    firebase.db.collection("books").doc(id).set(
      {
        subscribed: currentUser.email,
      },
      { merge: true }
    );
    getBooks(setBooks);
  };

  useEffect(() => {
    getBooks(setBooks);
  }, [setBooks]);

  if (currentUser != null) {
    return (
      <div style={{ marginTop: "50px" }}>
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
                    extra={
                      <HeartTwoTone
                        twoToneColor="#f3f3f3"
                        style={{ fontSize: "24px" }}
                        onClick={() => subscribe(book.id)}
                      />
                    }
                    style={{
                      width: "250px",
                      textAlign: "center",
                      margin: "20px 10px",
                      maxHeight: "400px",
                      overflow: "hidden",
                    }}
                  >
                    <h3>By: {book.data.author}</h3>
                    <h4>{book.data.year}</h4>

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
