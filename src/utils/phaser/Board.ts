import { Board as RexBoard } from 'phaser3-rex-plugins/plugins/board-components.js';
import { TILESMAP, COLORMAP } from './constants';

const createTileMap = function (tilesMap, out: string[] = []) {
  if (out === undefined) {
    out = [];
  }
  for (let i = 0, cnt = tilesMap.length; i < cnt; i++) {
    out.push(tilesMap[i].split(''));
  }
  return out;
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




export default class Board extends RexBoard {
  // tilesMap
  constructor(scene, tilesMap) {
    console.log('tilesMap :', tilesMap);
    const tiles = createTileMap(TILESMAP);
    console.log('tiles :', tiles);
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
