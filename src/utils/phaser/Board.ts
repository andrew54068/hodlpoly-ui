import { Board as RexBoard } from 'phaser3-rex-plugins/plugins/board-components.js';
import { COLORMAP, BOARD_CELL_HEIGHT, BOARD_CELL_WIDTH, LAND_TAG_COLOR } from './constants';

// const createTileMap = function (tilesMap, out: string[] = []) {
//   if (out === undefined) {
//     out = [];
//   }
//   for (let i = 0, cnt = tilesMap.length; i < cnt; i++) {
//     out.push(tilesMap[i].split(''));
//   }
//   return out;
// }

const getQuadGrid = function (scene) {
  const grid = scene.rexBoard.add.quadGrid({
    x: 100,
    y: 100,
    cellWidth: BOARD_CELL_WIDTH,
    cellHeight: BOARD_CELL_HEIGHT,
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
  tilesSize: number = 0;

  constructor(scene, tiles) {
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
    this.tilesSize = tiles.length;
  }

  createBorderRectangle(scene, x, y, width, height, borderColor, borderWidth) {
    const graphics = scene.add.graphics();

    graphics.lineStyle(borderWidth, borderColor);

    // the origin of the rectangle is at left top
    graphics.strokeRect(x - width / 2, y - height / 2, width, height);

    graphics.setDepth(1);
  }


  createGradientRectangle(scene, x, y, width, height) {
    // create a canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    if (!ctx) return;

    const grd = ctx.createLinearGradient(0, 0, width, 0);
    grd?.addColorStop(0, "black");
    grd?.addColorStop(0.5, "black");
    grd?.addColorStop(1, "white");

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);

    // transform the canvas into a texture
    const textureKey = 'gradientTexture' + Date.now(); // generate a unique key
    scene.textures.addCanvas(textureKey, canvas);

    const sprite = scene.add.sprite(x, y, textureKey);
    sprite.setOrigin(0.5, 0.5); //set origin to the center of the sprite
    sprite.setDepth(1);

    return sprite;
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
          .setStrokeStyle(2, 0x000000, 1)
          .setData('cost', cost)
          .setDepth(1);

        // add land tag
        const worldXY = this.tileXYToWorldXY(tileX, tileY, true);
        const landTagWidth = BOARD_CELL_WIDTH
        const landTagHeight = BOARD_CELL_HEIGHT / 4

        this.createBorderRectangle(
          this.scene,
          worldXY.x,
          worldXY.y - BOARD_CELL_HEIGHT / 2 + landTagHeight / 2,
          landTagWidth,
          landTagHeight,
          '0x000000',
          2
        );

        // add image to grid
        // const worldXY = this.tileXYToWorldXY(tileX, tileY);
        // const image = this.scene.add.image(worldXY.x, worldXY.y, 'grass');
        // image.displayWidth = 50; 
        // image.displayHeight = 50;
      }
    }
    return this;
  }

  addLandTagToTile(tileX, tileY, width = BOARD_CELL_WIDTH, height = BOARD_CELL_HEIGHT / 4) {
    // get word position of the tile
    const worldXY = this.tileXYToWorldXY(tileX, tileY, true);


    this.createGradientRectangle(this.scene, worldXY.x, worldXY.y - BOARD_CELL_HEIGHT / 2 + height / 2, width, height);
  }
}
