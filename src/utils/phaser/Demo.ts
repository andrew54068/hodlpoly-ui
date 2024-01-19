import Phaser from 'phaser'
import Board from './Board'
import ChessA from './ChessA'
import { TILESMAP } from './constants'

const Between = Phaser.Math.Between;

export default class Demo extends Phaser.Scene {
  dragStartX: number = 0;
  dragStartY: number = 0;

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

    const movingPointsTxt = this.add.text(10, 10, 'yolo');

    this.input.on('pointerdown', (pointer) => {
      console.log('pointer :', pointer);
      const movingPoints = Between(1, 6);
      movingPointsTxt.setText(`${movingPoints}`)
      chessA.moveForward(movingPoints);

      // set pointer position 
      this.dragStartX = pointer.worldX;
      this.dragStartY = pointer.worldY;
    });

    this.cameras.main.setBounds(-800, -600, 1600, 1200);


    this.input.on('pointermove', (pointer) => {
      if (pointer.isDown) {
        const newScrollX = this.cameras.main.scrollX + this.dragStartX - pointer.worldX;
        const newScrollY = this.cameras.main.scrollY + this.dragStartY - pointer.worldY;

        // 使用 Lerp 函數進行平滑處理
        this.cameras.main.scrollX = Phaser.Math.Linear(this.cameras.main.scrollX, newScrollX, 0.5);
        this.cameras.main.scrollY = Phaser.Math.Linear(this.cameras.main.scrollY, newScrollY, 0.5);

        this.dragStartX = pointer.worldX;
        this.dragStartY = pointer.worldY;
      }
    }, this);


    this.add.text(0, 580, 'Click to move forward.')
  }
}