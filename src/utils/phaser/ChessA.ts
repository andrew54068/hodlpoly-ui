import Phaser from "phaser";
import {
  Image as DawImage,
  Monopoly,
  MoveTo,
} from "phaser3-daw-plugins/plugins/board-components.js";
import { CHESS_SPEED_FAST, CHESS_SPEED_NORMAL } from "./constants";
interface IChessA {
  monopoly: Monopoly;
  moveTo: MoveTo;
}

export default class ChessA extends DawImage implements IChessA {
  monopoly: Monopoly<Phaser.GameObjects.GameObject>;
  moveTo: MoveTo<Phaser.GameObjects.GameObject>;
  movingPathTiles: Phaser.GameObjects.GameObject[];
  startPoint = { x: 0, y: 0 };
  endPoint = { x: 0, y: 0 };
  currentPoint = { x: 0, y: 0 };
  [key: string]: any;

  constructor(board, { startPoint, endPoint }) {
    const scene = board.scene;

    if (startPoint === undefined) {
      startPoint = board.getRandomEmptyTileXY(0);
    }

    super(board, 'avatar', 0, 0);

    this.startPoint = startPoint;
    this.currentPoint = startPoint;
    this.endPoint = endPoint;

    this.setScale(0.7);
    this.setDepth(10);

    // add behaviors
    this.monopoly = scene.rexBoard.add.monopoly(this, {
      face: 0,
      pathTileZ: 0,
      costCallback: function (curTileXY, preTileXY, monopoly) {
        const board = monopoly.board;
        return board
          .tileXYZToChess(curTileXY.x, curTileXY.y, 0)
          .getData("cost");
      },
    });
    this.moveTo = scene.rexBoard.add.moveTo(this);
    // private members

    this.movingPathTiles = [];

    this.on("finishMoving", () => {
      // always set the speed back to normal when finish moving along path
      this.moveTo.setSpeed(CHESS_SPEED_NORMAL);
    });
  }

  showMovingPath(tileXYArray) {
    console.log(`showMovingPath`);

    this.hideMovingPath();
    let tileXY, worldXY;
    const scene = this.scene;
    const board = this.rexChess?.board;

    if (!board) return;

    for (let i = 0, cnt = tileXYArray.length; i < cnt; i++) {
      tileXY = tileXYArray[i];
      worldXY = board.tileXYToWorldXY(tileXY.x, tileXY.y, true);
      this.movingPathTiles.push(
        scene.add.circle(worldXY.x, worldXY.y, 10, 0xb0003a)
      );
    }
  }

  hideMovingPath() {
    console.log(`hideMovingPath`);

    for (let i = 0, cnt = this.movingPathTiles.length; i < cnt; i++) {
      this.movingPathTiles[i].destroy();
    }
    this.movingPathTiles.length = 0;
    return this;
  }

  moveForward(movingPoints) {
    console.log(`moveForward`);
    if (this.moveTo.isRunning) {
      return this;
    }

    const path = this.monopoly.getPath(movingPoints);
    // this.showMovingPath(path);
    this.moveAlongPath(path);
    return this;
  }

  checkIsEnd(tileXY) {
    return this.endPoint.x === tileXY.x && this.endPoint.y === tileXY.y;
  }

  updateLocation(userPosition) {
    this.moveTo.setSpeed(CHESS_SPEED_FAST);
    this.moveTo.moveTo(userPosition.x, userPosition.y + 0.1);
  }

  moveAlongPath(path) {
    if (path.length === 0) {
      return;
    }

    this.moveTo.once(
      "complete",
      ({ currentPoint }) => {
        console.log(`moveTo.once('complete)`);

        if (
          currentPoint.x === this.startPoint.x &&
          currentPoint.y === this.startPoint.y
        ) {
          this.setVisible(true);
        }

        if (this.checkIsEnd(currentPoint)) {
          this.setVisible(false);
          // stop moving and move to the start point
          this.currentPoint = this.startPoint;
          path = [];

          this.moveTo.setSpeed(CHESS_SPEED_FAST);
          return this.moveAlongPath([this.startPoint]);
        }

        if (path.length === 0) {
          this.emit("finishMoving");
          return;
        }
        this.moveAlongPath(path);
      },
      this
    );

    const nextTile = path.shift();
    this.currentPoint = nextTile;

    this.moveTo.moveTo(nextTile);
    this.monopoly.setFace(this.moveTo.destinationDirection);
    return this;
  }
}
