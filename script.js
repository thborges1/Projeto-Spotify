const musicList = [
  {
    name: "Fighting Gold",
    artist: "Coda",
    cover: "img/album-fighting-gold.jpg",
    file: "music/FightingGold.mp3"
  },
  {
    name: "Neon Genesis Evangelion II",
    artist: "Bella e o Olmo da Bruxa",
    cover: "img/album-neon-genisis.jpg",
    file: "music/Bella e o Olmo da Bruxa - Neon Genesis Evangelion II (SPOTISAVER).mp3"
  },
  {
    name: "505",
    artist: "Arctic Monkeys",
    cover: "img/505 cover.jpg",
    file: "music/Arctic Monkeys - 505 (SPOTISAVER).mp3"
  },
  {
    name: "Tell me, Yes or No",
    artist: "Guelca",
    cover: "img/Tell Me, Yes or No cover.jpg",
    file: "music/pibara, Guelca, DJ Noé - Tell Me, Yes or No (SPOTISAVER).mp3"
  },
  {
    name: "Dom Bosco S.A",
    artist: "Chococorn and the Sugarcanes",
    cover: "img/Dom Bosco S.A cover.jpg",
    file: "music/Chococorn and the Sugarcanes - Dom Bosco S.A (SPOTISAVER).mp3"
  },
  {
    name: "Self Aware",
    artist: "Temper City",
    cover: "img/Self Aware cover.jpg",
    file: "music/Temper City - Self Aware (SPOTISAVER).mp3"
  },
  {
    name: "We Gold",
    artist: "YUNG LIXO",
    cover: "img/We Gold cover.jpg",
    file: "music/YUNG LIXO, Hakuro - We Gold (SPOTISAVER).mp3"
  },
  {
    name: "Maquina do Tempo",
    artist: "YUNG LIXO",
    cover: "img/Máquina do Tempo cover.jpg",
    file: "music/YUNG LIXO, Biffe, Hakuro - Máquina do Tempo (SPOTISAVER).mp3"
  },
  {
    name: "Joias da Família",
    artist: "YUNG LIXO",
    cover: "img/Joias da Família cover.jpg",
    file: "music/YUNG LIXO, MAIK sbkaos, Biffe - Joias da Família (SPOTISAVER).mp3"
  },
];

const albumsGrid = document.querySelector(".albums-grid");

const cover = document.getElementById("cover");
const musicName = document.getElementById("music-name");
const artistName = document.getElementById("artist-name");

const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

const volumeControl = document.getElementById("volume");
const playBtn = document.getElementById("playBtn");

const audio = new Audio();

let currentIndex = 0;

//Volume Inicial
audio.volume = 0.2;

// RENDER
musicList.forEach((music, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <img src="${music.cover}">
        <h4>${music.name}</h4>
        <p>${music.artist}</p>
    `;

    card.onclick = () => playMusic(index);

    albumsGrid.appendChild(card);
});

// PLAY
function playMusic(index) {
    const music = musicList[index];
    currentIndex = index;

    cover.src = music.cover;
    musicName.innerText = music.name;
    artistName.innerText = music.artist;

    audio.src = music.file;
    audio.play();

    updatePlayIcon();
}

// PLAY/PAUSE
function togglePlay() {
    if (!audio.src) return;

    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }

    updatePlayIcon();
}

// MUDA ICONE
function updatePlayIcon() {
    playBtn.innerHTML = audio.paused
        ? '<i class="fa-solid fa-play"></i>'
        : '<i class="fa-solid fa-pause"></i>';
}

// NEXT
function nextMusic() {
    currentIndex++;
    if (currentIndex >= musicList.length) currentIndex = 0;
    playMusic(currentIndex);
}

// PREV
function prevMusic() {
    currentIndex--;
    if (currentIndex < 0) currentIndex = musicList.length - 1;
    playMusic(currentIndex);
}

// PROGRESS
audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;

    progress.value = (audio.currentTime / audio.duration) * 100;

    currentTimeEl.innerText = formatTime(audio.currentTime);
    durationEl.innerText = formatTime(audio.duration);
});

// MUDAR POSIÇÃO
progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

// VOLUME
volumeControl.addEventListener("input", () => {
    audio.volume = volumeControl.value;
});

// TEMPO
function formatTime(time) {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
}