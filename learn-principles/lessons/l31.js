/* Lesson 31: Interface segregation (module 3). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l31  Interface segregation
     ===================================================================== */

  const tick = (x, y) => `<circle cx="${x}" cy="${y}" r="12" fill="${P.ok}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<path d="M${x - 5} ${y} l4 4 l7 -8" fill="none" stroke="#fff" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>`;
  const fakeMark = (x, y) => `<g transform="rotate(-7 ${x} ${y})"><rect x="${x - 30}" y="${y - 13}" width="60" height="26" rx="6" fill="#fff" stroke="${P.danger}" stroke-width="2.5"/>` +
    T(x, y + 5, 'FAKE', { s: 12.5, f: P.danger }) + `</g>`;

  /* ---- The idea: one giant job advert ---- */
  const advertLine = (x, y, s, real) => T(x, y, s, { s: 13, a: 'start' }) + (real ? tick(x + 176, y - 5) : fakeMark(x + 168, y - 5));
  const ideaPic = svg(600, 310, 'One big job advert that demands four skills, so a helper who can only sell cookies has to fake three ticks. Next to it, four small adverts, where the helper signs only the one that is true.',
    T(150, 30, 'ONE BIG LIST', { s: 12.5, f: P.danger }) + T(450, 30, 'SMALL LISTS', { s: 12.5, f: P.ok }) +
    `<line x1="300" y1="20" x2="300" y2="292" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    box(34, 46, 232, 196, P.warnT, 16) +
    T(150, 72, 'HELP WANTED', { s: 14 }) + T(150, 90, 'must do all four', { s: 12, w: 700, f: P.ink2 }) +
    advertLine(54, 122, 'sell cookies', true) +
    advertLine(54, 152, 'drive the van', false) +
    advertLine(54, 182, 'fix the oven', false) +
    advertLine(54, 212, 'do the tax books', false) +
    T(150, 268, 'Sam can sell cookies.', { s: 13 }) + T(150, 286, 'To get the job, he fakes three ticks.', { s: 12.5, w: 700, f: P.ink2 }) +
    [['seller', 'sell cookies', true], ['driver', 'drive the van', false], ['fixer', 'fix the oven', false], ['bookkeeper', 'do the tax books', false]].map((r, i) => {
      const y = 46 + i * 50;
      return box(334, y, 232, 38, r[2] ? P.okT : P.white, 10) + T(350, y + 24, r[0].toUpperCase(), { s: 11, a: 'start', f: r[2] ? P.ok : P.mute }) + T(440, y + 24, r[1], { s: 13, a: 'start', f: r[2] ? P.ink : P.ink2 }) + (r[2] ? tick(548, y + 19) : '');
    }).join('') +
    T(450, 268, 'Sam signs one list. All of it is true.', { s: 13 }) + T(450, 286, 'Need a driver? Ask for a driver.', { s: 12.5, w: 700, f: P.ink2 }));

  /* ---- the sign-up sheet: jobs down the side, ways to pay across the top ---- */
  const kinds = ['Card', 'Cash', 'Phone', 'Gift voucher'];
  const canDo = { 'pay(amount)': [1, 1, 1, 1], 'refund(amount)': [1, 1, 1, 0], 'print_slip()': [1, 0, 0, 0], 'tip(amount)': [1, 0, 0, 0] };
  const sheet = (jobs, label, foot) => {
    const h = 86 + jobs.length * 42 + (foot ? 30 : 0);
    return svg(600, h, label,
      T(95, 34, 'THE BIG LIST', { s: 12.5, f: P.ink2 }) +
      kinds.map((k, i) => T(233 + i * 102, 34, k, { s: 12.5 })).join('') +
      jobs.map((j, r) => {
        const y = 50 + r * 42;
        return box(20, y, 150, 32, r === 3 ? P.tint : P.white, 9) + T(32, y + 21, j, { s: 12, a: 'start', m: true }) +
          canDo[j].map((ok, i) => {
            const x = 186 + i * 102;
            return `<rect x="${x}" y="${y}" width="94" height="32" rx="6" fill="${ok ? P.paper2 : P.dangerT}" stroke="${P.ink}" stroke-width="2"/>` + (ok ? tick(x + 47, y + 16) : fakeMark(x + 47, y + 16));
          }).join('');
      }).join('') +
      (foot ? T(300, 76 + jobs.length * 42 + 14, foot, { s: 13, w: 700, f: P.ink2 }) : ''));
  };

  /* ---- The code: the big list, and a part that can honestly do all of it ---- */
  const bigList = [
    '# the big list. Every way to pay must offer:',
    '#   pay(amount)   refund(amount)   print_slip()',
    '',
    'class CardPayment:',
    '    def pay(self, amount):',
    '        swipe_machine.connect()',
    '        swipe_machine.send_cents(to_cents(amount))',
    '        return swipe_machine.last_code == 7',
    '    def refund(self, amount):',
    '        return swipe_machine.send_back(to_cents(amount))',
    '    def print_slip(self):',
    '        swipe_machine.print_slip()'
  ];
  const codePic = `<div style="width:100%">${code(bigList, { title: 'payments.py', hi: [1, 2] })}` +
    sheet(['pay(amount)', 'refund(amount)', 'print_slip()'], 'A sign-up sheet. Three jobs down the side and four ways to pay across the top. Card ticks all three honestly. Cash and phone fake print_slip. The gift voucher fakes refund and print_slip.', '12 boxes. 8 are true. 4 are faked.') + `</div>`;

  /* ---- The pain: a faked box meets a button that trusts it ---- */
  const voucherFake = [
    'class GiftVoucherPayment:',
    '    _left = 20',
    '',
    '    # left() and pay(amount) stay as in lesson 30',
    '',
    '    def refund(self, amount):',
    '        return True      # gives nothing back',
    '    def print_slip(self):',
    '        pass             # no printer. Does nothing'
  ];
  const samButton = [
    'def refund_last_sale(payment, amount):',
    '    if payment.refund(amount):',
    '        display("Refunded $" + str(amount))',
    '    else:',
    '        display("Refund failed")'
  ];
  const painPic = `<div style="width:100%">${code(voucherFake, { title: 'gift_voucher.py, made to fit the big list', bad: [7, 9] })}` +
    code(samButton, { title: "till.py, Sam's refund button", hi: [2] }) +
    sheet(['pay(amount)', 'refund(amount)', 'print_slip()', 'tip(amount)'], 'The same sign-up sheet after tip is added to the big list. Only the card can take a tip, so cash, phone and gift voucher each fake one more box.', 'tip joins the list: 4 classes opened, 7 boxes faked.') + `</div>`;

  /* ---- The fix: small lists, and a till that asks for one ability ---- */
  const smallLists = [
    '# three small lists, not one big one:',
    '#   pay(amount)      every way to pay',
    '#   refund(amount)   only parts that can give money back',
    '#   print_slip()     only parts with a printer',
    '',
    'class GiftVoucherPayment:',
    '    _left = 20',
    '',
    '    # left() and pay(amount), as in lesson 30',
    '    # no refund. No print_slip. Nothing is faked.'
  ];
  const tillFixed = [
    'def sale_buttons(payment):',
    '    if hasattr(payment, "refund"):',
    '        show_button("Refund last sale")',
    '    if hasattr(payment, "print_slip"):',
    '        show_button("Print card slip")',
    '',
    '# refund_last_sale stays exactly as Sam wrote it'
  ];
  const tipLater = [
    '# a fourth small list: tip(amount)',
    '',
    'class CardPayment:',
    '    # pay, refund and print_slip stay as they were',
    '',
    '    def tip(self, amount):',
    '        return swipe_machine.send_cents(to_cents(amount))'
  ];
  const fixPic = `<div style="width:100%">${code(smallLists, { title: 'payments.py, small lists', good: [1, 2, 3, 4, 10] })}` +
    code(tillFixed, { title: 'till.py, ask for one ability', good: [2, 4] }) +
    code(tipLater, { title: 'later, when tips arrive: one class opened', good: [6, 7] }) + `</div>`;

  /* ---- The test: both sides of each small list ---- */
  const testCol = (x, caller, job, fill, signers) =>
    box(x, 44, 164, 40, P.white, 10) + T(x + 82, 69, caller, { s: 12.5 }) +
    arrow(x + 82, 90, x + 82, 122, P.ink, 2.5) +
    box(x, 128, 164, 40, fill, 20) + T(x + 82, 153, job, { s: 12.5, m: true }) +
    signers.map((s, i) => T(x + 82, 196 + i * 20, s, { s: 12.5, w: 700, f: P.ink2 })).join('');
  const testPic = svg(600, 300, 'Three small lists. The checkout uses pay, and all four ways to pay offer it. The refund button uses refund, offered by card, cash and phone. The slip button uses print_slip, offered by the card only. Every user needs the whole of its list and every signer can do all of it.',
    T(300, 26, 'WHO USES IT', { s: 12.5, f: P.ink2 }) +
    testCol(24, 'checkout', 'pay(amount)', P.tint, ['Card', 'Cash', 'Phone', 'Gift voucher']) +
    testCol(218, 'refund button', 'refund(amount)', P.okT, ['Card', 'Cash', 'Phone']) +
    testCol(412, 'slip button', 'print_slip()', P.warnT, ['Card']) +
    T(300, 288, 'WHO SIGNS IT: only parts that can really do it', { s: 12.5, f: P.ink2 }));

  /* ---- When not to: confetti ---- */
  const overPic = svg(600, 300, 'One list for the loyalty card with balance, earn and spend, which always come together. Next to it, the same three jobs cut into three tiny lists that every card signs anyway.',
    T(150, 30, 'ONE LIST, ALWAYS TOGETHER', { s: 12.5, f: P.ok }) + T(450, 30, 'CONFETTI', { s: 12.5, f: P.danger }) +
    `<line x1="300" y1="20" x2="300" y2="282" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    box(50, 56, 200, 130, P.okT, 16) + T(150, 82, 'loyalty card', { s: 14, f: P.ok }) +
    ['balance()', 'earn(amount)', 'spend(amount)'].map((s, i) => T(150, 112 + i * 26, s, { s: 13, m: true })).join('') +
    T(150, 226, 'Every card does all three.', { s: 13 }) + T(150, 246, 'Nothing is faked. Leave it whole.', { s: 12.5, w: 700, f: P.ink2 }) +
    [['CanShowBalance', 'balance()', 340, 50, -4], ['CanEarn', 'earn(amount)', 400, 102, 3], ['CanSpend', 'spend(amount)', 352, 154, -2]].map(r =>
      `<g transform="rotate(${r[4]} ${r[2] + 90} ${r[3] + 20})">` + box(r[2], r[3], 190, 40, P.white, 10) + T(r[2] + 12, r[3] + 17, r[0], { s: 10.5, a: 'start', f: P.danger }) + T(r[2] + 12, r[3] + 33, r[1], { s: 12, a: 'start', m: true }) + `</g>`).join('') +
    T(450, 226, 'Three lists to keep in your head.', { s: 13 }) + T(450, 246, 'Every card signs all three anyway.', { s: 12.5, w: 700, f: P.ink2 }));

  COURSE.add({
    id: 'l31', minutes: 10,
    summary: 'No part should be forced to offer jobs it cannot do, and no code should have to depend on jobs it never uses. So keep each list of jobs <b>small and focused</b>. That is interface segregation, the I in SOLID.',
    video: {
      src: 'videos/l31-interface-segregation.mp4', poster: 'videos/l31-interface-segregation.jpg', length: '1 min 10 s',
      script: [
        "Maya's shop has 4 ways to pay. Card. Cash. Phone. And gift voucher.",
        'She writes one big list that every one of them must sign. Pay. Refund. Print a slip.',
        'The card can do all 3. But cash has no slip printer. Neither has the phone. And a gift voucher cannot refund, or print. The list makes them tick those boxes anyway. 4 fake ticks.',
        'Sam builds a refund button. A customer returns a $20 cake, paid by voucher. The screen says refunded. The customer gets nothing.',
        'Then Maya adds tips to the list. Only the card can take a tip. But all 4 have to sign again.',
        'The fix. Cut the big list into small ones. Each way to pay wears only the badges it has earned.',
        'Now the refund button asks for one badge. The voucher is not even offered. And the tip badge goes to the card alone.',
        'That is interface segregation. Small, focused lists, so nobody signs for what they cannot do.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Nobody can honestly sign the giant advert.',
        text: [
          'A bakery puts up one job advert: must sell cookies, drive the van, fix the oven <b>and</b> do the tax books. Sam can sell cookies. To get the job he has to tick all four boxes. Three of those ticks are not true.',
          'Now cut the advert into four small ones. Sam signs the one he can really do. When the bakery needs a driver, it asks for a driver, and Sam is not even in the queue.',
          'In lesson 28, Program to an interface, an interface was the list of things you can ask a part to do. <b>Interface segregation</b> says: keep those lists <b>small and focused</b>. No part should be forced to offer jobs it cannot do. No code should be made to depend on jobs it never uses. Segregation is just a long word for keeping things apart.'
        ],
        tip: 'This is the <b>I</b> in SOLID. It was formulated by Robert C. Martin, the "Uncle Bob" you met in lesson 13. Lesson 28 warned that a list can be too wide. Lesson 30, Liskov substitution, said that a part which truly cannot do something should not claim that ability at all. This lesson shows how.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'One big list for every way to pay.',
        text: [
          'After lesson 28, every way to pay offered one job, <code>pay(amount)</code>. Maya gets ambitious. She writes down a bigger list that every way to pay "must" offer: <code>pay(amount)</code>, <code>refund(amount)</code> and <code>print_slip()</code>. To keep the picture small, we follow four of her ways to pay.',
          'Lines 1 and 2 are notes for people, as in lesson 4. Python does not check a list like this. It is a promise the team keeps, as lesson 28 explained.',
          'Here <code>print_slip()</code> means: print the paper slip on <b>your own</b> printer. The card machine has one. So <code>CardPayment</code> can do all three jobs, and every line in it does real work.',
          'Now read the sheet under the code. The cash drawer and the phone tap pad have no printer. Gift vouchers cannot be refunded. That is the shop rule printed on each one. But the big list has a box for every job, and every part has to tick every box. <b>12 boxes. 4 of them are faked.</b>'
        ]
      },
      {
        label: 'The pain', pic: painPic,
        h: '"Refunded $20." Nothing came back.',
        text: [
          'Look at how the gift voucher fills its boxes. One new word: <code>pass</code> means "do nothing". Python needs at least one line inside a job, and <code>pass</code> is that line. So <code>print_slip</code> does nothing. And <code>refund</code> answers <code>True</code>, which means "it worked", without giving anything back.',
          'Sam writes a button for the till, <b>Refund last sale</b>. It trusts the list. Every payment has a <code>refund</code>, so line 2 just calls it.',
          'A customer returns a $20 cake that she paid for with a gift voucher. Sam presses the button. The screen says <b>Refunded $20</b>. Her voucher still holds $0, and no money comes out of the drawer. She leaves believing she was paid back.',
          'There is a second cost. Maya adds <code>tip(amount)</code> to the big list, because the card machine can ask for a tip. Now she has to open <b>all four</b> classes. Three of them get a <code>tip</code> job that does nothing. Count the faked boxes on the sheet: <b>7 of 16</b>.'
        ],
        warn: 'Nothing crashed. And no way of filling the box would have been right. Doing nothing lies. Answering <code>False</code> makes Sam think the till is broken. A <code>raise</code> stops the till, as in lesson 30. The name <code>refund</code> made a promise the voucher could never keep. That was lesson 11, Least astonishment. The mistake is the box itself.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Cut the list by ability.',
        text: [
          'Maya cuts the big list into three small ones, one for each ability. <b>Everyone</b> can take payment. <b>Only some</b> can refund. <b>Only parts with a printer</b> can print a slip. Each class now offers only the jobs it can really do. The gift voucher loses its two fakes and is honest again.',
          'The till has to ask before it shows a button. <code>hasattr(payment, "refund")</code> asks one question: does this part <b>have</b> a job called <code>refund</code>? The answer is <code>True</code> or <code>False</code>. For a gift voucher it is <code>False</code>, so the refund button is never shown. Sam sees no button, and he knows to ask Maya. She swaps the cake for another one.',
          'Notice that this does not ask <b>which kind</b> of payment it is, as <code>isinstance</code> did in lesson 30. It asks <b>what the part can do</b>. A new way to pay that can refund gets the button with no change to the till.',
          'Now tips arrive again. <code>tip(amount)</code> becomes a fourth small list, and only <code>CardPayment</code> signs it. <b>One class opened.</b> Cash, phone and gift voucher are not touched.'
        ],
        tip: 'Many languages, such as Java and C#, let you write each small list down with the <code>interface</code> keyword from lesson 28. Then a job can say "I only accept parts that can refund", and a voucher is turned away before the program even runs. Python has a way to write the lists down too. It is called a <code>Protocol</code>.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Does everyone on the list use all of it?',
        text: [
          'Point at a list of jobs and ask: <b>"Does every part that signs this list really use or provide everything on it?"</b>',
          'Check both sides. First the parts that <b>provide</b> it. Try the big list: the gift voucher faked two of three jobs. No. Try the small <code>refund</code> list: card, cash and phone can all give money back. Yes.',
          'Then the code that <b>uses</b> it. The checkout only ever calls <code>pay</code>. With the big list, it was also tied to refunds, slips and tips. A change to any of them could reach it. With small lists, it depends on one job, and that job is the one it calls.',
          'Signs of a list that is too wide: a job whose whole body is <code>pass</code>, an answer that is always the same, a <code>raise</code> that says "not supported", or a caller that uses one job out of six.'
        ],
        tip: 'Lesson 16, Single responsibility, asked who could ask a piece of code to change. This is the same instinct, applied to the lists between pieces. A list that serves the checkout <b>and</b> the refund desk <b>and</b> the tip screen answers to three users at once.'
      },
      {
        label: 'When not to', pic: overPic,
        h: 'Small lists, not confetti.',
        text: [
          '<b>Do not cut what always comes together.</b> Suppose Maya loves this lesson and gives every job its own list. The loyalty card from lesson 19 gets <code>CanShowBalance</code>, <code>CanEarn</code> and <code>CanSpend</code>. But every card does all three, and nothing was ever faked. Now there are three names to keep in your head for one idea. Lesson 2, High cohesion, said that things which belong together should stay together. Lesson 4 asked what a thing costs the next reader.',
          '<b>A wide list can be honest.</b> If Maya only ever had card machines, one list with pay, refund and print a slip would be fine. Every part could do all of it. Wide is not the problem. Forced is.',
          '<b>Do not split on a guess.</b> Cut a list on the day you see a part faking a job, or a caller that ignores half the list. Not before. That is lesson 8, YAGNI.'
        ],
        warn: 'The goal is not one job per list. The goal is that <b>nobody signs for what they cannot do</b>, and nobody has to carry what they never use.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does interface segregation ask for?',
        options: ['One big list, so that every part looks the same', 'Small, focused lists, so no part must offer what it cannot do', 'Exactly one job in every list', 'No lists at all'],
        answer: 1,
        why: 'Small lists let each part sign only what is true, and let each caller ask only for what it needs.',
        hint: 'Think of the giant job advert, cut into small ones.'
      },
      {
        type: 'type', q: 'Every printer in the shop must offer the three jobs on line 1. One job in <code>LabelPrinter</code> is a fake. Type its name.',
        pic: code([
          '# the list: print_line(text), cut_paper(), open_drawer()',
          '',
          'class LabelPrinter:',
          '    def print_line(self, text):',
          '        label_roll.write(text)',
          '    def cut_paper(self):',
          '        label_roll.cut()',
          '    def open_drawer(self):',
          '        pass'
        ], { title: 'printers.py' }),
        prompt: 'the fake job >',
        answers: ['open_drawer', 'open_drawer()', 'open_drawer(self)'],
        why: 'A label printer has no cash drawer. The list forced it to offer <code>open_drawer</code>, so the job is only <code>pass</code>. It does nothing.',
        hint: 'Look for the job whose whole body is <code>pass</code>.'
      },
      {
        type: 'pick', q: 'A customer returns a $20 cake that was paid for with this gift voucher. What does the till show, and what does the customer get back?',
        pic: code([
          'class GiftVoucherPayment:',
          '    def refund(self, amount):',
          '        return True',
          '',
          'def refund_last_sale(payment, amount):',
          '    if payment.refund(amount):',
          '        display("Refunded $" + str(amount))',
          '    else:',
          '        display("Refund failed")'
        ], { title: 'the big list at work' }),
        options: ['"Refunded $20", and $20 comes back', '"Refunded $20", and nothing comes back', '"Refund failed", and nothing comes back', 'The till crashes'],
        answer: 1,
        why: 'The fake <code>refund</code> answers <code>True</code>, so line 7 runs. But line 3 never moved any money. The screen is wrong, and nothing crashed.',
        hint: 'What does line 3 hand back? Then follow line 6.'
      },
      {
        type: 'pick', q: 'The big list has 3 jobs, and 4 ways to pay sign it. Then Maya adds <code>tip(amount)</code>, which only the card can really do. How many faked boxes are there now?',
        pic: sheet(['pay(amount)', 'refund(amount)', 'print_slip()'], 'The sign-up sheet before tip is added. 12 boxes, 4 of them faked.', 'Before tip: 4 faked boxes.'),
        options: ['4', '5', '7', '16'],
        answer: 2,
        why: 'There were 4 fakes. Cash, phone and gift voucher cannot take a tip, so each one fakes one more box. 4 + 3 = 7.',
        hint: 'Start from 4. How many of the four ways to pay cannot take a tip?'
      },
      {
        type: 'fill', q: 'Finish the till so the refund button is only shown for parts that can refund.',
        text: 'def sale_buttons(payment):\n    if hasattr(payment, ___):\n        show_button("Refund last sale")',
        options: ['"refund"', '"pay"', '"print_slip"', 'GiftVoucherPayment'],
        answer: ['"refund"'],
        why: '<code>hasattr(payment, "refund")</code> asks what the part can do, not which kind it is. A gift voucher has no <code>refund</code>, so it gets no button.',
        hint: 'The button gives money back. Which job does that?'
      },
      {
        type: 'match', q: 'After the fix there are four small lists. Match each list to the code that needs it.',
        pairs: [
          ['pay(amount)', 'The checkout'],
          ['refund(amount)', 'The "Refund last sale" button'],
          ['print_slip()', 'The "Print card slip" button'],
          ['tip(amount)', 'The tip screen on the card machine']
        ],
        why: 'Each caller depends on one small list, and it is the one it really calls. A change to tips cannot reach the checkout.'
      },
      {
        type: 'pick', q: 'Back to earlier lessons. A gift voucher has a <code>refund</code> job that answers <code>True</code> and gives nothing back. Which lessons does that break?',
        options: ['Lesson 11, Least astonishment: the name makes a promise the code does not keep', 'Lesson 30, Liskov substitution: a stand-in breaks a promise the others keep', 'Lesson 10, Premature optimisation: it was made fast too early', 'Lesson 8, YAGNI: it was built for a future shop'],
        answer: [0, 1],
        why: 'A fake job lies about what it does (lesson 11), and it cannot stand in for a payment that really refunds (lesson 30). Small lists remove the reason to fake.',
        hint: 'Two of these are about promises.'
      },
      {
        type: 'bucket', q: 'Should this list be cut into smaller ones?',
        buckets: ['Cut it', 'Leave it whole'],
        items: [
          ['Two of the five classes fill a job with pass', 0],
          ['A caller uses 1 job of the 6 on the list', 0],
          ['One class answers "not supported" for half the list', 0],
          ['Every class does real work in every job', 1],
          ['balance, earn and spend: every card offers all three', 1],
          ['Nothing is faked yet, but one day something might be', 1]
        ],
        why: 'Cut when you can see a fake or an unused half. Jobs that always come together stay together (lesson 2), and a guess is not a reason (lesson 8).',
        hint: 'Look for a fake, or a caller that ignores most of the list. No fake and no ignored jobs means leave it.'
      }
    ]
  });
})();
