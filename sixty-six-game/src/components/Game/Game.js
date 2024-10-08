import Card from './Card/Card';
import './Game.css';
import Home from '../Home/Home';
import socket from '../../services/socket';
import { useState, useEffect, useRef } from 'react';

const Game = () => {
  const [opponentLength, setOpponentLength] = useState(6);
  const [score, setScore] = useState([0, 0]);
  const [deckLength, setDeckLength] = useState(12);
  const [player, setPlayer] = useState([]);
  const [trump, setTrump] = useState('');
  const [playerHands, setPlayerHands] = useState(0);
  const [opponentSelection, setOpponentSelection] = useState('');
  const [playerSelection, setPlayerSelection] = useState('');
  const [isPlayerFirst, setIsPlayerFirst] = useState(true);
  const [playerCardsClickable, setPlayerCardsClickable] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [room, setRoom] = useState('');
  const [isAdmin, setIsAdmin] = useState();
  const [showRestart, setShowRestart] = useState(false);

  const homeRef = useRef();

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

  useEffect(() => {
    socket.on('setTrump', (data) => {
      console.log(`setTrump ${data.trump}`)
      setTrump(data.trump);
      setDeckLength(12);
      setIsPlaying(true);
      setIsClosed(false);
    });

    socket.on('cards', (data) => {
      setPlayer(data.player);
      setOpponentLength(data.opponent);
      setOpponentSelection('');
      setPlayerSelection('');
    });

    socket.on('playerCardsClickable', (arg1) => {
      setPlayerCardsClickable(arg1);
    });

    socket.on('opponentSelection', (arg1) => {
      setOpponentSelection(arg1);
    });

    socket.on('hands', (points) => {
      setPlayerHands(playerHands + points);
    });

    socket.on('deckLength', (arg1) => {
      setDeckLength(arg1);
    })

    socket.on('end', (arg1) => {
      console.log(`score: ${arg1} and type: ${typeof (arg1)}`);
      setIsPlaying(false);
      setScore(arg1);
      setShowRestart(true);
      setOpponentLength(0);
      setPlayerSelection('');
      setOpponentSelection('');
      setPlayer([]);
      setTrump('');
    })

    socket.on('close', () => {
      setIsClosed(true);
    });

    return () => {
      socket.off('init');
      socket.off('cards');
      socket.off('playerCardsClickable');
      socket.off('opponentSelection');
      socket.off('hands');
      socket.off('deckLength');
      socket.off('end');
      socket.off('close');
    };
  }, []);

  const cleanOnLeave = () => {
    setOpponentLength(6);
    setScore([0, 0]);
    setDeckLength(12);
    setPlayer([]);
    setTrump('trump');
    setPlayerHands(0);
    setOpponentSelection('');
    setPlayerSelection('');
    setIsPlayerFirst(true);
    setPlayerCardsClickable(false);
    setIsPlaying(false);
    setIsClosed(false);
    setRoom('');
    setIsAdmin(false);
    setShowRestart(false);
  }

  const handleCardClick = (cardIndex) => {
    if (!playerCardsClickable) {
      return;
    }
    setPlayerSelection(cardIndex)
    setPlayerCardsClickable(false)
    remove(cardIndex);
    socket.emit('click', { cardIndex, room, isAdmin });
  };

  const stealTrump = (card) => {
    socket.emit('stealTrump', { card, room, isAdmin });
  }

  const close = () => {
    setIsClosed(true);
    if (!playerCardsClickable) {
      return;
    }
    socket.emit('close', { room, isAdmin });
  }

  const callEnd = () => {
    setIsPlaying(false);
    socket.emit('callEnd', { room, isAdmin });
  }

  const setDataFromChild = (room, isAdmin) => {
    setRoom(room);
    setIsAdmin(isAdmin);
    console.log(`send data from child: ${room}, ${isAdmin}`)
  }

  const remove = (cardIndex) => {
    let updated = player.filter(num => num !== cardIndex);
    setPlayer(updated);
  }

  const newGame = () => {
    setIsPlaying(true)
    socket.emit('start', room, isAdmin);
    setDeckLength(12);
    setShowRestart(false);
  }

  return (
    <div className='game'>
      <Home ref={homeRef} sendDataToParent={setDataFromChild} cleanOnLeave={cleanOnLeave} />
      <div className='score'>
        <p>You : Opponent</p>
        <p>{isAdmin ? score.join(' - ') : score.slice().reverse().join(' - ')}</p>
      </div>

      <div className='opponent'>
        {isPlaying ? Array.from({ length: opponentLength }, (_, index) => (
          <Card key={index} image={'back.png'} card={'back'} onClick={() => { }} />
        )) : null}
      </div>

      <div className='center'>
        {isPlaying ?
          player.length > 0 && deckLength > 1 ?
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
      </div>

      {showRestart && isAdmin ?
        <button onClick={() => newGame()}>New game</button> : null
      }

      <div className='player'>
        {isPlaying && player.length > 0 ? player.map(cardIndex => {
          const card = cardMapping[cardIndex];
          return <Card key={cardIndex} image={card.image} card={card.card} clickable={playerCardsClickable} onClick={() => handleCardClick(cardIndex)} />
        }) : null}
      </div>
    </div>
  )
}

export default Game;