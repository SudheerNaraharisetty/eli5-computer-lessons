/* Lesson 20: Command-query separation (module 2). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l20  Command-query separation
     ===================================================================== */
  // Two small icons used all through this lesson: an eye for "asks", a hand for "does".
  const eye = (cx, cy, k) => {
    k = k || 1;
    return `<path d="M${cx - 17 * k} ${cy} Q${cx} ${cy - 15 * k} ${cx + 17 * k} ${cy} Q${cx} ${cy + 15 * k} ${cx - 17 * k} ${cy}Z" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>` +
      `<circle cx="${cx}" cy="${cy}" r="${5.5 * k}" fill="${P.accent}"/>`;
  };
  const hand = (cx, cy, k) => {
    k = k || 1;
    const f = (dx, h) => `<rect x="${cx + dx * k}" y="${cy - h * k}" width="${5 * k}" height="${(h + 4) * k}" rx="${2.5 * k}" fill="#F2C9A5" stroke="${P.ink}" stroke-width="2"/>`;
    return f(-10, 15) + f(-5, 18) + f(0, 18) + f(5, 15) +
      `<rect x="${cx - 16 * k}" y="${cy - 1 * k}" width="${6 * k}" height="${12 * k}" rx="${3 * k}" transform="rotate(-35 ${cx - 13 * k} ${cy + 5 * k})" fill="#F2C9A5" stroke="${P.ink}" stroke-width="2"/>` +
      `<rect x="${cx - 10 * k}" y="${cy}" width="${20 * k}" height="${15 * k}" rx="${5 * k}" fill="#F2C9A5" stroke="${P.ink}" stroke-width="2"/>`;
  };

  /* ---- The idea: a thermometer and a heater dial ---- */
  const ideaPic = svg(600, 290, 'Looking at a thermometer changes nothing, however often you look. Turning the heater dial changes the room.',
    T(150, 34, 'ASK', { s: 12.5, f: P.ok }) + T(450, 34, 'DO', { s: 12.5, f: P.warn }) +
    `<line x1="300" y1="24" x2="300" y2="270" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    // thermometer
    `<rect x="139" y="62" width="22" height="112" rx="11" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<rect x="146" y="104" width="8" height="66" rx="4" fill="${P.danger}"/>` +
    `<circle cx="150" cy="184" r="17" fill="${P.danger}" stroke="${P.ink}" stroke-width="2.5"/>` +
    T(206, 126, '21°', { s: 24, m: true }) +
    eye(62, 84) + eye(76, 122) + eye(62, 160) +
    T(150, 236, 'look once, ten times or never', { s: 13 }) +
    T(150, 256, 'the room stays at 21°', { s: 13, w: 700, f: P.ink2 }) +
    // heater dial
    `<circle cx="412" cy="124" r="50" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<circle cx="412" cy="124" r="6" fill="${P.ink}"/>` +
    `<line x1="412" y1="124" x2="440" y2="96" stroke="${P.warn}" stroke-width="6" stroke-linecap="round"/>` +
    T(412, 164, 'HEAT', { s: 11.5, f: P.mute }) +
    hand(372, 70) +
    arrow(470, 124, 498, 124, P.warn, 3) +
    box(508, 100, 70, 48, P.warnT, 12) + T(543, 132, '22°', { s: 20, m: true }) +
    T(450, 236, 'turn it and the room changes', { s: 13 }) +
    T(450, 256, 'do it only when you mean it', { s: 13, w: 700, f: P.ink2 }));

  /* ---- The code ---- */
  const jarCode = [
    'def cookies_left():',
    '    # we are about to sell one anyway',
    '    jar.count = jar.count - 1',
    '    return jar.count',
    '',
    'def sell_cookie():',
    '    left = cookies_left()',
    '    hand_over_cookie()',
    '    display(left)'
  ];

  /* ---- The pain: three lookers ---- */
  const lookersCode = [
    'def opening_checklist():',
    '    print_paper(cookies_left())',
    '',
    'def home_page():',
    '    display(cookies_left())',
    '',
    'def morning_report():',
    '    for hour in [9, 10, 11]:',
    '        print_paper(cookies_left())',
    '',
    'def online_order():',
    '    if cookies_left() > 0:',
    '        sell_cookie()'
  ];
  const cookie = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="11" fill="#D9A05B" stroke="${P.ink}" stroke-width="2"/><circle cx="${cx - 3}" cy="${cy - 2}" r="1.8" fill="#5A3418"/><circle cx="${cx + 4}" cy="${cy + 3}" r="1.8" fill="#5A3418"/>`;
  const jarPic = (x, y) =>
    `<rect x="${x + 30}" y="${y}" width="60" height="14" rx="5" fill="${P.accent}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<rect x="${x}" y="${y + 14}" width="120" height="92" rx="18" fill="${P.paper2}" stroke="${P.ink}" stroke-width="2.5"/>` +
    [0, 1, 2].map(r => [0, 1, 2, 3].map(c => cookie(x + 22 + c * 25 + (r % 2 ? 3 : -1), y + 90 - r * 24)).join('')).join('');
  const countRow = (y, who, n, col) => T(232, y, who, { a: 'start', s: 13, w: 700, f: P.ink2 }) + T(408, y, n, { a: 'end', s: 15, m: true, f: col || P.ink });
  const painPic = `<div style="width:100%">${code(lookersCode, { title: 'shop.py, four more jobs that ask', bad: [2, 5, 9, 12] })}` +
    svg(600, 196, 'The real jar still holds 24 cookies. The count in the program fell from 24 to 23 after the checklist, to 3 after 20 home page visits, to 0 after the report, and to minus 1 after the online order asked.',
      jarPic(40, 26) + T(100, 152, '24 in the jar', { s: 14, f: P.ok }) + T(100, 172, 'nobody bought one', { s: 12.5, w: 700, f: P.ink2 }) +
      T(232, 30, 'THE COUNT IN THE PROGRAM', { a: 'start', s: 11.5, f: P.mute }) +
      countRow(56, 'at opening', '24') +
      countRow(80, 'checklist looks once', '23') +
      countRow(104, '20 home page visits', '3') +
      countRow(128, 'report asks 3 times', '0') +
      countRow(152, 'online order asks', '-1', P.danger) +
      `<line x1="232" y1="162" x2="408" y2="162" stroke="${P.ink}" stroke-width="2"/>` +
      box(436, 62, 140, 62, P.dangerT, 14) + T(506, 90, 'SOLD OUT', { s: 15, f: P.danger }) + T(506, 110, 'order refused', { s: 12.5, w: 700, f: P.ink2 }) +
      T(320, 186, 'every look took one off', { s: 13, f: P.danger })) + `</div>`;

  /* ---- The fix ---- */
  const fixedCode = [
    'def cookies_left():',
    '    return jar.count',
    '',
    'def take_cookie():',
    '    jar.count = jar.count - 1',
    '',
    'def sell_cookie():',
    '    take_cookie()',
    '    hand_over_cookie()',
    '    display(cookies_left())'
  ];

  /* ---- The test: sort into asks and does ---- */
  const chip = (cx, y, s, fill) => box(cx - 92, y, 184, 34, fill, 10) + T(cx, y + 22, s, { s: 13.5, m: true });
  const sortPic = svg(600, 318, 'Functions sorted into two columns. Asks: cookies_left, card.balance and get_total. Does: take_cookie, card.earn, card.spend and charge_card.',
    eye(88, 34, 1.15) + T(160, 40, 'ASKS', { s: 17, f: P.ok }) +
    hand(388, 30, 1.05) + T(460, 40, 'DOES', { s: 17, f: P.warn }) +
    T(150, 64, 'a query: changes nothing', { s: 12.5, w: 700, f: P.ink2 }) + T(450, 64, 'a command: changes something', { s: 12.5, w: 700, f: P.ink2 }) +
    `<line x1="300" y1="20" x2="300" y2="300" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    chip(150, 82, 'cookies_left()', P.okT) + chip(150, 128, 'card.balance()', P.okT) + chip(150, 174, 'get_total(price)', P.okT) +
    chip(450, 82, 'take_cookie()', P.warnT) + chip(450, 128, 'card.earn(5)', P.warnT) + chip(450, 174, 'card.spend(30)', P.warnT) + chip(450, 220, 'charge_card(total)', P.warnT) +
    T(150, 276, 'call it twice:', { s: 13 }) + T(150, 296, 'the same answer, nothing moved', { s: 13, w: 700, f: P.ink2 }) +
    T(450, 276, 'call it twice:', { s: 13 }) + T(450, 296, 'it happens twice', { s: 13, w: 700, f: P.ink2 }));

  /* ---- When not to: pop, and two tills ---- */
  const popCode = [
    'waiting = ["Ana", "Ben", "Cleo"]',
    '',
    '# one step: take the first order off, and hand it over',
    'order = waiting.pop(0)',
    '',
    '# split in two: look, then remove',
    'order = first_order(waiting)',
    'remove_first_order(waiting)'
  ];
  const step = (x, y, s, fill, col) => box(x, y, 118, 34, fill, 10) + T(x + 59, y + 22, s, { s: 12.5, f: col || P.ink });
  const tillsPic = svg(600, 176, 'Two tills use the split version at the same time. Both look and see Ana. Till 1 removes Ana. Till 2 removes Ben. Ana\'s order is made twice and Ben\'s is lost.',
    T(20, 46, 'Till 1', { a: 'start', s: 13 }) + T(20, 100, 'Till 2', { a: 'start', s: 13 }) +
    step(84, 24, 'looks: Ana', P.white) + step(338, 24, 'removes Ana', P.white) +
    step(212, 78, 'looks: Ana', P.dangerT, P.danger) + step(466, 78, 'removes Ben', P.dangerT, P.danger) +
    arrow(84, 132, 584, 132, P.mute, 2.5) + T(560, 152, 'time', { s: 12, w: 700, f: P.mute }) +
    T(290, 166, "Ana's order is made twice. Ben's is lost.", { s: 13, f: P.danger }));
  const limitPic = `<div style="width:100%">${code(popCode, { title: 'the waiting list of orders', good: [4], bad: [7, 8] })}${tillsPic}</div>`;

  COURSE.add({
    id: 'l20', minutes: 9,
    summary: 'Every function should be one of two kinds. A <b>query</b> answers a question and changes nothing. A <b>command</b> changes something. <b>Command-query separation</b> says: ask or do, never both in one.',
    video: {
      src: 'videos/l20-command-query.mp4', poster: 'videos/l20-command-query.jpg', length: '1 min 1 s',
      script: [
        "Maya's shop keeps cookies in a jar, and the program keeps count. 24.",
        'To read that count, there is a job called cookies_left. It sounds like a question. But Maya made it take 1 off the count as well.',
        'Sam prints the count on his morning checklist. 23. The website shows it to 20 visitors. 3. A report asks 3 more times. 0.',
        'The jar is still full. But the website says sold out. Asking the question changed the answer.',
        'The fix is two jobs. cookies_left only looks. take_cookie only takes.',
        'Now anyone can look, as often as they like, and the count holds. Only a sale changes it.',
        'Remember get_total, the job that secretly charged a card? Same mistake. A job should either ask a question, or do something. Never both. That is command-query separation.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Looking should be free.',
        text: [
          'In lesson 11, Least astonishment, a job called <code>get_total</code> quietly charged a card, and a customer paid twice. That lesson promised a rule for keeping "tell me something" apart from "change something". Here it is. It stops that <b>whole family</b> of bugs, not just that one.',
          'You can look at a thermometer once, ten times or never. The room stays the same. To change the room, you turn the dial on the heater. Now picture a thermometer that makes the room one degree colder <b>every time you look</b>. You would be afraid to check it.',
          '<b>Command-query separation</b> says every function should be one of two kinds. A <b>query</b> answers a question and <b>changes nothing</b>. A <b>command</b> <b>changes something</b>, and ideally hands back nothing you would call it to find out. Never both in one. The computer scientist Bertrand Meyer gave the rule its name.'
        ],
        tip: 'The two words are simpler than they look. A <b>query</b> is a question. A <b>command</b> is an order. Ask or do, never both.'
      },
      {
        label: 'The code', pic: code(jarCode, { title: 'shop.py', hi: [1, 3] }),
        h: 'A question with a hand in the jar.',
        text: [
          'Maya keeps her cookies in a jar on the counter. The program keeps a number, <code>jar.count</code>, for how many are in it. The dot works as in lesson 2. Every morning the jar is filled and the count starts at <b>24</b>.',
          'Read only line 1. <code>cookies_left</code> sounds like a <b>question</b>: how many cookies are left? Now read line 3. It also takes one <b>off the count</b>.',
          'Maya had a reason, and she wrote it on line 2. Only <code>sell_cookie</code> used this job, and a sale needs both things: one cookie off the count, and the new number for the screen. So she did both in one place.',
          'The shop works. One sale, one cookie off the count. But the name says nothing about taking.'
        ]
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Every look eats a cookie.',
        text: [
          'Other people start to need that number. <b>None of them wants to sell anything.</b> Sam prints it on the opening checklist (line 2). The website shows it on the home page (line 5). A morning report prints it once for each hour the shop has been open, with a loop as in lesson 10 (lines 8 and 9).',
          'It is a slow morning. The jar holds 24. Sam\'s checklist looks once: <b>23</b>. Twenty people open the home page: <b>3</b>. The report asks three times: <b>0</b>. Nobody has bought a cookie. The jar on the counter still holds 24.',
          'Then a customer orders online. Line 12 asks if any cookies are left. <b>Even that question takes one more.</b> The count is now -1. That is not above 0, so the order is refused. The shop is "sold out" next to a full jar.'
        ],
        warn: 'Nothing crashed. Sam, the website and the report each asked a question. <b>Asking the question changed the answer.</b>'
      },
      {
        label: 'The fix', pic: code(fixedCode, { title: 'shop.py, fixed', good: [2, 5, 8] }),
        h: 'One job looks. One job takes.',
        text: [
          'Maya splits the job in two. <code>cookies_left</code> is now a <b>query</b>. It is one line, and it only looks. <code>take_cookie</code> is a <b>command</b>. It changes the count and hands nothing back.',
          '<code>sell_cookie</code> now says both steps in plain sight: take one, then ask how many are left.',
          'Run the same morning again. The checklist prints 24. Twenty visitors see 24. The report prints 24, 24, 24. The online order goes through, <code>take_cookie</code> runs <b>once</b>, and the count is 23. So is the jar.',
          'There is a second gain. To find every place where the count can change, a reader only has to look for the <b>commands</b>. Here there is one: <code>take_cookie</code>.'
        ],
        tip: 'The <code>LoyaltyCard</code> from lesson 19, Encapsulation, already has this shape. <code>balance()</code> asks. <code>earn()</code> and <code>spend()</code> do. Maya can print a balance on every receipt and every screen, and no points move.'
      },
      {
        label: 'The test', pic: sortPic,
        h: 'Call it twice.',
        text: [
          'Point at a function and ask: <b>"If I call this twice in a row, is anything different the second time?"</b> If the function is a question, nothing should be.',
          'Try the old <code>cookies_left</code> on a full jar. The first call says 23. The second says 22. Something is different, so it was never only a question. Try the new one. 24, then 24.',
          'A command is allowed to be different the second time. That is its job. Calling <code>take_cookie</code> twice takes two cookies, and its name tells you so.',
          'A sign to look for in code: a name that sounds like a question, such as <code>cookies_left</code>, <code>get_total</code> or <code>is_member</code>, sitting above a line that <b>stores a new value</b>.'
        ],
        tip: 'Sorting a file this way makes it easier to read. The queries are safe to use anywhere: in a check, in a report, in a line you add just to see what is going on. The commands are the lines where things really happen.'
      },
      {
        label: 'When not to', pic: limitPic,
        h: 'Some jobs do both on purpose.',
        text: [
          '<b>A few well-known jobs do both, and everyone expects it.</b> Online orders wait in a list. In lesson 11, <code>order[0]</code> was the first item in a list. <code>waiting.pop(0)</code> goes one step further: it <b>takes the first item off the list and hands it to you</b>. A change and an answer, in one step.',
          'Suppose Maya loves this lesson and splits it into <code>first_order</code>, which looks, and <code>remove_first_order</code>, which removes. Every caller now needs two lines. Worse, the shop has two tills working at once. Both look and see Ana\'s order. Then each removes "the first one". Ana\'s order is made twice, and Ben\'s is thrown away unseen. The one-step version cannot be cut in half like that.',
          '<b>A command may hand back a small note about what it just did.</b> In lesson 19, <code>card.spend(30)</code> changes the points and hands back <code>True</code> or <code>False</code>: did it work? A job that saves a new order often hands back the order\'s number. Both are common and harmless. Nobody calls them just to ask a question.',
          '<b>The rule is about changes someone could notice.</b> A query that quietly remembers its answer, so that it is faster next time, is fine.'
        ],
        warn: 'The real target is the <b>question that secretly changes things</b>. If a name sounds like a question, looking must be free.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'Read the names first, then the insides. Which job is a question that also changes something?',
        pic: code([
          'def tips_today():',
          '    amount = tip_jar.total',
          '    tip_jar.total = 0',
          '    return amount',
          '',
          'def is_open(hour):',
          '    return hour >= 9',
          '',
          'def add_tip(amount):',
          '    tip_jar.total = tip_jar.total + amount'
        ], { title: 'tips.py' }),
        options: ['tips_today', 'is_open', 'add_tip', 'None of them'],
        answer: 0,
        why: '<code>tips_today</code> sounds like a question, but line 3 empties the tip jar. <code>is_open</code> only answers. <code>add_tip</code> only changes, and its name says so.',
        hint: 'One job hands back an answer and also stores a new value.'
      },
      {
        type: 'type', q: 'The tip jar holds <b>$18</b>. Sam calls <code>tips_today()</code> to show the tips on a screen. Then Maya calls <code>tips_today()</code> to write the tips in her books. What number does Maya get?',
        pic: code([
          'def tips_today():',
          '    amount = tip_jar.total',
          '    tip_jar.total = 0',
          '    return amount'
        ], { title: 'tips.py' }),
        prompt: 'dollars >',
        answers: ['0', '$0', '0.00', '$0.00', '0.0'],
        why: 'Sam\'s call handed back 18 and set the total to 0. Maya asked the same question a moment later and got a different answer. Call it twice, and the second time is different.',
        hint: 'Follow line 3. What is <code>tip_jar.total</code> after Sam\'s call?'
      },
      {
        type: 'pick', q: 'This is the code before the fix. The jar holds <b>24</b> cookies and nobody buys one. The checklist runs once, and the home page is opened 5 times. What is <code>jar.count</code> now?',
        pic: code([
          'def cookies_left():',
          '    jar.count = jar.count - 1',
          '    return jar.count',
          '',
          'def opening_checklist():',
          '    print_paper(cookies_left())',
          '',
          'def home_page():',
          '    display(cookies_left())'
        ], { title: 'shop.py, before the fix' }),
        options: ['24', '23', '19', '18'],
        answer: 3,
        why: 'Six looks, and each one takes 1 off the count. 24 - 6 = 18. The jar itself still holds 24.',
        hint: 'Count the calls to <code>cookies_left</code>: 1 from the checklist and 5 from the home page.'
      },
      {
        type: 'bucket', q: 'Does it ask, or does it do?',
        buckets: ['Asks (query)', 'Does (command)'],
        items: [
          ['cookies_left()', 0],
          ['card.balance()', 0],
          ['len(order)', 0],
          ['take_cookie()', 1],
          ['card.earn(5)', 1],
          ['order.append("cookie")', 1],
          ['charge_card(total)', 1]
        ],
        why: 'A query hands you an answer and leaves everything as it was. A command changes something: a count, a card, a list, a bank balance.',
        hint: 'For each one, ask: after it runs, is anything different?'
      },
      {
        type: 'fill', q: 'Finish the fix. One job only looks, one job only takes, and the sale uses both.',
        text: 'def cookies_left():\n    return ___\n\ndef take_cookie():\n    jar.count = jar.count - 1\n\ndef sell_cookie():\n    ___()\n    hand_over_cookie()\n    display(___())',
        options: ['jar.count', 'take_cookie', 'cookies_left', 'sell_cookie', 'jar.count - 1'],
        answer: ['jar.count', 'take_cookie', 'cookies_left'],
        why: 'The query hands back the count and stores nothing. The sale takes one cookie with the command, then asks the query for the number to show.',
        hint: 'The first blank only looks at the count. In the sale, take first, then ask.'
      },
      {
        type: 'pick', q: 'After the fix, which of these are safe to add? Pick all that apply.',
        options: [
          'A line that prints <code>cookies_left()</code> every minute, to see what is going on',
          'A home page that shows <code>cookies_left()</code> to every visitor',
          'A report that calls <code>take_cookie()</code> three times to check that it works',
          'A check <code>if cookies_left() &gt; 0</code> before every sale'
        ],
        answer: [0, 1, 3],
        why: 'A query can be called any number of times, by anyone, in any order. A command changes something every time, so the report would take three cookies off the count.',
        hint: 'Three of these only ask. One of them does.'
      },
      {
        type: 'pick', q: '<code>order = waiting.pop(0)</code> takes the first order off the waiting list and hands it over. It asks and does in one step. What should Maya do?',
        options: [
          'Split it into a job that looks and a job that removes',
          'Leave it. Everyone expects pop to do both, and the split version is less safe with two tills',
          'Rename it so that nobody uses it',
          'Stop using lists for orders'
        ],
        answer: 1,
        why: 'Taking the next item is one well-known step. Cut in two, both tills can look at the same order before either removes it. The rule is aimed at questions that <b>secretly</b> change things.',
        hint: 'Is anyone surprised that pop removes the item? And what happens if two tills look at the same moment?'
      },
      {
        type: 'pick', q: 'Back to lesson 11, Least astonishment. Before its fix, <code>get_total</code> worked out the total and charged the card. In this lesson\'s words, what was it?',
        pic: code([
          'def get_total(price):',
          '    total = price + price * TAX_RATE',
          '    charge_card(total)',
          '    return total'
        ], { title: 'shop.py, lesson 11, before the fix' }),
        options: ['Only a query', 'Only a command', 'A query and a command in one', 'Neither of them'],
        answer: 2,
        why: 'It answered a question (the total) and changed something (the card). The fix made <code>get_total</code> a pure query and left the charging to the command <code>charge_card</code>, called in plain sight.',
        hint: 'Line 3 changes something. Line 4 hands back an answer.'
      }
    ]
  });
})();
