/* Lesson 44: Layers and the dependency rule (module 5). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l44  Layers and the dependency rule
     ===================================================================== */
  const ring = (x, y, w, h, fill, r) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r || 20}" fill="${fill}" stroke="${P.ink}" stroke-width="2.5"/>`;
  const divider = (x, y1, y2) => `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>`;

  // A map of files. Each node is [label, cx, cy, fill]. An arrow from A to B means "A mentions B".
  const FW = s => s.length * 7 + 16, FH = 28;
  const fileBox = n => box(n[1] - FW(n[0]) / 2, n[2] - FH / 2, FW(n[0]), FH, n[3] || P.white, 8) + T(n[1], n[2] + 4, n[0], { s: 11.5, m: true });
  // The point where the line from a towards b leaves a's box, pushed out by a small gap.
  const edge = (a, b, gap) => {
    const dx = b[1] - a[1], dy = b[2] - a[2], len = Math.hypot(dx, dy) || 1;
    const hw = FW(a[0]) / 2 + gap, hh = FH / 2 + gap;
    const t = Math.min(dx ? hw / Math.abs(dx) : 1e9, dy ? hh / Math.abs(dy) : 1e9);
    return [a[1] + dx * t, a[2] + dy * t, len];
  };
  const link = (N, a, b, col, w) => { const p = edge(N[a], N[b], 3), q = edge(N[b], N[a], 7); return arrow(p[0], p[1], q[0], q[1], col, w || 2.5); };

  /* ---- The idea: a restaurant in three rings ---- */
  const ideaPic = svg(600, 300, 'A restaurant drawn as three rings. The recipes are in the centre. The kitchen is around them. The dining room, the waiters and the delivery app are on the outside. Every arrow points inward.',
    ring(40, 16, 520, 240, P.paper2, 26) + T(300, 46, 'dining room, waiters, delivery app', { s: 13.5 }) +
    T(300, 244, 'repainted and swapped every few years', { s: 12, w: 700, f: P.ink2 }) +
    ring(104, 62, 392, 164, P.tint, 22) + T(300, 90, 'the kitchen', { s: 13.5, f: P.accent }) +
    T(300, 214, 'follows the recipes', { s: 12, w: 700, f: P.ink2 }) +
    ring(176, 104, 248, 92, P.warnT, 18) + T(300, 144, 'the recipes', { s: 16 }) + T(300, 168, 'valuable, slow to change', { s: 12, w: 700, f: P.ink2 }) +
    arrow(50, 150, 98, 150, P.ok, 3) + arrow(114, 150, 170, 150, P.ok, 3) +
    arrow(550, 150, 502, 150, P.ok, 3) + arrow(486, 150, 430, 150, P.ok, 3) +
    T(300, 286, 'Waiters talk to the kitchen. The kitchen reads the recipes. Nobody rewrites a recipe.', { s: 12.5, w: 700, f: P.ink2 }));

  /* ---- The code: the honest map, a hairball ---- */
  const H = {
    tax: ['tax.py', 140, 64], web: ['website.py', 486, 244], db: ['database.py', 100, 224],
    place: ['place_order.py', 350, 96], order: ['order.py', 520, 70], printer: ['printer.py', 250, 30],
    refund: ['refund_sale.py', 190, 300], card: ['card_payment.py', 520, 158], points: ['points.py', 400, 302],
    till: ['till_screen.py', 270, 204]
  };
  const hairArrows = [['order', 'printer'], ['refund', 'card'], ['place', 'tax'], ['place', 'order'], ['refund', 'points'], ['place', 'till'], ['web', 'place']];
  const hairPic = svg(600, 350, 'A map of 10 files with arrows going in every direction. Three arrows are red and form a loop: tax.py needs website.py, website.py needs database.py, and database.py needs tax.py.',
    hairArrows.map(a => link(H, a[0], a[1], P.mute, 2.2)).join('') +
    link(H, 'tax', 'web', P.danger, 3.2) + link(H, 'web', 'db', P.danger, 3.2) + link(H, 'db', 'tax', P.danger, 3.2) +
    Object.keys(H).map(k => fileBox(H[k].concat([['tax', 'web', 'db'].includes(k) ? P.dangerT : P.white]))).join('') +
    T(166, 176, 'a loop', { s: 12.5, f: P.danger }) +
    T(300, 340, '10 files. An arrow means "mentions". The red three need each other in a circle.', { s: 12.5, w: 700, f: P.ink2 }));
  const taxBefore = [
    'from website import show_note',
    '',
    'TAX_RATE = 0.09',
    '',
    'def add_tax(price):',
    '    show_note("Price includes tax")',
    '    return price + price * TAX_RATE'
  ];
  const webBefore = [
    'import web_toolkit',
    'import database',
    '',
    'def checkout_page(order):',
    '    price = order.price',
    '    if price >= 20:',
    '        price = price - price * 0.10',
    '    total = database.save_sale(order.time, price)',
    '    web_toolkit.show("Total: " + str(total))',
    '',
    'def gift_box_page(order):',
    '    database.insert_row(order.time, order.price)',
    '    web_toolkit.show("Thank you!")'
  ];
  const codePic = `<div style="width:100%">${hairPic}${code(taxBefore, { title: 'tax.py', bad: [1, 6] })}${code(webBefore, { title: 'website.py, the top half', hi: [1, 2], bad: [6, 7, 8] })}</div>`;

  /* ---- The pain: one rule in three files, and two totals ---- */
  const smearPic = svg(600, 330, 'The rule for working out a total is spread over three files: 10 percent off in website.py, the tax added in database.py, and the rate in tax.py. The new phone app has nowhere to get the total from. Below, the same 20 dollar order costs 19 dollars 62 on the checkout page and 20 dollars on the gift box page.',
    T(300, 24, 'WHERE IS "HOW A TOTAL IS WORKED OUT"?', { s: 12.5, f: P.danger }) +
    [['website.py', '10% off', 'a web page'], ['database.py', 'adds the tax', 'saving code'], ['tax.py', 'the rate, 0.09', 'a rules file']].map((r, i) => {
      const x = 20 + i * 138;
      return box(x, 42, 126, 84, i === 2 ? P.white : P.dangerT, 12) + T(x + 63, 64, r[0], { s: 11.5, m: true }) +
        box(x + 12, 74, 102, 26, P.warnT, 8) + T(x + 63, 92, r[1], { s: 11.5 }) + T(x + 63, 118, r[2], { s: 11, w: 700, f: P.ink2 });
    }).join('') +
    `<rect x="450" y="42" width="132" height="84" rx="12" fill="${P.paper2}" stroke="${P.ink}" stroke-width="2.5" stroke-dasharray="7 6"/>` +
    T(516, 68, 'phone_app.py', { s: 11.5, m: true }) + T(516, 98, '?', { s: 26, f: P.danger }) + T(516, 118, 'copy which lines?', { s: 11, w: 700, f: P.ink2 }) +
    T(300, 156, 'One rule, smeared over 3 files.', { s: 13, w: 700, f: P.ink2 }) +
    `<line x1="30" y1="174" x2="570" y2="174" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    T(300, 198, 'THE SAME $20 ORDER, ON TWO PAGES', { s: 12.5, f: P.danger }) +
    box(40, 214, 200, 70, P.white, 14) + T(140, 258, '$19.62', { s: 26, m: true }) + T(140, 306, 'checkout page', { s: 12.5, w: 700, f: P.ink2 }) +
    `<circle cx="300" cy="249" r="26" fill="${P.dangerT}" stroke="${P.ink}" stroke-width="2.5"/>` + T(300, 260, '≠', { s: 30, f: P.danger }) +
    box(360, 214, 200, 70, P.dangerT, 14) + T(460, 258, '$20.00', { s: 26, m: true, f: P.danger }) + T(460, 306, 'gift box page', { s: 12.5, w: 700, f: P.ink2 }) +
    T(300, 324, '$18 after 10% off, plus $1.62 tax, is $19.62.', { s: 12, w: 700, f: P.ink2 }));
  const painPic = `<div style="width:100%">${smearPic}</div>`;

  /* ---- The fix: the same files in three rings ---- */
  const R = {
    till: ['till_screen.py', 96, 62], phone: ['phone_app.py', 226, 62, P.okT], web: ['website.py', 348, 62], db: ['database.py', 120, 356],
    printer: ['printer.py', 292, 356], card: ['card_payment.py', 474, 356],
    place: ['place_order.py', 226, 128], refund: ['refund_sale.py', 412, 290],
    order: ['order.py', 226, 210], tax: ['tax.py', 302, 210], points: ['points.py', 380, 210]
  };
  const ringArrows = [['till', 'place'], ['phone', 'place'], ['web', 'place'], ['place', 'order'], ['order', 'tax'], ['refund', 'points'], ['db', 'order'], ['printer', 'tax'], ['card', 'refund']];
  const ringsPic = svg(600, 420, 'The same files sorted into three rings. The centre holds order.py, tax.py and points.py. The middle holds place_order.py and refund_sale.py. The outside holds the till screen, the website, the new phone app, the database, the printer and the card payment file. Every arrow points inward or stays in its own ring.',
    ring(14, 30, 572, 360, P.paper2, 26) + T(500, 54, 'OUTSIDE', { s: 12, f: P.ink2 }) + T(500, 70, 'touches the world', { s: 11.5, w: 700, f: P.ink2 }) +
    ring(96, 98, 408, 224, P.tint, 22) + T(408, 124, 'MIDDLE', { s: 12, f: P.accent }) + T(408, 140, 'what the shop does', { s: 11.5, w: 700, f: P.ink2 }) +
    ring(170, 166, 260, 88, P.warnT, 18) + T(338, 186, "CENTRE: the shop's rules", { s: 12, f: P.warn }) +
    ringArrows.map(a => link(R, a[0], a[1], P.ok, 2.6)).join('') +
    Object.keys(R).map(k => fileBox(R[k])).join('') +
    T(300, 412, 'Same files. Every arrow now points in, or stays in its own ring.', { s: 12.5, w: 700, f: P.ink2 }));
  const orderAfter = [
    'from rules.tax import TAX_RATE',
    '',
    'def final_total(price):',
    '    if price >= 20:',
    '        price = price - price * 0.10',
    '    return price + price * TAX_RATE'
  ];
  const placeAfter = [
    'from rules.order import final_total',
    '',
    'def place_order(order, sales_book, printer):',
    '    total = final_total(order.price)',
    '    sales_book.save(order.time, total)',
    '    printer.print_line("Paid " + str(total))',
    '    return total'
  ];
  const webAfter = [
    'import web_toolkit',
    'from use_cases.place_order import place_order',
    '',
    'def checkout_page(order, sales_book, printer):',
    '    total = place_order(order, sales_book, printer)',
    '    web_toolkit.show("Total: " + str(total))',
    '    web_toolkit.show("Price includes tax")',
    '',
    'def gift_box_page(order, sales_book, printer):',
    '    place_order(order, sales_book, printer)',
    '    web_toolkit.show("Thank you!")'
  ];
  const phoneAfter = [
    'import phone_toolkit',
    'from use_cases.place_order import place_order',
    '',
    'def order_screen(order, sales_book, printer):',
    '    total = place_order(order, sales_book, printer)',
    '    phone_toolkit.show("Total: " + str(total))'
  ];
  const fixPic = `<div style="width:100%">${ringsPic}${code(orderAfter, { title: 'rules/order.py (the centre)', good: [1, 3] })}${code(placeAfter, { title: 'use_cases/place_order.py (the middle)', good: [1, 4] })}${code(webAfter, { title: 'outside/website.py', good: [2, 5, 10] })}${code(phoneAfter, { title: 'outside/phone_app.py, the new file', good: [2, 5] })}</div>`;

  /* ---- The test: read the imports at the top of a centre file ---- */
  const badTop = [
    'import web_toolkit',
    'from outside.database import insert_row',
    'from use_cases.place_order import place_order',
    'from rules.tax import TAX_RATE'
  ];
  const testPic = `<div style="width:100%">${code(badTop, { title: 'rules/order.py, breaks the rule', bad: [1, 2, 3], good: [4] })}${code(orderAfter, { title: 'rules/order.py, keeps the rule', good: [1] })}` +
    svg(600, 96, 'A file in the centre may import from the centre only. A file in the middle may import from the middle and the centre. A file on the outside may import from anywhere further in.',
      [['a file in rules', 'may import: rules', P.warnT], ['a file in use_cases', 'may import: use_cases, rules', P.tint], ['a file in outside', 'may import: all three', P.paper2]].map((r, i) => {
        const x = 12 + i * 196;
        return box(x, 12, 184, 66, r[2], 12) + T(x + 92, 38, r[0], { s: 12.5 }) + T(x + 92, 60, r[1], { s: 11.5, w: 700, f: P.ink2 });
      }).join('')) + `</div>`;

  /* ---- When not to: empty pass-through layers ---- */
  const overCode = [
    '# rules/contact.py',
    'SHOP_PHONE = "555 0100"',
    '',
    '# use_cases/get_phone.py',
    'from rules.contact import SHOP_PHONE',
    '',
    'def get_phone():',
    '    return SHOP_PHONE',
    '',
    '# outside/contact_page.py',
    'from use_cases.get_phone import get_phone',
    '',
    'def contact_page():',
    '    web_toolkit.show(get_phone())'
  ];
  const plainCode = [
    '# rules/contact.py',
    'SHOP_PHONE = "555 0100"',
    '',
    '# outside/contact_page.py',
    'from rules.contact import SHOP_PHONE',
    '',
    'def contact_page():',
    '    web_toolkit.show(SHOP_PHONE)'
  ];
  const twoPic = svg(600, 230, 'On the left, a start with two layers: the rules, and everything else around them, with arrows pointing in. On the right, a small script as one single file with no rings at all.',
    T(160, 26, 'START WITH TWO', { s: 12.5, f: P.ok }) + T(460, 26, 'A SMALL SCRIPT', { s: 12.5, f: P.ok }) +
    divider(320, 16, 214) +
    ring(30, 42, 260, 130, P.paper2, 22) + T(160, 66, 'everything else', { s: 13 }) +
    ring(86, 82, 148, 62, P.warnT, 16) + T(160, 119, 'the rules', { s: 14 }) +
    arrow(40, 113, 80, 113, P.ok, 3) + arrow(280, 113, 240, 113, P.ok, 3) +
    T(160, 196, 'one arrow rule between them', { s: 12.5, w: 700, f: P.ink2 }) + T(160, 214, 'add a middle ring when it is needed', { s: 12.5, w: 700, f: P.ink2 }) +
    box(380, 68, 160, 78, P.okT, 16) + T(460, 102, 'count_cookies.py', { s: 12.5, m: true }) + T(460, 124, '10 lines, 1 file', { s: 12, w: 700, f: P.ink2 }) +
    T(460, 196, 'no rings at all', { s: 12.5, w: 700, f: P.ink2 }) + T(460, 214, 'fine as it is', { s: 12.5, w: 700, f: P.ink2 }));
  const whenNotPic = `<div style="width:100%">${code(overCode, { title: 'three rings for one phone number', bad: [4, 5, 7, 8] })}${code(plainCode, { title: 'the same job, skipping the empty ring', good: [5] })}${twoPic}</div>`;

  COURSE.add({
    id: 'l44', minutes: 10,
    summary: 'Time to zoom out from single files to the whole program. Arrange it in <b>layers</b>, like the rings of an onion: the shop\'s rules in the centre, the things the shop does around them, and everything that touches the world on the outside. Then keep one rule about dependencies: <b>arrows point inward</b>.',
    video: {
      src: 'videos/l44-layers.mp4', poster: 'videos/l44-layers.jpg', length: '1 min 7 s',
      script: [
        "Maya's shop program has grown. 10 files now. And the arrows between them go everywhere.",
        'An arrow means, this file mentions that one. The tax rule imports the web page. The web page imports the database. The database imports the tax rule. A loop.',
        "Now Maya wants a phone app. But the shop's rules are smeared across the web page and the database code. She would have to copy them out.",
        "The fix. Sort the same files into 3 rings. In the centre, the shop's rules. Around them, the things the shop does. Outside, everything that touches the world.",
        'Then one rule. Arrows may only point inward. Any arrow that points out gets turned around.',
        'Now drop in the phone app. Swap the database. Files changed in the centre: 0.',
        'To check, read the imports at the top of a centre file. It must name nothing from outside.',
        'That is the dependency rule. Arrows point inward.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Recipes in the middle.',
        text: [
          'Think about what a restaurant really owns. Its <b>recipes</b>. They are the valuable part, and they change slowly. Around them is the <b>kitchen</b>, which follows the recipes to cook each order. On the outside are the <b>dining room</b>, the waiters and the delivery app: everything a customer sees and touches.',
          'The outside changes all the time. The dining room gets new paint. The delivery company is swapped for a cheaper one. None of that rewrites a recipe. Waiters talk to the kitchen. The kitchen reads the recipes. And no recipe says "serve this at table 4".',
          'A whole program can be arranged the same way, in three <b>layers</b>. Picture them as rings. The <b>centre</b> holds the shop\'s own rules and facts: what an order is, how a total and its tax are worked out, when a free cookie is earned. The <b>middle</b> holds the things the shop does, step by step: "place an order", "refund a sale". Programmers call each of those a <b>use case</b>. The <b>outside</b> holds everything that touches the world: the web pages, the till screen, the database, the printer, the payment company.',
          'Then comes one rule. In lesson 32, "A depends on B" meant that A\'s code mentions B, for example by importing it. The <b>dependency rule</b> says: code may only depend on things in its own ring, or <b>further in</b>. Never further out. Draw every dependency as an arrow, and <b>all the arrows point inward</b>.',
          'So nothing in the centre may know that web pages, databases or printers exist.'
        ],
        tip: 'Arranging a program in layers like this is called <b>layered architecture</b>. Close cousins go by the names <b>hexagonal architecture</b>, also called <b>ports and adapters</b>, from Alistair Cockburn, and <b>clean architecture</b>, from Robert C. Martin, who phrased the dependency rule.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'The honest map.',
        text: [
          'Until now, every lesson looked at one file or one function. From here on the course <b>zooms out</b>. The first picture is a map of Maya\'s whole program as it really grew: <b>10 files</b>. An arrow from one file to another means the first one <b>mentions</b> the second, as in lesson 32.',
          'Lesson 32, Dependency inversion, turned one arrow round. Lesson 33, Dependency injection, handed one checkout its parts. Most of the other files never got that care.',
          'Read <code>tax.py</code>. It holds a rule of the shop. But line 1 fetches <code>show_note</code> from the <b>website</b>, and line 6 uses it to put a note on a web page. A tax rule that knows about web pages.',
          'Read <code>website.py</code>. Line 1 fetches the ready-made toolkit that draws web pages. Maya did not write it. Line 2 fetches her own database file. Lines 6 and 7 are the rule from lesson 6, DRY: orders of $20 or more get 10% off. It is typed into a <b>web page</b>. Line 8 hands the price straight to the database code. That code adds the tax, saves the sale and hands back the total.',
          'Now follow the three red arrows on the map. <code>tax.py</code> needs <code>website.py</code>. <code>website.py</code> needs <code>database.py</code>. <code>database.py</code> needs <code>tax.py</code>. That is a <b>loop</b>. You cannot pick up any one of the three without the other two.'
        ],
        tip: 'Lesson 15, Separation of concerns, named three kinds of work: working things out, saving and showing. Maya did give each kind its own files. What nobody ever decided was <b>which files may mention which</b>.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'A phone app, and nowhere to plug it in.',
        text: [
          'Customers keep asking to order from their phones. Lesson 8, YAGNI, said to wait until someone really asks. Now they have. Maya wants an ordering <b>app next to the website</b>. The small loyalty app from lesson 7 only shows prices. This one must take orders.',
          'The app must charge the same totals as the website. So where is "how a total is worked out" written down? The 10% off is in <code>checkout_page</code>, inside the website. The tax is added by the database code. The rate is in <code>tax.py</code>. <b>One rule, smeared over 3 files</b>, and only one of them is a rules file.',
          'She has two choices. She can <b>copy</b> lines 5 to 7 out of the web page into the app. Lesson 6 showed where copies lead: they drift apart. Or the app can call the web page code. Then a phone app needs the web toolkit just to work out a price.',
          'The pages have already drifted once. Look at <code>gift_box_page</code>. Line 12 skips the discount, and it uses a shortcut, <code>insert_row</code>, that saves an amount with no tax added. A $20 gift box is saved as <b>$20.00</b>. The same $20 on the checkout page is $18 after 10% off, plus $1.62 tax: <b>$19.62</b>. Two pages, two totals.',
          'And the loop bites as soon as she tries to fix anything. To try <code>tax.py</code> on its own she has to load the website, which loads the database. A small tax rule cannot be tried without a web toolkit and a real database. Even the till, which has no web page at all, drags the website in every time it adds tax.'
        ],
        warn: 'Each of those arrows was added on a busy day, for a sensible reason. A hairball is what you get when <b>no arrow is ever refused</b>.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Three rings. Every arrow points in.',
        text: [
          'Maya does not rewrite the shop. She <b>sorts the same 10 files</b> into three folders, one per ring: <code>rules</code> for the centre, <code>use_cases</code> for the middle, and <code>outside</code> for everything that touches the world.',
          '<b>Step 1: move every rule to the centre.</b> The 10% off comes out of the web page. The adding of tax comes out of the database code. Both go back into one job, <code>final_total</code>, the one home that lesson 6 gave them. One new bit of Python is on line 1: <code>from rules.tax import TAX_RATE</code>. The dot means "the file <code>tax.py</code> inside the folder <code>rules</code>".',
          '<b>Step 2: give each thing the shop does one home in the middle.</b> <code>place_order</code> is a short list of steps, like the checkout in lesson 15. It asks the centre for the total. Then it tells a sales book to save and a printer to print. It is <b>handed</b> those two parts, as lesson 33 taught. So it never mentions a database or a brand of printer.',
          '<b>Step 3: turn round every arrow that points out.</b> There are two moves. The first: a rule hands back an answer and shows nothing. <code>tax.py</code> no longer imports the website. The page that wants a note about tax writes the note itself, on line 7 of <code>website.py</code>. The second move is lesson 32\'s. The inside says what it needs, in its own words: a sales book with a <code>save</code> job. The database file is rebuilt to fit that, so it points in.',
          'Now add the phone app. It is <b>one more file in the outer ring</b>. Six lines. It calls the same <code>place_order</code> as the website. Website and app share one centre, so they <b>cannot disagree</b> about tax. A $20 gift box is $19.62 everywhere.',
          'Later the accountant moves the books again, from the database to an online service. One outside file is swapped for another. <b>Files changed in the centre: 0.</b>'
        ],
        tip: 'Who builds the real sales book and the real printer? <code>main.py</code>, the wiring from lesson 33. It sits on the very outside, because it is the one file that is allowed to know everybody.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Read the imports at the top.',
        text: [
          'Ask: <b>"Does anything in the centre know that the outside exists?"</b>',
          'You can check it in ten seconds. Open a file in the centre and read the <code>import</code> lines at the top. If any of them names something from an outer ring, the rule is broken. That means a web toolkit, a database tool, or one of your own files from <code>outside</code> or <code>use_cases</code>.',
          'The picture shows two tops for <code>rules/order.py</code>. In the first, lines 1 to 3 point outward. Line 4 is fine: <code>rules.tax</code> is in the same ring. In the second, the only import stays in the centre.',
          'Then do the same one ring out. A file in <code>use_cases</code> may import from <code>rules</code>. It may not import from <code>outside</code>.',
          'Why is this worth the trouble? The centre is the valuable, slow-changing part. With no outward imports, you can try it with no screen and no database: <code>final_total(20)</code> works out $19.62 on any computer. And the outside is where fashions and suppliers change every few years: a new look for the website, a new database, a new payment company. Each outer piece can be replaced <b>without the centre noticing</b>.'
        ],
        tip: 'This is lesson 32 applied to the whole map instead of one function. Lesson 32 turned one arrow. The dependency rule says which way <b>all</b> of them may point. It is also lesson 3, Loose coupling, at full size: swap an outer part, and count how many other parts must change.'
      },
      {
        label: 'When not to', pic: whenNotPic,
        h: 'Three rings are not a starter kit.',
        text: [
          '<b>A small program does not need rings.</b> A script, a weekend project, the 10-line cookie counter from lesson 15: one file is fine. Lesson 8, YAGNI, said to wait for a real need.',
          '<b>Layers drawn too early are empty.</b> Suppose Maya loves this lesson and gives every new feature all three rings on day one. Showing the shop\'s phone number becomes three files, and the middle one only passes the answer along. Every reader hops through a file that adds nothing. That is lesson 4 again: 4 files for 2 words.',
          '<b>Two layers are often plenty to start with.</b> The rules, and everything else. Keep the one arrow rule between them. Add a middle ring on the day "everything else" grows real steps of its own, like placing an order.',
          '<b>Layers are a map for dependencies, not a route.</b> The rule says which way arrows may point. It does not say that every feature must touch every ring. A page that only shows a phone number can import it from the centre and show it. That arrow points inward, so the rule is kept.'
        ],
        warn: 'Ask lesson 4\'s question: "Is this problem real right now?" For Maya it was. She had a second way to order, and one rule smeared over 3 files. Next, a closer look at the outer ring. It hides messy details behind tidy ideas, and sometimes the mess shows through: lesson 45, Leaky abstractions.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'This file lives in the centre. Which lines break the dependency rule? Pick all that apply.',
        pic: code([
          'import printer_tool',
          'from rules.order import final_total',
          'from outside.website import show_banner',
          '',
          'def free_cookie(card):',
          '    return card.points >= 30'
        ], { title: 'rules/points.py' }),
        options: ['Line 1', 'Line 2', 'Line 3', 'Line 5'],
        answer: [0, 2],
        why: 'Line 1 names a printer tool and line 3 names a file from <code>outside</code>. A rule about free cookies now knows that printers and web pages exist. Line 2 stays inside <code>rules</code>, which is the same ring.',
        hint: 'Read only the import lines. Which ones name something that is not in <code>rules</code>?'
      },
      {
        type: 'bucket', q: 'Which ring does each one belong in?',
        buckets: ['Centre: rules', 'Middle: use cases', 'Outside'],
        items: [
          ['A free cookie costs 30 points', 0],
          ['Orders of $20 or more get 10% off', 0],
          ['The steps of "place an order"', 1],
          ['The steps of "refund a sale"', 1],
          ['The checkout web page', 2],
          ['The receipt printer', 2],
          ['The payment company', 2]
        ],
        why: 'Rules and facts of the shop go in the centre. The things the shop does, step by step, go in the middle. Anything that shows, saves, prints or sends touches the world, so it goes outside.',
        hint: 'Would it still be true if Maya changed every screen and every supplier? Then it is a rule.'
      },
      {
        type: 'type', q: 'This job is in the centre, so you can try it with no screen and no database. <code>TAX_RATE</code> is 0.09. What does <code>final_total(30)</code> work out? Type the amount.',
        pic: code(orderAfter, { title: 'rules/order.py' }),
        prompt: 'dollars >',
        answers: ['29.43', '$29.43', '29.43 dollars'],
        why: '30 is at least 20, so 10% comes off: $27. Then 9% tax on $27 is $2.43. The total is $29.43. The website and the phone app both get this answer, because they both ask the same job.',
        hint: 'First take 10% off 30. Then add 9% of what is left.'
      },
      {
        type: 'fill', q: 'Finish the phone app so that it is one more file in the outer ring.',
        text: 'import phone_toolkit\nfrom ___.place_order import ___\n\ndef order_screen(order, sales_book, printer):\n    total = ___(order, sales_book, printer)\n    phone_toolkit.show("Total: " + str(total))',
        options: ['use_cases', 'place_order', 'place_order', 'rules', 'checkout_page', 'website'],
        answer: ['use_cases', 'place_order', 'place_order'],
        why: 'The app fetches <code>place_order</code> from the middle ring and calls it. It does not copy any rule, and it does not touch the website. That arrow points inward.',
        hint: 'The app should call the same job as the website. Which folder holds the things the shop does?'
      },
      {
        type: 'order', q: "Put Maya's fix in order.",
        items: ['Draw the map: 10 files, arrows everywhere', 'Sort the files into three rings', 'Move every rule into the centre', 'Turn round each arrow that points outward', 'Add the phone app as one more outside file'],
        why: 'You have to see the arrows before you can sort them. And the app only becomes easy once the rules are in one place and nothing in the centre points out.',
        hint: 'She starts by looking, and the phone app comes last.'
      },
      {
        type: 'pick', q: 'After the fix, the accountant moves the books from the database to an online service. How many files in the centre must change?',
        options: ['0', '1', '3', 'All of them'],
        answer: 0,
        why: 'Nothing in the centre mentions the database, so nothing there can notice it leaving. One outside file is swapped, and the wiring in <code>main.py</code> hands over the new one. This is lesson 32, Dependency inversion, paying off across the whole program.',
        hint: 'Does any file in <code>rules</code> import anything from <code>outside</code>?'
      },
      {
        type: 'match', q: 'This lesson is built from earlier ones. Match each idea to what it does.',
        pairs: [
          ['Separation of concerns (lesson 15)', 'Each kind of work gets its own part'],
          ['Dependency inversion (lesson 32)', 'The rules own an idea, and one detail is built to fit it'],
          ['Dependency injection (lesson 33)', 'One wiring place builds the real parts and hands them in'],
          ['Layers and the dependency rule', 'The whole program sits in rings, and every arrow points inward']
        ],
        why: 'Lesson 15 split the kinds of work. Lesson 32 turned one arrow. Lesson 33 handed the parts in. This lesson draws the whole map and gives every arrow one direction.',
        hint: 'Lesson 32 was about one arrow. This lesson is about all of them.'
      },
      {
        type: 'pick', q: 'Which of these are signs that layers are being overdone? Pick all that apply.',
        options: [
          'A 10-line script that is run once, split into three folders',
          'A use case file whose only line passes the call on to the next file',
          'A team rule that every feature must add a file to all three rings',
          'A tax rule that imports nothing from outside'
        ],
        answer: [0, 1, 2],
        why: 'A tiny script needs no rings. A file that only passes a call along adds a hop and nothing else. And layers say which way arrows may point, not that every feature must visit every ring. The last one is the rule working as it should.',
        hint: 'One of the four is exactly what this lesson recommends.'
      }
    ]
  });
})();
