import { Board as RexBoard } from "phaser3-daw-plugins/plugins/board-components.js";
import FomopolyMap from "./FomopolyMap";
import {
  HEATMAP_COLORS,
  BOARD_CELL_HEIGHT,
  BOARD_CELL_WIDTH,
  HIGHLIGHT_BORDER_COLOR,
  TILE_BOARDER_COLOR,
} from "./constants";
import { TopBarHeight, outterSharedMargin } from "src/components/MainPage";

// const createTileMap = function (tilesMap, out: string[] = []) {
//   if (out === undefined) {
//     out = [];
//   }
//   for (let i = 0, cnt = tilesMap.length; i < cnt; i++) {
//     out.push(tilesMap[i].split(''));
//   }
//   return out;
// }

const getQuadGrid = function (scene, tileLength) {
  const boardWidth = BOARD_CELL_WIDTH * tileLength;
  const boardHeight = BOARD_CELL_HEIGHT * tileLength;

  const displayWidth = scene.scale.displaySize.width;
  const displayHeight = scene.scale.displaySize.height;

  let minZoom;
  if (window.innerHeight > window.innerWidth) {
    // mobile
    minZoom =
      Math.min(displayWidth / boardWidth, boardWidth / displayWidth, 1) * 0.8;
  } else {
    // desktop
    minZoom =
      Math.min(displayHeight / boardHeight, boardHeight / displayHeight, 1) *
      0.8;
  }

  const x = (window.innerWidth - boardWidth * minZoom) / 2;
  const y = (window.innerHeight - boardHeight * minZoom) / 2;

  const grid = scene.rexBoard.add.quadGrid({
    x: x / minZoom,
    y: y / minZoom + TopBarHeight[1] + outterSharedMargin[1],
    cellWidth: BOARD_CELL_WIDTH,
    cellHeight: BOARD_CELL_HEIGHT,
    type: 0,
  });
  return grid;
};

export default class Board extends RexBoard {
  pathXY?: { x: number; y: number }[];
  tilesSize: number = 0;
  tilePathWithId: string[][] = [];
  heatMapShapes: any[] = [];
  prevHighlightGraphics?: Phaser.GameObjects.Graphics[] = undefined;
  selectedTileId = "";
  hoverEventHandler: (
    hover: boolean,
    x: number,
    y: number,
    currentTileId: string
  ) => void = () => {};

  constructor(scene, tiles, pathXY, tilePathWithId) {
    // create board
    const config = {
      // grid: getHexagonGrid(scene),
      grid: getQuadGrid(scene, tiles.length),
      width: tiles[0].length,
      height: tiles.length,

      // wrap: true
    };
    super(scene, config);
    this.scene = scene;
    this.createPath(tiles);
    this.pathXY = pathXY;
    this.tilePathWithId = tilePathWithId;
    this.tilesSize = tiles.length;

    this.scene.input.topOnly = true;
  }

  createBorderRectangle(
    scene,
    x,
    y,
    width,
    height,
    borderColor,
    borderWidth
  ): Phaser.GameObjects.Graphics {
    const graphics = scene.add.graphics();

    graphics.lineStyle(borderWidth, borderColor);

    // the origin of the rectangle is at left top
    graphics.strokeRect(x - width / 2, y - height / 2, width, height);

    graphics.setDepth(3);

    return graphics;
  }

  createFilledRectangle(
    scene,
    x,
    y,
    width,
    height,
    borderColor,
    borderWidth
  ): Phaser.GameObjects.Graphics {
    console.log(`createFilledRectangle`);
    const graphics = scene.add.graphics();

    graphics.lineStyle(borderWidth, borderColor);

    graphics.fillStyle(HIGHLIGHT_BORDER_COLOR, 1)
    graphics.fillRoundedRect(x - width / 2, y - height / 2, width, height, 0)

    // the origin of the rectangle is at left top
    graphics.strokeRect(x - width / 2, y - height / 2, width, height);

    graphics.setDepth(3);

    return graphics;
  }

  createLandTagRectangle(scene, x, y) {
    const width = BOARD_CELL_WIDTH;
    const landTagHeight = BOARD_CELL_HEIGHT / 4;
    const landHighLightHeight = (BOARD_CELL_HEIGHT * 3) / 4;
    // create a canvas
    const landTagCanvas = document.createElement("canvas");
    const landHighLightCanvas = document.createElement("canvas");

    const ctx = landTagCanvas.getContext("2d");
    landTagCanvas.width = width;
    landTagCanvas.height = landTagHeight;

    const landHighLightCtx = landHighLightCanvas.getContext("2d");
    landHighLightCanvas.width = width;
    landHighLightCanvas.height = landHighLightHeight;

    if (!ctx || !landHighLightCtx) return;

    ctx.fillStyle = `#FCFC54`;
    ctx.fillRect(0, 0, width, landTagHeight);

    landHighLightCtx.fillStyle = `#9EA889`;
    landHighLightCtx.fillRect(0, 0, width, landHighLightHeight);

    // transform the canvas into a texture
    const landTagKey = "landTagTexture" + Date.now();
    const landTagHighlightKey = "landTagHighLight" + Date.now();

    scene.textures.addCanvas(landTagKey, landTagCanvas);
    scene.textures.addCanvas(landTagHighlightKey, landHighLightCanvas);

    // 0,0 is at the left top of the canvas
    const landTagSprite = scene.add.sprite(
      x - BOARD_CELL_WIDTH / 2,
      y - BOARD_CELL_HEIGHT / 2,
      landTagKey
    );
    const landHighLightSprite = scene.add.sprite(
      x - BOARD_CELL_WIDTH / 2,
      y - BOARD_CELL_HEIGHT / 2 + landTagHeight,
      landTagHighlightKey
    );

    // 0,0 is at the center of the board tile
    landTagSprite.setOrigin(0, 0);
    landTagSprite.setDepth(3);

    landHighLightSprite.setOrigin(0, 0);
    landHighLightSprite.setDepth(3);

    return {
      landTagSprite,
      landHighLightSprite,
    };
  }

  highlightTile(tileX, tileY) {
    console.log(`highlightTile`);
    const scene = this.scene;
    const highlightBorderWidth = 2;
    const worldXY = this.tileXYToWorldXY(tileX, tileY, true);

    const landTag = this.createFilledRectangle(
      scene,
      worldXY.x,
      worldXY.y - BOARD_CELL_HEIGHT / 2 + BOARD_CELL_HEIGHT / 8,
      BOARD_CELL_WIDTH,
      BOARD_CELL_HEIGHT / 4,
      HIGHLIGHT_BORDER_COLOR,
      highlightBorderWidth
    ).setDepth(3);

    const mainREctangle = this.createFilledRectangle(
      scene,
      worldXY.x,
      worldXY.y,
      BOARD_CELL_WIDTH,
      BOARD_CELL_HEIGHT,
      HIGHLIGHT_BORDER_COLOR,
      highlightBorderWidth
    ).setDepth(3);

    return {
      landTag,
      mainREctangle,
    };
  }

  highLightTileForSelection(tileX, tileY) {
    if (this.prevHighlightGraphics?.length) {
      this.prevHighlightGraphics.forEach((graphic) => graphic.destroy());
      this.prevHighlightGraphics = [];
    }

    const { landTag: prevLandTag, mainREctangle: prevMainRectangle } =
      this.highlightTile(tileX, tileY);
 
    if (this.prevHighlightGraphics) {
      this.prevHighlightGraphics.push(prevLandTag, prevMainRectangle);
    } else {
      this.prevHighlightGraphics = [prevLandTag, prevMainRectangle];
    }
  }

  setEventHandler(
    handler: (
      hover: boolean,
      x: number,
      y: number,
      currentTileId: string
    ) => void
  ) {
    this.hoverEventHandler = handler;
  }

  createPath(tiles) {
    // tiles : 2d array
    let line, symbol, cost;
    for (let tileY = 0, ycnt = tiles.length; tileY < ycnt; tileY++) {
      line = tiles[tileY];
      for (let tileX = 0, xcnt = line.length; tileX < xcnt; tileX++) {
        symbol = line[tileX];
        if (symbol === " ") {
          continue;
        }

        cost = parseFloat(symbol);
        const tileRectangle = this.scene.rexBoard.add
          .shape(this, tileX, tileY, 0)
          .setStrokeStyle(4, TILE_BOARDER_COLOR, 1)
          .setData("cost", cost)
          .setInteractive()
          .setDepth(3);

        // add land tag
        const worldXY = this.tileXYToWorldXY(tileX, tileY, true);
        const landTagWidth = BOARD_CELL_WIDTH;
        const landTagHeight = BOARD_CELL_HEIGHT / 4;

        this.createBorderRectangle(
          this.scene,
          worldXY.x,
          worldXY.y - BOARD_CELL_HEIGHT / 2 + landTagHeight / 2,
          landTagWidth,
          landTagHeight,
          `${TILE_BOARDER_COLOR}`,
          2
        );

        tileRectangle.on("pointerover", (param) => {
          const currentTileId = this.tilePathWithId[tileX][tileY];
          this.hoverEventHandler(
            true,
            param.position.x,
            param.position.y,
            currentTileId
          );
        });

        tileRectangle.on("pointerout", (param) => {
          const currentTileId = this.tilePathWithId[tileX][tileY];
          this.hoverEventHandler(
            false,
            param.position.x,
            param.position.y,
            currentTileId
          );
        });

        tileRectangle.on("pointerdown", (data) => {
          if ((this.scene as FomopolyMap).isSelectionMode) {
            const tileXY = this.worldXYToTileXY(data.worldX, data.worldY);

            this.highLightTileForSelection(tileXY.x, tileXY.y);
            this.selectedTileId = this.tilePathWithId[tileX][tileY];
          } else {
            const currentTileId = this.tilePathWithId[tileX][tileY];
            this.hoverEventHandler(
              true,
              data.position.x,
              data.position.y,
              currentTileId
            );
          }
        });

        // add image to grid
        // const worldXY = this.tileXYToWorldXY(tileX, tileY);
        // const image = this.scene.add.image(worldXY.x, worldXY.y, 'grass');
        // image.displayWidth = 50;
        // image.displayHeight = 50;
      }
    }
    return this;
  }

  addLandTagToTile(tileX, tileY) {
    // get word position of the tile
    const worldXY = this.tileXYToWorldXY(tileX, tileY, true);
    this.highlightTile(tileX, tileY);

    this.createLandTagRectangle(this.scene, worldXY.x, worldXY.y);
  }

  openHeatMapMode(heatMapSteps) {
    // Create a local Graphics object for drawing heat map rectangles
    this.pathXY?.forEach((xy, index) => {
      const worldXY = this.tileXYToWorldXY(xy.x, xy.y, true);
      const stepIndex = heatMapSteps[index];

      if (stepIndex !== undefined && stepIndex < HEATMAP_COLORS.length) {
        const colorHex = HEATMAP_COLORS[stepIndex];
        const heatMapGraphics = this.scene.add.graphics();

        heatMapGraphics.fillStyle(colorHex, 1); // Set the fill color
        heatMapGraphics.lineStyle(2, 0x000000, 1);
        // Draw the rectangle
        heatMapGraphics
          .fillRect(
            worldXY.x - BOARD_CELL_WIDTH / 2,
            worldXY.y - BOARD_CELL_HEIGHT / 2,
            BOARD_CELL_WIDTH,
            BOARD_CELL_HEIGHT
          )
          .setDepth(3);

        heatMapGraphics
          .strokeRect(
            worldXY.x - BOARD_CELL_WIDTH / 2,
            worldXY.y - BOARD_CELL_HEIGHT / 2,
            BOARD_CELL_WIDTH,
            BOARD_CELL_HEIGHT
          )
          .setDepth(3);
        this.heatMapShapes.push(heatMapGraphics);
      }
    });
  }

  closeHeatMapMode() {
    this.heatMapShapes.forEach((shape) => shape.destroy());
  }

  closeSelectionMode() {
    this.prevHighlightGraphics?.forEach((graphic) => graphic.destroy());
    this.selectedTileId = "";
  }
}
