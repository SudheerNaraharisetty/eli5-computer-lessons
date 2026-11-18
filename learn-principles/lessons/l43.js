/* Lesson 43: Review: code that survives (module 4). Quiz only, no video. One file per lesson. */
(function () {
  const { P, code, svg, box, T, esc } = PR;

  /* =====================================================================
     l43  Review: code that survives
     ===================================================================== */
  // code() colours a string only when both of its quote marks sit on one line.
  // A docstring runs over several lines, so paint those whole lines as text.
  const codeDoc = (lines, o, docLines) => code(lines, o).replace(
    /<div class="cl([^"]*)"><i>(\d+)<\/i><span>[\s\S]*?<\/span><\/div>/g,
    (all, cls, n) => docLines.includes(+n) ? `<div class="cl${cls}"><i>${n}</i><span><span class="st">${esc(lines[n - 1])}</span></span></div>` : all);

  // One row per principle of module 4: lesson number, name (one or two lines), its test question (two or three lines), its group.
  const GROUP = { rough: P.tint, key: P.warnT, trust: P.okT };
  const recapRows = [
    [36, ['Immutability'], ['After I hand this to someone else,', 'can it change without me knowing?'], 'rough'],
    [37, ['Idempotency'], ['If this runs twice by accident, is anything', 'different from running it once?'], 'rough'],
    [38, ['Least privilege'], ['If this went wrong or was stolen right now,', 'what is the worst it could do? And does it', 'need all of that to do its job?'], 'key'],
    [39, ['Defensive', 'programming'], ['Where does this value first enter my', 'program, and is it checked right there?'], 'trust'],
    [40, ['Design by contract'], ['Is it written down what this code needs', 'from its caller, and what it promises back?'], 'trust'],
    [41, ['Robustness', 'principle'], ['Is my output exactly the agreed format?', 'And does my input accept every form', 'whose meaning is clear?'], 'trust'],
    [42, ['Statelessness'], ['If this program restarted right now, or a', 'different copy answered the next request,', 'would anything be lost or different?'], 'rough']
  ];
  const checkHomes = [
    ['ANYWHERE', 'Fail fast', 'lesson 22, module 2', 'plainly wrong?', 'stop and say so', P.white],
    ['AT THE BORDER', 'Defensive programming', 'lesson 39', 'check once,', 'answer kindly', P.okT],
    ['BETWEEN INSIDERS', 'Design by contract', 'lesson 40', 'a written promise,', 'backed by an assert', P.okT]
  ];
  const recapPic = svg(600, 718, 'The seven principles of module 4, each with its test question. Immutability: after I hand this to someone else, can it change without me knowing. Idempotency: if this runs twice by accident, is anything different from running it once. Least privilege: if this went wrong or was stolen right now, what is the worst it could do, and does it need all of that to do its job. Defensive programming: where does this value first enter my program, and is it checked right there. Design by contract: is it written down what this code needs from its caller, and what it promises back. Robustness principle: is my output exactly the agreed format, and does my input accept every form whose meaning is clear. Statelessness: if this program restarted right now, or a different copy answered the next request, would anything be lost or different. Below, three homes for a check. Anywhere: Fail fast, lesson 22, stop and say so when a value is plainly wrong. At the border: Defensive programming, lesson 39, check once and answer kindly. Between insiders: Design by contract, lesson 40, a written promise backed by an assert.',
    T(300, 24, 'MODULE 4: SEVEN PRINCIPLES, SEVEN QUESTIONS', { s: 12.5 }) +
    recapRows.map((r, i) => {
      const y = 38 + i * 66, q = r[2];
      return `<circle cx="24" cy="${y + 26}" r="13" fill="${P.ink}"/>` + T(24, y + 31, r[0], { s: 12, f: P.white }) +
        box(46, y, 170, 52, GROUP[r[3]], 10) +
        (r[1].length > 1 ? T(131, y + 23, r[1][0], { s: 12 }) + T(131, y + 39, r[1][1], { s: 12 }) : T(131, y + 31, r[1][0], { s: 12 })) +
        q.map((line, j) => T(232, y + (q.length === 3 ? 14 : 23) + j * 17, line, { s: 12.5, w: 700, a: 'start' })).join('');
    }).join('') +
    [['shared, repeated, restarted', 'rough', 16], ['a small key', 'key', 250], ['who to trust', 'trust', 400]].map(g =>
      `<rect x="${g[2]}" y="506" width="18" height="18" rx="5" fill="${GROUP[g[1]]}" stroke="${P.ink}" stroke-width="2.5"/>` +
      T(g[2] + 26, 520, g[0], { s: 12.5, a: 'start' })).join('') +
    `<line x1="20" y1="542" x2="580" y2="542" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    T(300, 568, 'THREE HOMES FOR A CHECK', { s: 12.5 }) +
    checkHomes.map((h, i) => {
      const x = 10 + i * 198;
      return box(x, 582, 182, 100, h[5], 12) +
        T(x + 91, 603, h[0], { s: 11.5, f: P.accent }) + T(x + 91, 622, h[1], { s: 12.5 }) + T(x + 91, 638, h[2], { s: 11, w: 700, f: P.ink2 }) +
        T(x + 91, 658, h[3], { s: 12, w: 700, f: P.ink2 }) + T(x + 91, 673, h[4], { s: 12, w: 700, f: P.ink2 });
    }).join('') +
    T(300, 708, 'At the border, forgive form. Never forgive meaning.', { s: 12.5, w: 700, f: P.ink2 }));

  const playCode = [
    'stars = {}',
    '',
    'def add_star(name):',
    '    if name not in stars:',
    '        stars[name] = 0',
    '    stars[name] = stars[name] + 1'
  ];
  const playPic = `<div style="width:100%">${code(playCode, { title: 'stars.py', bad: [1, 6] })}` +
    svg(600, 126, 'Line 1 breaks statelessness because the table of stars lives in the memory of the running program. Line 6 breaks idempotency because a retry adds a second star.',
      box(20, 16, 270, 64, P.dangerT, 14) + T(155, 42, 'line 1: the table is in the program', { s: 13 }) + T(155, 64, 'Statelessness', { s: 13, f: P.danger }) +
      box(310, 16, 270, 64, P.dangerT, 14) + T(445, 42, 'line 6: a retry adds a second star', { s: 13 }) + T(445, 64, 'Idempotency', { s: 13, f: P.danger }) +
      T(300, 114, 'one small job, two broken principles', { s: 13, w: 700, f: P.ink2 })) + `</div>`;

  /* ---------- quiz programs, all new ---------- */
  const boardCode = [
    'monday = ("oat", "ginger")',
    'tuesday = monday + ("choc chip",)',
    'specials = ["scone"]',
    'board = specials',
    'board.append("muffin")',
    'print(len(monday), len(specials))'
  ];
  const threeCode = [
    '# A: prices_page.py',
    'def cheapest_price(menu_prices):',
    '    menu_prices.sort()',
    '    return menu_prices[0]',
    '',
    '# B: gift_card.py',
    'def top_up(store, card_id, dollars):',
    '    balance = store.load(card_id)',
    '    store.save(card_id, balance + dollars)',
    '',
    '# C: counter_screen.py',
    'now_serving = {}',
    '',
    'def call_number(till, number):',
    '    now_serving[till] = number'
  ];
  const signCode = [
    'def sign_says_open(sign):',
    '    return sign.text == "OPEN"',
    '',
    'def flip_sign(sign):',
    '    if sign.text == "OPEN":',
    '        sign.text = "CLOSED"',
    '    else:',
    '        sign.text = "OPEN"',
    '',
    'def close_shop(sign):',
    '    sign.text = "CLOSED"',
    '',
    'def ring_bell(bell):',
    '    bell.rings = bell.rings + 1'
  ];
  const sliceCode = [
    '# prices.py: called only by Maya\'s own code',
    'def slice_price(cake_cents, slices):',
    '    """Caller promises: slices is 1 to 16.',
    '    I promise: the price of one slice, in cents."""',
    '    if slices < 1 or slices > 16:',
    '        slices = 8       # Sam: "be forgiving"',
    '    return cake_cents / slices'
  ];
  const topUpCode = [
    'done = {}',
    '',
    'def top_up(store, card_id, dollars, ticket):',
    '    if ticket in done:',
    '        return done[ticket]',
    '    balance = store.load(card_id)',
    '    store.save(card_id, balance + dollars)',
    '    done[ticket] = "Topped up"',
    '    return done[ticket]'
  ];
  const smallestCode = [
    '# report.py: Leo\'s Saturday report',
    'def smallest_sale(shop):',
    '    amounts = shop.sales',
    '    amounts.sort()',
    '    return amounts[0]',
    '',
    'print_paper("Smallest sale:", smallest_sale(shop))'
  ];
  const strictPickup = [
    'DAYS = ["friday", "saturday"]',
    '',
    'def read_pickup(line):',
    '    parts = line.split(",")',
    '    day = parts[0]',
    '    if day not in DAYS:',
    '        raise ValueError("unknown day: " + day)',
    '    boxes = clean_count(parts[1])',
    '    return day, boxes'
  ];
  const pickupFlow = [
    'def read_pickup(line):',
    '    parts = line.split(",")',
    '    day = parts[0].strip().lower()',
    '    if day not in DAYS:',
    '        raise ValueError("unknown day: " + day)',
    '    boxes = clean_count(parts[1])',
    '    return day, boxes',
    '',
    'def pickup_request(line):',
    '    try:',
    '        pickup = read_pickup(line)',
    '    except ValueError:',
    '        return send_back(line)',
    '    book_pickup(pickup)'
  ];
  const shelfCode = [
    'def put_on_shelf(order, shelf):',
    '    order.shelf = shelf',
    '    order.status = "ready"'
  ];
  const stockCode = [
    '# count_stock.py: Maya runs this by hand on Sunday night',
    'counted = []',
    '',
    'def count_shelf(shelf):',
    '    for jar in shelf:',
    '        counted.append(jar.name)',
    '',
    'count_shelf(front_shelf)',
    'count_shelf(back_shelf)',
    'print_paper("Jars counted:", len(counted))'
  ];
  const tipCode = [
    'tips = []',
    '',
    'def add_tip(shop, text):',
    '    cents = int(text)',
    '    tips.append(cents)',
    '    return "Thank you!"',
    '',
    '# the website runs this with what the customer typed',
    'add_tip(shop, typed_text)'
  ];

  COURSE.add({
    id: 'l43', minutes: 16,
    summary: 'Seven ways to keep code correct when the world is rough, on one page. Then you are the detective again. Here is some code from Maya\'s shop: <b>which principle is being broken?</b>',
    parts: [
      {
        label: 'Recap', pic: recapPic,
        h: 'Seven principles for a rough world.',
        text: [
          'Module 4 was about code that <b>stays correct when the world around it is rough</b>. Data gets shared. Calls get repeated. Programs restart. Strangers type anything. It gave you seven principles, and each one came with <b>one question to ask</b>. The picture puts all seven on one page. The number in the circle is the lesson.',
          '<b>Shared, repeated, restarted.</b> Three of the seven sound alike, and each is about a different thing. Immutability is about <b>data</b>: once made, it cannot change, so it is safe to share. Idempotency is about <b>an action</b>: doing it twice is the same as doing it once, so it is safe to retry. Statelessness is about <b>the program\'s memory</b>: it keeps nothing between requests, so it is safe to restart and to copy.',
          '<b>A small key.</b> Least privilege does not stop mistakes. It decides in advance how far one can spread.',
          '<b>Who to trust.</b> Defensive programming stands at the border and trusts nothing from outside. Design by contract works inside the wall, where trusted parts write down what they promise each other. The Robustness principle is for the edge where your program meets someone else\'s program: strict in what you send, forgiving in what you accept.',
          'The strip at the bottom untangles three ideas about <b>checks</b>. Fail fast, from lesson 22, is the habit: stop at the first value that is plainly wrong. The other two say <b>where</b>. A gate at the border, with a kind message for people. A contract between insiders, with an assert for programmer mistakes.'
        ],
        tip: 'Does "never trust the input" fight with "be forgiving in what you accept"? No. The gate forgives <b>form</b>: spaces, capital letters, an extra field. It never forgives <b>meaning</b>. One sensible reading, or no entry.'
      },
      {
        label: 'How to play', pic: playPic,
        h: 'Same game, rougher world.',
        text: [
          'In each lesson, the quiz asked "what does this principle mean?". In a review the question changes, as it did in lessons 14, 24 and 35. You will see a small program from Maya\'s shop that you have not met before, and the question is: <b>which principle is being broken here?</b>',
          'Real code usually breaks <b>more than one</b>. Look at the picture. This job gives a customer one loyalty star for each purchase. Line 1 keeps every star in the memory of the running program, so a restart wipes them all. Line 6 adds one more each time it runs, so a request that is sent again gives two stars for one purchase. Two problems in six lines.',
          'A good way to work: run through the seven questions from the recap, one at a time. Stop at each one that gets a bad answer.'
        ],
        warn: 'Sometimes the code is <b>fine</b>. Then the right answer is "leave it alone". And sometimes two principles pull in different directions. Then you pick the better call and say why. That is lesson 4, Trade-offs, not laws, at work.'
      }
    ],
    quiz: [
      {
        type: 'match', q: 'Warm up. Match each of the seven principles to its test question.',
        pairs: [
          ['Immutability', 'After I hand this to someone else, can it change without me knowing?'],
          ['Idempotency', 'If this runs twice by accident, is anything different from running it once?'],
          ['Least privilege', 'If this went wrong or was stolen right now, what is the worst it could do? And does it need all of that to do its job?'],
          ['Defensive programming', 'Where does this value first enter my program, and is it checked right there?'],
          ['Design by contract', 'Is it written down what this code needs from its caller, and what it promises back?'],
          ['Robustness principle', 'Is my output exactly the agreed format? And does my input accept every form whose meaning is clear?'],
          ['Statelessness', 'If this program restarted right now, or a different copy answered the next request, would anything be lost or different?']
        ],
        why: 'Lessons 36 to 42. Seven principles, seven questions. In the rest of this quiz, these questions are your tools. Ask them of each program in turn.',
        hint: 'Three of them sound alike. One is about data that is handed on. One is about a repeat. One is about a restart.'
      },
      {
        type: 'type', q: 'Maya plans the week. What does line 6 print? Type the two numbers with a space between them.',
        pic: code(boardCode, { title: 'week.py' }),
        prompt: 'prints >',
        answers: ['2 2', '2, 2', '2,2', '2 and 2', '(2, 2)'],
        why: '<code>monday</code> is a tuple. Line 2 builds a <b>new</b> tuple of three and leaves <code>monday</code> at 2. <code>specials</code> is a list, and line 4 copies nothing. It gives the same list a second name. So the muffin added through <code>board</code> on line 5 is in <code>specials</code> too, which now holds 2. That is lesson 36, Immutability: a tuple cannot change behind your back, and a shared list can.',
        hint: 'Round brackets or square brackets? Line 2 builds something new. Does line 4 make a second list, or a second name?'
      },
      {
        type: 'fill', q: 'Two jobs open the tips book. Give each one the smallest key that still lets it do its job.',
        text: 'def log_tip(cents):\n    book = open("tips.txt", "___")    # only ever adds a line\n    book.write(str(cents))\n\ndef weekly_report():\n    book = open("tips.txt", "___")    # only ever looks\n    print_report(book)',
        options: ['a', 'r', 'w'],
        answer: ['a', 'r'],
        why: '<code>"a"</code> can only add to the end, so a slip in <code>log_tip</code> cannot erase last month. <code>"r"</code> can only read, so the report cannot change a single tip. Neither job needs <code>"w"</code>, which wipes the file first. That is lesson 38, Least privilege: the worst a job can do is set by what it was allowed to do.',
        hint: 'r is read only. a adds to the end. w wipes the file and starts again.'
      },
      {
        type: 'match', q: 'Three words that sound alike. One is about data, one is about a repeat, and one is about memory. Each snippet breaks exactly one of them. Match each name to the snippet that breaks it.',
        pic: code(threeCode, { title: 'three snippets', hi: [3, 9, 12] }),
        pairs: [
          ['Immutability', 'Snippet A: the job rearranges a list that its caller still holds'],
          ['Idempotency', 'Snippet B: after a lost reply, a retry adds the dollars a second time'],
          ['Statelessness', 'Snippet C: the table lives inside one running copy, and a restart empties it']
        ],
        why: 'A changes data that was handed to it: lesson 36, Immutability. Sorting twice is the same as sorting once, and A keeps nothing, so it breaks neither of the other two. B keeps everything in the shared store, but each run adds again: lesson 37, Idempotency. C sets a value, so running it twice ends the same. Its trouble is where the table lives: lesson 42, Statelessness. Data that cannot change. An action that is safe to repeat. A program that remembers nothing between requests. Three different things.',
        hint: 'Ask of each snippet: is the trouble a change to shared data, a second run, or a restart?'
      },
      {
        type: 'match', q: 'Back to lesson 22, Fail fast. Three ideas are about checking a value, and they are easy to mix up. Match each one to the place where it belongs.',
        pairs: [
          ['Fail fast', 'Anywhere. The habit behind the other two: the moment a value is plainly wrong, stop and say so'],
          ['Defensive programming', 'At the border. Everything from outside is checked once, and a person gets a kind message'],
          ['Design by contract', 'Between trusted insiders. A written promise, backed by an assert, that shows whose bug it is']
        ],
        why: 'Lesson 22 gave the habit: never carry on with a value that cannot be right. Lesson 39 said where the doors are. What a stranger sends is checked at the gate, every time, and a slip gets a kind message. Lesson 40 covered the inside. Maya\'s own jobs write down what they promise each other, and an assert catches the programmer who breaks the deal. An assert is never the gate. And a gate in every room is overdoing it.',
        hint: 'One of them is for strangers. One is for two pieces of Maya\'s own code. One is the habit that both are built on.'
      },
      {
        type: 'pick', q: 'Maya\'s phone sends each of these jobs to the shop as a request. A reply gets lost, so the phone sends the same request again. Which jobs are safe to run twice? Pick all that apply. One of them is the kind that lesson 20, Command-query separation, called a query.',
        pic: code(signCode, { title: 'door.py' }),
        options: ['sign_says_open', 'flip_sign', 'close_shop', 'ring_bell'],
        answer: [0, 2],
        why: '<code>sign_says_open</code> is a query. It only looks, so you can ask as often as you like. <code>close_shop</code> is a command that <b>sets</b> a value. Run it twice and the sign says CLOSED, the same as once. <code>flip_sign</code> looks like a set, but which line runs depends on what the sign says now. Run it twice and the shop is open again. <code>ring_bell</code> adds one more each time. Lesson 20 asked "call it twice" to tell a question from a command. Lesson 37, Idempotency, asks it of commands: does a repeat do harm?',
        hint: 'Start each one with the sign at OPEN. Run it once. Run it twice. Is the ending the same?'
      },
      {
        type: 'pick', q: 'Sam has just finished lesson 41, Robustness principle. He adds lines 5 and 6 to a job that only Maya\'s own code calls. Then a bug in the party screen calls <code>slice_price(2400, 24)</code>. What is the best call?',
        pic: codeDoc(sliceCode, { title: 'prices.py', bad: [5, 6] }, [3, 4]),
        options: [
          'Keep lines 5 and 6. Forgiving in what you accept is always the kind thing to do',
          'Swap lines 5 and 6 for an assert. A broken promise between insiders is a bug, so stop and name the caller',
          'Swap lines 5 and 6 for a kind message to the customer, like the gate in lesson 39',
          'Delete lines 5 and 6 and add nothing. Code inside the wall never needs a check'
        ],
        answer: 1,
        why: 'With Sam\'s lines the job hands back 2400 / 8 = 300.0 cents, as if the cake had 8 slices. Nobody is told. That is not forgiving. It is guessing, and lesson 22 called a made-up value a quiet bug in a tidy coat. Forgiving is for the <b>form</b> of what an outside program sends, when there is one sensible reading. Here the caller is Maya\'s own code, and it broke the promise on line 3. So lesson 40, Design by contract, applies: <code>assert 1 &lt;= slices &lt;= 16</code> stops Sam\'s test run at once and shows whose bug it is. No customer typed anything, so there is nobody to show a kind message to.',
        hint: 'Who sent the 24: a stranger outside, or a piece of Maya\'s own code? And what does line 7 hand back after line 6 has run?',
        hints: {
          0: 'Work out what the job hands back for 24 slices. Does anyone find out that the count was wrong?',
          2: 'A kind message is for a person who made a slip at the border. Who called this job?',
          3: 'Then 2400 / 24 hands back 100.0 and nobody is told. Lesson 40 backed each written promise with something. What was it?'
        }
      },
      {
        type: 'type', q: 'Ben\'s gift card holds $20. Three requests arrive for his card, each for $10. They carry the tickets 61, 61 and 62. How many dollars does the card hold at the end? Type the number.',
        pic: code(topUpCode, { title: 'gift_card.py', hi: [4, 5] }),
        prompt: 'dollars >',
        answers: ['40', '40 dollars', 'forty', '40.00'],
        why: 'The first request with ticket 61 does the work: 20 + 10 = 30. The second carries the same ticket, so line 4 finds it and line 5 hands back the saved reply. Nothing is added. Ticket 62 is new, so it is a new top-up: 30 + 10 = 40. Same ticket, a retry. New ticket, a new purchase. That is the idempotency key from lesson 37, Idempotency.',
        hint: 'Same ticket means a retry. A new ticket means a new top-up. How many of the three requests get past line 4?'
      },
      {
        type: 'pick', q: 'The sales book, <code>shop.sales</code>, lists today\'s amounts in the order the sales happened. Leo writes a small job that finds the smallest one. Which principles does it break? Pick all that apply. One of them is from module 1.',
        pic: code(smallestCode, { title: 'report.py' }),
        options: ['Immutability', 'Least privilege', 'Least astonishment', 'Idempotency', 'Statelessness'],
        answer: [0, 1, 2],
        why: 'Line 3 copies nothing. <code>amounts</code> is a second name for the real sales book, and line 4 puts that book in order of size. A record of the past was changed behind everyone\'s back: lesson 36, Immutability. The job was handed the whole shop, when a sealed copy of the amounts was enough: lesson 38, Least privilege. And a job whose name sounds like a plain question rearranges the books: lesson 11, Least astonishment. The other two do not apply. Sorting twice ends the same as sorting once, and the job keeps nothing in its own memory. A fix: call <code>smallest_sale(tuple(shop.sales))</code>, and let the job say <code>return sorted(amounts)[0]</code>.',
        hint: 'One answer is about what line 4 does to a list that others hold. One is about what line 2 was handed. One is about the name.'
      },
      {
        type: 'pick', q: 'Two principles pull against each other. A party planner\'s spreadsheet, which Maya does not control, books pickups as <code>day,boxes</code>. Tonight it sent <code>Saturday ,2</code>, with a capital letter and a space before the comma, and line 6 turned it away. Sam says: "Good. Lesson 39, Defensive programming. Never trust the input." The planner says: "Lesson 41, Robustness principle. Be forgiving. Take <code>Sat</code> and <code>a couple</code> as well." What is the best call?',
        pic: code(strictPickup, { title: 'pickups.py', hi: [5, 6] }),
        options: [
          'Sam is right. A line that is not exactly right must be turned away',
          'The planner is right. Take anything a person could work out',
          'Line 5 trims and lower-cases the day. The guest list and the count check stay as strict as they are',
          'Line 5 trims and lower-cases the day, and the check on line 6 goes, because the day is clean now'
        ],
        answer: 2,
        why: 'Both are half right, and the two principles do not really fight. Forgive <b>form</b>, never <b>meaning</b>. <code>Saturday</code> with a space after it has exactly one sensible reading, so <code>parts[0].strip().lower()</code> turns it into the strict form, <code>"saturday"</code>. Then the gate does its job as before: the day must be on the guest list, and the count must pass <code>clean_count</code>, the gate from lesson 39. <code>a couple</code> is still sent back, because nobody can say how many that is. <code>Sat</code> is sent back too. The agreed format has full day names, and every nickname Maya accepts is one she can never take back.',
        hint: 'Sort what arrived into two piles: only the form is off, or the meaning is off. What is off about "Saturday "? What is off about "a couple"?',
        hints: {
          0: 'Any person can see which day "Saturday " means. Lesson 41 lost 40 real orders over a capital letter.',
          1: 'How many boxes is "a couple"? Lesson 41 had a short rule for the gate: one sensible reading, or no entry.',
          3: 'Trimming tidies the form. It does not make "someday" a day when Maya is open. Which line asks about that?'
        }
      },
      {
        type: 'order', q: 'Maya made that change. The line <code>FRIDAY ,250</code> arrives, and the shop runs <code>pickup_request</code> with it. Put what happens in order.',
        pic: code(pickupFlow, { title: 'pickups.py, with a forgiving reader', good: [3] }),
        items: [
          'Line 2 cuts the text at the comma into two pieces',
          'Line 3 turns the first piece into "friday"',
          'Line 4 finds friday on the guest list, so line 5 is skipped',
          'On line 6, clean_count stops with a ValueError, because 250 is above 100',
          'Line 12 catches the error, and line 13 sends the text back'
        ],
        why: 'The form was off, so line 3 fixed it without a word. The meaning was off too: Maya bakes at most 100 for one order, and <code>clean_count</code> from lesson 39 refuses 250. A <code>raise</code> leaves <code>read_pickup</code> at once, so line 7 never runs. The <code>try</code> on line 10 was waiting for exactly this. Line 14 never runs, so no pickup is booked. Forgiving and strict, in one gate.',
        hint: 'Follow the text down read_pickup, one line at a time. Which check passes, and which one stops the job?'
      },
      {
        type: 'pick', q: 'The kitchen tablet sends this job to the shop over the wifi, and it tries again by itself when no reply comes. Sam has just finished lesson 37, Idempotency. He says: "Retries! Give it a ticket and a done table." Nobody has had any trouble with this job. What is the best call?',
        pic: code(shelfCode, { title: 'kitchen.py' }),
        options: [
          'Add a ticket and a done table, as the Pay button has',
          'Leave it alone. Both lines set a value, so running it twice ends the same as running it once',
          'Leave it alone. A retry over the wifi can never do harm',
          'Make the order a tuple, so that a retry cannot change it'
        ],
        answer: 1,
        why: 'The code is fine. Ask the lesson 37 question: if this runs twice by accident, is anything different from running it once? No. The shelf is set to the same shelf, and the status is set to "ready" again. A job that only sets values is idempotent for free. A ticket would add a table that has to be kept and cleared, and it would protect nothing. Lesson 37 said it: do not staple a ticket to everything. And lesson 4, Trade-offs, not laws, says: no real problem, no fix.',
        hint: 'Run the job twice in your head. Does line 2 or line 3 add to what is already there, or does it set a value?',
        hints: {
          0: 'A ticket has a cost: a table to keep and to clear out. What would it protect here? Run the job twice in your head.',
          2: 'Right call, wrong reason. Think of a job that adds 10 points and is sent twice. Why is this job different?',
          3: 'Then the first run could not set the shelf either. Is the worry here change, or a repeat?'
        }
      },
      {
        type: 'pick', q: 'Sam has just finished lesson 42, Statelessness. He points at line 2: "A name at the left edge that a job keeps changing! Move it into a database." The script runs once a week on Maya\'s laptop, prints one line and ends. What is the best call?',
        pic: code(stockCode, { title: 'count_stock.py', hi: [2] }),
        options: [
          'Move counted into a shared store, so that a restart loses nothing',
          'Leave it alone. One copy runs once and then ends, so there is no next request and no second copy',
          'Leave it alone. A list in memory is always safe when the file is short',
          'Make counted a tuple, so that no job can change it'
        ],
        answer: 1,
        why: 'The code is fine. Statelessness is about what is still in memory <b>when the next request arrives</b>, and about a second copy that knows something different. This script has no next request and no second copy. It counts, prints and ends. A database would have to be running before Maya could count a single jar. Lesson 42 said one copy on one machine can keep state. Lesson 8, YAGNI, asks who is asking for this. Nobody is.',
        hint: 'Ask the lesson 42 question. Is there a next request? Is there a different copy that could answer it?',
        hints: {
          0: 'Sam spotted the right sign. Now ask the question itself: what would a restart lose here, and who is waiting for a next request?',
          2: 'Right call, wrong reason. The old baskets table was only one line long. What made that one unsafe?',
          3: 'Then line 6 could not add a single jar. This list is still being built, by the one script that owns it.'
        }
      },
      {
        type: 'bucket', q: 'A principle is a tool, not a law. Is each of these a good use of one, or is it overdoing it?',
        buckets: ['Use it here', 'Overdoing it'],
        items: [
          ['Sealing a finished order before the kitchen and the receipt share it', 0],
          ['A ticket on the Pay button, whose request crosses the internet', 0],
          ['A read-only key to the sales book for the weekly report', 0],
          ['Checking the text from the order box once, where it comes in', 0],
          ['Writing down that box_price needs a count from 1 to 100', 0],
          ['Trimming spaces from a cookie name that the delivery app sends', 0],
          ['Keeping baskets in a shared store when two copies run', 0],
          ['A whole new tuple for every item while one job is still taking the order', 1],
          ['Turning the "add a cookie" button into "set cookies to 1"', 1],
          ['Making Sam phone Maya before every single refund', 1],
          ['Checking the same count again in every job inside the wall', 1],
          ['Four lines of promises on a one-line job called cookie_label', 1],
          ['Trimming and lower-casing a staff password to be kind', 1],
          ['A database for a 10-line script that runs once a week on one laptop', 1]
        ],
        why: 'Each one on the left fixes a real problem at a small cost. Each one on the right pushes a good idea past the point where it helps: immutability, idempotency, least privilege, defensive programming, design by contract, the robustness principle and statelessness, all overdone. They come from the "When not to" part of each lesson.',
        hint: 'Ask the two questions from lesson 4. Is the problem real right now? What will this cost the next reader?'
      },
      {
        type: 'pick', q: 'Two principles pull against each other. This is the gift card job with its ticket check. For the Christmas rush, Maya now runs two copies of the website. Sam says: "Lesson 42, Statelessness. Line 1 is memory inside the program. Delete the table and the check." Maya says: "Lesson 37, Idempotency. Without the check, a retry tops up the card twice." What is the best call?',
        pic: code(topUpCode, { title: 'gift_card.py', hi: [1, 4, 8] }),
        options: [
          'Sam is right. Delete the table. A stateless program must not remember anything, anywhere',
          'Maya is right. Keep line 1 as it is. Safe retries matter more than restarts',
          'Keep the check, but save the finished tickets in the shared store, where every copy can find them',
          'Keep line 1 as it is, and never restart the program again'
        ],
        answer: 2,
        why: 'Both are right about the problem. Sam is right that <code>done</code> lives in one running copy. A retry that lands on the other copy finds an empty table, and the card is topped up twice. A restart forgets every ticket. Maya is right that the tickets must be remembered. The way out is what lesson 42 said from the start: stateless does not mean no memory. It means the memory is not inside the program. Put the finished tickets in the shared store, next to the card balance. Then any copy finds ticket 61, and a restart loses nothing.',
        hint: 'Lesson 42 did not throw the baskets away. Where did it put them?',
        hints: {
          0: 'Then the tickets 61, 61 and 62 would top the card up three times. Stateless is about where the memory lives. Does it say there may be none?',
          1: 'Ben\'s first click lands on copy A. His retry lands on copy B. What is in copy B\'s table?',
          3: 'Two copies are already running, and each one has its own table. Does never restarting help with that?'
        }
      },
      {
        type: 'pick', q: 'The last one is a real mix. A customer types a tip, in cents, into a box on the website. The website sends it to the shop as a request, and it tries again by itself when no reply comes. Two copies of the shop\'s program are running. Which principles does this code break? Pick all that apply.',
        pic: code(tipCode, { title: 'tips.py' }),
        options: ['Statelessness', 'Idempotency', 'Defensive programming', 'Least privilege', 'Liskov substitution', 'Composition over inheritance'],
        answer: [0, 1, 2, 3],
        why: 'Line 1 keeps every tip in the memory of one running copy. A restart loses them all, and the two copies each hold a different list: lesson 42, Statelessness. Line 5 adds to what is already there, so a retry records the tip twice: lesson 37, Idempotency. Line 4 trusts text from a stranger. <code>-500</code> goes in as a tip of minus 500 cents, and an empty box breaks the page: lesson 39, Defensive programming. Line 3 is handed the whole shop and uses none of it: lesson 38, Least privilege. The last two do not apply. Nothing here stands in for anything, and no class has a parent. A good fix has a gate at the form that turns the text into a clean number. Then the job is handed only what it needs, as <code>add_tip(store, cents, ticket)</code>.',
        hint: 'Check four things: where the tips are kept, what a retry does on line 5, where the text is checked, and what line 3 was handed.'
      }
    ]
  });
})();
