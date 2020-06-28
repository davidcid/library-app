import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Auth";
import firebase from "../config/firebase";
import Author from "../components/Author";
import Customer from "../components/Customer";

import { PageHeader, Button } from "antd";

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
    return (
      <div>
        <PageHeader
          className="site-page-header"
          title="Library App"
          extra={[<Button onClick={logout}>Sign Out</Button>]}
          footer={[<h3>Welcome {currentUser.uid}</h3>]}
          style={{ backgroundColor: "#f5f5f5" }}
        />
        {role[0] === "customer" ? (
          <Customer />
        ) : (
          <Author user={currentUser.uid} />
        )}
      </div>
    );
  }
  return <h1>What are you doing here??!??? You don't belong!</h1>;
};

export default Dashboard;
