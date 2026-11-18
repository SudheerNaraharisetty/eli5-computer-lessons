/* Lesson 29: Open/closed (module 3). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l29  Open/closed
     ===================================================================== */
  const DARK = '#15132B', LIGHT = '#FFC24B';
  const lamp = (cx, cy, on) => `<circle cx="${cx}" cy="${cy}" r="8" fill="${on ? LIGHT : P.ink2}" stroke="${P.ink}" stroke-width="2.5"/>`;
  const padlock = (x, y, col) => `<path d="M${x + 7} ${y + 16} V${y + 10} C${x + 7} ${y - 3} ${x + 25} ${y - 3} ${x + 25} ${y + 10} V${y + 16}" fill="none" stroke="${P.ink}" stroke-width="4" stroke-linecap="round"/>` +
    `<rect x="${x}" y="${y + 15}" width="32" height="24" rx="6" fill="${col}" stroke="${P.ink}" stroke-width="2.5"/>`;
  // A cartridge: a small card with two prongs on its left side and a light.
  const cart = (x, y, name, on, fill) => `<rect x="${x - 8}" y="${y + 9}" width="9" height="5" fill="${P.ink}"/><rect x="${x - 8}" y="${y + 22}" width="9" height="5" fill="${P.ink}"/>` +
    box(x, y, 128, 36, fill || P.white, 9) + lamp(x + 18, y + 18, on) + T(x + 34, y + 23, name, { s: 12.5, a: 'start' });

  /* ---- The idea: a console and its cartridges ---- */
  const ideaPic = svg(600, 300, 'Two game consoles. The first gets a new game by sliding in a cartridge, and its case stays shut. The second has its case off and is being rewired for every new game, and an old game has stopped working.',
    T(150, 28, 'ADD', { s: 12.5, f: P.ok }) + T(450, 28, 'EDIT', { s: 12.5, f: P.danger }) +
    `<line x1="300" y1="20" x2="300" y2="286" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    // left: sealed console, cartridges slot in
    box(40, 62, 112, 150, P.paper2, 14) + T(96, 96, 'console', { s: 13 }) + padlock(80, 126, P.ok) +
    cart(160, 70, 'game 1', true) + cart(160, 116, 'game 2', true) + cart(184, 162, 'new game', true, P.okT) +
    arrow(176, 232, 160, 204, P.ok, 3) + T(214, 246, 'slides in', { s: 12, w: 700, f: P.ink2 }) +
    T(150, 272, 'The case stays shut.', { s: 13, w: 700, f: P.ink2 }) + T(150, 290, 'Old games cannot break.', { s: 13, w: 700, f: P.ink2 }) +
    // right: open console, wires
    box(340, 62, 220, 150, P.dangerT, 14) + T(450, 88, 'console, case off', { s: 13 }) +
    [[362, 'game 1', true], [428, 'game 2', false], [494, 'new', true]].map(g => box(g[0], 104, 56, 34, P.white, 8) + T(g[0] + 28, 126, g[1], { s: 11.5, f: g[2] ? P.ink : P.danger })).join('') +
    `<path d="M390 142 C390 186 520 150 522 142 M456 142 C456 176 380 196 372 200 M522 142 C540 196 430 170 420 200" fill="none" stroke="${P.ink}" stroke-width="2.5" stroke-linecap="round"/>` +
    `<path d="M448 150 l8 12 l-10 2 l9 14" fill="none" stroke="${P.danger}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>` +
    T(450, 246, 'rewired for every new game', { s: 12, w: 700, f: P.ink2 }) +
    T(450, 272, 'Every visit inside is a chance', { s: 13, w: 700, f: P.ink2 }) + T(450, 290, 'to knock an old wire loose.', { s: 13, w: 700, f: P.ink2 }));

  /* ---- The code ---- */
  const chain = [
    'def discount(order):',
    '    if order.promo == "student":',
    '        off = order.price * 0.10',
    '    elif order.promo == "coupon":',
    '        off = 1',
    '    elif order.promo == "staff":',
    '        off = order.price * 0.30',
    '    else:',
    '        off = 0',
    '    return off'
  ];
  const patched = chain.slice(0, 5).concat([
    '    if order.promo == "birthday":',
    '        off = 3'
  ], chain.slice(5));

  const fileBox = (x, file, fn, note) => box(x, 44, 176, 112, DARK, 12) +
    T(x + 14, 68, file, { s: 12, m: true, f: '#A9A5D6', a: 'start' }) + T(x + 14, 92, fn, { s: 13, m: true, f: '#7CF0B5', a: 'start' }) +
    ['if', 'elif', 'elif', 'else'].map((k, i) => T(x + 26, 112 + i * 13, k + (i < 3 ? ' ...' : ''), { s: 10.5, m: true, f: '#FFC24B', a: 'start' })).join('') +
    T(x + 88, 180, note, { s: 12.5, w: 700, f: P.ink2 });
  const threePic = svg(600, 210, 'Three files each hold their own copy of the same chain: discount in checkout.py, promo_text in receipt.py and promo_group in report.py.',
    T(300, 24, 'The same chain lives in three functions', { s: 15 }) +
    fileBox(20, 'checkout.py', 'discount', 'how much to take off') +
    fileBox(212, 'receipt.py', 'promo_text', 'what to print') +
    fileBox(404, 'report.py', 'promo_group', 'which row of the report') +
    T(300, 204, 'A new promotion means opening all three.', { s: 13, w: 700, f: P.ink2 }));
  const codePic = `<div style="width:100%">${code(chain, { title: 'checkout.py', hi: [2, 4, 6, 8] })}${threePic}</div>`;

  /* ---- The pain: trace one student ---- */
  const step = (y, line, said, res, bad) => box(30, y, 86, 36, DARK, 9) + T(73, y + 23, 'line ' + line, { s: 12.5, m: true, f: '#ECEAFF' }) +
    T(132, y + 23, said, { s: 13, w: 700, a: 'start', f: P.ink2 }) +
    box(440, y, 130, 36, bad ? P.dangerT : P.okT, 9) + T(505, y + 23, res, { s: 13, m: true, f: bad ? P.danger : P.ok });
  const tracePic = svg(600, 290, 'Zoe is a student with a 20 dollar order. Line 3 sets her discount to 2 dollars. Line 6 starts a new chain. Its else then sets the discount back to 0 on line 11. She pays 20 dollars, not 18.',
    T(300, 24, 'Zoe, a student, orders $20 of cookies', { s: 15 }) +
    step(44, 3, 'student? Yes. Take 10% off.', 'off = 2.00') +
    step(90, 6, 'A new if. A new chain starts here.', 'birthday? no') +
    step(136, 8, 'staff? No.', 'no') +
    step(182, 11, 'So the else runs. For Zoe too.', 'off = 0', true) +
    box(150, 234, 130, 40, P.okT, 10) + T(215, 259, 'should pay $18', { s: 13, f: P.ok }) +
    `<circle cx="300" cy="254" r="15" fill="${P.dangerT}" stroke="${P.ink}" stroke-width="2.5"/>` + T(300, 260, '≠', { s: 18, f: P.danger }) +
    box(320, 234, 130, 40, P.dangerT, 10) + T(385, 259, 'pays $20', { s: 13, f: P.danger }));
  const painPic = `<div style="width:100%">${code(patched, { title: 'checkout.py, with the birthday treat', good: [7], bad: [6] })}${tracePic}</div>`;

  /* ---- The fix ---- */
  const promos = [
    'class StudentPromo:',
    '    code = "student"',
    '    name = "Student discount"',
    '    def amount_off(self, order):',
    '        return order.price * 0.10',
    '',
    'class CouponPromo:',
    '    code = "coupon"',
    '    name = "Coupon"',
    '    def amount_off(self, order):',
    '        return 1',
    '',
    'PROMOS = [StudentPromo(), CouponPromo(),',
    '          StaffPromo()]'
  ];
  const checkout = [
    'from promos import PROMOS',
    '',
    'def discount(order):',
    '    for promo in PROMOS:',
    '        if promo.code == order.promo:',
    '            return promo.amount_off(order)',
    '    return 0'
  ];
  const birthday = [
    'class BirthdayPromo:',
    '    code = "birthday"',
    '    name = "Birthday treat"',
    '    def amount_off(self, order):',
    '        return 3',
    '',
    'PROMOS = [StudentPromo(), CouponPromo(),',
    '          StaffPromo(), BirthdayPromo()]'
  ];
  const fixPic = `<div style="width:100%">${code(promos, { title: 'promos.py: one small class per promotion' })}${code(checkout, { title: 'checkout.py: the chain is gone', good: [4, 5, 6] })}${code(birthday, { title: 'promos.py, a month later: the birthday treat', good: [1, 2, 3, 4, 5, 8] })}</div>`;

  /* ---- The test ---- */
  const fnChip = (x, y, name, open) => box(x, y, 150, 38, open ? P.dangerT : P.white, 10) + T(x + 75, y + 24, name, { s: 13, m: true, f: open ? P.danger : P.ink }) +
    T(x + 164, y + 24, open ? 'reopened' : 'not opened', { s: 12.5, a: 'start', f: open ? P.danger : P.ok });
  const testPic = svg(600, 330, 'When the next promotion arrives, the chain design reopens three working functions. The class design reopens none: one new class is written and one entry is added to a list.',
    T(150, 28, 'THE CHAIN', { s: 12.5, f: P.danger }) + T(450, 28, 'ONE CLASS EACH', { s: 12.5, f: P.ok }) +
    `<line x1="300" y1="20" x2="300" y2="316" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    T(150, 54, 'the next promotion arrives', { s: 12.5, w: 700, f: P.ink2 }) + T(450, 54, 'the next promotion arrives', { s: 12.5, w: 700, f: P.ink2 }) +
    fnChip(24, 72, 'discount', true) + fnChip(24, 122, 'promo_text', true) + fnChip(24, 172, 'promo_group', true) +
    fnChip(318, 72, 'discount', false) + fnChip(318, 122, 'promo_text', false) + fnChip(318, 172, 'promo_group', false) +
    box(318, 222, 150, 38, P.okT, 10) + T(393, 246, 'SummerPromo', { s: 13, m: true, f: P.ok }) + T(482, 246, 'new', { s: 12.5, a: 'start', f: P.ok }) +
    box(46, 268, 208, 46, P.dangerT, 12) + T(150, 297, '3 working functions edited', { s: 12, f: P.danger }) +
    box(346, 268, 208, 46, P.okT, 12) + T(450, 297, '0 working functions edited', { s: 12, f: P.ok }));

  /* ---- When not to ---- */
  const plainHours = [
    'def opening_time(day):',
    '    if day == "Saturday" or day == "Sunday":',
    '        return "10:00"',
    '    else:',
    '        return "8:00"'
  ];
  const overHours = [
    'class WeekendHours:',
    '    def fits(self, day):',
    '        return day == "Saturday" or day == "Sunday"',
    '    def opens(self):',
    '        return "10:00"',
    '',
    'class WeekdayHours:',
    '    def fits(self, day):',
    '        return True',
    '    def opens(self):',
    '        return "8:00"',
    '',
    'HOURS = [WeekendHours(), WeekdayHours()]'
  ];
  const notPic = `<div style="width:100%">${code(plainHours, { title: 'hours.py: two fixed cases, leave it plain', good: [2, 3, 4, 5] })}${code(overHours, { title: 'hours.py, ready for kinds of day that never come', bad: [1, 7, 13] })}</div>`;

  COURSE.add({
    id: 'l29', minutes: 8,
    summary: 'You should be able to add a new behaviour by <b>adding</b> new code, without <b>editing</b> code that already works. That is the open/closed principle, the O in SOLID.',
    video: {
      src: 'videos/l29-open-closed.mp4', poster: 'videos/l29-open-closed.jpg', length: '1 min 13 s',
      script: [
        "Maya's checkout gives discounts. Student. Coupon. Staff.",
        'In the code, they share one function. A chain of ifs.',
        'Every month, marketing invents a new one. This month, a birthday treat.',
        'So Maya opens the function that every sale runs through, and adds a branch. The receipt and the report have the same chain. 3 functions to open.',
        'And she slips. She types if, where elif belonged.',
        'The birthday treat works. But the student and coupon discounts quietly stop. She broke code she never meant to touch.',
        'The fix. Each promotion becomes its own small class, like a cartridge. The checkout loops over whatever is plugged in. Then the lid goes on.',
        'Next month, a new promotion. Maya writes one new class and plugs it in. A new light comes on. Every old light stays lit. Functions opened: 0.',
        'That is the open/closed principle. Open for adding. Closed for editing. Ask: to add the next one, must I edit code that already works?'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Slide in a cartridge. Leave the case shut.',
        text: [
          'An old game console gets a new game when you slide in a <b>cartridge</b>. Nobody takes the case off and rewires the inside for each new game. If they did, every visit inside would be a chance to knock an old wire loose.',
          'Code can work the same way. The <b>open/closed principle</b> says a piece of code should be <b>open for extension</b> and <b>closed for modification</b>. In plain words: you can make it do something new by <b>adding</b> new code, and you do not have to <b>edit</b> the code that already works.',
          'Why it matters: every edit to working code can break what it already did. Code that you only add cannot break the old behaviour, because the old lines were never touched.'
        ],
        tip: 'Bertrand Meyer stated the principle in 1988. You met him in lesson 20: he also named command-query separation. Robert C. Martin later made it one of the five SOLID principles. Lesson 16, Single responsibility, was the S. This is the <b>O</b>.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'One chain, one branch per promotion.',
        text: [
          'Maya\'s shop runs promotions. At the till, the code for the promotion is stored on the order as <code>order.promo</code>, for example <code>"student"</code>. The dot works as in lesson 2.',
          'The job <code>discount</code> works out how much to take off. You met <code>elif</code> in lesson 28: it is short for "else if". Python tries the questions from the top and runs the <b>first</b> one whose answer is yes. If none is, the <code>else</code> runs.',
          'So a student gets 10% off. A coupon takes $1 off. Staff get 30% off. Anyone else gets 0. On a $20 order that is $2, $1 or $6. Tax is left out to keep the sums easy.',
          'Every sale in the shop runs through this one job. And it is not alone. The receipt has the same chain to choose the words it prints. The weekly report has it again to choose a row. <b>Three functions</b>, one branch per promotion in each.'
        ],
        tip: 'This is the same shape the checkout had in lesson 28, Program to an interface: one branch per kind of thing. Lesson 28 showed the cure. This lesson is about why the cure matters.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Two missing letters.',
        text: [
          'Marketing invents a new promotion about once a month. This month: a <b>birthday treat</b>, $3 off. Maya opens all three functions. This time she remembers every one of them.',
          'In <code>discount</code> she adds the new branch under the coupon, on lines 6 and 7. But she types <code>if</code> where <code>elif</code> belonged. An <code>elif</code> carries on the chain above it. A plain <code>if</code> starts a <b>new chain</b>. So the file now holds two chains, and the <code>else</code> at the bottom belongs to the second one.',
          'She tries a birthday order. $3 off. Correct. She tries staff. Correct. She ships it.',
          'Now follow Zoe, a student with a $20 order. Line 3 sets <code>off</code> to 2. Then the second chain starts. Birthday? No. Staff? No. So the <code>else</code> on line 10 runs, and line 11 sets <code>off</code> back to <b>0</b>. Zoe pays $20, not $18. Coupons break the same way.'
        ],
        warn: 'Nothing crashed. And look at where the damage is: the student and coupon branches, which Maya never meant to touch. She did not forget a place, as in lesson 1. She remembered all three. The risk was the editing itself, inside code that every sale depends on.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'One small class each. Then stop opening the checkout.',
        text: [
          'Maya gives each promotion its own small class, as lesson 28 did for each way to pay. Every one has the same short list: a <code>code</code>, a <code>name</code> for the receipt, and one job, <code>amount_off(order)</code>. <code>StaffPromo</code> is written the same way.',
          '<code>PROMOS</code> is a list, as in lesson 7. It holds one of each. The list carries on into the next line, which Python allows inside brackets, as in lesson 12.',
          'Now read <code>discount</code>. It goes through the list with a loop, as in lesson 10. For each promotion it asks: is this the one on the order? If yes, it asks that promotion for the amount and hands it back. <code>return</code> ends the job on the spot. If no promotion matches, the answer is 0.',
          'Look at what is missing. The words student, coupon and staff are gone from the checkout. It no longer knows which promotions exist. The receipt and the report change the same way: they find the promotion in the list and use its <code>name</code>.',
          'A month later, the birthday treat arrives again. Maya writes <b>one new class</b> and adds <b>one entry</b> to the list. <code>discount</code>, <code>promo_text</code> and <code>promo_group</code> are not opened. There is no chain to slip in.'
        ],
        tip: 'Is adding to the list an edit? Yes, a tiny one, and it is honest to say so. But it is a list of names with no logic in it. The code that makes decisions for every sale stays shut. That is the part worth closing.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Ask it before the next one arrives.',
        text: [
          'Point at a piece of code and ask: <b>"To add the next one of these, do I have to edit code that already works?"</b>',
          'Try the chain. The next promotion means editing <code>discount</code>, <code>promo_text</code> and <code>promo_group</code>. Yes, three times.',
          'Try the classes. The next promotion is one new class and one new entry in a list. No working function is opened. No.',
          'The sign to look for in code: a chain of <code>if</code> and <code>elif</code> that asks <b>"which kind is it?"</b>, and has to grow every time a new kind arrives. It is worse when the same chain is copied in several functions.'
        ],
        tip: 'Lesson 1 asked: if one thing changes, how many places must I touch? This lesson adds a second question about those places: are they new, or are they old code that already works?'
      },
      {
        label: 'When not to', pic: notPic,
        h: 'Close it against the change that keeps arriving.',
        text: [
          '<b>You cannot be closed against everything.</b> Maya\'s code is now closed against new promotions. It is not closed against "two promotions on one order". That would change <code>discount</code> itself. Pick the kind of change that really keeps coming, and leave the rest plain.',
          '<b>Two or three fixed cases are clearer as a plain <code>if</code>.</b> The shop opens at 10:00 at the weekend and at 8:00 on other days, as in lesson 21. Suppose Maya loves this lesson and builds classes and a list for kinds of day. 5 lines become 13, for kinds of day that will never arrive. Lesson 5, KISS, would keep the 5.',
          '<b>Do not build it too early.</b> With one promotion, Maya did not need any of this. A simple chain was right. The second or third new kind is the proof that more will come. That is lesson 8, YAGNI, and lesson 9, Rule of three.',
          '<b>Closed does not mean frozen.</b> If <code>StudentPromo</code> gives the wrong amount, Maya opens it and fixes it. Wrong code still gets edited. The principle is about adding new behaviour, not about refusing to repair old behaviour.'
        ],
        warn: 'Ask lesson 4\'s question: "Is this problem real right now?" A new promotion every month, in three functions, with a real bug, is real. Two kinds of opening hours are not.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'The shop starts delivering by drone. What has to happen to this function?',
        pic: code([
          'def delivery_fee(order):',
          '    if order.kind == "bike":',
          '        fee = 2',
          '    elif order.kind == "van":',
          '        fee = 5',
          '    else:',
          '        fee = 0',
          '    return fee'
        ], { title: 'delivery.py' }),
        options: ['Nothing. A new kind just works', 'It must be opened and a new branch added', 'It must be deleted', 'Only its name must change'],
        answer: 1,
        why: 'The chain asks "which kind is it?". Every new kind means editing a function that already works. That is the sign from this lesson.',
        hint: 'Where would the fee for a drone be written?'
      },
      {
        type: 'pick', q: 'A customer uses a coupon on a $20 order. What is <code>off</code> when this job ends?',
        pic: code(patched, { title: 'checkout.py, with the birthday treat', hi: [6] }),
        options: ['1', '0', '3', '6'],
        answer: 1,
        why: 'Line 5 sets <code>off</code> to 1. Line 6 is a plain <code>if</code>, so a new chain starts. Not birthday, not staff, so the <code>else</code> runs and line 11 sets <code>off</code> to 0.',
        hint: 'Line 6 says <code>if</code>, not <code>elif</code>. Which chain does the <code>else</code> on line 10 belong to?'
      },
      {
        type: 'fill', q: 'Marketing wants a summer deal: $2 off. Add it without opening <code>discount</code>.',
        text: 'class SummerPromo:\n    code = "summer"\n    name = "Summer deal"\n    def ___(self, order):\n        return 2\n\nPROMOS = [StudentPromo(), CouponPromo(),\n          StaffPromo(), ___]',
        options: ['amount_off', 'SummerPromo()', 'discount', '"summer"'],
        answer: ['amount_off', 'SummerPromo()'],
        why: 'One new class with the same job as the others, and one new entry in the list. The loop in <code>discount</code> finds it without being edited.',
        hint: 'The first blank is the job every promotion has. The second makes one of the new class.'
      },
      {
        type: 'bucket', q: 'A new promotion arrives. Does this step leave the old logic alone, or reopen it?',
        buckets: ['Old logic left alone', 'Old logic reopened'],
        items: [
          ['Write a new class, SummerPromo', 0],
          ['Add SummerPromo() to the PROMOS list', 0],
          ['Add an elif to discount in checkout.py', 1],
          ['Add an elif to promo_text in receipt.py', 1],
          ['Add an elif to promo_group in report.py', 1]
        ],
        why: 'New code cannot break old behaviour. Every edit inside a working chain can.'
      },
      {
        type: 'match', q: 'Match each word to what it means in this lesson.',
        pairs: [
          ['Open', 'You can add new behaviour'],
          ['Closed', 'Working code does not have to be edited'],
          ['The warning sign', 'A chain of if and elif that grows with every new kind'],
          ['The test', 'To add the next one, must I edit code that already works?']
        ],
        why: 'Open for adding, closed for editing. The growing chain is how you spot code that is neither.'
      },
      {
        type: 'order', q: "Put Maya's story in order.",
        items: ['Three functions each hold a chain with one branch per promotion', 'Marketing asks for a birthday treat', 'Maya types if where elif belonged', 'Students pay full price and nothing crashes', 'Each promotion becomes its own small class', 'The next promotion is one new class and one list entry'],
        why: 'The chain was the trap. It made every new promotion an edit to code that every sale runs through.',
        hint: 'The problem starts with how the code was shaped, before anyone asked for anything.'
      },
      {
        type: 'pick', q: 'When is a plain <code>if</code> and <code>else</code> the better choice? Pick all that apply.',
        options: ['Two fixed cases, like weekend and weekday opening hours', 'There is only one kind so far, and nobody has asked for a second', 'A new kind arrives every month', 'The same growing chain is copied in three functions'],
        answer: [0, 1],
        why: 'Close code against a change that really keeps arriving. Fixed cases, and kinds that have not arrived yet, are clearer left plain.',
        hint: 'Two of these describe a change that is not really coming.'
      },
      {
        type: 'pick', q: 'Back to an earlier lesson. Maya has one promotion, the student discount. She says: "One day there may be more, so I will build the list and the classes now." Which lesson tells her to wait?',
        options: ['Lesson 6, DRY', 'Lesson 8, YAGNI', 'Lesson 19, Encapsulation', 'Lesson 22, Fail fast'],
        answer: 1,
        why: '"One day" and "may be" mean she is guessing. YAGNI says to build it when the second or third promotion really arrives.',
        hint: 'Listen for the words "one day".'
      }
    ]
  });
})();
