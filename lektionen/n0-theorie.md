---
lektion: 4
zielgruppe: sus
art: theorie
titel: "Theorie: Netzwerktechnik-Grundlagen"
kurz: "Kommunikation und Übertragungsarten, Übertragungsfehler und Hamming-Code, Blockprüfung (BCC) und Modulationsarten – zum Nachlesen vor oder nach den Checks."
reihenfolge: 10
---

# Theorie: Netzwerktechnik-Grundlagen

**Einheit 4 · zum Nachlesen vor oder nach den Checks**

<!--
  Stand dieser Angaben: 27.09.2026.
  Keine externen Zahlen oder Quellen: Grundlage sind die Vorlesungsfolien
  «Netzwerktechnik-Grundlagen 1» (HS 2025). Bei neuen Folien diesen Text
  gegenlesen. Die Zahlenbeispiele bei Hamming-Code und BCC sind eigene,
  in sich stimmige Beispiele (nicht identisch mit den Prüfungsaufgaben),
  damit hier die Methode geübt wird statt eine Lösung auswendig zu lernen.
-->

Jeder Abschnitt hier gehört zu einem Lernziel und zu genau einem Check. Sie können
also entweder zuerst hier lesen und dann den Check lösen, oder direkt mit dem Check
beginnen und bei Bedarf hierher zurückspringen — der Check verlinkt zurück auf den
passenden Abschnitt.

## Kommunikation und Übertragungsarten {#kommunikation}

Unter **Kommunikation** versteht man den Austausch von Informationen zwischen zwei
Partnern. Damit das funktioniert, brauchen die Partner zwei Dinge:

- eine **physische Verbindung** (ein Kabel, Funk, Licht …)
- ein **gemeinsames Protokoll** (eine Regel, wie die Daten interpretiert werden)

Ein **Netzwerk** ist ein Verbindungssystem zur Datenkommunikation, unabhängig vom
physischen Medium, mit dem Ziel, Ressourcen (Drucker, Internetzugang, Dateien …)
gemeinsam zu nutzen.

Bei jeder Übertragung stellen sich drei unabhängige Fragen:

**1. Austauschrichtung** — wer darf senden, wann?

| Betriebsart | Bedeutung | Beispiel |
|---|---|---|
| Simplex | Datentransfer nur in eine Richtung | Radio, Fernsehen |
| Halbduplex | beide Richtungen möglich, aber nicht gleichzeitig | Walkie-Talkie |
| Vollduplex | beide Richtungen gleichzeitig | Telefongespräch |

**2. Übertragungsweg** — wie viele Bits gleichzeitig?

- **Parallel:** mehrere Bits gleichzeitig über mehrere Leitungen (schnell, aber
  aufwändiger, die Leitungen müssen synchron bleiben)
- **Seriell:** die Bits werden nacheinander über eine einzige Leitung gesendet
  (heute der Normalfall, z. B. USB, Netzwerkkabel)

**3. Synchronisation** — woher weiss der Empfänger, wo ein Zeichen beginnt und endet?

- **Synchrone Übermittlung:** getaktet, fortlaufend, ohne Trennzeichen zwischen den
  Zeichen. Braucht einen aufwändigeren Handshake am Anfang, dafür ist die Latenz
  beschränkt — wichtig für Echtzeitsysteme.
- **Asynchrone Übermittlung:** die Zeichen werden unregelmässig gesendet (Beispiel:
  Tastatureingaben). Jedes Zeichen bekommt ein eigenes Start- und Stopp-Signal, damit
  der Empfänger weiss, wo es beginnt und endet.

**Dazu passender Check:** [n1 – Kommunikation und Übertragungsarten]({{ "/lektionen/n1-kommunikation-uebertragungsarten.html" | relative_url }})

## Übertragungsfehler und der Hamming-Code {#hamming}

### Ursachen und Arten von Übertragungsfehlern

Fehler entstehen durch **Rauschen** (eine dauernde Störgrösse, z. B. thermisch oder
materialbedingt, über das ganze System verteilt) oder durch **Kurzzeitstörungen**
(kurze elektrische Störimpulse oder kosmische Strahlung).

Man unterscheidet drei Fehlerarten:

- **Einzelfehler:** genau ein Bit ist falsch
- **Fehlerbündel (Burstfehler):** mehrere aufeinanderfolgende Bits sind falsch
- **Synchronisationsfehler:** Sender und Empfänger verlieren den gemeinsamen Takt

### Massnahmen im Überblick

| Massnahme | Redundanz | Idee |
|---|---|---|
| Echo | 100 % | Empfangene Daten werden zurückgeschickt und verglichen |
| Parity Check | 12.5 % | 1 Zusatzbit pro Byte, erkennt nur, *dass* ein Fehler da ist |
| Zyklische Blockprüfung (BCC) | < 1 % | siehe [nächster Abschnitt](#blockpruefung) |
| Hamming-Code | wenige Zusatzbits | erkennt **und lokalisiert** einen Einzelfehler |

Der grosse Vorteil des Hamming-Codes gegenüber einem einfachen Parity Check: Er sagt
nicht nur *dass* ein Bit falsch ist, sondern *welches* — der Fehler kann direkt
korrigiert werden, ohne die Daten nochmals anzufordern.

### So funktioniert der Hamming-Code

**Codierung (Sender):**

1. Die Bits des Codeworts werden von links nach rechts durchnummeriert: 1, 2, 3, 4, …
2. Die Positionen, die eine Zweierpotenz sind (1, 2, 4, 8, …), werden zu **Prüfbits**.
   Alle anderen Positionen enthalten die **Nutzdaten**.
3. Jedes Prüfbit an Position 2ⁿ ist das Paritätsbit für genau die Datenbits, deren
   Positionsnummer den Summanden 2ⁿ in ihrer Binärdarstellung enthält. Prüfbit 1
   (Position 1 = 2⁰) prüft also alle Positionen, deren Binärdarstellung an der
   letzten Stelle eine 1 hat (3, 5, 7, 9, …), Prüfbit 2 (Position 2 = 2¹) prüft alle
   Positionen mit einer 1 an der zweitletzten Stelle (3, 6, 7, 10, 11, …), und so
   weiter. Jedes Prüfbit wird so gewählt, dass die Summe (XOR) seiner Gruppe gerade
   ist (gerade Parität).

**Prüfung (Empfänger):** Für jede Prüfbit-Gruppe wird die Parität neu berechnet.
Stimmt sie nicht mehr, merkt sich der Empfänger die Nummer dieses Prüfbits.
Am Schluss addiert er die Nummern aller Prüfbits, deren Parität nicht mehr stimmte —
diese Summe **ist die Position des fehlerhaften Bits**.

**Durchgerechnetes Beispiel** (7 Bit: 3 Prüfbits an Position 1, 2, 4 und 4 Datenbits
an Position 3, 5, 6, 7 — Datenbits 1, 0, 1, 1):

| Position | 1 (P1) | 2 (P2) | 3 (D1) | 4 (P3) | 5 (D2) | 6 (D3) | 7 (D4) |
|---|---|---|---|---|---|---|---|
| Wert | 0 | 1 | 1 | 0 | 0 | 1 | 1 |

Gesendetes Codewort: `0110011`. Auf dem Weg kippt Bit 5 (0 → 1), empfangen wird also
`0110111`.

Der Empfänger prüft die drei Gruppen neu:

- P1 prüft Positionen 1, 3, 5, 7 → Werte 0, 1, 1, 1 → XOR = 1 → **stimmt nicht**
- P2 prüft Positionen 2, 3, 6, 7 → Werte 1, 1, 1, 1 → XOR = 0 → stimmt
- P3 prüft Positionen 4, 5, 6, 7 → Werte 0, 1, 1, 1 → XOR = 1 → **stimmt nicht**

Fehlerposition = Summe der Nummern der nicht stimmenden Prüfbits = 1 + 4 = **5**. Das
ist genau das Bit, das gekippt wurde — es wird zurück auf 0 korrigiert, und man erhält
wieder das ursprüngliche Codewort `0110011`.

**Dazu passender Check:** [n2 – Übertragungsfehler und Hamming-Code]({{ "/lektionen/n2-uebertragungsfehler-hamming.html" | relative_url }})

## Zyklische Blockprüfung (BCC) {#blockpruefung}

Bei der zyklischen Blockprüfung wird den Sendedaten ein **BCC (Block Check
Character)** angehängt. Die Idee: Man behandelt die Sendedaten als eine grosse
Binärzahl und dividiert sie durch eine vorher vereinbarte Zahl, den **Generator**
(auch Divisor genannt). Der **Rest** dieser Division ist der BCC.

Damit das aufgeht, wird gerechnet:

1. Hat der Generator *n* Bit, werden an die Sendedaten *n* − 1 Nullen angehängt.
2. Diese verlängerten Daten werden durch den Generator dividiert — aber nicht wie in
   der Schule, sondern **bitweise mit XOR statt Subtraktion** («Modulo-2-Division»):
   an jeder Stelle wird nur dann mit dem Generator XOR-verknüpft, wenn die führende
   Stelle der aktuellen Zwischensumme eine 1 ist.
3. Der Rest am Schluss (er hat *n* − 1 Bit) ist der BCC. Er ersetzt die vorher
   angehängten Nullen.

Der Empfänger macht dieselbe Division mit den empfangenen Daten **inklusive** BCC.
Geht die Division ohne Rest auf, gilt die Übertragung als fehlerfrei; bleibt ein Rest
übrig, wurde ein Fehler erkannt.

**Durchgerechnetes Beispiel:** Sendedaten `1101`, Generator `1011` (4 Bit, also werden
3 Nullen angehängt):

```
  1101000   (Sendedaten + 3 angehängte Nullen)
⊕ 1011
  ────────
  0110000   (erste 4 Stellen XOR Generator, da führende Stelle 1 war)
   1011     (nächste Stelle dazugenommen: 1100 → wieder führende 1)
   ────────
   0111
    1011    (nächste Stelle: 1110 → führende 1)
    ────────
    0101
     1011   (nächste Stelle: 1010 → führende 1)
     ────────
     0001
```

Der Rest ist `001` — das ist der BCC. Gesendet werden die ursprünglichen Daten mit
dem BCC statt der Nullen: `1101` + `001` = `1101001`.

**Dazu passender Check:** [n3 – Zyklische Blockprüfung (BCC)]({{ "/lektionen/n3-blockpruefung-bcc.html" | relative_url }})

## Modulationsarten {#modulation}

Ein **Modem** (Modulator/Demodulator) wandelt ein digitales Signal (0/1) in ein
analoges Signal um, das über eine analoge Leitung übertragen werden kann — und beim
Empfänger wieder zurück. Dazu wird eine Trägerfrequenz so verändert, dass sie die
digitalen Werte abbildet. Es gibt drei Grundformen:

- **AM (Amplitudenmodulation):** die *Amplitude* (Höhe) der Trägerwelle wird
  verändert.
- **FM (Frequenzmodulation):** die *Frequenz* der Trägerwelle wird verändert.
- **PM (Phasenmodulation):** die *Phase* der Trägerwelle wird verschoben.

Diese drei Grundformen lassen sich auch **kombinieren** (z. B. Phasen- und
Amplitudenmodulation gleichzeitig). Damit lassen sich pro Signalwechsel mehrere Bits
gleichzeitig übertragen — mit 4 Phasen und 2 Amplituden zum Beispiel 3 Bit auf einmal.

### WLAN-Frequenzbereiche

WLAN-Router (IEEE 802.11) senden hauptsächlich in zwei Frequenzbändern:

| Band | Bereich | Sendeleistung | Eigenschaft |
|---|---|---|---|
| 2,4 GHz | 2,4 – 2,4835 GHz | max. 0,1 W | grössere Reichweite, überlappungsfreie Kanäle: 1, 6, 11 |
| 5 GHz | 5,47 – 5,725 GHz | max. 0,2 W | geringere Reichweite, schnellere Datenübertragung |

Ein drittes Band um 60 GHz ist in Vorbereitung (noch schnellere Übertragung, aber
noch geringere Reichweite). Die meisten Router nutzen weiterhin vor allem das
2,4-GHz-Band, weshalb es dort häufiger zu Überlagerungen mit Nachbar-Netzen kommt.

**Dazu passender Check:** [n4 – Modulationsarten]({{ "/lektionen/n4-modulationsarten.html" | relative_url }})
