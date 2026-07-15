# Birkonishi 🎵📖

Créez et personnalisez votre **Birkon** (livret de chansons & piyoutim) en moins d'une heure,
comme un album photo : on choisit un modèle, une composition de départ, puis on ajoute /
réorganise les chansons, textes et images en direct. Export en **PDF imprimable**.

> Version démo (V1) — **sans paiement**. Le paiement en ligne et la commande à partir de
> 100 exemplaires seront ajoutés dans une version ultérieure.

## Fonctionnalités de cette V1

- **Modèles graphiques** : Royal, Désert, Océan, Classique.
- **Compositions de départ** : livret blanc, livret classique (repas de Chabbat), livret marocain.
- **Bibliothèque de chansons** par catégorie :
  - 🇲🇦 Chansons marocaines (Deror Yikra, Ki Eshmera Chabbat, Yom Ze Le-Yisrael, Ochil Yom Yom…)
  - 🕯️ Baba Salé (Abir Yaacov)
  - 🎻 Chansons ashkénazes
  - 🔵 Chansons Habad
- **Feuilleteur interactif** (style album photo), pages **carrées** (pas A4) :
  - navigation **horizontale** (boutons ‹ ›, flèches clavier, swipe/trackpad) — pas de défilement vertical entre les pages ;
  - **zoom** : au maximum une page carrée remplit la fenêtre, au minimum on voit plusieurs pages ;
  - **Vue d'ensemble** : toutes les pages en grille, on descend pour découvrir la suite, clic sur une vignette pour l'ouvrir.
- **Aperçu en direct** : le livret se construit pendant que vous ajoutez.
- **Réorganisation par glisser-déposer** (déplacez les blocs pour changer l'ordre).
- **Texte personnalisé** et **images personnalisées** (l'image reste dans votre navigateur).
- **Traduction** affichable en français ou anglais sous chaque strophe.
- **Écoute** : bouton « ▶ Écouter » qui ouvre un lien YouTube / Spotify pour entendre l'air.
- **Couverture personnalisable** (titre + sous-titre : noms, date de la simha…).
- **Sauvegarde automatique** dans le navigateur + **Annuler** (↶).
- **Export PDF** via l'impression du navigateur (« Enregistrer au format PDF »).

## Lancer en local

Le site est 100 % statique (HTML/CSS/JS, aucune dépendance à installer).

Option 1 — ouvrir directement le fichier `index.html` dans un navigateur.

Option 2 — servir avec un petit serveur local (recommandé) :

```bash
# Python
python -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Hébergement gratuit

Déposez simplement le dossier sur l'une de ces plateformes (gratuit) :

- **Netlify Drop** — https://app.netlify.com/drop → glissez le dossier, en ligne en 10 s.
- **GitHub Pages** — poussez le dossier dans un dépôt, activez Pages sur la branche `main`.
- **Cloudflare Pages** / **Vercel** — « import project », dossier statique, aucune commande de build.

## Système de design (UI/UX Pro Max)

L'interface suit le workflow du skill *UI/UX Pro Max* :

- **Style** : éditorial chaleureux · **Palette** : bordeaux `#7c1d3f` + or `#c69b4d` + ivoire.
- **Typographie** : *Fraunces* (titres), *Inter* (interface), *Frank Ruhl Libre* (hébreu).
- **Icônes** : SVG type Lucide (`js/icons.js`) — **aucun emoji utilisé comme icône**.
- **Accessibilité** : contraste ≥ 4.5:1, focus visible clavier, cibles tactiles ≥ 42 px.
- **Interactions** : transitions 150–300 ms, états au survol, `prefers-reduced-motion` respecté.
- **Mode sombre** automatique (`prefers-color-scheme`) ; le livret reste une feuille ivoire.
- **Responsive** : points de rupture 420 / 768 / 1024 px ; sur mobile, la bibliothèque
  s'ouvre en **tiroir latéral** (bouton menu). La taille des pages s'ajuste automatiquement
  à l'écran (« fit-to-viewport ») pour rester grande et lisible partout.

## Structure

```
birkonim/
├── index.html        Interface de l'éditeur
├── css/styles.css    Design system + mise en page d'impression (PDF)
└── js/
    ├── icons.js      Icônes SVG (Lucide) — source unique
    ├── songs.js      Bibliothèque de chansons, presets et modèles (à enrichir)
    └── app.js        Logique de l'éditeur (rendu, drag & drop, pagination, export)
```

## Ajouter une chanson

Éditez `js/songs.js` et ajoutez une entrée dans `SONGS` :

```js
{
  id: 'mon-piyout',
  category: 'maroc',              // maroc | babasale | ashkenaz | habad
  title: 'Titre translittéré',
  hebrew: 'כותרת בעברית',
  author: 'Auteur / origine',
  lines: [
    { he: 'שורה בעברית', tr: 'translittération', fr: 'traduction FR', en: 'EN translation' },
  ],
  audio: { type: 'youtube', url: 'https://…' },   // ou spotify / link
}
```

## Prochaines étapes (backlog)

- Lecteur audio intégré (iframe Spotify / YouTube) au lieu d'un simple lien.
- Panier & devis, paiement en ligne, seuil de 100 exemplaires.
- Comptes utilisateurs pour retrouver ses projets.
- Export PDF haute résolution côté serveur (mise en page imprimeur).
- Plus de chansons et de traductions vérifiées.
