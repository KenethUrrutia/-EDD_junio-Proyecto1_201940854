/** 
class Nodo{
    constructor(usuario){
        this.usuario = usuario;
        this.siguiente = null;
    }

}
 class Usuario{
    constructor(dpi, nombre_completo, nombre_usuario, correo, rol, contrasenia, telefono){
        this.dpi = dpi;
        this.nombre_completo = nombre_completo;
        this.nombre_usuario = nombre_usuario;
        this.correo = correo;
        this.rol = rol;
        this.contrasenia = contrasenia;
        this.telefono = telefono;

    }

} 




class ListaUsuarios{
    constructor(){
        this.cabeza = null;
    }

    add(usuario){
        var tempo = new Nodo(usuario);
        
        tempo.siguiente = this.cabeza;
        this.cabeza = tempo;
        
        
        
    }

    verificarUserYPass(user, pass){
        var temporal = this.cabeza;
        var resultado = false;

        while(temporal!=null){  
            
            if (temporal.usuario.nombre_usuario == user) {
                console.log("user: "+temporal.usuario.nombre_usuario);
                if (temporal.usuario.contrasenia == pass) {
                    console.log("pass: "+temporal.usuario.contrasenia);
                    resultado = true;
                    alert("Login Exitoso"+temporal.usuario.nombre_usuario )
                }
            }
            temporal = temporal.siguiente;
        }
        if (resultado) {
            alert("Login Exitoso ")
        } else {
            alert("Login Error")
        }
    }

    mostrarListaUsuarios(){
        var temporal = this.cabeza;
        console.log("mostrar: ");
        while (temporal!=null) {
            console.log("mostrar: "+temporal.usuario.dpi);
            temporal = temporal.siguiente;
        }
        
    }

}
*/

document.getElementById("cancelbtn").onclick = goIndex;

function goIndex() {
    window.location.replace("../");
}



document.getElementById("btnLogin").onclick = validarLogin;

function validarLogin() {
    
    var user = document.getElementById("nombre_usuario").value;
    var pass = document.getElementById("contrasenia").value;
    var correcto = false
    fetch('../json/usuarios.json')
    .then(respuesta => respuesta.json())
    .then(usuarios => {
        usuarios.forEach(usuario => {
            if (usuario.nombre_usuario == user) 
                if (usuario.contrasenia == pass) 
                    correcto = true;
        });
        
        if (correcto) {
            alert("Login Exitoso" )
            goIndex();
        } else {
            alert("contrasenia incorrecta")
        }
        
    });  

    

}

