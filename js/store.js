

// Importa datos y funciones desde el archivo main.js
import { dataToExport, productsInStock } from "./main.js"

// Verifica si no hay datos en sessionStorage y los inicializa como un array vacío
JSON.parse(sessionStorage.getItem("store")) === null && sessionStorage.setItem("store",JSON.stringify([]))

// Ejecuta el código cuando el contenido del DOM ha sido cargado
document.addEventListener("DOMContentLoaded", () => {
    drawStore()
})

// Obtiene los datos de la tienda desde sessionStorage
let store = JSON.parse(sessionStorage.getItem("store"))

// Obtiene referencias a elementos del DOM
const listStore = document.getElementById("items") 
const footStore = document.getElementById("totals")
const btnStore = document.getElementById("btnStore")

const storeTable = document.getElementById("store")

const mainContent = document.getElementById("main-content");

//Evento click en el botón de la tienda

btnStore.addEventListener("click", () => {
    document.body.classList.toggle("blur-background");
    drawStore()
    storeTable.style.display = storeTable.style.display === "block" ? "none" : "block";
})

// Función para agregar un producto al carrito
export const buyProduct = (idProduct) => {
    let product = productsInStock.find(product => product.id === idProduct) || dataToExport.find(product => product.id === idProduct);

    const { name, price, image, id} = product;
    const productStore = store.find(product => product.id === idProduct);
    
    if (productStore === undefined) {
        const newProductStore = { id, name, price, image, units: 1 };
        store.push(newProductStore);
    } else {
        const indexProductStore = store.findIndex(product => product.id === idProduct);
        store[indexProductStore].units++;
        store[indexProductStore].price = price * store[indexProductStore].units;
    }
    
    sessionStorage.setItem("store", JSON.stringify(store));

    Swal.fire({
        icon: 'success',
        title: 'Added to Cart',
        text: `${name} was added to cart`,
    });
}


// Función para dibujar el contenido de la tienda
const drawStore = () => {
    listStore.innerHTML = ''

    store.forEach(product => {

        const { image, name, units, price, id} = product
        
        let body = document.createElement("tr")

        body.className = "productStore"

        body.innerHTML= `
        <th><img id="imgProducStore" src="${image}" class="card-img-top style="width:40%; height: 30%"</th>
        <td>${name}</td>
        <td>${units}</td>
        <td>$${(price /units).toFixed(2)}</td>
        <td>$${price.toFixed(2)}</td>
        <td>
        <button id="+${id}" class="btnAdd">+</button>
        <button id="-${id}" class="btnRest">-</button>
        </td>
        `
        listStore.append(body)

        const btnAdd = document.getElementById(`+${id}`)
        const btnRemove = document.getElementById(`-${id}`)
    
        btnAdd.addEventListener("click", () => increaseQuantity(id))
        btnRemove.addEventListener("click", () => removeQuantity(id))
    });

    drawFooter ()
    
}

// Función para dibujar el footer de la tabla de la tienda
const drawFooter = () => {

    if(store.length > 0){
        footStore.innerHTML = ""

        let footer = document.createElement("tr")

        footer.innerHTML = `
        <th><b>Totals:</b></th>
        <td></td>
        <td>${generateTotals().totalQuantity}</td>
        <td></td>
        <td>$${(generateTotals().totalCost.toFixed(2))}</td>
        `
        footStore.append(footer)
    }else{
        footStore.innerHTML = "<h3>Empty store</h3>"
    }

}


// Función para generar los totales de la compra
const generateTotals = () => {
    const totalCost = store.reduce((total, { price} ) => total + price, 0)
    // const totalQuantity = store.reduce((total, {Quantity} ) => total + Quantity, 0)
    const totalQuantity = store.reduce((total, { units }) => total + units, 0);
    return {
        totalCost: totalCost,  
        totalQuantity: totalQuantity,
    }
}

// Función para incrementar la cantidad de un producto en el carrito
const increaseQuantity = (id) => {

    const indexProductStore = store.findIndex((product) => product.id === id)
    const price = store[indexProductStore].price / store[indexProductStore].units

    store[indexProductStore].units++
    store[indexProductStore].price = price*store[indexProductStore].units

    sessionStorage.setItem("store", JSON.stringify(store))

    drawStore()
}

// Función para decrementar la cantidad de un producto en el carrito
const removeQuantity = (id) => {
    const indexProductStore = store.findIndex((product) => product.id === id)
    const price = store[indexProductStore].price / store[indexProductStore].units

    store[indexProductStore].units--
    store[indexProductStore].price = price*store[indexProductStore].units

    if(store[indexProductStore].units === 0){
        store.splice(indexProductStore, 1)
    }

    sessionStorage.setItem("store", JSON.stringify(store))

    drawStore()
}