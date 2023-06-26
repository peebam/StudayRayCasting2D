let walls = [];
let particle;

let xOff = 0;
let yOff= 1000;

const sceneHeight = 400;
const sceneWidth = 450;
let scene = [];
let sliderFov;

function setup() {
  createCanvas(sceneWidth * 2, sceneHeight);
  for (let w = 0; w < 6; w++) {
    walls[w] = new Boundary(random(sceneWidth), random(sceneHeight), random(sceneWidth), random(sceneHeight))
  }
  particle = new Particle(sceneWidth / 2, sceneHeight / 2);
  noiseSeed();
  walls.push(new Boundary(0, 0, sceneWidth, 0));
  walls.push(new Boundary(sceneWidth, 0, sceneWidth, sceneHeight));
  walls.push(new Boundary(sceneWidth, sceneHeight, 0, sceneHeight));
  walls.push(new Boundary(0, sceneHeight, 0, 0 ));
  createDiv("FOV");
  sliderFov = createSlider(0, 360, 60); 
  sliderFov.input(changeFov);
  createDiv("Use arrows to move");
}

function keyPressed() {
  console.log(a)
}

function changeFov() {
  const fov = sliderFov.value();
  particle.setFov(fov);
}

function draw() {
  background(0);
  
  if (keyIsDown(LEFT_ARROW)) {
    particle.rotate(-0.05);
  }
  if (keyIsDown(RIGHT_ARROW)) {
    particle.rotate(0.05);
  }
    if (keyIsDown(UP_ARROW)) {
    particle.move(2);
  }
  if (keyIsDown(DOWN_ARROW)) {
    particle.move(-2);
  }
  
  //particle.update(mouseX, mouseY);
  //particle.update(noise(xOff) * sceneWidth, noise(yOff) * sceneHeight);
  xOff += 0.008;
  yOff += 0.008;

  walls.forEach(w => w.show());
  scene = particle.look(walls);
  particle.show();

  const sliceWidth = sceneWidth / scene.length;

  push();

  translate(sceneWidth, 0);
  scene.forEach((s, i) => {
    noStroke();

    if (s == null) {
      return;
    }

    wallHeigh = map(s, 0, sceneWidth, sceneHeight, 0)
    
      brightness = map(s * s, 0, sceneWidth * sceneWidth, 255, 0)
      fill(brightness);

    rectMode(CENTER);
    rect(i * sliceWidth + sliceWidth / 2, sceneHeight / 2, sliceWidth + 1, wallHeigh);
  }
  );
  pop();
}
