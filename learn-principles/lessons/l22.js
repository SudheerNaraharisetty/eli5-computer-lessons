/* Lesson 22: Fail fast (module 2). One file per lesson. */
(function () {
  const { P, code, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l22  Fail fast
     ===================================================================== */

  // Five stations in a row: the path one order takes through the shop's code.
  const NAMES = ['order', 'total', 'sales file', 'baking plan', 'weekly report'];
  const row = (y, vals, fills, cols) => NAMES.map((n, i) => {
    const x = 8 + i * 120;
    return box(x, y, 104, 62, fills[i], 12) +
      T(x + 52, y + 22, n, { s: 11.5, w: 800, f: P.ink2 }) +
      T(x + 52, y + 47, vals[i], { s: vals[i].length > 8 ? 12 : 15, m: true, f: cols[i] }) +
      (i < 4 ? arrow(x + 106, y + 31, x + 119, y + 31, P.ink, 2.5) : '');
  }).join('');

  const ideaPic = svg(600, 300, 'Found at once, a mistake costs minutes. Found three weeks later, after it has done damage, it costs days.',
    T(20, 34, 'FAIL FAST', { s: 12.5, f: P.ok, a: 'start' }) +
    box(20, 50, 110, 56, P.warnT, 12) + T(75, 84, 'mistake', { s: 14 }) +
    arrow(134, 78, 160, 78, P.ok, 3) +
    box(164, 50, 150, 56, P.okT, 12) + T(239, 76, 'ALARM', { s: 14, f: P.ok }) + T(239, 94, 'right here, right now', { s: 11.5, w: 700, f: P.ink2 }) +
    T(450, 74, 'costs minutes', { s: 15, f: P.ok }) + T(450, 94, 'nothing else was touched', { s: 12, w: 700, f: P.ink2 }) +
    `<line x1="20" y1="140" x2="580" y2="140" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    T(20, 176, 'CARRY ON QUIETLY', { s: 12.5, f: P.danger, a: 'start' }) +
    box(20, 192, 110, 56, P.warnT, 12) + T(75, 226, 'mistake', { s: 14 }) +
    [0, 1, 2].map(i => arrow(134 + i * 92, 220, 152 + i * 92, 220, P.danger, 3) + box(156 + i * 92, 196, 66, 48, P.dangerT, 10) + T(189 + i * 92, 225, 'damage', { s: 11.5, f: P.danger })).join('') +
    arrow(410, 220, 428, 220, P.danger, 3) +
    box(432, 192, 148, 56, P.dangerT, 12) + T(506, 218, 'ALARM', { s: 14, f: P.danger }) + T(506, 236, '3 weeks later', { s: 11.5, w: 700, f: P.ink2 }) +
    T(300, 282, 'costs days, and it has already done damage', { s: 13, w: 700, f: P.ink2 }));

  const orderCode = [
    'CAKE_PRICE = 20',
    '',
    'def take_order(name, count):',
    '    total = count * CAKE_PRICE',
    '    save_sale(name, total)',
    '    add_to_baking_plan(count)',
    '    print_slip(name, count, total)'
  ];
  const fixedCode = orderCode.slice(0, 3).concat([
    '    if count <= 0:',
    '        raise ValueError(',
    '            "count must be at least 1, got " + str(count))'
  ], orderCode.slice(3));

  const codePic = `<div style="width:100%">${code(orderCode, { title: 'orders.py', hi: [4, 5, 6] })}` +
    svg(600, 130, 'A good order for 3 cakes: the total is 60 dollars, the sales file gains 60 dollars and the baking plan goes from 12 cakes to 15',
      T(300, 22, 'Mrs Lee orders 3 cakes', { s: 12.5, w: 700, f: P.ink2 }) +
      row(40, ['3', '$60', '+$60', '12 → 15', 'adds up'], [P.okT, P.okT, P.okT, P.okT, P.okT], [P.ok, P.ok, P.ok, P.ok, P.ok])) + `</div>`;

  const painPic = `<div style="width:100%">` +
    svg(600, 270, 'Minus 3 is typed. Every station takes it without complaint. The alarm only comes three weeks later, at the weekly report.',
      T(300, 24, 'Sam types -3. No station complains.', { s: 13 }) +
      row(44, ['-3', '-$60', '-$60', '12 → 9', '$120 short'], [P.dangerT, P.dangerT, P.dangerT, P.dangerT, P.dangerT], [P.danger, P.danger, P.danger, P.danger, P.danger]) +
      `<line x1="60" y1="150" x2="540" y2="150" stroke="${P.ink}" stroke-width="3" stroke-linecap="round"/>` +
      `<circle cx="60" cy="150" r="9" fill="${P.warn}" stroke="${P.ink}" stroke-width="2.5"/>` +
      `<circle cx="540" cy="150" r="9" fill="${P.danger}" stroke="${P.ink}" stroke-width="2.5"/>` +
      T(60, 180, 'the typo', { s: 12.5 }) + T(60, 197, '0 seconds', { s: 12, w: 700, f: P.ink2 }) +
      T(540, 180, 'the alarm', { s: 12.5, f: P.danger }) + T(540, 197, '3 weeks later', { s: 12, w: 700, f: P.ink2 }) +
      T(300, 140, 'nothing crashes, nobody is told', { s: 12, w: 700, f: P.ink2 }) +
      arrow(520, 232, 80, 232, P.danger, 3) + T(300, 256, 'Maya traces it back, station by station: 2 days', { s: 12.5, w: 700, f: P.ink2 })) + `</div>`;

  const fixPic = `<div style="width:100%">${code(fixedCode, { title: 'orders.py, with a check at the door', good: [4, 5, 6] })}` +
    term(['$ take_order("Mrs Lee", -3)', '  File "orders.py", line 5, in take_order', 'ValueError: count must be at least 1, got -3'], 'what Sam sees, the second he presses Enter') +
    svg(600, 124, 'With the check, minus 3 is stopped at the first station. The other four stations never see it.',
      row(22, ['-3  STOP', 'untouched', 'untouched', 'untouched', 'untouched'], [P.dangerT, P.okT, P.okT, P.okT, P.okT], [P.danger, P.ok, P.ok, P.ok, P.ok]) +
      T(300, 112, 'stopped at station 1, after 0 seconds', { s: 12.5, w: 700, f: P.ink2 })) + `</div>`;

  const testPic = svg(600, 300, 'Three things code can do with a bad value: carry on, make up a value, or stop and say so. Only the last one fails fast.',
    T(300, 28, 'A bad value arrives. What does the code do?', { s: 14 }) +
    [
      ['CARRY ON', 'uses -3 as it is', 'fails far away,', 'weeks later', P.dangerT, P.danger],
      ['MAKE UP A VALUE', 'count = 1', 'wrong answer,', 'and nobody is told', P.dangerT, P.danger],
      ['STOP AND SAY SO', 'raise ValueError', 'fails here, now,', 'with a clear reason', P.okT, P.ok]
    ].map((c, i) => {
      const x = 14 + i * 196;
      return T(x + 90, 62, c[0], { s: 12.5, f: c[5] }) +
        box(x, 76, 180, 64, '#15132B', 12) + T(x + 90, 114, c[1], { s: 13, m: true, f: '#ECEAFF' }) +
        arrow(x + 90, 150, x + 90, 184, c[5], 3) +
        box(x, 192, 180, 70, c[4], 12) + T(x + 90, 222, c[2], { s: 13, f: c[5] }) + T(x + 90, 242, c[3], { s: 13, f: c[5] });
    }).join('') +
    T(108, 288, 'quiet', { s: 12.5, w: 700, f: P.ink2 }) + T(304, 288, 'quiet', { s: 12.5, w: 700, f: P.ink2 }) + T(500, 288, 'loud', { s: 12.5, w: 700, f: P.ink2 }));

  const whenPic = svg(600, 330, 'Three kinds of trouble and what to do about each. Only a mistake inside the program should stop the job loudly.',
    T(150, 28, 'WHAT WENT WRONG', { s: 12.5, f: P.ink2 }) + T(450, 28, 'WHAT TO DO', { s: 12.5, f: P.ink2 }) +
    [
      ['A value that cannot be right', 'reaches a job: -3 cakes', 'Stop the job loudly', 'raise, with a clear message', P.dangerT, P.danger],
      ['A person mistypes', 'in the order box', 'Catch it at the door, kindly', '"Please enter 1 or more"', P.warnT, P.warn],
      ['A normal hiccup: no paper,', 'the internet drops', 'Cope with it', 'try again, or let it wait', P.okT, P.ok]
    ].map((r, i) => {
      const y = 44 + i * 82;
      return box(14, y, 272, 64, P.white, 12) + T(150, y + 28, r[0], { s: 13 }) + T(150, y + 47, r[1], { s: 12.5, w: 700, f: P.ink2 }) +
        arrow(292, y + 32, 310, y + 32, r[5], 3) +
        box(314, y, 272, 64, r[4], 12) + T(450, y + 28, r[2], { s: 13, f: r[5] }) + T(450, y + 47, r[3], { s: 12.5, w: 700, f: P.ink2 });
    }).join('') +
    T(300, 308, 'Overdone: the printer runs out of paper, so the whole order is refused.', { s: 12.5, w: 700, f: P.danger }));

  COURSE.add({
    id: 'l22', minutes: 8,
    summary: 'When something is wrong, stop at once and say clearly what is wrong, right where you noticed it. That is <b>fail fast</b>. A program that carries on with bad data does not avoid the failure. It moves it somewhere worse.',
    video: {
      src: 'videos/l22-fail-fast.mp4', poster: 'videos/l22-fail-fast.jpg', length: '1 min 5 s',
      script: [
        "Sam takes a phone order at Maya's cookie shop. 3 cakes. But his finger slips, and he types -3.",
        'The order job does not check. So the bad number rolls on, quietly.',
        'The total becomes -$60. The sales file saves it. The baking plan loses 3 cakes. And the weekly report comes out wrong. Nothing crashes.',
        '3 weeks later, the accountant finds a hole in the books. Maya spends 2 days tracing it back, station by station, to one mistyped number.',
        'The fix is one check at the door. If the count is 0 or less, raise an error. That means, stop right here, and say what is wrong.',
        'Play it again. -3 goes in. The gate slams shut. The message says, count must be at least 1, got -3. Sam fixes it in seconds, and every later station stays clean.',
        'That is fail fast. Stop at the first sign of trouble, and say so loudly.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'The alarm at the first wisp of smoke.',
        text: [
          'A smoke alarm goes off at the first wisp of smoke. It is loud and annoying, on purpose. You deal with burnt toast, not a burnt kitchen.',
          'Now picture a polite alarm that stays quiet so nobody is bothered. The fire is still there. You just find out later, when it is much bigger.',
          '<b>Fail fast</b> brings this to code. When something is wrong, like a value that cannot be right or a missing thing the code needs, the code should <b>stop at once</b> and <b>say clearly what is wrong</b>, right where it noticed. No guessing a value. No quietly carrying on.'
        ],
        tip: 'Lesson 1 said the hardest bugs are the ones where nothing crashes and the program is just quietly wrong. Fail fast is how you turn a quiet bug into a loud one.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'A cake order, taken on trust.',
        text: [
          'Sam takes cake orders over the phone and types them in. The job <code>take_order</code> is given the customer\'s <code>name</code> and the <code>count</code>, the number of cakes. A cake costs $20. Tax is left out to keep the sums easy.',
          'Line 4 works out the total. Line 5 writes the sale into the sales file. Line 6 adds the cakes to the baker\'s plan for Saturday. Line 7 prints a slip.',
          'Mrs Lee orders 3 cakes. The total is $60. The sales file gains $60. The baking plan goes from 12 cakes to 15. All good.',
          'Now look for the line that asks <b>"does this count make sense?"</b> There is none. Whatever number is typed flows straight on to every step.'
        ]
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Minus three cakes.',
        text: [
          'On the next call Sam\'s finger slips. He types <code>-3</code>. Nobody can order minus three cakes, but the job does not ask.',
          'Line 4 works out -3 times $20. The total is <b>-$60</b>. Line 5 saves -$60 in the sales file. Line 6 adds -3 to the baking plan, so 12 cakes becomes <b>9</b>. It should be 15. The slip prints. <b>Nothing crashes.</b>',
          'On Saturday the baker is 6 cakes short, and nobody knows why. Mrs Lee pays her $60.',
          'Three weeks later the accountant finds a hole. The sales file is <b>$120</b> below the money in the bank. The shop took in $60, and the file says minus $60. Maya spends <b>two days</b> tracing it back: from the report, to the sales file, to the total, to one mistyped number.'
        ],
        warn: 'The mistake took one second to make, at the keyboard. It showed up three weeks later, four steps away. Carrying on did not avoid the failure. It moved it to a place where it was far harder to trace, after it had done damage.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'One check at the door.',
        text: [
          'Maya adds one check as the first step of the job. <code>&lt;=</code> means "less than or equal to". So line 4 asks: is the count 0 or less?',
          'Line 5 has a new Python word. <code>raise ValueError("...")</code> means <b>"stop right here and report this problem"</b>. The program stops running this job, so nothing is saved and nothing is planned. And the message tells whoever is fixing it exactly what went wrong. Python adds the file and the line number.',
          '<code>ValueError</code> is Python\'s name for "this value is not acceptable". <code>str(count)</code> turns the number into text, so that <code>+</code> can join it to the message, as in lesson 18. The message carries on into line 6, which Python allows inside brackets, as in lesson 12.',
          'Sam types -3 again. This time he gets the message the second he presses Enter: <b>count must be at least 1, got -3</b>. He types 3. Nothing else was touched.',
          'The code that called <code>take_order</code> can choose to catch the problem and deal with it, for example by asking Sam to type the number again.'
        ],
        tip: 'The check sits on the first lines of the job, like the guard clauses in lesson 21. The difference is what it does next. A guard clause steps out quietly for an odd case. This check stops loudly, because -3 cakes is not an odd case. It is a mistake.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Stop here, or fail somewhere else?',
        text: [
          'Point at any value coming into a job and ask: <b>"If this value is wrong, will the code stop here and say so, or carry on and fail somewhere else?"</b>',
          'Watch out for the tempting middle road: making up a value. <code>if count &lt;= 0: count = 1</code> keeps the program running. But Mrs Lee wanted 3 cakes and gets 1, and nobody is told. That is not a fix. It is the same quiet bug wearing a tidy coat.',
          'And the message matters. <code>ValueError: bad input</code> is loud but not clear. A good message says <b>what was expected and what arrived</b>: "count must be at least 1, got -3".'
        ],
        tip: 'In lesson 19, Encapsulation, <code>spend</code> answered a bad request with a quiet <code>False</code>. A quiet no only works if every caller looks at the answer. A <code>raise</code> cannot be ignored by accident.'
      },
      {
        label: 'When not to', pic: whenPic,
        h: 'Loud for mistakes. Kind to people. Calm about hiccups.',
        text: [
          '<b>Fail fast is not "crash on everything".</b> It is for mistakes inside the program: a value that cannot be right, noticed early. Some things go wrong on a normal day, and the shop can cope with them. The printer is out of paper. The internet drops for a second. Suppose Maya loves this lesson and makes <code>print_slip</code> raise an error when the paper runs out. Now a whole cake order is refused because of a paper roll. Better: take the order, and print the slip when the paper is back.',
          '<b>People get a kind message, not a crash.</b> A customer who types 0 into the order box on the website should see "Please enter 1 or more". That is still failing fast. The bad number is caught at the door, at once. It just does not need to stop the program.',
          '<b>Do not repeat the same check in every job.</b> If <code>save_sale</code>, <code>add_to_baking_plan</code> and <code>print_slip</code> each check the count again, one rule has four homes. Lesson 6, DRY, showed where that leads. Check once, at the door where the data comes in.'
        ],
        warn: 'Where exactly the doors are, and how much to trust what comes through them, has its own lesson: lesson 39, Defensive programming.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'An order arrives with an empty customer name. Which version fails fast?',
        pic: code([
          '# version A',
          'if name == "":',
          '    name = "customer"',
          '',
          '# version B',
          'if name == "":',
          '    return',
          '',
          '# version C',
          'if name == "":',
          '    raise ValueError("name is empty")'
        ], { title: 'three ways to treat a missing name' }),
        options: ['Version A', 'Version B', 'Version C', 'None of them'],
        answer: 2,
        why: 'A makes up a name and carries on. B stops, but tells nobody why. Only C stops right there and says what is wrong.',
        hint: 'Failing fast has two halves: stop at once, and say clearly what is wrong.'
      },
      {
        type: 'order', q: 'Put the story of the mistyped order in order.',
        items: ['Sam types -3 cakes', 'The total becomes -$60', 'The sales file saves -$60', 'The baking plan drops from 12 cakes to 9', 'Three weeks later the accountant finds a hole', 'Maya spends two days tracing it back'],
        why: 'One second to make the mistake, three weeks to notice it, two days to trace it. The check at the door would have caught it at step 1.',
        hint: 'Follow the lines of take_order from top to bottom. The people come last.'
      },
      {
        type: 'fill', q: 'Finish the check at the door.',
        text: 'def take_order(name, count):\n    if count ___ 0:\n        ___ ValueError("count must be at least 1")',
        options: ['<=', 'raise', 'return', '>=', 'print'],
        answer: ['<=', 'raise'],
        why: '<code>&lt;=</code> asks "is it 0 or less?". <code>raise</code> stops the job right there and reports the problem.',
        hint: 'The first blank asks "0 or less?". The second is the Python word for "stop and report".'
      },
      {
        type: 'pick', q: 'Sam mistypes the price of a new cake as <code>0</code>. What does this job do?',
        pic: code([
          'def set_price(item, price):',
          '    if price <= 0:',
          '        price = 1',
          '    save_price(item, price)'
        ], { title: 'menu.py' }),
        options: ['It stops and tells Sam the price is wrong', 'It saves the cake at $1 and tells nobody', 'It saves the cake at $0', 'It crashes with a clear message'],
        answer: 1,
        why: 'Line 3 makes up a value so the program can keep running. The cake is now on sale for $1, and nothing tells Sam. A made-up value is a quiet bug.',
        hint: 'Read line 3. What is the price after it runs?'
      },
      {
        type: 'bucket', q: 'Stop the job loudly, or cope with it?',
        buckets: ['Stop the job and report it', 'Cope: try again, wait, or ask kindly'],
        items: [
          ['take_order is handed -3 cakes', 0],
          ['The cake price is missing from the menu', 0],
          ['The printer is out of paper', 1],
          ['The internet drops for a second', 1],
          ['A customer types 0 in the order box on the website', 1]
        ],
        why: 'A value that cannot be right is a mistake, so stop and report it. A paper roll, a network blip and a customer\'s typo are normal life. The shop should cope, and be kind.',
        hint: 'Ask: is this a mistake inside the program, or something that happens on a normal day?'
      },
      {
        type: 'pick', q: 'Which error messages really help the person who has to fix the problem?',
        options: ['ValueError: count must be at least 1, got -3', 'ValueError: bad input', 'ValueError: price must be above 0, got 0', 'Error'],
        answer: [0, 2],
        why: 'A good message says what was expected and what arrived. "Bad input" is loud, but it sends you hunting.',
        hint: 'Two of them say what was expected and what arrived.'
      },
      {
        type: 'pick', q: 'Back to lesson 19, Encapsulation. <code>card.spend</code> hands back <code>False</code> and changes nothing when the card has too few points. Ben has 8 points and returns a $20 cake. What happens?',
        pic: code([
          'def refund(card, price):',
          '    card.spend(price)',
          '    print_paper("Points taken back")'
        ], { title: 'points.py' }),
        options: ['Ben ends up with -12 points', 'The program stops with an error', 'Ben keeps 8 points, but the slip says points were taken back', 'Ben keeps 8 points and nothing is printed'],
        answer: 2,
        why: 'The door kept the points safe. But line 2 never looks at the answer, so the quiet "no" is lost and line 3 prints something untrue. A quiet no only works if every caller checks it. A <code>raise</code> cannot be ignored by accident.',
        hint: 'spend said no. Does line 2 do anything with that answer?'
      },
      {
        type: 'type', q: 'Type the Python word that means "stop right here and report this problem".',
        prompt: 'word >',
        answers: ['raise'],
        why: '<code>raise</code> stops the job on that line and hands the problem, with its message, to whoever called it.',
        hint: 'It is the first word on line 5 of the fixed take_order.'
      }
    ]
  });
})();
