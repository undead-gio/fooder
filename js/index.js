let latitude,
    longitude,
    id_entity,
    type_entity,
    lat_rest,
    long_rest

/* funzione che restituisce latitudine e longitudine, le quali sono utilizzate in una chiamata ajax all'api di zomato */

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
        success: datiArrivati,
        error: GeneralError
    })
}

/* funzione di errore, nel caso non si accettasse di accedere alla propria posizione */

function error(err){
    console.error(err)
    $('.near').css('display', 'none');
    $('.collection').css('display', 'none');
    alert("Per l'utilizzo di questa applicazione è necessaria la geolocalizzazione");
}

/* funzione di errore, nel caso la chiamata ajax all'API non andasse a buon fine */

function GeneralError() {
  $('.error').append('<h2 class="error-message"> La ricerca non ha prodotto nessun risultato, prova a ricaricare la pagina :) </h2>');
}

/* funzione invocata all'arrivo dei dati dalla prima chiamata ajax */

function datiArrivati(city){
    console.log(city);
    id_entity = city.location.entity_id;
    type_entity = city.location.entity_type;
    $('#position').append(city.location.city_name + ', ' + city.location.title);
    $('.nav-loc').append(city.location.title);

    /* chiamata ajax per generare ristoranti vicino alla propria posizione */

    $.ajax({
            url: 'https://developers.zomato.com/api/v2.1/search',
            dataType: 'json',
            data: {
                entity_id : id_entity,
                entity_type: type_entity,
                count: 20,
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

    /* chiamata ajax per generare collezioni di ristoranti vicino alla propria posizione */

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

/* espande l'input text del search nella navbar */

$('.nav-icon').click(function() {
    $('.nav-search').toggleClass('expanded');
});

/* richiesta di rilevamento posizione del browser */

if(navigator.geolocation){
    console.log('location service is active');
    navigator.geolocation.getCurrentPosition(success, error);
}
