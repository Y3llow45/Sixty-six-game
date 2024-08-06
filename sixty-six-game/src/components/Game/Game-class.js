import React, { Component } from 'react'
import Card from './Card/Card';
import './Game.css';
import Home from '../Home/Home';
import io from 'socket.io-client';

const socket = io('http://localhost:5243');

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opponentLength: 6,
      score: [0, 0],
      deckLength: 12,
      player: [],         // player's cards
      trump: 'trump',
      deck: [],           // cards in the deck (draw 1 every turn)
      opponentHands: 0,  // points won by opponent
      playerHands: 0,    // points won by player
      opponentSelection: '',
      playerSelection: '',
      isPlayerFirst: true,  // card placing order
      playerCardsClickable: true,  // disable player's card when one card is selected utill cards get compared and put away
      cardMapping: [
        { image: '0.png', card: 'A', suit: 'h', points: 11 }, { image: '1.png', card: '10', suit: 'h', points: 10 }, { image: '2.png', card: 'K', suit: 'h', points: 4 }, { image: '3.png', card: 'Q', suit: 'h', points: 3 }, { image: '4.png', card: 'J', suit: 'h', points: 2 }, { image: '5.png', card: '9', suit: 'h', points: 0.1 },
        { image: '6.png', card: 'A', suit: 'c', points: 11 }, { image: '7.png', card: '10', suit: 'c', points: 10 }, { image: '8.png', card: 'K', suit: 'c', points: 4 }, { image: '9.png', card: 'Q', suit: 'c', points: 3 }, { image: '10.png', card: 'J', suit: 'c', points: 2 }, { image: '11.png', card: '9', suit: 'c', points: 0.1 },
        { image: '12.png', card: 'A', suit: 'd', points: 11 }, { image: '13.png', card: '10', suit: 'd', points: 10 }, { image: '14.png', card: 'K', suit: 'd', points: 4 }, { image: '15.png', card: 'Q', suit: 'd', points: 3 }, { image: '16.png', card: 'J', suit: 'd', points: 2 }, { image: '17.png', card: '9', suit: 'd', points: 0.1 },
        { image: '18.png', card: 'A', suit: 's', points: 11 }, { image: '19.png', card: '10', suit: 's', points: 10 }, { image: '20.png', card: 'K', suit: 's', points: 4 }, { image: '21.png', card: 'Q', suit: 's', points: 3 }, { image: '22.png', card: 'J', suit: 's', points: 2 }, { image: '23.png', card: '9', suit: 's', points: 0.1 }
      ],
      specialNine: {        // steal trump card with a 9 of the same suit
        'h': 5,
        'c': 11,
        'd': 17,
        's': 23,
      },
      mirrage: {            // Call 20 or 40
        'h': [2, 3],
        'c': [8, 9],
        'd': [14, 15],
        's': [20, 21],
      },
      mirrageCards: [2, 3, 8, 9, 14, 15, 20, 21],
      indexOfTrump: 0,       //used for stealing this card with a 9 of the same suit
      isPlaying: false
    };
  }

  componentDidMount() {
    console.log('in mount')
    socket.on('trump', (data) => {
      console.log('trump received')
      console.log('data:', data);
      console.log(data.trump);
      this.setState({
        trump: data.trump
      });
    });
  }
  componentWillUnmount() {
    socket.off('gameData');
  }

  handleCardClick = (cardIndex) => {
    if (!this.state.playerCardsClickable) return;

    if (this.state.playerHands > 0 && this.state.isPlayerFirst && this.state.mirrageCards.includes(cardIndex)) {
      const suits = ['h', 'c', 'd', 's'];
      for (const suit of suits) {
        if (this.state.player.includes(this.state.mirrage[suit][0]) && this.state.player.includes(this.state.mirrage[suit][1])) {
          if (this.state.trump.suit === suit) {
            console.log(`40 points ${suit}`);
            this.setState({ playerHands: this.state.playerHands + 40 })
          } else {
            console.log(`20 points ${suit}`);
            this.setState({ playerHands: this.state.playerHands + 20 })
          }
          break;
        }
      }
    }
    //console.log(this.state.player)
    this.setState(() => ({
      playerSelection: cardIndex,
      playerCardsClickable: false
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

  logState = () => {
    console.log(this.state);
  }

  stealTrump = (card) => {
    const index = this.state.player.indexOf(card);
    const newPlayer = [...this.state.player];
    newPlayer.splice(index, 1);
    newPlayer.push(this.state.indexOfTrump);
    const newTrump = this.state.cardMapping[card];
    this.setState(() => ({
      player: newPlayer,
      trump: newTrump
    }));
  }

  close = () => {
    this.setState(() => {
      return {
        isClosed: true
      }
    }, () => {
      console.log(`closed!`)
    })
  }

  render() {
    return (
      <div className='game'>
        <Home />
        <p>Trump: {this.state.trump}</p>

        <div className='score'>
          <p>You : Bot</p>
          <p>{this.state.score.join(' : ')}</p>
        </div>

        <div className='opponent'>
          {this.state.isPlaying ? this.state.opponentLength.map(a => {  //opponent = number of cards opponent has. 6 by default
            return <Card key={a} image={'back.png'} card={'back'} onClick={() => { return }} />
          }) : null}
        </div>

        <div className='center'>
          {this.state.isPlaying ?
            this.state.player.length > 0 && this.state.deckLength > 1 ?   //change deck.length to decklength
              <img className={this.state.isClosed ? 'closed' : 'otherCards'} src={`/cards/back.png`}></img> :
              <img className='otherCards goUnder' src='/cards/empty.png'></img> : null}
          {this.state.isPlaying ?
            this.state.player.length > 0 && this.state.deckLength > 1 && this.state.isClosed == false ?
              <img className='trumpSuit' src={`/cards/${this.state.trump.image}`}></img> :
              <img className='otherCards goUnder' src='/cards/empty.png'></img> : null}

          {this.state.isPlaying ?
            this.state.opponentSelection === '' ?
              null :
              <img className='imgMargin' alt='card' src={`/cards/${this.state.cardMapping[this.state.opponentSelection].image}`} /> :
            null}
          {this.state.isPlaying ?
            this.state.playerSelection === '' ?
              null :
              <img className='imgMargin' alt='card' src={`/cards/${this.state.cardMapping[this.state.playerSelection].image}`} /> :
            null}

          {this.state.playerHands > 0 &&
            this.state.isPlayerFirst == true &&
            this.state.deckLength > 3 &&
            this.state.isPlaying &&
            this.state.isClosed == false &&
            this.state.player.includes(this.state.specialNine[this.state.trump.suit]) ?
            <button onClick={() => this.stealTrump(this.state.specialNine[this.state.trump.suit])}>Steal trump card</button> :
            null}
          {this.state.isPlaying ?
            <button onClick={() => this.callEnd()}>Call 66</button> :
            null}
          {this.state.deckLength > 3 && this.state.isPlaying && this.state.isPlayerFirst == true && this.state.isClosed == false ?
            <button onClick={() => this.close()}>Close Deck</button> :
            null}
          <button onClick={() => this.logState()}>Log State</button>
        </div>

        <div className='player'>
          {this.state.isPlaying ? this.state.player.map(cardIndex => {
            const card = this.state.cardMapping[cardIndex];
            return <Card key={cardIndex} image={card.image} card={card.card} clickable={this.state.playerCardsClickable} onClick={() => this.handleCardClick(cardIndex)} />
          }) : null}
        </div>
      </div>
    )
  }
}
