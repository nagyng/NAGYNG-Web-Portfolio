// Typed.js 플러그인
let typed = new Typed("#typing", {
  // strings: ["Nagyng"],
  strings: [
    "안녕하세요!",
    "Guten Tag!",
    "Wie heist du?",
    "Welcome to my place!",
  ],
  typeSpeed: 50,
});

// AOS 플러그인
$(document).ready(function () {
  AOS.init();
});

// 햄버거(.fab) 클릭하면 메뉴(.menu) 보이기/숨기기

// isotope.js 플러그인

// FAB 클릭하면 맨맨위로 이동
$(function () {
  $("#fab").click(function () {
    $("html").animate({ scrollTop: 0 }, 1000);
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

  // stripe 배경 ON/OFF
  if (nextMode === "dark") {
    stripeBg.classList.remove("inactive");
  } else {
    stripeBg.classList.add("inactive");
  }

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

// 언어 변경
const langDropdown = document.querySelector(".language-dropdown");
const langToggleBtn = document.querySelector(".lang-toggle-btn");
const langOptions = document.querySelectorAll(".lang-options li");

const languageData = {
  Kor: {
    smallMenu: ["브랜딩", "웹사이트", "패키지", "인테리어"],
    mainMenu: ["프로젝트", "소개", "연락처", "블로그"],
    flag: "🇰🇷",
  },
  Eng: {
    smallMenu: ["Branding", "Website", "Packaging", "Interior"],
    mainMenu: ["PROJECTS", "ABOUT", "CONTACTS", "BLOG"],
    flag: "🇺🇸",
  },
  Ger: {
    smallMenu: ["Branding", "Website", "Packaging", "Interior"],
    mainMenu: ["PROJEKTS", "ÜBER", "KONTAKT", "FOLGEN SIE UNS"],
    flag: "🇩🇪",
  },
};

// toggle 버튼 눌렀을 때 메뉴 열기
langToggleBtn.addEventListener("click", () => {
  langDropdown.classList.toggle("active");
});

// 옵션 클릭 → 언어 변경
langOptions.forEach((li) => {
  li.addEventListener("click", () => {
    const selectedLang = li.dataset.lang;
    const lang = languageData[selectedLang];

    // 언어 선택
    currentLang = selectedLang;
    updateCurrentModeLabel(); // 언어 바뀌면 아래 텍스트도 바꾸기

    // 국기 버튼 변경
    langToggleBtn.innerHTML = `<span class="flag">${lang.flag}</span>`;
    langDropdown.classList.remove("active");

    // 메뉴 텍스트 변경
    const smallMenuItems = document.querySelectorAll(".index-small-menu li p");
    smallMenuItems.forEach((p, i) => {
      p.textContent = lang.smallMenu[i];
    });

    const mainMenuItems = document.querySelectorAll(".index-menu li");
    mainMenuItems.forEach((li, i) => {
      const a = li.querySelector("a");
      if (a) {
        a.textContent = lang.mainMenu[i];
      }
    });
  });
});

// .content-box 요소를 감싸면서 넓이 반응형으로 주기
const contentBox = document.querySelector(".content-box");
const title01 = document.querySelector(".title01");
const title02 = document.querySelector(".title02");

// 위치 기반 사이즈 재조정 함수
function updateContentBoxSize() {
  requestAnimationFrame(() => {
    const boxRect = contentBox.getBoundingClientRect();
    const t1Rect = title01.getBoundingClientRect();
    const t2Rect = title02.getBoundingClientRect();

    const bottomMost = Math.max(t1Rect.bottom, t2Rect.bottom);
    const rightMost = Math.max(t1Rect.right, t2Rect.right);

    const height = bottomMost - boxRect.top;
    const width = rightMost - boxRect.left;

    contentBox.style.height = `${height}px`;
    contentBox.style.width = `${width}px`;
  });
}

// ResizeObserver로 전체 감시
const resizeObserver = new ResizeObserver(updateContentBoxSize);
resizeObserver.observe(document.body);
