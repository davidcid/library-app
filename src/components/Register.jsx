import React, { useState } from "react";
import { Form, Input, Button, Card } from "antd";
import { Container } from "../styles/styled";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

const Register = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container>
      <Card title="Registration" style={{ width: 300, textAlign: "center" }}>
        <Form onSubmit={handleSubmit}>
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
            Register
          </Button>
          Or
          <Button
            type="primary"
            style={{ width: "100%", marginTop: "10px", marginBottom: "10px" }}
            onClick={() => {
              props.history.push("/login");
            }}
          >
            Login
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Register;
