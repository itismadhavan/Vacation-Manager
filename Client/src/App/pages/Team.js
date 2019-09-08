import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Loader from '../shared/loader';

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team: [],
      showLoading: false,
      redirect: false,
    }
  }
  componentWillMount() {
    fetch('/api/authenticate')
      .then(res => {
        if (res.status !== 200) {
          this.setState({ redirect: false })
        }
      })
  }

  componentDidMount() {
    this.getTeam();
  }

  getTeam = () => {
    this.setState({ showLoading: true }, () => {
      fetch('/api/getTeamMembers')
        .then(res => res.json())
        .then(team => this.setState({ team, showLoading: false }))
    });
  }

  render() {
    const { team, showLoading, redirect } = this.state;

    return (
      <div className='row justify-content-center'>
        {redirect ?
          <Redirect to="/login" /> :
          <div style={{ width: '100%' }}>
            {showLoading ? <Loader /> : <div />}
            <Alert key="primary" variant="primary">
              <h3>180/40 members</h3>
            </Alert>
            {team.length ? (
              <div>
                {team.map((memberName, i) => {
                  return (
                    <div key={i}>
                      {memberName}
                    </div>
                  );
                })}
              </div>
            ) : (
                <div>
                  <h2>Team not Found</h2>
                </div>
              )
            }
            <Link to={'./home'}>
              <Button variant="primary">
                Home
        </Button>
            </Link>
            <Link to={'./logout'}>
              <Button variant="secondary">
                Log out
        </Button>
            </Link>
          </div>}
      </div>
    );
  }
}

export default Team;