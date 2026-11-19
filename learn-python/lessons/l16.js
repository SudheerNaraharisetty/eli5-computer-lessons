/* Lesson 16: None (module 1). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l16  None
     ===================================================================== */

  // A glass jar with a paper label. inside: 'none' (nothing at all), 'slip' (a blank paper slip) or a value to show.
  const jar = (x, y, w, h, label, inside, o) => {
    o = o || {};
    const cx = x + w / 2;
    let body = '';
    if (inside === 'none') {
      body = `<rect x="${cx - 36}" y="${y + h - 64}" width="72" height="48" rx="10" fill="none" stroke="${P.mute}" stroke-width="2.5" stroke-dasharray="7 6"/>`;
    } else if (inside === 'slip') {
      body = `<rect x="${cx - 38}" y="${y + h - 62}" width="76" height="46" rx="4" fill="${P.white}" stroke="${P.ink}" stroke-width="2" transform="rotate(-6 ${cx} ${y + h - 39})"/>` +
        `<path d="M${cx - 26} ${y + h - 46} h52 M${cx - 26} ${y + h - 34} h52" stroke="${P.sand}" stroke-width="2" transform="rotate(-6 ${cx} ${y + h - 39})"/>`;
    } else if (inside !== '') {
      body = `<rect x="${cx - 34}" y="${y + h - 62}" width="68" height="46" rx="10" fill="${P.white}" stroke="${P.ink}" stroke-width="2"/>` +
        T(cx, y + h - 31, inside, { s: 20, m: true, f: o.vf || P.accent });
    }
    return `<rect x="${x + 22}" y="${y}" width="${w - 44}" height="18" rx="5" fill="${P.warn}" stroke="${P.ink}" stroke-width="2.5"/>` +
      `<rect x="${x}" y="${y + 18}" width="${w}" height="${h - 18}" rx="22" fill="${o.fill || P.tint}" stroke="${P.ink}" stroke-width="2.5"/>` +
      `<rect x="${x + 10}" y="${y + 34}" width="${w - 20}" height="30" rx="6" fill="${P.white}" stroke="${P.ink}" stroke-width="2"/>` +
      T(cx, y + 54, label, { s: o.ls || 13, m: true }) + body;
  };
  const shelf = (x1, x2, y) => `<rect x="${x1}" y="${y}" width="${x2 - x1}" height="12" rx="4" fill="${P.warnT}" stroke="${P.ink}" stroke-width="2.5"/>`;

  const ideaPic = svg(600, 330, 'Three jars on a shelf that all look empty. chloe_dessert holds None: nothing at all, because Chloe has not chosen yet. ben_shakes holds 0: a real count of zero shakes. ana_note holds a paper slip with no words on it: empty text.',
    jar(26, 18, 160, 150, 'chloe_dessert', 'none', { fill: P.dangerT }) +
    jar(220, 18, 160, 150, 'ben_shakes', '0', { fill: P.okT }) +
    jar(414, 18, 160, 150, 'ana_note', 'slip') +
    shelf(10, 590, 168) +
    T(106, 206, '= None', { s: 16, m: true, f: P.danger }) +
    T(300, 206, '= 0', { s: 16, m: true, f: P.ok }) +
    T(494, 206, '= ""', { s: 16, m: true, f: P.accent }) +
    T(106, 232, 'no answer yet', { s: 13.5 }) +
    T(300, 232, 'a real count: zero', { s: 13.5 }) +
    T(494, 232, 'text with no letters', { s: 13.5 }) +
    T(106, 254, 'type: NoneType', { s: 12.5, w: 700, f: P.ink2 }) +
    T(300, 254, 'type: int', { s: 12.5, w: 700, f: P.ink2 }) +
    T(494, 254, 'type: str', { s: 12.5, w: 700, f: P.ink2 }) +
    `<line x1="20" y1="276" x2="580" y2="276" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    T(300, 306, 'three jars that look empty, three different meanings', { s: 13, w: 700, f: P.ink2 }));

  const noneLines = [
    'chloe_dessert = None',
    'print(chloe_dessert)',
    'print(type(chloe_dessert))',
    'print(None == 0)',
    'print(None == "")',
    'print(None == False)',
    'print(chloe_dessert is None)'
  ];

  const shakeLines = ['ben_shakes = None', 'ben_shakes = ben_shakes + 1', 'print("Shakes today:", ben_shakes)'];
  const menuLines = ['chloe_dessert = None', 'print(f"Dessert for Chloe: {chloe_dessert}")'];
  const painPic = `<div style="width:100%">` +
    code(shakeLines, { title: 'shakes.py', bad: [1, 2] }) +
    term(['$ python3 shakes.py', 'Traceback (most recent call last):', '  File "shakes.py", line 2, in <module>', '    ben_shakes = ben_shakes + 1', '                 ~~~~~~~~~~~^~~', "TypeError: unsupported operand type(s) for +: 'NoneType' and 'int'"], 'terminal') +
    code(menuLines, { title: 'menu.py', bad: [2] }) +
    term(['$ python3 menu.py', 'Dessert for Chloe: None'], 'terminal') +
    `</div>`;

  const askLines = ['chloe_dessert = None', 'print("Still deciding:", chloe_dessert is None)', 'print("Same answer:", chloe_dessert == None)'];
  const fixPic = `<div style="width:100%">${run(shakeLines, { title: 'shakes.py' })}` +
    code(askLines, { title: 'ask.py', hi: [2] }) +
    term(['$ python3 ask.py', 'Still deciding: True', 'Same answer: True'], 'terminal') + `</div>`;

  const slipLines = [
    'chloe_dessert = None',
    'print("Order slip, before Chloe decides")',
    'print(f"Dessert: {chloe_dessert}")',
    'print("Still deciding:", chloe_dessert is None)',
    'chloe_dessert = None',
    'print("Order slip, after Chloe decides")',
    'print(f"Dessert: {chloe_dessert}")',
    'print("Still deciding:", chloe_dessert is None)'
  ];

  // One card per "empty-looking" value, with what it means.
  const card = (x, val, col, line1, line2) =>
    box(x, 18, 128, 120, P.white, 12) +
    T(x + 64, 58, val, { s: 22, m: true, f: col }) +
    T(x + 64, 92, line1, { s: 12.5 }) +
    T(x + 64, 112, line2, { s: 12.5, w: 700, f: P.ink2 });
  const catchPic = `<div style="width:100%">` +
    svg(600, 190, 'Four values that are easy to mix up. None means no answer yet, like Chloe\'s dessert. 0 is a real count, like Ben\'s shakes. Empty text is a note with no letters. False is a real answer: no.',
      card(14, 'None', P.danger, 'no answer yet', 'Chloe\'s dessert') +
      card(160, '0', P.ok, 'a real count', 'Ben\'s shakes') +
      card(306, '""', P.accent, 'text, no letters', 'a blank note') +
      card(452, 'False', P.warn, 'a real answer: no', 'Ben eats meat?') +
      T(300, 176, 'None == 0, None == "" and None == False are all False', { s: 13, w: 700, f: P.ink2 })) +
    run(['tip = "Ben, drink your shake"', 'shout = tip.upper()', 'print(shout)', 'nothing = print("Hello Ben")', 'print(nothing)', 'print(type(nothing))'], { title: 'surprise.py' }) +
    `</div>`;

  COURSE.add({
    id: 'l16', minutes: 9,
    summary: '<code>None</code> is Python\'s value for <b>"no answer yet"</b>: a labelled jar that is deliberately empty. It has its own type, <code>NoneType</code>. It is <b>not</b> <code>0</code>, not empty text <code>""</code> and not <code>False</code>. You cannot do maths with it. Ask "is it empty?" with <code>x is None</code>. Some tools, like <code>print()</code>, do their job and give back <code>None</code>.',
    video: {
      src: 'videos/l16-none.mp4', poster: 'videos/l16-none.jpg', length: '1 min 8 s',
      script: [
        'Three jars sit on your kitchen shelf. Each has a label, and each looks empty. But they mean three different things.',
        'Chloe has not picked her dessert yet. So her jar holds None. None is Python\'s value for no answer yet. It has its own type, NoneType.',
        'Ben drank 0 protein shakes today. 0 is a real answer, a count. So his jar holds 0.',
        'The last jar holds a slip of paper with no words on it. That is empty text.',
        'Here is Chloe\'s order slip. Dessert, blank. Is it None? True. Later, she decides. Chocolate mousse. The blank fills in.',
        'Now the trap. Ben\'s jar was set to None by mistake. After the gym, add 1 shake. None plus 1 bounces off. TypeError. Python cannot do maths with no answer. Use 0, and 0 plus 1 is 1.',
        'None is not 0, not empty text, and not False.',
        'None is the empty jar. It means no answer yet.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'A jar with a label and nothing in it, on purpose.',
        text: [
          'Your guests are ordering. Ana wants pasta and Ben wants bean chili. <b>Chloe has not picked her dessert yet.</b> On your order slip it says "dessert: ___". The blank is not a mistake. It means "no answer yet".',
          'Python has a value for exactly that: <code>None</code>, with a capital N, like <code>True</code> and <code>False</code>. <code>chloe_dessert = None</code> puts a label on a jar and leaves it <b>empty on purpose</b>. Later, when Chloe decides, you fill the jar.',
          'Look at the shelf. Three jars look empty, but they say three different things. Ben drank <b>0</b> protein shakes today: zero is a real count. A note with no words on it is <b>empty text</b>, <code>""</code>. Only Chloe\'s jar means "<b>nobody has answered yet</b>".'
        ],
        tip: 'Why not write <code>"none"</code> or <code>""</code> or <code>0</code> for Chloe? Because each of those could be a real answer. A dessert called "none"? Zero desserts? <code>None</code> can never be confused with an answer, so nobody mistakes the blank for a choice.'
      },
      {
        label: 'The code', pic: run(noneLines, { title: 'none.py' }),
        h: 'None is a value with its own type.',
        text: [
          'Press <b>Run</b>. <code>print(chloe_dessert)</code> shows <code>None</code>, so the jar exists and Python can open it. It just has nothing in it.',
          '<code>type()</code> from lesson 13 says <code>&lt;class \'NoneType\'&gt;</code>. <code>None</code> is the <b>only</b> value of that type. There is exactly one None in the whole program, and every empty jar points at it.',
          'Lines 4 to 6 compare with <code>==</code> from lesson 10. All three say <code>False</code>: None is <b>not</b> 0, <b>not</b> empty text and <b>not</b> False.',
          'Line 7 is new. <code>is</code> asks: "is this <b>exactly</b> the None value?" It answers <code>True</code> or <code>False</code>. Change line 1 to <code>chloe_dessert = "fruit salad"</code> and run again. Which lines change?'
        ],
        tip: '<code>chloe_dessert == None</code> also works. But <code>is None</code> is the habit every Python programmer uses, and the one you will see in other people\'s code. Use <code>is</code> only for None. For numbers and text, keep using <code>==</code>.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Maths on nothing, and "None" on the menu.',
        text: [
          'Pain number 1. You wanted Ben\'s jar to say "no shakes yet", so you wrote <code>ben_shakes = None</code>. After the gym he drinks one, and you add 1. Python stops with a <b>TypeError</b>: <code>unsupported operand type(s) for +: \'NoneType\' and \'int\'</code>. In plain words: "I cannot use <code>+</code> with nothing and a number." The little <code>~~~^~~</code> marks point at the sum.',
          'Pain number 2 is quieter. Chloe never decided, and the jar was never filled. The f-string from lesson 15 happily turns None into the word <code>None</code>, so the printed menu says <b>Dessert for Chloe: None</b>. No error, just a strange menu.',
          'Joining text with <code>+</code> breaks too: <code>"Dessert: " + chloe_dessert</code> stops with <code>TypeError: can only concatenate str (not "NoneType") to str</code>.'
        ],
        warn: 'When you see <code>NoneType</code> in an error, ask: "which jar did I never fill?" Look for the line that put None in it, or a line that should have filled it and did not.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Pick the right empty value, and ask before you use it.',
        text: [
          'Press <b>Run</b> on shakes.py and read the TypeError. Ben\'s count is not unknown. He drank zero shakes, and zero is a real number. Change <code>None</code> to <code>0</code> on line 1 and run again: <code>Shakes today: 1</code>.',
          'The rule: use <code>0</code> for a <b>count that is zero</b>, <code>""</code> for <b>text with no letters</b>, and <code>None</code> for <b>"no answer yet"</b>.',
          'When a jar really may be empty, ask before you use it: <code>chloe_dessert is None</code> gives <code>True</code> while she is still deciding. Lesson 19, <b>if</b>, shows how to act on that answer, for example to print "Chloe is still deciding" instead of "None".'
        ],
        tip: 'Both lines of ask.py say <code>True</code>. They mean the same here, but write <code>is None</code>. It reads like English: "is chloe_dessert None?"'
      },
      {
        label: 'Try it', pic: run(slipLines, { title: 'order_slip.py' }),
        h: 'Fill in the blank on the order slip.',
        text: [
          'Press <b>Run</b>. Both halves of the slip say <code>Dessert: None</code> and <code>Still deciding: True</code>.',
          'Now Chloe decides. On line 5, replace <code>None</code> with her choice in quotes, for example <code>"chocolate mousse"</code> (no gluten in it). Run again. The second half of the slip fills in, and <code>Still deciding:</code> turns <code>False</code>.',
          'The first half still says None. That is right: those lines ran before she decided. Python runs from the top, as in lesson 1.'
        ],
        tip: 'Try <code>chloe_dessert = ""</code> on line 5. The slip says <code>Dessert:</code> with nothing after it, and <code>Still deciding: False</code>. Empty text is a value, so it is not None. Was that what you meant?'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Four empties, four meanings. And some tools hand back None.',
        text: [
          '<code>None</code>, <code>0</code>, <code>""</code> and <code>False</code> all look like "nothing", but each one <b>says something different</b>. Choose on purpose. Later, Kitchen Coach will ask "has Chloe chosen?" and "how many shakes?", and it can only answer if each jar holds the right kind of empty.',
          'The surprise: some tools do their job and give back <b>nothing</b>. <code>.upper()</code> from lesson 9 hands you a new copy of the text. <code>print()</code> shows the text on the screen, and what it hands back is <code>None</code>. Press <b>Run</b>: the jar <code>nothing</code> holds None.',
          'You will meet this again in lesson 34, List methods: <code>.sort()</code> sorts a list in place and gives back None.'
        ],
        warn: 'Lesson 23, Truthy and falsy, shows that None, 0, "" and False all count as "no" in a yes-or-no test. That makes them easy to mix up. Pick the one that says what you mean.'
      }
    ],
    exercises: [
      {
        file: 'l16_empty_jars.py', title: 'Empty jars',
        task: 'Three jars, three situations: Chloe has <b>not chosen</b> her dessert, Ben drank <b>zero</b> shakes today, and Ana\'s note is <b>blank</b>. Fill each jar with the right empty value: <code>None</code>, <code>0</code> or <code>""</code>. Then print <code>Chloe still deciding: True</code>, working out the True with <code>is None</code>. The file checks your work when you run it.',
        steps: [
          'Press <b>Open in VS Code</b>. If nothing happens, open VS Code yourself and use File, Open to find the path shown below.',
          'Read the comment at the top. Between the <code>START</code> and <code>END</code> lines, replace each <code>...</code> and write your print line. Save the file.',
          'Run it with the Run button at the top right of VS Code. At the bottom you see <code>PASS</code> or a hint that tells you what to change.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does this show?',
        pic: code(['print(type(None))'], { title: 'none.py' }),
        options: ["<class 'NoneType'>", "<class 'str'>", "<class 'int'>", 'None'],
        answer: 0,
        why: 'None has a type of its own, <code>NoneType</code>. It is not text and not a number. <code>None</code> is the only value of that type.',
        hint: 'None is not text, so it is not str.'
      },
      {
        type: 'bucket', q: 'Which empty value fits each situation?',
        buckets: ['None', '0', '""'],
        items: [
          ['Chloe has not picked her dessert yet', 0],
          ['Ana\'s race time, before the race', 0],
          ['Ben drank zero shakes today', 1],
          ['Desserts left in the fridge: all eaten', 1],
          ['A note with no words written on it', 2],
          ['A guest pressed Enter without typing a name', 2]
        ],
        why: '<code>None</code> is "no answer yet". <code>0</code> is a real count of zero. <code>""</code> is text with no letters, and that is also what <code>input()</code> gives back when the guest types nothing.',
        hint: 'Ask: is there an answer yet? If yes, is it a count or text?'
      },
      {
        type: 'fix', q: 'Ben\'s count stops with a TypeError. Fix it so it prints <code>Shakes today: 2</code>.',
        code: ['ben_shakes = None', 'ben_shakes = ben_shakes + 2', 'print("Shakes today:", ben_shakes)'],
        title: 'shakes.py',
        check: [
          'if out.strip() == "Shakes today: 2" and ben_shakes == 2:',
          '    ok = True',
          'elif "2" in out:',
          '    msg = "The count is right. Keep the words exactly: Shakes today: 2"',
          'else:',
          '    msg = "It printed " + out.strip() + ". Start Ben\'s jar at a real count, then add 2."'
        ].join('\n'),
        why: 'Ben drank zero shakes, and zero is a real number. <code>0 + 2</code> is 2. <code>None + 2</code> has no answer, so Python stops.',
        hint: 'Which empty value is a real count you can add to?'
      },
      {
        type: 'pick', q: 'What does this show?',
        pic: code(['nothing = print("Hello Chloe")', 'print(nothing)'], { title: 'surprise.py' }),
        options: ['Hello Chloe, then None', 'Hello Chloe, then Hello Chloe', 'Only Hello Chloe', 'A TypeError'],
        answer: 0,
        why: 'Line 1 runs <code>print</code>, which shows <code>Hello Chloe</code>. What <code>print</code> hands back is <code>None</code>, so that is what goes in the jar, and line 2 shows it.',
        hint: 'print() does its job on line 1. What does it give back for the jar?'
      },
      {
        type: 'match', q: 'Match each line to what it gives.',
        pairs: [
          ['None == 0', '<code>False</code>'],
          ['None is None', '<code>True</code>'],
          ['print(None)', 'shows <code>None</code>'],
          ['None + 5', 'a <code>TypeError</code>'],
          ['type(None)', '<code>&lt;class \'NoneType\'&gt;</code>']
        ],
        why: 'None is not 0. None is exactly None. Printing it shows the word. You cannot do maths with it, and its type is <code>NoneType</code>.',
        hint: 'Start with the TypeError: which one tries to do maths?'
      },
      {
        type: 'pick', q: 'Back to lesson 14. A guest presses Enter without typing anything. What does <code>input()</code> give back?',
        pic: code(['name = input("Your name? ")'], { title: 'waiter.py' }),
        options: ['"" (empty text)', 'None', '0', 'False'],
        answer: 0,
        why: '<code>input()</code> always gives back text. With nothing typed, that is text with no letters, <code>""</code>. Not None: the guest did answer, with nothing.',
        hint: 'What kind of value does input() always give back?'
      },
      {
        type: 'fix', q: 'Chloe has decided: <b>chocolate mousse</b>. The menu still says None. Fix it so it prints <code>Dessert for Chloe: chocolate mousse</code>.',
        code: ['chloe_dessert = None', 'print(f"Dessert for Chloe: {chloe_dessert}")'],
        title: 'menu.py',
        check: [
          'if out.strip() == "Dessert for Chloe: chocolate mousse":',
          '    ok = chloe_dessert == "chocolate mousse"',
          '    msg = "" if ok else "Fill the jar chloe_dessert with the dessert, and keep the print line as it is."',
          'elif "None" in out:',
          '    msg = "Still None. Put Chloe\'s choice in the jar on line 1, in quotes."',
          'else:',
          '    msg = "It printed " + out.strip() + ". Check the spelling: chocolate mousse, all small letters."'
        ].join('\n'),
        why: 'The jar was never filled, so the f-string printed the word None. Fill the jar with <code>"chocolate mousse"</code>, and the blank on the menu fills in.',
        hint: 'Change None on line 1 to the dessert, in quote marks.'
      },
      {
        type: 'type', q: 'Type the question that asks "is <code>chloe_dessert</code> exactly the None value?" and gives True or False.',
        prompt: '>>>',
        answers: ['chloe_dessert is None'],
        accept: '^(print\\()?\\s*chloe_dessert\\s+is\\s+None\\s*\\)?$',
        why: '<code>chloe_dessert is None</code> gives <code>True</code> while the jar is empty. <code>== None</code> works too, but <code>is None</code> is the habit.',
        hint: 'The jar name, then a two-letter word, then None with a capital N.'
      }
    ]
  });
})();
