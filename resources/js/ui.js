/* author :  an.hyo-ju ( anoju@cntt.co.kr ) in CNTT 
 * 
 * modify : kim.young-eun in CNTT
 * 
 * */
$(function(){
	headUI();
	//formUI();
	scrollItem();
	selectUI();
	topBtn()
});

//head common
var headUI = function(){
	var $header = $('#header'),
		$gnbTxt = $('#gnb a'),
		$lnbTxt = $('#lnb a'),
		$title = document.title;
	
	if($('#pageTit').length > 0){
		var $pageTit = $('#pageTit').text(),
			$current = $.trim($pageTit);

		document.title = $pageTit + ' | ' +  $title;
		
		//gnb active
		var $currentIn = false;
		$gnbTxt.each(function() {			
			if ( $(this).text() == $current) {
				$(this).parents('li').addClass('active');
				$currentIn = true;
			}
		});		
		if($currentIn == false){	
			$('#gnb').append('<h3><span>'+$current+'</span></h3>').children('ul').addClass('hide');
		}
	}	
	
	$('.btn_gnb').click(function(e){
		e.preventDefault();
		if($('html').hasClass('gnb_open')){
			$('html').removeClass('gnb_open');		
		}else{
			$('html').addClass('gnb_open');
		}
	});
	$('#gnb').on('click',function(){
		$('html').removeClass('gnb_open');
	})
	$('.close > a').on('click',function(){
		$('html').removeClass('gnb_open');
	})
	
	$(window).on('load scroll resize',function(){
		var $scrollTop = $(this).scrollTop(),
			$winH = $(window).height(),
			$wrapTop = $('#wrap').offset().top,	
			$headerH = $header.outerHeight(),
			$footerH = $('#footer').outerHeight();

		// if(($wrapTop+$headerH) < $scrollTop){
		// 	$header.addClass('fixed');
		// }else{
		// 	$header.removeClass('fixed');
		// }

		$('#gnb>ul>li').removeClass('on');
		$('#gnb>ul>li>ul').removeAttr('style');
		$('#container').css({
			//'padding-top':$headerH,
			'min-height':Math.max(0,($winH-$headerH-$footerH))
		});
		if($header.offset().top <= 0){
			$header.removeClass('m_header');
			return false;
		} else {
			$header.addClass('m_header');
			return false;
		}
	});	
	
	$('.btn_top_open').click(function(e){
		e.preventDefault();
		var $href = $(this).attr('href');

		if($(this).closest('li').hasClass('on')){
			$(this).closest('li').removeClass('on');
			$($href).show();
		}else{
			$(this).closest('li').addClass('on').siblings().removeClass('on');
			$($href).show().siblings('.top_section').hide();
		}
	});
};

/* 폼요소 */
var formUI = function(){
	$('input, textarea').placeholder();
	
	//checkbox, radio
	$('.checkbox input, .radio input').focus(function(){
		$(this).parent().addClass('hover');
	}).blur(function(){
		$(this).parent().removeClass('hover');
	});

	//inputFile	
	$('.inp_file > input').focus(function(){
		$(this).closest('.inp_file').find('.btn_file input').trigger('click');
	});	
	$('.inp_file .btn_file .button').click(function(e){
		e.preventDefault();
		$(this).closest('.inp_file').find('.btn_file input').trigger('click');
	});	
	$('.inp_file .btn_file input').change(function(){
		$(this).closest('.inp_file').find('> input').val($(this).val());
	});
};

var selectUI = function(){
	$(document).on('click','.family_site_sel > a',function(e) {		
		e.preventDefault();
		$(this).parent().toggleClass('on');
		$('html').one('click',function(){
			$(".sel_list").removeClass("on");
		});
		event.stopPropagation();
	});
	$(document).on('click','.family_site_sel .option',function(e) {
		if(!$(this).hasClass('link')){
			e.preventDefault();
			var $html = $(this).html();
			$(this).parent().addClass('selected').siblings().removeClass('selected');
			$(this).closest('.sel_list').removeClass('on').children('a').html($html);
		}
	});	
}

var scrollItem = function(){
	var $elements = $.find('*[data-animation]'),
		$window = $(window);
   
	if($elements.length > 0){
		$(window).on('scroll resize', checkInView);
		$(window).trigger('scroll');
	}
	

	function checkInView() {
	  var $winHeight = $window.height(),
		  $scrollTop = $window.scrollTop(),
		  $winBottom = ($scrollTop + $winHeight);
  
	  $.each($elements, function() {
		var $el = $(this),
			$elHeight = $($el).outerHeight(),
			$elTop = $($el).offset().top,
			$elBottom = ($elTop + $elHeight),
			$animationClass = $el.data('animation'),
			$delay = $el.data('delay'),
			$duration = $el.data('duration');
  
		if(!$el.hasClass('animated')){
		  if($delay>0){
			  $el.css({
				  '-webkit-animation-delay':delay+'ms',
				  'animation-delay':delay+'ms'
			  });
		  }
		  if($duration>0){
			  $el.css({
				  '-webkit-animation-duration':duration+'ms',
				  'animation-duration':duration+'ms'
			  });
		  }
  
		  $el.addClass('animated');
		}
		
		if (($elBottom >= $scrollTop) && ($elTop <= $winBottom)) {
		  $el.addClass($animationClass);
		} else {
		  $el.removeClass($animationClass);
		}
	  });
	}
  };

  function topBtn() {
    var settings = {
            button      : '#toTop',
            text        : 'to top',
            min         : 100,
            fadeIn      : 400,
            fadeOut     : 400,
            scrollSpeed : 800,
            easingType  : 'easeInOutExpo'
        };

   $('body').append('<a href="#" id="' + settings.button.substring(1) + '" title="' + settings.text + '">' + settings.text + '</a>');
    $( settings.button ).on('click', function( e ){
        $('html, body').animate({ scrollTop : 0 }, settings.scrollSpeed, settings.easingType );
        e.preventDefault();
    })
    .on('mouseenter', function() {
        $( settings.button ).addClass('hover');
    })
    .on('mouseleave', function() {
        $( settings.button ).removeClass('hover');
    });

    $(window).scroll(function() {
        var position = $(window).scrollTop();
        if ( position > settings.min ) { $( settings.button ).fadeIn( settings.fadeIn );  }
        else { $( settings.button ).fadeOut( settings.fadeOut );  }
    });
}