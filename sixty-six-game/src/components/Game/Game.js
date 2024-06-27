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
      trump: '',
      opponentHands: 0,  // points won by opponent
      playerHands: 0,    // points won by player
      opponentSelection: '',
      playerSelection: '',
      isPlayerFirst: false,
      cardMapping: [
        { image: '0.png', card: 'A', suit: 'h', points: 11 }, { image: '1.png', card: '10', suit: 'h', points: 10 }, { image: '2.png', card: 'K', suit: 'h', points: 4 }, { image: '3.png', card: 'Q', suit: 'h', points: 3 }, { image: '4.png', card: 'J', suit: 'h', points: 2 }, { image: '5.png', card: '9', suit: 'h', points: 0 },
        { image: '6.png', card: 'A', suit: 'c', points: 11 }, { image: '7.png', card: '10', suit: 'c', points: 10 }, { image: '8.png', card: 'K', suit: 'c', points: 4 }, { image: '9.png', card: 'Q', suit: 'c', points: 3 }, { image: '10.png', card: 'J', suit: 'c', points: 2 }, { image: '11.png', card: '9', suit: 'c', points: 0 },
        { image: '12.png', card: 'A', suit: 'd', points: 11 }, { image: '13.png', card: '10', suit: 'd', points: 10 }, { image: '14.png', card: 'K', suit: 'd', points: 4 }, { image: '15.png', card: 'Q', suit: 'd', points: 3 }, { image: '16.png', card: 'J', suit: 'd', points: 2 }, { image: '17.png', card: '9', suit: 'd', points: 0 },
        { image: '18.png', card: 'A', suit: 's', points: 11 }, { image: '19.png', card: '10', suit: 's', points: 10 }, { image: '20.png', card: 'K', suit: 's', points: 4 }, { image: '21.png', card: 'Q', suit: 's', points: 3 }, { image: '22.png', card: 'J', suit: 's', points: 2 }, { image: '23.png', card: '9', suit: 's', points: 0 }
      ],
      specialNine: {
        'h': 5,
        'c': 11,
        'd': 17,
        's': 23,
      }
    };
  }

  handleGenerateDeck = () => {
    const shuffledDeck = generateShuffledDeck();
    console.log(shuffledDeck);
    this.setState({
      opponent: shuffledDeck.slice(0, 6),
      player: shuffledDeck.slice(6, 12),
      trump: this.state.cardMapping[shuffledDeck[12]],
      deck: [...shuffledDeck.slice(13), shuffledDeck[12]],
      opponentHands: 0,
      playerHands: 0
    }, () => {
      console.log(`OP: ${this.state.opponent}, PL: ${this.state.player}, CE: ${this.state.center}, DECK: ${this.state.deck}`)
      //this.startGame();
      if (!this.state.isPlayerFirst) {
        this.opponentTurn();
      }
    });
  };

  handleCardClick = (cardIndex) => {                               /// PLAYER
    console.log(this.state.player)
    this.setState(() => ({
      playerSelection: cardIndex
    }), () => {
      this.removeCard(cardIndex);
    });
  };

  removeCard = (cardIndex) => {
    let updated = this.state.player.filter(num => num !== cardIndex);
    this.setState(() => ({
      player: updated
    }), () => {
      if (this.state.isPlayerFirst) {
        this.opponentTurn();
      }
      else {
        this.compareCards();
      }
    })
  }

  opponentTurn = () => {
    const randomIndex = Math.floor(Math.random() * this.state.opponent.length);
    const selectedCard = this.state.opponent[randomIndex];
    let updated = this.state.opponent.filter(num => num !== selectedCard);
    this.setState(() => ({
      opponentSelection: selectedCard,
      opponent: updated
    }), () => {
      if (this.state.isPlayerFirst) {
        this.compareCards();
      }
      //else => waiting for player
    });
  };

  clearSelection = (option, playerPoints, opponentPoints) => {
    console.log(this.state.opponent, this.state.player, this.state.deck[0], typeof (this.state.deck[0]))
    this.setState(() => {
      const player = this.state.deck.length > 1 ? [...this.state.player, this.state.deck[0]] : this.state.player;
      const opponent = this.state.deck.length > 1 ? [...this.state.opponent, this.state.deck[1]] : this.state.opponent;
      return {
        opponentSelection: '',
        playerSelection: '',
        isPlayerFirst: option,
        playerHands: this.state.playerHands + playerPoints,
        opponentHands: this.state.opponentHands + opponentPoints,
        player: player,
        opponent: opponent,
        deck: this.state.deck.slice(2)
      }
    }, () => {
      console.log(`Points: ${this.state.playerHands} vs ${this.state.opponentHands} and deck: ${this.state.deck}`)
      if (!this.state.isPlayerFirst && this.state.opponent.length > 0) {
        this.opponentTurn();
      }
    })
  }

  compareCards = () => {
    let opponent = this.state.cardMapping[this.state.opponentSelection];
    let player = this.state.cardMapping[this.state.playerSelection];
    if (player.suit === opponent.suit) {
      if (player.points > opponent.points) {
        console.log('player wins')
        setTimeout(() => {
          this.clearSelection(true, player.points + opponent.points, 0);
        }, 500)
      } else {
        console.log('opponent wins')
        setTimeout(() => {
          this.clearSelection(false, 0, player.points + opponent.points);
        }, 500)
      }
    } else if (player.suit === this.state.trump.suit) {
      console.log('player wins')
      setTimeout(() => {
        this.clearSelection(true, player.points + opponent.points, 0);
      }, 500)
    } else if (opponent.suit === this.state.trump.suit) {
      console.log('opponent wins')
      setTimeout(() => {
        this.clearSelection(false, 0, player.points + opponent.points);
      }, 500)
    } else {
      if (this.state.isPlayerFirst) {
        console.log('player wins')
        setTimeout(() => {
          this.clearSelection(true, player.points + opponent.points, 0);
        }, 500)
      } else {
        console.log('opponent wins')
        setTimeout(() => {
          this.clearSelection(false, 0, player.points + opponent.points);
        }, 500)
      }
    }
  }

  /*clearSelection = () => {
    this.setState({
      opponentSelection: '',
      playerSelection: ''
    })
  }*/

  render() {
    return (
      <div className='game'>
        <button onClick={this.handleGenerateDeck} className='btnStart'>START</button>
        <div className='opponent'>
          {this.state.opponent ? this.state.opponent.map(a => {
            return <Card key={a} image={'back.png'} card={'back'} />
          }) : null}
        </div>
        <div className='center'>
          {this.state.player.length > 0 && this.state.deck.length > 1 ? <img className='otherCards' src={`/cards/back.png`}></img> : <img className='otherCards goUnder' src='/cards/empty.png'></img>}
          {this.state.player.length > 0 && this.state.deck.length > 1 ? <img className='trumpSuit' src={`/cards/${this.state.trump.image}`}></img> : <img className='otherCards goUnder' src='/cards/empty.png'></img>}

          {this.state.opponentSelection === '' ? null : <img className='imgMargin' alt='card' src={`/cards/${this.state.cardMapping[this.state.opponentSelection].image}`} />}
          {this.state.playerSelection === '' ? null : <img className='imgMargin' alt='card' src={`/cards/${this.state.cardMapping[this.state.playerSelection].image}`} />}
          {this.state.playerHands > 0 &&      //to do
            this.state.isPlayerFirst == true &&
            this.state.deck.length > 1 &&
            this.state.player.includes(this.state.specialNine[this.state.trump.suit]) ?
            <button>Steal center card</button> :
            null}
        </div>
        <div className='player'>
          {this.state.player.map(cardIndex => {
            const card = this.state.cardMapping[cardIndex];
            return <Card key={cardIndex} image={card.image} card={card.card} onClick={() => this.handleCardClick(cardIndex)} />;
          })}
        </div>
      </div>
    )
  }
}
