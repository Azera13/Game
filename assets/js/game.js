// Игра //
function Game(){
//
// Классы //
class Aim{
    constructor(x, y){
        this.x = x;
        this.y = y;

        this.dead = false;

    }

    Update(){
        this.x = mousePos.x;
        this.y = mousePos.y;
    }
}

class Balloon{
    constructor(image, x, y){
        this.x = x;
        this.y = y;

        this.loaded = false;
        this.popped = false;

        this.image = new Image();

        var obj = this;

        this.image.addEventListener("load", function () { obj.loaded = true; });

        this.image.src = image;
    }

    Update(){

        this.y -= speed + RandomInt(1,3);

        if(this.y > canvas.height + 50)
        {
            this.popped = true;
        }
    }

    Pop(balloon){
        var hit = false;

        if(this.y < player.y 
            && this.y + this.image.height * scale > player.y){
            if(this.x + this.image.width * scale > player.x 
            && this.x < player.x)
            {
                hit = true;
                console.log("POP!");
            }
        }
        return hit;
    }
}

class Background{
    constructor(image, y){
        this.x = 0;
        this.y = y;

        this.loaded = false;

        this.image = new Image();

        var obj = this;

        this.image.addEventListener("load", function () { obj.loaded = true; });

        this.image.src = image;
    }
    Update(background){

    }
}

const UPDATE_TIME = 1000 / 60;

var timer = null;

let canvas = document.getElementById("game_zone");
let context = canvas.getContext("2d");

var scale = 0.5;// Масштаб

Resize();// При загрузке страницы задается размер холста

window.addEventListener("resize", Resize); 
// При изменении размеров окна будут меняться размеры холста

window.addEventListener("keydown", function (e) { KeyDown(e); }); 
// Проверяет нажатие клавиш

var objects = [];// Массив игровых объектов

var player = new Aim(canvas.width / 2, canvas.height / 2);

var background_img = new Background("assets/images/background.png",0);

var speed = 2;

var mousePos = 0;

Start();

function Start(){
    if(!player.dead){
        timer = setInterval(Update, UPDATE_TIME);
        // Состояние игры будет обновляться 60 раз в секунду 
    }   
    
}

function Stop(){
    clearInterval(timer);// Остановка обновления
    timer = null;
}

// Обновление игры
function Update(){

    if(RandomInt(0,10000) > 9700){
        objects.push(new Balloon("assets/images/balloon.png", 
            RandomInt(0, canvas.width - 50), 
            RandomInt(canvas.height, canvas.height + 10)));
    }

    player.Update();

    if(player.dead)
    {
        console.log("Oof!");
        Stop();
    }

    var isPopped = false; 

    for(var i = 0; i < objects.length; i++)
    {
        objects[i].Update();

        if(objects[i].popped)
        {
            isPopped = true;
        }

        if(isPopped){
            objects.splice(i,1);
        }
    }

    Draw();
}

// Передвижение мыши и прицела //
canvas.addEventListener('mousemove',function(e){
    mousePos = CalcMousePos(canvas,e);
    console.log("x:"+mousePos.x+" y:"+mousePos.y);
});

// Клик мыши  //
canvas.addEventListener('click',function(e){
    mousePos = CalcMousePos(canvas,e);
    console.log("Click on: "+mousePos.x+", "+mousePos.y);
    console.log("Player at: "+player.x+", "+player.y);

    var hit = false;

    for(var i = 0; i < objects.length; i++)
    {
        hit = objects[i].Pop();

        if(hit)
        {
            objects[i].popped = true;
            break;
        }
    }
});


//Работа с графикой
function Draw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    //Очистка холста от предыдущего кадра

    context.drawImage(
            background_img.image,
            0,
            0,
            background_img.image.width,
            background_img.image.height,
            background_img.x,
            background_img.y,
            canvas.width,
            canvas.height
        )

    for(var i = 0; i < objects.length; i++)
    {
        DrawBalloon(objects[i]);
    }
}

function DrawBalloon(balloon){
    context.drawImage(
            balloon.image,
            0,
            0,
            balloon.image.width,
            balloon.image.height,
            balloon.x,
            balloon.y,
            balloon.image.width * scale,
            balloon.image.height * scale
        )
}

var mousePos = 0;

// Часть отслеживания курсора //
function CalcMousePos(canvas, e){
    var rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - Math.trunc(rect.left),
        y: e.clientY - Math.trunc(rect.top)
    };
}

function KeyDown(e)
{
    switch(e.keyCode)
    {       
        case 27: //Esc
            if(timer == null)
            {
                Start();
                console.log("continue");
            }
            else
            {
                Stop();
                console.log("stop");
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
//
}

