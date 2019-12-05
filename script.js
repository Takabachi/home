window.requestAnimFrame = (function(){
  return (
    window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(callback, time) {
      var time = time ? time: 1000 / 60;
      window.setTimeout(callback, time);
    }
  ); 
})();

let canvas = document.getElementById("sample");
let ctx = canvas.getContext("2d");

let Particle = function(scale, color, speed){
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

let density = 300;  
let particles = []; 
let colors = ['gold', 'crimson', 'deepskyblue', 'lime'];

for (let i=0; i<density; i++) {
  let color = colors[~~(Math.random()*4)];
  let scale = ~~(Math.random()*(8-3))+3;
  particles[i] = new Particle(scale, color, scale/2);
  particles[i].position.x = Math.random()*canvas.width;
  particles[i].position.y = Math.random()*canvas.height;
  particles[i].draw();
}

let loop = () => {
  requestAnimFrame(loop);
  
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  for (let i=0; i<density; i++) {
    particles[i].position.x += particles[i].speed;
    particles[i].draw();

    if(particles[i].position.x > canvas.width) particles[i].position.x = -30;
  }
}

loop();
