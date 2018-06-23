
let query="";
    // chiamata API dopo la pressione di 3 tasti
    $('.auto-search').on("keyup", function(event){
        $('.autocomplete').empty(); //svuoto div dell'autocompletamento
        query = event.target.value; //assegno a query il value dell'input text
        if(query.length >= 3) { //se la lunghezza della query è > di 3, procedo alla chiamata ajax
          $.ajax({
              url: 'https://developers.zomato.com/api/v2.1/search',
              dataType: 'json',
              data: {
                  q: query,
                  lat: latitude,
                  lon: longitude,
                  order: 'desc'
              },
              headers: {
                  "user-key": "f7b021777643a1e7a87e4d0f3a2792ff"
              },
              success: autoCompl, //funzione di call back per riempire il div di ricerca
              error: GeneralError //errore generale, nel caso la chiamata non andasse a buon fine
          })
        };
    });

    // funzione di risposta API
    function autoCompl(autoQuery) {
      $('.autocomplete').empty(); //svuoto div autocomplete

      let first5 = autoQuery.restaurants.slice(0, 5);   //ritorna solo i primi 5 risultati

      // genera elementi ricerca
      first5.forEach(function(item, i, array){
          $('.autocomplete').append(
              '<div class="row search-el" data-toggle="modal" data-target="#collect-modal" data-id="' + item.restaurant.id + '">' +
                '<div class="col-xs-12">' +
                  '<h3 class="w-300 search-text">' + item.restaurant.name + '</h3>' +
                '</div>' +
              '</div>'
          );
      });

      // selezione consigliati di ricerca
      $('.search-el').click(function(event) {
        let id = $(this).data('id'); //assegno ad id, l'id del ristorante cliccato
        $('.navbar').fadeIn(300); //mostro la navbar
        restCall(id); //invoco funzione per la creazione della pagina ristorante
      });

      // evento pressione tasto invio
      $(".auto-search").keypress(function(e) {
        if (e.which == 13) { //se premuto il tasto invio
          $("#collect-modal").modal(); //chiamo la funzione per far comparire la modale
          $('.navbar').fadeIn(300); //mostro la navbar
          $(".auto-search").val(""); //resetto a vuoto il valore dell'input text
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
