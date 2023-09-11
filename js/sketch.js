function parametric([x, y], amp, phase)
{
  const u = x * 2 - 1;
  const v = y * 2 - 1;
  const z = amp * Math.sin(u * Math.PI * 2 + phase / (v * 0.05 + 1));
  // const z = Math.sin((u * 2.0)**2) + Math.cos((v * 2.0)**2);
  return [x, y, z];
}

function setup()
{
  w = innerWidth;
  h = innerHeight;
  createCanvas(w, h, WEBGL);
}

let t = 0;

function draw()
{
  if(refresh)
  {
    genSystem();
  }
}

function genSystem()
{
  setSeed();

  isoCam([0.5, 0.5, 0.5]);
  background(0, 255, 0);

  // makeTerrain();
  makeLand();

  axis(w, w * 0.002);
  
  push();
  noFill();
  strokeWeight(w * 0.01);
  stroke(255, 0, 0);
  rect(-w * 0.25, -h * 0.25, w * 0.5, h * 0.5);
  pop();

  refresh = !refresh;
}

function makeTerrain()
{
  const terrain = new Terrain(
    parametric, // z-function 
    64, // subX
    64, // subY
    -1, // minX
    -1, // minY
     1, // maxX
     1, // maxY
  );

  push();
  terrain.draw(
    Terrain.MIX,
    w * 0.25, // length along X
    h * 0.25, // length along Y
    w * 0.05, // length along Z
    0.01, // amplitude for X-noise
    0.01, // amplitude for Y-noise
    1.5, // amplitude for Z-noise
  );
  pop();
}

function makeLand()
{
  const land = new Land(
    parametric,
    1,
    4,
    4
  );

  land.draw(w, h, Terrain.QUD);
}