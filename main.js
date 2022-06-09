status = "";
canvas = "";
video = "";
objectDetector = "";
input = "";
objects = [];
percent = 0;
synth = "";
utterThis = "";
thelabel = "";
function setup(){
    canvas = createCanvas(380, 420);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}
function draw(){
    image(video, 0, 0, 380, 420);
    if(status != ""){
        for(i=0; i < objects.length; i++){
            fill(255, 0, 0);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y);
            noFill();
            stroke(255, 0, 0);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            thelabel = objects[i].label;
        }
    }
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects";
    input = document.getElementById("inputtag").value;
    objectDetector.detect(video, gotResult);
    if(input == thelabel){
        video.stop();
        document.getElementById("status").innerHTML = "object mentioned found";
        synth = window.speechSynthesis;
        utterThis = "object mentioned found.";
        synth.speak(new SpeechSynthesisUtterance(utterThis));
    }
}
function modelLoaded(){
    console.log("model loaded");
    status = true;
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}