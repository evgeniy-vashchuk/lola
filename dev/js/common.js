$(document).ready(function() {

	// SMALL TOP LINE + BUTTON TOP ANIMATION =================================
	$(window).scroll(function() {
		if ( $(this).scrollTop() > 0 ) {
			$('.header-container').addClass('filled');
			$('.header-container').addClass("small");

			$(".btn-arrow-fixed").addClass('btn-visible');

		} else {
			if (!$(".navbar-collapse").hasClass("show")) {
				$('.header-container').removeClass('filled');
			}
			$('.header-container').removeClass("small");
			// $('#main_navbar').collapse('hide');

			$(".btn-arrow-fixed").removeClass('btn-visible');
		}
	})

	// height of top line
	var topLineHeight = $('.header').outerHeight();

	// MENU LINKS SMOOTH SCROLL
	$(".navbar .nav-item").on("click","a", function (event) {
		event.preventDefault();
		var id  = $(this).attr('href'),
			top = $(id).offset().top - topLineHeight;
		$('body,html').animate({scrollTop: top}, 1000);
	});

	// BTN DOWN SMOOTH SCROLLING
	$('#btn-arrow-bottom').on('click' , function() {
		$('html, body').animate({
			scrollTop: $("#about-me").offset().top - topLineHeight
		}, 1000);
	});

	// SCROLL ON TOP
	$('.btn-arrow-fixed').on('click' , function() {
		$('body,html').animate({
			scrollTop: 0
		}, 1000);
		return false;
	});

	// GALLERY SLIDER
	$('.gallery-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		infinite: false,
		draggable: false,
		swipe: false,
		rows: 2,
		slidesPerRow: 4,
		speed: 0,
		useCSS: false,
		responsive: [
			{
				breakpoint: 575,
				settings: {
					slidesPerRow: 2,
				}
			},
		]
	});

	// SLICK ARROWS
	$(".slider-wrap .prev-arrow").on('click' , function(){
		$(this).parents('.slider-wrap').find('.-slider-init').slick('slickPrev');
	});
	$(".slider-wrap .next-arrow").on('click' , function(){
		$(this).parents('.slider-wrap').find('.-slider-init').slick('slickNext');
	});

	// SLICK ARROWS WITH ANIMATION
	$(".slider-animation-wrap .prev-arrow").on('click' , function(){
		var thisItem = $(this);
		if(!$(thisItem).parents('.slider-animation-wrap').find('.slick-slide:first-child').hasClass('slick-current')){
			$('.slider-animation-wrap .gallery-item').addClass("left-animation");
			setTimeout(function(){
				$(thisItem).parents('.slider-animation-wrap').find('.-slider-init').slick('slickPrev');
			}, 800);
			setTimeout(function(){
				$('.slider-animation-wrap .gallery-item').removeClass("left-animation");
			}, 850);
		}
	});

	$(".slider-animation-wrap .next-arrow").on('click' , function(){

		var thisItem = $(this); 

		if(!$(thisItem).parents('.slider-animation-wrap').find('.slick-slide:last-child').hasClass('slick-current')){
			$('.slider-animation-wrap .gallery-item').addClass("left-animation");
			setTimeout(function(){
				$(thisItem).parents('.slider-animation-wrap').find('.-slider-init').slick('slickNext');
			}, 800);

			setTimeout(function(){
				$('.slider-animation-wrap .gallery-item').removeClass("left-animation");
			}, 850);
		}
	});

	// WIDTH OF SCROLLBAR
	var widthScroll;
	function getScrollBarWidth () {
		var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
			widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
		$outer.remove();
		widthScroll = 100 - widthWithScroll;
		return 100 - widthWithScroll;
	};
	getScrollBarWidth();

	// GALLERY POP-UP INIT
	$('.gallery-slider').slickLightbox({
		itemSelector: '.square-block',
		navigateByKeyboard: true,
		background: "rgba(255,255,255,.9)",
	})
	// disable scrolling
	.on({
		'show.slickLightbox': function(){
			$('body').addClass('no-scroll');
			// scrollbar compensation on pages
			$('body, .header, .bg-grid').css("padding-right", widthScroll);
		},
		'hide.slickLightbox': function(){
			$('body').removeClass('no-scroll');
			// scrollbar compensation on pages
			$('body, .header, .bg-grid').css("padding-right", 0);
		}
	});

	$('.feedback-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		speed: 500,
		cssEase: 'linear',
		asNavFor: '.feedback-slider-nav',
		draggable: false,
		swipe: false,
		infinite: false,
		adaptiveHeight: true
	});

	$('.feedback-slider-nav').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: false,
		infinite: false,
		asNavFor: '.feedback-slider',
		draggable: true,
		swipe: false,
		focusOnSelect: true,
		useCSS: false,
	});

	// FORM NOT EMTY CHECK
	$('input:not([type="submit"]) , textarea').blur(function() {
		if( !$(this).val() ) {
			$(this).removeClass('active'); 
		} else {
			$(this).addClass('active');
		}
	});

	// TEXTAREA TRIANGLE FILL COLOR
	$( ".textarea-triangle > textarea" ).focus(function() {
		$(".textarea-triangle").addClass('triangle-fill');
	});

	$(".textarea-triangle > textarea").focusout(function(){
		$(".textarea-triangle").removeClass('triangle-fill');
	});

	// ANIMATION OF ELEMENTS IN LEFT
	function textAnimation(){
		var waypoints = $('.animation-item').waypoint({
			handler: function() {
				$(this.element).removeClass("left-animation");
				$(this.element).removeClass("right-animation");
			},
			offset: '80%'
		})
	}

	// ANIMATION FOR BOTTOM ELEMENTS
	function textAnimationBottom(){
		var waypoints = $('.animation-item-bottom').waypoint({
			handler: function() {
				$(this.element).removeClass("left-animation");
				$(this.element).removeClass("right-animation");
			},
			offset: 'bottom-in-view'
		})
	}

	textAnimation();
	textAnimationBottom();

	// HUMBURGER BUTTON OPEN/CLOSE
	// when menu is open
	$('#main_navbar').on('show.bs.collapse', function () {
		$('.navbar-toggler').addClass("open-menu");
		$('.header-container').addClass("filled");
	})
	// when menu is close
	$('#main_navbar').on('hide.bs.collapse', function () {
		$('.navbar-toggler').removeClass("open-menu");
		if (!$(".header-container").hasClass("small")) {
			$('.header-container').removeClass("filled");
		}
	})

	// CLOSE MENU WHEN CLICK TO OUTSIDE
	$(".main").on('click' , function(){
		$('#main_navbar').collapse('hide');
	});

});