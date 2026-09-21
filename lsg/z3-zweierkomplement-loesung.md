---
lektion: 1
titel: "Musterlösung: Übungscheck Z3 – Zweierkomplement"
kurz: "Lösungen zu Übungscheck Z3 (Zahlenbereich, negative Zahlen darstellen, Subtraktion durch Addition)"
---

# Musterlösung: Übungscheck Z3 – Zweierkomplement

Bei Aufgaben mit freier Formulierung sind andere Worte richtig, solange der Inhalt stimmt. Die Rechenwege zeigen einen möglichen Weg, nicht den einzigen.

**Aufgabe 1.** Welcher Zahlenbereich lässt sich im Zweierkomplement mit 4 Bit bzw. mit 8 Bit darstellen?

4 Bit: −8 bis +7

8 Bit: −128 bis +127

**Aufgabe 2.** Stellen Sie −5 mit 4 Bit im Zweierkomplement dar.

+5 = 0101 → bitweises Komplement 1010 → + 1 → **1011**

Probe: 1011 → Komplement 0100 → + 1 = 0101 = 5, also −5.

**Aufgabe 3.** Stellen Sie −20 mit 8 Bit im Zweierkomplement dar.

+20 = 0001'0100 → Komplement 1110'1011 → + 1 → **1110'1100**

**Aufgabe 4.** Welche Dezimalzahl stellt 1111'0001 (8 Bit, Zweierkomplement) dar?

Erstes Bit = 1 → negativ. Komplement 0000'1110 → + 1 = 0000'1111 = 15 → **−15**

**Aufgabe 5.** Berechnen Sie 12 − 7 im Binärsystem mit 8 Bit, indem Sie das Zweierkomplement von 7 addieren. Wandeln Sie das Resultat in dezimal um.

12 = 0000'1100;  7 = 0000'0111 → −7 = 1111'1001

0000'1100 + 1111'1001 = 1 0000'0101 → das 9. Bit (Übertrag) fällt weg → 0000'0101 = **5**

**Aufgabe 6.** Richtig oder falsch?

a) richtig

b) richtig (Zweierkomplement = Vorzeichenwechsel)

c) **falsch**: grösste Zahl ist +127; −128 hat dagegen eine Darstellung (1000'0000).
