import React, { useState, useContext } from "react";
import { Form, Input, Button, Card } from "antd";
import { Container } from "../styles/styled";
import { AuthContext } from "../Auth";
import firebase from "../config/firebase";

const Dashboard = ({ user }) => {
  const { currentUser } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");

  const { TextArea } = Input;

  async function getBooks() {
    try {
      firebase
        .getBooks()
        .get()
        .then(function (querySnapShot) {
          querySnapShot.forEach(function (book) {
            console.log(book.data());
            return (
              <div>
                <h1>book.data().title</h1>
                <h2>book.data().description</h2>
              </div>
            );
          });
        });
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleSubmit() {
    try {
      firebase.bookRegister(title, description, author, year, user);
    } catch (err) {
      alert(err.message);
    }
  }

  if (currentUser != null) {
    return (
      <Container>
        <Card
          title="Book Registration"
          style={{ width: 300, textAlign: "center" }}
        >
          <Form onFinish={handleSubmit}>
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
      </Container>
    );
    // return <Container>{currentUser.email}</Container>;
  }
  //   return <h1>What are you doing here??!??? You don't belong!</h1>;
};

export default Dashboard;
