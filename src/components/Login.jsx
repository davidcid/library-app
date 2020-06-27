import React, { useState } from "react";
import { Form, Input, Button, Card } from "antd";
import { Container } from "../styles/styled";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import firebase from "../config/firebase";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    firebase
      .login(email, password)
      .then(props.history.push("/dashboard"))
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <Container>
      <Card title="Login" style={{ width: 300, textAlign: "center" }}>
        <Form onFinish={handleSubmit}>
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
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%", marginBottom: "10px" }}
          >
            Login
          </Button>
          Or
          <Button
            type="primary"
            style={{ width: "100%", marginTop: "10px", marginBottom: "10px" }}
            onClick={() => {
              props.history.push("/register");
            }}
          >
            Register
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
