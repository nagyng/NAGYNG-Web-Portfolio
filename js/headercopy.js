// headercopy.js
      
// #fab 이모지 스크롤탑
$(function () {
  $("#fab").click(function () {
    // #fab 를 클릭하면
    $("html").animate({ scrollTop: 0 }, 1000);
  });
}); 
 

// 햄버거(.fab) 클릭하면 메뉴(.menu) 보이기/숨기기
// $(function () {
//   $(".fab").click(function () {
//     $(".index-menu").toggleClass("open"); 
//   });
// });
 
