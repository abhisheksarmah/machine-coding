const restaturants = [
    {
        id: 1,
        name: "Bawarshi",
        location: "peoli Nagar",
        eta: 25,
        image: 'https://picsum.photos/300/200'
    },
    {
        id: 2,
        name: "Manbhari",
        location: "moran",
        eta: 15,
        image: 'https://picsum.photos/300/200'
    },
    {
        id: 3,
        name: "Food villa",
        location: "teok",
        eta: 10,
        image: 'https://picsum.photos/300/200'
    },
    {
        id: 4,
        name: "food court",
        location: "shilpukhuri",
        eta: 5,
        image: 'https://picsum.photos/300/200'
    }
]

function getRestaurantCard(restaurant) {
    const div = document.createElement('div');
    div.classList.add('card');
    
    div.innerHTML = `<img src="${restaurant.image}"/>
    <div class="text">
        <h3>${restaurant.name}</h3>
        <p>${restaurant.location} - ${restaurant.eta} minutes away</p>
    </div>
    <div class="footer">
        <button data-restaurant-id="${restaurant.id}">${ getFavouriteRestaurants().indexOf(`${restaurant.id}`) > -1 ? `Following` : `Follow` }</button>
    </div> 
    `;

    return div;
}

function generateRestaturantView(restaturants) {
    document.getElementById('generate-view').innerHTML = '';

    for (let index = 0; index < restaturants.length; index++) {
        const restaurant = restaturants[index];
        const restaurantDetails = getRestaurantCard(restaurant);

        document.getElementById('generate-view').appendChild(restaurantDetails)  ;
    }
}

generateRestaturantView(restaturants)

function searchRestaurants(target) {
    const query = target.value;

    const filteredRestaturants = restaturants.filter((restaurant) => {
        return restaurant.name.toLowerCase().search(query) > -1 || restaurant.location.toLowerCase().search(query) > -1
    })
    generateRestaturantView(filteredRestaturants)
}

function sortRestaurants() {
    const sortField = document.getElementById('sort').value;

    const sortedRestaurants = _.sortBy(restaturants, sortField);

    generateRestaturantView(sortedRestaurants);
}

function filterRestaurants(filterField) {
    const fieldValue = document.getElementById('filter').value;

    const filteredRestaturants = restaturants.filter((restaurant) => {
        return restaurant[filterField].search(fieldValue) > -1
    })
    generateRestaturantView(filteredRestaturants)
}

document.getElementById('generate-view').addEventListener('click', (e) => {
    e.preventDefault();
    const tagName = e.target.tagName;

    if (tagName !== 'BUTTON') {
        return;
    }

    const restaurantId = e.target.dataset.restaurantId;
    const favourites = getFavouriteRestaurants();
    const index = favourites.indexOf(restaurantId);
    if (index <= -1) {
        favourites.push(restaurantId);
    } else {
        favourites.splice(index, 1)
    }

    localStorage.setItem('fav', JSON.stringify(favourites));

    generateRestaturantView(restaturants)
})


function getFavouriteRestaurants() {
    return JSON.parse(localStorage.getItem('fav')) || [];
}

function getBookmarked() {
    const bookmarkedRestaturants = restaturants.filter((restaurant) => getFavouriteRestaurants().includes(`${restaurant.id}`));

    generateRestaturantView(bookmarkedRestaturants);
}