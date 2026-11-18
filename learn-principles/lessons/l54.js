/* Lesson 54: Brooks's law (module 6). One file per lesson. */
(function () {
  const { P, svg, box, T, arrow } = PR;
  const SKIN = '#F2C9A5', NEW = '#FFD98A';

  const person = (x, y, col) =>
    `<path d="M${x - 15} ${y + 30} q0 -20 15 -20 q15 0 15 20 z" fill="${col}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>` +
    `<circle cx="${x}" cy="${y}" r="10" fill="${SKIN}" stroke="${P.ink}" stroke-width="2.5"/>`;
  const line = (x1, y1, x2, y2, col, w, dash) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
  const bubble = (x, y, s, f) => `<circle cx="${x}" cy="${y}" r="11" fill="${f || P.accent}" stroke="${P.ink}" stroke-width="2"/>` + T(x, y + 5, s, { s: 13, f: P.white });

  // A ring of n people, every pair joined by a line. Old people sit on even places when o.mix is set.
  function web(cx, cy, r, n, o) {
    o = o || {};
    const pts = [...Array(n)].map((_, k) => {
      const a = (-90 + (o.turn || 0) + (360 / n) * k) * Math.PI / 180;
      return [Math.round(cx + r * Math.cos(a)), Math.round(cy + r * Math.sin(a))];
    });
    const isNew = k => o.mix && k % 2 === 1;
    let lines = '';
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
      const fresh = isNew(i) || isNew(j);
      lines += line(pts[i][0], pts[i][1], pts[j][0], pts[j][1], fresh ? P.danger : P.ink, fresh ? 1.5 : 2.5);
    }
    return lines + pts.map(([x, y], k) => `<circle cx="${x}" cy="${y}" r="13" fill="${isNew(k) ? NEW : P.tint}" stroke="${P.ink}" stroke-width="2.5"/>`).join('');
  }

  /* ---------- 1. the idea: a late dinner and five more cooks ---------- */
  const kitchenPic = svg(600, 300, 'Left: one cook, a dinner running late. Right: the same kitchen with five extra cooks who do not know where anything is. They all ask the first cook questions, so she cooks less. The oven still takes one hour.',
    T(150, 26, 'ONE COOK, RUNNING LATE', { s: 12.5, f: P.warn }) + T(450, 26, 'SEND IN 5 MORE COOKS?', { s: 12.5, f: P.danger }) +
    box(60, 46, 180, 160, P.paper2, 16) + person(150, 100, P.tint) + T(150, 162, 'knows where', { s: 12.5, w: 700, f: P.ink2 }) + T(150, 180, 'everything is', { s: 12.5, w: 700, f: P.ink2 }) +
    `<line x1="300" y1="20" x2="300" y2="280" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    box(340, 46, 220, 160, P.paper2, 16) + person(450, 112, P.tint) +
    [[380, 82], [520, 82], [380, 160], [520, 160], [450, 176]].map(([x, y]) => person(x, y - 12, NEW) + arrow(x + (x < 450 ? 18 : -18), y - 2, x < 450 ? 430 : 470, 122, P.accent, 2)).join('') +
    bubble(392, 64, '?') + bubble(532, 64, '?') + bubble(466, 158, '?') +
    T(150, 238, 'dinner is late', { s: 13.5 }) +
    T(450, 238, 'dinner is later', { s: 13.5, f: P.danger }) +
    T(450, 258, 'she spends the evening answering', { s: 12, w: 700, f: P.ink2 }) + T(450, 276, '"where are the pans?"', { s: 12, w: 700, f: P.ink2 }));

  /* ---------- 2. the story: Maya's math ---------- */
  const X0 = 60, WK = 70, DUE = X0 + 3 * WK;
  const axis = (y, n) => line(X0 - 10, y, X0 + n * WK + 20, y, P.ink, 2.5) +
    [...Array(n + 1)].map((_, i) => line(X0 + i * WK, y - 5, X0 + i * WK, y + 5, P.ink, 2.5) + T(X0 + i * WK, y + 22, i ? 'wk ' + i : 'now', { s: 11.5, w: 700, f: P.ink2 })).join('');
  const due = (y1, y2) => line(DUE, y1, DUE, y2, P.danger, 3) + `<rect x="${DUE - 40}" y="${y1 - 26}" width="80" height="24" rx="12" fill="${P.danger}"/>` + T(DUE, y1 - 9, 'DUE 1 Dec', { s: 11, f: P.white });
  const mathPic = svg(600, 300, 'A timeline. The pre-order page is due at the end of week 3. The work left takes 6 weeks for the team of 4. Maya\'s plan: 8 people do it in 3 weeks.',
    T(300, 22, 'CHRISTMAS PRE-ORDERS: 24 TASKS LEFT', { s: 12.5, f: P.ink2 }) +
    due(70, 214) +
    `<rect x="${X0}" y="92" width="${6 * WK}" height="40" rx="10" fill="${P.dangerT}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<rect x="${X0}" y="92" width="${3 * WK}" height="40" rx="10" fill="${P.tint}" stroke="${P.ink}" stroke-width="2.5"/>` +
    T(X0 + 10, 117, '4 people: 6 weeks', { s: 13, a: 'start' }) + T(X0 + 6 * WK + 12, 117, '3 weeks late', { s: 12.5, f: P.danger, a: 'start' }) +
    `<rect x="${X0}" y="150" width="${3 * WK}" height="40" rx="10" fill="none" stroke="${P.accent}" stroke-width="2.5" stroke-dasharray="7 5"/>` +
    T(X0 + 10, 175, '8 people: 3 weeks?', { s: 13, a: 'start', f: P.accent }) + T(DUE + 12, 175, "Maya's plan", { s: 12.5, f: P.accent, a: 'start' }) +
    axis(220, 7) +
    T(300, 280, 'Twice the people, half the time. That is the math Brooks warned about.', { s: 13, w: 700, f: P.ink2 }));

  /* ---------- 3. the pain: the web of pairs, and the weeks ---------- */
  const pairsPic = svg(600, 330, 'Left: 4 people, 6 pairs who may need to talk. Right: 8 people, 28 pairs. Below: 3 people make 3 pairs, 6 make 15, 10 make 45, 20 make 190.',
    T(150, 24, '4 PEOPLE', { s: 12.5, f: P.ink2 }) + T(450, 24, '8 PEOPLE', { s: 12.5, f: P.danger }) +
    web(150, 130, 78, 4, { turn: 45 }) + web(450, 130, 86, 8, { turn: 22.5, mix: true }) +
    T(150, 244, '6 pairs', { s: 18 }) + T(450, 244, '28 pairs', { s: 18, f: P.danger }) +
    T(150, 264, '4 × 3 ÷ 2 = 6', { s: 12.5, w: 700, f: P.ink2 }) + T(450, 264, '8 × 7 ÷ 2 = 28', { s: 12.5, w: 700, f: P.ink2 }) +
    `<line x1="300" y1="20" x2="300" y2="270" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    [['3 people', '3'], ['6', '15'], ['10', '45'], ['20', '190']].map(([a, b], i) => {
      const x = 30 + i * 140;
      return box(x, 284, 120, 36, P.white, 10) + T(x + 60, 307, a + ' → ' + b + ' pairs', { s: 12 });
    }).join(''));

  const bars = [[1, 8], [3, 8], [4, 8]];
  const weeksPic = svg(600, 300, 'Tasks done in each of the 3 weeks. Maya planned 8 a week. The team of 8 finished 1, then 3, then 4. The team of 4 alone would have finished 4 a week. By the deadline: 8 tasks done, against 12 for the team of 4 alone.',
    T(300, 22, 'TASKS DONE EACH WEEK', { s: 12.5, f: P.ink2 }) +
    line(70, 220, 560, 220, P.ink, 2.5) +
    [0, 2, 4, 6, 8].map(v => T(56, 224 - v * 20, String(v), { s: 11.5, w: 700, f: P.ink2, a: 'end' })).join('') +
    line(70, 60, 560, 60, P.accent, 2.5, '7 6') + T(556, 52, "Maya's plan: 8 a week", { s: 12, f: P.accent, a: 'end' }) +
    line(70, 140, 560, 140, P.ink2, 2.5, '2 6') + T(78, 132, '4 people alone: 4 a week', { s: 12, f: P.ink2, a: 'start' }) +
    bars.map(([v], i) => {
      const x = 120 + i * 150, h = v * 20;
      return `<rect x="${x}" y="${220 - h}" width="80" height="${h}" rx="6" fill="${P.danger}" stroke="${P.ink}" stroke-width="2.5"/>` + T(x + 40, 212 - h, String(v), { s: 15, f: P.danger }) + T(x + 40, 242, 'week ' + (i + 1), { s: 12.5, w: 700, f: P.ink2 });
    }).join('') +
    T(300, 276, 'By the deadline, 8 people had done 8 tasks. 4 people alone would have done 12.', { s: 13 }) +
    T(300, 294, 'The page opened in week 7. The 4 alone would have finished in week 6.', { s: 11.5, w: 700, f: P.ink2 }));

  const painPic = `<div style="width:100%">${pairsPic}${weeksPic}</div>`;

  /* ---------- 4. what to do: cut the list ---------- */
  const ESS = [0, 2, 3, 7, 9, 12, 14, 18, 19, 22];
  const cutPic = svg(600, 340, 'Left: 24 tasks. 10 of them are needed to open pre-orders. 14 can wait for January. Right: the team of 4 finishes the 10 tasks in two and a half weeks, before the deadline.',
    T(150, 22, '24 TASKS, SORTED', { s: 12.5, f: P.ink2 }) +
    [...Array(24)].map((_, i) => {
      const x = 40 + (i % 6) * 38, y = 40 + Math.floor(i / 6) * 38, e = ESS.includes(i);
      return `<rect x="${x}" y="${y}" width="30" height="30" rx="7" fill="${e ? P.ok : P.white}" stroke="${P.ink}" stroke-width="2.5"${e ? '' : ' stroke-dasharray="4 4"'}/>`;
    }).join('') +
    `<rect x="40" y="206" width="16" height="16" rx="4" fill="${P.ok}" stroke="${P.ink}" stroke-width="2"/>` + T(64, 219, '10 needed to open pre-orders', { s: 12, w: 700, a: 'start' }) +
    `<rect x="40" y="232" width="16" height="16" rx="4" fill="${P.white}" stroke="${P.ink}" stroke-width="2" stroke-dasharray="3 3"/>` + T(64, 245, '14 can wait for January', { s: 12, w: 700, a: 'start', f: P.ink2 }) +
    `<line x1="300" y1="20" x2="300" y2="270" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    T(450, 22, 'THE SAME 4 PEOPLE', { s: 12.5, f: P.ok }) +
    [[360, 70], [410, 70], [460, 70], [510, 70]].map(([x, y]) => person(x + 15, y, P.tint)).join('') +
    [0, 1, 2, 3, 4].map(i => line(330 + i * 50, 196, 330 + i * 50, 206, P.ink, 2.5) + T(330 + i * 50, 224, i ? 'wk ' + i : 'now', { s: 11.5, w: 700, f: P.ink2 })).join('') +
    line(322, 201, 540, 201, P.ink, 2.5) +
    line(480, 128, 480, 201, P.danger, 3) + T(480, 122, 'DUE', { s: 11.5, f: P.danger }) +
    `<rect x="330" y="140" width="125" height="36" rx="9" fill="${P.okT}" stroke="${P.ink}" stroke-width="2.5"/>` + T(392, 163, '10 tasks', { s: 13, f: P.ok }) +
    `<circle cx="455" cy="158" r="12" fill="${P.ok}" stroke="${P.ink}" stroke-width="2"/><path d="M449 158 l4 4 l8 -9" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>` +
    T(450, 250, '10 tasks at 4 a week:', { s: 12.5, w: 700, f: P.ink2 }) + T(450, 268, 'two and a half weeks. On time.', { s: 12.5, w: 700, f: P.ok }) +
    box(30, 286, 540, 44, P.white, 12) + T(300, 314, 'Other honest moves: add people early, give them separate pieces, or move the date.', { s: 12.5 }));

  /* ---------- 5. the test: three questions ---------- */
  const q = (y, n, ask, ans, col) => box(20, y, 560, 70, P.white, 14) +
    `<circle cx="52" cy="${y + 35}" r="16" fill="${P.accent}" stroke="${P.ink}" stroke-width="2.5"/>` + T(52, y + 41, n, { s: 15, f: P.white }) +
    T(80, y + 30, ask, { s: 13.5, a: 'start' }) + T(80, y + 53, ans, { s: 12.5, w: 700, a: 'start', f: col });
  const testPic = svg(600, 300, 'Three questions to ask before adding people, with the answers for Maya\'s pre-order project.',
    T(300, 22, 'BEFORE YOU ADD PEOPLE, ASK', { s: 12.5, f: P.ink2 }) +
    q(38, '1', 'How long until they help?', 'Maya: about 2 weeks. The deadline is 3 weeks away.', P.danger) +
    q(122, '2', 'What will they cost the people already here?', 'Maya: Sam and Tom teach instead of build. Pairs: 6 → 28.', P.danger) +
    q(206, '3', 'Can the remaining work really be split?', 'Maya: barely. The last tasks all touch the same checkout.', P.danger) +
    T(300, 294, 'Three bad answers: do not add people now. Cut the list or move the date.', { s: 12.5, w: 700, f: P.ink2 }));

  /* ---------- 6. when not to ---------- */
  const limitPic = svg(600, 300, 'Left: work that splits cleanly, like packing 500 gift boxes or translating the menu into 3 languages. More people finish it sooner. Right: a late, tangled checkout where every task touches the same code. More people make it later.',
    T(150, 24, 'MORE PEOPLE HELP', { s: 12.5, f: P.ok }) + T(450, 24, 'MORE PEOPLE HURT', { s: 12.5, f: P.danger }) +
    [0, 1, 2, 3].map(i => {
      const x = 52 + i * 66;
      return person(x + 15, 56, i ? NEW : P.tint) + `<rect x="${x}" y="100" width="30" height="26" rx="5" fill="#E2AD6B" stroke="${P.ink}" stroke-width="2.5"/>`;
    }).join('') +
    T(150, 152, 'packing 500 gift boxes', { s: 13 }) + T(150, 172, 'translating the menu into 3 languages', { s: 12, w: 700, f: P.ink2 }) +
    T(150, 198, 'each person has their own pile', { s: 12, w: 700, f: P.ink2 }) +
    `<line x1="300" y1="20" x2="300" y2="280" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    box(392, 92, 116, 40, '#15132B', 10) + T(450, 117, 'checkout.py', { s: 12, m: true, f: '#ECEAFF' }) +
    [[360, 44], [450, 40], [540, 44], [360, 156], [540, 156]].map(([x, y]) => person(x, y, NEW) + line(x, y + (y < 100 ? 34 : -14), 450 + (x - 450) / 3, y < 100 ? 92 : 132, P.danger, 2)).join('') +
    T(450, 214, 'a late, tangled checkout', { s: 13 }) + T(450, 234, 'every task touches the same code', { s: 12, w: 700, f: P.ink2 }) +
    T(300, 278, 'Brooks\'s law is about late, tightly connected work. It is not a law against hiring.', { s: 13 }));

  COURSE.add({
    id: 'l54', minutes: 8,
    summary: 'When a software project is already late, adding more people usually makes it <b>later</b>, not sooner. Newcomers must learn before they help, the number of people who must talk grows much faster than the team, and some work cannot be split. That is <b>Brooks\'s law</b>.',
    video: {
      src: 'videos/l54-brooks-law.mp4', poster: 'videos/l54-brooks-law.jpg', length: '1 min 10 s',
      script: [
        'Christmas pre-orders must open in 3 weeks. But Maya\'s 4 developers still have 6 weeks of work left.',
        'So Maya does the math. Hire 4 more. Twice the people, half the time. 3 weeks.',
        'Week 1. The newcomers must learn the code before they can help. And Sam and Tom stop building, to teach them.',
        'Week 2. Count who has to talk to whom. 4 people make 6 pairs. 8 people make 28. Meetings grow. Two people clash in one file. A newcomer breaks the tax.',
        'And some work cannot be split. A cake needs its hour in the oven, however many bakers watch.',
        'Maya\'s plan said week 3. With no new people, week 6. With them, week 7.',
        'The better move? Cut the list. 10 tasks are enough to open pre-orders, and 4 people can finish those in time. And if you add people, add them early, with pieces of their own.',
        'That is Brooks\'s law. Adding people to a late project makes it later.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: kitchenPic,
        h: 'Five more cooks, and dinner is later.',
        text: [
          'A cook is running late with a big dinner. Someone has a bright idea: send in five more cooks.',
          'But the new cooks do not know where the pans are, which oven runs hot, or what the dish should taste like. So they ask. And the only person who can answer is the cook who was already late. Now she spends her evening <b>explaining</b> instead of cooking. And the roast still needs its hour in the oven, however many cooks stand around it.',
          'Software projects work the same way. <b>Brooks\'s law</b> says: <b>adding people to a late software project makes it later.</b>',
          'Like every law in this module, it is <b>an observation, not a law of nature</b>. It is a blunt rule of thumb from someone who learned it the hard way.'
        ],
        tip: 'Fred Brooks managed IBM\'s huge OS/360 project in the 1960s: the operating system for IBM\'s System/360 computers. In his 1975 book <i>The Mythical Man-Month</i> he wrote: "Adding manpower to a late software project makes it later." He knew it was blunt. In the book\'s 20th-anniversary edition, in 1995, he called it an "outrageous oversimplification". A <b>man-month</b> is one person working for one month. Brooks called it "mythical" because it treats people and months as if you could swap one for the other: one person for 10 months, or 10 people for 1 month. You cannot.'
      },
      {
        label: 'The story', pic: mathPic,
        h: 'Twice the people, half the time?',
        text: [
          'Maya\'s company is building a new <b>Christmas pre-order page</b>. Customers will choose a Christmas cake, pick a collection day, and pay. The page must open on <b>1 December</b>, or the season is lost.',
          'Four developers are building it: Priya and Tom from the Website team, Sam from the Money team, and Nina from the Kitchen team. You met all three teams in lesson 53, Conway\'s law.',
          'In early November, with <b>3 weeks to go</b>, Maya looks at the task board. <b>24 tasks</b> are left. The team finishes about <b>4 tasks a week</b>. So the work needs <b>6 weeks</b>. They are 3 weeks short.',
          'Maya does the math. If 4 people finish 4 tasks a week, then 8 people should finish 8. 24 tasks in 3 weeks. On time. On Monday she hires <b>four contractors</b>, doubling the team from 4 to 8.',
          'It sounds like plain arithmetic. It is the exact arithmetic that Brooks\'s law warns about.'
        ]
      },
      {
        label: 'The pain', pic: painPic,
        h: 'More hands, fewer tasks done.',
        text: [
          '<b>Week 1: learning first.</b> The newcomers cannot help yet. They must learn the code, the house rules from lesson 46, Convention over configuration, and why things are the way they are. Who teaches them? Sam and Tom, the two who know the code best. So the two strongest builders <b>stop building</b>. The team finishes <b>1 task</b>.',
          '<b>Week 2: more people to talk to.</b> Every pair of people who might need to agree on something is a line of talk. Each person can pair with each of the others, and each pair counts once. So with <b>n</b> people there are <b>n × (n − 1) ÷ 2</b> pairs. 4 people make <b>6 pairs</b>. 8 people make <b>28</b>. The team doubled. The talking more than quadrupled.',
          'You can feel it. The daily stand-up, the short morning meeting where everyone says what they are doing, grows from 10 minutes to 40. Two newcomers change the same file in different ways, and untangling it takes a day. And Leo, a newcomer, adds the deposit to an order and adds the tax again on top. He did not know that <code>final_total</code> already adds it. The small tests from lesson 49, Testing pyramid, turn red in under a second, so no customer pays twice. But Tom loses an afternoon explaining how totals work. The team finishes <b>3 tasks</b>.',
          '<b>Week 3: some work cannot be split.</b> The last tasks all touch the same checkout and the same tax rule. Cutting them into 8 pieces makes 8 people wait on each other. The team finishes <b>4 tasks</b>.',
          'On 1 December, <b>8 tasks</b> are done. The 4 alone would have done 12. Once the newcomers know the code, the team of 8 settles at about 5 tasks a week, not 8, because 28 pairs still need to talk. The page opens in <b>week 7</b>, the week of Christmas itself. Without the new people it would have opened in week 6. Adding people made a late project <b>later</b>.'
        ],
        warn: 'Nobody here was lazy or bad at their job. The contractors were skilled. The problem was <b>when</b> they joined and <b>what</b> they were asked to join: late, and in the middle of tightly connected work.'
      },
      {
        label: 'What to do', pic: cutPic,
        h: 'Cut the list. Or add people early, to separate work.',
        text: [
          'Sam looks back and lists what would have worked.',
          '<b>1. Cut the list.</b> Of the 24 tasks, only <b>10</b> are needed to open pre-orders: choose a cake, choose a day, pay. Gift messages, delivery slots and points for pre-orders can come in January. 4 people finish 10 tasks in two and a half weeks. On time. This is lesson 8, YAGNI, applied to a deadline: do what is needed now, and let the rest wait until someone needs it.',
          '<b>2. Add people early, not late.</b> If Maya knows in September that the work is big, she can hire then. The newcomers have time to learn before the pressure starts.',
          '<b>3. Give newcomers separate, well-bounded pieces.</b> A contractor can design the printed Christmas menu and posters while the team builds the page. That work barely touches the code, so it adds almost no pairs who must talk. Lesson 2, High cohesion, lesson 3, Loose coupling, and lesson 44, Layers and the dependency rule, all help here: parts with clear borders can be built by different people with little talking.',
          '<b>4. Keep teams small.</b> 28 pairs is too many for one group. Several small teams with clear agreements between them talk much less.',
          '<b>5. Move the date, honestly.</b> Sometimes the truth is that the work takes 6 weeks. Saying so in November is far better than surprising everyone in December.'
        ],
        tip: 'The book\'s most quoted line is about the third reason. Brooks wrote: "The bearing of a child takes nine months, no matter how many women are assigned." People often retell it as "nine women cannot make a baby in one month". Some work is simply sequential.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Three questions before you add people.',
        text: [
          'Before you add people to a project that is already running, ask: <b>"If I add people now, how long until they help, how much will they cost the people already here, and can the remaining work actually be split?"</b>',
          'Try it on Maya\'s project. How long until they help? About 2 weeks, with 3 to go. What will they cost? Sam and Tom spend week 1 teaching, and the pairs jump from 6 to 28. Can the work be split? Barely: the last tasks all touch the same checkout.',
          'Three bad answers. So adding people is the wrong lever here. Cutting the list or moving the date is the right one.'
        ]
      },
      {
        label: 'When not to', pic: limitPic,
        h: 'Not a law against hiring.',
        text: [
          '<b>It is about late, tightly connected work.</b> Work that splits cleanly does scale with people. Packing 500 Christmas gift boxes, or translating the menu into 3 languages: give each person a pile, and 5 people really do finish much sooner than 1.',
          '<b>Early is different from late.</b> People who join at the start have time to learn before the deadline presses. The law is about adding people <b>when the project is already behind</b>.',
          '<b>A newcomer who already knows the code is a different case.</b> Suppose a developer who built the checkout last year is free for a week. Lending her to the project costs almost nothing in teaching. She already knows the house rules.',
          '<b>It is not an excuse to never ask for help.</b> "Brooks\'s law says no" is the wrong lesson. The right lesson is to ask for help early, and to give the helpers work with clear borders.',
          '<b>The numbers are a rule of thumb.</b> Not every pair of people really needs to talk, and good tools help. Brooks himself called his law an oversimplification. What it gets right is the direction: late, plus more people, usually means later.'
        ],
        warn: 'Overdoing it looks like this: a team refuses all help for a year, "because of Brooks\'s law", while a pile of simple, separate work grows. That is using the law as a shield, not as a tool.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'A project is 2 weeks late with 2 weeks to go. The work is one tangled program that everybody edits. The boss adds 5 new people tomorrow. What does Brooks\'s law predict?',
        options: ['It finishes on time', 'It finishes even later', 'It finishes twice as fast', 'Nothing changes'],
        answer: 1,
        why: 'Late, tangled work, and newcomers who must learn first. The experienced people teach instead of build, and the talking grows. The usual result is later, not sooner.',
        hint: 'Think of Maya\'s week 1 and week 2.'
      },
      {
        type: 'type', q: 'A team has 6 people. Each pair might need to talk. How many pairs is that? Type the number.',
        prompt: 'pairs >',
        answers: ['15', 'fifteen'],
        why: '6 × 5 ÷ 2 = 15. Each person can pair with the 5 others, and each pair is counted once. With 3 people it is only 3 pairs.',
        hint: 'Use n × (n − 1) ÷ 2 with n = 6.'
      },
      {
        type: 'match', q: 'Match each moment from Maya\'s project to the reason behind it.',
        pairs: [
          ['Sam and Tom spend week 1 explaining the code', 'Newcomers must learn before they help'],
          ['The stand-up grows from 10 minutes to 40', 'The number of pairs grows faster than the team'],
          ['The last tasks all touch the same checkout', 'Some work cannot be split']
        ],
        why: 'These are Brooks\'s three reasons: learning time, talking time, and work that cannot be cut into independent pieces.'
      },
      {
        type: 'bucket', q: 'Would adding people now help, or hurt?',
        buckets: ['Probably helps', 'Probably hurts'],
        items: [
          ['Packing 500 gift boxes in Christmas week', 0],
          ['Translating the printed menu into 3 languages', 0],
          ['Hiring in September for a project due in December', 0],
          ['Finishing a late, tangled checkout due on Friday', 1],
          ['Fixing one tricky tax bug by tomorrow', 1],
          ['Doubling a late team whose tasks all touch the same file', 1]
        ],
        why: 'Work that splits into separate piles, or people who join early, can scale. Late work that everyone must touch together does not.'
      },
      {
        type: 'order', q: 'Put Maya\'s project in order.',
        items: ['The team is 3 weeks short with 3 weeks to go', 'Maya hires 4 contractors', 'Sam and Tom stop building to teach', 'The pairs who must talk jump from 6 to 28', 'The page opens in week 7, later than the 4 alone'],
        why: 'The plan looked like arithmetic. The cost was in teaching and talking, and it arrived before any help did.'
      },
      {
        type: 'pick', q: 'Of 24 tasks, Maya keeps the 10 that pre-orders really need and moves the other 14 to January. Which earlier lesson is that, applied to a deadline?',
        options: ['Lesson 6, DRY', 'Lesson 8, YAGNI', 'Lesson 19, Encapsulation', 'Lesson 37, Idempotency'],
        answer: 1,
        why: 'YAGNI says: build what is needed now, and wait for the rest until someone really needs it. Under a deadline, that turns into cutting the list.',
        hint: 'Which lesson said "wait until someone really asks"?'
      },
      {
        type: 'pick', q: 'Next year Maya puts 4 contractors in a building across town, as their own team, with one call a month. They will build a part that must join the pre-order page. Which earlier law warns what that join will look like?',
        options: ['Lesson 53, Conway\'s law', 'Lesson 51, Broken windows', 'Lesson 10, Premature optimisation', 'Lesson 41, Robustness principle'],
        answer: 0,
        why: 'Conway\'s law: software copies who talks to whom. Two groups that rarely talk tend to leave a clumsy seam between their parts. Separate pieces are good, but the agreement between them still needs a real conversation.',
        hint: 'Which law was about who talks to whom?'
      },
      {
        type: 'pick', q: 'Which of these are true about Brooks\'s law? Pick all that apply.',
        options: ['Fred Brooks wrote it in his 1975 book The Mythical Man-Month', 'It is a rule of thumb, not a law of nature', 'It means a team should never hire anyone', 'It applies most to late, tightly connected work'],
        answer: [0, 1, 3],
        why: 'It is a blunt observation about late projects. Early hires and cleanly separate work are different cases.',
        hint: 'Three are true. One turns the law into a ban.'
      }
    ]
  });
})();
