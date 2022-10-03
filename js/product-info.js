let productsID = localStorage.getItem("productID");
let productInfo;
let productComments = [];
let newObj = {};

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
     else  {
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
      <div>
      <div class="mt-4 mb-4">
            <h2>${array.name}
            </h2>
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

    let htmlRelatedProductAppend ="";
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
    for(let x = 0; x < 5; x++){
        if(x < array.score){
            estrellas += `<span class="fa fa-star checked"></span>`;
        }else{
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
    

    document.getElementById("productInfoCommentBtn").addEventListener("click", function (){
        
        let options = {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'}
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
    
})

