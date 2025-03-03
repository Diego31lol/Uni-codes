cajaPrincipal=document.getElementById("rating")


for (let i=1; i<=10;i++){
    imagen=document.createElement("img");
    imagen.scr="huella.png";
    cajaPrincipal.appendChild(imagen);
    imagen.classList.add("item");
    imagen.setAttribute("pos",i);
    imagen.id="item-"+i;

}
