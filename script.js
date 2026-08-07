const cursos = document.querySelectorAll(".curso");


// Recuperar cursos guardados
cursos.forEach((curso, index) => {

    let estado = localStorage.getItem("curso" + index);

    if(estado){
        curso.classList.add(estado);
    }


    curso.onclick = function(){

        this.classList.remove(
            "aprobado",
            "cursando",
            "pendiente"
        );


        if(!this.dataset.estado){
            this.dataset.estado="aprobado";
        }
        else if(this.dataset.estado==="aprobado"){
            this.dataset.estado="cursando";
        }
        else if(this.dataset.estado==="cursando"){
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

    }

});
