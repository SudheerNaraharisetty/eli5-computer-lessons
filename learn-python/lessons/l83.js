/* Lesson 83: Generators (module 7). One file per lesson.
   Output checked with Python 3.15.2 (Homebrew, macOS) and Python 3.14 on 2026-11-23.
   The Run boxes were also checked in this page (Pyodide, Python 3.14). */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l83  Generators
     ===================================================================== */

  // The pancake station, used by several boxes.
  const STATION = [
    'def pancakes(n):',
    '    for i in range(1, n + 1):',
    '        print("  cooking pancake", i)',
    '        yield f"pancake {i}"'
  ];

  // A small pancake drawn at (x, y): a stack of k flat ellipses.
  const cake = (x, y, k, w) => {
    w = w || 40; let s = '';
    for (let j = 0; j < k; j++) s += `<ellipse cx="${x}" cy="${y - j * 9}" rx="${w / 2}" ry="7" fill="#F2C46B" stroke="${P.ink}" stroke-width="2"/>`;
    return s;
  };
  const guest = (x, y, letter, col) => `<circle cx="${x}" cy="${y}" r="15" fill="${col}" stroke="${P.ink}" stroke-width="2.5"/>` + T(x, y + 5, letter, { s: 13, f: P.white });

  /* ---- The idea: cook all now, or cook when asked ---- */
  const ideaSvg = svg(600, 250, 'Left, a list: the station cooks all 100 pancakes first. A tall stack, 100 cooked, only 3 eaten, 97 go cold. Right, a generator: the station cooks one pancake each time a guest asks. Ana, Ben and Chloe each ask once, so 3 are cooked and 3 are eaten.',
    box(12, 14, 278, 222, P.white, 14) +
    T(151, 40, 'return a list', { s: 14, m: true, f: P.danger }) +
    T(151, 60, 'cook all 100 first', { s: 12, w: 700, f: P.ink2 }) +
    cake(76, 210, 14, 64) +
    T(76, 82, '100', { s: 20, m: true }) +
    T(200, 118, 'cooked: 100', { s: 13, m: true }) +
    T(200, 146, 'eaten: 3', { s: 13, m: true, f: P.ok }) +
    `<rect x="148" y="168" width="104" height="30" rx="15" fill="${P.warnT}" stroke="${P.warn}" stroke-width="2"/>` + T(200, 188, '97 go cold', { s: 12.5, f: P.warn }) +
    box(310, 14, 278, 222, P.white, 14) +
    T(449, 40, 'yield', { s: 14, m: true, f: P.ok }) +
    T(449, 60, 'cook one when a guest asks', { s: 12, w: 700, f: P.ink2 }) +
    [['A', P.ok, 'Ana'], ['B', P.accent, 'Ben'], ['C', P.danger, 'Chloe']].map((g, i) =>
      guest(352, 100 + i * 44, g[0], g[1]) + T(376, 104 + i * 44, 'next()', { s: 12, m: true, a: 'start', f: P.ink2 }) +
      arrow(434, 100 + i * 44, 474, 100 + i * 44, P.ink2, 2) + cake(510, 104 + i * 44, 1, 44)).join('') +
    T(449, 226, 'cooked: 3   eaten: 3', { s: 13, m: true, f: P.ok }));
  const ideaBox = [...STATION, '',
    'station = pancakes(100)',
    'print(station)',
    'print("Ana asks...")',
    'print("Ana gets", next(station))',
    'print("Ben asks...")',
    'print("Ben gets", next(station))'
  ];
  const ideaPic = `<div style="width:100%;min-width:0">${ideaSvg}${run(ideaBox, { title: 'station.py' })}</div>`;

  /* ---- The code: run to the next yield, then pause ---- */
  const pauseSvg = svg(600, 214, 'Three calls, one under the other. pancakes(100) runs no line of the recipe and gives back a generator, a station waiting for orders. The first next runs from the top down to the yield, hands out pancake 1 and pauses on the yield line. The second next wakes up on that same line, goes round the loop once more, hands out pancake 2 and pauses again.',
    [['pancakes(100)', 'runs nothing yet', 'a generator', P.accent, null],
     ['next(station)', 'top → yield, then pause', '"pancake 1"', P.ok, 1],
     ['next(station)', 'wake up → yield, pause', '"pancake 2"', P.ok, 1]].map((r, i) => {
      const y = 14 + i * 68;
      return box(12, y, 160, 50, P.white, 12) + T(92, y + 31, r[0], { s: 13, m: true }) +
        arrow(180, y + 25, 222, y + 25, P.ink2, 2.5) +
        T(316, y + 31, r[1], { s: 12.5, w: 700, f: P.ink2 }) +
        arrow(410, y + 25, 446, y + 25, P.ink2, 2.5) +
        box(454, y, 134, 50, r[4] ? P.okT : P.tint, 12) + T(521, y + 31, r[2], { s: 12.5, m: true, f: r[3] });
    }).join(''));
  const anaPlan = [
    'def ana_plan():',
    '    print("  [planning Monday]")',
    '    yield "Mon: easy 5 km, oats and banana"',
    '    print("  [planning Tuesday]")',
    '    yield "Tue: rest day, rice bowl with tofu"',
    '    print("  [planning Wednesday]")',
    '    yield "Wed: 10 km, big pasta dinner"',
    '',
    'plan = ana_plan()',
    'print(next(plan))',
    'print("...Ana runs on Monday...")',
    'print(next(plan))',
    '',
    'print("The rest, with a for loop:")',
    'for day in plan:',
    '    print(day)'
  ];
  const codePic = `<div style="width:100%;min-width:0">${pauseSvg}${run(anaPlan, { title: 'ana_plan.py' })}</div>`;

  /* ---- The pain: a list of 10,000 for 3 guests ---- */
  const painBox = [
    'def all_pancakes(n):',
    '    plates = []',
    '    for i in range(1, n + 1):',
    '        plates.append(f"pancake {i}")',
    '    print("Cooked", len(plates), "pancakes")',
    '    return plates',
    '',
    'plates = all_pancakes(10_000)',
    'for guest, plate in zip(["Ana", "Ben", "Chloe"], plates):',
    '    print(guest, "eats", plate)',
    'print("Left on the counter:", len(plates) - 3)'
  ];

  /* ---- The fix: the same station, with yield ---- */
  const fixBox = [...STATION, '',
    'station = pancakes(10_000)',
    'for guest, plate in zip(["Ana", "Ben", "Chloe"], station):',
    '    print(guest, "eats", plate)'
  ];
  const sizeBox = [
    'import sys',
    '',
    'stack = [n for n in range(1_000_000)]     # all made now',
    'station = (n for n in range(1_000_000))   # none made yet',
    '',
    'print("list:     ", sys.getsizeof(stack), "bytes")',
    'print("generator:", sys.getsizeof(station), "bytes")',
    '',
    'huge = (n for n in range(1_000_000_000))  # a billion, none made',
    'print("billion:  ", sys.getsizeof(huge), "bytes")'
  ];
  const fixPic = `<div style="width:100%;min-width:0">${run(fixBox, { title: 'station.py' })}<div style="height:14px"></div>${run(sizeBox, { title: 'memory.py' })}</div>`;

  /* ---- Try it: an endless station, and sum with a generator expression ---- */
  const tryBox = [
    'from itertools import islice',
    '',
    'def order_tickets():',
    '    number = 1',
    '    while True:            # never ends, and that is fine',
    '        yield number',
    '        number += 1',
    '',
    'tickets = order_tickets()',
    'print(list(islice(tickets, 3)))   # the first 3 tickets',
    'print(next(tickets))              # and the next one',
    '',
    'stacks = {"Ana": 3, "Ben": 4, "Chloe": 2}',
    'total = sum(count * 90 for count in stacks.values())',
    'print("Total:", total, "kcal")'
  ];

  /* ---- The catch ---- */
  const catchBox = [
    'def pancakes(n, batter):',
    '    for i in range(1, n + 1):',
    '        if batter < 60:',
    '            return    # out of batter: stop',
    '        batter -= 60',
    '        yield f"pancake {i}"',
    '',
    'station = pancakes(10, batter=200)',
    'print("First time: ", list(station))',
    'print("Second time:", list(station))',
    '',
    'print("Fresh station:", list(pancakes(10, batter=200)))'
  ];
  const lenTerm = term([
    '$ python3 station.py',
    '<generator object pancakes at 0x105e9c580>',
    'Traceback (most recent call last):',
    '  File "/Users/ana/kitchen/station.py", line 7, in <module>',
    '    print(len(station))',
    '          ~~~^^^^^^^^^',
    "TypeError: object of type 'generator' has no len()"
  ], 'len() of a generator, Python 3.15');
  const catchPic = `<div style="width:100%;min-width:0">${run(catchBox, { title: 'batter.py' })}${lenTerm}</div>`;

  COURSE.add({
    id: 'l83', minutes: 14,
    summary: 'A function with <code>yield</code> in it is a <b>generator function</b>. Calling it <b>runs nothing yet</b>: <code>station = pancakes(100)</code> only hands back a <b>generator</b>, a station waiting for orders (<code>&lt;generator object pancakes at 0x...&gt;</code>). Each <code>next(station)</code> runs the recipe down to the next <code>yield</code>, hands out that one value, and <b>pauses right there</b>. The next call wakes up on the same line. A <code>for</code> loop calls <code>next()</code> for you until the generator runs out. Why bother? A list cooks everything first, and holds it all. A generator makes <b>one value at a time, only when asked</b>, so 3 guests out of 10,000 orders means 3 pancakes cooked, and even an endless <code>while True</code> station is safe (take a few with <code>itertools.islice</code> or a <code>break</code>). Round brackets make a <b>generator expression</b>, the lazy twin of a comprehension: <code>sum(count * 90 for count in stacks.values())</code>. The catch: a generator is an iterator, so it works <b>once</b>, and a second <code>list(station)</code> gives <code>[]</code>. <code>return</code> inside it just stops it. And it has no <code>len()</code> and no <code>[0]</code>: <code>TypeError: object of type \'generator\' has no len()</code>. Need those? Use a list.',
    video: {
      src: 'videos/l83-generators.mp4', poster: 'videos/l83-generators.jpg', length: '1 min 4 s',
      script: [
        'Saturday brunch. Up to 100 guests might want pancakes. So this recipe cooks them all first, and returns a list. 100 pancakes, stacked on the counter.',
        'But right now, only 3 guests are hungry. 97 go cold.',
        'Change one line. Instead of append, write yield. Now calling pancakes runs nothing. You get a generator, a station waiting for orders.',
        'Ana asks with next. The station runs down to the yield, hands her pancake 1, and pauses right there. Nothing else is cooked.',
        'Ben asks. The station wakes up on the same line, goes round the loop once, and hands him pancake 2. Pause again.',
        'Chloe asks. Pancake 3. Three guests, three pancakes, nothing wasted. And a for loop asks for you, one at a time, until the station runs out.',
        'Yield hands out one value and pauses. Nothing is cooked until someone asks.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Cook one pancake when a guest asks.',
        text: [
          'Saturday brunch. Up to 100 guests might want a pancake. A function that <b>returns a list</b> has to cook all 100 first, stack them, and only then hand the stack over. If 3 guests are hungry right now, 97 go cold.',
          'A <b>generator</b> works like a pancake station. Write <code>yield</code> where you would have added to the list. Now <code>pancakes(100)</code> cooks <b>nothing</b>. It hands back a station, waiting for orders. Each time a guest asks with <code>next(station)</code>, the station cooks <b>one</b> pancake, hands it over, and waits again.',
          'Press <b>Run</b> on <code>station.py</code>. <code>print(station)</code> shows <code>&lt;generator object pancakes at 0x...&gt;</code>, and no "cooking" line came before it: calling <code>pancakes(100)</code> ran none of its lines. Each "cooking" line appears only after someone asks. (The number after <code>0x</code> is where it sits in memory and changes each run.)'
        ],
        tip: '<code>next()</code> and iterators are lesson 82: an iterator hands out one value per <code>next()</code>. A generator is the easiest way to make your own iterator. You write a normal-looking function, and Python builds the iterator for you.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'Run to the next yield, then pause.',
        text: [
          'Any function with <code>yield</code> in it is a <b>generator function</b>. Calling it gives you a generator and runs nothing. Then each <code>next()</code> runs the function <b>from where it last stopped down to the next <code>yield</code></b>, hands out the value after <code>yield</code>, and <b>pauses on that line</b>. Its names keep their values while it waits.',
          'Ana is training for a half-marathon, so Kitchen Coach plans her meals <b>day by day</b>. <code>ana_plan</code> has three <code>yield</code> lines. Press <b>Run</b>. "planning Tuesday" only appears after the second <code>next()</code>, after Ana has run on Monday. The function really did stop and wait in between.',
          'A <b><code>for</code> loop</b> calls <code>next()</code> for you until the generator runs out, as in lesson 82. Look closely: the loop starts at <b>Wednesday</b>. A generator remembers where it is, so the loop carries on from there and does not start over. Now change it: add a Thursday, a <code>print</code> and a <code>yield</code> like the others ("Thu: 6 km tempo, potatoes and fish"), and run it again. The loop picks it up with no other change.'
        ],
        tip: 'When the function reaches its end, the generator is finished. The next <code>next()</code> raises <code>StopIteration</code>, the "no more plates" signal from lesson 82, and a <code>for</code> loop takes that as its cue to stop quietly.'
      },
      {
        label: 'The pain', pic: run(painBox, { title: 'all_pancakes.py' }),
        h: '10,000 cooked for 3 guests.',
        text: [
          'The brunch app takes up to 10,000 orders. <code>all_pancakes</code> builds the whole list before it returns, so it cooks <b>every</b> pancake first. Then only Ana, Ben and Chloe eat. <code>zip</code> (lesson 77) pairs each guest with a plate and stops at the shorter side, the 3 guests.',
          'Press <b>Run</b>. "Cooked 10000 pancakes" comes <b>before</b> anyone eats, and 9,997 are left on the counter. Every one of them took time to make and takes room in memory, even though nobody wanted them.',
          'Change <code>10_000</code> to <code>1_000_000</code> and run it again. Still 3 guests. Now a million pancakes get cooked, and stored, for them.'
        ],
        warn: 'The pain is building a big list <b>just to loop over it once</b>. If all you do is walk through the values one by one, nobody needs the whole stack at the same time.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'yield instead of append.',
        text: [
          'Swap the list for <code>yield</code>. No <code>plates = []</code>, no <code>append</code>, no <code>return</code>: the line that added a plate now <b>hands it out</b>. Press <b>Run</b> on <code>station.py</code>. Three guests, three "cooking" lines, and pancake 4 is never made. The 10,000 is only an upper limit now.',
          'The short way, for simple cases: put a comprehension (lesson 76) in <b>round brackets</b>. <code>[n for n in range(1_000_000)]</code> builds a list now. <code>(n for n in range(1_000_000))</code> is a <b>generator expression</b>: same parts, but it makes nothing until asked.',
          'Press <b>Run</b> on <code>memory.py</code>. <code>sys.getsizeof</code> tells you how many bytes something takes. The list takes <b>millions</b> of bytes, and that does not even count the numbers inside. The generator takes about a hundred or two, and a generator for a <b>billion</b> numbers takes the same. It only remembers where it is, never the values. (The exact numbers differ between your browser and your computer.)'
        ],
        tip: 'Laziness costs nothing here: the guests still get pancake 1, 2 and 3, in order, the same as before.'
      },
      {
        label: 'Try it', pic: run(tryBox, { title: 'tickets.py' }),
        h: 'An endless station, and sum on the fly.',
        text: [
          '<b>A generator can go on forever.</b> <code>order_tickets</code> loops <code>while True</code>. As a list that would never finish. As a generator it is safe, because it only makes a ticket when asked. To take a few, use <code>islice</code> from <code>itertools</code>, a standard module of loop tools (lesson 61): <code>islice(tickets, 3)</code> takes the first 3 and then stops asking. A <code>for</code> loop with a <code>break</code> works too.',
          '<b>Feed a generator expression straight to <code>sum</code></b>, <code>max</code>, <code>min</code> or <code>any</code>. Each pancake is 90 kcal. <code>sum(count * 90 for count in stacks.values())</code> works out each guest\'s kcal and adds it up, with no list in between. When the generator is the only thing in the call, its own round brackets can be left out.',
          'Press <b>Run</b>. Then change it: take the first <b>5</b> tickets instead of 3, and say what <code>next(tickets)</code> prints before you run it. Then give Ben 5 pancakes and check the total: it should be 900 kcal.'
        ],
        warn: 'Never call <code>list()</code> on an endless generator, or loop over it with no <code>break</code>. Python keeps asking forever. In this page the <b>Stop</b> button (or the 10 second limit) ends it. On your computer, press <b>Ctrl+C</b>.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'One pass, no len(), no [0].',
        text: [
          '<b>A generator works once.</b> It is an iterator (lesson 82), and an iterator is used up after one pass. Press <b>Run</b>: the first <code>list(station)</code> gets 3 pancakes, the second gets <code>[]</code>. No error, just nothing. Need it again? Call the generator function again for a <b>fresh</b> station, or keep the values in a list.',
          '<b><code>return</code> inside a generator just stops it.</b> Each pancake takes 60 g of batter. With 200 g, after 3 pancakes only 20 g is left, so <code>return</code> closes the station and the loop that was asking stops quietly. Any value after <code>return</code> is not handed to the loop. Use <code>yield</code> for the values.',
          '<b>No length, no position.</b> A generator does not know how many values are coming, and it has not made them yet. <code>len(station)</code> stops with <code>TypeError: object of type \'generator\' has no len()</code>, and <code>station[0]</code> with <code>TypeError: \'generator\' object is not subscriptable</code>. When you need <code>len()</code>, indexing, slicing or several passes, make a <b>list</b>: <code>plates = list(pancakes(3))</code>.'
        ],
        warn: 'Rule of thumb: a generator for "one at a time, maybe not all of them, maybe endless". A list when you need the whole stack: to count it, pick from it by position, or go through it twice.'
      }
    ],
    exercises: [
      {
        file: 'l83_pancake_station.py', title: 'Pancake station',
        task: 'Build the brunch pancake station. <code>pancakes(n)</code> is a <b>generator</b> that yields <code>"pancake 1"</code>, <code>"pancake 2"</code> and so on up to <code>"pancake n"</code>. <code>total_kcal(stacks)</code> adds up the kcal for every guest\'s stack (90 kcal a pancake) with <code>sum</code> and a <b>generator expression</b>.',
        steps: [
          'Press <b>Open in VS Code</b> and run the file. The starter returns a list, so the check gives the first hint.',
          'Between <code>START</code> and <code>END</code>, rewrite <code>pancakes</code> with <code>yield</code>, then write <code>total_kcal</code> as one <code>return sum(... for ... in ...)</code> line.',
          'Run it until it says <code>PASS</code>. The check makes sure <code>pancakes</code> really is a generator, that it cooks nothing until asked, and that <code>total_kcal</code> uses a generator expression.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['def pancakes(n):', '    for i in range(1, n + 1):', '        print("cooking", i)', '        yield i', '', 'station = pancakes(3)', 'print("ready")'], { title: 'ready.py' }),
        options: ['ready', 'cooking 1 then ready', 'cooking 1, cooking 2, cooking 3, then ready', 'Nothing at all'],
        answer: 0,
        why: 'Calling a generator function runs none of its lines. It only hands back a generator. Nobody called <code>next()</code> or looped over <code>station</code>, so nothing was cooked. Only <code>print("ready")</code> runs.',
        hint: 'When does the body of a generator function start running?'
      },
      {
        type: 'order', q: 'Put the output of this program in order.',
        pic: code(['def plan():', '    print("planning Mon")', '    yield "Mon: oats"', '    print("planning Tue")', '    yield "Tue: rice"', '', 'p = plan()', 'print("start")', 'print(next(p))', 'print(next(p))'], { title: 'plan.py' }),
        items: ['start', 'planning Mon', 'Mon: oats', 'planning Tue', 'Tue: rice'],
        why: '<code>plan()</code> runs nothing, so <code>start</code> comes first. The first <code>next</code> runs down to the first <code>yield</code>: "planning Mon", then the value is printed. The second <code>next</code> wakes up after that yield and runs to the next one.',
        hint: 'Each next() runs only as far as the next yield.'
      },
      {
        type: 'fix', q: 'This cooks all 10,000 pancakes before anyone eats. Turn <code>all_pancakes</code> into a <b>generator</b>, so only 3 "cooking" lines appear.',
        code: ['def all_pancakes(n):', '    plates = []', '    for i in range(1, n + 1):', '        print("cooking", i)', '        plates.append(f"pancake {i}")', '    return plates', '', 'station = all_pancakes(10_000)', 'for guest, plate in zip(["Ana", "Ben", "Chloe"], station):', '    print(guest, "eats", plate)'],
        title: 'brunch.py',
        check: [
          'import types',
          'lines = out.strip().splitlines()',
          'cooked = [l for l in lines if l.startswith("cooking")]',
          'want = ["cooking 1", "Ana eats pancake 1", "cooking 2", "Ben eats pancake 2", "cooking 3", "Chloe eats pancake 3"]',
          'if lines == want and isinstance(station, types.GeneratorType):',
          '    ok = True',
          'elif len(cooked) > 3:',
          '    msg = "Still " + str(len(cooked)) + " cooking lines. Replace plates.append(...) with yield, and remove plates = [] and return plates."',
          'elif not isinstance(station, types.GeneratorType):',
          '    msg = "all_pancakes is not a generator yet. It needs a yield inside."',
          'else:',
          '    msg = "Close. Each guest should get the next pancake: " + " / ".join(want)'
        ].join('\n'),
        why: 'Replace <code>plates.append(f"pancake {i}")</code> with <code>yield f"pancake {i}"</code> and drop <code>plates = []</code> and <code>return plates</code>. zip asks for one pancake per guest, and stops after Chloe, so pancake 4 is never cooked.',
        hint: 'Where the list grows by one, hand that one plate out instead.'
      },
      {
        type: 'fix', q: 'Ben gets an empty stack. Fix it so both lines print three pancakes.',
        code: ['def pancakes(n):', '    for i in range(1, n + 1):', '        yield f"pancake {i}"', '', 'station = pancakes(3)', 'print("Ana:", list(station))', 'print("Ben:", list(station))'],
        title: 'twice.py',
        check: [
          'want = "[\'pancake 1\', \'pancake 2\', \'pancake 3\']"',
          'lines = out.strip().splitlines()',
          'if lines == ["Ana: " + want, "Ben: " + want]:',
          '    ok = True',
          'elif len(lines) == 2 and lines[1] == "Ben: []":',
          '    msg = "Ben still gets []. The first list() used the station up. Give Ben a fresh one: pancakes(3)"',
          'else:',
          '    msg = "It should print  Ana: " + want + "  and  Ben: " + want'
        ].join('\n'),
        why: 'A generator works once. After Ana\'s <code>list(station)</code> it is used up, so Ben\'s gives <code>[]</code>. Call <code>pancakes(3)</code> again for a fresh station (<code>print("Ben:", list(pancakes(3)))</code>), or save the list once and print it twice.',
        hint: 'How many passes does a generator give you?'
      },
      {
        type: 'bucket', q: 'A generator, or a list?',
        buckets: ['A generator is fine', 'Make a list'],
        items: [
          ['walk through 10,000 orders once', 0],
          ['an endless supply of ticket numbers', 0],
          ['sum the kcal of every stack', 0],
          ['ask how many pancakes there are with len()', 1],
          ['take the third pancake with [2]', 1],
          ['go through the same plates twice', 1]
        ],
        why: 'A generator gives values one at a time, once, and only when asked. That suits one pass, endless supplies and sum. len(), indexing and a second pass need all the values kept, so they need a list.',
        hint: 'Do you need the whole stack at once, or one plate at a time?'
      },
      {
        type: 'fill', q: 'Finish the generator, then add up 90 kcal for each pancake in every stack with a generator expression.',
        text: 'def pancakes(n):\n    for i in range(1, n + 1):\n        ___ f"pancake {i}"\n\ntotal = sum(count * 90 ___ count in stacks.values())',
        options: ['yield', 'for', 'return', 'in', 'append', 'if'],
        answer: ['yield', 'for'],
        why: '<code>yield</code> hands out one pancake and pauses. <code>(count * 90 for count in ...)</code> is a generator expression, a comprehension in round brackets, and inside <code>sum(...)</code> its own brackets can be left out.',
        hint: 'One word hands out a value and pauses. The other is the same word as in a comprehension.'
      },
      {
        type: 'pick', q: 'What happens?',
        pic: code(['def pancakes(n):', '    for i in range(1, n + 1):', '        yield f"pancake {i}"', '', 'station = pancakes(5)', 'print(station[0])'], { title: 'first.py' }),
        options: ["TypeError: 'generator' object is not subscriptable", 'pancake 1', 'pancake 0', 'IndexError: list index out of range'],
        answer: 0,
        why: 'A generator has no positions: it has not made the pancakes yet. Use <code>next(station)</code> for the next one, or <code>list(station)[0]</code> if you really need positions.',
        hint: 'Is a generator a list?'
      },
      {
        type: 'pick', q: 'Back to lesson 77. Here zip pairs 3 guests with a station of 10,000 pancakes. How many pancakes get cooked?',
        pic: code(['station = pancakes(10_000)   # a generator', 'for guest, plate in zip(["Ana", "Ben", "Chloe"], station):', '    print(guest, "eats", plate)'], { title: 'zip.py' }),
        options: ['3', '10,000', '4', '0'],
        answer: 0,
        why: 'zip stops at the shortest side and says nothing (lesson 77). After Chloe there are no more guests, so zip stops asking, and the station never cooks pancake 4. With a list, all 10,000 would have been cooked first.',
        hint: 'Where does zip stop?'
      }
    ]
  });
})();
