//variables del DOM
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

//creo mis variables
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

//mis imagenes
const allIcons = [
    'img/feliz.png',
    'img/gatito.png',
    'img/gato.png'
];

function createIcon() {
    if (!gameActive || gamePaused) return; //es si el juego no está activo o está pausado

    const icon = document.createElement('div'); //se crea un div
    icon.classList.add('icon'); //clase

    let isBadCat = Math.random() < catProbability;
    let iconSrc = isBadCat ? 'img/gato.png' : allIcons[Math.floor(Math.random() * 2)];
    icon.style.backgroundImage = `url(${iconSrc})`;

    let maxWidth = window.innerWidth - 120;
    let maxHeight = window.innerHeight - 250; // Ajustado para evitar que salgan fuera de la pantalla
    //se le asignan posiciones aa los elementos, o a los gatitos
    icon.style.left = `${60 + Math.random() * maxWidth}px`;//eje x
    icon.style.top = `${120 + Math.random() * maxHeight}px`;//asignación eje y

    iconContainer.appendChild(icon);
    iconsOnScreen.push({ element: icon, isBadCat });

    //contador aumenta si no es gato pierdepuntos
    if (!isBadCat) {
        iconCount++;
    }

    //límite para perder,
    //si hay más de 10 gatos buenos en pantalla, se pierde
    let goodCatsOnScreen = iconsOnScreen.filter(i => !i.isBadCat).length;
    if (goodCatsOnScreen > 10) {
        gameOver();
        return;
    }

    //cuando se hace click
    icon.addEventListener('click', () => {
        if (isBadCat) {
            //penalización por clic en gato pierdepuntos
            badCatClicks++;
            score -= 10; //disminuye 10 puntos
            lives--; //disminuye una vida
            livesText.textContent = lives;
            if (badCatClicks >= 3 || lives <= 0) { //click a 3 gatos malos o vidas igual a 0, es perder
                gameOver(); //función de Game Over
                return;
            }
        } else {
            // Recompensa por clic en gato bueno
            score += 15; //15 puntos de aumento
        }

        icon.remove();
        iconsOnScreen = iconsOnScreen.filter(i => i.element !== icon);
        if (!isBadCat) {
            iconCount--;
        }

        scoreText.textContent = score;
        if (soundToggle.checked) clickSound.play();

        //si los puntos son modulares de 100 a 0, se aumenta la dificultad por defecto
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

//se inicia el juego
function startGame() {
    //se esconde lo innecese¿ario
    startMenu.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    gameOverMenu.classList.add('hidden');
    pauseMenu.classList.add('hidden');

    //se reinician las variables globales
    gameActive = true;
    gamePaused = false;
    iconCount = 0;
    badCatClicks = 0;
    score = 0;
    level = 1;
    lives = 3;
    iconContainer.innerHTML = ''; //se pone la pantalla en blanco, se limpia
    iconsOnScreen = []; //es un contenedor para los objetos en pantalla, o los gatos

    //parámetros de dificultad
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

//funcion de aumento de dificultad
function increaseDifficulty() {
    level++;
    levelText.textContent = level;

    spawnSpeed = Math.max(100, spawnSpeed - 50);
    maxIcons += 3;
    catProbability = Math.min(0.6, catProbability + 0.1);

    clearInterval(iconInterval);
    iconInterval = setInterval(createIcon, spawnSpeed);
}

//se manda a llamar la pausa si se presiona el boton
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

//aqui estan loss botones 
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
