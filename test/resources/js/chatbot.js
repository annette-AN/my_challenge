var host;
var lang;

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

    // chatbot open
    $('#btn_goChat').on('click', function(){
        window.parent.postMessage("chatbot_open", "*");
        $(this).addClass('goChat_hide');
        $('.chatGreeting').addClass('chatGreeting_hide');
        $('#chatUI_wrap').addClass('chatUI_show');
        var scrollHeight = $('.lst_talk').height();
        $('.chatUI_mid').animate({
            scrollTop: scrollHeight
        },150);
        return false;
    });

    // chatbot close
    $('.btn_chatClose').on('click', function(){
        $('#btn_goChat').removeClass('goChat_hide');
        $('.chatGreeting').removeClass('chatGreeting_hide');
        $('#chatUI_wrap').addClass('chatUI_hide');
        $('#chatUI_wrap').removeClass('chatUI_show');
        setTimeout(function() {
            $('#chatUI_wrap').removeClass('chatUI_hide');
            $('.chatAside').removeClass('aside_hide');
            window.parent.postMessage("chatbot_close", "*");
        }, 0);
    });

    // 날짜, 요일 시간 정의
    var year  = new Date().getFullYear();  //현재 년도
    var month = new Date().getMonth()+1;  //현재 월
    var date  = new Date().getDate();  //현재 일
    var week  = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일');	  //요일 정의
    var thisWeek  = week[new Date().getDay()];	//현재 요일

    var ampm = new Date().getHours() >= 12 ? 'PM' : 'AM';
    var	thisHours = new Date().getHours() >=13 ?  new Date().getHours()-12 : new Date().getHours(); //현재 시
    var	thisMinutes = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes(); //현재 분
    let NowTime = year + "." + month + "." + date + " " + ampm + " " + thisHours + ':' + thisMinutes;

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
            'display':'none',
        });
        $('.chatbot_contents .lst_talk').css({
            'display':'block',
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

        let intent = $(this).data('intent');
        let display = $(this).data('display');

        answer("intent", intent, display);
    });

    // Response
    function answer(type, value, display){
        let year  = new Date().getFullYear();  //현재 년도
        let month = new Date().getMonth()+1;  //현재 월
        let date  = new Date().getDate();  //현재 일

        let ampm = new Date().getHours() >= 12 ? 'PM' : 'AM';
        let	thisHours = new Date().getHours() >=13 ?  new Date().getHours()-12 : new Date().getHours(); //현재 시
        let	thisMinutes = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes(); //현재 분
        let NowTime = year + "." + month + "." + date + " " + ampm + " " + thisHours + ':' + thisMinutes;

        if (!display) {
            display = value;
        }
        let data = {"type": type, "input":value.replace("<br>", ""), "host": host, "lang": lang, "channel": checkDevice()};

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
    window.addEventListener("message", sendHostInfo, false);

    function sendHostInfo(e) {

        data = e.data;
        host = data.host;
        lang = data.lang;

        // 지구본 (lang) js 추가
        var langLength = $('.langBox .lst_lang > li').length;
        if ( host == 4 ) {
            langLength = 1;
        }
        if ( langLength == 1 ) {
            $('.langBox').remove();
        }

        changeTextHolder(lang);

        $.ajax({
            url: "/chat/hostInfo",
            data: JSON.stringify(data),
            type: "POST",
            contentType: 'application/json',
        }).done(function (response) {
            callBackend({"type": "intent", "input":"처음으로", "host": host, "lang":lang, "channel": checkDevice()})
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
            contentType: 'application/json',
        }).done(function (response) {
            for(let index = 0 ; index < response.length; index++) {
                selectResponseType(response[index]);
            }
            selectResponseType(response);
        });

        $('.chatbot_contents .bot_infoBox').css({'display':'none'});
        $('.chatbot_contents .lst_talk').css({'display':'block'});
    }

    function selectResponseType(response) {
        if(!!response.answer && response.answer.includes("|||MAP|||")) {
            let res = response.answer.split("|||MAP|||");
            botResponseMap(res[1]);
        }
        else {
            if (!!response.answer) botResponseText(response.answer);
            if (response.list.length > 0) botResponseList(response.list);
            botResponseButton(response.buttons);
            if (response.carousel.length > 0) botResponseCarousel(response.carousel);
            if (!!response.farewell) botResponseText(response.farewell);
        }
        botResponseTime();
        makeTxtInnerButton();
    }

    function botResponseTime() {
        // 날짜, 요일 시간 정의
        let year  = new Date().getFullYear();  //현재 년도
        let month = new Date().getMonth()+1;  //현재 월
        let date  = new Date().getDate();  //현재 일
        let week  = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일');	  //요일 정의
        let thisWeek  = week[new Date().getDay()];	//현재 요일

        let ampm = new Date().getHours() >= 12 ? 'PM' : 'AM';
        let	thisHours = new Date().getHours() >=13 ?  new Date().getHours()-12 : new Date().getHours(); //현재 시
        let	thisMinutes = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes(); //현재 분
        let NowTime = year + "." + month + "." + date + " " + ampm + " " + thisHours + ':' + thisMinutes;

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
    };

    function botResponseList(list_response) {
        let list_li = "";

        list_response.forEach(function (list_ele) {
            list_li += '<li><a class="intent" href="#" data-display="'+ list_ele.display +'" data-intent="'+ list_ele.intent.intent +'" >' + list_ele.display  + '</a></li>';
        });

        let list_html =
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
        let button_li = "";
        let first_btn;

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
        let carousel_div = "";

        carousel_response.forEach(function (carousel_ele) {
            let intent = carousel_ele.intent;

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

        let swiper_option = {
            init : false,
            speed : 200,
            slidesPerView:2,
            spaceBetween: 10,
            centeredSlides: false,
            loop: false,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        };

        if (carousel_response.length > swiper_option.slidesPerView) {
            swiper_option.loop = true;
        }

        let swiper = new Swiper('.botMsg_swiper', swiper_option);
        $('.botMsg_swiper:last')[0].swiper.init();

        $('.chatUI_mid').scrollTop($('.chatUI_mid')[0].scrollHeight);

    }

    function botResponseMap(map_response) {
        let jsonRes = JSON.parse(map_response);
        // console.log(jsonRes)

        let mapSelectHtml =
        `
            <li class="bot">
            <div class="bot_msg">
                <div class="btnLst"> 
                    <span class="txt txt_radius">${jsonRes.answer}</span>
                    <div class="iptBox">
                        <dl class="dl_ipt">
                            <dt>${jsonRes.texts.start}</dt>
                            <dd>
                                <select class="select start"> 
         `;

        let startCustomCheck = false;
        jsonRes.starts.forEach(start => {
            mapSelectHtml += `<option data-location=`;
            if(start.location.hasOwnProperty("get"))
            {
                mapSelectHtml += `"${start.location.get}" `;
                if(start.location.get == "custom")
                {
                    mapSelectHtml += `value="direct"  `
                }
            }
            else
            {
                mapSelectHtml += `'{"lat": ${start.location.lat}, "lng": ${start.location.lng}}' `
            }
            if(start.selected){
                mapSelectHtml += `selected`
                if(start.location.get == "custom")
                {
                    startCustomCheck = true;
                }
            }
            mapSelectHtml +=`> ${start.name}</option>`
        });

        mapSelectHtml +=
        `
                                </select>
                                <input type="text" name="selboxDirect" class="ipt_txt selboxDirect startInput" value=""
        `
        if(startCustomCheck){
            mapSelectHtml += `style="display: inline-block;"`
        }
        mapSelectHtml += `>
                            </dd>
                        </dl>
                        <dl class="dl_ipt">
                            <dt>${jsonRes.texts.end}</dt>
                            <dd>
                                <select class="select end">
        `;

        let endCustomCheck = false;
        jsonRes.ends.forEach(end => {
            mapSelectHtml += `<option data-location=`;
            if(end.location.hasOwnProperty("get"))
            {
                mapSelectHtml += `"${end.location.get}" `;
                if(end.location.get == "custom")
                {
                    mapSelectHtml += `value="direct" `
                }
            }
            else
            {
                mapSelectHtml += `'{"lat": ${end.location.lat}, "lng": ${end.location.lng}}' `
            }
            if(end.selected){
                mapSelectHtml += `selected`
                if(end.location.get == "custom")
                {
                    endCustomCheck = true;
                }
            }
            mapSelectHtml +=`> ${end.name}</option>`
        });

        mapSelectHtml +=
        `
                                </select>
                                <input type="text" name="selboxDirect" class="ipt_txt selboxDirect endInput" value=""
        `
        if(endCustomCheck){
            mapSelectHtml += `style="display: inline-block;"`
        }
        mapSelectHtml += `
                                >
                            </dd>
                        </dl>
                    </div>
                    <div class="btnBox">
                        <button type="button" class="btn_point btn_map">${jsonRes.texts.button}</button> 
                    </div>
                </div>
            </div> 
            </li>
         `;

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
            $('#map').show()
            // 경로 그리기
            let start = $(this).parent().parent().find('select.start')[0];
            let startCoord = start.options[start.selectedIndex].getAttribute('data-location')
            let startData;
            if(startCoord == "current" || startCoord == "custom"){startData = startCoord;}
            else {startData = JSON.parse(startCoord);}

            let end = $(this).parent().parent().find('select.end')[0];
            let endCoord = end.options[end.selectedIndex].getAttribute('data-location');
            let endData;
            if(endCoord == "current" || endCoord == "custom"){endData = endCoord;}
            else {endData = JSON.parse(endCoord);}

            let startInput = $(this).parent().parent().find('input.startInput').val();
            let endInput = $(this).parent().parent().find('input.endInput').val();

            if(startCoord == 'custom') { $('#startLctn').val(startInput); }
            else { $('#startLctn').val(start.value); }

            if(endCoord == 'custom') { $('#endtLctn').val(endInput); }
            else { $('#endtLctn').val(end.value); }

            let panel = document.getElementById('panel');
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
        event.preventDefault();
        let message_data = {type:"href", value:$(this).attr("href")};
        window.parent.postMessage(message_data, "*");
    })

    $('.langBox p').on('click', function(){
        $(this).parents('.langBox').find('.lst_lang').toggleClass('show');
        $(this).toggleClass('active');

        $('.langBox .lst_lang .btn_lang').on('click', function(){
            var langCopy = $(this).clone();
            $('.langBox p').html(langCopy);
            $('.langBox p .btn_lang').hasClass('active');
            $('.langBox p .btn_lang').removeClass('active');
            $(this).parents('.lst_lang').hasClass('show');
            $(this).parents('.lst_lang').removeClass('show');
            $('.langBox .lst_lang .btn_lang').removeClass('active');
            $(this).addClass('active');
        });
    });

    $(".btn_lang").click(function(){
        let new_lang = $(this).data("lang");

        if (new_lang == undefined) {
            return;
        } else {
            lang = new_lang;
            changeTextHolder(lang);
            callBackend({"type": "intent", "input":"처음으로", "host": host, "lang":lang, "channel": checkDevice()})
        }
    })
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

    console.log(OSName,'OSName');
    console.log(connectDevice,'connect Device');
    return connectDevice;
}
