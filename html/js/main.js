jQuery(document).ready(function ($) {
    "use strict"
    /*-----------------------------------------------------------------------------------*/
    /* 	LOADER
     /*-----------------------------------------------------------------------------------*/
    $("#loader").delay(300).fadeOut("slow");
    /*-----------------------------------------------------------------------------------*/
    /* 	COUNTER JS
     /*-----------------------------------------------------------------------------------*/
    $('.counter-box').waypoint(function () {
        $('.counter-box .counter-number').countTo();
    },
    {
        offset: '100%',
        triggerOnce: true
    });
    /*-----------------------------------------------------------------------------------*/
    /*		STICKY NAVIGATION
     /*-----------------------------------------------------------------------------------*/
    $(".sticky").sticky({topSpacing: 0});
    /*-----------------------------------------------------------------------------------*/
    /*  FULL SCREEN
     /*-----------------------------------------------------------------------------------*/
    $('.full-screen').superslides({});

    /*-----------------------------------------------------------------------------------
     Animated progress bars
     /*-----------------------------------------------------------------------------------*/
    $('.progress-bars').waypoint(function () {
        $('.progress').each(function () {
            $(this).find('.progress-bar').animate({
                width: $(this).attr('data-percent')
            }, 200);
        });
    },
    {
        offset: '100%',
        triggerOnce: true
    });
    /*-----------------------------------------------------------------------------------*/
    /* 	SLIDER REVOLUTION
     /*-----------------------------------------------------------------------------------*/4
    if($('.tp-banner').length) {
        jQuery('.tp-banner').show().revolution({
            dottedOverlay: "none",
            delay: 10000,
            startwidth: 1170,
            startheight: 900,
            navigationType: "bullet",
            navigationArrows: "solo",
            navigationStyle: "preview4",
            parallax: "mouse",
            parallaxBgFreeze: "on",
            parallaxLevels: [7, 4, 3, 2, 5, 4, 3, 2, 1, 0],
            keyboardNavigation: "on",
            shadow: 0,
            fullWidth: "on",
            fullScreen: "on",
            shuffle: "off",
            autoHeight: "off",
            forceFullWidth: "off",
            fullScreenOffsetContainer: ""
        });
    }

    /*-----------------------------------------------------------------------------------*/
    /* 	SLIDER REVOLUTION
     /*-----------------------------------------------------------------------------------*/
    if( jQuery('.tp-banner-fix').length )  {
        jQuery('.tp-banner-fix').show().revolution({
            dottedOverlay: "none",
            delay: 10000,
            startwidth: 1170,
            startheight: 1080,
            navigationType: "bullet",
            navigationArrows: "solo",
            navigationStyle: "preview4",
            parallax: "mouse",
            parallaxBgFreeze: "on",
            parallaxLevels: [7, 4, 3, 2, 5, 4, 3, 2, 1, 0],
            keyboardNavigation: "on",
            fullWidth: "off",
            fullScreen: "off"
        });
    }
    /*-----------------------------------------------------------------------------------*/
    /* 	ANIMATION
     /*-----------------------------------------------------------------------------------*/
    var wow = new WOW({
        boxClass: 'animate',      // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset: 100,          // distance to the element when triggering the animation (default is 0)
        mobile: false        // trigger animations on mobile devices (true is default)
    });
    wow.init();
    /*-----------------------------------------------------------------------------------*/
    /*	Shuffe PORTFOLIO
     /*-----------------------------------------------------------------------------------*/
    $('.gallery-wrap').each(function() {
        var $grid = $(this).find('.gallery-items'),
            $sizer = $grid.find('.shuffle__sizer');

        $grid.shuffle({
            itemSelector: '.gallery-item',
            sizer: $sizer
        });

        $('.filter-item', $('.gallery-wrap')).find('a').on('click', function(e) {
            e.preventDefault();
            if ($(this).hasClass('active')) return false;
            var $this = $(this),
                filter = $this.data('filter');
            if (filter == '*') {
                $grid.shuffle('shuffle', 'all');
            } else {
                $grid.shuffle('shuffle', function ($el, shuffle) {
                    /*Only search elements in the current group*/
                    if (shuffle.group !== 'all' && $.inArray(shuffle.group, $el.data('groups')) === -1) {
                        return false;
                    }
                    return $el.hasClass(filter);
                });
            }
            $(this).parents('.gallery-filter').find('a').removeClass('active');
            $(this).addClass('active');
            return false;
        });
    });

    /**
     * Testimonial Slide
     */
    $('.testimonial-slide').slick({
        dots: true,
        infinite: false,
        speed: 300,
        arrows: false
    });
    $('.testimonial-slide-2').slick({
        dots: false,
        infinite: false,
        speed: 300,
        arrows: true,
        prevArrow : '<i class="prev fa fa-angle-left"></i>',
        nextArrow : '<i class="next fa fa-angle-right"></i>'
    });
    /**
     * Menu Single Image Preview
     */
    $('.menu-image .image-thumbnail').slick({
        dots: false,
        infinite: true,
        speed: 300,
        arrows: true,
        slidesToShow: 3,
        prevArrow : '<i class="prev fa fa-angle-left"></i>',
        nextArrow : '<i class="next fa fa-angle-right"></i>'
    });
    /**
     * Back to top
     */
    $('#back-to-top').click(function() {
        $('html, body').animate({scrollTop : 0},800);
        return false;
    });
    /**
     * Main Menu
     */
    $('.indicator').click(function() {
        $(this).parent().toggleClass('open');
    });
    $('#menu-phone-icon').click(function(e) {
        $('.main-navigation .main-menu').toggleClass('open');
        e.stopPropagation();
    });
});
/*-----------------------------------------------------------------------------------*/
/*    CONTACT FORM
 /*-----------------------------------------------------------------------------------*/
function checkmail(input) {
    var pattern1 = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (pattern1.test(input)) {
        return true;
    } else {
        return false;
    }
}
function proceed() {
    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var company = document.getElementById("company");
    var msg = document.getElementById("message");
    var errors = "";
    if (name.value == "") {
        name.className = 'error';
        return false;
    }
    else if (email.value == "") {
        email.className = 'error';
        return false;
    }
    else if (checkmail(email.value) == false) {
        alert('Please provide a valid email address.');
        return false;
    }
    else if (company.value == "") {
        company.className = 'error';
        return false;
    }
    else if (msg.value == "") {
        msg.className = 'error';
        return false;
    }
    else {
        $.ajax({
            type: "POST",
            url: "php/submit.php",
            data: $("#contact_form").serialize(),
            success: function (msg) {
                //alert(msg);
                if (msg) {
                    $('#contact_form').fadeOut(1000);
                    $('#contact_message').fadeIn(1000);
                    document.getElementById("contact_message");
                    return true;
                }
            }
        });
    }
};
