(() => {
  const PROGRAMS = {
    solar: {
      label: "太陽光発電",
      national: null,
      tokyo: "家庭における太陽光発電導入促進事業",
      min: 20,
      max: 60,
    },
    battery: {
      label: "蓄電池",
      national: "DR家庭用蓄電池事業",
      tokyo: "家庭における蓄電池導入促進事業",
      min: 30,
      max: 100,
    },
    ecocute: {
      label: "エコキュート",
      national: "給湯省エネ2026事業",
      tokyo: "熱と電気の有効利用促進事業",
      min: 10,
      max: 20,
    },
    v2h: {
      label: "V2H",
      national: "V2H充放電設備の導入補助金（次世代自動車振興センター）",
      tokyo: "電気自動車等の普及促進事業",
      min: 20,
      max: 50,
    },
    window: {
      label: "内窓・断熱窓",
      national: "先進的窓リノベ2026事業",
      tokyo: "クール・ネット東京の対象制度（事業名は個別確認）",
      min: 5,
      max: 40,
    },
    door: {
      label: "玄関ドア",
      national: "先進的窓リノベ2026事業",
      tokyo: "クール・ネット東京の対象制度（事業名は個別確認）",
      min: 3,
      max: 20,
    },
  };

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

  function clearError() {
    errorEl.hidden = true;
    errorEl.textContent = "";
  }

  function getSelectedEquip() {
    return [...form.querySelectorAll('input[name="equip"]:checked')].map(
      (el) => el.value
    );
  }

  function renderPrograms(area, equipKeys) {
    const box = document.getElementById("result-programs");
    box.innerHTML = "";

    let min = 0;
    let max = 0;

    equipKeys.forEach((key) => {
      const p = PROGRAMS[key];
      if (!p) return;
      min += p.min;
      max += p.max;

      const item = document.createElement("div");
      item.className = "program-item";
      item.innerHTML = `
        <strong>${p.label}</strong>
        <div>・国の制度：${p.national || "—"}</div>
        <div>・東京都の制度：${p.tokyo}</div>
        <div>・${area}の制度：お住まいの区市町村の制度も、当社が個別にお調べします</div>
      `;
      box.appendChild(item);
    });

    document.getElementById("result-area").textContent = area;
    document.getElementById("result-min").textContent = String(min);
    document.getElementById("result-max").textContent = String(max);
  }

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    clearError();

    const area = form.area.value;
    const bill = form.querySelector('input[name="bill"]:checked');
    const age = form.querySelector('input[name="age"]:checked');
    const equip = getSelectedEquip();

    if (!area) {
      showError("お住まいの区市町村を選択してください。");
      return;
    }
    if (!bill) {
      showError("毎月の電気代を選択してください。");
      return;
    }
    if (!age) {
      showError("築年数を選択してください。");
      return;
    }
    if (equip.length === 0) {
      showError("気になる設備を1つ以上選択してください。");
      return;
    }

    // 設問4の選択をローカルに保存（次のLP判断材料）
    try {
      const payload = {
        at: new Date().toISOString(),
        area,
        bill: bill.value,
        age: age.value,
        equip,
      };
      const key = "lpa_diagnose_log";
      const prev = JSON.parse(localStorage.getItem(key) || "[]");
      prev.push(payload);
      localStorage.setItem(key, JSON.stringify(prev.slice(-50)));
    } catch (_) {
      /* localStorage 不可でも結果表示は続ける */
    }

    resultWrap.hidden = false;

    if (area === "other") {
      resultOk.hidden = true;
      resultOut.hidden = false;
    } else {
      resultOut.hidden = true;
      resultOk.hidden = false;
      renderPrograms(area, equip);
    }

    resultWrap.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // 追従CTA：診断セクションが見えているときは隠す
  if (sticky && diagnoseSection && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      ([entry]) => {
        sticky.classList.toggle("is-hidden", entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    io.observe(diagnoseSection);
  }

  // ダミー問い合わせフォーム
  const contactForm = document.getElementById("contact-dummy");
  const contactMsg = document.getElementById("contact-msg");
  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    contactMsg.hidden = false;
    contactMsg.textContent =
      "デモのため送信していません。本番では toukaiekoraifu.matsuda@gmail.com へ接続予定です。";
  });
})();
