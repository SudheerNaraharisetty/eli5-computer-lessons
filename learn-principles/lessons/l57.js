/* Lesson 57: Gall's law (module 6). One file per lesson. */
(function () {
  const { P, svg, box, T, arrow } = PR;
  const SCAF = '#8A8577';

  const line = (x1, y1, x2, y2, col, w, dash) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
  const blk = (x, y, w, fill, label, rot, s) => `<g${rot ? ` transform="rotate(${rot} ${x + w / 2} ${y + 14})"` : ''}><rect x="${x}" y="${y}" width="${w}" height="28" rx="7" fill="${fill}" stroke="${P.ink}" stroke-width="2.5"/>${label ? T(x + w / 2, y + 19, label, { s: s || 11.5 }) : ''}</g>`;
  const tick = (x, y) => `<circle cx="${x}" cy="${y}" r="10" fill="${P.ok}" stroke="${P.ink}" stroke-width="2"/><path d="M${x - 5} ${y} l3.5 3.5 l6.5 -7" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`;
  const bad = (x, y, s) => `<circle cx="${x}" cy="${y}" r="10" fill="${P.danger}" stroke="${P.ink}" stroke-width="2"/>` + T(x, y + 5, s || '!', { s: 13, f: '#fff' });

  // The seven pieces of the plan, coloured by the team that owns them.
  const PIECES = [
    ['ordering', P.tint], ['kitchen screen', P.warnT], ['delivery', P.warnT], ['loyalty points', P.tint],
    ['stock', P.warnT], ['accounts', P.okT], ['phone app', P.tint]
  ];

  /* ---------- 1. the idea: two ways to build a tower ---------- */
  const towerPic = svg(600, 320, 'Left: a tower of seven blocks held up by scaffolding, built from a blueprint. On the last day the scaffolding comes off and the tower falls. Right: one block placed and checked, then the next. The tower is a little crooked, but it stands and keeps growing.',
    T(150, 22, 'ALL AT ONCE, FROM A BLUEPRINT', { s: 12, f: P.danger }) + T(450, 22, 'ONE BLOCK AT A TIME', { s: 12, f: P.ok }) +
    // left: scaffold tower, then the fall
    line(46, 60, 46, 250, SCAF, 4) + line(144, 60, 144, 250, SCAF, 4) +
    [0, 1, 2, 3, 4, 5].map(i => line(40, 238 - i * 30, 150, 238 - i * 30, SCAF, 3)).join('') +
    [0, 1, 2, 3, 4, 5].map(i => blk(56, 210 - i * 30, 80, P.white, '')).join('') +
    `<rect x="70" y="40" width="54" height="16" rx="3" fill="#CFE0F5" stroke="${P.ink}" stroke-width="2"/>` +
    arrow(156, 150, 186, 150, P.ink2, 2.5) + T(171, 136, 'day 1', { s: 10.5, w: 700, f: P.ink2 }) +
    blk(192, 222, 70, P.white, '', -8) + blk(232, 226, 64, P.white, '', 6) + blk(206, 196, 60, P.white, '', 22) + blk(250, 200, 50, P.white, '', -18) + blk(222, 172, 56, P.white, '', 40) +
    bad(276, 166, '?') + bad(196, 176, '?') +
    T(150, 282, 'Everything meets reality at once.', { s: 12.5, w: 700, f: P.ink2 }) + T(150, 302, 'It falls, and nobody knows why.', { s: 12.5, w: 700, f: P.danger }) +
    `<line x1="300" y1="40" x2="300" y2="300" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    // right: three snapshots of a growing tower
    blk(338, 222, 60, P.okT, '') + tick(398, 222) +
    blk(424, 222, 60, P.okT, '') + blk(426, 192, 58, P.okT, '', -3) + tick(484, 192) +
    blk(512, 222, 60, P.okT, '') + blk(514, 192, 58, P.okT, '', -3) + blk(511, 162, 60, P.okT, '', 2) + blk(515, 132, 56, P.okT, '', -2) + tick(571, 132) +
    arrow(402, 244, 420, 244, P.ink2, 2) + arrow(490, 244, 508, 244, P.ink2, 2) +
    line(20, 252, 580, 252, P.ink, 3) +
    T(450, 282, 'Each block stands before the next.', { s: 12.5, w: 700, f: P.ink2 }) + T(450, 302, 'A bit crooked. Still standing.', { s: 12.5, w: 700, f: P.ok }));

  /* ---------- 2. the story: the 60-page plan ---------- */
  const planPic = svg(600, 330, 'The Maya 2.0 plan: seven pieces, owned by three teams. Website builds ordering, loyalty points and the phone app. Kitchen builds the kitchen screen, delivery and stock. Money builds accounts. All of it is to be switched on together in month 9.',
    box(20, 14, 560, 238, P.white, 18) +
    T(44, 50, 'Maya 2.0', { s: 24, a: 'start' }) +
    `<rect x="170" y="32" width="128" height="26" rx="13" fill="${P.sand}" stroke="${P.ink}" stroke-width="2"/>` + T(234, 50, 'plan: 60 pages', { s: 11.5 }) +
    T(80, 90, 'WEBSITE', { s: 11.5, f: P.accent, a: 'start' }) + T(260, 90, 'KITCHEN', { s: 11.5, f: P.warn, a: 'start' }) + T(440, 90, 'MONEY', { s: 11.5, f: P.ok, a: 'start' }) +
    blk(44, 102, 150, P.tint, 'ordering') + blk(44, 140, 150, P.tint, 'loyalty points') + blk(44, 178, 150, P.tint, 'phone app') +
    blk(224, 102, 150, P.warnT, 'kitchen screen') + blk(224, 140, 150, P.warnT, 'delivery') + blk(224, 178, 150, P.warnT, 'stock') +
    blk(404, 102, 150, P.okT, 'accounts') +
    T(300, 234, 'Every piece designed up front. Every join decided on paper.', { s: 12, w: 700, f: P.ink2 }) +
    // timeline
    line(40, 290, 540, 290, P.ink, 3) +
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(m => line(40 + m * 52, 284, 40 + m * 52, 296, P.ink, 2.5) + T(40 + m * 52, 316, String(m), { s: 11.5, w: 700, f: P.ink2 })).join('') +
    T(250, 278, 'building, nobody using it', { s: 11.5, w: 700, f: P.ink2 }) +
    `<rect x="453" y="262" width="110" height="22" rx="6" fill="${P.ink}"/>` + T(508, 278, 'SWITCH ON', { s: 11, f: '#fff' }));

  /* ---------- 3. the pain: switch-on day ---------- */
  const failPic = svg(600, 330, 'Switch-on day. The seven pieces meet real customers for the first time. Orders vanish between ordering and the kitchen screen. Kitchen times are an hour off. Loyalty points are added twice. The phone app cannot log in. Every team points at a join. At 11 pm they switch back to the old system.',
    T(300, 22, 'SWITCH-ON DAY, MONTH 9', { s: 12.5, f: P.danger }) +
    // the seven pieces in a row, joined
    PIECES.map(([n, f], i) => blk(14 + (i % 4) * 146, i < 4 ? 40 : 120, 132, f, n)).join('') +
    [0, 1, 2].map(i => line(146 + i * 146, 54, 160 + i * 146, 54, P.ink, 3)).join('') + [0, 1].map(i => line(146 + i * 146, 134, 160 + i * 146, 134, P.ink, 3)).join('') +
    line(80, 68, 80, 120, P.ink, 3) +
    bad(153, 54) + bad(80, 94) + bad(299, 134) + bad(153, 134) +
    T(56, 196, 'Orders vanish between ordering and the kitchen.', { s: 12.5, a: 'start' }) + bad(40, 192) +
    T(56, 220, 'Kitchen times show an hour off.', { s: 12.5, a: 'start' }) + bad(40, 216) +
    T(56, 244, 'Loyalty points are added twice.', { s: 12.5, a: 'start' }) + bad(40, 240) +
    T(56, 268, 'The phone app cannot log in.', { s: 12.5, a: 'start' }) + bad(40, 264) +
    box(392, 190, 190, 82, P.dangerT, 14) + T(487, 216, 'Which guess', { s: 13.5, f: P.danger }) + T(487, 236, 'broke what?', { s: 13.5, f: P.danger }) + T(487, 258, 'nobody can tell', { s: 11.5, w: 700, f: P.ink2 }) +
    `<g transform="rotate(-4 300 306)"><rect x="200" y="290" width="200" height="30" rx="7" fill="${P.danger}" stroke="${P.ink}" stroke-width="2.5"/>` + T(300, 311, '11 PM: SWITCHED BACK', { s: 13, f: '#fff' }) + `</g>`);

  /* ---------- 4. what to do: the chart ---------- */
  const cx = m => 70 + m * 52, cy = n => 250 - n * 28;
  const chartPic = svg(600, 330, 'Chart of pieces of Maya 2.0 in real use, month by month. Try 1 sits at 0 for nine months, jumps to 7 for one evening, and drops back to 0. Try 2 starts at 2 in week 1 and climbs one step at a time to 6 by month 8.',
    T(300, 20, 'PIECES OF MAYA 2.0 IN REAL USE', { s: 12.5, f: P.ink2 }) +
    [1, 2, 3, 4, 5, 6, 7].map(n => line(cx(0), cy(n), cx(9) + 30, cy(n), P.sand, 1.5) + T(cx(0) - 12, cy(n) + 4, String(n), { s: 10.5, w: 700, f: P.ink2, a: 'end' })).join('') +
    line(cx(0), cy(7) - 10, cx(0), cy(0), P.ink, 2.5) + line(cx(0), cy(0), cx(9) + 34, cy(0), P.ink, 2.5) +
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(m => T(cx(m), cy(0) + 18, String(m), { s: 10.5, w: 700, f: P.ink2 })).join('') + T(cx(4.5), cy(0) + 36, 'months', { s: 11.5, w: 700, f: P.ink2 }) +
    `<path d="M${cx(0)} ${cy(0)} H${cx(9)} L${cx(9) + 5} ${cy(7)} L${cx(9) + 10} ${cy(0)} H${cx(9) + 30}" fill="none" stroke="${P.danger}" stroke-width="4" stroke-linejoin="round"/>` +
    `<path d="M${cx(0)} ${cy(0)} H${cx(0.25)} V${cy(2)} H${cx(2)} V${cy(3)} H${cx(4)} V${cy(4)} H${cx(6)} V${cy(5)} H${cx(8)} V${cy(6)} H${cx(9) + 30}" fill="none" stroke="${P.ok}" stroke-width="4" stroke-linejoin="round"/>` +
    T(cx(0.4), cy(2) - 8, 'week 1', { s: 10.5, f: P.ok, a: 'start' }) +
    T(cx(2) + 4, cy(3) - 8, '+ delivery', { s: 10.5, f: P.ok, a: 'start' }) + T(cx(4) + 4, cy(4) - 8, '+ loyalty', { s: 10.5, f: P.ok, a: 'start' }) +
    T(cx(6) + 4, cy(5) - 8, '+ app', { s: 10.5, f: P.ok, a: 'start' }) + T(cx(8) - 6, cy(6) - 8, '+ stock', { s: 10.5, f: P.ok, a: 'start' }) +
    T(cx(4.5), cy(0) - 8, 'try 1: nothing in use for 9 months', { s: 11, f: P.danger }) +
    T(cx(9) - 4, cy(7) - 4, 'one evening', { s: 10.5, f: P.danger, a: 'end' }) +
    T(300, 316, 'Every step on the green line was used by real customers before the next one started.', { s: 11.5, w: 700, f: P.ink2 }));

  /* ---------- 5. the test: three questions ---------- */
  const q = (y, n, txt, sub) => box(40, y, 520, 58, P.white, 14) + `<circle cx="74" cy="${y + 29}" r="16" fill="${P.accent}" stroke="${P.ink}" stroke-width="2.5"/>` + T(74, y + 35, n, { s: 15, f: '#fff' }) +
    T(104, y + 25, txt, { s: 13.5, a: 'start' }) + T(104, y + 45, sub, { s: 11.5, w: 700, f: P.ink2, a: 'start' });
  const testPic = svg(600, 300, 'Three questions to ask before building. 1: What is the smallest version that would actually work and be useful? 2: Can a real person use it this week or this month? 3: When it works, what is the one next piece? For the kitchen stock system the answers are: count flour, butter and chocolate at closing time, the baker uses it tomorrow, and next comes a warning when one runs low.',
    T(300, 22, 'BEFORE BUILDING THE STOCK SYSTEM', { s: 12.5, f: P.ink2 }) +
    q(38, '1', 'What is the smallest version that would work and be useful?', 'Count flour, butter and chocolate at closing time. Nothing else.') +
    q(110, '2', 'Can a real person use it soon?', 'The baker types three numbers tomorrow evening.') +
    q(182, '3', 'When it works, what is the one next piece?', 'A warning when one of them runs low. Then suppliers. Later.') +
    T(300, 276, 'If something breaks, look at the last small step first.', { s: 13, f: P.ok }));

  /* ---------- 6. when not to ---------- */
  const limitPic = svg(600, 290, 'Left: a bridge cannot open half-built, so its builders test small models and single parts first. Right: a week 1 version that nobody ever improves stays a small system for ever.',
    T(150, 24, 'CANNOT SHIP HALF', { s: 12.5, f: P.warn }) + T(450, 24, 'STARTED SIMPLE, STAYED THERE', { s: 12.5, f: P.danger }) +
    // bridge: model and part tested first
    box(30, 48, 110, 70, P.white, 12) + `<path d="M44 100 Q85 64 126 100" fill="none" stroke="${P.ink}" stroke-width="3"/>` + line(40, 100, 130, 100, P.ink, 3) + T(85, 136, 'small model', { s: 11.5, w: 700, f: P.ink2 }) + tick(132, 52) +
    box(160, 48, 110, 70, P.white, 12) + `<rect x="196" y="66" width="38" height="36" fill="${P.sand}" stroke="${P.ink}" stroke-width="2.5"/>` + T(215, 136, 'one part, load-tested', { s: 11.5, w: 700, f: P.ink2 }) + tick(262, 52) +
    arrow(150, 160, 150, 182, P.ink2, 2.5) +
    `<path d="M40 250 Q150 186 260 250" fill="none" stroke="${P.ink}" stroke-width="4"/>` + line(30, 250, 270, 250, P.ink, 4) +
    [70, 110, 150, 190, 230].map(x => line(x, 250, x, 250 - (60 - Math.abs(150 - x) * 0.55), P.ink, 2)).join('') +
    T(150, 276, 'Small working things still come first.', { s: 12, w: 700, f: P.ink2 }) +
    `<line x1="300" y1="40" x2="300" y2="280" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    blk(400, 210, 100, P.okT, 'week 1', 0, 12) + tick(500, 210) +
    [0, 1, 2].map(i => `<rect x="400" y="${170 - i * 40}" width="100" height="28" rx="7" fill="none" stroke="${P.ink2}" stroke-width="2" stroke-dasharray="5 6"/>`).join('') +
    T(450, 76, 'nothing added', { s: 11.5, w: 700, f: P.ink2 }) +
    line(330, 240, 570, 240, P.ink, 3) +
    T(450, 266, 'Two years later: still one cookie.', { s: 12, w: 700, f: P.danger }));

  /* ---------- quiz picture ---------- */
  const quizChart = svg(600, 150, 'Two projects. Project A shows nothing for 10 months, then everything at once. Project B shows a small working piece in week 2 and a new one about every month.',
    line(60, 120, 560, 120, P.ink, 2.5) + line(60, 20, 60, 120, P.ink, 2.5) +
    `<path d="M60 120 H520 V30 H560" fill="none" stroke="${P.danger}" stroke-width="4"/>` + T(380, 110, 'A', { s: 16, f: P.danger }) +
    `<path d="M60 120 H70 V106 H130 V92 H190 V80 H260 V68 H330 V56 H400 V46 H560" fill="none" stroke="${P.ok}" stroke-width="4"/>` + T(200, 70, 'B', { s: 16, f: P.ok }) +
    T(310, 142, 'months', { s: 11.5, w: 700, f: P.ink2 }));

  COURSE.add({
    id: 'l57', minutes: 8,
    summary: 'A complex system that works almost always <b>grew from a simple system that worked</b>. A big system designed whole and switched on at once tends to fail in many places at the same time. That is Gall\'s law. Get the <b>smallest useful thing working first</b>, then add one piece at a time.',
    video: {
      src: 'videos/l57-galls-law.mp4', poster: 'videos/l57-galls-law.jpg', length: '1 min 16 s',
      script: [
        'Maya\'s company plans one grand new system. Maya 2.0. Ordering, kitchen screens, delivery, loyalty points, stock, accounts, and a phone app. All designed up front, in a 60 page plan. Switch it all on in month 9.',
        'For 9 months, each team builds its own part. No real customer touches any of it.',
        'Switch-on day. Orders vanish. Loyalty points double. The app cannot log in. Hundreds of guesses meet reality at once, and nobody can tell which one broke what. That night, they switch back.',
        'Second try. Week 1. Customers can order one cookie, and the kitchen sees it. That is all. 2 wrong guesses show up. Each is fixed in a day, because only one thing was new.',
        'Then one piece at a time. Delivery. Loyalty. The app. Each one works before the next goes on.',
        'Count the working pieces. One line sat at zero for 9 months. The other climbs, step by step.',
        'That is Gall\'s law. Complex systems that work grow from simple ones that worked. So get the smallest thing working first.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: towerPic,
        h: 'Towers that stand were built one block at a time.',
        text: [
          'Picture two people building a tall tower of blocks. The first draws a perfect blueprint, puts up scaffolding, and places every block in the air exactly where the drawing says. On the last day the scaffolding comes off. That is the first moment any block has to hold up another one by itself. The tower falls.',
          'The second person puts one block down and checks that it stands. Then the next. Then the next. The tower ends up a little crooked. But it stands the whole time, and it keeps growing.',
          '<b>Gall\'s law</b> says that working systems are built like the second tower. A complex system that works almost always <b>grew out of a simple system that already worked</b>. A big system designed whole on paper, and switched on all at once, tends not to work. Nobody can patch it into working, either. You go back to something small that works, and grow from there.',
          'You have seen the same pattern outside software. Big cities grew out of villages that worked. A good cook masters one dish before opening a restaurant with a 60-dish menu.'
        ],
        tip: 'John Gall was an American children\'s doctor (a paediatrician) who wrote about how systems behave and fail. His book <i>General Systemantics</i> came out in 1975. Later editions were called <i>Systemantics</i> and then <i>The Systems Bible</i>. The famous passage reads: "A complex system that works is invariably found to have evolved from a simple system that worked. A complex system designed from scratch never works and cannot be patched up to make it work. You have to start over with a working simple system." Gall did not call it a law. Other people named it after him. Like every "law" in this module, it is an observation and a rule of thumb, not a law of nature. "Never" is a deliberately strong word, chosen to make you stop and think.'
      },
      {
        label: 'The story', pic: planPic,
        h: 'Maya 2.0: the plan for everything.',
        text: [
          'Maya\'s company runs on a pile of small programs that grew over the years: the website, the kitchen screen, the books. Maya wants one grand new system to replace them all. She calls it <b>Maya 2.0</b>.',
          'It has <b>seven pieces</b>: ordering, the kitchen screen, delivery tracking, loyalty points, stock, accounts and a phone app. The three teams from lesson 53 split the work. Website (Priya and Tom) takes ordering, loyalty and the app. Kitchen (the baker and Nina) takes the kitchen screen, delivery and stock. Money (the accountant and Sam) takes accounts.',
          'Everything is designed up front, in a <b>60-page plan</b>. It says what every piece does and how every piece talks to every other piece. The plan is careful, and the people are good.',
          'For nine months each team builds its pieces against the plan. They test them as well as they can. But no real customer uses any of it, and the pieces only meet each other for real on one day: <b>switch-on day, in month 9</b>, when the old programs are turned off and everything new is turned on together.'
        ],
        tip: 'In month 7 the project is behind, so Maya hires four more developers to catch up. It does not help. Lesson 54, Brooks\'s law, explains why adding people to a late project tends to make it later.'
      },
      {
        label: 'The pain', pic: failPic,
        h: 'Everything meets reality on the same day.',
        text: [
          'Switch-on day, 9 am. The first real orders arrive, and things break all over.',
          '<b>Orders vanish</b> somewhere between ordering and the kitchen screen. <b>Kitchen times show an hour off</b>, so a cake due at 10 looks due at 11. <b>Loyalty points are added twice</b>, because the Website team and the Kitchen team each thought adding them was their job. <b>The phone app cannot log in</b> at all.',
          'Every team looks at its own piece and finds it working. Each one points at a <b>join</b> with another team\'s piece. That is lesson 53, Conway\'s law, showing up on the worst possible day.',
          'Worse, nobody can tell <b>which decision caused which failure</b>. The 60-page plan holds hundreds of decisions, and every one of them was a guess about real customers and real data. All the guesses were tested for the first time on the same morning. When ten things break at once, you cannot tell which guess was wrong.',
          'At 11 pm Maya switches the old programs back on. Nine months of work are running nowhere.'
        ],
        warn: 'Nobody did bad work. The trouble is <b>how much was new at once</b>. A plan on paper is full of guesses, and you only find out which ones are wrong when real people use a working thing. The big switch-on day checked every guess together, so every wrong one surfaced together, all tangled up.'
      },
      {
        label: 'What to do', pic: chartPic,
        h: 'Get one small thing working. Then grow it.',
        text: [
          'The second try starts with one question: <b>what is the smallest thing that would actually work and be useful?</b>',
          '<b>Week 1:</b> a customer can order one kind of cookie on the website, and the order appears on the kitchen screen. No delivery. No loyalty. No app. That is a tiny version of 2 of the 7 pieces, ordering and the kitchen screen, and real customers use it from day one.',
          'Two wrong guesses show up at once. The plan guessed that customers would collect straight away. Real customers want to <b>pick a collection time</b>. And the kitchen clock is <b>one hour off</b>, the same kind of bug as on switch-on day. This time each one is found within hours and fixed within a day. Only one thing was new, so it was obvious where to look.',
          'Then one piece at a time, each one working and used before the next starts: the full menu, then <b>delivery</b> in month 2, <b>loyalty</b> in month 4, the <b>phone app</b> in month 6 and <b>stock</b> in month 8. Accounts are next.',
          'Eight months in, 6 of the 7 pieces are running, and every one has been used by real customers along the way. The first try, after nine months, had 0 pieces in use. If something breaks now, the team looks at the last step first. It is usually there.'
        ],
        tip: 'The week-1 version took shortcuts on purpose, for example one cookie only. Lesson 50, Technical debt, applies: a shortcut is fine as a loan, as long as you pay it back while you grow. And lesson 49, Testing pyramid, said the same thing about tests: a small test that fails tells you where. A small step that fails does too.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'What is the smallest version that works?',
        text: [
          'Before you build something big, ask: <b>"What is the smallest version of this that would actually work and be useful, and can I get it working first?"</b>',
          'Try it on the Kitchen team\'s stock system. The full idea has suppliers, automatic orders, waste tracking and charts. The smallest useful version: the baker types how much <b>flour, butter and chocolate</b> are left at closing time, and the screen shows it. Three numbers. The baker can use it tomorrow.',
          'Then ask what the one next piece is. Perhaps a warning when one of them runs low. Only when that works, and someone uses it, do you add the next.',
          '"Useful" matters as much as "small". A login page with nothing behind it is small, but nobody can use it, so it teaches you nothing about real customers.'
        ],
        tip: 'This is lesson 8, YAGNI, and lesson 5, KISS, at the size of a whole project: build what is needed now, as plainly as you can. Lesson 47, Unix philosophy, is the same idea again: small tools that each work, combined.'
      },
      {
        label: 'When not to', pic: limitPic,
        h: 'Start simple. Do not stay simple, and do not stop thinking.',
        text: [
          '<b>"Start simple" is not "never plan".</b> A working simple system still needs a sensible direction. Maya knew she was heading for all seven pieces. She just did not build them all at once. Some decisions are also hard to change later. Lesson 8, YAGNI, warned about things that are cheap now and impossible later, like how you store customer data and how you keep it safe. Those deserve careful thought before week 1.',
          '<b>Some things cannot be released half-done.</b> Nobody opens half a bridge, or puts half a pacemaker into a patient. There, the same idea shows up earlier: engineers build and test small working models and single parts long before the whole thing is used. Small working things still come first, just out of public view.',
          '<b>A simple first version you never improve is just a small system.</b> If Maya had stopped at week 1, she would have one cookie on a website for ever. Gall\'s law is about growing. Each step should add something.',
          '<b>Simple does not guarantee working.</b> Gall himself wrote that a simple system "may or may not work". Simple is where you can find out quickly, and fix it cheaply.'
        ],
        warn: 'Do not use "start small" as an excuse for no plan, or for skipping the safety and data questions that cannot wait. And do not read "never" as a promise. It is a strong rule of thumb.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'A company spends 14 months designing and building a new booking system. It will replace the old one completely, all on one night. What does Gall\'s law predict?',
        options: ['It will work, because so much planning went into it', 'Many problems at once on switch-on night, and it will be hard to tell which decision caused which', 'It will work, but slowly', 'Nothing. Gall\'s law is only about small systems'],
        answer: 1,
        why: 'Every decision in the plan is a guess. Switching everything on at once tests all the guesses together, so the wrong ones show up together and tangled.',
        hint: 'Think of switch-on day for Maya 2.0.'
      },
      {
        type: 'pick', q: 'The Kitchen team wants a stock system. Which is the best first version, in the spirit of Gall\'s law?',
        options: ['A full system with suppliers, automatic orders and charts, switched on in six months', 'The baker types three numbers at closing time (flour, butter, chocolate) and the screen shows them', 'A 40-page plan of the final system, with no code yet', 'A beautiful stock screen filled with made-up numbers, to show Maya'],
        answer: 1,
        why: 'It is small, it really works, and a real person uses it tomorrow. The made-up screen is small but teaches you nothing about real use.',
        hint: 'Small, working and actually used. All three.'
      },
      {
        type: 'pick', q: 'Look at the two projects. Ten months in, Project A switches everything on and many things break. Why is Project B more likely to know which change caused a problem?',
        pic: quizChart,
        options: ['Project B has more people', 'Project B adds one piece at a time, so a new problem points at the last small step', 'Project B has no problems at all', 'Project B used a better programming language'],
        answer: 1,
        why: 'When only one thing is new, a new failure almost certainly comes from it. When everything is new at once, it could be anything.'
      },
      {
        type: 'order', q: 'Put Maya\'s second try in order.',
        items: ['Ask: what is the smallest useful version?', 'Customers order one cookie and the kitchen sees it', 'Fix the two wrong guesses real customers revealed', 'Add delivery, and check it works', 'Add loyalty points, and check they work'],
        why: 'Small and working first. Learn from real use. Then grow one piece at a time, each one working before the next.',
        hint: 'Nothing gets added until the step before it works.'
      },
      {
        type: 'bucket', q: 'Gall\'s law in action, or big-bang thinking?',
        buckets: ['Grow from working', 'Big bang'],
        items: [
          ['Release a tiny version to a few real customers in week 1', 0],
          ['Add the phone app only after ordering and delivery work', 0],
          ['When something breaks, look at the last small step first', 0],
          ['Design all seven pieces in detail before anyone uses any of them', 1],
          ['Turn off the old system and turn on everything new on one night', 1],
          ['Patch a failed giant launch piece by piece instead of going back to something small', 1]
        ],
        why: 'Gall\'s law grows a system from something that already works. Big-bang thinking bets everything on a design nobody has used yet, and then tries to patch it.'
      },
      {
        type: 'pick', q: 'The week-1 version had no loyalty points and no app, because nobody needed them yet. Which earlier lesson is that?',
        options: ['Lesson 8, YAGNI', 'Lesson 6, DRY', 'Lesson 36, Immutability', 'Lesson 19, Encapsulation'],
        answer: 0,
        why: 'YAGNI: do not build for a future that has not arrived. Gall\'s law adds the reason at project size: each new piece is a new guess, so add it when you can test it for real.',
        hint: '"You aren\'t gonna need it."'
      },
      {
        type: 'match', q: 'Match each moment of the Maya 2.0 story to the law or lesson it shows.',
        pairs: [
          ['On switch-on day, every team blames the join with another team\'s piece', 'Lesson 53, Conway\'s law'],
          ['Behind in month 7, Maya hires four more developers, and it does not help', 'Lesson 54, Brooks\'s law'],
          ['The big plan is switched on at once and fails everywhere', 'Lesson 57, Gall\'s law'],
          ['Week 1 has one cookie only, a shortcut to pay back later', 'Lesson 50, Technical debt']
        ],
        why: 'One project can show several laws at once. They are different lenses on the same people and the same software.'
      },
      {
        type: 'pick', q: 'Which of these are true about Gall\'s law? Pick all that apply.',
        options: ['It comes from John Gall\'s 1975 book about how systems work and fail', 'It is a rule of thumb, not a law of nature', 'It means you should never plan ahead', 'A simple first version that is never improved is not the start of a complex system'],
        answer: [0, 1, 3],
        why: 'Start simple, keep a sensible direction, think hard about the things that cannot change later, and keep growing.',
        hint: 'Three are true. One turns "start simple" into "never think ahead".'
      }
    ]
  });
})();
