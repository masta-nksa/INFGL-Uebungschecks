---
lektion: 7
zielgruppe: sus
art: theorie
titel: "Theorie: OSI-Modell, Router und Switch"
kurz: "Die sieben OSI-Schichten, TCP/IP und HTTP, Netzarten und Topologien, Repeater, Hub, Switch, Router und Gateway sowie die wichtigsten Netzwerk-Kommandos – zum Nachlesen vor oder nach den Checks."
reihenfolge: 10
---

# Theorie: OSI-Modell, Router und Switch

**Einheit 7 · zum Nachlesen vor oder nach den Checks**

<!--
  Stand dieser Angaben: 10.10.2026.
  Keine externen Zahlen oder Quellen: Grundlage sind die Vorlesungsfolien
  «OSI-Layer» und «Aktive Netzwerkelemente» (HS 2025), das Blatt
  «Beschreibung OSI-Layer» und die Netzwerk-Übung «Arbeiten mit
  System-Kommandos». Bei neuen Folien diesen Text gegenlesen.
  Die Szenarien und Ausgaben (Adresstabelle, ipconfig, tracert) sind eigene,
  erfundene Beispiele und unterscheiden sich von jenen in den Checks.
-->

Jeder Abschnitt hier gehört zu einem Lernziel und zu genau einem Check. Sie können
also entweder zuerst hier lesen und dann den Check lösen, oder direkt mit dem Check
beginnen und bei Bedarf hierher zurückspringen — der Check verlinkt zurück auf den
passenden Abschnitt.

## Das OSI-Referenzmodell {#osi}

### Die Idee: Schichten

Ein Kaninchenzüchter in der Schweiz möchte sich mit einem Kaninchenzüchter in China
austauschen. Keiner spricht die Sprache des anderen. Beide haben aber je einen
Übersetzer (Deutsch–Englisch und Englisch–Chinesisch) und ein Faxgerät.

- Die **Züchter** kümmern sich nur um den Inhalt (Kaninchen).
- Die **Übersetzer** kümmern sich nur um die gemeinsame Sprache (Englisch).
- Die **Faxgeräte** kümmern sich nur um die Übertragung (`01011010`).

Jede Ebene erledigt genau eine Aufgabe und verlässt sich darauf, dass die Ebene
darunter ihre Arbeit macht. Der Züchter muss nicht wissen, wie ein Fax funktioniert.
Genau so ist die Kommunikation in Netzwerken aufgebaut, nur mit sieben Schichten
(Layer). Dieses Modell heisst **OSI-Referenzmodell** (auch ISO/OSI-Modell).

### Die sieben Schichten

| Nr. | Englisch | Deutsch | Aufgabe | Beispiele |
|---|---|---|---|---|
| 7 | Application | Anwendung | Schnittstelle zu den Programmen, die der Benutzer steuert | E-Mail-Programm, Browser, Telnet |
| 6 | Presentation | Darstellung | Datenformate übersetzen, systembedingte Zeichen umsetzen, verschlüsseln und komprimieren | Zeichencodes |
| 5 | Session | Kommunikation (Sitzung) | Sitzungen auf- und abbauen, Art der Verbindung festlegen (Duplex), Verhalten bei Fehlern, Synchronisation | |
| 4 | Transport | Transport | fehlergesicherte Datenübertragung zwischen zwei Programmen | TCP (verbindungsorientiert), UDP (verbindungslos) |
| 3 | Network | Vermittlung | Pakete adressieren und den Weg zum Ziel finden (Routing) | IP |
| 2 | Data Link | Sicherung | Bitstrom in Rahmen (Frames) aufteilen, Prüfsumme, Datenflusskontrolle | Ethernet |
| 1 | Physical | Bitübertragung | physikalische Verbindung bereitstellen: Bits als Signale übertragen | Kupferkabel, Glasfaser, Luft (Funk) |

Zwei Merksätze für die Reihenfolge der englischen Namen:

- von unten nach oben (1 → 7): «**P**lease **D**o **N**ot **T**hrow **S**ausage
  **P**izza **A**way»
- von oben nach unten (7 → 1): «**A**ll **P**eople **S**eem **T**o **N**eed **D**ata
  **P**rocessing»

Jede Schicht stellt der Schicht direkt darüber einen **Dienst** zur Verfügung:
Schicht *n* arbeitet für Schicht *n* + 1.

### Adressen auf den Schichten

Drei Schichten haben eine eigene Art von Adresse:

| Schicht | Adresse | adressiert |
|---|---|---|
| 4 Transport | Portnummer (16 Bit) | einen Dienst (ein Programm) auf dem Rechner |
| 3 Vermittlung | IP-Adresse (32 Bit bei IPv4) | einen Rechner in einem Netz, weltweit |
| 2 Sicherung | MAC-Adresse (48 Bit) | eine Netzwerkkarte im lokalen Netz |

### Kapselung: Jede Schicht fügt einen Header hinzu

Beim **Senden** wandern die Daten von Schicht 7 nach unten. Jede Schicht stellt den
Daten ihren eigenen **Header** (H) mit ihren Steuerinformationen voran. Die
Sicherungsschicht hängt zusätzlich einen **Trailer** (T) an. Schicht 1 überträgt das
Ganze als Bitfolge.

```
Schicht 7   Daten
Schicht 4   H4 | Daten
Schicht 3   H3 | H4 | Daten
Schicht 2   H2 | H3 | H4 | Daten | T
Schicht 1   0101101001110…
```

Die Schichten 6 und 5 setzen ebenfalls je einen Header davor; sie sind in der
Skizze der Übersicht halber weggelassen.

Beim **Empfangen** läuft es umgekehrt: Jede Schicht liest und entfernt «ihren»
Header und reicht den Rest nach oben.

**Durchgespieltes Beispiel:** Sie rufen im Browser eine Webseite auf.

1. Schicht 7: Der Browser formuliert die Anfrage (HTTP).
2. Schicht 4: TCP setzt seinen Header davor, mit dem Empfängerport 80 (Dienst WWW).
3. Schicht 3: IP setzt seinen Header davor, mit Sender- und Empfängeradresse.
4. Schicht 2: Die Netzwerkkarte verpackt alles in einen Frame mit MAC-Adressen und
   Prüfsumme.
5. Schicht 1: Der Frame geht als elektrisches Signal, Licht oder Funk auf die Reise.

Beim Webserver wird in umgekehrter Reihenfolge ausgepackt, bis die Anfrage beim
Webserver-Programm ankommt.

**Dazu passender Check:** [R1 – Das OSI-Modell]({{ "/lektionen/r1-osi-modell.html" | relative_url }})

## TCP/IP, Protokollköpfe und HTTP {#tcpip}

### Die TCP/IP-Architektur

Das Internet baut auf der Protokollfamilie **TCP/IP** auf: **Transmission Control
Protocol / Internet Protocol**. Sie kommt mit **vier Ebenen** aus. Das OSI-Modell ist
das allgemeine Denkmodell, TCP/IP die tatsächlich eingesetzte Architektur.

| TCP/IP-Ebene | entspricht OSI | Protokolle und Beispiele |
|---|---|---|
| Application Level | 5 bis 7 | File Transfer, Electronic Mail, Virtual Terminal, Name Server, HTTP |
| Transmission Level | 4 | TCP (Transmission Control Protocol), UDP (User Datagram Protocol) |
| Internet Level | 3 | IP (Internet Protocol), ICMP (Internet Control Message Protocol) |
| Network Level | 1 bis 2 | Ethernet, Token Ring, X.25, ARPANET |

**TCP** ist **verbindungsorientiert**: Vor der Übertragung wird eine Verbindung
aufgebaut, und der Empfang der Daten wird quittiert. **UDP** ist **verbindungslos**:
Die Daten werden ohne Verbindungsaufbau und ohne Quittung losgeschickt. Das ist
schneller, aber nicht gesichert.

### Der TCP-Protokollkopf im Vergleich zum IP-Protokollkopf

| | IP-Header (Schicht 3) | TCP-Header (Schicht 4) |
|---|---|---|
| Adressen | Senderadresse, Empfängeradresse (IP-Nummern) | Senderport, Empfängerport |
| typische Felder | Version, Länge, Servicetypen, Paketlänge, Identifikation, DF/MF, Fragmentabstand, Lebenszeit, Transport, Kopfprüfsumme | Sequenznummer, Quittungsnummer, Datenabstand, Flags, Fenstergrösse, Prüfsumme, Urgent-Zeiger |
| Aufgabe | das Paket zum richtigen Rechner bringen | die Daten dem richtigen Dienst übergeben, in der richtigen Reihenfolge und vollständig |

Als Merkhilfe: **Adressen von Rechnern stehen im IP-Header, Ports von Diensten im
TCP-Header.** Die Sequenznummer sagt, an welche Stelle die Daten gehören, die
Quittungsnummer bestätigt den Empfang.

### HTTP und HTTPS

**HTTP (Hypertext Transfer Protocol)** ist das Protokoll der Schicht 7, mit dem
Browser und Webserver Webseiten austauschen. Es läuft immer gleich ab: Der Browser
schickt eine **Anfrage**, der Server eine **Antwort**. Die wichtigsten **Methoden**
einer Anfrage sind `GET` (etwas abrufen) und `POST` (Daten an den Server senden,
z. B. ein Formular); daneben gibt es unter anderem `HEAD`, `PUT` und `DELETE`.

**Durchgespieltes Beispiel:** Der Browser ruft eine Kursübersicht ab.

```
GET /kurse/index.html HTTP/1.0
Accept: text/html
```

- `GET` ist die Methode, `/kurse/index.html` das gewünschte Dokument.
- `Accept` sagt, welche Formate der Browser versteht.

Der Webserver antwortet:

```
HTTP/1.0 200 OK
Server: Apache
Content-Type: text/html
Content-Length: 2480
```

- `200 OK` ist der Statuscode: Die Anfrage war erfolgreich.
- `Content-Type` und `Content-Length` beschreiben das Dokument (eine HTML-Seite von
  2480 Byte), das direkt danach folgt.

Bei **HTTPS** (HTTP Secure) läuft dasselbe Protokoll über eine **verschlüsselte**
Verbindung. Niemand unterwegs kann mitlesen oder den Inhalt verändern, und der
Server weist sich mit einem Zertifikat aus. HTTP verwendet den Port 80, HTTPS den
Port 443.

**Dazu passender Check:** [R2 – TCP/IP, Protokollköpfe und HTTP]({{ "/lektionen/r2-tcpip-http.html" | relative_url }})

## Netzarten, Topologien und Übertragungsmedien {#topologien}

### LAN und WAN

- **LAN (Local Area Network):** ein lokales Netz mit begrenzter Ausdehnung, z. B. in
  einer Wohnung, einem Gebäude oder auf einem Firmengelände.
- **WAN (Wide Area Network):** ein Netz über grosse Distanzen, das Standorte, Städte
  oder Länder verbindet. Für WANs braucht es Router.

### Netz-Topologien

Die **Topologie** beschreibt die Anordnung der Geräte und ihrer Verbindungen im Netz.

| Topologie | Aufbau | Eigenschaften |
|---|---|---|
| **Bus** | Alle Stationen hängen an einem gemeinsamen Kabel. | einfache, günstige Verkabelung · Zugriffsverfahren CSMA/CD · der Bus wird bei vielen Stationen zum Engpass · Fehlersuche ist kompliziert · T-Stücke und Abschlusswiderstände nötig |
| **Ring** | Jede Station hat einen Vorgänger und einen Nachfolger. | Netzzugang über ein **Token** (Berechtigungsmarke) geregelt · einfache Verkabelung |
| **Stern** | Alle Rechner sind an eine zentrale Vermittlungsstelle angeschlossen (z. B. einen Switch, der mit MAC-Adressen arbeitet). | Fehler sind einfach zu finden · braucht viel Kabel · fällt die Zentrale aus, geht gar nichts mehr |

Dazu kommen **Kombinationen**, etwa mehrere Sterne, die über einen Bus verbunden sind
(Bus-Stern).

**Durchgespieltes Beispiel:** In einem Büro sind 8 PCs je mit einem eigenen Kabel an
einen Switch angeschlossen. Das ist ein Sternnetz.

- Das Kabel von PC 5 ist defekt → Nur PC 5 ist offline, der Fehler ist schnell
  gefunden.
- Der Switch fällt aus → Kein einziger PC kann mehr kommunizieren.

In einem Busnetz würde dagegen ein Unterbruch des gemeinsamen Kabels alle Stationen
betreffen, und die Fehlerstelle wäre schwieriger zu finden.

### Übertragungsmedien

| Medium | Stecker | Signal | Bemerkung |
|---|---|---|---|
| **Twisted-Pair-Kabel** (verdrillte Kupferadern, z. B. Cat-5, 100BASE-T) | RJ45 | elektrisch | heute das übliche Netzwerkkabel, pro Segment höchstens 100 m |
| **Koaxialkabel** | BNC | elektrisch | früher für Busnetze verwendet |
| **Lichtwellenleiter (LWL, Glasfaser)** | | Licht | Eine Leuchtdiode sendet, ein Fototransistor empfängt. Für grosse Distanzen und hohe Datenraten. |

**Dazu passender Check:** [R3 – Netzarten, Topologien und Übertragungsmedien]({{ "/lektionen/r3-topologien-medien.html" | relative_url }})

## Aktive Netzwerkelemente {#netzwerkelemente}

Jedes LAN-Segment hat eine maximale Ausdehnung (bei 100BASE-T höchstens 100 m).
Aktive Netzwerkelemente braucht es,

- weil die physikalische **Ausdehnung erweitert** werden soll,
- weil eine Verbindung zu einer **anderen Topologie** gewünscht ist,
- weil man sich an ein **anderes Netzwerk** anschliessen will.

### Die fünf Elemente

**Repeater (OSI-Schicht 1):** ein reiner **Signalverstärker**. Er frischt ein
abgeschwächtes Signal auf und verändert die Daten in keiner Weise. Das Netz bleibt
dasselbe, es wird nur länger.

**Hub (OSI-Schicht 1):** ein Repeater für den sternförmigen Betrieb. Er verbindet
mehrere Stationen und gibt jedes Signal an **alle** Anschlüsse weiter. Die
physikalische Topologie ist ein **Stern**, die logische ein **Bus**. Alle
angeschlossenen Geräte sind im selben Netzwerk.

**Switch (OSI-Schicht 2):** arbeitet mit **MAC-Adressen**. In seiner
**Adresstabelle** steht, welche MAC-Adresse an welchem Anschluss hängt. Er überträgt
einen Frame nur in das **eine** betroffene Segment.

- Der Verkehr im Netz wird reduziert, die Transferkapazität steigt.
- Die Sicherheit wird erhöht, weil nicht mehr alle alles sehen.
- Das Netz wird in getrennte Kollisionsabschnitte unterteilt. Hängt an jedem
  Anschluss genau ein Gerät, spricht man von **Mikrosegmentierung**.
- Alle Segmente eines Switches gehören weiterhin zum **selben Netzwerk**.

**Router (OSI-Schicht 3):** arbeitet mit **IP-Adressen** und **verbindet Netzwerke
untereinander**. Er verwaltet **Routing-Tabellen** (Wegweiser), kennt verschiedene
Wege zum Ziel und wählt den besten. Ein Router kann zudem fragmentieren. Für WANs
sind Router nötig. Der Router, an den ein Rechner alle Pakete für fremde Netze
schickt, heisst **Default Gateway**.

**Gateway (bis OSI-Schicht 7):** ermöglicht die Kommunikation zwischen
**unterschiedlichen Architekturen** und Umgebungen. Dazu packt es die Daten **neu**,
damit sie den Anforderungen des Zielsystems entsprechen. Der Router, der ein Netzwerk
mit dem Internet verbindet, wird ebenfalls Gateway (Gateway-Router) genannt.

### Zusammenfassung

| Element | durchlaufene OSI-Schichten | arbeitet mit | Aufgabe in einem Satz |
|---|---|---|---|
| Repeater | 1 | Signalen | verstärkt das Signal |
| Hub | 1 | Signalen | verteilt das Signal sternförmig an alle |
| Switch | 1 bis 2 | MAC-Adressen | leitet Frames gezielt in ein Segment |
| Router | 1 bis 3 | IP-Adressen | verbindet Netzwerke, sucht den besten Weg |
| Gateway | 1 bis 7 | allen Schichten | übersetzt zwischen verschiedenen Architekturen |

### Switch oder Router?

- Der **Switch** entscheidet aufgrund der **MAC-Adresse**, wohin ein **Frame**
  (Datenpaket der Schicht 2) weitergeleitet wird, und zwar **innerhalb eines
  Netzwerks**.
- Der **Router** entscheidet aufgrund der **IP-Adresse**, wohin ein **Paket**
  (Datenpaket der Schicht 3) versendet wird, und zwar **zwischen Netzwerken**.

**Durchgespieltes Beispiel 1 (Switch):** An einem Switch hängen drei Geräte. Seine
Adresstabelle:

| Anschluss | MAC-Adresse | Gerät |
|---|---|---|
| 1 | 00-1A-2B-00-00-0A | PC von Anna |
| 2 | 00-1A-2B-00-00-0B | PC von Ben |
| 3 | 00-1A-2B-00-00-0C | Drucker |

Anna druckt. Der Frame trägt die Ziel-MAC-Adresse `…0C`. Der Switch schlägt nach und
gibt den Frame **nur an Anschluss 3** aus. Bens PC sieht davon nichts. Ein Hub hätte
den Frame an alle Anschlüsse weitergegeben.

**Durchgespieltes Beispiel 2 (Router):** Ein Router verbindet zwei Netze: das
Büronetz `192.168.10.0 / 24` (Router-Adresse `192.168.10.1`) und das Lagernetz
`192.168.20.0 / 24` (Router-Adresse `192.168.20.1`). Der PC `192.168.10.5` sendet an
`192.168.20.9`.

1. Der PC vergleicht die Netzteile: `192.168.10` ≠ `192.168.20` → anderes Netz.
2. Er schickt das Paket an sein Default Gateway `192.168.10.1`.
3. Der Router liest die Ziel-IP-Adresse, findet in der Routing-Tabelle das Lagernetz
   und gibt das Paket dort wieder aus.

Ein Switch allein könnte diese beiden Netze nicht verbinden.

**Dazu passender Check:** [R4 – Repeater, Hub, Switch, Router und Gateway]({{ "/lektionen/r4-aktive-netzwerkelemente.html" | relative_url }})

## Netzwerk-Kommandos {#kommandos}

Mit einigen Systembefehlen können Sie das Gelernte am eigenen Rechner beobachten.
Unter Windows öffnen Sie dazu die Eingabeaufforderung (`cmd`), auf dem Mac das
Terminal.

| Kommando (Windows) | auf dem Mac | zeigt … |
|---|---|---|
| `ipconfig` | `ifconfig` | die eigenen Adressen. Mit `ipconfig /all` (auch `-all`) erscheinen zusätzlich die MAC-Adresse und die DHCP-Angaben. |
| `nslookup` | `nslookup` | zu einem Namen die IP-Adresse oder umgekehrt. Dazu fragt es den Dienst **DNS (Domain Name Service)**. |
| `tracert` | `traceroute` | über welche Zwischenstationen (**Hops**, also Router) der Weg zu einem Rechner führt. |
| `netstat` | `netstat` | welche Verbindungen und Ports auf dem eigenen Rechner gerade aktiv sind. |

**Durchgespieltes Beispiel 1:** Ausschnitt aus der Ausgabe von `ipconfig /all`:

```
Physische Adresse . . . . : 3C-52-82-4F-A1-07
DHCP aktiviert. . . . . . : Ja
IPv4-Adresse  . . . . . . : 192.168.1.37
Subnetzmaske  . . . . . . : 255.255.255.0
Standardgateway . . . . . : 192.168.1.1
```

- Die **physische Adresse** ist die MAC-Adresse der Netzwerkkarte (48 Bit,
  hexadezimal geschrieben).
- **DHCP aktiviert: Ja** heisst: Der Rechner hat seine IP-Adresse automatisch von
  einem DHCP-Server erhalten. Sie kann sich deshalb ändern.
- `192.168.1.37` liegt in einem privaten Adressbereich. Mit der Subnetzmaske
  `255.255.255.0` ist der Netzteil `192.168.1`.
- Das **Standardgateway** ist der Router, an den alle Pakete für fremde Netze gehen.

**Durchgespieltes Beispiel 2:** Ausgabe von `tracert` zu einem Webserver:

```
  1     2 ms     1 ms     2 ms  192.168.1.1
  2     9 ms     8 ms     9 ms  10.20.0.1
  3    12 ms    11 ms    12 ms  203.0.113.17
  4    14 ms    13 ms    15 ms  198.51.100.80
```

- Die erste Spalte zählt die Hops.
- Die drei Zeiten gehören zu **drei einzelnen Anfragen** an diese Station.
- Die letzte Spalte zeigt die IP-Adresse (und, wenn bekannt, den Namen) der Station.
- Zeile 1 ist der eigene Router (das Standardgateway von oben), die letzte Zeile ist
  das Ziel.

**Dazu passender Check:** [R5 – Netzwerk-Kommandos]({{ "/lektionen/r5-netzwerk-kommandos.html" | relative_url }})
