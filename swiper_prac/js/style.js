// popup module
var popupModule = (function(){
	function popTopPosition(obj){ // popup position top 값 설정
		var wHeight = $(window).height();
		var dHeight = document.body.clientHeight;
		var wWidth = $(window).width();
		var contHeight = obj.outerHeight();

		if(obj.hasClass('square_pop') || obj.hasClass('full_bttm_pop')){
			if(obj.hasClass('full_height')){
				obj.find('.pop_body').css({
					'height': wHeight - 20
				});
			}
		}

		if(wHeight <= contHeight){
			// if(obj.hasClass('full_pop')){
			// 	if(!obj.hasClass('top0')){
			// 		obj.css({
			// 			'top': '20px'
			// 		});	
			// 	}
				
			// }
		} else if(wHeight <= contHeight + 56){
			if(obj.hasClass('square_pop')){
				obj.css({
					'top': '20px',
					'transform': 'translateY(0)'
				});
			}
		} else {
			if(obj.hasClass('square_pop')) {
				obj.css({
					'top': '50%',
					'transform': 'translateY(-50%)'
				});
			} else if(obj.hasClass('full_bttm_pop')) { // 하단에 붙는 팝업
				obj.css({
					'top': ''
				});
			} else {
				obj.css({
					'top': (wHeight/2) - (contHeight/2)
				});
			}
		}
	} // popTopPosition end

	return {
		popOpen : function (popup){ // popup open시 실행 (popup class 명)
			var posY = $(window).scrollTop();
			$('.'+ popup).fadeIn(300);
			setTimeout(function(){
				popTopPosition($('.'+ popup +' .pop_wrap'));
			}, 0);
			$('.'+ popup).addClass('open').find('.dim').show();
			if($('.pop_fixed_wrap:visible').length > 1){
				$('.pop_fixed_wrap:visible').each(function(){
					if(!$(this).hasClass(popup)){
						$(this).addClass('bttm_pop_hidden');
					}
				});
			} else {
				$('body').addClass('body_fixed').css('top', -posY);	
			}
			
			var objPopWrap = $('.'+ popup +' .pop_wrap');
		}, // popOpen end
		popClose : function(e){ // popup close시 실행 (popup 자식요소) ex:($('.pop_must_agree01 .btn_pop_close'))
			if($('.pop_fixed_wrap:visible').length > 1){
				$('.pop_fixed_wrap:visible').each(function(i){				
					if($('.pop_fixed_wrap:visible').length - 2 == i){
						$(this).removeClass('bttm_pop_hidden');
					}
				});
			} else {
				var posTop = Math.abs(parseInt($('body').css('top')));
				$('body').removeClass('body_fixed').css('top', 0);
				$(window).scrollTop(posTop);
			}
			e.parents('.pop_fixed_wrap').removeClass('open').fadeOut(200);
		} // popClose end
	}
})();

function radioListAddClassOn(_list, _parents){
	$(_list).on('click', _parents + ' input', function(){
		$(this).parents('li').toggleClass('on');
		if($(this).parents('li').hasClass('on')) {
			$(this).prop('checked', true);
			$(this).parents('li').addClass('on').siblings().removeClass('on');
		} else {
			$(this).prop('checked', false);	
		}
	});	
}

function checkboxCheckedLimit(){
	$('.chk_list01').on("click", "input[type=checkbox]", function() {
		var inputName = $(this).attr("name");
		$('input:checkbox[name="'+inputName+'"]').not(this).prop('checked', false);
  });
}

function btnSwitchOnOff(btn, txt01, txt02){
	$(btn).on('click', function(){
		if(!$(this).hasClass('off')){
			$(this).addClass('off');
			$(this).children('img').attr("src","../../images/timing/ico/btn-off.png");

			$(this).parent().siblings().addClass('txt_gray03');

			if($(this).parent().siblings().find('.txt_change').text() == txt01){
				$(this).parent().siblings().find('.txt_change').text(txt02);
			}

			$(this).parents('.switch_cont').removeClass('bg_mint');
			$(this).parents('.switch_cont').addClass('bg_black01');

		} else {
			$(this).removeClass('off');
			$(this).children('img').attr("src","../../images/timing/ico/btn-on-off.png");

			$(this).parent().siblings().removeClass('txt_gray03');

			if($(this).parent().siblings().find('.txt_change').text() == txt02){
				$(this).parent().siblings().find('.txt_change').text(txt01);
			}

			$(this).parents('.switch_cont').removeClass('bg_black01');
			$(this).parents('.switch_cont').addClass('bg_mint');
		}
	});
}

function contMotion(el){
	$(el).removeClass('on');
	setTimeout(function() {
		$(el).addClass("on");
	}, 0);
}

/*
function numberAnimateRoll($){
	"use strict";
	
	//first figure out which CSS3 properties to set..
	var prefixes = ["", "O", "ms", "Webkit", "Moz"];

	//using same idea as jquery transform plugin..
	var testDivStyle = document.createElement('div').style;
	var css3Prefix = null;
	for (var i = 0, len = prefixes.length; i < len; i++) {
		if (prefixes[i] + "Transition" in testDivStyle &&
				prefixes[i] + "Transform" in testDivStyle) {
			css3Prefix = prefixes[i];
			break;
		}
	}
	var animationSupported = css3Prefix !== null;

	//get the transition ended event name for the css3Prefix..
	var transitionEndEvent;
	switch (css3Prefix) {
	case "O":
		transitionEndEvent = "otransitionend";
		break;
	case "ms":
		transitionEndEvent = "msTransitionEnd";
		break;
	case "Webkit":
		transitionEndEvent = "webkitTransitionEnd";
		break;
	default:
		transitionEndEvent = "transitionend";
	}

	var translateOpen = window.WebKitCSSMatrix 
				&& 'm11' in new WebKitCSSMatrix() ? "translate3d(0, " : "translate(0, ";
	var translateClose = window.WebKitCSSMatrix
				&& 'm11' in new WebKitCSSMatrix() ? "px ,0)" : "px)";

	var bindToTransitionEndForSingleRun = function ($el, funcToExec, maxMSTillTransitionEnd) {
		var firedFunc = false;
		var wrappedFunc = function () {
			funcToExec();
			firedFunc = true;
			$el.unbind(transitionEndEvent, wrappedFunc);
		};
		$el.bind(transitionEndEvent, wrappedFunc);
		setTimeout(function () {
			if (!firedFunc) wrappedFunc();
		}, maxMSTillTransitionEnd + 100);
	};

	var allChars = '9 0 1 2 3 4 5 6 7 8 9 0';

	//checks that the given value makes sense to use..
	var checkValue = function (str) {
		//check there are no odd chars first..
		for (var i = 0, len = str.length; i < len; i++) {
			if (allChars.indexOf(str.charAt(i)) < 0) {
				$.error("numberAnimate plugin requires that value used " +
					"only contain character in: \"" + allChars + "\"");
				return false;
			}                
		}
		return true;
	};

	var shiftToChar = function ($holderDiv, character, shiftTime) {
		var innerStyle = $holderDiv.children()[0].style;
		innerStyle[css3Prefix + 'Transition'] = "all " + shiftTime + "ms ease-in-out";
 
		var indexOfChar = allChars.indexOf(character);
		var transformY;

		if (indexOfChar < 0 || /\s/.test(character)) {
			transformY = $holderDiv.height();
		} else {
			transformY = 0 - (indexOfChar / 2) * $holderDiv.height();
		}
		innerStyle[css3Prefix + 'Transform'] = translateOpen + transformY + translateClose;
	};

	var createDivForChar = function (character, height, width, position, animationTimes) {
		var creationTime = animationTimes[0];
		var shiftTime = animationTimes[1];

		var holderDiv = $(document.createElement('div')).css({
			width: (creationTime ? 0 : width) + 'px',
			height: height + 'px',
			overflow: 'hidden',
			display: 'inline-block'
		}).attr("data-numberAnimate-pos", position).addClass('num_box');
		
		var innerDiv = $(document.createElement('div')).html(allChars);
		//fix annoying flickering for older webkit browsers..
		if (css3Prefix === 'Webkit')
			innerDiv[0].style['-webkit-backface-visibility'] = 'hidden';

		//initially show blank..
		innerDiv[0].style[css3Prefix + 'Transform'] =  translateOpen + height + translateClose;
		holderDiv.append(innerDiv);

		//animate to the correct character when finished animating creation if necessary..
		var shiftToCorrectChar = function () {
			shiftToChar(holderDiv, character, shiftTime);
		};

		//shift if after creation and after attachment if animating..
		if (creationTime) {            
			//bit of a hack - transition will only work if the element is attached to the DOM
			//so use a timeout to make this possible (no onattached event)..
			setTimeout(function () {
				bindToTransitionEndForSingleRun(holderDiv, shiftToCorrectChar, creationTime);
				var holderStyle = holderDiv[0].style;
				holderStyle[css3Prefix + 'Transition'] = "all " + creationTime + "ms ease-in-out";
				holderStyle.width = width + "px";
			}, 20);
		} else if (shiftTime) {
			setTimeout(shiftToCorrectChar, 20); 
		} else {
			shiftToCorrectChar();
		}

		return holderDiv[0];
	};
	
	//Removes the elements in thegiven jQuery collection using animation.. 
	var removeDivsForChars = function ($divs, animationTimes) {
		var shiftTime = animationTimes[1];
		var removeTime = animationTimes[2];

		$divs.removeAttr("data-numberAnimate-pos");
		$divs.each(function (i, div) {
			var $div = $(div);
			var style = div.style;

			//then remove it..
			var animateRemoval = function () {
				style[css3Prefix + 'Transition'] = "all " + removeTime + "ms ease-in-out";
				style.width = "1px";

				bindToTransitionEndForSingleRun($div, function () {
					$div.remove();
				}, removeTime); 
			};
			if (shiftTime) {
				bindToTransitionEndForSingleRun($div, animateRemoval, shiftTime); 
			} else {
				animateRemoval();
			}
			
			//first move it so that the no break space is showing..
			shiftToChar($div, 'not there', shiftTime);
		});
	};

	var methods = {
		init: function (options) {
			var settings = $.extend({}, {
				animationTimes: [500, 500, 500] //creation, animation, removal ms
			}, options);

			this.css('display', 'inline-block'); //otherwise height/width calculated incorrectly..
			
			$.each(this, function () {
				var $this = $(this);

				//get initial value and set it as data..
				var valueStr = this.innerHTML;
				if (!checkValue(valueStr)) return;

				$this.attr("data-numberAnimate-value", valueStr);
				
				if (!animationSupported) return; //do nothing..

				//get width of a single character (assume mono-spaced font)..
				$this.html("1");
				var characterWidth = 26; // $this.width();
				var characterHeight = $this.height();
				$this.attr("data-numberAnimate-characterHeight", characterHeight);
				$this.attr("data-numberAnimate-characterWidth", characterWidth);
				$this.html("");

				//required to get things to line up..
				$this.css({
					"vertical-align": "top",
					"display": "inline-block",
					"height": characterHeight + "px"
				});

				$this.attr("data-numberAnimate-animationTimes", "[" + settings.animationTimes + "]");
				
				//we positionthings relative to the dot, so store it's position..
				var indexOfPoint = valueStr.indexOf(".");
				if (indexOfPoint < 0) indexOfPoint = valueStr.length;
				
				//add divs representing each character..
				var docFrag = document.createDocumentFragment();
				for (var i = 0, len = valueStr.length; i < len; i++) {
					var character = valueStr.charAt(i);
					//create the divs with zero animation time..
					docFrag.appendChild(
						createDivForChar(character, characterHeight,
							characterWidth, indexOfPoint - i, [0, 0, 0])
					);
				}
				$this.append(docFrag); //add in one go.
			});
			
			return this;
		},

		val: function () {
			return this.attr("data-numberAnimate-value");
		},

		set: function (newValue, animationTimes) {
			if (typeof newValue === 'number') //normalize to a string..
				newValue = "" + newValue;
			if (!animationTimes)
				animationTimes = $.parseJSON(this.attr('data-numberAnimate-animationTimes'));

			//get the number value and update the stored value..
			if (!checkValue(newValue))  return;
			this.attr("data-numberAnimate-value", newValue);

			//if not animating just change the value..
			if (!animationSupported) {
				this.html(newValue);
				return;
			}

			var indexOfPoint = newValue.indexOf(".");
			if (indexOfPoint < 0) indexOfPoint = newValue.length;
			
			$.each(this, function () {
				var $this = $(this);
			
				var numberHolderDivs = $this.find("[data-numberAnimate-pos]");
				var characterHeight = $this.attr('data-numberAnimate-characterHeight') * 1;
				var characterWidth = $this.attr('data-numberAnimate-characterWidth') * 1;

				var newlyCreatedHoldingDiv;
				var largestCurrentPos = numberHolderDivs.attr('data-numberAnimate-pos') * 1;
				if (isNaN(largestCurrentPos)) largestCurrentPos = 0;
				var largestRequiredPos = indexOfPoint;
				var docFragment, pos, character, index;
				if (largestCurrentPos < largestRequiredPos) {
					docFragment = document.createDocumentFragment();
					for (pos = largestRequiredPos, index = 0;
							pos >= largestCurrentPos + 1; pos--, index++) {
						character = newValue.charAt(index);
						docFragment.appendChild(
							createDivForChar(character, characterHeight,
									characterWidth, pos, animationTimes)
						);
					}
					newlyCreatedHoldingDiv = docFragment.firstChild;
					$this.prepend(docFragment);
				} else if (largestCurrentPos > largestRequiredPos) {
					removeDivsForChars(
						numberHolderDivs.slice(0, largestCurrentPos - largestRequiredPos),
						animationTimes
					);
				}
				var smallestCurrentPos =  numberHolderDivs.last()
						.attr('data-numberAnimate-pos') * 1;
				if (isNaN(smallestCurrentPos)) smallestCurrentPos = 1;
				var smallestRequiredPos = indexOfPoint - newValue.length + 1;
				if (smallestRequiredPos < smallestCurrentPos) {
					docFragment = document.createDocumentFragment();
					for (pos = smallestCurrentPos - 1,
							index = newValue.length - (smallestCurrentPos - smallestRequiredPos);
							pos >= smallestRequiredPos; pos--, index++) {
						character = newValue.charAt(index);
						docFragment.appendChild(
							createDivForChar(character, characterHeight,
									characterWidth, pos, animationTimes)
						);
					}
					newlyCreatedHoldingDiv = docFragment.firstChild;
					$this.append(docFragment);
				} else if (smallestRequiredPos > smallestCurrentPos) {
					removeDivsForChars(
						numberHolderDivs.slice(
							numberHolderDivs.length - (smallestRequiredPos - smallestCurrentPos)
						),
						animationTimes
					);
				}
				var shiftPresentCharacters = function () {
					var shiftTime = animationTimes[1];
					pos = Math.min(largestRequiredPos, largestCurrentPos);
					var endPos = Math.max(smallestRequiredPos, smallestCurrentPos);
					index = indexOfPoint - pos;
					for (; pos >= endPos; pos--, index++) {
						character = newValue.charAt(index);
						var holdingDiv = $this.find("[data-numberAnimate-pos=" + pos + "]");
						shiftToChar(holdingDiv, character, shiftTime);
					}
				};
				if (newlyCreatedHoldingDiv) {
					bindToTransitionEndForSingleRun(
						$(newlyCreatedHoldingDiv), shiftPresentCharacters, animationTimes[0] + 100);
				} else {
					shiftPresentCharacters();
				}
			});
			
			return this;
		},
		destroy: function () {
			$.each(this, function () {
				var $this = $(this);
				
				var value = $this.numberAnimate('val');
				if (value === null) return; //continue

				$this.html(value);
				var attributesToRemove = $.map(this.attributes, function (attr) {
					var name = attr.name;
					return name.indexOf('data-numberanimate') === 0 ? name : null; 
				});
				$this.removeAttr(attributesToRemove.join(' '));
			});
			
			return this;
		}
	};

	$.fn.numberAnimate = function (method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' +  method + ' does not exist on jQuery.numberAnimate');
		}
	};

}
*/

function setSumMoney(el, num, maxNum){ // 눌러! 버튼 클릭시 금액 세팅 함수
	var _befor_num = el.attr('data-numberanimate-value'); // 기존 숫자 값
	
	if(maxNum == undefined){ // 최대값 세팅
		var maxNum = 999999;	
	} else {
		var maxNum = maxNum;
	}
	var sumNum = Number(_befor_num) + Number(num); // 기존 값 + 금액

	if(sumNum > 999){ // 금액이 1000단위 이상이면 콤마 추가
		el.parent().addClass('on_comma');
	} else {
		el.parent().removeClass('on_comma');
	}
	if(sumNum >= maxNum){ // 금액이 최대값 보다 클때 최대값으로 세팅
		sumNum = maxNum
	} else {
		sumNum = String(sumNum);
		var appendNum = 6 - sumNum.length
		if(sumNum.length <= 6){ // 금액이 6자리이하일때 앞에 0 추가
			for(var i = 0; i < appendNum; i++){
				sumNum = '0' + sumNum;
			}
		} else {
			sumNum = maxNum;
		}
	}
	el.numberAnimate('set', sumNum); // 금액 세팅

	$('.box_yellow_bttm').addClass('on'); // 입금버튼 활성화
}

function setInitMoney(el){ // 금액 초기화
	el.numberAnimate('set', '000000'); // 금액 설정
	el.parent().removeClass('on_comma'); // 콤마 삭제
	$('.box_yellow_bttm').removeClass('on'); // 입금버튼 비활성화
}

//툴팁아이콘 클릭시 툴팁박스 노출
var btnContShowHide = {
	show: function(btn, cont){
		if(!btn.hasClass('on')){
			btn.addClass('on');
			btn.siblings(cont).show();
		} else{
			btn.removeClass('on');
			btn.siblings(cont).hide();
		}
	},
	close: function(btn, cont){
		btn.parents(cont).siblings(btn).removeClass('on');
		btn.parents(cont).hide();
	}
}

function stampListHeight(btn, list, height01, height02){
	btn.parent().toggleClass('on');
	if(btn.parent().hasClass('on')){
		//btn.siblings(list).css('height', height02);
		btn.siblings(list).css('height', height02 + '%');
	} else {
		btn.siblings(list).css('height', height01);
	}
}

function accordian(btn, cont, parent) {
	parent.on('click', btn, function(e){
		e.preventDefault();
		e.stopPropagation();
		$(this).siblings(cont).stop().slideToggle(300).parent('li').toggleClass('on').siblings('li').removeClass('on').find(cont).stop().slideUp(300);
		var thisTop;
		var $this = $(this);

		setTimeout(function(){
			thisTop = $this.offset().top;
			$('html, body').animate({scrollTop: (thisTop - 56) + 'px'}, 300);
		}, 500);
	});
}

(function($) {
	$.fn.simpleCounter = function( options ) {
		let settings = $.extend({
			start:  0,
			end: 100,
			step: 1,
			duration: 1000
		}, options );

		const thisElement = $(this);

		let number = settings.start;
		var addNum = setInterval(function(){
			if(number >= settings.end){
				clearInterval(addNum);
			} else {
				number += settings.step;
				thisElement.text(number.toFixed(2));	
			}
		}, settings.duration / (settings.end / settings.step));
	};
}(jQuery));

/*
(function($) {
	$.fn.simpleCounter = function( options ) {
		let settings = $.extend({
			start:  0,
			end:    100,
			easing: 'swing',
			duration: 400,
			complete: ''
		}, options );

		const thisElement = $(this);

		$({count: settings.start}).animate({count: settings.end}, {
		duration: settings.duration,
		easing: settings.easing,
		step: function() {
			let mathCount = Math.ceil(this.count);
			thisElement.text(mathCount);
		},
		complete: settings.complete
		});
	};
}(jQuery));
*/


/* anime.js
 2017 Julian Garnier
 Released under the MIT license
*/
// var $jscomp$this=this;
// (function(v,p){"function"===typeof define&&define.amd?define([],p):"object"===typeof module&&module.exports?module.exports=p():v.anime=p()})(this,function(){function v(a){if(!g.col(a))try{return document.querySelectorAll(a)}catch(b){}}function p(a){return a.reduce(function(a,d){return a.concat(g.arr(d)?p(d):d)},[])}function w(a){if(g.arr(a))return a;g.str(a)&&(a=v(a)||a);return a instanceof NodeList||a instanceof HTMLCollection?[].slice.call(a):[a]}function F(a,b){return a.some(function(a){return a===b})}
// function A(a){var b={},d;for(d in a)b[d]=a[d];return b}function G(a,b){var d=A(a),c;for(c in a)d[c]=b.hasOwnProperty(c)?b[c]:a[c];return d}function B(a,b){var d=A(a),c;for(c in b)d[c]=g.und(a[c])?b[c]:a[c];return d}function S(a){a=a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(a,b,d,h){return b+b+d+d+h+h});var b=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);a=parseInt(b[1],16);var d=parseInt(b[2],16),b=parseInt(b[3],16);return"rgb("+a+","+d+","+b+")"}function T(a){function b(a,b,c){0>
// c&&(c+=1);1<c&&--c;return c<1/6?a+6*(b-a)*c:.5>c?b:c<2/3?a+(b-a)*(2/3-c)*6:a}var d=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(a);a=parseInt(d[1])/360;var c=parseInt(d[2])/100,d=parseInt(d[3])/100;if(0==c)c=d=a=d;else{var e=.5>d?d*(1+c):d+c-d*c,l=2*d-e,c=b(l,e,a+1/3),d=b(l,e,a);a=b(l,e,a-1/3)}return"rgb("+255*c+","+255*d+","+255*a+")"}function x(a){if(a=/([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|pc|vw|vh|deg|rad|turn)?/.exec(a))return a[2]}function U(a){if(-1<a.indexOf("translate"))return"px";
// if(-1<a.indexOf("rotate")||-1<a.indexOf("skew"))return"deg"}function H(a,b){return g.fnc(a)?a(b.target,b.id,b.total):a}function C(a,b){if(b in a.style)return getComputedStyle(a).getPropertyValue(b.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase())||"0"}function I(a,b){if(g.dom(a)&&F(V,b))return"transform";if(g.dom(a)&&(a.getAttribute(b)||g.svg(a)&&a[b]))return"attribute";if(g.dom(a)&&"transform"!==b&&C(a,b))return"css";if(null!=a[b])return"object"}function W(a,b){var d=U(b),d=-1<b.indexOf("scale")?
// 1:0+d;a=a.style.transform;if(!a)return d;for(var c=[],e=[],l=[],h=/(\w+)\((.+?)\)/g;c=h.exec(a);)e.push(c[1]),l.push(c[2]);a=l.filter(function(a,c){return e[c]===b});return a.length?a[0]:d}function J(a,b){switch(I(a,b)){case "transform":return W(a,b);case "css":return C(a,b);case "attribute":return a.getAttribute(b)}return a[b]||0}function K(a,b){var d=/^(\*=|\+=|-=)/.exec(a);if(!d)return a;b=parseFloat(b);a=parseFloat(a.replace(d[0],""));switch(d[0][0]){case "+":return b+a;case "-":return b-a;case "*":return b*
// a}}function D(a){return g.obj(a)&&a.hasOwnProperty("totalLength")}function X(a,b){function d(c){c=void 0===c?0:c;return a.el.getPointAtLength(1<=b+c?b+c:0)}var c=d(),e=d(-1),l=d(1);switch(a.property){case "x":return c.x;case "y":return c.y;case "angle":return 180*Math.atan2(l.y-e.y,l.x-e.x)/Math.PI}}function L(a,b){var d=/-?\d*\.?\d+/g;a=D(a)?a.totalLength:a;if(g.col(a))b=g.rgb(a)?a:g.hex(a)?S(a):g.hsl(a)?T(a):void 0;else{var c=x(a);a=c?a.substr(0,a.length-c.length):a;b=b?a+b:a}b+="";return{original:b,
// numbers:b.match(d)?b.match(d).map(Number):[0],strings:b.split(d)}}function Y(a,b){return b.reduce(function(b,c,e){return b+a[e-1]+c})}function M(a){return(a?p(g.arr(a)?a.map(w):w(a)):[]).filter(function(a,d,c){return c.indexOf(a)===d})}function Z(a){var b=M(a);return b.map(function(a,c){return{target:a,id:c,total:b.length}})}function aa(a,b){var d=A(b);if(g.arr(a)){var c=a.length;2!==c||g.obj(a[0])?g.fnc(b.duration)||(d.duration=b.duration/c):a={value:a}}return w(a).map(function(a,c){c=c?0:b.delay;
// a=g.obj(a)&&!D(a)?a:{value:a};g.und(a.delay)&&(a.delay=c);return a}).map(function(a){return B(a,d)})}function ba(a,b){var d={},c;for(c in a){var e=H(a[c],b);g.arr(e)&&(e=e.map(function(a){return H(a,b)}),1===e.length&&(e=e[0]));d[c]=e}d.duration=parseFloat(d.duration);d.delay=parseFloat(d.delay);return d}function ca(a){return g.arr(a)?y.apply(this,a):N[a]}function da(a,b){var d;return a.tweens.map(function(c){c=ba(c,b);var e=c.value,l=J(b.target,a.name),h=d?d.to.original:l,h=g.arr(e)?e[0]:h,m=K(g.arr(e)?
// e[1]:e,h),l=x(m)||x(h)||x(l);c.isPath=D(e);c.from=L(h,l);c.to=L(m,l);c.start=d?d.end:a.offset;c.end=c.start+c.delay+c.duration;c.easing=ca(c.easing);c.elasticity=(1E3-Math.min(Math.max(c.elasticity,1),999))/1E3;g.col(c.from.original)&&(c.round=1);return d=c})}function ea(a,b){return p(a.map(function(a){return b.map(function(b){var c=I(a.target,b.name);if(c){var d=da(b,a);b={type:c,property:b.name,animatable:a,tweens:d,duration:d[d.length-1].end,delay:d[0].delay}}else b=void 0;return b})})).filter(function(a){return!g.und(a)})}
// function O(a,b,d){var c="delay"===a?Math.min:Math.max;return b.length?c.apply(Math,b.map(function(b){return b[a]})):d[a]}function fa(a){var b=G(ga,a),d=G(ha,a),c=Z(a.targets),e=[],g=B(b,d),h;for(h in a)g.hasOwnProperty(h)||"targets"===h||e.push({name:h,offset:g.offset,tweens:aa(a[h],d)});a=ea(c,e);return B(b,{children:[],animatables:c,animations:a,duration:O("duration",a,d),delay:O("delay",a,d)})}function n(a){function b(){return window.Promise&&new Promise(function(a){return Q=a})}function d(a){return f.reversed?
// f.duration-a:a}function c(a){for(var b=0,c={},d=f.animations,e={};b<d.length;){var g=d[b],h=g.animatable,m=g.tweens;e.tween=m.filter(function(b){return a<b.end})[0]||m[m.length-1];e.isPath$1=e.tween.isPath;e.round=e.tween.round;e.eased=e.tween.easing(Math.min(Math.max(a-e.tween.start-e.tween.delay,0),e.tween.duration)/e.tween.duration,e.tween.elasticity);m=Y(e.tween.to.numbers.map(function(a){return function(b,c){c=a.isPath$1?0:a.tween.from.numbers[c];b=c+a.eased*(b-c);a.isPath$1&&(b=X(a.tween.value,
// b));a.round&&(b=Math.round(b*a.round)/a.round);return b}}(e)),e.tween.to.strings);ia[g.type](h.target,g.property,m,c,h.id);g.currentValue=m;b++;e={isPath$1:e.isPath$1,tween:e.tween,eased:e.eased,round:e.round}}if(c)for(var k in c)E||(E=C(document.body,"transform")?"transform":"-webkit-transform"),f.animatables[k].target.style[E]=c[k].join(" ");f.currentTime=a;f.progress=a/f.duration*100}function e(a){if(f[a])f[a](f)}function g(){f.remaining&&!0!==f.remaining&&f.remaining--}function h(a){var h=f.duration,
// l=f.offset,n=f.delay,P=f.currentTime,q=f.reversed,r=d(a),r=Math.min(Math.max(r,0),h);if(f.children){var p=f.children;if(r>=f.currentTime)for(var u=0;u<p.length;u++)p[u].seek(r);else for(u=p.length;u--;)p[u].seek(r)}r>l&&r<h?(c(r),!f.began&&r>=n&&(f.began=!0,e("begin")),e("run")):(r<=l&&0!==P&&(c(0),q&&g()),r>=h&&P!==h&&(c(h),q||g()));a>=h&&(f.remaining?(t=m,"alternate"===f.direction&&(f.reversed=!f.reversed)):(f.pause(),"Promise"in window&&(Q(),R=b()),f.completed||(f.completed=!0,e("complete"))),
// k=0);e("update")}a=void 0===a?{}:a;var m,t,k=0,Q=null,R=b(),f=fa(a);f.reset=function(){var a=f.direction,b=f.loop;f.currentTime=0;f.progress=0;f.paused=!0;f.began=!1;f.completed=!1;f.reversed="reverse"===a;f.remaining="alternate"===a&&1===b?2:b;for(a=f.children.length;a--;)b=f.children[a],b.seek(b.offset),b.reset()};f.tick=function(a){m=a;t||(t=m);h((k+m-t)*n.speed)};f.seek=function(a){h(d(a))};f.pause=function(){var a=q.indexOf(f);-1<a&&q.splice(a,1);f.paused=!0};f.play=function(){f.paused&&(f.paused=
// !1,t=0,k=d(f.currentTime),q.push(f),z||ja())};f.reverse=function(){f.reversed=!f.reversed;t=0;k=d(f.currentTime)};f.restart=function(){f.pause();f.reset();f.play()};f.finished=R;f.reset();f.autoplay&&f.play();return f}var ga={update:void 0,begin:void 0,run:void 0,complete:void 0,loop:1,direction:"normal",autoplay:!0,offset:0},ha={duration:1E3,delay:0,easing:"easeOutElastic",elasticity:500,round:0},V="translateX translateY translateZ rotate rotateX rotateY rotateZ scale scaleX scaleY scaleZ skewX skewY".split(" "),
// E,g={arr:function(a){return Array.isArray(a)},obj:function(a){return-1<Object.prototype.toString.call(a).indexOf("Object")},svg:function(a){return a instanceof SVGElement},dom:function(a){return a.nodeType||g.svg(a)},str:function(a){return"string"===typeof a},fnc:function(a){return"function"===typeof a},und:function(a){return"undefined"===typeof a},hex:function(a){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a)},rgb:function(a){return/^rgb/.test(a)},hsl:function(a){return/^hsl/.test(a)},col:function(a){return g.hex(a)||
// g.rgb(a)||g.hsl(a)}},y=function(){function a(a,d,c){return(((1-3*c+3*d)*a+(3*c-6*d))*a+3*d)*a}return function(b,d,c,e){if(0<=b&&1>=b&&0<=c&&1>=c){var g=new Float32Array(11);if(b!==d||c!==e)for(var h=0;11>h;++h)g[h]=a(.1*h,b,c);return function(h){if(b===d&&c===e)return h;if(0===h)return 0;if(1===h)return 1;for(var m=0,k=1;10!==k&&g[k]<=h;++k)m+=.1;--k;var k=m+(h-g[k])/(g[k+1]-g[k])*.1,l=3*(1-3*c+3*b)*k*k+2*(3*c-6*b)*k+3*b;if(.001<=l){for(m=0;4>m;++m){l=3*(1-3*c+3*b)*k*k+2*(3*c-6*b)*k+3*b;if(0===l)break;
// var n=a(k,b,c)-h,k=k-n/l}h=k}else if(0===l)h=k;else{var k=m,m=m+.1,f=0;do n=k+(m-k)/2,l=a(n,b,c)-h,0<l?m=n:k=n;while(1e-7<Math.abs(l)&&10>++f);h=n}return a(h,d,e)}}}}(),N=function(){function a(a,b){return 0===a||1===a?a:-Math.pow(2,10*(a-1))*Math.sin(2*(a-1-b/(2*Math.PI)*Math.asin(1))*Math.PI/b)}var b="Quad Cubic Quart Quint Sine Expo Circ Back Elastic".split(" "),d={In:[[.55,.085,.68,.53],[.55,.055,.675,.19],[.895,.03,.685,.22],[.755,.05,.855,.06],[.47,0,.745,.715],[.95,.05,.795,.035],[.6,.04,.98,
// .335],[.6,-.28,.735,.045],a],Out:[[.25,.46,.45,.94],[.215,.61,.355,1],[.165,.84,.44,1],[.23,1,.32,1],[.39,.575,.565,1],[.19,1,.22,1],[.075,.82,.165,1],[.175,.885,.32,1.275],function(b,c){return 1-a(1-b,c)}],InOut:[[.455,.03,.515,.955],[.645,.045,.355,1],[.77,0,.175,1],[.86,0,.07,1],[.445,.05,.55,.95],[1,0,0,1],[.785,.135,.15,.86],[.68,-.55,.265,1.55],function(b,c){return.5>b?a(2*b,c)/2:1-a(-2*b+2,c)/2}]},c={linear:y(.25,.25,.75,.75)},e={},l;for(l in d)e.type=l,d[e.type].forEach(function(a){return function(d,
// e){c["ease"+a.type+b[e]]=g.fnc(d)?d:y.apply($jscomp$this,d)}}(e)),e={type:e.type};return c}(),ia={css:function(a,b,d){return a.style[b]=d},attribute:function(a,b,d){return a.setAttribute(b,d)},object:function(a,b,d){return a[b]=d},transform:function(a,b,d,c,e){c[e]||(c[e]=[]);c[e].push(b+"("+d+")")}},q=[],z=0,ja=function(){function a(){z=requestAnimationFrame(b)}function b(b){var c=q.length;if(c){for(var d=0;d<c;)q[d]&&q[d].tick(b),d++;a()}else cancelAnimationFrame(z),z=0}return a}();n.version="2.0.2";
// n.speed=1;n.running=q;n.remove=function(a){a=M(a);for(var b=q.length;b--;)for(var d=q[b],c=d.animations,e=c.length;e--;)F(a,c[e].animatable.target)&&(c.splice(e,1),c.length||d.pause())};n.getValue=J;n.path=function(a,b){var d=g.str(a)?v(a)[0]:a,c=b||100;return function(a){return{el:d,property:a,totalLength:d.getTotalLength()*(c/100)}}};n.setDashoffset=function(a){var b=a.getTotalLength();a.setAttribute("stroke-dasharray",b);return b};n.bezier=y;n.easings=N;n.timeline=function(a){var b=n(a);b.pause();
// b.duration=0;b.add=function(a){b.children.forEach(function(a){a.began=!0;a.completed=!0});w(a).forEach(function(a){var c=b.duration,d=a.offset;a.autoplay=!1;a.offset=g.und(d)?c:K(d,c);b.seek(a.offset);a=n(a);a.duration>c&&(b.duration=a.duration);a.began=!0;b.children.push(a)});b.reset();b.seek(0);b.autoplay&&b.restart();return b};return b};n.random=function(a,b){return Math.floor(Math.random()*(b-a+1))+a};return n});