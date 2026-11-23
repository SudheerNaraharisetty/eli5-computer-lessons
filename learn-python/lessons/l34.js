/* Lesson 34: List methods (module 3). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l34  List methods
     ===================================================================== */

  // A text message bubble from a friend.
  const bubble = (x, y, w, name, said, col) =>
    box(x, y, w, 52, P.white, 14) +
    `<circle cx="${x + 26}" cy="${y + 26}" r="15" fill="${col}" stroke="${P.ink}" stroke-width="2"/>` + T(x + 26, y + 31, name[0], { s: 13, f: P.white }) +
    T(x + 50, y + 21, name, { s: 11.5, a: 'start', f: col }) + T(x + 50, y + 41, said, { s: 13.5, w: 700, a: 'start' });

  const ideaPic = svg(600, 320, 'Three text messages on the left: Ben says add tofu, Chloe says no flour, I am gluten-free, Ana says bananas first. Arrows lead to one paper shopping list. Bananas is written at the top in blue, flour is crossed out in red, and tofu is added at the bottom in green. It is the same paper, changed in place.',
    T(20, 26, 'Saturday texts', { s: 14, a: 'start', f: P.ink2 }) +
    bubble(20, 42, 250, 'Ben', 'add tofu', P.ok) +
    bubble(20, 112, 250, 'Chloe', "no flour, I'm gluten-free", P.danger) +
    bubble(20, 182, 250, 'Ana', 'bananas first!', P.accent) +
    arrow(282, 68, 352, 238, P.ok, 2.5) + arrow(282, 138, 352, 124, P.danger, 2.5) + arrow(282, 208, 352, 84, P.accent, 2.5) +
    // the paper
    `<rect x="372" y="24" width="208" height="262" rx="6" fill="${P.paper2}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<circle cx="476" cy="24" r="10" fill="${P.danger}" stroke="${P.ink}" stroke-width="2"/>` +
    T(476, 58, 'Saturday', { s: 17 }) +
    [['bananas', P.accent, 'insert(0, ...)'], ['milk', P.ink], ['flour', P.danger, 'remove(...)'], ['eggs', P.ink], ['rice', P.ink], ['tofu', P.ok, 'append(...)']].map((r, i) => {
      const y = 90 + i * 31;
      return T(392, y, r[0], { s: 15, w: 800, a: 'start', f: r[1] }) +
        `<line x1="390" y1="${y + 8}" x2="562" y2="${y + 8}" stroke="${P.sand}" stroke-width="1.5"/>` +
        (r[0] === 'flour' ? `<line x1="388" y1="${y - 5}" x2="438" y2="${y - 5}" stroke="${P.danger}" stroke-width="3"/>` : '') +
        (r[2] ? T(564, y, r[2], { s: 10.5, w: 700, a: 'end', f: r[1], m: true }) : '');
    }).join('') +
    T(476, 306, 'one paper, changed in place', { s: 12.5, w: 700, f: P.ink2 }));

  const saturday = [
    'shopping = ["milk", "flour", "eggs", "rice"]',
    'print(f"Start:  {shopping}")',
    '',
    'shopping.append("tofu")         # Ben: add tofu',
    'shopping.remove("flour")        # Chloe: no flour, please',
    'shopping.insert(0, "bananas")   # Ana: bananas first!',
    'print(f"Texts:  {shopping}")',
    '',
    'shopping.sort()                 # A to Z, aisle by aisle',
    'print(f"Sorted: {shopping}")'
  ];
  const popper = [
    'shopping = ["bananas", "eggs", "milk", "rice", "tofu"]',
    '',
    'ben_buys = shopping.pop()   # takes the LAST item off',
    'print(f"Ben buys the {ben_buys}")   # pop handed it back',
    '',
    'first = shopping.pop(0)     # the item at index 0',
    'print(f"Ana grabs the {first}")',
    'print(shopping)',
    'print(shopping.count("eggs"), "box of eggs on the list")'
  ];
  const codePic = `<div style="width:100%;min-width:0">${run(saturday, { title: 'saturday.py' })}${run(popper, { title: 'pop.py' })}</div>`;

  const sortNone = ['shopping = ["milk", "eggs", "rice", "tofu"]', 'shopping = shopping.sort()', 'print(shopping)'];
  const appendNone = ['shopping = ["milk", "eggs", "rice"]', 'print(shopping.append("tofu"))', 'print(shopping)'];
  const removeMissing = ['shopping = ["bananas", "eggs", "milk", "rice"]', 'shopping.remove("flour")   # Chloe texted twice', 'print(shopping)'];
  const painPic = `<div style="width:100%;min-width:0">` +
    code(sortNone, { title: 'sort_none.py', bad: [2] }) +
    term(['$ python3 sort_none.py', 'None', '# the list was sorted, then None went into the jar'], 'terminal') +
    code(appendNone, { title: 'append_none.py', bad: [2] }) +
    term(['$ python3 append_none.py', 'None', "['milk', 'eggs', 'rice', 'tofu']", '# append did its job. Its answer is None.'], 'terminal') +
    code(removeMissing, { title: 'twice.py', bad: [2] }) +
    term(['$ python3 twice.py', 'Traceback (most recent call last):', '  File "twice.py", line 2, in <module>', '    shopping.remove("flour")   # Chloe texted twice', '    ~~~~~~~~~~~~~~~^^^^^^^^^', 'ValueError: list.remove(x): x not in list'], 'terminal') + `</div>`;

  const fixed = [
    'week_km = [5, 8, 6, 0, 10, 7, 16]',
    'by_size = sorted(week_km)        # sorted() hands back a NEW list',
    'print(by_size)',
    'print(week_km)                   # Monday to Sunday, untouched',
    '',
    'shopping = ["bananas", "eggs", "milk"]',
    'if "flour" in shopping:          # ask before you remove',
    '    shopping.remove("flour")',
    'print(shopping)'
  ];
  const fixPic = `<div style="width:100%;min-width:0">${run(sortNone, { title: 'sort_none.py' })}` +
    code(fixed, { title: 'the_fix.py', good: [2, 7, 8] }) +
    term(['$ python3 the_fix.py', '[0, 5, 6, 7, 8, 10, 16]', '[5, 8, 6, 0, 10, 7, 16]', "['bananas', 'eggs', 'milk']"], 'terminal') + `</div>`;

  const coach = [
    "# Kitchen Coach: Ana's runs this week, in km, Monday to Sunday",
    'week_km = [5, 8, 6, 0, 10, 7, 16]',
    '',
    'longest_first = sorted(week_km, reverse=True)   # a NEW list, biggest first',
    'print(f"Top three runs: {longest_first[:3]} km")',
    'print(f"Rest days: {week_km.count(0)}")',
    'print(f"The week, in order: {week_km}")',
    '',
    'week_km.append(12)   # next Monday',
    'print(f"Days logged: {len(week_km)}")'
  ];

  const caps = [
    'shopping = ["bananas", "Tofu", "eggs"]',
    'shopping.sort()',
    'print(shopping)',
    '',
    'trays = ["eggs", "milk", "eggs"]',
    'trays.remove("eggs")       # only the FIRST eggs',
    'print(trays)'
  ];
  const mixed = ['basket = [500, "eggs", 12]', 'basket.sort()'];
  const kinds = svg(600, 196, 'Three kinds of list tool. Changes the list and hands back None: append, insert, remove, sort. Changes the list and hands back the item: pop. Only answers, the list stays as it is: count, index, len, sorted.',
    [['Changes the list', 'hands back None', 'append  insert\nremove  sort', P.danger, P.dangerT],
      ['Changes the list', 'hands back the item', 'pop()', P.accent, P.tint],
      ['Only answers', 'the list stays put', 'count  index\nlen  sorted', P.ok, P.okT]].map((k, i) => {
      const x = 16 + i * 196;
      return box(x, 16, 180, 164, k[4], 14) +
        T(x + 90, 46, k[0], { s: 14.5, f: k[3] }) + T(x + 90, 68, k[1], { s: 12.5, w: 700, f: P.ink2 }) +
        k[2].split('\n').map((l, j) => T(x + 90, 112 + j * 30, l, { s: 15, m: true })).join('');
    }).join(''));
  const catchPic = `<div style="width:100%;min-width:0">${kinds}` +
    code(caps, { title: 'surprises.py' }) +
    term(['$ python3 surprises.py', "['Tofu', 'bananas', 'eggs']", "['milk', 'eggs']"], 'terminal') +
    code(mixed, { title: 'basket.py', bad: [2] }) +
    term(['$ python3 basket.py', 'Traceback (most recent call last):', '  File "basket.py", line 2, in <module>', '    basket.sort()', '    ~~~~~~~~~~~^^', "TypeError: '<' not supported between instances of 'str' and 'int'"], 'terminal') + `</div>`;

  COURSE.add({
    id: 'l34', minutes: 13,
    summary: 'A list comes with tools, called <b>methods</b>, that <b>change the list itself</b>. <code>.append(x)</code> adds at the end, <code>.insert(0, x)</code> adds at index 0, <code>.remove(x)</code> takes off the first <code>x</code>, <code>.pop()</code> takes off the last item and <b>hands it back</b>, and <code>.sort()</code> puts the list in order (<code>reverse=True</code> for biggest first). They work <b>in place</b> and hand back <code>None</code>, so call them <b>on their own line</b>, never <code>shopping = shopping.sort()</code>. Want a new sorted list? Use <code>sorted()</code>. Remove only what is there: ask with <code>in</code> first.',
    video: {
      src: 'videos/l34-list-methods.mp4', poster: 'videos/l34-list-methods.jpg', length: '1 min 4 s',
      script: [
        'Saturday morning. The shopping list for your 3 friends hangs on the fridge. Milk, flour, eggs, rice.',
        'Your phone buzzes. Ben: add tofu. Shopping dot append, tofu. It goes on at the bottom.',
        "Chloe: take the flour off, I'm gluten free. Shopping dot remove, flour. Crossed off.",
        'Ana: bananas first! Shopping dot insert, 0, bananas. Index 0 is the top of the list.',
        'Last, sort it, so you can walk the shop from A to Z.',
        'Every method changed the same paper. No new list was made. So what does a method hand back? Nothing. None.',
        'Now watch. Shopping equals shopping dot sort. The list gets sorted, and then the answer, None, goes into the jar. Your shopping list is gone.',
        'The fix: call the method on its own line. And when you want a new sorted list, use sorted.',
        'List methods change the list itself. They hand back None.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Three texts, one paper.',
        text: [
          'Saturday. The shopping list for Ana, Ben and Chloe hangs on the fridge. Then your phone starts buzzing. <b>Ben</b>: "add tofu". <b>Chloe</b>: "take the flour off, I\'m gluten-free". <b>Ana</b>: "bananas first!"',
          'You do not write a new list for every text. You take a pen and <b>change the same paper</b>: tofu at the bottom, flour crossed off, bananas squeezed in at the top.',
          'A Python list works the same way. It comes with tools, called <b>methods</b>, that change the list <b>itself</b>. You met the first one in lesson 31: <code>.append()</code>. This lesson adds the rest of the pen: insert, remove, pop and sort.'
        ],
        tip: 'Methods on text (lesson 9) never change the text: they hand you a new copy. Methods on a list do the opposite. They change the list <b>in place</b>, right there in the jar.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'append, insert, remove, pop, sort.',
        text: [
          'Each method is written the same way: the list, a dot, the method, brackets. <code>shopping.append("tofu")</code> adds tofu at the <b>end</b>. <code>shopping.remove("flour")</code> takes flour <b>off</b>. <code>shopping.insert(0, "bananas")</code> puts bananas <b>at index 0</b>, the top, and every other item moves down one place. The first number is the index from lesson 32.',
          '<code>shopping.sort()</code> puts the list in order: A to Z for text, small to big for numbers. Press <b>Run</b> on <code>saturday.py</code> and watch the list change after each text.',
          'Your turn: Chloe texts again, "no milk either". Add a line after line 6 that takes milk off, and run it. Then make it Z to A: change line 9 to <code>shopping.sort(reverse=True)</code>.',
          '<code>pop()</code> is the one method that <b>gives something back</b>. It takes the <b>last</b> item off the list and hands it to you, so you can keep it in a jar: <code>ben_buys = shopping.pop()</code>. With an index, <code>pop(0)</code> takes the item at index 0. Run <code>pop.py</code>. The last line uses <code>.count()</code>, which counts how many times an item is on the list, like <code>.count()</code> on text in lesson 9.'
        ],
        tip: 'Read <code>insert(0, "bananas")</code> out loud as "insert, at index 0, bananas". Position first, then the item.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'None in the jar, and flour that is not there.',
        text: [
          '<b>Pain 1: the list turns into None.</b> You want the list sorted, so you write <code>shopping = shopping.sort()</code>. It looks like the text tools of lesson 9. But <code>.sort()</code> sorts the list <b>in place</b> and hands back <code>None</code>, the empty jar from lesson 16. Then <code>=</code> puts that <code>None</code> in the jar called <code>shopping</code>. The sorted list is gone, and <code>print</code> shows <code>None</code>.',
          '<b>Pain 2: printing a method.</b> <code>print(shopping.append("tofu"))</code> prints <code>None</code>. The tofu <b>was</b> added, as the next line shows. You printed the method\'s answer, and the answer is None.',
          '<b>Pain 3: removing what is not there.</b> Chloe texts "no flour" twice. The second <code>remove</code> finds no flour, and Python stops: <code>ValueError: list.remove(x): x not in list</code>. It is the same error as <code>.index()</code> in lesson 32.'
        ],
        warn: 'Pain 1 often shows up a line later, as a different error. After <code>shopping = shopping.sort()</code>, the next <code>shopping.append("tofu")</code> stops with <code>AttributeError: \'NoneType\' object has no attribute \'append\'</code>. When you see <code>NoneType</code>, look for a method whose answer went into a jar.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Own line. sorted() for a copy. in before remove.',
        text: [
          '<b>1. Call the method on its own line.</b> Press <b>Run</b> on the box: <code>None</code>. Now change line 2 to just <code>shopping.sort()</code> and run it again. The list is sorted, and it is still in the jar. A method that changes the list needs no <code>=</code>.',
          '<b>2. Want a new list? Use <code>sorted()</code>.</b> <code>sorted(week_km)</code> is not a method: the list goes inside the brackets. It hands back a <b>new</b> sorted list and leaves the original alone. Ana\'s week stays Monday to Sunday. Use <code>.sort()</code> when you want to change the list, and <code>sorted()</code> when you want to keep it.',
          '<b>3. Ask with <code>in</code> before you remove.</b> <code>if "flour" in shopping:</code> from lesson 31, then <code>remove</code> on the line under it. No flour, no remove, no error.'
        ],
        tip: 'A quick test: does the tool change the list? Then it hands back <code>None</code>, so never put its answer in a jar or a print. The only exception you have met is <code>pop()</code>: it changes the list <b>and</b> hands back the item.'
      },
      {
        label: 'Try it', pic: run(coach, { title: 'kitchen_coach.py' }),
        h: 'Kitchen Coach: Ana\'s best runs.',
        text: [
          'Ana wants her three longest runs of the week, but her week must stay in day order for her training log. So Kitchen Coach uses <code>sorted(week_km, reverse=True)</code>: a <b>new</b> list, biggest first. Then a slice from lesson 33, <code>[:3]</code>, takes the top three. Press <b>Run</b>: <code>[16, 10, 8]</code>.',
          '<code>week_km.count(0)</code> counts her rest days: 1. And <code>.append(12)</code> logs next Monday at the end of the list.',
          'Your turn: Ana takes next Monday off. On line 9, change <code>12</code> to <code>0</code>. Then copy line 6 to the very end, so it counts again after the change. Before you press Run, say what it will print. (Rest days: 2.)',
          'Then try the trap on purpose: change line 4 to <code>longest_first = week_km.sort(reverse=True)</code>. Read the error, then put it back.'
        ]
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Three kinds of tool, and three surprises.',
        text: [
          'Sort list tools into <b>three kinds</b>. Some <b>change</b> the list and hand back <code>None</code>: append, insert, remove, sort. <code>pop()</code> changes the list <b>and</b> hands back the item. Some only <b>answer</b> and leave the list alone: <code>count</code>, <code>index</code>, <code>len</code> and <code>sorted</code>. Only the answers belong in a jar or a print.',
          '<b>Capitals sort first.</b> To Python, every capital letter comes before every small letter, so <code>"Tofu"</code> lands before <code>"bananas"</code>. Keep a list all lower case and it sorts the way you expect. (Lesson 81, sorted, map and filter, shows how to sort with no care for capitals.)',
          '<b>remove takes only the first one.</b> <code>trays.remove("eggs")</code> on a list with eggs twice takes off the first, and the second stays. Check with <code>count</code> if it matters.',
          '<b>Numbers and text do not sort together.</b> Python cannot say whether <code>500</code> comes before <code>"eggs"</code>, so <code>sort</code> stops with a <code>TypeError</code>. One kind of value per list, as lesson 31 said. Next, lesson 35, Looping over lists, checks every item in the basket.'
        ],
        warn: '<code>pop()</code> on an empty list stops with <code>IndexError: pop from empty list</code>. If the list might be empty, ask first: <code>if shopping:</code> is False for an empty list (lesson 23).'
      }
    ],
    exercises: [
      {
        file: 'l34_saturday_list.py', title: 'The Saturday list',
        task: 'Your phone keeps buzzing. Apply the friends\' texts to the shopping list <b>in order</b>, with list methods only: add tofu, take flour off, take bread off <b>only if it is there</b>, put bananas at the top, <code>pop()</code> Ben\'s tofu and print it, sort A to Z, and print the list.',
        steps: [
          'Press <b>Open in VS Code</b>. The texts, and the 2 exact lines to print, are in the comment at the top of the file.',
          'The first text is done for you, with the classic mistake in it: <code>shopping = shopping.append("tofu")</code>. Fix it, then add the other texts between the <code>START</code> and <code>END</code> lines. Save the file.',
          'Run it. The check runs your lines again with another list, one that <b>has</b> bread on it, so let the methods do the work. It says <code>PASS</code> or gives you one hint.',
          'A <code>ValueError</code> about <code>x not in list</code>? Ask with <code>in</code> before you remove. <code>NoneType</code>? A method\'s answer went into a jar.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['shopping = ["milk", "eggs", "rice"]', 'shopping = shopping.sort()', 'print(shopping)'], { title: 'sorted_list.py' }),
        options: ['None', "['eggs', 'milk', 'rice']", "['milk', 'eggs', 'rice']", 'An error'],
        answer: 0,
        why: '<code>.sort()</code> sorts the list in place and hands back <code>None</code>. The <code>=</code> then puts that <code>None</code> in the jar, so the list is lost. Write <code>shopping.sort()</code> on its own line.',
        hint: 'What does a method that changes a list hand back?'
      },
      {
        type: 'match', q: 'Start with <code>shopping = ["milk", "eggs", "rice"]</code> each time. Match each line to the list it leaves.',
        pairs: [
          ['shopping.append("tofu")', "<code>['milk', 'eggs', 'rice', 'tofu']</code>"],
          ['shopping.insert(0, "tofu")', "<code>['tofu', 'milk', 'eggs', 'rice']</code>"],
          ['shopping.remove("eggs")', "<code>['milk', 'rice']</code>"],
          ['shopping.sort()', "<code>['eggs', 'milk', 'rice']</code>"],
          ['shopping.sort(reverse=True)', "<code>['rice', 'milk', 'eggs']</code>"]
        ],
        why: 'append adds at the end, insert(0, ...) at the top, remove takes off the item, sort orders A to Z, and reverse=True orders Z to A.',
        hint: 'Two of them keep 4 items. Only one has 2 items left.'
      },
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['shopping = ["eggs", "milk", "tofu"]', 'item = shopping.pop()', 'print(item, len(shopping))'], { title: 'pop.py' }),
        options: ['tofu 2', 'tofu 3', 'None 2', 'eggs 2'],
        answer: 0,
        why: '<code>pop()</code> takes the <b>last</b> item off and hands it back, so <code>item</code> is <code>"tofu"</code> and the list has 2 items left. It is the one method here that gives you something.',
        hint: 'Which item does pop() take with nothing in the brackets? And how many are left?'
      },
      {
        type: 'fix', q: 'Kitchen Coach wants Ana\'s top three runs, and her week must stay in day order. This stops with an error. Fix it so it prints <code>Top three: [16, 10, 8]</code> and then <code>Monday: 5 km</code>.',
        code: ['week_km = [5, 8, 6, 0, 10, 7, 16]', 'longest_first = week_km.sort(reverse=True)', 'print(f"Top three: {longest_first[:3]}")', 'print(f"Monday: {week_km[0]} km")'],
        title: 'top_three.py',
        check: [
          'lines = out.splitlines()',
          'if lines == ["Top three: [16, 10, 8]", "Monday: 5 km"]:',
          '    ok = week_km == [5, 8, 6, 0, 10, 7, 16]',
          '    msg = "" if ok else "Keep week_km in Monday to Sunday order. Make a new sorted list instead."',
          'elif "Monday: 16 km" in lines:',
          '    msg = "Top three is right, but Monday now says 16 km: .sort() reordered Ana\'s week itself. sorted(week_km, reverse=True) makes a NEW list and leaves the week alone."',
          'else:',
          '    msg = "It printed: " + " / ".join(lines) + ". You want: Top three: [16, 10, 8] / Monday: 5 km"'
        ].join('\n'),
        why: '<code>week_km.sort(reverse=True)</code> hands back <code>None</code>, and <code>None[:3]</code> is a <code>TypeError</code>. <code>longest_first = sorted(week_km, reverse=True)</code> makes a new list, so the week keeps its order.',
        hint: 'You want a NEW sorted list and the old one untouched. Which tool does that?'
      },
      {
        type: 'fix', q: 'Chloe sent "no flour" twice, and the program stops with a <code>ValueError</code>. Fix it so it prints <code>[\'bananas\', \'eggs\', \'milk\']</code>, and so a third text would not break it either.',
        code: ['shopping = ["bananas", "flour", "eggs", "milk"]', 'shopping.remove("flour")    # Chloe\'s first text', 'shopping.remove("flour")    # Chloe texted it again', 'print(shopping)'],
        title: 'twice.py',
        check: [
          'got = out.strip()',
          'if got == "[\'bananas\', \'eggs\', \'milk\']":',
          '    ok = True',
          'elif "flour" in got:',
          '    msg = "Flour is still on the list. Keep one remove, and ask with in before it."',
          'else:',
          '    msg = "It printed " + got + ". You want [\'bananas\', \'eggs\', \'milk\']."'
        ].join('\n'),
        why: 'Put each remove under <code>if "flour" in shopping:</code>. The second time, flour is not there, so the <code>if</code> is False and nothing breaks.',
        hint: 'Ask "is flour on the list?" with in before each remove.'
      },
      {
        type: 'bucket', q: 'Does this line <b>change</b> the list <code>shopping</code>, or only give an answer?',
        buckets: ['Changes the list', 'Only answers'],
        items: [
          ['shopping.append("tofu")', 0],
          ['shopping.sort()', 0],
          ['shopping.pop()', 0],
          ['shopping.insert(0, "oats")', 0],
          ['shopping.count("eggs")', 1],
          ['sorted(shopping)', 1],
          ['shopping.index("milk")', 1],
          ['len(shopping)', 1]
        ],
        why: 'append, sort, pop and insert change the list itself. count, index and len only answer a question, and <code>sorted()</code> makes a new list and leaves this one alone.',
        hint: 'sorted() and .sort() look alike. Which one makes a new list?'
      },
      {
        type: 'pick', q: 'Back to lesson 33. What does this print?',
        pic: code(['runs_km = [5, 8, 6, 0, 10]', 'runs_km.sort()', 'print(runs_km[-2:])'], { title: 'runs.py' }),
        options: ['[8, 10]', '[0, 10]', '[5, 8]', '[10, 8]'],
        answer: 0,
        why: 'After <code>sort()</code> the list is <code>[0, 5, 6, 8, 10]</code>. The slice <code>[-2:]</code> takes the last two: <code>[8, 10]</code>, the two longest runs.',
        hint: 'Sort it in your head first. Then the last two items.'
      },
      {
        type: 'type', q: 'Ana wants bananas at the very <b>top</b> of <code>shopping</code>. Type the line that does it.',
        prompt: '>>>',
        answers: ['shopping.insert(0, "bananas")'],
        accept: '^shopping\\.insert\\( ?0 ?, ?"bananas" ?\\)$',
        why: '<code>insert</code> takes the index first, then the item. Index 0 is the top, and everything else moves down one place.',
        hint: 'append only adds at the end. Which method takes a position?'
      }
    ]
  });
})();
