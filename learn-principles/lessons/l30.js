/* Lesson 30: Liskov substitution (module 3). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l30  Liskov substitution
     ===================================================================== */

  const tick = (x, y, ok) => `<circle cx="${x}" cy="${y}" r="12" fill="${ok ? P.ok : P.danger}" stroke="${P.ink}" stroke-width="2.5"/>` +
    (ok ? `<path d="M${x - 5} ${y} l4 4 l7 -8" fill="none" stroke="#fff" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>`
      : `<path d="M${x - 4.5} ${y - 4.5} l9 9 M${x + 4.5} ${y - 4.5} l-9 9" fill="none" stroke="#fff" stroke-width="2.8" stroke-linecap="round"/>`);

  /* ---- The idea: the substitute teacher ---- */
  const planRow = (x, y, s, ok) => box(x, y, 200, 34, P.white, 10) + T(x + 14, y + 22, s, { s: 13, a: 'start' }) + tick(x + 176, y + 17, ok);
  const ideaPic = svg(600, 300, 'Two substitute teachers. The first takes maths and reading as planned, so the school changes nothing. The second has the same badge but cannot take maths, so the school has to check who turned up.',
    T(150, 34, 'A REAL STAND-IN', { s: 12.5, f: P.ok }) + T(450, 34, 'ONLY LOOKS LIKE ONE', { s: 12.5, f: P.danger }) +
    `<line x1="300" y1="24" x2="300" y2="282" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    box(50, 52, 200, 50, P.okT, 12) + T(150, 74, 'substitute teacher', { s: 14, f: P.ok }) + T(150, 92, 'badge says: teacher', { s: 11.5, w: 700, f: P.ink2 }) +
    planRow(50, 122, '9:00  maths', true) + planRow(50, 166, '10:00  reading', true) +
    T(150, 232, 'The day runs as planned.', { s: 13 }) +
    T(150, 254, 'The school changes nothing', { s: 12.5, w: 700, f: P.ink2 }) + T(150, 272, 'and asks nothing.', { s: 12.5, w: 700, f: P.ink2 }) +
    box(350, 52, 200, 50, P.dangerT, 12) + T(450, 74, 'substitute teacher', { s: 14, f: P.danger }) + T(450, 92, 'badge says: teacher', { s: 11.5, w: 700, f: P.ink2 }) +
    planRow(350, 122, '9:00  maths', false) + planRow(350, 166, '10:00  reading', true) +
    T(450, 232, '"I do not do maths."', { s: 13 }) +
    T(450, 254, 'Now the school must check', { s: 12.5, w: 700, f: P.ink2 }) + T(450, 272, 'who turned up, every time.', { s: 12.5, w: 700, f: P.ink2 }));

  /* ---- The code: the promise and the checkout that relies on it ---- */
  const promiseLine = (y, n, s) => `<circle cx="64" cy="${y - 5}" r="12" fill="${P.accent}" stroke="${P.ink}" stroke-width="2.5"/>` + T(64, y, String(n), { s: 13, f: '#fff' }) + T(88, y, s, { s: 13.5, a: 'start' });
  const kinds = ['CardPayment', 'PhonePayment', 'CashPayment', 'VoucherPayment'];
  const promisePic = svg(600, 250, 'The promise that every payment makes about pay(amount): it takes any amount and never crashes, it answers True or False, and True means exactly that amount was taken while False means nothing was taken. Four kinds of payment keep it.',
    box(30, 16, 540, 150, P.warnT, 16) +
    T(52, 44, 'THE PROMISE OF', { s: 12.5, a: 'start', f: P.warn }) + T(180, 44, 'pay(amount)', { s: 14, a: 'start', m: true }) +
    promiseLine(76, 1, 'Takes any amount. Never crashes.') +
    promiseLine(108, 2, 'Answers True (paid) or False (not paid).') +
    promiseLine(140, 3, 'True: exactly that amount was taken. False: nothing was.') +
    kinds.map((k, i) => {
      const x = 30 + i * 138;
      return box(x, 190, 126, 38, P.white, 10) + T(x + 55, 214, k, { s: 10.5, m: true }) + tick(x + 114, 190, true);
    }).join(''));
  const checkoutCode = [
    'def checkout(order, payment):',
    '    total = order.total()',
    '    if payment.pay(total):',
    '        print_receipt(order)',
    '    else:',
    '        ask_for_another_payment()'
  ];
  const codePic = `<div style="width:100%">${promisePic}${code(checkoutCode, { title: 'shop.py', hi: [3] })}</div>`;

  /* ---- The pain: a fifth plug that only looks right ---- */
  const voucherBad = [
    'class GiftVoucherPayment:',
    '    _left = 20',
    '',
    '    def pay(self, amount):',
    '        if amount > self._left:',
    '            raise ValueError("voucher is too small")',
    '        self._left = 0',
    '        return True'
  ];
  const outRow = (y, who, call, result, note) =>
    box(24, y, 150, 54, P.tint, 12) + T(99, y + 23, who, { s: 13, f: P.accent }) + T(99, y + 42, call, { s: 12.5, m: true }) +
    arrow(182, y + 27, 214, y + 27, P.danger, 3) +
    box(222, y, 354, 54, P.dangerT, 12) + T(240, y + 23, result, { s: 13, a: 'start', f: P.danger }) + T(240, y + 42, note, { s: 12, w: 700, a: 'start', f: P.ink2 });
  const outcomePic = svg(600, 166, 'Ben pays 26 dollars with a 20 dollar gift voucher and the till stops with a ValueError. Ana pays 6 dollars with a 20 dollar gift voucher, gets True, and the voucher is left with 0 dollars, so 14 dollars are gone.',
    outRow(14, 'Ben, $26 cake', 'pay(26)', 'ValueError. The till stops.', 'promise 1 broken: it crashed') +
    outRow(88, 'Ana, $6 cookies', 'pay(6)', 'True. Voucher now holds $0.', 'promise 3 broken: $20 taken for a $6 bill'));
  const painPic = `<div style="width:100%">${code(voucherBad, { title: 'gift_voucher.py, a $20 gift voucher', bad: [6, 7] })}${outcomePic}</div>`;

  /* ---- The fix: not in checkout, in the stand-in ---- */
  const patchCode = [
    'def checkout(order, payment):',
    '    total = order.total()',
    '    if isinstance(payment, GiftVoucherPayment):',
    '        if total > payment.left():',
    '            ask_for_another_payment()',
    '            return',
    '    if payment.pay(total):',
    '        print_receipt(order)',
    '    else:',
    '        ask_for_another_payment()'
  ];
  const voucherGood = [
    'class GiftVoucherPayment:',
    '    _left = 20',
    '',
    '    def left(self):',
    '        return self._left',
    '',
    '    def pay(self, amount):',
    '        if amount > self._left:',
    '            return False',
    '        self._left = self._left - amount',
    '        return True'
  ];
  const fixPic = `<div style="width:100%">${code(patchCode, { title: 'shop.py, the tempting patch. Not this', bad: [3, 4, 5, 6] })}${code(voucherGood, { title: 'gift_voucher.py, the real fix', good: [9, 10] })}</div>`;

  /* ---- The test: the bench ---- */
  const benchRow = (y, name, marks, fill) =>
    box(24, y, 552, 34, fill || P.white, 10) + T(40, y + 22, name, { s: 12.5, a: 'start', m: true }) +
    marks.map((m, i) => tick(372 + i * 80, y + 17, m)).join('');
  const benchPic = svg(600, 330, 'A test bench. Every kind of payment is run through the same three checks. The four old kinds pass all three. The gift voucher before the fix fails check 1 and check 3. After the fix it passes all three.',
    T(40, 28, 'SAME THREE CHECKS FOR EVERY KIND', { s: 12.5, a: 'start', f: P.ink2 }) +
    T(372, 22, '1', { s: 13, f: P.accent }) + T(452, 22, '2', { s: 13, f: P.accent }) + T(532, 22, '3', { s: 13, f: P.accent }) +
    T(372, 40, 'no crash', { s: 11, w: 700, f: P.ink2 }) + T(452, 40, 'True/False', { s: 11, w: 700, f: P.ink2 }) + T(532, 40, 'exact amount', { s: 11, w: 700, f: P.ink2 }) +
    benchRow(52, 'CardPayment', [true, true, true]) +
    benchRow(94, 'PhonePayment', [true, true, true]) +
    benchRow(136, 'CashPayment', [true, true, true]) +
    benchRow(178, 'VoucherPayment', [true, true, true]) +
    benchRow(220, 'GiftVoucherPayment, before', [false, true, false], P.dangerT) +
    benchRow(262, 'GiftVoucherPayment, after', [true, true, true], P.okT) +
    T(300, 318, 'A stand-in passes every check the original passes.', { s: 13 }));

  /* ---- When not to ---- */
  const colRow = (x, y, s, fill, col) => box(x, y, 250, 32, fill, 10) + T(x + 125, y + 21, s, { s: 12.5, f: col });
  const limitPic = svg(600, 262, 'Two lists. What every payment must match: the three promises. What each payment is free to do its own way: how fast it is, how it does the job, extra jobs of its own, and what it shows the customer.',
    T(150, 30, 'MUST MATCH: THE PROMISE', { s: 12.5, f: P.ok }) + T(450, 30, 'FREE TO DIFFER', { s: 12.5, f: P.accent }) +
    `<line x1="300" y1="20" x2="300" y2="244" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    colRow(25, 48, 'takes any amount, no crash', P.okT, P.ok) +
    colRow(25, 90, 'answers True or False', P.okT, P.ok) +
    colRow(25, 132, 'exact amount, or nothing', P.okT, P.ok) +
    T(150, 196, 'Callers rely on these.', { s: 13 }) + T(150, 216, 'Break one and a caller breaks.', { s: 12.5, w: 700, f: P.ink2 }) +
    colRow(325, 48, 'how fast it is', P.tint, P.accent) +
    colRow(325, 90, 'how it does the job inside', P.tint, P.accent) +
    colRow(325, 132, 'extra jobs, like left()', P.tint, P.accent) +
    colRow(325, 174, 'what it shows the customer', P.tint, P.accent) +
    T(450, 238, 'No caller relies on these.', { s: 13 }));

  COURSE.add({
    id: 'l30', minutes: 9,
    summary: 'If code works with a thing, it must keep working, unchanged and unsurprised, when it is handed <b>any stand-in</b> for that thing. A stand-in may do more. It may never break a <b>promise</b> the original made. That is Liskov substitution, the L in SOLID.',
    video: {
      src: 'videos/l30-liskov-substitution.mp4', poster: 'videos/l30-liskov-substitution.jpg', length: '1 min 7 s',
      script: [
        "Maya's checkout has one socket for payments. Whatever plugs in makes 3 promises. Never crash. Answer yes or no. And take exactly the amount asked.",
        '4 payments already plug in, and each one keeps the promises.',
        'Then Maya adds a fifth. The gift voucher. Same shape, so it plugs straight in.',
        'Ben pays for a $26 cake with a $20 gift voucher. It does not answer no. It raises an error, and the till crashes.',
        'Ana buys $6 of cookies. It answers yes, and quietly takes all 20.',
        'Put every plug on a test bench. Same 3 checks. The gift voucher fails 2.',
        'So Maya fixes the plug, not the checkout. Not enough? Answer no. Enough? Take exactly 6, and leave 14.',
        'Now all 5 pass. The checkout never has to ask which one it got.',
        'That is Liskov substitution. A stand-in must keep every promise of the thing it replaces.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'A stand-in must be able to take the class.',
        text: [
          'A teacher is ill, so the school sends a substitute. The timetable says maths at 9:00 and reading at 10:00. A real substitute <b>takes the class as planned</b>. The school changes nothing and asks nothing.',
          'Now picture a substitute with the same badge who says: "I do not do maths." The badge fits. The <b>behaviour</b> does not. From now on the school has to check who turned up before it can trust the timetable.',
          'Code has stand-ins too. Lesson 28, Program to an interface, let the checkout work with any kind of payment. <b>Liskov substitution</b> is the rule that makes that safe: if code works with a thing, it must <b>keep working, unchanged</b>, when it is handed any stand-in for that thing.',
          'A stand-in may do <b>more</b> than the original. It must never <b>break a promise</b> the original made.'
        ],
        tip: 'The principle is named after <b>Barbara Liskov</b>, a computer scientist who described it in 1987. It later became the L in SOLID. You met the S in lesson 16 and the O in lesson 29.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'A promise is more than a name.',
        text: [
          'In lesson 28 every kind of payment offered the same job, <code>pay(amount)</code>, and the checkout called only that. Line 3 is the call. If the answer is <code>True</code>, line 4 prints the receipt. <code>else</code> means "otherwise", as in lesson 21. So on <code>False</code>, line 6 asks the customer for another way to pay.',
          'Look at what the checkout <b>relies on</b>. It hands over any total. It expects an answer of <code>True</code> or <code>False</code>. And it trusts that <code>True</code> means the customer paid exactly that total, and <code>False</code> means nothing was taken.',
          'None of that is written in the name <code>pay</code>. It is a <b>promise</b> about behaviour, shown on the card above the code. The four kinds of payment all keep it. That is why the checkout never has to ask which kind it was handed.',
          'Notice what the checkout does <b>not</b> have. There is no line for "what if <code>pay</code> crashes?" No payment has ever done that.'
        ],
        tip: 'Matching the name <code>pay(amount)</code> is like a plug with the right prongs. It fits the socket. The promise is about what happens when the current flows.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Same shape. Different behaviour.',
        text: [
          'Maya starts selling <b>gift vouchers</b> loaded with $20. She writes a fifth kind of payment. It has a job called <code>pay(amount)</code>, so it plugs straight into the checkout. Not one line of <code>shop.py</code> changes, just as lesson 29, Open/closed, wanted.',
          '<code>_left</code> is the money still on the voucher. The underscore marks it as private, as in lesson 19. Tax is left out to keep the sums easy.',
          '<b>Ben</b> buys a $26 birthday cake and hands over his voucher. Line 5 asks: is 26 more than 20? Yes. So line 6 runs. In lesson 22, <code>raise</code> meant "stop right here and report this problem". The checkout has no line for that. <b>The till program stops</b>, with a queue at the counter.',
          '<b>Ana</b> buys $6 of cookies with her voucher. 6 is not more than 20, so line 7 runs. It sets the voucher to 0 and answers <code>True</code>. The receipt prints. Nothing looks wrong. But <b>$20 was taken for a $6 bill</b>. Ana finds out next week that her last $14 is gone.'
        ],
        warn: 'Maya thought of lesson 22, Fail fast, when she wrote <code>raise</code>. But that lesson kept <code>raise</code> for mistakes in the program. A voucher that is too small is a normal day in a shop, like a card that is declined. And the promise already says what to do on such a day: answer <code>False</code>.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Fix the stand-in, not everyone who uses it.',
        text: [
          'Maya\'s first idea is a patch in the checkout. Line 3 has a new word. <code>isinstance(payment, GiftVoucherPayment)</code> asks <b>what exact kind of thing this is</b>: "is this payment a gift voucher?" If it is, lines 4 to 6 check the voucher by hand first. (<code>return</code> with nothing after it just leaves the job, as in lesson 21.)',
          'It stops the crash, and it is the wrong fix. The checkout was <b>closed</b> in lesson 29. Now it has been opened again to make room for one kind. Every other job that takes a payment needs the same special case. The next odd kind adds another one. And Ana still loses her $14.',
          'The real fix is inside the voucher. Look at line 9 of the second file. When the voucher cannot cover the amount, it answers <b><code>False</code></b> and takes nothing, like every other payment. Line 10 takes <b>exactly the amount</b> and keeps the rest.',
          'Try Ben again. 26 is more than 20, so the answer is <code>False</code>. The checkout already knows what to do: line 6 of <code>shop.py</code> asks for another way to pay. Try Ana. 20 minus 6 leaves <b>$14</b> on her voucher, and the answer is <code>True</code>.',
          'The checkout goes back to its six lines from before. It was never the problem.'
        ],
        tip: 'The fixed voucher also has a job of its own, <code>left()</code>, so a screen can show what is still on it. That is fine. A stand-in may do <b>more</b>. Card payments do not need a <code>left()</code>, and the checkout never calls it.',
        warn: 'What if a kind truly <b>cannot</b> do something on the list? Suppose every payment must also offer <code>refund(amount)</code>, and gift vouchers cannot be refunded. A <code>refund</code> that does nothing and answers <code>True</code> is the same broken promise. The honest answer is to not claim that ability at all. How to do that is the next lesson, Interface segregation.'
      },
      {
        label: 'The test', pic: benchPic,
        h: 'Could anyone tell which one they got?',
        text: [
          'Before you let one thing stand in for another, ask: <b>"Could I swap this in everywhere the original is used, without anyone having to check which one they got?"</b>',
          'Put it on a bench, like the picture. Run every kind through the same checks. The first gift voucher fails check 1, because it crashed, and check 3, because it took $20 for $6. After the fix it passes all three.',
          'Three signs in code that a stand-in is failing. A caller that asks <b>which kind</b> it was handed, like <code>isinstance</code>. A job that only says <b>"I do not do that"</b>, with a <code>raise</code>. And a job that <b>does nothing</b> and reports that it worked.',
          'This is also the test lesson 27, Composition over inheritance, promised. There, <code>class Cake(Item):</code> said a cake is a <b>kind of</b> item. That is only true if a cake can go <b>everywhere</b> an item goes. Suppose every <code>Item</code> has <code>price()</code>, which hands back a number, and a child class hands back the text <code>"ask at the counter"</code>. The basket that adds up prices now breaks. Same name, different kind of answer. It is not a true child.'
        ],
        tip: 'Lesson 11, Least astonishment, said a name is a promise. This lesson makes the same demand of every thing that <b>shares</b> that name. Five kinds of <code>pay</code> means the promise has to hold five times.'
      },
      {
        label: 'When not to', pic: limitPic,
        h: 'Keep the promise. The rest is yours.',
        text: [
          '<b>It does not mean "behave identically".</b> Stand-ins are meant to differ. That is the whole point of having more than one. Cash opens the drawer. A phone payment takes two seconds longer. A voucher has <code>left()</code>. No caller relies on any of that.',
          'Suppose Maya loves this lesson and demands that every payment must take the same time and show the same words on the screen as a card does. Now cash cannot plug in at all, and nothing got safer. She has turned <b>how one kind happens to work</b> into a promise nobody needed. Lesson 18, Abstraction, said the how is the part you hide.',
          '<b>It is not a reason to build family trees.</b> The principle tells you when a child class is honest. It does not tell you to make one. If a thing keeps failing the test as a "kind of" something, stop pretending. Give it the piece it wanted to borrow as a <b>part</b>, as in lesson 27.',
          '<b>A promise nobody wrote down is easy to break.</b> Maya was not careless. The three promises lived only in her head. Writing them down, or better, testing them, is how they get kept.'
        ],
        warn: 'Promises between a job and its callers get a whole lesson: lesson 40, Design by contract.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'Maya adds a coupon as one more kind of payment. A customer owes <b>$12</b>, so the checkout runs <code>payment.pay(12)</code>. What happens?',
        pic: code([
          'class CouponPayment:',
          '    def pay(self, amount):',
          '        if amount > 5:',
          '            raise ValueError("coupon covers $5")',
          '        return True'
        ], { title: 'coupon.py' }),
        options: [
          'It hands back False and the checkout asks for another payment',
          'The program stops with an error',
          'It hands back True and takes $5',
          'It hands back True and takes $12'
        ],
        answer: 1,
        why: '12 is more than 5, so line 4 runs, and <code>raise</code> stops the program. Every other payment would have answered <code>False</code>. The coupon has the right name and the wrong behaviour.',
        hint: 'Is 12 more than 5? Then which line runs, and what did <code>raise</code> mean in lesson 22?'
      },
      {
        type: 'type', q: 'This is the <b>fixed</b> voucher, holding <b>$20</b>. One checkout runs <code>pay(6)</code>. Later another runs <code>pay(15)</code>. How many dollars does the voucher hold now? Type the number.',
        pic: code(voucherGood, { title: 'gift_voucher.py', hi: [8, 9, 10] }),
        prompt: 'dollars >',
        answers: ['14', '$14', 'fourteen'],
        why: '<code>pay(6)</code> leaves 20 - 6 = 14. Then 15 is more than 14, so <code>pay(15)</code> answers <code>False</code> and takes nothing. The voucher still holds $14.',
        hint: 'After the first payment the voucher holds 14. Is 15 more than 14? Then which line runs?'
      },
      {
        type: 'fill', q: 'Rebuild the fix so the voucher keeps the promise.',
        text: 'def pay(self, amount):\n    if amount > self._left:\n        return ___\n    self._left = self._left - ___\n    return ___',
        options: ['False', 'amount', 'True', '0', '20'],
        answer: ['False', 'amount', 'True'],
        why: 'Cannot cover it? Answer <code>False</code> and take nothing. Can cover it? Take exactly the amount and answer <code>True</code>.',
        hint: 'The first blank is the answer for "not paid". The second is how much to take off the voucher.'
      },
      {
        type: 'pick', q: 'One line in this job tells you that some kind of payment is <b>not</b> a true stand-in. Which line?',
        pic: code([
          'def refund_order(order, payment):',
          '    amount = order.total()',
          '    if isinstance(payment, CashPayment):',
          '        open_drawer_and_count(amount)',
          '    else:',
          '        payment.refund(amount)',
          '    print_refund_slip(order)'
        ], { title: 'refunds.py' }),
        options: ['Line 2', 'Line 3', 'Line 6', 'Line 7'],
        answer: 1,
        why: 'Line 3 asks what exact kind of payment it was handed. A caller only does that when one kind cannot be trusted to behave like the rest. The cure belongs inside <code>CashPayment</code>, not here.',
        hint: 'Look for the caller checking <b>which kind</b> it got.'
      },
      {
        type: 'bucket', q: 'A new kind of payment is different from a card payment in these ways. Which ones break the promise?',
        buckets: ['Breaks the promise', 'Allowed difference'],
        items: [
          ['Raises an error when the amount is too big', 0],
          ['Hands back the text "OK" where the others hand back True', 0],
          ['Takes the whole $20 for a $6 bill', 0],
          ['refund() does nothing and hands back True', 0],
          ['Takes two seconds longer', 1],
          ['Has an extra job, left()', 1],
          ['Works out the answer in a different way inside', 1]
        ],
        why: 'Callers rely on the promise: no crash, a True or False answer, and the exact amount. Speed, the inside, and extra jobs are the stand-in\'s own business.',
        hint: 'For each one, ask: would the checkout have to know which kind it got?'
      },
      {
        type: 'pick', q: 'Every <code>Item</code> has <code>price()</code>, which hands back a number. Maya adds a child class. The basket holds a cookie at $3 and a mystery box. What happens on line 9?',
        pic: code([
          'class MysteryBox(Item):',
          '    def price(self):',
          '        return "ask at the counter"',
          '',
          'def basket_total(items):',
          '    total = 0',
          '    for item in items:',
          '        # a number + a number',
          '        total = total + item.price()',
          '    return total'
        ], { title: 'basket.py' }),
        options: [
          'The total is $3, the box counts as free',
          'The program stops, because a number cannot be added to text',
          'The total is "ask at the counter"',
          'Nothing. A child class can always stand in for its parent'
        ],
        answer: 1,
        why: 'The basket trusted every item to hand back a number. <code>MysteryBox</code> has the right name, <code>price</code>, and hands back a different kind of answer. Writing <code>(Item)</code> does not make it a true kind of item. Passing the test does.',
        hint: 'What does line 9 try to add to the number in <code>total</code>?'
      },
      {
        type: 'pick', q: 'Back to lesson 22, Fail fast. Maya used <code>raise</code> when the voucher was too small. Why was <code>return False</code> right here?',
        options: [
          'Because raise should never be used',
          'Because a voucher that is too small is a normal day in the shop, not a mistake in the program, and the promise says to answer False',
          'Because False is faster than raise',
          'Because the checkout cannot read error messages'
        ],
        answer: 1,
        why: 'Lesson 22 kept <code>raise</code> for mistakes, like -3 cakes. It said to stay calm about things that go wrong on a normal day. A payment that cannot cover the bill is one of those, and every other payment answers it with <code>False</code>.',
        hint: 'Think of a declined card. Is that a bug in the program?'
      },
      {
        type: 'match', q: 'Four lessons that work together. Match each one to its idea.',
        pairs: [
          ['Composition over inheritance (lesson 27)', 'Build from parts, not family trees'],
          ['Program to an interface (lesson 28)', 'Depend on what, not who'],
          ['Open/closed (lesson 29)', 'Add without editing'],
          ['Liskov substitution', 'A stand-in must behave']
        ],
        why: 'Lessons 28 and 29 let you plug in new kinds without touching the code that uses them. That is only safe if every new kind keeps the promises of the socket. This lesson is the safety rule.',
        hint: 'Which one is about a new part keeping the promises of the old ones?'
      }
    ]
  });
})();
