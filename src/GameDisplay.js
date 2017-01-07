import React from 'react';

import _ from 'lodash';
import CardDisplay from './CardDisplay';
import MageDisplay from './MageDisplay';
import mageData from './data/mages';
import cardData from './data/cards';
import marketConfigs from './data/marketConfigs';

class GameDisplay extends React.Component {

  getMages(mageCount, collections) {
    const mageCards = _
      .chain(mageData)
      .filter(mage => {
        return _.intersection([mage.collection], _.map(collections, 'id')).length > 0
      })
      .sampleSize(mageCount)
      .value();

    return mageCards;
  }

  /**
   * Function to return the JSX for displaying all selected Mages
   * @param {array} Array of Mage Cards to display
   */
  getMagesDisplay(mageCards) {
    const mages = [];
    for(const mage of mageCards) {
      mages.push(<MageDisplay key={mage.name} mage={mage} />);
    }

    return mages;
  }

  getMarketConfig(supplyConfigId) {
    // if supply is random, assign it to a random market
    const market = _.toNumber(supplyConfigId) === 0
      ? _.sample(marketConfigs)
      : _.find(marketConfigs, {'id': _.toNumber(supplyConfigId)});

    return market;
  }

  getSupplyCards(market) {
    const selectedCards = [];
    let availableCards = cardData;

    for(let i=1; i<10; i++) {
      const pos = _.find(market.config, (p) => {return p.position === i});

      const card = _.chain(cardData)
        .filter((c) => {return c.type === pos.type && (c.cost >= pos.min && c.cost <= pos.max)})
        .sample()
        .value();

      // remove from available to prevent duplicates
      availableCards = availableCards.filter(item => item.name !== card.name);

      selectedCards.push(card);
    }

    return selectedCards;
  }

  getTotalNemesisCardCount(mageCount) {
    let count = 9; // start with 9 nemesis cards
    // TODO add param for nemesis as they may have custom cards
    switch(mageCount) {
      case 1:
        count += 11
        break;
      case 2:
        count += 15
        break;
      case 3:
        count += 18
        break;
      case 4:
        count += 22
        break;
      default:
        break;
    }
    return count;
  }

  render() {
    const market = this.getMarketConfig(this.props.supplyConfigId);
    const supplyCards = this.getSupplyCards(market);
    const mages = this.getMages(this.props.mageCount, this.props.collections);
    const magesDisplay = this.getMagesDisplay(mages);

    const totalMageStarterCards = _.reduce(mages, (sum, n) => { return sum + 10}, 0);
    const totalSupplyCards = _.reduce(supplyCards, (sum, n) => { return sum + n.quantity; }, 0);
    const totalNemesisCards = this.getTotalNemesisCardCount(_.toNumber(this.props.mageCount));

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
