import React from 'react'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export class NavBar extends React.Component {
  render() {
    return (
      <div className="navbar-fixed-top">
        <nav style={{ backgroundColor: "#32CA32", maxHeight: 70 }} className="navbar main-navigation navbar-expand-lg">
          <span className="navbar-brand soft-emboss">
            <img src={require("../asset/hammock.png")} alt="Stock Market Simulator" style={{ width: 35, height: 35, marginRight: 10 }} />
            Vacation Manager
          </span>
          <Button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText1" aria-controls="navbarText1" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </Button>

          <div className="collapse navbar-collapse" id="navbarText1">
            <ul className="navbar-nav nav-right">
              <li className="nav-item nav-link">
                <Link className="nav-link waves-effect waves-light" to={'./home'}>Home <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item nav-link">
                <Link className="nav-link waves-effect waves-light" to={'./team'}>Team</Link>
              </li>
              <li className="nav-item nav-link">
                <Link className="nav-link waves-effect waves-light" to="/logout">Logout</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}
export default NavBar;