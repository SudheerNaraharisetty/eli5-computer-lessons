/* Lesson 61: The standard library (module 5). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l61  The standard library
     ===================================================================== */

  // A book standing on a shelf: spine with a label written bottom to top (same drawing as lesson 60).
  const book = (x, base, w, h, fill, label, txt) =>
    `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" rx="6" fill="${fill}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<text transform="translate(${x + w / 2 + 5} ${base - 12}) rotate(-90)" font-size="14" font-weight="800" fill="${txt || P.ink}">${label}</text>`;

  /* ---- The idea: the free shelf, one kitchen job per book ---- */
  const jobs = [
    ['random', 'pick Friday\'s dinner', 'random.choice', P.tint],
    ['datetime', 'days to Ana\'s race', 'date(2027, 2, 28)', P.okT],
    ['collections', 'count the meals', 'Counter(meals)', P.warnT],
    ['math', 'packs to buy', 'math.ceil', P.dangerT],
    ['statistics', 'Ana\'s average run', 'statistics.mean', '#E3EEFB']
  ];
  const ideaSvg = svg(600, 330, 'A shelf of five books that come free with Python: random, datetime, collections, math and statistics. Each one is wired to one kitchen job: random picks Friday\'s dinner, datetime counts the days to Ana\'s race, collections counts the meals, math rounds up the packs to buy, statistics averages Ana\'s run times.',
    T(130, 22, 'FREE WITH PYTHON', { s: 13, f: P.accent }) + T(430, 22, 'ONE KITCHEN JOB EACH', { s: 13, f: P.ink2 }) +
    jobs.map((j, i) => book(22 + i * 46, 300, 40, [150, 190, 230, 120, 210][i], j[3], j[0])).join('') +
    `<rect x="10" y="300" width="248" height="8" rx="3" fill="${P.ink}"/>` +
    T(134, 326, 'the standard library', { s: 12.5, w: 700, f: P.accent }) +
    jobs.map((j, i) => {
      const y = 44 + i * 54;
      return box(290, y, 290, 44, P.white, 10) +
        T(302, y + 19, j[1], { s: 13, a: 'start' }) + T(302, y + 37, j[2], { s: 11.5, m: true, a: 'start', f: P.ink2 }) +
        arrow(42 + i * 46, 300 - [150, 190, 230, 120, 210][i] - 6, 284, y + 22, P.mute, 1.5);
    }).join(''));
  const ideaPic = `<div style="width:100%;min-width:0">${ideaSvg}</div>`;

  /* ---- The code: date, Counter, random ---- */
  const tools = [
    'from datetime import date',
    'from collections import Counter',
    '',
    'race = date(2027, 2, 28)          # year, month, day',
    'today = date(2026, 11, 23)',
    'print("Days to Ana\'s race:", (race - today).days)',
    '',
    'meals = ["oats", "rice", "oats", "tofu", "oats", "rice", "pasta"]',
    'counts = Counter(meals)',
    'print(counts)',
    'print("Most eaten:", counts.most_common(1))',
    'print("Quinoa:", counts["quinoa"])'
  ];
  const friday = [
    'import random',
    '',
    'dinners = ["pasta", "bean chili", "risotto", "tacos"]',
    'print("Friday dinner:", random.choice(dinners))'
  ];
  const codePic = `<div style="width:100%;min-width:0">${run(tools, { title: 'coach_tools.py' })}${run(friday, { title: 'friday.py' })}</div>`;

  /* ---- The pain: a date counter by hand, with 30-day months ---- */
  const byHand = [
    'def days_between(y1, m1, d1, y2, m2, d2):',
    '    """Days from one date to another. Every month is 30 days."""',
    '    start = y1 * 360 + m1 * 30 + d1',
    '    end = y2 * 360 + m2 * 30 + d2',
    '    return end - start',
    '',
    'print("Days to Ana\'s race:", days_between(2026, 11, 23, 2027, 2, 28))'
  ];
  // Four months as bars: the real length vs the 30 the hand-made counter assumes.
  const months = [['Nov', 30, '23 to 30: 7'], ['Dec', 31, 'all 31'], ['Jan', 31, 'all 31'], ['Feb', 28, '1 to 28: 28']];
  const calSvg = svg(600, 220, 'From 23 November 2026 to 28 February 2027. The hand-made counter thinks every month has 30 days. December and January really have 31 days each, so it loses 2 days and says 95. Python\'s date knows every month and says 97.',
    T(300, 22, '23 Nov 2026 to race day, 28 Feb 2027', { s: 14 }) +
    months.map((m, i) => {
      const x = 24 + i * 140;
      const over = m[1] - 30;
      return box(x, 40, 124, 92, over > 0 ? P.dangerT : P.white, 12) +
        T(x + 62, 66, m[0], { s: 15 }) +
        T(x + 62, 92, m[1] + ' days', { s: 14, m: true, f: over > 0 ? P.danger : P.ink }) +
        T(x + 62, 116, over > 0 ? 'hand-made: 30' : ' ', { s: 12, w: 700, f: P.danger });
    }).join('') +
    T(304, 156, 'counted days: 7 + 31 + 31 + 28', { s: 13, w: 700, f: P.ink2 }) +
    box(60, 172, 210, 38, P.dangerT, 10) + T(165, 197, 'by hand: 95', { s: 15, m: true, f: P.danger }) +
    box(330, 172, 210, 38, P.okT, 10) + T(435, 197, 'datetime: 97', { s: 15, m: true, f: P.ok }));
  const painPic = `<div style="width:100%;min-width:0">${run(byHand, { title: 'race_by_hand.py' })}${calSvg}</div>`;

  /* ---- The fix: one import ---- */
  const fixDate = [
    'from datetime import date',
    '',
    'race = date(2027, 2, 28)',
    'today = date(2026, 11, 23)',
    'gap = race - today',
    'print(gap)',
    'print(gap.days, "days")',
    'print(gap.days // 7, "weeks and", gap.days % 7, "days")',
    '',
    'print("Today, on this computer:", date.today())',
    'print("From today:", (race - date.today()).days, "days")'
  ];
  const oldCount = [
    'counts = {}',
    'for food in meals:',
    '    counts[food] = counts.get(food, 0) + 1'
  ];
  const newCount = [
    'from collections import Counter',
    'counts = Counter(meals)'
  ];
  const findTools = [
    'import math',
    '',
    'help(math.ceil)',
    'print(dir(math))'
  ];
  const fixPic = `<div style="width:100%;min-width:0">${run(fixDate, { title: 'race.py' })}` +
    code(oldCount, { title: 'lesson 38: counting by hand', hi: [3] }) +
    code(newCount, { title: 'lesson 61: the same count, from the free shelf', good: [2] }) +
    run(findTools, { title: 'look_inside.py' }) + `</div>`;

  /* ---- Try it: Kitchen Coach plans the week ---- */
  const week = [
    'import math',
    'import random',
    'import statistics',
    '',
    'dinners = ["pasta", "bean chili", "risotto", "tacos"]',
    'print("Friday dinner:", random.choice(dinners))',
    '',
    'pasta_g = 4 * 120 + 150          # 4 plates, plus extra carbs for Ana',
    'packs = math.ceil(pasta_g / 500)',
    'print(f"Pasta: {pasta_g} g, so buy {packs} packs of 500 g")',
    '',
    'runs = [31, 29.5, 30, 28.5]       # Ana\'s 5 km times this week, in minutes',
    'print("Ana\'s average 5 km:", statistics.mean(runs), "minutes")'
  ];

  /* ---- The catch ---- */
  const seeded = [
    'import random',
    '',
    'random.seed(7)',
    'dinners = ["pasta", "bean chili", "risotto", "tacos"]',
    'print("Friday dinner:", random.choice(dinners))'
  ];
  const backup = [
    'import copy',
    '',
    'guests = {"Ana": {"likes": ["pasta", "oats"]}, "Ben": {"likes": ["tofu"]}}',
    '',
    'outside = copy.copy(guests)        # copies only the outside, like week[:]',
    'outside["Ben"]["likes"].append("eggs")',
    'print(guests["Ben"]["likes"])',
    '',
    'safe = copy.deepcopy(guests)       # copies every level',
    'safe["Ana"]["likes"].append("rice")',
    'print(guests["Ana"]["likes"])',
    'print(safe["Ana"]["likes"])'
  ];
  const catchPic = `<div style="width:100%;min-width:0">${run(seeded, { title: 'friday_fixed.py' })}${run(backup, { title: 'backup.py' })}` +
    term(['$ python3 plot_runs.py', 'Traceback (most recent call last):', '  File "/Users/you/kitchen/plot_runs.py", line 1, in <module>', '    import numpy', "ModuleNotFoundError: No module named 'numpy'. Did you mean: 'runpy'?"], 'terminal, Python 3.15') + `</div>`;

  COURSE.add({
    id: 'l61', minutes: 13,
    summary: 'Python comes with a whole shelf of free modules, the <b>standard library</b>. People say Python has <b>batteries included</b>. <code>random.choice</code> picks a dinner, <code>datetime.date</code> counts the days to a race with every month\'s real length, <code>collections.Counter</code> counts meals in one line, <code>math.ceil</code> rounds packs up and <code>statistics.mean</code> averages run times. <code>copy.deepcopy</code> copies nested data at every level. Before you write a tool yourself, look for it: the list is at docs.python.org/3/library, and <code>help()</code> and <code>dir()</code> show what is inside a module. Some modules, like numpy, are not on the free shelf. You install those (lesson 63).',
    video: {
      src: 'videos/l61-the-standard-library.mp4', poster: 'videos/l61-the-standard-library.jpg', length: '1 min 11 s',
      script: [
        'Kitchen Coach needs a few everyday tools. Pick a dinner for Friday. Count the days to Ana\'s race. Count this week\'s meals. So you roll up your sleeves and write them yourself.',
        'Take the race. Ana runs on the 28th of February. Today is the 23rd of November. Your counter treats every month as 30 days. It says 95.',
        'But December and January have 31 days. The real answer is 97. Ana would start her taper 2 days late.',
        'Python comes with a shelf of free cookbooks. Random. Datetime. Collections. Math. Statistics. People call it batteries included.',
        'From datetime, import date. Race day minus today. 97 days, every month counted right.',
        'Counter tallies the week\'s meals in one line. Oats, 3 times. And random choice picks Friday\'s dinner.',
        'To find a tool, search the Python docs, or ask help.',
        'Before you write it, check the free cookbooks. Python probably has it.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'The cookbooks that come free.',
        text: [
          'Kitchen Coach needs a few everyday tools. Pick a <b>random dinner</b> for Friday. Count the <b>days to Ana\'s race</b> on 28 February. Count <b>how often</b> each meal came up this week. Work out how many <b>packs of pasta</b> to buy. Find Ana\'s <b>average</b> 5 km time.',
          'You could write every one of them yourself. You already wrote a counting loop in lesson 38. But these jobs are so common that Python <b>already has them</b>. In lesson 60 you put your own cards in a cookbook, <code>kitchen.py</code>. Python comes with a whole shelf of cookbooks like that, ready to <code>import</code>.',
          'That shelf is called the <b>standard library</b>. It comes with every Python, so there is nothing to install. People say Python has <b>batteries included</b>. You have already used a few books from it: <code>math</code>, <code>time</code>, <code>pathlib</code> and <code>json</code>. Today you meet five more, each with <b>one kitchen job</b>.'
        ],
        tip: 'The standard library has more than 200 modules. You do not learn them all. You learn that the shelf exists, and you look on it first.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'One import, and the tool is yours.',
        text: [
          '<b>Dates.</b> <code>from datetime import date</code> takes the card <code>date</code> out of the <code>datetime</code> book, the <code>from ... import</code> way from lesson 60. <code>date(2027, 2, 28)</code> makes a date: year, month, day, in that order. Take one date from another, and <code>.days</code> gives the whole days between them: <b>97</b>.',
          '<b>Counting.</b> <code>Counter(meals)</code> from the <code>collections</code> book counts every item in the list in one go. It is a dictionary of food to count. <code>.most_common(1)</code> hands back the top one, as a list with one <b>(food, count)</b> tuple. And a food that never came up counts as <code>0</code>, with no <code>KeyError</code>.',
          'Press <b>Run</b> on <code>coach_tools.py</code>. Then add <code>"tofu", "tofu"</code> to the meals and change <code>1</code> to <code>2</code> in <code>most_common(1)</code>. Before you run it, say which two foods come out on top.',
          '<b>A random pick.</b> <code>random.choice(dinners)</code> picks one item from the list, a different one each time. Press <b>Run</b> on <code>friday.py</code> a few times.'
        ],
        tip: 'The book is called <code>datetime</code>, and it also has a card called <code>datetime</code>, for a date with a time of day. Today you only need <code>date</code>. That is why the line says <code>from datetime import date</code>.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Every month is 30 days. Except it is not.',
        text: [
          'Before you knew about <code>datetime</code>, you wrote your own day counter. It turns each date into a number of days: 360 for each year, 30 for each month, plus the day. Then it takes one from the other. Short, tidy, and it even has a docstring (lesson 48).',
          'Press <b>Run</b>. It says <b>95</b> days to Ana\'s race. No error. It looks right.',
          'It is not. December and January have <b>31 days</b>, so the counter loses one day in each. The real answer is <b>97</b>. Ana plans to cut back her training 14 days before the race. With your number she starts 2 days late.',
          'And months are only the start. February has 29 days in a leap year. Get all of that right by hand and you have written a lot of code that Python already has.'
        ],
        warn: 'A hand-made tool that is "almost right" is the worst kind. It gives no error. It gives a wrong number that looks fine, and you find out on race day.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Look on the free shelf first.',
        text: [
          '<b>Dates.</b> In <code>race.py</code>, <code>race - today</code> hands back a <b>timedelta</b>: a length of time. Printed, it says <code>97 days, 0:00:00</code> (days, then hours, minutes and seconds). <code>gap.days</code> is just the number, <code>97</code>, ready for maths: 13 weeks and 6 days. Press <b>Run</b>.',
          '<code>date.today()</code> asks the computer for today\'s date. Its answer changes every day, so the last two lines print something different tomorrow. That is right: Ana wants the count from <b>today</b>.',
          '<b>Counting.</b> The three lines from lesson 38 and the one line with <code>Counter</code> do the same job. You understand the long way, so the short way is no mystery. Use the short way.',
          '<b>How do you find a tool?</b> The full list of free cookbooks is in the Python docs, at <b>docs.python.org/3/library</b>. Search it for what you want to do, like "date" or "average". Inside Python, <code>help(math.ceil)</code> prints a card\'s docstring, and <code>dir(math)</code> lists every name in a book. Press <b>Run</b> on <code>look_inside.py</code>. Skip the names with underscores: those are for Python itself.'
        ],
        tip: 'In <code>help</code>, the <code>/</code> in <code>ceil(x, /)</code> only means "pass x by position, not by name". You can ignore it for now.'
      },
      {
        label: 'Try it', pic: run(week, { title: 'week_plan.py' }),
        h: 'Kitchen Coach plans the week.',
        text: [
          'Three books in one program. Press <b>Run</b>. <code>math.ceil</code> rounds <b>up</b> (lesson 60): 630 g of pasta is 1.26 packs, and a shop sells whole packs, so you buy <b>2</b>. <code>statistics.mean</code> adds Ana\'s times and divides by how many there are: <b>29.75</b> minutes.',
          '1. Cook for 8 plates instead of 4. Before you run it, work out the packs. (8 * 120 + 150 = 1110 g, so 3 packs.)',
          '2. Ana runs once more this week, in 27 minutes. Add <code>27</code> to the list and run it. The mean drops to <b>29.2</b>. You did not change the maths: <code>mean</code> counts the times for you.',
          '3. Add <code>"curry"</code> to the dinners, and run it a few times until Friday is curry.'
        ],
        tip: '<code>statistics</code> has more: <code>statistics.median(runs)</code> gives the middle time, which ignores one very bad day. Try it on the last line.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Know what the tool really does.',
        text: [
          '<b>Random is random.</b> <code>random.choice</code> gives a different dinner each run. For a test, you want the same answer every time. <code>random.seed(7)</code> sets where the random numbers start, so the same seed gives the same picks, here <b>risotto</b>, on every run and every computer. Press <b>Run</b> twice on <code>friday_fixed.py</code>. Then change 7 to 9.',
          '<b>A copy copies the outside.</b> Lesson 41 promised a ready-made tool for nested data. Here it is. <code>copy.copy(guests)</code> is like <code>week[:]</code>: a new outer dict, but the <b>same inner dicts and lists</b>, so eggs land in Ben\'s real list too. <code>copy.deepcopy(guests)</code> copies every level, so rice goes into the copy only. Press <b>Run</b> on <code>backup.py</code>.',
          '<b>Not everything is on the free shelf.</b> Some well-known modules, like <code>numpy</code> for big tables of numbers, come from other people. <code>import numpy</code> stops with <code>ModuleNotFoundError</code> until you install it. Python 3.15 even guesses <code>runpy</code>, a standard module with a similar name. Not what you meant. Lesson 63, pip and packages, shows how to buy a new cookbook.'
        ],
        warn: '<code>random</code> is fine for dinners and games. It is not safe for passwords or secret codes, because its numbers can be worked out. For those, the standard library has a book called <code>secrets</code>.'
      }
    ],
    exercises: [
      {
        file: 'l61_kitchen_tools.py', title: 'Kitchen tools from the free shelf',
        task: 'Four hand-made recipe cards give wrong answers: the most eaten meal, the days to Ana\'s race, the packs of pasta to buy, and Ana\'s average run time. Rewrite each one with a tool from the standard library: <code>Counter</code>, <code>date</code>, <code>math.ceil</code> and <code>statistics.mean</code>. The check calls your cards with <b>other weeks, dates and numbers</b>.',
        steps: [
          'Press <b>Open in VS Code</b>. Run the file first: the orders print four answers, and the check gives you a hint about the first wrong one.',
          'Between <code>START</code> and <code>END</code>, add the imports at the top, then fix each card. The comment at the top of the file says which tool fits which card. Save the file.',
          'Run it again until it says <code>PASS</code>. The orders should print: oats, 97 days, 3 packs and 29.75 minutes.'
        ]
      }
    ],
    quiz: [
      {
        type: 'match', q: 'Match each kitchen job to the free tool that does it.',
        pairs: [
          ['Pick a dinner for Friday', 'random.choice'],
          ['Days until Ana\'s race', 'datetime.date'],
          ['How often each meal came up', 'collections.Counter'],
          ['Whole packs of pasta to buy', 'math.ceil'],
          ['Ana\'s average run time', 'statistics.mean']
        ],
        why: 'Five books from the standard library, one job each. All of them come with Python, so a plain <code>import</code> is all you need.',
        hint: 'Read the name of each book: random, dates, collections of things, maths, statistics.'
      },
      {
        type: 'pick', q: 'What does the last line print?',
        pic: code(['from collections import Counter', '', 'counts = Counter(["rice", "tofu", "rice", "oats", "rice", "tofu"])', 'print(counts.most_common(1))'], { title: 'top.py' }),
        options: ["[('rice', 3)]", "rice", "{'rice': 3, 'tofu': 2, 'oats': 1}", "[('rice', 3), ('tofu', 2)]"],
        answer: 0,
        why: '<code>most_common(1)</code> hands back a list with the top <b>1</b> item, as a (food, count) tuple. Rice came up 3 times. <code>most_common(2)</code> would add tofu.',
        hint: 'It is a list of tuples, and the 1 says how many.'
      },
      {
        type: 'fix', q: 'This hand-made counter says <b>95</b> days to Ana\'s race. The real answer is 97. Fix it with the <code>datetime</code> module, so it prints just <code>97</code>.',
        code: ['def days_between(y1, m1, d1, y2, m2, d2):', '    start = y1 * 360 + m1 * 30 + d1', '    end = y2 * 360 + m2 * 30 + d2', '    return end - start', '', 'print(days_between(2026, 11, 23, 2027, 2, 28))'],
        title: 'race.py',
        check: [
          'if out.strip() != "97":',
          '    msg = "It should print just 97. It printed: " + out.strip()',
          'elif "date" not in globals() and "datetime" not in globals():',
          '    msg = "Right number. Now let the datetime module work it out: from datetime import date."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: '<code>from datetime import date</code>, then <code>print((date(2027, 2, 28) - date(2026, 11, 23)).days)</code>. <code>date</code> knows that December and January have 31 days, and February 28 in 2027.',
        hint: 'Start with <code>from datetime import date</code>. Take <code>date(2026, 11, 23)</code> from <code>date(2027, 2, 28)</code>, and print the <code>.days</code> of the result.'
      },
      {
        type: 'pick', q: 'Back to lesson 38. There you counted with <code>counts[food] = counts.get(food, 0) + 1</code>. With <code>counts = Counter(meals)</code>, what is <code>counts["quinoa"]</code> when quinoa is not in <code>meals</code>?',
        options: ['0', 'KeyError: \'quinoa\'', 'None', '1'],
        answer: 0,
        why: 'A <code>Counter</code> treats a missing item as a count of 0, just like <code>.get(food, 0)</code> did in your lesson 38 loop. That is the line it runs for you inside.',
        hint: 'What did the 0 in <code>.get(food, 0)</code> stand for?'
      },
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['import math', 'import statistics', '', 'print(math.ceil(1150 / 500))', 'print(statistics.mean([30, 28, 29, 27, 31]))'], { title: 'shop.py' }),
        options: ['3, then 29', '2, then 29', '3, then 36.25', '2.3, then 29'],
        answer: 0,
        why: '1150 / 500 is 2.3, and <code>math.ceil</code> rounds <b>up</b> to 3 packs. The mean adds the five times (145) and divides by 5: 29. Dividing by 4 instead is the classic hand-made bug: 36.25.',
        hint: 'ceil always rounds up. mean divides by how many numbers there are.'
      },
      {
        type: 'fix', q: 'Kitchen Coach makes a backup of the guest book, then adds rice to Ana\'s list in the <b>backup</b>. But the rice shows up in the real guest book too. Fix line 4 so <code>guests</code> stays as it was.',
        code: ['import copy', '', 'guests = {"Ana": {"likes": ["pasta", "oats"]}, "Ben": {"likes": ["tofu"]}}', 'backup = copy.copy(guests)', 'backup["Ana"]["likes"].append("rice")', 'print(guests["Ana"]["likes"])', 'print(backup["Ana"]["likes"])'],
        title: 'backup.py',
        check: [
          'want = "[\'pasta\', \'oats\']\\n[\'pasta\', \'oats\', \'rice\']"',
          'if out.strip() == want:',
          '    ok = True',
          'elif "rice" in out.splitlines()[0]:',
          '    msg = "The rice still shows up in guests. The copy shares the inner lists."',
          'else:',
          '    msg = "It should print [\'pasta\', \'oats\'] and then [\'pasta\', \'oats\', \'rice\']. It printed: " + out.strip()'
        ].join('\n'),
        why: '<code>copy.copy</code> copies only the outer dict, like <code>week[:]</code> in lesson 41. <code>copy.deepcopy(guests)</code> copies every level, so the backup gets its own lists.',
        hint: 'One word changes on line 4: the copy module has a tool that copies every level.'
      },
      {
        type: 'bucket', q: 'Does it come free with Python, or do you install it first?',
        buckets: ['On the free shelf', 'Install it first'],
        items: [
          ['random', 0],
          ['datetime', 0],
          ['collections', 0],
          ['json', 0],
          ['pathlib', 0],
          ['numpy', 1]
        ],
        why: 'random, datetime, collections, json and pathlib are all in the standard library. numpy is made by other people, so <code>import numpy</code> fails until you install it with pip (lesson 63).',
        hint: 'You used five of these in this course with no install at all.'
      },
      {
        type: 'type', q: 'Type the line that brings <b>only</b> the <code>Counter</code> card out of the <code>collections</code> book, so you can write <code>Counter(meals)</code>.',
        prompt: '>>>',
        answers: ['from collections import Counter'],
        why: '<code>from collections import Counter</code>, the <code>from ... import</code> way from lesson 60. Note the capital C: Python cares about capitals.',
        hint: 'from, the book, import, the card.'
      }
    ]
  });
})();
