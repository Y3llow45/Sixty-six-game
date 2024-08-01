import React, { Component } from 'react'
import { generateShuffledDeck } from '../../utils';
import Card from './Card/Card';
import './Game.css';
import { NavLink } from 'react-router-dom';

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deck: [],           // cards in the deck (draw 1 every turn)
      score: [0, 0],
      opponent: [],       // opponent's cards
      player: [],         // player's cards
      trump: '',
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

  handleGenerateDeck = () => {
    const shuffledDeck = generateShuffledDeck();
    //let shuffledDeck = [10, 1, 5, 14, 4, 17, 21, 23, 19, 15, 0, 2, 18, 7, 16, 6, 8, 12, 3, 13, 11, 9, 22, 20] // test
    console.log(shuffledDeck);
    this.setState({
      opponent: shuffledDeck.slice(0, 6),
      player: shuffledDeck.slice(6, 12),
      trump: this.state.cardMapping[shuffledDeck[12]],
      deck: [...shuffledDeck.slice(13), shuffledDeck[12]],
      opponentHands: 0,
      indexOfTrump: shuffledDeck[12],
      playerHands: 0,
      isPlaying: true,
      isClosed: false
    }, () => {
      //console.log(`OP: ${this.state.opponent}, PL: ${this.state.player}, CE: ${this.state.center}, DECK: ${this.state.deck}`)
      //this.startGame();
      if (!this.state.isPlayerFirst) {
        this.opponentTurn();
      }
    });
  };

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

  clearSelection = (option, playerPoints, opponentPoints) => {
    //console.log(this.state.opponent, this.state.player, this.state.deck[0], typeof (this.state.deck[0]))
    this.setState(() => {
      const player = this.state.deck.length > 1 && !this.state.isClosed ? [...this.state.player, this.state.deck[0]] : this.state.player;
      const opponent = this.state.deck.length > 1 && !this.state.isClosed ? [...this.state.opponent, this.state.deck[1]] : this.state.opponent;
      return {
        opponentSelection: '',
        playerSelection: '',
        isPlayerFirst: option,
        playerHands: this.state.playerHands + playerPoints,
        opponentHands: this.state.opponentHands + opponentPoints,
        player: player,
        opponent: opponent,
        deck: this.state.deck.slice(2),
        playerCardsClickable: true
      }
    }, () => {
      if (this.state.player.length == 0 && this.state.opponent.length == 0) {
        this.callEnd()
      }
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

  callEnd = () => {
    this.setState({
      isPlaying: false,
      deck: [],
      opponent: [],
      player: [],
      trump: '',
      opponentHands: 0,
      playerHands: 0,
      opponentSelection: '',
      playerSelection: '',
      playerCardsClickable: true,
      isClosed: false
    });
    if (this.state.playerHands >= 66) {
      let points;
      if (this.state.opponentHands == 0) {
        console.log('3 points for player')
        points = 3;
      } else if (this.state.opponentHands < 33) {
        console.log('2 points for player')
        points = 2;
      } else {
        console.log('1 points for player')
        points = 1;
      }
      this.setState(prevState => ({
        isPlayerFirst: true,
        score: [prevState.score[0] + points, prevState.score[1]]
      }));
    } else {
      let points;
      if (this.state.playerHands == 0) {
        console.log('3 points for opponent')
        points = 3;
      } else if (this.state.opponentHands < 33) {
        console.log('2 points for opponent')
        points = 2;
      } else {
        console.log('1 points for opponent')
        points = 1;
      }
      this.setState(prevState => ({
        isPlayerFirst: false,
        score: [prevState.score[0], prevState.score[1] + points]
      }));
    }
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
        <NavLink to='/'>Go to Home Page</NavLink>
        <button onClick={this.handleGenerateDeck} className='btnStart'>START</button>
        <div className='score'>
          <p>You : Bot</p>
          <p>{this.state.score.join(' : ')}</p>
        </div>
        <div className='opponent'>
          {this.state.opponent && this.state.isPlaying ? this.state.opponent.map(a => {
            return <Card key={a} image={'back.png'} card={'back'} onClick={() => { return }} />
          }) : null}
        </div>

        <div className='center'>
          {this.state.isPlaying ?
            this.state.player.length > 0 && this.state.deck.length > 1 ?
              <img className={this.state.isClosed ? 'closed' : 'otherCards'} src={`/cards/back.png`}></img> :
              <img className='otherCards goUnder' src='/cards/empty.png'></img> : null}
          {this.state.isPlaying ?
            this.state.player.length > 0 && this.state.deck.length > 1 && this.state.isClosed == false ?
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
            this.state.deck.length > 3 &&
            this.state.isPlaying &&
            this.state.isClosed == false &&
            this.state.player.includes(this.state.specialNine[this.state.trump.suit]) ?
            <button onClick={() => this.stealTrump(this.state.specialNine[this.state.trump.suit])}>Steal trump card</button> :
            null}
          {this.state.isPlaying ?
            <button onClick={() => this.callEnd()}>Call 66</button> :
            null}
          {this.state.deck.length > 3 && this.state.isPlaying && this.state.isPlayerFirst == true && this.state.isClosed == false ?
            <button onClick={() => this.close()}>Close Deck</button> :
            null}

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
