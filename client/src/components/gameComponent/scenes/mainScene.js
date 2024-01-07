import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

  preload() {
  }

  create() {
    var windowWidth = window.innerWidth;

    

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 4 }),
      frameRate: 10,
      repeat: -1
  });

  this.anims.create({
    key: 'run',
    frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
});

this.anims.create({
  key: 'run_up',
  frames: this.anims.generateFrameNumbers('player', { start: 10, end: 13 }),
  frameRate: 10,
  repeat: -1
});

    this.add.image(0, -100, 'background').setOrigin(0, 0).setScale(5);
    this.player = this.physics.add.sprite(100, 100, 'player').play('idle').setScale(3);
    this.cursors = this.input.keyboard.createCursorKeys();

 // 假设当窗口宽度小于800px时启用虚拟操纵杆
      this.joystick = this.plugins.get('rexVirtualJoystick').add(this, {
          x: 400,
          y: 800,
          radius: 100,
          base: this.add.circle(0, 0, 100, 0x888888, 0.5),
          thumb: this.add.circle(0, 0, 50, 0xcccccc, 0.5)
      });
  
      this.angleText = this.add.text(10, 10, '', { font: '16px Arial', fill: '#ffffff' });

    this.WASD = {
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    };
  }

  update() {
    this.angleText.setText('Angle: ' + this.joystick.angle.toFixed(2));
    const speed = 160;
    let velocityX = 0;
    let velocityY = 0;
    const minForce = 0.1;

    // WASD 控制
    if (this.WASD.left.isDown) {
        velocityX = -speed;
    } else if (this.WASD.right.isDown) {
        velocityX = speed;
    }

    if (this.WASD.up.isDown) {
        velocityY = -speed;
    } else if (this.WASD.down.isDown) {
        velocityY = speed;
    }
    this.player.setVelocity(0)
    // 虚拟操纵杆控制
    if (this.joystick.force > minForce) {
      if (this.joystick.angle > -90 && this.joystick.angle < 90) {
          velocityX = speed;
      } else {
          velocityX = -speed;
      }
  
      if (this.joystick.angle > -180 && this.joystick.angle < 0) {
          velocityY = -speed;
      } else if (this.joystick.angle > 0 && this.joystick.angle < 180) {
          velocityY = speed;
      }
  }

  this.player.setVelocityX(velocityX);
  this.player.setVelocityY(velocityY);


    const isMoving = this.player.body.velocity.x !== 0 || this.player.body.velocity.y !== 0;
    const isMovingUp = this.player.body.velocity.y < 0;
    const isMovingDown = this.player.body.velocity.y > 0;

    // 根据速度选择动画
    if (isMoving) {
        if (isMovingUp) {
            this.player.anims.play('run_up', true);
        } else if (isMovingDown || this.player.body.velocity.x !== 0) {
            this.player.anims.play('run', true);
        }
    } else {
        this.player.anims.play('idle', true);
    }

    // 翻转角色
    if (this.player.body.velocity.x < 0) {
        this.player.setFlipX(true);
    } else if (this.player.body.velocity.x > 0) {
        this.player.setFlipX(false);
    }
}


}
