/* Lesson 55: Reading files (module 5). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l55  Reading files
     ===================================================================== */

  // The recipe notebook every Run box on this page starts with.
  const PANTRY = 'rice,900\noats,400\nlentils,0\npasta,150\n';
  const files = { 'pantry.txt': PANTRY };

  // A paper notebook with a spiral and a name tab. rows: the lines written in it.
  const notebook = (x, y, w, h, name, rows, o) => {
    o = o || {};
    let s = box(x, y, w, h, P.paper2, 12);
    for (let i = 0; i < Math.floor((h - 24) / 22); i++) s += `<circle cx="${x + 14}" cy="${y + 22 + i * 22}" r="4.5" fill="${P.paper}" stroke="${P.ink}" stroke-width="2"/>`;
    s += `<line x1="${x + 30}" y1="${y + 8}" x2="${x + 30}" y2="${y + h - 8}" stroke="${P.danger}" stroke-width="1.5" opacity="0.6"/>`;
    s += box(x + w - 112, y - 16, 104, 28, o.tab || P.tint, 8) + T(x + w - 60, y + 3, name, { s: 12, m: true, f: P.accent });
    rows.forEach((r, i) => {
      const ry = y + 34 + i * 26;
      s += `<line x1="${x + 34}" y1="${ry + 7}" x2="${x + w - 12}" y2="${ry + 7}" stroke="${P.sand}" stroke-width="1.5"/>`;
      s += T(x + 42, ry, r, { s: 14, m: true, a: 'start' });
    });
    return s;
  };
  // A paper strip: one line of text, with the hidden newline shown as a red return mark.
  const strip = (x, y, txt, nl, fill) => {
    const w = 22 + txt.length * 8.4 + (nl ? 26 : 0);
    return `<rect x="${x}" y="${y}" width="${w}" height="30" rx="6" fill="${fill || P.white}" stroke="${P.ink}" stroke-width="2"/>` +
      T(x + 11, y + 20, txt, { s: 14, m: true, a: 'start' }) +
      (nl ? `<rect x="${x + w - 30}" y="${y + 4}" width="24" height="22" rx="5" fill="${P.dangerT}"/>` + T(x + w - 18, y + 21, '↵', { s: 16, f: P.danger }) : '');
  };
  // A chip: a value. kind 'text' shows quotes on a warm chip, 'num' a plain number on a green chip.
  const chip = (x, y, v, kind) => {
    const label = kind === 'text' ? `"${v}"` : String(v);
    const w = 20 + label.length * 8.4;
    return `<rect x="${x}" y="${y}" width="${w}" height="30" rx="15" fill="${kind === 'text' ? P.warnT : P.okT}" stroke="${P.ink}" stroke-width="2"/>` +
      T(x + w / 2, y + 20, label, { s: 14, m: true, f: kind === 'text' ? P.warn : P.ok });
  };

  /* ---- The idea ---- */
  const ideaSvg = svg(600, 270, 'Left: Kitchen Coach holds the pantry in its memory while it runs: rice 900, oats 400, lentils 0, pasta 150. When the program ends, the memory is wiped and the jars are empty. Right: the pantry written in a notebook called pantry.txt, one line per item, which stays on the shelf after the program ends.',
    T(150, 22, 'IN THE PROGRAM', { s: 13, f: P.danger }) + T(450, 22, 'IN A FILE', { s: 13, f: P.ok }) +
    `<line x1="300" y1="12" x2="300" y2="262" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    box(24, 40, 252, 150, P.white, 14) + T(150, 66, 'Kitchen Coach, running', { s: 13.5 }) +
    [['rice', 900], ['oats', 400], ['lentils', 0], ['pasta', 150]].map(([n, g], i) => {
      const x = 40 + i * 58;
      return `<rect x="${x}" y="84" width="48" height="64" rx="8" fill="${P.warnT}" stroke="${P.ink}" stroke-width="2"/>` +
        T(x + 24, 108, String(g), { s: 12.5, m: true }) + T(x + 24, 140, n, { s: 10.5, w: 700, f: P.ink2 });
    }).join('') +
    T(150, 176, 'all in memory', { s: 12, w: 700, f: P.ink2 }) +
    arrow(150, 196, 150, 218, P.danger, 3) +
    box(54, 224, 192, 34, P.dangerT, 10) + T(150, 246, 'program ends: all gone', { s: 12.5, f: P.danger }) +
    notebook(340, 52, 230, 150, 'pantry.txt', ['rice,900', 'oats,400', 'lentils,0', 'pasta,150']) +
    T(455, 232, 'stays on the shelf.', { s: 12.5, w: 700, f: P.ok }) +
    T(455, 252, 'Tomorrow, read it again.', { s: 12.5, w: 700, f: P.ok }));
  const ideaPic = `<div style="width:100%;min-width:0">${ideaSvg}${term(['$ cat pantry.txt', 'rice,900', 'oats,400', 'lentils,0', 'pasta,150'], 'pantry.txt, a plain text file')}</div>`;

  /* ---- The code: open, read, close ---- */
  const readAll = [
    'f = open("pantry.txt")',
    'text = f.read()',
    'f.close()',
    '',
    'print(text)',
    'print(len(text), "characters, in one string")'
  ];
  const bigSvg = svg(600, 120, 'f.read() hands back the whole notebook as one long string. Each line ends with a hidden newline, shown here as a red return mark: rice,900 newline, oats,400 newline, lentils,0 newline, pasta,150 newline.',
    T(20, 24, 'text = f.read()   gives ONE string:', { s: 13, w: 700, f: P.ink2, a: 'start' }) +
    strip(14, 40, 'rice,900', true) + strip(140, 40, 'oats,400', true) + strip(266, 40, 'lentils,0', true) + strip(400, 40, 'pasta,150', true) +
    T(300, 104, 'the red ↵ is the hidden "\\n" at the end of each line (lesson 8)', { s: 12.5, w: 700, f: P.danger }));
  const codePic = `<div style="width:100%;min-width:0">${run(readAll, { title: 'read.py', files })}${bigSvg}</div>`;

  /* ---- The pain: line by line, with gaps ---- */
  const byLine = [
    'f = open("pantry.txt")',
    'for line in f:',
    '    print(line)',
    'f.close()'
  ];
  const gapSvg = svg(600, 150, 'Why the gaps: the line rice,900 already ends with a newline, and print adds its own newline after it. Two newlines make one empty line between items.',
    T(20, 24, 'line holds:', { s: 13, w: 700, f: P.ink2, a: 'start' }) + strip(110, 6, 'rice,900', true) +
    T(320, 24, 'print adds:', { s: 13, w: 700, f: P.ink2, a: 'start' }) +
    `<rect x="414" y="6" width="34" height="30" rx="6" fill="${P.dangerT}" stroke="${P.ink}" stroke-width="2"/>` + T(431, 27, '↵', { s: 16, f: P.danger }) +
    box(20, 58, 300, 80, '#15132B', 12) +
    T(40, 84, 'rice,900', { s: 14, m: true, f: '#ECEAFF', a: 'start' }) +
    T(40, 106, '', { s: 14 }) +
    T(40, 128, 'oats,400', { s: 14, m: true, f: '#ECEAFF', a: 'start' }) +
    `<rect x="36" y="95" width="160" height="16" rx="4" fill="none" stroke="#ff8fab" stroke-width="2" stroke-dasharray="5 4"/>` +
    arrow(340, 104, 210, 104, P.danger, 2.5) +
    T(460, 92, '↵ + ↵ = an empty line', { s: 14, f: P.danger }) + T(460, 114, 'between every item', { s: 12.5, w: 700, f: P.ink2 }));
  const painPic = `<div style="width:100%;min-width:0">${run(byLine, { title: 'lines.py', files })}${gapSvg}</div>`;

  /* ---- The fix: strip, split, int, dict ---- */
  const toDict = [
    'pantry = {}',
    'f = open("pantry.txt")',
    'for line in f:',
    '    line = line.strip()',
    '    name, grams = line.split(",")',
    '    pantry[name] = int(grams)',
    'f.close()',
    '',
    'print(pantry)',
    'print(f"Rice left: {pantry[\'rice\']} g")'
  ];
  const pipeSvg = svg(600, 230, 'One line on its way into the pantry. The strip rice,900 with its newline. strip() snips the newline off. split on the comma cuts it into two chips, the text rice and the text 900. int() turns the text 900 into the number 900. pantry[name] = int(grams) stores rice: 900 in the dictionary.',
    T(20, 22, '1. the line', { s: 12.5, w: 700, f: P.ink2, a: 'start' }) + strip(20, 32, 'rice,900', true) +
    // scissors
    `<g transform="translate(150,26)" stroke="${P.ink}" stroke-width="2.5" fill="none"><circle cx="8" cy="8" r="6"/><circle cx="8" cy="30" r="6"/><path d="M13 12 L36 26 M13 26 L36 12"/></g>` +
    T(238, 22, '2. .strip()', { s: 12.5, w: 700, f: P.ink2, a: 'start' }) + strip(238, 32, 'rice,900', false) +
    T(372, 22, '3. .split(",")', { s: 12.5, w: 700, f: P.ink2, a: 'start' }) + chip(372, 32, 'rice', 'text') + chip(450, 32, '900', 'text') +
    arrow(260, 76, 260, 104, P.ink2, 2.5) +
    T(20, 126, 'name, grams = ...', { s: 13, m: true, a: 'start' }) +
    T(220, 126, 'name', { s: 12, w: 700, f: P.ink2 }) + chip(250, 106, 'rice', 'text') +
    T(352, 126, 'grams', { s: 12, w: 700, f: P.ink2 }) + chip(386, 106, '900', 'text') +
    arrow(450, 121, 492, 121, P.ok, 2.5) + T(470, 150, 'int()', { s: 12.5, m: true, f: P.ok }) + chip(500, 106, 900, 'num') +
    box(20, 168, 560, 50, P.okT, 12) +
    T(40, 199, 'pantry[name] = int(grams)', { s: 14, m: true, a: 'start' }) + T(330, 199, '→', { s: 18 }) +
    T(360, 199, '{"rice": 900, ...}', { s: 14, m: true, f: P.ok, a: 'start' }));
  const fixPic = `<div style="width:100%;min-width:0">${run(toDict, { title: 'pantry.py', files })}${pipeSvg}</div>`;

  /* ---- Try it ---- */
  const tryIt = [
    'pantry = {}',
    'f = open("pantry.txt")',
    'for line in f:',
    '    name, grams = line.strip().split(",")',
    '    pantry[name] = int(grams)',
    'f.close()',
    '',
    'pantry["rice"] += 150   # you just bought more rice',
    'for name, grams in pantry.items():',
    '    if grams < 200:',
    '        print(f"Running low: {name} ({grams} g)")'
  ];

  /* ---- The catch: a wrong name ---- */
  const typoTerm = term([
    '$ python3 pantry.py',
    'Traceback (most recent call last):',
    '  File "pantry.py", line 1, in <module>',
    '    f = open("pantyr.txt")',
    "FileNotFoundError: [Errno 2] No such file or directory: 'pantyr.txt'"
  ], 'terminal, Python 3.15');
  const safe = [
    'try:',
    '    f = open("pantyr.txt")',
    'except FileNotFoundError:',
    '    print("No notebook yet. Starting with an empty pantry.")',
    '    pantry = {}',
    'else:',
    '    print("Found the notebook:")',
    '    print(f.read())',
    '    f.close()'
  ];
  const shelfSvg = svg(600, 120, 'Left: the shelf has a notebook called pantry.txt. Right: Python looks for pantyr.txt, finds an empty spot on the shelf, and raises FileNotFoundError.',
    `<line x1="20" y1="92" x2="580" y2="92" stroke="${P.ink}" stroke-width="4"/>` +
    notebook(40, 26, 150, 60, 'pantry.txt', ['rice,900']) +
    `<rect x="330" y="26" width="150" height="62" rx="12" fill="none" stroke="${P.danger}" stroke-width="2.5" stroke-dasharray="7 6"/>` +
    T(405, 62, 'pantyr.txt?', { s: 14, m: true, f: P.danger }) +
    T(115, 112, 'what is on the shelf', { s: 12, w: 700, f: P.ok }) + T(405, 112, 'FileNotFoundError', { s: 12.5, m: true, f: P.danger }));
  const catchPic = `<div style="width:100%;min-width:0">${shelfSvg}${typoTerm}${run(safe, { title: 'safe.py', files })}</div>`;

  COURSE.add({
    id: 'l55', minutes: 14,
    summary: 'A program forgets everything when it ends. A <b>file</b> remembers: it is a recipe notebook on the shelf. <code>f = open("pantry.txt")</code> opens it, <code>f.read()</code> hands you the whole page as <b>one string</b>, and <code>f.close()</code> puts it back. <code>for line in f:</code> reads it <b>line by line</b>. Each line ends with a hidden <code>"\\n"</code>, so <code>.strip()</code> it, <code>.split(",")</code> it into a name and the grams, and turn the grams into a number with <code>int()</code>, because <b>a file is only text</b>. Put them in a dict and the pantry is back. A wrong file name raises <code>FileNotFoundError</code>, which <code>try</code> and <code>except</code> can catch.',
    video: {
      src: 'videos/l55-reading-files.mp4', poster: 'videos/l55-reading-files.jpg', length: '1 min 8 s',
      script: [
        'Kitchen Coach knows your pantry. Rice, oats, lentils. But when the program ends, it forgets.',
        'So write it down, in a recipe notebook. A text file, pantry.txt. One line per item. Rice, comma, 900.',
        'Open the notebook with open. Read hands you the whole page, as one big string. Then close it.',
        'Or read it line by line, with a for loop. But look at the gaps. Each line ends with a hidden new line, and print adds its own. Strip snips it off.',
        'Split cuts each line at the comma, into a name and the grams. But a file is text. Add 150 to the grams, and Python stops. Int turns the text into a real number. Now the pantry is a dictionary.',
        'Spell the name wrong, and the shelf is empty. FileNotFoundError. Catch it with try and except.',
        'Open the notebook, read it line by line, and turn the text into data.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'A program forgets. A notebook remembers.',
        text: [
          'Kitchen Coach keeps the pantry in a dict: 900 g of rice, 400 g of oats, no lentils, 150 g of pasta. While the program runs, all of that lives in the computer\'s <b>memory</b>. When the program ends, the memory is wiped. Next time, Kitchen Coach starts with <b>empty jars</b>.',
          'A real cook writes the pantry down in a notebook. A program does the same with a <b>file</b>. A file stays on the computer\'s disk after the program ends, like a notebook stays on the shelf.',
          '<code>pantry.txt</code> is a <b>text file</b>: plain lines of letters, like a <code>.py</code> file but with no code in it. You can open it in VS Code and type in it yourself. Here it has <b>one line per item</b>: the name, a comma, the grams.'
        ],
        tip: 'Every Run box on this page starts with <code>pantry.txt</code> already in its folder, so the examples just run. Nothing you change here touches files on your own computer.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'open, read, close.',
        text: [
          '<code>open("pantry.txt")</code> finds the file and <b>opens</b> the notebook. It hands back a <b>file object</b>, a way in to that file. We keep it in a jar called <code>f</code>.',
          '<code>f.read()</code> reads the <b>whole page</b> and hands it back as <b>one big string</b>. <code>f.close()</code> closes the notebook again. Always close a file when you are done, so the computer can let go of it.',
          'Press <b>Run</b>. <code>print(text)</code> shows the notebook. Then look at the count: <b>38 characters</b>. The letters and digits make 34. The other 4 are the hidden <code>"\\n"</code> at the end of each line, the newline from lesson 8. They are in the string, you just never see them.'
        ],
        tip: 'Forgetting <code>f.close()</code> is easy. Lesson 57, <b>with</b>, shows the better way: a block that closes the notebook <b>for you</b>, even when something goes wrong. For now, write the close yourself.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Line by line, and the lines drift apart.',
        text: [
          'One big string is hard to work with. You want the pantry <b>one item at a time</b>. A file works with <code>for</code> (lesson 26): <code>for line in f:</code> hands you <b>one line per round</b>, top to bottom.',
          'Press <b>Run</b>. The items are all there, but with an <b>empty line</b> between each one. Where do the gaps come from?',
          'Each <code>line</code> still ends with its hidden <code>"\\n"</code>: it is really <code>"rice,900\\n"</code>. And <code>print()</code> adds its <b>own</b> newline at the end. Two newlines in a row make an empty line.'
        ],
        warn: 'The gaps are only the visible part. The hidden <code>"\\n"</code> also stays inside the text when you cut the line up. A notebook with just <code>oats</code> on a line gives <code>"oats\\n"</code>, and <code>pantry["oats"]</code> would not find that key. Snip the newline off first, every time.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'strip, split, int: from text to data.',
        text: [
          '<code>line.strip()</code> peels spaces off both ends (lesson 9), and the hidden newline counts as space. So it snips the <code>"\\n"</code> off: <code>"rice,900"</code>.',
          '<code>.split(",")</code> is a new text tool. It <b>cuts</b> the text at every comma and hands back the pieces as a <b>list</b>: <code>["rice", "900"]</code>. Two pieces, so unpack them into two jars at once, as with tuples in lesson 36: <code>name, grams = line.split(",")</code>.',
          'Now the big one: <code>grams</code> is <code>"900"</code>, with quotes. <b>A file is only text</b>, so everything you read from it is a string, even the numbers. <code>int(grams)</code> turns it into the number 900, as in lesson 13. Then <code>pantry[name] = ...</code> puts it in the dict, as in lesson 37.',
          'Press <b>Run</b>. Four lines of text are a pantry again: <code>{\'rice\': 900, \'oats\': 400, \'lentils\': 0, \'pasta\': 150}</code>.'
        ],
        tip: 'Read the loop as a recipe for one line: <b>snip</b> the end, <b>cut</b> at the comma, <b>turn</b> the grams into a number, <b>store</b> it. Every line of the notebook goes through the same four steps.'
      },
      {
        label: 'Try it', pic: run(tryIt, { title: 'low_stock.py', files }),
        h: 'What is running low?',
        text: [
          'Line 4 does two tools in one go: <code>line.strip().split(",")</code>. Python runs them left to right. <code>.strip()</code> hands back a string, and <code>.split(",")</code> works on that string.',
          'Line 8 adds the 150 g of rice you just bought with <code>+=</code>, and the loop from lesson 38 prints every item <b>under 200 g</b>. Press <b>Run</b>: lentils and pasta are running low.',
          'Now change <code>200</code> to <code>500</code> on line 10 and run it again. Oats join the list.',
          'Then break it on purpose. On line 5, take away the <code>int(</code> and its <code>)</code>, so the line is <code>pantry[name] = grams</code>. Run it. Line 8 stops with <code>TypeError: can only concatenate str (not "int") to str</code>: Python cannot add the number 150 to the text <code>"900"</code>. Text from a file must be <b>converted</b> before you do maths. Press Reset.'
        ],
        tip: 'Without <code>int()</code>, a comparison goes wrong too. <code>"1000" &lt; "200"</code> is <code>True</code>, because text is compared <b>letter by letter</b>, and "1" comes before "2". So 1000 g of flour would look like it is running low.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'A wrong name finds an empty shelf.',
        text: [
          'Type the name with two letters swapped, <code>"pantyr.txt"</code>, and Python looks on the shelf and finds <b>nothing</b>. <code>open()</code> raises a <b>FileNotFoundError</b>, the exception lesson 52 promised. The message quotes the exact name it looked for, so read it letter by letter.',
          'The Python in this page says <code>[Errno 44]</code> where your computer says <code>[Errno 2]</code>. It is the same error. The number is just the code the system uses for "no such file".',
          'A missing notebook can be normal: on the very first day, there is no pantry yet. So catch it with <code>try</code> and <code>except FileNotFoundError:</code> from lesson 53, and start with an empty pantry. Press <b>Run</b> on <b>safe.py</b>. Then fix the name to <code>"pantry.txt"</code> and run it again: the <code>else</code> block reads the notebook.',
          '<code>open("pantry.txt")</code> looks in the folder the program <b>runs from</b>. In VS Code that is usually the folder you opened. Lesson 58, Paths with pathlib, shows how to point at a file exactly.'
        ],
        tip: 'New in Python 3.15: <code>open()</code> reads text as <b>UTF-8</b> on every computer (PEP 686). Before, a computer set to another language setting, often on Windows, could read <code>café</code> as <code>cafÃ©</code>. To be safe on older Pythons too, write <code>open("pantry.txt", encoding="utf-8")</code>.'
      }
    ],
    exercises: [
      {
        file: 'l55_read_the_pantry.py', title: 'Read the pantry notebook',
        task: 'Next to the exercise file sits a notebook, <code>l55_pantry.txt</code>, with one line per item: <code>rice,900</code>. Read it <b>line by line</b> into a dict called <code>pantry</code>, with the grams as <b>numbers</b>. Then print every item with <b>less than 200 g</b> left. The check also tries your code on a <b>different</b> notebook, so read the file, do not type the numbers in.',
        steps: [
          'Press <b>Open in VS Code</b>. Open <code>l55_pantry.txt</code> too and have a look: it is a plain text file. Do not change it.',
          'In the exercise, the line above <code>START</code> finds the notebook next to the file for you. Use it: <code>f = open(NOTEBOOK)</code>.',
          'Run it once as it is: it prints the lines with gaps, and the check tells you what to do next. Then strip, split, convert with <code>int()</code>, and store each item in <code>pantry</code>. Run it until it says <code>PASS</code>.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: '<code>pantry.txt</code> holds 4 lines. After this, what is in <code>text</code>?',
        pic: code(['f = open("pantry.txt")', 'text = f.read()', 'f.close()'], { title: 'read.py' }),
        options: ['One string with all 4 lines, each ending in "\\n"', 'A list of 4 strings, one per line', 'A dict made from the lines', 'Only the first line'],
        answer: 0,
        why: '<code>.read()</code> reads the whole notebook into <b>one</b> string. The line breaks are still inside it, as hidden <code>"\\n"</code> characters. Making a list or a dict is your job.',
        hint: 'read() reads the whole page. Into one value, or many?'
      },
      {
        type: 'pick', q: 'This prints an empty line between the items. Why?',
        pic: code(byLine, { title: 'lines.py', hi: [3] }),
        options: ['Each line still ends with "\\n", and print() adds another one', 'The file has empty lines between the items', 'for adds a blank line after every round', 'f.close() is in the wrong place'],
        answer: 0,
        why: 'The line is really <code>"rice,900\\n"</code>. <code>print()</code> ends with its own newline, so two newlines in a row give a gap. <code>line.strip()</code> removes the first one.',
        hint: 'What is hiding at the very end of every line in a text file?'
      },
      {
        type: 'bucket', q: 'Each line comes from the pantry loop. What kind of value does it give?',
        buckets: ['Text (str)', 'A number (int)', 'A list'],
        items: [
          ['f.read()', 0],
          ['line', 0],
          ['line.strip()', 0],
          ['line.split(",")', 2],
          ['grams  (from name, grams = ...)', 0],
          ['int(grams)', 1]
        ],
        why: 'Everything you read from a text file is text, including <code>"900"</code>. <code>.split()</code> hands back a list of strings. Only <code>int()</code> makes a number.',
        hint: 'A file is only text. Which step is the only one that turns text into a number?'
      },
      {
        type: 'fill', q: 'Finish the loop that turns each line into a pantry item.',
        text: 'pantry = {}\nf = open("pantry.txt")\nfor line in f:\n    name, grams = line.___().___(",")\n    pantry[name] = ___(grams)\nf.___()',
        options: ['strip', 'split', 'int', 'close', 'read', 'str'],
        answer: ['strip', 'split', 'int', 'close'],
        why: '<code>.strip()</code> snips the newline, <code>.split(",")</code> cuts at the comma, <code>int()</code> turns the grams into a number, and <code>f.close()</code> puts the notebook back.',
        hint: 'Snip, cut, convert. And what do you do with a notebook when you are finished?'
      },
      {
        type: 'order', q: '<code>pantry = {}</code> is already at the top. Put the rest in order so the program reads <code>pantry.txt</code> into the dict. The spaces at the start of a line count.',
        items: ['f = open("pantry.txt")', 'for line in f:', '    name, grams = line.strip().split(",")', '    pantry[name] = int(grams)', 'f.close()'],
        why: 'Open the notebook first. The loop reads each line, cuts it, and then stores it. Close the file once, after the loop, not inside it.',
        hint: 'You cannot store name and grams before you have cut the line. And close only once, after the last line.'
      },
      {
        type: 'fix', q: 'You bought 150 g of rice. This stops with a <code>TypeError</code>. Fix it so it prints <code>Rice: 1050 g</code>.',
        code: [
          'pantry = {}',
          'f = open("pantry.txt")',
          'for line in f:',
          '    name, grams = line.strip().split(",")',
          '    pantry[name] = grams',
          'f.close()',
          '',
          'pantry["rice"] += 150',
          'print(f"Rice: {pantry[\'rice\']} g")'
        ],
        title: 'bought_rice.py', files,
        check: [
          'lines = out.splitlines()',
          'if not lines or lines[-1] != "Rice: 1050 g":',
          '    msg = "The last line should be exactly: Rice: 1050 g"',
          'elif not isinstance(pantry.get("oats"), int):',
          '    msg = "Rice works, but the other grams are still text. Convert every item when you store it, inside the loop."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: 'Everything read from a file is text, so <code>pantry["rice"]</code> was <code>"900"</code>. Store <code>int(grams)</code> on line 5, and every item becomes a number you can add to.',
        hint: 'Read the TypeError. Which value is still text? Convert it on line 5, as it goes into the pantry.'
      },
      {
        type: 'fix', q: 'Back to lesson 53. On the very first day there is no notebook yet, so this crashes. Catch the error so it prints <code>No notebook yet.</code> and then <code>0 items</code>.',
        code: [
          'pantry = {}',
          'f = open("pantry.txt")',
          'for line in f:',
          '    name, grams = line.strip().split(",")',
          '    pantry[name] = int(grams)',
          'f.close()',
          '',
          'print(len(pantry), "items")'
        ],
        title: 'first_day.py', files: {},
        check: [
          'lines = out.splitlines()',
          'if "No notebook yet." not in lines:',
          '    msg = "Print exactly: No notebook yet.  inside an except FileNotFoundError: block."',
          'elif not lines or lines[-1] != "0 items":',
          '    msg = "The last line should still print: 0 items  Keep print(len(pantry), \\"items\\") at the left edge, after the try block."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: 'Put the reading lines inside <code>try:</code>, and under <code>except FileNotFoundError:</code> print the message. The pantry stays the empty dict from line 1, and the last line still runs: <code>0 items</code>.',
        hint: 'Write <code>try:</code> above line 2 and push lines 2 to 6 in by 4 spaces. Then add <code>except FileNotFoundError:</code> and the print.'
      },
      {
        type: 'pick', q: 'You forgot <code>int()</code>, and Kitchen Coach checks <code>grams &lt; "200"</code> with text on both sides. The notebook says <code>flour,1000</code>. What happens?',
        options: ['It says True: flour looks like it is running low', 'It says False, because 1000 is more than 200', 'TypeError', 'It turns both into numbers by itself'],
        answer: 0,
        why: 'Text is compared <b>letter by letter</b>, like words in a dictionary. <code>"1"</code> comes before <code>"2"</code>, so <code>"1000" &lt; "200"</code> is <code>True</code>. No error, just a wrong answer. Convert with <code>int()</code> first.',
        hint: 'Both sides are text. How are words put in order?'
      }
    ]
  });
})();
