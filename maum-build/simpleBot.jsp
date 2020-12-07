<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/reset.css">
  <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/font.css">
  <link rel="stylesheet" type="text/css"
        href="${pageContext.request.contextPath}/css/chatbot.css">
  <link rel="stylesheet" type="text/css"
        href="${pageContext.request.contextPath}/css/simplebot.css">
  <link rel="stylesheet" type="text/css"
        href="${pageContext.request.contextPath}/css/jsplumbtoolkit-defaults.css">

  <script src="<c:url value='/js/jquery-3.1.0.min.js'/>"></script>
  <script src="<c:url value='/js/jsplumbtoolkit.js'/>"></script>
  <script src="<c:url value='/js/simplebotFlowchart.js'/>"></script>
  <script type="text/x-jtk-templates" src="<c:url value='/templates/nodeTemplate.html'/>"></script>
  <script src="<c:url value='/js/jquery.js'/>"></script>
  <script src="<c:url value='/js/jquery.form.js'/>"></script>
  <script type="text/javascript" src="https://cdn.socket.io/socket.io-1.4.0.js"></script>
  <title>Simple Bot</title>
</head>
<body>
<div id="wrap">
  <div id="header">
    <h1>Simple Bot Builder</h1>
  </div>

  <div id="container" class="simplebot">
    <div class="content">
      <%--      [D] 200423 수정 AMR .content -> #scenario_content --%>
      <div class="multipleBoxType">
        <%--        시나리오 목록--%>
        <div class="lotBox">
          <div class="tit">
            <h3><spring:message code="TITLE.SIMPLEBOT.LIST" text="시나리오 목록"/></h3>
            <div class="fr">
              <a href="#scenario_add" class="btn_primary btn_lyr_open"><spring:message code="LABEL.ADD" text="추가"/></a>
            </div>
          </div>
          <div class="cont">
            <div class="iptBox">
              <input type="text" class="ipt_txt search" autocomplete="off">
              <button type="button" class="btn_search"><span class="text_hide">검색하기</span></button>
            </div>
            <div class="tbl_customTd scroll scenario_list">
              <table class="tbl_line_lst" summary="번호/시나리오명/언어/리스트 삭제로 구성됨">
                <caption class="hide"><spring:message code="TITLE.SIMPLEBOT.LIST" text="시나리오 목록"/></caption>
                <colgroup>
                  <col width="40"><col><col><col>
                </colgroup>
                <thead>
                <tr>
                  <th scope="col"><spring:message code="LABEL.NUMBER" text="번호"/></th>
                  <th scope="col"><spring:message code="LABEL.SIMPLEBOT.NAME" text="시나리오명"/></th>
                  <th scope="col"><spring:message code="LABEL.LANGUAGE" text="언어"/></th>
                  <th scope="col"><span class="text_hide"><spring:message code="LABEL.DELETE" text="삭제"/></span></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td scope="row">1</td>
                  <td><span class="text_ellipsis">마인즈에듀</span></td>
                  <td><spring:message code="LABEL.LANG.KOR" text="한국어"/></td>
                  <td><a href="#delete_alert" class="tbl_btn delete btn_lyr_open text_hide"><spring:message code="LABEL.DELETE" text="삭제"/></a></td>
                </tr>
                <tr>
                  <td scope="row">2</td>
                  <td><span class="text_ellipsis">TOMS</span></td>
                  <td><spring:message code="LABEL.LANG.KOR" text="한국어"/></td>
                  <td><a href="#delete_alert" class="tbl_btn delete btn_lyr_open text_hide"><spring:message code="LABEL.DELETE" text="삭제"/></a></td>
                </tr>
                <tr>
                  <td scope="row">3</td>
                  <td><span class="text_ellipsis">sully</span></td>
                  <td><spring:message code="LABEL.LANG.ENG" text="영어"/></td>
                  <td><a href="#delete_alert" class="tbl_btn delete btn_lyr_open text_hide"><spring:message code="LABEL.DELETE" text="삭제"/></a></td>
                </tr>
                <tr>
                  <td scope="row">-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td scope="row">-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td scope="row">-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td scope="row">-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td scope="row">-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td scope="row">-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td scope="row">-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td scope="row">-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td scope="row">-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td scope="row">-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td scope="row">-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td scope="row">-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td scope="row">-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td scope="row">-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td scope="row">-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td scope="row">-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td scope="row">-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td scope="row">-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td scope="row">-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <%--        //시나리오 목록--%>

        <%--        시나리오--%>
        <div class="lotBox">
          <div class="tit">
            <h3><spring:message code="TITLE" text="시나리오"/></h3>
            <div class="fr">
<%--              [D] AMR 201029 한국어/영어 선택은 시나리오 추가 팝업에서 기능해야 합니다. (지워야함)--%>
              <div class="twins" id="twins">
                <button type="button" class="btn_primary active" value=1><spring:message code="LABEL.LANG.KOR" text="한글"/></button>
                <button type="button" class="btn_primary" value=2><spring:message code="LABEL.LANG.ENG" text="영문"/></button>
              </div>
  <%--              //--%>
              <a href="#scenario_upload" class="btn_secondary excel_upload btn_lyr_open"><spring:message code="LABEL.EXCEL.UPLOAD" text="엑셀 업로드"/></a>
              <button type="button" class="btn_secondary excel_download"><spring:message code="LABEL.EXCEL.DOWNLOAD" text="엑셀 샘플 다운로드"/></button>
              <form action="simpleBot/sampleDownload"
                    target="downFrame" name="downloadForm" method="post" style="display: inline-block;"></form>

              <em class="saved_time">Never updated</em>
              <a href="#scenario_save" id="scenario_save" class="btn_primary btn_save"><spring:message code="LABEL.SAVE" text="저장"/></a>
            </div>
          </div>
          <div class="cont scenario_view">
            <div class="scenario">
              <%--              시나리오 라이브러리가 들어갈 자리<br>--%>
            </div>

            <div class="scenario_edit show">
              <div class="edit_title">
                <h4><span>전화상담원 만족도 설문</span> <spring:message code="LABEL.CHATBOT.SAYS" text=" 에 챗봇이 할 말"/></h4>
                <button type="button" class="btn_primary btn_save"
                        style="display: none;">저장
                </button>
              </div>

              <div class="edit_tool">
                <dl>
                  <dt><spring:message code="LABEL.CHATBOT.BASIC" text="기본 발화"/></dt>
                  <dd>
                    <div>
                      <textarea name="first_say" cols="30" rows="4" disabled>안녕하세요.첫번째 질문입니다.</textarea>
                    </div>
                  </dd>
                </dl>
                <dl>
                  <dt><spring:message code="LABEL.CHATBOT.CONDITION" text="조건 발화"/></dt>
                  <dd>
                    <div>
                      <em>Yes</em>
                      <textarea name="yes_say" cols="30" rows="2"
                                disabled>감사합니다.</textarea>
                    </div>
                    <div>
                      <em>No</em>
                      <textarea name="no_say" cols="30" rows="2"
                                disabled>그러셨군요.</textarea>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <%--        //시나리오--%>

        <%--        시나리오 테스트--%>
        <div class="lotBox">
          <div class="tit">
            <h3><spring:message code="TITLE.SIMPLEBOT.TEST" text="시나리오 테스트"/></h3>
          </div>
          <div class="cont">
            <div class="tab_menu">
              <button type="button" class="on"><spring:message code="LABEL.CHATTEST" text="챗봇"/></button>
              <button type="button"><spring:message code="LABEL.VOICETEST" text="음성봇"/></button>
            </div>

            <ul class="tab_cont">
              <li class="on">
<%--                원본 chatbot--%>
<%--                <div id="chatbot">--%>
<%--                  <button type="button" class="chatbot_refresh" style="display: none;"><em class="text_hide">새로고침</em></button>--%>
<%--                  <div id="chatbot_iframe_div">--%>
<%--                    <iframe id="chatbot_iframe" style="width:100%; height:100%"--%>
<%--                            src = "https://sds.maum.ai/pps_ynbot"--%>
<%--                            frameborder=0 framespacing=0 marginheight=0 marginwidth=0 scrolling=no vspace=0>--%>
<%--                    </iframe>--%>
<%--                  </div>--%>
<%--                  <div class="blind">--%>
<%--                    <div>--%>
<%--                      <p><spring:message code='MESSAGE.CHATBOT.START' text='START를 눌러 대화를<br>시작해주세요.'/></p>--%>
<%--                      <button type="button" id="chat_test_start" class="btn_primary">START</button>--%>
<%--                    </div>--%>
<%--                  </div>--%>
<%--                </div>--%>
<%--                //원본 chatbot--%>

<%--            수정 chatbot--%>
<%--            [D] AMR 201029 채팅 .chatUI_wrap을 공통으로 사용 --%>
                <div id="chatbot">
                  <div class="chatUI_wrap">
                    <div class="chatUI_mid btmUi scroll">
                      <ul class="lst_talk">
                        <!-- bot UI -->
                        <li class="bot">
                          <!-- [D] 기본메세지 -->
                          <div class="bot_msg">
                            <em class="txt">안녕하세요. 마음AI 챗봇 설리입니다. 무엇을 도와드릴까요?</em>
                            <div class="date">2019.08.14 12:00</div>
                          </div>
                          <!-- [D] 제네릭_URL -->
                          <div class="bot_msg">
                            <div class="generic">
                                                  <span class="generic_img">
                                                      <img src="https://maum.ai/aiaas/common/images/maum.ai_web.png" alt="마음에이아이">
                                                  </span>
                              <span class="generic_url">
                                                      <a href="https://maum.ai" target="_blank">https://mindslab.ai/kr</a>
                                                  </span>
                            </div>
                            <div class="date">2019.08.14 12:00</div>
                          </div>
                          <!-- [D] 제네릭_지도 -->
                          <div class="bot_msg">
                            <div class="generic">
                              <span class="generic_img"><img src="//geo0.ggpht.com/cbk?panoid=CtPrxLkShX6I5YMvVRp1pA&amp;output=thumbnail&amp;cb_client=search.LOCAL_UNIVERSAL.gps&amp;thumb=2&amp;w=293&amp;h=79&amp;yaw=98.38457&amp;pitch=0&amp;thumbfov=100" alt="마인즈랩 사진"></span>
                              <span class="generic_tit">
                                                      <a class="btn_map" href="#none">마인즈랩</a>
                                                  </span>
                              <span class="generic_des">경기도 성남시 분당구 대왕판교로644번길 49 다산타워 6층 601호</span>
                            </div>
                            <div class="date">2019.08.14 12:00</div>
                          </div>
                          <!-- [D] 버튼_리스트 -->
                          <div class="bot_msg">
                            <div class="btnLst">
                              <ul>
                                <li><a href="#">Option 01</a></li>
                                <li><a href="#">Option 02</a></li>
                                <li><a href="#">Option 03</a></li>
                              </ul>
                            </div>
                            <div class="date">2019.08.14 12:00</div>
                          </div>

                          <!-- [D] 버튼_아이템 -->
                          <div class="bot_msg">
                            <div class="btnItem">
                              <ul>
                                <li><a href="#">경기도</a></li>
                                <li><a href="#">성남시</a></li>
                                <li><a href="#">분당구</a></li>
                                <li><a href="#">대왕판교</a></li>
                                <li><a href="#">다산타워</a></li>
                              </ul>
                            </div>
                            <div class="date">2019.08.14 12:00</div>
                          </div>

                          <!-- [D] 이미지_가로 -->
                          <div class="bot_msg">
                            <div class="img">
                              <img src="../../images/sample/ttubot.png" alt="뚜봇">
                            </div>
                            <div class="date">2019.08.14 12:00</div>
                          </div>
                          <!-- [D] 이미지_세로 -->
                          <div class="bot_msg">
                            <div class="img">
                              <img src="../../images/sample/bg.jpg" alt="뚜봇">
                            </div>
                            <div class="date">2019.08.14 12:00</div>
                          </div>
                          <!-- [D] 이미지_ani_가로 -->
                          <div class="bot_msg">
                            <div class="img">
                              <img src="../../images/sample/sample_ani.gif" alt="뚜봇">
                            </div>
                            <div class="date">2019.08.14 12:00</div>
                          </div>
                          <!-- [D] 이미지_ani_정사이즈 -->
                          <div class="bot_msg">
                            <div class="img">
                              <img src="../../images/sample/sample_ani02.gif" alt="뚜봇">
                            </div>
                            <div class="date">2019.08.14 12:00</div>
                          </div>
                          <!-- [D] 이미지_투명이미지-->
                          <div class="bot_msg">
                            <div class="img">
                              <img src="../../images/sample/sample_s.png" alt="뚜봇">
                            </div>
                            <div class="date">2019.08.14 12:00</div>
                          </div>
                          <!-- [D] 텍스트 안 버튼 -->
                          <div class="bot_msg">
                            <div class="btnLst">
                              <span class="txt">저는 무엇을 물어봐도 다 대답할 수 있어요.
                                  <div class="txt_btn">
                                      <a href="#">자주 묻는 질문</a>
                                  </div>
                              </span>
                            </div>
                            <div class="date">2019.08.14 12:00</div>
                          </div>
                          <!-- [D] 텍스트 안 버튼 -->
                          <div class="bot_msg">
                            <div class="btnLst">
                              <span class="txt">저는 무엇을 물어봐도 다 대답할 수 있어요.
                                  <div class="txt_btns">
                                      <a href="#">버튼1 버튼1 버튼1</a>
                                      <a href="#">버튼2 버튼2</a>
                                      <a href="#">버튼3</a>
                                  </div>
                              </span>
                            </div>
                            <div class="date">2019.08.14 12:00</div>
                          </div>
                        </li>
                        <!-- //bot UI -->

                        <!-- [D] Swiper -->
<%--                        <li class="botMsg_swiper swiper-container-initialized swiper-container-horizontal">--%>
<%--                          <div class="swiper-wrapper" style="transform: translate3d(0px, 0px, 0px);">--%>
<%--                            <div class="swiper-slide swiper-slide-active" style="width: 186.5px; margin-right: 10px;">--%>
<%--                              <a class="swiper_item" href="#" target="_self">--%>
<%--                                <span class="item_img"><img src="../../images/sample/sample_swiper01.jpg" alt="이미지 명"></span>--%>
<%--                                <span class="item_tit">상품 검색할래?</span>--%>
<%--                                <span class="item_txt">찾고 싶은 상품을 바로 검색하세요.</span>--%>
<%--                              </a>--%>
<%--                            </div>--%>
<%--                            <div class="swiper-slide swiper-slide-next" style="width: 186.5px; margin-right: 10px;">--%>
<%--                              <a class="swiper_item" href="#" target="_self">--%>
<%--                                <span class="item_img"><img src="../../images/sample/sample_swiper02.jpg" alt="이미지 명"></span>--%>
<%--                                <span class="item_tit">주문내역 조회하고 싶어</span>--%>
<%--                                <span class="item_txt">배송 조회, 주문내역 조회 등 상품 구매와 관련된 질문을 해 주세요.</span>--%>
<%--                              </a>--%>
<%--                            </div>--%>
<%--                            <div class="swiper-slide" style="width: 186.5px; margin-right: 10px;">--%>
<%--                              <a class="swiper_item" href="#" target="_self">--%>
<%--                                <span class="item_img"><img src="../../images/sample/sample_swiper03.jpg" alt="이미지 명"></span>--%>
<%--                                <span class="item_tit">포인트 조회는 어디서 해?</span>--%>
<%--                                <span class="item_txt">포인트 조회, 포인트 제도에 대해 궁금하신 점을 물어보세요!</span>--%>
<%--                              </a>--%>
<%--                            </div>--%>
<%--                            <div class="swiper-slide" style="width: 186.5px; margin-right: 10px;">--%>
<%--                              <a class="swiper_item" href="#" target="_self">--%>
<%--                                <span class="item_img"><img src="../../images/sample/sample_swiper04.jpg" alt="이미지 명"></span>--%>
<%--                                <span class="item_tit">어플은 어디서 다운받아?</span>--%>
<%--                                <span class="item_txt">이제너두 전용 앱을 이용하시면 다양한 혜택을 받아보실 수 있습니다.</span>--%>
<%--                              </a>--%>
<%--                            </div>--%>
<%--                            <div class="swiper-slide" style="width: 186.5px; margin-right: 10px;">--%>
<%--                              <a class="swiper_item" href="#" target="_self">--%>
<%--                                <span class="item_img"><img src="../../images/sample/sample_swiper05.jpg" alt="이미지 명"></span>--%>
<%--                                <span class="item_tit">여행 가고싶어!</span>--%>
<%--                                <span class="item_txt">다양한 여행지의 패키지 상품, 항공권 그리고 호텔을 검색하세요!</span>--%>
<%--                              </a>--%>
<%--                            </div>--%>
<%--                            <div class="swiper-slide" style="width: 186.5px; margin-right: 10px;">--%>
<%--                              <a class="swiper_item" href="#" target="_self">--%>
<%--                                <span class="item_img"><img src="../../images/sample/sample_swiper06.jpg" alt="이미지 명"></span>--%>
<%--                                <span class="item_tit">처음으로</span>--%>
<%--                                <span class="item_txt">대화중에 처음으로 돌아가고 싶으시면 "처음으로"라고 말해주세요^^</span>--%>
<%--                              </a>--%>
<%--                            </div>--%>
<%--                          </div>--%>
<%--                          <!-- [D] Swiper Pagination -->--%>
<%--                          <div class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets"><span class="swiper-pagination-bullet swiper-pagination-bullet-active" tabindex="0" role="button" aria-label="Go to slide 1"></span><span class="swiper-pagination-bullet" tabindex="0" role="button" aria-label="Go to slide 2"></span><span class="swiper-pagination-bullet" tabindex="0" role="button" aria-label="Go to slide 3"></span><span class="swiper-pagination-bullet" tabindex="0" role="button" aria-label="Go to slide 4"></span><span class="swiper-pagination-bullet" tabindex="0" role="button" aria-label="Go to slide 5"></span></div>--%>
<%--                          <!-- [D] Swiper navigation buttons -->--%>
<%--                          <div class="swiper-button-prev swiper-button-disabled" tabindex="0" role="button" aria-label="Previous slide" aria-disabled="true"></div>--%>
<%--                          <div class="swiper-button-next" tabindex="0" role="button" aria-label="Next slide" aria-disabled="false"></div>--%>
<%--                          <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span></li>--%>

                        <!-- 사용자 UI -->
                        <li class="user">
                          <div class="bot_msg">
                            <em class="txt">제품을 좀 알아보려고 하는데요.</em>
                            <div class="date">2019.08.14 12:00</div>
                          </div>
                        </li>
                        <!-- //사용자 UI -->

                        <li class="bot">
                          <!-- [D] 기본메세지 -->
                          <div class="bot_msg">
                            <em class="txt">안녕하세요. 마음AI 챗봇 설리입니다. 무엇을 도와드릴까요?</em>
                            <span class="name">name이래</span>
                            <div class="date">2019.08.14 12:00</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <!-- .chatUI_btm -->
                    <div class="chatUI_btm">
                      <form method="post" action="" id="formChat" name="formChat">
                        <textarea class="textArea" rows="1" placeholder="메세지를 입력해 주세요"></textarea>
                        <input type="submit" name="btn_chat" id="btn_chat" class="btn_chat" title="전송" value="전송">
                      </form>
                    </div>
                    <!-- //#chatUI_btm -->
                  </div>
                  <button type="button" class="chatbot_refresh"><em class="text_hide"><spring:message code='LABEL.REFRESH' text='새로고침'/></em></button>
                  <div class="blind">
                    <div>
                      <p><spring:message code='MESSAGE.CHATBOT.START' text='START를 눌러 대화를<br>시작해주세요.'/></p>
                      <button type="button" id="chat_test_start" class="btn_primary">START</button>
                    </div>
                  </div>
                </div>
<%--                //수정 chatbot--%>
              </li>

              <li>
                <div class="voicebot_area">
                  <div class="make_call">
                    <span class="waiting">
                      <spring:message code='LABEL.VOICEBOT.WAITER' text='현재 통화 대기자'/> : <em>0</em> <spring:message code='LABEL.VOICEBOT.PERSON' text='명'/>
                    </span>
                    <div class="required_value iptBox">
                      <input type="number" name="tel" class="ipt_txt" placeholder="<spring:message code='PLACEHOLDER.PHONE' text='전화번호 입력'/>">
                      <input type="text" name="name" class="ipt_txt" placeholder="<spring:message code='PLACEHOLDER.NAME' text='이름 입력'/>">
                      <%--               [D] 전화걸기와 대기중은 .btn_primary 적용,
                                              통화중은 .btn_secondary 적용입니다 --%>
                    </div>
                    <button type="button" id="voice_test_start" class="btn_primary"><spring:message code="LABEL.CALL" text="전화 걸기"/></button>
                    <%--                  <button type="submit" class="btn_primary gradient"><spring:message code="LABEL.WAITING" text="대기중"/></button>--%>
                    <%--                  <button type="submit" class="btn_secondary"><spring:message code="LABEL.CALLING" text="통화중"/></button></button>--%>
                  </div>

<%--                  원본 voicebot--%>
<%--                  <div id="voicebot" class="scroll">--%>
<%--                    <ul class="voice_talk">--%>
<%--                      <li class="bot">--%>
<%--                        <div class="message">--%>
<%--                          <div class="text">--%>
<%--                            안녕하세요. 서비스센터입니다. 무엇을 도와드릴까요?--%>
<%--                          </div>--%>
<%--                        </div>--%>
<%--                        <div class="time"><span class="time">2020.10.27 PM 7:03</span></div>--%>
<%--                      </li>--%>

<%--                      <li class="user">--%>
<%--                        <div class="message">--%>
<%--                          <div class="text">--%>
<%--                            나다--%>
<%--                          </div>--%>
<%--                        </div>--%>
<%--                        <div class="time"><span class="time">2020.10.27 PM 7:03</span></div>--%>
<%--                      </li>--%>
<%--                    </ul>--%>

<%--                    <div class="blind voicebot_start">--%>
<%--                      <div>--%>
<%--                        <p><spring:message code="MESSAGE.VOICEBOT.START" text="상단 입력창에서<br>정보를 입력하신 후<br>전화 걸기를 눌러주세요."/></p>--%>
<%--                      </div>--%>
<%--                    </div>--%>
<%--                  </div>--%>
<%--                  //원본 voicebot--%>

<%--              수정 voicebot--%>
<%--              [D] AMR 201029 채팅 .chatUI_wrap을 공통으로 사용 --%>
                  <div id="voicebot" class="scroll">
                    <div class="chatUI_wrap">
                      <div class="chatUI_mid midUi scroll">
                        <ul class="lst_talk">
                          <!-- bot UI -->
                          <li class="bot">
                            <!-- [D] 기본메세지 -->
                            <div class="bot_msg">
                              <em class="txt">안녕하세요. 마음AI 챗봇 설리입니다. 무엇을 도와드릴까요?</em>
                              <div class="date">2019.08.14 12:00</div>
                            </div>
                            <!-- [D] 제네릭_URL -->
                            <div class="bot_msg">
                              <div class="generic">
                                <span class="generic_img">
                                  <img src="https://maum.ai/aiaas/common/images/maum.ai_web.png" alt="마음에이아이">
                                </span>
                                <span class="generic_url">
                                  <a href="https://maum.ai" target="_blank">https://mindslab.ai/kr</a>
                                </span>
                              </div>
                              <div class="date">2019.08.14 12:00</div>
                            </div>
                            <!-- [D] 제네릭_지도 -->
                            <div class="bot_msg">
                              <div class="generic">
                                <span class="generic_img"><img src="//geo0.ggpht.com/cbk?panoid=CtPrxLkShX6I5YMvVRp1pA&amp;output=thumbnail&amp;cb_client=search.LOCAL_UNIVERSAL.gps&amp;thumb=2&amp;w=293&amp;h=79&amp;yaw=98.38457&amp;pitch=0&amp;thumbfov=100" alt="마인즈랩 사진"></span>
                                <span class="generic_tit">
                                  <a class="btn_map" href="#none">마인즈랩</a>
                                  </span>
                                <span class="generic_des">경기도 성남시 분당구 대왕판교로644번길 49 다산타워 6층 601호</span>
                              </div>
                              <div class="date">2019.08.14 12:00</div>
                            </div>

                            <!-- [D] 버튼_리스트 -->
                            <div class="bot_msg">
                              <div class="btnLst">
                                <ul>
                                  <li><a href="#">Option 01</a></li>
                                  <li><a href="#">Option 02</a></li>
                                  <li><a href="#">Option 03</a></li>
                                </ul>
                              </div>
                              <div class="date">2019.08.14 12:00</div>
                            </div>

                            <!-- [D] 버튼_아이템 -->
                            <div class="bot_msg">
                              <div class="btnItem">
                                <ul>
                                  <li><a href="#">경기도</a></li>
                                  <li><a href="#">성남시</a></li>
                                  <li><a href="#">분당구</a></li>
                                  <li><a href="#">대왕판교</a></li>
                                  <li><a href="#">다산타워</a></li>
                                </ul>
                              </div>
                              <div class="date">2019.08.14 12:00</div>
                            </div>

                            <!-- [D] 이미지_가로 -->
                            <div class="bot_msg">
                              <div class="img">
                                <img src="../../images/sample/ttubot.png" alt="뚜봇">
                              </div>
                              <div class="date">2019.08.14 12:00</div>
                            </div>
                            <!-- [D] 이미지_세로 -->
                            <div class="bot_msg">
                              <div class="img">
                                <img src="../../images/sample/bg.jpg" alt="뚜봇">
                              </div>
                              <div class="date">2019.08.14 12:00</div>
                            </div>
                            <!-- [D] 이미지_ani_가로 -->
                            <div class="bot_msg">
                              <div class="img">
                                <img src="../../images/sample/sample_ani.gif" alt="뚜봇">
                              </div>
                              <div class="date">2019.08.14 12:00</div>
                            </div>
                            <!-- [D] 이미지_ani_정사이즈 -->
                            <div class="bot_msg">
                              <div class="img">
                                <img src="../../images/sample/sample_ani02.gif" alt="뚜봇">
                              </div>
                              <div class="date">2019.08.14 12:00</div>
                            </div>
                            <!-- [D] 이미지_투명이미지-->
                            <div class="bot_msg">
                              <div class="img">
                                <img src="../../images/sample/sample_s.png" alt="뚜봇">
                              </div>
                              <div class="date">2019.08.14 12:00</div>
                            </div>
                            <!-- [D] 텍스트 안 버튼 -->
                            <div class="bot_msg">
                              <div class="btnLst">
                              <span class="txt">저는 무엇을 물어봐도 다 대답할 수 있어요.
                                <div class="txt_btn">
                                  <a href="#">자주 묻는 질문</a>
                                </div>
                              </span>
                              </div>
                              <div class="date">2019.08.14 12:00</div>
                            </div>
                            <!-- [D] 텍스트 안 버튼 -->
                            <div class="bot_msg">
                              <div class="btnLst">
                              <span class="txt">저는 무엇을 물어봐도 다 대답할 수 있어요.
                                <div class="txt_btns">
                                  <a href="#">버튼1 버튼1 버튼1</a>
                                  <a href="#">버튼2 버튼2</a>
                                  <a href="#">버튼3</a>
                                </div>
                              </span>
                              </div>
                              <div class="date">2019.08.14 12:00</div>
                            </div>
                          </li>
                          <!-- //bot UI -->

                          <!-- [D] Swiper -->
                          <%--                        <li class="botMsg_swiper swiper-container-initialized swiper-container-horizontal">--%>
                          <%--                          <div class="swiper-wrapper" style="transform: translate3d(0px, 0px, 0px);">--%>
                          <%--                            <div class="swiper-slide swiper-slide-active" style="width: 186.5px; margin-right: 10px;">--%>
                          <%--                              <a class="swiper_item" href="#" target="_self">--%>
                          <%--                                <span class="item_img"><img src="../../images/sample/sample_swiper01.jpg" alt="이미지 명"></span>--%>
                          <%--                                <span class="item_tit">상품 검색할래?</span>--%>
                          <%--                                <span class="item_txt">찾고 싶은 상품을 바로 검색하세요.</span>--%>
                          <%--                              </a>--%>
                          <%--                            </div>--%>
                          <%--                            <div class="swiper-slide swiper-slide-next" style="width: 186.5px; margin-right: 10px;">--%>
                          <%--                              <a class="swiper_item" href="#" target="_self">--%>
                          <%--                                <span class="item_img"><img src="../../images/sample/sample_swiper02.jpg" alt="이미지 명"></span>--%>
                          <%--                                <span class="item_tit">주문내역 조회하고 싶어</span>--%>
                          <%--                                <span class="item_txt">배송 조회, 주문내역 조회 등 상품 구매와 관련된 질문을 해 주세요.</span>--%>
                          <%--                              </a>--%>
                          <%--                            </div>--%>
                          <%--                            <div class="swiper-slide" style="width: 186.5px; margin-right: 10px;">--%>
                          <%--                              <a class="swiper_item" href="#" target="_self">--%>
                          <%--                                <span class="item_img"><img src="../../images/sample/sample_swiper03.jpg" alt="이미지 명"></span>--%>
                          <%--                                <span class="item_tit">포인트 조회는 어디서 해?</span>--%>
                          <%--                                <span class="item_txt">포인트 조회, 포인트 제도에 대해 궁금하신 점을 물어보세요!</span>--%>
                          <%--                              </a>--%>
                          <%--                            </div>--%>
                          <%--                            <div class="swiper-slide" style="width: 186.5px; margin-right: 10px;">--%>
                          <%--                              <a class="swiper_item" href="#" target="_self">--%>
                          <%--                                <span class="item_img"><img src="../../images/sample/sample_swiper04.jpg" alt="이미지 명"></span>--%>
                          <%--                                <span class="item_tit">어플은 어디서 다운받아?</span>--%>
                          <%--                                <span class="item_txt">이제너두 전용 앱을 이용하시면 다양한 혜택을 받아보실 수 있습니다.</span>--%>
                          <%--                              </a>--%>
                          <%--                            </div>--%>
                          <%--                            <div class="swiper-slide" style="width: 186.5px; margin-right: 10px;">--%>
                          <%--                              <a class="swiper_item" href="#" target="_self">--%>
                          <%--                                <span class="item_img"><img src="../../images/sample/sample_swiper05.jpg" alt="이미지 명"></span>--%>
                          <%--                                <span class="item_tit">여행 가고싶어!</span>--%>
                          <%--                                <span class="item_txt">다양한 여행지의 패키지 상품, 항공권 그리고 호텔을 검색하세요!</span>--%>
                          <%--                              </a>--%>
                          <%--                            </div>--%>
                          <%--                            <div class="swiper-slide" style="width: 186.5px; margin-right: 10px;">--%>
                          <%--                              <a class="swiper_item" href="#" target="_self">--%>
                          <%--                                <span class="item_img"><img src="../../images/sample/sample_swiper06.jpg" alt="이미지 명"></span>--%>
                          <%--                                <span class="item_tit">처음으로</span>--%>
                          <%--                                <span class="item_txt">대화중에 처음으로 돌아가고 싶으시면 "처음으로"라고 말해주세요^^</span>--%>
                          <%--                              </a>--%>
                          <%--                            </div>--%>
                          <%--                          </div>--%>
                          <%--                          <!-- [D] Swiper Pagination -->--%>
                          <%--                          <div class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets"><span class="swiper-pagination-bullet swiper-pagination-bullet-active" tabindex="0" role="button" aria-label="Go to slide 1"></span><span class="swiper-pagination-bullet" tabindex="0" role="button" aria-label="Go to slide 2"></span><span class="swiper-pagination-bullet" tabindex="0" role="button" aria-label="Go to slide 3"></span><span class="swiper-pagination-bullet" tabindex="0" role="button" aria-label="Go to slide 4"></span><span class="swiper-pagination-bullet" tabindex="0" role="button" aria-label="Go to slide 5"></span></div>--%>
                          <%--                          <!-- [D] Swiper navigation buttons -->--%>
                          <%--                          <div class="swiper-button-prev swiper-button-disabled" tabindex="0" role="button" aria-label="Previous slide" aria-disabled="true"></div>--%>
                          <%--                          <div class="swiper-button-next" tabindex="0" role="button" aria-label="Next slide" aria-disabled="false"></div>--%>
                          <%--                          <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span></li>--%>

                          <!-- 사용자 UI -->
                          <li class="user">
                            <div class="bot_msg">
                              <em class="txt">제품을 좀 알아보려고 하는데요.</em>
                              <div class="date">2019.08.14 12:00</div>
                            </div>
                          </li>
                          <!-- //사용자 UI -->

                          <li class="bot">
                            <!-- [D] 기본메세지 -->
                            <div class="bot_msg">
                              <em class="txt">안녕하세요. 마음AI 챗봇 설리입니다. 무엇을 도와드릴까요?</em>
                              <span class="name">name이래</span>
                              <div class="date">2019.08.14 12:00</div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div class="blind voicebot_start">
                      <div>
                        <p><spring:message code="MESSAGE.VOICEBOT.START" text="상단 입력창에서<br>정보를 입력하신 후<br>전화 걸기를 눌러주세요."/></p>
                      </div>
                    </div>
                  </div>
<%--              //수정 voicebot--%>
                </div>
<%--                //voicebot_area--%>
              </li>
            </ul>
<%--            //tab_cont--%>
          </div>
<%--          //cont--%>
        </div>
        <%--        //시나리오 테스트--%>
      </div>
    </div>
<%--    //content--%>
  </div>
<%--  //container--%>
</div>

<!-- 수정 200401 AMR  -->
<%-- lyr popup --%>

<%--시나리오 목록 추가--%>
<div id="scenario_add" class="lyrBox">
  <div class="lyr_top">
    <h3><spring:message code="TITLE.SIMPLEBOT.ADD" text="시나리오 추가"/></h3>
    <button class="btn_lyr_close"><span class="text_hide"><spring:message code="LABEL.CLOSE" text="닫기"/></span></button>
  </div>
  <div class="lyr_mid">
    <dl class="dl_inline">
      <dt><label for="scenario_name"><spring:message code="LABEL.SIMPLEBOT.NAME" text="시나리오명"/></label></dt>
      <dd>
        <div class="iptBox">
          <input type="text" id="scenario_name" name="" class="ipt_txt">
        </div>
      </dd>
    </dl>
    <dl class="dl_inline">
      <dt><label for="scenario_lang"><spring:message code="LABEL.LANGUAGE" text="언어"/></label></dt>
      <dd>
        <div class="iptBox">
          <select name="scenario_lang" id="scenario_lang" class="select">
            <option value="kor"><spring:message code="LABEL.LANG.KOR" text="한국어"/></option>
            <option value="eng"><spring:message code="LABEL.LANG.ENG" text="영어"/></option>
          </select>
        </div>
      </dd>
    </dl>
  </div>
  <div class="lyr_btm">
    <div class="btnBox sz_small">
      <button type="button" class="btn_primary btn_submit btn_lyr_close"><spring:message code="MESSAGE.EXCEL.CONFIRM" text="확인"/></button>
      <button type="button" class="btn_primary btn_submit btn_lyr_close"><spring:message code="LABEL.CANCEL" text="취소"/></button>
    </div>
  </div>
</div>
<%--//시나리오 목록 추가--%>
<%--시나리오 삭제--%>
<div id="delete_alert" class="lyrBox">
  <div class="lyr_top">
    <h3><spring:message code="TITLE.SIMPLEBOT.DELETE" text="시나리오 삭제"/></h3>
    <button class="btn_lyr_close"><span class="text_hide"><spring:message code="LABEL.CLOSE" text="닫기"/></span></button>
  </div>
  <div class="lyr_mid">
    <p class="infoTxt"><spring:message code="MESSAGE.SIMPLEBOT.DELETE.ENG" text="Delete the"/><em>선택한 시나리오명</em><spring:message code="MESSAGE.SIMPLEBOT.DELETE.KOR" text=" 을(를) 삭제합니다."/></p>
  </div>
  <div class="lyr_btm">
    <div class="btnBox sz_small">
      <button type="button" class="btn_primary btn_submit btn_lyr_close"><spring:message code="MESSAGE.EXCEL.CONFIRM" text="확인"/></button>
      <button type="button" class="btn_primary btn_submit btn_lyr_close"><spring:message code="LABEL.CANCEL" text="취소"/></button>
    </div>
  </div>
</div>
<%--//시나리오 삭제--%>
<!-- 시나리오 파일 업로드 -->
<div id="scenario_upload" class="lyrBox scenario_upload">
  <div class="lyr_top">
    <h3><spring:message code="LABEL.EXCEL.UPLOAD" text="엑셀 파일 업로드"/></h3>
    <button class="btn_lyr_close"><span class="text_hide"><spring:message code="LABEL.CLOSE" text="닫기"/></span></button>
  </div>
  <div class="lyr_mid">
    <dl class="dl_inline">
      <dt>
        <div class="iptBox">
          <!-- [D] input[file] value = input[text] value -->
          <input type="text" name="excel_file_name" value="선택된 파일 없음" class="ipt_txt" disabled>
        </div>
      </dt>
      <dd>
        <label for="excel_file"><spring:message code="MESSAGE.EXCEL.BROWSE" text="찾아보기.."/></label>
        <form id="excelUploadForm" name="excelUploadForm" method="post" enctype="multipart/form-data"
              action="simpleBot/upload">
          <input type="file" name="excel_file" id="excel_file"
                 accept=".xls, .xlsx" style="display: none;">
          <input type="text" name="userId" style="display: none;">
          <input type="text" name="lang" style="display: none;">
        </form>
      </dd>
    </dl>
    <p class="info_text"><spring:message code="MESSAGE.EXCEL.GUIDE" text="* 파일 업로드 시 시나리오가 덮어쓰기 됩니다."/></p>

    <!-- [D] input[file] value = input[text] value -->
<%--    <input type="text" name="excel_file_name" value="선택된 파일 없음" class="ipt_txt" disabled>--%>
<%--    <label for="excel_file"><spring:message code="MESSAGE.EXCEL.BROWSE" text="찾아보기.."/></label>--%>
<%--    <form id="excelUploadForm" name="excelUploadForm" method="post" enctype="multipart/form-data"--%>
<%--          action="simpleBot/upload">--%>
<%--      <input type="file" name="excel_file" id="excel_file"--%>
<%--             accept=".xls, .xlsx" style="display: none;">--%>
<%--      <input type="text" name="userId" style="display: none;">--%>
<%--      <input type="text" name="lang" style="display: none;">--%>
<%--    </form>--%>
<%--    <p class="info_text"><spring:message code="MESSAGE.EXCEL.GUIDE" text="* 파일 업로드 시 시나리오가 덮어 쓰기 됩니다."/></p>--%>
  </div>
  <div class="lyr_btm">
    <div class="btnBox sz_small">
      <button type="button" class="btn_primary btn_submit btn_lyr_close"><spring:message code="MESSAGE.EXCEL.CONFIRM" text="확인"/></button>
      <button type="button" class="btn_primary btn_submit btn_lyr_close"><spring:message code="LABEL.CANCEL" text="취소"/></button>
    </div>
  </div>
</div>
<!-- //시나리오 파일 업로드 -->

<%--시나리오 저장--%>
<div id="scenario_save" class="lyrBox no_bg">
  <div class="lyr_mid">
    <div class="loading_container">
      <div class="loading"></div>
      <span class="loading_text"><spring:message code="MESSAGE.APPLY.SAVING" text="저장"/></span>
    </div>
  </div>
</div>

<%--<div class="lyrBox no_bg saving">--%>
<%--  <div class="lyr_mid">--%>
<%--    <div class="loading_container">--%>
<%--      <div class="loading"></div>--%>
<%--      <span class="loading_text"><spring:message code="MESSAGE.APPLY.SAVING" text="저장"/></span>--%>
<%--    </div>--%>
<%--  </div>--%>
<%--</div>--%>
<%--//시나리오 저장--%>

<script>

  function sendChatBotMeta(host, lang) {
    var chat_meta = {host: host, lang: lang};
    document.getElementById("chatbot_iframe").contentWindow.postMessage(chat_meta, '*');
  }

  function makeChatBotIframe(hostName, host, lang) {

    // var frontUrl = 'http://10.50.100.38:10020/';
    var frontUrl = 'https://sds.maum.ai/';
    var iframe_url = frontUrl + hostName;
    document.getElementById("chatbot_iframe_div").innerHTML =
      '<iframe id="chatbot_iframe" src="' + iframe_url + '"'
      + ' style="width:100%; height:100%" '
      + ' frameborder=0 framespacing=0 marginheight=0 marginwidth=0 scrolling=no vspace=0>' +
      '</iframe>';

    var chat_meta = {host: host, lang: lang};
    var iframe = document.getElementById("chatbot_iframe");
    iframe.addEventListener("load", function () {
      document.getElementById("chatbot_iframe").contentWindow.postMessage(chat_meta, '*');
    }, false);
  }

  $(document).ready(function () {

    var host;
    var hostName;
    var lang;
    var userId;
    var scenario;

    var testerContractNo;
    var socket = null;
    var isSocketConnected = false;

    window.addEventListener("message", initScenarionLang, false);
    // sendUserInfo({data:{userId:'english@gmail.com'}});
    // initScenarionLang({data:{userId:'english@gmail.com'}});

    var isInIFrame = (window.location != window.parent.location);
    if (isInIFrame === true) {
      $("#simplebot_header").hide();
    }

    // toggleLanguage  kor < -- > eng
    $('div.twins .btn_primary').on('click', setScenarioLang);


    //Layer popup open
    $('.btn_lyr_open').on('click',function(){
      var winHeight = $(window).height()*0.7,
              hrefId = $(this).attr('href');

      $('body').css('overflow','hidden');
      $('body').find(hrefId).wrap('<div class="lyrWrap"></div>');
      $('body').find(hrefId).before('<div class="lyr_bg"></div>');

      //대화 UI
      $('.lyrBox .lyr_mid').each(function(){
        $(this).css('max-height', Math.floor(winHeight) +'px');
      });

      //Layer popup close
      $('.btn_lyr_close, .lyr_bg').on('click',function(){
        $('body').css('overflow','');
        $('body').find(hrefId).unwrap('<div class="lyrWrap"></div>');
        $('.lyr_bg').remove();
      });
    });

    //excel upload lyr open
    // $('.excel_upload').on('click', function () {
    //   $('.lyrWrap').addClass('show');
    //   $('.lyrBox.scenario_upload').addClass('show');
    //   handleInsideLyrInputValue($('.lyrWrap'));
    // });

    function setScenarioLang() {
      if (lang == this.value) {
        return;
      }
      lang = Number(this.value);
      console.log('language change to -> ' + lang);

      // toggle 효과
      $('div.twins .btn_primary').removeClass('active');

      var toggleClass = document.getElementById('twins');
      var childButton = toggleClass.firstElementChild;

      if (lang === 1) {
        childButton = toggleClass.firstElementChild;
      } else if (lang = 2) {
        childButton = toggleClass.lastElementChild;
      }
      childButton.classList.add('active');

      // 하단 info 창 disappear
      $('.scenario_view ').removeClass('edit_show');

      // 챗봇 테스트 창 초기화
      $('.blind').show();
      testBotShow = false;

      sendUserInfo({data:{userId:userId, lang: lang}});
    }

    // fast 시스템 언어에 따라 초기 언어 설정
    function initScenarionLang(e) {
      userId = e.data.userId;
      var urlLang = getParameterByName("lang");

      if (urlLang === "ko") {
        this.value = "1";
      } else if (urlLang === "en") {
        this.value = "2";
      } else {
        this.value = "1";
      }
      setScenarioLang();
    }

    // url에서 parameter 가져오기
    function getParameterByName(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
              results = regex.exec(location.search);
      return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    function downloadFile() {
      var frm = document.downloadForm;
      frm.submit();
    }

    $('.excel_download').on('click', function () {
      console.log('excel download');
      downloadFile();
    });

    //수정 AMR 저장버튼 효과 백그라운드로 수정 (lyr open -> background gradient)
    $('.btn_save').on('click', function () {
      var $this = $(this);
      var txt = '저장';
      var changeTxt = '저장중';

      //수정 AMR 저장중 효과를 백그라운드로 바꿈
      $this.text(changeTxt).addClass('gradient');

      // [D] 저장중 효과 사라지기
      setTimeout(function(){
        clearLoadingUI($this, txt)
      }, 20000);
    });

    function clearLoadingUI(selector, text) {
      selector.text(text).removeClass('gradient');
    }

    $('.btn_lyr_close').on('click', handleLyrBoxClose);
    // 업로드 확인
    $('.lyrWrap .btn_submit').on('click', function () {
      handleLyrBoxClose();
      uploadExcel();
    });

    function handleLyrBoxClose() {
      $('.lyrWrap').removeClass('show');
      $('.lyrWrap .lyrBox').removeClass('show');
    }

    //선택한 파일이름을 input value에 치환
    $('input[type="file"]').change(function (e) {
      var fileName = e.target.files[0].name;
      $('input[name="excel_file_name"]').val(fileName);
    });

    // 추가 AMR 200326 input value 초기화
    function handleInsideLyrInputValue(lyr) {
      lyr.find('input').each(function () {
        var inputEl = $(this);
        if (inputEl.is('[name="excel_file_name"]')) {
          inputEl.val('<spring:message code="MESSAGE.EXCEL.NOTSELECT" javaScriptEscape="true"/>');
        } else {
          inputEl.val('')
        }
      });
    }

    //testbot open & close
    //추가 200424 AMR 챗봇 테스트 버튼
    var testBotShow = false;
    $('#chat_test_start').on('click', function () {
      // 저장 된 적 없는 경우 -> '저장을 먼저 눌러주세요'
      if (host === '' || host === undefined || host === 0) {
        alert('<spring:message code="MESSAGE.CHATBOT.SAVE" javaScriptEscape="true"/>');
        return;
      }
      if (!testBotShow) {
        // makeChatBotIframe(hostName, host, lang);
        $('.blind').hide();
        testBotShow = true;
      } else {
        testBotShow = false;
      }
    });

    // 챗봇 재시작 버튼 클릭 이벤트
    $('.chatbot_refresh').on('click', function () {
      // makeChatBotIframe(hostName, host, lang);
      var $this = $(this);
      $('#chatbot .lst_talk').empty();
    });

    //btn save effect
    $('.btn_save').on('click', function () {
      scenario = getScenarioJsonData();
      $.ajax({
        url: "simpleBot/apply",
        data: JSON.stringify({userId: userId, lang: lang, scenarioJson: JSON.stringify(scenario)}),
        type: "POST",
        contentType: 'application/json'
      }).done(function (response) {
        clearLoadingUI();
        if (response['msg'] && response['msg'].toLowerCase() === 'success') {
          sendUserInfo({data: {userId: userId}});
          alert('<spring:message code="MESSAGE.APPLY.SAVE" javaScriptEscape="true"/>');
          if (response['appliedAt']) {
            $('em.saved_time').text(response['appliedAt'] + ' Updated');
          }
        } else {
          alert('<spring:message code="MESSAGE.APPLY.CANTSAVE" javaScriptEscape="true"/>');
          console.log(response);
        }
      }).fail(function (response) {
        clearLoadingUI();
        alert('<spring:message code="MESSAGE.APPLY.CANTSAVE" javaScriptEscape="true"/>');
        console.log('apply() status code: ' + response.status);
      });
    });

    function sendUserInfo(e) {
      //data.userId
      data = e.data;
      userId = data.userId;
      if (!data.lang) data.lang = lang;

      console.log('get userId[' + userId + '] from FAST-AI. ');

      $.ajax({
        url: "simpleBot/userInfo",
        data: JSON.stringify(data),
        type: "POST",
        contentType: 'application/json'
      }).done(function (response) {
        host = response.host;
        // 추후 ynbot 쓸 일이 없도록 frontend 쪽 바꿀 것.
        if (userId === undefined || userId === '' || host == 1) {
          hostName = 'ynbot_default';
        } else {
          hostName = 'ynbot_' + userId;
        }
        console.log('userId:' + userId + ', simpleBotId:' +
          response.simpleBotId + ', host: ' + host + ', lang:' + lang);
        if (response.scenarioJson) {
          scenario = JSON.parse(response.scenarioJson);
          jsPlumbToolkit.ready(function () {
            drawFlowChart(scenario, lang);
          });
        } else {
          drawFlowChart({}, lang);
        }

        // 음성봇 관련 호출
        findTesterInfo();
        if (!isSocketConnected) {
          voiceBotMonitoring();
        }
      });
    }

    function uploadExcel() {
      $('body').removeClass('lyr_show');

      var file = $("#excel_file").val();
      if (file === "" || file === null) {
        alert('<spring:message code="MESSAGE.EXCEL.SELECT" javaScriptEscape="true"/>');
      }

      var options = {
        success: function (response) {
          alert('<spring:message code="MESSAGE.EXCEL.SUCCESS" javaScriptEscape="true"/>');
          $('.scenario_view ').removeClass('edit_show');
          jsPlumbToolkit.ready(function () {
            scenario = JSON.parse(response.scenarioJson);
            let copy = $.extend(true, {}, scenario);
            console.log('upload scenario');
            drawFlowChart(scenario, lang);
          });

        }, error: function (response) {
          alert('<spring:message code="MESSAGE.EXCEL.ERROR" javaScriptEscape="true"/>');
          console.log(response);
        },
        type: "POST"
      };
      $("#excelUploadForm input[name='userId']").val(userId);
      $("#excelUploadForm input[name='lang']").val(lang);
      $("#excelUploadForm").ajaxSubmit(options);
    }

    //btn call effect
    $('#voice_test_start').on('click', function () {

      var requiredValues = $(this).parents('.required_value');
      var testerName = $("input[name='name']").val();
      var testerPhone = $("input[name='tel']").val();

      // 필수값 체크
      if ( requiredValues.find('[name="tel"]').val() === '' ) {
        alert('<spring:message code="MESSAGE.VOICEBOT.TEL" javaScriptEscape="true"/>');
        return;
      }
      if ( requiredValues.find('[name="name"]').val() === '' ) {
        alert('<spring:message code="MESSAGE.VOICEBOT.NAME" javaScriptEscape="true"/>');
        return;
      }
      if (host === undefined || host === '' || host === 0 || userId === undefined || userId === '') {
        alert('<spring:message code="MESSAGE.VOICEBOT.SAVE" javaScriptEscape="true"/>');
        return;
      }

      // 대기중일 때 효과 .gradient
      $(this).text('<spring:message code="LABEL.WAITING" javaScriptEscape="true"/>').addClass('gradient');
      $(this).attr('disabled', true);

      alert('<spring:message code="MESSAGE.VOICEBOT.CALL" javaScriptEscape="true"/>');

      setTimeout(function() {
        $('#voice_test_start').removeClass('btn_primary');
        $('#voice_test_start').addClass('btn_secondary');
        $('#voice_test_start').text('통화중');
      }, 3000);

      // 유저 정보 음성봇쪽 DB에 저장
      $.ajax({
        url: "simpleBot/saveTesterInfo",
        data: JSON.stringify({tester: userId, svc_host: host, call_name: testerName, call_tel: testerPhone, lang: lang}),
        type: "POST",
        contentType: 'application/json'
      }).done(function (response) {
        console.log(response);
        if (response !== "WRONG" && response !== "ERROR") {
          var responseData = response['result'];
          if (responseData === undefined || responseData['contract_no'] === undefined || responseData['contract_no'] === '') {
            alert('<spring:message code="MESSAGE.VOICEBOT.RETRY" javaScriptEscape="true"/>');
          } else {
            testerContractNo = responseData['contract_no'];
            callStart();
            console.log('interval start!!');
            checkWaitingNo = setInterval(function() {
              getWaitingNo();
            }, 1000);
          }
        }
      }).fail(function (response) {
        console.log('saveTesterInfo fail!!');
        console.log(response);
      });
    });

    // 전화걸기
    function callStart() {
      $.ajax({
        url: "simpleBot/callStart",
        data: JSON.stringify({contractNo: testerContractNo, lang: lang}),
        type: "POST",
        contentType: 'application/json'
      }).done(function (response) {
        console.log('callStart done!!');
        console.log(response);
      }).fail(function (response) {
        console.log('callStart fail!!');
        console.log(response);
      });
    }

    // 수신자 정보 조회
    function findTesterInfo() {
      $.ajax({
        url: "simpleBot/getTesterInfo",
        data: JSON.stringify({tester: userId, lang: lang}),
        type: "POST",
        contentType: 'application/json'
      }).done(function (response) {
        // console.log('findTesterInfo res: ' + response);
        if (response !== "WRONG" && response !== "ERROR" && response['status'] !== "failed") {
          var responseData = response['result'];
          testerContractNo = responseData['contract_no'];
          $("input[name='name']").val(responseData['name']);
          $("input[name='tel']").val(responseData['tel_no']);
        }
      }).fail(function (response) {
        console.log('findTesterInfo fail!!');
        console.log(response);
      });
    }

    // 대기 인원 수 조회해오기
    function getWaitingNo() {
      $.ajax({
        url: "simpleBot/callList",
        data: JSON.stringify({contract_no: testerContractNo, lang: lang}),
        type: "POST",
        contentType: 'application/json'
      }).done(function (response) {
        console.log(response);
        console.log(response['cnt'] !== 0 ? response['cnt'] : 0);
        let voicebotCover = $(".voicebot_start").children('p');
        if (response['cnt'] === "" || response['cnt'] === undefined || response['cnt'] === "0") {
          // 대기자가 없을 경우
          $(".make_call").children('span').children('em').text("0");
          $(".voice_talk").empty();
          $('#voice_test_start').text('<spring:message code="LABEL.CALL" javaScriptEscape="true"/>').removeClass('gradient');
          $('#voice_test_start').attr('disabled', false);
          clearInterval(checkWaitingNo);
          setTimeout(function() {
            $(".make_call").children('span').css('visibility', 'hidden');
          }, 3000);
          if (voicebotCover.length > 0) {
            voicebotCover.remove();
          }
        } else {
          // 대기자가 있는 경우
          $(".make_call").children('span').children('em').text(response['cnt']);
          if (voicebotCover.length > 0) {
            $(".voicebot_start").children('p').text('<spring:message code="MESSAGE.WAITING" javaScriptEscape="true"/>');
          } else {
            let voicebotStart = document.getElementsByClassName('voicebot_start')[0];
            let p_msg = document.createElement("p");
            p_msg.innerHTML = '<spring:message code="MESSAGE.WAITING" javaScriptEscape="true"/>';
            voicebotStart.appendChild(p_msg);
          }
        }
        if (socket === null || !socket.connected) {
          if (voicebotCover.length > 0) {
            $(".voicebot_start").children('p').text('<spring:message code="MESSAGE.SOCKET.FAIL" javaScriptEscape="true"/>');
          } else {
            let voicebotStart = document.getElementsByClassName('voicebot_start')[0];
            let p_msg = document.createElement("p");
            p_msg.innerHTML = '<spring:message code="MESSAGE.SOCKET.FAIL" javaScriptEscape="true"/>';
            voicebotStart.appendChild(p_msg);
          }
        }
      }).fail(function (response) {
        console.log('callList fail!!');
        console.log(response);
        alert('<spring:message code="MESSAGE.CALLLIST.FAIL" javaScriptEscape="true"/>');
        $(".make_call").children('span').children('em').text("0");
        $(".voice_talk").empty();
        $('#voice_test_start').text('<spring:message code="LABEL.CALL" javaScriptEscape="true"/>').removeClass('gradient');
        $('#voice_test_start').attr('disabled', false);
        clearInterval(checkWaitingNo);
        if ($(".voicebot_start").children('p').length > 0) {
          $(".voicebot_start").children('p').remove();
        }
      });
    }

    // 추가 200423 AMR tab_menu 클릭
    $('.tab_menu button').on('click', function () {
      var index = $(this).index();
      console.log('tab index', index)

      $('.tab_menu button').removeClass('on');
      $('.tab_cont li').removeClass('on');

      $(this).addClass('on');
      $('.tab_cont > li').eq(index).addClass('on');
    });

    function voiceBotMonitoring() {
      if (host === undefined || host === '' || host === 0
          || userId === undefined || userId === '') {
        return;
      }

      isSocketConnected = true;
      socket = io.connect('connect-us.maum.ai:51000', {'force new connection': true});

      // 웹에서 계속 연결 시도하기 때문에 close
      setTimeout(function() {
        if (!socket.connected) {
          socket.close();
          isSocketConnected = false;
          socket = null;
          console.log('socket connection failed');
        }
      }, 3000);

      socket.on('connection', function(data) {
        console.log('connect');
        if(data.type === 'connected') {
          socket.emit('connection', {
            type : 'join',
            name : userId,
            room : host
          });
        }
      });

      socket.on('message', function(data) {
        console.log('[socket] type: ' + data.type + ', message: ' + data.message);
        if (data.message !== '처음으로' && (data.message.charAt(0) !== '#')) {
          let message = data.message.replace(/\|/gi, "");
          var ul = document.getElementsByClassName('voice_talk')[0];
          let li = document.createElement("li");
          li.setAttribute("class", data.type);
          let dv_msg = document.createElement("div");
          let p_msg = document.createElement("p");
          dv_msg.setAttribute("class", "message");
          p_msg.setAttribute("class", "text");
          p_msg.innerHTML = message;
          dv_msg.appendChild(p_msg);
          li.appendChild(dv_msg);
          ul.appendChild(li);
          $('#voicebot').scrollTop($('#voicebot')[0].scrollHeight);
        }
      });
    }

    // 추가 AMR tbl_line 테이블에서 td 클릭 시 active
    $('.tbl_line_lst td').on('click', function(){
      $(this).parents('.tbl_line_lst').find('tr').removeClass('active');
      $(this).parent().addClass('active');
    });
  });

</script>
</body>
</html>
