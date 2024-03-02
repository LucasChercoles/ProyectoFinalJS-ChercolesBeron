import { buyProduct } from "./store.js";


// Obtiene referencia al elemento del DOM donde se mostrarán los productos
const divProducts = document.getElementById("products")

// Obtiene los productos del almacenamiento local
export let productsInStock = JSON.parse(localStorage.getItem("products"))

// Array para almacenar los datos exportados
export let dataToExport = [];

// Ejecuta el código cuando el contenido del DOM ha sido cargado
document.addEventListener("DOMContentLoaded", () => {
    cardsProducts(productsInStock)
})

// Función para mostrar las cartas de los productos
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
                <button id="add${id}" class="btnAddCard">Add to Car</button>
                </div>
            </div>
            </div>
        </div>`;
        
        divProducts.appendChild(card);
        
        const add = document.getElementById(`add${id}`)
        add.addEventListener("click", () => buyProduct(id))
    });
};    


// Función asíncrona para obtener y generar las cartas de productos desde un archivo .JSON
export const cardsProductsAsync = async () => {
    try {
        const response = await fetch("../db/data.json");
        const data = await response.json();
        dataToExport = data;
        
        data.forEach((product) => {
            const { id, name, image, categories, price } = product;

            let card = document.createElement("div");
            card.className = "products";
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
                    <button id="add${id}" class="btnAddCard">Add to Cart</button>
                    </div>
                </div>
                </div>
            </div>`;

            divProducts.appendChild(card);

            const add = document.getElementById(`add${id}`);
            add.addEventListener("click", () => buyProduct(id));
        });
    } catch (error) {
        console.log(error);
    }
};

document.addEventListener("DOMContentLoaded", async () => {
    await cardsProductsAsync();
});

