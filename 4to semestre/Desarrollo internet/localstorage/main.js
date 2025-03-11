boton=document.getElementById("boton");
crearCajas();
boton.addEventListener("click",function(){
notas=localStorage.getItem("notas");
if (notas==null)
{array=[];

}
else{array=JSON.parse(notas);

}
areatexto=document.getElementById("texto");
array.push(areatexto.value);
localStorage.setItem("notas",JSON.stringify(array));
console.log(array);
crearCajas();
});

function crearCajas(){
    notas=localStorage.getItem("notas");
    if (notas==null)
    {array=[];
    
    }
    else{array=JSON.parse(notas);
    
    }
    codigohtml="";
    array.forEach((element,i) => {
        codigohtml=codigohtml+
    `<div>
    <h1> notas#${i}
    </h1>
    <p>${element}</p>
    <button id=${i}onclick="eliminarBoton(this.id)">ELIMINAR</button>
    </div>`;
    });
cajanotas=document.getElementById("notas");
cajanotas.innerHTML=codigohtml;

function eliminarBoton(id){
    notas=localStorage.getItem("notas");
    if (notas==null)
    {array=[];
    
    }
    else{array=JSON.parse(notas);
    
    }
    array.splice(id,1)
    localStorage.setItem("notas",JSON.stringify(array));
    crearCajas();
}
}
