/* Lesson 52: Review: bigger structure (module 5). Quiz only, no video. One file per lesson. */
(function () {
  const { P, code, term, svg, box, T } = PR;

  /* =====================================================================
     l52  Review: bigger structure
     The terminal question was run on macOS (and with LC_ALL=C, en_US and en_GB):
     the line prints 4 every time. The Python behaviours the quiz relies on
     (a hand list of tests that skips one, os.environ with a missing name,
     late_orders handing back a list) were run with python3 as well.
     ===================================================================== */

  // One row per principle of module 5: lesson number, name (one or two lines), its test question (two or three lines), its group.
  const GROUP = { shape: P.tint, place: P.warnT, care: P.okT };
  const recapRows = [
    [44, ['Layers and the', 'dependency rule'], ['Does anything in the centre', 'know that the outside exists?'], 'shape'],
    [45, ['Leaky abstractions'], ['On a bad day, what would I need to know', 'about the insides to understand what went', 'wrong? And is that written on the front?'], 'shape'],
    [46, ['Convention over', 'configuration'], ['Could a newcomer guess this from the house', 'rule, or did someone have to write it down', 'just for this one case?'], 'place'],
    [47, ['Unix philosophy'], ['Does this do one job, and can its output', 'be fed straight into something else?'], 'shape'],
    [48, ['Twelve-factor app'], ['Could I start this on a brand-new machine', 'by copying the code and setting a few named', 'settings, without editing any file?'], 'place'],
    [49, ['Testing pyramid'], ['If this broke, would a fast, small test tell me', 'exactly where, or would I only find out by', 'clicking through the whole thing?'], 'care'],
    [50, ['Technical debt'], ['What will this shortcut cost me every', 'time I come back here, and how often', 'will I come back?'], 'care'],
    [51, ['Broken windows'], ['If a newcomer opened this today, what', 'would they conclude is normal here?'], 'care']
  ];
  const messKinds = [
    ['YOUR OWN HABIT', 'Boy Scout rule', 'lesson 13, module 1', 'leave each file you', 'touch a little cleaner', P.white],
    ['A LOAN YOU CHOSE', 'Technical debt', 'lesson 50', 'on the debt list, with', 'an owner and a date', P.okT],
    ['A SIGNAL NOBODY OWNS', 'Broken windows', 'lesson 51', 'a red test, a warning,', 'a note with no owner', P.dangerT]
  ];
  const recapPic = svg(600, 782, 'The eight principles of module 5, each with its test question. Layers and the dependency rule: does anything in the centre know that the outside exists. Leaky abstractions: on a bad day, what would I need to know about the insides to understand what went wrong, and is that written on the front. Convention over configuration: could a newcomer guess this from the house rule, or did someone have to write it down just for this one case. Unix philosophy: does this do one job, and can its output be fed straight into something else. Twelve-factor app: could I start this on a brand-new machine by copying the code and setting a few named settings, without editing any file. Testing pyramid: if this broke, would a fast, small test tell me exactly where, or would I only find out by clicking through the whole thing. Technical debt: what will this shortcut cost me every time I come back here, and how often will I come back. Broken windows: if a newcomer opened this today, what would they conclude is normal here. Below, three kinds of mess. Boy Scout rule, lesson 13: your own habit. Technical debt, lesson 50: a loan you chose, on the debt list with an owner and a date. Broken windows, lesson 51: a signal nobody owns.',
    T(300, 24, 'MODULE 5: EIGHT PRINCIPLES, EIGHT QUESTIONS', { s: 12.5 }) +
    recapRows.map((r, i) => {
      const y = 38 + i * 66, q = r[2];
      return `<circle cx="24" cy="${y + 26}" r="13" fill="${P.ink}"/>` + T(24, y + 31, r[0], { s: 12, f: P.white }) +
        box(46, y, 170, 52, GROUP[r[3]], 10) +
        (r[1].length > 1 ? T(131, y + 23, r[1][0], { s: 12 }) + T(131, y + 39, r[1][1], { s: 12 }) : T(131, y + 31, r[1][0], { s: 12 })) +
        q.map((line, j) => T(232, y + (q.length === 3 ? 14 : 23) + j * 17, line, { s: 12.5, w: 700, a: 'start' })).join('');
    }).join('') +
    [['how the parts fit', 'shape', 16], ['where it runs', 'place', 220], ['keeping it healthy', 'care', 390]].map(g =>
      `<rect x="${g[2]}" y="572" width="18" height="18" rx="5" fill="${GROUP[g[1]]}" stroke="${P.ink}" stroke-width="2.5"/>` +
      T(g[2] + 26, 586, g[0], { s: 12.5, a: 'start' })).join('') +
    `<line x1="20" y1="606" x2="580" y2="606" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    T(300, 632, 'THREE KINDS OF MESS', { s: 12.5 }) +
    messKinds.map((h, i) => {
      const x = 10 + i * 198;
      return box(x, 646, 182, 98, h[5], 12) +
        T(x + 91, 667, h[0], { s: 11, f: P.accent }) + T(x + 91, 686, h[1], { s: 12.5 }) + T(x + 91, 702, h[2], { s: 11, w: 700, f: P.ink2 }) +
        T(x + 91, 721, h[3], { s: 11.5, w: 700, f: P.ink2 }) + T(x + 91, 736, h[4], { s: 11.5, w: 700, f: P.ink2 });
    }).join('') +
    T(300, 772, 'A loan is on the list. A broken window is the one everybody forgot.', { s: 12.5, w: 700, f: P.ink2 }));

  const playCode = [
    'import web_toolkit',
    '',
    'def free_cookie(points):',
    '    if points >= 30:',
    '        web_toolkit.show("Free cookie!")'
  ];
  const playPic = `<div style="width:100%">${code(playCode, { title: 'rules/points.py, a file in the centre', bad: [1, 5] })}` +
    svg(600, 126, 'Line 1 breaks the dependency rule because a rule in the centre knows that web pages exist. Line 5 breaks the Unix philosophy because the answer goes to a screen and stops there, so nothing else can use it.',
      box(20, 16, 270, 64, P.dangerT, 14) + T(155, 42, 'line 1: a rule that knows web pages', { s: 13 }) + T(155, 64, 'Layers and the dependency rule', { s: 13, f: P.danger }) +
      box(310, 16, 270, 64, P.dangerT, 14) + T(445, 42, 'line 5: the answer stops on a screen', { s: 13 }) + T(445, 64, 'Unix philosophy', { s: 13, f: P.danger }) +
      T(300, 114, 'one small rule, two broken principles', { s: 13, w: 700, f: P.ink2 })) + `</div>`;

  /* ---------- quiz programs, all new ---------- */
  const refundTop = [
    'import web_toolkit',
    'from rules.points import take_back_points',
    'from outside.card_payment import send_refund',
    'from use_cases.find_sale import find_sale',
    '',
    'def refund_sale(sale_id):',
    '    sale = find_sale(sale_id)',
    '    take_back_points(sale.card, sale.total)',
    '    send_refund(sale.card, sale.total)',
    '    web_toolkit.show("Refunded " + str(sale.total))'
  ];
  const cakeTests = [
    'def test_deposit_is_a_quarter():',
    '    assert cake_deposit(80) == 20',
    '',
    'def test_one_day_is_too_soon():',
    '    assert too_soon(1) == True',
    '',
    'def test_order_with_stand_ins():',
    '    book = FakeBook()',
    '    place_cake_order(80, book)',
    '    assert book.saved == [20]',
    '',
    'def test_order_reaches_the_real_book():',
    '    book = DatabaseBook("spare.db")',
    '    place_cake_order(80, book)',
    '    assert book.last_saved() == 20',
    '',
    'def test_customer_orders_a_cake():',
    '    browser.open("/cakes")',
    '    browser.click("Order a cake")',
    '    browser.pay_with("test card")',
    '    assert "Deposit paid" in browser.page_text()'
  ];
  const boxesFile = ['lemon', 'oat', 'Oat', 'lemon', 'ginger', 'oat', 'lemon'];
  const pipePic = `<div style="width:100%">${term(boxesFile, 'boxes.txt: one line per box packed today')}` +
    term(['# How many different kinds of cookie were packed today?', '$ sort boxes.txt | uniq -c | wc -l'], 'Sam\'s terminal') + `</div>`;
  const cakeSite = [
    'import os',
    'import cake_designer',
    '',
    'PHOTO_FOLDER = "/Users/maya/cake_photos/"',
    'TEXT_KEY = os.environ["TEXT_KEY"]',
    'waiting_list = []',
    '',
    'def order_cake(customer, design):',
    '    waiting_list.append(customer)',
    '    picture = cake_designer.draw(design)',
    '    save_photo(PHOTO_FOLDER + customer + ".png", picture)',
    '    print("cake ordered by " + customer)'
  ];
  const addressCode = [
    'def find_address(postcode):',
    '    """Hand back the street address for a postcode."""',
    '    return map_service.lookup(postcode)'
  ];
  const addressPic = `<div style="width:100%">${code(addressCode, { title: 'delivery.py' })}` +
    term(['# Saturday, 3:40 pm, the 101st delivery of the day', 'QuotaExceeded: free plan allows 100 lookups per day', '# the delivery screen stops, with a queue of drivers waiting'], 'the delivery screen') + `</div>`;
  const debtOrWindow = `<div style="width:100%">` +
    code([
      '# A: docs/debt_list.txt, line 3',
      '# Easter boxes: prices typed into easter.py, to open by Good Friday.',
      '# Owner: Maya. Due: 30 April. Interest paid so far: 0 days.'
    ], { title: 'thing A: a line on the team\'s debt list' }) +
    term([
      '$ pytest',
      'FAILED tests/unit/test_wrap.py::test_ribbon_price - assert 1.5 == 2',
      '1 failed, 52 passed in 0.41s',
      '# Sam: "Oh, that one has been red since March. Ignore it."'
    ], 'thing B: the test run, on any day') + `</div>`;
  const allergyCode = [
    'import web_toolkit',
    'from rules.allergies import ALLERGIES',
    '',
    'def allergy_page(item):',
    '    web_toolkit.show(item + ": " + ALLERGIES[item])'
  ];
  const lateCode = [
    'def late_orders(orders, now):',
    '    late = []',
    '    for order in orders:',
    '        if order.ready_by < now:',
    '            late.append(order)',
    '    return late',
    '',
    'kitchen_screen.show(late_orders(todays_orders, now))',
    'print_paper("Late today:", len(late_orders(todays_orders, closing)))'
  ];
  const boxTests = [
    'def test_box_of_six():',
    '    assert box_price(6) == 9',
    '',
    'def test_box_of_twelve():',
    '    assert box_price(12) == 15',
    '',
    'def test_gift_box():                    # Priya, Friday',
    '    assert gift_box_price(12) == 18',
    '',
    'test_box_of_six()',
    'test_box_of_twelve()',
    'print("all tests passed")'
  ];
  const keyCode = [
    'import os',
    '',
    'def payment_key():',
    '    if "PAYMENT_KEY" in os.environ:',
    '        return os.environ["PAYMENT_KEY"]',
    '    return "sk_test_1234"       # a sensible default, says Sam'
  ];
  const giftCode = [
    'import giftco',
    '',
    'GIFTCO_KEY = "gc_live_9911"      # TODO move this one day',
    '',
    'def card_balance(card_id):',
    '    return giftco.balance(GIFTCO_KEY, card_id)'
  ];

  COURSE.add({
    id: 'l52', minutes: 16,
    summary: 'Eight ideas for whole systems, on one page. Then you are the detective again. Here is a file, a terminal or a scene from Maya\'s shop: <b>which principle is being broken?</b>',
    parts: [
      {
        label: 'Recap', pic: recapPic,
        h: 'Eight principles for a whole system.',
        text: [
          'Module 5 zoomed out. Until lesson 43, every lesson looked at one function or one file. These eight looked at <b>whole systems</b>: how the files are arranged, where the program runs, and how it stays healthy as months go by. Each one came with <b>one question to ask</b>. The picture puts all eight on one page. The number in the circle is the lesson.',
          '<b>How the parts fit.</b> Layers and the dependency rule draws the map: the shop\'s rules in the centre, and every arrow pointing inward. Leaky abstractions is about the outer ring. Every handle that hides a machine will show that machine on a bad day, so make the handle honest. Unix philosophy says how to cut the pieces: one job each, and an output that the next piece can use.',
          '<b>Where it runs.</b> Convention over configuration and Twelve-factor app are both about <b>settings</b>, and they agree. Write a setting only for what really differs. What is the same everywhere follows one well-known rule. What differs from one place to the next comes from that place, never typed into the code.',
          '<b>Keeping it healthy.</b> The testing pyramid gives you the checks, and layers are what make its wide bottom possible. The last two are about mess. The strip at the bottom puts them next to lesson 13, Boy Scout rule. Your own habit, a loan you chose and wrote down, and a signal that nobody owns. Same mess on the screen, three different things.'
        ],
        tip: 'Does lesson 46, "do not spell it out", fight with lesson 23, Explicit over implicit, "say it, do not hide it"? No. They are two halves of one rule. Spell out what is <b>surprising or different</b>. Let a well-known rule cover what <b>anyone could guess</b>.'
      },
      {
        label: 'How to play', pic: playPic,
        h: 'Same game, bigger map.',
        text: [
          'In each lesson, the quiz asked "what does this principle mean?". In a review the question changes, as it did in lessons 14, 24, 35 and 43. You will see something from Maya\'s shop that you have not met before, and the question is: <b>which principle is being broken here?</b>',
          'This module is about whole systems, so not every question is a function. Some show the import lines at the top of a file, a terminal, a test file or a settings line. Some describe a scene in the shop.',
          'Real code usually breaks <b>more than one</b>. Look at the picture. This file lives in the centre. Line 1 means a rule of the shop knows that web pages exist. Line 5 sends the answer to a screen and hands nothing back, so the till and the phone app cannot use it. And because of both, no small test can check this rule without a web page. Five lines, and three lessons feel it.',
          'A good way to work: run through the eight questions from the recap, one at a time. Stop at each one that gets a bad answer.'
        ],
        warn: 'Sometimes the code is <b>fine</b>. Then the right answer is "leave it alone". And sometimes two principles pull in different directions. Then you pick the better call and say why. That is lesson 4, Trade-offs, not laws, at work.'
      }
    ],
    quiz: [
      {
        type: 'match', q: 'Warm up, part 1. Five principles about how a system is built and where it runs. Match each one to its test question.',
        pairs: [
          ['Layers and the dependency rule', 'Does anything in the centre know that the outside exists?'],
          ['Leaky abstractions', 'On a bad day, what would I need to know about the insides to understand what went wrong? And is that written on the front?'],
          ['Convention over configuration', 'Could a newcomer guess this from the house rule, or did someone have to write it down just for this one case?'],
          ['Unix philosophy', 'Does this do one job, and can its output be fed straight into something else?'],
          ['Twelve-factor app', 'Could I start this on a brand-new machine by copying the code and setting a few named settings, without editing any file?']
        ],
        why: 'Lessons 44 to 48. One question about the direction of arrows, one about a bad day, one about guessing, one about pieces that join, and one about moving day. In the rest of this quiz these questions are your tools.'
      },
      {
        type: 'match', q: 'Warm up, part 2. Three principles about keeping a system healthy over time. Match each one to its test question.',
        pairs: [
          ['Testing pyramid', 'If this broke, would a fast, small test tell me exactly where, or would I only find out by clicking through the whole thing?'],
          ['Technical debt', 'What will this shortcut cost me every time I come back here, and how often will I come back?'],
          ['Broken windows', 'If a newcomer opened this today, what would they conclude is normal here?']
        ],
        why: 'Lessons 49 to 51. Debt asks what a shortcut costs <b>you</b>. Broken windows asks what the mess teaches <b>everyone else</b>. The pyramid asks how fast you would find out.'
      },
      {
        type: 'pick', q: 'This file lives in the middle ring, <code>use_cases</code>. Read only the import lines. Which ones break the dependency rule? Pick all that apply.',
        pic: code(refundTop, { title: 'use_cases/refund_sale.py', hi: [1, 2, 3, 4] }),
        options: ['Line 1', 'Line 2', 'Line 3', 'Line 4'],
        answer: [0, 2],
        why: 'Line 1 names a web toolkit and line 3 names a file from <code>outside</code>. Both point outward, so a refund now cannot run without a web page and one particular card company. Line 2 points inward, to <code>rules</code>. Line 4 stays in its own ring, and lesson 44 said a file in <code>use_cases</code> may import from <code>use_cases</code> and <code>rules</code>. That is lesson 44, Layers and the dependency rule.',
        hint: 'A file in use_cases may import from its own ring and from the centre. Which two lines name something further out?'
      },
      {
        type: 'fill', q: 'Back to lesson 33, Dependency injection. Fix the refund so that no import points outward. The page that wants a note will write it itself, as in lesson 44.',
        pic: code(refundTop.slice(5), { title: 'the job before the fix', bad: [4, 5] }),
        text: 'from ___.points import take_back_points\n\ndef refund_sale(sale, ___):\n    take_back_points(sale.card, sale.total)\n    payments.send_refund(sale.card, sale.total)\n\n# main.py, the wiring on the very outside\nrefund_sale(sale, ___)',
        options: ['rules', 'outside', 'payments', 'CardCompany()', 'web_toolkit'],
        answer: ['rules', 'payments', 'CardCompany()'],
        why: 'The rule about points stays in the centre, so that import points inward. The card company is <b>handed in</b> as <code>payments</code>, and the use case only knows that it has a <code>send_refund</code> job. The wiring in <code>main.py</code> builds the real <code>CardCompany()</code>. It sits on the very outside, so it is allowed to know everybody. Swap the card company one day, and the use case does not change.',
        hint: 'Points are a rule of the shop. The use case is handed its card company. Who builds the real one?'
      },
      {
        type: 'bucket', q: 'Maya writes tests for the new cake orders. Sort each test by its size.',
        pic: code(cakeTests, { title: 'test_cakes.py', hi: [8, 13, 18] }),
        buckets: ['Unit', 'Integration', 'End-to-end'],
        items: [
          ['test_deposit_is_a_quarter', 0],
          ['test_one_day_is_too_soon', 0],
          ['test_order_with_stand_ins', 0],
          ['test_order_reaches_the_real_book', 1],
          ['test_customer_orders_a_cake', 2]
        ],
        why: 'The first two check one rule alone. The third checks one use case alone, with a harmless stand-in for the book, so it is still a unit test, as in lesson 49. The fourth plugs in the <b>real</b> database book, pointed at a spare file, to see that the two parts fit. The last drives the whole shop through a browser, like a customer. Many of the first kind, some of the second, a few of the last.'
      },
      {
        type: 'order', q: 'A customer says a box of 12 cost $18, and the price list says $15. Put Maya\'s steps in order, the way lesson 49, Testing pyramid, taught.',
        items: [
          'Find the job that works out a box price: box_price, in the centre',
          'Write a small test: box_price(12) must hand back 15',
          'Run it and watch it fail with 18, the price the customer paid',
          'Fix the rule inside box_price',
          'Run all the unit tests and watch every one pass'
        ],
        why: 'When a customer finds a bug, push it <b>down</b> the pyramid. The small test comes before the fix. Seeing it fail first, with the customer\'s number, proves it can catch this bug. After the fix it guards the rule for good, and the full run shows nothing else broke.',
        hint: 'The test is written before the fix, and it has to fail once before you trust it.'
      },
      {
        type: 'type', q: 'Sam wants to know how many different kinds of cookie were packed today. One line was typed by hand. What number does his line print?',
        pic: pipePic,
        prompt: 'it prints >',
        answers: ['4', 'four'],
        why: '<code>sort</code> brings equal lines together. <code>uniq -c</code> squashes each run of identical lines into one. <code>wc -l</code> counts what is left. But <code>Oat</code> and <code>oat</code> are not identical text, so there are 4 groups: ginger, lemon, oat and Oat. Lesson 47, Unix philosophy, warned that plain text carries no labels. The tools compare letters, not meanings. The cure is at the start of the line, where the boxes are recorded: lesson 41, Robustness principle, said to be strict in what you send.',
        hint: 'uniq -c squashes lines that are exactly the same. Are Oat and oat exactly the same?'
      },
      {
        type: 'pick', q: 'Maya will run three copies of this file on three rented machines. <code>cake_designer</code> is on the list in <code>requirements.txt</code>. Which lines would stop the copies from running the same way on brand-new machines? Pick all that apply. One of the answers is a lesson from module 4.',
        pic: code(cakeSite, { title: 'cakes.py' }),
        options: ['Line 2, import cake_designer', 'Line 4, the photo folder', 'Line 5, the text key', 'Line 6, the waiting list', 'Line 12, print'],
        answer: [1, 3],
        why: 'Line 4 names a folder that exists only on Maya\'s laptop. A rented machine has no <code>/Users/maya/</code>, and three machines would hold three different piles of photos. Photos belong in a backing service, reached at an address from config. Line 6 keeps the waiting list in the memory of one running copy. Each copy has its own list, and a restart empties it: lesson 42, Statelessness, which the twelve factors call Processes. The other three are fine. The tool is on the list, the key comes from the environment, and <code>print</code> is exactly what the Logs factor asks for.',
        hint: 'Picture a fourth copy starting on a brand-new machine. Which lines would find nothing there, or know something the other copies do not?'
      },
      {
        type: 'pick', q: 'The map company\'s free plan answers 100 lookups a day. On a busy Saturday, the 101st delivery stops the delivery screen. Which principle explains this, and what is the best fix?',
        pic: addressPic,
        options: [
          'Leaky abstractions. Say the daily limit on the front, turn QuotaExceeded into a shop word such as AddressLookupDown, and let the screen ask staff to type the address',
          'Leaky abstractions. Catch the error and hand back an empty address, so that the screen never stops',
          'Layers and the dependency rule. Move find_address into the centre, with the shop\'s rules',
          'Unix philosophy. Split find_address into three smaller tools'
        ],
        answer: 0,
        why: 'The front says "hand back the address". It says nothing about a daily limit, and nothing about an error called <code>QuotaExceeded</code>. On a bad day that hidden detail of the map company came through: lesson 45, Leaky abstractions. You cannot make the plan bigger by hoping. You can be honest. Write the limit on the front, translate the error from below into a word the shop knows, and let the screen plan for that word. An empty address would send a driver nowhere and tell nobody.',
        hint: 'What did the delivery screen need to know about the map company to understand its Saturday?',
        hints: {
          1: 'Then the screen never stops, and a driver gets an empty address. Lesson 45 called that kind of seal a silent bug. Who finds out?',
          2: 'The centre may not know that a map company exists. Which ring does a tool that talks over the internet live in?',
          3: 'find_address already does one job. Would three smaller tools have known about the limit?'
        }
      },
      {
        type: 'pick', q: 'Sam looks at the two things below and says: "Both are the same. Mess." What is the best way to tell them apart, and to deal with each?',
        pic: debtOrWindow,
        options: [
          'Both are broken windows. Stop all other work and fix both today',
          'A is technical debt: a loan chosen on purpose, written down, with an owner and a date. Pay it off when it is due, or sooner if Maya keeps changing that code. B is a broken window: fix the test or delete it, or board it up with a name and a date',
          'Both are technical debt. Add B to the debt list too, and leave it red until it is due',
          'A is a broken window, because typed-in prices are messy. B is fine, because everyone knows to ignore it'
        ],
        answer: 1,
        why: 'Lesson 50, Technical debt, called a deliberate, tracked shortcut a loan. Thing A is exactly that, and so far it has cost nothing, because nobody has had to touch it. Lesson 51, Broken windows, called a signal that something is wrong and that nobody deals with a broken window. Thing B is red every day, and "ignore it" is how a new red light hides for two weeks. A loan is on the list. A broken window is the one everybody forgot.',
        hint: 'Which one has an owner and a date? Which one is a signal that everybody has learned to ignore?',
        hints: {
          0: 'Thing A has an owner, a date and no interest paid yet. Lesson 50 said a written-down loan is a tool. What is wrong with it today?',
          2: 'A red test that stays red teaches the team that red is normal. Can a list make a red light stop meaning "ignore me"?',
          3: 'A was chosen on purpose and written down. And "everyone knows to ignore it" is the exact sentence from lesson 51.'
        }
      },
      {
        type: 'pick', q: 'Sam has just finished lesson 44, Layers and the dependency rule. He says: "This page skips the middle ring and imports straight from the centre. Every page must go through a use case. Add <code>use_cases/get_allergies.py</code>." Nobody has had any trouble with this page. What is the best call?',
        pic: code(allergyCode, { title: 'outside/allergy_page.py', hi: [2] }),
        options: [
          'Add the use case file, so that the page goes through every ring',
          'Leave it alone. The arrow points inward, which is all the rule asks. A middle file that only passes the answer on would add a hop and nothing else',
          'Leave it alone. The dependency rule is only about files in the centre',
          'Copy the allergy table into the page, so that it needs no import at all'
        ],
        answer: 1,
        why: 'The code is fine. An outside file may import from any ring further in, and line 2 points from the outside to the centre. Lesson 44 said layers are a map for dependencies, not a route. Showing a fact needs no step-by-step use case. A file that only passes the answer along is the empty layer from that lesson. Copying the table would break lesson 7, Single source of truth, on the one fact a customer must be able to trust.',
        hint: 'Which way does the arrow on line 2 point? Does the rule say every feature must visit every ring?',
        hints: {
          0: 'What would that file do? Lesson 44 showed a use case that only passed a phone number along. What did it call that?',
          2: 'Right call, wrong reason. A file in use_cases may not import from outside either. Why is this page allowed to import from rules?',
          3: 'Then the allergy facts live in two places. Which copy wins on the day a recipe changes?'
        }
      },
      {
        type: 'pick', q: 'Sam has just finished lesson 47, Unix philosophy. He says: "This job loops, compares and collects. That is three jobs. Split it into three tiny tools." The kitchen screen and the end-of-day paper both use it, and nobody has had any trouble. What is the best call?',
        pic: code(lateCode, { title: 'orders.py', good: [6], hi: [8, 9] }),
        options: [
          'Split it into three: one tool to loop, one to compare and one to collect',
          'Leave it alone. It does one whole job that deserves a name, and it hands back a plain list that anything can use',
          'Leave it alone. The Unix philosophy is only about tools in a terminal, never about Python',
          'Make it print the late orders in a nice box instead, so that the kitchen can read them'
        ],
        answer: 1,
        why: 'The code is fine. Ask the lesson 47 question. One job? Yes: find the late orders. Can its output be fed into something else? Yes. Line 6 hands back a plain list, and lines 8 and 9 feed it to two different places, the way a pipe feeds one tool into the next. Lesson 47 warned that "one thing" can be cut too thin, and lesson 17, Small functions, called that chopping too small. Printing a box would make the output a dead end.',
        hint: 'Ask the two parts of the lesson 47 question. Is this one job that deserves a name? Where does its output go?',
        hints: {
          0: 'Would a tool that only loops, with nothing to do on each step, deserve a name? Lesson 47 said a tool should do one whole job.',
          2: 'Right call, wrong reason. Lesson 47 used the same test inside a Python program, with find and first.',
          3: 'Then lines 8 and 9 could not use it. What did ginger_b in lesson 47 do with its output?'
        }
      },
      {
        type: 'bucket', q: 'A principle is a tool, not a law. Is each of these a good use of one, or is it overdoing it?',
        buckets: ['Use it here', 'Overdoing it'],
        items: [
          ['A tax rule file that imports nothing from outside', 0],
          ['Saying on the front of find_address that it needs the internet', 0],
          ['One rule for label files, and a table for the one cake that differs', 0],
          ['grep and wc for a quick count in a file of plain lines', 0],
          ['Reading the payment key from the environment on rented machines', 0],
          ['A two-line test for exactly 30 points, the edge of the free cookie rule', 0],
          ['A dated shortcut on the debt list, to open the Easter shop on time', 0],
          ['Keeping warnings at zero, so that a new one shouts', 0],
          ['Three rings of folders for a 10-line script that runs once', 1],
          ['A front that lists twenty facts about the insides', 1],
          ['A default payment key, so that nobody ever has to set one', 1],
          ['A chain of 12 tools that nobody on the team can explain', 1],
          ['Reading TAX_RATE from the environment in every place', 1],
          ['A test that checks TAX_RATE is 0.09', 1],
          ['Freezing all work for two months to rewrite a report opened once a year', 1],
          ['Four days of polishing names while a one-line price change waits', 1]
        ],
        why: 'Each one on the left fixes a real problem at a small cost. Each one on the right pushes one of the eight ideas past the point where it helps: layers, honest fronts, defaults, pipes, settings, tests, paying debt and mending windows, all overdone. They come from the "When not to" part of each lesson.'
      },
      {
        type: 'pick', q: 'Two principles pull against each other. Priya added the test on lines 7 and 8 on Friday. Sam says: "Lesson 23, Explicit over implicit. Keep the list at the bottom, so a reader can see exactly which tests run." Maya says: "Lesson 46, Convention over configuration. Delete lines 10 to 12, and let pytest find every function whose name starts with <code>test_</code>." What is the best call?',
        pic: code(boxTests, { title: 'test_boxes.py', hi: [7, 10, 11] }),
        options: [
          'Sam. A list on the page beats a hidden habit, so keep it and add Priya\'s test to it',
          'Maya. The test_ habit is written down, the same in every Python project, and unsurprising. A hand list is one more place to forget, and Priya\'s test has never run',
          'Maya, and go further. The shop should invent its own rule: any function with "box" in its name is a test',
          'Neither. Put Priya\'s test in a file of its own, so that it runs by itself'
        ],
        answer: 1,
        why: 'Run the file in your head. Lines 10 and 11 call two tests, and line 12 prints "all tests passed". Line 8 has never run once, so it could be wrong and nobody would know. Lesson 23 asks you to spell out what is <b>surprising or different</b>. Where tests live is neither. pytest\'s habit passes all four checks from lesson 46: written down, the same everywhere, unsurprising, and easy to override. Lesson 23 still has work here. A test that is skipped on purpose gets a reason and a name, in plain sight, as in lesson 51. A home-made rule that only the shop knows fails the first check.',
        hint: 'Run the file in your head, from line 10. Which tests does it call? What does it print?',
        hints: {
          0: 'That fixes Friday. What happens to the next test that somebody forgets to add to the list?',
          2: 'Lesson 46 said to prefer the habits your tools already have. Who outside the shop would know a rule about "box"?',
          3: 'Would that file run its test by itself? Something still has to find it, or list it.'
        }
      },
      {
        type: 'pick', q: 'Two principles pull against each other again. Sam adds this job so that nobody has to set <code>PAYMENT_KEY</code> on a laptop. Sam says: "Lesson 46, Convention over configuration. A sensible default beats a setting." Maya says: "Lesson 48, Twelve-factor app. The key comes from the place." What is the best call? Think back to lesson 22, Fail fast.',
        pic: code(keyCode, { title: 'payments.py', hi: [6] }),
        options: [
          'Sam is right. The default is only a test key, so it can never do any harm',
          'No default. Read os.environ["PAYMENT_KEY"] directly, so that a place that forgot to set it stops at the start with a KeyError',
          'Keep the default, and print a warning whenever it is used',
          'Make the real key the default instead, so that the real shop always works'
        ],
        answer: 1,
        why: 'A test key "never does harm" until the real shop forgets to set its key. Then every payment all Saturday is pretend, which is moving day from lesson 48 all over again. Lesson 46 itself said some things must never have a default, and the payment key was on its list. A default is for what is the same everywhere and boring to find out. Which bank account gets the money is neither. Without a default, a missing key stops the program at the start, loud and early: lesson 22, Fail fast. On her laptop Maya types the setting in front of the start command, as lesson 48 showed.',
        hint: 'Picture the real shop on a Saturday, with somebody who forgot to set the key. What happens with the default, and what happens without it?',
        hints: {
          0: 'Where does the default get used? Think of the real shop on the day somebody forgets to set the key.',
          2: 'Lesson 51 counted 200 warnings that nobody read. Who is watching the screen on a busy Saturday?',
          3: 'Then the real key sits in the code, where every copy of the file can read it. And every laptop takes real money.'
        }
      },
      {
        type: 'pick', q: 'The last one is a real mix. This file sits in the centre. <code>giftco</code> is the gift card company\'s ready-made tool, which talks to the company over the internet. <code>gc_live</code> marks the real key, and the TODO note is a year old. Which principles does this code break? Pick all that apply.',
        pic: code(giftCode, { title: 'rules/gift_cards.py' }),
        options: ['Layers and the dependency rule', 'Twelve-factor app', 'Broken windows', 'Least privilege', 'Convention over configuration', 'Idempotency', 'Liskov substitution'],
        answer: [0, 1, 2, 3],
        why: 'Line 1 makes a file in the centre depend on a company out in the world: lesson 44, Layers and the dependency rule. Line 3 types a key into the code, so it cannot differ between the laptop and the shop, and moving day needs an edit: lesson 48, Twelve-factor app. Anyone who gets a copy of the file holds the live key: lesson 38, Least privilege. The note has no owner and no date, it is on no debt list, and it has sat in sight for a year: lesson 51, Broken windows. The last three do not apply. No setting is spelled out that a rule could guess, asking for a balance twice changes nothing, and nothing stands in for anything. A good fix: the key comes from the environment, the gift card tool moves to the outer ring and is handed in, and the note is gone.',
        hint: 'Check four things: what line 1 brings into the centre, what line 3 types into the file, who can read that line, and what the note tells the next reader.'
      }
    ]
  });
})();
