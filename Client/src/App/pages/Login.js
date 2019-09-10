import React, { Component } from 'react';
import OAuth from '../OAuth'
import { Redirect } from 'react-router-dom';

const redirectTo = '/home'

class Login extends Component {

  state = {
    userLoggedIn: false,
    user: {}
  }
  componentDidMount() {
    this.setState({ user: this.convertToObject(this.props.location.search) });
    this.getAuth();
  }

  getAuth() {
    fetch("/api/authenticate").then(res => {
      if (res.status === 200) {
        this.setState({ userLoggedIn: true });
      }
    });
  }
  convertToObject(url) {
    const arr = url.slice(1).split(/&|=/); // remove the "?", "&" and "="
    let params = {};

    for (let i = 0; i < arr.length; i += 2) {
      const key = arr[i], value = arr[i + 1];
      params[key] = value; // build the object = { limit: "10", page:"1", status:"APPROVED" }
    }
    return params;
  }

  render() {
    const { userLoggedIn, user } = this.state;
    return (
      <>
        {userLoggedIn ? <Redirect to={{
          pathname: redirectTo,
          state: { showUser: true, user }
        }} /> :
          <div className="card white-square card-elevated">
            <div className="card-body soft-emboss" style={{ textAlign: "center" }}>
              <h4 className="card-title">Vacation Manager</h4>
              <hr className="gradient_line" />
              <div style={{ textAlign: "center" }}>
                <OAuth />
              </div>
            </div>
          </div>}
      </>
    )
  }
}

export default Login;