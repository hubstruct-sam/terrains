#ifdef GL_ES
precision highp int;
precision highp float;
#endif

#define NUM_OCTAVES 5

uniform sampler2D uTexture;
uniform vec4 vertTexCoord;
uniform vec2 uSketchSize;
uniform float uRandomizer;
uniform float uBrightness;

float random(vec2 st, float randomizer);
float noise(vec2 st, float randomizer);
float fbm(vec2 x, float H, float randomizer);
float map(float value, float min1, float max1, float min2, float max2);

void main()
{
    float H = 1.0;

    vec2 st = gl_FragCoord.xy/uSketchSize;
    st.x *= uSketchSize.x/uSketchSize.y;
    vec2 p = st*0.05;

    float f = fbm(p*3.+0.5+fbm(25.*p +fbm(5.*p, H, uRandomizer), H, uRandomizer), H, uRandomizer);
    vec3 vF = vec3(map(f, 0.0, 1.0, 0.25, uBrightness));
    vec3 tex = texture2D(uTexture, st).rgb;

    gl_FragColor = vec4(tex*vF, 1.);
}

float random(vec2 st, float randomizer)
{
    return fract(sin(dot(st, vec2(12.2478932753, 78.14738374)))*245.346259*randomizer);
}
float noise(vec2 st, float randomizer)
{
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i, randomizer);
    float b = random(i + vec2(1., 0.), randomizer);
    float c = random(i + vec2(0., 1.), randomizer);
    float d = random(i + vec2(1., 1.), randomizer);

    vec2 u = f*f*(3.-2.*f);

    return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y;
}
float fbm(vec2 x, float H, float randomizer)
{
    float G = exp2(-H);
    float f = 1.;
    float a = 1.;
    float t = 0.;
    for( int i = 0; i < NUM_OCTAVES; i++ )
    {
        t += a*noise(f*x, uRandomizer);
        f *= 1.99;
        a *= G;
    }
    return t;
}
float map(float value, float min1, float max1, float min2, float max2) 
{
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}