class Nodo{
    constructor(_usuario){
        this.id = 0
        this.usuario = _usuario;
        this.siguiente = null;
        this.abajo = null;
    }
}
class Nodo2{
    constructor(libro){
        this.id = 0
        this.libro = libro;
        this.siguiente = null;
    }
}

class ListaUsuarios{
    constructor(crear){
        
        this.cabeza = null

    }

    addUsuario(usuario){
        var tempo = new Nodo(usuario);
        tempo.siguiente = this.cabeza;

        if (this.cabeza!=null) {
            tempo.id = (this.cabeza.id+1);
        }

        this.cabeza = tempo;
    }
    addLibro(usuario, libro){
        var tempoUsuario = this.cabeza

        while(tempoUsuario != null){

            if(tempoUsuario.usuario.nombre_usuario == usuario){

                var nuevoNodoLibro = new Nodo2(libro)
                
                nuevoNodoLibro.siguiente = tempoUsuario.abajo
                if (tempoUsuario.abajo != null) {
                    nuevoNodoLibro.id = (tempoUsuario.abajo.id+1)
                }
                tempoUsuario.abajo = nuevoNodoLibro
                break
            }
            tempoUsuario= tempoUsuario.siguiente
        }
        if(tempoUsuario == null){
            console.log("No se encontro el usuario " + usuario+ " en la lista ")
        }

    }

    graficar(){
        var codigoDot = `digraph G {\n label = "Usuarios"\n node [shape=box]; rankdir=LR; \n e0[ shape = point, width = 0 ];\ne1[ shape = point, width = 0 ];`;

        var etiquetas = `\n`;
        var ranks = `\n`;
        var conexiones = `\n`;
        var temporalUsuario = this.cabeza;
        var temporalLibro = null;

        while (temporalUsuario != null) {
            etiquetas += `U`+temporalUsuario.id + ` [label = "`+temporalUsuario.usuario.nombre_usuario+`" ];\n//hijos de `+ temporalUsuario.usuario.nombre_usuario+`\n`;

            var rankUsuario = `{ rank = same; U`+temporalUsuario.id + `; `;

            if (temporalUsuario.siguiente != null) {
                conexiones += `U`+temporalUsuario.id + ` -> U` + temporalUsuario.siguiente.id + `;\n`
                
                temporalLibro = temporalUsuario.abajo;

                while (temporalLibro != null) {

                    etiquetas += `U`+temporalUsuario.id+`L`+temporalLibro.id + ` [label = "`+temporalLibro.libro+`" ];\n`;
                    rankUsuario += `U`+temporalUsuario.id+`L`+temporalLibro.id+`; `;

                    if (temporalLibro.siguiente != null) {
                        
                        conexiones += `U`+temporalUsuario.id+`L`+temporalLibro.id +` -> U`+temporalUsuario.id+`L`+temporalLibro.siguiente.id +`;\n`

                    } else {
                        rankUsuario += `nullU`+temporalUsuario.id+ `LS`+temporalLibro.id+`; `;
                        etiquetas += `nullU`+temporalUsuario.id+ `LS`+temporalLibro.id+ `[label = "null" , shape= none];\n`;
                        conexiones += `U`+temporalUsuario.id+`L`+temporalLibro.id +` -> nullU`+temporalUsuario.id+ `LS`+temporalLibro.id+ `;\n`
                    }

                    

                    temporalLibro = temporalLibro.siguiente;

                }




            } else {
                etiquetas += `nullUS`+temporalUsuario.id + `[label = "null" , shape= none];\n`;
                conexiones += `U`+temporalUsuario.id + ` -> nullUS`+temporalUsuario.id+ `;\n`



                
            }

            if (temporalUsuario.abajo != null) {
                conexiones += `U`+temporalUsuario.id +` -> U`+temporalUsuario.id+`L`+temporalUsuario.abajo.id +`;\n`


            } else {
                etiquetas += `nullUA`+temporalUsuario.id + `[label = "null" , shape= none];\n`;
                conexiones += `U`+temporalUsuario.id + ` -> nullUA`+temporalUsuario.id+ `;\n`
                rankUsuario += `nullUA`+temporalUsuario.id+`; `
            }
            
            ranks += rankUsuario + `}\n`;

            temporalUsuario = temporalUsuario.siguiente;
        }

        codigoDot += etiquetas + conexiones + ranks+"}"
        console.log(codigoDot);
        d3.select("#lista")
        .graphviz()
          .height(400)
          .width(1000)
          .dot(codigoDot)
          .render();

    }
    

    mostrarListaUsuarios(){
        var temporal = this.cabeza;
        while (temporal != null){
            console.log(temporal.usuario);
            temporal = temporal.siguiente;
        }
    }

    mostrarListaLibros(_nombreUsuario){
        var temporal = this.cabeza;
        while (temporal != null){
            if(temporal.usuario.nombre_usuario == _nombreUsuario){       
                var tempoLibro = temporal.abajo;
                while(tempoLibro != null){
                    console.log(tempoLibro.libro);
                    tempoLibro = tempoLibro.siguiente;
                }
                return;
            }
            temporal = temporal.siguiente;
        }
        if(temporal == null){
            console.log("No se pudo encontrar el usuario solicitado: "+_nombreUsuario)
        }
    }


}



var listaUsuario = new ListaUsuarios();
listaUsuario.addUsuario({
    "dpi":2354168452525, 
    "nombre_completo": "WIlfred Perez", 
    "nombre_usuario": "Wilfred",
    "correo":"",
    "rol":  "Administrador",
    "contrasenia": "123",
    "telefono": "+502 (123) 123-4567"});

listaUsuario.addUsuario({
    "dpi": 3884144641925, 
    "nombre_completo": "William Leon",
    "nombre_usuario": "Rhonda", 
    "correo": "rhondaleon@bitrex.com",
    "rol": "Usuario", 
    "contrasenia": "veniam",
    "telefono": "+502 (841) 537-2727" 
});
listaUsuario.addUsuario({
    "dpi": 5158445914766, 
    "nombre_completo": "Clarice Baird",
    "nombre_usuario": "Booker",
    "correo": "bookerbaird@bitrex.com",
    "rol": "Administrador",
    "contrasenia": "labore",
    "telefono": "+5112 (871) 424-3154" 
})
listaUsuario.addUsuario({
    "dpi": 4209796138857, 
    "nombre_completo": "Hawkins Graves",
    "nombre_usuario": "Stokes", 
    "correo": "mstokesgravesphitrex.com", 
    "rol": "Usuario", 
    "contrasenia": "toreo", 
    "telefono": "+502 (935) 532-2941" 
})

listaUsuario.addLibro("Stokes", "Zounds");
listaUsuario.addLibro("Stokes", "Zounds1");
listaUsuario.addLibro("Stokes", "Zounds2");
listaUsuario.addLibro("Booker", "Zounds3");
listaUsuario.addLibro("Booker", "Zounds4");


listaUsuario.mostrarListaUsuarios();
listaUsuario.graficar();
console.log(listaUsuario);





function goIndex() {
    window.location.replace("../");
}



function mostrar(){
    listaUsuario.mostrarListaUsuarios();
}

function goLogin() {
    window.location.replace("login.html");
}

document.getElementById("login").onclick = goLogin;

document.getElementById("cargaMasiva").onclick = cargar;

document.getElementById("mostrar").onclick = mostrar;

/**
 * 
    callback(_listaUsuarios){
        this.cabeza = _listaUsuarios.cabeza;
        this.mostrarListaUsuarios();
    }

    cargaMasivaUsuarios() {
        var lsUser = this
        var tempo;
        fetch('../json/usuarios.json')
        .then(respuesta => respuesta.json())
        .then(usuarios => {
            usuarios.forEach(usuario => {
                tempo = new Nodo(usuario);
                tempo.siguiente = lsUser.cabeza;
                lsUser.cabeza = tempo;

                
            });
            console.log(this);
            this.callback(lsUser);
            localStorage.setItem("lsUsers",JSON.stringify(this));
        });  
        
        postGuardado();
    }

}




function goIndex() {
    window.location.replace("../");
}



function mostrar(){
    listaUsuario.mostrarListaUsuarios();
}



document.getElementById("cargaMasiva").onclick = cargar;

document.getElementById("mostrar").onclick = mostrar;


 * 
 */