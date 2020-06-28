import React, { useState, useEffect, useContext } from "react";
import { Card } from "antd";
import { HeartTwoTone } from "@ant-design/icons";
import { AuthContext } from "../Auth";
import firebase from "../config/firebase";

const BooksList = () => {
  const { currentUser } = useContext(AuthContext);
  const [books, setBooks] = useState([]);

  const getBooks = async () => {
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
  };

  useState(() => {
    getBooks();
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
                    extra={
                      <HeartTwoTone
                        twoToneColor="#f3f3f3"
                        style={{ fontSize: "24px" }}
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
