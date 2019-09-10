import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
class Logout extends Component {

  state = {
    loggedOut: false
  }
  componentWillMount() {
    fetch('api/logout').then(res => {
      if (res.status === 200) {
        this.setState({ loggedOut: true })
      }
    });
  }
  render() {
    const { loggedOut } = this.state;
    return (
      <>
        {loggedOut ?
          <div>
            <Redirect to='/login' />
          </div> : <div />}
      </>
    )
  }
}
export default Logout;