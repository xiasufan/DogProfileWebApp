import Phaser from 'phaser';
export default class BootScene extends Phaser.Scene {
    constructor() {
      super('BootScene');
    }
  
    preload() {
      // 这里预加载 player sprite sheet
      this.load.spritesheet('player', 'assets/base_character.png', {
        frameWidth: 32,
        frameHeight: 32
      });

      this.load.image('background', 'assets/bigmap.png');
    }
  
    create() {
      // 预加载完成后，直接启动下一个场景
      this.scene.start('TestScene');
    }
  }