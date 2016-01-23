// start slingin' some d3 here.
var generateRandomPosition = function() {
   var randomPosition = [];
  for ( var i = 0 ; i < 10; i++ ) {
    var randomX = Math.floor(Math.random() * (width - 30));
    var randomY = Math.floor(Math.random() * (height - 30));
    randomPosition.push([randomX, randomY]);
  }
  return randomPosition;
};
var movingEnemies = function() {
  var randomPosition = generateRandomPosition();
  d3.selectAll('.enemy').data(randomPosition)
                      .transition()
                      .duration(1500)
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
var player = d3.select('svg').append('circle')
                             .attr('class','player')
                             .style("cx", width / 2)
                             .style('cy', height / 2);
d3.select('svg').on('mousemove', movePlayer);
                 












