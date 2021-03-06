import React from "react";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Login from "./components/Login";
import Author from "./components/Author";
import Customer from "./components/Customer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "antd/dist/antd.css";
import { AuthProvider } from "./Auth";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/author" component={Author} />
        <Route exact path="/customer" component={Customer} />
      </Router>
    </AuthProvider>
  );
}

export default App;
