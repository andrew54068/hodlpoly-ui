import Phaser from 'phaser'
import Board from './Board'
import ChessA from './ChessA'
import {
  BOARD_CELL_HEIGHT,
  BOARD_CELL_WIDTH,
  CHESS_SPEED_NORMAL,
} from './constants'
import generateTilePath from 'src/utils/phaser/generateTilePath'


// const Between = Phaser.Math.Between;

export default class FomopolyMap extends Phaser.Scene {
  background?: Phaser.GameObjects.Image;
  isHeatMapMode: boolean = false;
  isSelectionMode: boolean = false;
  imageLoaded: boolean = false;
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
    this.load.image('avatar', '/avatar.svg')
      .once('filecomplete-image-avatar', () => {
        console.log(`✅ load image complete`);
        this.imageLoaded = true;
      }, this)
      .start();
  }

  createBoard(hoverEventHandler: any) {
    const {
      matrix: tilePath,
      matrixWithId: tilePathWithId,
      startPoint,
      endPoint,
      pathXY
    } = generateTilePath(this.landAmount)

    const board = new Board(this, tilePath, pathXY, tilePathWithId);
    board.setEventHandler(hoverEventHandler)
    this.board = board;
    this.pathXY = pathXY

    this.boardWidth = (this.board.tilesSize) * BOARD_CELL_WIDTH
    this.boardHeight = (this.board.tilesSize) * BOARD_CELL_HEIGHT

    this.displayWidth = this.scale.displaySize.width;
    this.displayHeight = this.scale.displaySize.height;

    const chessA = new ChessA(board, {
      startPoint,
      endPoint
    });

    this.chessA = chessA;
    const minZoom = this.setZoomToMinValue()

    const boundWidth = Math.max(window.innerWidth, board.width) / minZoom
    const boundHeight = Math.max(window.innerHeight, board.height) / minZoom
    this.cameras.main.setBounds(0, -50,
      boundWidth,
      boundHeight + 100
    );

    this.createGradientBackground(boundWidth, boundHeight);
  }

  create() {
    // this.add.text(10, 30, 'Roll the dice to move forward.')

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
      console.log(`wheel`);

      const minZoom = this.setZoomToMinValue(false)

      const camera = this.cameras.main;

      const worldPoint = camera.getWorldPoint(pointer.x, pointer.y);
      const newZoom = camera.zoom - camera.zoom * 0.001 * deltaY;
      camera.zoom = Phaser.Math.Clamp(newZoom, minZoom, 2);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      // Update camera matrix, so `getWorldPoint` returns zoom-adjusted coordinates.
      camera.preRender();
      const newWorldPoint = camera.getWorldPoint(pointer.x, pointer.y);
      // Scroll the camera to keep the pointer under the same world point.
      camera.scrollX -= newWorldPoint.x - worldPoint.x;
      camera.scrollY -= newWorldPoint.y - worldPoint.y;
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

  setZoomToMinValue(set: boolean = true) {
    let minZoom
    if (window.innerHeight > window.innerWidth) {
      // mobile
      minZoom = Math.min(
        this.displayWidth / this.boardWidth,
        this.boardWidth / this.displayWidth, 1) * 0.8
    } else {
      // desktop
      minZoom = Math.min(
        this.displayHeight / this.boardHeight,
        this.boardHeight / this.displayHeight, 1) * 0.8
    }

    if (set) {
      this.cameras.main.setZoom(minZoom);
    }
    return minZoom
  }

  private createGradientBackground(width, height): void {

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    if (ctx) {
      const grd = ctx.createLinearGradient(0, 0, 0, height);
      grd.addColorStop(0, 'black');
      grd.addColorStop(0.5786, 'rgba(158,168,137, 0.61)');
      grd.addColorStop(1, 'black');

      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, width, height);
    }

    const textureKey = 'gradientTextureForBackground' + Date.now(); // generate a unique key
    this.textures.addCanvas(textureKey, canvas);

    const sprite = this.add.sprite(0, 0, textureKey);
    sprite.setOrigin(0, 0); //set origin to the center of the sprite
    sprite.setDepth(0);
  }


  triggerMoveForward(movingPoints) {
    console.log(`💥 movingPoints: ${JSON.stringify(movingPoints, null, '  ')}`);
    if (this.chessA) {
      this.chessA.moveForward(movingPoints);
    }
  }

  setUserPositionBySteps(totalSteps: number) {
    if (this.chessA) {
      this.add.existing(this.chessA);
    }
    console.log(`setUserPositionBySteps`);
    if (this.chessA && this.board) {
      const userPosition = this.pathXY?.[totalSteps] ?? { x: 0, y: 0 }
      this.chessA.updateLocation(userPosition)
      const nextPosition = this.pathXY?.[totalSteps + 1] ?? { x: 0, y: 0 }
      const userDirection = this.board?.getNeighborTileDirection(userPosition, nextPosition);

      if (userDirection !== undefined && userDirection !== null) {
        this.chessA.monopoly.setFace(userDirection)
      }

      this.chessA.moveTo.once('complete', () => {
        this.chessA?.moveTo.setSpeed(CHESS_SPEED_NORMAL);
      })
    }
  }

  // worldTravelToTile (){}

  registerEventHandler(handler: any) {
    this.board?.setEventHandler(handler);
  }

  setLandAmount(landAmount, hoverEventHandler) {
    this.landAmount = landAmount
    if (this.board) {
      this.board.destroy()
    }
    if (this.imageLoaded) {
      this.createBoard(hoverEventHandler);
    } else {
      // create board after image loaded.
      const timerId = setInterval(() => { 
        if (this.imageLoaded) {
          this.createBoard(hoverEventHandler);
          clearInterval(timerId);
        }
      }, 100)
    }
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

  setSelectionMode(open) {
    this.isSelectionMode = open;
  }

  getSelectedTileId() {
    return Number(this.board?.selectedTileId) ?? -1;
  }

  closeSelectionMode() {
    this.isSelectionMode = false;
    if (this.board) {
      this.board.closeSelectionMode()
    }
  }
}