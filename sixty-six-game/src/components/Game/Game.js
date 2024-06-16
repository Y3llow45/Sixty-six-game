import React, { Component } from 'react'
import { generateShuffledDeck } from '../../utils';
import Card from './Card/Card';
import './Game.css';

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deck: [],           // cards to draw
      opponent: [],       // opponent's cards
      player: [],         // player's cards
      trumpSuit: '',
      opponentHands: [],  // hands won by opponent
      playerHands: [],    // hands won by player
      opponentSelection: '',
      playerSelection: '',
      isPlayerFirst: true,
      cardMapping: [
        { image: '0.png', card: 'A', suit: 'h', points: 11 }, { image: '1.png', card: '10', suit: 'h', points: 10 }, { image: '2.png', card: 'K', suit: 'h', points: 4 }, { image: '3.png', card: 'Q', suit: 'h', points: 3 }, { image: '4.png', card: 'J', suit: 'h', points: 2 }, { image: '5.png', card: '9', suit: 'h', points: 0 },
        { image: '6.png', card: 'A', suit: 'c', points: 11 }, { image: '7.png', card: '10', suit: 'c', points: 10 }, { image: '8.png', card: 'K', suit: 'c', points: 4 }, { image: '9.png', card: 'Q', suit: 'c', points: 3 }, { image: '10.png', card: 'J', suit: 'c', points: 2 }, { image: '11.png', card: '9', suit: 'c', points: 0 },
        { image: '12.png', card: 'A', suit: 'd', points: 11 }, { image: '13.png', card: '10', suit: 'd', points: 10 }, { image: '14.png', card: 'K', suit: 'd', points: 4 }, { image: '15.png', card: 'Q', suit: 'd', points: 3 }, { image: '16.png', card: 'J', suit: 'd', points: 2 }, { image: '17.png', card: '9', suit: 'd', points: 0 },
        { image: '18.png', card: 'A', suit: 's', points: 11 }, { image: '19.png', card: '10', suit: 's', points: 10 }, { image: '20.png', card: 'K', suit: 's', points: 4 }, { image: '21.png', card: 'Q', suit: 's', points: 3 }, { image: '22.png', card: 'J', suit: 's', points: 2 }, { image: '23.png', card: '9', suit: 's', points: 0 }
      ]
    };
  }

  handleGenerateDeck = () => {
    const shuffledDeck = generateShuffledDeck();
    console.log(shuffledDeck);
    this.setState({
      opponent: shuffledDeck.slice(0, 6),
      player: shuffledDeck.slice(6, 12),
      trumpSuit: this.state.cardMapping[shuffledDeck[12]].suit,
      deck: shuffledDeck.slice(13)
    }, () => {
      //console.log(`OP: ${this.state.opponent}, PL: ${this.state.player}, CE: ${this.state.center}, DECK: ${this.state.deck}`)
      //this.startGame();
      console.log(this.state.trumpSuit);
      if (!this.state.isPlayerFirst) {
        this.opponentTurn();
      }
    });
  };

  handleCardClick = (cardIndex) => {                               /// PLAYER
    console.log(`HANDLE CARD CLICK: ${cardIndex}`)
    this.setState(() => ({
      playerSelection: cardIndex
    }), () => {
      console.log(this.state.playerSelection);
      if (this.state.isPlayerFirst) {
        this.opponentTurn();
      }
      else {
        this.compareCards();
      }
    });
  };

  opponentTurn = () => {
    console.log(`PLAYER SELECTION IS: ${this.state.playerSelection}`);
    console.log(typeof (this.state.playerSelection));                                //OPPONENT
    const randomIndex = Math.floor(Math.random() * this.state.opponent.length);
    this.setState(() => ({
      opponentSelection: this.state.opponent[randomIndex]
    }), () => {
      console.log(this.state.opponentSelection);
      if (this.state.isPlayerFirst) {
        this.compareCards();
      }
      //else => waiting for player
    });
  };

  compareCards = () => {
    console.log(this.state.opponentSelection, this.state.playerSelection);
    let opponent = this.state.cardMapping[this.state.opponentSelection];
    let player = this.state.cardMapping[this.state.playerSelection];
    console.log(opponent, player);
    console.log(this.state);
    if (player.suit == opponent.suit) {
      if (player.points > opponent.points) {
        setTimeout(() => {
          this.clearSelection();
        }, 250000)
      } else {
        setTimeout(() => {
          this.clearSelection();
        }, 250000)
      }
    } else {
      if (this.state.isPlayerFirst) {
        setTimeout(() => {
          this.clearSelection();
        }, 250000)
      } else {
        setTimeout(() => {
          this.clearSelection();
        }, 250000)
      }
    }
  }

  clearSelection = () => {
    this.setState({
      opponentSelection: '',
      playerSelection: ''
    })
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
          {this.state.opponentSelection === '' ? null : <img className='imgMargin' src={`/cards/${this.state.cardMapping[this.state.opponentSelection].image}`} />}
          {this.state.playerSelection === '' ? null : <img className='imgMargin' src={`/cards/${this.state.cardMapping[this.state.playerSelection].image}`} />}
        </div>
        <div className='player'>
          {this.state.player.map(cardIndex => {
            const card = this.state.cardMapping[cardIndex];
            console.log(card.image, card.card, cardIndex);
            return <Card key={cardIndex} image={card.image} card={card.card} onClick={() => this.handleCardClick(cardIndex)} />;
          })}
        </div>
      </div>
    )
  }
}
