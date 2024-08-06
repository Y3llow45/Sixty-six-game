import Card from './Card/Card';
import './Game.css';
import Home from '../Home/Home';
import io from 'socket.io-client';
import { useState, useEffect } from 'react';

const socket = io('http://localhost:5243');

const Game = () => {
  const [opponentLength, setOpponentLength] = useState(6);
  const [score, setScore] = useState([0, 0]);
  const [deckLength, setDeckLength] = useState(12);
  const [player, setPlayer] = useState([]);
  const [trump, setTrump] = useState('trump');
  const [deck, setDeck] = useState([]);
  const [opponentHands, setOpponentHands] = useState(0);
  const [playerHands, setPlayerHands] = useState(0);
  const [opponentSelection, setOpponentSelection] = useState('');
  const [playerSelection, setPlayerSelection] = useState('');
  const [isPlayerFirst, setIsPlayerFirst] = useState(true);
  const [playerCardsClickable, setPlayerCardsClickable] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const cardMapping = [
    { image: '0.png', card: 'A', suit: 'h', points: 11 },
    { image: '1.png', card: '10', suit: 'h', points: 10 },
    { image: '2.png', card: 'K', suit: 'h', points: 4 },
    { image: '3.png', card: 'Q', suit: 'h', points: 3 },
    { image: '4.png', card: 'J', suit: 'h', points: 2 },
    { image: '5.png', card: '9', suit: 'h', points: 0.1 },
    { image: '6.png', card: 'A', suit: 'c', points: 11 },
    { image: '7.png', card: '10', suit: 'c', points: 10 },
    { image: '8.png', card: 'K', suit: 'c', points: 4 },
    { image: '9.png', card: 'Q', suit: 'c', points: 3 },
    { image: '10.png', card: 'J', suit: 'c', points: 2 },
    { image: '11.png', card: '9', suit: 'c', points: 0.1 },
    { image: '12.png', card: 'A', suit: 'd', points: 11 },
    { image: '13.png', card: '10', suit: 'd', points: 10 },
    { image: '14.png', card: 'K', suit: 'd', points: 4 },
    { image: '15.png', card: 'Q', suit: 'd', points: 3 },
    { image: '16.png', card: 'J', suit: 'd', points: 2 },
    { image: '17.png', card: '9', suit: 'd', points: 0.1 },
    { image: '18.png', card: 'A', suit: 's', points: 11 },
    { image: '19.png', card: '10', suit: 's', points: 10 },
    { image: '20.png', card: 'K', suit: 's', points: 4 },
    { image: '21.png', card: 'Q', suit: 's', points: 3 },
    { image: '22.png', card: 'J', suit: 's', points: 2 },
    { image: '23.png', card: '9', suit: 's', points: 0.1 }
  ];

  const specialNine = {
    'h': 5,
    'c': 11,
    'd': 17,
    's': 23,
  };

  const mirrage = {
    'h': [2, 3],
    'c': [8, 9],
    'd': [14, 15],
    's': [20, 21],
  };

  const mirrageCards = [2, 3, 8, 9, 14, 15, 20, 21];
  const [indexOfTrump, setIndexOfTrump] = useState(0);


  useEffect(() => {
    socket.on('trump', (data) => {
      console.log('trump received');
      console.log('data:', data);
      setTrump(data.trump);
    });

    return () => {
      socket.off('trump');
    };
  }, []);


  const handleCardClick = (cardIndex) => {
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
      removeCard(cardIndex);
    });
  };

  const removeCard = (cardIndex) => {
    let updated = this.state.player.filter(num => num !== cardIndex);
    this.setState({
      player: updated
    })
  }

  const logState = () => {
    console.log(this.state);
  }

  const stealTrump = (card) => {
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

  const close = () => {
    this.setState(() => {
      return {
        isClosed: true
      }
    }, () => {
      console.log(`closed!`)
    })
  }

  const callEnd = () => {
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

  return (
    <div className='game'>
      <Home />
      <p>Trump: {trump}</p>

      <div className='score'>
        <p>You : Bot</p>
        <p>{score.join(' : ')}</p>
      </div>

      <div className='opponent'>
        {isPlaying ? opponentLength.map(a => {  //opponent = number of cards opponent has. 6 by default
          return <Card key={a} image={'back.png'} card={'back'} onClick={() => { return }} />
        }) : null}
      </div>

      <div className='center'>
        {isPlaying ?
          player.length > 0 && deckLength > 1 ?   //change deck.length to decklength
            <img className={isClosed ? 'closed' : 'otherCards'} src={`/cards/back.png`}></img> :
            <img className='otherCards goUnder' src='/cards/empty.png'></img> : null}
        {isPlaying ?
          player.length > 0 && deckLength > 1 && isClosed == false ?
            <img className='trumpSuit' src={`/cards/${trump.image}`}></img> :
            <img className='otherCards goUnder' src='/cards/empty.png'></img> : null}

        {isPlaying ?
          opponentSelection === '' ?
            null :
            <img className='imgMargin' alt='card' src={`/cards/${cardMapping[opponentSelection].image}`} /> :
          null}
        {isPlaying ?
          playerSelection === '' ?
            null :
            <img className='imgMargin' alt='card' src={`/cards/${cardMapping[playerSelection].image}`} /> :
          null}

        {playerHands > 0 &&
          isPlayerFirst == true &&
          deckLength > 3 &&
          isPlaying &&
          isClosed == false &&
          player.includes(specialNine[trump.suit]) ?
          <button onClick={() => stealTrump(specialNine[trump.suit])}>Steal trump card</button> :
          null}
        {isPlaying ?
          <button onClick={() => callEnd()}>Call 66</button> :
          null}
        {deckLength > 3 && isPlaying && isPlayerFirst == true && isClosed == false ?
          <button onClick={() => close()}>Close Deck</button> :
          null}
        <button onClick={() => logState()}>Log State</button>
      </div>

      <div className='player'>
        {isPlaying ? player.map(cardIndex => {
          const card = cardMapping[cardIndex];
          return <Card key={cardIndex} image={card.image} card={card.card} clickable={playerCardsClickable} onClick={() => handleCardClick(cardIndex)} />
        }) : null}
      </div>
    </div>
  )
}

export default Game;