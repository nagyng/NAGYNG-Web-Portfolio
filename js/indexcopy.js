// indexcopy.js

// Typed.js 플러그인
let typed = new Typed("#typing", {
  // strings: ["Nagyng"],
  strings: [
    "환영합니다!",
    "Guten Tag!",
    "Wie heist du?",
    "Welcome to my place!",
  ],
  typeSpeed: 50,
});

// isotope.js 플러그인

// AOS 플러그인
$(document).ready(function () {
  AOS.init();
});

// headercopy.js

// #fab 이모지 스크롤탑
$(function () {
  $("#fab").click(function () {
    $("html").animate({ scrollTop: 0, behavior: "smooth" }, 1000);
  });
});

// 햄버거 토글 코드 강화:
$(function () {
  $(".fab").click(function () {
    $(".index-menu-container").toggleClass("show");
  });
});

// 테마 변경
let themeState = 0;

const p = document.querySelector("#theme-color > p");
const stripeBg = document.getElementById("dark-stripe-bg");

const themeModes = ["dark", "lightA", "lightB"];
const overlayColors = [null, "var(--bucket_hat)", "var(--negai)"];
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
  Kor: ["흑백모드 🌚", "라이트A ☀️", "라이트B ☀️"],
  Eng: ["Black & White 🌚", "LightA ☀️", "LightB ☀️"],
  Ger: ["Black & White 🌚", "LightA ☀️", "LightB ☀️"],
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
    smallMenu: [
      "⭐ 포스터 디자인",
      "⭐ 웹 페이지 디자인",
      "⭐ 일러스트 디자인",
      "⭐ 영상 디자인",
    ],
    mainMenu: ["프로젝트", "연락처", "블로그", "소개"],
    flag: "🇰🇷 한국어",
  },
  Eng: {
    smallMenu: [
      "╰┈➤ Poster Design",
      "╰┈➤ Website Design",
      "╰┈➤ Illustrating",
      "╰┈➤ Video Design",
    ],
    mainMenu: ["PROJECTS", "CONTACTS", "BLOG", "ABOUT"],
    flag: "🇺🇸 English",
  },
  Ger: {
    smallMenu: [
      "🖱️ Plakatgestaltung",
      "🖱️ Webseiten Design",
      "🖱️ Illustrationen",
      "🖱️ Videodesign",
    ],
    mainMenu: ["PROJEKTS", "KONTAKT", "FOLGEN SIE UNS", "ÜBER"],
    flag: "🇩🇪 Deutsch",
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
/*
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
*/

// 화면 특정 위치로 스크롤 이동
const button1 = document.getElementById("btn-main-contact");
const section1 = document.getElementById("footer");

button1.addEventListener("click", () => {
  window.scrollBy({
    top: section1.getBoundingClientRect().top,
    behavior: "smooth",
  });
});

const webpj = document.getElementById("web-pj");
const projects_container = document.getElementById("projects-container");

webpj.addEventListener("click", () => {
  window.scrollBy({
    top: projects_container.getBoundingClientRect().top,
    behavior: "smooth",
  });
});


// 무한 슬라이드를 위한 자동 복제
window.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('autoSlider');
  const items = slider.querySelectorAll('.slider-item');
  const totalItems = items.length;

  for (let i = 0; i < totalItems; i++) {
    const clone = items[i].cloneNode(true);
    slider.appendChild(clone);
  }
});
// 슬라이드 자동 재생
let currentIndex = 0;

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("slider-item")) {
    document.getElementById("modal-img").src = e.target.src;
    document.getElementById("slider-modal").classList.remove("hidden");
  }
});

document.querySelector(".close-btn").addEventListener("click", () => {
  document.getElementById("slider-modal").classList.add("hidden");
});

