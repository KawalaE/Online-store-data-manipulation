const usersUrl = "https://fakestoreapi.com/users";
const productsUrl = "https://fakestoreapi.com/products"
const cartsUrl = "https://fakestoreapi.com/carts"

let products;
let carts;
let users;
let cartIndex;
const map = L.map('map').setView([0, 0], 1);
let categories = document.getElementById('category');
let cartValueInfo = document.getElementById('cart-val');
let cartOwnerInfo = document.getElementById('cart-owner');
let usersInfo = document.getElementById('users');

async function getUsers(){
    const response = await fetch(usersUrl);
    users = await response.json();
}
async function getCarts(){
    const response = await fetch(cartsUrl);
    carts = await response.json();
}

async function getProducts(){
    const response = await fetch(productsUrl);
    products = await response.json();
}
function calcDistance(lat1, lon1, lat2, lon2){
    const radian = 57.2957795;
    lat1 /= radian;
    lat2 /= radian;
    lon1 /= radian;
    lon2 /= radian;
    return Math.acos(Math.sin(lat1)*Math.sin(lat2)+Math.cos(lat1)*Math.cos(lat2)*Math.cos(lon2-lon1))*6371;
}

function calcFurthestDistance(){
    let allUsersArray = new Array();
    let maxDistance = 0;
    let maxI = 0;
    let maxJ = 0;
    for(let j = 0; j < users.length; j++){
        let distance = 0;
        for(let i = 0; i <users.length; i++){
            if(j != i){
                distance = calcDistance(users[j].address.geolocation.lat, users[j].address.geolocation.long, users[i].address.geolocation.lat, users[i].address.geolocation.long);
                if(distance > maxDistance){
                    maxDistance = distance;
                    maxI = i;
                    maxJ = j;
                }
            }
        }
    }
    let usersDistHTML = document.createElement('div');
    usersDistHTML.textContent= `Max distance: ${maxDistance.toFixed(4)}km, Users living furthest (ID's): ${users[maxI].id}, ${users[maxJ].id}`;
    usersInfo.appendChild(usersDistHTML);

    console.log(`Max distance between users: ${maxDistance}km`);
    console.log(`Users living furthest (ID's): ${users[maxI].id}, ${users[maxJ].id}`);
    drawMarkers(users[maxI].address.geolocation.lat,users[maxI].address.geolocation.long, users[maxI].name.firstname,
       users[maxI].name.lastname, users[maxJ].address.geolocation.lat, users[maxJ].address.geolocation.long, users[maxJ].name.firstname,users[maxJ].name.lastname);
}
function capitalize(word){
    return  word.charAt(0).toUpperCase() + word.slice(1);

}
async function drawMap(){

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    
}

function drawMarkers(lat1, lon1, name1, last1, lat2, lon2, name2, last2){
    let clientMarker1 = L.marker([lat1, lon1]).addTo(map);
    let clientMarker2 = L.marker([lat2, lon2]).addTo(map);
    clientMarker1.bindPopup(`<b>${capitalize(name1)} ${capitalize(last1)}<b> <br>Latitude: ${lat1} Longitude: ${lon1}`).openPopup();
    clientMarker2.bindPopup(`<b>${capitalize(name2)} ${capitalize(last2)}<b> <br>Latitude: ${lat2} Longitude: ${lon2}`).openPopup();
}

function categoriesValue(){
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
        let newPosition = document.createElement('div');
        newPosition.textContent = `${key}: ${value.toFixed(2)}$`;
        categories.appendChild(newPosition);
    }
   
    
}

function getCartInfo(num){
    let cartArr = new Array();
    const cartCount = carts[num].products.length;
    for(let i = 0; i < cartCount; i++){
        const productID = carts[num].products[i].productId;
        const quantity = carts[num].products[i].quantity;
        cartArr.push([productID, quantity]);  
    }
    return cartArr;
}


function calcCartValue(){
    const cartNum = carts.length;
    const cartsValueArray = new Array();
    for(let j = 0; j < cartNum; j++){
        const currentCart = getCartInfo(j);
        let cartValue = 0;
        for(let i = 0; i < currentCart.length; i++){
            const productPrice = products[currentCart[i][0]-1].price;
            const productQuantity = currentCart[i][1];
            cartValue += productPrice * productQuantity;
    }
        cartsValueArray.push(cartValue);
    }
    return cartsValueArray;
}

function mostExpensiveCart(){
    const cartValues = calcCartValue();
    let maxPrice = 0;
    for(let i = 0; i < cartValues.length; i++){
        if (cartValues[i] > maxPrice){
            maxPrice = cartValues[i];
        }
    }
    cartIndex = cartValues.indexOf(maxPrice);
    let cartValHTML = document.createElement('div');
    cartValHTML.textContent = `${maxPrice}$`
    cartValueInfo.appendChild(cartValHTML);
    return `Most expensive cart ${maxPrice}`;
}


function cartOwner(){
    const userName = users[cartIndex].name.firstname;
    const userLastName = users[cartIndex].name.lastname;
    let cartOwnerHTML = document.createElement('div');
    cartOwnerHTML.textContent = `${capitalize(userName)} ${capitalize(userLastName)}`;
    cartOwnerInfo.appendChild(cartOwnerHTML);
    return `${userName} ${userLastName}`
}

drawMap();
getProducts().then(()=>{
    categoriesValue();
    getUsers().then(()=>{
        getCarts().then(()=>{
            calcCartValue()
            console.log(mostExpensiveCart())
            console.log(cartOwner());
            console.log(users);
            calcFurthestDistance();
            
            
        }); 
    }); 
}); 


