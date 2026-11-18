/* Lesson 59: Pareto principle (module 6). One file per lesson. */
(function () {
  const { P, svg, box, T, arrow, term } = PR;

  /* ---------- the data, used by every picture ---------- */
  // Last month's 200 complaints, by cause, biggest first. 92 + 58 + 11 + 9 + 7 + 6 + 5 + 4 + 3 + 2 + 2 + 1 = 200.
  const CAUSES = [
    ['delivery time wrong', 92], ['discount code refused', 58], ['box crushed', 11], ['wrong flavour', 9],
    ['receipt email missing', 7], ['website slow', 6], ['allergy label unclear', 5], ['password reset fails', 4],
    ['menu typo', 3], ['charged twice', 2], ['gift message missing', 2], ['map hours wrong', 1]
  ];
  // The order in which each cause's first complaint arrived (indexes into CAUSES).
  const ARRIVAL = [2, 8, 3, 11, 4, 7, 10, 0, 6, 9, 1, 5];
  const line = (x1, y1, x2, y2, col, w, dash) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
  const bar = (x, y, w, h, fill) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${fill}" stroke="${P.ink}" stroke-width="2"/>`;
  const fillOf = i => i === 0 ? '#8F8BFF' : i === 1 ? '#FFC24B' : P.white;

  /* ---------- 1. the idea: a few carry most ---------- */
  const splitRow = (y, what, few, many) =>
    T(30, y + 22, what, { s: 13.5, a: 'start' }) +
    `<rect x="200" y="${y}" width="370" height="34" rx="8" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<rect x="200" y="${y}" width="290" height="34" rx="8" fill="${P.tint}" stroke="${P.ink}" stroke-width="2.5"/>` +
    T(345, y + 22, few, { s: 12.5, f: P.accent }) + T(530, y + 22, many, { s: 11.5, w: 700, f: P.ink2 });
  const ideaPic = svg(600, 250, 'Three everyday examples. In a wardrobe, a few favourite clothes are worn most of the time. In a restaurant, a few dishes make most of the sales. In a city, a few roads carry most of the traffic.',
    T(345, 26, 'the bar is everything that happens', { s: 12, w: 700, f: P.ink2 }) +
    splitRow(44, 'Wardrobe', 'a few favourites: most wears', 'the rest') +
    splitRow(98, 'Restaurant', 'a few dishes: most sales', 'the rest') +
    splitRow(152, 'City', 'a few roads: most traffic', 'the rest') +
    T(300, 222, 'A small share of the causes makes a large share of the effect.', { s: 14 }) +
    T(300, 242, 'The exact split is different every time. Nobody promises 80 and 20.', { s: 12, w: 700, f: P.ink2 }));

  /* ---------- 2. the story: Sam counts the tags ---------- */
  const pad = n => String(n).padStart(4, ' ');
  const countPic = `<div style="width:100%">` +
    term([
      '# tags.txt: one line per complaint, 200 lines',
      '$ sort tags.txt | uniq -c | sort -rn'
    ].concat(CAUSES.map(c => pad(c[1]) + ' ' + c[0])), 'Sam\'s terminal') + `</div>`;

  /* ---------- 3. the pain: oldest first ---------- */
  const pW = 40, pX = i => 36 + i * 46;
  const painPic = svg(600, 330, 'The 12 causes in the order their first complaint arrived. Maya fixes two a week. Week 1 fixes box crushed and menu typo, worth 14 complaints. Delivery time wrong comes eighth, fixed in week 4. Discount code refused comes eleventh, fixed in week 5.',
    T(300, 22, 'MAYA\'S ORDER: OLDEST COMPLAINT FIRST, 2 CAUSES A WEEK', { s: 12, f: P.ink2 }) +
    ARRIVAL.map((c, k) => {
      const n = CAUSES[c][1], h = n * 1.9, x = pX(k);
      return bar(x, 236 - h, pW, h, k < 2 ? P.okT : fillOf(c)) + T(x + pW / 2, 230 - h, String(n), { s: 13 }) +
        T(x + pW / 2, 256, '#' + (k + 1), { s: 11.5, w: 700, f: P.ink2 });
    }).join('') +
    line(28, 238, 582, 238, P.ink, 3) +
    `<path d="M${pX(0)} 270 V276 H${pX(1) + pW} V270" fill="none" stroke="${P.ok}" stroke-width="3"/>` +
    T((pX(0) + pX(1) + pW) / 2, 296, 'week 1: 14', { s: 13, f: P.ok }) +
    T(pX(7) + pW / 2, 296, 'week 4', { s: 13, f: P.danger }) + T(pX(10) + pW / 2, 296, 'week 5', { s: 13, f: P.danger }) +
    T(300, 322, 'The two biggest causes keep sending complaints for a month.', { s: 13, w: 700, f: P.ink2 }));

  /* ---------- 4. what to do: the Pareto chart ---------- */
  const cX = i => 44 + i * 40, cW = 32, BASE = 290, cum = [];
  CAUSES.reduce((a, c, i) => (cum[i] = a + c[1]), 0);
  const cy = v => BASE - v * 1.1; // 200 -> 70
  const pts = CAUSES.map((c, i) => [cX(i) + cW / 2, cy(cum[i])]);
  const paretoPic = svg(600, 360, 'A Pareto chart. Twelve bars, biggest first: 92, 58, 11, 9, 7, 6, 5, 4, 3, 2, 2, 1. A line adds them up from the left. It reaches 75 percent after only two bars, then creeps slowly to 100 percent. The first two causes take one week to fix and cover 150 complaints. The other ten take about a month and cover 50.',
    T(300, 22, 'BIGGEST FIRST, WITH A RUNNING TOTAL', { s: 12, f: P.ink2 }) +
    CAUSES.map((c, i) => {
      const h = c[1] * 2.1;
      return bar(cX(i), BASE - h, cW, h, fillOf(i)) + T(cX(i) + cW / 2, BASE - h - 6, String(c[1]), { s: 12 });
    }).join('') +
    line(36, BASE + 1, 534, BASE + 1, P.ink, 3) +
    `<polyline points="44,${BASE} ${pts.map(p => p.join(',')).join(' ')}" fill="none" stroke="${P.accent}" stroke-width="3.5" stroke-linejoin="round"/>` +
    pts.map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="4" fill="${P.white}" stroke="${P.accent}" stroke-width="2.5"/>`).join('') +
    T(pts[1][0] + 10, pts[1][1] + 22, '75%', { s: 14, f: P.accent, a: 'start' }) +
    T(pts[11][0], pts[11][1] - 12, '100%', { s: 14, f: P.accent }) +
    T(560, 74, 'running', { s: 11.5, w: 700, f: P.accent }) + T(560, 90, 'total', { s: 11.5, w: 700, f: P.accent }) +
    `<path d="M${cX(0)} 302 V308 H${cX(1) + cW} V302" fill="none" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<path d="M${cX(2)} 302 V308 H${cX(11) + cW} V302" fill="none" stroke="${P.ink}" stroke-width="2.5"/>` +
    T((cX(0) + cX(1) + cW) / 2, 326, '2 causes', { s: 12.5, f: P.ok }) + T((cX(0) + cX(1) + cW) / 2, 344, '1 week, 150', { s: 12, w: 700, f: P.ok }) +
    T((cX(2) + cX(11) + cW) / 2, 326, '10 causes', { s: 12.5, f: P.ink2 }) + T((cX(2) + cX(11) + cW) / 2, 344, 'about a month, 50', { s: 12, w: 700, f: P.ink2 }));

  /* ---------- 5. the test: Priya measures the slow page ---------- */
  const pagePic = svg(600, 250, 'Priya times the menu page. It takes 5 seconds. 4.5 seconds of that, 90 percent, is one job: resize_photos. After she resizes each photo once, when it is uploaded, the page takes about 0.6 seconds.',
    T(300, 22, 'THE MENU PAGE, TIMED', { s: 12, f: P.ink2 }) +
    T(30, 62, 'before', { s: 13, a: 'start' }) +
    `<rect x="100" y="40" width="450" height="36" rx="8" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<rect x="100" y="40" width="405" height="36" rx="8" fill="#FFC24B" stroke="${P.ink}" stroke-width="2.5"/>` +
    T(302, 63, 'resize_photos: 4.5 s (90%)', { s: 13, m: true }) + T(527, 98, 'the rest: 0.5 s', { s: 11.5, w: 700, f: P.ink2 }) +
    T(570, 63, '5 s', { s: 13, a: 'start' }) +
    T(30, 152, 'after', { s: 13, a: 'start' }) +
    `<rect x="100" y="130" width="54" height="36" rx="8" fill="${P.okT}" stroke="${P.ink}" stroke-width="2.5"/>` +
    T(166, 153, 'about 0.6 s', { s: 13, f: P.ok, a: 'start' }) +
    T(300, 206, 'One job out of many held 90% of the wait.', { s: 14 }) +
    T(300, 228, 'She would never have guessed it. She measured it.', { s: 12.5, w: 700, f: P.ink2 }));

  /* ---------- 6. when not to ---------- */
  const limitPic = svg(600, 300, 'Left: the menu typo has 3 complaints and does little harm. Charged twice has only 2 complaints, but each one takes money from a customer, so it is fixed first. Right: a payment that works 4 times out of 5 is not 80 percent good. It is broken.',
    T(150, 26, 'HOW MANY? HOW BAD?', { s: 12.5, f: P.danger }) +
    box(24, 44, 252, 70, P.white, 14) + T(42, 72, 'menu typo', { s: 14, a: 'start' }) + T(42, 96, '3 complaints, harm: tiny', { s: 12, w: 700, f: P.ink2, a: 'start' }) +
    box(24, 132, 252, 70, P.dangerT, 14) + T(42, 160, 'charged twice', { s: 14, a: 'start', f: P.danger }) + T(42, 184, '2 complaints, harm: real money', { s: 12, w: 700, f: P.danger, a: 'start' }) +
    T(150, 236, 'Fewer complaints. Much worse.', { s: 13 }) + T(150, 256, 'It goes near the top of the list.', { s: 12.5, w: 700, f: P.ink2 }) +
    `<line x1="300" y1="20" x2="300" y2="280" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    T(450, 26, 'ALL OR NOTHING', { s: 12.5, f: P.danger }) +
    [0, 1, 2, 3, 4].map(i => {
      const x = 344 + i * 46, bad = i === 3;
      return `<rect x="${x}" y="60" width="36" height="46" rx="6" fill="${bad ? P.dangerT : P.okT}" stroke="${P.ink}" stroke-width="2.5"/>` +
        T(x + 18, 90, bad ? '✗' : '✓', { s: 18, f: bad ? P.danger : P.ok });
    }).join('') +
    T(450, 134, 'payments that work 4 times in 5', { s: 12.5, w: 700, f: P.ink2 }) +
    `<g transform="rotate(-7 450 180)"><rect x="378" y="158" width="144" height="42" rx="8" fill="${P.danger}" stroke="${P.ink}" stroke-width="2.5"/>` + T(450, 186, 'BROKEN', { s: 18, f: P.white }) + `</g>` +
    T(450, 236, 'not "80% good"', { s: 13 }) + T(450, 256, 'Some jobs only count when complete.', { s: 12.5, w: 700, f: P.ink2 }));

  /* ---------- quiz pictures ---------- */
  const crashPic = term([
    '# app crash reports this week, by cause',
    '$ sort crashes.txt | uniq -c | sort -rn',
    '  64 photo upload',
    '  30 basket timeout',
    '   9 login screen',
    '   7 map page',
    '   6 search box',
    '   4 settings page'
  ], 'Tom\'s terminal');

  COURSE.add({
    id: 'l59', minutes: 8,
    summary: 'In many situations, <b>a few causes produce most of the effects</b>: a few bugs make most of the crashes, one slow job makes most of the wait. That is the <b>Pareto principle</b>, often called the 80/20 rule. The numbers are rough. The habit is exact: <b>count first</b>, then work on the vital few.',
    video: {
      src: 'videos/l59-pareto-principle.mp4', poster: 'videos/l59-pareto-principle.jpg', length: '1 min 16 s',
      script: [
        'Last month, Maya\'s company got 200 complaints.',
        'Maya\'s plan: fix them in the order they arrived. After one week, 2 causes are fixed. Together, they caused just 14.',
        'Sam counts first. He sorts the cards, one pile per cause. 12 causes. Then he lines them up, biggest first.',
        'Look at the first 2. Delivery time wrong, 92. Discount code refused, 58. 150 of 200. Three quarters.',
        'Add the piles from the left. The line shoots up, then crawls.',
        'So Sam fixes those 2. Also one week. Next month\'s pile shrinks to about a quarter. The other 10 would take a month.',
        'Code is the same. Priya timed the slow menu page. 90% of the wait was one job, resizing photos.',
        'But count, don\'t guess. The split is rough, not always 80/20. And weigh harm. 2 customers were charged twice. Rare, but it jumps the queue.',
        'That is the Pareto principle. A few causes make most of the effects. So count before you choose.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'A few do most of the work.',
        text: [
          'Open a wardrobe. A few favourite clothes get worn most of the time. The rest mostly hang there. A restaurant may have forty dishes on the menu, but a handful of them make most of the sales. In a city, a few big roads carry most of the traffic.',
          'The same shape turns up again and again: <b>a small share of the causes produces a large share of the effect</b>. The effort is not spread evenly. A few things matter a lot, and many things matter a little.',
          'This is the <b>Pareto principle</b>. People often call it the <b>80/20 rule</b>: about 80% of the results come from about 20% of the causes.',
          'Be careful with those two numbers. They are a slogan, not a measurement. The real split might be 90/10 or 70/30. The two numbers do not even need to add up to 100, because they count different things: one counts causes, the other counts effects. That 80 + 20 makes 100 is a coincidence of the slogan. Like every "law" in this module, it is <b>an observation, not a law of nature</b>.'
        ],
        tip: 'The name comes from the Italian economist <b>Vilfredo Pareto</b>. In the 1890s he noticed that about 80% of the land in Italy was owned by about 20% of the people. In the 1940s the quality expert <b>Joseph Juran</b> saw the same uneven pattern in factory defects: a few kinds of fault caused most of the rejects. He named the idea after Pareto and called it "the vital few and the trivial many". Later he preferred "the useful many", because the rest still matter.'
      },
      {
        label: 'The story', pic: countPic,
        h: '200 complaints, 12 causes.',
        text: [
          'Maya\'s cookie company now has three teams: Website (Priya and Tom), Kitchen (the baker and Nina) and Money (the accountant and Sam). Customers write to one support inbox. Last month it received <b>200 complaints</b>.',
          'When Tom answers a complaint, he adds a short <b>tag</b> for its cause, like "box crushed" or "menu typo". He saves every tag as one line in a file, <code>tags.txt</code>. So the file has 200 lines.',
          'Each cause needs a real fix, not just a reply. As a rough guide, one fix takes about <b>two working days</b>, big or small. So about two causes fit in a week.',
          'Sam remembers lesson 47, Unix philosophy. Instead of building a report, he lines up three small tools. <code>sort</code> puts equal tags next to each other. <code>uniq -c</code> squashes each group into one line with a count. <code>sort -rn</code> puts the biggest count first. The picture shows what came back.',
          'Read the top two lines. <b>Delivery time wrong: 92.</b> The website promised same-day delivery for cakes ordered in the afternoon, but cakes need a day. <b>Discount code refused: 58.</b> The checkout refused codes typed in small letters, like <code>spring10</code>. Two causes, 150 complaints.'
        ],
        tip: 'The counts add up: 92 + 58 + 11 + 9 + 7 + 6 + 5 + 4 + 3 + 2 + 2 + 1 = 200. Always check that your tally covers everything. A count that quietly drops some lines is worse than no count.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Oldest first, slowest result.',
        text: [
          'Before Sam counted, Maya had a plan that sounds fair: <b>fix things in the order the complaints arrived</b>. Oldest first. Everybody gets their turn.',
          'The oldest complaint was about a crushed box. The next new cause was a typo on the menu. So week 1 fixes those two. Between them they caused <b>14 of the 200 complaints</b>. Next month\'s inbox would barely change.',
          'Where are the big two? The delivery-time problem only started on the 9th, when the website was changed. Its first complaint is the 8th new cause in the queue, so it would be fixed in <b>week 4</b>. The discount problem comes 11th: <b>week 5</b>. Until then they keep sending in about three quarters of all complaints.',
          'The order complaints arrive in says nothing about how much they matter. Working in that order is spending effort by luck. On average, any 2 of 12 causes would cover about a sixth of the complaints. This time the luck was bad: 14 out of 200, about 7%.'
        ],
        warn: 'Maya\'s plan was not lazy. It was even and polite. The trouble is that the problems were not even. When effects are piled up unevenly, spreading your effort evenly wastes most of it.'
      },
      {
        label: 'What to do', pic: paretoPic,
        h: 'Count. Sort. Do the vital few first.',
        text: [
          '<b>1. Count before you choose.</b> Tag each problem with its cause and count them, as Sam did. A count turns opinions into a list.',
          '<b>2. Sort biggest first and add up as you go.</b> Draw the counts as bars, tallest on the left. Then draw a line for the <b>running total</b>: at each bar, the share of all complaints covered so far, counting from the left. Where the line climbs steeply, a few causes cover a lot. Where it flattens, many causes cover little. This drawing is called a <b>Pareto chart</b>.',
          '<b>3. Do the vital few first.</b> Sam\'s chart climbs to 75% after just two bars. Priya and Tom fix the delivery time. Sam makes the checkout accept codes in any letters. That is one week of work, and it removes the cause of 150 complaints. The other ten causes would take about a month, for the last 50.',
          '<b>4. Use it for features too.</b> The same counting works on the website. Most visits use a few pages, like the menu, the basket and the checkout. Those few deserve the most care and polish.',
          '<b>5. Decide where "good enough" is.</b> The last bit of polish often costs as much as all the work before it. Before you chase that last stretch, ask whether it is worth it. Sometimes it is. Often it is not.'
        ],
        tip: 'This is not only a shop story. In 2002, Microsoft\'s chief executive Steve Ballmer wrote that crash reports sent in by customers showed about 20% of the bugs causing about 80% of the errors. Fixing the bugs that crash most often helped the most people first.'
      },
      {
        label: 'The test', pic: pagePic,
        h: 'Have I counted?',
        text: [
          'Before you decide what to work on, ask: <b>"Have I counted where most of the effect actually comes from?"</b>',
          'Six of last month\'s complaints said the website was slow. Priya applies the test before touching anything. She remembers lesson 10, Premature optimisation: Maya was sure the slow part of her report was her loop, then measured and found the printer warming up. That was the Pareto principle too. One part held almost all the time.',
          'So Priya times the menu page. It takes <b>5 seconds</b>. Of those, <b>4.5 seconds (90%)</b> go to one job, <code>resize_photos</code>, which shrinks every cookie photo again on every visit. The rest of the page takes half a second.',
          'She changes one thing: each photo is resized once, when it is uploaded, and saved. The page now loads in about <b>0.6 seconds</b>. She did not touch the other jobs. Speeding them up could never have saved more than half a second.'
        ],
        tip: 'Lesson 50, Technical debt, said to pay off debt on the busy roads first, because interest is paid only where you touch the code. That is the same idea again: put your effort where most of the effect is.'
      },
      {
        label: 'When not to', pic: limitPic,
        h: 'Count, weigh, and finish what must be whole.',
        text: [
          '<b>Do not assume the split. Count it.</b> "80% of our problems must be in the checkout" is a guess wearing a famous name. Sometimes the problems really are spread evenly, and there is no vital few to find. Only a count can tell you.',
          '<b>The numbers are a rough pattern, not a formula.</b> Sam\'s data was 2 causes out of 12 (about 17%) making 75% of the complaints. That is the Pareto shape, and it is not 80/20. Nobody should bend their numbers to fit the slogan.',
          '<b>The "trivial many" are not always trivial.</b> Two customers were charged twice for one order. Only 2 complaints, near the bottom of the chart. But each one took real money from a customer. A rare bug that loses money, or a security hole, outweighs a hundred typos. So weigh <b>how bad</b> each cause is, not only <b>how often</b> it happens. Sam fixes the double charge right after the big two.',
          '<b>Some work only counts when it is complete.</b> A payment that works 4 times out of 5 is not "80% good". It is broken. The same goes for a lock, a backup or an allergy label. "Do the easy 80% and stop" is the wrong lesson for jobs like these.'
        ],
        warn: 'Overdoing it looks like this: Maya reads about 80/20 and declares that the team will only ever work on the top 20% of everything. The double charge sits unfixed for months, because it is "only 2 complaints". The principle tells you where to start. It does not tell you what to ignore.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does the Pareto principle really claim?',
        options: ['Exactly 80% of effects always come from exactly 20% of causes', 'In many situations, a small share of causes produces a large share of the effects', 'Every cause produces the same share of the effects', 'You should only ever do 20% of the work'],
        answer: 1,
        why: 'The real claim is about unevenness: a few causes, most of the effect. The 80 and 20 are a rough slogan, not exact numbers.',
        hint: 'Is the 80/20 split a rule, or just a rough picture?'
      },
      {
        type: 'pick', q: 'Tom counts this week\'s app crash reports. Each fix takes about the same time. Which two causes should the team fix first?',
        pic: crashPic,
        options: ['photo upload', 'basket timeout', 'login screen', 'settings page'],
        answer: [0, 1],
        why: 'Photo upload and basket timeout cause 94 of the 120 crashes, about 78%. With equal effort per fix, those two give by far the most result.',
        hint: 'Pick two. Look at the counts, not the order you thought of them.'
      },
      {
        type: 'pick', q: 'Which of these are true? Pick all that apply.',
        options: ['The two numbers in "80/20" do not need to add up to 100', 'It is named after Vilfredo Pareto, who noticed uneven land ownership in Italy', 'It is a law of nature that holds for every list of problems', 'Joseph Juran called it "the vital few and the trivial many"'],
        answer: [0, 1, 3],
        why: 'The numbers count different things, causes and effects, so they need not add up to 100. Pareto noticed the pattern, Juran named the principle after him. It is an observation, not a law of nature.',
        hint: 'Three are true. One claims far too much.'
      },
      {
        type: 'order', q: 'Put Sam\'s way of choosing what to fix in order.',
        items: ['Tag each complaint with its cause', 'Count how many complaints each cause has', 'Sort the causes, biggest first', 'Check the small ones for anything that does real harm', 'Fix the vital few first'],
        why: 'Count, sort, weigh the harm, then act. Skipping the count turns the whole thing back into guessing.',
        hint: 'You cannot sort what you have not counted.'
      },
      {
        type: 'bucket', q: 'A good use of the Pareto principle, or a misuse?',
        buckets: ['Good use', 'Misuse'],
        items: [
          ['Timing every step of a slow page before speeding any of it up', 0],
          ['Giving the three most used pages the most polish', 0],
          ['Fixing the two causes behind 75% of complaints first', 0],
          ['Ignoring a rare bug that charges customers twice, because it is rare', 1],
          ['Saying "80% of our bugs must be in the checkout" without counting', 1],
          ['Shipping a payment step that works 4 times out of 5', 1]
        ],
        why: 'Use it to decide where to start, after counting. Do not use it to skip counting, to ignore rare but serious problems, or to leave half-finished something that must be whole.'
      },
      {
        type: 'pick', q: 'Maya was sure her slow report was caused by her loop. She timed it and found the printer warming up took almost all the time. Which earlier lesson was that, and the Pareto principle in action?',
        options: ['Lesson 6, DRY', 'Lesson 8, YAGNI', 'Lesson 10, Premature optimisation', 'Lesson 47, Unix philosophy'],
        answer: 2,
        why: 'Lesson 10 said: measure first, then make only the slow part fast. Measuring usually shows that one part holds most of the time. That is the Pareto shape.',
        hint: 'Which lesson was about making code fast too early?'
      },
      {
        type: 'match', q: 'Match each scene to the law from this module that describes it.',
        pairs: [
          ['Two teams that rarely talk, and an awkward seam between their programs', 'Conway\'s law'],
          ['A late project gets four new people and finishes even later', 'Brooks\'s law'],
          ['Maya pays a bonus when complaints drop, and the complaint form gets hard to find', 'Goodhart\'s law'],
          ['2 of 12 causes make three quarters of the complaints', 'Pareto principle']
        ],
        why: 'Each law in this module describes a pattern in people and projects. Notice the Goodhart trap: once "fewer complaints" becomes the target, the count stops telling the truth, and Sam\'s chart would be built on bad data.'
      },
      {
        type: 'pick', q: 'Sam\'s chart shows "charged twice" with only 2 complaints, near the bottom. What should he do?',
        options: ['Ignore it. It is in the trivial many', 'Fix it soon, because each one costs a customer real money', 'Wait until it reaches 20% of complaints', 'Delete the 2 complaints from the count'],
        answer: 1,
        why: 'Count tells you how often. You also need to weigh how bad. A rare problem that loses money or breaks trust can matter more than a hundred small ones.'
      }
    ]
  });
})();
