# Birkonishi

Créez et personnalisez votre **birkon** (livret de prières, chants et piyoutim) en moins
d'une heure, comme un album photo : on choisit un style, une composition de départ, puis on
ajoute / réorganise chants, textes et images en direct. Export en **PDF imprimable**.

En ligne : https://jordanscience.github.io/birkonishi/

> Version gratuite — **sans paiement**. La commande imprimée (à partir de 100 exemplaires)
> viendra dans une version ultérieure.

## Fonctionnalités

- **35 textes complets**, vérifiés mot à mot contre les sources hébraïques :
  - **Prières** : Kiddouch du vendredi soir (séfarade et ashkénaze), **Birkat Hamazon complet**
    (rite séfarade / Edot HaMizra'h et rite ashkénaze : zimoun, 4 bénédictions, Retsé de
    Chabbat, Harahaman, bénédiction de l'invité, versets de conclusion).
  - **Zemirot de Chabbat** : Chalom Alékhem, Échet 'Hayil, Yédid Néfech, Lékha Dodi, Yah Ribon,
    Tsour Michélo, Déror Yikra, Ki Echmera, Yom Zé LeYisraël, Ménou'ha VéSim'ha, Yom Chabbaton,
    Yom Zé Mékhoubad.
  - **Piyoutim marocains** : A'oufa Echkona, Yafa VéTama, O'hil Yom Yom, Cha'har Avakéchkha,
    El Nora Alila.
  - **Baba Salé & hilloula** : Achir Likhvod 'Havérim (Rabbi Yaakov Abihatsira, l'« Abir
    Yaakov »), Bar Yo'haï, Tsadik Katamar.
  - **Liturgie / ashkénaze** : Adon Olam, Yigdal, Maoz Tsour. **Hassidique & Habad** : Am Israël
    'Haï, Ossé Chalom, Hiné Ma Tov, Ani Maamin, Siman Tov, Od Yichama, Oufaratsta, niggoun.
- **Traduction française** de chaque strophe (affichable ou non).
- **Phonétique** générée automatiquement depuis l'hébreu vocalisé (`js/translit.js`,
  prononciation séfarade, graphie francophone : ch, 'h, kh, ou, é…), affichable ou non.
- **Mise en page de birkon** : vers courts sur deux colonnes, prières en paragraphes justifiés,
  refrains signalés, en-tête « (suite) » quand un chant continue, numéros de page.
- **Compositions de départ** : Chabbat séfarade, Chabbat ashkénaze, livret marocain, Simha,
  livret vierge. **4 styles** (Royal, Désert, Océan, Classique) avec polices hébraïques complètes.
- **Feuilleteur** à pages **carrées**, navigation horizontale (‹ ›, flèches), zoom, vue d'ensemble.
- **Glisser-déposer** : de la bibliothèque vers le livret, et dans le livret pour réordonner ;
  boutons ↑ ↓ et suppression sur chaque chant (pratique au doigt) ; **Ctrl+Z** pour annuler.
- **Recherche** tolérante (titre, hébreu, auteur — sans accents ni voyelles).
- **Écouter** (lien YouTube) : uniquement dans la bibliothèque, jamais dans le livret.
- **Texte libre** et **images** (réduites automatiquement ; tout reste dans le navigateur).
- **Export PDF** fidèle à l'écran : pages carrées de **14,8 cm** (largeur A5), pleine page —
  bouton « Exporter en PDF » puis « Enregistrer au format PDF ».

## Lancer en local

Site 100 % statique (HTML/CSS/JS, aucune dépendance) :

```bash
python -m http.server 8000
```

puis ouvrir http://localhost:8000

## Structure

```
birkonim/
├── index.html        Interface de l'éditeur
├── css/styles.css    Design system + impression (pages carrées 14,8 cm)
└── js/
    ├── icons.js      Icônes SVG (style Lucide)
    ├── translit.js   Translittération automatique hébreu → phonétique française
    ├── songs.js      Bibliothèque (textes, traductions, sources), compositions, styles
    └── app.js        Éditeur : rendu, pagination, glisser-déposer, export
```

## Ajouter un chant

Ajoutez une entrée dans `SONGS` (`js/songs.js`) :

```js
{
  id: 'mon-piyout',
  category: 'maroc',              // prieres | chabbat | maroc | babasale | ashkenaz | hassidique | habad
  title: 'Titre translittéré',
  hebrew: 'כּוֹתֶרֶת',
  author: 'Auteur / origine',
  audio: yt('mots-clés de recherche YouTube'),
  lines: [
    { r: 1, he: 'פִּזְמוֹן / שׁוּרָה שְׁנִיָּה', fr: 'Refrain' },     // r:1 = refrain
    { he: 'שׁוּרָה א / שׁוּרָה ב / שׁוּרָה ג / שׁוּרָה ד', fr: 'Traduction de la strophe' },
  ],
}
```

« / » sépare les vers, « · » les phrases d'une prière. La phonétique est calculée
automatiquement (on peut la forcer avec un champ `tr`). Écrire le Nom divin `יְיָ`.

## Sources des textes

Wikisource hébreu (zemirot, piyoutim, siddour), Sefaria (versets bibliques),
birkathamazon.org (Birkat Hamazon Edot HaMizra'h et ashkénaze), Torah-Box (A'oufa Echkona).

## Prochaines étapes

- Panier, devis et paiement en ligne (à partir de 100 exemplaires).
- Lecteur audio intégré.
- Comptes utilisateurs / partage d'un livret par lien.
