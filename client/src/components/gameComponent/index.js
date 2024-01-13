import React, { useEffect } from 'react';
import Phaser from 'phaser';
import MainScene from './scenes/mainScene';
import BootScene from './scenes/bootScene';
import TestScene from './scenes/testScene';
import VirtualJoystickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin.js';

import MultiColorPipeline from './utils/MultiColor';

const GameComponent = () => {
  const config = {
    type: Phaser.AUTO,
    backgroundColor: '#5DACD8',
    scale: {
      mode: Phaser.Scale.FIT, // 或使用 Phaser.Scale.RESIZE
      parent: 'phaser-game',
      autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
      width: 600,
      height: 1000
  },
    pixelArt: true,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false
      }
    },
    scene: [BootScene,TestScene],
    plugins: {
      global: [{
          key: 'rexVirtualJoystick',
          plugin: VirtualJoystickPlugin,
          start: true
      }]
  },
  pipeline: { 'MultiColor': MultiColorPipeline }
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
