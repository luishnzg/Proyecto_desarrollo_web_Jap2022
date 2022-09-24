let catID = localStorage.getItem("catID");
let products_Array = [];
let min = undefined;
let max = undefined;

function showProductList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.products.length; i++) {
        let products = array.products[i];
        products.cost = parseInt(products.cost);
        if ((products.cost >= min || min == undefined) && (products.cost <= max || max == undefined)) {
            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action" onclick="setProductID(${products.id})">
                <div class="row">
                    <div class="col-3">
                        <img src="${products.image}" alt="${products.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">
                            <h4>${products.name} - ${products.currency} ${products.cost}</h4> 
                            <p>${products.description}</p> 
                            </div>
                            <small class="text-muted">${products.soldCount} artículos</small> 
                        </div>
    
                    </div>
                </div>
            </div>`;
            document.getElementById("container-productos").innerHTML = htmlContentToAppend;
        }
        else {
            document.getElementById("container-productos").innerHTML = htmlContentToAppend;
        }
    }
    
}


function setProductID(id) {
    localStorage.setItem("productID", id);
   window.location.href = "product-info.html";
}

document.addEventListener("DOMContentLoaded", function () {
    //Se modifica el getjsondata  para que busque la contsante donde estan todos los productos
    //se concatena con la variable catID que usa get item para buscar el ID de la llave cat ID que 
    //lleva cada categoria del producto cuando hago click en una categoria de productos en categories.js
    getJSONData(PRODUCTS_URL + catID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            products_Array = resultObj.data
            showProductList(products_Array)

        }
    }
    )
    


    document.getElementById("filtrarProductos").addEventListener("click", function () {

        if (document.getElementById("min-precio").value != "") {
            min = parseInt(document.getElementById("min-precio").value);
        }
        else {
            min = undefined;
        }
        if (document.getElementById("max-precio").value != "") {
            max = parseInt(document.getElementById("max-precio").value);
        }
        else {
            max = undefined;
        }

        showProductList(products_Array)
    })
    document.getElementById("limpiarProductos").addEventListener("click", function () {
        min = undefined;
        max = undefined;
        document.getElementById("max-precio").value = "";
        document.getElementById("min-precio").value = "";
        showProductList(products_Array);



    })
    document.getElementById("ordenarAsc").addEventListener("click", function () {
        products_Array.products.sort(function (a, b) {
            return parseInt(b.cost) - parseInt(a.cost)
        })
        showProductList(products_Array);
    })
    document.getElementById("ordenarDesc").addEventListener("click", function () {
        products_Array.products.sort(function (a, b) {
            return parseInt(a.cost) - parseInt(b.cost)
        })
        showProductList(products_Array);
    })
    document.getElementById("ordenarArticulo").addEventListener("click", function () {
        products_Array.products.sort(function (a, b) {
            return parseInt(b.soldCount) - parseInt(a.soldCount)
        })
        showProductList(products_Array);
    })

    //Evento de escucha para que al hacer click a un producto se rediriga a product-info



})

