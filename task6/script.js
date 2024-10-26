const audio = new Audio();
const playPauseButton = document.getElementById('play-pause');
const nextButton = document.getElementById('next');
const coverImage = document.getElementById('cover');
const trackTitle = document.getElementById('track-title');
const trackList = document.getElementById('track-list');

const tracks = [
    { title: 'Баллада - Xcho & Мот', src: 'audio/track1.mp3', cover: 'photo/cover1.jpeg' },
    { title: 'Прекрасна - Colorit', src: 'audio/track2.mp3', cover: 'photo/cover2.jpg' },
    { title: 'IVL - Macan, Sceirena', src: 'audio/track3.mp3', cover: 'photo/cover3.jpeg' }
];

let currentTrackIndex = 0;
let isPlaying = false;

function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
        playPauseButton.textContent = 'Play';
    } else {
        audio.play();
        playPauseButton.textContent = 'Pause';
    }
    isPlaying = !isPlaying;
}

function playNextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    playTrack();
}


function playTrack() {
    audio.src = tracks[currentTrackIndex].src;
    coverImage.src = tracks[currentTrackIndex].cover;
    trackTitle.textContent = tracks[currentTrackIndex].title;
    audio.play();
    playPauseButton.textContent = 'Pause';
    isPlaying = true;
}

playPauseButton.addEventListener('click', togglePlayPause);
nextButton.addEventListener('click', playNextTrack);


trackList.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        currentTrackIndex = parseInt(event.target.dataset.track, 10);
        playTrack();
    }
});

playTrack();
