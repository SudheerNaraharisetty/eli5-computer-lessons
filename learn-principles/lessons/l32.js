/* Lesson 32: Dependency inversion (module 3). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l32  Dependency inversion
     ===================================================================== */
  const divider = (x, y1, y2) => `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>`;
  const two = (x, y, a, b, o) => T(x, y, a, o) + T(x, y + ((o && o.gap) || 16), b, o);

  /* ---- The idea: built around Bob, or built around a job description ---- */
  const ideaPic = svg(600, 300, 'On the left a bakery is built around one driver, Bob, and its arrow points down at him. On the right the bakery has written a job description, and Bob, Asha and a courier firm all point up at it.',
    T(150, 30, 'BUILT AROUND BOB', { s: 12.5, f: P.danger }) + T(450, 30, 'BUILT AROUND A JOB DESCRIPTION', { s: 12.5, f: P.ok }) +
    divider(300, 18, 284) +
    box(70, 50, 160, 56, P.white, 14) + T(150, 84, 'the bakery', { s: 14 }) +
    arrow(150, 114, 150, 176, P.danger, 3.5) + T(162, 150, 'needs him', { s: 12, w: 700, f: P.ink2, a: 'start' }) +
    box(70, 180, 160, 50, P.dangerT, 14) + T(150, 211, 'Bob', { s: 15, f: P.danger }) +
    T(150, 262, 'Bob moves away.', { s: 13, w: 700, f: P.ink2 }) + T(150, 280, 'The bakery has to be rewritten.', { s: 13, w: 700, f: P.ink2 }) +
    box(340, 46, 220, 68, P.white, 14) + T(450, 72, 'the bakery', { s: 14 }) +
    box(356, 88, 188, 56, P.warnT, 10) + T(450, 111, 'WANTED: a driver', { s: 12.5 }) + T(450, 130, 'drives a van, has a licence', { s: 11.5, w: 700, f: P.ink2 }) +
    [['Bob', 372], ['Asha', 450], ['a courier', 528]].map((p, i) =>
      arrow(p[1], 196, [410, 450, 490][i], 154, P.ok, 3) + box(p[1] - 36, 200, 72, 34, P.okT, 10) + T(p[1], 222, p[0], { s: 12 })).join('') +
    T(450, 262, 'The bakery wrote the description.', { s: 13, w: 700, f: P.ink2 }) + T(450, 280, 'Anyone who fits it can do the job.', { s: 13, w: 700, f: P.ink2 }));

  /* ---- The code: rules that name the spreadsheet ---- */
  const beforeCode = [
    'import spreadsheet',
    '',
    'TAX_RATE = 0.09',
    '',
    'def record_sale(order):',
    '    total = order.price + order.price * TAX_RATE',
    '    points = order.price',
    '    sheet = spreadsheet.open("sales.xlsx")',
    '    sheet.add_row(order.time, total, points)',
    '    sheet.save()'
  ];
  const downPic = svg(600, 120, 'The shop rules file points with an arrow at the spreadsheet tool. The rules depend on a detail.',
    box(40, 30, 190, 56, P.white, 14) + T(135, 54, 'shop rules', { s: 14 }) + T(135, 72, 'rules.py', { s: 11.5, m: true, f: P.ink2 }) +
    arrow(240, 58, 356, 58, P.danger, 3.5) + T(298, 46, 'depends on', { s: 12, w: 700, f: P.danger }) +
    box(366, 30, 194, 56, P.dangerT, 14) + T(463, 54, 'spreadsheet tool', { s: 14 }) + T(463, 72, 'a detail', { s: 11.5, w: 700, f: P.ink2 }) +
    T(300, 112, 'The arrow starts at whoever does the mentioning.', { s: 12.5, w: 700, f: P.ink2 }));
  const codePic = `<div style="width:100%">${code(beforeCode, { title: 'rules.py', hi: [1, 8, 9, 10] })}${downPic}</div>`;

  /* ---- The pain: the supplier changes, the rules file is rewritten ---- */
  const dbCode = [
    'import database',
    '',
    'TAX_RATE = 0.09',
    '',
    'def record_sale(order):',
    '    total = order.price + order.price * TAX_RATE',
    '    points = order.price',
    '    db = database.connect("shop.db")',
    '    db.insert(order.time, total * 100, points * 100)',
    '    db.close()'
  ];
  const cookiePic = svg(600, 196, 'One 3 dollar cookie is saved as 300 points when it should be 3. At 30 points per free cookie, that is 10 free cookies. The rules changed 0 times but the rules file was rewritten 2 times.',
    box(24, 18, 160, 76, P.white, 14) + T(104, 50, '1 cookie', { s: 15 }) + T(104, 74, '$3', { s: 15, m: true }) +
    arrow(192, 56, 222, 56, P.ink, 3) +
    box(230, 18, 160, 76, P.dangerT, 14) + T(310, 50, '300 points', { s: 15, f: P.danger }) + T(310, 74, 'should be 3', { s: 12.5, w: 700, f: P.ink2 }) +
    arrow(398, 56, 428, 56, P.ink, 3) +
    box(436, 18, 140, 76, P.warnT, 14) + T(506, 50, '10 free cookies', { s: 14 }) + T(506, 74, '300 ÷ 30', { s: 12.5, m: true, f: P.ink2 }) +
    box(60, 122, 220, 46, P.okT, 12) + T(170, 151, 'the rules changed: 0 times', { s: 13, f: P.ok }) +
    box(320, 122, 220, 46, P.dangerT, 12) + T(430, 151, 'rules.py rewritten: 2 times', { s: 13, f: P.danger }) +
    T(300, 190, 'A free cookie costs 30 points, as in lesson 2.', { s: 12.5, w: 700, f: P.ink2 }));
  const painPic = `<div style="width:100%">${code(dbCode, { title: 'rules.py, rewritten for the database', hi: [1, 8, 10], bad: [9] })}${cookiePic}</div>`;

  /* ---- The fix: the rules own the idea, the details fit it ---- */
  const rulesCode = [
    'TAX_RATE = 0.09',
    '',
    'class SalesBook:',
    '    def save(self, time, total, points):',
    '        pass',
    '',
    'def record_sale(order, sales_book):',
    '    total = order.price + order.price * TAX_RATE',
    '    points = order.price',
    '    sales_book.save(order.time, total, points)'
  ];
  const sheetBook = [
    'import spreadsheet',
    'from rules import SalesBook',
    '',
    'class SpreadsheetBook(SalesBook):',
    '    def save(self, time, total, points):',
    '        sheet = spreadsheet.open("sales.xlsx")',
    '        sheet.add_row(time, total, points)',
    '        sheet.save()'
  ];
  const dbBook = [
    'import database',
    'from rules import SalesBook',
    '',
    'class DatabaseBook(SalesBook):',
    '    def save(self, time, total, points):',
    '        db = database.connect("shop.db")',
    '        db.insert(time, total * 100, points)',
    '        db.close()'
  ];
  const book = (cx, name, tool) => box(cx - 52, 262, 104, 54, P.okT, 12) + two(cx, 285, name, 'Book', { s: 12.5, m: true, gap: 17 }) +
    arrow(cx, 324, cx, 352, P.mute, 2.5) + T(cx, 370, tool, { s: 11.5, w: 700, f: P.ink2 });
  const arrowsPic = svg(600, 400, 'Before: the shop rules point down at the spreadsheet tool. After: the shop rules own an idea called SalesBook. SpreadsheetBook, DatabaseBook and OnlineBook each point up at that idea, and each one uses its own tool.',
    T(100, 28, 'BEFORE', { s: 12.5, f: P.danger }) + T(405, 28, 'AFTER', { s: 12.5, f: P.ok }) +
    divider(206, 16, 384) +
    box(26, 50, 148, 62, P.white, 14) + T(100, 78, 'shop rules', { s: 14 }) + T(100, 98, 'rules.py', { s: 11.5, m: true, f: P.ink2 }) +
    arrow(100, 122, 100, 252, P.danger, 3.5) + T(112, 190, 'mentions', { s: 12, w: 700, f: P.danger, a: 'start' }) +
    box(26, 262, 148, 54, P.dangerT, 12) + two(100, 285, 'spreadsheet', 'tool', { s: 13, gap: 17 }) +
    two(100, 350, 'the arrow points', 'down at a detail', { s: 12.5, w: 700, f: P.ink2, gap: 17 }) +
    box(262, 44, 286, 110, P.white, 16) + T(405, 72, 'shop rules', { s: 14 }) + T(405, 92, 'rules.py', { s: 11.5, m: true, f: P.ink2 }) +
    box(290, 126, 230, 58, P.tint, 12) + T(405, 150, 'the idea: SalesBook', { s: 13, f: P.accent }) + T(405, 170, 'save(time, total, points)', { s: 11.5, m: true }) +
    arrow(286, 258, 340, 194, P.ok, 3.5) + arrow(405, 258, 405, 194, P.ok, 3.5) + arrow(524, 258, 470, 194, P.ok, 3.5) +
    T(532, 222, 'fits it', { s: 12, w: 700, f: P.ok, a: 'start' }) +
    book(286, 'Spreadsheet', 'spreadsheet tool') + book(405, 'Database', 'database') + book(524, 'Online', 'online service') +
    T(405, 394, 'every detail points in at the idea', { s: 12.5, w: 700, f: P.ink2 }));
  const fixPic = `<div style="width:100%">${code(rulesCode, { title: 'rules.py, fixed', good: [3, 4, 5, 10] })}${code(sheetBook, { title: 'spreadsheet_book.py', hi: [1], good: [2, 4] })}${code(dbBook, { title: 'database_book.py', hi: [1], good: [2, 4] })}${arrowsPic}</div>`;

  /* ---- The test: read the top of the rules file ---- */
  const DARK = '#15132B', LITE = '#ECEAFF';
  const mono = (x, y, s, f) => T(x, y, s, { s: 12, m: true, f: f || LITE, a: 'start', w: 600 });
  const testPic = svg(600, 268, 'Two versions of rules.py. The first starts with import spreadsheet and so names a supplier. The second names only its own idea, SalesBook.',
    T(150, 28, 'NAMES A SUPPLIER', { s: 12.5, f: P.danger }) + T(450, 28, 'NAMES ONLY ITS OWN IDEA', { s: 12.5, f: P.ok }) +
    divider(300, 16, 252) +
    box(18, 46, 264, 118, DARK, 14) + T(150, 68, 'rules.py', { s: 11.5, m: true, f: '#A9A5D6' }) +
    mono(32, 96, 'import spreadsheet', '#FF9DB5') + mono(32, 120, 'spreadsheet.open("sales.xlsx")', '#FF9DB5') + mono(32, 144, 'sheet.add_row(...)', '#FF9DB5') +
    T(150, 196, 'a tool, a file type, a brand', { s: 13 }) +
    two(150, 220, 'when the supplier changes,', 'this file changes too', { s: 12.5, w: 700, f: P.ink2, gap: 18 }) +
    box(318, 46, 264, 118, DARK, 14) + T(450, 68, 'rules.py', { s: 11.5, m: true, f: '#A9A5D6' }) +
    mono(332, 96, 'class SalesBook:', '#7CF0B5') + mono(332, 120, 'record_sale(order, sales_book)') + mono(332, 144, 'sales_book.save(...)', '#7CF0B5') +
    T(450, 196, 'shop words only', { s: 13 }) +
    two(450, 220, 'suppliers can come and go,', 'this file stays closed', { s: 12.5, w: 700, f: P.ink2, gap: 18 }));

  /* ---- When not to: nobody inverts addition. Then the five SOLID letters. ---- */
  const overCode = [
    'class Adder:',
    '    def add(self, a, b):',
    '        pass',
    '',
    'class PlusAdder(Adder):',
    '    def add(self, a, b):',
    '        return a + b',
    '',
    'def total_with_tax(price, tax, adder):',
    '    return adder.add(price, tax)'
  ];
  const plainCode = [
    'def total_with_tax(price, tax):',
    '    return price + tax'
  ];
  const solid = [['S', 'Single', 'responsibility', 16], ['O', 'Open/', 'closed', 29], ['L', 'Liskov', 'substitution', 30], ['I', 'Interface', 'segregation', 31], ['D', 'Dependency', 'inversion', 32]];
  const solidPic = svg(600, 172, 'The five SOLID letters with their lessons. S, Single responsibility, lesson 16. O, Open/closed, lesson 29. L, Liskov substitution, lesson 30. I, Interface segregation, lesson 31. D, Dependency inversion, lesson 32.',
    T(300, 24, 'ALL FIVE LETTERS OF SOLID', { s: 12.5, f: P.accent }) +
    solid.map((r, i) => {
      const x = 10 + i * 117, last = i === 4;
      return box(x, 40, 108, 112, last ? P.tint : P.white, 14) + T(x + 54, 78, r[0], { s: 30, f: last ? P.accent : P.ink }) +
        T(x + 54, 102, r[1], { s: 11.5 }) + T(x + 54, 117, r[2], { s: 11.5 }) + T(x + 54, 140, 'lesson ' + r[3], { s: 11.5, w: 700, f: P.ink2 });
    }).join(''));
  const whenNotPic = `<div style="width:100%">${code(overCode, { title: 'an idea in front of adding', bad: [1, 5, 9, 10] })}${code(plainCode, { title: 'the same job, plain', good: [2] })}${solidPic}</div>`;

  COURSE.add({
    id: 'l32', minutes: 10,
    summary: 'The code that holds your rules should not mention the tools that happen to do the fiddly work. The rules describe what they need as an <b>idea of their own</b>, and the tools are built to fit it. That is <b>dependency inversion</b>, the D in SOLID.',
    video: {
      src: 'videos/l32-dependency-inversion.mp4', poster: 'videos/l32-dependency-inversion.jpg', length: '1 min 5 s',
      script: [
        "Maya's shop runs on rules. How a total is worked out. How points are earned. It is the most valuable code she has.",
        'But look inside. The rules name the spreadsheet tool. So the rules depend on a detail. The arrow points down.',
        'Then the accountant wants a database. To swap it, Maya has to rewrite the rules file. And while she is in there, she breaks the points. One $3 cookie now earns 300 points.',
        'The rules never changed. Only the supplier did.',
        'The fix. The rules say what they need, in their own words. A sales book I can save to. That idea belongs to the rules.',
        'Now the spreadsheet has to fit the idea. The arrow turns around.',
        'Swap in a database. Then an online service. Lines changed in the rules: 0.',
        'That is dependency inversion. Rules in the middle. Details point in. Depend on ideas, not details.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Write the job description.',
        text: [
          'A bakery needs its bread delivered. It could build everything around <b>Bob</b>. Bob\'s phone number is on the timetable. Bob\'s van size is on the order form. Bob\'s day off decides the opening hours. Then Bob moves away, and half the business has to be rewritten.',
          'Or the bakery writes a <b>job description</b>: "drives a van, has a licence". The business is built around that one sentence. Bob fits it. So does Asha. So does a courier firm. Notice who wrote the description: <b>the bakery</b>, in its own words, for its own needs.',
          'Code works the same way. "<b>A depends on B</b>" means that A\'s code mentions B. If B changes or goes away, A may break. Draw it as an arrow from A to B.',
          'A program has two sorts of code. The <b>rules</b> say what the business does: how a total is worked out, when a customer earns a free cookie. The <b>details</b> say how it gets done: which file type, which printer, which payment company. People call the rules <b>high-level</b> code and the details <b>low-level</b> code.',
          '<b>Dependency inversion</b> says: the rules must not depend on the details. The rules describe what they need as an <b>idea of their own</b>, like the job description. The details depend on that idea, by fitting it.'
        ],
        tip: 'Robert C. Martin gave the principle its name in the 1990s. In short, he said two things. Important code should not depend on fiddly code, and both should depend on an abstraction, the word from lesson 18. And the abstraction should not depend on the details. The details should depend on it.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'Rules that know the spreadsheet.',
        text: [
          'The shop has grown, and its rules now live in their own file, <code>rules.py</code>. This job runs for every sale.',
          'One new piece of Python is on line 1. In lesson 4, <code>from settings import ...</code> fetched one name from a file. A plain <code>import spreadsheet</code> fetches the <b>whole tool</b>, and you then reach into it with a dot. <code>spreadsheet</code> is a ready-made tool for working with spreadsheet files. Maya did not write it.',
          'Lines 6 and 7 are the <b>rules</b>. The total is the price plus tax, with the <code>TAX_RATE</code> from lesson 1. Points are 1 per dollar, as in lesson 2. So a $3 cookie costs <b>$3.27</b> and earns <b>3 points</b>.',
          'Lines 8 to 10 are the <b>detail</b>. Open the file <code>sales.xlsx</code>, add one row to it, and save the file.',
          'Now look at line 1 again. The rules file <b>mentions the spreadsheet tool by name</b>. So the rules depend on it. The arrow runs from the rules to a detail.'
        ],
        tip: 'Lesson 15, Separation of concerns, would already complain that saving lines sit inside a rules job. Maya could move lines 8 to 10 into a <code>save_sale</code> job in the same file. That separates the kinds of work. But <code>rules.py</code> would still begin with <code>import spreadsheet</code>. This lesson asks a different question: <b>who depends on whom?</b>'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'New supplier. Rules rewritten.',
        text: [
          'The shop outgrows the spreadsheet. The accountant wants a proper <b>database</b>, a tool built for keeping a lot of records safe.',
          'No rule of the shop has changed. But the spreadsheet lines live <b>inside the rules file</b>. So Maya opens <code>rules.py</code>, the most valuable and most tested code in the shop, and rewrites lines 1, 8, 9 and 10.',
          'The database keeps money in <b>cents</b>, so on line 9 she multiplies the total by 100. $3.27 is saved as 327. Out of habit she multiplies the points too. One cookie now saves 3 × 100 = <b>300 points</b>. A free cookie costs 30 points. So one $3 cookie has just earned <b>10 free cookies</b>.',
          'Nothing crashed. A year later the accountant moves to an <b>online bookkeeping service</b>, and Maya opens <code>rules.py</code> again to rewrite the same four lines.',
          'Count it up. The rules changed <b>0 times</b>. The rules file was rewritten <b>2 times</b>, and one of those rewrites broke the points.'
        ],
        warn: 'Ask the question from lesson 16, Single responsibility: who could ask for this file to change? Maya, when a rule changes. And the accountant, every time the books move. One file, two bosses.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Turn the arrow round.',
        text: [
          'Maya asks what the rules really need. Not a spreadsheet. Not a database. They need <b>somewhere to save a sale</b>. She writes that idea down in the rules\' own words, inside the rules file: a <code>SalesBook</code> with one job, <code>save</code>.',
          'Look at lines 3 to 5 of <code>rules.py</code>. <code>pass</code> is Python for "nothing to do here". So <code>SalesBook</code> does no work at all. It is an <b>interface</b>, the word from lesson 28, Program to an interface: the list of things you can ask for. In lesson 28 that list was never written down. Here Maya writes it down on purpose, <b>in the rules file</b>, so everyone can see who owns it.',
          '<code>record_sale</code> is now handed a <code>sales_book</code>, and line 10 asks it to save. Look at the top of the file. There is <b>no import of any tool</b>. The rules mention no supplier, no file type and no brand.',
          'The details move out into files of their own. <code>SpreadsheetBook</code> is a kind of <code>SalesBook</code>. The brackets are from lesson 27. It replaces the empty <code>save</code> with a real one, and it imports its own messy tool. <code>DatabaseBook</code> does the same with the database, cents and all.',
          'Now read line 2 of each book file: <code>from rules import SalesBook</code>. <b>The detail mentions the rules.</b> Before, the rules mentioned the detail. The arrow has turned round, and that turn is the <b>inversion</b> in the name. The last picture shows both.',
          'When the online service arrives, Maya writes one new file, <code>online_book.py</code>. She does not open <code>rules.py</code>. Lines changed in the rules: <b>0</b>.'
        ],
        tip: 'Something still has to choose a book and hand it over. That is one line at the edge of the program: <code>record_sale(order, DatabaseBook())</code>. Handing a part what it needs has a name and a lesson of its own: lesson 33, Dependency injection.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Read the top of the rules file.',
        text: [
          'Ask: <b>"Does my important rules code mention any supplier, file type or brand by name?"</b>',
          'The quick way to check is to read the <code>import</code> lines at the top. The old <code>rules.py</code> starts with <code>import spreadsheet</code>. That is a supplier. The new one imports no tool at all. Then read the top of a detail file. It should mention the rules\' idea: <code>from rules import SalesBook</code>.',
          'A second check is the <b>wording</b> of the idea. <code>save(time, total, points)</code> is shop language. If the job were called <code>add_row</code>, it would be spreadsheet language in disguise, and a database would be a poor fit. The idea must be written in the rules\' words, not the tool\'s.',
          'So what does this add to lesson 28? Lesson 28 said: talk to a part through its interface. This lesson says <b>who owns the interface</b>. It belongs to the rules. The valuable, steady code sits in the middle and knows nothing about suppliers.'
        ],
        tip: 'Python would also accept a book that never mentions <code>SalesBook</code>, as long as it has a <code>save</code> job. That was duck typing in lesson 28. The arrow is the same either way: the book is shaped to fit an idea that the rules chose. When a whole program is arranged so that every arrow points in at the rules, that has a name too: lesson 44, Layers and the dependency rule.'
      },
      {
        label: 'When not to', pic: whenNotPic,
        h: 'Nobody inverts addition.',
        text: [
          '<b>Steady things are fine to depend on.</b> The rules use Python\'s own numbers, text and lists directly. Those are everywhere, and they do not change under your feet. Look at the first picture. Suppose Maya loves this lesson and puts an idea in front of <b>adding two numbers</b>. That is ten lines to say <code>price + tax</code>. Nobody will ever swap addition for another supplier.',
          '<b>A tiny program does not need it.</b> Remember the 10-line script from lesson 15 that counts last year\'s cookies. It can open the spreadsheet directly. It is run once and deleted. Lesson 8, YAGNI, said to wait for a real need.',
          '<b>Every turned arrow has a cost.</b> It adds one more idea to learn and one more hop to follow when you read, as lesson 4, Trade-offs, not laws, warned. So spend them at the <b>borders that really change</b>: saving, sending, paying, printing. Maya turned this arrow after the accountant had really asked to move the books. That was a request, not a guess.'
        ],
        warn: 'That was the last of the five SOLID letters. The strip under the code shows all five and where you met them. One question is still open: who hands the rules their sales book? That is the next lesson.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'This rule decides when to tell a customer that a cake is ready. Which lines make the rule depend on a supplier? Pick all that apply.',
        pic: code([
          'import text_company',
          '',
          'def cake_finished(order):',
          '    if order.kind == "cake":',
          '        words = "Your cake is ready!"',
          '        text_company.send_sms(order.phone, words)'
        ], { title: 'rules.py' }),
        options: ['Line 1', 'Line 3', 'Line 4', 'Line 6'],
        answer: [0, 3],
        why: 'Lines 1 and 6 mention <code>text_company</code> by name. If Maya changes phone company, or moves to email, this rules file must be edited. Lines 3 and 4 are pure shop rules.',
        hint: 'Look for the lines that say the name of an outside tool.'
      },
      {
        type: 'bucket', q: 'Shop rule, or replaceable detail?',
        buckets: ['Shop rule', 'Replaceable detail'],
        items: [
          ['A free cookie costs 30 points', 0],
          ['Tax is added to the price', 0],
          ['A sale earns 1 point per dollar', 0],
          ['Sales are kept in sales.xlsx', 1],
          ['Receipts come out of the X200 printer', 1],
          ['Texts go through one phone company', 1]
        ],
        why: 'The rules say what the shop does. They would still be true if every supplier changed tomorrow. A file type, a printer model and a phone company are all things Maya could swap.',
        hint: 'Ask of each one: would this still be true if Maya changed every supplier?'
      },
      {
        type: 'type', q: 'This is the broken line from the story. A customer buys a $20 cake, so <code>points</code> is 20. How many points does line 3 save? Type the number.',
        pic: code([
          'points = order.price',
          'db = database.connect("shop.db")',
          'db.insert(order.time, total * 100, points * 100)'
        ], { title: 'rules.py, rewritten for the database', bad: [3] }),
        prompt: 'points saved >',
        answers: ['2000', '2,000', '2000.0', 'two thousand'],
        why: '20 × 100 = 2000. The cake should have earned 20 points. Only the money needed to become cents. The slip happened because database lines were being typed inside the rules job.',
        hint: 'Line 3 multiplies the points by 100.'
      },
      {
        type: 'fill', q: 'The online bookkeeping service arrives. Finish its book so that it fits the rules\' idea.',
        text: 'import web_books\nfrom ___ import SalesBook\n\nclass OnlineBook(___):\n    def ___(self, time, total, points):\n        web_books.post(time, total, points)',
        options: ['rules', 'SalesBook', 'save', 'web_books', 'record_sale', 'add_row'],
        answer: ['rules', 'SalesBook', 'save'],
        why: 'The detail fetches the idea from <code>rules.py</code>, says it is a kind of <code>SalesBook</code>, and gives a real <code>save</code> job. The detail points at the rules. The rules never hear the name <code>web_books</code>.',
        hint: 'The idea lives in the rules file, and it has exactly one job.'
      },
      {
        type: 'pick', q: 'After the fix, Maya moves from the database to the online service. What does she have to touch?',
        options: [
          'rules.py, because that is where sales are recorded',
          'One new file, online_book.py, and the one line that chooses the book',
          'rules.py and database_book.py',
          'Every file that mentions a sale'
        ],
        answer: 1,
        why: 'The new supplier gets a new book that fits the idea. The line at the edge of the program hands over an <code>OnlineBook</code>. <code>rules.py</code> stays closed, so nothing in it can break.',
        hint: 'Does <code>rules.py</code> mention any supplier after the fix?'
      },
      {
        type: 'pick', q: 'Lesson 28, Program to an interface, said to talk to a part through its interface. What does dependency inversion add?',
        options: [
          'An interface should have as many jobs as possible',
          'The rules own the interface, and the details are built to fit it',
          'Interfaces make a program run faster',
          'Every function needs an interface of its own'
        ],
        answer: 1,
        why: 'The idea is written by the rules, in the rules\' words. So the arrow from the detail points at the rules, and not the other way round.',
        hint: 'Think of the job description. Who wrote it?'
      },
      {
        type: 'match', q: 'That was the last SOLID letter. Match each one to its short meaning.',
        pairs: [
          ['S: Single responsibility (lesson 16)', 'One reason to change'],
          ['O: Open/closed (lesson 29)', 'Add without editing'],
          ['L: Liskov substitution (lesson 30)', 'A stand-in must behave'],
          ['I: Interface segregation (lesson 31)', 'Small, focused contracts'],
          ['D: Dependency inversion (lesson 32)', 'Depend on ideas, not details']
        ],
        why: 'Five letters, five ways to keep code easy to change. That was the goal in lesson 1, and it still is.',
        hint: 'Start with the two you are surest of. S was about bosses. D is this lesson.'
      },
      {
        type: 'pick', q: 'When is it fine for code to depend on something directly? Pick all that apply.',
        options: [
          'Python\'s own numbers, text and lists',
          'A 10-line script you will run once and delete',
          'A payment company that Maya has already changed twice',
          'The place where the accountant keeps asking to move the books'
        ],
        answer: [0, 1],
        why: 'Steady things and throwaway code do not need an idea in front of them. A supplier that keeps changing is exactly the border where turning the arrow pays for itself.',
        hint: 'Two of these have already changed, or will. Two never will.'
      }
    ]
  });
})();
