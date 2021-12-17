let gamePiece;
let obstacle1;
let obstacle2;


function startGame() {
	gamePiece = new component(30, 30, "#7800a2", 285, 225);
	obstacle1 = new component(10, 300, "#780022", 300, 300);
	obstacle2 = new component(10, 300, "#780022", 400, 300);
	gameArea.start();
}


const gameArea = {
	canvas : document.createElement("canvas"),
	start : function() {
		this.canvas.width = 600;
		this.canvas.height = 480;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.firstChild);
		this.interval = setInterval(updateGameArea, 20);
	},
	clear : function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
	stop : function() {
		clearInterval(this.interval)
	},	
}

function component(width, height, color, x, y) {
	this.width = width;
	this.height = height;
	this.speedX = 0;
	this.speedY = 0;
	this.x = x;
	this.y = y;
	this.update = function() {
		gameArea.context.fillStyle = color;
		gameArea.context.fillRect(this.x, this.y, this.width, this.height);
};
	this.newPos = function() {
		this.x += this.speedX;
		this.y += this.speedY;
	};
	this.collide = function(otherobj) {
		let myleft = this.x;
		let myright = this.x + (this.width);
		let mytop = this.y;
		let mybottom = this.y + (this.height);
		let otherleft = otherobj.x;
		let otherright = otherobj.x +(otherobj.width);
		let othertop = otherobj.y;
		let otherbottom = otherobj.y + (otherobj.height);
		let crash = true;
		if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
			crash = false;
		}
		return crash;
}
}

function updateGameArea() {
	if (gamePiece.collide(obstacle1) || gamePiece.collide(obstacle2))
		{gameArea.stop();
	} else {
		gameArea.clear();
		obstacle1.update();
		obstacle2.update();
		gamePiece.newPos();
		gamePiece.update();
	}
}

function moveup() {
	gamePiece.speedY -= 1;
}

function movedown() {
	gamePiece.speedY += 1;
}

function moveleft() {
	gamePiece.speedX -= 1;
}

function moveright() {
	gamePiece.speedX += 1;
}