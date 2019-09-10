import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loader from '../shared/loader';
import NavBar from './NavBar'
import PositionedSnackbar from "./SnackBarCustom";
import Grid from '@material-ui/core/Grid';
import Dashboard from '../components/dashboard';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Badge from '@material-ui/core/Badge';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      <Box p={2}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showLoading: false,
      redirect: false,
      showUser: false,
      user: {},
      value: 0
    }
  }
  authenticate() {
    fetch('/api/authenticate')
      .then(res => {
        if (res.status !== 200) {
          this.setState({ redirect: true })
        }
        else {
          if (this.props.location.state !== undefined)
            this.setState({ user: this.props.location.state.user, showUser: this.props.location.state.showUser });
        }
      })
  }

  componentDidMount() {
    this.authenticate();
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }


  render() {
    const { showLoading, redirect, user, showUser, value } = this.state;

    return (
      <>
        <div className='row' >
          {redirect ?
            <Redirect to="/login" /> :
            <>
              <div style={{ width: '100%' }}>
                {showLoading ? <Loader /> : <div />}
                <NavBar title='Vacation Manager' />
                {showUser ? <PositionedSnackbar user={user} /> : <div />}
              </div>
            </>
          }
        </div>
        <div className='row' style={{ marginTop: "15px" }}>
          <div className="container-fluid">
            <h4>Dashboard</h4>
            <Grid container direction="row" justify="space-between">
              <Grid item xs={9}>
                <Paper>
                  <Dashboard></Dashboard>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper>
                  <AppBar position="static" color="default">
                    <Tabs
                      value={value}
                      onChange={this.handleChange}
                      variant="scrollable"
                      indicatorColor="secondary"
                      textColor="secondary"
                      aria-label="icon label tabs example">
                      <Tab icon={<PersonPinIcon />} label={
                        <Badge style={{ padding: 3 }} color="primary" badgeContent={0}>
                          People off today
                      </Badge>
                      } />
                      <Tab icon={<FavoriteIcon />} label="Upcoming holidays" />
                    </Tabs>
                  </AppBar>
                  <TabPanel value={value} index={0}>
                    <div className="empty-state">
                      <div>
                        <h2>Nothing here</h2>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <div className="empty-state">
                      <div>
                        <h2> Nothing here</h2>
                      </div>
                    </div>
                  </TabPanel>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </div>
      </>
    );
  }
}
export default Home;