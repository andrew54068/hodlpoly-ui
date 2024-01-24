import BoardPlugin from 'phaser3-rex-plugins/plugins/board-plugin.js';

declare module 'phaser' {
  interface Scene extends Phaser.Scene {
    rexBoard: BoardPlugin;
  }
}


// add myGameScene to window 
declare global {
  interface Window {
    myGameSceneDemo: Demo;
  }
}