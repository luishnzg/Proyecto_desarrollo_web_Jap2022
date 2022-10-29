let usuarioJapID = localStorage.getItem("usuarioJap");
let cart_Array_Jap = {};
let carritoDelLocalStorage = JSON.parse(localStorage.getItem("carrito"));


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
        <li class="list-group-item text-right"> ${item.count} x ${item.name} = ${item.currency} ${item.count * item.unitCost} 

        </li>
        `
        
        if(totalCarrito.currency === "UYU")
        {
        appendtotalCarrito = Number(appendtotalCarrito) + (totalCarrito.count * (totalCarrito.unitCost / 40))}
        else {
            appendtotalCarrito = Number(appendtotalCarrito) + (totalCarrito.count * totalCarrito.unitCost)
        }
      }
    document.getElementById("cart").innerHTML = appendListaCarrito;
    document.getElementById("cartInfoItem").innerHTML = appendListaCarritoItem;
    document.getElementById("subTotalCarrito").innerHTML = "USD " + appendtotalCarrito.toFixed(2);


    if (document.getElementById("flexRadioDefault3").checked === true) {
        document.getElementById("costoEnvio").innerHTML = "USD " + (appendtotalCarrito * 0.05).toFixed(2);
        document.getElementById("total").innerHTML = "USD " + ((appendtotalCarrito * 0.05) + appendtotalCarrito).toFixed(2);
    }
    document.getElementById("flexRadioDefault3").addEventListener("click", function (){
        document.getElementById("flexRadioDefault3").checked = true;
        document.getElementById("flexRadioDefault2").checked = false;
        document.getElementById("flexRadioDefault1").checked = false;
        document.getElementById("costoEnvio").innerHTML = "USD " + (appendtotalCarrito * 0.05).toFixed(2);
        document.getElementById("total").innerHTML = "USD " + ((appendtotalCarrito * 0.05) + appendtotalCarrito).toFixed(2);
    })
    document.getElementById("flexRadioDefault2").addEventListener("click", function (){
        document.getElementById("flexRadioDefault2").checked = true;
        document.getElementById("flexRadioDefault3").checked = false;
        document.getElementById("flexRadioDefault1").checked = false;
        document.getElementById("costoEnvio").innerHTML = "USD " + (appendtotalCarrito * 0.07).toFixed(2);
        document.getElementById("total").innerHTML = "USD " + ((appendtotalCarrito * 0.07) + appendtotalCarrito).toFixed(2);

    })
    document.getElementById("flexRadioDefault1").addEventListener("click", function (){
        document.getElementById("flexRadioDefault1").checked = true;
        document.getElementById("flexRadioDefault3").checked = false;
        document.getElementById("flexRadioDefault2").checked = false;
        document.getElementById("costoEnvio").innerHTML = "USD " + (appendtotalCarrito * 0.15).toFixed(2);
        document.getElementById("total").innerHTML = "USD " + ((appendtotalCarrito * 0.15) + appendtotalCarrito).toFixed(2);
    })
    
}


document.addEventListener("DOMContentLoaded", function () {
    getJSONData(CART_INFO_URL + usuarioJapID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cart_Array_Jap = resultObj.data.articles[0];
//Se busca la lista que ya esta en el local storage para mostrar, si no hay una lista en localstorage (siendo su resultado null),
// o si hay una lista pero esta vacia, se creara una lista vacia y se le agregara el objeto que nos da el carrito por defecto
//Luego se agregara esa lista al local storage
           if (carritoDelLocalStorage == null || carritoDelLocalStorage.length === 0){
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