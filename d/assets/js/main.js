(() => {
  const contactForm = document.getElementById("contact-dummy");
  const contactMsg = document.getElementById("contact-msg");
  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    contactMsg.hidden = false;
    contactMsg.textContent =
      "デモのため送信していません。本番では toukaiekoraifu.matsuda@gmail.com へ接続予定です。";
  });
})();
