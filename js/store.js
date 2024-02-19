
import { productsInStock } from "./main.js"

JSON.parse(sessionStorage.getItem("store")) === null && sessionStorage.setItem("store",JSON.stringify([]))

document.addEventListener("DOMContentLoaded", () => {
    drawStore()
})

let store = JSON.parse(sessionStorage.getItem("store"))

const listStore = document.getElementById("items") 
const footStore = document.getElementById("totals")
const btnStore = document.getElementById("btnStore")

const storeTable = document.getElementById("store")

btnStore.addEventListener("click", () => {
    drawStore()
    if (storeTable.style.display === "block"){
        storeTable.style.display = "none"
    }else{
        storeTable.style.display = "block"
        drawStore()
    }
})

export const buyProduct = (idProduct) => {
    

    const product = productsInStock.find((product) => product.id === idProduct)

    const { name, price, image, id} = product

    const productStore = store.find((product) => product.id === idProduct)

    if(productStore === undefined){
        const newProductStore = {
            id: id,
            name: name,
            price: price,
            image: image,
            units: 1
        }
    store.push(newProductStore)
    
    sessionStorage.setItem("store", JSON.stringify(store))
    }else{
        const indexProductStore = store.findIndex((product) => product.id === idProduct)

        store[indexProductStore].units++
        store[indexProductStore].price = price * store[indexProductStore].units

        sessionStorage.setItem("store", JSON.stringify(store))
    }
    store = JSON.parse(sessionStorage.getItem("store"))

    Swal.fire({
        icon: 'success',
        title: 'Added to Cart',
        text: `${name} was added to cart`,
    });

}

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
        <button id="+${id}" class="btn btn-success">+</button>
        <button id="-${id}" class="btn btn-danger">-</button>
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

const generateTotals = () => {
    const totalCost = store.reduce((total, { price} ) => total + price, 0)
    // const totalQuantity = store.reduce((total, {Quantity} ) => total + Quantity, 0)
    const totalQuantity = store.reduce((total, { units }) => total + units, 0);
    return {
        totalCost: totalCost,  
        totalQuantity: totalQuantity,
    }
}

const increaseQuantity = (id) => {

    const indexProductStore = store.findIndex((product) => product.id === id)
    const price = store[indexProductStore].price / store[indexProductStore].units

    store[indexProductStore].units++
    store[indexProductStore].price = price*store[indexProductStore].units

    sessionStorage.setItem("store", JSON.stringify(store))

    drawStore()
}


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