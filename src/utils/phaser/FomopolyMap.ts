import Phaser from 'phaser'
import Board from './Board'
import ChessA from './ChessA'
import Background from 'src/assets/background.svg'
import {
  CHESS_SPEED_FAST,
  BOARD_CELL_HEIGHT,
  BOARD_CELL_WIDTH,
  CHESS_SPEED_NORMAL,
  // LAND_TAG_COLOR,
  // HEATMAP_COLORS
} from './constants'
import generateTilePath from 'src/utils/phaser/generateTilePath'


// const Between = Phaser.Math.Between;

export default class FomopolyMap extends Phaser.Scene {
  background?: Phaser.GameObjects.Image;
  isHeatMapMode: boolean = false;
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
  pathXY?: { x: number, y: number }[];

  constructor() {
    super({
      key: 'fomopolyMap'
    })
  }

  preload() {
    this.load.image('background', Background);
  }

  createBoard() {
    const {
      matrix: tilePath,
      startPoint,
      endPoint,
      pathXY
    } = generateTilePath(this.landAmount)

    const board = new Board(this, tilePath, pathXY);
    this.board = board;
    this.pathXY = pathXY


    this.boardWidth = (this.board.tilesSize) * BOARD_CELL_WIDTH
    this.boardHeight = (this.board.tilesSize) * BOARD_CELL_HEIGHT

    this.displayWidth = this.scale.displaySize.width;
    this.displayHeight = this.scale.displaySize.height;

    const minZoom = Math.min(
      this.displayHeight / this.boardHeight,
      this.boardHeight / this.displayHeight, 1)

    this.cameras.main.setBounds(0, 0,
      Math.max(this.boardWidth / minZoom, window.innerWidth / minZoom),
      Math.max(this.boardHeight / minZoom, window.innerHeight / minZoom));

    const chessA = new ChessA(board, {
      startPoint,
      endPoint
    });

    this.chessA = chessA;
    this.setZoomToMinValue()
  }

  create() {
    this.add.text(10, 30, 'Roll the dice to move forward.')

    // add background
    this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    this.resizeBackgroundImage();


    this.input.on('pointerdown', (pointer) => {
      // Move the chess
      // movingPointsTxt.setText(`${movingPoints}`)
      // const movingPoints = Between(1, 6);
      // this.chessA?.moveForward(movingPoints);

      // set pointer position 
      this.dragStartX = pointer.x;
      this.dragStartY = pointer.y;

    });

    this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY) => {
      let zoom = this.cameras.main.zoom + deltaY * -0.001;

      const minZoom = Math.min(
        this.displayHeight / this.boardHeight,
        this.boardHeight / this.displayHeight, 1)

      zoom = Phaser.Math.Clamp(zoom, minZoom, 2); // Set minimum and maximum zoom levels
      this.cameras.main.setZoom(zoom);
    });

    // for drag and scrolling
    this.input.on('pointermove', (pointer) => {
      if (pointer.isDown) {
        this.cameras.main.scrollX -= (pointer.x - this.dragStartX);
        this.cameras.main.scrollY -= (pointer.y - this.dragStartY);

        this.dragStartX = pointer.x;
        this.dragStartY = pointer.y;
      }

    }, this);
  }

  setZoomToMinValue() {
    const minZoom = Math.min(
      this.displayHeight / this.boardHeight,
      this.boardHeight / this.displayHeight, 1)
    console.log('this.boardHeight :', this.boardHeight);
    console.log('this.displayHeight :', this.displayHeight);
    console.log('minZoom :', minZoom);

    this.cameras.main.setZoom(minZoom);
  }

  resizeBackgroundImage() {
    const minZoom = Math.min(
      this.displayHeight / this.boardHeight,
      this.boardHeight / this.displayHeight, 1)

    const width = this.cameras.main.width / minZoom;
    const height = this.cameras.main.height / minZoom;

    // calculate scale ratio
    const scaleX = width / (this.background?.displayWidth ?? 1);
    const scaleY = height / (this.background?.displayHeight ?? 1);
    const maxScale = Math.max(scaleX, scaleY);

    this.background?.setScale(maxScale);
  }

  triggerMoveForward(movingPoints) {
    if (this.chessA) {
      this.chessA.moveForward(movingPoints);
    }
  }

  setUserPositionBySteps(totalSteps: number) {
    if (this.chessA) {
      this.chessA.moveTo.setSpeed(CHESS_SPEED_FAST);
      const userPosition = this.pathXY?.[totalSteps] ?? { x: 0, y: 0 }
      const nextPosition = this.pathXY?.[totalSteps + 1] ?? { x: 0, y: 0 }
      const userDirection = this.board?.getNeighborTileDirection(userPosition, nextPosition);
      this.chessA.moveTo.moveTo(userPosition.x, userPosition.y);

      if (userDirection !== undefined && userDirection !== null) {
        this.chessA.monopoly.setFace(userDirection)
      }

      this.chessA.moveTo.once('complete', () => {
        this.chessA?.moveTo.setSpeed(CHESS_SPEED_NORMAL);
      })
    }
  }

  // worldTravelToTile (){}

  setLandAmount(landAmount) {
    this.landAmount = landAmount
    if (this.board) {
      this.board.destroy()
    }
    this.createBoard()
  }

  setOwnedLandTags(ownedLands) {
    if (this.board) {
      for (let i = 0; i < ownedLands.length; i++) {
        const tagXY = this.pathXY?.[ownedLands[i]]
        if (!tagXY) continue;

        this.board.addLandTagToTile(tagXY.x, tagXY.y);
      }
    }
  }

  setHeatMapMode(open, heatMapSteps) {
    this.isHeatMapMode = open;
    if (this.isHeatMapMode && this.board) {
      this.board.openHeatMapMode(heatMapSteps);
    } else if (this.board) {
      this.board.closeHeatMapMode()
    }
  }
}