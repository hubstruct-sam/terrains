let terrain;

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
  terrain = new Terrain(
    parametric, // z-function 
    64, // subX
    64, // subY
    -1, // minX
     1, // maxX
    -1, // minY
     1, // maxY
    );

  isoCam([0.5, 0.5, 0.5]);
  background(255);

  push();
  terrain.draw(
    Terrain.MIX,
    w * 0.25, // length along X
    h * 0.25, // length along Y
    w * 0.05, // length along Z
    0.01, // amplitude for X-noise
    0.01, // amplitude for Y-noise
    1.5, // amplitude for Z-noise
  )
  pop();

  axis(w, w * 0.002);

  refresh = !refresh;
}

function generateLand()
{
  ts = [];
  subdivideR(4, [-w*0.5, -h*0.5], [w, h, w*0.75]);
}

function subdivideR(k, pos, sizes, half=0)
{
  if(k == 0)
    // ts.push(new Terrain(ts.length, [pos[0], pos[1], 0], sizes, k=2, w*0.003));
    ts.push(new Terrain(ts.length, [pos[0], pos[1], 0], sizes, freq));
  else 
  {
    let t = random(0.15, 0.85);
    let pan = 0;

    switch(half) 
    {
      case 0:
        half = abs(half - 1);
        subdivideR(k - 1, [pos[0], pos[1]], [sizes[0]*t, sizes[1], sizes[2]], half);
        subdivideR(k - 1, [pos[0] + sizes[0] * t + pan, pos[1]], [sizes[0] * (1 - t), sizes[1], sizes[2]], half);   
      break;

      case 1:
        half = abs(half - 1);
        subdivideR(k - 1, [pos[0], pos[1]], [sizes[0], sizes[1]*t, sizes[2]], half);
        subdivideR(k - 1, [pos[0], pos[1] + sizes[1] * t + pan, sizes[2]], [sizes[0], sizes[1] * (1 - t), sizes[2]], half);
      break;	
    }
  }
}