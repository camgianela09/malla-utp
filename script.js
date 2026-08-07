const cursos = document.querySelectorAll(".curso");


function actualizarProgreso(){

    let aprobados = document.querySelectorAll(".aprobado").length;

    let total = cursos.length;

    let porcentaje = Math.round((aprobados / total) * 100);


    document.getElementById("avance").style.width = porcentaje + "%";

    document.getElementById("porcentaje").innerHTML =
    porcentaje + "% completado";

}



cursos.forEach((curso,index)=>{


let guardado = localStorage.getItem("curso"+index);


if(guardado){

curso.classList.add(guardado);

}



curso.onclick=function(){


this.classList.remove(
"aprobado",
"cursando",
"pendiente"
);



let estado = this.dataset.estado;


if(estado==="aprobado"){

this.dataset.estado="cursando";

}

else if(estado==="cursando"){

this.dataset.estado="pendiente";

}

else{

this.dataset.estado="aprobado";

}



this.classList.add(this.dataset.estado);


localStorage.setItem(
"curso"+index,
this.dataset.estado
);



actualizarProgreso();


}



});



actualizarProgreso();
