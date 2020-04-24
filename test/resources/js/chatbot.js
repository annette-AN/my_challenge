var host;
var lang;
var qrLocation;

// 채팅입력 (Shift + Enter)
$('#inputArea').keyup(function (event) {
    if (event.keyCode == 13 && event.shiftKey) {
        var chatTxt = this.value;
        var caret = getCaret(this);
        this.value = chatTxt.substring(0,caret)+"\n"+chatTxt.substring(carent,chatTxt.length-1);
        event.stopPropagation();
    } else if (event.keyCode == 13){
        $('#btn_chat').trigger('click');
    }
});

$(document).ready(function (){

    var chatBtnClicked = false;
    window.addEventListener("message", sendHostInfo, false);

    // chatbot open todo:qr관련 소스 정리~
    function actChatbotOpen () {
        if (qrLocation !== undefined && qrLocation !== "") {
            chatBtnClicked = true;
            window.parent.postMessage("chatbot_open", "*");
            $('#chatUI_wrap').addClass('chatUI_show');
            var scrollHeight = $('.lst_talk').height();
            $('.chatUI_mid').animate({
                scrollTop: scrollHeight
            }, 150);
        } else {
            $('#btn_goChat').on('click', function () {
                chatBtnClicked = true;
                window.parent.postMessage("chatbot_open", "*");
                $(this).addClass('goChat_hide');
                $('.chatGreeting').addClass('chatGreeting_hide');
                $('#chatUI_wrap').addClass('chatUI_show');
                var scrollHeight = $('.lst_talk').height();
                $('.chatUI_mid').animate({
                    scrollTop: scrollHeight
                }, 150);
                return false;
            });
        }
    }

    var mainCookie = getCookie("mainCookie");
    // chatbot open trigger
    $('#btn_goChat').on("animationend", function() {
        if (((!chatBtnClicked && checkDevice() !== 'MOBILE') ||
            (checkDevice() === 'MOBILE' && qrLocation !== "" && qrLocation !== undefined)) && mainCookie === undefined) {
            $('#btn_goChat').trigger('click');
            setCookie("mainCookie", "mainCookie", 60);
        }
    });

    // chatbot close
    $('.btn_chatClose').on('click', function(){
        $('#btn_goChat').removeClass('goChat_hide');
        $('.chatGreeting').removeClass('chatGreeting_hide');
        $('#chatUI_wrap').addClass('chatUI_hide');
        $('#chatUI_wrap').removeClass('chatUI_show');
        $('.chatAside').removeClass('aside_show');
        setTimeout(function() {
            $('#chatUI_wrap').removeClass('chatUI_hide');
            $('.chatAside').removeClass('aside_hide');
            window.parent.postMessage("chatbot_close", "*");
        }, 0);
    });



    function setCookie(name, value, expireminute ) {
        var exdate = new Date();
        exdate.setMinutes(exdate.getMinutes()+expireminute);
        document.cookie = name +  "=" + escape(value)

            + ((expireminute==null) ? "" : ";expires="+exdate.toUTCString());
    }

    function getCookie(cookie_name) {
        var x, y;
        var val = document.cookie.split(';');

        for (var i = 0; i < val.length; i++) {
            x = val[i].substr(0, val[i].indexOf('='));
            y = val[i].substr(val[i].indexOf('=') + 1);
            x = x.replace(/^\s+|\s+$/g, '');
            if (x == cookie_name) {
                return unescape(y);
            }
        }
    }

    document.cookie;

    // 날짜, 요일 시간 정의
    var year  = new Date().getFullYear();  //현재 년도
    var month = new Date().getMonth()+1;  //현재 월
    var date  = new Date().getDate();  //현재 일
    var week  = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일');	  //요일 정의
    var thisWeek  = week[new Date().getDay()];	//현재 요일

    var ampm = new Date().getHours() >= 12 ? 'PM' : 'AM';
    var	thisHours = new Date().getHours() >=13 ?  new Date().getHours()-12 : new Date().getHours(); //현재 시
    var	thisMinutes = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes(); //현재 분
    var NowTime = year + "." + month + "." + date + " " + ampm + " " + thisHours + ':' + thisMinutes;

    // 사이즈 정의
    var winHeight = $(window).height();

    $('#cahtbotWrap').each(function(){
        var cahtbotWrapHeight = $('#cahtbotWrap').height();
        $('.chatUI_mid').css({
            'height': Math.round(cahtbotWrapHeight-145),
        });
    });

    // 첫멘트 시간
    $('.chatUI_mid .lst_talk li.bot .cont:last-child').append('<em class="date"><b>' + ampm + '</b>' + NowTime + '</em>');

    // 내용있을 시 스크롤 최하단
    $('.chatUI_mid').scrollTop($('.chatUI_mid')[0].scrollHeight);


    // 추천질문 (text 출력)
    $('.info_btnBox li button').on('click', function() {
        var recomQust = $(this).text();

        $('#inputArea').val(recomQust);
        $('#btn_chat').trigger('click');

        $('.chatbot_contents .bot_infoBox').css({
            'display':'none'
        });
        $('.chatbot_contents .lst_talk').css({
            'display':'block'
        });

        $('#inputArea').val('');
        $('.chatUI_mid').scrollTop($('.chatUI_mid')[0].scrollHeight);

    });


    // 채팅입력 (text 출력)
    $('#btn_chat').on('click', function() {
        // textarea 텍스트 값 및 엔터처리
        var textValue = $('#inputArea').val().replace(/(?:\r\n|\r|\n)/g, '<br>');

        // 채팅창에 text 출력
        if( $('#inputArea').val().replace(/\s/g,"").length == 0){
            // text가 없으면 실행
        } else {
            // text가 있으면 실행
            answer("utter", textValue, false);
        }
    });
    // Responsed 버튼 입력 (Text 출력)
    $(document).on('click', '.intent', function(){

        var intent = $(this).data('intent');
        var display = $(this).data('display');

        answer("intent", intent, display);
    });

    // Response
    function answer(type, value, display){
        var year  = new Date().getFullYear();  //현재 년도
        var month = new Date().getMonth()+1;  //현재 월
        var date  = new Date().getDate();  //현재 일

        var ampm = new Date().getHours() >= 12 ? 'PM' : 'AM';
        var	thisHours = new Date().getHours() >=13 ?  new Date().getHours()-12 : new Date().getHours(); //현재 시
        var	thisMinutes = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes(); //현재 분
        var NowTime = year + "." + month + "." + date + " " + ampm + " " + thisHours + ':' + thisMinutes;

        if (!display) {
            display = value;
        }
        var data = {"type": type, "input":value.replace("<br>", ""), "host": host, "lang": lang, "jsonData": JSON.stringify(getJsonData())};

        $('.chatUI_mid .lst_talk').append(
            '<li class="user"> \
                <span class="cont"> \
                    <em class="txt">' + display + '</em> \
						<em class="date">' + NowTime + '</em> \
					</span> \
				</li>'
        );
        $('.chatbot_contents .bot_infoBox').css({'display':'none'});
        $('.chatbot_contents .lst_talk').css({'display':'block'});
        $('#inputArea').val('');

        callBackend(data);

        $('.chatUI_mid').scrollTop($('.chatUI_mid')[0].scrollHeight);
    }

    function sendHostInfo(e) {

        data = e.data;
        host = data.host;
        lang = data.lang;
        qrLocation = data.qrLocation;

        // 지구본 (lang) js 추가
        var langLength = $('.langBox .lst_lang > li').length;
        if ( host == 4 ) {
            langLength = 1;
        }
        if ( langLength == 1 ) {
            $('.langBox').remove();
        }

        actChatbotOpen();
        changeTextHolder(lang);

        $.ajax({
            url: "/chat/hostInfo",
            data: JSON.stringify(data),
            type: "POST",
            contentType: 'application/json'
        }).done(function (response) {
            callBackend({"type": "intent", "input":"처음으로", "host": host, "lang":lang, "jsonData": JSON.stringify(getJsonData())})
        });
    }

    function changeTextHolder(lang) {
        switch (lang.toString()) {
            // KOR
            case "1": placeholderText = "메세지를 입력해 주세요";
                break;
            // ENG
            case "2": placeholderText = "Please enter a message.";
                break;
            // JPN
            case "3": placeholderText = "メッセージを入力してください";
                break;
            // CHN
            case "4": placeholderText = "请输入信息。";
                break;
            default:
        }

        $("#inputArea").attr("placeholder", placeholderText);
    }

    // call Backend
    function callBackend(data) {
        $.ajax({
            url: "/chat/request",
            data: JSON.stringify(data),
            type: "POST",
            contentType: 'application/json'
        }).done(function (response) {

            for(var index = 0 ; index < response.length; index++) {
                selectResponseType(response[index]);
            }
            selectResponseType(response);
        });

        $('.chatbot_contents .bot_infoBox').css({'display':'none'});
        $('.chatbot_contents .lst_talk').css({'display':'block'});
    }

    function selectResponseType(response) {
        if(!!response.answer) {
            var ans = response.answer;

            // map이나 inquiry 중 하나만 있다고 가정.
            // console.log(ans);

            if (ans.includes("|||MAP|||")) {
                var res = ans.split("|||MAP|||");
                botResponseMap(res[1]);
                response.answer = res[0];

            } else if (ans.includes("|||INQUIRY|||")) {
                var res = ans.split("|||INQUIRY|||");
                botResponseInquiry(res[1]);
                response.answer = res[0];
            } else if (ans.includes("|||ORDER|||")) {
                var res = ans.split("|||ORDER|||");
                botResponseOrder(res[1]);
                response.answer = res[0];
            } else if (ans.includes("|||PROMOTION|||")) {
                var res = ans.split("|||PROMOTION|||");
                botResponsePromotion(res[1]);
                response.answer = res[0];
            } else if (ans.includes("|||IMG_CAROUSEL|||")) {
                var res = ans.split("|||IMG_CAROUSEL|||");
                // 이미지 캐로셀은 예외적으로 textResponse를 먼저 처리.
                response.answer = res[0];
                if (!!response.answer) botResponseText(response.answer);
                response.answer = undefined;

                botResponseImgCarousel(res[1]);
            }
        }

        if (!!response.answer) botResponseText(response.answer);
        if (response.list.length > 0) botResponseList(response.list);
        botResponseButton(response.buttons);
        if (response.carousel.length > 0) botResponseCarousel(response.carousel);
        if (!!response.farewell) botResponseText(response.farewell);
        botResponseTime();
        makeTxtInnerButton();
    }

    function botResponseTime() {
        // 날짜, 요일 시간 정의
        var year  = new Date().getFullYear();  //현재 년도
        var month = new Date().getMonth()+1;  //현재 월
        var date  = new Date().getDate();  //현재 일
        var week  = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일');	  //요일 정의
        var thisWeek  = week[new Date().getDay()];	//현재 요일

        var ampm = new Date().getHours() >= 12 ? 'PM' : 'AM';
        var	thisHours = new Date().getHours() >=13 ?  new Date().getHours()-12 : new Date().getHours(); //현재 시
        var	thisMinutes = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes(); //현재 분
        var NowTime = year + "." + month + "." + date + " " + ampm + " " + thisHours + ':' + thisMinutes;

        $('.bot:last').append(
            '<div class="date">'+ NowTime +'</div>'
        );
        $('.chatUI_mid').scrollTop($('.chatUI_mid')[0].scrollHeight);
    }

    function botResponseText(botMsg) {
        $('.chatUI_mid .lst_talk').append(
            '<li class="bot"> \
                <span class="cont"> \
                    <em class="txt">' +
            botMsg +
            '</em> \
           </span><br>\
       </li>'
        );
        $('.chatUI_mid').scrollTop($('.chatUI_mid')[0].scrollHeight);
    }

    function botResponseList(list_response) {
        var list_li = "";

        list_response.forEach(function (list_ele) {
            list_li += '<li><a class="intent" href="#" data-display="'+ list_ele.display +'" data-intent="'+ list_ele.intent.intent +'" >' + list_ele.display  + '</a></li>';
        });

        var list_html =
            '<li class="bot"> \
            <div class="bot_msg">\
                <div class="btnLst">';
        list_html += '<ul>' + list_li + '</ul>\
        </div>\
        </div>\
        </li>';

        $('.chatUI_mid .lst_talk').append(list_html)
        $('.chatUI_mid').scrollTop($('.chatUI_mid')[0].scrollHeight);

    }

    function botResponseButton(button_response) {
        var button_li = "";
        var first_btn;

        if (button_response.length > 0) {
            button_response.forEach(function (button_ele) {
                button_li += '<li><a class="intent" href="#" data-display="'+ button_ele.display +'" data-intent="'+ button_ele.intent.intent +'">' + button_ele.display  + '</a></li>';
            });
        }

        if (lang == 1) {
            first_btn = "처음으로"
        }

        if (lang == 2) {
            first_btn = "Restart"
        }

        if (lang == 3) {
            first_btn = "再起動"
        }

        if (lang == 4) {
            first_btn = "重新启动"
        }

        button_li += '<li><a class="intent btnStart" href="#" data-display="처음으로" data-intent="처음으로">'+ first_btn +'</a></li>';

        $('.chatUI_mid .lst_talk').append(
            '<li class="bot"> \
            <div class="bot_msg">\
                <div class="btnItem">\
                    <ul>'+button_li+' </ul>\
            </div>	\
        </div>\
        </li>'
        );
        $('.chatUI_mid').scrollTop($('.chatUI_mid')[0].scrollHeight);

    }

    function botResponseCarousel(carousel_response) {
        var carousel_div = "";

        carousel_response.forEach(function (carousel_ele) {
            var intent = carousel_ele.intent;

            if (!intent.displayText)  {
                intent.displayText = "";
            }

            carousel_div +=
                '<div class="swiper-slide"> \
                    <a class="swiper_item intent" href="#" target="_self" data-intent="'+ intent.intent +'" data-display="'+ carousel_ele.display +'">\
                        <span class="item_img"><img src="' + intent.displayUrl + '" onError="this.src=\'/resources/images/redtie.jpg\'"></span> \
                        <span class="item_tit">'+ intent.displayName +'</span> \
						<span class="item_txt">'+ intent.displayText +'</span> \
					</a> \
				</div>';
        });

        $('.chatUI_mid .lst_talk').append(
            '<li class="bot botMsg_swiper"> \
                <div class="swiper-wrapper">'
            + carousel_div +
            '</div> \
        <div class="swiper-pagination"></div> \
            <div class="swiper-button-prev"></div> \
            <div class="swiper-button-next"></div> \
        </li>'
        );

        var swiper_option = {
            init : false,
            speed : 200,
            slidesPerView:2,
            spaceBetween: 10,
            centeredSlides: false,
            loop: false,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
        };

        if (carousel_response.length > swiper_option.slidesPerView) {
            swiper_option.loop = true;
        }

        var swiper = new Swiper('.botMsg_swiper', swiper_option);
        // var lenght = $('.botMsg_swiper').length;
        // if (lenght > 1) {
        //     for (var i = lenght-1; i > 1; i--) {
        //         if ($('.botMsg_swiper')[i].localName === 'li') {
        //             $('.botMsg_swiper')[i].swiper.init();
        //             break;
        //         }
        //     }
        // } else {
        //     $('.botMsg_swiper:last')[0].swiper.init();
        // }

        $('.botMsg_swiper:last')[0].swiper.init();
        $('.chatUI_mid').scrollTop($('.chatUI_mid')[0].scrollHeight);

    }

    function botResponsePromotion(promoResponse) {
        promoResponse = JSON.parse(promoResponse);

        $('.chatUI_mid .lst_talk').append(
            '<li class="bot bot_promotion"> \
            <div class="bot_msg">\
                <div class="generic"> \
                    <span class="generic_img"><img src="' + promoResponse.img + '" alt="프로모션 사진"></span> \
                    <span class="generic_tit">' + promoResponse.title + '</span> \
                        <div class="txt">' + promoResponse.comment + '</div> \
                 </div> \
            </div>\
            </li>'
        );

        $('.chatUI_mid').scrollTop($('.chatUI_mid')[0].scrollHeight);
    }

    /* 예약 일자: datetimepicker */
    $('#reservation_date').datetimepicker({
        minDate: 'now',
        locale: 'ko',
        inline: true,
        format: 'YYYY-MM-DD HH:mm dd',
        dayViewHeaderFormat: 'YYYY / MM ',
        stepping: 30,
        daysOfWeekDisabled: [0],
        disabledDates: ['2020-01-01','2020-03-01','2020-05-01','2020-05-05','2020-06-06','2020-08-15','2020-10-03','2020-10-09','2020-12-25'],
        // 01-01 새해(신정), 03-01 삼일절, 05-01 근로자의날, 05-05 어린이날, 06-06 현충일, 08-15 광복절, 10-03 개천절, 10-09 한글날, 12-25 크리스마스
        // 설날(구정)				음력 1월 1일
        // 석가탄신일(부처님오신날)	 음력 4월 8일
        // 추석						음력 8월 15일
        disabledHours: [0,1,2,3,4,5,6,7,8,20,21,22,23],
        icons: {
            time: 'glyphicon glyphicon-time',
            date: 'glyphicon glyphicon-calendar',
            up: 'glyphicon glyphicon-chevron-up',
            down: 'glyphicon glyphicon-chevron-down',
            previous: 'glyphicon glyphicon-chevron-left',
            next: 'glyphicon glyphicon-chevron-right',
            today: 'glyphicon glyphicon-screenshot',
            clear: 'glyphicon glyphicon-trash',
            close: 'glyphicon glyphicon-remove'
        }
    });

    function initializeInquiryDisplsy(){
        for (i = 0; i < $('.chat_inquiry .chatAside_bd .form dl.dlBox').length; i++) {
            dl = $('.chat_inquiry .chatAside_bd .form dl.dlBox')[i];
            dl.style.display = 'None';
        }
    }

    function botResponseOrder(orderResponse) {
        var $chatAside;
        var isCafe;
        // 현재 ui hard coding, todo: 메뉴명 db에서 가져오도록.
        if (orderResponse.includes("PAVAN")) {
            $chatAside = $('.cafe_order').parent();
            isCafe = true;
            handleChatAsideOrder();
        } else if (orderResponse.includes("DELIGHT")) {
            $chatAside = $('.food_order').parent();
            isCafe = false;
            handleChatAsideOrder();
        }

        // 추가 AMR 200412 주문하기 카테고리 메뉴 open close
        function handleChatAsideOrder() {
            var categoryBtn = $('.chatAside .chat_order .category');
            var categoryMenu = $('.chatAside .chat_order .category_menu');
            var $eachmenu = $('.chatAside .chat_order .each_menu');
            var $checkbox = $('.chatAside .chat_order .each_menu [type="checkbox"]');

            categoryBtn.on('click', function(event){
                event.preventDefault();
                var thisCategoryMenu = $(this).siblings(categoryMenu);

                if ( thisCategoryMenu.hasClass('on') ) {
                    categoryMenu.removeClass('on');
                } else {
                    categoryMenu.removeClass('on');
                    thisCategoryMenu.toggleClass('on');
                }
            });

            // 체크박스 체크해제 시 수량 초기화
            $checkbox.on('change', function(event){
                event.preventDefault();
                var $eachmenu = $(this).parents('.each_menu');

                if ( $(this).prop('checked') == false ) {
                    $eachmenu.find('.count').val('');
                }
                calcTotalPrice()
            });

            // 주문 수량을 적으면 메뉴체크
            $chatAside.find('.chat_order .count').on('keyup', function(event){
                event.preventDefault();
                var $eachmenu = $(this).parents('.each_menu');

                $eachmenu.find('[type="checkbox"]').prop('checked', Boolean(Number(this.value)));
                calcTotalPrice()
            });

            // 선택한 메뉴들 합계
            function calcTotalPrice() {
                var totalPrice = 0;
                var $total = $chatAside.find('.chat_order .total_price');

                $eachmenu.each(function(){
                    var price = Number($(this).find('span.price').text().replace(/,/g, ''));
                    var count = Number($(this).find('.count').val());
                    totalPrice = (price * count) + totalPrice;
                });
                var priceText = '총 가격: ' + numberFormat(totalPrice) + '원';
                $total.text(priceText);
                return numberFormat(totalPrice);
            }

            function clearOrderForm () {
                // input field clear
                $chatAside.find(".chat_order input[name='name']").val('');
                $chatAside.find(".chat_order input[name='tel']").val('');
                $chatAside.find(".chat_order input[name='email']").val('');
                // $(".chat_order input[name='pickupTime']").val('');
                $chatAside.find(".chat_order textarea[name='add']").val('');

                // each menu count clear
                $eachmenu.each(function(){
                    $(this).find('.count').val(0);
                });
                // total price clear
                $chatAside.find('.chat_order .total_price').text('');
                $chatAside.find('.stn_area').scrollTop($chatAside.find('.stn_area'));

                //checkbox, radio button clear
                $chatAside.find('input[type="checkbox"], input[type="radio"]').removeAttr('checked');
            }

            function checkOrderData(orderData) {
                if (!orderData.tos) {
                    alert('개인정보동의 약관에 동의해주세요');
                    return false;
                }
                if (orderData.name === undefined || orderData.name === '') {
                    alert('이름을 입력해주세요');
                    return false;
                }
                if (orderData.phone === undefined || orderData.phone === '') {
                    alert('전화번호를 입력해주세요');
                    return false;
                }
                if (orderData.email === undefined || orderData.email === '') {
                    alert('이메일을 입력해주세요');
                    return false;
                }
                if (orderData.reqList === undefined || orderData.reqList.length <= 0) {
                    alert('메뉴를 선택해주세요');
                    return false;
                }
                if (orderData.pickupTime === undefined || orderData.pickupTime === '') {
                    if (isCafe) {alert('픽업시간을 선택해주세요');}
                    else {alert('수령일자를 선택해주세요');}
                    return false;
                }
                if (!isCafe && $chatAside.find('input:radio[name="take"]:checked').length <= 0) {
                    alert('수령시간을 선택해주세요');
                    return false;
                }
                if (orderData.payment === undefined || orderData.payment === '') {
                    alert('결제방법을 선택해주세요');
                    return false;
                }

                return true;
            }

            // aside open
            $(document).on('click', '.order_btn', function(){
                $chatAside.addClass('aside_show');
                window.parent.postMessage("aside_open", "*");
                // 현재 무조건 checked. todo: 삭제
                $chatAside.find('input[name="agreement"]').prop('checked', true);
            });

            // 약관보기
            $chatAside.find('.btn_terms').on('click', function(){
                $(this).parents('.chatAside_bd').addClass('info_screen');
            });

            // 약관 열어서 확인 (아직 약관 내용 없으므로 작동하지 않음)
            $chatAside.find('.chat_order .btn_point').on('click', function(){
                $(this).parents('.chatAside_bd').removeClass('info_screen');
                $chatAside.find('input[name="agreement"]').prop('checked', true);
            });


            // aside close (input value 초기화 및 창 닫힘)
            $('.btn_chatAside_close').on('click', function(){
                clearOrderForm();
                window.parent.postMessage("aside_close", "*");
                $(this).parents($chatAside).removeClass('aside_show').find('.chatAside_bd').removeClass('success_screen');
                // $(this).parents($chatAside).find('input[type="text"], input[type="tel"], textarea').val('');
                $(this).parents($chatAside).find('input[type="checkbox"], input[type="radio"]').removeAttr('checked');
            });

            /* 추가 200412 AMR주문하기 픽업시간 */
            $('#pickup_time').datetimepicker({
                locale: 'ko',
                inline: true,
                format: 'HH:mm',
                dayViewHeaderFormat: 'YYYY 년 MM 월',
                stepping: 15,
                daysOfWeekDisabled: [0],
                disabledDates: ['2020-01-01','2020-03-01','2020-05-01','2020-05-05','2020-06-06','2020-08-15','2020-10-03','2020-10-09','2020-12-25'],
                // 01-01 새해(신정), 03-01 삼일절, 05-01 근로자의날, 05-05 어린이날, 06-06 현충일, 08-15 광복절, 10-03 개천절, 10-09 한글날, 12-25 크리스마스
                // 설날(구정)				음력 1월 1일
                // 석가탄신일(부처님오신날)	 음력 4월 8일
                // 추석						음력 8월 15일
                disabledHours: [0,1,2,3,4,5,6,7,8,17,18,19,20,21,22,23],
                icons: {
                    time: 'glyphicon glyphicon-time',
                    date: 'glyphicon glyphicon-calendar',
                    up: 'glyphicon glyphicon-chevron-up',
                    down: 'glyphicon glyphicon-chevron-down',
                    previous: 'glyphicon glyphicon-chevron-left',
                    next: 'glyphicon glyphicon-chevron-right',
                    today: 'glyphicon glyphicon-screenshot',
                    clear: 'glyphicon glyphicon-trash',
                    close: 'glyphicon glyphicon-remove'
                }
            });

            // submit btn onclick
            var submitBtn = $chatAside.find('.chatAside_bd div.btnBox button.btn_submit');
            submitBtn.prop("onclick", null).off("click");
            submitBtn.on('click', function(event) {
                var orderList = [];
                $eachmenu.each(function(){
                    var label = $(this).find('label').text();
                    var count = Number($(this).find('.count').val());

                    if (count > 0) {
                        var order = [label, count + "개"];
                        orderList.push(order);
                    }
                });

                var checkedTake = $chatAside.find('input:radio[name="take"]:checked');
                var checkedPayment = $chatAside.find('input:radio[name="payment"]:checked');
                var pickupTime = $chatAside.find(".chat_order input[name='pickupTime']").val();
                var take = checkedTake[0] ? checkedTake.siblings("label[for='" + checkedTake[0].id + "']").text() : "";

                var orderData = {
                    "tos" : $('input[name="agreement"]').is(':checked'),
                    "name": $chatAside.find(".chat_order input[name='name']").val(),
                    "phone": $chatAside.find(".chat_order input[name='tel']").val(),
                    "email": $chatAside.find(".chat_order input[name='email']").val(),
                    "pickupTime": isCafe ? pickupTime : pickupTime + '/' + take,
                    "msg": $chatAside.find(".chat_order textarea[name='add']").val(),
                    "totalPrice": calcTotalPrice(),
                    "reqList": orderList,
                    "take": isCafe ? take : '',
                    "payment": checkedPayment[0]? checkedPayment.siblings("label[for='" + checkedPayment[0].id + "']").text() : ""
                };

                if (!checkOrderData(orderData)){
                    return;
                }

                // console.log(orderData);

                // success 팝업 채우기
                $chatAside.find('.chatAside_bd div.check_order span.order_name').siblings('em').text(orderData.name);
                $chatAside.find('.chatAside_bd div.check_order span.order_phone').siblings('em').text(orderData.phone);
                $chatAside.find('.chatAside_bd div.check_order span.order_email').siblings('em').text(orderData.email);
                $chatAside.find('.chatAside_bd div.check_order span.order_take').siblings('em').text(orderData.take);
                $chatAside.find('.chatAside_bd div.check_order span.order_payment').siblings('em').text(orderData.payment);
                $chatAside.find('.chatAside_bd div.check_order span.order_pickupTime').siblings('em').text(orderData.pickupTime);
                $chatAside.find('.chatAside_bd div.check_order span.order_msg').siblings('p').text(orderData.msg);
                $chatAside.find('.chatAside_bd div.check_order span.order_totalPrice').siblings('em').text(orderData.totalPrice);
                var reqListP = $chatAside.find('.chatAside_bd div.check_order span.order_reqList').siblings('p');
                reqListP.empty();
                var orderResTxt = '';
                for (var i in orderList) {
                    var order = orderList[i];
                    var em = $("<em></em>").text(order[0] + ' ' + order[1]);
                    orderResTxt += order[0] + ' ' + order[1] + '</br>';
                    reqListP.append(em);
                }

                $chatAside.find('.chatAside_bd').addClass('success_screen');
                $chatAside.find('.chatAside_bd div.check_order .btn_point.btn_chatAside_close').off('click');
                $chatAside.find('.chatAside_bd div.check_order .btn_point.btn_chatAside_close').on('click', function (event) {
                    clearOrderForm();
                    callBackend({"type": "intent",
                        "input": JSON.stringify(orderData),
                        "host": host, "lang":lang,
                        "jsonData": JSON.stringify(getJsonData())});
                    window.parent.postMessage("aside_close", "*");
                    $chatAside.find('.chatAside_bd').removeClass('success_screen');
                   botResponseText(orderResTxt + "주문 완료되었습니다.");
                });
            });
        }
    }

    function botResponseInquiry(iqrResponse) {
        iqrResponse = JSON.parse(iqrResponse);

        initializeInquiryDisplsy();

        // 문의하기 및 예약하기 팝업 채우기
        // title
        $('.chatAside_hd h3').text(iqrResponse.title);
        // 이용약관
        iqrResponse.tos.forEach(function(terms){
            $('.chatAside_bd .tos p.txt').text(terms.title);
            $('.chatAside_bd .tos div.iptBox label').text(terms.check);
            $('.chatAside_bd .tos div.iptBox button.btn_terms').text(terms.btn);
        });

        // form
        $('.chatAside_bd .form p.txt').text(iqrResponse.form.comment);
        fields = iqrResponse.form.field;
        for (name in fields) {
            field = fields[name];
            title = field.title;

            $('.chatAside_bd .form dl.dlBox.form_' + name)[0].style.display = '';
            $('.chatAside_bd .form dl.dlBox.form_' + name + ' dt').text(title);

            if (field.placeholder) {
                $('.chatAside_bd .form dl.dlBox.form_' + name + ' dd input.ipt_txt').placeholder = field.placeholder
            }

            if ($('.chatAside_bd .form dl.dlBox.form_' + name + ' dd .radioBox').length !== 0) {
                // radio btn options
                for (label in field.options) {
                    $('.chatAside_bd .form dl.dlBox.form_' + name + ' dd .radioBox label[for=' + label  + ']')
                        .text(field.options[label].title);
                }
            }
        }

        // datetimepicker 관련 meta 설정
        if (!!fields['datetime']) {
            var meta = fields['datetime'].meta;
            $('.glyphicon-time').attr('time-data-before', meta.timePlaceholder);
            $('.glyphicon-time').attr('date-data-before', meta.datePlaceholder);

            $('.chatAside_bd .form dl.dlBox.form_datetime dd.pick_guide .pick_guide01').next().text(meta.today);
            $('.chatAside_bd .form dl.dlBox.form_datetime dd.pick_guide .pick_guide02').next().text(meta.available);
            $('.chatAside_bd .form dl.dlBox.form_datetime dd.pick_guide .pick_guide03').next().text(meta.selected);
        }

        // submit button
        $('.chatAside_bd div.btnBox button.btn_submit').text(iqrResponse.form.submitBtn);

        var $chatAside = $('.chat_inquiry').parent();

        // submit btn onclick
        var submitBtn = $('.chatAside_bd div.btnBox button.btn_submit');
        submitBtn.prop("onclick", null).off("click");
        submitBtn.on('click', function(){
            var $thisChatAside = $(this).parents($chatAside);
            if ( !!iqrResponse.tos[0] && iqrResponse.tos[0].required &&
                !!$thisChatAside.find('input[name="agreement"]').length &&
                !$thisChatAside.find('input[name="agreement"]').is(':checked') ) {
                // alert('개인정보 약관에 동의해주세요');
                alert(iqrResponse.tos[0].requireAlert);
                return;
            }
            if ( !!fields['name'] && fields['name'].required &&
                !!$thisChatAside.find('input[name="name"]').length &&
                !$thisChatAside.find('input[name="name"]').val().trim() ) {
                // alert('이름을 입력해주세요');
                alert(fields['name'].requireAlert);
                return;
            }
            if ( !!fields['gender'] && fields['gender'].required &&
                !!$thisChatAside.find('input[name="gender"]').length &&
                !$thisChatAside.find('input[name="gender"]').is(':checked') ) {
                // alert('성별을 선택해주세요');
                alert(fields['gender'].requireAlert);
                return;
            }
            if ( !!fields['tel'] && fields['tel'].required &&
                !!$thisChatAside.find('input[name="tel"]').length &&
                !$thisChatAside.find('input[name="tel"]').val().trim() ) {
                // alert('연락처를 입력해주세요');
                alert(fields['tel'].requireAlert);
                return;
            }
            if ( !!fields['email'] && fields['email'].required &&
                !!$thisChatAside.find('input[name="email"]').length &&
                !$thisChatAside.find('input[name="email"]').val().trim() ) {
                // alert('이메일을 입력해주세요');
                alert(fields['email'].requireAlert);
                return;
            }
            if ( !!fields['datetime'] && fields['datetime'].required &&
                !!$thisChatAside.find('input[name="datetime"]').length &&
                !$thisChatAside.find('input[name="datetime"]').val().trim() ) {
                // alert('날짜를 선택해주세요');
                alert(fields['datetime'].requireAlert);
                return;
            }
            if ( !!fields['inquiry'] && fields['inquiry'].required &&
                !!$thisChatAside.find('textarea[name="inquiry"]').length &&
                !$thisChatAside.find('textarea[name="inquiry"]').val().trim() ) {
                // alert('요청사항을 입력해주세요');
                alert(fields['inquiry'].requireAlert);
                return;
            }

            // 문의내용 뒷단으로 넘기기
            var genderInfo = '남자';
            if ($('input:radio[id="gender_woman"]').is(':checked')){
                genderInfo = '여자';
            }
            var inquiryData = {
                "name": $(".form_name").find("input").val(),
                "gender": genderInfo,
                "phone": $(".form_tel").find("input").val(),
                "email": $(".form_email").find("input").val(),
                "datetime": $(".form_datetime").find("input").val(),
                "add": $(".form_add").find("textarea").val(),
                "inquiryMsg": $(".form_inquiry").find("textarea").val()};

            callBackend({"type": "intent", "input": JSON.stringify(inquiryData), "host": host, "lang":lang, "jsonData": JSON.stringify(getJsonData())});

            // success 팝업 채우기
            $('.chatAside_bd div.stnBox.popup .popup_content .popup_txt em').text(iqrResponse.form.successPopup.title);
            $('.chatAside_bd div.stnBox.popup .popup_content .popup_txt p').html(iqrResponse.form.successPopup.description);
            $thisChatAside.find('.chatAside_bd').addClass('success_screen');

        });

        // aside open
        $(document).on('click', '.inquiry_btn', function(){
            $chatAside.addClass('aside_show');
            window.parent.postMessage("aside_open", "*");
        });

        // aside close (input value 초기화 및 창 닫힘)
        $('.btn_chatAside_close').on('click', function(){
            window.parent.postMessage("aside_close", "*");
            $(this).parents($chatAside).removeClass('aside_show').find('.chatAside_bd').removeClass('success_screen');
            $(this).parents($chatAside).find('input[type="text"], input[type="tel"], textarea').val('');
            $(this).parents($chatAside).find('input[type="checkbox"], input[type="radio"]').removeAttr('checked');
        });

        // 추가 200306 AMR 약관보기
        $chatAside.find('.btn_terms').on('click', function(){
            $(this).parents('.chatAside_bd').addClass('info_screen');
        });

        $chatAside.find('.info_text .btn_point').on('click', function(){
            $(this).parents('.chatAside_bd').removeClass('info_screen');
            $chatAside.find('input[name="agreement"]').prop('checked', true);
        });
    }

    // swiper
    function applySwiper (selector, option) {
        var defaultOption = {
            speed : 200,
            slidesPerView:2,
            spaceBetween: 10,
            centeredSlides: false,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
        };
        return new Swiper(selector, $.extend(defaultOption, option))
    }

    function handleSwipePopupPreviewOpenClose() {
        //open
        $('.full_preview .swiper_item').on('click', function(e){
            $('.popup_swipe_backdrop').addClass('popup_active');
            var slideIndex = $('.full_preview .swiper-slide').index($(this).parent());
            var thisSlide = slideIndex;
            var swiper = applySwiper($('.popup_swipe_backdrop .botMsg_swiper'), { slidesPerView:1, initialSlide: thisSlide, });

            //close (btn click)
            function handleClose(){
                e.stopPropagation();
                swiper.destroy();
                $('.popup_swipe_backdrop .popup_swipe_preview').off('click');
                $('.popup_swipe_backdrop').removeClass('popup_active');
                $('.btn_popupClose').off('click', handleClose);
                $('.popup_swipe_backdrop').off('click');
            }

            $('.btn_popupClose').on('click', handleClose);

            $('.popup_swipe_backdrop .popup_swipe_preview').on('click', function(e){
                e.stopPropagation();
            });

            //close (영역 밖 click)
            $('.popup_swipe_backdrop').on('click', function(){
                if ( $(this).hasClass('popup_active') ) {
                    handleClose();
                }
            });
        });
    }

    function botResponseImgCarousel(imgResponse) {
        imgResponse = JSON.parse(imgResponse);

        var imgCarouselHtml =
            '<li class="bot"> \
                <div data-swiper-id="2" class="botMsg_swiper full_preview">\
                    <div class="swiper-wrapper">';

        // img 클릭시 나오는 Back swiper를 별도로 그려줘야.
        var imgBackdropHtml =
            '<div class="popup_swipe_backdrop"> \
                <div class="popup_swipe_preview"> \
                    <div class="botMsg_swiper"> \
                        <div class="swiper-wrapper">';

        for (i in imgResponse.imgList) {
            var img = imgResponse.imgList[i];
            imgCarouselHtml +=
                '<div class="swiper-slide"> \
                    <a class="swiper_item" href="#" target="_self"> \
                        <span class="item_img"><img src="' + img.src + '" alt="' + img.title + '"></span> \
                    </a> \
                </div>';

            imgBackdropHtml +=
                '<div class="swiper-slide"> \
                    <div class="swiper_item"> \
                        <span class="item_img"><img src="' + img.src + '" alt="' + img.title + '"></span> \
                    </div> \
                </div>';
        }

        imgCarouselHtml +=
            '</div> \
                <!-- [D] Swiper Pagination --> \
            <div class="swiper-pagination"></div> \
            <!-- [D] Swiper navigation buttons --> \
            <div class="swiper-button-prev"></div> \
            <div class="swiper-button-next"></div> \
            </div>\
        </li>';

        imgBackdropHtml +=
            '</div>\
            <!-- [D] Swiper Pagination -->\
            <div class="swiper-pagination"></div>\
            <!-- [D] Swiper navigation buttons -->\
            <div class="swiper-button-prev"></div>\
            <div class="swiper-button-next"></div>\
            <button type="button" class="btn_popupClose"><em>팝업 닫기</em></button>\
        </div>';


        $('.chatUI_mid .lst_talk').append(imgCarouselHtml);
        $('#chatUI_wrap').append(imgBackdropHtml);

        handleSwipePopupPreviewOpenClose();
        applySwiper($('[data-swiper-id="2"]'), {slidesPerView: 1});

        $('.chatUI_mid').scrollTop($('.chatUI_mid')[0].scrollHeight);
    }

    function botResponseMap(map_response) {
        var jsonRes = JSON.parse(map_response);
        // console.log(jsonRes)

        var mapSelectHtml =
            '   <li class="bot"> \
                <div class="bot_msg"> \
                    <div class="btnLst"> \
                        <span class="txt txt_radius">' + jsonRes.answer + '</span> \
                    <div class="iptBox"> \
                        <dl class="dl_ipt"> \
                            <dt>' + jsonRes.texts.start + '</dt> \
                            <dd> \
                                <select class="select start">';

        var startCustomCheck = false;
        jsonRes.starts.forEach(function(start) {
            mapSelectHtml += '<option data-location=';
            if(start.location.hasOwnProperty("get"))
            {
                mapSelectHtml += '"' + start.location.get + '"';
                if(start.location.get == "custom")
                {
                    mapSelectHtml += 'value="direct"  '
                }
            }
            else
            {
                mapSelectHtml += '\'{"lat": ' + start.location.lat + ', "lng": ' + start.location.lng + '}\' ';
            }
            if(start.selected){
                mapSelectHtml += 'selected';
                if(start.location.get == "custom")
                {
                    startCustomCheck = true;
                }
            }
            mapSelectHtml +='> ' + start.name + '</option>';
        });

        mapSelectHtml +=
            '                       </select> \
                                    <input type="text" name="selboxDirect" class="ipt_txt selboxDirect startInput" value="" \
            ';
        if(startCustomCheck){
            mapSelectHtml += 'style="display: inline-block;"'
        }
        mapSelectHtml += '> \
                            </dd> \
                        </dl> \
                        <dl class="dl_ipt"> \
                            <dt>' + jsonRes.texts.end + '</dt> \
                            <dd> \
                                <select class="select end"> \
        ';

        var endCustomCheck = false;
        jsonRes.ends.forEach(function(end) {
            mapSelectHtml += '<option data-location=';
            if(end.location.hasOwnProperty("get"))
            {
                mapSelectHtml += '"' + end.location.get + '"';
                if(end.location.get == "custom")
                {
                    mapSelectHtml += 'value="direct" ';
                }
            }
            else
            {
                mapSelectHtml += '\'{"lat": ' + end.location.lat + ', "lng":' + end.location.lng + '}\' '
            }
            if(end.selected){
                mapSelectHtml +='selected';
                if(end.location.get === "custom")
                {
                    endCustomCheck = true;
                }
            }
            mapSelectHtml +='> ' +  end.name + '</option>';
        });

        mapSelectHtml +=
            ' \
                                    </select> \
                                    <input type="text" name="selboxDirect" class="ipt_txt selboxDirect endInput" value="" \
            ';
        if(endCustomCheck){
            mapSelectHtml += 'style="display: inline-block;"'
        }
        mapSelectHtml += '\
                                > \
                            </dd> \
                        </dl> \
                    </div> \
                    <div class="btnBox"> \
                        <button type="button" class="btn_point btn_map">' + jsonRes.texts.button + '</button> \
                    </div> \
                </div> \
            </div>  \
            </li> \
         ';

        $('.chatUI_mid .lst_talk').append(
            mapSelectHtml
        );

        $('.chatUI_mid').scrollTop($('.chatUI_mid')[0].scrollHeight);

        //191129 추가
        //대화Type (출발지&도착지)
        $('.dl_ipt .select').on('change', function(){
            if ($(this).val() == 'direct') {
                $(this).parent().find('.selboxDirect').show();
            } else {
                $(this).parent().find('.selboxDirect').hide();
            }
        });

        //지도UI
        $('.btn_map').on('click', function(e){
            $('.mapWrap').removeClass('map_hide');
            $('#map').show();
            // 경로 그리기
            var start = $(this).parent().parent().find('select.start')[0];
            var startCoord = start.options[start.selectedIndex].getAttribute('data-location');
            var startData;
            if(startCoord == "current" || startCoord == "custom"){startData = startCoord;}
            else {startData = JSON.parse(startCoord);}

            var end = $(this).parent().parent().find('select.end')[0];
            var endCoord = end.options[end.selectedIndex].getAttribute('data-location');
            var endData;
            if(endCoord == "current" || endCoord == "custom"){endData = endCoord;}
            else {endData = JSON.parse(endCoord);}

            var startInput = $(this).parent().parent().find('input.startInput').val();
            var endInput = $(this).parent().parent().find('input.endInput').val();

            if(startCoord == 'custom') { $('#startLctn').val(startInput); }
            else { $('#startLctn').val(start.value); }

            if(endCoord == 'custom') { $('#endtLctn').val(endInput); }
            else { $('#endtLctn').val(end.value); }

            var panel = document.getElementById('panel');
            directionsBySelection(startData, endData,'TRANSIT', startInput, endInput, panel);
        });

        $('.btn_mapWrap_close').on('click',function(){
            $('.mapWrap').removeClass('detailTransform');
            $('.mapWrap_tit .iptBox .ipt_txt').prop('disabled',false);
            $('.mapWrap').addClass('map_hide').delay(500);
        });

    }

    // guide
    $('.chat_top .btn_cb_guide').on('click', function(){
        window.location.reload();
    });


    $(document).on('click', 'a', function(event){
        if ($(this).attr("href") == '#') {
            return;
        }
        event.preventDefault();
        var message_data = {type:"href", value:$(this).attr("href")};
        window.parent.postMessage(message_data, "*");
    });

    $('.langBox p').on('click', function(){
        $(this).parents('.langBox').find('.lst_lang').toggleClass('show');
        $(this).toggleClass('active');
    });

    $('.langBox .lst_lang .btn_lang').on('click', function(){
        var langCopy = $(this).clone();
        $('.langBox p').html(langCopy);
        $('.langBox p .btn_lang').hasClass('active');
        $('.langBox p .btn_lang').removeClass('active');
        $(this).parents('.lst_lang').hasClass('show');
        $(this).parents('.lst_lang').removeClass('show');
        $('.langBox .lst_lang .btn_lang').removeClass('active');
        $(this).addClass('active');

        var new_lang = $(this).data("lang");

        if (lang == new_lang) {
            return;
        } else {
            lang = new_lang;
            // load google map api
            var langCode = getGoogleLangCode(lang);
            setMapAPILanguage(langCode).then(function () {
                // after API is loaded
                changeTextHolder(lang);
                callBackend({"type": "intent", "input":"처음으로", "host": host, "lang":lang, "jsonData": JSON.stringify(getJsonData())})
            });

        }
    });

});

function replaceAll(str, searchStr, replaceStr) {
    return str.split(searchStr).join(replaceStr);
}

$(window).resize(function (){
    $('#cahtbotWrap').each(function(){
        var cahtbotWrapHeight = $('#cahtbotWrap').height();
        $('.chatUI_mid').css({
            'height': Math.round(cahtbotWrapHeight-145),
        });
    });
});

// 추가: 20191112 유명종
//텍스트 속 버튼
function makeTxtInnerButton() {

    $('.txt').each(function(){
        var txt_btn = $(this).find('a');
        var txt_btnLength = $(this).find('a').length;
        if (txt_btnLength > 1) {
            $(this).find('a').wrapAll('<div class="txt_btns"></div>');
        } else {
            $(this).find('a').wrapAll('<div class="txt_btn"></div>');
        }
    });
}

//200217 AMR 접속 디바이스 확인
function checkDevice() {
    var navigatorUA = navigator.userAgent;
    var AgentUserOs = navigatorUA.replace(/ /g,'');
    var OSName = '';
    var connectDevice = 'PC';
    var mobileDeviceList  = new Array('Android', 'samsung', 'LG', 'BlackBerry', 'BlackBerry Opera/9.80', 'iPhone', 'iPad');

    new function() {
        var OsNo = navigator.userAgent.toLowerCase();
        jQuery.os = {
            Linux: /linux/.test(OsNo),
            Unix: /x11/.test(OsNo),
            Mac: /mac/.test(OsNo),
            Windows: /win/.test(OsNo)
        }
    };

    if($.os.Windows) {
        if(AgentUserOs.indexOf("Safari") != -1) {OSName="Safari";}
        else if(AgentUserOs.indexOf("Chrome") != -1) {OSName="Chrome";}
        else if(AgentUserOs.indexOf("OPR") != -1) {OSName="opera";}
        else if(AgentUserOs.indexOf("Firefox") != -1) {OSName="firefox";}
        else if(AgentUserOs.indexOf("Edge") != -1) {OSName="Edge";}

        else if(AgentUserOs.indexOf("WOW64") != -1) {
            if(AgentUserOs.indexOf("rv:11") != -1) {OSName="IE 11";}
            if(AgentUserOs.indexOf("MSIE10") != -1) {OSName="IE 10";}
            if(AgentUserOs.indexOf("MSIE9") != -1) {OSName="IE 9";}
        }
        else {OSName="window";}
    } else if ($.os.Linux) {
        if(AgentUserOs.indexOf("Android") != -1) {OSName="Android";}
        else if(AgentUserOs.indexOf("SAMSUNG") != -1) {OSName="samsung";}
        else if(AgentUserOs.indexOf("samsung") != -1) {OSName="samsung";}
        else if(AgentUserOs.indexOf("LG") != -1) {OSName="LG";}
        else if(AgentUserOs.indexOf("lgtelecom") != -1) {OSName="LG";}
        else if(AgentUserOs.indexOf("BlackBerry") != -1) {OSName="BlackBerry";}
        else if(AgentUserOs.indexOf("BlackBerry;Opera Mini") != -1) {OSName="BlackBerry Opera/9.80";}
        else if(AgentUserOs.indexOf("Symbian") != -1) {OSName="Symbian";}
        else if(AgentUserOs.indexOf("Ubuntu") != -1) {OSName="Ubuntu";}
        else if(AgentUserOs.indexOf("PDA") != -1) {OSName="PDA";}
        else {OSName="Linux";}
    }
    else if ($.os.Unix) {OSName="UNIX";}
    else if ($.os.Mac) {
        if(AgentUserOs.indexOf("iPhone") != -1) {
            // if(AgentUserOs.indexOf("iPhoneOS3") != -1) {OSName="iPhone OS 3";}
            // else if(AgentUserOs.indexOf("iPhoneOS4") != -1) {OSName="iPhone OS 4";}
            // else if(AgentUserOs.indexOf("iPhoneOS5") != -1) {OSName="iPhone OS 5";}
            // else if(AgentUserOs.indexOf("iPhoneOS6") != -1) {OSName="iPhone OS 6";}
            // else OSName="iPhone";
            OSName="iPhone";
        }
        else if(AgentUserOs.indexOf("iPad") != -1) {OSName="iPad";}
        else if(AgentUserOs.indexOf("MacOS") != -1) {
            if(AgentUserOs.indexOf("Macintosh") != -1) OSName="Macintosh";
        } else {OSName="MacOS";}
    }
    else {OSName="OS (we should find this OS)";}

    if (OSName.length > 0) {
        if (mobileDeviceList.includes(OSName)) {
            connectDevice = 'MOBILE';
        }
    }

    console.debug(OSName,'OSName');
    console.debug(connectDevice,'connect Device');
    return connectDevice;
}

function getJsonData() {
    var jsonData;
    if (qrLocation !== undefined && qrLocation !== "") {
        jsonData = {"device":checkDevice(), "channel":"QR_" + qrLocation};
    } else {
        jsonData = {"device":checkDevice(), "channel":"HOMEPAGE"};
    }
    return jsonData;
}

// 추가 AMR 200412 숫자 천단위 콤마
function numberFormat(inputNumber) {
    return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
