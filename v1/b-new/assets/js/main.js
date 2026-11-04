(() => {
  const form = document.getElementById("diagnose-form");
  const errorEl = document.getElementById("form-error");
  const resultWrap = document.getElementById("diagnose-result");
  const resultOk = document.getElementById("result-ok");
  const resultOut = document.getElementById("result-out");
  const sticky = document.querySelector(".sticky-cta");
  const diagnoseSection = document.getElementById("diagnose");

  function showError(message) {
    errorEl.hidden = false;
    errorEl.textContent = message;
  }

  // 設問3（屋根）からヘスタソーラーの可否を判定する
  const ROOF_MESSAGE = {
    瓦: "瓦屋根の場合、ヘスタソーラーは設置できません。壁・カーポートへの設置や、他メーカーのパネルでご提案します。",
    スレート: "スレート屋根は、ヘスタソーラーも候補になります。屋根の状態は現地調査で確認します。",
    金属: "金属屋根は、ヘスタソーラーも候補になります。屋根の状態は現地調査で確認します。",
    分からない: "屋根の種類は、写真や現地調査で確認します。分からなくても問題ありません。",
  };

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    errorEl.hidden = true;

    const area = form.area.value;
    const equip = form.querySelector('input[name="equip"]:checked');
    const roof = form.querySelector('input[name="roof"]:checked');
    const bill = form.querySelector('input[name="bill"]:checked');

    if (!area) {
      showError("お住まいの区市町村を選択してください。");
      return;
    }
    if (!equip) {
      showError("いまの設備を選択してください。");
      return;
    }
    if (!roof) {
      showError("屋根の種類を選択してください。");
      return;
    }
    if (!bill) {
      showError("毎月の電気代を選択してください。");
      return;
    }

    const hestaEligible =
      roof.value === "瓦" ? "no" : roof.value === "分からない" ? "unknown" : "yes";

    // 回答データの保存・計測（新規設置版は lpb_new_ 接頭辞）
    window.lpTrack?.("lpb_new_diagnose_submit", {
      area,
      equip: equip.value,
      roof: roof.value,
      bill: bill.value,
      hesta_eligible: hestaEligible,
    });

    resultWrap.hidden = false;
    if (area === "other") {
      resultOk.hidden = true;
      resultOut.hidden = false;
    } else {
      resultOut.hidden = true;
      resultOk.hidden = false;

      const solarOnly = equip.value === "太陽光のみあり";
      document.getElementById("result-heading").textContent = `${area}にお住まいの方へ`;
      document.getElementById("result-equip").textContent = solarOnly
        ? "太陽光を設置済みの方は、蓄電池だけを追加することもできます。"
        : "太陽光と蓄電池をあわせて、または片方から検討できます。";

      const roofEl = document.getElementById("result-roof");
      roofEl.hidden = solarOnly;
      roofEl.textContent = solarOnly ? "" : ROOF_MESSAGE[roof.value];

      document.getElementById("result-subsidy").textContent = solarOnly
        ? `蓄電池は、国（DR家庭用蓄電池事業）・東京都（クールネット東京）・${area}の制度が対象になる可能性があります。`
        : `国（DR家庭用蓄電池事業）・東京都（クールネット東京）・${area}の制度が対象になる可能性があります。`;
    }
    resultWrap.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  if (sticky && diagnoseSection && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      ([entry]) => sticky.classList.toggle("is-hidden", entry.isIntersecting),
      { threshold: 0.2 }
    );
    io.observe(diagnoseSection);
  }

  const contactForm = document.getElementById("contact-dummy");
  const contactMsg = document.getElementById("contact-msg");
  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    contactMsg.hidden = false;
    contactMsg.textContent =
      "デモのため送信していません。本番では toukaiekoraifu.matsuda@gmail.com へ接続予定です。";
  });
})();
