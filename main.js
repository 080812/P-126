LWX=0
LWY=0

RWX=0
RWY=0

scoreLW=0
scoreRW=0

function preload(){
song=loadSound("music.mp3")
song2=loadSound("music2.mp3")
}

function setup(){
canvas=createCanvas(500,400)
canvas.center()
video=createCapture(VIDEO)
video.hide()
poseNet=ml5.poseNet(video,modelLoaded)
poseNet.on('pose',gotposes)
}

function draw(){
image(video,0,0,500,400)

if(scoreLW>0.2){
    fill('red')
    circle(LWX,LWY,50)
}

if(scoreRW>0.2){
    fill('red')
    circle(RWX,RWY,50)
}
}

function modelLoaded(){
    console.log('model is loaded')
}


function gotposes(results){
    if(results.length>0){
        console.log(results)

LWX=results[0].pose.leftWrist.x 
LWY=results[0].pose.leftWrist.y 

RWX=results[0].pose.rightWrist.x 
RWY=results[0].pose.rightWrist.y 

scoreLW=results[0].pose.keypoints[9].score
score=results[0].pose.keypoints[10].score
    }
}