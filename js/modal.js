/* create rest card for collection */
function CollectionPage(collPage){
  console.log(collPage);
  restCard(collPage);
  $('.card-near').click(function(event) {
    let id = $(this).data('id');
    console.log("Elemento cliccato", $(this).data('id'));
  });
};


function modalSearch(searchRest) {
  restCard(searchRest);
}
