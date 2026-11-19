/* Lesson 12: Meaningful names (module 1). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l12  Meaningful names
     ===================================================================== */
  const crate = (x, y, fill, label, mono) =>
    box(x, y, 200, 50, fill, 8) +
    `<line x1="${x + 100}" y1="${y}" x2="${x + 100}" y2="${y + 12}" stroke="${P.ink}" stroke-width="2.5"/>` +
    T(x + 100, y + 34, label, { s: 14, m: mono });
  const boxesPic = svg(600, 300, 'Three moving boxes labelled stuff, misc and things, next to three boxes labelled kitchen plates, bathroom towels and bedroom books',
    T(150, 34, 'VAGUE LABELS', { s: 12.5, f: P.danger }) + T(450, 34, 'CLEAR LABELS', { s: 12.5, f: P.ok }) +
    `<line x1="300" y1="24" x2="300" y2="286" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    ['stuff', 'misc', 'things'].map((s, i) => crate(50, 54 + i * 64, P.dangerT, s)).join('') +
    ['kitchen: plates', 'bathroom: towels', 'bedroom: books'].map((s, i) => crate(350, 54 + i * 64, P.okT, s)).join('') +
    T(150, 262, 'open every box to find the plates', { s: 13, w: 700, f: P.ink2 }) +
    T(450, 262, 'walk straight to the right box', { s: 13, w: 700, f: P.ink2 }));

  const crypticCode = [
    'def calc(x, y, f):',
    '    t = x * y',
    '    if f:',
    '        t = t - t * 0.10',
    '    t2 = t + t * TAX_RATE',
    '    return t'
  ];
  const renamedCode = [
    'def order_total(cookie_count, cookie_price,',
    '                has_loyalty_card):',
    '    subtotal = cookie_count * cookie_price',
    '    if has_loyalty_card:',
    '        subtotal = subtotal - subtotal * 0.10',
    '    total_with_tax = subtotal + subtotal * TAX_RATE',
    '    return subtotal'
  ];
  const fixedCode = renamedCode.slice(0, 6).concat(['    return total_with_tax']);

  const decoderRows = [['x', 'number of cookies'], ['y', 'price of one cookie'], ['f', 'has a loyalty card? (yes or no)'], ['t', 'total before tax'], ['t2', 'total with tax']];
  const decoderPic = svg(600, 250, "Maya's decoder note: x is the number of cookies, y is the price of one cookie, f is whether the customer has a loyalty card, t is the total before tax, t2 is the total with tax",
    box(90, 14, 420, 222, P.warnT, 14) +
    T(118, 46, "Maya's decoder note", { s: 15, a: 'start' }) +
    decoderRows.map((r, i) => {
      const y = 62 + i * 33;
      return `<rect x="118" y="${y}" width="44" height="25" rx="6" fill="#15132B"/>` +
        T(140, y + 18, r[0], { s: 13.5, m: true, f: '#FFC24B' }) +
        T(176, y + 18, '=  ' + r[1], { s: 13.5, w: 700, a: 'start' });
    }).join(''));
  const codePic = `<div style="width:100%">${code(crypticCode, { title: 'orders.py' })}${decoderPic}</div>`;

  const painPic = `<div style="width:100%">${code(crypticCode, { title: 'orders.py' })}` +
    svg(600, 176, '10 cookies at 3 dollars with a loyalty card should cost 29 dollars 43. The customer was charged 27 dollars.',
      T(300, 24, '10 cookies at $3, with a loyalty card', { s: 13.5 }) +
      box(40, 42, 200, 76, P.dangerT, 14) + T(140, 86, '$27.00', { s: 26, m: true, f: P.danger }) + T(140, 108, 'charged', { s: 12.5, w: 700, f: P.ink2 }) +
      `<circle cx="300" cy="80" r="26" fill="${P.dangerT}" stroke="${P.ink}" stroke-width="2.5"/>` + T(300, 91, '≠', { s: 30, f: P.danger }) +
      box(360, 42, 200, 76, P.white, 14) + T(460, 86, '$29.43', { s: 26, m: true }) + T(460, 108, 'should be', { s: 12.5, w: 700, f: P.ink2 }) +
      T(300, 156, '$30.00, less 10% is $27.00, plus 9% tax is $29.43', { s: 12.5, w: 700, f: P.ink2 })) + `</div>`;

  // The long first line needs room, so this picture is drawn slightly smaller.
  const fixPic = `<div style="width:100%;min-width:0">${code(renamedCode, { title: 'orders.py, after renaming', bad: [7] })}${code(fixedCode, { title: 'orders.py, fixed', good: [7] })}</div>`;

  const guideRows = [
    ['x', 'cookie_count', 'say what it holds'],
    ['data', 'order', "use the shop's own words"],
    ['flag', 'has_loyalty_card', 'yes or no reads as a question'],
    ['receipt()', 'print_receipt()', 'a job that acts gets a doing word'],
    ['ck_pr', 'cookie_price', 'no short forms you must explain']
  ];
  const guidePic = svg(600, 318, 'Five poor names and a better name for each: x becomes cookie_count, data becomes order, flag becomes has_loyalty_card, receipt becomes print_receipt, ck_pr becomes cookie_price',
    T(75, 28, 'POOR', { s: 12.5, f: P.danger }) + T(250, 28, 'BETTER', { s: 12.5, f: P.ok }) + T(380, 28, 'WHY', { s: 12.5, f: P.ink2, a: 'start' }) +
    guideRows.map((r, i) => {
      const y = 44 + i * 54;
      return box(20, y, 110, 38, P.dangerT, 10) + T(75, y + 25, r[0], { s: 13, m: true, f: P.danger }) +
        arrow(138, y + 19, 164, y + 19, P.ink, 2.5) +
        box(172, y, 186, 38, P.okT, 10) + T(265, y + 25, r[1], { s: 13, m: true, f: P.ok }) +
        T(380, y + 24, r[2], { s: 12.5, w: 700, f: P.ink2, a: 'start' });
    }).join(''));

  const lengthPic = svg(600, 290, 'Three names for the same value. t is too short, subtotal is just right, and a 45 letter name is too long.',
    [['TOO SHORT', 't', 'you have to decode it', P.dangerT, P.danger],
     ['JUST RIGHT', 'subtotal', 'you read it once', P.okT, P.ok],
     ['TOO LONG', 'the_total_price_of_all_the_cookies_before_tax', 'you have to wade through it', P.dangerT, P.danger]].map((r, i) => {
      const y = 16 + i * 92;
      return T(40, y + 16, r[0], { s: 12.5, f: r[4], a: 'start' }) + T(560, y + 16, r[2], { s: 12.5, w: 700, f: P.ink2, a: 'end' }) +
        box(40, y + 26, 520, 44, r[3], 10) + T(300, y + 54, r[1], { s: i === 2 ? 13.5 : 16, m: true, f: r[4] });
    }).join(''));

  COURSE.add({
    id: 'l12', minutes: 8,
    summary: 'A name is the cheapest documentation there is. A <b>meaningful name</b> says what a thing is or does, so nobody has to decode it.',
    video: {
      src: 'videos/l12-meaningful-names.mp4', poster: 'videos/l12-meaningful-names.jpg', length: '1 min 3 s',
      script: [
        'Maya opens a file she wrote 6 months ago. She cannot read it.',
        'A job called calc. Values called x, y and f. The names say nothing.',
        'So she traces every line, and writes a decoder note. X is the number of cookies. Y is the price. F means a loyalty card. And so on.',
        'And there is a bug. Totals come out too low. Maya reads it 3 times and sees nothing.',
        'So she renames things. Cookie count. Cookie price. Has loyalty card. Subtotal. Total with tax. And the job: order total.',
        'The note goes in the bin. The code explains itself.',
        'Now look at the last line. It hands back the subtotal, not the total with tax. With honest names, the bug is plain to see.',
        'One small fix.',
        'That is the point of meaningful names. A good name says what a thing is, so nobody has to decode it.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: boxesPic,
        h: 'Label the box.',
        text: [
          'You are moving house. Three boxes say "stuff", "misc" and "things". To find the plates, you have to <b>open every box</b>. Now picture the same boxes labelled "kitchen: plates". You walk straight to the right one.',
          'Code is full of labels too. Every value and every job has a <b>name</b>. A name is the cheapest documentation there is, because the reader sees it on every line where the thing is used.',
          'A <b>meaningful name</b> says what a thing <b>is</b> or what it <b>does</b>, in the words the shop already uses. Then the reader does not have to open the box.'
        ],
        tip: 'Lesson 11, Least astonishment, was about code keeping the promise its name makes. This lesson is one step earlier: <b>choosing</b> the name.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'Six lines Maya cannot read.',
        text: [
          'Six months ago Maya wrote a small file for phone orders, <code>orders.py</code>. Today she opens it again. It is one short job, and she cannot say what it does.',
          'Look at the names: <code>calc</code>, <code>x</code>, <code>y</code>, <code>f</code>, <code>t</code>, <code>t2</code>. You saw one-letter names in lesson 5, in <code>is_open(d, h)</code>. Here the whole job is made of them.',
          'So Maya traces every line and writes a <b>decoder note</b>. Line 2 multiplies <code>x</code> by <code>y</code>, so those must be the number of cookies and the price of one. On line 3, <code>if f:</code> runs the pushed-in line only when <code>f</code> is yes, so <code>f</code> holds a yes or a no. Line 4 takes 10% off, which is the loyalty card discount. Line 5 adds the tax. (<code>TAX_RATE</code> is still 0.09, from lesson 1.)',
          'The note took ten minutes to write. And it lives on paper, <b>not in the code</b>. The next reader will have to work it all out again.'
        ]
      },
      {
        label: 'The pain', pic: painPic,
        h: 'A bug in plain sight.',
        text: [
          'There is a bigger problem. Since a quick edit last week, phone orders come out <b>too low</b>. A customer with a loyalty card orders 10 cookies at $3 and is charged <b>$27.00</b>. It should be <b>$29.43</b>.',
          'Maya reads the six lines three times. Every line looks reasonable. Some letters are multiplied. Some are added. A letter is handed back.',
          'The bug is on the screen the whole time. But <code>t</code> and <code>t2</code> are both just "some total". When two names mean nothing, mixing them up <b>looks like nothing</b>.'
        ],
        warn: 'Nothing crashed. And Maya wrote this code herself. A name that needs a decoder fools its own author once the decoder is forgotten.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Rename, one at a time.',
        text: [
          'Maya changes no sums. She only <b>renames</b>, one name at a time, straight from her note. <code>x</code> becomes <code>cookie_count</code>. <code>f</code> becomes <code>has_loyalty_card</code>. <code>t</code> becomes <code>subtotal</code>, the shop\'s word for a total before tax. The job itself becomes <code>order_total</code>.',
          'Line 1 is now too long for one line, so it carries on into line 2. Python allows that inside brackets.',
          'Now read the last line of the top picture. A job called <code>order_total</code> hands back the <b>subtotal</b>. And <code>total_with_tax</code>, worked out one line above, is <b>never used</b>. The bug that hid for a week is plain to see.',
          'The fix is one word. And the decoder note can go in the bin, because every row of it now lives <b>in the code</b>.'
        ],
        tip: 'If you feel the need to write a note like <code>x = 4  # number of cookies</code>, that is a sign. Put the note <b>into the name</b>. Renaming is cheap, and most code editors can rename a thing everywhere in one step.'
      },
      {
        label: 'The test', pic: guidePic,
        h: 'Guess from the name alone.',
        text: [
          'Point at any name and ask: <b>"Can I guess what this is from the name alone, without reading how it is used?"</b>',
          'A few habits make the answer yes. Say what the thing <b>holds</b>. Use the <b>shop\'s own words</b>, like order and subtotal. Give a yes or no value a name that reads like a <b>question</b>: <code>has_loyalty_card</code>, <code>is_open</code>.',
          'A job that does something gets a <b>doing word</b>: <code>print_receipt</code>, <code>charge_card</code>. A job that only hands back an answer can be named after the answer, like <code>order_total</code>.',
          'And the name must stay <b>true</b>. If <code>total_with_tax</code> ever stops including the tax, the name has become a lie. That was lesson 11, Least astonishment.'
        ]
      },
      {
        label: 'When not to', pic: lengthPic,
        h: 'Longer is not always better.',
        text: [
          '<b>A name can say too much.</b> <code>the_total_price_of_all_the_cookies_before_tax</code> is honest, and it buries every line it appears on. <code>subtotal</code> says the same thing in one word.',
          '<b>Leave out what the reader can already see.</b> <code>cookie_price_number</code> adds nothing, because a price is always a number.',
          '<b>Short names are fine in a small space.</b> In lesson 10 the loop said <code>for amount in sales:</code>. In a loop of two lines, even <code>for s in sales:</code> would do, because you can see both lines at once. The further a name travels, the more it has to say.',
          '<b>A good name cannot rescue a job that does too much.</b> If the only honest name is <code>charge_card_and_print_receipt_and_add_points</code>, the name is not the problem. The job is. That is module 2: lesson 16, Single responsibility, and lesson 17, Small functions.'
        ],
        warn: 'In lesson 4, Trade-offs, not laws, Maya gave names to things that needed none, like <code>EXCLAMATION_MARK</code>. This lesson does not ask you to <b>add</b> names. It asks that the names you already have are good ones.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'Read only this code. What does <code>proc</code> work out?',
        pic: code([
          'def proc(a, b):',
          '    r = a - b',
          '    return r'
        ], { title: 'till.py' }),
        options: ['The change to hand back to a customer', 'How many cookies are left on the tray', 'The price after a discount', 'You cannot tell. The names do not say'],
        answer: 3,
        why: 'All three guesses fit the sums. Only the names could tell you which one is meant, and these names say nothing. Call it <code>change_due(amount_paid, price)</code> and nobody has to guess.',
        hint: 'Could each of the first three answers be true? What would you need to know to choose?'
      },
      {
        type: 'type', q: 'Use Maya\'s decoder: <code>x</code> is the number of cookies, <code>y</code> is the price of one, <code>f</code> is the loyalty card. A customer with <b>no</b> card orders 4 cookies at $3. What number does this job hand back?',
        pic: code(crypticCode, { title: 'orders.py' }),
        prompt: 'hands back >',
        answers: ['12', '12.00', '12.0', '$12', '$12.00'],
        why: '<code>t</code> is 4 times 3, which is 12. There is no card, so line 4 is skipped. Line 5 works out <code>t2</code> as 12 plus $1.08 tax, which is $13.08. But line 6 hands back <code>t</code>, so the answer is 12. The tax is lost. Notice how much decoding that took.',
        hint: 'Work out <code>t</code> on line 2. Then look very carefully at which letter line 6 hands back.'
      },
      {
        type: 'pick', q: 'Members should pay the lower fee. One line hands back the wrong thing. Which line?',
        pic: code([
          'def delivery_cost(distance_km, is_member):',
          '    full_fee = 2 + distance_km * 0.50',
          '    member_fee = full_fee - 1',
          '    if is_member:',
          '        return full_fee',
          '    return full_fee'
        ], { title: 'delivery.py' }),
        options: ['Line 2', 'Line 3', 'Line 5', 'Line 6'],
        answer: 2,
        why: 'Read lines 4 and 5 aloud: "if is member, return full fee". It sounds wrong at once. Line 5 should hand back <code>member_fee</code>. With names like <code>a</code> and <code>a2</code> you would have had to trace every line.',
        hint: 'Read each line aloud as a sentence. Which sentence does not match what members should pay?'
      },
      {
        type: 'fill', q: 'A customer pays with a $20 note for a $12 order. This job works out the money to hand back. Fill in names that explain themselves.',
        text: 'def ___(amount_paid, price):\n    change = ___ - ___\n    return change',
        options: ['change_due', 'amount_paid', 'price', 'calc', 'x', 'flag'],
        answer: ['change_due', 'amount_paid', 'price'],
        why: '20 minus 12 leaves $8 of change. Now the job reads like a sentence: the change due is the amount paid minus the price.',
        hint: 'The first blank is the name of the job. For the other two, which number is taken away from which?'
      },
      {
        type: 'bucket', q: 'Meaningful name, or a name that needs a decoder?',
        buckets: ['Meaningful', 'Needs a decoder'],
        items: [
          ['has_loyalty_card', 0],
          ['cookie_price', 0],
          ['print_receipt', 0],
          ['tmp2', 1],
          ['do_stuff', 1],
          ['data', 1],
          ['flag', 1]
        ],
        why: 'Each name on the left tells you what it holds or does. Each name on the right could be anything at all.'
      },
      {
        type: 'match', q: 'Match each name to the habit it shows.',
        pairs: [
          ['is_open', 'A yes or no value. The name reads like a question'],
          ['print_receipt', 'A job that does something. The name starts with a doing word'],
          ['subtotal', "A thing, named with the shop's own word for it"],
          ['s', 'Fine only when it lives for two lines']
        ],
        why: 'Questions for yes or no values. Doing words for jobs that act. The shop\'s words for things. And very short names only in a very small space.'
      },
      {
        type: 'pick', q: 'Which of these names are overdone? Pick all that apply.',
        options: ['the_price_of_one_cookie_in_the_shop_today', 'cookie_price_number', 'cookie_price', 'has_loyalty_card'],
        answer: [0, 1],
        why: 'The first buries the line it sits on. The second adds a fact the reader can already see. <code>cookie_price</code> says the same thing as both. A name should be as long as it needs to be, and no longer.',
        hint: 'Two of these say more than the reader needs.'
      },
      {
        type: 'pick', q: 'Back to lesson 4, Trade-offs, not laws. There, Maya went too far and gave a name to an exclamation mark. Is renaming <code>x</code> to <code>cookie_count</code> the same mistake?',
        options: [
          'Yes. Any work on names is overdoing it',
          'No. The value already has a name, and a clearer one costs the next reader less',
          'Yes. Longer names always cost more to read',
          'No. Every value in a program should get its own name and its own file'
        ],
        answer: 1,
        why: 'Ask lesson 4\'s two questions. Is the problem real right now? Yes, a bug hid behind these names. What does the fix cost the next reader? Nothing. It saves them a decoder note. In lesson 4 Maya added new names and new files that nobody needed. Here nothing is added at all.',
        hint: 'Lesson 4 asked: is this problem real right now, and what will this cost the next reader?'
      }
    ]
  });
})();
