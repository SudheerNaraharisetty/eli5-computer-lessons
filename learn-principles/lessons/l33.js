/* Lesson 33: Dependency injection (module 3). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l33  Dependency injection
     ===================================================================== */
  const dash = (x1, y1, x2, y2, col) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="3" stroke-dasharray="7 6" stroke-linecap="round"/>`;

  const chefPic = svg(600, 310, 'Two chefs. The left one leaves the stove to fetch things from a shop, a cellar and a cupboard. The right one is handed butter, flour and eggs on the counter.',
    T(150, 30, 'FETCHES ITS OWN', { s: 12.5, f: P.danger }) + T(450, 30, 'IS HANDED THEM', { s: 12.5, f: P.ok }) +
    `<line x1="300" y1="20" x2="300" y2="296" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    /* left: the chef goes off to get things */
    box(95, 150, 110, 56, P.white, 14) + T(150, 184, 'the chef', { s: 14 }) +
    dash(110, 146, 70, 104, P.danger) + dash(150, 146, 150, 104, P.danger) + dash(190, 146, 230, 104, P.danger) +
    box(20, 56, 84, 44, P.dangerT, 10) + T(62, 83, 'the shop', { s: 12.5 }) +
    box(110, 56, 84, 44, P.dangerT, 10) + T(152, 83, 'the cellar', { s: 12.5 }) +
    box(200, 56, 84, 44, P.dangerT, 10) + T(242, 83, 'a cupboard', { s: 12.5 }) +
    T(150, 246, 'leaves the stove to go and get things', { s: 13, w: 700, f: P.ink2 }) +
    T(150, 266, 'nobody else can see what the dish needs', { s: 13, w: 700, f: P.ink2 }) +
    /* right: everything arrives on the counter */
    box(330, 56, 72, 44, P.okT, 10) + T(366, 83, 'butter', { s: 12.5 }) +
    box(414, 56, 72, 44, P.okT, 10) + T(450, 83, 'flour', { s: 12.5 }) +
    box(498, 56, 72, 44, P.okT, 10) + T(534, 83, 'eggs', { s: 12.5 }) +
    arrow(376, 108, 420, 146, P.ok, 3) + arrow(450, 108, 450, 146, P.ok, 3) + arrow(524, 108, 480, 146, P.ok, 3) +
    box(395, 150, 110, 56, P.white, 14) + T(450, 184, 'the chef', { s: 14 }) +
    T(450, 246, 'everything arrives on the counter', { s: 13, w: 700, f: P.ink2 }) +
    T(450, 266, 'swap the butter and the chef stays the same', { s: 13, w: 700, f: P.ink2 }));

  const beforeCode = [
    'from clock import today',
    '',
    'def checkout(price):',
    '    payment = CardPayment()',
    '    book = SpreadsheetBook("sales.xlsx")',
    '    printer = X200Printer()',
    '    day = today()',
    '',
    '    total = sale_price(price, day)',
    '    if payment.pay(total):',
    '        book.save(total)',
    '        printer.print_line("Paid " + str(total))'
  ];

  const painPic = `<div style="width:100%">${code(['checkout(0.01)     # Maya, trying it out'], { title: 'the only way to try it', bad: [1] })}` +
    svg(600, 250, 'One try-out charges a real card 1 cent, writes 1 cent into the real sales file and prints a real slip. Later the tax report says 412 dollars and 1 cent.',
      T(300, 26, 'ONE TRY-OUT TOUCHES THREE REAL THINGS', { s: 12.5, f: P.danger }) +
      box(24, 46, 170, 70, P.dangerT, 14) + T(109, 76, 'a real card', { s: 14 }) + T(109, 99, 'charged $0.01', { s: 12.5, m: true, f: P.danger }) +
      box(215, 46, 170, 70, P.dangerT, 14) + T(300, 76, 'sales.xlsx', { s: 14, m: true }) + T(300, 99, 'new row: 0.01', { s: 12.5, m: true, f: P.danger }) +
      box(406, 46, 170, 70, P.dangerT, 14) + T(491, 76, 'real paper', { s: 14 }) + T(491, 99, '"Paid 0.01"', { s: 12.5, m: true, f: P.danger }) +
      arrow(300, 124, 300, 162, P.danger, 3) +
      box(150, 168, 300, 60, P.white, 14) + T(300, 194, 'TAX REPORT', { s: 12, f: P.ink2 }) + T(300, 216, 'Sales: $412.01', { s: 16, m: true }) +
      `<circle cx="478" cy="198" r="22" fill="${P.dangerT}" stroke="${P.ink}" stroke-width="2.5"/>` + T(478, 207, '?', { s: 24, f: P.danger }) +
      T(300, 246, 'the shop really sold $412.00', { s: 13, w: 700, f: P.ink2 })) + `</div>`;

  const afterCode = [
    'def checkout(price, payment, book, printer, day):',
    '    total = sale_price(price, day)',
    '    if payment.pay(total):',
    '        book.save(total)',
    '        printer.print_line("Paid " + str(total))'
  ];
  const wiringCode = [
    '# main.py: the wiring',
    'from clock import today',
    '',
    'payment = CardPayment()',
    'book = SpreadsheetBook("sales.xlsx")',
    'printer = X200Printer()',
    '',
    '# a customer buys a $20 cake',
    'checkout(20, payment, book, printer, today())'
  ];
  const shop2Code = [
    '# main_shop2.py: the wiring for shop 2',
    'printer = Zip5Printer()     # the only new line',
    'checkout(20, payment, book, printer, today())'
  ];
  const fixPic = `<div style="width:100%">${code(afterCode, { title: 'checkout.py, handed its parts', good: [1] })}${code(wiringCode, { title: 'main.py', good: [4, 5, 6, 9] })}${code(shop2Code, { title: 'main_shop2.py', good: [2] })}</div>`;

  const fakesCode = [
    'class FakePayment:',
    '    def pay(self, amount):',
    '        return True',
    '',
    'class NotebookBook:',
    '    def __init__(self):',
    '        self.saved = []',
    '    def save(self, total):',
    '        self.saved.append(total)',
    '',
    '# FakePrinter: the same idea, with a list called lines'
  ];
  const tryCode = [
    '# try_checkout.py',
    'payment = FakePayment()',
    'book = NotebookBook()',
    'printer = FakePrinter()',
    '',
    'checkout(20, payment, book, printer, "Tuesday")',
    '',
    'book.saved       # holds 18.0',
    'printer.lines    # holds "Paid 18.0"'
  ];
  const testPic = `<div style="width:100%">${code(fakesCode, { title: 'stand_ins.py', hi: [6, 7] })}${code(tryCode, { title: 'try_checkout.py', good: [6, 8, 9] })}</div>`;

  const overCode = [
    'def checkout(price, payment, book, printer, day,',
    '             pricer, text_maker, joiner, tax_rate):',
    '    total = pricer.sale_price(price, day)',
    '    if payment.pay(total):',
    '        book.save(total)',
    '        words = text_maker.to_text(total)',
    '        printer.print_line(joiner.join("Paid ", words))'
  ];
  const borderPic = svg(600, 290, 'In the middle, the shop rules use plain helpers directly. Around the edge sit the things that touch the outside world: paying, saving, printing, sending, the clock and chance. Those are handed in.',
    T(300, 28, 'HAND IN WHAT TOUCHES THE OUTSIDE WORLD', { s: 12.5, f: P.accent }) +
    ['paying', 'saving', 'printing'].map((s, i) => box(40 + i * 180, 46, 160, 42, P.okT, 12) + T(120 + i * 180, 73, s, { s: 13.5, f: P.ok })).join('') +
    ['sending', 'the clock', 'chance'].map((s, i) => box(40 + i * 180, 216, 160, 42, P.okT, 12) + T(120 + i * 180, 243, s, { s: 13.5, f: P.ok })).join('') +
    [120, 300, 480].map(x => arrow(x, 94, x, 114, P.ok, 3) + arrow(x, 210, x, 190, P.ok, 3)).join('') +
    box(100, 120, 400, 64, P.white, 16) + T(300, 147, 'just use these directly', { s: 14 }) +
    T(300, 170, 'sale_price   str()   a list   TAX_RATE', { s: 12.5, m: true, f: P.ink2 }) +
    T(300, 282, 'plain, steady and harmless: nothing to swap, nothing to fake', { s: 13, w: 700, f: P.ink2 }));
  const whenNotPic = `<div style="width:100%">${code(overCode, { title: 'everything handed in', bad: [2, 3, 6, 7] })}${borderPic}</div>`;

  COURSE.add({
    id: 'l33', minutes: 9,
    summary: 'A <b>dependency</b> is any other part your code needs to do its job. <b>Dependency injection</b> is a grand name for a simple habit: do not let code go and fetch or build those parts for itself. <b>Hand them in from outside.</b>',
    video: {
      src: 'videos/l33-dependency-injection.mp4', poster: 'videos/l33-dependency-injection.jpg', length: '1 min',
      script: [
        "Maya's checkout needs 4 helpers. A card machine. A sales book. A printer. And the clock.",
        'Today it goes and gets them itself. 4 arms reach under the counter, where nobody looks. From the front, it seems to need only a price.',
        'So to try it out, Maya has to charge a real card, write in the real sales book, and print real paper. She buys a cookie from herself, for 1 cent. One day, that cent lands in her tax report.',
        'The fix. Pull the arms in. Cut 4 slots in the front. Now one small file, the wiring, hands checkout its parts.',
        'For the shop, the real ones. For a try-out, pretend ones. Nothing real is touched. For shop 2, a different printer. Lines changed in checkout: 0.',
        'That is dependency injection. Do not let code fetch its own parts. Hand it what it needs.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: chefPic,
        h: 'Hand the chef the ingredients.',
        text: [
          'Picture a chef who is handed everything on the counter: butter, flour, eggs. Anyone walking past can see what the dish needs. Swap the butter for margarine and the chef cooks the same way.',
          'Now picture a chef who stops in the middle of cooking to go shopping, and keeps a private cupboard nobody else may open. You cannot see what goes in. You cannot change it. And every practice run uses up the good butter.',
          'A <b>dependency</b> is any other part your code needs in order to do its job: something to take payment, a sales book, a printer, the clock.',
          '<b>Dependency injection</b> means those parts are <b>handed in from outside</b>, as arguments. The code does not fetch them or build them for itself. Whoever calls it decides which parts it gets. That is all.'
        ],
        tip: 'The name is much grander than the idea. "Injection" only means "put in from outside". Martin Fowler gave the habit this name in 2004. Programmers had been doing it for years before that.'
      },
      {
        label: 'The code', pic: code(beforeCode, { title: 'checkout.py', hi: [4, 5, 6, 7] }),
        h: 'A checkout that looks after itself.',
        text: [
          'This is the job that runs when a customer pays. Read line 3 first. It says checkout is given <b>one</b> thing: a price.',
          'Now read lines 4 to 7. The job gets four helpers for itself. Line 4 <b>builds</b> a card payment part. Brackets after a class name make a new one, as <code>LoyaltyCard()</code> did in lesson 19. Line 5 builds a sales book and even knows the name of the file. Line 6 builds one brand of printer. Line 7 <b>fetches</b> the day from the clock.',
          'Lines 9 to 12 are the real work. Tuesday is still sale day, so <code>sale_price</code> from lesson 23 works out the total. If the payment goes through, the sale is saved and a line is printed. <code>str(total)</code> turns the number into text, as in lesson 22.',
          'It looks tidy. The checkout needs nothing from anyone. But count what it really depends on: the price and <b>four hidden parts</b>. Lesson 23, Explicit over implicit, showed one hidden input, the clock. This job has four.'
        ],
        tip: 'Lesson 28, Program to an interface, already made <code>payment</code> a plug that only needs <code>pay(amount)</code>. But a plug is no use if the job chooses its own. Line 4 welds one kind of payment in.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'One cent in the tax report.',
        text: [
          'Maya changes one line and wants to try the checkout. There is only one way: <b>run it for real</b>. So she buys a cookie from herself for 1 cent.',
          'That one try-out charges a <b>real card</b>, writes a row into the <b>real sales file</b> and prints <b>real paper</b>. Afterwards she opens <code>sales.xlsx</code> and deletes the row by hand.',
          'One day she forgets. At the end of the month the tax report says <b>$412.01</b>. The shop sold $412.00. The accountant wants to know where the cent came from.',
          'She cannot check the Tuesday price either, unless it is Tuesday. That is the trap from lesson 23, and it is back.',
          'Then Maya opens a second shop. It has a Zip 5 printer, the other brand from lesson 3. Line 6 says <code>X200Printer()</code>. So checkout itself must be edited, or copied into a second file that will slowly drift apart from the first, as lesson 6, DRY, warned.'
        ],
        warn: 'Nothing is wrong with the four parts. The trouble is <b>who chooses them</b>. Checkout picks its own, so nobody else can pick different ones, not even for a five-second try-out.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Stop fetching. Be handed.',
        text: [
          'Maya deletes lines 4 to 7 and puts those four names between the brackets on line 1. Checkout no longer builds or fetches anything. It <b>uses only what it is handed</b>. The real work has not changed by one letter.',
          'Someone still has to build the real parts. That happens once, in one small file at the very start of the program. Programmers call it <b>the wiring</b>. Here it is <code>main.py</code>. Lines 4 to 6 build the parts. Line 9 hands them in.',
          '<b>First gain: you can see what it needs.</b> Line 1 of <code>checkout.py</code> now lists everything the job depends on. Nothing comes in through the back.',
          '<b>Second gain: you can swap a part without editing the job.</b> Shop 2 gets its own wiring file, the same as <code>main.py</code> except for one line: <code>Zip5Printer()</code>. <code>checkout.py</code> is the same file in both shops. Lines changed in it: 0.',
          'This is the practical step that lesson 28, Program to an interface, and lesson 32, Dependency inversion, were waiting for. They said checkout should depend only on <b>what</b> it needs. Dependency injection is <b>how the part arrives</b>.'
        ],
        tip: 'Notice who decides now. Checkout used to choose its own parts. Now its caller chooses. That handing over of control belongs to a wider family of ideas: the next lesson, Inversion of control.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Does it fetch, or is it handed?',
        text: [
          'Point at a piece of code and ask: <b>"Does this code build or fetch its own helpers, or is it handed them?"</b>',
          'Signs that it helps itself: a class name with brackets inside the job, like <code>CardPayment()</code>. A file name. A call to the clock, like <code>today()</code>.',
          '<b>Third gain: you can try it with harmless stand-ins.</b> <code>FakePayment</code> is from lesson 28: it says yes and charges nobody. <code>NotebookBook</code> writes to no file. It just remembers what it was told to save.',
          'It needs one new bit of Python. <code>__init__</code> is the job that runs when a new one is made. Here it gives each new notebook its own empty list, <code>saved</code>. <code>[]</code> is an empty list, as in lesson 17, and <code>.append</code> adds to it, as in lesson 3.',
          'Now read <code>try_checkout.py</code>. Maya hands in three stand-ins and the day <code>"Tuesday"</code>. A $20 cake at 10% off is $18. So the notebook holds <code>18.0</code> and the pretend printer holds <code>"Paid 18.0"</code>. No card, no file, no paper. And it works on any day of the week.'
        ],
        tip: 'Parts can be handed to an <b>object</b> in the same way. <code>__init__</code> is where an object is handed its parts when it is made, and it keeps them for later. Handing them to a function, as here, is the simplest form.'
      },
      {
        label: 'When not to', pic: whenNotPic,
        h: 'Not everything is a part to hand in.',
        text: [
          '<b>Do not inject everything.</b> Suppose Maya loves this lesson and also hands in a part for working out the price, a part for turning numbers into text, a part for joining text, and the tax rate. Nine arguments. The five lines of real work are now harder to read, and nothing got easier to swap or try. <code>sale_price</code>, <code>str()</code> and <code>+</code> are plain, steady and harmless. Just use them. Lesson 23 said the same about <code>TAX_RATE</code>.',
          '<b>Hand in what touches the outside world.</b> Paying, saving, printing, sending, the clock and chance. Those are the parts that cost money, leave marks, or change from one run to the next.',
          '<b>A long list of parts is a warning.</b> Four is already a lot. If a job needs six or seven parts handed in, it is probably doing too much. That is a job to split, with lesson 16, Single responsibility, and lesson 17, Small functions.',
          '<b>You do not need a tool for this.</b> There are big toolkits, often called containers, that build and hand over parts for you, by rules written somewhere else. They are optional. Plain arguments are dependency injection. And when the wiring happens by magic, you can no longer see who hands what to whom, which breaks lesson 23.'
        ],
        warn: 'A ten-line script that Maya runs once and throws away needs none of this. Ask lesson 4\'s question: <b>"Is this problem real right now?"</b> For the checkout it was: real money, a real file and a second shop.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'Which job builds or fetches its own helper?',
        pic: code([
          'def send_order(order, courier):',
          '    courier.deliver(order)',
          '',
          'def send_cake(cake):',
          '    van = SpeedyVan()',
          '    van.deliver(cake)',
          '',
          'def box_price(cookies, price):',
          '    return cookies * price'
        ], { title: 'delivery.py' }),
        options: ['send_order', 'send_cake', 'box_price', 'None of them'],
        answer: 1,
        why: 'Line 5 builds a <code>SpeedyVan</code> inside the job. Nobody can hand <code>send_cake</code> a bike courier, or a pretend van for a try-out. <code>send_order</code> is handed its courier.',
        hint: 'Look for a class name followed by brackets inside a job.'
      },
      {
        type: 'pick', q: 'Read only line 1, then the rest. Which things does this job depend on that line 1 does not show?',
        pic: code([
          'def send_reminder(customer):',
          '    texts = TextService()',
          '    if today() == "Friday":',
          '        texts.send(customer.phone, "Cake day!")'
        ], { title: 'reminders.py' }),
        options: ['The text service', 'The day', 'The customer', 'The words "Cake day!"'],
        answer: [0, 1],
        why: 'The customer is handed in on line 1. The text service is built on line 2 and the day is fetched on line 3. Both come in through the back. The words are plain text, not a part.',
        hint: 'There are 2. One is built inside the job. One is fetched from the clock.'
      },
      {
        type: 'fill', q: 'Finish the fix. Checkout is handed its payment part, and the wiring builds the real one.',
        text: 'def checkout(price, ___, book, printer, day):\n    total = sale_price(price, day)\n    if ___.pay(total):\n        book.save(total)\n\n# main.py\ncheckout(20, ___, book, printer, today())',
        options: ['payment', 'payment', 'CardPayment()', 'FakePayment()', 'price'],
        answer: ['payment', 'payment', 'CardPayment()'],
        why: 'Checkout only knows the name <code>payment</code>. The wiring is the one place that says which real part that is.',
        hint: 'The first two blanks take the same name. The last one is in the real shop, so it builds the real part.'
      },
      {
        type: 'type', q: 'Maya runs this try-out on a Friday. What number ends up in <code>book.saved</code>? (Tuesday is sale day: 10% off.)',
        pic: code([
          'payment = FakePayment()',
          'book = NotebookBook()',
          'printer = FakePrinter()',
          '',
          'checkout(10, payment, book, printer, "Tuesday")'
        ], { title: 'try_checkout.py' }),
        answers: ['9', '9.0', '9.00', '$9', '$9.00', '[9.0]', '[9]'],
        prompt: 'number >',
        why: 'Checkout uses the day it was handed, not the clock. So it is a Tuesday price on a Friday: 10 minus 10% is 9. <code>FakePayment</code> says yes, and the notebook remembers 9.0.',
        hint: 'Which day does checkout use: the one on the wall, or the one it was handed?'
      },
      {
        type: 'pick', q: 'Shop 2 has a Zip 5 printer. With the fixed code, which file is different in shop 2?',
        pic: code(afterCode, { title: 'checkout.py' }),
        options: ['checkout.py', 'Only the wiring file', 'Both of them', 'sale_price'],
        answer: 1,
        why: 'Checkout is handed a <code>printer</code> and only asks it to <code>print_line</code>. The wiring for shop 2 builds a <code>Zip5Printer()</code> and hands that in. Lines changed in <code>checkout.py</code>: 0.',
        hint: 'Does line 1 of checkout name any brand of printer?'
      },
      {
        type: 'bucket', q: 'Hand it in, or just use it directly?',
        buckets: ['Hand it in', 'Just use it'],
        items: [
          ['The card machine', 0],
          ['The sales file', 0],
          ['The clock', 0],
          ['The part that sends text messages', 0],
          ['Adding the tax', 1],
          ['Turning a number into text', 1],
          ['An empty list', 1]
        ],
        why: 'Hand in the parts that touch the outside world: they cost money, leave marks, or change from run to run. Plain sums, text and lists are steady and harmless. Use them where you need them.',
        hint: 'Ask of each one: would a try-out with the real thing cost money, leave a mark, or give a different answer tomorrow?'
      },
      {
        type: 'match', q: 'Bring back earlier lessons. Match each idea to its test question.',
        pairs: [
          ['Loose coupling (lesson 3)', 'If this part is swapped, how many other parts must change?'],
          ['Explicit over implicit (lesson 23)', 'Can I tell what this line depends on, and what it means, from the line itself?'],
          ['Program to an interface (lesson 28)', 'Does this code know which part it is talking to, or only what it can ask for?'],
          ['Dependency injection', 'Does this code build or fetch its own helpers, or is it handed them?']
        ],
        why: 'They build on each other. Lesson 23 brought one hidden input to the front. Lesson 28 made the part a plug. This lesson hands the plug in, so swapping it touches nothing else.',
        hint: 'Lesson 23 was about reading one line alone. Lesson 28 was about who versus what.'
      },
      {
        type: 'pick', q: 'Which of these are signs that dependency injection is being overdone? Pick all that apply.',
        options: [
          'A job is handed a part whose only work is to join two pieces of text',
          'One job takes nine parts as arguments',
          'A tool wires the parts up by hidden rules, and nobody can say who hands what to whom',
          'A try-out hands checkout a pretend payment that charges nobody'
        ],
        answer: [0, 1, 2],
        why: 'Plain helpers do not need handing in. Nine parts means the job does too much. Magic wiring hides what lesson 23 wanted in plain sight. The pretend payment is the good kind: it is what handing parts in is for.',
        hint: 'One of the four is exactly what this lesson recommends.'
      }
    ]
  });
})();
