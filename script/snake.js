function keyDownHandler(e){
        switch(e.key){
                case "ArrowLeft":
                        keys.ArrowLeft=true;
                        break;
                case "ArrowDown":
                        keys.ArrowDown=true;
                        break;
                case "ArrowRight":
                        keys.ArrowRight=true;
                        break;
                case "ArrowUp":
                        keys.ArrowUp=true;
                        break;
        }
}
function keyUpHandler(e){
        switch(e.key){
                case "ArrowLeft":
                        keys.ArrowLeft=false;
                        break;
                case "ArrowDown":
                        keys.ArrowDown=false;
                        break;
                case "ArrowRight":
                        keys.ArrowRight=false;
                        break;
                case "ArrowUp":
                        keys.ArrowUp=false;
                        break;
        }
}

var canvas=document.getElementById("myCanvas");
var ctx= canvas.getContext("2d");
const deplasare = 20;
var keys = {
        ArrowDown:false,
        ArrowLeft:false,
        ArrowRight:false,
        ArrowUp:false
}
document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);


var point = {x:40,y:40};
var p1 = {x:40,y:60};
var p2 = {x:40,y:80}
var p3 ={x:40,y:100};
var p4 = {x:40,y:120}
var p5 = {x:40,y:140};
var p6 = {x:40,y:160};
var pozitii = [p6,p5,p4,p3,p2,p1,point]
var x = pozitii[pozitii.length-1].x;
var y = pozitii[pozitii.length-1].y;

function draw_snake(){
        for(var i = 0;i<pozitii.length;i++){
                ctx.beginPath();
                ctx.rect(pozitii[i].x,pozitii[i].y,20,20);
                if(i==pozitii.length-1)
                        ctx.fillStyle="darkblue";
                else
                        ctx.fillStyle="blue";
                ctx.lineWidth=2;
                ctx.stroke();
                ctx.fill();
                ctx.closePath();
        }
 }      

var direction;
function move (){
        switch(direction){
                case 0:
                       if(x+deplasare<canvas.width)
                                x+=deplasare;
                        break;
                case 1:
                        if(y+deplasare<canvas.height)
                                y+=deplasare;
                        break;
                case 2:
                        if(y>0)
                                y-=deplasare;
                        break;
                case 3: 
                        if(x>0)
                                x-=deplasare; 
                        break;
        }
}

function checkKeys(){
        if(!(keys.ArrowLeft&&keys.ArrowUp
        ||keys.ArrowLeft&&keys.ArrowDown
        ||keys.ArrowLeft&&keys.ArrowRight
        ||keys.ArrowUp&&keys.ArrowDown
        ||keys.ArrowUp&&keys.ArrowRight
        ||keys.ArrowDown&&keys.ArrowRight))
        {
                if(x+deplasare!=pozitii[pozitii.length-2].x&&keys.ArrowRight==true)
                        direction=0;
                if(y+deplasare!=pozitii[pozitii.length-2].y&&keys.ArrowDown==true)
                        direction=1;
                if(y-deplasare!=pozitii[pozitii.length-2].y&&keys.ArrowUp==true)
                        direction = 2;
                if(x-deplasare!=pozitii[pozitii.length-2].x&&keys.ArrowLeft==true)
                        direction = 3;
        }
}

var xInitial = pozitii[pozitii.length-1].x;
var yInitial = pozitii[pozitii.length-1].y;

function snakeTailPositions(){
        if(x!=xInitial||y!=yInitial){
                for(var i =0;i<pozitii.length-2;i++){
                pozitii[i].x=pozitii[i+1].x;
                pozitii[i].y=pozitii[i+1].y;
        }
                pozitii[pozitii.length-2].x=xInitial;
                pozitii[pozitii.length-2].y=yInitial;
                pozitii[pozitii.length-1].x=x;
                pozitii[pozitii.length-1].y=y;
                xInitial=x;
                yInitial=y;
        }
}


function colide(y,z){
        for(var i =0 ;i<pozitii.length-2;i++){
                if(y==pozitii[i].x&&z==pozitii[i].y){
                        return true;
                }
        }
        return false;
}
function colision(){
        
        if(colide(x,y))
        {
                console.log("Collision");
        }
}
var appleX;
var appleY;     
var nrApples = 0;
var totalApple=0;
function drawApple(){
        ctx.beginPath();
        ctx.rect(appleX,appleY,20,20);
        ctx.fillStyle="red";
        ctx.lineWidth=3;
        ctx.stroke();
        ctx.fill();     
        ctx.closePath();
}


function checkXY(x,y){
        for(var i =0 ;i<pozitii.length;i++){
                if(x==pozitii[i].x&&y==pozitii[i].y){
                        return false;
                }
        }
        return true;
}
function spawnApple(){
        let check = 0;
        while(check==0&&nrApples==0){
                appleX=Math.floor(Math.random()*canvas.width/20)*20;
                appleY=Math.floor(Math.random()*canvas.height/20)*20;   
                if(checkXY(appleX,appleY)==true){
                        check =1;
                        nrApples=1;
                }
        }
}
function growSnake(){
        if(x==appleX&&y==appleY){
                nrApples=0;
                totalApple+=1;
                document.getElementById('score').innerHTML=totalApple;
                var tail ={x:pozitii[pozitii.length-2].x,y:pozitii[pozitii.length-2].y};
                pozitii.push(tail);
        }
}
function draw(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        draw_snake();
        checkKeys();
        move();
        snakeTailPositions();
        drawApple();
        spawnApple();
        growSnake();
        colision();
}

setInterval(draw,50);