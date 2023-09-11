#ifdef GL_ES
precision highp float;
#endif

uniform vec2 uSketchSize;
uniform vec3 uColor;

vec3 checker(float checkSize, vec2 st)
{
  float fmodResult = mod(floor(checkSize * st.x) + floor(checkSize * st.y), 2.0);
  float fin = max(sign(fmodResult), 0.0);
  return vec3(fin, fin, fin);
}

void main()
{
  vec2 st = gl_FragCoord.xy / uSketchSize;
  vec3 check = checker(20., st);
  vec3 col = uColor*check;
 
  gl_FragColor = vec4(col, 1.0);
}