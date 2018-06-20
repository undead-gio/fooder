/* create restaurant card function */

function restCard(restcard){
  let withPhoto = restcard.restaurants.filter(function(item){
          return item.restaurant.featured_image
      })
  withPhoto.forEach(function(item, i){

    let priceRange,
        restName,
        restAddress,
        restCuisine

    distance_range = distanceCalculation(item);

    priceRange = restPrice(item);

    if (item.restaurant.cuisines.length > 25) {
      resCuisine = item.restaurant.cuisines.substr(0,25) + '...';
    }
    else {
      restCuisine = item.restaurant.cuisines;
    }

    if (item.restaurant.name.length > 30) {
      restName = item.restaurant.name.substr(0,30) + '...';
    }
    else {
      restName = item.restaurant.name;
    }

    if (item.restaurant.location.address.length > 40) {
      restAddress = item.restaurant.location.address.substr(0,40) + '...';
    }
    else {
      restAddress = item.restaurant.location.address;
    }


     $('.modal-body').append(
       '<div class="row rest-row"><div class="col-md-2"></div><div class="col-xs-12 col-sm-12 col-md-8"><div class="card-near" data-id="' + item.restaurant.id + '">' +
       '<div class="row" style="height:100%">' +
         '<div class="col-xs-5 col-sm-5" style="height:100%">' +
           '<div class="near-img" style="background-image:url('
           + item.restaurant.featured_image + ')"></div>' +
         '</div>' +
         '<div class="col-xs-5 col-sm-5 align-self-center">' +
           '<h3 class="restaurant-card-title no-marg cusines w-400">' + restCuisine +
           '</h3>'+
           '<h2 class="restaurant-card-title rest-name w-700">' + restName +
           '</h2>'+
           '<h4 class="restaurant-card-address no-marg rest-address w-300">' + restAddress +
           '</h4>'+
           '<h2 class="restaurant-card-title w-400 price" style="">' + priceRange +
           '</h2>'+
         '</div>' +
         '<div class="col-xs-2 col-sm-2 rating">' +
          '<div class="cont-rec" style="background-color: #'+ item.restaurant.user_rating.rating_color +'">' +
             '<h2 class="restaurant-card-title w-700">' + item.restaurant.user_rating.aggregate_rating +
             '</h2>'+
          '</div>' +
          '<h3 class="restaurant-card-title votes w-300" style="text-align:center">' + item.restaurant.user_rating.votes+
          ' Voti</h3>'+
          '<h2 class="restaurant-card-distance w-900">' + distance_range +
          '</h2>'+
         '</div>' +
       '</div>' +
       '</div><div class="col-md-2"></div>' +
       '</div></div></div>'
     )
  })
}


/* funzione che attribuisce "€" in base ad una scala da 0 e 4, e riduce di lunghezza tutte le parole nel titolo >n */

function restPrice(price){

  let priceData

  if(price.restaurant.price_range == 1){
    priceData = "€";
  }
  else if (price.restaurant.price_range == 2) {
    priceData = "€€";
  }
  else if (price.restaurant.price_range == 3) {
    priceData = "€€€";
  }
  else if (price.restaurant.price_range == 4) {
    priceData = "€€€€";
  }

  return priceData
}
