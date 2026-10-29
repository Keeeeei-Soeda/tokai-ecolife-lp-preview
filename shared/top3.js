/*
 * 人気順位TOP3（LP-B 入替版・新規設置版で共通）
 *
 * 型番・写真・特徴文の差し替えは、このファイルのデータだけを編集すれば反映される。
 * items の並び順がそのまま人気順位（1位・2位・3位）になる。
 *
 * HTML 側の置き方
 *   <div data-top3></div>                 … 太陽光・蓄電池の両方を表示（従来どおり）
 *   <div data-top3="battery"></div>       … 蓄電池だけ
 *   <div data-top3="solar"></div>         … 太陽光だけ
 *   data-top3-heading="none" を付けると、ブロック見出し（「太陽光」等）を出さない
 *
 * ルール
 * - 6カードは同じサイズ・同じ情報量。特定カードだけ大きくしない
 * - 順位は営業打合せ（2026-10）で決定した人気順。表記は「人気順位TOP3」で統一
 * - badge は "NEW"（新商品の意味）のみ
 * - 特徴文・補助金表示はメーカー公式情報などで確認できた事項のみ。未確定は【…】のまま
 * - image にはカタログ由来の画像パスを入れる。null の間はプレースホルダー枠を表示
 * - imageFit: "contain" … 白背景の製品写真や文字入り画像を、切り抜かずに全体表示する
 * - imageIsStock: true … フリー素材の仮画像（alt に「イメージ」と付ける）
 */
window.TOP3_MAKERS = {
  solar: {
    title: "太陽光",
    items: [
      {
        maker: "HESTAソーラー",
        product: "HESTAソーラー（1枚440W）",
        badge: "NEW",
        // 出典：https://hestasolar.com/
        feature: "貼り付けて設置する方式で、基本的に屋根へ穴を開けません。出力保証25年。※瓦屋根不可",
        specs: [],
        forWho: "【カタログから記載】",
        subsidy: null,
        url: "https://hestasolar.com/",
        // 製品カタログ写真は許諾前のため、フリー素材のイメージ写真を仮置き
        // 製品写真：東海エコライフより受領（2026-10-30）
        image: "../shared/img/products/hesta-roof.jpg",
        imageFit: "cover",
        imageLabel: "HESTAソーラーの設置例",
      },
      {
        maker: "カナディアンソーラー",
        product: "TOPHiKu6シリーズ（住宅用）",
        badge: null,
        // 出典：https://csisolar.co.jp/tax_products/module/
        feature: "出力310〜465Wの4機種。モジュール変換効率は最大23.3%（CS6.2-48TM-465）。",
        specs: [],
        forWho: "【カタログから記載】",
        subsidy: null,
        url: "https://csisolar.co.jp/tax_products/module/",
        // 製品写真：東海エコライフより受領（2026-10-30）。CS6.2-48TM-465 のモジュール画像
        image: "../shared/img/products/canadian-tophiku6-465w.jpg",
        imageFit: "contain",
        imageLabel: "TOPHiKu6 モジュール",
      },
      {
        maker: "パナソニック",
        // 型番・特徴はWebカタログ（VBCT1B211 p.9 / VBCT1M256 p.28）から記載予定
        product: "【型番：カタログから記載】",
        badge: null,
        feature: "【カタログから記載】",
        specs: [],
        forWho: "【カタログから記載】",
        subsidy: null,
        url: "https://esctlg.panasonic.biz/iportal/oc.do?c=VBCT1B211&p=9&v=PEWJ0001&d=activeOut",
        image: "../shared/img/stock/solar_panel.jpg",
        imageLabel: "太陽光パネルのイメージ",
        imageIsStock: true,
      },
    ],
  },
  battery: {
    title: "蓄電池",
    items: [
      {
        maker: "テスラ",
        product: "Powerwall 3",
        badge: "NEW",
        // 出典：https://www.tesla.com/ja_jp/powerwall ／ 容量・出力・保証は日本発売時の報道（Impress Watch 2026-08）
        feature: "容量13.5kWh・定格出力9.69kW。パワコン内蔵のオールインワン型で、停電時も家全体に給電します。",
        specs: [],
        forWho: "【カタログから記載】",
        subsidy: "国・東京都の補助金対象（SII登録済み）",
        url: "https://www.tesla.com/ja_jp/powerwall",
        // 製品写真：東海エコライフより受領（2026-10-30、メーカー公式サイト掲載画像）
        image: "../shared/img/products/tesla-powerwall3.jpg",
        imageFit: "cover",
        imageLabel: "Powerwall 3 の設置イメージ",
      },
      {
        maker: "ニチコン",
        product: "ESS-T5／ESS-T6シリーズ",
        badge: null,
        // 出典：営業打合せでの指示（よく出ている4構成）。https://www.nichicon.co.jp/products/ess/t5t6system/
        feature: "7.4〜19.9kWhの4構成から選べます。19.9kWhは家庭用として業界最大級。",
        specs: [
          "ES-CSM｜7.4kWh｜屋外",
          "ES-DYL｜9.9kWh｜屋内外",
          "ES-CSM＋ES-CSX｜14.9kWh｜屋外",
          "ES-DYL＋ES-DYL｜19.9kWh｜屋内外",
        ],
        forWho: "【カタログから記載】",
        subsidy: null,
        url: "https://www.nichicon.co.jp/products/ess/t5t6system/",
        // 製品写真：東海エコライフより受領（2026-10-30、メーカー公式サイト掲載画像）
        image: "../shared/img/products/nichicon-ess.jpg",
        imageFit: "contain",
        imageLabel: "ESS-T5／T6シリーズ 蓄電池ユニット",
      },
      {
        maker: "オムロン・長州産業",
        product: "マルチ蓄電プラットフォーム KPBP-Aシリーズ",
        badge: null,
        // 出典：https://socialsolution.omron.com/jp/ja/products_service/energy/product/bt/kpbp.html
        feature: "6.3〜16.4kWhから容量を選べます。屋内・屋外どちらにも設置でき、全負荷型・特定負荷型に対応。",
        specs: [],
        forWho: "【カタログから記載】",
        subsidy: null,
        url: "https://socialsolution.omron.com/jp/ja/products_service/energy/product/bt/kpbp.html",
        // 製品写真：東海エコライフより受領（2026-10-30、メーカー公式サイト掲載画像）
        image: "../shared/img/products/omron-kpbp-9kwh.jpg",
        imageFit: "contain",
        imageLabel: "KPBP-Aシリーズ 9.7kWh（KP-BU97C-A）",
      },
    ],
  },
};

(() => {
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  function card(item, index) {
    const fitClass = item.imageFit === "contain" ? " top3-card__img--contain" : "";
    const alt = item.imageIsStock ? `${item.maker} ${item.product}（イメージ）` : `${item.maker} ${item.imageLabel || item.product}`;
    const media = item.image
      ? `<img class="top3-card__img${fitClass}" src="${esc(item.image)}" alt="${esc(alt)}" loading="lazy">`
      : `<div class="ph-img top3-card__img" role="img" aria-label="${esc(item.imageLabel)}">${esc(item.imageLabel)}</div>`;
    const specs = item.specs && item.specs.length
      ? `<ul class="top3-card__specs">${item.specs.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>`
      : "";
    return `
      <article class="top3-card">
        <div class="top3-card__media">
          ${media}
          ${item.badge ? `<span class="top3-card__badge">${esc(item.badge)}</span>` : ""}
        </div>
        <p class="top3-card__rank">人気${index + 1}位</p>
        <p class="top3-card__maker">${esc(item.maker)}</p>
        <p class="top3-card__product">${esc(item.product)}</p>
        <p class="top3-card__feature">${esc(item.feature)}</p>
        ${specs}
        <p class="top3-card__who"><span>こんな方に</span>${esc(item.forWho)}</p>
        ${item.subsidy ? `<p class="top3-card__subsidy">${esc(item.subsidy)}</p>` : ""}
        ${item.url ? `<a class="top3-card__link" href="${esc(item.url)}" target="_blank" rel="noopener">メーカー公式の製品情報</a>` : ""}
      </article>`;
  }

  function render(root) {
    const data = window.TOP3_MAKERS;
    const only = root.dataset.top3;
    const keys = only === "solar" || only === "battery" ? [only] : ["solar", "battery"];
    const showHeading = root.dataset.top3Heading !== "none";
    root.innerHTML = keys
      .map((key) => {
        const block = data[key];
        return `
          <div class="top3-block">
            ${showHeading ? `<h3 class="top3-block__title">${esc(block.title)}</h3>` : ""}
            <div class="top3-grid">${block.items.map(card).join("")}</div>
          </div>`;
      })
      .join("");
  }

  document.querySelectorAll("[data-top3]").forEach(render);
})();
