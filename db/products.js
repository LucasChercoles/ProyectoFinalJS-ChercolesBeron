export const products = [
    {
        id: 1,
        name: "Processor-AMD",
        price: 118.751,
        image:"https://diamondsystemar.vtexassets.com/arquivos/ids/155972-500-auto?v=638013505179900000&width=500&height=auto&aspect=true",
        categories:"Pc components"
    },
    {
        id: 2,
        name: "Processor-INTEL",
        price: 175.672,
        image:"https://diamondsystemar.vtexassets.com/arquivos/ids/156024-500-auto?v=638013505466730000&width=500&height=auto&aspect=true",
        categories:"Pc components"
    },

    {
        id: 3,
        name: "MotherBoards-AMD",
        price: 184.999,
        image:"https://diamondsystemar.vtexassets.com/arquivos/ids/159313-500-auto?v=638246116296770000&width=500&height=auto&aspect=true",
        categories:"Pc components"
    },
    {
        id: 4,
        name: "MotherBoards-INTEL",
        price: 374.261,
        image:"https://diamondsystemar.vtexassets.com/arquivos/ids/158868-500-auto?v=638169106546800000&width=500&height=auto&aspect=true",
        categories:"Pc components"
    },
    {
        id: 5,
        name: "Keyboard",
        price: 51.565,
        image:"https://diamondsystemar.vtexassets.com/arquivos/ids/156716-500-auto?v=638024361048400000&width=500&height=auto&aspect=true",
        categories:"Peripherals"
    },
    {
        id: 6,
        name: "External-disk",
        price: 71.243,
        image:"https://diamondsystemar.vtexassets.com/arquivos/ids/155646-500-auto?v=638013503708370000&width=500&height=auto&aspect=true",
        categories:"Storage"
    },
    {
        id: 7,
        name: "Pendrive",
        price: 8.455,
        image:"https://diamondsystemar.vtexassets.com/arquivos/ids/158451-500-auto?v=638162298427970000&width=500&height=auto&aspect=true",
        categories:"Storage"
    },
    {
        id: 8,
        name: "MicroSD",
        price: 5.699,
        image:"https://diamondsystemar.vtexassets.com/arquivos/ids/155755-500-auto?v=638013504239700000&width=500&height=auto&aspect=true",
        categories:"Storage"
    },
    {
        id: 9,
        name: "Mouse",
        price: 77.499,
        image:"https://diamondsystemar.vtexassets.com/arquivos/ids/158498-500-auto?v=638162331481700000&width=500&height=auto&aspect=true",
        categories:"Peripherals"
    },
    {
        id: 10,
        name: "Headphone",
        price: 62.999,
        image:"https://diamondsystemar.vtexassets.com/arquivos/ids/159643-500-auto?v=638308345088800000&width=500&height=auto&aspect=true",
        categories:"Peripherals"
    },
    {
        id: 11,
        name: "Monitor",
        price: 199.999,
        image:"https://diamondsystemar.vtexassets.com/arquivos/ids/159533-500-auto?v=638294411178070000&width=500&height=auto&aspect=true",
        categories:"Peripherals"
    },
    {
        id: 12,
        name: "Monitor",
        price: 199.999,
        image:"https://diamondsystemar.vtexassets.com/arquivos/ids/159533-500-auto?v=638294411178070000&width=500&height=auto&aspect=true",
        categories:"Peripherals"
    }    
];
    
    
    JSON.parse(localStorage.getItem("products")) || localStorage.setItem("products", JSON.stringify(products));