/* Lesson 28: Program to an interface (module 3). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l28  Program to an interface
     ===================================================================== */
  const BLUE = '#1D6FA5', BLUET = '#DCEEFA';

  // A plug seen from the side: two prongs on the left, a coloured body with a label.
  const plug = (x, y, fill, label, o) => {
    o = o || {};
    const w = o.w || 120, h = o.h || 46, ph = h > 30 ? 8 : 5;
    const p1 = y + Math.round(h * 0.26) - ph / 2, p2 = y + Math.round(h * 0.74) - ph / 2;
    return `<rect x="${x - 24}" y="${p1}" width="28" height="${ph}" rx="2.5" fill="${P.ink}"/><rect x="${x - 24}" y="${p2}" width="28" height="${ph}" rx="2.5" fill="${P.ink}"/>` +
      `<rect x="${x + 3}" y="${y + 4}" width="${w}" height="${h}" rx="${h > 30 ? 12 : 8}" fill="${P.ink}"/>` +
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h > 30 ? 12 : 8}" fill="${fill}" stroke="${P.ink}" stroke-width="2.5"/>` +
      T(x + w / 2, y + h / 2 + (o.s || 13) * 0.36, label, { s: o.s || 13 });
  };
  // A socket seen from the side: a block with two slots cut into its right face.
  const socket = (x, y, fill) => {
    const d = (dx, dy) => `M${x + dx} ${y + dy} h54 v11 h-30 v12 h30 v8 h-30 v12 h30 v11 h-54z`;
    return `<path d="${d(4, 5)}" fill="${P.ink}"/><path d="${d(0, 0)}" fill="${fill || P.white}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>`;
  };

  const socketPic = svg(600, 300, 'One wall socket on the left. A lamp, a kettle and a phone charger on the right, each with the same two-prong plug.',
    T(300, 32, 'ONE AGREED SHAPE, MANY THINGS THAT FIT', { s: 12.5, f: P.accent }) +
    box(40, 70, 150, 170, P.sand, 14) + T(115, 96, 'the wall', { s: 13, w: 700, f: P.ink2 }) +
    socket(136, 126, P.white) +
    T(115, 222, 'two slots', { s: 12.5, w: 700, f: P.ink2 }) +
    `<path d="M214 155 H292" stroke="${P.ink}" stroke-width="3" stroke-dasharray="6 7" stroke-linecap="round"/>` +
    plug(330, 70, P.warnT, 'lamp') + plug(330, 132, P.tint, 'kettle') + plug(330, 194, P.okT, 'phone charger', { w: 150 }) +
    T(300, 276, 'the wall never asks what is on the other end', { s: 13, w: 700, f: P.ink2 }));

  const beforeCode = [
    '# checkout.py',
    'def checkout(total):',
    '    swipe_machine.connect()',
    '    swipe_machine.send_cents(to_cents(total))',
    '    if swipe_machine.last_code == 7:',
    '        print_receipt(total)'
  ];

  const grownCode = [
    'def checkout(total, method):',
    '    if method == "card":',
    '        swipe_machine.connect()',
    '        swipe_machine.send_cents(to_cents(total))',
    '        result = swipe_machine.last_code',
    '    elif method == "phone":',
    '        tap_pad.wake()',
    '        result = tap_pad.request(total)',
    '    elif method == "cash":',
    '        result = cash_drawer.take(total)',
    '    elif method == "voucher":',
    '        result = voucher_book.use(total)',
    '    if result == "OK" or result == True:',
    '        print_receipt(total)'
  ];

  const painPic = `<div style="width:100%">${code(grownCode, { title: 'checkout.py, four ways to pay', hi: [5, 8, 10, 12], bad: [13] })}` +
    svg(600, 132, 'The card machine says approved, 10 dollars 90, code 7. The checkout prints no receipt.',
      box(30, 20, 220, 76, '#15132B', 14) + T(140, 52, 'APPROVED $10.90', { s: 15, m: true, f: '#ECEAFF' }) + T(140, 78, 'code 7', { s: 13, m: true, f: '#FFC24B' }) +
      T(140, 122, 'the card machine took the money', { s: 12.5, w: 700, f: P.ink2 }) +
      `<circle cx="300" cy="58" r="26" fill="${P.dangerT}" stroke="${P.ink}" stroke-width="2.5"/>` + T(300, 69, '≠', { s: 30, f: P.danger }) +
      box(350, 20, 220, 76, P.dangerT, 14) + T(460, 54, 'no receipt', { s: 16, f: P.danger }) + T(460, 78, '7 is not "OK" or True', { s: 12.5, m: true, f: P.ink }) +
      T(460, 122, 'checkout thinks nobody paid', { s: 12.5, w: 700, f: P.ink2 })) + `</div>`;

  const partsCode = [
    '# payments.py',
    'class CardPayment:',
    '    def pay(self, amount):',
    '        swipe_machine.connect()',
    '        swipe_machine.send_cents(to_cents(amount))',
    '        return swipe_machine.last_code == 7',
    '',
    'class PhonePayment:',
    '    def pay(self, amount):',
    '        tap_pad.wake()',
    '        return tap_pad.request(amount) == "OK"',
    '',
    '# CashPayment and VoucherPayment: the same shape'
  ];
  const checkoutCode = [
    '# checkout.py',
    'def checkout(total, payment):',
    '    if payment.pay(total):',
    '        print_receipt(total)',
    '',
    '# at the till',
    'checkout(10.90, CardPayment())',
    'checkout(10.90, PhonePayment())'
  ];
  const fixPic = `<div style="width:100%">${code(partsCode, { title: 'payments.py', good: [3, 9] })}${code(checkoutCode, { title: 'checkout.py, fixed', good: [3] })}</div>`;

  const newPlugs = [
    '# payments.py, two new classes',
    'class StoreCreditPayment:',
    '    def pay(self, amount):',
    '        return credit_book.use(amount)',
    '',
    'class FakePayment:',
    '    def pay(self, amount):',
    '        return True',
    '',
    'checkout(10.90, StoreCreditPayment())',
    'checkout(10.90, FakePayment())'
  ];
  const testPic = `<div style="width:100%">` +
    svg(600, 250, 'On the left, checkout is wired to one named card machine and knows its code 7. On the right, checkout has a socket labelled pay(amount) and five different plugs fit it.',
      T(150, 30, 'KNOWS WHO', { s: 12.5, f: P.danger }) + T(450, 30, 'KNOWS WHAT', { s: 12.5, f: P.ok }) +
      `<line x1="300" y1="20" x2="300" y2="236" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
      /* left: welded */
      box(20, 62, 108, 60, P.white, 12) + T(74, 97, 'checkout', { s: 13 }) +
      `<path d="M132 76 C170 60 150 120 196 86" fill="none" stroke="${P.danger}" stroke-width="3" stroke-linecap="round"/>` +
      `<path d="M132 92 C176 132 158 66 196 100" fill="none" stroke="${P.ink}" stroke-width="3" stroke-linecap="round"/>` +
      `<path d="M132 108 C160 84 176 136 196 114" fill="none" stroke="${P.danger}" stroke-width="3" stroke-linecap="round"/>` +
      box(196, 62, 84, 60, P.dangerT, 12) + T(238, 90, 'swipe', { s: 12.5 }) + T(238, 107, 'machine', { s: 12.5 }) +
      T(150, 160, 'swipe_machine.last_code == 7', { s: 12.5, m: true }) +
      T(150, 196, 'names one machine', { s: 13, w: 700, f: P.ink2 }) + T(150, 216, 'and knows its code', { s: 13, w: 700, f: P.ink2 }) +
      /* right: socket and plugs */
      box(318, 62, 96, 60, P.white, 12) + T(366, 97, 'checkout', { s: 13 }) +
      socket(414, 60, P.tint) +
      ['card', 'phone', 'cash', 'voucher', 'credit'].map((s, i) => plug(512, 40 + i * 31, [P.tint, P.okT, P.warnT, BLUET, P.sand][i], s, { w: 72, h: 24, s: 11.5 })).join('') +
      T(450, 216, 'payment.pay(total)', { s: 12.5, m: true }) +
      T(450, 236, 'anything with pay(amount) fits', { s: 13, w: 700, f: P.ink2 })) +
    code(newPlugs, { title: 'payments.py, later', good: [3, 7] }) + `</div>`;

  const ceremony = [
    '# one way to greet. Nobody has asked for a second.',
    'class EnglishGreeting:',
    '    def greet(self):',
    '        return "Thank you!"',
    '',
    'def say_thanks(greeting):',
    '    display(greeting.greet())',
    '',
    'say_thanks(EnglishGreeting())'
  ];
  const plainThanks = [
    'def say_thanks():',
    '    display("Thank you!")'
  ];
  const wide = [
    '# the list: pay, refund, print_slip, email_receipt',
    'class CashPayment:',
    '    def pay(self, amount):',
    '        return cash_drawer.take(amount) == "OK"',
    '    def refund(self, amount):',
    '        return cash_drawer.give(amount) == "OK"',
    '    def print_slip(self):',
    '        print_line("Paid in cash")',
    '    def email_receipt(self, address):',
    '        return False  # cash has no email'
  ];
  const whenNotPic = `<div style="width:100%">${code(ceremony, { title: 'one part, dressed up as a socket', bad: [2, 6, 9] })}${code(plainThanks, { title: 'the same job, plain', good: [2] })}${code(wide, { title: 'a list that is too wide', bad: [9, 10] })}</div>`;

  COURSE.add({
    id: 'l28', minutes: 8,
    summary: 'An <b>interface</b> is the short list of things you can ask a part to do. <b>Program to an interface</b> means your code depends on that list and not on one particular part that offers it. Then any part with the same list can be plugged in.',
    video: {
      src: 'videos/l28-program-to-an-interface.mp4', poster: 'videos/l28-program-to-an-interface.jpg', length: '1 min 4 s',
      script: [
        "Maya's checkout takes payment with one card machine. And the code knows that machine well. Connect. Send cents. Check for code 7.",
        'Then customers want to pay by phone. And cash. And vouchers. Each one gets wired into checkout, with its own quirks. The function nearly triples. And a change for vouchers breaks cards.',
        'The fix. Checkout decides what it needs. One thing. Pay this amount, and answer yes or no. That short list is called an interface.',
        'Now every way to pay becomes a plug with that shape. Card. Phone. Cash. Voucher. Each hides its own quirks inside. Checkout shrinks to one question. Plug in any of them, and it never asks who is answering.',
        'Later, store credit arrives. A new plug. It simply fits. Checkout does not change.',
        'That is programming to an interface. Depend on what, not who.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: socketPic,
        h: 'The wall does not know your lamp.',
        text: [
          'In lesson 3, Loose coupling, a lamp and a wall agreed on one small thing: <b>the shape of the plug</b>. That lesson promised the idea would get a proper name later. Here it is.',
          'An <b>interface</b> is the list of things you can ask a part to do. It is the part\'s <b>buttons, not its insides</b>. A wall socket\'s interface is two slots. A car\'s is a wheel and two pedals, as in lesson 18, Abstraction.',
          'The wall was built for <b>the shape</b>, not for your lamp. So a lamp fits. So does a kettle. So does a phone charger that was invented long after the wall was built.',
          '<b>Program to an interface</b> means: write your code against that short agreed list, and never against one particular part that happens to offer it.'
        ],
        tip: 'The full saying is "program to an interface, not an implementation". It comes from the 1994 book <b>Design Patterns</b>, the same "Gang of Four" book quoted in lesson 27, Composition over inheritance. An <b>implementation</b> is one real part that does the work, like one brand of card machine.'
      },
      {
        label: 'The code', pic: code(beforeCode, { title: 'checkout.py', hi: [3, 4, 5] }),
        h: 'A checkout that knows one machine.',
        text: [
          'Maya takes payment with one card machine. Its maker calls it the swipe machine, and it has its own habits.',
          'Line 3 has to connect to it first. Line 4 sends the amount, but this machine counts in <b>cents</b>. So <code>to_cents(total)</code> turns $10.90 into 1090.',
          'Line 5 reads the machine\'s answer. This brand says "approved" with the number <b>7</b>. You met <code>==</code> in lesson 5: it asks "are these the same?". So line 5 asks: was the last code 7? If yes, line 6 prints the receipt.',
          'Count the lines that name <code>swipe_machine</code>. <b>Three of its four steps.</b> The checkout does not only know <b>what</b> it wants, which is to be paid. It knows <b>who</b> it is talking to, down to that brand\'s secret number.'
        ],
        tip: 'Lesson 3 would call this tight coupling. Lesson 25, Law of Demeter, would point at <code>swipe_machine.last_code</code>: the checkout is reading another part\'s insides.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Four ways to pay, one tangled job.',
        text: [
          'Customers start asking to pay by tapping a phone. Maya also wants to take cash properly, and gift vouchers. Each new way to pay means <b>reopening checkout</b>.',
          'One new word: <code>elif</code> is short for "else if". Python tries the questions from the top and runs the first one whose answer is yes. So lines 2 to 12 read: if it is a card, do this. Or else if it is a phone, do that. And so on.',
          'Every part answers in <b>its own way</b>. The card machine says <code>7</code>. The tap pad and the cash drawer say <code>"OK"</code>. The voucher book says <code>True</code>. Line 13 has to know all of them. (<code>or</code> means either one is enough.)',
          'Before vouchers, line 13 read <code>if result == 7 or result == "OK":</code>. To add vouchers, Maya retyped it, and <b>the 7 fell out</b>. Now a card customer is charged $10.90, the machine answers 7, and line 13 says no. <b>No receipt.</b>',
          'Nothing crashed. The function grew from 5 lines to 14, and a change for vouchers <b>broke cards</b>.'
        ],
        warn: 'Maya is not careless. Four parts with four sets of habits were all written into one job. Every new way to pay means editing lines that sit right next to the old ones.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Decide the socket. Make every part a plug.',
        text: [
          'Maya stops asking "which machine?" and asks "<b>what does checkout need?</b>". One thing: <code>pay(amount)</code>, which answers <code>True</code> or <code>False</code>. That one-line list is the <b>interface</b>.',
          'Each way to pay becomes a small class that offers it. You met <code>class</code> and <code>self</code> in lesson 19, Encapsulation. The card\'s habits now live <b>inside</b> <code>CardPayment</code>. Line 6 asks "was the code 7?" and hands back the answer, <code>True</code> or <code>False</code>. The outside never sees a 7 again.',
          '<code>PhonePayment</code> does the same with its own habits. So do <code>CashPayment</code> and <code>VoucherPayment</code>. Four different insides, <b>one shape outside</b>.',
          'Now read <code>checkout.py</code>. It is handed a <code>payment</code> and asks it one question on line 3. It <b>tells</b> the part to pay, as in lesson 26, Tell, don\'t ask. It does not know which class it got. It does not need to.',
          'Lines 7 and 8 show the till making a part, as <code>LoyaltyCard()</code> did in lesson 19, and handing it in. Here the checkout simply receives <code>payment</code> as an argument. The full idea of handing a part what it needs is lesson 33, Dependency injection.'
        ],
        tip: 'Notice that nothing in the code <b>declares</b> the interface. In Python, any object that has a <code>pay(amount)</code> job will do. People call this <b>duck typing</b>: if it quacks like a duck, treat it as a duck. Many languages, such as Java and C#, have a formal <code>interface</code> keyword that makes the list official.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Which part, or only what?',
        text: [
          'Point at a piece of code and ask: <b>"Does this code know which part it is talking to, or only what it can ask for?"</b>',
          'Try the old checkout. It names <code>swipe_machine</code> and checks for a 7. It knows <b>which</b>. Try the new one. It says <code>payment.pay(total)</code>. It knows only <b>what</b>.',
          'A second check: <b>plug in a part that did not exist when the code was written.</b> A month later Maya adds store credit. That is one new class with a <code>pay</code> job. <code>checkout.py</code> is not opened, so nothing in it can break.',
          'There is a bonus. <code>FakePayment</code> always says yes and charges nobody. Maya can try the whole checkout, receipt and all, without touching a real card.'
        ],
        tip: 'Adding a fifth way to pay without editing the checkout has a name of its own: the next lesson, Open/closed. And a plug has to <b>behave</b> as promised, not only fit the slots. That is lesson 30, Liskov substitution.'
      },
      {
        label: 'When not to', pic: whenNotPic,
        h: 'One plug does not need a socket.',
        text: [
          '<b>One part, and no second in sight.</b> Maya\'s shop says "Thank you!" in one way. Wrapping that in a class and handing it in, as in the first picture, is ceremony. The plain version says the same in two lines. Lesson 8, YAGNI, said to wait until the need is real.',
          '<b>Do not design the list too early.</b> Suppose Maya had written the interface when she only had the card machine. She might have chosen <code>pay(card_number, amount)</code>. Cash has no card number. An interface drawn from one case usually has the wrong shape. Wait until you have seen two or three real ones. That is lesson 9, Rule of three.',
          '<b>Do not make the list too wide.</b> Look at the last picture. If the interface says pay, refund, print a slip and email a receipt, then <b>every</b> way to pay must offer all four. Cash cannot email anyone. A short list is easy to fit. Keeping lists small has its own lesson: lesson 31, Interface segregation.'
        ],
        warn: 'Ask lesson 4\'s question: <b>"Is this problem real right now?"</b> Maya had four real ways to pay and a real bug. That is when a socket earns its place.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What is an interface?',
        options: ['The insides of one particular part', 'The list of things you can ask a part to do', 'A faster way to run a function', 'A class with many jobs in it'],
        answer: 1,
        why: 'It is the buttons, not the insides. For Maya\'s payments the whole list is one item: <code>pay(amount)</code>.',
        hint: 'Think of the wall socket. What do the wall and the lamp agree on?'
      },
      {
        type: 'pick', q: 'Maya wants to try a bike courier. Which job has to be rewritten?',
        pic: code([
          'def send_order(order, courier):',
          '    courier.deliver(order)',
          '',
          'def send_cake(cake):',
          '    speedy_van.open_bay_2()',
          '    speedy_van.load(cake)',
          '    if speedy_van.dash_light == "green":',
          '        speedy_van.go()'
        ], { title: 'delivery.py' }),
        options: ['send_order', 'send_cake', 'Both of them', 'Neither of them'],
        answer: 1,
        why: '<code>send_cake</code> names one van and knows its bay and its dashboard light. <code>send_order</code> only knows what it can ask for: <code>deliver(order)</code>. Any courier with that job fits.',
        hint: 'Which job knows WHO it is talking to?'
      },
      {
        type: 'fill', q: 'Finish the store credit plug, and the one line in checkout that uses it.',
        text: 'class StoreCreditPayment:\n    def ___(self, amount):\n        return credit_book.use(amount)\n\ndef checkout(total, payment):\n    if payment.___(total):\n        print_receipt(total)',
        options: ['pay', 'pay', 'send_cents', 'last_code'],
        answer: ['pay', 'pay'],
        why: 'The class offers <code>pay</code> and the checkout asks for <code>pay</code>. The matching name is the whole agreement.',
        hint: 'Both blanks take the same name. It is the one item on the interface.'
      },
      {
        type: 'pick', q: 'Which class can <code>checkout</code> NOT use?',
        pic: code([
          'class CoinJar:',
          '    def pay(self, amount):',
          '        return jar.take(amount) == "OK"',
          '',
          'class BankTransfer:',
          '    def send_money(self, amount):',
          '        return bank.move(amount)',
          '',
          'class FakePayment:',
          '    def pay(self, amount):',
          '        return True'
        ], { title: 'payments.py' }),
        options: ['CoinJar', 'BankTransfer', 'FakePayment', 'It can use all three'],
        answer: 1,
        why: 'The checkout calls <code>payment.pay(total)</code>. <code>BankTransfer</code> has no <code>pay</code> job, so Python stops with an <code>AttributeError</code>, the error from lesson 25. Rename <code>send_money</code> to <code>pay</code> and it fits.',
        hint: 'The checkout only ever asks for one job by name. Which class does not have it?'
      },
      {
        type: 'bucket', q: 'Does the line know WHO it is talking to, or only WHAT it can ask for?',
        buckets: ['Knows who', 'Knows what'],
        items: [
          ['if swipe_machine.last_code == 7:', 0],
          ['tap_pad.wake()', 0],
          ['if method == "voucher":', 0],
          ['if payment.pay(total):', 1],
          ['courier.deliver(order)', 1],
          ['print_line(text)', 1]
        ],
        why: 'A named brand, a brand\'s secret code, or a question about which kind it is: all of those know who. A plain request that many parts could answer knows only what.'
      },
      {
        type: 'pick', q: 'Maya runs <code>checkout(10.90, FakePayment())</code>. What happens?',
        pic: code([
          'class FakePayment:',
          '    def pay(self, amount):',
          '        return True',
          '',
          'def checkout(total, payment):',
          '    if payment.pay(total):',
          '        print_receipt(total)'
        ], { title: 'trying it out' }),
        options: ['A real card is charged $10.90', 'The receipt prints and nobody is charged', 'Python stops with an error', 'Nothing at all happens'],
        answer: 1,
        why: '<code>FakePayment</code> offers <code>pay</code>, so it fits. It always answers <code>True</code>, so the receipt prints. No machine is touched. That is how Maya can try the whole checkout safely.',
        hint: 'Follow line 6. What does <code>pay</code> hand back here?'
      },
      {
        type: 'match', q: 'Bring back earlier lessons. Match each idea to its test question.',
        pairs: [
          ['Loose coupling (lesson 3)', 'If this part is swapped, how many other parts must change?'],
          ['Abstraction (lesson 18)', 'Can I use this knowing only what it does, not how?'],
          ['Encapsulation (lesson 19)', 'Can outside code put this data into a state that makes no sense?'],
          ['Program to an interface', 'Does this code know which part it is talking to, or only what it can ask for?']
        ],
        why: 'They are close relatives. An interface is the agreed plug shape from lesson 3, given a name. Code written against it does not care which part is on the other end.',
        hint: 'Lesson 3 was about swapping. Lesson 19 was about protecting data.'
      },
      {
        type: 'pick', q: 'When is a separate interface NOT worth it? Pick all that apply.',
        options: ['There is one part and nobody has asked for a second', 'You have only seen one real case, so you would be guessing the shape', 'Four real parts do the same job in four different ways', 'You want to try the code with a safe fake part'],
        answer: [0, 1],
        why: 'With one part it is ceremony, and a shape guessed from one case is usually wrong. Four real parts, or a fake for trying things out, are exactly what an interface is for.',
        hint: 'Two of these are good reasons to have one.'
      }
    ]
  });
})();
