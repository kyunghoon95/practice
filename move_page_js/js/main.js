// function popOpen(popupW){
// 	var posY = $(window).scrollTop();
// 	$('body').addClass('body_fixed').css('top', -posY)
// 	$(popupW).fadeIn(300).addClass('on');
// }

// function popClose(popupW){
// 	var posTop = Math.abs(parseInt($('body').css('top')));
// 	$(popupW).removeClass('on').fadeOut(300);
// 	$('body').removeClass('body_fixed').css('top', 0);
// 	$(window).scrollTop(posTop);
// }

var popModule = {
	open : function(popupW){
		var posY = $(window).scrollTop();
		$('body').addClass('body_fixed').css('top', -posY);
		$(popupW).fadeIn(300).addClass('on');
	},
	close : function(popupW){
		var posTop = Math.abs(parseInt($('body').css('top')));
		$(popupW).removeClass('on').fadeOut(300);
		$('body').removeClass('body_fixed').css('top', 0);
		$(window).scrollTop(posTop);
	},
	more : function(cont){
		$(cont).stop().slideToggle().toggleClass('on');
		if($(cont).hasClass('on')){
		$('.viewMore').text('닫기');
		} else{
			$('.viewMore').text('더보기');
		}
	}
}

// function moreOpen(cont){
// 		$(cont).stop().slideToggle().toggleClass('on')
// 		if($(cont).hasClass('on')){
// 		$('.viewMore').text('닫기')
// 	}else{
// 		$('.viewMore').text('더보기')
// 	}
// }