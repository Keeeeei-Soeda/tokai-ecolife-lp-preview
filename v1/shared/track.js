/*
 * 計測の共通処理（全LP共通）
 * - window.dataLayer に push（GTM などの計測タグを入れればそのまま拾える）
 * - あわせてブラウザの localStorage にも直近200件を残す（プレビュー確認用。回答者の端末内のみ）
 * - data-track="イベント名" を付けた要素は、クリック時に自動で記録する
 *
 * イベント名の接頭辞：
 *   lpb_replace_ … LP-B 入替版
 *   lpb_new_     … LP-B 新規設置版
 *   lpc_         … 窓・玄関
 */
(() => {
  const LOG_KEY = "lp_event_log";

  function track(event, params) {
    const payload = Object.assign({ event, at: new Date().toISOString() }, params || {});
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(payload);
    } catch (_) {
      /* 計測に失敗してもページの動作は止めない */
    }
    try {
      const prev = JSON.parse(localStorage.getItem(LOG_KEY) || "[]");
      prev.push(payload);
      localStorage.setItem(LOG_KEY, JSON.stringify(prev.slice(-200)));
    } catch (_) {
      /* localStorage が使えない環境でも続行 */
    }
  }

  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-track]");
    if (!el) return;
    track(el.dataset.track, {
      label: el.dataset.trackLabel || el.textContent.trim().slice(0, 60),
      href: el.getAttribute("href") || undefined,
    });
  });

  window.lpTrack = track;
})();
