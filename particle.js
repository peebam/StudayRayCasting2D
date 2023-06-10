class Particle {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.rays = [];
    for (let a = 0; a < 360; a += 1) {
      this.rays.push(new Ray(this.pos, radians(a)));
    }
  }

  update(x, y) {
    this.pos.set(x, y);
  }

  look(walls) {
    this.rays.forEach(r => {
      const pt = r.cast(walls);
      if (pt) {
        stroke(255, 100);
        line(this.pos.x, this.pos.y, pt.x, pt.y);
        return;
      }
    }
    );
  }

  show() {
    this.rays.forEach(r => r.show());
    fill(255);
    ellipse(this.pos.x, this.pos.y, 16, 16);
  }
}
