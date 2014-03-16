var stage; 
var cola;
var band= true;
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
    
    n1.x = stage.canvas.width/2 - 100 - 240 ;
    n2.x = stage.canvas.width/2 -100;
    n3.x = stage.canvas.width/2 -100 + 240 ;
    n1.y = stage.canvas.height/2 + 30;
    n2.y = stage.canvas.height/2 + 30;
    n3.y = stage.canvas.height/2 + 30;
    
    escudo.x = stage.canvas.width/2 - 120;
    escudo.y = 20;
    
    n1.addEventListener('click', onN1Clicked);
    n2.addEventListener('click', onN2Clicked);
    n3.addEventListener('click', onN3Clicked);
    escudo.addEventListener('click', onEscudoClicked);
    
    var info = new createjs.Text('Elecciones Liceo Galois 2014', "30px Arial", "black"); 
    info.name = 'info_txt';
    info.textAlign = 'center';
    info.textBaseline = "top";
    info.lineWidth = 400;
    info.x = stage.canvas.width/2;
    info.y = stage.canvas.height/2 - 50;

    var t1 = new createjs.Text('01 - Jose Jimenez', "20px Arial", "black"); 
    t1.name = 't1';
    t1.textAlign = 'center';
    t1.textBaseline = "top";
    t1.lineWidth = 200;
    t1.x = stage.canvas.width/2 - 100 - 135 ;
    t1.y = stage.canvas.height/2 + 200;

    var t2 = new createjs.Text('02 - Jose Jimenez', "20px Arial", "black"); 
    t2.name = 't1';
    t2.textAlign = 'center';
    t2.textBaseline = "top";
    t2.lineWidth = 200;
    t2.x = stage.canvas.width/2;
    t2.y = stage.canvas.height/2 + 200;

    var t3 = new createjs.Text('03 - Jose Jimenez', "20px Arial", "black"); 
    t3.name = 't1';
    t3.textAlign = 'center';
    t3.textBaseline = "top";
    t3.lineWidth = 200;
    t3.x = stage.canvas.width/2 + 100 + 135 ;
    t3.y = stage.canvas.height/2 + 200;

    var state = new createjs.Text('01 - Jose Jimenez', "20px Arial", "black"); 
    state.name = 'state';
    state.textAlign = 'center';
    state.textBaseline = "top";
    state.lineWidth = 200;
    state.x = stage.canvas.width/2 -100 ;
    state.y = stage.canvas.height -50;
    
    stage.enableMouseOver();
    stage.addChild(n1);
    stage.addChild(n2);
    stage.addChild(n3);
    stage.addChild(escudo);
    stage.addChild(info);
    stage.addChild(t1);
    stage.addChild(t2);
    stage.addChild(t3);
    stage.addChild(state);
           
}

function onEscudoClicked(event){
   var info = stage.getChildByName('state');
    info.text = 'Escoge un candidato Rapido ;)';
    info.color ='blue';
}

function onN1Clicked(){
    if (band == true){
        var info = stage.getChildByName('state');
        info.text = 'Espere confirmación del Voto... (Cargando)';
        info.color ='blue';
        var candidato = "01";
        var url="http://controlacademico.liceogalois.com/administrador/guardarVoto";
        var data="candidato="+candidato;
        envioJson(url,data,function respuesta(res){               
            if (res==1){
                band=false;
                info.text = 'Voto Guardado Correctamente';
                info.color ='green';
                setTimeout(function() {
                    band=true;
                }, 2000);
                
            }else{
               info.text = 'Error al guardar Voto... Intente nuevamente';
                info.color ='red'; 
            }
            
         }); 
     }else{
         alert('ojoooo');
     }
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