/* Lesson 26: Tell, don't ask (module 3). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l26  Tell, don't ask
     ===================================================================== */

  /* ---- The idea: a table for two ---- */
  const ideaPic = svg(600, 290, 'On the left a guest asks for the floor plan and the bookings and then picks a table alone. On the right the guest says a table for two, please, and the waiter, who knows the bookings, decides.',
    T(150, 34, 'ASK, THEN DECIDE YOURSELF', { s: 12.5, f: P.danger }) + T(450, 34, 'TELL', { s: 12.5, f: P.ok }) +
    `<line x1="300" y1="24" x2="300" y2="270" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    box(30, 56, 240, 38, P.white, 10) + T(150, 80, '"Show me the floor plan."', { s: 13 }) +
    box(30, 104, 240, 38, P.white, 10) + T(150, 128, '"Show me the bookings."', { s: 13 }) +
    arrow(150, 148, 150, 176, P.danger, 3) +
    box(50, 182, 200, 44, P.dangerT, 12) + T(150, 209, 'you pick table 7', { s: 14, f: P.danger }) +
    T(150, 254, 'You are doing the waiter\'s job,', { s: 13, w: 700, f: P.ink2 }) + T(150, 272, 'with half of what the waiter knows.', { s: 13, w: 700, f: P.ink2 }) +
    box(330, 56, 240, 38, P.okT, 10) + T(450, 80, '"A table for two, please."', { s: 13, f: P.ok }) +
    arrow(450, 100, 450, 128, P.ok, 3) +
    box(350, 134, 200, 58, P.tint, 12) + T(450, 158, 'the waiter', { s: 15, f: P.accent }) + T(450, 178, 'knows the bookings', { s: 12.5, w: 700, f: P.ink2 }) +
    arrow(450, 198, 450, 220, P.ok, 3) +
    T(450, 240, '"This way."', { s: 14 }) +
    T(450, 266, 'The one who knows decides.', { s: 13, w: 700, f: P.ink2 }));

  /* ---- The code: three polite callers ---- */
  const askCode = [
    'def till_free_cookie(card):',
    '    if card.balance() >= 30:',
    '        card.spend(30)',
    '        give_cookie()',
    '',
    'def website_free_cookie(card):',
    '    if card.balance() >= 30:',
    '        card.spend(30)',
    '        give_cookie()',
    '',
    'def phone_free_cookie(card):',
    '    if card.balance() >= 30:',
    '        card.spend(30)',
    '        give_cookie()'
  ];

  /* ---- The pain: Tuesday ---- */
  const tuesdayCode = [
    'def till_free_cookie(card, day):',
    '    cost = 30',
    '    if day == "Tuesday":',
    '        cost = 20',
    '    if card.balance() >= cost:',
    '        card.spend(cost)',
    '        give_cookie()',
    '',
    'def phone_free_cookie(card):',
    '    if card.balance() >= 30:',
    '        card.spend(30)',
    '        give_cookie()'
  ];
  const ansRow = (y, who, sum, verdict, ok) =>
    box(226, y, 110, 34, P.white, 10) + T(281, y + 22, who, { s: 13 }) +
    T(352, y + 22, sum, { s: 13.5, m: true, a: 'start', f: P.ink2 }) +
    box(468, y, 108, 34, ok ? P.okT : P.dangerT, 10) + T(522, y + 22, verdict, { s: 13, f: ok ? P.ok : P.danger });
  const answersPic = svg(600, 196, 'Ana has 24 points on a Tuesday. The till and the website compare 24 with 20 and give a cookie. Phone orders compare 24 with 30 and say no.',
    box(24, 40, 170, 104, P.tint, 16) + T(109, 68, "Ana's card", { s: 13, f: P.accent }) + T(109, 106, '24', { s: 30, m: true }) + T(109, 130, 'points, on a Tuesday', { s: 12, w: 700, f: P.ink2 }) +
    ansRow(26, 'till', '24 >= 20', 'cookie', true) +
    ansRow(74, 'website', '24 >= 20', 'cookie', true) +
    ansRow(122, 'phone', '24 >= 30', 'no cookie', false) +
    T(300, 186, 'Same card. Same day. Two answers.', { s: 13, f: P.danger }));
  const painPic = `<div style="width:100%">${code(tuesdayCode, { title: 'shop.py after the Tuesday offer. The website got the same edit as the till', good: [2, 3, 4], bad: [10] })}${answersPic}</div>`;

  /* ---- The fix: the card decides ---- */
  const cardCode = [
    'class LoyaltyCard:',
    '    _points = 0',
    '',
    '    def balance(self):',
    '        return self._points',
    '',
    '    # earn and spend stay as in lesson 19',
    '',
    '    def redeem_free_cookie(self, day):',
    '        cost = 30',
    '        if day == "Tuesday":',
    '            cost = 20',
    '        return self.spend(cost)'
  ];
  const tellCode = [
    'def till_free_cookie(card, day):',
    '    if card.redeem_free_cookie(day):',
    '        give_cookie()',
    '',
    'def website_free_cookie(card, day):',
    '    if card.redeem_free_cookie(day):',
    '        give_cookie()',
    '',
    'def phone_free_cookie(card, day):',
    '    if card.redeem_free_cookie(day):',
    '        give_cookie()'
  ];
  const fixPic = `<div style="width:100%">${code(cardCode, { title: 'card.py', good: [9, 10, 11, 12, 13] })}${code(tellCode, { title: 'shop.py, three callers that tell', good: [2, 6, 10] })}</div>`;

  /* ---- The test: where does the "if" sit? ---- */
  const testPic = svg(600, 300, 'On the left the caller asks the card for its points, decides outside the card, and then changes the card. On the right the caller sends one tell, the card decides inside, and answers yes or no.',
    T(150, 30, 'ASK, DECIDE, CHANGE', { s: 12.5, f: P.danger }) + T(450, 30, 'TELL', { s: 12.5, f: P.ok }) +
    `<line x1="300" y1="20" x2="300" y2="282" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    // left
    box(20, 54, 116, 150, P.dangerT, 14) + T(78, 78, 'caller', { s: 13 }) +
    box(32, 108, 92, 40, P.white, 10) + T(78, 126, 'the "if"', { s: 12.5, f: P.danger }) + T(78, 141, 'lives here', { s: 11, w: 700, f: P.ink2 }) +
    box(178, 54, 104, 150, P.white, 14) + T(230, 78, 'card', { s: 13 }) + T(230, 132, '24', { s: 24, m: true }) + T(230, 154, 'just data', { s: 11.5, w: 700, f: P.mute }) +
    arrow(142, 86, 172, 86, P.danger, 2.5) + T(157, 78, '1', { s: 12, f: P.danger }) +
    arrow(172, 128, 142, 128, P.danger, 2.5) + T(157, 120, '2', { s: 12, f: P.danger }) +
    arrow(142, 176, 172, 176, P.danger, 2.5) + T(157, 168, '3', { s: 12, f: P.danger }) +
    T(150, 232, '1 ask   2 decide outside   3 change', { s: 12.5 }) +
    T(150, 254, 'every caller needs its own copy', { s: 12.5, w: 700, f: P.ink2 }) + T(150, 272, 'of the "if"', { s: 12.5, w: 700, f: P.ink2 }) +
    // right
    box(320, 54, 104, 150, P.white, 14) + T(372, 78, 'caller', { s: 13 }) + T(372, 132, 'no "if"', { s: 12.5, w: 700, f: P.mute }) + T(372, 150, 'about points', { s: 12.5, w: 700, f: P.mute }) +
    box(466, 54, 116, 150, P.okT, 14) + T(524, 78, 'card', { s: 13 }) +
    box(478, 92, 92, 34, P.white, 10) + T(524, 114, '24', { s: 17, m: true }) +
    box(478, 136, 92, 40, P.white, 10) + T(524, 154, 'the "if"', { s: 12.5, f: P.ok }) + T(524, 169, 'lives here', { s: 11, w: 700, f: P.ink2 }) +
    arrow(430, 104, 460, 104, P.ok, 2.5) + T(445, 96, 'tell', { s: 11.5, f: P.ok }) +
    arrow(460, 160, 430, 160, P.ok, 2.5) + T(445, 152, 'yes/no', { s: 10.5, f: P.ok }) +
    T(450, 232, 'one tell, one answer', { s: 12.5 }) +
    T(450, 254, 'the decision sits next to', { s: 12.5, w: 700, f: P.ink2 }) + T(450, 272, 'the data it reads', { s: 12.5, w: 700, f: P.ink2 }));

  /* ---- When not to ---- */
  const stuffRow = (y, name, who, ok) =>
    box(40, y, 300, 32, ok ? P.okT : P.dangerT, 10) + T(190, y + 21, name, { s: 13, m: true, f: ok ? P.ok : P.danger }) +
    T(360, y + 21, who, { s: 12.5, w: 700, a: 'start', f: P.ink2 });
  const stuffedPic = svg(600, 232, 'A loyalty card class with five jobs. Only redeem_free_cookie is about points. The other four print, email, work out a delivery fee and write a tax report.',
    T(190, 26, 'LoyaltyCard, after telling it everything', { s: 13 }) +
    stuffRow(40, 'redeem_free_cookie()', 'a points rule. Belongs here', true) +
    stuffRow(78, 'print_receipt_line()', 'changes with the receipt', false) +
    stuffRow(116, 'email_birthday_wish()', 'changes with the emails', false) +
    stuffRow(154, 'delivery_fee()', 'changes with the driver', false) +
    stuffRow(192, 'tax_report()', 'changes with the accountant', false));
  const askFine = [
    'def print_receipt(card, total):',
    '    print_paper("Total: " + str(total))',
    '    print_paper("Points: " + str(card.balance()))',
    '',
    'def delivery_fee(basket, address):',
    '    if basket.total() >= 20 and address.distance() <= 5:',
    '        return 0',
    '    return 4'
  ];
  const limitPic = `<div style="width:100%">${stuffedPic}${code(askFine, { title: 'asking is the right thing here', good: [3, 6] })}</div>`;

  COURSE.add({
    id: 'l26', minutes: 9,
    summary: 'Do not ask an object for its data, make the decision yourself, and then change the object. <b>Tell it what you want</b> and let it decide. The decision belongs <b>next to the data</b> it is about.',
    video: {
      src: 'videos/l26-tell-dont-ask.mp4', poster: 'videos/l26-tell-dont-ask.jpg', length: '1 min 8 s',
      script: [
        "Maya's loyalty card holds a customer's points. A free cookie costs 30 points.",
        '3 places hand out free cookies. The till, the website, and phone orders.',
        'Each one does the same thing. It asks the card, how many points? Then it decides for itself. Then it takes the points.',
        'It looks polite. But count the rule. It lives in 3 places, and none of them is the card.',
        'Then Maya starts a Tuesday offer. 20 points. She updates the till and the website. She misses the phone.',
        'It is Tuesday. Ana has 24 points. At the till, she gets her cookie. On the phone, she is told no. Same card, same day, 2 answers.',
        'The fix. Move the rule inside the card. Now nobody asks and decides. Each place just tells the card: redeem a free cookie. The card checks its own points, and answers yes or no.',
        "That is tell, don't ask. Let the one who holds the data make the decision."
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'A table for two, please.',
        text: [
          'At a restaurant you say: "A table for two, please." You do not ask to see the floor plan and the list of bookings, and then go and seat yourself. The waiter knows which tables are free, so <b>the waiter decides</b>.',
          'Code can make the same mistake. One part <b>asks</b> an object for its data, <b>decides</b> something about that data, and then <b>changes</b> the object. The object is treated like a box of values with no say.',
          '<b>Tell, don\'t ask</b> turns that round. Tell the object <b>what you want done</b>, and let it decide, using the data it already owns. The decision belongs <b>next to the data</b>.'
        ],
        tip: 'Lesson 25, Law of Demeter, was about <b>who</b> you talk to. This lesson is about <b>how</b> you talk to them: with a request, not an inspection.'
      },
      {
        label: 'The code', pic: code(askCode, { title: 'shop.py', hi: [2, 3, 7, 8, 12, 13] }),
        h: 'Three polite callers.',
        text: [
          'Maya\'s customers can use their points in three places: at the till, on the website, and when they phone in an order. So <code>shop.py</code> has three jobs. <code>card</code> is the <code>LoyaltyCard</code> from lesson 19, Encapsulation.',
          'Read the first job. Line 2 <b>asks</b> the card for its points and <b>decides</b>: is that at least 30? (<code>&gt;=</code> means "at least", as in lesson 2.) Line 3 <b>changes</b> the card by taking 30 points. Line 4 hands over the cookie.',
          'It looks well behaved. Nobody touches <code>_points</code>. Every line goes through a door, <code>balance()</code> or <code>spend()</code>.',
          'But look for the shop\'s rule, <b>"a free cookie costs 30 points"</b>. It is on lines 2, 7 and 12. It lives in the three callers. The card, which owns the points, <b>does not know the rule at all</b>.'
        ],
        tip: 'A sign to look for: the same object appears in the question and again in the change right under it. <code>card.balance()</code>, then <code>card.spend()</code>.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Same card, same day, two answers.',
        text: [
          'Tuesday is already sale day at Maya\'s (lesson 23). She adds a treat: <b>on Tuesdays a free cookie costs 20 points</b>, not 30.',
          'This is not a new number. It is a new <b>decision</b>, so it has to be written into every caller. Each job is now handed the day, as lesson 23, Explicit over implicit, asked. Maya rewrites the till. She rewrites the website the same way. She <b>forgets phone orders</b>.',
          'On Tuesday, Ana has 24 points. She phones in an order and asks for her free cookie. Line 10 asks: is 24 at least 30? No. <b>No cookie.</b> At the till the answer would have been yes: 24 is at least 20.',
          'Nothing crashed. One card got <b>two different answers</b> on the same day, depending on which part of the shop asked. It is the bug from lesson 6, DRY: one rule, three homes, and the copies drifted apart.'
        ],
        warn: 'There is a second trap. Between the asking and the changing, <b>the answer can go out of date</b>. Two tills serve a card with 30 points at the same moment. Both ask, and both see 30. Both call <code>spend(30)</code>. The second one is refused, but nobody looks at its answer. Two cookies go out for 30 points. Lesson 20 showed the same trap with a waiting list.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Let the card decide.',
        text: [
          'Maya gives the card one new job, <code>redeem_free_cookie</code>. To redeem means to trade points in for a reward. The price of a free cookie, Tuesdays included, now lives <b>inside the card\'s own code</b>, next to the points.',
          'Line 13 is a card using one of its own doors. <code>self.spend(cost)</code> means "run <b>my own</b> <code>spend</code> job". <code>spend</code> still checks first, as in lesson 19. It hands back <code>True</code> if it took the points and <code>False</code> if there were not enough. Line 13 passes that answer on.',
          'Now look at the callers. Each one <b>tells</b> the card what it wants. An <code>if</code> runs its pushed-in line when the answer is <code>True</code>. So line 2 reads: "redeem a free cookie. If that worked, hand one over." The caller hands in the day, because the card has no way to know it. It <b>decides nothing</b>.',
          'Try Ana again. 24 points, on a Tuesday. All three callers get the same answer: the cost is 20, <code>spend(20)</code> works, and she has 4 points left. On a Friday the cost is 30, the card says <code>False</code>, and her 24 points stay.',
          'Next month Maya changes the offer to 15 points. She edits <b>line 12 of card.py</b> and nothing else.'
        ],
        tip: 'Does a job that changes the points and also answers yes or no break lesson 20, Command-query separation? No. That lesson said a command may hand back a small note about what it just did. And the two ideas answer different questions. Lesson 20 asks what <b>one function</b> does. This lesson asks <b>who decides</b>.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Whose decision is this?',
        text: [
          'When you write a line that asks an object for data, stop and ask: <b>"Am I asking for this data only so that I can make a decision its owner should make?"</b>',
          'Try the old till. It asked for the balance only to decide if the card could pay for a cookie. That is a decision about points, and the card owns the points. <b>Yes.</b> So move the decision into the card.',
          'Try a receipt that prints <code>card.balance()</code>. It decides nothing. It only shows the number. <b>No.</b> Leave it alone.',
          'In code the pattern has three steps on the same object: <b>ask, decide, change</b>. An <code>if</code> about an object\'s data, with a change to that same object pushed in under it.'
        ],
        tip: 'You could also give the rule one home in a plain job, as in lesson 6, DRY. Tell, don\'t ask says <b>where</b> that home should be: with the data the rule reads.'
      },
      {
        label: 'When not to', pic: limitPic,
        h: 'Asking is not banned.',
        text: [
          '<b>Asking to show something is fine.</b> A receipt that prints the balance, or a screen that says "24 points", needs the number and decides nothing. That is what queries are for, and lesson 20 made them safe to call. Look at line 3 of the code.',
          '<b>Some decisions belong to the asker.</b> Delivery is free for a basket of $20 or more, going 5 km or less. (<code>and</code> means both must be true.) That rule reads two objects. It is not the basket\'s decision, and it is not the address\'s. So the job that works out the fee asks both and decides. Line 6 is right as it is.',
          '<b>Do not tell one object everything.</b> Suppose Maya loves this lesson and moves every job that mentions a card into <code>LoyaltyCard</code>. Now the card prints receipt lines, sends birthday emails, works out delivery fees and writes the tax report. It answers to four different people. That breaks lesson 16, Single responsibility. Move in the decisions that are about the card\'s <b>own data and rules</b>, and stop there.',
          '<b>Plain data has nothing to tell.</b> The cookie from lesson 19, a name and a flavour with no rules, has no decisions to make. Reading <code>cookie.name</code> is fine.'
        ],
        warn: 'The target is narrow: <b>ask, decide, change</b>, done from outside. If a caller only needs to show whether a free cookie is possible, give the card a real question to answer, such as <code>can_redeem_free_cookie(day)</code>. The rule still lives in one place.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'Which job asks, decides and then changes, all from outside the jar?',
        pic: code([
          'def show_stock(jar):',
          '    display(jar.cookies_left())',
          '',
          'def sell_box(jar):',
          '    if jar.cookies_left() >= 6:',
          '        jar.take(6)',
          '        hand_over_box()',
          '',
          'def sell_one(jar):',
          '    if jar.sell_cookie():',
          '        hand_over_cookie()'
        ], { title: 'jar.py callers' }),
        options: ['show_stock', 'sell_box', 'sell_one', 'None of them'],
        answer: 1,
        why: '<code>sell_box</code> asks the jar how many are left, decides that 6 is enough, and then changes the jar. <code>show_stock</code> only shows a number. <code>sell_one</code> tells the jar and acts on its answer.',
        hint: 'Look for an <code>if</code> about the jar\'s data with a change to the same jar under it.'
      },
      {
        type: 'type', q: 'It is Tuesday. Ana\'s card holds <b>24</b> points. The till runs <code>card.redeem_free_cookie("Tuesday")</code>. How many points does her card hold now? Type the number.',
        pic: code(cardCode, { title: 'card.py', hi: [10, 11, 12, 13] }),
        prompt: 'points >',
        answers: ['4', 'four'],
        why: 'On a Tuesday line 12 sets the cost to 20. <code>spend(20)</code> works, because 20 is not more than 24. 24 - 20 = 4.',
        hint: 'What is <code>cost</code> after line 12 on a Tuesday? Then take it from 24.'
      },
      {
        type: 'pick', q: 'Now it is Friday. A card holds <b>24</b> points and the website runs <code>card.redeem_free_cookie("Friday")</code>. What happens?',
        options: [
          'It hands back True and the card holds 4 points',
          'It hands back False and the card still holds 24 points',
          'It hands back True and the card holds -6 points',
          'The program crashes'
        ],
        answer: 1,
        why: 'Friday is not Tuesday, so the cost stays 30. <code>spend(30)</code> checks first: 30 is more than 24. It hands back <code>False</code> and changes nothing, so no cookie is given.',
        hint: 'Line 11 only changes the cost on a Tuesday. Then remember what <code>spend</code> does when there are not enough points.'
      },
      {
        type: 'fill', q: 'Rebuild the fix. The card decides, and the till only tells.',
        text: 'def redeem_free_cookie(self, day):\n    cost = 30\n    if day == "Tuesday":\n        cost = ___\n    return self.___(cost)\n\ndef till_free_cookie(card, day):\n    if card.___(day):\n        give_cookie()',
        options: ['20', 'spend', 'redeem_free_cookie', 'balance', '30'],
        answer: ['20', 'spend', 'redeem_free_cookie'],
        why: 'The Tuesday price lives inside the card. The card uses its own <code>spend</code> door, which checks the points. The till never looks at the balance.',
        hint: 'The till should not mention the balance at all. And on Tuesdays the cookie is cheaper.'
      },
      {
        type: 'pick', q: 'Back to lesson 1, Easy to change. Maya adds a rule: on your birthday a free cookie costs 10 points. The till, the website and phone orders all use <code>card.redeem_free_cookie(day)</code>. How many jobs must change to add the rule?',
        options: ['1', '2', '3', '4'],
        answer: 0,
        why: 'Only <code>redeem_free_cookie</code>, inside the card. With the old ask-then-decide code it would have been three callers, and three chances to miss one. That is what happened to phone orders.',
        hint: 'Where does the price of a free cookie live after the fix?'
      },
      {
        type: 'bucket', q: 'Should the caller tell, or is asking fine?',
        buckets: ['Tell the object', 'Asking is fine'],
        items: [
          ['Check the balance, then take 30 points', 0],
          ['Check the stock, then lower the stock', 0],
          ['Check if a gift card has run out, then mark it as used up', 0],
          ['Print the balance on a receipt', 1],
          ['Show "12 cookies left" on the home page', 1],
          ['Work out a delivery fee from the basket and the address', 1]
        ],
        why: 'Ask, decide, change on one object means the object should decide. Showing a value decides nothing. And a rule that reads two objects belongs to the job that sees both.',
        hint: 'For each one, ask: after the question, does the caller change that same object?'
      },
      {
        type: 'pick', q: 'This is the code <b>before</b> the fix. A card holds <b>30</b> points. Two tills run this job at the same moment. Both reach line 2 before either reaches line 3. What happens?',
        pic: code([
          'def till_free_cookie(card):',
          '    if card.balance() >= 30:',
          '        card.spend(30)',
          '        give_cookie()'
        ], { title: 'shop.py, before the fix' }),
        options: [
          'One cookie is given and the card holds 0 points',
          'Two cookies are given and the card holds 0 points',
          'Two cookies are given and the card holds -30 points',
          'No cookie is given'
        ],
        answer: 1,
        why: 'Both tills saw 30 and decided yes. The first <code>spend(30)</code> works. The second is refused, so the points stop at 0, as lesson 19 promised. But nobody looks at that answer, and line 4 runs at both tills.',
        hint: 'The <code>spend</code> door will not go below zero. But does line 4 wait for its answer?'
      },
      {
        type: 'match', q: 'Four lessons about objects. Match each one to its idea.',
        pairs: [
          ['Tell, don\'t ask', 'The decision lives next to the data'],
          ['Encapsulation (lesson 19)', 'Outside code cannot break the data'],
          ['Command-query separation (lesson 20)', 'One function asks or does, never both'],
          ['Law of Demeter (lesson 25)', 'Only talk to your close friends']
        ],
        why: 'They fit together. The doors protect the points. Each door either asks or does. Callers talk only to the card in front of them. And the card, not the caller, decides what its points can buy.',
        hint: 'Which one is about who makes the decision?'
      }
    ]
  });
})();
