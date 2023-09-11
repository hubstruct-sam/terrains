attribute vec3 aPosition;
attribute vec2 aTexCoord;

varying vec4 vertTexCoord;

void main() 
{
  vertTexCoord = vec4(aTexCoord, 0., 0.);
  vertTexCoord.y = 1.0 - vertTexCoord.y;
  
  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

  gl_Position = positionVec4;
}