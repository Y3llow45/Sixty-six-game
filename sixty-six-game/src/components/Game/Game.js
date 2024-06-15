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
        { image: '1.png', card: 'A', suit: 'h', points: 11 }, { image: '2.png', card: '10', suit: 'h', points: 10 }, { image: '3.png', card: 'K', suit: 'h', points: 4 }, { image: '4.png', card: 'Q', suit: 'h', points: 3 }, { image: '5.png', card: 'J', suit: 'h', points: 2 }, { image: '6.png', card: '9', suit: 'h', points: 0 },
        { image: '7.png', card: 'A', suit: 'c', points: 11 }, { image: '8.png', card: '10', suit: 'c', points: 10 }, { image: '9.png', card: 'K', suit: 'c', points: 4 }, { image: '10.png', card: 'Q', suit: 'c', points: 3 }, { image: '11.png', card: 'J', suit: 'c', points: 2 }, { image: '12.png', card: '9', suit: 'c', points: 0 },
        { image: '13.png', card: 'A', suit: 'd', points: 11 }, { image: '14.png', card: '10', suit: 'd', points: 10 }, { image: '15.png', card: 'K', suit: 'd', points: 4 }, { image: '16.png', card: 'Q', suit: 'd', points: 3 }, { image: '17.png', card: 'J', suit: 'd', points: 2 }, { image: '18.png', card: '9', suit: 'd', points: 0 },
        { image: '19.png', card: 'A', suit: 's', points: 11 }, { image: '20.png', card: '10', suit: 's', points: 10 }, { image: '21.png', card: 'K', suit: 's', points: 4 }, { image: '22.png', card: 'Q', suit: 's', points: 3 }, { image: '23.png', card: 'J', suit: 's', points: 2 }, { image: '24.png', card: '9', suit: 's', points: 0 }
      ]
    };
  }

  handleCardClick = (card) => {
    this.setState((prevState) => ({
      center: [...prevState.center, card],
      player: prevState.player.filter(c => c !== card)
    }), () => {
      this.opponentTurn();
    });
  };

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

  opponentTurn = () => {
    const opponentCardIndex = Math.floor(Math.random() * this.state.opponent.length);
    const opponentCard = this.state.opponent[opponentCardIndex];
    this.setState((prevState) => ({
      center: [...prevState.center, opponentCard],
      opponent: prevState.opponent.filter(c => c !== opponentCard)
    }), () => {
      this.compareCards();
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
            return <Card key={cardIndex} image={card.image} card={card.card} onClick={() => this.handleCardClick(card.card)} />;
          })}
        </div>
      </div>
    )
  }
}
