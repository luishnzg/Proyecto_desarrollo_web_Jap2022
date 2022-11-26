let email = document.getElementById("email");
let clave = document.getElementById("clave");
let listaUsuarios = JSON.parse(localStorage.getItem("listaUsuarios"))

//escucha de eventos del boton de login en la cual se agrega una funcion para redireccionar segun las condiciones de validacion. Si se valida que todos los campos estan vacios suelta una alerta de llenar campos de lo contrario redirige la pagina y guarda el email en localstorage
document.getElementById("botonlogin").addEventListener("click", function redireccionar() {
    if (email.value == "" || clave.value == "") {
        alert("completar campos")

    }
    else {
        window.location.href = "portada.html";
        seteoLocalStorage();
    }

}
)
// funcion creada para guardar en la memoria local la llave usuario y su valor. El valor es el dato que ingresamos en el elemento iput de tipo email con id email
function seteoLocalStorage() {
    let usuario = new usuarioNuevo;
    usuario.primerNombre = "";
    usuario.segundoNombre = "";
    usuario.primerApellido = "";
    usuario.segundoApellido = "";
    usuario.correo = email.value;
    usuario.telefono = "";
    usuario.imagen = "";
    if (listaUsuarios == null || listaUsuarios.length == 0) {
        listaUsuarios = [];
        listaUsuarios.push(usuario);
        localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
        localStorage.setItem('usuario', JSON.stringify(usuario));
    }
    else {
        let chequearDuplicado = listaUsuarios.findIndex(obj => {
            return obj.correo === email.value;
        })
        if (chequearDuplicado !== -1) {
            let usuarioEncontrado = listaUsuarios[chequearDuplicado];
            localStorage.setItem('usuario', JSON.stringify(usuarioEncontrado))
            
        }
        else { 
            listaUsuarios.push(usuario);
            localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
            localStorage.setItem('usuario', JSON.stringify(usuario));
            console.log("no hay duplicado")
        }
        console.log("hay lista");
    }

    localStorage.setItem('usuarioJap', 25801)
}

class usuarioNuevo {
    constructor(primerNombre, segundoNombre, primerApellido, segundoApellido, correo, telefono, imagen) {
        this.primerNombre = primerNombre;
        this.segundoNombre = segundoNombre;
        this.primerApellido = primerApellido;
        this.segundoApellido = segundoApellido;
        this.correo = correo;
        this.telefono = telefono;
        this.imagen = imagen;
    }
} 