/* Lesson 81: sorted, map and filter (module 7). One file per lesson.
   Output checked with Python 3.15.2 (Homebrew, macOS) and Python 3.14.4 on 2026-11-23.
   The Run boxes were also checked in this page (Pyodide, Python 3.14). */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l81  sorted, map and filter
     ===================================================================== */

  // Tonight's four dishes, in SERVING order. Protein in grams, kcal per serving.
  const DISHES = [
    'dishes = [',
    '    {"name": "bean chili", "protein": 15, "kcal": 380, "gluten_free": True},',
    '    {"name": "tofu stir-fry", "protein": 24, "kcal": 350, "gluten_free": False},',
    '    {"name": "lentil soup", "protein": 18, "kcal": 320, "gluten_free": True},',
    '    {"name": "pasta bake", "protein": 22, "kcal": 610, "gluten_free": False},',
    ']'
  ];
  const SERVE = [['bean chili', 15, true], ['tofu stir-fry', 24, false], ['lentil soup', 18, true], ['pasta bake', 22, false]];

  const chip = (x, y, w, s, fill, col) => box(x, y, w, 26, fill || P.white, 8) + T(x + w / 2, y + 18, s, { s: 11.5, w: 700, f: col || P.ink });

  /* ---- The idea: one counter, three machines ---- */
  const ideaSvg = svg(600, 252, 'Left: the counter with tonight\'s four dishes in serving order: bean chili 15 g, tofu stir-fry 24 g, lentil soup 18 g, pasta bake 22 g. Bean chili and lentil soup are gluten-free. Three arrows go to three machines. sorted lines them up: a new list, 24, 22, 18, 15. filter keeps some: only bean chili and lentil soup get through. map changes each one: protein times 4 gives 60, 96, 72 and 88 kcal.',
    T(92, 22, 'dishes (serving order)', { s: 11.5, w: 700, f: P.ink2 }) +
    SERVE.map((d, i) => box(14, 34 + i * 52, 156, 44, P.white, 10) +
      T(24, 54 + i * 52, d[0], { s: 12, w: 700, a: 'start' }) +
      T(24, 71 + i * 52, d[1] + ' g', { s: 11.5, m: true, a: 'start', f: P.ok }) +
      (d[2] ? T(160, 71 + i * 52, 'GF', { s: 10.5, w: 800, a: 'end', f: P.ok }) : '')).join('') +
    [['sorted', 'line up', P.accent, P.tint], ['filter', 'keep some', P.ok, P.okT], ['map', 'change each', P.warn, P.warnT]].map((m, i) => {
      const y = 34 + i * 74;
      return arrow(178, y + 28, 206, y + 28, P.ink2, 2.5) +
        box(212, y, 124, 56, m[3], 12) +
        T(274, y + 25, m[0], { s: 15, m: true, f: m[2] }) +
        T(274, y + 44, m[1], { s: 11, w: 700, f: P.ink2 }) +
        arrow(340, y + 28, 360, y + 28, P.ink2, 2.5);
    }).join('') +
    [24, 22, 18, 15].map((n, i) => chip(366 + i * 56, 38, 50, n + ' g')).join('') +
    T(366, 84, 'a NEW list, most protein first', { s: 11, w: 700, a: 'start', f: P.ink2 }) +
    chip(366, 112, 104, 'bean chili', P.okT, P.ok) + chip(476, 112, 108, 'lentil soup', P.okT, P.ok) +
    T(366, 158, 'only the gluten-free ones', { s: 11, w: 700, a: 'start', f: P.ink2 }) +
    [60, 96, 72, 88].map((n, i) => chip(366 + i * 56, 186, 50, String(n))).join('') +
    T(366, 232, 'kcal from protein: grams x 4', { s: 11, w: 700, a: 'start', f: P.ink2 }));
  const threeTools = [...DISHES, '',
    'by_protein = sorted(dishes, key=lambda d: d["protein"], reverse=True)',
    'print("Ben:", [d["name"] for d in by_protein])',
    '',
    'safe = list(filter(lambda d: d["gluten_free"], dishes))',
    'print("Chloe:", [d["name"] for d in safe])',
    '',
    'kcal = list(map(lambda d: d["protein"] * 4, dishes))',
    'print("Ana:", kcal)',
    '',
    'print("Serving order:", [d["name"] for d in dishes])'
  ];
  const ideaPic = `<div style="width:100%;min-width:0">${ideaSvg}${run(threeTools, { title: 'three_tools.py' })}</div>`;

  /* ---- The code: sorted, key, reverse, and a two-part key ---- */
  const lineUp = [...DISHES, '',
    'ben = sorted(dishes, key=lambda d: d["protein"], reverse=True)',
    'for dish in ben:',
    '    print(dish["protein"], dish["name"])',
    '',
    'chloe = sorted(dishes, key=lambda d: (not d["gluten_free"], -d["protein"]))',
    'print("Chloe:", [d["name"] for d in chloe])',
    'print("Serving order:", [d["name"] for d in dishes])'
  ];
  const KEYS = [['bean chili', 'False', '-15'], ['tofu stir-fry', 'True', '-24'], ['lentil soup', 'False', '-18'], ['pasta bake', 'True', '-22']];
  const SORTED_KEYS = [KEYS[2], KEYS[0], KEYS[1], KEYS[3]];
  const keyRow = (x, y, k) => box(x, y, 262, 30, k[1] === 'False' ? P.okT : P.white, 8) +
    T(x + 10, y + 20, k[0], { s: 12, w: 700, a: 'start' }) +
    T(x + 252, y + 20, '(' + k[1] + ', ' + k[2] + ')', { s: 12, m: true, a: 'end', f: k[1] === 'False' ? P.ok : P.danger });
  const tupleSvg = svg(600, 218, 'Left, serving order, with the key of each dish: bean chili (False, -15), tofu stir-fry (True, -24), lentil soup (False, -18), pasta bake (True, -22). Right, sorted by the key: lentil soup (False, -18), bean chili (False, -15), tofu stir-fry (True, -24), pasta bake (True, -22). The first item decides first: False before True, so gluten-free comes first. The second item only breaks a tie: -18 is smaller than -15, so 18 grams comes before 15 grams.',
    T(145, 20, 'the key of each dish', { s: 11.5, w: 700, f: P.ink2 }) +
    T(455, 20, 'sorted by the key', { s: 11.5, w: 700, f: P.ink2 }) +
    KEYS.map((k, i) => keyRow(14, 32 + i * 38, k)).join('') +
    arrow(282, 104, 316, 104, P.ink2, 3) +
    SORTED_KEYS.map((k, i) => keyRow(324, 32 + i * 38, k)).join('') +
    T(300, 194, 'first item first: False comes before True, so gluten-free leads', { s: 11.5, w: 700, f: P.ink2 }) +
    T(300, 212, 'a tie? the second item decides: -18 is smaller than -15', { s: 11.5, w: 700, f: P.ink2 }));
  const codePic = `<div style="width:100%;min-width:0">${run(lineUp, { title: 'line_up.py' })}${tupleSvg}</div>`;

  /* ---- The pain: .sort() inside a helper moves the serving plan ---- */
  const servingPlan = [...DISHES, '',
    'def bens_list(dishes):',
    '    dishes.sort(key=lambda d: d["protein"], reverse=True)',
    '    return [d["name"] for d in dishes]',
    '',
    'print("Ben:", bens_list(dishes))',
    'print("Serving plan:")',
    'for number, dish in enumerate(dishes, start=1):',
    '    print(number, dish["name"])'
  ];
  const trapTerm = term([
    '$ python3 plan.py',
    'Traceback (most recent call last):',
    '  File "/Users/ben/kitchen/plan.py", line 9, in <module>',
    '    for dish in dishes:',
    '                ^^^^^^',
    "TypeError: 'NoneType' object is not iterable"
  ], 'line 8: dishes = dishes.sort(...), Python 3.15');
  const painPic = `<div style="width:100%;min-width:0">${run(servingPlan, { title: 'serving_plan.py' })}${trapTerm}</div>`;

  /* ---- The fix: sorted() makes a new list ---- */
  const servingFixed = [...DISHES, '',
    'def bens_list(dishes):',
    '    ranked = sorted(dishes, key=lambda d: d["protein"], reverse=True)',
    '    return [d["name"] for d in ranked]',
    '',
    'print("Ben:", bens_list(dishes))',
    'print("Serving plan:")',
    'for number, dish in enumerate(dishes, start=1):',
    '    print(number, dish["name"])'
  ];

  /* ---- Try it: map and filter ---- */
  const mapFilter = [...DISHES, '',
    'names = [d["name"] for d in dishes]',
    '',
    'loud = map(str.upper, names)',
    'print(loud)',
    'print(list(loud))',
    '',
    'safe = filter(lambda d: d["gluten_free"], dishes)',
    'print([d["name"] for d in safe])',
    '',
    'print(list(map(lambda d: d["protein"] * 4, dishes)))',
    'print([d["protein"] * 4 for d in dishes])'
  ];
  const sameSvg = svg(600, 150, 'Each tool next to the comprehension that does the same job. map(str.upper, names) is like [n.upper() for n in names]. filter(lambda d: d["gluten_free"], dishes) is like [d for d in dishes if d["gluten_free"]]. map(lambda d: d["protein"] * 4, dishes) is like [d["protein"] * 4 for d in dishes]. The first is neat: a named card and no lambda. For the other two, the comprehension reads more clearly.',
    [['map(str.upper, names)', '[n.upper() for n in names]', 'neat: a named card'],
      ['filter(lambda d: d["gluten_free"], dishes)', '[d for d in dishes if d["gluten_free"]]', 'clearer as a comprehension'],
      ['map(lambda d: d["protein"] * 4, dishes)', '[d["protein"] * 4 for d in dishes]', 'clearer as a comprehension']].map((r, i) => {
      const y = 10 + i * 46, good = i === 0;
      return box(14, y, 572, 38, good ? P.okT : P.white, 8) +
        T(24, y + 17, r[0], { s: 11, m: true, a: 'start', f: good ? P.ok : P.ink2 }) +
        T(24, y + 32, '= ' + r[1], { s: 11, m: true, a: 'start', f: good ? P.ink2 : P.ok }) +
        T(576, y + 25, r[2], { s: 10.5, w: 800, a: 'end', f: good ? P.ok : P.ink2 });
    }).join(''));
  const tryPic = `<div style="width:100%;min-width:0">${run(mapFilter, { title: 'map_filter.py' })}${sameSvg}</div>`;

  /* ---- The catch: a map can be used once, and capitals sort first ---- */
  const once = [...DISHES, '',
    'kcal = map(lambda d: d["protein"] * 4, dishes)',
    'print("Ana:", list(kcal))',
    'print("Total:", sum(kcal))'
  ];
  const onceSvg = svg(600, 120, 'kcal is a map object: a machine that makes each answer when asked. The first list(kcal) asks for every answer and gets 60, 96, 72, 88. The machine is now used up. The second time, sum(kcal) gets nothing, so the total is 0.',
    box(14, 30, 150, 60, P.warnT, 12) + T(89, 56, 'kcal', { s: 15, m: true, f: P.warn }) + T(89, 76, 'map object', { s: 11, w: 700, f: P.ink2 }) +
    arrow(170, 60, 206, 60, P.ink2, 2.5) + T(188, 22, '1st', { s: 11, w: 800, f: P.ink2 }) +
    [60, 96, 72, 88].map((n, i) => chip(212 + i * 46, 47, 40, String(n), P.okT, P.ok)).join('') +
    arrow(400, 60, 436, 60, P.ink2, 2.5) + T(418, 22, '2nd', { s: 11, w: 800, f: P.ink2 }) +
    `<rect x="442" y="38" width="144" height="44" rx="10" fill="${P.white}" stroke="${P.danger}" stroke-width="2.5" stroke-dasharray="7 5"/>` +
    T(514, 66, 'empty: 0', { s: 13, m: true, f: P.danger }) +
    T(300, 112, 'a map or filter hands out each answer once, then it is used up', { s: 11.5, w: 700, f: P.ink2 }));
  const capitals = [
    'names = ["pasta bake", "Bean chili", "lentil soup", "Tofu stir-fry"]',
    'print(sorted(names))',
    'print(sorted(names, key=str.lower))',
    'print(names)'
  ];
  const catchPic = `<div style="width:100%;min-width:0">${onceSvg}${run(once, { title: 'once.py' })}${run(capitals, { title: 'capitals.py' })}</div>`;

  COURSE.add({
    id: 'l81', minutes: 14,
    summary: 'Three tools take a function and a list. <code>sorted(dishes, key=lambda d: d["protein"], reverse=True)</code> <b>lines up</b> the items and hands back a <b>new list</b>. The original keeps its order. <code>.sort()</code> changes the list <b>in place</b> and hands back <code>None</code>, so <code>dishes = dishes.sort()</code> throws your list away (lesson 34), and a <code>.sort()</code> hidden in a function quietly reorders the caller\'s list. A <b>tuple</b> key sorts by two things: <code>key=lambda d: (not d["gluten_free"], -d["protein"])</code> puts gluten-free first, then most protein first. Dishes that tie keep their old order. <code>filter(func, items)</code> <b>keeps</b> the items where the function says True. <code>map(func, items)</code> <b>changes each</b> item by running the function on it. Both are <b>lazy</b>: <code>print(map(...))</code> shows <code>&lt;map object at 0x...&gt;</code>, so wrap them in <code>list()</code>. A comprehension is usually clearer: <code>[d["protein"] * 4 for d in dishes]</code>. map shines with a named card and no lambda: <code>map(str.upper, names)</code>. The catch: a map or filter can be used <b>once</b>. The second <code>list()</code> gives <code>[]</code> and the second <code>sum()</code> gives 0, with no error. Capitals sort first, so sort words with <code>key=str.lower</code>.',
    video: {
      src: 'videos/l81-sorted-map-filter.mp4', poster: 'videos/l81-sorted-map-filter.jpg', length: '1 min 11 s',
      script: [
        'Tonight, 4 dishes sit on the counter, in the order you will serve them. Ben lifts weights, so he wants them lined up by protein. Sorted, with a key, does it. 24, 22, 18, 15 grams. And look. The counter still has the serving order. Sorted made a new list.',
        'Now try dishes dot sort, and put its answer back in dishes. Sort works in place, and hands back None. Your list is gone. An empty plate.',
        'Chloe is gluten-free. Filter is a sieve. It keeps a dish only when the function says true. Bean chili and lentil soup get through.',
        'Ana wants the calories from protein. Map sends every dish through the same function. Protein times 4. 60, 96, 72, 88.',
        'One catch. Map and filter hand back a lazy object, so wrap it in list. And use it once. The second time, it is empty.',
        'Sorted makes a new ordered list. Map changes each item. Filter keeps some.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Line up, keep some, change each.',
        text: [
          'Tonight Kitchen Coach has four dishes on the counter, in the order you will <b>serve</b> them. Each friend wants something different from that one list. Ben wants them <b>lined up</b> by protein. Chloe wants to <b>keep</b> only the gluten-free ones. Ana wants every dish <b>changed</b> into a number: the kcal that come from its protein, 4 kcal per gram.',
          'Python has a tool for each job, and all three work the same way: you hand them a <b>function</b> (a recipe card, lesson 80) and a list. <code>sorted</code> uses the card to decide the order. <code>filter</code> asks the card about each item and keeps the ones where it says <code>True</code>. <code>map</code> runs the card on each item and collects the answers.',
          'Press <b>Run</b> on <code>three_tools.py</code>. Ben gets tofu stir-fry first. Chloe gets bean chili and lentil soup. Ana gets <code>[60, 96, 72, 88]</code>. And the last line shows the counter itself: still in serving order. Each tool made something <b>new</b>.'
        ],
        tip: 'The <code>list(...)</code> around <code>filter</code> and <code>map</code> is needed. Try it, below, shows what you get without it.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'sorted: a new list, in any order you want.',
        text: [
          'You met <code>sorted</code> in lesson 34 and gave it a <code>key</code> in lesson 80. Here it is again for Ben: <code>key=lambda d: d["protein"]</code> weighs each dish by its protein, and <code>reverse=True</code> puts the biggest first. It hands back a <b>new list</b> and leaves <code>dishes</code> alone.',
          'Chloe wants two things at once: gluten-free dishes first, and within them, the most protein first. Give the key a <b>tuple</b> (lesson 36). Python compares tuples item by item, like a dictionary compares words letter by letter: the first item decides, and the second one only breaks a tie. <code>not d["gluten_free"]</code> is <code>False</code> for a gluten-free dish, and <code>False</code> comes before <code>True</code>. The minus in <code>-d["protein"]</code> turns 18 into -18, so bigger protein comes <b>first</b>.',
          'Press <b>Run</b>. Chloe\'s line starts with lentil soup (18 g), then bean chili (15 g), then the two with gluten. Now take out the minus in front of <code>d["protein"]</code>. Say the new order out loud, then run it.'
        ],
        tip: 'Dishes that tie on the whole key keep the order they had. That is called a <b>stable</b> sort, and Python\'s sort is always stable.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'A helper that sorted the serving plan.',
        text: [
          'Kitchen Coach has a small helper, <code>bens_list</code>, that makes Ben\'s ranking. Inside it, someone used <code>.sort()</code>. It gives Ben the right list. Then the program prints the serving plan with <code>enumerate</code> (lesson 77).',
          'Press <b>Run</b> on <code>serving_plan.py</code>. The plan now starts with tofu stir-fry and ends with bean chili. That is Ben\'s protein order, not the serving order. No error, no warning. The parameter <code>dishes</code> inside the function is just another label on the <b>same list</b> (lesson 31\'s "two names, one list"), and <code>.sort()</code> changed that list <b>in place</b>.',
          'And the older trap is still there. Write <code>dishes = dishes.sort(...)</code> and the jar holds <code>None</code> (lesson 34). The next loop stops with <code>TypeError: \'NoneType\' object is not iterable</code>, as in the terminal below.'
        ],
        warn: 'When a list changes order and you never asked it to, look for a <code>.sort()</code> on it, often far away, inside a function.'
      },
      {
        label: 'The fix', pic: run(servingFixed, { title: 'serving_plan_fixed.py' }),
        h: 'sorted() makes a new list. The plan stays put.',
        text: [
          'Change one line. <code>ranked = sorted(dishes, key=..., reverse=True)</code> builds a <b>new</b> list for Ben, and the function returns the names from that. <code>dishes</code> is never touched.',
          'Press <b>Run</b>. Ben still gets tofu stir-fry, pasta bake, lentil soup, bean chili. And the serving plan is back: 1 bean chili, 2 tofu stir-fry, 3 lentil soup, 4 pasta bake.',
          'So which one when? Use <code>sorted()</code> when the list belongs to someone else, or you still need its old order. Use <code>.sort()</code>, on its own line, only when you <b>want</b> the list itself changed, like a list you just built yourself.'
        ],
        tip: 'Then go back to <code>serving_plan.py</code> in The pain and fix it there yourself.'
      },
      {
        label: 'Try it', pic: tryPic,
        h: 'map and filter, and the comprehension next to them.',
        text: [
          '<b><code>map(card, items)</code> changes each item.</b> <code>str.upper</code> is the recipe card behind <code>"pasta".upper()</code> (lesson 9), so <code>map(str.upper, names)</code> runs it on every name. Press <b>Run</b>. The first print shows <code>&lt;map object at 0x...&gt;</code>, not names. Like <code>zip</code> in lesson 77, map is <b>lazy</b>: it makes each answer only when asked. <code>list(...)</code> asks for all of them. (The number after <code>0x</code> changes each run.)',
          '<b><code>filter(card, items)</code> keeps some.</b> It asks the card about each dish and keeps the ones where the answer is <code>True</code>. A <code>for</code> loop or a comprehension can read a filter directly, as line 15 does.',
          '<b>Compare the last two lines.</b> They print the same list. The comprehension from lesson 76 needs no lambda and reads like a sentence, so it is usually the clearer choice in Python. map is neat when the card already has a name, like <code>str.upper</code> or <code>len</code>. Now change <code>str.upper</code> to <code>len</code>. Say the four numbers before you run it.'
        ],
        tip: 'A quick rule: a named card, no lambda? <code>map</code> or <code>filter</code> is fine. Writing a lambda just to use them? Write a comprehension.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Used once, then empty. And capitals first.',
        text: [
          '<b>A map or filter can be used only once.</b> It hands out each answer one time. Press <b>Run</b> on <code>once.py</code>. <code>list(kcal)</code> gets all four numbers, and the map is now used up. So <code>sum(kcal)</code> adds up nothing and prints <code>Total: 0</code>. No error. Fix it: wrap the map in <code>list()</code> on line 8, so <code>kcal</code> is a real list. Then the total is <code>316</code>. Lesson 82, Iterators, shows why it runs out.',
          '<b>Capitals sort first.</b> Lesson 34 warned you: to Python, every capital letter comes before every small letter. So <code>"Tofu stir-fry"</code> lands before <code>"lentil soup"</code>. The fix is a key: <code>key=str.lower</code> compares the lower-case version of each name, but hands back the names as they were. Press <b>Run</b> on <code>capitals.py</code>. And the last line shows <code>names</code> itself, untouched.'
        ],
        warn: 'Need the answers more than once? Store <code>list(map(...))</code>, or use a comprehension, which always builds a real list.'
      }
    ],
    exercises: [
      {
        file: 'l81_line_up.py', title: 'Line up',
        task: 'Finish three functions for Kitchen Coach, without ever changing the serving order. <code>ben_ranking</code> returns a <b>new</b> list, most protein first. <code>chloe_safe</code> returns a <b>list</b> of the gluten-free dishes, using <code>filter</code>. <code>loud_names</code> returns a <b>list</b> of the names in capitals, using <code>map</code> and <code>str.upper</code>.',
        steps: [
          'Press <b>Open in VS Code</b> and run the file. The starter uses <code>.sort()</code>, so the check finds a moved serving plan first.',
          'Between <code>START</code> and <code>END</code>, fix each function. Run it after each one. STEP 1 shows what each function gives back and the serving order after it.',
          'Run it until it says <code>PASS</code>. The check also tries a second menu.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does the last line print?',
        pic: code([...DISHES, 'ranked = sorted(dishes, key=lambda d: d["protein"], reverse=True)', 'print(ranked[0]["name"], "/", dishes[0]["name"])'], { title: 'first.py' }),
        options: ['tofu stir-fry / bean chili', 'tofu stir-fry / tofu stir-fry', 'bean chili / bean chili', 'None / bean chili'],
        answer: 0,
        why: '<code>sorted</code> hands back a <b>new</b> list, most protein first, so <code>ranked[0]</code> is tofu stir-fry. <code>dishes</code> keeps its serving order, so <code>dishes[0]</code> is still bean chili.',
        hint: 'Does sorted change dishes?'
      },
      {
        type: 'fix', q: 'Back to lesson 34. This stops with <code>TypeError: \'NoneType\' object is not iterable</code>. Fix it so it prints the four names, most protein first.',
        code: [...DISHES, '', 'dishes = dishes.sort(key=lambda d: d["protein"], reverse=True)', 'for dish in dishes:', '    print(dish["name"])'],
        title: 'ranking.py',
        check: [
          'want = "tofu stir-fry\\npasta bake\\nlentil soup\\nbean chili"',
          'got = out.strip()',
          'if got == want:',
          '    ok = True',
          'elif "NoneType" in got:',
          '    msg = "Still None. .sort() hands back None. Use ranked = sorted(dishes, ...) and loop over ranked."',
          'elif got == "bean chili\\nlentil soup\\npasta bake\\ntofu stir-fry":',
          '    msg = "That is least protein first. Keep reverse=True."',
          'else:',
          '    msg = "It printed:\\n" + got + "\\nYou want tofu stir-fry, pasta bake, lentil soup, bean chili."'
        ].join('\n'),
        why: '<code>.sort()</code> sorts in place and hands back <code>None</code>, and the <code>=</code> put that <code>None</code> in <code>dishes</code>. Write <code>ranked = sorted(dishes, key=lambda d: d["protein"], reverse=True)</code> and loop over <code>ranked</code>. (<code>dishes.sort(...)</code> on its own line works too, but changes the serving order.)',
        hint: 'Which one hands back a new list: .sort() or sorted()?'
      },
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['names = ["oats", "rice"]', 'print(map(str.upper, names))'], { title: 'shout.py' }),
        options: ['<map object at 0x...>', '[\'OATS\', \'RICE\']', 'OATS RICE', 'None'],
        answer: 0,
        why: 'map is <b>lazy</b>. It makes each answer only when asked, so print shows the map object itself. <code>print(list(map(str.upper, names)))</code> shows <code>[\'OATS\', \'RICE\']</code>.',
        hint: 'Remember what print(zip(...)) showed in lesson 77.'
      },
      {
        type: 'fix', q: 'Ana\'s total says <code>Total: 0</code>. Fix it so it prints <code>Ana: [60, 96, 72, 88]</code> and then <code>Total: 316</code>.',
        code: once, title: 'once.py',
        check: [
          'got = out.strip()',
          'if got == "Ana: [60, 96, 72, 88]\\nTotal: 316":',
          '    ok = True',
          'elif "Total: 0" in got:',
          '    msg = "Still 0. The first list(kcal) used the map up. Make kcal a real list on line 8: kcal = list(map(...))"',
          'else:',
          '    msg = "It printed:\\n" + got + "\\nYou want  Ana: [60, 96, 72, 88]  then  Total: 316"'
        ].join('\n'),
        why: 'A map hands out each answer once. <code>list(kcal)</code> on line 9 used it up, so <code>sum(kcal)</code> got nothing. Make <code>kcal = list(map(lambda d: d["protein"] * 4, dishes))</code>, or <code>kcal = [d["protein"] * 4 for d in dishes]</code>. A list can be read as often as you like.',
        hint: 'Turn kcal into a list once, on the line where it is made.'
      },
      {
        type: 'match', q: 'Back to lesson 76. Match each tool to the comprehension that builds the same list.',
        pairs: [
          ['list(map(str.upper, names))', '<code>[n.upper() for n in names]</code>'],
          ['list(filter(lambda d: d["gluten_free"], dishes))', '<code>[d for d in dishes if d["gluten_free"]]</code>'],
          ['list(map(lambda g: g * 4, grams))', '<code>[g * 4 for g in grams]</code>'],
          ['list(filter(lambda g: g > 20, grams))', '<code>[g for g in grams if g &gt; 20]</code>']
        ],
        why: 'map is the "what" part of a comprehension: every item, changed. filter is the "which" part: some items, unchanged.',
        hint: 'filter never changes an item. It only keeps or drops it.'
      },
      {
        type: 'bucket', q: 'What does each one hand back?',
        buckets: ['A new list', 'None (it changes the list)', 'A lazy object: wrap it in list()'],
        items: [
          ['sorted(dishes, key=lambda d: d["kcal"])', 0],
          ['sorted(names, key=str.lower)', 0],
          ['dishes.sort(key=lambda d: d["kcal"])', 1],
          ['names.sort(reverse=True)', 1],
          ['map(len, names)', 2],
          ['filter(lambda d: d["gluten_free"], dishes)', 2]
        ],
        why: '<code>sorted</code> always builds a new list. <code>.sort()</code> changes the list in place and hands back <code>None</code>. <code>map</code> and <code>filter</code> hand back lazy objects that make each answer when asked.',
        hint: 'Is there a dot before sort?'
      },
      {
        type: 'order', q: 'Put the dishes in the order this key gives: <code>sorted(dishes, key=lambda d: (not d["gluten_free"], -d["protein"]))</code>.',
        items: ['lentil soup (gluten-free, 18 g)', 'bean chili (gluten-free, 15 g)', 'tofu stir-fry (gluten, 24 g)', 'pasta bake (gluten, 22 g)'],
        why: 'The first item of the key decides first: gluten-free dishes get <code>False</code>, and <code>False</code> comes before <code>True</code>. Inside each group, <code>-18</code> is smaller than <code>-15</code>, so the most protein comes first.',
        hint: 'Gluten-free first. Then, inside each group, which protein number comes first?'
      },
      {
        type: 'fill', q: 'Keep Chloe\'s gluten-free dishes, then sort some names with no care for capitals.',
        text: 'safe = list(___(lambda d: d["gluten_free"], dishes))\nprint(sorted(names, key=str.___))',
        options: ['filter', 'lower', 'map', 'strip', 'sort', 'sorted'],
        answer: ['filter', 'lower'],
        why: '<code>filter</code> keeps the dishes where the card says <code>True</code>. <code>key=str.lower</code> compares the names in lower case, so capitals no longer jump to the front.',
        hint: 'One tool keeps some items. The other card makes every letter small.'
      }
    ]
  });
})();
