var canvas = document.getElementById("canvas-content");
var canvas_context = canvas.getContext("2d");

//Disc object constructor
function Circle(x, y, player){
  this.xAxis = x;
  this.yAxis = y;
  this.discColor = player
}

Circle.prototype = {
  render: function(){
    canvas_context.beginPath();
    canvas_context.arc(this.xAxis, this.yAxis, 20, 0, 2 * Math.PI, false);
    canvas_context.closePath();
    canvas_context.strokeStyle = this.discColor;
    canvas_context.stroke();
    canvas_context.fillStyle = this.discColor;
    canvas_context.fill();
  }
}

//Creates instances of the players discs
var playerOneDisc = new Circle(30, 250, 'black');
var playerTwoDisc = new Circle(50, 350, 'red');

//Renders the players discs
function renderCircle(){
  playerOneDisc.render();
  playerTwoDisc.render();
}

//Line object constructor
function Lines(xStartLine,yStartLine,xEndLine,yEndLine){
  canvas_context.beginPath();
  canvas_context.moveTo(xStartLine,yStartLine);
  canvas_context.lineTo(xEndLine,yEndLine);
  canvas_context.stroke();
}

//Uses line object constructor to render lines for rows and columns of game
function renderLines(){
  for(var i = 100; i < 700; i+=100 ){
    Lines(i,0,i,600);
  }
  for(var i = 100; i < 700; i+=100 ){
    Lines(0,i,700,i);
  }
}


window.onload = function() {
  renderLines();
  renderCircle();
}
