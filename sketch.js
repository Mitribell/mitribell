let circle1, circle2;
let canvasSize = 400;
let strokeColor;
let designAmount, workAmount;

function setup() {
  let cnv1 = createCanvas(canvasSize, 566);
  cnv1.parent('left');
  // background(0, 220);
  createNewProject();
  textFont('helvetica');   
}

function draw() {
  background(25, 5);
  circle1.update();
  circle2.update();
  circle1.show();
  circle2.show();
  // text('Дизайн—це робота', 10, height - 10);  
  applyGravity(circle1, circle2);
}

function mouseClicked() {
  createNewProject();
}

function createNewProject() {
  let diameter1 = random(20, width / 2);
  let diameter2 = random(20, width / 2);
  strokeColor = random(200, 255);
  designAmount = diameter1 / (diameter1 + diameter2) * 100;
  workAmount = diameter2 / (diameter1 + diameter2) * 100;
  
  circle1 = new Circle(width * 1/2-50, height / 2, diameter1, random(-1,1) * 0.2, random(-1,1) * 0.2, 'Дизайн');
  circle2 = new Circle(width * 1/2+50, height / 2, diameter2, random(-1,1) * 0.2, random(-1,1) * 0.2, 'Робота');
}

function applyGravity(c1, c2) {
  let force = p5.Vector.sub(c2.pos, c1.pos);
  let distance = constrain(force.mag(), 5, 25);
  let strength = (c1.mass * c2.mass) / (distance * distance);
  force.setMag(strength);
  
  c1.applyForce(force);
  force.mult(-1);
  c2.applyForce(force);
}

class Circle {
  constructor(x, y, d, velX, velY, name) {
    this.pos = createVector(x, y);
    this.vel = createVector(velX, velY);
    this.acc = createVector(0, 0);
    this.d = d;
    this.mass = d * 0.5;
    this.name = name;
  }
  
  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }
  
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  
  show() {
    stroke(strokeColor);
    strokeWeight(3);
    noFill();
    ellipse(this.pos.x, this.pos.y, this.d);    
    noStroke();
    fill(strokeColor);
    text(this.name, this.pos.x + this.d / 2 + 10, this.pos.y);
    textSize(16);
    text('дизайн—це робота', 10, 22);
    textSize(8);
    text(`${designAmount.toFixed(2)}% дизайну \n${workAmount.toFixed(2)}% роботи`, width/2, 20);
    noFill();

  }
}

function windowResized() {
  button.position(windowWidth/2 - width / 2 +5, 28);
}
