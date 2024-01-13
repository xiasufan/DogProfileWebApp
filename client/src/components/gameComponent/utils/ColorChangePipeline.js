import Phaser from "phaser";



export class ColorChangePipeline extends Phaser.Renderer.WebGL.Pipelines.SinglePipeline {
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
                    
                    uniform sampler2D uMainSampler[%count%]; // 纹理采样器
                    varying vec2 outTexCoord;
                    
                    uniform vec3 targetHue; // 目标色相（RGB 格式）
                    
                    // 将 RGB 转换为 HSV
                    vec3 rgb2hsv(vec3 c) {
                        vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
                        vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
                        vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
                    
                        float d = q.x - min(q.w, q.y);
                        float e = 1.0e-10;
                        return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
                    }
                    
                    // 将 HSV 转换为 RGB
                    vec3 hsv2rgb(vec3 c) {
                        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
                        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
                        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
                    }
                    
                    void main() {
                        vec4 texel = texture2D(uMainSampler[1], outTexCoord);
                    
                    
                        if (texel.a > 0.0 && texel.a < 1.0) {
                            vec3 hsv = rgb2hsv(texel.rgb);
                            // 将色相设置为蓝色（大约 2/3）
                            hsv.x = targetHue.x;
                            hsv.y = (hsv.y+targetHue.y)/2.0;
                            hsv.z = (hsv.z+targetHue.z)/2.0;
                            vec3 rgb = hsv2rgb(hsv);
                            gl_FragColor = vec4(rgb, 1.0);
                        } else {
                            // 保持原样
                            gl_FragColor = texel;
                        }
                    }
          `
        });

        this._targetHue = new Phaser.Math.Vector3(0, 0, 0);
      }
      onBoot() {

    }

    onPreRender ()
    {
        this.set3f('targetHue', this._targetHue.x, this._targetHue.y, this._targetHue.z);
    }


    onBind(gameObject) {
        super.onBind(gameObject);
        
    
        const data = gameObject.pipelineData;
    
        if (data) {
            if (data.targetHue) {
                
                this.set3f('targetHue', data.targetHue.x, data.targetHue.y, data.targetHue.z);
            }
         
        }
    }

    onBatch (gameObject)
    {
        if (gameObject)
        {
            this.flush();
        }
    }

    setTargetHue(x, y, z) {
        this._targetHue.set(x, y, z);
        this.set3f('targetHue', x, y, z);
    }

    

    set targetHue (value)
    {
        this._targetHue = value;
    }

    get targetHue ()
    {
        return this._targetHue;
    }
}