function level1() {
  if (player.active == true) {
    clear();
    rect(0, 0, 400, 400);
    processPlayer();
    processEnemies();
    playerShoot();
    dropGift();
    processEnemyBullets();
    checkCollide();
  }
}
let playerBullets = [];
let enemies = [];
let gifts = [];
let enemyCounter = 0;

function clamp(x, min, max) {
  if (x <= min) return min;
  if (x >= max) return max;
  return x;
}

function processPlayer() {
  //circle(player.x, player.y, 20);
  image(playerImage, player.x - 32, player.y - 32); //3
  if (keyIsDown(LEFT_ARROW)) {
    player.x -= 5;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    player.x += 5;
  }

  if (keyIsDown(UP_ARROW)) {
    player.y -= 5;
  }

  if (keyIsDown(DOWN_ARROW)) {
    player.y += 5;
  }
  player.x = clamp(player.x, 0, 400);
  player.y = clamp(player.y, 0, 400);
}

function playerShoot() {
  if (!player.lockAttack) {
    if (keyIsDown(88)) {
      if (player.level == 1) {
        let newBullet = {
          x: player.x,
          y: player.y - 20,
          active: true,
        };
        playerAttackSound.play();
        playerBullets.push(newBullet);
      } else if (player.level == 2) {
        let newBullet1 = {
          x: player.x - 10,
          y: player.y - 20,
          active: true, 
        };
        let newBullet2 = {
          x: player.x + 10,
          y: player.y - 20,
          active: true, 
        }
        playerBullets.push(newBullet1);
        playerBullets.push(newBullet2);
      }
      player.lockAttack = true;
      player.lockCounter = 0;
    }
  }

  if (player.lockAttack) {
    player.lockCounter++;
    if (player.lockCounter >= 10) {
      player.lockAttack = false;
    }
  }

  for(let i = 0; i < playerBullets.length; i++) {
    let bullet = playerBullets[i];
    if (bullet.active) {
      // image(playerImage, player.x - 32, player.y - 32); //3
      // circle(bullet.x, bullet.y, 8); // 3
      image(playerBuleltImage1, bullet.x - 7.5, bullet.y - 6.5);
      bullet.y -= 8;
    }
  }
}


function processEnemies() {
  enemyCounter++;
  if (enemyCounter > 80) {
    let newEnemy = {
      x: Math.random() * 400 - 15,
      y: 0,
      active: true,
      hp: 5,
      width: 50,
      height: 50,
      counter: Math.floor(Math.random() * 100),
    };
    enemies.push(newEnemy);
    enemyCounter = Math.random() * 10;
  }

  for(let i = 0; i < enemies.length; i++) {
    let enemy = enemies[i];
    if (enemy.active) {
      enemy.counter++;
      enemy.y += 2;
      image(enemyImage, enemy.x - enemy.width / 2, enemy.y - enemy.height / 2);
      if (enemy.counter > 100) {
        enemy.counter = 0;
        let newEnemyBullet = {
          x: enemy.x,
          y: enemy.y,
          width: 15,
          height: 15,
        };
        enemyBullets.push(newEnemyBullet);
      }
    }
  }
}

function processEnemyBullets() {
  for(let i = 0; i < enemyBullets.length; i++) {
    let enemyBullet = enemyBullets[i];
    // rect(enemyBullet.x, enemyBullet.y, enemyBullet.width, enemyBullet.height); // 3
    image(enemyBulletImage, enemyBullet.x - 12, enemyBullet.y - 25);
    enemyBullet.y += 3;
  }
}

let enemyBullets = [];

function checkCollide() {
  for (let k = 0; k < gifts.length; k++) {
    let gift = gifts[k];
    if (gift.active) {
      if (overlap(gift, player)) {
        gift.active = false;
      }
    }
  }

  for(let i = 0; i < playerBullets.length; i++) {
    let bullet = playerBullets[i];
    if (bullet.active) {
      for(let j = 0; j < enemies.length; j++) {
        let enemy = enemies[j];
        if (enemy.active) {
          const rect1 = {
            x: bullet.x,
            y: bullet.y,
            width: 8,
            height: 8,
          };
          const rect2 = {
            x: enemy.x,
            y: enemy.y,
            width: 30,
            height: 30,
          };
          if (overlap(rect1, rect2)) {
            bullet.active = false;
            enemy.hp = enemy.hp - 1;
            if (enemy.hp == 0) {
              enemy.active = false;  
            }
          }
        }
      }
    }
  }

  for(let i = 0;i < enemies.length; i++) {
    let enemy = enemies[i];
    if (enemy.active) {
      if(overlap(enemy, player)) {
        enemy.active = false;
        player.hp = player.hp - 1;
        if(player.hp == 0) {
          player.active = false;
          alert('You died');
        }
      }
    }
  }
}

let newGift = {
  x: Math.random() * 400 - 15,
  y: 0,
  width: 10,
  height: 10,
  active: true,
};

let giftDelayCount = 0;
function dropGift() {
  giftDelayCount ++;
  if (giftDelayCount == 500) {
    giftDelayCount = 0;
    gifts.push(newGift);
  }
  for(let i = 0; i < gifts.length; i++) {
    let gift = gifts[i];

    if (gift.active) {
      console.log('gift');
      rect(gift.x, gift.y, 10, 10);
      gift.y +=2 ;
      if(overlap(player, gift)) {
        player.level = 2;
        gift.active = false;
      }
    }
  }
}
