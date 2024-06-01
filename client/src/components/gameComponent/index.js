// src/components/GameComponent/GameComponent.js
import React, { useEffect } from 'react';
import Phaser from 'phaser';
import MainScene from './scenes/mainScene';
import BootScene from './scenes/bootScene';
import TestScene from './scenes/testScene';
import VirtualJoystickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin.js';
import MultiColorPipeline from './utils/MultiColor';

const GameComponent = () => {
  useEffect(() => {
    const config1 = {
      type: Phaser.AUTO,
      backgroundColor: '#5DACD8',
      scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-game1',
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
        width: 600,
        height: 1000,
      },
      pixelArt: true,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
      scene: [BootScene, MainScene],
      plugins: {
        global: [
          {
            key: 'rexVirtualJoystick',
            plugin: VirtualJoystickPlugin,
            start: true,
          },
        ],
      },
      pipeline: { MultiColor: MultiColorPipeline },
    };

    const config2 = {
      type: Phaser.AUTO,
      backgroundColor: '#5DACD8',
      scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-game2',
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
        width: 600,
        height: 1000,
      },
      pixelArt: true,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
      scene: [BootScene, TestScene],
      plugins: {
        global: [
          {
            key: 'rexVirtualJoystick',
            plugin: VirtualJoystickPlugin,
            start: true,
          },
        ],
      },
      pipeline: { MultiColor: MultiColorPipeline },
    };

    const game1 = new Phaser.Game(config1);
    const game2 = new Phaser.Game(config2);

    return () => {
      game1.destroy(true);
      game2.destroy(true);
    };
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
      <div id="phaser-game1" style={{ width: 600, height: 1000 }} />
      <div id="phaser-game2" style={{ width: 600, height: 1000 }} />
    </div>
  );
};

export default GameComponent;
