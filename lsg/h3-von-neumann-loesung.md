---
lektion: 2
titel: "Musterlösung: Übungscheck H3 – Der Von-Neumann-Rechner"
kurz: "Lösungen zu Übungscheck H3 (Bestandteile und Zyklus des Von-Neumann-Rechners)"
---

# Musterlösung: Übungscheck H3 – Der Von-Neumann-Rechner

Bei Aufgaben mit freier Formulierung sind andere Worte richtig, solange der Inhalt stimmt. Die Rechenwege zeigen einen möglichen Weg, nicht den einzigen.

**Aufgabe 1.** Aus welchen vier Bestandteilen besteht ein Rechner nach von Neumann (1946)?

Recheneinheit, Steuereinheit, Speicher, Eingabe- und Ausgabeeinheit(en).

**Aufgabe 2.** Bringen Sie die Phasen des Von-Neumann-Zyklus in die richtige Reihenfolge (1 bis 5):

Fetch = 1, Decode = 2, Fetch Operands = 3, Execute = 4, Write Back = 5

**Aufgabe 3.** Was passiert in den Phasen «Fetch» und «Execute»? Je ein Stichwort bis ein Satz.

**Fetch:** Der nächste Befehl wird aus dem Speicher geholt.

**Execute:** Die ALU führt die Operation aus.

*(Zur Vollständigkeit: Decode = Befehl entschlüsseln; Fetch Operands = Operanden aus Register/Speicher holen; Write Back = Ergebnis zurückschreiben.)*

**Aufgabe 4.** Der Zyklus «lebt bis heute im RISC-Rechner». Nennen Sie die fünf Phasen dort (Abkürzungen genügen).

IF (Instruction Fetch), ID (Instruction Decode), EX (Execute), MEM (Memory), WB (Write Back)

**Aufgabe 5.** Denkanstoss (nicht auf den Folien): Was ist das zentrale Prinzip der von-Neumann-Architektur in Bezug auf Programme und Daten?

Programm (Befehle) und Daten liegen im selben Speicher und werden beide als Bitfolgen abgelegt. Damit ist das Programm austauschbar und muss nicht «verdrahtet» sein.

*Hinweis: Anknüpfung an die Zahlensysteme, denn «alles ist eine Folge von Bytes» (Dateien, Programme, Texte).*
