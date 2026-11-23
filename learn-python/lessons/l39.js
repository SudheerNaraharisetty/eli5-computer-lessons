/* Lesson 39: Sets (module 3). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l39  Sets
     ===================================================================== */

  // A small shopping list card for one friend.
  const listCard = (x, y, name, col, items) =>
    box(x, y, 172, 132, P.white, 12) +
    `<circle cx="${x + 24}" cy="${y + 24}" r="13" fill="${col}" stroke="${P.ink}" stroke-width="2"/>` +
    T(x + 24, y + 29, name[0], { s: 12, f: P.white }) + T(x + 46, y + 29, name, { s: 14, a: 'start' }) +
    items.map((it, i) => T(x + 22, y + 60 + i * 20, it, { s: 13, w: 700, m: true, a: 'start', f: it === 'eggs' ? P.danger : P.ink2 })).join('');

  // An item chip, e.g. in the bowl.
  const chipS = (x, y, s, fill) => {
    const w = s.length * 8.4 + 22;
    return `<rect x="${x - w / 2}" y="${y - 14}" width="${w}" height="28" rx="14" fill="${fill || P.okT}" stroke="${P.ink}" stroke-width="2"/>` +
      T(x, y + 5, s, { s: 13, m: true, w: 700 });
  };

  const ideaPic = svg(600, 330, "Ana, Ben and Chloe each send a shopping list of 4 things, and eggs is on all three. Joined into one list, that is 12 items with eggs 3 times, rice 3 times and bananas twice. Poured into a set, a bowl, it keeps one of each: 7 things, in no particular order.",
    listCard(20, 14, 'Ana', P.accent, ['eggs', 'rice', 'bananas', 'oats']) +
    listCard(214, 14, 'Ben', P.ok, ['eggs', 'rice', 'tofu', 'bread']) +
    listCard(408, 14, 'Chloe', P.danger, ['eggs', 'rice', 'berries', 'bananas']) +
    box(20, 176, 230, 136, P.dangerT, 14) +
    T(135, 204, 'ana + ben + chloe', { s: 14, m: true }) +
    T(135, 232, 'a list of 12 items', { s: 13, w: 700, f: P.ink2 }) +
    T(135, 258, 'eggs 3 times', { s: 14, f: P.danger }) +
    T(135, 280, 'rice 3 times', { s: 14, f: P.danger }) +
    T(135, 302, 'bananas 2 times', { s: 14, f: P.danger }) +
    arrow(262, 244, 316, 244, P.ink, 3) + T(289, 232, 'set()', { s: 12, m: true, f: P.accent }) +
    `<path d="M326 206 h256 q0 106 -128 106 q-128 0 -128 -106 z" fill="${P.ink}" transform="translate(4 5)"/>` +
    `<path d="M326 206 h256 q0 106 -128 106 q-128 0 -128 -106 z" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
    chipS(372, 228, 'rice') + chipS(452, 226, 'bread') + chipS(534, 228, 'eggs') +
    chipS(392, 262, 'oats') + chipS(486, 260, 'bananas') +
    chipS(420, 293, 'tofu') + chipS(500, 293, 'berries') +
    T(454, 190, 'a set: 7 things, one of each', { s: 13.5, f: P.ok }));

  const shop = [
    'ana = ["eggs", "rice", "bananas", "oats"]',
    'ben = ["eggs", "rice", "tofu", "bread"]',
    'chloe = ["eggs", "rice", "berries", "bananas"]',
    '',
    'merged = ana + ben + chloe       # one long list',
    'print(len(merged), "items, eggs", merged.count("eggs"), "times")',
    '',
    'to_buy = set(merged)             # one of each',
    'print(len(to_buy), "things to buy")',
    'print(sorted(to_buy))            # A to Z, as a list',
    'print("tofu" in to_buy)'
  ];
  const pantry = [
    'pantry = {"eggs", "rice", "oats"}   # curly braces make a set',
    'pantry.add("tofu")                  # new: it goes in',
    'pantry.add("eggs")                  # already in: nothing changes',
    'print(len(pantry), "things")',
    '',
    'pantry.discard("bread")             # not there? no problem',
    'pantry.remove("oats")               # there: it goes',
    'print(sorted(pantry))'
  ];
  const codePic = `<div style="width:100%;min-width:0">${run(shop, { title: 'shopping.py' })}${run(pantry, { title: 'pantry.py' })}</div>`;

  const first = [
    'wanted = {"eggs", "rice", "tofu"}',
    'print(wanted)          # in the order you typed?',
    'print(wanted[0])       # the first thing?'
  ];
  const painPic = `<div style="width:100%;min-width:0">${run(first, { title: 'first.py' })}` +
    code(['basket = {}            # an empty set?', 'basket.add("eggs")'], { title: 'basket.py', bad: [1] }) +
    term(['$ python3 basket.py', 'Traceback (most recent call last):', '  File "basket.py", line 2, in <module>', '    basket.add("eggs")', '    ^^^^^^^^^^', "AttributeError: 'dict' object has no attribute 'add'"], 'terminal') + `</div>`;

  const fixed = [
    'wanted = {"eggs", "rice", "tofu"}',
    'in_order = sorted(wanted)     # a NEW list, A to Z',
    'print(in_order)',
    'print(in_order[0])            # lists have indexes',
    '',
    'basket = set()                # an empty SET',
    'basket.add("eggs")',
    'basket.add("eggs")',
    'print(len(basket), sorted(basket))',
    'print(type({}), type(set()))'
  ];

  // Venn diagram: Ana, Ben and Chloe. Every item sits in the right region (checked by distance).
  const vennPic = svg(600, 330, "Three overlapping circles: Ana, Ben and Chloe. In the middle, where all three overlap: eggs and rice. Where only Ana and Chloe overlap: bananas. Only Ana: oats. Only Ben: tofu and bread. Only Chloe: berries.",
    `<circle cx="230" cy="130" r="100" fill="${P.accent}" fill-opacity="0.14" stroke="${P.accent}" stroke-width="3"/>` +
    `<circle cx="370" cy="130" r="100" fill="${P.ok}" fill-opacity="0.14" stroke="${P.ok}" stroke-width="3"/>` +
    `<circle cx="300" cy="220" r="100" fill="${P.danger}" fill-opacity="0.12" stroke="${P.danger}" stroke-width="3"/>` +
    T(118, 46, 'Ana', { s: 17, f: P.accent }) + T(482, 46, 'Ben', { s: 17, f: P.ok }) + T(168, 304, 'Chloe', { s: 17, f: P.danger }) +
    T(300, 154, 'eggs', { s: 14, m: true }) + T(300, 176, 'rice', { s: 14, m: true }) +
    T(242, 210, 'bananas', { s: 13, m: true }) + T(185, 114, 'oats', { s: 14, m: true }) +
    T(418, 108, 'tofu', { s: 14, m: true }) + T(418, 132, 'bread', { s: 14, m: true }) + T(300, 280, 'berries', { s: 13, m: true }) +
    `<ellipse cx="300" cy="162" rx="40" ry="30" fill="none" stroke="${P.warn}" stroke-width="3" stroke-dasharray="7 5"/>` +
    T(586, 196, '&  in all of them', { s: 13, a: 'end', f: P.ink }) +
    T(586, 226, '|  in any of them', { s: 13, a: 'end', f: P.ink }) +
    T(586, 256, '-  left, not right', { s: 13, a: 'end', f: P.ink }) +
    T(586, 300, 'ben - chloe:', { s: 13, a: 'end', m: true, f: P.ok }) + T(586, 320, 'tofu, bread', { s: 13, a: 'end', f: P.ok }));

  const maths = [
    'ana = {"eggs", "rice", "bananas", "oats"}',
    'ben = {"eggs", "rice", "tofu", "bread"}',
    'chloe = {"eggs", "rice", "berries", "bananas"}',
    '',
    'print("All three:", sorted(ana & ben & chloe))',
    'print("Anyone:", sorted(ana | ben | chloe))',
    'print("Ben, not Chloe:", sorted(ben - chloe))',
    'print("Ana and Chloe:", sorted(ana & chloe))'
  ];
  const tryPic = `<div style="width:100%;min-width:0">${vennPic}${run(maths, { title: 'kitchen_maths.py' })}</div>`;

  const counts = [
    'orders = ["eggs", "rice", "eggs", "tofu", "eggs"]',
    'print(len(orders), "orders")',
    'print(len(set(orders)), "different things")',
    'print(orders.count("eggs"), "friends want eggs")   # only the list knows'
  ];
  const catchPic = `<div style="width:100%;min-width:0">` +
    svg(600, 150, 'Looking for tofu. In a list, Python checks the items one by one, like reading down the shopping list. In a set, Python works out the spot from the word itself and looks only there, like going straight to the labelled jar.',
      box(20, 14, 270, 122, P.white, 14) + T(155, 40, '"tofu" in a list', { s: 14, m: true }) +
      ['eggs', 'rice', 'oats', 'tofu'].map((s, i) => chipS(60 + i * 62, 74, s, i === 3 ? P.okT : P.sand) +
        (i < 3 ? arrow(60 + i * 62 + 22, 98, 60 + i * 62 + 40, 98, P.mute, 2) : '')).join('') +
      T(155, 124, 'checks one by one', { s: 13, w: 700, f: P.ink2 }) +
      box(310, 14, 270, 122, P.white, 14) + T(445, 40, '"tofu" in a set', { s: 14, m: true }) +
      chipS(445, 82, 'tofu') + `<circle cx="445" cy="82" r="34" fill="none" stroke="${P.ok}" stroke-width="3"/>` +
      T(445, 124, 'goes straight to its spot', { s: 13, w: 700, f: P.ok })) +
    run(counts, { title: 'count.py' }) + `</div>`;

  COURSE.add({
    id: 'l39', minutes: 12,
    summary: 'A <b>set</b> keeps <b>one of each</b>. <code>set(merged)</code> drops every duplicate from a list, and <code>{"eggs", "rice"}</code> writes a set in curly braces. <code>.add()</code> puts a thing in (twice changes nothing), <code>.discard()</code> takes it out quietly, <code>.remove()</code> stops with <code>KeyError</code> if it is not there, and <code>in</code> answers <b>fast</b>. Set maths: <code>&amp;</code> is in all, <code>|</code> is in any, <code>-</code> is in the left and not the right. A set has <b>no order and no index</b>, so use <code>sorted()</code> when you need one. And <code>{}</code> is an empty <b>dict</b>: an empty set is <code>set()</code>.',
    video: {
      src: 'videos/l39-sets.mp4', poster: 'videos/l39-sets.jpg', length: '1 min 7 s',
      script: [
        'Ana, Ben and Chloe each send you a list for the weekend. You join them into one shopping list. Eggs, 3 times. Rice, 3 times. This list is wrong.',
        'A set keeps one of each. Pass the list to set, and every duplicate bounces off. 7 things to buy.',
        'Add milk, and it goes in. Add eggs again, and nothing changes. Is tofu in the set? True. A set answers that fast.',
        'Now the kitchen maths. Write each list as a set, in curly braces. And gives what all 3 want: eggs and rice. The bar means or: anything anyone wants. Minus gives what Ben wants and Chloe does not: bread and tofu.',
        'Two catches. A set has no order, so it has no index. Wanted, 0, is a type error. Need an order? Use sorted. And empty curly braces make a dictionary. For an empty set, write set, with brackets.',
        'A set keeps one of each, and answers in or not in fast.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'One of each, please.',
        text: [
          'Ana, Ben and Chloe each send you what they want for the weekend. You join the three lists into one with <code>+</code>, as in lesson 31. Now <b>eggs</b> is on the shopping list <b>3 times</b>, rice 3 times and bananas twice. You would buy far too much.',
          'A <b>set</b> is a bowl that keeps <b>one of each</b>. Put eggs in three times, and there is still one eggs in the bowl. Nothing else to do: a set simply <b>cannot hold duplicates</b>.',
          'A set also has <b>no order</b>. Things in a bowl are not first or last. They are just in, or not in. Hold on to that: it is the source of both the power and the pain.'
        ],
        tip: 'Sets come from maths. That is why the set tools further down are called "set maths". You do not need any maths to use them.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'set() drops the duplicates.',
        text: [
          'Press <b>Run</b> on <code>shopping.py</code>. The joined list has <b>12</b> items, with eggs 3 times. <code>set(merged)</code> makes a set from it, and <code>len()</code> counts <b>7</b> things to buy. <code>sorted()</code> from lesson 34 turns the set back into a list, A to Z, so it is easy to read. <code>in</code> asks "is tofu in it?" and answers <code>True</code>.',
          'You can also write a set yourself with <b>curly braces</b>: <code>{"eggs", "rice", "oats"}</code>. That is <code>pantry.py</code>. <code>.add()</code> puts one thing in. Add something that is already in, and <b>nothing changes</b>: no error, no second copy.',
          'To take something out, a set has two tools. <code>.discard()</code> takes it out if it is there and <b>quietly does nothing</b> if it is not. <code>.remove()</code> insists: if it is not there, Python stops. Change <code>discard("bread")</code> to <code>remove("bread")</code> and run it: <code>KeyError: \'bread\'</code>, the same error a dictionary gives for a missing key.'
        ],
        tip: 'A set has no <code>.append()</code>, because "the end" means nothing in a bowl. Use <code>.add()</code>.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'No order, no index, and {} is not a set.',
        text: [
          '<b>Pain 1: there is no first thing.</b> Press <b>Run</b> on <code>first.py</code>. Line 2 prints the set, but maybe not in the order you typed. Then line 3 stops: <code>TypeError: \'set\' object is not subscriptable</code>. "Subscriptable" means "you can use <code>[ ]</code> on it". A bowl has no position 0, so there is nothing to look up.',
          'Why the strange order? Python keeps each item in a spot it works out from the item itself, using a number called its <b>hash</b>. For text, that number is <b>different every time Python starts</b>, on purpose, to make attacks on programs harder. So the same set of words can print in a <b>different order on the next run</b>. Never write a program that counts on it.',
          '<b>Pain 2: empty braces.</b> You want an empty bowl, so you write <code>basket = {}</code>. But <code>{}</code> was taken first: it is an <b>empty dictionary</b>, the spice rack of lesson 37. A dictionary has no <code>.add()</code>, so line 2 stops with <code>AttributeError: \'dict\' object has no attribute \'add\'</code>.'
        ],
        warn: 'Every page in this course prints sets with <code>sorted()</code>, so the answers never depend on the order. Do the same in your own code whenever you show a set to a person or compare printed output.'
      },
      {
        label: 'The fix', pic: run(fixed, { title: 'fixed.py' }),
        h: 'sorted() for order, set() for empty.',
        text: [
          '<b>Need an order? Use <code>sorted()</code>.</b> It works on a set just as it did on a list in lesson 34, and it always hands back a <b>new list</b>, A to Z. A list has indexes, so <code>in_order[0]</code> works: <code>eggs</code>. Same set, same answer, every run.',
          '<b>Need an empty set? Write <code>set()</code>.</b> The name of the type with empty brackets. Then <code>.add()</code> works, and adding eggs twice still leaves <b>1</b> thing in the basket.',
          'Press <b>Run</b>. The last line shows both: <code>{}</code> is a <code>dict</code>, and <code>set()</code> is a <code>set</code>. Then change <code>sorted(wanted)</code> to <code>sorted(wanted, reverse=True)</code> and run it again.'
        ],
        tip: 'Remember lesson 34: <code>.sort()</code> belongs to lists only. A set has no <code>.sort()</code>, because it has no order to change. <code>sorted()</code> is the one that works on both.'
      },
      {
        label: 'Try it', pic: tryPic,
        h: 'Kitchen maths: & | -',
        text: [
          'Now each friend\'s list is a set. Three signs answer three kitchen questions. Press <b>Run</b>.',
          '<code>ana &amp; ben &amp; chloe</code>: what is in <b>all</b> of them? Eggs and rice, the things to buy most of. <code>ana | ben | chloe</code>: what is in <b>any</b> of them? The whole shopping list, 7 things. <code>ben - chloe</code>: what is in Ben\'s set and <b>not</b> in Chloe\'s? Bread and tofu. Bread has gluten, so it never goes on Chloe\'s plate.',
          'Your turn. <b>Before</b> you press Run, add <code>"tofu"</code> to Chloe\'s set and guess what the last three lines will print. Then run it and check your guess.'
        ],
        tip: 'Read <code>&amp;</code> as "and", <code>|</code> as "or" and <code>-</code> as "minus". Each one makes a <b>new set</b> and leaves the old ones alone. Sets also have the same tools as methods: <code>ana.intersection(ben)</code>, <code>ana.union(ben)</code> and <code>ben.difference(chloe)</code>.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Fast to ask, but it forgets order and counts.',
        text: [
          '<b>Why is <code>in</code> fast?</b> To find tofu in a list, Python reads the items <b>one by one</b>, like the loop in lesson 35. A list of 10,000 things means up to 10,000 checks. A set works out the spot from the word itself and looks <b>only there</b>, like going straight to the labelled jar. Big or small, it is one look. When you ask "is it in?" a lot, use a set.',
          '<b>But a set forgets.</b> It forgets the order, and it forgets <b>how many</b>. Press <b>Run</b>: 5 orders, 3 different things. Only the list still knows that 3 friends want eggs, so you need 3 times the eggs. When order or counts matter, keep the list.',
          'A set can only hold things that <b>never change</b>: numbers, text, tuples (lesson 36). A list can change, so <code>{["eggs"]}</code> stops with <code>TypeError: cannot use \'list\' as a set element (unhashable type: \'list\')</code>.'
        ],
        warn: 'A set itself can change: <code>.add()</code> and <code>.remove()</code>. For a set that must never change, Python has <code>frozenset</code>. That is lesson 40, Frozen collections. Lesson 42, Choosing the right one, puts list, tuple, dict and set side by side.'
      }
    ],
    exercises: [
      {
        file: 'l39_no_duplicates.py', title: 'No duplicate ingredients',
        task: 'Ana, Ben and Chloe each sent a list for the weekend. Turn them into sets and print <b>3 exact lines</b>: the shopping list with <b>one of each</b>, what <b>all three</b> want, and what <b>only Ben</b> wants. Print every set with <code>sorted()</code>.',
        steps: [
          'Press <b>Open in VS Code</b>. The 3 exact lines to print are in the comment at the top of the file.',
          'Run it first and read the hint. Then change the lines between <code>START</code> and <code>END</code>: <code>set()</code>, then <code>&amp;</code> and <code>-</code>, and <code>sorted()</code> around each answer. Save the file.',
          'Run it again. The check also runs your lines with three other lists, so typed-in answers will not pass. It says <code>PASS</code> or gives you one hint.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['orders = ["eggs", "rice", "eggs", "eggs"]', 'print(len(set(orders)))'], { title: 'orders.py' }),
        options: ['2', '4', '3', '1'],
        answer: 0,
        why: 'The set keeps one of each: eggs and rice. So <code>len()</code> counts 2.',
        hint: 'How many <b>different</b> things are there?'
      },
      {
        type: 'pick', q: 'Back to lesson 34. <code>ben = {"tofu", "eggs", "bread"}</code> is a set. Which line prints Ben\'s things A to Z, the same way every time?',
        options: ['print(sorted(ben))', 'ben.sort() and then print(ben)', 'print(ben)', 'print(ben[0:])'],
        answer: 0,
        why: '<code>sorted()</code> works on any collection and hands back a new list, A to Z. A set has no <code>.sort()</code> (<code>AttributeError</code>), <code>print(ben)</code> has no fixed order, and a slice needs an index, which a set does not have.',
        hint: 'One is a method that only lists have. One makes a new list.'
      },
      {
        type: 'match', q: 'Match each line to what it gives. <code>ana</code>, <code>ben</code> and <code>chloe</code> are sets.',
        pairs: [
          ['ana & ben', 'things in both sets'],
          ['ana | ben', 'things in either set, or both'],
          ['ben - chloe', "things in Ben's set but not Chloe's"],
          ['"tofu" in ben', 'True or False'],
          ['set()', 'a new, empty set']
        ],
        why: '<code>&amp;</code> is "in all", <code>|</code> is "in any", <code>-</code> is "in the left, not the right". <code>in</code> answers yes or no. <code>set()</code> is the empty bowl.',
        hint: 'Read &amp; as "and", | as "or", - as "minus".'
      },
      {
        type: 'fix', q: 'You want an empty basket that keeps one of each. This stops with an <code>AttributeError</code>. Fix line 1 so it prints <code>[\'eggs\', \'rice\']</code>.',
        code: ['basket = {}', 'for item in ["eggs", "rice", "eggs"]:', '    basket.add(item)', 'print(sorted(basket))'],
        title: 'basket.py',
        check: [
          'got = out.strip()',
          'if type(basket) is set and got == "[\'eggs\', \'rice\']":',
          '    ok = True',
          'elif type(basket) is dict:',
          '    msg = "basket is still a dictionary. Empty curly braces make a dict. Write set() for an empty set."',
          'elif type(basket) is list:',
          '    msg = "That is a list, and a list has no .add(). Make an empty set with set()."',
          'else:',
          '    msg = "It printed " + got + ". Keep lines 2 to 4 as they were."'
        ].join('\n'),
        why: '<code>basket = set()</code>. Empty curly braces <code>{}</code> make an empty dictionary. The empty set is the type name with empty brackets.',
        hint: 'Empty curly braces were taken by something else. What is the name of the type you want?'
      },
      {
        type: 'fix', q: 'Kitchen Coach wants to print the first thing on the list, A to Z. This stops with a <code>TypeError</code>. Fix line 2 so it prints <code>First: eggs</code>.',
        code: ['wanted = {"tofu", "rice", "eggs"}', 'print("First:", wanted[0])'],
        title: 'first.py',
        check: [
          'got = out.strip()',
          'if got == "First: eggs" and type(wanted) is set:',
          '    ok = True',
          'elif type(wanted) is not set:',
          '    msg = "Keep wanted a set. Make a sorted list from it instead."',
          'else:',
          '    msg = "It printed " + got + ". sorted(wanted) is a list, A to Z. Take index 0 of that list."'
        ].join('\n'),
        why: '<code>print("First:", sorted(wanted)[0])</code>. <code>sorted()</code> makes a new list, A to Z, and a list has an index 0. The set itself has no first thing.',
        hint: 'A set has no index, but a list does. Which tool turns a set into a list in A to Z order?'
      },
      {
        type: 'pick', q: 'What happens when you run this?',
        pic: code(['pantry = {"eggs", "rice", "oats"}', 'pantry.remove("tofu")', 'print(len(pantry))'], { title: 'pantry.py' }),
        options: ["KeyError: 'tofu'", 'It prints 3', 'It prints 2', 'ValueError: list.remove(x): x not in list'],
        answer: 0,
        why: 'Tofu is not in the set, and <code>.remove()</code> insists, so Python stops on line 2. <code>pantry.discard("tofu")</code> would quietly do nothing, and then it would print 3. The <code>ValueError</code> is what a <b>list</b> gives (lesson 34).',
        hint: 'Is tofu in the pantry? What does .remove() do then?'
      },
      {
        type: 'bucket', q: 'Which is true of a <b>set</b>, and which only of a <b>list</b>?',
        buckets: ['A set', 'A list'],
        items: [
          ['keeps one of each', 0],
          ['answers in fast, even when big', 0],
          ['has & | and - for kitchen maths', 0],
          ['an empty one is set()', 0],
          ['keeps the order you added things', 1],
          ['can hold the same thing twice', 1],
          ['has an index: [0] is the first', 1],
          ['an empty one is []', 1]
        ],
        why: 'A set is a bowl: one of each, no order, fast to ask, with set maths. A list is a line: order, duplicates and indexes.',
        hint: 'Bowl or line? Things in a bowl are not first or last.'
      },
      {
        type: 'type', q: '<code>ana</code> and <code>ben</code> are sets. Type the expression that gives the things <b>both</b> of them want.',
        prompt: '>>>',
        answers: ['ana & ben'],
        accept: '^(ana ?& ?ben|ben ?& ?ana|ana\\.intersection\\(ben\\)|ben\\.intersection\\(ana\\))$',
        why: '<code>ana &amp; ben</code>: the things in both sets. <code>ben &amp; ana</code> gives the same set.',
        hint: 'The sign that reads as "and".'
      }
    ]
  });
})();
