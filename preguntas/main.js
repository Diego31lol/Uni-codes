let preguntas = [];
let indice = 0;
let buttonSelected = null;
datos();

async function datos() {
    try {
        let preguntasjson = await fetch("preguntas.json");
        preguntas = await preguntasjson.json();
        mostrarpregunta();
    } catch (error) {
        console.log(error);
    }
}

function mostrarpregunta() {
    document.getElementById("pregunta").textContent = preguntas[indice].pregunta;
    
    let cajaop = document.getElementById("opciones");
    cajaop.innerHTML = "";
    
    preguntas[indice].opciones.forEach(op => {
        let boton = document.createElement("button");
        boton.textContent = op;
        cajaop.appendChild(boton);
       
        boton.addEventListener("click", obtenerRespuesta);
    });
}

function obtenerRespuesta(event) {
   
    buttonSelected = event.target;
}

document.getElementById("siguiente").addEventListener("click", siguientePregunta);

function siguientePregunta() {
    if (indice < preguntas.length - 1) {
        indice++;
        mostrarpregunta();
    } else {
        indice = 0;
        mostrarpregunta();
    }
}

document.getElementById("opciones").addEventListener("click", checkRespuesta);

function checkRespuesta() {
    let seleccion = buttonSelected.textContent;
    let correcta = preguntas[indice].respuesta; 
    
    if (seleccion === correcta) {
        document.getElementById("resultado").textContent = "¡Correcto!";
    } else {
        document.getElementById("resultado").textContent = "Incorrecto. La respuesta correcta es: " + correcta;
    }
}
