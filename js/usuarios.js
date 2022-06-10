

class Nodo{
    constructor(_usuario){
        this.usuario = _usuario;
        this.siguiente = null;
    }
}




class ListaUsuarios{
    constructor(crear){
        if (crear) {
            this.crear();
        } else {
            this.cabeza = null
            
        }
    }

    crear(valor){

        this.cabeza = new Nodo( {
            "dpi":2354168452525, 
            "nombre_completo": "WIlfred Perez", 
            "nombre_usuario": "Wilfred",
            "correo":"",
            "rol":  "Administrador",
            "contrasenia": "123",
            "telefono": "+502 (123) 123-4567"});

        localStorage.setItem("lsUsers", JSON.stringify(this));
        this.graficar();
    }
    add(usuario){
        var tempo = new Nodo(usuario);
        tempo.siguiente = this.cabeza;
        this.cabeza = tempo;
    }

    graficar(){
        var temporal = this.cabeza;
        var conexiones = "";
        console.log(this.cabeza);
        

        do {
            if (temporal.siguiente == null) {
                conexiones += temporal.usuario.nombre_usuario +" -> " + "null"+ ";\n"
            }else{
    
                console.log(temporal.usuario);
                console.log(temporal.siguiente.usuario);
                conexiones += temporal.siguiente.usuario.nombre_usuario + " -> " + temporal.usuario.nombre_usuario + ";\n"
                temporal =  temporal.siguiente;
            }
        } while((temporal.siguiente!=null)) 
        
        var codigoDot = "digraph G {\nlabel = \"Usuarios\" \nnode [shape=box]; rankdir=LR; \n " + conexiones +"}"
        console.log("\n");
        console.log("Codigo Dot Generado: \n"+codigoDot);
        d3.select("#lista")
        .graphviz()
          .height(500)
          .width(2000)
          .dot(codigoDot)
          .render();

    }
    mostrarListaUsuarios(){
        var temporal = this.cabeza;

        while (temporal!=null) {
            console.log(temporal);
            temporal = temporal.siguiente;
        }
    }

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


var listaUsuario = cargarLocal();


function postGuardado() {
     listaUsuario = cargarLocal();
     listaUsuario.graficar();
}

function cargarLocal() {
    var lsUser = new ListaUsuarios(false);
    var ls = JSON.parse(localStorage.getItem("lsUsers"));

    if (ls == null) 
        return  new ListaUsuarios( true);
    else{  
            
        var temporal = ls.cabeza;
        while (temporal!=null) {
            lsUser.add(temporal.usuario)
            temporal = temporal.siguiente;
        }
        lsUser.graficar();
        return lsUser;
    }
    

}

function cargar(){
    listaUsuario.cargaMasivaUsuarios()
}



function goIndex() {
    window.location.replace("../");
}



function mostrar(){
    listaUsuario.mostrarListaUsuarios();
}



document.getElementById("cargaMasiva").onclick = cargar;

document.getElementById("mostrar").onclick = mostrar;