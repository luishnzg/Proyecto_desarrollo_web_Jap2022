let userLogged = JSON.parse(localStorage.getItem("usuario"));
//let validacionProfile = document.querySelectorAll('.needs-validation');
let pNombre = document.getElementById("primerNombre");
let sNombre = document.getElementById("segundoNombre");
let pApellido = document.getElementById("primerApellido");
let sApellido = document.getElementById("segundoApellido");
let correo = document.getElementById("emailProfile");
let telefono = document.getElementById("telefono");
let listaUsuarios = JSON.parse(localStorage.getItem("listaUsuarios"))
let imagenUsuario = localStorage.getItem("imagenCargada");
let imagenPredeterminada = "/img/user image.png"

correo.value = userLogged.correo;
pNombre.value = userLogged.primerNombre;
sNombre.value = userLogged.segundoNombre;
pApellido.value = userLogged.primerApellido;
sApellido.value = userLogged.segundoApellido;
telefono.value = userLogged.telefono;
let inputList = document.getElementsByTagName("input");
for (let input of inputList) {
    input.addEventListener("input", function () {

        validacionPeril()
    })
}

function validacionPeril() {
    if (pNombre.value == "") {
        pNombre.classList.add("is-invalid");
        pNombre.classList.remove("is-valid");
    }
    else {
        pNombre.classList.add("is-valid");
        pNombre.classList.remove("is-invalid")
    };
    if (pApellido.value == "") {
        pApellido.classList.add("is-invalid");
        pApellido.classList.remove("is-valid");
    }
    else {
        pApellido.classList.add("is-valid");
        pApellido.classList.remove("is-invalid")
    }
}



document.getElementById("btnGuardarCambio").addEventListener("click", function () {
    validacionPeril();
    if (pNombre.checkValidity() && pApellido.checkValidity()) {
        userLogged.primerNombre = pNombre.value;
        userLogged.segundoNombre = sNombre.value;
        userLogged.primerApellido = pApellido.value;
        userLogged.segundoApellido = sApellido.value;
        userLogged.telefono = telefono.value;
        let chequearDuplicado = listaUsuarios.findIndex(obj => {
            return obj.correo === userLogged.correo;
        });
        if (chequearDuplicado !== -1) {
            listaUsuarios[chequearDuplicado] = userLogged;
            localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
        }
        localStorage.setItem("usuario", JSON.stringify(userLogged));
    }
})

if(imagenUsuario == null) {
    document.getElementById("profileImage").setAttribute("src", "/img/user image.png")
}

document.getElementById("archivo").addEventListener("change", function() {
    let archivo = new FileReader();
    archivo.readAsDataURL(this.files[0])
    archivo.addEventListener("load", function(){
        localStorage.setItem("imagenCargada", archivo.result)
    })
    document.getElementById("profileImage").setAttribute("src", imagenUsuario);


})
