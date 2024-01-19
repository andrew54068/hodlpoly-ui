import Phaser from 'phaser'
import Board from './Board'
import ChessA from './ChessA'
import { TILESMAP } from './constants'

const Between = Phaser.Math.Between;

export default class Demo extends Phaser.Scene {
  constructor() {
    super({
      key: 'examples'
    })
  }

  preload() { }

  create() {
    const board = new Board(this, TILESMAP);
    const chessA = new ChessA(board, {
      x: 0,
      y: 0
    });

    const movingPointsTxt = this.add.text(10, 10, '');
    this.input.on('pointerdown', function (pointer) {
      console.log('pointer :', pointer);
      const movingPoints = Between(1, 6);
      movingPointsTxt.setText(`${movingPoints}`)
      chessA.moveForward(movingPoints);
    });

    this.add.text(0, 580, 'Click to move forward.')
  }
}