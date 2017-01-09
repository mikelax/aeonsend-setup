import React from 'react';
import logo from './logo.png';
import './Header.css';
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';

class Header extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col className="Header">
            <img src={logo} className="Header-logo" alt="Aeons End Logo" />
            <h2>Aeon's End Set up Wizard</h2>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Header;
