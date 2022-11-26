const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
//se crea un metodo en una constante para crear un formato numerico
const  formatoMoneda = Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 });
let usuarioActivo = JSON.parse(localStorage.getItem('usuario'));


document.addEventListener("DOMContentLoaded", function (){
  if(window.location.href.indexOf("index.html") == -1) {
    if(usuarioActivo === "" || usuarioActivo === null) {
      window.location.href = "index.html";
    } 
  }
})




// se modifica el usuario para que sea un boton despegable mostrando diferentes opciones en las cuales te puede redireccionar
// en "cerrar sesion" limpia todo el local storage y te redirige a la pagina de login
document.getElementById("usuarioNav").innerHTML = `
    
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#"  role="button" data-bs-toggle="dropdown">
      ${usuarioActivo.correo}
      </a>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
        <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
        <li onclick="cerrarSesion()"><a class="dropdown-item" href="#" > Cerrar sesión</a></li>
      </ul>
    </li>
`;

function cerrarSesion() {
  localStorage.clear();
  window.location.href = "index.html";
};

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    //Fetch es una funcion que usa la API FETCH que nos permite realizar una solicitud de URL sin recargar la pagina
    //el fetch nos devuelve una promesa, es decir, nos promete devolver algo que va a ocurrir
    return fetch(url)
    //.then es parecido al await, se ejecuta solo cuando el fetch devuelva algo
    // el parametro del .then es una funcion que actua sobre lo que nos devuelve el fetch
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}