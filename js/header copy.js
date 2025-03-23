// header.js
      
// #fab 이모지 스크롤탑
$(function () {
  $("#fab").click(function () {
    // #fab 를 클릭하면
    $("html").animate({ scrollTop: 0 }, 1000);
  });
}); 
 

// 햄버거(.fab) 클릭하면 메뉴(.menu) 보이기/숨기기
$(function () {
  $(".fab").click(function () {
    $(".index-menu").toggle();
  });
});

// 테마 변경
let themeState = 0;

const p = document.querySelector("#theme-color > p");
const stripeBg = document.getElementById("dark-stripe-bg");

const themeModes = ["dark", "lightA", "lightB"];
const overlayColors = [null, "var(--new_jeans)", "var(--negai)"];
const marginValues = ["2rem", "0rem", "-2rem"];

document.getElementById("theme-color").addEventListener("click", () => {
  const existingOverlay = document.querySelector("#theme-overlay");
  if (existingOverlay) existingOverlay.remove();

  const nextThemeState = (themeState + 1) % themeModes.length;
  const nextMode = themeModes[nextThemeState];
  const overlayColor = overlayColors[nextThemeState];
  const marginRight = marginValues[nextThemeState];

  // margin-right 바로 반영
  p.style.marginRight = marginRight;

  // body 테마 클래스 적용
  document.body.className = `theme-${nextMode}`;

  // overlay 적용
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
  // 모드 텍스트 업데이트
  updateCurrentModeLabel();
  showOverlayModeName(modeNames[currentLang][nextThemeState]);
});

// 현재 모드 텍스트 업데이트
const currentModeText = document.getElementById("current-mode-text");

const modeNames = {
  Kor: ["다크모드 🌚", "라이트A ☀️", "라이트B ☀️"],
  Eng: ["Dark 🌚", "LightA ☀️", "LightB ☀️"],
  Ger: ["Dark 🌚", "LightA ☀️", "LightB ☀️"],
};

let currentLang = "Kor"; // 기본 한국어

function updateCurrentModeLabel() {
  currentModeText.textContent = modeNames[currentLang][themeState];
}

function showOverlayModeName(name) {
  const overlay = document.createElement("div");
  overlay.id = "mode-overlay";
  overlay.textContent = name;
  document.body.appendChild(overlay);

  // 보여주기 (opacity + scale up)
  setTimeout(() => {
    overlay.style.opacity = "1";
    overlay.style.transform = "translate(-50%, -50%) scale(1)";
    overlay.style.transition = "all 1s";
  }, 50);

  // 사라지기
  setTimeout(() => {
    overlay.style.opacity = "0";
    overlay.style.transform = "translate(-50%, -50%) scale(1.3)";
    overlay.style.transition = "all 1s";
  }, 1000);

  // 제거
  setTimeout(() => {
    overlay.remove();
  }, 2500);
} 