
// funziona per calcolare la distanza in linea d'aria tra due punti

function distance(lat1, lon1, lat2, lon2, unit) {
    let radlat1 = Math.PI * lat1/180,
        radlat2 = Math.PI * lat2/180,
        radlon1 = Math.PI * lon1/180,
        radlon2 = Math.PI * lon2/180,
        theta = lon1-lon2,
        radtheta = Math.PI * theta/180,
        dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
}

// funzione che arrotonda la distanza e se > di 1000m imposta unità di misura km

function distanceCalculation(dist){
  lat_rest= dist.restaurant.location.latitude;
  long_rest= dist.restaurant.location.longitude;

  let distance_range = distance(latitude, longitude, lat_rest, long_rest, 'K'); //assegno alla variabile il risultato ottenuto dalla funzione per il calcolo delle distanze

  distance_range *= 1000;
  distance_range = Math.floor(distance_range);


  if(distance_range > 1000){
    distance_range /= 1000;
    distance_range = String(distance_range);
    distance_range = distance_range.substring(0, 3);
    distance_range = distance_range + " km";
  } else{
    distance_range = distance_range + " m";
  }
  return distance_range
}
