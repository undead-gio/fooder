let latitude = ''
    longitude = ''




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
}


function datiArrivati(risposta){
    console.log(risposta)
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
            success: Collection
        })
}


function Collection(collezioni){
    console.log(collezioni)
    collezioni.collections.forEach(function(item, i){
       $('#card').append(
            '<h2>' + item.collection.title + '</h2>' +
            '<img class="coll_name" src="' + item.collection.image_url + '"/>'
       )
    })
}









if(navigator.geolocation){
    console.log('location service is active')
    navigator.geolocation.getCurrentPosition(success, error)

}
