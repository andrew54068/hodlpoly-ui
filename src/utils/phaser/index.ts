import Phaser from 'phaser';
import BoardPlugin from 'phaser3-rex-plugins/plugins/board-plugin.js';
import Demo from './Demo';


const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 300,
  height: 800,
  scale: {
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
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


export const game = new Phaser.Game(config);