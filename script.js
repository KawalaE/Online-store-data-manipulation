const usersUrl = "https://fakestoreapi.com/users";


async function getUsers(){
    const response = await fetch(usersUrl);
    const userData = await response.json();
    console.log(userData);
}

getUsers();