/* Lesson 21: Comparisons (module 2). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T } = PR;

  /* =====================================================================
     l21  Comparisons
     ===================================================================== */

  // The six signs, read out loud, with a kitchen question for each.
  const rows = [
    ['==', 'is the same as', 'name == "ana"'],
    ['!=', 'is not the same as', 'dish != "pasta"'],
    ['<', 'is less than', 'water_c < 100'],
    ['>', 'is more than', 'pan_c > 250'],
    ['<=', 'is at most', 'sugar_g <= 50'],
    ['>=', 'is at least', 'protein_g >= 120']
  ];
  const ideaPic = svg(600, 352, 'The six comparison signs and how to read them out loud: == is the same as, != is not the same as, < is less than, > is more than, <= is at most, >= is at least. Each has a kitchen example.',
    box(14, 10, 572, 326, P.white, 16) +
    T(66, 42, 'SIGN', { s: 12, f: P.ink2 }) + T(140, 42, 'SAY IT OUT LOUD', { s: 12, f: P.ink2, a: 'start' }) + T(350, 42, 'IN YOUR KITCHEN', { s: 12, f: P.ink2, a: 'start' }) +
    rows.map((r, i) => {
      const y = 58 + i * 42, warm = i >= 4;
      return `<rect x="30" y="${y}" width="540" height="36" rx="9" fill="${warm ? P.warnT : P.paper2}"/>` +
        `<rect x="38" y="${y + 4}" width="56" height="28" rx="7" fill="#15132B"/>` + T(66, y + 24, r[0], { s: 16, m: true, f: '#FFC24B' }) +
        T(140, y + 24, r[1], { s: 15, a: 'start', f: warm ? P.warn : P.ink }) +
        T(350, y + 24, r[2], { s: 13.5, m: true, a: 'start', w: 700 });
    }).join('') +
    T(300, 326, 'the = on the right means "or equal": the edge counts', { s: 12.5, w: 700, f: P.ink2 }));

  // A number line for the oven: > leaves 180 out, >= lets it in.
  const edgeRow = (y, label, closed, col) => {
    const x180 = 300;
    let ticks = '';
    for (let v = 176; v <= 184; v++) {
      const x = 300 + (v - 180) * 44;
      ticks += `<line x1="${x}" y1="${y - 7}" x2="${x}" y2="${y + 7}" stroke="${P.ink}" stroke-width="2"/>` + T(x, y + 26, String(v), { s: 12, w: 700, m: true, f: v === 180 ? P.ink : P.ink2 });
    }
    return T(24, y - 18, label, { s: 15, m: true, a: 'start' }) +
      `<line x1="110" y1="${y}" x2="540" y2="${y}" stroke="${P.ink}" stroke-width="2.5"/>` + ticks +
      `<rect x="${x180}" y="${y - 6}" width="${540 - x180}" height="12" rx="6" fill="${col}" opacity="0.85"/>` +
      `<circle cx="${x180}" cy="${y}" r="11" fill="${closed ? col : P.white}" stroke="${col}" stroke-width="4"/>` +
      `<path d="M540 ${y - 10} L556 ${y} L540 ${y + 10} Z" fill="${col}"/>`;
  };
  const edgePic = svg(600, 230, 'Two number lines for the oven. With oven_c > 180 the circle at 180 is empty: 180 is left out, only 181 and up count. With oven_c >= 180 the circle at 180 is filled: 180 counts.',
    edgeRow(56, 'oven_c > 180', false, P.danger) +
    `<rect x="380" y="20" width="196" height="26" rx="13" fill="${P.dangerT}"/>` + T(478, 38, '180 is left out', { s: 13, f: P.danger }) +
    edgeRow(160, 'oven_c >= 180', true, P.ok) +
    `<rect x="380" y="124" width="196" height="26" rx="13" fill="${P.okT}"/>` + T(478, 142, '180 counts', { s: 13, f: P.ok }));

  const gauges = [
    'oven_c = 180',
    'water_c = 100',
    'ben_protein_g = 132',
    'ben_target_g = 140',
    'dough_c = 25',
    '',
    'print("Oven at least 180?", oven_c >= 180)',
    'print("Water boiling?", water_c >= 100)',
    'print("Ben on target?", ben_protein_g >= ben_target_g)',
    'print("Ben still needs", ben_target_g - ben_protein_g, "g")',
    'print("Dough from 24 to 27?", 24 <= dough_c <= 27)'
  ];

  const oven = [
    'oven_c = 180',
    'recipe_min_c = 180  # the recipe says: at least 180',
    '',
    'if oven_c > recipe_min_c:',
    '    print("Ready. In goes the bread.")',
    'else:',
    '    print("Not yet. Keep waiting.")'
  ];
  const guest = [
    'typed = input("Your name? ")',
    'print(typed == "chloe")',
    'print(typed.strip().lower() == "chloe")'
  ];

  const painPic = `<div style="width:100%;min-width:0;max-width:100%">${edgePic}` +
    code(oven, { title: 'oven.py', bad: [4] }) +
    term(['$ python3 oven.py', 'Not yet. Keep waiting.'], 'terminal, with the oven at exactly 180') +
    code(guest.slice(0, 2), { title: 'guest.py', bad: [2] }) +
    term(['$ python3 guest.py', 'Your name?   cHLoE ', 'False'], 'terminal') + `</div>`;

  const fixPic = `<div style="width:100%;min-width:0;max-width:100%">${run(oven, { title: 'oven.py' })}${run(guest, { title: 'guest.py', inputs: ['  cHLoE '] })}</div>`;

  const zone = [
    'ana_bpm = 128',
    '',
    'if 114 <= ana_bpm <= 133:',
    '    print(f"{ana_bpm} bpm: zone 2. Easy pace, keep going.")',
    'elif ana_bpm > 133:',
    '    print(f"{ana_bpm} bpm: too fast. Slow down a little.")',
    'else:',
    '    print(f"{ana_bpm} bpm: too slow. Pick it up a little.")'
  ];

  // A heart-rate band: zone 2 from 114 to 133, both ends filled.
  const zonePic = svg(600, 120, 'A heart-rate scale from 100 to 150 beats a minute. Zone 2 is a green band from 114 to 133, with filled circles at both ends because both edges count.',
    `<line x1="40" y1="56" x2="560" y2="56" stroke="${P.ink}" stroke-width="2.5"/>` +
    [100, 110, 120, 130, 140, 150].map(v => { const x = 40 + (v - 100) * 10.4; return `<line x1="${x}" y1="48" x2="${x}" y2="64" stroke="${P.ink}" stroke-width="2"/>` + T(x, 90, String(v), { s: 12, w: 700, m: true, f: P.ink2 }); }).join('') +
    `<rect x="${40 + 14 * 10.4}" y="46" width="${19 * 10.4}" height="20" rx="10" fill="${P.ok}" opacity="0.85"/>` +
    `<circle cx="${40 + 14 * 10.4}" cy="56" r="10" fill="${P.ok}" stroke="${P.ink}" stroke-width="2"/>` +
    `<circle cx="${40 + 33 * 10.4}" cy="56" r="10" fill="${P.ok}" stroke="${P.ink}" stroke-width="2"/>` +
    T(40 + 14 * 10.4, 30, '114', { s: 14, m: true, f: P.ok }) + T(40 + 33 * 10.4, 30, '133', { s: 14, m: true, f: P.ok }) +
    T(40 + 23.5 * 10.4, 30, 'zone 2', { s: 14, f: P.ok }) +
    T(300, 114, '114 <= ana_bpm <= 133', { s: 13, m: true, f: P.ink2 }));

  const surprises = [
    'import math  # a cookbook of maths tools (lesson 60)',
    '',
    'flour_kg = 0.1 + 0.2',
    'print(flour_kg)',
    'print(flour_kg == 0.3)',
    'print(round(flour_kg, 2) == round(0.3, 2))',
    'print(math.isclose(flour_kg, 0.3))',
    '',
    'print("Zucchini" < "apple")',
    'print(ord("Z"), ord("a"))',
    'print("ana" < "Ben")',
    'print(3 == "3")',
    'print(3 < "3")'
  ];

  COURSE.add({
    id: 'l21', minutes: 10,
    summary: 'Six signs compare two values and answer <code>True</code> or <code>False</code>. Read them out loud: <code>&gt;=</code> is <b>at least</b>, <code>&lt;=</code> is <b>at most</b>. The <b>edge</b> matters: at exactly 180, <code>oven_c &gt; 180</code> says no and <code>oven_c &gt;= 180</code> says yes. Python lets you <b>chain</b> them like maths: <code>24 &lt;= dough_c &lt;= 27</code>. Tidy text before you compare it, and never compare floats with <code>==</code>.',
    video: {
      src: 'videos/l21-comparisons.mp4', poster: 'videos/l21-comparisons.jpg', length: '1 min 10 s',
      script: [
        'The recipe says, bake at 180 degrees or more. Your oven climbs. 170. 175. 180. Ready? Your program says, not yet.',
        'Look at the sign. It asks, is the oven more than 180? At exactly 180, the answer is False. The oven is ready, and the program never says so.',
        'Read the recipe out loud. At least 180. That is more than, or equal to. One extra character, and the edge counts. True.',
        'Ana runs in zone 2, from 114 to 133 beats a minute. Python lets you write that like maths, with the heart rate in the middle. At 128, True. At 140, False.',
        'Text is strict too. A guest types ANA, in capitals, with spaces. Is that equal to ana? False. Strip the spaces, lower the letters, then compare. True.',
        'Say the question out loud. Then pick the sign that says it.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'A kitchen full of thermometers and scales.',
        text: [
          'Cooking is measuring. Is the oven hot enough? Is the water at <b>least</b> 100 degrees? Is the dough between 24 and 27 degrees, warm enough to rise? Has Ben eaten at <b>least</b> his 120 grams of protein?',
          'You met the six comparison signs in lesson 10. Each one puts two values side by side and answers <code>True</code> or <code>False</code>. Now you use them for real decisions, so read each one <b>out loud</b> before you write it.',
          'The two signs with an <code>=</code> on the end are the ones to watch. <code>&gt;=</code> means <b>at least</b> and <code>&lt;=</code> means <b>at most</b>. The <code>=</code> means "or equal": the exact edge value counts as yes.'
        ],
        tip: 'Recipes, training plans and labels all talk this way: "at least 180", "no more than 50 g of sugar", "from 24 to 27". Each phrase turns into exactly one sign.'
      },
      {
        label: 'The code', pic: run(gauges, { title: 'kitchen_gauges.py' }),
        h: 'Compare jars, not just numbers.',
        text: [
          'Real checks compare <b>jars</b> (lesson 11): the reading on the left, the target on the right. <code>ben_protein_g &gt;= ben_target_g</code> asks "has Ben eaten at least his target?". Change either jar and the answer follows.',
          'The last line is new. <code>24 &lt;= dough_c &lt;= 27</code> is a <b>chained comparison</b>. It reads like maths class: "24 is at most dough_c, and dough_c is at most 27". Put the reading in the <b>middle</b> and the two edges on the outside. It is <code>True</code> only when <b>both</b> halves are.',
          'Press <b>Run</b>. Then set <code>ben_protein_g</code> to <code>140</code> and <code>dough_c</code> to <code>28</code>, and run again. Which answers flip?'
        ],
        tip: 'A chain is a Python favourite. Many other languages cannot do it. The long way, with the word <code>and</code>, is the next lesson: lesson 22, and, or, not.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'The oven that is never ready.',
        text: [
          'The recipe says "at least 180". The programmer wrote <code>oven_c &gt; recipe_min_c</code>. It looks right. But at <b>exactly</b> 180, "is 180 more than 180?" is <code>False</code>. The oven is ready, and the program says "Not yet".',
          'This is called an <b>off-by-one</b> mistake. It hides at the edge. Test at 200 and everything looks fine. Only the exact boundary value shows it, and real ovens stop at exactly 180 all the time.',
          'The second pain is text. Chloe types her name with odd capitals and a few spaces: <code>"  cHLoE "</code>. With <code>==</code>, text must match <b>character by character</b>, so it is <code>False</code>, and the guest list says she was not invited.'
        ],
        warn: 'Neither mistake gives an error. The program runs, prints a calm, wrong answer, and moves on. Always test the <b>edge</b> value itself, and always test a messy typed answer.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Say the recipe out loud. Tidy the text first.',
        text: [
          'Press <b>Run</b> on <code>oven.py</code>: "Not yet". Now read the recipe out loud: "at <b>least</b> 180". At least is <code>&gt;=</code>. Change line 4 to <code>oven_c &gt;= recipe_min_c</code> and run again.',
          'Then press Run on <code>guest.py</code>. Its answer is already typed in, with the odd capitals and spaces. The plain <code>==</code> says <code>False</code>. The second line tidies first, with the tools from lesson 9: <code>.strip()</code> peels the spaces and <code>.lower()</code> makes every letter small. Now it is <code>True</code>.',
          'Run it again and type your own messy version of "Chloe" when it asks. The tidy line keeps saying <code>True</code>.'
        ],
        tip: 'Tidy <b>both sides</b> the same way when both come from people. Here the guest list was already small letters, so only the typed side needed it.'
      },
      {
        label: 'Try it', pic: `<div style="width:100%;min-width:0;max-width:100%">${zonePic}${run(zone, { title: 'zone.py' })}</div>`,
        h: 'Ana\'s heart-rate zone.',
        text: [
          'Ana trains in <b>zone 2</b>: from 114 to 133 beats a minute, both ends included. That is a range, so it is a job for a chain: <code>114 &lt;= ana_bpm &lt;= 133</code>. <code>elif</code> and <code>else</code> (lesson 20) handle the other two cases.',
          'Press <b>Run</b>. Then test the edges, because that is where mistakes hide: set <code>ana_bpm</code> to <code>133</code>, then <code>134</code>, then <code>114</code>, then <code>113</code>. Each should land where you expect.',
          'Now break it on purpose: change the first <code>&lt;=</code> to <code>&lt;</code> and try <code>114</code> again. Ana is told she is too slow at the very start of her zone.'
        ],
        tip: 'A quick habit for any check with an edge: try the edge, one below it, and one above it. Three runs catch almost every off-by-one.'
      },
      {
        label: 'The catch', pic: run(surprises, { title: 'surprises.py' }),
        h: 'Floats, alphabet order and mixed types.',
        text: [
          '<b>Floats.</b> From lesson 6: <code>0.1 + 0.2</code> is <code>0.30000000000000004</code>, so <code>== 0.3</code> is <code>False</code>. Never compare measured floats with <code>==</code>. Round <b>both sides</b> the same way, or use <code>math.isclose</code>, which asks "close enough?". It lives in Python\'s <code>math</code> cookbook: the line <code>import math</code> opens that book, and lesson 60, Modules and import, explains it.',
          '<b>Alphabet order.</b> <code>&lt;</code> on text compares character by character, using each character\'s code number. <code>ord()</code> shows that number. Every capital comes <b>before</b> every small letter (Z is 90, a is 97). So <code>"Zucchini" &lt; "apple"</code> is <code>True</code>, and <code>"ana" &lt; "Ben"</code> is <code>False</code>. That is why a list of names can sort in a surprising order. Tidy the capitals first.',
          '<b>Mixed types.</b> <code>3 == "3"</code> is simply <code>False</code>. But <code>3 &lt; "3"</code> has no sensible answer, so Python stops with a <code>TypeError</code>. Convert first (lesson 13).',
          '<b>is or ==?</b> <code>is</code> asks "the very same thing?", not "the same value?". Use <code>is</code> only for <code>None</code>, as in lesson 16: <code>dessert is None</code>. For every value, use <code>==</code>.'
        ],
        warn: 'When a comparison surprises you, print both sides first. The answer is almost always hiding in a space, a capital, a type, or the last digit of a float.'
      }
    ],
    exercises: [
      {
        file: 'l21_ready_checks.py', title: 'Ready checks, right on the edge',
        task: 'Write <b>four print lines</b> that answer: is the oven ready (at least 180), is the dough in range (24 to 27, a <b>chain</b>), is Ana in zone 2 (114 to 133, a <b>chain</b>), and does the typed name <code>"  ANA "</code> match <code>"ana"</code> once tidied. The check runs your lines with many readings, <b>including the exact edges</b>.',
        steps: [
          'Press <b>Open in VS Code</b>. If nothing happens, open VS Code yourself and use File, Open to find the path shown below.',
          'Between the <code>START</code> and <code>END</code> lines, replace each <code>...</code> with a comparison. Use the jar names, like <code>oven_c</code>, not the numbers in the jars. Save the file.',
          'Run it with the Run button at the top right of VS Code. At the bottom you see <code>PASS</code> or a hint that tells you which reading gave the wrong answer.',
          'A hint about 180, 24, 27, 114 or 133? That is an edge. Read the question out loud: "at least" and "from ... to ..., both included" need a sign with <code>=</code>.'
        ]
      }
    ],
    quiz: [
      {
        type: 'bucket', q: 'What does Python say for each line?',
        buckets: ['True', 'False', 'Error'],
        items: [
          ['180 >= 180', 0],
          ['180 > 180', 1],
          ['24 <= 27 <= 27', 0],
          ['24 <= 28 <= 27', 1],
          ['"Zucchini" < "apple"', 0],
          ['3 == "3"', 1],
          ['3 < "3"', 2]
        ],
        why: 'A sign with <code>=</code> lets the edge count. A chain needs both halves to be true, and 28 is not at most 27. Capitals come before small letters. <code>==</code> between a number and text is just <code>False</code>, but <code>&lt;</code> between them is a <code>TypeError</code>.',
        hint: 'Read each one out loud. Watch the edges, the capitals and the quote marks.'
      },
      {
        type: 'match', q: 'Match each kitchen phrase to the comparison that says it.',
        pairs: [
          ['at least 180 degrees', 'oven_c >= 180'],
          ['at most 50 g of sugar', 'sugar_g <= 50'],
          ['hotter than 250 degrees', 'pan_c > 250'],
          ['from 24 to 27, both included', '24 <= dough_c <= 27'],
          ['anything but pasta', 'dish != "pasta"']
        ],
        why: '"At least" and "at most" include the edge, so they have an <code>=</code>. "Hotter than" does not. A range with both ends included is a chain of two <code>&lt;=</code>.',
        hint: 'Does the phrase let the exact number count? Then the sign ends in =.'
      },
      {
        type: 'fix', q: 'The recipe says "at least 180", and the oven is at exactly 180. Fix the check so it prints <code>Ready</code>. Keep the oven at 180.',
        code: ['oven_c = 180', '', 'if oven_c > 180:', '    print("Ready")', 'else:', '    print("Not yet")'],
        title: 'oven.py',
        check: [
          'if oven_c != 180:',
          '    msg = "Keep oven_c at 180. Fix the sign, not the oven."',
          'elif out.strip() == "Ready":',
          '    ok = True',
          'else:',
          '    msg = "It printed " + out.strip() + ". Read the recipe out loud: at least 180."'
        ].join('\n'),
        why: '"At least" is <code>&gt;=</code>. With <code>&gt;</code>, 180 itself never counts, so the oven at exactly 180 is never ready.',
        hint: 'One character is missing from the sign on line 3.'
      },
      {
        type: 'fix', q: 'This should say <code>True</code> for dough at 25 degrees: the range is 24 to 27. The chain is written the wrong way round. Fix it.',
        code: ['dough_c = 25', 'print("Dough in range?", 27 <= dough_c <= 24)'],
        title: 'dough.py',
        check: [
          'if dough_c != 25:',
          '    msg = "Keep dough_c at 25. Fix the chain."',
          'elif out.strip() == "Dough in range? True":',
          '    ok = True',
          'else:',
          '    msg = "It printed " + out.strip() + ". Put the small edge on the left and the big edge on the right."'
        ].join('\n'),
        why: '<code>27 &lt;= dough_c &lt;= 24</code> asks for a number that is at least 27 and at most 24. No number is both. Smallest on the left, largest on the right: <code>24 &lt;= dough_c &lt;= 27</code>.',
        hint: 'Read it like a number line: low edge, the reading, high edge.'
      },
      {
        type: 'fix', q: 'Ana typed her name for the guest list. Make the line print <code>True</code> without changing what she typed.',
        code: ['typed = "  ANA "', 'print(typed == "ana")'],
        title: 'guests.py',
        check: [
          'if typed != "  ANA ":',
          '    msg = "Keep typed exactly as Ana typed it. Tidy it inside the comparison."',
          'elif out.strip() == "True":',
          '    ok = True',
          'else:',
          '    msg = "Still " + out.strip() + ". Peel off the spaces and make the letters small first."'
        ].join('\n'),
        why: '<code>typed.strip().lower()</code> gives <code>"ana"</code>, so <code>== "ana"</code> is <code>True</code>. The tools hand back a tidy copy and the jar keeps what Ana typed.',
        hint: 'Two tools from lesson 9, in a row, right after <code>typed</code>.'
      },
      {
        type: 'type', q: 'Ana\'s heart rate is in the jar <code>ana_bpm</code>. Type the chained comparison that asks "is it from 114 to 133, both included?".',
        prompt: '>>>',
        answers: ['114 <= ana_bpm <= 133'],
        accept: '^(print\\(\\s*)?(114\\s*<=\\s*ana_bpm\\s*<=\\s*133|133\\s*>=\\s*ana_bpm\\s*>=\\s*114)(\\s*\\))?$',
        why: 'The reading goes in the middle, the edges on the outside, and <code>&lt;=</code> on both sides because both edges count.',
        hint: 'Low edge, sign, the jar, sign, high edge.'
      },
      {
        type: 'pick', q: 'Which line is the safe way to check that two measured floats are equal?',
        pic: code(['import math', 'flour_kg = 0.1 + 0.2'], { title: 'scale.py' }),
        options: ['math.isclose(flour_kg, 0.3)', 'flour_kg == 0.3', 'flour_kg is 0.3', 'str(flour_kg) == "0.3"'],
        answer: 0,
        why: '<code>flour_kg</code> is really <code>0.30000000000000004</code>, so <code>==</code> and the text version are <code>False</code>. <code>is</code> is never for values. <code>math.isclose</code> asks "close enough?" and says <code>True</code>. Rounding both sides, <code>round(flour_kg, 2) == round(0.3, 2)</code>, also works.',
        hint: 'Remember lesson 6: what does 0.1 + 0.2 really give?'
      },
      {
        type: 'pick', q: 'Back to lesson 16. Chloe has not picked a dessert yet, so <code>chloe_dessert = None</code>. Which check do Python programmers write?',
        options: ['chloe_dessert is None', 'chloe_dessert == "None"', 'chloe_dessert is ""', 'chloe_dessert < None'],
        answer: 0,
        why: '<code>is</code> is for <code>None</code>, and only for <code>None</code>. <code>"None"</code> in quotes is text, and <code>&lt;</code> with <code>None</code> is a <code>TypeError</code>.',
        hint: 'The empty jar has its own value, written without quotes.'
      }
    ]
  });
})();
