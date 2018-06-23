//funzione che fa comparire la nav bar dopo aver incontrato il div del search
$(window).scroll(function() {
   if($(this).scrollTop()  >= $('.search').offset().top)
   {
     $('.navbar').fadeIn(300);
   } else {
     $('.navbar').fadeOut(300);
   }
});
