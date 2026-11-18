/* Lesson 10: Premature optimisation (module 1). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l10  Premature optimisation
     ===================================================================== */
  // 10 minutes is 600 seconds, so 10 seconds is 1/60 of the bar: 240 wide against 4 wide.
  const savedBar = (x, w, fill) =>
    `<rect x="${x}" y="186" width="240" height="30" rx="8" fill="${P.sand}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<rect x="${x}" y="186" width="${w}" height="30" rx="${w > 8 ? 8 : 0}" fill="${fill}" stroke="${P.ink}" stroke-width="${w > 8 ? 2.5 : 0}"/>`;
  const bikePic = svg(600, 300, 'A weekend spent tuning the bike saves 10 seconds each morning. A hook for the keys saves 10 minutes. The two bars are drawn to the same scale.',
    T(150, 34, 'A WEEKEND TUNING THE BIKE', { s: 12.5, f: P.danger }) + T(450, 34, 'A HOOK FOR THE KEYS', { s: 12.5, f: P.ok }) +
    `<line x1="300" y1="24" x2="300" y2="262" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    box(30, 54, 240, 76, P.dangerT, 16) + T(150, 86, 'new chain, thin tyres,', { s: 14 }) + T(150, 110, 'two days of work', { s: 14 }) +
    T(150, 172, 'time saved each morning', { s: 12.5, w: 700, f: P.ink2 }) +
    savedBar(30, 4, P.danger) +
    T(150, 244, '10 seconds', { s: 17, f: P.danger }) +
    box(330, 54, 240, 76, P.okT, 16) + T(450, 86, 'one hook by the door,', { s: 14 }) + T(450, 110, 'two minutes of work', { s: 14 }) +
    T(450, 172, 'time saved each morning', { s: 12.5, w: 700, f: P.ink2 }) +
    savedBar(330, 240, P.ok) +
    T(450, 244, '10 minutes', { s: 17, f: P.ok }) +
    T(300, 286, 'Both bars use the same scale. The red one is that thin.', { s: 13, w: 700, f: P.ink2 }));

  const simpleCode = [
    'def add_sale(amount):',
    '    sales.append(amount)',
    '',
    'def refund(amount):',
    '    sales.remove(amount)',
    '',
    'def daily_total():',
    '    total = 0',
    '    for amount in sales:',
    '        total = total + amount',
    '    return total'
  ];

  const fastCode = [
    'def add_sale(amount):',
    '    sales.append(amount)',
    '    cache.total = cache.total + amount',
    '    cache.count = cache.count + 1',
    '',
    'def refund(amount):',
    '    sales.remove(amount)',
    '    cache.count = cache.count - 1',
    '',
    'def daily_total():',
    '    if cache.count == len(sales):',
    '        return cache.total',
    '    return recount()'
  ];

  const painPic = `<div style="width:100%">${code(fastCode, { title: 'shop.py, after Maya\'s weekend', hi: [3, 4, 11, 12, 13], bad: [8] })}` +
    svg(600, 190, 'Three sales of 3, 12 and 20 dollars. The 12 dollar sale is refunded. The list adds up to 23 dollars but the report prints 35 dollars. And the report still takes 4 seconds.',
      T(300, 22, 'Three sales. Then the $12 one is refunded.', { s: 13 }) +
      box(30, 40, 70, 44, P.white, 12) + T(65, 69, '$3', { s: 17, m: true }) +
      box(114, 40, 70, 44, P.dangerT, 12) + T(149, 69, '$12', { s: 17, m: true, f: P.danger }) +
      `<line x1="120" y1="62" x2="178" y2="62" stroke="${P.danger}" stroke-width="3.5" stroke-linecap="round"/>` +
      box(198, 40, 70, 44, P.white, 12) + T(233, 69, '$20', { s: 17, m: true }) +
      box(310, 34, 120, 62, P.okT, 14) + T(370, 74, '$23', { s: 24, m: true, f: P.ok }) + T(370, 118, 'the list adds up to', { s: 12.5, w: 700, f: P.ink2 }) +
      `<circle cx="453" cy="65" r="17" fill="${P.dangerT}" stroke="${P.ink}" stroke-width="2.5"/>` + T(453, 73, '≠', { s: 22, f: P.danger }) +
      box(476, 34, 100, 62, P.dangerT, 14) + T(526, 74, '$35', { s: 24, m: true, f: P.danger }) + T(526, 118, 'the report prints', { s: 12.5, w: 700, f: P.ink2 }) +
      box(150, 140, 300, 38, P.warnT, 12) + T(300, 165, 'and the report still takes 4 seconds', { s: 13 })) + `</div>`;

  // Maya's timer, 4 seconds across 540: warm-up 3.9 s = 526.5, printing 0.1 s = 13.5. The adding sliver is drawn 4 wide so it can be seen.
  const timePic = svg(600, 300, 'Maya times each step of the 4 second report. Adding up 200 sales takes under a hundredth of a second. The printer warming up takes 3.9 seconds. Printing takes a tenth of a second. Her weekend went into the thinnest part.',
    T(300, 26, 'WHERE THE 4 SECONDS GO, BY MAYA\'S TIMER', { s: 12.5 }) +
    `<rect x="34" y="71" width="540" height="56" rx="10" fill="${P.ink}"/>` +
    `<rect x="30" y="66" width="540" height="56" rx="10" fill="${P.warnT}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<rect x="31.5" y="67.5" width="4" height="53" fill="${P.accent}"/>` +
    `<rect x="556.5" y="67.5" width="12" height="53" fill="${P.tint}"/><line x1="556.5" y1="67" x2="556.5" y2="121" stroke="${P.ink}" stroke-width="2"/>` +
    T(296, 90, 'the printer warming up', { s: 14 }) + T(296, 112, '3.9 s', { s: 15, m: true, f: P.warn }) +
    arrow(46, 168, 35, 130, P.danger, 3) +
    T(30, 186, 'adding up 200 sales', { s: 13, a: 'start' }) + T(30, 206, 'under 0.01 s', { s: 13, m: true, a: 'start', f: P.accent }) +
    T(30, 228, 'Maya\'s weekend went here', { s: 13, a: 'start', f: P.danger }) +
    arrow(546, 168, 562, 130, P.ink2, 3) +
    T(570, 186, 'printing the paper', { s: 13, a: 'end' }) + T(570, 206, '0.1 s', { s: 13, m: true, a: 'end', f: P.ink2 }) +
    `<line x1="30" y1="246" x2="570" y2="246" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    T(300, 270, 'The blue sliver is drawn wider than it really is.', { s: 12.5, w: 700, f: P.ink2 }) +
    T(300, 290, 'At its true size you could not see it.', { s: 12.5, w: 700, f: P.ink2 }));
  const fixPic = `<div style="width:100%">${timePic}${code(simpleCode, { title: 'shop.py, the simple version is back', good: [5, 8, 9, 10, 11] })}</div>`;

  const step = (x, y, w, n, a, b, fill) =>
    box(x, y, w, 76, fill, 14) +
    `<circle cx="${x + 24}" cy="${y + 24}" r="13" fill="${P.ink}"/>` + T(x + 24, y + 29, n, { s: 13, f: P.white }) +
    T(x + w / 2 + 10, y + 32, a, { s: 14 }) + T(x + w / 2, y + 56, b, { s: 12.5, w: 700, f: P.ink2 });
  const testPic = svg(600, 336, 'First make it work. Then make it right. Only then ask: is it really too slow? If not, stop. If yes, measure, and make only the slow part fast.',
    step(20, 40, 170, '1', 'Make it work', 'it gives the right answer', P.white) +
    arrow(196, 78, 222, 78, P.ink, 3) +
    step(230, 40, 170, '2', 'Make it right', 'clean, easy to change', P.white) +
    arrow(406, 78, 432, 78, P.ink, 3) +
    box(440, 40, 140, 76, P.warnT, 14) + T(510, 72, 'Is it really', { s: 14 }) + T(510, 94, 'too slow?', { s: 14 }) +
    arrow(440, 126, 330, 176, P.ok, 3) + T(352, 140, 'no', { s: 13, f: P.ok }) +
    box(190, 184, 200, 50, P.okT, 14) + T(290, 215, 'Stop. You are done.', { s: 14, f: P.ok }) +
    arrow(510, 124, 510, 176, P.warn, 3) + T(532, 156, 'yes', { s: 13, f: P.warn }) +
    box(440, 184, 140, 50, P.tint, 14) + T(510, 215, 'Measure', { s: 14, f: P.accent }) +
    arrow(440, 244, 400, 272, P.accent, 3) +
    step(190, 252, 200, '3', 'Make it fast', 'only the slow part', P.white) +
    T(95, 200, 'Most code never', { s: 13, w: 700, f: P.ink2 }) + T(95, 220, 'needs step 3.', { s: 13, w: 700, f: P.ink2 }));

  const wasteCode = [
    '# reads the whole price file once for every sale',
    'for sale in sales:',
    '    prices = read_price_file()',
    '    check_price(sale, prices)',
    '',
    '# reads the price file once',
    'prices = read_price_file()',
    'for sale in sales:',
    '    check_price(sale, prices)'
  ];

  COURSE.add({
    id: 'l10', minutes: 8,
    summary: 'Do not make code faster until it works, it is clean, and you have <b>measured</b> where the time really goes. Speeding it up too early is called <b>premature optimisation</b>.',
    video: {
      src: 'videos/l10-premature-optimisation.mp4', poster: 'videos/l10-premature-optimisation.jpg', length: '1 min 8 s',
      script: [
        "Every evening, Maya's shop prints a sales report. It takes 4 seconds, and it feels slow.",
        'Maya is sure she knows why. The code that adds up the sales. So she spends a weekend making it fast. It now keeps a running total, so the report never has to add again.',
        'The code is harder to read. And the report still takes 4 seconds.',
        'Worse, it is wrong. A customer gets a refund. The list of sales is updated. The running total is not.',
        'So Maya does what she skipped. She measures. Adding up the sales takes a blink. The printer warming up takes almost all 4 seconds.',
        'Her whole weekend went into the wrong part.',
        'So the simple code goes back. And the printer stays awake. Now the report is right, and it is quick.',
        'Speeding up code before you measure is called premature optimisation. Make it work. Make it right. Then measure, and make only the slow part fast.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: bikePic,
        h: 'Tune the bike, or find the keys?',
        text: [
          'You want a quicker trip to work. So you spend a weekend tuning your bicycle. It saves <b>10 seconds</b>. Meanwhile, every morning, you lose <b>10 minutes</b> looking for your keys.',
          'You worked hard on a part that was never the slow part. And you never checked, because it <b>felt</b> obvious.',
          'In code, <b>optimising</b> means making a program run faster or use less memory. <b>Premature</b> means too early. Premature optimisation is speeding code up before you know it is correct, and before you have <b>measured</b> where the time really goes.',
          'There is an order that works: <b>make it work</b>, then <b>make it right</b> (clean and easy to change), then, only if it is really too slow, measure and <b>make it fast</b>.'
        ],
        tip: 'Lesson 8, YAGNI, was about <b>features nobody asked for</b>. This lesson is about <b>speed nobody measured</b>. Both are work done on a guess.'
      },
      {
        label: 'The code', pic: code(simpleCode, { title: 'shop.py', hi: [9, 10] }),
        h: 'A report that just adds up.',
        text: [
          '<code>sales</code> is the list of today\'s sales, in dollars. A sale adds its amount to the list. You met <code>.append</code> in lesson 3. A refund takes that amount back out: <code>.remove(amount)</code> removes one matching amount from the list.',
          'At closing time, <code>daily_total</code> adds everything up, and the shop prints that total on the end-of-day report.',
          'Line 9 is new. <code>for amount in sales:</code> means: go through the list <b>one item at a time</b>. For each item, run the pushed-in line under it. Each time round, <code>amount</code> is the next sale. This is called a <b>loop</b>.',
          'So line 10 runs once for every sale and adds it to <code>total</code>. With sales of $3, $12 and $20, the total grows 3, then 15, then <b>35</b>.',
          'The report takes about 4 seconds to appear, and that feels slow. Maya looks at the loop and thinks: it adds up <b>every sale, every time</b>. That must be the slow part. She does not check.'
        ]
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Faster on paper, wrong at the till.',
        text: [
          'Maya spends a weekend making the adding "fast". Her idea: never add twice. She keeps a <b>running total</b> in a small notebook object called <code>cache</code>. A saved answer kept for speed is called a cache (say "cash"). The dot means "reach inside", as in lesson 3.',
          'Every sale now also updates <code>cache.total</code> and <code>cache.count</code>. Line 11 is her safety check. If the count she saved equals the length of the list, she trusts the saved total. If not, <code>recount()</code> adds everything up the old way.',
          'Now look at <code>refund</code>. Line 8 fixes the count. <b>Nothing fixes the total.</b> Sell $3, $12 and $20, then refund the $12. The list holds $23. The count matches, so the check passes, and the report prints <b>$35</b>.',
          'And the report <b>still takes 4 seconds</b>.'
        ],
        warn: 'Before, there was one thing to keep right: the list. Now there are three, and every job that touches a sale must update all of them. Maya paid for speed with code that is harder to read and easier to break. And she got no speed.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Measure. Then fix the slow part.',
        text: [
          'Maya finally does what she skipped. She puts a timer around each step of the report. It works like a stopwatch: start it, run one step, read how long that step took.',
          'Adding up 200 sales: <b>under 0.01 seconds</b>. Too quick to notice. Printing the paper: 0.1 seconds. The other <b>3.9 seconds</b> is the old printer waking up and warming up. It goes to sleep when nobody uses it, and by closing time it is always asleep.',
          'So the slow part was never in her code. Maya puts the <b>simple loop back</b>. It was correct and easy to read all along. Then she fixes what the timer pointed at: she changes the printer\'s setting so it stays awake during shop hours.',
          'The report now appears in about 0.1 seconds, and it says <b>$23</b>.'
        ],
        tip: 'These numbers come from Maya\'s timer in Maya\'s shop. They are only an example. Your program will have a different slow part, and you will not know which one until you measure.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Ask before you speed anything up.',
        text: [
          'Before you make any code faster, ask: <b>"Have I measured it, and is this the slow part?"</b>',
          'If you have not measured, you are guessing. People guess badly about speed. The slow part is very often somewhere nobody was looking, like a printer.',
          'And keep the order. Fast code that gives the wrong answer is worth nothing. So first make it work. Then make it right. Most code is already fast enough at that point, and you can stop.'
        ],
        tip: 'The computer scientist Donald Knuth wrote that "premature optimization is the root of all evil". He spelled it the American way, with a z. The idea is the same.'
      },
      {
        label: 'When not to', pic: code(wasteCode, { title: 'report.py, two ways to check prices', bad: [3], good: [7] }),
        h: 'This is not a licence to be careless.',
        text: [
          '<b>Do not pick an obviously wasteful way when a better one is just as easy to read.</b> Suppose Maya loves this lesson so much that she stops thinking about speed at all. Her new report reads the whole price file again for every sale. With 200 sales, that is 200 reads.',
          'Moving one line above the loop reads the file <b>once</b>. The code is no harder to read. That is not premature optimisation. It is just not being wasteful. A line starting with <code>#</code> is a note for people, as in lesson 4.',
          '<b>And sometimes speed is the requirement.</b> A card reader must answer at once, or the queue grows. A report over millions of sales cannot take all night. When being fast is part of the job, measure from the first day. Do not wait for complaints.'
        ],
        warn: 'The rule is not "never care about speed". It is "do not trade away clear, correct code for speed you have not measured".'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What is premature optimisation?',
        options: ['Making code faster before you have measured where the time goes', 'Any work that makes a program faster', 'Writing code that is too simple', 'Fixing a bug before a customer finds it'],
        answer: 0,
        why: 'Making code faster is fine. Doing it too early, on a guess, is the mistake. You pay with harder code and often speed up a part that was never slow.',
        hint: 'Think of the weekend spent on the bike while the keys were the real problem.'
      },
      {
        type: 'type', q: 'This is Maya\'s "fast" code. The shop runs <code>add_sale(4)</code>, <code>add_sale(6)</code>, <code>add_sale(10)</code> and then <code>refund(6)</code>. What does <code>daily_total()</code> hand back? Type the number.',
        pic: code(fastCode, { title: 'shop.py, after Maya\'s weekend' }),
        prompt: 'daily_total() >',
        answers: ['20', '$20', '20.0', '20 dollars'],
        why: 'The three sales make <code>cache.total</code> 20 and <code>cache.count</code> 3. The refund takes 6 out of the list and makes the count 2. The count matches the list, so line 12 hands back the saved 20. The real total is 14.',
        hint: 'Follow <code>cache.total</code> line by line. Does <code>refund</code> ever change it?'
      },
      {
        type: 'pick', q: 'Maya\'s website feels slow. She times each step of loading the menu page. Which step should she work on first?',
        pic: svg(600, 150, 'Timer results for the menu page: fetch the cookie photos 2.8 seconds, work out the prices 0.01 seconds, draw the page 0.2 seconds',
          T(300, 22, 'Timer results for the menu page', { s: 13 }) +
          box(20, 40, 176, 84, P.white, 14) + T(108, 72, 'fetch the photos', { s: 13 }) + T(108, 102, '2.8 s', { s: 20, m: true }) +
          box(212, 40, 176, 84, P.white, 14) + T(300, 72, 'work out the prices', { s: 13 }) + T(300, 102, '0.01 s', { s: 20, m: true }) +
          box(404, 40, 176, 84, P.white, 14) + T(492, 72, 'draw the page', { s: 13 }) + T(492, 102, '0.2 s', { s: 20, m: true })),
        options: ['Fetching the photos', 'Working out the prices', 'Drawing the page', 'All three at the same time'],
        answer: 0,
        why: 'The page takes about 3 seconds and 2.8 of them go on the photos. Even if the price sums took no time at all, nobody would notice the difference.',
        hint: 'Which step uses nearly all of the time?'
      },
      {
        type: 'fill', q: 'Put the simple version back.',
        text: 'def daily_total():\n    total = 0\n    for ___ in ___:\n        total = total + ___\n    return ___',
        options: ['amount', 'sales', 'amount', 'total', 'cache', 'recount'],
        answer: ['amount', 'sales', 'amount', 'total'],
        why: 'Go through the list of sales one amount at a time, add each one to the total, and hand the total back. Nothing is saved, so nothing can go stale.',
        hint: 'The first blank is the name for one item. The second is the list it comes from.'
      },
      {
        type: 'bucket', q: 'Premature, or sensible?',
        buckets: ['Premature', 'Sensible'],
        items: [
          ['Rewriting a loop because it "looks slow"', 0],
          ['Adding a cache before timing anything', 0],
          ['Speeding up code that still gives wrong answers', 0],
          ['Timing each step before changing any code', 1],
          ['Fixing the step the timer says is slowest', 1],
          ['Reading a file once, not 200 times, when both are as clear', 1]
        ],
        why: 'The sensible ones either start from a measurement or cost nothing in clarity. The premature ones start from a feeling.',
        hint: 'Ask of each one: is it based on a measurement or on a guess?'
      },
      {
        type: 'pick', q: 'Back to lesson 7, Single source of truth. After the refund, the list adds up to $23 and <code>cache.total</code> says $35. Ask the lesson 7 question: which one wins?',
        options: ['The list. It holds the real sales', 'cache.total. It was built for speed', 'The bigger number, to be safe', 'Neither. The program should stop'],
        answer: 0,
        why: 'The list is the original. <code>cache.total</code> is a copy kept for speed. Lesson 7 said such a copy is only fine when it is refreshed from the original. <code>refund</code> did not refresh it.',
        hint: 'Which of the two could you work out from the other?'
      },
      {
        type: 'match', q: 'Four lessons from this module. Match each one to the mistake it warns about.',
        pairs: [
          ['KISS', 'A clever trick where plain steps would do'],
          ['DRY', 'One rule written out in three places'],
          ['YAGNI', 'A feature nobody asked for'],
          ['Premature optimisation', 'A speed-up nobody measured']
        ],
        why: 'YAGNI and premature optimisation are cousins. Both spend effort on a guess. One guesses at features, the other guesses at speed.',
        hint: 'Two of these are about guessing. One guesses what people will want. The other guesses what is slow.'
      },
      {
        type: 'pick', q: 'When is it right to think about speed from the very start? Pick all that apply.',
        options: ['A card reader that must answer at once', 'A report that runs over millions of sales', 'A loop over 200 sales that nobody finds slow', 'Any code you have a bad feeling about'],
        answer: [0, 1],
        why: 'When speed is part of the job, measure early and keep measuring. A feeling is not a measurement, and 200 sales take less time than a blink.',
        hint: 'Two of these have a real need for speed. Two are guesses.'
      }
    ]
  });
})();
