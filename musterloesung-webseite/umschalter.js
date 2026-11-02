/* Design-Umschalter (nur zum Zeigen in der Vorlesung).
   Blendet unten rechts eine kleine Leiste ein, mit der sich dieselben HTML-Seiten
   live umgestalten lassen:
     Design:   Einfach (style.css) oder Modern (style-modern.css)
     Ausgabe:  Bildschirm, Handy (mobile.css) oder Druck (print.css)
   Ohne JavaScript ändert sich nichts: Die Seiten verwenden dann style.css.
   Der Umschalter tauscht nur die href- bzw. media-Angaben der <link>-Zeilen im <head>.
   Die Auswahl bleibt beim Wechsel zwischen den Seiten erhalten. */
(function () {
  'use strict';

  function suche(name) {
    return document.querySelector('link[href$="' + name + '"]');
  }

  var haupt = suche('style.css');
  var druck = suche('print.css');
  var handy = suche('mobile.css');
  if (!haupt || !druck || !handy) { return; }

  var basis = 'einfach';
  var ausgabe = 'bildschirm';
  try {
    basis = localStorage.getItem('design-basis') || basis;
    ausgabe = localStorage.getItem('design-ausgabe') || ausgabe;
  } catch (e) { /* ohne Speicher: Standardwerte */ }

  /* Leiste im Shadow DOM, damit weder das Design der Seite noch print.css sie verändern */
  var host = document.createElement('div');
  var schatten = host.attachShadow({ mode: 'open' });
  schatten.innerHTML =
    '<style>' +
    ':host { position: fixed; right: 12px; bottom: 12px; z-index: 99999; }' +
    '@media print { :host { display: none; } }' +
    '.leiste { font: 14px/1.3 system-ui, Arial, sans-serif; background: #1f2430; color: #fff;' +
    '  border-radius: 12px; padding: 8px 10px; box-shadow: 0 6px 24px rgb(0 0 0 / .4); }' +
    '.zeile { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }' +
    '.zeile + .zeile { margin-top: 6px; }' +
    '.titel { opacity: .7; min-width: 64px; }' +
    'button { font: inherit; color: #fff; background: transparent; border: 1px solid #5c6475;' +
    '  border-radius: 999px; padding: 3px 12px; cursor: pointer; }' +
    'button:hover { border-color: #fff; }' +
    'button[aria-pressed="true"] { background: #d4a54a; border-color: #d4a54a; color: #1b1405; font-weight: 600; }' +
    '</style>' +
    '<div class="leiste">' +
    '<div class="zeile"><span class="titel">Design</span>' +
    '<button data-basis="einfach">Einfach</button><button data-basis="modern">Modern</button></div>' +
    '<div class="zeile"><span class="titel">Ausgabe</span>' +
    '<button data-ausgabe="bildschirm">Bildschirm</button><button data-ausgabe="handy">Handy</button>' +
    '<button data-ausgabe="druck">Druck</button></div>' +
    '</div>';

  function anwenden() {
    haupt.setAttribute('href', basis === 'modern' ? './style-modern.css' : './style.css');
    /* media="all": das Stylesheet gilt sofort, auch ohne schmales Fenster bzw. Drucker */
    druck.media = ausgabe === 'druck' ? 'all' : 'print';
    handy.media = ausgabe === 'handy' ? 'all' : '(max-width: 600px)';

    var s = document.documentElement.style;
    if (ausgabe === 'handy') {
      s.maxWidth = '390px'; s.margin = '0 auto'; s.padding = '';
      s.boxShadow = '0 0 0 1px #888, 0 0 40px rgb(0 0 0 / .35)';
    } else if (ausgabe === 'druck') {
      s.maxWidth = '21cm'; s.margin = '0 auto'; s.padding = '2cm';   /* A4-Breite mit Seitenrand */
      s.boxShadow = '0 0 0 1px #888, 0 0 40px rgb(0 0 0 / .35)';
    } else {
      s.maxWidth = ''; s.margin = ''; s.padding = ''; s.boxShadow = '';
    }

    schatten.querySelectorAll('button').forEach(function (b) {
      var an = b.dataset.basis ? b.dataset.basis === basis : b.dataset.ausgabe === ausgabe;
      b.setAttribute('aria-pressed', an ? 'true' : 'false');
    });
    try {
      localStorage.setItem('design-basis', basis);
      localStorage.setItem('design-ausgabe', ausgabe);
    } catch (e) { /* ohne Speicher: gilt nur für diese Seite */ }
  }

  schatten.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) { return; }
    if (b.dataset.basis) { basis = b.dataset.basis; }
    if (b.dataset.ausgabe) { ausgabe = b.dataset.ausgabe; }
    anwenden();
  });

  document.body.appendChild(host);
  anwenden();
})();
