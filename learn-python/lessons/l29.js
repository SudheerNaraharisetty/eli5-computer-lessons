/* Lesson 29: Nested loops (module 2). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l29  Nested loops
     ===================================================================== */

  const GUESTS = [['Ana', P.accent], ['Ben', P.ok], ['Chloe', P.danger]];
  const COURSES = ['starter', 'main', 'dessert'];

  // The service grid: one row per guest, one column per course, a numbered plate in serving order.
  const ideaPic = svg(600, 320, 'A grid with a row for Ana, Ben and Chloe and a column for starter, main and dessert. The plates are numbered in serving order: Ana gets plates 1, 2 and 3, then Ben gets 4, 5 and 6, then Chloe gets 7, 8 and 9. The outer loop moves down to the next guest. The inner loop moves across every course.',
    T(372, 22, 'inner loop: every course, left to right', { s: 13, w: 700, f: P.ink2 }) +
    arrow(190, 36, 556, 36, P.accent, 2.5) +
    COURSES.map((c, j) => T(250 + j * 120, 62, c, { s: 14, f: P.ink2 })).join('') +
    GUESTS.map(([g, col], i) => {
      const y = 76 + i * 66;
      return box(96, y, 96, 52, P.white, 26) + T(144, y + 32, g, { s: 15, f: col }) +
        COURSES.map((c, j) => {
          const x = 250 + j * 120, n = i * 3 + j + 1;
          return `<circle cx="${x}" cy="${y + 26}" r="25" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
            `<circle cx="${x}" cy="${y + 26}" r="15" fill="${P.warnT}" stroke="${P.warn}" stroke-width="2"/>` +
            T(x, y + 31, String(n), { s: 14, f: P.ink });
        }).join('') +
        (i < 2 ? `<path d="M${490 + 22} ${y + 40} q40 20 -260 46" fill="none" stroke="${P.mute}" stroke-width="2" stroke-dasharray="5 6"/>` : '');
    }).join('') +
    arrow(70, 88, 70, 262, P.ok, 2.5) +
    `<text x="52" y="175" text-anchor="middle" font-size="13" font-weight="700" fill="${P.ok}" transform="rotate(-90 52 175)">outer loop: next guest</text>` +
    box(250, 276, 300, 36, P.okT, 12) + T(400, 299, '3 guests × 3 courses = 9 plates', { s: 14, f: P.ok }));

  const service = [
    '# PREVIEW lists: the shopping lists of lesson 31',
    'guests = ["Ana", "Ben", "Chloe"]',
    'courses = ["starter", "main", "dessert"]',
    '',
    'servings = 0',
    'for guest in guests:',
    '    for course in courses:',
    '        print(f"{guest} gets the {course}")',
    '        servings += 1',
    '',
    'print(f"Service done: {servings} servings")'
  ];

  // Trace table: every round of the inner loop, in the order it happens.
  const traceRows = [];
  GUESTS.forEach(([g, col], i) => COURSES.forEach((c, j) => traceRows.push({ g, col, c, n: i * 3 + j + 1, first: j === 0, i })));
  const tracePic = svg(600, 330, 'A trace table with 9 rows, in the order Python runs them. Rows 1 to 3: guest is Ana while course goes starter, main, dessert. Rows 4 to 6: guest is Ben. Rows 7 to 9: guest is Chloe. The servings column counts 1 to 9.',
    T(70, 22, 'guest', { s: 13, f: P.ink2 }) + T(190, 22, 'course', { s: 13, f: P.ink2 }) + T(390, 22, 'printed', { s: 13, f: P.ink2 }) + T(556, 22, 'servings', { s: 13, f: P.ink2 }) +
    `<line x1="10" y1="32" x2="590" y2="32" stroke="${P.ink}" stroke-width="2"/>` +
    GUESTS.map(([g, col], i) => `<rect x="12" y="${38 + i * 96}" width="116" height="90" rx="10" fill="${P.paper2}" stroke="${col}" stroke-width="2.5"/>` +
      T(70, 38 + i * 96 + 52, g, { s: 16, m: true, f: col })).join('') +
    traceRows.map(r => {
      const y = 38 + r.i * 96 + (r.n - 1 - r.i * 3) * 30;
      return `<rect x="136" y="${y + 2}" width="452" height="26" rx="6" fill="${r.n % 2 ? P.white : P.sand}"/>` +
        T(190, y + 20, r.c, { s: 13, m: true, f: P.warn }) +
        T(390, y + 20, `${r.g} gets the ${r.c}`, { s: 13, m: true }) +
        T(556, y + 20, String(r.n), { s: 14, m: true, f: P.accent });
    }).join(''));

  const levels = [
    'guests = ["Ana", "Ben", "Chloe"]',
    'courses = ["starter", "main", "dessert"]',
    '',
    'for guest in guests:',
    '    print(f"{guest} sits down")     # outer level: 3 times',
    '    for course in courses:',
    '        print(f"    {course}")      # inner level: 9 times'
  ];
  const codePic = `<div style="width:100%;min-width:0">` + run(service, { title: 'service.py' }) + tracePic +
    code(levels, { title: 'levels.py', hi: [5, 7] }) +
    term(['$ python3 levels.py', 'Ana sits down', '    starter', '    main', '    dessert', 'Ben sits down', '    starter', '    main', '    dessert', 'Chloe sits down', '    starter', '    main', '    dessert'], 'terminal') + `</div>`;

  const sameName = [
    'for n in range(1, 4):          # guests 1, 2, 3',
    '    for n in range(1, 4):      # courses 1, 2, 3',
    '        print(f"Guest {n} gets course {n}")',
    '    print(f"Guest {n} is full")'
  ];
  const tooDeep = [
    'for guest in guests:',
    '    for course in courses:',
    '        print(f"{guest} gets the {course}")',
    '        print(f"Clear {guest}\'s plates")'
  ];
  const tooShallow = [
    'for guest in guests:',
    '    for course in courses:',
    '        print(f"{guest} gets the {course}")',
    'print(f"Clear {guest}\'s plates")'
  ];
  const painPic = `<div style="width:100%;min-width:0">` +
    code(sameName, { title: 'courses.py, one name for two loops', bad: [1, 2] }) +
    term(['$ python3 courses.py', 'Guest 1 gets course 1', 'Guest 2 gets course 2', 'Guest 3 gets course 3', 'Guest 3 is full', 'Guest 1 gets course 1', 'Guest 2 gets course 2', 'Guest 3 gets course 3', 'Guest 3 is full', '# ... and the same 4 lines once more. Guests 1 and 2 are never full.'], 'terminal') +
    code(tooDeep, { title: 'clear.py, pushed in too far', bad: [4] }) +
    term(['$ python3 clear.py', 'Ana gets the starter', "Clear Ana's plates", 'Ana gets the main', "Clear Ana's plates", '# ... 9 servings, and 9 clears: the plate goes before Ana eats'], 'terminal') +
    code(tooShallow, { title: 'clear.py, pulled out too far', bad: [4] }) +
    term(['$ python3 clear.py', '# ... the 9 servings, then only one line:', "Clear Chloe's plates"], 'terminal') + `</div>`;

  const fixPic = `<div style="width:100%;min-width:0">` + run(sameName, { title: 'courses.py' }) +
    code(['for guest in guests:', '    for course in courses:', '        print(f"{guest} gets the {course}")', '    print(f"Clear {guest}\'s plates")'], { title: 'clear.py, fixed', good: [4] }) + `</div>`;

  const tray = [
    '# A baking tray: 3 rows of 4 cookies',
    'for row in range(3):',
    '    for col in range(4):',
    '        print("(o)", end=" ")',
    '    print()  # end the row: go to a new line',
    '',
    'print("12 cookies on the tray")'
  ];
  const portions = [
    '# Pasta: servings down, grams per serving across',
    'for servings in range(1, 6):',
    '    for grams in range(50, 251, 50):',
    '        print(f"{servings * grams:5}", end="")',
    '    print()  # end the row'
  ];
  const tryPic = `<div style="width:100%;min-width:0">${run(tray, { title: 'tray.py' })}${run(portions, { title: 'portions.py' })}</div>`;

  const rules = [
    'guests = ["Ana", "Chloe", "Ben"]',
    'courses = ["tomato soup", "beef pie", "rice pudding"]',
    '',
    'for guest in guests:',
    '    for course in courses:',
    '        if guest == "Ben" and "beef" in course:',
    '            print("Ben skips the beef pie")',
    '            continue',
    '        if guest == "Chloe" and "pie" in course:',
    '            print("Chloe: gluten warning!")',
    '            break',
    '        print(f"{guest} gets the {course}")',
    '',
    'print("Kitchen closed.")'
  ];
  const catchPic = `<div style="width:100%;min-width:0">` + run(rules, { title: 'rules.py' }) +
    svg(600, 150, 'break inside the inner loop: Chloe\'s row stops after the soup, her dessert is skipped, and the outer loop still moves on to Ben, who gets served.',
      T(20, 30, 'Chloe', { s: 15, f: P.danger, a: 'start' }) +
      box(100, 10, 130, 34, P.okT, 10) + T(165, 33, 'soup', { s: 14, f: P.ok }) +
      box(250, 10, 130, 34, P.dangerT, 10) + T(315, 33, 'break', { s: 14, m: true, f: P.danger }) +
      `<rect x="400" y="10" width="130" height="34" rx="10" fill="${P.paper2}" stroke="${P.mute}" stroke-width="2.5" stroke-dasharray="6 5"/>` + T(465, 33, 'skipped', { s: 14, f: P.mute }) +
      arrow(315, 52, 160, 92, P.danger, 2.5) +
      T(20, 120, 'Ben', { s: 15, f: P.ok, a: 'start' }) +
      box(100, 100, 130, 34, P.okT, 10) + T(165, 123, 'soup', { s: 14, f: P.ok }) +
      box(250, 100, 130, 34, P.warnT, 10) + T(315, 123, 'continue', { s: 14, m: true, f: P.warn }) +
      box(400, 100, 130, 34, P.okT, 10) + T(465, 123, 'pudding', { s: 14, f: P.ok }) +
      T(330, 80, 'the outer loop moves on to Ben', { s: 13, w: 700, f: P.ink2, a: 'start' })) + `</div>`;

  COURSE.add({
    id: 'l29', minutes: 13,
    summary: 'A <b>nested loop</b> is a loop inside a loop: <b>for each guest, for each course</b>, serve it. The inner loop runs <b>all the way through</b> for every round of the outer loop, so 3 guests × 3 courses is <b>9</b> servings. The spaces in front of a line say <b>which loop</b> it belongs to. Give each loop <b>its own name</b>. <code>break</code> in the inner loop leaves <b>only the inner loop</b>.',
    video: {
      src: 'videos/l29-nested-loops.mp4', poster: 'videos/l29-nested-loops.jpg', length: '1 min',
      script: [
        'Tonight is a 3 course dinner. Ana, Chloe and Ben each get a starter, a main and a dessert.',
        'In Python, that is a loop inside a loop. For each guest. Then, pushed in, for each course. Serve it.',
        'The waiter walks to Ana\'s seat. Now the inner loop runs all the way through. Starter. Main. Dessert.',
        'Only then does the outer loop move on, to Chloe. 3 more plates. Then Ben.',
        '3 guests, times 3 courses. 9 servings. The inner loop runs completely, for every round of the outer one.',
        'Now a rule. Chloe\'s main has wheat in it. Gluten warning. Break.',
        'Her card flips to no more. But break only leaves the inner loop. The waiter moves on, and Ben still gets served.',
        'For each guest, every course. The inner loop finishes, before the outer loop moves on.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Every guest gets every course.',
        text: [
          'Tonight is a 3 course dinner: a starter, a main and a dessert. Ana, Ben and Chloe each get all three. How does a waiter do that?',
          'Walk to <b>Ana</b>. Serve the starter, the main, the dessert. Only then walk to <b>Ben</b> and serve the same 3 courses. Then <b>Chloe</b>. Two jobs, one inside the other: an <b>outer</b> job, "go to the next guest", and an <b>inner</b> job, "serve every course".',
          'In Python that is a <b>nested loop</b>: a loop inside a loop. Count the plates: 3 guests <b>times</b> 3 courses is <b>9 servings</b>.'
        ]
      },
      {
        label: 'The code', pic: codePic,
        h: 'A for loop, pushed in under another for loop.',
        text: [
          'Line 6 is the <b>outer</b> loop from lesson 26: <code>for guest in guests:</code>. Line 7 is a whole second <code>for</code> loop, pushed in by 4 spaces, so it is <b>part of</b> the outer loop\'s block. Its own block, lines 8 and 9, is pushed in by <b>8</b> spaces.',
          'The rule: the inner loop runs <b>all the way through</b>, for <b>every</b> round of the outer loop. In round 1, <code>guest</code> is <code>"Ana"</code>, and <code>course</code> goes starter, main, dessert. Only then does the outer loop take its next round: <code>guest</code> becomes <code>"Ben"</code>, and the inner loop starts again from the starter. The trace table shows all 9 rounds in order.',
          'Look at line 8: it uses <code>guest</code> from the <b>outer</b> loop and <code>course</code> from the <b>inner</b> one. The inner loop can read the outer jar any time.',
          'Press <b>Run</b>. Then add a fourth course: a comma after <code>"dessert"</code>, then <code>"coffee"</code>. Run it again. How many servings now? 3 guests × 4 courses is <b>12</b>, and you did not touch a single <code>print</code>.',
          'The spaces in front of a line decide <b>which loop it belongs to</b>. In <code>levels.py</code>, the first <code>print</code> sits at the outer level, so it runs once per guest: <b>3 times</b>. The second sits at the inner level, so it runs once per guest <b>and</b> course: <b>9 times</b>.'
        ],
        tip: 'Read nested loops out loud from the outside in: "for each guest, for each course, print". The line pushed in the furthest runs the most.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'One name for two loops, and a line at the wrong level.',
        text: [
          '<b>Pain 1: the same name twice.</b> Numbers stand in for guests and courses here, and both loops use the jar <code>n</code>. The inner loop puts course numbers into <code>n</code>, and that <b>overwrites</b> the guest number. So the second line printed says "Guest 2 gets course 2", and when the inner loop ends, <code>n</code> is 3. "Guest 3 is full" comes out 3 times. Guests 1 and 2 are never full. No error, just a wrong dinner.',
          '<b>Pain 2: a line at the wrong level.</b> You want to clear each guest\'s plates once, after all 3 courses. Push that <code>print</code> in by 8 spaces, and it belongs to the <b>inner</b> loop: it runs 9 times, right after each course, before anyone has eaten. Pull it out to the left edge, and it belongs to <b>no</b> loop: it runs once at the very end, and only for the last guest, Chloe.'
        ],
        warn: 'Python cannot tell which level you meant. It trusts the spaces at the start of each line. In nested loops there are three levels to choose from: outside both loops, inside the outer one, inside the inner one.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'One name per loop. One level per job.',
        text: [
          'Press <b>Run</b> and see the strange dinner from Pain 1. Then give each loop <b>its own name</b>, the way lesson 12 taught: change the outer <code>n</code> to <code>guest_no</code>, the inner <code>n</code> to <code>course_no</code>, and use each name in the right blank. Run it again: 12 lines, guest 1 gets courses 1 to 3 and is full, then guest 2, then guest 3.',
          'For Pain 2, ask "how often should this happen?" <b>Once per course</b>: push it in to the inner level. <b>Once per guest</b>: the outer level, 4 spaces. <b>Once in total</b>: the left edge. Clearing the plates is once per guest, so it goes at 4 spaces, after the inner loop.'
        ],
        tip: 'Good name pairs for nested loops: <code>guest</code> and <code>course</code>, <code>row</code> and <code>col</code>, <code>day</code> and <code>meal</code>. If you cannot think of two different names, ask what each loop goes through.'
      },
      {
        label: 'Try it', pic: tryPic,
        h: 'Rows and columns: a tray of cookies.',
        text: [
          'A baking tray is a grid: rows of cookies, and columns across each row. The outer loop goes down the rows. The inner loop goes across the columns.',
          'One new tool: <code>print("(o)", end=" ")</code>. Normally <code>print</code> ends with a new line. <code>end=" "</code> tells it to end with a space instead, so the next cookie lands on the <b>same</b> line. After each row, an empty <code>print()</code> ends the line.',
          'Press <b>Run</b> on the tray. Then bake <b>4 rows of 6</b>: change <code>range(3)</code> and <code>range(4)</code>, and fix the last line so it still tells the truth.',
          'The second box is a portion table for a big party. Each row is a number of servings, each column is grams of pasta per serving, and each cell is <code>servings * grams</code>. <code>:5</code> in the f-string makes every number 5 characters wide, so the columns line up, a bit like <code>:.2f</code> in lesson 15. Can you find how much pasta 4 people need at 150 g each?'
        ]
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'break leaves only the inner loop. And nesting multiplies.',
        text: [
          'Lesson 28 gave you <code>continue</code> (skip the rest of this round) and <code>break</code> (leave the loop now). In a nested loop they work on the <b>innermost loop they sit in</b>. Chloe sits in the middle tonight. Ben eats no meat, so he skips the beef pie with <code>continue</code> and still gets his pudding. The pie crust has wheat, so Chloe gets a gluten warning, and <code>break</code> ends <b>her</b> courses. But the outer loop carries on, and Ben is still served.',
          'Chloe loves dessert, so <code>break</code> was too strong here. Change it to <code>continue</code> on line 11 and run it again. Now she skips only the pie.',
          '<b>Nesting multiplies the work.</b> 100 guests × 100 dishes is 10,000 checks. That is nothing at kitchen size, but it grows fast, so be careful with large lists inside large lists.',
          '<b>Deep nesting is hard to read.</b> Two levels are fine. Three or more, and the code drifts to the right and nobody can follow it. Later lessons give you tidier tools: <b>functions</b> (lesson 44, def) put the inner loop on its own recipe card, and <b>comprehensions</b> (lesson 76) build a whole list in one line. Next up is lesson 30, the review of decisions and loops.'
        ],
        warn: 'There is no "break both loops" in Python. A <code>break</code> in the inner loop never stops the outer one. Lesson 44 shows the usual way out of both at once: put the loops in a function and <code>return</code>.'
      }
    ],
    exercises: [
      {
        file: 'l29_dinner_service.py', title: 'Dinner service',
        task: 'Two lists are ready: <code>guests</code> and <code>courses</code>. With a loop inside a loop, print <code>Ana: tomato soup</code> for every guest and every course, guest by guest. Ben eats no meat, so skip every course with <code>"beef"</code> in its name for him with <code>continue</code>. Then print one last line: <code>Total servings: 8</code>.',
        steps: [
          'Press <b>Open in VS Code</b>. The exact 9 lines to print are in the comment at the top of the file.',
          'Write your loops between the <code>START</code> and <code>END</code> lines. Do not type the names or courses yourself, and do not change the two lists. Save the file.',
          'Run it. Step 1 shows what you printed. Step 2 runs your loops again with 5 other tables, from a big table to an empty menu, and checks every line in order. It says <code>PASS</code> or gives you one hint.',
          'Count only plates that are really served: put <code>servings += 1</code> next to the print, after the <code>continue</code>.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'How many lines does this print?',
        pic: code(['guests = ["Ana", "Ben", "Chloe", "Dev"]', 'courses = ["soup", "pasta", "cake"]', '', 'for guest in guests:', '    for course in courses:', '        print(f"{guest}: {course}")'], { title: 'dinner.py' }),
        options: ['12', '7', '4', '3'],
        answer: 0,
        why: 'The inner loop runs all 3 courses for each of the 4 guests: 4 × 3 = 12 lines. Nested loops multiply.',
        hint: 'How many times does the inner loop run? And how many rounds does it make each time?'
      },
      {
        type: 'order', q: 'Put the printed lines in the order Python prints them.',
        pic: code(['for guest in ["Ben", "Ana"]:', '    for course in ["soup", "cake"]:', '        print(f"{guest}: {course}")'], { title: 'order.py' }),
        items: ['Ben: soup', 'Ben: cake', 'Ana: soup', 'Ana: cake'],
        why: 'Ben is the first guest, and the inner loop serves him every course before the outer loop moves on to Ana.',
        hint: 'The inner loop finishes all its rounds before the outer loop takes its next one.'
      },
      {
        type: 'fix', q: 'This should print <code>Table 1, seat 1</code>, <code>Table 1, seat 2</code>, <code>Table 1, seat 3</code>, then the same 3 seats for table 2. Fix it.',
        code: ['for n in range(1, 3):        # tables 1 and 2', '    for n in range(1, 4):    # seats 1, 2, 3', '        print(f"Table {n}, seat {n}")'],
        title: 'seating.py',
        check: [
          'lines = out.splitlines()',
          'want = [f"Table {t}, seat {s}" for t in range(1, 3) for s in range(1, 4)]',
          'if lines == want:',
          '    ok = True',
          'elif lines[:2] == ["Table 1, seat 1", "Table 2, seat 2"]:',
          '    msg = "Still Table 2, seat 2 on line 2. Both loops still share one name, so the table number is overwritten. Call the outer jar table and the inner jar seat."',
          'else:',
          '    msg = "It printed " + str(len(lines)) + " lines, starting: " + " / ".join(lines[:3]) + ". You want Table 1, seat 1 / Table 1, seat 2 / Table 1, seat 3, then the same for table 2."'
        ].join('\n'),
        why: 'With one name for both loops, the inner loop overwrites the table number. Two names, <code>table</code> and <code>seat</code>, keep both values: <code>print(f"Table {table}, seat {seat}")</code>.',
        hint: 'Give the outer loop and the inner loop different names, then use each name in its own blank of the f-string.'
      },
      {
        type: 'fix', q: 'The tray should show <b>2 rows of 3 cookies</b>: <code>(o) (o) (o)</code> twice. Fix it.',
        code: ['for row in range(2):', '    for col in range(3):', '        print("(o)", end=" ")', '        print()'],
        title: 'tray.py',
        check: [
          'lines = [line.rstrip() for line in out.splitlines()]',
          'if lines == ["(o) (o) (o)", "(o) (o) (o)"]:',
          '    ok = True',
          'elif len(lines) == 6:',
          '    msg = "6 lines, one cookie each. The empty print() runs after every cookie. Pull it out by 4 spaces so it runs once per row."',
          'elif len(lines) == 1:',
          '    msg = "All 6 cookies on one line. The empty print() runs only once, at the very end. Push it in by 4 spaces so it ends each row."',
          'else:',
          '    msg = "It printed: " + " / ".join(lines) + ". You want 2 rows of 3 cookies."'
        ].join('\n'),
        why: 'The empty <code>print()</code> ends a row, so it belongs to the <b>outer</b> loop, after the inner loop: 4 spaces, not 8.',
        hint: 'How often should a row end? Once per cookie, or once per row?'
      },
      {
        type: 'pick', q: 'Back to lesson 28. What does this print?',
        pic: code(['for guest in ["Chloe", "Ana"]:', '    for course in ["soup", "pie", "cake"]:', '        if guest == "Chloe" and course == "pie":', '            break', '        print(f"{guest}: {course}")'], { title: 'gluten.py' }),
        options: ['Chloe: soup, then Ana: soup, Ana: pie, Ana: cake', 'Chloe: soup, and nothing else', 'Chloe: soup, Chloe: cake, then all 3 for Ana', 'Nothing at all'],
        answer: 0,
        why: '<code>break</code> leaves only the inner loop, the one it sits in. Chloe\'s courses stop at the pie, but the outer loop goes on and Ana gets everything. Option 3 is what <code>continue</code> would do.',
        hint: 'Which loop does the break sit in? Does the outer loop notice?'
      },
      {
        type: 'pick', q: 'Back to lesson 27. How many cookies does this bake?',
        pic: code(['for row in range(1, 4):', '    for col in range(5):', '        print("(o)", end=" ")', '    print()'], { title: 'tray.py' }),
        options: ['15', '20', '12', '24'],
        answer: 0,
        why: '<code>range(1, 4)</code> gives 1, 2, 3: 3 rows, because the stop is never included. <code>range(5)</code> gives 0 to 4: 5 columns. 3 × 5 = 15 cookies.',
        hint: 'Count each range on its own first. Is the stop included?'
      },
      {
        type: 'fill', q: 'Fill the blanks so each row of 4 cookies stays on one line, and each row ends with a new line.',
        text: 'for row in range(2):\n    for col in range(4):\n        print("(o)", ___=" ")\n    ___()',
        options: ['end', 'print', 'sep', 'input', 'break'],
        answer: ['end', 'print'],
        why: '<code>end=" "</code> ends each cookie with a space instead of a new line. The empty <code>print()</code> at the outer level ends the row.',
        hint: 'What should a print end with? And which tool prints an empty line?'
      },
      {
        type: 'bucket', q: 'With 3 guests and 3 courses, how many times does each line run?',
        pic: code(['for guest in guests:              # 3 guests', '    print(f"{guest} sits down")', '    for course in courses:        # 3 courses', '        print(f"  {course}")', '        servings += 1', '    print("Clear the plates")', 'print("Kitchen closed")'], { title: 'service.py' }),
        buckets: ['Once', '3 times', '9 times'],
        items: [
          ['line 2: print(f"{guest} sits down")', 1],
          ['line 4: print(f"  {course}")', 2],
          ['line 5: servings += 1', 2],
          ['line 6: print("Clear the plates")', 1],
          ['line 7: print("Kitchen closed")', 0]
        ],
        why: 'The spaces decide. 4 spaces: the outer level, once per guest, 3 times. 8 spaces: the inner level, once per guest and course, 9 times. The left edge: once, after both loops.',
        hint: 'Count the spaces in front of each line.'
      }
    ]
  });
})();
