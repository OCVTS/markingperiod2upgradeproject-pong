//player variables
let p1X = 20;
let p1Y = 250;
let p2X = 780;
let p2Y = 250;
let pWidth = 20;
let pHeight = 100;
let p1Speed = 5;
let p2Speed = 5;
let playerColor = 'ghost white'


//ball variables
let ballX = 400;
let ballY = 250;
let ballSize = 20;
let ballSpeed = 3;
let ballDirectionX = 1;
let ballDirectionY = 1;
let ballColor = 'purple';  

//scoreboard variables
let p1Score = 0;
let p2Score = 0;


// Timer for random power triggers
let powerTimer = 0;
let powerCooldown = 10000;  // Time between powers (10 seconds)
let lastPowerTime = 0;


// Power functions stored in an array
let powerArray = [power1, power3, power4, power5, power6]; // Add any other powers here

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
    fill(playerColor);
    rect(p1X, p1Y, pWidth, pHeight);
    rect(p2X, p2Y, pWidth, pHeight);

    // draw ball 
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
        ballDirectionX = ballDirectionX * -1;
    }
    if (ballX >= p1X - pWidth / 2 && ballX <= p1X + pWidth / 1 && ballY >= p1Y - pHeight / 2 && ballY <= p1Y + pHeight / 2) {
        ballDirectionX = ballDirectionX * -1;
    }

    // Handle random power-ups every 10 seconds
    let currentTime = millis();
    if (currentTime - lastPowerTime >= powerCooldown) {
        triggerRandomPower();
        lastPowerTime = currentTime; // Reset the timer after the power is triggered
    }
}

// Trigger a random power from the array
function triggerRandomPower() {
    let powerChoice = floor(random(0, powerArray.length)); // Random index of the power array
    powerArray[powerChoice]();  // Call the selected power function
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

//power functions to change the ball's behavior or appearance
function power1() {
    p1Speed += 2;
    p2Speed += 2;
    setTimeout(() => {
        p1Speed -= 2;
        p2Speed -= 2;
    }, 5000); // Revert speed after a certain amount of time
}

function power3() {
    ballSpeed += 2.5;
    ballColor = 'red';  
    setTimeout(() => {
        ballSpeed -= 2.5;
        ballColor = 'purple';
    }, 9000); //revert after some time
}

function power4() {
    pHeight += 100;
    setTimeout(() => {
        pHeight -= 100;
    }, 5000); //revert after some time
}

function power5() {
    ballSpeed = 2;
    ballColor = 'purple';  
}

function power6() {
    ballSize += 1
    ballColor = 'ghostwhite';
    setTimeout(() => {
        ballSize -= 1;
        ballColor = 'purple';
    }, 1000); //revert after some time
}
