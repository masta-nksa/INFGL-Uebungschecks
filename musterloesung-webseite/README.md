# Musterlösung Webseite (Einheit 8 und 9)

Fertige Webseite «Max Muster» zu den Seiten `lektionen/w8-html-webseite.md` und
`lektionen/w9-css-webseite.md`: `index.html`, `ich.html`, `gallery.html`, `kontakt.html`,
`style.css` und `bilder/`. Zum Ansehen `index.html` im Browser öffnen.

**Zweites Design zum Zeigen:** `style-modern.css` ist ein modernes, bewusst komplexeres
Stylesheet für **dieselben HTML-Dateien**. Zum Umschalten in jeder HTML-Datei die Zeile mit
`style.css` auskommentieren und die Zeile mit `style-modern.css` aktivieren (steht schon als
Kommentar im `<head>`). Am HTML ändert sich nichts, so zeigt sich, dass Inhalt und Design getrennt sind.
`style.css` bleibt bewusst einfach und vermittelt die Basiskonzepte.

**Drucker und Handy (nur zum Zeigen):** `print.css` (eingebunden mit `media="print"`, wirkt in der
Druckvorschau, Strg+P) und `mobile.css` (`media="(max-width: 600px)"`, wirkt bei schmalem Fenster) stehen
als zusätzliche `<link>`-Zeilen im `<head>` und funktionieren mit beiden Hauptdesigns. Sie zeigen, dass
dasselbe HTML je nach Ausgabegerät anders aussehen kann.

**Umschalter zum Zeigen:** `umschalter.js` blendet unten rechts eine Leiste ein (Design: Einfach/Modern,
Ausgabe: Bildschirm/Handy/Druck) und tauscht live die Stylesheets, ohne das HTML zu ändern. Handy und
Druck werden dabei mit schmaler Seite bzw. A4-Breite nachgestellt. Beim echten Drucken (Strg+P) ist die Leiste ausgeblendet.

Von der Website nicht verlinkt (nur für die Lehrperson). Die Dateien werden von GitHub Pages
trotzdem ausgeliefert und sind unter `<baseurl>/musterloesung-webseite/index.html` erreichbar,
wer die Adresse kennt. Soll das nicht sein, den Ordner in `_config.yml` unter `exclude:` eintragen.
Das Favicon aus Einheit 8 fehlt hier bewusst (eigene Übung).
