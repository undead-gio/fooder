let latitude = ''
    longitude = ''
    id_entity = ''
    type_entity = ''

function success(position){
    latitude = position.coords.latitude
    longitude = position.coords.longitude
    $.ajax({
        url: 'https://developers.zomato.com/api/v2.1/geocode',
        dataType: 'json',
        data: {
            lat: latitude,
            lon: longitude,
        },
        headers: {
            "user-key": "f7b021777643a1e7a87e4d0f3a2792ff"
        },
        success: datiArrivati
    })
}

function error(err){
    console.error(err)
    alert("Per l'utilizzo di questa applicazione è necessaria la geolocalizzazione");
}

function GeneralError() {
  $('.error').append('<h2 class="error-message"> La ricerca non ha prodotto nessun risultato, prova a ricaricare la pagina :) </h2>');
}


function datiArrivati(city){
    console.log(city);
    id_entity = city.location.entity_id;
    type_entity = city.location.entity_type;
    $('#position').append(city.location.city_name + ', ' + city.location.title);

    $.ajax({
            url: 'https://developers.zomato.com/api/v2.1/search',
            dataType: 'json',
            data: {
                entity_id : id_entity,
                entity_type: type_entity,
                count: 10,
                lat: latitude,
                lon: longitude,
                radius: 3,
                sort: 'real_distance',
                order: 'asc'
            },
            headers: {
                "user-key": "f7b021777643a1e7a87e4d0f3a2792ff"
            },
            success: Nearby,
            error: GeneralError
        })

    $.ajax({
            url: 'https://developers.zomato.com/api/v2.1/collections',
            dataType: 'json',
            data: {
                lat: latitude,
                lon: longitude,
                count: 10,
            },
            headers: {
                "user-key": "f7b021777643a1e7a87e4d0f3a2792ff"
            },
            success: Collection,
            error: GeneralError
        })
}


function Collection(collezioni){
    console.log(collezioni)
    collezioni.collections.forEach(function(item, i){
       $('#card-coll').append(
            '<h2>' + item.collection.title + '</h2>' +
            '<img class="coll_img" src="' + item.collection.image_url + '"/>'
       )
    })
}


function Nearby(near) {
  console.log(near)
  near.restaurants.forEach(function(item, i){
     $('#card-near').append(
          '<img class="near-img" src="' + item.restaurant.photos_url + '"/>' +
          '<h1 class="restaurant-card-title">' + item.restaurant.name + '</h1>'
     )
  })
}






if(navigator.geolocation){
    console.log('location service is active')
    navigator.geolocation.getCurrentPosition(success, error)

}
