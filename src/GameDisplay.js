import React from 'react';

import _ from 'lodash';
import CardDisplay from './CardDisplay';
import MageDisplay from './MageDisplay';
import mageData from './data/mages';
import cardData from './data/cards';
import marketConfigs from './data/marketConfigs';

class GameDisplay extends React.Component {

  /**
   * Select a group of Mages to use for the game
   * @param {string} mageCount The number of Mages to select
   * @param {Object[]} collections List of selected collections to pick from
   * @returns {Object[]} Array of the selected Mages
   */
  getMages = () => {
    const mageCount = this.props.mageCount;
    const collections = this.props.collections;
    const mageCards = _
      .chain(mageData)
      .filter(mage => {
        return _.intersection([mage.collection], _.map(collections, 'id')).length > 0
      })
      .sampleSize(mageCount)
      .value();

    return mageCards;
  };

  /**
   * Function to return the JSX for displaying all selected Mages
   * @returns {Object[]} Array of MageDisplay JSX components
   */
  getMagesDisplay = () => {
    return this
      .getMages()
      .map(mage => <MageDisplay key={mage.name} mage={mage} />);
  };

  /**
   * Gets the Market Config for the given ID
   * @returns {Object} The Market Config Object
   */
  getMarketConfig = () => {
    const supplyConfigId = this.props.supplyConfigId;
    // if supply is random, assign it to a random market
    const market = _.toNumber(supplyConfigId) === 0
      ? _.sample(marketConfigs)
      : _.find(marketConfigs, {'id': _.toNumber(supplyConfigId)});

    return market;
  };

  /**
   * Generate a List of Supply cards based on the selected Market
   * @returns {Object[]} Array of the randomly selected Cards
   */
  getSupplyCards = () => {
    const market = this.getMarketConfig();
    const selectedCards = [];
    const collections = this.props.collections;

    let availableCards = cardData;

    for(let i=1; i<10; i++) {
      const pos = _.find(market.config, (p) => {return p.position === i});

      const card = _.chain(cardData)
        .filter((c) => {return c.type === pos.type && (c.cost >= pos.min && c.cost <= pos.max)})
        .filter((c) => {return _.intersection([c.collection], _.map(collections, 'id')).length > 0})
        .sample()
        .value();

      // remove from available to prevent duplicates
      availableCards = availableCards.filter(item => item.name !== card.name);

      selectedCards.push(card);
    }

    return selectedCards;
  };

  getTotalNemesisCardCount = () => {
    const start = 9;
    const additional = {
      1: 11,
      2: 15,
      3: 18,
      4: 22
    };

    // TODO add param for nemesis as they may have custom cards
    return start + additional[this.props.mageCount];
  };

  render() {
    const market = this.getMarketConfig();
    const supplyCards = this.getSupplyCards();
    const mages = this.getMages();
    const magesDisplay = this.getMagesDisplay();

    const totalMageStarterCards = (mages || []).length * 10;
    const totalSupplyCards = _.sumBy(supplyCards, card => card.quantity);
    const totalNemesisCards = this.getTotalNemesisCardCount();

    // if search has not been performed yet
    // if (!this.props.showCards) {
    //   return null;
    // }

    return (
      <div>
        <h2>Mages</h2>
        Number of Mages: {this.props.mageCount}
        {magesDisplay}

        <h2>Supply</h2>
        Supply Config:  {market.name}
        <table>
          <tbody>
            <tr>
              <td><CardDisplay card={supplyCards[0]} /></td>
              <td><CardDisplay card={supplyCards[1]} /></td>
              <td><CardDisplay card={supplyCards[2]} /></td>
            </tr>
            <tr>
              <td><CardDisplay card={supplyCards[3]} /></td>
              <td><CardDisplay card={supplyCards[4]} /></td>
              <td><CardDisplay card={supplyCards[5]} /></td>
            </tr>
            <tr>
              <td><CardDisplay card={supplyCards[6]} /></td>
              <td><CardDisplay card={supplyCards[7]} /></td>
              <td><CardDisplay card={supplyCards[8]} /></td>
            </tr>
          </tbody>
        </table>

        <h2>Card Counts</h2>
        Mage Starter Cards: {totalMageStarterCards}
        <br />Supply Cards: {totalSupplyCards}
        <br />Nemesis Cards: {totalNemesisCards}
        <p>
        Total: {totalMageStarterCards + totalSupplyCards + totalNemesisCards}
        </p>
      </div>
    );
  }
}

export default GameDisplay;
