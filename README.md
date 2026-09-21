# Übungschecks Informatik Grundlagen

Kurze, interaktive Übungschecks für die Studierenden (FHNW WING, Modul Informatik
Grundlagen). Die Studierenden lösen die Aufgaben im Browser und klicken auf «Prüfen».
Bei einer falschen Antwort erscheint ein kurzer Tipp, bei einer richtigen die Bestätigung.

Die Seite wird von GitHub Pages direkt aus diesem Repository mit Jekyll gebaut.
Es gibt keinen Build-Schritt und kein eingechecktes HTML.

## Aufbau

```
├── index.md                    Startseite
├── lektion-1.md, lektion-2.md  Einheitsseiten (Liste der Checks einer Einheit)
├── lektionen/*.md              Kopf jedes Checks: Titel, Ziel, Hilfsmittel
├── assets/checks/*.json        Die Aufgaben mit Antworten und Tipps
├── assets/js/check.js          Prüflogik und Darstellung
├── assets/css/unterricht.css   Gestaltung inkl. Dark Mode
├── _layouts/                   HTML-Gerüst
└── _config.yml                 Titel, baseurl, Badge-Beschriftung
```

Zu jeder Seite in `lektionen/` gehört eine JSON-Datei. Die Verbindung steht im Kopf der
Seite als `check: <dateiname ohne .json>`.

## Aufgaben ändern

Alle Aufgaben eines Checks stehen in `assets/checks/<name>.json` unter `aufgaben`.
Ein Tippfehler lässt sich direkt auf github.com über den Stift-Button korrigieren.
Texte dürfen einfaches HTML enthalten (`<sub>`, `<sup>`, `<code>`).

Jede Aufgabe hat eine `frage`, einen `typ` und optional einen `tipp` (Ersatz-Tipp für alles,
was keinen eigenen hat) sowie `weg` (Kurz-Rechenweg, erscheint nach der richtigen Antwort).

| `typ` | Zweck | Wichtige Felder |
|---|---|---|
| `felder` | eine oder mehrere Eingabefelder | `felder`: Liste von Feldern (siehe unten) |
| `tabelle` | Tabelle mit Eingabefeldern in Zellen | `kopf`, `zeilen` (Text oder Feld pro Zelle) |
| `wahl` | genau eine richtige Antwort | `optionen`: `{text, richtig?, warum?}` |
| `mehrfach` | mehrere richtige Antworten | `optionen`: `{text, richtig?, warum?}` |
| `zuordnung` | Zeilen einer Option zuordnen | `optionen`, `zeilen`: `{text, antwort, tipp?}`, `radio` (Auswahlknöpfe statt Liste), `spalte`, `antwortspalte` |

`warum` ist der Tipp, der erscheint, wenn genau diese falsche Option gewählt wurde.

### Felder

| Eigenschaft | Bedeutung |
|---|---|
| `label`, `nach` | Text vor und nach dem Eingabefeld |
| `format` | `zahl`, `bin`, `hex`, `ziffern`, `mantisse` oder `text` |
| `antwort` | richtige Antwort, bei mehreren gültigen Schreibweisen eine Liste |
| `tipp` | Tipp bei falscher Antwort |
| `haeufig` | Liste von `{wert, tipp}`: Tipp für einen bekannten Fehler (hat Vorrang vor `tipp`) |
| `tol` | Toleranz bei `zahl` (Standard: exakt) |
| `streng` | bei `bin`: führende Nullen zählen (feste Bitbreite) |
| `bruch` | bei `bin`: Komma erlaubt |
| `basis` | bei `ziffern`: Zahlensystem, damit unzulässige Ziffern erkannt werden |
| `breit` | breiteres Eingabefeld |

Was das Prüfen alles akzeptiert:

- **`zahl`:** Dezimalpunkt oder -komma, Trenner `'` und Leerzeichen, einfache Ausdrücke
  (`5/8`, `2^34`, `16*2^30`), eine nachgestellte Einheit (`931 GiB`).
- **`bin`, `hex`, `ziffern`:** Trenner (`1100'1010`, `1100 1010`), Präfix `0b`/`0x`,
  Suffix `b`/`h`, tiefgestellte Basis (`₂`), Gross- und Kleinschreibung bei Hex.
- **`text`:** Gross-/Kleinschreibung und Satzzeichen werden ignoriert.

Nach jeder Änderung an einer Datei in `assets/checks/` lohnt sich ein Blick in die Seite:
Ein Syntaxfehler in der JSON-Datei zeigt den Studierenden die Meldung, dass die Aufgaben
nicht geladen werden konnten.

## Neuen Check hinzufügen

1. `assets/checks/<name>.json` anlegen (am einfachsten eine bestehende Datei kopieren).
2. `lektionen/<name>.md` anlegen: Kopf wie in den bestehenden Dateien, mit `check: <name>`
   und `lektion: <Nummer der Einheit>`.
3. Committen und pushen. Die Seite erscheint automatisch in der Liste der Einheit.

## Hinweis zu den Antworten

Die Prüfung läuft im Browser. Die richtigen Antworten stehen deshalb in den JSON-Dateien
und sind für alle sichtbar, die im Repository oder im Seitenquelltext nachschauen. Für
Übungschecks zur Selbstkontrolle genügt das. Für Prüfungen und Noten ist dieser Aufbau
nicht geeignet.

## Lokale Vorschau (optional)

Braucht Ruby:

```
gem install bundler
bundle install
bundle exec jekyll serve
```

Die Vorschau läuft dann unter <http://localhost:4000/INFGL-Uebungschecks/>. Der Wert
`baseurl` in `_config.yml` muss dem Repository-Namen entsprechen.
