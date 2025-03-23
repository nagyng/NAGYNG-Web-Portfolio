// header.js
$(function () {
  // 헤더가 다 불러진 뒤에 실행되도록 타이밍 조절
  $("#header").load("./header.html", function () {
    // 여기에 모든 header 관련 JS 코드를 넣어야 안전해!
    AOS.init();

    // 스크롤 탑 버튼
    $("#fab").click(function () {
      $("html").animate({ scrollTop: 0 }, 1000);
    });

    // 햄버거 메뉴
    $(".fab").click(function () {
      $(".index-menu").toggle();
    });

    // 아래는 theme 변경 로직
    let themeState = 0;
    const p = document.querySelector("#theme-color > p");
    const currentModeText = document.getElementById("current-mode-text");

    const themeModes = ["dark", "lightA", "lightB"];
    const overlayColors = [null, "var(--new_jeans)", "var(--negai)"];
    const marginValues = ["2rem", "0rem", "-2rem"];

    const modeNames = {
      Kor: ["다크모드 🌚", "라이트A ☀️", "라이트B ☀️"],
      Eng: ["Dark 🌚", "LightA ☀️", "LightB ☀️"],
      Ger: ["Dark 🌚", "LightA ☀️", "LightB ☀️"],
    };

    let currentLang = "Kor";

    document.getElementById("theme-color").addEventListener("click", () => {
      const existingOverlay = document.querySelector("#theme-overlay");
      if (existingOverlay) existingOverlay.remove();

      const nextThemeState = (themeState + 1) % themeModes.length;
      const nextMode = themeModes[nextThemeState];
      const overlayColor = overlayColors[nextThemeState];
      const marginRight = marginValues[nextThemeState];

      p.style.marginRight = marginRight;
      document.body.className = `theme-${nextMode}`;

      if (overlayColor) {
        const overlay = document.createElement("div");
        overlay.id = "theme-overlay";
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100vw";
        overlay.style.height = "100vh";
        overlay.style.backgroundColor = overlayColor;
        overlay.style.mixBlendMode = "screen";
        overlay.style.pointerEvents = "none";
        overlay.style.zIndex = "9999";
        document.body.appendChild(overlay);
      }

      themeState = nextThemeState;
      currentModeText.textContent = modeNames[currentLang][nextThemeState];
    });
  });
});
