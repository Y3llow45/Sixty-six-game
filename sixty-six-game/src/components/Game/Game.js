import React, { Component } from 'react'
import { generateShuffledDeck } from '../../utils';

export default class Game extends Component {

  handleGenerateDeck = () => {
    const shuffledDeck = generateShuffledDeck();
    console.log(shuffledDeck);
  };

  render() {
    return (
      <div>
        <button onClick={this.handleGenerateDeck}>START</button>
      </div>
    )
  }
}
