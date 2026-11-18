/* Lesson 11: Least astonishment (module 1). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l11  Least astonishment
     ===================================================================== */
  // A wall switch: a plate with a small toggle, and the word printed under it.
  const wallSwitch = (cx) =>
    box(cx - 35, 56, 70, 84, P.white, 12) +
    `<rect x="${cx - 11}" y="76" width="22" height="44" rx="7" fill="${P.tint}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<rect x="${cx - 7}" y="80" width="14" height="18" rx="4" fill="${P.accent}"/>` +
    T(cx, 166, 'LIGHT', { s: 13 });

  const switchPic = svg(600, 300, 'A switch marked LIGHT that turns on the light, next to the same switch that turns on the light and also unlocks the front door',
    T(150, 34, 'WHAT YOU GUESS', { s: 12.5, f: P.ok }) + T(450, 34, 'WHAT IT REALLY DOES', { s: 12.5, f: P.danger }) +
    `<line x1="300" y1="24" x2="300" y2="280" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    wallSwitch(150) +
    arrow(150, 178, 150, 214, P.ok, 3.5) +
    box(90, 222, 120, 40, P.okT, 12) + T(150, 247, 'light turns on', { s: 13, f: P.ok }) +
    T(150, 288, 'just what the label says', { s: 13, w: 700, f: P.ink2 }) +
    wallSwitch(450) +
    arrow(436, 178, 392, 214, P.ok, 3.5) +
    arrow(464, 178, 512, 214, P.danger, 3.5) +
    box(322, 222, 120, 40, P.okT, 12) + T(382, 247, 'light turns on', { s: 13, f: P.ok }) +
    box(456, 222, 124, 40, P.dangerT, 12) + T(518, 247, 'door unlocks', { s: 13, f: P.danger }) +
    T(450, 288, 'nothing on the label warned you', { s: 13, w: 700, f: P.ink2 }));

  const surpriseCode = [
    'def get_total(price):',
    '    total = price + price * TAX_RATE',
    '    charge_card(total)',
    '    return total',
    '',
    'def checkout(price):',
    '    total = get_total(price)',
    '    print_paper(total)'
  ];
  const samCode = surpriseCode.concat([
    '',
    'def show_total(price):',
    '    total = get_total(price)',
    '    display(total)'
  ]);
  const fixedCode = [
    'def get_total(price):',
    '    total = price + price * TAX_RATE',
    '    return total',
    '',
    'def checkout(price):',
    '    total = get_total(price)',
    '    charge_card(total)',
    '    print_paper(total)',
    '',
    'def show_total(price):',
    '    total = get_total(price)',
    '    display(total)'
  ];

  const painPic = `<div style="width:100%">${code(samCode, { title: "shop.py, with Sam's new job", bad: [3], hi: [7, 11] })}` +
    svg(600, 164, 'The customer screen shows 10 dollars 90. The card statement shows 10 dollars 90 taken twice, 21 dollars 80 for one order.',
      box(24, 34, 150, 62, '#15132B', 14) + T(99, 74, '$10.90', { s: 24, m: true, f: '#ECEAFF' }) + T(99, 120, 'customer screen', { s: 12.5, w: 700, f: P.ink2 }) +
      box(226, 14, 350, 116, P.white, 14) +
      T(246, 38, 'CARD STATEMENT', { a: 'start', s: 11.5, f: P.mute }) +
      T(246, 62, "Maya's Cookies", { a: 'start', s: 14 }) + T(556, 62, '-$10.90', { a: 'end', s: 15, m: true, f: P.danger }) +
      T(246, 86, "Maya's Cookies", { a: 'start', s: 14 }) + T(556, 86, '-$10.90', { a: 'end', s: 15, m: true, f: P.danger }) +
      `<line x1="246" y1="96" x2="556" y2="96" stroke="${P.ink}" stroke-width="2"/>` +
      T(246, 118, 'for one order', { a: 'start', s: 13, w: 700, f: P.ink2 }) + T(556, 118, '-$21.80', { a: 'end', s: 16, m: true, f: P.danger }) +
      T(401, 154, 'charged twice', { s: 13, f: P.danger })) + `</div>`;

  const siblingCode = [
    'def add_cookie(order):',
    '    order.append("cookie")',
    '',
    'def add_cake(order):',
    '    order.append("cake")',
    '    apply_discount(order)'
  ];
  const guessCol = (cx, good) =>
    box(cx - 90, 46, 180, 40, P.white, 12) + T(cx, 72, 'get_total', { s: 15, m: true }) +
    T(cx, 112, 'you guess:', { s: 12.5, w: 700, f: P.ink2 }) +
    box(cx - 100, 122, 200, 36, P.okT, 12) + T(cx, 145, 'gives back the total', { s: 13, f: P.ok }) +
    T(cx, 186, 'it does:', { s: 12.5, w: 700, f: P.ink2 }) +
    (good
      ? box(cx - 100, 196, 200, 36, P.okT, 12) + T(cx, 219, 'gives back the total', { s: 13, f: P.ok })
      : box(cx - 118, 196, 236, 36, P.dangerT, 12) + T(cx, 219, 'the total + charges a card', { s: 13, f: P.danger }));
  const testPic = `<div style="width:100%">` +
    svg(600, 252, 'When what a job does matches the guess from its name there is no surprise. When it does more than the name says there is a surprise.',
      T(150, 30, 'NO SURPRISE', { s: 12.5, f: P.ok }) + T(450, 30, 'SURPRISE', { s: 12.5, f: P.danger }) +
      `<line x1="300" y1="20" x2="300" y2="240" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
      guessCol(150, true) + guessCol(450, false)) +
    code(siblingCode, { title: 'two jobs from the same family', bad: [6] }) + `</div>`;

  const limitPic = `<div style="width:100%">${code([
    'order = ["choc chip", "oat"]',
    '',
    'order[0]          # Python: the first item',
    'item(order, 1)    # Maya\'s helper: the first item'
  ], { title: 'two ways to count in one program', bad: [4] })}` +
    svg(600, 132, 'A job with the loud name delete all orders forever, which asks are you sure before it runs',
      box(30, 22, 340, 56, P.dangerT, 14) + T(200, 56, 'delete_all_orders_forever()', { s: 15, m: true, f: P.danger }) +
      arrow(384, 50, 424, 50, P.ink, 3) +
      box(436, 22, 136, 56, P.warnT, 14) + T(504, 46, 'Are you sure?', { s: 13 }) + T(504, 65, 'yes / no', { s: 12, w: 700, f: P.ink2 }) +
      T(300, 116, 'A surprise you cannot avoid should be loud', { s: 13, w: 700, f: P.ink2 })) + `</div>`;

  COURSE.add({
    id: 'l11', minutes: 8,
    summary: 'A piece of code should do what its name makes you guess, and nothing more. That is <b>least astonishment</b>. Surprises are where bugs come from.',
    video: {
      src: 'videos/l11-least-astonishment.mp4', poster: 'videos/l11-least-astonishment.jpg', length: '1 min 5 s',
      script: [
        "Maya's shop has a job called get_total. What would you guess it does? Anyone would say, it just gives back a number.",
        "But look inside. Line 3. It also charges the customer's card. Nothing in the name says so.",
        "Sam, Maya's new helper, is asked to show the total on the customer's screen. He reads the name, and calls get_total.",
        'A customer orders $10 of cookies. The screen shows $10.90. And the card is charged. Then comes the checkout. It calls get_total again. The card is charged a second time.',
        'Sam did nothing silly. The name made a promise, and the code broke it.',
        'The fix. get_total only works out the total. The charging moves to the checkout, in plain sight.',
        'Now the screen can show the total as often as it likes. One order, one charge.',
        'That is least astonishment. Code should do what its name says, and nothing more.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: switchPic,
        h: 'A light switch should switch the light.',
        text: [
          'You walk into a room and flip the switch marked <b>LIGHT</b>. The light comes on. And, quietly, the front door unlocks. Nothing on the switch warned you.',
          'Code has labels too. Every job has a <b>name</b>, and the name is a promise. People read the name, make a <b>guess</b> about what the job does, and act on that guess. They do not open every job and read the inside.',
          '<b>Least astonishment</b> means a piece of code should do what a reasonable person would guess from its name, and from how similar code behaves. It is also called the <b>principle of least surprise</b>.'
        ],
        tip: 'Lesson 5, KISS, said its tricks would come back here. A trick is a surprise for the reader. In this lesson the surprise is in what the code <b>does</b>.'
      },
      {
        label: 'The code', pic: code(surpriseCode, { title: 'shop.py', hi: [1] }),
        h: 'What would you guess?',
        text: [
          'Maya wrote a job called <code>get_total</code>. (<code>TAX_RATE = 0.09</code> still sits at the top of the file, as in lesson 1.) Look only at <b>line 1</b> for a moment. From the name alone, what does this job do?',
          'Most people say it works out the total and hands back a number. In everyday code, a name that starts with <code>get</code> promises to <b>fetch something and change nothing</b>.',
          "Now read line 3. It also <b>charges the customer's card</b>. Maya wrote it on a busy day. Only <code>checkout</code> used this job, and a checkout needs both the total and the payment, so she did both in one place.",
          'The shop works. One checkout, one charge. But the name says nothing about money leaving a card.'
        ]
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Sam trusts the name.',
        text: [
          "Sam, the new helper, gets a small task: <b>show the total on the customer's screen</b> while the order is being packed. He looks for a job that gives the total and finds <code>get_total</code>. He reads the name and calls it, on line 11. That is what everyone does.",
          'A customer orders $10 of cookies. The screen shows <b>$10.90</b>. Behind the screen, line 3 has just charged the card. The customer has not even reached the checkout.',
          'Then the checkout runs. It calls <code>get_total</code> too, and line 3 charges the card <b>again</b>. One order, and $10.90 is taken twice. That is <b>$21.80</b>.'
        ],
        warn: 'Sam did nothing silly. Nothing crashed, and the screen showed the right number. The name made a promise and the code broke it.'
      },
      {
        label: 'The fix', pic: code(fixedCode, { title: 'shop.py, fixed', good: [3, 7] }),
        h: 'Make the name true.',
        text: [
          'Maya moves <b>one line</b>. Now <code>get_total</code> only works out the total and hands it back. That is exactly what its name says.',
          'The charging moves into <code>checkout</code>, on line 7. It is done by a job with an honest name, <code>charge_card</code>. Anyone who reads <code>checkout</code> can see the moment the money moves.',
          "Sam's screen can now show the total once or fifty times. The card is charged <b>once</b>, at the checkout."
        ],
        tip: 'There are two honest fixes. Change what the code <b>does</b> to match the name, as Maya did. Or change the <b>name</b> to match what it does, like <code>charge_and_get_total</code>. Splitting was better here, because Sam needed the total without the charge. Keeping "tell me something" apart from "change something" has its own lesson: lesson 20, Command-query separation.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Read only the name.',
        text: [
          'Cover the inside of a job with your hand and ask: <b>"Would someone who only reads the name be surprised by what it does?"</b>',
          'A surprise can also come from the <b>family</b> a job belongs to. Look at the code under the picture. You met lists and <code>.append</code> in lesson 7. <code>add_cookie</code> adds one cookie to the order. So you guess that <code>add_cake</code> adds one cake. It does, and then it also applies a discount.',
          'Jobs with matching names should behave in matching ways. When you find a surprise, do one of two things. <b>Take the extra work out</b>, or <b>put it in the name</b>.'
        ],
        tip: 'This lesson is about what code <b>does</b> behind its name. How to pick a clear name in the first place is the next lesson, Meaningful names.'
      },
      {
        label: 'When not to', pic: limitPic,
        h: 'Whose guess counts?',
        text: [
          '<b>Follow the habits of your language and your team, not your own private guess.</b> In lesson 5, <code>d[0]</code> was the first letter of a word. Python counts from 0, so <code>order[0]</code> is the first item in a list. That surprises most beginners. Suppose Maya "fixes" it with her own helper, where <code>item(order, 1)</code> is the first item. Now her program counts in two ways, and every Python programmer who reads it is surprised.',
          '<b>Do not bend a right answer to fit a wrong guess.</b> In lesson 6 the shop takes 10% off big orders <b>before</b> tax. Suppose Sam guessed it was after tax. The rule is right and the guess is wrong, so the sums stay as they are. Make the rule easier to see with a clearer name or a one-line note.',
          '<b>Some surprises cannot be avoided. Make those loud.</b> A job that wipes every order should not be called <code>clean_up</code>. Call it <code>delete_all_orders_forever</code>, and make it ask first.'
        ],
        warn: "The goal is not zero surprises for every person on earth. It is no surprises for a reasonable reader who knows the language and the team's habits."
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does "least astonishment" ask for?',
        options: ['Code that does what its name makes you guess', 'Code with the fewest lines', 'Code that nobody needs to read', 'Names that are as short as possible'],
        answer: 0,
        why: 'People act on the guess they make from a name. Good code makes that guess come true.',
        hint: 'Think about what Sam did before he called get_total.'
      },
      {
        type: 'pick', q: 'Read only the names first. Which job does more than its name says?',
        pic: code([
          'def cookie_count(order):',
          '    return len(order)',
          '',
          'def is_member(card):',
          '    card.points = card.points + 1',
          '    return card.points >= 30',
          '',
          'def print_receipt(total):',
          '    print_paper(total)'
        ], { title: 'shop.py' }),
        options: ['cookie_count', 'is_member', 'print_receipt', 'None of them'],
        answer: 1,
        why: 'A name that starts with <code>is</code> promises a yes or no answer. Line 5 also adds a point to the card every time someone asks.',
        hint: 'One job sounds like a question but also changes something.'
      },
      {
        type: 'type', q: 'This is the code before the fix. A customer orders $10 of cookies. <code>show_total</code> runs once, then <code>checkout</code> runs once. How many dollars are taken from the card in all? (<code>TAX_RATE</code> is 0.09.)',
        pic: code(samCode, { title: "shop.py, with Sam's new job" }),
        prompt: 'dollars >',
        answers: ['21.80', '21.8', '$21.80'],
        why: 'Each call to <code>get_total</code> charges $10.90. Two calls take $21.80 for one order.',
        hint: 'One total is 10 + 10 × 0.09 = 10.90. Count how many times line 3 runs.'
      },
      {
        type: 'fill', q: 'Finish the fix. The total is worked out in one job, and the card is charged in plain sight.',
        text: 'def get_total(price):\n    total = price + price * TAX_RATE\n    return total\n\ndef checkout(price):\n    total = ___(price)\n    ___(total)\n    print_paper(total)',
        options: ['get_total', 'charge_card', 'display', 'show_total'],
        answer: ['get_total', 'charge_card'],
        why: '<code>get_total</code> only hands back a number. The honest name <code>charge_card</code> shows exactly where the money moves.',
        hint: 'First fetch the number. Then do the thing that takes money.'
      },
      {
        type: 'bucket', q: 'Would someone who only reads the name be surprised?',
        buckets: ['No surprise', 'Surprise'],
        items: [
          ['save_order saves the order', 0],
          ['charge_card charges the card', 0],
          ['delete_order deletes one order', 0],
          ['get_total also charges the card', 1],
          ['add_cake adds a cake and a discount', 1],
          ['print_receipt also empties the order', 1]
        ],
        why: 'The word "also" is the warning sign. Extra work that is not in the name is a surprise waiting for someone.'
      },
      {
        type: 'pick', q: 'A cookie costs $3 and a cake costs $20. The first two jobs look like twins. What does <code>order_total</code> hand back?',
        pic: code([
          'def cookie_price():',
          '    return 3       # dollars',
          '',
          'def cake_price():',
          '    return 2000    # cents',
          '',
          'def order_total():',
          '    return cookie_price() + cake_price()'
        ], { title: 'prices.py' }),
        options: ['23', '2003', '2300', '5'],
        answer: 1,
        why: '3 + 2000 = 2003. One twin answers in dollars and the other in cents. Jobs with matching names should answer in matching ways.',
        hint: 'Do the sum exactly as the code does: one answer plus the other.'
      },
      {
        type: 'pick', q: 'Sam is new to Python. He is surprised that <code>order[0]</code> is the first item. What should Maya do?',
        options: [
          'Write her own helper that counts from 1',
          'Keep the Python way, because Python readers expect it',
          'Stop using lists in the shop',
          'Rename every list to warn about it'
        ],
        answer: 1,
        why: 'The guess that counts is the guess of a reader who knows the language. A private counting rule would surprise everyone else.',
        hint: 'Whose guess counts? Think about every other Python programmer who will read the code.'
      },
      {
        type: 'pick', q: 'Back to lesson 1. Ask its question about the fixed code: the tax rises from 9% to 10%. How many lines must change? (<code>TAX_RATE = 0.09</code> sits at the top of the file.)',
        pic: code(fixedCode, { title: 'shop.py, fixed' }),
        options: ['0', '1', '2', '3'],
        answer: 1,
        why: 'Only the <code>TAX_RATE</code> line at the top. The screen and the checkout both ask <code>get_total</code>, and now it is safe for anyone to call.',
        hint: 'Where is the number 0.09 written down?'
      }
    ]
  });
})();
