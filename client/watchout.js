// start slingin' some d3 here.
var width = 500;
var height = 500;
var svg = d3.select('body').append('svg').style("width", width).style("height", height);
var randomPosition = [];
for ( var i = 0 ; i < 10; i++ ) {
  var randomX = Math.floor(Math.random() * (width - 30));
  var randomY = Math.floor(Math.random() * (height - 30));
  randomPosition.push([randomX, randomY]);
}
svg.selectAll('circle').data(randomPosition)
                 .enter().append('circle')
                 .attr('class', 'enemy')
                 .style("cx", function( d ){ return d[0] + 'px'; } )
                 .style('cy', function( d ){ return d[1] + 'px'; } );
                 //.attr('xlink:href', 'asteroid.png');
