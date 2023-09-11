#ifdef GL_ES
precision highp int;
precision highp float;
#endif  

#define M 64

uniform sampler2D uTexture;
varying vec4 vertTexCoord;

float accessMatrix(float[M] m, int index)
{
  for(int i = 0; i < M; i++)
    if(i == index)
      return m[i];
  return -1.;  
}
float indexValue(float[M] m)
{
  float s = sqrt(float(M));
  int x = int(mod(gl_FragCoord.x, s));
  int y = int(mod(gl_FragCoord.y, s));
  int i = x + y * int(s);
  return (accessMatrix(m, i)/ float(M));
}
float dither(float color, float[M] m)
{
  // 1st color and 2nd closest color
  float cc1 = (color < 0.5) ? 0.0 : 1.0;
  float cc2 = 1.0 - cc1;
  float d = indexValue(m);
  float distance = abs(cc1 - color);
  return (distance < d) ? cc1 : cc2;
}

void main()
{
  float m[M];
  m[0] = 0.;
  m[1] = 32.;
  m[2] = 8.;
  m[3] = 40.;
  m[4] = 2.;
  m[5] = 34.;
  m[6] = 10.;
  m[7] = 42.;
  m[8] = 48.;
  m[9] = 16.;
  m[10] = 56.;
  m[11] = 24.;
  m[12] = 50.;
  m[13] = 18.;
  m[14] = 58.;
  m[15] = 26.;
  m[16] = 12.;
  m[17] = 44.;
  m[18] = 4.;
  m[19] = 36.;
  m[20] = 14.;
  m[21] = 46.;
  m[22] = 6.;
  m[23] = 38.;
  m[24] = 60.;
  m[25] = 28.;
  m[26] = 52.;
  m[27] = 20.;
  m[28] = 62.;
  m[29] = 30.;
  m[30] = 54.;
  m[31] = 22.;
  m[32] = 3.;
  m[33] = 35.;
  m[34] = 11.;
  m[35] = 43.;
  m[36] = 1.;
  m[37] = 33.;
  m[38] = 9.;
  m[39] = 41.;
  m[40] = 51.;
  m[41] = 19.;
  m[42] = 59.;
  m[43] = 27.;
  m[44] = 49.;
  m[45] = 17.;
  m[46] = 57.;
  m[47] = 25.;
  m[48] = 15.;
  m[49] = 47.;
  m[50] = 7.;
  m[51] = 39.;
  m[52] = 13.;
  m[53] = 45.;
  m[54] = 5.;
  m[55] = 37.;
  m[56] = 63.;
  m[57] = 31.;
  m[58] = 55.;
  m[59] = 23.;
  m[60] = 61.;
  m[61] = 29.;
  m[62] = 53.;
  m[63] = 21.;

  vec3 tex  = texture2D(uTexture, vertTexCoord.st).rgb;
  float d = dither(tex.r, m);

  gl_FragColor = vec4(d*tex, 1.);
}