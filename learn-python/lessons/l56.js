/* Lesson 56: Writing files (module 5). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l56  Writing files
     ===================================================================== */

  // A notebook page with a file name on its tab. lines: [[text, colour]]. o: {fade, wipe}
  const page = (x, y, w, h, name, lines, o) => {
    o = o || {};
    let s = box(x, y, w, h, P.white, 12) +
      `<rect x="${x + 14}" y="${y - 16}" width="${name.length * 8.4 + 24}" height="26" rx="8" fill="${P.tint}" stroke="${P.ink}" stroke-width="2"/>` +
      T(x + 26, y + 2, name, { s: 13, m: true, f: P.accent, a: 'start' });
    for (let i = 0; i < Math.floor((h - 30) / 26); i++) s += `<line x1="${x + 12}" y1="${y + 44 + i * 26}" x2="${x + w - 12}" y2="${y + 44 + i * 26}" stroke="${P.sand}" stroke-width="1.5"/>`;
    lines.forEach(([t, c], i) => { s += T(x + 18, y + 39 + i * 26, t, { s: 14, m: true, f: c || P.ink, a: 'start' }); });
    return s;
  };
  // A small eraser and a small pen, drawn at (x, y).
  const eraser = (x, y) => `<g transform="translate(${x} ${y}) rotate(-20)"><rect x="0" y="0" width="46" height="24" rx="5" fill="${P.dangerT}" stroke="${P.ink}" stroke-width="2.5"/><rect x="0" y="0" width="16" height="24" rx="5" fill="${P.danger}" stroke="${P.ink}" stroke-width="2.5"/></g>`;
  const pen = (x, y) => `<g transform="translate(${x} ${y}) rotate(35)"><rect x="-5" y="-40" width="10" height="34" rx="3" fill="${P.accent}" stroke="${P.ink}" stroke-width="2"/><path d="M-5 -6 L5 -6 L0 6 Z" fill="${P.ink}"/></g>`;

  const ideaPic = svg(600, 330, 'Two ways to open a file for writing. With "w", an eraser wipes the old page clean first, then a pen writes oats, rice and tofu. With "a", the old lines stay and the new line, Thu: lentil curry, is added at the bottom.',
    T(150, 26, 'open(name, "w")', { s: 15, m: true, f: P.danger }) +
    T(150, 46, 'a clean page', { s: 12.5, w: 700, f: P.ink2 }) +
    page(20, 78, 112, 160, 'old.txt', [['Mon: ...', P.mute], ['Tue: ...', P.mute], ['Wed: ...', P.mute]]) +
    eraser(38, 150) +
    arrow(140, 158, 166, 158, P.danger, 2.5) +
    page(172, 78, 120, 160, 'old.txt', [['oats'], ['rice'], ['tofu']]) +
    pen(270, 160) +
    T(150, 268, 'made if missing,', { s: 12.5, w: 700, f: P.danger }) +
    T(150, 286, 'wiped clean if it exists', { s: 12.5, w: 700, f: P.danger }) +
    `<line x1="306" y1="20" x2="306" y2="300" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    T(452, 26, 'open(name, "a")', { s: 15, m: true, f: P.ok }) +
    T(452, 46, 'add to the end', { s: 12.5, w: 700, f: P.ink2 }) +
    page(330, 78, 244, 160, 'dinner_log.txt', [['Mon: lentil soup'], ['Tue: bean chili'], ['Wed: pasta bake'], ['Thu: lentil curry', P.ok]]) +
    `<circle cx="556" cy="194" r="12" fill="${P.ok}" stroke="${P.ink}" stroke-width="2"/>` + T(556, 199, '+', { s: 15, f: P.white }) +
    T(452, 268, 'old lines stay,', { s: 12.5, w: 700, f: P.ok }) +
    T(452, 286, 'new text goes at the bottom', { s: 12.5, w: 700, f: P.ok }) +
    T(300, 322, 'Either way: write() puts down exactly what you give it, and nothing more.', { s: 12.5, w: 700, f: P.ink2 }));

  const save = [
    'shopping = ["oats", "rice", "tofu"]',
    '',
    'f = open("shopping.txt", "w")',
    'for item in shopping:',
    '    f.write(f"{item}\\n")',
    'f.close()',
    '',
    'f = open("shopping.txt")',
    'print(f.read())',
    'f.close()'
  ];
  // print ends every line for you. write does not.
  const nlPic = svg(600, 150, 'print("oats") shows oats and then moves to a new line by itself. f.write("oats") puts down only the 4 letters, so the next write lands right after it: oatsricetofu.',
    box(16, 14, 568, 56, P.okT, 12) +
    T(32, 48, 'print("oats")', { s: 14, m: true, a: 'start' }) + arrow(178, 43, 214, 43, P.ok, 2.5) +
    T(226, 48, 'oats', { s: 14, m: true, f: P.ok, a: 'start' }) + T(270, 48, '↵', { s: 18, f: P.ok, a: 'start' }) +
    T(570, 48, 'print adds the new line', { s: 12.5, w: 700, f: P.ok, a: 'end' }) +
    box(16, 82, 568, 56, P.dangerT, 12) +
    T(32, 116, 'f.write("oats")', { s: 14, m: true, a: 'start' }) + arrow(178, 111, 214, 111, P.danger, 2.5) +
    T(226, 116, 'oats', { s: 14, m: true, f: P.danger, a: 'start' }) +
    T(570, 116, 'write adds nothing extra', { s: 12.5, w: 700, f: P.danger, a: 'end' }));
  const codePic = `<div style="width:100%;min-width:0">${run(save, { title: 'save_list.py' })}${nlPic}</div>`;

  const anaLog = 'Sat: 16 km\nSun: 5 km\nMon: 8 km\nTue: 10 km\nWed: 6 km\n';
  const wipe = [
    'f = open("training_log.txt")',
    'print("Before:")',
    'print(f.read())',
    'f.close()',
    '',
    'f = open("training_log.txt", "w")',
    'f.write("Thu: 8 km\\n")',
    'f.close()',
    '',
    'f = open("training_log.txt")',
    'print("After:")',
    'print(f.read())',
    'f.close()'
  ];
  const wipePic = svg(600, 196, 'Ana\'s training log had five runs, Saturday to Wednesday. After opening it with "w" and writing Thursday, only Thu: 8 km is left. The other five lines are gone, and there is no undo.',
    page(30, 34, 210, 156, 'training_log.txt', [['Sat: 16 km'], ['Sun: 5 km'], ['Mon: 8 km'], ['Tue: 10 km'], ['Wed: 6 km']]) +
    arrow(256, 112, 330, 112, P.danger, 3) + T(293, 100, '"w"', { s: 15, m: true, f: P.danger }) +
    page(346, 34, 210, 156, 'training_log.txt', [['Thu: 8 km']]) +
    T(451, 132, 'five runs gone', { s: 14, w: 800, f: P.danger }) +
    `<g transform="translate(451 166) rotate(-8)"><rect x="-62" y="-20" width="124" height="38" rx="8" fill="${P.paper2}" stroke="${P.danger}" stroke-width="4"/>` + T(0, 9, 'WRONG', { s: 20, f: P.danger }) + '</g>');
  const painPic = `<div style="width:100%;min-width:0">${run(wipe, { title: 'log_run.py', files: { 'training_log.txt': anaLog } })}${wipePic}</div>`;

  const fixed = wipe.slice(); fixed[5] = 'f = open("training_log.txt", "a")';
  // Which letter for which job.
  const modeRow = (y, mode, col, job, ex) =>
    box(16, y, 568, 52, col === P.ok ? P.okT : col === P.danger ? P.dangerT : P.tint, 12) +
    T(52, y + 34, mode, { s: 18, m: true, f: col }) +
    T(96, y + 23, job, { s: 13.5, w: 800, a: 'start' }) +
    T(96, y + 42, ex, { s: 12, w: 700, f: P.ink2, a: 'start' });
  const modesPic = svg(600, 196, 'Which letter to use. "w" when your program writes the whole file fresh every time, like next week\'s shopping list. "a" when you add to a file that should keep growing, like a dinner log or Ana\'s training log. Not sure? Write to a new file name.',
    modeRow(10, '"w"', P.danger, 'Your program writes the WHOLE file, fresh, every time', 'next week\'s shopping list, tonight\'s menu card') +
    modeRow(72, '"a"', P.ok, 'You ADD to a file that keeps growing', 'Ana\'s training log, the dinner log') +
    modeRow(134, 'new', P.accent, 'Not sure? Write to a new file name', 'shopping_week_48.txt, never on top of someone\'s log'));
  const fixPic = `<div style="width:100%;min-width:0">${run(fixed, { title: 'log_run.py', files: { 'training_log.txt': anaLog } })}${modesPic}</div>`;

  const dinners = [
    'def log_dinner(day, dish, kcal):',
    '    f = open("dinner_log.txt", "a")',
    '    f.write(day + ": " + dish + ", ")',
    '    f.write(kcal)',
    '    f.write(" kcal\\n")',
    '    f.close()',
    '',
    'log_dinner("Mon", "lentil soup", 520)',
    'log_dinner("Tue", "bean chili", 640)',
    '',
    'f = open("dinner_log.txt")',
    'print(f.read())',
    'f.close()'
  ];

  const peek = [
    'f = open("dinner_log.txt", "w")',
    'f.write("Mon: lentil soup\\n")',
    '',
    'peek = open("dinner_log.txt")',
    'text = peek.read()',
    'peek.close()',
    'print("Before close:", len(text), "characters")',
    '',
    'f.close()',
    '',
    'peek = open("dinner_log.txt")',
    'text = peek.read()',
    'peek.close()',
    'print("After close:", len(text), "characters")'
  ];
  const bufPic = svg(600, 150, 'Text you write first goes into a small tray, called a buffer, next to the notebook. close() empties the tray onto the page. Before close, the page can still be empty.',
    box(20, 30, 170, 92, P.warnT, 14) + T(105, 60, 'buffer', { s: 14 }) +
    T(105, 86, 'Mon: lentil soup', { s: 12.5, m: true, f: P.ink2 }) + T(105, 108, '(waiting)', { s: 12, w: 700, f: P.warn }) +
    arrow(200, 76, 330, 76, P.ok, 3) + T(265, 64, 'f.close()', { s: 13, m: true, f: P.ok }) +
    page(346, 30, 234, 92, 'dinner_log.txt', [['Mon: lentil soup', P.ok]]) +
    T(300, 146, 'close() puts the waiting text on the page, and puts the notebook away.', { s: 12.5, w: 700, f: P.ink2 }));
  const catchPic = `<div style="width:100%;min-width:0">${run(peek, { title: 'peek.py' })}${bufPic}</div>`;

  COURSE.add({
    id: 'l56', minutes: 12,
    summary: '<code>f = open("shopping.txt", "w")</code> opens a file for <b>writing</b>: Python makes it if it is missing, and <b>wipes it clean</b> if it is already there. <code>f.write(text)</code> puts down <b>exactly</b> that text: it needs a <b>string</b>, and it adds <b>no new line</b>, so write <code>"\\n"</code> yourself, for example <code>f.write(f"{item}\\n")</code>. Numbers go in through an f-string. <code>"a"</code> (append) keeps what is there and <b>adds to the end</b>. Use <code>"w"</code> only for a file your program rewrites in full. On someone\'s log it erases everything, with no undo. <code>f.close()</code> makes sure every word is saved. Lesson 57 shows <code>with</code>, which closes it for you.',
    video: {
      src: 'videos/l56-writing-files.mp4', poster: 'videos/l56-writing-files.jpg', length: '1 min 8 s',
      script: [
        'After dinner, Kitchen Coach saves next week\'s shopping list. Oats, rice and tofu, in a file called shopping.txt.',
        'It opens the file with "w", for write. "w" starts a clean page. A new file is made. An old one is wiped first.',
        'f.write puts each item on the page. But write adds no new line. The words crash together.',
        'Add \\n yourself, after each item. Every item gets its own line. Close the file, and it is saved.',
        'For a log that grows, open it with the letter "a", for append. Monday\'s dinner. Then Tuesday\'s, added at the bottom.',
        'Now the danger. Ana keeps her training log in a file. Kitchen Coach adds tonight\'s run, but opens the file with "w". The clean page wipes all her runs. No warning, no undo.',
        'Open it with "a", and her runs stay safe.',
        '"w" starts a clean page. The letter "a" adds to the end. Write the new lines yourself.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Write it down in the notebook.',
        text: [
          'Dinner is done. Ana, Ben and Chloe loved it, and Kitchen Coach has worked out the <b>shopping list for next week</b>. But when the program ends, every jar and every list is gone. To keep the list, Kitchen Coach has to <b>write it down</b> in the notebook: a file called <code>shopping.txt</code>.',
          'In lesson 55 you opened a file to <b>read</b> it. To write, you give <code>open</code> a second piece of text, a <b>mode</b>. <code>"w"</code> means <b>write</b>: you get a <b>clean page</b>. If the file is missing, Python makes it. If it is already there, Python <b>wipes it</b> first.',
          '<code>"a"</code> means <b>append</b>: add to the end. The old lines stay, and your new text goes at the bottom. That is how a log grows, one night at a time.'
        ],
        tip: 'With no mode, <code>open(name)</code> reads, exactly as in lesson 55. Writing <code>open(name, "r")</code> means the same thing.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'open with "w", write, close.',
        text: [
          'Line 3 opens <code>shopping.txt</code> with <code>"w"</code> and keeps the open file in the jar <code>f</code>. Line 5 <b>writes</b> each item: <code>f.write(text)</code> puts that text on the page. Line 6 <b>closes</b> the file, which makes sure it is all saved.',
          'Look at the end of line 5: <code>\\n</code>, the new-line character from lesson 8. <code>print</code> starts a new line for you (lesson 29 showed how to stop it with <code>end=</code>). <code>write</code> <b>never</b> does. It puts down <b>exactly</b> what you give it, and nothing more.',
          'Lines 8 to 10 read the file back, like lesson 55, to <b>prove</b> what was written. Press <b>Run</b>: three items on three lines.',
          'Now take the <code>\\n</code> out of line 5, so it says <code>f.write(f"{item}")</code>, and run it again. You get <code>oatsricetofu</code>, all crashed into one line. Put the <code>\\n</code> back.'
        ],
        tip: 'Try <code>f.write("oats\\n")</code> at the <code>&gt;&gt;&gt;</code> prompt in a terminal and Python shows <code>5</code>: write hands back how many characters it wrote. In a program that number is simply ignored.'
      },
      {
        label: 'The pain', pic: painPic,
        h: '"w" on the wrong file wipes it.',
        text: [
          'Ana keeps her runs in <code>training_log.txt</code>: five runs so far, Saturday to Wednesday, one per line. Tonight she ran 8 km, so Kitchen Coach adds it to her log. It opens the file with <code>"w"</code>, the only mode it knows so far.',
          'Press <b>Run</b>. Before: five runs. After: <code>Thu: 8 km</code>, and <b>nothing else</b>. Line 6 wiped the page the moment it opened the file, before a single word was written. Then line 7 wrote the one new run on the clean page.',
          'No error, no warning, no "are you sure?". Python did exactly what <code>"w"</code> means. Six weeks of Ana\'s training could go the same way.'
        ],
        warn: 'Opening with <code>"w"</code> is enough to empty a file, even if you never call <code>write</code>. There is no undo and no recycle bin. Before you type <code>"w"</code>, ask: <b>is it fine to lose everything in this file?</b>'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'To add, use "a". When in doubt, a new name.',
        text: [
          'Change one letter. Line 6 now opens the log with <code>"a"</code>: <b>append</b>. The old runs stay, and the new line goes at the <b>bottom</b>. Press <b>Run</b>: six runs, Thursday last.',
          'Run it again. Still six, not seven: every run of this box starts from a fresh copy of Ana\'s log. On your own computer the file stays, so each run of the program would add one more <code>Thu: 8 km</code>. That is exactly what <code>"a"</code> is for, so only run it once per real run.',
          '<code>"a"</code> also makes the file if it is missing, so the very first night works too.'
        ],
        tip: 'Pick the letter by asking <b>who owns the file</b>. If your program writes all of it, every time, <code>"w"</code> is right: next week\'s list <b>should</b> replace last week\'s. If people keep adding to it, use <code>"a"</code>. Not sure? Write to a <b>new file name</b>.'
      },
      {
        label: 'Try it', pic: run(dinners, { title: 'dinner_log.py' }),
        h: 'Numbers go in through an f-string.',
        text: [
          'Kitchen Coach keeps a <b>dinner log</b> that grows each night. The card <code>log_dinner</code> opens the log with <code>"a"</code>, writes one line, and closes it. Calling it twice opens the file twice, like two nights, and each line lands under the one before.',
          'Press <b>Run</b>. Python stops at line 4: <code>TypeError: write() argument must be str, not int</code>. <code>write</code> takes <b>text only</b>. <code>520</code> is a number, and unlike <code>print</code>, <code>write</code> will not turn it into text for you.',
          'Fix it: replace lines 3, 4 and 5 with one line, <code>f.write(f"{day}: {dish}, {kcal} kcal\\n")</code>. The f-string (lesson 15) turns the number into text and adds the new line in one go. Run it: two dinners, two lines.',
          'Then add a third night under line 9, for example <code>log_dinner("Wed", "pasta bake", 710)</code>, and run it again.'
        ],
        tip: '<code>f.write(str(kcal))</code> works too: <code>str()</code> from lesson 13 turns a number into text. The f-string is usually easier to read, because you see the whole line at once.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'close() is what makes sure it is saved.',
        text: [
          'Writing to a disk is slow, so Python does not run to the notebook for every word. Your text first goes into a small tray called a <b>buffer</b>. When the tray is full, or when you <b>close</b> the file, Python puts it all on the page.',
          'Press <b>Run</b>. The program writes a line, then peeks at the file <b>before</b> closing it: <code>0 characters</code>. The line is still in the tray. After <code>f.close()</code> the same peek finds <code>17 characters</code>.',
          'So always close a file you write. Python usually tidies up when a program ends, but if it stops with an error halfway, or another part of the program reads the file too early, your words may not be there yet.'
        ],
        warn: 'Remembering <code>close()</code> every time, even when something goes wrong in between, is hard. Lesson 57, <b>with</b>, shows the better way: Python closes the notebook for you, always.'
      }
    ],
    exercises: [
      {
        file: 'l56_shopping_list.py', title: 'Save the shopping list',
        task: 'Kitchen Coach has next week\'s list as <code>(item, grams)</code> pairs. Write them to <code>l56_shopping.txt</code>, one per line, exactly like <code>oats: 500 g</code>. Then open the file <b>again</b> with <code>"a"</code> and add Chloe\'s late request at the bottom. The script makes that file next to itself, in the <code>exercises</code> folder.',
        steps: [
          'Press <b>Open in VS Code</b>. Run the file once: the list comes out as one long line, with no grams.',
          'Between <code>START</code> and <code>END</code>, fix the <code>"w"</code> part: one line per item, with the grams, using an f-string and <code>\\n</code>.',
          'Below it, open the same file with <code>"a"</code>, write the extra item the same way, and close it. Run it until the check says <code>PASS</code>.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What is in <code>shopping.txt</code> after this runs?',
        pic: code(['f = open("shopping.txt", "w")', 'f.write("oats")', 'f.write("rice")', 'f.write("tofu")', 'f.close()'], { title: 'save.py' }),
        options: ['oatsricetofu, all on one line', 'oats, rice and tofu, on three lines', 'Only tofu, because each write replaces the one before', 'Nothing, because the file did not exist yet'],
        answer: 0,
        why: '<code>write</code> puts down exactly what you give it and adds nothing, so the three words land side by side. Writes in the same open file follow each other. Only <b>opening</b> with <code>"w"</code> wipes the page, and <code>"w"</code> makes the file if it is missing.',
        hint: 'Does write start a new line by itself, like print does?'
      },
      {
        type: 'bucket', q: 'Which mode fits each job?',
        buckets: ['"w" (a clean page)', '"a" (add to the end)'],
        items: [
          ['Save next week\'s shopping list, fresh', 0],
          ['Add tonight\'s run to Ana\'s training log', 1],
          ['Add each dinner to a log that grows', 1],
          ['Print a new menu card for tonight, replacing the old one', 0],
          ['Keep every weigh-in Ben has ever logged', 1],
          ['Rewrite the whole pantry file from your pantry dict', 0]
        ],
        why: 'If your program writes the <b>whole</b> file every time, <code>"w"</code> is right: the old version should go. If the file keeps growing and the old lines matter, <code>"a"</code>.',
        hint: 'Should the old lines in the file survive?'
      },
      {
        type: 'fix', q: 'This should add tonight\'s run to Ana\'s log, but it wipes her other runs. Fix it so the log keeps all five old runs and ends with <code>Thu: 8 km</code>.',
        code: ['f = open("training_log.txt", "w")', 'f.write("Thu: 8 km\\n")', 'f.close()'],
        title: 'log_run.py',
        files: { 'training_log.txt': anaLog },
        check: [
          'try:',
          '    _f = open("training_log.txt")',
          '    _text = _f.read()',
          '    _f.close()',
          'except FileNotFoundError:',
          '    _text = None',
          'if _text is None:',
          '    msg = "training_log.txt is gone. Keep the file name exactly as it was."',
          'elif _text == "' + anaLog.replace(/\n/g, '\\n') + 'Thu: 8 km\\n":',
          '    ok = True',
          'elif not _text.startswith("Sat: 16 km"):',
          '    msg = "The old runs are gone again. The log now holds: " + " / ".join(_text.splitlines()) + ". Which letter in open keeps them?"',
          'elif "Thu: 8 km" not in _text:',
          '    msg = "The old runs are safe, but tonight\'s run is missing. Keep the write line."',
          'elif not _text.endswith("\\n"):',
          '    msg = "Almost. Keep the \\\\n at the end of the line, so the next run starts on a new line."',
          'else:',
          '    msg = "The log now holds: " + " / ".join(_text.splitlines()) + ". It should be the five old runs, then Thu: 8 km once."'
        ].join('\n'),
        why: 'Change <code>"w"</code> to <code>"a"</code>. Append keeps every old line and adds the new one at the bottom.',
        hint: 'One letter in line 1 decides whether the page is wiped.'
      },
      {
        type: 'fix', q: 'Python stops with <code>TypeError: write() argument must be str, not int</code>. Fix it so <code>shopping.txt</code> holds exactly one line: <code>tofu: 900 g</code>, with a new line at the end.',
        code: ['grams = 900', 'f = open("shopping.txt", "w")', 'f.write("tofu: ")', 'f.write(grams)', 'f.write(" g")', 'f.close()'],
        title: 'tofu.py',
        check: [
          'try:',
          '    _f = open("shopping.txt")',
          '    _text = _f.read()',
          '    _f.close()',
          'except FileNotFoundError:',
          '    _text = None',
          'if _text is None:',
          '    msg = "There is no shopping.txt. Keep the file name exactly as it was."',
          'elif _text == "tofu: 900 g\\n":',
          '    ok = True',
          'elif _text == "tofu: 900 g":',
          '    msg = "Nearly. write adds no new line by itself. End the text with \\\\n."',
          'elif _text.strip() == "tofu: 900 g":',
          '    msg = "The words are right, but there are extra spaces or new lines. Aim for exactly tofu: 900 g and one \\\\n."',
          'else:',
          '    msg = "shopping.txt holds: " + _text.replace("\\n", "\\\\n") + ". Aim for: tofu: 900 g\\\\n"'
        ].join('\n'),
        why: 'One line does it all: <code>f.write(f"tofu: {grams} g\\n")</code>. The f-string turns 900 into text, and the <code>\\n</code> ends the line. <code>f.write(str(grams))</code> plus a <code>"\\n"</code> works too.',
        hint: 'write only takes text. An f-string can put the number inside the text, and end with \\n.'
      },
      {
        type: 'pick', q: 'This program runs <b>twice</b>, one run after the other, on your computer. How many lines are in <code>dinner_log.txt</code> after the second run?',
        pic: code(['f = open("dinner_log.txt", "a")', 'f.write("Mon: lentil soup\\n")', 'f.write("Tue: bean chili\\n")', 'f.close()'], { title: 'log.py' }),
        options: ['4', '2', '1', '8'],
        answer: 0,
        why: 'Each run appends 2 lines and keeps what was there. 2 from the first run plus 2 from the second makes 4. With <code>"w"</code> instead, the second run would wipe the page first, and you would have 2.',
        hint: '"a" never wipes. What does each run add?'
      },
      {
        type: 'pick', q: 'Back to lessons 55 and 34. <code>shopping.txt</code> holds <code>oats</code> and <code>rice</code>, each on its own line. What does this print?',
        pic: code(['items = []', 'f = open("shopping.txt")', 'for line in f:', '    items.append(line.strip())', 'f.close()', 'print(items)'], { title: 'read_back.py' }),
        options: ["['oats', 'rice']", "['oats\\n', 'rice\\n']", "['oatsrice']", "['o', 'a', 't', 's']"],
        answer: 0,
        why: '<code>for line in f</code> hands you one line at a time, each still ending with <code>\\n</code>. <code>.strip()</code> peels it off, and <code>.append()</code> adds each clean item to the list. Writing adds the <code>\\n</code>, reading takes it off again.',
        hint: 'What does .strip() take off the end of each line?'
      },
      {
        type: 'fill', q: 'Finish the card so each call adds one line, like <code>Wed: pasta bake</code>, to the bottom of the log.',
        text: 'def log_dinner(day, dish):\n    f = open("dinner_log.txt", "___")\n    f.write(f"{day}: {dish}___")\n    f.close()',
        options: ['a', 'w', 'r', '\\n', ' ', 'end'],
        answer: ['a', '\\n'],
        why: '<code>"a"</code> adds to the end without wiping the log. <code>\\n</code> ends the line, so the next dinner starts on a line of its own.',
        hint: 'One letter keeps the old lines. One special character starts the next line.'
      },
      {
        type: 'order', q: 'Put the lines in order to save the list, one item per line.',
        items: ['shopping = ["oats", "rice", "tofu"]', 'f = open("shopping.txt", "w")', 'for item in shopping:', '    f.write(f"{item}\\n")', 'f.close()'],
        why: 'Make the list, open the file, write each item inside the loop, and close it once, after the loop. Closing inside the loop would shut the notebook after the first item.',
        hint: 'The close comes once, after every item is written.'
      }
    ]
  });
})();
