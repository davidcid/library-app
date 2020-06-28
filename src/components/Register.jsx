import React, { useState } from "react";
import { Form, Input, Button, Card, Radio, notification } from "antd";
import { Container } from "../styles/styled";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import firebase from "../config/firebase";

const Register = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  // const handleSubmit = () => {
  //   firebase
  //     .userRegister(firstName, lastName, email, password, role)
  //     .then(props.history.push("/dashboard"))
  //     .catch((err) => {
  //       props.history.push("/register");
  //       openNotification(err);
  //     });
  // };

  async function createUser() {
    await firebase.auth
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        openNotification(err);
        props.history.push("/register");
      });
    const docRef = await firebase.db
      .collection("users")
      .add({
        first: firstName,
        last: lastName,
        email: email,
        role: role,
      })
      .then(props.history.push("/dashboard"))
      .catch((err) => {
        openNotification(err);
        props.history.push("/register");
      });
    console.log("User created with ID: ", docRef.id);
  }

  const openNotification = (err) => {
    notification.open({
      message: "Login error",
      description: err.message,
      type: "error",
      duration: 5,
    });
  };

  return (
    <Container>
      <Card title="Registration" style={{ width: 300, textAlign: "center" }}>
        <Form onFinish={createUser}>
          <Input
            placeholder="First Name"
            style={{ marginBottom: "10px" }}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            autoComplete="off"
          />
          <Input
            placeholder="Last Name"
            style={{ marginBottom: "10px" }}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            autoComplete="off"
          />
          <Input
            prefix={<MailOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />}
            placeholder="Email"
            style={{ marginBottom: "10px" }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            autoComplete="off"
          />
          <Input
            prefix={<LockOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />}
            type="password"
            placeholder="Password"
            style={{ marginBottom: "10px" }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            autoComplete="off"
          />
          <Radio.Group
            onChange={(e) => {
              setRole(e.target.value);
            }}
            style={{ marginBottom: "10px" }}
          >
            <Radio value="customer">Customer</Radio>
            <Radio value="author">Author</Radio>
          </Radio.Group>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%", marginBottom: "10px" }}
          >
            Register
          </Button>
          Or
          <Button
            type="primary"
            onClick={() => {
              props.history.push("/login");
            }}
            style={{ width: "100%", marginTop: "10px" }}
          >
            Login
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Register;
