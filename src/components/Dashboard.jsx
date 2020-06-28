import React, { useState, useContext, useEffect } from "react";
import { Container } from "../styles/styled";
import { AuthContext } from "../Auth";
import firebase from "../config/firebase";
import { Link } from "react-router-dom";
import Author from "../components/Author";
import Customer from "../components/Customer";
import BookList from "../components/BooksList";

const Dashboard = (props) => {
  const { currentUser } = useContext(AuthContext);
  const [role, setRole] = useState("");

  async function getRole() {
    try {
      firebase
        .getRole()
        .where("email", "==", currentUser.email)
        .get()
        .then((snapShots) => {
          setRole(
            snapShots.docs.map((doc) => {
              return doc.data().role;
            })
          );
        })
        .catch(function (error) {
          console.log("Error getting role: ", error);
        });
    } catch (err) {
      alert(err.message);
    }
  }

  const logout = () => {
    firebase.logout();
    props.history.push("/register");
  };

  useEffect(() => {
    if (currentUser !== null) {
      getRole();
    }
  }, currentUser);

  if (currentUser !== null) {
    console.log(role);
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
        <h1>Welcome {currentUser.email}</h1>
        <Container>
          {role[0] === "customer" ? (
            <Customer />
          ) : (
            <Author user={currentUser.uid} />
          )}

          <BookList />
        </Container>
      </div>
    );
  }
  return <h1>What are you doing here??!??? You don't belong!</h1>;
};

export default Dashboard;
