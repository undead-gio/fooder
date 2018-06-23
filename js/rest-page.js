
//funzione di chiamata API per la ricerca di uno specifico ristorante
function restCall(id){
  $( ".modal-body" ).empty(); //svuoto la modale
  $.ajax({
    url: 'https://developers.zomato.com/api/v2.1/restaurant',
    dataType: 'json',
    data: {
        res_id: id //id del ristorante
    },
    headers: {
        "user-key": "f7b021777643a1e7a87e4d0f3a2792ff"
    },
    success: restPage, //funzione callback per la creazione della pagina ristorante
    error: GeneralError //funzione callback per errore di caricamento dei dati dalla chiamata API
  })
}

// funzione per la creazione della pagina del ristorante
function restPage(rest){
  $( ".modal-body" ).empty();
  let phoneNumber;
  if(rest.phone_numbers == undefined){
    phoneNumber = "Telefono non disponibile";
  } else{
    phoneNumber = rest.phone_numbers;
  }


  $( ".modal-body" ).append( //inserisco nella modale elementi html
    '<div class="restImg" style="background-image: url(' + rest.featured_image + ')">' +
    '<div class="cover-rest"></div>' +
    '</div>' +
    '<div class="contRest container">' +
      '<div class="row card-title">' +
        '<div class="col-xs-7 col-sm-8 col-md-8">' +
          '<h1 class="restName w-700">' + rest.name + '</h1>' +
            '<h3 class="rest-cuisine w-400">' + rest.cuisines + '</h3>' +
        '</div>' +
        '<div class="col-xs-5 col-sm-4 col-md-4" style="text-align:right">' +
          '<div class="cont-rec-rest" style="background-color: #'+ rest.user_rating.rating_color +'">' +
            '<h2 class="rest-rating w-700">' + rest.user_rating.aggregate_rating + '/5</h2>'+
         '</div>' +
         '<h3 class="rest-votes w-300">' + rest.user_rating.votes + ' Voti</h3>'+
        '</div>' +
      '</div>' +

      '<h2 class="rest-inf w-700">Informazioni</h2><hr>' +

      '<div class="row">' +
      '<div class="col-xs-12 col-sm-6 col-md-4">' +
          '<h2 class="rest-tel w-400">Numero di telefono</h2>' +
          '<h3 class="w-300 no-marg">' + phoneNumber +
          '</h3>'+
          '<h2 class="rest-price w-400">Costo Medio</h2>' +
          '<h3 class="w-300 no-marg">€ ' + rest.average_cost_for_two +
          ' per due persone(circa)</h3>'+
        '</div>' +
        '<div class="col-xs-12 col-sm-6 col-md-4">' +
          '<h2 class="rest-add w-400">Indirizzo</h2>' +
          '<h3 class="w-300 no-marg">' + rest.location.address + '</h3>' +
          '<div id="mapid"></div>' +
        '</div>' +
        '<div class="col-xs-12 col-sm-6 col-md-4">' +
          '<h2 class="rest-info w-400">More Info</h2>' +
          '<div class="moreInfo no-marg"></div>' +
        '</div>' +
      '</div>' +
      /*'<h2 class="rest_Inf w-400">Recensioni</h2>' +
      '<div class="reviews"></div>' +*/
    '</div>'

  );

  let map = L.map('mapid').setView([rest.location.latitude, rest.location.longitude], 20);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker([rest.location.latitude, rest.location.longitude]).addTo(map)
      .bindPopup(rest.name)


// effettuo vari controlli su ulteriori informazioni, sbarrando i servizi non disponibili
  if(rest.is_table_reservation_supported == 0){
    $( ".moreInfo" ).append('<h3 class="no-info w-300">Prenotazione tavolo</h3>');
  } else{
    $( ".moreInfo" ).append('<h3 class="si-info w-300">Prenotazione tavolo</h3>');
  }
  if(rest.is_book_form_web_view == 0){
    $( ".moreInfo" ).append('<h3 class="no-info w-300">Prenotazione tavolo Online</h3>');
  } else{
    $( ".moreInfo" ).append('<h3 class="si-info w-300">Prenotazione tavolo Online</h3>');
  }
  if(rest.is_delivering_now == 0){
    $( ".moreInfo" ).append('<h3 class="no-info w-300">Consegna a casa</h3>');
  } else{
    $( ".moreInfo" ).append('<h3 class="si-info w-300">Consegna a casa</h3>');
  }
  if(rest.has_online_delivery == 0){
    $( ".moreInfo" ).append('<h3 class="no-info w-300">Ordine Online</h3>');
  } else{
    $( ".moreInfo" ).append('<h3 class="si-info w-300">Ordine Online</h3>');
  }
  if(rest.include_bogo_offers == 0){
    $( ".moreInfo" ).append('<h3 class="no-info w-300">Offerte del giorno</h3>');
  } else{
    $( ".moreInfo" ).append('<h3 class="si-info w-300">Offerte del giorno</h3>');
  }

  $('.close').click(function(event) {
    $('.navbar').fadeOut(300);
  });

  // chiamata ajax a API per ottenere le recensioni relative al ristorante
  $.ajax({
    url: 'https://developers.zomato.com/api/v2.1/reviews',
    dataType: 'json',
    data: {
        res_id: rest.id //id del ristorante
    },
    headers: {
        "user-key": "f7b021777643a1e7a87e4d0f3a2792ff"
    },
    success: reviews, //funzione callback per ottenere recensioni
    error: reviewsError //funzione callback per errore di caricamento dei dati dalla chiamata API
  })
}

function reviews(review){
  console.log(review)
  review.user_reviews.forEach(function(item, i){
    $('reviews').append(
      '<div class="row">' +
        '<div class="col-xs-2">' +
        '<div class="user" style="background-image:url(' + item.review.user.profile_image + ')"></div>'+
        '</div>' +
        '<div class="col-xs-2">' +
        '</div>' +
      '</div>'+
      '<div class="row">' +
        '<div class="col-xs-1">' +
        '</div>' +
        '<div class="col-xs-11">' +
        '</div>' +
      '</div>'
    );
  });
}

function reviewsError() {
  $('reviews').append(
    '<h2 class="noReviews"> Recensioni non disponibili per questo ristorante </h2>'
  );
}
