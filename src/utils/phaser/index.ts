import Phaser from 'phaser';
import BoardPlugin from 'phaser3-daw-plugins/plugins/board-plugin.js';
import FomopolyMap from './FomopolyMap';


export const config = {
  type: Phaser.AUTO,
  parent: 'phaser-zone-fomopoly',
  width: window.innerWidth,
  height: window.innerHeight,
  scale: {
    mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
    autoCenter: Phaser.Scale.CENTER_BOTH,
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


