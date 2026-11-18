/* Lesson 62: Occam's razor (module 6, the last teaching lesson). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  const line = (x1, y1, x2, y2, col, w, dash) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
  const tick = (x, y) => `<circle cx="${x}" cy="${y}" r="11" fill="${P.ok}" stroke="${P.ink}" stroke-width="2"/><path d="M${x - 5} ${y} l3.5 3.5 l6.5 -7" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`;
  const cross = (x, y) => `<circle cx="${x}" cy="${y}" r="11" fill="${P.danger}" stroke="${P.ink}" stroke-width="2"/><path d="M${x - 4.5} ${y - 4.5} l9 9 M${x + 4.5} ${y - 4.5} l-9 9" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>`;
  const badge = (x, y, n, fill) => `<circle cx="${x}" cy="${y}" r="12" fill="${fill}" stroke="${P.ink}" stroke-width="2"/>` + T(x, y + 4.5, String(n), { s: 12.5, f: '#fff' });
  const weight = (x, y, w, label) => `<rect x="${x}" y="${y}" width="${w}" height="24" rx="6" fill="${P.ink2}" stroke="${P.ink}" stroke-width="2"/>` + (label ? T(x + w / 2, y + 16, label, { s: 10.5, f: '#fff' }) : '');
  const lens = (x, y) => `<line x1="${x + 14}" y1="${y + 14}" x2="${x + 32}" y2="${y + 32}" stroke="${P.ink}" stroke-width="9" stroke-linecap="round"/><line x1="${x + 14}" y1="${y + 14}" x2="${x + 32}" y2="${y + 32}" stroke="${P.warn}" stroke-width="4.5" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="20" fill="${P.tint}" fill-opacity="0.45" stroke="${P.ink}" stroke-width="4"/>`;

  // The four explanations of the $0.00 morning, with the new things each one needs.
  const THEORIES = {
    rel: { who: 'release log', fill: P.ink, col: '#fff', l1: '7:00 release:', l2: "Priya's rename", w: [] },
    db: { who: 'Nina', fill: P.warnT, col: P.warn, l1: 'A rare bug in', l2: 'the database', w: ['an unknown bug', 'strikes today'] },
    hack: { who: 'Tom', fill: P.tint, col: P.accent, l1: 'A hacker', l2: 'broke in', w: ['someone targets us', 'gets past passwords', 'leaves no trace'] },
    clk: { who: 'Sam', fill: P.okT, col: P.ok, l1: 'Server clock,', l2: 'only on Mondays', w: ['clock zone wrong', 'prices use the clock', 'only on Mondays'] }
  };
  const card = (x, y, th, o) => {
    o = o || {};
    const n = th.w.length;
    return (o.weights === false ? '' : th.w.map((w, i) => weight(x + 4, y - 32 - i * 28, 124, o.labels === false ? '' : w)).join('')) +
      box(x, y, 132, 96, o.fill || P.white, 12) +
      `<rect x="${x + 10}" y="${y + 10}" width="${th.who.length * 6.6 + 18}" height="20" rx="10" fill="${th.fill}" stroke="${P.ink}" stroke-width="1.8"/>` +
      T(x + 19 + th.who.length * 3.3, y + 24, th.who, { s: 11, f: th.col }) +
      T(x + 12, y + 56, th.l1, { s: 13, a: 'start' }) + T(x + 12, y + 74, th.l2, { s: 13, a: 'start' }) +
      (o.badge === false ? '' : badge(x + 128, y + 2, n, n ? P.danger : P.ok));
  };

  /* ---------- 1. the idea: check the cheap, common cause first ---------- */
  const ROWS = [
    ['The car will not start', 'Is there fuel?', 'the engine computer'],
    ['The TV is dead', 'Is it plugged in?', 'the circuit board'],
    ['The cake did not rise', 'Baking powder in?', "the oven's thermostat"]
  ];
  const ideaPic = svg(600, 262, 'Three everyday problems. The car will not start: first check for fuel, and only then suspect the engine computer. The TV is dead: first check it is plugged in, only then the circuit board. The cake did not rise: first check the baking powder, only then the oven thermostat.',
    T(110, 30, 'IT WENT WRONG', { s: 12, f: P.danger }) + T(315, 30, 'CHECK FIRST', { s: 12, f: P.ok }) + T(510, 30, 'ONLY THEN', { s: 12, f: P.ink2 }) +
    ROWS.map((r, i) => {
      const y = 48 + i * 68;
      return box(14, y, 192, 46, P.dangerT, 12) + T(110, y + 28, r[0], { s: 13 }) +
        arrow(212, y + 23, 232, y + 23, P.ink2, 2.5) +
        box(238, y, 154, 46, P.okT, 12) + T(315, y + 28, r[1], { s: 13, f: P.ok }) +
        arrow(398, y + 23, 418, y + 23, P.ink2, 2.5) +
        `<rect x="424" y="${y}" width="164" height="46" rx="12" fill="${P.paper2}" stroke="${P.ink2}" stroke-width="2" stroke-dasharray="5 5"/>` + T(506, y + 28, r[2], { s: 12, w: 700, f: P.ink2 });
    }).join('') +
    T(300, 254, 'Cheap to check, and usually the answer. The rare cause waits its turn.', { s: 12.5, w: 700, f: P.ink2 }));

  /* ---------- 2. the story: the theories and their weights ---------- */
  const storyPic = svg(600, 300, 'Three theories, each with the new unseen things it needs. Tom: a hacker broke in, which needs 3: someone targets us, gets past passwords, leaves no trace. Nina: a rare bug in the database, which needs 2: an unknown bug that strikes today. Sam: the server clock, only on Mondays, which needs 3. The fourth card, the release log, needs 0: at 7:00 the release with Priya\'s rename went live, and that is a fact.',
    T(300, 22, 'EACH WEIGHT IS ONE NEW THING THAT WOULD HAVE TO BE TRUE', { s: 11.5, f: P.ink2 }) +
    card(10, 170, THEORIES.hack) + card(158, 170, THEORIES.db) + card(306, 170, THEORIES.clk) +
    card(454, 170, THEORIES.rel, { fill: P.paper2 }) +
    `<rect x="472" y="120" width="96" height="30" rx="8" fill="${P.ok}" stroke="${P.ink}" stroke-width="2" transform="rotate(-4 520 135)"/>` + T(520, 141, 'A FACT', { s: 13, f: '#fff' }) +
    T(76, 290, 'needs 3', { s: 12, f: P.danger }) + T(224, 290, 'needs 2', { s: 12, f: P.danger }) + T(372, 290, 'needs 3', { s: 12, f: P.danger }) + T(520, 290, 'needs 0', { s: 12, f: P.ok }));

  /* ---------- 3. the pain: the morning, on a timeline ---------- */
  const X = m => 40 + m * 3.2; // minutes after 7:00
  const LANES = [['Tom: login records', 0], ['Nina: database bug list', 1], ['Sam: changes the clock', 2]];
  const painPic = svg(600, 300, 'Monday morning on a timeline. 7:00 the release goes live, 7:02 the first order at 0 dollars, 8:00 online orders paused. From 8:15 to 9:15 Tom reads login records, Nina reads the database bug list, Sam changes the server clock. All three find nothing. At 9:15 Maya asks what changed, and by 9:30 it is fixed. The release log sat there all morning, unread.',
    T(300, 20, 'MONDAY MORNING', { s: 12.5, f: P.ink2 }) +
    `<circle cx="${X(2)}" cy="70" r="7" fill="${P.danger}" stroke="${P.ink}" stroke-width="2"/>` + T(X(2) + 12, 52, 'first $0.00 order, 7:02', { s: 11.5, f: P.danger, a: 'start' }) +
    `<circle cx="${X(60)}" cy="70" r="7" fill="${P.warn}" stroke="${P.ink}" stroke-width="2"/>` + T(X(60) + 4, 52, 'orders paused', { s: 11.5, f: P.warn, a: 'start' }) +
    line(30, 70, 580, 70, P.ink, 3) +
    [[0, '7:00'], [60, '8:00'], [75, '8:15'], [135, '9:15'], [150, '9:30']].map(([m, s]) => line(X(m), 64, X(m), 76, P.ink, 2.5) + T(X(m), 94, s, { s: 11.5, w: 700, f: P.ink2 })).join('') +
    LANES.map(([s, i]) => {
      const y = 108 + i * 38;
      return `<rect x="${X(75)}" y="${y}" width="${X(135) - X(75)}" height="28" rx="8" fill="${P.warnT}" stroke="${P.ink}" stroke-width="2"/>` +
        T(X(105), y + 19, s, { s: 11.5 }) + cross(X(135) + 14, y + 14);
    }).join('') +
    box(X(135) + 32, 108, 600 - (X(135) + 32) - 14, 104, P.okT, 12) +
    T(X(135) + 32 + (600 - X(135) - 46) / 2, 132, '9:15', { s: 12, f: P.ok }) +
    T(X(135) + 32 + (600 - X(135) - 46) / 2, 152, 'what', { s: 12, f: P.ok }) +
    T(X(135) + 32 + (600 - X(135) - 46) / 2, 170, 'changed?', { s: 12, f: P.ok }) +
    T(X(135) + 32 + (600 - X(135) - 46) / 2, 198, '9:30 fixed', { s: 11.5, f: P.ok }) +
    box(40, 232, 236, 50, P.white, 12) + T(158, 252, 'RELEASE LOG', { s: 11, f: P.ink2 }) + T(158, 271, '7:00 Priya renamed a setting', { s: 12 }) +
    `<ellipse cx="158" cy="257" rx="136" ry="40" fill="none" stroke="${P.danger}" stroke-width="3" stroke-dasharray="7 6"/>` +
    T(306, 262, 'sat there all morning, unread', { s: 13, f: P.danger, a: 'start' }));

  /* ---------- 4. what to do: lightest first, then the code ---------- */
  const order = ['rel', 'db', 'hack', 'clk'];
  const sortPic = svg(600, 266, 'The four theories sorted by how many new things each needs: the release log with 0, the database bug with 2, the hacker with 3, the clock with 3. They are numbered 1 to 4. The magnifying glass is on number 1, and it has a green tick.',
    T(300, 20, 'LIGHTEST FIRST. CHECK IN THAT ORDER.', { s: 12.5, f: P.ink2 }) +
    order.map((k, i) => {
      const x = 10 + i * 148;
      return card(x, 120, THEORIES[k], { labels: false, badge: i > 0, fill: i === 0 ? P.okT : P.white }) + badge(x + 66, 236, i + 1, P.accent);
    }).join('') +
    tick(138, 122) + lens(30, 226));
  const fixCode = code([
    '# website.py on Monday at 7:00: the bug',
    'prices = settings.get("cookie_prices", {})',
    'def price_of(cookie):',
    '    return prices.get(cookie, 0)',
    '',
    '# website.py at 9:30: the lasting fix',
    'prices = settings["prices"]',
    'def price_of(cookie):',
    '    return prices[cookie]'
  ], { title: 'website.py, before and after', bad: [2, 4], good: [7, 9] });
  const doPic = `<div style="width:100%">${sortPic}${fixCode}</div>`;

  /* ---------- 5. the test: a short checklist ---------- */
  const CHECKS = [
    ['What changed recently?', 'the release log, the history, the last thing anyone touched'],
    ['Can I make it happen again?', 'on purpose, on my own machine'],
    ['Simple, common causes first', 'a typo, a setting, the last change, a loose cable'],
    ['Evidence over stories', 'what did I see, not what would be exciting'],
    ['Only then, the rare and exotic', 'the zebra gets its turn when the horses are ruled out']
  ];
  const testPic = svg(600, 290, 'A five-step checklist for hunting a bug. 1 What changed recently? 2 Can I make it happen again? 3 Simple, common causes first. 4 Evidence over stories. 5 Only then, the rare and exotic.',
    T(300, 22, 'BEFORE YOU CHASE A ZEBRA', { s: 12.5, f: P.ink2 }) +
    CHECKS.map(([a, b], i) => {
      const y = 36 + i * 50;
      return box(20, y, 560, 42, i === 4 ? P.paper2 : P.white, 10) + badge(46, y + 21, i + 1, i === 4 ? P.ink2 : P.accent) +
        T(70, y + 19, a, { s: 13.5, a: 'start' }) + T(70, y + 35, b, { s: 11, w: 700, f: P.ink2, a: 'start' });
    }).join(''));

  /* ---------- 6. when not to: an order, not an answer ---------- */
  const limitPic = svg(600, 300, 'Left: the razor sets the order to check, not the answer. The kitchen screen freezes. 1, a recent change: ruled out. 2, a loose cable: ruled out. 3, a rare bug in the screen software: that was it. Right: when a cause would be dangerous, check it early anyway. Unknown 3 am login? Someone rules out a break-in at once, alongside the usual order.',
    T(150, 22, 'AN ORDER, NOT AN ANSWER', { s: 12, f: P.accent }) + T(450, 22, 'DANGEROUS? CHECK IT EARLY TOO', { s: 12, f: P.danger }) +
    T(150, 44, 'The kitchen screen freezes', { s: 12, w: 700, f: P.ink2 }) +
    [['a recent change', 'none on the log', false], ['a loose cable', 'cables are fine', false], ['a rare screen bug', 'the maker confirms it', true]].map(([a, b, ok], i) => {
      const y = 60 + i * 66;
      return box(30, y, 240, 52, ok ? P.okT : P.white, 12) + badge(52, y + 26, i + 1, P.accent) +
        T(72, y + 23, a, { s: 13, a: 'start' }) + T(72, y + 41, b, { s: 11, w: 700, f: ok ? P.ok : P.ink2, a: 'start' }) +
        (ok ? tick(256, y + 26) : cross(256, y + 26));
    }).join('') +
    T(150, 276, 'Ruled out by evidence, in order.', { s: 12, w: 700, f: P.ink2 }) + T(150, 294, 'Sometimes it really is the zebra.', { s: 12, w: 700, f: P.ok }) +
    `<line x1="300" y1="36" x2="300" y2="290" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    box(330, 52, 250, 46, P.dangerT, 12) + T(455, 72, 'Prices $0.00, AND an unknown', { s: 12, f: P.danger }) + T(455, 89, 'login at 3 am in the records', { s: 12, f: P.danger }) +
    arrow(400, 104, 400, 140, P.ink2, 2.5) + arrow(510, 104, 510, 140, P.danger, 2.5) +
    box(330, 146, 120, 70, P.white, 12) + T(390, 172, 'usual order:', { s: 11.5, f: P.ink2 }) + T(390, 192, 'last change,', { s: 12 }) + T(390, 208, 'settings...', { s: 12 }) +
    box(462, 146, 118, 70, P.dangerT, 12) + T(521, 172, 'at the same', { s: 11.5, f: P.danger }) + T(521, 190, 'time: rule out', { s: 12 }) + T(521, 206, 'a break-in', { s: 12 }) +
    T(455, 252, 'Likely goes first. Dangerous', { s: 12, w: 700, f: P.ink2 }) + T(455, 270, 'is not left until last.', { s: 12, w: 700, f: P.ink2 }));

  COURSE.add({
    id: 'l62', minutes: 8,
    summary: 'When something goes wrong, line up the explanations that fit the facts and check first the one that needs the <b>fewest new assumptions</b>. It is not always right, but it is the cheapest to check and the most often right. That is Occam\'s razor.',
    video: {
      src: 'videos/l62-occams-razor.mp4', poster: 'videos/l62-occams-razor.jpg', length: '1 min 17 s',
      script: [
        "Monday, 7 in the morning. Every cookie on Maya's website suddenly costs 0 dollars.",
        "The team gathers, and the theories fly. Tom says a hacker broke in. Nina blames a rare bug in the database. Sam suspects the new server's clock, but only on Mondays.",
        'Each theory needs new things to be true, things nobody has seen. Count them. The hacker needs 3. The database bug, 2. The clock, 3. The team spends an hour chasing them, and finds nothing.',
        'Then Maya asks a boring question. What changed? The release log has one line. At 7, one change went live. Priya renamed the price setting. That needs nothing new. It is a fact.',
        'So line the theories up, lightest first, and check them in that order. 10 minutes to confirm. 5 to fix.',
        'The razor shaves away what the evidence does not need. It does not promise that the simplest story is true. It tells you where to look first.',
        "That is Occam's razor. Among explanations that fit the facts, start with the one that needs the fewest new assumptions. Next, the final exam."
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Is it plugged in?',
        text: [
          'The car will not start. You could suspect the engine computer. Or you could first check whether there is fuel in the tank. The TV is dead: is it plugged in? The cake did not rise: did the baking powder go in?',
          'Each time, two explanations fit what you can see. The fancy one needs <b>several new things</b> to be true, none of which you have seen. The plain one needs almost nothing new. So you check the plain one first. It is cheap to check, and it is usually the answer.',
          'That is <b>Occam\'s razor</b>: among explanations that fit the evidence equally well, start with the one that needs the <b>fewest new assumptions</b>. An assumption here means something you would have to believe without having seen it. The "razor" is a picture: you shave away every assumption the evidence does not need.',
          'Read the rule carefully. It does <b>not</b> say the simplest explanation is always true. It says which one to <b>check first</b>. If the evidence rules it out, you move on to the next. You add complexity only when the evidence asks for it.',
          'This is not lesson 5, KISS, again. KISS is about how you <b>build</b> things: the plainest design that works. Occam\'s razor is about how you <b>explain</b> things, above all when you are hunting a bug.'
        ],
        tip: 'William of Ockham was an English Franciscan friar and philosopher who lived from about 1287 to 1347. The famous Latin slogan, "entities should not be multiplied beyond necessity", is a later wording: those exact words are not in his surviving writings. They were written down in 1639 by John Punch, an Irish friar, who called the idea a common saying. Ockham did write similar lines, such as "plurality should never be posited without necessity". The name "Occam\'s razor" came centuries after his death. Doctors have a close cousin: "When you hear hoofbeats, think horses, not zebras." It is usually traced to Dr Theodore Woodward, who taught medical students at the University of Maryland from the late 1940s. Like every "law" in this module, the razor is a rule of thumb, not a law of nature.'
      },
      {
        label: 'The story', pic: storyPic,
        h: 'Every cookie costs $0.00.',
        text: [
          'Every Monday at 7:00, the week\'s finished changes in Maya\'s company go live together. That is called a <b>release</b>, and the <b>release log</b> lists every change in it.',
          'This Monday at 7:02, the first online order arrives. Choc chip, normally $3.00, costs <b>$0.00</b>. So does everything else. By 8:00 Maya has paused online orders, and at 8:15 the team gathers. You met them in lesson 53, Conway\'s law: Website (Priya and Tom), Kitchen (the baker and Nina) and Money (the accountant and Sam).',
          'The theories fly. <b>Tom</b>: "A hacker broke in." <b>Nina</b>: "A rare bug in the database software." <b>Sam</b>: "The new rented server from lesson 48 has a strange clock problem. And it only happens on Mondays."',
          'Each theory fits the facts. Each one would explain $0.00. But look at what each one <b>needs</b>, things nobody has seen. The hacker needs 3: someone chose to attack a small cookie shop, got past the passwords, and left no trace. The database bug needs 2: a bug nobody has reported, which struck this morning after years without trouble. The clock needs 3: the server\'s time zone is wrong, the price code reads the clock at all, and it goes wrong only on Mondays.',
          'And there is one more explanation, on the release log. At 7:00 one change went live: on Friday, <b>Priya renamed the price setting</b>, from <code>cookie_prices</code> to <code>prices</code>, because the shop now sells cakes and gift boxes too. This one needs <b>0</b> new things. The change is a fact. It went live two minutes before the first $0.00 order. And it touched the prices.'
        ],
        tip: 'Counting assumptions is not exact science. You could argue for 2 or 4 on the hacker. The point is the difference between "several unseen things" and "nothing unseen at all".'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'An hour on the exciting theories.',
        text: [
          'Nobody checks the release log. Each person rushes off to chase their own theory. Tom spends an hour reading login records. Nina reads the database maker\'s list of known bugs. Sam changes the server\'s time zone and restarts it, which adds a <b>second</b> change to a system that is already misbehaving.',
          'At 9:15 all three come back with nothing. Online orders have been paused for over an hour.',
          'Why did smart people start with the least likely ideas? The exciting theories are more fun to chase. Each person picked the one that fits their own corner of the company. And a hacker or a strange bug is nobody in the room\'s fault. Priya even thought of her rename, and dismissed it: "It is just a name. It can\'t change any prices."',
          'The plain explanation was sitting on the release log the whole time, one line long, unread.'
        ],
        warn: 'Nobody here is foolish. Chasing the interesting theory is a very human habit. The razor exists because it is so easy to skip the boring question.'
      },
      {
        label: 'What to do', pic: doPic,
        h: 'Lightest first. Check in that order.',
        text: [
          'At 9:15 Maya asks the boring question: <b>"What changed?"</b> Then she lines the theories up by how many new things each one needs, and checks them in that order. Not because the lightest must be right, but because it is the <b>cheapest to check</b> and the <b>most often right</b>.',
          'The release comes first, with 0. Priya opens <code>website.py</code>. Line 2 still asks for the old name, <code>cookie_prices</code>. <code>.get</code> is new here: <code>settings.get("cookie_prices", {})</code> means "look this up, and if it is not there, hand back an empty table instead of stopping". Then line 4, <code>prices.get(cookie, 0)</code>, means "if this cookie is not in the table, hand back 0". Two quiet defaults in a row. The missing setting became an empty table, and every price became 0. No error anywhere.',
          'She checks it on her laptop. With the new settings, choc chip shows $0.00. With the old name, $3.00. <b>Confirmed in 10 minutes.</b> She changes line 2 to the new name. <b>Fixed 5 minutes later</b>, at 9:30. Sam puts the clock back.',
          'Then the lasting fix, in the lower half of the code. <code>settings["prices"]</code> with square brackets does not forgive. If the name is missing, Python stops at once with <code>KeyError: \'prices\'</code>, as in lesson 46. That is lesson 22, Fail fast. Next time a setting goes missing, the website refuses to start and names it. The simple explanation shouts instead of hiding.',
          'Why are boring causes so often the answer? Lesson 59, Pareto principle, said a few causes are behind most of the effects. Bugs are like that: a typo, a missing setting and the last change cause a large share of them. And lesson 61, Kernighan\'s law, said debugging is twice as hard as writing, so write code plain enough to debug. Plain, strict code makes the simple explanation easy to see. Two forgiving defaults hid it for an hour.'
        ],
        tip: 'Lesson 41, Robustness principle, warned about exactly this: forgive harmless differences at the edge, but be strict inside your own system and in anything that touches money. A price that quietly becomes 0 touches money.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Have I checked the plain one first?',
        text: [
          'When something goes wrong, ask: <b>"Which explanation fits the facts with the fewest extra things that would also have to be true, and have I checked that one first?"</b>',
          'In practice it is a short checklist. 1. <b>What changed recently?</b> The release log, the history from lesson 56, the last thing anyone touched. 2. <b>Can I make it happen again</b>, on purpose? 3. Check the <b>simple, common causes</b> first: a typo, a setting, the last change, the cable that is unplugged. 4. Trust <b>evidence over stories</b>. "Someone saw it" beats "it would make sense". 5. <b>Only then</b>, the rare and exotic.',
          'It is the same habit as lesson 10, Premature optimisation: measure, do not guess. Maya once spent a weekend speeding up the wrong code because she was sure. A guess that feels clever is still a guess.'
        ],
        tip: 'That was the last new idea in this course. Lesson 63, the Final exam, hands you one messy program and asks you to spot many of the principles at once. You have met every one of them. Go and show what you know.'
      },
      {
        label: 'When not to', pic: limitPic,
        h: 'An order to check, not the answer.',
        text: [
          '<b>Simplest is not always right.</b> A month later the kitchen screen freezes once a week. Nina checks in order. The release log shows no recent change. The cables and the power are fine. She cannot make it happen on purpose. The evidence rules out each simple cause, so she moves on, and the screen\'s maker confirms a rare bug in its software. It really was the zebra. The razor told her the order. It never promised the answer.',
          '<b>The simple story must fit all the facts.</b> Suppose the books from the Money team had also shown $0.00 sales. The books do not read the website\'s settings, so Priya\'s rename could not explain that. A simple story that leaves a fact unexplained is not Occam. It is jumping to conclusions. Keep looking.',
          '<b>"Simple" means fewer assumptions.</b> It does not mean the one you like, the one you thought of first, or the one that blames someone else. Overdoing it looks like this: Maya loves this lesson and, for every bug, undoes the last change at once. One day a bug started on Thursday and the last change was Friday. She undid good work, and the bug stayed.',
          '<b>Danger changes the order.</b> In security and safety, also rule out the dangerous possibility early, even when it is less likely. If the login records had shown an unknown login at 3 am, someone should check for a break-in straight away, alongside the usual order. Missing a likely cause costs an hour. Missing a break-in can cost far more.'
        ],
        warn: 'The razor is a way to choose where to look first, not a way to stop looking. Like every law in this module, it is a rule of thumb that experience keeps confirming, not a law of nature.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'Since this morning, the receipt printer prints nothing at all. Which explanation should you check first?',
        options: ['A power cut damaged the printer\'s memory chip overnight', 'The paper roll has run out', 'A virus on the till is blocking only the printer', 'The printer maker sent a secret update that broke it'],
        answer: 1,
        why: 'All four would explain a printer that prints nothing. The empty roll needs no new, unseen events, and it takes five seconds to check. Start there.',
        hint: 'Which one needs nothing unusual to have happened?'
      },
      {
        type: 'bucket', q: 'In the $0.00 story: evidence the team has seen, or a story nobody has checked?',
        buckets: ['Evidence', 'Unchecked story'],
        items: [
          ['The release log shows one change at 7:00', 0],
          ['The first $0.00 order came at 7:02', 0],
          ['On Priya\'s laptop, the old name shows $3.00', 0],
          ['A hacker covered their tracks', 1],
          ['The database software has a hidden bug', 1],
          ['The problem only happens on Mondays', 1]
        ],
        why: 'Only one Monday has been seen, so "only on Mondays" is a guess. Evidence is what someone saw. The razor weighs the stories by how much unseen stuff they need.'
      },
      {
        type: 'order', q: 'Put Maya\'s way of hunting a bug in order.',
        items: ['Ask what changed recently', 'Try to make it happen again', 'Check the simple, common causes', 'Only then, check the rare and exotic ones', 'Fix it, and make it fail loudly next time'],
        why: 'Cheap and common first, exotic last. The last step makes the next simple cause easy to see.',
        hint: 'Start with the cheapest question of all.'
      },
      {
        type: 'pick', q: 'This code turned a missing setting into $0.00 with no error. Which earlier lesson would have made the bug shout instead?',
        pic: code([
          'prices = settings.get("cookie_prices", {})',
          '',
          'def price_of(cookie):',
          '    return prices.get(cookie, 0)'
        ], { title: 'website.py' }),
        options: ['Lesson 22, Fail fast', 'Lesson 8, YAGNI', 'Lesson 6, DRY', 'Lesson 13, Boy Scout rule'],
        answer: 0,
        why: 'Fail fast says: stop at the first sign of trouble and say what is wrong. settings["prices"] stops with KeyError: \'prices\', and the simple explanation is right there in the message.',
        hint: 'Which lesson is about stopping at once when something is wrong?'
      },
      {
        type: 'pick', q: 'Which sentence is Occam\'s razor, and not lesson 5, KISS?',
        options: ['Write the plainest code that solves today\'s problem', 'Among explanations that fit the facts, check first the one that needs the fewest new assumptions', 'Do not build features nobody has asked for', 'Give every fact one home in the code'],
        answer: 1,
        why: 'KISS is about how you build. The razor is about how you explain what you see. The others are KISS, YAGNI and Single source of truth.'
      },
      {
        type: 'match', q: 'Match each story to the law from this module that it shows.',
        pairs: [
          ['Four contractors join a late project, and it ships a week later', 'Lesson 54, Brooks\'s law'],
          ['Partner programs break when the API stops answering in capitals', 'Lesson 55, Hyrum\'s law'],
          ['A "pointless" check is deleted, and the till freezes on free cookies', 'Lesson 56, Chesterton\'s fence'],
          ['The team chases a hacker while the release log shows one change', 'Lesson 62, Occam\'s razor']
        ],
        why: 'Each law is a different lens on people and projects. The last one is about how you explain what went wrong.'
      },
      {
        type: 'pick', q: 'Prices show $0.00 after a release. The login records also show an unknown login at 3 am. What should the team do?',
        options: ['Only check the release, because it is the simplest explanation', 'Check the release first, and also have someone rule out a break-in straight away', 'Ignore the release and hunt the hacker all day', 'Wait to see if it happens again tomorrow'],
        answer: 1,
        why: 'The razor sets the usual order, but danger changes it. A break-in is less likely, but missing one is costly, so rule it out early as well.',
        hint: 'One of these causes is likely. The other is dangerous.'
      },
      {
        type: 'pick', q: 'Which of these are true about Occam\'s razor? Pick all that apply.',
        options: ['It says the simplest explanation is always true', 'It tells you which explanation to check first', '"Simple" means fewest new assumptions, not "the one I like"', 'The Latin slogan is a later wording, not a sentence from Ockham\'s surviving writings', 'It is a law of nature'],
        answer: [1, 2, 3],
        why: 'It is a rule of thumb about where to look first. When the evidence rules the simple explanation out, you move on.'
      }
    ]
  });
})();
