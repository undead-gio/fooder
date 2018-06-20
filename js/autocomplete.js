
let query="";
    /* chiamata API dopo la pressione di 3 tasti */
    $('.search').on("keyup", function(event){
        $('.autocomplete').empty();
        query = event.target.value
        if(query.length >= 3) {
          $.ajax({
              url: 'https://developers.zomato.com/api/v2.1/search',
              dataType: 'json',
              data: {
                  q: query,
                  lat: latitude,
                  lon: longitude,
                  sort: 'real_distance',
                  order: 'desc'
              },
              headers: {
                  "user-key": "f7b021777643a1e7a87e4d0f3a2792ff"
              },
              success: autoCompl,
              error: GeneralError
          })
        };
    });

    /* funzione di risposta API */
    function autoCompl(autoQuery) {
      console.log(autoQuery);
      $('.autocomplete').empty();

      /* ritorna solo i primi 5 risultati */
      let first5 = autoQuery.restaurants.slice(0, 5);

      /* genera elementi ricerca */
      first5.forEach(function(item, i, array){
          $('.autocomplete').append(
              '<div class="row search-el" data-id="' + item.restaurant.id + '">' +
                '<div class="col-xs-12">' +
                  '<h3 class="w-300 search-text">' + item.restaurant.name + '</h3>' +
                '</div>' +
              '</div>'
          );
      });

      /* selezione consigliati di ricerca */
      $('.search-el').click(function(event) {
        let id = $(this).data('id');
        console.log("Elemento cliccato", $(this).data('id'));
      });

      /* evento pressione tasto invio */
      $(".search").keypress(function(e) {
        if (e.which == 13) {
          $("#collect-modal").modal();
          $('.navbar').fadeIn(300);
          $.ajax({
              url: 'https://developers.zomato.com/api/v2.1/search',
              dataType: 'json',
              data: {
                  q: query,
                  lat: latitude,
                  lon: longitude,
                  sort: 'real_distance',
                  order: 'desc'
              },
              headers: {
                  "user-key": "f7b021777643a1e7a87e4d0f3a2792ff"
              },
              success: modalSearch,
              error: GeneralError
          })
        }
      });
    }
