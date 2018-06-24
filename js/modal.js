
// funzione di callback di collection, per la creazione di card ristoranti realtive all'id collezione
function CollectionPage(collPage){
  restCard(collPage);
  $('.card-near').click(function(event) {
    let id = $(this).data('id');
    restCall(id);
  });
};


// funzione di callback dellautocompilazione, per la creazione di card ristoranti realtive alla query cercata
function modalSearch(searchRest) {
  $( ".modal-body" ).empty();
  if(searchRest.results_found > 0){
    $( ".modal-body" ).empty();
    $( ".modal-body" ).append(
      '<h1 class="text-search"> Risultati ricerca per: ' + query + '</h1>'
    );
    restCard(searchRest);
    $('.close').click(function(event) {
      $('.navbar').fadeOut(300);
    });

  } else{
    $( ".modal-body" ).empty();
    $('.modal-body').append(
      '<h1 class="text-search"> Risultati ricerca per: </h1>' +
      '<h1 class="text-search" style="margin-bottom:23%; padding-top:0"> non ha prodotto nessun risultato </h1>'
    )
  }
}
