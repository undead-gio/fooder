
/* questa funzione genera le card collezione in base alla posizione */

function Collection(collezioni){
    console.log(collezioni)
    collezioni.collections.forEach(function(item, i){
       $('.coll-row').append(
         '<div class="col-xs-12 col-sm-6 col-md-3 ow-pad">' +
            '<div class="card-coll" data-toggle="modal" data-target="#collect-modal" data-id="' + item.collection.collection_id + '" style="background-image:url('+ item.collection.image_url +')">' +
            '<div class="cover-coll"></div>' +
            '<div class="all-text-coll">' +
             '<h2 class="title-coll w-800 coll-title no-marg">' + item.collection.title + '</h2>' +
             '<h4 class="descr-coll w-300 coll-descr no-marg">'
             + item.collection.description + '</h4>' +
             '<div class="red-line"></div>' +
             '<h3 class="title-coll w-600 coll-count no-marg">' + item.collection.res_count + ' Ristoranti </h3>' +
         '</div></div></div>'
       )
    });

    /* funzione al click della card collezione, genera nuova chiamata ajax per ricevere i ristoranti relativi */
    $('.card-coll').click(function(event){
      let coll = $(this).data('id');
      let selectColl = collezioni.collections.filter(function(item, i){
        return item.collection.collection_id == coll;
      });
      $( ".modal-body" ).empty();
      $('.modal-body').append(
        '<div class="coll-page-img" style="background-image:url('+ selectColl[0].collection.image_url +')">' +
        '<div class="cover-coll-page"></div>' +
        '<div class="all-text-coll-page">' +
         '<h2 class="title-coll w-800 coll-title-page no-marg">' + selectColl[0].collection.title + '</h2>' +
         '<h4 class=" w-300 coll-descr-page no-marg">'
         + selectColl[0].collection.description + '</h4>' +
         '<div class="red-line"></div>' +
         '<h3 class="title-coll w-600 coll-count-page no-marg">' +selectColl[0].collection.res_count + ' Ristoranti </h3>' +
        '</div>'
      );

      $.ajax({
              url: 'https://developers.zomato.com/api/v2.1/search',
              dataType: 'json',
              data: {
                  lat: latitude,
                  lon: longitude,
                  collection_id: coll,
                  sort: 'real_distance',
                  order: 'desc'
              },
              headers: {
                  "user-key": "f7b021777643a1e7a87e4d0f3a2792ff"
              },
              success: CollectionPage,
              error: GeneralError
          });

    });


};
