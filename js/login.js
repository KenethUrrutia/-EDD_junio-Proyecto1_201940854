
class Nodo{
    constructor(_usuario){
        this.usuario = _usuario;
        this.siguiente = null;
    }
}




class ListaUsuarios{
    constructor(){
        this.cabeza = new Nodo( {
            "dpi":2354168452525, 
            "nombre_completo": "WIlfred Perez", 
            "nombre_usuario": "Wilfred",
            "correo":"",
            "rol":  "Administrador",
            "contrasenia": "123",
            "telefono": "+502 (123) 123-4567"});

        localStorage.setItem("lsUsers", JSON.stringify(this));
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
            localStorage.setItem("logeado", "true" );
            goIndex();
        } else {
            alert("Login Error")
        }
    }

    mostrarListaUsuarios(){
        var temporal = this.cabeza;

        while (temporal!=null) {
            console.log(temporal);
            temporal = temporal.siguiente;
        }


        
    }



}




function goIndex() {
    window.location.replace("../");
}


function verificar(){
    listaUsuario.verificarUserYPass();
}

var listaUsuario = JSON.parse(localStorage.getItem("lsUsers"));
if (listaUsuario == null) 
    listaUsuario = new ListaUsuarios();


document.getElementById("cancelbtn").onclick = goIndex;

document.getElementById("btnLogin").onclick = verificar;

