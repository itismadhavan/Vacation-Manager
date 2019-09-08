import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
class Logout extends Component {

  componentDidMount() {
    fetch('api/logout').then(res => alert("Logged out"));
  }
  render() {
    return (
      <div>
        <Redirect exact from='/' to='/login' />
      </div>)
  }
}
export default Logout;