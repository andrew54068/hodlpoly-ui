import Phaser from 'phaser'
import Board from './Board'
import ChessA from './ChessA'
import generateTilePath from 'src/utils/phaser/generateTilePath'


const Between = Phaser.Math.Between;

export default class FomopolyMap extends Phaser.Scene {
  landAmount: number = 1;
  dragStartX: number = 0;
  dragStartY: number = 0;
  chessA?: ChessA;
  board?: Board;

  constructor() {
    super({
      key: 'fomopolyMap'
    })
  }

  preload() {
    this.load.image('grass', 'src/assets/grass.png');
  }

  createBoard() {
    const {
      matrix: tilePath,
      startPoint,
      endPoint
    } = generateTilePath(this.landAmount)

    const board = new Board(this, tilePath);
    this.board = board;

    const chessA = new ChessA(board, {
      startPoint,
      endPoint
    });

    this.chessA = chessA;
  }

  create() {

    const movingPointsTxt = this.add.text(10, 10, 'yolo');

    this.input.on('pointerdown', (pointer) => {
      console.log('pointer :', pointer);
      const movingPoints = Between(1, 6);
      movingPointsTxt.setText(`${movingPoints}`)
      this.chessA?.moveForward(movingPoints);

      // set pointer position 
      this.dragStartX = pointer.x;
      this.dragStartY = pointer.y;
    });

    this.cameras.main.setBounds(0, 0, 1000, 1000);


    // const canvas = this.game.canvas;
    // const hammer = new Hammer(canvas);
    // hammer.get('pinch').set({ enable: true });

    // hammer.on('pinch', (event) => {
    //   console.log('event :', event);
    //   // zooming logic
    //   const scale = event.scale;
    //   this.cameras.main.zoom = scale;
    // });

    // for drag and scrolling
    this.input.on('pointermove', (pointer) => {
      if (!pointer.isDown) return;

      this.cameras.main.scrollX -= (pointer.x - this.dragStartX);
      this.cameras.main.scrollY -= (pointer.y - this.dragStartY);

      this.dragStartX = pointer.x;
      this.dragStartY = pointer.y;
    }, this);


    this.add.text(0, 580, 'Click to move forward.')
  }

  triggerMoveForward(movingPoints) {
    if (this.chessA) {
      this.chessA.moveForward(movingPoints);
    }
  }

  moveToOrigin() {
    if (this.chessA) {
      this.chessA.moveTo.moveTo({ x: 0, y: 0 });
    }
  }

  setLandAmount(landAmount) {
    this.landAmount = landAmount
    if (this.board) {
      this.board.destroy()
    }
    this.createBoard()
  }
}