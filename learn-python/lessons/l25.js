/* Lesson 25: while loops (module 2). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l25  while loops
     ===================================================================== */

  // A pot with a wooden spoon in it.
  const pot = (x, y, s) => {
    s = s || 1;
    const w = 120 * s, h = 70 * s;
    return `<path d="M${x + 22 * s} ${y - 54 * s} L${x + 74 * s} ${y + 10 * s}" stroke="${P.warn}" stroke-width="${7 * s}" stroke-linecap="round"/>` +
      `<ellipse cx="${x + 18 * s}" cy="${y - 60 * s}" rx="${7 * s}" ry="${11 * s}" fill="${P.warn}" transform="rotate(-38 ${x + 18 * s} ${y - 60 * s})"/>` +
      `<rect x="${x - w / 2}" y="${y}" width="${w}" height="${h}" rx="${12 * s}" fill="${P.ink2}" stroke="${P.ink}" stroke-width="2.5"/>` +
      `<rect x="${x - w / 2 - 10 * s}" y="${y - 4 * s}" width="${w + 20 * s}" height="${12 * s}" rx="${6 * s}" fill="${P.ink}"/>` +
      `<ellipse cx="${x}" cy="${y + 2 * s}" rx="${w / 2 - 6 * s}" ry="${7 * s}" fill="${P.danger}"/>` +
      `<rect x="${x - w / 2 - 22 * s}" y="${y + 18 * s}" width="${14 * s}" height="${10 * s}" rx="${4 * s}" fill="${P.ink}"/>` +
      `<rect x="${x + w / 2 + 8 * s}" y="${y + 18 * s}" width="${14 * s}" height="${10 * s}" rx="${4 * s}" fill="${P.ink}"/>`;
  };

  const ideaPic = svg(600, 300, 'A loop in the kitchen. The cook asks: is the sauce thick yet? If not, stir once and come back to the question. If yes, serve. The question is asked before every stir.',
    box(196, 20, 208, 64, P.warnT, 32) + T(300, 48, 'Thick yet?', { s: 18 }) + T(300, 70, 'asked before every stir', { s: 11.5, w: 700, f: P.ink2 }) +
    // no: down to the pot
    arrow(240, 92, 160, 150, P.danger, 3) + T(178, 112, 'no', { s: 14, f: P.danger }) +
    box(40, 150, 220, 128, P.white, 16) + pot(110, 210, 0.8) + T(206, 205, 'stir', { s: 16 }) + T(206, 226, 'once', { s: 16 }) +
    // back up to the question
    `<path d="M48 168 C 14 120, 60 40, 186 50" fill="none" stroke="${P.accent}" stroke-width="3" stroke-dasharray="7 6"/>` +
    `<path d="M188 50 L174 42 L176 58 Z" fill="${P.accent}"/>` + T(92, 126, 'again', { s: 13, f: P.accent }) +
    // yes: serve
    arrow(360, 92, 440, 150, P.ok, 3) + T(424, 112, 'yes', { s: 14, f: P.ok }) +
    box(340, 150, 220, 128, P.okT, 16) + T(450, 200, 'Serve it', { s: 18, f: P.ok }) + T(450, 226, 'the loop is over', { s: 12.5, w: 700, f: P.ink2 }) +
    T(450, 250, 'the next line runs', { s: 12.5, w: 700, f: P.ink2 }));

  const stir = [
    'stirs = 0                # 1. set it, before the loop',
    'while stirs < 5:         # 2. check it, before every round',
    '    stirs += 1           # 3. change it, toward False',
    '    print(f"Stir {stirs}")',
    'print(f"{stirs} stirs. The sauce is thick.")'
  ];

  // Trace table: what the loop sees at each check.
  const trace = [[0, true], [1, true], [2, true], [3, true], [4, true], [5, false]];
  const tracePic = svg(600, 300, 'A trace table for stir.py. At check 1 stirs is 0, stirs < 5 is True, so it stirs and stirs becomes 1. The same for checks 2 to 5. At check 6 stirs is 5, stirs < 5 is False, so the loop ends. Six checks, five stirs.',
    box(14, 10, 572, 278, P.white, 16) +
    T(70, 40, 'CHECK', { s: 12, f: P.ink2 }) + T(180, 40, 'stirs is', { s: 12, f: P.ink2 }) + T(320, 40, 'stirs < 5', { s: 12, f: P.ink2, m: true }) + T(470, 40, 'SO', { s: 12, f: P.ink2 }) +
    trace.map(([v, yes], i) => {
      const y = 52 + i * 36;
      return `<rect x="30" y="${y}" width="540" height="30" rx="8" fill="${yes ? P.paper2 : P.dangerT}"/>` +
        T(70, y + 21, String(i + 1), { s: 15 }) + T(180, y + 21, String(v), { s: 16, m: true }) +
        T(320, y + 21, yes ? 'True' : 'False', { s: 15, m: true, f: yes ? P.ok : P.danger }) +
        T(470, y + 21, yes ? `stir, stirs becomes ${v + 1}` : 'stop, go on below', { s: 13, w: 700, f: yes ? P.ink : P.danger });
    }).join('') +
    T(300, 278, '6 checks, 5 stirs: the last check is the one that says no', { s: 12.5, w: 700, f: P.ink2 }));

  const codePic = `<div style="width:100%;min-width:0">${run(stir, { title: 'stir.py' })}${tracePic}</div>`;

  const forever = [
    'stirs = 0',
    'while stirs < 5:',
    '    print(f"Stir {stirs}")',
    'print("The sauce is thick.")'
  ];
  const sixStirs = [
    'stirs = 0',
    'while stirs <= 5:        # at most 5, so 5 gets a round too',
    '    stirs += 1',
    '    print(f"Stir {stirs}")',
    'print(f"{stirs} stirs. The sauce is thick.")'
  ];
  const painPic = `<div style="width:100%;min-width:0">` +
    code(forever, { title: 'stir.py, the change line is missing', bad: [2] }) +
    term(['$ python3 stir.py', 'Stir 0', 'Stir 0', 'Stir 0', 'Stir 0', '# ... thousands of lines, until you press Ctrl+C', '^CTraceback (most recent call last):', '  File "stir.py", line 3, in <module>', '    print(f"Stir {stirs}")', '    ~~~~~^^^^^^^^^^^^^^^^^', 'KeyboardInterrupt'], 'terminal') +
    code(sixStirs, { title: 'stir.py, one sign different', bad: [2] }) +
    term(['$ python3 stir.py', 'Stir 1', 'Stir 2', 'Stir 3', 'Stir 4', 'Stir 5', 'Stir 6', '6 stirs. The sauce is thick.'], 'terminal') + `</div>`;

  const boil = [
    'temp_c = 20     # cold water from the tap',
    'minutes = 0',
    'step_c = 12     # degrees per minute. Try 8, then 50.',
    '',
    'while temp_c < 100:',
    '    minutes += 1',
    '    temp_c += step_c',
    '    print(f"Minute {minutes}: {temp_c} °C")',
    '',
    'print(f"It boils after {minutes} minutes.")'
  ];
  const ask = [
    'answer = input("How many scoops for Chloe? ").strip()',
    'while not answer.isdigit():',
    '    print("Please type a number, like 2.")',
    '    answer = input("How many scoops for Chloe? ").strip()',
    '',
    'scoops = int(answer)',
    'print(f"{scoops} scoops of ice cream for Chloe. Coming up!")'
  ];
  const tryPic = `<div style="width:100%;min-width:0">${run(boil, { title: 'boil.py' })}${run(ask, { title: 'scoops.py', inputs: ['', 'lots', '3'] })}</div>`;

  const cookies = [
    'cookies = 0        # the box holds 12',
    'while cookies < 12:',
    '    cookies += 5   # a tray of 5 goes in',
    '    print(f"Box has {cookies} cookies")',
    'print(f"Lid on, with {cookies} cookies.")'
  ];
  const cookiesFixed = [
    'cookies = 0',
    'while cookies + 5 <= 12:   # room for a whole tray?',
    '    cookies += 5',
    '    print(f"Box has {cookies} cookies")',
    'print(f"Lid on, with {cookies} cookies.")'
  ];
  const catchPic = `<div style="width:100%;min-width:0">` +
    code(cookies, { title: 'cookie_box.py', bad: [3] }) +
    term(['$ python3 cookie_box.py', 'Box has 5 cookies', 'Box has 10 cookies', 'Box has 15 cookies', 'Lid on, with 15 cookies.', '# 15 cookies in a box for 12. Three fall on the floor.'], 'terminal') +
    code(cookiesFixed, { title: 'cookie_box.py, ask the right question', good: [2] }) +
    term(['$ python3 cookie_box.py', 'Box has 5 cookies', 'Box has 10 cookies', 'Lid on, with 10 cookies.'], 'terminal') + `</div>`;

  COURSE.add({
    id: 'l25', minutes: 12,
    summary: 'A <b>loop</b> runs the same lines again and again. <code>while stirs &lt; 5:</code> asks its question <b>before every round</b>. True: run the lines pushed in under it, then come back and ask again. False: the loop is over. A safe loop has <b>three parts</b>: <b>set</b> a jar before it, <b>check</b> the jar in the question, and <b>change</b> the jar inside, so the answer turns False one day.',
    video: {
      src: 'videos/l25-while.mp4', poster: 'videos/l25-while.jpg', length: '1 min 12 s',
      script: [
        'A sauce bubbles on your stove. Before every stir, you check. Is it thick yet? No? Stir again.',
        'In Python, that is a while loop. While stirs is less than 5, run the lines pushed in under it. The question is asked at the top of every round.',
        'Three parts keep it safe. Stirs starts at 0, before the loop. The question uses it. And stirs plus equals 1 moves it toward the end. 1, 2, 3, 4, 5. 5 is not less than 5, so the loop stops.',
        'Water warms 12 degrees a minute, from 20. 32, 44, 56. After 7 minutes it reaches 104, and the gate closes.',
        'Now forget the change line. Stirs stays at 0, so the question stays True, and the spoon spins forever. Press Stop. In VS Code, press Control C.',
        'Put the line back, and the sauce is done.',
        'Set it, check it, change it. A while loop repeats until its question turns False.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Stir until it thickens.',
        text: [
          'A tomato sauce bubbles on your stove for Ben\'s bean chili. The recipe does not say "stir 23 times". It says <b>stir until it thickens</b>. You do not know the number in advance.',
          'So you do it in rounds. Before every stir you <b>check</b>: is it thick yet? No? Stir once, then check again. Yes? Stop stirring and serve.',
          'Until now, every line of a program ran <b>once</b>, or not at all with <code>if</code> (lesson 19). A <b>loop</b> runs the same lines <b>again and again</b>. Python\'s first loop is <code>while</code>: keep going <b>while</b> the answer to a question is True.'
        ]
      },
      {
        label: 'The code', pic: codePic,
        h: 'while: an if that comes back.',
        text: [
          '<code>while stirs &lt; 5:</code> looks like an <code>if</code>: a question, a <b>colon</b>, and lines pushed in by 4 spaces. The difference comes at the end of the pushed-in lines. An <code>if</code> moves on. A <code>while</code> goes <b>back to the top</b> and asks its question again.',
          'Each trip through the pushed-in lines is called a <b>round</b>. The question is asked <b>before every round</b>. As soon as the answer is False, Python skips the pushed-in lines and carries on with the first line back at the left edge.',
          'A safe loop has <b>three parts</b>, marked 1, 2 and 3 in the comments. <b>Set</b> the jar before the loop. <b>Check</b> it in the question. <b>Change</b> it inside, so the answer moves toward False. <code>stirs += 1</code> from lesson 11 does the change.',
          'Press <b>Run</b>. Then follow the table under the code: one row per check. The question is asked <b>6 times</b>, but the sauce is stirred only <b>5 times</b>. The last check is the one that says no. Change <code>5</code> to <code>3</code> and run it again.'
        ],
        tip: 'Tracing a loop with a little table like this is what programmers really do when a loop surprises them. One row per check: the jar, the question, and what happens.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'A loop that never ends, and a loop that runs once too often.',
        text: [
          'In the first program the <b>change line is missing</b>. <code>stirs</code> starts at 0 and nothing ever changes it. So <code>stirs &lt; 5</code> is True at every check, and the loop never ends. This is an <b>infinite loop</b>. The spoon spins forever and the sauce is never served.',
          'Python does not see anything wrong. Every line is fine on its own. It just prints <code>Stir 0</code> again and again, thousands of times a second, until <b>you</b> stop it. In a terminal, press <b>Ctrl+C</b>. Python stops and prints <code>KeyboardInterrupt</code>: "the keyboard interrupted me". The <code>^C</code> in front is your key press.',
          'The second program has a smaller bug. One sign changed: <code>&lt;=</code> instead of <code>&lt;</code>. Now 5 also gets a round, and the sauce is stirred <b>6 times</b>. Being off by exactly one round is so common that it has a name: an <b>off-by-one</b> error. Remember the edge from lesson 21: <code>&lt;=</code> lets the edge in.'
        ],
        warn: 'An infinite loop is not a crash. Your computer is fine. The program is just very busy doing the same thing forever. Stop it, then look for the missing change line.'
      },
      {
        label: 'The fix', pic: run(forever, { title: 'stir.py' }),
        h: 'Stop it, then add the change line.',
        text: [
          'Try the broken loop yourself. Nothing on this page can freeze. Press <b>Run</b> and watch <code>Stir 0</code> pour out. While it runs, the Run button turns into a red <b>Stop</b> button. Press it. If you do nothing, the page stops the program by itself after <b>10 seconds</b> and says so.',
          'Now fix it. Add <code>stirs += 1</code> as the <b>first line inside</b> the loop, above the <code>print</code>, pushed in by 4 spaces like it. Run it again. You get <code>Stir 1</code> to <code>Stir 5</code>, and the sauce is thick.',
          'For an off-by-one, check the <b>edges</b>. Ask: what is the jar at the first check, and what is it at the check that says no? <code>stirs</code> goes 0, 1, 2, 3, 4 with True, then 5 with False. That is 5 rounds. Or count with a table, like the one in The code.'
        ],
        tip: 'In VS Code the program runs in the terminal at the bottom. If it never ends, click in that terminal and press <b>Ctrl+C</b>. That works on a Mac too: Control, not Command.'
      },
      {
        label: 'Try it', pic: tryPic,
        h: 'Boil the water. Ask until the answer makes sense.',
        text: [
          '<b>boil.py</b>: cold tap water is 20 °C, and on this stove it warms <b>12 °C a minute</b>. How many minutes until it boils at 100 °C? That is the kind of question <code>while</code> is made for: you do not know the count, you know <b>when to stop</b>. Press Run: 7 minutes.',
          'Now change <code>step_c</code> to <code>8</code> and run it: 10 minutes, landing exactly on 100. Then try <code>50</code>: 2 minutes. Then try <code>0</code> and see what happens. You know how to stop it now.',
          '<b>scoops.py</b>: Chloe can type anything, so you keep asking <b>until</b> the answer is a number. <code>.isdigit()</code> is one more text tool like the ones in lesson 9: it gives True when the text is only digits, 0 to 9, and False for empty text. Three ready-made answers are waiting: nothing, <code>lots</code> and <code>3</code>. Press Run and watch the loop ask 3 times. The ready-made answers are used first, then the page asks you. In VS Code you type every answer yourself.'
        ],
        tip: 'Notice the three parts again. <b>Set</b>: the first <code>input()</code> fills <code>answer</code> before the loop. <b>Check</b>: <code>not answer.isdigit()</code>. <b>Change</b>: a new <code>input()</code> inside the loop. Forget that last line and Chloe is asked nothing while the loop spins forever.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'while checks at the top, never in the middle.',
        text: [
          'You fill a cookie box that holds <b>12</b>, one tray of <b>5</b> at a time. The loop says <code>while cookies &lt; 12:</code>. At 10 the question is still True, so another tray goes in. Now the box "has" 15. The loop only finds out at the <b>next</b> check, when it is too late.',
          '<code>while</code> asks its question <b>only at the top</b> of each round. Inside the round, all the pushed-in lines run, even if the jar went past the edge halfway through. The boiling water did the same: it went from 92 straight to 104. Real water stops at 100, but the counter only adds 12 at a time.',
          'The fix is to ask the right question <b>before</b> the round: "is there room for a whole tray?" <code>while cookies + 5 &lt;= 12:</code> stops at 10, and the box closes with nothing on the floor.'
        ],
        warn: 'Sometimes you really want to stop in the middle of a round, for example as soon as the right answer arrives. Python has a word for that, <code>break</code>, often used with <code>while True:</code>. That is lesson 28, break and continue. Next comes lesson 26, for loops: "for each guest at the table".'
      }
    ],
    exercises: [
      {
        file: 'l25_training_plan.py', title: 'Ana\'s training plan',
        task: 'Ana\'s long run is <b>10 km</b> this week, and she adds <b>2 km</b> every week. Use a <code>while</code> loop to print each week\'s distance until it reaches <b>at least 21 km</b>, the half-marathon distance. Then print how many weeks it took. The exact 8 lines are in the comment at the top of the file.',
        steps: [
          'Press <b>Open in VS Code</b>. Read the comment at the top: it shows the 8 lines your program must print.',
          'Between the <code>START</code> and <code>END</code> lines, write the loop: <code>while km &lt; 21:</code>, and inside it add 1 to <code>weeks</code>, add 2 to <code>km</code>, and print the week with an f-string. Save the file.',
          'Run it. The check runs your lines with a <b>5 second limit</b>, so a loop that never ends gets stopped and you get a hint. Then it says <code>PASS</code> or gives you one hint.',
          'Leave the 3 lines near the top that start the check. They are what stops a runaway loop.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'How many times does this print <code>Stir</code>?',
        pic: code(['stirs = 0', 'while stirs < 3:', '    print("Stir")', '    stirs += 1'], { title: 'stir.py' }),
        options: ['2', '3', '4', 'It never stops'],
        answer: 1,
        why: 'The checks see 0, 1 and 2 (True each time), then 3 (False). That is 3 rounds, so 3 stirs.',
        hint: 'Make a little table: what is <code>stirs</code> at each check, and is <code>stirs &lt; 3</code> True?'
      },
      {
        type: 'order', q: 'Put the lines in order so the program prints <code>Stir 1</code> to <code>Stir 5</code>, then <code>Thick!</code>.',
        items: ['stirs = 0', 'while stirs < 5:', '    stirs += 1', '    print(f"Stir {stirs}")', 'print("Thick!")'],
        why: 'Set the jar, then the question. Inside: change first, so the first print shows 1. <code>print("Thick!")</code> is back at the left edge, so it runs once, after the loop.',
        hint: 'The first print must show 1, and the jar starts at 0. Which pushed-in line goes first?'
      },
      {
        type: 'pick', q: 'Ben has eaten <b>110 g</b> of protein today. Each scoop of his shake adds <b>10 g</b>. How many scoops does this program count?',
        pic: code(['protein_g = 110', 'scoops = 0', 'while protein_g < 140:', '    protein_g += 10', '    scoops += 1', 'print(scoops)'], { title: 'shake.py' }),
        options: ['4', '14', '3', '2'],
        answer: 2,
        why: '110, 120, 130 are less than 140, so three rounds run. After the third, <code>protein_g</code> is 140, and <code>140 &lt; 140</code> is False. 3 scoops.',
        hint: 'Trace it: 110, then 120, then 130, then 140. At which value does the question say no?'
      },
      {
        type: 'fix', q: 'This loop never ends. The water warms <b>16 °C</b> a minute. Add the missing change line so it prints the minutes and then <code>It boils after 5 minutes.</code>',
        code: ['temp_c = 20', 'minutes = 0', 'while temp_c < 100:', '    minutes += 1', '    print(f"Minute {minutes}")', 'print(f"It boils after {minutes} minutes.")'],
        title: 'boil.py',
        check: [
          'lines = out.splitlines()',
          'if lines and lines[-1] == "It boils after 5 minutes.":',
          '    ok = temp_c >= 100 and minutes == 5',
          '    msg = "" if ok else "Keep temp_c starting at 20 and minutes at 0."',
          'elif lines and lines[-1].startswith("It boils after"):',
          '    msg = "The loop ends now, well done. But it took " + str(minutes) + " minutes. The water warms 16 degrees a minute: temp_c += 16."',
          'else:',
          '    msg = "The last line should be: It boils after 5 minutes."'
        ].join('\n'),
        why: 'The question uses <code>temp_c</code>, so the loop must change <code>temp_c</code>. With <code>temp_c += 16</code> it goes 36, 52, 68, 84, 100, and at 100 the question <code>temp_c &lt; 100</code> is False. The loop ends.',
        hint: 'Which jar does the question look at? Nothing inside the loop changes it. Add <code>    temp_c += 16</code> inside the loop.'
      },
      {
        type: 'fix', q: 'Chloe wants to taste <b>4</b> gluten-free desserts, but this only serves 3. Fix it so it prints <code>Taste dessert 1</code> to <code>Taste dessert 4</code>.',
        code: ['dessert = 1', 'while dessert < 4:', '    print(f"Taste dessert {dessert}")', '    dessert += 1'],
        title: 'desserts.py',
        check: [
          'lines = out.splitlines()',
          'want = ["Taste dessert 1", "Taste dessert 2", "Taste dessert 3", "Taste dessert 4"]',
          'if lines == want:',
          '    ok = True',
          'elif len(lines) == 3:',
          '    msg = "Still 3. The jar starts at 1, so the check at 4 must still say yes."',
          'elif len(lines) == 5:',
          '    msg = "Now 5, one too many. Check the edge again."',
          'else:',
          '    msg = "It printed " + str(len(lines)) + " lines. You want exactly the 4 lines Taste dessert 1 to Taste dessert 4."'
        ].join('\n'),
        why: 'An off-by-one. The jar starts at 1, so you need the rounds 1, 2, 3 and 4. <code>dessert &lt;= 4</code> lets 4 in. <code>dessert &lt; 5</code> works too.',
        hint: 'At the check where <code>dessert</code> is 4, the question must say True. Which sign lets the edge in (lesson 21)?'
      },
      {
        type: 'bucket', q: 'Does this loop end, or run forever? Each one shows the start, the question, and the change inside.',
        buckets: ['Ends', 'Runs forever'],
        items: [
          ['x = 0, while x < 5, x += 1', 0],
          ['x = 10, while x > 0, x -= 2', 0],
          ['x = 1, while x < 100, x *= 2', 0],
          ['x = 0, while x < 5, x -= 1', 1],
          ['x = 0, while x != 5, x += 2', 1],
          ['x = 0, while x < 100, x *= 2', 1]
        ],
        why: 'A loop ends only if the change moves the jar <b>toward False</b> and actually gets there. <code>x -= 1</code> moves away from 5. <code>x += 2</code> from 0 goes 2, 4, 6, 8 and jumps over 5, so <code>x != 5</code> stays True. And 0 times 2 is still 0.',
        hint: 'Write the first few values of x. Do they ever make the question False?'
      },
      {
        type: 'pick', q: 'Back to lesson 14. The guest types <code>3</code> and presses Enter. What happens?',
        pic: code(['answer = input("How many guests? ")', 'while answer != 3:', '    answer = input("How many guests? ")', 'print("Table for", answer)'], { title: 'guests.py' }),
        options: ['It prints Table for 3', 'It keeps asking, forever, whatever the guest types', 'It stops with a TypeError', 'It asks once more, then prints Table for 3'],
        answer: 1,
        why: '<code>input()</code> always gives <b>text</b>. The text <code>"3"</code> is never the same as the number <code>3</code>, so <code>answer != 3</code> is always True. Compare with <code>"3"</code>, or convert with <code>int()</code> (lesson 13).',
        hint: 'What type does <code>input()</code> hand back? Is <code>"3" != 3</code> True or False?'
      },
      {
        type: 'pick', q: 'The cookie box holds 12. How many cookies are in it when the lid goes on?',
        pic: code(['cookies = 0', 'while cookies < 12:', '    cookies += 4', 'print("Lid on with", cookies)'], { title: 'cookie_box.py' }),
        options: ['16', '8', '12', '4'],
        answer: 2,
        why: 'The checks see 0, 4 and 8 (True), then 12 (False). Trays of 4 fit exactly. With trays of 5 it would end at 15: the question is only asked at the top of each round.',
        hint: 'Trace it: 0, 4, 8, ... When is <code>cookies &lt; 12</code> False?'
      }
    ]
  });
})();
