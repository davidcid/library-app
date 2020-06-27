import React, { useState, useEffect, useContext } from "react";
import { Card } from "antd";
import { Container } from "../styles/styled";
import { AuthContext } from "../Auth";
import firebase from "../config/firebase";

const BooksList = () => {
  const { currentUser } = useContext(AuthContext);
  const [books, setBooks] = useState([]);

  async function getBooks() {
    try {
      firebase
        .getBooks()
        .get()
        .then((snapShots) => {
          setBooks({
            items: snapShots.docs.map((doc) => {
              return {
                id: doc.id,
                data: doc.data(),
              };
            }),
          });
        });
    } catch (err) {
      alert(err.message);
    }
  }

  useEffect(() => {
    getBooks();
  }, []);

  if (currentUser != null) {
    return (
      <Container>
        <Card title="Books List" style={{ width: 300, textAlign: "center" }}>
          <div>
            {books.items && books.items !== undefined
              ? books.items.map((book, key) => {
                  return <div key={key}>{book.data.title}</div>;
                })
              : null}
          </div>
        </Card>
      </Container>
    );
  }
};

export default BooksList;
