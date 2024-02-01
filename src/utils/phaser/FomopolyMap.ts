import Phaser from 'phaser'
import Board from './Board'
import ChessA from './ChessA'
import { BOARD_CELL_HEIGHT, BOARD_CELL_WIDTH, GAME_HEIGHT } from './constants'
import generateTilePath from 'src/utils/phaser/generateTilePath'

const Between = Phaser.Math.Between;

export default class FomopolyMap extends Phaser.Scene {
  landAmount: number = 1;
  dragStartX: number = 0;
  dragStartY: number = 0;
  // displayed canvas size
  displayWidth: number = 0;
  displayHeight: number = 0;
  // actual game area
  boardWidth: number = 0;
  boardHeight: number = 0;
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
    this.displayWidth = this.scale.displaySize.width;
    this.displayHeight = this.scale.displaySize.height;

    this.boardWidth = (this.board.tilesSize) * BOARD_CELL_WIDTH
    this.boardHeight = (this.board.tilesSize) * BOARD_CELL_HEIGHT
    this.cameras.main.setBounds(0, 0, this.boardWidth, this.boardHeight);

    const chessA = new ChessA(board, {
      startPoint,
      endPoint
    });

    this.chessA = chessA;
  }

  create() {

    const movingPointsTxt = this.add.text(10, 10, 'yolo');
    this.add.text(10, 30, 'Click to move forward.')

    // this.scale.parentSize.width
    console.log('this.scale :', this.scale);

    this.input.on('pointerdown', (pointer) => {
      console.log('pointer :', pointer);
      const movingPoints = Between(1, 6);
      movingPointsTxt.setText(`${movingPoints}`)
      this.chessA?.moveForward(movingPoints);

      // set pointer position 
      this.dragStartX = pointer.x;
      this.dragStartY = pointer.y;
    });

    this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY) => {
      let zoom = this.cameras.main.zoom + deltaY * -0.001;

      const minZoom = Math.min(this.displayHeight / this.boardHeight, this.boardHeight / this.displayHeight, 1)
      zoom = Phaser.Math.Clamp(zoom, minZoom / (this.displayHeight / GAME_HEIGHT), 1); // Set minimum and maximum zoom levels
      this.cameras.main.setZoom(zoom);
    });

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