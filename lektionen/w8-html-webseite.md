---
lektion: 8
zielgruppe: sus
art: praxis
titel: "Mitprogrammieren: HTML-Webseite"
kurz: "Eine kleine Webseite mit drei Seiten (Startseite, Über mich, Kontakt) Schritt für Schritt aufbauen."
reihenfolge: 10
---

# Mitprogrammieren: HTML-Webseite

**Einheit 8 · Schritt für Schritt zum Mitprogrammieren**

<!--
  Grundlage: Folien «HTML» (HS 2026) und die gemeinsam aufgebaute Beispielseite
  (header / nav / main). Die Seite ist «Max Muster», damit jede Person
  ihre eigenen Angaben einsetzt. Das Design (CSS) folgt in Einheit 9.
  Firefox-Menü «Webseiten-Stil > Kein Stil»: Quelle schieb.de (2008), vor dem Einsatz
  in der Vorlesung kurz ausprobieren.
-->

Sie bauen in dieser Einheit eine kleine Webseite über sich selbst. Zuerst gibt es
nur **Inhalt und Struktur** (HTML). Das Aussehen kommt in Einheit 9 dazu (CSS). Die
Seite sieht deshalb am Ende noch schlicht aus, das ist Absicht.

Am Schluss haben Sie einen Ordner `meinewebseite` mit drei Seiten:

```
meinewebseite/
├── index.html      Startseite
├── ich.html        Lebenslauf (mit Tabelle)
├── kontakt.html    Kontakt (mit Formular)
└── bilder/         Ihre Bilder
```

Tippen Sie den Code selbst ab, statt ihn zu kopieren. Sie lernen die Tags dabei viel
schneller. Speichern Sie nach jedem Schritt und laden Sie die Seite im Browser neu
(Taste **F5**).

**Was Sie brauchen:** einen Code-Editor ([Visual Studio Code](https://code.visualstudio.com)
oder [Notepad++](https://notepad-plus-plus.org/downloads)), einen Browser und ein bis
zwei eigene Bilder (frei verwendbare Bilder gibt es zum Beispiel auf
[pixabay.com](https://pixabay.com)).

## Schritt 1: Inhalt und Design trennen {#struktur-design}

Öffnen Sie die Webseite [www.fhnw.ch](https://www.fhnw.ch) und schalten Sie das
Design aus:

- **Firefox:** Menüleiste mit der Taste **Alt** einblenden, dann
  *Ansicht → Webseiten-Stil → Kein Stil*.
- **Chrome/Edge:** Es gibt keinen solchen Menüpunkt. Öffnen Sie mit **F12** die
  Entwicklertools und schalten Sie im Reiter *Elements* bzw. *Styles* die Regeln aus
  (Häkchen entfernen) oder arbeiten Sie in Firefox.

**Beobachtungsauftrag:** Was ist nach dem Ausschalten noch da, was ist weg? Wo steht
die Navigation, wie sehen Überschriften, Listen und Links aus?

Sie sehen: Der **Inhalt** (Texte, Überschriften, Listen, Links, Bilder) und seine
**Struktur** stehen in HTML. Farben, Schriften, Abstände und die Anordnung stehen
getrennt davon in CSS. Diese Trennung hat Vorteile: Eine Änderung der Farbe betrifft
nur eine Datei, und dieselbe Seite lässt sich für Handy und Bildschirm anders
darstellen.

## Schritt 2: Ordner und Datei anlegen {#vorbereitung}

1. Legen Sie einen Ordner `meinewebseite` an und darin einen Unterordner `bilder`.
2. Laden Sie das [Startpaket mit Bildern]({{ "/assets/webseite-startpaket.zip" | relative_url }}) herunter (Titelbild `titel.jpg` und zwölf Fotos), entpacken Sie es und kopieren Sie den Inhalt in `bilder`. Sie dürfen auch eigene Bilder verwenden.
3. Öffnen Sie den Editor, legen Sie eine neue Datei an und speichern Sie sie als
   `index.html` im Ordner `meinewebseite` (Zeichensatz **UTF-8**).

**Stolperstein:** Windows blendet Dateiendungen oft aus. Dann entsteht schnell
`index.html.txt`. Aktivieren Sie im Explorer *Ansicht → Einblenden → Dateinamenerweiterungen*.
Dateinamen schreiben Sie klein, ohne Leerzeichen und ohne Umlaute.

## Schritt 3: Das Grundgerüst {#grundgeruest}

Jede HTML-Seite besteht aus **Tags** (`<h1>`), meist mit **End-Tag** (`</h1>`) und dem
Text dazwischen. Tippen Sie das Grundgerüst ein:

```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <title>Webseite von Max Muster</title>
  </head>
  <body>
    <h1>Willkommen auf meiner Webseite</h1>
  </body>
</html>
```

Öffnen Sie `index.html` per Doppelklick im Browser.

| Teil | Aufgabe |
|---|---|
| `<!DOCTYPE html>` | sagt dem Browser, dass es HTML ist |
| `<html>` | umschliesst die ganze Seite |
| `<head>` | Angaben **über** die Seite (Titel, Zeichensatz, später das Stylesheet), nicht sichtbar |
| `<title>` | erscheint im Browser-Tab |
| `<body>` | der sichtbare Inhalt |

**Kontrolle:** Wo sehen Sie den Text aus `<title>`, wo den aus `<h1>`?

### Die Seite gliedern: Kopf, Navigation, Inhalt

Eine Seite wird in Bereiche gegliedert. HTML5 hat dafür eigene Tags, die schon im
Namen sagen, was sie sind:

| Tag | Bereich |
|---|---|
| `<header>` | Kopfbereich mit Titel oder Spruch |
| `<nav>` | Navigation (Links zu den Seiten) |
| `<main>` | der eigentliche Inhalt der Seite (pro Seite einmal) |
| `<footer>` | Fussbereich (zum Beispiel Copyright) |

Ersetzen Sie den Inhalt von `<body>`:

```html
<body>
  <header>
    <p>Analysieren um zu agieren</p>
  </header>
  <nav>
    <a href="./index.html" class="aktiv">Startseite</a> |
    <a href="./ich.html">Lebenslauf</a> |
    <a href="./kontakt.html">Kontakt</a>
  </nav>
  <main>
    <h2>Willkommen auf der Webseite von Max Muster</h2>
  </main>
  <footer>
    <p>&copy; 2026 Max Muster</p>
  </footer>
</body>
```

Setzen Sie als Spruch im Kopfbereich einen eigenen Satz ein. Die Links führen noch ins
Leere, weil `ich.html` und `kontakt.html` noch nicht existieren.

### Tags, Klassen und IDs

Im Code oben steht schon alles, womit CSS später einzelne Teile der Seite anspricht:

| Was | Im HTML | Beispiel | Verwendung |
|---|---|---|---|
| **Tag** (Element) | der Tag selbst | `<header>`, `<p>`, `<table>` | alle Elemente dieser Art |
| **Klasse** | `class="name"` | `class="aktiv"` | beliebig viele Elemente, ein Element darf mehrere Klassen haben |
| **ID** | `id="name"` | `id="cv"` (kommt in Schritt 6) | genau **ein** Element pro Seite |

Merken Sie sich die drei Begriffe: In Einheit 9 sprechen wir sie im CSS gezielt an.
Die Namen vergeben Sie selbst (klein, ohne Leerzeichen und Umlaute).

**Häufige Fehler:**

- Die Seite zeigt den Code statt der Darstellung: Die Datei heisst `.txt` statt `.html`.
- Umlaute sind kaputt: Die Zeile `<meta charset="utf-8">` fehlt oder die Datei ist nicht als UTF-8 gespeichert.
- Alles ab einer Stelle ist fett oder gross: Ein End-Tag fehlt.

## Schritt 4: Text und Listen {#text-listen}

Ergänzen Sie im Bereich `<main>`:

```html
<main>
  <h2>Willkommen auf der Webseite von Max Muster</h2>
  <p>Diese Webseite gliedert sich in Kopf, Navigation, Inhalt und Fuss.</p>
  <h3>Aufbau</h3>
  <ul>
    <li>Kopfbereich</li>
    <li>Navigationsbereich</li>
    <li>Inhaltsbereich</li>
  </ul>
  <h3>So gehe ich vor</h3>
  <ol>
    <li>Seite planen</li>
    <li>HTML schreiben</li>
    <li>Design mit CSS</li>
  </ol>
  <hr>
  <p>Max Muster<br>Musterstrasse 1<br>5000 Aarau</p>
  <p class="klein">Stand: November 2026</p>
</main>
```

| Tag | Bedeutung |
|---|---|
| `<h1>` bis `<h6>` | Überschriften, `<h1>` am wichtigsten |
| `<p>` | Textabsatz |
| `<br>` | Zeilenumbruch (steht allein, hat kein End-Tag) |
| `<hr>` | Trennlinie |
| `class="klein"` | gibt dem Absatz eine Klasse, Gestaltung folgt in Einheit 9 |
| `<ul>` / `<ol>` | Liste mit Punkten / nummerierte Liste, Einträge mit `<li>` |

**Aufgabe:** Probieren Sie bei der nummerierten Liste `<ol type="A">` und
`<ol start="7">`. Was ändert sich?

**Umlaute und Sonderzeichen:** Mit `charset="utf-8"` dürfen Sie ä, ö, ü und € direkt
schreiben. Fehlt die Zeichensatz-Angabe, helfen Schlüsselwörter wie `&auml;`, `&ouml;`,
`&uuml;`, `&szlig;`, `&euro;` und `&copy;`.

## Schritt 5: Links und Bilder {#links-bilder}

**Link:** `<a href="Adresse">Text, der angeklickt wird</a>`

```html
<p><a href="./ich.html">Mehr über mich</a></p>
<p><a href="https://www.fhnw.ch" target="_blank">FHNW (öffnet in neuem Tab)</a></p>
<p><a href="mailto:max.muster@example.ch">E-Mail an mich</a></p>
```

- **Relative Adresse** (`./ich.html`): Pfad von der aktuellen Datei aus, für Seiten und Bilder der eigenen Webseite.
- **Absolute Adresse** (`https://…`): vollständige Adresse im Web, für fremde Seiten.

**Bild:** `<img src="Pfad" alt="Beschreibung">`

```html
<p class="zentriert">
  <img src="./bilder/titel.jpg" width="300" alt="Blick auf die Berge">
</p>
```

`alt` ist der Ersatztext, wenn das Bild fehlt, und wird blinden Personen vorgelesen.
`width` legt die Breite in Pixel fest. Typische Formate: `.jpg`, `.png`, `.gif`, `.svg`.

**Aufgabe:** Fügen Sie im Inhaltsbereich Ihr Bild ein und einen Link, der **auf das Bild**
klickbar ist (`<a>` um `<img>`). Das Bild zeigt nichts? Prüfen Sie Pfad und
Schreibweise (Gross-/Kleinschreibung zählt!).

## Schritt 6: Zweite Seite mit Tabelle {#tabellen}

Legen Sie `ich.html` an. Kopieren Sie dazu `index.html`, speichern Sie sie unter dem
neuen Namen und ersetzen Sie nur den Inhalt von `<main>`. Setzen Sie die Klasse `aktiv` jetzt beim Link «Lebenslauf» statt bei der Startseite. Kopf, Navigation und Fuss
bleiben gleich.

```html
<main>
  <h2>Lebenslauf</h2>
  <table id="cv" border="1">
    <caption>Meine Stationen</caption>
    <tr>
      <th>Bereich</th>
      <th>Zeitraum</th>
      <th>Station</th>
    </tr>
    <tr>
      <th rowspan="3">Ausbildung</th>
      <td>2013–2016</td>
      <td>Sekundarschule, Aarau</td>
    </tr>
    <tr>
      <td>2016–2020</td>
      <td>Kantonsschule Aarau, Matura</td>
    </tr>
    <tr>
      <td>seit 2026</td>
      <td>FHNW, Studium Wirtschaftsinformatik</td>
    </tr>
    <tr>
      <th rowspan="2">Berufserfahrung</th>
      <td>2021</td>
      <td>Praktikum IT-Support, Muster AG, Olten</td>
    </tr>
    <tr>
      <td>2022–2025</td>
      <td>Nebenjob Kundenberatung, Beispiel Elektro, Aarau</td>
    </tr>
    <tr>
      <th>Sprachen</th>
      <td colspan="2">Deutsch (Muttersprache), Englisch (C1), Französisch (B1)</td>
    </tr>
  </table>
</main>
```

| Tag | Bedeutung |
|---|---|
| `<table>` | die ganze Tabelle |
| `<tr>` | eine Zeile |
| `<th>` / `<td>` | Kopfzelle / normale Zelle |
| `<caption>` | Beschriftung |
| `colspan="2"` / `rowspan="2"` | Zelle über 2 Spalten / 2 Zeilen verbinden |

`border="1"` zeigt den Rahmen nur zum Testen. Den Rahmen gestalten wir später mit CSS.

Im Lebenslauf sehen Sie beide Arten, Zellen zu verbinden: Die Zelle «Ausbildung» geht mit
`rowspan="3"` über drei **Zeilen**, die Zelle mit den Sprachen mit `colspan="2"` über zwei **Spalten**.

**Aufgabe:** Ersetzen Sie die Angaben im Lebenslauf durch Ihre eigenen und fügen Sie eine weitere
Station hinzu. Passen Sie dabei den Wert von `rowspan` an. Was passiert, wenn er nicht mehr zur
Anzahl der Zeilen passt?

## Schritt 7: Formular {#formulare}

Legen Sie `kontakt.html` an (wieder von `index.html` ausgehend) und bauen Sie ein
BMI-Formular. Das Formular schickt die Eingaben an ein Programm auf einem Server, das
den BMI berechnet:

```html
<main>
  <h2>BMI berechnen</h2>
  <form id="bmi" action="https://www.inolten.ch/web/bmi.php" method="post">
    <label for="gewicht">Gewicht in kg:</label><br>
    <input type="text" id="gewicht" name="gewicht" size="10"><br>
    <label for="groesse">Grösse in m:</label><br>
    <input type="text" id="groesse" name="groesse" size="10"><br><br>
    <input type="submit" value="Berechnen">
    <input type="reset" value="Formular leeren">
  </form>
</main>
```

Der Name (`name`) eines Feldes muss genau dem Namen entsprechen, den das Programm auf
dem Server erwartet.

### Weitere Formularelemente

Ergänzen Sie in einem zweiten Formular auf der Seite:

```html
<form action="mailto:max.muster@example.ch" method="post">
  <label for="vorname">Vorname:</label>
  <input type="text" id="vorname" name="vorname" placeholder="Vorname" required autofocus><br>

  <label for="ort">Studienort:</label>
  <select id="ort" name="studienort">
    <option>Olten</option>
    <option>Brugg</option>
  </select><br>

  <input type="radio" name="zahlmethode" value="Mastercard">Mastercard<br>
  <input type="radio" name="zahlmethode" value="Visa">Visa<br>

  <input type="submit" value="Senden">
</form>
```

**Fragen zum Ausprobieren:**

- Was bewirken `placeholder`, `required` und `autofocus`?
- Was ändert sich, wenn Sie `type="radio"` durch `type="checkbox"` ersetzen?
- Was geschieht beim Absenden mit `mailto:`? (Das öffnet nur Ihr Mailprogramm. Echte Mails versendet man über ein Programm auf dem Server.)

**`method="post"` oder `"get"`?** Bei `get` stehen die Eingaben in der Adresszeile
(sichtbar, mit Lesezeichen speicherbar), bei `post` werden sie im Hintergrund
gesendet. Passwörter gehören nie in ein `get`-Formular.

## Schritt 8: Abschluss {#abschluss}

**Metatags** stehen im `<head>` und beschreiben die Seite für Browser und
Suchmaschinen:

```html
<meta name="author" content="Max Muster">
<meta name="description" content="Persönliche Webseite von Max Muster">
<meta name="keywords" content="Muster, Lebenslauf, Projekte">
```

Für die Darstellung auf dem Handy gehört zusätzlich diese Zeile in den `<head>`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

(Die Suchmaschine Google ignoriert `keywords`, `description` kann dagegen im Suchergebnis erscheinen.)

**Favicon:** das kleine Symbol im Browser-Tab. Es ist ein Bild von 16×16 oder
32×32 Pixel. Erzeugen Sie es mit einem Online-Favicon-Generator (Suchbegriff
«favicon generator») und binden Sie es im `<head>` ein:

```html
<link rel="icon" href="./bilder/favicon.ico">
```

**Prüfen:** Der [W3C Validator](https://validator.w3.org/) kontrolliert, ob Ihr HTML
korrekt ist (Reiter *Validate by Direct Input*, Code einfügen).

**Begriffe:**

- **Webeditor:** Programm zum Schreiben von Webseiten. Ein *WYSIWYG-Editor* (What You See Is What You Get) zeigt die Seite schon beim Bearbeiten so, wie sie im Browser erscheint. Ein *Code-Editor* (wie Visual Studio Code) arbeitet direkt mit den Tags.
- **CMS (Content-Management-System):** Software, mit der Inhalte einer Webseite ohne HTML-Kenntnisse erfasst und verwaltet werden, zum Beispiel WordPress.

**Checkliste:**

- [ ] Drei Seiten (`index`, `ich`, `kontakt`) sind verlinkt und im Browser erreichbar
- [ ] Alle Seiten haben `<title>` und `charset`
- [ ] Mindestens ein Bild mit `alt`, eine Liste, eine Tabelle und ein Formular
- [ ] Der Code ist eingerückt und besteht den Validator

**Für Einheit 9:** Bringen Sie Ihren Ordner `meinewebseite` mit (USB-Stick, Cloud oder
auf dem Notebook). Wir gestalten ihn mit CSS.
