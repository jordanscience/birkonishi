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
  { key: 'prieres',    label: 'Prières',                 icon: '🕎' },
  { key: 'chabbat',    label: 'Zemirot de Chabbat',      icon: '🕯️' },
  { key: 'maroc',      label: 'Chansons marocaines',     icon: '🇲🇦' },
  { key: 'babasale',   label: 'Baba Salé (Abir Yaacov)', icon: '✡️' },
  { key: 'ashkenaz',   label: 'Chansons ashkénazes',     icon: '🎻' },
  { key: 'hassidique', label: 'Hassidique & populaire',  icon: '🎶' },
  { key: 'habad',      label: 'Chansons Habad',          icon: '🔵' },
];

const SONGS = [
  // ----------------------------- PRIÈRES -----------------------------------
  //  Textes liturgiques traditionnels (domaine public).
  //  ⚠️ À faire relire par un référent avant impression réelle.
  {
    id: 'kiddoush-chabbat',
    category: 'prieres',
    title: 'Kiddoush du vendredi soir',
    hebrew: 'קִדּוּשׁ לְלֵיל שַׁבָּת',
    author: 'À réciter sur le vin — à relire',
    lines: [
      { he: 'וַיְהִי עֶרֶב וַיְהִי בֹקֶר', tr: 'Va-yehi erev va-yehi voker', fr: '(à voix basse) Il y eut un soir, il y eut un matin' },
      { he: 'יוֹם הַשִּׁשִּׁי. וַיְכֻלּוּ הַשָּׁמַיִם וְהָאָרֶץ וְכָל צְבָאָם', tr: 'Yom ha-shishi. Va-yekhulu ha-shamayim ve-ha-arets ve-khol tseva’am', fr: 'Le sixième jour. Ainsi furent achevés les cieux, la terre et toute leur armée' },
      { he: 'וַיְכַל אֱלֹהִים בַּיּוֹם הַשְּׁבִיעִי מְלַאכְתּוֹ אֲשֶׁר עָשָׂה · וַיִּשְׁבֹּת בַּיּוֹם הַשְּׁבִיעִי מִכָּל מְלַאכְתּוֹ', tr: '', fr: 'Dieu acheva au septième jour l’œuvre qu’il avait faite, et il se reposa le septième jour' },
      { he: 'וַיְבָרֶךְ אֱלֹהִים אֶת יוֹם הַשְּׁבִיעִי וַיְקַדֵּשׁ אֹתוֹ · כִּי בוֹ שָׁבַת מִכָּל מְלַאכְתּוֹ אֲשֶׁר בָּרָא אֱלֹהִים לַעֲשׂוֹת', tr: '', fr: 'Dieu bénit le septième jour et le sanctifia, car en ce jour il se reposa de toute son œuvre' },
      { he: 'סַבְרִי מָרָנָן וְרַבָּנָן וְרַבּוֹתַי:', tr: 'Savri maranan ve-rabanan ve-rabotai', fr: 'Avec votre permission, messieurs' },
      { he: 'בָּרוּךְ אַתָּה ה׳ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם בּוֹרֵא פְּרִי הַגָּפֶן', tr: 'Baroukh ata Adonai … boré peri ha-gafen', fr: 'Béni sois-Tu, Éternel notre Dieu, Roi du monde, qui crées le fruit de la vigne' },
      { he: 'בָּרוּךְ אַתָּה ה׳ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו וְרָצָה בָנוּ', tr: '', fr: 'Béni sois-Tu… qui nous as sanctifiés par Tes commandements et nous as agréés' },
      { he: 'וְשַׁבַּת קָדְשׁוֹ בְּאַהֲבָה וּבְרָצוֹן הִנְחִילָנוּ · זִכָּרוֹן לְמַעֲשֵׂה בְרֵאשִׁית', tr: '', fr: 'et nous as donné en héritage, avec amour, Son saint Chabbat, souvenir de l’œuvre de la Création' },
      { he: 'כִּי הוּא יוֹם תְּחִלָּה לְמִקְרָאֵי קֹדֶשׁ · זֵכֶר לִיצִיאַת מִצְרָיִם', tr: '', fr: 'car c’est le premier des jours saints, en souvenir de la sortie d’Égypte' },
      { he: 'כִּי בָנוּ בָחַרְתָּ וְאוֹתָנוּ קִדַּשְׁתָּ מִכָּל הָעַמִּים · וְשַׁבַּת קָדְשְׁךָ בְּאַהֲבָה וּבְרָצוֹן הִנְחַלְתָּנוּ', tr: '', fr: 'car Tu nous as choisis et sanctifiés parmi tous les peuples, et nous as donné Ton saint Chabbat' },
      { he: 'בָּרוּךְ אַתָּה ה׳ מְקַדֵּשׁ הַשַּׁבָּת', tr: 'Baroukh ata Adonai mekadesh ha-Shabbat', fr: 'Béni sois-Tu, Éternel, qui sanctifies le Chabbat' },
    ],
  },
  {
    id: 'birkat-hamazon-sefarade',
    category: 'prieres',
    title: 'Birkat Hamazon (séfarade)',
    hebrew: 'בִּרְכַּת הַמָּזוֹן · נֻסַּח סְפָרַד',
    author: 'Action de grâces après le repas — à relire',
    lines: [
      { he: 'שִׁיר הַמַּעֲלוֹת · בְּשׁוּב ה׳ אֶת שִׁיבַת צִיּוֹן הָיִינוּ כְּחֹלְמִים', tr: '', fr: 'Cantique des degrés : quand l’Éternel ramena les captifs de Sion, nous étions comme en rêve' },
      { he: 'אָז יִמָּלֵא שְׂחוֹק פִּינוּ וּלְשׁוֹנֵנוּ רִנָּה · הַזֹּרְעִים בְּדִמְעָה בְּרִנָּה יִקְצֹרוּ', tr: '', fr: 'Alors notre bouche s’emplit de rires ; ceux qui sèment dans les larmes moissonnent dans la joie' },
      { he: 'בִּרְשׁוּת מָרָנָן: נְבָרֵךְ שֶׁאָכַלְנוּ מִשֶּׁלּוֹ', tr: 'Bir’shout maranan : nevarekh she-akhalnou mi-shelo', fr: 'Avec votre permission : bénissons Celui de qui nous avons mangé' },
      { he: 'בָּרוּךְ שֶׁאָכַלְנוּ מִשֶּׁלּוֹ וּבְטוּבוֹ חָיִינוּ', tr: 'Baroukh she-akhalnou mi-shelo u-vetuvo ḥayinou', fr: 'Béni soit Celui de qui nous avons mangé et par la bonté de qui nous vivons' },
      { he: 'בָּרוּךְ אַתָּה ה׳ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם הַזָּן אֶת הָעוֹלָם כֻּלּוֹ בְּטוּבוֹ בְּחֵן בְּחֶסֶד וּבְרַחֲמִים', tr: '', fr: '1. Béni sois-Tu… qui nourris le monde entier par Ta bonté, avec grâce et miséricorde' },
      { he: 'הוּא נוֹתֵן לֶחֶם לְכָל בָּשָׂר כִּי לְעוֹלָם חַסְדּוֹ · בָּרוּךְ אַתָּה ה׳ הַזָּן אֶת הַכֹּל', tr: '', fr: 'Il donne le pain à toute chair, car Sa bonté est éternelle. Béni sois-Tu, qui nourris tout' },
      { he: 'נוֹדֶה לְּךָ ה׳ אֱלֹהֵינוּ עַל שֶׁהִנְחַלְתָּ לַאֲבוֹתֵינוּ אֶרֶץ חֶמְדָּה טוֹבָה וּרְחָבָה', tr: '', fr: '2. Nous Te remercions de nous avoir donné en héritage un pays précieux, bon et vaste' },
      { he: 'וְעַל הַכֹּל ה׳ אֱלֹהֵינוּ אֲנַחְנוּ מוֹדִים לָךְ וּמְבָרְכִים אֶת שְׁמָךְ · בָּרוּךְ אַתָּה ה׳ עַל הָאָרֶץ וְעַל הַמָּזוֹן', tr: '', fr: 'Pour tout cela nous Te rendons grâce. Béni sois-Tu, pour le pays et pour la nourriture' },
      { he: 'רַחֵם ה׳ אֱלֹהֵינוּ עָלֵינוּ וְעַל יִשְׂרָאֵל עַמֶּךָ וְעַל יְרוּשָׁלַיִם עִירֶךָ', tr: '', fr: '3. Aie pitié, Éternel, de nous, de Ton peuple Israël et de Jérusalem Ta ville' },
      { he: 'רְצֵה וְהַחֲלִיצֵנוּ ה׳ אֱלֹהֵינוּ בְּמִצְוֹתֶיךָ וּבְמִצְוַת יוֹם הַשְּׁבִיעִי הַשַּׁבָּת הַגָּדוֹל וְהַקָּדוֹשׁ הַזֶּה', tr: '', fr: '(Chabbat) Fortifie-nous par Tes commandements et par celui de ce grand et saint septième jour' },
      { he: 'וּבְנֵה יְרוּשָׁלַיִם עִיר הַקֹּדֶשׁ בִּמְהֵרָה בְיָמֵינוּ · בָּרוּךְ אַתָּה ה׳ בּוֹנֵה יְרוּשָׁלָיִם. אָמֵן', tr: '', fr: 'Reconstruis Jérusalem, la ville sainte, bientôt et de nos jours. Béni sois-Tu, qui rebâtis Jérusalem. Amen' },
      { he: 'בָּרוּךְ אַתָּה ה׳ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם הָאֵל אָבִינוּ מַלְכֵּנוּ … הַטּוֹב וְהַמֵּטִיב לַכֹּל', tr: '', fr: '4. Béni sois-Tu… notre Père, notre Roi… Lui qui est bon et fait le bien envers tous' },
      { he: 'הָרַחֲמָן הוּא יִמְלֹךְ עָלֵינוּ לְעוֹלָם וָעֶד · הָרַחֲמָן הוּא יִשְׁלַח בְּרָכָה בַּבַּיִת הַזֶּה', tr: '', fr: 'Que le Miséricordieux règne sur nous à jamais ; qu’Il envoie la bénédiction dans cette maison' },
      { he: 'עֹשֶׂה שָׁלוֹם בִּמְרוֹמָיו הוּא יַעֲשֶׂה שָׁלוֹם עָלֵינוּ וְעַל כָּל יִשְׂרָאֵל וְאִמְרוּ אָמֵן', tr: 'Osé shalom bi-mromav…', fr: 'Que Celui qui fait la paix dans Ses hauteurs fasse la paix sur nous et sur tout Israël. Amen' },
    ],
  },
  {
    id: 'birkat-hamazon-ashkenaze',
    category: 'prieres',
    title: 'Birkat Hamazon (ashkénaze)',
    hebrew: 'בִּרְכַּת הַמָּזוֹן · נֻסַּח אַשְׁכְּנַז',
    author: 'Action de grâces après le repas — à relire',
    lines: [
      { he: 'שִׁיר הַמַּעֲלוֹת · בְּשׁוּב ה׳ אֶת שִׁיבַת צִיּוֹן הָיִינוּ כְּחֹלְמִים', tr: '', fr: 'Cantique des degrés : quand l’Éternel ramena les captifs de Sion, nous étions comme en rêve' },
      { he: 'רַבּוֹתַי נְבָרֵךְ · יְהִי שֵׁם ה׳ מְבֹרָךְ מֵעַתָּה וְעַד עוֹלָם', tr: 'Rabotai nevarekh · yehi shem Adonai mevorakh', fr: 'Messieurs, bénissons. Que le nom de l’Éternel soit béni dès maintenant et à jamais' },
      { he: 'בִּרְשׁוּת מָרָנָן וְרַבָּנָן וְרַבּוֹתַי · נְבָרֵךְ אֱלֹהֵינוּ שֶׁאָכַלְנוּ מִשֶּׁלּוֹ', tr: '', fr: 'Avec votre permission : bénissons notre Dieu, de qui nous avons mangé' },
      { he: 'בָּרוּךְ אֱלֹהֵינוּ שֶׁאָכַלְנוּ מִשֶּׁלּוֹ וּבְטוּבוֹ חָיִינוּ', tr: 'Baroukh Eloheinou she-akhalnou mi-shelo u-vetuvo ḥayinou', fr: 'Béni soit notre Dieu, de qui nous avons mangé et par la bonté de qui nous vivons' },
      { he: 'בָּרוּךְ אַתָּה ה׳ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם הַזָּן אֶת הָעוֹלָם כֻּלּוֹ בְּטוּבוֹ בְּחֵן בְּחֶסֶד וּבְרַחֲמִים', tr: '', fr: '1. Béni sois-Tu… qui nourris le monde entier par Ta bonté, avec grâce et miséricorde' },
      { he: 'הוּא נוֹתֵן לֶחֶם לְכָל בָּשָׂר כִּי לְעוֹלָם חַסְדּוֹ · בָּרוּךְ אַתָּה ה׳ הַזָּן אֶת הַכֹּל', tr: '', fr: 'Il donne le pain à toute chair, car Sa bonté est éternelle. Béni sois-Tu, qui nourris tout' },
      { he: 'נוֹדֶה לְּךָ ה׳ אֱלֹהֵינוּ עַל שֶׁהִנְחַלְתָּ לַאֲבוֹתֵינוּ אֶרֶץ חֶמְדָּה טוֹבָה וּרְחָבָה', tr: '', fr: '2. Nous Te remercions de nous avoir donné en héritage un pays précieux, bon et vaste' },
      { he: 'וְעַל הַכֹּל ה׳ אֱלֹהֵינוּ אֲנַחְנוּ מוֹדִים לָךְ · בָּרוּךְ אַתָּה ה׳ עַל הָאָרֶץ וְעַל הַמָּזוֹן', tr: '', fr: 'Pour tout cela nous Te rendons grâce. Béni sois-Tu, pour le pays et pour la nourriture' },
      { he: 'רַחֵם נָא ה׳ אֱלֹהֵינוּ עַל יִשְׂרָאֵל עַמֶּךָ וְעַל יְרוּשָׁלַיִם עִירֶךָ וְעַל צִיּוֹן מִשְׁכַּן כְּבוֹדֶךָ', tr: '', fr: '3. Aie pitié de Ton peuple Israël, de Jérusalem Ta ville et de Sion, demeure de Ta gloire' },
      { he: 'רְצֵה וְהַחֲלִיצֵנוּ ה׳ אֱלֹהֵינוּ בְּמִצְוֹתֶיךָ וּבְמִצְוַת יוֹם הַשְּׁבִיעִי הַשַּׁבָּת הַגָּדוֹל וְהַקָּדוֹשׁ הַזֶּה', tr: '', fr: '(Chabbat) Fortifie-nous par Tes commandements et par celui de ce grand et saint septième jour' },
      { he: 'וּבְנֵה יְרוּשָׁלַיִם עִיר הַקֹּדֶשׁ בִּמְהֵרָה בְיָמֵינוּ · בָּרוּךְ אַתָּה ה׳ בּוֹנֵה בְרַחֲמָיו יְרוּשָׁלָיִם. אָמֵן', tr: '', fr: 'Reconstruis Jérusalem, la ville sainte, bientôt. Béni sois-Tu, qui rebâtis dans Sa miséricorde Jérusalem. Amen' },
      { he: 'בָּרוּךְ אַתָּה ה׳ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם הָאֵל אָבִינוּ מַלְכֵּנוּ … הַטּוֹב וְהַמֵּטִיב לַכֹּל', tr: '', fr: '4. Béni sois-Tu… notre Père, notre Roi… Lui qui est bon et fait le bien envers tous' },
      { he: 'הָרַחֲמָן הוּא יִמְלֹךְ עָלֵינוּ לְעוֹלָם וָעֶד · הָרַחֲמָן הוּא יְבָרֵךְ אֶת כָּל הַמְּסֻבִּין', tr: '', fr: 'Que le Miséricordieux règne sur nous à jamais ; qu’Il bénisse tous les convives' },
      { he: 'עֹשֶׂה שָׁלוֹם בִּמְרוֹמָיו הוּא יַעֲשֶׂה שָׁלוֹם עָלֵינוּ וְעַל כָּל יִשְׂרָאֵל וְאִמְרוּ אָמֵן', tr: 'Osé shalom bi-mromav…', fr: 'Que Celui qui fait la paix dans Ses hauteurs fasse la paix sur nous et sur tout Israël. Amen' },
    ],
  },

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

  // ========================= ZEMIROT DE CHABBAT ============================
  {
    id: 'yedid-nefesh', category: 'chabbat', title: 'Yédid Néfesh', hebrew: 'יְדִיד נֶפֶשׁ',
    author: 'Rabbi Eléazar Azikri', audio: { type: 'youtube', url: 'https://www.youtube.com/results?search_query=yedid+nefesh' },
    lines: [
      { he: 'יְדִיד נֶפֶשׁ אָב הָרַחֲמָן · מְשֹׁךְ עַבְדָּךְ אֶל רְצוֹנָךְ', tr: 'Yedid nefesh av ha-raḥaman · meshokh avdakh el retsonakh', fr: 'Ami de l’âme, Père miséricordieux, attire Ton serviteur vers Ta volonté' },
      { he: 'יָרוּץ עַבְדָּךְ כְּמוֹ אַיָּל · יִשְׁתַּחֲוֶה מוּל הֲדָרָךְ', tr: '', fr: 'Ton serviteur courra comme une biche pour se prosterner devant Ta splendeur' },
      { he: 'כִּי יֶעֱרַב לוֹ יְדִידוּתָךְ · מִנֹּפֶת צוּף וְכָל טַעַם', tr: '', fr: 'car Ton amitié lui est plus douce que le rayon de miel et toute saveur' },
      { he: 'הָדוּר נָאֶה זִיו הָעוֹלָם · נַפְשִׁי חוֹלַת אַהֲבָתָךְ', tr: '', fr: 'Majestueux, splendide, éclat du monde : mon âme est malade de Ton amour' },
      { he: 'אָנָּא אֵל נָא רְפָא נָא לָהּ · בְּהַרְאוֹת לָהּ נֹעַם זִיוָךְ', tr: '', fr: 'De grâce, ô Dieu, guéris-la en lui montrant la douceur de Ta lumière' },
      { he: 'אָז תִּתְחַזֵּק וְתִתְרַפֵּא · וְהָיְתָה לָךְ שִׁפְחַת עוֹלָם', tr: '', fr: 'alors elle se raffermira et guérira, et sera pour Toi servante à jamais' },
      { he: 'וָתִיק יֶהֱמוּ רַחֲמֶיךָ · וְחוּסָה נָא עַל בֶּן אוֹהֲבָךְ', tr: '', fr: 'Toi l’Éternel, que Ta miséricorde s’émeuve : aie pitié du fils de Ton bien-aimé' },
      { he: 'כִּי זֶה כַמֶּה נִכְסֹף נִכְסַף · לִרְאוֹת בְּתִפְאֶרֶת עֻזָּךְ', tr: '', fr: 'car depuis si longtemps il aspire ardemment à voir la splendeur de Ta force' },
      { he: 'אָנָּא אֵלִי מַחְמַד לִבִּי · חוּשָׁה נָּא וְאַל תִּתְעַלָּם', tr: '', fr: 'De grâce, mon Dieu, désir de mon cœur : hâte-Toi et ne Te dérobe pas' },
      { he: 'הִגָּלֶה נָא וּפְרֹשׂ חָבִיב · עָלַי אֶת סֻכַּת שְׁלוֹמָךְ', tr: '', fr: 'Révèle-Toi, mon Bien-aimé, et étends sur moi la souccah de Ta paix' },
      { he: 'תָּאִיר אֶרֶץ מִכְּבוֹדָךְ · נָגִילָה וְנִשְׂמְחָה בָךְ', tr: '', fr: 'Que la terre s’illumine de Ta gloire ; nous exulterons et nous nous réjouirons en Toi' },
      { he: 'מַהֵר אָהוּב כִּי בָא מוֹעֵד · וְחָנֵּנִי כִּימֵי עוֹלָם', tr: '', fr: 'Hâte-Toi, Bien-aimé, car le temps est venu, et fais-moi grâce comme aux jours d’antan' },
    ],
  },
  {
    id: 'tzur-mishelo', category: 'chabbat', title: 'Tzour Michélo', hebrew: 'צוּר מִשֶּׁלּוֹ',
    author: 'Zemer de Chabbat', audio: { type: 'youtube', url: 'https://www.youtube.com/results?search_query=tzur+mishelo' },
    lines: [
      { he: 'צוּר מִשֶּׁלּוֹ אָכַלְנוּ בָּרְכוּ אֱמוּנַי · שָׂבַעְנוּ וְהוֹתַרְנוּ כִּדְבַר ה׳', tr: 'Tsur mi-shelo akhalnu barkhu emunai · sava‘nu ve-hotarnu ki-dvar Adonai', fr: 'Le Rocher dont nous avons mangé — bénissez, mes fidèles ! Nous fûmes rassasiés selon la parole de Dieu' },
    ],
  },
  {
    id: 'yah-ribon', category: 'chabbat', title: 'Yah Ribon', hebrew: 'יָהּ רִבּוֹן',
    author: 'Rabbi Israël Najara', audio: { type: 'youtube', url: 'https://www.youtube.com/results?search_query=yah+ribon+alam' },
    lines: [
      { he: 'יָהּ רִבּוֹן עָלַם וְעָלְמַיָּא · אַנְתְּ הוּא מַלְכָּא מֶלֶךְ מַלְכַיָּא', tr: 'Yah ribon alam ve-almaya · ant hu malka melekh malkhaya', fr: 'Dieu, Maître de l’univers et des mondes, Tu es le Roi, le Roi des rois' },
      { he: 'עוֹבַד גְּבוּרְתֵּךְ וְתִמְהַיָּא · שְׁפַר קֳדָמָךְ לְהַחֲוָיָא', tr: 'Ovad gevurtekh ve-timhaya · shefar kodamakh le-haḥavaya', fr: 'Il est beau de proclamer devant Toi Tes hauts faits et Tes merveilles' },
    ],
  },
  {
    id: 'menucha-vesimcha', category: 'chabbat', title: 'Menoucha VeSimcha', hebrew: 'מְנוּחָה וְשִׂמְחָה',
    author: 'Zemer de Chabbat', audio: { type: 'youtube', url: 'https://www.youtube.com/results?search_query=menucha+vesimcha' },
    lines: [
      { he: 'מְנוּחָה וְשִׂמְחָה אוֹר לַיְּהוּדִים · יוֹם שַׁבָּתוֹן יוֹם מַחֲמַדִּים', tr: 'Menuḥa ve-simḥa or la-yehudim · yom shabbaton yom maḥamadim', fr: 'Repos et joie, lumière pour les Juifs : jour du Chabbat, jour de délices' },
    ],
  },
  {
    id: 'yom-shabbaton', category: 'chabbat', title: 'Yom Chabbaton', hebrew: 'יוֹם שַׁבָּתוֹן',
    author: 'Rabbi Yehouda Halévi', audio: { type: 'youtube', url: 'https://www.youtube.com/results?search_query=yom+shabbaton' },
    lines: [
      { he: 'יוֹם שַׁבָּתוֹן אֵין לִשְׁכֹּחַ · זִכְרוֹ כְּרֵיחַ הַנִּיחֹחַ', tr: 'Yom shabbaton ein lishko’aḥ · zikhro ke-rei’aḥ ha-niḥo’aḥ', fr: 'Le jour du Chabbat ne s’oublie pas ; son souvenir est comme un doux parfum' },
      { he: 'יוֹנָה מָצְאָה בוֹ מָנוֹחַ · וְשָׁם יָנוּחוּ יְגִיעֵי כֹחַ', tr: 'Yona matse’a vo mano’aḥ · ve-sham yanuḥu yegi‘ei kho’aḥ', fr: 'La colombe y trouva le repos, et là se reposent ceux qui sont épuisés' },
    ],
  },
  {
    id: 'lecha-dodi', category: 'chabbat', title: 'Lécha Dodi', hebrew: 'לְכָה דוֹדִי',
    author: 'Rabbi Chlomo Alkabetz', audio: { type: 'youtube', url: 'https://www.youtube.com/results?search_query=lecha+dodi' },
    lines: [
      { he: 'לְכָה דוֹדִי לִקְרַאת כַּלָּה · פְּנֵי שַׁבָּת נְקַבְּלָה', tr: 'Lekha dodi likrat kala · penei Shabbat nekabela', fr: '(refrain) Viens, mon bien-aimé, au-devant de la fiancée ; accueillons la face du Chabbat' },
      { he: 'שָׁמוֹר וְזָכוֹר בְּדִבּוּר אֶחָד · הִשְׁמִיעָנוּ אֵל הַמְיֻחָד · ה׳ אֶחָד וּשְׁמוֹ אֶחָד · לְשֵׁם וּלְתִפְאֶרֶת וְלִתְהִלָּה', tr: '', fr: '« Garde » et « Souviens-toi » en une seule parole : le Dieu unique nous les fit entendre ; l’Éternel est Un et Son Nom est Un, pour la renommée, la splendeur et la louange' },
      { he: 'לִקְרַאת שַׁבָּת לְכוּ וְנֵלְכָה · כִּי הִיא מְקוֹר הַבְּרָכָה · מֵרֹאשׁ מִקֶּדֶם נְסוּכָה · סוֹף מַעֲשֶׂה בְּמַחֲשָׁבָה תְּחִלָּה', tr: '', fr: 'Vers le Chabbat, allons, marchons, car il est la source de la bénédiction ; dès l’origine il fut établi — dernier dans l’action, premier dans la pensée' },
      { he: 'מִקְדַּשׁ מֶלֶךְ עִיר מְלוּכָה · קוּמִי צְאִי מִתּוֹךְ הַהֲפֵכָה · רַב לָךְ שֶׁבֶת בְּעֵמֶק הַבָּכָא · וְהוּא יַחֲמֹל עָלַיִךְ חֶמְלָה', tr: '', fr: 'Sanctuaire du Roi, ville royale, lève-toi, sors du bouleversement ; assez d’habiter la vallée des pleurs, Il aura pour toi compassion' },
      { he: 'הִתְנַעֲרִי מֵעָפָר קוּמִי · לִבְשִׁי בִּגְדֵי תִפְאַרְתֵּךְ עַמִּי · עַל יַד בֶּן יִשַׁי בֵּית הַלַּחְמִי · קָרְבָה אֶל נַפְשִׁי גְאָלָהּ', tr: '', fr: 'Secoue-toi de la poussière, lève-toi, revêts tes habits de gloire, mon peuple ; par la main du fils de Jessé, le Bethléémite, approche de mon âme, délivre-la' },
      { he: 'הִתְעוֹרְרִי הִתְעוֹרְרִי · כִּי בָא אוֹרֵךְ קוּמִי אוֹרִי · עוּרִי עוּרִי שִׁיר דַּבֵּרִי · כְּבוֹד ה׳ עָלַיִךְ נִגְלָה', tr: '', fr: 'Réveille-toi, réveille-toi, car ta lumière est venue, lève-toi, brille ; éveille-toi, entonne un chant, la gloire de l’Éternel se révèle sur toi' },
      { he: 'לֹא תֵבוֹשִׁי וְלֹא תִכָּלְמִי · מַה תִּשְׁתּוֹחֲחִי וּמַה תֶּהֱמִי · בָּךְ יֶחֱסוּ עֲנִיֵּי עַמִּי · וְנִבְנְתָה עִיר עַל תִּלָּהּ', tr: '', fr: 'Ne sois ni honteuse ni confuse ; pourquoi t’abattre et gémir ? En toi s’abriteront les pauvres de mon peuple, et la ville sera rebâtie sur ses ruines' },
      { he: 'וְהָיוּ לִמְשִׁסָּה שֹׁאסָיִךְ · וְרָחֲקוּ כָּל מְבַלְּעָיִךְ · יָשִׂישׂ עָלַיִךְ אֱלֹהָיִךְ · כִּמְשׂוֹשׂ חָתָן עַל כַּלָּה', tr: '', fr: 'Tes pillards seront pillés, tous ceux qui te dévoraient s’éloigneront ; ton Dieu se réjouira de toi comme l’époux se réjouit de l’épouse' },
      { he: 'יָמִין וּשְׂמֹאל תִּפְרוֹצִי · וְאֶת ה׳ תַּעֲרִיצִי · עַל יַד אִישׁ בֶּן פַּרְצִי · וְנִשְׂמְחָה וְנָגִילָה', tr: '', fr: 'À droite et à gauche tu t’étendras, et tu révéreras l’Éternel ; par la main de l’homme issu de Pérets, nous nous réjouirons et exulterons' },
      { he: 'בּוֹאִי בְשָׁלוֹם עֲטֶרֶת בַּעְלָהּ · גַּם בְּשִׂמְחָה וּבְצָהֳלָה · תּוֹךְ אֱמוּנֵי עַם סְגֻלָּה · בּוֹאִי כַלָּה בּוֹאִי כַלָּה', tr: '', fr: 'Viens en paix, couronne de ton époux, dans la joie et l’allégresse, parmi les fidèles du peuple élu ; viens, ô fiancée, viens, ô fiancée' },
    ],
  },
  {
    id: 'eshet-chayil', category: 'chabbat', title: 'Éshet Chayil', hebrew: 'אֵשֶׁת חַיִל',
    author: 'Proverbes 31 (avant le repas)', audio: { type: 'youtube', url: 'https://www.youtube.com/results?search_query=eshet+chayil' },
    lines: [
      { he: 'אֵשֶׁת חַיִל מִי יִמְצָא · וְרָחֹק מִפְּנִינִים מִכְרָהּ', tr: 'Eshet ḥayil mi yimtsa · ve-raḥok mi-peninim mikhrah', fr: 'Une femme de valeur, qui la trouvera ? Son prix dépasse celui des perles' },
      { he: 'בָּטַח בָּהּ לֵב בַּעְלָהּ · וְשָׁלָל לֹא יֶחְסָר', tr: 'Bataḥ bah lev ba‘lah · ve-shalal lo yeḥsar', fr: 'Le cœur de son mari se fie à elle, et le profit ne lui manquera pas' },
    ],
  },
  {
    id: 'yom-ze-mechubad', category: 'chabbat', title: 'Yom Zé Méchoubad', hebrew: 'יוֹם זֶה מְכֻבָּד',
    author: 'Zemer de Chabbat', audio: { type: 'youtube', url: 'https://www.youtube.com/results?search_query=yom+ze+mechubad' },
    lines: [
      { he: 'יוֹם זֶה מְכֻבָּד מִכָּל יָמִים · כִּי בוֹ שָׁבַת צוּר עוֹלָמִים', tr: 'Yom ze mekhubad mi-kol yamim · ki vo shavat tsur olamim', fr: 'Ce jour est honoré entre tous, car en lui s’est reposé le Rocher des mondes' },
    ],
  },

  // ===================== MAROCAINES / SÉFARADES (ajouts) ===================
  {
    id: 'aoufa-eshkona', category: 'maroc', title: "A'oufa Eshkona", hebrew: 'אָעוּפָה אֶשְׁכֹּנָה',
    author: 'Bakacha (tradition marocaine)', audio: { type: 'youtube', url: 'https://www.youtube.com/results?search_query=aufa+eshkona+piyout' },
    lines: [
      { he: 'אָעוּפָה אֶשְׁכֹּנָה וְאַרְחִיקָה נְדֹד · בַּמִּדְבָּר אָלִינָה וְאוּלַי אֶמְצָא דּוֹד', tr: 'A‘ufa eshkona ve-arḥika nedod · ba-midbar alina ve-ulai emtsa dod', fr: '(refrain) Je m’envolerai et me poserai, je m’éloignerai au loin ; dans le désert je passerai la nuit, et peut-être trouverai-je mon Bien-aimé' },
      { he: 'נֶשֶׁק אַהֲבָתוֹ בְּלִבִּי בֹּעֵרָה · מִיּוֹם פְּרֵדָתוֹ נַפְשִׁי עָלַי מָרָה', tr: '', fr: 'Le feu de son amour brûle en mon cœur ; depuis le jour de sa séparation, mon âme s’est aigrie en moi' },
      { he: 'יְדִיד מֶנִּי בָּרַח הָלַךְ עֲזָבַנִי · אֵיזוֹ דֶּרֶךְ אָרַח וְאֵלְכָה גַּם אֲנִי', tr: '', fr: 'L’ami s’est enfui loin de moi, il m’a quitté ; quelle voie a-t-il prise ? j’irai moi aussi' },
      { he: 'יָצָאתִי לְבַקֵּשׁ דּוֹדִי בֵּין חֲבֵרִים · נִלְכַּדְתִּי בְּמוֹקֵשׁ הִכּוּנִי הַשֹּׁמְרִים', tr: '', fr: 'Je suis sortie chercher mon Bien-aimé parmi les compagnons ; j’ai été prise au piège, les gardiens m’ont frappée' },
      { he: 'צִפִּיתִי לְדוֹדִי מָתַי יָבוֹא אֵלַי · יַלְבִּישֵׁנִי עֶדְיִי וִירַחֵם עָלַי', tr: '', fr: 'J’ai guetté mon Bien-aimé : quand viendra-t-il vers moi, me revêtira de ma parure et aura pitié de moi' },
      { he: 'חֲשֹׂף זְרוֹעֲךָ לְקַבֵּץ פְּזוּרִים · גַּלֵּה קֵץ יִשְׁעֲךָ וְדִגְלְךָ הָרֵם', tr: '', fr: 'Dévoile Ton bras pour rassembler les dispersés ; révèle le terme de Ton salut et lève Ton étendard' },
      { he: 'קוּמִי יְחִידָתִי וְשׁוּבִי בִּתְשׁוּבָה · אֲחוֹתִי רַעְיָתִי הִנֵּה גוֹאֲלֵךְ בָּא', tr: '', fr: 'Lève-toi, mon unique, reviens par le repentir ; ma sœur, ma compagne, voici que ton Rédempteur vient' },
      { he: 'חֲמוּדָה יְקָרָה רַבַּת הַמַּעֲלוֹת · גַּם מִפָּז נִבְחָרָה צְאִי נָא בִמְחוֹלוֹת', tr: '', fr: 'Précieuse et chérie, riche de vertus, plus choisie que l’or fin : sors donc dans les danses' },
      { he: 'זָכַרְתִּי לָךְ חֶסֶד נְעוּרַיִךְ נְעוּרִים · הֵיכָלֵךְ אֲיַסֵּד בְּאַבְנֵי סַפִּירִים', tr: '', fr: 'Je me suis souvenu en ta faveur de la grâce de ta jeunesse ; je fonderai ton palais sur des pierres de saphir' },
      { he: 'קוֹל דּוֹדִי הִנֵּה בָּא מְדַלֵּג עַל הֶהָרִים · קוּמִי לָךְ אֲהוּבָה כִּי בָּא קֵץ דְּרוֹרִים', tr: '', fr: 'La voix de mon Bien-aimé, le voici qui vient, bondissant sur les montagnes ; lève-toi, bien-aimée, car le temps de la délivrance est venu' },
    ],
  },
  {
    id: 'yafa-vetama', category: 'maroc', title: 'Yafa VeTama', hebrew: 'יָפָה וְתַמָּה',
    author: 'Rabbi Chlomo Abitbol (Marrakech)', audio: { type: 'youtube', url: 'https://www.youtube.com/results?search_query=yafa+vetama+piyout' },
    lines: [
      { he: 'יָפָה וְתַמָּה תּוֹרָה תְּמִימָה הַנְּעִימָה · מִי יוּכַל לְהַעֲמִיק בְּסוֹדֵךְ סוֹד אֱלֹהִים חַיִּים', tr: 'Yafa ve-tama Torah temima ha-ne‘ima · mi yukhal le-ha‘amik be-sodekh sod Elohim ḥayim', fr: 'Belle et parfaite, Torah intègre et douce : qui peut sonder tes secrets, le secret du Dieu vivant ? (refrain)' },
      { he: 'אוֹר זִיו זָהֳרֵךְ בּוֹעֵר תּוֹךְ קִרְבִּי · תָּמִיד יִדְרְשׁוּ אוֹתָךְ רַבִּים חֻקִּים וּמִצְוֹת טוֹבִים', tr: '', fr: 'La splendeur de ton éclat brûle en moi ; sans cesse beaucoup te recherchent — lois et bons commandements' },
      { he: 'חֵן דַּדַּיִךְ יַרְווּ בְּכָל עֵת תּוֹרַת אֱמֶת · מִפִּיךְ אָנוּ חַיִּים מִיֵּין סוֹד אֱלֹהִים חַיִּים', tr: '', fr: 'La grâce de tes sources nous abreuve à tout instant, Torah de vérité ; de ta bouche nous vivons' },
      { he: 'נִתְעַלְּסָה בְגִיל בַּאֲהָבִים · בְּסוֹד נְקֻדּוֹת עִם הַתֵּבוֹת כְּתָרִים עִם אוֹתִיּוֹת', tr: '', fr: 'Réjouissons-nous dans l’amour, dans le secret des voyelles, des mots, des couronnes et des lettres' },
    ],
  },
  {
    id: 'shachar-avakeshcha', category: 'maroc', title: 'Chah’ar Avakéch’kha', hebrew: 'שַׁחַר אֲבַקֶּשְׁךָ',
    author: 'Rabbi Chlomo Ibn Gabirol', audio: { type: 'youtube', url: 'https://www.youtube.com/results?search_query=shachar+avakeshcha' },
    lines: [
      { he: 'שַׁחַר אֲבַקֶּשְׁךָ צוּרִי וּמִשְׂגַּבִּי · אֶעֱרֹךְ לְפָנֶיךָ שַׁחְרִי וְגַם עַרְבִּי', tr: 'Shaḥar avakeshkha tsuri u-misgabi · e‘erokh lefanekha shaḥri ve-gam arbi', fr: 'Dès l’aube je Te cherche, mon Rocher et ma forteresse ; je dispose devant Toi ma prière du matin et du soir' },
    ],
  },
  {
    id: 'el-nora-alila', category: 'maroc', title: 'El Nora Alila', hebrew: 'אֵל נוֹרָא עֲלִילָה',
    author: 'Rabbi Avraham Ibn Ezra (Néïla)', audio: { type: 'youtube', url: 'https://www.youtube.com/results?search_query=el+nora+alila' },
    lines: [
      { he: 'אֵל נוֹרָא עֲלִילָה · הַמְצִיא לָנוּ מְחִילָה · בִּשְׁעַת הַנְּעִילָה', tr: 'El nora alila · hamtsi lanu meḥila · bi-she‘at ha-ne‘ila', fr: 'Dieu redoutable dans Ses œuvres, accorde-nous le pardon à l’heure de la Néïla' },
    ],
  },

  // ============================= ASHKÉNAZES (ajouts) =======================
  {
    id: 'yigdal', category: 'ashkenaz', title: 'Yigdal', hebrew: 'יִגְדַּל',
    author: 'D’après les 13 principes de foi', audio: { type: 'youtube', url: 'https://www.youtube.com/results?search_query=yigdal' },
    lines: [
      { he: 'יִגְדַּל אֱלֹהִים חַי וְיִשְׁתַּבַּח · נִמְצָא וְאֵין עֵת אֶל מְצִיאוּתוֹ', tr: 'Yigdal Elohim ḥai ve-yishtabaḥ · nimtsa ve-ein et el metsi’uto', fr: 'Que grandisse et soit loué le Dieu vivant : Il existe, et Son existence est hors du temps' },
    ],
  },
  {
    id: 'maoz-tzur', category: 'ashkenaz', title: 'Maoz Tzour', hebrew: 'מָעוֹז צוּר',
    author: 'Chant de Hanoukka', audio: { type: 'youtube', url: 'https://www.youtube.com/results?search_query=maoz+tzur' },
    lines: [
      { he: 'מָעוֹז צוּר יְשׁוּעָתִי · לְךָ נָאֶה לְשַׁבֵּחַ', tr: 'Ma‘oz tsur yeshu‘ati · lekha na’e le-shabe’aḥ', fr: 'Rocher, forteresse de mon salut, il est beau de Te louer' },
      { he: 'תִּכּוֹן בֵּית תְּפִלָּתִי · וְשָׁם תּוֹדָה נְזַבֵּחַ', tr: 'Tikon beit tefilati · ve-sham toda nezabe’aḥ', fr: 'Rétablis ma maison de prière, et là nous offrirons des actions de grâce' },
    ],
  },

  // ======================== HASSIDIQUE & POPULAIRE =========================
  {
    id: 'am-yisrael-chai', category: 'hassidique', title: 'Am Yisrael Chai', hebrew: 'עַם יִשְׂרָאֵל חַי',
    author: 'Chant populaire', audio: { type: 'youtube', url: 'https://www.youtube.com/results?search_query=am+yisrael+chai' },
    lines: [
      { he: 'עוֹד אָבִינוּ חַי · עַם יִשְׂרָאֵל חַי', tr: 'Od avinu ḥai · am Yisrael ḥai', fr: 'Notre Père vit encore — le peuple d’Israël vit !' },
    ],
  },
  {
    id: 'oseh-shalom', category: 'hassidique', title: 'Oseh Chalom', hebrew: 'עוֹשֶׂה שָׁלוֹם',
    author: 'D’après la Amida', audio: { type: 'youtube', url: 'https://www.youtube.com/results?search_query=oseh+shalom+song' },
    lines: [
      { he: 'עוֹשֶׂה שָׁלוֹם בִּמְרוֹמָיו · הוּא יַעֲשֶׂה שָׁלוֹם עָלֵינוּ', tr: 'Ose shalom bi-mromav · hu ya‘ase shalom aleinu', fr: 'Que Celui qui fait la paix dans Ses hauteurs fasse la paix sur nous' },
      { he: 'וְעַל כָּל יִשְׂרָאֵל · וְאִמְרוּ אָמֵן', tr: 've-al kol Yisrael · ve-imru amen', fr: 'et sur tout Israël, et dites : Amen' },
    ],
  },
  {
    id: 'hine-ma-tov', category: 'hassidique', title: 'Hiné Ma Tov', hebrew: 'הִנֵּה מַה טּוֹב',
    author: 'Psaumes 133', audio: { type: 'youtube', url: 'https://www.youtube.com/results?search_query=hine+ma+tov' },
    lines: [
      { he: 'הִנֵּה מַה טּוֹב וּמַה נָּעִים · שֶׁבֶת אַחִים גַּם יָחַד', tr: 'Hine ma tov u-ma na‘im · shevet aḥim gam yaḥad', fr: 'Qu’il est bon et agréable pour des frères de demeurer ensemble' },
    ],
  },
  {
    id: 'ani-maamin', category: 'hassidique', title: 'Ani Maamin', hebrew: 'אֲנִי מַאֲמִין',
    author: 'D’après Maïmonide', audio: { type: 'youtube', url: 'https://www.youtube.com/results?search_query=ani+maamin' },
    lines: [
      { he: 'אֲנִי מַאֲמִין בֶּאֱמוּנָה שְׁלֵמָה · בְּבִיאַת הַמָּשִׁיחַ', tr: 'Ani ma’amin be-emuna shelema · be-vi’at ha-mashi’aḥ', fr: 'Je crois d’une foi entière en la venue du Machia’h' },
      { he: 'וְאַף עַל פִּי שֶׁיִּתְמַהְמֵהַּ · עִם כָּל זֶה אֲחַכֶּה לּוֹ', tr: 've-af al pi she-yitmahme’ah · im kol ze aḥake lo', fr: 'et même s’il tarde, malgré tout je l’attendrai' },
    ],
  },
  {
    id: 'siman-tov', category: 'hassidique', title: 'Siman Tov ouMazal Tov', hebrew: 'סִימָן טוֹב וּמַזָּל טוֹב',
    author: 'Chant de fête', audio: { type: 'youtube', url: 'https://www.youtube.com/results?search_query=siman+tov+umazal+tov' },
    lines: [
      { he: 'סִימָן טוֹב וּמַזָּל טוֹב · יְהֵא לָנוּ וּלְכָל יִשְׂרָאֵל', tr: 'Siman tov u-mazal tov · yehe lanu u-le-khol Yisrael', fr: 'Bon signe et bonne étoile pour nous et pour tout Israël !' },
    ],
  },
  {
    id: 'od-yishama', category: 'hassidique', title: 'Od Yishama', hebrew: 'עוֹד יִשָּׁמַע',
    author: 'Chant de mariage (Jérémie 33)', audio: { type: 'youtube', url: 'https://www.youtube.com/results?search_query=od+yishama' },
    lines: [
      { he: 'עוֹד יִשָּׁמַע בְּעָרֵי יְהוּדָה וּבְחוּצוֹת יְרוּשָׁלָיִם · קוֹל שָׂשׂוֹן וְקוֹל שִׂמְחָה', tr: 'Od yishama be-arei Yehuda u-ve-ḥutsot Yerushalayim · kol sason ve-kol simḥa', fr: 'On entendra encore, dans les villes de Juda et les rues de Jérusalem, la voix de l’allégresse et de la joie' },
    ],
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
    label: 'Repas de Chabbat complet',
    cover: { title: 'Birkonishi', subtitle: 'Repas de Chabbat' },
    blocks: [
      { type: 'song', songId: 'kiddoush-chabbat' },
      { type: 'song', songId: 'shalom-aleichem' },
      { type: 'song', songId: 'deror-yikra' },
      { type: 'song', songId: 'ki-eshmera-shabbat' },
      { type: 'song', songId: 'yom-ze-leyisrael' },
      { type: 'song', songId: 'adon-olam' },
      { type: 'song', songId: 'birkat-hamazon-sefarade' },
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
