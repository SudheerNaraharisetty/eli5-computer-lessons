/* Lesson 32: Indexing (module 3). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l32  Indexing
     ===================================================================== */

  const ITEMS = ['pasta', 'milk', 'rice', 'beans', 'oats', 'honey'];

  // One jar on the shelf: a lid, a body and a label. hot: highlight it.
  const jar = (x, y, w, h, label, hot) =>
    `<rect x="${x + 3}" y="${y + 4}" width="${w}" height="${h}" rx="12" fill="${P.ink}"/>` +
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${hot ? P.tint : P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<rect x="${x + 8}" y="${y - 10}" width="${w - 16}" height="12" rx="4" fill="${P.ink2}" stroke="${P.ink}" stroke-width="2"/>` +
    T(x + w / 2, y + h / 2 + 5, label, { s: 13.5, f: hot ? P.accent : P.ink });
  // A small number tag under a jar. kind: 'pos' | 'neg'
  const tag = (cx, y, label, kind) =>
    `<rect x="${cx - 19}" y="${y}" width="38" height="26" rx="8" fill="${kind === 'neg' ? P.warnT : P.tint}" stroke="${P.ink}" stroke-width="2"/>` +
    T(cx, y + 18, label, { s: 14, m: true, f: kind === 'neg' ? P.warn : P.accent });

  // The idea: six jars, tags 0 to 5, hops from the start to jar 2.
  const ideaPic = svg(600, 300, 'A shelf of six jars: pasta, milk, rice, beans, oats and honey. Under them, number tags 0 to 5. Two hops go from the first jar to the third jar, which is jar 2.',
    box(20, 14, 560, 50, P.warnT, 14) +
    T(40, 46, 'Recipe: grab the third jar', { s: 16, a: 'start' }) +
    T(560, 46, 'shopping[2]', { s: 16, m: true, a: 'end', f: P.accent }) +
    `<path d="M50 118 Q50 168 50 230" stroke="${P.mute}" stroke-width="2.5" stroke-dasharray="5 5"/>` +
    T(50, 112, 'start', { s: 12, f: P.ink2 }) +
    ITEMS.map((it, i) => jar(64 + i * 86, 132, 72, 70, it, i === 2)).join('') +
    `<rect x="54" y="204" width="526" height="10" rx="3" fill="${P.warn}" stroke="${P.ink}" stroke-width="2"/>` +
    ITEMS.map((it, i) => tag(100 + i * 86, 222, String(i), 'pos')).join('') +
    `<path d="M100 118 Q143 88 186 118" fill="none" stroke="${P.accent}" stroke-width="2.5"/>` +
    `<path d="M186 118 Q229 88 272 118" fill="none" stroke="${P.accent}" stroke-width="2.5"/>` +
    T(143, 92, 'step 1', { s: 12, f: P.accent }) + T(229, 92, 'step 2', { s: 12, f: P.accent }) +
    T(300, 278, 'Jar 0 is 0 steps from the start. The third jar is jar 2.', { s: 14, w: 700, f: P.ink2 }));

  const read = [
    'shopping = ["pasta", "milk", "rice", "beans", "oats", "honey"]',
    'print(shopping[0])                  # the first jar',
    'print(shopping[2])                  # the third jar',
    'print(len(shopping))                # 6 jars, tags 0 to 5',
    'print(shopping[len(shopping) - 1])  # the last jar',
    'print(shopping[-1])                 # the last jar, the short way',
    'print(shopping[-2])                 # the one before it'
  ];
  const negStrip = svg(600, 150, 'The same six jars with two rows of tags. The top row counts from the start: 0 to 5. The bottom row counts from the end: -6 to -1, so honey is both 5 and -1.',
    ITEMS.map((it, i) => jar(30 + i * 92, 22, 80, 46, it, i === 5)).join('') +
    `<rect x="22" y="70" width="556" height="8" rx="3" fill="${P.warn}" stroke="${P.ink}" stroke-width="2"/>` +
    ITEMS.map((it, i) => tag(70 + i * 92, 86, String(i), 'pos') + tag(70 + i * 92, 118, String(i - 6), 'neg')).join(''));
  const codePic = `<div style="width:100%;min-width:0">${run(read, { title: 'shopping.py' })}${negStrip}</div>`;

  const offByOne = [
    'shopping = ["pasta", "milk", "rice", "beans", "oats", "honey"]',
    'print(f"Third on the list: {shopping[3]}")'
  ];
  const pastEnd = [
    'shopping = ["pasta", "milk", "rice", "beans", "oats", "honey"]',
    'print(f"Last on the list: {shopping[len(shopping)]}")'
  ];
  const painPic = `<div style="width:100%;min-width:0">` +
    code(offByOne, { title: 'shopping.py', bad: [2] }) +
    term(['$ python3 shopping.py', 'Third on the list: beans', '# That is the fourth jar. No error, no warning.'], 'terminal') +
    code(pastEnd, { title: 'shopping.py, another try', bad: [2] }) +
    term(['$ python3 shopping.py', 'Traceback (most recent call last):', '  File "shopping.py", line 2, in <module>', '    print(f"Last on the list: {shopping[len(shopping)]}")', '                               ~~~~~~~~^^^^^^^^^^^^^^^', 'IndexError: list index out of range'], 'terminal') + `</div>`;

  const chloe = [
    "# Chloe's dessert ideas, oldest first. All gluten-free.",
    'desserts = ["rice pudding", "fruit salad", "chocolate mousse", "pavlova"]',
    'print(f"Chloe has {len(desserts)} dessert ideas")',
    'print(f"Her newest idea: {desserts[len(desserts)]}")'
  ];

  const shelf = [
    'shelf = ["rice", "flour", "sugar", "oats", "lentils", "honey"]',
    'print(f"First jar: {shelf[0]}")',
    '# Your turn: print the third jar, then the last jar'
  ];
  const ben = [
    "# Ben's meals today, and the protein in each, in grams",
    'ben_meals = ["oat porridge", "lentil soup", "tofu stir fry"]',
    'protein_g = [12, 18, 30]',
    'print(f"Second meal: {ben_meals[1]}, {protein_g[1]} g")',
    '',
    '# Ben swaps the soup for something with more protein',
    'ben_meals[1] = "tempeh bowl"',
    'protein_g[1] = 35',
    'print(f"Second meal: {ben_meals[1]}, {protein_g[1]} g")',
    'print(f"Protein today: {sum(protein_g)} g")'
  ];
  const ana = [
    "# Ana's runs this week. Day 0 is Monday.",
    'days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]',
    'runs_km = [5, 8, 0, 6, 5, 0, 16]',
    'longest = max(runs_km)',
    'day_no = runs_km.index(longest)',
    'print(f"Long run: {longest} km")',
    'print(f"It was day {day_no}: {days[day_no]}")'
  ];
  const tryPic = `<div style="width:100%;min-width:0">${run(shelf, { title: 'pantry.py' })}${run(ben, { title: 'ben_meals.py' })}${run(ana, { title: 'ana_week.py' })}</div>`;

  const dish = ['dish = "pasta"', 'print(dish[0])', 'print(dish[-1])', 'dish[0] = "b"'];
  const findIt = [
    'shopping = ["pasta", "milk", "rice", "beans", "oats", "honey"]',
    'print(shopping.index("oats"))',
    'if "flour" in shopping:',
    '    print(shopping.index("flour"))',
    'else:',
    '    print("No flour on the list")'
  ];
  const catchPic = `<div style="width:100%;min-width:0">` +
    code(dish, { title: 'dish.py', bad: [4] }) +
    term(['$ python3 dish.py', 'p', 'a', 'Traceback (most recent call last):', '  File "dish.py", line 4, in <module>', '    dish[0] = "b"', '    ~~~~^^^', "TypeError: 'str' object does not support item assignment"], 'terminal') +
    run(findIt, { title: 'find.py' }) + `</div>`;

  COURSE.add({
    id: 'l32', minutes: 12,
    summary: 'Every item in a list has a position number, its <b>index</b>, and the count <b>starts at 0</b>. <code>shopping[0]</code> is the first item and <code>shopping[2]</code> is the third. The last item is <code>shopping[-1]</code>: negative indexes count from the end. Go past the end and Python stops with <code>IndexError</code>. You can <b>change</b> a list item by its index, and you can <b>read</b> text by index, but you can never change text that way.',
    video: {
      src: 'videos/l32-indexing.mp4', poster: 'videos/l32-indexing.jpg', length: '1 min 8 s',
      script: [
        'Here is your kitchen shelf. 6 jars in a row. In Python, that is a list called shopping. Each jar gets a small number tag, its index. And the first tag says 0.',
        'Why 0? The index counts steps from the start. The first jar is right at the start. 0 steps away.',
        'The recipe says, grab the third jar. Your hand goes to jar 2. Shopping, square bracket, 2. Rice.',
        'Want the last jar? Count from the other end. Minus 1 is the last jar. Minus 2 is the one before it. Honey, then oats.',
        'Now the classic slip. 6 jars, so you ask for jar 6. But the tags stop at 5. Your hand reaches past the shelf, into thin air. Index error. List index out of range.',
        'A list can change. Shopping, 1, equals oat milk. The old label comes off, and the new one goes on. Same spot, new item.',
        'Count from 0, and the third jar is jar 2.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'The third jar is jar 2.',
        text: [
          'Your shopping list from lesson 31 sits on a shelf as six jars in a row. Each jar has a small number tag under it. That number is its <b>index</b>: its position on the shelf.',
          'Python starts the tags at <b>0</b>, not 1. The index means "<b>how many steps from the start</b>". The first jar is right at the start, so it is 0 steps away. The next jar is 1 step away, and so on.',
          'So when the recipe says "grab the <b>third</b> jar", your hand goes to <b>jar 2</b>. Two steps from the start. Position minus 1 is always the index.'
        ],
        tip: 'Lesson 27 said <code>range</code> starts at 0 and pointed to this lesson. Now you know why: positions in Python start at 0, so <code>range</code> does too.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'shopping[2] reads the third item.',
        text: [
          'Write the list name, then the index in <b>square brackets</b>: <code>shopping[0]</code> is <code>pasta</code>, the first item. <code>shopping[2]</code> is <code>rice</code>, the third.',
          'Six items means tags 0 to 5. So the last tag is always <b>one less than the length</b>: <code>shopping[len(shopping) - 1]</code>. That works, but it is long. Python has a friendly shortcut: <b>negative indexes count from the end</b>. <code>shopping[-1]</code> is the last item, <code>shopping[-2]</code> the one before it.',
          'Press <b>Run</b>. Then change <code>shopping[2]</code> to fetch the <b>beans</b> and run it again. Which number did you need? (It is 3, the fourth jar.)'
        ],
        tip: 'Every jar has two tags: one counting from the front and one from the back. <code>honey</code> is <code>shopping[5]</code> and also <code>shopping[-1]</code>. There is no <code>-0</code>, because <code>-0</code> is just 0, the first jar.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'One jar too far.',
        text: [
          'You want the third item, so you type <code>shopping[3]</code>. Python gives you <code>beans</code>, the <b>fourth</b> item. There is no error and no warning. This is the <b>off-by-one</b> mistake from lesson 27 again, now with positions.',
          'Then you want the last item. The list has 6 items, so you write <code>shopping[len(shopping)]</code>, which is <code>shopping[6]</code>. But the tags stop at 5. Your hand reaches past the end of the shelf, into thin air.',
          'This time Python stops: <code>IndexError: list index out of range</code>. "Out of range" means "there is no jar with that tag".'
        ],
        warn: 'The two mistakes feel different. Off by one inside the list gives the <b>wrong item, silently</b>. Off by one past the end gives an <b>IndexError</b>. The silent one is the more dangerous.'
      },
      {
        label: 'The fix', pic: run(chloe, { title: 'desserts.py' }),
        h: 'Count from 0, and use -1 for the last.',
        text: [
          'Two rules keep you safe. The item at <b>position n</b> has <b>index n - 1</b>: the third item is <code>[2]</code>. The <b>last</b> item is <code>[-1]</code>, however long the list is.',
          'Chloe keeps her gluten-free dessert ideas in a list, oldest first, so the newest is at the end. Press <b>Run</b>: line 3 prints, then line 4 stops with the IndexError. Read it from the bottom up, as lesson 4 taught.',
          'Fix line 4 so it prints <code>Her newest idea: pavlova</code>. Then add a fifth dessert to the list and run it again. <code>[-1]</code> still finds the newest one, with no counting.'
        ],
        tip: '<code>len(desserts)</code> is how many items there are. The biggest index is always <code>len(desserts) - 1</code>. If you ever write <code>[len(...)]</code> on its own, stop and look again.'
      },
      {
        label: 'Try it', pic: tryPic,
        h: 'Fetch, swap and find.',
        text: [
          '<b>Fetch.</b> The pantry shelf prints its first jar. Add two lines: one that prints the <b>third</b> jar (you should see <code>sugar</code>) and one that prints the <b>last</b> jar with a negative index (<code>honey</code>).',
          '<b>Swap.</b> A list can change, as lesson 31 showed. Put a new value at an index with <code>=</code>, like filling a jar: <code>ben_meals[1] = "tempeh bowl"</code> replaces Ben\'s <b>second</b> meal. The other items stay where they are. Run it: his day now has 77 g of protein instead of 60 g. Then swap his <b>first</b> meal too.',
          '<b>Find.</b> <code>runs_km.index(16)</code> works the other way round: give it an item and it hands back the index. Ana\'s list starts with Monday at index 0. <code>max</code> finds her long run, <code>.index()</code> finds its day, and <code>days[day_no]</code> turns that number into a name. Change her Wednesday rest day (index 2) to an 18 km run and run it again.'
        ],
        warn: '<code>.index()</code> stops with <code>ValueError: list.index(x): x not in list</code> when the item is not there. If it might be missing, ask with <code>in</code> first (see the last box on this page). And if an item is on the list twice, <code>.index()</code> gives the <b>first</b> one.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Text can be read by index, but never changed.',
        text: [
          'Text has positions too, one per character. <code>"pasta"[0]</code> is <code>"p"</code> and <code>"pasta"[-1]</code> is <code>"a"</code>. Reading works exactly like a list.',
          'Changing does not. <code>dish[0] = "b"</code> stops with <code>TypeError: \'str\' object does not support item assignment</code>. Lesson 9 said it: <b>text never changes</b>. Text tools hand you a new copy instead. So build the new text and store it in the jar: <code>dish = dish.replace("p", "b")</code>.',
          'Lists are the opposite: you <b>can</b> change their items. Keep that difference in mind when you meet tuples in lesson 36.',
          'Next, lesson 33, Slicing, takes <b>several</b> items at once, like the first three on the list. And lesson 35, Looping over lists, shows <code>enumerate</code>, which hands a loop each index and item together.'
        ]
      }
    ],
    exercises: [
      {
        file: 'l32_jar_shelf.py', title: 'The spice shelf',
        task: 'A shelf of spices is stored in a list. Print the <b>first</b>, the <b>third</b> and the <b>last</b> spice (the last one with a <b>negative index</b>). Swap the <b>second</b> spice for <code>"sumac"</code> and print it. Then print where <code>"cumin"</code> sits, using <code>.index()</code>.',
        steps: [
          'Press <b>Open in VS Code</b>. The exact lines to print are in the comment at the top of the file.',
          'Write your lines between the <code>START</code> and <code>END</code> lines, under the list. Do not type the spice names yourself. Let the indexes find them. Save the file.',
          'Run it. The check tries your lines on other shelves too, of other sizes and with cumin in other places, then says <code>PASS</code> or gives you one hint.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['shopping = ["pasta", "milk", "rice", "beans", "oats", "honey"]', 'print(shopping[2])'], { title: 'shopping.py' }),
        options: ['rice', 'milk', 'beans', 'IndexError'],
        answer: 0,
        why: 'Indexes start at 0: pasta is 0, milk is 1, rice is 2. <code>[2]</code> is the <b>third</b> item.',
        hint: 'Put a tag under each item, starting with 0 under pasta.'
      },
      {
        type: 'bucket', q: '<code>jars = ["salt", "pepper", "cumin", "paprika"]</code> has 4 items. Which of these work, and which stop with an IndexError?',
        buckets: ['Works', 'IndexError'],
        items: [
          ['jars[0]', 0],
          ['jars[3]', 0],
          ['jars[-1]', 0],
          ['jars[-4]', 0],
          ['jars[4]', 1],
          ['jars[-5]', 1],
          ['jars[len(jars)]', 1]
        ],
        why: 'Four items have tags 0 to 3 from the front and -4 to -1 from the back. <code>jars[len(jars)]</code> is <code>jars[4]</code>, one step past the end.',
        hint: 'Write the tags under the four jars, 0 to 3 on top and -4 to -1 below.'
      },
      {
        type: 'fix', q: 'The recipe says "grab the <b>third</b> jar", but this prints the wrong one. Fix it so it prints <code>Third jar: sugar</code>.',
        code: ['shelf = ["rice", "flour", "sugar", "oats", "lentils", "honey"]', 'print(f"Third jar: {shelf[3]}")'],
        title: 'pantry.py',
        check: [
          'lines = out.splitlines()',
          'if shelf != ["rice", "flour", "sugar", "oats", "lentils", "honey"]:',
          '    msg = "Keep the shelf list exactly as it was. Change only the number in the square brackets."',
          'elif lines == ["Third jar: sugar"]:',
          '    ok = True',
          'elif lines == ["Third jar: oats"]:',
          '    msg = "oats is the fourth jar. Count the tags from 0: rice is 0, flour is 1, sugar is ..."',
          'else:',
          '    msg = "It printed: " + " / ".join(lines) + ". You want exactly: Third jar: sugar"'
        ].join('\n'),
        why: 'The third jar is two steps from the start, so its index is 2: <code>shelf[2]</code>. Position minus 1 is the index.',
        hint: 'The first jar is <code>shelf[0]</code>. Which number is the third?'
      },
      {
        type: 'fix', q: 'Ana wants to see her <b>last</b> run of the week. The program stops with an IndexError. Fix it so it prints <code>Last run: 16 km</code>.',
        code: ['runs_km = [5, 8, 0, 6, 5, 0, 16]', 'print(f"Last run: {runs_km[7]} km")'],
        title: 'ana_week.py',
        check: [
          'lines = out.splitlines()',
          'if runs_km != [5, 8, 0, 6, 5, 0, 16]:',
          '    msg = "Keep the list exactly as it was. Change only the index in the square brackets."',
          'elif lines == ["Last run: 16 km"]:',
          '    ok = True',
          'elif lines == ["Last run: 0 km"]:',
          '    msg = "That is Saturday, the one before the last. The last item has index -1."',
          'else:',
          '    msg = "It printed: " + " / ".join(lines) + ". You want exactly: Last run: 16 km"'
        ].join('\n'),
        why: 'Seven runs have tags 0 to 6, so <code>[7]</code> is past the end. <code>runs_km[-1]</code> always finds the last one, however long the list is. (<code>runs_km[6]</code> prints the right line today, but breaks when the list grows.)',
        hint: 'Use the shortcut for "the last item": a negative index.'
      },
      {
        type: 'type', q: 'Type the expression that gives the <b>last</b> meal in <code>ben_meals</code>, using the short way.',
        prompt: '>>>',
        answers: ['ben_meals[-1]', 'print(ben_meals[-1])'],
        accept: '^(print\\()?ben_meals\\[len\\(ben_meals\\) ?- ?1\\]\\)?$',
        why: '<code>ben_meals[-1]</code> counts one step back from the end. <code>ben_meals[len(ben_meals) - 1]</code> gives the same item, the long way.',
        hint: 'The list name, square brackets, and a negative number.'
      },
      {
        type: 'fill', q: 'Ben swaps his <b>second</b> meal for a tempeh bowl. Fill the blanks.',
        text: 'ben_meals = ["oat porridge", "lentil soup", "tofu stir fry"]\nben_meals[___] ___ "tempeh bowl"',
        options: ['1', '2', '=', '=='],
        answer: ['1', '='],
        why: 'The second meal has index 1. One <code>=</code> stores a value, here into that spot on the list. <code>==</code> only asks a question (lesson 10).',
        hint: 'Count from 0. And are you storing or asking?'
      },
      {
        type: 'pick', q: 'Back to lesson 9. What happens when you run this?',
        pic: code(['dish = "pasta"', 'dish[0] = "b"', 'print(dish)'], { title: 'dish.py' }),
        options: ["TypeError: 'str' object does not support item assignment", 'It prints basta', 'It prints pasta', "IndexError: string index out of range"],
        answer: 0,
        why: 'You can <b>read</b> text by index, but text never changes, so you cannot put a new letter into it. Build new text instead: <code>dish = dish.replace("p", "b")</code>.',
        hint: 'Lesson 9: do text tools change the text, or hand you a copy?'
      },
      {
        type: 'pick', q: 'Your shopping list is <code>["pasta", "milk", "rice"]</code>. What does <code>shopping.index("flour")</code> do?',
        options: ['Stops with ValueError: list.index(x): x not in list', 'Gives -1', 'Gives None', 'Gives 0'],
        answer: 0,
        why: 'Python does not guess. If the item is not on the list, <code>.index()</code> stops with a ValueError. Ask first with <code>if "flour" in shopping:</code>.',
        hint: 'Is flour on the list? Python never makes up an answer.'
      }
    ]
  });
})();
