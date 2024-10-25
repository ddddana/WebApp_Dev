const notes = {
    C: new Audio('Sounds/C.wav'),
    D: new Audio('Sounds/D.wav'),
    E: new Audio('Sounds/E.wav'),
    F: new Audio('Sounds/F.wav'),
    G: new Audio('Sounds/G.wav'),
    A: new Audio('Sounds/A.wav'),
    B: new Audio('Sounds/B.wav')
};

function playNote(note) {
    const audio = notes[note];
    if (audio) {
        audio.currentTime = 0; 
        audio.play();
    }
}


document.querySelectorAll('.key').forEach(key => {
    key.addEventListener('click', () => {
        const note = key.dataset.note;
        playNote(note);
        key.classList.add('active');
        setTimeout(() => key.classList.remove('active'), 100);
    });
});


document.addEventListener('keydown', (event) => {
    const key = event.key.toUpperCase();
    if (notes[key]) {
        playNote(key);
        const element = document.getElementById(key);
        element.classList.add('active');
        setTimeout(() => element.classList.remove('active'), 100);
    }
});
