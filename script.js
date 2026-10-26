/* ============ 成长印记 · 登录与交互 ============ */

/**
 * 用户配置：key 为用户名，value 为密码的 SHA-256 哈希。
 * 新增用户方法见 README.md。
 * 当前用户：zjttym / YM@y700811m
 */
const USERS = {
  "zjttym": "ec046f51796619bef2f057b0d8709daaa2419943b0cccb4f708e7c9afce759ec"
};

const SESSION_KEY = "gj_auth";

const gate    = document.getElementById("login-gate");
const content = document.getElementById("content");
const form    = document.getElementById("login-form");
const userInput  = document.getElementById("login-user");
const passInput  = document.getElementById("login-pass");
const errorMsg   = document.getElementById("login-error");
const logoutBtn  = document.getElementById("logout-btn");

/** 计算字符串的 SHA-256 十六进制值 */
async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

function showContent() {
  gate.classList.add("hidden");
  content.classList.remove("hidden");
  window.scrollTo(0, 0);
}

function showGate() {
  content.classList.add("hidden");
  gate.classList.remove("hidden");
  sessionStorage.removeItem(SESSION_KEY);
  passInput.value = "";
}

async function handleLogin(e) {
  e.preventDefault();
  const user = userInput.value.trim();
  const pass = passInput.value;
  const expect = USERS[user];
  if (!expect) { errorMsg.classList.remove("hidden"); return; }
  const hash = await sha256(pass);
  if (hash === expect) {
    errorMsg.classList.add("hidden");
    sessionStorage.setItem(SESSION_KEY, "ok");
    showContent();
  } else {
    errorMsg.classList.remove("hidden");
    passInput.value = "";
    passInput.focus();
  }
}

// 事件绑定
form.addEventListener("submit", handleLogin);
logoutBtn.addEventListener("click", showGate);

// 已在本次会话登录过则直接进入
if (sessionStorage.getItem(SESSION_KEY) === "ok") {
  showContent();
}

// 滚动渐显动画
const observer = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      en.target.style.opacity = "1";
      en.target.style.transform = "translateY(0)";
      observer.unobserve(en.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".stage-card").forEach(card => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = "opacity 0.7s ease, transform 0.7s ease";
  observer.observe(card);
});
