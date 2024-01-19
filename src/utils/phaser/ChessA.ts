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
  [key: string]: any;

  constructor(board, tileXY) {
    const scene = board.scene;
    if (tileXY === undefined) {
      tileXY = board.getRandomEmptyTileXY(0);
    }
    // Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard)
    super(board, tileXY.x, tileXY.y, 1, 0x3f51b5);
    scene.add.existing(this);
    this.setScale(0.9);

    // add behaviors        
    console.log('add behaviors :');
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
    this.moveAlongPath(path);
    return this;
  }

  moveAlongPath(path) {
    if (path.length === 0) {
      return;
    }

    this.moveTo.once('complete', () => {
      this.moveAlongPath(path);
    }, this);
    const tileData = path.shift();
    this.moveTo.moveTo(tileData);
    this.monopoly.setFace(this.moveTo.destinationDirection);
    return this;
  }
}
