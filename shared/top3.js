/*
 * おすすめメーカー トップ3（LP-B 入替版・新規設置版で共通）
 *
 * 型番・写真・特徴文の差し替えは、このファイルのデータだけを編集すれば反映される。
 * HTML 側は <div data-top3></div> を置くだけ。
 *
 * ルール（修正指示書②）
 * - 6カードは同じサイズ・同じ情報量。特定カードだけ大きくしない
 * - badge は "NEW"（新商品の意味）のみ。「一押し」「No.1」などの順位表現は使わない
 * - 特徴文・補助金表示は確定事項のみ。未確定は【…】のプレースホルダーのまま
 * - image にはカタログ由来の画像パスを入れる。null の間はプレースホルダー枠を表示
 */
window.TOP3_MAKERS = {
  solar: {
    title: "太陽光",
    items: [
      {
        maker: "パナソニック",
        product: "【型番：受領待ち】",
        badge: null,
        feature: "【カタログから記載】",
        forWho: "【カタログから記載】",
        subsidy: null,
        image: null,
        imageLabel: "【画像：パナソニック 太陽光パネル（カタログ由来）】",
      },
      {
        maker: "カナディアンソーラー",
        product: "【型番：受領待ち】",
        badge: null,
        feature: "【カタログから記載】",
        forWho: "【カタログから記載】",
        subsidy: null,
        image: null,
        imageLabel: "【画像：カナディアンソーラー 太陽光パネル（カタログ由来）】",
      },
      {
        maker: "ヘスタソーラー",
        product: "【型番：受領待ち】",
        badge: "NEW",
        feature: "接着で設置。屋根に穴を開けず、壁やカーポートにも。※瓦屋根不可",
        forWho: "【カタログから記載】",
        subsidy: null,
        image: null,
        imageLabel: "【画像：ヘスタソーラー 製品写真（カタログ由来）】",
      },
    ],
  },
  battery: {
    title: "蓄電池",
    items: [
      {
        maker: "ニチコン",
        product: "【型番：受領待ち】",
        badge: null,
        feature: "【カタログから記載】",
        forWho: "【カタログから記載】",
        subsidy: null,
        image: null,
        imageLabel: "【画像：ニチコン 蓄電池（カタログ由来）】",
      },
      {
        maker: "テスラ",
        product: "パワーウォール3",
        badge: "NEW",
        feature: "2026年10月登場の新型。",
        forWho: "【カタログから記載】",
        // SII 登録状況は公開前に要確認（素材待ち #3）
        subsidy: "国・東京都の補助金対象（SII登録）",
        image: null,
        imageLabel: "【画像：パワーウォール3 製品写真（カタログ由来）】",
      },
      {
        maker: "オムロン",
        product: "【型番：受領待ち】",
        badge: null,
        feature: "【カタログから記載】",
        forWho: "【カタログから記載】",
        subsidy: null,
        image: null,
        imageLabel: "【画像：オムロン 蓄電池（カタログ由来）】",
      },
    ],
  },
};

(() => {
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  function card(item) {
    const media = item.image
      ? `<img class="top3-card__img" src="${esc(item.image)}" alt="${esc(item.maker)} ${esc(item.product)}" loading="lazy">`
      : `<div class="ph-img top3-card__img" role="img" aria-label="${esc(item.imageLabel)}">${esc(item.imageLabel)}</div>`;
    return `
      <article class="top3-card">
        <div class="top3-card__media">
          ${media}
          ${item.badge ? `<span class="top3-card__badge">${esc(item.badge)}</span>` : ""}
        </div>
        <p class="top3-card__maker">${esc(item.maker)}</p>
        <p class="top3-card__product">${esc(item.product)}</p>
        <p class="top3-card__feature">${esc(item.feature)}</p>
        <p class="top3-card__who"><span>こんな方に</span>${esc(item.forWho)}</p>
        ${item.subsidy ? `<p class="top3-card__subsidy">${esc(item.subsidy)}</p>` : ""}
      </article>`;
  }

  function render(root) {
    const data = window.TOP3_MAKERS;
    root.innerHTML = ["solar", "battery"]
      .map((key) => {
        const block = data[key];
        return `
          <div class="top3-block">
            <h3 class="top3-block__title">${esc(block.title)}</h3>
            <div class="top3-grid">${block.items.map(card).join("")}</div>
          </div>`;
      })
      .join("");
  }

  document.querySelectorAll("[data-top3]").forEach(render);
})();
