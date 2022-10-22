let productsID = localStorage.getItem("productID");
let productInfo;
let productComments = [];
let newObj = {};
let localstorageList = JSON.parse(localStorage.getItem("carrito"));

//descargar lista del local storage y agregarle a esa lista el producto y luego subir de nuevo la lista al local storage
function addProduct() {
    
    let productToCart = {};
    productToCart.id = productInfo.id;
    productToCart.name = productInfo.name;
    productToCart.count = 1;
    productToCart.unitCost = productInfo.cost;
    productToCart.currency = productInfo.currency;
    productToCart.image = productInfo.images[0];
     //duplicateItem buscara si hay un objeto repetido en la lista de objetos del local storage
     //esto lo hace iterando a traves de todos los IDs, si no encuentra algo igual retornara -1
     //al retornar -1 podra incluir el objeto que no encontro en la lista
     let duplicateItem = localstorageList.findIndex(object => {
        return object.id === productToCart.id;
    });
        if(duplicateItem == -1){
            localstorageList.push(productToCart);
            console.log(duplicateItem)
        };
    localStorage.setItem("carrito", JSON.stringify(localstorageList))
};

function printImages(x) {
    let appendCarousel = "";
    for (let i = 0; i < x.images.length; i++) {
        let img = x;
        // appendCarousel += `<img src="${img.images[i]}">`;
        if (img.images[i] == img.images[0]) {
            appendCarousel +=
                `
        <div class="carousel-item active">
        <img src="${img.images[i]}" class="d-block w-100" alt="">
      </div>
      `
        }
        else {
            appendCarousel +=
                `
        <div class="carousel-item">
      <img src="${img.images[i]}" class="d-block w-100" alt="">
    </div>
        `

        }
    }

    document.getElementById("carousel2").innerHTML = appendCarousel;
};
function showProductInfo(x) {
    let array = x;
    let htmlProducInfoContentAppend =
        `
      <div class="mt-5">
      <div class="row mb-5">
            <h2 class="col">${array.name}</h2>
            <button class="btn btn-success col-1" onclick="addProduct()">Comprar</button>
        </div>
        <hr>
        <div>
        
            <h4> Precio </h4>
            <p>${array.currency} ${array.cost}</p>
            <h4> Descripcion </h4>
            <p>${array.description}</p>
            <h4> Categoria </h4>
            <p>${array.category}</p>
            <h4> Cantidad de vendidos </h4>
            <p>${array.soldCount}</p>
        </div>
        </div>
    `;
    document.getElementById("containerProductInfo").innerHTML = htmlProducInfoContentAppend;
};

//funcion que me cambia el ID del producto y me redirige de nuevo a la pagina product-info
function setRelatedProductID(id) {
    localStorage.setItem("productID", id);
    window.location.href = "product-info.html";
}
//Funcion que muestra los productos relacionados indicados en el producto
function showRelatedProducts(x) {

    let htmlRelatedProductAppend = "";
    for (let i = 0; i < x.relatedProducts.length; i++) {
        let otherProduct = x.relatedProducts[i];
        htmlRelatedProductAppend +=
            `<img src="${otherProduct.image}" class="img-thumbnail  col-3 " alt="${otherProduct.name}" onclick="setRelatedProductID(${otherProduct.id})">`;

    }
    document.getElementById("relatedProducts").innerHTML = htmlRelatedProductAppend;

};


function printComments(x) {
    let htmlProducInfoContentAppend = "";
    for (let i = 0; i < x.length; i++) {
        let array = x[i];
        let estrellas = "";
        for (let x = 0; x < 5; x++) {
            if (x < array.score) {
                estrellas += `<span class="fa fa-star checked"></span>`;
            } else {
                estrellas += `<span class="fa fa-star text-dark"></span>`;
            }
        }

        htmlProducInfoContentAppend +=
            `
    <div class="list-group-item list-group-item-action" id=${array.product}>  
    <p><span style="font-weight:bold">${array.user}</span> - ${array.dateTime} - <span> ${estrellas} </span></p>
    <p>${array.description} </p>
    </div>

    `;
        document.getElementById("containerProductInfoComments").innerHTML = htmlProducInfoContentAppend;


    }

};


document.addEventListener("DOMContentLoaded", function () {
    getJSONData(PRODUCT_INFO_URL + productsID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productInfo = resultObj.data;
            showProductInfo(productInfo);
            printImages(productInfo);
            showRelatedProducts(productInfo);
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL + productsID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productComments = resultObj.data;
            printComments(productComments);
        }
    });


    document.getElementById("productInfoCommentBtn").addEventListener("click", function () {

        let options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }
        let date = new Date().toLocaleDateString("sv-SE", options);
        newObj.product = Number(localStorage.getItem('productID'));
        newObj.score = Number(document.getElementById("scoreListInput").value);
        newObj.description = document.getElementById("opinion").value;
        newObj.user = localStorage.getItem('usuario');
        newObj.dateTime = date;
        productComments.push(newObj);
        printComments(productComments);
        document.getElementById("opinion").value = "";
        document.getElementById("scoreListInput").value = "";
        delete newObj.product;
        delete newObj.score;
        delete newObj.description;
        delete newObj.user;
        delete newObj.dateTime;

    })

//Si no valor en la variable local storage list que trae los valores de una lista del ocal storage entonces hace
//una lista vacia
    if (localstorageList == null) {
        localstorageList = [] 
    }
   
})

