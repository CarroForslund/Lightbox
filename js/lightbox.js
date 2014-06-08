( function($) {
    $.fn.lightbox = function(options) {
       options = $.extend({}, $.fn.lightbox.defaults, options);
       //För iOS och Android
       return this.each(function () {
         var windowHeigth = window.innerHeight || $(window).height(),
             windowWidth  = window.innerWidth  || $(window).width();

         $('<div id="overlay"></div>')
         .css({
           'opacity':'0',
           'position':'fixed',
           'top':'0',
           'left':'0',
           'height':'100%',
           'width':'100%',
           'background':options.color+' url('+options.loadingUrl+') no-repeat scroll center center',
           'z-index':'998'
         })
         .animate({'opacity':'0.5'}, 'slow')
         .appendTo('body');

         $('<div id="lightbox"></div>')
         .hide()
         .css({
            'position':'fixed',
            'z-index':'999'
         })
         .appendTo('body');

         $('<img>')
         .attr('src', $(this).attr('src'))
         .css({
          'max-height': windowHeigth,
          'max-width' : windowWidth,
          'border' : '10px solid #fff'
          })
          .load(function() {
            console.log("Load");
            $('#lightbox')
            .css({
               'top' : (windowHeigth - $('#lightbox').height()) / 2,
               'left': (windowWidth  - $('#lightbox').width())  / 2
                        })
                        .fadeIn();
                })
                .appendTo('#lightbox');


             //close button
                $('<div id="close-button"></div>')
                .css({
                  'top': -15,
                  'right': -15,
                  'position': 'absolute',
                  'margin':'5px',
                  'padding':'2px',
                  'cursor': 'pointer',
                  'background':'url("img/box_close.png") no-repeat',
                  'width':'25px',
                  'height': '25px'
                })
                .appendTo('#lightbox');

                $('#close-button').click(function() {
                     $('#overlay, #lightbox')
                     .fadeOut('slow', function() {
                  $('#overlay, #lightbox').remove();
                 });
            });
       })

  }
  $.fn.lightbox.defaults={
      'loadingUrl':'img/loader.gif',
      'color':'black'
    }
  })(jQuery);

  $('.lightbox').css({
    'cursor':'pointer'
  });
  $('.lightbox').click(function()
  {
    $(this).lightbox();
  });
