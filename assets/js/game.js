// Классы //
class Aim{
    constructor(image, x, y){
        this.x = x;
        this.y = y;

        this.image = new Image();
        this.image.src = "assets/images/aim_cross.png";
    }
    Update(){

    }
}

class Balloon{
    constructor(image, x, y){
        this.x = x;
        this.y = y;

        this.image = new Image();
        this.image.src = "assets/images/balloon_red.png";
    }

    Update(){

    }
}

const UPDATE_TIME = 1000 / 60;

var timer = null;

let canvas = document.getElementById("game_zone");
let context = canvas.getContext("2d");

var scale = 0.1;// Масштаб

Resize();// При загрузке страницы задается размер холста

window.addEventListener("resize", Resize); 
// При изменении размеров окна будут меняться размеры холста

var objects = [];// Массив игровых объектов

var player = new Aim("images/aim_cross.png", canvas.width / 2, canvas.height / 2);

Start();

function Start(){
    timer = setInterval(Update, UPDATE_TIME);
    // Состояние игры будет обновляться 60 раз в секунду 
}

function Stop(){
    clearInterval(timer);// Остановка обновления
    timer = null;
}

// Обновление игры
function Update(){
    if(RandomInt(0,10000) > 9700){
        objects.push(new Balloon("assets/images/balloon_red.png", 
            RandomInt(30, canvas.width - 50), 
            RandomInt(250, 400) * -1));
    }

    Draw();
}



let mousePos;

// Передвижение мыши и прицела //
canvas.addEventListener('mousemove',function(e){
    context.clearRect(aim_cross.x,aim_cross.y,aim_cross.w,aim_cross.h);
    var mousePos = CalcMousePos(canvas,e);
    console.log("x:"+mousePos.x+" y:"+mousePos.y);
    aim_cross.x = mousePos.x;
    aim_cross.y = mousePos.y
});



// Изображения //
let aim_image = new Image();
aim_image.src = "assets/images/aim_cross.png";

let aim_cross = {
    w:35,
    h:35,
    x:canvas.width/2,
    y:canvas.height/2,
    speed:5,
    image_h:200,
    image_w:200
}

// Логика игры //



// Стрельба //
canvas.addEventListener('click',function(e){
    var rect = canvas.getBoundingClientRect();
    let x = e.clientX - Math.trunc(rect.left);
    let y = e.clientY - Math.trunc(rect.top)
    console.log("Click on: "+x+", "+y);

    Pop();
});

// Попадание/промах //
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

function Game(){
	// Отрисовка изображения //
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
    requestAnimationFrame(Game);
}

//Работа с графикой
function Draw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    //Очистка холста от предыдущего кадра

    for(var i = 0; i < objects.length; i++)
    {
        DrawBalloon(objects[i]);
    }
}

function DrawBalloon(Balloon){
    context.drawImage(
            Balloon.image,
            0,
            0,
            Balloon.image.width,
            Balloon.image.height,
            Balloon.x,
            Balloon.y,
            Balloon.image.width * scale,
            Balloon.image.height * scale
        )
}

// Часть отслеживания курсора //
function CalcMousePos(canvas, e){
    var rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - Math.trunc(rect.left),
        y: e.clientY - Math.trunc(rect.top)
    };
}

function KeyDown(e){

    switch(e.keyCode){
        case 27: //Esc
        if(timer == null){
            Start();
        }
        else{
            Stop();
        }
        break;
    }
}

// Масштабирование //
function Resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Генератор случайных чисел //
function RandomInt(min,max){
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}
