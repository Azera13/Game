let canvas = document.getElementById("game_zone");
let context = canvas.getContext("2d");

var scale = 0.1;// Масштаб

Resize();// При загрузке страницы задается размер холста

window.addEventListener("resize", Resize); 
// При изменении размеров окна будут меняться размеры холста

var objects = [];// Массив игровых объектов

function Start(){
    timer = setInterval(Update, 1000/60);
    // Состояние игры будет обновляться 60 раз в секунду 
}

function Stop(){
    clearInterval(timer);// Остановка обновления
}

// Обновление игры
function Update(){
    Draw();

    if(RandomInt(0,10000) > 9700){
        objects.push(new Balloon("assets/images/balloon_red.png", 
            RandomInteger(30, canvas.width - 50), 
            RandomInteger(250, 400) * -1));
    }
}

//Работа с графикой
function Draw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    //Очистка холста от предыдущего кадра

    for(var i = 0; i < objects.length; i++)
{
    ctx.drawImage
    (
        objects[i].image, //Изображение для отрисовки
        0, //Начальное положение по оси X на изображении
        0, //Начальное положение по оси Y на изображении
        objects[i].image.width, //Ширина изображения
        objects[i].image.height, //Высота изображения
        objects[i].x, //Положение по оси X на холсте
        objects[i].y, //Положение по оси Y на холсте
        objects[i].image.width * scale, //Ширина изображения на холсте, умноженная на масштаб
        objects[i].image.height * scale //Высота изображения на холсте, умноженная на масштаб
    );
}
}

let mousePos;

// Часть отслеживания курсора //
function CalcMousePos(canvas, e){
    var rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - Math.trunc(rect.left),
        y: e.clientY - Math.trunc(rect.top)
    };
}

// Передвижение мыши и прицела //
canvas.addEventListener('mousemove',function(e){
    context.clearRect(aim_cross.x,aim_cross.y,aim_cross.w,aim_cross.h);
    var mousePos = CalcMousePos(canvas,e);
    console.log("x:"+mousePos.x+" y:"+mousePos.y);
    aim_cross.x = mousePos.x;
    aim_cross.y = mousePos.y
});

function Resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

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

////
// Логика игры //
class Balloon{
    constructor(image, x, y){
        this.x = x;
        this.y = y;

        this.image = new Image();
        this.image.src = "assets/images/balloon_red.png";
    }

    Update(){
        this.y += speed;
    }

}

function RandomInt(min,max){
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}


// Стрельба //
canvas.addEventListener('click',function(e){
    var rect = canvas.getBoundingClientRect();
    let x = e.clientX - Math.trunc(rect.left);
    let y = e.clientY - Math.trunc(rect.top)
    console.log("Click on: "+x+", "+y);

    Pop();
});

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

