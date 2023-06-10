let walls = [];
let particle;

let xOff = 0;
let yOff= 1000;

function setup() {
  createCanvas(800, 400);
  for (let w = 0; w < 6; w++) {
    walls[w] = new Boundary(random(width), random(height), random(width), random(height))
  }
  particle = new Particle();
  noiseSeed();
  walls.push(new Boundary(0, 0, width, 0));
  walls.push(new Boundary(width, 0, width, height));
  walls.push(new Boundary(width, height, 0, height));
  walls.push(new Boundary(0, height, 0, 0 ));
}


function draw() {
  background(0);
  //particle.update(mouseX, mouseY);
  particle.update(noise(xOff) * width, noise(yOff) * height);
  xOff += 0.008;
  yOff += 0.008;
  
  walls.forEach(w => w.show());
  particle.look(walls);
  particle.show();
}
