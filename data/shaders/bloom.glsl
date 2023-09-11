#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define STEP 1

uniform sampler2D uTexture;
uniform vec2 texOffset;
uniform float uAmount;
varying vec4 vertTexCoord;

float map(float value, float min1, float max1, float min2, float max2) 
{
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}
float getBrightness(vec3 c)
{
  return dot(c, vec3(0.2126, 0.7152, 0.072));
  // return dot(c, vec3(0.33, 0.33, 0.33));
}

void main(void)
{
  vec4 sum =vec4(0.);
  vec4 tex = texture2D(uTexture, vertTexCoord.st);
  
  for(int i = -STEP; i < STEP; i++)
    for(int j = -STEP; j < STEP; j++)
    {
      vec4 c = texture2D(uTexture, vertTexCoord.st + vec2(j, i) * texOffset.st);
      float l = getBrightness(c.rgb)*3.;

      c.a *= l;
      sum += c*uAmount;
    }
  sum = clamp(sum, 0., 1.);


  vec4 col = sum*sum + tex;

  col.r = map(col.r, 0.0, 1.0, 0.0, 0.9);
  col.g = map(col.g, 0.0, 1.0, 0.0, 0.9);
  col.b = map(col.b, 0.0, 1.0, 0.0, 0.9);

  gl_FragColor = vec4(col.rgb, col.a);
}