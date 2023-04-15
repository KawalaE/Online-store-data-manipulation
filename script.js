const usersUrl = "https://fakestoreapi.com/users";
const productsUrl = "https://fakestoreapi.com/products"
const cartsUrl = "https://fakestoreapi.com/carts"

async function getUsers(){
    const response = await fetch(usersUrl);
    const userData = await response.json();
    console.log(userData);
}

async function getProducts(){
    const response = await fetch(productsUrl);
    const productData = await response.json();
    console.log(productData);
}

async function getCarts(){
    const response = await fetch(cartsUrl);
    const cartsData = await response.json();
    console.log(cartsData);
}

getUsers();

function calcDistance(lat1, lon1, lat2, lon2){
    return Math.acos(Math.sin(lat1)*Math.sin(lat2)+Math.cos(lat1)*Math.cos(lat2)*Math.cos(lon2-lon1))*6371;
}
console.log(calcDistance(-37.3159, 81.1496, 40.3467, -30.1310))