/* Lesson 54: Raising errors (module 5). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l54  Raising errors
     ===================================================================== */

  // A plate with a number on it. bad: red.
  const plate = (x, y, v, bad) =>
    `<rect x="${x}" y="${y}" width="88" height="40" rx="20" fill="${bad ? P.dangerT : P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
    T(x + 44, y + 26, v, { s: 15, m: true, f: bad ? P.danger : P.ok });

  // Ben's day adds up silently wrong: one typo, no error.
  const daySum = (mid, total, label, note) => svg(600, 152, `Ben's day, added up: 10.4 plus ${mid} plus 18.0 plus 15.6 makes ${total}. It should be 69.5. ${note}`,
    T(20, 22, label, { s: 13, w: 700, f: P.ink2, a: 'start' }) +
    plate(12, 40, '10.4') + T(112, 66, '+', { s: 18 }) +
    plate(124, 40, mid, true) + T(224, 66, '+', { s: 18 }) +
    plate(236, 40, '18.0') + T(336, 66, '+', { s: 18 }) +
    plate(348, 40, '15.6') + T(452, 66, '=', { s: 18 }) +
    box(470, 34, 118, 52, P.dangerT, 12) + T(529, 67, total, { s: 19, m: true, f: P.danger }) +
    T(168, 122, 'tofu', { s: 12.5, w: 700, f: P.danger }) +
    arrow(168, 108, 168, 88, P.danger, 2) +
    T(529, 110, 'should be 69.5', { s: 12.5, w: 700, f: P.ok }) +
    T(300, 144, note, { s: 13, w: 700, f: P.danger }));

  // One recipe card with a guard at the top. ok: the value passes. Otherwise the guard raises a flag.
  const guardCard = (x, ok) => {
    const c = x + 140;
    return T(c, 20, ok ? 'protein_in(150, 17)' : 'protein_in(-150, 17)', { s: 14.5, m: true, f: ok ? P.ok : P.danger }) +
      '<g transform="translate(0,34)">' +
      box(x + 20, 40, 240, 220, P.warnT, 18) +
      T(x + 40, 68, 'protein_in', { s: 14, m: true, a: 'start' }) +
      `<rect x="${x + 34}" y="82" width="212" height="42" rx="10" fill="${ok ? P.okT : P.dangerT}" stroke="${ok ? P.ok : P.danger}" stroke-width="2.5" stroke-dasharray="6 5"/>` +
      T(c, 108, ok ? 'grams < 0? no' : 'grams < 0? yes', { s: 13.5, m: true, f: ok ? P.ok : P.danger }) +
      (ok
        ? arrow(c, 128, c, 156, P.ok, 2.5) + T(c, 178, '150 * 17 / 100', { s: 13, m: true, f: P.ink2 }) +
          `<rect x="${c - 38}" y="236" width="76" height="22" fill="${P.ink}"/>` + T(c, 252, 'return', { s: 12, m: true, f: P.white }) +
          arrow(c, 258, c, 280, P.ok, 3) +
          `<ellipse cx="${c}" cy="300" rx="62" ry="18" fill="${P.okT}" stroke="${P.ink}" stroke-width="2.5"/>` + T(c, 306, '25.5', { s: 16, m: true, f: P.ok }) +
          T(c, 342, 'cooks, hands back 25.5', { s: 12.5, w: 700, f: P.ok })
        : `<line x1="${x + 236}" y1="40" x2="${x + 236}" y2="-2" stroke="${P.ink}" stroke-width="4"/>` +
          `<path d="M${x + 236} 0 L${x + 150} 0 L${x + 160} 13 L${x + 150} 26 L${x + 236} 26 Z" fill="${P.danger}" stroke="${P.ink}" stroke-width="2"/>` +
          T(x + 196, 18, 'raise', { s: 11.5, m: true, f: P.white }) +
          T(c, 178, '150 * 17 / 100', { s: 13, m: true, f: P.mute }) +
          `<path d="M${c - 70} 160 L${c + 70} 192 M${c + 70} 160 L${c - 70} 192" stroke="${P.danger}" stroke-width="3" stroke-linecap="round"/>` +
          T(c, 226, 'never runs', { s: 12.5, w: 700, f: P.danger }) +
          box(x + 6, 270, 268, 62, P.dangerT, 12) +
          T(c, 294, 'ValueError: grams must be', { s: 12.5, m: true, f: P.danger }) +
          T(c, 316, '0 or more, got -150', { s: 12.5, m: true, f: P.danger }) +
          T(c, 352, 'refuses, loudly, with a message', { s: 12.5, w: 700, f: P.danger })) +
      '</g>';
  };
  const guardPic = svg(600, 394, 'Two copies of the protein_in card, each with a guard at the top that checks grams < 0. With 150 the guard says no, the card cooks and hands back 25.5. With -150 the guard says yes and raises a red flag: ValueError: grams must be 0 or more, got -150. The cooking line never runs.',
    guardCard(0, true) + guardCard(310, false));

  const ideaPic = `<div style="width:100%;min-width:0">${daySum('-25.5', '18.5', 'Ben\'s day: oats 80 g, tofu -150 g (a typo), lentils 200 g, eggs 120 g', 'No error. Just a wrong number.')}${guardPic}</div>`;

  const guard = [
    'def protein_in(grams, per_100g):',
    '    if grams < 0:',
    '        raise ValueError(f"grams must be 0 or more, got {grams}")',
    '    return grams * per_100g / 100',
    '',
    'print(protein_in(150, 17))',
    'print(protein_in(-150, 17))',
    'print("Lunch is served")'
  ];

  const minus1 = [
    'protein = {"oats": 13, "tofu": 17, "lentils": 9, "eggs": 13}',
    '',
    'def protein_in(grams, per_100g):',
    '    if grams < 0:',
    '        return -1    # -1 means "bad grams"',
    '    return grams * per_100g / 100',
    '',
    'day = [("oats", 80), ("tofu", -150), ("lentils", 200), ("eggs", 120)]',
    'total = 0',
    'for food, grams in day:',
    '    total += protein_in(grams, protein[food])',
    'print(f"Ben\'s day: {total} g protein")'
  ];
  const painPic = `<div style="width:100%;min-width:0">` +
    run(minus1, { title: 'day.py, -1 means bad' }) +
    daySum('-1', '43.0', 'The caller never checks for -1, so it is added like any other number', 'Still no error. Still a wrong number.') +
    term(['# The same card with  return None  instead of  return -1:', '$ python3 day.py', 'Traceback (most recent call last):', '  File "day.py", line 11, in <module>', '    total += protein_in(grams, protein[food])', "TypeError: unsupported operand type(s) for +=: 'float' and 'NoneType'"], 'terminal') + `</div>`;

  const fixed = [
    'protein = {"oats": 13, "tofu": 17, "lentils": 9, "eggs": 13}',
    '',
    'def protein_in(grams, per_100g):',
    '    if grams < 0:',
    '        raise ValueError(f"grams must be 0 or more, got {grams}")',
    '    return grams * per_100g / 100',
    '',
    'day = [("oats", 80), ("tofu", -150), ("lentils", 200), ("eggs", 120)]',
    'total = 0',
    'for food, grams in day:',
    '    try:',
    '        total += protein_in(grams, protein[food])',
    '    except ValueError as err:',
    '        print(f"Check {food}: {err}")',
    'print(f"Ben\'s day: {total} g protein")'
  ];

  const kinds = [
    'def protein_in(grams, per_100g):',
    '    if isinstance(grams, str):',
    '        raise TypeError(f"grams must be a number, not the text \'{grams}\'")',
    '    if grams < 0:',
    '        raise ValueError(f"grams must be 0 or more, got {grams}")',
    '    return grams * per_100g / 100',
    '',
    'for grams, per_100g in [(150, 17), ("150", 17), (-150, 17), (150, 170)]:',
    '    try:',
    '        print(protein_in(grams, per_100g))',
    '    except TypeError as err:',
    '        print(f"Wrong kind: {err}")',
    '    except ValueError as err:',
    '        print(f"Bad value: {err}")'
  ];

  // Three ways to refuse. Only one says what was wrong, and the value.
  const msgRow = (y, line, verdict, why, good) =>
    box(16, y, 568, 58, good ? P.okT : P.dangerT, 12) +
    T(32, y + 25, line, { s: 12, m: true, f: P.ink, a: 'start' }) +
    T(32, y + 46, why, { s: 12, w: 700, f: good ? P.ok : P.danger, a: 'start' }) +
    `<circle cx="556" cy="${y + 29}" r="14" fill="${good ? P.ok : P.danger}" stroke="${P.ink}" stroke-width="2"/>` +
    T(556, y + 34, verdict, { s: 14, f: P.white });
  const catchPic = svg(600, 236, 'Three ways to refuse. raise ValueError("bad input") does not say which value or why. raise Exception("oops") is too broad and says nothing. raise ValueError with an f-string saying grams must be 0 or more, got the value, says what was wrong and shows the value.',
    msgRow(10, 'raise ValueError("bad input")', '✗', 'Which input? What was it? Nobody can tell.', false) +
    msgRow(86, 'raise Exception("oops")', '✗', 'Too broad, and says nothing. Pick a fitting type.', false) +
    msgRow(162, 'raise ValueError(f"grams must be 0 or more, got {grams}")', '✓', 'What was wrong, and the value: got -150.', true));

  COURSE.add({
    id: 'l54', minutes: 12,
    summary: 'When a function gets an input that makes no sense, it should <b>refuse loudly</b> instead of cooking a wrong answer. Put a <b>guard</b> at the top of the card: <code>if grams &lt; 0:</code> then <code>raise ValueError(f"grams must be 0 or more, got {grams}")</code>. <code>raise</code> stops the function at once, like a burnt dish that explains itself. Pick a fitting built-in type: <b>ValueError</b> for a bad value of the right kind, <b>TypeError</b> for the wrong kind of thing. A good message says <b>what was wrong and the value</b>. Do not return a special value like <code>-1</code> or <code>None</code> to mean "bad": the caller forgets to check, and the bad number slips into the sums. The caller can still catch your error with <code>try</code> and <code>except</code> (lesson 53).',
    video: {
      src: 'videos/l54-raising-errors.mp4', poster: 'videos/l54-raising-errors.jpg', length: '1 min 7 s',
      script: [
        'Ben logs his food for the day. Oats, tofu, lentils and eggs. The protein card from lesson 45 adds it up.',
        'But one line has a typo. -150 grams of tofu. The card hands back -25.5, and the day says 18.5. It should be 69.5. No error. Just a wrong number.',
        'Some cooks return -1 to mean bad. But the caller forgets to check, and -1 slides into the total. Still wrong.',
        'Better: a guard at the top of the card. If grams is below 0, raise a ValueError, with a message. Grams must be 0 or more, got -150. The card refuses, right where the problem starts. The message says what was wrong, and the value.',
        'The caller can catch it with try and except. Ben fixes the typo. 69.5.',
        'If the ingredients are wrong, refuse loudly with raise.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Refuse to cook it wrong.',
        text: [
          'Ben logs his food for the day, and Kitchen Coach adds up his protein with the card from lesson 45: <code>protein_in(grams, per_100g)</code>. Oats, tofu, lentils and eggs make <b>69.5 g</b>.',
          'One day he types <b>-150</b> grams of tofu. A typo. The card does not care: -150 * 17 / 100 is <b>-25.5</b>, so it hands that back. The day now says <b>18.5 g</b>. No error, no warning. Just a <b>wrong number</b>, and Ben eats too little protein all week.',
          'A good cook <b>refuses</b> to cook with a broken ingredient, and says why. A function can do the same. A <b>guard</b> at the top of the card checks the ingredients. If one makes no sense, the card <b>raises an error</b>: it stops, and explains itself, like the burnt dishes in lessons 52 and 53. Only this time, <b>you</b> lit the fire on purpose.'
        ],
        tip: 'Lessons 52 and 53 were about errors that Python raises: <code>int("two")</code> raises a <code>ValueError</code>. Now <b>your own</b> functions raise them, with your own message.'
      },
      {
        label: 'The code', pic: run(guard, { title: 'guard.py' }),
        h: 'raise stops the card and says why.',
        text: [
          'Lines 2 and 3 are the <b>guard</b>. Line 2 asks: is <code>grams</code> below 0? If it is, line 3 runs: <code>raise</code>, then an error <b>type</b>, then a <b>message</b> in brackets. <code>ValueError</code> is the built-in type for "right kind of thing, wrong value". A number is fine. Minus 150 is not.',
          'The message is an <b>f-string</b> (lesson 15), so <code>{grams}</code> fills in the real value. The message says <b>what was wrong</b> and <b>what came in</b>: <code>grams must be 0 or more, got -150</code>.',
          '<code>raise</code> works like a loud <code>return</code>. The card <b>stops at once</b>. Line 4 never runs, and nothing is handed back. Press <b>Run</b>: 25.5 for the good call, then the traceback from lesson 52. Read it from the bottom: the type, your message, and the line with <code>raise</code>. <code>Lunch is served</code> never appears.',
          'Now change <code>-150</code> on line 7 to <code>0</code> and run it again. You get <code>0.0</code>: no tofu is not an error, so the guard lets it through.'
        ],
        tip: 'Checks like this go at the <b>top</b> of the function, before any cooking. That is why it is called a <b>guard clause</b>: it guards the door, so the rest of the card only ever sees good ingredients.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'A special value like -1 gets forgotten.',
        text: [
          'Some people refuse in a quieter way: the card <b>returns a special value</b> that means "bad", like <code>-1</code> or <code>None</code>. Then every caller is supposed to check for it.',
          'But the caller on line 11 just adds whatever comes back. Nobody remembered that <code>-1</code> is a secret code. Press <b>Run</b>: <code>Ben\'s day: 43.0 g protein</code>. The -1 slid into the total like any other number. Still wrong, and still <b>no error</b>.',
          '<code>None</code> is no better. This time Python does stop, at line 11, with a <code>TypeError</code> about <code>NoneType</code>. That error points at the <b>sum</b>, far from the real problem, and it never says "the tofu was -150". You go hunting.'
        ],
        warn: 'A special value is a promise that <b>every</b> caller checks it, forever. One caller forgets, and the bad number flows into sums, files and shopping lists. An error cannot be forgotten: it stops the program until someone deals with it.'
      },
      {
        label: 'The fix', pic: run(fixed, { title: 'day.py' }),
        h: 'Raise, and let the caller catch it.',
        text: [
          'The card raises a <code>ValueError</code> instead of returning -1. Now the problem <b>stops right where it starts</b>, at the tofu line, with a message that names it.',
          'The caller decides what to do about it. Here it uses <code>try</code> and <code>except</code> from lesson 53: keep the <code>try</code> block small, catch the <b>specific</b> type, <code>ValueError</code>, and <code>as err</code> gives you the error. <code>{err}</code> in an f-string shows <b>your message</b>.',
          'Press <b>Run</b>: <code>Check tofu: grams must be 0 or more, got -150</code>, then a total of 44.0 for the other three foods. Nothing is hidden: the program says exactly which line to fix. Change <code>-150</code> to <code>150</code> and run it: 69.5.'
        ],
        tip: 'Raise where you can <b>see</b> the problem (inside the card). Catch where you can <b>do something</b> about it (the caller, who knows it is Ben\'s log). The card does not need to know who is calling it.'
      },
      {
        label: 'Try it', pic: run(kinds, { title: 'kinds.py' }),
        h: 'Pick the type that fits.',
        text: [
          'Python has many built-in error types. Two cover most guards. <b>TypeError</b>: the wrong <b>kind</b> of thing, like the text <code>"150"</code> from <code>input()</code> (lesson 14) where a number belongs. <b>ValueError</b>: the right kind, but a <b>value</b> that makes no sense, like -150.',
          'Line 2 checks the kind first with <code>isinstance</code> (lesson 13). Without it, <code>"150" &lt; 0</code> would stop with a confusing TypeError of Python\'s own. Two <code>except</code> lines: Python uses the first one whose type matches. Press <b>Run</b>.',
          'The last order is <code>(150, 170)</code>: 170 g of protein in 100 g of food. Impossible, yet the card returns 255.0. Add a third guard after line 5: if <code>per_100g</code> is above 100, raise a <code>ValueError</code> with a message like <code>per_100g must be 100 or less, got 170</code>. Run it until the last line says <code>Bad value: ...</code>.'
        ],
        tip: 'Use the built-in types. People already know what <code>ValueError</code> and <code>TypeError</code> mean, and they can catch them by name. Later you can make your own error types, like <code>KitchenError</code>: that needs classes, in lesson 66 (Classes) and lesson 70 (Inheritance).'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Raise for nonsense, with a message that helps.',
        text: [
          '<b>Say what was wrong, and the value.</b> <code>ValueError("bad input")</code> makes the reader guess. <code>raise Exception("oops")</code> is worse: <code>Exception</code> is so broad that a caller cannot catch it without catching every other error too. Name the problem, show what came in, and pick a fitting type.',
          '<b>Only raise for input that makes no sense.</b> 0 grams is a skipped meal, not an error. An empty day is just an empty day. If a value is unusual but possible, handle it. Raise when the card <b>cannot do its job</b> honestly.',
          '<b>Do not raise and catch in the same card</b> just to hide it. A card that catches its own error and returns -1 brings back the pain from part 3.'
        ],
        warn: 'You may see <code>assert</code> in other people\'s code, as a quick check. It is not a guard for real input: Python can be told to skip every <code>assert</code>. Lesson 89, Testing with pytest, shows where <code>assert</code> belongs. For guards, use <code>if</code> and <code>raise</code>.'
      }
    ],
    exercises: [
      {
        file: 'l54_guard_the_card.py', title: 'Guard the card',
        task: 'Chloe is making porridge for a crowd. Put <b>two guards</b> at the top of <code>scale_recipe(grams, people)</code>: raise a <code>ValueError</code> for grams below 0, and for people below 1. Each message must say <b>what was wrong</b> and show <b>the bad value</b>. The check tries your card with other values too, so the message has to be an f-string.',
        steps: [
          'Press <b>Open in VS Code</b>. Run the file once: the card cooks anything, so it prints <code>Cook -240 g</code> and <code>Cook 0 g</code>.',
          'Between <code>START</code> and <code>END</code>, add the two guards before the <code>return</code> line. Save the file.',
          'Run it again. The orders now print <code>Refused: ...</code> twice, and the check says <code>PASS</code> or gives you one hint.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['def protein_in(grams, per_100g):', '    if grams < 0:', '        raise ValueError(f"grams must be 0 or more, got {grams}")', '    return grams * per_100g / 100', '', 'print(protein_in(0, 17))'], { title: 'zero.py' }),
        options: ['0.0', 'ValueError: grams must be 0 or more, got 0', 'None', 'Nothing at all'],
        answer: 0,
        why: '<code>0 &lt; 0</code> is False, so the guard lets 0 through. 0 * 17 / 100 is 0.0. No tofu is a fine answer, not an error.',
        hint: 'Is 0 below 0?'
      },
      {
        type: 'bucket', q: 'The card is <code>scale_recipe(grams, people)</code>. Which error type fits each bad call best?',
        buckets: ['ValueError', 'TypeError'],
        items: [
          ['scale_recipe(-80, 3)', 0],
          ['scale_recipe(80, 0)', 0],
          ['scale_recipe(80, -2)', 0],
          ['scale_recipe("80", 3)', 1],
          ['scale_recipe(None, 3)', 1],
          ['scale_recipe([80], 3)', 1]
        ],
        why: 'A number that makes no sense (-80 grams, 0 people) is the right kind with a bad value: <code>ValueError</code>. Text, <code>None</code> or a list where a number belongs is the wrong kind of thing: <code>TypeError</code>.',
        hint: 'Is it a number with a silly value, or not a number at all?'
      },
      {
        type: 'fix', q: 'This card returns <code>-1</code> to mean "bad", and callers forget to check. Make it <b>raise a ValueError</b> instead, with a message that shows the bad value, like <code>grams must be 0 or more, got -150</code>. Keep the last two lines as they are.',
        code: ['def protein_in(grams, per_100g):', '    if grams < 0:', '        return -1', '    return grams * per_100g / 100', '', 'print(protein_in(150, 17))'],
        title: 'card.py',
        check: [
          'def _try(g):',
          '    try:',
          '        back = protein_in(g, 17)',
          '    except ValueError as e:',
          '        return "VE", str(e)',
          '    except Exception as e:',
          '        return type(e).__name__, str(e)',
          '    return "ret", repr(back)',
          'a, b = _try(-150), _try(-80)',
          'if out.strip() != "25.5":',
          '    msg = "The program should still print 25.5 for protein_in(150, 17). It printed: " + out.strip()',
          'elif a[0] == "ret":',
          '    msg = "protein_in(-150, 17) still returns " + a[1] + ". Replace return -1 with raise ValueError(...)"',
          'elif a[0] != "VE":',
          '    msg = "protein_in(-150, 17) raised " + a[0] + ". A bad value of the right kind is a ValueError."',
          'elif "-150" not in a[1] or "-80" not in b[1]:',
          '    msg = "The message is: " + a[1] + ". Show the bad value with an f-string: f\\"grams must be 0 or more, got {grams}\\""',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: 'Line 3 becomes <code>raise ValueError(f"grams must be 0 or more, got {grams}")</code>. Good calls still return 25.5. A bad call can no longer slip into a sum: it stops and says why.',
        hint: 'Swap <code>return -1</code> for <code>raise ValueError(...)</code>, and put <code>{grams}</code> inside an f-string message.'
      },
      {
        type: 'pick', q: 'Ben calls <code>protein_in(-150, 17)</code>. Which message helps him most?',
        options: [
          'ValueError: grams must be 0 or more, got -150',
          'ValueError: bad input',
          'Exception: oops',
          'ValueError: -150'
        ],
        answer: 0,
        why: 'It says <b>what</b> was wrong (grams must be 0 or more) <b>and the value</b> that came in (-150). "bad input" hides both. A bare -150 shows the value but not the rule. <code>Exception</code> is too broad to catch on its own.',
        hint: 'Look for the one that names the rule and the value.'
      },
      {
        type: 'order', q: 'Put the lines of <code>split_cake</code> in order: a guard at the top, then the cooking.',
        items: ['def split_cake(kcal, slices):', '    if slices < 1:', '        raise ValueError(f"slices must be 1 or more, got {slices}")', '    return kcal / slices'],
        why: 'The <code>def</code> line first, then the guard (the <code>if</code> and its <code>raise</code>, pushed in one more step), then the real work. Guards go before any cooking, so <code>kcal / 0</code> can never happen.',
        hint: 'The guard checks the ingredients before anything is cooked.'
      },
      {
        type: 'pick', q: 'Back to lesson 53. What happens when you run this?',
        pic: code(['def scale_recipe(grams, people):', '    if people < 1:', '        raise ValueError(f"people must be 1 or more, got {people}")', '    return grams * people', '', 'try:', '    print(scale_recipe(80, 0))', 'except TypeError as err:', '    print(f"Refused: {err}")'], { title: 'catch.py' }),
        options: [
          'The ValueError is not caught: the program stops with a traceback',
          'It prints Refused: people must be 1 or more, got 0',
          'It prints 0',
          'It prints Refused: and nothing else'
        ],
        answer: 0,
        why: '<code>except TypeError</code> only catches a <code>TypeError</code>. The card raises a <code>ValueError</code>, so it flies straight past and stops the program. Catch the type you raise: <code>except ValueError as err:</code>.',
        hint: 'Which type is raised, and which type does the except line catch?'
      },
      {
        type: 'fill', q: 'Finish the guard so <code>scale_recipe(80, -2)</code> stops with <code>ValueError: people must be 1 or more, got -2</code>.',
        text: 'if people < 1:\n    ___ ValueError(f"people must be 1 or more, got {___}")',
        options: ['raise', 'return', 'print', 'people', 'grams', '-2'],
        answer: ['raise', 'people'],
        why: '<code>raise</code> throws the error. <code>{people}</code> fills in whatever value came in, so the message is right for -2, 0, or anything else. A fixed <code>-2</code> would be wrong for every other call.',
        hint: 'One word throws the error. The other blank is the jar whose value you want to show.'
      },
      {
        type: 'pick', q: 'Why is <code>raise ValueError(...)</code> better than <code>return -1</code> for bad grams?',
        options: [
          'A caller cannot forget it: the program stops right where the problem is, with a message',
          'It makes the function run faster',
          'return -1 is a syntax error in Python',
          'raise fixes the bad value for you'
        ],
        answer: 0,
        why: 'A special value only works if every caller checks it, and one day a caller forgets. A raised error stops the program until someone catches it on purpose. It never fixes anything for you: it tells you what to fix.',
        hint: 'What happened to Ben\'s total when the card returned -1?'
      }
    ]
  });
})();
