const products_autos_url = "https://japceibal.github.io/emercado-api/cats_products/101.json"
let products_autos_Array = [];

function showProductList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.products.length; i++){
        let products = array.products[i];

            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action" id="`+ products.id +`">
                <div class="row">
                    <div class="col-3">
                        <img src="` + products.image + `" alt="`+ products.description +`" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">
                            <h4>`+ products.name + " - " + products.currency + " " + products.cost +`</h4> 
                            <p> `+ products.description +`</p> 
                            </div>
                            <small class="text-muted">` + products.soldCount + ` artículos</small> 
                        </div>
    
                    </div>
                </div>
            </div>
            `
        }

        document.getElementById("container-productos").innerHTML = htmlContentToAppend;
    }


document.addEventListener("DOMContentLoaded", function(){
    getJSONData(products_autos_url).then(function(resultObj){
        if (resultObj.status === "ok"){
            products_autos_Array = resultObj.data
            showProductList(products_autos_Array)
        
        }
    }
    )
    })