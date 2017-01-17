import React from 'react';
import './CardDisplay.css';

class CardDisplay extends React.Component {
  render() {
    return (
      <div className="Card">
        {this.props.card.name} ({this.props.card.collection})
        <br />{this.props.card.cost}
        <div className={this.props.card.type}>{this.props.card.type}</div>
      </div>
    );
  }
}

export default CardDisplay;
