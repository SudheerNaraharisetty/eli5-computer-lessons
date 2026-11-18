/* Lesson 7: Single source of truth (module 1). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l07  Single source of truth
     ===================================================================== */
  const person = (x, y, fill) =>
    `<circle cx="${x}" cy="${y}" r="13" fill="${fill}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<path d="M${x - 20} ${y + 44} C${x - 20} ${y + 20} ${x + 20} ${y + 20} ${x + 20} ${y + 44} Z" fill="${fill}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>`;

  const calendarPic = svg(600, 300, 'One family calendar on the wall that everyone reads, next to three notebooks where one copy says a different time',
    T(150, 34, 'ONE CALENDAR ON THE WALL', { s: 12.5, f: P.ok }) + T(450, 34, 'EVERYONE COPIES IT', { s: 12.5, f: P.danger }) +
    `<line x1="300" y1="24" x2="300" y2="280" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    /* left: the wall calendar and three readers */
    box(70, 54, 160, 84, P.okT, 14) + T(150, 80, 'Saturday', { s: 12.5, w: 700, f: P.ink2 }) + T(150, 108, 'Dentist 3 pm', { s: 16 }) + T(150, 128, 'moved to 4 pm', { s: 12.5, f: P.ok }) +
    [80, 150, 220].map((x, i) => arrow(x, 196, 150 + (x - 150) * 0.45, 150, P.ok, 2.5) + person(x, 212, [P.tint, P.warnT, P.white][i])).join('') +
    T(150, 284, 'change it once, everyone sees 4 pm', { s: 13, w: 700, f: P.ink2 }) +
    /* right: three notebooks */
    [['Mum', '4 pm', false], ['Dad', '4 pm', false], ['Leo', '3 pm', true]].map((n, i) => {
      const x = 322 + i * 90;
      return box(x, 70, 76, 96, n[2] ? P.dangerT : P.white, 10) +
        `<line x1="${x + 12}" y1="70" x2="${x + 12}" y2="166" stroke="${P.ink}" stroke-width="2"/>` +
        T(x + 44, 96, n[0], { s: 12.5, w: 700, f: P.ink2 }) + T(x + 44, 128, n[1], { s: 17, f: n[2] ? P.danger : P.ink }) +
        (n[2] ? T(x + 44, 152, 'old', { s: 12.5, f: P.danger }) : '') + person(x + 38, 212, [P.tint, P.warnT, P.white][i]);
    }).join('') +
    T(450, 284, 'one notebook was missed', { s: 13, w: 700, f: P.ink2 }));

  const shopCode = [
    '# menu.py',
    'COOKIE_PRICE = 3',
    'def menu_board():',
    '    display(COOKIE_PRICE)',
    '',
    '# website.py',
    'COOKIE_PRICE = 3',
    'def cookie_page():',
    '    display(COOKIE_PRICE)',
    '',
    '# app.py',
    'COOKIE_PRICE = 3',
    'def app_screen():',
    '    display(COOKIE_PRICE)'
  ];
  const brokenCode = shopCode.slice();
  brokenCode[1] = 'COOKIE_PRICE = 4';
  const fixedCode = brokenCode.slice();
  fixedCode[6] = 'from menu import COOKIE_PRICE';
  fixedCode[11] = 'from menu import COOKIE_PRICE';

  const painPic = `<div style="width:100%">${code(brokenCode, { title: 'three files, after the price change', good: [2], bad: [7, 12] })}` +
    svg(600, 126, 'The website shows 3 dollars but the shop charges 4 dollars for the same cookie',
      box(40, 22, 200, 70, P.white, 14) + T(140, 66, '$3', { s: 28, m: true }) + T(140, 114, 'ordered on the website', { s: 12.5, w: 700, f: P.ink2 }) +
      `<circle cx="300" cy="57" r="26" fill="${P.dangerT}" stroke="${P.ink}" stroke-width="2.5"/>` + T(300, 68, '≠', { s: 30, f: P.danger }) +
      box(360, 22, 200, 70, '#15132B', 14) + T(460, 66, '$4', { s: 28, m: true, f: '#ECEAFF' }) + T(460, 114, 'charged in the shop', { s: 12.5, w: 700, f: P.ink2 })) + `</div>`;

  const countBad = [
    'order = ["choc chip", "oat"]',
    'cookie_count = 2',
    '',
    'order.append("ginger")',
    'print_paper(cookie_count)   # prints 2'
  ];
  const countGood = [
    'order = ["choc chip", "oat"]',
    '',
    'order.append("ginger")',
    'print_paper(len(order))     # prints 3'
  ];
  const testPic = `<div style="width:100%">${code(countBad, { title: 'two places hold the count', hi: [1], bad: [2, 5] })}${code(countGood, { title: 'one place, and the count is worked out', good: [4] })}</div>`;

  const copyPic = svg(600, 300, 'An original with two copies that are refreshed from it, next to an old receipt that correctly keeps the old price',
    T(170, 34, 'COPIES ON PURPOSE', { s: 12.5, f: P.ok }) + T(480, 34, 'NOT A COPY AT ALL', { s: 12.5, f: P.ok }) +
    `<line x1="360" y1="24" x2="360" y2="280" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    box(95, 54, 150, 62, P.okT, 14) + T(170, 80, 'menu.py', { s: 13, m: true }) + T(170, 102, 'the original: $5', { s: 13, f: P.ok }) +
    arrow(135, 124, 95, 176, P.ok, 3) + arrow(205, 124, 245, 176, P.ok, 3) +
    box(20, 184, 140, 56, P.white, 12) + T(90, 208, 'nightly backup', { s: 13 }) + T(90, 227, 'for safety', { s: 12.5, w: 700, f: P.ink2 }) +
    box(180, 184, 150, 56, P.white, 12) + T(255, 208, 'saved copy', { s: 13 }) + T(255, 227, 'for speed', { s: 12.5, w: 700, f: P.ink2 }) +
    T(170, 270, 'refreshed from the original', { s: 13, w: 700, f: P.ink2 }) + T(170, 288, 'the original always wins', { s: 13, w: 700, f: P.ink2 }) +
    `<path d="M410 56 H550 V214 l-14 -10 -14 10 -14 -10 -14 10 -14 -10 -14 10 -14 -10 -14 10 -14 -10 -14 10 Z" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>` +
    T(480, 84, 'RECEIPT', { s: 12.5, f: P.ink2 }) + T(480, 108, 'Monday', { s: 13, w: 700, f: P.ink2 }) + T(480, 140, '1 cookie', { s: 13 }) + T(480, 172, 'paid $3', { s: 20, m: true }) +
    T(480, 250, 'a different fact:', { s: 13, w: 700, f: P.ink2 }) + T(480, 268, 'what was paid that day', { s: 13, w: 700, f: P.ink2 }) + T(480, 288, 'it stays $3 for ever', { s: 13, f: P.ok }));

  const taxCode = [
    'TAX_RATE = 0.09',
    '',
    'def show_price(price):',
    '    total = price + price * TAX_RATE',
    '    display(total)'
  ];

  COURSE.add({
    id: 'l07', minutes: 8,
    summary: 'A fact that is stored in two places will one day disagree with itself. <b>Single source of truth</b> means every fact lives in one place, and everything else reads it from there.',
    video: {
      src: 'videos/l07-single-source.mp4', poster: 'videos/l07-single-source.jpg', length: '1 min 1 s',
      script: [
        "Maya's cookie shop now sells online too.",
        'So the price of a cookie is written down in 3 places. The shop menu. The website. And the loyalty app. $3, 3 times.',
        'Then Maya raises the price to $4. She changes the menu. But the website and the app still say 3.',
        'A customer orders online for $3. At pickup, the shop charges 4. Two answers to one question, and nobody can say which is right.',
        'The fix. Pick one owner. The menu owns the price. The website and the app stop keeping their own copy. They read it from the menu.',
        'Next time the price changes, Maya changes one place, and every screen follows.',
        'You saw this in lesson 1, with the tax rate. Now it has a name.',
        'Single source of truth. Every fact lives in one place.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: calendarPic,
        h: 'One calendar on the wall.',
        text: [
          'In lesson 1, Maya gave the tax one name in one place, and you were promised that the fix had a name. Here it is: <b>single source of truth</b>.',
          'Picture a family with one calendar on the wall. The dentist moves from 3 pm to 4 pm. Someone changes the calendar once, and everyone who looks sees 4 pm. Now picture everyone copying the calendar into their own notebook. One notebook gets missed, and Leo turns up at 3.',
          'A program is full of <b>facts</b>: a price, a tax rate, a phone number, what is in an order. Single source of truth means each fact is <b>stored in exactly one place</b>. That place owns it. Everything else reads it from there, or works it out from there.'
        ],
        tip: 'Lesson 6, DRY, gave every <b>rule</b> one home, like how a total is worked out. This lesson gives every <b>fact</b> one home, like what a cookie costs. Same spirit, different thing.'
      },
      {
        label: 'The code', pic: code(shopCode, { title: 'three files, one price', hi: [2, 7, 12] }),
        h: 'Maya sells online now.',
        text: [
          'The shop has grown. There is the menu board in the shop, a website, and a loyalty app. Each one has its own file. The lines starting with <code>#</code> show where each file begins, as in lesson 4.',
          'Each file was written on a different day, and each one keeps <b>its own</b> <code>COOKIE_PRICE</code>. Each looks tidy. The price even has a name, just as lesson 1 asked.',
          'But count the places where the price is <b>stored</b>. <b>Three.</b> A name does not help if three files each keep their own copy of it.'
        ]
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Two answers to one question.',
        text: [
          'Maya raises the choc chip cookie from $3 to $4. She opens <code>menu.py</code> and changes line 2. The menu board is right. The card reader in the shop uses the menu price too, so it charges $4.',
          'She forgets that the website and the app keep their own copies. They still say <b>$3</b>.',
          'A customer orders a cookie on the website for $3. At pickup the shop charges <b>$4</b>. The customer points at the phone. Maya points at the menu. What does a cookie cost? The program gives <b>two answers</b>, and nothing in it says which one is right.'
        ],
        warn: 'Nothing crashed. Every file is correct when you read it alone. The mistake only exists <b>between</b> the files, and that makes it hard to see.'
      },
      {
        label: 'The fix', pic: code(fixedCode, { title: 'three files, one owner', good: [2], hi: [7, 12] }),
        h: 'Pick one owner.',
        text: [
          'Maya decides that <b>the menu owns the price</b>. <code>menu.py</code> is the only file where the price is written down.',
          'The website and the app delete their own copies. In their place goes <code>from menu import COOKIE_PRICE</code>. You met this in lesson 4. It means: go and fetch that name from the file <code>menu.py</code>.',
          'Next time the price changes, Maya edits <b>one line</b> and all three screens follow. They cannot disagree, because there is only one price to read.'
        ],
        tip: 'The fix has two steps, and the first one is not code. First <b>decide who owns the fact</b>. Then make everyone else read it from the owner.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Ask which one wins.',
        text: [
          'Point at any fact and ask: <b>"If two places disagree about this, which one wins?"</b> If you cannot answer, the fact has no single source.',
          'Try it on the top picture. Square brackets make a <b>list</b>, so <code>order</code> is a list of two cookies. Maya also keeps <code>cookie_count = 2</code>. You met <code>.append</code> in lesson 3: it adds one more thing to a list. Line 4 adds a third cookie, and nobody updates the count. The list says 3. The count says 2.',
          'Which one wins? The list, of course. It holds the real cookies. So <code>cookie_count</code> was only ever a <b>copy in disguise</b>. The fix is to stop storing it. <code>len(order)</code> counts the things in a list, so the count is worked out fresh each time and cannot be wrong.'
        ],
        tip: 'If something can be <b>worked out</b> from a fact you already store, do not store it a second time. Work it out when you need it.'
      },
      {
        label: 'When not to', pic: copyPic,
        h: 'Some copies are fine. Some are not copies.',
        text: [
          '<b>Copies made on purpose are fine.</b> A backup is a copy kept for safety. A saved copy that makes a slow page load faster is a copy kept for speed. Both are fine as long as everyone knows which one is the <b>original</b>, and the copies are refreshed from it. If they disagree, the original wins. The test still has an answer.',
          '<b>Things that look alike are not always the same fact.</b> Suppose Maya loves this lesson so much that she makes old receipts read the price from <code>menu.py</code> too. On Monday a customer pays $3. On Tuesday the price becomes $4. Now Monday\'s receipt says $4, and it is wrong.',
          '"What a cookie costs today" and "what this customer paid on Monday" are <b>two different facts</b>. The second one must be stored on the receipt and never change.'
        ],
        warn: 'One home per fact does not mean one copy in the whole world. It means everyone can say which place is the original.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does "single source of truth" mean?',
        options: ['Every fact is stored in one place, and everything else reads it from there', 'The whole program must be in a single file', 'A program may never have a backup', 'Every number must have a name'],
        answer: 0,
        why: 'One place owns the fact. Others read it or work it out. Then there is nothing to disagree with.',
        hint: 'Think of the calendar on the wall.'
      },
      {
        type: 'pick', q: 'The shop will now close at 17, not 18. Maya edits <code>shop.py</code> only. Which place still shows the old time?',
        pic: code([
          '# shop.py',
          'CLOSES_AT = 18',
          '',
          '# website.py',
          'CLOSES_AT = 18',
          'def hours_page():',
          '    display(CLOSES_AT)',
          '',
          '# sign.py',
          'from shop import CLOSES_AT',
          'def door_sign():',
          '    display(CLOSES_AT)'
        ], { title: 'three files, one closing time' }),
        options: ['The door sign', 'The website', 'Both of them', 'Neither of them'],
        answer: 1,
        why: '<code>sign.py</code> reads the time from <code>shop.py</code>, so it follows. <code>website.py</code> keeps its own copy on line 5, and that copy still says 18.',
        hint: 'Which file fetches the time, and which file keeps its own?'
      },
      {
        type: 'pick', q: 'What does line 5 print?',
        pic: code([
          'order = ["choc chip", "oat"]',
          'cookie_count = 2',
          '',
          'order.append("ginger")',
          'print_paper(cookie_count)'
        ], { title: 'order.py' }),
        options: ['1', '2', '3', 'It crashes'],
        answer: 1,
        why: 'The list now holds 3 cookies, but nobody updated the stored count. It still says 2. Nothing crashed. The receipt is just quietly wrong.',
        hint: 'Line 4 changes the list. Does any line change <code>cookie_count</code>?'
      },
      {
        type: 'fill', q: 'Finish both fixes. The website should read the price from its owner, and the count should be worked out.',
        text: '# website.py\nfrom ___ import COOKIE_PRICE\n\n# order.py\norder.append("ginger")\nprint_paper(___(order))',
        options: ['menu', 'len', 'website', 'cookie_count'],
        answer: ['menu', 'len'],
        why: 'The menu owns the price, so the website fetches it from there. And <code>len(order)</code> counts the list each time, so no second copy of the count exists.',
        hint: 'The first blank is the file that owns the price. The second blank counts the things in a list.'
      },
      {
        type: 'order', q: "Put Maya's story in order.",
        items: ['Three files each keep their own cookie price', 'Maya raises the price in the menu file only', 'The website still shows $3 and the shop charges $4', 'Maya decides the menu owns the price', 'The website and the app read the price from the menu'],
        why: 'The trap was set when the second copy was made. It only showed on the day the price changed.',
        hint: 'Deciding who owns the fact comes before changing the code.'
      },
      {
        type: 'bucket', q: 'Lesson 6 or lesson 7? Sort each one: is it a rule (steps to follow) or a fact (a piece of data)?',
        buckets: ['A rule: give it one home (DRY)', 'A fact: store it in one place'],
        items: [
          ['How to work out a total with tax', 0],
          ['How to decide who gets the big order discount', 0],
          ['A choc chip cookie costs $4', 1],
          ['The shop closes at 17', 1],
          ['The phone number of the shop', 1]
        ],
        why: 'DRY from lesson 6 keeps each rule in one job. Single source of truth keeps each fact in one place. Both stop copies from drifting apart.',
        hint: 'A rule tells you how to do something. A fact is just a value you can look up.'
      },
      {
        type: 'pick', q: 'Back to lesson 1. The website now needs the sales tax too. What should <code>website.py</code> do?',
        pic: code(taxCode, { title: 'shop.py from lesson 1, fixed' }),
        options: ['Type 0.09 again in website.py', 'Add its own line: WEB_TAX_RATE = 0.09', 'from shop import TAX_RATE', 'Ask Maya for the tax every time the page loads'],
        answer: 2,
        why: '<code>shop.py</code> already owns the tax rate. A second copy with a new name is still a second copy. Fetch it from the owner.',
        hint: 'Two of these store the tax in a second place.'
      },
      {
        type: 'bucket', q: 'Which of these are fine, and which will cause trouble?',
        buckets: ['Fine', 'Trouble'],
        items: [
          ['A backup made every night from the original', 0],
          ['A saved copy for speed, refreshed from the original', 0],
          ["Monday's receipt keeps the $3 that was paid on Monday", 0],
          ['The price typed again in the website file', 1],
          ['A count stored next to the list it counts', 1],
          ["Old receipts that read today's price from the menu", 1]
        ],
        why: 'A copy is safe when everyone knows which one is the original and the copy is refreshed from it. And an old receipt is not a copy of the price. It records a different fact.',
        hint: 'For each one ask: if two places disagree, do we know which one wins?'
      }
    ]
  });
})();
