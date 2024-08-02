const handleGenerateDeck = () => {
  const shuffledDeck = generateShuffledDeck();
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
    if (!this.state.isPlayerFirst) {
      this.opponentTurn();
    }
  });
};

module.exports = handleGenerateDeck;