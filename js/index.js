document.getElementById("login").onclick = goLogin;

function goLogin() {
    window.location.replace("./html/login.html");
}





class NodoLibro{
    constructor(libro){
        this.id = 0
        this.libro = libro;
        this.siguiente = null;
    }

}

class ListaLibro{
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

function crearTabla(){
    var element = document.getElementById("tabla");
    var textoHTML = `<TABLE class="tabla-tabla">`;
    var temporal = listaLibro.cabeza;

    while (temporal != null){
        textoHTML += `<TR><TD class="svg"> <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
        <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
      </svg></TD><TD><b><font color="#271700" size=5>` +temporal.libro.nombre_libro+ `</font></b><br><b>ISBN: </b>`+
                                 temporal.libro.isbn+ `<br><b>Autor: </b>`+
                                 temporal.libro.nombre_autor+ `<br><b>Paginas: </b>`+
                                 temporal.libro.paginas+ `<br><b>Categoria: </b>`+
                                 temporal.libro.categoria+ `<br></TD></TR>`;
        temporal = temporal.siguiente;
    }
    textoHTML += `</TABLE>`;
    element.innerHTML = textoHTML;
}


function Burbuja() {
    var temporal1 = listaLibro.cabeza;

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
    crearTabla();

}



function QuickSort(lista) {
    
    var lsIzq = new ListaLibro();
    var lsDer = new ListaLibro();
    var centro = lista.cabeza;

    if(centro == null)
        return new ListaLibro();
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

    var nuevaLista = new ListaLibro();
    
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

var listaLibro = new ListaLibro();

function llamarQuicSort() {
    listaLibro = QuickSort(listaLibro);
    console.log(listaLibro);
    crearTabla();
}

listaLibro.add({
    "isbn": 9538647877108, 
    "nombre_autor": "Strickland Shelton", 
    "nombre_libro": "Zounds", 
    "cantidad": 2, 
    "fila": 5, 
    "columna": 10, 
    "paginas": 187, 
    "categoria": "Fantasía" 
});

listaLibro.add({
    "isbn": 7302360531742, 
    "nombre_autor": "Collins Cohen", 
    "nombre_libro": "Isosure", 
    "cantidad": 7, 
    "fila": 9, 
    "columna": 1, 
    "paginas": 214 , 
    "categoria": "Thriller" 
});
listaLibro.add({
    "isbn": 2345435382301, 
    "nombre_autor": "Williamson Lynn", 
    "nombre_libro": "Crustatia", 
    "cantidad": 5, 
    "fila": 6, 
    "columna": 2, 
    "paginas": 197, 
    "categoria": "Fantasía" 
});

listaLibro.add({
    "isbn": 9538647877108, 
    "nombre_autor": "Strickland Shelton", 
    "nombre_libro": "Principito", 
    "cantidad": 2, 
    "fila": 5, 
    "columna": 10, 
    "paginas": 187, 
    "categoria": "Fantasía" 
});

listaLibro.add({
    "isbn": 7302360531742, 
    "nombre_autor": "Collins Cohen", 
    "nombre_libro": "Pinocho", 
    "cantidad": 7, 
    "fila": 9, 
    "columna": 1, 
    "paginas": 214 , 
    "categoria": "Thriller" 
});
listaLibro.add({
    "isbn": 2345435382301, 
    "nombre_autor": "Williamson Lynn", 
    "nombre_libro": "Hada xd", 
    "cantidad": 5, 
    "fila": 6, 
    "columna": 2, 
    "paginas": 197, 
    "categoria": "Fantasía" 
});
listaLibro.add({
    "isbn": 2345435382301, 
    "nombre_autor": "Williamson Lynn", 
    "nombre_libro": "JJBA", 
    "cantidad": 5, 
    "fila": 6, 
    "columna": 2, 
    "paginas": 197, 
    "categoria": "Fantasía" 
});
listaLibro.add({
    "isbn": 9538647877108, 
    "nombre_autor": "Strickland Shelton", 
    "nombre_libro": "Aladin", 
    "cantidad": 2, 
    "fila": 5, 
    "columna": 10, 
    "paginas": 187, 
    "categoria": "Fantasía" 
});

listaLibro.add({
    "isbn": 2345435382301, 
    "nombre_autor": "Williamson Lynn", 
    "nombre_libro": "Elpepe", 
    "cantidad": 5, 
    "fila": 6, 
    "columna": 2, 
    "paginas": 197, 
    "categoria": "Fantasía" 
});
listaLibro.add({
    "isbn": 9538647877108, 
    "nombre_autor": "Strickland Shelton", 
    "nombre_libro": "Mostaza", 
    "cantidad": 2, 
    "fila": 5, 
    "columna": 10, 
    "paginas": 187, 
    "categoria": "Fantasía" 
});


crearTabla();


document.getElementById("atoz").onclick = Burbuja;
document.getElementById("ztoa").onclick = llamarQuicSort;