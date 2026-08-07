const cursos = document.querySelectorAll(".curso");


cursos.forEach(curso=>{

curso.onclick=function(){

this.classList.toggle("seleccionado");

}

});
