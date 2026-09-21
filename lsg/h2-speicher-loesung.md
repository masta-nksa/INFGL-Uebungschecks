---
lektion: 2
titel: "Musterlösung: Übungscheck H2 – Speicher"
kurz: "Lösungen zu Übungscheck H2 (Speicherarten, RAM und ROM, Cache, Datenraten)"
---

# Musterlösung: Übungscheck H2 – Speicher

Bei Aufgaben mit freier Formulierung sind andere Worte richtig, solange der Inhalt stimmt. Die Rechenwege zeigen einen möglichen Weg, nicht den einzigen.

**Aufgabe 1.** Ordnen Sie die Speicherarten von 1 (am schnellsten, kleinsten, teuersten) bis 4 (am langsamsten, grössten, günstigsten):

1 = CPU-Cache, 2 = Arbeitsspeicher (RAM), 3 = Festplatte / SSD, 4 = Bandlaufwerk

Merksatz der Folie: Je näher am Prozessor, desto kleiner und teurer, aber auch schneller.

**Aufgabe 2.** Richtig oder falsch?

a) falsch (RAM ist flüchtig)

b) richtig

c) richtig (so kann der Rechner immer starten)

d) richtig (Random Access; bei Festplatten wird blockweise zugegriffen)

**Aufgabe 3.** Wozu dient ein Cache-Speicher? Ein bis zwei Sätze.

Cache ist ein sehr schneller (teurer) Pufferspeicher nahe bei der CPU, zwischen CPU und RAM. Er hält Kopien von bereits verwendeten oder bald benötigten Daten und vermeidet so langsame Zugriffe auf das Hintergrundmedium.

**Aufgabe 4.** Eine 250 MiByte grosse Datei wird über ein Netzwerk mit 1 Gbit/s übertragen (1 Gbit = 10<sup>9</sup> Bit). Wie lange dauert das theoretisch?

250 MiByte = 250 · 1'048'576 Byte = 262'144'000 Byte = 2'097'152'000 Bit

2'097'152'000 Bit : 1'000'000'000 Bit/s = 2.097 s → **ca. 2.1 Sekunden**

*Hinweis: Typische Fehler sind Bit/Byte verwechseln (Faktor 8) und MiByte mit 10<sup>6</sup> statt 2<sup>20</sup> Byte rechnen.*

**Aufgabe 5.** Ein Rechner hat 16 GiByte Arbeitsspeicher. Wie viele Byte sind das? (Angabe als Zweierpotenz genügt.)

16 · 2<sup>30</sup> = 2<sup>4</sup> · 2<sup>30</sup> = **2<sup>34</sup> Byte** = 17'179'869'184 Byte
