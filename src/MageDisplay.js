import React from 'react';

class MageDisplay extends React.Component {
  render() {
    return (
      <div>
        {this.props.mage.name} ({this.props.mage.collection})
      </div>
    );
  }
}

export default MageDisplay;
