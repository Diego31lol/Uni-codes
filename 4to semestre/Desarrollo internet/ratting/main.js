let cajaPrincipal = document.getElementById("rating");
let calificacionFija = 0;

for (let i = 1; i <= 10; i++) {
    let imagen = document.createElement("img");
    imagen.src = "ima1.png";
    cajaPrincipal.appendChild(imagen);
    imagen.classList.add("item");
    imagen.setAttribute("pos", i);
    imagen.id = "item-" + i;

    imagen.addEventListener("mouseover", function () {
        let posicion = parseInt(this.getAttribute("pos"));
        for (let j = 1; j <= posicion; j++) {
            document.getElementById("item-" + j).src = "ima2.png";
        }
    });

    imagen.addEventListener("mouseover", function () {
        calificacionFija = parseInt(this.getAttribute("pos"));
    });

    imagen.addEventListener("mouseout", function () {
        for (let j = 1; j <= 10; j++) {
            if (j <= calificacionFija) {
                document.getElementById("item-" + j).src = "ima2.png";
            } else {
                document.getElementById("item-" + j).src = "ima1.png";
            }
        }
    });
}
