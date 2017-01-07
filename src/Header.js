import React from 'react';
import logo from './logo.png';
import './Header.css';

class Header extends React.Component {
  render() {
    return (
      <div className="Header">
        <div className="App-header">
          <img src={logo} className="Header-logo" alt="Aeons End Logo" />
          <h2>Aeon's End Set up Wizard</h2>
        </div>
      </div>
    );
  }
}

export default Header;
