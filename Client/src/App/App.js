import React, { Component } from "react";
import "./App.scss";
import { Route, Switch } from "react-router";
import Home from "./pages/Home";
import Team from "./pages/Team";
import Dashboard from "./components/dashboard";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Settings from "./pages/settings";
import LeaveRequest from "./components/leaveRequest";

class App extends Component {

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
          <Route path="/settings" component={Settings} />
          <Route path="/request-days-off" component={LeaveRequest} />
        </Switch>
      </>
    );
  }
}

export default App;
