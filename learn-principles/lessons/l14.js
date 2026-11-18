/* Lesson 14: Review: keep it simple (module 1). Quiz only, no video. One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l14  Review: keep it simple
     ===================================================================== */
  // One row per principle: lesson number, name, its test question on two lines, and its group.
  const GROUP = { read: P.okT, home: P.tint, guess: P.warnT, visit: P.white };
  const recapRows = [
    [5, 'KISS', 'Could someone new read this aloud', 'and say what it does?', 'read'],
    [6, 'DRY', 'If this rule changes, would I have to', 'change it in more than one place?', 'home'],
    [7, 'Single source of truth', 'If two places disagree about this,', 'which one wins?', 'home'],
    [8, 'YAGNI', 'Is someone asking for this now,', 'or am I guessing?', 'guess'],
    [9, 'Rule of three', 'Have I seen this three times, and do I', 'know which part is truly the same?', 'guess'],
    [10, 'Premature optimisation', 'Have I measured it,', 'and is this the slow part?', 'guess'],
    [11, 'Least astonishment', 'Would someone who only reads the name', 'be surprised by what it does?', 'read'],
    [12, 'Meaningful names', 'Can I guess what this is from the name', 'alone, without reading how it is used?', 'read'],
    [13, 'Boy Scout rule', 'Is this file a little better', 'than when I opened it?', 'visit']
  ];
  const recapPic = svg(600, 592, 'The nine principles of module 1, each with its test question. KISS: could someone new read this aloud and say what it does. DRY: if this rule changes, would I have to change it in more than one place. Single source of truth: if two places disagree, which one wins. YAGNI: is someone asking for this now, or am I guessing. Rule of three: have I seen this three times, and do I know which part is truly the same. Premature optimisation: have I measured it, and is this the slow part. Least astonishment: would someone who only reads the name be surprised. Meaningful names: can I guess what this is from the name alone. Boy Scout rule: is this file a little better than when I opened it.',
    T(300, 26, 'NINE PRINCIPLES, NINE QUESTIONS', { s: 12.5 }) +
    recapRows.map((r, i) => {
      const y = 46 + i * 56;
      return `<circle cx="24" cy="${y + 20}" r="13" fill="${P.ink}"/>` + T(24, y + 25, r[0], { s: 12, f: P.white }) +
        box(46, y, 176, 40, GROUP[r[4]], 10) + T(134, y + 25, r[1], { s: 12 }) +
        T(238, y + 17, r[2], { s: 12.5, w: 700, a: 'start' }) + T(238, y + 34, r[3], { s: 12.5, w: 700, a: 'start' });
    }).join('') +
    [['easy to read', 'read'], ['one home', 'home'], ['no guessing', 'guess'], ['every visit', 'visit']].map((g, i) => {
      const x = 34 + i * 142;
      return `<rect x="${x}" y="556" width="18" height="18" rx="5" fill="${GROUP[g[1]]}" stroke="${P.ink}" stroke-width="2.5"/>` +
        T(x + 26, 570, g[0], { s: 12.5, a: 'start' });
    }).join(''));

  const playCode = [
    'COOKIE_PRICE = 3',
    'TAX_RATE = 0.09',
    '',
    'def calc(n):',
    '    return n * 3 + n * 3 * 0.09'
  ];
  const playPic = `<div style="width:100%">${code(playCode, { title: 'till.py', hi: [1, 2], bad: [4, 5] })}` +
    svg(600, 126, 'Line 4 breaks meaningful names because calc and n say nothing. Line 5 breaks single source of truth because 3 and 0.09 are typed again.',
      box(20, 16, 270, 64, P.dangerT, 14) + T(155, 42, 'line 4: calc and n say nothing', { s: 13 }) + T(155, 64, 'Meaningful names', { s: 13, f: P.danger }) +
      box(310, 16, 270, 64, P.dangerT, 14) + T(445, 42, 'line 5: 3 and 0.09 typed again', { s: 13 }) + T(445, 64, 'Single source of truth', { s: 13, f: P.danger }) +
      T(300, 114, 'one small job, two broken principles', { s: 13, w: 700, f: P.ink2 })) + `</div>`;

  /* ---------- quiz programs, all new ---------- */
  const flourCode = [
    'def cookies_left(baked, sold):',
    '    left = baked - sold',
    '    order_flour()',
    '    return left'
  ];
  const stampCode = [
    'def add_stamp(card, country="US"):',
    '    card.stamps = card.stamps + 1',
    '    if country == "JP":',
    '        card.stamps = card.stamps + 2    # one day, maybe'
  ];
  const cleverFee = [
    'def fee(k):',
    '    return 2 + 3 * (k > 5)'
  ];
  const deliveryCode = [
    'def cart_delivery(total):',
    '    if total >= 25:',
    '        return 0',
    '    return DELIVERY_FEE',
    '',
    'def email_line(total):',
    '    if total >= 25:',
    '        return "Free delivery"',
    '    return "Delivery is extra"',
    '',
    'def driver_slip(total):',
    '    if total >= 25:',
    '        return "Paid by the shop"',
    '    return "Collect the fee"'
  ];
  const filesCode = [
    '# cart.py        what is in the basket',
    '# emails.py      the words of each email',
    '# delivery.py    fees, drivers and routes',
    '# helpers.py     odds and ends from all over',
    '',
    'def is_free_delivery(total):',
    '    return total >= 30'
  ];
  const bagCode = [
    'def bag_price(cookies):',
    '    price = cookies * COOKIE_PRICE',
    '    if cookies >= 12:',
    '        price = price - 3',
    '    return price'
  ];
  const twelveCode = [
    'TWELVE = 12',
    '',
    'def bake_minutes():',
    '    return TWELVE',
    '',
    'def box_is_full(cookies):',
    '    return cookies >= TWELVE'
  ];
  const stickerCode = [
    'def cookie_sticker(cookie):',
    '    print_paper(cookie.name)',
    '    # print_paper("2 for 1 this week")',
    '    print_paper("Baked today")',
    '',
    'def cake_sticker(c):',
    '    print_paper(c.name)',
    '    print_paper("Keep cool")',
    '',
    'def box_sticker(box, m):',
    '    print_paper(box.name)',
    '    wrap(box, m * 3 + 1)'
  ];
  const trayCode = [
    'def add_cookie(tray, cookie):',
    '    tray.cookies.append(cookie)',
    '    tray.count = tray.count + 1',
    '',
    'def sell_cookie(tray, cookie):',
    '    tray.cookies.remove(cookie)',
    '',
    'def cookies_on_tray(tray):',
    '    return tray.count'
  ];
  const receiptCode = [
    '# menu.py',
    'CAKE_PRICE = 20',
    '',
    '# sales.py',
    'from menu import CAKE_PRICE',
    '',
    'def sell_cake(receipt):',
    '    receipt.paid = CAKE_PRICE',
    '    charge_card(receipt.paid)'
  ];
  const screenCode = [
    'def menu_screen(item):',
    '    display(item.name)',
    '    display(item.price)',
    '',
    'def kitchen_screen(item):',
    '    display(item.name)',
    '    display(item.bake_minutes)'
  ];
  const cityCode = [
    'def card_total(price):',
    '    rate = ask_city_for_tax_rate()    # 3 seconds',
    '    total = price + price * rate      # under 0.01 seconds',
    '    return total'
  ];
  const procCode = [
    'TAX_RATE = 0.09',
    '',
    'def proc(o, drone=False):',
    '    t = 0',
    '    for p in o:',
    '        t = t + p',
    '    return t + t * 0.09'
  ];

  COURSE.add({
    id: 'l14', minutes: 15,
    summary: 'Nine principles on one page. Then the question changes. Here is some code from Maya\'s shop: <b>which principle is being broken?</b>',
    parts: [
      {
        label: 'Recap', pic: recapPic,
        h: 'Nine principles, nine questions.',
        text: [
          'Module 1 gave you nine principles. Each one came with <b>one question to ask</b>. The picture puts all nine on one page. The number in the circle is the lesson.',
          'They fall into four small groups. <b>Easy to read</b>: KISS, least astonishment and meaningful names. The next reader gets plain steps, honest names and no surprises.',
          '<b>One home</b>: DRY gives every rule one home. Single source of truth gives every fact one home. Then the copies cannot drift apart, because there are no copies.',
          '<b>No guessing</b>: YAGNI, the rule of three and premature optimisation all say "wait". Wait for a real request. Wait for a third example. Wait for a measurement.',
          '<b>Every visit</b>: the Boy Scout rule is how the other eight get used. Not in one big clean-up, but a little each time you open a file.'
        ],
        tip: 'All nine serve the goal from lesson 1, Easy to change. And lesson 4, Trade-offs, not laws, applies to every one of them. Each can be overdone.'
      },
      {
        label: 'How to play', pic: playPic,
        h: 'Now you are the detective.',
        text: [
          'Until now, each quiz asked "what does this principle mean?". From here the question changes. You will see a small program from Maya\'s shop that you have not met before, and the question is: <b>which principle is being broken here?</b>',
          'Real code usually breaks <b>more than one</b>. Look at the picture. Line 4 uses names that say nothing. Line 5 types the price and the tax again, when lines 1 and 2 already own them. Two problems in two lines.',
          'A good way to work: run through the nine questions from the recap, one at a time. Stop at each one that gets a bad answer.'
        ],
        warn: 'Sometimes the code is <b>fine</b>. Then the right answer is "leave it alone". And sometimes two principles pull in different directions. Then you pick the better call and say why. That is lesson 4 at work.'
      }
    ],
    quiz: [
      {
        type: 'match', q: 'Warm up. Match each principle from this module to its test question.',
        pairs: [
          ['KISS', 'Could someone new read this aloud and say what it does?'],
          ['DRY', 'If this rule changes, would I have to change it in more than one place?'],
          ['Single source of truth', 'If two places disagree about this, which one wins?'],
          ['YAGNI', 'Is someone asking for this now, or am I guessing?'],
          ['Rule of three', 'Have I seen this three times, and do I know which part is truly the same?'],
          ['Premature optimisation', 'Have I measured it, and is this the slow part?'],
          ['Least astonishment', 'Would someone who only reads the name be surprised by what it does?'],
          ['Meaningful names', 'Can I guess what this is from the name alone, without reading how it is used?'],
          ['Boy Scout rule', 'Is this file a little better than when I opened it?']
        ],
        why: 'Nine principles, nine questions. In the rest of this quiz, these questions are your tools. Ask them of each program in turn.',
        hint: 'Two of them are about names. One asks about what the code does behind its name. The other asks about the name itself.'
      },
      {
        type: 'pick', q: 'Sam wants to show how many cookies are left, so he calls this job from the customer screen. Which principle does the job break?',
        pic: code(flourCode, { title: 'stock.py' }),
        options: ['DRY', 'Least astonishment', 'YAGNI', 'Premature optimisation'],
        answer: 1,
        why: 'The name promises a number. Line 3 also orders flour, every time anyone asks. Ask the question from lesson 11, Least astonishment: would someone who only reads the name be surprised? Sam would be. Take the extra work out, or put it in the name.',
        hint: 'Cover the inside and read only the name. What do you guess the job does? Now read line 3.',
        hints: {
          0: 'Nothing here is written twice. Read only the name, then read line 3.',
          2: 'Ordering flour may be a real need. The trouble is where it hides. Read only the name of the job.'
        }
      },
      {
        type: 'pick', q: 'Maya has one shop, in one town. Nobody has asked for anything else. Which principle does this job break?',
        pic: code(stampCode, { title: 'loyalty.py' }),
        options: ['Single source of truth', 'Meaningful names', 'YAGNI', 'Rule of three'],
        answer: 2,
        why: 'The <code>country</code> option and lines 3 and 4 are there for a shop in Japan that does not exist. "One day" and "maybe" mean a guess. Lesson 8, YAGNI, says wait until someone really asks. Until then, every change to this job has to carry the extra.',
        hint: 'Look for the part that no customer uses today. The note on line 4 gives it away.',
        hints: {
          1: 'The names are clear: card, stamps, country. Ask who uses the country option today.'
        }
      },
      {
        type: 'fill', q: 'Sam cannot read this job aloud, so it breaks lesson 5, KISS. The rule is: delivery costs $2, and $3 more when the trip is over 5 km. Rewrite it in plain steps.',
        pic: code(cleverFee, { title: 'delivery.py, the clever version', bad: [2] }),
        text: 'def delivery_fee(km):\n    fee = 2\n    if km ___ 5:\n        fee = fee + ___\n    return ___',
        options: ['>', '3', 'fee', '>=', '5', 'km'],
        answer: ['>', '3', 'fee'],
        why: 'In the clever line, yes counts as 1 and no counts as 0, so 3 is added only when the trip is over 5 km. The plain version says the same thing in steps Sam can read aloud. It is longer, and it is better.',
        hint: '"Over 5" does not include 5 itself. The last blank hands back the finished fee.'
      },
      {
        type: 'type', q: 'Back to lesson 1, Easy to change. Orders of $25 or more get free delivery. Maya moves that to $30. Ask the lesson 1 question: how many lines must change? Type the number.',
        pic: code(deliveryCode, { title: 'delivery.py' }),
        prompt: 'lines >',
        answers: ['3', 'three'],
        why: 'Lines 2, 7 and 12. One rule has three homes, so one change needs three edits, and each edit is a chance to slip. That is what lesson 6, DRY, warns about. The fix is one small job, like <code>is_free_delivery(total)</code>, that all three ask.',
        hint: 'Find every line where <code>25</code> appears.'
      },
      {
        type: 'pick', q: 'Back to lesson 2, High cohesion. Maya gives the free delivery rule one home, in the new job below. Ask the lesson 2 question, "What is this about?". Which file should the job live in?',
        pic: code(filesCode, { title: 'four files, and one new job' }),
        options: ['cart.py', 'emails.py', 'delivery.py', 'helpers.py'],
        answer: 2,
        why: 'The job is about delivery, so it lives with the other delivery code. Things that change together live together. The cart and the email can both ask it from there. A file of odds and ends is about nothing, so nobody knows to look in it.',
        hint: 'Say what the job is about in one word. Which file is about that word?',
        hints: {
          0: 'The cart uses the rule, but so do the email and the driver slip. Which file is about the rule itself?',
          3: 'What is helpers.py about? If the honest answer is "all sorts of things", cohesion is low.'
        }
      },
      {
        type: 'order', q: 'Maya prints a sticker for every bag she sells. Put her steps in the order that lesson 9, Rule of three, suggests.',
        items: [
          'Write a job for cookie stickers',
          'Cake stickers arrive. Copy the job and change the copy',
          'Gift box stickers arrive. Write a third job',
          'Compare all three jobs, line by line',
          'Pull out only the lines that are the same in all three'
        ],
        why: 'Write it, copy it, and on the third time pull out what is truly shared. The two copies were not wasted work. They were the evidence.',
        hint: 'One, two, three, then look.'
      },
      {
        type: 'pick', q: 'Sam has just finished this module and wants to improve this job. <code>COOKIE_PRICE</code> is set once, in <code>menu.py</code>. The job runs a few times a day and nobody finds it slow. What is the best call?',
        pic: code(bagCode, { title: 'prices.py' }),
        options: [
          'Shrink it to one line: cookies * COOKIE_PRICE - 3 * (cookies >= 12)',
          'Add a currency option, in case Maya opens a shop in Paris',
          'Leave it alone. It reads aloud and nothing in it is a guess',
          'Save each answer in a cache so it never works one out twice'
        ],
        answer: 2,
        why: 'Not every piece of code is broken. This one reads aloud, the price has one home, and the 12 and the 3 are each typed once. Each "improvement" breaks a principle: a clever trick (lesson 5, KISS), a feature nobody asked for (lesson 8, YAGNI), a speed-up nobody measured (lesson 10, Premature optimisation). Lesson 4, Trade-offs, not laws, says: no real problem, no fix.',
        hint: 'Ask the first question from lesson 4. Is there a real problem here right now?',
        hints: {
          0: 'Could Sam read that line aloud? Lesson 5, KISS, was about exactly this trick.',
          1: '"In case" is the giveaway. Is anyone asking for another currency today?',
          3: 'Nobody finds it slow, and nobody has timed it. What does lesson 10 say about that?'
        }
      },
      {
        type: 'bucket', q: 'A principle is a tool, not a law. Is each of these a good use of one, or is it overdoing it?',
        buckets: ['Use it here', 'Overdoing it'],
        items: [
          ['Giving a rule that is written in three jobs one home', 0],
          ['Deleting a currency option that nobody ever asked for', 0],
          ['Renaming x to cookie_count so the line explains itself', 0],
          ['Timing each step before trying to speed anything up', 0],
          ['Merging a tip and a discount because both are 10%', 1],
          ['Deleting the weekend hours to get one tidy line', 1],
          ['Skipping the backup because nobody asked for one', 1],
          ['Renaming every job in the file during a one-line fix', 1],
          ['Waiting for a third copy of the tax rate before giving it one home', 1]
        ],
        why: 'Each one on the left fixes a real problem at a small cost. Each one on the right pushes a good idea past the point where it helps: DRY, KISS, YAGNI, the Boy Scout rule and the rule of three, all overdone. They come from the "When not to" part of each lesson.',
        hint: 'Ask the two questions from lesson 4. Is the problem real right now? What will this cost the next reader?'
      },
      {
        type: 'pick', q: 'Back to lesson 3, Loose coupling. Cookies bake for 12 minutes, and a box holds 12 cookies. Sam saw the same number twice and gave it "one home". Now the new boxes hold 16, so Maya changes line 1 to <code>16</code>. What happens?',
        pic: code(twelveCode, { title: 'bakery.py' }),
        options: ['Only the box size changes', 'The cookies now bake for 16 minutes too', 'The program stops with an error', 'Nothing changes until line 7 is edited'],
        answer: 1,
        why: 'Both jobs read <code>TWELVE</code>, so both follow the change, and the cookies burn. The baking time and the box size are two different facts that shared a number for a while. Merging them by looks tied them together. That is the tight coupling from lesson 3, and it is DRY overdone. The name was a clue. <code>TWELVE</code> says what the value is, not what it means. Two names, <code>BAKE_MINUTES</code> and <code>BOX_SIZE</code>, keep the two facts apart.',
        hint: 'Which jobs read <code>TWELVE</code>?'
      },
      {
        type: 'pick', q: 'Maya opens this file for one real task: line 4 should say "Baked this morning". She knows the 2 for 1 week ended long ago. After the task, which is the right Boy Scout tidy for this visit?',
        pic: code(stickerCode, { title: 'stickers.py', hi: [4] }),
        options: [
          'Delete line 3, the switched-off line next to her change',
          'Rename every job and every value in the file',
          'Rewrite box_sticker, which she does not understand',
          'Nothing. Tidying is never part of a real task'
        ],
        answer: 0,
        why: 'Small, close by and safe. Line 3 can never run, Maya knows its story, and it sits right next to her change. Renaming everything would bury the one line that matters. And lesson 13, Boy Scout rule, says do not tidy what you do not understand. If <code>box_sticker</code> needs work, write that down as its own task.',
        hint: 'The rule says a little cleaner. Which choice takes two minutes and sits beside line 4?',
        hints: {
          1: 'Sam has to check her work. Could he find the real change among all those renames?',
          2: 'She does not understand that job. What did lesson 13 say about tidying what you do not understand?',
          3: 'One small tidy on each visit is the whole idea. Look at line 3.'
        }
      },
      {
        type: 'pick', q: 'A tray holds about 12 cookies. Maya felt that counting them each time "must be slow", so she keeps a saved count. She did not time anything. Which principles does this code break? Pick all that apply.',
        pic: code(trayCode, { title: 'tray.py' }),
        options: ['Premature optimisation', 'Single source of truth', 'Rule of three', 'Meaningful names'],
        answer: [0, 1],
        why: 'Real code often breaks more than one principle at once. The saved count is a speed-up nobody measured: lesson 10, Premature optimisation. It is also a second copy of a fact the list already holds: lesson 7, Single source of truth. And the copy is already wrong. Line 6 sells a cookie, and nothing lowers the count. <code>len(tray.cookies)</code> can never go stale.',
        hint: 'One answer is about why the count was added. The other is about what line 6 forgets.'
      },
      {
        type: 'pick', q: 'Sam says: "Line 8 stores the price a second time. That breaks single source of truth. A receipt should read <code>CAKE_PRICE</code> from the menu every time it is shown." What is the best call?',
        pic: code(receiptCode, { title: 'two files' }),
        options: [
          'Sam is right. Delete receipt.paid and always read the menu',
          'Leave it. What this customer paid is a different fact from today\'s price',
          'Type 20 into sales.py so the receipt does not depend on the menu',
          'Leave it. Copies never cause trouble'
        ],
        answer: 1,
        why: 'The code is fine. The menu owns "what a cake costs today", and line 5 reads it from there. <code>receipt.paid</code> records "what this customer paid on the day", and that must never change. If the price rises to $22 next week, last week\'s receipt should still say $20. Lesson 7, Single source of truth, made the same point about old receipts.',
        hint: 'Suppose the cake price goes up next week. What should last week\'s receipt say?',
        hints: {
          0: 'Try it. The price rises to $22 next week. What would last week\'s receipt show then?',
          2: 'Then the price lives in two files again. Line 5 already reads it from the owner.',
          3: 'Right call, wrong reason. A price typed in two files does cause trouble. Why is this one different?'
        }
      },
      {
        type: 'pick', q: 'Two principles pull against each other. Sam says: "Lines 2 and 6 are the same. Lesson 6, DRY, says merge the two jobs into one <code>show(item, kind)</code>." Maya says: "Lesson 9, Rule of three, says wait." These are the only two screens so far. Who is right, and why?',
        pic: code(screenCode, { title: 'screens.py', hi: [2, 6] }),
        options: [
          'Sam. The same line must never appear twice in a program',
          'Maya. The screens only look alike so far, and a third one will show what is truly shared',
          'Sam. Fewer lines always means simpler code',
          'Maya. Nothing that appears only twice should ever be merged'
        ],
        answer: 1,
        why: 'DRY is about one rule or one fact having one home. Ask its question: if the menu screen changed, would the kitchen screen have to change too? Nobody knows yet. So this is a look-alike, and the rule of three says wait and watch. The last answer goes too far. A tax rate typed twice is one fact with two homes, and that gets one home at once.',
        hint: 'Ask of the two jobs: if one changed, would the other have to change too? "I do not know yet" has its own answer.',
        hints: {
          0: 'DRY is about repeated knowledge, not repeated typing. Do these screens share one rule, or do they just look alike today?',
          2: 'Lesson 5, KISS, said simple does not mean short. Think what a merged job with a kind option turns into.',
          3: 'Right person, wrong reason. A price stored in two files is seen only twice too. Should that one wait?'
        }
      },
      {
        type: 'pick', q: 'Two principles pull against each other again. A card reader must answer at once, and Maya has <b>timed</b> this job: every sale waits 3 seconds on line 2. The city changes the tax rate about once a year. One fix is to ask the city once each morning, save the answer, and use the saved copy all day. That is more code, and one more thing to keep right. What is the best call?',
        pic: code(cityCode, { title: 'till.py, with the times from Maya\'s timer', bad: [2] }),
        options: [
          'Keep the plain code. KISS means simple code always beats fast code',
          'Add the saved copy. Speed is part of this job, and the timer points at line 2',
          'Add saved copies to every job in the shop, to be safe',
          'Add the saved copy. Fast code always beats simple code'
        ],
        answer: 1,
        why: 'KISS asks for the simplest code that solves all of today\'s problem. A card reader that keeps the queue waiting does not solve it. Lesson 10, Premature optimisation, only warns against speed-ups made on a guess. This one is measured, it is the slow part, and the speed is a real need. So pay the cost, and keep it small: one saved copy, refreshed from the city each morning, so everyone knows which one is the original. That last part is lesson 7, Single source of truth.',
        hint: 'Lesson 10 asked: have I measured it, and is this the slow part? Answer that for line 2.',
        hints: {
          0: 'A queue is growing at the till. Does the plain code solve all of today\'s problem?',
          2: 'Which lines has the timer shown to be slow? Only one.',
          3: 'Right call, wrong reason. Would you add this copy if nobody had timed anything?'
        }
      },
      {
        type: 'pick', q: 'The last one is a real mix. This job adds up an order and then adds the tax. Maya has no drone. The option is there "in case she buys one". Which principles does the code break? Pick all that apply.',
        pic: code(procCode, { title: 'till.py' }),
        options: ['Meaningful names', 'YAGNI', 'Single source of truth', 'Premature optimisation', 'Rule of three'],
        answer: [0, 1, 2],
        why: '<code>proc</code>, <code>o</code> and <code>t</code> need a decoder: lesson 12, Meaningful names. The drone option is a feature nobody asked for, and nothing in the job even uses it: lesson 8, YAGNI. Line 7 types <code>0.09</code> again when <code>TAX_RATE</code> already owns that fact: lesson 7, Single source of truth. Nothing here was done for speed, and nothing was merged too early. A good fix is <code>order_total(prices)</code>, ending with <code>return total + total * TAX_RATE</code>.',
        hint: 'Check three things: the names, the option on line 3, and the number on line 7.'
      }
    ]
  });
})();
