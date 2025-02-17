const audio = document.querySelector("audio");
const progress = document.querySelector("#progress");
const playBtn = document.querySelector(".fa-play");
const playdiv = document.querySelector(".fa-pla");
const prevBtn = document.querySelector(".fa-backward");
const nextBtn = document.querySelector(".fa-forward");
const songName = document.querySelector("#name");
const singer = document.querySelector("#singer");
const img = document.querySelector("#img");
const currTime = document.querySelector("#current-time");
const totalTime = document.querySelector("#total-time");
document.querySelector("#progress").style.setProperty("--thumb-color", "white");
window.onload = () => {
    document.getElementById("progress").value = 0;
};


let isPlaying = false;
let songs = [
    { name: "Tum Hi Ho", singer: "Arijit Singh", src: "media/song.mp3", img: "media/img.webp" },
    { name: "Ami Je Tomar", singer: "Shreya Ghoshal", src: "media/amijetomar.mp3", img: "media/img2.jpg" },
    { name: "Nahin milta", singer: "BAYAAN", src: "media/NahinMilta.mp3", img: "media/img3.jpg" }
];

let currentSong = 0;
const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};
audio.addEventListener("loadedmetadata", () => {
    totalTime.innerHTML = formatTime(audio.duration);
});

// **Update Progress Bar and Current Time**
audio.addEventListener("timeupdate", () => {
    progress.value = (audio.currentTime / audio.duration) * 100;
    currTime.innerHTML = formatTime(audio.currentTime);
});
// **Play/Pause Function**
const playPause = () => {
    if (isPlaying) {
        audio.pause();
        playBtn.classList.replace("fa-pause", "fa-play");
    } else {
        audio.play();
        playBtn.classList.replace("fa-play", "fa-pause");
    }
    isPlaying = !isPlaying;
};

// **Update Progress Bar**
audio.addEventListener("timeupdate", () => {
    progress.value = (audio.currentTime / audio.duration) * 100;
    
});

// **Seek Audio**
progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

// **Load New Song**
const loadSong = (index) => {
    let song = songs[index];
    songName.textContent = song.name;
    singer.textContent = song.singer;
    audio.src = song.src;
    img.src = song.img;
};

// **Previous Song**
prevBtn.addEventListener("click", () => {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    audio.play();
    playBtn.classList.replace("fa-play", "fa-pause");
    isPlaying = true;
});

nextBtn.addEventListener("click", () => {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    audio.play();
    playBtn.classList.replace("fa-play", "fa-pause");
    isPlaying = true;
});
playdiv.addEventListener("click", playPause);


loadSong(currentSong);
