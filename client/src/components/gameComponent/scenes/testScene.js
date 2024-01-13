import Phaser from 'phaser';
import { ColorChangePipeline } from '../utils/ColorChangePipeline';

export default class TestScene extends Phaser.Scene {
  constructor() {
    super('TestScene');
  }
  

  preload() {
    this.load.image('body', 'assets/custom/body1.png');
    this.load.image('hair', 'assets/custom/hair1.png');
    this.load.glsl('myShader', 'assets/shader/colorChange.frag');
  }


  create() {

    this.selectedColor = new Phaser.Math.Vector3(0, 0, 0); // 初始化

    this.customPipeline = this.renderer.pipelines.add('Custom', new ColorChangePipeline(this.game));


    
    // 定义一组基本颜色
    const colors = [0xf75959, 0x32a852, 0x544fe3, 0x000000];
    const colorSprites = [];

    // 为每种颜色创建一个 Sprite
    colors.forEach((color, index) => {
        const colorSprite = this.add.rectangle(100 + index * 40, 50, 30, 30, color)
            .setInteractive()
            .on('pointerdown', () => {
                hair.setPipeline('Custom')
                body.setPipeline('Custom')
                // 当颜色被点击时，计算 HSV 色相并更新着色器
                this.selectedColor = Phaser.Display.Color.IntegerToColor(color);
                //console.log(this.selectedColor)
                
                hair.pipelineData = { targetHue: new Phaser.Math.Vector3(this.selectedColor._h, this.selectedColor._s,this.selectedColor._v) };
                body.pipelineData = { targetHue: new Phaser.Math.Vector3(this.selectedColor._h, this.selectedColor._s,this.selectedColor._v) };
            });
        colorSprites.push(colorSprite);
    });

    // 定义一个 '还原' 图标
const resetIcon = this.add.rectangle(100 + colors.length * 40, 50, 30, 30, 'black')
.setInteractive()
.on('pointerdown', () => {
    // 当 '还原' 图标被点击时，重置着色器效果
    body.resetPipeline();
    body.setAlpha(1) // 重置 pipelineData
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


const hair = this.add.sprite(300, 300, 'hair').setScale(4);
    const body = this.add.sprite(300, 500, 'body').setScale(4);



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

  update() {
    
}


}
