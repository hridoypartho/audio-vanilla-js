var playIcon = document.querySelector("#play");
var pauseIcon = document.querySelector("#pause");
var time = document.querySelector(".time");
var loop = document.querySelector(".loop");
var durationTimeline = document.querySelector(".duration-timeline");


var audio = new Audio("./BGM.mp3");

function playAndPauseAudio() {
    if (audio.paused) {
        audio.play();

        playIcon.style.display = "none";
        pauseIcon.style.display = "block";

    } else {
        audio.pause();
        playIcon.style.display = "block";
        pauseIcon.style.display = "none";
    }
}
audio.addEventListener("canplaythrough", ()=>{

    time.innerHTML = audio.currentTime + " / " + audio.duration;
});
var clearId = 0;

audio.addEventListener("play", function () {
    time.innerHTML = audio.currentTime + " / " + audio.duration;

    clearId = setInterval(() => {
        time.innerHTML = audio.currentTime + " / " + audio.duration;
    });

    // Calculate Percentage

    var percent = (audio.currentTime / audio.duration) * 100;
    durationTimeline.style.maxWidth = percent + "%";

    if(percent === 100){
        durationTimeline.style.maxWidth = "0%";
        time.innerHTML = "0" + "/" + audio.duration;
    }

});

audio.addEventListener("pause", function () {
    clearInterval(clearId)
});

audio.addEventListener("ended", () => {
    pauseIcon.style.display = "none";
    playIcon.style.display = "block";
})

playIcon.addEventListener("click", playAndPauseAudio);
pauseIcon.addEventListener("click", playAndPauseAudio);

// Creating range 
var range = document.querySelector(".range");
range.addEventListener("change", function (event) {
    audio.volume = event.target.value;
});

// Loop

loop.addEventListener("click", () => {
    if (audio.loop) {
        // set audio loop to false
        audio.loop = false;
        // change  Loop DOM text to on
        loop.innerHTML = "ON";
    } else {
        // set audio loop to true
        audio.loop = false;
        // change  Loop DOM text to off
        loop.innerHTML = "OFF";
    }
});