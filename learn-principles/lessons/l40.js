/* Lesson 40: Design by contract (module 4). One file per lesson. */
(function () {
  const { P, code, term, svg, box, T, arrow, esc } = PR;

  /* =====================================================================
     l40  Design by contract
     ===================================================================== */

  // code() colours a string only when both of its quote marks sit on one line.
  // A docstring runs over several lines, so paint those whole lines as text.
  const codeDoc = (lines, o, docLines) => code(lines, o).replace(
    /<div class="cl([^"]*)"><i>(\d+)<\/i><span>[\s\S]*?<\/span><\/div>/g,
    (all, cls, n) => docLines.includes(+n) ? `<div class="cl${cls}"><i>${n}</i><span><span class="st">${esc(lines[n - 1])}</span></span></div>` : all);

  /* ---- The idea: a delivery agreement ---- */
  const ideaPic = svg(600, 318, 'A delivery agreement with two sides. You promise to leave the parcel at reception before 5 pm. The courier promises to deliver it by noon tomorrow. A ribbon says what is always true: the parcel stays sealed. If something goes wrong, the agreement shows whose side failed.',
    box(40, 14, 520, 178, P.white, 16) +
    T(300, 42, 'DELIVERY AGREEMENT', { s: 13, f: P.ink2 }) +
    `<line x1="300" y1="56" x2="300" y2="140" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    T(170, 72, 'YOU PROMISE', { s: 12.5, f: P.accent }) +
    T(170, 98, 'Parcel at reception', { s: 14 }) + T(170, 118, 'before 5 pm', { s: 14 }) +
    T(430, 72, 'WE PROMISE', { s: 12.5, f: P.ok }) +
    T(430, 98, 'Delivered by noon', { s: 14 }) + T(430, 118, 'tomorrow', { s: 14 }) +
    `<rect x="40" y="148" width="520" height="44" rx="0" fill="${P.warnT}" stroke="${P.ink}" stroke-width="2.5"/>` +
    T(300, 176, 'ALWAYS TRUE: the parcel stays sealed', { s: 13, f: P.warn }) +
    T(300, 226, 'It arrives late. Who failed?', { s: 14 }) +
    box(40, 242, 250, 56, P.tint, 12) + T(165, 265, 'You handed it in at 6 pm', { s: 12.5 }) + T(165, 285, 'your side broke the deal', { s: 12.5, w: 700, f: P.accent }) +
    box(310, 242, 250, 56, P.okT, 12) + T(435, 265, 'In at 4 pm, arrived at 3 pm', { s: 12.5 }) + T(435, 285, 'their side broke the deal', { s: 12.5, w: 700, f: P.ok }));

  /* ---- The code: two files, one unwritten deal ---- */
  const pricesOld = [
    'def box_price(count):',
    '    cents_each = 300 - count',
    '    return count * cents_each / 100'
  ];
  const partyCode = [
    'from prices import box_price',
    '',
    'def show_quote(count):',
    '    price = box_price(count)',
    '    display_quote(count, price)'
  ];
  const codePic = `<div style="width:100%">${code(pricesOld, { title: 'prices.py, written by Maya', hi: [2] })}${code(partyCode, { title: 'party.py, written by Sam', hi: [4] })}</div>`;

  /* ---- The pain: 250 cookies for the price of 50 ---- */
  const priceRow = (y, count, each, total, bad) =>
    box(30, y, 540, 38, bad ? P.dangerT : P.white, 10) +
    T(48, y + 25, count, { s: 13.5, a: 'start', m: true, f: bad ? P.danger : P.ink }) +
    T(300, y + 25, each, { s: 12.5, w: 700, f: P.ink2 }) +
    T(552, y + 25, total, { s: 15, a: 'end', m: true, f: bad ? P.danger : P.ink });
  const painPic = svg(600, 330, 'A box of 50 costs 125 dollars and a box of 100 costs 200 dollars. A call with 250 also gives 125 dollars. Sam says the function gave a wrong answer. Maya says he was never meant to send 250. Nothing says whose bug it is.',
    T(48, 22, 'CALL', { s: 12, a: 'start', f: P.ink2 }) + T(300, 22, 'EACH COOKIE', { s: 12, f: P.ink2 }) + T(552, 22, 'PRICE', { s: 12, a: 'end', f: P.ink2 }) +
    priceRow(32, 'box_price(50)', '250 cents', '$125.00') +
    priceRow(78, 'box_price(100)', '200 cents', '$200.00') +
    priceRow(124, 'box_price(250)', '50 cents', '$125.00', true) +
    T(300, 186, '250 cookies for the price of 50. Nothing crashed.', { s: 13.5, f: P.danger }) +
    box(30, 206, 220, 70, P.okT, 14) + T(140, 232, 'Sam', { s: 13, f: P.ok }) + T(140, 252, '"Your function gave', { s: 12.5, w: 700 }) + T(140, 268, 'a wrong answer."', { s: 12.5, w: 700 }) +
    `<circle cx="300" cy="241" r="26" fill="${P.warnT}" stroke="${P.ink}" stroke-width="2.5"/>` + T(300, 252, '?', { s: 30, f: P.warn }) +
    box(350, 206, 220, 70, P.tint, 14) + T(460, 232, 'Maya', { s: 13, f: P.accent }) + T(460, 252, '"You were never meant', { s: 12.5, w: 700 }) + T(460, 268, 'to send 250."', { s: 12.5, w: 700 }) +
    T(300, 314, 'The deal was only in one head. Whose bug is it?', { s: 13, w: 700, f: P.ink2 }));

  /* ---- The fix: the contract, and the checks that back it ---- */
  const contractCode = [
    'def box_price(count):',
    '    """Caller promises: count is 1 to 100.',
    '    I promise: a price in dollars, above 0.',
    '    Bigger order? Call party_quote."""',
    '    assert 1 <= count <= 100, (',
    '        "box_price needs 1 to 100, got " + str(count))',
    '    cents_each = 300 - count',
    '    price = count * cents_each / 100',
    '    assert price > 0, "box_price made a bad price"',
    '    return price'
  ];
  const fixPic = `<div style="width:100%">${codeDoc(contractCode, { title: 'prices.py, with its contract', good: [2, 3, 4], hi: [5, 6, 9] }, [2, 3, 4])}${term([
    '$ show_quote(250)',
    '  File "party.py", line 4, in show_quote',
    '    price = box_price(count)',
    '  File "prices.py", line 5, in box_price',
    'AssertionError: box_price needs 1 to 100, got 250'
  ], "Sam's test run, the moment he tries the wedding order")}</div>`;

  /* ---- The test: whose bug, and a promise that is always true ---- */
  const bugRow = (y, tag, what, who, fill, col) =>
    box(20, y, 150, 50, fill, 12) + T(95, y + 30, tag, { s: 12.5, f: col }) +
    T(186, y + 22, what, { s: 12.5, a: 'start' }) + T(186, y + 40, who, { s: 12.5, w: 700, a: 'start', f: col });
  const whosePic = svg(600, 216, 'Three kinds of promise and whose bug it is when each one breaks. A broken caller promise is the caller\'s bug. A broken code promise is the code\'s bug. A broken always-true promise is the bug of the class that owns the data.',
    T(20, 22, 'WHICH PROMISE BROKE?', { s: 12.5, a: 'start', f: P.ink2 }) + T(186, 22, 'THEN THE BUG IS HERE', { s: 12.5, a: 'start', f: P.ink2 }) +
    bugRow(34, 'CALLER PROMISES', 'box_price(250): the count was not 1 to 100', "the caller's bug: fix party.py", P.tint, P.accent) +
    bugRow(94, 'CODE PROMISES', 'a box of 100 comes back as $0.00', "the code's bug: fix prices.py", P.okT, P.ok) +
    bugRow(154, 'ALWAYS TRUE', 'a card shows -12 points', "the class's bug: check its doors", P.warnT, P.warn));
  const cardCode = [
    'class LoyaltyCard:',
    '    """Always true: points are never below zero."""',
    '    _points = 0',
    '',
    '    def earn(self, amount):',
    '        if amount > 0:',
    '            self._points = self._points + amount',
    '',
    '    def spend(self, amount):',
    '        if amount > self._points:',
    '            return False',
    '        self._points = self._points - amount',
    '        return True'
  ];
  const testPic = `<div style="width:100%">${whosePic}${code(cardCode, { title: 'card.py, from lesson 19, with its promise written down', good: [2], hi: [6, 10] })}</div>`;

  /* ---- When not to ---- */
  const wallPic = svg(600, 232, 'Outside the program, a customer types a count. Lesson 39\'s gate checks it and answers kindly. Inside the wall, trusted code calls trusted code, and contracts with assert catch programmer mistakes.',
    T(96, 24, 'OUTSIDE', { s: 12.5, f: P.danger }) + T(250, 24, 'THE BORDER', { s: 12.5, f: P.warn }) + T(456, 24, 'INSIDE THE WALL', { s: 12.5, f: P.ok }) +
    box(20, 40, 152, 84, P.dangerT, 14) + T(96, 68, 'a customer types', { s: 12.5, w: 700, f: P.ink2 }) + T(96, 94, '"250"  "lots"  ""', { s: 12.5, m: true, f: P.danger }) +
    arrow(178, 82, 200, 82, P.ink, 3) +
    box(206, 40, 88, 84, P.warnT, 14) + T(250, 76, 'gate', { s: 15, f: P.warn }) + T(250, 98, 'lesson 39', { s: 11.5, w: 700, f: P.ink2 }) +
    arrow(300, 82, 322, 82, P.ink, 3) +
    `<rect x="328" y="36" width="256" height="92" rx="16" fill="none" stroke="${P.ink}" stroke-width="2.5" stroke-dasharray="7 7"/>` +
    box(340, 50, 100, 62, P.white, 12) + T(390, 78, 'party.py', { s: 12, m: true }) + T(390, 98, 'the caller', { s: 11.5, w: 700, f: P.ink2 }) +
    arrow(444, 81, 468, 81, P.ok, 3) +
    box(472, 50, 100, 62, P.okT, 12) + T(522, 78, 'prices.py', { s: 12, m: true }) + T(522, 98, 'the code', { s: 11.5, w: 700, f: P.ink2 }) +
    T(96, 152, 'People make slips.', { s: 12.5 }) + T(96, 170, 'That is a normal day.', { s: 12.5, w: 700, f: P.ink2 }) +
    T(250, 152, 'Checks every time.', { s: 12.5 }) + T(250, 170, 'Kind reply.', { s: 12.5, w: 700, f: P.ink2 }) +
    T(456, 152, 'Contracts and assert.', { s: 12.5 }) + T(456, 170, 'A broken one is a bug in the code.', { s: 12.5, w: 700, f: P.ink2 }) +
    T(300, 214, 'An assert is for the inside. It is never the gate.', { s: 13.5 }));
  const overCode = [
    'def cookie_label(name):',
    '    """Caller promises: name is text.',
    '    I promise: text that starts with "Cookie: ".',
    '    I promise: the text ends with the name.',
    '    Always true: nothing else is changed."""',
    '    assert len(name) >= 0, "name has a length"',
    '    return "Cookie: " + name'
  ];
  const limitPic = `<div style="width:100%">${wallPic}${codeDoc(overCode, { title: 'labels.py, a legal document for one line of work', bad: [2, 3, 4, 5, 6] }, [2, 3, 4, 5])}</div>`;

  COURSE.add({
    id: 'l40', minutes: 10,
    summary: 'Treat every function as a small <b>deal</b> between two sides: the caller and the code. Write down what the code <b>needs</b> from its caller, what it <b>promises back</b>, and what is <b>always true</b>. Then when something breaks, the deal tells you whose bug it is. That is design by contract.',
    video: {
      src: 'videos/l40-design-by-contract.mp4', poster: 'videos/l40-design-by-contract.jpg', length: '1 min 7 s',
      script: [
        "Maya wrote a small job called box_price. It prices a box of cookies. Sam's party screen calls it.",
        'Maya knows a box holds 1 to 100 cookies. But that rule lives only in her head.',
        'Then a wedding asks for 250. Back comes 125 dollars. The price of a box of 50.',
        'Sam says, your function is wrong. Maya says, you were never meant to send that. So whose bug is it? Nobody can say.',
        'So they write the deal down. The caller promises: a count from 1 to 100. The code promises: a price above 0. And a check, called an assert, guards each promise.',
        "Play it again. 250 goes in. It stops at once. The message says whose side broke the deal. The caller's. The wrong price never appears.",
        'That is design by contract. Write down what the code needs, and what it promises back.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Write the deal down.',
        text: [
          'You send a parcel. The agreement says: <b>you</b> leave it at reception before 5 pm, and <b>we</b> deliver it by noon tomorrow. If it arrives late, nobody has to argue. The agreement shows whose side failed.',
          'Every function is a small deal like that, between two sides. The <b>caller</b> is the code that calls the function. The <b>code</b> is the function itself. <b>Design by contract</b> says: write the deal down, in three parts.',
          'A <b>precondition</b> is what must be true <b>before</b> the call. It is the caller\'s promise. A <b>postcondition</b> is what will be true <b>after</b> the call, if the caller kept its side. It is the code\'s promise. An <b>invariant</b> is something that is <b>always</b> true about a thing, before and after every call.',
          'Lesson 39, Defensive programming, checked everything from outside once, at the border, and said the code inside may then trust its own data. Written promises are what make that trust safe.'
        ],
        tip: 'The idea and the name come from <b>Bertrand Meyer</b>, who built contracts into his programming language, Eiffel, in the 1980s. You have met two of his other ideas already: lesson 20, Command-query separation, and lesson 29, Open/closed.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'A deal that lives in one head.',
        text: [
          'Maya sells cookies by the box, and <code>box_price</code> works out what a box costs. A cookie is $3, which is <b>300 cents</b>. Every cookie in the box takes 1 cent off each cookie. That is line 2.',
          'Line 3 multiplies and then turns cents into dollars. <code>/</code> means "divided by". A box of 12 is 12 times 288 cents, so <b>$34.56</b>. A box of 100 is 100 times 200 cents, so <b>$200</b>.',
          'Sam, the helper, builds a screen for party orders in his own file. Line 1 fetches Maya\'s job, as in lesson 7. Line 4 calls it. Sam is the <b>caller</b>.',
          'Maya knows something that is nowhere in her three lines: <b>a box holds 1 to 100 cookies</b>. The sum was only ever meant for those counts. Sam knows something else: he expects a sensible price back, whatever he sends. Two halves of a deal, each in a different head.'
        ]
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Both are right. Nobody can win.',
        text: [
          'A wedding wants <b>250 cookies</b>. Sam\'s screen calls <code>box_price(250)</code>. Line 2 gives 300 - 250 = 50 cents each. The quote says <b>$125.00</b>. That is exactly the price of a box of 50. Nothing crashed, and the customer is delighted.',
          'Sam says: "Your function gave a wrong answer." Maya says: "You were never meant to call it with 250." <b>Both are right.</b> The deal was never written down, so nobody broke it, and everybody did.',
          'Then both sides stop trusting each other. Sam adds his own check before every call. Maya adds her own checks inside. The limit of 100 is now written in two files, which lesson 6, DRY, warned about. And the next odd price starts the same argument.'
        ],
        warn: 'It gets quieter still. A draft order with no cookies calls <code>box_price(0)</code> and gets $0.00. Was 0 allowed? Nothing says.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'A contract, and two checks that back it.',
        text: [
          'Two new pieces of Python. Text in triple quotes right under <code>def</code> is a <b>docstring</b>. Python does not run it. It is the place where a function\'s deal is written <b>for people</b>. Lines 2 to 4 say what the caller promises, what the code promises, and where bigger orders should go.',
          '<code>assert</code> checks a promise. <code>assert condition, "message"</code> means: this <b>must</b> be true here. If it is not, stop with an <code>AssertionError</code> and show the message. On line 5, <code>1 &lt;= count &lt;= 100</code> reads like maths: the count is between 1 and 100. The brackets let the message carry on to line 6, and <code>str(count)</code> turns the number into text, as in lesson 22.',
          'Line 5 checks the <b>caller\'s promise</b>, before any work is done. Line 9 checks the <b>code\'s promise</b>, just before the answer goes out.',
          'Now Sam tries the wedding order in a test run. The call stops at once, on line 5, and the last line of the message says exactly which side broke the deal: <b>the caller</b>. No wrong price ever appears. Sam reads line 4 of the docstring and calls <code>party_quote</code> for big orders.',
          'It works the other way too. Next month Maya changes line 7 to take <b>3 cents</b> off per cookie. For a box of 100, each cookie now costs 300 - 300 = 0 cents. The caller kept its promise, because 100 is allowed. So line 9 stops the job: <code>box_price made a bad price</code>. This time the bug is <b>Maya\'s</b>, and she finds it in her own test run.'
        ],
        tip: 'The top check is lesson 22, Fail fast, with a name on it. It stops at the first wrong value, and it also says <b>who</b> sent it.',
        warn: 'Be honest about <code>assert</code>. It is a tool for catching <b>programmer mistakes</b> while building and testing. Python can be run in a mode that skips every assert: <code>python -O</code>. So an assert must never be the only thing that guards real input from outside, and it must never decide who is allowed to do something. Outside input goes through lesson 39\'s gate.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Is the deal written down?',
        text: [
          'Point at a function that other code relies on and ask: <b>"Is it written down what this code needs from its caller, and what it promises back?"</b>',
          'Try the old <code>box_price</code>. Nothing is written. No. Try the new one. Lines 2 and 3 say both. Yes. And when it breaks, the first picture tells you where to look.',
          'The third kind of promise belongs to a class. In lesson 19, Encapsulation, the shop had a rule: <b>points are never below zero</b>. That is an <b>invariant</b>. Line 2 writes it down in the class\'s own docstring.',
          'A class can only promise "always" because of its <b>doors</b>. <code>_points</code> is changed in two places, <code>earn</code> and <code>spend</code>. Line 6 lets only amounts above zero in. Line 10 refuses to take more than the card holds. If every door leaves the promise true, it is true after every call. With the open shelf from lesson 19, any line anywhere could write -12, and nobody could promise anything.'
        ],
        tip: 'Lesson 30, Liskov substitution, said a stand-in must keep the promises, and that promises have to be written down to be kept. Now there is an exact rule. A stand-in may <b>ask for less</b> and <b>promise more</b>. Never the other way round. Every payment promised: <code>pay</code> takes any amount, answers True or False, and takes exactly that amount. A stand-in that only takes amounts under $50 asks for <b>more</b> from the caller. One that sometimes takes the wrong amount promises <b>less</b>. Both break callers that trusted the deal. One that also prints a slip promises more, and that is fine.'
      },
      {
        label: 'When not to', pic: limitPic,
        h: 'A contract, not a legal department.',
        text: [
          '<b>A tiny, obvious helper does not need one.</b> Look at the code under the picture. Suppose Maya loves this lesson and gives a one-line job four lines of promises and a check that can never fail. The name <code>cookie_label(name)</code> already said all of it. Lesson 12, Meaningful names, called a name the cheapest documentation there is, and lesson 4 asked what each extra line costs the next reader.',
          '<b>A contract is for insiders. It is not the gate.</b> A customer who types 250 on the website has not broken a deal. She is having a normal day. Her input goes through the gate from lesson 39, which checks every time and answers kindly. An assert there would show her a crash, or would be skipped entirely.',
          '<b>Do not assert things that happen on a normal day.</b> <code>assert printer_has_paper()</code> is wrong. An empty printer is not a programmer\'s mistake. Lesson 22, Fail fast, said to stay calm about those: handle them.',
          '<b>A contract nobody keeps is worse than none.</b> Suppose boxes grow to hold 200 and the docstring still says 100. Now the written deal is a lie, and lesson 11, Least astonishment, showed what happens when people trust a promise that is not true. Keep the words and the checks side by side, and change them together.'
        ],
        warn: 'How strict should code be with what it accepts, and with what it sends out? That is the next lesson, Robustness principle.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'A draft order has no cookies yet, so Sam\'s screen runs <code>box_price(0)</code>. What happens?',
        pic: codeDoc(contractCode, { title: 'prices.py' }, [2, 3, 4]),
        options: [
          'It hands back 0.0',
          'It stops on line 5 with: box_price needs 1 to 100, got 0',
          'It stops on line 9 with: box_price made a bad price',
          'It hands back 3.0'
        ],
        answer: 1,
        why: 'Line 5 runs before any work is done. 0 is not between 1 and 100, so the job stops there and names the caller\'s side. Line 9 is never reached.',
        hint: 'Which check comes first, and is 0 between 1 and 100?'
      },
      {
        type: 'bucket', q: 'The contract says: the caller sends a count from 1 to 100, and the code hands back a price above 0. Whose bug is each of these?',
        buckets: ["The caller's bug", "The code's bug"],
        items: [
          ['box_price(250) is called', 0],
          ['box_price(-3) is called', 0],
          ['box_price(40) hands back -5.0', 1],
          ['box_price(100) hands back 0.0', 1],
          ['box_price(12) hands back the text "cheap"', 1]
        ],
        why: 'If the count was outside 1 to 100, the caller broke its promise. If the count was fine and the answer is not a price above 0, the code broke its promise.',
        hint: 'First ask: was the count between 1 and 100? If yes, the caller kept its side.'
      },
      {
        type: 'fill', q: 'Rebuild the two checks that back the contract.',
        text: 'def box_price(count):\n    ___ 1 <= count <= 100, "needs 1 to 100"\n    price = count * (300 - count) / 100\n    assert price ___ 0, "made a bad price"\n    return price',
        options: ['assert', '>', 'raise', '<', 'return'],
        answer: ['assert', '>'],
        why: '<code>assert</code> says "this must be true here". The first one checks the caller\'s promise. The second checks the code\'s promise: a price above 0.',
        hint: 'The first blank is the new Python word from this lesson. The second is "more than".'
      },
      {
        type: 'match', q: 'Match each word to what it means.',
        pairs: [
          ['Precondition', 'Must be true before the call: the caller\'s promise'],
          ['Postcondition', 'Will be true after the call: the code\'s promise'],
          ['Invariant', 'Always true, before and after every call'],
          ['Docstring', 'Text in triple quotes under def, written for people'],
          ['assert', 'Stops the program if a promise is not true']
        ],
        why: 'Before, after, always. The docstring is where the three are written down. The assert is how a promise gets checked.',
        hint: '"Pre" means before. "Post" means after.'
      },
      {
        type: 'pick', q: 'A customer types the number of cookies into the website, and it arrives here as <code>count</code>. Sam guards it like this. What is wrong?',
        pic: code([
          'def web_order(count):',
          '    assert 1 <= count <= 100, "bad count"',
          '    return box_price(count)'
        ], { title: 'website.py', bad: [2] }),
        options: [
          'Nothing. An assert is the right guard for anything',
          'An assert is for programmer mistakes. It can be switched off, and a customer\'s slip needs the gate from lesson 39 and a kind reply',
          'The message is too short',
          'assert only works on text'
        ],
        answer: 1,
        why: 'A customer typing 250 is a normal day, not a broken deal between two pieces of code. And <code>python -O</code> skips every assert, so this guard might not even run.',
        hint: 'Is the customer inside the wall or outside it?'
      },
      {
        type: 'bucket', q: 'Maya writes <code>sale_box_price</code> to stand in for <code>box_price</code> on sale days. The original needs a count from 1 to 100 and promises a price above 0. Which changes are safe?',
        buckets: ['Fine for a stand-in', 'Breaks the deal'],
        items: [
          ['Accepts counts from 1 to 200', 0],
          ['Promises a price above 0 and never above $200', 0],
          ['Only accepts counts from 1 to 50', 1],
          ['May hand back a price of 0', 1]
        ],
        why: 'A stand-in may ask for less and promise more. Asking for more breaks callers that send 80. Promising less breaks callers that relied on a price above 0. That is lesson 30, Liskov substitution, made exact.',
        hint: 'A caller written for the original sends any count from 1 to 100 and expects a price above 0. Does it still work?'
      },
      {
        type: 'pick', q: 'Back to lesson 19, Encapsulation. The card promises: points are never below zero. Which line can break that promise?',
        pic: code([
          'class LoyaltyCard:',
          '    """Always true: points are never below zero."""',
          '    _points = 0',
          '',
          '    def spend(self, amount):',
          '        if amount > self._points:',
          '            return False',
          '        self._points = self._points - amount',
          '        return True',
          '',
          'def refund(card, price):',
          '    card._points = card._points - price'
        ], { title: 'card.py and a job from outside' }),
        options: ['Line 6', 'Line 8', 'Line 12', 'None of them'],
        answer: 2,
        why: 'Line 12 reaches past the doors and writes to <code>_points</code> itself. A class can only promise "always" if every change goes through a door that keeps the promise. Line 8 is safe because line 6 checked first.',
        hint: 'Which line changes the points without going through a door?'
      },
      {
        type: 'order', q: 'Put the story in order.',
        items: [
          'Maya knows a box holds 1 to 100, but writes it nowhere',
          'Sam\'s screen calls box_price(250)',
          'The quote says $125, the price of a box of 50',
          'Sam and Maya each blame the other side',
          'The deal is written in a docstring and backed by two asserts',
          'The same call stops at once and names the caller\'s side'
        ],
        why: 'The argument was set up on day one, when the deal stayed in one head. Writing it down turns "whose fault?" into a question with an answer.',
        hint: 'It starts with something Maya did not write down.'
      }
    ]
  });
})();
