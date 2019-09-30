let player = {
  x: 200,
  y: 360,
  width: 64,
  height: 64,
  lockAttack: false,
  lockCounter: 0,
  hp: 3,
  level: 1,
  active: true,
};

let playerImage; // 1
let playerBuleltImage1; //1
let enemyBulletImage;
let enemyImage;

function preload() {
  playerImage = loadImage('player.png'); // 2
  playerBuleltImage1 = loadImage('playerbullet1.png');
  enemyBulletImage = loadImage('enemybullet.png');
  enemyImage = loadImage('enemy.png');
}

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
