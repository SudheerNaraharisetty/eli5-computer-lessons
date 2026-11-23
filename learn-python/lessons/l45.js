/* Lesson 45: Parameters and return (module 4). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l45  Parameters and return
     ===================================================================== */

  // An empty jar on the recipe card: a parameter. val fills it (an argument).
  const jar = (x, y, name, val, col) =>
    `<rect x="${x}" y="${y}" width="112" height="62" rx="12" fill="${val ? P.white : P.paper2}" stroke="${P.ink}" stroke-width="2.5" stroke-dasharray="${val ? '' : '6 5'}"/>` +
    `<rect x="${x + 30}" y="${y - 9}" width="52" height="10" rx="4" fill="${P.ink}"/>` +
    (val ? T(x + 56, y + 40, val, { s: 20, m: true, f: col }) : '') +
    T(x + 56, y + 84, name, { s: 13.5, m: true, f: P.ink2 });

  const chipS = (x, y, v, col) => `<rect x="${x - 30}" y="${y - 17}" width="60" height="34" rx="9" fill="${col}" stroke="${P.ink}" stroke-width="2.5"/>` + T(x, y + 6, v, { s: 16, m: true, f: P.white });

  const ideaPic = svg(600, 380, 'The recipe card protein_in has two empty jars on it, called grams and per_100g. These are the parameters. The call protein_in(150, 17) drops 150 into grams and 17 into per_100g. These are the arguments. The card works out grams times per_100g divided by 100, and return hands 25.5 back out of the chute, onto a plate.',
    T(300, 24, 'protein_in(150, 17)', { s: 17, m: true, f: P.accent }) +
    T(56, 24, 'the call', { s: 12.5, w: 700, f: P.ink2, a: 'start' }) +
    chipS(228, 58, '150', P.accent) + chipS(372, 58, '17', P.accent) +
    arrow(228, 78, 228, 118, P.accent, 2.5) + arrow(372, 78, 372, 118, P.accent, 2.5) +
    T(470, 52, 'arguments:', { s: 12.5, w: 700, f: P.accent, a: 'start' }) +
    T(470, 68, 'the values you', { s: 12.5, w: 700, f: P.accent, a: 'start' }) +
    T(470, 84, 'pass in', { s: 12.5, w: 700, f: P.accent, a: 'start' }) +
    box(130, 100, 340, 186, P.warnT, 18) +
    T(300, 132, 'recipe card: protein_in', { s: 14.5, m: true }) +
    jar(172, 152, 'grams', '150', P.accent) + jar(316, 152, 'per_100g', '17', P.accent) +
    T(300, 268, 'grams * per_100g / 100', { s: 14, m: true, f: P.ink2 }) +
    T(56, 176, 'parameters:', { s: 12.5, w: 700, f: P.ink2, a: 'start' }) +
    T(56, 192, 'named jars,', { s: 12.5, w: 700, f: P.ink2, a: 'start' }) +
    T(56, 208, 'filled at', { s: 12.5, w: 700, f: P.ink2, a: 'start' }) +
    T(56, 224, 'each call', { s: 12.5, w: 700, f: P.ink2, a: 'start' }) +
    `<rect x="262" y="286" width="76" height="22" fill="${P.ink}"/>` + T(300, 302, 'return', { s: 12.5, m: true, f: P.white }) +
    arrow(300, 308, 300, 330, P.ok, 3) +
    `<ellipse cx="300" cy="352" rx="70" ry="20" fill="${P.okT}" stroke="${P.ink}" stroke-width="2.5"/>` + T(300, 359, '25.5', { s: 18, m: true, f: P.ok }) +
    T(390, 346, 'the dish comes back:', { s: 12.5, w: 700, f: P.ok, a: 'start' }) +
    T(390, 362, 'the call IS 25.5', { s: 12.5, w: 700, f: P.ok, a: 'start' }));

  const lunch = [
    'def protein_in(grams, per_100g):',
    '    return grams * per_100g / 100',
    '',
    'tofu = protein_in(150, 17)',
    'lentils = protein_in(200, 9)',
    'total = tofu + lentils',
    'print(f"Tofu: {tofu} g")',
    'print(f"Lentils: {lentils} g")',
    'print(f"Ben\'s lunch: {total} g protein")'
  ];

  const printing = [
    'def protein_in(grams, per_100g):',
    '    print(grams * per_100g / 100)',
    '',
    'total = protein_in(150, 17) + protein_in(200, 9)',
    'print(f"Ben\'s lunch: {total} g protein")'
  ];
  const missing = [
    'def protein_in(grams, per_100g):',
    '    return grams * per_100g / 100',
    '',
    'tofu = protein_in(150)'
  ];
  const painPic = `<div style="width:100%;min-width:0">` +
    code(printing, { title: 'lunch.py, the card prints', bad: [2, 4] }) +
    term(['$ python3 lunch.py', '25.5', '18.0', 'Traceback (most recent call last):', '  File "lunch.py", line 4, in <module>', '    total = protein_in(150, 17) + protein_in(200, 9)', '            ~~~~~~~~~~~~~~~~~~~~^~~~~~~~~~~~~~~~~~~~', "TypeError: unsupported operand type(s) for +: 'NoneType' and 'NoneType'"], 'terminal') +
    code(missing, { title: 'tofu.py, one argument short', bad: [4] }) +
    term(['$ python3 tofu.py', 'Traceback (most recent call last):', '  File "tofu.py", line 4, in <module>', '    tofu = protein_in(150)', "TypeError: protein_in() missing 1 required positional argument: 'per_100g'"], 'terminal') + `</div>`;

  const showVsHand = svg(600, 170, 'Two recipe cards. The one with print shows 25.5 on the screen, but hands back an empty plate, None. The one with return hands back a plate with 25.5 on it, ready to store, add or print.',
    box(20, 16, 270, 136, P.dangerT, 16) +
    T(155, 44, 'print(...) on the card', { s: 14, m: true, f: P.danger }) +
    box(44, 60, 110, 40, '#15132B', 8) + T(99, 86, '25.5', { s: 15, m: true, f: '#7CF0B5' }) +
    T(99, 120, 'on the screen', { s: 12, w: 700, f: P.ink2 }) +
    `<ellipse cx="226" cy="84" rx="48" ry="16" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` + T(226, 90, 'None', { s: 14, m: true, f: P.danger }) +
    T(226, 120, 'handed back', { s: 12, w: 700, f: P.ink2 }) +
    T(155, 142, 'people see it. the code gets nothing.', { s: 11.5, w: 700, f: P.danger }) +
    box(310, 16, 270, 136, P.okT, 16) +
    T(445, 44, 'return ... on the card', { s: 14, m: true, f: P.ok }) +
    `<ellipse cx="445" cy="84" rx="56" ry="18" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` + T(445, 90, '25.5', { s: 15, m: true, f: P.ok }) +
    T(445, 124, 'handed back to the caller', { s: 12, w: 700, f: P.ink2 }) +
    T(445, 142, 'store it, add it, print it.', { s: 11.5, w: 700, f: P.ok }));

  const coach = [
    'protein = {"tofu": 17, "lentils": 9, "eggs": 13}',
    '',
    'def protein_in(grams, per_100g):',
    '    return grams * per_100g / 100',
    '',
    'lunch = [("tofu", 150), ("lentils", 200)]',
    'total = 0',
    'for food, grams in lunch:',
    '    total += protein_in(grams, protein[food])',
    'print(f"Ben\'s lunch: {total} g protein")'
  ];

  const early = [
    'def protein_in(grams, per_100g):',
    '    if grams <= 0:',
    '        return 0',
    '    return grams * per_100g / 100',
    '    print("Done!")    # never runs',
    '',
    'print(protein_in(150, 17))',
    'print(protein_in(0, 17))'
  ];

  COURSE.add({
    id: 'l45', minutes: 12,
    summary: '<b>Parameters</b> are the named empty jars on a recipe card: <code>def protein_in(grams, per_100g):</code>. Each call fills them with <b>arguments</b>, in order: <code>protein_in(150, 17)</code> puts 150 in <code>grams</code> and 17 in <code>per_100g</code>. <code>return</code> <b>hands a value back</b> to the caller, so the call <b>becomes</b> that value: you can store it, add it or print it. <code>return</code> also ends the function right away. A function that only <b>prints</b> hands back <code>None</code>, so <code>None + None</code> stops with a <code>TypeError</code>. The wrong number of arguments stops with a <code>TypeError</code> too.',
    video: {
      src: 'videos/l45-parameters-and-return.mp4', poster: 'videos/l45-parameters-and-return.jpg', length: '1 min 4 s',
      script: [
        'Ben wants the protein in his lunch. Kitchen Coach needs one recipe card that works for any food, in any amount.',
        'So the card gets 2 empty jars: grams, and per 100 grams. They are called parameters.',
        'Call protein in, with 150, and 17. These arguments drop into the jars, in order. The card does the maths, and return hands the dish back. 25.5.',
        'The call becomes that value. You can store it, add it, or print it.',
        'Lentils: 200 grams, at 9. 18. Add them up. 43.5.',
        'Now break it. The card prints instead of returning. The number shows on the screen, but the chute hands back an empty plate. None. And None plus None is a type error.',
        'Fix it. Return the value, and print outside the card.',
        'Parameters bring ingredients in. Return hands the dish back.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Ingredients in, a dish out.',
        text: [
          'Ben lifts weights and counts his protein. For lunch he has <b>150 g of tofu</b> (17 g of protein in every 100 g) and <b>200 g of lentils</b> (9 g in every 100 g). How much protein is that?',
          'In lesson 44 you wrote recipe cards with <code>def</code>. Those cards always cooked the <b>same</b> thing. Kitchen Coach needs one card that works for <b>any food and any amount</b>. So the card gets <b>empty jars</b> with names on them: <code>grams</code> and <code>per_100g</code>. These named jars are called <b>parameters</b>.',
          'Each time you use the card, you fill the jars. <code>protein_in(150, 17)</code> puts 150 in <code>grams</code> and 17 in <code>per_100g</code>. The values you pass in are called <b>arguments</b>. The card does the maths, and <code>return</code> <b>hands the dish back</b> to you.'
        ],
        tip: 'Parameter or argument? The <b>parameter</b> is the jar written on the card (<code>grams</code>). The <b>argument</b> is what you put in it at the call (<code>150</code>). Many programmers mix the two words up, and that is fine. The idea is what matters.'
      },
      {
        label: 'The code', pic: run(lunch, { title: 'lunch.py' }),
        h: 'The call becomes the value.',
        text: [
          'Line 1 names the card and its two jars, inside the brackets, separated by a comma. Line 2 says <code>return</code>, then the value to hand back: <code>grams * per_100g / 100</code>. Inside the card, the jars work like any variable.',
          'Line 4 calls the card with <b>two arguments</b>. They fill the jars <b>in order</b>: the first argument goes into the first jar, the second into the second. The card works out 150 * 17 / 100, which is <b>25.5</b>, and returns it. So the whole call <code>protein_in(150, 17)</code> <b>becomes 25.5</b>, and <code>tofu = </code> puts it in a jar.',
          'Line 5 uses the <b>same card</b> with new arguments: 200 * 9 / 100 is <b>18.0</b> (<code>/</code> always gives a float, lesson 7). Line 6 adds the two: <b>43.5</b>. Press <b>Run</b>.',
          'Now Ben adds 100 g of eggs (13 g per 100 g). Add a line <code>eggs = protein_in(100, 13)</code>, add <code>eggs</code> to the total, and run it again. Is it 56.5?'
        ],
        tip: 'Every call starts with fresh, empty jars. The 150 from line 4 is gone by line 5. Nothing leaks from one call into the next.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'The card prints, and hands back None.',
        text: [
          '<b>Pain 1: print instead of return.</b> This card <b>prints</b> its answer. Run it, and 25.5 and 18.0 appear on the screen. It looks like it works. Then line 4 stops with a <code>TypeError</code>.',
          'Why? <code>print</code> shows a value to <b>people</b>. It does not hand anything back to the <b>program</b>. A function with no <code>return</code> hands back <code>None</code>, the empty jar from lesson 16. So line 4 becomes <code>None + None</code>, and Python cannot add two empty plates. It is the same trap as <code>shopping = shopping.sort()</code> in lesson 34: a tool that hands back <code>None</code>.',
          '<b>Pain 2: one argument short.</b> The card has two jars, but <code>protein_in(150)</code> brings only one ingredient. Python will not guess. It stops and names the empty jar: <code>missing 1 required positional argument: \'per_100g\'</code>. Three arguments stop too: <code>takes 2 positional arguments but 3 were given</code>.'
        ],
        warn: 'When you see <code>NoneType</code> in an error, ask: where did this None come from? Very often it is a function that <b>prints</b> its answer instead of <b>returning</b> it.'
      },
      {
        label: 'The fix', pic: `<div style="width:100%;min-width:0">${run(printing, { title: 'lunch.py' })}${showVsHand}</div>`,
        h: 'Return the value. Print outside the card.',
        text: [
          'The card should <b>hand back</b> the protein, not show it. Change line 2 to <code>return grams * per_100g / 100</code>. Press <b>Run</b>: no more 25.5 and 18.0 floating around, just <code>Ben\'s lunch: 43.5 g protein</code>.',
          'Now the program decides what to do with each number. Store it, add it, round it, or print it. Printing happens <b>once</b>, <b>outside</b> the card, where you choose the words.',
          'A good rule: a card that <b>works something out</b> should <code>return</code> it. Leave the printing to the code that called it.'
        ],
        tip: 'Fixing pain 2 is simple: count the jars on the card, and pass that many arguments, in the same order. The error message even names the jar that is still empty.'
      },
      {
        label: 'Try it', pic: run(coach, { title: 'coach.py' }),
        h: 'Kitchen Coach: look up the number.',
        text: [
          'Typing 17 and 9 by hand is a risk. The numbers already live in a dict, the spice rack from lesson 37. So pass <code>protein[food]</code> as the second argument. Any expression works as an argument: Python works it out first, then drops the result in the jar.',
          'The loop unpacks each pair, as in lesson 38: <code>food</code> is <code>"tofu"</code> and <code>grams</code> is 150, then <code>"lentils"</code> and 200. Each call returns a number, and <code>+=</code> adds it to the running total (lesson 35). Press <b>Run</b>: 43.5 again.',
          'Now add <code>("eggs", 100)</code> to <code>lunch</code> and run it. The total should be 56.5. You changed the data, not the card.'
        ],
        tip: 'The loop has its own jar called <code>grams</code>, and so does the card. That is fine: the card\'s jars live only inside the card. Lesson 47, Scope, explains why.'
      },
      {
        label: 'The catch', pic: run(early, { title: 'early.py' }),
        h: 'return ends the card right away.',
        text: [
          'When Python reaches <code>return</code>, it hands the value back and <b>leaves the function at once</b>. Lines after it on the card never run. Press <b>Run</b>: <code>Done!</code> is never printed.',
          'That can be useful. Lines 2 and 3 check for no food at all and return 0 <b>early</b>, so line 4 only runs for a real amount. Each call runs <b>one</b> <code>return</code>, and the first one reached wins.',
          'Arguments go in by <b>position</b>. Here <code>protein_in(17, 150)</code> gives the same 25.5, because the order of a multiplication does not matter. For most cards it does matter, and Python cannot tell 150 grams from 150 per 100 g. Lesson 46, Defaults and keyword arguments, shows how to name each one at the call.'
        ],
        warn: 'Indentation decides what is on the card. A <code>return</code> that is not indented under <code>def</code> stops with <code>SyntaxError: \'return\' outside function</code>.'
      }
    ],
    exercises: [
      {
        file: 'l45_protein_card.py', title: "Ben's protein card",
        task: 'Write two recipe cards that <b>return</b> their answer: <code>protein_in(grams, per_100g)</code> and <code>kcal_in(grams, per_100g)</code>. Then add up Ben\'s whole day from a list of (food, grams) pairs, looking up the numbers in two dicts. The check calls your cards with <b>other numbers</b> too, so typing in the answers will not pass.',
        steps: [
          'Press <b>Open in VS Code</b>. Read the task at the top of the file. Run it once: the starter card prints instead of returning, so it stops with the <code>NoneType</code> error from this lesson.',
          'Between <code>START</code> and <code>END</code>, fix <code>protein_in</code>, write <code>kcal_in</code>, and add the calories inside the loop. Save the file.',
          'Run it again. The check says <code>PASS</code> or gives you one hint.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['def protein_in(grams, per_100g):', '    return grams * per_100g / 100', '', 'print(protein_in(100, 13))'], { title: 'eggs.py' }),
        options: ['13.0', '13', 'None', '1300'],
        answer: 0,
        why: '100 goes into <code>grams</code> and 13 into <code>per_100g</code>. 100 * 13 / 100 is 13.0: <code>/</code> always gives a float. The call becomes 13.0, and <code>print</code> shows it.',
        hint: 'Fill the jars in order, do the maths, and remember what <code>/</code> gives.'
      },
      {
        type: 'match', q: 'Match each part of the code to what it is.',
        pairs: [
          ['grams in def protein_in(grams, per_100g):', 'a parameter: a named jar on the card'],
          ['150 in protein_in(150, 17)', 'an argument: the value put in the jar'],
          ['return grams * per_100g / 100', 'hands the value back to the caller'],
          ['tofu = protein_in(150, 17)', 'stores the value the call became']
        ],
        why: 'The jar on the card is a parameter, the value at the call is an argument, <code>return</code> hands the answer back, and the call becomes that answer, ready to store.',
        hint: 'Which one is written on the card, and which one at the call?'
      },
      {
        type: 'fix', q: 'This card prints instead of returning, so line 4 stops with <code>TypeError: unsupported operand type(s) for +: \'NoneType\' and \'NoneType\'</code>. Fix the card so the program prints only <code>Ben\'s lunch: 43.5 g protein</code>.',
        code: printing,
        title: 'lunch.py',
        check: [
          'import io, contextlib',
          'got = out.strip()',
          'shown = io.StringIO()',
          'with contextlib.redirect_stdout(shown):',
          '    back = protein_in(100, 13)',
          'if back == 13 and shown.getvalue() == "" and got == "Ben\'s lunch: 43.5 g protein":',
          '    ok = True',
          'elif back is None:',
          '    msg = "protein_in still hands back None. Change print(...) on line 2 to return ..."',
          'elif shown.getvalue() != "":',
          '    msg = "The card returns now, but it still prints too. Let it only return. Print outside the card."',
          'elif back != 13:',
          '    msg = "protein_in(100, 13) should give 13.0. Keep the maths: grams * per_100g / 100."',
          'else:',
          '    msg = "It printed: " + got + ". It should print only Ben\'s lunch: 43.5 g protein"'
        ].join('\n'),
        why: 'Line 2 becomes <code>return grams * per_100g / 100</code>. Now each call becomes a number, the two numbers add up to 43.5, and the only print is outside the card.',
        hint: 'Which word hands a value back, instead of showing it?'
      },
      {
        type: 'bucket', q: 'The card is <code>def protein_in(grams, per_100g):</code> with <code>return grams * per_100g / 100</code>. Which lines run fine, and which stop with a <code>TypeError</code>?',
        buckets: ['Runs fine', 'TypeError'],
        items: [
          ['protein_in(150, 17)', 0],
          ['protein_in(200, 9) + 1', 0],
          ['round(protein_in(80, 13))', 0],
          ['protein_in(150)', 1],
          ['protein_in()', 1],
          ['protein_in(150, 17, 2)', 1]
        ],
        why: 'The card has 2 jars, so every call needs exactly 2 arguments. The call becomes a number, so you can add 1 to it or round it. One or zero arguments: "missing ... required positional argument". Three: "takes 2 positional arguments but 3 were given".',
        hint: 'Count the jars on the card. Then count the arguments in each call.'
      },
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['def half(grams):', '    return grams / 2', '    print("Halved!")', '', 'print(half(300))'], { title: 'half.py' }),
        options: ['150.0', 'Halved! and then 150.0', '150.0 and then Halved!', 'None'],
        answer: 0,
        why: '<code>return</code> hands 150.0 back and leaves the card at once. Line 3 never runs, so <code>Halved!</code> never appears.',
        hint: 'What does <code>return</code> do to the lines after it?'
      },
      {
        type: 'pick', q: 'Back to lesson 34. Why do both of these put <code>None</code> in the jar?',
        pic: code(['shopping = ["milk", "eggs"]', 'shopping = shopping.sort()', '', 'def show(grams):', '    print(grams)', '', 'result = show(150)'], { title: 'none.py' }),
        options: ['Both tools hand back None: sort() changes the list in place, and show() only prints', 'Lists and functions cannot be stored in jars', 'print always returns the value it printed', 'None is what = puts in a jar when it is not sure'],
        answer: 0,
        why: '<code>.sort()</code> works on the list itself and hands back <code>None</code>. <code>show</code> has no <code>return</code>, so it hands back <code>None</code> too. Only a tool that <b>returns</b> a value is worth putting in a jar.',
        hint: 'What does a function hand back when it has no return?'
      },
      {
        type: 'fill', q: 'Finish the card so <code>kcal_in(150, 144)</code> becomes <code>216.0</code>.',
        text: 'def kcal_in(___, per_100g):\n    ___ grams * ___ / 100',
        options: ['grams', 'return', 'per_100g', 'print', '150', 'None'],
        answer: ['grams', 'return', 'per_100g'],
        why: 'The jars are <code>grams</code> and <code>per_100g</code>, and <code>return</code> hands the answer back. 150 * 144 / 100 is 216.0. Never put a fixed number like 150 in the jar list: the card must work for any amount.',
        hint: 'The first blank is a jar name. The second blank hands the value back.'
      },
      {
        type: 'pick', q: 'Chloe bakes 1200 kcal of cake and cuts it into 4 slices. What does this print?',
        pic: code(['def per_slice(total, slices):', '    return total / slices', '', 'print(per_slice(4, 1200))'], { title: 'cake.py' }),
        options: ['0.0033333333333333335', '300.0', '300', 'TypeError'],
        answer: 0,
        why: 'Arguments fill the jars <b>by position</b>. 4 goes into <code>total</code> and 1200 into <code>slices</code>, so the card works out 4 / 1200. Python cannot know you swapped them. Write <code>per_slice(1200, 4)</code> to get 300.0. Lesson 46 shows how to name the jars at the call.',
        hint: 'Which jar does the first argument go into?'
      }
    ]
  });
})();
