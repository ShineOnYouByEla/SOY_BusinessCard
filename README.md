# Shine On You – Digitale Visitenkarte

Digitale Visitenkarte von **Manuela Zimmert** (proWIN-Beratung, Peiting) im
Design der Hauptseite [shineonyou.de](https://shineonyou.de).
Reines HTML, CSS und JavaScript – kein Build-Schritt, keine externen Aufrufe
(DSGVO-freundlich).

## Funktionen

- **Kontaktdaten** auf einen Blick: Name, Mobil, Festnetz, E-Mail,
  WhatsApp-Kanal, Website und Region.
- **Ein-Klick ins Telefonbuch** über einen einzigen Button: die vCard ist auf
  allen Systemen dieselbe Datei. Nur der letzte Schritt heißt woanders anders –
  iPhone „Neuen Kontakt sichern", Android „Kontakte importieren", PC/Mac
  Doppelklick auf die `.vcf`. `js/card.js` blendet dazu den Hinweis zum
  erkannten Gerät ein.

Alle Buttons verlinken direkt auf `manuela-zimmert.vcf`, damit die Seite auch
ohne JavaScript vollständig funktioniert. Das Skript `js/card.js` verbessert
lediglich die Nutzung (Plattform-Hinweis, sauberer Blob-Download).

Die Seite ist bewusst **nicht für Suchmaschinen gelistet** (`noindex` +
`robots.txt`), da Besucher sie über einen aufgedruckten QR-Code aufrufen.

## Hosting

Die Seite wird über GitHub Pages unter der eigenen Domain
[qr.shineonyou.de](https://qr.shineonyou.de) veröffentlicht. Die Datei `CNAME`
im Projektwurzelverzeichnis konfiguriert diese Custom Domain – sie darf beim
Deploy nicht entfernt werden.

## Vorschau / lokal starten

```bash
python3 -m http.server 8000
# danach http://localhost:8000 öffnen
```

## Projektstruktur

```
.
├── index.html            # Visitenkarte
├── manuela-zimmert.vcf   # vCard (Kontaktdatei)
├── css/
│   ├── fonts.css         # lokale Schriften (Inter, Montserrat)
│   └── card.css          # Styles & Markenfarben
├── js/card.js            # Plattform-Erkennung & vCard-Download
└── assets/
    ├── fonts/            # woff2-Schriften
    └── img/              # Logos & Favicons
```

## Kontaktdaten anpassen

Die Kontaktdaten stehen an zwei Stellen und müssen bei Änderungen synchron
bleiben:

1. `manuela-zimmert.vcf` – die einzige Quelle für die vCard. `js/card.js` lädt
   diese Datei und reicht sie als Download weiter, pflegt den Inhalt also
   **nicht** zusätzlich im Skript.
2. `index.html` – die sichtbaren Kontaktzeilen und die strukturierten Daten.

---

„proWIN" ist eine Marke der proWIN International. Diese Seite ist ein
unabhängiges Angebot einer selbstständigen Vertriebspartnerin.
