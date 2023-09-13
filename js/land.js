class Land
{
  constructor(parametric, k, subX, subY)
  {
    this.fn = parametric;
    this.terrains = [];
    this.subdivide(k, [-1, -1], [1, 1], subX, subY);
  }

  subdivide(k, ss, es, subX, subY, half = 1)
  {
    if(k == 0)
    {
      // const randSubX = evenify(round(random(2, subX))); 
      // const randSubY = evenify(round(random(2, subY))); 
      // console.log('randSubX = ' + randSubX); 
      // console.log('randSubY = ' + randSubY); 
      this.terrains.push(new Terrain(
        this.fn, 
        evenify(round(random(2, subX))), 
        evenify(round(random(2, subY))), 
        ss[0], 
        ss[1], 
        es[0],
        es[1], 
      ));
    }
    else
    {
      let t = random(0.25, 0.75);

      if(half == 1)
      {
        this.subdivide(k - 1, [ss[0], ss[1]], [es[0] * t, es[1]], subX, subY, !half);
        this.subdivide(k - 1, [es[0] * t, ss[1]], [es[0], es[1]], subX, subY, !half);
      }
      else
      {
        this.subdivide(k - 1, [ss[0], ss[1]], [es[0], es[1] * t], subX, subY, !half);
        this.subdivide(k - 1, [ss[0], es[1] * t], [es[0], es[1]], subX, subY, !half);
      }
    }
  }

  draw(w, h, mode = Terrain.MIX)
  {
    for(let terrain of this.terrains)
    {
      fill(random(255));
      push();
      terrain.draw(
        mode, // drawing mode
        w * 0.25, // length along X
        h * 0.25, // length along Y
        w * 0.015, // length along Z
        0, // amplitude for X-noise
        0, // amplitude for Y-noise
        1.5, // amplitude for Z-noise
      )
      pop();
    }
  }
}