// ============================================================================
//  Birkonishi — bibliothèque de chants, piyoutim et prières
// ----------------------------------------------------------------------------
//  Chaque entrée :
//    id, category, title, hebrew, author, audio?
//    lines : [{ he, fr, r? }]
//      he  : texte hébreu vocalisé ; « / » = retour à la ligne (vers),
//            « · » = séparation dans un paragraphe de prière
//      fr  : traduction française (libre, fidèle au sens)
//      r   : 1 = refrain (imprimé une fois, en tête)
//  La phonétique est générée automatiquement (js/translit.js).
//
//  Sources des textes hébreux (vérifiés) :
//    · Wikisource hébreu (he.wikisource.org) — zemirot, piyoutim, siddour
//    · Sefaria (sefaria.org) — versets bibliques (Proverbes 31, Psaumes…)
//    · birkathamazon.org — Birkat Hamazon (rites Edot HaMizra'h et ashkénaze)
//    · Torah-Box — A'oufa Eshkona
//  Le Nom divin est écrit יְיָ (usage des birkonim imprimés).
// ============================================================================

const CATEGORIES = [
  { key: 'prieres',    label: 'Prières (Kiddouch, Birkat Hamazon)' },
  { key: 'chabbat',    label: 'Zemirot de Chabbat' },
  { key: 'maroc',      label: 'Piyoutim marocains (bakachot)' },
  { key: 'babasale',   label: 'Baba Salé & hilloula' },
  { key: 'ashkenaz',   label: 'Chants ashkénazes & liturgie' },
  { key: 'hassidique', label: 'Hassidique & fêtes' },
  { key: 'habad',      label: 'Chants Habad' },
];

const yt = (q) => ({ type: 'youtube', url: 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q) });

const SONGS = [
  // ================================ PRIÈRES =================================
  {
    id: 'kiddoush-chabbat', category: 'prieres',
    title: 'Kiddouch du vendredi soir (séfarade)', hebrew: 'קִדּוּשׁ לֵיל שַׁבָּת',
    author: 'Sur une coupe de vin — rite séfarade (Edot HaMizra’h)',
    lines: [
      { he: 'וַיְהִי עֶרֶב וַיְהִי בֹקֶר', fr: '(à voix basse) Il y eut un soir, il y eut un matin,' },
      { he: 'יוֹם הַשִּׁשִּׁי · וַיְכֻלּוּ הַשָּׁמַיִם וְהָאָרֶץ וְכׇל צְבָאָם', fr: 'le sixième jour. Ainsi furent achevés les cieux, la terre et toute leur armée.' },
      { he: 'וַיְכַל אֱלֹהִים בַּיּוֹם הַשְּׁבִיעִי מְלַאכְתּוֹ אֲשֶׁר עָשָׂה · וַיִּשְׁבֹּת בַּיּוֹם הַשְּׁבִיעִי מִכׇּל מְלַאכְתּוֹ אֲשֶׁר עָשָׂה', fr: 'Dieu acheva au septième jour l’œuvre qu’Il avait faite ; et Il se reposa le septième jour de toute l’œuvre qu’Il avait faite.' },
      { he: 'וַיְבָרֶךְ אֱלֹהִים אֶת יוֹם הַשְּׁבִיעִי וַיְקַדֵּשׁ אֹתוֹ · כִּי בוֹ שָׁבַת מִכׇּל מְלַאכְתּוֹ אֲשֶׁר בָּרָא אֱלֹהִים לַעֲשׂוֹת', fr: 'Dieu bénit le septième jour et le sanctifia, car en ce jour Il se reposa de toute l’œuvre que Dieu avait créée pour qu’elle s’accomplisse.' },
      { he: 'סַבְרִי מָרָנָן · לְחַיִּים', fr: '« Avec votre permission, mes maîtres ! » — L’assemblée répond : « À la vie ! »' },
      { he: 'בָּרוּךְ אַתָּה יְיָ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם בּוֹרֵא פְּרִי הַגֶּפֶן', fr: 'Béni sois-Tu, Éternel notre Dieu, Roi du monde, qui crées le fruit de la vigne.' },
      { he: 'בָּרוּךְ אַתָּה יְיָ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו וְרָצָה בָנוּ · וְשַׁבַּת קׇדְשׁוֹ בְּאַהֲבָה וּבְרָצוֹן הִנְחִילָנוּ זִכָּרוֹן לְמַעֲשֵׂה בְרֵאשִׁית', fr: 'Béni sois-Tu… qui nous as sanctifiés par Tes commandements et nous as agréés ; avec amour et bienveillance, Tu nous as donné en héritage Ton saint Chabbat, souvenir de l’œuvre de la Création,' },
      { he: 'תְּחִלָּה לְמִקְרָאֵי קֹדֶשׁ זֵכֶר לִיצִיאַת מִצְרָיִם · וְשַׁבַּת קׇדְשְׁךָ בְּאַהֲבָה וּבְרָצוֹן הִנְחַלְתָּנוּ', fr: 'premier des jours saints, souvenir de la sortie d’Égypte ; Ton saint Chabbat, avec amour et bienveillance, Tu nous l’as donné en héritage.' },
      { he: 'בָּרוּךְ אַתָּה יְיָ מְקַדֵּשׁ הַשַּׁבָּת', fr: 'Béni sois-Tu, Éternel, qui sanctifies le Chabbat.' },
    ],
  },
  {
    id: 'kiddoush-ashkenaze', category: 'prieres',
    title: 'Kiddouch du vendredi soir (ashkénaze)', hebrew: 'קִדּוּשׁ לֵיל שַׁבָּת',
    author: 'Sur une coupe de vin — rite ashkénaze',
    lines: [
      { he: 'וַיְהִי עֶרֶב וַיְהִי בֹקֶר', fr: '(à voix basse) Il y eut un soir, il y eut un matin,' },
      { he: 'יוֹם הַשִּׁשִּׁי · וַיְכֻלּוּ הַשָּׁמַיִם וְהָאָרֶץ וְכׇל צְבָאָם', fr: 'le sixième jour. Ainsi furent achevés les cieux, la terre et toute leur armée.' },
      { he: 'וַיְכַל אֱלֹהִים בַּיּוֹם הַשְּׁבִיעִי מְלַאכְתּוֹ אֲשֶׁר עָשָׂה · וַיִּשְׁבֹּת בַּיּוֹם הַשְּׁבִיעִי מִכׇּל מְלַאכְתּוֹ אֲשֶׁר עָשָׂה', fr: 'Dieu acheva au septième jour l’œuvre qu’Il avait faite ; et Il se reposa le septième jour de toute l’œuvre qu’Il avait faite.' },
      { he: 'וַיְבָרֶךְ אֱלֹהִים אֶת יוֹם הַשְּׁבִיעִי וַיְקַדֵּשׁ אֹתוֹ · כִּי בוֹ שָׁבַת מִכׇּל מְלַאכְתּוֹ אֲשֶׁר בָּרָא אֱלֹהִים לַעֲשׂוֹת', fr: 'Dieu bénit le septième jour et le sanctifia, car en ce jour Il se reposa de toute l’œuvre que Dieu avait créée pour qu’elle s’accomplisse.' },
      { he: 'סַבְרִי מָרָנָן וְרַבָּנָן וְרַבּוֹתַי', fr: '« Avec votre permission, mes maîtres et messieurs ! »' },
      { he: 'בָּרוּךְ אַתָּה יְיָ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם בּוֹרֵא פְּרִי הַגָּפֶן', fr: 'Béni sois-Tu, Éternel notre Dieu, Roi du monde, qui crées le fruit de la vigne.' },
      { he: 'בָּרוּךְ אַתָּה יְיָ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו וְרָצָה בָנוּ · וְשַׁבַּת קׇדְשׁוֹ בְּאַהֲבָה וּבְרָצוֹן הִנְחִילָנוּ זִכָּרוֹן לְמַעֲשֵׂה בְרֵאשִׁית', fr: 'Béni sois-Tu… qui nous as sanctifiés par Tes commandements et nous as agréés ; avec amour et bienveillance, Tu nous as donné en héritage Ton saint Chabbat, souvenir de l’œuvre de la Création,' },
      { he: 'כִּי הוּא יוֹם תְּחִלָּה לְמִקְרָאֵי קֹדֶשׁ זֵכֶר לִיצִיאַת מִצְרָיִם · כִּי בָנוּ בָחַרְתָּ וְאוֹתָנוּ קִדַּשְׁתָּ מִכׇּל הָעַמִּים · וְשַׁבַּת קׇדְשְׁךָ בְּאַהֲבָה וּבְרָצוֹן הִנְחַלְתָּנוּ', fr: 'car c’est le premier des jours saints, souvenir de la sortie d’Égypte ; car Tu nous as choisis et sanctifiés parmi tous les peuples, et Tu nous as donné en héritage, avec amour et bienveillance, Ton saint Chabbat.' },
      { he: 'בָּרוּךְ אַתָּה יְיָ מְקַדֵּשׁ הַשַּׁבָּת', fr: 'Béni sois-Tu, Éternel, qui sanctifies le Chabbat.' },
    ],
  },
  {
    id: 'birkat-hamazon-sefarade', category: 'prieres',
    title: 'Birkat Hamazon (séfarade)', hebrew: 'בִּרְכַּת הַמָּזוֹן',
    author: 'Action de grâces après le repas — rite Edot HaMizra’h (séfarade / marocain)',
    lines: [
      { he: 'שִׁיר הַמַּעֲלוֹת בְּשׁוּב יְיָ אֶת שִׁיבַת צִיּוֹן הָיִינוּ כְּחֹלְמִים · אָז יִמָּלֵא שְׂחוֹק פִּינוּ וּלְשׁוֹנֵנוּ רִנָּה', fr: '(Chabbat) Cantique des degrés. Quand l’Éternel ramena les exilés de Sion, nous étions comme en rêve ; alors notre bouche s’emplit de rires et notre langue de chants.' },
      { he: 'אָז יֹאמְרוּ בַגּוֹיִם הִגְדִּיל יְיָ לַעֲשׂוֹת עִם אֵלֶּה · הִגְדִּיל יְיָ לַעֲשׂוֹת עִמָּנוּ הָיִינוּ שְׂמֵחִים', fr: 'Alors on dit parmi les nations : « L’Éternel a fait de grandes choses pour eux. » Oui, l’Éternel a fait pour nous de grandes choses : nous étions dans la joie.' },
      { he: 'שׁוּבָה יְיָ אֶת שְׁבִיתֵנוּ כַּאֲפִיקִים בַּנֶּגֶב · הַזֹּרְעִים בְּדִמְעָה בְּרִנָּה יִקְצֹרוּ', fr: 'Ramène, Éternel, nos captifs comme les torrents dans le Néguev ; ceux qui sèment dans les larmes moissonneront dans la joie.' },
      { he: 'הָלוֹךְ יֵלֵךְ וּבָכֹה נֹשֵׂא מֶשֶׁךְ הַזָּרַע · בֹּא יָבֹא בְרִנָּה נֹשֵׂא אֲלֻמֹּתָיו', fr: 'Il s’en va en pleurant, portant le sac de semence ; il reviendra avec allégresse, portant ses gerbes.' },
      { he: 'אֲבָרְכָה אֶת יְיָ בְּכׇל עֵת תָּמִיד תְּהִלָּתוֹ בְּפִי · סוֹף דָּבָר הַכֹּל נִשְׁמָע אֶת הָאֱלֹהִים יְרָא וְאֶת מִצְוֹתָיו שְׁמוֹר כִּי זֶה כׇּל הָאָדָם', fr: 'Je bénirai l’Éternel en tout temps, Sa louange sera toujours dans ma bouche. Conclusion de tout : crains Dieu et observe Ses commandements, car c’est là tout l’homme.' },
      { he: 'תְּהִלַּת יְיָ יְדַבֶּר פִּי וִיבָרֵךְ כׇּל בָּשָׂר שֵׁם קׇדְשׁוֹ לְעוֹלָם וָעֶד · וַאֲנַחְנוּ נְבָרֵךְ יָהּ מֵעַתָּה וְעַד עוֹלָם הַלְלוּיָהּ · וַיְדַבֵּר אֵלַי זֶה הַשֻּׁלְחָן אֲשֶׁר לִפְנֵי יְיָ', fr: 'Ma bouche dira la louange de l’Éternel, et toute chair bénira Son saint Nom à jamais ; et nous, nous bénirons Dieu dès maintenant et à jamais, Halelouya. Et il me dit : « Voici la table qui est devant l’Éternel. »' },
      { he: 'הַמְזַמֵּן: הַב לָן וְנִבְרִיךְ לְמַלְכָּא עִלָּאָה קַדִּישָׁא · הַמְסֻבִּים: שָׁמַיִם', fr: 'Celui qui invite : « Donnez-nous [la coupe] et bénissons le Roi suprême et saint ! » — Les convives : « Le Ciel ! »' },
      { he: 'הַמְזַמֵּן: בִּרְשׁוּת מַלְכָּא עִלָּאָה קַדִּישָׁא וּבִרְשׁוּת מוֹרַי וְרַבּוֹתַי וּבִרְשׁוּתְכֶם נְבָרֵךְ (אֱלֹהֵינוּ) שֶׁאָכַלְנוּ מִשֶּׁלּוֹ', fr: '« Avec la permission du Roi suprême et saint, de mes maîtres et de vous tous, bénissons Celui (à dix : notre Dieu) dont nous avons mangé. »' },
      { he: 'הַמְסֻבִּים: בָּרוּךְ (אֱלֹהֵינוּ) שֶׁאָכַלְנוּ מִשֶּׁלּוֹ וּבְטוּבוֹ חָיִינוּ · הַמְזַמֵּן: בָּרוּךְ (אֱלֹהֵינוּ) שֶׁאָכַלְנוּ מִשֶּׁלּוֹ וּבְטוּבוֹ הַגָּדוֹל תָּמִיד חָיִינוּ', fr: 'Les convives : « Béni soit Celui (notre Dieu) dont nous avons mangé et par la bonté de qui nous vivons. » — Celui qui invite répète : « … par la grande bonté de qui nous vivons toujours. »' },
      { he: 'בָּרוּךְ אַתָּה יְיָ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם הָאֵל הַזָּן אוֹתָנוּ וְאֶת הָעוֹלָם כֻּלּוֹ בְּטוּבוֹ בְּחֵן בְּחֶסֶד בְּרֶוַח וּבְרַחֲמִים רַבִּים · נֹתֵן לֶחֶם לְכׇל בָּשָׂר כִּי לְעוֹלָם חַסְדּוֹ', fr: '(1ʳᵉ bénédiction) Béni sois-Tu, Éternel notre Dieu, Roi du monde, Dieu qui nous nourris, nous et le monde entier, par Ta bonté, avec grâce, bienveillance, largesse et grande miséricorde ; Il donne le pain à toute chair, car Sa bonté est éternelle.' },
      { he: 'וּבְטוּבוֹ הַגָּדוֹל תָּמִיד לֹא חָסַר לָנוּ וְאַל יֶחְסַר לָנוּ מָזוֹן תָּמִיד לְעוֹלָם וָעֶד · כִּי הוּא אֵל זָן וּמְפַרְנֵס לַכֹּל וְשֻׁלְחָנוֹ עָרוּךְ לַכֹּל וְהִתְקִין מִחְיָה וּמָזוֹן לְכׇל בְּרִיּוֹתָיו אֲשֶׁר בָּרָא בְרַחֲמָיו וּבְרֹב חֲסָדָיו', fr: 'Par Sa grande bonté, la nourriture ne nous a jamais manqué ; qu’elle ne nous manque jamais. Car Il est le Dieu qui nourrit et sustente tous ; Sa table est dressée pour tous, et Il a préparé subsistance et nourriture pour toutes les créatures qu’Il a créées, dans Sa miséricorde et Sa grande bonté,' },
      { he: 'כָּאָמוּר פּוֹתֵחַ אֶת יָדֶךָ וּמַשְׂבִּיעַ לְכׇל חַי רָצוֹן · בָּרוּךְ אַתָּה יְיָ הַזָּן אֶת הַכֹּל', fr: 'comme il est dit : « Tu ouvres Ta main et rassasies tout vivant selon Ton bon vouloir. » Béni sois-Tu, Éternel, qui nourris tout.' },
      { he: 'נוֹדֶה לְּךָ יְיָ אֱלֹהֵינוּ עַל שֶׁהִנְחַלְתָּ לַאֲבוֹתֵינוּ אֶרֶץ חֶמְדָּה טוֹבָה וּרְחָבָה בְּרִית וְתוֹרָה חַיִּים וּמָזוֹן · עַל שֶׁהוֹצֵאתָנוּ מֵאֶרֶץ מִצְרַיִם וּפְדִיתָנוּ מִבֵּית עֲבָדִים', fr: '(2ᵉ) Nous Te rendons grâce, Éternel notre Dieu, d’avoir donné en héritage à nos pères un pays désirable, bon et vaste, l’alliance et la Torah, la vie et la nourriture ; de nous avoir fait sortir d’Égypte et rachetés de la maison de servitude ;' },
      { he: 'וְעַל בְּרִיתְךָ שֶׁחָתַמְתָּ בִּבְשָׂרֵנוּ וְעַל תּוֹרָתְךָ שֶׁלִּמַּדְתָּנוּ וְעַל חֻקֵּי רְצוֹנָךְ שֶׁהוֹדַעְתָּנוּ · וְעַל חַיִּים וּמָזוֹן שָׁאַתָּה זָן וּמְפַרְנֵס אוֹתָנוּ', fr: 'pour Ton alliance scellée dans notre chair, pour Ta Torah que Tu nous as enseignée, pour les lois de Ta volonté que Tu nous as fait connaître, pour la vie et la nourriture dont Tu nous nourris et nous sustentes.' },
      { he: 'עַל הַכֹּל יְיָ אֱלֹהֵינוּ אֲנַחְנוּ מוֹדִים לָךְ וּמְבָרְכִים אֶת שְׁמָךְ · כָּאָמוּר וְאָכַלְתָּ וְשָׂבָעְתָּ וּבֵרַכְתָּ אֶת יְיָ אֱלֹהֶיךָ עַל הָאָרֶץ הַטֹּבָה אֲשֶׁר נָתַן לָךְ · בָּרוּךְ אַתָּה יְיָ עַל הָאָרֶץ וְעַל הַמָּזוֹן', fr: 'Pour tout cela, Éternel notre Dieu, nous Te rendons grâce et bénissons Ton Nom, comme il est dit : « Tu mangeras, tu seras rassasié, et tu béniras l’Éternel ton Dieu pour le bon pays qu’Il t’a donné. » Béni sois-Tu, Éternel, pour le pays et pour la nourriture.' },
      { he: 'רַחֵם יְיָ אֱלֹהֵינוּ עָלֵינוּ וְעַל יִשְׂרָאֵל עַמָּךְ וְעַל יְרוּשָׁלַיִם עִירָךְ וְעַל הַר צִיּוֹן מִשְׁכַּן כְּבוֹדָךְ · וְעַל הֵיכָלָךְ וְעַל מְעוֹנָךְ וְעַל דְּבִירָךְ וְעַל הַבַּיִת הַגָּדוֹל וְהַקָּדוֹשׁ שֶׁנִּקְרָא שִׁמְךָ עָלָיו', fr: '(3ᵉ) Aie pitié, Éternel notre Dieu, de nous, d’Israël Ton peuple, de Jérusalem Ta ville, du mont Sion demeure de Ta gloire, de Ton palais, de Ta résidence, de Ton sanctuaire, et de la grande et sainte Maison qui porte Ton Nom.' },
      { he: 'אָבִינוּ רְעֵנוּ זוּנֵנוּ פַּרְנְסֵנוּ כַּלְכְּלֵנוּ הַרְוִיחֵנוּ הַרְוַח לָנוּ מְהֵרָה מִכׇּל צָרוֹתֵינוּ · וְאַל תַּצְרִיכֵנוּ יְיָ אֱלֹהֵינוּ לִידֵי מַתְּנוֹת בָּשָׂר וָדָם וְלֹא לִידֵי הַלְוָאָתָם · אֶלָּא לְיָדְךָ הַמְּלֵאָה וְהָרְחָבָה הָעֲשִׁירָה וְהַפְּתוּחָה', fr: 'Notre Père, guide-nous, nourris-nous, sustente-nous, entretiens-nous, soulage-nous, délivre-nous vite de toutes nos détresses ; ne nous fais pas dépendre des dons des hommes ni de leurs prêts, mais seulement de Ta main pleine et large, riche et ouverte.' },
      { he: 'יְהִי רָצוֹן שֶׁלֹּא נֵבוֹשׁ בָּעוֹלָם הַזֶּה וְלֹא נִכָּלֵם לָעוֹלָם הַבָּא · וּמַלְכוּת בֵּית דָּוִד מְשִׁיחָךְ תַּחֲזִירֶנָּה לִמְקוֹמָהּ בִּמְהֵרָה בְיָמֵינוּ', fr: 'Qu’il soit Ta volonté que nous n’ayons pas honte en ce monde ni confusion dans le monde futur ; et la royauté de la maison de David, Ton oint, rétablis-la vite en son lieu, de nos jours.' },
      { he: 'רְצֵה וְהַחֲלִיצֵנוּ יְיָ אֱלֹהֵינוּ בְּמִצְוֹתֶיךָ וּבְמִצְוַת יוֹם הַשְּׁבִיעִי הַשַּׁבָּת הַגָּדוֹל וְהַקָּדוֹשׁ הַזֶּה · כִּי יוֹם גָּדוֹל וְקָדוֹשׁ הוּא מִלְּפָנֶיךָ נִשְׁבּוֹת בּוֹ וְנָנוּחַ בּוֹ וְנִתְעַנֵּג בּוֹ כְּמִצְוַת חֻקֵּי רְצוֹנָךְ', fr: '(Chabbat) Agrée-nous et fortifie-nous, Éternel notre Dieu, par Tes commandements et par celui du septième jour, ce grand et saint Chabbat ; car c’est un jour grand et saint devant Toi : nous y cessons le travail, nous nous y reposons et nous nous y délectons, selon les lois de Ta volonté.' },
      { he: 'וְאַל תְּהִי צָרָה וְיָגוֹן בְּיוֹם מְנוּחָתֵנוּ · וְהַרְאֵנוּ בְנֶחָמַת צִיּוֹן בִּמְהֵרָה בְיָמֵינוּ כִּי אַתָּה הוּא בַּעַל הַנֶּחָמוֹת · וְגַם שֶׁאָכַלְנוּ וְשָׁתִינוּ חׇרְבַּן בֵּיתְךָ הַגָּדוֹל וְהַקָּדוֹשׁ לֹא שָׁכַחְנוּ · אַל תִּשְׁכָּחֵנוּ לָנֶצַח וְאַל תִּזְנָחֵנוּ לָעַד כִּי אֵל מֶלֶךְ גָּדוֹל וְקָדוֹשׁ אָתָּה', fr: 'Qu’il n’y ait ni détresse ni chagrin au jour de notre repos ; fais-nous voir bientôt la consolation de Sion, car Tu es le Maître des consolations. Et bien que nous ayons mangé et bu, nous n’avons pas oublié la destruction de Ta grande et sainte Maison : ne nous oublie pas, ne nous délaisse jamais, car Tu es un Dieu, Roi grand et saint.' },
      { he: 'וְתִבְנֶה יְרוּשָׁלַיִם עִירָךְ בִּמְהֵרָה בְיָמֵינוּ · בָּרוּךְ אַתָּה יְיָ בּוֹנֵה יְרוּשָׁלָיִם · אָמֵן', fr: 'Rebâtis Jérusalem, Ta ville, bientôt, de nos jours. Béni sois-Tu, Éternel, qui rebâtis Jérusalem. (à voix basse) Amen.' },
      { he: 'בָּרוּךְ אַתָּה יְיָ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם לָעַד הָאֵל אָבִינוּ מַלְכֵּנוּ אַדִּירֵנוּ בּוֹרְאֵנוּ גּוֹאֲלֵנוּ קְדוֹשֵׁנוּ קְדוֹשׁ יַעֲקֹב רוֹעֵנוּ רוֹעֵה יִשְׂרָאֵל · הַמֶּלֶךְ הַטּוֹב וְהַמֵּטִיב לַכֹּל', fr: '(4ᵉ) Béni sois-Tu, Éternel notre Dieu, Roi du monde pour toujours, Dieu notre Père, notre Roi, notre Puissant, notre Créateur, notre Rédempteur, notre Saint, Saint de Jacob, notre Berger, Berger d’Israël, le Roi bon qui fait du bien à tous,' },
      { he: 'שֶׁבְּכׇל יוֹם וָיוֹם הוּא הֵיטִיב לָנוּ הוּא מֵיטִיב לָנוּ הוּא יֵיטִיב לָנוּ · הוּא גְמָלָנוּ הוּא גוֹמְלֵנוּ הוּא יִגְמְלֵנוּ לָעַד חֵן וָחֶסֶד וְרַחֲמִים וְרֶוַח וְהַצָּלָה וְכׇל טוֹב', fr: 'qui chaque jour nous a fait, nous fait et nous fera du bien ; Il nous a comblés, nous comble et nous comblera à jamais de grâce, de bonté, de miséricorde, de soulagement, de délivrance et de tout bien.' },
      { he: 'הָרַחֲמָן הוּא יִשְׁתַּבַּח עַל כִּסֵּא כְבוֹדוֹ · הָרַחֲמָן הוּא יִשְׁתַּבַּח בַּשָּׁמַיִם וּבָאָרֶץ · הָרַחֲמָן הוּא יִשְׁתַּבַּח בָּנוּ לְדוֹר דּוֹרִים · הָרַחֲמָן הוּא קֶרֶן לְעַמּוֹ יָרִים · הָרַחֲמָן הוּא יִתְפָּאַר בָּנוּ לְנֵצַח נְצָחִים', fr: 'Que le Miséricordieux soit loué sur Son trône de gloire ; qu’Il soit loué au ciel et sur la terre ; qu’Il soit loué par nous de génération en génération ; qu’Il élève la gloire de Son peuple ; qu’Il soit glorifié par nous pour l’éternité.' },
      { he: 'הָרַחֲמָן הוּא יְפַרְנְסֵנוּ בְּכָבוֹד וְלֹא בְבִזּוּי בְּהֶתֵּר וְלֹא בְאִסּוּר בְּנַחַת וְלֹא בְצַעַר · הָרַחֲמָן הוּא יִתֵּן שָׁלוֹם בֵּינֵינוּ · הָרַחֲמָן הוּא יִשְׁלַח בְּרָכָה רְוָחָה וְהַצְלָחָה בְּכׇל מַעֲשֵׂה יָדֵינוּ · הָרַחֲמָן הוּא יַצְלִיחַ אֶת דְּרָכֵינוּ', fr: 'Qu’Il nous sustente avec honneur et non dans l’humiliation, licitement et non par l’interdit, dans la sérénité et non dans la peine ; qu’Il mette la paix entre nous ; qu’Il envoie bénédiction, aisance et réussite dans toutes nos œuvres ; qu’Il fasse prospérer nos chemins.' },
      { he: 'הָרַחֲמָן הוּא יִשְׁבֹּר עֹל גָּלוּת מְהֵרָה מֵעַל צַוָּארֵנוּ · הָרַחֲמָן הוּא יוֹלִיכֵנוּ מְהֵרָה קוֹמְמִיּוּת בְּאַרְצֵנוּ · הָרַחֲמָן הוּא יִרְפָּאֵנוּ רְפוּאָה שְׁלֵמָה · הָרַחֲמָן הוּא יִפְתַּח לָנוּ אֶת יָדוֹ הָרְחָבָה', fr: 'Qu’Il brise bientôt le joug de l’exil sur notre cou ; qu’Il nous ramène bientôt, la tête haute, dans notre pays ; qu’Il nous accorde une guérison complète ; qu’Il nous ouvre Sa main généreuse.' },
      { he: 'הָרַחֲמָן הוּא יְבָרֵךְ כׇּל אֶחָד וְאֶחָד מִמֶּנּוּ בִּשְׁמוֹ הַגָּדוֹל כְּמוֹ שֶׁנִּתְבָּרְכוּ אֲבוֹתֵינוּ אַבְרָהָם יִצְחָק וְיַעֲקֹב בַּכֹּל מִכֹּל כֹּל · כֵּן יְבָרֵךְ אוֹתָנוּ יַחַד בְּרָכָה שְׁלֵמָה וְכֵן יְהִי רָצוֹן וְנֹאמַר אָמֵן · הָרַחֲמָן הוּא יִפְרֹשׂ עָלֵינוּ סֻכַּת שְׁלוֹמוֹ', fr: 'Qu’Il bénisse chacun de nous par Son grand Nom, comme furent bénis nos pères Avraham, Its’hak et Yaakov, « en tout, de tout, par tout » ; qu’Il nous bénisse ensemble d’une bénédiction parfaite — qu’il en soit ainsi, et disons Amen. Qu’Il étende sur nous la souccah de Sa paix.' },
      { he: 'הָרַחֲמָן הוּא יַנְחִילֵנוּ עוֹלָם שֶׁכֻּלּוֹ שַׁבָּת וּמְנוּחָה לְחַיֵּי הָעוֹלָמִים', fr: '(Chabbat) Qu’Il nous fasse hériter du monde qui sera tout entier Chabbat et repos, pour la vie éternelle.' },
      { he: 'הָרַחֲמָן הוּא יִטַּע תּוֹרָתוֹ וְאַהֲבָתוֹ בְּלִבֵּנוּ וְתִהְיֶה יִרְאָתוֹ עַל פָּנֵינוּ לְבִלְתִּי נֶחֱטָא · וְיִהְיוּ כׇל מַעֲשֵׂינוּ לְשֵׁם שָׁמָיִם', fr: 'Qu’Il plante Sa Torah et Son amour dans nos cœurs, que Sa crainte soit sur nos visages afin que nous ne fautions pas, et que toutes nos actions soient pour le Nom du Ciel.' },
      { he: 'הָרַחֲמָן הוּא יְבָרֵךְ אֶת הַשֻּׁלְחָן הַזֶּה שֶׁאָכַלְנוּ עָלָיו וִיסַדֵּר בּוֹ כׇּל מַעֲדַנֵּי עוֹלָם · וְיִהְיֶה כְּשֻׁלְחָנוֹ שֶׁל אַבְרָהָם אָבִינוּ עָלָיו הַשָּׁלוֹם · כׇּל רָעֵב מִמֶּנּוּ יֹאכַל וְכׇל צָמֵא מִמֶּנּוּ יִשְׁתֶּה וְאַל יֶחְסַר מִמֶּנּוּ כׇּל טוֹב לָעַד וּלְעוֹלְמֵי עוֹלָמִים אָמֵן', fr: '(l’invité) Qu’Il bénisse cette table où nous avons mangé et y dispose toutes les délices du monde ; qu’elle soit comme la table d’Avraham notre père ; que tout affamé y mange, que tout assoiffé y boive, et que nul bien n’y manque jamais. Amen.' },
      { he: 'הָרַחֲמָן הוּא יְבָרֵךְ אֶת בַּעַל הַבַּיִת הַזֶּה וּבַעַל הַסְּעֻדָּה הַזֹּאת הוּא וּבָנָיו וְאִשְׁתּוֹ וְכׇל אֲשֶׁר לוֹ בְּבָנִים שֶׁיִּחְיוּ וּבִנְכָסִים שֶׁיִּרְבּוּ · בָּרֵךְ יְיָ חֵילוֹ וּפֹעַל יָדָיו תִּרְצֶה · וְיִהְיוּ נְכָסָיו וּנְכָסֵינוּ מֻצְלָחִים וּקְרוֹבִים לָעִיר · וְאַל יִזְדַּקֵּק לְפָנָיו וְלֹא לְפָנֵינוּ שׁוּם דְּבַר חֵטְא וְהִרְהוּר עָוֹן · שָׂשׂ וְשָׂמֵחַ כׇּל הַיָּמִים בְּעֹשֶׁר וְכָבוֹד מֵעַתָּה וְעַד עוֹלָם · לֹא יֵבוֹשׁ בָּעוֹלָם הַזֶּה וְלֹא יִכָּלֵם לָעוֹלָם הַבָּא · אָמֵן כֵּן יְהִי רָצוֹן', fr: '(l’invité) Qu’Il bénisse le maître de cette maison et l’hôte de ce repas, lui, ses enfants, son épouse et tout ce qui est à lui, d’enfants qui vivent et de biens qui prospèrent. « Bénis, Éternel, sa force, agrée l’œuvre de ses mains » ; que ses biens et les nôtres réussissent ; que ni lui ni nous ne rencontrions faute ni mauvaise pensée ; qu’il soit joyeux tous les jours, dans la richesse et l’honneur, à jamais ; qu’il n’ait pas honte en ce monde ni confusion dans le monde futur. Amen, qu’il en soit ainsi.' },
      { he: 'הָרַחֲמָן הוּא יְבָרֵךְ אֶת הֶחָתָן וְהַכַּלָּה בְּבָנִים זְכָרִים שֶׁל קַיָּמָא לַעֲבוֹדָתוֹ יִתְבָּרַךְ · הָרַחֲמָן הוּא יְבָרֵךְ אֶת כׇּל הַמְּסֻבִּין בַּשֻּׁלְחָן הַזֶּה וְיִתֵּן לָנוּ הַקָּדוֹשׁ בָּרוּךְ הוּא כׇּל מִשְׁאֲלוֹת לִבֵּנוּ לְטוֹבָה', fr: '(au repas de mariage) Qu’Il bénisse le marié et la mariée d’enfants durables, voués à Son service ; qu’Il bénisse tous les convives de cette table, et que le Saint, béni soit-Il, exauce pour le bien tous les vœux de notre cœur.' },
      { he: 'הָרַחֲמָן הוּא יְחַיֵּינוּ וִיזַכֵּנוּ וִיקָרְבֵנוּ לִימוֹת הַמָּשִׁיחַ וּלְבִנְיַן בֵּית הַמִּקְדָּשׁ וּלְחַיֵּי הָעוֹלָם הַבָּא · מִגְדּוֹל יְשׁוּעוֹת מַלְכּוֹ וְעֹשֶׂה חֶסֶד לִמְשִׁיחוֹ לְדָוִד וּלְזַרְעוֹ עַד עוֹלָם', fr: 'Qu’Il nous fasse vivre et nous rende dignes d’approcher des jours du Machia’h, de la reconstruction du Temple et de la vie du monde futur. Il est une tour de délivrance pour Son roi et fait grâce à Son oint, à David et à sa descendance pour toujours. (en semaine : « Magdil »)' },
      { he: 'כְּפִירִים רָשׁוּ וְרָעֵבוּ וְדֹרְשֵׁי יְיָ לֹא יַחְסְרוּ כׇל טוֹב · נַעַר הָיִיתִי גַּם זָקַנְתִּי וְלֹא רָאִיתִי צַדִּיק נֶעֱזָב וְזַרְעוֹ מְבַקֶּשׁ לָחֶם · כׇּל הַיּוֹם חוֹנֵן וּמַלְוֶה וְזַרְעוֹ לִבְרָכָה', fr: 'Les lionceaux connaissent la disette et la faim, mais ceux qui recherchent l’Éternel ne manquent d’aucun bien. J’ai été jeune et j’ai vieilli, et je n’ai pas vu le juste abandonné, ni sa descendance mendier son pain. Tout le jour il est généreux et prête, et sa descendance est bénie.' },
      { he: 'מַה שֶּׁאָכַלְנוּ יִהְיֶה לְשׇׂבְעָה וּמַה שֶּׁשָּׁתִינוּ יִהְיֶה לִרְפוּאָה וּמַה שֶּׁהוֹתַרְנוּ יִהְיֶה לִבְרָכָה · כְּדִכְתִיב וַיִּתֵּן לִפְנֵיהֶם וַיֹּאכְלוּ וַיּוֹתִרוּ כִּדְבַר יְיָ', fr: 'Que ce que nous avons mangé soit pour la satiété, ce que nous avons bu pour la santé, et ce qui reste pour la bénédiction, comme il est écrit : « Il le leur servit ; ils mangèrent et il en resta, selon la parole de l’Éternel. »' },
      { he: 'בְּרוּכִים אַתֶּם לַיְיָ עֹשֵׂה שָׁמַיִם וָאָרֶץ · בָּרוּךְ הַגֶּבֶר אֲשֶׁר יִבְטַח בַּיְיָ וְהָיָה יְיָ מִבְטַחוֹ · יְיָ עֹז לְעַמּוֹ יִתֵּן יְיָ יְבָרֵךְ אֶת עַמּוֹ בַשָּׁלוֹם', fr: 'Soyez bénis de l’Éternel, Créateur du ciel et de la terre. Béni soit l’homme qui se confie en l’Éternel et dont l’Éternel est l’assurance. L’Éternel donnera la force à Son peuple, l’Éternel bénira Son peuple par la paix.' },
      { he: 'עוֹשֶׂה שָׁלוֹם בִּמְרוֹמָיו הוּא בְרַחֲמָיו יַעֲשֶׂה שָׁלוֹם עָלֵינוּ וְעַל כׇּל עַמּוֹ יִשְׂרָאֵל · וְאִמְרוּ אָמֵן', fr: 'Que Celui qui fait la paix dans Ses hauteurs fasse, dans Sa miséricorde, la paix sur nous et sur tout Son peuple Israël, et dites : Amen.' },
    ],
  },
  {
    id: 'birkat-hamazon-ashkenaze', category: 'prieres',
    title: 'Birkat Hamazon (ashkénaze)', hebrew: 'בִּרְכַּת הַמָּזוֹן',
    author: 'Action de grâces après le repas — rite ashkénaze',
    lines: [
      { he: 'שִׁיר הַמַּעֲלוֹת בְּשׁוּב יְיָ אֶת שִׁיבַת צִיּוֹן הָיִינוּ כְּחֹלְמִים · אָז יִמָּלֵא שְׂחוֹק פִּינוּ וּלְשׁוֹנֵנוּ רִנָּה', fr: '(Chabbat) Cantique des degrés. Quand l’Éternel ramena les exilés de Sion, nous étions comme en rêve ; alors notre bouche s’emplit de rires et notre langue de chants.' },
      { he: 'אָז יֹאמְרוּ בַגּוֹיִם הִגְדִּיל יְיָ לַעֲשׂוֹת עִם אֵלֶּה · הִגְדִּיל יְיָ לַעֲשׂוֹת עִמָּנוּ הָיִינוּ שְׂמֵחִים', fr: 'Alors on dit parmi les nations : « L’Éternel a fait de grandes choses pour eux. » Oui, l’Éternel a fait pour nous de grandes choses : nous étions dans la joie.' },
      { he: 'שׁוּבָה יְיָ אֶת שְׁבִיתֵנוּ כַּאֲפִיקִים בַּנֶּגֶב · הַזֹּרְעִים בְּדִמְעָה בְּרִנָּה יִקְצֹרוּ', fr: 'Ramène, Éternel, nos captifs comme les torrents dans le Néguev ; ceux qui sèment dans les larmes moissonneront dans la joie.' },
      { he: 'הָלוֹךְ יֵלֵךְ וּבָכֹה נֹשֵׂא מֶשֶׁךְ הַזָּרַע · בֹּא יָבֹא בְרִנָּה נֹשֵׂא אֲלֻמֹּתָיו', fr: 'Il s’en va en pleurant, portant le sac de semence ; il reviendra avec allégresse, portant ses gerbes.' },
      { he: 'הַמְזַמֵּן: רַבּוֹתַי נְבָרֵךְ · הַמְסֻבִּים: יְהִי שֵׁם יְיָ מְבֹרָךְ מֵעַתָּה וְעַד עוֹלָם', fr: 'Celui qui invite : « Messieurs, bénissons ! » — Les convives : « Que le Nom de l’Éternel soit béni dès maintenant et à jamais. »' },
      { he: 'הַמְזַמֵּן: בִּרְשׁוּת מָרָנָן וְרַבָּנָן וְרַבּוֹתַי נְבָרֵךְ (אֱלֹהֵינוּ) שֶׁאָכַלְנוּ מִשֶּׁלּוֹ', fr: '« Avec la permission de nos maîtres et de vous tous, bénissons Celui (à dix : notre Dieu) dont nous avons mangé. »' },
      { he: 'הַמְסֻבִּים: בָּרוּךְ (אֱלֹהֵינוּ) שֶׁאָכַלְנוּ מִשֶּׁלּוֹ וּבְטוּבוֹ חָיִינוּ', fr: 'Les convives (puis celui qui invite) : « Béni soit Celui (notre Dieu) dont nous avons mangé et par la bonté de qui nous vivons. »' },
      { he: 'בָּרוּךְ אַתָּה יְיָ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם הַזָּן אֶת הָעוֹלָם כֻּלּוֹ בְּטוּבוֹ בְּחֵן בְּחֶסֶד וּבְרַחֲמִים · הוּא נֹתֵן לֶחֶם לְכׇל בָּשָׂר כִּי לְעוֹלָם חַסְדּוֹ', fr: '(1ʳᵉ bénédiction) Béni sois-Tu, Éternel notre Dieu, Roi du monde, qui nourris le monde entier par Ta bonté, avec grâce, bienveillance et miséricorde ; Il donne le pain à toute chair, car Sa bonté est éternelle.' },
      { he: 'וּבְטוּבוֹ הַגָּדוֹל תָּמִיד לֹא חָסַר לָנוּ וְאַל יֶחְסַר לָנוּ מָזוֹן לְעוֹלָם וָעֶד בַּעֲבוּר שְׁמוֹ הַגָּדוֹל · כִּי הוּא אֵל זָן וּמְפַרְנֵס לַכֹּל וּמֵטִיב לַכֹּל וּמֵכִין מָזוֹן לְכׇל בְּרִיּוֹתָיו אֲשֶׁר בָּרָא · בָּרוּךְ אַתָּה יְיָ הַזָּן אֶת הַכֹּל', fr: 'Par Sa grande bonté, la nourriture ne nous a jamais manqué ; qu’elle ne nous manque jamais, à cause de Son grand Nom ; car Il est le Dieu qui nourrit et sustente tous, fait du bien à tous et prépare la nourriture pour toutes Ses créatures. Béni sois-Tu, Éternel, qui nourris tout.' },
      { he: 'נוֹדֶה לְּךָ יְיָ אֱלֹהֵינוּ עַל שֶׁהִנְחַלְתָּ לַאֲבוֹתֵינוּ אֶרֶץ חֶמְדָּה טוֹבָה וּרְחָבָה · וְעַל שֶׁהוֹצֵאתָנוּ יְיָ אֱלֹהֵינוּ מֵאֶרֶץ מִצְרַיִם וּפְדִיתָנוּ מִבֵּית עֲבָדִים', fr: '(2ᵉ) Nous Te rendons grâce, Éternel notre Dieu, d’avoir donné en héritage à nos pères un pays désirable, bon et vaste ; de nous avoir fait sortir, Éternel notre Dieu, d’Égypte, et rachetés de la maison de servitude ;' },
      { he: 'וְעַל בְּרִיתְךָ שֶׁחָתַמְתָּ בִּבְשָׂרֵנוּ וְעַל תּוֹרָתְךָ שֶׁלִּמַּדְתָּנוּ וְעַל חֻקֶּיךָ שֶׁהוֹדַעְתָּנוּ · וְעַל חַיִּים חֵן וָחֶסֶד שֶׁחוֹנַנְתָּנוּ · וְעַל אֲכִילַת מָזוֹן שָׁאַתָּה זָן וּמְפַרְנֵס אוֹתָנוּ תָּמִיד בְּכׇל יוֹם וּבְכׇל עֵת וּבְכׇל שָׁעָה', fr: 'pour Ton alliance scellée dans notre chair, Ta Torah que Tu nous as enseignée, Tes lois que Tu nous as fait connaître ; pour la vie, la grâce et la bonté que Tu nous as accordées ; et pour la nourriture dont Tu nous nourris et nous sustentes toujours, chaque jour, à tout moment et à toute heure.' },
      { he: 'וְעַל הַכֹּל יְיָ אֱלֹהֵינוּ אֲנַחְנוּ מוֹדִים לָךְ וּמְבָרְכִים אוֹתָךְ יִתְבָּרַךְ שִׁמְךָ בְּפִי כׇּל חַי תָּמִיד לְעוֹלָם וָעֶד · כַּכָּתוּב וְאָכַלְתָּ וְשָׂבָעְתָּ וּבֵרַכְתָּ אֶת יְיָ אֱלֹהֶיךָ עַל הָאָרֶץ הַטֹּבָה אֲשֶׁר נָתַן לָךְ · בָּרוּךְ אַתָּה יְיָ עַל הָאָרֶץ וְעַל הַמָּזוֹן', fr: 'Pour tout cela, Éternel notre Dieu, nous Te rendons grâce et Te bénissons ; que Ton Nom soit béni toujours par la bouche de tout vivant, comme il est écrit : « Tu mangeras, tu seras rassasié, et tu béniras l’Éternel ton Dieu pour le bon pays qu’Il t’a donné. » Béni sois-Tu, Éternel, pour le pays et pour la nourriture.' },
      { he: 'רַחֵם נָא יְיָ אֱלֹהֵינוּ עַל יִשְׂרָאֵל עַמֶּךָ וְעַל יְרוּשָׁלַיִם עִירֶךָ וְעַל צִיּוֹן מִשְׁכַּן כְּבוֹדֶךָ · וְעַל מַלְכוּת בֵּית דָּוִד מְשִׁיחֶךָ וְעַל הַבַּיִת הַגָּדוֹל וְהַקָּדוֹשׁ שֶׁנִּקְרָא שִׁמְךָ עָלָיו', fr: '(3ᵉ) Aie pitié, Éternel notre Dieu, d’Israël Ton peuple, de Jérusalem Ta ville, de Sion demeure de Ta gloire, de la royauté de la maison de David Ton oint, et de la grande et sainte Maison qui porte Ton Nom.' },
      { he: 'אֱלֹהֵינוּ אָבִינוּ רְעֵנוּ זוּנֵנוּ פַּרְנְסֵנוּ וְכַלְכְּלֵנוּ וְהַרְוִיחֵנוּ · וְהַרְוַח לָנוּ יְיָ אֱלֹהֵינוּ מְהֵרָה מִכׇּל צָרוֹתֵינוּ', fr: 'Notre Dieu, notre Père, guide-nous, nourris-nous, sustente-nous, entretiens-nous, soulage-nous ; délivre-nous vite, Éternel notre Dieu, de toutes nos détresses.' },
      { he: 'וְנָא אַל תַּצְרִיכֵנוּ יְיָ אֱלֹהֵינוּ לֹא לִידֵי מַתְּנַת בָּשָׂר וָדָם וְלֹא לִידֵי הַלְוָאָתָם · כִּי אִם לְיָדְךָ הַמְּלֵאָה הַפְּתוּחָה הַקְּדוֹשָׁה וְהָרְחָבָה שֶׁלֹּא נֵבוֹשׁ וְלֹא נִכָּלֵם לְעוֹלָם וָעֶד', fr: 'Ne nous fais pas dépendre des dons des hommes ni de leurs prêts, mais seulement de Ta main pleine, ouverte, sainte et large, afin que nous n’ayons jamais honte ni confusion.' },
      { he: 'רְצֵה וְהַחֲלִיצֵנוּ יְיָ אֱלֹהֵינוּ בְּמִצְוֹתֶיךָ וּבְמִצְוַת יוֹם הַשְּׁבִיעִי הַשַּׁבָּת הַגָּדוֹל וְהַקָּדוֹשׁ הַזֶּה · כִּי יוֹם זֶה גָּדוֹל וְקָדוֹשׁ הוּא לְפָנֶיךָ לִשְׁבָּת בּוֹ וְלָנוּחַ בּוֹ בְּאַהֲבָה כְּמִצְוַת רְצוֹנֶךָ', fr: '(Chabbat) Agrée-nous et fortifie-nous, Éternel notre Dieu, par Tes commandements et par celui du septième jour, ce grand et saint Chabbat ; car ce jour est grand et saint devant Toi, pour s’y abstenir de travail et s’y reposer avec amour, selon Ta volonté.' },
      { he: 'וּבִרְצוֹנְךָ הָנִיחַ לָנוּ יְיָ אֱלֹהֵינוּ שֶׁלֹּא תְהֵא צָרָה וְיָגוֹן וַאֲנָחָה בְּיוֹם מְנוּחָתֵנוּ · וְהַרְאֵנוּ יְיָ אֱלֹהֵינוּ בְּנֶחָמַת צִיּוֹן עִירֶךָ וּבְבִנְיַן יְרוּשָׁלַיִם עִיר קׇדְשֶׁךָ · כִּי אַתָּה הוּא בַּעַל הַיְשׁוּעוֹת וּבַעַל הַנֶּחָמוֹת', fr: 'Accorde-nous, par Ta volonté, qu’il n’y ait ni détresse, ni chagrin, ni soupir au jour de notre repos ; fais-nous voir, Éternel notre Dieu, la consolation de Sion Ta ville et la reconstruction de Jérusalem, ville de Ta sainteté, car Tu es le Maître des délivrances et des consolations.' },
      { he: 'וּבְנֵה יְרוּשָׁלַיִם עִיר הַקֹּדֶשׁ בִּמְהֵרָה בְיָמֵינוּ · בָּרוּךְ אַתָּה יְיָ בּוֹנֵה בְרַחֲמָיו יְרוּשָׁלָיִם · אָמֵן', fr: 'Rebâtis Jérusalem, la ville sainte, bientôt, de nos jours. Béni sois-Tu, Éternel, qui rebâtis Jérusalem dans Ta miséricorde. Amen.' },
      { he: 'בָּרוּךְ אַתָּה יְיָ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם הָאֵל אָבִינוּ מַלְכֵּנוּ אַדִּירֵנוּ בּוֹרְאֵנוּ גֹּאֲלֵנוּ יוֹצְרֵנוּ קְדוֹשֵׁנוּ קְדוֹשׁ יַעֲקֹב רוֹעֵנוּ רוֹעֵה יִשְׂרָאֵל · הַמֶּלֶךְ הַטּוֹב וְהַמֵּיטִיב לַכֹּל', fr: '(4ᵉ) Béni sois-Tu, Éternel notre Dieu, Roi du monde, Dieu notre Père, notre Roi, notre Puissant, notre Créateur, notre Rédempteur, notre Formateur, notre Saint, Saint de Jacob, notre Berger, Berger d’Israël, le Roi bon qui fait du bien à tous,' },
      { he: 'שֶׁבְּכׇל יוֹם וָיוֹם הוּא הֵיטִיב הוּא מֵיטִיב הוּא יֵיטִיב לָנוּ · הוּא גְמָלָנוּ הוּא גוֹמְלֵנוּ הוּא יִגְמְלֵנוּ לָעַד לְחֵן וּלְחֶסֶד וּלְרַחֲמִים וּלְרֶוַח הַצָּלָה וְהַצְלָחָה בְּרָכָה וִישׁוּעָה נֶחָמָה פַּרְנָסָה וְכַלְכָּלָה וְרַחֲמִים וְחַיִּים וְשָׁלוֹם וְכׇל טוֹב · וּמִכׇּל טוּב לְעוֹלָם אַל יְחַסְּרֵנוּ', fr: 'qui chaque jour nous a fait, nous fait et nous fera du bien ; Il nous a comblés, nous comble et nous comblera à jamais de grâce, de bonté, de miséricorde, de soulagement, de délivrance, de réussite, de bénédiction, de salut, de consolation, de subsistance, de vie, de paix et de tout bien ; qu’Il ne nous prive jamais d’aucun bien.' },
      { he: 'הָרַחֲמָן הוּא יִמְלוֹךְ עָלֵינוּ לְעוֹלָם וָעֶד · הָרַחֲמָן הוּא יִתְבָּרַךְ בַּשָּׁמַיִם וּבָאָרֶץ · הָרַחֲמָן הוּא יִשְׁתַּבַּח לְדוֹר דּוֹרִים וְיִתְפָּאַר בָּנוּ לָעַד וּלְנֵצַח נְצָחִים וְיִתְהַדַּר בָּנוּ לָעַד וּלְעוֹלְמֵי עוֹלָמִים', fr: 'Que le Miséricordieux règne sur nous à jamais ; qu’Il soit béni au ciel et sur la terre ; qu’Il soit loué de génération en génération, glorifié par nous pour l’éternité et honoré par nous à tout jamais.' },
      { he: 'הָרַחֲמָן הוּא יְפַרְנְסֵנוּ בְּכָבוֹד · הָרַחֲמָן הוּא יִשְׁבּוֹר עֻלֵּנוּ מֵעַל צַוָּארֵנוּ וְהוּא יוֹלִיכֵנוּ קוֹמְמִיּוּת לְאַרְצֵנוּ · הָרַחֲמָן הוּא יִשְׁלַח לָנוּ בְּרָכָה מְרֻבָּה בַּבַּיִת הַזֶּה וְעַל שֻׁלְחָן זֶה שֶׁאָכַלְנוּ עָלָיו · הָרַחֲמָן הוּא יִשְׁלַח לָנוּ אֶת אֵלִיָּהוּ הַנָּבִיא זָכוּר לַטּוֹב וִיבַשֶּׂר לָנוּ בְּשׂוֹרוֹת טוֹבוֹת יְשׁוּעוֹת וְנֶחָמוֹת', fr: 'Qu’Il nous sustente avec honneur ; qu’Il brise le joug de notre cou et nous conduise, la tête haute, vers notre pays ; qu’Il envoie une abondante bénédiction sur cette maison et sur cette table où nous avons mangé ; qu’Il nous envoie Élie le prophète, de mémoire bénie, pour nous annoncer bonnes nouvelles, délivrances et consolations.' },
      { he: 'הָרַחֲמָן הוּא יְבָרֵךְ אֶת בַּעַל הַבַּיִת הַזֶּה וְאֶת בַּעֲלַת הַבַּיִת הַזֶּה · אוֹתָם וְאֶת בֵּיתָם וְאֶת זַרְעָם וְאֶת כׇּל אֲשֶׁר לָהֶם · אוֹתָנוּ וְאֶת כׇּל אֲשֶׁר לָנוּ · כְּמוֹ שֶׁנִּתְבָּרְכוּ אֲבוֹתֵינוּ אַבְרָהָם יִצְחָק וְיַעֲקֹב בַּכֹּל מִכֹּל כֹּל · כֵּן יְבָרֵךְ אוֹתָנוּ כֻּלָּנוּ יַחַד בִּבְרָכָה שְׁלֵמָה · וְנֹאמַר אָמֵן', fr: '(l’invité) Qu’Il bénisse le maître et la maîtresse de cette maison, eux, leur foyer, leurs enfants et tout ce qui est à eux, nous et tout ce qui est à nous, comme furent bénis nos pères Avraham, Its’hak et Yaakov, « en tout, de tout, par tout » ; qu’Il nous bénisse tous ensemble d’une bénédiction parfaite, et disons Amen.' },
      { he: 'בַּמָּרוֹם יְלַמְּדוּ עֲלֵיהֶם וְעָלֵינוּ זְכוּת שֶׁתְּהֵא לְמִשְׁמֶרֶת שָׁלוֹם · וְנִשָּׂא בְרָכָה מֵאֵת יְיָ וּצְדָקָה מֵאֱלֹהֵי יִשְׁעֵנוּ · וְנִמְצָא חֵן וְשֵׂכֶל טוֹב בְּעֵינֵי אֱלֹהִים וְאָדָם', fr: 'Que là-haut soit plaidé, pour eux et pour nous, un mérite qui assure la paix ; que nous recevions la bénédiction de l’Éternel et la bienveillance du Dieu de notre salut ; et trouvions grâce et bonne intelligence aux yeux de Dieu et des hommes.' },
      { he: 'הָרַחֲמָן הוּא יַנְחִילֵנוּ יוֹם שֶׁכֻּלּוֹ שַׁבָּת וּמְנוּחָה לְחַיֵּי הָעוֹלָמִים', fr: '(Chabbat) Qu’Il nous fasse hériter du jour qui sera tout entier Chabbat et repos, pour la vie éternelle.' },
      { he: 'הָרַחֲמָן הוּא יְזַכֵּנוּ לִימוֹת הַמָּשִׁיחַ וּלְחַיֵּי הָעוֹלָם הַבָּא · מִגְדּוֹל יְשׁוּעוֹת מַלְכּוֹ וְעֹשֶׂה חֶסֶד לִמְשִׁיחוֹ לְדָוִד וּלְזַרְעוֹ עַד עוֹלָם', fr: 'Qu’Il nous rende dignes des jours du Machia’h et de la vie du monde futur. Il est une tour de délivrance pour Son roi et fait grâce à Son oint, à David et à sa descendance pour toujours. (en semaine : « Magdil »)' },
      { he: 'עֹשֶׂה שָׁלוֹם בִּמְרוֹמָיו הוּא יַעֲשֶׂה שָׁלוֹם עָלֵינוּ וְעַל כׇּל יִשְׂרָאֵל · וְאִמְרוּ אָמֵן', fr: 'Que Celui qui fait la paix dans Ses hauteurs fasse la paix sur nous et sur tout Israël, et dites : Amen.' },
      { he: 'יִרְאוּ אֶת יְיָ קְדֹשָׁיו כִּי אֵין מַחְסוֹר לִירֵאָיו · כְּפִירִים רָשׁוּ וְרָעֵבוּ וְדֹרְשֵׁי יְיָ לֹא יַחְסְרוּ כׇל טוֹב · הוֹדוּ לַיְיָ כִּי טוֹב כִּי לְעוֹלָם חַסְדּוֹ · פּוֹתֵחַ אֶת יָדֶךָ וּמַשְׂבִּיעַ לְכׇל חַי רָצוֹן', fr: 'Craignez l’Éternel, vous Ses saints, car rien ne manque à ceux qui Le craignent. Les lionceaux connaissent la disette et la faim, mais ceux qui recherchent l’Éternel ne manquent d’aucun bien. Rendez grâce à l’Éternel car Il est bon, car Sa bonté est éternelle. Tu ouvres Ta main et rassasies tout vivant selon Ton bon vouloir.' },
      { he: 'בָּרוּךְ הַגֶּבֶר אֲשֶׁר יִבְטַח בַּיְיָ וְהָיָה יְיָ מִבְטַחוֹ · נַעַר הָיִיתִי גַּם זָקַנְתִּי וְלֹא רָאִיתִי צַדִּיק נֶעֱזָב וְזַרְעוֹ מְבַקֶּשׁ לָחֶם · יְיָ עֹז לְעַמּוֹ יִתֵּן יְיָ יְבָרֵךְ אֶת עַמּוֹ בַשָּׁלוֹם', fr: 'Béni soit l’homme qui se confie en l’Éternel et dont l’Éternel est l’assurance. J’ai été jeune et j’ai vieilli, et je n’ai pas vu le juste abandonné, ni sa descendance mendier son pain. L’Éternel donnera la force à Son peuple, l’Éternel bénira Son peuple par la paix.' },
    ],
  },

  // =========================== ZEMIROT DE CHABBAT ===========================
  {
    id: 'shalom-aleichem', category: 'chabbat', title: 'Chalom Alékhem', hebrew: 'שָׁלוֹם עֲלֵיכֶם',
    author: 'Accueil des anges du Chabbat (Kabbale de Safed)', audio: yt('shalom aleichem'),
    lines: [
      { he: 'שָׁלוֹם עֲלֵיכֶם מַלְאֲכֵי הַשָּׁרֵת מַלְאֲכֵי עֶלְיוֹן / מִמֶּלֶךְ מַלְכֵי הַמְּלָכִים הַקָּדוֹשׁ בָּרוּךְ הוּא', fr: 'Paix sur vous, anges du service, anges du Très-Haut, envoyés du Roi des rois, le Saint, béni soit-Il.' },
      { he: 'בּוֹאֲכֶם לְשָׁלוֹם מַלְאֲכֵי הַשָּׁלוֹם מַלְאֲכֵי עֶלְיוֹן / מִמֶּלֶךְ מַלְכֵי הַמְּלָכִים הַקָּדוֹשׁ בָּרוּךְ הוּא', fr: 'Venez en paix, anges de la paix, anges du Très-Haut, envoyés du Roi des rois, le Saint, béni soit-Il.' },
      { he: 'בָּרְכוּנִי לְשָׁלוֹם מַלְאֲכֵי הַשָּׁלוֹם מַלְאֲכֵי עֶלְיוֹן / מִמֶּלֶךְ מַלְכֵי הַמְּלָכִים הַקָּדוֹשׁ בָּרוּךְ הוּא', fr: 'Bénissez-moi pour la paix, anges de la paix, anges du Très-Haut, envoyés du Roi des rois, le Saint, béni soit-Il.' },
      { he: 'צֵאתְכֶם לְשָׁלוֹם מַלְאֲכֵי הַשָּׁלוֹם מַלְאֲכֵי עֶלְיוֹן / מִמֶּלֶךְ מַלְכֵי הַמְּלָכִים הַקָּדוֹשׁ בָּרוּךְ הוּא', fr: 'Partez en paix, anges de la paix, anges du Très-Haut, envoyés du Roi des rois, le Saint, béni soit-Il.' },
    ],
  },
  {
    id: 'eshet-chayil', category: 'chabbat', title: 'Échet ’Hayil', hebrew: 'אֵשֶׁת חַיִל',
    author: 'Proverbes 31, 10-31 — chanté avant le Kiddouch', audio: yt('eshet chayil'),
    lines: [
      { he: 'אֵשֶׁת חַיִל מִי יִמְצָא וְרָחֹק מִפְּנִינִים מִכְרָהּ / בָּטַח בָּהּ לֵב בַּעְלָהּ וְשָׁלָל לֹא יֶחְסָר', fr: 'Une femme vaillante, qui la trouvera ? Son prix dépasse de loin celui des perles. Le cœur de son mari a confiance en elle ; il ne manquera de rien.' },
      { he: 'גְּמָלַתְהוּ טוֹב וְלֹא רָע כֹּל יְמֵי חַיֶּיהָ / דָּרְשָׁה צֶמֶר וּפִשְׁתִּים וַתַּעַשׂ בְּחֵפֶץ כַּפֶּיהָ', fr: 'Elle lui fait du bien, jamais du mal, tous les jours de sa vie. Elle recherche la laine et le lin, et travaille de ses mains avec entrain.' },
      { he: 'הָיְתָה כׇּאֳנִיּוֹת סוֹחֵר מִמֶּרְחָק תָּבִיא לַחְמָהּ / וַתָּקׇם בְּעוֹד לַיְלָה וַתִּתֵּן טֶרֶף לְבֵיתָהּ וְחֹק לְנַעֲרֹתֶיהָ', fr: 'Elle est comme les navires marchands : de loin elle amène son pain. Elle se lève quand il fait encore nuit, donne la nourriture à sa maison et la tâche à ses servantes.' },
      { he: 'זָמְמָה שָׂדֶה וַתִּקָּחֵהוּ מִפְּרִי כַפֶּיהָ נָטְעָה כָּרֶם / חָגְרָה בְעוֹז מׇתְנֶיהָ וַתְּאַמֵּץ זְרוֹעֹתֶיהָ', fr: 'Elle songe à un champ et l’acquiert ; du fruit de ses mains elle plante une vigne. Elle ceint ses reins de force et affermit ses bras.' },
      { he: 'טָעֲמָה כִּי טוֹב סַחְרָהּ לֹא יִכְבֶּה בַלַּיְלָה נֵרָהּ / יָדֶיהָ שִׁלְּחָה בַכִּישׁוֹר וְכַפֶּיהָ תָּמְכוּ פָלֶךְ', fr: 'Elle sent que son travail est fructueux ; sa lampe ne s’éteint pas la nuit. Elle met la main à la quenouille, ses doigts tiennent le fuseau.' },
      { he: 'כַּפָּהּ פָּרְשָׂה לֶעָנִי וְיָדֶיהָ שִׁלְּחָה לָאֶבְיוֹן / לֹא תִירָא לְבֵיתָהּ מִשָּׁלֶג כִּי כׇל בֵּיתָהּ לָבֻשׁ שָׁנִים', fr: 'Elle tend la main au pauvre, elle ouvre les bras à l’indigent. Elle ne craint pas la neige pour sa maison, car toute sa maison est vêtue d’écarlate.' },
      { he: 'מַרְבַדִּים עָשְׂתָה לָּהּ שֵׁשׁ וְאַרְגָּמָן לְבוּשָׁהּ / נוֹדָע בַּשְּׁעָרִים בַּעְלָהּ בְּשִׁבְתּוֹ עִם זִקְנֵי אָרֶץ', fr: 'Elle se fait des tapis ; le fin lin et la pourpre sont son vêtement. Son mari est considéré aux portes de la ville, quand il siège avec les anciens du pays.' },
      { he: 'סָדִין עָשְׂתָה וַתִּמְכֹּר וַחֲגוֹר נָתְנָה לַכְּנַעֲנִי / עֹז וְהָדָר לְבוּשָׁהּ וַתִּשְׂחַק לְיוֹם אַחֲרוֹן', fr: 'Elle fait des étoffes et les vend, elle livre des ceintures au marchand. Force et dignité sont son vêtement, et elle sourit à l’avenir.' },
      { he: 'פִּיהָ פָּתְחָה בְחׇכְמָה וְתוֹרַת חֶסֶד עַל לְשׁוֹנָהּ / צוֹפִיָּה הֲלִיכוֹת בֵּיתָהּ וְלֶחֶם עַצְלוּת לֹא תֹאכֵל', fr: 'Elle ouvre la bouche avec sagesse, un enseignement de bonté est sur sa langue. Elle veille à la marche de sa maison et ne mange pas le pain de l’oisiveté.' },
      { he: 'קָמוּ בָנֶיהָ וַיְאַשְּׁרוּהָ בַּעְלָהּ וַיְהַלְלָהּ / רַבּוֹת בָּנוֹת עָשׂוּ חָיִל וְאַתְּ עָלִית עַל כֻּלָּנָה', fr: 'Ses enfants se lèvent et la disent heureuse ; son mari fait son éloge : « Bien des femmes ont montré leur vaillance, mais toi, tu les surpasses toutes. »' },
      { he: 'שֶׁקֶר הַחֵן וְהֶבֶל הַיֹּפִי אִשָּׁה יִרְאַת יְיָ הִיא תִתְהַלָּל / תְּנוּ לָהּ מִפְּרִי יָדֶיהָ וִיהַלְלוּהָ בַשְּׁעָרִים מַעֲשֶׂיהָ', fr: 'La grâce est trompeuse et la beauté est vaine : la femme qui craint l’Éternel, c’est elle qui sera louée. Donnez-lui du fruit de ses mains, et que ses œuvres la louent aux portes de la ville.' },
    ],
  },
  {
    id: 'yedid-nefesh', category: 'chabbat', title: 'Yédid Néfech', hebrew: 'יְדִיד נֶפֶשׁ',
    author: 'Rabbi Éléazar Azikri (Safed, XVIᵉ s.)', audio: yt('yedid nefesh'),
    lines: [
      { he: 'יְדִיד נֶפֶשׁ אָב הָרַחֲמָן / מְשֹׁךְ עַבְדָּךְ אֶל רְצוֹנָךְ / יָרוּץ עַבְדָּךְ כְּמוֹ אַיָּל / יִשְׁתַּחֲוֶה מוּל הֲדָרָךְ / כִּי יֶעֱרַב לוֹ יְדִידוּתָךְ / מִנֹּפֶת צוּף וְכׇל טַעַם', fr: 'Ami de l’âme, Père miséricordieux, attire Ton serviteur vers Ta volonté ; Ton serviteur courra comme un cerf pour se prosterner devant Ta splendeur, car Ton amitié lui est plus douce que le miel et que toute saveur.' },
      { he: 'הָדוּר נָאֶה זִיו הָעוֹלָם / נַפְשִׁי חוֹלַת אַהֲבָתָךְ / אָנָּא אֵל נָא רְפָא נָא לָהּ / בְּהַרְאוֹת לָהּ נֹעַם זִיוָךְ / אָז תִּתְחַזֵּק וְתִתְרַפֵּא / וְהָיְתָה לָּךְ שִׁפְחַת עוֹלָם', fr: 'Majestueux, splendide, éclat du monde, mon âme est malade de Ton amour ; de grâce, ô Dieu, guéris-la en lui montrant la douceur de Ta lumière : alors elle se fortifiera, guérira, et sera Ta servante pour toujours.' },
      { he: 'וָתִיק יֶהֱמוּ רַחֲמֶיךָ / וְחוּסָה נָּא עַל בֵּן אוֹהֲבָךְ / כִּי זֶה כַמֶּה נִכְסֹף נִכְסַף / לִרְאוֹת בְּתִפְאֶרֶת עֻזָּךְ / אָנָּא אֵלִי מַחְמַד לִבִּי / חוּשָׁה נָּא וְאַל תִּתְעַלָּם', fr: 'Ô Toi l’Ancien, que Ta compassion s’émeuve ; aie pitié du fils de Ton ami, car il aspire depuis si longtemps à contempler la splendeur de Ta force. De grâce, mon Dieu, désir de mon cœur, hâte-Toi, ne Te dérobe pas.' },
      { he: 'הִגָּלֶה נָא וּפְרֹשׂ חָבִיב / עָלַי אֶת סֻכַּת שְׁלוֹמָךְ / תָּאִיר אֶרֶץ מִכְּבוֹדָךְ / נָגִילָה וְנִשְׂמְחָה בָךְ / מַהֵר אָהוּב כִּי בָא מוֹעֵד / וְחׇנֵּנוּ כִּימֵי עוֹלָם', fr: 'Révèle-Toi, mon Bien-aimé, et étends sur moi la souccah de Ta paix ; que la terre s’illumine de Ta gloire, nous exulterons et nous réjouirons en Toi. Hâte-Toi, Bien-aimé, car le temps est venu, et fais-nous grâce comme aux jours d’antan.' },
    ],
  },
  {
    id: 'lecha-dodi', category: 'chabbat', title: 'Lékha Dodi', hebrew: 'לְכָה דוֹדִי',
    author: 'Rabbi Chelomo Halévi Alkabets (Safed, XVIᵉ s.)', audio: yt('lecha dodi'),
    lines: [
      { r: 1, he: 'לְכָה דוֹדִי לִקְרַאת כַּלָּה / פְּנֵי שַׁבָּת נְקַבְּלָה', fr: 'Viens, mon bien-aimé, au-devant de la fiancée : accueillons le Chabbat. (refrain)' },
      { he: 'שָׁמוֹר וְזָכוֹר בְּדִבּוּר אֶחָד / הִשְׁמִיעָנוּ אֵל הַמְיֻחָד / יְיָ אֶחָד וּשְׁמוֹ אֶחָד / לְשֵׁם וּלְתִפְאֶרֶת וְלִתְהִלָּה', fr: '« Garde » et « Souviens-toi » en une seule parole : le Dieu unique nous les fit entendre ; l’Éternel est Un et Son Nom est Un, pour la renommée, la splendeur et la louange.' },
      { he: 'לִקְרַאת שַׁבָּת לְכוּ וְנֵלְכָה / כִּי הִיא מְקוֹר הַבְּרָכָה / מֵרֹאשׁ מִקֶּדֶם נְסוּכָה / סוֹף מַעֲשֶׂה בְּמַחֲשָׁבָה תְּחִלָּה', fr: 'Au-devant du Chabbat, venez, allons, car il est la source de la bénédiction ; établi dès l’origine, dernier dans l’action, premier dans la pensée.' },
      { he: 'מִקְדַּשׁ מֶלֶךְ עִיר מְלוּכָה / קוּמִי צְאִי מִתּוֹךְ הַהֲפֵכָה / רַב לָךְ שֶׁבֶת בְּעֵמֶק הַבָּכָא / וְהוּא יַחֲמֹל עָלַיִךְ חֶמְלָה', fr: 'Sanctuaire du Roi, cité royale, lève-toi, sors des ruines ; assez de demeurer dans la vallée des pleurs : Il aura pour toi compassion.' },
      { he: 'הִתְנַעֲרִי מֵעָפָר קוּמִי / לִבְשִׁי בִּגְדֵי תִפְאַרְתֵּךְ עַמִּי / עַל יַד בֶּן יִשַׁי בֵּית הַלַּחְמִי / קׇרְבָה אֶל נַפְשִׁי גְאָלָהּ', fr: 'Secoue-toi de la poussière, lève-toi, revêts tes habits de gloire, mon peuple ; par le fils de Jessé, le Bethléémite, approche-Toi de mon âme, délivre-la.' },
      { he: 'הִתְעוֹרְרִי הִתְעוֹרְרִי / כִּי בָא אוֹרֵךְ קוּמִי אוֹרִי / עוּרִי עוּרִי שִׁיר דַּבֵּרִי / כְּבוֹד יְיָ עָלַיִךְ נִגְלָה', fr: 'Réveille-toi, réveille-toi, car ta lumière est venue : lève-toi, resplendis ; éveille-toi, entonne un chant : la gloire de l’Éternel se révèle sur toi.' },
      { he: 'לֹא תֵבֹשִׁי וְלֹא תִכָּלְמִי / מַה תִּשְׁתּוֹחֲחִי וּמַה תֶּהֱמִי / בָּךְ יֶחֱסוּ עֲנִיֵּי עַמִּי / וְנִבְנְתָה עִיר עַל תִּלָּהּ', fr: 'N’aie ni honte ni confusion ; pourquoi t’abattre et gémir ? En toi s’abriteront les pauvres de mon peuple, et la ville sera rebâtie sur ses ruines.' },
      { he: 'וְהָיוּ לִמְשִׁסָּה שֹׁאסָיִךְ / וְרָחֲקוּ כׇּל מְבַלְּעָיִךְ / יָשִׂישׂ עָלַיִךְ אֱלֹהָיִךְ / כִּמְשׂוֹשׂ חָתָן עַל כַּלָּה', fr: 'Tes pillards seront pillés, ceux qui te dévoraient seront éloignés ; ton Dieu se réjouira de toi comme l’époux se réjouit de l’épouse.' },
      { he: 'יָמִין וּשְׂמֹאל תִּפְרֹצִי / וְאֶת יְיָ תַּעֲרִיצִי / עַל יַד אִישׁ בֶּן פַּרְצִי / וְנִשְׂמְחָה וְנָגִילָה', fr: 'À droite et à gauche tu te répandras, et tu révéreras l’Éternel ; par l’homme issu de Pérets, nous nous réjouirons et exulterons.' },
      { he: 'בּוֹאִי בְשָׁלוֹם עֲטֶרֶת בַּעְלָהּ / גַּם בְּשִׂמְחָה וּבְצׇהֳלָה / תּוֹךְ אֱמוּנֵי עַם סְגֻלָּה / בּוֹאִי כַלָּה בּוֹאִי כַלָּה', fr: 'Viens en paix, couronne de ton époux, dans la joie et l’allégresse, parmi les fidèles du peuple élu ; viens, ô fiancée, viens, ô fiancée !' },
    ],
  },
  {
    id: 'yah-ribon', category: 'chabbat', title: 'Yah Ribon', hebrew: 'יָהּ רִבּוֹן',
    author: 'Rabbi Israël Najara (Safed, XVIᵉ s.) — en araméen', audio: yt('yah ribon alam'),
    lines: [
      { r: 1, he: 'יָהּ רִבּוֹן עָלַם וְעָלְמַיָּא / אַנְתְּ הוּא מַלְכָּא מֶלֶךְ מַלְכַיָּא / עוֹבַד גְּבוּרְתֵּךְ וְתִמְהַיָּא / שְׁפַר קֳדָמָךְ לְהַחֲוָיָא', fr: 'Dieu, Maître de l’univers et des mondes, Tu es le Roi, le Roi des rois ; l’œuvre de Ta puissance et Tes merveilles, il m’est beau de les proclamer devant Toi. (refrain)' },
      { he: 'שְׁבָחִין אֲסַדֵּר צַפְרָא וְרַמְשָׁא / לָךְ אֱלָהָא קַדִּישָׁא דִּי בְרָא כׇל נַפְשָׁא / עִירִין קַדִּישִׁין וּבְנֵי אֱנָשָׁא / חֵיוַת בָּרָא וְעוֹפֵי שְׁמַיָּא', fr: 'J’ordonnerai des louanges matin et soir pour Toi, Dieu saint, qui as créé toute âme : anges saints et enfants des hommes, bêtes des champs et oiseaux du ciel.' },
      { he: 'רַבְרְבִין עוֹבָדָךְ וְתַקִּיפִין / מָכִיךְ רְמַיָּא וְזָקִיף כְּפִיפִין / לוּ יִחְיֶה גְבַר שְׁנִין אַלְפִין / לָא יֵעֹל גְּבוּרְתֵּךְ בְּחֻשְׁבְּנַיָּא', fr: 'Grandes et puissantes sont Tes œuvres : Tu abaisses les orgueilleux, Tu redresses les courbés ; l’homme vivrait-il mille ans, il ne saurait mesurer Ta puissance.' },
      { he: 'אֱלָהָא דִּי לֵהּ יְקָר וּרְבוּתָא / פְּרֹק יַת עָנָךְ מִפּוּם אַרְיָוָתָא / וְאַפֵּק יַת עַמֵּךְ מִגּוֹ גָלוּתָא / עַמֵּךְ דִּי בְחַרְתְּ מִכׇּל אֻמַּיָּא', fr: 'Ô Dieu, à qui sont la gloire et la grandeur, délivre Ton troupeau de la gueule des lions ; fais sortir Ton peuple de l’exil, le peuple que Tu as choisi parmi toutes les nations.' },
      { he: 'לְמִקְדָּשֵׁךְ תּוּב וּלְקֹדֶשׁ קֻדְשִׁין / אֲתַר דִּי בֵהּ יֶחֱדוּן רוּחִין וְנַפְשִׁין / וִיזַמְּרוּן לָךְ שִׁירִין וְרַחֲשִׁין / בִּירוּשְׁלֵם קַרְתָּא דְשׁוּפְרַיָּא', fr: 'Reviens à Ton Sanctuaire et au Saint des saints, lieu où se réjouiront esprits et âmes ; ils Te chanteront hymnes et cantiques, à Jérusalem, la ville de beauté.' },
    ],
  },
  {
    id: 'tzur-mishelo', category: 'chabbat', title: 'Tsour Michélo', hebrew: 'צוּר מִשֶּׁלּוֹ',
    author: 'Zémer d’avant le Birkat Hamazon (auteur inconnu)', audio: yt('tzur mishelo'),
    lines: [
      { r: 1, he: 'צוּר מִשֶּׁלּוֹ אָכַלְנוּ בָּרְכוּ אֱמוּנַי / שָׂבַעְנוּ וְהוֹתַרְנוּ כִּדְבַר יְיָ', fr: 'Le Rocher dont nous avons mangé, bénissez-Le, mes fidèles : nous sommes rassasiés et il en reste, selon la parole de l’Éternel. (refrain)' },
      { he: 'הַזָּן אֶת עוֹלָמוֹ רוֹעֵנוּ אָבִינוּ / אָכַלְנוּ אֶת לַחְמוֹ וְיֵינוֹ שָׁתִינוּ / עַל כֵּן נוֹדֶה לִשְׁמוֹ וּנְהַלְּלוֹ בְּפִינוּ / אָמַרְנוּ וְעָנִינוּ אֵין קָדוֹשׁ כַּיְיָ', fr: 'Celui qui nourrit Son monde, notre Berger, notre Père : nous avons mangé Son pain et bu Son vin ; aussi louerons-nous Son Nom et Le célébrerons-nous ; nous l’avons dit et répété : nul n’est saint comme l’Éternel.' },
      { he: 'בְּשִׁיר וְקוֹל תּוֹדָה נְבָרֵךְ לֵאלֹהֵינוּ / עַל אֶרֶץ חֶמְדָּה טוֹבָה שֶׁהִנְחִיל לַאֲבוֹתֵינוּ / מָזוֹן וְצֵדָה הִשְׂבִּיעַ לְנַפְשֵׁנוּ / חַסְדּוֹ גָּבַר עָלֵינוּ וֶאֱמֶת יְיָ', fr: 'Par le chant et l’action de grâce, bénissons notre Dieu pour le pays désirable et bon qu’Il a donné à nos pères ; de nourriture et de provisions Il a rassasié notre âme ; Sa bonté envers nous est immense, et la vérité de l’Éternel est éternelle.' },
      { he: 'רַחֵם בְּחַסְדֶּךָ עַל עַמְּךָ צוּרֵנוּ / עַל צִיּוֹן מִשְׁכַּן כְּבוֹדֶךָ זְבוּל בֵּית תִּפְאַרְתֵּנוּ / בֶּן דָּוִד עַבְדֶּךָ יָבֹא וְיִגְאָלֵנוּ / רוּחַ אַפֵּינוּ מְשִׁיחַ יְיָ', fr: 'Dans Ta bonté, aie pitié de Ton peuple, notre Rocher, de Sion, demeure de Ta gloire, Temple de notre splendeur ; que le fils de David, Ton serviteur, vienne nous délivrer, souffle de notre vie, l’oint de l’Éternel.' },
      { he: 'יִבָּנֶה הַמִּקְדָּשׁ עִיר צִיּוֹן תְּמַלֵּא / וְשָׁם נָשִׁיר שִׁיר חָדָשׁ וּבִרְנָנָה נַעֲלֶה / הָרַחֲמָן הַנִּקְדָּשׁ יִתְבָּרַךְ וְיִתְעַלֶּה / עַל כּוֹס יַיִן מָלֵא כְּבִרְכַּת יְיָ', fr: 'Que le Sanctuaire soit rebâti et la ville de Sion repeuplée ; là nous chanterons un chant nouveau et monterons dans l’allégresse ; que le Miséricordieux, le Sanctifié, soit béni et exalté, sur une coupe de vin pleine, selon la bénédiction de l’Éternel.' },
    ],
  },
  {
    id: 'deror-yikra', category: 'chabbat', title: 'Déror Yikra', hebrew: 'דְּרוֹר יִקְרָא',
    author: 'Dounach ben Labrat (Fès, Xᵉ s.) — version Edot HaMizra’h', audio: yt('deror yikra'),
    lines: [
      { he: 'דְּרוֹר יִקְרָא לְבֵן עִם בַּת / וְיִנְצׇרְכֶם כְּמוֹ בָבַת / נְעִים שִׁמְכֶם וְלֹא יֻשְׁבַּת / שְׁבוּ נוּחוּ בְּיוֹם שַׁבָּת', fr: 'Il proclamera la liberté pour le fils comme pour la fille, et vous gardera comme la prunelle de l’œil ; votre nom est doux et ne cessera pas : asseyez-vous, reposez-vous au jour du Chabbat.' },
      { he: 'דְּרֹשׁ נָוִי וְאוּלָמִי / וְאוֹת יֶשַׁע עֲשֵׂה עִמִּי / נְטַע שׂוֹרֵק בְּתוֹךְ כַּרְמִי / שְׁעֵה שַׁוְעַת בְּנֵי עַמִּי', fr: 'Recherche ma demeure et mon sanctuaire, accomplis pour moi un signe de salut ; plante un cep de choix au milieu de ma vigne, entends la plainte des enfants de mon peuple.' },
      { he: 'דְּרֹךְ פּוּרָה בְּתוֹךְ בׇּצְרָה / וְגַת בָּבֶל אֲשֶׁר גָּבְרָה / נְתֹץ צָרַי בְּאַף עֶבְרָה / שְׁמַע קוֹלִי בְּיוֹם אֶקְרָא', fr: 'Foule le pressoir au cœur de Botsra, et celui de Babylone qui a dominé ; brise mes oppresseurs dans Ta colère et Ta fureur ; écoute ma voix le jour où je T’appelle.' },
      { he: 'אֱלֹהִים תֵּן בַּמִּדְבָּר הַר / הֲדַס שִׁטָּה בְּרוֹשׁ תִּדְהָר / וְלַמַּזְהִיר וְלַנִּזְהָר / שְׁלוֹמִים תֵּן כְּמֵי נָהָר', fr: 'Ô Dieu, fais croître dans le désert, sur la montagne, le myrte, l’acacia, le cyprès et l’orme ; à qui avertit et à qui est averti, donne la paix comme les eaux d’un fleuve.' },
      { he: 'הֲדֹךְ קָמַי אֵל קַנָּא / בְּמוֹג לֵבָב וּבִמְגִנָּה / וְנַרְחִיב פֶּה וּנְמַלְּאֶנָּה / לְשׁוֹנֵנוּ לְךָ רִנָּה', fr: 'Terrasse mes adversaires, Dieu jaloux, par la défaillance des cœurs et l’angoisse ; alors nous ouvrirons grand la bouche et l’emplirons : notre langue Te chantera.' },
      { he: 'דְּעֵה חׇכְמָה לְנַפְשֶׁךָ / וְהִיא כֶתֶר לְרֹאשֶׁךָ / נְצֹר מִצְוַת אֱלֹהֶיךָ / שְׁמֹר שַׁבַּת קׇדְשֶׁךָ', fr: 'Connais la sagesse pour ton âme, elle sera une couronne sur ta tête ; observe le commandement de ton Dieu, garde ton saint Chabbat.' },
    ],
  },
  {
    id: 'ki-eshmera-shabbat', category: 'chabbat', title: 'Ki Echmera Chabbat', hebrew: 'כִּי אֶשְׁמְרָה שַׁבָּת',
    author: 'Rabbi Avraham Ibn Ezra (XIIᵉ s.)', audio: yt('ki eshmera shabbat'),
    lines: [
      { r: 1, he: 'כִּי אֶשְׁמְרָה שַׁבָּת אֵל יִשְׁמְרֵנִי / אוֹת הִיא לְעוֹלְמֵי עַד בֵּינוֹ וּבֵינִי', fr: 'Si je garde le Chabbat, Dieu me gardera : c’est un signe éternel entre Lui et moi. (refrain)' },
      { he: 'אָסוּר מְצֹא חֵפֶץ עֲשׂוֹת דְּרָכִים / גַּם מִלְּדַבֵּר בּוֹ דִּבְרֵי מְלָכִים / דִּבְרֵי סְחוֹרָה אוֹ דִּבְרֵי צְרָכִים / אֶהְגֶּה בְּתוֹרַת אֵל וּתְחַכְּמֵנִי', fr: 'Il est interdit d’y vaquer à ses affaires et de prendre la route, et même d’y parler d’affaires d’État, de commerce ou de besoins matériels : je méditerai la Torah de Dieu, et elle me rendra sage.' },
      { he: 'בּוֹ אֶמְצְאָה תָמִיד נֹפֶשׁ לְנַפְשִׁי / הִנֵּה לְדוֹר רִאשׁוֹן נָתַן קְדוֹשִׁי / מוֹפֵת בְּתֵת לֶחֶם מִשְׁנֶה בַּשִּׁשִּׁי / כָּכָה בְּכׇל שִׁשִּׁי יַכְפִּיל מְזוֹנִי', fr: 'J’y trouve toujours le repos de mon âme ; déjà à la première génération, mon Saint donna un prodige : une double ration de pain le sixième jour — ainsi, chaque sixième jour, Il double ma nourriture.' },
      { he: 'רָשַׁם בְּדַת הַיּוֹם חֹק אֶל סְגָנָיו / בּוֹ לַעֲרֹךְ לֶחֶם פָּנִים לְפָנָיו / עַל כֵּן לְהִתְעַנּוֹת עַל פִּי נְבוֹנָיו / אָסוּר לְבַד מִיּוֹם כִּפּוּר עֲוֹנִי', fr: 'Il a inscrit dans Sa loi, pour Ses prêtres, d’y disposer devant Lui les pains de proposition ; aussi, selon Ses sages, il est interdit d’y jeûner — sauf au jour où sont expiées mes fautes.' },
      { he: 'הוּא יוֹם מְכֻבָּד הוּא יוֹם תַּעֲנוּגִים / לֶחֶם וְיַיִן טוֹב בָּשָׂר וְדָגִים / מִתְאַבְּלִים בּוֹ הֵם אָחוֹר נְסוֹגִים / כִּי יוֹם שְׂמָחוֹת הוּא וִישַׂמְּחֵנִי', fr: 'C’est un jour honoré, un jour de délices : pain, bon vin, viande et poissons ; ceux qui y prennent le deuil reculent, car c’est un jour de joies, et il me réjouira.' },
      { he: 'מֵחֵל מְלָאכָה בוֹ סוֹפוֹ לְהַכְרִית / עַל כֵּן אֲכַבֵּס בּוֹ לִבִּי כְּבוֹרִית / אֶתְפַּלְלָה אֶל אֵל עַרְבִית וְשַׁחְרִית / מוּסַף וְגַם מִנְחָה הוּא יַעֲנֵנִי', fr: 'Qui le profane par le travail finira retranché ; aussi j’y purifie mon cœur comme à la lessive, et je prie Dieu le soir et le matin, au Moussaf et à Min’ha : Il me répondra.' },
    ],
  },
  {
    id: 'yom-ze-leyisrael', category: 'chabbat', title: 'Yom Zé LeYisraël', hebrew: 'יוֹם זֶה לְיִשְׂרָאֵל',
    author: 'Attribué au Ari (Rabbi Its’hak Louria, Safed)', audio: yt('yom ze leyisrael'),
    lines: [
      { r: 1, he: 'יוֹם זֶה לְיִשְׂרָאֵל אוֹרָה וְשִׂמְחָה / שַׁבַּת מְנוּחָה', fr: 'Ce jour est pour Israël lumière et joie, Chabbat de repos. (refrain)' },
      { he: 'צִוִּיתָ פִּקּוּדִים בְּמַעֲמַד הַר סִינַי / שַׁבָּת וּמוֹעֲדִים לִשְׁמֹר בְּכׇל שָׁנַי / לַעֲרֹךְ לְפָנַי מַשְׂאֵת וַאֲרוּחָה · שַׁבַּת מְנוּחָה', fr: 'Tu as prescrit Tes commandements au mont Sinaï : observer Chabbat et fêtes toutes mes années, et dresser devant moi mets et festins — Chabbat de repos.' },
      { he: 'חֶמְדַּת הַלְּבָבוֹת לְאֻמָּה שְׁבוּרָה / לִנְפָשׁוֹת נִכְאָבוֹת נְשָׁמָה יְתֵרָה / לְנֶפֶשׁ מְצֵרָה תָּסִיר אֲנָחָה · שַׁבַּת מְנוּחָה', fr: 'Délice des cœurs pour un peuple brisé, âme supplémentaire pour les âmes endolories ; à l’âme en détresse il ôte le soupir — Chabbat de repos.' },
      { he: 'קִדַּשְׁתָּ בֵּרַכְתָּ אוֹתוֹ מִכׇּל יָמִים / בְּשֵׁשֶׁת כִּלִּיתָ מְלֶאכֶת עוֹלָמִים / בּוֹ מָצְאוּ עֲגוּמִים הַשְׁקֵט וּבִטְחָה · שַׁבַּת מְנוּחָה', fr: 'Tu l’as sanctifié et béni entre tous les jours ; en six jours Tu as achevé l’œuvre des mondes ; en lui les affligés ont trouvé calme et confiance — Chabbat de repos.' },
      { he: 'לְאִסּוּר מְלָאכָה צִוִּיתָנוּ נוֹרָא / אֶזְכֶּה הוֹד מְלוּכָה אִם שַׁבָּת אֶשְׁמֹרָה / אַקְרִיב שַׁי לַמּוֹרָא מִנְחָה מֶרְקָחָה · שַׁבַּת מְנוּחָה', fr: 'Tu nous as ordonné, ô Redoutable, de cesser tout travail ; je mériterai la splendeur royale si je garde le Chabbat ; j’offrirai au Redouté un présent parfumé — Chabbat de repos.' },
      { he: 'וְשִׁיר אֶעֱרׇךְ לָךְ בְּנִגּוּן וּנְעִימָה / מוּל תִּפְאֶרֶת גׇּדְלָךְ נַפְשִׁי לְךָ כָּמְהָה / לִסְגֻלָּה תְמִימָה קַיֵּם הַבְטָחָה · שַׁבַּת מְנוּחָה', fr: 'Je T’offrirai un chant, mélodieux et doux ; devant la splendeur de Ta grandeur, mon âme languit de Toi ; accomplis Ta promesse envers Ton peuple intègre — Chabbat de repos.' },
      { he: 'רְצֵה תְפִלָּתִי כְּמוֹ קׇרְבַּן נַחְשׁוֹן / וְיוֹם מְנוּחָתִי בְּרִנָּה וּבְשָׂשׂוֹן / חָבִיב כְּבַת אִישׁוֹן בְּרֹב הַצְלָחָה · שַׁבַּת מְנוּחָה', fr: 'Agrée ma prière comme l’offrande de Na’hchon ; que mon jour de repos soit chant et allégresse, cher comme la prunelle de l’œil, dans une abondante réussite — Chabbat de repos.' },
      { he: 'יֶשְׁעֲךָ קִוִּינוּ יָהּ אַדִּיר אַדִּירִים / בֶּן דָּוִד מַלְכֵּנוּ שְׁלַח נָא לָעִבְרִים / וְיִקְרָא לִדְרוֹרִים רֶוַח וַהֲנָחָה · שַׁבַּת מְנוּחָה', fr: 'Nous espérons Ton salut, ô Dieu, Puissant des puissants ; envoie aux Hébreux le fils de David notre roi, qui proclamera la liberté, le soulagement et le répit — Chabbat de repos.' },
      { he: 'אָנָּא עֶלְיוֹן נוֹרָא הַבִּיטָה עׇנְיֵנוּ / פְּדֵנוּ בִּמְהֵרָה חׇנֵּנוּ חׇנֵּנוּ / שַׂמַּח נַפְשֵׁנוּ בְּאוֹר וְשִׂמְחָה · שַׁבַּת מְנוּחָה', fr: 'De grâce, Très-Haut redoutable, regarde notre misère ; rachète-nous bientôt, fais-nous grâce ; réjouis notre âme de lumière et de joie — Chabbat de repos.' },
      { he: 'חַדֵּשׁ מִקְדָּשֵׁנוּ זׇכְרָה נֶחֱרֶבֶת / טוּבְךָ מוֹשִׁיעֵנוּ תְּנָה לַנֶּעֱצֶבֶת / בְּשַׁבָּת יוֹשֶׁבֶת בְּזֶמֶר וּשְׁבָחָה · שַׁבַּת מְנוּחָה', fr: 'Renouvelle notre Sanctuaire, souviens-Toi de la cité détruite ; ô notre Sauveur, accorde Ta bonté à l’affligée qui, le Chabbat, demeure dans le chant et la louange — Chabbat de repos.' },
      { he: 'זְכֹר קָדוֹשׁ לָנוּ בִּזְכוּת יִקְרַת הַיּוֹם / שְׁמֹר נָא אוֹתָנוּ בְּיוֹם זֶה וּבְכׇל יוֹם / דּוֹדִי צַח וְאָיֹם תָּבִיא רְוָחָה · שַׁבַּת מְנוּחָה', fr: 'Souviens-Toi de nous, ô Saint, par le mérite de la grandeur de ce jour ; garde-nous en ce jour et chaque jour ; mon Bien-aimé, éclatant et redoutable, apporte le soulagement — Chabbat de repos.' },
      { he: 'קוֹל רִנָּה וִישׁוּעָה לְיִשְׂרָאֵל הַשְׁמִיעָה / בְּבֹא חֶזְיוֹן תְּשׁוּעָה צוּר מַצְמִיחַ יְשׁוּעָה / אוֹר שִׁמְשִׁי הוֹפִיעָה תָּמִיד הַזְרִיחָה · שַׁבַּת מְנוּחָה', fr: 'Fais entendre à Israël un chant de joie et de délivrance, quand viendra la vision du salut, ô Rocher qui fais germer la délivrance ; fais paraître la lumière de mon soleil, fais-la briller toujours — Chabbat de repos.' },
    ],
  },
  {
    id: 'menucha-vesimcha', category: 'chabbat', title: 'Ménou’ha VéSim’ha', hebrew: 'מְנוּחָה וְשִׂמְחָה',
    author: 'Signé « Moché » (auteur médiéval)', audio: yt('menucha vesimcha'),
    lines: [
      { he: 'מְנוּחָה וְשִׂמְחָה אוֹר לַיְּהוּדִים / יוֹם שַׁבָּתוֹן יוֹם מַחֲמַדִּים / שׁוֹמְרָיו וְזוֹכְרָיו הֵמָּה מְעִידִים / כִּי לְשִׁשָּׁה כֹּל בְּרוּאִים וְעוֹמְדִים', fr: 'Repos et joie, lumière pour les Juifs : le jour du Chabbat, jour de délices ; ceux qui le gardent et s’en souviennent témoignent qu’en six jours tout fut créé et subsiste.' },
      { he: 'שְׁמֵי שָׁמַיִם אֶרֶץ וְיַמִּים / כׇּל צְבָא מָרוֹם גְּבוֹהִים וְרָמִים / תַּנִּין וְאָדָם וְחַיַּת רְאֵמִים / כִּי בְּיָהּ יְיָ צוּר עוֹלָמִים', fr: 'Les cieux des cieux, la terre et les mers, toute l’armée d’en haut, élevée et sublime, le monstre marin, l’homme et le buffle sauvage : car l’Éternel Dieu est le Rocher des mondes.' },
      { he: 'הוּא אֲשֶׁר דִּבֶּר לְעַם סְגֻלָּתוֹ / שָׁמוֹר לְקַדְּשׁוֹ מִבֹּאוֹ וְעַד צֵאתוֹ / שַׁבַּת קֹדֶשׁ יוֹם חֶמְדָּתוֹ / כִּי בוֹ שָׁבַת אֵל מִכׇּל מְלַאכְתּוֹ', fr: 'C’est Lui qui a dit à Son peuple élu : garde-le pour le sanctifier, de son entrée à sa sortie ; saint Chabbat, jour de Ses délices, car en lui Dieu se reposa de toute Son œuvre.' },
      { he: 'בְּמִצְוַת שַׁבָּת אֵל יַחֲלִיצָךְ / קוּם קְרָא אֵלָיו יָחִישׁ לְאַמְּצָךְ / נִשְׁמַת כׇּל חַי וְגַם נַעֲרִיצָךְ / אֱכֹל בְּשִׂמְחָה כִּי כְבָר רָצָךְ', fr: 'Par le commandement du Chabbat, Dieu te fortifiera ; lève-toi, appelle-Le, Il se hâtera de t’affermir ; dis « Nichmat kol ’haï » et « Na’aritsakh », puis mange dans la joie, car Il t’a déjà agréé.' },
      { he: 'בְּמִשְׁנֶה לֶחֶם וְקִדּוּשׁ רַבָּה / בְּרֹב מַטְעַמִּים וְרוּחַ נְדִיבָה / יִזְכּוּ לְרַב טוּב הַמִּתְעַנְּגִים בָּהּ / בְּבִיאַת גּוֹאֵל לְחַיֵּי הָעוֹלָם הַבָּא', fr: 'Avec le double pain et le grand Kiddouch, l’abondance des mets et un esprit généreux, ceux qui s’y délectent mériteront un grand bien : la venue du Rédempteur et la vie du monde futur.' },
    ],
  },
  {
    id: 'yom-shabbaton', category: 'chabbat', title: 'Yom Chabbaton', hebrew: 'יוֹם שַׁבָּתוֹן',
    author: 'Rabbi Yehouda Halévi (XIIᵉ s.)', audio: yt('yom shabbaton ein lishkoach'),
    lines: [
      { he: 'יוֹם שַׁבָּתוֹן אֵין לִשְׁכֹּחַ / זִכְרוֹ כְּרֵיחַ הַנִּיחוֹחַ / יוֹנָה מָצְאָה בוֹ מָנוֹחַ / וְשָׁם יָנוּחוּ יְגִיעֵי כֹחַ', fr: 'Le jour du Chabbat ne s’oublie pas ; son souvenir est comme un parfum agréable ; la colombe y trouva le repos, et là se reposent ceux dont les forces sont épuisées. (les deux derniers vers servent de refrain)' },
      { he: 'הַיּוֹם נִכְבָּד לִבְנֵי אֱמוּנִים / זְהִירִים לְשׇׁמְרוֹ אָבוֹת וּבָנִים / חָקוּק בִּשְׁנֵי לֻחוֹת אֲבָנִים / מֵרֹב אוֹנִים וְאַמִּיץ כֹּחַ', fr: 'Ce jour est honoré par les fidèles ; pères et fils veillent à le garder ; il est gravé sur les deux tables de pierre, par la grandeur de Sa force et la puissance de Son pouvoir.' },
      { he: 'וּבָאוּ כֻלָּם בִּבְרִית יַחַד / נַעֲשֶׂה וְנִשְׁמַע אָמְרוּ כְּאֶחָד / וּפָתְחוּ וְעָנוּ יְיָ אֶחָד / בָּרוּךְ הַנֹּתֵן לַיָּעֵף כֹּחַ', fr: 'Tous entrèrent ensemble dans l’alliance ; « Nous ferons et nous entendrons », dirent-ils d’une seule voix ; ils répondirent : « L’Éternel est Un » — béni soit Celui qui donne la force à l’épuisé.' },
      { he: 'דִּבֶּר בְּקׇדְשׁוֹ בְּהַר הַמֹּר / יוֹם הַשְּׁבִיעִי זָכוֹר וְשָׁמוֹר / וְכׇל פִּקּוּדָיו יַחַד לִגְמֹר / חַזֵּק מׇתְנַיִם וְאַמֵּץ כֹּחַ', fr: 'Il parla dans Sa sainteté sur la montagne de la myrrhe : « Souviens-toi » et « Garde » le septième jour ; pour accomplir ensemble tous Ses préceptes, ceins tes reins et affermis ta force.' },
      { he: 'הָעָם אֲשֶׁר נָע כַּצֹּאן תָּעָה / יִזְכּוֹר לְפׇקְדוֹ בְּרִית וּשְׁבוּעָה / לְבַל יַעֲבׇר בָּם מִקְרֵה רָעָה / כַּאֲשֶׁר נִשְׁבַּעְתָּ עַל מֵי נֹחַ', fr: 'Le peuple errant comme un troupeau égaré — qu’Il se souvienne, pour le visiter, de l’alliance et du serment, afin qu’aucun malheur ne l’atteigne, comme Tu l’as juré au sujet des eaux de Noé.' },
    ],
  },
  {
    id: 'yom-ze-mechubad', category: 'chabbat', title: 'Yom Zé Mékhoubad', hebrew: 'יוֹם זֶה מְכֻבָּד',
    author: 'Signé « Israël Haguer »', audio: yt('yom ze mechubad'),
    lines: [
      { r: 1, he: 'יוֹם זֶה מְכֻבָּד מִכׇּל יָמִים / כִּי בוֹ שָׁבַת צוּר עוֹלָמִים', fr: 'Ce jour est honoré entre tous les jours, car en lui se reposa le Rocher des mondes. (refrain)' },
      { he: 'שֵׁשֶׁת יָמִים תַּעֲשֶׂה מְלַאכְתֶּךָ / וְיוֹם הַשְּׁבִיעִי לֵאלֹהֶיךָ / שַׁבָּת לֹא תַעֲשֶׂה בוֹ מְלָאכָה / כִּי כֹל עָשָׂה שֵׁשֶׁת יָמִים', fr: 'Six jours tu feras ton ouvrage, et le septième jour est pour ton Dieu ; le Chabbat tu n’y feras aucun travail, car en six jours Il a tout fait.' },
      { he: 'רִאשׁוֹן הוּא לְמִקְרָאֵי קֹדֶשׁ / יוֹם שַׁבָּתוֹן יוֹם שַׁבַּת קֹדֶשׁ / עַל כֵּן כׇּל אִישׁ בְּיֵינוֹ יְקַדֵּשׁ / עַל שְׁתֵּי לֶחֶם יִבְצְעוּ תְמִימִים', fr: 'Il est le premier des jours saints, jour de repos, saint Chabbat ; aussi chacun fait le Kiddouch sur son vin, et les hommes intègres rompent le pain sur deux miches.' },
      { he: 'אֱכֹל מַשְׁמַנִּים שְׁתֵה מַמְתַקִּים / כִּי אֵל יִתֵּן לְכֹל בּוֹ דְּבֵקִים / בֶּגֶד לִלְבֹּשׁ לֶחֶם חֻקִּים / בָּשָׂר וְדָגִים וְכׇל מַטְעַמִּים', fr: 'Mange des mets savoureux, bois des boissons douces, car Dieu donnera à tous ceux qui s’attachent à Lui un vêtement à porter, le pain nécessaire, viande, poissons et toutes sortes de délices.' },
      { he: 'לֹא תֶחְסַר כֹּל בּוֹ וְאָכַלְתָּ / וְשָׂבָעְתָּ וּבֵרַכְתָּ / אֶת יְיָ אֱלֹהֶיךָ אֲשֶׁר אָהַבְתָּ / כִּי בֵרַכְךָ מִכׇּל הָעַמִּים', fr: 'Tu ne manqueras de rien en ce jour : tu mangeras, tu seras rassasié et tu béniras l’Éternel ton Dieu que tu aimes, car Il t’a béni plus que tous les peuples.' },
      { he: 'הַשָּׁמַיִם מְסַפְּרִים כְּבוֹדוֹ / וְגַם הָאָרֶץ מָלְאָה חַסְדּוֹ / רְאוּ כִּי כׇל אֵלֶּה עָשְׂתָה יָדוֹ / כִּי הוּא הַצּוּר פׇּעֳלוֹ תָמִים', fr: 'Les cieux racontent Sa gloire, et la terre aussi est pleine de Sa bonté ; voyez : tout cela, Sa main l’a fait, car Il est le Rocher dont l’œuvre est parfaite.' },
    ],
  },

  // ===================== PIYOUTIM MAROCAINS (BAKACHOT) ======================
  {
    id: 'aoufa-eshkona', category: 'maroc', title: 'A’oufa Echkona', hebrew: 'אָעוּפָה אֶשְׁכֹּנָה',
    author: 'Bakacha (tradition des chants de requête)', audio: yt('aufa eshkona piyut'),
    lines: [
      { r: 1, he: 'אָעוּפָה אֶשְׁכֹּנָה וְאַרְחִיקָה נְדֹד / בַּמִּדְבָּר אָלִינָה וְאוּלַי אֶמְצָא דּוֹד', fr: 'Je m’envolerai, je me poserai, je m’éloignerai au loin ; dans le désert je passerai la nuit, et peut-être trouverai-je mon Bien-aimé. (refrain)' },
      { he: 'נֶשֶׁק אַהֲבָתוֹ בְּלִבִּי בֹּעֵרָה / מִיּוֹם פְּרֵדָתוֹ נַפְשִׁי עָלַי מָרָה', fr: 'Le feu de son amour brûle en mon cœur ; depuis le jour où il est parti, mon âme s’est aigrie en moi.' },
      { he: 'יְדִיד מֶנִּי בָּרַח הָלַךְ עֲזָבַנִי / אֵיזוֹ דֶּרֶךְ אָרַח וְאֵלְכָה גַּם אֲנִי', fr: 'L’ami s’est enfui loin de moi, il m’a quitté ; quel chemin a-t-il pris ? j’irai moi aussi.' },
      { he: 'יָצָאתִי לְבַקֵּשׁ דּוֹדִי בֵּין חֲבֵרִים / נִלְכַּדְתִּי בְּמוֹקֵשׁ הִכּוּנִי הַשֹּׁמְרִים', fr: 'Je suis sortie chercher mon Bien-aimé parmi les compagnons ; j’ai été prise au piège, les gardiens m’ont frappée.' },
      { he: 'צִפִּיתִי לְדוֹדִי מָתַי יָבוֹא אֵלַי / יַלְבִּישֵׁנִי עֶדְיִי וִירַחֵם עָלַי', fr: 'J’ai guetté mon Bien-aimé : quand viendra-t-il vers moi, me revêtira-t-il de ma parure et aura-t-il pitié de moi ?' },
      { he: 'חֲשֹׂף זְרוֹעֲךָ לְקַבֵּץ פְּזוּרִים / גַּלֵּה קֵץ יִשְׁעֲךָ וְדִגְלְךָ הָרֵם', fr: 'Dévoile Ton bras pour rassembler les dispersés ; révèle le terme de Ton salut et lève Ton étendard.' },
      { he: 'קוּמִי יְחִידָתִי וְשׁוּבִי בִּתְשׁוּבָה / אֲחוֹתִי רַעְיָתִי הִנֵּה גוֹאֲלֵךְ בָּא', fr: 'Lève-toi, mon unique, reviens par le repentir ; ma sœur, ma compagne, voici que ton Rédempteur vient.' },
      { he: 'חֲמוּדָה יְקָרָה רַבַּת הַמַּעֲלוֹת / גַּם מִפָּז נִבְחָרָה צְאִי נָא בִמְחוֹלוֹת', fr: 'Précieuse et chérie, riche de vertus, plus choisie que l’or fin : sors donc dans les danses.' },
      { he: 'זָכַרְתִּי לָךְ חֶסֶד נְעוּרַיִךְ נְעוּרִים / הֵיכָלֵךְ אֲיַסֵּד בְּאַבְנֵי סַפִּירִים', fr: 'Je me suis souvenu en ta faveur de la grâce de ta jeunesse ; je fonderai ton palais sur des pierres de saphir.' },
      { he: 'קוֹל דּוֹדִי הִנֵּה בָּא מְדַלֵּג עַל הֶהָרִים / קוּמִי לָךְ אֲהוּבָה כִּי בָא קֵץ דְּרוֹרִים', fr: 'La voix de mon Bien-aimé ! le voici qui vient, bondissant sur les montagnes ; lève-toi, bien-aimée, car le temps de la délivrance est venu.' },
    ],
  },
  {
    id: 'yafa-vetama', category: 'maroc', title: 'Yafa VéTama', hebrew: 'יָפָה וְתַמָּה',
    author: 'Rabbi Chelomo Abitbol (Marrakech, XIXᵉ s.)', audio: yt('yafa vetama piyut'),
    lines: [
      { r: 1, he: 'יָפָה וְתַמָּה תּוֹרָה תְּמִימָה הַנְּעִימָה / מִי יוּכַל לְהַעֲמִיק בְּסוֹדֵךְ סוֹד אֱלֹהִים חַיִּים', fr: 'Belle et parfaite, Torah intègre et délicieuse : qui pourrait sonder ton secret, le secret du Dieu vivant ? (refrain)' },
      { he: 'אוֹר זִיו זָהֳרֵךְ בּוֹעֵר תּוֹךְ קִרְבִּי / תָּמִיד יִדְרְשׁוּ אוֹתָךְ רַבִּים חֻקִּים וּמִצְוֹת טוֹבִים / אֶת כׇּל לִבּוֹת מַלְהִיבִים נֶאֱהָבִים וְגַם נִשְׂגָּבִים / וּכְפַטִּישׁ יְפוֹצֵץ סְלָעִים וְהָרִים / חֵן דַּדַּיִךְ יַרְווּ בְּכׇל עֵת תּוֹרַת אֱמֶת / מִפִּיךְ אָנוּ חַיִּים מִיֵּין סוֹד אֱלֹהִים חַיִּים', fr: 'L’éclat de ta splendeur brûle en moi ; sans cesse beaucoup te recherchent — bons préceptes et commandements qui enflamment tous les cœurs, aimés et sublimes, et, tel un marteau, brisent rochers et montagnes ; ta grâce nous abreuve en tout temps, Torah de vérité : de ta bouche nous vivons, du vin du secret du Dieu vivant.' },
      { he: 'נִתְעַלְּסָה בְגִיל בַּאֲהָבִים / בְּסוֹד נְקֻדּוֹת עִם הַתֵּבוֹת כְּתָרִים עִם אוֹתִיּוֹת / פְּתוּחוֹת עִם סְתוּמוֹת נֶעְלָמוֹת סוֹדָם בָּרָמוֹת / אוֹרוֹת עֶלְיוֹנִים טוֹב מִזָּהָב וּפְנִינִים / מַעְיַן גַּנִּים בְּשִׁבְעִים פָּנִים כֻּלָּם חוֹנִים / הֵן אֲנִי עֶבֶד נִרְצָע לָךְ קִנְיָן בְּלֵב שָׁלֵם', fr: 'Réjouissons-nous d’amour, dans le secret des voyelles et des mots, des couronnes et des lettres, des sections ouvertes et fermées dont le secret est caché dans les hauteurs : lumières suprêmes, plus précieuses que l’or et les perles, source des jardins aux soixante-dix faces ; me voici ton serviteur, attaché à toi pour toujours, de tout mon cœur.' },
      { he: 'יוֹרוּ מִשְׁפָּטַיִךְ הָאֵיתָנִים / תַּנָּאֵי וְאָמוֹרָאֵי גְּאוֹנֵי וּסְבוֹרָאֵי / וְרַבָּנָן בַּתְרָאֵי לְחַיֵּי מִדְּבַשׁ יָאֶה / גְּזֵרוֹת שָׁווֹת וַהֲלָכוֹת פְּסוּקוֹת / כֻּלָּם מִפִּי גְּבוּרָה זִקּוּקִין דְּנוּרָא / בְּקוֹלוֹת וּבְרָקִים מֵאֲרָקִים וְקוֹל מִשָּׁמַיִם', fr: 'Tes jugements solides, ils les enseignent — Tannaïm, Amoraïm, Guéonim, Savoraïm et maîtres des derniers temps — plus doux pour la vie que le miel : analogies et lois tranchées, toutes de la bouche de la Toute-Puissance, gerbes de feu, au milieu des voix, des éclairs et d’une voix venue des cieux.' },
      { he: 'שְׁמוֹת הַקֹּדֶשׁ בָּךְ נֶעֱלָמִים / אֲשֶׁר בָּם נִבְרְאוּ עוֹלָמִים בְּצֵרוּפִים נִפְלָאִים / וְהֵמָּה בַּכְּתוּבִים חֲתוּמִים וְגַם סְתוּמִים / מְאִירִים וּמַזְהִירִים בְּסוֹד יְשָׁרִים / כִּי חַיִּים הֵם לְמוֹצְאֵיהֶם וָחַי בָּהֶם / אֲשֶׁר יַעֲשֶׂה הָאָדָם וָחַי מִזִּיו צוּר עוֹלָמִים', fr: 'Les Noms saints sont cachés en toi, par lesquels les mondes furent créés en combinaisons merveilleuses ; dans les Écritures ils sont scellés et voilés, et ils resplendissent dans le cercle des justes ; car ils sont vie pour ceux qui les trouvent — « l’homme qui les accomplit vivra par eux » — de l’éclat du Rocher des mondes.' },
      { he: 'לְכוּ לַחֲמוּ תָמִיד בְּלַחְמִי / בְּיַ״ג מִדּוֹת תִּדְרֹשׁ הַתּוֹרָה קַל וָחֹמֶר כַּשּׁוּרָה / הֶקֵּשׁ וּגְזֵרָה שָׁוָה מְסוּרָה מִפִּי גְּבוּרָה / כְּלָלִים עִם פְּרָטִים תּוֹצִיא לְאוֹרָה / מִשָּׁם יוֹצְאִים אַרְבַּע נְהָרוֹת כֻּלָּם אוֹרוֹת / פְּשָׁטִים עִם רְמָזִים נִדְרָשִׁים וְסוֹדוֹת נֶעֱלָמִים', fr: '« Venez, mangez toujours de mon pain » : par les treize règles s’interprète la Torah — a fortiori, analogies et similitudes transmises par la Toute-Puissance, règles générales et particulières mises en lumière ; de là sortent quatre fleuves, tous lumière : sens simple, allusions, interprétations et secrets cachés.' },
      { he: 'מַה טוֹב דּוֹדַיִךְ אֲחוֹתִי כַלָּה / נֹפֶת צוּף דְּבַשׁ שְׂפָתַיִךְ גַּן נָעוּל דְּלָתַיִךְ / רֵיחַ טוֹב בְּגָדַיִךְ דּוֹדַיִךְ יְפִי עֵינַיִךְ / חַמָּה וּלְבָנָה כֻּלָּם עָמְדוּ מֵאוֹרֵךְ / כִּי אֹרֶךְ יָמִים בִּימִינֵךְ עֹשֶׁר בִּשְׂמֹאלֵךְ / בָּרוּךְ בּוֹרְאֵךְ בְּיׇפְיֵךְ וַהֲדָרֵךְ אֵל חַי הָעוֹלָמִים', fr: 'Que ton amour est bon, ma sœur, ma fiancée ! Tes lèvres distillent le miel, jardin clos sont tes portes ; bon est le parfum de tes vêtements, beaux sont tes yeux ; soleil et lune se sont arrêtés devant ta lumière, car longueur de jours est à ta droite, richesse à ta gauche — béni soit Celui qui t’a créée dans ta beauté et ta splendeur, Dieu vivant des mondes.' },
    ],
  },
  {
    id: 'ochil-yom-yom', category: 'maroc', title: 'O’hil Yom Yom', hebrew: 'אוֹחִיל יוֹם יוֹם',
    author: 'Rabbi David ben Aharon ’Hassin (Meknès, XVIIIᵉ s.) — le désir de Tibériade',
    audio: yt('ochil yom yom eshtae'),
    lines: [
      { he: 'אוֹחִיל יוֹם יוֹם אֶשְׁתָּאֶה / תָּמִיד עֵינִי צוֹפִיָּה / אֶעְבְּרָה נָא וְאֶרְאֶה / אַדְמַת קֹדֶשׁ טִבֶּרְיָה', fr: 'J’espère jour après jour, je languis, mon œil guette sans cesse : puissé-je passer et voir la terre sainte de Tibériade !' },
      { he: 'נָעֲמָה יְשִׁיבָתָהּ / גַּם טוֹבָה רְאִיָּתָהּ / יַם כִּנֶּרֶת חוֹמָתָהּ / שָׁם הָעִיר הַבְּנוּיָה', fr: 'Doux est d’y demeurer, belle est sa vue ; le lac de Kinnéret est son rempart : là s’élève la ville bâtie.' },
      { he: 'יְשָׁרִים בְּלִבּוֹתָם / נָחוּ עַל מִשְׁכְּבוֹתָם / בְּתוֹכָהּ קְבוּרָתָם / כֻּלָּם בְּנֵי עֲלִיָּה', fr: 'Les cœurs droits reposent sur leurs couches ; en elle est leur sépulture — tous des êtres d’élite.' },
      { he: 'דֶּרֶךְ הָהָר יִתְבּוֹנָן / קֶבֶר רַבָּן יוֹחָנָן / בֶּן זַכַּאי שָׁם יִתְלוֹנָן / יָחִיד בְּדוֹרוֹ הָיָה', fr: 'Sur le chemin de la montagne, on contemple le tombeau de Rabban Yo’hanan ben Zakkaï, qui y repose : il fut unique en sa génération.' },
      { he: 'וַחֲמִשָּׁה תַלְמִידִים / צַדִּיקִים וַחֲסִידִים / מִזָּהָב נֶחֱמָדִים / מוֹנֶה שְׁבָחָן הָיָה', fr: 'Et ses cinq disciples, justes et pieux, plus précieux que l’or : il énumérait leurs louanges.' },
      { he: 'דִּמָּה אֶחָד לְבוֹר סִיד / טִפָּה אַחַת לֹא יַפְסִיד / וְלַחֲבֵרוֹ קָרָא חָסִיד / וְחַד דְּחִיל חוֹבַיָּא', fr: 'L’un, il le compara à une citerne enduite qui ne perd pas une goutte ; son compagnon, il l’appela « pieux », et un autre « craignant le péché ».' },
      { he: 'בָּם חָכָם בְּעֹז גִּבֵּר / כַּמַּעְיָן הַמִּתְגַּבֵּר / אַשְׁרֵי יָלְדָה עַל מַשְׁבֵּר / אֶת בְּנוֹ שֶׁל חֲנַנְיָה', fr: 'Parmi eux, un sage fort et puissant, telle une source qui jaillit sans cesse ; heureuse celle qui mit au monde le fils de ’Hananya !' },
      { he: 'רֹאשׁ הָהָר שָׁם מַצֵּבָה / קֶבֶר רַבִּי עֲקִיבָא / עִמּוֹ עֶשְׂרִים וְאַרְבָּעָה / אֶלֶף תַּלְמִידַיָּא', fr: 'Au sommet de la montagne, une stèle : le tombeau de Rabbi Akiva, et avec lui vingt-quatre mille disciples.' },
      { he: 'אַשְׁרֵי הַשָּׂם רַעְיוֹנָיו / לִרְאוֹת שָׁם נֶגֶד פָּנָיו / רַבִּי חִיָּא וּבָנָיו / יְהוּדָה וְחִזְקִיָּה', fr: 'Heureux celui qui a à cœur de voir là, face à lui, Rabbi ’Hiya et ses fils, Yehouda et ’Hizkiya.' },
      { he: 'הַר גָּבוֹהַּ וְרָם עַל / הוּקַם עָלָיו מִמַּעַל / רַבִּי מֵאִיר הוּא בַּעַל / אָתַיָּא וְתִמְהַיָּא', fr: 'Sur une montagne haute et élevée repose, tout en haut, Rabbi Méïr, maître des signes et des prodiges (Baal HaNess).' },
      { he: 'רַבִּי יוֹחָנָן חָנָה / שָׁם יַחַד עִם רַב הוּנָא / וְעִמָּהֶם רַב כָּהֲנָא / וְגַם רַבִּי יִרְמִיָּה', fr: 'Rabbi Yo’hanan y repose, avec Rav Houna, et avec eux Rav Kahana et Rabbi Yirmiya.' },
      { he: 'נִקְבַּר בְּתוֹכָהּ טָמוּן / רַבִּי מֹשֶׁה בַּר מַיְמוֹן / הוּא מְפָרֵשׁ דַּת אָמוֹן / וְרַב עַל כׇּל חַכִּימַיָּא', fr: 'En son sein est enseveli Rabbi Moché ben Maïmon, qui expliqua la Loi de Dieu, maître de tous les sages.' },
      { he: 'בְּרַם זָכוּר לְטוֹבָה / הָרַב נִיהוּ רַבָּא / עֵץ חַיִּים שַׂר הַצָּבָא / מִמִּשְׁפַּחַת אַבּוּלְעַפְיָא', fr: 'Mais qu’on se souvienne pour le bien du grand Rav, arbre de vie, chef de l’armée, de la famille Aboulafia.' },
      { he: 'נֵזֶר קֹדֶשׁ עַל רֹאשׁוֹ / אֵלָיו גּוֹיִם יִדְרֹשׁוּ / מִפִּיו תּוֹרָה יְבַקְּשׁוּ / מִצַּפְרָא וְעַד פַּנְיָא', fr: 'Une couronne sainte sur sa tête ; les nations le consultent, de sa bouche on recherche la Torah, du matin jusqu’au soir.' },
      { he: 'חֲסִין יָהּ אֵין כָּמוֹהוּ / אִישׁ אֱלֹהִים קָדוֹשׁ הוּא / בְּהֶבֶל רוּחַ פִּיהוּ / רִשְׁפֵּי אֵשׁ שַׁלְהֶבֶתְיָה', fr: 'Puissant devant Dieu, nul n’est comme lui ; c’est un saint homme de Dieu ; au souffle de sa bouche jaillissent des étincelles de flamme divine.' },
      { he: 'חִדֵּשׁ הָעִיר שִׁכְלְלָהּ / חוֹמָתָהּ וְגַם חֵילָהּ / בֵּית מִדְרָשׁוֹ כִּלְכְּלָהּ / כׇּל יָמָיו אֲשֶׁר הָיָה', fr: 'Il a rénové la ville et l’a achevée, son rempart et sa fortification ; sa maison d’étude l’a soutenue tous les jours de sa vie.' },
      { he: 'זַרְעוֹ לְעוֹלָם יִחְיֶה / בְּקִנְיַן הַגּוּף יִהְיֶה / בִּרְכַּת הֶדְיוֹט אַל תִּהְיֶה / קַלָּה וְגַם בְּזוּיָה', fr: 'Que sa descendance vive à jamais et jouisse de ses biens ; que la bénédiction d’un homme simple ne soit pas tenue pour légère ni méprisable.' },
      { he: 'קוֹל זִמְרַת רְנָנַי / אִמְרֵי פִי וְהֶגְיוֹנַי / יִהְיוּ לִפְנֵי יְיָ / כְּמוֹ סֹלֶת נְקִיָּה', fr: 'Que le chant de mes louanges, les paroles de ma bouche et mes méditations soient devant l’Éternel comme une fine farine pure.' },
    ],
  },
  {
    id: 'shachar-avakeshcha', category: 'maroc', title: 'Cha’har Avakéchkha', hebrew: 'שַׁחַר אֲבַקֶּשְׁךָ',
    author: 'Rabbi Chelomo Ibn Gabirol (XIᵉ s.) — chanté dans les bakachot', audio: yt('shachar avakeshcha'),
    lines: [
      { he: 'שַׁחַר אֲבַקֶּשְׁךָ צוּרִי וּמִשְׂגַּבִּי / אֶעְרֹךְ לְפָנֶיךָ שַׁחְרִי וְגַם עַרְבִּי', fr: 'À l’aube je Te cherche, mon Rocher et ma forteresse ; je dispose devant Toi ma prière du matin et du soir.' },
      { he: 'לִפְנֵי גְדֻלָּתְךָ אֶעְמֹד וְאֶבָּהֵל / כִּי עֵינְךָ תִרְאֶה כׇּל מַחְשְׁבוֹת לִבִּי', fr: 'Devant Ta grandeur je me tiens et je tremble, car Ton regard voit toutes les pensées de mon cœur.' },
      { he: 'מַה זֶּה אֲשֶׁר יוּכַל הַלֵּב וְהַלָּשׁוֹן / לַעְשׂוֹת וּמַה כֹּחַ רוּחִי בְּתוֹךְ קִרְבִּי', fr: 'Que peuvent donc le cœur et la langue accomplir, et quelle est la force de l’esprit qui est en moi ?' },
      { he: 'הִנֵּה לְךָ תִּיטַב זִמְרַת אֱנוֹשׁ עַל כֵּן / אוֹדְךָ בְּעוֹד תִּהְיֶה נִשְׁמַת אֱלוֹהַּ בִּי', fr: 'Mais le chant de l’homme T’est agréable ; aussi je Te louerai tant que le souffle divin sera en moi.' },
    ],
  },
  {
    id: 'el-nora-alila', category: 'maroc', title: 'El Nora Alila', hebrew: 'אֵל נוֹרָא עֲלִילָה',
    author: 'Rabbi Moché Ibn Ezra (XIIᵉ s.) — chanté à la Néïla de Kippour', audio: yt('el nora alila'),
    lines: [
      { r: 1, he: 'אֵל נוֹרָא עֲלִילָה / הַמְצִיא לָנוּ מְחִילָה / בִּשְׁעַת הַנְּעִילָה', fr: 'Dieu redoutable dans Ses actions, accorde-nous le pardon à l’heure de la Néïla. (refrain)' },
      { he: 'מְתֵי מִסְפָּר קְרוּאִים / לְךָ עַיִן נוֹשְׂאִים / וּמְסַלְּדִים בְּחִילָה', fr: 'Peu nombreux sont les appelés ; vers Toi ils lèvent les yeux et tremblent d’effroi.' },
      { he: 'שׁוֹפְכִים לְךָ נַפְשָׁם / מְחֵה פִּשְׁעָם וְכַחְשָׁם / וְהַמְצִיאֵם מְחִילָה', fr: 'Ils épanchent devant Toi leur âme : efface leur faute et leur reniement, accorde-leur le pardon.' },
      { he: 'הֱיֵה לָהֶם לְסִתְרָה / וְחַלְּצֵם מִמְּאֵרָה / וְחׇתְמֵם לְהוֹד וּלְגִילָה', fr: 'Sois pour eux un abri, délivre-les de la malédiction, scelle-les pour la gloire et la joie.' },
      { he: 'חֹן אוֹתָם וְרַחֵם / וְכׇל לוֹחֵץ וְלוֹחֵם / עֲשֵׂה בָהֶם פְּלִילָה', fr: 'Fais-leur grâce et aie pitié d’eux ; et tout oppresseur, tout assaillant, juge-le.' },
      { he: 'זְכֹר צִדְקַת אֲבִיהֶם / וְחַדֵּשׁ אֶת יְמֵיהֶם / כְּקֶדֶם וּתְחִלָּה', fr: 'Souviens-Toi de la justice de leur père, renouvelle leurs jours comme autrefois, comme au commencement.' },
      { he: 'קְרָא נָא שְׁנַת רָצוֹן / וְהָשֵׁב שְׁאֵרִית הַצֹּאן / לְאׇהֳלִיבָה וְאׇהֳלָה', fr: 'Proclame une année de faveur, ramène le reste du troupeau vers Oholiva et Ohola.' },
      { he: 'מְחֵה כָעָב פְּשָׁעִים / וַעֲשֵׂה נָא חֶסֶד עִם / מְקֹרָאִים סְגֻלָּה', fr: 'Efface les fautes comme une nuée, et fais grâce au peuple élu que Tu as appelé.' },
      { he: 'תִּזְכּוּ לְשָׁנִים רַבּוֹת / הַבָּנִים וְהָאָבוֹת / בְּדִיצָה וּבְצׇהֳלָה', fr: 'Puissiez-vous mériter de longues années, fils et pères, dans la liesse et l’allégresse.' },
      { he: 'מִיכָאֵל שַׂר יִשְׂרָאֵל / אֵלִיָּהוּ וְגַבְרִיאֵל / בַּשְּׂרוּ נָא הַגְּאֻלָּה', fr: 'Mikhaël, prince d’Israël, Éliyahou et Gavriel, annoncez donc la délivrance !' },
    ],
  },

  // ========================= BABA SALÉ & HILLOULA ===========================
  {
    id: 'abir-yaacov', category: 'babasale', title: 'Achir Likhvod ’Havérim', hebrew: 'אָשִׁיר לִכְבוֹד חֲבֵרִים',
    author: 'Rabbi Yaakov Abihatsira, l’« Abir Yaakov », grand-père de Baba Salé — signé « Anokhi Yaakov Abi’hatsira »',
    audio: yt('ashir lichvod chaverim abir yaakov'),
    lines: [
      { r: 1, he: 'רִבִּי שִׁמְעוֹן בַּר יוֹחַאי', fr: '(refrain, chanté après chaque strophe) Ya-la-lal… Rabbi Chimon bar Yo’haï !' },
      { he: 'אָשִׁיר לִכְבוֹד חֲבֵרִים / וּבְרֹאשָׁם מַלְכָּם אָרִים / בַּר יוֹחַאי עוֹקֵר הָרִים / וְדוֹרֵשׁ טוֹב לְעַמּוֹ', fr: 'Je chanterai en l’honneur des Compagnons et, à leur tête, j’exalterai leur roi : Bar Yo’haï, qui déracine les montagnes et recherche le bien de son peuple.' },
      { he: 'נֶחְתָּם בְּכֶתֶר תּוֹרָה / כְּלוּלִים בּוֹ עֲשָׂרָה / רְאוּ נָא בַּעֲטָרָה / שֶׁעִטְּרָה לוֹ אִמּוֹ', fr: 'Il est scellé de la couronne de la Torah, en lui les dix sont réunies ; voyez la couronne dont sa mère l’a couronné.' },
      { he: 'כַּבִּיר בְּנוֹ אַחֲרָיו / רִבִּי אֶלְעָזָר אַשְׁרָיו / נִכְנַס בָּא בַּחֲדָרָיו / שֶׁל הַמֶּלֶךְ שְׁלֹמֹה', fr: 'Puissant est son fils après lui, Rabbi Élazar — heureux est-il ! — il est entré dans les chambres du roi Chelomo.' },
      { he: 'יַקִּיר עִם זְכוּת אָבוֹת / הִשִּׂיג מַעֲלוֹת רַבּוֹת / נִגְלוּ לוֹ לֵ״ב נְתִיבוֹת / בָּהֶם רַבִּים יֶחְכָּמוּ', fr: 'Précieux, avec le mérite des pères, il atteignit de nombreux degrés ; les trente-deux sentiers lui furent révélés, par lesquels beaucoup deviennent sages.' },
      { he: 'יְדִיד בְּעֹז הִתְאַזָּר / רַב רִבִּי אַבָּא חָזַר / הוּא וְרִבִּי אֶלְעָזָר / אֲחוּזִים בְּיָ״הּ שְׁמוֹ', fr: 'Ami ceint de force, le maître Rabbi Abba revint, lui et Rabbi Élazar, attachés à Dieu dont le Nom est Yah.' },
      { he: 'עָלָה לְעִיר גִּבּוֹרִים / בָּהּ חֲמִשִּׁים שְׁעָרִים / מִשָּׁם יוֹצְאִים נְהָרִים / וְיִתְהַלְּכוּ לָמוֹ', fr: 'Il monta à la cité des héros, aux cinquante portes ; de là sortent des fleuves qui coulent pour eux.' },
      { he: 'קַו חֶסֶד קָנָה / רִבִּי יְהוּדָה חָנָה / וְהָעוֹלָם בּוֹ בָּנָה / עוֹשֶׂה שָׁלוֹם בִּמְרוֹמָיו', fr: 'Il acquit la ligne de la Bonté, Rabbi Yehouda y demeura ; par elle a bâti le monde Celui qui fait la paix dans Ses hauteurs.' },
      { he: 'בָּזֶה הוּא רֹאשׁ קְדוּשָׁה / רַק לֹא בָא אֶל שְׁלוֹשָׁה / אַךְ נִכְבַּד מִן הַשִּׁשָּׁה / הָיְתָה מִשְׂרָה עַל שִׁכְמוֹ', fr: 'Ainsi il est à la tête de la sainteté ; il n’atteignit pas les trois premiers, mais fut plus honoré que les six : l’autorité reposait sur son épaule.' },
      { he: 'אִישׁ גִּבּוֹר בְּסוֹד תּוֹרָה / רִבִּי יִצְחָק הֶאָרָה / מִדָּתוֹ הִיא גְּבוּרָה / צַפִּיחִית בִּדְבַשׁ טַעְמוֹ', fr: 'Homme vaillant dans le secret de la Torah, Rabbi Its’hak a illuminé ; sa qualité est la Rigueur, et sa saveur est celle d’un gâteau au miel.' },
      { he: 'בְּפִיהוּ אֱמֶת נִכְתָּם / רִבִּי יוֹסֵי בַּר יַעֲקֹב תָּם / עֵץ הַחַיִּים בּוֹ נֶחְתַּם / הִיא תִּפְאֶרֶת עֻזָּמוֹ', fr: 'Dans sa bouche la vérité est gravée : Rabbi Yossé, fils de Yaakov l’intègre ; l’Arbre de vie est scellé en lui : c’est la Splendeur de leur force.' },
      { he: 'יָשָׁר רִבִּי חִזְקִיָּה / בְּנֶצַח נַפְשׁוֹ חִיָּה / גַּם הוֹד בּוֹ כָּלוּל נִהְיָה / הַמְשֵׁל וָפַחַד עִמּוֹ', fr: 'Droit est Rabbi ’Hizkiya, qui fit vivre son âme dans l’Éternité ; la Majesté aussi fut réunie en lui : « la domination et la crainte sont avec Lui ».' },
      { he: 'חָבֵרוֹ רִבִּי יֵיסָא / הוֹד וְהָדָר בּוֹ נִמְצָא / מִדָּה טוֹבָה בָּהּ יִשָּׂא / לְרֹאשׁ סֻכַּת שְׁלוֹמוֹ', fr: 'Son compagnon Rabbi Yeissa, en qui se trouvent majesté et splendeur, porte cette bonne qualité à la tête de la souccah de Sa paix.' },
      { he: 'צְבָאוֹת בָּהּ נִצְמָדִים / שְׁנֵיהֶם יַחַד דּוֹדִים / הֵם וָוֵי הָעַמּוּדִים / יָשָׁר יֶחֱזוּ פָּנֵימוֹ', fr: 'Les armées y sont attachées, tous deux unis en amitié ; ils sont les crochets des colonnes ; les justes contempleront Sa face.' },
      { he: 'יְסוֹד בְּרִבִּי חִיָּא / כָּאן נִמְצָא וְכָאן הָיָה / מִשָּׁם יוֹצְאָה תּוּשִׁיָּה / אִמְרוֹתָיו כִּי נָעֵמוּ', fr: 'Le Fondement, en Rabbi ’Hiya, se trouvait ici et là ; de là sort la sagesse, car ses paroles sont douces.' },
      { he: 'רִבִּי יוֹסֵף לוֹ זְכוּת / הוּא זָכָה אֶל הַמַּלְכוּת / כׇּל תֵּשַׁע הֵם מְלָכוֹת / שָׁם כָּבוֹד מִמְּקוֹמוֹ', fr: 'À Rabbi Yossef revient le mérite : il a mérité la Royauté ; les neuf sont toutes des royautés — là est la gloire, en Son lieu.' },
      { he: 'אַשְׁרֵהוּ לְבַר יוֹחַאי / שֶׁהוּא עַד בֹּא מְשִׁיחַי / קִיֵּם הוּא נֶפֶשׁ כׇּל חַי / הֵמָּה יֹאכְלוּ בְּלַחְמוֹ', fr: 'Heureux Bar Yo’haï, car jusqu’à la venue de mon Machia’h il fait subsister l’âme de tout vivant : tous se nourrissent de son pain.' },
      { he: 'חִזְּקוֹ עֵדָה כְּלוּלָה / הַרְבּוּ שִׂמְחָה וְגִילָה / בְּיוֹם זֶה יוֹם הִלּוּלָא / דּוֹדִים לְכוּ לַחֲמוּ', fr: 'Fortifiez-vous, assemblée accomplie ! Multipliez joie et allégresse en ce jour, jour de la hilloula : amis, venez manger !' },
    ],
  },
  {
    id: 'bar-yochai', category: 'babasale', title: 'Bar Yo’haï', hebrew: 'בַּר יוֹחַאי',
    author: 'Rabbi Chimon Lavi (Fès – Tripoli, XVIᵉ s.) — chanté à toutes les hilloulot', audio: yt('bar yochai nimshachta'),
    lines: [
      { r: 1, he: 'בַּר יוֹחַאי נִמְשַׁחְתָּ אַשְׁרֶיךָ / שֶׁמֶן שָׂשׂוֹן מֵחֲבֵרֶךָ', fr: 'Bar Yo’haï, tu as été oint — heureux es-tu ! — d’une huile d’allégresse, plus que tes compagnons. (refrain)' },
      { he: 'בַּר יוֹחַאי שֶׁמֶן מִשְׁחַת קֹדֶשׁ / נִמְשַׁחְתָּ מִמִּדַּת הַקֹּדֶשׁ / נָשָׂאתָ צִיץ נֵזֶר הַקֹּדֶשׁ / חָבוּשׁ עַל רֹאשְׁךָ פְּאֵרֶךָ', fr: 'Bar Yo’haï, d’une huile d’onction sainte tu as été oint, par la mesure de la sainteté ; tu as porté le diadème, couronne de sainteté, ta parure ceinte sur ta tête.' },
      { he: 'בַּר יוֹחַאי מוֹשַׁב טוֹב יָשַׁבְתָּ / יוֹם נַסְתָּ יוֹם אֲשֶׁר בָּרַחְתָּ / בִּמְעָרַת צוּרִים שֶׁעָמַדְתָּ / שָׁם קָנִיתָ הוֹדְךָ וַהֲדָרֶךָ', fr: 'Bar Yo’haï, tu as trouvé une bonne demeure le jour où tu as fui ; dans la grotte de rocs où tu t’es tenu, là tu as acquis ta gloire et ta splendeur.' },
      { he: 'בַּר יוֹחַאי עֲצֵי שִׁטִּים עוֹמְדִים / לִמּוּדֵי יְיָ הֵם לוֹמְדִים / אוֹר מֻפְלָא אוֹר הַיְקוֹד הֵם יוֹקְדִים / הֲלֹא הֵמָּה יוֹרוּךָ מוֹרֶיךָ', fr: 'Bar Yo’haï, tels des bois d’acacia dressés, les disciples de l’Éternel étudient ; une lumière merveilleuse, une lumière ardente, ils allument : ce sont eux, tes maîtres, qui t’enseigneront.' },
      { he: 'בַּר יוֹחַאי וְלִשְׂדֵה תַפּוּחִים / עָלִיתָ לִלְקוֹט בּוֹ מֶרְקָחִים / סוֹד תּוֹרָה כְּצִיצִים וּפְרָחִים / נַעֲשֶׂה אָדָם נֶאֱמַר בַּעֲבוּרֶךָ', fr: 'Bar Yo’haï, au champ des pommiers tu es monté cueillir des parfums : le secret de la Torah, comme boutons et fleurs ; « Faisons l’homme » fut dit pour toi.' },
      { he: 'בַּר יוֹחַאי נֶאֱזַרְתָּ בִּגְבוּרָה / וּבְמִלְחֶמֶת אֵשׁ דָּת הַשַּׁעְרָה / וְחֶרֶב הוֹצֵאתָ מִתַּעְרָהּ / שָׁלַפְתָּ נֶגֶד צוֹרְרֶיךָ', fr: 'Bar Yo’haï, tu t’es ceint de force, et dans la guerre de la Loi de feu, aux portes, tu as tiré l’épée de son fourreau et l’as brandie contre tes adversaires.' },
      { he: 'בַּר יוֹחַאי לִמְקוֹם אַבְנֵי שַׁיִשׁ / הִגַּעְתָּ לִפְנֵי אַרְיֵה לַיִשׁ / גַּם גֻּלַּת כּוֹתֶרֶת עַל עַיִשׁ / תָּשׁוּרִי וּמִי יְשׁוּרֶךָ', fr: 'Bar Yo’haï, au lieu des pierres de marbre tu es parvenu, devant le lion rugissant ; tu as contemplé la coupe du chapiteau au-dessus des étoiles — et qui saurait te contempler ?' },
      { he: 'בַּר יוֹחַאי בְּקֹדֶשׁ הַקֳּדָשִׁים / קַו יָרוֹק מְחַדֵּשׁ חֳדָשִׁים / שֶׁבַע שַׁבָּתוֹת סוֹד חֲמִשִּׁים / קָשַׁרְתָּ קִשְׁרֵי שִׁי״ן קְשָׁרֶיךָ', fr: 'Bar Yo’haï, au Saint des saints, la ligne verte renouvelle les mois ; sept semaines, secret des cinquante : tu as noué les liens du Chin, tes liens.' },
      { he: 'בַּר יוֹחַאי יוֹ״ד חׇכְמָה קְדוּמָה / הִשְׁקַפְתָּ לִכְבוֹדוֹ פְּנִימָה / לֵ״ב נְתִיבוֹת רֵאשִׁית תְּרוּמָה / אַתְּ כְּרוּב מִמְשַׁח זִיו אוֹרֶךָ', fr: 'Bar Yo’haï, le Yod de la Sagesse primordiale, tu as contemplé l’intérieur de Sa gloire ; les trente-deux sentiers, prémices de l’offrande : tu es un chérubin oint, éclat de ta lumière.' },
      { he: 'בַּר יוֹחַאי אוֹר מֻפְלָא רוּם מַעְלָה / יָרֵאתָ מִלְּהַבִּיט כִּי רַב לָהּ / תַּעֲלוּמָה וְאַיִן קוֹרָא לָהּ / נַמְתָּ עַיִן לֹא תְשׁוּרֶךָ', fr: 'Bar Yo’haï, lumière merveilleuse des hauteurs suprêmes : tu as craint de la regarder, tant elle est immense, mystère que l’on nomme « Néant » ; tu as dit : « Aucun œil ne te verra ».' },
      { he: 'בַּר יוֹחַאי אַשְׁרֵי יוֹלַדְתֶּךָ / אַשְׁרֵי הָעָם הֵם לוֹמְדֶיךָ / וְאַשְׁרֵי הָעוֹמְדִים עַל סוֹדֶךָ / לְבוּשֵׁי חֹשֶׁן תֻּמֶּיךָ וְאוּרֶיךָ', fr: 'Bar Yo’haï, heureuse celle qui t’a enfanté, heureux le peuple de ceux qui t’étudient, heureux ceux qui se tiennent sur ton secret, revêtus du pectoral, de tes Toumim et Ourim.' },
    ],
  },
  {
    id: 'baba-sale', category: 'babasale', title: 'Tsadik Katamar', hebrew: 'צַדִּיק כַּתָּמָר',
    author: 'Psaume 92, 13-16 — chanté aux hilloulot, dont celle de Baba Salé', audio: yt('tzadik katamar yifrach'),
    lines: [
      { he: 'צַדִּיק כַּתָּמָר יִפְרָח / כְּאֶרֶז בַּלְּבָנוֹן יִשְׂגֶּה', fr: 'Le juste fleurira comme le palmier, il grandira comme le cèdre du Liban.' },
      { he: 'שְׁתוּלִים בְּבֵית יְיָ / בְּחַצְרוֹת אֱלֹהֵינוּ יַפְרִיחוּ', fr: 'Plantés dans la maison de l’Éternel, ils fleuriront dans les parvis de notre Dieu.' },
      { he: 'עוֹד יְנוּבוּן בְּשֵׂיבָה / דְּשֵׁנִים וְרַעֲנַנִּים יִהְיוּ', fr: 'Ils porteront encore du fruit dans la vieillesse, pleins de sève et verdoyants,' },
      { he: 'לְהַגִּיד כִּי יָשָׁר יְיָ / צוּרִי וְלֹא עַוְלָתָה בּוֹ', fr: 'pour proclamer que l’Éternel est droit : Il est mon Rocher, et il n’y a pas d’injustice en Lui.' },
    ],
  },

  // ===================== CHANTS ASHKÉNAZES & LITURGIE =======================
  {
    id: 'adon-olam', category: 'ashkenaz', title: 'Adon Olam', hebrew: 'אֲדוֹן עוֹלָם',
    author: 'Auteur inconnu (médiéval) — avec les strophes ajoutées dans le rite séfarade', audio: yt('adon olam'),
    lines: [
      { he: 'אֲדוֹן עוֹלָם אֲשֶׁר מָלַךְ / בְּטֶרֶם כׇּל יְצִיר נִבְרָא / לְעֵת נַעֲשָׂה בְחֶפְצוֹ כֹּל / אֲזַי מֶלֶךְ שְׁמוֹ נִקְרָא', fr: 'Maître du monde, qui régna avant que toute créature fût formée ; quand tout fut fait selon Sa volonté, alors Son nom fut proclamé « Roi ».' },
      { he: 'וְאַחֲרֵי כִּכְלוֹת הַכֹּל / לְבַדּוֹ יִמְלֹךְ נוֹרָא / וְהוּא הָיָה וְהוּא הוֹוֶה / וְהוּא יִהְיֶה בְּתִפְאָרָה', fr: 'Et quand tout aura pris fin, Lui seul, redoutable, régnera ; Il était, Il est, et Il sera dans la splendeur.' },
      { he: 'וְהוּא אֶחָד וְאֵין שֵׁנִי / לְהַמְשִׁילוֹ וּלְהַחְבִּירָה / בְּלִי רֵאשִׁית בְּלִי תַכְלִית / וְלוֹ הָעוֹז וְהַמִּשְׂרָה', fr: 'Il est Un, et nul second ne peut Lui être comparé ni associé ; sans commencement ni fin, à Lui la force et la souveraineté.' },
      { he: 'בְּלִי עֶרֶךְ בְּלִי דִמְיוֹן / בְּלִי שִׁנּוּי וּתְמוּרָה / בְּלִי חִבּוּר בְּלִי פֵרוּד / גְּדוֹל כּוֹחַ וּגְבוּרָה', fr: '(séfarade) Sans égal ni ressemblance, sans changement ni substitution, sans union ni séparation, grand de force et de puissance.' },
      { he: 'וְהוּא אֵלִי וְחַי גּוֹאֲלִי / וְצוּר חֶבְלִי בְּעֵת צָרָה / וְהוּא נִסִּי וּמָנוֹס לִי / מְנַת כּוֹסִי בְּיוֹם אֶקְרָא', fr: 'Il est mon Dieu, mon Rédempteur vivant, le roc de mon sort au temps de la détresse ; Il est mon étendard et mon refuge, la part de ma coupe le jour où je L’appelle.' },
      { he: 'וְהוּא רוֹפֵא וְהוּא מַרְפֵּא / וְהוּא צוֹפֶה וְהוּא עֶזְרָה', fr: '(séfarade) Il est le médecin et le remède, Il veille et Il secourt.' },
      { he: 'בְּיָדוֹ אַפְקִיד רוּחִי / בְּעֵת אִישַׁן וְאָעִירָה / וְעִם רוּחִי גְּוִיָּתִי / יְיָ לִי וְלֹא אִירָא', fr: 'En Sa main je remets mon esprit, quand je m’endors et quand je m’éveille ; et avec mon esprit, mon corps : l’Éternel est avec moi, je ne crains rien.' },
      { he: 'בְּמִקְדָּשׁוֹ תָּגֵל נַפְשִׁי / מְשִׁיחֵנוּ יִשְׁלַח מְהֵרָה / וְאָז נָשִׁיר בְּבֵית קׇדְשִׁי / אָמֵן אָמֵן שֵׁם הַנּוֹרָא', fr: '(séfarade) En Son Sanctuaire mon âme exultera ; qu’Il envoie bientôt notre Machia’h, et alors nous chanterons dans ma sainte Maison : Amen, amen, au Nom redoutable.' },
    ],
  },
  {
    id: 'yigdal', category: 'ashkenaz', title: 'Yigdal', hebrew: 'יִגְדַּל',
    author: 'Daniel ben Juda (Rome, XIVᵉ s.) — les 13 principes de foi de Maïmonide', audio: yt('yigdal elohim chai'),
    lines: [
      { he: 'יִגְדַּל אֱלֹהִים חַי וְיִשְׁתַּבַּח / נִמְצָא וְאֵין עֵת אֶל מְצִיאוּתוֹ', fr: 'Que soit exalté et loué le Dieu vivant : Il existe, et Son existence n’est pas limitée par le temps.' },
      { he: 'אֶחָד וְאֵין יָחִיד כְּיִחוּדוֹ / נֶעְלָם וְגַם אֵין סוֹף לְאַחְדוּתוֹ', fr: 'Il est Un, et nulle unité n’est comme la Sienne ; Il est caché, et Son unité est sans fin.' },
      { he: 'אֵין לוֹ דְמוּת הַגּוּף וְאֵינוֹ גוּף / לֹא נַעֲרֹךְ אֵלָיו קְדֻשָּׁתוֹ', fr: 'Il n’a ni forme corporelle ni corps ; rien ne peut se comparer à Sa sainteté.' },
      { he: 'קַדְמוֹן לְכׇל דָּבָר אֲשֶׁר נִבְרָא / רִאשׁוֹן וְאֵין רֵאשִׁית לְרֵאשִׁיתוֹ', fr: 'Antérieur à toute chose créée, Il est le premier, et Son commencement n’a pas de commencement.' },
      { he: 'הִנּוֹ אֲדוֹן עוֹלָם לְכׇל נוֹצָר / יוֹרֶה גְדֻלָּתוֹ וּמַלְכוּתוֹ', fr: 'Le voici, Maître du monde : toute créature enseigne Sa grandeur et Sa royauté.' },
      { he: 'שֶׁפַע נְבוּאָתוֹ נְתָנוֹ אֶל / אַנְשֵׁי סְגֻלָּתוֹ וְתִפְאַרְתּוֹ', fr: 'Il a accordé l’abondance de Sa prophétie aux hommes de Son choix et de Sa gloire.' },
      { he: 'לֹא קָם בְּיִשְׂרָאֵל כְּמֹשֶׁה עוֹד / נָבִיא וּמַבִּיט אֶת תְּמוּנָתוֹ', fr: 'Il ne s’est plus levé en Israël de prophète comme Moché, qui contempla Son image.' },
      { he: 'תּוֹרַת אֱמֶת נָתַן לְעַמּוֹ אֵל / עַל יַד נְבִיאוֹ נֶאֱמַן בֵּיתוֹ', fr: 'Dieu a donné à Son peuple une Torah de vérité, par la main de Son prophète, le fidèle de Sa maison.' },
      { he: 'לֹא יַחֲלִיף הָאֵל וְלֹא יָמִיר / דָּתוֹ לְעוֹלָמִים לְזוּלָתוֹ', fr: 'Dieu ne changera ni ne remplacera Sa Loi, pour l’éternité, par aucune autre.' },
      { he: 'צוֹפֶה וְיוֹדֵעַ סְתָרֵינוּ / מַבִּיט לְסוֹף דָּבָר בְּקַדְמוּתוֹ', fr: 'Il observe et connaît nos secrets ; Il voit la fin d’une chose dès son commencement.' },
      { he: 'גּוֹמֵל לְאִישׁ חֶסֶד כְּמִפְעָלוֹ / נוֹתֵן לְרָשָׁע רָע כְּרִשְׁעָתוֹ', fr: 'Il rétribue l’homme avec bonté selon ses actes, et donne au méchant selon sa méchanceté.' },
      { he: 'יִשְׁלַח לְקֵץ יָמִין מְשִׁיחֵנוּ / לִפְדּוֹת מְחַכֵּי קֵץ יְשׁוּעָתוֹ', fr: 'À la fin des jours, Il enverra notre Machia’h pour racheter ceux qui attendent Son salut.' },
      { he: 'מֵתִים יְחַיֶּה אֵל בְּרֹב חַסְדּוֹ / בָּרוּךְ עֲדֵי עַד שֵׁם תְּהִלָּתוֹ', fr: 'Dieu ressuscitera les morts dans Sa grande bonté ; béni soit à jamais le Nom de Sa louange.' },
      { he: 'אֵלֶּה שְׁלֹשׁ עֶשְׂרֵה לְעִקָּרִים / הֵן הֵם יְסוֹד דָּת אֵל וְתוֹרָתוֹ', fr: '(séfarade) Voilà les treize principes : ils sont le fondement de la Loi de Dieu et de Sa Torah.' },
      { he: 'תּוֹרַת מֹשֶׁה אֱמֶת וּנְבוּאָתוֹ / בָּרוּךְ עֲדֵי עַד שֵׁם תְּהִלָּתוֹ', fr: '(séfarade) La Torah de Moché est vérité, ainsi que sa prophétie ; béni soit à jamais le Nom de Sa louange.' },
    ],
  },
  {
    id: 'maoz-tzur', category: 'ashkenaz', title: 'Maoz Tsour', hebrew: 'מָעוֹז צוּר',
    author: 'Signé « Mordekhaï » (XIIIᵉ s.) — chant de ’Hanouka', audio: yt('maoz tzur'),
    lines: [
      { he: 'מָעוֹז צוּר יְשׁוּעָתִי לְךָ נָאֶה לְשַׁבֵּחַ / תִּכּוֹן בֵּית תְּפִלָּתִי וְשָׁם תּוֹדָה נְזַבֵּחַ / לְעֵת תָּכִין מַטְבֵּחַ מִצָּר הַמְנַבֵּחַ / אָז אֶגְמוֹר בְּשִׁיר מִזְמוֹר חֲנֻכַּת הַמִּזְבֵּחַ', fr: 'Rocher puissant de mon salut, il est beau de Te louer ; que soit rétablie ma maison de prière, et là nous offrirons des sacrifices de reconnaissance ; quand Tu prépareras la défaite de l’ennemi qui aboie, alors j’achèverai par un psaume l’inauguration de l’autel.' },
      { he: 'רָעוֹת שָׂבְעָה נַפְשִׁי בְּיָגוֹן כֹּחִי כָּלָה / חַיַּי מֵרְרוּ בְקֹשִׁי בְּשִׁעְבּוּד מַלְכוּת עֶגְלָה / וּבְיָדוֹ הַגְּדוֹלָה הוֹצִיא אֶת הַסְּגֻלָּה / חֵיל פַּרְעֹה וְכׇל זַרְעוֹ יָרְדוּ כְּאֶבֶן בִּמְצוּלָה', fr: 'Mon âme était rassasiée de malheurs, ma force s’épuisait dans le chagrin ; ils ont rendu ma vie amère par la dure servitude de l’Égypte ; mais de Sa grande main Il fit sortir le peuple élu : l’armée de Pharaon et toute sa descendance sombrèrent comme une pierre dans l’abîme.' },
      { he: 'דְּבִיר קׇדְשׁוֹ הֱבִיאַנִי וְגַם שָׁם לֹא שָׁקַטְתִּי / וּבָא נוֹגֵשׂ וְהִגְלַנִי כִּי זָרִים עָבַדְתִּי / וְיֵין רַעַל מָסַכְתִּי כִּמְעַט שֶׁעָבַרְתִּי / קֵץ בָּבֶל זְרֻבָּבֶל לְקֵץ שִׁבְעִים נוֹשַׁעְתִּי', fr: 'Il m’amena à Son saint sanctuaire, mais là non plus je ne fus pas en paix : l’oppresseur vint et m’exila, car j’avais servi des dieux étrangers ; j’avais bu le vin du poison, j’ai failli disparaître ; à la fin de Babylone, avec Zeroubavel, au bout de soixante-dix ans, je fus sauvé.' },
      { he: 'כְּרוֹת קוֹמַת בְּרוֹשׁ בִּקֵּשׁ אֲגָגִי בֶּן הַמְּדָתָא / וְנִהְיָתָה לוֹ לְפַח וּלְמוֹקֵשׁ וְגַאֲוָתוֹ נִשְׁבָּתָה / רֹאשׁ יְמִינִי נִשֵּׂאתָ וְאוֹיֵב שְׁמוֹ מָחִיתָ / רֹב בָּנָיו וְקִנְיָנָיו עַל הָעֵץ תָּלִיתָ', fr: 'L’Agaguite, fils de Hamedata, voulut abattre le haut cyprès, mais ce fut pour lui un piège, et son orgueil prit fin ; Tu as élevé la tête du Benjaminite et effacé le nom de l’ennemi ; ses nombreux fils et ses biens, Tu les as pendus à la potence.' },
      { he: 'יְוָנִים נִקְבְּצוּ עָלַי אֲזַי בִּימֵי חַשְׁמַנִּים / וּפָרְצוּ חוֹמוֹת מִגְדָּלַי וְטִמְּאוּ כׇּל הַשְּׁמָנִים / וּמִנּוֹתַר קַנְקַנִּים נַעֲשָׂה נֵס לַשּׁוֹשַׁנִּים / בְּנֵי בִינָה יְמֵי שְׁמוֹנָה קָבְעוּ שִׁיר וּרְנָנִים', fr: 'Les Grecs se liguèrent contre moi, aux jours des ’Hachmonaïm ; ils percèrent les murailles de mes tours et souillèrent toutes les huiles ; mais d’une seule fiole restante, un miracle fut fait pour Israël ; les sages instituèrent huit jours de chants et d’allégresse.' },
      { he: 'חֲשׂוֹף זְרוֹעַ קׇדְשֶׁךָ וְקָרֵב קֵץ הַיְשׁוּעָה / נְקֹם נִקְמַת עֲבָדֶיךָ מֵאֻמָּה הָרְשָׁעָה / כִּי אָרְכָה הַשָּׁעָה וְאֵין קֵץ לִימֵי הָרָעָה / דְּחֵה אַדְמוֹן בְּצֵל צַלְמוֹן הָקֵם לָנוּ רוֹעִים שִׁבְעָה', fr: 'Dévoile le bras de Ta sainteté et rapproche la fin du salut ; venge le sang de Tes serviteurs sur la nation méchante, car l’heure se prolonge et les jours de malheur n’ont pas de fin ; repousse l’ennemi dans l’ombre, et suscite pour nous les sept bergers.' },
    ],
  },

  // =========================== HASSIDIQUE & FÊTES ===========================
  {
    id: 'am-yisrael-chai', category: 'hassidique', title: 'Am Israël ’Haï', hebrew: 'עַם יִשְׂרָאֵל חַי',
    author: 'Chant populaire (Rav Chlomo Carlebach, 1965)', audio: yt('am yisrael chai'),
    lines: [
      { he: 'עַם יִשְׂרָאֵל חַי / עוֹד אָבִינוּ חַי', fr: 'Le peuple d’Israël est vivant, notre Père vit encore !' },
    ],
  },
  {
    id: 'oseh-shalom', category: 'hassidique', title: 'Ossé Chalom', hebrew: 'עוֹשֶׂה שָׁלוֹם',
    author: 'Fin de la Amida et du Kaddich (mélodie de Nourit Hirsch)', audio: yt('oseh shalom bimromav'),
    lines: [
      { he: 'עוֹשֶׂה שָׁלוֹם בִּמְרוֹמָיו / הוּא יַעֲשֶׂה שָׁלוֹם עָלֵינוּ / וְעַל כׇּל יִשְׂרָאֵל / וְאִמְרוּ אָמֵן', fr: 'Que Celui qui fait la paix dans Ses hauteurs fasse la paix sur nous et sur tout Israël, et dites : Amen.' },
      { r: 1, he: 'יַעֲשֶׂה שָׁלוֹם יַעֲשֶׂה שָׁלוֹם / שָׁלוֹם עָלֵינוּ וְעַל כׇּל יִשְׂרָאֵל', fr: 'Qu’Il fasse la paix, qu’Il fasse la paix, la paix sur nous et sur tout Israël. (refrain)' },
    ],
  },
  {
    id: 'hine-ma-tov', category: 'hassidique', title: 'Hiné Ma Tov', hebrew: 'הִנֵּה מַה טּוֹב',
    author: 'Psaume 133, 1', audio: yt('hine ma tov'),
    lines: [
      { he: 'הִנֵּה מַה טּוֹב וּמַה נָּעִים / שֶׁבֶת אַחִים גַּם יָחַד', fr: 'Qu’il est bon et qu’il est doux pour des frères de demeurer ensemble !' },
    ],
  },
  {
    id: 'ani-maamin', category: 'hassidique', title: 'Ani Maamin', hebrew: 'אֲנִי מַאֲמִין',
    author: 'Douzième principe de foi de Maïmonide', audio: yt('ani maamin'),
    lines: [
      { he: 'אֲנִי מַאֲמִין בֶּאֱמוּנָה שְׁלֵמָה / בְּבִיאַת הַמָּשִׁיחַ', fr: 'Je crois d’une foi entière en la venue du Machia’h,' },
      { he: 'וְאַף עַל פִּי שֶׁיִּתְמַהְמֵהַּ / עִם כׇּל זֶה אֲחַכֶּה לּוֹ / בְּכׇל יוֹם שֶׁיָּבוֹא', fr: 'et même s’il tarde, malgré tout je l’attendrai chaque jour, qu’il vienne.' },
    ],
  },
  {
    id: 'siman-tov', category: 'hassidique', title: 'Siman Tov ouMazal Tov', hebrew: 'סִימָן טוֹב וּמַזָּל טוֹב',
    author: 'Chant de fête (mariage, bar-mitsva, naissance)', audio: yt('siman tov umazal tov'),
    lines: [
      { he: 'סִימָן טוֹב וּמַזָּל טוֹב / וּמַזָּל טוֹב וְסִימָן טוֹב / יְהֵא לָנוּ יְהֵא לָנוּ / יְהֵא לָנוּ וּלְכׇל יִשְׂרָאֵל', fr: 'Bon signe et bonne étoile ! Qu’il en soit ainsi pour nous et pour tout Israël !' },
    ],
  },
  {
    id: 'od-yishama', category: 'hassidique', title: 'Od Yichama', hebrew: 'עוֹד יִשָּׁמַע',
    author: 'Jérémie 33, 10-11 — chant de mariage', audio: yt('od yishama'),
    lines: [
      { he: 'עוֹד יִשָּׁמַע בְּעָרֵי יְהוּדָה וּבְחוּצוֹת יְרוּשָׁלַיִם / קוֹל שָׂשׂוֹן וְקוֹל שִׂמְחָה / קוֹל חָתָן וְקוֹל כַּלָּה', fr: 'On entendra encore, dans les villes de Juda et les rues de Jérusalem, la voix de l’allégresse et la voix de la joie, la voix du marié et la voix de la mariée.' },
    ],
  },

  // ================================= HABAD ==================================
  {
    id: 'niggun-habad', category: 'habad', title: 'Niggoun de la Dvéikout', hebrew: 'נִגּוּן דְּבֵקוּת',
    author: 'Mélodie sans paroles de la tradition Habad', audio: yt('chabad niggun deveikut'),
    lines: [
      { he: '♪ · · · ♪', fr: 'Niggoun : mélodie sans paroles, chantée pour élever l’âme et s’attacher à Dieu (dvéikout).' },
    ],
  },
  {
    id: 'ufaratsta', category: 'habad', title: 'Oufaratsta', hebrew: 'וּפָרַצְתָּ',
    author: 'Genèse 28, 14 — chant de Habad', audio: yt('ufaratzta chabad'),
    lines: [
      { he: 'וּפָרַצְתָּ יָמָּה וָקֵדְמָה / וְצָפֹנָה וָנֶגְבָּה', fr: 'Tu te répandras à l’ouest et à l’est, au nord et au sud.' },
    ],
  },
];

// Compositions de départ ---------------------------------------------------
const PRESETS = {
  classic: {
    label: 'Chabbat — séfarade',
    cover: { title: 'Birkonishi', subtitle: 'Repas de Chabbat' },
    blocks: ['shalom-aleichem', 'eshet-chayil', 'kiddoush-chabbat', 'yah-ribon', 'deror-yikra',
      'ki-eshmera-shabbat', 'yom-ze-leyisrael', 'tzur-mishelo', 'birkat-hamazon-sefarade'],
  },
  ashkenaz: {
    label: 'Chabbat — ashkénaze',
    cover: { title: 'Birkonishi', subtitle: 'Repas de Chabbat' },
    blocks: ['shalom-aleichem', 'eshet-chayil', 'kiddoush-ashkenaze', 'menucha-vesimcha', 'yah-ribon',
      'yom-shabbaton', 'tzur-mishelo', 'birkat-hamazon-ashkenaze'],
  },
  maroc: {
    label: 'Livret marocain',
    cover: { title: 'Birkonishi', subtitle: 'Piyoutim de la tradition marocaine' },
    blocks: ['kiddoush-chabbat', 'deror-yikra', 'yafa-vetama', 'aoufa-eshkona', 'ochil-yom-yom',
      'bar-yochai', 'birkat-hamazon-sefarade'],
  },
  simha: {
    label: 'Simha (mariage, bar-mitsva)',
    cover: { title: 'Mazal Tov !', subtitle: 'Noms des mariés · date' },
    blocks: ['siman-tov', 'od-yishama', 'hine-ma-tov', 'bar-yochai', 'am-yisrael-chai', 'birkat-hamazon-sefarade'],
  },
  blank: {
    label: 'Livret vierge',
    cover: { title: 'Mon Birkon', subtitle: 'À personnaliser' },
    blocks: [],
  },
};

// Modèles graphiques — polices hébraïques complètes avec niqqoud -------------
const TEMPLATES = {
  royal:   { label: 'Royal',     font: "'Frank Ruhl Libre', 'Noto Serif Hebrew', serif", accent: '#7b1e3b', paper: '#fbf7ef' },
  desert:  { label: 'Désert',    font: "'David Libre', 'Frank Ruhl Libre', serif",       accent: '#9a5a1c', paper: '#fdf6ec' },
  ocean:   { label: 'Océan',     font: "'Noto Serif Hebrew', 'Frank Ruhl Libre', serif", accent: '#1e5a7b', paper: '#f3f8fb' },
  classic: { label: 'Classique', font: "'Noto Serif Hebrew', 'Frank Ruhl Libre', serif", accent: '#2c2c2c', paper: '#ffffff' },
};
