// elementos del menu y del juego
const menuInicio = document.getElementById('start-menu');
const menuOpciones = document.getElementById('options-menu');
const contenedorJuego = document.getElementById('game-container');
const menuPausa = document.getElementById('pause-menu');
const menuJuegoTerminado = document.getElementById('game-over-menu');
const contenedorIconos = document.getElementById('icon-container');

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
    'img/feliz.png',
    'img/gatito.png',
    'img/gato.png'
];

// funcion para crear un nuevo icono en pantalla
function crearIcono() {
    if (!juegoActivo || juegoPausado) return;

    const icono = document.createElement('div');
    icono.classList.add('icon');

    let esGatoMalo = Math.random() < probabilidadGato;
    let iconoSrc = esGatoMalo ? 'img/gato.png' : todosLosIconos[Math.floor(Math.random() * 2)];
    icono.style.backgroundImage = `url(${iconoSrc})`;

    // posicion aleatoria en la pantalla
    let maxAncho = window.innerWidth - 120;
    let maxAlto = window.innerHeight - 250;
    icono.style.left = `${60 + Math.random() * maxAncho}px`;
    icono.style.top = `${120 + Math.random() * maxAlto}px`;

    contenedorIconos.appendChild(icono);
    iconosEnPantalla.push({ element: icono, esGatoMalo });

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
        }

        icono.remove();
        iconosEnPantalla = iconosEnPantalla.filter(i => i.element !== icono);
        if (!esGatoMalo) {
            cantidadIconos--;
        }

        textoPuntaje.textContent = puntaje;
        if (toggleSonido.checked) sonidoClic.play();

        if (puntaje % 100 === 0 && puntaje > 0) {
            aumentarDificultad();
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

// funcion para aumentar la dificultad con el tiempo
function aumentarDificultad() {
    nivel++;
    textoNivel.textContent = nivel;

    velocidadAparicion = Math.max(100, velocidadAparicion - 50);
    maximoIconos += 3;
    probabilidadGato = Math.min(0.6, probabilidadGato + 0.1);

    clearInterval(intervaloIconos);
    intervaloIconos = setInterval(crearIcono, velocidadAparicion);
}

// funcion para pausar el juego
function pausarJuego() {
    juegoPausado = true;
    menuPausa.classList.remove('hidden');
    clearInterval(intervaloIconos);
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
});
botonVolverMenu.addEventListener('click', () => {
    menuOpciones.classList.add('hidden');
    menuInicio.classList.remove('hidden');
});
