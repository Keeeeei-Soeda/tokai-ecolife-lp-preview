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

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    errorEl.hidden = true;

    const year = form.querySelector('input[name="year"]:checked');
    const known = form.querySelector('input[name="known"]:checked');
    const area = form.area.value;
    const symptoms = [...form.querySelectorAll('input[name="symptom"]:checked')].map(
      (el) => el.value
    );

    if (!year) {
      showError("設置時期を選択してください。");
      return;
    }
    if (!known) {
      showError("メーカーと容量が分かるか、選択してください。");
      return;
    }
    if (!area) {
      showError("お住まいの区市町村を選択してください。");
      return;
    }
    if (symptoms.length === 0) {
      showError("気になっている症状を1つ以上選択してください。");
      return;
    }

    try {
      const key = "lpb_diagnose_log";
      const prev = JSON.parse(localStorage.getItem(key) || "[]");
      prev.push({
        at: new Date().toISOString(),
        year: year.value,
        known: known.value,
        maker: form.maker.value,
        area,
        symptoms,
      });
      localStorage.setItem(key, JSON.stringify(prev.slice(-50)));
    } catch (_) {}

    resultWrap.hidden = false;
    if (area === "other") {
      resultOk.hidden = true;
      resultOut.hidden = false;
    } else {
      resultOut.hidden = true;
      resultOk.hidden = false;
      const recent = year.value === "2021年以降";
      document.getElementById("result-heading").textContent = recent
        ? `${area}にお住まいの方へ`
        : `ご設置の時期から判断すると、入替を検討する時期に入っています。`;
      document.getElementById("result-body").textContent = recent
        ? `${area}では、東京都（クールネット東京）＋国（DR家庭用蓄電池事業）の制度が使える可能性があります。保証や症状の状況も含めて、今すぐ替える必要があるかは個別に確認します。無理な買い替えはおすすめしません。`
        : `${area}では、東京都（クールネット東京）＋国（DR家庭用蓄電池事業）の制度が使える可能性があります。`;
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
