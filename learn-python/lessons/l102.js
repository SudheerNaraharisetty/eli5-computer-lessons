/* Lesson 102: Review: advanced (module 9). Quiz only, no video, no exercise.
   Reuses the stories, names and numbers of lessons 96 to 101.
   Every Run box and fix check was checked with Python 3.14.4 (Homebrew) and in this page
   (Pyodide, Python 3.14) on 2026-11-23. Real threads and processes do not run in this page,
   so the race questions use lesson 99's step-by-step simulation with generators.
   No answer depends on a time measurement except "about 15 or 20 kitchen minutes" with asyncio.sleep,
   which behaves the same here and in a terminal (lesson 100). */
(function () {
  const { P, code, run, svg, box, T } = PR;

  /* =====================================================================
     l102  Review: advanced
     ===================================================================== */

  // One card per lesson, the same small picture as lesson 95. The cards sit in a grid
  // that is 3 or 4 wide on a desktop and 2 wide on a phone, so the text stays readable at every width.
  const MONO = 'font-variant-ligatures:none';
  const card = (n, title, mono, plain, tint) =>
    `<div style="min-width:0">` + svg(172, 118, `Lesson ${n}, ${title}: ${mono}. ${plain}.`,
      `<rect x="30" y="0" width="104" height="20" rx="5" fill="${P.ink}"/>` +
      T(82, 14.5, 'Lesson ' + n, { s: 12, f: P.white }) +
      box(2, 17, 164, 94, P.white, 10) +
      `<rect x="9" y="25" width="150" height="78" rx="6" fill="${tint}" stroke="${P.ink}" stroke-width="1.5"/>` +
      `<line x1="9" y1="52" x2="159" y2="52" stroke="${P.danger}" stroke-width="1.4"/>` +
      T(84, 44, title, { s: title.length > 17 ? 12 : title.length > 14 ? 13 : 14 }) +
      T(84, 73, mono, { s: mono.length > 17 ? 11.5 : 12.5, m: true, w: 700 }).replace('<text ', `<text style="${MONO}" `) +
      T(84, 94, plain, { s: 12, w: 700, f: P.ink2 })) + `</div>`;

  const cards = [
    [96, 'How Python runs code', 'BINARY_OP (+)', 'read all, then run', P.tint],
    [97, 'Mutability', 'ben = ana', 'two labels, one jar', P.tint],
    [101, 'The data model', 'a + b: __add__', 'syntax calls dunders', P.tint],
    [98, 'Profiling', 'item in set', 'measure, then fix', P.warnT],
    [99, 'Concurrency', 'with lock:', 'threads wait together', P.warnT],
    [100, 'async and await', 'await gather(...)', 'one cook, many pots', P.warnT]
  ];
  const youAreHere = `<div style="min-width:0">` + svg(172, 118, 'Lesson 102, this review: 16 questions. You are here.',
    `<rect x="30" y="0" width="104" height="20" rx="5" fill="${P.ink}"/>` +
    T(82, 14.5, 'Lesson 102', { s: 12, f: P.white }) +
    box(2, 17, 164, 94, P.sand, 10) +
    T(84, 50, 'Review', { s: 16 }) +
    T(84, 72, '16 questions', { s: 12.5, w: 700, f: P.ink2 }) +
    T(84, 94, 'you are here', { s: 12.5, w: 700, f: P.accent })) + `</div>`;
  const chip = (fill, label) => `<span style="display:inline-block;background:${fill};color:${P.ink};border:2px solid ${P.ink};border-radius:999px;padding:2px 10px;margin:3px 4px 3px 0;font-size:13px;font-weight:800">${label}</span>`;
  const recapPic = `<div style="width:100%;min-width:0">` +
    `<div style="font-weight:800;font-size:16px;margin:0 0 4px;color:${P.ink}">Module 9: under the hood of the kitchen</div>` +
    `<div style="margin:0 0 10px">${chip(P.tint, 'What does Python really do?')}${chip(P.warnT, 'How do I make it faster?')}</div>` +
    `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,138px),1fr));gap:12px 10px">` +
    cards.map(c => card(...c)).join('') + youAreHere + `</div></div>`;

  // How to play: two kinds of question. Python runs here, a few things only run on your computer.
  const half = (x, head, line1, line2, fill, items) =>
    box(x, 8, 166, 196, fill, 12) +
    T(x + 83, 36, head, { s: 15 }) +
    T(x + 83, 56, line1, { s: 12, w: 700, f: P.ink2 }) + T(x + 83, 72, line2, { s: 12, w: 700, f: P.ink2 }) +
    items.map((t, i) => `<rect x="${x + 14}" y="${86 + i * 22}" width="138" height="18" rx="5" fill="${P.white}" stroke="${P.ink}" stroke-width="1.2"/>` +
      T(x + 83, 99 + i * 22, t, { s: 11.5, m: true, w: 700 }).replace('<text ', `<text style="${MONO}" `)).join('');
  const playPic = `<div style="width:100%;min-width:0">` +
    svg(360, 212, 'Two kinds of question. Left, Python runs here: is and copies, in on a list, the two-cook simulation, asyncio.gather and dunder methods. Press Run. Right, only on your computer: the profiler, real threads and processes, time.sleep inside async code, and __pycache__. Read the lesson\'s real output.',
      half(8, 'Python runs here', 'predict, then', 'press Run', P.tint, ['ben is ana', 'copy.deepcopy', 'item in shelf', 'asyncio.gather', '__add__']) +
      half(186, 'Your computer', 'remember the real', 'terminal output', P.warnT, ['cProfile', 'real threads', 'processes', 'time.sleep + async', '__pycache__'])) +
    run(['# Warm up: say every line out loud, then press Run', 'ana = ["oats", "rice", "pasta"]', 'ben = ana', 'ben.append("protein powder")', 'print("Ana:", ana)', 'print(ben is ana)', '', 'print(3 + 4, (3).__add__(4))', 'print(len("oats"), "oats".__len__())'], { title: 'warm_up.py' }) +
    `</div>`;

  // Lesson 101's Meal, and lesson 99's two cooks.
  const MEAL = ['from dataclasses import dataclass', '', '', '@dataclass', 'class Meal:', '    kcal: int', '    protein: int'];
  const UNLUCKY = [
    'board = {"served": 5}',
    '',
    '',
    'def cook(name):',
    '    seen = board["served"]',
    '    print(f"{name} reads {seen}")',
    '    yield  # pause here: the other cook may move now',
    '    board["served"] = seen + 1',
    '    print(f"{name} writes {seen + 1}")',
    '',
    '',
    'cooks = {1: cook("cook 1"), 2: cook("cook 2")}',
    'turns = [1, 2, 1, 2]  # who moves next? You never choose this.',
    'for turn in turns:',
    '    next(cooks[turn], None)',
    '',
    'print("whiteboard:", board["served"], "| 2 more plates, so it should be 7")'
  ];

  COURSE.add({
    id: 'l102', minutes: 25,
    summary: 'Six lessons on one wall: how Python runs code, mutability and references, performance and profiling, concurrency, async and await, and the data model. Then <b>16 mixed questions</b>, easy to hard, with <b>4 real bugs</b> to fix. Most questions have a <b>Run</b> button: labels and copies, <code>in</code> on a list, the two cooks and the lock, <code>asyncio.gather</code> and dunder methods all run in this page. Real threads, processes and the profiler run only on your computer, so those questions use what the lessons showed in the terminal.',
    parts: [
      {
        label: 'Recap', pic: recapPic,
        h: 'One wall, six looks under the hood.',
        text: [
          'Module 9 did not give Kitchen Coach a new feature. It opened the kitchen walls, so you can see <b>what Python really does</b> with your lines, and <b>how to make it faster</b> when it has to be. Each card is one lesson, with the <b>one line</b> to remember and the <b>one idea</b> behind it.',
          '<b>What does Python really do?</b> (lavender). Python <b>reads the whole file</b>, parses it into a tree, compiles it to <b>bytecode</b>, and only then runs the steps one by one. So a <code>SyntaxError</code> stops a file before line 1 runs, and a <code>NameError</code> stops it only when that line is reached (lesson 96). A name is a <b>label</b> on an object: <code>ben = ana</code> ties a second label to the <b>same</b> list, <code>.copy()</code> is shallow, <code>copy.deepcopy()</code> copies every level, and a function gets a label on your list, not a copy (lesson 97). And every piece of syntax calls a <b>dunder method</b>: <code>a + b</code> asks <code>a.__add__(b)</code>, <code>len</code> asks <code>__len__</code>, <code>in</code> asks <code>__contains__</code>, and <code>NotImplemented</code> means "ask the other side" (lesson 101).',
          '<b>How do I make it faster?</b> (orange). First <b>measure</b>: a profiler times every function, and <code>cumtime</code> leads you to the slow one. In Kitchen Coach it was <code>item in pantry</code> on a list of 40,000, which walks the shelf. One line, <code>set(...)</code>, fixed it (lesson 98). For <b>waiting</b> work, threads let several cooks wait together. For <b>heavy</b> work, the GIL lets one thread run Python at a time, so use processes or the free-threaded build. Two cooks who read, add and write one whiteboard can lose a plate, so guard it with <code>with lock:</code> (lesson 99). <code>async</code> is one cook with many pots: <code>await asyncio.gather(...)</code> takes as long as the longest dish, and every wait needs an <code>await</code> (lesson 100).'
        ],
        tip: 'The two halves meet. Lesson 99\'s lost plate happens because <code>served += 1</code> is several bytecode steps (lesson 96). Lesson 98\'s slow line is slow because of what <code>in</code> asks the list to do (lesson 101). Under the hood, it is all the same kitchen.'
      },
      {
        label: 'How to play', pic: playPic,
        h: 'Run what runs here. Remember what runs at home.',
        text: [
          'Python runs in this page, so most questions have a <b>Run</b> button. As in lessons 87 and 95, <b>say the output out loud first</b>, then pick, then press Run to check. Changing the code and running it again is allowed, and it is a good way to test a guess.',
          'Three things do not work in a browser the way they do on your computer. The page cannot start <b>real threads or processes</b>, so the race questions use lesson 99\'s two cooks, played step by step with <code>yield</code>. The <b>profiler</b> and <code>timeit</code> times change on every run, so no answer here is a number of milliseconds: they ask for <b>counts</b> and <b>results</b> instead. And <code>time.sleep()</code> inside async code does not block the page the way it blocks a real terminal (lesson 100, The pain), so async questions here use <code>await asyncio.sleep()</code> only.',
          'Try the warm-up. Ben gets Ana\'s list, not a copy, so the protein powder lands on hers. Then <code>+</code> and <code>len</code> are asked by hand. Now change line 3 to <code>ben = ana.copy()</code> and run it again. Ana keeps three items, and <code>ben is ana</code> says <code>False</code>.',
          'The <b>fix</b> questions are real Kitchen Coach code with a bug. Change it, then press <b>Run and check</b>. The page often tries your code with other values too, so a fix that only bends the one example will not pass.'
        ],
        warn: 'Several bugs in this module give no error at all: a list that changes by itself, a plate that goes missing, a breakfast that grows. Ask the lesson 97 question first: are two labels on one jar? <code>a is b</code> tells you.'
      }
    ],
    quiz: [
      {
        type: 'type', q: 'What does this print? Type it exactly, then press Run on the code to check.',
        pic: run(['ana = ["oats", "rice"]', 'ben = ana', 'ben.append("tofu")', 'print(len(ana), ben is ana)'], { title: 'shopping.py' }),
        prompt: 'output >',
        answers: ['3 True'],
        why: '<code>ben = ana</code> copies nothing. It ties a second label to the same list, so the tofu lands on Ana\'s list too: 3 items. <code>is</code> asks "the same object?", and it is (lesson 97).',
        hint: 'Lesson 97: how many lists does this program make?'
      },
      {
        type: 'match', q: 'Every lesson in this module gave you one tool. Match each one to its job.',
        pairs: [
          ['dis.dis(add_shake)', 'show the bytecode steps the line cook follows'],
          ['copy.deepcopy(this_week)', 'a new outer list and new day lists inside it'],
          ['python3 -m cProfile -s cumulative', 'a stopwatch on every function, slowest first'],
          ['threading.Lock()', 'one pen for the shared whiteboard'],
          ['await asyncio.gather(...)', 'put every pot on the stove at once'],
          ['def __radd__(self, other):', 'what sum() asks the meal after 0 + meal fails']
        ],
        why: '<code>dis</code> shows bytecode (lesson 96). <code>deepcopy</code> copies every level (lesson 97). cProfile times every function (lesson 98). A lock lets one cook at a time update the board (lesson 99). <code>gather</code> runs coroutines together (lesson 100). <code>__radd__</code> is the right-hand socket that <code>sum()</code> needs, because it starts with 0 (lesson 101).',
        hint: 'Start with the ones you are surest of. The r in __radd__ is for right.'
      },
      {
        type: 'pick', q: 'Lesson 99\'s three orders, cooked the lesson 100 way. Which dish is ready <b>first</b>, and what list does <code>gather</code> hand back?',
        pic: run(['import asyncio', 'import time', '', 'MINUTE = 0.05   # 1 kitchen minute = 0.05 real seconds', '', 'async def cook(dish, minutes):', '    print(f"{dish} on")', '    await asyncio.sleep(minutes * MINUTE)', '    print(f"{dish} ready")', '    return dish', '', 'async def main():', '    start = time.perf_counter()', '    dishes = await asyncio.gather(cook("pasta", 12), cook("chili", 20), cook("pudding", 8))', '    print(dishes)', '    minutes = (time.perf_counter() - start) / MINUTE', '    print(f"dinner after {minutes:.0f} minutes")', '', 'asyncio.run(main())'], { title: 'dinner.py' }),
        options: [
          "pudding is ready first, and the list is ['pasta', 'chili', 'pudding']",
          "pasta is ready first, and the list is ['pasta', 'chili', 'pudding']",
          "pudding is ready first, and the list is ['pudding', 'pasta', 'chili']",
          "chili is ready first, and the list is ['chili', 'pasta', 'pudding']"
        ],
        answer: 0,
        why: 'All three go on the stove together, so the shortest pot finishes first: pudding (8), then pasta (12), then chili (20). But <code>gather</code> hands back the results <b>in the order you passed them</b>, whatever finished first. Dinner takes about 20 minutes, the longest dish, not 40 (lesson 100).',
        hint: 'Lesson 100: the pots simmer together. Which finishes first? And in which order does gather give the results back?',
        hints: { 1: 'All three start together. Is the pasta the shortest pot?', 2: 'Finishing order and result order are different. gather keeps the order you passed in.', 3: 'Chili takes 20 minutes, the longest of the three.' }
      },
      {
        type: 'pick', q: '<code>walk_shelf</code> does what <code>in</code> does on a list, and counts the looks. What does the first line print?',
        pic: run(['def walk_shelf(item, shelf):', '    looks = 0', '    for thing in shelf:', '        looks += 1', '        if thing == item:', '            return looks', '    return looks', '', '', 'shelf = [f"item-{n}" for n in range(10_000)]', '', 'print(walk_shelf("item-5000", shelf), walk_shelf("item-12345", shelf))', 'print("item-5000" in shelf, "item-12345" in shelf)'], { title: 'shelf.py' }),
        options: ['5001 10000', '5000 10000', '5001 0', '1 1'],
        answer: 0,
        why: 'The shelf starts at <code>item-0</code>, so <code>item-5000</code> is the 5,001st look. <code>item-12345</code> is not there, and Python only knows that after looking at <b>all 10,000</b>. A set would go straight to one drawer: 1 look either way (lesson 98).',
        hint: 'Lesson 98, The pain: where does the shelf start? And when can Python say "not here"?',
        hints: { 1: 'The first item is item-0. Count it too.', 2: 'To say "not here", Python must look at every item first.', 3: 'One look is what a set does. This is a list.' }
      },
      {
        type: 'bucket', q: 'This <code>Pantry</code> has no dunder methods of its own, only <code>__init__</code>. Which lines work, and which stop with a <code>TypeError</code>? Change the last line and press Run to test.',
        pic: run(['class Pantry:', '    def __init__(self, grams):', '        self.grams = grams', '', '', 'pantry = Pantry({"oats": 400, "rice": 900})', 'print(len(pantry))'], { title: 'pantry.py' }),
        buckets: ['Works', 'TypeError'],
        items: [
          ['if pantry:', 0],
          ['print(pantry)', 0],
          ['pantry == pantry', 0],
          ['pantry.grams["oats"]', 0],
          ['len(pantry)', 1],
          ['"oats" in pantry', 1],
          ['pantry["oats"]', 1],
          ['for item in pantry:', 1],
          ['pantry + pantry', 1]
        ],
        why: 'Every class gets a few sockets for free: <code>__repr__</code> (an ugly <code>&lt;__main__.Pantry object at ...&gt;</code>), <code>__eq__</code> (same object?) and truth: with no <code>__bool__</code> and no <code>__len__</code>, an object is always true. <code>.grams</code> is a real dict, so <code>["oats"]</code> works on it. But <code>len</code>, <code>in</code>, <code>[]</code>, <code>for</code> and <code>+</code> find no socket on the Pantry itself (lesson 101).',
        hint: 'Lesson 101, The pain: which plugs found no socket? And one surprise did not fail at all.'
      },
      {
        type: 'fill', q: 'Finish the smallest async program that cooks two dishes together and prints <code>[\'rice\', \'eggs\']</code>.',
        text: 'import asyncio\n\n___ def cook(dish, minutes):\n    ___ asyncio.sleep(minutes * 0.01)\n    return dish\n\nasync def main():\n    dishes = await asyncio.___(cook("rice", 15), cook("eggs", 10))\n    print(dishes)\n\nasyncio.___(main())',
        options: ['async', 'await', 'gather', 'run', 'yield', 'thread'],
        answer: ['async', 'await', 'gather', 'run'],
        why: '<code>async def</code> makes a recipe that can pause. <code>await asyncio.sleep(...)</code> is the pot simmering while the cook is free. <code>asyncio.gather(...)</code> starts both and hands back both results in order. <code>asyncio.run(main())</code> starts the event loop, once, at the bottom (lesson 100).',
        hint: 'Lesson 100, The code: one word makes a coroutine function, one word waits, one runs them together, one starts the loop.'
      },
      {
        type: 'pick', q: 'Chloe\'s plan is copied for next week with <code>list(...)</code>. What does this print?',
        pic: run(['this_week = [["oats", "banana"], ["pasta", "tuna"]]', 'next_week = list(this_week)', 'next_week[1].append("salad")', 'next_week.append(["chili"])', 'print(len(this_week), this_week[1])'], { title: 'meal_plan.py' }),
        options: ["2 ['pasta', 'tuna', 'salad']", "2 ['pasta', 'tuna']", "3 ['pasta', 'tuna', 'salad']", "3 ['pasta', 'tuna']"],
        answer: 0,
        why: '<code>list(this_week)</code> is a <b>shallow</b> copy: a new outer list holding labels to the <b>same</b> day lists. So the salad goes into the one Tuesday list both weeks share. Adding a whole new day only changes the new outer list, so this week still has 2 days. <code>copy.deepcopy()</code> would keep this week untouched (lesson 97).',
        hint: 'Lesson 97, The pain: what is new in a shallow copy, and what is still shared?',
        hints: { 1: 'next_week[1] and this_week[1] are the same list. Is that new or shared?', 2: 'The outer lists are two different lists. Which one got the chili day?', 3: 'Two mistakes here. The outer list is new, and the day lists are shared.' }
      },
      {
        type: 'order', q: 'You type <code>python3 coach.py</code>, and line 12 is <code>print(breakfast + lunch)</code>, with lesson 101\'s Meal. Put what happens in order.',
        items: [
          'Read the whole file as text',
          'Parse the words into a tree',
          'Compile the tree into bytecode',
          'The line cook reaches the step BINARY_OP (+)',
          'Python asks breakfast.__add__(lunch)',
          '__add__ returns a new Meal, and print shows Meal(kcal=1150, protein=53)'
        ],
        why: 'Lesson 96: read, parse and compile all happen before any line runs. Then the line cook runs the steps, and <code>BINARY_OP (+)</code> asks the left value how it adds. Lesson 101: that question is <code>breakfast.__add__(lunch)</code>, and it returns a new Meal: 450 + 700 = 1150 kcal and 15 + 38 = 53 g protein.',
        hint: 'The cook can only run steps that already exist. And the + step is where the data model comes in.'
      },
      {
        type: 'pick', q: 'Lesson 99\'s two cooks, played step by step. With <code>turns = [1, 2, 1, 2]</code> a plate goes missing. Which of these turns <b>also</b> end at 6 instead of 7? Change line 13 and press Run to test.',
        pic: run(UNLUCKY, { title: 'unlucky.py' }),
        options: ['[1, 2, 1, 2]', '[1, 1, 2, 2]', '[2, 1, 1, 2]', '[2, 2, 1, 1]', '[1, 2, 2, 1]'],
        answer: [0, 2, 4],
        why: 'A plate is lost whenever <b>both</b> cooks read before <b>either</b> one writes. Then both read 5 and both write 6. That happens when the first two turns belong to different cooks: <code>[1, 2, ...]</code> or <code>[2, 1, ...]</code>. When one cook reads and writes before the other starts, the second reads 6 and writes 7. Real threads choose the turns for you, which is why a <code>Lock</code> is needed (lesson 99).',
        hint: 'Each cook reads on its first turn and writes on its second. When does a cook read a number that is already out of date?'
      },
      {
        type: 'fix', q: 'Back to lesson 46. Ana gets a banana, then Ben gets a protein bar, and Ana\'s list has the protein bar too. Fix <code>add_snack</code> so it prints <code>Ana: [\'banana\']</code> and <code>Ben: [\'protein bar\']</code>.',
        code: ['def add_snack(snack, plan=[]):', '    plan.append(snack)', '    return plan', '', '', 'ana = add_snack("banana")', 'ben = add_snack("protein bar")', 'print("Ana:", ana)', 'print("Ben:", ben)', 'print(ana is ben)'],
        title: 'snacks.py',
        check: [
          'f = globals().get("add_snack")',
          'lines = out.strip().splitlines()',
          'if not callable(f):',
          '    msg = "Keep the function  def add_snack(snack, plan=...):"',
          'elif lines[:2] != ["Ana: [\'banana\']", "Ben: [\'protein bar\']"]:',
          '    msg = "Ana and Ben still share one list. The default [] is made once, when def runs. Use plan=None, and make a new [] inside the function."',
          'else:',
          '    a = f("oats")',
          '    b = f("rice")',
          '    mine = ["tofu"]',
          '    if a is b or a != ["oats"] or b != ["rice"]:',
          '        msg = "Call it twice with no plan: each call should get its own new list."',
          '    elif f("lentils", mine) != ["tofu", "lentils"]:',
          '        msg = "When a plan is given, the snack should go on the end of that plan."',
          '    else:',
          '        ok = True'
        ].join('\n'),
        why: 'Lesson 97 explains lesson 46\'s trap. <code>plan=[]</code> runs <b>once</b>, when <code>def</code> runs, so every call without a plan gets a label on that one list, and <code>ana is ben</code> says <code>True</code>. Write <code>plan=None</code>, then <code>if plan is None:</code> and <code>plan = []</code> inside: a new list on every call.',
        hint: 'Lesson 46: how many times does the default [] get made? Use None, and make the list inside.'
      },
      {
        type: 'pick', q: 'This <code>Meal</code> is written by hand, with an <code>__eq__</code> and no dataclass. What does it print?',
        pic: run(['class Meal:', '    def __init__(self, kcal, protein):', '        self.kcal = kcal', '        self.protein = protein', '', '    def __eq__(self, other):', '        return self.kcal == other.kcal and self.protein == other.protein', '', '', 'breakfast = Meal(450, 15)', 'print(breakfast == Meal(450, 15))', 'eaten = {breakfast}', 'print(len(eaten))'], { title: 'eaten.py' }),
        options: [
          "True, then TypeError: cannot use 'Meal' as a set element (unhashable type: 'Meal')",
          'True, then 1',
          'False, then 1',
          'True, then 2'
        ],
        answer: 0,
        why: 'A set needs a fingerprint, <code>__hash__</code>, and two equal things must have the same one. As soon as a class writes its own <code>__eq__</code>, Python removes <code>__hash__</code>, by hand or with <code>@dataclass</code>. Add <code>def __hash__(self): return hash((self.kcal, self.protein))</code>, but only if the fields never change, or use <code>@dataclass(frozen=True)</code> (lesson 101, The catch).',
        hint: 'Lesson 101, The catch: what does writing __eq__ take away?',
        hints: { 1: 'One meal in a set needs a hash. Does this class still have one?', 2: 'The __eq__ compares kcal and protein. Are they equal?', 3: 'Before you count, can a Meal go into a set at all?' }
      },
      {
        type: 'pick', q: 'The profiler points at <code>check_pantry</code>: 2.02 of 2.024 seconds. Which <b>one</b> change makes it fast <b>and</b> keeps exactly the same missing list, in the same order?',
        pic: code(['def check_pantry(orders, pantry):', '    missing = []', '    for item in orders:', '        if item not in pantry:', '            missing.append(item)', '    return missing', '', '', 'orders = read_orders()     # 20,000 orders, in order', 'pantry = load_pantry()     # a list of 40,000 items', 'missing = check_pantry(orders, pantry)'], { title: 'coach.py' }),
        options: [
          'pantry = set(load_pantry()), once, before the check',
          'if item not in set(pantry): inside the loop',
          'orders = set(read_orders()), so the orders are a set',
          'pantry = sorted(load_pantry()), so the list is in order'
        ],
        answer: 0,
        why: 'The slow step is <code>in</code> on the <b>pantry</b>, a list that is walked for every order. Make the pantry a set <b>once</b>, and each check goes straight to one drawer. Building <code>set(pantry)</code> inside the loop builds 20,000 sets. A set of orders loses their order and still walks the pantry list. A sorted list is still a list, and <code>in</code> still walks it (lesson 98).',
        hint: 'Lesson 98, The fix: which container does in walk? And where should the set be made?',
        hints: { 1: 'Lesson 98\'s tip: set(...) inside the loop builds a whole new set for every order.', 2: 'The orders are not what in searches. And a set has no order.', 3: 'A sorted list is still a list. in still walks it from the left.' }
      },
      {
        type: 'pick', q: 'This file has <b>two</b> mistakes, on line 2 and line 4. Say what happens out loud, then press Run.',
        pic: run(['print("Coach is starting")', 'print("Ana:", ana_kcal, "kcal")', 'print("Ben: bean chili, 820 kcal")', 'if 650 + 820 > 1400', '    print("Big dinner tonight")'], { title: 'coach.py' }),
        options: [
          "Nothing prints. SyntaxError: expected ':' on line 4",
          "Coach is starting, then NameError: name 'ana_kcal' is not defined",
          'Coach is starting, then the NameError, then the SyntaxError',
          'Three lines print, then the SyntaxError on line 4'
        ],
        answer: 0,
        why: 'Python reads and compiles the <b>whole file</b> before line 1 runs. The missing colon on line 4 is a grammar mistake, so the file stops there: no line runs. The <code>ana_kcal</code> on line 2 is good grammar. Its NameError would only appear when the cook reaches line 2, and the cook never starts. Fix the colon, and you will meet the NameError next (lesson 96).',
        hint: 'Lesson 96, The pain: which mistake is found while reading, before anything runs?',
        hints: { 1: 'The NameError is real, but it needs the cook to reach line 2. Does the cook ever start?', 2: 'One error stops a program. And which one is found first, while reading?', 3: 'Reading happens before any line runs. Does line 1 get a chance?' }
      },
      {
        type: 'fix', q: 'Someone added a lock to lesson 99\'s whiteboard, and it still ends at <b>6</b>. Move the lock so it guards the right lines, and the board ends at <b>7</b>. Do not change <code>turns</code>.',
        code: [
          'import threading',
          '',
          'board = {"served": 5}',
          'lock = threading.Lock()',
          '',
          '',
          'def cook(name):',
          '    seen = board["served"]',
          '    print(f"{name} reads {seen}")',
          '    yield  # pause here: the other cook may move now',
          '    while lock.locked():',
          '        print(f"{name} waits")',
          '        yield',
          '    with lock:',
          '        board["served"] = seen + 1',
          '        print(f"{name} writes {seen + 1}")',
          '',
          '',
          'cooks = {1: cook("cook 1"), 2: cook("cook 2")}',
          'turns = [1, 2, 1, 2, 1, 2]',
          'for turn in turns:',
          '    next(cooks[turn], None)',
          '',
          'print("whiteboard:", board["served"], "| 2 more plates, so it should be 7")'
        ],
        title: 'board.py',
        check: [
          'if globals().get("turns") != [1, 2, 1, 2, 1, 2]:',
          '    msg = "Keep turns = [1, 2, 1, 2, 1, 2]. The cooks do not choose their turns, the lock has to do the work."',
          'elif board.get("served") == 6:',
          '    msg = "Still 6. Both cooks read 5 before either one holds the lock. The read must be inside  with lock:  too, with the yield and the write."',
          'elif board.get("served") != 7:',
          '    msg = "The board should end at 7: two more plates on top of 5. It is " + str(board.get("served")) + "."',
          'elif "waits" not in out:',
          '    msg = "It says 7, but cook 2 never waited, so nobody pauses between the read and the write any more. Keep the yield, and put the wait loop and  with lock:  above the read."',
          'elif lock.locked():',
          '    msg = "The lock is still held at the end. Use  with lock:  so it is always given back."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: 'The lock guarded only the write. By then both cooks had already read 5, so both wrote 6. Lesson 99\'s rule is to put the whole <b>read, add, write</b> inside <code>with lock:</code>. Move the <code>while lock.locked():</code> loop and <code>with lock:</code> to the top of <code>cook</code>, and indent the read, the <code>yield</code> and the write under it. Now cook 2 waits, reads 6 and writes 7.',
        hint: 'Lesson 99, The fix: which three things must happen while one cook holds the pen?'
      },
      {
        type: 'fix', q: 'Dinner prints a <code>coroutine object</code> instead of the rice, and Python warns <code>coroutine \'cook\' was never awaited</code>. Fix it so it prints <code>rice ready eggs ready veg ready</code> and dinner still takes about <b>15</b> kitchen minutes, not 25.',
        code: ['import asyncio', 'import time', '', 'MINUTE = 0.05', '', 'async def cook(dish, minutes):', '    await asyncio.sleep(minutes * MINUTE)', '    return f"{dish} ready"', '', 'async def main():', '    start = time.perf_counter()', '    rice = cook("rice", 15)', '    eggs, veg = await asyncio.gather(cook("eggs", 10), cook("veg", 5))', '    print(rice, eggs, veg)', '    minutes = (time.perf_counter() - start) / MINUTE', '    print(f"dinner after {minutes:.0f} minutes")', '', 'asyncio.run(main())'],
        title: 'dinner.py',
        check: [
          'import re',
          'lines = out.splitlines()',
          'm = re.search(r"dinner after (\\d+) minutes", out)',
          'mins = int(m.group(1)) if m else None',
          'if "coroutine object" in out:',
          '    msg = "rice is still a coroutine object, a recipe that never ran. It needs an await."',
          'elif "rice ready eggs ready veg ready" not in lines:',
          '    msg = "It should print: rice ready eggs ready veg ready"',
          'elif mins is None:',
          '    msg = "Keep the last print, so the check can see how long dinner took."',
          'elif mins > 20:',
          '    msg = "The rice is cooked now, but it cooks alone before the others start: " + str(mins) + " minutes. Put the rice in the same gather as the eggs and the veg."',
          'elif mins < 14:',
          '    msg = "Only " + str(mins) + " minutes? Keep the cooking times 15, 10 and 5."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: 'Calling <code>cook("rice", 15)</code> without <code>await</code> only makes a coroutine, so the rice never cooks. <code>rice = await cook("rice", 15)</code> cooks it, but alone: 15 minutes, then the others: 25. Put all three in one gather, <code>rice, eggs, veg = await asyncio.gather(cook("rice", 15), cook("eggs", 10), cook("veg", 5))</code>, and dinner takes as long as the rice (lesson 100).',
        hint: 'Lesson 100, The catch: what does calling an async def function give you? And which call puts every pot on the stove at once?'
      },
      {
        type: 'fix', q: 'Hardest one. Kitchen Coach adds Ana\'s meals, and her <b>breakfast</b> grows to 1750 kcal. Fix <code>__add__</code> so it prints the three lines below, and <code>breakfast</code> stays 450 kcal.<br><code>morning: Meal(kcal=750, protein=23)</code><br><code>day: Meal(kcal=1450, protein=61)</code><br><code>breakfast: Meal(kcal=450, protein=15)</code>',
        code: [...MEAL, '', '    def __add__(self, other):', '        if not isinstance(other, Meal):', '            return NotImplemented', '        self.kcal += other.kcal', '        self.protein += other.protein', '        return self', '', '', 'breakfast = Meal(450, 15)     # oats, banana and milk', 'lunch = Meal(700, 38)         # pasta with tuna', 'snack = Meal(300, 8)          # toast with peanut butter', '', 'morning = breakfast + snack', 'day = breakfast + lunch + snack', 'print("morning:", morning)', 'print("day:", day)', 'print("breakfast:", breakfast)'],
        title: 'meals.py',
        check: [
          'M = globals().get("Meal")',
          'lines = out.strip().splitlines()',
          'want = ["morning: Meal(kcal=750, protein=23)", "day: Meal(kcal=1450, protein=61)", "breakfast: Meal(kcal=450, protein=15)"]',
          'if M is None:',
          '    msg = "Keep the class Meal."',
          'elif lines != want:',
          '    msg = "It printed: " + " / ".join(lines) + ". Breakfast should stay 450 kcal. Is morning a new Meal, or a second label on breakfast?"',
          'else:',
          '    a, b = M(1, 2), M(3, 4)',
          '    c = a + b',
          '    if c is a or c is b or (a.kcal, a.protein) != (1, 2) or (b.kcal, b.protein) != (3, 4):',
          '        msg = "+ should leave both sides alone and return a new Meal, like 3 + 4 does not change the 3."',
          '    elif (c.kcal, c.protein) != (4, 6):',
          '        msg = "Meal(1, 2) + Meal(3, 4) should be Meal(kcal=4, protein=6)."',
          '    else:',
          '        try:',
          '            r = M.__add__(a, 5)',
          '        except Exception:',
          '            r = None',
          '        if r is not NotImplemented:',
          '            msg = "Meal + 5 should still get NotImplemented from __add__, so Python can ask the other side. Keep the isinstance check and  return NotImplemented."',
          '        else:',
          '            ok = True'
        ].join('\n'),
        why: 'This <code>__add__</code> changes <code>self</code> and returns it, so <code>morning</code> is a second label on <code>breakfast</code> (lesson 97), and the next sum keeps growing the same object: every line says 1750. Return a <b>new</b> Meal instead: <code>return Meal(self.kcal + other.kcal, self.protein + other.protein)</code>. Then 450 + 300 = 750, 450 + 700 + 300 = 1450, and breakfast stays 450. <code>+</code> should feel like adding (lesson 101).',
        hint: 'Lesson 101, The fix: does __add__ change self, or return something new? Ask morning is breakfast.'
      }
    ]
  });
})();
