---
lektion: 2
zielgruppe: sus
art: theorie
titel: "Theorie: Hardware und Software"
kurz: "Aufbau eines PCs, Speicherhierarchie, der Von-Neumann-Rechner und Software/Compiler/VM – zum Nachlesen vor oder nach den Checks."
reihenfolge: 5
---

# Theorie: Hardware und Software

**Einheit 2 · zum Nachlesen vor oder nach den Checks**

<!--
  Stand dieser Angaben: 27.09.2026.
  Keine externen Zahlen oder Quellen: Grundlage sind die Vorlesungsfolien
  «Hardware und Software» (HS 2025/2026) sowie die Fakten, Begriffe und
  Musterlösungen, die bereits in den Checks H1–H4 stecken. Bei neuen Folien
  diesen Text gegenlesen.
-->

Jeder Abschnitt hier gehört zu einem Lernziel und zu genau einem Check. Sie können
also entweder zuerst hier lesen und dann den Check lösen, oder direkt mit dem Check
beginnen und bei Bedarf hierher zurückspringen — der Check verlinkt zurück auf den
passenden Abschnitt.

## Computersysteme und Aufbau eines PCs {#computersysteme}

Man unterscheidet zwei Arten von Computern:

- **Spezialcomputer:** für eine bestimmte Aufgabe gebaut (Spielkonsole, Steuergerät
  im Auto).
- **Universalcomputer:** kann beliebige Programme ausführen (Notebook, Desktop-PC,
  Clustercomputer).

### Die CPU

Die CPU (der Prozessor) besteht im Kern aus zwei Bestandteilen:

- **ALU (Arithmetical Logical Unit):** die Schaltung, die alle arithmetischen und
  logischen Operationen tatsächlich ausführt.
- **Register:** extrem schnelle Hilfsspeicherzellen, direkt mit der ALU verbunden.
  Sie liefern der ALU die Argumente und nehmen die Ergebnisse auf.

### Die Hauptplatine

Die **Hauptplatine** ist die zentrale Platine, auf der Prozessor, Speicher,
Schnittstellen und Steckplätze sitzen. Zwei Controller («Brücken») verteilen dort den
Datenverkehr:

- **Northbridge:** schneller Controller nahe am Prozessor, für den Datentransport zu
  schnellen Komponenten.
- **Southbridge:** langsamerer Controller für Festplatte, Tastatur, USB und Ähnliches.

Die **GPU** ist eine spezialisierte Recheneinheit für paralleles Abarbeiten vieler
gleichartiger Rechnungen — insbesondere Gleitkommaoperationen und die
Bildschirmdarstellung.

### Schnittstellen

Schnittstellen verbinden den PC mit Geräten, Laufwerken oder Netzwerken — Beispiele
sind USB, SATA, HDMI und LAN (Ethernet). Bauteile *innerhalb* des Prozessors (ALU)
oder Speicherarten (Cache) sind dagegen keine Schnittstellen nach aussen.

### Das Mooresche Gesetz

Das Mooresche Gesetz besagt, dass sich die **Anzahl Transistoren pro Prozessor
ungefähr alle zwei Jahre verdoppelt**. Es macht keine Aussage über Taktfrequenz,
Preis oder Chipfläche — es geht allein um die Packungsdichte der Transistoren auf
gleichbleibender Fläche.

**Dazu passender Check:** [h1 – Computersysteme und Aufbau eines PCs]({{ "/lektionen/h1-computersysteme-pc.html" | relative_url }})

## Speicher {#speicher}

Ein Computer verwendet verschiedene Speicherarten, die sich in einer klaren
Rangfolge anordnen lassen: **je näher am Prozessor, desto schneller, kleiner und
teurer** der Speicher.

| Rang | Speicherart | Eigenschaft |
|---|---|---|
| 1 (am schnellsten) | CPU-Cache | winzig, sehr teuer, direkt bei der CPU |
| 2 | Arbeitsspeicher (RAM) | schnell, flüchtig |
| 3 | Festplatte / SSD | gross, dauerhaft |
| 4 (am langsamsten) | Bandlaufwerk (Backup) | riesig, günstig, langsam |

### RAM und ROM

- **RAM (Random Access Memory):** *flüchtig* — der Inhalt geht beim Ausschalten
  verloren. «Random Access» heisst wahlfreier Zugriff: Jedes einzelne Byte kann
  direkt angesprochen werden, ohne die anderen der Reihe nach zu lesen.
- **ROM (Read Only Memory):** kann im normalen Betrieb nur gelesen, nicht
  beschrieben werden. Dort liegt **BIOS bzw. UEFI** gespeichert, damit der Rechner
  beim Einschalten immer und zuverlässig starten kann.

### Cache

Der **Cache** ist ein sehr schneller Pufferspeicher nahe bei der CPU. Er hält Kopien
häufig benötigter Daten, um Zugriffe auf den langsameren Arbeitsspeicher zu
vermeiden. Wie RAM ist er flüchtig — er dient der Beschleunigung, nicht der
dauerhaften Speicherung (dafür sind Festplatte/SSD und Bandlaufwerk da).

### Grössen und Übertragungszeiten rechnen

Für Aufgaben mit Speichergrössen und Übertragungsraten braucht es meist zwei Schritte:

1. Alles in dieselbe Einheit bringen — meist Bit, da Übertragungsraten oft in Bit/s
   angegeben werden, Speichergrössen aber in Byte (1 Byte = 8 Bit).
2. Bei binären Grössenangaben (kiB/MiB/GiB) mit Zweierpotenzen rechnen, bei
   Übertragungsraten (Mbit/s, Gbit/s) mit Zehnerpotenzen — das sind zwei
   unterschiedliche Systeme (siehe auch die Theorie zu [Bits, Bytes und
   Masseinheiten]({{ "/lektionen/z0-theorie.html#bits-bytes" | relative_url }})).

**Durchgerechnetes Beispiel:** Eine 500-MiByte-Datei wird über eine Leitung mit
100 Mbit/s übertragen (1 Mbit/s = 10⁶ Bit/s). Wie lange dauert das? Zuerst die
Dateigrösse in Bit: 500 · 1024 · 1024 · 8 = 4'194'304'000 Bit. Geteilt durch die
Rate: 4'194'304'000 ÷ 100'000'000 ≈ 41.9 Sekunden.

**Dazu passender Check:** [h2 – Speicher]({{ "/lektionen/h2-speicher.html" | relative_url }})

## Der Von-Neumann-Rechner {#vonneumann}

Das Rechnermodell von John von Neumann (1946) besteht aus genau vier
Funktionseinheiten:

- **Recheneinheit**
- **Steuereinheit**
- **Speicher**
- **Ein- und Ausgabeeinheit(en)**

Eine Grafikkarte oder ein Netzteil gehören *nicht* zum Grundmodell — sie sind keine
der vier definierten Funktionseinheiten.

### Das zentrale Prinzip

Der entscheidende Fortschritt der von-Neumann-Architektur: **Programme und Daten
liegen im selben Speicher.** Ein Programm ist damit nicht fest in die Hardware
verdrahtet, sondern liegt wie Daten als Folge von Bytes im Speicher — und ist
dadurch austauschbar, ohne den Rechner umzubauen.

### Der Von-Neumann-Zyklus

Jeder Befehl durchläuft fünf Phasen, immer in derselben Reihenfolge:

1. **Fetch** — der nächste Befehl wird aus dem Speicher geholt.
2. **Decode** — der Befehl wird entschlüsselt.
3. **Fetch Operands** — die Daten, mit denen gerechnet wird, werden aus Register
   oder Speicher geholt.
4. **Execute** — die ALU führt die Operation aus.
5. **Write Back** — das Ergebnis wird zurückgeschrieben.

Dieser Zyklus lebt bis heute weiter, zum Beispiel im RISC-Rechner mit den Phasen
**IF** (Instruction Fetch), **ID** (Instruction Decode), **EX** (Execute), **MEM**
(Speicherzugriff) und **WB** (Write Back) — dieselbe Grundidee, nur um eine
dedizierte Speicherphase ergänzt.

**Dazu passender Check:** [h3 – Der Von-Neumann-Rechner]({{ "/lektionen/h3-von-neumann.html" | relative_url }})

## Software, Compiler und virtuelle Maschinen {#software}

Software lässt sich in drei Stufen einteilen, je näher an der Hardware, desto tiefer
die Stufe:

| Stufe | Beispiele | Aufgabe |
|---|---|---|
| Low level | BIOS / UEFI | startet als Erstes, prüft die Hardware, startet das Betriebssystem |
| Level 2 | Windows, Linux, Android | bindet die Hardware-Komponenten ein (Betriebssystem) |
| Level 3 | Excel, Outlook, Webbrowser | Anwendungsprogramme |

### BIOS und UEFI

BIOS und UEFI sind **Low-Level-Software (Firmware)**, im **ROM** gespeichert. Sie
laufen beim Einschalten *vor* dem Betriebssystem, prüfen die Hardware und starten
dann das Betriebssystem. UEFI ist der modernere Nachfolger des BIOS: Es unterstützt
grössere Festplatten und startet schneller.

### Compiler, Interpreter, Parser

- **Compiler:** übersetzt den gesamten Programmcode *vorab*, in einem Schritt vor
  der Ausführung, in prozessorfähigen Code (Maschinensprache/Assembler).
- **Interpreter:** setzt die Befehle direkt *zur Laufzeit* um, ohne vorherigen
  Übersetzungsschritt (Beispiel: JavaScript im Webbrowser).
- **Parser:** prüft den Programmcode auf formale Richtigkeit und meldet Fehler
  («to parse» heisst analysieren).

### Virtuelle Maschine (VM)

Eine **virtuelle Maschine** ist ein virtueller Computer, der vollständig aus
Software besteht («virtuell» heisst nachgebildet, nicht real vorhanden). Damit
lassen sich zum Beispiel Anwendungen eines anderen Betriebssystems ausführen, ohne
den Rechner neu zu starten.

### Eigene Hardware oder Standard-Hardware mit eigener Software?

Bei kleinen Stückzahlen und sich häufig ändernden Anforderungen ist meist
**Standard-Hardware mit eigener Software** die bessere Wahl: Software lässt sich
jederzeit anpassen, während eigene Hardware nach der Fertigung nicht mehr
veränderbar ist und sich die Produktionskosten bei kleinen Serien nicht amortisieren.

**Dazu passender Check:** [h4 – Software, Compiler und virtuelle Maschinen]({{ "/lektionen/h4-software-compiler-vm.html" | relative_url }})
