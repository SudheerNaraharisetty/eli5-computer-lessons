/* Lesson 8: YAGNI (module 1). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l08  YAGNI
     ===================================================================== */
  // A suitcase: a box with two straps and a handle.
  const bag = (x, y, w, h, fill, label) =>
    `<path d="M${x + w / 2 - 20} ${y} v-10 q0 -6 6 -6 h28 q6 0 6 6 v10" fill="none" stroke="${P.ink}" stroke-width="3.5" stroke-linecap="round"/>` +
    box(x, y, w, h, fill, 10) +
    `<rect x="${x + 16}" y="${y + 1.5}" width="8" height="${h - 3}" fill="${P.ink}"/><rect x="${x + w - 24}" y="${y + 1.5}" width="8" height="${h - 3}" fill="${P.ink}"/>` +
    T(x + w / 2, y + h / 2 + 5, label, { s: 13 });

  const tripPic = svg(600, 300, 'A weekend trip with one small bag, next to the same trip with three extra suitcases packed just in case and never opened',
    T(150, 34, 'PACKED FOR THE TRIP', { s: 12.5, f: P.ok }) + T(450, 34, 'PACKED "JUST IN CASE"', { s: 12.5, f: P.danger }) +
    `<line x1="300" y1="24" x2="300" y2="280" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    bag(85, 150, 130, 56, P.okT, 'weekend bag') +
    T(150, 244, 'two days, one bag', { s: 13, w: 700, f: P.ink2 }) +
    T(150, 264, 'easy to carry', { s: 13, f: P.ok }) +
    bag(330, 150, 110, 56, P.okT, 'weekend bag') +
    bag(456, 66, 120, 38, P.dangerT, 'snow boots') +
    bag(456, 118, 120, 38, P.dangerT, 'tuxedo') +
    bag(456, 170, 120, 38, P.dangerT, 'tent') +
    T(450, 244, 'carried up every staircase', { s: 13, w: 700, f: P.ink2 }) +
    T(450, 264, 'never opened', { s: 13, f: P.danger }));

  const bigCode = [
    'def show_price(price, currency="USD", shop_id=1):',
    '    total = price + price * TAX_RATE',
    '    total = to_money(total, currency)',
    '    display(total, shop_id)',
    '',
    'def print_receipt(price, currency="USD", shop_id=1):',
    '    total = price + price * TAX_RATE',
    '    total = to_money(total, currency)',
    '    print_paper(total, shop_id)',
    '',
    'def to_money(amount, currency):',
    '    if currency == "EUR":',
    '        return amount * 0.9',
    '    return amount'
  ];

  const giftCode = [
    'GIFT_WRAP = 2',
    'GIFT_WRAP_EUROS = 1.8    # a guess',
    '',
    'def add_gift_wrap(total, currency="USD", shop_id=1):',
    '    if currency == "EUR":',
    '        return total + GIFT_WRAP_EUROS',
    '    return total + GIFT_WRAP'
  ];

  const painPic = `<div style="width:100%">${code(giftCode, { title: 'shop.py, the new gift wrap job', bad: [2, 4, 5, 6] })}` +
    svg(600, 170, 'One cookie costs 3 dollars 27 with tax. The euro code turns it into 2.943 euros, a price nobody can pay. Zero customers have ever paid in euros.',
      T(300, 22, 'Then Maya tests the euro code', { s: 13 }) +
      box(24, 40, 150, 62, '#15132B', 14) + T(99, 80, '$3.27', { s: 24, m: true, f: '#ECEAFF' }) + T(99, 124, 'one cookie, with tax', { s: 12.5, w: 700, f: P.ink2 }) +
      arrow(186, 71, 232, 71, P.danger, 3.5) + T(209, 58, '× 0.9', { s: 12.5, m: true, f: P.danger }) +
      box(244, 40, 150, 62, P.dangerT, 14) + T(319, 80, '€2.943', { s: 24, m: true, f: P.danger }) + T(319, 124, 'nobody can pay this', { s: 12.5, w: 700, f: P.ink2 }) +
      box(430, 40, 146, 62, P.white, 14) + T(503, 82, '0', { s: 30 }) + T(503, 124, 'euro customers, ever', { s: 12.5, w: 700, f: P.ink2 }) +
      T(300, 158, 'A bug in code that no customer has ever used.', { s: 13, w: 700, f: P.ink2 })) + `</div>`;

  const fixedCode = [
    'def show_price(price):',
    '    total = price + price * TAX_RATE',
    '    display(total)',
    '',
    'def print_receipt(price):',
    '    total = price + price * TAX_RATE',
    '    print_paper(total)',
    '',
    'GIFT_WRAP = 2',
    '',
    'def add_gift_wrap(total):',
    '    return total + GIFT_WRAP'
  ];

  const row = (x, y, w, s, fill) => box(x, y, w, 34, fill, 10) + T(x + w / 2, y + 22, s, { s: 12.5 });
  const testPic = svg(600, 310, 'If someone is asking for it now, build it. If it starts with one day, maybe or just in case, it is a guess, so wait.',
    T(150, 34, 'SOMEONE IS ASKING NOW', { s: 12.5, f: P.ok }) + T(450, 34, 'I AM GUESSING', { s: 12.5, f: P.danger }) +
    `<line x1="300" y1="24" x2="300" y2="290" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    row(30, 56, 240, '"Can you gift wrap this?"', P.white) +
    row(30, 104, 240, '"The tax went up today."', P.white) +
    row(30, 152, 240, '"The receipt is wrong."', P.white) +
    arrow(150, 196, 150, 226, P.ok, 3.5) +
    box(80, 234, 140, 44, P.okT, 12) + T(150, 262, 'build it', { s: 15, f: P.ok }) +
    row(330, 56, 240, '"One day we might..."', P.white) +
    row(330, 104, 240, '"Just in case..."', P.white) +
    row(330, 152, 240, '"It could be handy if..."', P.white) +
    arrow(450, 196, 450, 226, P.danger, 3.5) +
    box(380, 234, 140, 44, P.dangerT, 12) + T(450, 262, 'wait', { s: 15, f: P.danger }));

  const limitPic = svg(600, 320, 'Some things can wait until someone asks. Others are cheap today and very costly or impossible to add later, so do them now.',
    T(150, 34, 'CAN WAIT', { s: 12.5, f: P.ok }) + T(450, 34, 'CANNOT WAIT', { s: 12.5, f: P.danger }) +
    `<line x1="300" y1="24" x2="300" y2="300" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    row(40, 56, 220, 'prices in euros', P.okT) +
    row(40, 104, 220, 'a second shop number', P.okT) +
    row(40, 152, 220, 'a phone app', P.okT) +
    T(150, 226, 'easy to add on the day', { s: 13, w: 700, f: P.ink2 }) +
    T(150, 246, 'someone asks', { s: 13, w: 700, f: P.ink2 }) +
    row(340, 56, 220, 'a backup of the sales', P.warnT) +
    row(340, 104, 220, 'the date of every sale', P.warnT) +
    row(340, 152, 220, 'customer details kept safe', P.warnT) +
    T(450, 226, 'cheap today,', { s: 13, w: 700, f: P.ink2 }) +
    T(450, 246, 'too late once you need it', { s: 13, w: 700, f: P.ink2 }) +
    T(300, 296, 'YAGNI is for the left side only.', { s: 13 }));

  COURSE.add({
    id: 'l08', minutes: 8,
    summary: 'Do not build a feature for a future that has not arrived. <b>YAGNI</b> means "you aren\'t gonna need it": wait until someone really asks.',
    video: {
      src: 'videos/l08-yagni.mp4', poster: 'videos/l08-yagni.jpg', length: '1 min',
      script: [
        'Maya has a dream. One day, a second cookie shop, in Paris.',
        'So, just in case, she gets her code ready now. She adds a currency to every job. Then a shop number. Then code that turns dollars into euros.',
        'It feels smart. But each extra is like a suitcase. And every change has to carry all 3.',
        'Customers ask for gift wrap. A small change. But now it has to work in euros too, for a shop that does not exist.',
        '6 months pass. No Paris. Then a bug turns up in the euro code. Code that no customer has ever used.',
        'So Maya deletes it. 3 suitcases, gone. The next change is quick again.',
        'If Paris ever happens, she will build what that shop really needs. On that day.',
        "That is YAGNI. You aren't gonna need it. Do not build it until someone really asks."
      ]
    },
    parts: [
      {
        label: 'The idea', pic: tripPic,
        h: 'Pack for the trip you are taking.',
        text: [
          'You are going away for a weekend. You pack snow boots, a tuxedo and a tent, <b>just in case</b>. You carry all of it up every staircase. You never open any of it.',
          'Code works the same way. A feature built for a future that has not arrived is a suitcase you carry on <b>every change</b>.',
          'Programmers have a name for the cure: <b>YAGNI</b>. It stands for "<b>y</b>ou <b>a</b>ren\'t <b>g</b>onna <b>n</b>eed <b>i</b>t". Do not build a thing until someone really needs it.'
        ],
        tip: 'Lesson 1 said guessing the future is its own mistake. Lesson 4 said waiting for a real need has a name. This is that name.'
      },
      {
        label: 'The code', pic: code(bigCode, { title: 'shop.py, ready for Paris', hi: [1, 3, 4, 6, 8, 9, 11, 12, 13, 14] }),
        h: 'Maya gets ready for Paris.',
        text: [
          'Maya dreams of a second shop in Paris, one day. Nobody has asked for it. But she gets her code ready now. (<code>TAX_RATE = 0.09</code> still sits at the top of the file, as in lesson 1.)',
          'She gives every job two extras. <code>currency="USD"</code> means: if nobody says which money to use, use US dollars. <code>shop_id=1</code> means: if nobody says which shop, it is shop number 1.',
          'She also writes <code>to_money</code>. The <code>==</code> asks "is it equal to?". So line 12 asks: is the currency euros ("EUR")? If yes, line 13 hands back the amount times 0.9. If no, line 14 hands it back unchanged.',
          'Before Paris, this code was <b>6 lines</b>. Now it is <b>12 lines</b>. The highlighted lines were added or changed only for a shop that does not exist.'
        ]
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Every change carries the extras.',
        text: [
          'Six months pass. No Paris shop. Then customers ask for something real: <b>gift wrap, for $2</b>.',
          'It should be 3 lines. But every job in the file takes a currency and a shop number, so the new job does too. Maya has to invent a euro price for gift wrap. She passes <code>shop_id</code> along even though this job never uses it. <b>3 lines become 6.</b>',
          'Then she has to test it in euros. One cookie with tax is $3.27. Her euro code turns that into <b>2.943</b> euros. Three digits after the dot. Nobody can pay that. She spends her evening fixing it.'
        ],
        warn: 'Unused code is not free. It has to be read, tested and worked around on every change. And this bug was in code that <b>no customer has ever used</b>.'
      },
      {
        label: 'The fix', pic: code(fixedCode, { title: 'shop.py, only what the shop needs', good: [1, 5, 11, 12] }),
        h: 'Delete it.',
        text: [
          'Maya deletes the currency, the shop number and <code>to_money</code>. The file does what the shop needs <b>today</b>, and nothing else.',
          'Gift wrap is now the 3 lines it should have been. The next request will be small too.',
          'And Paris? If it ever happens, Maya will know the <b>real facts</b>. Maybe it is London, and pounds. Maybe France needs a different tax, not just different money. Her guess covered none of that. She will build exactly what the real shop needs, on that day.'
        ],
        tip: 'Waiting works because her code is easy to change. That was the point of lessons 1 to 3. Simple code today is the best way to be ready for tomorrow.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Ask who is asking.',
        text: [
          'Before you build anything, ask: <b>"Is someone asking for this now, or am I guessing?"</b>',
          'Listen for the words <b>"one day"</b>, <b>"maybe"</b> and <b>"just in case"</b>. They mean you are guessing.',
          'A guess costs you three times. You pay to build it. You pay to carry it on every change. And when the real need arrives, it is often different from the guess, so you pay again to redo it.'
        ]
      },
      {
        label: 'When not to', pic: limitPic,
        h: 'Some things cannot wait.',
        text: [
          'Do not use YAGNI as an excuse to skip things that are <b>cheap today</b> and <b>very costly or impossible later</b>.',
          'Picture Maya saying "nobody asked for a backup". Then her laptop dies and a year of sales is gone. Nobody asks for a backup until it is too late. The same goes for saving the date of every sale, and for keeping customer details safe. You cannot go back and add them to the past.',
          'YAGNI says do not <b>build</b> it yet. It does not say make it <b>impossible</b> later. Keep the code simple and easy to change, and the door stays open.'
        ],
        warn: 'The question is not only "do I need it today?". It is also "how hard is it to add later?". Easy to add later: wait. Impossible to add later: do it now.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does YAGNI tell you to do?',
        options: ['Never plan anything', 'Do not build a feature until someone really needs it', 'Build every feature you can think of, to be safe', 'Delete code that is more than a year old'],
        answer: 1,
        why: '"You aren\'t gonna need it." Build for the need that is here, not for the one you imagine.',
        hint: 'Think of the suitcases Maya carried for a shop that did not exist.'
      },
      {
        type: 'pick', q: 'The shop sells in one language, to walk-in customers, by card. Which extras are "just in case"? Pick all that apply.',
        pic: code([
          'def take_order(cookies, language="en", drone=False):',
          '    total = cookies * COOKIE_PRICE',
          '    if drone:',
          '        total = total + drone_fee()',
          '    show(translate("Total", language), total)',
          '    charge_card(total)'
        ], { title: 'orders.py' }),
        options: ['language="en"', 'drone=False', 'cookies', 'charge_card(total)'],
        answer: [0, 1],
        why: 'Nobody asked for other languages or drone delivery. The number of cookies and the card payment are needed for every sale today.',
        hint: 'Which parts does a customer in the shop use today?'
      },
      {
        type: 'bucket', q: 'Is someone asking now, or is it a guess?',
        buckets: ['Asking now: build it', 'A guess: wait'],
        items: [
          ['Customers keep asking for gift wrap', 0],
          ['The city raised the tax this week', 0],
          ['The receipt prints the wrong total', 0],
          ['"One day we might sell in euros"', 1],
          ['"Just in case we open ten shops"', 1],
          ['"A phone app could be handy later"', 1]
        ],
        why: 'A real request has a person behind it today. "One day", "just in case" and "could be" are guesses.',
        hint: 'Look for the words that point at the future.'
      },
      {
        type: 'fill', q: 'Finish the fix. Remove everything that was only there for Paris.',
        text: 'def show_price(___):\n    total = price + price * TAX_RATE\n    display(___)',
        options: ['price', 'total', 'price, currency="USD"', 'total, shop_id'],
        answer: ['price', 'total'],
        why: 'The job needs a price and shows a total. That is all the shop needs today.',
        hint: 'Neither blank mentions a currency or a shop number.'
      },
      {
        type: 'order', q: "Put Maya's story in order.",
        items: ['Maya dreams of a shop in Paris', 'She adds a currency and a shop number to every job', 'Gift wrap, a small change, takes twice the lines', 'A bug appears in euro code that no customer uses', 'She deletes the extras and the next change is small'],
        why: 'The cost did not come on the day she wrote the extras. It came later, on every change after that.',
        hint: 'The dream comes first. The suitcases come before the pain.'
      },
      {
        type: 'pick', q: 'Which of these did the unused Paris code cost Maya? Pick all that apply.',
        options: ['More lines to read on every change', 'A new job had to accept extras it never used', 'An evening fixing a bug no customer could ever hit', 'Customers in the shop were charged in euros'],
        answer: [0, 1, 2],
        why: 'No customer was harmed. Maya paid the whole price herself, in time and attention, for nothing.',
        hint: 'One of these never happened. Nobody has ever paid in euros.'
      },
      {
        type: 'pick', q: 'Back to lesson 1. A friend says: "Giving the tax one name is building for the future, so YAGNI says leave it typed in three jobs." Is the friend right?',
        pic: code([
          'def show_price(price):',
          '    total = price + price * 0.09',
          '    display(total)',
          '',
          'def take_payment(price):',
          '    total = price + price * 0.09',
          '    charge_card(total)',
          '',
          'def print_receipt(price):',
          '    total = price + price * 0.09',
          '    print_paper(total)'
        ], { title: 'shop.py from lesson 1' }),
        options: ['Yes. Any tidying is a guess about the future', 'No. The name adds no new feature. It keeps today\'s code easy to change', 'Yes. YAGNI means write as little as you can', 'No. YAGNI only matters in big programs'],
        answer: 1,
        why: 'YAGNI is about features nobody asked for. <code>TAX_RATE</code> is not a feature. It is one short line that makes a real, repeated change safe. Easy-to-change code is what lets you wait for everything else.',
        hint: 'Ask the lesson 1 question. If the tax changes, how many places must you touch?'
      },
      {
        type: 'bucket', q: 'The limit of YAGNI. Can it wait, or must it be done now?',
        buckets: ['Can wait until asked', 'Do it now'],
        items: [
          ['Prices in pounds', 0],
          ['A settings screen for 12 languages', 0],
          ['A loyalty card for a second shop', 0],
          ['A backup of the sales records', 1],
          ['Saving the date of each sale', 1],
          ['Keeping customer details safe', 1]
        ],
        why: 'The left side is easy to add on the day someone asks. The right side is cheap today and too late once you need it.',
        hint: 'Ask: if I skip this today, can I still add it later?'
      }
    ]
  });
})();
