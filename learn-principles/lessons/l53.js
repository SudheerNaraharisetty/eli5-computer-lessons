/* Lesson 53: Conway's law (module 6, its first lesson). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;
  const DARK = '#15132B', LIGHT = '#ECEAFF', SKIN = '#F2C9A5';

  /* ---------- shared drawing: three teams, three programs ---------- */
  const person = (x, y, col) =>
    `<path d="M${x - 15} ${y + 30} q0 -20 15 -20 q15 0 15 20 z" fill="${col}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>` +
    `<circle cx="${x}" cy="${y}" r="10" fill="${SKIN}" stroke="${P.ink}" stroke-width="2.5"/>`;
  const TEAMS = [
    { k: 'Kitchen', x: 16, fill: P.warnT, col: P.warn, people: ['baker', 'Nina'], prog: 'kitchen screen' },
    { k: 'Website', x: 254, fill: P.tint, col: P.accent, people: ['Priya', 'Tom'], prog: 'website' },
    { k: 'Money', x: 436, fill: P.okT, col: P.ok, people: ['accountant', 'Sam'], prog: 'books' }
  ];
  const line = (x1, y1, x2, y2, col, w, dash) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;

  // The people. o.fixed: the Website and Kitchen teams now talk every week. o.cap: captions under the row.
  function teamRow(y, o) {
    o = o || {};
    const m = y + 56;
    return (o.fixed
      ? line(166, m, 252, m, P.ok, 6) + T(209, m - 12, 'every Monday', { s: 11.5, f: P.ok })
      : line(170, m, 250, m, P.ink2, 2.5, '2 8') + T(209, m - 12, 'rarely talk', { s: 11.5, f: P.danger })) +
      line(404, m, 434, m, P.ink, 7) +
      TEAMS.map(t =>
        box(t.x, y, 148, 112, t.fill, 14) + T(t.x + 74, y + 22, t.k + ' team', { s: 12.5 }) +
        line(t.x + 52, y + 54, t.x + 96, y + 54, P.ink, 4) +
        person(t.x + 40, y + 48, t.col) + person(t.x + 108, y + 48, t.col) +
        T(t.x + 40, y + 99, t.people[0], { s: 11.5, w: 700, f: P.ink2 }) + T(t.x + 108, y + 99, t.people[1], { s: 11.5, w: 700, f: P.ink2 })
      ).join('') +
      (o.cap === false ? '' :
        T(90, y + 136, 'bakery, across town', { s: 12, w: 700, f: P.ink2 }) +
        T(419, y + 136, 'one front office: they talk all day', { s: 12, w: 700, f: P.ink2 }));
  }
  // The software those people built.
  function progRow(y, o) {
    o = o || {};
    const m = y + 29;
    return (o.fixed
      ? line(166, m, 252, m, P.ok, 6) + T(209, m - 12, 'at once', { s: 11.5, f: P.ok })
      : line(170, m, 250, m, P.ink2, 2.5, '2 8') + T(209, m - 12, 'nightly file', { s: 11.5, f: P.danger })) +
      line(404, m, 434, m, P.ink, 7) +
      TEAMS.map(t => box(t.x, y, 148, 58, DARK, 14) + T(t.x + 74, y + 35, t.prog, { s: 13, m: true, f: LIGHT })).join('') +
      (o.cap === false ? '' :
        (o.fixed
          ? T(209, y + 82, 'sent with its note', { s: 12, w: 700, f: P.ok })
          : T(209, y + 82, 'copied by hand', { s: 12, w: 700, f: P.danger })) +
        T(419, y + 82, 'live link', { s: 12, w: 700, f: P.ok }));
  }

  /* ---------- 1. the idea: two builders who never met ---------- */
  const housePic = svg(600, 290, 'Two rooms, each built well by a different builder. The pipes in the wall between them do not line up, because the two builders never met.',
    person(150, 28, P.accent) + T(150, 76, 'builder A', { s: 12, w: 700, f: P.ink2 }) +
    person(450, 28, P.warn) + T(450, 76, 'builder B', { s: 12, w: 700, f: P.ink2 }) +
    line(190, 40, 410, 40, P.ink2, 2.5, '2 8') + T(300, 30, 'never met', { s: 12, f: P.danger }) +
    box(40, 96, 220, 120, P.okT, 16) + T(150, 150, 'kitchen', { s: 16 }) + T(150, 174, 'fine', { s: 12.5, f: P.ok }) +
    box(340, 96, 220, 120, P.okT, 16) + T(450, 150, 'bathroom', { s: 16 }) + T(450, 174, 'fine', { s: 12.5, f: P.ok }) +
    line(264, 128, 292, 128, P.ink, 9) + line(308, 184, 338, 184, P.ink, 9) +
    `<circle cx="300" cy="156" r="18" fill="${P.dangerT}" stroke="${P.ink}" stroke-width="2.5"/>` + T(300, 165, '≠', { s: 24, f: P.danger }) +
    T(300, 250, 'Each room is fine. The join between them is the mess.', { s: 13.5 }) +
    T(300, 272, 'It sits exactly between two people who never talked.', { s: 12.5, w: 700, f: P.ink2 }));

  /* ---------- 2. the story: the two drawings ---------- */
  const mapPic = svg(600, 400, 'Top: three teams and who talks to whom. Bottom: the three programs they built and how those are connected. The two drawings have the same boxes and the same lines.',
    T(300, 22, 'WHO TALKS TO WHOM', { s: 12.5, f: P.ink2 }) + teamRow(36) +
    T(300, 216, 'THE SOFTWARE, ONE YEAR LATER', { s: 12.5, f: P.ink2 }) + progRow(230) +
    T(300, 356, 'Same boxes. Same lines.', { s: 16 }) + T(300, 380, 'Nobody planned it that way.', { s: 13, w: 700, f: P.ink2 }));

  /* ---------- 3. the pain: the note falls into the gap ---------- */
  const mono = (x, y, s, f) => T(x, y, s, { s: 11.5, m: true, a: 'start', f: f || P.ink });
  const lostPic = svg(600, 360, 'An order with a no nuts note is complete on the website. The nightly file has no column for notes, so the kitchen screen shows the order without it. Below, a customer asks if her cake is in the oven and the website cannot know.',
    T(108, 20, 'ON THE WEBSITE', { s: 12, f: P.accent }) + T(300, 20, 'THE NIGHTLY FILE', { s: 12, f: P.danger }) + T(492, 20, 'KITCHEN SCREEN', { s: 12, f: P.warn }) +
    box(16, 32, 184, 110, P.white, 14) + mono(30, 58, 'order 212') + mono(30, 80, 'birthday cake x 1') +
    `<rect x="30" y="94" width="150" height="32" rx="8" fill="#FFD98A" stroke="${P.ink}" stroke-width="2.5"/>` + T(105, 115, 'note: NO NUTS', { s: 12.5 }) +
    arrow(206, 86, 232, 86, P.ink, 3) +
    box(238, 32, 124, 110, P.paper2, 14) + mono(250, 58, '212,') + mono(250, 80, 'birthday cake,') + mono(250, 102, '1') +
    T(300, 130, '3 columns', { s: 11.5, w: 700, f: P.ink2 }) +
    arrow(368, 86, 394, 86, P.ink, 3) +
    box(400, 32, 184, 110, DARK, 14) + mono(414, 58, 'order 212', LIGHT) + mono(414, 80, 'birthday cake x 1', LIGHT) +
    `<rect x="414" y="94" width="150" height="32" rx="8" fill="none" stroke="#FF9DB5" stroke-width="2.5" stroke-dasharray="6 6"/>` + T(489, 115, 'note: (nothing)', { s: 12.5, f: '#FF9DB5' }) +
    line(219, 100, 219, 150, P.danger, 2.5, '2 7') +
    `<g transform="rotate(-9 219 176)"><rect x="160" y="160" width="118" height="32" rx="8" fill="#FFD98A" stroke="${P.ink}" stroke-width="2.5"/>` + T(219, 181, 'NO NUTS', { s: 13 }) + `</g>` +
    T(219, 218, 'falls out here', { s: 12.5, f: P.danger }) +
    `<line x1="20" y1="238" x2="580" y2="238" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    person(46, 268, P.ink2) + box(84, 258, 220, 50, P.white, 14) + T(194, 288, '"Is my cake in the oven yet?"', { s: 12.5 }) +
    arrow(312, 283, 342, 283, P.ink, 3) +
    box(350, 258, 234, 50, P.dangerT, 14) + T(467, 288, 'The website cannot know.', { s: 12.5, f: P.danger }) +
    T(300, 342, 'The answer lives in the kitchen program, on the far side of the same seam.', { s: 12.5, w: 700, f: P.ink2 }));

  /* ---------- 4. what to do: fix the conversation, then the link ---------- */
  const fixPic = svg(600, 424, 'After the fix. The Website and Kitchen teams meet every Monday, and their two programs are joined by a solid link that carries each order at once with its note. Below is the short agreement they wrote.',
    T(300, 22, 'FIRST, THE PEOPLE', { s: 12.5, f: P.ink2 }) + teamRow(36, { fixed: true, cap: false }) +
    T(300, 184, 'THEN THE SOFTWARE FOLLOWS', { s: 12.5, f: P.ink2 }) + progRow(198, { fixed: true }) +
    box(40, 312, 520, 98, P.white, 16) + T(300, 336, 'AGREED BY WEBSITE AND KITCHEN, ON ONE PAGE', { s: 12, f: P.accent }) +
    T(62, 364, '1. Every order goes to the kitchen at once: number, item, count, note.', { s: 12.5, w: 700, a: 'start' }) +
    T(62, 390, '2. The kitchen answers one question: waiting, in the oven, or ready?', { s: 12.5, w: 700, a: 'start' }));

  /* ---------- 5. the test: where do the complaints sit? ---------- */
  const dot = (x, y) => `<circle cx="${x}" cy="${y}" r="6" fill="${P.danger}" stroke="${P.ink}" stroke-width="2"/>`;
  const testPic = svg(600, 380, 'Last month had 9 complaints. Drawn on the software map, 7 of them sit on the link between the website and the kitchen screen. On the team drawing, that is the one line that says rarely talk.',
    T(300, 20, 'LAST MONTH: 9 COMPLAINTS, DRAWN WHERE THEY HAPPENED', { s: 12, f: P.ink2 }) +
    [188, 202, 216, 230].map(x => dot(x, 62)).join('') + [195, 209, 223].map(x => dot(x, 46)).join('') + T(262, 52, '7', { s: 18, f: P.danger }) +
    dot(90, 62) + T(108, 67, '1', { s: 14, f: P.ink2 }) + dot(328, 62) + T(346, 67, '1', { s: 14, f: P.ink2 }) + T(419, 67, '0', { s: 14, f: P.ok }) +
    progRow(78, { cap: false }) +
    T(300, 170, 'NOW LOOK AT THE PEOPLE', { s: 12, f: P.ink2 }) + teamRow(184, { cap: false }) +
    `<path d="M168 228 C166 204 252 202 252 230 C252 258 164 260 166 224" fill="none" stroke="${P.danger}" stroke-width="3" stroke-linecap="round"/>` +
    T(300, 330, 'The awkward seam in the software', { s: 14 }) + T(300, 352, 'sits exactly where two groups of people do not talk.', { s: 14 }));

  /* ---------- 6. when not to ---------- */
  const tinyBox = (x, y, fill) => `<rect x="${x}" y="${y}" width="46" height="34" rx="8" fill="${fill}" stroke="${P.ink}" stroke-width="2.5"/>`;
  const limitPic = svg(600, 300, 'Left: three people at one table who talk all day have nothing to fix. Right: a company that reorganises its teams four times in one year, which costs months each time.',
    T(150, 28, 'ONE TABLE', { s: 12.5, f: P.ok }) + T(450, 28, 'REORGANISE AGAIN?', { s: 12.5, f: P.danger }) +
    `<ellipse cx="150" cy="150" rx="74" ry="34" fill="${P.sand}" stroke="${P.ink}" stroke-width="2.5"/>` +
    person(92, 96, P.accent) + person(150, 84, P.warn) + person(208, 96, P.ok) +
    line(104, 150, 196, 150, P.ink, 4) + line(112, 136, 150, 164, P.ink, 4) + line(188, 136, 150, 164, P.ink, 4) +
    T(150, 226, '3 people who talk all day', { s: 13, w: 700, f: P.ink2 }) + T(150, 246, 'no seams to hunt for', { s: 13, w: 700, f: P.ink2 }) +
    `<line x1="300" y1="20" x2="300" y2="280" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    ['Jan', 'Apr', 'Jul', 'Oct'].map((mth, i) => {
      const y = 50 + i * 40, sh = [[0, 1, 2], [2, 0, 1], [1, 2, 0], [0, 2, 1]][i], fills = [P.warnT, P.tint, P.okT];
      return T(352, y + 23, mth, { s: 12.5, w: 700, f: P.ink2 }) + sh.map((f, j) => tinyBox(384 + j * 58, y, fills[f])).join('');
    }).join('') +
    T(450, 226, '4 new team charts in one year', { s: 13, w: 700, f: P.ink2 }) + T(450, 246, 'each one costs months of work', { s: 13, w: 700, f: P.danger }));

  /* ---------- quiz pictures ---------- */
  const quizMap = svg(600, 150, 'A different company. The app team and the payments team sit together. The delivery team is in another city and talks to the others about once a month.',
    box(20, 30, 150, 60, P.tint, 14) + T(95, 66, 'App team', { s: 13.5 }) +
    box(200, 30, 150, 60, P.okT, 14) + T(275, 66, 'Payments team', { s: 13.5 }) +
    box(430, 30, 150, 60, P.warnT, 14) + T(505, 66, 'Delivery team', { s: 13.5 }) +
    line(174, 60, 198, 60, P.ink, 7) + line(356, 60, 426, 60, P.ink2, 2.5, '2 8') +
    T(185, 116, 'same room', { s: 12, w: 700, f: P.ink2 }) + T(391, 116, 'another city, one call a month', { s: 12, w: 700, f: P.ink2 }));

  COURSE.add({
    id: 'l53', minutes: 8,
    summary: 'Software ends up shaped like the team that built it, and above all like <b>who talks to whom</b>. That is Conway\'s law. Where two groups of people do not talk, expect a clumsy seam between their two parts of the program.',
    video: {
      src: 'videos/l53-conways-law.mp4', poster: 'videos/l53-conways-law.jpg', length: '1 min 8 s',
      script: [
        'Maya\'s cookie shop is a company now. It has 3 small teams. Website. Kitchen. And Money.',
        'Website and Money share an office, and talk all day. The Kitchen team is across town. They hardly ever talk to Website.',
        'Nobody planned the software. But look at it a year later. 3 programs. One for each team.',
        'And the links between them? Website and Money, a smooth live link. Website and Kitchen, one file a night, copied by hand.',
        'Slide the 2 drawings together. They match, line for line.',
        'So an order with a note, no nuts, travels fine inside the website. Then it falls into the gap. The kitchen never sees it.',
        'The fix starts with people. Give Website and Kitchen a weekly meeting, and one clear agreement. The gap closes. Now every order reaches the kitchen at once, note and all.',
        'That is Conway\'s law. Software copies the team that built it. So if you want a different shape, start with who talks to whom.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: housePic,
        h: 'The join shows who never talked.',
        text: [
          'The earlier modules were about code. This one is about the <b>people and projects</b> around the code, in the form of famous observations that carry somebody\'s name.',
          'They are called "laws", but they are <b>not laws of nature</b>. Each one is a pattern that many people noticed on many projects. Treat them as rules of thumb: usually true, never guaranteed.',
          'Start with a house. One builder makes the kitchen. Another makes the bathroom. They never meet. Each room turns out fine. But the pipes in the wall between them do not line up. You can find the place where two people did not talk just by looking at the house.',
          'Software works the same way. <b>Conway\'s law</b> says: the shape of the software ends up matching the shape of the team that built it, and above all <b>who talks to whom</b>. People who talk all day build parts that fit together smoothly. People who never talk leave a clumsy seam exactly between their parts, however good each part is.'
        ],
        tip: 'Melvin Conway, a computer scientist, wrote this in a paper called "How Do Committees Invent?", published in April 1968. His wording: organizations which design systems "are constrained to produce designs which are copies of the communication structures of these organizations". Fred Brooks made the name "Conway\'s law" famous in his 1975 book <i>The Mythical Man-Month</i>. A commonly told illustration: ask four teams to build one program, and you tend to get a program in four parts.'
      },
      {
        label: 'The story', pic: mapPic,
        h: 'Two drawings that turn out to be one.',
        text: [
          'Maya\'s cookie shop has grown into a small company. It now has three small teams.',
          'The <b>Website team</b> is Priya and Tom. They sit in the front office. The <b>Money team</b> is the accountant and Sam, who started as Maya\'s helper and is now a developer. They sit in the same front office, so those four talk all day. The <b>Kitchen team</b> is the baker and a developer called Nina. They work in the bakery building, across town. They rarely talk to the Website team.',
          'That is the top drawing: who talks to whom. A thick line means "all day". A dotted line means "rarely".',
          'Now the software. Nobody ever sat down and planned its shape. Each team built what it needed. A year later there are exactly <b>three programs</b>, one per team: the website, the kitchen screen and the books.',
          'Look at how the programs are joined. The website and the books share a live link. A sale shows up in the books the moment it happens. The website and the kitchen screen are joined by one file a night. At 6 pm Tom saves the day\'s orders as a file and emails it. Nina loads it into the kitchen screen by hand.',
          'Compare the two drawings. <b>Same boxes. Same lines.</b> The thick line between people is the live link between programs. The dotted line between people is the nightly file. The team chart and the software map are the same drawing.'
        ],
        tip: 'You have seen a small version of this. Lesson 16, Single responsibility, gave one piece of code to each person who could ask for a change: the baker, the accountant and Maya. Conway\'s law is what happens at the size of a company, whether anybody plans it or not.'
      },
      {
        label: 'The pain', pic: lostPic,
        h: '"No nuts" never reaches the kitchen.',
        text: [
          'The nightly file was agreed once, a year ago. It has three columns: order number, item, and how many.',
          'In March the Website team added a box for notes. A customer types: <b>"No nuts. My son is allergic."</b> On the website the order is complete. Inside the website program, everything is smooth.',
          'But the file has no column for notes. Nobody on the Website team thought about the kitchen screen. Nobody in the kitchen knew the box existed. So the kitchen screen shows order 212, one birthday cake, and nothing else. The baker makes the usual cake, with walnuts on top.',
          'The customer spots the walnuts when she collects it. Nobody is hurt, and the cake is baked again. But the note was lost at the seam, and it was always going to be lost there.',
          'Customers feel the seam in a second way. They ask the website, "Is my cake in the oven yet?" The website cannot know. That answer lives in the kitchen program, and getting it would need two teams to talk.'
        ],
        warn: 'Nothing crashed. Each program is well made. Priya, Tom and Nina each did careful work. The bug does not live in any one program. It lives <b>between</b> two of them, in the same spot as the missing conversation.'
      },
      {
        label: 'What to do', pic: fixPic,
        h: 'Choose the shape. Then arrange the people.',
        text: [
          'Maya\'s first thought is to rewrite the code that makes the file. Sam stops her. The file is only the copy. The thing being copied is two teams who do not talk. Patch the file, and the next surprise will fall into the same gap.',
          'So turn the law around. If software copies the team, then <b>decide the software shape you want, and arrange the people and their conversations to match</b>. People call this the "inverse Conway manoeuvre".',
          'What shape does Maya want? Taking an order and baking it should work as one smooth thing. So those people need to talk. She does two things.',
          '<b>1. A regular conversation.</b> Every Monday, Website and Kitchen meet for 15 minutes. On Mondays Nina also works from the front office, at the desk next to Tom.',
          '<b>2. A clear agreement between the two programs.</b> At the first meeting they write down, on one page, what each program may ask of the other. That short list is an interface, from lesson 28, Program to an interface. Two teams can only agree on a socket if they sit down and talk about it.',
          'Within a month the nightly file is gone. Each order reaches the kitchen screen at once, with its note. The website can ask the kitchen where an order is, so customers can see "in the oven". The dotted line between the people became a solid one. The link between the programs followed.'
        ],
        tip: 'Lesson 44, Layers and the dependency rule, drew the program as three rings. That was a shape Maya chose on purpose. Conway\'s law adds a warning: a chosen shape only lasts if the teams and their conversations fit it. Otherwise the team chart quietly wins.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Find the seams. Then look at the people.',
        text: [
          'Ask: <b>"Where are the awkward seams in this software, and do they sit exactly where two groups of people do not talk?"</b>',
          'Try it on Maya\'s company. Last month there were 9 complaints. Draw each one on the software map, at the place where it went wrong. 1 was inside the website. 1 was inside the kitchen screen. <b>7 were on the link between them</b>: 4 lost notes, and 3 orders placed after 6 pm that missed the file. The link between the website and the books had 0.',
          'Now look at the people. The seam with 7 complaints is the one line that says "rarely talk". That is your answer. Before anyone rewrites code, look for the <b>missing conversation</b>.',
          'The test also works forwards. Before a project starts, look at the team chart. It is a rough sketch of the software you are about to get.'
        ],
        tip: 'Lesson 2, High cohesion, and lesson 3, Loose coupling, were about what goes inside a part and how parts connect. A good team is the same picture with people: lots of talk inside it, and a small, clear agreement with the teams around it.'
      },
      {
        label: 'When not to', pic: limitPic,
        h: 'A tendency, not destiny.',
        text: [
          '<b>It is a pull, not a prison.</b> Teams that talk well across their borders can build well-joined software, even from different buildings. Conway described what tends to happen. He did not say it must.',
          '<b>Do not move people every time the code feels awkward.</b> Suppose Maya loves this lesson and redraws the team chart four times in one year. Every change costs months. People learn new work, lose the colleagues they knew, and worry about their jobs. Lesson 4, Trade-offs, not laws, asked: "Is this problem real right now?" Start with the cheapest fix, a regular conversation. Move a desk only if that is not enough.',
          '<b>A tiny team can skip it.</b> Three people at one table already talk to each other all day. There are no borders, so there are no seams to hunt for. When Maya had one helper, this law had nothing to say.',
          '<b>It is not an excuse.</b> "The team chart made me do it" is not a reason to ship a clumsy design. If one conversation would fix the join, go and have the conversation.'
        ],
        warn: 'Used well, Conway\'s law is a way of looking: it tells you where to search. It cannot tell you that every seam is a people problem. Some seams are just hard problems, and some awkward code is just awkward code.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'A company has a search team and a checkout team. They sit on different floors and never meet. Each team writes excellent code. What does Conway\'s law predict?',
        options: ['Both parts will be badly written', 'An awkward join exactly between search and checkout', 'The two teams will write the same code twice', 'Nothing. Good code is good code'],
        answer: 1,
        why: 'Each part can be excellent. The law is about the place <b>between</b> the parts: it copies the missing conversation.',
        hint: 'Think of the two builders and the wall between their rooms.'
      },
      {
        type: 'pick', q: 'In this other company, where would you look first for lost or mangled information?',
        pic: quizMap,
        options: ['Inside the app', 'Between the app and payments', 'Between payments and delivery', 'Inside payments'],
        answer: 2,
        why: 'The dotted line is the weak conversation: another city, one call a month. The software between those two teams is the likeliest place for a clumsy seam.',
        hint: 'Find the two groups that talk the least.'
      },
      {
        type: 'match', q: 'Match how the people talk to the software they tend to build.',
        pairs: [
          ['One team, same desks', 'One program whose pieces fit together smoothly'],
          ['Two teams in one office who talk all day', 'Two programs joined by a smooth live link'],
          ['Two teams across town who rarely talk', 'Two programs joined by a nightly file, copied by hand']
        ],
        why: 'The software map copies the conversation map, box for box and line for line.'
      },
      {
        type: 'order', q: 'Put the story of order 212 in order.',
        items: ['Website and Kitchen agree a file with three columns', 'The Website team adds a box for notes', 'A customer orders a cake and types "no nuts"', 'The nightly file carries the order without the note', 'The baker makes the usual cake, with walnuts'],
        why: 'The trap was set when two teams stopped talking after the first agreement. The note box only sprang it.',
        hint: 'The file was agreed long before the notes box existed.'
      },
      {
        type: 'bucket', q: 'A good use of Conway\'s law, or a misuse?',
        buckets: ['Good use', 'Misuse'],
        items: [
          ['Checking whether a troublesome seam sits between two teams that rarely talk', 0],
          ['Starting a weekly meeting between two teams whose programs must work as one', 0],
          ['Looking at the team chart to guess the shape of the software you will get', 0],
          ['Redrawing all the teams every time some code feels awkward', 1],
          ['Saying "the team chart made me do it" about a design one chat could fix', 1],
          ['Three people at one table spending a week mapping who talks to whom', 1]
        ],
        why: 'The law tells you where to look and which conversations to set up. It is not an excuse, and it is not a reason for endless reorganising.'
      },
      {
        type: 'pick', q: 'Website and Kitchen wrote down, on one page, the short list of things each program may ask of the other. Which earlier lesson is that, applied to two teams?',
        options: ['Lesson 6, DRY', 'Lesson 28, Program to an interface', 'Lesson 36, Immutability', 'Lesson 10, Premature optimisation'],
        answer: 1,
        why: 'An interface is the short agreed list of what you can ask a part to do. Between two programs owned by two teams, somebody has to sit down and agree that list. That takes a conversation.',
        hint: 'Which lesson was about a socket and a short agreed list?'
      },
      {
        type: 'pick', q: 'A seam between two programs keeps losing information. According to this lesson, what should you look for <b>first</b>?',
        options: ['A faster computer', 'A full rewrite of both programs', 'The missing conversation between the people who own them', 'Someone to blame'],
        answer: 2,
        why: 'The clumsy link is a copy. Fix what it is copying. A regular conversation is also the cheapest thing to try.'
      },
      {
        type: 'pick', q: 'Which of these are true about Conway\'s law? Pick all that apply.',
        options: ['It is an observation about what tends to happen, not a law of nature', 'It is named after Melvin Conway, who wrote about it in 1968', 'It proves that every awkward piece of code is a people problem', 'Teams that talk well across borders can still build well-joined software'],
        answer: [0, 1, 3],
        why: 'It is a tendency, noticed on many projects. It tells you where to look. It does not say every seam is caused by people.',
        hint: 'Three are true. One claims far too much.'
      }
    ]
  });
})();
