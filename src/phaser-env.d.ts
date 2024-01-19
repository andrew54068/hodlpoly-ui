import BoardPlugin from 'phaser3-rex-plugins/plugins/board-plugin.js';

declare module 'phaser' {
  interface Scene {
    rexBoard: BoardPlugin;
  }
}
