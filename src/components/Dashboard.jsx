import React, { useContext } from "react";
import { Container } from "../styles/styled";
import { AuthContext } from "../Auth";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  if (currentUser != null) {
    return <Container>{currentUser.email}</Container>;
  }
  return <h1>What are you doing here??!??? You don't belong!</h1>;
};

export default Dashboard;
