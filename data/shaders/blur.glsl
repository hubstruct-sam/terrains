#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define STEP 9

uniform sampler2D uTexture;
uniform vec2 uSketchSize;
uniform vec2 uDirection;
uniform float uTexelOffset;
varying vec4 vertTexCoord;

vec3 gaussianBlur(sampler2D t, vec2 texUV, vec2 stepSize)
{   
	// a variable for our output                                                                                                                                                                 
	vec3 colOut = vec3(0.0);                                                                                                                             

	// these weights were pulled from the link above
	float gWeights[9];
  gWeights[0] = 0.10855;
  gWeights[1] = 0.13135;
  gWeights[2] = 0.10406;
  gWeights[3] = 0.07216;
  gWeights[4] = 0.04380;
  gWeights[5] = 0.02328;
  gWeights[6] = 0.01083;
  gWeights[7] = 0.00441;
  gWeights[8] = 0.00157;

	// these offsets were also pulled from the link above
	float gOffsets[9];
  gOffsets[0] = 0.66293;
  gOffsets[1] = 2.47904;
  gOffsets[2] = 4.46232;
  gOffsets[3] = 6.44568;
  gOffsets[4] = 8.42917;
  gOffsets[5] = 10.41281;
  gOffsets[6] = 12.39664;
  gOffsets[7] = 14.38070;
  gOffsets[8] = 16.36501;
	
	// lets loop nine times
	for(int i = 0; i < STEP; i++)
  {  
		// multiply the texel size by the by the offset value                                                                                                                                                               
	    vec2 texCoordOffset = gOffsets[i] * stepSize;
		// sample to the left and to the right of the texture and add them together                                                                                                           
	    vec3 col = texture2D(t, texUV + texCoordOffset).xyz + texture2D(t, texUV - texCoordOffset).xyz; 
		// multiply col by the gaussian weight value from the array
		col *= gWeights[i];
		// add it all up
	    colOut +=  col;                                                                                                                               
	}
	// our final value is returned as col out
	return colOut;                                                                                                                                                   
} 


void main() 
{
  vec2 uv = vertTexCoord.xy;
  vec2 texelSize = vec2(1.0)/uSketchSize * uTexelOffset;

  // use our blur function
  vec3 blur = gaussianBlur(uTexture, uv, texelSize * uDirection);

  gl_FragColor = vec4(blur, 1.0);
}
