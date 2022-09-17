let productsID = localStorage.getItem("productID");
let productInfo;
let productComments = [];
function printImages(x) {
    let htmlProducInfoContentAppendTittle =  `<div> <h4> Imagenes ilustrativas </h4></div> <br>`;
    let htmlProducInfoContentAppend = "";
    for (let i = 0; i < x.images.length; i++) {
        let array = x;
        htmlProducInfoContentAppend += 
        `<img src="${array.images[i]}" alt="${array.description}" class="img-thumbnail col-3">`;
        
    }
    document.getElementById("containerProductInfoImages").innerHTML = htmlProducInfoContentAppendTittle +  htmlProducInfoContentAppend;

};
function showProductInfo(x) {
    let array = x;
   let htmlProducInfoContentAppend =
      `
      <div>
      <div style="margin:50px">
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

function printComments(x) {
    let htmlProducInfoContentAppend = "";
for (let i = 0; i < x.length; i++) {
    let array = x[i];
    htmlProducInfoContentAppend += 
    `
    <div id=${array.product}>
    <p>${array.description} </p>
    </div>

    `;
    document.getElementById("containerProductInfoComments").innerHTML = htmlProducInfoContentAppend;

    
}

};

/*"product": 50921,
"score": 3,
"description": "Ya llevo un año con este auto y la verdad que tiene sus ventajas y desventajas",
"user": "juan_pedro",
"dateTime": "2020-02-25 18:03:52"
},*/

document.addEventListener("DOMContentLoaded", function () {
    getJSONData(PRODUCT_INFO_URL + productsID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productInfo = resultObj.data;
            showProductInfo(productInfo);
            printImages(productInfo);

        }
    })
    getJSONData(PRODUCT_INFO_COMMENTS_URL + productsID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productComments = resultObj.data;
            printComments(productComments);
        }
    })
})

