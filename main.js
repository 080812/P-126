LWX = 0
LWY = 0

RWX = 0
RWY = 0

scoreLW = 0
scoreRW = 0

song1status = ""
song2status = ""

function preload() {
    song1 = loadSound("music.mp3")
    song2 = loadSound("music2.mp3")
}

function setup() {
    canvas = createCanvas(500, 400)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotposes)
}

function draw() {
    image(video, 0, 0, 500, 400)

    song1status = song1.isPlaying()
    song2status = song2.isPlaying()

    if (scoreLW > 0.2) {
        fill('red')
        circle(LWX, LWY, 50)
        song2.stop()
        if (song1status == false) {
            song1.play()
            document.getElementById("songname").innerHTML = "Peterpan"
        }

    }

    if (scoreRW > 0.2) {
        fill('red')
        circle(RWX, RWY, 50)
        song1.stop()
        if (song2status == false) {
            song2.play()
            document.getElementById("songname").innerHTML = "HarryPotter Theme"
        }
    }
}

function modelLoaded() {
    console.log('model is loaded')
}


function gotposes(results) {
    if (results.length > 0) {
        console.log(results)

        LWX = results[0].pose.leftWrist.x
        LWY = results[0].pose.leftWrist.y

        RWX = results[0].pose.rightWrist.x
        RWY = results[0].pose.rightWrist.y

        scoreLW = results[0].pose.keypoints[9].score
        scoreRW= results[0].pose.keypoints[10].score
    }
}