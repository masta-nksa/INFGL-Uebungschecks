---
lektion: 10
zielgruppe: sus
art: theorie
titel: "Theorie: Datenbanken"
kurz: "Daten, Information und Wissen, Datenbank und DBMS, Datenbankarten, ER-Modell mit Schlüsseln, Anomalien und die drei Normalformen – zum Nachlesen vor oder nach den Checks."
reihenfolge: 10
---

# Theorie: Datenbanken

**Einheit 10 · zum Nachlesen vor oder nach den Checks**

<!--
  Stand dieser Angaben: 16.11.2026.
  Keine externen Zahlen oder Quellen: Grundlage sind die Vorlesungsfolien
  «Datenbanken – Einführung» (HS 2025) und die Übung «Normalformen».
  Die Beispieltabellen sind eigene, erfundene Beispiele (Ausnahme: die
  Film-Datenbank, die in der Vorlesung besprochen wird) und unterscheiden
  sich von jenen in den Checks.
-->

Jeder Abschnitt hier gehört zu einem Lernziel und zu einem Check. Sie können zuerst
hier lesen und dann den Check lösen, oder direkt mit dem Check beginnen und bei Bedarf
hierher zurückspringen.

## Daten, Datenbank und DBMS {#grundlagen}

### Warum Datenbanken?

Fast jede Unternehmenssoftware stützt sich auf eine Datenbank: der Online-Shop mit
Artikeln, Kundinnen und Bestellungen, die Bank mit Konten, das Spital mit Patientendaten.
Vollständigkeit, Verfügbarkeit und Richtigkeit der Daten bestimmen, ob ein Betrieb
handlungsfähig ist. Die Daten werden nicht mehr nur von einer einzigen Anwendung genutzt,
und die Datensicherheit ist gesetzlich geregelt.

### Herausforderungen

Eine Datenbank muss diese Probleme lösen:

- **Paralleler Zugriff:** Mehrere Benutzer lesen und schreiben gleichzeitig.
- **Datenschutz:** Unberechtigte dürfen nichts lesen oder ändern.
- **Datensicherheit:** Bei Absturz einer Anwendung oder Stromausfall dürfen keine Daten verloren gehen.
- **Datenunabhängigkeit:** Die internen Datenformate sind vor Anwendungen und Benutzern versteckt. Ändert sich die Speicherung, laufen die Programme weiter.
- **Keine Redundanz:** Dieselbe Information soll nicht mehrfach gespeichert sein. Sonst wird Speicherplatz verschwendet, und bei Änderungen wird eine Stelle leicht vergessen (**Dateninkonsistenz**: die Kopien widersprechen sich).

### Daten, Information, Wissen

- **Daten** sind alles, was wir wahrnehmen, unabhängig von der Bedeutung. Beispiel: `100001011111111101110100000001`.
- **Information:** Daten erhalten eine Bedeutung. Beispiel: «38.5» ist die Körpertemperatur in °C.
- **Wissen** entsteht, wenn man Informationen kombiniert. Beispiel: «Kanarienvögel sind Vögel» und «Vögel haben Federn» ergibt «Kanarienvögel haben Federn».

### Datenbank und DBMS

Eine **Datenbank (DB)** ist ein logisch zusammengehöriger, strukturiert abgelegter
Datenbestand, der einem zentralen Zweck dient. Er enthält möglichst wenig Redundanz, die
Daten müssen konsistent sein, und Programme müssen sie abrufen können.

Das **Datenbankmanagementsystem (DBMS)** ist die Software, mit der man auf die Daten
zugreift. Es bestimmt Geschwindigkeit und Funktionalität, bietet einen Zwischenspeicher
(Cache) an und regelt das gleichzeitige Schreiben und Löschen, damit keine
Race Conditions entstehen. Datenbank und DBMS zusammen heissen **Datenbanksystem**.

## Datenbankarten {#arten}

| Art | Kernidee |
|---|---|
| **Hierarchisch** (z. B. XML) | Daten in einer Baumstruktur: jeder Knoten hat genau einen Vorgänger. |
| **Objektorientiert** | Klassen und Objekte, ähnlich wie in der objektorientierten Programmierung. |
| **Netzwerk** | Verallgemeinerung des hierarchischen Modells: ein Knoten kann mehrere Vorgänger haben, damit sind m:n-Beziehungen möglich. |
| **Relational** | Beliebig viele Einzeltabellen, die über Schlüssel miteinander verknüpft sind. Jede Information wird nur einmal gespeichert. |

Heute am weitesten verbreitet sind relationale Datenbanken (Abfragesprache SQL). Die
folgenden Abschnitte beziehen sich nur auf sie.

## Das ER-Modell {#er-modell}

Das **Entity-Relationship-Modell (ER-Modell)** bildet die Elemente einer relationalen
Datenbank und ihre Beziehungen ab, bevor man Tabellen baut.

- **Entität (Entity):** ein Objekt, Begriff, Ereignis oder eine Person, zum Beispiel *Kunde*, *Artikel*, *Film*. Eine Entität hat **Attribute** (Eigenschaften, z. B. Vorname, Preis). Sie wird als **Tabelle** umgesetzt: Die Attribute sind die Spalten, jede Zeile ist ein Datensatz.
- **Beziehung (Relationship):** Verknüpfung von Entitäten.
  - **1:1** – ein Datensatz hat genau einen Partner. Beispiel: Person und Reisepass.
  - **1:n** (eins zu viele) – ein Datensatz hat viele Partner, jeder Partner aber nur einen. Beispiel: Ein Kunde gibt viele Bestellungen auf, jede Bestellung gehört zu einem Kunden.
  - **m:n** (viele zu viele) – beide Seiten haben viele Partner. Beispiel: Ein Film hat mehrere Schauspieler, ein Schauspieler spielt in mehreren Filmen.

### Schlüssel

Ein Attribut (oder eine Gruppe von Attributen), das einen Datensatz **eindeutig** bestimmt,
heisst **Schlüssel**. Gibt es kein solches Attribut, definiert man ein künstliches, zum
Beispiel eine Artikelnummer. Der gewählte Schlüssel heisst **Primärschlüssel** (PK, primary key).

Wird der Primärschlüssel einer Tabelle in einer anderen Tabelle verwendet, um auf sie zu
verweisen, heisst er dort **Fremdschlüssel** (FK, foreign key).

### Umsetzung der Beziehungen

- **1:n:** Der Fremdschlüssel kommt in die Tabelle der «n»-Seite. In der Tabelle *Bestellung* steht die Kundennummer.
- **m:n:** Eine relationale Datenbank kann das nicht direkt. Man legt eine **Zwischentabelle** an, die die beiden Fremdschlüssel enthält.

Beispiel Film-Datenbank:

**filme**

| FilmNr (PK) | Titel | Jahr | IMDbRating |
|---|---|---|---|
| 1 | Die Verurteilten | 1994 | 9.3 |
| 2 | Der Pate | 1972 | 9.2 |

**schauspieler**

| SchauspielerNr (PK) | Vorname | Name |
|---|---|---|
| 1 | Tim | Robbins |
| 2 | Morgan | Freeman |
| 3 | Marlon | Brando |
| 4 | Al | Pacino |

**filme_schauspieler** (Zwischentabelle, Schlüssel aus beiden Spalten)

| FilmNr (FK) | SchauspielerNr (FK) |
|---|---|
| 1 | 1 |
| 1 | 2 |
| 2 | 3 |
| 2 | 4 |

Wer in einem Film mitspielt, steht nur in der Zwischentabelle. Ein Schauspieler wird nur
einmal gespeichert, auch wenn er in zehn Filmen mitspielt.

## Normalformen {#normalformen}

### Warum normalisieren?

Speichert man Daten mehrfach, entstehen **Anomalien**. Beispiel: Eine einzige Tabelle
*Mitarbeiter* enthält zu jeder Person auch die Abteilung samt Abteilungstelefon.

- **Insert-Anomalie:** Bei jeder neuen Person muss die Abteilung nochmals erfasst werden. Eine neue Abteilung ohne Mitarbeiter lässt sich nur mit leeren Feldern (NULL) eintragen.
- **Delete-Anomalie:** Wird der letzte Mitarbeiter einer Abteilung gelöscht, verschwindet die Abteilung mit.
- **Update-Anomalie:** Ändert sich die Telefonnummer der Abteilung, muss sie in allen Zeilen dieser Abteilung angepasst werden. Wird eine vergessen, ist die Datenbank inkonsistent.

Das **Normalisieren** zerlegt die Tabellen so, dass jede Information nur einmal vorkommt.
Es gibt drei Stufen, die aufeinander aufbauen.

### 1. Normalform (1NF): Werte sind atomar

Kein Feld enthält mehr als einen Wert.

*Nicht in 1NF:* Die Spalte «Auftragsnummer» enthält Listen.

| Kunden-ID | Vorname | Nachname | Auftragsnummer |
|---|---|---|---|
| 1 | Axel | Pratzner | 32481, 32482 |
| 2 | Elke | Schmidtz | 32483, 32484, 32485 |

*Lösung:* Pro Wert eine eigene Zeile, die Aufträge in eine zweite Tabelle.

| Kunden-ID | Vorname | Nachname |
|---|---|---|
| 1 | Axel | Pratzner |
| 2 | Elke | Schmidtz |

| Kunden-ID | Auftragsnummer |
|---|---|
| 1 | 32481 |
| 1 | 32482 |
| 2 | 32483 |
| 2 | 32484 |
| 2 | 32485 |

### 2. Normalform (2NF): voll vom Schlüssel abhängig

Die Tabelle ist in 1NF, und jedes Attribut, das nicht zum Schlüssel gehört, hängt vom
**ganzen** Schlüssel ab, nicht nur von einem Teil davon. Anders gesagt: In einem Datensatz
ist nur ein Sachverhalt abgebildet. Das kann nur verletzt sein, wenn der Schlüssel aus
mehreren Attributen besteht.

*Nicht in 2NF:* Schlüssel ist (Bestell-Nr, Artikel-Nr). Der Artikelname hängt aber nur von der Artikel-Nr ab.

| Bestell-Nr | Artikel-Nr | Artikelname | Menge |
|---|---|---|---|
| 501 | 7 | Heft A4 | 10 |
| 501 | 9 | Bleistift | 20 |
| 502 | 7 | Heft A4 | 5 |

*Lösung:* Alles, was nur von einem Teil des Schlüssels abhängt, kommt in eine eigene Tabelle.

| Artikel-Nr | Artikelname |
|---|---|
| 7 | Heft A4 |
| 9 | Bleistift |

| Bestell-Nr | Artikel-Nr | Menge |
|---|---|---|
| 501 | 7 | 10 |
| 501 | 9 | 20 |
| 502 | 7 | 5 |

### 3. Normalform (3NF): keine Abhängigkeit unter Nichtschlüssel-Attributen

Die Tabelle ist in 1NF und 2NF, und kein Nichtschlüssel-Attribut hängt von einem anderen
Nichtschlüssel-Attribut ab. Jedes Attribut hängt nur vom Schlüssel ab.

*Nicht in 3NF:* Schlüssel ist die Mitarbeiter-Nr. Die Abteilungsleitung hängt von der Abteilung ab, nicht direkt vom Mitarbeiter.

| MA-Nr | Name | Abteilung | Leitung |
|---|---|---|---|
| 11 | Berger | A | Keller |
| 12 | Frei | A | Keller |
| 13 | Suter | B | Roth |

*Lösung:* Das abhängige Attribut samt seinem «Bestimmer» kommt in eine eigene Tabelle. Der Bestimmer bleibt in der alten Tabelle als Fremdschlüssel.

| MA-Nr | Name | Abteilung (FK) |
|---|---|---|
| 11 | Berger | A |
| 12 | Frei | A |
| 13 | Suter | B |

| Abteilung | Leitung |
|---|---|
| A | Keller |
| B | Roth |

### Vorgehen in drei Fragen

1. Steht in jedem Feld nur ein Wert? Wenn nicht: 1NF herstellen.
2. Hängt jedes Nichtschlüssel-Attribut vom ganzen Schlüssel ab? Wenn nicht: 2NF herstellen.
3. Hängt ein Nichtschlüssel-Attribut von einem anderen Nichtschlüssel-Attribut ab? Wenn ja: 3NF herstellen.

Nach dem Zerlegen müssen die Daten durch die Fremdschlüssel wieder zusammensetzbar sein.
