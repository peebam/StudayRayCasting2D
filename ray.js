class Ray {
  constructor(pos, angle) {
     this.pos = pos;
     this.dir = p5.Vector.fromAngle(angle);
  }
  
  lookAt(x, y) {
     this.dir = this.pos;
  }
  
  setAngle(angle) {
    this.dir = p5.Vector.fromAngle(angle);
  }
  
  show() {
     stroke(255);
     push();
     translate(this.pos.x, this.pos.y);
     line(0, 0, this.dir.x * 10, this.dir.y * 10);
     pop();
  }
  
  _cast(wall) {
    // https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
    const x1 = wall.a.x;
    const y1 = wall.a.y;
    const x2 = wall.b.x;
    const y2 = wall.b.y;
     
    const x3 = this.pos.x;
    const y3 = this.pos.y;
    const x4 = this.pos.x + this.dir.x;
    const y4 = this.pos.y + this.dir.y;
    
    
    const den  = (x1 - x2) * (y3 - y4)  - (y1 - y2) * (x3 - x4)
    if (den == 0) {
      return null;
    }
    
    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    const u = ((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) / den;
    
    if (t <= 0 || t >= 1 || u <= 0) {
      return null;
    }
    
    return createVector(x1 + t * (x2 - x1), y1 + t* (y2 - y1))
  }
  
  
  cast(walls) {
    return walls.reduce((acc, w) => {
      const point = this._cast(w);
      if (!point) {
        return acc;  
      }
      if (!acc) {
        return point;
      }
      
      const distToPoint = dist(this.pos.x, this.pos.y, point.x, point.y);
      const distToAcc = dist(this.pos.x, this.pos.y, acc.x, acc.y);
      if (distToPoint < distToAcc) {
        return point;  
      }
      
      return acc;
    }, null)
  }
}
