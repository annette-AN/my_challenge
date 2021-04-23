// AMR 검색기능이 포함된 셀렉트 이벤트
function createMultiSelect($el, data, selectedData) {
  var $select = $el.find('p.select'); // 셀렉트버튼
  var $dropdown = $el.find('.fast_popper_option'); // 셀렉트 드롭다운
  var $dropdownList = $el.find('.select_list'); // 드롭다운 내 리스트

  var dropdownController = Popper.createPopper($select[0], $dropdown[0], {
    strategy: 'fixed',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 5],
        },
      },
    ],
  });

  setTimeout(function () {
    $dropdown.appendTo("body"); //ie에서 dropdown 위치를 못잡아서 body appendTo로 해결
  });

  $el.on('click', function (e) { // 버블링 막기
    e.stopPropagation();
  });

  $select.on('click', function () { // 리스트 열기 닫기
    if ($el.parents('.lyrBox')) { //모달안에 있을 경우 모달 클릭 시 닫힘
      $('.lyrBox').on('click', function () {
        $dropdown.removeClass('active');
      });
    }

    if ($dropdown.hasClass('active')) {
      $dropdown.removeClass('active');
      $dropdown.find('input.search').focusout();
      return;
    }

    $('.fast_popper_option').removeClass('active');
    $dropdown.addClass('active');
    $dropdown.find('input.search').focus();

    $dropdown.width($el.width());
    dropdownController.forceUpdate();
  });

  renderMultiSelect(data, selectedData); //셀렉트 리스트 그리기
  renderSelectLabel($el); //셀렉트 된 label text를 p에 표시

  $dropdownList.find('label').on('click', function () {

    if (!$el.attr('multiple')) {
      $dropdown.find('input[type="checkbox"]').prop('checked', false);
      $(this).find('input[type="checkbox"]').prop('checked', true);
      renderSelectLabel($el);

      value = 'single_value'
      $el.trigger('change');
      return;
    }

    value = 'multiple_value';
    renderSelectLabel($el);
    $el.trigger('change');
  });

  $el.on('change', function () {
    console.log($el, '내 값이 변했다 확인요망')
  });

  function renderMultiSelect(data, checkData) { //셀렉트 리스트 그리기
    $dropdownList.empty();
    if (!$el.attr('multiple')) {
      $dropdownList.attr('radio', '')
    }

    if (data.length === 0) {
      var $optionHtml = '<li>\
    <p>등록된 데이터가 없습니다.</p>\
  </li>';

      $dropdownList.append($optionHtml);
      return;
    }

    for (var i = 0, l = data.length; i < l; i++) {
      var listData = data[i];
      var dataLabel = listData.label;
      var dataValue = listData.value;
      var isChecked = false;

      for (var ci = 0, cl = checkData.length; ci < cl; ci++) {
        var checkValue = checkData[ci].value;

        if (dataValue === checkValue) {
          isChecked = true;
        }
      }

      var checkedAttr = isChecked ? 'checked="checked"' : '';
      var $optionHtml = '<li>\
    <label>\
      <input type="checkbox" '+ checkedAttr + 'data-value="' + dataValue + '" class="checkbox">\
      <span class="label">' + dataLabel + '</span>\
    </label>\
  </li>';

      $dropdownList.append($optionHtml);
    }
  }

  function renderSelectLabel(element) { //element에서 셀렉트 된 label text를 p에 표시
    var labelBox = element.find('p.select');
    var labels = '';

    $dropdown.find('.select_list li').each(function () {
      var isChecked = $(this).find('input[type="checkbox"]').prop('checked');
      var label = $(this).find('label').text();
      if (isChecked) {
        if (!element.attr('multiple')) { // 멀티 셀렉트가 아닌 경우
          labels = label;
        } else { // 멀티 셀렉트인 경우
          labels += label + ', ';
        }
      }
    });

    labelBox.empty();
    labelBox.text(labels);
  }
}