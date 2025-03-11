document.addEventListener("DOMContentLoaded", () => {
   
    const portada = document.querySelector(".portada");
    const container = document.querySelector(".container");

    enterButton.addEventListener("click", () => {
        portada.style.opacity = "0";
        setTimeout(() => {
            portada.style.display = "none";
            container.classList.remove("hidden");
        }, 600);
    });

    document.querySelectorAll("#menu-list .menu-item").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const url = link.getAttribute("data-url");
            if (url) {
                window.location.href = url;
            }
        });
    });
});
function cargarPagina(url) {
    document.getElementById('visor').src = url;
}

function recargarIframe() {
    let iframe = document.getElementById('visor');
    iframe.src = iframe.src; // Recarga la página actual en el iframe
}
