// let seed, nextSeed = 4065186;
let seed, nextSeed = 8309768; // DEBUG: subdivision
let w, h;
let refresh = true;

const zeroPad = (num, places) => String(num).padStart(places, '0');

function keyPressed()
{
  if(key == 'r' || key == 'R')
    refresh = true;
  if(key == 's' || key == 'S')
    save("screen_" + seed + ".jpg");
}

function setSeed()
{
  seed = nextSeed == undefined ? floor(random(1000000)) : nextSeed;
  randomSeed(seed);
  noiseSeed(seed);
  nextSeed = floor(random(10000000));
}

function isoCam(zoom)
{
  ortho(-w * zoom[0],  w * zoom[0], 
         h * zoom[1], -h * zoom[1],
         0          ,  w * h      );

  rotateX(-PI * 0.25);
  rotateZ(1 / sqrt(2) + PI);
}

function axis(length, sw)
{
  push();

  noFill();
  strokeWeight(sw);

  push();
  stroke(255, 0, 0);
  line(0, 0, 0, length, 0, 0);
  pop();
  
  push();
  stroke(0, 255, 0);
  line(0, 0, 0, 0, length, 0);
  pop();

  push();
  stroke(0, 0, 255);
  line(0, 0, 0, 0, 0, length);
  pop();

  pop();
}