import React, { Component } from 'react';
import OAuth from '../OAuth'
import { Redirect } from 'react-router-dom';

const providers = ['google']
const redirectTo = '/home'

class Login extends Component {

  state = {
    userLoggedIn: false
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
    const { userLoggedIn } = this.state;
    return (
      <>
        {userLoggedIn ? <Redirect to={{
          pathname: redirectTo,
          state: { showUser: true }
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