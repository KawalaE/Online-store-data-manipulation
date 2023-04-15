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

getCarts();