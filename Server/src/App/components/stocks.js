import * as React from "react";

class Stocks extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.allStocks &&
          this.props.allStocks.map(stock => {
            return (
              <div key={stock.code}>
                <h5>{stock.code}</h5>
                <span>{stock.value.current}</span>
              </div>
            );
          })}
      </React.Fragment>
    );
  }
}
export default Stocks;
