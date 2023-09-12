function parametric([x, y])
{
  const z = Math.sin(x * Math.PI * 2 / (y * 0.05 + 1));
  // const z = Math.sin((x * 2.0)**2) + Math.cos((y * 2.0)**2);
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

  background(0, 100, 0, 255);
  isoCam([0.5, 0.5, 0.5]);

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
    6,
    8,
    8,
  );

  land.draw(w, h, Terrain.QUD);
}