let jumpSound, scoreSound, levelSound, losingSound, gameOverSound;
let soundPlayed = false;

function preload() {
    soundFormats('mp3', 'wav');
    //sounds
    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(0.1);
    scoreSound = loadSound('assets/score.wav');
    scoreSound.setVolume(0.1);
    levelSound = loadSound('assets/completion-of-a-level.wav');
    levelSound.setVolume(0.1);
    losingSound = loadSound('assets/player-losing.wav');
    losingSound.setVolume(0.1);
    gameOverSound = loadSound('assets/game-over.wav');
    gameOverSound.setVolume(0.1);
}