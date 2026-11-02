---
lektion: 8
zielgruppe: sus
art: loesung
titel: "Formative Prüfung 1: Musterlösung"
kurz: "Alle 25 Aufgaben der formativen Prüfung 1 mit Lösung und Rechenweg, geordnet nach den vier Teilen."
reihenfolge: 90
---

# Formative Prüfung 1: Musterlösung

**Einheit 8 · alle 25 Aufgaben · erst nach einem eigenen Versuch lesen**

Die Lösungen folgen den vier Teilen der Einheit. Pro Aufgabe steht die Nummer in der Prüfung, die Lösung und kurz der Rechenweg; bei Bedarf führt ein Link zum Theorie-Abschnitt. Die Aufgaben selbst lösen Sie in den Teilen der [Einheit 8]({{ "/lektion-8.html" | relative_url }}).

- [Teil 1: Zahlensysteme](#teil1) (Aufgaben 5, 6, 7, 12, 13, 9, 10, 11)
- [Teil 2: Hardware, Übertragung und Fehlererkennung](#teil2) (Aufgaben 1, 14, 17, 18, 8, 24)
- [Teil 3: IP-Nummern und Subnetting](#teil3) (Aufgaben 2, 4, 25)
- [Teil 4: OSI-Modell, Protokolle und Netzwerkelemente](#teil4) (Aufgaben 3, 19, 21, 22, 23, 15, 16, 20)

## Teil 1: Zahlensysteme {#teil1}

Theorie: [Zahlensysteme]({{ "/lektionen/z0-theorie.html" | relative_url }}).

### Aufgabe 5: Tabelle ergänzen (4.5 Punkte) {#a5}

| Dezimal | Hexadezimal | 9er-System | Binär |
|---|---|---|---|
| **33** | **21** | 36 | 10'0001 |
| **1717** | **6B5** | **2317** | 110'1011'0101 |
| **195** | **C3** | **236** | 1100'0011 |

Rechenweg (die fett gesetzten Zellen waren zu ergänzen):

- **Zeile 1:** 10'0001<sub>2</sub> = 32 + 1 = 33. Durch 16: 33 = 2 · 16 + 1, also 21<sub>16</sub>. Durch 9: 33 = 3 · 9 + 6, also 36<sub>9</sub> (zur Kontrolle).
- **Zeile 2:** Binär in 4er-Gruppen von rechts: 0110 | 1011 | 0101 = 6 | B | 5, also 6B5<sub>16</sub> = 6 · 256 + 11 · 16 + 5 = 1717. Durch 9 teilen: 1717 = 190 · 9 + **7**; 190 = 21 · 9 + **1**; 21 = 2 · 9 + **3**; 2 = 0 · 9 + **2**. Die Reste von unten nach oben ergeben 2317<sub>9</sub>.
- **Zeile 3:** 1100 | 0011 = C | 3, also C3<sub>16</sub> = 12 · 16 + 3 = 195. Durch 9 teilen: 195 = 21 · 9 + **6**; 21 = 2 · 9 + **3**; 2 = 0 · 9 + **2**. Ergebnis: 236<sub>9</sub>.

### Aufgabe 6: 7er-System ins 10er- und 13er-System {#a6}

23562<sub>7</sub> = **6120**<sub>10</sub> = **2A2A**<sub>13</sub>

- Ins 10er-System: 2 · 7<sup>4</sup> + 3 · 7<sup>3</sup> + 5 · 7<sup>2</sup> + 6 · 7 + 2 = 4802 + 1029 + 245 + 42 + 2 = 6120.
- Ins 13er-System: 6120 = 470 · 13 + **10** (A); 470 = 36 · 13 + **2**; 36 = 2 · 13 + **10** (A); 2 = 0 · 13 + **2**. Von unten nach oben: 2 A 2 A.

### Aufgabe 7: ASCII-Text (4 Punkte) {#a7}

49 73 74 20 65 73 20 57 69 6E 74 65 72 3F = **«Ist es Winter?»**

| 49 | 73 | 74 | 20 | 65 | 73 | 20 | 57 | 69 | 6E | 74 | 65 | 72 | 3F |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| I | s | t | Leerzeichen | e | s | Leerzeichen | W | i | n | t | e | r | ? |

### Aufgabe 12: unsigned und signed {#a12}

001110 = 8 + 4 + 2 = **14** (unsigned) und **14** (signed). Das höchstwertige Bit ist 0, die Zahl ist also positiv und wird in beiden Darstellungen gleich gelesen.

### Aufgabe 13: Wortlänge 6 Bit (4 Punkte) {#a13}

- a) unsigned: **0 bis 63** (2<sup>6</sup> − 1 = 63).
- b) signed (Zweierkomplement): **−32 bis +31** (−2<sup>5</sup> bis 2<sup>5</sup> − 1).

### Aufgabe 9: Float (32 Bit, 4 Punkte) {#a9}

Vorzeichen 1 | Exponent 1000'0101 | Mantisse 011011000…

- Vorzeichen 1 bedeutet negativ.
- Exponent: 1000'0101<sub>2</sub> = 133. Abzüglich Bias 127 ergibt 6.
- Mantisse: mit der führenden 1 ist sie 1,011011.
- Komma um 6 Stellen nach rechts: 1011011<sub>2</sub> = 64 + 16 + 8 + 2 + 1 = 91.
- Ergebnis: **−91**.

### Aufgabe 10: Binärbrüche in Dezimalbrüche (2 Punkte) {#a10}

- 0.1101 = ½ + ¼ + 1/16 = **0.8125**
- 101.0111 = 4 + 1 + ¼ + ⅛ + 1/16 = **5.4375**

### Aufgabe 11: Dezimalbrüche in Binärbrüche (2 Punkte) {#a11}

- 6.25 = **110.01**. Vorkommateil 6 = 110. Nachkommateil: 0.25 · 2 = 0.5 (Ziffer 0), 0.5 · 2 = 1.0 (Ziffer 1).
- 0.33 = **0.0101010001** (10 Kommastellen). Nachkommateil wiederholt mit 2 multiplizieren und die Vorkommaziffer notieren: 0.66 → 0, 1.32 → 1, 0.64 → 0, 1.28 → 1, 0.56 → 0, 1.12 → 1, 0.24 → 0, 0.48 → 0, 0.96 → 0, 1.92 → 1. Die Folge bricht nicht ab; man hört nach der verlangten Stellenzahl auf.

## Teil 2: Hardware, Übertragung und Fehlererkennung {#teil2}

Theorie: [Hardware und Software]({{ "/lektionen/h0-theorie.html" | relative_url }}) und [Netzwerktechnik-Grundlagen]({{ "/lektionen/n0-theorie.html" | relative_url }}).

### Aufgabe 1: Was gehört nicht zur CPU? (1 Punkt) {#a1}

**B: Arbeitsspeicher (Random Access Memory).** ALU (Rechenwerk), Register und Cache-Speicher gehören zur CPU, der Arbeitsspeicher ist ein eigenes Bauteil.

### Aufgabe 14: Schnittstellen (2 Punkte) {#a14}

Typische Schnittstellen heutiger Computer sind **USB** (Universal Serial Bus), **Firewire**, **Ethernet** und **SATA** (Anschlüsse für externe Laufwerke). In der Prüfung genügen zwei Nennungen (1 Punkt je Schnittstelle).

### Aufgabe 17: Halbduplex (2 Punkte) {#a17}

Halbduplex bedeutet Verkehr in beiden Richtungen, aber zu einer bestimmten Zeit nur in eine Richtung. Der Übertragungskanal wird abwechslungsweise in beiden Richtungen genutzt. Beispiel: drahtlose Gegensprechanlagen. Zur Abgrenzung: Simplex ist nur eine Richtung, Vollduplex beide Richtungen gleichzeitig.

### Aufgabe 18: Modulationsarten (3 Punkte) {#a18}

**Amplitudenmodulation, Frequenzmodulation, Phasenmodulation.**

### Aufgabe 8: Hamming-Code (4 Punkte) {#a8}

Bitstrom 001'1011 hat die Bits p1 p2 d3 p4 d5 d6 d7 = 0 0 1 | 1 0 1 1.

| Prüfbit | Prüft | Rechnung | Ergebnis |
|---|---|---|---|
| p1 | d3 ⊕ d5 ⊕ d7 | 1 ⊕ 0 ⊕ 1 = 0 | richtig |
| p2 | d3 ⊕ d6 ⊕ d7 | 1 ⊕ 1 ⊕ 1 = 1 | falsch |
| p4 | d5 ⊕ d6 ⊕ d7 | 0 ⊕ 1 ⊕ 1 = 0 | falsch |

Falsch sind p2 und p4. Die Positionen addieren sich zu 2 + 4 = 6, also ist **d6 (Bit 6) fehlerhaft**. Es gibt nur ein Bit, das in p2 und p4, aber nicht in p1 vorkommt. Korrigierter Bitstrom: 001'1001.

### Aufgabe 24: BCC (6 Punkte) {#a24}

Sendedaten (ohne BCC): 10100010000. Gerechnet wird schriftlich im Binärsystem wie in der Prüfungslösung:

- 10100010000<sub>2</sub> = 1296 und 1101<sub>2</sub> = 13.
- 10100010000 : 1101 = **1100011** (= 99), Rest **1001** (= 9). Der Rest ist der 4-Bit-BCC.
- Sendedaten mit BCC: 10100010000 + 1001 = **101000100001001**.

Hinweis: Die Theorie zur zyklischen Blockprüfung rechnet die Division bitweise mit XOR (Modulo-2). Die Prüfungslösung zu dieser Aufgabe verwendet dagegen die gewöhnliche schriftliche Binärdivision mit Subtraktion und kommt auf den Rest 1001. Bei dieser Prüfungsaufgabe gilt die Lösung der Prüfung.

## Teil 3: IP-Nummern und Subnetting {#teil3}

Theorie: [IP-Netze und Subnetting]({{ "/lektionen/i0-theorie.html" | relative_url }}).

### Aufgabe 2: Welches Feld gehört nicht zum IP-Header? (1 Punkt) {#a2}

**B: Zielport.** Kopfprüfsumme, Fragmentabstand, Lebenszeit und Version sind Felder des IP-Headers. Ports gehören zum TCP- bzw. UDP-Header.

### Aufgabe 4: Welche Aussage über die IP-Nummer ist nicht korrekt? (1 Punkt) {#a4}

**D: «Eine IP-Nummer adressiert einen bestimmten Dienst im Internet.»** Einen Dienst adressiert die Portnummer. Die IP-Nummer adressiert ein Gerät in einem Netz (32 Bit, eingeteilt in Netz-ID und Host-ID, vergleichbar mit einer Postadresse).

### Aufgabe 25: Subnetting 64.25.X.X (6 Punkte) {#a25}

**a) Netmask.** Für 12 Subnetze brauche ich 4 zusätzliche Bit für die Netzadresse (2 Bit ergeben 4 Netze, 3 Bit ergeben 8 Netze, 4 Bit ergeben 16 Netze). Die ersten 16 Bit sind bereits als Netzadresse vorgegeben, dazu kommen 4 weitere Bit:

| 1. Byte | 2. Byte | 3. Byte | 4. Byte |
|---|---|---|---|
| 1111'1111 | 1111'1111 | 1111'0000 | 0000'0000 |
| 255 | 255 | 240 | 0 |

Netmask binär: **1111'1111.1111'1111.1111'0000.0000'0000**, dezimal: **255.255.240.0**.

**b) Anzahl Subnetze.** Mit 4 Bit sind **16 Subnetze** möglich (1 Bit ergibt 2, 2 Bit ergeben 4, 3 Bit ergeben 8, 4 Bit ergeben 16): 0000, 0001, 0010, 0011, 0100, 0101, 0110, 0111, 1000, 1001, 1010, 1011, 1100, 1101, 1110, 1111.

**c) Subnetz von 64.25.155.234.** Nur das 3. Byte ist wichtig: 155 = 1001'1011. Die ersten vier Bit (1001) sind die Subnetz-Nummer, die letzten vier Bit gehören zum Host. Das Subnetz ist **64.25.144.0 bis 64.25.159.255** (3. Byte von 1001'0000 = 144 bis 1001'1111 = 159, 4. Byte 0 bis 255).

## Teil 4: OSI-Modell, Protokolle und Netzwerkelemente {#teil4}

Theorie: [OSI-Modell, Router und Switch]({{ "/lektionen/r0-theorie.html" | relative_url }}).

### Aufgabe 3: TCP/IP (1 Punkt) {#a3}

**D: Transmission Control Protocol / Internet Protocol.**

### Aufgabe 19: Adressierung auf OSI-Layer 4 (1 Punkt) {#a19}

**Portadressierung:** Sie bestimmt, welcher Dienst angesprochen werden soll.

### Aufgabe 21: IP-Nummer und MAC-Adresse anzeigen (2 Punkte) {#a21}

**ipconfig /all** (in der Prüfungslösung als «ipconfig -all» geschrieben).

### Aufgabe 22: Die 7 Schichten des OSI-Modells (3.5 Punkte) {#a22}

| Schicht | Englisch | Deutsch |
|---|---|---|
| 7 | Application | Anwendung |
| 6 | Presentation | Darstellung |
| 5 | Session | Kommunikation |
| 4 | Transport | Transport |
| 3 | Network | Vermittlung |
| 2 | Data Link | Sicherung |
| 1 | Physical | Bitübertragung |

### Aufgabe 23: Aktive Netzwerkelemente (5 Punkte) {#a23}

| Durchlaufene Netzwerkschichten | Aktives Netzwerkelement |
|---|---|
| 1 bis 3 | Router |
| 1 bis 7 | Gateway |
| 1-3 | Router |
| 1 | Repeater |
| 1 bis 2 | Switch |

### Aufgabe 15: MAC-Adresse im Ethernet-Header (1 Punkt) {#a15}

**48 Bits** (6 Bytes).

### Aufgabe 16: Angaben im TCP-Header {#a16}

Zwei davon sind zu nennen. Im TCP-Header stehen, ungefähr nach Wichtigkeit geordnet: **Empfängerport, Senderport, Sequenznummer, Quittungsnummer, Datenabstand, Flags, Fenstergrösse, Prüfsumme, Urgent-Zeiger**.

### Aufgabe 20: Netztopologie (2 Punkte) {#a20}

Die Netztopologie ist die **physikalische Anordnung der Geräte im Netz**. Man unterscheidet Stern-, Bus- und Ring-Topologie.
