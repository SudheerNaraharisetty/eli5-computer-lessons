/* Lesson 47: Unix philosophy (module 5). One file per lesson. */
(function () {
  const { P, code, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l47  Unix philosophy
     Every terminal line on this page was run on a real machine (macOS) against
     the two sample files below, and the output shown is what came back.
     ===================================================================== */
  const NIGHT = '#15132B', LILAC = '#ECEAFF';
  const tick = (x, y, ok) => `<circle cx="${x}" cy="${y}" r="13" fill="${ok ? P.ok : P.danger}" stroke="${P.ink}" stroke-width="2.5"/>` +
    (ok ? `<path d="M${x - 6} ${y + 1} l4 5 l8 -10" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`
      : `<path d="M${x - 5} ${y - 5} l10 10 M${x + 5} ${y - 5} l-10 10" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`);

  /* ---- The idea: a drawer of small tools, or one clever machine ---- */
  const ideaPic = svg(600, 300, 'On the left, four small kitchen tools: a knife, a pan, a whisk and a bowl. Each does one job, and together they make hundreds of meals. On the right, one egg-and-toast machine that makes egg and toast and nothing else.',
    T(150, 26, 'A DRAWER OF SMALL TOOLS', { s: 12.5, f: P.ok }) + T(450, 26, 'ONE CLEVER MACHINE', { s: 12.5, f: P.danger }) +
    `<line x1="300" y1="14" x2="300" y2="236" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    [['knife', 'cuts'], ['pan', 'heats'], ['whisk', 'mixes'], ['bowl', 'holds']].map((r, i) => {
      const x = 30 + (i % 2) * 126, y = 46 + Math.floor(i / 2) * 64;
      return box(x, y, 112, 50, P.okT, 12) + T(x + 56, y + 23, r[0], { s: 14.5 }) + T(x + 56, y + 40, r[1], { s: 12, w: 700, f: P.ink2 });
    }).join('') +
    T(150, 196, 'soup, salad, pancakes, omelette, stew ...', { s: 12.5, w: 700, f: P.ink2 }) +
    T(150, 218, '4 tools, hundreds of meals', { s: 13.5, f: P.ok }) +
    box(352, 46, 196, 114, P.dangerT, 18) + T(450, 80, 'egg-and-toast', { s: 15 }) + T(450, 100, 'machine', { s: 15 }) +
    [['EGG', 410], ['TOAST', 490]].map(b => `<rect x="${b[1] - 32}" y="118" width="64" height="26" rx="13" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` + T(b[1], 136, b[0], { s: 12 })).join('') +
    T(450, 196, '"Soup, please." There is no button for that.', { s: 12.5, w: 700, f: P.ink2 }) +
    T(450, 218, '1 machine, 1 meal', { s: 13.5, f: P.danger }) +
    box(60, 252, 480, 36, P.warnT, 12) + T(300, 275, 'One job each. Made to be combined.', { s: 13.5 }));

  /* ---- The code: one big program with a menu ---- */
  const masterCode = [
    'def shop_report_master(option):',
    '    sales = read_sales("sales.txt")',
    '    if option == 1:',
    '        top_sellers(sales, 3)',
    '    elif option == 2:',
    '        top_sellers(sales, 5)',
    '    elif option == 3:',
    '        email_top_sellers(sales, 3)',
    '    elif option == 4:',
    '        colour_top_sellers(sales, 3)',
    '    # ... options 5 to 39 look the same ...',
    '    elif option == 40:',
    '        email_colour_top_sellers(sales, 10)',
    '    else:',
    '        print("No such report.")'
  ];

  /* ---- The pain: 40 buttons, and the next question has none ---- */
  const painPic = svg(600, 330, 'ShopReportMaster is one big machine with 40 buttons. Maya asks four questions. Only the first one, the top 3 sellers, has a button. How many ginger, what sold least, and ginger on rainy days all bounce off.',
    box(18, 22, 256, 256, P.dangerT, 18) + T(146, 50, 'ShopReportMaster', { s: 14, m: true }) +
    Array.from({ length: 40 }, (_, i) => {
      const x = 44 + (i % 8) * 29, y = 78 + Math.floor(i / 8) * 31;
      return `<circle cx="${x}" cy="${y}" r="10.5" fill="${i === 0 ? P.ok : P.white}" stroke="${P.ink}" stroke-width="2.5"/>`;
    }).join('') +
    T(146, 244, '40 options', { s: 14 }) + T(146, 264, '3 weeks of work', { s: 12.5, w: 700, f: P.ink2 }) +
    T(446, 20, 'MAYA ASKS', { s: 12, f: P.ink2 }) +
    [['"Top 3 sellers today?"', 'option 1', true], ['"How many ginger?"', 'no button', false], ['"What sold least?"', 'no button', false], ['"Ginger on rainy days?"', 'no button', false]].map((r, i) => {
      const y = 34 + i * 62;
      return box(300, y, 196, 40, P.white, 12) + T(398, y + 25, r[0], { s: 12.5 }) +
        box(506, y + 4, 84, 32, r[2] ? P.okT : P.dangerT, 10) + T(548, y + 25, r[1], { s: 12, f: r[2] ? P.ok : P.danger });
    }).join('') +
    T(300, 314, 'It can only answer the questions Sam thought of in advance.', { s: 13, f: P.danger }));

  /* ---- The fix: the file, the one line, and what comes out of each tool ---- */
  const salesFile = ['choc chip', 'oat', 'ginger', 'choc chip', 'lemon', 'oat', 'choc chip', 'ginger', 'oat', 'choc chip'];
  const stages = [
    ['sales.txt', '10 lines', salesFile],
    ['sort', 'put in order', ['choc chip', 'choc chip', 'choc chip', 'choc chip', 'ginger', 'ginger', 'lemon', 'oat', 'oat', 'oat']],
    ['uniq -c', 'squash, count', ['4 choc chip', '2 ginger', '1 lemon', '3 oat']],
    ['sort -rn', 'biggest first', ['4 choc chip', '3 oat', '2 ginger', '1 lemon']],
    ['head -3', 'keep three', ['4 choc chip', '3 oat', '2 ginger']]
  ];
  const stagePic = svg(600, 336, 'The file sales.txt has 10 lines. sort puts them in order. uniq -c squashes equal neighbours into one line with a count: 4 choc chip, 2 ginger, 1 lemon, 3 oat. sort -rn puts the biggest first. head -3 keeps three: 4 choc chip, 3 oat, 2 ginger. Between every two tools is the same pipe.',
    T(300, 16, 'What comes out of each tool', { s: 13.5 }) +
    stages.map((s, i) => {
      const x = 6 + i * 123, cx = x + 48, h = s[2].length * 16 + 14;
      let o = box(x, 48, 96, 50, i ? P.tint : P.paper2, 12) + T(cx, 69, s[0], { s: 13, m: true }) + T(cx, 87, s[1], { s: 11.5, w: 700, f: P.ink2 });
      if (i === 1) o += arrow(x - 24, 73, x - 3, 73, P.ink, 2.5);
      if (i > 1) o += `<rect x="${x - 26}" y="66" width="25" height="14" rx="3" fill="${P.accent}" stroke="${P.ink}" stroke-width="2.5"/>` + T(x - 13.5, 40, '|', { s: 15, m: true, f: P.accent });
      o += arrow(cx, 106, cx, 124, P.ink2, 2.5) + box(x, 128, 96, h, NIGHT, 8) +
        s[2].map((l, j) => T(x + 9, 146 + j * 16, l, { s: 11.5, m: true, a: 'start', f: i === 4 ? '#7CF0B5' : LILAC })).join('');
      return o;
    }).join('') +
    T(300, 326, 'Lines of text go in. Lines of text come out. So every joint is the same pipe.', { s: 12.5, w: 700, f: P.ink2 }));

  const fixPic = `<div style="width:100%">` +
    term(salesFile, 'sales.txt: one line per cookie sold today') +
    term([
      '# What were today\'s three best sellers?',
      '$ sort sales.txt | uniq -c | sort -rn | head -3',
      '   4 choc chip',
      '   3 oat',
      '   2 ginger'
    ], 'the accountant\'s terminal') +
    stagePic +
    term([
      '# How many ginger did we sell?',
      '$ grep ginger sales.txt | wc -l',
      '       2',
      '# What sold least?',
      '$ sort sales.txt | uniq -c | sort -n | head -1',
      '   1 lemon',
      '# How many ginger on rainy days? (week.txt: mon,rainy,ginger)',
      '$ grep rainy week.txt | grep ginger | wc -l',
      '       3'
    ], 'the next three questions: same tools, rearranged') + `</div>`;

  /* ---- The test: one job, and can the output travel on? ---- */
  const card = (x, title, col, fill, ok, a1, a2) =>
    box(x, 36, 276, 168, fill, 16) + T(x + 138, 62, title, { s: 14, m: true }) +
    T(x + 138, 90, 'Does it do one job?', { s: 12, w: 700, f: P.ink2 }) + tick(x + 30, 112, ok) +
    a1.map((s, i) => T(x + 52, 110 + i * 17, s, { s: 12.5, a: 'start', f: col })).join('') +
    T(x + 138, 154, 'Can its output feed something else?', { s: 12, w: 700, f: P.ink2 }) + tick(x + 30, 178, ok) +
    a2.map((s, i) => T(x + 52, 176 + i * 17, s, { s: 12.5, a: 'start', f: col })).join('');
  const echoCode = [
    'def find(word, lines):',
    '    kept = []',
    '    for line in lines:',
    '        if word in line:',
    '            kept.append(line)',
    '    return kept',
    '',
    'def first(n, lines):',
    '    return lines[:n]',
    '',
    'lines = read_lines("week.txt")',
    'rainy = find("rainy", lines)',
    'rainy_ginger = find("ginger", rainy)',
    'print(len(rainy_ginger))        # 3',
    'print(first(2, rainy_ginger))   # the first two of them'
  ];
  const testPic = `<div style="width:100%">` +
    svg(600, 222, 'The tool sort passes both questions: it does one job, and its output is plain lines that any tool can read. ShopReportMaster fails both: it reads, counts, sorts, lays out and emails, and its output is a decorated report for human eyes only.',
      T(150, 22, 'A SMALL TOOL', { s: 12.5, f: P.ok }) + T(450, 22, 'A SEALED BLOCK', { s: 12.5, f: P.danger }) +
      card(12, 'sort', P.ok, P.okT, true, ['Yes. It puts lines in order.'], ['Yes. Plain lines, nothing extra.']) +
      card(312, 'ShopReportMaster', P.danger, P.dangerT, false, ['No. Reads, counts, sorts,', 'lays out and emails.'], ['No. A decorated report,', 'for human eyes only.'])) +
    code(echoCode, { title: 'the same idea inside one Python program', good: [6, 9], hi: [12, 13] }) + `</div>`;

  /* ---- When not to: plain text is weak, and long chains are hard to read ---- */
  const whenNotPic = `<div style="width:100%">` +
    term([
      '# Maya adds gingerbread to the menu. One is sold, so sales.txt gets one more line.',
      '$ grep ginger sales.txt | wc -l',
      '       3',
      '# 2 ginger and 1 gingerbread. Nothing crashed. The answer is quietly wrong.'
    ], 'plain text carries no labels') +
    term([
      '# What sells best on rainy days?',
      '$ grep rainy week.txt | cut -d, -f3 | sort | uniq -c | sort -rn | head -1 | tr -s " " | cut -d" " -f3',
      'ginger',
      '# 8 tools in a row. It works today. On the day choc chip wins, it prints: choc'
    ], 'a chain that has grown too long') + `</div>`;

  COURSE.add({
    id: 'l47', minutes: 10,
    summary: 'Build <b>small tools that each do one job well</b>, and make them easy to <b>combine</b>: the output of one becomes the input of the next. That is the <b>Unix philosophy</b>. A handful of small tools can answer questions nobody planned for. One giant program can only do what its author thought of.',
    video: {
      src: 'videos/l47-unix-philosophy.mp4', poster: 'videos/l47-unix-philosophy.jpg', length: '1 min 4 s',
      script: [
        'Maya asks one question. What were today\'s 3 best sellers?',
        'Sam starts building one big program to answer it. 3 weeks later it has 40 options. Then Maya asks, how many ginger? There is no button for that.',
        'The accountant grew up with Unix. She builds nothing. She lines up 4 small tools, joined by pipes.',
        'In goes the pile of sales. Sort puts them in order. Count squashes each bunch into one line with a number. Rank puts the biggest first. And top 3 keeps 3. There is Maya\'s answer.',
        'Each tool does one job. Each one hands plain lines of text to the next, through the same simple pipe.',
        'So for the ginger question, she just unclips them. Find ginger. Count the lines. 2. Nothing new was built.',
        'That is the Unix philosophy. Small tools that do one thing well, made to be combined.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'A drawer of small tools beats one clever machine.',
        text: [
          'A kitchen has a knife, a pan, a whisk and a bowl. Each one does <b>one job</b>. None of them knows what dinner is. Yet with those four you can make hundreds of meals, including meals nobody had invented when the knife was made. Now picture an "egg-and-toast machine". It makes egg and toast very well. Ask it for soup, and there is no button for that.',
          '<b>Unix</b> is an operating system: the base program that runs a computer and every other program on it. It was created at Bell Labs around 1969 to 1970 by Ken Thompson, Dennis Ritchie and their colleagues. The systems that grew out of it and its ideas, such as Linux, macOS and Android underneath, run most of the world\'s servers and phones.',
          'Its builders worked to a philosophy. Doug McIlroy, who invented the "pipe" you will meet in this lesson, summed it up: <b>"Write programs that do one thing and do it well. Write programs to work together. Write programs to handle text streams, because that is a universal interface."</b>',
          'That is three ideas. <b>One:</b> each tool does one job and does it well. <b>Two:</b> tools are built to be combined, so the output of one can be fed straight into the next. <b>Three:</b> they all speak the same simple language, lines of plain text, so any tool can be connected to any other. That includes tools written decades apart by people who never met.'
        ],
        tip: 'You already know these ideas at a smaller size. One job each: lesson 16, Single responsibility, and lesson 17, Small functions. Build from parts: lesson 27, Composition over inheritance. One agreed socket that any part can plug into: lesson 28, Program to an interface. The Unix philosophy is those four lessons, applied to <b>whole programs</b>.'
      },
      {
        label: 'The code', pic: code(masterCode, { title: 'shop_report_master.py, three weeks in', hi: [3, 5, 7, 9, 12] }),
        h: 'Sam builds ShopReportMaster.',
        text: [
          'At closing time Maya asks a simple question: <b>"What were today\'s three best sellers?"</b> The till already keeps a file, <code>sales.txt</code>, with one line for every cookie sold. Each line is just the name of the cookie. Today the file has 10 lines.',
          'Sam, the helper, offers to build the answer. He starts one big program, <code>ShopReportMaster</code>. It reads the sales, counts them, sorts them, lays out a report and emails it. Everything sits behind a menu of numbered options. You met <code>elif</code> in lesson 28: Python tries each question from the top and runs the first one whose answer is yes.',
          'Option 1 is the top 3. Then Sam thinks ahead. The top 5? Option 2. By email? Option 3. In colour? Option 4. Line 11 is a note, as in lesson 4, standing in for 35 more branches that look just like these.',
          'Three weeks later the program has <b>40 options</b>. Look at what they are. Every one is another version of <b>the same report</b>.'
        ]
      },
      {
        label: 'The pain', pic: painPic,
        h: 'The next question has no button.',
        text: [
          'Maya reads the top 3. Like anyone with a fresh answer, she thinks of the next question. <b>"How many ginger did we sell?"</b> Sam checks the menu. 40 options, and none of them counts one kind of cookie. "I can add it. Give me a day."',
          '"What sold <b>least</b>?" Another day. "How many ginger on <b>rainy days</b>?" That one needs a second file, a new report and options 43 to 45.',
          'The program can only answer questions <b>Sam thought of in advance</b>. The annoying part is that the skills are all in there. It can read lines. It can count. It can sort. But they are welded together in one fixed order, behind a menu. Nobody can take the counting part out and point it at something else.',
          'And every new option goes into the same long <code>elif</code> chain, right next to the 40 that already work. Lesson 29, Open/closed, showed where that leads.'
        ],
        warn: 'Sam is not lazy, and no single line here is bad. The program has the wrong <b>shape</b>. A sealed block has exactly as many uses as its author had ideas.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Four small tools and a pipe.',
        text: [
          'The accountant from lesson 16 grew up with Unix. She hears Maya\'s question and opens a <b>terminal</b>. A terminal, also called the <b>command line</b>, is a window where you run a program by typing its name and pressing Enter, with no clicking. Whatever the program has to say comes back as lines of text underneath. In the pictures, a line starting with <code>$</code> is what she typed, and the lines under it are what came back.',
          'She types <b>one line</b>. It names four small programs, joined by the <code>|</code> sign. That sign is a <b>pipe</b>. It means: take everything the program on the left prints, and feed it to the program on the right as its input.',
          '<code>sort</code> puts lines in order, so equal lines end up next to each other. <code>uniq -c</code> squashes identical neighbouring lines into one line, with a count in front. <code>sort -rn</code> sorts again, by number, biggest first. <code>head -3</code> keeps the first three lines and drops the rest. The short bits after a dash, like <code>-c</code> and <code>-3</code>, are small switches that adjust the one job. The middle picture shows what comes out of each tool.',
          'Ten seconds, and Maya has her answer. Then come the next questions, and <b>nothing new gets built</b>. <code>grep</code> keeps only the lines that contain a word. <code>wc -l</code> counts lines. Join those two, and that is how many ginger. Change two pieces of the first line, and that is what sold least. For the rainy days there is a second file Maya keeps, <code>week.txt</code>, with the day, the weather and the cookie on each line. The accountant uses <code>grep</code> twice.',
          '<b>5 tools, 4 questions answered</b>: <code>sort</code>, <code>uniq</code>, <code>head</code>, <code>grep</code> and <code>wc</code>. None of them knows what a cookie is. None was written for Maya\'s shop. Their authors only agreed on one thing: lines of text come in, lines of text go out. That is the socket from lesson 28, at the size of whole programs.'
        ],
        tip: 'The power is in the <b>combinations</b>. With 10 small tools there are 10 × 10 × 10 = 1,000 ways to line up three of them. Most are useless. The useful ones cover questions that nobody has asked yet. One giant program has only the features its author thought of.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'One job? And can the output travel on?',
        text: [
          'Point at a tool, a program or a function and ask: <b>"Does this do one job, and can its output be fed straight into something else?"</b>',
          'Try <code>sort</code>. One job: put lines in order. Its output is plain lines that any other tool can read. Yes, and yes. Try <code>ShopReportMaster</code>. It reads and counts and sorts and lays out and emails. Its output is a finished report with borders and colours, made for human eyes. Nothing else can use that as input. No, and no.',
          'The same test works <b>inside one Python program</b>. Look at the code. <code>find</code> and <code>first</code> each take a list and hand back a list with <code>return</code>. So the answer from one can be handed straight to the next, just like a pipe. Lines 12 and 13 use <code>find</code> twice in a row, as the accountant used <code>grep</code> twice.',
          'Two small pieces of Python. On line 4, <code>word in line</code> asks "does this text contain that word?". You have used <code>in</code> with lists before, and it works on text too. On line 9, <code>lines[:n]</code> keeps the first <code>n</code> items, the way <code>[:160]</code> kept the first 160 characters in lesson 18. <code>read_lines</code> hands back a file as a list of its lines.'
        ],
        tip: 'A good tool also <b>stays quiet</b>. Look at the real output in The fix: <code>wc -l</code> printed <code>2</code> and nothing else. No "Total lines found:", no border. Any extra chatter would have to be scraped off by the next tool in line. In Python the same habit is: <b>return the plain answer</b>, and leave the printing and decorating to the very last step.'
      },
      {
        label: 'When not to', pic: whenNotPic,
        h: 'A toolbox is not always the answer.',
        text: [
          '<b>Plain text is a weak language.</b> Lines of text carry no labels, so every tool has to guess the structure all over again. Maya adds gingerbread to the menu. Look at the first picture: <code>grep ginger</code> now says 3, because the word "gingerbread" contains "ginger". In <code>week.txt</code>, which column is the weather? What if a cookie is called "rainy day special", or a name has a comma in it? Lesson 41, Robustness principle, met the same trouble at the edge of Maya\'s shop. For richer data, people agree on stricter formats in which every value has a name.',
          '<b>A long chain can be harder to read than a short program.</b> The second picture answers "what sells best on rainy days?" with 8 tools in a row. It works. It also hides a bug: the last step keeps one word, so the day choc chip wins it will print <code>choc</code>. A clear 20-line Python program with good names would be kinder to the next reader. That is lesson 5, KISS, and lesson 4, Trade-offs, not laws.',
          '<b>It is a philosophy for builders.</b> A customer on Maya\'s website does not want a toolbox. They want one friendly page with a Pay button. Most people want the finished meal, not a drawer of knives. The philosophy is about how the pieces <b>underneath</b> are made.',
          '<b>"One thing" can be cut too thin.</b> Suppose Sam loves this lesson and replaces ShopReportMaster with 200 tiny tools: one that opens a file, one that reads a single line, one that adds 1. Nobody can remember them all, and every answer needs 30 of them in a row. Lesson 17, Small functions, called this chopping too small. A tool should do one <b>whole</b> job that deserves a name.'
        ],
        warn: 'So: small tools and plain text for quick questions, and for gluing programs together. One clear program and a stricter format when the data is rich, or when the chain has grown past what you can read at a glance.'
      }
    ],
    quiz: [
      {
        type: 'match', q: 'Match each tool to its one job.',
        pairs: [
          ['sort', 'Puts lines in order'],
          ['uniq -c', 'Squashes identical neighbouring lines into one, with a count'],
          ['head -3', 'Keeps the first three lines'],
          ['grep ginger', 'Keeps only the lines that contain "ginger"'],
          ['wc -l', 'Counts lines']
        ],
        why: 'Five tools, five small jobs. None of them knows anything about cookies, which is exactly why they can be used for anything.',
        hint: 'The switch after the dash adjusts the job. It does not add a second job.'
      },
      {
        type: 'order', q: 'Build the line that prints today\'s three best sellers. Put the pieces in order, left to right.',
        items: ['sort sales.txt', '| uniq -c', '| sort -rn', '| head -3'],
        why: 'Put equal lines next to each other. Squash and count them. Put the biggest count first. Keep three.',
        hint: 'Counting only works once equal lines sit next to each other. Keeping three comes last.'
      },
      {
        type: 'pick', q: 'The accountant is in a hurry and leaves out the first <code>sort</code>. The answer is nonsense. Why?',
        pic: term([
          '$ uniq -c sales.txt | sort -rn | head -3',
          '   1 oat',
          '   1 oat',
          '   1 oat'
        ], 'without the first sort'),
        options: [
          'uniq -c only squashes identical lines that are next to each other',
          'A pipe can only join two tools, not three',
          'head -3 is broken',
          'sort -rn cannot read numbers'
        ],
        answer: 0,
        why: 'In <code>sales.txt</code> no two equal lines happen to be neighbours, so <code>uniq -c</code> counts every line as 1. Each tool does one small job and trusts the tool before it. <code>sort</code> is what brings the equal lines together.',
        hint: 'Read the job of <code>uniq -c</code> again, slowly. Which word in it matters here?'
      },
      {
        type: 'type', q: 'Use the file from The fix. What number does this line print?',
        context: ['# sales.txt: choc chip, oat, ginger, choc chip, lemon, oat, choc chip, ginger, oat, choc chip', '$ grep oat sales.txt | wc -l'],
        prompt: 'it prints >',
        answers: ['3'],
        why: '<code>grep oat</code> keeps the three lines that say oat. <code>wc -l</code> counts them: 3. Nobody had to build a "count the oat cookies" feature.',
        hint: 'First keep only the oat lines. Then count how many lines are left.'
      },
      {
        type: 'pick', q: 'Sam writes two versions of a job that finds the ginger sales. Which one can be chained into another function?',
        pic: code([
          'def ginger_a(lines):',
          '    kept = []',
          '    for line in lines:',
          '        if "ginger" in line:',
          '            kept.append(line)',
          '    return kept',
          '',
          'def ginger_b(lines):',
          '    for line in lines:',
          '        if "ginger" in line:',
          '            print("*** FOUND: " + line + " ***")'
        ], { title: 'two ways to find ginger' }),
        options: ['ginger_a, because it hands back a plain list', 'ginger_b, because it prints nicely', 'Both', 'Neither'],
        answer: 0,
        why: '<code>ginger_a</code> returns a list, so <code>len(ginger_a(lines))</code> or <code>first(2, ginger_a(lines))</code> just works. <code>ginger_b</code> sends decorated text to the screen, where it stops. Nothing can use it as input.',
        hint: 'Ask the test: can its output be fed straight into something else?'
      },
      {
        type: 'fill', q: 'Finish the Python chain: how many ginger were sold on rainy days?',
        text: 'def find(word, lines):\n    kept = []\n    for line in lines:\n        if word in line:\n            kept.append(line)\n    ___ kept\n\nrainy = find("rainy", lines)\nrainy_ginger = find("ginger", ___)\nprint(len(rainy_ginger))',
        options: ['return', 'print', 'rainy', 'lines', 'kept'],
        answer: ['return', 'rainy'],
        why: '<code>find</code> must <b>return</b> its list so that the next step can use it. The second <code>find</code> is fed the output of the first one, <code>rainy</code>, just as the pipe fed one <code>grep</code> into the next.',
        hint: 'The second search should look only at the rainy lines, not at all of them.'
      },
      {
        type: 'pick', q: 'Every Unix tool reads lines of text and writes lines of text, so any tool can be joined to any other. Which earlier lesson is that the same idea as?',
        options: [
          'Lesson 28, Program to an interface: one agreed socket, and any part can plug in',
          'Lesson 8, YAGNI: do not build it until someone asks',
          'Lesson 36, Immutability: data that never changes after it is made',
          'Lesson 21, Guard clauses: handle the odd cases first'
        ],
        answer: 0,
        why: 'In lesson 28 the checkout knew only <code>pay(amount)</code>, so any way to pay could be plugged in. Here the agreed socket is "lines of plain text", so any tool can be plugged into any other, even ones written decades apart.',
        hint: 'Think of the wall socket and the lamp.'
      },
      {
        type: 'pick', q: 'When is a pipeline of small text tools the <b>wrong</b> choice? Pick all that apply.',
        options: [
          'Customers on the website need a simple way to pay',
          'The chain has grown to 12 tools and nobody can explain it',
          'The data has names with commas in them and words that overlap, like ginger and gingerbread',
          'Maya has a quick, one-off question about a file of plain lines'
        ],
        answer: [0, 1, 2],
        why: 'Ordinary users want one friendly app. A long chain is harder to read than a short, clear program. Rich or messy data needs a stricter format than plain lines. A quick question about plain lines is exactly what the small tools are for.',
        hint: 'Three of these are limits from "When not to". One is the perfect job for a pipe.'
      }
    ]
  });
})();
