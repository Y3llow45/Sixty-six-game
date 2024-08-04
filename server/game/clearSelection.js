function clearSelection(option, playerPoints, opponentPoints) {
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

module.exports = clearSelection