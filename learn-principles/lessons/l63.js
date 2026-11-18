/* Lesson 63: Final exam (module 6). Quiz only, no video. One file per lesson. */
(function () {
  const { P, code, svg, box, T } = PR;

  /* =====================================================================
     l63  Final exam
     One messy program, shop_v1.py, seen through every lesson of the course.
     The program was run with python3 and a tiny driver (stub web_toolkit,
     clock and customers modules). Every number in the quiz comes from that run.
     The answer key of planted problems is at the bottom of this file.
     ===================================================================== */

  const shop = [
    'import os',
    'import web_toolkit',
    'from clock import today',
    'from customers import find',
    '',
    'KEY = "LIVE-KEY-maya-shop-0001"',
    'DB = "localhost:5432/shop"',
    'MAIL_KEY = os.environ["MAIL_KEY"]',
    'PRICES = {"oat": 2, "lemon": 3, "gift_box": 5}',
    'carts = {}',
    '',
    'def add(c, n, q):',
    '    if c in carts:',
    '        if n in PRICES:',
    '            if q > 0:',
    '                carts[c].append((n, q))',
    '',
    'def get_total(c):',
    '    find(c).add_points(1)',
    '    t = 0',
    '    for x in carts[c]:',
    '        t = t + PRICES[x[0]] * x[1]',
    '    return t * (1 - 0.1 * (today()[1] == "u")) * 1.09',
    '',
    'def cart_page(c):',
    '    show_offer(carts[c])',
    '    web_toolkit.show("Total: $" + str(get_total(c)))',
    '',
    'def show_offer(items):',
    '    items.append(("gift_box", 1))',
    '    web_toolkit.show("With a gift box you would have " + str(len(items)) + " things")',
    '',
    'def checkout(c, kind, form):',
    '    total = get_total(c) + int(form["tip"])',
    '    if kind == "card":',
    '        find(c).wallet.card.charge(KEY, total)',
    '    elif kind == "gift":',
    '        find(c).wallet.gift_card.spend(total)',
    '    print("BAKE", carts[c])',
    '    web_toolkit.show("Thanks! Tax was $" + str(total - total / 1.09))',
    '',
    'def refund(c, amount):',
    '    # TODO: check the bank\'s fees first (Sam, March 2023)',
    '    # find(c).wallet.card.refund(KEY, amount)',
    '    return amount * 1.09'
  ];

  // A slice of shop_v1.py that keeps the real line numbers. from and to are real line numbers.
  // o.hi / o.bad / o.good are real line numbers too.
  const lines = (from, to, o) => {
    o = o || {};
    const off = from - 1, shift = a => (a || []).map(n => n - off);
    const html = code(shop.slice(from - 1, to), { title: o.title || 'shop_v1.py, lines ' + from + ' to ' + to, hi: shift(o.hi), bad: shift(o.bad), good: shift(o.good) });
    return html.replace(/<i>(\d+)<\/i>/g, (m, n) => '<i>' + (+n + off) + '</i>');
  };
  // Two separate slices in one picture.
  const two = (a, b) => `<div style="width:100%">${a}${b}</div>`;

  /* ---------- Part 1: the course on one page ---------- */
  const mods = [
    [0, 'Start here', '1 to 4', 'easy to change, cohesion, coupling, trade-offs', P.white],
    [1, 'Keep it simple', '5 to 14', 'KISS, DRY, one source of truth, YAGNI, names', P.tint],
    [2, 'Shape one piece of code', '15 to 24', 'one job, small functions, guard clauses, fail fast', P.tint],
    [3, 'Connect the pieces', '25 to 35', 'Demeter, SOLID, interfaces, injection', P.tint],
    [4, 'Code that survives', '36 to 43', 'immutable, safe to retry, checked input, stateless', P.tint],
    [5, 'Bigger structure', '44 to 52', 'layers, settings, tests, debt, broken windows', P.tint],
    [6, 'Teams and projects', '53 to 63', 'the people and the plan around the code', P.warnT]
  ];
  const overviewPic = svg(600, 470, 'The seven modules of the course with their lesson numbers. Module 0, Start here, lessons 1 to 4. Module 1, Keep it simple, lessons 5 to 14. Module 2, Shape one piece of code, lessons 15 to 24. Module 3, Connect the pieces, lessons 25 to 35. Module 4, Code that survives, lessons 36 to 43. Module 5, Bigger structure, lessons 44 to 52. Module 6, Laws about teams and projects, lessons 53 to 63. All of them point at one file, shop_v1.py.',
    T(300, 24, 'THE WHOLE COURSE, ONE FILE', { s: 12.5 }) +
    mods.map((m, i) => {
      const y = 38 + i * 54;
      return `<circle cx="26" cy="${y + 22}" r="14" fill="${P.ink}"/>` + T(26, y + 27, m[0], { s: 13, f: P.white }) +
        box(50, y, 370, 44, m[4], 10) +
        T(64, y + 19, m[1], { s: 13, a: 'start' }) + T(406, y + 19, 'lessons ' + m[2], { s: 12, a: 'end', f: P.accent }) +
        T(64, y + 36, m[3], { s: 11.5, w: 700, a: 'start', f: P.ink2 }) +
        `<line x1="424" y1="${y + 22}" x2="452" y2="${y + 22}" stroke="${P.ink}" stroke-width="2.5" stroke-linecap="round"/>`;
    }).join('') +
    `<line x1="452" y1="60" x2="452" y2="384" stroke="${P.ink}" stroke-width="2.5" stroke-linecap="round"/>` +
    `<line x1="452" y1="222" x2="474" y2="222" stroke="${P.ink}" stroke-width="3" stroke-linecap="round"/>` +
    `<path d="M486 222 L472 214 L472 230z" fill="${P.ink}"/>` +
    box(490, 176, 98, 92, '#15132B', 12) +
    T(539, 210, 'shop_v1', { s: 13, m: true, f: P.white }) + T(539, 230, '.py', { s: 13, m: true, f: P.white }) +
    T(539, 254, '45 lines', { s: 11.5, w: 700, f: '#C9C5E8' }) +
    T(300, 434, 'Modules 0 to 5 are about the code.', { s: 13, w: 700, f: P.ink2 }) +
    T(300, 456, 'Module 6 is about the people around it.', { s: 13, w: 700, f: P.ink2 }));

  /* ---------- Part 3: the master's reading order ---------- */
  const steps = [
    ['What is this for?', 'Say it in one plain sentence before you judge a line.'],
    ['Where does outside data enter?', 'Forms, settings, the clock, other programs. Is it checked there?'],
    ['What changes state?', 'Every line that changes a list, a dict, money or a file.'],
    ['What is copied?', 'The same fact or number in two places will drift apart.'],
    ['Who would ask for changes?', 'One job per person who might ask. Where do they meet?']
  ];
  const checklistPic = svg(600, 360, 'A checklist of five questions, in the order a master reads unfamiliar code. One: what is this for. Two: where does outside data enter. Three: what changes state. Four: what is copied. Five: who would ask for changes.',
    T(300, 24, 'FIVE QUESTIONS, IN THIS ORDER', { s: 12.5 }) +
    steps.map((s, i) => {
      const y = 40 + i * 60;
      return box(20, y, 560, 48, i % 2 ? P.paper2 : P.white, 10) +
        `<rect x="36" y="${y + 13}" width="22" height="22" rx="5" fill="${P.okT}" stroke="${P.ink}" stroke-width="2.5"/>` +
        `<path d="M41 ${y + 24} L46 ${y + 30} L54 ${y + 18}" fill="none" stroke="${P.ok}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>` +
        T(72, y + 21, (i + 1) + '. ' + s[0], { s: 13.5, a: 'start' }) +
        T(72, y + 39, s[1], { s: 12, w: 700, a: 'start', f: P.ink2 });
    }).join('') +
    T(300, 348, 'Big picture first. Single lines last.', { s: 13, w: 700, f: P.ink2 }));

  COURSE.add({
    id: 'l63', minutes: 30,
    summary: 'You made it to the end of the course, and that is a real achievement. Mastery now looks like this: you open a messy file like <code>shop_v1.py</code> and <b>see the principles at work in real code</b>, you know which problems matter most, and you know <b>when to leave a line alone</b>.',
    parts: [
      {
        label: 'How the exam works', pic: overviewPic,
        h: 'One program, seen through every lesson.',
        text: [
          'In each review so far, every question had its own little program. This time there is <b>one program</b>. It is <code>shop_v1.py</code>, the very first version of Maya\'s online shop, written in a hurry by Maya and Sam two years ago. It still runs. Customers still use it.',
          'Every question looks at this one file through a different lesson. Some ask which principle a line breaks. Some ask what will go wrong when something real happens: a tax change, a double click, a second copy of the program. And some are about the <b>people and the project</b> around the file, from module 6.',
          'Real code always breaks <b>several principles at once</b>. One line can be too clever, hide an input and repeat a number, all at the same time. That is normal. A master does not panic about it. A master sees it, and then decides what matters most.',
          'There is <b>no time limit</b>. The questions show the lines they are about, with the real line numbers, so you do not need to scroll back. Take your time and read each line as if you had to change it tomorrow.'
        ],
        tip: 'Two questions show lines that are <b>fine</b>. Leaving good code alone is part of mastery. That was lesson 4, Trade-offs, not laws.'
      },
      {
        label: 'The program', pic: code(shop, { title: 'shop_v1.py' }),
        h: 'Meet shop_v1.py.',
        text: [
          'Read it once from top to bottom, slowly. Do not hunt for problems yet. Just learn what it does.',
          'Lines 1 to 4 fetch helpers from other files. <code>web_toolkit.show</code> puts words on the customer\'s web page, as in lesson 44. <code>today()</code> asks the computer\'s clock for the name of the day, such as <code>"Tuesday"</code>, as in lesson 23. <code>find(c)</code> looks up a customer from <code>customers.py</code>.',
          'Lines 6 to 10 set things up: a payment key, a database address, a mail key, the prices, and the carts. Another file puts an empty cart in <code>carts</code> when a customer logs in.',
          '<code>add</code> puts cookies in a cart. Each cart entry is a pair, such as <code>("lemon", 2)</code>, so <code>x[0]</code> is the name and <code>x[1]</code> is how many. <code>get_total</code> adds up the cart, gives 10% off on Tuesdays, and adds 9% tax. Line 23 uses the trick from lesson 5: Python counts <code>True</code> as 1 and <code>False</code> as 0.',
          '<code>cart_page</code> shows the cart, and offers a gift box. <code>checkout</code> takes the tip from the form, charges the customer, tells the kitchen to bake, and says thank you. <code>refund</code> works out what to give back.'
        ],
        warn: 'This file works. It has taken real money for two years. That is exactly why it is worth reading carefully: the bugs in working code are the ones nobody has noticed yet.'
      },
      {
        label: 'Read it like a master', pic: checklistPic,
        h: 'Big picture first, single lines last.',
        text: [
          'A beginner reads unfamiliar code from line 1 and stops at the first odd thing. A master reads it in a different order. Five questions, from the big picture down.',
          '<b>1. What is this for?</b> Say it in one sentence. "A cart and a checkout for a cookie shop." Now you know which lines matter most: the ones that move money.',
          '<b>2. Where does outside data enter?</b> Anything from a form, a setting, the clock or another program can be wrong. Find each door, and ask if it is checked right there. Lessons 23, 39 and 48.',
          '<b>3. What changes state?</b> Find every line that changes a list, a dictionary or someone\'s money. Ask: what if this runs twice, or on two machines, or from a helper you did not expect? Lessons 20, 36, 37 and 42.',
          '<b>4. What is copied?</b> The same number or fact in two places. When one copy changes, will the other? Lessons 6 and 7.',
          '<b>5. Who would ask for changes?</b> Name the people. Where several of them meet in one function, the next change for one of them can break the others. Lessons 15 and 16.'
        ],
        tip: 'Only after these five do you look at names, nesting and style. They matter too, but a well-named function that charges a card twice is still a bug.'
      }
    ],
    quiz: [
      {
        type: 'type', q: 'Warm up. The city raises the sales tax from 9% to 10%. How many lines of <code>shop_v1.py</code> must change? Type the number.',
        pic: code(shop, { title: 'shop_v1.py' }),
        prompt: 'lines >',
        answers: ['3', 'three', '3 lines'],
        why: 'The tax is written as <code>1.09</code> on line 23, line 40 and line 45. All three must become <code>1.10</code>, and whoever forgets one gets a receipt or a refund that disagrees with the total. The <code>0.1</code> on line 23 is the Tuesday discount, not the tax. One fact, three homes: that breaks lesson 6, DRY, and lesson 7, Single source of truth. The fix is one name, such as <code>TAX_RATE = 0.09</code>, used in all three places.',
        hint: 'Look for 1.09 everywhere, including at the very bottom of the file.'
      },
      {
        type: 'pick', q: 'Saturdays are busy, so Maya starts a second copy of the program on a second machine. Requests go to whichever copy is free. Ana logged in on copy 1. Her next click lands on copy 2. What goes wrong?',
        pic: lines(6, 10, { hi: [10] }),
        options: [
          'The prices on line 9 differ between the two copies',
          'Both copies share line 10, so nothing goes wrong',
          'Her cart is missing. Line 10 keeps the carts in the memory of one running copy, and copy 2 has its own empty carts',
          'Copy 2 cannot start, because line 6 can only be used once'
        ],
        answer: 2,
        why: 'Each running copy has its own <code>carts</code>. Ana\'s cart lives inside copy 1. Copy 2 has never heard of her, so <code>add</code> silently does nothing and <code>get_total</code> stops with an error. A restart of copy 1 would empty every cart too. That is lesson 42, Statelessness: anything worth keeping lives in one shared store, never in the program\'s own memory. The prices are fine, because they are the same in every copy.',
        hint: 'Which of these lines remembers something that changes while the program runs?'
      },
      {
        type: 'fill', q: 'Line 12 says <code>def add(c, n, q):</code>. Give it names that explain themselves.',
        pic: lines(12, 16, { bad: [12] }),
        text: 'def ___(___, cookie, how_many):',
        options: ['add_to_cart', 'customer_id', 'do_it', 'c', 'data', 'process'],
        answer: ['add_to_cart', 'customer_id'],
        why: '<code>add</code> could add anything to anything. <code>add_to_cart</code> says what it does. <code>c</code> is passed to <code>find(c)</code> and used as the key of <code>carts</code>, so it is the customer\'s id. <code>do_it</code>, <code>data</code> and <code>process</code> are names that could fit any job at all. That is lesson 12, Meaningful names.',
        hint: 'What does the job add, and where? What is c used for on line 19 and line 36?'
      },
      {
        type: 'pick', q: 'It is Thursday. Sam must check that the Tuesday discount works before a big Tuesday sale. What stops him, and what is the best fix?',
        pic: lines(18, 23, { hi: [23] }),
        options: [
          'Nothing stops him. He can set the computer\'s clock to Tuesday and set it back afterwards',
          'Line 23 asks the clock in secret, so the answer depends on the real day. Give the job the day: get_total(c, day). The till passes today(), and Sam passes "Tuesday"',
          'Give 0.1 a name, TUESDAY_DISCOUNT. Then the test will work on any day',
          'Save the total once a day, so get_total does not have to ask the clock so often'
        ],
        answer: 1,
        why: 'The front of <code>get_total</code> says it needs a customer. It hides a second input: the day, read from the clock inside line 23. So the same call gives a different answer on a different day, and Sam can only test Tuesday on a Tuesday. That is lesson 23, Explicit over implicit. Hand the day in, and the clock is read in plain sight by the caller who really means "today".',
        hint: 'What does get_total read that is not between its brackets?',
        hints: {
          0: 'That works once, on one machine, and every other program on it gets the wrong day too. Can a test do that every time it runs?',
          2: 'A good name is nice, but the job still reads the clock. Would the test still depend on the real day?',
          3: 'That is about speed, and lesson 10 said measure first. Does it help Sam test Tuesday on a Thursday?'
        }
      },
      {
        type: 'pick', q: 'Every Sunday, the till gives 10% off. Nobody planned that. The code was tested on a Tuesday and a Wednesday, and both were right. What is going on?',
        pic: lines(23, 23, { bad: [23] }),
        options: [
          'The clock in the shop is wrong on Sundays',
          'PRICES on line 9 has a lower Sunday price',
          'Python counts True as 10 on Sundays',
          'Line 23 only checks the second letter of the day. "Sunday" has a u there, just like "Tuesday". Clever code hides its own bugs'
        ],
        answer: 3,
        why: '<code>today()[1]</code> is the second letter of the day. It is <b>u</b> in "Tuesday" and also in "Sunday". The line was written to be short and clever, and its bug hides in plain sight. That is lesson 5, KISS. Lesson 61, Kernighan\'s law, says debugging is twice as hard as writing. If you write a line as cleverly as you can, you are not clever enough to debug it. The plain version, <code>if day == "Tuesday":</code>, cannot have this bug.',
        hint: 'Write out "Tuesday" and "Sunday". What is the second letter of each?'
      },
      {
        type: 'pick', q: 'Ben had 0 points. On a Wednesday he opens the cart page 5 times, then pays once. How many points does he have now?',
        pic: two(lines(18, 19, { bad: [19] }), lines(25, 27, { hi: [27] })),
        options: ['1', '5', '6', '0'],
        answer: 2,
        why: '<code>get_total</code> sounds like a question. But line 19 also gives a point, every time it is asked. The cart page asks it on line 27, 5 times. Checkout asks it once more, on line 34. 5 + 1 = 6. Points now grow when people look, not when they buy. That is lesson 20, Command-query separation, and lesson 11, Least astonishment: a job named "get" should only answer. Give the point once, in checkout, after a real payment.',
        hint: 'Count every call to get_total: on the cart page, and inside checkout on line 34.'
      },
      {
        type: 'pick', q: 'A customer types <code>-20</code> into the tip box. What happens?',
        pic: lines(33, 36, { bad: [34] }),
        options: [
          'int("-20") stops the program with an error, so nothing is charged',
          'Her total goes down by $20, and line 36 charges the smaller amount. A small order can even go below zero',
          'Python ignores signs in numbers, so she tips $20',
          'Line 35 sees the minus and skips the card'
        ],
        answer: 1,
        why: '<code>int("-20")</code> is a perfectly good number to Python: minus twenty. Line 34 adds it to the total, and line 36 charges what is left. Two lemon cookies cost $6.54, so she would be "charged" minus $13.46. Anything from a form can be wrong, huge or sent to cause trouble. Check it once, at the border, where it comes in: a whole number, 0 or more, under a sensible limit. That is lesson 39, Defensive programming.',
        hint: 'Is -20 a number Python can read? Then what does line 34 do with it?'
      },
      {
        type: 'pick', q: 'A customer on a slow train taps <b>Pay</b>. Nothing seems to happen, so she taps again. <code>checkout</code> runs twice with the same cart. What happens?',
        pic: lines(33, 40, { hi: [36, 39] }),
        options: [
          'The second run finds an empty cart and charges $0',
          'Python notices the same call twice and skips the second one',
          'She is charged twice, the kitchen gets two BAKE tickets, and she gets 2 points',
          'She is charged once, but the kitchen bakes twice'
        ],
        answer: 2,
        why: 'Nothing in <code>checkout</code> empties the cart or remembers that this payment was done. So the second run does it all again: a second charge on line 36, a second BAKE ticket on line 39, and a second point from <code>get_total</code>. That is lesson 37, Idempotency. The fix: the Pay button sends a ticket number, and <code>checkout</code> keeps a list of tickets it has finished. The same ticket twice gets the same reply and no second charge.',
        hint: 'Does anything on these lines change the cart, or remember that this payment happened?'
      },
      {
        type: 'pick', q: 'Maya adds a new way to pay: by phone. The page sends <code>kind = "phone"</code>. A customer pays by phone. What happens, and what is the better shape?',
        pic: lines(33, 40, { hi: [35, 37] }),
        options: [
          'Python stops at line 35, because "phone" is not in the if, so nothing bad happens',
          'The phone payment falls into the gift card branch on line 38',
          'Nobody is charged and nothing is baked. Add an elif for phone and the problem is solved for good',
          'Nobody is charged, but the kitchen bakes and the customer is thanked. Give each way to pay its own part with a pay(amount) job, hand it to checkout, and add phone as a new part without editing checkout'
        ],
        answer: 3,
        why: 'Neither branch matches "phone", and there is no <code>else</code>, so Python just walks past them. Line 39 still says BAKE, and the page still says thanks. Free cookies. Each new way to pay means editing the same chain inside <code>checkout</code>, and forgetting it fails in silence. Lesson 28, Program to an interface, and lesson 29, Open/closed: <code>checkout</code> depends on "something that can pay", and a new way to pay is a new part, added without touching working code.',
        hint: 'Follow kind = "phone" through line 35 and line 37. Does Python stop, or carry on to line 39?',
        hints: {
          0: 'An if with no matching branch is not an error. Python simply goes to the next line. What is on line 39?',
          1: 'Line 37 asks for "gift" exactly. Is "phone" equal to "gift"?',
          2: 'Look at line 39 again: does it care which branch ran? And will the next new way to pay be forgotten the same way?'
        }
      },
      {
        type: 'pick', q: 'The customers team, who own <code>customers.py</code>, rename <code>wallet</code> to <code>purse</code> inside each customer. They never promised anyone that it was called wallet. Which lines of <code>shop_v1.py</code> break? Pick all that apply.',
        pic: two(lines(18, 19), lines(33, 38)),
        options: ['Line 19', 'Line 34', 'Line 36', 'Line 38'],
        answer: [2, 3],
        why: 'Lines 36 and 38 reach through the customer, into the wallet, into the card: <code>find(c).wallet.card.charge</code>. Every dot is one more fact about how someone else is built. That is lesson 25, Law of Demeter. Line 19 only talks to the customer it found, so it is safe. And lesson 55, Hyrum\'s law, explains why the customers team was surprised: whatever others can see, someone comes to depend on. A fix: tell the customer what you want, such as <code>customer.pay_by_card(total)</code>, and let it use its own wallet.',
        hint: 'Which lines say the word wallet?'
      },
      {
        type: 'pick', q: 'Sam says: "Line 8 is the odd one out. Lines 6 and 7 type their values straight in. Let us type the mail key into line 8 too, so the file is consistent." What is the best call?',
        pic: lines(6, 8, { hi: [8] }),
        options: [
          'Agree. Type the mail key into line 8, so all three lines look the same',
          'Leave line 8 alone. It is right: the key comes from the place the program runs, and a missing key stops the program at the start. If anything, line 6 should change to look like line 8',
          'Give line 8 a default key, so the shop starts even when nobody set one',
          'Move both keys into a settings file inside the code folder, so they are easy to find'
        ],
        answer: 1,
        why: 'Line 8 is <b>fine</b>. Reading a secret from the environment is lesson 48, Twelve-factor app. If <code>MAIL_KEY</code> is missing, the program stops at once with a clear error, which is lesson 22, Fail fast. Consistency is good, but not consistency with the mistake. Line 6 is the one that breaks the rule: a live payment key that anyone with a copy of the file can read, which is also lesson 38, Least privilege.',
        hint: 'Which of the three lines would you be happy to show to a stranger?',
        hints: {
          0: 'Then the mail key would be in every copy of the file, like the payment key on line 6. Is line 6 the good example here?',
          2: 'A default key hides a missing setting. Lesson 52 showed a payment key default that made a whole Saturday pretend. Is a loud stop worse?',
          3: 'A file inside the code folder travels with every copy of the code. Is that different from typing it into shop_v1.py?'
        }
      },
      {
        type: 'pick', q: 'Sam wants to replace line 9 with a <code>PriceCatalog</code> class, a <code>PriceSource</code> interface and a <code>prices.yaml</code> file, "in case the prices come from a supplier one day". Nobody has asked for that. What is the best call?',
        pic: lines(9, 9, { hi: [9] }),
        options: [
          'Build it now, while the file is small. Suppliers are common',
          'Replace it with three names, OAT, LEMON and GIFT_BOX, so there is no dictionary',
          'Leave the dictionary, but also copy the prices into checkout, so checkout is faster',
          'Leave line 9 alone. Every price has one home, and a plain dictionary is the simplest thing that works. Build more when a real need arrives'
        ],
        answer: 3,
        why: 'Line 9 is <b>fine</b>. Each price is written once, with a clear name, in one place that everyone reads: lesson 7, Single source of truth. A class, an interface and a file for a supplier that does not exist is lesson 8, YAGNI, and it breaks lesson 5, KISS. If a supplier ever arrives, this one line is easy to change then.',
        hint: 'Has anyone asked for a supplier? Is anything wrong with line 9 today?',
        hints: {
          0: 'Lesson 8 asked: has a real person asked for this? What does it cost to carry a class nobody needs?',
          1: 'Then line 22 could not look up PRICES[x[0]] by name. Is that simpler?',
          2: 'Then the prices live in two places. Which one wins when oat goes to $3?'
        }
      },
      {
        type: 'pick', q: 'Read <code>checkout</code>, lines 33 to 40. Who might ask for a change to it? Pick all that apply.',
        pic: lines(33, 40),
        options: [
          'Whoever sets the prices and the tax',
          'The delivery drivers',
          'The card company, when its way of charging changes',
          'The kitchen, when it wants its tickets in a new form',
          'The flour supplier',
          'Whoever designs the thank-you page'
        ],
        answer: [0, 2, 3, 5],
        why: 'Line 34 works out money. Lines 35 to 38 talk to the card company. Line 39 tells the kitchen. Line 40 is the page, with a copy of the tax. Four people, four reasons to change, all in one function. A change for the kitchen can break the payment. That is lesson 16, Single responsibility, and lesson 15, Separation of concerns. Nothing here is about deliveries or flour.',
        hint: 'Go line by line. Who cares about line 34? Lines 35 to 38? Line 39? Line 40?'
      },
      {
        type: 'match', q: 'Eight principles, eight places in <code>shop_v1.py</code>. Match each principle to the place that breaks it.',
        pairs: [
          ['Statelessness', 'Line 10: <code>carts = {}</code>, kept in the memory of the running program'],
          ['Law of Demeter', 'Line 36: <code>find(c).wallet.card.charge(KEY, total)</code>'],
          ['Guard clauses', 'Lines 13 to 15: three ifs, each one indented deeper than the last'],
          ['Meaningful names', 'Line 12: <code>def add(c, n, q):</code>'],
          ['Layers and the dependency rule', 'Line 2: the file that holds the price rules imports the web toolkit'],
          ['Broken windows', 'Lines 43 and 44: a note from 2023 that nobody owns, and a line switched off'],
          ['Explicit over implicit', 'Line 23: <code>get_total</code> reads <code>today()</code> inside, so the day is not on its front'],
          ['Twelve-factor app', 'Line 7: the database address is typed in as <code>localhost</code>']
        ],
        why: 'One principle per place. Line 10 forgets everything on a restart (lesson 42). Line 36 reaches through two objects (lesson 25). Lines 13 to 15 bury the real work under three levels (lesson 21). Line 12 says nothing (lesson 12). Line 2 ties the shop\'s rules to a web page (lesson 44). Lines 43 and 44 teach every reader that mess is normal here (lesson 51). Line 23 hides an input (lesson 23). Line 7 only works on one machine (lesson 48).'
      },
      {
        type: 'pick', q: 'Two principles pull. Customers type tips like <code>$5</code> or <code> 5 </code>, and <code>int("$5")</code> stops with an error page. Sam says: "Lesson 39, Defensive programming. Refuse anything that is not plain digits." Maya says: "Lesson 41, Robustness principle. Be forgiving in what you accept." What is the best call?',
        pic: lines(33, 34, { hi: [34] }),
        options: [
          'Sam. Refuse anything that is not plain digits, so "$5" gets an error page',
          'Maya. Accept anything, and treat whatever cannot be read as a tip of 0',
          'Both, at the border. Forgive harmless form, such as a $ sign or spaces. Refuse a wrong meaning, such as -20, 5000 or "abc", with a clear message',
          'Neither. Remove the tip box'
        ],
        answer: 2,
        why: 'They are two halves of one rule. Lesson 41 says forgive <b>form</b>: "$5" and " 5 " clearly mean five dollars. Lesson 39 says check <b>meaning</b>, once, where the value comes in: a tip below zero or of thousands of dollars is refused, kindly and clearly. Turning "abc" into 0 in silence would hide a mistake from the customer, which lesson 22, Fail fast, warned against.',
        hint: 'What does the customer clearly mean by "$5"? And is there any form of -20 that you should accept?',
        hints: {
          0: 'The customer clearly meant five dollars. Is an error page the kind answer?',
          1: 'Then a typo turns into "no tip" and nobody is told. Lesson 22 had a word for carrying on with bad data.',
          3: 'That removes a feature customers use. Is the tip box the problem, or the missing check?'
        }
      },
      {
        type: 'pick', q: 'Two principles pull again. Sam says: "Lesson 6, DRY. <code>get_total</code> and <code>refund</code> both multiply by 1.09. Merge them into one job, <code>money(c, amount, mode)</code>." What is the best call?',
        pic: two(lines(18, 23, { hi: [23] }), lines(42, 45, { hi: [45] })),
        options: [
          'Sam is right. Two jobs that use 1.09 are a copy, so merge them into one',
          'Share the fact, not the job. Write TAX_RATE = 0.09 once, and use it on lines 23, 40 and 45. Keep the jobs apart, because they change for different reasons',
          'Change nothing. The rule of three says to wait for a third copy',
          'Make refund call get_total, so that 1.09 only appears inside get_total'
        ],
        answer: 1,
        why: 'The tax is <b>one fact</b>, so it gets one home: lesson 7, Single source of truth. But adding up a cart and giving money back are two different jobs. They change for different people and different reasons. Lesson 6 also said that alike is not the same, and lesson 16, Single responsibility, keeps them apart. A <code>mode</code> switch would tie them together forever.',
        hint: 'What exactly is repeated: a job, or a fact?',
        hints: {
          0: 'Would a change to the refund rules then risk every cart total? Is the repeated thing a whole job, or one number?',
          2: 'Count again. 1.09 is on line 23, line 40 and line 45. That is three already.',
          3: 'refund is given an amount, not a cart. And that would add a point every time someone gets a refund.'
        }
      },
      {
        type: 'pick', q: 'Two principles pull a third time. Maya is fixing the tip bug on line 34 this afternoon. Sam says: "Lesson 13, Boy Scout rule. While you are in there, fix all the problems in the file." Priya says: "Change line 34 and nothing else. Small changes are safe." What is the best call?',
        pic: lines(33, 34, { hi: [34] }),
        options: [
          'Sam. Fix every problem in shop_v1.py in this one change',
          'Priya. Change only line 34, and leave even the name c alone',
          'Fix line 34 with a test that fails first. Then make one small cleanup in the function she is already in, such as renaming c to customer_id in checkout. Ship that. The other problems get their own changes',
          'Rename c to customer_id in every file of the shop in the same change, so it is consistent'
        ],
        answer: 2,
        why: 'Lesson 13 asks for a <b>little</b> cleaner, in the place you are already working. It never asked for everything at once. A change that fixes a bug and rewrites half the file is hard to check and hard to undo, and lesson 57, Gall\'s law, warns that big switches fail in many places at the same time. One bug fix, one small cleanup nearby, one test. Then the next.',
        hint: 'Lesson 13 said to leave it a little cleaner. How much is a little?',
        hints: {
          0: 'If the shop breaks tomorrow, which of the many changes caused it?',
          1: 'That is safe, but she leaves the function exactly as messy as she found it. What did lesson 13 ask for?',
          3: 'That touches many files that have nothing to do with the tip. Is that still a small, safe change?'
        }
      },
      {
        type: 'pick', q: 'On a Wednesday, a customer put one lemon cookie in her cart, opened the cart page once, and paid by card with no tip. She expected $3.27. She was charged $8.72. Three theories. Which should Maya check first?',
        pic: two(lines(25, 31, { hi: [26, 30] }), lines(9, 9)),
        options: [
          'A. The card company added a $5.45 fee by mistake',
          'B. Someone broke in and changed the lemon price to $8 for one minute',
          'C. The cart page added a gift box to her cart, and she paid for it: (3 + 5) x 1.09 = 8.72',
          'D. Python sometimes adds numbers wrong'
        ],
        answer: 2,
        why: 'All of A, B and C give $8.72. A needs a fee nobody has seen, and B needs a break-in. C needs nothing new: line 26 hands the real cart to <code>show_offer</code>, and line 30 appends a gift box to it. That is lesson 62, Occam\'s razor: prefer the explanation with the fewest new guesses, and check it first. And the bug itself is lesson 36, Immutability: a helper changed a list it was only meant to look at. D does not fit at all. Python sums can be off by a tiny fraction of a cent, never by $5.45.',
        hint: 'Which theory needs nothing that we have not already seen in the code?',
        hints: {
          0: 'It fits the number, but it needs a mistake nobody has seen. Is there a cause right here in the code?',
          1: 'It fits the number, but it needs a break-in. What does line 30 do every time the cart page opens?',
          3: 'Try it: does any slip turn $3.27 into exactly $8.72?'
        }
      },
      {
        type: 'pick', q: 'Sam searches <code>shop_v1.py</code> and finds that nothing in it uses <code>DB</code> on line 7. He wants to delete the line. What is the best call?',
        pic: lines(6, 8, { hi: [7] }),
        options: [
          'First find out why it is there. Search the whole shop for DB, and ask Maya who added it. Then decide. If another file uses it, move it to the environment. If nothing does, delete it',
          'Delete it now. Nothing in this file uses it, and the tests will catch a mistake',
          'Never touch it. Old lines are always there for a good reason',
          'Comment it out, just in case, the way line 44 was'
        ],
        answer: 0,
        why: 'That you cannot see a reason does not mean there is none. Another file may read <code>shop_v1.DB</code>. That is lesson 56, Chesterton\'s fence: find out why, then decide. Once you know, removing it is fine. "The tests will catch it" fails here, because shop_v1 has no tests yet. And a line commented out "just in case" is exactly the broken window on lines 43 and 44.',
        hint: 'Sam searched one file. Where else could the line be used?',
        hints: {
          1: 'Look for a tests folder for shop_v1. Is there one?',
          2: 'Lesson 56 said: once you know the reason, removing it is fine. Is "never" the rule?',
          3: 'Look at lines 43 and 44. Has anyone ever come back for them?'
        }
      },
      {
        type: 'pick', q: 'Maya\'s boss reads about test coverage. He announces: "shop_v1 must reach 95% test coverage by Friday. Bonuses depend on it." What is most likely to happen, and what should Maya do?',
        pic: lines(33, 40),
        options: [
          'The shop will be safe by Friday, because 95% of the lines will be checked',
          'Coverage cannot be measured on Python, so nothing will happen',
          'The team should delete the refund job, so that the percentage goes up',
          'The team will write many quick tests that run every line without checking much. Maya should drop the bonus, use coverage as a map of untested lines, and write real tests for the money lines first'
        ],
        answer: 3,
        why: 'A test that calls <code>checkout</code> with no <code>assert</code> still counts every line as covered, and it can never fail. Reward the number, and people move the number. That is lesson 58, Goodhart\'s law. Coverage is good at one thing: showing lines that no test runs at all. Read it as a map, and spend the time on lines 33 to 40, where the money moves. Deleting code to raise a percentage is the same game.',
        hint: 'If people only cared about the number, what is the quickest way to raise it?'
      },
      {
        type: 'pick', q: 'Sam has worked on the double charge alone for two weeks, and it is still not fixed. Maya wants to hire three new people this week, "so it is done by Friday". What is the best call?',
        options: [
          'Hire three. Four people will finish four times faster',
          'Do not add people to this late fix. Cut it down to the smallest fix that works, the ticket check, and let Sam finish that. Bring new people in later, for separate work, once shop_v1 has tests',
          'Hire three, and have them rewrite the whole file in parallel while Sam keeps fixing the old one',
          'Hire ten, to be safe'
        ],
        answer: 1,
        why: 'Newcomers must first learn a messy file with no tests, and Sam is the one who must teach them. More people means more talking, and one fix inside one function cannot be split four ways. That is lesson 54, Brooks\'s law: adding people to a late project makes it later. Cutting the job down works. And lesson 60, Hofstadter\'s law, says it always takes longer than you expect, so plan the next date with that in mind.',
        hint: 'Who will teach the newcomers this file, and what will he not be doing while he teaches?'
      },
      {
        type: 'order', q: 'Maya decides to repair <code>shop_v1.py</code> while it keeps taking orders. Put the steps in a sensible order.',
        items: [
          'Before changing anything, write small tests that pin down what the program does today',
          'Choose the riskiest seam first: lines 33 to 40, where money moves',
          'Write a test that fails for the double charge, then fix it',
          'Run every test, and ship this one small change',
          'Move on to the next seam, and rename any c, n or q you meet on the way'
        ],
        why: 'Tests first, so every later change can be checked: lesson 49, Testing pyramid. Then the debt with the highest interest, where mistakes cost money: lesson 50, Technical debt. One fix at a time, shipped and working before the next, so the shop grows from something that works: lesson 57, Gall\'s law. And the names get better as you pass by: lesson 13, Boy Scout rule. No big-bang rewrite.',
        hint: 'What has to exist before any change is safe? And what comes last, as a habit along the way?'
      },
      {
        type: 'bucket', q: 'A principle is a tool, not a law. For <code>shop_v1.py</code>, is each idea a good use of one, or is it overdoing it?',
        buckets: ['Use it here', 'Overdoing it'],
        items: [
          ['One TAX_RATE for lines 23, 40 and 45', 0],
          ['Reading the payment key from the environment', 0],
          ['A ticket number on Pay, so a retry charges once', 0],
          ['Checking the tip once, where the form comes in', 0],
          ['Handing the day to get_total', 0],
          ['Keeping carts in one shared store', 0],
          ['A small test for the Sunday price, before fixing line 23', 0],
          ['A PriceCatalog class and interface for the three prices on line 9', 1],
          ['Support for 40 ways to pay, when the shop takes three', 1],
          ['Rewriting all of shop_v1.py in one weekend, with no tests', 1],
          ['A test that checks the oat price is 2', 1],
          ['Making the tax rate a setting that every machine must set', 1],
          ['Splitting add into one function for each if', 1]
        ],
        why: 'Each one on the left fixes a real problem from this exam at a small cost. Each one on the right pushes a principle past the point where it helps: an interface nobody needs (lesson 8), ways to pay nobody asked for (lesson 8 again), a big-bang rewrite (lesson 57), a test of a fact rather than a rule (lesson 49), a setting for something that is the same everywhere (lesson 46), and functions cut too thin (lesson 17).'
      },
      {
        type: 'pick', q: 'The last question. Looking at the whole of <code>shop_v1.py</code>, which of these are true? Pick all that apply.',
        pic: code(shop, { title: 'shop_v1.py' }),
        options: [
          'Lines 23, 40 and 45 hold one fact, the tax, in three places',
          'A customer who opens the cart page and then pays by card is charged for a gift box she never chose',
          'Line 9 is fine as it is',
          'The safest plan is to rewrite the whole file from scratch and switch over on one day',
          'Line 39, the print, breaks Liskov substitution',
          'A clever line like line 23 is harder to debug than it was to write',
          'These problems do not matter equally. A few, such as the double charge, will cause most of the harm, so they come first',
          'A customer who pays with kind "phone" is charged by the card branch',
          'The shop works today, so none of this needs fixing'
        ],
        answer: [0, 1, 2, 5, 6],
        why: 'True: the tax is on three lines (lessons 6 and 7). Line 30 adds a gift box to the real cart (lesson 36). Line 9 is one plain home for the prices. Clever code is harder to debug (lessons 5 and 61). And a few problems, the ones that move money, cause most of the harm, so they come first (lesson 59, Pareto principle). False: a big-bang rewrite is the risky plan (lesson 57). Nothing on line 39 stands in for anything, so Liskov does not apply. "phone" matches no branch, so nobody is charged at all. And "it works today" is how every problem in this file survived for two years.',
        hint: 'Five are true. Check each one against the code, not against how it sounds.'
      }
    ]
  });

  /* =====================================================================
     ANSWER KEY (not shown to the learner): problems planted in shop_v1.py
      2      import web_toolkit in the file that holds the price rules: l44 Layers, l15 Separation of concerns
      6      live payment key typed into the code: l48 Twelve-factor, l38 Least privilege
      7      database address "localhost" typed in: l48 Twelve-factor (and a Chesterton's fence for Sam, l56)
      8      FINE: secret read from the environment, fails fast if missing (l48, l22)
      9      FINE: one plain home for the prices (l07, l05)
     10      carts kept in program memory: l42 Statelessness
     12      def add(c, n, q): l12 Meaningful names
     13-15   three nested ifs: l21 Guard clauses; bad input ignored in silence: l22 Fail fast
     19      get_total gives a point every time it is asked: l20 Command-query separation, l11 Least astonishment
     23      clever one-liner, "Sunday"[1] is also "u": l05 KISS, l61 Kernighan's law
     23      hidden input, the clock: l23 Explicit over implicit
     23,40,45 tax 1.09 in three places: l06 DRY, l07 Single source of truth, l01 Easy to change
     26,30   helper appends a gift box to the real cart: l36 Immutability
     33-40   checkout answers to four people (prices, card company, kitchen, page): l16 Single responsibility
     34      tip from the form, unchecked (-20 lowers the charge): l39 Defensive programming
     35-38   if/elif on kind, no else ("phone" charges nobody): l28 Program to an interface, l29 Open/closed
     36,38   find(c).wallet.card.charge: l25 Law of Demeter (and l55 Hyrum's law when wallet is renamed)
     33-39   no ticket, a retry charges and bakes twice: l37 Idempotency
     43-44   year-old TODO with no owner, commented-out line: l51 Broken windows (and l50 untracked debt)
     45      refund only returns a number, the real refund line is switched off: l11 Least astonishment
     Verified numbers (python3, stub modules): Wednesday, 1 lemon + 1 cart page view -> 8.72.
     5 cart page views + 1 checkout -> 6 points. Double checkout -> two charges of 4.36, 2 points.
     kind "phone" -> no charge, BAKE printed. 2 lemons, tip "-20" -> charge -13.46.
     10 oats: Monday-Saturday except Tuesday 21.8, Tuesday 19.62, Sunday 19.62. Lines with 1.09: 23, 40, 45.
     ===================================================================== */
})();
