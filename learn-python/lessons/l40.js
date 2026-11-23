/* Lesson 40: Frozen collections (module 3). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l40  Frozen collections
     frozenset runs in the page (Python 3.14). frozendict is new in Python 3.15,
     so it is shown as a picture with real 3.15 output, never in a Run block.
     ===================================================================== */

  // A sticky note (tilted, can be changed) or a laminated card (straight, blue rim).
  const sticky = (x, y, w, h, title, items, rot) =>
    `<g transform="rotate(${rot} ${x + w / 2} ${y + h / 2})">` + box(x, y, w, h, P.warnT, 6) +
    `<circle cx="${x + w / 2}" cy="${y}" r="9" fill="${P.danger}" stroke="${P.ink}" stroke-width="2"/>` +
    T(x + 18, y + 32, title, { s: 15, a: 'start' }) +
    items.map((it, i) => T(x + 26, y + 60 + i * 24, it, { s: 14, m: true, w: 700, a: 'start' })).join('') + `</g>`;
  const laminated = (x, y, w, h, title, items) =>
    `<rect x="${x - 7}" y="${y - 7}" width="${w + 14}" height="${h + 14}" rx="18" fill="${P.tint}" stroke="${P.accent}" stroke-width="3"/>` +
    box(x, y, w, h, P.white, 12) + T(x + 18, y + 32, title, { s: 15, a: 'start' }) +
    items.map((it, i) => T(x + 26, y + 60 + i * 24, it, { s: 14, m: true, w: 700, a: 'start' })).join('');
  const chip = (x, y, s, fill) => {
    const w = s.length * 8.4 + 22;
    return `<rect x="${x - w / 2}" y="${y - 13}" width="${w}" height="26" rx="13" fill="${fill || P.white}" stroke="${P.ink}" stroke-width="2"/>` + T(x, y + 5, s, { s: 12.5, m: true, w: 700 });
  };
  // A little fingerprint: open arcs. col: colour.
  const finger = (cx, cy, col) => [0, 1, 2, 3, 4].map(i => {
    const r = 5 + i * 5, a0 = (200 + i * 9) * Math.PI / 180, a1 = (520 - i * 14) * Math.PI / 180;
    return `<path d="M${(cx + r * Math.cos(a0)).toFixed(1)} ${(cy + r * Math.sin(a0)).toFixed(1)} A${r} ${r} 0 1 1 ${(cx + r * Math.cos(a1)).toFixed(1)} ${(cy + r * Math.sin(a1)).toFixed(1)}" fill="none" stroke="${col}" stroke-width="3" stroke-linecap="round"/>`;
  }).join('');

  const ideaPic = svg(600, 330, "Left: Chloe's never-list on a tilted sticky note, with rye scribbled out: a set, anyone can change it. Right: the same list on a laminated card: a frozenset, nobody can change it. Below: frozen things can also be labels. A laminated tag with Ana and Ben points to pasta night.",
    sticky(36, 30, 200, 128, 'Chloe: never', ['flour', 'rye', 'barley'], -3) +
    `<path d="M58 122 q30 -10 64 -4" stroke="${P.danger}" stroke-width="3.5" fill="none" stroke-linecap="round"/>` +
    T(136, 190, 'a set: a sticky note', { s: 13.5, f: P.warn }) + T(136, 208, 'anyone can change it', { s: 12.5, w: 700, f: P.ink2 }) +
    laminated(360, 30, 200, 128, 'Chloe: never', ['flour', 'rye', 'barley']) +
    T(460, 190, 'a frozenset: laminated', { s: 13.5, f: P.accent }) + T(460, 208, 'nobody can change it', { s: 12.5, w: 700, f: P.ink2 }) +
    arrow(256, 92, 336, 92, P.ink, 3) + T(296, 80, 'freeze', { s: 12, f: P.accent }) +
    `<line x1="20" y1="232" x2="580" y2="232" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    T(300, 256, 'and a second power: frozen things can be labels', { s: 13.5 }) +
    `<rect x="143" y="268" width="150" height="48" rx="12" fill="${P.tint}" stroke="${P.accent}" stroke-width="3"/>` +
    chip(185, 292, 'Ana') + chip(250, 292, 'Ben') +
    arrow(300, 292, 352, 292, P.ink, 3) + box(360, 270, 120, 44, P.white, 10) + T(420, 297, 'pasta night', { s: 13 }));

  const fridge = [
    'never = frozenset({"flour", "rye", "barley"})   # Chloe: never these',
    'print(sorted(never))',
    'print("rye" in never, len(never))',
    '',
    'tonight = {"rice", "salmon", "flour", "lemon"}',
    'print("Not for Chloe:", sorted(tonight & never))',
    '',
    'never.add("oats")                 # try to write on the card'
  ];
  const spice = [
    'spice = frozendict({"salt": 5, "pepper": 2})   # grams per pot',
    'print(spice)',
    'print(spice["salt"], spice.get("cumin", 0), len(spice))',
    'bigger = spice | {"cumin": 1}     # a NEW card, the old one stays',
    'print(bigger)',
    'spice["salt"] = 50'
  ];
  const codePic = `<div style="width:100%;min-width:0">${run(fridge, { title: 'fridge.py' })}` +
    code(spice, { title: 'spice.py, needs Python 3.15', bad: [6] }) +
    term(['$ python3 spice.py', "frozendict({'salt': 5, 'pepper': 2})", '5 0 2', "frozendict({'salt': 5, 'pepper': 2, 'cumin': 1})", 'Traceback (most recent call last):', '  File "spice.py", line 6, in <module>', '    spice["salt"] = 50', '    ~~~~~^^^^^^^^', "TypeError: 'frozendict' object does not support item assignment"], 'terminal, Python 3.15') + `</div>`;

  const pain = [
    'ana_ben = {"Ana", "Ben"}          # who is coming',
    'menus = {}',
    'menus[ana_ben] = "pasta night"   # the guests are the label',
    'print(menus)'
  ];

  const fpPic = svg(600, 196, "A set is a sticky note: add Chloe and it changes, so its fingerprint would change too, and Python refuses to use it as a label. A frozenset is laminated: its fingerprint is fixed, so it can be a label.",
    `<rect x="24" y="16" width="150" height="48" rx="8" fill="${P.warnT}" stroke="${P.ink}" stroke-width="2.5"/>` + chip(66, 40, 'Ana') + chip(131, 40, 'Ben') +
    arrow(184, 40, 226, 40, P.danger, 2.5) + T(205, 28, '.add', { s: 11.5, m: true, f: P.danger }) +
    `<rect x="236" y="16" width="200" height="48" rx="8" fill="${P.warnT}" stroke="${P.ink}" stroke-width="2.5"/>` + chip(276, 40, 'Ana') + chip(336, 40, 'Ben') + chip(404, 40, 'Chloe') +
    finger(478, 40, P.danger) + `<path d="M462 24 l32 32 m0 -32 l-32 32" stroke="${P.danger}" stroke-width="4" stroke-linecap="round"/>` +
    T(510, 34, 'set: can change,', { s: 12.5, a: 'start', f: P.danger }) + T(510, 52, 'no label', { s: 12.5, a: 'start', f: P.danger }) +
    `<rect x="17" y="113" width="164" height="62" rx="14" fill="${P.tint}" stroke="${P.accent}" stroke-width="3"/>` +
    `<rect x="24" y="120" width="150" height="48" rx="10" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` + chip(66, 144, 'Ana') + chip(131, 144, 'Ben') +
    finger(226, 144, P.ok) + T(258, 138, 'frozenset: a fixed fingerprint,', { s: 12.5, a: 'start', f: P.ok }) + T(258, 156, 'so it can be a label (a dict key)', { s: 12.5, a: 'start', f: P.ok }) +
    T(300, 92, 'hashable = Python can make a fixed fingerprint of it', { s: 13 }));

  const fix = [
    'menus = {}',
    'menus[frozenset({"Ana", "Ben"})] = "pasta night"',
    'menus[frozenset({"Ben", "Chloe"})] = "curry night"',
    'menus[frozenset({"Ana", "Ben", "Chloe"})] = "risotto night"',
    '',
    'tonight = frozenset({"Ben", "Ana"})      # any order',
    'print(menus[tonight])',
    'print(menus.get(frozenset({"Chloe"}), "ask Chloe"))',
    '',
    'seen = {frozenset({"Ana", "Ben"}), frozenset({"Ben", "Ana"})}',
    'print(len(seen), "group, written twice")'
  ];
  const fixPic = `<div style="width:100%;min-width:0">${fpPic}${run(fix, { title: 'menus.py' })}</div>`;

  const check = [
    'never = frozenset({"flour", "rye", "barley"})',
    'tonight = {"rice", "salmon", "lemon", "butter"}',
    '',
    'clash = tonight & never',
    'if clash:',
    '    print("Not safe for Chloe:", sorted(clash))',
    'else:',
    '    print("Safe for Chloe")'
  ];

  const old = [
    'spice = frozendict({"salt": 5, "pepper": 2})   # new in Python 3.15',
    'print(spice["salt"])'
  ];
  const newCard = [
    'never = frozenset({"flour", "rye", "barley"})',
    'print(sorted(never))',
    'never = never | {"spelt"}         # not a change: a NEW card',
    'print(sorted(never))'
  ];
  const catchPic = `<div style="width:100%;min-width:0">${run(old, { title: 'spice.py' })}${run(newCard, { title: 'new_card.py' })}</div>`;

  COURSE.add({
    id: 'l40', minutes: 11,
    summary: 'A <b>frozen</b> collection can never change. <code>frozenset({"flour", "rye"})</code> is a set with no <code>.add()</code> or <code>.remove()</code>, but <code>in</code>, <code>len()</code>, <code>sorted()</code> and <code>&amp; | -</code> all work. Freeze for two reasons: so nothing changes it <b>by accident</b>, and so it can be a <b>label</b>. A plain set cannot be a dict key (<code>TypeError: ... unhashable type: \'set\'</code>). A frozenset can, because it is <b>hashable</b>: Python can make a fixed fingerprint of it. New in <b>Python 3.15</b>: <code>frozendict</code>, a dict nobody can change. The Run boxes here use 3.14, which does not have it yet.',
    video: {
      src: 'videos/l40-frozen-collections.mp4', poster: 'videos/l40-frozen-collections.jpg', length: '1 min 7 s',
      script: [
        'Chloe cannot eat gluten. Her fridge card says: never flour, rye or barley. On a sticky note, anyone could change it.',
        'In Python, a set is that sticky note. Wrap it in frozenset, and the card is laminated. Try to add oats, and it bounces off. Attribute error. A frozen set has no add.',
        'Reading still works. Is rye on the card? True.',
        'Freezing has a second power. A frozen thing can be a label. Ana and Ben coming means pasta night. Use a plain set as the key, and Python stops. Type error. Unhashable type, set.',
        'Hashable means Python can make a fixed fingerprint of it. A set can change, so it cannot be a label. A frozenset can. Ben and Ana, or Ana and Ben: same label.',
        'New in Python 3.15: frozendict. Grandma\'s spice ratio, salt 5, pepper 2, locked for good.',
        'Freeze it when it must not change, or when it needs to be a label.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Laminate the card on the fridge.',
        text: [
          'Chloe cannot eat gluten. On your fridge is her card: <b>never flour, rye or barley</b>. If that list is on a sticky note, anyone can scribble on it. One helper "tidies" it, rye disappears, and Chloe gets rye bread.',
          'A set from lesson 39 is that sticky note: <code>.add()</code>, <code>.remove()</code> and <code>.discard()</code> change it. A <b>frozen</b> collection is the <b>laminated</b> card. You can read it as often as you like. Nobody can change it.',
          'Freezing has a <b>second power</b>. A frozen thing can be a <b>label</b>: a key in a dictionary, or an item in a set. A plain set can be neither. This lesson shows why.'
        ],
        tip: 'You met the first frozen collection in lesson 36: a <b>tuple</b> is the frozen list. This lesson adds the frozen set, <code>frozenset</code>, and the frozen dict, <code>frozendict</code>.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'frozenset and frozendict.',
        text: [
          'Press <b>Run</b> on <code>fridge.py</code>. <code>frozenset({...})</code> makes a set that can never change. Reading works exactly like a set: <code>sorted()</code>, <code>in</code>, <code>len()</code>, and set maths. <code>tonight &amp; never</code> finds flour on tonight\'s menu.',
          'The last line tries to add oats, and Python stops: <code>AttributeError: \'frozenset\' object has no attribute \'add\'</code>. A frozenset simply has <b>no tools that change it</b>. The card protected itself.',
          'Python 3.15 adds the frozen <b>dictionary</b>: <code>frozendict</code>. Look at <code>spice.py</code> and its real 3.15 output. Grandma\'s spice ratio reads like a dict: <code>spice["salt"]</code>, <code>.get()</code>, <code>len()</code>. <code>|</code> joins two dicts into a <b>new</b> frozendict. But <code>spice["salt"] = 50</code> stops with <code>TypeError: \'frozendict\' object does not support item assignment</code>, the same refusal a tuple gives.'
        ],
        tip: 'The Run boxes on this page use Python 3.14, which has no <code>frozendict</code> yet. That is why <code>spice.py</code> is a picture. Python 3.15 also adds a note to the <code>.add()</code> error: <code>Did you mean to use a \'set\' object?</code>'
      },
      {
        label: 'The pain', pic: run(pain, { title: 'menus.py' }),
        h: 'A plain set cannot be a label.',
        text: [
          'You plan dinners by <b>who is coming</b>. Ana and Ben means pasta night. So the guests should be the <b>key</b> of a dictionary, and the dinner the value.',
          'Why a set of guests, not a list? Because "Ana and Ben" and "Ben and Ana" are the same dinner. A set has no order, so both are the same set.',
          'Press <b>Run</b>. Line 3 stops: <code>TypeError: cannot use \'set\' as a dict key (unhashable type: \'set\')</code>. Python refuses to use a set as a label. Lesson 39 showed the same kind of error for a list inside a set.'
        ],
        warn: '<b>Unhashable</b> means "Python cannot make a fixed fingerprint of it". The next part explains the fingerprint. A list and a dict are unhashable too, for the same reason: they can change.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Freeze the label.',
        text: [
          'A dictionary finds a key fast because it files each key by a <b>fingerprint</b>, a number Python makes from the key. Lesson 39 called that number the <b>hash</b>. Something is <b>hashable</b> when Python can make a fixed fingerprint of it, so it can be a label.',
          'A set can change. Add Chloe, and its fingerprint would change too, and the dictionary could never find the dinner again. So Python refuses. A <b>frozenset</b> never changes, so its fingerprint stays fixed. It can be a key.',
          'Press <b>Run</b>. <code>frozenset({"Ben", "Ana"})</code> finds pasta night, in any order. <code>.get()</code> from lesson 38 works as usual. And a set can hold frozensets: the same group written twice counts once. Then add a fourth dinner for just Chloe, and look it up.'
        ],
        tip: 'Numbers, text and tuples (of hashable things) are hashable too. That is why they were allowed as dict keys and set items all along.'
      },
      {
        label: 'Try it', pic: run(check, { title: 'check_menu.py' }),
        h: 'Check tonight\'s menu against the card.',
        text: [
          'Before you cook, check the menu against Chloe\'s card. <code>tonight &amp; never</code> gives what is on <b>both</b>: the problem items. An empty set counts as no (lesson 23), so <code>if clash:</code> means "is there a clash?".',
          'Press <b>Run</b>: safe for Chloe. Now you make a sauce. Add <code>"flour"</code> to <code>tonight</code>, run it again, and read the warning.',
          'Then try to scribble on the card. Add a line <code>never.discard("flour")</code> right after line 1 and run it. The frozen card refuses. Press <b>Reset</b> afterwards.'
        ]
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'New in 3.15, and the jar label can still move.',
        text: [
          '<b>Catch 1: <code>frozendict</code> needs Python 3.15.</b> It is brand new. Press <b>Run</b> on <code>spice.py</code>: this page runs Python 3.14, so it says <code>NameError: name \'frozendict\' is not defined. Did you mean: \'frozenset\'?</code>. On your own computer with Python 3.15 from lesson 2, the same file prints <code>5</code>. Code with <code>frozendict</code> only works for people who have 3.15 or newer.',
          '<b>Catch 2: frozen protects the card, not the name.</b> Run <code>new_card.py</code>. <code>never | {"spelt"}</code> does not change the frozen card. It makes a <b>new</b> card with spelt on it, and the name <code>never</code> now points at the new one. Remember lesson 11: a name is a label on a jar, and you can always put a new value in the jar.',
          'So freeze when a thing <b>must not change</b>, or when it <b>needs to be a label</b>. For everyday lists, shopping baskets and pantry counts that change all the time, keep the normal list, set and dict.'
        ],
        warn: 'Frozen goes only as deep as what is inside. A <code>frozendict</code> whose values are lists can still have those lists changed, and then it is not hashable. Lesson 41, Nesting, puts collections inside collections.'
      }
    ],
    exercises: [
      {
        file: 'l40_fridge_card.py', title: "Chloe's fridge card",
        task: 'Freeze Chloe\'s <b>never</b> list with <code>frozenset</code>, freeze the portion sizes with <code>frozendict</code> (Python 3.15), delete the two lines that scribble on them, and print <b>3 exact lines</b>, including the menu items that clash with the card.',
        steps: [
          'Press <b>Open in VS Code</b>. The 3 exact lines to print are in the comment at the top of the file.',
          'Run it first and read the hint. Then change the lines between <code>START</code> and <code>END</code>. Use <code>&amp;</code> for the clash, and <code>sorted()</code> to print a set. Save the file.',
          'Run it again. The check also runs your lines with another card and menu, so typed-in answers will not pass. Still on Python 3.14? The file tells you, and skips the <code>frozendict</code> part until you install 3.15 (lesson 2).'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What happens when you run this?',
        pic: code(['never = frozenset({"flour", "rye", "barley"})', 'never.add("oats")', 'print(len(never))'], { title: 'fridge.py' }),
        options: ["AttributeError: 'frozenset' object has no attribute 'add'", 'It prints 4', 'It prints 3', "TypeError: unhashable type: 'frozenset'"],
        answer: 0,
        why: 'A frozenset has no tools that change it, so <code>.add</code> does not exist. Python stops on line 2, and line 3 never runs.',
        hint: 'Can you write on a laminated card?'
      },
      {
        type: 'pick', q: 'Which of these can be a <b>key</b> in a dictionary?',
        options: ['"pasta"', '42', '("Ana", "Ben")', 'frozenset({"Ana", "Ben"})', '{"Ana", "Ben"}', '["Ana", "Ben"]'],
        answer: [0, 1, 2, 3],
        why: 'Text, numbers, tuples and frozensets never change, so they are hashable. A set and a list can change, so Python stops with <code>TypeError: cannot use \'set\' as a dict key (unhashable type: \'set\')</code>, or the same for a list.',
        hint: 'Ask of each one: can it change after it is made?'
      },
      {
        type: 'fix', q: 'This stops with <code>TypeError: cannot use \'set\' as a dict key</code>. Fix line 2 so it prints <code>pasta night</code>.',
        code: ['menus = {}', 'guests = {"Ana", "Ben"}', 'menus[guests] = "pasta night"', 'print(menus[guests])'],
        title: 'menus.py',
        check: [
          'got = out.strip()',
          'if type(guests) is frozenset and got == "pasta night":',
          '    ok = True',
          'elif type(guests) is set:',
          '    msg = "guests is still a plain set, and a set can change, so it cannot be a key. Wrap it: frozenset({...})"',
          'elif type(guests) is not frozenset:',
          '    msg = "Keep the two guests in a set, but a frozen one: frozenset({\\"Ana\\", \\"Ben\\"})"',
          'else:',
          '    msg = "It printed " + got + ". Keep lines 1, 3 and 4 as they were."'
        ].join('\n'),
        why: '<code>guests = frozenset({"Ana", "Ben"})</code>. A frozenset never changes, so Python can make a fixed fingerprint of it, and it can be a key.',
        hint: 'The guests need to be laminated.'
      },
      {
        type: 'pick', q: 'Back to lesson 36. A tuple is a frozen list, so it can be a key too. What does this do?',
        pic: code(['menus = {("Ana", "Ben"): "pasta night"}', 'print(menus[("Ben", "Ana")])'], { title: 'tuple_key.py' }),
        options: ["KeyError: ('Ben', 'Ana')", 'It prints pasta night', "TypeError: unhashable type: 'tuple'", 'It prints None'],
        answer: 0,
        why: 'A tuple keeps its order, so <code>("Ben", "Ana")</code> is a different key from <code>("Ana", "Ben")</code>. A group of guests has no order, so a <code>frozenset</code> is the better key: both orders give the same frozenset.',
        hint: 'Is ("Ana", "Ben") the same tuple as ("Ben", "Ana")?'
      },
      {
        type: 'fix', q: 'A helper "tidies" Chloe\'s card, and rye disappears. Make the card frozen, and delete the line that changes it, so it prints <code>[\'barley\', \'flour\', \'rye\']</code>.',
        code: ['never = {"flour", "rye", "barley"}', 'never.discard("rye")      # a helper tidies up', 'print(sorted(never))'],
        title: 'card.py',
        check: [
          'got = out.strip()',
          'if type(never) is frozenset and got == "[\'barley\', \'flour\', \'rye\']":',
          '    ok = True',
          'elif type(never) is not frozenset:',
          '    msg = "never is still a plain set. Laminate it: frozenset({...})"',
          'else:',
          '    msg = "It printed " + got + ". Keep all three items on the card."'
        ].join('\n'),
        why: '<code>never = frozenset({"flour", "rye", "barley"})</code>, and the <code>.discard()</code> line goes. With the card frozen, that line would stop with <code>AttributeError</code> instead of quietly removing rye.',
        hint: 'Freeze line 1 and run it. Python then shows you which line tries to change the card.'
      },
      {
        type: 'pick', q: 'You press Run on this in the page. The Run boxes use Python 3.14. What do you see?',
        pic: code(['spice = frozendict({"salt": 5, "pepper": 2})', 'print(spice["salt"])'], { title: 'spice.py' }),
        options: ["NameError: name 'frozendict' is not defined. Did you mean: 'frozenset'?", '5', "TypeError: 'frozendict' object does not support item assignment", "{'salt': 5, 'pepper': 2}"],
        answer: 0,
        why: '<code>frozendict</code> is new in Python 3.15. Python 3.14 does not know the name at all. With Python 3.15 it prints <code>5</code>.',
        hint: 'In which Python version did frozendict arrive?'
      },
      {
        type: 'match', q: 'Match each idea to what it means.',
        pairs: [
          ['tuple', 'the frozen list (lesson 36)'],
          ['frozenset', 'the frozen set'],
          ['frozendict', 'the frozen dict, new in Python 3.15'],
          ['hashable', 'Python can make a fixed fingerprint of it']
        ],
        why: 'Each changeable collection has a frozen twin. Frozen things are hashable, so they can be dict keys and set items.',
        hint: 'Three of them are collections. One is the word for "can be a label".'
      },
      {
        type: 'bucket', q: 'Freeze it, or keep it changeable?',
        buckets: ['Freeze it', 'Keep it changeable'],
        items: [
          ["Chloe's never-list on the fridge", 0],
          ["grandma's spice ratio", 0],
          ['a group of guests used as a dict key', 0],
          ['this week\'s shopping list', 1],
          ['the pantry counts that go up and down', 1],
          ['the things already in the basket', 1]
        ],
        why: 'Freeze when it must not change, or when it needs to be a label. Things you add to and take from every day stay a normal list, set or dict.',
        hint: 'Does it change every day, or must it never change?'
      }
    ]
  });
})();
