---
lektion: 6
zielgruppe: sus
art: theorie
titel: "Theorie: IP-Netze und Subnetting"
kurz: "Paket- und Leitungsvermittlung, IP-Adresse und Netzmaske, Adressknappheit (private Adressen, DHCP, NAT, IPv6), Subnetting, IP-Header und Fragmentierung – zum Nachlesen vor oder nach den Checks."
reihenfolge: 10
---

# Theorie: IP-Netze und Subnetting

**Einheit 6 · zum Nachlesen vor oder nach den Checks**

<!--
  Stand dieser Angaben: 10.10.2026.
  Keine externen Zahlen oder Quellen: Grundlage sind die Vorlesungsfolien
  «Grundlagen IP-Netze» und «IP-Nummern / IP-Subnetting» (HS 2025) sowie die
  Übungsaufgaben IP-Subnetting 1–3. Bei neuen Folien diesen Text gegenlesen.
  Die Zahlenbeispiele sind eigene, per Skript nachgerechnete Beispiele. Sie
  unterscheiden sich bewusst von den Folien, den Übungsaufgaben, den Checks
  und der formativen Prüfung, damit hier die Methode geübt wird.
  Abweichung von den Folien: Der zweite private Adressbereich endet bei
  172.31.255.255 (auf der Folie steht 173.31.255.255, ein Tippfehler).
-->

Jeder Abschnitt hier gehört zu einem Lernziel. Zu den Abschnitten 2 bis 5 gibt es je
einen Check. Sie können also entweder zuerst hier lesen und dann den Check lösen,
oder direkt mit dem Check beginnen und bei Bedarf hierher zurückspringen — der Check
verlinkt zurück auf den passenden Abschnitt. Der erste Abschnitt ist die Einleitung
und hat keinen eigenen Check.

## Datenverkehr im Internet: Paket- und Leitungsvermittlung {#vermittlung}

Im Internet reisen Daten nicht als Ganzes, sondern in kleinen **Datenpaketen**. Für
den Weg vom Sender zum Empfänger braucht es drei Dinge:

- ein **Protokoll** (die gemeinsame Regel, z. B. `https`)
- **Wegweiser**: die **Router**, die jedes Paket in Richtung Ziel weiterreichen
- eine **Adresse**: die **IP-Adresse** (auch IP-Nummer genannt)

Jedes Datenpaket besteht aus zwei Teilen: dem **Paketheader** (Sender- und
Empfängeradresse, Lebenszeit, Paketgrösse, Version …) und dem **Datenteil**.

Es gibt zwei grundsätzlich verschiedene Arten, Daten durch ein Netz zu schicken:

| | Leitungsvermittlung | Paketvermittlung |
|---|---|---|
| Englisch | Circuit Switched Data Network | Packet Switched Data Network |
| Prinzip | Für die Dauer der Verbindung wird ein fester Weg reserviert. | Die Daten werden in Pakete zerlegt; jedes Paket sucht sich seinen Weg einzeln. |
| Bandbreite | fest reserviert, also garantiert | wird mit allen anderen geteilt, also nicht garantiert |
| Übertragungsgeschwindigkeit | gleichmässig | schwankt je nach Auslastung |
| Netzauslastung | schlecht: die Leitung ist auch in Sprechpausen belegt | gut: freie Kapazität nutzen andere Pakete |
| Beispiel | klassisches Telefonnetz | Internet |

Weil bei der Paketvermittlung nichts garantiert ist, braucht es für heikle
Anwendungen eine Steuerung: Mit **QoS (Quality of Service)** werden bestimmte Pakete
(z. B. Sprache) bevorzugt behandelt.

**VoIP (Voice over IP)** ist die Internet-Telefonie, also das Telefonieren über
IP-Netzwerke. Weil die Übertragungskanäle immer leistungsfähiger wurden, lässt sich
mit einer schnellen Paketvermittlung «praktisch eine Leitungsvermittlung» nachbilden.
Der Vorteil: Es braucht kein eigenes Telefonnetz mehr, Sprache läuft über dasselbe
Netz wie alle anderen Daten. Beispiele sind WhatsApp-Anrufe, Microsoft Teams, Zoom
oder Signal.

**Durchgespieltes Beispiel:** Sie schicken einer Kollegin ein Foto. Ihr Gerät zerlegt
das Foto in einige hundert Pakete und schreibt in jeden Paketheader die eigene
Adresse und die Adresse der Kollegin. Paket 17 läuft über die Router in Zürich und
Frankfurt, Paket 18 nimmt wegen einer Überlastung den Weg über Genf. Beide kommen an,
und das Gerät der Kollegin setzt alle Pakete wieder in der richtigen Reihenfolge
zusammen. Bei einem Anruf im alten Telefonnetz wäre dagegen für die ganze Dauer des
Gesprächs eine Leitung nur für Sie beide reserviert gewesen, auch während niemand
spricht.

## Die IP-Adresse und die Netzmaske {#ip-adresse}

Eine IP-Adresse lässt sich mit einer Postadresse vergleichen: Die Postadresse wird
von den Postangestellten gelesen, die IP-Adresse von den Routern, und das Paket wird
entsprechend weitergeleitet.

### Aufbau: 32 Bit in 4 Bytes

Eine IPv4-Adresse besteht aus **32 Bit**. Man schreibt sie als **4 Bytes in
Dezimalschreibweise**, getrennt durch Punkte. Jedes Byte kann die Werte `0000'0000`
bis `1111'1111` annehmen, dezimal also 0 bis 255. Die Stellenwerte eines Bytes sind
von links nach rechts 128, 64, 32, 16, 8, 4, 2, 1.

**Durchgerechnetes Beispiel:** Die Adresse `172.20.9.200` binär:

| Byte | Dezimal | Zerlegung | Binär |
|---|---|---|---|
| 1 | 172 | 128 + 32 + 8 + 4 | `1010'1100` |
| 2 | 20 | 16 + 4 | `0001'0100` |
| 3 | 9 | 8 + 1 | `0000'1001` |
| 4 | 200 | 128 + 64 + 8 | `1100'1000` |

Binär lautet die Adresse also `1010'1100.0001'0100.0000'1001.1100'1000`.

### Netzteil und Hostteil

Jede IP-Adresse enthält zwei Teile:

- den **Netzteil** (welches Netz wird angesprochen?), er steht immer **vorne**
- den **Hostteil** (welcher Rechner in diesem Netz?)

Aus wie vielen Bit der Netzteil besteht, wird auf zwei Arten angegeben, die dasselbe
bedeuten:

- **IP-Adresse / Anzahl Bit**, z. B. `172.20.9.200 / 16`
- **IP-Adresse und Netzmaske (Netmask)**, z. B. `172.20.9.200` und `255.255.0.0`

Die Netzmaske hat überall dort eine **1**, wo der Netzteil steht, und überall dort
eine **0**, wo der Hostteil steht. Die drei Standard-Netzmasken:

| Schreibweise | Netzmaske | Netzteil | Hostteil |
|---|---|---|---|
| / 8 | 255.0.0.0 | 1 Byte | 3 Bytes |
| / 16 | 255.255.0.0 | 2 Bytes | 2 Bytes |
| / 24 | 255.255.255.0 | 3 Bytes | 1 Byte |

Im Hostteil dürfen zwei Kombinationen nicht an Rechner vergeben werden: **alle Bits
auf 0** (bezeichnet das Netz selbst) und **alle Bits auf 1** (Broadcast, also «an
alle in diesem Netz»). Mit *h* Hostbits lassen sich darum **2<sup>h</sup> − 2**
Rechner adressieren.

**Durchgerechnetes Beispiel:** `172.20.9.200 / 16`

- Netzmaske: 16 Einsen, dann 16 Nullen → `255.255.0.0`
- Netzteil: `172.20`, Hostteil: `9.200`
- Hostbits: 32 − 16 = 16 → 2<sup>16</sup> − 2 = 65'534 adressierbare Rechner

### Wozu dient die Netzmaske?

Mit der Netzmaske stellt ein Rechner fest, ob die Zieladresse **im selben Netz**
liegt: Er vergleicht den Netzteil der Zieladresse mit dem eigenen Netzteil.

- Gleicher Netzteil → Das Ziel liegt im selben Netz, das Paket wird direkt zugestellt.
- Anderer Netzteil → Das Paket geht an den **Router**, der es weiterleitet (routen).

**Durchgerechnetes Beispiel:** Ihr Rechner hat `172.20.9.200` mit Netzmaske
`255.255.0.0`, der eigene Netzteil ist also `172.20`.

- Ziel `172.20.77.3` → Netzteil `172.20` → gleich → direkt zustellen
- Ziel `172.21.9.200` → Netzteil `172.21` → verschieden → an den Router

Beachten Sie: Die zweite Zieladresse sieht der eigenen sehr ähnlich. Entscheidend
ist aber nur der Netzteil.

**Dazu passender Check:** [I1 – IP-Adresse und Netzmaske]({{ "/lektionen/i1-ip-adresse-netzmaske.html" | relative_url }})

## Adressknappheit: private Adressen, DHCP, NAT und IPv6 {#knappheit}

Mit 32 Bit gibt es 2<sup>32</sup>, also rund 4,3 Milliarden IPv4-Adressen. Das
reicht nicht für alle Geräte der Welt: Die letzten Adressblöcke sind zugeteilt.
Vier Massnahmen sorgen dafür, dass das Internet trotzdem funktioniert.

### 1. Private Adressen

Drei Adressbereiche werden im Internet **nicht geroutet**. Sie dürfen deshalb in
beliebig vielen internen Netzen gleichzeitig verwendet werden (Private Address Space):

| Bereich | von | bis |
|---|---|---|
| 10er-Netz | 10.0.0.0 | 10.255.255.255 |
| 172er-Netze | 172.16.0.0 | 172.31.255.255 |
| 192.168er-Netze | 192.168.0.0 | 192.168.255.255 |

### 2. DHCP (Dynamic Host Configuration Protocol)

DHCP vergibt IP-Adressen **automatisch**. Niemand muss mehr jedem Gerät von Hand
eine Adresse eintragen. Damit das Netz auch bei einem Ausfall weiterläuft, lässt
DHCP mehrere Server zu.

- **Dynamische Zuweisung:** Das Gerät erhält die ganze Konfiguration (IP-Adresse,
  Netzmaske …) nur für eine bestimmte Zeit, die **Lease-Dauer** (typisch 24 Stunden).
  Danach kann die Adresse an ein anderes Gerät gehen.
- **Manuelle Zuweisung:** Der DHCP-Server führt eine Tabelle «MAC-Adresse →
  IP-Adresse». Ein Gerät erhält so immer dieselbe Adresse, und nur bekannte Geräte
  bekommen überhaupt eine.

Die Vergabe läuft in **4 Phasen** ab:

| Phase | Nachricht | Wer sendet? | Inhalt |
|---|---|---|---|
| 1. Anforderung | DHCP-DISCOVER | Client (an alle, als Broadcast) | «Ich brauche eine Konfiguration.» |
| 2. Angebot | DHCP-OFFER | jeder DHCP-Server | «Diese Adresse könnten Sie haben.» |
| 3. Auswahl | DHCP-REQUEST | Client | «Ich nehme das erste Angebot.» |
| 4. Bestätigung | DHCP-ACK | DHCP-Server | «Bestätigt, hier sind alle Parameter.» |

### 3. NAT und NAPT

Bei **NAT (Network Address Translation)** ersetzt der Router beim Verlassen des
eigenen Netzes die interne (private) Adresse durch eine «echte», routbare Adresse.
Welche interne Adresse zu welcher Verbindung gehört, merkt er sich in der
**NAT-Tabelle**.

- **Klassisches NAT:** *m* offizielle Adressen stehen *n* Rechnern mit privaten
  Adressen zur Verfügung. Es sind höchstens *m* Verbindungen nach aussen gleichzeitig
  möglich.
- **NAPT (Network Address Port Translation):** Es genügt **eine einzige** offizielle
  Adresse. Der Router unterscheidet die Verbindungen über die **Portnummer** (Nummern
  über 1024 bis 2<sup>16</sup>). So laufen Tausende Verbindungen gleichzeitig über
  eine Adresse. Das ist die Lösung in praktisch jedem Heimnetz.

**Durchgespieltes Beispiel (NAPT):** Ihr Router hat nach aussen die Adresse
`203.0.113.9`. Laptop und Handy rufen gleichzeitig eine Webseite auf.

| Gerät | intern (Adresse : Port) | nach aussen (Adresse : Port) |
|---|---|---|
| Laptop | 192.168.1.23 : 51000 | 203.0.113.9 : 40001 |
| Handy | 192.168.1.24 : 51000 | 203.0.113.9 : 40002 |

Die Antwort des Webservers geht an `203.0.113.9`. Kommt sie auf Port 40002 an,
schlägt der Router in der Tabelle nach und leitet sie an das Handy weiter.

### 4. IPv6

Wegen der Adressknappheit wurde der Adressbereich von 32 auf **128 Bit** erweitert.
Weitere Vorteile von IPv6: Die Sicherheit ist eingebaut (**IPsec**), der
Protokollrahmen wurde vereinfacht, und Techniken wie **Quality of Service** und
**Multicast** werden unterstützt.

Eine IPv6-Adresse wird **hexadezimal** in **8 Blöcken zu je 16 Bit** notiert,
getrennt durch Doppelpunkte. Zwei Regeln kürzen die Schreibweise:

1. **Führende Nullen** in einem Block dürfen weggelassen werden.
2. **Aufeinanderfolgende Blöcke mit dem Wert 0** dürfen durch zwei Doppelpunkte
   `::` ersetzt werden (nur einmal pro Adresse).

**Durchgerechnetes Beispiel:**

- vollständig: `2001:0db8:0000:0000:0000:0000:0042:0c01`
- nach Regel 1: `2001:db8:0:0:0:0:42:c01`
- nach Regel 2: `2001:db8::42:c01`

Achtung: Nur **führende** Nullen fallen weg. Aus `0c01` wird `c01`, die Null in der
Mitte bleibt.

**Dazu passender Check:** [I2 – Private Adressen, DHCP, NAT und IPv6]({{ "/lektionen/i2-adressknappheit-dhcp-nat-ipv6.html" | relative_url }})

## Subnetting {#subnetting}

Unterteilt man ein Netzwerk in zwei oder mehr kleinere Netzwerke, nennt man das
**Subnetting**. Gründe sind zum Beispiel die Sicherheit (jede Abteilung erhält ein
eigenes Netz) oder kleinere Broadcast-Bereiche.

Die Idee: Man **verlängert den Netzteil** um einige Bits, die bisher zum Hostteil
gehörten. **Mit jedem zusätzlichen Netz-Bit verdoppelt sich die Anzahl der Netze**,
dafür halbiert sich die Anzahl der Adressen pro Netz.

| zusätzliche Netz-Bits | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| Anzahl Subnetze | 2 | 4 | 8 | 16 | 32 | 64 |

### Das Rezept

1. Festlegen, **wie viele Netze** benötigt werden.
2. **«Anzahl der Netze − 1» binär schreiben.** Die Anzahl Stellen dieser Binärzahl
   ist die Anzahl der zusätzlich benötigten Netz-Bits.
3. Diese Bits zum Netzteil **dazuzählen**: In der Netzmaske werden entsprechend viele
   weitere Stellen auf 1 gesetzt.
4. Die Netzmaske wieder **dezimal** schreiben.

Für die Subnetz-Bereiche zählt man die neuen Netz-Bits binär hoch (000, 001, 010 …).
Die erste Adresse eines Subnetzes hat alle Hostbits auf 0, die letzte alle auf 1.

### Durchgerechnetes Beispiel 1: Subnetze im letzten Byte

Das Netz `192.168.50.0 / 24` soll in **10 Subnetze** unterteilt werden.

1. Benötigt: 10 Netze.
2. 10 − 1 = 9 = `1001`₂ → **4 Bit** (mit 3 Bit gäbe es nur 8 Netze).
3. Neuer Netzteil: 24 + 4 = 28 Bit →
   `1111'1111.1111'1111.1111'1111.1111'0000`
4. Dezimal: 128 + 64 + 32 + 16 = 240 → Netzmaske **255.255.255.240**, also
   `192.168.50.0 / 28`.

Tatsächlich realisierbar sind 2<sup>4</sup> = **16 Subnetze**. Für den Hostteil
bleiben 4 Bit: 2<sup>4</sup> = 16 Adressen pro Subnetz, davon 16 − 2 = **14** für
Rechner nutzbar.

| Netz-Bits | Bereich |
|---|---|
| `0000` | 192.168.50.0 bis 192.168.50.15 |
| `0001` | 192.168.50.16 bis 192.168.50.31 |
| `0010` | 192.168.50.32 bis 192.168.50.47 |
| … | … |
| `1111` | 192.168.50.240 bis 192.168.50.255 |

**In welchem Subnetz liegt `192.168.50.107`?** Das letzte Byte binär: 107 =
`0110'1011`. Die ersten 4 Bit (`0110`) sind Netz-Bits.

- Hostbits alle 0: `0110'0000` = 96
- Hostbits alle 1: `0110'1111` = 111

Die Adresse liegt im Subnetz **192.168.50.96 bis 192.168.50.111**.

### Durchgerechnetes Beispiel 2: Subnetze im dritten Byte

Der Adressbereich `172.30.X.X` (also `/ 16`) soll in **6 Subnetze** unterteilt werden.

1. Benötigt: 6 Netze.
2. 6 − 1 = 5 = `101`₂ → **3 Bit**.
3. Neuer Netzteil: 16 + 3 = 19 Bit →
   `1111'1111.1111'1111.1110'0000.0000'0000`
4. Dezimal: 128 + 64 + 32 = 224 → Netzmaske **255.255.224.0**.

Realisierbar sind 2<sup>3</sup> = **8 Subnetze**. Für den Hostteil bleiben 13 Bit:
2<sup>13</sup> − 2 = 8190 Rechner pro Subnetz.

**In welchem Subnetz liegt `172.30.141.9`?** Entscheidend ist jetzt das **dritte**
Byte: 141 = `1000'1101`. Die ersten 3 Bit (`100`) sind Netz-Bits.

- Hostbits alle 0: `1000'0000` = 128, viertes Byte 0
- Hostbits alle 1: `1001'1111` = 159, viertes Byte 255

Die Adresse liegt im Subnetz **172.30.128.0 bis 172.30.159.255**.

**Dazu passender Check:** [I3 – Subnetting]({{ "/lektionen/i3-subnetting.html" | relative_url }})

## IP-Header, Fragmentierung und Portnummern {#header-fragmentierung}

### Der IP-Protokollkopf (IP-Header)

Vor jedem Datenteil steht der IP-Header. Er ist normalerweise **20 Byte** lang und
enthält diese Felder:

| Feld | Bedeutung |
|---|---|
| Version | IP-Version des Pakets (4 oder 6) |
| Länge | Länge des Headers |
| Servicetypen | Angaben zur Behandlung des Pakets (Priorität, QoS) |
| Paketlänge | Länge des ganzen Pakets (Header und Daten) |
| Identifikation | Nummer des Pakets: Alle Fragmente desselben Pakets tragen dieselbe Nummer. |
| DF / MF | zwei Flags: *Don't Fragment* (darf nicht zerlegt werden) und *More Fragments* (es folgen weitere Fragmente) |
| Fragmentabstand | Position des Fragments im ursprünglichen Paket (Fragment-Offset) |
| Lebenszeit | Jeder Router zählt diesen Wert um 1 herunter. Bei 0 wird das Paket verworfen, damit es nicht endlos im Netz kreist. |
| Transport | Welches Transportprotokoll die Daten erhält (z. B. TCP oder UDP) |
| Kopfprüfsumme | Prüfsumme über den Header, erkennt Übertragungsfehler im Header |
| Senderadresse | IP-Adresse des Senders (32 Bit) |
| Empfängeradresse | IP-Adresse des Empfängers (32 Bit) |
| Optionen, Füllzeichen | selten gebrauchte Zusatzangaben, aufgefüllt auf ganze 32 Bit |

Weil die beiden Adressfelder je 32 Bit breit sind, sieht man am Header direkt, dass
eine IPv4-Adresse aus 32 Bit besteht.

### MTU und Fragmentierung

Netzwerke können nicht beliebig grosse Pakete transportieren. Die Obergrenze heisst
**MTU (Maximum Transfer Unit)**:

| Netzwerktyp | MTU |
|---|---|
| Token Ring | 17'914 Byte |
| Ethernet | 1500 Byte |
| IEEE 802.3 | 1492 Byte |
| X.25 | 576 Byte |

Ist ein Paket grösser als die MTU des nächsten Netzes, zerlegt es der Router in
**Fragmente**. Dabei geschieht Folgendes:

- Das **MF-Bit** wird bei allen Fragmenten ausser dem letzten auf **1** gesetzt.
- Das Feld **Paketlänge** wird neu eingetragen.
- Das Feld **Fragmentabstand** (Fragment-Offset) erhält einen Wert.
- Die **Kopfprüfsumme** wird neu berechnet.

Der **Fragment-Offset** gibt an, an welche Stelle des ursprünglichen Pakets ein
Fragment gehört. Damit setzt der Zielrechner die Fragmente wieder zusammen, auch wenn
sie in falscher Reihenfolge eintreffen. Der Offset wird in **Einheiten von 8 Byte**
gezählt:

> Nummer des ersten Datenbytes = Fragment-Offset · 8

Deshalb muss die Datenlänge aller Fragmente ausser dem letzten ein Vielfaches von
8 Byte sein. Das Feld ist 13 Bit breit, es sind also höchstens 2<sup>13</sup> = 8192
Fragmente pro Paket möglich.

**Durchgerechnetes Beispiel:** Ein Paket mit 1200 Byte Daten (Bytes 0 bis 1199) wird
in drei Fragmente zu je 400 Byte Daten zerlegt.

| Fragment | Datenbytes | MF-Bit | Fragment-Offset |
|---|---|---|---|
| 1 | 0 … 399 | 1 | 0 |
| 2 | 400 … 799 | 1 | 400 : 8 = 50 |
| 3 | 800 … 1199 | 0 | 800 : 8 = 100 |

Kommt beim Empfänger zuerst das Fragment mit Offset 100 und MF = 0 an, weiss er: Das
ist das letzte Stück, es beginnt bei Byte 800, und davor fehlt noch etwas.

### Portnummern

Die IP-Adresse führt ein Paket zum richtigen **Rechner**. Auf diesem Rechner laufen
aber viele Programme gleichzeitig. Welches Programm (welcher **Dienst**) die Daten
erhält, bestimmt die **Portnummer** auf der Transportebene (TCP oder UDP).

- Eine Portnummer ist eine **16-Bit-Zahl**.
- **IP-Adresse + Portnummer = Socket.**
- Portnummern ab 1024 stehen für eigene (proprietäre) Anwendungen zur Verfügung;
  darunter liegen die bekannten Dienste (*Well-Known Ports*):

| Dienst | Portnummer |
|---|---|
| FTP (Dateiübertragung) | 20, 21 |
| Telnet | 23 |
| SMTP (E-Mail versenden) | 25 |
| WWW (HTTP) | 80 |
| POP3 (E-Mail abholen) | 110 |
| IMAP (E-Mail abholen) | 143 |

**Durchgespieltes Beispiel:** Auf dem Server `198.51.100.80` laufen ein Webserver
und ein Mailserver. Ein Paket an den Socket `198.51.100.80 : 80` landet beim
Webserver, ein Paket an `198.51.100.80 : 25` beim Mailserver. Die IP-Adresse ist
beide Male dieselbe, erst der Port wählt den Dienst.

**Dazu passender Check:** [I4 – IP-Header, Fragmentierung und Portnummern]({{ "/lektionen/i4-ip-header-fragmentierung-ports.html" | relative_url }})
