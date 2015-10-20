var musicName = ["井内舞子 - Dear My Friend",
    "川田まみ - See Visions"];
var musicSrc = ["music/dear_my_friend.ogg",
    "music/see_visions.ogg"];
var musicPic = ["image/album0.jpg",
    "image/album1.jpg"];

var currentPlay = 0;

function quit(e) {
    window.opener = null;
    window.open('', '_self');
    window.close();
}

function play() {
    var audio = document.getElementById("audio");
    audio.play();
    document.getElementById("play").style.display = "none";
    document.getElementById("pause").style.display = "block";
}

function pause() {
    var audio = document.getElementById("audio");
    audio.pause();
    document.getElementById("pause").style.display = "none";
    document.getElementById("play").style.display = "block";
}

function renew() {
    var audio = document.getElementById("audio");
    var loaded = document.getElementById("loaded")
    var played = document.getElementById("played");
    var scroll = document.getElementById("scroll");
    var time1 = document.getElementById("time1");
    var time2 = document.getElementById("time2");
    var time3 = document.getElementById("time3");
    var time4 = document.getElementById("time4");
    //progress bar
    loaded.style.width = (audio.buffered.length.valueOf() * 200) + "px";
    played.style.width = (audio.currentTime * 200 / audio.duration) + "px";
    scroll.style.left = (audio.currentTime * 200 / audio.duration - 6) + "px";
    //time bar
    var t1 = Math.floor(Math.floor(audio.currentTime) / 60 / 10);
    var t2 = Math.floor(Math.floor(audio.currentTime) / 60) % 10;
    var t3 = Math.floor((Math.floor(audio.currentTime) - 60 * (10 * t1 + t2)) / 10);
    var t4 = Math.floor(audio.currentTime) - 60 * (10 * t1 + t2) - 10 * t3;
    time1.style.backgroundPosition = t1 * (-8.9) + "px 0px";
    time2.style.backgroundPosition = t2 * (-8.9) + "px 0px";
    time3.style.backgroundPosition = t3 * (-8.9) + "px 0px";
    time4.style.backgroundPosition = t4 * (-8.9) + "px 0px";
    //if end
    if (audio.ended) {
        nextMusic();
    }
    setTimeout("renew()", 250);
}

function changeMusic(id) {
    var audio = document.getElementById("audio");
    var title = document.getElementById("music_name");
    var album = document.getElementById("album");
    audio.src = musicSrc[id];
    title.innerHTML = musicName[id];
    album.src = musicPic[id];
    document.getElementById("song" + currentPlay).style.color = "#BBBBBB";
    document.getElementById("song" + id).style.color = "azure";
    currentPlay = id;
    play();
}

function nextMusic() {
    var next = currentPlay + 1;
    changeMusic(next < musicSrc.length ? next : 0);
}

function prevMusic() {
    var prev = currentPlay - 1;
    changeMusic(prev >= 0 ? prev : musicSrc.length - 1);
}

function noList() {
    document.getElementById("list_window").style.display = "none";
    document.getElementById("play_list_button").onclick = function () {
        showList();
    };
}

function showList() {
    document.getElementById("list_window").style.display = "block";
    document.getElementById("play_list_button").onclick = function () {
        noList();
    };
}
