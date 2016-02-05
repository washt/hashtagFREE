$(window).load(function() {
	"use strict";

    /* ==============================================
    PRELOADER
    =============================================== */
	var preloaderDelay = 500;
    var preloaderFadeOutTime = 800;

    function hidePreloader() {
        var loadingAnimation = $('#loader');
        var preloader = $('#preloader');

        loadingAnimation.fadeOut();
        preloader.delay(preloaderDelay).fadeOut();
        $("body").addClass("window-load");
    }

    hidePreloader();

});

/* DOCUMENT READY  ----------- */
jQuery(document).ready(function() {
"use strict";

	/* ==============================================
	/*	NAV CONTAINER SECTION
	=============================================== */

	function calculateSizes() {
	    windowHeight = $(window).height();
	    $("html").hasClass("ipad ios7") && (windowHeight -= 20);
	    windowWidth = $(window).width();
	    topnavHeight = parseInt($("body").css("paddingTop"), 10);
	    viewportHeight = windowHeight - topnavHeight;
	}

	function calculateScroll() {
	    bodyScroll = $(window).scrollTop()
	}

	var windowHeight = 600;
	var windowWidth = 1020;
	var topnavHeight = 50;
	var viewportHeight = 970;
	var bodyScroll = 0;
	calculateScroll();

	function a() {
	    $("#nav_container").css("height", viewportHeight);
	}

	function n() {
	    if ($(".case_header_container").length) {
	        var a = $(document).scrollTop();
	        a > 0 ? $(".case_header_container").addClass("fade") : $(".case_header_container").removeClass("fade")
	    }
	}

	$ = jQuery.noConflict(), navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i) && !window.navigator.standalone && $("html").addClass("ipad ios7"), $("body").addClass("doc-ready"), calculateSizes(), $("#menu_button").click(function () {
	    $("body").hasClass("nav-active") ? ($("body").removeClass("nav-active"), $("#nav_container").removeClass("about_active"), $(".page_container").addClass("no-scale")) : ($("body").addClass("nav-active"), $(".page_container").removeClass("no-scale"))
	});

	$(document).click(function (a) {
	    $(a.target).is("#nav_container *, #menu_button") || $("body").hasClass("nav-active") && (
	    		$("body").removeClass("nav-active"), $("#nav_container").removeClass("about_active"), $(".page_container").addClass("no-scale"))
	});

	$("#nav_about").click(function (a) {
	    $("#nav_container").addClass("about_active");
	});

	$("#nav_about_close").click(function (a) {
	    $("#nav_container").removeClass("about_active");
	    $("#nav_container").removeClass("contact_active");
	    $(".page_container").addClass("no-scale");
	})

	$("#nav_contact").click(function (a) {
	    $("#nav_container").addClass("contact_active");
	});

	a();

	$(window).resize(function() {
		var windowHeight = $(window).height();
		topnavHeight = parseInt($("body").css("paddingTop"), 10);
	    viewportHeight = windowHeight - topnavHeight;
	    $("#nav_container").css("height", viewportHeight);
	});

	/* ==============================================
	/*	TEXT ROTATE
	=============================================== */

	var messageArray = $(".messages").children();
    var messageMax = messageArray.length - 1;

    messageArray.each( function( index ) { $(this).fadeOut(); } );
    $(messageArray[0]).fadeIn();

    setTimeout ( function() {
        messageRotate(1);
    }, 2000);

    function messageRotate( index ) {
        var prev = ( (index == 0) ? (messageMax) : (index - 1) );
        var next = ( (index == messageMax) ? 0 : (index + 1 ) );

        setTimeout ( function () {
            $(messageArray[prev]).fadeOut();
            setTimeout ( function () {
                $(messageArray[index]).fadeIn();
                setTimeout ( function () {
                     messageRotate(next);
                },2000 );
            },1000 );
        },2000 );
    }

	/* ==============================================
	/*	SUSCRIPTION FORM
	=============================================== */

	$('.success-message').hide();
    $('.error-message').hide();

    $('.subscribe form').submit(function() {
        var postdata = $('.subscribe form').serialize();
        $.ajax({
            type: 'POST',
            url: 'php/sendmail.php',
            data: postdata,
            dataType: 'json',
            success: function(json) {
                if(json.valid == 0) {
                    $('.success-message').hide();
                    $('.error-message').hide();
                    $('.error-message').html(json.message);
                    $('.error-message').fadeIn().delay(3000).fadeOut();
                }
                else {
                    $('.success-message').hide();
                    $('.error-message').hide();
                    $('.subscribe form').hide().delay(3000).fadeIn();
                    $('.subscribe form input').val('');
                    $('.success-message').html(json.message);
                    $('.success-message').fadeIn().delay(2000).fadeOut();
                }
            }
        });
        return false;
    });

    /* ==============================================
    /* CLOSE COOKIES MESSAGE
	================================================== */
	$(".close-cookies").click(function() {
		$("#cookies-message").fadeOut();
	});

	/* ==============================================
    /* CONTACT FORM
	================================================== */

    $('.success-message-2').hide();
    $('.error-message-2').hide();

	var $contactform 	= $('#contactform'),
		$success		= 'Your message has been sent. Thank you!';

	$contactform.submit(function(){
		$.ajax({
		   type: "POST",
		   url: "php/contact.php",
		   data: $(this).serialize(),
		   success: function(msg)
		   {
				if(msg == 'SEND'){
					$('.error-message-2').hide();
                    $('.success-message-2').hide();
                    $contactform.hide().delay(3000).fadeIn();
                    $('#contactform input').val('');
                    $('#contactform textarea').val('');
                    $('.success-message-2').html('<div class="success-message-2">'+ $success +'</div>');
                    $('.success-message-2').fadeIn().delay(2000).fadeOut();
				}
				else{
					$('.success-message-2').hide();
                    $('.error-message-2').hide();
                    $('.error-message-2').html('<div class="error-message-2">'+ msg +'</div>');
                    $('.error-message-2').fadeIn().delay(3000).fadeOut();
				}
			}
		 });
		return false;
	});

	/* ==============================================
    /* GOOGLE MAPS
	================================================== */
	//
	// var map = new GMaps({
	//     div: '#map',
	//     zoom: 14,
	// 	disableDefaultUI: true,
	//     lat: 40.740208,
	//     lng: -73.983386
	// });
	//
	// map.addMarker({
	//     lat: 40.740208,
	//     lng: -73.983386,
	// });
	//
	// var mapStyle = 0;
	//
	// $("#map_button").click(function(){
	// 	if ( mapStyle == 0 ) {
	// 		$("#map").animate({opacity: 1});
	// 		mapStyle = 1;
	// 	} else {
	// 		$("#map").animate({opacity: 0});
	// 		mapStyle = 0;
	// 	}
	// });

}); /* END DOCUMENT READY  ----------- */
