// ============================================================================
//  Birkonishi — Bibliothèque de chansons / piyoutim
// ----------------------------------------------------------------------------
//  Chaque chanson :
//    id, category, title, hebrew, author
//    lines : [{ he, tr, fr }]  he=hébreu, tr=translittération, fr=traduction FR
//    audio : { type, url }     (utilisé UNIQUEMENT dans la bibliothèque)
//
//  Textes : piyoutim traditionnels (domaine public).
//  Traductions : résumés libres, éditables par l'utilisateur.
// ============================================================================

const CATEGORIES = [
  { key: 'maroc',    label: 'Chansons marocaines',     icon: '🇲🇦' },
  { key: 'babasale', label: 'Baba Salé (Abir Yaacov)', icon: '🕯️' },
  { key: 'ashkenaz', label: 'Chansons ashkénazes',     icon: '🎻' },
  { key: 'habad',    label: 'Chansons Habad',          icon: '🔵' },
];

const SONGS = [
  // ----------------------------- MAROC -------------------------------------
  {
    id: 'deror-yikra',
    category: 'maroc',
    title: 'Deror Yikra',
    hebrew: 'דְּרוֹר יִקְרָא',
    author: 'Dounash ben Labrat (Fès, Xᵉ s.)',
    lines: [
      { he: 'דְּרוֹר יִקְרָא לְבֵן עִם בַּת · וְיִנְצָרְכֶם כְּמוֹ בָבַת', tr: 'Deror yikra le-ven im bat · ve-yintsorkhem kemo vavat', fr: 'Il proclame la liberté au fils comme à la fille, et vous garde comme la prunelle de ses yeux' },
      { he: 'נְעִים שִׁמְכֶם וְלֹא יֻשְׁבַּת · שְׁבוּ נוּחוּ בְּיוֹם שַׁבָּת', tr: 'Ne‘im shimkhem ve-lo yushbat · shevu nuḥu be-yom Shabbat', fr: 'Doux est votre nom qui ne cessera jamais ; asseyez-vous, reposez-vous au jour du Chabbat' },
      { he: 'דְּרֹשׁ נָוִי וְאוּלַמִּי · וְאוֹת יֶשַׁע עֲשֵׂה עִמִּי', tr: 'Derosh navi ve-ulami · ve-ot yesha‘ ase imi', fr: 'Recherche ma demeure et mon sanctuaire, et accomplis pour moi un signe de salut' },
      { he: 'נְטַע שׂוֹרֵק בְּתוֹךְ כַּרְמִי · שְׁעֵה שַׁוְעַת בְּנֵי עַמִּי', tr: 'Neta‘ sorek be-tokh karmi · she‘e shav‘at benei ami', fr: 'Plante un cep de choix dans ma vigne, écoute le cri des enfants de mon peuple' },
      { he: 'הֲדוֹךְ קָמַי אֵל קַנָּא · בְּמוֹג לֵבָב וּבַמְּגִנָּה', tr: 'Hadokh kamai El kana · be-mog levav u-va-meginna', fr: 'Écrase mes ennemis, Dieu jaloux, par le trouble des cœurs et l’effroi' },
      { he: 'וְנַרְחִיב פֶּה וּנְמַלְּאֶנָּה · לְשׁוֹנֵנוּ לְךָ רִנָּה', tr: 'Ve-narḥiv pe u-nemalenna · leshonenu lekha rina', fr: 'Alors nous ouvrirons grand la bouche, et notre langue chantera vers Toi' },
    ],
    audio: { type: 'youtube', url: 'https://www.youtube.com/results?search_query=deror+yikra+marocain' },
  },
  {
    id: 'ki-eshmera-shabbat',
    category: 'maroc',
    title: 'Ki Eshmera Shabbat',
    hebrew: 'כִּי אֶשְׁמְרָה שַׁבָּת',
    author: 'Abraham Ibn Ezra',
    lines: [
      { he: 'כִּי אֶשְׁמְרָה שַׁבָּת אֵל יִשְׁמְרֵנִי · אוֹת הִיא לְעוֹלְמֵי עַד בֵּינוֹ וּבֵינִי', tr: 'Ki eshmera Shabbat El yishmereni · ot hi le-olmei ad beino u-veini', fr: 'Si je garde le Chabbat, Dieu me gardera ; c’est un signe éternel entre Lui et moi' },
      { he: 'אָסוּר מְצֹא חֵפֶץ עֲשׂוֹת דְּרָכִים · גַּם מִלְּדַבֵּר בּוֹ דִּבְרֵי צְרָכִים', tr: 'Asur metso ḥefets asot derakhim · gam mi-ledaber bo divrei tsrakhim', fr: 'Il est défendu d’y traiter ses affaires ou d’y parler de choses matérielles' },
      { he: 'דִּבְרֵי סְחוֹרָה אַף דִּבְרֵי מְלָכִים · אֶהְגֶּה בְּתוֹרַת אֵל וּתְחַכְּמֵנִי', tr: 'Divrei seḥora af divrei melakhim · ehge be-torat El u-teḥakmeni', fr: 'Ni de commerce ni des affaires des rois ; je méditerai la Torah de Dieu qui me rend sage' },
      { he: 'בּוֹ אֶמְצְאָה תָמִיד נֹפֶשׁ לְנַפְשִׁי · הִנֵּה לְדוֹר רִאשׁוֹן נָתַן קְדוֹשִׁי', tr: 'Bo emtse’a tamid nofesh le-nafshi · hine le-dor rishon natan kedoshi', fr: 'J’y trouve toujours le repos de mon âme ; voici le don que mon Saint fit à la première génération' },
    ],
    audio: { type: 'youtube', url: 'https://www.youtube.com/results?search_query=ki+eshmera+shabbat' },
  },
  {
    id: 'yom-ze-leyisrael',
    category: 'maroc',
    title: 'Yom Ze Le-Yisrael',
    hebrew: 'יוֹם זֶה לְיִשְׂרָאֵל',
    author: 'Attribué à Isaac Louria',
    lines: [
      { he: 'יוֹם זֶה לְיִשְׂרָאֵל אוֹרָה וְשִׂמְחָה · שַׁבַּת מְנוּחָה', tr: 'Yom ze le-Yisrael ora ve-simḥa · Shabbat menuḥa', fr: 'Ce jour est pour Israël lumière et joie : le Chabbat du repos (refrain)' },
      { he: 'צִוִּיתָ פִּקּוּדִים בְּמַעֲמַד סִינַי · שַׁבָּת וּמוֹעֲדִים לִשְׁמֹר בְּכָל שָׁנַי', tr: 'Tsivita pikkudim be-ma‘amad Sinai · Shabbat u-mo‘adim lishmor be-khol shanai', fr: 'Tu as ordonné les commandements au Sinaï : garder le Chabbat et les fêtes toute ma vie' },
      { he: 'לַעֲרֹךְ לְפָנַי מַשְׂאֵת וַאֲרוּחָה · שַׁבַּת מְנוּחָה', tr: 'La-arokh lefanai mas’et va-aruḥa · Shabbat menuḥa', fr: 'Pour dresser devant moi le festin et le repas : le Chabbat du repos' },
      { he: 'חֶמְדַּת הַלְּבָבוֹת לְאֻמָּה שְׁבוּרָה · לִנְפָשׁוֹת נִכְאָבוֹת נְשָׁמָה יְתֵרָה', tr: 'Ḥemdat ha-levavot le-uma shevura · li-nfashot nikh’avot neshama yetera', fr: 'Désir des cœurs pour un peuple brisé, aux âmes affligées une âme supplémentaire' },
    ],
    audio: { type: 'youtube', url: 'https://www.youtube.com/results?search_query=yom+ze+leyisrael' },
  },
  {
    id: 'ochil-yom-yom',
    category: 'maroc',
    title: 'Ochil Yom Yom',
    hebrew: 'אוֹחִיל יוֹם יוֹם',
    author: 'Bakachot marocaines',
    lines: [
      { he: 'אוֹחִיל יוֹם יוֹם אֶשְׁתָּאֶה · עֵינַי תָּמִיד צוֹפִיָּה', tr: 'Oḥil yom yom eshta’e · einai tamid tsofiya', fr: 'J’espère chaque jour, émerveillé ; mes yeux sont toujours tournés vers Lui' },
      { he: 'אֶשְׁאֲלָה מֵאֵל דֵּעָה · אֵי זֶה דֶּרֶךְ אֵלֵכָה', tr: 'Esh’ala me-El de‘a · ei ze derekh elekha', fr: 'Je demande à Dieu la connaissance : quelle est la voie que je dois suivre' },
      { he: 'צוּר מִשְׂגַּבִּי בְּיוֹם צָרָה · אֵלָיו לִבִּי וְעֵינִי', tr: 'Tsur misgabi be-yom tsara · elav libi ve-eini', fr: 'Rocher, mon refuge au jour de détresse ; vers Lui vont mon cœur et mon regard' },
    ],
    audio: { type: 'youtube', url: 'https://www.youtube.com/results?search_query=ochila+bakashot+marocaines' },
  },

  // ------------------------- BABA SALÉ / ABIR YAACOV -----------------------
  {
    id: 'abir-yaacov',
    category: 'babasale',
    title: 'Piyout Abir Yaacov',
    hebrew: 'אַבִּיר יַעֲקֹב',
    author: 'En l’honneur de Rabbi Yaacov Abihatsira',
    lines: [
      { he: 'אַבִּיר יַעֲקֹב קְדוֹשׁ יִשְׂרָאֵל · צַדִּיק יְסוֹד עוֹלָם', tr: 'Abir Yaacov kedosh Yisrael · tsadik yesod olam', fr: 'Abir Yaacov, saint d’Israël, juste, fondement du monde' },
      { he: 'מְאוֹר הַגּוֹלָה עַמּוּד הַיְמִינִי · פָּטִישׁ הֶחָזָק וּמַגֵּן', tr: 'Me’or ha-gola amud ha-yemini · patish he-ḥazak u-magen', fr: 'Lumière de l’exil, pilier de droite, marteau puissant et bouclier' },
      { he: 'זְכוּתוֹ תָּגֵן עָלֵינוּ וְעַל כָּל יִשְׂרָאֵל · אָמֵן', tr: 'Zekhuto tagen aleinu ve-al kol Yisrael · amen', fr: 'Que son mérite nous protège, nous et tout Israël. Amen' },
    ],
    audio: { type: 'youtube', url: 'https://www.youtube.com/results?search_query=abir+yaacov+piyout' },
  },
  {
    id: 'baba-sale',
    category: 'babasale',
    title: 'Hymne à Baba Salé',
    hebrew: 'בָּבָּא סָאלֵי',
    author: 'Rabbi Israël Abihatsira',
    lines: [
      { he: 'צַדִּיק כַּתָּמָר יִפְרָח · כְּאֶרֶז בַּלְּבָנוֹן יִשְׂגֶּה', tr: 'Tsadik ka-tamar yifraḥ · ke-erez ba-Levanon yisge', fr: 'Le juste fleurira comme le palmier, il grandira comme le cèdre du Liban' },
      { he: 'שְׁתוּלִים בְּבֵית ה׳ · בְּחַצְרוֹת אֱלֹהֵינוּ יַפְרִיחוּ', tr: 'Shetulim be-veit Adonai · be-ḥatsrot Eloheinu yafriḥu', fr: 'Plantés dans la maison de l’Éternel, ils fleuriront dans les parvis de notre Dieu' },
    ],
    audio: { type: 'youtube', url: 'https://www.youtube.com/results?search_query=baba+sale+piyout' },
  },

  // ----------------------------- ASHKÉNAZE ---------------------------------
  {
    id: 'shalom-aleichem',
    category: 'ashkenaz',
    title: 'Shalom Aleichem',
    hebrew: 'שָׁלוֹם עֲלֵיכֶם',
    author: 'Chant d’accueil du Chabbat',
    lines: [
      { he: 'שָׁלוֹם עֲלֵיכֶם מַלְאֲכֵי הַשָּׁרֵת מַלְאֲכֵי עֶלְיוֹן · מִמֶּלֶךְ מַלְכֵי הַמְּלָכִים הַקָּדוֹשׁ בָּרוּךְ הוּא', tr: 'Shalom aleichem malakhei ha-sharet malakhei elyon · mi-melekh malkhei ha-melakhim ha-Kadosh Barukh Hu', fr: 'Paix sur vous, anges du service, anges du Très-Haut, envoyés par le Roi des rois, le Saint béni soit-Il' },
      { he: 'בּוֹאֲכֶם לְשָׁלוֹם מַלְאֲכֵי הַשָּׁלוֹם מַלְאֲכֵי עֶלְיוֹן', tr: 'Bo’akhem le-shalom malakhei ha-shalom malakhei elyon', fr: 'Que votre venue soit pour la paix, anges de la paix, anges du Très-Haut' },
      { he: 'בָּרְכוּנִי לְשָׁלוֹם מַלְאֲכֵי הַשָּׁלוֹם מַלְאֲכֵי עֶלְיוֹן', tr: 'Barkhuni le-shalom malakhei ha-shalom malakhei elyon', fr: 'Bénissez-moi pour la paix, anges de la paix, anges du Très-Haut' },
      { he: 'צֵאתְכֶם לְשָׁלוֹם מַלְאֲכֵי הַשָּׁלוֹם מַלְאֲכֵי עֶלְיוֹן', tr: 'Tsetkhem le-shalom malakhei ha-shalom malakhei elyon', fr: 'Que votre départ soit pour la paix, anges de la paix, anges du Très-Haut' },
    ],
    audio: { type: 'youtube', url: 'https://www.youtube.com/results?search_query=shalom+aleichem+shabbat' },
  },
  {
    id: 'adon-olam',
    category: 'ashkenaz',
    title: 'Adon Olam',
    hebrew: 'אֲדוֹן עוֹלָם',
    author: 'Attribué à Salomon Ibn Gabirol',
    lines: [
      { he: 'אֲדוֹן עוֹלָם אֲשֶׁר מָלַךְ · בְּטֶרֶם כָּל יְצִיר נִבְרָא', tr: 'Adon olam asher malakh · be-terem kol yetsir nivra', fr: 'Maître du monde qui régna avant que toute créature fût créée' },
      { he: 'לְעֵת נַעֲשָׂה בְחֶפְצוֹ כֹּל · אֲזַי מֶלֶךְ שְׁמוֹ נִקְרָא', tr: 'Le-et na‘asa ve-ḥeftso kol · azai melekh shemo nikra', fr: 'Quand tout fut fait selon sa volonté, alors son nom fut proclamé « Roi »' },
      { he: 'וְאַחֲרֵי כִּכְלוֹת הַכֹּל · לְבַדּוֹ יִמְלוֹךְ נוֹרָא', tr: 'Ve-aḥarei kikhlot ha-kol · levado yimlokh nora', fr: 'Et après que tout aura cessé, Lui seul régnera, redoutable' },
      { he: 'וְהוּא הָיָה וְהוּא הֹוֶה · וְהוּא יִהְיֶה בְּתִפְאָרָה', tr: 'Ve-hu haya ve-hu hove · ve-hu yihye be-tif’ara', fr: 'Il fut, Il est, et Il sera dans la gloire' },
      { he: 'וְהוּא אֶחָד וְאֵין שֵׁנִי · לְהַמְשִׁיל לוֹ לְהַחְבִּירָה', tr: 'Ve-hu eḥad ve-ein sheni · le-hamshil lo le-haḥbira', fr: 'Il est Un, sans second à qui Le comparer ou L’associer' },
      { he: 'בְּלִי רֵאשִׁית בְּלִי תַכְלִית · וְלוֹ הָעֹז וְהַמִּשְׂרָה', tr: 'Beli reshit beli takhlit · ve-lo ha-oz ve-ha-misra', fr: 'Sans commencement ni fin, à Lui la force et l’empire' },
      { he: 'וְהוּא אֵלִי וְחַי גּוֹאֲלִי · וְצוּר חֶבְלִי בְּעֵת צָרָה', tr: 'Ve-hu Eli ve-ḥai go’ali · ve-tsur ḥevli be-et tsara', fr: 'Il est mon Dieu, mon Rédempteur vivant, le roc de mon sort au jour de détresse' },
      { he: 'בְּיָדוֹ אַפְקִיד רוּחִי · בְּעֵת אִישָׁן וְאָעִירָה', tr: 'Be-yado afkid ruḥi · be-et ishan ve-a‘ira', fr: 'En sa main je remets mon esprit quand je m’endors et quand je m’éveille' },
      { he: 'וְעִם רוּחִי גְּוִיָּתִי · ה׳ לִי וְלֹא אִירָא', tr: 'Ve-im ruḥi geviyati · Adonai li ve-lo ira', fr: 'Et avec mon esprit mon corps : l’Éternel est avec moi, je ne crains rien' },
    ],
    audio: { type: 'youtube', url: 'https://www.youtube.com/results?search_query=adon+olam' },
  },

  // ------------------------------- HABAD -----------------------------------
  {
    id: 'niggun-habad',
    category: 'habad',
    title: 'Niggoun de la Deveikout',
    hebrew: 'נִגּוּן דְּבֵקוּת',
    author: 'Tradition Habad',
    lines: [
      { he: '♪  (mélodie sans paroles)  ♪', tr: 'Ya ba bam, ya ba bam…', fr: 'Niggoun : mélodie sans paroles, chantée pour l’élévation de l’âme (deveikout)' },
    ],
    audio: { type: 'youtube', url: 'https://www.youtube.com/results?search_query=chabad+niggun+deveikut' },
  },
  {
    id: 'ufaratsta',
    category: 'habad',
    title: 'Ufaratsta',
    hebrew: 'וּפָרַצְתָּ',
    author: 'Tradition Habad (Genèse 28, 14)',
    lines: [
      { he: 'וּפָרַצְתָּ יָמָּה וָקֵדְמָה וְצָפוֹנָה וָנֶגְבָּה', tr: 'Ufaratsta yama va-kedma ve-tsafona va-negba', fr: 'Tu t’étendras à l’ouest et à l’est, au nord et au sud' },
      { he: 'וְנִבְרְכוּ בְךָ כָּל מִשְׁפְּחֹת הָאֲדָמָה וּבְזַרְעֶךָ', tr: 'Ve-nivrekhu vekha kol mishpeḥot ha-adama u-vezar‘ekha', fr: 'Et toutes les familles de la terre seront bénies par toi et par ta descendance' },
    ],
    audio: { type: 'youtube', url: 'https://www.youtube.com/results?search_query=ufaratzta+chabad' },
  },
];

// Compositions de départ prêtes à l'emploi ---------------------------------
const PRESETS = {
  blank: {
    label: 'Livret blanc',
    cover: { title: 'Mon Birkon', subtitle: 'À personnaliser' },
    blocks: [],
  },
  classic: {
    label: 'Livret classique (repas de Chabbat)',
    cover: { title: 'Birkonishi', subtitle: 'Chansons du Chabbat' },
    blocks: [
      { type: 'song', songId: 'shalom-aleichem' },
      { type: 'song', songId: 'deror-yikra' },
      { type: 'song', songId: 'ki-eshmera-shabbat' },
      { type: 'song', songId: 'yom-ze-leyisrael' },
      { type: 'song', songId: 'adon-olam' },
    ],
  },
  maroc: {
    label: 'Livret marocain',
    cover: { title: 'Birkonishi', subtitle: 'Piyoutim de la tradition marocaine' },
    blocks: [
      { type: 'song', songId: 'deror-yikra' },
      { type: 'song', songId: 'ki-eshmera-shabbat' },
      { type: 'song', songId: 'ochil-yom-yom' },
      { type: 'song', songId: 'abir-yaacov' },
    ],
  },
};

// Modèles graphiques -------------------------------------------------------
const TEMPLATES = {
  royal:   { label: 'Royal',    font: "'Frank Ruhl Libre', Georgia, serif", accent: '#7b1e3b', paper: '#fbf7ef' },
  desert:  { label: 'Désert',   font: "'Amiri', Georgia, serif",            accent: '#a45c1e', paper: '#fdf6ec' },
  ocean:   { label: 'Océan',    font: "'Frank Ruhl Libre', Georgia, serif", accent: '#1e5a7b', paper: '#f2f8fb' },
  classic: { label: 'Classique',font: 'Georgia, serif',                     accent: '#2c2c2c', paper: '#ffffff' },
};
