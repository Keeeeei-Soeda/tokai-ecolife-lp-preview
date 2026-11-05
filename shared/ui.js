/*
 * LP-B 入替版の画面まわり（ヘッダーの切替・スマホメニュー）
 * 診断フォームの判定は main.js、計測は shared/track.js が担当
 */
(() => {
  const header = document.getElementById("site-header");
  const hero = document.querySelector(".hero");
  const menuBtn = document.getElementById("menu-btn");
  const gnav = document.getElementById("gnav");
  const sticky = document.querySelector(".sticky-cta");
  const diagnose = document.getElementById("diagnose");
  if (!header) return;

  // ヒーローを過ぎたらヘッダーを白背景に。追従ボタンはヒーローと診断中は隠す
  const onScroll = () => {
    const pastHero = hero ? window.scrollY > hero.offsetHeight * 0.65 : window.scrollY > 80;
    header.classList.toggle("is-solid", pastHero || gnav?.classList.contains("is-open"));
    if (sticky) {
      const box = diagnose?.getBoundingClientRect();
      const onDiagnose = box && box.top < window.innerHeight * 0.75 && box.bottom > 120;
      sticky.classList.toggle("is-hidden", !pastHero || onDiagnose);
    }
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
