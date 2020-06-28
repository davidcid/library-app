import React, { useContext } from "react";
import { AuthContext } from "../Auth";
import BookList from "../components/BooksList";
import MyBooksList from "./MyBooksList";
import BookRegistration from "./BookRegistration";

const Author = ({ books, setBooks, myBooks, setMyBooks }) => {
  const { currentUser } = useContext(AuthContext);

  if (currentUser != null) {
    return (
      <div>
        <MyBooksList
          user={currentUser.uid}
          myBooks={myBooks}
          setMyBooks={setMyBooks}
          setBooks={setBooks}
        />
        <BookList books={books} setBooks={setBooks} />
        <BookRegistration
          user={currentUser.uid}
          setMyBooks={setMyBooks}
          setBooks={setBooks}
        />
      </div>
    );
  }
};

export default Author;
