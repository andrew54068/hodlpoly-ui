import Phaser from 'phaser';
import BoardPlugin from 'phaser3-rex-plugins/plugins/board-plugin.js';
import FomopolyMap from './FomopolyMap';


export const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 1000,
  scale: {
    mode: Phaser.Scale.NONE,
    // autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: FomopolyMap,
  plugins: {
    scene: [{
      key: 'rexBoard',
      plugin: BoardPlugin,
      mapping: 'rexBoard'
    }]
  },
  callbacks: {
    postBoot: (game) => {
      window.fomopolyMap = game.scene.keys.fomopolyMap;
    }
  }
};


