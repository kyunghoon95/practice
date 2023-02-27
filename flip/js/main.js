function chkBoxAction(input, chkBox, allInput,submit_Btn){
  $(input).on('change' ,function(){
    // 데이터 입력
    if($(this).prop('checked')){
      $(this).parent(chkBox).attr('data-check-el', 'checked');
    } else {
      $(this).parent(chkBox).attr('data-check-el', 'not');
    }

  var dataLength = $('.chkBox input[type="checkbox"]').length;
  var confirmLength = $('[data-check-el="checked"]:visible').length;

  if(dataLength == confirmLength){
    $(submit_Btn).removeClass('disable');
  } else {
    $(submit_Btn).addClass('disable');
    $(allInput).prop('checked', false);
    $(allInput).parent().attr('data-check-el', 'not');
  }
})
}

function chkAllAction(allInput, allChkBox, chkBox, sumbmit_Btn){
  $(allInput).on('click change', function(){
    //전체선택
    var checkAll = $(allInput).is(':checked');
    checkAll == true ? $('input[type="checkbox"]').prop('checked', true) : $('input[type="checkbox"]').prop('checked', false);

    // 데이터입력
    if($(this).prop('checked')){
      $(chkBox).attr('data-check-el', 'checked');
      $(this).parent(allChkBox).attr('data-check-el', 'allChecked');
    } else {
      $(chkBox).attr('data-check-el', 'not');
      $(this).parent(allChkBox).attr('data-check-el', 'not');
    }
    
    // 데이터를 받아 버튼 활성/비활성화
    if($(this).parent().attr('data-check-el') == 'allChecked'){
      $(sumbmit_Btn).removeClass('disable');
    } else {
      $(sumbmit_Btn).addClass('disable');
    }     
  })
}

function choiceAction(choiceInput, allInput){
  $(choiceInput).on('change', function(){
    if($(this).prop('checked')){
      $(this).parent().attr('data-check-el', 'choice');
    } else {
      $(this).parent().attr('data-check-el', 'not');
    }
    if($(this).parent().attr('data-check-el') == 'not'){
      $(allInput).prop('checked', false)
    }
  })
}

//전체동의를 제외한 모든 chkbox가 선택되면 전체동의를 체크함
function allAction(chk, allInput, num){
  $(chk).on('click change', function(){
    var inputLength = $('input[type="checkbox"]:checked').length;
    if(inputLength == num){
      $(allInput).prop('checked', true)
    }
  })
}
