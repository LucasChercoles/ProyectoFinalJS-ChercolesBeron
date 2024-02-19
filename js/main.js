import { buyProduct } from "./store.js"

const divProducts = document.getElementById("products")

export let productsInStock = JSON.parse(localStorage.getItem("products"))

document.addEventListener("DOMContentLoaded", () => {
    cardsProducts(productsInStock)
})

export const cardsProducts = (products) => {
    divProducts.innerHTML ="";

    products?.forEach( (product) => {

        const {image, name, categories, price, id } = product
        
        let card = document.createElement("div")

        card.className = "products"
        card.innerHTML = `
        <div class="card mb-3" id="cardProduct";">
        <div class="row g-0">
            <div class="col-md-4 id="image"">
                <img src="${image}" id="pic" class="img-fluid " alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">${categories}</p>
                <p class="card-text">Price: <b>$${price}</b></p>
                <buttton id="add${id}" class="btn btn-primary">Add to Car</button>
                </div>
            </div>
            </div>
        </div>`;
        
        divProducts.appendChild(card);
        
        const add = document.getElementById(`add${id}`)
        add.addEventListener("click", () => buyProduct(id))
    });
};