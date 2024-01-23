import Phaser from 'phaser';
import BoardPlugin from 'phaser3-rex-plugins/plugins/board-plugin.js';
import Demo from './Demo';


export const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 1000,
  scale: {
    mode: Phaser.Scale.NONE,
    // autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: Demo,
  plugins: {
    scene: [{
      key: 'rexBoard',
      plugin: BoardPlugin,
      mapping: 'rexBoard'
    }]
  },
  callbacks: {
    postBoot: (game) => {
      window.myGameSceneDemo = game.scene.keys.demoExample;
    }
  }
};


