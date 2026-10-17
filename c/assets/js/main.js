(() => {
  const form = document.getElementById("diagnose-form");
  const errorEl = document.getElementById("form-error");
  const resultWrap = document.getElementById("diagnose-result");
  const resultOk = document.getElementById("result-ok");
  const resultOut = document.getElementById("result-out");
  const sticky = document.querySelector(".sticky-cta");
  const diagnoseSection = document.getElementById("diagnose");

  document.querySelectorAll(".worry-card").forEach((card) => {
    card.addEventListener("click", () => {
      try {
        const key = "lpc_worry_click";
        const prev = JSON.parse(localStorage.getItem(key) || "[]");
        prev.push({ at: new Date().toISOString(), worry: card.textContent.trim() });
        localStorage.setItem(key, JSON.stringify(prev.slice(-50)));
      } catch (_) {}
    });
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    errorEl.hidden = true;

    const worries = [...form.querySelectorAll('input[name="worry"]:checked')].map(
      (el) => el.value
    );
    const count = form.querySelector('input[name="count"]:checked');
    const area = form.area.value;

    if (worries.length === 0) {
      errorEl.hidden = false;
      errorEl.textContent = "お悩みを1つ以上選択してください。";
      return;
    }
    if (!count) {
      errorEl.hidden = false;
      errorEl.textContent = "窓の数を選択してください。";
      return;
    }
    if (!area) {
      errorEl.hidden = false;
      errorEl.textContent = "お住まいの区市町村を選択してください。";
      return;
    }

    try {
      const key = "lpc_diagnose_log";
      const prev = JSON.parse(localStorage.getItem(key) || "[]");
      prev.push({
        at: new Date().toISOString(),
        worries,
        count: count.value,
        area,
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
      document.getElementById("result-heading").textContent =
        `${area}で、${worries.join("・")}のお悩みですね。`;
      document.getElementById("result-body").textContent =
        `${count.value}から始められます。先進的窓リノベ2026事業と東京都の制度が使える可能性があります。1窓からでもご相談ください。`;
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
