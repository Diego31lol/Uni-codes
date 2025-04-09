<<<<<<< HEAD
//variables del DOM
const startMenu = document.getElementById('start-menu');
const optionsMenu = document.getElementById('options-menu');
const gameContainer = document.getElementById('game-container');
const pauseMenu = document.getElementById('pause-menu');
const gameOverMenu = document.getElementById('game-over-menu');
const iconContainer = document.getElementById('icon-container');
=======
// elementos del menu y del juego
const menuInicio = document.getElementById('start-menu');
const menuOpciones = document.getElementById('options-menu');
const contenedorJuego = document.getElementById('game-container');
const menuPausa = document.getElementById('pause-menu');
const menuJuegoTerminado = document.getElementById('game-over-menu');
const contenedorIconos = document.getElementById('icon-container');
>>>>>>> 17d6ab7f34660e248ec240c132dbae56acd6a1c4

// botones del menu y controles del juego
const botonInicio = document.getElementById('start-btn');
const botonOpciones = document.getElementById('options-btn');
const botonVolverMenu = document.getElementById('back-to-menu');
const botonReanudar = document.getElementById('resume-btn');
const botonVolverMenuPrincipal = document.getElementById('back-to-main');
const botonMenuPrincipal = document.getElementById('main-menu-btn');
const botonPausa = document.getElementById('pause-btn');
const botonReiniciar = document.getElementById('restart-btn');

// elementos de informacion en pantalla
const textoPuntaje = document.getElementById('score');
const textoNivel = document.getElementById('level');
const textoVidas = document.getElementById('lives');
const sonidoClic = document.getElementById('click-sound');
const toggleSonido = document.getElementById('sound-toggle');
const seleccionDificultad = document.getElementById('difficulty-select');

<<<<<<< HEAD
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

// variables del juego
let puntaje = 0;
let nivel = 1;
let vidas = 3;
let juegoActivo = false;
let juegoPausado = false;
let cantidadIconos = 0;
let maximoIconos = 10;
let velocidadAparicion = 400;
let probabilidadGato = 0.2;
let iconosEnPantalla = [];
let clicsGatosMalos = 0;
let intervaloIconos;

// imagenes de iconos del juego
const todosLosIconos = [
>>>>>>> 17d6ab7f34660e248ec240c132dbae56acd6a1c4
    'img/feliz.png',
    'img/gatito.png',
    'img/gato.png'
];

<<<<<<< HEAD
function createIcon() {
    if (!gameActive || gamePaused) return; //es si el juego no está activo o está pausado

    const icon = document.createElement('div'); //se crea un div
    icon.classList.add('icon'); //clase
=======
// funcion para crear un nuevo icono en pantalla
function crearIcono() {
    if (!juegoActivo || juegoPausado) return;

    const icono = document.createElement('div');
    icono.classList.add('icon');
>>>>>>> 17d6ab7f34660e248ec240c132dbae56acd6a1c4

    let esGatoMalo = Math.random() < probabilidadGato;
    let iconoSrc = esGatoMalo ? 'img/gato.png' : todosLosIconos[Math.floor(Math.random() * 2)];
    icono.style.backgroundImage = `url(${iconoSrc})`;

<<<<<<< HEAD
    let maxWidth = window.innerWidth - 120;
    let maxHeight = window.innerHeight - 250; // Ajustado para evitar que salgan fuera de la pantalla
    //se le asignan posiciones aa los elementos, o a los gatitos
    icon.style.left = `${60 + Math.random() * maxWidth}px`;//eje x
    icon.style.top = `${120 + Math.random() * maxHeight}px`;//asignación eje y
=======
    // posicion aleatoria en la pantalla
    let maxAncho = window.innerWidth - 120;
    let maxAlto = window.innerHeight - 250;
    icono.style.left = `${60 + Math.random() * maxAncho}px`;
    icono.style.top = `${120 + Math.random() * maxAlto}px`;
>>>>>>> 17d6ab7f34660e248ec240c132dbae56acd6a1c4

    contenedorIconos.appendChild(icono);
    iconosEnPantalla.push({ element: icono, esGatoMalo });

<<<<<<< HEAD
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
=======
    if (!esGatoMalo) {
        cantidadIconos++;
    }

    // si hay mas de 10 gatos buenos en pantalla, se pierde
    let gatosBuenosEnPantalla = iconosEnPantalla.filter(i => !i.esGatoMalo).length;
    if (gatosBuenosEnPantalla > 10) {
        finDelJuego();
        return;
    }

    // evento de clic en icono
    icono.addEventListener('click', () => {
        if (esGatoMalo) {
            clicsGatosMalos++;
            puntaje -= 10;
            vidas--;
            textoVidas.textContent = vidas;
            if (clicsGatosMalos >= 3 || vidas <= 0) {
                finDelJuego();
                return;
            }
        } else {
            puntaje += 15;
>>>>>>> 17d6ab7f34660e248ec240c132dbae56acd6a1c4
        }

        icono.remove();
        iconosEnPantalla = iconosEnPantalla.filter(i => i.element !== icono);
        if (!esGatoMalo) {
            cantidadIconos--;
        }

        textoPuntaje.textContent = puntaje;
        if (toggleSonido.checked) sonidoClic.play();

<<<<<<< HEAD
        //si los puntos son modulares de 100 a 0, se aumenta la dificultad por defecto
        if (score % 100 === 0 && score > 0) {
            increaseDifficulty();
=======
        if (puntaje % 100 === 0 && puntaje > 0) {
            aumentarDificultad();
>>>>>>> 17d6ab7f34660e248ec240c132dbae56acd6a1c4
        }
    });

    // los gatos malos desaparecen en 5 segundos si no se clickean
    if (esGatoMalo) {
        setTimeout(() => {
            if (icono.parentNode && !juegoPausado) {
                icono.remove();
                iconosEnPantalla = iconosEnPantalla.filter(i => i.element !== icono);
            }
        }, 5000);
    }
}

<<<<<<< HEAD
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
=======
// funcion para iniciar el juego
function comenzarJuego() {
    menuInicio.classList.add('hidden');
    contenedorJuego.classList.remove('hidden');
    menuJuegoTerminado.classList.add('hidden');
    menuPausa.classList.add('hidden');
    juegoActivo = true;
    juegoPausado = false;
    cantidadIconos = 0;
    clicsGatosMalos = 0;
    puntaje = 0;
    nivel = 1;
    vidas = 3;
    contenedorIconos.innerHTML = '';
    iconosEnPantalla = [];

    // ajustar dificultad segun la seleccion
    let dificultad = seleccionDificultad.value;
    if (dificultad === 'easy') {
        maximoIconos = 5;
        velocidadAparicion = 700;
        probabilidadGato = 0.1;
    } else if (dificultad === 'medium') {
        maximoIconos = 8;
        velocidadAparicion = 500;
        probabilidadGato = 0.15;
>>>>>>> 17d6ab7f34660e248ec240c132dbae56acd6a1c4
    } else {
        maximoIconos = 10;
        velocidadAparicion = 400;
        probabilidadGato = 0.2;
    }

    textoPuntaje.textContent = puntaje;
    textoNivel.textContent = nivel;
    textoVidas.textContent = vidas;

    clearInterval(intervaloIconos);
    intervaloIconos = setInterval(crearIcono, velocidadAparicion);
}

<<<<<<< HEAD
//funcion de aumento de dificultad
function increaseDifficulty() {
    level++;
    levelText.textContent = level;
=======
// funcion para aumentar la dificultad con el tiempo
function aumentarDificultad() {
    nivel++;
    textoNivel.textContent = nivel;
>>>>>>> 17d6ab7f34660e248ec240c132dbae56acd6a1c4

    velocidadAparicion = Math.max(100, velocidadAparicion - 50);
    maximoIconos += 3;
    probabilidadGato = Math.min(0.6, probabilidadGato + 0.1);

    clearInterval(intervaloIconos);
    intervaloIconos = setInterval(crearIcono, velocidadAparicion);
}

<<<<<<< HEAD
//se manda a llamar la pausa si se presiona el boton
function pauseGame() {
    gamePaused = true;
    pauseMenu.classList.remove('hidden');
    clearInterval(iconInterval);
=======
// funcion para pausar el juego
function pausarJuego() {
    juegoPausado = true;
    menuPausa.classList.remove('hidden');
    clearInterval(intervaloIconos);
>>>>>>> 17d6ab7f34660e248ec240c132dbae56acd6a1c4
}

// funcion para reanudar el juego
function reanudarJuego() {
    juegoPausado = false;
    menuPausa.classList.add('hidden');
    intervaloIconos = setInterval(crearIcono, velocidadAparicion);
}

// funcion para volver al menu principal
function volverAlMenuPrincipal() {
    juegoActivo = false;
    juegoPausado = false;
    clearInterval(intervaloIconos);
    contenedorJuego.classList.add('hidden');
    menuPausa.classList.add('hidden');
    menuInicio.classList.remove('hidden');
}

// funcion para terminar el juego cuando se pierde
function finDelJuego() {
    juegoActivo = false;
    menuJuegoTerminado.classList.remove('hidden');
    clearInterval(intervaloIconos);
}

<<<<<<< HEAD
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
=======
// eventos de los botones
botonInicio.addEventListener('click', comenzarJuego);
botonPausa.addEventListener('click', pausarJuego);
botonReanudar.addEventListener('click', reanudarJuego);
botonReiniciar.addEventListener('click', comenzarJuego);
botonMenuPrincipal.addEventListener('click', volverAlMenuPrincipal);
botonVolverMenuPrincipal.addEventListener('click', volverAlMenuPrincipal);
botonOpciones.addEventListener('click', () => {
    menuInicio.classList.add('hidden');
    menuOpciones.classList.remove('hidden');
>>>>>>> 17d6ab7f34660e248ec240c132dbae56acd6a1c4
});
botonVolverMenu.addEventListener('click', () => {
    menuOpciones.classList.add('hidden');
    menuInicio.classList.remove('hidden');
});
