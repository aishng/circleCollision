//testing circle collision
var person;
var bugs = {},
	bugIndex = 0,
	settings = {
		density: 20,
		size: 10,
		startingX: canvas.width / 2,
		startingY: canvas.height / 4,
		// startingX: Math.random()*2,
		// startingY: Math.random()*4,
		maxLife: 100
	};

var intVX = 10,
	intVY = 10,
	gravity = 1;

var PIECE_RADIUS = 5; //all caps for constant
var BLOCK_SIZE = 10; 
var SPEED = 5;
var POSX = 200;
var POSY = 200;

// window.addEventListener('keydown', movePerson, false); //callback function to move the game piece

var canvas = document.getElementById('board'),
	ctx = canvas.getContext('2d');

canvas.width=500;
canvas.height=500;

function drawAll(ctx){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	drawBoard(40,40,ctx);
	drawPerson(POSX,POSY,ctx);
	drawBugs(ctx);
}

function drawBoard(w,h,ctx){
	ctx.lineWidth=2;
	ctx.strokeStyle="pink";
	ctx.strokeRect(0,0, h * BLOCK_SIZE , w * BLOCK_SIZE);
}

function drawPerson(x,y,ctx){
	ctx.beginPath();
	ctx.arc(x,y,PIECE_RADIUS,0,Math.PI*2,0);
	ctx.fillStyle="blue";
	ctx.fill();
}

function drawBugs(ctx){
	//starting position and velocity
	this.x = settings.startingX;
	this.y = settings.startingY;

	//randomize the velocities
	// this.vx = Math.random() * 20 - 10;
	// this.vy = Math.random() * 20 - 5;

	//add the newly created pieces to the index
	bugIndex ++;
	bugs[bugIndex] = this;
	this.id = bugIndex;
	this.life = 0;

	//bugs are created above and stored in an object^^

	//now we need to draw them to the board
	//adjust for gravity
	this.vy += settings.gravity;

	//age the piece
	this.life++;

	//if age has reached max....DO WHAT?
	if (this.life >= settings.maxLife) {
		// delete gamePieces[this.id];
	}

	//create the pieces
	ctx.beginPath();
	ctx.fillStyle = "brown";
	ctx.arc(this.x,this.y, settings.size, 0, Math.PI*2, true); //starts drawing at this.x/this.y and is set to the size in settings
	ctx.closePath();
	ctx.fill();

	//FIGURE OUT WHY THEY ARENT SHOWING UP!!!
	//then we need to detect collision, remove them and add score
}

drawAll(ctx);


