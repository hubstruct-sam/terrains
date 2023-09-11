#ifdef GL_ES
precision highp int;
precision highp float;
#endif

uniform vec2 uCenter;
uniform vec3 uColA;
uniform vec3 uColB;
// uniform float mixVal;

varying vec4 vertTexCoord;


void main()
{ 
    float mixValue = distance(vertTexCoord.st, uCenter.xy);
    vec3 col = mix(uColA, uColB, mixValue);
    
    gl_FragColor = vec4(col, 1.0);
}