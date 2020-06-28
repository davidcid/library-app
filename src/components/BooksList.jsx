import React, { useEffect, useContext } from "react";
import { Card } from "antd";
import { HeartTwoTone } from "@ant-design/icons";
import { AuthContext } from "../Auth";
import getBooks from "../functions/getBooks";

const BooksList = ({ books, setBooks }) => {
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    getBooks(setBooks);
    console.log("hey desde bookslist");
  }, [setBooks]);

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
