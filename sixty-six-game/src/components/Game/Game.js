import React, { Component } from 'react'
import { generateShuffledDeck } from '../../utils';
import Card from './Card/Card';
import './Game.css';

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opponent: [],
      center: [],
      player: [],
      opponentHands: [],
      playerHands: [],
      cardMapping: [
        { image: '1.png', card: 'A', suit: 'h', points: 11 }, { image: '2.png', card: 'H10' }, { image: '3.png', card: 'HK' }, { image: '4.png', card: 'HQ' }, { image: '5.png', card: 'HJ' }, { image: '6.png', card: 'H9' },
        { image: '7.png', card: 'CA' }, { image: '8.png', card: 'C10' }, { image: '9.png', card: 'CK' }, { image: '10.png', card: 'CQ' }, { image: '11.png', card: 'CJ' }, { image: '12.png', card: 'C9' },
        { image: '13.png', card: 'DA' }, { image: '14.png', card: 'D10' }, { image: '15.png', card: 'DK' }, { image: '16.png', card: 'DQ' }, { image: '17.png', card: 'SJ' }, { image: '18.png', card: 'D9' },
        { image: '19.png', card: 'SA' }, { image: '20.png', card: 'S10' }, { image: '21.png', card: 'SK' }, { image: '22.png', card: 'SQ' }, { image: '23.png', card: 'SJ' }, { image: '24.png', card: 'S9' }
      ]
    };
  }

  handleGenerateDeck = () => {
    const shuffledDeck = generateShuffledDeck();
    console.log(shuffledDeck);
    this.setState({
      opponent: shuffledDeck.slice(0, 6),
      player: shuffledDeck.slice(6, 12),
      center: shuffledDeck[12]
    }, () => {
      this.startGame();
    });
  };

  startGame = () => {

  }

  render() {
    return (
      <div className='game'>
        <button onClick={this.handleGenerateDeck} className='btnStart'>START</button>
        <div className='opponent'>
          {this.state.opponent.map(a => {
            return <Card key={a} image={'back.png'} card={'back'} />;
          })}
        </div>
        <div className='center'>

        </div>
        <div className='player'>
          {this.state.player.map(cardIndex => {
            const card = this.state.cardMapping[cardIndex - 1];
            console.log(card.image, card.card);
            return <Card key={cardIndex} image={card.image} card={card.card} />;
          })}
        </div>
      </div>
    )
  }
}
