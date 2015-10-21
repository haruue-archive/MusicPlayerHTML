/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * REDROCK-TEAM HOMEWORK 2 (20151018)                          *
 * Design a music player in HTML and CSS                       *
 * Author:    Haruue Icymoon                                   *
 * Time:      Tue Oct 20 22:42:58 CST 2015                     *
 * Website:   http://www.caoyue.com.cn/                        *
 * Test page: http://haruue.azurewebsites.net/Web-2-20151018/  *
 * File:      index.html, player.css, player.js                *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

var musicName = ["井内舞子 - Dear My Friend",
    "川田まみ - See Visions"];
var musicSrc = ["music/dear_my_friend.ogg",
    "music/see_visions.ogg"];
var musicPic = ["image/album0.jpg",
    "image/album1.jpg"];

var currentPlay = 0;
var isMouseDown = false;
var whichMouseDown = -1;

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
    var loaded = document.getElementById("loaded");
    var played = document.getElementById("played");
    var scroll = document.getElementById("scroll");
    var time1 = document.getElementById("time1");
    var time2 = document.getElementById("time2");
    var time3 = document.getElementById("time3");
    var time4 = document.getElementById("time4");
    //progress bar
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

function checkMute() {
    var audio = document.getElementById("audio");
    var soundIcon = document.getElementById("sound_icon");
    var muteSoundIcon = document.getElementById("mute_sound_icon");
    var soundValue = document.getElementById("sound_value");
    var soundScroll = document.getElementById("sound_scroll");
    audio.muted = true;
    soundIcon.style.display = "none";
    muteSoundIcon.style.display = "block";
    soundValue.style.width = "0px";
    soundScroll.style.left = "-6px";
}

function noMute() {
    var audio = document.getElementById("audio");
    var soundIcon = document.getElementById("sound_icon");
    var muteSoundIcon = document.getElementById("mute_sound_icon");
    var soundValue = document.getElementById("sound_value");
    var soundScroll = document.getElementById("sound_scroll");
    audio.muted = false;
    soundIcon.style.display = "block";
    muteSoundIcon.style.display = "none";
    audio = document.getElementById("audio");
    if (audio.volume == 0) {
        audio.volume = 0.4;
    }
    soundValue.style.width = (audio.volume * 100) + "px";
    soundScroll.style.left = (audio.volume * 100 - 6) + "px";
}

function onMouseDown(id) {
    isMouseDown = true;
    whichMouseDown = id;
}

function mouseUp() {
    if (whichMouseDown == 0) {
        var audio = document.getElementById("audio");
        audio.play();
    }
    isMouseDown = false;
    whichMouseDown = -1;
}

function move(e) {
    if (isMouseDown) {
        if (whichMouseDown == 0) {
            var audio = document.getElementById("audio");
            var scroll = document.getElementById("scroll");
            var played = document.getElementById("played");
            var currentX = (e.clientX < 133) ? 0 : (e.clientX > 333 ? 200 : (e.clientX - 133));
            audio.pause();
            audio.currentTime = currentX * audio.duration / 200;
            scroll.style.left = (currentX - 6) + "px";
            played.style.width = currentX + "px";
        }
        else if (whichMouseDown == 1) {
            var audio = document.getElementById("audio");
            var volumeScroll = document.getElementById("sound_scroll");
            var volumeValue = document.getElementById("sound_value");
            var currentX = (e.clientX < 62) ? 0 : (e.clientX > 162 ? 100 : (e.clientX - 62));
            audio.volume = currentX * 0.01;
            volumeScroll.style.left = (currentX - 6) + "px";
            volumeValue.style.width = currentX + "px";
            if (audio.volume == 0) {
                document.getElementById("sound_icon").style.display = "none";
                document.getElementById("mute_sound_icon").style.display = "block";
            }
            else {
                document.getElementById("sound_icon").style.display = "block";
                document.getElementById("mute_sound_icon").style.display = "none";
            }
        }
    }
}

