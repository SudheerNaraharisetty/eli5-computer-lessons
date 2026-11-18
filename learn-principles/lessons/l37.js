/* Lesson 37: Idempotency (module 4). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l37  Idempotency
     ===================================================================== */
  const divider = (x, y1, y2) => `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>`;

  /* ---- The idea: "set to 180" three times, "up by 20" three times ---- */
  const ovenRow = (x0, vals, fills, cols) => vals.map((v, i) => {
    const x = x0 + i * 82;
    return T(x + 35, 92, 'time ' + (i + 1), { s: 12, w: 700, f: P.ink2 }) + box(x, 102, 70, 50, fills[i], 12) + T(x + 35, 134, v, { s: 17, m: true, f: cols[i] });
  }).join('');
  const ideaPic = svg(600, 250, 'An oven at 160 degrees. Set the oven to 180, said three times, gives 180, 180, 180. Turn the oven up by 20, said three times, gives 180, 200, 220.',
    T(150, 30, 'SET THE OVEN TO 180', { s: 12.5, f: P.ok }) + T(450, 30, 'TURN THE OVEN UP BY 20', { s: 12.5, f: P.danger }) +
    T(150, 54, 'the oven starts at 160', { s: 12.5, w: 700, f: P.ink2 }) + T(450, 54, 'the oven starts at 160', { s: 12.5, w: 700, f: P.ink2 }) +
    divider(300, 18, 236) +
    ovenRow(32, ['180', '180', '180'], [P.okT, P.okT, P.okT], [P.ok, P.ok, P.ok]) +
    ovenRow(332, ['180', '200', '220'], [P.white, P.warnT, P.dangerT], [P.ink, P.warn, P.danger]) +
    T(150, 190, 'Said 3 times. Still 180.', { s: 13.5 }) + T(150, 212, 'safe to repeat', { s: 13, w: 700, f: P.ok }) +
    T(450, 190, 'Said 3 times. A burnt cake.', { s: 13.5 }) + T(450, 212, 'every repeat changes something', { s: 13, w: 700, f: P.danger }));

  /* ---- The code: a click, a job in the shop, a reply ---- */
  const beforeCode = [
    'def place_order(cart):',
    '    charge_card(cart.total)',
    '    save_order(cart)',
    '    return "Thank you!"'
  ];
  const tripPic = svg(600, 140, 'The customer sends a request to the shop. The shop does the work and sends a reply back. The customer only knows it worked if the reply arrives.',
    box(24, 34, 140, 60, P.white, 14) + T(94, 60, 'customer', { s: 14 }) + T(94, 80, 'clicks Pay', { s: 12, w: 700, f: P.ink2 }) +
    box(436, 34, 140, 60, P.tint, 14) + T(506, 60, 'the shop', { s: 14 }) + T(506, 80, 'does the work', { s: 12, w: 700, f: P.ink2 }) +
    arrow(176, 52, 424, 52, P.ink, 3) + T(300, 42, 'request: place_order(cart)', { s: 12, m: true }) +
    arrow(424, 80, 176, 80, P.ok, 3) + T(300, 100, 'reply: "Thank you!"', { s: 12, m: true, f: P.ok }) +
    T(300, 130, 'The customer only knows it worked if the reply makes it back.', { s: 12.5, w: 700, f: P.ink2 }));
  const codePic = `<div style="width:100%">${code(beforeCode, { title: 'shop.py', hi: [2, 3] })}${tripPic}</div>`;

  /* ---- The pain: the reply is lost, the customer clicks again ---- */
  const painSvg = svg(600, 300, 'Click 1 reaches the shop and the card is charged 10 dollars 90. The reply is lost. The customer clicks again and the card is charged a second time. The statement shows 21 dollars 80.',
    T(80, 28, 'CUSTOMER', { s: 12.5, f: P.ink2 }) + T(516, 28, 'SHOP', { s: 12.5, f: P.ink2 }) +
    box(20, 44, 120, 38, P.white, 10) + T(80, 68, 'click 1', { s: 13 }) +
    arrow(150, 63, 446, 63, P.ink, 3) + T(298, 53, 'Pay $10.90', { s: 12, m: true }) +
    box(456, 44, 124, 38, P.warnT, 10) + T(518, 68, 'charge 1', { s: 13 }) +
    `<line x1="446" y1="113" x2="316" y2="113" stroke="${P.danger}" stroke-width="3" stroke-dasharray="7 6"/>` +
    `<path d="M296 101 L320 125 M320 101 L296 125" stroke="${P.danger}" stroke-width="4" stroke-linecap="round"/>` +
    T(380, 103, '"Thank you!"', { s: 12, m: true, f: P.danger }) + T(230, 118, 'reply lost', { s: 13, f: P.danger }) +
    box(20, 94, 120, 38, P.warnT, 10) + T(80, 118, 'still waiting', { s: 13 }) +
    box(20, 144, 120, 38, P.white, 10) + T(80, 168, 'click 2', { s: 13 }) +
    arrow(150, 163, 446, 163, P.ink, 3) + T(298, 153, 'Pay $10.90', { s: 12, m: true }) +
    box(456, 144, 124, 38, P.dangerT, 10) + T(518, 168, 'charge 2', { s: 13, f: P.danger }) +
    box(110, 208, 380, 72, P.white, 14) + T(130, 234, 'Card statement', { s: 13, a: 'start' }) +
    T(130, 262, '$10.90 + $10.90 = $21.80', { s: 16, m: true, a: 'start', f: P.danger }) +
    `<rect x="396" y="222" width="80" height="30" rx="8" fill="${P.danger}" stroke="${P.ink}" stroke-width="2.5" transform="rotate(-7 436 237)"/>` +
    `<g transform="rotate(-7 436 237)">${T(436, 242, 'TWICE', { s: 13, f: P.white })}</g>`);
  const painPic = `<div style="width:100%">${painSvg}${code(beforeCode, { title: 'shop.py, run twice for one purchase', bad: [2, 3] })}</div>`;

  /* ---- The fix: set, check, ticket ---- */
  const setAddCode = [
    'order.status = "paid"            # 3 times: paid, paid, paid',
    'card.points = card.points + 10   # 3 times: 10, 20, 30'
  ];
  const fixedCode = [
    'done = {}',
    '',
    'def place_order(cart, ticket):',
    '    if ticket in done:',
    '        return done[ticket]',
    '    charge_card(cart.total)',
    '    save_order(cart)',
    '    done[ticket] = "Thank you!"',
    '    return done[ticket]'
  ];
  const boardPic = svg(600, 210, 'A request arrives with ticket 4817. If the ticket is not in the done table, the shop charges, saves and remembers the reply. If the ticket is already in the table, the shop hands back the same reply and does no work.',
    box(16, 72, 150, 62, P.white, 14) + T(91, 98, 'Pay $10.90', { s: 13, m: true }) +
    `<rect x="46" y="108" width="90" height="22" rx="6" fill="#FFC24B" stroke="${P.ink}" stroke-width="2"/>` + T(91, 124, 'ticket 4817', { s: 11.5, m: true }) +
    arrow(176, 103, 214, 103, P.ink, 3) +
    box(222, 72, 150, 62, P.warnT, 14) + T(297, 98, 'ticket in done?', { s: 12.5, m: true }) + T(297, 118, 'line 4', { s: 12, w: 700, f: P.ink2 }) +
    arrow(376, 88, 416, 54, P.ink, 3) + arrow(376, 118, 416, 152, P.ok, 3) +
    box(424, 16, 160, 68, P.white, 14) + T(504, 40, 'no: first time', { s: 13 }) + T(504, 58, 'charge, save,', { s: 12, w: 700, f: P.ink2 }) + T(504, 74, 'remember the reply', { s: 12, w: 700, f: P.ink2 }) +
    box(424, 122, 160, 68, P.okT, 14) + T(504, 146, 'yes: a repeat', { s: 13, f: P.ok }) + T(504, 164, 'same reply,', { s: 12, w: 700, f: P.ink2 }) + T(504, 180, 'no work', { s: 12, w: 700, f: P.ink2 }) +
    T(190, 176, 'Click once or click ten times.', { s: 12.5, w: 700, f: P.ink2 }) + T(190, 194, 'Ticket 4817 is charged once.', { s: 12.5, w: 700, f: P.ink2 }));
  const fixPic = `<div style="width:100%">${code(setAddCode, { title: 'step 1: set, do not add', good: [1], bad: [2] })}${code(fixedCode, { title: 'step 3: shop.py, with a ticket', good: [1, 3, 4, 5, 8, 9] })}${boardPic}</div>`;

  /* ---- The test: run once, run twice ---- */
  const testRow = (y, cmd, once, twice, safe) =>
    box(16, y, 568, 40, safe ? P.okT : P.dangerT, 10) +
    T(30, y + 25, cmd, { s: 12, m: true, a: 'start' }) + T(350, y + 25, once, { s: 12.5 }) + T(440, y + 25, twice, { s: 12.5, f: safe ? P.ink : P.danger }) +
    T(530, y + 25, safe ? 'safe' : 'not safe', { s: 12.5, f: safe ? P.ok : P.danger });
  const testPic = svg(600, 270, 'Four commands, each run once and then twice. Setting a status and deleting an order end up the same. Adding points and sending a text do not.',
    T(30, 28, 'THE COMMAND', { s: 12, f: P.ink2, a: 'start' }) + T(350, 28, 'ONCE', { s: 12, f: P.ink2 }) + T(440, 28, 'TWICE', { s: 12, f: P.ink2 }) + T(530, 28, 'REPEAT?', { s: 12, f: P.ink2 }) +
    testRow(40, 'order.status = "paid"', 'paid', 'paid', true) +
    testRow(92, 'delete_order(12)', 'gone', 'gone', true) +
    testRow(144, 'card.points = card.points + 10', '10', '20', false) +
    testRow(196, 'send_text("Order ready!")', '1 text', '2 texts', false) +
    T(300, 260, 'Same ending both times means the command is idempotent.', { s: 12.5, w: 700, f: P.ink2 }));

  /* ---- When not to: some things should count every time ---- */
  const basketCode = [
    '# one more each time: 3 presses, 3 cookies',
    'def add_cookie(basket):',
    '    basket.cookies = basket.cookies + 1',
    '',
    '# forced to be "safe to repeat": 3 presses, 1 cookie',
    'def add_cookie(basket):',
    '    basket.cookies = 1'
  ];
  const ticketPic = svg(600, 150, 'The same ticket sent twice is an accident and is charged once. Two different tickets are two purchases and are charged twice.',
    box(20, 20, 250, 50, P.white, 12) + T(145, 50, 'ticket 4817, ticket 4817', { s: 12.5, m: true }) +
    arrow(280, 45, 318, 45, P.ok, 3) + box(326, 20, 254, 50, P.okT, 12) + T(453, 50, 'a retry: 1 charge', { s: 13.5, f: P.ok }) +
    box(20, 84, 250, 50, P.white, 12) + T(145, 114, 'ticket 4817, ticket 4818', { s: 12.5, m: true }) +
    arrow(280, 109, 318, 109, P.ink, 3) + box(326, 84, 254, 50, P.tint, 12) + T(453, 114, 'a second box: 2 charges', { s: 13.5, f: P.accent }));
  const whenPic = `<div style="width:100%">${code(basketCode, { title: 'basket.py, overdone', good: [3], bad: [7] })}${ticketPic}</div>`;

  const notifyCode = [
    'def notify(customer, message):',
    '    line = phone_company.connect()',
    '    number = "+1" + customer.phone',
    '    message = message[:160]',
    '    reply = line.send(number, message)',
    '    if reply != "OK":',
    '        line.send(number, message)'
  ];
  const samCode = [
    'def place_order(cart):',
    '    ticket = new_ticket()',
    '    if ticket in done:',
    '        return done[ticket]',
    '    charge_card(cart.total)',
    '    save_order(cart)',
    '    done[ticket] = "Thank you!"',
    '    return done[ticket]'
  ];

  COURSE.add({
    id: 'l37', minutes: 9,
    summary: 'Things fail halfway and get tried again. An action is <b>idempotent</b> if doing it twice leaves things exactly as doing it once. Then "try again" is always a safe answer.',
    video: {
      src: 'videos/l37-idempotency.mp4', poster: 'videos/l37-idempotency.jpg', length: '1 min 7 s',
      script: [
        "A customer is buying cookies from Maya's shop online. $10.90. They click Pay.",
        'The shop charges the card, and saves the order.',
        'But on the way back, the reply gets lost. The screen just spins.',
        'So they click Pay again. Anyone would.',
        'The shop does it all again. A second charge. A second order. They paid twice.',
        'The code did its job. It just was not safe to run twice.',
        'The fix is a ticket. Before the first click, this purchase gets one number. 4817. Every try carries it.',
        'Play it again. Click. One charge, and the ticket goes on the done board. The reply is lost. Click again. Same ticket. The shop finds it on the board, and hands back the same thank you. Still one charge.',
        'Add 10 points, 3 times, makes 30. Set to paid, 3 times, is still paid.',
        'That is what idempotent means. Doing it twice is the same as doing it once.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Press the lift button again.',
        text: [
          'You press the button to call a lift. It lights up. You are in a hurry, so you press it again. And again. <b>Nothing more happens.</b> One lift comes, not three.',
          'An oven takes two kinds of order. "<b>Set</b> the oven to 180" can be said three times, and the oven is at 180. "Turn the oven <b>up by 20</b>", said three times, burns the cake.',
          'An action is <b>idempotent</b> (say "eye-dem-POH-tent") if doing it twice, or ten times, leaves things exactly as doing it once. The property is called <b>idempotency</b>. In plain words: <b>safe to run twice</b>.',
          'It matters because real programs get run twice <b>by accident</b>, all the time. The internet drops. A customer double-clicks. A program crashes after doing the work but before saying "done". The only safe answer to "did that go through?" is usually "<b>try again</b>". If trying again is harmless, a failure is cheap. If trying again takes money, every hiccup becomes a complaint.'
        ],
        tip: 'Lesson 20, Command-query separation, made <b>queries</b> safe to repeat. A question changes nothing, so you can ask it as often as you like. It also said a <b>command</b> is allowed to be different the second time. This lesson is about the commands where that is not good enough.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'One click, one job in the shop.',
        text: [
          'Maya sells online, as she has since lesson 7. A customer fills a <code>cart</code> and clicks <b>Pay</b>. The click sends a <b>request</b> across the internet to the shop. The shop runs <code>place_order</code> and sends a <b>reply</b> back.',
          'Line 2 charges the card. <code>cart.total</code> is the total for this cart with tax included, reached with the dot from lesson 3. Today it is <b>$10.90</b>: $10 of cookies plus 9% tax. Line 3 saves the order, and the kitchen bakes every order that is saved. Line 4 hands back the reply, the words the customer will see.',
          'Every line is honest. The name says what the job does, and nothing is hidden, unlike <code>get_total</code> in lesson 11. On a good day it works: one click, one charge, one box of cookies.',
          'Now look at the picture under the code. The work happens <b>in the shop</b>. The customer only learns about it if the <b>reply makes it back</b>.'
        ]
      },
      {
        label: 'The pain', pic: painPic,
        h: 'The reply gets lost.',
        text: [
          'A customer on a train clicks <b>Pay $10.90</b>. The request reaches the shop. Line 2 charges the card. Line 3 saves the order. Line 4 sends back "Thank you!".',
          'The train goes into a tunnel. <b>The reply is lost.</b> On the customer\'s screen a little wheel just spins. Did it work? They cannot know. So they click Pay again. Anyone would.',
          'The shop gets a second request, and it looks exactly like the first. <code>place_order</code> runs again. A <b>second charge</b>. A <b>second order</b>, so a second box is baked. The card statement shows $10.90 twice. That is <b>$21.80</b> for one box of cookies.',
          'It does not take a tunnel or an impatient customer. Many apps and payment tools <b>try again by themselves</b> when no reply comes. Maya\'s own <code>notify</code> in lesson 18 sent its message once more when the reply was not "OK".'
        ],
        warn: 'In lesson 11 a customer also paid $21.80, because <code>get_total</code> hid a charge. This time nothing is hidden and nothing crashed. The code did its job, twice. It was never made <b>safe to run twice</b>.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Give every purchase a ticket.',
        text: [
          '<b>Step 1: set, do not add.</b> Where you can, write a command as "make it so" and not as "do it again". Look at the first box. Line 1 sets the status to "paid". Run it three times and the order is paid, paid, paid. Line 2 adds 10 points. Run it three times and the card has 30. Setting is idempotent for free. But "take $10.90 from this card" cannot be written as a set, so this step is not enough here.',
          '<b>Step 2: check first.</b> Ask "is this already done?" before doing it. That is the right idea. But what can the shop check? Two requests for $10.90 of cookies look the same. The second might be a retry. It might also be a customer who really wants a second box. The shop <b>cannot tell them apart</b>.',
          '<b>Step 3: a ticket.</b> When the checkout page opens, <b>before the first click</b>, the page makes one number for this purchase. Say <b>4817</b>. Every try sends the same ticket: <code>place_order(cart, 4817)</code>. Programmers call this number an <b>idempotency key</b>: a label that says "all these requests are one and the same purchase".',
          'The shop has to remember which tickets it has finished. That needs one new piece of Python. <code>done = {}</code> on line 1 makes an empty <b>dictionary</b>. A dictionary is a lookup table: you save a value under a <b>key</b>, and later you give it the key and get the value back. <code>done[ticket] = "Thank you!"</code> saves the reply under the ticket. <code>done[ticket]</code> reads it back. And <code>ticket in done</code> asks "is this key in the table?".',
          'Now read the job. Lines 4 and 5 are a guard clause, as in lesson 21. If this ticket is already finished, hand back the <b>same reply</b> and stop. Otherwise do the work, and on line 8 remember the reply. Replay the train. The first click charges $10.90 and saves ticket 4817. The reply is lost. The second click arrives with ticket 4817. Line 4 finds it. The customer gets the same "Thank you!" and <b>nothing happens twice</b>.'
        ],
        tip: 'Two honest notes. A real shop keeps its finished tickets in a database and saves each one in the same step as the order, so that a crash cannot leave one without the other. And a real ticket is a long random code, not 4817, so that two customers never get the same one. The idea is exactly this one.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Run it twice in your head.',
        text: [
          'Point at any command and ask: <b>"If this runs twice by accident, is anything different from running it once?"</b>',
          'Try it on the picture. Setting a status: no difference. Deleting order 12: the second time it is already gone, so no difference. Adding 10 points: the card has 20, not 10. Sending the "Order ready!" text: the customer\'s phone buzzes twice.',
          'Lesson 20 had a test that sounds alike: "call it twice". That one sorted questions from commands. Here you already know it is a command. You are asking whether a <b>repeat does harm</b>.',
          'Then ask how likely a repeat is. Anything that crosses the internet, moves money, or is retried by a machine <b>will</b> be run twice one day. Make those safe first.'
        ],
        tip: 'A sign to look for in code: a line that <b>adds to what is already there</b>, like <code>x = x + 1</code>, <code>.append(...)</code> or a send, is not safe to repeat on its own. A line that <b>sets</b> a value is.'
      },
      {
        label: 'When not to', pic: whenPic,
        h: 'Retries should be safe. Not everything is a retry.',
        text: [
          '<b>Some things should count every time.</b> A customer who presses "add a cookie" three times wants three cookies. A counter of visits should go up on every visit. Look at the code. Suppose Maya loves this lesson and turns the basket button into a "set". Three presses, one cookie. The customer wanted three. The goal is that an <b>accidental</b> repeat is safe. It is not that nothing can ever be repeated on purpose.',
          '<b>The ticket is what tells the two apart.</b> Same ticket: a retry, so do nothing more. New ticket: a new purchase, so do the work. A customer who really wants a second box opens the checkout again and gets ticket 4818.',
          '<b>Remembering has a cost.</b> Every finished ticket takes up space. Keep tickets long enough to cover any retry, often about a day, and then clear them out. Clear them too soon and a late retry is charged again. Keep them forever and the table only ever grows.',
          '<b>It does not replace telling the customer.</b> The spinning wheel still needs a clear message, such as "We could not reach the shop. You will not be charged twice. Please try again." Idempotency makes the second click harmless. It does not make the screen less confusing.'
        ],
        warn: 'Do not staple a ticket to everything. A job that only sets a value, or only answers a question, is already safe to repeat. Lesson 4, Trade-offs, not laws, asked: is this problem real right now?'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'Which of these is idempotent?',
        options: ['Turn the volume up by 2', 'Set the volume to 8', 'Skip to the next song', 'Add one more alarm'],
        answer: 1,
        why: 'Set the volume to 8 once or five times and it is at 8. Each of the others changes something more every time you do it.',
        hint: 'Which one could you do five times in a row and end up in the same place as doing it once?'
      },
      {
        type: 'bucket', q: 'Each line runs twice by accident. Safe, or not safe?',
        buckets: ['Safe to run twice', 'Not safe to run twice'],
        items: [
          ['order.status = "paid"', 0],
          ['jar.count = 24', 0],
          ['cookies_left()', 0],
          ['card.points = card.points + 10', 1],
          ['jar.count = jar.count - 1', 1],
          ['orders.append(cart)', 1]
        ],
        why: 'Setting a value lands in the same place every time. <code>cookies_left()</code> is the fixed query from lesson 20, which only looks. Adding, taking away and appending all do a little more on every run.',
        hint: 'Does the line set a value, or does it change what is already there?'
      },
      {
        type: 'order', q: 'Put the story of the double charge in order.',
        items: ['The customer clicks Pay', 'The shop charges the card and saves the order', 'The reply is lost on the way back', 'The customer sees a spinning wheel and clicks Pay again', 'The shop charges the card a second time'],
        why: 'The work was done before the reply was lost. That is why the customer could not know, and why "try again" did harm.',
        hint: 'The charge happens before anything goes wrong.'
      },
      {
        type: 'fill', q: 'Finish the fix. A ticket that is already finished gets the saved reply and no more work.',
        text: 'done = {}\n\ndef place_order(cart, ticket):\n    if ticket ___ done:\n        return done[___]\n    charge_card(cart.total)\n    save_order(cart)\n    done[ticket] = "Thank you!"\n    return done[ticket]',
        options: ['in', 'ticket', 'cart', 'not'],
        answer: ['in', 'ticket'],
        why: '<code>ticket in done</code> asks if this key is in the table. <code>done[ticket]</code> reads back the reply that was saved under it.',
        hint: 'The first blank is the word that asks "is this key in the table?". The second is the key.'
      },
      {
        type: 'pick', q: 'Sam "tidies" the fix. The shop now makes the ticket itself, on line 2. A customer clicks Pay twice for one box of cookies. What happens?',
        pic: code(samCode, { title: "shop.py, Sam's version", hi: [2] }),
        options: ['One charge. The second click finds the ticket on line 3.', 'Two charges. Each click gets a brand new ticket, so line 3 never finds it.', 'The program stops with an error on line 3.', 'No charge at all.'],
        answer: 1,
        why: 'A ticket only works if it is made <b>before the first click</b> and travels with every retry. Made inside the job, it is new on every run. So the check on line 3 can never be true.',
        hint: 'How many times does line 2 run when the customer clicks twice?'
      },
      {
        type: 'pick', q: 'This is <code>notify</code> from lesson 18, Abstraction. The text reaches the customer, but the phone company\'s reply is lost, so <code>reply</code> is not "OK". What does the customer get?',
        pic: code(notifyCode, { title: 'shop.py, from lesson 18', hi: [6, 7] }),
        options: ['No text at all', 'Exactly one text', 'The same text twice', 'An error message'],
        answer: 2,
        why: 'Line 7 sends again. Sending is not idempotent, so the customer gets two texts. A second "Your order is ready!" is a small annoyance, and Maya can live with it. A second charge is not, which is why the payment got a ticket.',
        hint: 'The first send on line 5 did work. Then what does line 7 do?'
      },
      {
        type: 'type', q: 'The table is <code>done = {4817: "Thank you!"}</code>. A request arrives with ticket 4818. What does <code>4818 in done</code> give? Type True or False.',
        prompt: 'answer >',
        answers: ['False', 'false'],
        why: 'Only 4817 is a key in the table. 4818 is a new ticket, so the answer is <code>False</code> and the shop does the work. That is right: a new ticket means a new purchase.',
        hint: 'Is 4818 one of the keys saved in the table?'
      },
      {
        type: 'pick', q: 'Which of these are true? Pick all that apply.',
        options: ['A new purchase should get a new ticket', 'Every button in a program should be made idempotent', 'Finished tickets can be cleared out after a while', 'With tickets in place, the screen no longer needs to tell the customer what happened'],
        answer: [0, 2],
        why: 'The ticket separates a retry from a new purchase, and it only needs to be kept as long as a retry could still arrive. Some buttons should count every press. And a safe retry is no excuse for a confusing screen.',
        hint: 'Two of these come straight from "When not to".'
      }
    ]
  });
})();
