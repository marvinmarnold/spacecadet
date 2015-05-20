 Meteor.startup(function() {
  var App = function () {

    function handleBootstrap() {
        /*Bootstrap Carousel*/
        jQuery('.carousel').carousel({
            interval: 15000,
            pause: 'hover'
        });

        /*Tooltips*/
        jQuery('.tooltips').tooltip();
        jQuery('.tooltips-show').tooltip('show');
        jQuery('.tooltips-hide').tooltip('hide');
        jQuery('.tooltips-toggle').tooltip('toggle');
        jQuery('.tooltips-destroy').tooltip('destroy');

        /*Popovers*/
        jQuery('.popovers').popover();
        jQuery('.popovers-show').popover('show');
        jQuery('.popovers-hide').popover('hide');
        jQuery('.popovers-toggle').popover('toggle');
        jQuery('.popovers-destroy').popover('destroy');
    }

    function handleSearchV1() {
        jQuery('.search-button').click(function () {
            jQuery('.search-open').slideDown();
        });

        jQuery('.search-close').click(function () {
            jQuery('.search-open').slideUp();
        });

        jQuery(window).scroll(function(){
          if(jQuery(this).scrollTop() > 1) jQuery('.search-open').fadeOut('fast');
        });

    }

    function handleToggle() {
        jQuery('.list-toggle').on('click', function() {
            jQuery(this).toggleClass('active');
        });

        /*
        jQuery('#serviceList').on('shown.bs.collapse'), function() {
            jQuery(".servicedrop").addClass('glyphicon-chevron-up').removeClass('glyphicon-chevron-down');
        }

        jQuery('#serviceList').on('hidden.bs.collapse'), function() {
            jQuery(".servicedrop").addClass('glyphicon-chevron-down').removeClass('glyphicon-chevron-up');
        }
        */
    }

    function handleBoxed() {
        jQuery('.boxed-layout-btn').click(function(){
            jQuery(this).addClass("active-switcher-btn");
            jQuery(".wide-layout-btn").removeClass("active-switcher-btn");
            jQuery("body").addClass("boxed-layout container");
        });
        jQuery('.wide-layout-btn').click(function(){
            jQuery(this).addClass("active-switcher-btn");
            jQuery(".boxed-layout-btn").removeClass("active-switcher-btn");
            jQuery("body").removeClass("boxed-layout container");
        });
    }

    function handleHeader() {
         jQuery(window).scroll(function() {
            if (jQuery(window).scrollTop()>100){
                jQuery(".header-fixed .header-static").addClass("header-fixed-shrink");
            }
            else {
                jQuery(".header-fixed .header-static").removeClass("header-fixed-shrink");
            }
        });
    }

    function handleMegaMenu() {
        $(document).on('click', '.mega-menu .dropdown-menu', function(e) {
            e.stopPropagation()
        })
    }

    return {
        init: function () {
            handleBootstrap();
            handleSearchV1();
            handleToggle();
            handleBoxed();
            handleHeader();
            handleMegaMenu();
        },

        initScrollBar: function () {
            jQuery('.mCustomScrollbar').mCustomScrollbar({
                theme:"minimal",
                scrollInertia: 300,
                scrollEasing: "linear"
            });
        },

        initCounter: function () {
            jQuery('.counter').counterUp({
                delay: 10,
                time: 1000
            });
        },

        initParallaxBg: function () {
            jQuery('.parallaxBg').parallax("50%", 0.2);
            jQuery('.parallaxBg1').parallax("50%", 0.4);
        }
    };

}();

var OwlCarousel = function () {

    return {

        //Owl Carousel
        initOwlCarousel: function () {
        jQuery(document).ready(function() {
            //Owl Slider
            jQuery(document).ready(function() {
            var owl = jQuery(".owl-slider");
                owl.owlCarousel({
                  items: [4],
                    itemsDesktop : [1000,3], //3 items between 1000px and 901px
                    itemsDesktopSmall : [979,2], //2 items between 901px
                    itemsTablet: [600,1], //1 items between 600 and 0;
                    slideSpeed: 1000
                });

                // Custom Navigation Events
                jQuery(".next").click(function(){
                    owl.trigger('owl.next');
                })
                jQuery(".prev").click(function(){
                    owl.trigger('owl.prev');
                })
            });
        });

        //Owl Slider v2
          jQuery(document).ready(function() {
          var owl = jQuery(".owl-slider-v2");
              owl.owlCarousel({
                  items:5,
                  itemsDesktop : [1000,4], //4 items between 1000px and 901px
                itemsDesktopSmall : [979,3], //3 items between 901px
                  itemsTablet: [600,2], //2 items between 600 and 0;
              });
        });

        //Owl Slider v3
          jQuery(document).ready(function() {
          var owl = jQuery(".owl-slider-v3");
              owl.owlCarousel({
                  items:1,
                  itemsDesktop : [1000,1], //1 items between 1000px and 901px
                itemsDesktopSmall : [979,1], //1 items between 901px
                  itemsTablet: [600,1], //1 items between 600 and 0;
                  itemsMobile : [479,1] //1 itemsMobile disabled - inherit from itemsTablet option
              });
        });

        jQuery(document).ready(function() {
            //Owl Slider v4
            jQuery(document).ready(function() {
            var owl = jQuery(".owl-slider-v4");
                owl.owlCarousel({
                  items: [5],
                    itemsDesktop : [1000,4], //4 items between 1000px and 901px
                    itemsTablet: [600,2], //2 items between 600 and 0;
                    itemsMobile : [479,2], //2 itemsMobile disabled - inherit from itemsTablet option
                    slideSpeed: 1000
                });

                // Custom Navigation Events
                jQuery(".next").click(function(){
                    owl.trigger('owl.next');
                })
                jQuery(".prev").click(function(){
                    owl.trigger('owl.prev');
                })
            });
        });

        jQuery(document).ready(function() {
            //Owl Slider
            jQuery(document).ready(function() {
            var owl = jQuery(".owl-twitter");
                owl.owlCarousel({
                  items: [1]
                });

                // Custom Navigation Events
                jQuery(".next-v2").click(function(){
                    owl.trigger('owl.next');
                })
                jQuery(".prev-v3").click(function(){
                    owl.trigger('owl.prev');
                })
            });
        });
    }
    };

}();

var RevolutionSlider = function () {

    return {

        //Revolution Slider - Full Width
        initRSfullWidth: function () {
        var revapi;
          jQuery(document).ready(function() {
              revapi = jQuery('.tp-banner').revolution(
              {
                  delay:9000,
                  startwidth:1170,
                  startheight:500,
                  hideThumbs:10,
          navigationStyle:"preview4"
              });
          });
        },

        //Revolution Slider - Full Screen Offset Container
        initRSfullScreenOffset: function () {
        var revapi;
          jQuery(document).ready(function() {
             revapi = jQuery('.tp-banner').revolution(
              {
                  delay:15000,
                  startwidth:1170,
                  startheight:500,
                  hideThumbs:10,
                  fullWidth:"off",
                  fullScreen:"on",
                  hideCaptionAtLimit: "",
                  dottedOverlay:"twoxtwo",
                  navigationStyle:"preview4",
                  fullScreenOffsetContainer: ".header"
              });
          });
        }

    };
}();
        App.init();
        App.initScrollBar();
        App.initParallaxBg();
        OwlCarousel.initOwlCarousel();
        RevolutionSlider.initRSfullWidth();
});