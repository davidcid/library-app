import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import firebase from "../config/firebase";
import getMyBooks from "../functions/getMyBooks";
import getBooks from "../functions/getBooks";

const BookRegistration = ({
  user,
  setBooks,
  setMyBooks,
  visible,
  setVisible,
}) => {
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

  const handleOk = () => {
    setVisible(false);
    submitBook();
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      title="Register a New Book"
      footer={[
        <Button
          key="submit"
          type="primary"
          onClick={handleOk}
          htmlType="submit"
        >
          Submit
        </Button>,
      ]}
    >
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
      </Form>
    </Modal>
  );
};

export default BookRegistration;
