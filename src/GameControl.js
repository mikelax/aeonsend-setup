import React from 'react';

import _ from 'lodash';
import GameDisplay from './GameDisplay';
import GameOptions from './GameOptions';

class GameControl extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mages: 2,
      supply: 1,
      collections: [
          { id: 'core', selected: true },
          { id: 'depths', selected: false },
          { id: 'nameless', selected: false }
        ],
      searchPerformed: false
    };
  }

  handleUserInput = (mages, supply) => {
    this.setState({
      mages: mages,
      supply: supply
    });
  };

  handleCollectionInput = (id, checked) => {
    let collections = this.state.collections;

    const index = _.indexOf(collections, _.find(collections, {id: id}));
    collections.splice(index, 1, {id: id, selected: checked});

    this.setState({
      collections: collections
    });
  };

  render() {
    return (
      <div>
        <GameOptions
          mages={this.state.mages}
          supply={this.state.supply}
          collections={this.state.collections}
          onUserInput={this.handleUserInput}
          onCollectionChange={this.handleCollectionInput}
        />
        <GameDisplay
          mageCount={this.state.mages}
          supplyConfigId={this.state.supply}
          collections={_.filter(this.state.collections, {selected: true})}
          showCards={this.state.searchPerformed} />
      </div>
    );
  }
}

export default GameControl;
