import React, { useContext } from "react";
import { AuthContext } from "../Auth";
import BookList from "../components/BooksList";
import MyBooks from "../components/MyBooks";
import BookRegistration from "./BookRegistration";

const Author = () => {
  const { currentUser } = useContext(AuthContext);

  if (currentUser != null) {
    return (
      <div>
        <MyBooks user={currentUser.uid} />
        <BookList />
        <BookRegistration user={currentUser.uid} />
      </div>
    );
  }
};

export default Author;
