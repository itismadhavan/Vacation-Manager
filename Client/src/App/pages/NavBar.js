import React from 'react'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import MenuLinks from './menu'

export class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
    this._menuToggle = this._menuToggle.bind(this);
    this._handleDocumentClick = this._handleDocumentClick.bind(this);
  }
  componentDidMount() {
    document.addEventListener('click', this._handleDocumentClick, false);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this._handleDocumentClick, false);
  }
  _handleDocumentClick(e) {
    if (!this.refs.root.contains(e.target) && this.state.isOpen === true) {
      this.setState({
        isOpen: false
      });
    };
  }
  _menuToggle(e) {
    e.stopPropagation();
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    let menuStatus = this.state.isOpen ? 'isopen' : '';

    return (
      <div ref="root">
        <div className="menubar">
          <div className="hambclicker" onClick={this._menuToggle}></div>
          <div id="hambmenu" className={menuStatus}><span></span><span></span><span></span><span></span></div>
          <div className="title">
            <span>
              <img src={require("../asset/sunbed.png")} style={{ width: 40, height: 40, marginRight: 10 }}></img>
              {this.props.title}</span>
          </div>
          <div className="links">
            <Link className="nav-link waves-effect waves-light" to="/logout">
              <img src={require("../asset/logout.png")} alt="logout" title="Logout" style={{ width: 20, height: 20, marginRight: 10 }}></img></Link>
          </div>
        </div>
        <MenuLinks menuStatus={menuStatus} />
      </div>
    )
  }
  // render() {
  //   return (
  //     <div className="navbar-fixed-top">
  //       <nav style={{ backgroundColor: "#32CA32", maxHeight: 70 }} className="navbar main-navigation navbar-expand-lg">
  //         <span className="navbar-brand soft-emboss">
  //           <img src={require("../asset/hammock.png")} alt="Stock Market Simulator" style={{ width: 35, height: 35, marginRight: 10 }} />
  //           Vacation Manager
  //         </span>
  //         <Button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText1" aria-controls="navbarText1" aria-expanded="false" aria-label="Toggle navigation">
  //           <span className="navbar-toggler-icon"></span>
  //         </Button>

  //         <div className="collapse navbar-collapse" id="navbarText1">
  //           <ul className="navbar-nav nav-right">
  //             <li className="nav-item nav-link">
  //               <Link className="nav-link waves-effect waves-light" to={'./home'}>Home <span className="sr-only">(current)</span></Link>
  //             </li>
  //             <li className="nav-item nav-link">
  //               <Link className="nav-link waves-effect waves-light" to={'./team'}>Team</Link>
  //             </li>
  //             <li className="nav-item nav-link">
  //               <Link className="nav-link waves-effect waves-light" to="/logout">Logout</Link>
  //             </li>
  //           </ul>
  //         </div>
  //       </nav>
  //     </div>
  //   )
  // }
}
export default NavBar;