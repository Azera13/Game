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
class Strike{
    constructor(image, x, y){
        this.x = x;
        this.y = y;

        this.loaded = false;

        this.image = new Image();

        var obj = this;

        this.image.addEventListener("load", function () { obj.loaded = true; });

        this.image.src = image;        
    }

    Update(){

    }
}

class Bullet{
    constructor(image, x, y){
        this.x = x;
        this.y = y;

        this.loaded = false;

        this.image = new Image();

        var obj = this;

        this.image.addEventListener("load", function () { obj.loaded = true; });

        this.image.src = image;
    }

    Update(){

    }
}

class Balloon{
    constructor(image, x, y){
        this.x = x;
        this.y = y;

        this.loaded = false;

        this.image = new Image();

        var obj = this;

        this.image.addEventListener("load", function () { obj.loaded = true; });

        this.image.src = image;
    }

    Update(){

        this.y -= speed + RandomInt(1,3);
    }

    Pop(balloon){
        var hit = false;

        if(this.y < player.y 
            && this.y + this.image.height * scale > player.y){
            if(this.x + this.image.width * scale > player.x 
            && this.x < player.x)
            {
                hit = true;
                // console.log("POP!");
            }
        }
        return hit;
    }
    Delete(ballon){
        var out = false;

        if(this.y <  -100)
        {
            out = true;
        }
        return out;
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

var canvas = document.getElementById("game_zone");
var context = canvas.getContext("2d");

var scale = 0.5;// Масштаб

Resize();// При загрузке страницы задается размер холста

window.addEventListener("resize", Resize); 
// При изменении размеров окна будут меняться размеры холста

window.addEventListener("keydown", function (e) { KeyDown(e); }); 
// Проверяет нажатие клавиш

var objects = [];// Массив игровых объектов

var player = new Aim(canvas.width / 2, canvas.height / 2);

var strikes = [];

var bullets = [];

var background_img = new Background("assets/images/background.png",0);

var speed = 3;

var mousePos = 0;

var score = 0;

Start();

function Start(){
    if(!player.dead){
        timer = setInterval(Update, UPDATE_TIME);
        // Состояние игры будет обновляться 60 раз в секунду 
    }  

    var distance = 25;
    var pos = 0;

    for(var i = 0; i < 5; i++){      
        bullets.push(new Bullet("assets/images/bullet.png",
            pos,
            canvas.height - 50));
        var pos = pos + distance;
        DrawBullet(bullets[i]);
    }
    
}

function Stop(){
    SetCookie(name_user,score);
    // console.log(name_user + " " + score);

    clearInterval(timer);// Остановка обновления
    timer = null;   
}

// Обновление игры
function Update(){

    var p;
    p = document.getElementById('idscore');
    p.innerHTML = "Счет: " + score;

    if(RandomInt(0,10000) > 9700){
        objects.push(new Balloon("assets/images/balloon.png", 
            RandomInt(0, canvas.width - 75), 
            RandomInt(canvas.height, canvas.height + 10)));
    }

    player.Update();

    if(strikes.length == 5){
        player.dead = true
    }

    if(player.dead)
    {
        Stop();
        if(!alert("Игра окончена"))
            {window.location.reload();}
    }

    for(var i = 0; i < objects.length; i++)
    {
        objects[i].Update();

        out = objects[i].Delete();

        if(out){
            objects.splice(i,1);
            // console.log("out");

            var dist = 35;
            var p = canvas.width;
            
            if(strikes.length != 0){
                var p = strikes[strikes.length - 1].x;
            }

            strikes.push(new Strike("assets/images/strike.png",
                p - dist,
                5));
            var p = p - dist;
            for(var i = 0; i < strikes.length; i++){
                DrawStrike(strikes[i]);
            }
            break;
        }        
    }


    Draw();
}

// Передвижение мыши и прицела //
canvas.addEventListener('mousemove',function(e){
    mousePos = CalcMousePos(canvas,e);
    // console.log("x:"+mousePos.x+" y:"+mousePos.y);
});

// Клик мыши  //
canvas.addEventListener('click',function(e){
    mousePos = CalcMousePos(canvas,e);
    // console.log("Click on: "+mousePos.x+", "+mousePos.y);
    // console.log("Player at: "+player.x+", "+player.y);

    var hit = false;

    var ammo = true;

    if(bullets.length == 0){
        ammo = false;
    }

    if(ammo){
        for(var i = 0; i < objects.length; i++)
    {
        hit = objects[i].Pop();

        if(hit)
        {
            objects.splice(i,1);
            score += 1;
            break;
        }
    }

    bullets.pop();
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

    for(var i = 0; i < bullets.length; i++)
    {
        DrawBullet(bullets[i]);
    }

    for(var i = 0; i < strikes.length; i++)
    {
        DrawStrike(strikes[i]);
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
function DrawBullet(bullet){
    context.drawImage(
            bullet.image,
            0,
            0,
            bullet.image.width,
            bullet.image.height,
            bullet.x,
            bullet.y,
            bullet.image.width * scale / 2,
            bullet.image.height * scale / 2
        )
}

function DrawStrike(strike){
    context.drawImage(
            strike.image,
            0,
            0,
            strike.image.width,
            strike.image.height,
            strike.x,
            strike.y,
            strike.image.width * scale / 20,
            strike.image.height * scale / 20
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
                // console.log("continue");
            }
            else
            {
                Stop();
                // console.log("stop");
            }
            break;
        case 82: //R
            setTimeout(Reload, 500);
            break;
    }
}
// Перезарядка //
function Reload(){
    var distance = 25;
    if (bullets.length == 0){
        var pos = 0 - distance;
    }
    else{
        var pos = bullets[bullets.length - 1].x;
    }
            
    var howmuch = bullets.length;
    for(var i = 0; i < 5 - howmuch;i++){
        bullets.push(new Bullet("assets/images/bullet.png",
            pos + distance,
            canvas.height - 50));
        pos = pos + distance;
        DrawBullet(bullets[i]);
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

function SetCookie(uname, scorevalue) {
    for(var i = 0; i < records.length; i++){
        var str = String(records[i]);
        var current = str.split('=')[1];
        var name = str.split('=')[0];

        if(scorevalue > current && uname == name){
            document.cookie = uname + "=" + scorevalue + ";" 
            + "SameSite=None; Secure";
        }
        else if(uname != name){
            document.cookie = uname + "=" + scorevalue + ";" 
            + "SameSite=None; Secure";
        }
    }    
}
//
}

