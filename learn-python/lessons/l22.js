/* Lesson 22: and, or, not (module 2). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T } = PR;

  /* =====================================================================
     l22  and, or, not
     ===================================================================== */

  const tick = (x, y) => `<path d="M${x - 9} ${y} l6 7 l13 -15" fill="none" stroke="${P.ok}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;
  const cross = (x, y) => `<path d="M${x - 7} ${y - 8} l14 14 m0 -14 l-14 14" fill="none" stroke="${P.danger}" stroke-width="4" stroke-linecap="round"/>`;
  const av = (x, y, ch, col) => `<circle cx="${x}" cy="${y}" r="14" fill="${col}" stroke="${P.ink}" stroke-width="2"/>` + T(x, y + 5, ch, { s: 12, f: P.white });

  // The guest grid: who can eat what.
  const dishes = [
    ['mushroom risotto', '72 g', 1, 1, 1],
    ['veggie lasagne', '65 g', 1, 1, 0],
    ['bean chili', '45 g', 0, 1, 1],
    ['chicken pasta', '85 g', 1, 0, 0]
  ];
  const ideaPic = svg(600, 300, 'The guest grid. Columns: Ana needs at least 60 g of carbs, Ben is vegetarian, Chloe is gluten-free. Mushroom risotto: 72 g, vegetarian, gluten-free, so it suits all three. Veggie lasagne fails Chloe. Bean chili has only 45 g of carbs, so it fails Ana. Chicken pasta fails Ben and Chloe.',
    box(14, 10, 572, 250, P.white, 16) +
    av(262, 40, 'A', P.accent) + T(262, 72, 'Ana', { s: 13 }) + T(262, 88, '60 g carbs+', { s: 11.5, w: 700, f: P.ink2 }) +
    av(372, 40, 'B', P.ok) + T(372, 72, 'Ben', { s: 13 }) + T(372, 88, 'vegetarian', { s: 11.5, w: 700, f: P.ink2 }) +
    av(482, 40, 'C', P.danger) + T(482, 72, 'Chloe', { s: 13 }) + T(482, 88, 'gluten-free', { s: 11.5, w: 700, f: P.ink2 }) +
    T(34, 72, 'TONIGHT', { s: 12, f: P.ink2, a: 'start' }) +
    dishes.map((d, i) => {
      const y = 100 + i * 38, all = d[2] && d[3] && d[4];
      return `<rect x="26" y="${y}" width="548" height="34" rx="8" fill="${all ? P.okT : P.paper2}"/>` +
        T(38, y + 22, d[0], { s: 14, a: 'start' }) +
        (d[2] ? tick(244, y + 17) : cross(244, y + 17)) + T(268, y + 22, d[1], { s: 12, w: 700, m: true, f: P.ink2, a: 'start' }) +
        (d[3] ? tick(372, y + 17) : cross(372, y + 17)) + (d[4] ? tick(482, y + 17) : cross(482, y + 17));
    }).join('') +
    T(300, 284, 'one dish for all three: vegetarian AND gluten-free AND 60 g of carbs', { s: 13, w: 700, f: P.ink2 }));

  // Truth tables as two small kitchen grids, plus not.
  const tv = (x, y, v) => T(x, y, v ? 'True' : 'False', { s: 13, m: true, f: v ? P.ok : P.danger });
  const table = (x, title, h1, h2, h3, f) => {
    let s = box(x, 10, 280, 206, P.white, 14) + T(x + 140, 36, title, { s: 15, f: P.accent, m: true }) +
      T(x + 50, 62, h1, { s: 11.5, w: 700, f: P.ink2 }) + T(x + 135, 62, h2, { s: 11.5, w: 700, f: P.ink2 }) + T(x + 225, 62, h3, { s: 11.5, f: P.ink });
    [[1, 1], [1, 0], [0, 1], [0, 0]].forEach(([a, b], i) => {
      const y = 72 + i * 34, r = f(a, b);
      s += `<rect x="${x + 10}" y="${y}" width="260" height="30" rx="7" fill="${r ? P.okT : P.paper2}"/>` +
        tv(x + 50, y + 20, a) + tv(x + 135, y + 20, b) + tv(x + 225, y + 20, r);
    });
    return s;
  };
  const tablesPic = svg(600, 320, 'Truth tables. and: Ben and Chloe can share a dish only when it is vegetarian AND gluten-free, so only True and True gives True. or: Ana has carbs when the pasta OR the rice is ready, so only False and False gives False. not: not True is False, and not False is True.',
    table(10, 'and', 'vegetarian?', 'gluten-free?', 'Ben + Chloe', (a, b) => a && b) +
    table(310, 'or', 'pasta ready?', 'rice ready?', 'Ana has carbs', (a, b) => a || b) +
    box(10, 236, 580, 66, P.white, 14) + T(60, 276, 'not', { s: 16, m: true, f: P.accent }) +
    tv(150, 276, 1) + T(196, 276, '→', { s: 16 }) + tv(242, 276, 0) +
    T(300, 276, '·', { s: 18, f: P.ink2 }) +
    tv(360, 276, 0) + T(406, 276, '→', { s: 16 }) + tv(452, 276, 1) +
    T(540, 268, 'flips', { s: 12, w: 700, f: P.ink2 }) + T(540, 284, 'it', { s: 12, w: 700, f: P.ink2 }));

  const dinner = [
    'dish = "mushroom risotto"',
    'is_vegetarian = True',
    'is_gluten_free = True',
    'carbs_g = 72',
    '',
    'suits_ben_and_chloe = is_vegetarian and is_gluten_free',
    'suits_everyone = suits_ben_and_chloe and carbs_g >= 60',
    '',
    'print(dish)',
    'print("Ben and Chloe:", suits_ben_and_chloe)',
    'print("All three:", suits_everyone)',
    'print("Ben or Chloe:", is_vegetarian or is_gluten_free)',
    'print("Has gluten:", not is_gluten_free)'
  ];

  const alwaysBug = [
    'dish = "salad"',
    '',
    'if dish == "pasta" or "rice":',
    '    print("Carbs for Ana!")',
    'else:',
    '    print("No carbs yet. Find Ana a carb.")'
  ];
  const nuts = [
    'is_vegetarian = True   # a cheese omelette',
    'is_vegan = False',
    'has_nuts = False',
    '',
    '# Ben wants a meat-free dish WITH nuts, for extra protein',
    'print(is_vegetarian or is_vegan and has_nuts)'
  ];
  const painPic = `<div style="width:100%">` +
    code(alwaysBug, { title: 'carbs.py', bad: [3] }) +
    term(['$ python3 carbs.py', 'Carbs for Ana!', '# a salad has 8 g of carbs. Try "soup", "cake", anything: always yes'], 'terminal') +
    code(nuts, { title: 'nuts.py', bad: [6] }) +
    term(['$ python3 nuts.py', 'True', '# the omelette has no nuts. You meant False'], 'terminal') + `</div>`;

  const fixPic = `<div style="width:100%">${run(alwaysBug, { title: 'carbs.py' })}${run(nuts, { title: 'nuts.py' })}</div>`;

  const safe = [
    'chloe_dessert = None  # not picked yet (lesson 16)',
    '',
    '# On None, .strip() would crash. Here it never runs:',
    'if chloe_dessert is not None and chloe_dessert.strip() == "pudding":',
    '    print("Pudding: safe for Chloe")',
    'else:',
    '    print("No dessert picked yet")',
    '',
    'print("Still cooking. Nothing crashed.")'
  ];

  const catchLines = [
    'dough_c = 25',
    'print(24 <= dough_c <= 27)  # a chain',
    'print(dough_c >= 24 and dough_c <= 27)  # same',
    '',
    'dish = "salad"',
    'print(not dish == "pasta")  # == first, then not',
    'print(dish != "pasta")  # same, and clearer',
    '',
    'is_vegetarian = True',
    'is_gluten_free = False',
    'print(not is_vegetarian and is_gluten_free)',
    'print(not (is_vegetarian and is_gluten_free))'
  ];

  COURSE.add({
    id: 'l22', minutes: 12,
    summary: 'Join yes or no questions into one. <code>and</code> is True only when <b>both</b> sides are True. <code>or</code> is True when <b>at least one</b> is. <code>not</code> <b>flips</b> True and False. Python does <code>not</code> first, then <code>and</code>, then <code>or</code>, so use <b>brackets</b> to say what you mean. It also <b>stops early</b> once the answer is known. And never write <code>dish == "pasta" or "rice"</code>: it is always yes.',
    video: {
      src: 'videos/l22-and-or-not.mp4', poster: 'videos/l22-and-or-not.jpg', length: '1 min 11 s',
      script: [
        'Three friends, one dinner. Ben is vegetarian. Chloe is gluten free. Ana needs at least 60 grams of carbs.',
        'To feed Ben and Chloe together, a dish must be vegetarian and gluten free. And is two gates in a row. Both must open. Mushroom risotto? Yes, and yes. True. Lasagne? Vegetarian, yes. Gluten free, no. The second gate stays shut. False.',
        'Or is two gates side by side. Ana can have pasta or rice. Only the rice is ready, but one open gate is enough. True.',
        'Not is a switch. It flips True to False, and False to True.',
        'The classic bug. If dish equals pasta, or rice. Python reads rice on its own, and plain text counts as yes. The gate is welded open. A salad walks through, and Ana gets no carbs.',
        'The fix is to ask the whole question twice. Dish equals pasta, or dish equals rice. Now the salad stops.',
        'And needs both. Or needs one. Not flips the answer.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'One dinner that suits all three.',
        text: [
          'You want to cook <b>one</b> dinner for everyone. Ben is vegetarian. Chloe eats no gluten. Ana is training, so she needs at least 60 g of carbs. Draw a <b>guest grid</b>: a row per dish, a column per friend, a tick or a cross in each box.',
          'Each box is a yes or no question, like the ones in lesson 10 and lesson 21. But your real question is <b>bigger</b>: is it vegetarian <b>and</b> gluten-free <b>and</b> 60 g of carbs or more? Only the mushroom risotto gets three ticks.',
          'Python joins questions with three small words. <code>and</code>: <b>both</b> must be yes. <code>or</code>: <b>at least one</b> must be yes. <code>not</code>: <b>flip</b> the answer. With these, one <code>if</code> can ask the whole question, with no <code>if</code> inside an <code>if</code> (lesson 20).'
        ]
      },
      {
        label: 'The code', pic: `<div style="width:100%">${tablesPic}${run(dinner, { title: 'dinner_filter.py' })}</div>`,
        h: 'Both, at least one, or flipped.',
        text: [
          'The grids are called <b>truth tables</b>. They list every possible pair of answers. <code>and</code> has only <b>one</b> True row: both sides True. Ben and Chloe can share a dish only when it is vegetarian <b>and</b> gluten-free. <code>or</code> has only <b>one</b> False row: both sides False. Ana is happy when the pasta <b>or</b> the rice is ready, or both.',
          '<code>not</code> works on one answer and flips it. <code>not is_gluten_free</code> asks "does it have gluten?".',
          'The answer of <code>and</code> is a bool too, so you can keep it in a jar (lesson 11) with a name that reads like a question: <code>suits_ben_and_chloe</code>. Line 7 joins that jar with a comparison. The comparison <code>carbs_g &gt;= 60</code> runs first, then <code>and</code> joins the two answers.',
          'Press <b>Run</b>. Then change line 3 to <code>is_gluten_free = False</code> (the cook used wheat stock) and run again. Which answers flip? Then put it back and set <code>carbs_g</code> to <code>60</code>, then <code>59</code>.'
        ],
        tip: 'Read <code>and</code>, <code>or</code> and <code>not</code> out loud, just like the signs in lesson 21. "Vegetarian and gluten-free" in your head becomes <code>is_vegetarian and is_gluten_free</code> in Python.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'A gate welded open, and a bracket you forgot.',
        text: [
          'Pain number 1. You want carbs for Ana: "is the dish pasta or rice?". You write <code>dish == "pasta" or "rice"</code>. It reads like English. But Python reads it as two separate things: <code>dish == "pasta"</code>, <code>or</code>, and the text <code>"rice"</code> <b>on its own</b>. That right side is not a question at all.',
          'Python counts plain text that is not empty as yes. (Why, and what that whole line really gives back, is lesson 23, Truthy and falsy.) So when the dish is not pasta, the <code>or</code> looks at <code>"rice"</code>, gets a yes, and the <code>if</code> runs. <b>Always.</b> A salad with 8 g of carbs gets "Carbs for Ana!".',
          'Pain number 2. Ben wants a meat-free dish <b>with</b> nuts for extra protein. You write <code>is_vegetarian or is_vegan and has_nuts</code>. Python does <code>and</code> <b>before</b> <code>or</code>, just like it does <code>*</code> before <code>+</code> (lesson 7). So it reads "vegetarian, or (vegan and has nuts)". The cheese omelette is vegetarian, so the answer is <code>True</code>, nuts or no nuts.'
        ],
        warn: 'Neither bug gives an error. Both programs run and print a calm, wrong answer. Test with a value that <b>should</b> fail, like the salad and the omelette.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Ask the whole question twice. Add brackets.',
        text: [
          'Press <b>Run</b> on <code>carbs.py</code>: "Carbs for Ana!", for a salad. Fix line 3 by asking the <b>whole question</b> on both sides: <code>dish == "pasta" or dish == "rice"</code>. Run it again. Then change the dish to <code>"rice"</code> and check that Ana gets her carbs.',
          'A shorter way you will meet soon: <code>dish in ("pasta", "rice")</code>. The round brackets hold a small fixed group of values, called a <b>tuple</b>, and <code>in</code> asks "is it one of these?". Tuples are lesson 36.',
          'Now <code>nuts.py</code>. Press Run: <code>True</code>. Put brackets around the part that goes together: <code>(is_vegetarian or is_vegan) and has_nuts</code>. Brackets go first, like in maths. Run it: <code>False</code>. Then set <code>has_nuts = True</code> and run again.'
        ],
        tip: 'The order is <code>not</code>, then <code>and</code>, then <code>or</code>. You do not need to remember it if you use <b>brackets</b> whenever you mix <code>and</code> with <code>or</code>. They cost nothing and show the next reader exactly what you meant.'
      },
      {
        label: 'Try it', pic: run(safe, { title: 'dessert_check.py' }),
        h: 'Python stops as soon as it knows.',
        text: [
          'If the left side of <code>and</code> is False, the whole answer is False, whatever comes next. So Python <b>does not even look</b> at the right side. In the same way, if the left side of <code>or</code> is True, the right side is skipped. This is called <b>short-circuiting</b>.',
          'That is useful. In lesson 16 you met <code>None</code>, the empty jar. Calling <code>.strip()</code> on <code>None</code> crashes. So check first: <code>chloe_dessert is not None</code> (the opposite of <code>is None</code>) on the left, and the risky part on the right. Press <b>Run</b>: no crash, because the right side never runs.',
          'Now set <code>chloe_dessert = "  pudding "</code> and run it. The left side is True, so Python checks the right side too, and Chloe gets her pudding.',
          'Last, put it back to <code>None</code> and <b>swap the two sides</b> of the <code>and</code>. Run it. The risky part runs first and Python stops: <code>AttributeError: \'NoneType\' object has no attribute \'strip\'</code>. The order matters: the safety check goes on the <b>left</b>.'
        ],
        tip: 'Think of a cook who checks "is there milk in the fridge?" before "is the milk fresh?". If there is no milk, nobody sniffs it.'
      },
      {
        label: 'The catch', pic: run(catchLines, { title: 'catches.py' }),
        h: 'Chains, not, and the or with a constant.',
        text: [
          '<b>Chains are and in disguise.</b> <code>24 &lt;= dough_c &lt;= 27</code> from lesson 21 means exactly <code>dough_c &gt;= 24 and dough_c &lt;= 27</code>. For a range, the chain is shorter. Use <code>and</code> when the two questions are about <b>different</b> things.',
          '<b>Where not goes.</b> <code>not dish == "pasta"</code> works: Python does <code>==</code> first and then flips it. But <code>dish != "pasta"</code> says the same thing more clearly, so prefer it. And <code>not</code> only grabs the <b>very next thing</b>: <code>not is_vegetarian and is_gluten_free</code> flips only <code>is_vegetarian</code>. To flip the whole question, put it in brackets. Run the box to see both answers.',
          '<b>The or with a constant.</b> Whenever one side of <code>or</code> is a bare value like <code>"rice"</code> instead of a question, be suspicious. In this lesson, every side of <code>and</code> and <code>or</code> is a real True or False question. Lesson 23, Truthy and falsy, explains what happens with other values.'
        ],
        warn: 'Python writes these words in small letters: <code>and</code>, <code>or</code>, <code>not</code>. The <code>&amp;&amp;</code> and <code>||</code> you may see in other languages do not work here.'
      }
    ],
    exercises: [
      {
        file: 'l22_menu_filter.py', title: 'The menu filter',
        task: 'Three dishes, each with three jars: vegetarian, gluten-free and grams of carbs. Write <b>three print lines</b> that say whether each dish suits <b>all three friends</b>, with <b>one combined condition</b> per dish, joined with <code>and</code>. The check runs your lines with many other dishes, including exactly 60 g of carbs.',
        steps: [
          'Press <b>Open in VS Code</b>. If nothing happens, open VS Code yourself and use File, Open to find the path shown below.',
          'Between the <code>START</code> and <code>END</code> lines, replace each <code>...</code> with one condition. Use the jar names of <b>that</b> dish, like <code>risotto_carbs_g</code>. Save the file.',
          'Run it with the Run button at the top right of VS Code. At the bottom you see <code>PASS</code> or a hint that names the dish that gave the wrong answer.',
          'Copied a line? Check every jar name in it. A risotto line that asks about <code>lasagne_is_gluten_free</code> is a real and common bug.'
        ]
      }
    ],
    quiz: [
      {
        type: 'bucket', q: 'With these jars, what does each line give?',
        pic: code(['is_vegetarian = True', 'is_gluten_free = False', 'carbs_g = 72'], { title: 'lasagne.py' }),
        buckets: ['True', 'False'],
        items: [
          ['is_vegetarian and is_gluten_free', 1],
          ['is_vegetarian or is_gluten_free', 0],
          ['not is_gluten_free', 0],
          ['carbs_g >= 60 and is_vegetarian', 0],
          ['not is_vegetarian or is_gluten_free', 1],
          ['is_gluten_free and carbs_g >= 60', 1]
        ],
        why: '<code>and</code> needs both sides True, <code>or</code> needs one. <code>not</code> flips only the next thing: <code>not is_vegetarian</code> is False, and False <code>or</code> False is False.',
        hint: 'Replace each jar with its value first. Then do not, then and, then or.'
      },
      {
        type: 'fill', q: 'Drag the right word into each blank.',
        text: 'ben_and_chloe_can_share = is_vegetarian ___ is_gluten_free\nana_has_carbs = pasta_ready ___ rice_ready\nhas_gluten = ___ is_gluten_free',
        options: ['and', 'or', 'not', '=='],
        answer: ['and', 'or', 'not'],
        why: 'Sharing needs <b>both</b> answers to be yes: <code>and</code>. Ana needs <b>one</b> carb dish ready: <code>or</code>. "Has gluten" is the <b>flip</b> of "is gluten-free": <code>not</code>.',
        hint: 'Both, at least one, or flipped?'
      },
      {
        type: 'fix', q: 'The dish is a salad, but this says "Carbs for Ana!". Fix the condition so it prints <code>No carbs yet</code>. Keep the dish a salad.',
        code: ['dish = "salad"', '', 'if dish == "pasta" or "rice":', '    print("Carbs for Ana!")', 'else:', '    print("No carbs yet")'],
        title: 'carbs.py',
        check: [
          'if dish != "salad":',
          '    msg = "Keep dish as \\"salad\\". Fix the condition, not the dish."',
          'elif out.strip() == "No carbs yet":',
          '    ok = True',
          'else:',
          '    msg = "It printed " + out.strip() + ". The right side of or is just the text \\"rice\\". Make it a full question: dish == \\"rice\\"."'
        ].join('\n'),
        why: '<code>or "rice"</code> asks nothing: text that is not empty counts as yes, so the <code>if</code> always ran. <code>dish == "pasta" or dish == "rice"</code> asks two real questions. <code>dish in ("pasta", "rice")</code> also works.',
        hint: 'Ask the whole question on both sides of the or.'
      },
      {
        type: 'fix', q: 'Ben wants a meat-free dish <b>with nuts</b>. A cheese omelette has no nuts, so this should print <code>False</code>. Add brackets so it does. Keep the three jars as they are.',
        code: ['is_vegetarian = True', 'is_vegan = False', 'has_nuts = False', '', 'print(is_vegetarian or is_vegan and has_nuts)'],
        title: 'nuts.py',
        check: [
          'if (is_vegetarian, is_vegan, has_nuts) != (True, False, False):',
          '    msg = "Keep the three jars as they were. Add brackets instead."',
          'elif out.strip() == "False":',
          '    ok = True',
          'else:',
          '    msg = "It printed " + out.strip() + ". Python does and before or. Put brackets around the or part."'
        ].join('\n'),
        why: 'Without brackets Python reads <code>is_vegetarian or (is_vegan and has_nuts)</code>, which is True for any vegetarian dish. <code>(is_vegetarian or is_vegan) and has_nuts</code> asks what you meant.',
        hint: 'Which two questions belong together? Put round brackets around them.'
      },
      {
        type: 'fix', q: 'Chloe has not picked a dessert, so this crashes with an <code>AttributeError</code>. Change the condition, not the jar, so it prints <code>No dessert yet</code>.',
        code: ['chloe_dessert = None', '', 'if chloe_dessert.strip() == "pudding" and chloe_dessert is not None:', '    print("Safe for Chloe")', 'else:', '    print("No dessert yet")'],
        title: 'dessert.py',
        check: [
          'if chloe_dessert is not None:',
          '    msg = "Keep chloe_dessert = None. Fix the condition so it never calls .strip() on None."',
          'elif out.strip() == "No dessert yet":',
          '    ok = True',
          'else:',
          '    msg = "It printed " + out.strip() + ". Put the None check on the left of the and."'
        ].join('\n'),
        why: 'Python reads <code>and</code> from left to right and stops as soon as it knows. With <code>chloe_dessert is not None</code> on the <b>left</b>, a None makes it False straight away, and <code>.strip()</code> never runs.',
        hint: 'Swap the two sides of the and.'
      },
      {
        type: 'type', q: 'Type the condition that is True when <code>dish</code> is <code>"pasta"</code> or <code>"rice"</code>. Ask the whole question on both sides.',
        prompt: 'if',
        answers: ['dish == "pasta" or dish == "rice"'],
        accept: '^(if\\s+)?\\(?\\s*(dish\\s*==\\s*"pasta"\\s+or\\s+dish\\s*==\\s*"rice"|dish\\s*==\\s*"rice"\\s+or\\s+dish\\s*==\\s*"pasta"|dish\\s+in\\s+\\(\\s*"pasta"\\s*,\\s*"rice"\\s*\\)|dish\\s+in\\s+\\(\\s*"rice"\\s*,\\s*"pasta"\\s*\\))\\s*\\)?\\s*:?$',
        why: 'Each side of <code>or</code> must be a full question: <code>dish == "pasta" or dish == "rice"</code>. The tuple version, <code>dish in ("pasta", "rice")</code>, is accepted too.',
        hint: 'dish == ..., then or, then dish == ... again.'
      },
      {
        type: 'pick', q: 'Back to lesson 21. Which line asks exactly the same as <code>24 &lt;= dough_c &lt;= 27</code>?',
        options: ['dough_c >= 24 and dough_c <= 27', 'dough_c >= 24 or dough_c <= 27', 'dough_c > 24 and dough_c < 27', 'not dough_c < 27'],
        answer: 0,
        why: 'A chain is two comparisons joined by <code>and</code>, with the same edges. With <code>or</code>, any number at all is True (every number is either at least 24 or at most 27). <code>&gt;</code> and <code>&lt;</code> would leave the edges 24 and 27 out.',
        hint: 'Both halves must be True, and both edges count.'
      },
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['print(True or False and False)'], { title: 'order.py' }),
        options: ['True', 'False', 'An error', 'Nothing'],
        answer: 0,
        why: '<code>and</code> goes before <code>or</code>. So it is <code>True or (False and False)</code>, which is <code>True or False</code>, which is <code>True</code>. Going left to right instead would give False. That is why brackets help.',
        hint: 'Do the and part first.'
      }
    ]
  });
})();
