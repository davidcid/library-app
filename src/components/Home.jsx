import React from "react";
import { Card, Button } from "antd";
import { Container } from "../styles/styled";
const Home = (props) => {
  return (
    <Container>
      <Card title="Library App" style={{ width: 300, textAlign: "center" }}>
        <Button
          type="primary"
          ghost
          style={{ width: "100%", marginBottom: "10px" }}
          onClick={() => {
            props.history.push("/register");
          }}
        >
          Register
        </Button>
        <Button
          type="primary"
          ghost
          style={{ width: "100%", marginBottom: "10px" }}
          onClick={() => {
            props.history.push("/Login");
          }}
        >
          Login
        </Button>
        <Button
          type="primary"
          ghost
          style={{ width: "100%" }}
          onClick={() => {
            props.history.push("/Dashboard");
          }}
        >
          Dashboard
        </Button>
      </Card>
    </Container>
  );
};

export default Home;
