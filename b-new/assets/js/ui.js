/*
 * LP-B 新規設置版の画面まわり（入替版の ui.js と同内容）（ヘッダーの切替・スマホメニュー）
 * 診断フォームの判定は main.js、計測は shared/track.js が担当
 */
(() => {
  const header = document.getElementById("site-header");
  const hero = document.querySelector(".hero");
  const menuBtn = document.getElementById("menu-btn");
  const gnav = document.getElementById("gnav");
  if (!header) return;

  // ヒーローを過ぎたらヘッダーを白背景に
  const onScroll = () => {
    const limit = hero ? hero.offsetHeight - header.offsetHeight - 40 : 40;
    header.classList.toggle("is-solid", window.scrollY > limit || gnav?.classList.contains("is-open"));
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // スマホメニュー
  const setMenu = (open) => {
    gnav.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.textContent = open ? "閉じる" : "メニュー";
    onScroll();
  };
  menuBtn?.addEventListener("click", () => setMenu(!gnav.classList.contains("is-open")));
  gnav?.addEventListener("click", (e) => {
    if (e.target.closest("a")) setMenu(false);
  });
})();
