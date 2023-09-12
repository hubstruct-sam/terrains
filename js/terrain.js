class Terrain
{
  static TRI = 0;
  static QUD = 1;
  static MIX = 2;

  constructor(parametric, subX, subY, minX = 0, minY = 0, maxX = 1, maxY = 1)
  {
    this.vs = []; // Vertices
  
    subX++;
    subY++;

    this.subX = subX;
    this.subX = subY;

    // Create vertices
    for(let y = 0; y < subY; y++)
    {
      this.vs[y] = [];
      for(let x = 0; x < subX; x++)
      {
        this.vs[y].push(
          parametric(
            [
              map(subX <= 1 ? 0.5 : x / (subX - 1), 0, 1, minX, maxX), 
              map(subY <= 1 ? 0.5 : y / (subY - 1), 0, 1, minY, maxY),
            ]
          )
        )
      }
    }    
  }

  setVertex(v, lx, ly, lz, ax, ay, az)
  {
    let x = v[0] + ax * map(noise(v[0], v[1], v[2]), 0, 1, -1, 1);
    let y = v[1] + ay * map(noise(v[1], v[2], v[0]), 0, 1, -1, 1);
    let z = v[2] + az * map(noise(v[2], v[0], v[1]), 0, 1, -1, 1);
    return vertex(x * lx, y * ly, z * lz);
  }

  drawT(a, b, c, d, lx, ly, lz, ax, ay, az)
  {
   beginShape();
   this.setVertex(a, lx, ly, lz, ax, ay, az);
   this.setVertex(b, lx, ly, lz, ax, ay, az);
   this.setVertex(d, lx, ly, lz, ax, ay, az);
   this.setVertex(b, lx, ly, lz, ax, ay, az);
   this.setVertex(c, lx, ly, lz, ax, ay, az);
   this.setVertex(d, lx, ly, lz, ax, ay, az);
   endShape(CLOSE) 
  }

  drawQ(a, b, c, d, lx, ly, lz, ax, ay, az)
  {
   beginShape();
   this.setVertex(a, lx, ly, lz, ax, ay, az);
   this.setVertex(b, lx, ly, lz, ax, ay, az);
   this.setVertex(c, lx, ly, lz, ax, ay, az);
   this.setVertex(d, lx, ly, lz, ax, ay, az);
   endShape(CLOSE) 
  }

  draw(mode, lx, ly, lz, ax = 0, ay = 0, az = 0)
  {
    push();
    
    fill(255);
    stroke(0);
    strokeWeight(lx * 0.005);
    
    for(let y = 0; y < this.vs.length - 1; y++)
    {
      for(let x = 0; x < this.vs[y].length - 1; x++)
      {
        // strokeWeight(lx * 0.015 * random());

        let a = this.vs[y    ][x    ];
        let b = this.vs[y    ][x + 1];
        let c = this.vs[y + 1][x + 1];
        let d = this.vs[y + 1][x    ];

        if(mode == Terrain.TRI)
        {
          this.drawT(a, b, c, d, lx, ly, lz, ax, ay, az);
        }
        else if(mode == Terrain.QUD)
        {
          this.drawQ(a, b, c, d, lx, ly, lz, ax, ay, az);
        }
        else
        {
          if(random(1) > 0.15)
          {
            random(1) > 0.5 ? 
              this.drawT(a, b, c, d, lx, ly, lz, ax, ay, az):
              this.drawQ(a, b, c, d, lx, ly, lz, ax, ay, az);
          }
        }
      }
    }
    
    pop();
  }

}