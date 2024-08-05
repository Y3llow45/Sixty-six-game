function callEnd(game) {
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

module.exports = callEnd;