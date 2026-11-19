/* Lesson 17: Comments (module 1). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l17  Comments
     ===================================================================== */

  // A sticky note in a recipe margin. kind: 'why' (helps), 'what' (repeats the step), 'old' (out of date)
  const sticky = (x, y, w, lines, kind) => {
    const fill = kind === 'why' ? P.okT : kind === 'old' ? P.dangerT : P.warnT;
    return box(x, y, w, 22 + lines.length * 20, fill, 6) +
      lines.map((l, i) => T(x + 12, y + 27 + i * 20, l, { s: 13, w: 700, a: 'start' })).join('');
  };

  const ideaPic = svg(600, 290, 'A page from a recipe book. The steps say what to do. In the margin, three notes. "Grandma used less sugar: the oven runs hot" explains why, and helps. "Bake the cake" only repeats step 3, so it is noise. "Bake 30 min" disagrees with the step, which now says 25 minutes, so it is out of date and misleads.',
    box(14, 14, 572, 262, P.paper2, 16) +
    T(34, 50, "Grandma's sponge cake", { s: 18, a: 'start' }) +
    T(34, 92, '1. Beat 3 eggs with 200 g sugar', { s: 13.5, w: 700, f: P.ink2, a: 'start' }) +
    T(34, 124, '2. Fold in 200 g flour', { s: 13.5, w: 700, f: P.ink2, a: 'start' }) +
    T(34, 156, '3. Bake at 180 °C for 25 minutes', { s: 13.5, w: 700, f: P.ink2, a: 'start' }) +
    `<line x1="300" y1="26" x2="300" y2="262" stroke="${P.danger}" stroke-width="2" opacity="0.5"/>` +
    sticky(316, 30, 252, ['Grandma used less sugar:', 'the oven runs hot.'], 'why') +
    T(560, 104, 'WHY: helps', { s: 12, f: P.ok, a: 'end' }) +
    sticky(316, 118, 252, ['Bake the cake.'], 'what') +
    T(560, 178, 'repeats step 3: noise', { s: 12, f: P.warn, a: 'end' }) +
    sticky(316, 192, 252, ['Bake 30 min.'], 'old') +
    T(560, 252, 'out of date: it lies', { s: 12, f: P.danger, a: 'end' }) +
    T(34, 220, 'The steps say what to do.', { s: 13, w: 700, f: P.ink2, a: 'start' }) +
    T(34, 244, 'A good note says why.', { s: 13, f: P.ok, a: 'start' }));

  // Anatomy of a line with a comment at the end.
  const anatomyPic = svg(600, 120, 'The line ben_protein_g = 140, two spaces, then # per day, not per meal. Python runs the part before the hash. From the hash to the end of the line, Python skips everything.',
    box(14, 14, 572, 52, '#15132B', 10) +
    T(30, 47, 'ben_protein_g = 140', { s: 15, m: true, f: '#ECEAFF', a: 'start' }) +
    T(219, 47, '# per day, not per meal', { s: 15, m: true, f: '#9A96CC', a: 'start' }) +
    `<path d="M30 78 h170" stroke="${P.accent}" stroke-width="4" stroke-linecap="round"/>` +
    `<path d="M219 78 h207" stroke="${P.warn}" stroke-width="4" stroke-linecap="round"/>` +
    T(115, 104, 'Python runs this', { s: 13, f: P.accent }) +
    T(322, 104, 'Python skips this, to the end of the line', { s: 13, f: P.warn }));

  const coach = [
    '# Kitchen Coach: tonight\'s targets',
    'ana_carbs_g = 300',
    'ben_protein_g = 140  # per day, spread over 4 meals',
    '',
    '# Long run on Sunday: Ana needs more carbs on Saturday.',
    'ana_carbs_g = ana_carbs_g + 80',
    '',
    'print("Ana\'s carbs:", ana_carbs_g, "g")',
    'print("Ben\'s protein:", ben_protein_g, "g")',
    'print("Chloe: Table #3")  # by the window'
  ];
  const codePic = `<div style="width:100%;min-width:0">${anatomyPic}${run(coach, { title: 'kitchen_coach.py' })}</div>`;

  const liar = [
    'TAX_RATE = 0.09  # 8% city sales tax',
    'groceries_dollars = 60',
    'total_dollars = groceries_dollars * (1 + TAX_RATE)',
    'print("Groceries:", groceries_dollars)',
    'print("With tax:", round(total_dollars, 2))'
  ];
  const noise = [
    '# set guests to 3',
    'guests = 3',
    '# set protein to 140',
    'ben_protein_g = 140',
    '# add 20 to protein',
    'ben_protein_g = ben_protein_g + 20',
    '# print the protein',
    'print(ben_protein_g)'
  ];
  const painPic = `<div style="width:100%;min-width:0">` +
    code(liar, { title: 'groceries.py, March', bad: [1] }) +
    svg(600, 96, 'A sticky note saying 8% tax next to a jar labelled TAX_RATE that holds 0.09. They disagree. Someone believes the note and changes 0.09 back to 0.08, and every bill is now too low.',
      box(20, 14, 150, 64, P.tint, 14) + T(95, 40, 'TAX_RATE', { s: 12.5, m: true, f: P.ok }) + T(95, 66, '0.09', { s: 18, m: true, f: P.accent }) +
      box(196, 22, 110, 48, P.warnT, 6) + T(251, 52, '8% tax', { s: 16 }) +
      `<ellipse cx="251" cy="46" rx="70" ry="38" fill="none" stroke="${P.danger}" stroke-width="3"/>` +
      arrow(330, 46, 372, 46, P.danger, 2.5) +
      box(380, 18, 200, 56, P.dangerT, 12) + T(480, 42, '"fixed" to 0.08', { s: 13.5, m: true, f: P.danger }) + T(480, 62, 'every bill too low', { s: 12, w: 700, f: P.ink2 })) +
    code(noise, { title: 'too_many_notes.py', bad: [1, 3, 5, 7] }) + `</div>`;

  const debugLines = [
    'ana_carbs_g = 300',
    'print("DEBUG ana_carbs_g is", ana_carbs_g)',
    '',
    '# Long run on Sunday: Ana needs more carbs on Saturday.',
    'ana_carbs_g = ana_carbs_g + 80',
    '',
    '# TODO: ask Chloe about nuts before Friday',
    'print("Ana\'s carbs:", ana_carbs_g, "g")',
    'print("Chloe\'s dessert: rice pudding")'
  ];

  const catchPic = `<div style="width:100%;min-width:0">` +
    code(['x = 140  # Ben\'s protein target, in grams per day'], { title: 'before: a note to explain a vague name', bad: [1] }) +
    code(['ben_protein_target_g = 140  # per day, not per meal'], { title: 'after: the name explains itself', good: [1] }) +
    code(['"""This looks like a note, but it is a text value."""', 'print("Ana: pasta")'], { title: 'not a comment' }) + `</div>`;

  COURSE.add({
    id: 'l17', minutes: 9,
    summary: 'A <b>comment</b> is a note for people. It starts with <code>#</code> and runs to the end of the line, and Python <b>skips it completely</b>. Write <b>why</b>, not what: the code already says what. Keep comments <b>true</b>: when the code changes, change the note. A <code>#</code> in front of a line also <b>switches it off</b>.',
    video: {
      src: 'videos/l17-comments.mp4', poster: 'videos/l17-comments.jpg', length: '1 min 9 s',
      script: [
        'Open grandma\'s recipe book. In the margin, a note. Use less sugar, the oven runs hot. The recipe says what to do. The note says why.',
        'Python has margin notes too. They start with a hash sign. Python skips everything from the hash to the end of the line.',
        'Ben\'s protein goes up by 20. One note says, add 20. The code already says that. Peel it off. The other note says, Ben trains on Mondays, so he needs 20 grams more. That one stays.',
        'Then the tax goes up. The jar now holds 0.09, but the note still says 8 percent. Someone believes the note and changes the number back. A note that lies is worse than no note. When the code changes, change the note.',
        'A hash can also switch a line off. Put one in front of a print, and it goes quiet. Take it away, and it runs again.',
        'Write why, not what. And keep every note true.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Notes in the margin of a recipe book.',
        text: [
          'Open an old family recipe book. Next to the steps, someone wrote notes in the margin. The best one says <b>why</b>: "Grandma used less sugar, because her oven runs hot." The steps could never tell you that.',
          'Some notes are useless. "Bake the cake" next to step 3 only <b>repeats</b> the step. Some are worse: an old sticky note says "bake 30 min", but the step was changed to 25. That note is <b>out of date</b>, and it misleads.',
          'Code has margin notes too. They are called <b>comments</b>. They are written for people, never for Python.'
        ],
        tip: 'In lesson 12 you saw that <b>a good name removes the need for a note</b>. Names come first. Comments are for what a name cannot say, like a reason.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'A comment starts with # and ends at the end of the line.',
        text: [
          'A comment starts with a <b>hash</b> sign <code>#</code>. From the <code>#</code> to the end of that line, Python <b>skips everything</b>. It never runs, and it never shows up in the output.',
          'A comment can sit on <b>its own line</b>, above the code it explains, like line 5. Or it can sit at the <b>end of a line</b>, like line 3. Python\'s style guide, PEP 8, asks for <b>two spaces</b> before an end-of-line <code>#</code>, and one space after it.',
          'A <code>#</code> <b>inside quotes</b> is not a comment. On line 10, <code>"Chloe: Table #3"</code> is text, so Python prints the <code>#3</code>. The comment only starts at the second <code>#</code>, outside the quotes.',
          'Press <b>Run</b>. Ten lines of code, three lines of output. The comments changed nothing. Then put a <code>#</code> at the very start of line 6 and run again. Ana\'s carbs drop back to 300, because Python now skips that line.'
        ],
        tip: 'Good comments say <b>why</b>: why Ana eats more carbs on Saturday, why Ben\'s 140 g is per day. They also say the <b>unit or the source</b> of a number when a name cannot carry it: <code># 9% city sales tax, from the March receipt</code>.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'A note that lies, and a wall of notes that say nothing.',
        text: [
          'Pain number 1: <b>a comment that lies</b>. In January the tax was 8%. In March it went up to 9%. Someone changed the number to <code>0.09</code>, but not the note. Python does not read comments, so it never notices.',
          'Next month a friend reads the file, trusts the note, and "fixes" the number back to <code>0.08</code>. Every bill is now too low. No error, just a wrong total. The lying note <b>caused</b> the bug.',
          'Pain number 2: <b>what-comments</b>. In <code>too_many_notes.py</code>, every comment repeats the line under it. <code># add 20 to protein</code> says exactly what <code>+ 20</code> says. Half the file is noise, and the real code is harder to find.'
        ],
        warn: 'A missing note makes the reader think. A wrong note makes them believe something false. <b>A comment that lies is worse than no comment.</b>'
      },
      {
        label: 'The fix', pic: run(liar, { title: 'groceries.py' }),
        h: 'Write why, and keep it true.',
        text: [
          'Press <b>Run</b>. 60 dollars plus 9% tax is <code>65.4</code>. The number is right. The <b>note</b> is wrong.',
          'Fix it: change <code>8%</code> to <code>9%</code> in the comment on line 1. Run again. The output is <b>exactly the same</b>, because Python never read the comment. But the next person will not "fix" a number that was right.',
          'The rule: <b>when the code changes, update the comment or delete it.</b> Treat a comment as part of the code. And before you write one, ask: does it say <b>why</b>? If it only says what the line does, leave it out.'
        ],
        tip: 'Kitchen test: would this note help a friend cooking from your recipe book? "Ben trains on Mondays, so he needs 20 g more" helps. "add 20" next to <code>+ 20</code> does not.'
      },
      {
        label: 'Try it', pic: run(debugLines, { title: 'kitchen_coach.py' }),
        h: 'Switch a line off, and back on.',
        text: [
          'Press <b>Run</b>. The <code>DEBUG</code> line was only there to check the jar while you built the program. Put a <code>#</code> at the very start of line 2 and run again. The line goes quiet. That is called <b>commenting out</b> a line.',
          'Now comment out line 5 too. Ana\'s carbs show 300. Take both <code>#</code> signs away, and both lines run again.',
          'In VS Code you do not have to type the <code>#</code>. Click on a line, or select several, and press <b>Cmd + /</b> on a Mac or <b>Ctrl + /</b> on Windows and Linux. Press it again to switch the lines back on.',
          'Line 7 is a <b>TODO</b> note: a reminder of a job still to do. Programmers start these with <code>TODO</code> so they are easy to search for.'
        ],
        warn: 'Commented-out code is for a <b>short test</b>, not for keeping. Left for weeks, nobody remembers if it still works or why it is there, and it rots. Delete it. If you ever need it back, version control remembers old versions for you: lesson 93, Git for Python projects.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'The best comment is often a better name.',
        text: [
          'Before you write a comment, try to make it unneeded. <code>x = 140  # Ben\'s protein target, in grams per day</code> needs its note, because <code>x</code> says nothing. Rename the jar to <code>ben_protein_target_g</code>, as in lesson 12, and most of the note can go.',
          'What stays is the part no name can carry: "per day, not per meal". A <b>reason</b> or a surprise is what a comment is for.',
          'One more look-alike. Text between <b>three quote marks</b>, <code>"""like this"""</code>, is not a comment. It is a text value that Python creates and then ignores when you do not use it. Its real job comes in lesson 48, Docstrings, the note at the top of a recipe card.'
        ],
        warn: 'Do not use comments to excuse confusing code. If a line needs three lines of explanation, first try clearer names or a simpler line. Then explain only what is still surprising.'
      }
    ],
    exercises: [
      {
        file: 'l17_margin_notes.py', title: 'Margin notes for Kitchen Coach',
        task: 'A Kitchen Coach program works, but its notes need care. <b>Job a:</b> write a comment that says <b>why</b> Ana\'s carbs go up. <b>Job b:</b> switch off the <code>DEBUG</code> line with a <code>#</code>. <b>Job c:</b> fix the tax note that lies. The file checks your notes and the output when you run it.',
        steps: [
          'Press <b>Open in VS Code</b>. If nothing happens, open VS Code yourself and use File, Open to find the path shown below.',
          'Read the three jobs at the top of the file. Make all three changes between the <code>START</code> and <code>END</code> lines. Only change comments: the code itself stays the same.',
          'For job b, click on the DEBUG line and press <b>Cmd + /</b> (Mac) or <b>Ctrl + /</b> (Windows, Linux). Save the file.',
          'Run it with the Run button at the top right of VS Code. At the bottom you see <code>PASS</code> or a hint that tells you which job to look at next.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does this program show?',
        pic: code(['# Seat the guests', 'print("Chloe: Table #3")  # by the window', '# print("Ana: Table #1")'], { title: 'tables.py' }),
        options: ['Chloe: Table #3', 'Chloe: Table', 'Chloe: Table #3  # by the window', 'Chloe: Table #3 and Ana: Table #1'],
        answer: 0,
        why: 'Line 1 and line 3 are comments, so Python skips them. On line 2 the first <code>#</code> is inside quotes, so it is text and gets printed. The comment starts at the second <code>#</code>.',
        hint: 'Is the # inside the quote marks or outside them?'
      },
      {
        type: 'bucket', q: 'Sort the comments. Which ones earn their place?',
        buckets: ['Useful', 'Noise'],
        items: [
          ['# Ben trains on Mondays, so he needs 20 g more', 0],
          ['# 9% city sales tax, from the March receipt', 0],
          ['# TODO: ask Chloe about nuts', 0],
          ['# per day, not per meal', 0],
          ['# add 20', 1],
          ['# print the menu', 1],
          ['# set guests to 3', 1]
        ],
        why: 'A useful comment tells you something the code cannot: a reason, a source, a unit, or a job still to do. A noise comment repeats what the line already says.',
        hint: 'Could you learn this by reading the line of code under it?'
      },
      {
        type: 'fix', q: 'The <code>DEBUG</code> line was only for testing. Switch it off with a <code>#</code>, so the program prints just the two dishes.',
        code: ['print("Ana: pasta")', 'print("DEBUG carbs:", 380)', 'print("Ben: bean chili")'],
        title: 'menu.py',
        check: [
          'if out == "Ana: pasta\\nBen: bean chili":',
          '    ok = True',
          'elif "DEBUG" in out:',
          '    msg = "The DEBUG line still runs. Put a # at the very start of line 2, before the word print."',
          'else:',
          '    msg = "It should print exactly two lines: Ana: pasta, then Ben: bean chili. It printed: " + out'
        ].join('\n'),
        why: 'A <code>#</code> at the start of the line turns the whole line into a comment, so Python skips it. In VS Code, Cmd + / or Ctrl + / does the same.',
        hint: 'Put the # in front of print on line 2. Leave the other lines alone.'
      },
      {
        type: 'pick', q: 'The tax really is 9% now. What should you change?',
        pic: code(['TAX_RATE = 0.09  # 8% city sales tax'], { title: 'groceries.py', bad: [1] }),
        options: ['The comment: make it say 9%', 'The number: make it 0.08', 'Nothing: Python ignores comments, so it does not matter', 'Delete the line'],
        answer: 0,
        why: 'The number is right and the note is wrong. Python ignores the note, but people do not. Left alone, it invites someone to "fix" 0.09 back to 0.08.',
        hint: 'Which one matches the real tax?'
      },
      {
        type: 'pick', q: 'Back to lesson 12. This comment explains a vague name. What is the best change?',
        pic: code(['x = 140  # Ben\'s protein target in grams'], { title: 'targets.py' }),
        options: ['Rename x to ben_protein_target_g and drop the note', 'Make the comment longer', 'Rename x to bptg', 'Move the comment to its own line above'],
        answer: 0,
        why: 'A good name removes the need for a note. <code>ben_protein_target_g</code> says who, what and the unit. <code>bptg</code> is a riddle that only its writer can solve.',
        hint: 'Lesson 12: a good label says what is inside, and how it is measured.'
      },
      {
        type: 'type', q: 'Comment out this line, so Python skips it: <code>print("DEBUG")</code>. Type the whole new line.',
        prompt: 'line 2 >',
        answers: ['# print("DEBUG")', '#print("DEBUG")'],
        why: 'A <code>#</code> at the start turns the whole line into a comment. One space after the <code>#</code> is the usual style, but Python accepts both.',
        hint: 'Put a # in front, and keep the rest of the line the same.'
      },
      {
        type: 'pick', q: 'You commented out an old version of a line three months ago. It is still sitting in the file. What should you do?',
        options: ['Delete it. Version control can bring old code back', 'Keep it forever, just in case', 'Remove the # so it runs again', 'Add a comment above it saying "old code"'],
        answer: 0,
        why: 'Commented-out code rots: nobody knows if it still works or why it is there. Delete it. Lesson 93, Git for Python projects, shows how old versions are saved for you.',
        hint: 'Commenting out is for a short test.'
      },
      {
        type: 'pick', q: 'Which of these is a comment?',
        options: ['# 18 km run on Sunday', '"""18 km run on Sunday"""', 'print("# 18 km run on Sunday")', '"18 km run on Sunday"'],
        answer: 0,
        why: 'Only a <code>#</code> outside quotes starts a comment. Three quote marks make a text value, not a comment, and a <code>#</code> inside quotes is just a character in the text.',
        hint: 'Where does the # sit: inside quote marks or outside?'
      }
    ]
  });
})();
