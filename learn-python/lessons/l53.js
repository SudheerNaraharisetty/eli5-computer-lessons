/* Lesson 53: try and except (module 5). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l53  try and except
     ===================================================================== */

  // A plate seen from the side.
  const plate = (x, y, col) =>
    `<ellipse cx="${x}" cy="${y}" rx="36" ry="11" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<ellipse cx="${x}" cy="${y - 3}" rx="18" ry="5" fill="${col || P.warnT}" stroke="${P.ink}" stroke-width="2"/>`;
  // A net hanging between two points: a deep curve with strands.
  const net = (x, y, w, depth, col) => {
    let s = `<path d="M${x} ${y} Q${x + w / 2} ${y + depth * 2} ${x + w} ${y}" fill="${P.paper2}" stroke="${col}" stroke-width="3"/>`;
    for (let i = 1; i < 6; i++) {
      const px = x + (w * i) / 6, t = i / 6, py = y + 2 * depth * 2 * t * (1 - t);
      s += `<line x1="${px}" y1="${y}" x2="${px}" y2="${py}" stroke="${col}" stroke-width="1.5" opacity="0.7"/>`;
    }
    s += `<path d="M${x + w * 0.08} ${y + depth * 0.35} Q${x + w / 2} ${y + depth * 1.25} ${x + w * 0.92} ${y + depth * 0.35}" fill="none" stroke="${col}" stroke-width="1.5" opacity="0.7"/>`;
    s += `<circle cx="${x}" cy="${y}" r="5" fill="${col}"/><circle cx="${x + w}" cy="${y}" r="5" fill="${col}"/>`;
    return s;
  };
  // A small beetle: the hidden bug.
  const bug = (x, y) =>
    `<g stroke="${P.ink}" stroke-width="2" stroke-linecap="round"><path d="M${x - 14} ${y - 6} l-8 -5 M${x - 14} ${y + 2} l-9 0 M${x - 12} ${y + 8} l-7 6 M${x + 14} ${y - 6} l8 -5 M${x + 14} ${y + 2} l9 0 M${x + 12} ${y + 8} l7 6"/></g>` +
    `<ellipse cx="${x}" cy="${y + 2}" rx="15" ry="12" fill="${P.danger}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<circle cx="${x}" cy="${y - 13}" r="7" fill="${P.ink}"/>` +
    `<line x1="${x}" y1="${y - 9}" x2="${x}" y2="${y + 13}" stroke="${P.ink}" stroke-width="2"/>`;

  const ideaSvg = svg(600, 300, 'Two kitchens. Left, with no net: a plate slides off the counter, smashes on the floor, and the rest of the plan never runs. Right, with try and except: a net labelled except ValueError hangs under the counter edge, the plate lands in it, and the program carries on.',
    T(150, 24, 'NO NET', { s: 13, f: P.danger }) + T(450, 24, 'try ... except ValueError', { s: 13, m: true, f: P.ok }) +
    `<line x1="300" y1="14" x2="300" y2="292" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    // left kitchen
    box(20, 78, 150, 22, P.sand, 6) + `<rect x="34" y="100" width="122" height="168" fill="${P.paper2}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<path d="M172 70 Q214 74 226 150" fill="none" stroke="${P.danger}" stroke-width="2.5" stroke-dasharray="6 6"/>` +
    `<line x1="14" y1="270" x2="286" y2="270" stroke="${P.ink}" stroke-width="3"/>` +
    `<path d="M200 268 l10 -12 l8 10 z M222 268 l14 -9 l4 9 z M244 268 l6 -14 l10 14 z" fill="${P.white}" stroke="${P.ink}" stroke-width="2"/>` +
    box(186, 196, 100, 30, P.dangerT, 8) + T(236, 216, 'crash', { s: 13, f: P.danger }) +
    T(96, 126, 'the rest of', { s: 12, w: 700, f: P.ink2 }) + T(96, 144, 'the plan', { s: 12, w: 700, f: P.ink2 }) +
    T(96, 162, 'never runs', { s: 12, w: 700, f: P.danger }) +
    plate(132, 68) +
    // right kitchen
    box(320, 78, 150, 22, P.sand, 6) + `<rect x="334" y="100" width="122" height="168" fill="${P.paper2}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<line x1="314" y1="270" x2="586" y2="270" stroke="${P.ink}" stroke-width="3"/>` +
    `<path d="M472 70 Q510 74 524 138" fill="none" stroke="${P.ok}" stroke-width="2.5" stroke-dasharray="6 6"/>` +
    net(478, 130, 104, 26, P.ok) + plate(530, 150) +
    T(530, 214, 'except ValueError', { s: 12.5, m: true, f: P.ok }) +
    box(476, 228, 110, 30, P.okT, 8) + T(531, 248, 'caught', { s: 13, f: P.ok }) +
    T(396, 126, 'the program', { s: 12, w: 700, f: P.ink2 }) + T(396, 144, 'carries on', { s: 12, w: 700, f: P.ok }) +
    plate(432, 68, P.okT));

  const coach = [
    'servings = int(input("How many servings? "))',
    'print(f"Pasta: {servings * 100} g")',
    'print(f"Sauce: {servings * 80} g")',
    'print("Plan ready. Enjoy the evening!")'
  ];
  const ideaPic = `<div style="width:100%;min-width:0">${ideaSvg}` +
    code(coach, { title: 'coach.py', bad: [1] }) +
    term(['$ python3 coach.py', 'How many servings? two', 'Traceback (most recent call last):', '  File "coach.py", line 1, in <module>', '    servings = int(input("How many servings? "))', "ValueError: invalid literal for int() with base 10: 'two'"], 'terminal') + `</div>`;

  // The code: one try, then a loop that asks again.
  const once = [
    'answer = input("How many servings? ")',
    'try:',
    '    servings = int(answer)',
    'except ValueError:',
    '    print(f"\'{answer}\' is not a number. Cooking for 2.")',
    '    servings = 2',
    '',
    'print(f"Pasta: {servings * 100} g. The evening goes on.")'
  ];
  const again = [
    'while True:',
    '    answer = input("How many servings? ")',
    '    try:',
    '        servings = int(answer)',
    '        break',
    '    except ValueError:',
    '        print("Please type a number, like 4.")',
    '',
    'print(f"Cooking for {servings}. Pasta: {servings * 100} g.")'
  ];
  const flowPic = svg(600, 176, 'How Python runs try and except. It runs the line under try. No error: it skips the except block and goes on after it. A ValueError: it jumps straight to the except block, runs it, and then goes on after it.',
    box(20, 20, 220, 52, P.white, 12) + T(130, 44, 'try:', { s: 14, m: true }) + T(130, 62, 'servings = int(answer)', { s: 12, m: true, f: P.ink2 }) +
    box(20, 112, 220, 52, P.warnT, 12) + T(130, 136, 'except ValueError:', { s: 14, m: true }) + T(130, 154, 'plan B', { s: 12, w: 700, f: P.ink2 }) +
    box(400, 66, 180, 52, P.okT, 12) + T(490, 90, 'the next line', { s: 14 }) + T(490, 108, 'after the block', { s: 12, w: 700, f: P.ink2 }) +
    arrow(244, 46, 394, 80, P.ok, 3) + T(318, 40, 'no error:', { s: 12.5, f: P.ok }) + T(318, 56, 'skip except', { s: 12.5, w: 700, f: P.ok }) +
    arrow(70, 76, 70, 106, P.danger, 3) + T(84, 96, 'ValueError: jump', { s: 12.5, f: P.danger, a: 'start' }) +
    arrow(244, 138, 394, 104, P.ink2, 3) + T(318, 152, 'then go on', { s: 12.5, w: 700, f: P.ink2 }));
  const codePic = `<div style="width:100%;min-width:0">${run(once, { title: 'servings.py', inputs: ['two'] })}${flowPic}${run(again, { title: 'ask_again.py', inputs: ['two', '3'] })}</div>`;

  // The pain: a giant net hides a typo.
  const giant = [
    'while True:',
    '    answer = input("How many servings? ")',
    '    try:',
    '        servings = int(anwser)',
    '        break',
    '    except:',
    '        print("Please type a number, like 4.")',
    '',
    'print(f"Cooking for {servings}.")'
  ];
  const giantSvg = svg(600, 220, 'A giant net labelled except, with no error type, hangs under the counter. It caught the plate, the ValueError you expected, and also a bug, a NameError from a misspelt name. A magnifying glass shows the NameError hiding in the net.',
    box(20, 40, 150, 22, P.sand, 6) + `<rect x="34" y="62" width="122" height="146" fill="${P.paper2}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<line x1="14" y1="210" x2="586" y2="210" stroke="${P.ink}" stroke-width="3"/>` +
    net(180, 70, 400, 50, P.danger) +
    T(380, 64, 'except:   catches every error', { s: 13, m: true, f: P.danger }) +
    plate(270, 112) + T(270, 146, 'ValueError', { s: 12, m: true, f: P.ink2 }) +
    bug(420, 116) +
    `<circle cx="470" cy="150" r="40" fill="${P.white}" fill-opacity="0.9" stroke="${P.ink}" stroke-width="4"/>` +
    `<line x1="498" y1="178" x2="530" y2="206" stroke="${P.ink}" stroke-width="8" stroke-linecap="round"/>` +
    T(470, 147, 'Name', { s: 13, m: true, f: P.danger }) + T(470, 164, 'Error', { s: 13, m: true, f: P.danger }) +
    T(96, 100, 'a real bug,', { s: 12, w: 700, f: P.ink2 }) + T(96, 118, 'hidden', { s: 12, w: 700, f: P.danger }));
  const painPic = `<div style="width:100%;min-width:0">${run(giant, { title: 'ask_again.py', inputs: ['two', '3'] })}${giantSvg}</div>`;

  // The fix: a small net, right under the risky line.
  const small = giant.slice(); small[5] = '    except ValueError:';
  const sizePic = svg(600, 150, 'Two ways to hang the net. Left, too big: try around many lines with a bare except, so any error in any line is caught and hidden. Right, just right: try around the one int() line, with except ValueError, so only the expected error is caught.',
    box(20, 14, 270, 124, P.dangerT, 14) + T(155, 40, 'TOO BIG', { s: 13, f: P.danger }) +
    T(40, 66, 'try:', { s: 13, m: true, a: 'start' }) + T(40, 86, '    20 lines of code', { s: 13, m: true, f: P.ink2, a: 'start' }) +
    T(40, 106, 'except:', { s: 13, m: true, f: P.danger, a: 'start' }) + T(40, 126, 'hides every bug inside', { s: 12, w: 700, f: P.danger, a: 'start' }) +
    box(310, 14, 270, 124, P.okT, 14) + T(445, 40, 'JUST RIGHT', { s: 13, f: P.ok }) +
    T(330, 66, 'try:', { s: 13, m: true, a: 'start' }) + T(330, 86, '    int(answer)', { s: 13, m: true, f: P.ink2, a: 'start' }) +
    T(330, 106, 'except ValueError:', { s: 13, m: true, f: P.ok, a: 'start' }) + T(330, 126, 'other bugs still show', { s: 12, w: 700, f: P.ok, a: 'start' }));
  const fixPic = `<div style="width:100%;min-width:0">${run(small, { title: 'ask_again.py', inputs: ['two', '3'] })}${sizePic}</div>`;

  // Try it: several nets, the message, and else.
  const split = [
    'pasta_g = 600',
    '',
    'while True:',
    '    answer = input("How many servings? ")',
    '    try:',
    '        servings = int(answer)',
    '        each_g = pasta_g // servings',
    '    except ValueError as err:',
    '        print(f"Not a number. Python says: {err}")',
    '    except ZeroDivisionError:',
    '        print("0 servings? Nobody to cook for.")',
    '    else:',
    '        break',
    '',
    'print(f"{servings} servings, {each_g} g of pasta each.")'
  ];

  // The catch: no error does not mean a good answer.
  const minus = [
    'pasta_g = 600',
    'answer = input("How many servings? ")',
    'try:',
    '    servings = int(answer)',
    'except ValueError:',
    '    print("Please type a number, like 4.")',
    'else:',
    '    print(f"{pasta_g // servings} g of pasta each.")'
  ];

  COURSE.add({
    id: 'l53', minutes: 13,
    summary: 'Put the risky line inside <code>try:</code>, and the plan B under <code>except ValueError:</code>. If that line raises a <b>ValueError</b>, Python jumps straight to the except block instead of crashing, and the program <b>carries on</b>. With <code>while True:</code> and <code>break</code> (lesson 28) you can <b>ask again</b> until a number arrives. <code>except ValueError as err:</code> lets you read the message, several <code>except</code> blocks catch different errors, and <code>else:</code> runs only when nothing went wrong. The rule: <b>catch the one error you expect</b>, around the one risky line. A bare <code>except:</code> catches <b>every</b> error, so it hides real bugs too.',
    video: {
      src: 'videos/l53-try-and-except.mp4', poster: 'videos/l53-try-and-except.jpg', length: '1 min 10 s',
      script: [
        'Kitchen Coach asks: how many servings? Ana types the word, two.',
        'int cannot turn a word into a number. ValueError. The program crashes, and every line after it never runs. The whole evening\'s plan, gone.',
        'So put the risky line inside try. Under it, except ValueError is a net. When that error falls, the net catches it, and the program carries on. Please type a number.',
        'Wrap it in a while True loop, and Kitchen Coach asks again. Ana types 3. Break. Cooking for 3.',
        'Now, a giant net. A bare except catches every error. But look. Answer is misspelt. That is a NameError, a real bug, and the giant net hides it. Ana types 3, and hears: please type a number. Forever.',
        'Use the small net. Catch ValueError only, around the one risky line. Now the typo shows itself. Fix it.',
        'Catch the one error you expect, as close to the risky line as you can.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'One bad answer, and the whole plan is on the floor.',
        text: [
          'Kitchen Coach asks <code>How many servings?</code> and turns the answer into a number with <code>int()</code>, as in lesson 14. Ana is tired after a long run and types the word <code>two</code>.',
          '<code>int()</code> can only read digits, so line 1 raises a <b>ValueError</b>, the exception from lesson 52. Nobody deals with it, so the program <b>crashes</b>. Lines 2, 3 and 4 never run. The pasta, the sauce and the whole evening\'s plan: gone, because of one word.',
          'A good cook does not stop cooking when a plate slips. They have a plan B. In Python the plan B is <code>try</code> and <code>except</code>: "<b>try</b> this risky step, and <b>if</b> this particular error happens, do this instead". It is a <b>net</b> under the edge of the counter. The plate lands in the net, and dinner goes on.'
        ],
        tip: 'Errors you can expect are not bugs in your code. A person typing a word instead of a number <b>will</b> happen. The question is only whether your program has a net for it.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'try the risky line. except the error you expect.',
        text: [
          '<code>try:</code> ends with a colon, and the risky line goes under it, pushed in by 4 spaces, like an <code>if</code> block. <code>except ValueError:</code> is lined up with the <code>try</code>, and the plan B goes under it.',
          'Python runs the <code>try</code> block. <b>No error?</b> It skips the except block completely and goes on. <b>A ValueError?</b> It stops that line, <b>jumps</b> straight to the except block, runs it, and then goes on after it. No crash. Press <b>Run</b> on <b>servings.py</b>: the ready-made answer is <code>two</code>, and the evening goes on with 2 servings.',
          'Now change <code>ValueError</code> on line 4 to <code>ZeroDivisionError</code> and run it again. It crashes. The net only catches the error with <b>the name on its label</b>. A ValueError falls straight past a ZeroDivisionError net. Put it back.',
          '<b>ask_again.py</b> asks until a number arrives. <code>while True:</code> with <code>break</code> is the "keep going until" loop from lesson 28. <code>break</code> sits under the <code>int()</code> line, so it only runs when <code>int()</code> <b>worked</b>. When <code>int()</code> fails, Python jumps over <code>break</code> to the except block, prints the message, and the loop asks again. Press Run: <code>two</code> is refused, <code>3</code> is accepted.'
        ],
        tip: 'Read it out loud: "try to turn the answer into a number. If that gives a ValueError, say please type a number." The code says exactly what a polite cook would do.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'A giant net catches your bugs too.',
        text: [
          'It is tempting to write just <code>except:</code>, with no error name. That is a <b>bare except</b>, and it catches <b>every</b> error. <code>except Exception:</code> is almost the same giant net. It feels safe. It is not.',
          'Look at line 4: <code>int(anwser)</code>. The name is misspelt, so this line raises a <b>NameError</b> every single time, whatever Ana types. That is a real bug. Python would normally point straight at it.',
          'But the giant net catches the NameError too, and the except block says <code>Please type a number, like 4.</code> Press <b>Run</b>. <code>two</code> is refused, fair enough. Then <code>3</code> is refused too. Type <code>5</code> into the box, or <code>12</code>. It is refused <b>forever</b>, with a message that blames Ana for your typo. Press <b>Reset</b> when you have seen enough.'
        ],
        warn: 'A bare <code>except:</code> turns a loud bug into a quiet wrong answer. A crash with a clear message takes a minute to fix. A message that lies can cost you an evening.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'A small net, right under the risky line.',
        text: [
          'Two habits keep the net honest. <b>Catch the narrowest type</b>: name the one error you expect, here <code>ValueError</code>. And <b>keep the try block small</b>: put only the risky line inside it, not the whole program.',
          'This is the same code with line 6 changed to <code>except ValueError:</code>. Press <b>Run</b>. Now the NameError is <b>not</b> caught, so Python shows it, with its usual help: <code>NameError: name \'anwser\' is not defined. Did you mean: \'answer\'?</code>',
          'Fix the typo on line 4 and run it again. <code>two</code> is refused, <code>3</code> is accepted: <code>Cooking for 3.</code> The net catches the bad answer, and only the bad answer.'
        ],
        tip: 'The fewer lines inside <code>try</code>, the fewer bugs can fall into the net by mistake. One risky line is the ideal.'
      },
      {
        label: 'Try it', pic: run(split, { title: 'split_pasta.py', inputs: ['two', '0', '4'] }),
        h: 'Several nets, the message, and else.',
        text: [
          'Kitchen Coach now shares 600 g of pasta between the servings. Two things can go wrong: a word gives a <b>ValueError</b>, and <code>0</code> servings gives a <b>ZeroDivisionError</b> on line 7. Each gets <b>its own</b> except block. Python uses the first one whose name fits.',
          '<code>except ValueError as err:</code> puts the caught error in a jar called <code>err</code>. Printing it shows Python\'s own message: <code>invalid literal for int() with base 10: \'two\'</code>. Handy when you want to know exactly what went wrong.',
          '<code>else:</code> after the except blocks runs only when <b>nothing went wrong</b> in the try block. Here it holds the <code>break</code>. So the try block keeps just the two risky lines, and the "all good, stop asking" step sits on its own.',
          'Press <b>Run</b>. Three ready-made answers: <code>two</code>, <code>0</code> and <code>4</code>. Each one takes a different path. Then add a third except block, <code>except KeyError:</code>, anywhere among the others, and check that nothing changes: a net for an error that never happens does nothing.'
        ],
        tip: 'There is also <code>finally:</code>, a block that runs <b>whatever happens</b>, error or not. It is for cleaning up, like closing a file. Lesson 57, with, shows a neater way to do that.'
      },
      {
        label: 'The catch', pic: run(minus, { title: 'minus.py', inputs: ['-1'] }),
        h: 'No error does not mean a good answer.',
        text: [
          '<code>try</code> and <code>except</code> only catch errors that Python <b>raises</b>. Press <b>Run</b>: the ready-made answer is <code>-1</code>. <code>int("-1")</code> works fine, so there is no ValueError, the net stays empty, and Kitchen Coach happily serves <code>-600 g of pasta each</code>.',
          'A number below 1 is perfectly good Python. It is just a bad answer <b>for your kitchen</b>. Python cannot know that. You check it yourself, with an <code>if</code> from lesson 19. In the <code>else</code> block, add <code>if servings &lt; 1:</code> and print a polite "At least 1 serving, please" instead.',
          'So use both tools. <code>try</code> and <code>except</code> for the errors Python raises. <code>if</code> for answers that are valid Python but wrong for your recipe.'
        ],
        warn: 'Next lesson, 54, flips it round: <b>Raising errors</b>. Your own function can refuse a bad value like <code>-1</code> by raising a ValueError itself, so the caller\'s net can catch it.'
      }
    ],
    exercises: [
      {
        file: 'l53_ask_servings.py', title: 'Ask until the answer makes sense',
        task: 'Write <code>ask_servings()</code>: it asks <code>How many servings?</code> again and again until the answer is a <b>whole number above 0</b>, then <b>returns</b> it. A word gets one friendly message, and 0 or a minus number gets another. The check pretends to be Ana and types <code>two</code>, <code>0</code>, <code>-1</code> and then <code>3</code> for you, so you do not type anything.',
        steps: [
          'Press <b>Open in VS Code</b>. Read the task at the top of the file. Run it once: the starter crashes with the ValueError from this lesson, and the check tells you so.',
          'Between <code>START</code> and <code>END</code>, add a <code>while True:</code> loop, a small <code>try</code> around <code>int()</code>, <code>except ValueError:</code> with a message, and an <code>if</code> for numbers below 1. Save the file.',
          'Run it again. The check says <code>PASS</code> or gives you one hint. After a PASS, the file asks you the question for real, so you can try your own answers in the terminal.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'The guest types <code>two</code>. What does this print after the question?',
        pic: code(['answer = input("Servings? ")', 'try:', '    servings = int(answer)', '    print("Got it.")', 'except ValueError:', '    print("Not a number.")', 'print("Next question.")'], { title: 'ask.py' }),
        options: ['Not a number. then Next question.', 'Got it. then Not a number. then Next question.', 'Only Not a number.', 'It crashes with a ValueError'],
        answer: 0,
        why: '<code>int("two")</code> fails, so Python jumps straight to the except block. The rest of the try block, <code>print("Got it.")</code>, is skipped. After the except block, the program carries on with the last line.',
        hint: 'When line 3 fails, does line 4 still run? And after the except block, does the program stop?'
      },
      {
        type: 'bucket', q: 'Back to lesson 52. Each line sits alone inside a <code>try:</code> with only <code>except ValueError:</code> under it. Which ones does the net catch?',
        buckets: ['Caught by except ValueError', 'Still crashes'],
        items: [
          ['int("two")', 0],
          ['int("2.5")', 0],
          ['float("lots")', 0],
          ['600 // 0', 1],
          ['["oats", "rice"][5]', 1],
          ['"4" + 4', 1]
        ],
        why: 'Turning text that is not a number into one gives a <b>ValueError</b>. But <code>600 // 0</code> is a ZeroDivisionError, an index past the end is an IndexError, and text plus a number is a TypeError. The net only catches the type on its label.',
        hint: 'Name the exception each line raises, as in lesson 52. Only ValueError lands in this net.'
      },
      {
        type: 'fix', q: 'Ana types <code>two</code> and this crashes. Add <code>try</code> and <code>except ValueError</code> so it prints <code>Please type a number.</code> instead, and the last line still runs.',
        code: ['answer = input("How many servings? ")', 'servings = int(answer)', 'print(f"Cooking for {servings}.")', 'print("Kitchen Coach is still running.")'],
        title: 'coach.py', inputs: ['two'],
        check: [
          'lines = out.splitlines()',
          'if "Please type a number." not in lines:',
          '    msg = "Print exactly: Please type a number.  inside the except ValueError: block."',
          'elif any(l.startswith("Cooking for") for l in lines):',
          '    msg = "Cooking for ... should not print when the answer is a word. Keep that print inside the try block, under int()."',
          'elif not lines or lines[-1] != "Kitchen Coach is still running.":',
          '    msg = "The last line should still print: Kitchen Coach is still running.  Keep it at the left edge, after the except block."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: 'Lines 2 and 3 go inside <code>try:</code>, pushed in by 4 spaces. Under it, <code>except ValueError:</code> and <code>print("Please type a number.")</code>. The last line stays at the left edge, so it runs either way.',
        hint: 'Write <code>try:</code> above line 2, push lines 2 and 3 in by 4 spaces, then add <code>except ValueError:</code> and the print under them.'
      },
      {
        type: 'fix', q: 'Kitchen Coach refuses <code>3</code>, and every other number too. Make the net small with <code>except ValueError:</code> so the real error shows itself, then fix the bug, so it prints <code>Cooking for 3.</code>',
        code: giant,
        title: 'ask_again.py', inputs: ['two', '3'],
        check: [
          'lines = out.splitlines()',
          'if not lines or lines[-1] != "Cooking for 3.":',
          '    msg = "The last line should be: Cooking for 3.  Is the name on line 4 spelt the same as on line 2?"',
          'elif lines.count("Please type a number, like 4.") != 1:',
          '    msg = "The word two should get one message, and 3 should be accepted at once."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: 'With <code>except ValueError:</code> the NameError is not caught any more, and Python says <code>Did you mean: \'answer\'?</code>. Fix <code>anwser</code> to <code>answer</code>, and the loop refuses <code>two</code> and accepts <code>3</code>.',
        hint: 'Change <code>except:</code> to <code>except ValueError:</code> and run it. Read the last line of the red box. It names the bug and even suggests the fix.'
      },
      {
        type: 'fill', q: 'Finish the loop: ask until <code>int()</code> works, show Python\'s message when it does not, and stop asking when nothing went wrong.',
        text: 'while True:\n    answer = input("Servings? ")\n    ___:\n        servings = int(answer)\n    ___ ValueError ___ err:\n        print(f"Oops: {err}")\n    ___:\n        break',
        options: ['try', 'except', 'as', 'else', 'finally', 'Exception'],
        answer: ['try', 'except', 'as', 'else'],
        why: '<code>try:</code> around the risky line, <code>except ValueError as err:</code> to catch it and keep the message in <code>err</code>, and <code>else:</code> for the step that only runs when nothing went wrong: <code>break</code>.',
        hint: 'The block that runs only when nothing went wrong is not finally.'
      },
      {
        type: 'pick', q: 'Which net is the best one for "How many servings?"',
        options: ['try around the one int() line, with except ValueError:', 'try around the whole program, with except:', 'try around the whole program, with except Exception:', 'No try at all: let it crash'],
        answer: 0,
        why: 'Catch the one error you expect, as close to the risky line as you can. The giant nets also catch your typos and other bugs and hide them behind a friendly message. No net at all crashes on the first word.',
        hint: 'Which one catches the bad answer, and nothing else?'
      },
      {
        type: 'pick', q: 'When does the <code>else:</code> block after <code>try</code> and <code>except</code> run?',
        options: ['Only when nothing in the try block raised an error', 'Only when an error was caught', 'Always, at the very end', 'Only when the except block has no name'],
        answer: 0,
        why: '<code>else</code> means "no error happened". The block that runs whatever happens is <code>finally</code>, which you meet properly with files in lesson 57.',
        hint: 'Think "try it. If it fails, except. Otherwise, else."'
      },
      {
        type: 'pick', q: 'Back to lesson 28. What is the job of <code>break</code> on line 5?',
        pic: code(again, { title: 'ask_again.py', hi: [5] }),
        options: ['Leave the loop once int() has worked', 'Skip to the next question', 'Catch the ValueError', 'Stop the whole program'],
        answer: 0,
        why: '<code>while True:</code> would ask forever. <code>break</code> is the way out. It sits right under <code>int()</code>, so Python only reaches it when <code>int()</code> did not raise an error. A ValueError jumps over it to the except block.',
        hint: 'In lesson 28, what did break do to a loop?'
      }
    ]
  });
})();
