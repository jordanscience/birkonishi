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
      { he: 'יְדִיד נֶפֶשׁ אָב הָרַחֲמָן · מְשֹׁךְ עַבְדְּךָ אֶל רְצוֹנֶךָ', tr: 'Yedid nefesh av ha-raḥaman · meshokh avdekha el retsonekha', fr: 'Ami de l’âme, Père miséricordieux, attire Ton serviteur vers Ta volonté' },
      { he: 'יָרוּץ עַבְדְּךָ כְּמוֹ אַיָּל · יִשְׁתַּחֲוֶה אֶל מוּל הֲדָרֶךָ', tr: 'Yaruts avdekha kemo ayal · yishtaḥave el mul hadarekha', fr: 'Ton serviteur courra comme une biche pour se prosterner devant Ta splendeur' },
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
      { he: 'לְכָה דוֹדִי לִקְרַאת כַּלָּה · פְּנֵי שַׁבָּת נְקַבְּלָה', tr: 'Lekha dodi likrat kala · penei Shabbat nekabela', fr: 'Viens, mon bien-aimé, au-devant de la fiancée : accueillons la face du Chabbat' },
      { he: 'שָׁמוֹר וְזָכוֹר בְּדִבּוּר אֶחָד · הִשְׁמִיעָנוּ אֵל הַמְיֻחָד', tr: 'Shamor ve-zakhor be-dibur eḥad · hishmi‘anu El ha-meyuḥad', fr: '« Garde » et « Souviens-toi » en une seule parole : le Dieu unique nous les fit entendre' },
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
    id: 'aoufa-eshkona', category: 'maroc', title: "A'oufa Eshkona", hebrew: 'אָעוּפָה וְאֶשְׁכֹּנָה',
    author: 'D’après Psaumes 55', audio: { type: 'youtube', url: 'https://www.youtube.com/results?search_query=aufa+eshkona+piyout' },
    lines: [
      { he: 'מִי יִתֶּן לִי אֵבֶר כַּיּוֹנָה · אָעוּפָה וְאֶשְׁכֹּנָה', tr: 'Mi yiten li ever ka-yona · a‘ufa ve-eshkona', fr: 'Qui me donnera des ailes comme la colombe ? Je m’envolerais et je trouverais le repos' },
    ],
  },
  {
    id: 'yafa-vetama', category: 'maroc', title: 'Yafa VeTama', hebrew: 'יָפָה וְתַמָּה',
    author: 'Piyout séfarade — paroles à compléter/relire', audio: { type: 'youtube', url: 'https://www.youtube.com/results?search_query=yafa+vetama+piyout' },
    lines: [
      { he: 'יָפָה וְתַמָּה', tr: 'Yafa ve-tama', fr: 'Belle et parfaite (piyout — texte complet à ajouter, voir l’enregistrement)' },
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
