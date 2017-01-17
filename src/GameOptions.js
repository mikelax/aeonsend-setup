import React from 'react';
import './GameOptions.css';

import _ from 'lodash';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';

class CollectionCheckbox extends React.Component {
  handleChange = event => {
    this.props.onChange(event.target.id, event.target.checked);
  };

  render() {
    return (<label><input type="checkbox" id={this.props.id} defaultChecked={this.props.checked} onChange={this.handleChange} />{this.props.label}</label>);
  }
}

class GameOptions extends React.Component {
  handleChange = () => {
    this.props.onUserInput(this.magesInput.value, this.supplyInput.value);
  };

  handleCollectionChange = (id, checked) => {
    this.props.onCollectionChange(id, checked);
  };

  handleSubmit = event => {
    event.preventDefault();
    this.handleChange();
  };

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={12}>
            <Form horizontal onSubmit={this.handleSubmit}>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                  Number of Mages
                </Col>
                <Col sm={10}>
                  <select value={this.props.mages} ref={(input) => this.magesInput = input} onChange={this.handleChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>Collections</Col>
                <Col sm={10}>
                  <CollectionCheckbox
                    label="Core" id="core" key="core"
                    checked={_.find(this.props.collections, {'id': 'core'}).selected}
                    onChange={this.handleCollectionChange}
                  />
                  <br /><CollectionCheckbox
                    label="The Depths" id="depths" key="depths"
                    checked={_.find(this.props.collections, {'id': 'depths'}).selected}
                    onChange={this.handleCollectionChange}
                  />
                  <br /><CollectionCheckbox
                    label="The Nameless" id="nameless" key="nameless"
                    checked={_.find(this.props.collections, {'id': 'nameless'}).selected}
                    onChange={this.handleCollectionChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>Supply</Col>
                <Col sm={10}>
                  <select value={this.props.supply} ref={(input) => this.supplyInput = input} onChange={this.handleChange}>
                    <option value="0">Random</option>
                    <option value="1">Market 1 (3/2/4)</option>
                    <option value="2">Market 2 (3/2/4)</option>
                    <option value="3">Market 3 (3/1/5)</option>
                    <option value="4">Market 4 (3/3/3)</option>
                    <option value="5">Market 5 (4/1/4)</option>
                    <option value="6">Market 6 (2/3/4)</option>
                  </select>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button type="submit">
                    Submit
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default GameOptions;
