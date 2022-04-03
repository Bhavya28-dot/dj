song="";
leftWristx=0;
leftWristy=0;
rightWristx=0;
rightWristy=0;
scoreLeftWrist=0;

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function gotPoses(result){
    if(result.length>0){
        console.log(result);
        scoreLeftWrist=result[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist="+scoreLeftWrist);
        leftWristx=result[0].pose.leftWrist.x;
        leftWristy=result[0].pose.leftWrist.y;
        rightWristx=result[0].pose.rightWrist.x
        rightWristy=result[0].pose.rightWrist.y;
        console.log("Left Wrist X="+leftWristx+"Left Wrist Y="+leftWristy+"Right Wrist X="+rightWristx+"Right Wrist Y="+rightWristy);
    }
}
function modelLoaded(){
    console.log("Posnet is Initialized");
}
function draw(){
    image( video,0,0,600,500);
    fill("purple");
    stroke("white");
    if(scoreLeftWrist>0.2){
    circle(leftWristx, leftWristy,20);
    InNumerleftWristY=Number(leftWristy);
    remove_decimals=floor(InNumerleftWristY);
    volume=remove_decimals/500;
    document.getElementById("volume").innerHTML="Volume= "+volume;
    song.setVolume(volume);
    }
    
}
function preload(){
song=loadSound("song.mp3");
}
function play(){
    song.play();
    song.volume(1);
    song.rate(1);
}
function stop(){
    song.stop();
}