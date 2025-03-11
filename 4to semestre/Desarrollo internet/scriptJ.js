// Escucha cuando el contenido del DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    // Obtiene el botón "entrar", la capa de portada (cover) y el contenedor principal
    const enterButton = document.getElementById("enter-button");
    const portada = document.querySelector(".portada");
    const container = document.querySelector(".container");

    // Añade un evento de clic al botón "entrar"
    enterButton.addEventListener("click", () => {
        // Cuando el usuario hace clic en "entrar", la opacidad de la portada disminuye
        cover.style.opacity = "0";
        
        // Después de 600 ms, la portada desaparece y se muestra el contenido
        setTimeout(() => {
            cover.style.display = "none"; // Oculta la portada
            container.classList.remove("hidden"); // Muestra el contenido
        }, 600);
    });

    // Añade un evento de clic a cada ítem de menú dentro de la lista de navegación
    document.querySelectorAll("#menu-list .menu-item").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); // Previene el comportamiento predeterminado del enlace (navegación)
            
            // Obtiene la URL desde el atributo 'data-url' del enlace
            const url = link.getAttribute("data-url");
            
            // Si existe una URL, navega a ella
            if (url) {
                window.location.href = url; // Redirige a la nueva URL
            }
        });
    });
});

// Función para cargar una nueva página en el iframe
function cargarPagina(url) {
    document.getElementById('visor').src = url; // Cambia el atributo 'src' del iframe para cargar la nueva página
}

// Función para recargar el contenido del iframe
function recargarIframe() {
    let iframe = document.getElementById('visor');
    iframe.src = iframe.src; // Recarga la página actual en el iframe reasignando el 'src'
}
