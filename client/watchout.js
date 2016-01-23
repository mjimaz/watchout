// start slingin' some d3 here.
//var x, y, randomPosition
var PreviousEnemyPosition = [];
var CurrentRandomPosition = [];
var collisionCount = 0;
var highScore = 0;
var currentScore = 0;

var generateRandomPosition = function() {
  PreviousEnemyPosition = CurrentRandomPosition.slice();
  CurrentRandomPosition = [];
  for ( var i = 0 ; i < 10; i++ ) {
    var randomX = Math.floor(Math.random() * (width - 30));
    var randomY = Math.floor(Math.random() * (height - 30));
    CurrentRandomPosition.push([randomX, randomY]);
  }
  return CurrentRandomPosition;
};
var movingEnemies = function() {
  CurrentRandomPosition = generateRandomPosition();
  d3.selectAll('.enemy').data(CurrentRandomPosition)
                      .transition()
                      .duration(1000)
                      .style("cx", function( d ){ return d[0] + 'px'; } )
                      .style('cy', function( d ){ return d[1] + 'px'; } );

  

};
var movePlayer = function() {
  var coordinates = d3.mouse(this);
  var x = coordinates[0];
  var y = coordinates[1];
  d3.select('.player')
  .transition().duration(1)
  .style("cx", x + 'px')
  .style('cy', y + 'px');
};

var countScore = function(){
  currentScore++;
  d3.select('.current').text("Current score: " + currentScore);
  if(currentScore > highScore){
    highScore = currentScore;
    d3.select('.highscore').text("High score: " + highScore);
  }
  collisionCheck();
};


var collisionCheck = function(){
 var colliding = false;

d3.selectAll('.enemy').each(function(d,i){
  var enemyX = d[0];
  var enemyY = d[1];
  
  var temp = d3.select('.player').style('cx');
  var x = temp.substring(0, temp.length - 2);
  temp = d3.select('.player').style('cy');
  var y = temp.substring(0, temp.length - 2);
  
   var tx = (x - PreviousEnemyPosition[i][0])/(PreviousEnemyPosition[i][1] - PreviousEnemyPosition[i][0]);
   var ty = (y - CurrentRandomPosition[i][0])/(CurrentRandomPosition[i][1] - CurrentRandomPosition[i][0]);
  if(tx >= 0 && tx <= 1 && ty >= 0 && ty <= 1){
    collisionCount++;
    d3.select('.collisions').text("Collisions: " + collisionCount);
    currentScore = 0;
    d3.select('.current').text("Current score: " + currentScore);
  }

  });
  //return colliding;
};
var width = 500;
var height = 500;
var svg = d3.select('body').append('svg').style("width", width).style("height", height);
var randomPosition = generateRandomPosition();
svg.selectAll('circle').data(randomPosition)
                 .enter().append('circle')
                 .attr('class', 'enemy')
                 .style("cx", function( d ){ return d[0] + 'px'; } )
                 .style('cy', function( d ){ return d[1] + 'px'; } );
                 //.attr('xlink:href', 'asteroid.png');
setInterval(movingEnemies, 1000);
setInterval(countScore, 500);
var player = d3.select('svg').append('circle')
                             .attr('class','player')
                             .style("cx", width / 2)
                             .style('cy', height / 2);
d3.select('svg').on('mousemove', movePlayer);











