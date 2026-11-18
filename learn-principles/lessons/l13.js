/* Lesson 13: Boy Scout rule (module 1). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l13  Boy Scout rule
     ===================================================================== */
  const mug = (x, y, fill) =>
    `<rect x="${x}" y="${y}" width="26" height="28" rx="4" fill="${fill}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<path d="M${x + 26} ${y + 7} q12 7 0 14" fill="none" stroke="${P.ink}" stroke-width="2.5"/>`;

  const mugPic = svg(600, 300, 'Washing one mug each time keeps the sink empty. Saving the mugs for one big clean leaves a growing pile.',
    T(150, 34, 'WASH IT AS YOU GO', { s: 12.5, f: P.ok }) + T(450, 34, 'SAVE IT FOR THE BIG CLEAN', { s: 12.5, f: P.danger }) +
    `<line x1="300" y1="24" x2="300" y2="286" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    /* left: an empty sink, one clean mug on the rack */
    box(50, 150, 200, 64, P.okT, 14) + T(150, 188, 'empty sink', { s: 13, f: P.ok }) +
    `<line x1="70" y1="120" x2="230" y2="120" stroke="${P.ink}" stroke-width="3" stroke-linecap="round"/>` +
    mug(128, 90, P.white) +
    T(150, 250, '30 seconds, every time', { s: 13 }) + T(150, 272, 'the kitchen never gets bad', { s: 13, w: 700, f: P.ink2 }) +
    /* right: a pile */
    box(350, 150, 200, 64, P.dangerT, 14) +
    [[366, 172, P.white], [400, 176, P.warnT], [436, 170, P.white], [472, 176, P.tint], [506, 172, P.white],
      [384, 148, P.tint], [420, 146, P.white], [456, 148, P.warnT], [492, 146, P.white],
      [402, 120, P.white], [438, 118, P.tint], [474, 120, P.white], [438, 90, P.warnT]].map(m => mug(m[0], m[1], m[2])).join('') +
    T(450, 250, '"I will do it all on Saturday"', { s: 13 }) + T(450, 272, 'Saturday never has the time', { s: 13, w: 700, f: P.ink2 }));

  const startCode = [
    'def cookie_total(x):',
    '    total = x * COOKIE_PRICE',
    '    # total = total - 1',
    '    return total + total * TAX_RATE',
    '',
    'def cake_total(cakes):',
    '    total = cakes * CAKE_PRICE',
    '    return total + total * TAX_RATE'
  ];

  const messyCode = [
    'def cookie_total(x):',
    '    total = x * COOKIE_PRICE',
    '    # total = total - 1',
    '    tmp2 = total + BOX_PRICE',
    '    return tmp2 + tmp2 * TAX_RATE',
    '',
    'def cake_total(cakes):',
    '    total = cakes * CAKE_PRICE',
    '    # TODO fix later',
    '    # total = total + CANDLE_PRICE',
    '    return total + total * TAX_RATE',
    '',
    'def pie_total(pies):',
    '    total = pies * PIE_PRICE',
    '    tmp3 = total + BOX_PRICE',
    '    return tmp3 + tmp3 * TAX_RATE'
  ];

  const cleanCode = [
    'def with_tax(total):',
    '    return total + total * TAX_RATE',
    '',
    'def cookie_total(cookies):',
    '    total = cookies * COOKIE_PRICE',
    '    total = total + BOX_PRICE',
    '    return with_tax(total)',
    '',
    'def cake_total(cakes):',
    '    total = cakes * CAKE_PRICE',
    '    return with_tax(total)',
    '',
    'def pie_total(pies):',
    '    total = pies * PIE_PRICE',
    '    total = total + BOX_PRICE',
    '    return with_tax(total)'
  ];

  /* one strip per timeline: five visits, what each one left or tidied */
  const visitStrip = (label, cells, fill, col) => svg(600, 132, label,
    cells.map((c, i) => {
      const x = 8 + i * 118;
      return box(x, 12, 110, 86, fill, 12) +
        T(x + 55, 34, 'visit ' + (i + 1), { s: 12, w: 700, f: P.ink2 }) +
        T(x + 55, 58, c[0], { s: 12.5, f: col }) + T(x + 55, 76, c[1], { s: 12.5, f: col }) +
        T(x + 55, 122, c[2], { s: 12, w: 700, f: P.ink2 });
    }).join(''));

  const painPic = `<div style="width:100%">${code(messyCode, { title: 'shop.py, after 5 visits in a hurry', bad: [1, 3, 4, 5, 9, 10, 15, 16] })}` +
    visitStrip('Five hurried visits. Each one leaves something behind: a fix later note, the name tmp2, a third copy of the tax line, a switched-off line, and the name tmp3.',
      [['a "fix later"', 'note', 'candles'], ['the name', 'tmp2', 'cookie box'], ['a third copy', 'of the tax line', 'pies'], ['a switched-off', 'line', 'free candles'], ['the name', 'tmp3', 'pie box']],
      P.dangerT, P.danger) + `</div>`;

  const fixPic = `<div style="width:100%">${code(cleanCode, { title: 'shop.py, after the same 5 visits with one tidy each', good: [1, 2, 4, 5], hi: [7, 11, 16] })}` +
    visitStrip('The same five visits. The first three each end with one small tidy: x renamed to cookies, the dead line deleted, the tax line given one home. On visits 4 and 5 there is nothing left to tidy.',
      [['x becomes', 'cookies', 'candles'], ['dead line', 'deleted', 'cookie box'], ['tax line gets', 'one home', 'pies'], ['nothing left', 'to tidy', 'free candles'], ['nothing left', 'to tidy', 'pie box']],
      P.okT, P.ok) + `</div>`;

  const px = v => 80 + v * 92, py = c => 236 - c * 26;
  const pts = a => a.map((c, v) => px(v) + ',' + py(c)).join(' ');
  const chartPic = svg(600, 300, 'Both lines start at 2 leftovers. With one more leftover each visit the line climbs to 7. With one tidy each visit it falls to 0 and stays there.',
    T(300, 26, 'Leftovers in the same file, visit by visit', { s: 14 }) +
    `<path d="M${px(0) - 24} 44 V${py(0)} H${px(5) + 20}" fill="none" stroke="${P.ink}" stroke-width="2.5" stroke-linecap="round"/>` +
    [0, 1, 2, 3, 4, 5].map(v => T(px(v), 258, v === 0 ? 'start' : 'visit ' + v, { s: 12, w: 700, f: P.ink2 })).join('') +
    `<polyline points="${pts([2, 3, 4, 5, 6, 7])}" fill="none" stroke="${P.danger}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>` +
    `<polyline points="${pts([2, 1, 0, 0, 0, 0])}" fill="none" stroke="${P.ok}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>` +
    [3, 4, 5, 6, 7].map((c, i) => `<circle cx="${px(i + 1)}" cy="${py(c)}" r="6" fill="${P.danger}" stroke="${P.ink}" stroke-width="2"/>`).join('') +
    [1, 0, 0, 0, 0].map((c, i) => `<circle cx="${px(i + 1)}" cy="${py(c)}" r="6" fill="${P.ok}" stroke="${P.ink}" stroke-width="2"/>`).join('') +
    `<circle cx="${px(0)}" cy="${py(2)}" r="7" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
    T(px(0) - 34, py(2) + 5, '2', { s: 14 }) +
    T(px(5) - 10, py(7) - 14, '7: in a hurry', { s: 13, f: P.danger }) +
    T(px(4) + 20, py(0) - 16, '0: one small tidy each visit', { s: 13, f: P.ok }) +
    T(300, 288, 'small steps add up in both directions', { s: 13, w: 700, f: P.ink2 }));

  const tidyBefore = [
    'def pie_total(pies):',
    '    total = pies * PIE_PRICE',
    '    total = total + BOX_PRICE',
    '    return with_tax(total)'
  ];
  const tidyAfter = [
    'def pie_total(pies):',
    '    total = pies * PIE_PRICE',
    '    return with_tax(total) + BOX_PRICE'
  ];
  const notPic = `<div style="width:100%">` +
    code(tidyBefore, { title: 'before the "tidy": the box is taxed', good: [3, 4] }) +
    code(tidyAfter, { title: 'after the "tidy": one line shorter, and the box is not taxed', bad: [3] }) +
    svg(600, 120, 'One 12 dollar pie with a 1 dollar box cost 14.17 dollars before the tidy and 14.08 dollars after it',
      box(40, 26, 200, 70, P.okT, 14) + T(140, 70, '$14.17', { s: 26, m: true }) + T(140, 114, 'before', { s: 12.5, w: 700, f: P.ink2 }) +
      `<circle cx="300" cy="61" r="26" fill="${P.dangerT}" stroke="${P.ink}" stroke-width="2.5"/>` + T(300, 72, '≠', { s: 30, f: P.danger }) +
      box(360, 26, 200, 70, P.dangerT, 14) + T(460, 70, '$14.08', { s: 26, m: true, f: P.danger }) + T(460, 114, 'after', { s: 12.5, w: 700, f: P.ink2 })) + `</div>`;

  const samCode = [
    'def delivery_total(km):',
    '    # TODO sort this out',
    '    fee = km * FEE_PER_KM',
    '    # fee = fee + 2',
    '    return with_tax(fee)'
  ];

  COURSE.add({
    id: 'l13', minutes: 8,
    summary: 'Every time you open a file for a real task, make one small improvement before you leave. That is the <b>Boy Scout rule</b>: leave the code a little cleaner than you found it.',
    video: {
      src: 'videos/l13-boy-scout-rule.mp4', poster: 'videos/l13-boy-scout-rule.jpg', length: '1 min 1 s',
      script: [
        'Scouts have a rule for camping. Leave the campsite cleaner than you found it.',
        "Maya's shop file gets a visit every week. A new feature here, a small fix there.",
        'In a hurry, each visit leaves something behind. A note that says fix later. A name like tmp2. A copied line. An old line, switched off but never deleted.',
        'No single one hurts. But after 5 visits, the file is a mess, and a small change takes all afternoon.',
        'Now play it again, with one new habit. Each visit, Maya does her task, then tidies one small thing. A clearer name. A dead line deleted. A copied line given one home. 2 minutes each.',
        'After 5 visits, the same file is clean. And the same small change takes 5 minutes.',
        'That is the Boy Scout rule. Leave the code a little cleaner than you found it.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: mugPic,
        h: 'Wash your mug.',
        text: [
          'Scouts have a rule for camping: <b>leave the campsite cleaner than you found it</b>. Take your own litter home, and pick up one piece that was already there.',
          'A shared kitchen works the same way. Wash your mug each time you use it and the kitchen never gets bad. Save every mug for "the big clean on Saturday" and the pile grows. Saturday never has the time.',
          'The <b>Boy Scout rule</b> brings this to code. Every time you open a file for a real task, make <b>one small improvement</b> before you leave. The saying is usually credited to the programmer Robert C. Martin, known as "Uncle Bob".'
        ],
        tip: 'Nobody ever gets a free week to "clean everything", and nobody needs one. Hundreds of tiny clean-ups, each done while you are already there, keep code <b>easy to change</b>. That was the goal in lesson 1.'
      },
      {
        label: 'The code', pic: code(startCode, { title: 'shop.py, as Maya finds it today', hi: [1, 3] }),
        h: 'A file with two small leftovers.',
        text: [
          '<code>shop.py</code> has grown. These two jobs work out what a customer pays for cookies and for cakes. The names in capitals, like <code>COOKIE_PRICE</code> and <code>TAX_RATE</code>, are each set once in another place, as in lessons 1 and 7.',
          'The code works. But look at <b>line 1</b>. What is <code>x</code>? You have to read on to learn that it is the number of cookies.',
          'Now <b>line 3</b>. A line starting with <code>#</code> is a note for people, and the computer skips it. This one is an old line of code with a <code>#</code> put in front to <b>switch it off</b>. It took $1 off during a sale last summer. The sale ended. The line stayed. Code that can never run is called <b>dead code</b>.',
          'Neither one is a bug. They are <b>litter</b>: small things that make the next reader a little slower.'
        ],
        tip: 'Lines 4 and 8 are the same. That is fine for now. Lesson 9, Rule of three, said a second copy is allowed. Watch what happens when a third one arrives.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Five visits in a hurry.',
        text: [
          'Over five weeks Maya opens this file five times. Each time she has a real task and not much time. And the file is <b>already a bit messy</b>, so a bit more does not seem to matter.',
          '<b>Visit 1:</b> cakes get a candle pack. She is not sure if candles are taxed, so she leaves a note, <code># TODO fix later</code>. Programmers write TODO for "still to do". <b>Visit 2:</b> cookies get a box. She needs a new name fast and types <code>tmp2</code>. <b>Visit 3:</b> pies. She copies the tax line a third time. <b>Visit 4:</b> candles become free. She switches the line off with a <code>#</code> and never deletes it. <b>Visit 5:</b> pies get a box too, and a <code>tmp3</code>.',
          'No single visit did any harm. The shop charged the right amount every day. But count the leftovers. There were 2. Now there are <b>7</b>.',
          'Then a small request arrives. The city adds a <b>10 cent fee</b> to every sale, after tax. Maya searches the file for <code>total + total * TAX_RATE</code> and finds one line. There are really <b>three</b>. Two are hiding behind <code>tmp2</code> and <code>tmp3</code>. And what was to be fixed later? Are the switched-off lines still needed? She has to read every line to be sure. A five-minute change takes <b>all afternoon</b>.'
        ],
        warn: 'Nobody decided to make a mess. Each visit added "one small thing" to a file that was "messy anyway". Mess invites more mess. The bigger picture comes much later, in lesson 50, Technical debt, and lesson 51, Broken windows.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Same five visits, one tiny tidy each.',
        text: [
          'Play the five weeks again. The tasks are the same. This time Maya has one new habit. She does her task, and then she spends <b>two minutes</b> on one small tidy, right next to the lines she was already changing.',
          '<b>Visit 1:</b> she adds the candles, then renames <code>x</code> to <code>cookies</code>. Choosing good names is lesson 12, Meaningful names. <b>Visit 2:</b> she adds the box, then deletes the dead sale line. <b>Visit 3:</b> pies would need a third copy of the tax line. Lesson 9 said the third time is the moment. So she gives the rule one home, <code>with_tax</code>, as in lesson 6, DRY.',
          'She also stops dropping litter of her own. On visit 1 she asks about the candle tax there and then, so no "fix later" note is needed. On visit 2 the box price is added straight to <code>total</code>, so there is no <code>tmp2</code>. On visit 4 the candle line is <b>deleted</b>, not switched off.',
          'Now the city fee arrives. Maya adds <code>+ 0.10</code> to the end of <b>line 2</b>, and all three jobs follow. Five minutes.'
        ],
        tip: 'By visits 4 and 5 there was nothing left to pick up near her change. That is fine. The rule does not ask you to invent work. Lines 6 and 15 are only a second copy, which lesson 9 allows.'
      },
      {
        label: 'The test', pic: chartPic,
        h: 'Ask it on the way out.',
        text: [
          'Before you close a file, ask: <b>"Is this file a little better than when I opened it?"</b>',
          '"A little" is the important part. One clearer name. One dead line gone. If the answer is yes, you are done.',
          'The picture shows why so little is enough. Both lines start at the same file, with 2 leftovers. One more each visit ends at 7. One fewer each visit reaches 0 and stays there. Small steps add up in <b>both directions</b>.'
        ]
      },
      {
        label: 'When not to', pic: notPic,
        h: 'Small, close by, and separate.',
        text: [
          '<b>Keep it small and next to your change.</b> Suppose Maya is asked to fix one line in <code>cake_total</code>. She loves this lesson, so she also renames and reorders everything in the file. Sam has to check her work. He sees 60 changed lines and cannot find the one that matters. The real change is buried.',
          '<b>Never mix a change in behaviour into a tidy.</b> A tidy must leave every total exactly as it was. Look at the code. While "tidying" <code>pie_total</code>, Maya moves the box price outside <code>with_tax</code>. It is one line shorter. But the box is no longer taxed. A pie costs $12 and a box costs $1. One pie used to come to <b>$14.17</b>. Now it comes to <b>$14.08</b>. Do the tidy and the real change as two separate steps. Then if something breaks, you know which step did it.',
          '<b>Do not tidy what you do not understand, or cannot check.</b> Maya could delete the summer sale line because she knew its story. A line that only looks odd may be doing a job. Ask first. And if you have no way to check that the totals still come out the same, leave it alone.',
          '<b>If a clean-up turns out to be big, write it down</b> as its own task, with enough detail to act on. "Rename tmp2 and tmp3 in shop.py" is a task. "Fix later" is litter.'
        ],
        warn: 'The rule says <b>a little</b> cleaner. One small, safe improvement per visit. Not a makeover. Knowing why something is there before you remove it has its own lesson: lesson 56, Chesterton\'s fence.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does the Boy Scout rule ask you to do?',
        options: ['Set aside one week a year to clean all the code', 'Each time you touch a file for a real task, leave it a little cleaner', 'Rewrite any file that looks messy', 'Fix every problem in a file before you close it'],
        answer: 1,
        why: 'One small improvement, made while you are already there. The big clean-up week never comes, and it is not needed.',
        hint: 'Think of the mug. When does it get washed?'
      },
      {
        type: 'pick', q: 'Sam added a delivery job in a hurry. Which lines are litter he left behind? Pick all that apply.',
        pic: code(samCode, { title: 'delivery.py' }),
        options: ['Line 2: a note that does not say what to sort out', 'Line 3: working out the fee', 'Line 4: an old line that is switched off', 'Line 5: asking with_tax for the total'],
        answer: [0, 2],
        why: 'Line 2 tells the next reader nothing they can act on. Line 4 can never run. Lines 3 and 5 are the real work.',
        hint: 'Which lines start with <code>#</code>? Would the job work the same without them?'
      },
      {
        type: 'fill', q: 'Maya is in this job to add a box. Finish her two-minute tidy.',
        text: 'def cookie_total(___):\n    total = ___ * COOKIE_PRICE\n    total = total + BOX_PRICE\n    return ___(total)',
        options: ['cookies', 'cookies', 'with_tax', 'x', 'tmp2'],
        answer: ['cookies', 'cookies', 'with_tax'],
        why: 'A name that says what the value is, and one home for the tax rule. Two ideas from this module, used in two minutes.',
        hint: 'The first two blanks take the same clear name. The last one is the job that adds the tax.'
      },
      {
        type: 'type', q: 'Back to lesson 1. Ask its question about the messy file: the city adds a 10 cent fee after tax. How many lines must change? Type the number.',
        pic: code(messyCode, { title: 'shop.py, after 5 visits in a hurry' }),
        prompt: 'lines >',
        answers: ['3', 'three'],
        why: 'Lines 5, 11 and 16 all add the tax. Two of them are hiding behind <code>tmp2</code> and <code>tmp3</code>, so a search for the usual line finds only one. In the tidy file the answer is 1.',
        hint: 'Look at every line that starts with <code>return</code>.'
      },
      {
        type: 'bucket', q: 'Maya is in cake_total to change one line. Tidy it now, or write it down as its own task?',
        buckets: ['Small tidy: do it now', 'Too big: its own task'],
        items: [
          ['Rename one confusing name in cake_total', 0],
          ['Delete a switched-off line she knows is dead', 0],
          ['Delete a "fix later" note after fixing the thing', 0],
          ['Rename every job in the file', 1],
          ['Split shop.py into five new files', 1],
          ['Rewrite a job she does not understand', 1]
        ],
        why: 'A tidy is small, close to your change, and safe. Anything bigger hides the real change, so it gets its own task and its own check.',
        hint: 'Could she do it in two minutes, right next to the line she came to change?'
      },
      {
        type: 'pick', q: 'A tidy must not change what the code does. One of these "tidy-ups" changes a total. Which one?',
        options: ['Renaming tmp2 to a clearer name everywhere it is used', 'Deleting a line that is switched off with #', 'Changing with_tax(total + BOX_PRICE) to with_tax(total) + BOX_PRICE', 'Deleting a "TODO fix later" note'],
        answer: 2,
        why: 'Moving the box price outside <code>with_tax</code> means the box is no longer taxed. With a $12 pie and a $1 box, $14.17 becomes $14.08. That is a change in behaviour dressed up as a tidy.',
        hint: 'Three of these leave every total the same. In one of them, something stops being taxed.'
      },
      {
        type: 'order', q: 'Put one good visit in order.',
        items: ['Open the file for a real task', 'Make the change you came for', 'Check that it works', 'Make one small tidy next to it', 'Check that every total is still the same', 'Close the file'],
        why: 'The task comes first and is checked on its own. The tidy is a separate step with its own check. If something breaks, you know which step did it.',
        hint: 'The tidy comes after the real change, and each one gets its own check.'
      },
      {
        type: 'match', q: 'Each small tidy uses a lesson from this module. Match the tidy to its lesson.',
        pairs: [
          ['Meaningful names', 'Rename x to cookies'],
          ['DRY', 'Give the tax rule one home, with_tax'],
          ['KISS', 'Swap a clever one-line trick for plain steps'],
          ['YAGNI', 'Delete an option that nobody ever asked for']
        ],
        why: 'The Boy Scout rule is how the other lessons get used. Not in one big clean-up, but a little on every visit.',
        hint: 'DRY is about repeated rules. YAGNI is about things nobody needs yet.'
      }
    ]
  });
})();
