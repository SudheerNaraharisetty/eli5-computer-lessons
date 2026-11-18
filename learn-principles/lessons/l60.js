/* Lesson 60: Hofstadter's law (module 6). One file per lesson. */
(function () {
  const { P, svg, box, T, arrow } = PR;

  const line = (x1, y1, x2, y2, col, w, dash) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
  const rect = (x, y, w, h, fill, r, sw) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r || 8}" fill="${fill}" stroke="${P.ink}" stroke-width="${sw || 2.5}"/>`;
  const tick = (x, y) => `<circle cx="${x}" cy="${y}" r="10" fill="${P.ok}" stroke="${P.ink}" stroke-width="2"/><path d="M${x - 5} ${y} l3.5 3.5 l6.5 -7" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`;
  const GROUP = { plan: [P.okT, P.ok], odd: [P.warnT, P.warn], around: [P.tint, P.accent], stop: [P.dangerT, P.danger] };

  // The ten pieces gift messages turned into, in the order they were found. d = working days.
  const PIECES = [
    ['plan', 1, 'box + save'], ['plan', 1, 'print card'],
    ['odd', 0.5, 'too long'], ['odd', 0.5, 'emoji'], ['odd', 0.5, 'rude words'],
    ['around', 1.5, 'kitchen screen'], ['around', 1, 'tests'], ['around', 0.5, 'tell partners'], ['around', 0.5, 'review'],
    ['stop', 2, 'emergency']
  ];
  const dayTxt = d => (d === 1 ? '1 day' : d + ' days').replace('0.5 days', '0.5 day');

  // A day ruler with bars. rows: [label, days, fill, text]
  function bars(y0, rows, o) {
    o = o || {};
    const X = 96, D = o.D || 46;
    return rows.map((r, i) => {
      const y = y0 + i * 34;
      return T(X - 10, y + 18, r[0], { s: 12.5, a: 'end', f: P.ink2 }) + rect(X, y, r[1] * D, 24, r[2], 6, 2) + (r[3] ? T(X + r[1] * D + 8, y + 17, r[3], { s: 12, a: 'start', f: r[4] || P.ink }) : '');
    }).join('') +
      line(X, y0 + rows.length * 34 + 4, X + 10 * D, y0 + rows.length * 34 + 4, P.ink, 2.5) +
      [...Array(11)].map((_, d) => line(X + d * D, y0 + rows.length * 34, X + d * D, y0 + rows.length * 34 + 8, P.ink, 2) + T(X + d * D, y0 + rows.length * 34 + 24, String(d), { s: 11, w: 700, f: P.ink2 })).join('') +
      T(X - 10, y0 + rows.length * 34 + 24, 'days', { s: 11, w: 700, a: 'end', f: P.ink2 });
  }

  /* ---------- 1. the idea: painting a room ---------- */
  const ROOM = [['move the furniture', '1 h'], ['cover the floor, tape the edges', '1 h'], ['fill the holes', '1 h'], ['first coat', '2 h'], ['wait for it to dry', '4 h'], ['second coat', '2 h'], ['clean up, furniture back', '1 h']];
  const roomPic = svg(600, 330, 'Left: what you picture when you plan to paint a room: painting the walls, 2 hours. Right: what it really takes: seven steps adding up to 12 hours, and only two of them are painting.',
    T(140, 26, 'WHAT YOU PICTURE', { s: 12, f: P.accent }) + T(420, 26, 'WHAT IT TAKES', { s: 12, f: P.danger }) +
    box(30, 44, 220, 110, P.tint, 16) + T(140, 92, 'paint the walls', { s: 16 }) + T(140, 122, '2 hours', { s: 22, f: P.accent }) +
    T(140, 196, 'The part you can see.', { s: 12.5, w: 700, f: P.ink2 }) +
    box(280, 44, 290, 262, P.white, 16) +
    ROOM.map((r, i) => {
      const y = 76 + i * 28, paint = i === 3 || i === 5;
      return T(298, y, r[0], { s: 12.5, a: 'start', w: paint ? 800 : 700, f: paint ? P.accent : P.ink2 }) + T(552, y, r[1], { s: 12.5, a: 'end' });
    }).join('') +
    line(298, 270, 552, 270, P.ink, 2) + T(298, 292, 'total', { s: 14, a: 'start' }) + T(552, 292, '12 hours', { s: 14, a: 'end', f: P.danger }) +
    arrow(250, 100, 274, 100, P.ink2, 2.5));

  /* ---------- 2. the story: the guess and the doubled guess ---------- */
  const guessPic = svg(600, 300, 'Sam pictures three small steps: a text box, saving the note, printing the card, and says 2 days. Maya doubles it and plans for 4 days.',
    box(24, 20, 340, 180, P.white, 16) + T(44, 50, 'GIFT MESSAGES: WHAT SAM PICTURES', { s: 11.5, a: 'start', f: P.accent }) +
    [['a text box on the website', '0.5 day'], ['save the note with the order', '0.5 day'], ['print it on the card', '1 day']].map((r, i) =>
      T(44, 84 + i * 32, r[0], { s: 13.5, a: 'start' }) + T(344, 84 + i * 32, r[1], { s: 13, a: 'end', f: P.ink2 })).join('') +
    line(44, 166, 344, 166, P.ink, 2) + T(44, 188, 'Sam says', { s: 13.5, a: 'start', f: P.ink2 }) + T(344, 188, '2 days', { s: 16, a: 'end', f: P.accent }) +
    box(394, 20, 182, 180, P.tint, 16) + T(485, 52, 'MAYA PLANS', { s: 11.5, f: P.accent }) +
    T(485, 104, '2 × 2', { s: 26, m: true }) + T(485, 150, '= 4 days', { s: 22, f: P.accent }) + T(485, 180, 'her rule of thumb', { s: 11.5, w: 700, f: P.ink2 }) +
    box(24, 226, 552, 58, P.paper2, 14) +
    T(300, 252, 'Every step is real. Every step is on the happy path:', { s: 12.5, w: 700, f: P.ink2 }) +
    T(300, 272, 'a short, polite note, and a quiet week.', { s: 12.5, w: 700, f: P.ink2 }));

  /* ---------- 3. the pain: the card unfolds ---------- */
  const unfoldPic = svg(600, 396, 'One task card, gift messages, 2 days, unfolds into ten smaller cards as they are found: two as planned, three odd cases, four pieces of work around the work, and one interruption. Below, three bars: Sam guessed 2 days, Maya planned 4, the real work took 9.',
    PIECES.map((p, i) => {
      const x = 14 + (i % 5) * 116, y = i < 5 ? 40 : 128, g = GROUP[p[0]];
      return rect(x, y, 108, 62, P.white, 10) + `<rect x="${x + 1.5}" y="${y + 1.5}" width="7" height="59" rx="3" fill="${g[1]}"/>` +
        T(x + 16, y + 24, dayTxt(p[1]), { s: 12, a: 'start', f: g[1] }) + T(x + 16, y + 46, p[2], { s: 11, a: 'start', w: 700 });
    }).join('') +
    T(14, 28, 'AS PLANNED', { s: 11, a: 'start', f: P.ok }) + T(246, 28, 'ODD CASES', { s: 11, a: 'start', f: P.warn }) +
    T(14, 118, 'THE WORK AROUND THE WORK', { s: 11, a: 'start', f: P.accent }) + T(478, 118, 'INTERRUPTION', { s: 11, a: 'start', f: P.danger }) +
    bars(222, [['Sam', 2, P.white, 'guessed 2'], ['Maya', 4, P.tint, 'planned 2 × 2 = 4'], ['real', 9, P.dangerT, '9']]) +
    T(300, 384, 'Even the doubled guess was 5 days short.', { s: 13.5, f: P.danger }));

  /* ---------- 4. what to do: a list, a range, an early warning ---------- */
  const LIST = [['text box + save', '1'], ['print the card', '1'], ['card length limit', '0.5'], ['kitchen screen (Kitchen team)', '1.5'], ['tests', '1'], ['tell the partners', '0.5'], ['review', '0.5']];
  const rangePic = svg(600, 400, 'Sam\'s estimate done properly. A list of seven pieces, including the work around the work, adds up to 6 days. His history says careful lists still run about one and a half times over. So he says 6 to 10 days. The real 9 days falls inside the range.',
    box(24, 16, 552, 236, P.white, 16) + T(44, 44, 'SAM\'S LIST, BEFORE HE STARTS', { s: 11.5, a: 'start', f: P.accent }) + T(556, 44, 'days', { s: 11.5, a: 'end', f: P.ink2 }) +
    LIST.map((r, i) => T(44, 72 + i * 22, r[0], { s: 12.5, a: 'start', w: i >= 3 ? 800 : 700, f: i >= 3 ? P.accent : P.ink }) + T(556, 72 + i * 22, r[1], { s: 12.5, a: 'end' })).join('') +
    line(44, 222, 556, 222, P.ink, 2) + T(44, 242, 'list total (if nothing else turns up)', { s: 12.5, a: 'start', f: P.ink2 }) + T(556, 242, '6', { s: 14, a: 'end' }) +
    T(300, 284, 'History: careful lists ran 1.5 times over. 6 × 1.5 = 9, plus room for a surprise.', { s: 11.5, w: 700, f: P.ink2 }) +
    `<rect x="${96 + 6 * 46}" y="298" width="${4 * 46}" height="56" rx="10" fill="${P.okT}" stroke="${P.ok}" stroke-width="2.5" stroke-dasharray="6 5"/>` +
    T(96 + 8 * 46, 316, 'say "6 to 10 days"', { s: 12, f: P.ok }) +
    bars(324, [['real', 9, P.dangerT, '']]) + tick(96 + 9 * 46 + 18, 336));

  /* ---------- 5. the test: three questions ---------- */
  const testPic = svg(600, 300, 'The test applied to Tom\'s next task, delivery slots. His first guess is 3 days. The three questions add the work around the work, the odd cases and the waiting, and his history. The honest answer is 5 to 8 days, with an update on Wednesday.',
    box(24, 16, 552, 268, P.white, 16) +
    T(44, 46, 'TOM: "DELIVERY SLOTS? 3 DAYS."', { s: 12, a: 'start', f: P.ink }) +
    [['Work around the work?', 'tests, review, notice to the delivery partners'],
     ['Odd cases and waiting?', 'a full slot, a bank holiday, Kitchen team\'s Monday'],
     ['What did similar tasks take?', 'his last guesses ran about 1.5 times over']].map((r, i) =>
      `<circle cx="56" cy="${88 + i * 52}" r="13" fill="${P.accent}" stroke="${P.ink}" stroke-width="2"/>` + T(56, 93 + i * 52, String(i + 1), { s: 13, f: '#fff' }) +
      T(80, 86 + i * 52, r[0], { s: 13.5, a: 'start' }) + T(80, 106 + i * 52, r[1], { s: 12, a: 'start', w: 700, f: P.ink2 })).join('') +
    rect(44, 228, 512, 40, P.okT, 10) + T(300, 254, '"5 to 8 days. I will update you on Wednesday."', { s: 14, f: P.ok }));

  /* ---------- 6. when not to ---------- */
  const limitPic = svg(600, 300, 'Left: Sam now pads everything to a month, so Maya cannot plan anything. Right: adding a new cookie to the menu has been done 30 times and takes about an hour every time, so "1 hour" is a fine estimate.',
    T(150, 24, 'OVERDONE', { s: 12, f: P.danger }) + T(450, 24, 'WELL KNOWN', { s: 12, f: P.ok }) +
    box(24, 40, 252, 170, P.dangerT, 16) +
    ['gift messages?', 'new button?', 'fix a typo?'].map((q, i) => T(44, 74 + i * 40, q, { s: 13, a: 'start' }) + T(256, 74 + i * 40, '"a month"', { s: 13, a: 'end', f: P.danger })).join('') +
    T(150, 236, 'Every answer is "a month".', { s: 12.5, w: 700, f: P.ink2 }) + T(150, 256, 'Maya cannot plan anything.', { s: 12.5, w: 700, f: P.danger }) +
    `<line x1="300" y1="40" x2="300" y2="280" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    box(324, 40, 252, 170, P.okT, 16) + T(450, 74, 'add a new cookie', { s: 14 }) + T(450, 94, 'to the menu', { s: 14 }) +
    T(450, 132, 'done 30 times', { s: 13, w: 700, f: P.ink2 }) + T(450, 154, 'about 1 hour, every time', { s: 13, w: 700, f: P.ink2 }) +
    T(450, 190, '"1 hour" is fine', { s: 15, f: P.ok }) +
    T(450, 236, 'Repeated, small, well understood:', { s: 12.5, w: 700, f: P.ink2 }) + T(450, 256, 'the guess can be close.', { s: 12.5, w: 700, f: P.ok }));

  COURSE.add({
    id: 'l60', minutes: 9,
    summary: 'Work almost always takes longer than we expect. We picture the visible part and forget the odd cases, the work around the work, and the interruptions. That is Hofstadter\'s law, and the joke is that it holds <b>even when you allow for it</b>. So estimate in small pieces, as a range, and warn people early.',
    video: {
      src: 'videos/l60-hofstadters-law.mp4', poster: 'videos/l60-hofstadters-law.jpg', length: '1 min 16 s',
      script: [
        'Maya asks Sam how long gift messages will take. A note from the customer, printed on a card in the box.',
        'Sam pictures it. A box on the website. Save the note. Print the card. 2 days.',
        'Maya knows better. She doubles it. 4 days.',
        'Then the task unfolds. The box and the card take 2 days, as planned.',
        'Then the odd cases. A note too long for the card. Emoji the old printer cannot print. Rude words.',
        'Then the work around the work. The kitchen screen, which another team owns. Tests. A notice to the delivery partners. A review.',
        'And an emergency steals 2 days.',
        'Sam guessed 2. Maya planned 4. It took 9. Even the doubled guess was short.',
        'So break the work into small pieces. List the work around the work. Check what similar tasks really took. Give a range, 6 to 10 days. And when it slips, say so early.',
        'That is Hofstadter\'s law. It always takes longer than you expect, even when you take into account Hofstadter\'s Law.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: roomPic,
        h: 'A two-hour job that takes all weekend.',
        text: [
          'You decide to paint a room. "Two hours," you think, picturing the roller on the wall.',
          'Then you start. The furniture has to move. The floor needs covering and the edges need tape. There are holes to fill. The first coat has to dry before the second. Then the cleaning up. The painting really did take about two hours. The <b>job</b> took twelve.',
          'Work almost always looks like that from the start. We picture the part we can see and forget the work around it. Hofstadter\'s law says: <b>"It always takes longer than you expect, even when you take into account Hofstadter\'s Law."</b>',
          'Read the end again. It is a joke, and it points at itself. Even if you know the law and add extra time for it, you will still be late. Allowing for surprises does not tell you what the surprises will be.',
          'Like every law in this module, it is an observation and a rule of thumb, not a law of nature. Some tasks do finish on time. But bet on the other way.'
        ],
        tip: 'Douglas Hofstadter, an American professor who studies how minds think, wrote it in his 1979 book Gödel, Escher, Bach. He was writing about chess computers: experts kept predicting that a computer would beat the best human players within about ten years, and the date kept moving. Psychologists have a separate name for the same habit. In 1979 Daniel Kahneman and Amos Tversky described the <b>planning fallacy</b>: people underestimate how long their own tasks will take, even when they know that similar tasks ran late before.'
      },
      {
        label: 'The story', pic: guessPic,
        h: 'Two days, says Sam. Four, says Maya.',
        text: [
          'In lesson 54, Brooks\'s law, the Christmas pre-order page opened without gift messages. They were moved to January. Now it is January, and Maya wants them: a customer types a short note, and it is printed on a card that goes in the box with the cookies.',
          'She asks Sam how long it will take. Sam pictures it. A text box on the website, half a day. Save the note with the order, half a day. Print it on the card, one day. <b>"Two days."</b> (In this lesson a day means a working day.)',
          'Every step Sam pictured is real. But all of them are the <b>happy path</b>, the name from lesson 21, Guard clauses, for what happens when nothing is odd: a short, polite note, a printer that copes, and a quiet week.',
          'Maya has learned from experience. Sam\'s guesses usually run about twice too short. So she doubles it: <b>"I\'ll plan for four."</b> She tells customers in the January newsletter that gift messages arrive next week.'
        ],
        tip: 'Maya is already doing what many people think is the cure: take the guess and add a safety margin. Watch what happens to it.'
      },
      {
        label: 'The pain', pic: unfoldPic,
        h: 'The card unfolds.',
        text: [
          'Day 1 and day 2 go to plan. The text box saves the note, and the note prints on the card. On day 2 Sam says, honestly, "It is 90% done."',
          'Then the <b>odd cases</b> arrive, one by one. A customer writes a long note and the card has room for 4 short lines, about 120 characters: a limit nobody mentioned, like the 160-character text limit in lesson 45, Leaky abstractions. Half a day. Someone types a heart emoji, and the old card printer prints an empty box instead. Half a day. Tom types a rude test message, and everyone realises it would have been printed with the shop\'s name on it. Half a day for a check.',
          'Then the <b>work around the work</b>. The kitchen screen must show the message, so whoever packs the box adds the card. That screen belongs to the Kitchen team, so the change waits for their Monday meeting from lesson 53, Conway\'s law: a day and a half. Tests, as in lesson 49, Testing pyramid: a day. The orders API gains a new field, so the three partner programs get notice first, as lesson 55, Hyrum\'s law, taught: half a day. A review by Priya: half a day.',
          'Then an <b>interruption</b>. Card payments at the counter stop working. Sam is on the Money team, so gift messages wait for two days.',
          'Gift messages go live on day 9. Sam guessed 2. Maya planned 4. Even the doubled guess was 5 days short. The newsletter promise was broken, and Maya only heard on day 8.'
        ],
        tip: 'Sam\'s "90% done" on day 2 has a famous joke of its own, the ninety-ninety rule, credited to Tom Cargill of Bell Labs and made popular by Jon Bentley in 1985: "The first 90 percent of the code accounts for the first 90 percent of the development time. The remaining 10 percent of the code accounts for the other 90 percent of the development time."',
        warn: 'Nobody was lazy, and nothing was badly built. The work was always 9 days. The estimate only counted the part anyone could see at the start.'
      },
      {
        label: 'What to do', pic: rangePic,
        h: 'Estimate the pieces. Say a range. Warn early.',
        text: [
          'The law says you cannot remove the surprise. You can make estimates less wrong, and make the wrongness less painful.',
          '1. <b>Break the work into small pieces</b> and estimate each one. Small pieces are easier to picture, and lesson 57, Gall\'s law, already showed that small steps find their problems sooner.',
          '2. <b>List the work around the work</b> on purpose: tests, reviews, other teams and their meetings, telling partners, putting it live, explaining it. Sam\'s careful list, before he starts, adds up to 6 days. It still misses the emoji, the rude words and the emergency. Some surprises only show up once you begin.',
          '3. <b>Use your own history.</b> Sam looks back at his last four features. His careful lists said 3, 4, 2 and 5 days: 14 in all. They took 5, 6, 3 and 7: 21 in all. That is 1.5 times the list. 6 × 1.5 = 9.',
          '4. <b>Give a range, not one number.</b> "6 to 10 days": 6 if nothing else turns up, 9 from his history, and a little room for one surprise. The real answer, 9, sits inside it.',
          '5. <b>Deliver something useful early, and cut rather than stretch.</b> On day 3 Sam could ship plain-text messages and leave emoji for later, as lesson 54, Brooks\'s law, advised: when time runs short, cut the list.',
          '6. <b>Re-estimate as you learn, and say so early.</b> On day 3, when the odd cases appeared, one message, "now looking like 7 to 10 days", would have saved the newsletter promise. Bad news on day 3 is a plan. Bad news on day 8 is a surprise.'
        ],
        tip: 'Lesson 4, Trade-offs, not laws, asked what a choice will cost. An estimate is how you see that cost before you pay it, so it deserves the same honesty.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Three questions before you say a number.',
        text: [
          'Before you give an estimate, ask: <b>"Have I listed the work around the work, the odd cases and the waiting, and does my estimate include what similar tasks really took last time?"</b>',
          'Try it on Tom\'s next task. Maya wants customers to pick a delivery slot. Tom says, "3 days." The work around the work: tests, a review, and notice to the delivery partners. The odd cases and the waiting: a slot that is already full, a bank holiday, and the Kitchen team\'s Monday meeting. His history: his last guesses ran about 1.5 times over.',
          'Three honest answers turn "3 days" into "5 to 8 days, and I will update you on Wednesday." That is less pleasant to say, and far more useful to hear.'
        ]
      },
      {
        label: 'When not to', pic: limitPic,
        h: 'Honest, not gloomy.',
        text: [
          'It is not a licence to pad everything. Suppose Sam, once burned, answers "a month" to every question, the typo fix included. Now his estimates carry no information, and Maya cannot plan anything. Lesson 4, Trade-offs, not laws, warned that every principle can be overdone.',
          'People still need dates. The bakers need to know when to order card stock, and customers need to know when to expect a feature. The answer is an honest range and an early warning, not a refusal to commit.',
          'Some work really is well known. Adding a new cookie to the menu has been done 30 times, and it takes about an hour every time. "One hour" is a fine estimate. The law bites hardest on new, unfamiliar work, and it fades on the tenth time you do the same small thing.',
          'It is not an excuse. "Hofstadter\'s law" is not a reason to miss a date without warning anyone. The whole point is to see the slip coming and say so.'
        ],
        warn: 'Treat the law as a reminder to look for the hidden work, not as a reason to give up on planning. Next is lesson 61, Kernighan\'s law: debugging is twice as hard as writing the code.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'Tom has just read this lesson. He thinks a new "delivery note" field will take 3 days, so he adds a day for Hofstadter\'s law and says 4. What does the law predict?',
        options: ['It will take exactly 4 days, because he allowed for the law', 'It will probably still take longer than 4 days', 'It will take less than 3 days, because he is careful now', 'The law no longer applies once you know it'],
        answer: 1,
        why: 'That is the joke in the law: it holds "even when you take into account Hofstadter\'s Law". Adding a margin does not tell you what the surprises will be.',
        hint: 'Read the second half of the law again.'
      },
      {
        type: 'bucket', q: 'Sort the pieces of gift messages.',
        buckets: ['The happy path Sam pictured', 'An odd case', 'Work around the work'],
        items: [
          ['A text box on the website', 0],
          ['Printing the note on the card', 0],
          ['A note longer than the card can hold', 1],
          ['An emoji the old printer cannot print', 1],
          ['Tests for the new code', 2],
          ['Telling the partner programs about a new field', 2],
          ['Waiting for the Kitchen team\'s Monday meeting', 2]
        ],
        why: 'Sam\'s 2 days covered only the first group. The other two groups, plus a 2-day emergency, made it 9.'
      },
      {
        type: 'type', q: 'Sam\'s careful lists for his last four features said 3, 4, 2 and 5 days. They really took 5, 6, 3 and 7 days. His new list adds up to 6 days. Using his history, how many days should he expect? Type the number.',
        prompt: 'days >',
        answers: ['9', 'nine'],
        why: 'The lists said 14 days in all and the work took 21: 1.5 times as long. 6 × 1.5 = 9. That is why he says "6 to 10" and not "6".',
        hint: 'Add up both columns, divide to find how many times over he ran, then multiply 6 by that.'
      },
      {
        type: 'pick', q: 'Maya asks how long delivery slots will take. Which answer is the most useful?',
        options: ['"3 days."', '"A month, to be safe."', '"5 to 8 days. I will update you on Wednesday."', '"It is done when it is done."'],
        answer: 2,
        why: 'A range is honest about the unknowns, and a promised update means bad news arrives early. "3 days" hides the risk, "a month" carries no information, and "done when it is done" gives Maya nothing to plan with.'
      },
      {
        type: 'order', q: 'Put the steps of a good estimate in order.',
        items: ['Break the work into small pieces', 'List the odd cases and the work around the work', 'Add up the pieces', 'Check what similar tasks really took, and adjust', 'Say it as a range', 'Re-estimate as you learn, and tell people early'],
        why: 'Pieces first, then the hidden work, then history, then a range. And an estimate is not finished when you say it: it keeps being updated.',
        hint: 'You cannot add up pieces you have not listed yet.'
      },
      {
        type: 'pick', q: 'Sam pictured a short, polite note, a printer that copes, and a quiet week: what happens when nothing is odd. Which earlier lesson gave that a name, and what is it?',
        options: ['Lesson 21, Guard clauses: the happy path', 'Lesson 8, YAGNI: the minimum', 'Lesson 50, Technical debt: the loan', 'Lesson 22, Fail fast: the first error'],
        answer: 0,
        why: 'Lesson 21 called the main job, with nothing odd going on, the happy path. Estimates go wrong when they only count the happy path, just as code goes wrong when it only handles it.'
      },
      {
        type: 'match', q: 'Match each moment to the law from this module that it shows.',
        pairs: [
          ['Sam guesses 2 days, Maya plans 4, it takes 9', 'Hofstadter\'s law'],
          ['On day 5, adding 3 new people to the late gift messages work slows it further', 'Brooks\'s law'],
          ['The kitchen screen change waits for two teams who rarely talk', 'Conway\'s law'],
          ['Shipping plain-text messages first, then adding the rest one piece at a time', 'Gall\'s law']
        ],
        why: 'Lessons 53, 54, 57 and 60 all describe how real projects behave. They often turn up together: a late task tempts people to add helpers (Brooks), and the slowest joins are between teams (Conway).'
      },
      {
        type: 'pick', q: 'Which of these are true about Hofstadter\'s law? Pick all that apply.',
        options: ['It comes from Douglas Hofstadter\'s 1979 book Gödel, Escher, Bach', 'It refers to itself: allowing for it still is not enough', 'It is a reason to pad every estimate to a month', 'It is a rule of thumb, not a law of nature', 'It means estimates are pointless'],
        answer: [0, 1, 3],
        why: 'The law is a warning to look for hidden work and give honest ranges. It is not a reason to stop estimating or to make every answer huge.',
        hint: 'Three are true. The other two are the misuses from "When not to".'
      }
    ]
  });
})();
