
import React from 'react';
import { Link } from 'react-router-dom';

export default class MenuLinks extends React.Component {
  constructor(props) {
    super(props);
    // Any number of links can be added here
    this.state = {
      links: [{
        id: 1,
        text: 'Add Leave',
        link: '/request-days-off',
        icon: "asset/Request-Leave.png"
      }, {
        id: 2,
        text: 'Dashboard',
        link: '/home',
        icon: 'asset/dashBoard.png'
      }, {
        id: 3,
        text: 'Profile',
        link: 'https://twitter.com/Fab_is_coding',
        icon: 'asset/Profile.png'
      }, {
        id: 4,
        text: 'Settings',
        link: './settings',
        icon: 'asset/settings.png'
      },{
        id: 5,
        text: 'Logout',
        link: '/logout',
        icon: 'asset/logout-colour.png'
      }]
    }
  }
  render() {
    let links = this.state.links.map(
      (link, i) =>
        <li key={link.id} ref={i + 1}>
          <i aria-hidden="true" className={`fa ${link.icon}`}></i>
          <img src={require(`../${link.icon}`)} style={{ width: 30, height: 30, marginRight: 10 }}></img>
          <Link to={link.link}>{link.text}</Link>
        </li>);

    return (
      <div className={this.props.menuStatus} id='menu'>
        <ul>
          {links}
        </ul>
      </div>
    )
  }
}