#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D uTexture;
uniform vec2 uSketchSize;
uniform float uRandomizer;
uniform float uMix;
uniform float uWhite;
varying vec4 vertTexCoord;

void main()
{
  vec2 st = gl_FragCoord.xy / uSketchSize;
  st.x *= uSketchSize.x/(uSketchSize.y*uRandomizer);

  vec3 stripe = vec3(cos(1000.*(st.x - st.y*0.2)));
  vec3 tex = texture2D(uTexture, vertTexCoord.st).rgb;

  stripe = clamp(mix(tex, stripe, uMix), vec3(0.0), vec3(uWhite));
  gl_FragColor = vec4(stripe, 1.);
}