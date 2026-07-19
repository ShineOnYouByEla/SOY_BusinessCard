# Shine On You – Digitale Visitenkarte

Digitale Visitenkarte von **Manuela Zimmert** (proWIN-Beratung, Peiting) im
Design der Hauptseite [shineonyou.de](https://shineonyou.de).
Reines HTML, CSS und JavaScript – kein Build-Schritt, keine externen Aufrufe
(DSGVO-freundlich).

## Funktionen

- **Kontaktdaten** auf einen Blick: Name, Telefon, E-Mail, WhatsApp-Kanal,
  Website und Region.
- **Ein-Klick ins Telefonbuch** über drei Wege:
  - **iOS / iPhone** – die vCard öffnet sich als Kontaktkarte zum Sichern.
  - **Android** – die vCard wird geladen und in die Kontakte importiert.
  - **vCard (.vcf)** – universelle Kontaktdatei, funktioniert auch am
    PC, Mac und in Outlook.

Alle Buttons verlinken direkt auf `manuela-zimmert.vcf`, damit die Seite auch
ohne JavaScript vollständig funktioniert. Das Skript `js/card.js` verbessert
lediglich die Nutzung (Plattform-Erkennung, sauberer Blob-Download).

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

Die Daten stehen an drei Stellen und müssen bei Änderungen synchron bleiben:

1. `manuela-zimmert.vcf` – die herunterladbare vCard.
2. `js/card.js` – die Konstante `VCARD` (Quelle für den Blob-Download).
3. `index.html` – die sichtbaren Kontaktzeilen und die strukturierten Daten.

---

„proWIN" ist eine Marke der proWIN International. Diese Seite ist ein
unabhängiges Angebot einer selbstständigen Vertriebspartnerin.
