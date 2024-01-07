import React, { useEffect } from 'react';
import Phaser from 'phaser';
import MainScene from './scenes/mainScene';
import BootScene from './scenes/bootScene';
import VirtualJoystickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin.js';

const GameComponent = () => {
  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 1000,
    parent: 'phaser-game',
    pixelArt: true,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false
      }
    },
    scene: [BootScene,MainScene],
    plugins: {
      global: [{
          key: 'rexVirtualJoystick',
          plugin: VirtualJoystickPlugin,
          start: true
      }]
  }
  };

  useEffect(() => {
    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div id="phaser-game" style={{ width: config.width, height: config.height }} />;
};

export default GameComponent;
