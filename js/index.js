 // Typed.js 플러그인
var typed = new Typed('#typing', {
    // strings: ["Nagyng"],
    strings: ["안녕하세요!","Guten Tag!", "Wie heist du?", "Ich bin ein Student.", "Ich lerne Deutsch."],
    typeSpeed: 50,
  });

// 햄버거(.fab) 클릭하면 메뉴(.menu) 보이기/숨기기
$(function () {
    $(".fab").click(function () {
        // 햄버거(.fab) 클릭하면
        $(".menu").toggle();
    })
})
// Swiper.js 플러그인
var swiper = new Swiper(".mySwiper", { 
    autoplay: {delay: 3000}
});
// AOS.js 플러그인
AOS.init();

// isotope.js 플러그인

// FAB 클릭하면 위로 이동
$(function () {
    $("#fab").click(function () { 
        $("html").animate({scrollTop: 0},1000);
    })
})