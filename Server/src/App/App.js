import React, { Component } from "react";
import "./App.scss";
import { Route, Switch } from "react-router";
import Home from "./pages/Home";
import Team from "./pages/Team";
import Dashboard from "./components/dashboard";
import Login from "./pages/Login";
import Logout from "./pages/Logout";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLoggedIn: false
    };
  }

  componentDidMount() {
    this.getAuth();
  }

  getAuth() {
    fetch("/api/authenticate").then(res => {
      if (res.status === 200) {
        this.setState({ userLoggedIn: true });
      }
    });
  }

  render() {
    return (
      <>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route path="/team" component={Team} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
        </Switch>
      </>
    );
  }
}

export default App;
