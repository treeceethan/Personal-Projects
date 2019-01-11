var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth ;
canvas.height = window.innerHeight ;

var c = canvas.getContext('2d');

var colorArray = [
  '#011C41',
  '#F2E8C3',
  '#F5A219',
  '#F27612',
  '#DA2A04',
]
var maxRadius = 40;
var minRadius = 20;

var mouse = {
  x: undefined,
  y: undefined
}

window.addEventListener('mousemove', function(event) {
  var rect = canvas.getBoundingClientRect();
  mouse.x = event.x - rect.left;
  mouse.y = event.y - rect.top;
});

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height - window.innerHeight;

  init();
});

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function () {
    c.beginPath();
    //x, y, r, startAngle, endAngle, drawCounterClockwise: bool
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
  }
  this.update = function() {
    if(this.x + this.radius > innerWidth || this.x - this.radius < 0)
    {
      this.dx = -this.dx;
    }

    if(this.y + this.radius > innerHeight || this.y - this.radius < 0)
    {
      this.dy = -this.dy;
    }

    this.y += this.dy;
    this.x += this.dx;

    //interactivity
    if(mouse.x - this.x < 75 && mouse.x - this.x > -75 && mouse.y - this.y < 75 && mouse.y - this.y > -75) {
      if(this.radius < maxRadius) {
        this.radius += 1;
      }
    }
    else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  }
}
var circleArray = [];

function init() {
  circleArray = [];
  for(var i = 0; i < 1000; i++) {
    var radius = Math.random() * 3 + 1;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 2;
    var dy = (Math.random() - 0.5) * 2;

    circleArray.push(new Circle(x,y,dx,dy,radius));
  }
}
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for(var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }


}

init();
animate();

// // x, y, width, height
// c.fillStyle = "#f6f5f3";
// c.fillRect(0, 0, 500, 1000);
// c.fillStyle = "#3d3d3f";
// c.fillRect(500, 0, 500, 1000);
// c.fillStyle = "#f6f5f3";
// c.fillRect(1000, 0, 500, 1000);
// c.fillStyle = "#3d3d3f";
// c.fillRect(1500, 0, 500, 1000);
//
//
// // Line
// c.beginPath();
//
// //x, y
// c.moveTo(0,600);
// c.lineTo(300, 100);
// c.lineTo(600, 600);
// c.lineTo(900, 100);
// c.lineTo(1200, 600);
// c.lineTo(1500, 100);
// c.lineTo(1800, 600);
// c.lineTo(0, 600);
// c.fillStyle = "#7dce94"
// c.fill();
// c.strokeStyle = "#3d3d3f";
// c.stroke();
//
// for(var i = 0; i < 100; i++) {
//   var x = Math.random() * window.innerWidth;
//   var y = Math.random() * window.innerHeight;
//
//   // Arc/Circle
//   c.beginPath();
//   //x, y, r, startAngle, endAngle, drawCounterClockwise: bool
//   c.arc(x, y, 30, 0, Math.PI * 2, false);
//   if (i % 2 == 0) {
//     c.strokeStyle = "blue";
//   }
//   else {
//     c.strokeStyle = "red";
//   }
//   c.stroke();
// }
