import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import NavBar from './NavBar';
import Grid from '@material-ui/core/Grid';
import LeaveTypeEditor from '../components/leaveTypeEditor'
import { Paper } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default class Settings extends React.Component {

  state = {
    redirect: false
  }
  componentDidMount() {
    this.authenticate();
  }
  authenticate() {
    fetch('/api/authenticate')
      .then(res => {
        if (res.status !== 200) {
          this.setState({ redirect: true })
        }
      })
  }
  render() {
    const { redirect } = this.state
    const value = 1;
    return (
      <>
        {redirect ?
          <Redirect to="/login" /> : <>
            <div className='row' >
              <>
                <div style={{ width: '100%' }}>
                  <NavBar title='Vacation Manager' />
                </div>
              </>
            </div>
            <div className='row' style={{ marginTop: "15px" }}>
              <div className="container-fluid">
                <h4>Settings</h4>
                <Grid container direction="row" justify="space-around" alignItems="center">
                  <Grid item xs={12}>
                    <Paper>
                      <AppBar position="static" color="default">
                        <Tabs value={value} aria-label="simple tabs example">
                          <Tab label="General" />
                          <Tab label="Leave types" />
                          <Tab label="Notification" />
                        </Tabs>
                      </AppBar>
                      <TabPanel value={value} index={0}>

                      </TabPanel>
                      <TabPanel value={value} index={1}>
                        <LeaveTypeEditor></LeaveTypeEditor>
                      </TabPanel>
                      <TabPanel value={value} index={2}>
                        Item Three
                    </TabPanel>
                    </Paper>
                  </Grid>
                </Grid>
              </div>
            </div>
          </>
        }
      </>)
  }
}