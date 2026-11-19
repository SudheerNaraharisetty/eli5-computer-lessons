/* Lesson 24: match and case (module 2). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l24  match and case
     ===================================================================== */

  // A kitchen ticket: a code letter, and who it is for.
  const ticket = (x, y, letter, who, col) =>
    box(x, y, 104, 74, P.white, 8) +
    `<rect x="${x}" y="${y}" width="104" height="12" rx="4" fill="${col}"/>` +
    T(x + 52, y + 50, letter, { s: 28, m: true, f: col }) +
    T(x + 52, y + 68, who, { s: 11.5, w: 700, f: P.ink2 });
  // A station door at the pass.
  const door = (x, y, name, fill, col) =>
    box(x, y, 124, 74, fill, 12) + T(x + 62, y + 33, name, { s: 15, f: col }) + T(x + 62, y + 55, 'station', { s: 11.5, w: 700, f: P.ink2 });

  const ideaPic = svg(600, 300, 'Tickets come through the kitchen pass. Ana\'s ticket says P and goes to the pasta station. Ben\'s says C and goes to the chili station. Chloe\'s says R and goes to the dessert station. A ticket with an unknown code goes to the waiter.',
    `<rect x="10" y="14" width="580" height="8" rx="4" fill="${P.ink}"/>` +
    ticket(26, 34, 'P', 'Ana', P.accent) + ticket(172, 34, 'C', 'Ben', P.ok) + ticket(318, 34, 'R', 'Chloe', P.danger) + ticket(464, 34, 'Z', '???', P.mute) +
    arrow(78, 116, 78, 176, P.accent, 3) + arrow(224, 116, 224, 176, P.ok, 3) + arrow(370, 116, 370, 176, P.danger, 3) + arrow(516, 116, 516, 176, P.mute, 3) +
    door(16, 182, 'Pasta', P.tint, P.accent) + door(162, 182, 'Chili', P.okT, P.ok) + door(308, 182, 'Dessert', P.dangerT, P.danger) +
    box(454, 182, 124, 74, P.sand, 12) + T(516, 213, 'Ask the', { s: 14 }) + T(516, 233, 'waiter', { s: 14 }) + T(516, 250, 'anything else', { s: 10.5, w: 700, f: P.ink2 }) +
    T(300, 292, 'read the code, pick one station', { s: 13, w: 700, f: P.ink2 }));

  const chain = [
    'if order == "P":',
    '    print("Pasta station")',
    'elif order == "C":',
    '    print("Chili station")',
    'elif order == "R" or order == "F":',
    '    print("Dessert station")',
    'else:',
    '    print("Ask the waiter")'
  ];
  const router = [
    '# Kitchen Coach: the ticket router',
    'order = "C"  # the code on the ticket',
    '',
    'match order:',
    '    case "P":',
    '        print("Pasta station")',
    '    case "C":',
    '        print("Chili station")',
    '    case "R" | "F":',
    '        print("Dessert station")',
    '    case _:',
    '        print("Ask the waiter")'
  ];
  const codePic = `<div style="width:100%;min-width:0">${code(chain, { title: 'router.py, the elif way' })}${run(router, { title: 'router.py, the match way' })}</div>`;

  const jars = [
    'pasta = "P"',
    'chili = "C"',
    'order = "C"',
    '',
    'match order:',
    '    case pasta:',
    '        print("Pasta station")',
    '    case chili:',
    '        print("Chili station")'
  ];
  const noCatch = [
    'order = "X"  # a code nobody planned for',
    '',
    'match order:',
    '    case "P":',
    '        print("Pasta station")',
    '    case "C":',
    '        print("Chili station")',
    '',
    'print("Next ticket")'
  ];
  const painPic = `<div style="width:100%;min-width:0">` +
    code(jars, { title: 'router.py, codes kept in jars', bad: [6] }) +
    term(['$ python3 router.py', '  File "router.py", line 6', '    case pasta:', '         ^^^^^', "SyntaxError: name capture 'pasta' makes remaining patterns unreachable"], 'terminal') +
    code(noCatch, { title: 'router.py, no catch-all', bad: [3] }) +
    term(['$ python3 router.py', 'Next ticket', '# ticket X went nowhere, and nothing said so'], 'terminal') + `</div>`;

  const fixMe = [
    'pasta = "P"',
    'chili = "C"',
    'order = input("Ticket code? ").strip().upper()',
    '',
    'match order:',
    '    case pasta:',
    '        print("Pasta station")',
    '    case chili:',
    '        print("Chili station")',
    '    case _:',
    '        print("Ask the waiter")'
  ];

  const bigTable = [
    'order = "P"',
    'guests = 8  # Ana\'s running club',
    '',
    'match order:',
    '    case "P" if guests > 6:',
    '        print(f"Big pot: {guests * 100} g of pasta")',
    '    case "P":',
    '        print("Pasta station")',
    '    case "C":',
    '        print("Chili station")',
    '    case "R" | "F":',
    '        print("Dessert station")',
    '    case _:',
    '        print("Ask the waiter")'
  ];

  const rangeMatch = [
    'run_minutes = 100',
    '',
    'match run_minutes:',
    '    case _ if run_minutes > 90:',
    '        print("Large portion")',
    '    case _ if run_minutes > 45:',
    '        print("Medium portion")',
    '    case _:',
    '        print("Small portion")'
  ];
  const rangeIf = [
    'run_minutes = 100',
    '',
    'if run_minutes > 90:',
    '    print("Large portion")',
    'elif run_minutes > 45:',
    '    print("Medium portion")',
    'else:',
    '    print("Small portion")'
  ];
  const preview = [
    '# PREVIEW of lesson 36. You do not need this yet.',
    'ticket = ("pasta", 8)  # a dish and a size, together',
    '',
    'match ticket:',
    '    case ("pasta", size) if size > 6:',
    '        print(f"Big pot of pasta for {size}")',
    '    case ("pasta", size):',
    '        print(f"Pasta for {size}")'
  ];
  const catchPic = `<div style="width:100%;min-width:0">` +
    code(rangeMatch, { title: 'portion.py, forced into match', bad: [4, 6] }) +
    code(rangeIf, { title: 'portion.py, if and elif (lesson 20)', good: [3, 5] }) +
    term(['$ python3 portion.py', 'Large portion', '# both print the same. The second one reads better.'], 'terminal') +
    code(preview, { title: 'preview.py', hi: [5, 7] }) +
    term(['$ python3 preview.py', 'Big pot of pasta for 8'], 'terminal') + `</div>`;

  COURSE.add({
    id: 'l24', minutes: 11,
    summary: '<code>match</code> looks at <b>one value</b> and runs the <b>first</b> <code>case</code> that fits, like a tidy <code>if</code> / <code>elif</code> chain on the same jar. <code>case "R" | "F":</code> lets two values share a case. <code>case "P" if guests &gt; 6:</code> adds a <b>guard</b>. <code>case _:</code> catches <b>anything else</b>. The trap: a plain name with no quotes, like <code>case pasta:</code>, does not compare. It catches everything.',
    video: {
      src: 'videos/l24-match-case.mp4', poster: 'videos/l24-match-case.jpg', length: '1 min 13 s',
      script: [
        'Tickets slide through the kitchen pass. Each has a code. P for pasta, C for chili, R for rice pudding. The cook reads it and picks the station.',
        'In Python, that is match and case. Match the order, then one case per code. Python checks from the top, and the first case that fits wins.',
        'Ben\'s ticket says C. The chili station lights up.',
        'Two codes can share one door. R or F, joined by a bar, both go to dessert.',
        'A guard adds a condition. Case P, if guests is more than 6. It sits above the plain P. Ana\'s running club is 8, so they get the big pot.',
        'Case underscore means anything else. Unknown codes go to the waiter. Leave it out, and the ticket just vanishes, silently.',
        'One trap. A plain name, like case pasta, without quotes, is not a comparison. It catches every ticket, so Python stops you.',
        'One value, many fixed choices. Match picks the first case that fits.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Read the code on the ticket. Pick the station.',
        text: [
          'Tonight your kitchen has a <b>pass</b>: the counter between the stove and the dining room. Orders come through on tickets, and each ticket has a short <b>code</b>. <b>P</b> is pasta for Ana, <b>C</b> is bean chili for Ben, <b>R</b> is rice pudding for Chloe.',
          'The cook does not think hard about each ticket. They read the code and send it to <b>one station</b>. Pasta station, chili station, dessert station. A code nobody knows goes back to the waiter: "ask what they meant".',
          'That is one value checked against a few <b>fixed</b> choices. You could write it with <code>if</code> and <code>elif</code> from lesson 20. Python has a tidier tool for exactly this job: <code>match</code> and <code>case</code>.'
        ]
      },
      {
        label: 'The code', pic: codePic,
        h: 'match the value, then one case per choice.',
        text: [
          'The top box is the <code>elif</code> chain you already know. Notice how <code>order ==</code> repeats on every line. The box below does the same job with <code>match</code>.',
          '<code>match order:</code> names the value to look at. Each <code>case</code> under it holds one possible value and, pushed in again, the lines to run. Python tries the cases <b>from the top</b>, and the <b>first case that fits wins</b>, just like <code>elif</code>. The rest are skipped.',
          '<code>case "R" | "F":</code> means R <b>or</b> F. The bar <code>|</code> lets several values share one case, so rice pudding and fruit salad both go to dessert. <code>case _:</code> is the catch-all, like <code>else</code>. The underscore means <b>anything else</b>.',
          'Press <b>Run</b>. Then change <code>"C"</code> to <code>"F"</code>, and then to <code>"X"</code>. Now add a soup station: a <code>case "S":</code> line with <code>print("Soup station")</code> under it, <b>above</b> <code>case _:</code>. Run it with <code>"S"</code>.'
        ],
        tip: '<code>match</code> arrived in Python 3.10. Every Python you will meet today has it. Like <code>if</code>, the <code>match</code> line and every <code>case</code> line end with a <b>colon</b>, and the lines they own are pushed in by 4 more spaces.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'A name that catches everything, and a ticket that vanishes.',
        text: [
          'You decide to keep the codes in jars: <code>pasta = "P"</code> and <code>chili = "C"</code>. Then you write <code>case pasta:</code>. It looks like "is the order the same as the pasta jar?" It is not.',
          'In a <code>case</code>, a plain name with no quotes is a <b>capture</b>: an empty jar that <b>catches any value</b> and stores it under that name. So <code>case pasta:</code> fits every ticket, even C. Every case below it could never be reached, so Python refuses to run at all: <code>SyntaxError: name capture \'pasta\' makes remaining patterns unreachable</code>. "Unreachable" means "no ticket can ever get there".',
          'The second program has the quiet bug. There is no <code>case _:</code>, and ticket X fits no case. So <b>nothing happens</b>. No station, no error, no message. Python just moves on to the next line.'
        ],
        warn: 'If a plain-name case is the <b>last</b> case, Python does not complain at all. It quietly sends every ticket that reaches it there. Always put quotes around a text value in a <code>case</code>.'
      },
      {
        label: 'The fix', pic: run(fixMe, { title: 'router.py', inputs: ['c'] }),
        h: 'Write the value itself. End with case _.',
        text: [
          'Press <b>Run</b>. Python stops before it even asks for the code: the whole file is read first, and <code>case pasta:</code> is not allowed there.',
          'Fix it: change <code>case pasta:</code> to <code>case "P":</code> and <code>case chili:</code> to <code>case "C":</code>. A value in quotes is <b>compared</b>, exactly like <code>==</code>. Run it again. The typed answer <code>c</code> is ready for you, and <code>.strip().upper()</code> from lesson 9 turns it into <code>C</code>, so you get <code>Chili station</code>. The two jars on top are now unused, so delete them.',
          'Keep <code>case _:</code> at the <b>very end</b>. It is your safety net for codes nobody planned for. Put it anywhere else and Python stops with <code>SyntaxError: wildcard makes remaining patterns unreachable</code>.'
        ],
        tip: 'A name with a <b>dot</b> in it, like <code>codes.PASTA</code>, is compared, not captured. You will meet names with dots in later modules. For now, write the value in quotes.'
      },
      {
        label: 'Try it', pic: run(bigTable, { title: 'big_table.py' }),
        h: 'A guard for the big group.',
        text: [
          'Ana brings her running club: <b>8</b> guests. One pot is not enough. A <b>guard</b> is <code>if</code> and a question after the value: <code>case "P" if guests &gt; 6:</code>. This case fits only when the code is P <b>and</b> the guard is True.',
          'Press <b>Run</b>. You get <code>Big pot: 800 g of pasta</code>, at 100 g of dry pasta per guest. Now change <code>guests</code> to <code>4</code> and run it. The guard is False, so Python moves on, and the plain <code>case "P":</code> fits.',
          'Set <code>guests</code> back to 8. Move the two lines of the guard case <b>below</b> the plain <code>case "P":</code> and run it. Big pot never shows. The plain P case fits first, and the first fit wins. So the <b>narrow</b> case goes first, just like the narrow check in lesson 20.'
        ]
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'match is for fixed values. Ranges belong to if.',
        text: [
          '<code>match</code> shines when you compare <b>one value</b> against many <b>fixed</b> options: ticket codes, dish names, sizes S, M and L. When the question is a <b>range</b> ("more than 90 minutes") or mixes several jars, use <code>if</code> and <code>elif</code>. The first box works, but every case is <code>_</code> plus a guard. That is an <code>elif</code> chain in a costume.',
          'If you know another language, <code>match</code> looks like its <code>switch</code>. It is not quite. A <code>switch</code> only compares values. <code>match</code> checks <b>patterns</b>: the shape of a value. That is why a plain name catches: it is a pattern that fits any shape.',
          'Patterns get powerful in module 3. The last box is a <b>preview only</b>: one ticket holds a dish and a size together, and the case pulls the size out into its own jar. You will learn these round-bracket pairs in lesson 36, Tuples.'
        ],
        warn: 'Inside a <code>case</code>, keep to the forms from this lesson: text or numbers, several values joined with <code>|</code>, <code>_</code>, and a guard with <code>if</code>. Anything with a plain name in it catches values instead of comparing them.'
      }
    ],
    exercises: [
      {
        file: 'l24_ticket_router.py', title: 'The ticket router',
        task: 'The ticket code is in the jar <code>order</code>. Use <code>match</code> and <code>case</code> to print the right station for <b>5 codes</b>: P pasta, C chili, S soup, and R <b>and</b> F both dessert, in one case with <code>|</code>. Anything else prints <code>Ask the waiter</code>. The check runs your code for every code, plus some nobody planned for.',
        steps: [
          'Press <b>Open in VS Code</b>. The exact words of each line are in the comment at the top of the file.',
          'The <code>match</code> line and the pasta case are written for you. Add the other cases between the <code>START</code> and <code>END</code> lines, and finish with <code>case _:</code>. Save the file.',
          'Run it. The check tries P, C, S, R and F, and three unknown codes, then says <code>PASS</code> or gives you one hint.',
          'If Python shows a <code>SyntaxError</code> instead, read it from the bottom up (lesson 4). A missing colon or quotes are the usual cause.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'Chloe orders fruit salad. What does this print?',
        pic: code(['order = "F"', '', 'match order:', '    case "P":', '        print("Pasta station")', '    case "R" | "F":', '        print("Dessert station")', '    case _:', '        print("Ask the waiter")'], { title: 'router.py' }),
        options: ['Dessert station', 'Ask the waiter', 'Nothing', 'Pasta station'],
        answer: 0,
        why: '<code>"R" | "F"</code> means R or F. The order is F, so the second case fits, and its line runs. The catch-all is skipped.',
        hint: 'Read the bar <code>|</code> out loud as "or".'
      },
      {
        type: 'pick', q: 'Back to lesson 9. Ben typed his ticket code in small letters. What does this print?',
        pic: code(['order = "c"  # what Ben typed', '', 'match order:', '    case "C":', '        print("Chili station")', '    case _:', '        print("Ask the waiter")'], { title: 'router.py' }),
        options: ['Ask the waiter', 'Chili station', 'Both lines', 'A SyntaxError'],
        answer: 0,
        why: 'A case compares exactly, like <code>==</code> in lesson 21. <code>"c"</code> and <code>"C"</code> are different text, so only the catch-all fits. Tidy typed text first with <code>.upper()</code> from lesson 9: <code>order = input("Code? ").strip().upper()</code>.',
        hint: 'Is <code>"c" == "C"</code> True or False?'
      },
      {
        type: 'fix', q: 'Ticket X goes nowhere, silently. Add a catch-all so this prints <code>Ask the waiter</code> and then <code>Next ticket</code>.',
        code: noCatch, title: 'router.py',
        check: [
          'lines = out.splitlines()',
          'if lines == ["Ask the waiter", "Next ticket"]:',
          '    ok = order == "X"',
          '    msg = "" if ok else "Keep order as \\"X\\". The catch-all should work for any code."',
          'elif lines == ["Next ticket"]:',
          '    msg = "Still only Next ticket. Add case _: as the last case, with print(\\"Ask the waiter\\") pushed in under it."',
          'else:',
          '    msg = "It printed: " + " / ".join(lines) + ". You want exactly: Ask the waiter, then Next ticket."'
        ].join('\n'),
        why: '<code>case _:</code> as the last case catches every code the cases above did not. It must be pushed in like the other cases, and <code>print("Next ticket")</code> stays at the left edge, so it always runs.',
        hint: 'Add two lines after the chili case: <code>    case _:</code> and, 4 spaces further in, <code>print("Ask the waiter")</code>.'
      },
      {
        type: 'fix', q: 'Python refuses to run this. Fix the cases so Ben\'s ticket prints <code>Chili station</code>.',
        code: ['pasta = "P"', 'chili = "C"', 'order = "C"', '', 'match order:', '    case pasta:', '        print("Pasta station")', '    case chili:', '        print("Chili station")', '    case _:', '        print("Ask the waiter")'],
        title: 'router.py',
        check: [
          'if out.strip() == "Chili station":',
          '    ok = order == "C"',
          '    msg = "" if ok else "Keep order as \\"C\\"."',
          'elif out.strip() == "Pasta station":',
          '    msg = "Pasta station for a C ticket: a case is still catching everything. Every case needs a value in quotes."',
          'else:',
          '    msg = "It printed: " + out.strip() + ". The C ticket should go to the chili station."'
        ].join('\n'),
        why: '<code>case "P":</code> and <code>case "C":</code> compare. <code>case pasta:</code> captures: it fits any value, so the cases under it could never run, and Python stops with a SyntaxError.',
        hint: 'Write the codes themselves, in quotes: <code>case "P":</code> and <code>case "C":</code>.'
      },
      {
        type: 'fix', q: 'Ana\'s running club is 8 guests, but this never prints the big pot. Fix it so it prints <code>Big pot: 800 g of pasta</code>.',
        code: ['order = "P"', 'guests = 8', '', 'match order:', '    case "P":', '        print("Pasta station")', '    case "P" if guests > 6:', '        print(f"Big pot: {guests * 100} g of pasta")', '    case _:', '        print("Ask the waiter")'],
        title: 'big_table.py',
        check: [
          'lines = out.splitlines()',
          'if lines == ["Big pot: 800 g of pasta"]:',
          '    ok = guests == 8 and order == "P"',
          '    msg = "" if ok else "Keep order as \\"P\\" and guests at 8."',
          'elif lines == ["Pasta station"]:',
          '    msg = "Still Pasta station. The plain P case fits first, and the first fit wins. Move the guard case above it."',
          'else:',
          '    msg = "It printed: " + " / ".join(lines) + ". You want exactly one line: Big pot: 800 g of pasta."'
        ].join('\n'),
        why: 'The first case that fits wins. Put the narrow case, P with a guard, <b>above</b> the plain P case. Then 8 guests get the big pot, and 4 guests still get the pasta station.',
        hint: 'Swap the two cases: lines 7 and 8 go above lines 5 and 6.'
      },
      {
        type: 'bucket', q: 'Which tool fits each choice best?',
        buckets: ['match and case', 'if and elif'],
        items: [
          ['A ticket code: P, C or R', 0],
          ['A cup size: "S", "M" or "L"', 0],
          ['A day of the week, by name', 0],
          ['Run longer than 90 minutes', 1],
          ['Oven between 180 and 200 degrees', 1],
          ['Ben is vegetarian and wants 30 g of protein', 1]
        ],
        why: '<code>match</code> is for one value against a few fixed options. Ranges like "longer than 90" and checks that mix several jars read better as <code>if</code> and <code>elif</code>.',
        hint: 'Is it one value with a short list of exact answers, or a range or a mix of jars?'
      },
      {
        type: 'fill', q: 'Fill the blanks to finish the ticket router.',
        text: '___ order:\n    ___ "P":\n        print("Pasta station")\n    case "R" ___ "F":\n        print("Dessert station")\n    case ___:\n        print("Ask the waiter")',
        options: ['match', 'case', '|', '_', 'or', 'else', 'if'],
        answer: ['match', 'case', '|', '_'],
        why: '<code>match</code> names the value, each <code>case</code> gives a choice, <code>|</code> joins values that share a case, and <code>_</code> catches anything else. Inside a case, use <code>|</code>, not <code>or</code>.',
        hint: 'The catch-all is not <code>else</code> inside a match. It is a single character.'
      },
      {
        type: 'pick', q: 'What does <code>case pasta:</code> mean, with no quotes around <code>pasta</code>?',
        options: ['Catch any value and store it in a jar called pasta', 'Check whether the value is the same as the jar pasta', 'Check whether the value is the text "pasta"', 'Skip this case'],
        answer: 0,
        why: 'A plain name in a case is a capture. It fits <b>every</b> value. If more cases follow, Python stops with <code>SyntaxError: name capture \'pasta\' makes remaining patterns unreachable</code>. To compare, write the value itself: <code>case "P":</code>.',
        hint: 'It is the trap from The pain. Does it compare, or does it catch?'
      }
    ]
  });
})();
