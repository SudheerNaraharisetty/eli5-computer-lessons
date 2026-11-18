/* Lesson 25: Law of Demeter (module 3). One file per lesson. */
(function () {
  const { P, code, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l25  Law of Demeter
     ===================================================================== */

  /* ---- The idea: ask your friend, do not go through her phone ---- */
  const cross = (x, y) => `<line x1="${x - 9}" y1="${y - 9}" x2="${x + 9}" y2="${y + 9}" stroke="${P.danger}" stroke-width="4" stroke-linecap="round"/><line x1="${x + 9}" y1="${y - 9}" x2="${x - 9}" y2="${y + 9}" stroke="${P.danger}" stroke-width="4" stroke-linecap="round"/>`;
  const ideaPic = svg(600, 330, 'Top row: you ask your friend Ana, and Ana asks her plumber. Bottom row: you reach past Ana, through her phone, straight to her plumber.',
    T(300, 26, 'ASK YOUR FRIEND', { s: 12.5, f: P.ok }) +
    box(40, 42, 120, 50, P.white, 12) + T(100, 73, 'you', { s: 15 }) +
    box(240, 42, 120, 50, P.okT, 12) + T(300, 73, 'Ana', { s: 15, f: P.ok }) +
    box(440, 42, 120, 50, P.white, 12) + T(500, 73, 'her plumber', { s: 14 }) +
    arrow(168, 67, 232, 67, P.ok, 3) + arrow(368, 67, 432, 67, P.ok, 3) +
    T(200, 116, 'you ask Ana', { s: 12.5, w: 700, f: P.ink2 }) + T(400, 116, 'Ana asks him', { s: 12.5, w: 700, f: P.ink2 }) +
    `<line x1="30" y1="146" x2="570" y2="146" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    T(300, 178, 'REACH THROUGH YOUR FRIEND', { s: 12.5, f: P.danger }) +
    box(40, 232, 120, 50, P.white, 12) + T(100, 263, 'you', { s: 15 }) +
    box(240, 232, 120, 50, P.dangerT, 12) + T(300, 256, "Ana's phone", { s: 13.5, f: P.danger }) + T(300, 273, 'her contacts', { s: 11.5, w: 700, f: P.ink2 }) +
    box(440, 232, 120, 50, P.white, 12) + T(500, 263, 'her plumber', { s: 14 }) +
    `<path d="M100 226 C150 176 440 176 492 220" fill="none" stroke="${P.danger}" stroke-width="3.5" stroke-linecap="round"/><path d="M500 228 L483 222 L494 210 Z" fill="${P.danger}"/>` +
    T(300, 312, 'Now you depend on how Ana keeps her contacts.', { s: 13, w: 700, f: P.ink2 }));

  /* ---- The code: three files walk the same chain ---- */
  const chainCode = [
    '# till.py',
    'def checkout(order):',
    '    if order.customer.card.balance() >= 30:',
    '        offer_free_cookie(order)',
    '',
    '# website.py',
    'def order_page(order):',
    '    display(order.customer.card.balance())',
    '',
    '# refund.py',
    'def refund(order):',
    '    order.customer.card.spend(order.price)'
  ];
  const stops = [['till', P.tint], ['order', P.white], ['customer', P.white], ['card', P.white]];
  const chainMap = svg(600, 216, 'The till is handed an order. To reach the balance it goes through the order, through the customer and into the card. Three dots, three steps deeper.',
    T(300, 20, 'ONE LINE OF THE TILL, ONE DOT AT A TIME', { s: 12.5, f: P.ink2 }) +
    `<path d="M78 96 C150 34 480 34 520 92" fill="none" stroke="${P.danger}" stroke-width="3.5" stroke-linecap="round"/><path d="M527 100 L509 95 L520 82 Z" fill="${P.danger}"/>` +
    stops.map((s, i) => { const x = 22 + i * 148; return box(x, 100, 112, 44, s[1], 12) + T(x + 56, 128, s[0], { s: 14, f: i ? P.ink : P.accent }); }).join('') +
    [1, 2, 3].map(i => { const x = 22 + i * 148 - 18; return `<circle cx="${x}" cy="122" r="13" fill="${P.dangerT}" stroke="${P.ink}" stroke-width="2.5"/>` + T(x, 127, String(i), { s: 13, f: P.danger }); }).join('') +
    T(78, 170, 'is handed', { s: 12, w: 700, f: P.ink2 }) + T(78, 186, 'an order', { s: 12, w: 700, f: P.ink2 }) +
    T(226, 176, 'order', { s: 13, m: true }) + T(374, 176, '.customer', { s: 13, m: true }) + T(522, 176, '.card', { s: 13, m: true }) +
    T(300, 208, 'Each dot steps one object deeper. Then .balance() asks the question.', { s: 12.5, w: 700, f: P.ink2 }));
  const codePic = `<div style="width:100%">${code(chainCode, { title: 'three files in the shop', hi: [3, 8, 12] })}${chainMap}</div>`;

  /* ---- The pain: the card moves into a household ---- */
  const brokenCode = chainCode.map((l, i) => (i === 2 || i === 7) ? l.replace('customer.card', 'customer.household.card') : l);
  const painPic = `<div style="width:100%">${code(brokenCode, { title: 'after the family card: two fixed, one missed', good: [3, 8], bad: [12] })}` +
    term(['$ refund(order)', "AttributeError: 'Customer' object has no attribute 'card'"], 'a week later, at the counter') +
    svg(600, 96, 'One change inside Customer forced edits in three other files. Two were made and one was missed.',
      box(30, 16, 150, 44, P.warnT, 12) + T(105, 44, '1 change in Customer', { s: 12.5 }) +
      ['till.py', 'website.py', 'refund.py'].map((s, i) => {
        const x = 250 + i * 116;
        return arrow(186, 38, x - 6, 38, i === 2 ? P.danger : P.ok, 2.5) + box(x, 16, 100, 44, i === 2 ? P.dangerT : P.okT, 12) + T(x + 50, 44, s, { s: 12.5, f: i === 2 ? P.danger : P.ok, m: true });
      }).join('') +
      T(300, 88, 'Three other files had to change. Maya missed the third.', { s: 12.5, w: 700, f: P.ink2 })) + `</div>`;

  /* ---- The fix: each one asks its neighbour ---- */
  const fixCode = [
    '# till.py',
    'def checkout(order):',
    '    if order.can_have_free_cookie():',
    '        offer_free_cookie(order)',
    '',
    '# order.py',
    'class Order:',
    '    def can_have_free_cookie(self):',
    '        return self.customer.can_have_free_cookie()',
    '',
    '# customer.py',
    'class Customer:',
    '    def can_have_free_cookie(self):',
    '        return self.card.balance() >= 30'
  ];
  const familyCode = [
    '# household.py, new',
    'class Household:',
    '    def balance(self):',
    '        return self.card.balance()',
    '',
    '# customer.py, one line changed',
    'class Customer:',
    '    def can_have_free_cookie(self):',
    '        return self.household.balance() >= 30'
  ];
  const whisperPic = svg(600, 150, 'The till asks the order. The order asks the customer. The customer asks its card. The answer, yes, is passed back the same way.',
    stops.map((s, i) => { const x = 22 + i * 148; return box(x, 40, 112, 44, i ? P.white : P.tint, 12) + T(x + 56, 68, s[0], { s: 14, f: i ? P.ink : P.accent }); }).join('') +
    [0, 1, 2].map(i => { const x = 138 + i * 148; return arrow(x, 52, x + 28, 52, P.accent, 2.5) + arrow(x + 28, 72, x, 72, P.ok, 2.5); }).join('') +
    T(300, 22, 'asks one neighbour', { s: 12.5, f: P.accent }) + T(300, 112, 'the answer comes back: yes', { s: 12.5, f: P.ok }) +
    T(300, 140, 'Nobody reaches past the one next to them.', { s: 12.5, w: 700, f: P.ink2 }));
  const fixPic = `<div style="width:100%">${code(fixCode, { title: 'each one asks its neighbour', good: [3, 9, 14] })}${whisperPic}${code(familyCode, { title: 'later, when the family card arrives', good: [9] })}</div>`;

  /* ---- The test: count the dots, then ask the real question ---- */
  const testRow = (y, src, note, ok) => box(24, y, 552, 54, ok ? P.okT : P.dangerT, 12) +
    T(40, y + 33, src, { s: 13.5, m: true, a: 'start' }) + T(560, y + 33, note, { s: 12.5, a: 'end', f: ok ? P.ok : P.danger });
  const testPic = svg(600, 300, 'Three lines of code. A chain through two other objects is reaching through. Asking the thing you were handed is fine. Asking your own part is fine.',
    T(300, 26, 'AM I REACHING THROUGH ONE THING INTO ANOTHER?', { s: 12.5, f: P.ink2 }) +
    testRow(44, 'order.customer.card.balance()', 'yes: through 2 objects', false) +
    testRow(116, 'order.can_have_free_cookie()', 'no: asks what it was handed', true) +
    testRow(188, 'self.card.balance()', 'no: asks its own part', true) +
    T(300, 270, 'The dots are the alarm. The question is the test.', { s: 13.5 }) +
    T(300, 290, 'They have 3 dots, 1 dot and 2 dots. Only the first reaches through.', { s: 12.5, w: 700, f: P.ink2 }));

  /* ---- When not to ---- */
  const wrapperCode = [
    'class Order:',
    '    def get_customer_card_points(self):',
    '        return self.customer.get_card_points()',
    '    def get_customer_card(self):',
    '        return self.customer.get_card()',
    '    def get_customer_name(self):',
    '        return self.customer.get_name()',
    '    def get_customer_phone(self):',
    '        return self.customer.get_phone()',
    '',
    '# the till still knows the whole route',
    'if order.get_customer_card_points() >= 30:'
  ];
  const fineCode = [
    'city = order.address.city',
    'name = typed_name.strip().lower()'
  ];
  const whenNotPic = `<div style="width:100%">${code(fineCode, { title: 'chains that are fine', good: [1, 2] })}${code(wrapperCode, { title: 'order.py, the rule obeyed by machine', bad: [2, 4, 6, 8, 12] })}</div>`;

  COURSE.add({
    id: 'l25', minutes: 9,
    summary: 'A piece of code should only talk to the things it holds or is handed. It should not reach <b>through</b> them into their insides. That is the <b>Law of Demeter</b>. Every extra step in a chain of dots is one more fact about how someone else is built.',
    video: {
      src: 'videos/l25-law-of-demeter.mp4', poster: 'videos/l25-law-of-demeter.jpg', length: '1 min 1 s',
      script: [
        "Maya's till has one question. Can this customer have a free cookie?",
        'Here is how it asks. Order, dot, customer, dot, card, dot, balance. Every dot reaches one step deeper. Past the order. Past the customer. Into the card.',
        'So the till has to know how everyone in the line is built.',
        'Then Maya lets a family share one card. The card moves, into a household.',
        'The long arm grabs at the old spot, and finds nothing. The website and the refund job made the same reach. They break too.',
        'The fix. Each one talks only to its neighbour. The till asks the order. The order asks the customer. The customer asks its card. And the answer comes back down the line. Yes.',
        'Now bring the household back. Only the customer gets a new neighbour. The till never notices.',
        'That is the Law of Demeter. Only talk to your close friends.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: "Ask your friend. Don't go through her phone.",
        text: [
          'Your tap is leaking. Your friend Ana knows a good plumber. So you <b>ask Ana</b>, and Ana calls him. You do not take Ana\'s phone, open her contacts and scroll until you find him.',
          'Asking is polite. It is also safer for you. If Ana changes her phone, or finds a better plumber, you never notice. You only ever knew one thing: Ana can get a tap fixed.',
          'The <b>Law of Demeter</b> brings this to code. A piece of code should only talk to its <b>close friends</b>: its own data, its own parts, the things it is handed, and the things it makes itself. It should not reach <b>through</b> one of those to get at that thing\'s parts.'
        ],
        tip: 'Module 2 shaped one piece of code at a time. Module 3 is about how pieces talk to each other. This lesson is a rule you can check for the big idea of lesson 3, Loose coupling. The name comes from the Demeter project, a research project at Northeastern University in the 1980s. It is also called the <b>principle of least knowledge</b>.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'Three dots to ask one question.',
        text: [
          'The till wants to know one thing: can this customer have a free cookie? That takes 30 points, as in lesson 2. The lines starting with <code>#</code> show where each file begins, as in lesson 4.',
          'Read line 3 from left to right. In lesson 3, a dot meant "reach inside". <code>order</code> is what the till was handed. <code>.customer</code> reaches inside the order for its customer. <code>.card</code> reaches inside that customer for their loyalty card. Then <code>.balance()</code> asks the card for its points, as in lesson 19.',
          'Three dots. <b>Each dot steps one object deeper.</b> Programmers call a long chain like this a <b>train wreck</b>, because it looks like a row of carriages run into each other.',
          'So to ask one question, the till has to know two facts about how other things are built: an order holds a customer, and a customer holds a card. The website and the refund job walk the same route, on lines 8 and 12.'
        ],
        tip: 'The till does use the card\'s proper door, <code>balance()</code>. So lesson 19, Encapsulation, is obeyed. The problem here is a different one. It is not what happens at the end of the chain. It is <b>the route</b> the till takes to get there.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'The card moves. Three files break.',
        text: [
          'Customers ask Maya: can my family share one card? She likes the idea. A customer now belongs to a <b>household</b>, and the household holds the card. So <code>customer.card</code> is gone. The route is now <code>customer.household.card</code>.',
          'Nothing about the till\'s question has changed. But every line that walked the old route is now wrong. Maya fixes <code>till.py</code> and <code>website.py</code>. She forgets <code>refund.py</code>, because refunds are rare.',
          'A week later a customer brings back a cake. The refund job stops with an error. <code>AttributeError</code> is Python\'s way of saying: I looked inside this customer for a <code>card</code>, and there is no such thing. The customer waits at the counter while Maya searches her files.'
        ],
        warn: 'Where a customer keeps their card should be the customer\'s own business. But three other files had the map of the customer\'s insides written into them. Ask lesson 1\'s question: if this one thing changes, how many places must I touch? Three files, and it is easy to miss one.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Each one asks its neighbour.',
        text: [
          'The till stops walking the route. It asks the one thing it was handed: <code>order.can_have_free_cookie()</code>. One dot. A plain question, with a yes or no answer.',
          'The order does not know the answer. But it has a close friend who might: its own customer. You met <code>class</code> and <code>self</code> in lesson 19. <code>self.customer</code> means "this order\'s own customer". So line 9 passes the question on. The customer asks its own card on line 14, and the answer travels back the same way.',
          'Each piece now knows <b>one neighbour</b>. Only the customer knows where its card is kept.',
          'Now the family card arrives. Maya writes the new <code>Household</code> class, which she had to write anyway. Then she changes <b>one line</b> in <code>customer.py</code>: the customer asks its household, not its card. The till, the order and the website are not opened. There is nothing to miss.'
        ],
        tip: 'The website and the refund job get the same cure. Each asks the order for what it really wants. Notice what the till did here: it stopped fetching the card and started asking for <b>the answer it needed</b>. That move goes further, and it has a name: the next lesson, Tell, don\'t ask.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Count the dots. Then ask the real question.',
        text: [
          'A long chain of dots is the alarm bell. When you see one, ask: <b>"Am I reaching through one thing into another thing\'s insides?"</b>',
          'Try <code>order.customer.card.balance()</code>. The till was handed the order. It reaches through the order, and then through the customer. Yes.',
          'Try <code>order.can_have_free_cookie()</code>. The till asks the thing it was handed. No.',
          'Now a tricky one: <code>self.card.balance()</code>, inside <code>Customer</code>. It has two dots. But <code>self</code> is the customer itself, and the card is its own part. That is one step to a close friend. No.'
        ],
        tip: 'A second way to ask it: "If the thing in the middle of this chain changed how it is built, would my line break?" If yes, your line knows too much.'
      },
      {
        label: 'When not to', pic: whenNotPic,
        h: 'It is not really about counting dots.',
        text: [
          '<b>Plain facts are fine.</b> A delivery address is a bundle of facts: street, city, postcode. It has no rules to protect and no jobs to do. Reading <code>order.address.city</code> is fine. Lesson 19 said the same: a simple bundle of facts can stay plain.',
          '<b>Chains that stay on the same kind of thing are fine.</b> In line 2 of the top picture, <code>.strip()</code> trims the spaces off both ends of a piece of text, and <code>.lower()</code> turns it into small letters. Each step hands back text, so you never go deeper into anyone\'s insides. You are still talking to the same kind of friend.',
          '<b>Do not obey the rule by machine.</b> Suppose Maya loves this lesson and gives <code>Order</code> a pass-through job for every inner part. Line 12 of the second picture has only one dot now. But read the name: get, customer, card, points. The whole route is still there. It has only moved from the dots into the name. When the household arrives, that name is wrong everywhere it is used. And <code>Order</code> has grown eight lines that do nothing but pass things along.'
        ],
        warn: 'The cure is not "fetch the inner part for me through a longer name". The cure is to ask your neighbour <b>the real question</b>, like <code>can_have_free_cookie()</code>, or to ask it to do the job. And "law" is a big word. Like every principle since lesson 4, Trade-offs, not laws, it is a rule of thumb.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'This job is handed a <code>shop</code>. Which line reaches <b>through</b> one thing into another thing\'s insides?',
        pic: code([
          'def closing_report(shop):',
          '    print_paper(shop.name)',
          '    print_paper(shop.todays_total())',
          '    print_paper(shop.till.drawer.cash)',
          '    print_paper(shop.is_open())'
        ], { title: 'report.py' }),
        options: ['Line 2', 'Line 3', 'Line 4', 'Line 5'],
        answer: 2,
        why: 'Line 4 goes through the shop, into its till, into the till\'s drawer. If the till ever keeps its cash somewhere else, this report breaks. The other lines ask the shop itself.',
        hint: 'Look for the longest chain of dots, then check what it passes through.'
      },
      {
        type: 'bucket', q: 'Talking to a close friend, or reaching through one?',
        buckets: ['Close friend: fine', 'Reaching through'],
        items: [
          ['order.can_have_free_cookie()', 0],
          ['self.card.balance()', 0],
          ['typed_name.strip().lower()', 0],
          ['order.customer.card.balance()', 1],
          ['shop.till.drawer.cash', 1]
        ],
        why: 'Asking the thing you were handed, or your own part, is fine. So is a chain where every step hands back plain text. The last two walk through other objects to get at their parts.',
        hint: 'Two dots are not always a problem. <code>self</code> is the piece itself, and text stays text.'
      },
      {
        type: 'fill', q: 'Finish the fix so each piece only asks its own neighbour.',
        text: 'class Order:\n    def can_have_free_cookie(self):\n        return self.___.can_have_free_cookie()\n\nclass Customer:\n    def can_have_free_cookie(self):\n        return self.___.balance() >= 30',
        options: ['customer', 'card', 'order', 'till'],
        answer: ['customer', 'card'],
        why: 'The order asks its own customer. The customer asks its own card. Nobody skips a neighbour.',
        hint: 'What does an order hold? What does a customer hold?'
      },
      {
        type: 'pick', q: 'After the fix, the family card arrives and the card moves into a household. Apart from the new <code>Household</code> class, which files must Maya change?',
        options: ['till.py, website.py and refund.py', 'Only customer.py', 'order.py and customer.py', 'Every file that uses an order'],
        answer: 1,
        why: 'Only the customer knew where its card was kept. So only the customer has to learn about the household. One line, in one file.',
        hint: 'After the fix, who still knows that a customer holds a card?'
      },
      {
        type: 'order', q: 'Put the story in order.',
        items: ['The till reaches through the order and the customer to the card', 'Maya moves the card into a household', 'Two files are fixed and refund.py is missed', 'A refund crashes at the counter', 'Each piece is changed to ask only its neighbour'],
        why: 'The trap was set by the very first line, long before any family asked to share a card.',
        hint: 'The problem starts with how the till first asked its question.'
      },
      {
        type: 'pick', q: 'This line breaks two principles at once. Which two? One is from lesson 19.',
        pic: code([
          'def reset_points(order):',
          '    order.customer.card._points = 0'
        ], { title: 'admin.py' }),
        options: ['Law of Demeter: it reaches through the order and the customer', 'Encapsulation: it writes the private _points past the card\'s doors', 'DRY: the same rule is written twice', 'YAGNI: it builds a feature nobody asked for'],
        answer: [0, 1],
        why: 'The route is the Demeter problem. The underscore is the encapsulation problem: <code>_points</code> is private, and the card has doors for changing it. One line, two different mistakes.',
        hint: 'One problem is the path the line takes. The other is what it does when it arrives.'
      },
      {
        type: 'pick', q: 'Maya "fixes" the till like this. The till has one dot now. What is still wrong?',
        pic: code([
          'class Order:',
          '    def get_customer_card_points(self):',
          '        return self.customer.get_card_points()',
          '',
          '# till.py',
          'if order.get_customer_card_points() >= 30:'
        ], { title: 'a pass-through job' }),
        options: ['Nothing. One dot means the rule is obeyed.', 'The route has only moved into the name. The till still knows a customer has a card with points.', 'The job is too short to be worth having.', 'It should be written with three dots again.'],
        answer: 1,
        why: 'Get, customer, card, points: the whole chain is still there, spelled with underscores. The till should ask the real question, <code>order.can_have_free_cookie()</code>.',
        hint: 'Read the job\'s name aloud, one word at a time.'
      },
      {
        type: 'match', q: 'Match each principle to the question it asks.',
        pairs: [
          ['Easy to change', 'If one thing changes, how many places must I touch?'],
          ['Loose coupling', 'If this part is swapped, how many other parts must change?'],
          ['Encapsulation', 'Can outside code put this data into a state that makes no sense?'],
          ['Law of Demeter', 'Am I reaching through one thing into another thing\'s insides?']
        ],
        why: 'Lessons 1, 3, 19 and 25. The Law of Demeter is loose coupling made into a rule you can check one line at a time.'
      }
    ]
  });
})();
