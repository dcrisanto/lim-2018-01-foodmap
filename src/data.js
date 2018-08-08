
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCpnB9vTyrN4gofXODcWA3eOwVRKxYekb8",
    authDomain: "foodmap-f5806.firebaseapp.com",
    databaseURL: "https://foodmap-f5806.firebaseio.com",
    projectId: "foodmap-f5806",
    storageBucket: "foodmap-f5806.appspot.com",
    messagingSenderId: "625584056544"
};

const getDataBase = () => {
    return firebase.database();
}

// first
$(document).ready(() => {
    firebase.initializeApp(config);
    nameRestaurants();
});

//esta función muestra los restaurantes en pantalla
const showRestaurant = (restaurant) => {
    let listrestaurant = `<li id="${restaurant.id}" data-id="${restaurant.id}">`
        + `<div class="post">`
        + `<span>${restaurant.name}</span><br/></li>`;
    $('#show-list-restaurants').append(listrestaurant);

}

//esta función muestra los restaurantes filtrados en pantalla
const showRestaurantOnList = (restaurant) => {
    let restaurantWrapper = `<li id="${restaurant.id}" data-id="${restaurant.id}">`
        + `<div class="post">`
        + `<span>${restaurant.direction}</span><br/></li>`;
    $('#list-restaurants').append(restaurantWrapper);

}

const getAllRestaurants = (callback) => {
    getDataBase().ref('/restaurants/').once('value', callback);
}

$('#search').change(  ()=>{
    let search = $('#search').val();
    listRestaurantsFilter(search.toLowerCase());
})

const listRestaurantsFilter = (inputrestaurant) => {
    $('#list-restaurants').html('<p>Cargando restaurants...</p>');
    let callback = (snapshot) => {
        $('#list-restaurants').html('');
        snapshot.forEach((child) => {
            let dataRestaurant = child.val();
            let x = dataRestaurant.name;
            y = x.toLowerCase();
            if (y.includes(inputrestaurant)){
                showRestaurantOnList(dataRestaurant);

            }
            
        });
    };
    getAllRestaurants(callback);
}


const nameRestaurants = () => {
    $('#show-list-restaurants').html('<p>Cargando nombre de restaurantes...</p>');
    let callback = (snapshot) => {
        $('show-list-restaurants').html('');
        snapshot.forEach((child) => {
            showRestaurant(child.val());
        })
    };
    getAllRestaurants(callback);
}

