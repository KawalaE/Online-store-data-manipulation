const usersUrl = "https://fakestoreapi.com/users";
const productsUrl = "https://fakestoreapi.com/products"
const cartsUrl = "https://fakestoreapi.com/carts"



function calcDistance(lat1, lon1, lat2, lon2){
    return Math.acos(Math.sin(lat1)*Math.sin(lat2)+Math.cos(lat1)*Math.cos(lat2)*Math.cos(lon2-lon1))*6371;
}


async function getUsers(){
    const response = await fetch(usersUrl);
    const userData = await response.json();
    userNumber = console.log(userData.length);
    console.log(userData);
    console.log(userData[0].address.geolocation.lat);


}
async function getCarts(){
    const response = await fetch(cartsUrl);
    const cartsData = await response.json();
    console.log(cartsData);
}

async function getProducts(){
    const response = await fetch(productsUrl);
    const productsData = await response.json();
    console.log(productsData);
    return productsData;
}
 async function categoriesValue(){
    const products = await getProducts();
    const productCat = new Map;
    for(let i = 0; i< products.length; i++){
        let currentCat = products[i].category;
        let currentPrice = products[i].price;
        if(!productCat.has(currentCat)){
            productCat.set(currentCat, currentPrice);
        }
        else {
            let oldValue = productCat.get(currentCat) ;
            let newValue = oldValue + currentPrice;
            productCat.set(currentCat, newValue);
        }
    }
    for (const[key, value] of productCat){
        console.log(`${key}: ${value}`);
    }
    
}
categoriesValue();





