/* Lesson 15: Separation of concerns (module 2). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l15  Separation of concerns
     ===================================================================== */
  const chip = (x, y, w, s, fill, o) => box(x, y, w, 32, fill || P.white, 10) + T(x + w / 2, y + 21, s, Object.assign({ s: 13 }, o || {}));
  // One colour per kind of work, used in every picture of this lesson.
  const KIND = { work: ['work out', P.warnT], save: ['save', P.okT], show: ['show', P.tint] };

  const kitchenPic = svg(600, 290, 'A restaurant with three separate stations for orders, cooking and washing up, next to one table where all three jobs are mixed together',
    T(150, 34, 'THREE STATIONS', { s: 12.5, f: P.ok }) + T(450, 34, 'ONE TABLE', { s: 12.5, f: P.danger }) +
    [['orders', P.tint], ['cook', P.warnT], ['wash up', P.okT]].map((r, i) => {
      const x = 24 + i * 86;
      return box(x, 70, 78, 120, r[1], 14) + T(x + 39, 136, r[0], { s: 14 });
    }).join('') +
    T(150, 232, 'one kind of work at each station', { s: 13, w: 700, f: P.ink2 }) +
    T(150, 252, 'a change at one leaves the others alone', { s: 13, w: 700, f: P.ink2 }) +
    `<line x1="300" y1="24" x2="300" y2="270" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    box(336, 56, 228, 150, P.dangerT, 18) +
    [['orders', 0, 0], ['wash up', 1, 0], ['cook', 0, 1], ['orders', 1, 1], ['wash up', 0, 2], ['cook', 1, 2]].map(r =>
      chip(352 + r[1] * 104, 70 + r[2] * 44, 92, r[0])).join('') +
    T(450, 232, 'everything at the same table', { s: 13, w: 700, f: P.ink2 }) +
    T(450, 252, 'soap next to the soup', { s: 13, w: 700, f: P.ink2 }));

  const tangled = [
    'def checkout(order):',
    '    print_paper("Maya\'s Cookies")',
    '    save_to_file(order.time)',
    '    total = order.price',
    '    print_paper("Cookies", order.price)',
    '    total = total + total * TAX_RATE',
    '    print_paper("Total", total)',
    '    save_to_file(total)'
  ];
  const broken = [
    'def checkout(order):',
    '    print_paper("Maya\'s Cookies")',
    '    save_to_file(order.time)',
    '    total = order.price',
    '    print_paper("Cookies", order.price)',
    '    save_to_file(total)',
    '    total = total + total * TAX_RATE',
    '    print_big("Total", total)',
    '    print_paper("Thank you!")'
  ];
  const parts = [
    'def work_out_total(order):',
    '    total = order.price',
    '    total = total + total * TAX_RATE',
    '    return total',
    '',
    'def save_sale(order, total):',
    '    save_to_file(order.time)',
    '    save_to_file(total)',
    '',
    'def print_receipt(order, total):',
    '    print_paper("Maya\'s Cookies")',
    '    print_paper("Cookies", order.price)',
    '    print_big("Total", total)',
    '    print_paper("Thank you!")'
  ];
  const caller = [
    'def checkout(order):',
    '    total = work_out_total(order)',
    '    save_sale(order, total)',
    '    print_receipt(order, total)'
  ];

  const mapPic = svg(600, 132, 'A map of the checkout job. The kinds of work take turns: show, save, work out, show, work out, show, save.',
    T(300, 24, 'What kind of work each line does', { s: 13 }) +
    ['show', 'save', 'work', 'show', 'work', 'show', 'save'].map((k, i) => {
      const x = 13 + i * 83;
      return box(x, 44, 74, 44, KIND[k][1], 12) + T(x + 37, 71, KIND[k][0], { s: 13.5 }) + T(x + 37, 116, 'line ' + (i + 2), { s: 12, w: 700, f: P.ink2 });
    }).join(''));
  const codePic = `<div style="width:100%">${code(tangled, { title: 'shop.py' })}${mapPic}</div>`;

  const painPic = `<div style="width:100%">${code(broken, { title: 'shop.py, after the new look', bad: [6], good: [8, 9] })}` +
    svg(600, 160, 'For 10 dollars of cookies the receipt prints 10 dollars 90 but the sales file gets 10 dollars',
      box(40, 22, 200, 70, P.white, 14) + T(140, 66, '$10.90', { s: 26, m: true }) + T(140, 112, 'the receipt prints', { s: 12.5, w: 700, f: P.ink2 }) +
      `<circle cx="300" cy="57" r="26" fill="${P.dangerT}" stroke="${P.ink}" stroke-width="2.5"/>` + T(300, 68, '≠', { s: 30, f: P.danger }) +
      box(360, 22, 200, 70, P.dangerT, 14) + T(460, 66, '$10.00', { s: 26, m: true, f: P.danger }) + T(460, 112, 'the sales file gets', { s: 12.5, w: 700, f: P.ink2 }) +
      T(300, 146, 'After one week: $180 of tax is missing from the books.', { s: 13, w: 700, f: P.ink2 })) + `</div>`;

  const fixPic = `<div style="width:100%">` +
    code(parts, { title: 'shop.py, one part per kind of work', good: [13, 14] }) +
    code(caller, { title: 'shop.py, the checkout is now a short list' }) + `</div>`;

  const testPic = svg(600, 300, 'Each kind of change opens one part. A new look opens print_receipt, a new rule opens work_out_total, a new place to save opens save_sale.',
    T(145, 34, 'THE CHANGE', { s: 12.5, f: P.ink2 }) + T(455, 34, 'THE ONE PART TO OPEN', { s: 12.5, f: P.ok }) +
    [['a new look for the receipt', 'print_receipt', P.tint], ['a new discount rule', 'work_out_total', P.warnT], ['save to a different place', 'save_sale', P.okT]].map((r, i) => {
      const y = 54 + i * 70;
      return box(30, y, 230, 46, P.white, 12) + T(145, y + 28, r[0], { s: 13.5 }) +
        arrow(270, y + 23, 338, y + 23, P.ok, 3.5) +
        box(350, y, 210, 46, r[2], 12) + T(455, y + 29, r[1], { s: 14, m: true });
    }).join('') +
    T(300, 276, 'The other two parts stay closed.', { s: 13, w: 700, f: P.ink2 }));

  const hop = [[364, 76], [420, 76], [476, 76], [532, 76], [532, 126], [476, 126], [420, 126], [364, 126], [364, 176], [420, 176], [476, 176], [532, 176]];
  const overPic = svg(600, 290, 'A ten line script that is run once is fine as one file. A receipt split into twelve tiny parts makes a simple change hop through all of them.',
    T(150, 34, 'RUN ONCE', { s: 12.5, f: P.ok }) + T(450, 34, 'OVER-SEPARATED', { s: 12.5, f: P.danger }) +
    box(60, 70, 180, 120, P.okT, 18) + T(150, 122, 'count_cookies.py', { s: 14, m: true }) + T(150, 148, '10 lines, 1 file', { s: 13, w: 700, f: P.ink2 }) +
    T(150, 232, 'run once, then deleted', { s: 13, w: 700, f: P.ink2 }) + T(150, 252, 'fine as it is', { s: 13, w: 700, f: P.ink2 }) +
    `<line x1="300" y1="24" x2="300" y2="270" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    hop.map(p => `<rect x="${p[0] - 18 + 3}" y="${p[1] - 14 + 4}" width="40" height="30" rx="7" fill="${P.ink}"/><rect x="${p[0] - 18}" y="${p[1] - 14}" width="40" height="30" rx="7" fill="${P.dangerT}" stroke="${P.ink}" stroke-width="2.5"/>`).join('') +
    `<path d="M${hop.map(p => (p[0] + 2) + ' ' + (p[1] + 1)).join(' L')}" fill="none" stroke="${P.danger}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="2 7"/>` +
    T(450, 232, '12 tiny parts for one receipt', { s: 13, w: 700, f: P.ink2 }) + T(450, 252, 'a simple change hops through them all', { s: 13, w: 700, f: P.ink2 }));

  COURSE.add({
    id: 'l15', minutes: 8,
    summary: 'A program does different kinds of work: working things out, saving, and showing. <b>Separation of concerns</b> gives each kind its own part, so a change to the looks cannot break the sums.',
    video: {
      src: 'videos/l15-separation-of-concerns.mp4', poster: 'videos/l15-separation-of-concerns.jpg', length: '1 min 3 s',
      script: [
        "Maya's checkout does 3 kinds of work. It works out the total. It saves the sale. And it prints the receipt.",
        'Here is the code. Look at the colours. The 3 kinds of work are braided together, line by line.',
        'Then a request arrives. It is only about looks. Make the total big, and add a thank you.',
        'Maya edits among the tangled lines. To tidy up, she moves the save line. It lands above the tax.',
        'Now the receipt says $10.90. But the sales file says $10. Every receipt looks fine, so for a week, nobody notices.',
        'The fix. Pull the braid apart. One part works out the total. One part saves the sale. One part prints the receipt.',
        'Now a change to the looks touches only the printing part. The sums and the sales file stay closed.',
        'That is separation of concerns. One kind of work per part.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: kitchenPic,
        h: 'Three stations, not one table.',
        text: [
          'In a good restaurant, one station <b>takes orders</b>, one <b>cooks</b> and one <b>washes up</b>. A new menu card changes nothing at the stove. Now picture one person doing all three at the same table, with the soap next to the soup.',
          'A program does different kinds of work too. Each kind is called a <b>concern</b>. Almost every program has these three: <b>working things out</b> (the rules: totals, discounts, tax), <b>remembering things</b> (saving and loading), and <b>talking to the outside</b> (showing, printing, asking).',
          '<b>Separation of concerns</b> means each kind of work gets its own part. Then you can change how something <b>looks</b> without risking how it is <b>worked out</b> or <b>saved</b>.'
        ],
        tip: 'Lesson 2, High cohesion, grouped code by <b>topic</b>: menu, receipt, points. Separation of concerns slices the other way, by <b>kind of work</b>, and the two work together.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'One job, three kinds of work.',
        text: [
          'This job runs at the end of every sale. It is given the <code>order</code>. The dot works as in lesson 2, where <code>card.points</code> meant the points on a card. So <code>order.price</code> is the price of the cookies, and <code>order.time</code> is when they were bought.',
          '<code>save_to_file(...)</code> writes one more line into the shop\'s <b>sales file</b>. Maya does her books from that file. <code>TAX_RATE = 0.09</code> still sits at the top, as in lesson 1. Charging the card is left out to keep the example short.',
          'Line 4 starts <code>total</code> at the price. Line 6 adds the tax to it. So <code>total</code> <b>changes on the way down</b>.',
          'Now look at the map under the code. The three kinds of work <b>take turns</b>, line by line: show, save, work out, show, work out, show, save.'
        ]
      },
      {
        label: 'The pain', pic: painPic,
        h: 'A new look breaks the books.',
        text: [
          'A request arrives, and it is <b>only about looks</b>: print the total in big letters, and add a thank-you line at the end.',
          'Maya changes the total line to <code>print_big</code>, which prints in big letters. She adds the thank-you at the bottom. Now the last save line sits between two printing lines. To tidy up, she moves it higher. It lands on line 6, <b>above the tax</b>.',
          'A customer buys $10 of cookies. On line 6, <code>total</code> is still 10. So the sales file gets <b>$10.00</b>. Then line 7 adds the tax, and the receipt prints <b>$10.90</b>.',
          'Every receipt looks right, so nobody notices for a week. In that week the shop sells $2,000 of cookies. Customers paid $2,180. The sales file says $2,000. <b>$180 of tax is missing from the books.</b>'
        ],
        warn: 'Nothing crashed. Maya was asked to change how the receipt <b>looks</b>, and she broke what the shop <b>remembers</b>. That can only happen when both kinds of work share the same lines.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'One part per kind of work.',
        text: [
          'Maya pulls the lines apart into <b>three parts</b>. Hardly anything is rewritten. Each line moves to the part for its kind of work.',
          '<code>work_out_total</code> holds the rules. It prints nothing and saves nothing. It hands back the finished total with <code>return</code>, as in lesson 6.',
          '<code>save_sale</code> only saves. <code>print_receipt</code> only prints. Both are <b>handed the finished total</b>, so neither can pick it up half-done.',
          '<code>checkout</code> is now a short list: work it out, save it, print it.',
          'Now try the same request again. Maya opens <code>print_receipt</code>, changes line 13 and adds line 14. There is <b>no save line in that part to move</b>. The sales file gets $10.90.'
        ],
        tip: 'Separation of concerns is the big idea for a whole program. The next lesson, Single responsibility, applies it to one function or class.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Change the looks. What else moves?',
        text: [
          'Ask: <b>"Can I change how it looks without touching how it is worked out or saved?"</b>',
          'Then turn it around. Can I change a rule without touching the printing? Can I change where sales are saved without touching the rules?',
          'If every answer is yes, the concerns are separated. A quick sign of trouble: one function where printing lines, saving lines and sums <b>take turns</b>.'
        ]
      },
      {
        label: 'When not to', pic: overPic,
        h: 'Three kinds of work, not thirty parts.',
        text: [
          '<b>A tiny program does not need it.</b> Maya writes a 10-line script to count the cookies she sold last year. She runs it once and deletes it. Splitting it into three files would take longer than writing it.',
          '<b>Do not over-separate.</b> Suppose Maya loves this lesson and gives every line its own part: one for the shop name, one for the tax, one for the time. Now a dozen tiny parts make one receipt, and a simple change hops through all of them. That is lesson 4 again: 4 files for 2 words.',
          'Separate when the kinds of work really <b>change at different times, for different reasons</b>. The receipt changes when Maya wants a new look. The rules change when the city changes the tax.'
        ],
        warn: 'Lesson 2 warned about <code>constants.py</code>, a file that grouped numbers only because they looked alike. This split is different. Ask the lesson 2 question: what changes together? The printing lines do. So do the rules.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'In this lesson, what is a "concern"?',
        options: ['A bug that worries the programmer', 'One kind of work a program does', 'One file in a program', 'A note left in the code for people'],
        answer: 1,
        why: 'Working things out, saving, and showing are three concerns. Each one gets its own part.',
        hint: 'Think of the three stations in the restaurant.'
      },
      {
        type: 'bucket', q: 'What kind of work does each line do?',
        buckets: ['Work out', 'Save', 'Show'],
        items: [
          ['total = total + total * TAX_RATE', 0],
          ['if price >= 20:', 0],
          ['save_to_file(total)', 1],
          ['save_to_file(order.time)', 1],
          ['print_paper("Thank you!")', 2],
          ['display(total)', 2]
        ],
        why: 'Sums and rules are working out. Writing to the sales file is saving. Paper and screens are showing.',
        hint: 'Ask of each line: does it do a sum, write to the file, or put something in front of a person?'
      },
      {
        type: 'type', q: 'This is the code after Maya\'s tidy-up. A customer buys <b>$20</b> of cookies. What amount does line 6 write into the sales file? (<code>TAX_RATE</code> is 0.09.)',
        pic: code(broken, { title: 'shop.py, after the new look' }),
        prompt: 'dollars >',
        answers: ['20', '20.00', '20.0', '$20', '$20.00'],
        why: 'On line 6 the tax has not been added yet, so <code>total</code> is still 20. The receipt prints $21.80. The file is $1.80 short.',
        hint: 'Read from the top. What is <code>total</code> when line 6 runs? Line 7 has not happened yet.'
      },
      {
        type: 'pick', q: 'Maya wrote this part later. Which line does a different kind of work from the rest?',
        pic: code([
          'def print_receipt(order, total):',
          '    print_paper("Maya\'s Cookies")',
          '    print_paper("Cookies", order.price)',
          '    save_to_file(total)',
          '    print_big("Total", total)',
          '    print_paper("Thank you!")'
        ], { title: 'shop.py' }),
        options: ['Line 2', 'Line 3', 'Line 4', 'Line 5'],
        answer: 2,
        why: 'Line 4 saves. Everything else prints. It also breaks lesson 11, Least astonishment: nobody reading the name <code>print_receipt</code> would guess that it writes to the sales file.',
        hint: 'Four lines put something on paper. One line does not.'
      },
      {
        type: 'fill', q: 'Finish the checkout so each kind of work is done by its own part, in the right order.',
        text: 'def checkout(order):\n    total = ___(order)\n    ___(order, total)\n    ___(order, total)',
        options: ['work_out_total', 'save_sale', 'print_receipt', 'print_paper'],
        answer: ['work_out_total', 'save_sale', 'print_receipt'],
        why: 'First the total is worked out. Then the finished total is handed to the part that saves and the part that prints.',
        hint: 'The first blank hands back a total. The other two are given it.'
      },
      {
        type: 'match', q: 'A change request arrives. Match each one to the one part Maya should open.',
        pairs: [
          ['Add the shop\'s phone number to the receipt', 'print_receipt'],
          ['Orders of $20 or more get 10% off', 'work_out_total'],
          ['Also save which cookies were sold', 'save_sale']
        ],
        why: 'One kind of change, one part to open. The other two parts stay closed, so they cannot break.',
        hint: 'Is the request about looks, about a rule, or about what the shop remembers?'
      },
      {
        type: 'pick', q: 'Back to lesson 2, High cohesion. Both lessons split code up. What does each one slice by?',
        options: [
          'Lesson 2 by topic, this lesson by kind of work',
          'Lesson 2 by kind of work, this lesson by topic',
          'Both by how long the file is',
          'Both by who wrote the code'
        ],
        answer: 0,
        why: 'Lesson 2 put menu with menu and points with points. This lesson keeps working out, saving and showing apart. Good code does both.',
        hint: 'Lesson 2 made <code>menu.py</code>, <code>receipt.py</code> and <code>points.py</code>. Are those kinds of work, or topics?'
      },
      {
        type: 'bucket', q: 'Worth separating, or leave it alone?',
        buckets: ['Worth separating', 'Leave it alone'],
        items: [
          ['A checkout where sums, saving and printing take turns', 0],
          ['A report whose look changes every month, built on rules that rarely change', 0],
          ['A 10-line script that is run once and deleted', 1],
          ['A 3-line job that only prints', 1],
          ['A receipt job already split by kind of work, now cut into one file per line', 1]
        ],
        why: 'Separate when kinds of work are mixed and change for different reasons. A tiny one-off script, or a part that already does one kind of work, gains nothing from more slicing.',
        hint: 'Ask the lesson 4 questions: is the problem real right now, and what will the split cost the next reader?'
      }
    ]
  });
})();
