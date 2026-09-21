---
lektion: 2
titel: "Musterlösung: Übungscheck H4 – Software, Compiler und virtuelle Maschinen"
kurz: "Lösungen zu Übungscheck H4 (Softwarestufen, Compiler, Interpreter, Parser, virtuelle Maschinen)"
---

# Musterlösung: Übungscheck H4 – Software, Compiler und virtuelle Maschinen

Bei Aufgaben mit freier Formulierung sind andere Worte richtig, solange der Inhalt stimmt. Die Rechenwege zeigen einen möglichen Weg, nicht den einzigen.

**Aufgabe 1.** Software wird in drei Stufen (Levels) eingeteilt. Nennen Sie die drei Stufen mit je einem Beispiel.

Low level: BIOS / UEFI (Firmware im ROM)

Level 2: Betriebssystem (z. B. Windows, UNIX, Android)

Level 3: Anwendungsprogramme (z. B. Excel, Outlook, Webbrowser)

**Aufgabe 2.** Ordnen Sie zu: Compiler, Interpreter, Parser.

1\. Compiler   2. Interpreter   3. Parser

**Aufgabe 3.** Was tun BIOS bzw. UEFI beim Start des Computers? Nennen Sie zudem einen Vorteil von UEFI.

Sie liegen im ROM, prüfen die Hardware und starten das Betriebssystem (laufen also vor dem OS).

Vorteile von UEFI (eine Nennung genügt): grössere Festplatten, schnellere Bootzeiten, mehr Sicherheitsfunktionen, komfortable Maussteuerung / GUI, Treiber nachladbar.

**Aufgabe 4.** Was ist eine virtuelle Maschine, und wozu setzt man sie auf einem PC ein?

Ein «virtueller Computer», der rein aus Software besteht und auf einem physischen Rechner läuft (auch mehrere gleichzeitig). Man kann damit Anwendungen anderer Betriebssysteme ausführen, ohne den Rechner neu zu starten.

**Aufgabe 5.** Ein Startup entwickelt ein Messgerät in einer Kleinserie von 50 Stück. Die Funktionen ändern sich laufend. Soll es eine eigene Hardware bauen oder Standard-Hardware (PC) mit eigener Software verwenden? Begründen Sie mit zwei Argumenten.

**Standard-Hardware mit eigener Software.** Argumente: Software ist anpassbar (Funktionen ändern sich), günstig reproduzierbar und portierbar. Eigene Hardware ist unveränderbar, hat hohe Produktionskosten (bei 50 Stück nicht amortisierbar), einen begrenzten Lebenszyklus und ist oft systemspezifisch.

*Hinweis: Eigene Hardware wird interessant bei hohen Stückzahlen und hohen Performance-Anforderungen. Auch besserer Kopierschutz kann ein Argument sein.*
