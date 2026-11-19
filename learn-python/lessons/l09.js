/* Lesson 9: Text tools (module 1). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l09  Text tools
     ===================================================================== */

  // One kitchen tool for text: name, the method, a value before and after.
  const tool = (x, y, name, method, before, after) => {
    const cx = x + 67;
    return box(x, y, 134, 176, P.white, 14) +
      T(cx, y + 30, name, { s: 15 }) +
      T(cx, y + 54, method, { s: 13, m: true, f: P.accent }) +
      `<rect x="${x + 10}" y="${y + 70}" width="114" height="32" rx="8" fill="${P.sand}"/>` +
      T(cx, y + 91, before, { s: 12.5, m: true }) +
      arrow(cx, y + 108, cx, y + 128, P.ink, 2.5) +
      `<rect x="${x + 10}" y="${y + 134}" width="114" height="32" rx="8" fill="${P.okT}"/>` +
      T(cx, y + 155, after, { s: 12.5, m: true, f: P.ok });
  };

  const ideaPic = svg(600, 350, 'Chloe signs up as space space c H L O E space. Kitchen Coach shows Chloe. Four text tools: the peeler, .strip(), takes spaces off the ends. The label maker, .upper(), makes every letter a capital. Swap, .replace(), swaps butter for olive oil. The egg counter, .count("egg"), counts 2 eggs.',
    box(16, 16, 262, 74, P.white, 14) +
    T(32, 42, 'Chloe signs up as', { s: 12.5, w: 700, f: P.ink2, a: 'start' }) +
    T(32, 74, '"··cHLOE·"', { s: 20, m: true, a: 'start' }) +
    arrow(284, 53, 318, 53, P.accent, 3) +
    box(322, 16, 262, 74, P.okT, 14) +
    T(338, 42, 'Kitchen Coach shows', { s: 12.5, w: 700, f: P.ink2, a: 'start' }) +
    T(338, 74, '"Chloe"', { s: 20, m: true, f: P.ok, a: 'start' }) +
    T(300, 120, 'a drawer of tools that come with every piece of text', { s: 13, w: 700, f: P.ink2 }) +
    tool(16, 136, 'Peeler', '.strip()', '"··pasta·"', '"pasta"') +
    tool(164, 136, 'Label maker', '.upper()', '"pasta"', '"PASTA"') +
    tool(312, 136, 'Swap', '.replace()', '"butter"', '"olive oil"') +
    tool(460, 136, 'Egg counter', '.count("egg")', '"egg, egg"', '2') +
    T(300, 342, '· marks a space, so you can see it', { s: 12, w: 700, f: P.mute }));

  // "pasta".upper() taken apart. JetBrains Mono at 34px: 20.4px per character, starting at x=150.
  const partsPic = svg(600, 124, 'The line "pasta".upper() taken apart: "pasta" is the text, the dot means use a tool of this text, upper is the tool, and the brackets mean use it now. The result is PASTA.',
    T(150, 48, '"pasta"', { s: 34, m: true, a: 'start' }) +
    T(293, 48, '.', { s: 34, m: true, f: P.danger, a: 'start' }) +
    T(313, 48, 'upper', { s: 34, m: true, f: P.accent, a: 'start' }) +
    T(415, 48, '()', { s: 34, m: true, f: P.ok, a: 'start' }) +
    T(470, 46, '→ PASTA', { s: 22, m: true, f: P.ok, a: 'start' }) +
    `<path d="M221 60 V72 M303 60 V96 M364 60 V72 M435 60 V96" stroke="${P.mute}" stroke-width="2"/>` +
    T(221, 88, 'the text', { s: 13, w: 700, f: P.ink2 }) +
    T(364, 88, 'the tool', { s: 13, w: 700, f: P.accent }) +
    T(303, 114, 'the dot', { s: 13, w: 700, f: P.danger }) +
    T(445, 114, 'brackets: use it now', { s: 13, w: 700, f: P.ok }));

  const tools = [
    'print("pasta".upper())',
    'print("BEAN CHILI".lower())',
    'print("rice pudding".title())',
    'print("rice pudding".capitalize())',
    'print("|" + "  pasta  ".strip() + "|")',
    'print("|" + "  pasta  ".lstrip() + "|")',
    'print("|" + "  pasta  ".rstrip() + "|")'
  ];
  const codePic = `<div style="width:100%">${partsPic}${run(tools, { title: 'text_tools.py' })}</div>`;

  const painPic = `<div style="width:100%">` +
    code(['print("cHLOE".title)'], { title: 'names.py, brackets missing', bad: [1] }) +
    term(['$ python3 names.py', '<built-in method title of str object at 0x104f2a3c0>'], 'terminal') +
    code(['"cHLOE".title()', 'print("cHLOE")'], { title: 'names.py, the tidy copy is thrown away', bad: [1] }) +
    term(['$ python3 names.py', 'cHLOE'], 'terminal') + `</div>`;

  const tidier = [
    'print("pasta".upper())',
    'print("pasta")',
    'print("  cHLOE ".strip().title())',
    'print("BEN  ".strip().title())',
    'print(" ana".strip().upper())'
  ];

  const swapper = [
    'print("Fry the onions in butter".replace("butter", "olive oil"))',
    'print("Ana: pasta, pasta salad, pasta bake".count("pasta"))',
    'print("2 eggs, 1 egg yolk".count("egg"))',
    'print("dinner.py".endswith(".py"))',
    'print("Gluten-free brownies".startswith("Gluten-free"))',
    'print("nuts" in "chocolate and nuts")',
    'print("chocolate and nuts".find("nuts"))',
    'print("chocolate and nuts".find("eggs"))'
  ];

  const catchPic = `<div style="width:100%">` +
    code([
      'print("apple pie with pineapple".replace("apple", "pear"))',
      'print("apple pie with pineapple".replace("apple pie", "pear pie"))'
    ], { title: 'dessert.py', bad: [1], good: [2] }) +
    term(['$ python3 dessert.py', 'pear pie with pinepear', 'pear pie with pineapple'], 'terminal') + `</div>`;

  COURSE.add({
    id: 'l09', minutes: 10,
    summary: 'Every piece of text comes with <b>tools</b>, called <b>methods</b>. You use one with a dot and brackets: <code>"pasta".upper()</code>. <code>.strip()</code> peels off spaces, <code>.title()</code> fixes capitals, <code>.replace()</code> swaps words, <code>.count()</code> counts them. A tool never changes the text. It hands you a <b>new copy</b>.',
    video: {
      src: 'videos/l09-text-tools.mp4', poster: 'videos/l09-text-tools.jpg', length: '1 min 2 s',
      script: [
        'Chloe signs up for dinner. But she types her name like this. 2 spaces, odd capitals, and 1 more space.',
        'In Python, text comes with its own kitchen tools. You use one with a dot, the tool\'s name, and brackets.',
        'Strip is the peeler. It takes the spaces off both ends.',
        'Title is the label maker. A capital at the start of each word, small letters after.',
        'Put the two in a row, and Chloe\'s name comes out tidy.',
        'But look. The old card is still on the bench, still messy. A tool never changes the text. It hands you a new copy.',
        'Forget the brackets, and Python shows you the tool itself, not the result.',
        'Ben wants olive oil, not butter. Replace swaps every butter for olive oil.',
        'And Ana counts the pasta in her plan. Count says 3.',
        'Text tools hand you a new, tidy copy. The original never changes.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Every piece of text comes with its own tools.',
        text: [
          'Kitchen Coach asks your friends to sign up for dinner. <b>Chloe</b> types her name fast: two spaces, <code>cHLOE</code>, and one more space. You want it to show <b>Chloe</b>.',
          'In your kitchen you would grab a tool: the <b>peeler</b> to take the skin off, the <b>label maker</b> to write a neat label. Python has the same idea for text.',
          'Every piece of text comes with a drawer of <b>tools</b>. Python calls them <b>methods</b>. One peels spaces off the ends, one changes capitals, one swaps a word, one counts.'
        ],
        tip: 'You met text in lesson 8: words between quote marks. Python calls text a <b>string</b>, or <code>str</code> for short. The tools in this lesson are <b>string methods</b>.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'A dot, the tool\'s name, and brackets.',
        text: [
          '<code>"pasta".upper()</code> reads: take the text <code>"pasta"</code>, use <b>its</b> tool <code>upper</code>, now. The <b>dot</b> means "a tool that belongs to this piece of text". The empty <b>brackets</b> mean "use it now".',
          'The case tools: <code>.upper()</code> makes every letter a capital, <code>.lower()</code> makes every letter small. <code>.title()</code> puts a capital at the start of <b>each word</b>. <code>.capitalize()</code> puts one only at the start of the <b>whole text</b>.',
          'The peelers: <code>.strip()</code> takes spaces off <b>both</b> ends. <code>.lstrip()</code> peels only the left end, <code>.rstrip()</code> only the right. Spaces are hard to see, so lines 5 to 7 glue a <code>|</code> on each side with <code>+</code>, like in lesson 8.',
          'Press <b>Run</b>. Then change <code>"rice pudding"</code> on lines 3 and 4 to <code>"chocolate brownie"</code> and spot the difference between title and capitalize.'
        ],
        tip: 'To see every tool a string has, type <code>dir("")</code> at the <code>&gt;&gt;&gt;</code> prompt. To read about one, type <code>help(str.strip)</code> (press <b>q</b> to leave the help page). In VS Code it is easier: type a dot after some text and a list of tools pops up.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'No brackets, no result. No print, no result.',
        text: [
          'Pain number 1: <b>forgetting the brackets</b>. Without <code>()</code> you do not use the tool, you only <b>point at it</b>. Python prints the tool itself: <code>&lt;built-in method title of str object at 0x...&gt;</code>. The number at the end is where the tool sits in memory. It changes every run.',
          'Pain number 2: expecting the tool to <b>change the text</b>. Line 1 runs <code>.title()</code>, makes a tidy copy, <code>Chloe</code>, and then nobody prints it or keeps it. It is thrown away. Line 2 prints the text in its quote marks, and that is still <code>cHLOE</code>.',
          'At the <code>&gt;&gt;&gt;</code> prompt, <code>"cHLOE".title()</code> on its own <b>does</b> show <code>\'Chloe\'</code>, because the prompt shows every result. A file does not. In a file, only <code>print</code> shows things.'
        ],
        warn: 'Neither mistake gives an error. The program runs and quietly shows the wrong thing. So read the output, not just "no red".'
      },
      {
        label: 'The fix', pic: run(tidier, { title: 'sign_up.py' }),
        h: 'Use the new copy straight away.',
        text: [
          'A tool <b>never changes</b> the text it belongs to. It hands you a <b>new</b> piece of text. Lines 1 and 2 show it: <code>"pasta".upper()</code> gives <code>PASTA</code>, and <code>"pasta"</code> is still <code>pasta</code>.',
          'So use the new copy at once: put the tool <b>inside</b> <code>print(...)</code>. Lesson 11 gives you labelled jars, called variables, to keep a copy for later.',
          'Tools can go in a <b>row</b>. <code>"  cHLOE ".strip().title()</code> peels first, then labels. Python works left to right: <code>.strip()</code> hands back <code>"cHLOE"</code>, and <code>.title()</code> works on that.',
          'Press <b>Run</b>. Line 5 used the wrong tool: Ana comes out as <code>ANA</code>, which looks like shouting. Change it to <code>.title()</code> and run again.'
        ],
        tip: 'The order of a row can matter. <code>"  cHLOE ".title().strip()</code> gives the same <code>Chloe</code> here, but peeling first is the habit: tidy the edges, then the letters.'
      },
      {
        label: 'Try it', pic: run(swapper, { title: 'swapper.py' }),
        h: 'Swap, count and search.',
        text: [
          '<code>.replace("butter", "olive oil")</code> swaps an ingredient for <b>Ben</b>: first what to find, then what to put in its place. <code>.count("pasta")</code> tells <b>Ana</b> how many times "pasta" is in her plan.',
          '<code>.endswith(".py")</code> and <code>.startswith("Gluten-free")</code> check the end or the start, and answer <code>True</code> (yes) or <code>False</code> (no). Lesson 10 is all about True and False.',
          '<code>in</code> is not a tool with a dot. It is a question: <code>"nuts" in "chocolate and nuts"</code> asks "is this text inside that text?" For Chloe\'s dessert, that matters.',
          '<code>.find("nuts")</code> says <b>where</b> it starts: position 14. Python counts from 0, so <code>c</code> is position 0. If the word is not there, <code>.find</code> gives <code>-1</code>, meaning "not found".',
          'Press <b>Run</b>. Then swap <code>"onions"</code> for <code>"mushrooms"</code> on line 1, and ask on line 6 whether <code>"egg"</code> is in Chloe\'s dessert.'
        ],
        tip: 'Every tool here looks at <b>exact</b> letters. <code>"Pasta".count("pasta")</code> gives <code>0</code>, because a capital P is a different letter. Use <code>.lower()</code> first if capitals should not matter.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'replace swaps every match, even inside other words.',
        text: [
          '<code>.replace</code> does not stop at the first match. It swaps <b>every</b> match. That is great for "butter" twice in one recipe.',
          'But it looks for letters, not words. Chloe wants pear instead of apple in her apple pie. <code>.replace("apple", "pear")</code> also finds the "apple" hiding in <b>pineapple</b>, and you get <code>pinepear</code>.',
          'The fix: make what you look for <b>longer</b> and more exact. <code>.replace("apple pie", "pear pie")</code> only matches the pie.'
        ],
        warn: '<code>in</code> and <code>.count</code> also see letters inside other words. <code>"nuts" in "walnuts"</code> is <code>True</code>. For an allergy check, that is exactly what you want.'
      }
    ],
    exercises: [
      {
        file: 'l09_tidy_names.py', title: 'Tidy the sign-up names',
        task: 'Three friends typed their names badly: <code>"  cHLOE "</code>, <code>"BEN  "</code> and <code>" ana"</code>. Use text tools to print <b>Chloe</b>, <b>Ben</b> and <b>Ana</b>, then print whether <code>"nuts"</code> is in Chloe\'s dessert. The file checks your work when you run it.',
        steps: [
          'Press <b>Open in VS Code</b>. If nothing happens, open VS Code yourself and use File, Open to find the path shown below.',
          'Between the <code>START</code> and <code>END</code> lines, add tools after the messy text. Keep the messy text exactly as it is. Type a dot and watch the list of tools pop up.',
          'Run it with the Run button at the top right of VS Code. At the bottom you see <code>PASS</code> or a hint that tells you what to change.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does this line show?',
        pic: code(['print("  cHLOE ".strip().title())'], { title: 'sign_up.py' }),
        options: ['Chloe', 'cHLOE', 'CHLOE', '  Chloe '],
        answer: 0,
        why: 'Left to right: <code>.strip()</code> peels the spaces and gives <code>"cHLOE"</code>, then <code>.title()</code> gives a capital C and small letters after.',
        hint: 'Do one tool at a time, from left to right.'
      },
      {
        type: 'match', q: 'Match each tool to its job in the kitchen.',
        pairs: [
          ['.strip()', 'Peel the spaces off both ends'],
          ['.upper()', 'Make every letter a capital'],
          ['.title()', 'A capital at the start of each word'],
          ['.replace()', 'Swap one ingredient for another'],
          ['.count()', 'How many times a word appears']
        ],
        why: 'Peeler, label maker, neat labels, swap and counter. Each one hands back a new result and leaves the text alone.',
        hint: 'Read the tool\'s name as an English word. Most say what they do.'
      },
      {
        type: 'fix', q: 'This should print <code>BEAN CHILI</code> for Ben\'s place card. It prints something strange instead. Fix it.',
        code: ['print("bean chili".upper)'],
        title: 'place_card.py',
        check: [
          'if out == "BEAN CHILI":',
          '    ok = True',
          'elif out.startswith("<built-in method"):',
          '    msg = "It still prints the tool itself. A tool needs brackets to be used: upper()"',
          'else:',
          '    msg = "It printed " + out + ". It should print BEAN CHILI."'
        ].join('\n'),
        why: 'Without brackets you only point at the tool. <code>.upper()</code> with brackets uses it.',
        hint: 'Compare it with "pasta".upper() in the lesson. What is missing at the end of upper?'
      },
      {
        type: 'fix', q: 'This prints <code>cHLOE</code> with spaces round it. Change the code so it prints <code>Chloe</code>, using the tools.',
        code: ['"  cHLOE ".strip().title()', 'print("  cHLOE ")'],
        title: 'sign_up.py',
        check: [
          'if out == "Chloe":',
          '    ok = True',
          'elif out.strip() == "Chloe":',
          '    msg = "Close. There are still spaces at the ends. Peel them with .strip()"',
          'elif out.strip() == "cHLOE":',
          '    msg = "Still the messy name. The tidy copy on line 1 is made and thrown away. Put the tools inside print(...)."',
          'else:',
          '    msg = "It printed " + out + ". It should print just Chloe."'
        ].join('\n'),
        why: 'A tool makes a new copy and never changes the text. To see the copy, use it inside <code>print(...)</code>: <code>print("  cHLOE ".strip().title())</code>.',
        hint: 'Line 1 makes the tidy copy, but nothing shows it. Move the tools into the print on line 2.'
      },
      {
        type: 'bucket', q: 'Does this give True or False?',
        buckets: ['True', 'False'],
        items: [
          ['"nuts" in "chocolate and nuts"', 0],
          ['"Nuts" in "chocolate and nuts"', 1],
          ['"dinner.py".endswith(".py")', 0],
          ['"menu.txt".endswith(".py")', 1],
          ['"Gluten-free cake".startswith("gluten")', 1],
          ['"nuts" in "brownies with walnuts"', 0]
        ],
        why: 'The tools look at exact letters. A capital N or a small g is a different letter from what is in the text, so those two are False. <code>"menu.txt"</code> ends in <code>.txt</code>, not <code>.py</code>. And "walnuts" ends in "nuts", so <code>in</code> finds it: True.',
        hint: 'Check capitals letter by letter, and look for the word hiding inside longer words.'
      },
      {
        type: 'pick', q: 'Chloe wants pear instead of apple. What does this print?',
        pic: code(['print("pineapple".replace("apple", "pear"))'], { title: 'dessert.py' }),
        options: ['pinepear', 'pineapple', 'pear', 'An error'],
        answer: 0,
        why: '<code>.replace</code> swaps every match of the letters "apple", even inside another word. Pineapple becomes pinepear.',
        hint: 'Is "apple" hiding inside "pineapple"?'
      },
      {
        type: 'type', q: 'Type the line that prints Chloe\'s dessert, <code>"rice pudding"</code>, in capitals: <code>RICE PUDDING</code>.',
        prompt: '>>>',
        answers: ['print("rice pudding".upper())'],
        why: 'The text, a dot, the tool <code>upper</code>, and brackets to use it. All inside <code>print(...)</code>.',
        hint: 'print, then the text in quote marks, then .upper() inside the print brackets.'
      },
      {
        type: 'pick', q: 'Back to lesson 4. You run this and Python stops. Read the error from the bottom up. What is the fix?',
        pic: code(['print("pasta".uper())'], { title: 'menu.py' }) +
          term(['$ python3 menu.py', 'Traceback (most recent call last):', '  File "menu.py", line 1, in <module>', '    print("pasta".uper())', '          ^^^^^^^^^^^^', "AttributeError: 'str' object has no attribute 'uper'. Did you mean: 'upper'?"], 'terminal'),
        options: ['print("pasta".upper())', 'print("pasta".uper)', 'print(pasta.upper())', 'print("pasta".UPPER())'],
        answer: 0,
        why: 'The last line says a <code>str</code> (text) has no tool called <code>uper</code>, and guesses <code>upper</code>. An "attribute" is anything that comes after the dot. Tool names are exact and in small letters.',
        hint: 'The last line even suggests the right name.'
      }
    ]
  });
})();
