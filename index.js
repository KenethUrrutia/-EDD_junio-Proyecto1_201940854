var isLogeado = false;
var isAdmin = false
//#region Clases Nodos
class NodoAutor{
    constructor(autor){
        this.izquierda = null;
        this.derecha = null;
        this.autor = autor;
        this.id = 0;
    }

}

class NodoTopUsuario{
    constructor(_usuario){
        this.id = 0
        this.usuario = _usuario;
        this.siguiente = null;
        this.abajo = null;
    }

}

class NodoTopLibro{
    constructor(libro){
        this.id = 0
        this.libro = libro;
        this.siguiente = null;
        this.abajo = null;
        this.vendidos = 1;
    }

}

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
        console.log(this);
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

    cantEjemplaresVendidos(_nombreLibro){
        var cont = 0;

        var temporal = this.cabeza;
        while (temporal != null){
                var tempoLibro = temporal.abajo;
                while(tempoLibro != null){
                    if (tempoLibro.libro.nombre_libro == _nombreLibro) {
                        cont++;
                    }
                    tempoLibro = tempoLibro.siguiente;
                }
                
            
            temporal = temporal.siguiente;
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

    buscarRol(user){
        var temporal = this.cabeza;
        var resultado = null;
        
        while(temporal!=null){  
            
            if (temporal.usuario.nombre_usuario == user) {
                resultado = temporal.usuario.rol;
            }
            temporal = temporal.siguiente;
        }
        return resultado

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



class ListaDobleTopLibros{
    constructor(){
        this.cabeza = null;
    }

    add(libro){
        var ventas = listaListasUsuarios.cantEjemplaresVendidos(libro.nombre_libro);

        var nuevoNodo = new NodoTopLibro(libro);
        nuevoNodo.vendidos = ventas;
        if (this.cabeza ==null) {
            this.cabeza = nuevoNodo;

        } else {
            nuevoNodo.id = (this.cabeza.id+1);
            nuevoNodo.siguiente = this.cabeza;
            this.cabeza.anterior = nuevoNodo;
            this.cabeza = nuevoNodo;
        }
        
       

        this.ordenarVentas();
        
    }

    mostrarLista(){
        var temporal = this.cabeza;

        while (temporal != null) {
            console.log(temporal);
            temporal = temporal.siguiente;
        }

    }

    ordenarVentas(){
        
        var temporal1 = this.cabeza;
        var cant1 
        var cant2 
        while (temporal1.siguiente != null) {
            var temporal2 = temporal1.siguiente;
            cant1 = listaListasUsuarios.cantEjemplaresVendidos(temporal1.libro.nombre_libro);
            
            while (temporal2 != null) {
                cant2 = listaListasUsuarios.cantEjemplaresVendidos(temporal2.libro.nombre_libro);
                if(cant1 < cant2 ){
                    var aux = temporal1.libro;
                    temporal1.libro = temporal2.libro;
                    temporal2.libro = aux;
                   
                }
                
                temporal2 = temporal2.siguiente;
            }
    
            temporal1 = temporal1.siguiente;
        }
        

    }

    graficar(lienzo){
        this.ordenarVentas();
        var codigoDot = `digraph G {\n label = "Top Ventas"\n node [shape=box]; rankdir=LR; \n nullFin [label="null"; shape= "none"]; \nnullIni [label="null"; shape= "none"];\n`;
        var etiquetas = `\n`;
        var conexiones = `\n`;

        var temporal = this.cabeza
        while (temporal != null) {
            var conteo = listaListasUsuarios.cantEjemplaresVendidos(temporal.libro.nombre_libro)
            etiquetas += `nodo`+temporal.id + `[label="Libro: `+ temporal.libro.nombre_libro +`\nEjemplares vendidos: `+ conteo +`"];\n`;
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

        this.ordenarCompras();
        
    }

    mostrarLista(){
        var temporal = this.cabeza;

        while (temporal != null) {
            console.log(temporal);
            temporal = temporal.siguiente;
        }

    }

    ordenarCompras(){
        //var listaNueva = new ListaDobleTopClientes();
        var temporal1 = this.cabeza;
        var cant1 
        var cant2 
        while (temporal1.siguiente != null) {
            var temporal2 = temporal1.siguiente;
            cant1 = listaListasUsuarios.cantLibros(temporal1.usuario.nombre_usuario)
            
            while (temporal2 != null) {
                cant2 = listaListasUsuarios.cantLibros(temporal2.usuario.nombre_usuario)
                if(cant1 < cant2 ){
                    var aux = temporal1.usuario;
                    temporal1.usuario = temporal2.usuario;
                    temporal2.usuario = aux;
                   
                }
                
                temporal2 = temporal2.siguiente;
            }
    
            temporal1 = temporal1.siguiente;
        }
        //this = listaNueva

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


class ArbolAutores{
    constructor(){
        this.raiz = null;
        this.conexiones = ""
        this.etiquetas = ""
        this.contador = 0;
        this.textoHTML = ""
        this.busquedaAutor = null
    }

    add(autor){
        var nuevoNodo = new NodoAutor(autor);
        var temporal = this.raiz
        var agregado = false;
        if ( temporal != null) {
            while (!agregado) {
                
                if (autor.nombre_autor < temporal.autor.nombre_autor) {
                    if(temporal.izquierda == null){
                        temporal.izquierda = nuevoNodo;
                        nuevoNodo.id = this.contador
                        this.contador++;
                        agregado = true;
                        return;
                    }
                    temporal = temporal.izquierda;
                    
                } else {
                    if(temporal.derecha == null){
                        temporal.derecha = nuevoNodo;
                        nuevoNodo.id = this.contador
                        this.contador++;
                        agregado = true;
                        return;
                    }
                    temporal = temporal.derecha;
                }

            }
            
            
        }else{
            nuevoNodo.id = this.contador;
            this.contador++;
            this.raiz = nuevoNodo;

            return;
        }

    }


    mostrar(){
       console.log( this.mostrarInOrden(this.raiz));
    }

    mostrarInOrden(nodo){
        if(nodo.izquierda!=null){
            this.mostrarInOrden(nodo.izquierda)
        }
        console.log(nodo.autor.nombre_autor);
        if (nodo.derecha!=null) {
            this.mostrarInOrden(nodo.derecha);
        }
    }

    graficarInOrden(nodo){
        
        if(nodo.izquierda!=null){
            this.graficarInOrden(nodo.izquierda)
            this.conexiones += `n`+nodo.id+` -> n`+nodo.izquierda.id+ `;\n`;

        }else{
            this.etiquetas += `null`+nodo.id+`I [label="null"; shape="none"]\n`;
            this.conexiones += `n`+nodo.id+` -> null`+nodo.id+ `I;\n`;
            
        }

        this.etiquetas += `n`+nodo.id+` [label="`+nodo.autor.nombre_autor+`"]\n`;

        if (nodo.derecha!=null) {
            this.graficarInOrden(nodo.derecha);
            this.conexiones += `n`+nodo.id+` -> n`+nodo.derecha.id+ `;\n`;
            
            
        }else{
            this.etiquetas += `null`+nodo.id+`D [label="null"; shape="none"]\n`;
            this.conexiones += `n`+nodo.id+` -> null`+nodo.id+ `D;\n`;
            
        }
    }

    graficar(lienzo){
        
        this.graficarInOrden(this.raiz);

        var codigoDot = `digraph G {\n`+this.etiquetas + this.conexiones + `}`

        console.log(codigoDot);

        codigoDot += this.etiquetas + this.conexiones +"}"
        console.log(codigoDot);
        d3.select("#"+lienzo)
        .graphviz()
          .height(400)
          .width(1000)
          .dot(codigoDot)
          .render();

    }
    

    tablaInOrden(nodo){
        
        if(nodo.izquierda!=null){
            this.tablaInOrden(nodo.izquierda)
        }

        this.textoHTML += `<TR><TD>` +nodo.autor.nombre_autor+`</TD> <TD>`
                                +nodo.autor.correo+`</TD> <TD>`
                                +nodo.autor.telefono+`</TD> <TD> `
                                +`<button class="vermas" id="vermas" value= "`+nodo.autor.nombre_autor+`"> Ver mas </button></TD></TR>`;

        
        if (nodo.derecha!=null) {
            this.tablaInOrden(nodo.derecha);
        }
    }

    buscarInOrden(nodo, nombre_autor){
        if(nodo.izquierda!=null){
            
            this.buscarInOrden(nodo.izquierda, nombre_autor)

            
        }
        if (nombre_autor == nodo.autor.nombre_autor) {
            this.busquedaAutor = nodo.autor;
        }
        if (nodo.derecha!=null) {
            
            this.buscarInOrden(nodo.derecha, nombre_autor);

            
        }
        
    }

    buscarAutor(nombre_autor){
        this.busquedaAutor = null
        this.buscarInOrden(this.raiz, nombre_autor);

        return this.busquedaAutor;

    }

}

//#endregion


//#region Funciones de Tablas
function crearTablaUsuarios(){
    var element = document.getElementById("tabla-usuarios");
    var textoHTML = `<TABLE class="tabla-tabla" >
                    <TR><TH>Nombre Usuario</TH><TH>Nombre Completo</TH><TH>Correo</TH><TH>DPI</TH><TH>Telefono</TH><TH>Rol</TH><TH>Libro Comprados</TH></TR>`;
    var temporal = listaListasUsuarios.cabeza;
    while (temporal != null){


        textoHTML += `<TR><TD>` +temporal.usuario.nombre_usuario+`</TD> <TD>`
                                +temporal.usuario.nombre_completo+`</TD> <TD>`
                                +temporal.usuario.correo+`</TD> <TD> `
                                +temporal.usuario.dpi+`</TD> <TD> `
                                +temporal.usuario.telefono+`</TD> <TD> `
                                +temporal.usuario.rol+`</TD> <TD> `
                                +listaListasUsuarios.cantLibros(temporal.usuario.nombre_usuario)+`</TD></TR>`;

        
        temporal = temporal.siguiente;
    }
    textoHTML += `</TABLE>`;
    
   

    element.innerHTML = textoHTML;
}

function crearTablaAutores(){
    
    var element = document.getElementById("tabla-autores");
    var textoHTML = `<TABLE class="tabla-tabla" >
                    <TR><TH>Nombre</TH><TH>Correo</TH><TH>Telefono</TH><th></th></TR>`;
    arbolAutores.textoHTML = ""
    arbolAutores.tablaInOrden(arbolAutores.raiz)
    textoHTML += arbolAutores.textoHTML
    textoHTML += `</TABLE>`;
    
   

    element.innerHTML = textoHTML;
}


function crearPodioClientes(){
    var element = document.getElementById("podio-clientes");
    var cont = 0;
    var textoHTML = `<center><TABLE class="podio-clientes-tabla"><TR>`;
    var temporal = listaDobleTopClientes.cabeza;

    var imagen = "";


    while (temporal != null && cont <3){
        switch (cont) {
            case 2:
                imagen = `<img src="https://i.ibb.co/58rpsjR/bronze.png" width = "100px" alt="bronze" border="0" />`; break;
            case 1:
                imagen = `<img src="https://i.ibb.co/k40RKxX/silver.png" width = "100px" alt="silver" border="0" />`;break;
            case 0:
                imagen = `<img src="https://i.ibb.co/qxYpTmV/gold.png" width = "100px" alt="gold" border="0" />`;break;
            
        }

        textoHTML += `<TD><center> `+imagen+` <br><b>Usuario: </b>` +temporal.usuario.nombre_usuario+
        `<br><b>Libros comprados: </b> ` + listaListasUsuarios.cantLibros(temporal.usuario.nombre_usuario)+`<br></center></TD>`;

        
        temporal = temporal.siguiente;
        cont ++;
    }
    textoHTML += `</TR></TABLE></center>`;
    
   

    element.innerHTML = textoHTML;
}

function crearPodioLibros(){
    var element = document.getElementById("podio-libros");
    var cont = 0;
    var textoHTML = `<center><TABLE class="podio-libros-tabla"><TR>`;
    var temporal = listaDobleTopLibros.cabeza;

    var imagen = "";


    while (temporal != null && cont <3){
        switch (cont) {
            case 2:
                imagen = `<img src="https://i.ibb.co/58rpsjR/bronze.png" width = "100px" alt="bronze" border="0" />`; break;
            case 1:
                imagen = `<img src="https://i.ibb.co/k40RKxX/silver.png" width = "100px" alt="silver" border="0" />`;break;
            case 0:
                imagen = `<img src="https://i.ibb.co/qxYpTmV/gold.png" width = "100px" alt="gold" border="0" />`;break;
            
        }

        textoHTML += `<TD><center> `+imagen+` <br><b>Libro: </b>` +temporal.libro.nombre_libro+
        `<br><b>Libros comprados: </b> ` + listaListasUsuarios.cantEjemplaresVendidos(temporal.libro.nombre_libro)+`<br></center></TD>`;

        
        temporal = temporal.siguiente;
        cont ++;
    }
    textoHTML += `</TR></TABLE></center>`;
    
   

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
                                 `<b>Ejemplares: `+temporal.libro.cantidad+`</b><br><div class="pilaEj" id="pilaEjemplares`+temporal.id+`"> </div></TD></TR>`;
        
                                
        
        
        
        temporal = temporal.siguiente;
        
    }
    textoHTML += `</TABLE>`;
    

    element.innerHTML = textoHTML;

    var temporal = listaLibros.cabeza;

    while (temporal != null){

        var codigoDot = `digraph G {\ncharset="UTF-8"\nrankdir=UD;\nfontsize="100pt";\nnodo1 [label="`
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

function llenarTopLibros() {
    var tempoLibro = listaLibros.cabeza
   
    while(tempoLibro != null){
        listaDobleTopLibros.add(tempoLibro.libro)
            
        tempoLibro = tempoLibro.siguiente;
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
var listaDobleTopLibros = new ListaDobleTopLibros();
var arbolAutores =  new ArbolAutores();
var modal_container = document.getElementById('modal_container');
var file
var btn = document.getElementById("btn-logout")
btn.style.display = "none";
//#endregion


//#region Manejo de Botones 

document.getElementById("atoz").onclick = llamarBurbuja;
document.getElementById("ztoa").onclick = llamarQuicSort;
document.getElementById("btn-login").onclick = goLogin;
document.getElementById("btn-logout").onclick = logout;
document.getElementById("btn-usuarios").onclick = goUsuarios;
document.getElementById("btn-autores").onclick = goAutores;
document.getElementById("btn-index").onclick = goIndex;
document.getElementById("btn-tops").onclick = goTops;
document.getElementById("btnLogear").onclick = verificarLogin;
document.getElementById("cancelbtn").onclick = goIndex;

document.getElementById('close').addEventListener('click', () => {modal_container.classList.remove('show');});
document.getElementById('btn-buscar').addEventListener('click', () => {verMas(document.getElementById(`txt-buscar`).value);});


//#region Cargas Masivas 

var inputUsuarios = document.querySelector('#input-usuarios-json')  
inputUsuarios.addEventListener('change', (event) => {
    var fl = event.target.files;
    file = fl[0];
    prepararFileUsuarios(file)
    
  });

function readFileUsuarios(file) {
    
  
    let reader = new FileReader();
  
    reader.readAsText(file);
  
    reader.onload = function() {
      reader.result
      cargaMasivaUsuarios(reader.result)
    };
  
    reader.onerror = function() {
      console.log(reader.error);
    };
}

function prepararFileUsuarios(file) {
    
    const button = document.getElementById('cargaMasivaUsuarios')  
    button.addEventListener('click', () => {  
      readFileUsuarios(file);  
    })
    
}

function cargaMasivaUsuarios(texto) {
    obj=JSON.parse(texto)
    console.log(obj);
    obj.forEach(element => {
        listaListasUsuarios.addUsuario(element)
        
    });
    inputUsuarios.value = ``;
    document.getElementById('cargaMasivaUsuarios').disabled = true
    
    crearTablaUsuarios();
    listaListasUsuarios.graficar("lista-listas")
}





  var inputAutores = document.querySelector('#input-autores-json')  
  inputAutores.addEventListener('change', (event) => {
      var fl = event.target.files;
      file = fl[0];
      prepararFileAutores(file)
      
    });
  


  function readFileAutores(file) {
    
  
    let reader = new FileReader();
  
    reader.readAsText(file);
  
    reader.onload = function() {
      reader.result
      cargaMasivaAutores(reader.result)
    };
  
    reader.onerror = function() {
      console.log(reader.error);
    };
}

function prepararFileAutores(file) {
    
    const button = document.getElementById('cargaMasivaAutores')  
    button.addEventListener('click', () => {  
      readFileAutores(file);  
    })
    
}

function cargaMasivaAutores(texto) {
    obj=JSON.parse(texto)
    console.log(obj);
    obj.forEach(element => {
        arbolAutores.add(element)
        
    });
    inputAutores.value = ``;
    document.getElementById('cargaMasivaAutores').disabled = true

    crearTablaAutores();
    arbolAutores.graficar("lienzo-Autores")
    goAutores();
}



  var inputLibros = document.querySelector('#input-libros-json')  
  inputLibros.addEventListener('change', (event) => {
      var fl = event.target.files;
      file = fl[0];
      prepararFileLibros(file)
      
    });


  function readFileLibros(file) {
    
  
    let reader = new FileReader();
  
    reader.readAsText(file);
  
    reader.onload = function() {
      reader.result
      cargaMasivaLibros(reader.result)
    };
  
    reader.onerror = function() {
      console.log(reader.error);
    };
}

function prepararFileLibros(file) {
    
    const button = document.getElementById('cargaMasivaLibros')  
    button.addEventListener('click', () => {  
      readFileLibros(file);  
    })
    
}

function cargaMasivaLibros(texto) {
    obj=JSON.parse(texto)
    console.log(obj);
    obj.forEach(element => {
        listaLibros.add(element)
        
    });
    inputLibros.value = ``;
    document.getElementById('cargaMasivaLibros').disabled = true
    

    crearTablaLibros();
    goIndex();
}




//#endregion

//#region Vista admin o user

function vistaAdmin() {
    var conts = document.querySelectorAll(".container");
    conts.forEach(element => {
        element.style.display = "block";
    });
    var btnUsers = document.getElementById("btn-usuarios");
    btnUsers.style.display= "block";
}
function vistaUser() {
    var conts = document.querySelectorAll(".container");
    conts.forEach(element => {
        element.style.display = "none";
    });
    var btnUsers = document.getElementById("btn-usuarios");
    btnUsers.style.display= "none";
}


//#endregion

function verMas(nombre_autor) {
    var autor = arbolAutores.buscarAutor(nombre_autor);
    if (autor==null) {
        alert("No se encontro el autor")
    } else {
        var element = document.getElementById("nombre-autor");
        element.innerHTML = autor.nombre_autor;

        element = document.getElementById("dpi-autor");
        element.innerHTML = `<b>DPI: </b>`+autor.dpi;

        element = document.getElementById("telefono-autor");
        element.innerHTML = `<b>Telefono: </b>`+autor.telefono;

        element = document.getElementById("correo-autor");
        element.innerHTML = `<b>Correo: </b>`+autor.correo;

        element = document.getElementById("direccion-autor");
        element.innerHTML =`<b>Direccion: </b>`+ autor.direccion;

        element = document.getElementById("bio-autor");
        element.innerHTML =`<b>Biografia: </b>`+ autor.biografia;



        modal_container.classList.add('show');                                              
    }
    
    
}

function logout() {
    isLogeado = false
    isAdmin = false;
    vistaUser();
    var btn = document.getElementById("btn-login")
    btn.style.display = "block";
    btn = document.getElementById("btn-logout")
    btn.style.display = "none";
    alert("Logout Exitoso")

}

function logear(nombre_usuario) {
    isLogeado = true;
    var rol = listaListasUsuarios.buscarRol(nombre_usuario);
    if (rol == `Administrador`) {
        isAdmin = true
        vistaAdmin();
    }else{ 
        isAdmin = false
        vistaUser();
    }
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
    crearTablaLibros();
    var divTodos = document.querySelectorAll('.ventana');
    
    divTodos.forEach(element => {
        element.style.display = "none";
    });

    var div = document.getElementById('div-todosLibros')
    div.style.display = "block";

}

function goAutores() {
    var btnsVerMas = document.querySelectorAll("#vermas");
    btnsVerMas.forEach(element => {
        element.addEventListener('click', function(event){
            verMas(this.value)
         });
    });

    var divTodos = document.querySelectorAll('.ventana');
    
    divTodos.forEach(element => {
        element.style.display = "none";
    });

    var div = document.getElementById('div-autores')
    div.style.display = "block";
    
    
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
    crearTablaUsuarios();
    listaListasUsuarios.graficar("lista-listas")
    var divTodos = document.querySelectorAll('.ventana');
    
    divTodos.forEach(element => {
        element.style.display = "none";
    });

    var div = document.getElementById('div-usuarios')
    div.style.display = "block";

}

function goTops() {
    
    llenarTopClientes()
    llenarTopLibros();
    crearPodioClientes()
    crearPodioLibros()

    listaDobleTopClientes.ordenarCompras();
    listaDobleTopClientes.graficar("lienzo-TopClientes");
    listaDobleTopLibros.ordenarVentas();
    listaDobleTopLibros.graficar("lienzo-topLibros");



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







listaListasUsuarios.addUsuario({
    "dpi":2354168452525, 
    "nombre_completo": "WIlfred Perez", 
    "nombre_usuario": "Wilfred",
    "correo":"",
    "rol":  "Administrador",
    "contrasenia": "123",
    "telefono": "+502 (123) 123-4567"
});


goIndex();
vistaUser();