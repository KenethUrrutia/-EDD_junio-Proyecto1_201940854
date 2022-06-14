class NodoTopUsuario{
    constructor(_usuario){
        this.id = 0
        this.usuario = _usuario;
        this.siguiente = null;
        this.abajo = null;
    }

}

//#region Clases Nodos
class NodoUsuario{
    constructor(_usuario){
        this.id = 0
        this.usuario = _usuario;
        this.siguiente = null;
        this.abajo = null;
    }
}

class NodoLibro{
    constructor(libro){
        this.id = 0
        this.libro = libro;
        this.siguiente = null;
        this.anterior = null;
    }
}
//#endregion


//#region Clases de Estructuras




class ListaListasUsuariosLibros{
    constructor(){
        
        this.cabeza = null

    }

    addUsuario(usuario){
        var tempo = new NodoUsuario(usuario);
        tempo.siguiente = this.cabeza;

        if (this.cabeza!=null) {
            tempo.id = (this.cabeza.id+1);
        }

        this.cabeza = tempo;
    }
    addLibro(usuario, nombre_libro, listaTodosLibros){
        

        var tempoUsuario = this.cabeza

        while(tempoUsuario != null){

            if(tempoUsuario.usuario.nombre_usuario == usuario){
                var tempoLibro = listaTodosLibros.cabeza
                while (tempoLibro != null) {
                    if (tempoLibro.libro.nombre_libro == nombre_libro && tempoLibro.libro.cantidad > 0) {
                        var nuevoNodoLibro = new NodoLibro(tempoLibro.libro)
                        
                        nuevoNodoLibro.siguiente = tempoUsuario.abajo
                        if (tempoUsuario.abajo != null) {
                            nuevoNodoLibro.id = (tempoUsuario.abajo.id+1)
                        }
                        tempoUsuario.abajo = nuevoNodoLibro
                        
                        return
                    }
                    tempoLibro  = tempoLibro.siguiente
                }

                if(tempoLibro == null){
                    console.log("No se encontran existencias del libro " + nombre_libro+ " en la lista ")
                }
            }
            tempoUsuario= tempoUsuario.siguiente
        }
        if(tempoUsuario == null){
            console.log("No se encontro el usuario " + usuario+ " en la lista ")
        }

    }

    graficar(lienzo){
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

                    etiquetas += `U`+temporalUsuario.id+`L`+temporalLibro.id + ` [label = "`+temporalLibro.libro.nombre_libro+`" ];\n`;
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
        d3.select("#"+lienzo)
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

    cantLibros(_nombreUsuario){
        var cont = 0;

        var temporal = this.cabeza;
        while (temporal != null){
            if(temporal.usuario.nombre_usuario == _nombreUsuario){       
                var tempoLibro = temporal.abajo;
                while(tempoLibro != null){
                    cont++;
                    
                    tempoLibro = tempoLibro.siguiente;
                }
                return cont;
            }
            temporal = temporal.siguiente;
        }
        if(temporal == null){
            console.log("No se pudo encontrar el usuario solicitado: "+_nombreUsuario)
        }
        return cont
    }

    verificarUserYPass(){
        var user = document.getElementById("nombre_usuario").value;
        var pass = document.getElementById("contrasenia").value;
        var temporal = this.cabeza;
        var resultado = false;
        
        while(temporal!=null){  
            
            if (temporal.usuario.nombre_usuario == user) {
                if (temporal.usuario.contrasenia == pass) {
                    resultado = true;
                }
            }
            temporal = temporal.siguiente;
        }
        if (resultado) {
            alert("Login Exitoso ")
            logear(user);
            goIndex();
        } else {
            alert("Login Error")
        }
    }

}


class ListaLibros{
    constructor(){
        this.cabeza = null;
    }

    add(libro){
        var tempo = new NodoLibro(libro);
        tempo.siguiente = this.cabeza;
        
        if (this.cabeza!=null) {
            tempo.id = (this.cabeza.id+1);
        }

        this.cabeza = tempo;
    }

    mostrarLibros(){
        var temporal = this.cabeza;
        while (temporal != null){
            console.log(temporal.libro);
            temporal = temporal.siguiente;
        }

    }

}




class ListaDobleTopClientes{
    constructor(){
        this.cabeza = null;
    }

    add(usuario){
        var temporal = new NodoTopUsuario(usuario);
        
        if (this.cabeza ==null) {
            this.cabeza = temporal;
        } else {
            temporal.id = (this.cabeza.id+1);
            temporal.siguiente = this.cabeza;
            this.cabeza.anterior = temporal;
            this.cabeza = temporal;
        }
        
    }

    mostrarLista(){
        var temporal = this.cabeza;

        while (temporal != null) {
            console.log(temporal);
            temporal = temporal.siguiente;
        }

    }

    graficar(lienzo){
        
        var codigoDot = `digraph G {\n label = "Top Clientes"\n node [shape=box]; rankdir=LR; \n nullFin [label="null"; shape= "none"]; \nnullIni [label="null"; shape= "none"];\n`;
        var etiquetas = `\n`;
        var conexiones = `\n`;

        var temporal = this.cabeza
        while (temporal != null) {
            var conteo = listaListasUsuarios.cantLibros(temporal.usuario.nombre_usuario)
            etiquetas += `nodo`+temporal.id + `[label="Cliente: `+ temporal.usuario.nombre_usuario +`\nLibros comprados: `+ conteo +`"];\n`;
            if (temporal.siguiente!= null && temporal.anterior != null) {
                conexiones += `nodo`+temporal.id +` -> nodo`+temporal.siguiente.id + `\n`;
                conexiones += `nodo`+temporal.id +` -> nodo`+temporal.anterior.id+ `\n`;
            } else if(temporal.siguiente== null) {
                conexiones += `nodo`+temporal.id +` -> nullFin`+ `\n`;
                conexiones += `nodo`+temporal.id +` -> nodo`+temporal.anterior.id+ `\n`;
            }else{
                conexiones += `nodo`+temporal.id +` -> nodo`+temporal.siguiente.id+ `\n`;
                conexiones += `nodo`+temporal.id +` -> nullIni`+ `\n`;

            }
            
            temporal = temporal.siguiente;
            
        }

        codigoDot += etiquetas + conexiones +"}"
        console.log(codigoDot);
        d3.select("#"+lienzo)
        .graphviz()
          .height(400)
          .width(1000)
          .dot(codigoDot)
          .render();

    }
}

//#endregion


//#region Funciones de Tablas
function crearTablaUsuarios(){
    var element = document.getElementById("tabla-usuarios");
    var textoHTML = `<TABLE class="tabla-tabla" >
                    <TR><TH>Nombre Usuario</TH><TH>Nombre Completo</TH><TH>Rol</TH><TH>Libro Comprados</TH></TR>`;
    var temporal = listaListasUsuarios.cabeza;
    while (temporal != null){


        textoHTML += `<TR><TD>` +temporal.usuario.nombre_usuario+`</TD> <TD>`
                                +temporal.usuario.nombre_completo+`</TD> <TD>`
                                +temporal.usuario.rol+`</TD> <TD> `
                                +listaListasUsuarios.cantLibros(temporal.usuario.nombre_usuario)+`</TD></TR>`;

        
        temporal = temporal.siguiente;
    }
    textoHTML += `</TABLE>`;
    
   

    element.innerHTML = textoHTML;
}

function crearTablaLibros(){
    var element = document.getElementById("tabla-libros");
    var textoHTML = `<TABLE class="tabla-tabla">`;
    var temporal = listaLibros.cabeza;
    

    while (temporal != null){
        textoHTML += `<TR><TD class="svg"> <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
        <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
      </svg></TD><TD><b><font color="#271700" size=5>` +temporal.libro.nombre_libro+ `</font></b><br><b>ISBN: </b>`+
                                 temporal.libro.isbn+ `<br><b>Autor: </b>`+
                                 temporal.libro.nombre_autor+ `<br><b>Paginas: </b>`+
                                 temporal.libro.paginas+ `<br><b>Categoria: </b>`+
                                 temporal.libro.categoria+ `<br>`+
                                 `<b>Pila de ejemplares:</b><br><div class="pilaEj" id="pilaEjemplares`+temporal.id+`"> </div></TD></TR>`;
        
                                
        
        
        
        temporal = temporal.siguiente;
        
    }
    textoHTML += `</TABLE>`;
    

    element.innerHTML = textoHTML;

    var temporal = listaLibros.cabeza;

    while (temporal != null){

        var codigoDot = `digraph G {\ncharset="UTF-8"\nrankdir=UD;\nnodo1 [label="`
        for (let i = 0; i < temporal.libro.cantidad; i++) {
            codigoDot+=`|📕`
        }
        
        codigoDot+=`" shape = "record" margin=0 height=0.2];\n}`
        console.log(codigoDot);
        console.log(`#pilaEjemplares`+temporal.id);
        d3.select(`#pilaEjemplares`+temporal.id)
        .graphviz()
            .height(50)
            .width(200)
            .zoomScaleExtent([0.5, 2])
            .dot(codigoDot)
            .render();
        
        temporal = temporal.siguiente;
        
    }
    
    

}


function llenarTopClientes() {
    var temporal = listaListasUsuarios.cabeza
    while (temporal != null) {
        listaDobleTopClientes.add(temporal.usuario);
        temporal = temporal.siguiente;
    }
}

//#endregion


//#region ordenamientos
function ordenBurbuja(_lista) {
    var temporal1 = _lista.cabeza;

    while (temporal1.siguiente != null) {
        var temporal2 = temporal1.siguiente;

        while (temporal2 != null) {
            if(temporal1.libro.nombre_libro > temporal2.libro.nombre_libro){
                var aux = temporal1.libro;
                temporal1.libro = temporal2.libro;
                temporal2.libro = aux
               
            }
            console.log(temporal1.libro.nombre_libro +` -> `+ temporal2.libro.nombre_libro);
            temporal2 = temporal2.siguiente;
        }

        temporal1 = temporal1.siguiente;
    }
    return _lista
    


}

function QuickSort(lista) {
    
    var lsIzq = new ListaLibros();
    var lsDer = new ListaLibros();
    var centro = lista.cabeza;

    if(centro == null)
        return new ListaLibros();
    var tempo = centro.siguiente


    while(tempo != null ){
        if (tempo.libro.nombre_libro > centro.libro.nombre_libro){ 
            lsIzq.add(tempo.libro)
        }else{
            lsDer.add(tempo.libro)
        }

        tempo=tempo.siguiente;

        

    }

    return concat( QuickSort(lsIzq), centro, QuickSort(lsDer));


    
}

function concat(lsIzq, centro, lsDer){

    var nuevaLista = new ListaLibros();
    
    var tempo = lsIzq.cabeza;
    
    while(tempo != null){
        nuevaLista.add(tempo.libro)
        tempo = tempo.siguiente;
    }
    
    nuevaLista.add(centro.libro);
    
    var tempo2 = lsDer.cabeza

    while(tempo2 != null){
        nuevaLista.add(tempo2.libro)
        tempo2 = tempo2.siguiente;
    }
    
    return nuevaLista;
    
    
}

//#endregion


//#region Variables y estructuras a Utilizar

var listaLibros = new ListaLibros();
var listaListasUsuarios = new ListaListasUsuariosLibros();
var listaDobleTopClientes  = new ListaDobleTopClientes();
var isLogeado = false;

//#endregion


//#region Manejo de Botones 

document.getElementById("atoz").onclick = llamarBurbuja;
document.getElementById("ztoa").onclick = llamarQuicSort;
document.getElementById("btn-login").onclick = goLogin;
document.getElementById("btn-logout").onclick = logout;
document.getElementById("btn-usuarios").onclick = goUsuarios;
document.getElementById("btn-index").onclick = goIndex;
document.getElementById("btn-tops").onclick = goTops;
document.getElementById("btnLogear").onclick = verificarLogin;
//document.getElementById("cargaMasiva").onclick = cargar;



function logout() {
    isLogeado = false
    var btn = document.getElementById("btn-login")
    btn.style.display = "block";
    btn = document.getElementById("btn-logout")
    btn.style.display = "none";
    alert("Logout Exitoso")

}

function logear(nombre_usuario) {
    isLogeado = true;
    var btn = document.getElementById("btn-logout")
    btn.innerHTML  = `<i class="bi bi-box-arrow-left"></i> `+nombre_usuario;
    btn.style.display = "block";
    btn = document.getElementById("btn-login")
    btn.style.display = "none";

}

function verificarLogin() {
    listaListasUsuarios.verificarUserYPass();
}

function goIndex() {
    var divTodos = document.querySelectorAll('.ventana');
    
    divTodos.forEach(element => {
        element.style.display = "none";
    });

    var div = document.getElementById('div-todosLibros')
    div.style.display = "block";

}

function mostrar(){
    listaUsuario.mostrarListaUsuarios();
}

function goLogin() {
    var divTodos = document.querySelectorAll('.ventana');
    
    divTodos.forEach(element => {
        element.style.display = "none";
    });

    var div = document.getElementById('div-login')
    div.style.display = "block";

}

function goUsuarios() {
    var divTodos = document.querySelectorAll('.ventana');
    
    divTodos.forEach(element => {
        element.style.display = "none";
    });

    var div = document.getElementById('div-usuarios')
    div.style.display = "block";

}

function goTops() {
    var divTodos = document.querySelectorAll('.ventana');
    
    divTodos.forEach(element => {
        element.style.display = "none";
    });

    var div = document.getElementById('div-tops')
    div.style.display = "block";

}

function llamarQuicSort() {
    listaLibros = QuickSort(listaLibros);
    crearTablaLibros();
}

function llamarBurbuja() {
    listaLibros = ordenBurbuja(listaLibros);
    crearTablaLibros();
}

//#endregion


//#region Creacion de Instancias


listaLibros.add({
    "isbn": 9538647877108, 
    "nombre_autor": "Strickland Shelton", 
    "nombre_libro": "Zounds", 
    "cantidad": 2, 
    "fila": 5, 
    "columna": 10, 
    "paginas": 187, 
    "categoria": "Fantasía" 
});

listaLibros.add({
    "isbn": 7302360531742, 
    "nombre_autor": "Collins Cohen", 
    "nombre_libro": "Isosure", 
    "cantidad": 7, 
    "fila": 9, 
    "columna": 1, 
    "paginas": 214 , 
    "categoria": "Thriller" 
});
listaLibros.add({
    "isbn": 2345435382301, 
    "nombre_autor": "Williamson Lynn", 
    "nombre_libro": "Crustatia", 
    "cantidad": 5, 
    "fila": 6, 
    "columna": 2, 
    "paginas": 197, 
    "categoria": "Fantasía" 
});

listaLibros.add({
    "isbn": 9538647877108, 
    "nombre_autor": "Strickland Shelton", 
    "nombre_libro": "Principito", 
    "cantidad": 2, 
    "fila": 5, 
    "columna": 10, 
    "paginas": 187, 
    "categoria": "Fantasía" 
});

listaLibros.add({
    "isbn": 7302360531742, 
    "nombre_autor": "Collins Cohen", 
    "nombre_libro": "Pinocho", 
    "cantidad": 7, 
    "fila": 9, 
    "columna": 1, 
    "paginas": 214 , 
    "categoria": "Thriller" 
});
listaLibros.add({
    "isbn": 2345435382301, 
    "nombre_autor": "Williamson Lynn", 
    "nombre_libro": "Hada xd", 
    "cantidad": 5, 
    "fila": 6, 
    "columna": 2, 
    "paginas": 197, 
    "categoria": "Fantasía" 
});
listaLibros.add({
    "isbn": 2345435382301, 
    "nombre_autor": "Williamson Lynn", 
    "nombre_libro": "JJBA", 
    "cantidad": 5, 
    "fila": 6, 
    "columna": 2, 
    "paginas": 197, 
    "categoria": "Fantasía" 
});
listaLibros.add({
    "isbn": 9538647877108, 
    "nombre_autor": "Strickland Shelton", 
    "nombre_libro": "Aladin", 
    "cantidad": 2, 
    "fila": 5, 
    "columna": 10, 
    "paginas": 187, 
    "categoria": "Fantasía" 
});

listaLibros.add({
    "isbn": 2345435382301, 
    "nombre_autor": "Williamson Lynn", 
    "nombre_libro": "Elpepe", 
    "cantidad": 5, 
    "fila": 6, 
    "columna": 2, 
    "paginas": 197, 
    "categoria": "Fantasía" 
});
listaLibros.add({
    "isbn": 9538647877108, 
    "nombre_autor": "Strickland Shelton", 
    "nombre_libro": "Mostaza", 
    "cantidad": 2, 
    "fila": 5, 
    "columna": 10, 
    "paginas": 187, 
    "categoria": "Fantasía" 
});


crearTablaLibros();






listaListasUsuarios.addUsuario({
    "dpi":2354168452525, 
    "nombre_completo": "WIlfred Perez", 
    "nombre_usuario": "Wilfred",
    "correo":"",
    "rol":  "Administrador",
    "contrasenia": "123",
    "telefono": "+502 (123) 123-4567"
});
listaListasUsuarios.addUsuario({
    "dpi": 3884144641925, 
    "nombre_completo": "William Leon",
    "nombre_usuario": "Rhonda", 
    "correo": "rhondaleon@bitrex.com",
    "rol": "Usuario", 
    "contrasenia": "veniam",
    "telefono": "+502 (841) 537-2727" 
});
listaListasUsuarios.addUsuario({
    "dpi": 5158445914766, 
    "nombre_completo": "Clarice Baird",
    "nombre_usuario": "Booker",
    "correo": "bookerbaird@bitrex.com",
    "rol": "Administrador",
    "contrasenia": "labore",
    "telefono": "+5112 (871) 424-3154" 
})
listaListasUsuarios.addUsuario({
    "dpi": 4209796138857, 
    "nombre_completo": "Hawkins Graves",
    "nombre_usuario": "Stokes", 
    "correo": "mstokesgravesphitrex.com", 
    "rol": "Usuario", 
    "contrasenia": "toreo", 
    "telefono": "+502 (935) 532-2941" 
})

listaListasUsuarios.addLibro("Stokes", "Isosure", listaLibros);
listaListasUsuarios.addLibro("Stokes", "Elpepe", listaLibros);
listaListasUsuarios.addLibro("Stokes", "Mostaza", listaLibros);
listaListasUsuarios.addLibro("Booker", "Crustatia", listaLibros);
listaListasUsuarios.addLibro("Booker", "JJBA", listaLibros);


listaListasUsuarios.graficar("lista-listas");
crearTablaUsuarios();

llenarTopClientes()


listaDobleTopClientes.graficar("lienzo-TopClientes");

//#endregion





var btn = document.getElementById("btn-logout")
btn.style.display = "none";
goIndex();