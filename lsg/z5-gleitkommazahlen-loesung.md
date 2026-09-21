---
lektion: 1
titel: "Musterlösung: Übungscheck Z5 – Gleitkommazahlen und Datentypen"
kurz: "Lösungen zu Übungscheck Z5 (Aufbau von float, Rundungsfehler, Eigenschaften von Gleitkommazahlen)"
---

# Musterlösung: Übungscheck Z5 – Gleitkommazahlen und Datentypen

Bei Aufgaben mit freier Formulierung sind andere Worte richtig, solange der Inhalt stimmt. Die Rechenwege zeigen einen möglichen Weg, nicht den einzigen.

**Aufgabe 1.** Ein float hat 32 Bit. Wie viele Bit entfallen auf Vorzeichen, Exponent und Mantisse? Wie gross ist der Bias?

1 / 8 / 23 Bit, Bias = 127

**Aufgabe 2.** Welche Dezimalzahl stellt dieser float dar?

Vorzeichen 0 → positiv.

Exponent: 1000'0010<sub>2</sub> = 130 → 130 − 127 = 3.

Mantisse: 1.01<sub>2</sub> = 1.25 (das «1.» vor dem Komma wird nicht gespeichert).

1.25 · 2<sup>3</sup> = **10.0**

**Aufgabe 3.** Stellen Sie 5.5 als float dar (Vorzeichen \| Exponent \| Mantisse).

5.5 = 101.1<sub>2</sub> = 1.011<sub>2</sub> · 2<sup>2</sup>

Vorzeichen: **0**;  Exponent: 2 + 127 = 129 = **1000'0001**;  Mantisse: **011** 0000'0000'0000'0000'0000

→ 0  1000'0001  011'0000'0000'0000'0000'0000

**Aufgabe 4.** In vielen Programmiersprachen ergibt 0.1 + 0.2 nicht genau 0.3. Erklären Sie in 1–2 Sätzen, woran das liegt.

0.1 und 0.2 sind im Binärsystem periodische Brüche und lassen sich mit endlich vielen Mantissenbits nicht exakt speichern. Sie werden gerundet, und das Rechenergebnis weicht minim vom «exakten» 0.3 ab (in double: 0.30000000000000004).

**Aufgabe 5.** Richtig oder falsch?

a) falsch (nur endlich viele Werte, Ergebnisse werden gerundet)

b) falsch (dicht bei 0, weiter auseinander bei grossen Beträgen)

c) richtig (float: ca. 3.4 · 10<sup>38</sup>)

d) richtig (double: bis ca. 1.7 · 10<sup>308</sup>)
