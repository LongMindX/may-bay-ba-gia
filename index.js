function setup() {
  createCanvas(400, 400);
}

function draw() {
  if (lvl == 1) {
    level1();
  } else if (lvl == 2) {
    level2();
  }
}
