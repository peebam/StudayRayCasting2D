class Particle {
  constructor(x, y) {

    this.fov = 60;
    this.pos = createVector(x, y);
    this.rays = [];
    this.heading = 0;

    this.setFov(60);
  }

  setFov(fov) {
    this.fov = fov;
    this.rays = [];
    
    for (let i = -this.fov / 2; i < this.fov / 2; i += 1) {
      this.rays.push(new Ray(this.pos, radians(i) + this.heading));
    }
  }

  rotate(angle) {
    this.heading += angle;


    let index = 0;
    for (let i = -this.fov / 2; i < this.fov / 2; i += 1) {
      this.rays[index].setAngle(radians(i) + this.heading);
      index++;
    }
  }

  move(amount) {

    const velocity = p5.Vector.fromAngle(this.heading);
    velocity.setMag(amount);
    this.pos.add(velocity);
  }

  update(x, y) {
    this.pos.set(x, y);
  }

  look(walls) {
    const scene = [];

    this.rays.forEach((r, i) => {
      const pt = r.cast(walls);
      if (pt) {
        stroke(255, 100);
        line(this.pos.x, this.pos.y, pt.x, pt.y);
        
        const distance = p5.Vector.dist(this.pos, pt);
       
        if (mouseIsPressed) {
          scene[i] = distance;
          return;
        }
         const angle = r.dir.heading() - this.heading;
        scene[i] = distance * cos(angle);
        return;
      }
      scene[i] = null;
    }
    );

    return scene;
  }

  show() {
    this.rays.forEach(r => r.show());
    fill(255);
    ellipse(this.pos.x, this.pos.y, 16, 16);
  }
}
