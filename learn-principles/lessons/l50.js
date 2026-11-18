/* Lesson 50: Technical debt (module 5). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l50  Technical debt
     ===================================================================== */

  // The idea: a loan. Get something now, pay a little every time you come back, pay it off and the interest stops.
  const loanPic = svg(600, 270, 'A shortcut is like a loan. You get time now. Every later change in that code costs a little interest. Paying it back stops the interest.',
    T(100, 30, 'TAKE THE LOAN', { s: 12.5, f: P.ok }) + T(330, 30, 'PAY INTEREST', { s: 12.5, f: P.danger }) + T(520, 30, 'PAY IT OFF', { s: 12.5, f: P.accent }) +
    box(30, 50, 140, 76, P.okT, 14) + T(100, 84, 'shortcut', { s: 15 }) + T(100, 106, 'ships sooner', { s: 12.5, w: 700, f: P.ink2 }) +
    arrow(176, 88, 214, 88, P.ink, 2.5) +
    [0, 1, 2, 3].map(i => {
      const x = 226 + i * 52;
      return box(x, 62, 40, 52, P.dangerT, 10) + T(x + 20, 94, '−', { s: 20, f: P.danger });
    }).join('') +
    T(330, 146, 'every change here', { s: 12.5, w: 700, f: P.ink2 }) + T(330, 164, 'takes a bit longer', { s: 12.5, w: 700, f: P.ink2 }) +
    arrow(436, 88, 452, 88, P.ink, 2.5) +
    box(460, 50, 120, 76, P.tint, 14) + T(520, 84, 'refactor', { s: 15, f: P.accent }) + T(520, 106, 'do it properly', { s: 12.5, w: 700, f: P.ink2 }) +
    `<line x1="30" y1="200" x2="570" y2="200" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    T(300, 232, 'A small loan, taken on purpose and paid back soon, is sensible.', { s: 13, w: 700, f: P.ink2 }) +
    T(300, 254, 'A loan nobody tracks keeps charging interest for ever.', { s: 13, w: 700, f: P.ink2 }));

  const shortcutCode = [
    'def place_order(item):',
    '    price = MENU[item]',
    '    total = final_total(price)',
    '    sales_book.save(item, total)',
    '    return total',
    '',
    '# SHORTCUT, 13 Dec: a copy of place_order for hampers.',
    '# Prices typed in. No tests. Fix in January.',
    'def place_hamper_order():',
    '    price = 16 + 2               # hamper + wrapping',
    '    total = price + price * 0.09',
    '    sales_book.save("hamper", total)',
    '    return total'
  ];

  // The pain: a ledger, then the balance over time.
  const months = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const bal = [4, 4, 3, 1, 0, -1];
  const rows = [
    ['Dec', 'borrowed: 1 day, not 5', '+4', P.ok],
    ['Jan', 'busy, nobody touches orders', '0', P.ink2],
    ['Feb', 'kitchen change missed in the copy', '−1', P.danger],
    ['Mar', 'spring promo: 3 days, not 1', '−2', P.danger],
    ['Apr', 'Sam puzzled by two order jobs', '−1', P.danger],
    ['May', 'delivery fee: changed twice', '−1', P.danger]
  ];
  const cx = i => 330 + i * 40, cy = b => 150 - b * 22;
  const ledgerPic = svg(600, 330, 'A ledger. December: plus 4 days borrowed. Then interest of 1, 2, 1 and 1 days from February to May. The balance falls from plus 4 to minus 1 and crosses zero in May.',
    T(150, 26, "MAYA'S LOAN, IN DAYS", { s: 12.5, f: P.ink2 }) +
    rows.map((r, i) => {
      const y = 50 + i * 40;
      return box(14, y, 272, 32, i === 0 ? P.okT : P.white, 8) +
        T(24, y + 21, r[0], { s: 12.5, a: 'start' }) + T(62, y + 21, r[1], { s: 10.5, w: 700, a: 'start', f: P.ink2 }) +
        T(276, y + 21, r[2], { s: 13, a: 'end', f: r[3] });
    }).join('') +
    T(150, 312, 'Interest so far: 1 + 2 + 1 + 1 = 5 days', { s: 12.5, f: P.danger }) +
    T(450, 26, 'BALANCE', { s: 12.5, f: P.ink2 }) +
    `<rect x="${cx(4)}" y="${cy(0)}" width="${cx(6) - cx(4)}" height="${cy(-2) - cy(0)}" fill="${P.dangerT}"/>` +
    `<line x1="318" y1="${cy(0)}" x2="580" y2="${cy(0)}" stroke="${P.ink}" stroke-width="2"/>` +
    T(586, cy(0) + 4, '0', { s: 11, a: 'start' }) +
    `<polyline points="${bal.map((b, i) => cx(i) + ',' + cy(b)).join(' ')}" fill="none" stroke="${P.ink}" stroke-width="3.5" stroke-linejoin="round"/>` +
    `<line x1="${cx(5)}" y1="${cy(-1)}" x2="${cx(6)}" y2="${cy(-2)}" stroke="${P.danger}" stroke-width="3" stroke-dasharray="6 6"/>` +
    bal.map((b, i) => `<circle cx="${cx(i)}" cy="${cy(b)}" r="5" fill="${b < 0 ? P.danger : P.ink}"/>`).join('') +
    months.map((m, i) => T(cx(i), 222, m, { s: 11, w: 700, f: P.ink2 })).join('') +
    T(cx(0), cy(4) - 12, '+4', { s: 12, f: P.ok }) + T(cx(5) - 16, cy(-1) + 22, '−1', { s: 12, f: P.danger }) +
    T(450, 252, 'In May the interest passes the loan.', { s: 12, w: 700, f: P.ink2 }) +
    T(450, 270, 'And it keeps growing every month.', { s: 12, w: 700, f: P.ink2 }));

  const painPic = `<div style="width:100%">${ledgerPic}${code([
    'def place_order(item):',
    '    price = MENU[item]',
    '    total = final_total(price)',
    '    sales_book.save(item, total)',
    '    kitchen.add(item)              # new in February',
    '    return total',
    '',
    'def place_hamper_order():',
    '    price = 16 + 2',
    '    total = price + price * 0.09',
    '    sales_book.save("hamper", total)',
    '    return total                  # no kitchen.add here'
  ], { title: 'orders.py, February', good: [5], bad: [12] })}</div>`;

  const fixedCode = [
    'MENU = {',
    '    "choc_chip": 3,',
    '    "hamper": 18,          # $16 hamper + $2 wrapping',
    '}',
    '',
    'def place_order(item):',
    '    price = MENU[item]',
    '    total = final_total(price)',
    '    sales_book.save(item, total)',
    '    kitchen.add(item)',
    '    return total',
    '',
    'def test_hamper_total():',
    '    assert final_total(MENU["hamper"]) == 19.62'
  ];
  const whenPic = svg(600, 190, 'Paid back in January the whole thing costs 6 days. Paid back in June it costs 11 days.',
    T(300, 26, 'WHAT THE SHORTCUT REALLY COST', { s: 12.5, f: P.ink2 }) +
    T(20, 70, 'Proper way, in December', { s: 13, a: 'start' }) + box(250, 52, 5 * 30, 28, P.tint, 6) + T(420, 72, '5 days', { s: 13, a: 'start' }) +
    T(20, 116, 'Paid back in January', { s: 13, a: 'start', f: P.ok }) + box(250, 98, 30, 28, P.okT, 6) + box(280, 98, 150, 28, P.tint, 6) + T(440, 118, '1 + 5 = 6 days', { s: 13, a: 'start', f: P.ok }) +
    T(20, 162, 'Paid back in June', { s: 13, a: 'start', f: P.danger }) + box(250, 144, 30, 28, P.okT, 6) + box(280, 144, 150, 28, P.dangerT, 6) + box(430, 144, 150, 28, P.tint, 6) +
    T(355, 164, '+5 interest', { s: 11.5, f: P.danger }) + T(505, 164, '+5 payback', { s: 11.5, f: P.accent }));
  const fixPic = `<div style="width:100%">${code(fixedCode, { title: 'orders.py, paid off in June', good: [3, 10, 14] })}${whenPic}</div>`;

  // The test: cost per visit times visits.
  const testPic = svg(600, 260, 'Three shortcuts. The hamper copy is touched every month, so pay it off. The year-end report is opened once a year, so leave it. The Valentine page is deleted next week, so leave it.',
    T(300, 26, 'INTEREST = COST PER VISIT × HOW OFTEN YOU VISIT', { s: 12.5, f: P.ink2 }) +
    [['place_hamper_order', 'changed most months', 'a day or two each time', 'PAY IT OFF', P.danger, P.dangerT],
     ['year_end_report', 'opened once a year', 'never changed', 'LEAVE IT', P.ok, P.okT],
     ['valentine_page', 'deleted on 15 Feb', 'never changed again', 'LEAVE IT', P.ok, P.okT]].map((r, i) => {
      const y = 48 + i * 70;
      return box(20, y, 560, 56, P.white, 12) +
        T(36, y + 24, r[0], { s: 13, a: 'start', m: true }) + T(36, y + 44, r[1] + ', ' + r[2], { s: 11.5, w: 700, a: 'start', f: P.ink2 }) +
        box(440, y + 12, 124, 32, r[5], 16) + T(502, y + 33, r[3], { s: 11.5, f: r[4] });
    }).join(''));

  // When not to: Martin Fowler's quadrant.
  const quad = (x, y, fill, head, quote, note) =>
    box(x, y, 250, 86, fill, 12) + T(x + 125, y + 24, head, { s: 12, f: P.ink }) +
    T(x + 125, y + 50, quote, { s: 12, w: 700, f: P.ink2 }) + T(x + 125, y + 72, note, { s: 11, w: 700, f: P.mute });
  const quadPic = svg(600, 270, "Martin Fowler's technical debt quadrant, with an example from Maya's shop in each box.",
    T(205, 22, 'RECKLESS', { s: 12, f: P.danger }) + T(470, 22, 'PRUDENT', { s: 12, f: P.ok }) +
    `<text x="40" y="94" text-anchor="middle" font-size="12" font-weight="800" fill="${P.ink}" transform="rotate(-90 40 94)">DELIBERATE</text>` +
    `<text x="40" y="196" text-anchor="middle" font-size="12" font-weight="800" fill="${P.ink}" transform="rotate(-90 40 196)">INADVERTENT</text>` +
    quad(80, 40, P.dangerT, 'Deliberate, reckless', '"We never have time for tests."', 'a habit, not a decision') +
    quad(345, 40, P.okT, 'Deliberate, prudent', '"Ship by Friday. Fix in January."', 'the real loan') +
    quad(80, 146, P.dangerT, 'Inadvertent, reckless', '"Why not copy it six times?"', 'just a mess') +
    quad(345, 146, P.tint, 'Inadvertent, prudent', '"Now we know how to build it."', 'learned by doing') +
    T(330, 260, 'From Martin Fowler, "Technical Debt Quadrant" (2009)', { s: 11.5, w: 700, f: P.ink2 }));

  COURSE.add({
    id: 'l50', minutes: 9,
    summary: 'A shortcut in code is like a loan. You get something now, and you pay <b>interest</b> every time you come back to that code, until you pay it off. That is <b>technical debt</b>. Taken on purpose and paid back soon, it is a good tool. Left untracked, it eats your weeks.',
    video: {
      src: 'videos/l50-technical-debt.mp4', poster: 'videos/l50-technical-debt.jpg', length: '1 min 10 s',
      script: [
        'Two weeks before Christmas, Maya wants to sell hampers on her website. By Friday.',
        'The proper way takes 5 days. So she takes a shortcut. She copies the order code, types the prices in, and skips the tests. 1 day. And she leaves a note. Fix in January.',
        '300 hampers sold. A good decision. She borrowed 4 days.',
        'But January is busy. And a loan charges interest.',
        'February. A change to orders must be made twice. She misses one. A day lost. March. A simple discount takes 3 days, not 1. April. Sam loses a day, puzzled by two order systems.',
        'By May, the interest has passed the loan. And it keeps growing.',
        'So Maya pays it off. 5 days, done properly. Now every change is made once.',
        'An old shortcut, in a report nobody touches? No interest. Leave it.',
        'That is technical debt. A shortcut is a loan. Take it on purpose, write it down, and pay it back where you work most.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: loanPic,
        h: 'A shortcut is a loan.',
        text: [
          'Think of a loan from a bank. You get something <b>now</b>, like the oven a new bakery needs to open. In return you pay <b>interest</b>: a little extra, every month, for as long as the loan is there. Pay the loan off and the interest stops.',
          'Code works the same way. Sometimes you ship code that you know is not quite right, because something matters more today. That is the loan: the feature ships sooner. The interest comes later. Every future change in that code takes a bit longer and risks a bit more, for as long as the shortcut stays.',
          'Going back and doing it properly, without changing what the program does, is called <b>refactoring</b>. It is how you pay the loan off.',
          'The programmer <b>Ward Cunningham</b> came up with this picture in 1992, in a short report about a program for managing money. He used it to explain to people who were not programmers why a team needed to go back and rework code that already worked. People now call it <b>technical debt</b>.',
          'A little debt, taken on purpose for a good reason and paid back soon, is sensible. Debt that nobody tracks keeps charging interest. That is how a team ends up taking a week to make a change that used to take an hour.'
        ],
        tip: 'Lesson 13, Boy Scout rule, showed a mess meter going up when every visit left a little mess. It promised a bigger picture. This is it, with one new twist: here the mess is a <b>decision</b> you can weigh, like a loan.'
      },
      {
        label: 'The code', pic: code(shortcutCode, { title: 'orders.py, 13 December', hi: [7, 8], bad: [10, 11] }),
        h: 'Hampers by Friday.',
        text: [
          'It is Tuesday, two weeks before Christmas. Maya wants to sell Christmas hampers on her website, and she needs them on sale <b>by Friday</b>.',
          'Lines 1 to 5 are a short version of the shop\'s order job from lesson 44. <code>MENU</code> is a dictionary, the lookup table from lessons 37 and 46: <code>MENU[item]</code> finds the price of an item. <code>final_total</code> is the one home for the price rules, from lesson 6, DRY.',
          'The proper way is to make the hamper a real product that goes through <code>place_order</code> like everything else, with its wrapping, its tests and its kitchen screen. That is about <b>5 days</b>. Friday is 4 days away.',
          'So Maya takes a shortcut. She copies the order job, types the prices straight in on lines 10 and 11, and skips the tests. <b>1 day.</b> On lines 7 and 8 she writes down what she did and when she will fix it.',
          'She ships on time and sells 300 hampers. That was a <b>good decision</b>. She borrowed 4 days, on purpose, with her eyes open.'
        ],
        tip: 'The two notes on lines 7 and 8 matter. They say what the shortcut is, when it was taken, and when it is due. A loan you have written down is a loan you can pay back.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'The interest arrives.',
        text: [
          'January is busy. The note stays. Nobody touches the order code that month, so the loan costs nothing yet. Hampers sell so well that they stay on the menu.',
          '<b>February.</b> Every order must now show up on the kitchen screen. Maya adds <code>kitchen.add(item)</code> to <code>place_order</code>. A change to orders must now be made <b>twice</b>, and she misses the copy. Four hamper orders never reach the kitchen. Finding out why, saying sorry and delivering them late costs a day. That is lesson 1 all over again.',
          '<b>March.</b> A spring promotion: 10% off everything for a weekend. For normal orders that is one change inside <code>final_total</code>. The hamper copy works out its own total, and it has no tests, so Maya changes it by hand and checks it by hand. 3 days, not 1.',
          '<b>April.</b> Sam joins and spends a day puzzled: why are there two order systems, and which one is right? <b>May.</b> The delivery fee changes. Two places again: another day.',
          'Add it up. Maya borrowed 4 days. By the end of May she has paid 1 + 2 + 1 + 1 = <b>5 days</b> of interest, plus a mistake that real customers saw. The interest has passed the loan, and it is still growing every month.'
        ],
        warn: 'The shortcut was never the problem. It was a good loan. The problem was that "Fix in January" quietly became "fix one day", while the interest kept arriving. These numbers are Maya\'s, to show the shape. Yours will be different.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Pay it off.',
        text: [
          'In June Maya stops paying interest. She spends <b>5 days</b> doing it properly. That is refactoring: same hampers, same prices, better code.',
          'The hamper becomes a normal item on the menu, at $18. The <code>place_hamper_order</code> copy is deleted. Every order, hampers included, now goes through one job. Line 14 is a test, the kind you met in lesson 49, Testing pyramid. An $18 hamper is under $20, so no discount, and 9% tax makes it $19.62, the same total the copy charged. Paying off debt must not change what customers pay.',
          'Now every change to orders is made <b>once</b>. The next promotion takes an hour. The interest has stopped.',
          'Look at the bottom picture. Paid back in January, the whole adventure would have cost 1 + 5 = 6 days: one more day than the proper way, and the hampers made Christmas. Paid back in June, it cost 1 + 5 + 5 = 11 days. The loan was cheap. Leaving it unpaid was not.'
        ],
        tip: 'Keep a short <b>debt list</b> in one place the whole team sees: what the shortcut is, why it was taken, and when it is due. Look at it when you plan the next month. Lesson 51, Broken windows, comes back to this list.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'How often will I come back?',
        text: [
          'Before you take a shortcut, or when you find one, ask: <b>"What will this shortcut cost me every time I come back here, and how often will I come back?"</b>',
          'Interest is only paid when you <b>touch</b> the code. The hamper copy sat right in the middle of orders, the busiest road in the shop. Something about orders changes most months, so it charged interest most months.',
          'Maya also has an old year-end report with copied code inside. It is ugly. It runs once a year and nobody has changed it in three years. Interest paid: 0. <b>Leave it.</b>',
          'So pay off debt on the busy roads first. A shortcut in a quiet corner can wait, maybe for ever.'
        ]
      },
      {
        label: 'When not to', pic: quadPic,
        h: 'Not every mess is a loan. Not every loan needs paying.',
        text: [
          '<b>Debt is a shortcut you know you took.</b> The programmer Martin Fowler drew the picture in 2009 as four boxes. Deliberate or not, prudent (sensible) or reckless. Maya\'s hampers sit top right: a choice, for a good reason, with a plan. Copying code six times because nobody cared is bottom left. It still charges interest, but nobody chose it, so it is not a clever loan. It is just a mess. Bottom right is the debt you only see afterwards: "now we know how we should have built it".',
          '<b>Not everything you dislike is debt.</b> Old code that works and rarely changes is not debt. Code written in a style you would not choose is not debt. Calling everything "tech debt" drains the word, and then nobody listens when it matters.',
          '<b>Refusing every shortcut is its own mistake.</b> Suppose Maya had insisted on the 5-day way. The hampers miss Christmas and she sells none. A product that never launched has no customers to serve. Lesson 4, Trade-offs, not laws, lesson 8, YAGNI, and lesson 10, Premature optimisation, all warned about polishing what nobody is waiting for.',
          '<b>Do not pay off what you will not keep.</b> If the Valentine\'s page is deleted on 15 February, tidying it on the 10th is waste. The same goes for code nobody touches.',
          '<b>Do not stop everything for one big rewrite.</b> "Freeze all work for two months and rebuild orders" is usually the riskiest way to pay. Nothing ships, and the new version has bugs of its own. Pay down steadily, next to the work you are already doing, as in lesson 13, Boy Scout rule.'
        ],
        warn: 'Technical debt is a tool, not a sin. Borrow on purpose, write it down, pay it back where you work most. Next, a close cousin about how mess spreads from person to person: lesson 51, Broken windows.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: "Maya copied the order code to sell hampers by Friday, and wrote a dated note. What was that?",
        options: ['A mistake she should never have made', 'A sensible loan: chosen on purpose, for a real deadline, and written down', 'Fine for ever, because the code works', 'Just laziness'],
        answer: 1,
        why: 'She knew it was a shortcut, she had a good reason, and she wrote down when to pay it back. The trouble came later, from not paying it back.',
        hint: 'She sold 300 hampers she would otherwise have missed.'
      },
      {
        type: 'type', q: 'Maya borrowed 4 days. Interest paid: February 1 day, March 2 days, April 1 day, May 1 day. How many days of interest had she paid by the end of May?',
        prompt: 'days >',
        answers: ['5', '5 days'],
        why: '1 + 2 + 1 + 1 = 5. That is already one more day than she saved, and it keeps growing while the copy stays.',
        hint: 'Add up the four months.'
      },
      {
        type: 'pick', q: 'Maya has time to pay off one shortcut this week. Which one?',
        options: ['The copied hamper order job, changed most months', 'Copied code in the year-end report, opened once a year', 'A rushed Valentine\'s page that is deleted next week', 'All three at once, in a big rewrite'],
        answer: 0,
        why: 'Interest is only paid when you touch the code. Orders change most months, so that is where the interest is. The other two cost almost nothing.',
        hint: 'Ask how often each one gets touched.'
      },
      {
        type: 'bucket', q: 'A loan, a mess, or not debt at all?',
        buckets: ['A loan taken on purpose', 'A mess nobody chose', 'Not debt at all'],
        items: [
          ['Copy the code to hit a launch date, with a dated note', 0],
          ['Skip one test to fix a Saturday outage, with a ticket to add it on Monday', 0],
          ['Names like tmp2 because nobody cared', 1],
          ['The same rule pasted into six files without a thought', 1],
          ['Five-year-old code that works and rarely changes', 2],
          ['Code in a style you would not have chosen', 2]
        ],
        why: 'Debt in the loan sense is a choice with a plan. Careless mess also costs interest, but nobody chose it. Old or unfashionable code is not debt at all.'
      },
      {
        type: 'match', q: "Match each remark to its box in Martin Fowler's quadrant.",
        pairs: [
          ['Deliberate and prudent', '"We must ship by Friday. Copy now, fix in January."'],
          ['Deliberate and reckless', '"We never have time for tests."'],
          ['Inadvertent and reckless', '"What is a function for? I just copy the lines."'],
          ['Inadvertent and prudent', '"Now that it is built, we know how we should have built it."']
        ],
        why: 'Only the first is the clever loan Ward Cunningham described. The last one is normal too: you often only see the better design after building the first one.'
      },
      {
        type: 'order', q: "Put Maya's loan in order.",
        items: ['She copies the order job to sell hampers by Friday', 'She sells 300 hampers', 'A kitchen change is made in one copy and missed in the other', 'The interest passes the 4 days she borrowed', 'She spends 5 days making hampers a normal menu item', 'The next change to orders is made once'],
        why: 'Borrow, benefit, pay interest, pay off. The only step she would change is the timing of the pay-off.',
        hint: 'The shortcut and the sales come first. The pay-off comes last but one.'
      },
      {
        type: 'pick', q: 'Orders are full of old shortcuts. What is usually the safest way to pay them down?',
        options: ['Stop all new work for two months and rewrite orders from scratch', 'A small, safe improvement each time a real task brings you to that code, plus the worst one paid off on purpose', 'Never touch working code', 'Call it all technical debt and wait'],
        answer: 1,
        why: 'That is lesson 13, Boy Scout rule, used as a repayment plan. A big-bang rewrite ships nothing for months and brings new bugs of its own.',
        hint: 'Think back to the five visits in lesson 13.'
      },
      {
        type: 'pick', q: 'Which of these help you pay a shortcut back later? Pick all that apply.',
        pic: code([
          '# A: TODO fix later',
          '# B: SHORTCUT, 13 Dec: copy of place_order for hampers.',
          '#    Prices typed in. No tests. Fix in January.',
          '# C: hack',
          '# D: a line on the team\'s debt list: what, why, when due'
        ], { title: 'four notes' }),
        options: ['A', 'B', 'C', 'D'],
        answer: [1, 3],
        why: 'A useful note says what the shortcut is, why it was taken and when it is due, somewhere people will see it. "Fix later" and "hack" say none of that.',
        hint: 'Which ones would let Sam act on it without asking anybody?'
      }
    ]
  });
})();
