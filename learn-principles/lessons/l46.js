/* Lesson 46: Convention over configuration (module 5). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l46  Convention over configuration
     ===================================================================== */
  const divider = (x, y1, y2) => `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>`;

  /* ---- The idea: a ledger of every house, or one rule for the street ---- */
  const house = (x, n, fill) =>
    `<path d="M${x - 6} 132 L${x + 35} 100 L${x + 76} 132 Z" fill="${P.ink}"/>` +
    `<rect x="${x}" y="130" width="70" height="56" fill="${fill}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<rect x="${x + 27}" y="158" width="16" height="28" fill="${P.white}" stroke="${P.ink}" stroke-width="2"/>` +
    T(x + 35, 152, n, { s: 15, f: fill === P.tint ? P.accent : P.ink });
  const ideaPic = svg(600, 290, 'On the left, a ledger with one written line for where each house is. On the right, a street where the houses are numbered 12, 14, 16 in order, so nobody needs the ledger.',
    T(150, 30, 'EVERY HOUSE WRITTEN DOWN', { s: 12.5, f: P.danger }) + T(450, 30, 'ONE AGREED RULE', { s: 12.5, f: P.ok }) +
    divider(300, 18, 272) +
    box(40, 52, 220, 160, P.white, 14) + T(150, 80, 'Where is each house?', { s: 13.5 }) +
    ['no. 12: 6th on the left', 'no. 14: 7th on the left', 'no. 16: 8th on the left'].map((s, i) => T(58, 108 + i * 26, s, { s: 12.5, w: 700, f: P.ink2, a: 'start' })).join('') +
    T(58, 190, '... and one line for every house', { s: 12, w: 700, f: P.danger, a: 'start' }) +
    T(150, 240, 'somebody has to write every line', { s: 13, w: 700, f: P.ink2 }) + T(150, 258, 'and keep every line right', { s: 13, w: 700, f: P.ink2 }) +
    house(338, '12', P.white) + house(418, '14', P.tint) + house(498, '16', P.white) +
    `<line x1="322" y1="188" x2="584" y2="188" stroke="${P.ink}" stroke-width="3" stroke-linecap="round"/>` +
    T(453, 76, 'numbers go up along the street', { s: 13 }) +
    T(453, 240, '14 is between 12 and 16', { s: 13, w: 700, f: P.ink2 }) + T(453, 258, 'nobody had to write that down', { s: 13, w: 700, f: P.ink2 }));

  /* ---- The code: 36 lines of settings ---- */
  const settingsCode = [
    'PAGE = {',
    '    "choc_chip": "/shop/choc_chip",',
    '    "oat_raisin": "/shop/oat_raisin",',
    '    # ... 9 more lines just like these ...',
    '    "wedding_cake": "/weddings"',
    '}',
    'PHOTO = {',
    '    "choc_chip": "photos/choc_chip.jpg",',
    '    # ... 11 more lines just like this one ...',
    '}',
    'LABEL = {',
    '    "choc_chip": "labels/standard.txt",',
    '    # ... 10 more just like it, and one for gift_box ...',
    '}'
  ];
  const wallPic = (() => {
    let s = T(300, 24, '12 products × 3 settings = 36 lines', { s: 13.5 });
    ['page', 'photo', 'label'].forEach((r, j) => { s += T(62, 62 + j * 34, r, { s: 12.5, f: P.ink2, a: 'end' }); });
    for (let j = 0; j < 3; j++) for (let i = 0; i < 12; i++) {
      const odd = (j === 0 && i === 10) || (j === 2 && i === 11);
      s += `<rect x="${76 + i * 42}" y="${46 + j * 34}" width="32" height="22" rx="6" fill="${odd ? '#FFC24B' : P.sand}" stroke="${P.ink}" stroke-width="2"/>`;
    }
    s += T(300, 164, '34 lines follow the same pattern. 2 are really different.', { s: 12.5, w: 700, f: P.ink2 });
    return svg(600, 178, 'A grid of 36 small tiles, 12 products across and 3 settings down. 34 are the same plain colour. Two are marked: the wedding cake page and the gift box label.', s);
  })();
  const codePic = `<div style="width:100%">${code(settingsCode, { title: 'settings.py (36 lines of settings, shortened here)', hi: [5] })}${wallPic}</div>`;

  /* ---- The pain: the 13th product ---- */
  const addCode = [
    'PAGE = {',
    '    # ... the 12 lines from before ...',
    '    "ginger_snap": "/shop/ginger_snap"',
    '}',
    'PHOTO = {',
    '    # ... the 12 lines from before ...',
    '    "ginger_snap": "photos/ginger_snaps.jpg"',
    '}',
    'LABEL = {',
    '    # ... the 12 lines from before ...',
    '}'
  ];
  const brokenPic = svg(600, 210, 'The ginger snap web page shows a broken picture because the photo line has one extra letter. The label printer stops with a KeyError because the label line was never added.',
    T(150, 26, 'THE WEBSITE', { s: 12.5, f: P.ink2 }) + T(450, 26, 'THE LABEL PRINTER', { s: 12.5, f: P.ink2 }) +
    box(40, 40, 220, 120, P.white, 14) + T(150, 66, 'Ginger snap', { s: 14 }) +
    `<rect x="100" y="78" width="100" height="66" rx="8" fill="${P.dangerT}" stroke="${P.danger}" stroke-width="2.5" stroke-dasharray="6 5"/>` +
    `<path d="M136 97 L164 125 M164 97 L136 125" stroke="${P.danger}" stroke-width="4" stroke-linecap="round"/>` +
    T(150, 184, 'asks for ginger_snaps.jpg', { s: 12, m: true, f: P.danger }) + T(150, 202, 'the file is ginger_snap.jpg', { s: 12, m: true }) +
    divider(300, 14, 200) +
    box(340, 40, 220, 120, '#15132B', 14) + T(450, 78, 'LABEL["ginger_snap"]', { s: 12.5, m: true, f: '#ECEAFF' }) +
    T(450, 112, "KeyError: 'ginger_snap'", { s: 12.5, m: true, f: '#FF9DB3' }) + T(450, 140, 'the program stops', { s: 12.5, f: '#ECEAFF' }) +
    T(450, 184, 'the third line was never added', { s: 12.5, w: 700, f: P.danger }) + T(450, 202, 'found on Saturday, at the first box', { s: 12.5, w: 700, f: P.ink2 }));
  const painPic = `<div style="width:100%">${code(addCode, { title: 'settings.py, after Sam adds ginger snaps', good: [3], bad: [7, 10] })}${brokenPic}</div>`;

  /* ---- The fix: the house rule, written once ---- */
  const fixedCode = [
    'SPECIAL_PAGE = {"wedding_cake": "/weddings"}',
    'SPECIAL_LABEL = {"gift_box": "labels/gift.txt"}',
    '',
    'def page_for(name):',
    '    if name in SPECIAL_PAGE:',
    '        return SPECIAL_PAGE[name]',
    '    return "/shop/" + name',
    '',
    'def photo_for(name):',
    '    return "photos/" + name + ".jpg"',
    '',
    'def label_for(name):',
    '    if name in SPECIAL_LABEL:',
    '        return SPECIAL_LABEL[name]',
    '    return "labels/standard.txt"'
  ];
  const rulePic = svg(600, 196, 'The house rule on a sign: a product named X has its page at /shop/X, its photo at photos/X.jpg and the standard label. Below it, the name ginger_snap goes in and all three answers come out.',
    box(20, 14, 560, 66, P.warnT, 14) + T(300, 40, 'HOUSE RULE: a product named X has its page at /shop/X,', { s: 12.5 }) + T(300, 62, 'its photo at photos/X.jpg, and the standard label.', { s: 12.5 }) +
    box(20, 112, 150, 50, P.tint, 12) + T(95, 142, 'ginger_snap', { s: 13, m: true, f: P.accent }) +
    arrow(178, 137, 232, 110, P.ok, 3) + arrow(178, 137, 232, 137, P.ok, 3) + arrow(178, 137, 232, 164, P.ok, 3) +
    T(244, 108, '/shop/ginger_snap', { s: 12.5, m: true, a: 'start' }) + T(244, 142, 'photos/ginger_snap.jpg', { s: 12.5, m: true, a: 'start' }) + T(244, 176, 'labels/standard.txt', { s: 12.5, m: true, a: 'start' }) +
    T(510, 136, 'settings lines', { s: 12.5, w: 700, f: P.ink2 }) + T(510, 156, 'to add: 0', { s: 14, f: P.ok }));
  const fixPic = `<div style="width:100%">${code(fixedCode, { title: 'catalog.py, the whole file', good: [1, 2, 7, 10, 15] })}${rulePic}</div>`;

  /* ---- The test: guessable, or special? ---- */
  const col = (x, items, fill, colr) => items.map((s, i) => box(x, 50 + i * 44, 264, 34, fill, 10) + T(x + 132, 72 + i * 44, s, { s: 12, f: colr })).join('');
  const testPic = svg(600, 318, 'Left: things a newcomer could guess from the rule, which the rule should handle. Right: things nobody could guess, which must be written down in plain sight. Below: four checks for a safe convention.',
    T(152, 30, 'A NEWCOMER COULD GUESS IT', { s: 12, f: P.ok }) + T(448, 30, 'NOBODY COULD GUESS IT', { s: 12, f: P.accent }) +
    col(20, ['the muffin photo is photos/muffin.jpg', 'the brownie page is /shop/brownie', 'a cupcake gets the standard label'], P.okT, P.ok) +
    col(316, ['the wedding cake page is /weddings', 'the gift box has its own label', 'which day a sale price is for'], P.tint, P.accent) +
    T(152, 196, 'leave it to the rule', { s: 13, w: 700, f: P.ink2 }) + T(448, 196, 'write it down, in plain sight', { s: 13, w: 700, f: P.ink2 }) +
    T(300, 232, 'A CONVENTION IS SAFE WHEN IT IS', { s: 12, f: P.ink2 }) +
    ['written down', 'the same everywhere', 'unsurprising', 'easy to override'].map((s, i) => box(20 + i * 142, 246, 134, 44, P.white, 10) + T(87 + i * 142, 273, s, { s: 11.5 })).join(''));

  /* ---- When not to: a rule only Sam knows ---- */
  const magicCode = [
    'def price_for(name, price):',
    '    if name.endswith("_sale"):',
    '        return price - price * 0.10',
    '    return price',
    '',
    'price_for("bake_sale", 20)      # gives 18.0. Nobody chose that.'
  ];
  const plainCode = [
    'ON_SALE = ["lemon_bar"]',
    '',
    'def price_for(name, price):',
    '    if name in ON_SALE:',
    '        return price - price * 0.10',
    '    return price'
  ];
  const whenPic = `<div style="width:100%">${code(magicCode, { title: "prices.py, a rule only Sam knows", bad: [2, 6] })}${code(plainCode, { title: 'prices.py, said in plain sight', good: [1, 4] })}</div>`;

  COURSE.add({
    id: 'l46', minutes: 9,
    summary: 'A <b>convention</b> is a usual way that everyone has agreed on. A setting is a choice somebody has to write down. Convention over configuration means: agree on the usual way once, and write settings only for the few places where you are different.',
    video: {
      src: 'videos/l46-convention-over-configuration.mp4', poster: 'videos/l46-convention-over-configuration.jpg', length: '1 min 5 s',
      script: [
        "Maya's shop now sells 12 things. Each one needs a page, a photo, and a label.",
        'So her settings file spells out every one. 12 products, 3 settings each. 36 lines.',
        "Look closely. Almost every line just repeats the product's name. Only 2 are really different.",
        'Then Sam adds ginger snaps. 3 more lines. He gets one right, mistypes one, and forgets the third. Now the new page shows a broken picture.',
        "The fix is one house rule, written once. A product's page, photo and label all follow from its name.",
        '34 lines disappear. The settings file keeps only the 2 real exceptions, in plain sight.',
        'Now ginger snaps need just a name. The page, the photo and the label fall into place.',
        'Agree on the usual way. Write it down. Spell out only what is different. That is convention over configuration.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Nobody keeps a list of where number 14 is.',
        text: [
          'You are looking for house number 14. You do not need a book that says where every house is. Numbers go up along the street, so 14 is between 12 and 16. One agreed rule replaces a line for every house.',
          'A <b>convention</b> is a usual way of doing something that everyone has agreed on. <b>Configuration</b> means settings: choices that somebody has to write down, one by one.',
          '<b>Convention over configuration</b> means: agree on the usual way once, and then write a setting <b>only where you are different</b> from it. The phrase was made popular in the mid-2000s by David Heinemeier Hansson, who built Ruby on Rails, a toolkit for making websites. Rails decides the boring things for you, such as where each file goes and what it is called. Follow its habits and things just work. You configure only the exceptions.',
          'Why does it help? Every setting is a decision somebody has to make, a line somebody has to read, and a place where two things can disagree. A hundred settings that everybody sets the same way are pure cost.'
        ],
        tip: 'You already live with conventions. On most websites, the first page of a folder is the file called <code>index.html</code>. Python\'s test tools look for files whose names start with <code>test_</code>. And the file a newcomer opens first in a project is called <code>README</code>. Nobody writes a setting for any of these. Once you know the habit, you can find your way around a project you have never seen.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'Three settings for every product.',
        text: [
          'Maya now sells 12 products. Each one needs three things: a <b>page</b> on the website, a <b>photo</b>, and a <b>label</b> for the box. Her file <code>settings.py</code> spells out all of them.',
          'In lesson 37 you met the dictionary, the lookup table. There it started empty. Here the entries are written straight in: a key, a colon, and a value, one entry per line. So <code>PHOTO["choc_chip"]</code> gives <code>"photos/choc_chip.jpg"</code>.',
          'There are three tables with 12 lines each. That is <b>36 lines of settings</b>. The picture shows a few of them. The lines starting with <code>#</code> stand for the rest.',
          'Now read the lines that are shown. Each one repeats the product\'s name on both sides. Every photo is <code>photos/</code>, the name, then <code>.jpg</code>. You could have guessed all of them.',
          'Only <b>2 of the 36</b> say something you could not guess. The wedding cake has a special page, on line 5. And the gift box has its own label. Both are buried among 34 lines that say nothing new.'
        ]
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Product number 13.',
        text: [
          'Maya starts baking ginger snaps. Sam has to add the new product to <code>settings.py</code>. That means <b>one new line in each of three tables</b>. Lesson 1 asked: "If one thing changes, how many places do I have to touch?" Here the answer is three.',
          'Sam adds the page. He adds the photo, but types <code>ginger_snaps.jpg</code>. The file is called <code>ginger_snap.jpg</code>. And he forgets the label table.',
          'The extra letter is quiet. Nothing crashes. The new page just shows a <b>broken picture</b> until a customer says so.',
          'The missing line is loud, but late. On Saturday the first box of ginger snaps is packed. The label job asks for <code>LABEL["ginger_snap"]</code> and Python stops with <code>KeyError: \'ginger_snap\'</code>. A <code>KeyError</code> is Python\'s way of saying: that key is not in the table.'
        ],
        warn: 'Sam is not careless. The file wanted the same name six times, in three far-apart places, and every line was a chance to slip. The file asked him to write down things that nobody needed to be told.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'One house rule, written once.',
        text: [
          'Maya writes the pattern down as a rule: <b>a product named X has its page at /shop/X, its photo at photos/X.jpg, and the standard label.</b> Then she turns the rule into three small jobs.',
          'Read <code>photo_for</code>. The <code>+</code> joins pieces of text. So <code>photo_for("muffin")</code> gives <code>"photos/muffin.jpg"</code>. No table is needed. The answer follows from the name.',
          'The two real exceptions stay, on lines 1 and 2. They are tiny dictionaries with one entry each. <code>page_for</code> first asks: is this name in <code>SPECIAL_PAGE</code>? If yes, it hands back the special page. If no, it follows the rule. <code>label_for</code> works the same way.',
          '36 lines of settings have become <b>2</b>. And those 2 are the only things in the shop that a newcomer could not have guessed. They are no longer buried. They are the first thing you read.',
          'Now add ginger snaps. Sam puts the name on the menu and drops <code>ginger_snap.jpg</code> into the photos folder. He adds <b>no settings at all</b>. <code>page_for("ginger_snap")</code> gives <code>"/shop/ginger_snap"</code>, and the label is the standard one.'
        ],
        tip: 'An honest note. The photo file still has to be named correctly. But now there is <b>one rule</b> to check it against, not 36 lines. A rule like this is easy for a program to check too: for every product on the menu, is there a photo with that name?'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Could a newcomer guess it?',
        text: [
          'Point at any setting and ask: <b>"Could a newcomer guess this from the house rule, or did someone have to write it down just for this one case?"</b> If they could guess it, delete the setting and let the rule answer. If not, keep it, in plain sight.',
          'This sounds like the opposite of lesson 23, Explicit over implicit. That lesson said "say it, do not hide it". This one says "do not spell it out". They are not opposites. They are <b>two halves of one rule</b>.',
          'Lesson 23 says: do not <b>hide</b> things that are surprising, that vary, or that the reader could not guess. The day of the sale was all three. This lesson says: do not <b>spell out</b> things that are the same everywhere, boring, and easy to guess. Where the muffin photo lives is all three.',
          'So when is a convention safe? When it passes four checks. It is <b>written down</b> and well known. It is <b>the same everywhere</b> in the project. It is <b>unsurprising</b>. And you can <b>override it in plain sight</b>, as lines 1 and 2 of <code>catalog.py</code> do.',
          'A "convention" that only its author knows fails the first check. It is not a convention at all. It is a hidden input, and that is lesson 23 again.'
        ],
        tip: 'Both lessons are after the same thing: the reader\'s attention. A file that spells out everything hides the two lines that matter. A file that hides a surprise leaves the reader to find it the hard way.'
      },
      {
        label: 'When not to', pic: whenPic,
        h: 'A rule only you know is a trap.',
        text: [
          '<b>Do not invent private conventions.</b> Suppose Sam loves this lesson and makes a rule of his own: any product whose name ends in <code>_sale</code> is 10% off. (<code>name.endswith("_sale")</code> asks: does this text end with those letters?) He tells nobody. Months later Maya adds a box of treats for school bake sales and calls it <code>bake_sale</code>. It sells at $18, not $20, and nobody chose that. The second picture says the same thing in plain sight, with a list anyone can read.',
          '<b>Conventions feel like magic when you do not know them.</b> Things "just happen" and a newcomer cannot see why. That is the surprise from lesson 11, Least astonishment. So keep conventions few, write them down, and never break them quietly. And prefer the ones your language and tools already have over home-made ones. A home-made rule for one corner of one small program rarely pays for itself, as lesson 4, Trade-offs, not laws, and lesson 8, YAGNI, warned.',
          '<b>When your case really is unusual, do not fight the rule.</b> The wedding cake does not belong at <code>/shop/wedding_cake</code>. Bending it to fit, or twisting the rule to cover it, is worse than one clear line that says "this one is different".',
          '<b>Some things must never have a default.</b> A password, the key to the payment company, or who is allowed to give refunds must be a choice somebody makes on purpose. A system that quietly falls back to "everyone is an admin" or to a well-known password breaks lesson 38, Least privilege.'
        ],
        warn: 'A good default is one that is boring when you find out about it. If learning what the default was would make someone say "it did <b>what</b>?", it should have been a setting.'
      }
    ],
    quiz: [
      {
        type: 'type', q: 'This is <code>catalog.py</code> after the fix. What does <code>page_for("lemon_bar")</code> hand back?',
        pic: code(fixedCode.slice(0, 7), { title: 'catalog.py' }),
        answers: ['/shop/lemon_bar', '"/shop/lemon_bar"', "'/shop/lemon_bar'"],
        prompt: 'page >',
        why: '<code>lemon_bar</code> is not in <code>SPECIAL_PAGE</code>, so line 7 follows the rule: <code>"/shop/"</code> joined to the name.',
        hint: 'Is lemon_bar one of the special pages? If not, which line runs?'
      },
      {
        type: 'pick', q: 'What does <code>label_for("gift_box")</code> hand back?',
        pic: code(['SPECIAL_LABEL = {"gift_box": "labels/gift.txt"}', '', 'def label_for(name):', '    if name in SPECIAL_LABEL:', '        return SPECIAL_LABEL[name]', '    return "labels/standard.txt"'], { title: 'catalog.py' }),
        options: ['"labels/standard.txt"', '"labels/gift.txt"', '"labels/gift_box.txt"', 'It stops with a KeyError'],
        answer: 1,
        why: 'The gift box is one of the two real exceptions. Line 4 finds it in the table, so line 5 hands back its own label.',
        hint: 'Is gift_box a key in the table on line 1?'
      },
      {
        type: 'pick', q: 'Back to lesson 1, Easy to change. With the old <code>settings.py</code>, Maya adds one new product. How many tables must get a new line?',
        pic: code(settingsCode, { title: 'settings.py, before the fix' }),
        options: ['1', '2', '3', '36'],
        answer: 2,
        why: 'One line in <code>PAGE</code>, one in <code>PHOTO</code> and one in <code>LABEL</code>. One change, three places, and Sam slipped in two of them.',
        hint: 'Count the tables: page, photo, label.'
      },
      {
        type: 'bucket', q: 'Leave it to the house rule, or write it in the settings?',
        buckets: ['Leave it to the rule', 'Write it down'],
        items: [
          ['The muffin photo is photos/muffin.jpg', 0],
          ['The brownie page is /shop/brownie', 0],
          ['A cupcake box gets the standard label', 0],
          ['The wedding cake page is /weddings', 1],
          ['The gift box gets its own label', 1]
        ],
        why: 'Three of these follow from the name alone. Two are different from the rule, and nobody could guess them.',
        hint: 'Ask of each one: could a newcomer who knows the rule have guessed it?'
      },
      {
        type: 'fill', q: 'Rebuild the job that finds a page. Exceptions first, then the rule.',
        text: 'def page_for(name):\n    if name ___ SPECIAL_PAGE:\n        return SPECIAL_PAGE[___]\n    return "/shop/" + ___',
        options: ['in', 'name', 'name', 'PAGE', '"name"'],
        answer: ['in', 'name', 'name'],
        why: '<code>name in SPECIAL_PAGE</code> asks if this product is an exception. If it is not, the page follows from the name.',
        hint: 'The first blank is the word that asks "is this key in the table?".'
      },
      {
        type: 'pick', q: 'Lesson 23, Explicit over implicit, said "say it, do not hide it". This lesson says "do not spell it out". Which sentence fits both?',
        options: [
          'Write down everything, to be safe',
          'Write down nothing that a tool could work out',
          'Say what is surprising or different. Let a well-known rule cover what anyone could guess',
          'Lesson 23 was wrong, and this lesson replaces it'
        ],
        answer: 2,
        why: 'The day of a sale varies and nobody could guess it, so it goes on the line. Where the muffin photo lives is the same for every product, so one rule covers it.',
        hint: 'One lesson was about a surprise. The other is about things that are the same everywhere.'
      },
      {
        type: 'pick', q: 'Which of these are safe to leave to a convention? Pick all that apply.',
        options: [
          'Test files have names that start with test_',
          'The first page of a website folder is index.html',
          'If nobody sets a password, the password is "cookies"',
          'Sam hides any product whose name starts with x_, and has told nobody'
        ],
        answer: [0, 1],
        why: 'The first two are written down, well known and unsurprising. A password must be chosen on purpose, as lesson 38 taught. And a rule only Sam knows is a hidden input.',
        hint: 'Run the four checks: written down, the same everywhere, unsurprising, easy to override.'
      },
      {
        type: 'pick', q: 'Sam\'s private rule is in the code below. Maya adds a product called <code>bake_sale</code> at $20. What goes wrong, and why?',
        pic: code(magicCode.slice(0, 4), { title: 'prices.py' }),
        options: [
          'Nothing. The rule works as planned',
          'It sells for $18, because a rule nobody knew about matched its name',
          'Python stops with a KeyError',
          'It sells for $22, because the tax is added twice'
        ],
        answer: 1,
        why: '10% off $20 is $18. The name was the input, and Maya had no way to know the name meant anything. A convention only its author knows is just a hidden input.',
        hint: 'Does the name bake_sale end with the letters on line 2?'
      }
    ]
  });
})();
