 status="";
 img="";
 objects=[];
function preload() {
  img = loadImage("dog_cat.jpg")
}
function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video=createCapture(VIDEO);
  video.size(380,380);
  video.hide();
 

}


function draw() {
  image(video, 0, 0, 380, 380);
  if(status != ""){
    g= random(255);
    r= random(255);
    b= random(255);
    objectDetector.detect(video,gotResults);
    for( i=0 ; i< objects.length; i++){
      document.getElementById("status").innerHTML="Object Detected";
      document.getElementById("number_of_object").innnerHTML= "Number of objects detected are "+object.lenght;      fill(r,g,b);
      percent=floor(objects[i].confidence*100);
      text(objects[i].label+"  "+percent+" %",objects[i].x,objects[i].y);
      noFill();
      stroke(r,g,b);
      rect(objects[i].x-25,objects[i].y-20,objects[i].width,objects[i].height);
    }

  }
}

function modalLoaded(){
  console.log("Modal Loaded");
  objectDetector.detect(video , gotResults);
  status=true;
  
}
function gotResults(error,result){
  if(error){
      console.error(error);
  }else{
      console.log(result);
      objects=result;
  }

}
function start(){
  objectDetector = ml5.objectDetector("cocossd", modalLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting object ";
}