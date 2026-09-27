---
lektion: 1
zielgruppe: sus
art: theorie
titel: "Theorie: Zahlensysteme"
kurz: "Bits, Bytes und Masseinheiten, Binär/Dezimal/Hex, Zweierkomplement, Binärbrüche und Gleitkommazahlen – zum Nachlesen vor oder nach den Checks."
reihenfolge: 5
---

# Theorie: Zahlensysteme

**Einheit 1 · zum Nachlesen vor oder nach den Checks**

<!--
  Stand dieser Angaben: 27.09.2026.
  Keine externen Zahlen oder Quellen: Grundlage sind die Vorlesungsfolien
  «Informationseinheiten und Zahlensysteme» (HS 2025/2026) sowie die Fakten,
  Begriffe und Musterlösungen, die bereits in den Checks Z1–Z5 stecken.
  Bei neuen Folien diesen Text gegenlesen.
-->

Jeder Abschnitt hier gehört zu einem Lernziel und zu genau einem Check. Sie können
also entweder zuerst hier lesen und dann den Check lösen, oder direkt mit dem Check
beginnen und bei Bedarf hierher zurückspringen — der Check verlinkt zurück auf den
passenden Abschnitt.

## Bits, Bytes und Masseinheiten {#bits-bytes}

Ein **Bit** ist die kleinste Informationseinheit und kennt nur zwei Zustände: 0 oder
1. Mit *n* Bit lassen sich 2ⁿ verschiedene Bitfolgen bilden — jedes zusätzliche Bit
verdoppelt die Anzahl Möglichkeiten, weil sich die Möglichkeiten multiplizieren, nicht
addieren. Umgekehrt gilt: Wollen Sie *m* verschiedene Zustände unterscheiden, brauchen
Sie mindestens so viele Bit *n*, dass 2ⁿ ≥ *m* ist.

Ein **Byte** besteht aus 8 Bit (= 2 **Nibble** zu je 4 Bit) und hat damit 2⁸ = 256
mögliche Zustände — ohne Vorzeichen also die Werte 0 bis 255.

### Dezimale und binäre Grössenvorsätze

Bei grösseren Speichermengen gibt es zwei Systeme von Vorsätzen, die leicht
verwechselt werden:

| Vorsatz | Bedeutung | Wert |
|---|---|---|
| kB, MB, GB | dezimal (Zehnerpotenz) | 10³, 10⁶, 10⁹ Byte |
| kiB, MiB, GiB | binär (Zweierpotenz) | 2¹⁰, 2²⁰, 2³⁰ Byte |

Das **„i“** in kiB/MiB/GiB steht für die Zweierpotenz. Weil 2¹⁰ = 1024 grösser ist
als 10³ = 1000, ist 1 GiB auch grösser als 1 GB. Das erklärt einen bekannten Effekt:
Eine Festplatte, die mit «1 TByte» (= 10¹² Byte, dezimal) angeschrieben ist, zeigt das
Betriebssystem als rund 931 GiByte an — dieselbe Menge Byte, nur in der grösseren
Einheit GiByte ausgedrückt, ergibt eine kleinere Zahl.

### ASCII

Im **ASCII-Code** entspricht jedem Byte genau ein Zeichen. Ein Text lässt sich also
Byte für Byte dekodieren: Jedes Byte wird zuerst in eine Dezimalzahl umgewandelt, und
diese Dezimalzahl wird in der ASCII-Tabelle nachgeschlagen.

**Dazu passender Check:** [z1 – Bits, Bytes und Masseinheiten]({{ "/lektionen/z1-bits-bytes-masseinheiten.html" | relative_url }})

## Binär, Dezimal, Hexadezimal und andere Basen {#binaer-hex}

Jedes Stellenwertsystem funktioniert nach demselben Prinzip: Jede Ziffer hat eine
**Wertigkeit**, die von der Basis des Systems abhängt. Im Dezimalsystem (Basis 10)
haben die Stellen die Wertigkeiten 1, 10, 100, …; im Binärsystem (Basis 2) die
Wertigkeiten 1, 2, 4, 8, 16, …

- **Binär → Dezimal:** Addieren Sie die Wertigkeiten aller Stellen, an denen eine 1
  steht.
- **Dezimal → Binär:** Ziehen Sie von links nach rechts die jeweils grösste passende
  Zweierpotenz ab (ist sie enthalten, schreiben Sie 1, sonst 0) — oder teilen Sie
  wiederholt durch 2 und lesen Sie die Reste von unten nach oben.

### Hexadezimal

Das Hexadezimalsystem (Basis 16, Ziffern 0–9 und A–F für die Werte 10–15) wird in der
Informatik häufig verwendet, weil **jede Hexziffer genau 4 Bit entspricht**. Dadurch
lassen sich lange, unübersichtliche Binärzahlen kurz und lesbar aufschreiben. Die
Umwandlung Binär ↔ Hex geschieht deshalb einfach ziffernweise in 4er-Gruppen, ohne
über den Umweg Dezimal gehen zu müssen.

### Andere Basen

Das Prinzip lässt sich auf jede beliebige Basis *b* übertragen: Die Stellen haben die
Wertigkeiten 1, *b*, *b*², *b*³, … Um eine Dezimalzahl ins *b*-er-System umzuwandeln,
teilen Sie wiederholt durch *b* und lesen die Reste von unten nach oben — oder Sie
ziehen, wie bei Binär, von links nach rechts die grössten passenden Potenzen von *b*
ab.

**Dazu passender Check:** [z2 – Binär, Dezimal, Hexadezimal und andere Basen]({{ "/lektionen/z2-binaer-dezimal-hex.html" | relative_url }})

## Das Zweierkomplement {#zweierkomplement}

Binärzahlen kennen von sich aus kein Vorzeichen. Das **Zweierkomplement** ist die in
der Praxis verwendete Darstellung für negative Ganzzahlen: Das erste Bit einer Zahl
ist das Vorzeichenbit — 0 bedeutet nicht-negativ, 1 bedeutet negativ.

**Bildung des Zweierkomplements einer negativen Zahl** (in drei Schritten):

1. Schreiben Sie den positiven Betrag mit der vorgegebenen Bitbreite hin.
2. Kippen Sie alle Bits (aus 0 wird 1, aus 1 wird 0) — das ist das *Einerkomplement*.
3. Addieren Sie 1.

Beispiel: −5 mit 4 Bit → +5 = `0101` → gekippt `1010` → + 1 = `1011`.

**Rückwandlung** (negative Zahl im Zweierkomplement → ihr Betrag): Dieselben zwei
Schritte (kippen, +1) noch einmal angewendet ergeben den Betrag. Das Zweierkomplement
ist also seine eigene Umkehrung: Wendet man es zweimal an, erhält man wieder die
Ausgangszahl.

**Wertebereich:** Mit *n* Bit lassen sich die Zahlen von −2ⁿ⁻¹ bis 2ⁿ⁻¹ − 1
darstellen. Der Bereich ist nicht symmetrisch, weil die 0 zu den nicht-negativen
Zahlen zählt und damit auf der positiven Seite ein Wert „fehlt“ (bei 4 Bit: −8 bis
+7, bei 8 Bit: −128 bis +127).

**Der grosse Vorteil:** Mit dem Zweierkomplement wird Subtraktion zu einer normalen
Addition — *a* − *b* rechnet man als *a* + (Zweierkomplement von *b*). Ein Übertrag,
der über die vorgegebene Bitbreite hinausgeht, wird dabei einfach verworfen.

**Dazu passender Check:** [z3 – Zweierkomplement]({{ "/lektionen/z3-zweierkomplement.html" | relative_url }})

## Binärbrüche {#binaerbrueche}

Auch nach dem Komma folgt das Binärsystem dem Stellenwertprinzip: Die Nachkommastellen
haben die Wertigkeiten 1/2, 1/4, 1/8, 1/16, … (also 2⁻¹, 2⁻², 2⁻³, …).

- **Binär → Dezimal:** Addieren Sie wie gewohnt die Wertigkeiten aller Stellen mit
  einer 1 — jetzt eben auch die Wertigkeiten nach dem Komma.
- **Dezimal → Binär:** Wandeln Sie Vor- und Nachkommateil getrennt um. Für den
  Nachkommateil: multiplizieren Sie wiederholt mit 2 und notieren Sie jeweils die
  entstehende Vorkommaziffer (0 oder 1), bis nichts mehr übrig bleibt.

Beispiel 0.4375: 0.4375·2 = 0.875 → 0; 0.875·2 = 1.75 → 1; 0.75·2 = 1.5 → 1; 0.5·2 =
1.0 → 1. Ergebnis: `0.0111`.

### Nicht jede Dezimalzahl ist exakt darstellbar

Nur Zahlen, die sich als **endliche Summe von Zweierbrüchen** (1/2, 1/4, 1/8, …)
schreiben lassen, haben eine endliche Binärdarstellung. Viele „einfache“
Dezimalbrüche wie 0.1 oder 0.3 gehören nicht dazu — ihre Binärdarstellung ist
periodisch (0.1 = 0.0001'1001'1001…). Das ist die Wurzel eines bekannten Phänomens:
In vielen Programmiersprachen ergibt `0.1 + 0.2` nicht exakt `0.3`, weil beide Werte
im Speicher schon gerundet abgelegt werden.

**Dazu passender Check:** [z4 – Binärbrüche]({{ "/lektionen/z4-binaerbrueche.html" | relative_url }})

## Gleitkommazahlen (Float) {#gleitkommazahlen}

Ein **float** nach IEEE 754 belegt 32 Bit, aufgeteilt in drei Teile:

| Teil | Bits | Aufgabe |
|---|---|---|
| Vorzeichen | 1 | 0 = positiv, 1 = negativ |
| Exponent | 8 | verschoben um den **Bias** 127 gespeichert |
| Mantisse | 23 | Nachkommastellen der normalisierten Zahl |

Die Zahl wird **normalisiert** in der Form 1.*Mantisse* · 2^*Exponent* dargestellt.
Die führende 1 vor dem Komma muss nicht mitgespeichert werden (sie ist ja immer da) —
das spart ein Bit, das sogenannte *implizite* oder *hidden bit*. Der Exponent wird
nicht mit Vorzeichen gespeichert, sondern um den **Bias 127** nach oben verschoben,
damit er als reine positive Zahl in 8 Bit Platz findet.

**Float → Dezimalzahl:** Lesen Sie den 8-Bit-Exponenten, ziehen Sie den Bias 127 ab.
Ergänzen Sie die Mantisse um die implizite führende 1 (also `1.` + Mantissenbits).
Der Wert ist dann 1.*Mantisse*₂ · 2^(*Exponent* − 127).

**Dezimalzahl → Float:** Schreiben Sie die Zahl binär normalisiert als
1.*xxx* · 2^*e*. Der gespeicherte Exponent ist *e* + 127 (als 8-Bit-Binärzahl), die
Mantisse sind die Nachkommastellen von *xxx* (mit Nullen aufgefüllt auf 23 Bit).

### Grenzen von Gleitkommazahlen

Da ein float nur endlich viele Bitmuster kennt, gibt es auch nur endlich viele
darstellbare Werte — sie liegen nicht gleichmässig verteilt auf der Zahlengeraden
(bei kleinen Beträgen dichter, bei grossen weiter auseinander), und es gibt einen
betragsmässig grössten darstellbaren Wert; alles darüber führt zu einem Overflow.
Ein **double** verwendet 64 Bit (mehr Exponenten- und mehr Mantissenbit) und deckt
damit einen grösseren Wertebereich mit mehr Genauigkeit ab als ein float.

**Dazu passender Check:** [z5 – Gleitkommazahlen und Datentypen]({{ "/lektionen/z5-gleitkommazahlen.html" | relative_url }})
