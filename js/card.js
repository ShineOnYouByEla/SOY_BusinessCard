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
  "ADR;TYPE=WORK:;;Tannenstraße 7a;Peiting;;86971;Deutschland",
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
    match.style.background = "#0e3f46";
    cards.insertBefore(match, cards.firstChild);
  }
})();
