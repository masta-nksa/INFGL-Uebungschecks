---
lektion: 9
zielgruppe: sus
art: praxis
titel: "Mitprogrammieren: CSS-Design"
kurz: "Die Webseite aus Einheit 8 mit einem eigenen Stylesheet gestalten: Kopfbereich, Navigation, Inhalt, Tabelle und Galerie."
reihenfolge: 10
---

# Mitprogrammieren: CSS-Design

**Einheit 9 · Schritt für Schritt zum Mitprogrammieren**

<!--
  Grundlage: Folien «CSS» (HS 2025) und das gemeinsame style.css der Beispielseite.
  Setzt die Seiten aus Einheit 8 voraus (Tags header, nav, main, footer, Klassen aktiv/klein/zentriert,
  Tabelle id="cv"). Galerie-Bilder: 12 eigene Bilder 1.jpg bis 12.jpg.
-->

Sie gestalten die Webseite aus Einheit 8 mit **CSS** (Cascading Style Sheet). Das HTML
ändern Sie kaum noch, das Aussehen steht in einer eigenen Datei `style.css`. Sie
brauchen den Ordner `meinewebseite` mit `index.html`, `ich.html` und `kontakt.html`.

Arbeiten Sie so: eine Regel schreiben, speichern, im Browser mit **F5** neu laden und
das Ergebnis ansehen. Tippen Sie den Code selbst ab.

## Schritt 1: Entwicklertools nutzen {#devtools}

Öffnen Sie `index.html` im Browser und drücken Sie **F12** (oder Rechtsklick auf ein
Element → *Untersuchen*). Sie sehen links den HTML-Baum (DOM) und rechts die CSS-Regeln
des gewählten Elements.

- Entfernen Sie das Häkchen vor einer Eigenschaft: Das Ergebnis ändert sich sofort.
- Klicken Sie auf einen Wert und ändern Sie ihn.

Änderungen in den Entwicklertools gelten nur, bis Sie die Seite neu laden. Sie sind ein
Werkzeug zum Ausprobieren. Dauerhaft ändern Sie nur die Datei im Editor.

## Schritt 2: Stylesheet einbinden {#einbinden}

CSS lässt sich auf drei Arten einbauen:

| Art | Beispiel | Wirkung |
|---|---|---|
| im Element (inline) | `<p style="color:green;">` | nur dieses Element |
| im Kopf der Seite | `<style> p {color:green;} </style>` | die ganze Seite |
| externe Datei | `<link rel="stylesheet" href="./style.css">` | alle Seiten, die die Datei einbinden |

Wir arbeiten mit der externen Datei, weil dann **alle** Seiten gleich aussehen und
Änderungen nur an einem Ort nötig sind.

1. Legen Sie im Ordner `meinewebseite` die Datei `style.css` an.
2. Binden Sie sie im `<head>` **jeder** Seite ein:

```html
<link rel="stylesheet" href="./style.css">
```

3. Schreiben Sie in `style.css` die erste Regel und prüfen Sie, dass sich die Seite ändert:

```css
body {
  font-family: Arial, sans-serif;
}
```

Eine Regel besteht aus einem **Selektor** (`body`: wen formatiere ich?) und in
geschweiften Klammern aus **Eigenschaft: Wert;** (was ändere ich?).

## Schritt 3: Selektoren {#selektoren}

| Selektor | Schreibweise | Wen trifft er? |
|---|---|---|
| Tag (Element) | `p { … }`, `header { … }` | alle `<p>` bzw. der `<header>` |
| Klasse | `.klein { … }` | alle Elemente mit `class="klein"` |
| ID | `#cv { … }` | das **eine** Element mit `id="cv"` |
| Nachfahre | `header p { … }` | `<p>` **innerhalb** von `<header>` |
| Tag mit Klasse | `p.klein { … }` | nur `<p>` mit `class="klein"` |
| Gruppe | `h2, h3 { … }` | beide Elemente |

Eine Klasse darf auf mehreren Elementen stehen, eine ID nur einmal pro Seite.

**Wann nehme ich was?**

- **Tag**: Alle Elemente einer Art sollen gleich aussehen (alle Absätze, die Navigation, der Kopf).
- **Klasse**: Eine Gruppe von Elementen, die zusammengehören, aber nicht alle einer Art sind (zum Beispiel die kleinen Hinweistexte `.klein` oder der aktive Menüpunkt `.aktiv`).
- **ID**: Ein einzelnes, einmaliges Element (die Tabelle `#cv`, die Galerie `#album`).

In dieser Reihenfolge werden die Selektoren auch genauer: Eine ID schlägt eine Klasse,
eine Klasse schlägt einen Tag.

**Dreistufig:** Gilt für ein Element mehr als eine Regel, setzt sich die genauere
durch: Inline (`style="…"`) vor `<style>` im Kopf vor externer Datei. Bei gleicher
Stufe gewinnt die **spätere** Regel.

**Aufgabe:** Setzen Sie in `style.css` `p { color: green; }` und im `index.html` bei
einem Absatz `style="color:red;"`. Welche Farbe hat der Absatz? Und was passiert, wenn Sie
danach in `style.css` `p { color: blue; }` darunter schreiben?

## Schritt 4: Grundeinstellungen und Box-Modell {#box-modell}

Jedes Element ist eine Box: Inhalt, darum **padding** (Innenabstand), darum **border**
(Rahmen), darum **margin** (Aussenabstand). Browser setzen eigene Standardabstände.
Wir nullen sie zuerst und bestimmen die Abstände selbst. Ersetzen Sie die Regel
`body`:

```css
* {
  margin: 0;    /* Aussenabstand */
  padding: 0;   /* Innenabstand */
}

html, body {
  font: 100% Arial, sans-serif;
}
```

`*` trifft alle Elemente. Der Text klebt jetzt am Rand, das ändern wir gleich.

**Kontrolle:** Wählen Sie in den Entwicklertools ein Element. Unten rechts sehen Sie das
Box-Modell als farbige Rechtecke mit den Werten.

## Schritt 5: Kopfbereich (`header`) {#kopfbereich}

Hintergrundbild, Höhe und Schrift:

```css
header {
  background-image: url(./bilder/titel.jpg);
  background-size: cover;
  height: 250px;
}

header p {
  font-size: 2em;
  text-align: right;
  color: white;
  padding: 0.4em 0.4em 0 0;
}
```

- `background-size: cover` füllt die Fläche, das Bild wird zugeschnitten.
- `em` richtet sich nach der Schriftgrösse: `2em` ist doppelt so gross wie normal.
- `padding: oben rechts unten links` (im Uhrzeigersinn, mit oben beginnend).

**Aufgabe:** Ändern Sie `height`, `text-align` und `color`. Setzen Sie die Schrift in
Grossbuchstaben (`text-transform: uppercase;`) und geben Sie ihr einen Schatten
(`text-shadow: 1px 1px 3px black;`).

## Schritt 6: Farben {#farben}

Farben schreiben Sie als Name (`white`) oder als Hex-Code `#RRGGBB`: je zwei
Hexadezimalziffern für Rot, Grün und Blau, jeweils `00` bis `FF`.

| Code | Farbe |
|---|---|
| `#FF0000` | reines Rot |
| `#00FF00` | reines Grün |
| `#0000FF` | reines Blau |
| `#000000` / `#FFFFFF` | Schwarz / Weiss |
| `#808080` | mittleres Grau |

Wählen Sie mit einem Farbwähler (zum Beispiel im Browser: Entwicklertools → auf das
Farbquadrat neben einer Farbe klicken) einen Ton für Ihre Navigation und notieren Sie
den Hex-Code.

## Schritt 7: Navigation (`nav`) {#navigation}

Links haben vier Zustände:

| Zustand | Bedeutung |
|---|---|
| `a:link` | noch nicht besucht |
| `a:visited` | schon besucht |
| `a:hover` | Maus darüber |
| `a:active` | gerade angeklickt |

Die Reihenfolge `link`, `visited`, `hover`, `active` ist wichtig, sonst überschreiben
sich die Regeln gegenseitig. Setzen Sie die Farben schrittweise ein:

```css
nav {
  background-color: #B58729;
  padding: 0.5em 0 0.5em 1em;
}

nav a:link {
  color: #000000;
  text-decoration: none;
}

nav a:visited {
  color: #000000;
  text-decoration: none;
}

nav a:hover {
  background-color: #CEB98E;
}

nav a:active {
  background-color: #CEFF8E;
}

nav a.aktiv {
  font-weight: bold;      /* Klasse: die aktuelle Seite */
}
```

**Aufgabe:** Wählen Sie Ihre eigene Farbe. Machen Sie den Link beim Darüberfahren fett
(`font-weight: bold;`). Welche Wirkung hat `text-decoration: none;`?

## Schritt 8: Inhalt (`main`), Text und Fuss {#inhalt}

```css
main {
  padding: 2em;
}

main h2, main h3, main p, main ul, main ol {
  padding-bottom: 0.7em;
}

main ul, main ol {
  padding-left: 2em;
}

footer {
  background-color: #CEB98E;
  padding: 0.5em 2em;
  font-size: 0.8em;
}

p {
  line-height: 1.4;
}
```

**Klasse für Hervorhebungen:** Die Klasse `klein` steht seit Einheit 8 im HTML
(`<p class="klein">`), jetzt bekommt sie ihr Aussehen:

```css
p.klein {
  font-size: 0.8em;
  color: gray;
}
```

Weitere Textwerkzeuge: `font-family`, `font-style: italic`, `letter-spacing`
(Buchstabenabstand), `word-spacing` (Wortabstand), `line-height` (Zeilenhöhe).

**Zentrieren:** Das alte `<center>` gibt es nicht mehr, das Zentrieren macht CSS.
Ein Bild in der Mitte (im HTML steht `<p class="zentriert">` um das Bild):

```css
.zentriert {
  text-align: center;
}
```

Die Klasse ist so allgemein, dass Sie sie auch bei anderen Elementen verwenden können.

## Schritt 9: Tabelle und Formular {#tabelle}

Auf `ich.html` hat die Tabelle `id="cv"` und noch `border="1"`. Entfernen Sie das
Attribut `border` aus dem HTML und gestalten Sie die Tabelle mit CSS:

```css
#cv {
  border-collapse: collapse;   /* doppelte Rahmenlinien zusammenfassen */
}

#cv th, #cv td {
  text-align: left;
  padding: 0.4em 1em;
  border-bottom: 1px solid gray;
}

#cv th {
  font-size: 1.2em;
  background-color: #CEB98E;
}
```

**Aufgabe:** Geben Sie der Beschriftung (`caption`) eine Farbe. Zeigen Sie nur die
horizontalen Linien, nur die vertikalen oder den ganzen Rahmen
(`border: 1px solid gray;`). Auf `kontakt.html`: Geben Sie dem Absenden-Knopf mit
`input[type="submit"]` eine Hintergrundfarbe.

## Schritt 10: Galerie und Positionierung {#galerie}

Legen Sie `gallery.html` an (Kopie von `index.html`, Link in der Navigation ergänzen)
und setzen Sie in `<main>` eine Liste mit Ihren Bildern ein. Die Fotos `1.jpg` bis `12.jpg`
liegen im Startpaket aus Einheit 8 (Ordner `bilder/gallery`), Sie können auch eigene verwenden:

```html
<main>
  <h2>Fotos</h2>
  <div id="album">
    <ul>
      <li><img src="./bilder/gallery/1.jpg" alt="Foto 1"></li>
      <li><img src="./bilder/gallery/2.jpg" alt="Foto 2"></li>
      <li><img src="./bilder/gallery/3.jpg" alt="Foto 3"></li>
      <li><img src="./bilder/gallery/4.jpg" alt="Foto 4"></li>
    </ul>
  </div>
</main>
```

Ohne CSS stehen die Bilder untereinander. Mit **float** ordnen wir sie nebeneinander an:

```css
#album {
  display: inline-block;      /* so gross wie der Inhalt */
  border: 1px solid #aaa;
  width: 80%;
  padding: 5px;
}

#album ul {
  padding-left: 0;
  list-style-type: none;      /* keine Aufzählungspunkte */
}

#album li {
  float: left;                /* nebeneinander, bei Platzmangel umbrechen */
  padding: 5px 0 0 5px;
}

#album img {
  height: 150px;
}
```

**Hover-Effekt:** Das Bild wird vergrössert, wenn die Maus darüber fährt.

```css
#album img {
  transition: all 1s ease-in-out;
}

#album img:hover {
  transform: scale(2);
}
```

**Aufgabe:** Ändern Sie die Bildhöhe, die Breite von `#album` und die Vergrösserung.
Was passiert mit den Bildern, wenn Sie das Browserfenster schmaler ziehen?

**Zusatz:** Moderner als `float` ist **Flexbox**. Ersetzen Sie in `#album ul`
das `list-style-type` durch `display: flex; flex-wrap: wrap; gap: 5px;` und entfernen Sie
`float: left` bei `#album li`. Vergleichen Sie das Ergebnis.

## Schritt 11: Abschluss {#abschluss}

**Checkliste:**

- [ ] Alle Seiten binden `style.css` ein, es gibt keine Formatierung mehr im HTML (`border`, `bgcolor`, `<center>`)
- [ ] Kopfbereich mit Hintergrundbild, Navigation mit vier Link-Zuständen
- [ ] Tabelle, Galerie und mindestens eine eigene Klasse sind gestaltet
- [ ] Kommentare in `style.css` (`/* … */`) erklären die Abschnitte

**Tipp zum Debuggen:** Wirkt eine Regel nicht, prüfen Sie nacheinander: Ist
`style.css` eingebunden (Entwicklertools → Reiter *Network* oder *Quelltext*)? Stimmt der
Selektor (Punkt für Klasse, `#` für ID)? Fehlt ein Strichpunkt oder eine Klammer? Wird
die Regel von einer späteren überschrieben (durchgestrichen in den Entwicklertools)?

**Nachschlagen:** [SELFHTML (CSS)](https://wiki.selfhtml.org/wiki/CSS),
[w3schools.com](https://www.w3schools.com/css/), [W3C Style](https://www.w3.org/Style/).
