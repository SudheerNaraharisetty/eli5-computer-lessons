/* Lesson 46: Defaults and keyword arguments (module 4). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l46  Defaults and keyword arguments
     ===================================================================== */

  // A jar on the recipe card. val: what is in it. pen: a default, written in pencil (grey).
  const jar = (x, y, name, val, o) => {
    o = o || {};
    return `<rect x="${x}" y="${y}" width="72" height="62" rx="10" fill="${val ? P.white : P.paper2}" stroke="${o.ring || P.ink}" stroke-width="${o.ring ? 3.5 : 2.5}" stroke-dasharray="${val ? '' : '6 5'}"/>` +
      `<rect x="${x + 18}" y="${y - 8}" width="36" height="9" rx="3" fill="${P.ink}"/>` +
      (val ? T(x + 36, y + 39, val, { s: 20, m: true, w: o.pen ? 500 : 800, f: o.col || (o.pen ? P.mute : P.accent) }) : '') +
      T(x + 36, y + 82, name, { s: 12, m: true, f: P.ink2 });
  };
  const pencil = (x, y) => `<g transform="rotate(45 ${x} ${y})"><rect x="${x - 5}" y="${y - 16}" width="10" height="24" rx="2" fill="#FFC24B" stroke="${P.ink}" stroke-width="2"/><path d="M${x - 5} ${y + 8} L${x} ${y + 17} L${x + 5} ${y + 8}Z" fill="${P.paper2}" stroke="${P.ink}" stroke-width="2" stroke-linejoin="round"/></g>`;
  const card = (x, y, title) => box(x, y, 272, 196, P.warnT, 16) + T(x + 136, y + 30, title, { s: 15, m: true });

  const ideaPic = svg(600, 282, 'The recipe card porridge has three jars. oats_g is empty: every call must fill it. milk_ml already holds 250 and salt_g holds 1, written in pencil: these are the defaults. On the right, the call porridge(80) fills only the oats and gets 80 g oats, 250 ml milk, 1 g salt. The call porridge(60, salt_g=0) names the salt jar, so only the salt changes: 60 g oats, 250 ml milk, 0 g salt.',
    card(14, 14, 'porridge') + pencil(262, 36) +
    jar(34, 76, 'oats_g', '') + jar(114, 76, 'milk_ml', '250', { pen: true }) + jar(194, 76, 'salt_g', '1', { pen: true }) +
    T(150, 192, 'pencil = the usual amount', { s: 12.5, w: 700, f: P.ink2 }) +
    box(318, 14, 268, 86, P.white, 14) +
    T(452, 42, 'porridge(80)', { s: 15, m: true, f: P.accent }) +
    T(452, 66, '80 g oats, 250 ml milk,', { s: 12.5, w: 700, f: P.ok }) +
    T(452, 84, '1 g salt', { s: 12.5, w: 700, f: P.ok }) +
    box(318, 124, 268, 86, P.white, 14) +
    T(452, 152, 'porridge(60, salt_g=0)', { s: 15, m: true, f: P.accent }) +
    T(452, 176, '60 g oats, 250 ml milk,', { s: 12.5, w: 700, f: P.ok }) +
    T(452, 194, '0 g salt', { s: 12.5, w: 700, f: P.ok }) +
    arrow(318, 168, 268, 128, P.accent, 2.5) +
    T(300, 246, 'Leave a jar out: the pencil amount is used.', { s: 13, w: 700, f: P.ink2 }) +
    T(300, 268, 'Name a jar at the call: only that jar changes.', { s: 13, w: 700, f: P.ink2 }));

  const porridgeDef = [
    'def porridge(oats_g, milk_ml=250, salt_g=1):',
    '    return f"{oats_g} g oats, {milk_ml} ml milk, {salt_g} g salt"'
  ];
  const breakfast = porridgeDef.concat([
    '',
    'print(f"Ana:   {porridge(80)}")',
    'print(f"Ben:   {porridge(100, milk_ml=350)}")',
    'print(f"Chloe: {porridge(60, salt_g=0)}")'
  ]);

  // The pain: porridge(60, 0). Values fill the jars by position.
  const badge = (x, y, n) => `<circle cx="${x}" cy="${y}" r="11" fill="${P.danger}"/>` + T(x, y + 4.5, n, { s: 12, f: P.white });
  const painSvg = svg(600, 304, 'The call porridge(60, 0). Values go into the jars by position: the 1st value, 60, goes into oats_g. The 2nd value, 0, goes into the 2nd jar, which is milk_ml, not salt_g. The salt jar keeps its pencil 1. Chloe gets 60 g oats, 0 ml milk, 1 g salt: dry oats with salt, and no error.',
    box(200, 10, 200, 46, P.white, 12) +
    T(300, 40, 'porridge(60, 0)', { s: 18, m: true }) +
    badge(327, 72, '1') + badge(365, 72, '2') +
    box(164, 98, 272, 172, P.warnT, 16) + T(180, 124, 'porridge', { s: 15, m: true, a: 'start' }) +
    jar(184, 160, 'oats_g', '60') + jar(264, 160, 'milk_ml', '0', { col: P.danger, ring: P.danger }) + jar(344, 160, 'salt_g', '1', { pen: true }) +
    arrow(320, 82, 226, 150, P.ink, 2) + arrow(362, 84, 304, 150, P.danger, 2.5) +
    T(82, 186, 'you meant:', { s: 12.5, w: 700, f: P.ink2 }) + T(82, 206, 'no salt', { s: 14, f: P.ok }) +
    T(518, 186, 'you got:', { s: 12.5, w: 700, f: P.ink2 }) + T(518, 206, 'no milk', { s: 14, f: P.danger }) +
    T(300, 296, '2nd value, 2nd jar. Python never looks at what you meant.', { s: 13, w: 700, f: P.danger }));

  const mixup = porridgeDef.concat([
    '',
    'print(f"Chloe: {porridge(60, 0)}")      # meant: no salt',
    'print(f"Ben:   {porridge(350, 100)}")   # meant: 100 g oats, 350 ml milk'
  ]);
  const painPic = `<div style="width:100%;min-width:0">${painSvg}${run(mixup, { title: 'mixup.py' })}</div>`;

  const named = porridgeDef.concat([
    '',
    'print(f"Chloe: {porridge(60, salt_g=0)}")',
    'print(f"Ben:   {porridge(oats_g=100, milk_ml=350)}")',
    'print(f"Ben:   {porridge(milk_ml=350, oats_g=100)}")'
  ]);
  const kwFirst = porridgeDef.concat(['', 'print(porridge(milk_ml=350, 100))']);
  const fixPic = `<div style="width:100%;min-width:0">${run(named, { title: 'named.py' })}` +
    code(kwFirst, { title: 'oops.py, a name before a plain value', bad: [4] }) +
    term(['$ python3 oops.py', '  File "oops.py", line 4', '    print(porridge(milk_ml=350, 100))', '                                   ^', 'SyntaxError: positional argument follows keyword argument'], 'terminal') + `</div>`;

  const pasta = [
    'def make_pasta(grams, water_l=1, salt_g=10):',
    '    return f"Boil {water_l} l water with {salt_g} g salt. Cook {grams} g pasta."',
    '',
    'print("Ana:  ", make_pasta(120))',
    'print("Chloe:", make_pasta(100, salt_g=5))'
  ];

  const shared = [
    'def add_item(item, basket=[]):',
    '    basket.append(item)',
    '    return basket',
    '',
    'print("Ana:  ", add_item("bananas"))',
    'print("Ben:  ", add_item("tofu"))',
    'print("Chloe:", add_item("rice flour"))'
  ];
  const fresh = [
    'def add_item(item, basket=None):',
    '    if basket is None:',
    '        basket = []',
    '    basket.append(item)',
    '    return basket',
    '',
    'print("Ana:  ", add_item("bananas"))',
    'print("Ben:  ", add_item("tofu"))',
    'print("Chloe:", add_item("rice flour"))',
    '',
    'bens = ["tofu"]',
    'print("Ben:  ", add_item("lentils", bens))'
  ];
  const basketSvg = svg(600, 200, 'Left: with basket=[] there is one basket, made once when def runs, hanging on the card. Three calls drop bananas, tofu and rice flour into that same basket. Right: with basket=None, every call makes a fresh empty basket inside the card, so Ana, Ben and Chloe each get one item.',
    box(14, 14, 276, 172, P.dangerT, 16) +
    T(152, 40, 'basket=[]', { s: 15, m: true, f: P.danger }) +
    `<path d="M92 76 L212 76 L200 150 L104 150 Z" fill="#E8C992" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/><path d="M118 76 C118 50 186 50 186 76" fill="none" stroke="${P.ink}" stroke-width="3"/>` +
    T(152, 98, 'bananas', { s: 12, f: P.ink }) + T(152, 116, 'tofu', { s: 12, f: P.ink }) + T(152, 134, 'rice flour', { s: 12, f: P.ink }) +
    T(152, 174, 'made once, shared by every call', { s: 12, w: 700, f: P.danger }) +
    box(310, 14, 276, 172, P.okT, 16) +
    T(448, 40, 'basket=None', { s: 15, m: true, f: P.ok }) +
    ['bananas', 'tofu', 'rice flour'].map((s, i) => {
      const x = 340 + i * 76;
      return `<path d="M${x} 80 L${x + 64} 80 L${x + 58} 128 L${x + 6} 128 Z" fill="#E8C992" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>` +
        T(x + 32, 108, s, { s: s.length > 6 ? 9.5 : 11, f: P.ink }) + T(x + 32, 148, ['Ana', 'Ben', 'Chloe'][i], { s: 12, f: P.ok });
    }).join('') +
    T(448, 174, 'a fresh basket in every call', { s: 12, w: 700, f: P.ok }));
  const catchPic = `<div style="width:100%;min-width:0">${run(shared, { title: 'basket.py' })}${basketSvg}${run(fresh, { title: 'basket.py, fixed' })}</div>`;

  COURSE.add({
    id: 'l46', minutes: 12,
    summary: 'A <b>default</b> is the usual amount, written on the recipe card: <code>def porridge(oats_g, milk_ml=250, salt_g=1):</code>. Leave that argument out at the call and the default fills the jar: <code>porridge(80)</code>. A <b>keyword argument</b> names the jar at the call: <code>porridge(60, salt_g=0)</code>. Names make a call readable and stop the <b>order mix-up</b> that silently cooks the wrong dish. Rules: jars with a default come <b>after</b> the ones without, and in a call, plain values come <b>before</b> named ones. Never use a list as a default: <code>basket=[]</code> is made <b>once</b> and shared by every call. Use <code>basket=None</code> and make a fresh list inside.',
    video: {
      src: 'videos/l46-defaults-and-keyword-arguments.mp4', poster: 'videos/l46-defaults-and-keyword-arguments.jpg', length: '1 min 13 s',
      script: [
        'Kitchen Coach makes porridge for your friends. Most days, the amounts are the same. 250 millilitres of milk, and 1 gram of salt.',
        'So write them on the card, in pencil. These are default values.',
        'Ana\'s call gives only the oats. 80. The other jars keep their usual amounts.',
        'Chloe wants 60 grams, and no salt. So name the jar. Salt g, equals 0. Python finds the jar by name, and swaps the 1 for a 0.',
        'Without the name, you might write porridge, 60, 0. But the second number fills the second jar. That is the milk. Dry oats, with salt. No error. Just the wrong breakfast.',
        'One trap. A default list, like basket equals empty brackets, is made only once, when the card is written. Every call shares that one basket. Bananas, tofu, rice flour, all in one.',
        'Default to None, and make a fresh list inside.',
        'Defaults cover the usual. Keywords say exactly which ingredient you mean.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'The usual amount, in pencil.',
        text: [
          'Every morning Kitchen Coach makes porridge. The oats change from friend to friend, but almost every bowl gets <b>250 ml of milk</b> and <b>1 g of salt</b>. Typing <code>250, 1</code> into every call is boring, and easy to get wrong.',
          'So write the usual amounts <b>on the card</b>, in pencil. These are <b>default values</b>. A call that leaves a jar out gets the pencil amount. A call that brings its own amount rubs the pencil out, just for that bowl.',
          'Chloe wants <b>no salt</b>. She does not say "the third number is 0". She says "<b>salt: 0</b>". Python lets you say it the same way, by naming the jar at the call: <code>salt_g=0</code>. That is a <b>keyword argument</b>.'
        ],
        tip: 'You have already used keyword arguments: <code>print("(o)", end=" ")</code> in lesson 29, and <code>sorted(week_km, reverse=True)</code> in lesson 34. <code>end</code> and <code>reverse</code> are jars with a default on Python\'s own cards. Now you write cards like that yourself.'
      },
      {
        label: 'The code', pic: run(breakfast, { title: 'porridge.py' }),
        h: 'Write the default after an equals sign.',
        text: [
          'Line 1 is the card from lesson 45, with a twist: <code>milk_ml=250</code> and <code>salt_g=1</code>. The <code>=</code> on the <code>def</code> line puts a <b>default</b> in the jar. <code>oats_g</code> has no default, so every call must bring the oats.',
          'Line 4, <code>porridge(80)</code>, brings only the oats. Python fills <code>oats_g</code> with 80, and the other two jars keep their defaults: 250 and 1.',
          'Line 5, <code>porridge(100, milk_ml=350)</code>: 100 goes into the first jar by position, as in lesson 45. Then <code>milk_ml=350</code> goes into the jar <b>with that name</b>. Salt is not mentioned, so it stays 1. Line 6 does the same for Chloe\'s salt. Press <b>Run</b>.',
          'Now Ana wants extra milk after her long run. Change line 4 to <code>porridge(80, milk_ml=300)</code> and run it again. Only Ana\'s bowl changes.'
        ],
        tip: 'No spaces around <code>=</code> in a default or a keyword argument: <code>salt_g=0</code>, not <code>salt_g = 0</code>. Both work, but that is how Python cooks write it, so it does not look like a normal <code>=</code> that fills a jar on its own line.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'The 2nd value goes into the 2nd jar.',
        text: [
          'Without names, values fill the jars <b>by position</b>: first value, first jar. Chloe wants no salt, so someone writes <code>porridge(60, 0)</code>. But the second value goes into the <b>second jar</b>, and that is the <b>milk</b>. Salt keeps its default.',
          'Press <b>Run</b>. Chloe gets <code>60 g oats, 0 ml milk, 1 g salt</code>: dry oats with salt. Ben\'s line swapped his oats and milk: <b>350 g of oats</b> in 100 ml of milk.',
          'And there is <b>no error</b>. Every value is a number, every jar is filled, so Python is happy. It is the same trap as <code>per_slice(4, 1200)</code> in lesson 45: Python cannot tell grams from millilitres. Only you can, and only if the call says which is which.'
        ],
        warn: 'A call like <code>porridge(80, 0, 2)</code> is a riddle. Which number is the milk? You have to open the card to find out. A call that needs a riddle solved is a bug waiting to happen.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Name the jar at the call.',
        text: [
          'Write <code>salt_g=0</code> and Python puts 0 into the jar <b>called</b> <code>salt_g</code>, wherever it sits on the card. Press <b>Run</b>: Chloe gets her milk, and no salt.',
          'Names also make the <b>order free</b>. Lines 5 and 6 name every jar, in two different orders, and Ben gets the same bowl both times. Anyone reading the call can see what goes where, without opening the card.',
          '<b>One rule:</b> plain values first, names after. <code>porridge(milk_ml=350, 100)</code> stops before anything runs: <code>SyntaxError: positional argument follows keyword argument</code>. A plain value is called <b>positional</b>, because its position decides its jar. After a name, Python can no longer tell which position you mean.'
        ],
        tip: 'Names work on every card, also ones without defaults. The card from lesson 45 can be called <code>protein_in(per_100g=17, grams=150)</code>, and it still gives <b>25.5</b>. Use names whenever two numbers could be swapped.'
      },
      {
        label: 'Try it', pic: run(pasta, { title: 'pasta.py' }),
        h: 'Your own card: pasta for the table.',
        text: [
          'Ana needs carbs before her long run. This card boils pasta: <b>1 litre</b> of water and <b>10 g</b> of salt is the usual for about 100 g of pasta. Chloe\'s gluten-free pasta gets less salt, so her call names <code>salt_g=5</code>. Press <b>Run</b>.',
          'Ben eats a big plate after the gym: <b>200 g</b> of pasta in <b>2 litres</b> of water with <b>20 g</b> of salt. Add a line for him that passes the grams plainly and names the other two.',
          'Then try breaking a rule on purpose. Move <code>grams</code> to the end of the <code>def</code> line: <code>def make_pasta(water_l=1, salt_g=10, grams):</code>. Read the error, then press Reset.'
        ],
        tip: 'The error you just saw is <code>SyntaxError: parameter without a default follows parameter with a default</code>. Jars <b>without</b> a default always come <b>first</b> on the card. Otherwise Python could not tell which jar your first plain value should go into.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Never use a list as a default.',
        text: [
          'Kitchen Coach starts a shopping basket for each friend. <code>add_item("bananas")</code> should hand back a <b>new</b> basket with one item. Press <b>Run</b> on the first <code>basket.py</code>. Ana gets bananas. Ben gets bananas <b>and</b> tofu. Chloe gets all three.',
          'Why? The default is made <b>once</b>, when Python reads the <code>def</code> line, not at every call. So <code>[]</code> is <b>one</b> basket, hanging on the card, and every call that leaves the basket out drops its item into that same one. Lesson 45 said every call gets fresh jars. That is true for the jars, but a default value is made only once. With a number, that never matters. A list can change in place (lesson 34), so the changes pile up: two names, one list, as in lesson 31.',
          '<b>The fix:</b> default to <code>None</code>, the empty jar from lesson 16. Inside the card, <code>if basket is None:</code> asks "is the jar still the empty jar None?" If it is, <code>basket = []</code> makes a <b>fresh</b> basket for this call. Run the fixed file: one item each. The last line shows you can still pass your own basket.'
        ],
        warn: 'The same goes for a dict or a set as a default: <code>def f(rack={})</code> shares one rack between all calls. Numbers, text, <code>True</code>, <code>False</code> and <code>None</code> are safe defaults. Anything you can <code>.append()</code> to or change in place is not.'
      }
    ],
    exercises: [
      {
        file: 'l46_porridge_card.py', title: 'The porridge card',
        task: 'The porridge card has <b>no defaults</b>, so every call lists 3 numbers in order, and Chloe\'s call mixed them up: <b>250 g of salt</b>. Give the card the usual amounts, <code>milk_ml=250</code> and <code>salt_g=1</code>, then rewrite the 3 calls so each one passes the oats and <b>names</b> only what is different. The check also calls your card with other numbers.',
        steps: [
          'Press <b>Open in VS Code</b>. Read the task at the top of the file and run it once. Look at Chloe\'s salt.',
          'Between <code>START</code> and <code>END</code>, add the two defaults to the <code>def</code> line. Then change the calls: Ana needs only her oats, Ben names his milk, Chloe names her salt. Save the file.',
          'Run it again. The check looks at the defaults on your card, tries it with other numbers, and says <code>PASS</code> or gives you one hint.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'The card is <code>def porridge(oats_g, milk_ml=250, salt_g=1):</code> and it returns the text shown in this lesson. What does <code>porridge(60, 0)</code> give?',
        options: ['60 g oats, 0 ml milk, 1 g salt', '60 g oats, 250 ml milk, 0 g salt', '60 g oats, 0 ml milk, 0 g salt', 'TypeError: missing 1 required positional argument'],
        answer: 0,
        why: 'Plain values fill the jars by position. 0 is the second value, so it goes into the second jar, <code>milk_ml</code>. Salt is left out, so it keeps its default, 1. To change the salt, write <code>porridge(60, salt_g=0)</code>.',
        hint: 'Which jar does the second plain value go into?'
      },
      {
        type: 'bucket', q: 'The card is <code>def porridge(oats_g, milk_ml=250, salt_g=1):</code>. Which calls run, and which stop with an error?',
        buckets: ['Runs', 'Stops with an error'],
        items: [
          ['porridge(80)', 0],
          ['porridge(80, salt_g=0)', 0],
          ['porridge(salt_g=0, oats_g=60)', 0],
          ['porridge(100, 350)', 0],
          ['porridge()', 1],
          ['porridge(milk_ml=300, 80)', 1],
          ['porridge(80, salt=0)', 1]
        ],
        why: '<code>oats_g</code> has no default, so <code>porridge()</code> is missing it. A plain value after a named one is a <code>SyntaxError</code>. <code>salt</code> is not a jar on the card (Python even asks: Did you mean \'salt_g\'?). Named jars can come in any order, and <code>porridge(100, 350)</code> is fine: 350 goes into the milk.',
        hint: 'Check three things: are the oats there, do plain values come before names, and does every name match a jar on the card?'
      },
      {
        type: 'fix', q: 'Python stops with <code>SyntaxError: positional argument follows keyword argument</code>. Fix the call so Ben gets <code>100 g oats, 350 ml milk, 1 g salt</code>.',
        code: porridgeDef.concat(['', 'print(porridge(milk_ml=350, 100))']),
        title: 'ben.py',
        check: [
          'got = out.strip()',
          'if got == "100 g oats, 350 ml milk, 1 g salt":',
          '    ok = True',
          'elif got == "350 g oats, 100 ml milk, 1 g salt":',
          '    msg = "No error now, but Ben got 350 g of oats. The plain value goes into the first jar. Which number is the oats?"',
          'else:',
          '    msg = "It printed: " + got + ". It should print 100 g oats, 350 ml milk, 1 g salt"'
        ].join('\n'),
        why: '<code>porridge(100, milk_ml=350)</code>: the plain value first, the named one after. Naming both, <code>porridge(milk_ml=350, oats_g=100)</code>, works too.',
        hint: 'Plain values first, names after.'
      },
      {
        type: 'fix', q: 'This card stops before anything runs, with <code>SyntaxError: parameter without a default follows parameter with a default</code>. Fix the <code>def</code> line so both calls work.',
        code: ['def make_pasta(salt_g=10, grams):', '    return f"Cook {grams} g pasta with {salt_g} g salt"', '', 'print(make_pasta(120))', 'print(make_pasta(100, salt_g=5))'],
        title: 'pasta.py',
        check: [
          'import inspect',
          'lines = out.splitlines()',
          'jars = list(inspect.signature(make_pasta).parameters.values())',
          'if [j.name for j in jars] != ["grams", "salt_g"]:',
          '    msg = "Keep the same 2 jars, grams and salt_g. Only change their order."',
          'elif jars[0].default is not inspect.Parameter.empty:',
          '    msg = "grams changes every time, so it should not have a default."',
          'elif jars[1].default != 10:',
          '    msg = "Keep the usual salt: salt_g=10."',
          'elif lines == ["Cook 120 g pasta with 10 g salt", "Cook 100 g pasta with 5 g salt"]:',
          '    ok = True',
          'else:',
          '    msg = "It should print: Cook 120 g pasta with 10 g salt, then Cook 100 g pasta with 5 g salt."'
        ].join('\n'),
        why: '<code>def make_pasta(grams, salt_g=10):</code>. Jars without a default come first, jars with a default after. Then <code>make_pasta(120)</code> knows 120 is the grams.',
        hint: 'Which jar must every call fill? Put it first.'
      },
      {
        type: 'pick', q: 'What does the <b>last</b> line print?',
        pic: code(['def add_item(item, basket=[]):', '    basket.append(item)', '    return basket', '', 'add_item("oats")', 'add_item("milk")', 'print(add_item("salt"))'], { title: 'basket.py' }),
        options: ["['oats', 'milk', 'salt']", "['salt']", "['oats']", 'None'],
        answer: 0,
        why: 'The default <code>[]</code> is made once, when the <code>def</code> line runs. All three calls leave the basket out, so they all drop their item into that same list. The third call hands back the list with all three.',
        hint: 'How many times is the <code>[]</code> on the def line made?'
      },
      {
        type: 'fill', q: 'Fix the card so every call that leaves the basket out gets a fresh, empty basket.',
        text: 'def add_item(item, basket=___):\n    if basket ___ None:\n        basket = ___\n    basket.append(item)\n    return basket',
        options: ['None', 'is', '[]', '=', '0', '""'],
        answer: ['None', 'is', '[]'],
        why: 'The default is the empty jar <code>None</code>. <code>basket is None</code> asks if the jar is still empty (lesson 16). Then <code>[]</code> makes a new list, inside the card, so a new one is made at every call.',
        hint: 'The default is the empty jar from lesson 16. The new list is made inside the card.'
      },
      {
        type: 'pick', q: 'Back to lesson 45. This card prints instead of returning. What does the program show?',
        pic: code(['def porridge(oats_g, salt_g=1):', '    print(f"{oats_g} g oats, {salt_g} g salt")', '', 'note = porridge(60, salt_g=0)', 'print(f"Chloe: {note}")'], { title: 'note.py' }),
        options: ['60 g oats, 0 g salt, then Chloe: None', 'Chloe: 60 g oats, 0 g salt', 'Chloe: None only', '60 g oats, 1 g salt, then Chloe: None'],
        answer: 0,
        why: 'The keyword argument works: salt is 0. But the card <b>prints</b> its text and hands back <code>None</code>, so <code>note</code> holds <code>None</code>. Use <code>return</code> on the card, and print outside it.',
        hint: 'What does a card with no return hand back?'
      },
      {
        type: 'type', q: 'The card is <code>def porridge(oats_g, milk_ml=250, salt_g=1):</code>. Type the call for Chloe: <b>60 g</b> of oats, the usual milk, and <b>no salt</b>.',
        prompt: '>>>',
        answers: ['porridge(60, salt_g=0)'],
        accept: '^porridge\\( ?(oats_g ?= ?60 ?, ?salt_g ?= ?0|60 ?, ?salt_g ?= ?0|salt_g ?= ?0 ?, ?oats_g ?= ?60) ?\\)$',
        why: 'The oats go in plainly, and the salt by name. Milk is left out, so it stays 250. <code>porridge(60, 250, 0)</code> also works, but it repeats the usual milk and hides which number is the salt.',
        hint: 'Pass the oats first, then name the salt jar.'
      }
    ]
  });
})();
