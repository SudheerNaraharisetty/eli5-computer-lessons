/* Lesson 48: Docstrings (module 4). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l48  Docstrings
     ===================================================================== */

  // A recipe card. note: show the sticky note (the docstring) on top of it.
  const card = (x, y, note) =>
    box(x, y, 270, 190, P.white, 16) +
    T(x + 135, y + 34, 'adjust(g, n)', { s: 17, m: true }) +
    `<line x1="${x + 20}" y1="${y + 48}" x2="${x + 250}" y2="${y + 48}" stroke="${P.sand}" stroke-width="3"/>` +
    (note
      ? `<g transform="rotate(-2 ${x + 135} ${y + 118})">` + box(x + 14, y + 62, 242, 112, P.warnT, 8) +
        `<rect x="${x + 105}" y="${y + 54}" width="60" height="16" rx="3" fill="${P.warn}" opacity="0.45"/>` +
        T(x + 28, y + 90, 'Return grams for n people.', { s: 13, a: 'start' }) +
        T(x + 28, y + 120, 'g: grams on the card', { s: 12, m: true, w: 700, f: P.ink2, a: 'start' }) +
        T(x + 28, y + 138, '   (the card feeds 4)', { s: 12, m: true, w: 700, f: P.ink2, a: 'start' }) +
        T(x + 28, y + 160, 'n: how many people eat', { s: 12, m: true, w: 700, f: P.ink2, a: 'start' }) + `</g>`
      : T(x + 30, y + 94, 'g =', { s: 20, m: true, a: 'start' }) + T(x + 84, y + 94, '?', { s: 24, m: true, f: P.danger, a: 'start' }) +
        `<rect x="${x + 110}" y="${y + 74}" width="140" height="28" rx="14" fill="${P.dangerT}"/>` + T(x + 180, y + 93, 'grams of what?', { s: 12, f: P.danger }) +
        T(x + 30, y + 150, 'n =', { s: 20, m: true, a: 'start' }) + T(x + 84, y + 150, '?', { s: 24, m: true, f: P.danger, a: 'start' }) +
        `<rect x="${x + 110}" y="${y + 130}" width="140" height="28" rx="14" fill="${P.dangerT}"/>` + T(x + 180, y + 149, 'people? servings?', { s: 12, f: P.danger }));

  const ideaPic = svg(600, 330, 'Two copies of the recipe card adjust(g, n). The first has no note: g and n have question marks, grams of what, people or servings. Ben guessed and got 112.5 g of beans when he needed 450 g. The second card has a sticky note at the top that says what the card does, and what g and n are, with units.',
    T(165, 22, 'NO NOTE', { s: 12.5, f: P.danger }) + T(435, 22, 'A NOTE AT THE TOP', { s: 12.5, f: P.ok }) +
    card(30, 36, false) + card(300, 36, true) +
    box(30, 250, 270, 62, P.dangerT, 12) +
    T(165, 275, 'Ben: adjust(150, 3)', { s: 13, m: true, f: P.danger }) +
    T(165, 298, 'got 112.5 g, needed 450 g', { s: 12.5, w: 700, f: P.ink2 }) +
    box(330, 250, 240, 62, P.okT, 12) +
    T(450, 275, 'no guessing', { s: 14, f: P.ok }) +
    T(450, 298, 'the card says what it wants', { s: 12, w: 700, f: P.ink2 }));

  const kitchen = [
    'def adjust(recipe_grams, people):',
    '    """Return the grams needed, scaled to a number of people.',
    '',
    '    recipe_grams: grams on the card, which feeds 4 people',
    '    people: how many people will eat',
    '    """',
    '    return recipe_grams / 4 * people',
    '',
    'help(adjust)',
    'print(adjust(400, 3))'
  ];

  const lost = [
    'def adjust(recipe_grams, people):',
    '    total = recipe_grams / 4 * people',
    '    """Return the grams needed, scaled to a number of people."""',
    '    return total',
    '',
    'print(adjust.__doc__)'
  ];
  const hashNote = [
    'def adjust(recipe_grams, people):',
    '    # Return the grams needed, scaled to a number of people.',
    '    return recipe_grams / 4 * people',
    '',
    'print(adjust.__doc__)'
  ];
  const painPic = `<div style="width:100%;min-width:0">` +
    code(lost, { title: 'kitchen.py, the note slipped down', bad: [3] }) +
    term(['$ python3 kitchen.py', 'None'], 'terminal') +
    code(hashNote, { title: 'kitchen.py, a comment is not a note', bad: [2] }) +
    term(['$ python3 kitchen.py', 'None'], 'terminal') + `</div>`;

  const helpPic = term(['$ python3', '>>> # paste the fixed adjust card here, then press Enter twice', '>>> help(adjust)', 'Help on function adjust in module __main__:', ' ', 'adjust(recipe_grams, people)', '    Return the grams needed, scaled to a number of people.', ' ', '    recipe_grams: grams on the card, which feeds 4 people', '    people: how many people will eat', ' ', '# in a real terminal this opens in a viewer: press q to go back'], 'terminal, Python 3.15');

  const fixed = [
    'def adjust(recipe_grams, people):',
    '    """Return the grams needed, scaled to a number of people.',
    '',
    '    recipe_grams: grams on the card, which feeds 4 people',
    '    people: how many people will eat',
    '    """',
    '    return recipe_grams / 4 * people',
    '',
    '# Ben reads the note: the card feeds 4 and uses 600 g',
    'print(adjust(recipe_grams=600, people=3))'
  ];

  const tryIt = [
    'def protein_in(grams, per_100g):',
    '    """Write your note here."""',
    '    return grams * per_100g / 100',
    '',
    'help(protein_in)',
    'print(protein_in(150, 17))'
  ];

  const both = [
    'def adjust(recipe_grams, people):',
    '    """Return the grams needed, scaled to a number of people."""',
    '    # The card feeds 4: find one portion first, then multiply.',
    '    one_portion = recipe_grams / 4',
    '    return one_portion * people',
    '',
    'print(adjust.__doc__)',
    'print(adjust(400, 3))'
  ];
  const whoPic = svg(600, 150, 'A docstring is written for the person who USES the function: what it does, what goes in, what comes out. A comment is written for the person who READS the code inside: how and why.',
    box(20, 16, 270, 118, P.okT, 14) +
    T(155, 44, '"""docstring"""', { s: 15, m: true, f: P.ok }) +
    T(155, 72, 'for the person who USES it', { s: 13 }) +
    T(155, 96, 'what it does, what goes in,', { s: 12.5, w: 700, f: P.ink2 }) +
    T(155, 116, 'what comes out', { s: 12.5, w: 700, f: P.ink2 }) +
    box(310, 16, 270, 118, P.warnT, 14) +
    T(445, 44, '# comment', { s: 15, m: true, f: P.warn }) +
    T(445, 72, 'for the person who READS it', { s: 13 }) +
    T(445, 96, 'how a step works,', { s: 12.5, w: 700, f: P.ink2 }) +
    T(445, 116, 'and why it is there', { s: 12.5, w: 700, f: P.ink2 }));

  COURSE.add({
    id: 'l48', minutes: 11,
    summary: 'A <b>docstring</b> is a note at the top of a recipe card: a string in <b>triple quotes</b> as the <b>first line</b> inside the function. Its first line says <b>what the function does and what it hands back</b>, in one short sentence. Then, if it helps, one line per parameter, <b>with its unit</b>. <code>help(adjust)</code> prints the note, and VS Code shows it when you point at the name. A string anywhere else in the card is lost: <code>adjust.__doc__</code> is <code>None</code>. Comments (<code>#</code>) explain <b>how and why</b> to whoever reads the code. Docstrings explain <b>what</b> to whoever uses the function.',
    video: {
      src: 'videos/l48-docstrings.mp4', poster: 'videos/l48-docstrings.jpg', length: '1 min 5 s',
      script: [
        'Three weeks later, you open Kitchen Coach and find this card. Adjust, g, n. What is g? Grams of what? And is n people, or servings?',
        'Ben borrows it for his chili. He guesses g means grams per person. 150 grams, 3 people. The card says 112.5. He needed 450.',
        'The fix is a note at the top of the card, called a docstring. Three quote marks, on the very first line inside the card. First, what it does and what comes back. Then each ingredient, with its unit.',
        'Now call help on adjust. It prints the note. Your editor shows it too, when you point at the name.',
        'But put the note after a line of code, and it falls off the card. It is just a lost string, and the doc is None.',
        'Put a note at the top of every card. What it does, what goes in, what comes out.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'A note at the top of the card.',
        text: [
          'Three weeks ago you wrote a recipe card for Kitchen Coach: <code>def adjust(g, n):</code> with <code>return g / 4 * n</code>. Today you open the file and stop. What is <code>g</code>? Grams of <b>what</b>? Is <code>n</code> people, or servings? Why 4?',
          'Ben borrows the card for his chili. He guesses that <code>g</code> means grams <b>per person</b>. He wants 150 g of beans each for 3 people, so he calls <code>adjust(150, 3)</code>. The card hands back <b>112.5</b>. He needed <b>450</b>. The card meant something else: <code>g</code> is the grams on the <b>whole</b> recipe card, which feeds 4.',
          'Nothing crashed. The card did exactly what it says. The problem is that it never <b>said</b> what it wants. A <b>docstring</b> fixes that: a short note at the top of the card that says what it does, what goes in, and what comes out.'
        ],
        tip: 'Good names help too (lesson 12): <code>recipe_grams</code> and <code>people</code> say far more than <code>g</code> and <code>n</code>. A docstring adds what a name cannot fit: the units, and that the card feeds 4.'
      },
      {
        label: 'The code', pic: run(kitchen, { title: 'kitchen.py' }),
        h: 'Triple quotes, on the first line inside.',
        text: [
          'Line 2 starts the note with <b>three quote marks</b>: <code>"""</code>. Three quotes make a string that can run over <b>several lines</b>. It ends at the next <code>"""</code>, on line 6.',
          'The note must be the <b>first line inside the card</b>, right under <code>def</code>. Only then does Python keep it as the card\'s docstring.',
          'What to write. <b>First line</b>: what the card does and what it hands back, as one short sentence that ends with a full stop. Then an empty line. Then <b>one line per parameter</b>, with its <b>unit</b>: grams, minutes, people.',
          'Line 9, <code>help(adjust)</code>, prints the note, under the def line. Press <b>Run</b>. Then add a line to the note, for example <code>Ben: grams per person is a different card.</code>, and run it again. <code>help</code> shows your new line at once.'
        ],
        tip: 'In VS Code, point at <code>adjust</code> anywhere in your file. A small box pops up with the def line and the docstring. That is the note doing its job, without anyone opening the card.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'A note in the wrong place falls off.',
        text: [
          'Python keeps a docstring in a hidden label on the card called <code>__doc__</code> (two underscores on each side). <code>print(adjust.__doc__)</code> shows it. When there is no note, <code>__doc__</code> is <code>None</code>, the empty jar from lesson 16.',
          '<b>Pain 1: the note slipped down.</b> In the first card, the string sits <b>after</b> a line of code. Python runs it as a plain value, does nothing with it, and moves on. It is a <b>lost string</b>. No error, no warning, and <code>__doc__</code> is <code>None</code>.',
          '<b>Pain 2: a comment at the top.</b> The second card has a note on the first line, but it starts with <code>#</code>. Python skips comments completely (lesson 17), so this note never reaches <code>__doc__</code> either. <code>help</code> and VS Code show nothing.'
        ],
        warn: 'Python never complains about a missing or lost docstring. The card works fine. You only find out three weeks later, when someone has to guess.'
      },
      {
        label: 'The fix', pic: `<div style="width:100%;min-width:0">${run(lost, { title: 'kitchen.py' })}${helpPic}</div>`,
        h: 'Move the note to the top.',
        text: [
          'Press <b>Run</b> on the first box: <code>None</code>. Now move line 3 up, so it sits <b>right under</b> <code>def</code>, above <code>total = ...</code>. Run it again: the note appears.',
          'The terminal below shows <code>help(adjust)</code> in the Python prompt, in Python 3.15. It prints which card it is, the def line with the parameters, and then the note, pushed in by 4 spaces.',
          'Ben has one more tool. With keyword arguments (lesson 46) he writes the jar names at the call: <code>adjust(recipe_grams=600, people=3)</code>. The note says what each jar means, and the call shows which number goes where. Anyone can read it and spot a mix-up.'
        ],
        tip: 'In the terminal, <code>help</code> opens the note in a viewer that fills the window. Use the arrow keys to scroll and press <b>q</b> to go back. In this page\'s Run boxes it simply prints.'
      },
      {
        label: 'Try it', pic: `<div style="width:100%;min-width:0">${run(tryIt, { title: 'protein.py' })}${run(fixed, { title: 'chili.py' })}</div>`,
        h: 'Label Ben\'s protein card.',
        text: [
          'The first box is the protein card from lesson 45. Its note says <code>Write your note here.</code> Replace it with a real one, then press <b>Run</b> and read what <code>help</code> prints.',
          'Your first line could be <code>Return the grams of protein in some food.</code> Then add one line for each parameter, with its unit: <code>grams</code> is the food in grams, and <code>per_100g</code> is grams of protein in 100 g of it.',
          'The second box is Ben\'s chili, done right. The card feeds 4 and uses 600 g of beans, so for 3 people it hands back 450.0. Press <b>Run</b>. Then change <code>people=3</code> to <code>people=6</code>: 900.0.'
        ],
        tip: 'Keep the first line short. Tools like <code>help</code> and VS Code often show only the first line in a list, so it must make sense on its own.'
      },
      {
        label: 'The catch', pic: `<div style="width:100%;min-width:0">${whoPic}${run(both, { title: 'kitchen.py' })}</div>`,
        h: 'Docstrings say what. Comments say how and why.',
        text: [
          'A <b>docstring</b> is for the person who <b>uses</b> the card. They should never need to read the code inside. Tell them what it does, what goes in, and what comes out.',
          'A <b>comment</b> is for the person who <b>reads</b> the code inside the card. Use it for how a tricky step works, or why it is there. Press <b>Run</b>: <code>__doc__</code> holds only the docstring. The comment on line 3 is gone, as every comment is.',
          'Keep notes true. When the card changes, change its note, as with comments (lesson 17). A wrong note is worse than none. And a tiny card with a clear name can get a <b>one-line</b> docstring, like line 2 here.'
        ],
        warn: 'A docstring is a promise, not a lock. Python does not check that Ben passes people and not servings. The note only helps a reader who looks. Lesson 90, Type hints, adds labels to the def line that tools can check.'
      }
    ],
    exercises: [
      {
        file: 'l48_label_the_card.py', title: 'Label the cards',
        task: 'Kitchen Coach has three small recipe cards with <b>no notes</b>: <code>protein_in</code>, <code>water_for</code> and <code>bake_minutes</code>. Give each one a <b>docstring</b>: a first line that says what it does and ends with a full stop, and the <b>unit</b> of what it hands back.',
        steps: [
          'Press <b>Open in VS Code</b>. Read the task at the top of the file, then run it once. It shows the first line of each note: <code>None</code> for all three.',
          'Between <code>START</code> and <code>END</code>, add a note in triple quotes as the <b>first line</b> inside each card. Do not change the <code>return</code> lines. Save the file.',
          'Run it again. The check reads each note and says <code>PASS</code> or gives you one hint. Then point at a card\'s name in VS Code and see your note pop up.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'Which card has a <b>docstring</b> that Python keeps?',
        pic: code([
          'def a(grams):',
          '    # Return the grams halved.',
          '    return grams / 2',
          '',
          'def b(grams):',
          '    """Return the grams halved."""',
          '    return grams / 2',
          '',
          'def c(grams):',
          '    half = grams / 2',
          '    """Return the grams halved."""',
          '    return half'
        ], { title: 'cards.py' }),
        options: ['a and b', 'all three', 'b only', 'b and c'],
        answer: 2,
        why: 'Only <code>b</code> has a string as the <b>first line</b> inside the card. <code>a</code> has a comment, which Python skips. In <code>c</code> the string comes after a line of code, so it is lost. <code>a.__doc__</code> and <code>c.__doc__</code> are both <code>None</code>.',
        hint: 'Two rules: it must be a string, and it must be the first line inside the card.'
      },
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['def water_for(rice_grams):', '    ml = rice_grams * 1.5', '    """Return the ml of water to cook this rice."""', '    return ml', '', 'print(water_for.__doc__)'], { title: 'rice.py' }),
        options: ['Return the ml of water to cook this rice.', 'None', '"""Return the ml of water to cook this rice."""', 'SyntaxError'],
        answer: 1,
        why: 'The note sits after <code>ml = ...</code>, so it is just a lost string. Python runs it, ignores it, and the card has no docstring. <code>__doc__</code> is <code>None</code>, and no error tells you.',
        hint: 'Is the string the first line inside the card?'
      },
      {
        type: 'fix', q: 'The note on this card is lost, so the program prints <code>None</code>. Fix it so <code>print(adjust.__doc__)</code> shows the note. Keep the card working: <code>adjust(400, 3)</code> must still be 300.0.',
        code: lost,
        title: 'kitchen.py',
        check: [
          'doc = adjust.__doc__',
          'if doc is None:',
          '    msg = "adjust.__doc__ is still None. Move the note up: it must be the FIRST line inside the card, right under def."',
          'elif adjust(400, 3) != 300:',
          '    msg = "The note is kept now, but adjust(400, 3) should still give 300.0. Keep the maths the same."',
          'elif "people" not in doc:',
          '    msg = "The note is there, but it lost its words. Keep the text: Return the grams needed, scaled to a number of people."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: 'With the string as the first line inside the card, Python keeps it as the docstring. <code>total = ...</code> comes next, then <code>return total</code>. The card works exactly as before, and now it explains itself.',
        hint: 'Swap lines 2 and 3, keeping both indented by 4 spaces.'
      },
      {
        type: 'bucket', q: 'Where does each note belong: in the <b>docstring</b>, or in a <b># comment</b> inside the card?',
        buckets: ['Docstring', '# comment'],
        items: [
          ['What the card hands back', 0],
          ['That recipe_grams is in grams', 0],
          ['That people means people, not servings', 0],
          ['Why we divide by 4 first', 1],
          ['How a tricky step works', 1],
          ['Why round() is used on this line', 1]
        ],
        why: 'The docstring is for the person who <b>uses</b> the card: what goes in, what comes out, with units. A comment is for the person who <b>reads the code</b>: how and why a step is done.',
        hint: 'Would someone who only calls the card need to know it? Then it goes in the docstring.'
      },
      {
        type: 'pick', q: 'Which is the best <b>first line</b> for this card\'s docstring?',
        pic: code(['def bake_minutes(cake_grams):', '    return 20 + cake_grams / 50'], { title: 'cake.py' }),
        options: [
          'This is a function.',
          'Adds 20 to cake_grams divided by 50',
          'Return the minutes a cake of this weight bakes.',
          'Chloe\'s cake'
        ],
        answer: 2,
        why: 'It says what the card hands back, in which unit, as one sentence with a full stop. "This is a function" says nothing. Repeating the maths tells the user how, not what. "Chloe\'s cake" does not say what comes out.',
        hint: 'A good first line says what comes back, and in which unit.'
      },
      {
        type: 'pick', q: 'Back to lesson 46. Ben read the docstring. Which call makes it plain, to anyone reading it, which number goes into which jar?',
        pic: code(['def adjust(recipe_grams, people):', '    """Return the grams needed, scaled to a number of people.', '', '    recipe_grams: grams on the card, which feeds 4 people', '    people: how many people will eat', '    """', '    return recipe_grams / 4 * people'], { title: 'kitchen.py' }),
        options: ['adjust(600, 3)', 'adjust(recipe_grams=600, people=3)', 'adjust(3, 600)', 'adjust("600", "3")'],
        answer: 1,
        why: 'Keyword arguments write the jar name at the call. Together with the docstring, the call explains itself: 600 is the grams on the card, 3 is people. <code>adjust(600, 3)</code> works too, but the reader has to open the card to know which number is which.',
        hint: 'Which call names the jars?'
      },
      {
        type: 'fill', q: 'Finish the card so <code>help(protein_in)</code> shows the note.',
        text: 'def protein_in(grams, per_100g):\n    ___Return the grams of protein in some food.___\n    return grams * per_100g / 100\n\nhelp(___)',
        options: ['"""', '"""', '#', 'protein_in', 'protein_in()', 'print'],
        answer: ['"""', '"""', 'protein_in'],
        why: 'Three quote marks open and close the note. <code>help</code> takes the card itself, with no brackets after its name: <code>help(protein_in)</code>. With brackets, Python would call the card first.',
        hint: 'A docstring is a string, so it needs quote marks. And help wants the card, not a call of it.'
      },
      {
        type: 'type', q: 'Type the line that prints the docstring of <code>adjust</code>, using its hidden label.',
        prompt: '>>>',
        answers: ['print(adjust.__doc__)'],
        why: 'Every function has a <code>__doc__</code> label: two underscores, <code>doc</code>, two underscores. It holds the docstring, or <code>None</code> when there is none. <code>help(adjust)</code> shows it too, with the def line on top.',
        hint: 'print, then the card\'s name, a dot, and the label with two underscores on each side.'
      }
    ]
  });
})();
