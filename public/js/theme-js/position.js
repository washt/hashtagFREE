$(document).ready(function(){
	"use strict";
	/* ---------------------------------------------------------------------- */
	/*	DIV HOME POSITION
	/* ---------------------------------------------------------------------- */
	
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	var homepageHeight = $('.main_div').height();
	
	if (windowHeight >= homepageHeight){
		if (windowWidth >= 767){
			var heightTotal = windowHeight-homepageHeight;
			$('.main_div').css("margin-top", (heightTotal/2));
			$('.main_div').css("margin-bottom", (heightTotal/2));
		}else{
			var heightTotal = (windowHeight-homepageHeight)-65;
			$('.main_div').css("margin-top", (heightTotal/2));
			$('.main_div').css("margin-bottom", (heightTotal/2));
		}
	}	

	$(window).resize(function() {		
		var windowHeight = $(window).height();
		var windowWidth = $(window).width();
		var homepageHeight = $('.main_div').height();
		
		if (windowHeight >= homepageHeight){
			if (windowWidth >= 767){
				var heightTotal = windowHeight-homepageHeight;
				$('.main_div').css("margin-top", (heightTotal/2));
				$('.main_div').css("margin-bottom", (heightTotal/2));
			}else{
				var heightTotal = (windowHeight-homepageHeight)-65;
				$('.main_div').css("margin-top", (heightTotal/2));
				$('.main_div').css("margin-bottom", (heightTotal/2));
			}
		}	
	});
	
});