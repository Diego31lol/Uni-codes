// Agregar película
let boton = document.getElementById("boton");
boton.addEventListener("click", function () {
    let title = document.getElementById("movieTitle").value;
    let genre = document.getElementById("movieGenre").value;
    let year = document.getElementById("movieYear").value;
    let rating = document.getElementById("movieRating").value;

    if (title === "" || genre === "" || year === "" || rating === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    let movies = localStorage.getItem("movies");
    let moviesArray = movies ? JSON.parse(movies) : [];

    moviesArray.push({ title, genre, year, rating });
    localStorage.setItem("movies", JSON.stringify(moviesArray));

    // Limpiar campos
    document.getElementById("movieTitle").value = "";
    document.getElementById("movieGenre").value = "";
    document.getElementById("movieYear").value = "";
    document.getElementById("movieRating").value = "";

    alert("Película agregada correctamente");
});

// Buscar película
let botonBuscar = document.getElementById("botonBuscar");
botonBuscar.addEventListener("click", function () {
    let nombrePeli = document.getElementById("IntBuscador").value.toLowerCase();
    let movies = localStorage.getItem("movies");
    let moviesArray = movies ? JSON.parse(movies) : [];

    let resultados = moviesArray.filter(peli =>
        peli.title.toLowerCase().includes(nombrePeli)
    );

    // Mostrar resultados
    let contenedorExistente = document.getElementById("resultados");
    if (contenedorExistente) contenedorExistente.remove();

    let container = document.querySelector(".container");
    let resultadosDiv = document.createElement("div");
    resultadosDiv.id = "resultados";
    resultadosDiv.classList.add("movies-container");

    if (resultados.length === 0) {
        resultadosDiv.innerHTML = "<p>No se encontraron coincidencias.</p>";
    } else {
        resultados.forEach(peli => {
            let peliDiv = document.createElement("div");
            peliDiv.classList.add("movie");
            peliDiv.innerHTML = `
                <h3>${peli.title}</h3>
                <p><strong>Género:</strong> ${peli.genre}</p>
                <p><strong>Año:</strong> ${peli.year}</p>
                <p><strong>Calificación:</strong> ${peli.rating}</p>
            `;
            resultadosDiv.appendChild(peliDiv);
        });
    }

    container.appendChild(resultadosDiv);
});
