/* Lesson 5: How this course works (module 0). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l05  How this course works
     ===================================================================== */

  // Kitchen Coach, the little robot cook (same drawing as lesson 1, smaller).
  const coach = (x, y, k) => {
    k = k || 1;
    const s = n => n * k;
    return `<g transform="translate(${x} ${y})">` +
      `<path d="M${s(-22)} ${s(-26)} q${s(-12)} ${s(-18)} ${s(6)} ${s(-26)} q${s(10)} ${s(-16)} ${s(32)} ${s(-4)} q${s(20)} ${s(-4)} ${s(16)} ${s(16)} q${s(4)} ${s(8)} ${s(-10)} ${s(14)} z" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>` +
      `<rect x="${s(-30)}" y="${s(-24)}" width="${s(60)}" height="${s(50)}" rx="${s(12)}" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
      `<circle cx="${s(-11)}" cy="0" r="${s(4.5)}" fill="${P.ink}"/><circle cx="${s(11)}" cy="0" r="${s(4.5)}" fill="${P.ink}"/>` +
      `<path d="M${s(-10)} ${s(13)} q${s(10)} ${s(9)} ${s(20)} 0" fill="none" stroke="${P.ink}" stroke-width="2.5" stroke-linecap="round"/>` +
      `<rect x="${s(-24)}" y="${s(30)}" width="${s(48)}" height="${s(34)}" rx="${s(8)}" fill="${P.accent}" stroke="${P.ink}" stroke-width="2.5"/>` +
      `<circle cx="0" cy="${s(47)}" r="${s(6)}" fill="${P.white}" stroke="${P.ink}" stroke-width="2"/></g>`;
  };

  /* ---- The idea: a cooking class loop ---- */
  const icons = [
    // watch: a small screen with a play button
    (cx, cy) => `<rect x="${cx - 26}" y="${cy - 18}" width="52" height="36" rx="6" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/><path d="M${cx - 6} ${cy - 9} L${cx + 10} ${cy} L${cx - 6} ${cy + 9} z" fill="${P.accent}"/>`,
    // taste: a spoon
    (cx, cy) => `<ellipse cx="${cx - 12}" cy="${cy - 6}" rx="13" ry="10" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/><path d="M${cx} ${cy} L${cx + 26} ${cy + 14}" stroke="${P.ink}" stroke-width="5" stroke-linecap="round"/>`,
    // cook: a pan
    (cx, cy) => `<path d="M${cx - 26} ${cy - 6} h40 v8 q0 14 -14 14 h-12 q-14 0 -14 -14 z" fill="${P.danger}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/><path d="M${cx + 14} ${cy - 2} h16" stroke="${P.ink}" stroke-width="5" stroke-linecap="round"/><path d="M${cx - 14} ${cy - 12} q-4 -6 0 -12 M${cx - 4} ${cy - 12} q-4 -6 0 -12" fill="none" stroke="${P.mute}" stroke-width="2.5" stroke-linecap="round"/>`,
    // feedback: a check mark
    (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="19" fill="${P.ok}" stroke="${P.ink}" stroke-width="2.5"/><path d="M${cx - 9} ${cy + 1} l6 7 l12 -14" fill="none" stroke="${P.white}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`
  ];
  const steps = [
    ['Watch the chef', 'the video', P.tint],
    ['Taste as you go', 'the Run button', P.warnT],
    ['Cook it yourself', 'the quiz', P.dangerT],
    ['Get feedback', 'the exercise', P.okT]
  ];
  const loopPic = svg(600, 300, 'A cooking class in four steps: watch the chef is the video, taste as you go is the Run button, cook it yourself is the quiz, get feedback is the exercise. An arrow goes back to the start for the next lesson.',
    T(300, 26, 'A COOKING CLASS, AND THIS COURSE', { s: 12.5, f: P.ink2 }) +
    steps.map(([k, c, col], i) => {
      const x = 10 + i * 150, cx = x + 60;
      return box(x, 44, 120, 170, col, 16) +
        `<circle cx="${x + 20}" cy="64" r="12" fill="${P.ink}"/>` + T(x + 20, 69, String(i + 1), { s: 12.5, f: P.white }) +
        icons[i](cx, 104) +
        T(cx, 156, k.split(' ').slice(0, 2).join(' '), { s: 13.5 }) +
        T(cx, 174, k.split(' ').slice(2).join(' '), { s: 13.5 }) +
        `<line x1="${x + 14}" y1="186" x2="${x + 106}" y2="186" stroke="${P.ink}" stroke-width="1.5" stroke-dasharray="3 4"/>` +
        T(cx, 204, c, { s: 12.5, f: P.accent }) +
        (i < 3 ? arrow(x + 122, 129, x + 148, 129, P.ink, 2.5) : '');
    }).join('') +
    `<path d="M520 222 C520 268 470 276 300 276 C130 276 80 268 80 230" fill="none" stroke="${P.accent}" stroke-width="3" stroke-dasharray="8 7" stroke-linecap="round"/>` +
    `<path d="M80 222 l-8 14 h16 z" fill="${P.accent}"/>` +
    box(196, 260, 208, 32, P.white, 10) + T(300, 281, 'then the next lesson', { s: 12.5, f: P.accent }));

  /* ---- The code: a playground ---- */
  const playground = [
    'print("Kitchen Coach, day 1")',
    'print("Cook: Sam")',
    'print("Practice: 20 minutes a day")',
    'print("First meal to plan: Ana")'
  ];

  /* ---- The pain: one small slip ---- */
  const slip = [
    'print("My practice plan")',
    'print("Monday: 20 minutes")',
    'print("Tuesday: 20 minutes"',
    'print("Wednesday: 20 minutes")'
  ];

  /* ---- The fix: five habits ---- */
  const habits = [
    ['Type it, do not paste it', 'your fingers learn it, your eyes catch every quote'],
    ['Break it on purpose', 'you meet each error while it is small and safe'],
    ['A little every day', '20 minutes daily beats 3 hours on a Sunday'],
    ['Say it in your own words', 'if you can explain it, you really know it'],
    ['Keep a mistakes notebook', 'the same slip never costs you twice']
  ];
  const habitsPic = svg(600, 330, 'Five study habits with the reason for each: type code yourself, break it on purpose, practise a little every day, explain the idea in your own words, keep a mistakes notebook.',
    T(300, 24, 'FIVE HABITS, AND WHY THEY WORK', { s: 12.5, f: P.ink2 }) +
    habits.map(([h, why], i) => {
      const y = 40 + i * 58;
      return box(14, y, 216, 44, i % 2 ? P.white : P.tint, 12) +
        `<circle cx="38" cy="${y + 22}" r="12" fill="${P.ink}"/>` + T(38, y + 27, String(i + 1), { s: 12.5, f: P.white }) +
        T(58, y + 27, h, { s: 12.5, a: 'start' }) +
        arrow(238, y + 22, 262, y + 22, P.accent, 2.5) +
        T(270, y + 27, why, { s: 12.5, w: 700, f: P.ink2, a: 'start' });
    }).join(''));

  /* ---- Try it: the road to Kitchen Coach ---- */
  const stops = [
    ['Start here', 'prints a menu'],
    ['Values', 'remembers numbers'],
    ['Decisions, loops', 'serves each guest'],
    ['Collections', 'keeps the pantry'],
    ['Functions', 'reuses recipe cards'],
    ['Files, errors', 'saves the pantry'],
    ['Classes', 'one template a friend'],
    ['Pythonic', 'short, clear code'],
    ['Pro tools', 'taste-tests itself'],
    ['Advanced', 'runs fast'],
    ['Projects', 'plans every meal']
  ];
  const stopXY = i => {
    const row = Math.floor(i / 4), col = i % 4;
    const x = row === 1 ? 515 - col * 145 : 80 + col * 145;
    return [x, 92 + row * 128];
  };
  const roadPath = 'M80 92 H515 C600 92 600 220 515 220 H80 C-5 220 -5 348 80 348 H370';
  const halo = t => t.replace('<text ', `<text paint-order="stroke" stroke="${P.paper2}" stroke-width="6" stroke-linejoin="round" `);
  const roadPic = svg(600, 440, 'A road map of the 11 modules. Kitchen Coach starts at module 0 printing a menu, then learns to remember numbers, serve each guest, keep the pantry, reuse recipe cards, save the pantry, use templates, write short clear code, taste-test itself, run fast, and finally plans every meal.',
    T(300, 24, 'THE ROAD: 11 MODULES, ONE GROWING APP', { s: 12.5, f: P.ink2 }) +
    `<path d="${roadPath}" fill="none" stroke="${P.sand}" stroke-width="18" stroke-linecap="round"/>` +
    `<path d="${roadPath}" fill="none" stroke="${P.ink}" stroke-width="2" stroke-dasharray="6 8"/>` +
    stops.map(([name, can], i) => {
      const [x, y] = stopXY(i), here = i === 0, end = i === 10;
      return `<circle cx="${x}" cy="${y}" r="17" fill="${here ? P.accent : end ? P.ok : P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
        T(x, y + 5, String(i), { s: 13, f: here || end ? P.white : P.ink }) +
        halo(T(x, y + 38, name, { s: 12.5 })) +
        halo(T(x, y + 55, can, { s: 12, w: 700, f: end ? P.ok : P.accent }));
    }).join('') +
    coach(70, 30, 0.42) + box(96, 36, 92, 26, P.white, 8) + T(142, 54, 'you are here', { s: 12, f: P.accent }) +
    box(436, 330, 146, 36, P.okT, 10) + T(509, 353, 'Kitchen Coach!', { s: 13, f: P.ok }) +
    T(300, 432, 'Each module ends with a review lesson that mixes everything.', { s: 12.5, w: 700, f: P.ink2 }));

  /* ---- The catch: reading is not cooking ---- */
  const catchPic = svg(600, 230, 'Left: a cookbook read ten times, and still no dinner. Right: a pan, cooked once, and now you know how.',
    T(150, 26, 'READ ABOUT IT', { s: 12.5, f: P.danger }) + T(450, 26, 'COOK IT', { s: 12.5, f: P.ok }) +
    `<line x1="300" y1="16" x2="300" y2="222" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    // open book
    `<path d="M70 70 q40 -14 78 0 v96 q-38 -14 -78 0 z" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>` +
    `<path d="M148 70 q40 -14 78 0 v96 q-38 -14 -78 0 z" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>` +
    [88, 104, 120, 136].map(y => `<path d="M82 ${y} h54 M160 ${y} h54" stroke="${P.sand}" stroke-width="5" stroke-linecap="round"/>`).join('') +
    box(186, 46, 70, 28, P.warnT, 8) + T(221, 66, 'read x10', { s: 12 }) +
    box(60, 184, 180, 32, P.dangerT, 10) + T(150, 205, 'still no dinner', { s: 13, f: P.danger }) +
    // pan with food
    `<path d="M370 104 h120 v18 q0 34 -34 34 h-52 q-34 0 -34 -34 z" fill="${P.danger}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>` +
    `<path d="M490 116 h50" stroke="${P.ink}" stroke-width="8" stroke-linecap="round"/>` +
    `<ellipse cx="430" cy="104" rx="52" ry="10" fill="${P.warnT}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<path d="M404 84 q-6 -10 0 -20 M430 84 q-6 -10 0 -20 M456 84 q-6 -10 0 -20" fill="none" stroke="${P.mute}" stroke-width="3" stroke-linecap="round"/>` +
    `<circle cx="532" cy="70" r="20" fill="${P.ok}" stroke="${P.ink}" stroke-width="2.5"/><path d="M522 71 l7 8 l13 -16" fill="none" stroke="${P.white}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>` +
    box(340, 184, 220, 32, P.okT, 10) + T(450, 205, 'cooked once: now you know', { s: 13, f: P.ok }));

  COURSE.add({
    id: 'l05', minutes: 9,
    summary: 'This course is a <b>cooking class</b>, not a cookbook. You <b>watch</b> the video, <b>taste</b> by running and changing code, <b>cook</b> it yourself in the quiz, and get <b>feedback</b> from the exercise. Reading alone never made anyone a cook.',
    video: {
      src: 'videos/l05-how-this-course-works.mp4', poster: 'videos/l05-how-this-course-works.jpg', length: '1 min 5 s',
      script: [
        'Learning to code is like a cooking class. You watch the chef. You taste. You cook it yourself. And you get feedback.',
        'This course works the same way. Every lesson starts with a 1 minute video. That is watching the chef.',
        'Every code box has a Run button. Press it, then change something and run it again. That is tasting. You cannot break anything. Reset brings it all back.',
        'Next comes the quiz. You drag, type, and fix real code. That is cooking it yourself.',
        'Last, an exercise in VS Code. Run it, read the hint, fix it, until it says pass. That is your feedback.',
        'Lesson by lesson, Kitchen Coach grows. First it prints a menu. Then it remembers, decides, and saves. In the end, it plans every meal for Ana, Ben and Chloe.',
        'But reading about cooking never made anyone a cook. Cooking did.',
        'So press Run, and cook.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: loopPic,
        h: 'A cooking class, not a cookbook.',
        text: [
          'In a good cooking class you <b>watch</b> the chef, you <b>taste</b> as you go, you <b>cook</b> the dish yourself, and the chef gives you <b>feedback</b>. Every lesson here works the same way:',
          '1. <b>Watch the one-minute video</b> first. It shows the whole idea in one story, so the rest of the page makes sense.',
          '2. <b>Read the pictures</b> and the short parts under them. Each part is one small step.',
          '3. <b>Press Run</b> on every code box, then <b>change something</b> and run it again.',
          '4. <b>Answer the quiz</b>. You drag, type, and fix real code.',
          '5. <b>Do the exercise</b> in VS Code. Run it, read the hint, fix it, until it says <code>PASS</code>.'
        ],
        tip: 'Ana, Ben and Chloe are still coming to dinner. Lesson by lesson, <b>Kitchen Coach</b> grows: the app you build to plan their meals.'
      },
      {
        label: 'The code', pic: run(playground, { title: 'kitchen_coach.py' }),
        h: 'Every code box is a real kitchen.',
        text: [
          'This box runs real Python, right here in the page. Press <b>Run</b> first and read the output. Then try these three changes, one at a time, and press Run after each:',
          '1. Put <b>your own name</b> in place of <code>Sam</code>.',
          '2. Copy line 4 to a new line 5, and change it to plan <b>Ben\'s</b> meal next.',
          '3. Move the <b>last line to the top</b>. Did the output change order too?',
          'Made a mess? That is fine. Press <b>Reset</b> and the box goes back to how it started.'
        ],
        tip: 'You cannot break anything here. The box only runs inside this page. It cannot touch your files or your computer.'
      },
      {
        label: 'The pain', pic: run(slip, { title: 'plan.py' }),
        h: 'Code you only read hides its traps.',
        text: [
          'This plan has one small slip in it. Read it slowly first. Can you spot it without running it? Most people cannot. Our eyes skip small things like a <b>missing bracket</b>.',
          'Now press <b>Run</b>. Python does not print even the first line. It reads the <b>whole file</b> before it cooks anything, and line 3 opens a bracket <code>(</code> that never closes.',
          'Read the last line of the error: <code>SyntaxError: \'(\' was never closed</code>. Add the <code>)</code> at the end of line 3 and run it again.'
        ],
        warn: 'If you only read code, you never meet these slips. Then the first time you meet one is in your own program, alone. Meet them here, where it is safe.'
      },
      {
        label: 'The fix', pic: habitsPic,
        h: 'Five habits that turn a beginner into a pro.',
        text: [
          '<b>Type the code yourself</b>, even when you could copy it. Your fingers learn where the brackets and quote marks go, and you notice details that reading skips.',
          '<b>Make mistakes on purpose.</b> Delete a quote mark, misspell <code>print</code>, and read the error. An error you have seen before is not scary.',
          '<b>A little every day</b> beats a lot once a week. Your brain sorts out what you learned while you sleep, so 20 minutes a day sticks better than 3 hours on Sunday.',
          '<b>Explain it in your own words</b>, out loud or on paper. If you get stuck explaining, you found the part to read again.',
          '<b>Keep a mistakes notebook.</b> One line per slip: what you did, what the error said, the fix. Read it back once a week.'
        ]
      },
      {
        label: 'Try it', pic: roadPic,
        h: 'Make your plan for the road ahead.',
        text: [
          'The course has <b>11 modules</b>. In each one, Kitchen Coach learns something new, from printing a menu to planning every meal for Ana, Ben and Chloe.',
          'Each module ends with a <b>review lesson</b>. It has no new idea, only mixed questions from every lesson in that module. Lesson 18 is the first one.',
          'Now make your own plan. Open the exercise below and fill in three blanks: your name, how many minutes a day you will practise, and whose meal Kitchen Coach should plan first.'
        ],
        tip: 'The moon button in the top bar switches between a light and a dark page. Your progress is saved <b>in this browser</b>. Another browser or another device starts fresh.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Reading about cooking does not make you a cook.',
        text: [
          'You can read a cookbook ten times and still burn the rice. You learn to cook by <b>cooking</b>: the real heat, the real mistakes, the real taste.',
          'Code is the same. A lesson you only read feels easy, and it is gone in a week. A lesson you <b>ran, changed and broke</b> stays with you.',
          'So when a page says press Run, press Run. When it says change something, change something. That is the whole trick.'
        ],
        warn: 'Feeling "I get it" while reading is not the same as being able to do it. The quiz and the exercise show you which one you have.'
      }
    ],
    exercises: [
      {
        file: 'l05_my_plan.py', title: 'My practice plan, in VS Code',
        task: 'Fill in <b>three blanks</b>: your name, how many <b>minutes a day</b> you will practise (a number from 5 to 180), and which friend\'s meal Kitchen Coach should plan first (<b>Ana, Ben or Chloe</b>). The file checks your plan when you run it.',
        steps: [
          'Press <b>Open in VS Code</b>. If nothing happens, open VS Code yourself and use File, Open to find the path shown below.',
          'Between the <code>START</code> and <code>END</code> lines, type <b>between the quote marks</b> on each line, like <code>my_name = "Sam"</code>. Keep the quote marks. Save the file.',
          'Run it. At the bottom you see <code>PASS</code> or a hint that tells you what to change.',
          'What these three lines really are is lesson 11, Variables. For now they are just blanks to fill in.'
        ]
      }
    ],
    quiz: [
      {
        type: 'order', q: 'Put the steps of a lesson in the order this course suggests.',
        items: ['Watch the one-minute video', 'Read the pictures and short parts', 'Press Run and change the code', 'Answer the quiz', 'Do the exercise in VS Code'],
        why: 'Watch the chef, then taste, then cook it yourself, then get feedback. Each step builds on the one before.',
        hint: 'The video comes first, so the rest of the page makes sense. The exercise comes last.'
      },
      {
        type: 'match', q: 'Match each part of the course to its step in the cooking class.',
        pairs: [
          ['Video', 'Watch the chef cook it first'],
          ['Run button', 'Taste as you go'],
          ['Quiz', 'Cook it yourself, with help close by'],
          ['Exercise', 'Cook alone, and get feedback: PASS or a hint']
        ],
        why: 'Watch, taste, cook, feedback. The same loop in every lesson.',
        hint: 'Which one do you do in VS Code, on your own, with a check at the end?'
      },
      {
        type: 'bucket', q: 'Which habits help you learn, and which slow you down?',
        buckets: ['Helps you learn', 'Slows you down'],
        items: [
          ['Type the code yourself', 0],
          ['Copy and paste every example', 1],
          ['Practise 20 minutes every day', 0],
          ['One 3-hour session every Sunday', 1],
          ['Break the code on purpose', 0],
          ['Skip the Run button, just read', 1],
          ['Keep a mistakes notebook', 0],
          ['Explain the idea in your own words', 0]
        ],
        why: 'Typing, breaking, small daily sessions, explaining and writing down slips all make you do the work. Copying, cramming and only reading feel easy but fade fast.',
        hint: 'Ask: does this make me do the thinking, or does it only feel like learning?'
      },
      {
        type: 'pick', q: 'You changed the code in a Run box and now a red error appears. What happened?',
        options: ['Nothing bad. Read the error and fix it, or press Reset', 'You damaged your computer', 'Your progress in the course is lost', 'You have to start the lesson again'],
        answer: 0,
        why: 'The box runs only inside the page. An error is Python telling you which step it could not follow. Fix it, or press Reset to get the original code back.',
        hint: 'What does the Reset button do?'
      },
      {
        type: 'fix', q: 'This plan stops with an error. Fix it so it prints all three lines.',
        code: ['print("My week")', 'Print("Monday: 20 minutes")', 'print("Tuesday: 20 minutes")'],
        title: 'week.py',
        check: [
          'lines = out.splitlines()',
          'if lines == ["My week", "Monday: 20 minutes", "Tuesday: 20 minutes"]:',
          '    ok = True',
          'elif len(lines) != 3:',
          '    msg = "It should print exactly 3 lines. It printed " + str(len(lines)) + "."',
          'else:',
          '    msg = "Close. Keep the words inside the quotes exactly the same as before."'
        ].join('\n'),
        why: 'Python is exact about capital letters too. <code>Print</code> and <code>print</code> are two different words, and Python only knows the second one.',
        hint: 'Read the last line of the error. Python even suggests the right word. Look closely at the first letter.'
      },
      {
        type: 'pick', q: 'Back to lesson 1: you run <code>plan.py</code> and Python shows this. What is wrong, and where?',
        pic: term(['$ python3 plan.py', '  File "plan.py", line 3', '    print("Tuesday: 20 minutes"', '         ^', "SyntaxError: '(' was never closed"], 'terminal'),
        options: ['Line 3: a bracket opens and never closes', 'Line 1: print is spelled wrong', 'Line 3: the word Tuesday is not allowed', 'The whole file is broken and must be deleted'],
        answer: 0,
        why: 'Read from the bottom up. The last line names the problem: a <code>(</code> that was never closed. The line above says where: line 3.',
        hint: 'Read the last line first, then look for the word "line".'
      },
      {
        type: 'type', q: 'Type the line of Python that shows <code>I practise 20 minutes a day</code> on the screen.',
        prompt: '>>>',
        answers: ['print("I practise 20 minutes a day")'],
        why: 'Typing it yourself, brackets and quote marks included, is exactly the habit this lesson is about.',
        hint: 'print, a bracket, a quote mark, the exact words, a quote mark, a bracket.'
      },
      {
        type: 'pick', q: 'You finish this lesson on your laptop. The next day you open the course on your phone. What do you see?',
        options: ['This lesson is not marked done, because progress is saved in each browser on its own', 'This lesson is marked done, because progress follows you everywhere', 'The whole course is locked', 'An error, because phones cannot open the course'],
        answer: 0,
        why: 'Progress is saved in the browser you use, and nowhere else. Use the same browser on the same device to keep your place.',
        hint: 'Where does the course say your progress is saved?'
      }
    ]
  });
})();
