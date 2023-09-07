$(document).ready(function() {

  $('.gnb').hover(function() {
    $(this).find('.main .sub_all').stop().slideDown();
    $('.sub_bgbox').stop().slideDown();
  },function(){
    $(this).find('.main .sub_all').stop().slideUp();
    $('.sub_bgbox').stop().slideUp();
  });

  //주메뉴 오버시 해당하는 서브박스의 전체배경색과 왼쪽이미지 나오게 함
  $(".main").hover(function(){

    let oldimg = 0; //기존에 보이는 이미지
    let newimg = $(this).index(); //새로 바뀌는 이미지

    $(this).find(".sub_all").css({"background": "rgba(10, 255, 202, 0.1)"});

    $(".subBoxImg ul li").eq(oldimg).stop().hide("slow"); //기존이미지는 숨기기
    $(".subBoxImg ul li").eq(newimg).stop().show("slow"); //새로 선택된 이미지는 보이기
    oldimg = newimg; //위에서 새로 바뀐 이미지는 다시 기존이미지에 저장

  },function(){
    $(this).find(".sub_all").css({"background": "transparent"});
    $(".subBoxImg ul li").stop().hide();
  });

  // 메인--------------------------------------------+

  let $img = $(".changeimg ul li");
  let $text = $(".changeimg ul li .des")
  let oldImg=0;
  let newImg=0;
  let oldText=0;
  let newText=0;
  let count = $img.length;

  //이미지&텍스트 전환효과 함수
  function changeImg(newImg){
    if(oldImg != newImg){
      $img.eq(oldImg).removeClass("imgVisible");
      $img.eq(newImg).addClass("imgVisible");
    };
    oldImg = newImg;
  };

  function changeText(newText){
      if(oldText != newText){
        $text.eq(oldText).removeClass("textVisible");
        $text.eq(newText).addClass("textVisible");
      };
      oldText = newText;
  };

  //자동함수 생성
  function autoImg(){
    newImg++;
      if(newImg>count-1){
        newImg=0;
      }
      changeImg(newImg);
  };

  function autoText(){
    newText++;
      if(newText>count-1){
        newText=0;
      }
      changeText(newText);
  };

  timer1=setInterval(autoImg,4000);
  timer2=setInterval(autoText,4000);


  //아이콘 슬라이드 ------------------------------------------------------------
  //자동으로 슬라이드 함수생성
  function bannerAuto(){

    $(".ban ul").stop(true, true).animate({marginLeft:"-=165px"},500,function(){
      $(".ban ul li:first-child").appendTo(".ban ul");
      $(this).css({marginLeft:"0px"});
    });

  };
  bauto = setInterval(bannerAuto,4000);

  $(".ban_btn .ban_right").click(function(){
    
    $(".ban ul").stop(true, true).animate({marginLeft:"-=165px"},500,function(){
      $(".ban ul li:first-child").appendTo(".ban ul"); //첫번째 이미지가 맨뒤로 이동
      $(this).css({marginLeft:"0px"}); //최종목적지
    });

  });

  //이전보기
  $(".ban_btn .ban_left").click(function(){
    
    $(".ban ul").stop(true, true).animate({marginLeft:"+=165px"},500,function(){
      $(".ban ul li:last-child").prependTo(".ban ul"); //마지막 이미지가 맨앞으로 이동
      $(this).css({marginLeft:"0px"}); //최종목적지
    });

  });

  //마우스를 올리면 슬라이드 자동함수 멈추고, 마우스를 내리면 다시 자동함수 실행
  $(".ban").hover(function(){
    clearInterval(bauto);
  }, function(){
    bauto = setInterval(bannerAuto,4000);
  });
// ----------------------------------------------------------------------------
  //알림판, 누리소통망, 시스템안내
  $(".tabb li").click(function () {
    let num = $(this).index();
    let move = 70 * num; //세로 높이 70px씩 증가됨

    $(".tab-header1 .tab-highlight1").animate({top: move });
    $(this).siblings().removeClass("active");
    $(this).addClass("active");

    let tabname = $(this).attr("data-alt");
    console.log(`tabname:${tabname}`);
    $("#" + tabname).addClass("active");
    $("#" + tabname).siblings().removeClass("active"); //나를 제외한 다른 형제요소에서는 액티브를 꺼달라
  });

// 공고, 채용-----------------------------------------------------

$(".tab li").click(function () {
  let num = $(this).index();
  let move = 160 * num; //너비*순서 = 거리

  $(".tab-header2 .tab-highlight2").animate({left: move });
  $(this).siblings().removeClass("active");
  $(this).addClass("active");

  let tabname = $(this).attr("data-alt");
  console.log(`tabname:${tabname}`);
  $("#" + tabname).addClass("active");
  $("#" + tabname).siblings().removeClass("active"); //나를 제외한 다른 형제요소에서는 액티브를 꺼달라
});

//슬라이드배너영역------------------------------------------------------------------------------------
let $ssimg=$(".slide ul");
  let $ssimgli=$(".slide ul li");
  let $ssbtn=$(".slide_btn ul li");
  let $ssnext=$(".slide_side_btn .nex");
  let $sspre=$(".slide_side_btn .pre");
  let ssimg_w=$ssimgli.width(); //이미지의 가로너비
  let ssimg_n=$ssimgli.length; //이미지의 총개수
  let ssoldidx=0; //기존이미지
  let ssindex=0; //선택된 새이미지


  //index번째 비주얼이미지 이동하는 함수생성
  function sslideImg(ssindex){ 

    targetX=-(ssindex*ssimg_w) //움직이는 거리(너비)

    $ssimg.stop().animate({left:targetX},600); //위에서 계산한 거리만큼 움직임
    $ssbtn.eq(ssoldidx).removeClass("active"); //기존버튼 비활성화
    $ssbtn.eq(ssindex).addClass("active"); //선택버튼 활성화
    ssoldidx=ssindex;
    
  };

  //자동함수 생성
  function sslideAuto(){

    ssindex++;
    if(ssindex == ssimg_n){ //simg_n은 이미지개수 5, index는 0,1,2,3,4
      ssindex=0;
    }
    sslideImg(ssindex); //함수호출

  }

  auto = setInterval(sslideAuto,4000);  

  //하단버튼
  $ssbtn.click(function(){

    clearInterval(auto); 
    $(".play").hide();
    $(".stop").show();
    ssindex=$(this).index();
    sslideImg(ssindex);
    auto = setInterval(sslideAuto,4000);

  });

  //좌우버튼
  $sspre.click(function(){

    clearInterval(auto);
    $(".play").hide();
    $(".stop").show(); 
    ssindex--;
    if(ssindex < 0){ //선택한 이미지가 4,3,2...0 첫번째일때 맨 마지막부터 다시 시작
      ssindex=ssimg_n-1;
    }
    sslideImg(ssindex);
    auto = setInterval(sslideAuto,4000);
  });

  $ssnext.click(function(){

    clearInterval(auto);
    $(".play").hide();
    $(".stop").show(); 
    ssindex++;
    if(ssindex > ssimg_n-1){ //index는 0부터 시작하고 length는 1부터 시작하므로 1을 빼주어야 마지막 숫자가 맞음
      ssindex=0;
    }
    sslideImg(ssindex);
    auto = setInterval(sslideAuto,4000);

  });

  //Play,Stop.....
  $(".play").hide(); //처음에는 Stop버튼을 보이게 하기위해 Play버튼을 숨김

  $(".stop").click(function(){
    clearInterval(auto); 
    $(".stop").hide();
    $(".play").show();
  });
  $(".play").click(function(){
    auto = setInterval(sslideAuto,4000);
    $(".play").hide();
    $(".stop").show();
  });

  //뉴스존-----------------------------------------------------------------

  let nold=0;

  //다음보기
  $(".nright").click(function(){

    nnew=nold+1;
    nnum=$(".news_list li").length;

    if(nnew<nnum){ //이미지 전체개수보다 적으면 수행
      $(".news_list li").eq(nold).hide();
      $(".news_list li").eq(nnew).show();
      nold=nnew;
    };

  });


  //이전보기
  $(".nleft").click(function(){

    nnew=nold-1;

    if(nnew>=0){ //이미지 전체개수보다 적으면 수행
      $(".news_list li").eq(nold).hide();
      $(".news_list li").eq(nnew).show();
      nold=nnew;
    };
  });


});