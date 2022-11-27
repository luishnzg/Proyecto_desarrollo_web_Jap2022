let userLogged = JSON.parse(localStorage.getItem("usuario"));
let pNombre = document.getElementById("primerNombre");
let sNombre = document.getElementById("segundoNombre");
let pApellido = document.getElementById("primerApellido");
let sApellido = document.getElementById("segundoApellido");
let correo = document.getElementById("emailProfile");
let telefono = document.getElementById("telefono");
let listaUsuarios = JSON.parse(localStorage.getItem("listaUsuarios"))
let imagenUsuario = localStorage.getItem("imagenCargada");
let imagenPredeterminada = "/img/user image.png"

//codigo que me permite darle valor a los inputs, si se accede por primera vez  esta pagina
//los inpust estaran vacios
correo.value = userLogged.correo;
pNombre.value = userLogged.primerNombre;
sNombre.value = userLogged.segundoNombre;
pApellido.value = userLogged.primerApellido;
sApellido.value = userLogged.segundoApellido;
telefono.value = userLogged.telefono;

//codigo que ejecuta la funvion de validacion de campos obligatorios cuando hay un cambio o escribo en los inputs
    pNombre.addEventListener("input", function () {
        validacionPeril()
    });
    pApellido.addEventListener("input", function () {
        validacionPeril()
    });

//funcion que me permite validar los campos obligatorios de primer nombre y primer apellido.
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


//escucha de evento del boton de guardar cambio que al hacer click en el boton activa la funcion
// de validacion de los inputs y guarda los valores de los inputs en el objeto del usuario
//activo. Tambien chequea si no hay un usuario dupicado en la lista de usuarios, lo agrega a la lista
//pero si ya hay un usuario a la lista cambia el valor de ese usuario y actualiza la lista de usuario en
//el localstorage.
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

//codigo que hace que al cambiar o seleccionar un archivo del input type file ejecuta una funcion que hace que
// por medio del constructor filereader() se acceda al objeto file seleecionado en un objeto legible.
//Luego, con el metodo readAsdataURL convierte a ese objeto file (que viene en una lista filelist) en 
//data URL que pasa a ser un valor de tipo string. Al ser un string podemos pasarlo al local storage para ser 
//guardado. En este caso use ese string para hacerlo un valor de la propiedad imagen de mi objeto que es la data del usuario
//que esta logueado.

document.getElementById("archivo").addEventListener("change", function () {
    const archivo = new FileReader();
    archivo.readAsDataURL(this.files[0]);
    archivo.addEventListener("load", function () {
        console.log(archivo.result);
        userLogged.imagen = archivo.result;
        localStorage.setItem("usuario", JSON.stringify(userLogged));
        document.getElementById("profileImage").setAttribute("src", userLogged.imagen);
    })
})

//codigo qu muestra si el valor de la propiedad imagen de mi objeto del usuario logueado no esta disponible me muestra
//una imagen por default, si no me muestra lo que tiene como valor la propiedad imagen de mi objeto.
document.addEventListener("DOMContentLoaded", function () {
    if (userLogged.imagen == undefined || userLogged.imagen == "" || userLogged.imagen == null) {
        document.getElementById("profileImage").setAttribute("src", "/img/user image.png");
    }
    else { document.getElementById("profileImage").setAttribute("src", userLogged.imagen); }
})
