/* ============================================================
   Shine On You — Digitale Visitenkarte
   Kein Build-Schritt, keine externen Aufrufe (DSGVO-freundlich).
   Die Seite funktioniert vollständig auch ohne JavaScript:
   alle Buttons verlinken direkt auf die Datei manuela-zimmert.vcf.
   Dieses Skript ist reine Verbesserung (Jahr, Plattform-Erkennung,
   zuverlässiger vCard-Download).
   ============================================================ */

/* Jahr im Footer */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ===== vCard als Quelle (identisch zur Datei manuela-zimmert.vcf) ===== */
const VCARD = [
  "BEGIN:VCARD",
  "VERSION:3.0",
  "N:Zimmert;Manuela;;;",
  "FN:Manuela Zimmert",
  "NICKNAME:Ela",
  "ORG:Shine On You – proWIN Beratung",
  "TITLE:Unabhängige proWIN-Vertriebsberaterin",
  "TEL;TYPE=CELL,VOICE:+4915510279357",
  "EMAIL;TYPE=INTERNET,PREF:prowin.ela@web.de",
  "URL:https://shineonyou.de",
  "NOTE:Natürlich sauber. Natürlich du. – proWIN Beratung in Peiting & Umgebung.",
  "END:VCARD",
  "",
].join("\r\n");

const VCARD_FILE = "manuela-zimmert.vcf";

/* Plattform-Erkennung (nur für kleine UX-Verbesserungen, nicht sicherheitsrelevant) */
const ua = navigator.userAgent || "";
const isIOS =
  /iPad|iPhone|iPod/.test(ua) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const isAndroid = /Android/.test(ua);

/* ===== Zuverlässiger vCard-Download =====
   - iOS ignoriert das download-Attribut und öffnet die Datei inline
     (genau das wollen wir: die Kontakt-Vorschau erscheint). Standardverhalten
     des Links reicht hier völlig aus.
   - Auf Android/Desktop erzeugen wir einen Blob, damit der Dateiname stimmt
     und der Download unabhängig vom Server-MIME-Type funktioniert.
*/
function downloadVCard() {
  const blob = new Blob([VCARD], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Manuela-Zimmert.vcf";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

/* Alle Links, die auf die vCard zeigen, verbessern */
document.querySelectorAll('a[href$="' + VCARD_FILE + '"], a[href$=".vcf"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    // iOS: Standard-Navigation zur .vcf-Datei beibehalten (öffnet Kontaktkarte)
    if (isIOS) return;
    // Sonst: sauberen Blob-Download auslösen
    e.preventDefault();
    downloadVCard();
  });
});

/* ===== Parallax =====
   Elemente mit data-parallax="0.08" driften relativ zur Bildschirmmitte –
   der Effekt ist dadurch lokal begrenzt und funktioniert auf der ganzen Seite
   (nicht nur oben). Wert = Stärke. Respektiert prefers-reduced-motion, rAF. */
(function initParallax() {
  const els = Array.from(document.querySelectorAll("[data-parallax]"));
  if (!els.length) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let ticking = false;
  function update() {
    const mid = window.innerHeight / 2;
    for (const el of els) {
      const speed = parseFloat(el.dataset.parallax) || 0;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const shift = (mid - center) * speed;
      el.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
    }
    ticking = false;
  }
  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();
})();

/* ===== Sanftes Einblenden beim Scrollen =====
   Blendet Kontakt- und Speichern-Elemente ein, sobald sie sichtbar werden.
   Reduced-motion oder fehlender IntersectionObserver: kein Effekt. */
(function initReveal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!("IntersectionObserver" in window)) return;
  const targets = document.querySelectorAll(".contact-list li, .method, #speichern .section-sub");
  if (!targets.length) return;

  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  targets.forEach((el, i) => {
    el.classList.add("reveal");
    // leichte Staffelung innerhalb von Reihen (max. 3 Stufen)
    el.style.transitionDelay = (Math.min(i % 3, 2) * 80) + "ms";
    io.observe(el);
  });
})();

/* ===== Passende Plattform-Karte hervorheben & nach vorne holen ===== */
(function highlightPlatform() {
  const cards = document.querySelector(".method-cards");
  if (!cards) return;
  const list = Array.from(cards.children);
  let match = null;
  if (isIOS) match = list.find((c) => /iPhone|iOS/i.test(c.textContent));
  else if (isAndroid) match = list.find((c) => /Android/i.test(c.textContent));
  if (match) {
    match.style.borderColor = "rgba(233,182,144,.6)";
    match.style.background = "var(--card-hover-bg)";
    cards.insertBefore(match, cards.firstChild);
  }
})();
