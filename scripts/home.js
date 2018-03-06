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
  },
  addDisc: function(selectedCol){
    for(var i = 5; i > 0; i--){
      if (selectedCol[i].taken == 0 && playersTurn == 1) {
        var newDisc = new Circle(selectedCol[i].xAxis, selectedCol[i].yAxis, 'black');
        newDisc.render();
        selectedCol[i].taken = 1;
        playersTurn = 2;
        break;
      } else if (selectedCol[i].taken == 0 && playersTurn == 2) {
        var newDisc = new Circle(selectedCol[i].xAxis, selectedCol[i].yAxis, 'red');
        newDisc.render();
        selectedCol[i].taken = 2;
        playersTurn = 1;
        break;
      }


    }
  }
}

//Creates instances of the player discs
var newDisc = new Circle(0, 0, 'black');

//Renders the player discs
function renderCircle(){
  newDisc.render();
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
}

//flag for whose turn it is
var playersTurn = 1;

//Array representing columns
var column1 = arrayCreator(50);
var column2 = arrayCreator(150);
var column3 = arrayCreator(250);
var column4 = arrayCreator(350);
var column5 = arrayCreator(450);
var column6 = arrayCreator(550);
var column7 = arrayCreator(650);

//Creates arrays for columns
function arrayCreator (numx){
  var columnArray = [];
  var yAxisx = 50;
  for (var i = 0; i < 6; i++){
    if(i === 0){
      var object = {taken:0, xAxis:numx, yAxis:50};
      columnArray.push(object);
    } else {
      var object2 = {taken:0, xAxis:numx, yAxis:0};
      object2.yAxis = yAxisx+=100;
      columnArray.push(object2);
    }
  }
  return columnArray;
};

//Event listeners for column choosen
var colOneButton = document.getElementById("col-one-button");
var colTwoButton = document.getElementById("col-two-button");
var colThreeButton = document.getElementById("col-three-button");
var colFourButton = document.getElementById("col-four-button");
var colFiveButton = document.getElementById("col-five-button");
var colSixButton = document.getElementById("col-six-button");
var colSevenButton = document.getElementById("col-seven-button");

colOneButton.addEventListener("click", function() {
  newDisc.addDisc(column1);
});
colTwoButton.addEventListener("click", function() {
  newDisc.addDisc(column2);
});
colThreeButton.addEventListener("click", function() {
  newDisc.addDisc(column3);
});
colFourButton.addEventListener("click", function() {
  newDisc.addDisc(column4);
});
colFiveButton.addEventListener("click", function() {
  newDisc.addDisc(column5);
});
colSixButton.addEventListener("click", function() {
  newDisc.addDisc(column6);
});
colSevenButton.addEventListener("click", function() {
  newDisc.addDisc(column7);
});
