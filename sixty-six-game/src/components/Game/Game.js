import React, { Component } from 'react'

export default class Game extends Component {

  startGame = () => {
    console.log('start');
  }

  render() {
    return (
      <div>
        <button onClick={this.startGame}>START</button>
      </div>
    )
  }
}
