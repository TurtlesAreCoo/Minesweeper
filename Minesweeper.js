var grid;
var cols;
var rows;
var totalBomb;
var w = 30;
function setup() {
	createCanvas(401, 401);
	cols = floor(width/w);
	rows = floor(height/w);
  totalBomb = 0;
	grid = make2DArray(cols,rows);
	for (var i=0;i<cols;i++) {
		for (var j=0;j<rows;j++) {
			grid[i][j] = new Cell(i,j,w);
      if (grid[i][j].bomb)
        totalBomb++;
		}
	}
	for (var i=0;i<cols;i++) {
		for (var j=0;j<rows;j++) {
			grid[i][j].count();
		}
	}
	console.log('There are '+totalBomb+ ' bombs in this game.');
}

function draw() {
	background(255);
	for (var i=0;i<cols;i++) {
		for (var j=0;j<rows;j++) {
			grid[i][j].show();
		}
	}
}

function mousePressed() {
	for (var i=0;i<cols;i++) {
		for (var j=0;j<rows;j++) {
			if(grid[i][j].contains(mouseX,mouseY)) {
				grid[i][j].reveal(event.button);
			}
    } 
	}
}

function make2DArray(rows,cols){
	var arr = new Array(rows);
	for (var i = 0; i < cols; i++){ 
		arr[i] = new Array(cols);
	}
	return arr;
}