import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

  preload() {
  }

  create() {
    this.isCameraFollow = false;
    var windowWidth = window.innerWidth;
    const gameWidth = this.sys.game.config.width;
    const gameHeight = this.sys.game.config.height;

    // 加载背景图像并居中
    const bg = this.add.image(0, 0, 'background').setOrigin(0, 0).setScale(1.3);

    // 将背景图像的位置设置为屏幕中心
    bg.x = (gameWidth - bg.width) / 2 -500;
    bg.y = (gameHeight - bg.height) / 2 -750;
    this.player = this.physics.add.sprite(300, 500, 'player').play('idle').setScale(3);
    this.cursors = this.input.keyboard.createCursorKeys();
    // 创建相机
    this.camera = this.cameras.main;

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

    

 // 假设当窗口宽度小于800px时启用虚拟操纵杆
      this.joystick = this.plugins.get('rexVirtualJoystick').add(this, {
          x: 300,
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
    this.angleText.x = this.camera.scrollX + 10;
    this.angleText.y = this.camera.scrollY + 10;
    const speed = 200;
    const cameraSpeed = 5;
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
      let deadZone = 30;
      // 检查是否在水平死区内
    if ((this.joystick.angle > -90 - deadZone && this.joystick.angle < -90 + deadZone) || 
    (this.joystick.angle > 90 - deadZone && this.joystick.angle < 90 + deadZone)) {
    velocityX = 0; // 在水平死区内，水平速度为0
} else if (this.joystick.angle > -90 && this.joystick.angle < 90) {
    velocityX = speed;
} else {
    velocityX = -speed;
}

// 检查是否在垂直死区内
if ((this.joystick.angle > -deadZone && this.joystick.angle < deadZone) || 
    (this.joystick.angle > 180 - deadZone || this.joystick.angle < -180 + deadZone)) {
    velocityY = 0; // 在垂直死区内，垂直速度为0
} else if (this.joystick.angle > -180 && this.joystick.angle < 0) {
    velocityY = -speed;
} else if (this.joystick.angle > 0 && this.joystick.angle < 180) {
    velocityY = speed;
}
  
      // 检查是否为斜向移动
      if (velocityX !== 0 && velocityY !== 0) {
          // 对速度向量进行归一化
          let norm = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
          velocityX = (velocityX / norm) * speed;
          velocityY = (velocityY / norm) * speed;
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


    
    let cameraCenterX = this.camera.scrollX + this.camera.width / 2;
        let cameraCenterY = this.camera.scrollY + this.camera.height / 2;

        // 动态定义安全区域的边界
        let safeZone = {
            x: cameraCenterX - 100,
            y: cameraCenterY - 150,
            width: 200,
            height: 200
        };

        let deltaX = 0;
        let deltaY = 0;

        // 检查 this.player 是否在安全区域内
        let inSafeZone = this.player.x > safeZone.x && this.player.x < safeZone.x + safeZone.width &&
                         this.player.y > safeZone.y && this.player.y < safeZone.y + safeZone.height;

        if (!inSafeZone) {
            // 玩家离开安全区域时，启动相机跟随
            this.isCameraFollow = true;
        }

        if (this.isCameraFollow) {
            // 相机跟随玩家
            deltaX = (this.player.x - cameraCenterX) * cameraSpeed *0.01;
            deltaY = (this.player.y - cameraCenterY) * cameraSpeed *0.01;

            // 当玩家回到相机中心时，停止相机跟随
            if (Math.abs(this.player.x - cameraCenterX) < 1 && Math.abs(this.player.y - cameraCenterY) < 1) {
                this.isCameraFollow = false;
                deltaX = 0;
                deltaY = 0;
            }
        }

        // 更新相机位置
        this.camera.scrollX += deltaX;
        this.camera.scrollY += deltaY;
}


}
