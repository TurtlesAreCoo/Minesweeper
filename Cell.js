function Cell(i,j,w) {
	this.i = i;
	this.j = j;
	this.x = i*w;
	this.y = j*w;
	this.w = w;
	this.beside = 0;
	if (random(1)>0.9) {
		this.bomb = true;
	} else { 
		this.bomb = false;
	}
	this.revealed = false;
	this.lost = false;
  this.marked = false;
}
Cell.prototype.count = function() {
	if (this.bomb) {
		this.beside = -1;
	}
	var total = 0;
	for (var xOff = -1; xOff <= 1; xOff++) {
    for (var yOff = -1; yOff <= 1; yOff++) { 
      var i = this.i+xOff;
      var j = this.j+yOff;
      if (i > -1 && i < cols && j > -1 && j < rows) {
        var temp = grid[i][j];
        if (temp.bomb)
          total++;
      }
    }
  }
	this.beside = total;
}

Cell.prototype.show = function(){ 
  stroke(0);
	noFill();
	rect(this.x,this.y,this.w,this.w);
  if(this.marked && !this.revealed) {
    fill(255,0,255);
    rect(this.x,this.y,this.w,this.w);
  } else if(this.revealed) {
		if(this.bomb) {
      fill(255,0,0);
      rect(this.x,this.y,this.w,this.w);
      fill(0);
			ellipse(this.x+this.w/2,this.y+this.w/2,this.w/2);
      this.revealAll();
		} else {
			fill(180);
			rect(this.x,this.y,this.w,this.w);
      if (this.beside > 0) {
        textAlign(CENTER);
        textSize(20);
        fill(0);
        text(this.beside,this.x+this.w/2,this.y+22);
      } else { 
        this.showBeside();
      }
		}
	}
}

Cell.prototype.showBeside = function(){
  for (var xOff = -1; xOff <= 1; xOff++) {
      for (var yOff = -1; yOff <= 1; yOff++) { 
        var i = this.i+xOff;
        var j = this.j+yOff;
        if (i > -1 && i < cols && j > -1 && j < rows) {
          var temp = grid[i][j];
          if (!temp.bomb)
            temp.revealed=true;
        }
      }
  }
}
  
Cell.prototype.showPoints = function() { 
  var total = 0;
  for(var i = 0; i < rows; i++) { 
    for(var j = 0; j < cols; j++) { 
      if(grid[i][j].revealed) 
        total++;
    }
  }
  return total;
}
Cell.prototype.revealAll = function() { 
  for(var i = 0; i < rows; i++) { 
    for(var j = 0; j < cols; j++) { 
      grid[i][j].revealed=true;
    }
  }
}
Cell.prototype.contains = function(x,y) {
	return(x > this.x && x < this.x+this.w && y > this.y && y < this.y+this.w); 
}

Cell.prototype.reveal = function(mouse) {
  if (mouse == 0) {
		this.revealed = true;
  } else { 
    this.marked = true;
  } 
}
		