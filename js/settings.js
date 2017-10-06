(function($) {
	"use strict";

	$(document).ready(function() {

		// ====================================================================

		// Navbar position

		$(window).scroll(function(){
			if ($(this).scrollTop() > $(window).height()) {
				$('.navbar').addClass('fixed');
				$('body').css('padding-top', '97px');
			} else {
				$('.navbar').removeClass('fixed');
				$('body').css('padding-top', '0');
			}
		});

		// ====================================================================

		// Smooth Scroll on Menu Click

		$('.navbar a[href^=#]').on("click",function(){
			var t= $(this.hash);
			var t=t.length&&t||$('[name='+this.hash.slice(1)+']');
			if(t.length){
				var tOffset=(t.offset().top - 90);
				$('html,body').animate({scrollTop:tOffset},'slow');
				return false;
			}
		});

		// ====================================================================

		// Superslides

		$('#slides').superslides({
			play: 5000,
			animation_speed: 2000,
			animation: 'fade',
			pagination: false
		});

		// ====================================================================

		// Countdown

		var weddingDate = new Date("June 30, 2018 18:00:00");
		$(".countdown").countdown({
			until: weddingDate,
			format: 'ODHMS'
		});

		// ====================================================================

		// Scroll Reveal

		if ($(window).width() > 767) {

			// The starting defaults.
			var config = {
				after: '0s',
				enter: 'top',
				move: '50px',
				over: '0.66s',
				easing: 'ease-in-out',
				viewportFactor: 0.33,
				reset: false,
				init: true
			};

			window.scrollReveal = new scrollReveal({reset: true});
		}

	})

})(jQuery);
