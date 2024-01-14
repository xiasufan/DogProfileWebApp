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


    const colorSprites = [];
    // 定义一组基本颜色
    const colorGroups = {
        hair: [
            0x000000, // 黑色
            0x784212, // 棕色
            0xF0E68C, // 金色
            0xD2B48C, // 棕褐色
            0xA52A2A, // 褐色
            0x800000, // 栗色
            0x808080, // 灰色
            0xFFFFFF, // 白色
            0xFFFACD, // 柠檬绸色
            0xFFD700  // 金色
        ],
        body: [
            0xFFE4E1, // 薄雾玫瑰
            0xFFA07A, // 浅鲑鱼色
            0x20B2AA, // 浅海洋绿
            0x778899, // 亮石板灰
            0xB0C4DE, // 亮钢兰
            0x0000CD, // 中蓝色
            0x8B008B, // 暗洋红
            0xFFD700, // 金色
            0x008B8B, // 暗青色
            0x9400D3  // 暗紫罗兰
        ],
        face: [
            0xFF6347, // 西红柿
            0x40E0D0, // 青绿色
            0xEE82EE, // 紫罗兰
            0xDA70D6, // 兰花的紫色
            0xFFA07A, // 浅鲑鱼色
            0x32CD32, // 酸橙绿
            0x800000, // 栗色
            0xFF00FF, // 红紫色
            0x66CDAA, // 中绿宝石
            0x000080  // 海军蓝
        ]
    };
    this.colorBlocks = {
        hair: [],
        body: [],
        face: []
    };
    

    this.borderGraphics = this.add.graphics();
    // 跟踪当前选中的颜色

    const face = this.add.sprite(300, 380, 'face', 0).setScale(4).setPipeline('Alpha');
    this.createArrowButtons(this, 300, 430, 'face', face);
    const hair = this.add.sprite(300, 350, 'hair',0).setScale(4).setPipeline('Alpha');
    this.createArrowButtons(this, 300, 310, 'hair', hair);
    const body = this.add.sprite(300, 570, 'body', 0).setScale(4).setPipeline('Alpha');
    this.createArrowButtons(this, 300, 620, 'body', body);
// 创建随机选择按钮
const randomButton = this.add.text(200, 800, 'Random!', { fontSize: '50px', fontStyle:'Bold',fill: '#fff' })
.setInteractive()
.on('pointerdown', () => randomizeCharacter());

    this.selectedColors = {
        hair: { sprite: hair, colorSprite: null },
        body: { sprite: body, colorSprite: null },
        face: { sprite: face, colorSprite: null }
    };


    Object.keys(colorGroups).forEach((part, rowIndex) => {
        colorGroups[part].forEach((color, index) => {
            const colorSprite = this.add.rectangle(100 + index * 40, 50 + rowIndex * 50, 30, 30, color)
                .setInteractive()
                .on('pointerdown', () => {
                    this.selectColor(part, color, colorSprite);
                });
                this.colorBlocks[part].push(colorSprite);
            colorSprites.push(colorSprite);
        });

        // 添加取消键
        const resetIcon = this.add.rectangle(100 + colorGroups[part].length * 40, 50 + rowIndex * 50, 30, 30, 'black')
            .setInteractive()
            .on('pointerdown', () => {
                this.resetColor(part);
            });
        colorSprites.push(resetIcon);

        // 绘制取消键上的符号
        const graphics = this.add.graphics({ x: resetIcon.x - 15, y: resetIcon.y - 15 });
        graphics.lineStyle(2, 0xFFFFFF, 1);
        graphics.beginPath();
        graphics.moveTo(0, 0);
        graphics.lineTo(30, 30);
        graphics.moveTo(0, 30);
        graphics.lineTo(30, 0);
        graphics.strokePath();
        graphics.closePath();
    });

    // ...

    const randomizeCharacter = () => {
        
        // 随机选择每个部分的帧和颜色
        Object.keys(this.selectedColors).forEach(part => {
            const partData = this.selectedColors[part];
            const totalFrames = partData.sprite.texture.frameTotal;
            const randomFrame = Phaser.Math.Between(0, totalFrames - 2);
            partData.sprite.setFrame(randomFrame);

            const colors = colorGroups[part];
        const colorIndex = Phaser.Math.Between(0, colors.length - 1);
        const randomColor = colors[colorIndex];
        const selectedColor = Phaser.Display.Color.IntegerToColor(randomColor);

        partData.sprite.setPipeline('Custom');
        partData.sprite.pipelineData = { targetHue: new Phaser.Math.Vector3(selectedColor._h, selectedColor._s, selectedColor._v) };

        // 更新选中的颜色块
        partData.colorSprite = this.colorBlocks[part][colorIndex];
    });

    // 更新描边
    this.updateBorder();
}
    




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

selectColor(part, color, colorSprite) {
    const { sprite } = this.selectedColors[part];
    if (sprite) {
        sprite.setPipeline('Custom');

        const selectedColor = Phaser.Display.Color.IntegerToColor(color);
        sprite.pipelineData = { targetHue: new Phaser.Math.Vector3(selectedColor._h, selectedColor._s, selectedColor._v) };

        // 更新选中的颜色块
        this.selectedColors[part].colorSprite = colorSprite;

        // 更新描边
        this.updateBorder();
    }
}

resetColor(part) {
    const partData = this.selectedColors[part];
    if (partData.sprite) {
        partData.sprite.setPipeline('Alpha');

        // 将选中的颜色块设置为 null，表示没有颜色被选中
        partData.colorSprite = null;

        // 更新描边
        this.updateBorder();
    }
}


updateBorder() {
    // 清除现有描边
    this.borderGraphics.clear();

    

    // 为每个部分的选中颜色块绘制描边
    Object.values(this.selectedColors).forEach(({ colorSprite }) => {
        if (colorSprite) {
            const bounds = colorSprite.getBounds();
            this.borderGraphics.lineStyle(8, 0xe5ff00); // 设置描边样式
            this.borderGraphics.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);
        }
        
    });


}

 changeSpriteFrame(sprite, key, change) {
    const totalFrames = sprite.texture.frameTotal;
    let newFrame = Phaser.Math.Wrap(sprite.frame.name + change, 0, totalFrames-1);
    sprite.setFrame(newFrame);
}

  update() {
    
}


}
