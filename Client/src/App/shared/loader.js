import React, { Component } from 'react';
import './../App.scss'

class Loader extends Component {
  render() {
    return (
      <div className="ipl-progress-indicator" id="ipl-progress-indicator">
        <div className="ipl-progress-indicator-head">
          <div className="first-indicator"></div>
          <div className="second-indicator"></div>
        </div>
        <div className="insp-logo-frame">
          <img src={require("./../asset/loadingIcon.svg")} alt="Loading..." />
        </div>
      </div>
    );
  }
}

export default Loader;