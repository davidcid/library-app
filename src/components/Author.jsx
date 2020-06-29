import React, { useState, useContext } from "react";
import { AuthContext } from "../Auth";
import BookList from "../components/BooksList";
import MyBooksList from "./MyBooksList";
import BookRegistration from "./BookRegistration";
import { Modal, Button } from "antd";

const Author = ({ books, setBooks, myBooks, setMyBooks }) => {
  const { currentUser } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  if (currentUser != null) {
    return (
      <div>
        <Button
          type="primary"
          onClick={showModal}
          style={{ display: "block", marginLeft: "auto" }}
        >
          Register a New Book
        </Button>
        <MyBooksList
          user={currentUser.uid}
          myBooks={myBooks}
          setMyBooks={setMyBooks}
          setBooks={setBooks}
        />
        <BookList books={books} setBooks={setBooks} />
        <Modal visible={visible} title="Book Registration">
          <BookRegistration
            user={currentUser.uid}
            setMyBooks={setMyBooks}
            setBooks={setBooks}
            visible={visible}
            setVisible={setVisible}
          />
        </Modal>
      </div>
    );
  }
};

export default Author;
