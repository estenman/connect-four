//Establishes canvas
var canvas = document.getElementById("canvas-content");
var canvas_context = canvas.getContext("2d");

//Flag for whose turn it is
var playersTurn = 1;

var boardArray = [
  [{taken:0, xAxis:50, yAxis:50}, {taken:0, xAxis:150, yAxis:50}, {taken:0, xAxis:250, yAxis:50}, {taken:0, xAxis:350, yAxis:50}, {taken:0, xAxis:450, yAxis:50}, {taken:0, xAxis:550, yAxis:50}, {taken:0, xAxis:650, yAxis:50}],
  [{taken:0, xAxis:50, yAxis:150}, {taken:0, xAxis:150, yAxis:150}, {taken:0, xAxis:250, yAxis:150}, {taken:0, xAxis:350, yAxis:150}, {taken:0, xAxis:450, yAxis:150}, {taken:0, xAxis:550, yAxis:150}, {taken:0, xAxis:650, yAxis:150}],
  [{taken:0, xAxis:50, yAxis:250}, {taken:0, xAxis:150, yAxis:250}, {taken:0, xAxis:250, yAxis:250}, {taken:0, xAxis:350, yAxis:250}, {taken:0, xAxis:450, yAxis:250}, {taken:0, xAxis:550, yAxis:250}, {taken:0, xAxis:650, yAxis:250}],
  [{taken:0, xAxis:50, yAxis:350}, {taken:0, xAxis:150, yAxis:350}, {taken:0, xAxis:250, yAxis:350}, {taken:0, xAxis:350, yAxis:350}, {taken:0, xAxis:450, yAxis:350}, {taken:0, xAxis:550, yAxis:350}, {taken:0, xAxis:650, yAxis:350}],
  [{taken:0, xAxis:50, yAxis:450}, {taken:0, xAxis:150, yAxis:450}, {taken:0, xAxis:250, yAxis:450}, {taken:0, xAxis:350, yAxis:450}, {taken:0, xAxis:450, yAxis:450}, {taken:0, xAxis:550, yAxis:450}, {taken:0, xAxis:650, yAxis:450}],
  [{taken:0, xAxis:50, yAxis:550}, {taken:0, xAxis:150, yAxis:550}, {taken:0, xAxis:250, yAxis:550}, {taken:0, xAxis:350, yAxis:550}, {taken:0, xAxis:450, yAxis:550}, {taken:0, xAxis:550, yAxis:550}, {taken:0, xAxis:650, yAxis:550}]
]

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
    //Renders disc, assigns taken by player value, changes players turn.
    for(var i = 5; i >= 0; i--){
      if(boardArray[i][selectedCol].taken == 0 && playersTurn == 1){
        var newDisc = new Circle(boardArray[i][selectedCol].xAxis, boardArray[i][selectedCol].yAxis, 'yellow');
        newDisc.render();
        boardArray[i][selectedCol].taken = 1;
        playersTurn = 2;
        break;
      } else if (boardArray[i][selectedCol].taken == 0 && playersTurn == 2) {
        var newDisc = new Circle(boardArray[i][selectedCol].xAxis, boardArray[i][selectedCol].yAxis, 'red');
        newDisc.render();
        boardArray[i][selectedCol].taken = 2;
        playersTurn = 1;
        break;
      }
    }
    checkForWinner(selectedCol);
  }
}

function checkForWinner(selectedCol){
    //Check column for winner
    var countColMatch = 0;
    for(var i=0; i < 5; i++){
      if(boardArray[i][selectedCol].taken == boardArray[i+1][selectedCol].taken && boardArray[i][selectedCol].taken!=0 && boardArray[i+1][selectedCol].taken!=0){
        countColMatch+=1
        if(countColMatch == 3){
          winnerAlert();
          break;
        }
      } else {
        countColMatch=0;
      }
    }
    //Check row for winner
    var countRowMatch = 0;
    for(var i=0; i < 6; i++){
      for(var x=0; x < 6; x++){
        if(boardArray[i][x].taken == boardArray[i][x+1].taken && boardArray[i][x].taken!=0){
          countRowMatch+=1
          if(countRowMatch == 3){
            winnerAlert();
            break;
          }
        } else {
          countRowMatch=0;
        }
      }
    }
  //Check diagonal for winner down
    for(var row=0; row <= 2; row++){
      for(var col=0; col < 3; col++){
        if(boardArray[row][col].taken!=0 &&
          boardArray[row][col].taken == boardArray[row+1][col+1].taken &&
          boardArray[row][col].taken == boardArray[row+2][col+2].taken &&
          boardArray[row][col].taken == boardArray[row+3][col+3].taken
          ){
            winnerAlert();;
            break;
          }
        }
      }
  //Check diagonal for winner up
      for(var row=3; row <= 5; row++){
        for(var col=0; col < 3; col++){
          if(boardArray[row][col].taken!=0 &&
            boardArray[row][col].taken == boardArray[row-1][col+1].taken &&
            boardArray[row][col].taken == boardArray[row-2][col+2].taken &&
            boardArray[row][col].taken == boardArray[row-3][col+3].taken
            ){
              winnerAlert();;
              break;
            }
          }
        }
}

//Creates instance of a player disc
var newDisc = new Circle(0, 0, 'black');

//Renders the player disc
function renderCircle(){
  newDisc.render();
}

//Line object constructor for the lines creating rows and columns
function Lines(xStartLine,yStartLine,xEndLine,yEndLine){
  canvas_context.beginPath();
  canvas_context.moveTo(xStartLine,yStartLine);
  canvas_context.lineWidth= 2;
  canvas_context.strokeStyle= "#000000";
  canvas_context.lineTo(xEndLine,yEndLine);
  canvas_context.stroke();
}

//Uses line object constructor to render lines for rows and columns
function renderLines(){
  for(var i = 100; i < 700; i+=100 ){
    Lines(i,0,i,600);
  }
  for(var i = 100; i < 700; i+=100 ){
    Lines(0,i,700,i);
  }
}

//Render lines on windowload
window.onload = function() {
  renderLines();
}

//Event listeners for column choosen based on button click
var colOneButton = document.getElementById("col-one-button");
var colTwoButton = document.getElementById("col-two-button");
var colThreeButton = document.getElementById("col-three-button");
var colFourButton = document.getElementById("col-four-button");
var colFiveButton = document.getElementById("col-five-button");
var colSixButton = document.getElementById("col-six-button");
var colSevenButton = document.getElementById("col-seven-button");

colOneButton.addEventListener("click", function() {
  newDisc.addDisc(0);
});
colTwoButton.addEventListener("click", function() {
  newDisc.addDisc(1);
});
colThreeButton.addEventListener("click", function() {
  newDisc.addDisc(2);
});
colFourButton.addEventListener("click", function() {
  newDisc.addDisc(3);
});
colFiveButton.addEventListener("click", function() {
  newDisc.addDisc(4);
});
colSixButton.addEventListener("click", function() {
  newDisc.addDisc(5);
});
colSevenButton.addEventListener("click", function() {
  newDisc.addDisc(6);
});

//modal
var modal = document.getElementById('winnerModal');
var winnerMessage = document.getElementById('modal-message');
var span = document.getElementsByClassName("close")[0];

//Open modal to alert there is a winner
function winnerAlert(){
  modal.style.display = "block";
  if(playersTurn == 2){
    winnerMessage.innerHTML = "Player One Wins";
  } else {
    winnerMessage.innerHTML = "Player Two Wins";
  }
}

//Close modal when user clicks close and reset game.
span.onclick = function(){
  modal.style.display = "none";
  playersTurn = 1;
  for(var i=0; i < 6; i++){
    for(var x=0; x < 6; x++){
      boardArray[i][x].taken = 0;
    }
  }
  canvas_context.clearRect(0, 0, canvas.width, canvas.height);
  renderLines();
}
