import Phaser from 'phaser';
import { Shape as RexShape, Monopoly, MoveTo } from 'phaser3-rex-plugins/plugins/board-components.js';

interface IChessA {
  monopoly: Monopoly;
  moveTo: MoveTo;
}

export default class ChessA extends RexShape implements IChessA {
  monopoly: Monopoly<Phaser.GameObjects.GameObject>;
  moveTo: MoveTo<Phaser.GameObjects.GameObject>;
  movingPathTiles: Phaser.GameObjects.GameObject[];
  startPoint = { x: 0, y: 0 };
  endPoint = { x: 0, y: 0 };
  currentPoint = { x: 0, y: 0 };
  [key: string]: any;

  constructor(board, {
    startPoint,
    endPoint
  }) {

    console.log('startPoint :', startPoint);
    console.log('endPoint :', endPoint);

    const scene = board.scene;

    if (startPoint === undefined) {
      startPoint = board.getRandomEmptyTileXY(0);
    }

    // Shape(board, startPoint.x, startPoint.y, startPoint.z, fillColor, fillAlpha, addToBoard)
    super(board, startPoint.x, startPoint.y, 1, 0x3f51b5);

    this.startPoint = startPoint;
    this.currentPoint = startPoint;
    this.endPoint = endPoint;

    scene.add.existing(this);
    this.setScale(0.9);

    // add behaviors        
    this.monopoly = scene.rexBoard.add.monopoly(this, {
      face: 0,
      pathTileZ: 0,
      costCallback: function (curTileXY, preTileXY, monopoly) {
        const board = monopoly.board;
        return board.tileXYZToChess(curTileXY.x, curTileXY.y, 0).getData('cost');
      },
    });
    this.moveTo = scene.rexBoard.add.moveTo(this);

    // private members
    this.movingPathTiles = [];
  }

  showMovingPath(tileXYArray) {
    this.hideMovingPath();
    let tileXY, worldXY;
    const scene = this.scene
    const board = this.rexChess?.board;

    if (!board) return

    for (let i = 0, cnt = tileXYArray.length; i < cnt; i++) {
      tileXY = tileXYArray[i];
      worldXY = board.tileXYToWorldXY(tileXY.x, tileXY.y, true);
      this.movingPathTiles.push(scene.add.circle(worldXY.x, worldXY.y, 10, 0xb0003a));
    }
  }

  hideMovingPath() {
    for (let i = 0, cnt = this.movingPathTiles.length; i < cnt; i++) {
      this.movingPathTiles[i].destroy();
    }
    this.movingPathTiles.length = 0;
    return this;
  }

  moveForward(movingPoints) {
    if (this.moveTo.isRunning) {
      return this;
    }

    const path = this.monopoly.getPath(movingPoints);
    this.showMovingPath(path);
    console.log('this.movingPathTiles', this.movingPathTiles)
    this.moveAlongPath(path);
    return this;
  }

  checkIsEnd(tileXY) {
    return (this.endPoint.x === tileXY.x && this.endPoint.y === tileXY.y)
  }

  moveAlongPath(path) {
    if (path.length === 0) {
      return;
    }


    this.moveTo.once('complete', ({ currentPoint }) => {
      console.log('currentPoint :', currentPoint);
      // const [nextTile] = path;


      if (currentPoint.x === this.startPoint.x && currentPoint.y === this.startPoint.y) {
        this.setVisible(true);
      }


      if (this.checkIsEnd(currentPoint)) {
        console.log('the end')
        console.log('this :', this);

        this.setVisible(false);
        // stop moving
        this.currentPoint = this.startPoint;
        path = []

        return this.moveAlongPath([this.startPoint]);
      }

      if (path.length === 0) return
      this.moveAlongPath(path);
    }, this);

    const nextTile = path.shift();
    this.currentPoint = nextTile;

    this.moveTo.moveTo(nextTile);
    this.monopoly.setFace(this.moveTo.destinationDirection);
    return this;
  }
}
