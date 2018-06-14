let latitude = ''
    longitude = ''
    id_entity = ''
    type_entity = ''

    w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    w = w +"px";
/*$( document ).ready(function() {
  function RespImage() {

  }
});*/

$(".height").css("height", w);


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
                count: 8,
            },
            headers: {
                "user-key": "f7b021777643a1e7a87e4d0f3a2792ff"
            },
            success: Collection,
            error: GeneralError
        })
}

function Nearby(near) {
  console.log(near)
  near.restaurants.forEach(function(item, i){
     $('.near').append(
       '<div class="row justify-content-center"><div class="col-sm align-self-center"><div class="card-near"><img class="near-img" src="'
       + item.restaurant.featured_image + '"/>' +
       '<span class="restaurant-card-title">' + item.restaurant.name +
       '</span></div></div></div>'

     )
  })
}

function Collection(collezioni){
    console.log(collezioni)
    collezioni.collections.forEach(function(item, i){
       $('.collection').append(
         '<div class="row"><div class="col-sm"><div class="card-coll"><h2>'
         + item.collection.title + '</h2>' +
         '<img class="coll-img" src="' + item.collection.image_url + '"/>' +
         '</span></div></div></div>'
       )
    })
}







if(navigator.geolocation){
    console.log('location service is active')
    navigator.geolocation.getCurrentPosition(success, error)

}
