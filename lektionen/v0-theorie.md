---
lektion: 3
zielgruppe: sus
art: theorie
titel: "Theorie: Verschlüsselung"
kurz: "Begriffe und Schutzziele, Cäsar- und Vigenère-Verschlüsselung, asymmetrische Verschlüsselung und RSA – zum Nachlesen vor oder nach den Checks."
reihenfolge: 10
---

# Theorie: Verschlüsselung

**Einheit 3 · zum Nachlesen vor oder nach den Checks**

<!--
  Stand dieser Angaben: 27.09.2026.
  Keine externen Zahlen oder Quellen: Grundlage sind die Vorlesungsfolien
  «Verschlüsselungen» (HS 2025/2026) sowie das zugehörige Übungsblatt.
  Bei neuen Folien diesen Text gegenlesen. Die Beispielwörter und Schlüssel
  bei Cäsar und Vigenère sind eigene, in sich stimmige Beispiele (nicht
  identisch mit den Folien- oder Übungsblatt-Beispielen), damit hier die
  Methode geübt wird statt eine Lösung auswendig zu lernen.
-->

Jeder Abschnitt hier gehört zu einem Lernziel und zu genau einem Check. Sie können
also entweder zuerst hier lesen und dann den Check lösen, oder direkt mit dem Check
beginnen und bei Bedarf hierher zurückspringen — der Check verlinkt zurück auf den
passenden Abschnitt.

## Begriffe und Strategien {#begriffe}

Mit einem **Verschlüsselungsverfahren** lässt sich ein Klartext in einen Geheimtext
umwandeln und umgekehrt wieder zurück. Die Grundbegriffe dazu:

| Begriff | Bedeutung |
|---|---|
| Plaintext (Klartext) | eine unverschlüsselte Nachricht |
| Encryption (Verschlüsselung) | der Prozess, der den Klartext mit einem Algorithmus unlesbar macht |
| Decryption (Entschlüsselung) | der Prozess, der den Geheimtext wieder in Klartext zurückverwandelt |
| Key (Schlüssel) | ein Geheimnis, ähnlich einem Passwort, um zu ver- bzw. entschlüsseln |

### Die vier Schutzziele

- **Vertraulichkeit:** Die Nachricht kann von keiner unberechtigten Person gelesen
  werden.
- **Integrität:** Die Nachricht wurde von niemandem verändert.
- **Authentizität:** Die Nachricht stammt mit Sicherheit vom angegebenen Absender.
- **Verbindlichkeit:** Es ist eindeutig und nicht abstreitbar, wer die Nachricht
  verfasst hat.

**Durchgerechnetes Beispiel:** Eine Bank erhält eine unterschriebene
Überweisungsanweisung per E-Mail. *Vertraulichkeit* heisst: Nur die Bank kann den
Betrag lesen, niemand unterwegs. *Integrität* heisst: Der Betrag wurde auf dem Weg
nicht verändert. *Authentizität* heisst: Die Anweisung stammt wirklich von der
angegebenen Kundin. *Verbindlichkeit* heisst: Die Kundin kann im Nachhinein nicht
abstreiten, die Anweisung gegeben zu haben.

### Zwei Grundstrategien

- **Symmetrische Verschlüsselung:** Derselbe Schlüssel dient dem Ver- *und*
  Entschlüsseln (siehe [Cäsar](#caesar) und [Vigenère](#vigenere)).
- **Asymmetrische Verschlüsselung:** Ein öffentlicher Schlüssel zum Verschlüsseln,
  ein privater Schlüssel zum Entschlüsseln (siehe [RSA](#asymmetrisch-rsa)).

**Dazu passender Check:** [v1 – Begriffe und Strategien]({{ "/lektionen/v1-begriffe-strategien.html" | relative_url }})

## Cäsar-Verschlüsselung {#caesar}

Die **Cäsar-Verschlüsselung** ist ein einfaches symmetrisches Verfahren: Jeder
Buchstabe im Klartext wird durch denjenigen Buchstaben ersetzt, der eine feste Anzahl
Stellen später im Alphabet steht — bei Cäsar selbst waren es 3 Stellen.

**Durchgerechnetes Beispiel:** `computer` um 3 verschoben:

| Klartext | c | o | m | p | u | t | e | r |
|---|---|---|---|---|---|---|---|---|
| Geheimtext | f | r | p | s | x | w | h | u |

Ergebnis: `frpsxwhu`. Nach «x, y, z» beginnt das Alphabet wieder bei «a» (z. B. wird
aus «x» ein «a»).

### Monoalphabetische Verschlüsselung

Cäsar ist ein Spezialfall der **monoalphabetischen Verschlüsselung**: Jedes
Klartextzeichen wird über den ganzen Text hinweg immer durch dasselbe
Geheimtextzeichen ersetzt. Anders als bei Cäsar muss diese Ersetzung aber keiner
festen Verschiebung folgen — sie kann auch zufällig sein (z. B. jedes «E» wird zu
einem «A», jedes «R» zu einem «B», ohne erkennbares Muster).

### Die Schwäche

Weil jedes Zeichen immer gleich ersetzt wird, bleibt die typische **Häufigkeit** der
Buchstaben einer Sprache im Geheimtext erhalten (z. B. ist «E» im Deutschen der
häufigste Buchstabe). Mit einer Häufigkeitsanalyse lässt sich eine monoalphabetische
Verschlüsselung deshalb auch ohne Kenntnis des Schlüssels knacken.

**Dazu passender Check:** [v2 – Cäsar-Verschlüsselung]({{ "/lektionen/v2-caesar.html" | relative_url }})

## Vigenère-Verschlüsselung {#vigenere}

Die **Vigenère-Verschlüsselung** ist **polyalphabetisch**: Statt eines einzigen
Geheimtextalphabets werden mehrere verwendet, um eine Häufigkeitsanalyse zu
erschweren. Welches Alphabet für welchen Klartextbuchstaben verwendet wird, legt ein
**Schlüsselwort** fest, das über den Klartext hinweg wiederholt wird.

**Durchgerechnetes Beispiel:** Klartext `schule`, Schlüssel `nksa`:

```
Schlüssel   n k s a n k
Klartext    s c h u l e
Geheimtext  f m z u y o
```

Jeder Buchstabe des Schlüssels gibt an, um wie viele Stellen der darunterstehende
Klartextbuchstabe verschoben wird (n = 13 Stellen, k = 10 Stellen, s = 18 Stellen,
a = 0 Stellen), genau wie bei Cäsar — nur dass die Verschiebung von Zeichen zu
Zeichen wechselt. Gleiche Klartextbuchstaben (hier zweimal «l»/«e» im Muster) werden
dadurch nicht zwingend zum gleichen Geheimtextbuchstaben.

### Trotzdem knackbar

Auch Vigenère lässt sich mit genügend Text und statistischen Methoden entschlüsseln:
Man sucht wiederkehrende Buchstabenfolgen im Geheimtext, bestimmt den grössten
gemeinsamen Teiler (GgT) ihrer Abstände — das ergibt meist die Schlüssellänge — und
wendet dann auf jedes der so gefundenen Teilalphabete eine Häufigkeitsanalyse an.
Im Zweiten Weltkrieg wurde eine Vigenère-Variante von Deutschland für militärische
Kommunikation eingesetzt und nach langer Zeit geknackt. Moderne symmetrische
Verfahren wie AES beruhen deshalb nicht mehr auf dem einfachen Ersetzen einzelner
Zeichen.

**Dazu passender Check:** [v3 – Vigenère-Verschlüsselung]({{ "/lektionen/v3-vigenere.html" | relative_url }})

## Asymmetrische Verschlüsselung und RSA {#asymmetrisch-rsa}

Das grösste Problem symmetrischer Verfahren: Sender und Empfänger müssen sich vorher
irgendwie auf denselben Schlüssel einigen, ohne dass ihn jemand mitliest. Die
**asymmetrische Verschlüsselung** löst dieses Problem mit zwei verschiedenen
Schlüsseln:

- einem **öffentlichen Schlüssel (Public Key)** zum Verschlüsseln — er darf
  bekanntgegeben werden,
- einem **privaten Schlüssel (Private Key)** zum Entschlüsseln — er bleibt geheim.

Das bekannteste Verfahren dieser Art ist **RSA** (benannt nach Rivest, Shamir und
Adleman, 1976 — dieselbe Idee war bereits 1970–74 britischen Kryptografen bekannt,
wurde damals aber geheim gehalten).

### Die Idee dahinter: die Einwegfunktion

RSA beruht auf einer **Einwegfunktion**: einer Rechenoperation, die in die eine
Richtung einfach, in die andere praktisch unmöglich in sinnvoller Zeit ist. Analogie:
Aus einem Rezept einen Kuchen backen ist einfach — vom fertigen Kuchen exakt auf das
Rezept zurückzuschliessen, ist schwer. Bei RSA: Zwei grosse Primzahlen zu
multiplizieren ist leicht; aus dem Produkt die beiden ursprünglichen Primfaktoren
wieder herauszufinden, dauert bei genügend grossen Zahlen praktisch beliebig lange.

**Durchgerechnetes Beispiel:** Alice will zwei Dinge erreichen.

- **Vertraulichkeit:** Alice veröffentlicht ihren Public Key. Bob verschlüsselt seine
  Nachricht damit. Nur Alice kann sie mit ihrem eigenen, geheimen Private Key wieder
  entschlüsseln — niemand sonst, selbst wenn der Geheimtext abgefangen wird.
- **Authentizität/Verbindlichkeit:** Alice verschlüsselt (signiert) eine Nachricht
  mit ihrem *eigenen* Private Key. Jede und jeder kann sie mit Alices öffentlich
  bekanntem Public Key wieder entschlüsseln — und weiss damit sicher, dass nur Alice
  sie erzeugt haben kann, da nur sie den passenden Private Key besitzt.

### Einsatz von RSA

Zertifikate und https (TLS), digitale Signaturen, E-Mail-Verschlüsselung (z. B.
OpenPGP) und RFID-Chips in Reisepässen beruhen alle auf dieser oder einer verwandten
asymmetrischen Idee.

**Dazu passender Check:** [v4 – Asymmetrische Verschlüsselung und RSA]({{ "/lektionen/v4-asymmetrisch-rsa.html" | relative_url }})
