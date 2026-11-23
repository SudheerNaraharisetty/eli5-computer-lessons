/* Lesson 50: Recursion (module 4). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l50  Recursion
     ===================================================================== */

  // A recipe card: name, own minutes, and what it uses. stop: green outline for "uses nothing".
  const card = (x, y, w, name, mins, uses, stop) =>
    box(x, y, w, 74, stop ? P.okT : P.white, 12) +
    T(x + 14, y + 24, name, { s: 15, m: true, a: 'start' }) +
    T(x + w - 14, y + 24, mins, { s: 13, f: P.warn, a: 'end' }) +
    T(x + 14, y + 50, 'uses:', { s: 12, w: 700, f: P.ink2, a: 'start' }) +
    T(x + 52, y + 50, uses, { s: 12, w: 700, f: stop ? P.ok : P.ink2, a: 'start' }) +
    (stop ? T(x + w - 14, y + 64, 'stop', { s: 11.5, f: P.ok, a: 'end' }) : '');

  const ideaPic = svg(600, 342, 'Chloe\'s trifle recipe card uses two other recipes, custard and sponge. The sponge card uses one more recipe, flour mix. Custard and flour mix use nothing, so they are where the counting stops. Trifle takes 15 minutes, custard 20, sponge 25 and flour mix 5: 65 minutes in all.',
    card(190, 14, 220, 'trifle', '15 min', 'custard, sponge') +
    arrow(250, 96, 175, 134, P.ink, 2.5) + arrow(350, 96, 425, 134, P.ink, 2.5) +
    card(40, 138, 220, 'custard', '20 min', 'nothing', true) +
    card(340, 138, 220, 'sponge', '25 min', 'flour mix') +
    arrow(450, 220, 450, 252, P.ink, 2.5) +
    card(340, 256, 220, 'flour mix', '5 min', 'nothing', true) +
    T(150, 250, 'trifle, start to finish:', { s: 13, w: 700, f: P.ink2 }) +
    T(150, 276, '15 + 20 + (25 + 5) = 65 min', { s: 14, m: true, f: P.accent }) +
    T(150, 302, 'the same question, all the way down', { s: 12, w: 700, f: P.ink2 }));

  const layers = [
    'def layers(folds):',
    '    if folds == 0:',
    '        return 1',
    '    return 2 * layers(folds - 1)',
    '',
    'print(layers(1))',
    'print(layers(3))',
    'print(layers(6))'
  ];

  const trace = [
    'def layers(folds):',
    '    print(f"layers({folds}) starts")',
    '    if folds == 0:',
    '        print("layers(0) hands back 1")',
    '        return 1',
    '    below = layers(folds - 1)',
    '    print(f"layers({folds}) hands back {2 * below}")',
    '    return 2 * below',
    '',
    'print(layers(3))'
  ];

  // The pile of plates for layers(3): calls go up, answers come back down.
  const plate = (y, label, back, top) =>
    `<rect x="164" y="${y}" width="272" height="40" rx="12" fill="${top ? P.okT : P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
    T(300, y + 26, label, { s: 15, m: true }) +
    T(470, y + 26, back, { s: 14, m: true, f: P.ok, a: 'start' });
  const pilePic = svg(600, 266, 'A pile of plates. layers(3) is at the bottom, then layers(2), layers(1), and layers(0) on top. Going up, each call waits for the one above it. layers(0) is the stop and hands back 1. Coming down, each plate doubles what it gets: 2, then 4, then 8.',
    `<rect x="140" y="226" width="320" height="12" rx="5" fill="${P.ink}"/>` +
    plate(176, 'layers(3)', '→ 8') + plate(128, 'layers(2)', '→ 4') + plate(80, 'layers(1)', '→ 2') + plate(32, 'layers(0)', '→ 1', true) +
    arrow(110, 210, 110, 44, P.accent, 3) + T(96, 250, 'calls go up', { s: 12.5, w: 700, f: P.accent }) +
    T(48, 130, 'each one', { s: 12, w: 700, f: P.ink2 }) + T(48, 148, 'waits', { s: 12, w: 700, f: P.ink2 }) +
    arrow(560, 44, 560, 210, P.ok, 3) + T(520, 256, 'answers come down', { s: 12.5, w: 700, f: P.ok }) +
    T(300, 20, 'the stop: 0 folds is 1 layer', { s: 12.5, w: 700, f: P.ok }));

  const noStop = [
    'def layers(folds):',
    '    return 2 * layers(folds - 1)',
    '',
    'print(layers(3))'
  ];
  const towerPic = svg(600, 190, 'With no stop, layers(3) calls layers(2), then layers(1), layers(0), layers(-1), layers(-2) and on and on. The pile of plates grows until it hits the ceiling at about 1000, and Python stops with RecursionError.',
    `<line x1="40" y1="14" x2="380" y2="14" stroke="${P.danger}" stroke-width="3" stroke-dasharray="8 6"/>` +
    T(470, 19, 'about 1000 plates', { s: 13, f: P.danger }) +
    ['layers(3)', 'layers(2)', 'layers(1)', 'layers(0)', 'layers(-1)', 'layers(-2)', '…', 'layers(-994)'].map((s, i) => {
      const y = 166 - i * 19;
      return `<rect x="90" y="${y}" width="240" height="16" rx="5" fill="${i === 3 ? P.warnT : P.white}" stroke="${P.ink}" stroke-width="1.8"/>` + T(210, y + 13, s, { s: 11.5, m: true });
    }).join('') +
    `<rect x="70" y="184" width="280" height="6" rx="3" fill="${P.ink}"/>` +
    box(396, 60, 186, 50, P.dangerT, 12) + T(489, 91, 'RecursionError', { s: 14, f: P.danger }) +
    T(489, 136, '0 is passed by,', { s: 12.5, w: 700, f: P.ink2 }) + T(489, 154, 'nothing says stop', { s: 12.5, w: 700, f: P.ink2 }));
  const painPic = `<div style="width:100%;min-width:0">` +
    code(noStop, { title: 'pastry.py, no stop', bad: [2] }) +
    term(['$ python3 pastry.py', 'Traceback (most recent call last):', '  File "pastry.py", line 4, in <module>', '    print(layers(3))', '          ~~~~~~^^^', '  File "pastry.py", line 2, in layers', '    return 2 * layers(folds - 1)', '               ~~~~~~^^^^^^^^^^^', '  File "pastry.py", line 2, in layers', '    return 2 * layers(folds - 1)', '               ~~~~~~^^^^^^^^^^^', '  File "pastry.py", line 2, in layers', '    return 2 * layers(folds - 1)', '               ~~~~~~^^^^^^^^^^^', '  [Previous line repeated 996 more times]', 'RecursionError: maximum recursion depth exceeded'], 'terminal, Python 3.15') +
    towerPic + `</div>`;

  const fixed = [
    'def layers(folds):',
    '    if folds <= 0:                # stop first',
    '        return 1',
    '    return 2 * layers(folds - 1)  # one fold fewer',
    '',
    'print(layers(4))',
    'print(layers(-1))'
  ];
  const rulesPic = svg(600, 120, 'Two rules for a card that calls itself. Rule 1: write the stop, the base case, first. Rule 2: every call must move toward the stop, here one fold fewer each time.',
    box(16, 14, 274, 92, P.okT, 14) + T(153, 44, '1. The stop comes first', { s: 15, f: P.ok }) +
    T(153, 70, 'the base case: no call inside', { s: 12.5, w: 700, f: P.ink2 }) + T(153, 90, 'if folds <= 0: return 1', { s: 12, m: true, f: P.ink2 }) +
    box(310, 14, 274, 92, P.tint, 14) + T(447, 44, '2. Move toward the stop', { s: 15, f: P.accent }) +
    T(447, 70, 'each call gets a smaller job', { s: 12.5, w: 700, f: P.ink2 }) + T(447, 90, 'layers(folds - 1)', { s: 12, m: true, f: P.ink2 }));

  const trifle = [
    'recipes = {',
    '    "trifle": {"minutes": 15, "uses": ["custard", "sponge"]},',
    '    "custard": {"minutes": 20, "uses": []},',
    '    "sponge": {"minutes": 25, "uses": ["flour mix"]},',
    '    "flour mix": {"minutes": 5, "uses": []},',
    '}',
    '',
    'def total_minutes(name):',
    '    recipe = recipes[name]',
    '    if recipe["uses"] == []:',
    '        return recipe["minutes"]',
    '    total = recipe["minutes"]',
    '    for sub in recipe["uses"]:',
    '        total += total_minutes(sub)',
    '    return total',
    '',
    'print(total_minutes("sponge"))',
    'print(total_minutes("trifle"))'
  ];

  const loop = [
    'def layers(folds):',
    '    result = 1',
    '    for fold in range(folds):',
    '        result = result * 2',
    '    return result',
    '',
    'print(layers(3))',
    'print(layers(6))'
  ];
  const whenPic = svg(600, 150, 'Left: doubling a number a few times is a straight line of steps, so a plain loop is clearer. Right: a trifle with custard and sponge inside, and flour mix inside the sponge. Things inside things are where recursion shines.',
    box(16, 14, 274, 122, P.white, 14) + T(153, 40, 'A straight line of steps', { s: 14 }) +
    [0, 1, 2, 3].map(i => `<circle cx="${62 + i * 60}" cy="76" r="16" fill="${P.warnT}" stroke="${P.ink}" stroke-width="2.2"/>` + T(62 + i * 60, 81, String(2 ** i), { s: 13, m: true }) + (i < 3 ? arrow(80 + i * 60, 76, 104 + i * 60, 76, P.ink, 2) : '')).join('') +
    T(153, 122, 'use a loop', { s: 13.5, f: P.ok }) +
    box(310, 14, 274, 122, P.white, 14) + T(447, 40, 'Things inside things', { s: 14 }) +
    `<rect x="328" y="50" width="238" height="56" rx="8" fill="${P.paper2}" stroke="${P.ink}" stroke-width="2"/>` + T(336, 64, 'trifle', { s: 10.5, m: true, a: 'start' }) +
    `<rect x="336" y="68" width="80" height="32" rx="6" fill="${P.warnT}" stroke="${P.ink}" stroke-width="1.8"/>` + T(376, 88, 'custard', { s: 10.5, m: true }) +
    `<rect x="424" y="68" width="134" height="32" rx="6" fill="${P.tint}" stroke="${P.ink}" stroke-width="1.8"/>` + T(450, 88, 'sponge', { s: 10.5, m: true }) +
    `<rect x="480" y="73" width="72" height="22" rx="5" fill="${P.white}" stroke="${P.ink}" stroke-width="1.6"/>` + T(516, 88, 'flour mix', { s: 9.5, m: true }) +
    T(447, 122, 'use recursion', { s: 13.5, f: P.accent }));

  COURSE.add({
    id: 'l50', minutes: 13,
    summary: '<b>Recursion</b> is a function that <b>calls itself</b> to answer a smaller copy of the same question. <code>layers(3)</code> is <code>2 * layers(2)</code>, and so on down. It needs a <b>base case</b>: a stop that answers <b>without</b> calling itself, like <code>if folds == 0: return 1</code>. Each call cooks in its <b>own pan</b> with its own <code>folds</code> (lesson 47), and waits on a <b>pile of plates</b> until the call above hands back its answer. Forget the stop, or never move toward it, and the pile grows to about 1000 plates: <code>RecursionError: maximum recursion depth exceeded</code>. Rules: <b>stop first</b>, and <b>every call moves toward the stop</b>. For simple counting a loop is clearer. Recursion shines for <b>things inside things</b>, like recipes that use recipes.',
    video: {
      src: 'videos/l50-recursion.mp4', poster: 'videos/l50-recursion.jpg', length: '1 min 15 s',
      script: [
        'Chloe wants a trifle. The trifle recipe says: make custard, and make a sponge. The sponge recipe says: make the flour mix. Recipes inside recipes.',
        'How long does it all take? Write one card, total minutes. It takes the recipe\'s own minutes, then calls itself, for each recipe inside.',
        'Every call gets its own pan, and a plate on the pile. Custard uses nothing, so it stops, and hands back 20. Trifle is at 35. Sponge calls flour mix: 5. Sponge hands back 30. The plates come off. 65 minutes in all.',
        'That stop is the base case: a recipe that uses nothing. Now say sponge lists sponge, by mistake. Sponge calls sponge, again and again. The pile grows, and at about 1000 plates, Python stops. Recursion error. Every call must move toward the stop.',
        'For simple counting, a plain loop is often clearer. Recursion shines when things sit inside things.',
        'A recipe can use itself, if it knows when to stop.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'A recipe that uses other recipes.',
        text: [
          'Chloe wants a <b>trifle</b> for dessert. The trifle recipe takes 15 minutes to put together, but first it says: make the <b>custard</b>, and make the <b>sponge</b>. Those are recipes of their own. And the sponge recipe says: first make the gluten-free <b>flour mix</b>. Recipes inside recipes.',
          'How long does the whole trifle take, if you do every step one after another? You ask the <b>same question</b> of each recipe inside it. How long is the sponge? Its own 25 minutes, plus how long the flour mix takes. How long is the flour mix? 5 minutes, and it <b>uses nothing</b>, so you can answer at once. That is where the asking <b>stops</b>.',
          'A function that asks itself the same question about something smaller is called <b>recursive</b>. The idea is called <b>recursion</b>. It is a recipe card that says "to do this, use this same card again, on a smaller job".'
        ],
        tip: 'The recipes live in a dict of dicts with lists inside: nesting, from lesson 41. Recursion is the natural way to walk through data like that, however deep it goes. You build the trifle card in part 5.'
      },
      {
        label: 'The code', pic: `<div style="width:100%;min-width:0">${run(layers, { title: 'pastry.py' })}${pilePic}${run(trace, { title: 'pastry_trace.py' })}</div>`,
        h: 'A card that calls itself, and knows when to stop.',
        text: [
          'Start small. Fold a sheet of pastry dough in half and you have <b>2 layers</b>. Fold it again: 4. Again: 8. How many layers after 3 folds? <b>Twice</b> the layers after 2 folds. That is the same question, one fold smaller.',
          'Line 4 says exactly that: <code>return 2 * layers(folds - 1)</code>. The card <b>calls itself</b>. Lines 2 and 3 are the <b>stop</b>: with 0 folds, the sheet is just <b>1 layer</b>, and the card hands back 1 without calling anything. This stop is called the <b>base case</b>. Press <b>Run</b>: 2, 8 and 64.',
          'What happens inside? <code>layers(3)</code> cannot finish until <code>layers(2)</code> hands back its answer, so it <b>waits</b>. That call waits for <code>layers(1)</code>, which waits for <code>layers(0)</code>. Think of a <b>pile of plates</b>: each new call goes on top. <code>layers(0)</code> hits the stop and hands back 1. Then the plates come off, one by one: 2, 4, 8.',
          'Each call cooks in its <b>own pan</b> (lesson 47). There are four jars called <code>folds</code> at the same time, one per call, holding 3, 2, 1 and 0. They never mix. The second box prints every step so you can watch the pile grow and shrink. Press <b>Run</b>, then change the last line to <code>layers(5)</code>.'
        ],
        tip: 'Python calls this pile the <b>call stack</b>. You will see the word in tracebacks and in the debugger later in the course.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'No stop: the pile hits the ceiling.',
        text: [
          'Delete the stop, and the card still looks fine. <code>layers(3)</code> calls <code>layers(2)</code>, then 1, then 0, then <b>-1, -2, -3</b>... Nothing ever says stop, so each call puts one more plate on the pile.',
          'Python does not let the pile grow forever. At about <b>1000 plates</b> it stops the program: <code>RecursionError: maximum recursion depth exceeded</code>. "Recursion depth" means how tall the pile is. The traceback shows the same line again and again, then says <code>[Previous line repeated 996 more times]</code> instead of printing all of them.',
          'A stop is not enough on its own. The calls must also <b>reach</b> it. With <code>if folds == 0:</code> in place, <code>layers(-1)</code> still fails: it goes to -2, -3, and passes 0 by without ever landing on it. So does a card that calls <code>layers(folds + 1)</code>: it walks <b>away</b> from the stop.'
        ],
        warn: 'In this page\'s Run boxes the number in <code>[Previous line repeated ... more times]</code> can be a little different, because the page\'s Python already uses a few plates. The last line is the same: <code>RecursionError</code>.'
      },
      {
        label: 'The fix', pic: `<div style="width:100%;min-width:0">${rulesPic}${run(noStop, { title: 'pastry.py' })}${run(fixed, { title: 'pastry.py, fixed' })}</div>`,
        h: 'Stop first. Then move toward it.',
        text: [
          'Two rules make a recursive card safe. <b>1. The stop comes first.</b> Write the base case at the top of the card, before the line that calls itself. It answers without calling anything. <b>2. Every call moves toward the stop.</b> Each call gets a <b>smaller</b> job: one fold fewer, one recipe further in.',
          'Press <b>Run</b> on the first box to see the real <code>RecursionError</code>. Then add the stop: <code>if folds == 0:</code> and <code>return 1</code>, pushed in under <code>def</code>, above line 2. Run it again: 8.',
          'The second box is a safer stop. <code>folds &lt;= 0</code> also catches numbers below 0, so <code>layers(-1)</code> hands back 1 (a sheet you never fold) instead of running off past 0. Press <b>Run</b>: 16 and 1.'
        ],
        tip: 'When a recursive card misbehaves, ask two questions. Where is the stop? And does every call get closer to it?'
      },
      {
        label: 'Try it', pic: run(trifle, { title: 'dessert.py' }),
        h: 'Time Chloe\'s trifle.',
        text: [
          'Here are Chloe\'s recipes as nested data. Each one has its own <code>"minutes"</code> and a list of the recipes it <code>"uses"</code>. <code>total_minutes</code> follows the two rules. The stop comes first: a recipe that uses nothing hands back its own minutes. Otherwise it starts with its own minutes and adds <code>total_minutes(sub)</code> for <b>each recipe inside</b>.',
          'Press <b>Run</b>. The sponge is 25 + 5 = <b>30</b>. The trifle is 15 + 20 + 30 = <b>65</b>. The card never needs to know how deep the recipes go. Each call only looks one step in, and trusts the card to do the rest.',
          'Now change it. Add a line to the dict, <code>"berry jam": {"minutes": 25, "uses": []},</code> and add <code>"berry jam"</code> to the trifle\'s uses list. Run it: <b>90</b>.',
          'Then make a mistake on purpose: add <code>"sponge"</code> to the sponge\'s own uses list. Run it. Sponge calls sponge, again and again, and never reaches a recipe that uses nothing: <code>RecursionError</code>. Press Reset to get the good recipes back.'
        ],
        tip: 'The <code>for</code> loop and the recursion work together here. The loop walks across one recipe\'s list. The recursion goes down into each recipe on it.'
      },
      {
        label: 'The catch', pic: `<div style="width:100%;min-width:0">${run(loop, { title: 'pastry_loop.py' })}${whenPic}</div>`,
        h: 'A loop is often clearer.',
        text: [
          'Folding pastry does not need recursion at all. It is a <b>straight line</b> of steps: start at 1, double it, as many times as you fold. A plain <code>for</code> loop (lesson 26) says that more simply. Press <b>Run</b>: 8 and 64, the same answers.',
          'The loop also has no ceiling. <code>layers(5000)</code> with recursion needs a pile of 5000 plates and stops with <code>RecursionError</code>. The loop just goes round 5000 times.',
          'So when is recursion the better choice? When the data has <b>things inside things</b>, and you do not know how deep it goes: recipes that use recipes, folders inside folders, comments with replies to replies. A loop would need one more loop for every level. The recursive card handles any depth with the same few lines.'
        ],
        warn: 'Do not raise the ceiling to make a <code>RecursionError</code> go away. The error almost always means a missing stop, or calls that never get closer to it. Fix the card.'
      }
    ],
    exercises: [
      {
        file: 'l50_trifle_time.py', title: 'Trifle time',
        task: 'Chloe\'s trifle now uses custard, sponge and <b>berry jam</b>, and the sponge uses flour mix. The starter card <code>total_minutes(name)</code> only counts a recipe\'s <b>own</b> minutes, so the sponge shows 25 instead of 30. Make the card <b>call itself</b> for each recipe it uses, with the <b>base case first</b>. The check also tries your card on <b>other recipe trees</b>, some of them deeper.',
        steps: [
          'Press <b>Open in VS Code</b>. Read the task at the top of the file, then run it once. The hint says what is missing.',
          'Between <code>START</code> and <code>END</code>, give the card a stop for recipes that use nothing, and a <code>for</code> loop that adds <code>total_minutes(sub)</code> for each one they use. Save the file.',
          'Run it again. The check says <code>PASS</code> or gives you one hint.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['def layers(folds):', '    if folds == 0:', '        return 1', '    return 2 * layers(folds - 1)', '', 'print(layers(4))'], { title: 'pastry.py' }),
        options: ['16', '8', '32', '4'],
        answer: 0,
        why: '<code>layers(4)</code> is 2 × <code>layers(3)</code>, which is 2 × 2 × <code>layers(2)</code>, and so on down to <code>layers(0)</code>, which is 1. Four doublings of 1: 2, 4, 8, <b>16</b>.',
        hint: 'Start at the stop: layers(0) is 1. Then double it once for each fold.'
      },
      {
        type: 'order', q: 'The tracing card from part 2 runs <code>layers(2)</code>. Put its printed lines in order, top to bottom.',
        items: ['layers(2) starts', 'layers(1) starts', 'layers(0) starts', 'layers(0) hands back 1', 'layers(1) hands back 2', 'layers(2) hands back 4'],
        why: 'The calls go <b>up</b> the pile first: 2, 1, 0. Only <code>layers(0)</code> can answer straight away. Then the plates come off in the <b>opposite</b> order: 0 hands back 1, then 1 hands back 2, then 2 hands back 4.',
        hint: 'No call can hand back its answer until the call above it has answered.'
      },
      {
        type: 'bucket', q: 'The card is <code>def layers(folds):</code> with <code>if folds == 0: return 1</code> on top. Does each call reach the stop, or end in <code>RecursionError</code>?',
        buckets: ['Reaches the stop', 'RecursionError'],
        items: [
          ['layers(3) with return 2 * layers(folds - 1)', 0],
          ['layers(5) with return 2 * layers(folds - 1)', 0],
          ['layers(0) with return 2 * layers(folds + 1)', 0],
          ['layers(3) with return 2 * layers(folds + 1)', 1],
          ['layers(-2) with return 2 * layers(folds - 1)', 1],
          ['layers(3) with the if and return 1 lines deleted', 1]
        ],
        why: 'A call ends only if it lands <b>exactly</b> on the stop. Counting down from 3 or 5 gets to 0. <code>layers(0)</code> is already at the stop, so it never makes a call at all. Counting <b>up</b> from 3, or down from -2, never lands on 0. And with no stop, nothing ends.',
        hint: 'For each one, ask: starting here, and taking these steps, do I ever land exactly on 0?'
      },
      {
        type: 'fix', q: 'This card has no stop, so it ends in <code>RecursionError</code>. Add a base case so it prints <code>8</code>: with 0 folds, hand back 1.',
        code: noStop,
        title: 'pastry.py',
        check: [
          'f = globals().get("layers")',
          'if not callable(f):',
          '    msg = "Keep the card called layers."',
          'else:',
          '    try:',
          '        got = [f(0), f(1), f(5)]',
          '    except RecursionError:',
          '        got = "deep"',
          '    except TypeError:',
          '        got = "type"',
          '    if got == "deep":',
          '        msg = "Some call still never stops. Put  if folds == 0:  and  return 1  at the top of the card."',
          '    elif got == "type":',
          '        msg = "Keep one jar on the card: def layers(folds):"',
          '    elif got[0] != 1:',
          '        msg = "layers(0) handed back " + str(got[0]) + ". With 0 folds the dough is 1 layer: return 1"',
          '    elif got != [1, 2, 32]:',
          '        msg = "layers(1) and layers(5) should be 2 and 32. Keep the last line: return 2 * layers(folds - 1)"',
          '    elif out != "8":',
          '        msg = "The card works now, but the program printed: " + out + ". Keep print(layers(3)) as the only print."',
          '    else:',
          '        ok = True'
        ].join('\n'),
        why: 'The stop goes first: <code>if folds == 0:</code> then <code>return 1</code>, pushed in under the <code>def</code>. Now <code>layers(3)</code> goes up the pile to <code>layers(0)</code>, gets 1, and doubles its way back down: 2, 4, 8. (<code>if folds &lt;= 0:</code> works too.)',
        hint: 'Two new lines at the top of the card: an if that checks for 0 folds, and a return that hands back 1.'
      },
      {
        type: 'pick', q: 'Back to lesson 47: every call cooks in its own pan. What does this print?',
        pic: code(['def layers(folds):', '    if folds == 0:', '        return 1', '    below = layers(folds - 1)', '    print(f"folds is {folds}")', '    return 2 * below', '', 'layers(2)'], { title: 'pans.py' }),
        options: ['folds is 1, then folds is 2', 'folds is 2, then folds is 1', 'folds is 0, then folds is 0', 'folds is 2, then folds is 2'],
        answer: 0,
        why: 'Each call has its <b>own</b> jar called <code>folds</code>, in its own pan. <code>layers(2)</code> stops at line 4 and waits for <code>layers(1)</code>, which waits for <code>layers(0)</code>. Coming back down, <code>layers(1)</code> prints first with its 1. Then <code>layers(2)</code> prints with its own 2, which no other call changed. <code>layers(0)</code> returns before the print, so it prints nothing.',
        hint: 'The print is <b>after</b> the call on line 4. Which call gets past line 4 first?'
      },
      {
        type: 'pick', q: 'Back to lesson 41: nested data. Chloe\'s rice pudding uses rice and a berry sauce. What does this print?',
        pic: code(['recipes = {', '    "pudding": {"minutes": 10, "uses": ["rice", "sauce"]},', '    "rice": {"minutes": 25, "uses": []},', '    "sauce": {"minutes": 5, "uses": ["berries"]},', '    "berries": {"minutes": 3, "uses": []},', '}', '', 'def total_minutes(name):', '    recipe = recipes[name]', '    if recipe["uses"] == []:', '        return recipe["minutes"]', '    total = recipe["minutes"]', '    for sub in recipe["uses"]:', '        total += total_minutes(sub)', '    return total', '', 'print(total_minutes("pudding"))'], { title: 'pudding.py' }),
        options: ['43', '40', '10', '35'],
        answer: 0,
        why: 'The sauce is its own 5 plus the berries\' 3: 8. The pudding is its own 10, plus rice 25, plus sauce 8: <b>43</b>. 40 forgets the berries, which sit one level deeper.',
        hint: 'Work from the inside out: berries, then sauce, then pudding.'
      },
      {
        type: 'fill', q: 'Finish the card so <code>layers(3)</code> hands back 8, and every call moves toward the stop.',
        text: 'def layers(folds):\n    if folds ___ 0:\n        return ___\n    return 2 * layers(folds ___ 1)',
        options: ['==', '1', '-', '+', '0', '2'],
        answer: ['==', '1', '-'],
        why: 'The stop is <code>folds == 0</code>, and a sheet with no folds is <code>1</code> layer. <code>folds - 1</code> makes each call one fold smaller, so it moves toward the stop. With <code>+</code> it would walk away from it, and <code>return 0</code> would make every answer 0.',
        hint: 'What is the smallest number of folds, how many layers does it have, and which way should folds go?'
      },
      {
        type: 'pick', q: 'Which job is the best fit for recursion?',
        options: ['Adding up the minutes of recipes that use recipes that use recipes', 'Printing the numbers 1 to 10', 'Adding up the prices on one shopping list', 'Doubling the layers for each of 6 folds'],
        answer: 0,
        why: 'The recipes are <b>things inside things</b>, and you do not know how deep they go. A recursive card handles any depth. The other three are a straight line of steps, where a plain loop is shorter and clearer.',
        hint: 'Which one has things inside things?'
      }
    ]
  });
})();
