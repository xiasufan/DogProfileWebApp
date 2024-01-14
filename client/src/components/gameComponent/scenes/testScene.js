import Phaser from 'phaser';
import { ColorChangePipeline } from '../utils/ColorChangePipeline';
import { ResetAlphaPipeline } from '../utils/ResetAlpha';

export default class TestScene extends Phaser.Scene {
  constructor() {
    super('TestScene');
  }
  

  preload() {
    this.load.image('body1', 'assets/custom/body1.png');
    this.load.image('hair1', 'assets/custom/hair1.png');
    this.load.glsl('myShader', 'assets/shader/colorChange.frag');
    this.load.spritesheet('body', 'assets/custom/body.png', {
        frameWidth: 96,
        frameHeight: 80
      });

      this.load.spritesheet('face', 'assets/custom/face.png', {
        frameWidth: 60,
        frameHeight: 54
      });

      this.load.spritesheet('hair', 'assets/custom/hair.png', {
        frameWidth: 96,
        frameHeight: 96
      });
  }
 

  create() {

    this.selectedColor = new Phaser.Math.Vector3(0, 0, 0); // 初始化

    this.customPipeline = this.renderer.pipelines.add('Custom', new ColorChangePipeline(this.game));

    this.customPipeline = this.renderer.pipelines.add('Alpha', new ResetAlphaPipeline(this.game));


    
    // 定义一组基本颜色
    const colors = [0xf75959, 0x32a852, 0x544fe3, 0x000000, 0xFFFFFF];
    const colorSprites = [];

    // 为每种颜色创建一个 Sprite
    colors.forEach((color, index) => {
        const colorSprite = this.add.rectangle(100 + index * 40, 50, 30, 30, color)
            .setInteractive()
            .on('pointerdown', () => {
                hair.setPipeline('Custom')
                body.setPipeline('Custom')
                face.setPipeline('Custom')
                // 当颜色被点击时，计算 HSV 色相并更新着色器
                this.selectedColor = Phaser.Display.Color.IntegerToColor(color);
                //console.log(this.selectedColor)
                
                hair.pipelineData = { targetHue: new Phaser.Math.Vector3(this.selectedColor._h, this.selectedColor._s,this.selectedColor._v) };
                body.pipelineData = { targetHue: new Phaser.Math.Vector3(this.selectedColor._h, this.selectedColor._s,this.selectedColor._v) };
                face.pipelineData = { targetHue: new Phaser.Math.Vector3(this.selectedColor._h, this.selectedColor._s,this.selectedColor._v) };
            });
        colorSprites.push(colorSprite);
    });

    // 定义一个 '还原' 图标
const resetIcon = this.add.rectangle(100 + colors.length * 40, 50, 30, 30, 'black')
.setInteractive()
.on('pointerdown', () => {
    
    hair.setPipeline('Alpha')
    body.setPipeline('Alpha')
    face.setPipeline('Alpha')
});

// 在 '还原' 图标上绘制 '禁止' 符号
const graphics = this.add.graphics({ x: resetIcon.x, y: resetIcon.y });
graphics.lineStyle(2, 0xFFFFFF, 1);
graphics.beginPath();
graphics.moveTo(-10, -10);
graphics.lineTo(10, 10);
graphics.moveTo(-10, 10);
graphics.lineTo(10, -10);
graphics.strokePath();
graphics.closePath();

// 添加到场景中
colorSprites.push(resetIcon);

const face = this.add.sprite(300, 330, 'face', 0).setScale(4).setPipeline('Alpha');
this.createArrowButtons(this, 300, 380, 'face', face);
const hair = this.add.sprite(300, 300, 'hair',0).setScale(4).setPipeline('Alpha');
this.createArrowButtons(this, 300, 260, 'hair', hair);
    const body = this.add.sprite(300, 520, 'body', 0).setScale(4).setPipeline('Alpha');

    this.createArrowButtons(this, 300, 570, 'body', body);


    // const multiColorPipeline = this.renderer.pipelines.get('MultiColor');

    //     this.add.sprite(100, 300, 'hair').setPipeline(multiColorPipeline, { effect: 1, gray:0.9 });
    //     this.add.sprite(400, 300, 'body').setScale(1.5).setPipeline(multiColorPipeline, { effect: 1, speed:0.01 });
    //     this.fish = this.add.sprite(400, 300, 'hair').setPipeline(multiColorPipeline, { effect: 1, speed:0.01 });
    //     this.add.sprite(200, 300, 'body').setPipeline(multiColorPipeline, { effect: 1, gray:0.9 });

    //     this.input.on('pointermove', pointer => {

    //         this.fish.x = pointer.worldX;
    //         this.fish.y = pointer.worldY;

    //     });
  }

  createArrowButtons(scene, x, y, key, sprite) {
    // 增加箭头距离精灵中心的水平偏移量
    const arrowOffset = 220;

    // 创建左箭头
    const leftArrow = scene.add.graphics({ fillStyle: { color: 0x000000 } });
    leftArrow.beginPath();
    leftArrow.moveTo(x - arrowOffset + 20, y - 10); // 修改箭头方向
    leftArrow.lineTo(x - arrowOffset, y);
    leftArrow.lineTo(x - arrowOffset + 20, y + 10);
    leftArrow.closePath();
    leftArrow.fillPath();
    leftArrow.setInteractive(new Phaser.Geom.Polygon([x - arrowOffset + 20, y - 10, x - arrowOffset, y, x - arrowOffset + 20, y + 10]), Phaser.Geom.Polygon.Contains);

    // 创建右箭头
    const rightArrow = scene.add.graphics({ fillStyle: { color: 0x000000 } });
    rightArrow.beginPath();
    rightArrow.moveTo(x + arrowOffset - 20, y - 10); // 修改箭头方向
    rightArrow.lineTo(x + arrowOffset, y);
    rightArrow.lineTo(x + arrowOffset - 20, y + 10);
    rightArrow.closePath();
    rightArrow.fillPath();
    rightArrow.setInteractive(new Phaser.Geom.Polygon([x + arrowOffset - 20, y - 10, x + arrowOffset, y, x + arrowOffset - 20, y + 10]), Phaser.Geom.Polygon.Contains);

    // 为左箭头添加点击事件
    leftArrow.on('pointerdown', () => this.changeSpriteFrame(sprite, key, -1));

    // 为右箭头添加点击事件
    rightArrow.on('pointerdown', () => this.changeSpriteFrame(sprite, key, 1));
}



 changeSpriteFrame(sprite, key, change) {
    const totalFrames = sprite.texture.frameTotal;
    let newFrame = Phaser.Math.Wrap(sprite.frame.name + change, 0, totalFrames-1);
    sprite.setFrame(newFrame);
}

  update() {
    
}


}
