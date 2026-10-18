# Birkonishi

Créez et personnalisez votre **birkon** (livret de prières, chants et piyoutim) en moins
d'une heure, comme un album photo : on choisit un style, une composition de départ, puis on
ajoute / réorganise chants, textes et images en direct. Export en **PDF imprimable**.

En ligne : https://jordanscience.github.io/birkonishi/

> Version gratuite — **sans paiement**. La commande imprimée (à partir de 100 exemplaires)
> viendra dans une version ultérieure.

## Fonctionnalités

- **86 textes complets**, vérifiés mot à mot contre les sources hébraïques :
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
  - **Ajouts** : Yah Chimkha, Tsama Nafchi, Agadelkha, Hamavdil (version Edot HaMizra'h),
    Et Chaaré Ratson, Adon Hasseli'hot ; Achira Na et É'erokh Mahalal (Rabbi Aharon
    Abihatsira) ; Baroukh El Elyon, Chabbat Hayom ; Ana Béko'ah ; zemirot du Ari (Azamer
    Bichva'hin, Assader Lis'oudata, Bné Hékhala), Yah Ekhsof (Karlin), Mizmor LeDavid,
    Kol Ha'olam Koullo (Breslev), Véhaèr Énénou, Achrénou, Essa Énaï, Tov Léhodot,
    Hamal'akh Hagoël, Léma'an A'haï, Mi Ha'ich, Yévarékhékha, Pit'hou Li, Ki Lo Naé,
    Hava Naguila, Tsama Lekha Nafchi.
  - **Fêtes de l'année** : Roch Hachana (Simanim, A'hot Ketana, Avinou Malkénou),
    Souccot et Sim'hat Torah (Ouchpizin, Ana Hachem, Sissou Vessim'hou, Mipi El),
    'Hanouka (bénédictions, Hanérot Hallalou, Maoz Tsour), Pourim (Chochanat Yaakov,
    LaYehoudim), Pessa'h (Ha La'hma 'Anya, Ma Nichtana, 'Avadim Hayinou, Véhi Chéamda,
    Dayénou, Adir Hou, Ki Lo Naé, É'had Mi Yodéa, 'Had Gadya, Léchana Haba'a),
    Chavouot (Torah Tsiva), Yom Haatsmaout (Hatikva).
- **Traduction française** de chaque strophe (affichable ou non).
- **Phonétique** générée automatiquement depuis l'hébreu vocalisé (`js/translit.js`,
  prononciation séfarade, graphie francophone : ch, 'h, kh, ou, é…), affichable ou non.
- **Mise en page de birkon** : vers courts sur deux colonnes, prières en paragraphes justifiés,
  refrains signalés, en-tête « (suite) » quand un chant continue, numéros de page.
- **Atelier façon album photo** : rail d'outils (Modèles, Chants, Textes, Photos, Décors,
  Fonds, Style), panneau d'outil, toile, pellicule de pages et inspecteur de l'élément choisi.
- **Éléments libres sur chaque page** : textes, photos, décors et formes se placent, se
  déplacent, se redimensionnent et pivotent à la souris ou au doigt (poignées, aimantation au
  centre, aux marges et aux autres éléments, Alt pour la désactiver). Double-clic pour écrire.
  Police (22 polices dont 9 hébraïques vocalisées), taille, couleur, gras/italique,
  alignement, interligne, opacité, miroir, premier plan / arrière-plan, « derrière le texte »,
  verrouillage, duplication.
- **Photos** : ajout multiple ou glisser depuis le disque, conservées dans le navigateur
  (IndexedDB, rien n'est envoyé) ; formes rectangle / rond / arche, cadrage, zoom, filtres,
  bordure ; cadres photo vides à remplir (non imprimés tant qu'ils sont vides).
- **30 décors SVG** (Maguen David, Menorah, 'Hamsa, Couronne, zellige, séparateurs, coins à
  placer dans les 4 coins, cadres photo) et **7 cadres de page** (filet, double, coins, arche
  marocaine, bande zellige, pointillés, filet doré).
- **Fonds** par page ou pour tout le livret : couleur du papier, motif, cadre, photo en fond.
- **9 thèmes** (Royal, Fès, Désert, Jérusalem, Olivier, Grenade, Océan, Nuit de Chabbat,
  Classique) entièrement modifiables : polices, couleurs, taille du texte, interligne, marges,
  style des titres de chants (classique, bandeau, cadre, aligné), séparateur, numéros de page.
- **Réglages par chant** : taille, 1 ou 2 colonnes, style de titre, phonétique / traduction,
  auteur, nouvelle page.
- **Couverture** : 5 mises en page (classique, grande photo, arche, hébreu, médaillon) ;
  **pages libres** : vierge, 1 / 2 / 4 photos, photo + texte, dédicace, arche.
- **Compositions de départ** : Chabbat séfarade, Chabbat ashkénaze, livret marocain, Chabbat
  hassidique, Hilloula, Roch Hachana, Séder de Pessa'h, Simha, livret vierge.
- **Feuilleteur** à pages **carrées**, navigation horizontale (‹ ›, flèches), zoom (Ctrl+molette),
  vue d'ensemble, pellicule de vignettes, mode aperçu.
- **Glisser-déposer** : chants de la bibliothèque vers le livret, n'importe quelle ligne d'un
  chant pour le déplacer ; **Ctrl+Z / Ctrl+Y** pour annuler / rétablir ; sauvegarde automatique.
- **Recherche** tolérante (titre, hébreu, auteur — sans accents ni voyelles), filtre par catégorie.
- **Écouter** (lien YouTube) : uniquement dans la bibliothèque, jamais dans le livret.
- **Paragraphes** insérés dans le fil du livret (suivent la pagination).
- **Mobile** : barre d'onglets en bas, panneaux en feuilles coulissantes.
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
├── index.html        Interface de l'atelier
├── css/styles.css    Interface, typographie du livret, mobile, impression (14,8 cm)
└── js/
    ├── icons.js      Icônes SVG (style Lucide)
    ├── translit.js   Translittération automatique hébreu → phonétique française
    ├── songs.js      Bibliothèque (textes, traductions, sources), compositions
    ├── design.js     Polices, thèmes, motifs, mises en page, modèles de texte, formes
    ├── ornaments.js  Décors SVG et cadres de page
    └── app.js        Atelier : pagination, calques libres, photos, inspecteur, export
```

## Ajouter un chant

Ajoutez une entrée dans `SONGS` (`js/songs.js`) :

```js
{
  id: 'mon-piyout',
  category: 'maroc',              // prieres | chabbat | fetes | maroc | babasale | ashkenaz | hassidique | habad
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
