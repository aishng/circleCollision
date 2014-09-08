//testing circle collision
window.addEventListener('keydown', movePerson, false); //callback function to move the game piece

var canvas = document.getElementById('board'),
	ctx = canvas.getContext('2d');

// var canvas = document.getElementById('bugs'),
// 	ctx2 = canvas.getContext('2d');

canvas.width=500;
canvas.height=500;

var PIECE_RADIUS = 10; //all caps for constant
var BLOCK_SIZE = 10; 
var SPEED = 5;
var POSX = 200;
var POSY = 200;
var NUM_OF_BUGS = 10;

var score = 0;
var bugIndex = 0;

var vx = 10,
	vy = 10,
	gravity = 1;

var person = {
	x : POSX,
	y : POSY,
	radius: PIECE_RADIUS,
}

var bugs = []
var Bug = function (){ //constructor function creates an object
	this.x = Math.ceil(Math.random()*canvas.width / Math.ceil(Math.random())), //property
	this.y = Math.ceil(Math.random()*canvas.height / Math.ceil(Math.random())), //property
	this.radius = PIECE_RADIUS, //property
	this.color = "#f4a466",	//property
	this.speed = 4;
	this.draw = function(ctx) { //method of the Bug object
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.arc(this.x,this.y, this.radius, 0, Math.PI*2, true); //starts drawing at this.x/this.y and is set to the size in settings
		ctx.closePath();
		ctx.fill();
		return this; //returns object after drawing is complete (not the best practice but very good for waterfall use)
	}

	//possible functions that would be good for waterfall syntax
	// this.speak = function() { 
	// 	console.log("HELLO, I can be found at (" + this.x + ", " + this.y + ")"); 
	// 	return this; 
	// }
	// this.move = function() {
	// 	this.x = Math.random() * this.x;
	// 	this.y = Math.random() * this.y;
	// 	return this;	
	// }
}

function createBugs(){
	for (var i = 0; i < NUM_OF_BUGS; i++) {
		 var bg = new Bug(); //store new bug in bg
		 bugs[i] = bg; //place bg in array
		 bg.draw(ctx); //draw each new bug
		 // bugs[i].position.x = bugs[i].position.x + 5; //two ways to
		 // b.position.x += 5; //change the position of x by 5 (if we had a position.x property)
	}
}

function drawAll(ctx){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	drawBoard(50,50,ctx);
	drawPerson(person.x,person.y,ctx);
	bugs.map( //map another objects method to this array
		function(bug) { 
			bugs[0].draw.apply(bug,[ctx]);//apply the .draw function from bug (take in its ctx arg) to the array
		})
	//quicker way is probably a loop but the above is interesting^
	//for (var i = 0; i < bugs.length; i++){
	// 	bugs[i].draw(ctx);
	//}
}

function drawBoard(w,h,ctx){
	ctx.lineWidth=2;
	ctx.strokeStyle="pink";
	ctx.strokeRect(0,0, h * BLOCK_SIZE , w * BLOCK_SIZE);
}

function drawPerson(x,y,ctx){
	ctx.beginPath();
	ctx.arc(x,y,person.radius,0,Math.PI*2,0);
	ctx.fillStyle="blue";
	ctx.fill();
}

// function createBugs(ctx){
// 	//starting position and randomized velocity
// 	//figure out why movement isnt working
// 	this.x = settings.startingX;
// 	this.y = settings.startingY;
// 	// this.vx = Math.random() * 20 - 10;
// 	// this.vy = Math.random() * 20 - 5;
// 	//bugs are created above and stored in an array^^

// 	// //adjust for gravity
// 	// this.vy += settings.gravity;

// 	//add the newly created pieces to the index
// 	bugIndex ++;
// 	bugs[bugIndex] = this;
// 	this.id = bugIndex;
// }

function moveBugs(ctx){
	// bugs[i].position.x = bugs[i].position.x + 5; //two ways to
	// b.position.x += 5; //change the position of x by 5 (if we had a position.x property)
}

function clearBug(x,y,radius){
	for (var i=0; i < bugs.length; i++)
		ctx.beginPath();
    	ctx.arc(bugs[i].x, bugs[i].y, bugs[i].radius, 0, 2 * Math.PI, false);
    	ctx.clip();
    	ctx.clearRect(bugs[i].x - bugs[i].radius - 1, bugs[i].y - bugs[i].radius - 1,
                      bugs[i].radius * 2 + 2, bugs[i].radius * 2 + 2);
}

function detectCollision(ctx){
	//person & bugs
	for (var i=0; i < bugs.length; i++){
		var dx = person.x - bugs[i].x;
		var dy = person.y - bugs[i].y;
		var distance = Math.sqrt(dx * dx + dy * dy);

		if (distance < person.radius + bugs[i].radius) {
	    	console.log('collision detected!');

	    	clearBug(bugs[i].x,bugs[i].y,bugs[i].radius);

	    	score+=1;
	    	console.log(score);

		}
	}
}

function movePerson(e) {
	e.preventDefault();
	// var collisions = detectCollision(ctx);
	if (e.keyCode == 37){
		person.x -= SPEED;
	}
	if (e.keyCode == 38){
		person.y -= SPEED;
	}
	if (e.keyCode == 39){
		person.x += SPEED;
	}
	if (e.keyCode == 40) {
		person.y += SPEED;
	}
	//moveBugs(ctx);
	drawAll(ctx);
	detectCollision(ctx);
}
	//then we need to detect collision, remove them and add score

//create bugs first
createBugs();
//then just continually redraw them as we move the person
drawAll(ctx);


//clearbug issue, add score, move bugs, show score
