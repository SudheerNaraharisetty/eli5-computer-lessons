/* Lesson 51: Broken windows (module 5). One file per lesson. */
(function () {
  const { P, code, term, svg, box, T } = PR;

  /* =====================================================================
     l51  Broken windows
     ===================================================================== */

  /* one shop front: awning, window, door. o: {crack, mended, paint, litter} */
  const shop = (x, y, o) => {
    o = o || {};
    const wx = x + 10, wy = y + 28;
    return box(x, y, 92, 80, P.white, 8) +
      `<rect x="${x}" y="${y}" width="92" height="18" rx="6" fill="${o.crack ? P.sand : P.tint}" stroke="${P.ink}" stroke-width="2.5"/>` +
      `<rect x="${wx}" y="${wy}" width="44" height="36" rx="3" fill="${P.paper2}" stroke="${P.ink}" stroke-width="2.5"/>` +
      `<rect x="${x + 64}" y="${y + 36}" width="20" height="44" rx="3" fill="${P.sand}" stroke="${P.ink}" stroke-width="2.5"/>` +
      (o.crack ? `<path d="M${wx + 22} ${wy + 18} l-14 -12 M${wx + 22} ${wy + 18} l15 -9 M${wx + 22} ${wy + 18} l-9 14 M${wx + 22} ${wy + 18} l13 12 M${wx + 22} ${wy + 18} l-18 3" fill="none" stroke="${P.danger}" stroke-width="2.5" stroke-linecap="round"/>` : '') +
      (o.mended ? `<circle cx="${wx + 22}" cy="${wy + 18}" r="11" fill="${P.ok}" stroke="${P.ink}" stroke-width="2"/><path d="M${wx + 16} ${wy + 18} l4 5 l8 -9" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>` : '') +
      (o.paint ? `<path d="M${x + 8} ${y + 74} q8 -14 14 -2 q6 -14 12 0 q8 -12 14 0" fill="none" stroke="${P.warn}" stroke-width="3" stroke-linecap="round"/>` : '') +
      (o.litter ? `<rect x="${x + 30}" y="${y + 86}" width="12" height="8" rx="2" fill="${P.warnT}" stroke="${P.ink}" stroke-width="2" transform="rotate(-18 ${x + 36} ${y + 90})"/><rect x="${x + 66}" y="${y + 88}" width="10" height="7" rx="2" fill="${P.dangerT}" stroke="${P.ink}" stroke-width="2" transform="rotate(24 ${x + 71} ${y + 91})"/>` : '');
  };
  const streetPic = svg(600, 344, 'Two streets of five shops. On the first, one cracked window was mended the same week and the street still looks cared for. On the second, the crack was left for a month, and now four windows are cracked, there is paint on the walls and litter on the ground.',
    T(300, 26, 'MENDED THE SAME WEEK', { s: 12.5, f: P.ok }) +
    [0, 1, 2, 3, 4].map(i => shop(22 + i * 116, 40, { mended: i === 1 })).join('') +
    T(300, 148, 'one crack, fixed. A month later the street looks the same.', { s: 13, w: 700, f: P.ink2 }) +
    `<line x1="24" y1="168" x2="576" y2="168" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    T(300, 196, 'LEFT FOR A MONTH', { s: 12.5, f: P.danger }) +
    [0, 1, 2, 3, 4].map(i => shop(22 + i * 116, 210, { crack: i !== 2, paint: i === 2 || i === 4, litter: i !== 3 })).join('') +
    T(300, 330, 'one crack said "nobody cares". The rest followed.', { s: 13, w: 700, f: P.ink2 }));

  const fileCode = [
    '# TODO fix later',
    '# TODO ask Maya about far orders',
    '',
    'def temp_fix2(km):',
    '    # far orders are free',
    '    fee = km * FEE_PER_KM',
    '    # if km > 10:',
    '    #     fee = 0',
    '    return with_tax(fee)'
  ];
  const codePic = `<div style="width:100%">${code(fileCode, { title: 'delivery.py, on an ordinary Monday', bad: [1, 2, 4, 5, 7, 8] })}` +
    term(['$ pytest', 'Warning: round_old() is going away. Use round_cents().', 'Warning: round_old() is going away. Use round_cents().', '... and 198 more warnings', 'FAILED tests/big/test_shop.py::test_pay_by_card', '1 failed, 47 passed, 200 warnings'], 'run the tests') + `</div>`;

  const afterCode = [
    '# TODO fix later',
    '# TODO ask Maya about far orders',
    '# TODO test the Sunday fee',
    '',
    'def temp_fix2(km):',
    '    # far orders are free',
    '    fee = km * FEE_PER_KM',
    '    # if km > 10:',
    '    #     fee = 0',
    '    return with_tax(fee)',
    '',
    'def temp_fix3(km):',
    '    fee = km * FEE_PER_KM + 2',
    '    return with_tax(fee)'
  ];
  const stat = (x, label, big, small) => box(x, 40, 176, 92, P.dangerT, 14) +
    T(x + 88, 64, label, { s: 12.5, w: 700, f: P.ink2 }) + T(x + 88, 100, big, { s: 26, f: P.danger }) + T(x + 88, 122, small, { s: 12, w: 700, f: P.ink2 });
  const painPic = `<div style="width:100%">${code(afterCode, { title: 'delivery.py, after Priya\'s first Monday', bad: [3, 12, 13, 14] })}` +
    svg(600, 150, 'Three months later: red tests went from 1 to 6, warnings from 200 to 400, and a real bug hid for 2 weeks.',
      T(300, 24, 'Three months later', { s: 14 }) +
      stat(20, 'red tests', '1 → 6', 'of 48') + stat(212, 'warnings on every run', '200 → 400', 'nobody reads them') + stat(404, 'a real bug hid for', '2 weeks', 'red light number 7')) + `</div>`;

  const cleanCode = [
    'def delivery_fee(km, sunday):',
    '    fee = km * FEE_PER_KM',
    '    if sunday:',
    '        fee = fee + SUNDAY_EXTRA',
    '    return with_tax(fee)'
  ];
  const fixPic = `<div style="width:100%">` +
    term(['$ pytest', 'FAILED tests/unit/test_delivery.py::test_delivery_fee', '1 failed, 47 passed, 0 warnings'], 'Monday, 11:10. One red, and it is the only one') +
    code(cleanCode, { title: 'delivery.py, fixed before lunch', good: [3, 4] }) +
    term(['$ pytest', '49 passed, 0 warnings'], 'Monday, 11:50') + `</div>`;

  /* a wall of 48 lights, 8 across and 6 down. reds: [[row, col], ...] counted from 0 */
  const wall = (x, y, reds) => box(x, y, 268, 208, '#15132B', 14) +
    Array.from({ length: 48 }, (_, k) => {
      const r = Math.floor(k / 8), c = k % 8, red = reds.some(p => p[0] === r && p[1] === c);
      return `<circle cx="${x + 29 + c * 30}" cy="${y + 29 + r * 30}" r="10" fill="${red ? '#FF6B8B' : '#4BD69B'}" stroke="${P.ink}" stroke-width="2"/>`;
    }).join('');
  const NEW = [3, 2];
  const wallsPic = svg(600, 330, 'Two walls of 48 test lights. On the left wall every light is green except one red light, which is impossible to miss. On the right wall 7 lights are red, and nobody can tell which one just came on.',
    T(156, 28, 'A CLEAN BOARD', { s: 12.5, f: P.ok }) + T(444, 28, 'A BOARD WITH BROKEN WINDOWS', { s: 12.5, f: P.danger }) +
    wall(22, 44, [NEW]) + wall(310, 44, [[0, 5], [1, 2], [2, 6], NEW, [4, 0], [4, 5], [5, 3]]) +
    T(156, 284, '1 red of 48. You cannot miss it.', { s: 13 }) + T(156, 306, '"Red is an emergency here."', { s: 13, w: 700, f: P.ok }) +
    T(444, 284, '7 red of 48. Which one is new?', { s: 13 }) + T(444, 306, '"Red is normal here."', { s: 13, w: 700, f: P.danger }));

  const row = (x, y, s, fill) => box(x, y, 262, 34, fill, 10) + T(x + 131, y + 22, s, { s: 12 });
  const sortPic = `<div style="width:100%">` + svg(600, 290, 'Left: broken windows, which are signals that something is wrong and ignored. Right: things that are not broken windows, such as working code that could be prettier or a shortcut that was written down.',
    T(151, 28, 'A BROKEN WINDOW', { s: 12.5, f: P.danger }) + T(449, 28, 'NOT A BROKEN WINDOW', { s: 12.5, f: P.ok }) +
    ['a test left red for weeks', 'warnings that nobody reads', 'a comment that lies', 'a "fix later" that nobody owns'].map((s, i) => row(20, 44 + i * 48, s, P.dangerT)).join('') +
    ['working code that could be prettier', 'a shortcut, written down with a date', 'a test skipped with a name and a date', 'an old script that nobody opens'].map((s, i) => row(318, 44 + i * 48, s, P.okT)).join('') +
    `<line x1="300" y1="20" x2="300" y2="232" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    T(151, 256, 'a signal that is wrong, and ignored', { s: 13, w: 700, f: P.ink2 }) + T(151, 276, 'fix it or board it up today', { s: 13 }) +
    T(449, 256, 'no false signal to anyone', { s: 13, w: 700, f: P.ink2 }) + T(449, 276, 'leave it, or plan it', { s: 13 })) +
    term(['$ pytest', 'SKIPPED test_pay_by_card: card test machine down', '        since 3 Nov. Sam is fixing it by 14 Nov.', '47 passed, 1 skipped, 0 warnings'], 'boarded up: not red, not hidden, and it has an owner') + `</div>`;

  const quizCode = [
    '# TODO sort this out one day',
    'def box_price_new2(count):',
    '    # boxes of 12 are half price',
    '    price = count * BOX_PRICE',
    '    # price = price / 2',
    '    return with_tax(price)'
  ];

  COURSE.add({
    id: 'l51', minutes: 8,
    summary: 'One small bad thing that everyone can see and nobody fixes tells the whole team that mess is normal here. Then mess spreads fast. That is the <b>broken windows</b> idea. Fix small things soon after you find them, or board them up clearly.',
    video: {
      src: 'videos/l51-broken-windows.mp4', poster: 'videos/l51-broken-windows.jpg', length: '1 min 8 s',
      script: [
        'One cracked window, left alone, tells the whole street that nobody cares. Soon there are more. Code has broken windows too.',
        "This is the test board for Maya's shop. 48 lights, one for each test. One has been red for a month. Everyone says, ignore that one.",
        'Monday. Priya is new, and in a hurry. She sees the red light, the old notes, the screen of warnings. So she skips her own test, and leaves a note too. Nobody notices.',
        '3 months later, 6 lights are red. Then a 7th turns red. A real bug. But red is normal here, so it hides for 2 weeks.',
        'Now play it again, on a clean board. 48 green. Same Priya, same hurry. Her change turns one light red. It is the only red on the wall. She fixes it before lunch.',
        'Same person. Different surroundings. Mess does not come from bad people. It comes from what looks normal. So don\'t live with broken windows.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: streetPic,
        h: 'One cracked window.',
        text: [
          'Picture a street of shops. One window gets cracked. If it is mended that week, the street stays as it was. If it is left for a month, people walking by read a message in it: <b>nobody is looking after this place</b>. Soon there is litter by a door, then a second crack, then paint on a wall.',
          'You have seen the small version. One piece of litter on a clean path gets picked up. A path already full of litter collects more. One dirty mug in a clean sink becomes twenty by Friday.',
          'Code works the same way. A <b>broken window</b> in code is a small bad thing that everyone can see and nobody fixes. The advice is short: <b>"Don\'t live with broken windows."</b> Fix each one soon after you find it. If you cannot fix it now, <b>board it up</b>: mark it clearly, or switch it off properly.',
          'The damage is not the small thing itself. It is the <b>message</b> it sends to everyone who opens the code: "this is how we do things here".'
        ],
        tip: 'In software, the phrase comes from the 1999 book <i>The Pragmatic Programmer</i> by Andrew Hunt and David Thomas. They borrowed the picture from a 1982 article about buildings and neighbourhoods by the criminologists James Q. Wilson and George Kelling. That original theory, about crime and policing, is disputed. This lesson is only about code, and it rests on one plain observation about people: <b>we copy the standard we see around us</b>.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'What a broken window looks like.',
        text: [
          'The shop has grown, and so has the team. Here is <code>delivery.py</code> on an ordinary Monday, and under it what the screen prints when the tests run. Lesson 49, Testing pyramid, gave the shop 48 tests: 40 small, 6 in the middle and 2 big. Count the broken windows.',
          '<b>1. A red test that everyone ignores.</b> <code>test_pay_by_card</code> has failed for a month. It is one of the 2 big, slow tests, and the card test machine keeps being too slow for it. "Oh, ignore that one. It always fails."',
          '<b>2. A screen of warnings.</b> A warning is a message that says: this still runs, but something is off. There are 200 on every run. Nobody reads them any more, so nobody would notice number 201.',
          '<b>3. Notes that say "fix later".</b> Lines 1 and 2. The first one is two years old. <b>4. A name like <code>temp_fix2</code>.</b> Line 4. It has been temporary since last spring.',
          '<b>5. A comment that lies.</b> Line 5 says far orders are free. They are not. <b>6. Switched-off code, kept "just in case".</b> Lines 7 and 8 are the code that once made far orders free. Lesson 13, Boy Scout rule, called this dead code.',
          '<b>7. A README that no longer works.</b> The README is the file a newcomer opens first. This one says to start the shop with <code>python start.py</code>. That file was deleted last year.',
          'Seven broken windows. Each one is small. And every total the shop charges today is <b>correct</b>.'
        ],
        tip: 'A broken window is rarely a bug. That is why it survives. Nothing forces anyone to fix it.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Priya\'s first Monday.',
        text: [
          'Priya joins the shop on Monday. Her first task is small: <b>Sunday deliveries cost $2 extra</b>. She has until lunch.',
          'She runs the tests. One is red. "Ignore that one," says Sam. She watches 200 warnings scroll past. She opens the file and finds two "fix later" notes and a job called <code>temp_fix2</code>. Priya is not careless. She is reading the room, and the room says: <b>the bar here is low</b>.',
          'So she does what the file does. She copies the whole job and names the copy <code>temp_fix3</code>. She leaves a note of her own on line 3. And she skips writing a test. One is already red, so who would notice? Nobody says a word, because <b>nothing looks different from before</b>. Look at line 13: her copy adds the $2 on <b>every</b> day, not just Sundays. With no test, nobody finds out.',
          'Now run the clock forward <b>three months</b>. Everyone has done what Priya did. 6 tests are red. The warnings fill 400 lines. Then somebody swaps the two discount rules, the same slip Sam made in lesson 49. <code>test_party_order</code> turns red in under a second, exactly as it should. But it is red light number 7 on a board where red is normal. Nobody looks. For <b>two weeks</b>, every $100 party order is charged $98.10 when it should be $87.20.'
        ],
        warn: 'The test did its job. It shouted. But an alarm that is always ringing is the same as no alarm. Mess is not mainly caused by bad people. It is caused by <b>what looks normal</b>.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Same Monday, clean board.',
        text: [
          'Play Monday again. Same Priya, same task, same hurry. Only the surroundings are different. All 48 tests are green. The run prints <b>0 warnings</b>. The file has no notes, no dead lines, and one honest name: <code>delivery_fee</code>.',
          'She adds the $2 and runs the tests. She has added it to every day, not just Sunday, so <code>test_delivery_fee</code> turns red. It is the <b>only red thing on the board</b>. Nobody has to tell her that it matters. She fixes it on lines 3 and 4. <code>sunday</code> is handed in as <code>True</code> or <code>False</code>, and <code>SUNDAY_EXTRA</code> is 2, set once in another place as in lesson 7. Then she adds <code>test_sunday_fee</code>, so the new rule has a test of its own. 49 passed, before lunch.',
          'Leaving a "fix later" note in a file that has none would feel wrong. So she does not. Same person. Different surroundings. <b>Different behaviour.</b>',
          'A clean board is not luck. It is four small habits that the whole team keeps.',
          '<b>1. Keep the test board fully green.</b> A test you do not trust gets fixed or deleted. It is never left red.',
          '<b>2. Keep warnings at zero</b>, so that a new one shouts.',
          '<b>3. Fix small things the day you see them</b>, or board them up. This is lesson 13, Boy Scout rule, kept by a whole team.',
          '<b>4. For what cannot be fixed now, write one dated note in one agreed place.</b> Not a "fix later" scattered through the code. Lesson 50, Technical debt, said the same about a loan: write it down where everyone will see it.'
        ],
        tip: 'The three lessons fit together. Lesson 13, Boy Scout rule, is your own habit. Lesson 50, Technical debt, is the money view of one shortcut. This lesson is about <b>everyone else</b>: what the state of the code tells the next person is acceptable.'
      },
      {
        label: 'The test', pic: wallsPic,
        h: 'Look through a newcomer\'s eyes.',
        text: [
          'Open any file, or run any project, and ask: <b>"If a newcomer opened this today, what would they conclude is normal here?"</b>',
          'Do not ask what the rules say. Ask what the code <b>shows</b>. People copy what they see, not what the handbook says.',
          'Look at the two walls. Each has 48 lights, one per test. The same light has just turned red on both. On the left it is the only red one, and you cannot miss it. On the right there were already 6. Can you find the new one? It is in row 4, third from the left. The team could not find it either.'
        ],
        tip: 'A warning screen works the same way. With 0 warnings, a new one is the whole screen. With 200, it is line 201.'
      },
      {
        label: 'When not to', pic: sortPic,
        h: 'Care about the signals, not about everything.',
        text: [
          '<b>This is not perfectionism.</b> A broken window is a <b>signal</b> that something is wrong and ignored: a red test, a warning, a comment that lies. Working code that could be a little prettier is not one. Overdoing it looks like this. Sam is asked to change one price. He notices that <code>with_tax</code> could be one line shorter, that three names could be nicer, and that two files could be merged. Four days later the price has still not changed. Lesson 4 asked: "Is this problem real right now?" Lesson 8, YAGNI, said the same about polishing for a future nobody asked for.',
          '<b>A shortcut you chose and wrote down is not a broken window.</b> Lesson 50, Technical debt, called a deliberate, tracked shortcut a loan. A broken window is the one that everybody forgot.',
          '<b>Do not stop an emergency to fix a typo.</b> If the website is down on a Saturday morning, bring it back first. Board the small thing up with a dated note, as in the picture, and come back to it on Monday.',
          '<b>Do not shame the person who broke it.</b> Fix the window. Then fix whatever made it easy to break. If the card test fails whenever the test machine is slow, the answer is a steadier test, not a telling-off.',
          '<b>Busy streets first.</b> A file the whole team opens every day teaches everyone who opens it. An old script that nobody has opened in two years teaches nobody. Spend your care where people walk.'
        ],
        warn: 'Zero tolerance is for <b>signals</b>: red tests, warnings, lies in comments, notes that nobody owns. It is not for everything you would have written differently. Next is lesson 52, the review of this module. After that, module 6 is all about people: laws about teams and projects, starting with lesson 53, Conway\'s law.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'Which lines of this file are broken windows? Pick all that apply.',
        pic: code(quizCode, { title: 'boxes.py' }),
        options: ['Line 1: a note with no owner and no date', 'Line 2: a name that ends in new2', 'Line 3: a comment that says something the code does not do', 'Line 4: working out the price', 'Line 5: a switched-off line kept "just in case"', 'Line 6: asking with_tax for the total'],
        answer: [0, 1, 2, 4],
        why: 'Four small signals in six lines. Lines 4 and 6 are the real work, and they are fine. Notice that the file still charges the right price. Broken windows are rarely bugs.',
        hint: 'Two lines do the real work. The other four each tell the next reader "nobody tidies up here".'
      },
      {
        type: 'pick', q: 'A wall has 48 test lights. 6 have been red for weeks. Today a 7th turns red: a real bug. Why does it hide for two weeks?',
        options: ['The test was too slow to run', 'Red was already normal, so one more red light did not stand out', 'Nobody on the team knew how to read a test', 'The bug was too small to matter'],
        answer: 1,
        why: 'The test did its job in under a second. The board did not. An alarm that is always ringing is the same as no alarm.',
        hint: 'Picture the same red light on a wall where the other 47 are green.'
      },
      {
        type: 'bucket', q: 'Broken window, or not?',
        buckets: ['Broken window', 'Not a broken window'],
        items: [
          ['A test that has been red for a month', 0],
          ['200 warnings on every run', 0],
          ['A README step that no longer works', 0],
          ['A comment that no longer matches the code', 0],
          ['A shortcut written down with a date and an owner', 1],
          ['Working code that could be one line shorter', 1],
          ['A test skipped with a dated reason and a name', 1]
        ],
        why: 'A broken window is a signal that something is wrong and that nobody is dealing with it. A tracked shortcut and a clearly skipped test are being dealt with. Working code sends no false signal at all.',
        hint: 'Ask of each one: does it tell a newcomer "nobody is dealing with this"?'
      },
      {
        type: 'order', q: 'Put the spread of mess in order.',
        items: ['One test turns red and is left red', 'People learn to say "ignore that one"', 'A newcomer sees the red light and lowers her own bar', 'More tests turn red and nobody minds', 'A real bug turns a test red and nobody notices'],
        why: 'It starts with one small thing that was left. Every later step is somebody copying what already looked normal.',
        hint: 'It starts with a single red light, and ends with a bug that nobody sees.'
      },
      {
        type: 'fill', q: 'Mend the windows in this job. Give it an honest name and hand the fee to the tax job.',
        text: 'def ___(km):\n    fee = km * FEE_PER_KM\n    return ___(fee)',
        options: ['delivery_fee', 'with_tax', 'temp_fix2', 'temp_fix3'],
        answer: ['delivery_fee', 'with_tax'],
        why: 'One honest name. The lying comment, the dead lines and the "fix later" notes are simply gone. Three lines that say what they do.',
        hint: 'The first blank is a name that says what the job works out. A name that starts with temp is a broken window.'
      },
      {
        type: 'match', q: 'Three lessons about mess, and one about tests. Match each lesson to its idea.',
        pairs: [
          ['Boy Scout rule', 'Your own habit: leave each file a little cleaner than you found it'],
          ['Technical debt', 'A shortcut is a loan that charges interest every time you come back'],
          ['Broken windows', 'Mess that is left in sight tells everyone that mess is normal'],
          ['Testing pyramid', 'Many small fast tests, and only a few big slow ones']
        ],
        why: 'Lesson 13 is the personal habit. Lesson 50 is the money view of one shortcut. This lesson is the effect on everybody else. And lesson 49 built the board of lights that this lesson keeps green.',
        hint: 'One is about you, one is about cost, one is about what other people copy.'
      },
      {
        type: 'pick', q: 'Saturday morning. The shop website is down and customers are waiting. While hunting for the cause, Maya spots a comment that no longer matches the code. What should she do?',
        options: ['Stop and fix the comment first, because broken windows spread', 'Bring the website back first, write a dated note about the comment, and fix it on Monday', 'Ignore the comment for good, because it is not a bug', 'Find out who wrote the comment and tell them off'],
        answer: 1,
        why: 'Do not stop an emergency to fix a small thing. Board it up with a dated note so it is not forgotten, then come back. And fix the window, not the person.',
        hint: 'Two things are wrong. Which one is hurting customers right now?'
      },
      {
        type: 'pick', q: 'A team wants a brand-new warning to be impossible to miss. Which habit does that?',
        options: ['Read all 200 warnings carefully every morning', 'Keep the number of warnings at zero', 'Print the warnings in a bigger font', 'Switch every warning off for good, without reading any of them'],
        answer: 1,
        why: 'With 0 warnings, a new one is the whole screen. With 200, it is line 201. Switching them all off unread only hides the window. It does not mend it.',
        hint: 'Think of the wall of lights. When is one red light easiest to see?'
      }
    ]
  });
})();
