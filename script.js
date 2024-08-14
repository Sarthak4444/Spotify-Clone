let container = document.querySelector(".card_container");

let play = document.querySelector(".play");

let prev = document.querySelector(".prev");

let next = document.querySelector(".next");

let hamBtn = document.querySelector(".ham_btn");

let close = document.querySelector(".close");

let songArray = [];

let srcArray = [];

let currentAudio = new Audio();

function convertSecondsToMinutes(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

    for (song in Songs) {
      let songName = Songs[song].Name;
      let songPath = Songs[song].Path;
      let songSinger = Songs[song].Singer;
      let songThumbnail = Songs[song].Thumbnail;
      let div = document.createElement("div");
      div.innerHTML = `<div class="card">
      <img
        class="cover"
        src="${songThumbnail}"
        alt="song_thumbnail"
      />
      <button class="play_button">
        <img
          class="play_icon"
          src="icons/icons8-play-26.png"
          alt="play"
        />
      </button>
      <h2>${songName}</h2>
      <p>${songSinger}</p>
    </div>`;
      container.appendChild(div);
      songArray.push(song);
      srcArray.push(songPath);
    }

Array.from(document.querySelectorAll(".card")).forEach((card) => {
  card.addEventListener("click", () => {
    playMusic(card.querySelector("h2").innerText);
  });
})

const playMusic = (track) => {
  let songPath = Songs[track].Path;
  currentAudio.src = songPath;
  currentAudio.play();
  play.src = "icons/icons8-pause-64.png";
  document.querySelector(".songInfo").innerHTML = `<span>${track} - ${Songs[track].Singer}</span>`;
  document.querySelector(".songTime").innerHTML = `<span>00:00</span> / <span class="songDuration">00:00</span>`;
}

play.addEventListener("click", () => {
  if(currentAudio.paused) {
    currentAudio.play();
    play.src = "icons/icons8-pause-64.png"
  } else {
    currentAudio.pause();
    play.src = "icons/icons8-play-64.png"
  }
})

prev.addEventListener("click", () => {
let track = songArray[srcArray.indexOf(currentAudio.src) - 1];
if(track === undefined) {
  track = songArray[songArray.length - 1];
}
playMusic(track);
})

next.addEventListener("click", () => {
  let track = songArray[srcArray.indexOf(currentAudio.src) + 1];
  if(track === undefined) {
    track = songArray[0];
  }
  playMusic(track);
})

currentAudio.addEventListener("timeupdate", () => {
  let current = convertSecondsToMinutes(currentAudio.currentTime);
  let duration = convertSecondsToMinutes(currentAudio.duration);
  document.querySelector(".songTime span:nth-child(1)").innerHTML = current;
  document.querySelector(".songDuration").innerHTML = duration;
  document.querySelector(".pointer").style.left = (currentAudio.currentTime / currentAudio.duration) * 100 + "%";
})

hamBtn.addEventListener("click", () => {
  document.querySelector(".left").style.left = "0";
})

close.addEventListener("click", () => {
  document.querySelector(".left").style.left = "-100vw";
})

document.querySelector(".seekBar").addEventListener("click", (e) => {
  currentAudio.currentTime = (e.offsetX / document.querySelector(".seekBar").offsetWidth) * currentAudio.duration;
})