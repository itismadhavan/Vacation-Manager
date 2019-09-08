import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loader from '../shared/loader';
import NavBar from './NavBar'
import PositionedSnackbar from "./SnackBarCustom";
import SideBarComponent from "../components/sidebar"
import Grid from '@material-ui/core/Grid';
import Dashboard from '../components/dashboard';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showLoading: false,
      redirect: false,
      showUser: false,
      user: {}
    }
  }
  authenticate() {
    fetch('/api/authenticate')
      .then(res => {
        if (res.status !== 200) {
          this.setState({ redirect: true })
        }
      })
  }

  componentDidMount() {
    this.authenticate();
    if (localStorage && localStorage.getItem('user')) {
      this.setState({ user: JSON.parse(localStorage.getItem('user')), showUser: true })
      localStorage.clear();
    }
  }

  render() {
    const { showLoading, redirect, user, showUser } = this.state;
    return (
      <>
        <div className='row' >
          {redirect ?
            <Redirect to="/login" /> :
            <>
              <div style={{ width: '100%' }}>
                {showLoading ? <Loader /> : <div />}
                <NavBar />
                {showUser ? <PositionedSnackbar user={user} /> : <div />}
              </div>
            </>
          }
        </div>
        <div className='row' style={{ marginTop: "15px" }}>
          <div className='container-fluid'>
            <Grid container spacing={1}>
              <SideBarComponent></SideBarComponent>
              <Dashboard></Dashboard>
            </Grid>
          </div>
        </div>
      </>
    );
  }
}
export default Home;