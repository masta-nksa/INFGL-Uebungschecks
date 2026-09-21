/*
 * Übungschecks: prüft Antworten im Browser und zeigt bei einer falschen Antwort
 * eine kurze Hilfestellung. Die Aufgaben stehen in assets/checks/*.json (Format
 * siehe README.md). Die Prüflogik besteht aus reinen Funktionen ohne DOM-Zugriff;
 * sie lässt sich deshalb auch in Node testen.
 */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  } else {
    root.Uebungscheck = api;
    if (typeof document !== 'undefined') {
      if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', api.start);
      else api.start();
    }
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* ---------- Normalisieren und Vergleichen ---------------------------------- */

  function sauber(roh) {
    return String(roh == null ? '' : roh).replace(/[   ]/g, ' ').trim();
  }

  // Dezimalzahl oder einfacher Ausdruck (z. B. 5/8, 2^34, 16*2^30); Trenner ' und Leerzeichen erlaubt.
  function zahl(roh) {
    var s = sauber(roh)
      .replace(/\s*[A-Za-zµ]+(\/[A-Za-z]+)?$/, '')       // nachgestellte Einheit: «931 GiB», «2.1 s»
      .replace(/[’'`´\s]/g, '')
      .replace(/[−–]/g, '-')
      .replace(/[·×]/g, '*')
      .replace(/,/g, '.')
      .replace(/\^/g, '**');
    if (!s || s.length > 60 || !/^[0-9.+\-*\/()]+$/.test(s)) return NaN;
    s = s.replace(/(^|[^0-9.])0+(?=[0-9])/g, '$1');        // führende Nullen, sonst liest JS sie als Oktalzahl
    try {
      var v = Function('"use strict"; return (' + s + ');')();
      return typeof v === 'number' && isFinite(v) ? v : NaN;
    } catch (e) {
      return NaN;
    }
  }

  function ohneTrenner(s) { return s.replace(/[\s'’`´]/g, ''); }

  // Binärzahl, Hexzahl, Ziffernfolge: Basismarker und Trenner entfernen.
  function rohziffern(roh, praefix, suffix) {
    var s = sauber(roh).toLowerCase().replace(/[₀-₉]+$/, '').replace(/\(\s*\d+\s*\)$|\[\s*\d+\s*\]$/, '');
    if (praefix && s.indexOf(praefix) === 0) s = s.slice(praefix.length);
    s = ohneTrenner(s).replace(',', '.');
    if (suffix && s.slice(-1) === suffix && s.length > 1) s = s.slice(0, -1);
    return s;
  }

  function ohneFuehrendeNullen(s) { return s.replace(/^0+(?=.)/, ''); }

  function binNorm(roh, f) {
    var s = rohziffern(roh, '0b', 'b');
    if (f && f.streng) return s;
    if (f && f.bruch) {
      var teile = s.split('.');
      var ganz = ohneFuehrendeNullen(teile[0] || '0') || '0';
      var rest = (teile[1] || '').replace(/0+$/, '');
      return rest ? ganz + '.' + rest : ganz;
    }
    if (f && f.format === 'mantisse') return s.replace(/0+$/, '');
    return ohneFuehrendeNullen(s);
  }

  function textNorm(roh) {
    return sauber(roh).toLowerCase().replace(/[«»"'’.,;:!?()]/g, '').replace(/\s+/g, ' ');
  }

  var FORMATE = {
    zahl: {
      fehler: function (roh) { return isNaN(zahl(roh)) ? 'Bitte eine Zahl eingeben (Dezimalpunkt oder -komma).' : null; },
      gleich: function (roh, soll, f) {
        var a = zahl(roh), b = zahl(String(soll));
        return Math.abs(a - b) <= (f.tol || 1e-9);
      }
    },
    bin: {
      fehler: function (roh, f) {
        var s = rohziffern(roh, '0b', 'b');
        var muster = f.bruch ? /^[01]*\.?[01]*$/ : /^[01]+$/;
        if (!muster.test(s) || s === '.' ) return 'Binärzahlen bestehen nur aus den Ziffern 0 und 1' + (f.bruch ? ' (und dem Komma).' : '.');
        return null;
      },
      gleich: function (roh, soll, f) { return binNorm(roh, f) === binNorm(soll, f); }
    },
    mantisse: {
      fehler: function (roh) {
        var s = rohziffern(roh, '0b', 'b');
        if (!/^[01]+$/.test(s)) return 'Die Mantisse besteht nur aus den Ziffern 0 und 1.';
        if (s.length > 23) return 'Die Mantisse hat höchstens 23 Bit.';
        return null;
      },
      gleich: function (roh, soll, f) { return binNorm(roh, { format: 'mantisse' }) === binNorm(soll, { format: 'mantisse' }); }
    },
    hex: {
      fehler: function (roh) {
        var s = rohziffern(roh, '0x', 'h');
        return /^[0-9a-f]+$/.test(s) ? null : 'Hexadezimalzahlen bestehen aus den Ziffern 0 bis 9 und den Buchstaben A bis F.';
      },
      gleich: function (roh, soll) {
        return ohneFuehrendeNullen(rohziffern(roh, '0x', 'h')) === ohneFuehrendeNullen(rohziffern(String(soll), '0x', 'h'));
      }
    },
    ziffern: {
      fehler: function (roh, f) {
        var s = rohziffern(roh);
        if (!/^[0-9a-z]+$/.test(s)) return 'Bitte nur Ziffern eingeben.';
        if (f.basis) {
          for (var i = 0; i < s.length; i++) {
            if (parseInt(s.charAt(i), 36) >= f.basis) return 'Im ' + f.basis + 'er-System gibt es nur die Ziffern 0 bis ' + (f.basis - 1) + '.';
          }
        }
        return null;
      },
      gleich: function (roh, soll) { return ohneFuehrendeNullen(rohziffern(roh)) === ohneFuehrendeNullen(rohziffern(String(soll))); }
    },
    text: {
      fehler: function () { return null; },
      gleich: function (roh, soll) { return textNorm(roh) === textNorm(String(soll)); }
    }
  };

  /* ---------- Bewertung (reine Funktionen) ------------------------------------ */

  function pruefeFeld(f, roh) {
    if (sauber(roh) === '') return { status: 'leer' };
    var fmt = FORMATE[f.format || 'text'];
    var meldung = fmt.fehler(roh, f);
    if (meldung) return { status: 'falsch', tipp: meldung };
    var richtig = [].concat(f.antwort);
    for (var i = 0; i < richtig.length; i++) {
      if (fmt.gleich(roh, richtig[i], f)) return { status: 'ok' };
    }
    var haeufig = f.haeufig || [];
    for (var j = 0; j < haeufig.length; j++) {
      if (fmt.gleich(roh, haeufig[j].wert, f)) return { status: 'falsch', tipp: haeufig[j].tipp };
    }
    return { status: 'falsch', tipp: f.tipp };
  }

  function felderVon(item) {
    if (item.typ === 'felder') return item.felder;
    if (item.typ === 'tabelle') {
      var liste = [];
      item.zeilen.forEach(function (z) { z.forEach(function (c) { if (c && typeof c === 'object') liste.push(c); }); });
      return liste;
    }
    return [];
  }

  function zusammenfassen(item, marken, tipps) {
    var alle = marken.length;
    var leer = marken.filter(function (m) { return m === 'leer'; }).length;
    var ok = marken.filter(function (m) { return m === 'ok'; }).length;
    var status = leer === alle ? 'leer' : (ok === alle ? 'ok' : 'falsch');
    var gesammelt = [];
    tipps.forEach(function (t) { if (t && gesammelt.indexOf(t) === -1) gesammelt.push(t); });
    if (status === 'falsch') {
      if (leer > 0) gesammelt.unshift('Bitte alle Zeilen bzw. Felder ausfüllen.');
      else if (gesammelt.length === 0 && item.tipp) gesammelt.push(item.tipp);
    }
    return { status: status, marken: marken, tipps: gesammelt };
  }

  // Pro falscher Zeile bzw. falschem Feld zählt deren eigener Tipp, sonst der Tipp der Aufgabe.
  function bewerteFelder(item, rohwerte) {
    var marken = [], tipps = [];
    felderVon(item).forEach(function (f, i) {
      var r = pruefeFeld(f, rohwerte[i]);
      marken.push(r.status);
      if (r.status === 'falsch') tipps.push(r.tipp || item.tipp);
    });
    return zusammenfassen(item, marken, tipps);
  }

  function bewerteWahl(item, index) {
    if (index == null || index < 0) return { status: 'leer', marken: [], tipps: [] };
    var o = item.optionen[index];
    if (o.richtig) return { status: 'ok', marken: [], tipps: [] };
    var tipps = [];
    if (o.warum) tipps.push(o.warum);
    if (item.tipp) tipps.push(item.tipp);
    return { status: 'falsch', marken: [], tipps: tipps };
  }

  function bewerteMehrfach(item, indizes) {
    if (!indizes.length) return { status: 'leer', marken: [], tipps: [] };
    var marken = item.optionen.map(function (o, i) {
      var gewaehlt = indizes.indexOf(i) !== -1;
      if (gewaehlt && !o.richtig) return 'falsch';
      if (gewaehlt && o.richtig) return 'ok';
      return '';
    });
    var falschGewaehlt = marken.indexOf('falsch') !== -1;
    var fehlt = item.optionen.some(function (o, i) { return o.richtig && indizes.indexOf(i) === -1; });
    if (!falschGewaehlt && !fehlt) return { status: 'ok', marken: marken, tipps: [] };
    var tipps = [];
    item.optionen.forEach(function (o, i) { if (marken[i] === 'falsch' && o.warum) tipps.push(o.warum); });
    if (!falschGewaehlt && fehlt) tipps.push('Es fehlt noch mindestens eine richtige Antwort.');
    if (item.tipp) tipps.push(item.tipp);
    return { status: 'falsch', marken: marken, tipps: tipps };
  }

  function bewerteZuordnung(item, werte) {
    var marken = item.zeilen.map(function (z, i) {
      if (!werte[i]) return 'leer';
      return werte[i] === z.antwort ? 'ok' : 'falsch';
    });
    var tipps = [];
    item.zeilen.forEach(function (z, i) { if (marken[i] === 'falsch') tipps.push(z.tipp || item.tipp); });
    return zusammenfassen(item, marken, tipps);
  }

  /* ---------- Darstellung im Browser ------------------------------------------ */

  var zaehler = 0;

  function h(tag, eigenschaften, kinder) {
    var el = document.createElement(tag);
    Object.keys(eigenschaften || {}).forEach(function (k) {
      var v = eigenschaften[k];
      if (v == null || v === false) return;
      if (k === 'html') el.innerHTML = v;
      else if (k === 'class') el.className = v;
      else el.setAttribute(k, v === true ? '' : v);
    });
    [].concat(kinder == null ? [] : kinder).forEach(function (c) {
      if (c == null) return;
      el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return el;
  }

  function eingabeFeld(f, beschriftung) {
    zaehler += 1;
    var klasse = 'check-eingabe check-' + (f.format || 'text') + (f.breit ? ' breit' : '');
    return h('input', {
      type: 'text', id: 'c' + zaehler, class: klasse, autocomplete: 'off', autocapitalize: 'off',
      spellcheck: 'false', 'aria-label': beschriftung || null
    });
  }

  function baueFelder(item, teil) {
    var eingaben = [];
    item.felder.forEach(function (f) {
      var inp = eingabeFeld(f, f.label ? f.label.replace(/<[^>]*>/g, '') : 'Antwort');
      eingaben.push(inp);
      teil.appendChild(h('div', { class: 'check-feld' }, [
        f.label ? h('label', { for: inp.id, html: f.label }) : null,
        inp,
        f.nach ? h('span', { class: 'check-nach', html: f.nach }) : null
      ]));
    });
    return {
      lesen: function () { return eingaben.map(function (e) { return e.value; }); },
      markieren: function (res) {
        eingaben.forEach(function (e, i) { markiere(e, res.marken[i]); });
      },
      leeren: function () { eingaben.forEach(function (e) { e.value = ''; }); },
      klar: function () { eingaben.forEach(function (e) { markiere(e, ''); }); }
    };
  }

  function markiere(el, status) {
    el.classList.remove('ist-richtig', 'ist-falsch');
    el.removeAttribute('aria-invalid');
    if (status === 'ok') el.classList.add('ist-richtig');
    if (status === 'falsch') { el.classList.add('ist-falsch'); el.setAttribute('aria-invalid', 'true'); }
  }

  function baueTabelle(item, teil) {
    var eingaben = [];
    var kopf = h('tr', {}, item.kopf.map(function (k) { return h('th', { scope: 'col', html: k }); }));
    var rumpf = item.zeilen.map(function (zeile) {
      return h('tr', {}, zeile.map(function (c, ci) {
        if (c && typeof c === 'object') {
          var inp = eingabeFeld(c, item.kopf[ci]);
          eingaben.push(inp);
          return h('td', {}, inp);
        }
        return h('td', { html: c });
      }));
    });
    teil.appendChild(h('div', { class: 'table-scroll' }, h('table', { class: 'check-tabelle' }, [h('thead', {}, kopf), h('tbody', {}, rumpf)])));
    return {
      lesen: function () { return eingaben.map(function (e) { return e.value; }); },
      markieren: function (res) { eingaben.forEach(function (e, i) { markiere(e, res.marken[i]); }); },
      leeren: function () { eingaben.forEach(function (e) { e.value = ''; }); },
      klar: function () { eingaben.forEach(function (e) { markiere(e, ''); }); }
    };
  }

  function baueAuswahl(item, teil, mehrfach) {
    zaehler += 1;
    var name = 'w' + zaehler;
    var inputs = [];
    var gruppe = h('div', { class: 'check-optionen', role: mehrfach ? 'group' : 'radiogroup' });
    var labels = item.optionen.map(function (o) {
      var inp = h('input', { type: mehrfach ? 'checkbox' : 'radio', name: name });
      inputs.push(inp);
      var lab = h('label', { class: 'check-option' }, [inp, h('span', { html: o.text })]);
      gruppe.appendChild(lab);
      return lab;
    });
    teil.appendChild(gruppe);
    return {
      lesen: function () {
        var gewaehlt = [];
        inputs.forEach(function (e, i) { if (e.checked) gewaehlt.push(i); });
        return mehrfach ? gewaehlt : (gewaehlt.length ? gewaehlt[0] : -1);
      },
      markieren: function (res) {
        labels.forEach(function (l, i) {
          l.classList.remove('ist-richtig', 'ist-falsch');
          if (mehrfach) {
            if (res.marken[i] === 'ok') l.classList.add('ist-richtig');
            if (res.marken[i] === 'falsch') l.classList.add('ist-falsch');
          } else if (inputs[i].checked) {
            l.classList.add(res.status === 'ok' ? 'ist-richtig' : 'ist-falsch');
          }
        });
      },
      leeren: function () { inputs.forEach(function (e) { e.checked = false; }); },
      klar: function () { labels.forEach(function (l) { l.classList.remove('ist-richtig', 'ist-falsch'); }); }
    };
  }

  function baueZuordnung(item, teil) {
    var zeilen = [];
    var kopfZellen = [h('th', { scope: 'col', html: item.spalte || 'Aussage' })];
    if (item.radio) item.optionen.forEach(function (o) { kopfZellen.push(h('th', { scope: 'col', class: 'check-mitte', html: o })); });
    else kopfZellen.push(h('th', { scope: 'col', html: item.antwortspalte || 'Zuordnung' }));

    var rumpf = item.zeilen.map(function (z) {
      zaehler += 1;
      var id = 'z' + zaehler;
      var tr = h('tr', {});
      tr.appendChild(h('td', { html: z.text }));
      var lesen;
      if (item.radio) {
        var radios = item.optionen.map(function (o) {
          var r = h('input', { type: 'radio', name: id, value: o, 'aria-label': o + ': ' + z.text.replace(/<[^>]*>/g, '') });
          tr.appendChild(h('td', { class: 'check-mitte' }, r));
          return r;
        });
        lesen = function () { var w = radios.filter(function (r) { return r.checked; })[0]; return w ? w.value : ''; };
        zeilen.push({ tr: tr, lesen: lesen, leeren: function () { radios.forEach(function (r) { r.checked = false; }); } });
      } else {
        var sel = h('select', { id: id, class: 'check-auswahl', 'aria-label': z.text.replace(/<[^>]*>/g, '') },
          [h('option', { value: '' }, '– wählen –')].concat(item.optionen.map(function (o) { return h('option', { value: o }, o.replace(/<[^>]*>/g, '')); })));
        tr.appendChild(h('td', {}, sel));
        zeilen.push({ tr: tr, lesen: function () { return sel.value; }, leeren: function () { sel.value = ''; } });
      }
      return tr;
    });
    teil.appendChild(h('div', { class: 'table-scroll' }, h('table', { class: 'check-tabelle' }, [h('thead', {}, h('tr', {}, kopfZellen)), h('tbody', {}, rumpf)])));
    return {
      lesen: function () { return zeilen.map(function (z) { return z.lesen(); }); },
      markieren: function (res) {
        zeilen.forEach(function (z, i) {
          z.tr.classList.remove('ist-richtig', 'ist-falsch');
          if (res.marken[i] === 'ok') z.tr.classList.add('ist-richtig');
          if (res.marken[i] === 'falsch') z.tr.classList.add('ist-falsch');
        });
      },
      leeren: function () { zeilen.forEach(function (z) { z.leeren(); }); },
      klar: function () { zeilen.forEach(function (z) { z.tr.classList.remove('ist-richtig', 'ist-falsch'); }); }
    };
  }

  function baueAufgabe(item, nr) {
    var feedback = h('div', { class: 'check-feedback', 'aria-live': 'polite' });
    var teil = h('div', { class: 'check-teil' });
    var bereich = h('section', { class: 'check-aufgabe' });
    var eingabe, bewerten;

    if (item.typ === 'felder') { eingabe = baueFelder(item, teil); bewerten = function () { return bewerteFelder(item, eingabe.lesen()); }; }
    else if (item.typ === 'tabelle') { eingabe = baueTabelle(item, teil); bewerten = function () { return bewerteFelder(item, eingabe.lesen()); }; }
    else if (item.typ === 'wahl') { eingabe = baueAuswahl(item, teil, false); bewerten = function () { return bewerteWahl(item, eingabe.lesen()); }; }
    else if (item.typ === 'mehrfach') { eingabe = baueAuswahl(item, teil, true); bewerten = function () { return bewerteMehrfach(item, eingabe.lesen()); }; }
    else if (item.typ === 'zuordnung') { eingabe = baueZuordnung(item, teil); bewerten = function () { return bewerteZuordnung(item, eingabe.lesen()); }; }
    else throw new Error('Unbekannter Aufgabentyp: ' + item.typ);

    function zeigeFeedback(res) {
      feedback.innerHTML = '';
      feedback.className = 'check-feedback';
      bereich.removeAttribute('data-status');
      if (res.status === 'leer') {
        feedback.classList.add('leer');
        feedback.appendChild(h('p', {}, 'Bitte beantworten Sie zuerst diese Aufgabe.'));
        return;
      }
      bereich.setAttribute('data-status', res.status);
      if (res.status === 'ok') {
        feedback.classList.add('ok');
        feedback.appendChild(h('p', {}, [h('strong', {}, '✓ Richtig.'), item.weg ? h('span', { class: 'check-weg', html: ' ' + item.weg }) : null]));
      } else {
        feedback.classList.add('falsch');
        feedback.appendChild(h('p', {}, h('strong', {}, '✗ Noch nicht ganz.')));
        if (res.tipps.length) {
          feedback.appendChild(h('ul', {}, res.tipps.map(function (t) { return h('li', { html: '<span class="check-tipp">Tipp:</span> ' + t }); })));
        }
      }
    }

    var knopf = h('button', { type: 'button', class: 'check-knopf' }, 'Prüfen');

    function pruefen() {
      var res = bewerten();
      eingabe.markieren(res);
      zeigeFeedback(res);
      return res;
    }
    function zuruecksetzen() {
      eingabe.leeren(); eingabe.klar();
      feedback.innerHTML = ''; feedback.className = 'check-feedback';
      bereich.removeAttribute('data-status');
    }
    function aenderung() {
      eingabe.klar();
      feedback.innerHTML = ''; feedback.className = 'check-feedback';
      bereich.removeAttribute('data-status');
    }

    knopf.addEventListener('click', pruefen);
    bereich.addEventListener('input', aenderung);
    bereich.addEventListener('change', aenderung);
    bereich.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && e.target && e.target.tagName === 'INPUT' && e.target.type === 'text') { e.preventDefault(); pruefen(); }
    });

    bereich.appendChild(h('h2', { class: 'check-frage' }, [h('span', { class: 'check-nr', 'aria-hidden': 'true' }, String(nr)), h('span', { html: '<span class="visuell-versteckt">Aufgabe ' + nr + ': </span>' + item.frage })]));
    bereich.appendChild(teil);
    bereich.appendChild(h('div', { class: 'check-aktion' }, knopf));
    bereich.appendChild(feedback);

    return { el: bereich, pruefen: pruefen, zuruecksetzen: zuruecksetzen };
  }

  function baueCheck(container, daten) {
    var aufgaben = daten.aufgaben.map(function (item, i) { return baueAufgabe(item, i + 1); });
    var liste = h('div', { class: 'check-liste' }, aufgaben.map(function (a) { return a.el; }));
    var ergebnis = h('p', { class: 'check-ergebnis', 'aria-live': 'polite' });

    var alle = h('button', { type: 'button', class: 'check-knopf gross' }, 'Alle Aufgaben prüfen');
    var neu = h('button', { type: 'button', class: 'check-knopf sekundaer' }, 'Zurücksetzen');

    alle.addEventListener('click', function () {
      var richtig = 0, leer = 0;
      aufgaben.forEach(function (a) {
        var r = a.pruefen();
        if (r.status === 'ok') richtig += 1;
        if (r.status === 'leer') leer += 1;
      });
      var text = richtig + ' von ' + aufgaben.length + ' Aufgaben richtig.';
      if (leer) text += ' ' + leer + (leer === 1 ? ' Aufgabe ist' : ' Aufgaben sind') + ' noch unbeantwortet.';
      else if (richtig === aufgaben.length) text += ' Alles richtig.';
      else text += ' Lesen Sie die Tipps bei den markierten Aufgaben und probieren Sie es nochmals.';
      ergebnis.textContent = text;
    });
    neu.addEventListener('click', function () {
      aufgaben.forEach(function (a) { a.zuruecksetzen(); });
      ergebnis.textContent = '';
    });

    container.innerHTML = '';
    container.appendChild(liste);
    container.appendChild(h('div', { class: 'check-gesamt' }, [alle, neu, ergebnis]));
  }

  function start() {
    var apps = document.querySelectorAll('.check-app');
    Array.prototype.forEach.call(apps, function (app) {
      var quelle = app.getAttribute('data-json');
      fetch(quelle).then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      }).then(function (daten) {
        baueCheck(app, daten);
      }).catch(function () {
        app.innerHTML = '<p class="hinweis"><strong>Die Aufgaben konnten nicht geladen werden.</strong> Laden Sie die Seite neu. Bleibt der Fehler bestehen, informieren Sie Ihre Lehrperson.</p>';
      });
    });
  }

  return {
    start: start,
    zahl: zahl,
    pruefeFeld: pruefeFeld,
    felderVon: felderVon,
    bewerteFelder: bewerteFelder,
    bewerteWahl: bewerteWahl,
    bewerteMehrfach: bewerteMehrfach,
    bewerteZuordnung: bewerteZuordnung
  };
}));
