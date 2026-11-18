/* Lesson 6: DRY (module 1). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l06  DRY: Don't repeat yourself
     ===================================================================== */
  const card = (x, y, w, h, fill, lines) => box(x, y, w, h, fill, 10) +
    lines.map((l, i) => T(x + w / 2, y + 24 + i * 19, l[0], { s: l[2] || 12.5, w: l[3] || 800, f: l[1] || P.ink })).join('');

  const recipePic = svg(600, 300, 'One recipe card on the fridge says 1 cup of sugar. Three hand copies in notebooks: two say 1 cup, one still says 2 cups.',
    T(150, 34, 'ONE CARD ON THE FRIDGE', { s: 12.5, f: P.ok }) + T(450, 34, 'COPIED INTO 3 NOTEBOOKS', { s: 12.5, f: P.danger }) +
    `<line x1="300" y1="24" x2="300" y2="280" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    /* fridge */
    box(70, 54, 160, 176, P.sand, 16) +
    `<line x1="70" y1="112" x2="230" y2="112" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<line x1="88" y1="72" x2="88" y2="98" stroke="${P.ink}" stroke-width="4" stroke-linecap="round"/><line x1="88" y1="126" x2="88" y2="166" stroke="${P.ink}" stroke-width="4" stroke-linecap="round"/>` +
    card(106, 124, 108, 66, P.okT, [['Cookie recipe', P.ink, 12], ['sugar: 1 cup', P.ok, 12.5]]) +
    `<circle cx="160" cy="124" r="6" fill="${P.danger}" stroke="${P.ink}" stroke-width="2"/>` +
    T(150, 258, 'change it once,', { s: 13, w: 700, f: P.ink2 }) + T(150, 276, 'everyone reads the same card', { s: 13, w: 700, f: P.ink2 }) +
    /* notebooks */
    [['sugar: 1 cup', 0], ['sugar: 1 cup', 0], ['sugar: 2 cups', 1]].map((n, i) => {
      const x = 318 + i * 92;
      return box(x, 78, 80, 112, n[1] ? P.dangerT : P.white, 8) +
        [0, 1, 2, 3].map(k => `<circle cx="${x + 10}" cy="${94 + k * 26}" r="3.5" fill="${P.ink}"/>`).join('') +
        T(x + 46, 108, 'recipe', { s: 11.5, w: 700, f: P.ink2 }) +
        T(x + 46, 134, 'sugar:', { s: 12, f: n[1] ? P.danger : P.ink }) + T(x + 46, 152, n[0].slice(7), { s: 12.5, f: n[1] ? P.danger : P.ink }) +
        T(x + 40, 214, ['kitchen', 'shop', 'home'][i], { s: 12, w: 700, f: P.ink2 });
    }).join('') +
    T(450, 258, 'fix two, forget one,', { s: 13, w: 700, f: P.ink2 }) + T(450, 276, 'and the copies drift apart', { s: 13, w: 700, f: P.ink2 }));

  const shopCode = [
    'TAX_RATE = 0.09',
    '',
    'def show_price(price):',
    '    total = price + price * TAX_RATE',
    '    display(total)',
    '',
    'def take_payment(price):',
    '    total = price + price * TAX_RATE',
    '    charge_card(total)',
    '',
    'def print_receipt(price):',
    '    total = price + price * TAX_RATE',
    '    print_paper(total)'
  ];

  const job = (name, act, cmp) => [
    'def ' + name + '(price):',
    '    if price ' + cmp + ' 20:',
    '        price = price - price * 0.10',
    '    total = price + price * TAX_RATE',
    '    ' + act + '(total)'
  ];
  const copiedCode = ['TAX_RATE = 0.09', '']
    .concat(job('show_price', 'display', '>='), [''], job('take_payment', 'charge_card', '>'), [''], job('print_receipt', 'print_paper', '>='));

  const mismatchPic = `<div style="width:100%">${code(copiedCode, { title: 'shop.py, the rule written three times', hi: [4, 5, 6, 11, 12, 16, 17, 18], bad: [10] })}` +
    svg(600, 150, 'For an order of exactly 20 dollars the screen shows 19.62 dollars but the card is charged 21.80 dollars',
      T(300, 22, 'An order of exactly $20', { s: 13 }) +
      box(40, 40, 200, 70, '#15132B', 14) + T(140, 84, '$19.62', { s: 26, m: true, f: '#ECEAFF' }) + T(140, 132, 'screen shows', { s: 12.5, w: 700, f: P.ink2 }) +
      `<circle cx="300" cy="75" r="26" fill="${P.dangerT}" stroke="${P.ink}" stroke-width="2.5"/>` + T(300, 86, '≠', { s: 30, f: P.danger }) +
      box(360, 40, 200, 70, P.dangerT, 14) + T(460, 84, '$21.80', { s: 26, m: true, f: P.danger }) + T(460, 132, 'card is charged', { s: 12.5, w: 700, f: P.ink2 })) + `</div>`;

  const fixedCode = [
    'TAX_RATE = 0.09',
    '',
    'def final_total(price):',
    '    if price >= 20:',
    '        price = price - price * 0.10',
    '    return price + price * TAX_RATE',
    '',
    'def show_price(price):',
    '    total = final_total(price)',
    '    display(total)',
    '',
    'def take_payment(price):',
    '    total = final_total(price)',
    '    charge_card(total)',
    '',
    'def print_receipt(price):',
    '    total = final_total(price)',
    '    print_paper(total)'
  ];

  const testPic = svg(600, 330, 'When a rule with one home changes, one edit is enough and three jobs follow. When a rule with three copies changes, three edits are needed and one comes out different.',
    T(150, 34, 'ONE HOME', { s: 12.5, f: P.ok }) + T(450, 34, 'THREE COPIES', { s: 12.5, f: P.danger }) +
    `<line x1="300" y1="24" x2="300" y2="310" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    box(80, 54, 140, 42, P.warnT, 12) + T(150, 80, 'the rule changes', { s: 13 }) +
    arrow(150, 102, 150, 134, P.ok, 3.5) +
    box(72, 142, 156, 44, P.okT, 12) + T(150, 169, 'final_total', { s: 14, m: true, f: P.ok }) +
    [0, 1, 2].map(i => {
      const x = 62 + i * 88;
      return arrow(150, 192, x, 226, P.ink, 2.5) + box(x - 38, 234, 76, 36, P.white, 10) + T(x, 257, ['screen', 'card', 'receipt'][i], { s: 12 });
    }).join('') +
    T(150, 302, '1 edit, and all three agree', { s: 13, w: 700, f: P.ink2 }) +
    box(380, 54, 140, 42, P.warnT, 12) + T(450, 80, 'the rule changes', { s: 13 }) +
    [0, 1, 2].map(i => {
      const x = 362 + i * 88;
      return arrow(450, 102, x, 134, P.danger, 3) + box(x - 38, 142, 76, 44, i === 1 ? P.dangerT : P.white, 10) + T(x, 169, i === 1 ? 'copy ≠' : 'copy', { s: 12.5, f: i === 1 ? P.danger : P.ink }) +
        arrow(x, 192, x, 226, P.ink, 2.5) + box(x - 38, 234, 76, 36, P.white, 10) + T(x, 257, ['screen', 'card', 'receipt'][i], { s: 12 });
    }).join('') +
    T(450, 302, '3 edits, 3 chances to slip', { s: 13, w: 700, f: P.ink2 }));

  const apartCode = [
    'def big_order_discount(price):',
    '    return price * 0.10',
    '',
    'def suggested_tip(price):',
    '    return price * 0.10'
  ];
  const mergedCode = [
    'def ten_percent(price):',
    '    return price * 0.10',
    '',
    'def big_order_discount(price):',
    '    return ten_percent(price)',
    '',
    'def suggested_tip(price):',
    '    return ten_percent(price)'
  ];
  const lookalikePic = `<div style="width:100%">` +
    code(apartCode, { title: 'two rules that only look alike: leave them', good: [2, 5] }) +
    code(mergedCode, { title: 'merged by looks: now they are tied together', bad: [1, 2] }) + `</div>`;

  COURSE.add({
    id: 'l06', minutes: 8,
    summary: 'When the same rule is written in three places, the copies drift apart. <b>DRY</b> means "don\'t repeat yourself": every rule gets <b>one home</b>.',
    video: {
      src: 'videos/l06-dry.mp4', poster: 'videos/l06-dry.jpg', length: '59 s',
      script: [
        "Maya's shop has three jobs. Show the price, take the payment, print the receipt. Each one works out the total with the very same line.",
        'Then comes a new rule. Orders of $20 or more get 10% off. Maya writes the rule into the first job. Then the second. Then the third.',
        'But one copy came out slightly different. A customer orders exactly $20. The screen says $19.62. The card is charged $21.80.',
        'One rule, written three times, is three chances to get it wrong.',
        'The fix. Pull the three copies into one function, called final_total. Each job just asks it for the answer.',
        'Next time the rule changes, Maya changes it once. And all three jobs agree.',
        "That is DRY. Don't repeat yourself. Give every rule one home."
      ]
    },
    parts: [
      {
        label: 'The idea', pic: recipePic,
        h: 'One recipe card.',
        text: [
          'Maya keeps her cookie recipe on <b>one card</b> on the fridge. When she cuts the sugar from 2 cups to 1, she changes the card. Everyone who bakes reads the new recipe.',
          'Now picture the recipe copied by hand into three notebooks. She fixes two and forgets the third. One notebook still says 2 cups, and the shop now bakes two different cookies.',
          '<b>DRY</b> stands for <b>"don\'t repeat yourself"</b>. It means every piece of knowledge in a program should have <b>one home</b>. A piece of knowledge can be a rule or a way of working something out.'
        ],
        tip: 'DRY is about repeated <b>knowledge</b>, not repeated typing. Two lines can look the same and still be two different rules. More on that in the last part.'
      },
      {
        label: 'The code', pic: code(shopCode, { title: 'shop.py', hi: [4, 8, 12] }),
        h: 'The same line, three times.',
        text: [
          'This is <code>shop.py</code> after lesson 1. The tax number has one home now: <code>TAX_RATE</code> on line 1.',
          'But look at lines 4, 8 and 12. They are <b>the same line</b>. Each job works out the total in its own copy.',
          'That line is a piece of knowledge too. It is the shop\'s rule for <b>how a total is worked out</b>. The number has one home. The rule has three.'
        ],
        tip: 'Lesson 1 promised to come back to this line. Here we are.'
      },
      {
        label: 'The pain', pic: mismatchPic,
        h: 'One rule, three chances to slip.',
        text: [
          'Maya adds a new rule: <b>orders of $20 or more get 10% off, before tax</b>. This is not a new number. It changes <b>how</b> the total is worked out, so she has to write it into all three jobs.',
          'Two bits of Python. A line starting with <code>if</code> asks a question. The pushed-in line under it only runs when the answer is yes. <code>price = price - price * 0.10</code> means: take 10% off the price and keep the lower price.',
          'Now compare lines 4, 10 and 16. Two say <code>&gt;=</code>, "at least 20". One says <code>&gt;</code>, "more than 20". Maya tries a $30 order and all three jobs agree. Then a customer orders <b>exactly $20</b>.',
          'The screen takes 10% off: $18, plus $1.62 tax, is <b>$19.62</b>. The card job gives no discount: $20, plus $1.80 tax, is <b>$21.80</b>.'
        ],
        warn: 'Maya did not forget a place this time. She wrote all three. But writing one rule three times is three chances to write it a little differently.'
      },
      {
        label: 'The fix', pic: code(fixedCode, { title: 'shop.py, fixed', good: [3, 4, 5, 6], hi: [9, 13, 17] }),
        h: 'Give the rule one home.',
        text: [
          'Maya writes the rule <b>once</b>, in a new job called <code>final_total</code>. You met <code>return</code> in lesson 2: it hands back an answer. Here the answer is the finished total.',
          'Line 9 is a <b>call</b>. <code>final_total(price)</code> means: run that job with this price. The answer it hands back is stored in <code>total</code>. All three jobs now ask the same job for the answer.',
          'Next month the discount grows to 15%. Maya changes <b>line 5</b> and nothing else. The screen, the card reader and the receipt cannot disagree, because they all get the total from the same place.'
        ],
        tip: 'Lesson 1 gave a number one home. This lesson gives a rule one home. Lesson 7, Single source of truth, takes the same idea further for facts and data.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Ask one question.',
        text: [
          'Point at a rule in your code and ask: <b>"If this rule changes, would I have to change it in more than one place?"</b>',
          'If the answer is yes, the rule has more than one home. Sooner or later the copies will drift apart.',
          'Notice the question is about the <b>rule</b>, not about the letters on the screen. That matters for the next part.'
        ]
      },
      {
        label: 'When not to', pic: lookalikePic,
        h: 'Alike is not the same.',
        text: [
          'The shop gives 10% off big orders. The card reader also suggests a 10% tip. Both jobs say <code>price * 0.10</code>. Maya thinks "repeated code!" and merges them into one job, <code>ten_percent</code>.',
          'Then tips go up to 15%. There is one place to change it, so Maya changes it. Now <b>every big order gets 15% off</b> too.',
          'A discount and a tip are <b>two different rules</b> that share a number today. They change for different reasons. Merging them tied them together. That is the tight coupling from lesson 3, Loose coupling.'
        ],
        warn: 'Merge code that <b>means</b> the same thing, not code that only <b>looks</b> the same. When you are not sure yet, a little repetition is safer than the wrong merge. Knowing when to wait has its own lesson: lesson 9, Rule of three.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does DRY ask for?',
        options: ['Never type the same characters twice', 'Every rule or piece of knowledge has one home', 'Write as few lines as possible', 'Put every function in its own file'],
        answer: 1,
        why: 'DRY is about knowledge. A rule that lives in one place can only be changed in one place, so the copies can never disagree.',
        hint: 'Think of the recipe card on the fridge. What is there only one of?'
      },
      {
        type: 'pick', q: 'Members get 20% off. Three jobs work out the member price. Which one works it out differently?',
        pic: code([
          'def cart_price(price):',
          '    return price - price * 0.20',
          '',
          'def email_price(price):',
          '    return price - price * 0.20',
          '',
          'def invoice_price(price):',
          '    return price * 0.20'
        ], { title: 'members.py' }),
        options: ['cart_price', 'email_price', 'invoice_price', 'They all agree'],
        answer: 2,
        why: 'Line 8 hands back the discount, not the price after the discount. A $10 order shows $8 in the cart and $2 on the invoice. One rule written three times, and one copy drifted.',
        hint: 'Read the three <code>return</code> lines slowly. Two of them start with <code>price -</code>.'
      },
      {
        type: 'fill', q: 'Finish the fix so the rule for the total has one home.',
        text: 'def final_total(price):\n    if price >= 20:\n        price = price - price * 0.10\n    ___ price + price * TAX_RATE\n\ndef show_price(price):\n    total = ___(price)\n    display(total)',
        options: ['return', 'final_total', 'display', 'TAX_RATE'],
        answer: ['return', 'final_total'],
        why: '<code>return</code> hands the answer back. <code>final_total(price)</code> is the call that asks for it.',
        hint: 'The first blank is the word that hands back an answer. The second is the name of the job being called.'
      },
      {
        type: 'type', q: 'The discount grows from 10% to 15%. How many lines of this file must change? Type the number.',
        pic: code(fixedCode, { title: 'shop.py, fixed' }),
        prompt: 'lines >',
        answers: ['1', 'one'],
        why: 'Only line 5. The rule has one home, so the screen, the card reader and the receipt all follow.',
        hint: 'Find every line where <code>0.10</code> appears.'
      },
      {
        type: 'order', q: "Put Maya's story in order.",
        items: ['Three jobs each work out the total in their own copy', 'A new discount rule arrives', 'Maya writes the rule three times, and one copy is different', 'The screen and the card charge disagree', 'The rule moves into one job that all three call'],
        why: 'The trap was the three copies. It only showed on the day the rule changed.',
        hint: 'The problem starts with how the code was first written.'
      },
      {
        type: 'bucket', q: 'The same knowledge, or only a look-alike?',
        buckets: ['Same rule: give it one home', 'Only looks alike: leave apart'],
        items: [
          ['The total, worked out in three jobs', 0],
          ['The free-delivery rule, in the cart and in the email', 0],
          ['The member price, in the cart and on the invoice', 0],
          ['A 10% discount and a 10% tip', 1],
          ['A box of 30 cookies and a free cookie at 30 points', 1]
        ],
        why: 'Ask what each line means. If two lines must always change together, they are one rule. If they could change for different reasons, they are two.',
        hint: 'For each pair ask: if one changed, would the other have to change too?'
      },
      {
        type: 'pick', q: 'Back to lesson 3. Tips go up to 15%, so Maya changes line 2 to <code>0.15</code>. What happens?',
        pic: code(mergedCode, { title: 'tips_and_discounts.py' }),
        options: ['Only the tip changes', 'Big orders now get 15% off too', 'The program crashes', 'Nothing changes'],
        answer: 1,
        why: 'Both jobs call <code>ten_percent</code>, so both follow the change. The merge coupled two rules that have nothing to do with each other. Lesson 3, Loose coupling, warned about exactly this.',
        hint: 'Which jobs call <code>ten_percent</code>?'
      },
      {
        type: 'pick', q: 'Back to lesson 4. In the fixed <code>shop.py</code>, the discount <code>0.10</code> is typed once and has no name. Is that a DRY problem?',
        pic: code(fixedCode.slice(2, 6), { title: 'shop.py, the one home of the rule' }),
        options: ['Yes. Every number must have a name', 'No. It lives in one place, so one edit changes it', 'Yes. It should be copied into each job', 'No. Numbers never change'],
        answer: 1,
        why: 'The discount already has one home. Ask the questions from lesson 4, Trade-offs, not laws: the problem is not real right now. Give it a name on the day a second place needs it.',
        hint: 'Use the test. If the discount changes, how many places must change?'
      }
    ]
  });
})();
