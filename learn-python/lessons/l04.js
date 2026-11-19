/* Lesson 4: Read an error (module 0). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow, esc } = PR;

  /* =====================================================================
     l04  Read an error
     ===================================================================== */

  // One line of monospace text that keeps its leading spaces, so ^ marks line up under the code.
  const mono = (x, y, s, fill, size, weight) =>
    `<text x="${x}" y="${y}" xml:space="preserve" style="white-space:pre" font-family="JetBrains Mono, monospace" font-size="${size || 12}" font-weight="${weight || 500}" fill="${fill || '#CFCBF5'}">${esc(s)}</text>`;
  const pill = (x, y, w, label, fill, col) =>
    `<rect x="${x}" y="${y}" width="${w}" height="26" rx="13" fill="${fill}" stroke="${P.ink}" stroke-width="2"/>` + T(x + w / 2, y + 18, label, { s: 12, f: col || P.ink });
  const num = (x, y, n, col) =>
    `<circle cx="${x}" cy="${y}" r="12" fill="${col || P.ink}" stroke="${P.ink}" stroke-width="2"/>` + T(x, y + 4.5, String(n), { s: 12.5, f: P.white });

  /* ---------- The idea: the burnt dish and its note, then the real note ---------- */
  const tb = [
    'Traceback (most recent call last):',
    '  File "menu.py", line 3, in <module>',
    '    print("Guests:" + 3)',
    '          ~~~~~~~~~~^~~',
    'TypeError: can only concatenate str (not "int") to str'
  ];
  const ideaPic = svg(600, 400, 'A burnt pie with a note pinned to it that says which step went wrong. Below, Python\'s note: a traceback, read from the bottom up. 1 the last line says what went wrong, 2 the marks point at the exact spot, 3 the line itself, 4 the file and line number.',
    // the burnt dish
    `<path d="M70 92 q-10 -22 6 -36 M96 88 q-10 -24 6 -40 M122 92 q-10 -22 6 -36" fill="none" stroke="${P.mute}" stroke-width="4" stroke-linecap="round"/>` +
    `<ellipse cx="100" cy="122" rx="78" ry="26" fill="${P.ink}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<ellipse cx="100" cy="114" rx="70" ry="20" fill="#3E2A22" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<path d="M62 110 l12 4 M92 104 l10 6 M124 110 l12 -2" stroke="#1b1210" stroke-width="4" stroke-linecap="round"/>` +
    // the note, pinned on
    `<g transform="rotate(-3 300 82)">` + box(196, 30, 230, 104, P.warnT, 10) +
    `<circle cx="311" cy="36" r="7" fill="${P.danger}" stroke="${P.ink}" stroke-width="2"/>` +
    T(212, 66, 'Step 3 went wrong:', { s: 14, a: 'start' }) +
    T(212, 90, 'the oven was 250, not 180.', { s: 13, w: 700, a: 'start', f: P.ink2 }) +
    T(212, 114, 'Look at step 3.', { s: 13, w: 700, a: 'start', f: P.danger }) + `</g>` +
    arrow(440, 84, 500, 84, P.accent, 3) +
    T(530, 70, 'Python', { s: 13, f: P.accent }) + T(530, 88, 'writes', { s: 13, f: P.accent }) + T(530, 106, 'notes too', { s: 13, f: P.accent }) +
    // the real traceback
    `<rect x="40" y="166" width="420" height="200" rx="14" fill="#15132B" stroke="${P.ink}" stroke-width="2.5"/>` +
    mono(52, 200, tb[0], '#8E8AC0') + mono(52, 238, tb[1]) + mono(52, 276, tb[2], '#ECEAFF') + mono(52, 314, tb[3], '#FF8FA8', 12, 700) +
    mono(52, 352, 'TypeError', '#FFC24B', 12, 700) + mono(52 + 9 * 7.2, 352, tb[4].slice(9), '#ECEAFF') +
    // labels, numbered in reading order (bottom up)
    num(474, 348, 1, P.danger) + T(492, 353, 'WHAT went wrong', { s: 12, a: 'start' }) +
    num(474, 310, 2, P.danger) + T(492, 315, 'the exact spot', { s: 12, a: 'start' }) +
    num(474, 272, 3) + T(492, 277, 'the line itself', { s: 12, a: 'start' }) +
    num(474, 234, 4) + T(492, 239, 'WHERE: line 3', { s: 12, a: 'start' }) +
    arrow(22, 352, 22, 214, P.accent, 3) +
    T(250, 392, 'read it from the bottom up', { s: 13, f: P.accent }));

  /* ---------- The code: the four notes beginners meet most ---------- */
  const four = [
    ['SyntaxError', "SyntaxError: '(' was never closed", 'Python cannot read the recipe. Nothing runs.', P.danger, P.dangerT],
    ['IndentationError', 'IndentationError: unexpected indent', 'A line is pushed in with spaces at the start.', P.warn, P.warnT],
    ['NameError', "NameError: name 'Print' is not defined. Did you mean: 'print'?", 'Python does not know that word.', P.accent, P.tint],
    ['TypeError', 'TypeError: can only concatenate str (not "int") to str', 'Text and a number were mixed with +.', P.ok, P.okT]
  ];
  const fourPic = svg(600, 392, 'Four cards. SyntaxError: a bracket was never closed. IndentationError: unexpected indent. NameError: name Print is not defined, did you mean print. TypeError: can only concatenate str, not int, to str.',
    four.map(([name, last, plain, col, tint], i) => {
      const y = 12 + i * 94;
      return box(14, y, 566, 80, P.white, 14) +
        `<rect x="14" y="${y}" width="12" height="80" rx="4" fill="${col}"/>` +
        pill(40, y + 10, name.length * 8.4 + 26, name, tint, col) +
        T(name.length * 8.4 + 82, y + 28, i < 2 ? 'before cooking' : 'while cooking', { s: 11.5, w: 700, a: 'start', f: P.mute }) +
        mono(40, y + 54, last, P.ink, 11, 600) +
        T(40, y + 73, plain, { s: 12, w: 700, a: 'start', f: P.ink2 });
    }).join(''));

  /* ---------- The pain: poking at random ---------- */
  const painPic = svg(600, 250, 'One error, then three random changes, and now there are three problems instead of one.',
    T(150, 26, 'ONE PROBLEM', { s: 12.5, f: P.ok }) + T(450, 26, 'AFTER 3 RANDOM CHANGES', { s: 12.5, f: P.danger }) +
    box(20, 40, 260, 66, '#15132B', 12) + mono(36, 80, 'print("Guests:" + 3)', '#ECEAFF', 15) +
    `<rect x="${36 + 16 * 9}" y="62" width="11" height="26" rx="3" fill="none" stroke="#FF8FA8" stroke-width="2.5"/>` +
    arrow(290, 74, 316, 74, P.danger, 3) +
    box(322, 40, 260, 66, '#15132B', 12) + mono(338, 80, 'Print(Guests: + 3]', '#ECEAFF', 15) +
    `<path d="M338 92 h9 M392 92 h63 M491 92 h9" stroke="#FF8FA8" stroke-width="3" stroke-linecap="round"/>` +
    box(20, 134, 260, 92, P.okT, 12) + T(150, 166, '1 note, 1 line to fix', { s: 14, f: P.ok }) + T(150, 192, 'the ^ points at the +', { s: 12.5, w: 700, f: P.ink2 }) + T(150, 212, 'one change, then run', { s: 12.5, w: 700, f: P.ink2 }) +
    box(322, 134, 260, 92, P.dangerT, 12) + T(452, 166, '3 problems now', { s: 14, f: P.danger }) + T(452, 192, 'capital P, lost quotes,', { s: 12.5, w: 700, f: P.ink2 }) + T(452, 212, 'a ] instead of a )', { s: 12.5, w: 700, f: P.ink2 }));

  /* ---------- The catch: where Python noticed, not where you slipped ---------- */
  const catchPic = `<div style="width:100%">` +
    code(["print('Tonight's menu')"], { title: 'menu.py', bad: [1] }) +
    term(['  File "menu.py", line 1', "    print('Tonight's menu')", '                         ^', 'SyntaxError: unterminated string literal (detected at line 1)'], 'Python 3.14: the ^ is at the end') +
    svg(600, 64, 'The real slip is the apostrophe in the middle of the line. It closed the text early. Python only noticed at the end.',
      box(16, 8, 568, 46, P.warnT, 12) + T(300, 37, "The slip is the ' in Tonight's. Python noticed at the last quote.", { s: 13.5 })) +
    term(['  File "menu.py", line 3', '    print("Ben: bean chili")', '    ^', 'SyntaxError: invalid syntax'], 'older Python 3.9: a missing ) on line 2, reported on line 3') +
    `</div>`;

  COURSE.add({
    id: 'l04', minutes: 10,
    summary: 'When a program fails, Python pins a <b>note</b> to it, called a <b>traceback</b>. Read it from the bottom up: <b>what</b> went wrong, the <b>exact spot</b>, then <b>where</b>. Change one thing, and run again.',
    video: {
      src: 'videos/l04-read-an-error.mp4', poster: 'videos/l04-read-an-error.jpg', length: '59 s',
      script: [
        "You take a pie out of the oven. It's burnt. But a note is pinned to it, saying which step went wrong, and why.",
        "When your program fails, Python pins a note on it too. It's called a traceback. It looks scary, but it's on your side.",
        "So don't panic, and don't change things at random. Read it from the bottom up.",
        "The last line names the problem. TypeError. Python can only join text to text, and 3 is a number.",
        "One line up, little marks point at the exact spot. The plus sign.",
        "Above that, the line number. Line 3.",
        "So go to line 3, and change one thing. Swap the plus for a comma. Print shows each part, with a space between.",
        "Run it again. No note this time. The menu prints, and dinner is served.",
        "An error is not a disaster. It's a note that tells you where to look."
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'A burnt dish that explains itself.',
        text: [
          'Picture this. You take a pie out of the oven and it is burnt. But a <b>note</b> is pinned to it: "Step 3 went wrong. The oven was at 250 degrees, not 180." Now you know exactly where to look.',
          'Python does the same. When your recipe fails, it prints a note called a <b>traceback</b>. You met a short one in lesson 1. Now you learn to read every part of it.',
          'Read it <b>from the bottom up</b>. (1) The last line says <b>what</b> went wrong: the kind of error, then a colon, then a message. (2) Marks like <code>^^^</code> or <code>~~~^~~</code> point at the <b>exact spot</b>. (3) Above them is the line of code itself. (4) Above that is <b>where</b>: the file and the line number.'
        ],
        tip: 'The first line, <code>Traceback (most recent call last):</code>, is just a heading. It means "here is the trail back to the step that failed". Your trail is one step long for now. In lesson 52, Exceptions, you will see longer ones.'
      },
      {
        label: 'The code', pic: fourPic,
        h: 'The four notes you will see most.',
        text: [
          'The word before the colon is the <b>error type</b>. Learn these four and you can read most beginner errors.',
          '<b>SyntaxError</b>: the recipe is written wrong, so Python cannot even read it. A bracket or a quote mark is missing or extra. Python 3.14 is helpful here: <code>\'(\' was never closed</code> tells you which bracket.',
          '<b>IndentationError</b>: a line starts with spaces where it should not. For now, every line starts at the left edge.',
          '<b>NameError</b>: Python does not know a word. Usually a typo, like <code>Print</code> with a capital P. Look for <code>Did you mean: \'print\'?</code> at the end. Python guesses the word you meant.',
          '<b>TypeError</b>: two kinds of things were mixed that do not go together. <code>+</code> can join text to text, but <code>"Guests:" + 3</code> joins text to a <b>number</b>. In the message, <code>str</code> means text and <code>int</code> means a whole number.'
        ],
        tip: 'Notice "before cooking" and "while cooking". Python reads the <b>whole file first</b>. A SyntaxError or IndentationError stops it before any line runs, so nothing is printed. A NameError or TypeError happens while cooking, so the lines above it have already run.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Panic makes one problem into three.',
        text: [
          'Red text appears and your stomach drops. The first urge is to <b>change things at random</b>: add a capital letter, delete some quotes, swap a bracket. Then run it and hope.',
          'Every random change can add a <b>new mistake</b>. Now there are three problems instead of one, and the helpful note you had is gone.',
          'A cook with a burnt dish does not throw salt, sugar and water at it. They read the note.'
        ],
        warn: 'Never change more than one thing between runs. If it still fails, you will know whether your change helped.'
      },
      {
        label: 'The fix', pic: run(['print("Tonight\'s menu")', 'print("Ana: pasta"', 'print("Ben: bean chili")', 'print("Chloe: rice pudding")'], { title: 'menu.py' }),
        h: 'Read, find, look, change one thing, run.',
        text: [
          'Every error, every time, the same five calm steps:',
          '1. <b>Read the last line.</b> What kind of error is it, and what does the message say?',
          '2. <b>Find the line.</b> Go to the line number. Look where the <code>^</code> marks point.',
          '3. <b>Look one line above too.</b> A missing bracket or quote mark at the end of one line can confuse the next one.',
          '4. <b>Change one thing.</b> 5. <b>Run again.</b>',
          'Try it now. Press <b>Run</b>. Read the note, fix that one line, and run again until all four lines print.'
        ],
        tip: 'A new, different error after your fix is good news. It means the first problem is gone and Python got further down the recipe.'
      },
      {
        label: 'Try it', pic: run(['print("Kitchen Coach")', '    print("Ana runs a half-marathon on Sunday")', 'print("Cook " + 150 + " grams of pasta for her")'], { title: 'coach.py' }),
        h: 'Two notes, one at a time.',
        text: [
          'This recipe has <b>two</b> mistakes. Run it. Python shows only the first one it finds. Fix it, run again, and meet the second.',
          'For the TypeError there are two good fixes. Put the number in quote marks, so it becomes text: <code>"150"</code>. Or use <b>commas</b> instead of <code>+</code>: <code>print("Cook", 150, "grams of pasta for her")</code>. <code>print</code> shows each part with a space between.',
          'Then add a line for Ben, who needs <b>25</b> grams of protein, using commas. Finally, break it on purpose: delete one bracket. Say which error type you expect <b>before</b> you press Run.'
        ],
        tip: 'Why can\'t <code>+</code> join text and a number? Lesson 13, Types and converting, shows how to turn one into the other.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Python points where it noticed.',
        text: [
          'The line number and the <code>^</code> marks show where Python <b>noticed</b> the problem. That is not always where you <b>made</b> it.',
          'In <code>print(\'Tonight\'s menu\')</code>, the apostrophe in <i>Tonight\'s</i> is the same mark as a single quote, so it closes the text early. Python only notices at the end of the line. The fix is at the start: use double quotes, <code>print("Tonight\'s menu")</code>.',
          'Older versions of Python were worse. Python 3.9 reports a bracket missing on line 2 as a problem on line 3. That is why step 3 says: if the line looks fine, <b>look one line above</b>.'
        ],
        warn: '"Did you mean...?" is a guess. It is usually right, but it is still a guess. Read it, then check it makes sense.'
      }
    ],
    exercises: [
      {
        file: 'l04_fix_the_menu.py', title: 'Fix the menu, one error at a time',
        task: 'Kitchen Coach\'s menu has <b>3 different mistakes</b>. Run the file, read each error from the bottom up, and fix one at a time until the menu prints all 4 lines. The file checks your work and explains each error in plain words.',
        steps: [
          'Press <b>Open in VS Code</b>, then run the file with the Run button at the top right.',
          'Read the error it shows. Go to the line it names, and look one line above too.',
          'Change <b>one</b> thing, save, and run again. A new error means the last one is fixed.',
          'Keep going until you see <code>PASS</code>.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'You read from the bottom up. Which line tells you <b>what kind</b> of problem this is?',
        pic: term(tb, 'terminal'),
        options: ['Traceback (most recent call last):', 'File "menu.py", line 3, in <module>', '~~~~~~~~~~^~~', 'TypeError: can only concatenate str (not "int") to str'],
        answer: 3,
        why: 'The last line names the error type, <code>TypeError</code>, and then says what went wrong: text (<code>str</code>) and a whole number (<code>int</code>) were joined with <code>+</code>.',
        hint: 'Start at the bottom.'
      },
      {
        type: 'match', q: 'Match each error type to what it means.',
        pairs: [
          ['SyntaxError', 'The recipe is written wrong, so Python cannot read it, for example a missing bracket'],
          ['IndentationError', 'A line starts with spaces where it should not'],
          ['NameError', 'Python does not know a word, often a typo'],
          ['TypeError', 'Two kinds of things were mixed, like text + a number']
        ],
        why: 'The word before the colon tells you which of these four it is. That alone tells you what to look for on the line.',
        hint: 'Syntax is how a recipe is written. Indent means pushed in. A name is a word. A type is a kind of thing.'
      },
      {
        type: 'bucket', q: 'Python stopped with each of these errors. Did any lines <b>above</b> the problem run first?',
        buckets: ['Nothing ran at all', 'The lines above ran first'],
        items: [
          ["SyntaxError: '(' was never closed", 0],
          ['IndentationError: unexpected indent', 0],
          ['SyntaxError: unterminated string literal', 0],
          ["NameError: name 'Print' is not defined", 1],
          ['TypeError: can only concatenate str (not "int") to str', 1]
        ],
        why: 'Python reads the whole file before it cooks. If it cannot read it (SyntaxError, IndentationError), nothing runs. NameError and TypeError happen while cooking, after the lines above have run.',
        hint: 'Which errors mean Python could not even read the recipe?'
      },
      {
        type: 'fix', q: 'Run it, read the error, and fix it so all three lines print.',
        code: ['print("Tonight\'s menu")', 'print("Chloe: rice pudding)', 'print("Gluten-free, of course")'],
        title: 'dessert.py',
        check: [
          'lines = out.splitlines()',
          'if lines == ["Tonight\'s menu", "Chloe: rice pudding", "Gluten-free, of course"]:',
          '    ok = True',
          'elif len(lines) != 3:',
          '    msg = "It should print exactly 3 lines. It printed " + str(len(lines)) + "."',
          'else:',
          '    msg = "No error now. Keep the words inside the quotes exactly as they were."'
        ].join('\n'),
        why: '<code>unterminated string literal</code> means some text was opened with a quote mark and never closed. One <code>"</code> before the bracket on line 2 fixes it.',
        hint: 'The text on line 2 starts with a quote mark. Where does it end?'
      },
      {
        type: 'fix', q: 'Ben wants to know his protein. Fix the TypeError so it prints <code>Ben gets 30 grams of protein</code>.',
        code: ['print("Protein check")', 'print("Ben gets " + 30 + " grams of protein")'],
        title: 'protein.py',
        check: [
          'lines = [" ".join(l.split()) for l in out.splitlines()]',
          'if lines == ["Protein check", "Ben gets 30 grams of protein"]:',
          '    ok = True',
          'elif len(lines) != 2:',
          '    msg = "It should print exactly 2 lines. It printed " + str(len(lines)) + "."',
          'else:',
          '    msg = "No error now, but line 2 printed: " + lines[1]'
        ].join('\n'),
        why: 'Text can only be joined to text. Make the number text with quote marks, <code>"30"</code>, or swap each <code>+</code> for a comma and let <code>print</code> put spaces between the parts.',
        hint: 'The ^ marks point at the first +. On its left is text, on its right is the number 30.'
      },
      {
        type: 'order', q: 'Python shows an error. Put the calm routine in order.',
        items: ['Read the last line: what kind of error?', 'Go to the line number and the ^ marks', 'Look at that line, and the line above it', 'Change one thing', 'Run again'],
        why: 'Read, find, look, change one thing, run. One change at a time means you always know what helped.',
        hint: 'It starts at the bottom of the note and ends with pressing Run.'
      },
      {
        type: 'pick', q: 'Python shows this. Where is the <b>real</b> slip?',
        pic: code(["print('Tonight's menu')"], { title: 'menu.py' }) + term(['  File "menu.py", line 1', "    print('Tonight's menu')", '                         ^', 'SyntaxError: unterminated string literal (detected at line 1)'], 'terminal'),
        options: ['At the very end of the line, where the ^ points', "The apostrophe in Tonight's, which ends the text early", 'The word print', 'On line 2'],
        answer: 1,
        why: 'The apostrophe is the same mark as a single quote, so the text ends at <code>\'Tonight\'</code>. Python only noticed at the end of the line. Use double quotes around text that has an apostrophe.',
        hint: 'Python points where it noticed the problem, not always where it started. Count the single quote marks.'
      },
      {
        type: 'pick', q: 'From lesson 1: Python runs from top to bottom. What does this program show before the error?',
        pic: code(['print("Tonight\'s menu")', 'print("Pasta for Ana")', 'Print("Rice pudding for Chloe")'], { title: 'menu.py', bad: [3] }),
        options: ['Nothing at all', "Only Tonight's menu", "Tonight's menu and Pasta for Ana", 'All three lines'],
        answer: 2,
        why: 'Lines 1 and 2 run first, from the top. Line 3 fails while cooking with <code>NameError: name \'Print\' is not defined. Did you mean: \'print\'?</code> A SyntaxError would have stopped everything before line 1.',
        hint: 'A NameError happens while cooking. What has already been cooked?'
      }
    ]
  });
})();
