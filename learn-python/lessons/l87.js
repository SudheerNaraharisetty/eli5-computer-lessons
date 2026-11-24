/* Lesson 87: Review: Pythonic Python (module 7). Quiz only, no video, no exercise.
   Output checked with Python 3.14 and 3.15.2 (Homebrew, macOS) on 2026-11-23,
   and every Run box and fix check in this page (Pyodide, Python 3.14). */
(function () {
  const { P, code, run, svg, box, T, arrow } = PR;

  /* =====================================================================
     l87  Review: Pythonic Python
     ===================================================================== */

  // One tool card per lesson. Each card is its own small picture, and the cards sit in a grid
  // that is 3 wide on a desktop and 2 wide on a phone, so the text stays readable at every width.
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
    [76, 'Comprehensions', '[g*2 for g in grams]', 'what, for each, which', P.tint],
    [77, 'enumerate and zip', 'zip(guests, meals)', 'number them, pair them', P.tint],
    [78, 'Unpacking', 'a, b = b, a', 'one jar per value', P.tint],
    [79, '*args and **kwargs', 'def plate(*dishes):', 'stars collect, spread', P.tint],
    [80, 'lambda', 'lambda d: d["kcal"]', 'a card with no name', P.tint],
    [81, 'sorted, map, filter', 'sorted(xs, key=f)', 'line up, keep, change', P.tint],
    [82, 'Iterators', 'next(waiter)', 'one plate, then gone', P.warnT],
    [83, 'Generators', 'yield pancake', 'cook only when asked', P.warnT],
    [84, 'Decorators', '@timed', 'wrap it, return result', P.okT],
    [85, 'Context managers', 'with oven_on(180):', 'cleanup, every time', P.okT],
    [86, 'Template strings', 't"<li>{note}</li>"', 'values kept apart', P.okT]
  ];
  const youAreHere = `<div style="min-width:0">` + svg(172, 118, 'Lesson 87, this review: 16 questions. You are here.',
    `<rect x="30" y="0" width="104" height="20" rx="5" fill="${P.ink}"/>` +
    T(82, 14.5, 'Lesson 87', { s: 12, f: P.white }) +
    box(2, 17, 164, 94, P.sand, 10) +
    T(84, 50, 'Review', { s: 16 }) +
    T(84, 72, '16 questions', { s: 12.5, w: 700, f: P.ink2 }) +
    T(84, 94, 'you are here', { s: 12.5, w: 700, f: P.accent })) + `</div>`;
  const chip = (fill, label) => `<span style="display:inline-block;background:${fill};color:${P.ink};border:2px solid ${P.ink};border-radius:999px;padding:2px 10px;margin:3px 4px 3px 0;font-size:13px;font-weight:800">${label}</span>`;
  const recapPic = `<div style="width:100%;min-width:0">` +
    `<div style="font-weight:800;font-size:16px;margin:0 0 4px;color:${P.ink}">Module 7: eleven tools for short, clear code</div>` +
    `<div style="margin:0 0 10px">${chip(P.tint, 'Short and clear')}${chip(P.warnT, 'One at a time')}${chip(P.okT, 'Wrap and protect')}</div>` +
    `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,138px),1fr));gap:12px 10px">` +
    cards.map(c => card(...c)).join('') + youAreHere + `</div></div>`;

  // How to play: predict, run, compare. And: no error does not mean right.
  const step = (y, n, head, line, fill) =>
    box(8, y, 340, 52, fill, 12) +
    `<circle cx="34" cy="${y + 26}" r="13" fill="${P.ink}"/>` + T(34, y + 31, String(n), { s: 13, f: P.white }) +
    T(58, y + 22, head, { s: 15, a: 'start' }) +
    T(58, y + 41, line, { s: 12.5, w: 700, a: 'start', f: P.ink2 });
  const playPic = `<div style="width:100%;min-width:0">` +
    svg(360, 270, 'Three steps: 1 predict the output before you run, 2 press Run, 3 compare. Below: no error, but None, 0 or an empty list? Ask three things: was a waiter used up already, did zip cut the lists short, or did a function forget to return?',
      step(6, 1, 'Predict', 'say every line out loud first', P.tint) +
      step(70, 2, 'Run', 'press Run and read every line', P.warnT) +
      step(134, 3, 'Compare', 'surprised? that is the lesson to reread', P.okT) +
      box(8, 206, 340, 54, P.dangerT, 12) +
      `<rect x="18" y="220" width="112" height="26" rx="7" fill="${P.danger}"/>` +
      T(74, 237.5, 'None, 0, []', { s: 13, f: P.white, m: true }) +
      T(140, 229, 'No error, wrong result?', { s: 13, a: 'start' }) +
      T(140, 248, 'Used up? Cut short? No return?', { s: 12, w: 700, a: 'start', f: P.ink })) +
    run(['# Warm up: say the output out loud, then press Run', 'guests = ["Ana", "Ben", "Chloe"]', 'meals = ["pasta", "bean chili", "pancakes"]', '', 'for seat, (guest, meal) in enumerate(zip(guests, meals), start=1):', '    print(seat, guest, meal)', '', 'two_words = [meal.upper() for meal in meals if " " in meal]', 'print(two_words)'], { title: 'warm_up.py' }) +
    run(['# This one stops. Read the last line of the error first.', 'def timed(func):', '    def wrapper(*args, **kwargs):', '        print("timer on")', '        result = func(*args, **kwargs)', '        print("timer off")', '        return result', '', '@timed', 'def bake(dish, minutes):', '    return f"{dish}, baked {minutes} min"', '', 'print(bake("banana bread", 50))'], { title: 'read_the_error.py' }) +
    `</div>`;

  // Tonight's four dishes, in serving order (the same numbers as lessons 80 and 81).
  const DISHES = [
    'dishes = [',
    '    {"name": "bean chili", "protein": 15, "kcal": 380},',
    '    {"name": "tofu stir-fry", "protein": 24, "kcal": 350},',
    '    {"name": "lentil soup", "protein": 18, "kcal": 320},',
    '    {"name": "pasta bake", "protein": 22, "kcal": 610},',
    ']'
  ];

  COURSE.add({
    id: 'l87', minutes: 25,
    summary: 'Eleven lessons on one wall: comprehensions, <code>enumerate</code> and <code>zip</code>, unpacking, <code>*args</code> and <code>**kwargs</code>, <code>lambda</code>, <code>sorted</code>, <code>map</code> and <code>filter</code>, iterators, generators, decorators, context managers and t-strings. Then <b>16 mixed questions</b>, easy to hard, with <b>7 real bugs</b> to fix. Most of them you can <b>run</b>, and many of the bugs give no error at all: just a wrong number, a missing guest or a <code>None</code>.',
    parts: [
      {
        label: 'Recap', pic: recapPic,
        h: 'One wall, eleven tools.',
        text: [
          'Module 7 did not teach Kitchen Coach to do new things. It taught you to say the same things <b>shorter and clearer</b>, the way Python programmers write them. Each card in the picture is one lesson, with the <b>one line of code</b> to remember and the <b>one idea</b> behind it.',
          '<b>Short and clear</b> (lavender). A comprehension builds a new list in one line, in three parts: <b>what</b>, <b>for each</b>, <b>which</b>. A choice of two values (<code>x if ok else y</code>) goes <b>before</b> the for, a filter goes after it. <code>enumerate(steps, start=1)</code> hands the loop a number and the item. <code>zip(guests, meals)</code> pairs two lists, and stops at the shortest one without a word, unless you write <code>strict=True</code>. Unpacking puts each value in its own jar: <code>a, b = b, a</code> swaps, and <code>first, *rest</code> collects the rest in a list. In a <code>def</code>, <code>*dishes</code> collects plain values into a tuple and <code>**notes</code> collects named ones into a dict. In a call, the same stars spread. A <code>lambda</code> is a one-expression card with no name, made for <code>key=</code>. <code>sorted</code> makes a new list, while <code>.sort()</code> changes the list itself and hands back <code>None</code>.',
          '<b>One at a time</b> (orange). A list is a pass full of plates. An iterator is the waiter: <code>next(waiter)</code> brings one plate, and after the last one the waiter is used up. <code>map</code>, <code>filter</code>, <code>zip</code>, <code>enumerate</code> and files are waiters, so a second pass gives <code>[]</code> or <code>0</code>, with no error. A function with <code>yield</code> is a generator: it cooks one value when asked, then pauses.',
          '<b>Wrap and protect</b> (green). A decorator takes a card and hands back a wrapped one. <code>@timed</code> above <code>def bake</code> means <code>bake = timed(bake)</code>. The wrapper must <code>return result</code>, and the decorator must <code>return wrapper</code>. <code>with oven_on(180):</code> runs the cleanup every time, even after an error, as long as it sits under <code>finally:</code>. And a t-string keeps your text and the values apart, so a function like <code>safe_html</code> can escape only what came from a guest.'
        ],
        tip: 'Earlier modules still apply. A function with no <code>return</code> hands back <code>None</code> (lesson 45). <code>.sort()</code> hands back <code>None</code> too (lesson 34). And an error you can expect is caught with <code>try</code> and <code>except</code> (lesson 53).'
      },
      {
        label: 'How to play', pic: playPic,
        h: 'Predict first. Then press Run.',
        text: [
          'Most questions show a small piece of Kitchen Coach you have not seen before. Before you answer, <b>say the output out loud</b>, line by line. Then pick your answer, and press <b>Run</b> to check it.',
          'Try it on <code>warm_up.py</code> above. <code>zip</code> makes the pairs, and <code>enumerate</code> numbers them. Then the comprehension keeps only the meals with a space in the name.',
          'The <b>fix</b> questions are real code that goes wrong. Change it, then press <b>Run and check</b>. The page runs your code, checks what it prints, and often tries your function with other values too. There is often more than one good fix, but the question says when it wants one tool, like <code>strict=True</code> or a generator.',
          'Bugs in this module come in two kinds. Some stop with an error: read the <b>last line</b> first. <code>\'NoneType\' object is not callable</code> means you called something that is <code>None</code>. Try it now on <code>read_the_error.py</code>: which <code>return</code> is missing? The other kind is worse: <b>no error at all</b>, just <code>None</code>, <code>0</code> or <code>[]</code>, or a guest who is quietly missing. Then ask the three questions in the red box.'
        ],
        warn: 'Running the code first and then picking the answer works, but it teaches you very little. The guess is where the learning happens.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'The plates went round the wrong way, so you pass each one a seat along. What does this print?',
        pic: run(['ana, ben, chloe = "pasta", "tofu bowl", "pancakes"', 'ana, ben, chloe = ben, chloe, ana', 'print(ana, "|", ben, "|", chloe)', '', 'first, *rest = [ana, ben, chloe]', 'print(rest)'], { title: 'seats.py' }),
        options: [
          "tofu bowl | pancakes | pasta, then ['pancakes', 'pasta']",
          "tofu bowl | pancakes | tofu bowl, then ['pancakes', 'tofu bowl']",
          "tofu bowl | pancakes | pasta, then ('pancakes', 'pasta')",
          "pasta | tofu bowl | pancakes, then ['tofu bowl', 'pancakes']"
        ],
        answer: 0,
        why: 'Python reads the whole right side first, with the <b>old</b> values: <code>("tofu bowl", "pancakes", "pasta")</code>. Only then does it unpack that into the three names, so nothing is lost. <code>first</code> takes <code>"tofu bowl"</code>, and the star collects the rest into a <b>list</b>, even when the right side is a tuple (lesson 78).',
        hint: 'Lesson 78: the right side is built first, from the old values. And what does a star name always hold?',
        hints: { 1: 'That is the two-line swap from lesson 78, where ana is overwritten too early. A one-line swap reads the whole right side first.', 2: 'A starred name always gets a list, with square brackets.', 3: 'Line 2 does change all three. Which value goes into ana?' }
      },
      {
        type: 'type', q: 'Kitchen Coach works out each friend\'s dinner: a quarter of their day. Predict the output. Type exactly what appears, then press Run on the code to check.',
        pic: run(['guests = ["Ana", "Ben", "Chloe"]', 'day_kcal = [2600, 2400, 2000]', '', 'dinner = {guest: kcal // 4 for guest, kcal in zip(guests, day_kcal)}', 'print(dinner["Ben"], len(dinner))'], { title: 'dinner.py' }),
        prompt: 'output >',
        answers: ['600 3'],
        accept: '^600 3$',
        why: '<code>zip</code> pairs each guest with their day: <code>("Ana", 2600)</code>, <code>("Ben", 2400)</code>, <code>("Chloe", 2000)</code> (lesson 77). The curly brackets and the <code>guest: ...</code> at the front build a <b>dict</b> (lesson 76). Ben gets 2400 // 4, which is <code>600</code>, and the dict has <code>3</code> keys.',
        hint: 'Lessons 76 and 77: which pair does zip hand over for Ben? And what is 2400 // 4?'
      },
      {
        type: 'bucket', q: 'Short is good. Too short is not. For each job in Kitchen Coach, which is the better tool?',
        buckets: ['a comprehension', 'a plain for loop'],
        items: [
          ['a new list: every protein amount doubled', 0],
          ['a dict: each guest and their dinner kcal', 0],
          ['a set: each dish ordered, one of each', 0],
          ['a list of only the gluten-free items', 0],
          ['print every step of the recipe', 1],
          ['stop at the first dish with gluten', 1],
          ['each order: weigh it, log it, update the stock', 1],
          ['every guest with every dish, minus their allergies', 1]
        ],
        why: 'A comprehension is for <b>building a new list, dict or set</b> that reads as one short sentence (lesson 76). Printing is not building, so <code>[print(s) for s in steps]</code> only makes a list of <code>None</code>. A comprehension has no <code>break</code>, no room for several steps per item, and two <code>for</code>s and an <code>if</code> in one line is hard to read. Those are plain loops.',
        hint: 'Lesson 76, The catch: use a comprehension when you want a new list, dict or set. Use a loop for printing, break, several steps, or a line that keeps growing.'
      },
      {
        type: 'fix', q: 'Chloe wants every dessert on her card, with <code>----</code> in place of the ones with gluten. Kitchen Coach stops with <code>SyntaxError: invalid syntax</code>. Fix the comprehension so it prints <code>[\'----\', \'rice pudding\', \'----\', \'fruit salad\']</code>.',
        code: ['# Chloe\'s dessert card: gluten-free ones by name, the rest as ----', 'desserts = [', '    ("brownie", False),', '    ("rice pudding", True),', '    ("banana bread", False),', '    ("fruit salad", True),', ']', '', 'menu = [name for name, gluten_free in desserts if gluten_free else "----"]', 'print(menu)'],
        title: 'dessert_card.py',
        check: [
          'want = "[\'----\', \'rice pudding\', \'----\', \'fruit salad\']"',
          'if out != want:',
          '    msg = "It printed: " + out.replace("\\n", " / ") + ". It should print: " + want',
          'elif not isinstance(globals().get("menu"), list):',
          '    msg = "Keep the result in a list called menu."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: 'Write <code>[name if gluten_free else "----" for name, gluten_free in desserts]</code>. An <code>if</code> <b>after</b> the for is a filter: it drops items, and it can never have an <code>else</code>. Chloe wants <b>every</b> dessert, each one with one of two values. That is a choice, and a choice goes in the <b>what</b> part, <b>before</b> the for (lesson 76).',
        hint: 'Lesson 76: a filter goes after the for and drops items. A choice of two values goes before the for.'
      },
      {
        type: 'match', q: 'Match each line to what it means in Kitchen Coach.',
        pairs: [
          ['[g * 2 for g in grams]', 'a new list, built in one line'],
          ['enumerate(steps, start=1)', 'a number and the item, every round'],
          ['def plate(*dishes):', 'any number of values, in one tuple'],
          ['lambda d: d["kcal"]', 'a card with one expression and no name'],
          ['yield pancake', 'hand out one value, then pause'],
          ['@timed above def bake', 'bake = timed(bake), right after the def'],
          ['with oven_on(180):', 'the cleanup runs, even after an error'],
          ['t"<li>{note}</li>"', 'a Template: your text and the values kept apart']
        ],
        why: 'A comprehension builds a new list (lesson 76). <code>enumerate</code> numbers the rounds (lesson 77). A star in a <code>def</code> collects plain values into a tuple (lesson 79). A lambda is a card on a sticky note (lesson 80). <code>yield</code> makes a generator that pauses after each value (lesson 83). The <code>@</code> line is a shortcut for wrapping (lesson 84). <code>with</code> calls the cleanup on the way out (lesson 85). And a t-string makes a Template, not text (lesson 86).',
        hint: 'Lessons 76 to 86. Start with the ones you are surest of. Which line has a t in front of the quote?'
      },
      {
        type: 'pick', q: 'Ben lifts weights and wants the dish with the most protein. Which line prints <code>tofu stir-fry</code>? Paste a line under the code and run it to check.',
        pic: run([...DISHES, '', 'def protein_of(dish):', '    return dish["protein"]', '', '# paste a line here'], { title: 'bens_pick.py' }),
        options: [
          'print(max(dishes, key=lambda d: d["protein"])["name"])',
          'print(max(dishes, key=d["protein"])["name"])',
          'print(max(dishes, key=protein_of())["name"])',
          'print(sorted(dishes, key=lambda d: d["protein"])[0]["name"])'
        ],
        answer: 0,
        why: '<code>key=</code> wants a <b>card</b> that Python can call on each dish. <code>lambda d: d["protein"]</code> is that card, so <code>max</code> weighs 15, 24, 18 and 22 and hands back the whole tofu stir-fry dict. <code>["name"]</code> then reads its name (lesson 80).',
        hint: 'Lesson 80: key wants the card itself, ready to be called on every dish.',
        hints: { 1: 'Without the word lambda, Python works out d["protein"] right away, before max starts. There is no d yet: NameError.', 2: 'The brackets call protein_of now, with no dish: TypeError. Hand over the card, do not cook it.', 3: 'sorted goes from smallest to biggest, so [0] is the dish with the least protein: bean chili.' }
      },
      {
        type: 'pick', q: 'Chloe orders pancakes with berries and wants 2 servings. What does this print?',
        pic: run(['def order(dish, *extras, servings=1, **notes):', '    print(dish, extras, servings, notes)', '', 'order("pancakes", "berries", 2, gluten_free=True)'], { title: 'chloes_order.py' }),
        options: [
          "pancakes ('berries', 2) 1 {'gluten_free': True}",
          "pancakes ('berries',) 2 {'gluten_free': True}",
          "pancakes ['berries', 2] 1 {'gluten_free': True}",
          "pancakes ('berries', 2) 1 ('gluten_free', True)"
        ],
        answer: 0,
        why: '<code>*extras</code> takes <b>every</b> plain value that is left, the 2 too, and keeps them in a tuple. So <code>servings</code> can only be filled by name, and keeps its default, 1. The named value nobody asked for, <code>gluten_free=True</code>, lands in the <code>notes</code> dict. No error: Chloe just gets 1 serving. Write <code>servings=2</code> and it works (lesson 79).',
        hint: 'Lesson 79: after the star, names only. Where does the plain value 2 go?',
        hints: { 1: 'A parameter after *extras is keyword-only. A plain 2 never reaches it.', 2: '*extras collects into a tuple, with round brackets.', 3: '**notes collects named values into a dict.' }
      },
      {
        type: 'fix', q: 'Dev texts: he is coming too. Kitchen Coach prints <code>3 cards printed</code>, and Dev sits down to an empty table. Change <code>place_cards</code> with <b>one keyword</b>, so that lists of different lengths stop with a <code>ValueError</code>. It should print <code>Stop: someone has no meal</code>. Leave the rest as it is.',
        code: ['def place_cards(guests, meals):', '    return [f"{guest}: {meal}" for guest, meal in zip(guests, meals)]', '', 'guests = ["Ana", "Ben", "Chloe", "Dev"]', 'meals = ["pasta", "bean chili", "pancakes"]', '', 'try:', '    cards = place_cards(guests, meals)', '    print(len(cards), "cards printed")', 'except ValueError:', '    print("Stop: someone has no meal")'],
        title: 'place_cards.py',
        check: [
          'pc = globals().get("place_cards")',
          'if out != "Stop: someone has no meal":',
          '    msg = "It printed: " + out.replace("\\n", " / ") + ". It should print: Stop: someone has no meal"',
          'else:',
          '    try:',
          '        good = pc(["Ana", "Ben"], ["pasta", "bean chili"])',
          '    except Exception as e:',
          '        good = None',
          '    caught = []',
          '    for g, m in ((["Ana"], ["pasta", "tofu bowl"]), (["Ana", "Ben"], ["pasta"])):',
          '        try:',
          '            pc(g, m)',
          '            caught.append(False)',
          '        except ValueError:',
          '            caught.append(True)',
          '    if good != ["Ana: pasta", "Ben: bean chili"]:',
          '        msg = "Two guests and two meals should still give [\'Ana: pasta\', \'Ben: bean chili\']."',
          '    elif not all(caught):',
          '        msg = "An extra meal with no guest should stop too. Let zip check the lengths: zip(guests, meals, strict=True)."',
          '    else:',
          '        ok = True'
        ].join('\n'),
        why: 'Write <code>zip(guests, meals, strict=True)</code>. Plain <code>zip</code> stops at the shortest list and says nothing, so Dev was quietly dropped. With <code>strict=True</code>, zip stops with <code>ValueError: zip() argument 2 is shorter than argument 1</code>, and the <code>except</code> from lesson 53 catches it. The cards are built in a comprehension, so the error comes before any card is printed (lesson 77).',
        hint: 'Lesson 77, The catch: which keyword makes zip check that the lists have the same length?'
      },
      {
        type: 'fix', q: 'Kitchen Coach ranks the dishes for Ben, then prints the serving plan. It stops with <code>TypeError: \'NoneType\' object is not iterable</code>. Fix <code>bens_order</code> so it prints Ben\'s ranking <b>and</b> the serving plan in its own order: bean chili, tofu stir-fry, lentil soup, pasta bake.',
        code: [...DISHES, '', 'def bens_order(dishes):', '    ranked = dishes.sort(key=lambda d: d["protein"], reverse=True)', '    return [d["name"] for d in ranked]', '', 'print("Ben:", bens_order(dishes))', 'for number, dish in enumerate(dishes, start=1):', '    print(number, dish["name"])'],
        title: 'serving_plan.py',
        check: [
          'want = "Ben: [\'tofu stir-fry\', \'pasta bake\', \'lentil soup\', \'bean chili\']\\n1 bean chili\\n2 tofu stir-fry\\n3 lentil soup\\n4 pasta bake"',
          'if out.startswith("Ben: [\'tofu stir-fry\', \'pasta bake\', \'lentil soup\', \'bean chili\']") and out != want:',
          '    msg = "Ben\'s ranking is right, but the serving plan changed order. .sort() changed the list itself. Use sorted(), which makes a new list."',
          'elif out != want:',
          '    msg = "It printed: " + out.replace("\\n", " / ") + ". It should print Ben\'s ranking, then 1 bean chili, 2 tofu stir-fry, 3 lentil soup, 4 pasta bake."',
          'else:',
          '    menu = [{"name": "oats", "protein": 5}, {"name": "eggs", "protein": 13}]',
          '    r = bens_order(menu)',
          '    if r != ["eggs", "oats"]:',
          '        msg = "bens_order should rank any list by protein, most first. Oats 5 g and eggs 13 g should give [\'eggs\', \'oats\']."',
          '    elif [d["name"] for d in menu] != ["oats", "eggs"]:',
          '        msg = "bens_order still changes the list it was given. Use sorted(), which makes a new list."',
          '    else:',
          '        ok = True'
        ].join('\n'),
        why: 'Write <code>ranked = sorted(dishes, key=lambda d: d["protein"], reverse=True)</code>. <code>.sort()</code> changes the list in place and hands back <code>None</code> (lesson 34), so <code>ranked</code> was <code>None</code>. And even on a line of its own, <code>.sort()</code> would reorder the caller\'s list, because the parameter is just another label on it. <code>sorted()</code> makes a new list and leaves the serving plan alone (lesson 81).',
        hint: 'Lessons 34 and 81: what does .sort() hand back? Which tool makes a new list instead?'
      },
      {
        type: 'bucket', q: 'Kitchen Coach has the lists <code>grams</code>, <code>names</code>, <code>dishes</code>, <code>guests</code>, <code>meals</code> and <code>steps</code>, and a generator function <code>pancakes</code> (it has <code>yield</code> in it). What does each line give you?',
        buckets: ['a real list: use it again and again', 'a waiter: used up after one pass'],
        items: [
          ['[g * 2 for g in grams]', 0],
          ['sorted(dishes, key=len)', 0],
          ['list(map(str.upper, names))', 0],
          ['list(pancakes(3))', 0],
          ['map(str.upper, names)', 1],
          ['zip(guests, meals)', 1],
          ['enumerate(steps)', 1],
          ['(g * 2 for g in grams)', 1],
          ['pancakes(3)', 1]
        ],
        why: 'Square brackets, <code>sorted</code> and <code>list(...)</code> all build a real list, which you can loop over as often as you like (lessons 76 and 81). <code>map</code>, <code>zip</code> and <code>enumerate</code> are iterators: waiters that hand out each value once (lesson 82). Round brackets around a comprehension make a generator expression, and calling a generator function gives a generator. Both are waiters too (lesson 83).',
        hint: 'Lesson 82, The catch: lists and anything wrapped in list() can be looped again. map, zip, enumerate and generators are one-shot.'
      },
      {
        type: 'fix', q: 'Ana is training for her half-marathon and counts the kcal from her carbs: 4 kcal per gram. The total says <code>0</code>, with no error. Fix it so it prints <code>Per meal: [360, 480, 300]</code> and then <code>Total: 1140 kcal from carbs</code>. Leave the two print lines as they are.',
        code: ['carbs = [90, 120, 75]          # grams in Ana\'s three meals', 'kcal = map(lambda g: g * 4, carbs)', '', 'print("Per meal:", list(kcal))', 'print("Total:", sum(kcal), "kcal from carbs")'],
        title: 'carb_kcal.py',
        check: [
          'want = "Per meal: [360, 480, 300]\\nTotal: 1140 kcal from carbs"',
          'if out == "Per meal: [360, 480, 300]\\nTotal: 0 kcal from carbs":',
          '    msg = "The total is still 0. The first list() used the map up. Make kcal a real list on line 2."',
          'elif out != want:',
          '    msg = "It printed: " + out.replace("\\n", " / ") + ". It should print: Per meal: [360, 480, 300] / Total: 1140 kcal from carbs"',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: 'Make <code>kcal</code> a real list on line 2: <code>kcal = list(map(lambda g: g * 4, carbs))</code>, or the clearer comprehension <code>kcal = [g * 4 for g in carbs]</code>. A map is a waiter (lesson 82). The first <code>list(kcal)</code> took every value, so <code>sum(kcal)</code> found nothing left and added up to 0. A list sends a new waiter every time: 360 plus 480 plus 300 is 1140 (lesson 81).',
        hint: 'Lessons 81 and 82: a map can be used once. What can you loop over as often as you like?'
      },
      {
        type: 'pick', q: 'Four plates wait on the pass, and the waiter is asked a question first. What does this print?',
        pic: run(['plates = ["pasta", "bean chili", "pancakes", "fruit salad"]', 'waiter = iter(plates)', '', 'print("bean chili" in waiter)', 'print(next(waiter))', 'print(list(waiter), len(plates))'], { title: 'the_pass.py' }),
        options: [
          "True, then pancakes, then ['fruit salad'] 4",
          "True, then pasta, then ['bean chili', 'pancakes', 'fruit salad'] 4",
          "True, then bean chili, then ['pancakes', 'fruit salad'] 4",
          "True, then pancakes, then ['fruit salad'] 1"
        ],
        answer: 0,
        why: 'To answer <code>in</code>, the waiter hands out plates until it finds bean chili: pasta, then bean chili. Those two are gone. <code>next</code> brings the next one, pancakes, and <code>list</code> takes what is left, fruit salad. The list itself is never touched, so <code>len(plates)</code> is still 4 (lesson 82).',
        hint: 'Lesson 82: anything that looks at an iterator moves it on, and that includes in. Where is the waiter after it found bean chili?',
        hints: { 1: 'in had to walk past pasta to find bean chili. Does a waiter go back?', 2: 'in already took bean chili off the waiter. next brings the one after it.', 3: 'The waiter is used up, not the list. plates still holds all four.' }
      },
      {
        type: 'fix', q: 'Saturday brunch: up to 100 orders, but only 3 guests are hungry now. <code>pancakes</code> cooks all 100 first. Make it a <b>generator</b>, so it cooks a pancake only when a guest asks. It should print <code>cooking 1</code>, <code>Ana gets pancake 1</code>, and so on, up to <code>Chloe gets pancake 3</code>, and never <code>cooking 4</code>. Leave the last two lines as they are.',
        code: ['def pancakes(orders):', '    stack = []', '    for number in range(1, orders + 1):', '        print("cooking", number)', '        stack.append(f"pancake {number}")', '    return stack', '', 'guests = ["Ana", "Ben", "Chloe"]', 'for guest, plate in zip(guests, pancakes(100)):', '    print(guest, "gets", plate)'],
        title: 'brunch.py',
        check: [
          'import inspect',
          'want = "cooking 1\\nAna gets pancake 1\\ncooking 2\\nBen gets pancake 2\\ncooking 3\\nChloe gets pancake 3"',
          'pf = globals().get("pancakes")',
          'if not inspect.isgeneratorfunction(pf):',
          '    msg = "pancakes is not a generator yet. Hand out each pancake with yield, and delete the stack and the return."',
          'elif out != want:',
          '    msg = "It printed: " + out.replace("\\n", " / ") + ". It should print cooking 1, Ana gets pancake 1, cooking 2, and so on up to Chloe gets pancake 3."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: 'Delete <code>stack = []</code> and <code>return stack</code>, and change the append line to <code>yield f"pancake {number}"</code>. Now <code>pancakes(100)</code> cooks nothing. Each round, zip asks the generator for one pancake, and it runs down to the next <code>yield</code> and pauses there. After Chloe, zip runs out of guests first and never asks again, so pancake 4 is never made (lessons 77 and 83).',
        hint: 'Lesson 83: write yield where you would have added to the list. A generator needs no list and no return.'
      },
      {
        type: 'fix', q: 'Ana logs her Sunday meal prep with <code>@logged</code>. Every step starts and finishes, but every answer comes back as <code>None</code>. Fix the decorator, so it prints <code>200 g of carbs per meal</code> and <code>5 boxes of 700 kcal</code>, with Starting and Finished around each one.',
        code: ['import functools', '', 'def logged(func):', '    @functools.wraps(func)', '    def wrapper(*args, **kwargs):', '        print(f"Starting {func.__name__}")', '        func(*args, **kwargs)', '        print(f"Finished {func.__name__}")', '    return wrapper', '', '@logged', 'def split_carbs(grams, meals):', '    return grams // meals', '', '@logged', 'def pack_boxes(days, kcal=650):', '    return f"{days} boxes of {kcal} kcal"', '', 'print(split_carbs(600, 3), "g of carbs per meal")', 'print(pack_boxes(5, kcal=700))'],
        title: 'meal_prep.py',
        check: [
          'import io, contextlib',
          'want = "Starting split_carbs\\nFinished split_carbs\\n200 g of carbs per meal\\nStarting pack_boxes\\nFinished pack_boxes\\n5 boxes of 700 kcal"',
          'if out != want:',
          '    if "Finished" not in out:',
          '        msg = "Finished is missing now. The wrapper should still print it after the call. Keep the answer in result first, and return it at the end."',
          '    else:',
          '        msg = "It printed: " + out.replace("\\n", " / ") + ". It should print the 6 lines: Starting, Finished, the answer, for each recipe."',
          'else:',
          '    def soak_oats(grams, per_jar=80):',
          '        return grams // per_jar',
          '    w = logged(soak_oats)',
          '    with contextlib.redirect_stdout(io.StringIO()):',
          '        r = w(400, per_jar=100)',
          '    if r != 4:',
          '        msg = "logged should hand back the answer of any recipe. soak_oats(400, per_jar=100) should give 4."',
          '    else:',
          '        ok = True'
        ].join('\n'),
        why: 'Change the call line to <code>result = func(*args, **kwargs)</code> and add <code>return result</code> as the last line of the wrapper. The wrapper is what <code>split_carbs</code> really is now, and a function with no <code>return</code> hands back <code>None</code> (lesson 45). So the real answer was cooked and thrown away. With <code>return result</code>, 600 // 3 gives 200 (lesson 84).',
        hint: 'Lesson 84, The catch: the wrapper calls the real card. What does it do with the answer?'
      },
      {
        type: 'pick', q: 'Kitchen Coach writes Ben\'s note into tonight\'s menu web page with the <code>safe_html</code> function from lesson 86. One call has a <code>t</code> in front, the other an <code>f</code>. What does this print?',
        pic: run(['from html import escape', 'from string.templatelib import Interpolation', '', 'def safe_html(template):', '    pieces = []', '    for part in template:', '        if isinstance(part, Interpolation):', '            part = escape(str(part.value))', '        pieces.append(part)', '    return "".join(pieces)', '', 'note = "<b>extra cheese"', 'print(safe_html(t"<li>Ben: {note}</li>"))', 'print(safe_html(f"<li>Ben: {note}</li>"))'], { title: 'menu_page.py' }),
        options: [
          '<li>Ben: &lt;b&gt;extra cheese</li>, then <li>Ben: <b>extra cheese</li>',
          '<li>Ben: &lt;b&gt;extra cheese</li>, both times',
          '<li>Ben: &lt;b&gt;extra cheese</li>, then a TypeError: an f-string is not a Template',
          '&lt;li&gt;Ben: &lt;b&gt;extra cheese&lt;/li&gt;, then <li>Ben: <b>extra cheese</li>'
        ],
        answer: 0,
        why: 'The t-string makes a Template, so the loop gets your fixed text as <code>str</code> and Ben\'s note as an <code>Interpolation</code>. Only the note is escaped, and your <code>&lt;li&gt;</code> tags stay real tags. The f-string is finished text before <code>safe_html</code> even starts. Looping over a <code>str</code> gives one character at a time, none of them is an Interpolation, so every character goes through untouched, Ben\'s <code>&lt;b&gt;</code> too. No error: one wrong letter switches the safety off (lesson 86).',
        hint: 'Lesson 86, The catch: what does an f-string hand to safe_html? And what does a for loop over a str give?',
        hints: { 1: 'The f-string is finished text. Is there any Interpolation left in it to escape?', 2: 'safe_html never checks what it got. A for loop over a str works fine: one character at a time.', 3: 'Only the values are escaped. The fixed text you wrote goes in as it is.' }
      },
      {
        type: 'fix', q: 'Hardest one. Ben\'s tofu is out of date, so the block raises an error, and the fridge door stays open all night. Fix <code>fridge_door</code> so the door closes <b>every time</b>, and the error still reaches the <code>except</code>. It should print <code>Door open</code>, <code>Taking tofu for Ben\'s stir-fry</code>, <code>Door closed</code>, <code>Problem: the tofu is out of date</code> and <code>Is the door still open? False</code>. Leave the code below the function as it is.',
        code: ['from contextlib import contextmanager', '', 'fridge = {"open": False}', '', '@contextmanager', 'def fridge_door():', '    fridge["open"] = True', '    print("Door open")', '    yield', '    fridge["open"] = False', '    print("Door closed")', '', 'try:', '    with fridge_door():', '        print("Taking tofu for Ben\'s stir-fry")', '        raise ValueError("the tofu is out of date")', 'except ValueError as err:', '    print("Problem:", err)', 'print("Is the door still open?", fridge["open"])'],
        title: 'fridge.py',
        check: [
          'import io, contextlib',
          'want = "Door open\\nTaking tofu for Ben\'s stir-fry\\nDoor closed\\nProblem: the tofu is out of date\\nIs the door still open? False"',
          'fd = globals().get("fridge_door")',
          'if out != want:',
          '    if "Problem:" not in out:',
          '        msg = "The error never reached the except. A context manager should clean up and then let the error go on. Use try: and finally:, not except."',
          '    else:',
          '        msg = "It printed: " + out.replace("\\n", " / ") + ". Put the yield under try:, and the two closing lines under finally:."',
          'else:',
          '    passed = False',
          '    with contextlib.redirect_stdout(io.StringIO()):',
          '        with fd():',
          '            pass',
          '        quiet_ok = fridge["open"] is False',
          '        try:',
          '            with fd():',
          '                raise KeyError("milk")',
          '        except KeyError:',
          '            passed = True',
          '    if not quiet_ok:',
          '        msg = "With no error, the door should close too."',
          '    elif not passed or fridge["open"]:',
          '        msg = "Any error should close the door and then carry on, a KeyError too. Use finally:, not except."',
          '    else:',
          '        ok = True'
        ].join('\n'),
        why: 'Wrap the <code>yield</code> in <code>try:</code>, and put the two closing lines under <code>finally:</code>. When the block raises, Python sends the error back into the generator at the <code>yield</code> line (lesson 83). With no <code>finally</code>, it flew straight out, and the closing lines never ran. <code>finally</code> runs whatever happens, then the error carries on to your <code>except</code> (lesson 53). Catching it inside <code>fridge_door</code> would hide the problem from the caller (lesson 85).',
        hint: 'Lesson 85, The catch: where does the error appear inside the generator? Which block runs whatever happens?'
      }
    ]
  });
})();
