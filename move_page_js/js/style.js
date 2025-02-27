// browser check �Լ�
var checkBrowser = (function(){
	var isBrowser = typeof document === 'object' && !!document;
	var isTrident = isBrowser && /(msie|trident)/i.test(navigator.userAgent);
	var isIOS = isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window);
	var isAndroid = isBrowser && /android/i.test(navigator.userAgent) && !isTrident;
	return {
		chkBrowser : function(){
			var thisBrowser = '';
			if(isTrident){
			  thisBrowser = 'window';
			} else if(isIOS){
			  thisBrowser = 'ios';
			} else if(isAndroid){
			  thisBrowser = 'android';
			}	
			return thisBrowser; // browser retrun
		}
	}
})();

// popup module
var popupModule = (function(){
	function popTopPosition(obj){ // popup position top �� ����
		var wHeight = $(window).height();
		var dHeight = document.body.clientHeight;
		var wWidth = $(window).width();
		var contHeight = obj.outerHeight();

		if(obj.hasClass('square_pop') || obj.hasClass('full_bttm_pop')){
			obj.find('.pop_body').css({
				'max-height': wHeight - 56
			});
			if(obj.hasClass('full_height')){
				obj.find('.pop_body').css({
					'height': wHeight - 56
				});
			}
		}
		if($('.box_bubble01').length > 0){
			$('.box_bubble01 .box_bubble_cont').css('max-height', wHeight - 164);
		}

		if(wHeight <= contHeight){
			if(obj.hasClass('full_pop')){
				obj.css({
					'top': '0'
				});
			}
		} else if(wHeight <= contHeight + 56){
			if(obj.hasClass('square_pop')){
				obj.css({
					'top': '39px',
					'transform': 'translateY(0)'
				});
			}
		} else {
			if(obj.hasClass('square_pop')) {
				obj.css({
					'top': '50%',
					'transform': 'translateY(-50%)'
				});
			} else if(obj.hasClass('full_bttm_pop')) { // �ϴܿ� �ٴ� �˾�
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
		popOpen : function (popup){ // popup open�� ���� (popup class ��)
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

			$(window).resize(function(){
				setTimeout(function(){
					if(checkBrowser.chkBrowser() != 'ios'){
						var windowHeight = $(window).height();
						if(objPopWrap.hasClass('full_height')){
							objPopWrap.find('.pop_body').css({'height': windowHeight - 56, 'max-height': windowHeight - 56});
						}
					}
				}, 0);
			});
		}, // popOpen end
		popClose : function(e){ // popup close�� ���� (popup �ڽĿ��) ex:($('.pop_must_agree01 .btn_pop_close'))
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
		}, // popClose end
		scaleYes : function(){ // viewport Ȯ�� �����ϰ�
			$('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=2.0, user-scalable=yes, viewport-fit=cover');
		},
		scaleNo : function(){ // viewport Ȯ�� �Ұ����ϰ�
			$('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
		},
		toastOpen : function(el, delay){ // toast popup ���� ex: ($('.tostpopup'), 1000);
			el.show();
			setTimeout(function(){
				el.addClass('open');
			}, 10);
			setTimeout(function(){
				el.removeClass('open');
				setTimeout(function(){
					el.hide();
				}, 500);
			}, delay);
		}
	}
})();

// input module
var inputModule = {
	init : function(){ // init
		$('.input_label').on('click', function(){ // input_label Ŭ����
			var _input_wrap = $(this).parents('.input_wrap'); // input_wrap
			if(!_input_wrap.hasClass('disabled')){
				_input_wrap.addClass('focus on'); // �θ� 'focus on' Ŭ���� �߰�	
			}

		});

		$('.input_wrap').on('click focusin focusout keypress keyup', '.input_data', function(e) { // input_data action
			var _input_wrap = $(this).parents('.input_wrap'); // input_wrap
			var _input_in_w = $(this).parents('.input_in_w');

			if (e.type == 'focusin' || e.type == 'click'){ // ���� Ŭ�� ��
				if(!_input_wrap.hasClass('disabled')){
					_input_wrap.addClass('focus on');	
				}
			}

			if(e.target.tagName == 'INPUT'){ // target�� input�� ���
				var btnDel = $(this).siblings('.input_del'); // ���� ��ư	
				var thisValLength = $(this).val().length;
				

				if($(this).prop('readonly')){ // readonly�� true
					if (e.type == 'focusin' || e.type == 'click'){ // focus�� ��
						var _this = $(this);

						if(_input_wrap.hasClass('none_scr') || _input_wrap.parents('.pop_fixed_wrap').length > 0){
							// popup �̰ų� class �� none_scr�� ���� ��
						} else {
							setTimeout(function(){
								scrollMove.wrapMinHeight(_this); // .wrap min-height�� ����
								scrollMove.winMove(_this, 30); // scroll�̵� (el, margin��)
							}, 250);
						}
						if(btnDel.length > 0){
							btnDel.show();	
						}					
					}
				} else { // readonly�� false
					if (e.type == 'focusin' || e.type == 'click'){ // focus�� ��
						var _this = $(this);
						
						if(_input_wrap.hasClass('none_scr')){
							// popup �̰ų� class �� none_scr�� ���� ��
							
						} else if(_input_wrap.parents('.pop_fixed_wrap').length > 0){
							_input_wrap.parents('.pop_fixed_wrap').addClass('fix_fixed');
						} else {
							setTimeout(function(){
								scrollMove.wrapMinHeight(_this); // .wrap min-height�� ����
								scrollMove.winMove(_this, 30); // scroll�̵� (el, margin��)
							}, 250);
							if(e.type == 'focusin' && checkBrowser.chkBrowser() == 'ios'){ // browser�� ios �̸� focus�� header absolute��
								$('.header').addClass('fix_fixed');
							}
						}
						
						if(thisValLength > 0 && btnDel.length > 0){ // ������ư�� ������
							btnDel.show();
						} else if(btnDel.length > 0) {
							btnDel.hide();
						}

					} else if (e.type == 'focusout'){ // focus out �� ��
						_input_wrap.removeClass('focus');

						if(_input_wrap.parents('.pop_fixed_wrap').length > 0){ // �˾��ȿ� input�� ���
							_input_wrap.parents('.pop_fixed_wrap').removeClass('fix_fixed');
						}

						if($('.header').hasClass('fix_fixed')){
							$('.header').removeClass('fix_fixed');
						}

						if(thisValLength <= 0){ // input value�� ���� ��
							if(_input_wrap.hasClass('input_group')){ // input�� input_wrap �ȿ� ������ �϶�
								_input_in_w.attr('data-confirm-el', 'not');
							} else {
								_input_wrap.removeClass('on').attr('data-confirm-el', 'not');	
							}
						} else {
							if(_input_wrap.hasClass('input_group')){ // input�� input_wrap �ȿ� ������ �϶�
								_input_in_w.attr('data-confirm-el', 'confirm');
							} else {
								_input_wrap.attr('data-confirm-el', 'confirm');
							}
						}
						if(btnDel.length > 0){
							btnDel.hide();
						}
					} else if (e.type == 'keypress'){ // keypress �� ��
						if(thisValLength > 0 && btnDel.length > 0){
							btnDel.show();
						} else {
							btnDel.hide();
						}

						if(e.keyCode == 13){ // enterŰ �Է½�
							btnDel.hide();
							_input_wrap.removeClass('focus');
							$(this).blur();
							if(_input_wrap.hasClass('input_group')){ // input�� input_wrap �ȿ� ������ �϶�
								if(_input_in_w.attr('data-target-el') !== undefined) { // input_wrap �� data-target-el ���� ���� �� 
									inputModule.focusMove(_input_in_w, _input_in_w.attr('data-target-el'));	
								}else {
									inputModule.focusMove(_input_in_w);
								}
							} else if(_input_wrap.attr('data-target-el') !== undefined) { // input_wrap �� data-target-el ���� ���� ��
								inputModule.focusMove(_input_wrap, _input_wrap.attr('data-target-el'));	
							} else { // �� �� �Ϲ�
								inputModule.focusMove(_input_wrap);	
							}
						}
					} else if (e.type == 'keyup'){ // keyup �� ��
						if(thisValLength > 0 && btnDel.length > 0){
							btnDel.show();
						} else {
							btnDel.hide();
						}
					}
				} // readonly false end
				
				

			} // e.target.tagName == 'INPUT' end
		});

		$('.input_del').on('touchstart click',function(e) { // input ���� ��ư Ŭ����
			if($(this).parents('.input_wrap').hasClass('keypad_input')){ // keypad�� �ƴҽ�
				
			} else {
				e.preventDefault();
				$(this).siblings('.input_data').val('').trigger('focus');
				$(this).parents('.input_wrap').attr('data-confirm-el', 'not');
			}
		});

		$('.select_opt, .search_opt').on('click', 'li a',function(e){ // select, search �˾� option Ŭ�� ��
			if($(this).parents('.select_opt, .search_opt').hasClass('return')){
				return false;
			}
			if($(this).attr('data-opt-text') == undefined){
				var optTxt = $(this).text();
			} else {
				var optTxt = $(this).attr('data-opt-text');
			}
			var optVal = $(this).attr('data-opt-val');
			$(this).parent('li').addClass('on').siblings('li').removeClass('on');
			inputModule.selectClose($(this), optTxt, optVal);
			popupModule.popClose($(this));
		});
		
	}, // inputModule.init end

	focusMove : function(el, target){ // focus �̵�
		if(target == undefined){ // target�� ������
			if(el.siblings('[data-confirm-el="not"]').length > 0){
				if(el.siblings('[data-confirm-el="not"]').eq(0).hasClass('select_wrap') || el.siblings('[data-confirm-el="not"]').eq(0).hasClass('search_wrap')){
					el.siblings('[data-confirm-el="not"]').eq(0).addClass('focus on').trigger('click'); // ���� focus�� element�� select �϶�
				} else if(el.siblings('[data-confirm-el="not"]').eq(0).hasClass('readonly')){
					el.siblings('[data-confirm-el="not"]').eq(0).addClass('focus on').find('.input_data').trigger('click'); // ���� focus�� element�� readonly �϶�
				} else if(el.siblings('[data-confirm-el="not"]').eq(0).hasClass('chkbox01')){
					el.siblings('[data-confirm-el="not"]').eq(0).trigger('click'); // ���� focus�� element�� chkbox01 �϶�
				} else { // ���� focus�� element�� input �϶�
					el.siblings('[data-confirm-el="not"]').eq(0).find('.input_data').trigger('focus');	
				}
			} else {
				return false;
			}	
		} else { // target�� ������
			var _target = $('#' + target);
			if(_target.attr('data-confirm-el') == 'not'){
				if(_target.hasClass('select_wrap')){
					if(_target.hasClass('input_in_w')){ // input_group �ȿ� ������
						_target.trigger('click').parents('.input_group').addClass('focus on'); // ���� focus�� element�� select �϶�	
					} else {
						_target.addClass('focus on').trigger('click'); // ���� focus�� element�� select �϶�	
					}
				} else if(_target.hasClass('keypad_input')) { // keypad�̸�
					_target.find('.input_data').trigger('click');
				} else {
					_target.find('.input_data').trigger('focus');
				}
			} else {
				return false;
			}
		}	
	}, // inputModule.focusMove end

	selectClose : function(el, txt, opt){ // select, search �˾� ���� ��
		var dataSelectId = el.parents('.pop_fixed_wrap').attr('data-sel-id');
		var _selectId = $('#' + dataSelectId);
		if(txt == undefined && _selectId.find('.input_data').text() == ''){
			_selectId.removeClass('on focus');
		} else {
			_selectId.removeClass('focus').attr('data-confirm-el', 'confirm').find('.input_data').text(txt).attr('data-opt-val', opt);
			if(_selectId.hasClass('label_hidden')){
				_selectId.find('.input_label').addClass('hide');
			}

			var targetEl = undefined;
			if(el.parents('.select_opt').length > 0){
				targetEl = el.parents('.select_opt').attr('data-target-el');	
			} else if(el.parents('.search_opt').length > 0){
				targetEl = el.parents('.search_opt').attr('data-target-el');	
			}
			if(el.attr('data-target-el') !== undefined){ // select option���� �ٸ� target�� ������
				targetEl = el.attr('data-target-el');
			}

			if(el.attr('data-hide-w') !== undefined){ // data-hide-w�� ������
				$('.' + el.attr('data-hide-w')).hide();
			}

			if(el.attr('data-show-w') !== undefined){ // data-show-w�� ������
				$('.' + el.attr('data-show-w')).show();
			}			
			
			if(!_selectId.hasClass('notFocusMove')){ // notFocusMove Ŭ������ ���� �� (class="notFocusMove" ��Ŀ�� �̵� ���Ҷ� �߰�)
				inputModule.focusMove(_selectId, (targetEl == undefined)?undefined: targetEl);
			}
		}
	}, // inputModule.selectClose end
	keypadClose : function(el){ // ���� keypad ���� ��
		var elParent = el.parents('.pop_fixed_wrap');
		var dataId = elParent.attr('data-input-id');
		var _selectId = $('#' + dataId);
		var _selectParent = _selectId.parents('.input_wrap');
		if(_selectId.val() == ''){
			_selectParent.removeClass('on focus').attr('data-confirm-el', 'not').find('.input_del').hide();
		} else {
			_selectParent.removeClass('focus').attr('data-confirm-el', 'confirm');
			if(_selectId.hasClass('label_hidden')){
				_selectParent.find('.input_label').addClass('hide');
			}

			var targetEl = undefined;
			if(elParent.attr('data-target-el') !== undefined){
				targetEl = elParent.attr('data-target-el');
			}
			
			setTimeout(function(){
				inputModule.focusMove(_selectParent, (targetEl == undefined)?undefined: targetEl);
			}, 250);
		}
	}, // inputModule.keypadClose end
	maxLengthCheck : function(object){ // �ִ� ���̰� check
		if(object.value.length > object.maxLength){
			object.value = object.value.slice(0, object.maxLength);
		}    
	},
	selectValDisabled : function(el, txt){ /* select disabled */
		el.addClass('on disabled').attr('data-confirm-el', 'confirm').find('.input_data').text(txt);
		el.find('.input_label').addClass('hide');
	},
	selectValInit : function(el){ /* select disabled ���� */
		el.removeClass('on disabled').attr('data-confirm-el', 'not').find('.input_data').text('');
		el.find('.input_label').removeClass('hide');
	},
	inputValInit : function(el){ /* select disabled ���� */
		el.removeClass('on disabled').attr('data-confirm-el', 'not').find('.input_data').text('').prop('disabled', false);
	}
}; // inputModule end

// checkbox üũ ��
var allCheckModule = {
	agreeDepth3Chk : function(chkAll, chk){ // 3depth checkbox Ŭ�� ��
		$(chkAll).on('change', function(){
			if(this.checked){
				$(chk).prop("checked", true);
			} else {
				$(chk).prop("checked", false);
			}
		});

		$(chk).on('change', function(){
			if ($(chk + ':checked').length > 0){
				$(chkAll).prop("checked", true);
			} else {
				$(chkAll).prop("checked", false);
			}
		});
	},
	allMustCheck : function(pop, slider, i){ //�ʼ����� Ŭ����
		if(i !== undefined){
			//slider.params.initialSlide = i;
			slider.slideTo(i, 0);
		}
		popupModule.popOpen(pop);
		$('.' + pop).find('.pop_body').scrollTop(0);
		popupModule.scaleYes(); // 20210324 Ȯ�� �����ϰ� �����ϴ� �Լ�
		
		setTimeout(function(){
			slider.update();
		}, 410);
	}
}; // allCheckModule end

var scrollMove = (function(){ //scroll move function
	var headerHeight = 56; // header ���̰�
	return {
		wrapMinHeight: function(el, mar){ // min height ����
			var elTop = el.offset().top;
			var winH = $(window).outerHeight();
			if(el.parents('.pop_fixed_wrap').length <= 0){
				$('.wrap').css('min-height', elTop + winH - headerHeight + ((mar !== undefined) ? mar : 0));	
			}
		}, // wrapMinHeight end
		winMove: function(el, mar){ // scroll move
			var elTop = el.offset().top;
			var totalMargin = (mar !== undefined) ? headerHeight + mar : headerHeight;
			if(el.parents('.pop_fixed_wrap').length <= 0){
				$('html,body').stop().animate({scrollTop : elTop - totalMargin}, 400, 'easeInOutCubic');	
			}
		}, // winMove end
		popBodyMinHeight: function(el){ // popup min height ����
			var elTop = el.position().top + el.parents('.pop_fixed_wrap').find('.pop_body').scrollTop();
			var popH = el.parents('.pop_fixed_wrap').find('.pop_body').outerHeight();
			if(el.parents('.pop_fixed_wrap').length > 0){
				el.parents('.pop_fixed_wrap').find('.pop_body').css('padding-bottom', elTop + popH);	
			}
		}, // popBodyMinHeight end
		popBodyMove: function(el){ // popup scroll move
			var elTop = el.position().top + el.parents('.pop_fixed_wrap').find('.pop_body').scrollTop();
			if(el.parents('.pop_fixed_wrap').length > 0){
				el.parents('.pop_fixed_wrap').find('.pop_body').stop().animate({scrollTop : elTop}, 400, 'easeInOutCubic');	
			}
		}, // popBodyMove end
	}
})();

var tab = {
	init: function(tab, tabCont){ // init (tab class��, tab contents class��)
		var tabLi = $(tab + ' li');

		$(tabCont).hide();
		$(tabCont + '.first').show();

		tabLi.click(function(e){ // tab Ŭ�� ��
			e.preventDefault();
			var _this = $(this);
			var _tabCon = _this.parents(tab).siblings(tabCont);
			var _thisIndex = $(this).index();

			_this.siblings('li').removeClass('on');
			_this.addClass('on');

			_tabCon.hide();
			_tabCon.eq(_thisIndex).show();
		});
	} // tab.init end
} // tab end

/* keypad action */
function InputNumKeyPad(inputEl, maxVal){
	var nowMoneyVal = inputEl.val();

	this.sum = function(num){ // keypad �� ���ϱ�
		nowMoneyVal = nowMoneyVal.replace(/\.|\,/g, "");
		nowMoneyVal = String(Number(nowMoneyVal) + num);
		nowMoneyVal = this.setMaxVal(nowMoneyVal);

		nowMoneyVal = numberFormat.set(nowMoneyVal);
		this.insertInput(nowMoneyVal);
	}
	
	this.insert = function(el){ // keypad �� insert
		var thisTxt = el.text();

		nowMoneyVal = nowMoneyVal.replace(/\.|\,/g, "");

		if(nowMoneyVal == '0'){
			nowMoneyVal = thisTxt;
		} else {
			nowMoneyVal = nowMoneyVal + thisTxt;
		}

		nowMoneyVal = this.setMaxVal(nowMoneyVal);
		nowMoneyVal = numberFormat.set(String(nowMoneyVal));		
		this.insertInput(nowMoneyVal);
	};

	this.delete = function(){ // keypad �� ����
		nowMoneyVal = nowMoneyVal.replace(/\.|\,/g, "");
		if(nowMoneyVal.length <= 1){
			nowMoneyVal = '0';
		} else {
			nowMoneyVal = nowMoneyVal.slice(0, -1);
		}

		var integerTxt = numberFormat.set(nowMoneyVal);
		nowMoneyVal = integerTxt;
		
		this.insertInput(nowMoneyVal);
	}

	this.setVal = function(num){ // keypad �� ����
		num = this.setMaxVal(num);
		nowMoneyVal = numberFormat.set(String(num));
		this.insertInput(nowMoneyVal);
	}

	this.insertInput = function(val){ // input�� �Է�
		inputEl.val(val).trigger('change');
	}

	this.setMaxVal = function(val){ // keypad�� �ִ밪 ����
		if(Number(val) > maxVal){ // maxVal���� ���� ��
			val = maxVal;
		}
		return val;
	}
}
/* // keypad action end */
var numberFormat = { // ���� , ���
	set : function(inputNumber) {
		return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
}

function subNumberKorean(el, subEl){ // input �ϴ� �ѱۼ��� ���� show & hide
	var thisNum = Number(el.val().replace(/\.|\,/g, ""));
	(thisNum > 0 && thisNum !== undefined) ? subEl.show() : subEl.hide();
}

function subNumberKorean02(el, subEl){ // input �ϴ� �ѱۼ��� ���� show & hide
	var thisNum = Number(el.val().replace(/\.|\,/g, ""));
	(thisNum > 0 && thisNum !== undefined) ? subEl.css('opacity', 1) : subEl.css('opacity', 0);
}


var inputNumValModule = { // input �� action
	sum : function(btn, input){ // �ݾ� ��ư Ŭ����
		var inputVal = input.val();
		var btnNum = btn.attr('data-num-val');
		var maxVal = input.attr('data-max-val');
		inputVal = inputVal.replace(/\.|\,/g, "");
		inputVal = String(Number(inputVal) + Number(btnNum));
		inputVal = inputNumValModule.setMaxVal(inputVal, maxVal);

		inputVal = numberFormat.set(inputVal);
		input.val(inputVal).trigger('focus');
	},
	setMaxVal : function(val, maxVal){ // �ִ� �� ����
		if(Number(val) > maxVal){ // maxVal���� ���� ��
			val = maxVal;
		}
		return val;
	},
	keyup: function(el){
		var val = el.value;
		var maxVal = el.dataset.maxVal;
		val = val.replace(/\.|\,/g, "");
		val = inputNumValModule.setMaxVal(val, maxVal);
		val = numberFormat.set(val);
		el.value = val;
	}
} // inputNumValModule end

function maskDecoAction(){ // �ֹι�ȣ ���ڸ� mask action
	$('.mask_deco').siblings('input').on('focus', function(){
		$(this).siblings('.mask_deco').find('.focus').css('opacity', 0);
	}).on('blur', function(){
		if($(this).val() == ''){
			$(this).siblings('.mask_deco').find('.focus').css('opacity', 1);
		} else {
			$(this).siblings('.mask_deco').find('.focus').css('opacity', 0);
		}
	});
}

function inputValueBtnDis(el, btn){ // value check�ؼ� button disabled
	if(el.val() !== ''){
		btn.removeClass('disabled');
	} else {
		btn.addClass('disabled');
	}
}

function msgShowHide(el, showEl){ // �޽��� show, hide
	var msg = el.attr('data-msg');
	el.text(msg);
	showEl.show();
	showEl.find('.input_data').trigger('focus');
}

//������� checkbox checked �Ǹ� �ڵ���ü���� select ���� ����
function chkSlideUpDown(chk, slideEl){
	chk.on('change', function(){ 
		if($(this).prop("checked")){ 
			slideEl.slideDown(300);
		} else {
			slideEl.slideUp(300);
		}
	});
};

//�̿�ȳ� ��ư Ŭ���� ������ cont slide 
function btnClickToggl(btn){
	$(btn).on('click', function(){
		$(this).toggleClass('on');
		$(this).siblings('.cont_toggle').slideToggle(300);
	});
}

function btnContToggle(btn, cont){ // ��ư Ŭ�� �� cont show, hide
	btn.on('click', function(){
		$(this).toggleClass('on');
		cont.slideToggle(300);
	});
}

//���������� Ŭ���� �����ڽ� ����
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

// thumnail �ڼ��� ���� action
function thumListAction(_ul, _popup, _slide){
	_ul.on('click', 'li .thum_detail', function(){
		var thisIndex = $(this).parents('li').index();
		var ulLength = _ul.find('li:visible').length;
		popupModule.popOpen(_popup);
		$('.' + _popup).find('.slide_act_index').text(thisIndex + 1);
		$('.' + _popup).find('.slide_length').text(ulLength);
		setTimeout(function(){
			_slide.update();
			_slide.slideTo(thisIndex);	
		}, 350);
	});	
}

function radioBtnAction(){ // radio list class on �߰�
	$('.radio_list .radio01').on('click', function(){
		$(this).parents('.radio_list_wrap').find('.radio_list').removeClass('on');
		$(this).parents('.radio_list').addClass('on')
	});
}

// thumnail �̹��� ������ ��ư click ��
function listMoreShow(ul, slide, leng){
	var _ul = ul;
	var _slide = $(slide);
	_ul.find('li:hidden').each(function(i){
		if(i < leng){
			$(this).show();
		}
	});
	_slide.find('.swiper-slide[style*="display:none"]').each(function(i){
		if(i < leng){
			$(this).css('display', '');
		}
	});
}

// ���ڵ�� ����Ʈ script
function accordian(btn, cont, parent) {
	parent.on('click', btn, function(e){
		e.preventDefault();
		e.stopPropagation();
		$(this).siblings(cont).stop().slideToggle(300).parent('li').toggleClass('on').siblings('li').removeClass('on').find(cont).stop().slideUp(300);
		var thisTop;
		var _this = $(this);
		if(parent.parents('.popBody').length > 0){
			setTimeout(function(){
				var parentScrTop = parent.parents('.popBody').scrollTop();
				var thisPositionTop = _this.position().top;
				parent.parents('.popBody').animate({scrollTop: (parentScrTop + thisPositionTop) + 'px'}, 300);
			}, 500);
		} else {
			setTimeout(function(){
				thisTop = _this.offset().top;
				$('html, body').animate({scrollTop: (thisTop - 57) + 'px'}, 300);
			}, 400);
		}
	});
}

// slide add class on CSW-UNC-0100-P10
var slideListAddOn = (function(){
	var slideInter;
	return {
		indexInParent: function(node){
			var children = node.parentNode.childNodes;
			var num = 0;
			for (var i=0; i<children.length; i++) {
				if (children[i]==node) return num;
				if (children[i].nodeType==1) num++;
			}
			return -1;
		},
		elMoveClass: function(el){
			var elIndex;
			el.forEach(li => {
				if(li.classList.contains('on')){
					elIndex = slideListAddOn.indexInParent(li);
					li.classList.remove('on');
				}
			});
			if(elIndex + 1 >= el.length){
				elIndex = 0;
			} else {
				elIndex++;
			}
			el[elIndex].classList.add('on');
		},
		start: function(el, setTime){
			slideInter = setInterval(function(){
				slideListAddOn.elMoveClass(el);
			}, setTime);
		},
		stop: function(){
			clearInterval(slideInter);
		}
	}
})();

// input text ����
function inputDelegate(a, b){
	if(a.text() !== ''){
		if(b.parents('.input_wrap').length > 0){
			b.parents('.input_wrap').addClass('on').attr('data-confirm-el', 'confirm');
		}
		b.text(a.text());
	}
}

// datepicker wrapper ����
function datepickerWrapper(){
	$('.ui-datepicker-calendar').wrap('<div class="ui-datepicker-calendar-wrapper"></div>');
}

// datepicker
function datepickerAction(className){
	$('body').on('focusin', className, function(){
		$(this).prop('readonly','readonly').datepicker({
			changeYear: true,
			changeMonth: true,
			nextText: '���� ��',
			prevText: '���� ��',
			dayNames: ['�Ͽ���', '������', 'ȭ����', '������', '�����', '�ݿ���', '�����'],
			dayNamesMin: ['��', '��', 'ȭ', '��', '��', '��', '��'],
			monthNamesShort: ['1��','2��','3��','4��','5��','6��','7��','8��','9��','10��','11��','12��'],
			monthNames: ['1��','2��','3��','4��','5��','6��','7��','8��','9��','10��','11��','12��'],
			nextText: 'Next month',
			prevText: 'Prev month',
			dateFormat:'yy-mm-dd',
			yearRange: 'c-99:c+99',
			showMonthAfterYear: true,
			weekHeader: 'Wk',
			yearSuffix:'��',
			maxDate:new Date(),
			beforeShow: function (input, inst) {
				var winW = $(window).width();
				var winH = $(window).height();
				setTimeout(function (){
					$('.wrap').prepend('<div class="dim" style="display:block;"></div>');
					datepickerWrapper();
					var posY = $(window).scrollTop();
					$('body').addClass('body_fixed').css('top', -posY);
					inst.dpDiv.css({
						top: (winH - inst.dpDiv.height()) / 2,
						left: (winW - inst.dpDiv.outerWidth()) / 2,
						zIndex : 1000
					});
				}, 0);
			},
			onClose: function(){
				var posTop = Math.abs(parseInt($('body').css('top')));
				$('body').removeClass('body_fixed').css('top', 0);
				$(window).scrollTop(posTop);
				$('.wrap').children('.dim').remove();
			},
			onChangeMonthYear: function(){
				setTimeout(function(){
					datepickerWrapper();
				}, 0);
			}
		});
	});
}

$(function(){

});
