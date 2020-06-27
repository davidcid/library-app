import React, { useContext } from "react";
import { Container } from "../styles/styled";
import { AuthContext } from "../Auth";
import firebase from "../config/firebase";
import { Link } from "react-router-dom";
import Author from "../components/Author";

const Dashboard = (props) => {
  const { currentUser } = useContext(AuthContext);

  const logout = () => {
    firebase.logout();
    props.history.push("/register");
  };
  if (currentUser != null) {
    return (
      <div>
        <Link
          to="/register"
          onClick={logout}
          style={{
            textAlign: "right",
            display: "block",
            color: "#000",
            margin: "10px",
            fontSize: "16px",
          }}
        >
          Sign Out
        </Link>
        <h1>Welcome {currentUser.displayName}</h1>
        <Container>
          <Author user={currentUser.uid} />
        </Container>
      </div>
    );
  }
  return <h1>What are you doing here??!??? You don't belong!</h1>;
};

export default Dashboard;
