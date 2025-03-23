const startMenu = document.getElementById('start-menu');
const optionsMenu = document.getElementById('options-menu');
const gameContainer = document.getElementById('game-container');
const pauseMenu = document.getElementById('pause-menu');
const gameOverMenu = document.getElementById('game-over-menu');
const iconContainer = document.getElementById('icon-container');

const startBtn = document.getElementById('start-btn');
const optionsBtn = document.getElementById('options-btn');
const backToMenuBtn = document.getElementById('back-to-menu');
const resumeBtn = document.getElementById('resume-btn');
const backToMainBtn = document.getElementById('back-to-main');
const mainMenuBtn = document.getElementById('main-menu-btn');
const pauseBtn = document.getElementById('pause-btn');
const restartButton = document.getElementById('restart-btn');

const scoreText = document.getElementById('score');
const levelText = document.getElementById('level');
const livesText = document.getElementById('lives');
const clickSound = document.getElementById('click-sound');
const soundToggle = document.getElementById('sound-toggle');
const difficultySelect = document.getElementById('difficulty-select');

let score = 0;
let level = 1;
let lives = 3;
let gameActive = false;
let gamePaused = false;
let iconCount = 0;
let maxIcons = 10;
let spawnSpeed = 400;
let catProbability = 0.2;
let iconsOnScreen = [];
let badCatClicks = 0;
let iconInterval;

const allIcons = [
    'img/feliz.png',
    'img/gatito.png',
    'img/gato.png'
];

function createIcon() {
    if (!gameActive || gamePaused) return;

    const icon = document.createElement('div');
    icon.classList.add('icon');

    let isBadCat = Math.random() < catProbability;
    let iconSrc = isBadCat ? 'img/gato.png' : allIcons[Math.floor(Math.random() * 2)];
    icon.style.backgroundImage = `url(${iconSrc})`;

    let maxWidth = window.innerWidth - 120;
    let maxHeight = window.innerHeight - 250; // Ajustado para evitar que salgan fuera de la pantalla
    icon.style.left = `${60 + Math.random() * maxWidth}px`;
    icon.style.top = `${120 + Math.random() * maxHeight}px`;

    iconContainer.appendChild(icon);
    iconsOnScreen.push({ element: icon, isBadCat });

    if (!isBadCat) {
        iconCount++;
    }

    // Si hay más de 10 gatos buenos en pantalla, se pierde
    let goodCatsOnScreen = iconsOnScreen.filter(i => !i.isBadCat).length;
    if (goodCatsOnScreen > 10) {
        gameOver();
        return;
    }

    icon.addEventListener('click', () => {
        if (isBadCat) {
            // Penalización por clic en gato malo
            badCatClicks++;
            score -= 10;
            lives--;
            livesText.textContent = lives;
            if (badCatClicks >= 3 || lives <= 0) {
                gameOver();
                return;
            }
        } else {
            // Recompensa por clic en gato bueno
            score += 15;
        }

        icon.remove();
        iconsOnScreen = iconsOnScreen.filter(i => i.element !== icon);
        if (!isBadCat) {
            iconCount--;
        }

        scoreText.textContent = score;
        if (soundToggle.checked) clickSound.play();

        if (score % 100 === 0 && score > 0) {
            increaseDifficulty();
        }
    });

    // Los gatos malos desaparecen en 5 segundos si no se clickean
    if (isBadCat) {
        setTimeout(() => {
            if (icon.parentNode && !gamePaused) {
                icon.remove();
                iconsOnScreen = iconsOnScreen.filter(i => i.element !== icon);
            }
        }, 5000);
    }
}

function startGame() {
    startMenu.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    gameOverMenu.classList.add('hidden');
    pauseMenu.classList.add('hidden');
    gameActive = true;
    gamePaused = false;
    iconCount = 0;
    badCatClicks = 0;
    score = 0;
    level = 1;
    lives = 3;
    iconContainer.innerHTML = '';
    iconsOnScreen = [];

    let difficulty = difficultySelect.value;
    if (difficulty === 'easy') {
        maxIcons = 5;
        spawnSpeed = 700;
        catProbability = 0.1;
    } else if (difficulty === 'medium') {
        maxIcons = 8;
        spawnSpeed = 500;
        catProbability = 0.15;
    } else {
        maxIcons = 10;
        spawnSpeed = 400;
        catProbability = 0.2;
    }

    scoreText.textContent = score;
    levelText.textContent = level;
    livesText.textContent = lives;

    clearInterval(iconInterval);
    iconInterval = setInterval(createIcon, spawnSpeed);
}

function increaseDifficulty() {
    level++;
    levelText.textContent = level;

    spawnSpeed = Math.max(100, spawnSpeed - 50);
    maxIcons += 3;
    catProbability = Math.min(0.6, catProbability + 0.1);

    clearInterval(iconInterval);
    iconInterval = setInterval(createIcon, spawnSpeed);
}

function pauseGame() {
    gamePaused = true;
    pauseMenu.classList.remove('hidden');
    clearInterval(iconInterval);
}

function resumeGame() {
    gamePaused = false;
    pauseMenu.classList.add('hidden');
    iconInterval = setInterval(createIcon, spawnSpeed);
}

function returnToMainMenu() {
    gameActive = false;
    gamePaused = false;
    clearInterval(iconInterval);
    gameContainer.classList.add('hidden');
    pauseMenu.classList.add('hidden');
    startMenu.classList.remove('hidden');
}

function gameOver() {
    gameActive = false;
    gameOverMenu.classList.remove('hidden');
    clearInterval(iconInterval);
}

startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', pauseGame);
resumeBtn.addEventListener('click', resumeGame);
restartButton.addEventListener('click', startGame);
mainMenuBtn.addEventListener('click', returnToMainMenu);
backToMainBtn.addEventListener('click', returnToMainMenu);
optionsBtn.addEventListener('click', () => {
    startMenu.classList.add('hidden');
    optionsMenu.classList.remove('hidden');
});
backToMenuBtn.addEventListener('click', () => {
    optionsMenu.classList.add('hidden');
    startMenu.classList.remove('hidden');
});
