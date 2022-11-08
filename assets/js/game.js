let canvas = document.getElementById("game_zone");
let context = canvas.getContext("2d");

let width_screen = window.innerWidth;
let height_screen = window.innerHeight;

canvas.width = width_screen;
canvas.height = height_screen;

let mousePos;


//Изображения//
let aim_image = new Image();
aim_image.src = "assets/images/aim_cross.png";

let balloon_image = new Image();
balloon_image.src = "assets/images/balloon.png";

let gun_image = new Image();
gun_image.src = "assets/images/gun.png";

let aim_cross = {
    w:35,
    h:35,
    x:width_screen/2,
    y:height_screen/2,
    speed:5,
    image_h:200,
    image_w:200
}

let balloon = {
    w:85,
    h:100,
    x:width_screen/2,
    y:height_screen/2,
    speed:5,
    image_h:240,
    image_w:220
}

// Часть отслеживания курсора//
function CalcMousePos(canvas, e){
    var rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - Math.trunc(rect.left),
        y: e.clientY - Math.trunc(rect.top)
    };
}

//Передвижение мыши и прицела//
canvas.addEventListener('mousemove',function(e){
    context.clearRect(aim_cross.x,aim_cross.y,aim_cross.w,aim_cross.h);
	var mousePos = CalcMousePos(canvas,e);
    console.log("x:"+mousePos.x+" y:"+mousePos.y);
    aim_cross.x = mousePos.x;
    aim_cross.y = mousePos.y
});

//Стрельба//
canvas.addEventListener('click',function(e){
    var rect = canvas.getBoundingClientRect();
    let x = e.clientX - Math.trunc(rect.left);
    let y = e.clientY - Math.trunc(rect.top)
    console.log("Click on: "+x+", "+y);

    Pop();
});

function Game(){
	// Отрисовка изображения//
    context.drawImage(
        aim_image,
        0,
        0,
        aim_cross.image_w,
        aim_cross.image_h,
        aim_cross.x,
        aim_cross.y,
        aim_cross.w,
        aim_cross.h
    );
    context.drawImage(
        balloon_image,
        0,
        0,
        balloon.image_w,
        balloon.image_h,
        balloon.x,
        balloon.y,
        balloon.w,
        balloon.h
    );
    requestAnimationFrame(Game);
}

let hit = [];
function Pop(){
    if(balloon.x + balloon.w > aim_cross.x
        && balloon.x < aim_cross.x + aim_cross.w
        && balloon.y + balloon.h > aim_cross.y
        && balloon.y < aim_cross.y + aim_cross.h == true){
        console.log("POP!");
    }
    else{
        console.log("miss");
    }
}

//Цикл игры//
// var lastTime;
// function main(){
//     var now = Date.now();
//     var dt = (now - lastTime)

//     update(dt);
//     render();

//     lastTime = now;
//     requestAnimFrame(main);
// }
// //Состояние игры//
// var player = {
//     pos: [0, 0],
//     sprite: new Sprite(aim_image,[0,0],[199,200],16,[0,1])
// };

// var bullets = [];
// var balloons = [];
// var pop = [];

// var lastFire = Date.now();
// var gameTime = 0;
// var isGameOver;

// //Счет//
// var score = 0;
// var scoreEl = document.getElementById('score');

// //Сущности//

// balloons.push({
//     pos:[100,50],
//     sprite: new Sprite(balloon_image,[0,0],[220,240],20,[0,1])
// });

// //Спрайты и анимация//
// var resourceCache = {};

// function get(url){
//     return resourceCache[url];
// }


// function Sprite(url,pos,size,speed,frames,dir,once){
//     this.pos = pos;
//     this.size =size;
//     this.speed = typeof speed ==='number' ? speed : 0;
//     this.frames = frames;
//     this._index = 0;
//     thisurl = url;
//     this.dir = dir || 'horizontal';
//     this.once = once;
// }

// Sprite.prototype.update = function(dt) {
//     this._index +=this.speed*dt;
// }

// //Отрисовка объектами себя//
// //Что-то сложное, но вдруг пригодится//
// Sprite.prototype.render = function(ctx) {
//     var frame;

//     if(this.speed > 0) {
//         var max = this.frames.length;
//         var idx = Math.floor(this.index);
//         frame = this.frames[idx % max];

//         if (this.once && idx >= max) {
//             this.done = true;
//             return;

//         }
//     }
//     else{
//         frame = 0;
//     }

//     var x = this.pos[0];
//     var y = this.pos[1];

//     if(this.dir == 'vertical'){
//         y == frame * this.size[1];
//     }
//     else{
//         x += frame * this.size[0];
//     }

//     ctx.drawImage(resources.get(this.url),
//         x, y,
//         this.size[0], this.size[1],
//         0, 0,
//         this.size[0], this.size[1]);
// }

// //обновление сцены//
// function update(dt){
//     gameTime += dt;

//     handleInput(dt);
//     updateEntities(dt);

//     if(Math.random() < 1 - Math.pow(.993, gameTime)){
//         enemies,push({
//             pos: [canvas.width,
//             Math.random() * (canvas.height - 39)],
//             sprite: new Sprite('images')
//         });
//     }

//     checkCollisions();

//     scoreEl.innerHTML = score;
// };
