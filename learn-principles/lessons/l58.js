/* Lesson 58: Goodhart's law (module 6). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;
  const DARK = '#15132B', LIGHT = '#ECEAFF', SOUP = '#F3B562', COLD = '#CFE3EE', FLAME = '#FF8A3D';

  const line = (x1, y1, x2, y2, col, w, dash) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
  const flame = (x, y, s) => `<path d="M${x} ${y} q${-9 * s} ${-12 * s} 0 ${-30 * s} q${9 * s} ${18 * s} 0 ${30 * s} z" fill="${FLAME}" stroke="${P.ink}" stroke-width="2"/>`;

  /* A thermometer: tube from y0 to y1, bulb under it, filled to fraction f (0 to 1). */
  function thermo(x, y0, y1, f, col) {
    const h = y1 - y0, top = y1 - h * f;
    return `<rect x="${x - 9}" y="${y0}" width="18" height="${h + 6}" rx="9" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
      `<rect x="${x - 4}" y="${top}" width="8" height="${y1 - top + 6}" fill="${col}"/>` +
      `<circle cx="${x}" cy="${y1 + 16}" r="15" fill="${col}" stroke="${P.ink}" stroke-width="2.5"/>`;
  }
  /* A pot on a stove. hot: soup colour, steam and a flame under it. */
  function pot(x, y, hot) {
    return (hot ? [x + 40, x + 80, x + 120].map(sx => `<path d="M${sx} ${y - 8} q-10 -14 0 -28 q10 -14 0 -28" fill="none" stroke="${P.ink2}" stroke-width="2.5" stroke-linecap="round"/>`).join('') : '') +
      `<path d="M${x} ${y} h160 v66 q0 22 -22 22 h-116 q-22 0 -22 -22 z" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
      `<rect x="${x + 6}" y="${y + 8}" width="148" height="18" fill="${hot ? SOUP : COLD}"/>` +
      line(x - 12, y, x + 172, y, P.ink, 5) +
      line(x - 10, y + 104, x + 170, y + 104, P.ink, 5) +
      (hot ? flame(x + 50, y + 100, 0.8) + flame(x + 80, y + 100, 1) + flame(x + 110, y + 100, 0.8) : '');
  }

  /* ---------- 1. the idea: a thermometer, then a lighter ---------- */
  const ideaPic = svg(600, 330, 'Left: a thermometer standing in a hot pot of soup reads high because the soup is hot. Right: someone told to get the thermometer to 100 holds a lighter to it. It reads 100 while the soup is cold.',
    T(150, 24, 'A MEASURE', { s: 12.5, f: P.ok }) + T(450, 24, 'A TARGET: "GET IT TO 100"', { s: 12.5, f: P.danger }) +
    pot(70, 180, true) + thermo(130, 56, 170, 0.7, P.danger) +
    box(166, 74, 70, 34, P.white, 10) + T(201, 97, '70°', { s: 15 }) +
    T(150, 316, 'the number moves with the heat', { s: 12.5, w: 700, f: P.ink2 }) +
    `<line x1="300" y1="40" x2="300" y2="320" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    pot(390, 180, false) + thermo(355, 56, 170, 1, P.danger) +
    `<rect x="336" y="228" width="38" height="56" rx="7" fill="${P.accent}" stroke="${P.ink}" stroke-width="2.5"/>` + flame(355, 222, 1) +
    box(380, 74, 80, 34, P.white, 10) + T(420, 97, '100°', { s: 15, f: P.danger }) +
    T(498, 166, 'still cold', { s: 12.5, f: P.accent }) +
    T(450, 316, 'the number goes up, the soup does not', { s: 12.5, w: 700, f: P.ink2 }));

  /* ---------- 2. the story: the tests written for the number ---------- */
  const gameTests = [
    '# tests added in February',
    'def test_final_total():',
    '    final_total(10)',
    '    final_total(20)',
    '    final_total(100)',
    '',
    'def test_shop_name():',
    '    assert shop_name() == "Maya\'s Cookies"'
  ];
  /* 100 squares, one per line of code: green = run by a test, grey = not run, red = the voucher code. */
  const grid = (x, y, green, red) => Array.from({ length: 100 }, (_, i) =>
    `<rect x="${x + (i % 10) * 16}" y="${y + Math.floor(i / 10) * 16}" width="13" height="13" rx="3" fill="${i < green ? P.ok : i >= 100 - red ? P.danger : '#C9C3B8'}"/>`).join('');
  const storyPic = `<div style="width:100%">` + svg(600, 300, 'Left: in January, 55 of every 100 lines of code are run by the tests. Middle: Maya\'s notice, every team 90 percent by March, bonuses depend on it. Right: in March, 92 of 100 lines are run. The 8 left over are the voucher code.',
    T(100, 24, 'JANUARY', { s: 12.5, f: P.ink2 }) + box(14, 38, 186, 186, DARK, 14) + grid(28, 52, 55, 0) +
    T(107, 252, '55 of 100 lines run', { s: 12.5, w: 700, f: P.ok }) + T(107, 274, 'coverage: 55%', { s: 12.5, f: P.ok }) +
    box(222, 80, 156, 136, '#FFF6D8', 10) + T(300, 106, 'FROM MAYA', { s: 11.5, f: P.warn }) +
    T(300, 136, 'Every team:', { s: 14 }) + T(300, 160, '90% by March.', { s: 14 }) + T(300, 192, 'Bonuses depend on it.', { s: 12.5, f: P.danger }) +
    T(500, 24, 'MARCH', { s: 12.5, f: P.ink2 }) + box(400, 38, 186, 186, DARK, 14) + grid(414, 52, 92, 8) +
    T(493, 252, '92 of 100 lines run', { s: 12.5, w: 700, f: P.ok }) + T(493, 274, 'the 8 red ones: vouchers', { s: 12.5, f: P.danger })) +
    code(gameTests, { title: 'tests/test_extra.py', bad: [3, 4, 5], hi: [8] }) + `</div>`;

  /* ---------- 3. the pain: the chart ---------- */
  const months = ['Jan', 'Feb', 'Mar', 'Apr'];
  const cov = [55, 71, 92, 92], bugs = [3, 3, 4, 6];
  const cx = i => 110 + i * 130;
  const cy = v => 270 - v * 2.2;          // coverage: 0 to 100 percent
  const by = v => 270 - v * 30;           // bugs: 0 to 7
  const chartPic = svg(600, 360, 'A chart from January to April. Test coverage rises from 55 to 71 to 92 and stays at 92. Bugs that reached customers go 3, 3, 4, then 6 in April. The number went up. The real thing did not get better.',
    T(300, 22, 'THE NUMBER, AND THE REAL THING', { s: 12.5, f: P.ink2 }) +
    line(70, 270, 530, 270, P.ink, 2.5) + line(70, 50, 70, 270, P.ink, 2.5) +
    [0, 50, 100].map(v => T(62, cy(v) + 5, v + '%', { s: 11.5, w: 700, f: P.ok, a: 'end' }) + (v ? line(70, cy(v), 530, cy(v), P.sand, 1.5, '4 6') : '')).join('') +
    months.map((m, i) => T(cx(i), 292, m, { s: 12.5, w: 700, f: P.ink2 })).join('') +
    `<polyline points="${cov.map((v, i) => cx(i) + ',' + cy(v)).join(' ')}" fill="none" stroke="${P.ok}" stroke-width="4" stroke-linejoin="round"/>` +
    cov.map((v, i) => `<circle cx="${cx(i)}" cy="${cy(v)}" r="6" fill="${P.ok}" stroke="${P.ink}" stroke-width="2"/>` + T(cx(i), cy(v) - 12, v + '%', { s: 12, f: P.ok })).join('') +
    `<polyline points="${bugs.map((v, i) => cx(i) + ',' + by(v)).join(' ')}" fill="none" stroke="${P.danger}" stroke-width="4" stroke-dasharray="10 7" stroke-linejoin="round"/>` +
    bugs.map((v, i) => `<circle cx="${cx(i)}" cy="${by(v)}" r="6" fill="${P.danger}" stroke="${P.ink}" stroke-width="2"/>` + T(cx(i) + 2, by(v) + 22, String(v), { s: 12, f: P.danger })).join('') +
    line(530, 50, 530, 270, P.danger, 2) + [0, 3, 6].map(v => T(538, by(v) + 5, String(v), { s: 11.5, w: 700, f: P.danger, a: 'start' })).join('') +
    line(90, 318, 120, 318, P.ok, 4) + T(128, 323, 'test coverage', { s: 12.5, a: 'start', f: P.ok }) +
    line(300, 318, 330, 318, P.danger, 4, '10 7') + T(338, 323, 'bugs that reached customers', { s: 12.5, a: 'start', f: P.danger }) +
    T(300, 350, 'The number said "safer". The customers said otherwise.', { s: 12.5, w: 700, f: P.ink2 }));

  /* ---------- 4. what to do ---------- */
  const card = (x, y, w, title, val, sub, fill, col) => box(x, y, w, 92, fill, 14) +
    T(x + w / 2, y + 24, title, { s: 11.5, f: P.ink2 }) + T(x + w / 2, y + 58, val, { s: 22, f: col || P.ink }) + T(x + w / 2, y + 80, sub, { s: 11.5, w: 700, f: P.ink2 });
  const rep = [['order.py', '100%'], ['menu.py', '98%'], ['website pages', '95%'], ['vouchers.py', '0%']];
  const fixPic = svg(600, 400, 'Top: the coverage report read as a map. vouchers.py is at 0 percent, ringed, with a note: write real tests here first. Bottom: three numbers Maya now reads together: coverage 92 percent, bugs that reached customers 6 in April, and 3 days for a change to go live. A note says: for learning, not for pay.',
    T(300, 22, 'READ COVERAGE AS A MAP OF WHAT IS NOT TESTED', { s: 12.5, f: P.ink2 }) +
    box(40, 36, 300, 160, P.white, 14) +
    rep.map((r, i) => T(62, 70 + i * 36, r[0], { s: 13, m: true, a: 'start', f: i === 3 ? P.danger : P.ink }) +
      T(318, 70 + i * 36, r[1], { s: 13, m: true, a: 'end', f: i === 3 ? P.danger : P.ok })).join('') +
    `<path d="M46 175 C44 148 338 146 338 173 C338 200 44 202 48 166" fill="none" stroke="${P.danger}" stroke-width="3" stroke-linecap="round"/>` +
    arrow(350, 170, 386, 150, P.danger, 3) +
    box(392, 100, 176, 76, P.dangerT, 14) + T(480, 130, 'write real tests', { s: 13.5, f: P.danger }) + T(480, 154, 'here first', { s: 13.5, f: P.danger }) +
    T(300, 232, 'THEN READ SEVERAL NUMBERS TOGETHER', { s: 12.5, f: P.ink2 }) +
    card(30, 248, 170, 'COVERAGE', '92%', 'tests run the code', P.okT, P.ok) +
    card(215, 248, 170, 'BUGS AT CUSTOMERS', '6', 'in April', P.dangerT, P.danger) +
    card(400, 248, 170, 'CHANGE TO LIVE', '3 days', 'and done safely', P.tint, P.accent) +
    T(300, 382, 'For learning, not for pay. Nobody\'s bonus moves with these.', { s: 13, w: 700, f: P.ink2 }));

  /* ---------- 5. the test: how could it be gamed? ---------- */
  const rows = [
    ['lines of code per week', 'copy and paste, never delete', 'no'],
    ['tickets closed per week', 'split one job into five tickets', 'no'],
    ['test coverage', 'tests that check nothing', 'no'],
    ['orders that arrived right', 'only by getting orders right', 'yes']
  ];
  const testPic = svg(600, 330, 'A table with four numbers. Lines of code per week can be raised by copying and pasting. Tickets closed per week by splitting one job into five tickets. Test coverage by tests that check nothing. Orders that arrived right can only be raised by getting orders right.',
    T(130, 24, 'THE NUMBER', { s: 12, f: P.ink2 }) + T(370, 24, 'THE CHEAPEST WAY TO RAISE IT', { s: 12, f: P.ink2 }) + T(548, 24, 'REAL?', { s: 12, f: P.ink2 }) +
    rows.map((r, i) => {
      const y = 38 + i * 70, good = r[2] === 'yes';
      return box(20, y, 560, 56, good ? P.okT : P.white, 12) +
        T(36, y + 34, r[0], { s: 13.5, a: 'start' }) + T(250, y + 34, r[1], { s: 13, w: 700, a: 'start', f: P.ink2 }) +
        `<circle cx="548" cy="${y + 28}" r="16" fill="${good ? P.ok : P.danger}" stroke="${P.ink}" stroke-width="2.5"/>` +
        (good ? `<path d="M540 ${y + 29} l6 6 l11 -12" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`
          : line(542, y + 22, 554, y + 34, '#fff', 3.5) + line(554, y + 22, 542, y + 34, '#fff', 3.5));
    }).join(''));

  /* ---------- 6. when not to ---------- */
  const limitPic = svg(600, 300, 'Left: Maya\'s stopwatch from lesson 10, a number used to learn where the time goes. Middle: the flour store room with a line at 2 sacks. There the number is the real thing. Right: a thermometer nobody is paid for, reading the soup honestly.',
    T(100, 28, 'MEASURE TO LEARN', { s: 12, f: P.ok }) + T(300, 28, 'THE NUMBER IS THE THING', { s: 12, f: P.ok }) + T(500, 28, 'NOBODY PAID FOR IT', { s: 12, f: P.ok }) +
    `<circle cx="100" cy="140" r="56" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<rect x="90" y="70" width="20" height="14" rx="3" fill="${P.ink}"/>` + line(100, 140, 100, 100, P.ink, 4) + line(100, 140, 128, 152, P.danger, 4) +
    T(100, 230, 'lesson 10: measure', { s: 12.5, w: 700, f: P.ink2 }) + T(100, 250, 'before you guess', { s: 12.5, w: 700, f: P.ink2 }) +
    `<line x1="200" y1="40" x2="200" y2="280" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    [0, 1, 2].map(i => `<path d="M${250 + i * 36} 168 v-44 q0 -10 8 -14 l-4 -8 h24 l-4 8 q8 4 8 14 v44 z" fill="${P.paper2}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>`).join('') +
    line(232, 170, 368, 170, P.ink, 4) + T(300, 196, 'rule: at least 2 sacks', { s: 12.5, f: P.danger }) +
    T(300, 230, 'flour in the store room', { s: 12.5, w: 700, f: P.ink2 }) + T(300, 250, 'is what you care about', { s: 12.5, w: 700, f: P.ink2 }) +
    `<line x1="400" y1="40" x2="400" y2="280" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    pot(420, 120, true) + thermo(480, 46, 110, 0.6, P.danger) +
    T(500, 250, 'an honest reading', { s: 12.5, w: 700, f: P.ink2 }));

  /* ---------- quiz pictures ---------- */
  const quizTests = code([
    'def test_a():',
    '    assert final_total(20) == 19.62',
    '',
    'def test_b():',
    '    final_total(100)',
    '',
    'def test_c():',
    '    assert final_total(10) == 10.90'
  ], { title: 'three tests' });

  COURSE.add({
    id: 'l58', minutes: 8,
    summary: 'A number is useful because it <b>moves with</b> the thing you really care about. Reward people for moving the number itself, and they find ways to move it that leave the real thing behind. That is Goodhart\'s law: <b>when a measure becomes a target, it stops being a good measure</b>.',
    video: {
      src: 'videos/l58-goodharts-law.mp4', poster: 'videos/l58-goodharts-law.jpg', length: '1 min 5 s',
      script: [
        'Maya\'s company has a new number. Test coverage. It shows how much of the code the tests really run. In January, it says 55%.',
        'It works like a thermometer in a pot. It moves with the real thing.',
        'Then Maya makes it a target. 90% by March, with a bonus.',
        'By March, it reads 92. But look at the new tests. They run the code, and check nothing. A test like this can never fail.',
        'And the risky code, the vouchers, still has no tests.',
        'In April, a voucher bug reaches customers. The number said safe. It was wrong.',
        'Nobody heated the soup. They held a lighter to the thermometer.',
        'So Maya drops the bonus. She reads coverage for what it shows: where tests are missing. And she watches it next to bugs that reach customers.',
        'That is Goodhart\'s law. When a measure becomes a target, it stops being a good measure.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Hold a lighter to the thermometer.',
        text: [
          'Put a thermometer in a pot of soup. As the soup heats up, the number climbs. The number is useful for one reason only: it <b>moves with</b> the heat you care about.',
          'Now tell someone: "Your job is to get that thermometer to 100." The quickest way is not to cook. It is to hold a lighter to the thermometer. The number shoots up. The soup stays cold. And the thermometer is now useless, because it no longer tells you anything about the soup.',
          'That is <b>Goodhart\'s law</b>. A number is a good measure while people are looking at it to learn. Once people are <b>rewarded for moving the number itself</b>, they find ways to move it that do not move the real thing. The link breaks. The number goes up while the real thing stays still, or gets worse.',
          'You have seen this outside software. A school judged only on exam scores starts teaching only the exam. A call centre judged on short calls starts hurrying, or even dropping, the difficult callers. Nobody needs to be a villain. People simply do what they are rewarded for.',
          'Like the other laws in this module, it is <b>an observation, not a law of nature</b>: a pattern that keeps turning up wherever people are judged by numbers.'
        ],
        tip: 'The idea is named after <b>Charles Goodhart</b>, a British economist. In 1975, writing about how the Bank of England tried to steer the economy by targeting money figures, he put it like this: "Any observed statistical regularity will tend to collapse once pressure is placed upon it for control purposes." The famous short sentence, "When a measure becomes a target, it ceases to be a good measure", is not Goodhart\'s own wording. It is a summary by the anthropologist <b>Marilyn Strathern</b>, in a 1997 paper about how British universities were rated. The idea is Goodhart\'s. The sentence is Strathern\'s. You may also hear about a reward for dead cobras that led people to breed cobras. It is a well-known story, but it may never have happened.'
      },
      {
        label: 'The story', pic: storyPic,
        h: '55% to 92% by March.',
        text: [
          'Maya\'s company now has three teams: Website (Priya and Tom), Kitchen (the baker and Nina) and Money (the accountant and Sam). Since lesson 49, Testing pyramid, they all write tests.',
          'Maya reads that good teams watch their <b>test coverage</b>: the share of the lines of code that are run at least once while the tests run. A tool counts it for you. In January, the company is at <b>55%</b>. Nobody has tried to raise it, so it is honest. Where the tests are careful, it is high. Where tests are missing, it is low.',
          'Maya makes an announcement: <b>"Every team must reach 90% coverage by March. Bonuses depend on it."</b>',
          'By March the company is at <b>92%</b>. Now look at how. The test on lines 2 to 5 calls <code>final_total</code> three times. Python runs every line inside <code>final_total</code>, so the tool counts them all as covered. But there is no <code>assert</code>, the "this must be true" from lesson 49. The test never checks an answer. It <b>cannot fail</b>. Even if <code>final_total</code> charged a thousand times too much, it would still pass.',
          'Lines 7 and 8 test that the shop\'s name is the shop\'s name. It is quick to write and covers a line, but nobody has ever got that wrong.',
          'And the risky code? The new <b>voucher</b> code from the Money team talks to the voucher book from lesson 28. To test it you need a stand-in book, as in lesson 33, Dependency injection. That takes a day. A day spent there raises the number less than an hour of easy tests elsewhere. So <code>vouchers.py</code> stays at 0%.'
        ],
        tip: 'Lesson 49, Testing pyramid, already warned: "Do not write tests just to raise a count." A target is exactly what turns that warning into everyday behaviour.'
      },
      {
        label: 'The pain', pic: chartPic,
        h: 'The number said safe.',
        text: [
          'In April a customer pays with a $5 gift voucher, and $10 comes off her order. The voucher was taken off <b>twice</b>. For two weeks, every voucher order loses the shop $5, and nobody notices until the accountant\'s books do not add up.',
          'The coverage report said 92%. It looked like a safety net with almost no holes. The hole was exactly where the risky code was.',
          'Look at the chart. Coverage climbed from 55% to 92%. Bugs that reached customers went 3, 3, 4, and then 6 in April. Before March, more coverage meant more careful tests. After the target, more coverage meant more tests of any kind. <b>The number and the real thing came apart.</b>',
          'Worse, Maya now trusts the number more than before. "We are at 92%" ends arguments. A broken measure is worse than none, because it is believed.'
        ],
        warn: 'Nobody cheated. Every team did what Maya asked, and what she paid for. The teams were not the problem. The target was.'
      },
      {
        label: 'What to do', pic: fixPic,
        h: 'Keep the thermometer. Stop paying for it.',
        text: [
          '<b>1. Take the reward off the number.</b> Maya drops the coverage bonus. The number goes back to being a thermometer: something you read to learn, not something you are judged by. Keep the numbers you use for learning apart from the ones used for pay or blame.',
          '<b>2. Read it for what it is good at.</b> Coverage cannot prove that code is well tested: a test with no check still counts. But it is very good at the opposite. A line at 0% is a line that <b>no test even runs</b>. Read the report as a map of the gaps. <code>vouchers.py</code> at 0% is the first place to write real tests.',
          '<b>3. Read several numbers together.</b> One number is easy to game. Several at once are hard. Maya now reads coverage next to <b>bugs that reached customers</b> and <b>how long a change takes to go live safely</b>. Raising coverage with empty tests does nothing for the other two.',
          '<b>4. Prefer numbers close to what you really want.</b> Maya does not really want coverage. She wants customers to get the right order at the right price. "Orders that arrived right" is close to that, so it is hard to fake.',
          '<b>5. Talk about the numbers.</b> Instead of ranking teams, Maya asks each one: "What does your number tell us? Which risky code has no tests?" A number starts a conversation. It does not end one.',
          '<b>6. Change a measure once people steer by it.</b> When everyone is working to move a number, it has stopped measuring. Swap it, or look at a different one for a while.'
        ],
        tip: 'Lesson 1, Easy to change, named the real goal behind all the tests: code you can change safely. Coverage was only ever a hint about that goal. Keep your eye on the goal, and read the number as a hint.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'How could it be gamed?',
        text: [
          'Before you turn any number into a goal, ask: <b>"If people only cared about moving this number, how could they move it without improving the real thing?"</b>',
          'Try it on two numbers Maya almost used next. <b>Lines of code written per week</b>: the cheapest way to raise it is to copy and paste instead of reusing a function, and to never delete anything. That breaks lesson 6, DRY, and punishes the tidying of lesson 13, Boy Scout rule, because deleting code makes your number go down.',
          '<b>Tickets closed per week</b>: split one job into five tickets, or close a ticket before the problem is really fixed. Nina could close 20 tickets a week and leave the kitchen screen no better.',
          'Now try <b>orders that arrived right</b>. How do you raise it without the real thing improving? It is hard. Almost the only way is to get more orders right. A number that is hard to game like this is a much safer one to steer by.'
        ],
        tip: 'Lesson 17, Small functions, said a function is not too long just because of a line count. Same idea: a number is a hint to go and look. It is not the thing itself.'
      },
      {
        label: 'When not to', pic: limitPic,
        h: 'Not a reason to stop measuring.',
        text: [
          '<b>Do not throw the numbers away.</b> Suppose Maya loves this lesson so much that she bans every number. Now nobody notices that the new delivery code has no tests at all. Without measures you are guessing, and lesson 10, Premature optimisation, showed how badly people guess: Maya was sure the slow part was her loop, and her timer showed it was the printer.',
          '<b>Numbers used to learn are fine.</b> Goodhart\'s law bites when people are rewarded or punished by a number. A number that nobody is paid for is much less likely to be gamed. Lesson 51, Broken windows, kept warnings at zero, and that worked because the team wanted the signal. Put a bonus on "zero warnings" and the cheapest way to get it is to switch the warnings off.',
          '<b>Some targets are the real thing.</b> The kitchen must never run out of flour, so the rule is "at least 2 sacks in the store room". The only way to meet it is to have flour, and flour is exactly what the kitchen needs. When the number and the goal are the same thing, a target is fine.',
          '<b>It is not an excuse.</b> "Any number can be gamed" is not a reason to ignore a number you do not like. If bugs reaching customers are going up, that is worth hearing.'
        ],
        warn: 'The law is not "numbers are bad". It is: watch what happens to a number once people are rewarded for it, and keep your eyes on the real thing it was standing in for.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'The kitchen is told: "Your score is cookies baked per hour, and the best bakers get a bonus." What does Goodhart\'s law predict?',
        options: ['Exactly the same cookies, just faster', 'The count goes up, partly through smaller or rushed cookies', 'The count goes down', 'Nothing changes, because bakers ignore numbers'],
        answer: 1,
        why: 'The cheapest ways to raise "cookies per hour" are smaller cookies and fewer checks. The count can rise while the cookies get worse.',
        hint: 'What is the cheapest way to make that number go up?'
      },
      {
        type: 'pick', q: 'All three tests pass, and together they run every line of <code>final_total</code>. Which one adds to the coverage but checks nothing?',
        pic: quizTests,
        options: ['test_a', 'test_b', 'test_c', 'None of them'],
        answer: 1,
        why: '<code>test_b</code> runs the code but has no <code>assert</code>. It can never fail, whatever <code>final_total</code> hands back. The coverage tool still counts every line it ran as covered.',
        hint: 'Look for a test with no "this must be true" line.'
      },
      {
        type: 'match', q: 'Match each number to the cheapest way to raise it without improving anything.',
        pairs: [
          ['Lines of code per week', 'Copy and paste instead of reusing a function'],
          ['Tickets closed per week', 'Split one job into five tickets'],
          ['Test coverage', 'Tests that run code but check nothing'],
          ['Short phone calls', 'Hurry the difficult callers off the line']
        ],
        why: 'Each number used to move with something real. Once it was rewarded, there was a cheaper way to move it.'
      },
      {
        type: 'pick', q: 'Tom is paid by lines of code written per week. Which earlier principle is the first to suffer?',
        options: ['Lesson 6, DRY', 'Lesson 19, Encapsulation', 'Lesson 37, Idempotency', 'Lesson 42, Statelessness'],
        answer: 0,
        why: 'Reusing a function writes few lines. Copying the code writes many. A lines-of-code score pays for the repetition that lesson 6, DRY, warned against. Deleting code, as in lesson 13, Boy Scout rule, even makes the score go down.',
        hint: 'Which lesson was about writing a rule once instead of copying it?'
      },
      {
        type: 'bucket', q: 'A healthy use of a number, or a Goodhart trap?',
        buckets: ['Healthy use', 'Goodhart trap'],
        items: [
          ['Reading the coverage report to find code that no test runs', 0],
          ['Watching coverage next to bugs that reached customers', 0],
          ['Keeping at least 2 sacks of flour in the store room', 0],
          ['A bonus for every team that reaches 90% coverage', 1],
          ['Ranking developers by tickets closed per week', 1],
          ['A prize for the team with the fewest warnings, however they get there', 1]
        ],
        why: 'Numbers are safe when they are used to learn, or when the number is the real thing. Trouble starts when people are rewarded for the number itself.'
      },
      {
        type: 'bucket', q: 'Which law of this module explains each story: Conway\'s law (lesson 53) or Goodhart\'s law?',
        buckets: ["Conway's law", "Goodhart's law"],
        items: [
          ['Two teams who never talk end up with a clumsy link between their programs', 0],
          ['A company with three teams ends up with three programs, one per team', 0],
          ['A bonus for coverage fills the code with tests that check nothing', 1],
          ['A support team judged on short calls starts hurrying people off the phone', 1]
        ],
        why: 'Conway\'s law is about how the shape of the team shapes the software. Goodhart\'s law is about what happens to a number once people are rewarded for moving it.'
      },
      {
        type: 'pick', q: 'Which of these are true about Goodhart\'s law? Pick all that apply.',
        options: ['The idea comes from the economist Charles Goodhart, in 1975', 'The famous sentence "When a measure becomes a target, it ceases to be a good measure" is Marilyn Strathern\'s summary, from 1997', 'It means you should stop measuring things', 'It is an observation about people, not a law of nature'],
        answer: [0, 1, 3],
        why: 'The idea is Goodhart\'s and the well-known sentence is Strathern\'s. And the lesson is to keep measuring, while watching what rewards do to a number.',
        hint: 'Three are true. One is the opposite of the advice.'
      },
      {
        type: 'pick', q: 'Before turning a number into a goal, which question does this lesson tell you to ask?',
        options: ['Is this number already high?', 'If people only cared about this number, how could they move it without improving the real thing?', 'Which team has the lowest number?', 'Can a tool count it automatically?'],
        answer: 1,
        why: 'If there is a cheap way to move the number without the real thing, a reward will find it. Pick a number that is hard to game, or do not reward it.'
      }
    ]
  });
})();
