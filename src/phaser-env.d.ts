import BoardPlugin from 'phaser3-rex-plugins/plugins/board-plugin.js';
import FomopolyMap from 'src/utils/phaser/FomopolyMap';

declare module 'phaser' {
  interface Scene extends Phaser.Scene {
    rexBoard: BoardPlugin;
  }
}


// add myGameScene to window 
declare global {
  interface Window {
    fomopolyMap: FomopolyMap<Omit<Phaser.Scene>>;
  }
}