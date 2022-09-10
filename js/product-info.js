let productsID = localStorage.getItem("productID");
let productInfo = [];
let productComments = [];

function showProductInfo() {
    let htmlProducInfoContentAppend =
        `<div>
        <h2>${productInfo.name}
        </h2>
        <hr>
        </div>
        <div>
        <h4> Precio </h4>
        <p>${productInfo.currency} ${productInfo.cost}</p>
        <h4> Descripcion </h4>
        <p>${productInfo.description}</p>
        <h4> Categoria </h4>
        <p>${productInfo.category}</p>
        <h4> Cantidad de vendidos </h4>
        <p>${productInfo.soldCount}</p>
        </div>
        <div class="row">
        <h4> Imagenes ilustrativas </h4>
        <img src="${productInfo.images[0]}" alt="${productInfo.description}" class="img-thumbnail col-3">
        <img src="${productInfo.images[1]}" alt="${productInfo.description}" class="img-thumbnail col-3">
        <img src="${productInfo.images[2]}" alt="${productInfo.description}" class="img-thumbnail col-3">
        <img src="${productInfo.images[3]}" alt="${productInfo.description}" class="img-thumbnail col-3">
        </div>
        </div>
    `;
    /* 
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
     </div>`;*/
    document.getElementById("containerProductInfo").innerHTML = htmlProducInfoContentAppend;
};

document.addEventListener("DOMContentLoaded", function () {
    getJSONData(PRODUCT_INFO_URL + productsID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productInfo = resultObj.data;
            showProductInfo(productInfo);

        }
    })
    getJSONData(PRODUCT_INFO_COMMENTS_URL + productsID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productComments = resultObj.data;
        }
    })
})

/* `
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
            </div>`*/