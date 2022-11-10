let usuarioJapID = localStorage.getItem("usuarioJap");
let cart_Array_Jap = {};
let carritoDelLocalStorage = JSON.parse(localStorage.getItem("carrito"));
let validacionCarrito = document.querySelectorAll('.needs-validation');
let tarjetaCredito = document.getElementById("tCredito");
let numeroTarjeta = document.getElementById("nTarjeta");
let codigoSeguridad = document.getElementById("codigoSeguridad");
let vencimientoTarjeta = document.getElementById("vencimiento");
let transferenciaBancaria = document.getElementById("tBancaria");
let numeroCuenta = document.getElementById("nCuenta");
let botonFormaPago = document.getElementById("botonFormaPago");
let opcionesPago = document.getElementById("opcionesPago");
let direccionCalle = document.getElementById("Calle");
let direccionNumero = document.getElementById("Esquina");
let direccionEsquina = document.getElementById("Numero");
let botonDetallesEntrega = document.getElementById("botonDetallesEntrega");

//Se crea esta iteracion para que cambie en tiempo real el aviso en los links de forma de pago y direccion de envio
//de que falta que se complete un campo
for (const input of validacionCarrito) {
    input.addEventListener("input", function () {
        estadoValidacionesPago();
        estadoValidacionesDetallesEntrega();
    })
}
//se creat esta funcion para agregar las validaciones al link de informacion de envio
function estadoValidacionesDetallesEntrega() {
    let validacionEnvio = false
    if (!direccionCalle.checkValidity() || !direccionNumero.checkValidity() || !direccionEsquina.checkValidity()) {
        botonDetallesEntrega.classList.add("is-invalid");
        botonDetallesEntrega.classList.add("text-danger")
        botonDetallesEntrega.classList.remove("is-valid")
    }
    else {
        botonDetallesEntrega.classList.remove("is-invalid");
        botonDetallesEntrega.classList.remove("text-danger")
        botonDetallesEntrega.classList.add("is-valid")
        validacionEnvio = true
    }
    return validacionEnvio
}

//Se crea esta funcion para agregar las validaciones al link de formas de pago y 
//desabilitar los campos que no seran usados en la forma de pago no seleccionada
function estadoValidacionesPago() {
    if (!tarjetaCredito.checked && !transferenciaBancaria.checked) {
        opcionesPago.classList.add("is-invalid");
        botonFormaPago.classList.add("is-invalid");
        botonFormaPago.classList.add("text-danger")
    }
    else if (tarjetaCredito.checked && !transferenciaBancaria.checked) {
        /* document.getElementById("tBancariaInfo").classList.add("d-none");
         document.getElementById("tCreditoInfo").classList.remove("d-none");*/
        transferenciaBancaria.checked = false;
        numeroCuenta.setAttribute("disabled", "");
        numeroTarjeta.removeAttribute("disabled");
        codigoSeguridad.removeAttribute("disabled");
        vencimientoTarjeta.removeAttribute("disabled");
        if (numeroTarjeta.checkValidity() && codigoSeguridad.checkValidity() && vencimientoTarjeta.checkValidity()) {
            botonFormaPago.classList.remove("is-invalid");
            botonFormaPago.classList.remove("text-danger");
            botonFormaPago.classList.add("is-valid");
            opcionesPago.classList.remove("is-invalid");
        }
        else {
            botonFormaPago.classList.remove("is-valid");
            botonFormaPago.classList.add("is-invalid");
            botonFormaPago.classList.add("text-danger")
            opcionesPago.classList.remove("is-invalid");
        }
    }

    else if (transferenciaBancaria.checked && !tarjetaCredito.checked) {
        /*document.getElementById("tCreditoInfo").classList.add("d-none");
        document.getElementById("tBancariaInfo").classList.remove("d-none");*/
        tarjetaCredito.checked = false;
        numeroCuenta.getAttribute("disabled");
        numeroCuenta.removeAttribute("disabled");
        numeroTarjeta.setAttribute("disabled", "");
        codigoSeguridad.setAttribute("disabled", "");
        vencimientoTarjeta.setAttribute("disabled", "");
        if (!numeroCuenta.checkValidity()) {
            botonFormaPago.classList.remove("is-valid");
            botonFormaPago.classList.add("is-invalid");
            botonFormaPago.classList.add("text-danger")
            opcionesPago.classList.remove("is-invalid");
        }
        else {
            botonFormaPago.classList.remove("is-invalid");
            botonFormaPago.classList.remove("text-danger");
            botonFormaPago.classList.add("is-valid");
            opcionesPago.classList.remove("is-invalid");
        }
    }
};
function validacionLinkPago() {
    let chequeado = false
    estadoValidacionesPago()
    if (tarjetaCredito.checked || transferenciaBancaria.checked){
        chequeado = true;
    }
    return chequeado
}

Array.prototype.slice.call(validacionCarrito)
    .forEach(function (validacionC) {
        validacionC.addEventListener('submit', function (event) {
            
            if (!validacionLinkPago() && !validacionC.checkValidity() && !estadoValidacionesDetallesEntrega()) {
                event.preventDefault();
                event.stopPropagation();
                console.log(validacionC.checkValidity())
            }

            validacionC.classList.add('was-validated')

        }, false)
    });
;


//agrega un item al carrito mediante el uso del metodo find index, este metidio me ubica el index del objeto en la lista
// si no lo ubica me retorna -1. Aca se agrega una condicional en la que si el index del objeto No es igual a -1
//le suma una unidad a la propiedad .count del objeto en la lista con el index que ha ubicado y actualiza la lista del
//local storage. La forma que usamos para localizar el objeto que apuntamos en la lista de objetos es dandole a
// a la funcion un parametro que sera el id del objeto
function agregarItemCarrito(id) {
    let itemPlus = carritoDelLocalStorage.findIndex(object => {
        return object.id === id;
    });
    if (itemPlus !== -1) {
        carritoDelLocalStorage[itemPlus].count += 1;
        localStorage.setItem("carrito", JSON.stringify(carritoDelLocalStorage));
        showCartList(carritoDelLocalStorage);
    }

}

function eliminarItemCarrito(id) {
    let itemMinus = carritoDelLocalStorage.findIndex(object => {
        return object.id === id;
    });
    if (itemMinus !== -1) {
        if (carritoDelLocalStorage[itemMinus].count >= 2) {
            carritoDelLocalStorage[itemMinus].count -= 1;
            localStorage.setItem("carrito", JSON.stringify(carritoDelLocalStorage));
            showCartList(carritoDelLocalStorage);
        }
        else {
            carritoDelLocalStorage.splice(itemMinus, 1);
            showCartList(carritoDelLocalStorage);
            localStorage.setItem("carrito", JSON.stringify(carritoDelLocalStorage));
        }
    }

}

function showCartList(listaCarrito) {
    let appendListaCarrito = "";
    let appendListaCarritoItem = "";
    let appendtotalCarrito = "";
    for (let i = 0; i < listaCarrito.length; i++) {
        let item = listaCarrito[i];
        let totalCarrito = listaCarrito[i];

        appendListaCarrito +=
            `
        <div class="card" id="${item.id}">
            <img src="${item.image}" class="card-img-top img-thumbnail mt-2" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">Costo: ${item.currency} ${item.unitCost}</p>
                    <div>
                    <button class="btn btn-primary"onclick="agregarItemCarrito(${item.id})" >+</button>
                    <button class="btn btn-danger float-end" onclick="eliminarItemCarrito(${item.id})" >-</button>
                    </div>
                </div>
        </div>
        
        `;
        appendListaCarritoItem +=
            `
        <li class="list-group-item"> ${item.count} x ${item.name} = ${item.currency} ${item.count * item.unitCost} 
        <button type="button" class="btn-close float-end"  aria-label="Close"></button>
        </li>
        
        `

        if (totalCarrito.currency === "UYU") {
            appendtotalCarrito = Number(appendtotalCarrito) + (totalCarrito.count * (totalCarrito.unitCost / 40))
        }
        else {
            appendtotalCarrito = Number(appendtotalCarrito) + (totalCarrito.count * totalCarrito.unitCost)
        }
    }
    document.getElementById("cart").innerHTML = appendListaCarrito;
    document.getElementById("cartInfoItem").innerHTML = appendListaCarritoItem;
    document.getElementById("subTotalCarrito").innerHTML = "USD " + formatoMoneda.format(appendtotalCarrito);
    if (document.getElementById("entregaStandard").checked = true) {
        document.getElementById("costoEnvio").innerHTML = "USD " + formatoMoneda.format(appendtotalCarrito * 0.05);
        document.getElementById("total").innerHTML = "USD " + formatoMoneda.format((appendtotalCarrito * 0.05) + appendtotalCarrito);
    }

    document.getElementById("entregaPremium").addEventListener("click", function () {
        if (document.getElementById("entregaPremium").checked = true) {
            document.getElementById("costoEnvio").innerHTML = "USD " + formatoMoneda.format(appendtotalCarrito * 0.15);
            document.getElementById("total").innerHTML = "USD " + formatoMoneda.format((appendtotalCarrito * 0.15) + appendtotalCarrito);
        }
    })
    document.getElementById("entregaExpress").addEventListener("click", function () {
        if (document.getElementById("entregaExpress").checked = true) {
            document.getElementById("costoEnvio").innerHTML = "USD " + formatoMoneda.format(appendtotalCarrito * 0.07);
            document.getElementById("total").innerHTML = "USD " + formatoMoneda.format((appendtotalCarrito * 0.07) + appendtotalCarrito);

        }
    })
    document.getElementById("entregaStandard").addEventListener("click", function () {
        if (document.getElementById("entregaStandard").checked = true) {
            document.getElementById("costoEnvio").innerHTML = "USD " + formatoMoneda.format(appendtotalCarrito * 0.05);
            document.getElementById("total").innerHTML = "USD " + formatoMoneda.format((appendtotalCarrito * 0.05) + appendtotalCarrito);
        }
    })

}


document.addEventListener("DOMContentLoaded", function () {
    getJSONData(CART_INFO_URL + usuarioJapID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cart_Array_Jap = resultObj.data.articles[0];
            //Se busca la lista que ya esta en el local storage para mostrar, si no hay una lista en localstorage (siendo su resultado null),
            // o si hay una lista pero esta vacia, se creara una lista vacia y se le agregara el objeto que nos da el carrito por defecto
            //Luego se agregara esa lista al local storage
            if (carritoDelLocalStorage == null || carritoDelLocalStorage.length === 0) {
                carritoDelLocalStorage = [];
                carritoDelLocalStorage.push(cart_Array_Jap);
            }
            localStorage.setItem("carrito", JSON.stringify(carritoDelLocalStorage));
            showCartList(carritoDelLocalStorage);

        }
    }
    );
    /*document.getElementById("boton-vaciar").addEventListener("click", function () {
        carritoDelLocalStorage = [];
        showCartList(carritoDelLocalStorage);

    })*/
});