/* Lesson 56: Chesterton's fence (module 6). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;
  const DARK = '#15132B', LIGHT = '#ECEAFF', SKIN = '#F2C9A5', WOOD = '#F3CF95';

  const person = (x, y, col) =>
    `<path d="M${x - 15} ${y + 30} q0 -20 15 -20 q15 0 15 20 z" fill="${col}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>` +
    `<circle cx="${x}" cy="${y}" r="10" fill="${SKIN}" stroke="${P.ink}" stroke-width="2.5"/>`;
  // A small gate across a road, w wide, standing on baseline y.
  const fence = (x, y, w, h) => {
    const posts = [0, 0.5, 1].map(f => { const px = x + f * (w - 10); return `<rect x="${px}" y="${y - h}" width="10" height="${h}" rx="2" fill="${WOOD}" stroke="${P.ink}" stroke-width="2"/>`; }).join('');
    const rails = [0.25, 0.6].map(f => `<rect x="${x - 4}" y="${y - h + f * h}" width="${w + 8}" height="9" rx="2" fill="${WOOD}" stroke="${P.ink}" stroke-width="2"/>`).join('');
    return rails + posts;
  };
  const line = (x1, y1, x2, y2, col, w, dash) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;

  /* ---------- 1. the idea: a fence, and what is behind it ---------- */
  const ideaPic = svg(600, 270, 'A country road with a fence across it. A man with a clipboard wants to clear the fence away. Just past the fence, out of his sight, the road ends at a cliff.',
    `<rect x="0" y="150" width="440" height="34" fill="${P.sand}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<rect x="0" y="184" width="440" height="60" fill="${P.okT}"/>` +
    `<path d="M440 150 L452 184 L446 210 L460 244" fill="none" stroke="${P.ink}" stroke-width="3" stroke-linejoin="round"/>` +
    `<rect x="470" y="226" width="130" height="18" fill="${P.tint}"/>` +
    fence(250, 180, 60, 56) +
    person(150, 132, P.warn) + `<rect x="160" y="138" width="12" height="16" rx="2" fill="#fff" stroke="${P.ink}" stroke-width="2"/>` +
    box(40, 20, 230, 70, P.white, 14) + T(155, 50, '"I don\'t see the use', { s: 13.5 }) + T(155, 70, 'of this. Clear it away."', { s: 13.5 }) +
    `<path d="M140 94 l10 20 l12 -20" fill="#fff" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>` +
    arrow(320, 120, 432, 140, P.danger, 3) +
    T(470, 60, 'what the fence', { s: 13.5, f: P.danger }) + T(470, 80, 'was keeping out:', { s: 13.5, f: P.danger }) + T(470, 104, 'a cliff edge', { s: 16, f: P.danger }) +
    T(300, 266, 'Not seeing a reason is not the same as there being no reason.', { s: 13, w: 700, f: P.ink2 }));

  /* ---------- 2. the story: the code Priya finds ---------- */
  const storyCode = [
    'import time',
    '',
    'def take_payment(order):',
    '    if order.total == 0:',
    '        return',
    '    payments.charge(order.total)',
    '',
    'def print_receipt(order):',
    '    printer.wake()',
    '    time.sleep(4)',
    '    printer.print(order)'
  ];
  const fixedCode = [
    'import time',
    '',
    'def take_payment(order):',
    '    # The payment company refuses $0 charges,',
    '    # and a free-cookie order comes to $0.',
    '    if order.total == 0:',
    '        return',
    '    payments.charge(order.total)',
    '',
    'def print_receipt(order):',
    '    printer.wake()',
    '    # The old printer needs 4 s to warm up.',
    '    # Without this wait, the receipt prints blank.',
    '    time.sleep(4)',
    '    printer.print(order)'
  ];

  /* ---------- 3. the pain: what each fence kept out ---------- */
  const painPic = svg(600, 330, 'Two lines were deleted. Left: a free-cookie order comes to 0 dollars, the payment company refuses it, and the till freezes while a queue grows. Right: the first receipt of the morning prints blank because the printer was still warming up.',
    T(150, 24, 'DELETED: if order.total == 0', { s: 12, f: P.danger }) + T(450, 24, 'DELETED: time.sleep(4)', { s: 12, f: P.danger }) +
    box(40, 40, 220, 120, DARK, 14) + T(60, 68, 'Ben: 1 free cookie', { s: 12.5, f: '#C9C6FF', a: 'start' }) +
    T(60, 108, '$0.00', { s: 30, m: true, f: LIGHT, a: 'start' }) + T(60, 142, 'payment error', { s: 12.5, f: '#FF9DB5', a: 'start' }) +
    `<g transform="rotate(-6 196 64)"><rect x="150" y="50" width="96" height="28" rx="6" fill="${P.danger}" stroke="${P.ink}" stroke-width="2.5"/>` + T(198, 69, 'REFUSED', { s: 12.5, f: '#fff' }) + `</g>` +
    [0, 1, 2, 3, 4].map(i => person(64 + i * 40, 196, [P.ok, P.warn, P.accent, P.danger, P.ink2][i])).join('') +
    T(150, 256, 'the till freezes, the queue grows', { s: 13, f: P.danger }) +
    T(150, 278, 'for every loyalty customer', { s: 12.5, w: 700, f: P.ink2 }) +
    `<line x1="300" y1="14" x2="300" y2="292" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    box(370, 40, 160, 60, DARK, 12) + T(450, 76, 'old printer', { s: 13, f: LIGHT }) + T(546, 44, 'z z', { s: 14, f: P.accent }) +
    `<path d="M390 100 H510 V200 l-10 -8 -10 8 -10 -8 -10 8 -10 -8 -10 8 -10 -8 -10 8 -10 -8 -10 8 -10 -8 -10 8 Z" fill="#fff" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>` +
    `<g transform="rotate(-8 450 150)"><rect x="410" y="136" width="80" height="28" rx="6" fill="${P.danger}" stroke="${P.ink}" stroke-width="2.5"/>` + T(450, 155, 'BLANK', { s: 13, f: '#fff' }) + `</g>` +
    T(450, 256, 'the first receipt each morning', { s: 13, f: P.danger }) +
    T(450, 278, 'prints blank: no warm-up', { s: 12.5, w: 700, f: P.ink2 }) +
    box(110, 290, 380, 34, P.okT, 10) + T(300, 312, 'Meanwhile: all tests pass. None covered these.', { s: 12.5, f: P.ok }));

  /* ---------- 4. what to do: find out, then leave a sign ---------- */
  const tool = (x, y, n, h, a, b) => box(x, y, 270, 92, P.white, 14) +
    `<circle cx="${x + 24}" cy="${y + 26}" r="13" fill="${P.accent}" stroke="${P.ink}" stroke-width="2"/>` + T(x + 24, y + 31, n, { s: 13, f: '#fff' }) +
    T(x + 46, y + 31, h, { s: 14, a: 'start' }) + T(x + 18, y + 58, a, { s: 12, w: 700, f: P.ink2, a: 'start' }) + T(x + 18, y + 78, b, { s: 12, w: 700, f: P.ink2, a: 'start' });
  const findPic = svg(600, 230, 'Four ways to find out why a line is there: read the history, search for what uses it, ask the person who wrote it, and try it safely in a test.',
    tool(20, 14, '1', 'Read the history', 'Sam, March: "$0 orders froze', 'the till. Payment co. refuses $0."') +
    tool(310, 14, '2', 'Search for its uses', 'Who calls take_payment? Which', 'orders can come to $0?') +
    tool(20, 124, '3', 'Ask who wrote it', 'Sam: "The old printer needs', '4 s to warm up after a sleep."') +
    tool(310, 124, '4', 'Try it safely', 'Write a test for a $0 order.', 'Without the line, it fails.'));
  const whatPic = `<div style="width:100%">${findPic}${code(fixedCode, { title: 'checkout.py, with two signs nailed up', good: [4, 5, 12, 13] })}</div>`;

  /* ---------- 5. the test: one question, two branches ---------- */
  const q = (x, y, w, s, fill, col) => box(x, y, w, 46, fill, 12) + T(x + w / 2, y + 29, s, { s: 13, f: col || P.ink });
  const testPic = svg(600, 330, 'A small decision chart. Do I know why this is here? If yes and the reason still holds, keep it and leave a sign. If yes and the reason is gone, remove it. If no, have I looked? If not, look. If I looked properly and found nothing, remove it carefully with a test, and watch.',
    q(150, 12, 300, '"Do I know why this is here?"', P.warnT) +
    arrow(230, 62, 130, 100, P.ok, 3) + T(160, 88, 'yes', { s: 12.5, f: P.ok }) +
    arrow(370, 62, 470, 100, P.danger, 3) + T(442, 88, 'no', { s: 12.5, f: P.danger }) +
    q(20, 104, 220, 'Does the reason still hold?', P.white) +
    q(360, 104, 220, '"Have I looked?"', P.white) +
    arrow(80, 154, 70, 196, P.ok, 3) + T(56, 182, 'yes', { s: 12, w: 700, f: P.ink2 }) +
    arrow(180, 154, 190, 196, P.ok, 3) + T(206, 182, 'no', { s: 12, w: 700, f: P.ink2 }) +
    q(10, 200, 120, 'Keep it.', P.okT, P.ok) + T(70, 266, '+ leave a sign', { s: 12.5, w: 700, f: P.ink2 }) +
    q(140, 200, 120, 'Remove it.', P.okT, P.ok) + T(200, 266, 'with confidence', { s: 12.5, w: 700, f: P.ink2 }) +
    arrow(420, 154, 410, 196, P.danger, 3) + T(392, 182, 'no', { s: 12, w: 700, f: P.ink2 }) +
    arrow(520, 154, 530, 196, P.warn, 3) + T(550, 182, 'yes', { s: 12, w: 700, f: P.ink2 }) +
    q(340, 200, 120, 'Look first.', P.dangerT, P.danger) + T(400, 266, 'history, ask, test', { s: 12.5, w: 700, f: P.ink2 }) +
    q(470, 200, 120, 'Remove gently.', P.warnT, P.warn) + T(530, 266, 'with a test,', { s: 12.5, w: 700, f: P.ink2 }) + T(530, 284, 'then watch', { s: 12.5, w: 700, f: P.ink2 }) +
    T(300, 318, 'The only wrong move: deleting it because you could not see a use.', { s: 13 }));

  /* ---------- 6. when not to ---------- */
  const limitPic = svg(600, 290, 'Left: "we have always done it this way" is crossed out, because it is not a reason. Right: the effort to find out should match the risk. A five-minute look for a one-line oddity in a report, a proper look for anything that touches money.',
    T(150, 28, 'NOT A REASON', { s: 12.5, f: P.danger }) + T(450, 28, 'MATCH THE LOOK TO THE RISK', { s: 12.5, f: P.ok }) +
    box(30, 70, 240, 80, P.white, 14) + T(150, 104, '"We have always', { s: 15 }) + T(150, 126, 'done it this way."', { s: 15 }) +
    line(40, 160, 260, 60, P.danger, 5) +
    T(150, 196, 'A habit is not a reason.', { s: 13, w: 700, f: P.ink2 }) +
    T(150, 216, 'Keep asking why.', { s: 13, w: 700, f: P.ink2 }) +
    `<line x1="300" y1="20" x2="300" y2="276" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    box(330, 60, 240, 56, P.okT, 12) + T(450, 84, 'odd blank line in a report', { s: 12.5 }) + T(450, 104, '5-minute look', { s: 12.5, f: P.ok }) +
    box(330, 132, 240, 56, P.warnT, 12) + T(450, 156, 'odd check in the checkout', { s: 12.5 }) + T(450, 176, 'history + ask + a test', { s: 12.5, f: P.warn }) +
    T(450, 222, 'Found nothing after a fair look?', { s: 13, w: 700, f: P.ink2 }) +
    T(450, 242, 'Remove it carefully, then watch.', { s: 13, w: 700, f: P.ink2 }) +
    T(300, 278, 'A fence whose reason has expired is just clutter.', { s: 13 }));

  COURSE.add({
    id: 'l56', minutes: 8,
    summary: 'Before you remove something that looks pointless, <b>find out why it is there</b>. That you cannot see a reason does not mean there is none. Once you know the reason, removing it is fine. And when you build a fence yourself, <b>leave a sign that says why</b>.',
    video: {
      src: 'videos/l56-chestertons-fence.mp4', poster: 'videos/l56-chestertons-fence.jpg', length: '1 min 21 s',
      script: [
        'A road runs across the hills, and a fence stands in the way. A busy man with a clipboard says, I don\'t see the use of this. Let us clear it away.',
        'The writer G.K. Chesterton gave the answer. If you don\'t see the use of it, I certainly won\'t let you clear it away. Go away and think.',
        'Walk past the fence, and the reason appears. The road ends at a cliff.',
        'Code has fences too. Priya is making the checkout quicker. She finds 2 odd lines. Skip any order that costs 0. And wait 4 seconds after waking the printer. They look like junk. She deletes both, and every test still passes.',
        'Next morning, the first receipt prints blank. The old printer needed those 4 seconds to warm up. Then Ben claims his free cookie. The order costs 0. The payment company refuses it, and the till freezes.',
        'So before you remove a fence, find out why it is there. Read the file\'s history. Ask the person who wrote it. Write a test.',
        'If the reason is gone, remove it. If not, nail up a sign. A comment that says why.',
        'That is Chesterton\'s fence. Know why it is there before you remove it.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'A fence across a road.',
        text: [
          'Picture a fence across a country road. A busy man with a clipboard walks up and says, roughly, <b>"I don\'t see the use of this. Let us clear it away."</b> A wiser person answers: if you cannot see the use of it, you may not clear it away. <b>First go and find out why it was put there.</b> Come back when you can say what it is for. Then, perhaps, take it down.',
          'Now walk past the fence. The road ends at a cliff. The fence was never pointless. Its reason was simply <b>out of sight</b>.',
          'That is <b>Chesterton\'s fence</b>. The fact that <b>you</b> cannot see why something exists is not evidence that there is no reason. Find out first. Once you know, removing it is fine, and often good.',
          'You know this from ordinary life. On your first day at a new job you are told, "Never prop the back door open." It seems silly, until you learn that an open door sets off the alarm after five minutes. Or Grandma\'s recipe says, "Rest the dough for 20 minutes." You skip it once. The bread comes out tough.'
        ],
        tip: 'The idea comes from the English writer <b>G. K. Chesterton</b>, in his 1929 book <i>The Thing</i>, in a chapter called "The Drift from Domesticity". He was writing about changing the rules of society, not about code. His wise character\'s reply begins: <b>"If you don\'t see the use of it, I certainly won\'t let you clear it away. Go away and think."</b> Programmers borrowed it because it fits code so well. Like the other "laws" in this module, it is a rule of thumb from experience, not a law of nature.'
      },
      {
        label: 'The story', pic: code(storyCode, { title: 'checkout.py, as Priya finds it', hi: [4, 5, 10] }),
        h: 'Two lines that look like junk.',
        text: [
          'Priya, who joined in lesson 51, is now on the Website team. Her task: <b>make the checkout quicker</b>. She opens <code>checkout.py</code> and, as lesson 13, Boy Scout rule, taught her, she tidies as she goes.',
          'Two lines catch her eye. Neither has a comment.',
          '<b>Lines 4 and 5.</b> <code>return</code> on its own means "stop this job now and go back". So if the order\'s total is 0, the job quits before it charges anything. This is a guard clause, from lesson 21. Priya thinks: <b>"Why would a total ever be zero?"</b>',
          '<b>Line 10.</b> <code>import time</code> on line 1 brings in Python\'s clock tools, and <code>time.sleep(4)</code> means "wait 4 seconds, doing nothing". Every receipt waits 4 seconds. Priya thinks: <b>"Why wait? That is exactly what makes checkout slow."</b>',
          'She deletes the check, its <code>return</code>, and the wait. She runs the tests. <b>All of them pass.</b> The checkout feels 4 seconds faster. She is pleased, and so is Maya.'
        ],
        tip: 'Priya is not careless. She is doing what earlier lessons praised: tidying, removing what looks like dead weight. The trap is that each of these lines does a job you cannot see by reading it.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'What each fence was keeping out.',
        text: [
          '<b>Next morning, the first receipt prints blank.</b> In lesson 10, Premature optimisation, Maya found that the old printer falls asleep and takes almost 4 seconds to warm up. She set it to stay awake in shop hours, but it still sleeps overnight. So the first receipt of the day goes to a printer that is not ready yet. The 4-second wait was there for exactly that.',
          '<b>Then Ben claims his free cookie.</b> A free cookie costs 30 points on his loyalty card (lesson 19, Encapsulation). His order is just the cookie, so the total is <b>$0.00</b>. Without the check, the till sends a $0 charge to the payment company. The payment company refuses charges of $0 and sends back an error. The till shows the error and freezes. A queue builds behind Ben. The same happens to <b>every loyalty customer</b> that day.',
          'Why did the tests pass? Because no test covered a $0 order or a sleeping printer. The tests could only guard what someone had thought to test.'
        ],
        warn: 'Each deleted line was a fence. Each had a good reason. The reasons were simply <b>invisible</b>: written down nowhere in the code.'
      },
      {
        label: 'What to do', pic: whatPic,
        h: 'Find out why. Then decide. Then leave a sign.',
        text: [
          'Before you remove something you do not understand, <b>find out why it is there</b>. Four ways, cheapest first:',
          '<b>1. Read the history.</b> Most teams keep their code in a tool that saves every past version of every file, with who changed each line, when, and a short note saying why. The most common one is called <b>git</b>. Priya looks up line 4 and finds Sam\'s note from last March: "Free-cookie orders froze the till. The payment company refuses $0 charges. Skip them." <b>2. Search for where it is used.</b> Who calls <code>take_payment</code>? Which orders can come to $0? <b>3. Ask the person who wrote it.</b> Sam remembers the printer at once. <b>4. Try it safely.</b> Write a test for a $0 order. Without the line, it fails. (Lesson 49, Testing pyramid.)',
          'Now decide. <b>If the reason no longer applies, remove it with confidence.</b> If it still applies, keep it. Both of Priya\'s reasons still apply, so both lines go back. Knowing the reason also opens a better option for later: the wait is only needed when the printer was asleep, so it could wait only then. That is a real change in behaviour, so it gets its own step and its own test.',
          'Then <b>leave a sign</b> for the next person. A comment that says <b>why</b>, not what. <code># wait 4 seconds</code> repeats the code. <code># The old printer needs 4 s to warm up</code> gives the reason. Even better, a test that fails without the line, like <code>test_free_cookie_is_not_charged</code>: it records the reason and guards it. Or a name that carries the reason, as in lesson 12, Meaningful names: <code>PRINTER_WARM_UP_SECONDS = 4</code> says far more than a bare 4.'
        ],
        tip: 'Every fence you build today is a mystery to someone next year. The cheapest moment to write down why is the moment you still remember.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Two short questions.',
        text: [
          'Before you remove anything that looks pointless, ask: <b>"Do I know why this is here? If not, have I looked?"</b>',
          'If you know why and the reason still holds, keep it and leave a sign. If you know why and the reason is gone, remove it. If you do not know, look first: the history, a search, a question, a test.',
          'Try it on Priya\'s Monday. Did she know why the zero check was there? No. Had she looked? No. That one honest answer would have sent her to Sam\'s note, and saved a frozen till.'
        ]
      },
      {
        label: 'When not to', pic: limitPic,
        h: 'Not a ban on change.',
        text: [
          '<b>It is not a reason to never change anything.</b> The lesson says "find out", not "leave it alone". And "we have always done it this way" is not a reason. It is the opposite of the lesson: you still have to find the actual reason.',
          '<b>Match the effort to the risk.</b> A one-line oddity in a report nobody relies on deserves a five-minute look. A strange check in the checkout, where money moves, deserves the history, a question and a test. Spending a week researching a blank line is overdoing it.',
          '<b>When nobody can find a reason, do not keep it forever.</b> Suppose Sam has left, the history only says "tweak", and no test fails without it. After a fair look, remove it carefully: on its own, with a test around it, and keep an eye on what happens. A fence whose reason has expired is just clutter, the kind of small mess that lesson 51, Broken windows, warned about. Keeping it "just in case" is a small loan you never pay back (lesson 50, Technical debt).'
        ],
        warn: 'Chesterton\'s fence protects you from removing things you do not understand. It does not protect things from ever being understood and removed.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'You find this line with no comment: <code>if customer.age > 120: return</code>. It looks impossible. What does Chesterton\'s fence say to do?',
        options: ['Delete it. Nobody is over 120', 'Find out why it is there before you remove it', 'Never touch it, whatever happens', 'Add five more checks just like it'],
        answer: 1,
        why: 'It may guard against a typo in a birth year, or a test account. Or it may be truly useless. You cannot tell from reading it, so find out first.',
        hint: 'The lesson is not "delete" and not "never touch". It is a step in between.'
      },
      {
        type: 'order', q: 'Put what Priya should have done in order.',
        items: ['Notice a line she does not understand', 'Read the history of that line', 'Ask Sam, who wrote it', 'Write a test for a $0 order', 'Keep the line, with a comment that says why'],
        why: 'Notice, look, ask, check, then decide. The cheap steps come first, and the decision comes last.',
        hint: 'Deciding comes at the very end, after finding out.'
      },
      {
        type: 'bucket', q: 'Does it tell you <b>why</b> the line is there?',
        buckets: ['Tells you why', 'Does not tell you why'],
        items: [
          ['A change note: "The payment company refuses $0 charges"', 0],
          ['A test that fails when you remove the line', 0],
          ['Sam explains that the old printer needs 4 s to warm up', 0],
          ['"We have always done it this way"', 1],
          ['"It looks useless to me"', 1],
          ['"Nobody has complained about it"', 1]
        ],
        why: 'A reason says what goes wrong without the line. Habit, a feeling, and silence say nothing about that.'
      },
      {
        type: 'pick', q: 'Which comment is the best sign to nail on <code>time.sleep(4)</code>?',
        options: ['<code># wait 4 seconds</code>', '<code># The old printer needs 4 s to warm up, or the receipt prints blank</code>', '<code># do not touch!!</code>', '<code># TODO</code>'],
        answer: 1,
        why: 'The first one repeats what the code already says. The third warns without explaining. The last says nothing. Only the second gives the reason, so the next person can judge whether it still holds.',
        hint: 'A good sign says <b>why</b>, not what.'
      },
      {
        type: 'pick', q: 'Lesson 13, Boy Scout rule, gave some warnings about tidying. Which ones did Priya forget? Pick all that apply.',
        options: ['Do not tidy what you do not understand, or cannot check', 'Wash your mug each time you use it', 'Never mix a change in behaviour into a tidy', 'Rename every job in the file'],
        answer: [0, 2],
        why: 'She removed lines she did not understand and could not check. And removing them changed what the checkout does, so it was never just a tidy. Lesson 13 pointed ahead to this lesson for exactly this.',
        hint: 'Two of these are warnings from lesson 13. One is the mug story, and one is the kind of tidy it warned against.'
      },
      {
        type: 'match', q: 'Match each situation to the law of this module that explains it.',
        pairs: [
          ['A line looks pointless, but quietly does a job', "Lesson 56, Chesterton's fence"],
          ['A partner\'s program breaks when Sam fixes a typo nobody promised', "Lesson 55, Hyrum's law"],
          ['Notes get lost between two teams that rarely talk', "Lesson 53, Conway's law"],
          ['A late project gets later after four people join', "Lesson 54, Brooks's law"]
        ],
        why: 'Hyrum\'s law is the outside view of the same danger: someone depends on behaviour you cannot see. Chesterton\'s fence is the inside view: the code itself depends on a line whose reason you cannot see.'
      },
      {
        type: 'pick', q: 'A two-year-old line in a report looks odd. The history only says "tweak". Its author left last year. No test fails without it. What now?',
        options: ['Keep it forever, just in case', 'Remove it carefully on its own, with a test, and watch what happens', 'Spend a week investigating before anyone touches it', 'Rewrite the whole report'],
        answer: 1,
        why: 'You looked in a way that matches the risk and found nothing. Removing it gently is fine. Keeping unexplained clutter forever has its own cost.',
        hint: 'The lesson is "find out first", not "never remove".'
      },
      {
        type: 'pick', q: 'Which question is the test from this lesson?',
        options: ['How many lines does this file have?', 'Do I know why this is here? If not, have I looked?', 'Who can I blame for this line?', 'Is this the newest way to write it?'],
        answer: 1,
        why: 'Two short questions. Knowing the reason lets you keep it or remove it with confidence. Not knowing means: look first.'
      }
    ]
  });
})();
