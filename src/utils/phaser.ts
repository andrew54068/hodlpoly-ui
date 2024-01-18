import Phaser from 'phaser'
import BoardPlugin from 'phaser3-rex-plugins/plugins/board-plugin.js';
import { Board as RexBoard, Shape as RexShape, Monopoly, MoveTo } from 'phaser3-rex-plugins/plugins/board-components.js';
import ChessData from 'phaser3-rex-plugins/plugins/board/chess/ChessData';

const TILESMAP = [
  '1111111',
  '1     1',
  '1     1',
  '1     1',
  '1     1',
  '1     1',
  '1111111'
];

declare module 'phaser' {
  interface Scene {
    rexBoard: BoardPlugin;
  }
}

const createTileMap = function (tilesMap, out: string[] = []) {
  if (out === undefined) {
    out = [];
  }
  for (let i = 0, cnt = tilesMap.length; i < cnt; i++) {
    out.push(tilesMap[i].split(''));
  }
  return out;
}

interface IChessA {
  monopoly: Monopoly;
  moveTo: MoveTo;
}


const Between = Phaser.Math.Between;
class Demo extends Phaser.Scene {
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

const COLORMAP = [0x087f23, 0x4caf50];
class Board extends RexBoard {
  // tilesMap
  constructor(scene, tilesMap) {
    console.log('tilesMap :', tilesMap);
    const tiles = createTileMap(TILESMAP);
    // create board
    const config = {
      // grid: getHexagonGrid(scene),
      grid: getQuadGrid(scene),
      width: tiles[0].length,
      height: tiles.length,
      // wrap: true
    }
    super(scene, config);
    this.createPath(tiles);
  }

  createPath(tiles) {
    // tiles : 2d array
    let line, symbol, cost;
    for (let tileY = 0, ycnt = tiles.length; tileY < ycnt; tileY++) {
      line = tiles[tileY];
      for (let tileX = 0, xcnt = line.length; tileX < xcnt; tileX++) {
        symbol = line[tileX];
        if (symbol === ' ') {
          continue;
        }

        cost = parseFloat(symbol);
        this.scene.rexBoard.add.shape(this, tileX, tileY, 0, COLORMAP[cost])
          .setStrokeStyle(1, 0xffffff, 1)
          .setData('cost', cost);
      }
    }
    return this;
  }
}

class ChessA extends RexShape implements IChessA {
  monopoly: Monopoly<Phaser.GameObjects.GameObject>;
  moveTo: MoveTo<Phaser.GameObjects.GameObject>;
  movingPathTiles: Phaser.GameObjects.GameObject[];
  // rexChess: ChessData

  constructor(board, tileXY) {
    const scene = board.scene;
    console.log('scene :', scene);
    console.log('board :', board);
    if (tileXY === undefined) {
      tileXY = board.getRandomEmptyTileXY(0);
    }
    // Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard)
    super(board, tileXY.x, tileXY.y, 1, 0x3f51b5);
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
    const board = this.rexChess.board;

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

const getQuadGrid = function (scene) {
  const grid = scene.rexBoard.add.quadGrid({
    x: 100,
    y: 100,
    cellWidth: 50,
    cellHeight: 50,
    type: 0
  });
  return grid;
}

// const getHexagonGrid = function (scene) {
//   const staggeraxis = 'x';
//   const staggerindex = 'odd';
//   const grid = scene.rexBoard.add.hexagonGrid({
//     x: 100,
//     y: 100,
//     size: 30,
//     staggeraxis: staggeraxis,
//     staggerindex: staggerindex
//   })
//   return grid;
// };


const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: Demo,
  plugins: {
    scene: [{
      key: 'rexBoard',
      plugin: BoardPlugin,
      mapping: 'rexBoard'
    }]
  }
};



export const game = new Phaser.Game(config);