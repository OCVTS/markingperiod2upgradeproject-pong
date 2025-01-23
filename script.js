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

//scoreboard variables
let p1Score = 0;
let p2Score = 0;

function setup() {
    createCanvas(800,500);
    rectMode(CENTER);
    textAlign(CENTER);
    // background(100);
}// close setup

function draw(){
keyPressed();
keyTyped();

    // draw court
    background(0);
    noFill();
    stroke(255);
    strokeWeight(3);
    line(400,0,400,500);
    rect(400,250,800,500);

    //draw players
    noStroke();
    fill(255);
    rect(p1X, p1Y, pWidth, pHeight)
    rect(p2X, p2Y, pWidth, pHeight)

// draw ball
noStroke();
fill(255);
square(ballX, ballY, ballSize)

//draw score board
noStroke();
fill(255);
textSize(30);
text(p1Score, 350, 50);
text(p2Score,450,50);

if (ballX >= 800) {
    p1Score += 1;
    ballX = 400;
    ballY = 250;
    ballDirectionX = -1;
}


if (ballX <= 0) {
    p2Score += 1;
    ballX = 400;
    ballY = 250;
    ballDirectionX = 1;
}


// move ball
ballX = ballX + (ballSpeed * ballDirectionX);
ballY = ballY + (ballSpeed * ballDirectionY);

// collide with top / bottom walls
if (ballY + ballSize/2 >= 500) {
    ballDirectionY = ballDirectionY * -0.5;
}
if (ballY - ballSize/2 <= 0) {
    ballDirectionY = ballDirectionY * -0.5;
}




// collide with players
if (ballX >= p2X - pWidth/2 && ballX <= p2X + pWidth /
    2 && ballY >= p2Y - pHeight/2 && ballY <= p2Y + pHeight/2)
    {
        ballDirectionX = ballDirectionX * -1.2;
    }
    if (ballX >= p1X - pWidth/2 && ballX <= p1X + pWidth /
        2 && ballY >= p1Y - pHeight/2 && ballY <= p1Y + pHeight/2)
        {
            ballDirectionX = ballDirectionX * -1.2;
        }
    


}//close draw

function keyPressed() {
    if (keyCode == UP_ARROW && keyIsPressed == true){
        p2Y = p2Y - p2Speed;
    }
    if (keyCode == DOWN_ARROW && keyIsPressed == true) {
        p2Y = p2Y + p2Speed;
    }
}// close keypressed

function keyTyped() {
if (key == 'w' && keyIsPressed == true) {
    p1Y = p1Y - p1Speed;
}
if (key == 's' && keyIsPressed == true) {
    p1Y = p1Y + p1Speed;
}
}//close keyTyped
 function power1() {
     p1Speed += 4;
     p2Speed += 4;
}
function power2() {
    pHeight += 200
}
function power3() {
    pWidth += 200
}

