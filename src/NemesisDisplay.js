import React from 'react';

class NemesisDisplay extends React.Component {
  render() {
    return (
      <div>
        {this.props.nemesis.name} ({this.props.nemesis.collection})
      </div>
    );
  }
}

export default NemesisDisplay;
