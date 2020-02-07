$(document).ready(function(){
    function handleChatbotMedia() {
        var bodyWidth = $(document).outerWidth();

        if ( bodyWidth < 768 ) {
            $('head link[mobile-css]').remove();
            if ( $('head link[mobile-css]').length === 1 ) return;
            $('head title').before('<link mobile-css rel="stylesheet" type="text/css" href="../resources/css/chatbot_m.css" />')
        } else {
            $('head link[mobile-css]').remove();
        }
    }
    handleChatbotMedia();
    $(window).resize(handleChatbotMedia);

    //말풍선 위 닫기 버튼
    $('.btn_chatClose').on('click', function(){
        $('.chatGreeting').addClass('chatGreeting_hide').delay(300).queue(function() { $(this).remove(); });
    });
})