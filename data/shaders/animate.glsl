#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D uTexture;
uniform vec2 uSketchSize;
uniform vec2 uCenter;
uniform float uFreq;
uniform float uAmp;

varying vec4 vertTexCoord;

float clampTexture(vec2 uv, float s)
{
  float d = 1.0;
  d  = 1.0 - smoothstep(s, 0.0, uv).x;
  d *= 1.0 - smoothstep(s, 0.0, uv).y;
  d *= 1.0 - smoothstep(s, 0.0, 1.0 - uv).x;
  d *= 1.0 - smoothstep(s, 0.0, 1.0 - uv).y;
  return d;
}

void main(void)
{
  vec2 uv = vertTexCoord.st;
  vec2 cPos = gl_FragCoord.xy / uSketchSize + uCenter;
  float cLength = length(cPos);

  float d = clampTexture(uv, 0.9);
  uv += (cPos/cLength) * d * uAmp * cos(cLength*uFreq);
  gl_FragColor = vec4(texture2D(uTexture, uv).rgb, 1.0);
}