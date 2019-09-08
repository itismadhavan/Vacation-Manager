import * as React from "react";
import { connect } from "react-redux";
import Stocks from "./stocks";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.fetchStocks();
  }

  render() {
    return (
      <>
        <Grid item xs={8}>
          <Paper className="paper">
            <h4>Dashboard</h4>
            <Stocks allStocks={this.props.allStocks} />
          </Paper>
        </Grid>
      </>);
  }
}

const mapStateToProps = state => {
  return {
    allStocks: state.allStocks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchStocks: () => {
      dispatch({ type: "FETCH_STOCKS" });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

export { Dashboard };
