/* Lesson 16: Single responsibility (module 2). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l16  Single responsibility
     ===================================================================== */
  // One colour per person, used in every picture of this lesson.
  const WHO = { baker: ['the baker', P.warnT, P.warn], acct: ['the accountant', P.tint, P.accent], maya: ['Maya', P.okT, P.ok] };
  const SKIN = '#F2C9A5', HAIR = '#2A2140';
  const face = (cx, cy, r, kind) => {
    const eye = r * 0.36, ey = cy + r * 0.02;
    let s = '';
    if (kind === 'maya') s += `<circle cx="${cx}" cy="${cy - r * 1.12}" r="${r * 0.4}" fill="${HAIR}" stroke="${P.ink}" stroke-width="2.5"/>`;
    s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${SKIN}" stroke="${P.ink}" stroke-width="2.5"/>`;
    if (kind === 'maya') s += `<path d="M${cx - r} ${cy - r * 0.08} A${r} ${r} 0 0 1 ${cx + r} ${cy - r * 0.08} Q${cx} ${cy - r * 0.72} ${cx - r} ${cy - r * 0.08}Z" fill="${HAIR}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>`;
    if (kind === 'acct') s += `<path d="M${cx - r * 0.92} ${cy - r * 0.4} A${r} ${r} 0 0 1 ${cx + r * 0.92} ${cy - r * 0.4} Q${cx} ${cy - r * 0.78} ${cx - r * 0.92} ${cy - r * 0.4}Z" fill="#8A8799" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>`;
    if (kind === 'baker') s += `<rect x="${cx - r * 0.72}" y="${cy - r * 1.62}" width="${r * 1.44}" height="${r * 1.0}" rx="${r * 0.34}" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>`;
    s += `<circle cx="${cx - eye}" cy="${ey}" r="${r * 0.1}" fill="${P.ink}"/><circle cx="${cx + eye}" cy="${ey}" r="${r * 0.1}" fill="${P.ink}"/>`;
    if (kind === 'acct') s += `<circle cx="${cx - eye}" cy="${ey}" r="${r * 0.27}" fill="none" stroke="${P.ink}" stroke-width="2.5"/><circle cx="${cx + eye}" cy="${ey}" r="${r * 0.27}" fill="none" stroke="${P.ink}" stroke-width="2.5"/><line x1="${cx - eye + r * 0.27}" y1="${ey}" x2="${cx + eye - r * 0.27}" y2="${ey}" stroke="${P.ink}" stroke-width="2.5"/>`;
    s += `<path d="M${cx - r * 0.34} ${cy + r * 0.42} Q${cx} ${cy + r * 0.74} ${cx + r * 0.34} ${cy + r * 0.42}" fill="none" stroke="${P.ink}" stroke-width="2.5" stroke-linecap="round"/>`;
    return s;
  };
  const blk = (x, y, w, h, fill, name, sub) => box(x, y, w, h, fill, 12) +
    T(x + w / 2, y + h / 2 + (sub ? -3 : 5), name, { s: 13.5, m: true }) + (sub ? T(x + w / 2, y + h / 2 + 16, sub, { s: 12, w: 700, f: P.ink2 }) : '');
  const line = (x1, y1, x2, y2, col, dash) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="3" stroke-linecap="round"${dash ? ' stroke-dasharray="3 8"' : ''}/>`;

  /* ---- The idea: one charger, three phones ---- */
  const phone = (x, y, name, pct, fill, col) => box(x, y, 92, 122, P.white, 14) +
    `<rect x="${x + 16}" y="${y + 20}" width="60" height="26" rx="6" fill="${fill}" stroke="${P.ink}" stroke-width="2.5"/>` +
    T(x + 46, y + 38, pct, { s: 13, f: col }) + T(x + 46, y + 76, name, { s: 14 }) + T(x + 46, y + 98, pct === 'charging' ? 'plugged in' : 'unplugged', { s: 12, w: 700, f: P.ink2 });
  const chargerPic = svg(600, 300, 'One phone charger shared by three people. Only one phone can be plugged in, so the other two are running flat.',
    T(300, 30, 'One charger, three people', { s: 16 }) +
    box(254, 52, 92, 50, P.sand, 12) + T(300, 83, 'charger', { s: 13.5 }) +
    line(300, 107, 300, 146, P.ok) + line(274, 107, 138, 146, P.danger, true) + line(326, 107, 462, 146, P.danger, true) +
    phone(72, 150, 'Dad', '9%', P.dangerT, P.danger) + phone(254, 150, 'Leo', 'charging', P.okT, P.ok) + phone(436, 150, 'Mum', '12%', P.dangerT, P.danger) +
    T(300, 294, 'Every time one person plugs in, somebody else is unplugged.', { s: 13, w: 700, f: P.ink2 }));

  /* ---- The code ---- */
  const before = [
    'def day_summary(sales):',
    '    cookies = 0',
    '    money = 0',
    '    for sale in sales:',
    '        count = sale.count',
    '        cookies = cookies + count',
    '        print_paper(count, sale.item)',
    '        money = money + count * sale.price',
    '    tell_baker(cookies)',
    '    tell_accountant(money)'
  ];
  const patched = before.slice(0, 5).concat([
    '        if sale.item == "gift box":',
    '            count = count * 6'
  ], before.slice(5));

  const chip = (x, y, w, s, fill, col) => box(x, y, w, 34, fill, 10) + T(x + w / 2, y + 22, s, { s: 13, f: col || P.ink });
  const whoPic = svg(600, 250, "Today's sales are 30 choc chip cookies at 3 dollars and 2 gift boxes at 15 dollars. One job, day_summary, gives the baker 32 cookies, gives Maya the closing slip, and gives the accountant 120 dollars.",
    T(300, 22, "Today's sales:  30 choc chip at $3   and   2 gift box at $15", { s: 13 }) +
    box(208, 92, 184, 76, '#15132B', 14) + T(300, 126, 'day_summary', { s: 15, m: true, f: '#ECEAFF' }) + T(300, 148, 'one job', { s: 12, w: 700, f: '#C9C6FF' }) +
    [['baker', 68, 'bake 32 cookies'], ['maya', 130, '30 choc chip, 2 gift box'], ['acct', 192, 'sales for tax: $120']].map(r => {
      const w = WHO[r[0]];
      return face(40, r[1], 19, r[0]) + T(68, r[1] + 5, w[0], { s: 12.5, a: 'start' }) +
        line(172, r[1], 204, 100 + (r[1] - 68) * 0.5, w[2]) +
        arrow(398, 100 + (r[1] - 68) * 0.5, 420, r[1], w[2], 3) + chip(424, r[1] - 17, 168, r[2], w[1]);
    }).join('') +
    T(300, 240, 'Three people give this one job its rules.', { s: 13, w: 700, f: P.ink2 }));
  const codePic = `<div style="width:100%">${code(before, { title: 'shop.py, the closing-time job', hi: [5] })}${whoPic}</div>`;

  /* ---- The pain ---- */
  const outRow = (y, who, name, a, b, ok) => {
    return face(34, y + 23, 17, who) + T(62, y + 28, name, { s: 13, a: 'start' }) +
      box(176, y, 124, 46, P.white, 12) + T(238, y + 29, a, { s: 14, m: true }) +
      arrow(308, y + 23, 344, y + 23, ok ? P.ok : P.danger, 3.5) +
      box(352, y, 136, 46, ok ? P.okT : P.dangerT, 12) + T(420, y + 29, b, { s: 14, m: true, f: ok ? P.ok : P.danger }) +
      T(546, y + 28, ok ? 'right' : 'wrong', { s: 13, f: ok ? P.ok : P.danger });
  };
  const painPic = `<div style="width:100%">${code(patched, { title: 'shop.py, after the baker\'s request', good: [6, 7, 8], bad: [9, 10] })}` +
    svg(600, 250, 'After the change the baking plan goes from 32 to 42, which is right. The closing slip goes from 2 gift box to 12 gift box, which is wrong. The sales for tax go from 120 dollars to 270 dollars, which is wrong.',
      T(238, 22, 'BEFORE', { s: 12.5, f: P.ink2 }) + T(420, 22, 'AFTER', { s: 12.5, f: P.ink2 }) +
      outRow(36, 'baker', 'baking plan', '32', '42', true) +
      outRow(102, 'maya', 'closing slip', '2 gift box', '12 gift box', false) +
      outRow(168, 'acct', 'sales for tax', '$120', '$270', false) +
      T(300, 242, 'The baker asked. The accountant and Maya did not.', { s: 13, w: 700, f: P.ink2 })) + `</div>`;

  /* ---- The fix ---- */
  const bakerCode = [
    'def baking_plan(sales):',
    '    cookies = 0',
    '    for sale in sales:',
    '        count = sale.count',
    '        if sale.item == "gift box":',
    '            count = count * 6',
    '        cookies = cookies + count',
    '    tell_baker(cookies)'
  ];
  const taxCode = [
    'def tax_summary(sales):',
    '    money = 0',
    '    for sale in sales:',
    '        money = money + sale.count * sale.price',
    '    tell_accountant(money)'
  ];
  const slipCode = [
    'def closing_slip(sales):',
    '    for sale in sales:',
    '        print_paper(sale.count, sale.item)'
  ];
  const fixPic = `<div style="width:100%">` +
    code(bakerCode, { title: 'answers to the baker', good: [5, 6] }) +
    code(taxCode, { title: 'answers to the accountant' }) +
    code(slipCode, { title: 'answers to Maya' }) + `</div>`;

  /* ---- The test ---- */
  const testPic = svg(600, 310, 'day_summary answers to three people, so it should be split. After the split, each job answers to one person.',
    T(150, 30, 'WHO COULD ASK FOR A CHANGE?', { s: 12.5, f: P.danger }) + T(450, 30, 'AFTER THE SPLIT', { s: 12.5, f: P.ok }) +
    `<line x1="300" y1="20" x2="300" y2="290" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    [['baker', 82], ['maya', 152], ['acct', 222]].map(r =>
      face(48, r[1], 21, r[0]) + line(76, r[1], 132, 152, WHO[r[0]][2])).join('') +
    blk(136, 116, 138, 72, P.dangerT, 'day_summary') +
    T(150, 276, '3 people, 1 piece: split it', { s: 13, f: P.danger }) +
    [['baker', 82, 'baking_plan'], ['maya', 152, 'closing_slip'], ['acct', 222, 'tax_summary']].map(r =>
      face(348, r[1], 21, r[0]) + line(376, r[1], 414, r[1], WHO[r[0]][2]) + blk(418, r[1] - 22, 150, 44, WHO[r[0]][1], r[2])).join('') +
    T(450, 276, '1 person per piece: leave it', { s: 13, f: P.ok }));

  /* ---- When not to ---- */
  const tiny = ['start_count', 'get_count', 'is_gift_box', 'times_six', 'add_count', 'send_count'];
  const overPic = svg(600, 300, 'One job of eight lines that answers to the baker is fine. The same job cut into six one-line jobs still answers only to the baker, and is harder to change.',
    T(150, 30, 'ONE BOSS, ONE PIECE', { s: 12.5, f: P.ok }) + T(450, 30, 'ONE BOSS, SIX PIECES', { s: 12.5, f: P.danger }) +
    `<line x1="300" y1="20" x2="300" y2="280" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    face(52, 142, 22, 'baker') + line(82, 142, 110, 142, P.warn) +
    blk(114, 92, 160, 100, P.okT, 'baking_plan', '8 lines') +
    T(150, 244, 'every line is a rule from the baker', { s: 13, w: 700, f: P.ink2 }) + T(150, 264, 'fine as it is', { s: 13, f: P.ok }) +
    face(338, 142, 22, 'baker') +
    tiny.map((n, i) => {
      const x = 384 + (i % 2) * 104, y = 62 + Math.floor(i / 2) * 56;
      return line(364, 142, x, y + 20, P.warn) + box(x, y, 96, 40, P.dangerT, 10) + T(x + 48, y + 25, n, { s: 11, m: true });
    }).join('') +
    T(450, 244, 'nobody asked to change these separately', { s: 13, w: 700, f: P.ink2 }) + T(450, 264, 'one request now opens six jobs', { s: 13, f: P.danger }));

  COURSE.add({
    id: 'l16', minutes: 8,
    summary: 'A piece of code should have <b>one reason to change</b>. Put more sharply: it should answer to <b>one person</b>. That is the single responsibility principle, the S in SOLID.',
    video: {
      src: 'videos/l16-single-responsibility.mp4', poster: 'videos/l16-single-responsibility.jpg', length: '1 min 2 s',
      script: [
        "3 people give Maya's program its rules.",
        'The baker decides how many cookies to bake. Maya decides what the closing slip says. The accountant decides how sales add up for tax.',
        'But in the code, all 3 share one function, and one count.',
        'Then the baker asks. Count each gift box as 6 cookies. Maya changes the count.',
        'The baking plan is right. 42.',
        'But the tax report used that same count. Sales jump from $120 to $270. The slip is wrong too.',
        'The fix. Split the function. One piece for each person.',
        "Now the baker asks again. Only the baker's piece changes. The others cannot break.",
        'That is single responsibility. One piece of code, one reason to change. Ask, who could ask me to change this? More than one person? Split it.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: chargerPic,
        h: 'One charger, three phones.',
        text: [
          'A family shares one phone charger. Leo unplugs Mum\'s phone to charge his own. Later Dad unplugs Leo\'s. Each of them only did what they needed. And each time, <b>somebody else</b> ends up with a flat battery.',
          'Code gets shared the same way. If two different people can each ask for a change to <b>the same piece of code</b>, each for their own reasons, then one person\'s change can break what the other one relies on.',
          'The <b>single responsibility principle</b> says a piece of code should have <b>one reason to change</b>. A piece can be a function or a file. A sharper way to say it: a piece of code should answer to <b>one person, or one group</b>.'
        ],
        tip: 'This is the <b>S</b> in <b>SOLID</b>, a well-known set of five principles. The word is made of their first letters. The other four come in module 3, lessons 29 to 32.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'One job, three bosses.',
        text: [
          'At closing time the shop runs one job, <code>day_summary</code>. It is given <code>sales</code>, the list of what sold today. Line 4 goes through that list one row at a time, as in lesson 10.',
          'Each <code>sale</code> is one row: what was sold, how many, and the price of one. The dot works as in lesson 2. So <code>sale.item</code> is the name, <code>sale.count</code> is how many, and <code>sale.price</code> is the price of one. To keep the sums easy, today has two rows: <b>30 choc chip at $3</b> and <b>2 gift box at $15</b>.',
          'Three people use what this job produces. The <b>baker</b> gets the number of cookies sold and bakes that many for tomorrow (line 9). <b>Maya</b> gets the closing slip, a printed list of what sold (line 7). The <b>accountant</b> gets the money taken, for the tax report (line 10).',
          'Now look at line 5. <code>count</code> is set once and then used for <b>all three people</b>, on lines 6, 7 and 8. It looks tidy. Nothing is repeated.'
        ]
      },
      {
        label: 'The pain', pic: painPic,
        h: 'The baker asks. The accountant pays.',
        text: [
          'The baker has a problem. A gift box holds <b>6 cookies</b>, but the summary counts a box as 1. So there are never enough cookies. The baker asks: <b>"Count each gift box as 6 cookies."</b>',
          'Maya adds lines 6 and 7. <code>==</code> asks "is it equal to?", as in lesson 8. If the row is a gift box, <code>count</code> becomes 6 times bigger. She checks the baker\'s number. It was 30 + 2 = 32. Now it is 30 + 12 = <b>42</b>. Correct.',
          'But <code>count</code> also feeds line 10, the money. 2 gift boxes at $15 is $30. Now the job works out 12 times $15, which is $180. The accountant is told the shop took <b>$270</b>. It took $120. At 9% tax, Maya would pay $24.30. She owes $10.80.',
          'And line 9 prints a closing slip that says <b>12 gift box</b>.'
        ],
        warn: 'Nothing crashed. The baker asked for a change and got it. The accountant asked for <b>nothing</b>, and the accountant\'s number is the one that broke. Maya never opened "the tax code". There was no such place to open.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'One piece per boss.',
        text: [
          'Maya splits <code>day_summary</code> into three jobs, <b>one for each person</b> it was serving. At closing time the shop runs all three.',
          '<code>baking_plan</code> answers to the baker. The gift box rule lives on its lines 5 and 6, and nowhere else. <code>tax_summary</code> answers to the accountant. It counts money the accountant\'s way, so 2 boxes at $15 is $30 again. <code>closing_slip</code> answers to Maya.',
          'Each job now goes through the sales by itself. Is that the repeating that lesson 6, DRY, warned about? No. Lesson 6 also said that <b>alike is not the same</b>. "How many cookies to bake" and "how much money came in" are different rules, set by different people. They only looked like one rule while they happened to agree.',
          'Next week the baker wants 10 spare cookies every day. Maya opens <code>baking_plan</code> and changes its last line. The tax report <b>cannot</b> change, because that job shares nothing with this one.'
        ],
        tip: 'The word <b>responsibility</b> is easy to misread. Here it does not mean "a thing the code does". It means "a person the code answers to".'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Who could ask me to change this?',
        text: [
          'Point at one piece of code and ask: <b>"Who could ask me to change this?"</b>',
          'If the answer is one person, or one group that always wants the same thing, leave it alone. If the answer is <b>more than one</b>, split it, one piece per person.',
          'Try it on <code>day_summary</code>: the baker, Maya and the accountant. Three. Try it on <code>baking_plan</code>: only the baker. One.',
          'A sign to look for in the code: one value, like <code>count</code>, that feeds results for <b>different people</b>.'
        ],
        tip: 'Lesson 15, Separation of concerns, sorted the whole program by <b>kind of work</b>. This question is for <b>one piece</b> at a time, and it asks about <b>people</b>. Real programs use both.'
      },
      {
        label: 'When not to', pic: overPic,
        h: 'Count the bosses, not the lines.',
        text: [
          '<b>It does not mean "do one tiny thing".</b> Suppose Maya loves this lesson and cuts <code>baking_plan</code> into six one-line jobs. Nobody ever asked to change those six separately. All of them answer to the baker. Now one small request from the baker means opening six jobs. One boss with one reason can need a fairly large piece, and that is fine. How long a job should be is a different question: the next lesson, Small functions.',
          '<b>Do not split what always changes together.</b> The gift box rule and the cookie count belong to the same person and change at the same moment. Moving them into different files breaks lesson 2, High cohesion.',
          '<b>You often cannot see the second boss yet.</b> On day one, only Maya read the summary, and one job was the right design. The second reason appeared when the baker and the accountant started to rely on it. Splitting on that day is fine. Splitting earlier, for people who might turn up, is a guess. That was lesson 8, YAGNI.'
        ],
        warn: 'One person, one piece, even when the piece is not tiny. Two people, two pieces, even when each one is short.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does the single responsibility principle ask for?',
        options: ['Every function should be as short as possible', 'A piece of code should have one reason to change', 'Every file should hold exactly one function', 'Each programmer should own one file'],
        answer: 1,
        why: 'One reason to change, which means one person or group the code answers to. It is not about how short the code is.',
        hint: 'Think about why the accountant\'s number broke. It was not because the job was long.'
      },
      {
        type: 'type', q: 'This is the job after the baker\'s request. Today\'s rows are <b>10 choc chip at $3</b> and <b>1 gift box at $15</b>. How many dollars does line 12 tell the accountant?',
        pic: code(patched, { title: 'shop.py, after the baker\'s request' }),
        prompt: 'dollars >',
        answers: ['120', '$120', '120.00', '$120.00', '120.0'],
        why: 'The cookies are 10 times $3, which is $30. The gift box row has its count changed from 1 to 6, so line 10 adds 6 times $15, which is $90. That makes $120. The shop really took $45.',
        hint: 'Go through both rows. For the gift box, what is <code>count</code> by the time line 10 runs?'
      },
      {
        type: 'pick', q: 'Sam plans the rota from the hours. The accountant pays wages from the hours. Sam asks: "Do not count lunch breaks on my rota." Maya takes the breaks off on line 4. What else changes?',
        pic: code([
          'def staff_hours(shifts):',
          '    hours = 0',
          '    for shift in shifts:',
          '        hours = hours + shift.length',
          '    tell_sam(hours)',
          '    tell_accountant(hours * 12)   # pay: $12 an hour'
        ], { title: 'staff.py' }),
        options: ['Nothing else changes', 'The pay the accountant sees goes down', 'The tax rate changes', 'The job stops running'],
        answer: 1,
        why: 'Line 6 uses the same <code>hours</code>. Sam asked for a change to the rota, and everyone\'s pay dropped. This job answers to two people, so it needs two pieces.',
        hint: 'Which lines use <code>hours</code> after line 4?'
      },
      {
        type: 'bucket', q: 'One reason to change, or more than one?',
        buckets: ['One reason', 'More than one'],
        items: [
          ['baking_plan: only the baker sets its rules', 0],
          ['A 20-line job where every line is a rule from the accountant', 0],
          ['closing_slip: only Maya decides what it prints', 0],
          ['One job that feeds the tax report and the baking plan', 1],
          ['A 4-line job whose number is used by Sam and by the accountant', 1],
          ['A file holding the baker\'s rules and the accountant\'s rules', 1]
        ],
        why: 'Count the people who could ask for a change, not the lines. A long job with one boss has one reason. A short job with two bosses has two.',
        hint: 'For each one, ask: who could ask me to change this?'
      },
      {
        type: 'fill', q: 'Finish the piece that answers only to the accountant.',
        text: 'def ___(sales):\n    money = 0\n    for sale in sales:\n        money = money + sale.count * sale.price\n    ___(money)',
        options: ['tax_summary', 'tell_accountant', 'baking_plan', 'tell_baker'],
        answer: ['tax_summary', 'tell_accountant'],
        why: 'Nothing in this job belongs to the baker. So no request from the baker can ever change the tax report.',
        hint: 'Both blanks are about the accountant. Neither one mentions the baker.'
      },
      {
        type: 'match', q: 'After the split, a request arrives. Match each one to the one job Maya should open.',
        pairs: [
          ['"Bake 10 spare cookies every day"', 'baking_plan'],
          ['"Leave gift cards out of the sales for tax"', 'tax_summary'],
          ['"Show the price on the closing slip"', 'closing_slip']
        ],
        why: 'One person asks, one job opens. The other two stay closed, so they cannot break.',
        hint: 'Who is asking? The baker, the accountant or Maya?'
      },
      {
        type: 'pick', q: 'Back to lesson 6, DRY. After the split, all three jobs contain the line <code>for sale in sales:</code>. Should Maya merge them into one job again so nothing is repeated?',
        options: [
          'Yes. Repeated lines must always be merged',
          'No. They are different rules for different people, and they only look alike',
          'Yes, but only the two shortest jobs',
          'No, because loops can never be shared'
        ],
        answer: 1,
        why: 'Lesson 6 said to merge code that means the same thing, not code that only looks the same. Merging these is exactly what tied the baker to the accountant.',
        hint: 'Remember the discount and the tip in lesson 6. They shared a number, not a meaning.'
      },
      {
        type: 'pick', q: 'When is it right NOT to split a piece of code? Pick all that apply.',
        options: [
          'Only one person has ever asked for changes to it',
          'Its lines always change together, for the same reason',
          'It is fairly long, but every line answers to the same person',
          'Two people keep asking for changes to it, each for their own reasons'
        ],
        answer: [0, 1, 2],
        why: 'One boss means one reason, however many lines there are. Splitting for a second person who has not shown up is a guess, as in lesson 8, YAGNI. The last one is the case this lesson is for.',
        hint: 'Three of these have only one person behind them.'
      }
    ]
  });
})();
