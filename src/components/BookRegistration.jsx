import React, { useState } from "react";
import { Form, Input, Button, Card } from "antd";
import firebase from "../config/firebase";
import getMyBooks from "../functions/getMyBooks";
import getBooks from "../functions/getBooks";

const BookRegistration = ({ user, setBooks, setMyBooks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");

  const { TextArea } = Input;

  async function submitBook() {
    try {
      const docRef = firebase.db.collection("books").add({
        title: title,
        description: description,
        author: author,
        year: year,
        user: user,
      });
      console.log("Document Written with ID: ", docRef.id);
      getMyBooks(setMyBooks, user);
      getBooks(setBooks);
    } catch (err) {
      console.log("Error creating book");
    }
  }

  return (
    <Card title="Book Registration" style={{ width: 300, textAlign: "center" }}>
      <Form onFinish={submitBook}>
        <Input
          placeholder="Title"
          style={{ marginBottom: "10px" }}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          autoComplete="off"
        />
        <TextArea
          placeholder="Description"
          rows={4}
          style={{ marginBottom: "10px" }}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          autoComplete="off"
        />
        <Input
          placeholder="Year"
          type="number"
          style={{ marginBottom: "10px" }}
          onChange={(e) => {
            setYear(e.target.value);
          }}
          autoComplete="off"
        />
        <Input
          placeholder="Author"
          style={{ marginBottom: "10px" }}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
          autoComplete="off"
        />
        <Button
          type="primary"
          htmlType="submit"
          className="register-form-button"
          style={{ width: "100%", marginBottom: "10px" }}
        >
          Register new book
        </Button>
      </Form>
    </Card>
  );
};

export default BookRegistration;
