/* Lesson 14: Asking with input (module 1). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l14  Asking with input
     ===================================================================== */

  // A small waiter: you. x, y is the centre of the head.
  const waiter = (x, y) =>
    `<path d="M${x - 40} ${y + 112} L${x - 30} ${y + 46} Q${x} ${y + 30} ${x + 30} ${y + 46} L${x + 40} ${y + 112} Z" fill="${P.ink}"/>` +
    `<path d="M${x - 12} ${y + 40} L${x} ${y + 74} L${x + 12} ${y + 40} Z" fill="${P.white}" stroke="${P.ink}" stroke-width="2"/>` +
    `<path d="M${x - 10} ${y + 46} L${x} ${y + 51} L${x - 10} ${y + 56} Z M${x + 10} ${y + 46} L${x} ${y + 51} L${x + 10} ${y + 56} Z" fill="${P.accent}" stroke="${P.ink}" stroke-width="1.5"/>` +
    `<circle cx="${x}" cy="${y}" r="26" fill="#F3D9C2" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<path d="M${x - 26} ${y - 4} Q${x - 24} ${y - 30} ${x} ${y - 30} Q${x + 25} ${y - 30} ${x + 26} ${y - 4} Q${x + 16} ${y - 16} ${x} ${y - 15} Q${x - 16} ${y - 15} ${x - 26} ${y - 4} Z" fill="${P.ink}"/>` +
    `<circle cx="${x - 9}" cy="${y + 2}" r="3" fill="${P.ink}"/><circle cx="${x + 9}" cy="${y + 2}" r="3" fill="${P.ink}"/>` +
    `<path d="M${x - 8} ${y + 12} q8 6 16 0" fill="none" stroke="${P.ink}" stroke-width="2.5" stroke-linecap="round"/>` +
    `<rect x="${x + 30}" y="${y + 58}" width="30" height="38" rx="4" fill="${P.paper2}" stroke="${P.ink}" stroke-width="2"/>` +
    `<path d="M${x + 36} ${y + 70} h18 M${x + 36} ${y + 80} h18" stroke="${P.accent}" stroke-width="2" stroke-linecap="round"/>`;
  const badge = (x, y, n) => `<circle cx="${x}" cy="${y}" r="13" fill="${P.ink}"/>` + T(x, y + 5, String(n), { s: 13, f: P.white });
  const guest = (x, y, name, col) => `<circle cx="${x}" cy="${y}" r="24" fill="${col}" stroke="${P.ink}" stroke-width="2.5"/>` + T(x, y + 6, name[0], { s: 18, f: P.white }) + T(x, y + 44, name, { s: 13 });

  const ideaPic = svg(600, 300, 'You, the waiter, ask Ana: How many cookies? Ana types 4 and presses Enter. On your notepad the answer is written as "4", in quote marks: text.',
    waiter(78, 70) +
    box(140, 20, 230, 48, P.white, 12) + T(255, 50, 'How many cookies? ', { s: 15, m: true }) +
    badge(140, 20, 1) + T(255, 88, 'shows the question', { s: 12.5, w: 700, f: P.ink2 }) +
    guest(520, 46, 'Ana', P.accent) +
    box(420, 116, 150, 48, P.white, 12) + T(462, 147, '4', { s: 20, m: true, f: P.ok }) + T(522, 146, 'Enter ↵', { s: 12.5, f: P.ink2 }) +
    badge(420, 116, 2) + T(495, 186, 'waits for Enter', { s: 12.5, w: 700, f: P.ink2 }) +
    arrow(440, 196, 352, 228, P.accent, 3) +
    box(110, 196, 236, 84, P.paper2, 12) + `<rect x="110" y="196" width="236" height="14" rx="6" fill="${P.ink}"/>` +
    T(128, 236, 'Ana:', { s: 14, a: 'start', f: P.ink2 }) + T(250, 256, '"4"', { s: 32, m: true, f: P.ok }) +
    badge(110, 196, 3) + T(470, 262, 'hands back what was typed,', { s: 12.5, w: 700, f: P.ink2 }) +
    T(470, 280, 'always as text', { s: 12.5, w: 800, f: P.ok }));

  const greet = [
    'print("Welcome to the kitchen!")',
    'name = input("What is your name? ")',
    'print("Hello,", name)',
    'dish = input("What would you like to eat? ")',
    'print("Coming up:", dish, "for", name)'
  ];
  const codePic = `<div style="width:100%">${run(greet, { title: 'greet.py' })}` +
    term(['$ python3 greet.py', 'Welcome to the kitchen!', 'What is your name? Chloe', 'Hello, Chloe', 'What would you like to eat? rice pudding', 'Coming up: rice pudding for Chloe'], 'VS Code terminal: you type Chloe and rice pudding') +
    term(['# without the space at the end of the question:', 'What is your name?Chloe'], 'terminal') + `</div>`;

  const painPic = `<div style="width:100%">` +
    code(['servings = input("How many servings? ")', 'print("Bake", servings * 3, "bread rolls")'], { title: 'rolls.py', bad: [2] }) +
    term(['$ python3 rolls.py', 'How many servings? 2', 'Bake 222 bread rolls'], 'terminal') +
    code(['pasta_g = input("Grams of pasta? ")', 'extra_g = input("Extra grams? ")', 'print("Total:", pasta_g + extra_g, "g")'], { title: 'pasta.py', bad: [3] }) +
    term(['$ python3 pasta.py', 'Grams of pasta? 200', 'Extra grams? 50', 'Total: 20050 g'], 'terminal') +
    code(['guests = int(input("How many guests? "))', 'print("Cook", guests * 100, "g of pasta")'], { title: 'guests.py' }) +
    term(['$ python3 guests.py', 'How many guests? two', 'Traceback (most recent call last):', '  File "guests.py", line 1, in <module>', '    guests = int(input("How many guests? "))', "ValueError: invalid literal for int() with base 10: 'two'"], 'terminal') +
    `</div>`;

  const portion = [
    'print("Portion calculator")',
    'guests = input("How many guests? ")',
    'print("Bake", guests * 3, "bread rolls")',
    'print("Cook", guests * 100, "g of pasta")'
  ];

  const coach = [
    'print("Kitchen Coach")',
    'friend = input("Who is eating? ").strip().title()',
    'hunger = int(input("How hungry, from 1 to 10? "))',
    'pasta_g = hunger * 15',
    'print(friend, "gets", pasta_g, "g of pasta")'
  ];

  const yes = [
    'answer = input("Is Chloe gluten-free? (yes or no) ")',
    'print("Exactly yes?", answer == "yes")',
    'tidy = answer.strip().lower()',
    'print("After tidying:", tidy == "yes")'
  ];
  const tried = [['"4"', '4', true], ['" 4 "', '4', true], ['"four"', 'ValueError', false], ['"4.5"', 'ValueError', false], ['""', 'ValueError', false]];
  const catchPic = `<div style="width:100%">${run(yes, { title: 'gluten.py', inputs: [' Yes '] })}` +
    svg(600, 216, 'What int() does with five things a guest might type: "4" gives 4, " 4 " with spaces gives 4, but "four", "4.5" and an empty answer all stop with a ValueError.',
      T(300, 24, 'What a guest types, and what int() makes of it', { s: 13.5 }) +
      tried.map(([a, b, ok], i) => {
        const y = 40 + i * 34;
        return box(60, y, 170, 28, P.white, 8) + T(145, y + 20, a, { s: 14, m: true }) +
          arrow(240, y + 14, 320, y + 14, ok ? P.ok : P.danger, 2.5) +
          box(330, y, 210, 28, ok ? P.okT : P.dangerT, 8) + T(435, y + 20, b, { s: 14, m: true, f: ok ? P.ok : P.danger });
      }).join('')) + `</div>`;

  COURSE.add({
    id: 'l14', minutes: 12,
    summary: '<code>input("How many guests? ")</code> asks a question, <b>waits</b> for the person to type an answer and press Enter, and hands back what they typed <b>as text</b>. Store it in a jar: <code>name = input("Your name? ")</code>. For a number, convert it: <code>guests = int(input("How many guests? "))</code>. And never fully trust the answer: a person can type anything.',
    video: {
      src: 'videos/l14-input.mp4', poster: 'videos/l14-input.jpg', length: '1 min 9 s',
      script: [
        'Tonight, you are the waiter. Notepad in hand, you go round the table and ask each friend what they would like.',
        'In Python, your waiter is input. It shows a question, waits for the guest to type and press Enter, then hands back exactly what was typed.',
        'How many cookies, Ana? She types 4. Now look at the notepad. The 4 sits in quotes. Input always gives back text, even when it looks like a number.',
        'Ben and Chloe want the same, so times 3. You expect 12. Python prints 4, 4, 4. Text times 3 just repeats the text.',
        'The fix is int. Wrap the answer in it, and the text 4 becomes the number 4. 4 cookies land on the plate. Times 3 is 12.',
        'One last catch. A guest can type anything at all. Chloe types four, in words. Int cannot read that, so Python stops with a ValueError.',
        'Input asks, and hands back text. Convert it before you count.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'A waiter asks, waits, and writes it down.',
        text: [
          'Until now, every value in Kitchen Coach was typed by you, the cook, inside the code. But dinner is about your guests. You want to <b>ask them</b>.',
          'Think of a waiter with a notepad. The waiter <b>asks</b> a question, <b>waits</b> while the guest answers, and <b>writes down</b> exactly what the guest said. The waiter does not judge or change the answer.',
          '<code>input()</code> is Python\'s waiter. It shows a question on the screen, stops the program until the person types an answer and presses <b>Enter</b>, and then hands back what they typed.',
          'One detail matters all lesson long: the answer always comes back as <b>text</b>, a string. Even when the guest types <code>4</code>, the notepad says <code>"4"</code>.'
        ],
        tip: 'The question inside the brackets is called the <b>prompt</b>. It is the waiter\'s line: "How many cookies?"'
      },
      {
        label: 'The code', pic: codePic,
        h: 'Ask, store the answer, use it.',
        text: [
          'Line 2 does three things. It shows <code>What is your name? </code>, waits, and puts the answer in a jar called <code>name</code>. Without the <code>name =</code>, the answer would be thrown away, like a waiter who forgets the order.',
          'Press <b>Run</b>. When the program asks, a <b>box appears in the output</b>, right after the question. Click it, type your name and press <b>Enter</b>. Then answer the second question the same way. Your answers show in green, as if you typed them in a terminal.',
          'In this page, each answer makes the program <b>run again from the top</b>, with your answers already known. That is just how the in-browser version works. In VS Code the program really pauses and waits.',
          'Look at the <b>space</b> at the end of each prompt, after the question mark. Python prints the prompt exactly, and the answer starts right after it. Without the space you get <code>What is your name?Chloe</code>, all squashed.'
        ],
        tip: 'In VS Code: press the <b>Run</b> button at the top right. The terminal opens at the bottom of the window and shows the question. <b>Click inside the terminal</b>, type your answer and press Enter. Until you press Enter, the program waits, as long as you like.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Numbers that are really text.',
        text: [
          '<b>Pain 1: forgetting to convert.</b> The guest types <code>2</code>, but <code>servings</code> holds the text <code>"2"</code>. Text times 3 <b>repeats</b> the text, as in lesson 8. So Python bakes <code>222</code> bread rolls. No error, just a very wrong number.',
          'Adding goes wrong the same way. <code>"200" + "50"</code> <b>glues</b> the two texts together: <code>20050</code> grams of pasta. That is the trap from lesson 8, now coming straight from the keyboard.',
          '<b>Pain 2: asking for a number and getting words.</b> The third program converts correctly with <code>int(...)</code>. But the guest types <code>two</code>. <code>int()</code> can only read digits, so Python stops. Read the last line: <code>ValueError: invalid literal for int() with base 10: \'two\'</code>. "Invalid literal" means "this text does not look like a whole number". "Base 10" means normal digits, 0 to 9.'
        ],
        warn: 'Pain 1 is the sneaky one. A ValueError at least stops and tells you. <code>222</code> bread rolls just walks out of the kitchen.'
      },
      {
        label: 'The fix', pic: run(portion, { title: 'portion.py', inputs: ['4'] }),
        h: 'Wrap the question in int().',
        text: [
          'Press <b>Run</b>. This block already answers <code>4</code> for you. Look at the result: <code>444</code> bread rolls, and a wall of 4s for the pasta.',
          'Now fix line 2. Put <code>int(</code> before <code>input</code> and one more <code>)</code> at the end: <code>guests = int(input("How many guests? "))</code>. Run again: <code>Bake 12 bread rolls</code> and <code>Cook 400 g of pasta</code>.',
          'Read it from the <b>inside out</b>. First <code>input(...)</code> asks and hands back <code>"4"</code>. Then <code>int(...)</code> turns <code>"4"</code> into the number <code>4</code>, as in lesson 13. Then <code>=</code> stores the number in the jar.',
          'For a measure with a point, like <code>2.5</code> kg, use <code>float(input("Kilos of flour? "))</code> instead. Convert once, right where you ask, and the jar holds a real number from then on.'
        ],
        tip: 'What about a guest who types <code>two</code>? For now we <b>trust the guest</b> to type digits. Lesson 53, try and except, shows how to catch the ValueError and ask again politely.'
      },
      {
        label: 'Try it', pic: run(coach, { title: 'kitchen_coach.py' }),
        h: 'Kitchen Coach starts a conversation.',
        text: [
          'Kitchen Coach can talk now. It asks who is eating and how hungry they are, from 1 to 10, then suggests a portion: 15 g of dry pasta for each point of hunger. Press <b>Run</b> and answer both questions yourself.',
          'Type the name sloppily, like <code>  ana </code> with spaces. Line 2 tidies it with <code>.strip().title()</code> from lesson 9, so the reply still says <code>Ana</code>.',
          'Now run it again and type <code>six</code> in words for the hunger. Read the ValueError, then run once more with a number.',
          'Then add a third question at the end: <code>minutes = int(input("Minutes trained today? "))</code>. Ana\'s rule of thumb is 30 g of carbs for each hour of running, so print <code>minutes // 2</code> as her extra carbs. For 90 minutes that is 45 g.'
        ],
        tip: 'Print with <b>commas</b> between the parts, as here. Commas accept text and numbers together. Lesson 15, f-strings, shows a neater way to fill in the blanks.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'input always returns text, and people type anything.',
        text: [
          '<code>input()</code> <b>always</b> hands back a string. <code>"4"</code>, <code>"4.5"</code> and <code>"yes"</code> are all text, even when they look like something else. Nothing is converted unless you convert it.',
          'And a person can type <b>anything at all</b>: spaces, capitals, words, nothing. Press Run. The ready-made answer is <code> Yes </code>, with a capital and spaces. To Python, that is not the same as <code>"yes"</code>, so the first check says <code>False</code>.',
          'Tidy every answer before you trust it. <code>.strip()</code> peels off the spaces and <code>.lower()</code> makes it small, both from lesson 9. After tidying, the check says <code>True</code>.',
          'The picture shows what <code>int()</code> does with five answers. It even ignores spaces around the digits. But a word, a point or an empty answer all stop with a ValueError.'
        ],
        warn: 'Never fully trust what a person types. Tidy it, convert it, and expect surprises. Later lessons build on this habit: checking answers with <code>if</code> in lesson 19, and catching errors in lesson 53.'
      }
    ],
    exercises: [
      {
        file: 'l14_waiter.py', title: 'The waiter takes an order',
        task: 'Ask the guest\'s <b>name</b> and <b>how many cookies</b> they want. Cookies cost <b>1.50</b> each. Print a confirmation with the name and the <b>total price</b>. When you run the file, you first answer the questions yourself. Then the check runs your code again by itself, as Ana ordering 4 cookies, and looks for <code>6.0</code>.',
        steps: [
          'Press <b>Open in VS Code</b>. If nothing happens, open VS Code yourself and use File, Open to find the path shown below.',
          'Read the comment at the top. Write your lines between the <code>START</code> and <code>END</code> lines. The name question is already there. Save the file.',
          'Press the Run button at the top right of VS Code. Click in the terminal at the bottom, type your answers and press Enter after each one.',
          'Then read the check at the bottom: <code>PASS</code>, or a hint that tells you what to change.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'The guest types <code>4</code> and presses Enter. What does <code>input()</code> hand back?',
        pic: code(['cookies = input("How many cookies? ")'], { title: 'order.py' }),
        options: ['The text "4", a string', 'The whole number 4, an int', 'The float 4.0', 'Nothing until you print it'],
        answer: 0,
        why: '<code>input()</code> always hands back text, even when it looks like a number. To count with it, convert it with <code>int()</code>.',
        hint: 'Think of the waiter\'s notepad. What did it say, with or without quotes?'
      },
      {
        type: 'pick', q: 'The guest types <code>2</code>. What does this print?',
        pic: code(['servings = input("How many servings? ")', 'print("Bake", servings * 3, "bread rolls")'], { title: 'rolls.py' }),
        options: ['Bake 222 bread rolls', 'Bake 6 bread rolls', 'Bake 2 bread rolls', 'TypeError'],
        answer: 0,
        why: '<code>servings</code> holds the text <code>"2"</code>. Text times 3 repeats it: <code>"222"</code>. Wrap the question in <code>int()</code> to get 6.',
        hint: 'What is in the jar: the number 2 or the text "2"? What does * do to text?'
      },
      {
        type: 'fix', q: 'Ana trained for 90 minutes. Her rule of thumb is 30 g of carbs per hour, so <code>minutes // 2</code>. Fix the program so it prints <code>Ana needs 45 g of carbs for that run</code>.',
        code: ['name = input("Who trained today? ")', 'minutes = input("How many minutes? ")', 'carbs_g = minutes // 2', 'print(name, "needs", carbs_g, "g of carbs for that run")'],
        title: 'carbs.py',
        inputs: ['Ana', '90'],
        check: [
          'last = out.splitlines()[-1] if out else ""',
          'if last == "Ana needs 45 g of carbs for that run":',
          '    ok = True',
          'elif "45" in last:',
          '    msg = "The number is right. Keep the words exactly as they were: Ana needs 45 g of carbs for that run"',
          'else:',
          '    msg = "The last line printed was: " + last + ". Convert the minutes to a whole number where you ask for them."'
        ].join('\n'),
        why: '<code>input()</code> gave back the text <code>"90"</code>, and Python cannot divide text: <code>TypeError: unsupported operand type(s) for //: \'str\' and \'int\'</code>. <code>int(input(...))</code> on line 2 makes it the number 90.',
        hint: 'Read the error: one side of // is a str. Which line asks for the minutes? Wrap it in int(...).'
      },
      {
        type: 'pick', q: 'The guest types <code>two</code>. What happens?',
        pic: code(['guests = int(input("How many guests? "))', 'print("Cook", guests * 100, "g of pasta")'], { title: 'guests.py' }),
        options: ["ValueError: invalid literal for int() with base 10: 'two'", 'It prints Cook 200 g of pasta', 'It prints Cook twotwotwo... g of pasta', 'Python asks the question again'],
        answer: 0,
        why: '<code>int()</code> only reads digits. It cannot understand the word <code>two</code>, so Python stops with a ValueError on line 1. Line 2 never runs.',
        hint: 'Can int() read words?'
      },
      {
        type: 'bucket', q: 'You ask a guest each of these. Keep the answer as text, or convert it?',
        buckets: ['Keep as text', 'Convert with int()', 'Convert with float()'],
        items: [
          ['Their name', 0],
          ['Their favourite dessert', 0],
          ['How many guests are coming', 1],
          ['Minutes they trained today', 1],
          ['Kilos of flour, like 2.5', 2],
          ['A price, like 1.50', 2]
        ],
        why: 'Words stay text. Things you <b>count</b> become an int. Things you <b>measure</b>, with a point, become a float, as in lesson 6.',
        hint: 'Will you do maths with it? If yes, does it need a point?'
      },
      {
        type: 'fix', q: 'Back to lesson 9. The guest answers <code> Yes </code>, with a capital and spaces, and the program says <code>False</code>. Tidy the answer so it prints <code>Vegetarian: True</code>.',
        code: ['answer = input("Is Ben vegetarian? ")', 'print("Vegetarian:", answer == "yes")'],
        title: 'ben.py',
        inputs: [' Yes '],
        check: [
          'last = out.splitlines()[-1] if out else ""',
          'if last == "Vegetarian: True":',
          '    ok = True',
          'elif last == "Vegetarian: False":',
          '    msg = "Still False. Peel off the spaces and make it small: answer.strip().lower()"',
          'else:',
          '    msg = "The last line should be exactly: Vegetarian: True. It was: " + last'
        ].join('\n'),
        why: '<code>" Yes "</code> is not <code>"yes"</code>: the spaces and the capital count. <code>.strip()</code> peels the spaces and <code>.lower()</code> makes it small. Then <code>==</code> says True.',
        hint: 'Use two tools from lesson 9 in a row on answer, before you compare: .strip() and .lower().'
      },
      {
        type: 'pick', q: 'Why is there a space before the last quote mark in <code>input("What is your name? ")</code>?',
        options: ['So the answer does not stick to the question mark', 'Python needs it, or input() fails', 'It is added to the name the guest types', 'It makes the program wait longer'],
        answer: 0,
        why: 'Python prints the prompt exactly, and the answer starts right after it. Without the space the terminal shows <code>What is your name?Chloe</code>. The space is only shown, never part of the answer.',
        hint: 'Picture the terminal: the question, then the cursor where the guest types.'
      },
      {
        type: 'type', q: 'Type one line that asks <code>How many guests? </code> and stores the answer in <code>guests</code> as a <b>whole number</b>.',
        prompt: '>>>',
        answers: ['guests = int(input("How many guests? "))'],
        accept: '^guests ?= ?int\\(input\\("How many guests\\? ?"\\)\\)$',
        why: 'Inside out: <code>input()</code> asks and hands back text, <code>int()</code> turns it into a number, <code>=</code> stores it in the jar.',
        hint: 'The jar name, =, then int( wrapped around input("How many guests? "), and two closing brackets.'
      }
    ]
  });
})();
