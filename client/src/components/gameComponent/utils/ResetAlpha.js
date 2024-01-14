import Phaser from "phaser";



export class ResetAlphaPipeline extends Phaser.Renderer.WebGL.Pipelines.SinglePipeline {
    static get KEY() {
        return 'CustomShader';
    }

    constructor(game) {
        
        super({
          game: game,
          renderer: game.renderer,
          fragShader: `
          // 片段着色器
                    precision mediump float;
                    
                    uniform sampler2D uMainSampler; // 纹理采样器
                    varying vec2 outTexCoord;
                    
                    
                    void main() {
                        vec4 texel = texture2D(uMainSampler, outTexCoord);
                    
                    
                        if (texel.a > 0.0) {
                            gl_FragColor = vec4(texel.rgb, 1.0);
                        } else {
                            gl_FragColor = texel;
                        }
                    }
          `
        });

      }


   

    onBatch (gameObject)
    {
        if (gameObject)
        {
            this.flush();
        }
    }

}