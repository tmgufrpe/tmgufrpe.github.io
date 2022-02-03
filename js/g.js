p5.disableFriendlyErrors = true;
class Edge {

  constructor(m1, m2) {
    this.m1 = m1;
    this.m2 = m2;
  }

}

class Mover {

  constructor() {
    this.position = createVector(random(0, width), random(0, height));
    this.velocity = createVector(random(-1, 1), random(-1, 1));
  }

  update() {
    this.position.add(this.velocity);

    if (this.position.x > width) this.position.x = 0;
    if (this.position.x < 0) this.position.x = width;
    if (this.position.y > height) this.position.y = 0;
    if (this.position.y < 0) this.position.y = height;
  }
}


let points = [];


let pg;
let updateBackground = true;

function fillPg(){
  let from = color(129, 30, 101);
  let to = color(26, 69, 130);

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      pg.set(j, i, lerpColor(from, to, j / width));
    }
  }
  pg.updatePixels();
  updateBackground = false;
}


function windowResized() {
  resizeCanvas(windowWidth, 400);
  updateBackground = true;
}

function setup() {

  let canvas = createCanvas(windowWidth, 400);
  canvas.parent('cv');
  let pc = width / 100 * height / 100;
  for (let i = 0; i < pc; i++) {
    points.push(new Mover());
  }

  pg = createGraphics(width, height);
}


function draw() {
  if(updateBackground) fillPg();
  image(pg, 0, 0);

  let mouse = createVector(mouseX, mouseY);

  let mr = [];
  let q = 200;

  for (let i = 0; i < points.length; i++) {
    if (p5.Vector.sub(mouse, points[i].position).magSq() < q * q) mr.push(points[i]);
    points[i].update();
    fill(255, 100);
    stroke(0, 0);
    ellipse(points[i].position.x, points[i].position.y, 10, 10);
  }


  let es = new Set();
  let edges = [];

  for (let i = 0; i < mr.length; i++) {
    for (let j = 0; j < mr.length; j++) {
      if (i == j) continue;
      if (es.has(`${i} ${j}`)) continue;
      es.add(`${i} ${j}`);
      es.add(`${j} ${i}`);
      edges.push(new Edge(mr[i], mr[j]));
    }
  }


  for (let e of edges) {
    let sd = p5.Vector.sub(mouse, e.m1.position).magSq();
    let ed = p5.Vector.sub(mouse, e.m2.position).magSq();

    let d = 3600 / max(sd, ed);
    d = constrain(d, 0, 1);

    strokeWeight(2 * d);
    stroke(255, 100 * d);


    line(e.m1.position.x, e.m1.position.y, e.m2.position.x, e.m2.position.y);
  }
}

