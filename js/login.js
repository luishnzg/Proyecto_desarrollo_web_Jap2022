let email = document.getElementById("email")
let clave = document.getElementById("clave")

//escucha de eventos del boton de login en la cual se agrega una funcion para redireccionar segun las condiciones de validacion. Si se valida que todos los campos estan vacios suelta una alerta de llenar campos de lo contrario redirige la pagina y guarda el email en localstorage
document.getElementById("botonlogin").addEventListener("click", function redireccionar(){
if(email.value == "" || clave.value == "") {
    alert("completar campos")
    
}
else {
    window.location.href = "portada.html";
    seteoLocalStorage();}

}
)
// funcion creada para guardar en la memoria local la llave usuario y su valor. El valor es el dato que ingresamos en el elemento iput de tipo email con id email
function seteoLocalStorage() {
    let usuario = new usuarioNuevo;
    usuario.correo = email.value;
    localStorage.setItem('usuario', JSON.stringify(usuario))
    localStorage.setItem('usuarioJap', 25801)
}

class usuarioNuevo {
    constructor(primerNombre, segundoNombre, primerApellido, segundoApellido, correo, telefono){
      this.primerNombre = primerNombre;
      this.segundoNombre = segundoNombre;
      this.primerApellido = primerApellido;
      this.segundoApellido = segundoApellido;
      this.correo = correo;
      this.telefono = telefono;
    }
  } 