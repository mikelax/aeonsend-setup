import React from 'react';

class CardDisplay extends React.Component {
  render() {
    return (
      <div>
        {this.props.card.name}
        <br />{this.props.card.cost}
        <br />{this.props.card.type}
        <br />{this.props.card.collection}
      </div>
    );
  }
}

export default CardDisplay;
