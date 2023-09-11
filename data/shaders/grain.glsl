#ifdef GL_ES
precision highp int;
precision highp float;
#endif

uniform sampler2D uTexture;
uniform float uRandomizer;
varying vec4 vertTexCoord;

float random(vec2 p)
{
  vec2 K1=vec2(
    23.14069263277926,// e^pi (Gelfond's constant)
    2.665144142690225 // 2^sqrt(2) (Gelfond–Schneider constant)
  );
  return fract(cos(dot(p, K1))*12345.6789);
}

void main()
{
  vec4 c = texture2D(uTexture, vertTexCoord.st);
  vec2 uvRandom = vertTexCoord.st;

  uvRandom.y *= random(vec2(uvRandom.y, uRandomizer));
  c.rgb += random(uvRandom)*.05;

  gl_FragColor = vec4(c.rgb, 1.);
}