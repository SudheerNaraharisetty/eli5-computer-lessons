/* Lesson 55: Hyrum's law (module 6). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;
  const DARK = '#15132B', LIGHT = '#ECEAFF', SKIN = '#F2C9A5', WATER = '#DCE7F3', DEEP = '#2C4F7C';
  const line = (x1, y1, x2, y2, col, w, dash) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
  const curve = (d, col, w, dash) => `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
  const person = (x, y, col) =>
    `<path d="M${x - 15} ${y + 30} q0 -20 15 -20 q15 0 15 20 z" fill="${col}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>` +
    `<circle cx="${x}" cy="${y}" r="10" fill="${SKIN}" stroke="${P.ink}" stroke-width="2.5"/>`;
  const dark = (x, y, w, h, s, o) => { o = o || {}; return box(x, y, w, h, DARK, 12) + T(x + w / 2, y + h / 2 + 5, s, { s: o.s || 13, m: true, f: o.f || LIGHT }); };

  /* ---------- 1. the idea: the iceberg ---------- */
  const icebergPic = svg(600, 360, 'An iceberg. Above the water, a small written promise. Below the water, a much bigger mass of things people can see and come to rely on.',
    `<rect x="20" y="132" width="560" height="216" rx="16" fill="${WATER}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<path d="M200 132 L214 62 L250 26 L360 18 L410 44 L420 132 Z" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>` +
    T(310, 60, 'THE WRITTEN PROMISE', { s: 11.5, f: P.accent }) +
    T(310, 84, 'received, baking', { s: 12.5, m: true }) + T(310, 104, 'or ready', { s: 12.5, m: true }) +
    `<path d="M200 132 L84 190 L66 270 L120 336 L480 336 L540 260 L520 180 L420 132 Z" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>` +
    line(22, 132, 578, 132, '#3B6FB0', 3) +
    T(310, 160, 'EVERYTHING PEOPLE CAN SEE', { s: 11.5, f: DEEP }) +
    [['capital letters', 160, 196], ['order of a list', 310, 196], ['how long it takes', 460, 196],
     ['exact error text', 160, 244], ['a typo', 310, 244], ['an extra field', 460, 244],
     ['a quirk', 160, 292], ['a bug', 310, 292], ['what bad input does', 460, 292]]
      .map(([s, x, y]) => box(x - 66, y - 18, 132, 28, P.warnT, 8) + T(x, y + 1, s, { s: 10.5, w: 700 })).join('') +
    T(585, 126, 'water line', { s: 10.5, w: 700, f: DEEP, a: 'end' }));

  /* ---------- 2. the story: strings to accidents ---------- */
  const PARTS = [
    { n: 'Delivery app', y: 70, col: P.tint, shows: 'In the oven' },
    { n: 'Party planner', y: 170, col: P.warnT, shows: 'Collect #210 first' },
    { n: 'Wedding planner', y: 270, col: P.okT, shows: 'Bad order caught' }
  ];
  const ACC = [
    { s: '"BAKING"', y: 100, lab: 'in capitals' },
    { s: '10:02, 10:15, 10:31', y: 200, lab: 'sorted by time' },
    { s: '"Unknwon cookie"', y: 300, lab: 'a typo' }
  ];
  function stringsPic(cut) {
    return svg(600, 360, cut
      ? 'Sam changed all three hidden behaviours. Each string snapped, and each partner program now shows something wrong.'
      : 'The orders API in the middle. Three behaviours nobody promised, each tied by a string to a partner program that relies on it.',
      box(20, 14, 230, 44, P.white, 12) + T(135, 32, 'WRITTEN PROMISE', { s: 10.5, f: P.accent }) + T(135, 50, 'received, baking, ready', { s: 11, m: true }) +
      T(135, 82, 'NOBODY PROMISED THESE', { s: 10.5, f: P.danger }) +
      ACC.map((a, i) => {
        const fixed = ['"baking"', '10:31, 10:02, 10:15', '"Unknown cookie"'][i];
        return dark(20, a.y, 230, 40, cut ? fixed : a.s, { s: 12, f: cut ? '#7CF0B5' : '#FFC24B' }) +
          T(135, a.y + 58, cut ? ['now lower case', 'now in a new order', 'typo fixed'][i] : a.lab, { s: 11.5, w: 700, f: cut ? P.ok : P.ink2 });
      }).join('') +
      PARTS.map((p, i) => {
        const ay = ACC[i].y + 20, py = p.y + 34;
        const str = cut
          ? curve(`M254 ${ay} C290 ${ay + 6} 300 ${ay + 26} 302 ${ay + 40}`, P.danger, 2.5, '5 5') + curve(`M388 ${py} C360 ${py + 6} 350 ${py + 26} 348 ${py + 40}`, P.danger, 2.5, '5 5')
          : curve(`M254 ${ay} C320 ${ay} 330 ${py} 388 ${py}`, P.ink, 2.5);
        return str + box(390, p.y, 196, 70, P.white, 12) + T(488, p.y + 26, p.n, { s: 12.5 }) +
          box(400, p.y + 40, 176, 22, DARK, 6) + T(488, p.y + 56, cut ? ['Unknown status', 'Collect #212 first', 'All orders placed'][i] : p.shows, { s: 11, f: cut ? '#FF8FA8' : '#7CF0B5' });
      }).join(''));
  }

  /* ---------- 3. the pain: the code ---------- */
  const apiCode = [
    'def status(order):',
    '    stage = kitchen.stage(order)  # "BAKING"',
    '    return stage.lower()          # "baking"'
  ];
  const appCode = [
    'answer = orders_api.status(212)',
    'if answer == "BAKING":',
    '    show("In the oven")',
    'elif answer == "READY":',
    '    show("Ready to collect")',
    'elif answer == "RECEIVED":',
    '    show("Order received")',
    'else:',
    '    show("Unknown status")'
  ];
  const painPic = `<div style="width:100%">${code(apiCode, { title: "orders_api.py, Sam's tidy-up", good: [3] })}` +
    code(appCode, { title: "the delivery app (not Maya's code)", bad: [2, 9] }) + stringsPic(true) + `</div>`;

  /* ---------- 4. what to do ---------- */
  const doPic = svg(600, 330, 'A careful change in three steps: announce it with a date, keep the old way working while users update, then switch. Below, three ways to stop accidents from becoming promises.',
    T(300, 24, 'CHANGE ON PURPOSE', { s: 12.5, f: P.ok }) +
    [['1  Announce', 'what changes, and when'], ['2  Old way still works', 'users update their code'], ['3  Switch', 'on the day you said']].map(([h, s], i) => {
      const x = 20 + i * 196;
      return box(x, 38, 172, 70, i === 1 ? P.okT : P.white, 12) + T(x + 86, 66, h, { s: 12.5 }) + T(x + 86, 90, s, { s: 11, w: 700, f: P.ink2 }) +
        (i < 2 ? arrow(x + 176, 73, x + 194, 73, P.ink, 2.5) : '');
    }).join('') +
    T(300, 150, 'SHOW LESS BY ACCIDENT', { s: 12.5, f: P.accent }) +
    [['Promise it', 'Write "oldest first"', 'in the docs. Test it.'], ['Or say "any order"', 'and mean it. Do not', 'let a habit form.'], ['Codes for programs', 'unknown_cookie never', 'changes. Words may.']].map(([h, a, b], i) => {
      const x = 20 + i * 196;
      return box(x, 164, 172, 104, P.tint, 12) + T(x + 86, 192, h, { s: 12.5 }) + T(x + 86, 220, a, { s: 11, w: 700, f: P.ink2 }) + T(x + 86, 240, b, { s: 11, w: 700, f: P.ink2 });
    }).join('') +
    T(300, 304, 'Measure who uses what, if you can. A log of calls beats a guess.', { s: 12, w: 700, f: P.ink2 }));

  /* ---------- 5. the test: 1, 3, 300 users ---------- */
  function usersPanel(cx, n, label) {
    const pts = [];
    if (n === 1) pts.push([cx + 62, 120]);
    else if (n === 3) [[-62, 60], [70, 120], [-50, 180]].forEach(([dx, y]) => pts.push([cx + dx, y]));
    else for (let k = 0; k < 2; k++) for (let i = 0; i < 30; i++) { const a = i / 30 * Math.PI * 2 + k * 0.1; pts.push([cx + (60 + k * 22) * Math.cos(a), 120 + (60 + k * 22) * Math.sin(a)]); }
    return pts.map(p => line(cx, 120, p[0].toFixed(1), p[1].toFixed(1), P.ink2, n > 3 ? 1 : 2)).join('') +
      pts.map((p, i) => `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${n > 3 ? 3.5 : 6}" fill="${[P.accent, P.warn, P.ok][i % 3]}" stroke="${P.ink}" stroke-width="1.5"/>`).join('') +
      box(cx - 30, 106, 60, 28, DARK, 8) + T(cx, 125, 'API', { s: 11, m: true, f: LIGHT }) +
      T(cx, 238, label, { s: 14 });
  }
  const usersPic = svg(600, 300, 'One user ties one string to the API. Three users tie three. Hundreds of users tie strings to almost everything it does.',
    usersPanel(100, 1, '1 user') + usersPanel(300, 3, '3 users') + usersPanel(500, 300, '300 users') +
    T(500, 258, '(60 drawn)', { s: 11, w: 700, f: P.ink2 }) +
    T(300, 288, 'More users, more strings. Sooner or later every behaviour has one.', { s: 12.5, w: 700, f: P.ink2 }));

  /* ---------- 6. when not to ---------- */
  const limitsPic = svg(600, 250, 'Three limits. Do not freeze everything. With one user, change freely. Close a security hole at once, and tell people.',
    [['Do not freeze', P.warnT, ['Bugs still get fixed.', 'Just with notice.']], ['One user: you', P.okT, ['Your own script.', 'Change it freely.']], ['A security hole', P.dangerT, ['Close it today.', 'Then tell them.']]].map(([h, f, ls], i) => {
      const x = 20 + i * 196;
      return box(x, 30, 172, 150, f, 14) + T(x + 86, 66, h, { s: 14 }) + ls.map((s, j) => T(x + 86, 104 + j * 24, s, { s: 12, w: 700, f: P.ink2 })).join('');
    }).join('') +
    T(300, 224, 'Users relying on something does not make it right. It makes changing it a job to plan.', { s: 12, w: 700, f: P.ink2 }));

  COURSE.add({
    id: 'l55', minutes: 8,
    summary: 'Whatever your program does that others can see, someone will come to rely on, promised or not. That is <b>Hyrum\'s law</b>. So no change is ever invisible: make changes on purpose, with notice, and show as little by accident as you can.',
    video: {
      src: 'videos/l55-hyrums-law.mp4', poster: 'videos/l55-hyrums-law.jpg', length: '1 min 17 s',
      script: [
        "Maya's company now offers an orders API. Three partner programs use it to ask, where is my order?",
        'The written promise is short. Status answers received, baking, or ready. That is only the tip of the iceberg.',
        'Under the water is everything else people can see. The answers come in capital letters. Today\'s orders come back in time order. And one error message has a typo.',
        'Nobody promised any of that. But the delivery app checks for BAKING, in capitals. The party planner trusts the list order. And the wedding planner looks for the typo.',
        'One morning, Sam tidies up. Lower case, like the docs. A faster list. A fixed typo. Every change keeps the promise. And all 3 programs break.',
        "That is Hyrum's law. With enough users, every behaviour they can see is depended on by somebody. 1 user, 1 string. 300 users, strings everywhere.",
        'So change on purpose. Announce it. Keep the old way working for a while. Then switch.',
        'Someone depends on every behaviour. So nothing should change by surprise.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: icebergPic,
        h: 'People build on what they can see.',
        text: [
          'A shop door says it opens at 9:00. For years it really opens at 8:55. The regulars notice, and start arriving at 8:55. One Monday a new manager opens at exactly 9:00, just as the sign says. Ten people are waiting outside, and they are cross. The sign never promised 8:55. It did not matter.',
          'Programs are the same. An <b>API</b> is the set of buttons a piece of software offers to other programs. It is the interface from lesson 28, Program to an interface, offered to programs written by other people. Lesson 40, Design by contract, said: write down what each button promises. That is the tip of the iceberg.',
          'Under the water is everything else that anyone can see: the capital letters in an answer, the order a list comes back in, the exact words of an error, how long a call takes, the odd quirk. Other programmers build on all of it. Not because it was promised, but because it was <b>there</b>.',
          'Hyrum\'s law says: with enough users, <b>every behaviour they can see is depended on by somebody</b>, whatever the documentation says.'
        ],
        tip: 'Hyrum Wright, a software engineer at Google, noticed this while making large changes to code that many teams used. His colleague Titus Winters gave it the name. On hyrumslaw.com it reads: "With a sufficient number of users of an API, it does not matter what you promise in the contract: all observable behaviors of your system will be depended on by somebody." It became widely known through the 2020 book Software Engineering at Google, which Winters and Wright edited with Tom Manshreck. Like every law in this module, it is an observation about people, not a law of nature. The web comic xkcd drew the joke version in comic 1172, "Workflow": an update stops the computer from overheating when you hold the space bar, and a user complains, because his setup relied on that heat.'
      },
      {
        label: 'The story', pic: stringsPic(false),
        h: 'Three things nobody promised.',
        text: [
          'In lesson 41, Robustness principle, a delivery app and a party planner\'s spreadsheet started sending orders to Maya\'s shop. In lesson 53, Conway\'s law, the website learned to ask the kitchen where an order is. Now Maya offers that question to partners too. Her company has an <b>orders API</b>, and Sam looks after it.',
          'The written promise is one line: <code>status(order)</code> answers one of <code>received</code>, <code>baking</code> or <code>ready</code>. Three partner programs use it: the delivery app, the party planner, and a new wedding planner.',
          'Three more things are true, and nobody wrote them down. 1. The answers come in <b>capital letters</b>, like <code>"BAKING"</code>. The kitchen screen happens to store them that way, and the API passes them on. 2. The list of today\'s orders always comes back <b>sorted by time</b>. That is only because of how the orders happen to be stored. 3. When an order names a cookie the shop does not sell, the reply says <code>"Unknwon cookie"</code>. It is a <b>typo</b>.',
          'Each partner tied a string to one of these. The delivery app checks for <code>"BAKING"</code> in capitals. The party planner\'s program says "collect the top order first". The wedding planner\'s program spots rejected orders by searching the reply for the word <code>Unknwon</code>, spelled exactly like that.'
        ],
        tip: 'None of the partners was foolish. Each one looked at what the API really did, wrote code that worked, and tested it. Their tests passed for a whole year.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Every change keeps the promise. Three programs break.',
        text: [
          'One quiet morning Sam tidies up. On line 3 of his file, <code>.lower()</code>, from lesson 41, turns <code>"BAKING"</code> into <code>"baking"</code>, exactly as the docs say. He stores orders in a faster way, so the list now comes back in a different order. And he fixes the typo. Each change is correct by the contract.',
          'Now read the delivery app\'s code, the second file. Python\'s <code>==</code> compares text exactly, capital letters included. <code>"baking" == "BAKING"</code> is <code>False</code>. So none of the three questions says yes, and line 9 runs. Every order shows <b>Unknown status</b>.',
          'The party planner\'s list now starts with order 212, which was ordered last and is still in the oven. A driver is sent for it first and waits. The wedding planner\'s program no longer finds <code>Unknwon</code> in any reply. An order for "mint swirl", which the shop does not sell, is rejected by the API, but the program thinks it went through. Nobody bakes it.',
          'Three complaints by lunch. All three are about things Maya\'s company <b>never promised</b>.'
        ],
        warn: 'Lesson 40 said a written deal tells you whose bug it is. Here it does: the partners relied on things outside the deal. That is true, and it does not help. The delivery app is still broken, and its customers blame Maya\'s cookies.'
      },
      {
        label: 'What to do', pic: doPic,
        h: 'Change on purpose. Show less by accident.',
        text: [
          '1. <b>Assume every visible behaviour is used.</b> Before a change, list what someone could notice: different words, a different order, a different speed. If you can, measure. A log of calls can tell Sam which partners even ask for the list.',
          '2. <b>Announce, overlap, switch.</b> Sam puts the capitals back for now and writes to all three partners: from 1 June, <code>status</code> answers in lower case, as the docs say. For two months the old answers keep coming. The delivery app changes its check to <code>answer.lower() == "baking"</code>, which works with both the old and the new answers. On 1 June Sam switches, and nothing breaks.',
          '3. <b>Decide each accident.</b> Keep it and promise it, or rule it out. Maya decides "oldest first" is useful, so she writes it in the docs, and Sam sorts the list before sending it. A test, as in lesson 49, Testing pyramid, now guards it. For errors, each reply gets a fixed code for programs, <code>unknown_cookie</code>, next to the words for people. The code never changes. The words may.',
          '4. <b>Be strict in what you send</b>, as lesson 41 said. Every answer leaves in one exact, written shape. The fewer accidents you show, the fewer strings people can tie to them.'
        ],
        tip: 'Some teams rule out an accident by making it impossible to rely on. The Go programming language mixes up, on purpose, the order you get when you walk through one of its dictionaries. Nobody can come to depend on an order that changes every time.'
      },
      {
        label: 'The test', pic: usersPic,
        h: 'Who is holding the string?',
        text: [
          'Before any change that others can see, ask: <b>"If I change this, even to match the documentation, who might be relying on how it behaves now?"</b>',
          'The answer grows with the number of users. With one user, you can ask them. With three, you can write to all of them. With three hundred, you can be sure that somebody relies on almost everything, including things you have never noticed yourself.',
          'Try it on Sam\'s morning. Lower-case answers: who checks the exact text? Faster storage: who reads the list from the top? The typo: who searches for those letters? Three honest answers would have been three emails, sent before the change and not after.'
        ],
        tip: 'Lesson 41 ended with a warning that comes true here: whatever you accept, somebody comes to depend on. If the API had quietly accepted <code>cc</code> as a cookie name, taking that away later would break someone too. Being forgiving is a behaviour people can see.'
      },
      {
        label: 'When not to', pic: limitsPic,
        h: 'A reason for care, not for fear.',
        text: [
          '<b>Do not freeze everything.</b> Suppose Sam, once burned, refuses to change anything ever again, typo included. Bugs pile up and the API slowly rots. In the xkcd comic, the right answer was still to stop the computer overheating. Fix bugs and make things better. Just do it on purpose and with notice.',
          '<b>One user barely counts.</b> Maya\'s own little script that adds up the week\'s sales has one user: Maya. She can change its output any way she likes. The law is about <b>many</b> users you cannot see. For small, private code it hardly applies.',
          '<b>Never keep a security hole because someone uses it.</b> Suppose a partner\'s program relies on a bug that lets <code>status</code> show any customer\'s address. Close it today, with no overlap period, and then tell them why. Lesson 38, Least privilege, comes first.',
          '<b>It is not a reason to blame users</b>, and it does not make every accident a promise. You still decide what to keep. Hyrum\'s law only tells you that every change has a cost, so you plan for it.'
        ],
        warn: 'Like Conway\'s law in lesson 53, this is a pattern people noticed on many projects, not a rule of nature. Next is lesson 56, Chesterton\'s fence: before you remove something, find out why it is there.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'A weather API has 5,000 users. Its docs say nothing about order, but it has always listed cities in A to Z order. The team stores the data a new way, and the order changes. What does Hyrum\'s law predict?',
        options: ['Nothing breaks, because order was never promised', 'Some users\' programs break, because they relied on A to Z', 'Only the weather team\'s own tests fail', 'Users will be glad of the faster storage'],
        answer: 1,
        why: 'With 5,000 users, someone almost certainly read the list as if it were sorted. The docs do not protect them, or you.',
        hint: 'Think of Sam\'s faster list and the party planner.'
      },
      {
        type: 'bucket', q: 'For Maya\'s orders API: part of the written promise, or only something people can see?',
        buckets: ['Written promise', 'Only observable'],
        items: [
          ['status answers received, baking or ready', 0],
          ['The answers come in capital letters', 1],
          ['Today\'s orders come back sorted by time (before Maya promised it)', 1],
          ['The error text says "Unknwon cookie"', 1],
          ['A status call takes about a tenth of a second', 1]
        ],
        why: 'The promise is one line. Everything else is under the water, and with enough users each piece has a string tied to it.'
      },
      {
        type: 'pick', q: 'After Sam\'s tidy-up, <code>status(212)</code> answers <code>"baking"</code>. What does the delivery app show?',
        pic: code(['answer = orders_api.status(212)', 'if answer == "BAKING":', '    show("In the oven")', 'else:', '    show("Unknown status")'], { title: 'the delivery app' }),
        options: ['In the oven', 'Unknown status', 'It crashes with an error', 'Nothing at all'],
        answer: 1,
        why: '<code>==</code> compares text exactly. <code>"baking"</code> and <code>"BAKING"</code> are different text, so line 2 says no and line 5 runs.',
        hint: 'Does Python treat small and capital letters as the same?'
      },
      {
        type: 'order', q: 'Put a careful change to a visible behaviour in order.',
        items: ['Find out who might rely on the current behaviour', 'Tell every user what will change, and the date', 'Keep the old way working while users update', 'Switch on the day you said'],
        why: 'Notice first, then time. The switch itself is the smallest step.',
        hint: 'You cannot warn people before you know what might affect them.'
      },
      {
        type: 'match', q: 'Match each story to the law from this module that it shows.',
        pairs: [
          ['A note is lost at the seam between two teams that rarely talk', "Lesson 53, Conway's law"],
          ['Four new developers join a late project, and it finishes even later', "Lesson 54, Brooks's law"],
          ['Fixing a typo in an error message breaks a partner\'s program', "Lesson 55, Hyrum's law"]
        ],
        why: 'Conway\'s law is about who talks to whom. Brooks\'s law is about adding people late. Hyrum\'s law is about users building on everything they can see.'
      },
      {
        type: 'pick', q: 'Two years ago Maya\'s order reader started accepting <code>Choc Chip</code> and <code>choc chip </code> as well as <code>choc chip</code>. Now she wants it strict again. Which earlier lesson warned that this would be hard?',
        options: ['Lesson 6, DRY', 'Lesson 41, Robustness principle', 'Lesson 36, Immutability', 'Lesson 10, Premature optimisation'],
        answer: 1,
        why: 'Lesson 41\'s "When not to" said: whatever you accept, somebody comes to depend on. Partners now send capitals and spaces, so going strict breaks them. Forgiveness you show becomes a promise in practice.',
        hint: 'Which lesson was about being forgiving in what you accept?'
      },
      {
        type: 'pick', q: 'A partner\'s program relies on a bug that lets <code>status</code> show any customer\'s address. What should Maya\'s company do?',
        options: ['Keep the bug, because someone depends on it', 'Announce a fix for next year and keep the old way working until then', 'Close the hole now, then tell the partner why', 'Change nothing, and add a line to the docs'],
        answer: 2,
        why: 'Hyrum\'s law tells you a change has a cost. It does not tell you to keep a security hole. Customers\' safety comes first.',
        hint: 'Who gets hurt while the hole stays open?'
      },
      {
        type: 'pick', q: 'Which of these are true about Hyrum\'s law? Pick all that apply.',
        options: ['It is named after Hyrum Wright, a software engineer at Google', 'Good documentation means nobody will rely on anything else', 'It is an observation about people, not a law of nature', 'For a script only you use, it hardly applies'],
        answer: [0, 2, 3],
        why: 'The documentation is only the tip. The law is about many users you cannot see, so a private script with one user barely feels it.',
        hint: 'Three are true. One is the exact thing the law says is false.'
      }
    ]
  });
})();
