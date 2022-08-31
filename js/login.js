let email = document.getElementById("email")
let clave = document.getElementById("clave")

document.getElementById("botonlogin").addEventListener("click", function redireccionar(){
if(email.value == "" || clave.value == "") {
    alert("completar campos")
    
}
else {
    window.location.href = "index.html";
    seteoLocalStorage();}

}
)

function seteoLocalStorage() {
    localStorage.setItem('usuario', email.value)
}