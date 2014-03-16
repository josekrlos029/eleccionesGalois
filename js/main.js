var stage; 
var cola;

//var n1, n2, n3;

var planetList = null;
var player = null;
var playerSpeed = 0;
var playerAngle = 0;
var keyManager = null;

var ANCHOJUEGO = 970;
var ALTOJUEGO = 662;
var PADDING = 10;
var PROPORCIONJUEGO = ANCHOJUEGO / ALTOJUEGO;
var MAXSPEED = 5;
var FPS = 30;

function init() 
{
    stage = new createjs.Stage('canvasJuego');
    cola = new createjs.LoadQueue();
    
    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS(FPS);
    createjs.Ticker.addEventListener("tick", $.proxy(refreshGame, this) );

    window.addEventListener("resize", $.proxy(onResizeViewPort, this), false);
    window.addEventListener("orientationChange", $.proxy(onResizeViewPort, this), false);
    cola.loadFile({src:'data/data.json', id:'imageList', type:createjs.LoadQueue.JSON});
    cola.addEventListener("fileload", onDatosCargados);
    
            
}

function finalAnimacion(){
    
}

function onResizeViewPort(){
    
    var gameArea;
    var newWidth;
    var newHeight;
    var newAspectRatio;
    
    gameArea = document.getElementById("juego");
    newWidth = $(window).width();
    newHeight = $(window).height();
    newAspectRatio = newWidth /newHeight;
    
    if (newAspectRatio > PROPORCIONJUEGO){
        newHeight -= PADDING;
        newWidth = newHeight * PROPORCIONJUEGO;
        $(gameArea).height(newHeight);
        $(gameArea).width(newWidth);
        
    }else{
        newHeight -= PADDING;
        newWidth = newHeight / PROPORCIONJUEGO;
        $(gameArea).height(newHeight);
        $(gameArea).width(newWidth);
    }
    
    $(gameArea).css('margin-top',(-newHeight /2) +'px');
    $(gameArea).css('margin-left',(-newWidth /2) +'px');
    
    stage.canvas.width= newWidth;
    stage.canvas.height= newHeight;
    
    stage.scaleX= newWidth / ANCHOJUEGO;
    stage.scaleY= newHeight / ALTOJUEGO;
}

function onDatosCargados(event)
{
    var item = event.item;
    var type = item.type;
    var imageList = [];
    var i;

    if (type == createjs.LoadQueue.JSON)
    {
        for (i=0; i<event.result.imagenes.length; i++)
        {
            imageList.push({id: event.result.imagenes[i].id, src: event.result.imagenes[i].src});
        }

        cola.loadManifest(imageList);
        //cola.addEventListener('fileload', onImagenCargada);
        cola.addEventListener("complete", onImagenesCompletadas);
    }
}

function onImagenCargada(event)
{
    var item = event.item;
    var type = item.type;
    var nImagen = stage.getNumChildren();
    var dimensiones;
    var imagenesPorFila = 10;
    var img;

    if (type == createjs.LoadQueue.IMAGE)
    {
        
        img = new createjs.Bitmap(event.result);
        img.name = 'img_'+nImagen;

        dimensiones = img.getBounds();
        img.x = nImagen%imagenesPorFila * dimensiones.width;
        img.y = Math.floor(nImagen/imagenesPorFila) * dimensiones.height;

        stage.addChildAt(img, nImagen);
        stage.update();

        cola.setPaused(true);
        setTimeout(function() {
            cola.setPaused(false);
        }, 500);
    }
}

function onImagenesCompletadas(event)
{

    var datos = cola.getResult('imageList');
    var n1 = new createjs.Bitmap(datos.imagenes[0].src);
    var n2 = new createjs.Bitmap(datos.imagenes[1].src);
    var n3 = new createjs.Bitmap(datos.imagenes[2].src);
    var escudo = new createjs.Bitmap(datos.imagenes[3].src);
    
    
    n1.name = datos.imagenes[0].id;
    n2.name = datos.imagenes[1].id;
    n3.name = datos.imagenes[2].id;
    escudo.name = datos.imagenes[3].id;
    
    n1.height = 50;
    n1.width = 70;
    n2.height = 50;
    n2.width = 70;
    n3.height = 50;
    n3.width = 70;
    
    n1.x = stage.canvas.width/2 - 60 ;
    n2.x = stage.canvas.width/2;
    n3.x = stage.canvas.width/2 + 60 ;
    n1.y = stage.canvas.height/2;
    n2.y = stage.canvas.height/2;
    n3.y = stage.canvas.height/2;
    
    //escudo.setBounds(0,0, 50,50); 
    escudo.x = stage.canvas.width/2 - 120;
    escudo.y = 30;
     
    
    n1.addEventListener('click', onN1Clicked);
    n2.addEventListener('click', onN2Clicked);
    n3.addEventListener('click', onN3Clicked);
    escudo.addEventListener('click', onEscudoClicked);
    
    stage.enableMouseOver();
    stage.addChild(n1);
    stage.addChild(n2);
    stage.addChild(n3);
    stage.addChild(escudo);
    
    
           
}

function onEscudoClicked(event){
    alert("Esooo");
}

function onN1Clicked(){
    
    alert("n1");
}

function onN2Clicked(){
    alert("n2");
}

function onN3Clicked(){
    alert("n3");
}
function refreshGame(e)
    {
        this.stage.update();
    }