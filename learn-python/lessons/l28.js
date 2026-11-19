/* Lesson 28: break and continue (module 2). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l28  break and continue
     ===================================================================== */

  // One cookie on the tray. kind: 'ok' | 'burnt' | 'smoke' | 'grey'
  const cookie = (x, y, kind) => {
    const fill = kind === 'burnt' ? '#5A3A22' : kind === 'smoke' ? '#3E2A1C' : '#E3A548';
    const edge = kind === 'ok' || kind === 'grey' ? P.warn : P.ink;
    const chips = kind === 'burnt' || kind === 'smoke' ? '' :
      `<circle cx="${x - 9}" cy="${y - 6}" r="3.5" fill="${P.ink2}"/><circle cx="${x + 8}" cy="${y - 2}" r="3.5" fill="${P.ink2}"/><circle cx="${x - 2}" cy="${y + 10}" r="3.5" fill="${P.ink2}"/>`;
    const smoke = kind === 'smoke'
      ? `<circle cx="${x - 8}" cy="${y - 34}" r="9" fill="${P.sand}" stroke="${P.mute}" stroke-width="2"/><circle cx="${x + 6}" cy="${y - 46}" r="11" fill="${P.sand}" stroke="${P.mute}" stroke-width="2"/><circle cx="${x - 2}" cy="${y - 62}" r="8" fill="${P.sand}" stroke="${P.mute}" stroke-width="2"/>`
      : '';
    return `<g${kind === 'grey' ? ' opacity="0.35"' : ''}>${smoke}<circle cx="${x}" cy="${y}" r="24" fill="${fill}" stroke="${edge}" stroke-width="2.5"/>${chips}</g>`;
  };
  const tick = (x, y) => `<circle cx="${x}" cy="${y}" r="11" fill="${P.ok}"/><path d="M${x - 5} ${y} l3.5 4 l6.5 -8" fill="none" stroke="${P.white}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;

  const TRAY = ['ok', 'ok', 'burnt', 'ok', 'smoke', 'grey'];
  const ideaPic = svg(600, 300, 'A tray of six cookies, checked left to right. Cookies 1 and 2 are good. Cookie 3 is burnt: continue skips it and the check moves on. Cookie 4 is good. Cookie 5 sets off the smoke alarm: break stops everything. Cookie 6 is never checked.',
    box(20, 70, 560, 110, P.sand, 18) +
    TRAY.map((k, i) => {
      const x = 70 + i * 92;
      return cookie(x, 125, k) + (k === 'ok' ? tick(x + 20, 102) : '') +
        T(x, 166, k === 'smoke' ? 'SMOKE' : k === 'grey' ? 'ok' : k, { s: 12, m: true, f: k === 'burnt' || k === 'smoke' ? P.danger : k === 'grey' ? P.mute : P.ok });
    }).join('') +
    T(300, 34, 'Check each cookie, left to right', { s: 16 }) +
    // continue: the burnt one is skipped
    `<path d="M254 182 C 250 222, 210 228, 196 214" fill="none" stroke="${P.warn}" stroke-width="3"/>` + arrow(206, 218, 194, 212, P.warn, 3) +
    box(26, 214, 270, 70, P.warnT, 14) + T(161, 242, 'continue', { s: 16, m: true, f: P.warn }) + T(161, 266, 'skip this one, check the next', { s: 12.5, w: 700, f: P.ink2 }) +
    // break: the smoke stops everything
    arrow(438, 182, 438, 212, P.danger, 3) +
    box(310, 214, 266, 70, P.dangerT, 14) + T(443, 242, 'break', { s: 16, m: true, f: P.danger }) + T(443, 266, 'stop the whole loop now', { s: 12.5, w: 700, f: P.ink2 }) +
    T(530, 62, 'never checked', { s: 11.5, w: 700, f: P.mute }));

  const tray = [
    '# PREVIEW list: the cookies on the tray, left to right',
    'tray = ["ok", "ok", "burnt", "ok", "SMOKE", "ok"]',
    '',
    'good = 0',
    'for cookie in tray:',
    '    if cookie == "burnt":',
    '        print("burnt: skip it")',
    '        continue          # skip the rest of this round',
    '    if cookie == "SMOKE":',
    '        print("SMOKE: stop everything!")',
    '        break             # leave the loop right now',
    '    good += 1',
    '    print(f"ok: {good} on the plate")',
    '',
    'print(f"{good} good cookies before the smoke")'
  ];

  // What happens to each cookie, one row per round.
  const ROWS = [
    ['"ok"', 'good += 1, now 1', P.ok, P.paper2],
    ['"ok"', 'good += 1, now 2', P.ok, P.paper2],
    ['"burnt"', 'continue: skip to the next cookie', P.warn, P.warnT],
    ['"ok"', 'good += 1, now 3', P.ok, P.paper2],
    ['"SMOKE"', 'break: leave the loop now', P.danger, P.dangerT],
    ['"ok"', 'never checked', P.mute, P.white]
  ];
  const tracePic = svg(600, 320, 'One row per cookie. Rounds 1, 2 and 4 count a good cookie. Round 3 is burnt: continue skips the counting line. Round 5 is SMOKE: break leaves the loop. Cookie 6 is never checked. After the loop: 3 good cookies.',
    box(14, 10, 572, 300, P.white, 16) +
    T(66, 40, 'ROUND', { s: 12, f: P.ink2 }) + T(170, 40, 'cookie', { s: 12, f: P.ink2, m: true }) + T(400, 40, 'WHAT HAPPENS', { s: 12, f: P.ink2 }) +
    ROWS.map(([c, what, col, bg], i) => {
      const y = 52 + i * 36;
      return `<rect x="30" y="${y}" width="540" height="30" rx="8" fill="${bg}"${i === 5 ? ` stroke="${P.mute}" stroke-width="1.5" stroke-dasharray="5 5"` : ''}/>` +
        T(66, y + 21, String(i + 1), { s: 15, f: i === 5 ? P.mute : P.ink }) + T(170, y + 21, c, { s: 15, m: true, f: col }) +
        T(400, y + 21, what, { s: 13.5, w: 700, f: col === P.ok ? P.ink : col });
    }).join('') +
    T(300, 292, 'after the loop: 3 good cookies before the smoke', { s: 13, f: P.ok }));
  const codePic = `<div style="width:100%;min-width:0">${run(tray, { title: 'tray.py' })}${tracePic}</div>`;

  const weekBug = [
    '# Ben lifts on days 1 to 7. Day 3 is his rest day.',
    'day = 1',
    'while day <= 7:',
    '    if day == 3:',
    '        print("Day 3: rest")',
    '        continue',
    '    print(f"Day {day}: lift")',
    '    day += 1',
    'print("Week done")'
  ];
  const dessertBug = [
    "# PREVIEW list: tonight's desserts",
    'desserts = ["flour brownie", "wheat tart", "rice pudding", "fruit salad"]',
    '',
    'for dessert in desserts:',
    '    if "flour" not in dessert and "wheat" not in dessert:',
    '        print(f"Chloe gets the {dessert}")',
    '        break',
    '    else:',
    '        print("No gluten-free dessert. Make one!")',
    '        break'
  ];
  const painPic = `<div style="width:100%;min-width:0">` +
    code(weekBug, { title: 'ben_week.py', bad: [6] }) +
    term(['$ python3 ben_week.py', 'Day 1: lift', 'Day 2: lift', 'Day 3: rest', 'Day 3: rest', 'Day 3: rest', '# ... Day 3: rest, thousands of times, until you stop it'], 'terminal') +
    code(dessertBug, { title: 'chloe_dessert.py', bad: [8, 9, 10] }) +
    term(['$ python3 chloe_dessert.py', 'No gluten-free dessert. Make one!', '# it only looked at the brownie, then gave up'], 'terminal') + `</div>`;

  const dessertFlag = [
    'desserts = ["flour brownie", "wheat tart", "rice pudding", "fruit salad"]',
    '',
    'found = False                 # a flag: nothing found yet',
    'for dessert in desserts:',
    '    if "flour" not in dessert and "wheat" not in dessert:',
    '        print(f"Chloe gets the {dessert}")',
    '        found = True',
    '        break',
    '',
    'if not found:                 # after the loop: looked at them all',
    '    print("No gluten-free dessert. Make one!")'
  ];
  const fixPic = `<div style="width:100%;min-width:0">${run(weekBug, { title: 'ben_week.py' })}` +
    code(dessertFlag, { title: 'chloe_dessert.py, give up only after the loop', good: [3, 7, 10, 11] }) +
    term(['$ python3 chloe_dessert.py', 'Chloe gets the rice pudding'], 'terminal') + `</div>`;

  const pancakes = [
    'while True:                  # keep going until a break',
    '    answer = input("How many pancakes, Ana? ").strip()',
    '    if answer.isdigit():',
    '        break                # a number: leave the loop',
    '    print("Please type a number, like 4.")',
    '',
    'pancakes = int(answer)',
    'print(f"{pancakes} pancakes for Ana. Coming up!")'
  ];
  const dessertElse = [
    "# PREVIEW list: tonight's desserts",
    'desserts = ["flour brownie", "wheat tart", "rice pudding", "fruit salad"]',
    '',
    'for dessert in desserts:',
    '    if "flour" not in dessert and "wheat" not in dessert:',
    '        print(f"Chloe gets the {dessert}")',
    '        break',
    'else:                        # lined up with for, not with if',
    '    print("No gluten-free dessert. Make one!")'
  ];
  const tryPic = `<div style="width:100%;min-width:0">${run(pancakes, { title: 'pancakes.py', inputs: ['', 'lots', '4'] })}${run(dessertElse, { title: 'chloe_dessert.py' })}</div>`;

  const tangled = [
    'day = 0',
    'while True:',
    '    day += 1',
    '    if day > 7:',
    '        break',
    '    if day == 3:',
    '        continue',
    '    print(f"Day {day}: lift")'
  ];
  const clear = [
    'for day in range(1, 8):',
    '    if day != 3:',
    '        print(f"Day {day}: lift")'
  ];
  const catchPic = `<div style="width:100%;min-width:0">` +
    code(tangled, { title: 'ben_week.py, a break and a continue', hi: [2, 5, 7] }) +
    code(clear, { title: 'ben_week.py, a clear question instead', good: [1, 2] }) +
    term(['$ python3 ben_week.py', 'Day 1: lift', 'Day 2: lift', 'Day 4: lift', 'Day 5: lift', 'Day 6: lift', 'Day 7: lift', '# both print exactly this'], 'terminal') + `</div>`;

  COURSE.add({
    id: 'l28', minutes: 12,
    summary: 'Two words change how a loop goes round. <code>continue</code> <b>skips the rest of this round</b> and goes on with the next one: skip the burnt cookie. <code>break</code> <b>leaves the loop right now</b> and carries on after it: the smoke alarm stops everything. Both work in <code>for</code> and <code>while</code>. <code>while True:</code> with a <code>break</code> means "keep going until...". And a loop can have an <code>else</code> that runs only when <b>no break</b> happened.',
    video: {
      src: 'videos/l28-break-continue.mp4', poster: 'videos/l28-break-continue.jpg', length: '1 min 4 s',
      script: [
        'Your cookies are out of the oven. You check the tray, one cookie at a time.',
        'Good. Good. Burnt? Skip it, and check the next one. In Python, that is continue. It skips the rest of this round, and the loop moves on.',
        'Then the smoke alarm goes off. Stop everything, right now. That is break. It leaves the loop at once. The cookies after it are never checked.',
        'Here is the code. If the cookie is burnt, continue. If it is smoke, break. Otherwise, count it. 3 good cookies before the smoke.',
        'A loop can even have an else. It runs only when the loop ends without a break. A tray with no smoke rings the bell.',
        'One trap. In a while loop, continue jumps straight back to the top. If the line that changes day comes after it, day stays at 3, and the loop never ends. Change it before you continue.',
        'Continue skips one round. Break leaves the loop.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Skip the burnt one. Stop when the alarm goes off.',
        text: [
          'A tray of cookies comes out of the oven. You check them <b>one at a time</b>, left to right. That is a loop, like the ones in lessons 25 to 27.',
          'A <b>burnt</b> cookie? You do not put it on the plate. You skip it and check the next one. The checking goes on. In Python that is <code>continue</code>: <b>skip the rest of this round</b>, go to the next.',
          'Then the <b>smoke alarm</b> goes off. You do not check the last cookie. You stop everything, right now, and open the window. In Python that is <code>break</code>: <b>leave the loop at once</b>, and carry on with the first line after it. You use it every time you "stop when...": stop heating when the water boils, stop searching the pantry when you find the flour.'
        ]
      },
      {
        label: 'The code', pic: codePic,
        h: 'continue goes to the next round. break leaves.',
        text: [
          '<code>continue</code> and <code>break</code> are each a line of their own, inside the loop. They almost always sit under an <code>if</code>, because you only skip or stop <b>sometimes</b>: when the cookie is burnt, when there is smoke.',
          '<b>continue</b>: Python skips the lines below it in the loop and jumps back to the top for the <b>next round</b>. For the burnt cookie, <code>good += 1</code> never runs. <b>break</b>: Python leaves the loop at once. The last cookie is <b>never checked</b>, and the next line that runs is the <code>print</code> at the left edge, after the loop.',
          'Press <b>Run</b> and follow the table under the code: one row per round. Then mark another cookie burnt: change the first <code>"ok"</code> to <code>"burnt"</code> and run it again. You get 2 good cookies. Then move <code>"SMOKE"</code> to the front of the list. What do you expect?'
        ],
        tip: 'Both words work the same in a <code>for</code> loop and in a <code>while</code> loop. They only make sense <b>inside</b> a loop: a <code>break</code> outside any loop stops Python before it runs anything, with <code>SyntaxError: \'break\' outside loop</code>.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'A loop that never ends, and a search that gives up too early.',
        text: [
          '<b>Pain 1: continue in a while loop.</b> Ben lifts weights on days 1 to 7, but day 3 is his rest day. On day 3, <code>continue</code> jumps back to the top of the loop. The line that changes the jar, <code>day += 1</code>, sits <b>below</b> the <code>continue</code>, so it never runs. <code>day</code> stays 3 forever, and the loop never ends. Lesson 25\'s three parts again: the <b>change</b> step got skipped.',
          '<b>Pain 2: break in the wrong place.</b> Chloe wants the first gluten-free dessert. The loop looks at the brownie: it has flour, so the <code>else</code> under the <code>if</code> runs. It says "no dessert" and breaks. The rice pudding and the fruit salad are <b>never checked</b>.',
          'The mistake in Pain 2 is a thinking mistake. One dessert that fails does not mean they all fail. You can only say "nothing found" <b>after</b> you have looked at everything.'
        ],
        warn: 'Neither bug shows an error. Python cannot know that day 3 should end, or that you meant to look at every dessert. It does exactly what the lines say.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Change it before you continue. Give up only after the loop.',
        text: [
          'Press <b>Run</b> on Ben\'s week and watch <code>Day 3: rest</code> pour out. Press the red <b>Stop</b> button (the page also stops it after 10 seconds). Nothing is broken.',
          'Now fix it: add <code>day += 1</code> on a new line <b>above</b> the <code>continue</code>, pushed in by 8 spaces like it. Run it again: day 3 rests, days 4 to 7 lift, and <code>Week done</code>. The rule: in a <code>while</code> loop, <b>change the jar before you continue</b>. A <code>for</code> loop cannot have this bug, because <code>for</code> moves to the next item by itself.',
          'For Chloe, a <b>flag</b> remembers what happened inside the loop. <code>found = False</code> before the loop. When a dessert fits, set <code>found = True</code> and <code>break</code>. The "nothing found" message moves <b>after the loop</b>, where every dessert has been looked at: <code>if not found:</code>.'
        ],
        tip: 'A flag is a True or False jar (lesson 10) with a good name. Start it at "not yet", and switch it inside the loop when the thing happens.'
      },
      {
        label: 'Try it', pic: tryPic,
        h: 'while True, and a loop with an else.',
        text: [
          '<b>pancakes.py</b>: <code>while True:</code> asks a question that is <b>always True</b>, so the loop would run forever. The only way out is the <code>break</code>. Read it as "<b>keep asking until</b> the answer is a number". In lesson 25 you wrote the <code>input()</code> twice, once before the loop and once inside. Here it is written once. Three ready-made answers are waiting: nothing, <code>lots</code> and <code>4</code>. Press Run and watch it ask 3 times.',
          '<b>chloe_dessert.py</b>: a <code>for</code> loop can have an <b>else</b>. It sits <b>lined up with the <code>for</code></b>, not with the <code>if</code>. It runs only when the loop <b>finished without a break</b>: every dessert was checked and none fitted. It does the job of the flag in The fix, with no flag.',
          'Press Run: <code>Chloe gets the rice pudding</code>, and the <code>else</code> stays quiet. Now change <code>"rice pudding"</code> to <code>"flour cookies"</code> and <code>"fruit salad"</code> to <code>"wheat cake"</code>. Run it again. No break happened, so the <code>else</code> runs.'
        ],
        tip: 'Many Python programmers are <b>surprised</b> by a <code>for</code> with an <code>else</code>, because "else" sounds like "if the loop did not run". Read it as "<b>no break</b>". If you think a reader will stumble, the flag from The fix says the same thing in plain words.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Use them when they make the loop clearer.',
        text: [
          '<code>break</code> and <code>continue</code> are jumps. Each one is a place where the loop does something other than "top to bottom, then round again". One or two are fine. Five make the reader jump around like you do in a smoky kitchen.',
          'The first box needs <code>while True</code>, a <code>break</code> and a <code>continue</code> to say "days 1 to 7, but not day 3". The second says it with <code>range</code> from lesson 27 and one clear question: <code>if day != 3:</code>. Same output, nothing to jump over. When a plain question reads better, <b>prefer the plain question</b>.',
          'Two more things. A <code>continue</code> as the <b>last line</b> of a loop does nothing: the round was ending anyway. And <code>break</code> leaves only the <b>innermost</b> loop, the one it sits in. Loops inside loops are next: lesson 29, Nested loops.'
        ],
        warn: '<code>while True:</code> with no <code>break</code> it can ever reach is an infinite loop. Before you run one, point at the <code>break</code> and ask: which answer gets me there?'
      }
    ],
    exercises: [
      {
        file: 'l28_tray_check.py', title: 'Check the tray',
        task: 'A tray of cookies is ready in a preview list. Loop through it: <b>skip</b> the burnt ones with <code>continue</code>, <b>stop</b> at <code>"SMOKE"</code> with <code>break</code> (print <code>Smoke alarm!</code> first), and count the good cookies. A <code>for</code> loop <code>else</code> prints <code>No smoke</code> when there was no smoke. Then print <code>Good cookies: 2</code> with the real count.',
        steps: [
          'Press <b>Open in VS Code</b>. The exact lines to print are in the comment at the top of the file.',
          'Write your lines between the <code>START</code> and <code>END</code> lines. Do not change the <code>tray</code> line above them. Save the file.',
          'Run it. The check runs your loop on 6 trays (with smoke, without smoke, smoke first, an empty tray...), with a 5 second limit per tray, then says <code>PASS</code> or gives you one hint.',
          '<code>No smoke</code> printed when there was smoke? Look at where your <code>else</code> is lined up.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What is the last line this prints?',
        pic: code(['tray = ["ok", "burnt", "SMOKE", "ok"]  # PREVIEW list', 'good = 0', 'for cookie in tray:', '    if cookie == "burnt":', '        continue', '    if cookie == "SMOKE":', '        break', '    good += 1', 'print(f"{good} good")'], { title: 'tray.py' }),
        options: ['1 good', '2 good', '0 good', '3 good'],
        answer: 0,
        why: 'Round 1: "ok", good is 1. Round 2: "burnt", continue skips the adding. Round 3: "SMOKE", break leaves the loop. The last "ok" is never checked. 1 good.',
        hint: 'Go round by round. Which cookies reach <code>good += 1</code>?'
      },
      {
        type: 'bucket', q: 'break or continue?',
        buckets: ['break', 'continue'],
        items: [
          ['Stop heating: the water boils', 0],
          ['Stop searching the pantry: you found the flour', 0],
          ['The smoke alarm goes off', 0],
          ['Skip the burnt cookie, check the next one', 1],
          ['Skip the meat dishes when serving Ben', 1],
          ['Skip Ana\'s rest days when you add up her km', 1]
        ],
        why: '<code>break</code> ends the whole loop: nothing after this matters. <code>continue</code> skips just this one item and goes on with the next.',
        hint: 'After this item, do you keep going round the loop, or not?'
      },
      {
        type: 'fix', q: 'Ben is vegetarian, but this lists every dish. Fix it so it prints only the 3 dishes without beef or chicken.',
        code: ['menu = ["bean chili", "beef stew", "lentil curry", "chicken pie", "tofu stir fry"]  # PREVIEW list', 'for dish in menu:', '    print(f"Ben can eat: {dish}")', '    if "beef" in dish or "chicken" in dish:', '        continue'],
        title: 'ben_menu.py',
        check: [
          'lines = out.splitlines()',
          'want = ["Ben can eat: bean chili", "Ben can eat: lentil curry", "Ben can eat: tofu stir fry"]',
          'if lines == want:',
          '    ok = menu == ["bean chili", "beef stew", "lentil curry", "chicken pie", "tofu stir fry"]',
          '    msg = "" if ok else "Keep the menu as it was. Let the loop skip the meat dishes."',
          'elif len(lines) == 5:',
          '    msg = "Still all 5. The continue comes after the print, so by then the dish is already printed. Move the if and its continue above the print."',
          'else:',
          '    msg = "It printed: " + " / ".join(lines) + ". You want bean chili, lentil curry and tofu stir fry."'
        ].join('\n'),
        why: 'A <code>continue</code> as the last line of the loop skips nothing: the round was ending anyway. Put the check <b>first</b>, so <code>continue</code> jumps over the <code>print</code>.',
        hint: 'What is left to skip after line 5? Move lines 4 and 5 above line 3.'
      },
      {
        type: 'fix', q: 'Ana\'s run log should stop at her first rest day (0 km) and print <code>Ana ran 19 km before her first rest</code>. It prints 0 km. Fix it.',
        code: ['log_km = [5, 8, 6, 0, 10]  # PREVIEW list: 0 means rest', 'total_km = 0', 'for km in log_km:', '    if km == 0:', '        print("Rest day. The log stops here.")', '    break', '    total_km += km', 'print(f"Ana ran {total_km} km before her first rest")'],
        title: 'ana_log.py',
        check: [
          'lines = out.splitlines()',
          'want = ["Rest day. The log stops here.", "Ana ran 19 km before her first rest"]',
          'if lines == want:',
          '    ok = log_km == [5, 8, 6, 0, 10]',
          '    msg = "" if ok else "Keep the log as it was."',
          'elif lines and lines[-1] == "Ana ran 0 km before her first rest":',
          '    msg = "Still 0 km. The break leaves the loop in round 1, before any km is added. It should only run on a rest day."',
          'elif lines and lines[-1] == "Ana ran 29 km before her first rest":',
          '    msg = "29 km: the loop went past the rest day. The break must stop it at the 0."',
          'else:',
          '    msg = "It printed: " + " / ".join(lines) + ". You want the rest day line, then Ana ran 19 km before her first rest"'
        ].join('\n'),
        why: 'The <code>break</code> was lined up with the <code>if</code>, so it ran in round 1, every time. Pushed in under the <code>if</code>, it runs only on the rest day. 5 + 8 + 6 = 19.',
        hint: 'Which line decides when to stop? Push the <code>break</code> in by 4 more spaces, under the <code>print</code>.'
      },
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['desserts = ["rice pudding", "flour cake"]  # PREVIEW list', 'for dessert in desserts:', '    if "flour" not in dessert:', '        print(f"Chloe gets the {dessert}")', '        break', 'else:', '    print("No dessert for Chloe")', 'print("Dinner done")'], { title: 'chloe_dessert.py' }),
        options: ['Chloe gets the rice pudding, then Dinner done', 'Chloe gets the rice pudding, then No dessert for Chloe, then Dinner done', 'No dessert for Chloe, then Dinner done', 'Only Chloe gets the rice pudding'],
        answer: 0,
        why: 'The rice pudding fits, so the loop breaks. A loop <code>else</code> runs only when there was <b>no break</b>, so it stays quiet. <code>Dinner done</code> is after the loop, so it always runs.',
        hint: 'Did the loop break? Read the <code>else</code> as "no break".'
      },
      {
        type: 'fill', q: 'Search the pantry for flour with a flag. Fill the blanks.',
        text: 'pantry = ["rice", "sugar", "flour", "salt"]\nfound = ___\nfor item in pantry:\n    if item == "flour":\n        found = ___\n        ___\nif ___ found:\n    print("No flour. Go shopping!")',
        options: ['False', 'True', 'break', 'not', 'continue', 'None'],
        answer: ['False', 'True', 'break', 'not'],
        why: 'The flag starts at False: not found yet. When the flour turns up, set it to True and <code>break</code>: there is no need to check the salt. After the loop, <code>if not found:</code> is True only when no flour was found.',
        hint: 'What should the flag say before you have looked? And which word stops the search?'
      },
      {
        type: 'pick', q: 'Back to lesson 27. What does this print?',
        pic: code(['for minute in range(10, 0, -1):', '    if minute == 7:', '        break', '    print(minute)'], { title: 'oven_timer.py' }),
        options: ['10, 9, 8', '10, 9, 8, 7', '7, 6, 5, 4, 3, 2, 1', '10, 9, 8, 6, 5, 4, 3, 2, 1'],
        answer: 0,
        why: 'range counts down 10, 9, 8, 7... At 7 the <code>break</code> runs <b>before</b> the <code>print</code>, so 7 is never printed and the loop is over. With <code>continue</code> instead, only the 7 would be missing.',
        hint: 'Is the <code>print</code> above or below the <code>break</code>? And does the loop come back after a break?'
      },
      {
        type: 'pick', q: 'Ana types <code>4</code>. What happens next?',
        pic: code(['while True:', '    answer = input("How many pancakes? ")', '    if answer.isdigit():', '        print("Thanks!")'], { title: 'pancakes.py' }),
        options: ['It prints Thanks!, then asks again, and never stops asking', 'It prints Thanks! and the program ends', 'It stops with an error', 'It asks once more, then ends'],
        answer: 0,
        why: '<code>while True</code> is always True. Only a <code>break</code> can end this loop, and there is none. Add <code>break</code> under the <code>print</code>.',
        hint: 'What is the only way out of a <code>while True:</code> loop?'
      }
    ]
  });
})();
