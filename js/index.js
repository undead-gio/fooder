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
    $('.near').css('display', 'none');
    $('.collection').css('display', 'none');
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
    $('.nav-loc').append(city.location.title);

    $.ajax({
            url: 'https://developers.zomato.com/api/v2.1/search',
            dataType: 'json',
            data: {
                entity_id : id_entity,
                entity_type: type_entity,
                count: 10,
                lat: latitude,
                lon: longitude,
                radius: 5,
                sort: 'real_distance',
                order: 'desc'
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
  console.log(near);
  near.restaurants.forEach(function(item, i){
    let priceRange;
    if(item.restaurant.price_range == 1){
      priceRange = "€";
    }
    else if (item.restaurant.price_range == 2) {
      priceRange = "€€";
    }
    else if (item.restaurant.price_range == 3) {
      priceRange = "€€€";
    }
    else if (item.restaurant.price_range == 4) {
      priceRange = "€€€€";
    }
     $('.near').append(
       '<div class="row"><div class="col-md-2"></div><div class="col-sm-12 col-md-8"><div class="card-near" data-id="' + item.restaurant.id + '">' +
       '<div class="row" style="height:100%">' +
         '<div class="col-sm-5" style="height:100%">' +
           '<img class="near-img" src="'
           + item.restaurant.featured_image + '"/>' +
         '</div>' +
         '<div class="col-sm-5 align-self-center">' +
           '<h3 class="restaurant-card-title no-marg cusines w-400">' + item.restaurant.cuisines +
           '</h3>'+
           '<h2 class="restaurant-card-title rest-name w-700">' + item.restaurant.name +
           '</h2>'+
           '<h4 class="restaurant-card-address no-marg rest-address w-300">' + item.restaurant.location.address +
           '</h4>'+
           '<h2 class="restaurant-card-title w-400 price" style="">' + priceRange +
           '</h2>'+
         '</div>' +
         '<div class="col-sm-1">' +
         '</div>' +
         '<div class="col-sm-2 rating">' +
          '<div class="cont-rec" style="background-color: #'+ item.restaurant.user_rating.rating_color +'">' +
             '<h2 class="restaurant-card-title w-700">' + item.restaurant.user_rating.aggregate_rating +
             '</h2>'+
          '</div>' +
          '<h3 class="restaurant-card-title votes w-300" style="text-align:center">' + item.restaurant.user_rating.votes+
          ' Voti</h3>'+
         '</div>' +
       '</div>' +
       '</div><div class="col-md-2"></div>' +
       '</div></div></div>'
     )
  })
  $('.card-near').click(function(event) {
    let id = $(this).data('id');
    console.log("Elemento cliccato", $(this).data('id'));

    /*$('.mod-page').animate({
  	   opacity:1
  	}, "slow", function(){
  		$(".mod-page").css({"display":"inline"})
  	});*/
  });
}

function Collection(collezioni){
    console.log(collezioni)
    collezioni.collections.forEach(function(item, i){
       $('.coll-row').append(
         '<div class="col-sm-12 col-md-3 ow-pad">' +
            '<div class="card-coll" style="background-image:url('+ item.collection.image_url +')">' +
            '<div class="cover-coll"></div>' +
            '<div class="all-text-coll">' +
             '<h2 class="title-coll w-800 coll-title no-marg">' + item.collection.title + '</h2>' +
             '<h4 class="descr-coll w-300 coll-descr no-marg">'
             + item.collection.description + '</h4>' +
             '<div class="red-line"></div>' +
             '<h3 class="title-coll w-600 coll-count no-marg">' + item.collection.res_count + ' Ristoranti </h3>' +
         '</div></div></div>'
       )
    })
}


if(navigator.geolocation){
    console.log('location service is active')
    navigator.geolocation.getCurrentPosition(success, error)
}
