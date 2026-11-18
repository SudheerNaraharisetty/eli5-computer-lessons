/* Lesson 61: Kernighan's law (module 6). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l61  Kernighan's law
     ===================================================================== */

  /* ---------- shared drawing: a brain-power gauge ---------- */
  // x: left edge, top: where 100% sits, h: height of 100%, pct: how full, col: fill colour
  const gauge = (x, top, h, pct, col, label) => {
    const w = 64, bottom = top + h;
    const inside = Math.min(pct, 100) / 100 * h;
    const over = Math.max(pct - 100, 0) / 100 * h;
    return (over ? `<rect x="${x}" y="${top - over}" width="${w}" height="${over}" rx="10" fill="${P.dangerT}" stroke="${P.danger}" stroke-width="2.5" stroke-dasharray="6 5"/>` : '') +
      `<rect x="${x + 4}" y="${top + 5}" width="${w}" height="${h}" rx="10" fill="${P.ink}"/>` +
      `<rect x="${x}" y="${top}" width="${w}" height="${h}" rx="10" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
      `<rect x="${x + 2}" y="${bottom - inside}" width="${w - 4}" height="${inside - 2}" rx="8" fill="${col}"/>` +
      (over ? `<path d="M${x + 10} ${top + 4} l12 18 l-6 12 l14 20 M${x + w - 8} ${top + 8} l-10 16 l8 12" fill="none" stroke="${P.ink}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>` : '') +
      T(x + w / 2, (over ? top - over - 8 : bottom - inside - 8), pct + '%', { s: 13, f: over ? P.danger : P.ink }) +
      T(x + w / 2, bottom + 22, label, { s: 12.5, w: 700, f: P.ink2 });
  };
  const limit = (x1, x2, y) => `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${P.ink}" stroke-width="3" stroke-dasharray="8 5"/>`;

  /* ---------- 1. the idea: two pairs of gauges ---------- */
  const ideaPic = svg(600, 330, 'Two pairs of brain-power gauges. Clever code takes 100 percent of your cleverness to write, so debugging it needs 200 percent and the gauge overflows and cracks. Plain code takes 50 percent to write, so debugging it needs 100 percent, which just fits.',
    T(150, 26, 'AS CLEVER AS YOU CAN BE', { s: 12.5, f: P.danger }) + T(450, 26, 'LESS CLEVER THAN YOU CAN BE', { s: 12.5, f: P.ok }) +
    `<line x1="300" y1="16" x2="300" y2="318" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    limit(48, 262, 150) + T(48, 142, 'your limit', { s: 11.5, a: 'start', f: P.ink2 }) +
    gauge(70, 150, 120, 100, P.accent, 'writing') + gauge(166, 150, 120, 200, P.danger, 'debugging') +
    T(150, 316, 'debugging needs more than you have', { s: 12.5, f: P.danger }) +
    limit(338, 552, 150) + T(338, 142, 'your limit', { s: 11.5, a: 'start', f: P.ink2 }) +
    gauge(360, 150, 120, 50, P.accent, 'writing') + gauge(456, 150, 120, 100, P.ok, 'debugging') +
    T(450, 316, 'debugging just fits', { s: 12.5, f: P.ok }));

  /* ---------- 2. the story: Sam's clever line ---------- */
  const cleverCode = [
    'def pts(t, d, b):',
    '    return int(t) * 2 if d[:2] == "Tu" else int(t) + 10 * b'
  ];
  const checkRow = (x, day, pts) =>
    box(x, 20, 172, 72, P.white, 14) + T(x + 86, 46, day, { s: 13, w: 700, f: P.ink2 }) + T(x + 86, 76, pts, { s: 18, m: true }) +
    `<circle cx="${x + 166}" cy="22" r="13" fill="${P.ok}" stroke="${P.ink}" stroke-width="2.5"/><path d="M${x + 160} 22 l4 5 l8 -9" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
  const checksPic = svg(600, 130, 'Sam checks three orders of 23 dollars 50. Monday gives 23 points, Tuesday gives 46, a Monday birthday gives 33. All three are right.',
    checkRow(14, 'Monday', '23 points') + checkRow(212, 'Tuesday', '46 points') + checkRow(410, 'Monday, birthday', '33 points') +
    T(300, 120, 'Sam\'s three checks, each order $23.50. All correct.', { s: 13, w: 700, f: P.ink2 }));
  const storyPic = `<div style="width:100%">${code(cleverCode, { title: 'loyalty.py, Sam\'s version', hi: [2] })}${checksPic}</div>`;

  /* ---------- 3. the pain: the complaint and the clock ---------- */
  const bar = (y, label, mins, col, val) => {
    const w = Math.max(mins / 180 * 360, 6);
    return T(20, y + 22, label, { s: 13, a: 'start' }) +
      `<rect x="200" y="${y}" width="364" height="32" rx="8" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
      `<rect x="202" y="${y + 2}" width="${w}" height="28" rx="6" fill="${col}"/>` +
      T(mins > 100 ? 548 : 214 + w, y + 22, val, { s: 13, a: mins > 100 ? 'end' : 'start', f: mins > 100 ? '#fff' : P.ink });
  };
  const painPic = svg(600, 330, 'Ana writes: my birthday was on a Tuesday, I spent 23 dollars 50 and got 46 points, where is my bonus. She should have 56. Below, writing the line took 20 minutes. Hunting for the bug in it took 3 hours and it was still not found.',
    box(20, 14, 380, 132, P.white, 16) +
    `<rect x="20" y="14" width="380" height="34" rx="16" fill="${P.warnT}" stroke="${P.ink}" stroke-width="2.5"/>` + T(36, 37, 'A complaint from Ana', { s: 13, a: 'start', f: P.warn }) +
    T(36, 74, '"My birthday was on a Tuesday.', { s: 13.5, w: 700, a: 'start' }) +
    T(40, 98, 'I spent $23.50 and got 46 points.', { s: 13.5, w: 700, a: 'start' }) +
    T(40, 122, 'Where is my birthday bonus?"', { s: 13.5, w: 700, a: 'start' }) +
    box(420, 14, 160, 132, P.white, 16) +
    T(436, 56, 'got', { s: 13, w: 700, a: 'start', f: P.ink2 }) + T(564, 60, '46', { s: 26, m: true, a: 'end', f: P.danger }) +
    T(436, 112, 'should get', { s: 13, w: 700, a: 'start', f: P.ink2 }) + T(564, 116, '56', { s: 26, m: true, a: 'end', f: P.ok }) +
    T(300, 186, 'TIME SPENT ON THAT ONE LINE', { s: 12.5, f: P.ink2 }) +
    bar(204, 'writing it', 20, P.accent, '20 min') +
    bar(250, 'debugging it', 180, P.danger, '3 hours') +
    T(300, 316, 'Writing took 20 minutes. Three hours of hunting, and still no answer.', { s: 13, f: P.danger }));

  /* ---------- 4. what to do: plain steps ---------- */
  const plainCode = [
    'def points_for(total, day, is_birthday):',
    '    points = int(total)',
    '    if day == "Tuesday":',
    '        points = points * 2',
    '    elif is_birthday:',
    '        points = points + 10',
    '    return points'
  ];
  const fixedCode = [
    'def points_for(total, day, is_birthday):',
    '    points = int(total)          # 1 point per whole dollar',
    '    if day == "Tuesday":',
    '        points = points * 2      # Tuesday offer',
    '    if is_birthday:',
    '        points = points + 10     # birthday bonus',
    '    return points',
    '',
    'def test_birthday_on_a_tuesday():',
    '    assert points_for(23.50, "Tuesday", True) == 56'
  ];
  const fixPic = `<div style="width:100%">${code(plainCode, { title: 'step 1: the same rules, written plainly. Line 5 gives it away', bad: [5, 6] })}${code(fixedCode, { title: 'step 2: one word changed, one test added', good: [5, 9, 10] })}</div>`;

  /* ---------- 5. the test: point at the line ---------- */
  const testPic = svg(600, 290, 'Asked to point at the code that decides the birthday bonus on a Tuesday, the reader of the clever line can only point at the whole line, which holds every rule. The reader of the plain version points at line 5 and line 6.',
    T(300, 24, '"Point at the code that decides the birthday bonus on a Tuesday."', { s: 13.5 }) +
    T(150, 58, 'CLEVER', { s: 12.5, f: P.danger }) + T(450, 58, 'PLAIN', { s: 12.5, f: P.ok }) +
    `<line x1="300" y1="44" x2="300" y2="278" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    box(20, 76, 260, 88, '#15132B', 14) +
    T(36, 112, 'return int(t) * 2 if d[:2]', { s: 12, m: true, a: 'start', f: '#ECEAFF' }) +
    T(36, 134, '== "Tu" else int(t) + 10 * b', { s: 12, m: true, a: 'start', f: '#ECEAFF' }) +
    `<rect x="28" y="94" width="244" height="52" rx="10" fill="none" stroke="#FF6B8B" stroke-width="3" stroke-dasharray="7 6"/>` +
    T(150, 200, 'the whole line: every rule at once', { s: 13, f: P.danger }) +
    T(150, 222, 'you must solve all of it', { s: 12.5, w: 700, f: P.ink2 }) + T(150, 242, 'to answer one question', { s: 12.5, w: 700, f: P.ink2 }) +
    box(320, 76, 260, 108, '#15132B', 14) +
    ['if day == "Tuesday":', '    points = points * 2', 'elif is_birthday:', '    points = points + 10'].map((s, i) =>
      T(336, 102 + i * 22, s, { s: 12, m: true, a: 'start', f: i >= 2 ? '#FFD98A' : '#ECEAFF' })).join('') +
    `<rect x="328" y="126" width="244" height="50" rx="10" fill="none" stroke="#7CF0B5" stroke-width="3"/>` +
    T(450, 214, 'two lines, and they say "else"', { s: 13, f: P.ok }) +
    T(450, 236, 'a tired stranger can find it', { s: 12.5, w: 700, f: P.ink2 }) + T(450, 256, 'in a few minutes', { s: 12.5, w: 700, f: P.ink2 }));

  /* ---------- 6. when not to: plain is not long ---------- */
  const longCode = [
    'def points_for(total, day, is_birthday):',
    '    if day == "Tuesday" and is_birthday:',
    '        return int(total) * 2 + 10',
    '    elif day == "Tuesday":',
    '        return int(total) * 2',
    '    elif is_birthday:',
    '        return int(total) + 10',
    '    else:',
    '        return int(total)'
  ];
  const limitPic = `<div style="width:100%">${code(longCode, { title: 'too far the other way: one branch for every mix of rules', bad: [3, 5, 7, 9] })}` +
    svg(600, 96, 'Two rules need 4 branches. Three rules would need 8. Four rules would need 16.',
      [['2 rules', '4 branches', P.warnT], ['3 rules', '8 branches', P.dangerT], ['4 rules', '16 branches', P.dangerT]].map((r, i) => {
        const x = 30 + i * 186;
        return box(x, 12, 168, 56, r[2], 12) + T(x + 84, 36, r[0], { s: 13, w: 700, f: P.ink2 }) + T(x + 84, 58, r[1], { s: 15 });
      }).join('') +
      T(300, 90, 'Every branch repeats int(total). Plain means clear, not copied out.', { s: 12.5, w: 700, f: P.ink2 })) + `</div>`;

  COURSE.add({
    id: 'l61', minutes: 8,
    summary: 'Finding and fixing a bug is harder than writing the code was. So if you use all your cleverness to write it, you will not have enough left to fix it. That is <b>Kernighan\'s law</b>: write code <b>less clever than you can</b>, and leave yourself room to debug it.',
    video: {
      src: 'videos/l61-kernighans-law.mp4', poster: 'videos/l61-kernighans-law.jpg', length: '1 min 15 s',
      script: [
        'Sam is proud of one line of code. It works out loyalty points. A point per dollar, double on Tuesdays, and 10 extra on your birthday. All in one clever line.',
        'He tries a Monday, a Tuesday and a birthday. All correct. Written in 20 minutes.',
        '6 months later, Ana complains. Her birthday fell on a Tuesday, and her bonus never came.',
        'Sam stares at his own line. Which part decides that? Priya cannot even start. 3 hours go by.',
        'Brian Kernighan warned about this in the 1970s. Debugging is twice as hard as writing a program. So if you\'re as clever as you can be when you write it, how will you ever debug it?',
        'Sam used all his cleverness to write that line. Fixing it needs twice as much.',
        'So they write it again, in plain steps. One rule per line. And there it is. Else if. On a Tuesday, the birthday line never runs. Found in 5 minutes.',
        'Change one word. Add one test. Done.',
        'That is Kernighan\'s law. Write code less clever than you can, and leave room to debug it.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Keep some cleverness in reserve.',
        text: [
          'Picture a cupboard packed so cleverly that every last thing fits. It looks wonderful. Then you need the one jar at the back, and you have to take everything out to reach it. Or picture a shopping list in handwriting so stylish that, a week later, you cannot read it yourself.',
          'Code is the same. <b>Debugging</b> means finding and fixing the cause of a bug. When you write code, the whole idea is fresh in your head. When you debug it, you, or someone else, months later, has to rebuild that idea from the code alone, and also hunt for the one spot where it goes wrong. That is the <b>harder</b> job.',
          'So if writing the code took <b>all</b> of your cleverness, debugging it needs <b>more cleverness than you have</b>. The way out is to write code that is less clever than you are able to. Leave yourself room.',
          'Like the other laws in this module, this is an <b>observation and a rule of thumb</b>, not a law of nature. "Twice as hard" is a way of speaking, not a measurement.'
        ],
        tip: 'Brian Kernighan worked at Bell Labs, the same place where Unix was born (lesson 47, Unix philosophy). He wrote <i>The Elements of Programming Style</i> with P. J. Plauger (first published in 1974) and <i>The C Programming Language</i> with Dennis Ritchie. In the 1978 second edition of <i>The Elements of Programming Style</i> he wrote: "Everyone knows that debugging is twice as hard as writing a program in the first place. So if you\'re as clever as you can be when you write it, how will you ever debug it?" People later started calling this Kernighan\'s law.'
      },
      {
        label: 'The story', pic: storyPic,
        h: 'Sam\'s one clever line.',
        text: [
          'Sam, Maya\'s first helper and now a developer on the Money team, writes the job that works out loyalty points for an order. There are three rules. <b>1 point per whole dollar.</b> <b>Double points on Tuesdays</b>, a new offer for the shop\'s quiet day. <b>10 extra points on your birthday.</b>',
          'Sam is proud that it all fits on one line. It is given <code>t</code>, the total, <code>d</code>, the day, and <code>b</code>, yes or no for a birthday. Here are its tricks.',
          '<code>int(t)</code> turns a number into a whole number by dropping the part after the point, so <code>int(23.50)</code> is 23. <code>d[:2]</code> means the first two letters of the day. Why two? Because one letter, <code>T</code>, would also catch Thursday. <code>10 * b</code> is the trick from lesson 5, KISS: yes counts as 1 and no counts as 0.',
          'The last trick is <code>A if question else B</code>. It is a whole <code>if</code> squeezed into one line: it gives <code>A</code> when the answer is yes and <code>B</code> when it is no.',
          'Sam checks three orders of $23.50. Monday: 23 points. Tuesday: 46. Monday with a birthday: 33. <b>All correct.</b> It took him 20 minutes, and he is rather pleased.'
        ]
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Three hours, and the author is stuck.',
        text: [
          'Six months later, a complaint arrives from Ana. Her birthday fell on a Tuesday. She spent $23.50 and got <b>46 points</b>. She should have got 23 doubled, plus 10: <b>56</b>. Her birthday bonus is missing.',
          'It is late, and Ana is waiting for an answer. Sam opens his own line. He wrote it, so this should be quick. But which part decides "birthday on a Tuesday"? He reads it left to right, then right to left. He tries numbers in his head. After an hour he is still not sure.',
          'Priya, from the Website team, offers to help. She cannot even start. Before she can look for a bug, she has to decode <code>d[:2]</code>, <code>10 * b</code> and the squeezed <code>if</code>. Three hours go by. Nobody can point at the broken part.',
          'The line took <b>20 minutes</b> to write. Hunting in it has taken <b>3 hours</b>, and the bug is still not found.'
        ],
        warn: 'Sam is the author, and he is stuck. Cleverness fades from memory fast. Six months later, the person who wrote the clever code is just another stranger reading it.'
      },
      {
        label: 'What to do', pic: fixPic,
        h: 'Write it again, one rule per line.',
        text: [
          'Maya suggests something that feels slow: stop staring, and <b>write the same rules again in plain steps</b>, the way lesson 5, KISS, rewrote the opening hours. Real names (lesson 12, Meaningful names). One rule per line. Sam rewrites it to do <b>exactly</b> what the clever line does, nothing more and nothing less.',
          'You met <code>elif</code> in lesson 28: it means "else if", and it only runs when the question above it said no. Writing the clever line out plainly forces Sam to show which rules belong to which answer. And there it is, on <b>line 5</b>.',
          'In the clever line, Python treats <code>int(t) * 2</code> as the whole yes-answer and <code>int(t) + 10 * b</code> as the whole no-answer. Sam meant the <code>if</code> to choose only between 2 and 1. So the birthday part sits in the "no" half and <b>never runs on a Tuesday</b>. The plain version says so in one word: <code>elif</code>. Found in <b>5 minutes</b>.',
          'The fix is one word: <code>elif</code> becomes <code>if</code>. Now the birthday line is asked every time. Then Sam adds a small test for exactly Ana\'s case (lesson 49, Testing pyramid), so this bug can never come back quietly. Short comments on the end of three lines say what each rule is for.'
        ],
        tip: 'The trap is the same one as the party discount in lesson 49: in a chain of <code>if</code> and <code>elif</code>, only the first "yes" runs. In plain code you can see the chain. In the clever line it was hidden inside one expression.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Picture the tired stranger.',
        text: [
          'Ask: <b>"If this breaks in six months, could a tired person who did not write it find the bug quickly?"</b>',
          'A quick way to check: pick one real case, like a birthday on a Tuesday, and ask someone to <b>point at the code that decides it</b>. In the clever line, they can only point at the whole line, and they must solve all of it first. In the plain version, they point at lines 5 and 6.',
          'If you are pleased with how clever a line is, that is the moment to ask the question. Pride in a trick is a warning light, not a reward.'
        ],
        tip: 'Lesson 5, KISS, asked whether someone new could read the code aloud. This test adds the reason it matters: code is read hardest on its worst day, when it is broken and someone is in a hurry.'
      },
      {
        label: 'When not to', pic: limitPic,
        h: 'Not a ban on good ideas. Not a call for long code.',
        text: [
          '<b>A clever idea is fine. A clever way of writing it is the problem.</b> Sometimes the smart part is the method itself, a clever way to solve the problem. Keep it. Write it with plain steps and good names, and explain it.',
          '<b>Some problems are hard, and their code will be too.</b> You cannot make every program simple. Then leave room in other ways: clear structure, good names, a comment that says <b>why</b> (lesson 56, Chesterton\'s fence), and tests for the tricky cases.',
          '<b>Plain does not mean long and repetitive.</b> Suppose Sam overreacts and writes one branch for every mix of rules, as in the picture. Every line is easy, but <code>int(total)</code> is copied four times, and each new rule doubles the branches. That breaks lesson 6, DRY, and it is harder to change. Lesson 5 already warned: simple does not mean short, and it does not mean long either. It means <b>easy to understand</b>.',
          '<b>"Twice" is not a measurement.</b> Some bugs are found in seconds, and some take days. The law is about leaving room, not about the exact number.'
        ],
        warn: 'Do not use this law to scold someone for a good idea. Use it to ask: is this written so that a tired stranger could fix it?'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does Kernighan\'s law say?',
        options: [
          'Debugging is harder than writing, so code written as cleverly as you can is too hard for you to debug',
          'Clever code always runs faster, so it is worth the extra effort',
          'Every program has exactly twice as many bugs as you expect',
          'Only the person who wrote a piece of code can debug it'
        ],
        answer: 0,
        why: 'Writing uses up your cleverness. Debugging needs more. So write below your limit and leave room.',
        hint: 'Think of the two gauges: one for writing, one for debugging.'
      },
      {
        type: 'type', q: 'Decode Sam\'s clever line. How many points does a $10 order on a <b>Thursday</b>, on the customer\'s birthday, earn? Type the number.',
        pic: code(cleverCode, { title: 'loyalty.py, Sam\'s version' }),
        prompt: 'points >',
        answers: ['20'],
        why: '"Th" is not "Tu", so the line uses the part after <code>else</code>: <code>int(10) + 10 * 1</code> = 20. You had to solve a small puzzle to answer one question. That is the problem.',
        hint: 'Compare the first two letters of Thursday with "Tu". Then a birthday counts as 1.'
      },
      {
        type: 'pick', q: 'Sam\'s clever line ran with no errors and passed all three of his checks. Why did Ana still lose her birthday bonus?',
        options: [
          'Sam never checked a birthday that fell on a Tuesday',
          'Python rounds 23.50 down to 23',
          'The computer was too slow on Tuesdays',
          'Ana typed her birthday wrong'
        ],
        answer: 0,
        why: 'His checks covered Monday, Tuesday and a Monday birthday. The only broken case was the mix of both. Lesson 49\'s small tests are cheap, so add one for every mix of rules that matters.',
        hint: 'Look at the three days Sam tried.'
      },
      {
        type: 'fill', q: 'Fix the plain version so the birthday bonus counts on Tuesdays too.',
        text: 'def points_for(total, day, is_birthday):\n    points = int(total)\n    if day == "Tuesday":\n        points = points * 2\n    ___ is_birthday:\n        points = points + 10\n    return points',
        options: ['if', 'elif', 'else'],
        answer: ['if'],
        why: 'A plain <code>if</code> starts a new question, so the birthday rule is checked every time. <code>elif</code> only runs when the question above said no.',
        hint: 'Which word asks its question no matter what happened above?'
      },
      {
        type: 'bucket', q: 'Does this leave room to debug, or use up all your cleverness?',
        buckets: ['Leaves room', 'Uses it all up'],
        items: [
          ['One rule per line', 0],
          ['Names like total and is_birthday', 0],
          ['A test for the tricky mix of rules', 0],
          ['A comment that says why a strange line is there', 0],
          ['Three rules squeezed into one expression', 1],
          ['Names like t, d and b', 1],
          ['A trick you are proud of but would struggle to explain', 1]
        ],
        why: 'Everything on the left makes the code easier to read on its worst day. Everything on the right spends the reader\'s cleverness before the bug hunt even starts.'
      },
      {
        type: 'pick', q: 'Sam rewrites the line so that a newcomer can read it aloud as plain sentences. Which earlier lesson is that?',
        options: ['Lesson 5, KISS', 'Lesson 10, Premature optimisation', 'Lesson 38, Least privilege', 'Lesson 54, Brooks\'s law'],
        answer: 0,
        why: 'KISS asked "Could someone new read this aloud and say what it does?" Kernighan\'s law gives the reason behind it: someone will have to debug it one day.',
        hint: 'Which lesson rewrote the opening hours in plain steps?'
      },
      {
        type: 'pick', q: 'Months later, Priya sees <code>d[:2] == "Tu"</code> in some old code and thinks checking just the first letter, <code>d[0] == "T"</code>, would be simpler. Which earlier law of this module says she should find out why it is there before she changes it?',
        options: ['Lesson 56, Chesterton\'s fence', 'Lesson 53, Conway\'s law', 'Lesson 58, Goodhart\'s law', 'Lesson 54, Brooks\'s law'],
        answer: 0,
        why: 'The two letters are there for a reason: one letter would also catch Thursday, and Thursday orders would earn double points. A comment saying why would have protected it. Clever code hides its reasons, so it is full of fences.',
        hint: 'Which law was about a fence in the road?'
      },
      {
        type: 'pick', q: 'Which of these are true about Kernighan\'s law? Pick all that apply.',
        options: [
          'It comes from Brian Kernighan, writing in The Elements of Programming Style',
          'It is a rule of thumb, not a law of nature',
          'It says you should never use a clever way of solving a problem',
          'It says plain code should be as long as possible'
        ],
        answer: [0, 1],
        why: 'A clever method is fine when it is written plainly and explained. And plain means easy to understand, not long and copied out.',
        hint: 'Two are true. Two are the mistakes from "When not to".'
      }
    ]
  });
})();
