import React, { useContext } from "react";
import { Card, Button } from "antd";
import { Container } from "../styles/styled";
import { AuthContext } from "../Auth";
const Home = (props) => {
  const { currentUser } = useContext(AuthContext);

  if (currentUser === null) {
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
        </Card>
      </Container>
    );
  } else {
    props.history.push("/Dashboard");
  }
};

export default Home;
