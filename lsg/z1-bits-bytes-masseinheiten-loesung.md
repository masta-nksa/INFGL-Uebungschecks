---
lektion: 1
titel: "Musterlösung: Übungscheck Z1 – Bits, Bytes und Masseinheiten"
kurz: "Lösungen zu Übungscheck Z1 (Zweierpotenzen, Byte und Nibble, kiB/MiB/GiB, ASCII)"
---

# Musterlösung: Übungscheck Z1 – Bits, Bytes und Masseinheiten

Bei Aufgaben mit freier Formulierung sind andere Worte richtig, solange der Inhalt stimmt. Die Rechenwege zeigen einen möglichen Weg, nicht den einzigen.

**Aufgabe 1.** Wie viele verschiedene Bitfolgen der Länge 5 gibt es?

2<sup>5</sup> = **32**

**Aufgabe 2.** Wie viele Bit braucht man mindestens, um 100 verschiedene Zustände zu unterscheiden?

**7 Bit**, denn 2<sup>6</sup> = 64 reicht nicht, 2<sup>7</sup> = 128 reicht.

**Aufgabe 3.** Ergänzen Sie: Ein Byte besteht aus … Bit, also aus … Nibbles. Ein Byte hat … verschiedene Zustände, ohne Vorzeichen also der Wertebereich 0 bis ….

8 Bit, 2 Nibbles, 256 Zustände, Wertebereich 0 bis 255.

**Aufgabe 4.** Was bedeutet 1 MiB?

**1024 kiB** (= 1'048'576 Byte).

*Hinweis: 1000 kB wäre 1 MB (Zehnerpotenz, SI). Das «i» steht für die Zweierpotenz (IEC).*

**Aufgabe 5.** Eine Festplatte ist mit 1 TByte angeschrieben (1 TByte = 10<sup>12</sup> Byte). Wie viele GiByte fasst sie? Auf ganze Zahlen runden, Rechenweg angeben.

10<sup>12</sup> Byte : 2<sup>30</sup> Byte/GiByte = 931.3 → **ca. 931 GiByte**

*Hinweis: Analog zur Folie (500 GByte ≈ 465.7 GiByte). Die Differenz ist der Grund, warum das Betriebssystem «weniger» anzeigt als auf der Verpackung steht.*

**Aufgabe 6.** Was steht in dieser Textdatei? Benutzen Sie die ASCII-Tabelle.

66  97  115  101 → **«Base»**

*Hinweis: Binär → dezimal umrechnen (Rechenweg wie bei den Zahlensystemen), dann in der ASCII-Tabelle nachschlagen.*
