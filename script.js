//player variables
let p1X = 20;
let p1Y = 250;
let p2X = 780;
let p2Y = 250;
let pWidth = 20;
let pHeight = 100;
let p1Speed = 5;
let p2Speed = 5;

//ball variables
let ballX = 400;
let ballY = 250;
let ballSize = 20;
let ballSpeed = 2;
let ballDirectionX = 1;
let ballDirectionY = 1;
let ballColor = 'purple';  

//scoreboard variables
let p1Score = 0;
let p2Score = 0;

// Timer for random power triggers
let powerTimer = 0;
let powerCooldown = 15000;  // Time between powers (15 seconds)
let lastPowerTime = 0;

function setup() {
    createCanvas(800, 500);
    rectMode(CENTER);
    textAlign(CENTER);
}

function draw() {
    keyPressed();
    keyTyped();

    // draw court
    background(0);
    noFill();
    stroke(255);
    strokeWeight(3);
    line(400, 0, 400, 500);
    rect(400, 250, 800, 500);

    // draw players
    noStroke();
    fill(255);
    rect(p1X, p1Y, pWidth, pHeight);
    rect(p2X, p2Y, pWidth, pHeight);

    // draw ball with dynamic color
    noStroke();
    fill(ballColor);
    square(ballX, ballY, ballSize);

    // draw score board
    noStroke();
    fill(255);
    textSize(30);
    text(p1Score, 350, 50);
    text(p2Score, 450, 50);

    if (ballX >= 800) {
        p1Score += 1;
        resetBall();
    }

    if (ballX <= 0) {
        p2Score += 1;
        resetBall();
    }

    // move ball
    ballX += (ballSpeed * ballDirectionX);
    ballY += (ballSpeed * ballDirectionY);

    if (ballY + ballSize / 2 >= 500 || ballY - ballSize / 2 <= 0) {
        ballDirectionY *= -1;  // Flip direction without reducing speed
    }

    // collide with players
    if (ballX >= p2X - pWidth / 1 && ballX <= p2X + pWidth / 2 && ballY >= p2Y - pHeight / 2 && ballY <= p2Y + pHeight / 2) {
        ballDirectionX = ballDirectionX * -1.1;
    }
    if (ballX >= p1X - pWidth / 2 && ballX <= p1X + pWidth / 1 && ballY >= p1Y - pHeight / 2 && ballY <= p1Y + pHeight / 2) {
        ballDirectionX = ballDirectionX * -1.1;
    }

    // Handle random power-ups every 15 seconds
    let currentTime = millis();
    if (currentTime - lastPowerTime >= powerCooldown) {
        triggerRandomPower();
        lastPowerTime = currentTime; // Reset the timer after the power is triggered
    }
}

// Trigger a random power
function triggerRandomPower() {
    let powerChoice = floor(random(1, 6)); // Random number between 1 and 5
    switch (powerChoice) {
        case 1:
            power1();
            break;
        // case 2:
        //     power2();
        //     break;
        case 3:
            power3();
            break;
        case 4:
            power4();
            break;
        case 5:
            power5();
            break;
    }
}

// Reset the ball position and direction
function resetBall() {
    ballX = 400;
    ballY = 250;
    ballDirectionX = ballDirectionX === 1 ? -1 : 1; // Change the direction
}



function keyPressed() {
    // if (keyCode == UP_ARROW && keyIsPressed == true){
    //     p2Y = p2Y - p2Speed;
    // }
    // if (keyCode == DOWN_ARROW && keyIsPressed == true) {
    //     p2Y = p2Y + p2Speed;
    // }
}// close keyPressed

function keyTyped() {
      // Player movement
      if (keyIsDown(UP_ARROW)) {
        p2Y = p2Y - p2Speed;
    }
    if (keyIsDown(DOWN_ARROW)) {
        p2Y = p2Y + p2Speed;
    }

    if (keyIsDown(87)) { // W key
        p1Y = p1Y - p1Speed;
    }
    if (keyIsDown(83)) { // S key
        p1Y = p1Y + p1Speed;
    }
}
    // if (key == 'w' && keyIsPressed ) {
    //     p1Y = p1Y - p1Speed;
    // }
    // if (key == 's' && keyIsPressed ) {
    //     p1Y = p1Y + p1Speed;
    // }
//close keyTyped

//power functions to change the ball's behavior or appearance
function power1() {
    p1Speed += 4;
    p2Speed += 4;
}

// function power2() {
//     pWidth += 200;
// }

function power3() {
    ballSpeed += 5;
    ballColor = 'red';  
}

function power4() {
    pHeight += 200;
}
function power5() {
    ballSpeed = 2;
    ballcolor = 'purple';
}
