/* Lesson 36: Tuples (module 3). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l36  Tuples
     ===================================================================== */

  // A recipe card. kind: 'paper' (a list: scribbled, can change) | 'lam' (a tuple: laminated)
  const card = (x, y, kind, vals, title, edited) => {
    const lam = kind === 'lam';
    const rows = ['g flour', 'ml milk', 'eggs'];
    return (lam
      ? box(x, y, 230, 196, P.white, 18) + `<rect x="${x + 8}" y="${y + 8}" width="214" height="180" rx="12" fill="none" stroke="${P.accent}" stroke-width="2.5"/>` +
        `<path d="M${x + 150} ${y + 14} l40 0 l-60 60 l-40 0 z" fill="${P.tint}" opacity="0.9"/>`
      : `<g transform="rotate(-3 ${x + 115} ${y + 98})">${box(x, y, 230, 196, P.warnT, 6)}` +
        `<path d="M${x} ${y + 40} h230 M${x} ${y + 80} h230 M${x} ${y + 120} h230 M${x} ${y + 160} h230" stroke="${P.sand}" stroke-width="2"/>`) +
      T(x + 115, y + 34, title, { s: 15 }) +
      rows.map((r, i) => {
        const yy = y + 76 + i * 40;
        const v = vals[i], hot = edited && edited[i] !== undefined;
        return (hot
          ? T(x + 60, yy, String(v), { s: 20, m: true, f: P.mute, a: 'end' }) + `<line x1="${x + 18}" y1="${yy - 7}" x2="${x + 64}" y2="${yy - 7}" stroke="${P.danger}" stroke-width="3"/>` +
            T(x + 66, yy - 18, String(edited[i]), { s: 15, m: true, f: P.danger, a: 'start' })
          : T(x + 60, yy, String(v), { s: 20, m: true, a: 'end' })) +
          T(x + 112, yy, rows[i], { s: 14, w: 700, f: P.ink2, a: 'start' });
      }).join('') + (lam ? '' : '</g>');
  };

  const ideaPic = svg(600, 300, "Two copies of grandma's pancake recipe. Left, a paper list in square brackets: someone crossed out 200 grams of flour and wrote 400. Right, the same recipe as a tuple in round brackets, laminated: 200, 300 and 2, and nothing can be written on it.",
    T(150, 24, 'a list: [200, 300, 2]', { s: 15, m: true, f: P.danger }) +
    T(450, 24, 'a tuple: (200, 300, 2)', { s: 15, m: true, f: P.accent }) +
    card(36, 44, 'paper', [200, 300, 2], 'scrap of paper', { 0: 400 }) +
    card(336, 44, 'lam', [200, 300, 2], "Grandma's pancakes") +
    T(150, 276, 'anyone can scribble on it', { s: 13, w: 700, f: P.danger }) +
    T(450, 276, 'read it, never change it', { s: 13, w: 700, f: P.ok }));

  const read = [
    "# Grandma's pancakes, one batch: flour g, milk ml, eggs",
    'pancake = (200, 300, 2)',
    '',
    'print(pancake)',
    'print(pancake[0])       # the flour, lesson 32',
    'print(pancake[-1])      # the eggs',
    'print(pancake[:2])      # flour and milk, lesson 33',
    'print(len(pancake))',
    'print(300 in pancake)',
    'print(type(pancake))'
  ];

  const painList = [
    "pancake = [200, 300, 2]   # grandma: flour g, milk ml, eggs",
    '',
    '# Saturday: a double batch for Ben',
    'pancake[0] = pancake[0] * 2',
    'pancake[1] = pancake[1] * 2',
    'pancake[2] = pancake[2] * 2',
    'print("Saturday:", pancake)',
    '',
    '# Sunday: a normal batch for Chloe',
    'print("Sunday:", pancake)'
  ];
  const painPic = `<div style="width:100%;min-width:0">${run(painList, { title: 'weekend.py' })}` +
    svg(600, 120, "Sunday's batch uses the changed list, 400, 600 and 4. Grandma's ratio is gone and Chloe gets a double batch she never asked for.",
      box(20, 18, 260, 84, P.white, 14) + T(150, 50, 'Saturday, for Ben', { s: 14 }) + T(150, 82, '[400, 600, 4]', { s: 17, m: true, f: P.ok }) +
      arrow(292, 60, 316, 60, P.ink, 2.5) +
      box(320, 18, 260, 84, P.dangerT, 14) + T(450, 50, 'Sunday, for Chloe', { s: 14, f: P.danger }) + T(450, 82, '[400, 600, 4]', { s: 17, m: true, f: P.danger })) + `</div>`;

  const tupleBad = painList.slice(); tupleBad[0] = 'pancake = (200, 300, 2)   # grandma: flour g, milk ml, eggs';
  const fixed = [
    'pancake = (200, 300, 2)       # grandma: flour g, milk ml, eggs',
    'flour, milk, eggs = pancake   # unpack: one jar per item',
    '',
    '# Saturday: a double batch for Ben, in NEW values',
    'print(f"Saturday: {flour * 2} g flour, {milk * 2} ml milk, {eggs * 2} eggs")',
    '',
    '# Sunday: a normal batch for Chloe',
    'print("Sunday:", pancake)'
  ];
  const fixPic = `<div style="width:100%;min-width:0">${code(tupleBad.slice(0, 5), { title: 'weekend.py, now a tuple', hi: [1], bad: [4] })}` +
    term(['$ python3 weekend.py', 'Traceback (most recent call last):', '  File "weekend.py", line 4, in <module>', '    pancake[0] = pancake[0] * 2', '    ~~~~~~~^^^', "TypeError: 'tuple' object does not support item assignment"], 'terminal') +
    run(fixed, { title: 'weekend.py' }) + `</div>`;

  const guests = [
    '# Each guest is a fixed record: (name, protein goal in g)',
    'ana = ("Ana", 90)',
    'ben = ("Ben", 140)',
    'chloe = ("Chloe", 70)',
    '',
    'guests = [ana, ben, chloe]   # a LIST of tuples: it can grow',
    'for guest in guests:',
    '    name, goal = guest       # unpack each record',
    '    print(f"{name}: {goal} g protein a day")',
    '',
    'print("Ben\'s goal:", ben[1], "g")   # read one item of one record'
  ];

  const trap = [
    '# Chloe wants one extra on her pancakes',
    'extras = ("berries")     # meant: a tuple with one item',
    'print(type(extras))',
    'print(len(extras), "extras")'
  ];
  const catchPic = `<div style="width:100%;min-width:0">${run(trap, { title: 'extras.py' })}` +
    svg(600, 150, 'Round brackets around one value do nothing: ("egg") is just the text egg. A comma makes the tuple: ("egg",) is a tuple with one item. So is the bare 200, 300, 2 without brackets.',
      box(20, 16, 268, 56, P.dangerT, 12) + T(40, 52, '("egg")', { s: 18, m: true, a: 'start', f: P.danger }) + T(270, 52, 'just text', { s: 14, a: 'end', f: P.danger }) +
      box(312, 16, 268, 56, P.okT, 12) + T(332, 52, '("egg",)', { s: 18, m: true, a: 'start', f: P.ok }) + T(562, 52, 'a tuple', { s: 14, a: 'end', f: P.ok }) +
      `<circle cx="403" cy="47" r="13" fill="none" stroke="${P.ok}" stroke-width="3"/>` +
      box(20, 88, 560, 50, P.white, 12) + T(40, 120, 'pancake = 200, 300, 2', { s: 17, m: true, a: 'start' }) + T(562, 120, 'also a tuple', { s: 14, a: 'end', f: P.ok })) +
    code(['pancake = (200, 300, 2)', 'pancake.append(1)'], { title: 'more.py', bad: [2] }) +
    term(['$ python3 more.py', 'Traceback (most recent call last):', '  File "more.py", line 2, in <module>', '    pancake.append(1)', '    ^^^^^^^^^^^^^^', "AttributeError: 'tuple' object has no attribute 'append'. Did you mean to use a 'list' object?"], 'terminal') + `</div>`;

  COURSE.add({
    id: 'l36', minutes: 12,
    summary: 'A <b>tuple</b> is a list you <b>cannot change</b>. Round brackets instead of square ones: <code>pancake = (200, 300, 2)</code>. Indexing, slicing, <code>len()</code>, <code>in</code> and <code>for</code> all work. Changing an item stops with <code>TypeError</code>, and there is no <code>.append()</code>. Unpack it into jars with <code>flour, milk, eggs = pancake</code>. The <b>comma</b> makes the tuple: <code>("egg")</code> is just text, <code>("egg",)</code> is a tuple. Use a tuple for things that <b>must not change</b>.',
    video: {
      src: 'videos/l36-tuples.mp4', poster: 'videos/l36-tuples.jpg', length: '1 min 8 s',
      script: [
        'This is grandma\'s pancake card. 200 grams of flour, 300 millilitres of milk, 2 eggs. The ratio never changes.',
        'Keep it on a scrap of paper, as a list in square brackets, and anyone can scribble on it. One line doubles the flour for Ben. And every batch after that is wrong.',
        'So laminate the card. Round brackets make a tuple. A tuple is a list you cannot change.',
        'You can still read it. Index 0 is the flour. A slice gives flour and milk.',
        'But try to write on it. Pancake, 0, equals 400. Python refuses. Type error. A tuple does not support item assignment. Grandma\'s ratio is safe.',
        'Need a double batch? Unpack the card into 3 jars: flour, milk and eggs. Then make new values. The card stays the same.',
        'One trap. Egg in round brackets is just text. Add a comma, and now it is a tuple.',
        'Use a tuple for things that must not change.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'A recipe that never changes.',
        text: [
          'Grandma\'s pancakes are perfect: <b>200 g</b> of flour, <b>300 ml</b> of milk, <b>2 eggs</b>. One batch makes about 8 pancakes. The ratio is the secret, and it never changes.',
          'You could keep it on a scrap of paper, as a list: <code>[200, 300, 2]</code>. But anyone can scribble on paper. Lesson 32 showed how easy it is: one line like <code>pancake[0] = 400</code> and the old number is gone.',
          'So you <b>laminate</b> the card. In Python that is a <b>tuple</b>: <code>(200, 300, 2)</code>. <b>Round brackets</b> instead of square ones. You can read every item, but you can <b>never change</b> one.'
        ],
        tip: 'Say it "tuple", to rhyme with "couple", or "toople". Both are fine.'
      },
      {
        label: 'The code', pic: run(read, { title: 'pancake.py' }),
        h: 'Read it like a list.',
        text: [
          'Press <b>Run</b>. Everything that only <b>reads</b> a list works on a tuple. <code>pancake[0]</code> is the flour and <code>pancake[-1]</code> the eggs, as in lesson 32. A slice, <code>pancake[:2]</code>, gives a new tuple, as in lesson 33. <code>len()</code>, <code>in</code> and a <code>for</code> loop (lesson 35) work too.',
          '<code>type(pancake)</code> says <code>&lt;class \'tuple\'&gt;</code>. Notice that Python prints a tuple with <b>round</b> brackets, so you can always tell it from a list.',
          'Now try to scribble on it. Add a line at the bottom: <code>pancake[0] = 400</code>. Run it. Python refuses with a <code>TypeError</code>. You saw that message in lesson 32, for text. A tuple is fixed in the same way.'
        ],
        tip: 'A tuple can hold any mix of values: <code>("Ben", 140)</code> holds a name and a number. Each item keeps its position, so position 0 always means the same thing.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'One busy Saturday changes every batch after it.',
        text: [
          'Grandma\'s ratio lives in a <b>list</b>. On Saturday Ben wants a double batch, so you double each item in place. Run it. Saturday looks right: <code>[400, 600, 4]</code>.',
          'On Sunday you make a normal batch for Chloe from the same <code>pancake</code>. It still says <code>[400, 600, 4]</code>. Saturday\'s change <b>overwrote grandma\'s card</b>. Nothing crashed and nothing warned you. Every batch from now on is double, and nobody knows why.',
          'In a real program the change and the batch that goes wrong can be hundreds of lines apart. That is a hard bug to find.'
        ],
        warn: 'A list is meant to change. That is great for a shopping list. It is a trap for values that must stay the same: a ratio, a date, a guest\'s fixed details.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Laminate it, then work on new values.',
        text: [
          'Change one thing: square brackets to <b>round</b> ones. Now line 4 stops with <code>TypeError: \'tuple\' object does not support item assignment</code>. Python <b>refuses</b> to scribble on grandma\'s card. The mistake shows up at once, on the exact line, instead of on Sunday.',
          'So how do you make a double batch? Leave the card alone and make <b>new values</b>. <code>flour, milk, eggs = pancake</code> is called <b>unpacking</b>: three names on the left, three items on the right, and each name gets the item in the same position. Three labelled jars in one line.',
          'Then multiply the jars, not the card. Press <b>Run</b>: Saturday is double, and Sunday is grandma\'s ratio again. Change the 2s to 3 for a triple batch and run it.'
        ],
        tip: 'The number of names must match the number of items. <code>flour, milk = pancake</code> stops with <code>ValueError: too many values to unpack (expected 2, got 3)</code>. Unpacking can do much more. That is lesson 78, Unpacking.'
      },
      {
        label: 'Try it', pic: run(guests, { title: 'guests.py' }),
        h: 'A tuple is a fixed record.',
        text: [
          'A tuple is perfect for a small <b>record</b>: a few values that belong together, in a fixed order. Each guest here is <code>(name, protein goal)</code>. Position 0 is always the name and position 1 always the goal.',
          'The <b>list</b> of guests can still grow. Each guest inside it is a tuple. Press <b>Run</b>. The loop takes one record at a time, and unpacking splits it into <code>name</code> and <code>goal</code>.',
          'Your turn: add yourself as a fourth guest, with your own goal, and add it to the list. Then add the line <code>ben[1] = 150</code> and read what Python says.'
        ],
        tip: 'Later you will write your own functions. A function can hand back <b>two things at once</b> by handing back a tuple, for example a name and a goal. That is lesson 45, Parameters and return.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'The comma makes the tuple.',
        text: [
          'Chloe wants one extra: berries. You write <code>extras = ("berries")</code>. Press <b>Run</b>. It says <code>&lt;class \'str\'&gt;</code> and <b>7 extras</b>. Round brackets around one value are just brackets, like in maths: <code>(2 + 3) * 4</code>. So <code>extras</code> is the text <code>"berries"</code>, and <code>len()</code> counts its 7 letters.',
          'The <b>comma</b> is what makes a tuple. Write <code>("berries",)</code>, with a comma before the closing bracket, and run it again: a tuple, 1 extra. Python even makes a tuple without any brackets: <code>pancake = 200, 300, 2</code>.',
          'And a tuple has none of the list methods of lesson 34. No <code>.append()</code>, <code>.remove()</code>, <code>.sort()</code> or <code>.pop()</code>. It only has <code>.count()</code> and <code>.index()</code>, because they only read. When values need to change, use a list. When they must not, use a tuple.'
        ],
        warn: 'Python 3.15 adds a helpful note to the <code>.append()</code> error: <code>Did you mean to use a \'list\' object?</code>. The Run boxes on this page use Python 3.14, which shows the error without that note.'
      }
    ],
    exercises: [
      {
        file: 'l36_grandmas_ratio.py', title: "Grandma's ratio",
        task: 'Ana, Ben and Chloe each want a batch of grandma\'s pancakes. The starter keeps the recipe in a <b>list</b> and scribbles all over it. Make the recipe a <b>tuple</b>, <b>unpack</b> it, and print the shopping amounts for 3 batches, while the card stays exactly as it was.',
        steps: [
          'Press <b>Open in VS Code</b>. The 3 exact lines to print are in the comment at the top of the file.',
          'Run it first and read the hint. Then fix the lines between <code>START</code> and <code>END</code>: round brackets, one unpacking line, and new values for the amounts. Save the file.',
          'Run it again. The check also runs your lines with another recipe and another number of batches. It says <code>PASS</code> or gives you one hint.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'Which line makes a <b>tuple</b>?',
        options: ['pancake = (200, 300, 2)', 'pancake = [200, 300, 2]', 'pancake = "200, 300, 2"', 'pancake = (200 300 2)'],
        answer: 0,
        why: 'Round brackets with commas between the items. Square brackets make a list, quotes make text, and without commas Python stops with a <code>SyntaxError</code>.',
        hint: 'Round brackets, and something between the items.'
      },
      {
        type: 'pick', q: 'What happens when you run this?',
        pic: code(['pancake = (200, 300, 2)', 'pancake[1] = 250', 'print(pancake)'], { title: 'less_milk.py' }),
        options: ["TypeError: 'tuple' object does not support item assignment", 'It prints (200, 250, 2)', 'It prints (200, 300, 2)', 'IndexError: tuple index out of range'],
        answer: 0,
        why: 'A tuple can never change. Line 2 stops the program, so line 3 never runs. Position 1 exists, so it is not an <code>IndexError</code>.',
        hint: 'Is the card paper or laminated?'
      },
      {
        type: 'bucket', q: 'Back to lesson 34. <code>pancake = (200, 300, 2)</code> is a tuple. Which of these work on it?',
        buckets: ['Works', 'Python refuses'],
        items: [
          ['pancake[0]', 0],
          ['pancake[:2]', 0],
          ['len(pancake)', 0],
          ['pancake.count(2)', 0],
          ['pancake.append(1)', 1],
          ['pancake.sort()', 1],
          ['pancake.remove(2)', 1],
          ['pancake[0] = 400', 1]
        ],
        why: 'Anything that only <b>reads</b> works: index, slice, <code>len()</code>, <code>.count()</code>. Every list method that changes the list is missing on a tuple, and so is putting a new value at a position.',
        hint: 'Ask of each one: does it only read the card, or would it write on it?'
      },
      {
        type: 'fix', q: 'Chloe wants <b>one</b> extra, and the extras must not change. This prints <code>Extras for Chloe: 7</code>. Fix line 1 so it prints <code>Extras for Chloe: 1</code> and <code>extras</code> is a tuple.',
        code: ['extras = ("berries")', 'print("Extras for Chloe:", len(extras))'],
        title: 'extras.py',
        check: [
          'got = out.strip()',
          'if type(extras) is tuple and extras == ("berries",) and got == "Extras for Chloe: 1":',
          '    ok = True',
          'elif type(extras) is list:',
          '    msg = "That is a list. It prints 1, but a list can change. Use round brackets and a comma."',
          'elif type(extras) is str:',
          '    msg = "extras is still text, so len() counts its letters. A tuple with one item needs a comma before the closing bracket."',
          'elif type(extras) is tuple and extras != ("berries",):',
          '    msg = "A tuple, good. It should hold exactly one item: the text berries."',
          'else:',
          '    msg = "It printed " + got + ". Keep line 2 as it was."'
        ].join('\n'),
        why: '<code>("berries",)</code>. The comma makes the tuple. Without it, the brackets are just brackets around text.',
        hint: 'One character is missing, just before the closing bracket.'
      },
      {
        type: 'fix', q: 'Ben wants a <b>triple</b> batch, but Python refuses. Fix it with unpacking and new values, so it prints <code>Triple: 600 g flour</code> and then <code>Grandma: (200, 300, 2)</code>. Keep <code>pancake</code> a tuple.',
        code: ['pancake = (200, 300, 2)', 'pancake[0] = pancake[0] * 3', 'print(f"Triple: {pancake[0]} g flour")', 'print(f"Grandma: {pancake}")'],
        title: 'triple.py',
        check: [
          'lines = out.splitlines()',
          'if lines == ["Triple: 600 g flour", "Grandma: (200, 300, 2)"] and pancake == (200, 300, 2):',
          '    ok = True',
          'elif type(pancake) is not tuple:',
          '    msg = "Keep pancake a tuple, with round brackets. Make new values instead of changing it."',
          'elif len(lines) != 2:',
          '    msg = "Print exactly 2 lines: the triple flour, then grandma\'s card."',
          'elif lines[0] != "Triple: 600 g flour":',
          '    msg = "The first line is " + lines[0] + ". Unpack with flour, milk, eggs = pancake and print flour * 3."',
          'else:',
          '    msg = "The second line should show the card unchanged: Grandma: (200, 300, 2)."'
        ].join('\n'),
        why: '<code>flour, milk, eggs = pancake</code>, then <code>print(f"Triple: {flour * 3} g flour")</code>. New values, and the card never changes. (<code>{pancake[0] * 3}</code> works too: it reads the card without writing on it.)',
        hint: 'Delete line 2. Unpack the card into three jars and multiply the jar inside the f-string.'
      },
      {
        type: 'type', q: 'Ben\'s record is <code>guest = ("Ben", 140)</code>. Type the one line that <b>unpacks</b> it into two jars called <code>name</code> and <code>goal</code>.',
        prompt: '>>>',
        answers: ['name, goal = guest'],
        accept: '^name ?, ?goal ?= ?guest$',
        why: 'Two names on the left, separated by a comma, and the tuple on the right. <code>name</code> gets <code>"Ben"</code> and <code>goal</code> gets <code>140</code>, by position.',
        hint: 'It looks like flour, milk, eggs = pancake, with two names instead of three.'
      },
      {
        type: 'pick', q: 'What happens?',
        pic: code(['pancake = (200, 300, 2)', 'flour, milk = pancake'], { title: 'unpack.py' }),
        options: ['ValueError: too many values to unpack (expected 2, got 3)', 'flour is 200 and milk is 300', 'flour is 200 and milk is (300, 2)', 'The eggs are dropped quietly'],
        answer: 0,
        why: 'Unpacking needs one name for every item. Three items and two names do not match, so Python stops. Lesson 78, Unpacking, shows a way to collect "the rest".',
        hint: 'Count the names on the left and the items in the tuple.'
      },
      {
        type: 'bucket', q: 'List or tuple? Sort each thing by whether it should be able to <b>change</b>.',
        buckets: ['List: it changes', 'Tuple: it must not'],
        items: [
          ['the shopping list for the week', 0],
          ["Ana's runs, one added each day", 0],
          ['orders arriving at the kitchen', 0],
          ["grandma's pancake ratio", 1],
          ['the date of the race: (2027, 4, 11)', 1],
          ['oven settings for a recipe: (180, 25)', 1]
        ],
        why: 'Things you add to, remove from or sort belong in a list. A fixed group of values, where each position means something, belongs in a tuple. Lesson 42, Choosing the right one, comes back to this.',
        hint: 'Would you ever write on it, or only read it?'
      }
    ]
  });
})();
