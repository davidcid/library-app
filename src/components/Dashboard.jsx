import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Auth";
import firebase from "../config/firebase";
import Author from "../components/Author";
import Customer from "../components/Customer";

import { PageHeader, Button } from "antd";

const Dashboard = (props) => {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState({});

  const logout = () => {
    firebase.auth.signOut();
    props.history.push("/register");
  };

  useEffect(() => {
    if (currentUser !== null) {
      const getRole = async () => {
        await firebase.db
          .collection("users")
          .where("email", "==", currentUser.email)
          .get()
          .then((snapShots) => {
            setUser(snapShots.docs[0].data());
          })
          .catch(function (error) {
            console.log("Error getting role: ", error);
          });
      };

      getRole();
    }
  }, [currentUser]);

  if (currentUser !== null) {
    return (
      <div>
        <PageHeader
          className="site-page-header"
          title="Library App"
          extra={[<Button onClick={logout}>Sign Out</Button>]}
          footer={[<h3>Welcome {user.first}</h3>]}
          style={{ backgroundColor: "#f5f5f5" }}
        />
        <main
          style={{ maxWidth: "1300px", padding: "4% 7%", margin: "0 auto" }}
        >
          {user.role === "customer" ? (
            <Customer />
          ) : (
            <Author user={currentUser.uid} />
          )}
        </main>
      </div>
    );
  }
  return (
    <h1
      style={{
        margin: "0 auto",
        textAlign: "center",
        marginTop: "25%",
        color: "rgba(0,0,0,.5)",
      }}
    >
      Loading...
    </h1>
  );
};

export default Dashboard;
