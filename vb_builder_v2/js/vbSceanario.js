var testData = [{'label' : 'test 1', 'value' : 21}, {'label' : 'test 2', 'value' : 22}, {'label' : 'test 3', 'value' : 23}];
var testSelectedData = [];
var testCountData = [{'label' : '1', 'value' : 11}, {'label' : '2', 'value' : 12}, {'label' : '3', 'value' : 13}, {'label' : '4', 'value' : 14}, {'label' : '5', 'value' : 15}, {'label' : '6', 'value' : 16}, {'label' : '7', 'value' : 17}, {'label' : '8', 'value' : 18}, {'label' : '9', 'value' : 19}, {'label' : '10', 'value' : 20}];
var testSelectedCountData = [{'value' : 12}];

$(document).ready(function(){
  createFastSearchSelect($('#task_group_depth1'), testData, testSelectedData);
  bodyClickCloseEvent($('#task_group_depth1 .fast_search_option'));

  createFastSearchSelect($('#sceanario_next_task'), testData, testSelectedData);
  bodyClickCloseEvent($('#sceanario_next_task .fast_search_option'));

  createFastSearchSelect($('#sceanario_over_task'), testData, testSelectedData);
  bodyClickCloseEvent($('#sceanario_over_task .fast_search_option'));

  createFastSelect($('#set_answer_count'), testCountData, testSelectedCountData)
  bodyClickCloseEvent($('#set_answer_count .fast_option'));

  createFastSelect($('#set_dial_count'), testCountData, testSelectedCountData)
  bodyClickCloseEvent($('#set_dial_count .fast_option'));
});

$(window).scroll(function(){
  var scrollTop = $(window).scrollTop();
  var topLocation = scrollTop;

  $('#vb_test').css({
    'transform': 'translateY(' + topLocation + 'px)',
  });
});

// AMR 검색기능이 포함된 셀렉트 이벤트 (multiple 가능)
function createFastSearchSelect($el, data, selectedData) {
  var isMultiple = $el.attr('multiple') ? 'checkbox' : 'radio';
  var $select = $el.find('.select'); // 셀렉트버튼
  var $inputSearch = $el.find('.search') // 검색 input
  var $dropdown = $el.find('.fast_search_option'); // 셀렉트 드롭다운
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

  $dropdown.appendTo($el);
  $el.attr('role', isMultiple);

  $el.on('click', function (e) { // 버블링 막기
    e.stopPropagation();
  });

  $select.on('click', function () { // 리스트 열기 닫기
    if ($dropdown.hasClass('active')) {
      $dropdown.removeClass('active');
      $inputSearch.focusout();
      return;
    }

    $('.fast_search_option').removeClass('active');
    $dropdown.addClass('active');
    $inputSearch.focus();

    $dropdown.width($el.width());
    dropdownController.forceUpdate();
  });

  renderMultiSelect(data, selectedData); //셀렉트 리스트 그리기
  renderSelectLabel($el); //셀렉트 된 label text를 input에 표시

  $dropdownList.find('input').on('change', function(e){
    renderSelectLabel($el);
  });

  $select.on('change', function () {
    console.log($select, 'select value change')
  });

  $inputSearch.off('keyup');
  $inputSearch.keyup(function(key) {
    if (key.keyCode == 13) {
      $inputSearch.next('.btn_search').click();
    }
  });

  function renderMultiSelect(data, checkData) { //셀렉트 리스트 그리기
    $dropdownList.empty();

    if (data.length === 0) {
      var $optionHtml = '<li>\
        <p>등록된 데이터가 없습니다.</p>\
      </li>';

      $inputSearch.hide();
      $dropdownList.append($optionHtml);
      return;
    }

    for (var i = 0, l = data.length; i < l; i++) {
      var listData = data[i];
      var dataLabel = listData.label;
      var dataValue = 'fs_' + listData.value;
      var isChecked = false;

      for (var ci = 0, cl = checkData.length; ci < cl; ci++) {
        var checkValue = checkData[ci].value;

        if (dataValue === checkValue) {
          isChecked = true;
        }
      }

      var checkedAttr = isChecked ? 'checked="checked"' : '';
      //name 어떻게 줄지 고민
      var $optionHtml = '<li>\
      <input type="'+ isMultiple +'"'+
          checkedAttr +
          'name="vb_test"' +
          'id="' + dataValue + '"' +
          'class="' + isMultiple + '">\
      <label for="' + dataValue + '">' + dataLabel + '</label>\
  </li>';

      $dropdownList.append($optionHtml);
    }
  }

  function renderSelectLabel(element) { //element에서 셀렉트 된 label로 onchange
    var $input = element.find('.select');
    var labels = '';
    var ids = '';

    $dropdown.find('.select_list li').each(function () {
      var isChecked = $(this).find('input').prop('checked');

      var label = $(this).find('label').text();
      var id = $(this).find('label').attr('for');

      if (isChecked) {
        if (!element.attr('multiple')) { // 멀티 셀렉트가 아닌 경우
          labels = label;
          ids = id;
        } else { // 멀티 셀렉트인 경우
          labels += label + ', ';
          ids += id + ', ';
        }
      }
    });

    $input.empty();
    $input.val(labels);
    $input.attr('data-id', ids);
    $input.trigger('change');
  }
}
function bodyClickCloseEvent($el) {
  $el.on('click', function(e){
    e.stopPropagation();
  });

  $('body').on('click', function(){
    $el.removeClass('active');
  });
}

// AMR 셀렉트 이벤트 (multiple 가능)
function createFastSelect($el, data, selectedData) {
  var isMultiple = $el.attr('multiple') ? 'checkbox' : 'radio';
  var $select = $el.find('.select'); // 셀렉트버튼
  var $dropdown = $el.find('.fast_option'); // 셀렉트 드롭다운
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

  $dropdown.appendTo($el);
  $el.attr('role', isMultiple);

  $el.on('click', function (e) { // 버블링 막기
    e.stopPropagation();
  });

  $select.on('click', function () { // 리스트 열기 닫기
    if ($dropdown.hasClass('active')) {
      $dropdown.removeClass('active');
      return;
    }

    $('.fast_option').removeClass('active');
    $dropdown.addClass('active');

    $dropdown.width($el.width());
    dropdownController.forceUpdate();
  });

  renderMultiSelect(data, selectedData); //셀렉트 리스트 그리기
  renderSelectLabel($el); //셀렉트 된 label text를 input에 표시

  $dropdownList.find('input').on('change', function(e){
    renderSelectLabel($el);
  });

  $select.on('change', function () {
    console.log($select, 'select value change')
  });

  function renderMultiSelect(data, checkData) { //셀렉트 리스트 그리기
    $dropdownList.empty();

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
      var dataValue = 'fl_' + listData.value;
      var isChecked = false;

      for (var ci = 0, cl = checkData.length; ci < cl; ci++) {
        var checkValue = checkData[ci].value;

        if (dataValue === checkValue) {
          isChecked = true;
        }
      }

      var checkedAttr = isChecked ? 'checked="checked"' : '';
      //name 어떻게 줄지 고민
      var $optionHtml = '<li>\
      <input type="'+ isMultiple +'"'+
          checkedAttr +
          'name="vb_test"' +
          'id="' + dataValue + '"' +
          'class="' + isMultiple + '">\
      <label for="' + dataValue + '">' + dataLabel + '</label>\
  </li>';

      $dropdownList.append($optionHtml);
    }
  }

  function renderSelectLabel(element) { //element에서 셀렉트 된 label로 onchange
    var $input = element.find('.select');
    var labels = '';
    var ids = '';

    $dropdown.find('.select_list li').each(function () {
      var isChecked = $(this).find('input').prop('checked');

      var label = $(this).find('label').text();
      var id = $(this).find('label').attr('for');

      if (isChecked) {
        if (!element.attr('multiple')) { // 멀티 셀렉트가 아닌 경우
          labels = label;
          ids = id;
        } else { // 멀티 셀렉트인 경우
          labels += label + ', ';
          ids += id + ', ';
        }
      }
    });

    $input.empty();
    $input.val(labels);
    $input.attr('data-id', ids);
    $input.trigger('change');
  }
}