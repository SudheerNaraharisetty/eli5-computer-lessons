/* Lesson 31: Lists (module 3). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l31  Lists
     ===================================================================== */

  // A slip of paper with one item on it. col: text colour.
  const slip = (x, y, w, s, col, n) =>
    box(x, y, w, 30, P.white, 8) + T(x + 14, y + 21, s, { s: 14, a: 'start', f: col || P.ink }) +
    (n ? `<circle cx="${x}" cy="${y + 15}" r="11" fill="${P.ink}"/>` + T(x, y + 19.5, String(n), { s: 11, f: P.white }) : '');

  const ideaPic = svg(600, 320, 'A fridge with a paper shopping list held by a magnet: flour, eggs, milk, and butter added at the bottom. An arrow leads to a jar labelled shopping that holds the same four slips, numbered 1 to 4. Under it, the Python line shopping equals a list of flour, eggs and milk.',
    // the fridge
    box(24, 14, 190, 262, P.white, 18) +
    `<line x1="24" y1="70" x2="214" y2="70" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<rect x="38" y="28" width="8" height="30" rx="4" fill="${P.ink}"/><rect x="38" y="84" width="8" height="60" rx="4" fill="${P.ink}"/>` +
    `<rect x="64" y="86" width="130" height="174" rx="4" fill="${P.paper2}" stroke="${P.ink}" stroke-width="2"/>` +
    `<circle cx="129" cy="86" r="9" fill="${P.danger}" stroke="${P.ink}" stroke-width="2"/>` +
    T(129, 118, 'Shopping', { s: 16 }) +
    ['flour', 'eggs', 'milk'].map((s, i) => T(80, 148 + i * 28, s, { s: 14, w: 700, a: 'start' }) +
      `<line x1="78" y1="${154 + i * 28}" x2="182" y2="${154 + i * 28}" stroke="${P.sand}" stroke-width="1.5"/>`).join('') +
    T(80, 232, '+ butter', { s: 14, a: 'start', f: P.accent }) +
    T(119, 300, 'one paper, many items', { s: 12.5, w: 700, f: P.ink2 }) +
    arrow(226, 140, 286, 140, P.accent, 3) +
    // the jar
    `<rect x="314" y="44" width="164" height="22" rx="6" fill="${P.ink}"/>` +
    box(320, 70, 152, 196, P.tint, 22) +
    box(344, 20, 104, 22, P.white, 11) + T(396, 36, 'shopping', { s: 12.5, m: true, f: P.accent }) +
    slip(350, 86, 108, 'flour', P.ink, 1) + slip(350, 128, 108, 'eggs', P.ink, 2) +
    slip(350, 170, 108, 'milk', P.ink, 3) + slip(350, 212, 108, 'butter', P.accent, 4) +
    T(396, 300, 'one value, 4 items', { s: 12.5, w: 700, f: P.ink2 }) +
    // the notes
    T(500, 100, 'in order', { s: 14, a: 'start', f: P.ok }) +
    T(500, 122, '1, 2, 3, 4', { s: 12, w: 700, a: 'start', f: P.ink2 }) +
    T(500, 170, 'can grow', { s: 14, a: 'start', f: P.accent }) +
    T(500, 192, '.append()', { s: 12, w: 700, a: 'start', f: P.ink2, m: true }) +
    T(500, 240, 'len counts', { s: 14, a: 'start', f: P.warn }) +
    T(500, 262, 'the slips: 4', { s: 12, w: 700, a: 'start', f: P.ink2 }));

  const builder = [
    'shopping = ["flour", "eggs", "milk"]',
    'print(shopping)',
    'print(len(shopping), "items")',
    'print("eggs" in shopping)',
    '',
    'shopping.append("butter")',
    '# Add two more things you need, the same way:',
    '',
    'for item in shopping:',
    '    print(f"- {item}")'
  ];
  const joinRepeat = [
    'starters = ["bread", "olives"]',
    'mains = ["bean chili", "rice"]',
    'menu = starters + mains',
    'print(menu)',
    'print(["salt"] * 3)',
    'print(len(menu), "dishes")',
    'print(["eggs", 12, 2.5, True])'
  ];
  const codePic = `<div style="width:100%;min-width:0">` +
    run(builder, { title: 'shopping.py' }) +
    code(joinRepeat, { title: 'menu.py', hi: [3, 5] }) +
    term(['$ python3 menu.py', "['bread', 'olives', 'bean chili', 'rice']", "['salt', 'salt', 'salt']", '4 dishes', "['eggs', 12, 2.5, True]"], 'terminal') + `</div>`;

  const joinNumbers = ['week_km = [8, 10, 6, 14, 0, 12, 21]', 'print(", ".join(week_km))'];
  const glued = ['shopping = ["flour" "eggs", "milk"]', 'print(shopping)', 'print(len(shopping))'];
  const listPlusText = ['shopping = ["flour", "eggs", "milk"]', 'print("Buy: " + shopping)'];
  const painPic = `<div style="width:100%;min-width:0">` +
    code(joinNumbers, { title: 'week.py', bad: [2] }) +
    term(['$ python3 week.py', 'Traceback (most recent call last):', '  File "week.py", line 2, in <module>', '    print(", ".join(week_km))', '          ~~~~~~~~~^^^^^^^^^', 'TypeError: sequence item 0: expected str instance, int found'], 'terminal') +
    code(glued, { title: 'glued.py', bad: [1] }) +
    term(['$ python3 glued.py', "['floureggs', 'milk']", '2', '# no error: two items glued into one'], 'terminal') +
    code(listPlusText, { title: 'buy.py', bad: [2] }) +
    term(['$ python3 buy.py', 'Traceback (most recent call last):', '  File "buy.py", line 2, in <module>', '    print("Buy: " + shopping)', '          ~~~~~~~~^~~~~~~~~~', 'TypeError: can only concatenate str (not "list") to str'], 'terminal') + `</div>`;

  const fixMe = [
    'shopping = ["flour" "eggs", "milk", "butter"]',
    'print(len(shopping), "items")',
    'print("Buy: " + ", ".join(shopping))'
  ];
  const numbersFixed = [
    'week_km = [8, 10, 6, 14, 0, 12, 21]',
    'km_text = []',
    'for km in week_km:',
    '    km_text.append(str(km))',
    'print(", ".join(km_text))'
  ];
  const fixPic = `<div style="width:100%;min-width:0">` +
    run(fixMe, { title: 'shopping.py' }) +
    code(numbersFixed, { title: 'week.py, fixed', good: [2, 3, 4, 5] }) +
    term(['$ python3 week.py', '8, 10, 6, 14, 0, 12, 21'], 'terminal') + `</div>`;

  const coach = [
    "# Kitchen Coach: Ana's runs this week, in km, Monday to Sunday",
    'week_km = [8, 10, 6, 14, 0, 12, 21]',
    '',
    'total_km = sum(week_km)',
    'average_km = total_km / len(week_km)',
    '',
    'print(f"Ana ran {total_km} km in {len(week_km)} days")',
    'print(f"Longest run: {max(week_km)} km")',
    'print(f"Shortest day: {min(week_km)} km")',
    'print(f"Average: {average_km:.1f} km a day")'
  ];
  const ben = [
    "# Ben's protein, meal by meal, in grams",
    'meal_protein_g = [30, 45, 40, 25]',
    'print(f"Ben ate {sum(meal_protein_g)} g of protein")'
  ];
  const tryPic = `<div style="width:100%;min-width:0">` + run(coach, { title: 'kitchen_coach.py' }) + run(ben, { title: 'protein.py' }) + `</div>`;

  const letters = [
    'dessert = "rice pudding"',
    'desserts = ["rice pudding"]',
    'print(len(dessert))',
    'print(len(desserts))'
  ];
  const catchPic = `<div style="width:100%;min-width:0">` +
    code(letters, { title: 'desserts.py', hi: [3, 4] }) +
    term(['$ python3 desserts.py', '12', '1', '# text counts letters, a list counts items'], 'terminal') +
    svg(600, 150, 'Text is one jar of letters, so len counts 12 characters. A list is one jar of slips, so len counts 1 item: the whole slip rice pudding.',
      box(24, 22, 260, 84, P.white, 14) + T(154, 50, 'text: "rice pudding"', { s: 14, m: true }) +
      'rice pudding'.split('').map((c, i) => `<rect x="${42 + i * 19}" y="64" width="16" height="26" rx="3" fill="${c === ' ' ? P.sand : P.warnT}" stroke="${P.ink}" stroke-width="1.5"/>` + T(50 + i * 19, 82, c, { s: 12, m: true })).join('') +
      T(154, 134, 'len gives 12 (letters)', { s: 13, f: P.warn }) +
      box(316, 22, 260, 84, P.tint, 14) + T(446, 50, 'list: ["rice pudding"]', { s: 14, m: true }) +
      slip(372, 62, 148, 'rice pudding', P.ink, 1) +
      T(446, 134, 'len gives 1 (item)', { s: 13, f: P.accent })) + `</div>`;

  COURSE.add({
    id: 'l31', minutes: 13,
    summary: 'A <b>list</b> holds many values <b>in order</b>, under one name: <code>shopping = ["flour", "eggs", "milk"]</code>. Square brackets, a <b>comma</b> between items. <code>len()</code> counts the <b>items</b>, <code>in</code> asks "is it on the list?", <code>for</code> goes through it, and <code>sum()</code>, <code>min()</code> and <code>max()</code> work on lists of numbers. Unlike text, a list <b>can change</b>: <code>.append()</code> adds an item at the end.',
    video: {
      src: 'videos/l31-lists.mp4', poster: 'videos/l31-lists.jpg', length: '1 min 2 s',
      script: [
        'On your fridge hangs a shopping list. One paper, many items, in order. Flour, eggs, milk.',
        'In Python, that is a list. Square brackets around it, and a comma between the items. Each item is its own value, here text in quotes.',
        'And you can add to it. Shopping dot append, butter, writes a new item at the bottom.',
        'The whole list is one value. Think of one jar, holding many slips.',
        'Ask len how long it is. It counts the slips, not the letters. 4.',
        'Now drop one comma, between flour and eggs. Python glues the two words into one slip. Flour eggs, as one word. No error. The list just has one item fewer. 3.',
        'Put the comma back, and the slips come apart again.',
        'A list is one value that holds many, in order. And unlike text, it can grow.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'One paper on the fridge, many items, in order.',
        text: [
          'Before you cook for Ana, Ben and Chloe, you write a <b>shopping list</b> and stick it on the fridge. It is <b>one paper</b> with <b>many items</b> on it, one per line, <b>in order</b>. When you remember the butter, you write it at the bottom.',
          'Until now, every jar held <b>one</b> value: one number, one piece of text. A <b>list</b> is one jar that holds <b>many slips</b>. The jar has one name, <code>shopping</code>, and the slips inside keep their order.',
          'You have already met lists. In lesson 26 you looped over <code>guests = ["Ana", "Ben", "Chloe"]</code> and added up Ana\'s meal calories. Lessons 28 and 29 used them too, always with "lesson 31 explains it fully". This is lesson 31.'
        ]
      },
      {
        label: 'The code', pic: codePic,
        h: 'Square brackets, and a comma between the items.',
        text: [
          '<code>shopping = ["flour", "eggs", "milk"]</code> makes a list and puts it in the jar <code>shopping</code>. The <b>square brackets</b> start and end the list. A <b>comma</b> goes between two items. Each item is an ordinary value, here text in quotes.',
          '<code>print(shopping)</code> shows the list the way Python writes it: brackets, quotes and commas. <code>len(shopping)</code> counts the <b>items</b>: 3. <code>"eggs" in shopping</code> asks "is it on the list?", like <code>in</code> on text in lesson 9 and lesson 22: <code>True</code>. And <code>for item in shopping:</code> from lesson 26 hands you one whole item per round.',
          'A list <b>can change</b>. <code>shopping.append("butter")</code> adds <code>"butter"</code> at the <b>end</b>. <code>.append()</code> is a method, a tool with a dot, like the text tools of lesson 9. Press <b>Run</b>. Then add <b>two</b> more things under line 7, one <code>shopping.append(...)</code> each, and run it again. The loop prints them without a single new <code>print</code>.',
          'The second box: <code>+</code> joins two lists into a new one and <code>*</code> repeats one, just as they did for text in lesson 8. A list can even hold <b>different kinds</b> of value, but keep one kind per list. A list of names, a list of numbers: then every item can be treated the same way.'
        ],
        tip: 'An empty list is written <code>[]</code>. It is <b>falsy</b>, like empty text in lesson 23: <code>if basket:</code> is False while the basket is empty. Start an empty list and <code>.append()</code> to it as you go.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Numbers that will not join, two items glued, and a list that is not text.',
        text: [
          '<b>Pain 1: join wants text.</b> <code>", ".join(shopping)</code> glues a list of text into one line, with <code>", "</code> between the items: <code>flour, eggs, milk</code>. Try it on Ana\'s week of runs, a list of <b>numbers</b>, and Python stops: <code>TypeError: sequence item 0: expected str instance, int found</code>. "Item 0" is the first item, <code>8</code>. It is a number, not text.',
          '<b>Pain 2: a missing comma.</b> Forget the comma after <code>"flour"</code> and Python puts the two pieces of text side by side. Text next to text is glued into one: <code>"floureggs"</code>. The list has <b>2</b> items, not 3, and there is <b>no error</b>. You only find out at the shop.',
          '<b>Pain 3: the list is not its items.</b> <code>"Buy: " + shopping</code> tries to add a whole list to text. Python cannot, and says so: <code>can only concatenate str (not "list") to str</code>. The list is the jar. The text is on the slips inside it.'
        ],
        warn: 'Pain 2 is the dangerous one, because nothing goes red. When a list is long, put each item on its own line, each with a comma after it. Then a missing comma is easy to spot.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Put the comma back. Turn the numbers into text first.',
        text: [
          'Press <b>Run</b> on the first box. It says <code>3 items</code> and <code>Buy: floureggs, milk, butter</code>. One slip is two things glued together.',
          'Fix line 1: put a comma between <code>"flour"</code> and <code>"eggs"</code>. Run it again: <code>4 items</code> and <code>Buy: flour, eggs, milk, butter</code>. Look how <code>"Buy: " + ", ".join(shopping)</code> fixes Pain 3 too: <code>join</code> turns the list into text first, so text meets text.',
          'For a list of <b>numbers</b>, make a list of text first. Start with an empty list, loop over the numbers, and <code>.append(str(km))</code> each one, with <code>str()</code> from lesson 13. Now <code>join</code> gets text and prints <code>8, 10, 6, 14, 0, 12, 21</code>. Lesson 76, Comprehensions, does the same in one line.'
        ],
        tip: 'Just want to show each item? Skip <code>join</code> and use a loop: <code>for km in week_km: print(km)</code>. A loop does not care what kind the items are.'
      },
      {
        label: 'Try it', pic: tryPic,
        h: 'Kitchen Coach gets lists: Ana\'s week of runs.',
        text: [
          'Ana is training for her half-marathon. Kitchen Coach keeps her runs for the week in one list, Monday to Sunday. The <code>0</code> is her rest day.',
          'Python has tools for a list of numbers. <code>sum()</code> adds them all up, so you need no accumulator. <code>max()</code> and <code>min()</code>, which you used on loose numbers in lesson 7, give the biggest and the smallest. The average is the sum divided by <code>len()</code>. Press <b>Run</b>: <code>Ana ran 71 km in 7 days</code> and an average of <code>10.1 km a day</code>.',
          'Now change Sunday\'s long run from <code>21</code> to <code>16</code>. Before you press Run, say the new total, the longest run and the average out loud. (66, 16 and 9.4.)',
          'The second box is Ben\'s protein, meal by meal. His goal is 140 g a day. Did he make it? Add a fifth meal with <code>meal_protein_g.append(...)</code> before the print and run it again.'
        ]
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'A list is one value that holds others.',
        text: [
          'The list is <b>one value</b>: one jar, one name. The items are values <b>inside</b> it. <code>len()</code> counts what is directly inside. Text holds letters, so <code>len("rice pudding")</code> is <code>12</code>. Chloe\'s dessert list holds one slip, so <code>len(["rice pudding"])</code> is <code>1</code>.',
          '<b>Two names, one list.</b> <code>spare = shopping</code> does not copy the paper. It sticks a second label on the <b>same</b> list, so <code>spare.append("salt")</code> puts salt on <code>shopping</code> too. Lesson 97, Mutability and references, explains why. And <code>*</code> on a list that holds other lists has the same trap, for later.',
          'Next you learn to pick items out of the list. Lesson 32, Indexing, gets the third thing on it. Lesson 33, Slicing, gets the first three. Lesson 34, List methods, shows the other tools: remove, sort and more.'
        ],
        warn: 'Text never changes: a text tool hands you a new copy (lesson 9). A list <b>does</b> change: <code>.append()</code> changes the list itself and hands back <code>None</code>. So write <code>shopping.append("salt")</code> on its own line, never <code>shopping = shopping.append("salt")</code>. That puts <code>None</code> in the jar and loses the list.'
      }
    ],
    exercises: [
      {
        file: 'l31_shopping_list.py', title: 'The dinner shopping list',
        task: 'Write tonight\'s shopping list as a Python list, add <b>butter</b> and <b>lemons</b> with <code>.append()</code>, then print how many items there are, whether <b>eggs</b> are on it, the whole list joined with <code>", "</code>, and the total of Ben\'s protein list with <code>sum()</code>.',
        steps: [
          'Press <b>Open in VS Code</b>. The exact words of each line are in the comment at the top of the file.',
          'Write your lines between the <code>START</code> and <code>END</code> lines. Leave <code>ben_protein_g</code> as it is. Save the file.',
          'Run it. Step 1 shows what you printed. Step 2 checks the list, your <code>append</code> and <code>join</code> lines, and tries another protein list. It says <code>PASS</code> or gives you one hint.',
          'Two items glued together? A comma is missing. A <code>TypeError</code> about <code>str instance</code>? You joined numbers.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'How many items are in this list?',
        pic: code(['shopping = ["flour" "eggs", "milk"]', 'print(len(shopping))'], { title: 'count.py' }),
        options: ['2', '3', '1', 'An error'],
        answer: 0,
        why: 'Without a comma, <code>"flour" "eggs"</code> is glued into one piece of text, <code>"floureggs"</code>. The list holds 2 items, and Python gives no error.',
        hint: 'Count the commas. Each comma separates two items.'
      },
      {
        type: 'fix', q: 'Dinner needs 4 things, but this says 3. Fix it so it prints <code>4 items</code> and then one line per item.',
        code: ['dinner = ["rice", "black beans" "tomatoes", "lemons"]', 'print(len(dinner), "items")', 'for item in dinner:', '    print(f"- {item}")'],
        title: 'dinner.py',
        check: [
          'want = ["4 items", "- rice", "- black beans", "- tomatoes", "- lemons"]',
          'lines = out.splitlines()',
          'if lines == want:',
          '    ok = dinner == ["rice", "black beans", "tomatoes", "lemons"]',
          '    msg = "" if ok else "Keep the 4 items as they are. Only add what is missing."',
          'elif "- black beanstomatoes" in lines:',
          '    msg = "Still glued: black beanstomatoes. A comma is missing between two items on line 1."',
          'else:',
          '    msg = "It printed: " + " / ".join(lines) + ". You want: " + " / ".join(want)'
        ].join('\n'),
        why: 'One comma between <code>"black beans"</code> and <code>"tomatoes"</code> turns one glued item back into two. Now <code>len</code> counts 4.',
        hint: 'Look at the items between the quotes on line 1. Which two have no comma between them?'
      },
      {
        type: 'fix', q: 'Ana wants her week on one line. Python stops with a <code>TypeError</code>. Fix it so it prints <code>Ana\'s week: 8, 10, 6, 14, 0, 12, 21 km</code>. Keep <code>week_km</code> a list of numbers.',
        code: ['week_km = [8, 10, 6, 14, 0, 12, 21]', 'print("Ana\'s week: " + ", ".join(week_km) + " km")'],
        title: 'week.py',
        check: [
          'if out.strip() == "Ana\'s week: 8, 10, 6, 14, 0, 12, 21 km":',
          '    ok = week_km == [8, 10, 6, 14, 0, 12, 21]',
          '    msg = "" if ok else "Keep week_km as a list of numbers. Make a second list of text for join."',
          'else:',
          '    msg = "It printed: " + out.strip() + ". You want exactly: Ana\'s week: 8, 10, 6, 14, 0, 12, 21 km"'
        ].join('\n'),
        why: '<code>join</code> only glues text. Build a list of text first: <code>km_text = []</code>, then <code>for km in week_km: km_text.append(str(km))</code>, and join <code>km_text</code>.',
        hint: 'Make an empty list, loop over week_km, and append str(km) for each one. Then join that list instead.'
      },
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['desserts = ["rice pudding"]', 'print(len(desserts))'], { title: 'desserts.py' }),
        options: ['1', '12', '11', '2'],
        answer: 0,
        why: '<code>len</code> on a list counts its <b>items</b>, not the letters inside them. One slip, so 1. <code>len("rice pudding")</code>, the text on its own, would be 12.',
        hint: 'Is <code>desserts</code> a piece of text, or a jar with slips in it?'
      },
      {
        type: 'fill', q: 'Chloe has a new dessert idea. Fill the blanks so this prints <code>3 ideas</code>.',
        text: 'desserts = ["rice pudding", "fruit salad"]\ndesserts.___("lemon sorbet")\nif "lemon sorbet" ___ desserts:\n    print(___(desserts), "ideas")',
        options: ['append', 'in', 'len', 'add', 'sum', '=='],
        answer: ['append', 'in', 'len'],
        why: '<code>.append()</code> adds the sorbet at the end. <code>in</code> asks whether it is on the list now. <code>len()</code> counts the items: 3. <code>sum()</code> only works on numbers.',
        hint: 'One tool adds an item, one word asks "is it there?", one tool counts.'
      },
      {
        type: 'match', q: 'With <code>shopping = ["flour", "eggs", "milk"]</code>, match each line to what it gives.',
        pairs: [
          ['len(shopping)', '<code>3</code>'],
          ['"eggs" in shopping', '<code>True</code>'],
          ['shopping + ["salt"]', "<code>['flour', 'eggs', 'milk', 'salt']</code>"],
          ['["salt"] * 2', "<code>['salt', 'salt']</code>"],
          ['", ".join(shopping)', '<code>flour, eggs, milk</code>']
        ],
        why: '<code>len</code> counts items, <code>in</code> answers True or False, <code>+</code> joins two lists, <code>*</code> repeats one, and <code>join</code> turns a list of text into one piece of text.',
        hint: 'Only one of them gives text without brackets.'
      },
      {
        type: 'pick', q: 'Back to lesson 23. What does this print?',
        pic: code(['basket = []', 'if basket:', '    print("Off to the shop")', 'else:', '    print("Nothing to buy")'], { title: 'basket.py' }),
        options: ['Nothing to buy', 'Off to the shop', 'An error: an empty list is not True or False', 'Nothing at all'],
        answer: 0,
        why: 'An empty list is <b>falsy</b>, like <code>0</code> and empty text. <code>if basket:</code> is False, so the <code>else</code> block runs. Append one item and it becomes truthy.',
        hint: 'Does an empty basket count as something?'
      },
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['shopping = ["flour", "eggs"]', 'spare = shopping', 'spare.append("salt")', 'print(shopping)'], { title: 'spare.py' }),
        options: ["['flour', 'eggs', 'salt']", "['flour', 'eggs']", "['salt']", 'An error'],
        answer: 0,
        why: '<code>spare = shopping</code> does not copy the list. Both names are labels on the <b>same</b> list, so the salt shows up under both. Lesson 97, Mutability and references, goes deeper.',
        hint: 'How many lists are there here: one or two?'
      }
    ]
  });
})();
