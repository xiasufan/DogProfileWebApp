// 片段着色器
precision mediump float;

uniform sampler2D uMainSampler; // 纹理采样器
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
    vec2 flippedTexCoord = vec2(outTexCoord.x, 1.0 - outTexCoord.y); // 上下翻转纹理坐标
    vec4 texel = texture2D(uMainSampler, flippedTexCoord);

    vec3 hsv = rgb2hsv(texel.rgb);

    if (texel.a > 0.0 && texel.a < 1.0) {
        vec3 hsv = rgb2hsv(texel.rgb);
        // 将色相设置为蓝色（大约 2/3）
        hsv.x = 1.5 / 3.0;
        vec3 rgb = hsv2rgb(hsv);
        gl_FragColor = vec4(rgb, 1.0);
    } else {
        // 保持原样
        gl_FragColor = texel;
    }
}
