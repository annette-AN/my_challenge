// var sds_url = 'https://sds.maum.ai';

window.onload = function() {
    var sds_url = chat_meta.sds_url;
    var host_name = chat_meta.host_name;
    var qrLocation = chat_meta.qrLocation;

    var iframe_url = sds_url + '/' + host_name + '/';

    var chatbot_tag =
        '<div id="chatbot">\n' +
        '    <iframe id="chatbot_iframe" src="' + iframe_url + '" ' +
        'frameborder=0 framespacing=0 marginheight=0 marginwidth=0 scrolling=no vspace=0></iframe>\n' +
        '</div>';

    var floating_tag =
        '<div class="chatGreeting">\n' +
        '    무엇을 도와드릴까요?<br>\n' +
        '    How may I help you?\n' +
        '    <button type="button" class="btn_greetClose"><em>말풍선 닫기</em></button>\n' +
        '</div>\n' +
        '<p class="powered">Powered by <img src="' + sds_url + '/resources/images/img_tit_redtie.png" alt="RedTie Butler"></p>';

    if ($("#chatbot").length !== 1) {
        $("body").append(chatbot_tag);
        $("body").append(floating_tag);
        if (qrLocation !== undefined && qrLocation !== "") {
            $('.powered').attr("style", "visibility: hidden");
            $('.chatGreeting').attr("style", "visibility: hidden");
        }
    }

    function sendChatBotMeta() {
        document.getElementById("chatbot_iframe").contentWindow.postMessage(chat_meta, '*');
    }

    function iframeMsg(e) {
        try {
            if (e.data === "chatbot_open" || e.data === "chatbot_close") {
                $("#chatbot").toggleClass("chatOpen").toggleClass("chatClose");
            }

            if (e.data === "aside_open") {
                $("#chatbot").addClass("aside_area");
            } else if (e.data === "aside_close") {
                $("#chatbot").removeClass("aside_area");
            }

            if (e.data.type === "href") {
                if (e.data.value === "#") return;
            var win = window.open(e.data.value, '_blk');
                win.focus();
            }
        } catch (exce) {
            // Noting to anything
        }
    }

    $("#chatbot_iframe").on("load", sendChatBotMeta);

    window.addEventListener("message", iframeMsg, false);

    //chatGreeting 말풍선 닫기 버튼
    $('.btn_greetClose').on('click', function(){
        $('.chatGreeting').addClass('chatGreeting_hide').delay(300).queue(function() { $(this).remove(); });
    });

};