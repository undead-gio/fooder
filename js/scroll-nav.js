$(window).scroll(function() {
   if($(this).scrollTop()  >= $('.search').offset().top)
   {
     $('.navbar').fadeIn(300);
   } else {
     $('.navbar').fadeOut(300);
   }
});
