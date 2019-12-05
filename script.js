window.requestAnimFrame = (function(){
  return (
    window.requestAnimationFrame       ||
    function(callback, time) {
      var time = time ? time: 1000 / 60;
      window.setTimeout(callback, time);
    }
  ); 
})();

var canvas = document.getElementById("sample"); //定数
var ctx = canvas.getContext("2d");  //定数

function Particle(scale, color, speed){
  //このthisは関数呼び出しパターン
  //this=Particle
  this.scale = scale; // 大きさ
  this.color = color; //色
  this.speed = speed; //速度
  this.position = {x:100, y:100}; //位置
};

Particle.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.position.x, this.position.y, this.scale, 0, 2*Math.PI, false);
  ctx.fillStyle = this.color;
  ctx.fill();
};

var density = 300;  //定数
var particles = []; //定数
var colors = ['gold', 'crimson', 'deepskyblue', 'lime'];  //定数

for (var i=0; i<density; i++) {
  var color = colors[~~(Math.random()*4)];  //定数
  var scale = ~~(Math.random()*(8-3))+3;    //定数
  particles[i] = new Particle(scale, color, scale/2);
  particles[i].position.x = Math.random()*canvas.width;
  particles[i].position.y = Math.random()*canvas.height;
  particles[i].draw();
}

function loop(){
  requestAnimFrame(loop);
  
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  for (var i=0; i<density; i++) {
    particles[i].position.x += particles[i].speed;
    particles[i].draw();

    if(particles[i].position.x > canvas.width) particles[i].position.x = -30;
  }
}

loop();
