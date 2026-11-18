/* Lesson 49: Testing pyramid (module 5). One file per lesson. */
(function () {
  const { P, code, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l49  Testing pyramid
     ===================================================================== */
  // A pyramid of three bands, centred on cx. fills and words run from the top band down.
  const hw = y => 30 + (y - 56) * 0.56;
  const band = (cx, y1, y2, fill, dash) => `<polygon points="${cx - hw(y1)},${y1} ${cx + hw(y1)},${y1} ${cx + hw(y2)},${y2} ${cx - hw(y2)},${y2}" fill="${fill}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"${dash ? ' stroke-dasharray="7 6"' : ''}/>`;
  const pyramid = (cx, fills, words) =>
    band(cx, 56, 128, fills[0]) + band(cx, 136, 208, fills[1]) + band(cx, 216, 290, fills[2]) +
    T(cx, 99, words[0], { s: 14 }) + T(cx, 178, words[1], { s: 14 }) + T(cx, 259, words[2], { s: 14 });

  const ideaPic = svg(600, 330, 'A pyramid with three levels. At the bottom, many unit tests, like testing each bolt on the bench. In the middle, some integration tests, like running the assembled engine. At the top, a few end-to-end tests, like one test drive of the finished car.',
    T(300, 30, 'THREE SIZES OF TEST', { s: 12.5, f: P.accent }) +
    pyramid(190, [P.tint, P.warnT, P.okT], ['few', 'some', 'many']) +
    T(392, 82, 'END-TO-END', { s: 12.5, a: 'start', f: P.accent }) +
    T(392, 102, 'the whole shop, used like a customer', { s: 12, w: 700, a: 'start', f: P.ink2 }) +
    T(392, 120, 'car: one test drive', { s: 12, w: 700, a: 'start', f: P.ink2 }) +
    T(392, 162, 'INTEGRATION', { s: 12.5, a: 'start', f: P.warn }) +
    T(392, 182, 'a few real parts plugged together', { s: 12, w: 700, a: 'start', f: P.ink2 }) +
    T(392, 200, 'car: the engine, assembled', { s: 12, w: 700, a: 'start', f: P.ink2 }) +
    T(392, 242, 'UNIT', { s: 12.5, a: 'start', f: P.ok }) +
    T(392, 262, 'one small piece, on its own', { s: 12, w: 700, a: 'start', f: P.ink2 }) +
    T(392, 280, 'car: each bolt, on the bench', { s: 12, w: 700, a: 'start', f: P.ink2 }) +
    T(300, 320, 'lower down: smaller, faster, cheaper, and more of them', { s: 13, w: 700, f: P.ink2 }));

  const firstTest = [
    '# test_order.py',
    'from rules.order import final_total',
    '',
    'def test_small_order():',
    '    assert final_total(10) == 10.90',
    '',
    'def test_discount_from_20():',
    '    assert final_total(20) == 19.62',
    '',
    'test_small_order()',
    'test_discount_from_20()',
    'print("2 tests passed")'
  ];
  const codePic = `<div style="width:100%">${code(firstTest, { title: 'test_order.py', hi: [4, 5] })}${term(['$ python test_order.py', '2 tests passed'], 'run it')}</div>`;

  const buggyTotal = [
    'def final_total(price):',
    '    if price >= 20:',
    '        price = price - price * 0.10',
    '    elif price >= 100:',
    '        price = price - price * 0.20',
    '    return price + price * TAX_RATE'
  ];
  // Upside-down: one huge band of clicking on top, nothing underneath.
  const flip = (y1, y2, wTop, wBot, fill, dash) => `<polygon points="${150 - wTop},${y1} ${150 + wTop},${y1} ${150 + wBot},${y2} ${150 - wBot},${y2}" fill="${fill}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"${dash ? ' stroke-dasharray="7 6"' : ''}/>`;
  const conePic = svg(600, 300, 'An upside-down pyramid, called the ice-cream cone. A huge top level of clicking through the whole shop by hand, 25 minutes each time, and nothing underneath. Beside it, a 100 dollar party order was charged 98 dollars 10 and should have been 87 dollars 20.',
    T(150, 28, 'THE "ICE-CREAM CONE"', { s: 12.5, f: P.danger }) +
    flip(46, 130, 132, 92, P.dangerT) + T(150, 82, 'click through the', { s: 13.5 }) + T(150, 101, 'whole shop, by hand', { s: 13.5 }) + T(150, 120, '25 minutes each time', { s: 12, w: 700, f: P.danger }) +
    flip(138, 196, 88, 60, P.paper2, true) + T(150, 172, '0 tests of parts', { s: 12.5, w: 700, f: P.mute }) +
    flip(204, 256, 56, 32, P.paper2, true) + T(150, 235, '0 small', { s: 12, w: 700, f: P.mute }) +
    T(150, 284, 'all big, all slow, nothing underneath', { s: 13, w: 700, f: P.ink2 }) +
    `<line x1="300" y1="20" x2="300" y2="288" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    T(450, 28, 'A $100 PARTY ORDER', { s: 12.5, f: P.ink2 }) +
    box(350, 46, 200, 62, P.dangerT, 14) + T(450, 74, '$98.10', { s: 22, m: true, f: P.danger }) + T(450, 96, 'what the shop charged', { s: 12, w: 700, f: P.ink2 }) +
    `<circle cx="450" cy="140" r="20" fill="${P.dangerT}" stroke="${P.ink}" stroke-width="2.5"/>` + T(450, 149, '≠', { s: 24, f: P.danger }) +
    box(350, 172, 200, 62, P.okT, 14) + T(450, 200, '$87.20', { s: 22, m: true, f: P.ok }) + T(450, 222, 'what the rule says', { s: 12, w: 700, f: P.ink2 }) +
    T(450, 266, 'nobody ever clicked', { s: 13, w: 700, f: P.ink2 }) + T(450, 284, 'an order that big', { s: 13, w: 700, f: P.ink2 }));
  const painPic = `<div style="width:100%">${code(buggyTotal, { title: 'rules/order.py, with the new party rule', bad: [2, 4] })}${conePic}</div>`;

  const countsPic = svg(600, 330, "Maya's pyramid. 40 unit tests at the bottom that run in under 1 second. 6 integration tests in the middle that take about 10 seconds. 2 end-to-end tests at the top that take about 2 minutes.",
    T(300, 30, "MAYA'S PYRAMID", { s: 12.5, f: P.ok }) +
    pyramid(190, [P.tint, P.warnT, P.okT], ['2', '6', '40']) +
    T(392, 86, '2 end-to-end tests', { s: 13.5, a: 'start' }) +
    T(392, 106, '"can a customer buy a cookie?"', { s: 12, w: 700, a: 'start', f: P.ink2 }) +
    T(392, 124, 'about 2 minutes', { s: 12, a: 'start', f: P.accent }) +
    T(392, 166, '6 integration tests', { s: 13.5, a: 'start' }) +
    T(392, 186, 'real parts, plugged together', { s: 12, w: 700, a: 'start', f: P.ink2 }) +
    T(392, 204, 'about 10 seconds', { s: 12, a: 'start', f: P.warn }) +
    T(392, 246, '40 unit tests', { s: 13.5, a: 'start' }) +
    T(392, 266, 'one rule each, alone', { s: 12, w: 700, a: 'start', f: P.ink2 }) +
    T(392, 284, 'under 1 second for all 40', { s: 12, a: 'start', f: P.ok }) +
    T(300, 320, "round numbers from Maya's shop, not a rule for yours", { s: 13, w: 700, f: P.ink2 }));
  const integrationTest = [
    '# test_place_order.py',
    'def test_sale_reaches_the_book():',
    '    book = DatabaseBook("spare.db")',
    '    printer = FakePrinter()',
    '    order = Order(20, "10:00")',
    '',
    '    place_order(order, book, printer)',
    '',
    '    assert book.last_total() == 19.62',
    '    assert printer.lines == ["Paid 19.62"]'
  ];
  const endToEndTest = [
    '# test_shop.py',
    'def test_customer_can_buy_a_cookie():',
    '    browser.open("/shop")',
    '    browser.click("Add cookie")',
    '    browser.pay_with("test card")',
    '    assert "Thank you" in browser.page_text()'
  ];
  const fixPic = `<div style="width:100%">${countsPic}${code(integrationTest, { title: 'the middle: test_place_order.py', hi: [3, 9] })}${code(endToEndTest, { title: 'the top: test_shop.py', hi: [3] })}</div>`;

  const partyTest = [
    'def test_party_order():',
    '    assert final_total(100) == 87.20'
  ];
  const fixedTotal = [
    'def final_total(price):',
    '    if price >= 100:',
    '        price = price - price * 0.20',
    '    elif price >= 20:',
    '        price = price - price * 0.10',
    '    return price + price * TAX_RATE'
  ];
  const testPic = `<div style="width:100%">${code(partyTest, { title: 'one of the 40: test_order.py', hi: [1] })}` +
    term(['$ pytest tests/unit', '...', 'FAILED tests/unit/test_order.py::test_party_order - assert 98.1 == 87.2', '1 failed, 39 passed in 0.31s'], "after Sam's change") +
    `${code(fixedTotal, { title: 'rules/order.py, fixed', good: [2, 4] })}` +
    term(['$ pytest tests/unit', '...', '40 passed in 0.30s'], 'after the fix') + `</div>`;

  const overTests = [
    'def test_tax_rate():',
    '    assert TAX_RATE == 0.09       # only repeats the line',
    '',
    'def test_earn_insides():',
    '    card = LoyaltyCard()',
    '    card.earn(5)',
    '    assert card._points == 5      # reaches into the insides',
    '',
    'def test_earn_promise():',
    '    card = LoyaltyCard()',
    '    card.earn(5)',
    '    assert card.balance() == 5    # checks the promise'
  ];

  COURSE.add({
    id: 'l49', minutes: 10,
    summary: 'A <b>test</b> is a small piece of code that runs your code and checks the answer. The <b>testing pyramid</b> says how many tests of each size to keep: <b>many small fast ones, some in the middle, and only a few big slow ones.</b>',
    video: {
      src: 'videos/l49-testing-pyramid.mp4', poster: 'videos/l49-testing-pyramid.jpg', length: '1 min 10 s',
      script: [
        'Before every update, Maya and Sam test the shop by hand. Order a cookie. Pay. Check the receipt. 25 minutes of clicking. So they do it less and less.',
        'Then a bug slips into the rule for big orders. Nobody clicks an order that big. A wedding is overcharged. And the wrong total could come from any of 20 places.',
        'There is a better way. A test is a small piece of code. It runs your code, and checks the answer. The computer can rerun it in a blink.',
        'Maya writes 40 tiny tests, one rule each. Then 6 that plug real parts together. And just 2 that buy a cookie the way a customer would.',
        'Run them all. Now plant the same bug. One tiny test turns red, in under a second. It names the exact function.',
        'That is the testing pyramid. Many small, fast tests. Some in the middle. And only a few big, slow ones.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'You do not find a bad bolt by crashing a car.',
        text: [
          'A car factory tests each bolt and each part on the bench, by the thousand. That is quick and cheap, and a bad bolt is caught as a bad bolt. It runs the assembled engine a few times. And it takes the finished car for a test drive once. Nobody finds a bad bolt by crashing whole cars.',
          'Software is checked the same way. A <b>test</b> is a small piece of code that runs your code with a known input and checks that the answer is the one you expect. If it is not, the test says so loudly. You write it once. The computer runs it again in a second, every time anything changes, for as long as the program lives.',
          'Tests come in three sizes. A <b>unit test</b> checks one small piece, a function or a class, on its own. An <b>integration test</b> plugs a few real parts together and checks that they fit. An <b>end-to-end test</b> drives the whole program the way a customer would.',
          'The <b>testing pyramid</b> is a picture of how many to keep of each: <b>many</b> small ones at the bottom, <b>some</b> in the middle, and only a <b>few</b> big ones at the top.'
        ],
        tip: 'Mike Cohn introduced the pyramid in his 2009 book <i>Succeeding with Agile</i>. He called the three levels unit, service and user interface. Martin Fowler and others made it widely known, and today most people say unit, integration and end-to-end.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'Your first test.',
        text: [
          'Here is the smallest real test there is. Line 2 fetches <code>final_total</code> from the centre of the shop, where lesson 44 put the rules. It still gives 10% off from $20 and then adds 9% tax.',
          'Lines 4 and 5 are one whole test. It is a function, so it starts with <code>def</code>. Inside is one <code>assert</code>, which you met in lesson 40, Design by contract: this <b>must</b> be true, or stop. Here it says: <code>final_total(10)</code> must be equal to <code>10.90</code>. Two equals signs mean "is equal to", as in lesson 28.',
          'That is the whole recipe. <b>A known input</b>, 10. <b>The answer you expect</b>, 10.90. If the function ever gives anything else, Python stops with an <code>AssertionError</code> and names the test and the line.',
          'The second test checks the discount: $20 becomes $18, plus $1.62 tax, so <code>19.62</code>. Lines 10 to 12 run both tests and print a happy line. You can run this file with plain Python and no extra tools.',
          'In real projects nobody types lines 10 to 12. A tool such as <b>pytest</b> finds every function whose name starts with <code>test_</code> and runs them all. That is the convention you met in lesson 46, Convention over configuration.',
          'These are <b>unit tests</b>. Each one checks a single function, alone. No screen, no database, no printer. That is why they run in a few thousandths of a second.'
        ],
        warn: 'Sums with decimal points do not always compare exactly on a computer. In Python, <code>0.1 + 0.2 == 0.3</code> is <code>False</code>. Every amount in this lesson was chosen and run to make sure it compares exactly. Real shops avoid the problem by counting money in whole cents.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Twenty-five minutes of clicking.',
        text: [
          'Until now, Maya and Sam have tested in one way only. Before every update goes live, they <b>click through the whole website by hand</b>. Order a cookie. Pay with the test card. Check the receipt. Check the kitchen screen. It takes <b>25 minutes</b>.',
          'So they do it less and less. First before every update. Then only before the big ones. Then "it is a tiny change, it will be fine".',
          'Then Maya adds a rule for party orders: <b>$100 or more gets 20% off</b>. Sam writes it on lines 4 and 5. Read it as Python does. Lesson 28 said Python tries the questions from the top and runs the <b>first</b> one whose answer is yes. Is 100 at least 20? Yes. So line 3 runs, and line 4 is never even asked.',
          'A $100 order should cost $80 plus $7.20 tax: <b>$87.20</b>. It is charged $90 plus $8.10 tax: <b>$98.10</b>. The click-through that week passed, because <b>nobody clicks a $100 order</b>. They always buy one cookie.',
          'Three weeks later a wedding customer complains. Now the hunt begins. The total on a receipt passes through the web page, the basket, the rules, the saving and the printing. Maya counts <b>20 jobs</b> it touches on the way. The wrong receipt does not say which one is to blame.'
        ],
        warn: 'When all the testing is done at the top, by clicking through everything, people call the shape an <b>ice-cream cone</b>. It is an upside-down pyramid: slow to run, easy to skip, and when it does find something it cannot tell you where.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Build it from the bottom.',
        text: [
          '<b>The bottom: 40 unit tests.</b> Each checks one case of one rule: totals, tax, discounts, points. A $10 order. A $20 order. A $19.99 order. A $100 order. A card with exactly 30 points. Awkward cases that nobody would ever click through cost one more two-line test each. Anything that touches the outside world is swapped for a harmless stand-in, as in lesson 33, Dependency injection. All 40 run in <b>under 1 second</b>.',
          '<b>The middle: 6 integration tests.</b> Read <code>test_place_order.py</code>. Line 3 builds the <b>real</b> database book, pointed at a spare file so the shop\'s own sales are not touched. Line 7 runs <code>place_order</code> from lesson 44. Line 9 reads the newest row back with a small job, <code>last_total</code>. So this test checks something no unit test can: that the use case and the real book <b>fit together</b>. Square brackets on line 10 make a list, as in lesson 17.',
          '<b>The top: 2 end-to-end tests.</b> In <code>test_shop.py</code>, <code>browser</code> stands for a tool that drives a real web browser, like a robot customer. It opens the shop, adds a cookie and pays with the test card. <code>in</code> asks "is this text somewhere in that text?". This is the old 25-minute click-through, done by the computer in about 2 minutes.',
          'Why so few at the top? Each one is slow. It can fail for reasons that have nothing to do with your change: a slow network, a button that moved. And when it fails, it only says "something, somewhere, is wrong".',
          'Why so many at the bottom? Each one is fast and steady, and when it fails it <b>points at one function</b>.'
        ],
        tip: 'Lesson 44, Layers and the dependency rule, is what makes the bottom wide. Rules that mention no screen and no database can be tested with no screen and no database. Keeping the rules in the centre is what makes most of your code unit-testable.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Would a small test tell me where?',
        text: [
          'Point at any piece of the program and ask: <b>"If this broke, would a fast, small test tell me exactly where, or would I find out only by clicking through the whole thing?"</b>',
          'Play Sam\'s mistake again, with the pyramid in place. One of the 40 unit tests is <code>test_party_order</code>. Sam swaps the two rules by accident and runs the unit tests before he does anything else.',
          'Under a second later, one line is red. Read it from the left. Which file. Which test: <code>test_party_order</code>. And what went wrong: the answer was <code>98.1</code> and it should have been <code>87.2</code>. There is one function to look at, <code>final_total</code>, and one case, an order of $100.',
          'Sam puts the bigger rule first. All 40 pass. No customer ever saw the bug, and nobody clicked anything.',
          'When a big test, or a customer, does find a bug, push it <b>down</b> the pyramid. First write the small test that would have caught it. Then fix the code. That bug can never come back quietly.'
        ],
        tip: 'Lesson 10, Premature optimisation, said: measure, do not guess. Tests are the same habit for correctness. And lesson 13, Boy Scout rule, said not to tidy what you cannot check. A wide base of fast tests is that check. It is what makes tidying safe.'
      },
      {
        label: 'When not to', pic: code(overTests, { title: 'tests that cost more than they give', bad: [2, 7], good: [12] }),
        h: 'A rule of thumb, not a quota.',
        text: [
          '<b>Do not drop the middle and the top.</b> Suppose all 40 unit tests use <code>FakePrinter</code>, which has a <code>print_line</code> job. The new real printer calls its job <code>print_text</code>. Every unit test passes, and the shop prints nothing. Fakes cannot tell you whether the real parts fit. Only tests with real parts can.',
          '<b>Do not write tests just to raise a count.</b> Line 2 tests that <code>TAX_RATE</code> is <code>0.09</code> by typing <code>0.09</code> again. It can only fail on the day the tax really changes, and then it is a second place to edit. Lesson 1 warned about those.',
          '<b>Test what the code promises, not how it does it.</b> Lesson 40 called the promise a contract. Line 7 reaches into <code>_points</code>, the private inside from lesson 19, Encapsulation. If Maya renames it during a tidy-up, the test breaks although the card still works. Line 12 goes through the door, <code>balance()</code>. Tests welded to the insides fail on every tidy-up, and then people stop trusting them.',
          '<b>A tiny script may need one check, not a pyramid.</b> For a 10-line file that Maya runs once a month, running it and looking at the result is enough. Lesson 4, Trade-offs, not laws, asked: "Is this problem real right now?"',
          '<b>The shape is about cost and speed.</b> It is not a law. Some teams, with some kinds of program, choose a different shape on purpose, with more tests in the middle. That is fine when it is a choice. The ice-cream cone is rarely a choice. It is what you get when nobody decides.'
        ],
        warn: 'Tests that are slow or often wrong get skipped, just like the 25-minute click-through. Skipped checks and shortcuts pile up, and the pile has a name: the next lesson, Technical debt.'
      }
    ],
    quiz: [
      {
        type: 'match', q: 'Match each test to its size.',
        pairs: [
          ['Unit test', 'Checks that final_total(20) hands back 19.62, with nothing else running'],
          ['Integration test', 'Runs place_order with the real database book and reads the row back'],
          ['End-to-end test', 'Opens the website, adds a cookie, pays, and looks for "Thank you"']
        ],
        why: 'One piece alone. A few real parts together. The whole shop, the way a customer uses it.',
        hint: 'Count how much of the shop has to be running for each one.'
      },
      {
        type: 'type', q: 'Finish this unit test. What number must replace the question marks so that it passes? (<code>TAX_RATE</code> is 0.09.)',
        pic: code(fixedTotal.concat(['', 'def test_fifty_dollar_order():', '    assert final_total(50) == ???']), { title: 'rules/order.py and one test', hi: [9] }),
        answers: ['49.05', '$49.05'],
        prompt: 'number >',
        why: '50 is not 100 or more, so line 2 says no. It is 20 or more, so 10% comes off: $45. Then 9% tax on $45 is $4.05. The total is 49.05.',
        hint: 'Which of the two discounts does $50 get? Take it off first, then add 9% tax.'
      },
      {
        type: 'pick', q: 'A free cookie needs 30 points or more. Which test fails?',
        pic: code([
          'def can_have_free_cookie(points):',
          '    return points > 30',
          '',
          'def test_29_points():',
          '    assert can_have_free_cookie(29) == False',
          '',
          'def test_30_points():',
          '    assert can_have_free_cookie(30) == True',
          '',
          'def test_31_points():',
          '    assert can_have_free_cookie(31) == True'
        ], { title: 'points.py and its tests' }),
        options: ['test_29_points', 'test_30_points', 'test_31_points', 'None of them'],
        answer: 1,
        why: 'Line 2 says "more than 30", so exactly 30 gets <code>False</code>. The rule says 30 or more: it should be <code>&gt;=</code>. Nobody clicking through the shop would try a card with exactly 30 points. A two-line test does.',
        hint: 'Try each number on line 2. Is 30 more than 30?'
      },
      {
        type: 'bucket', q: 'Bottom of the pyramid, or top?',
        buckets: ['Bottom: unit tests', 'Top: end-to-end tests'],
        items: [
          ['Each one runs in milliseconds', 0],
          ['A failure points at one function', 0],
          ['You can keep hundreds of them', 0],
          ['Can fail because the network was slow', 1],
          ['Shows that the whole shop works together', 1],
          ['Each one takes seconds or minutes', 1]
        ],
        why: 'Small tests are fast, steady and exact, so you keep many. Big tests prove the most and cost the most, so you keep a few.',
        hint: 'Ask of each one: is this about one small piece alone, or about everything running at once?'
      },
      {
        type: 'fill', q: 'Write the unit test for the party rule: $100 or more gets 20% off, then 9% tax is added.',
        text: 'def test_party_order():\n    ___ final_total(___) == ___',
        options: ['assert', '100', '87.20', 'return', '98.10', '20'],
        answer: ['assert', '100', '87.20'],
        why: 'A known input, 100. The answer you expect: $80 plus $7.20 tax is 87.20. And <code>assert</code> to stop loudly if they differ. 98.10 is what the buggy code gave.',
        hint: 'The first blank is the word from lesson 40 that means "this must be true". Then the input, then the right answer.'
      },
      {
        type: 'pick', q: 'A team has 3 unit tests and 80 checks that click through the whole app. What will they notice? Pick all that apply.',
        options: [
          'Running all the checks takes a long time, so they get skipped',
          'When a check fails, it does not say which piece of code is wrong',
          'Checks sometimes fail for reasons unrelated to the change',
          'The checks can never find a real bug'
        ],
        answer: [0, 1, 2],
        why: 'That shape is the ice-cream cone: slow, vague and shaky. It can still find real bugs. It just finds them late and cannot say where they are.',
        hint: 'Three of these are the costs of big tests. One goes too far.'
      },
      {
        type: 'pick', q: 'All 40 unit tests pass. They use <code>FakePrinter</code>. In the real shop, nothing prints, because the new printer calls its job <code>print_text</code> and not <code>print_line</code>. Which test would have caught it?',
        options: [
          'One more unit test that uses FakePrinter',
          'A test that plugs in the real printer part',
          'A test that checks TAX_RATE is 0.09',
          'No test can catch this'
        ],
        answer: 1,
        why: 'A fake only proves that your code works with the fake. Whether the real parts fit together is what the middle and the top of the pyramid are for. That is why you keep a few of them.',
        hint: 'The fake and the real printer disagree. Which kind of test ever meets the real one?'
      },
      {
        type: 'pick', q: 'Back to lesson 44, Layers and the dependency rule. Why does keeping the shop\'s rules in the centre make the bottom of the pyramid wide?',
        options: [
          'Rules that mention no screen and no database can be tested alone, in milliseconds',
          'The centre runs on a faster computer',
          'Code in the centre never has bugs',
          'End-to-end tests are not allowed to touch the centre'
        ],
        answer: 0,
        why: 'Nothing in the centre knows the outside exists. So <code>final_total(100)</code> can be checked on any computer, with nothing else running. Good structure is what makes cheap tests possible.',
        hint: 'What does a centre file need in order to run? Read its imports.'
      }
    ]
  });
})();
