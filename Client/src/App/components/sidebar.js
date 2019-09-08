import * as React from "react"
import { connect } from "react-redux";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { loadStocksOnSearch } from "../actions/actions";


class SideBarComponent extends React.Component {
  state = {
    query: '',
    loading: false
  }

  // handleClick = () => {
  //   const data = { exchange: "NSE", symbol: "ASHOKLEY" };
  //   var prop1 = "Meta Data";
  //   var prop2 = "Time Series (Daily)"
  //   const result = { MetaData: "", TimeSeries: "" }
  //   fetch(`api/intraday?exchange=${encodeURIComponent(data.exchange)}&symbol=${encodeURIComponent(data.symbol)}`)
  //     .then((res) => res.json())
  //     .then(data => {
  //       var { [prop1]: MetaData, [prop2]: TimeSeries } = data;
  //       result.MetaData = MetaData;
  //       result.TimeSeries = TimeSeries;
  //       console.log(result);
  //     });
  // }

  handleSearch = (event) => {
    this.props.stockResults = [];
    this.setState({
      query: event.target.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
          this.props.loadStockSearch(this.state.query);
      }
    });
  }

  render() {
    return (
      <>
        <Grid item xs={4}>
          <Paper className="paper">
            <form>
              <input type="text" className="textbox" placeholder="Search" value={this.state.query} onChange={this.handleSearch} />
              <input title="Search" value="" type="submit" className="button" />
            </form>
            <div className="result-card">
              {this.props.stockResults.length}{this.state.query}
              {this.props.stockResults.length > 0 ?
                <ul>
                  {this.props.stockResults && this.props.stockResults.map(r => {
                    let prop1 = "1. symbol";
                    let prop2 = "2. name"
                    let item = { name: "", symbol: "" }
                    let { [prop1]: symbol, [prop2]: name } = r;
                    item.name = name;
                    item.symbol = symbol;
                    return (
                      <li key={item.symbol} className="match">
                        {item.name} || {item.symbol}
                      </li>)
                  })}
                </ul> :
                <div className="empty-state">
                  <div>
                    <h2> Nothing here</h2>
                    <p>Use the search bar at the top to add some instruments</p>
                  </div>
                </div>}
            </div>
          </Paper>
        </Grid>
      </>
    )
  }
}
const mapStateToProps = state => {
  return {
    allStocks: state.allStocks,
    stockResults: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchStocks: () => { dispatch({ type: "FETCH_STOCKS" }); },
    loadStockSearch: (query) => { dispatch(loadStocksOnSearch(query)) }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBarComponent);

export { SideBarComponent };