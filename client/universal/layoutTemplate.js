Template.layoutTemplate.onRendered(function() {

  /*返回顶部*/
  $(window).scroll(function() {
    if ($(window).scrollTop() > 100) {
      $("#back").fadeIn(600);
    } else {
      $("#back").fadeOut(200);
    }
  });

  $("#back").click(function() {
    $('body').animate({
      scrollTop: 0
    }, 800);
  });

  /*侧边栏*/
 $("#showRightPush").click(function() {
   var sidebar = $("#cbp-spmenu-s2");
   if (sidebar.hasClass("cbp-spmenu-right")) {
     sidebar.animate({right:0});
   }
   else {
     sidebar.animate({right:'-240px'});
   }
   sidebar.toggleClass("cbp-spmenu-right");
 });

})
