class Land
{
  constructor(parametric, k = 4, subX, subY = subX)
  {
    this.fn = parametric;
    this.terrains = [];
    this.subdivide(k, [-1, -1], [1, 1], subX, subY);
  }

  subdivide(k, ss, es, subX, subY, half = 1)
  {
    if(k == 0)
    {
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
      let t = random(0.35, 0.65);

      if(half == 0)
      {
        half = abs(half - 1);
        this.subdivide(k - 1, [ss[0], ss[1]], [es[0] * t, es[1]], subX, subY, half);
        this.subdivide(k - 1, [es[0] * t, ss[1]], [es[0], es[1]], subX, subY, half);
      }
      else
      {
        half = abs(half - 1);
        this.subdivide(k - 1, [ss[0], ss[1]], [es[0], es[1] * t], subX, subY, half);
        this.subdivide(k - 1, [ss[0], es[1] * t], [es[0], es[1]], subX, subY, half);
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
        w * 0.05, // length along Z
        0, // amplitude for X-noise
        0, // amplitude for Y-noise
        0, // amplitude for Z-noise
      )
      pop();
    }
  }
}