/* Lesson 64: Review: errors, files and modules (module 5). Quiz only, no video, no exercise. */
(function () {
  const { P, code, run, svg, box, T, arrow } = PR;

  /* =====================================================================
     l64  Review: errors, files and modules
     ===================================================================== */

  // One page of the recipe notebook: a tab with the lesson number, then a ruled page with the title, the key code and one plain line.
  const page = (x, y, n, title, mono, plain, tint) =>
    `<rect x="${x + 18}" y="${y}" width="96" height="18" rx="5" fill="${P.ink}"/>` +
    T(x + 66, y + 13, 'Lesson ' + n, { s: 10.5, f: P.white }) +
    box(x, y + 16, 132, 88, P.white, 10) +
    `<rect x="${x + 7}" y="${y + 24}" width="118" height="72" rx="6" fill="${tint}" stroke="${P.ink}" stroke-width="1.5"/>` +
    `<line x1="${x + 7}" y1="${y + 50}" x2="${x + 125}" y2="${y + 50}" stroke="${P.danger}" stroke-width="1.4"/>` +
    T(x + 66, y + 42, title, { s: title.length > 14 ? 11.5 : 12.5 }) +
    T(x + 66, y + 68, mono, { s: mono.length > 14 ? 10.5 : 11.5, m: true, w: 700 }).replace('<text ', '<text style="font-variant-ligatures:none" ') +
    T(x + 66, y + 88, plain, { s: 11, w: 700, f: P.ink2 });

  const pages = [
    [52, 'Exceptions', "ValueError: 'two'", 'read the last line', P.dangerT],
    [53, 'try and except', 'except ValueError', 'a small, named net', P.dangerT],
    [54, 'Raising errors', 'raise ValueError', 'show the bad value', P.dangerT],
    [55, 'Reading files', 'line.strip()', 'a file is only text', P.tint],
    [56, 'Writing files', 'open(name, "a")', '"w" wipes, "a" adds', P.tint],
    [57, 'with', 'with ... as f:', 'closes, error or not', P.tint],
    [58, 'Paths', 'shelf / "soup.txt"', 'build it, never glue', P.tint],
    [59, 'JSON', 'json.dump(d, f)', 'dicts that come back', P.tint],
    [60, 'Modules', 'import kitchen', 'just a .py file', P.okT],
    [61, 'Standard library', 'Counter(meals)', 'the free shelf first', P.okT],
    [62, 'Lazy imports', 'lazy import x', 'loads at first use', P.okT],
    [63, 'pip and packages', 'python3 -m pip', 'one venv per project', P.okT]
  ];
  // The shelf under each row of notebook pages.
  const shelf = y => `<rect x="10" y="${y}" width="580" height="9" rx="3" fill="${P.sand}" stroke="${P.ink}" stroke-width="2"/>`;
  const recapPic = svg(600, 428, 'Twelve notebook pages on three shelves, one per lesson of module 5, each with its key code and one plain idea. When the dish burns: exceptions, try and except, raising errors. The recipe notebook: reading files, writing files, with, paths with pathlib, saving data as JSON. Cookbooks on the shelf: modules and import, the standard library, lazy imports, pip and packages. Below the shelves, this review.',
    T(300, 20, 'Module 5: one shelf, twelve notebook pages', { s: 15 }) +
    pages.map((s, i) => page(21 + (i % 4) * 142, 30 + Math.floor(i / 4) * 114, ...s)).join('') +
    [138, 252, 366].map(y => shelf(y - 4)).join('') +
    box(160, 382, 280, 34, P.white, 10) +
    `<rect x="166" y="388" width="88" height="22" rx="6" fill="${P.ink}"/>` + T(210, 403.5, 'Lesson 64', { s: 11, f: P.white }) +
    T(266, 404, 'Review: you are here', { s: 12.5, a: 'start' }));

  // How to play: predict, run, compare. And: the last line of an error names the problem.
  const step = (x, n, head, line1, line2, fill) =>
    box(x, 20, 170, 104, fill, 14) +
    `<circle cx="${x + 26}" cy="${42}" r="12" fill="${P.ink}"/>` + T(x + 26, 46.5, String(n), { s: 12.5, f: P.white }) +
    T(x + 46, 47, head, { s: 15, a: 'start' }) +
    T(x + 85, 82, line1, { s: 12, w: 700, f: P.ink2 }) +
    T(x + 85, 102, line2, { s: 12, w: 700, f: P.ink2 });
  const playPic = `<div style="width:100%;min-width:0">` +
    svg(600, 196, 'Three steps: 1 predict the output before you run, 2 press Run, 3 compare. Below: an error? Read its last line. TypeError, FileNotFoundError and ModuleNotFoundError each name the problem.',
      step(14, 1, 'Predict', 'say every line', 'out loud first', P.tint) +
      arrow(190, 72, 212, 72, P.accent, 3) +
      step(216, 2, 'Run', 'press Run and', 'read every line', P.warnT) +
      arrow(392, 72, 414, 72, P.accent, 3) +
      step(418, 3, 'Compare', 'surprised? that is', 'the lesson to reread', P.okT) +
      box(14, 142, 572, 40, P.dangerT, 12) +
      `<rect x="28" y="150" width="86" height="24" rx="7" fill="${P.danger}"/>` + T(71, 166.5, 'TypeError', { s: 12.5, f: P.white, m: true }) +
      T(128, 167, 'An error? Its last line names the problem. Read it first.', { s: 12.5, w: 700, a: 'start', f: P.ink })) +
    run(['# Warm up: say the output out loud, then press Run', 'with open("pantry.txt") as f:', '    for line in f:', '        name, grams = line.strip().split(",")', '        print(name, int(grams) + 100)'], { title: 'warm_up.py', files: { 'pantry.txt': 'rice,900\noats,400\n' } }) +
    run(['# This one stops. Read the last line of the error first.', 'with open("pantry.txt") as f:', '    name, grams = f.read().strip().split(",")', '', 'print("Rice after shopping:", grams + 150)'], { title: 'read_the_error.py', files: { 'pantry.txt': 'rice,900\n' } }) +
    `</div>`;

  // kitchen.py for the module question: a card, a line at the left edge, and test lines under the guard.
  const KITCHEN_LINES = [
    'def kcal_in(grams, per_100g):',
    '    return round(grams * per_100g / 100)',
    '',
    'print("Cookbook open")',
    '',
    'if __name__ == "__main__":',
    '    print("Testing:", kcal_in(150, 130))'
  ];

  COURSE.add({
    id: 'l64', minutes: 25,
    summary: 'Twelve lessons on one shelf: exceptions, try and except, raising errors, reading and writing files, <code>with</code>, paths, JSON, modules, the standard library, lazy imports, and pip. Then <b>16 mixed questions</b>, easy to hard, with <b>5 real bugs</b> to fix. Most of them you can <b>run</b>, and the boxes come with their notebooks already in the folder.',
    parts: [
      {
        label: 'Recap', pic: recapPic,
        h: 'One shelf, twelve notebook pages.',
        text: [
          'Module 5 taught Kitchen Coach to <b>explain a burnt dish</b>, to <b>remember</b> things in a notebook, and to <b>borrow cookbooks</b>. Each page in the picture is one lesson, with the <b>one line of code</b> to remember and the <b>one idea</b> behind it.',
          '<b>When the dish burns</b> (pink). An exception has a <b>type</b> and a <b>message</b>, on the last line of the traceback. Read from the bottom: the last line says what burnt, the File line above it says where, and walking up says who sent the bad ingredient. <code>try</code> and <code>except ValueError:</code> catch the <b>one</b> error you expect, around the one risky line. A bare <code>except:</code> catches your bugs too. Your own card can refuse nonsense with <code>raise ValueError(f"... got {grams}")</code>: the type, what was wrong, and the value.',
          '<b>The recipe notebook</b> (blue). <b>A file is only text.</b> Each line ends with a hidden <code>"\\n"</code>, so <code>.strip()</code> it, and turn numbers back with <code>int()</code>. <code>"w"</code> gives a clean page and <b>wipes</b> what was there, <code>"a"</code> adds to the end. <code>write</code> needs a string and adds no new line. <code>with open(...) as f:</code> closes the notebook when the block ends, <b>even after an error</b>. Build addresses with <code>Path("recipes") / "soup.txt"</code>. <code>json.dump</code> and <code>json.load</code> save dicts and lists with their types, but keys come back as text, tuples as lists, and a set cannot go in at all.',
          '<b>Cookbooks on the shelf</b> (green). A module is <b>just a .py file</b>. <code>import kitchen</code> runs it once, so keep test lines under <code>if __name__ == "__main__":</code>. <code>from kitchen import kcal_in</code> takes one card out by name. Look on the free shelf first: <code>Counter</code>, <code>date</code>, <code>math</code>, <code>json</code>. Python 3.15\'s <code>lazy import</code> opens a book at its first use, so a typo shows up late. Anything else comes from PyPI with <code>python3 -m pip</code>, into a venv of its own.'
        ],
        tip: 'Module 4 still applies: a card that raises stops at once, like a loud <code>return</code>. And module 3 too: <code>.split(",")</code> hands back a list, and a dict lookup with a missing key raises <code>KeyError</code>.'
      },
      {
        label: 'How to play', pic: playPic,
        h: 'Predict first. Then press Run.',
        text: [
          'Most questions show a small piece of Kitchen Coach you have not seen before. Before you answer, <b>say the output out loud</b>. When the code reads a file, say what each line really holds, hidden <code>"\\n"</code> and all. Then pick your answer, and press <b>Run</b> to check it.',
          'Every Run box starts in a fresh, empty folder with the notebooks it needs already in it, like <code>pantry.txt</code> above. Files a box writes are gone at the next run, and nothing touches your own computer.',
          'The <b>fix</b> questions are real code that goes wrong. Change it, then press <b>Run and check</b>. The page runs your code, checks what it prints, and sometimes opens the file your code wrote, or tries your card with other values. There is often more than one good fix.',
          'Many bugs in this module stop with an error. Read the <b>last line</b> first: <code>ValueError</code> means a value that makes no sense, <code>TypeError</code> the wrong kind of thing (often text from a file), <code>FileNotFoundError</code> no such notebook, and <code>ModuleNotFoundError</code> no such cookbook. Try it now on <code>read_the_error.py</code> above.'
        ],
        warn: 'Running the code first and then picking the answer works, but it teaches you very little. The guess is where the learning happens.'
      }
    ],
    quiz: [
      {
        type: 'bucket', q: 'Warm up. Kitchen Coach has <code>protein = {"tofu": 17, "lentils": 9}</code>, has done <code>import json</code> and <code>from pathlib import Path</code>, and its folder holds only <code>pantry.txt</code>. Which exception does each line raise on its own?',
        buckets: ['ValueError', 'TypeError', 'KeyError', 'FileNotFoundError'],
        items: [
          ['int("two")', 0],
          ['float("1,5")', 0],
          ['"900" + 150', 1],
          ['json.dumps({"berries", "pudding"})', 1],
          ['protein["quinoa"]', 2],
          ['protein["Tofu"]', 2],
          ['open("pantyr.txt")', 3],
          ['Path("recipes/curry.txt").read_text()', 3]
        ],
        why: '<code>int</code> and <code>float</code> take text, but cannot read <code>"two"</code> or a comma as a number: right kind, bad value, <b>ValueError</b>. Text plus a number, and a set that JSON cannot write, are the wrong <b>kind</b> of thing: <b>TypeError</b>. A dict key must match exactly, capital letters too: <b>KeyError</b>. And a name that is not on the shelf, spelt wrong or in a folder that is not there, is a <b>FileNotFoundError</b>.',
        hint: 'Lesson 52: is it a bad value, the wrong kind of thing, a missing key, or a missing file?'
      },
      {
        type: 'pick', q: 'Press Run. Kitchen Coach plans dinner for 3, then for 0 guests, and stops. Read the traceback from the bottom. Which line was Python running when it burnt?',
        pic: run(['def per_guest(kcal, guests):', '    return kcal / guests', '', 'def plan(guests):', '    each = per_guest(2400, guests)', '    return f"Each guest: {each} kcal"', '', 'print(plan(3))', 'print(plan(0))'], { title: 'dinner.py' }),
        options: ['Line 2, in per_guest: return kcal / guests', 'Line 9: print(plan(0))', 'Line 5, in plan: each = per_guest(2400, guests)', 'Line 8: print(plan(3))'],
        answer: 0,
        why: 'The last line names the problem: <code>ZeroDivisionError: division by zero</code>. The File line just above it is where it burnt: <b>line 2</b>, in <code>per_guest</code>. Walk up and you see why: line 5 called it, and line 9 sent the 0. Line 8 worked and printed <code>Each guest: 800.0 kcal</code>.',
        hint: 'Lesson 52: most recent call last. Which File line is at the bottom?'
      },
      {
        type: 'pick', q: 'Ana typed <code>3</code>. What does Kitchen Coach print?',
        pic: run(['answer = "3"', 'try:', '    servings = int(anwser)', 'except:', '    servings = 1', 'print("Cooking for", servings)'], { title: 'servings.py' }),
        options: ['Cooking for 3', 'Cooking for 1', "NameError: name 'anwser' is not defined", "ValueError: invalid literal for int() with base 10: '3'"],
        answer: 1,
        why: 'Line 3 misspells <code>answer</code>, so it raises a <b>NameError</b> every time. The bare <code>except:</code> catches <b>every</b> error, so the typo is hidden and Ana gets 1 serving with no warning. With <code>except ValueError:</code> the NameError would show itself, with <code>Did you mean: \'answer\'?</code>',
        hint: 'Lesson 53: which errors does a bare except: catch? Is the name on line 3 spelt like the one on line 1?'
      },
      {
        type: 'fix', q: 'Ana types <code>two</code>, and Kitchen Coach crashes with a <code>ValueError</code>. Add <code>try</code> and <code>except ValueError:</code> so a word prints <code>Please type a number.</code> and the loop asks again. With the ready-made answers <code>two</code> and <code>4</code>, the panel should end with <code>Cooking for 4.</code>',
        code: ['while True:', '    answer = input("Servings? ")', '    servings = int(answer)', '    break', '', 'print(f"Cooking for {servings}.")'],
        title: 'ask_again.py', inputs: ['two', '4'],
        check: [
          'want = "Servings? two\\nPlease type a number.\\nServings? 4\\nCooking for 4."',
          'if out == want:',
          '    ok = True',
          'elif "Please type a number." not in out:',
          '    msg = "Print exactly: Please type a number.  inside the except ValueError: block."',
          'elif out.count("Servings?") != 2:',
          '    msg = "two should be refused once, and 4 accepted. Keep break inside the try block, under the int() line."',
          'else:',
          '    msg = "It printed: " + out.replace("\\n", " / ") + ". It should end with: Cooking for 4."'
        ].join('\n'),
        why: 'Under <code>while True:</code>, put <code>try:</code>, then <code>servings = int(answer)</code> and <code>break</code> under it. Then <code>except ValueError:</code> with <code>print("Please type a number.")</code>. The word makes <code>int()</code> jump over <code>break</code> to the except block, and the loop asks again. The 4 works, <code>break</code> runs, and dinner goes on.',
        hint: 'Lesson 53: put lines 3 and 4 inside try:, pushed in by 4 more spaces, and add the except ValueError: block under them.'
      },
      {
        type: 'fix', q: 'Chloe\'s cake card has no guard. <code>split_cake(1200, 0)</code> burns deep inside with <code>ZeroDivisionError</code>, and the net at the bottom only catches <code>ValueError</code>. Add a guard at the top of the card that raises a <code>ValueError</code> for fewer than 1 slice, with the bad value in the message, like <code>slices must be 1 or more, got 0</code>. Do not change the loop.',
        code: ['def split_cake(kcal, slices):', '    return kcal / slices', '', 'for slices in [4, 0]:', '    try:', '        print(split_cake(1200, slices))', '    except ValueError as err:', '        print("Refused:", err)'],
        title: 'cake.py',
        check: [
          'f = globals().get("split_cake")',
          'def _try(n):',
          '    try:',
          '        return "ret", f(1200, n)',
          '    except ValueError as e:',
          '        return "VE", str(e)',
          '    except Exception as e:',
          '        return type(e).__name__, str(e)',
          'if not callable(f):',
          '    msg = "Keep the card called split_cake."',
          'else:',
          '    a, b, c = _try(0), _try(-3), _try(6)',
          '    if c != ("ret", 200):',
          '        msg = "split_cake(1200, 6) should still give 200.0. Keep the return line under the guard."',
          '    elif a[0] != "VE":',
          '        msg = "split_cake(1200, 0) " + ("still returns." if a[0] == "ret" else "raised " + a[0] + ".") + " Add if slices < 1: and raise ValueError(...) under it."',
          '    elif b[0] != "VE":',
          '        msg = "-3 slices makes no sense either. Guard with if slices < 1:"',
          '    elif "-3" not in b[1]:',
          '        msg = "The message for -3 slices is: " + b[1] + ". Show the bad value with an f-string: f\\"slices must be 1 or more, got {slices}\\""',
          '    elif out != "300.0\\nRefused: " + a[1]:',
          '        msg = "It should print 300.0, then Refused: and your message. Leave the loop as it was."',
          '    else:',
          '        ok = True'
        ].join('\n'),
        why: 'At the top of the card: <code>if slices &lt; 1:</code>, then <code>raise ValueError(f"slices must be 1 or more, got {slices}")</code>. The card now refuses before it divides, with a message that names the problem and the value. The caller\'s <code>except ValueError</code> catches it: <code>Refused: slices must be 1 or more, got 0</code>.',
        hint: 'Lesson 54: a guard is an if at the top of the card, and raise, the type, and an f-string message under it.'
      },
      {
        type: 'fix', q: '<code>shopping.txt</code> says oats, rice and tofu, one per line. Kitchen Coach reads it, and still says <code>Buy rice!</code>. Fix it so it prints <code>Rice is on the list.</code> and then <code>[\'oats\', \'rice\', \'tofu\']</code>.',
        code: ['items = []', 'with open("shopping.txt") as f:', '    for line in f:', '        items.append(line)', '', 'if "rice" in items:', '    print("Rice is on the list.")', 'else:', '    print("Buy rice!")', 'print(items)'],
        title: 'shopping.py', files: { 'shopping.txt': 'oats\nrice\ntofu\n' },
        check: [
          'want = "Rice is on the list.\\n[\'oats\', \'rice\', \'tofu\']"',
          'if out == want:',
          '    ok = True',
          'elif "\\\\n" in out:',
          '    msg = "The items still end with a hidden \\\\n, so \\"rice\\\\n\\" is not \\"rice\\". Snip it off with line.strip()."',
          'else:',
          '    msg = "It should print: Rice is on the list.  and then [\'oats\', \'rice\', \'tofu\']"'
        ].join('\n'),
        why: 'Each line from the file ends with its hidden <code>"\\n"</code>, so the list held <code>"rice\\n"</code>, not <code>"rice"</code>. <code>items.append(line.strip())</code> snips it off, and <code>"rice" in items</code> finds it.',
        hint: 'Lesson 55: what is at the end of every line you read from a file? Press Run and look at the list it prints.'
      },
      {
        type: 'pick', q: 'Ana\'s <code>log.txt</code> holds two runs: <code>Mon: 5 km</code> and <code>Tue: 8 km</code>, one per line. What does this print?',
        pic: run(['with open("log.txt", "w") as f:', '    f.write("Wed: 6 km")', 'with open("log.txt", "a") as f:', '    f.write("Thu: 10 km\\n")', '', 'with open("log.txt") as f:', '    print(f.read())'], { title: 'log.py', files: { 'log.txt': 'Mon: 5 km\nTue: 8 km\n' } }),
        options: ['Four lines: Mon, Tue, Wed and Thu', 'One line: Wed: 6 kmThu: 10 km', 'Two lines: Wed: 6 km, then Thu: 10 km', 'One line: Thu: 10 km'],
        answer: 1,
        why: '<code>"w"</code> wipes the page the moment it opens, so Monday and Tuesday are gone. <code>"a"</code> keeps what is there and adds to the end. But <code>write</code> adds no new line by itself, and <code>"Wed: 6 km"</code> has no <code>\\n</code>, so Thursday lands on the same line.',
        hint: 'Lesson 56: what does "w" do to the old lines? And does write start a new line for you?'
      },
      {
        type: 'fix', q: 'Kitchen Coach adds two dinners to the log and stops with <code>TypeError: write() argument must be str, not int</code>. Fix it so <code>dinner_log.txt</code> keeps Sunday and ends up with three lines: <code>Sun: 640 kcal</code>, <code>Mon: 520 kcal</code>, <code>Tue: 710 kcal</code>.',
        code: ['dinners = {"Mon": 520, "Tue": 710}', '', 'with open("dinner_log.txt", "a") as f:', '    for day, kcal in dinners.items():', '        f.write(day)', '        f.write(kcal)', '', 'with open("dinner_log.txt") as f:', '    print(f.read())'],
        title: 'dinner_log.py', files: { 'dinner_log.txt': 'Sun: 640 kcal\n' },
        check: [
          'with open("dinner_log.txt") as r:',
          '    text = r.read()',
          'want = "Sun: 640 kcal\\nMon: 520 kcal\\nTue: 710 kcal\\n"',
          'if text == want:',
          '    ok = True',
          'elif not text.startswith("Sun: 640 kcal\\n"):',
          '    msg = "Sunday is gone. Keep \\"a\\" so the new dinners go under the old one."',
          'elif text.count("\\n") < 3:',
          '    msg = "The dinners run together on one line. write adds no new line: end each one with \\\\n."',
          'else:',
          '    msg = "The log holds: [" + text.strip().replace("\\n", " / ") + "]. Each new line should look like: Mon: 520 kcal"'
        ].join('\n'),
        why: 'Replace the two <code>write</code> lines with one: <code>f.write(f"{day}: {kcal} kcal\\n")</code>. The f-string turns the number into text, and the <code>\\n</code> ends the line. <code>"a"</code> stays, so Sunday is kept.',
        hint: 'Lesson 56: write takes one string. Build the whole line with an f-string, and end it with \\n.'
      },
      {
        type: 'pick', q: 'Chloe types her servings as <code>two</code> in the middle of writing the log. What does this print?',
        pic: run(['try:', '    with open("log.txt", "w") as f:', '        f.write("Ana: pasta\\n")', '        servings = int("two")', '        f.write("Ben: bean chili\\n")', 'except ValueError:', '    print("Not a number.")', '', 'print("Closed?", f.closed)', 'with open("log.txt") as r:', '    print(r.read())'], { title: 'with_error.py' }),
        options: ['Not a number., then Closed? True, then Ana: pasta', 'Not a number., then Closed? True, then Ana: pasta and Ben: bean chili', 'Not a number., then Closed? False, then nothing: the log is empty', 'Only the ValueError traceback'],
        answer: 0,
        why: '<code>int("two")</code> raises a ValueError, so line 5 never runs. On its way out of the block, <code>with</code> <b>closes the notebook</b>, so Ana\'s line is saved. Then <code>except</code> catches the error. Error or not, the cover snaps shut.',
        hint: 'Lesson 57: does with close the file when an error flies out of the block? Which writes ran before the error?'
      },
      {
        type: 'fill', q: 'The <code>recipes</code> folder holds <code>lentil_soup.txt</code>. Fill the blanks so the address works on every computer and the last line prints <code>lentil_soup</code>.',
        text: 'from pathlib import Path\n\nshelf = ___("recipes")\nsoup = shelf ___ "lentil_soup.txt"\nprint(soup.___)',
        options: ['Path', '/', '+', 'stem', 'name', 'suffix', 'open'],
        answer: ['Path', '/', 'stem'],
        why: '<code>Path("recipes")</code> makes an address, and <code>/</code> adds the next step with the right slash for the computer. <code>+</code> between a Path and text is a TypeError. <code>.stem</code> is the name without its ending: <code>lentil_soup</code>. <code>.name</code> would give <code>lentil_soup.txt</code>, and <code>.suffix</code> just <code>.txt</code>.',
        hint: 'Lesson 58: build the address with Path and /, never by gluing text. Which part is the name without .txt?'
      },
      {
        type: 'pick', q: 'Kitchen Coach saves a dinner plan by day number and loads it back. What does this print?',
        pic: run(['import json', '', 'plan = {1: "pasta", 2: "bean chili"}   # day number: dinner', 'back = json.loads(json.dumps(plan))', 'print(back == plan, back.get(1), back["1"])'], { title: 'plan.py' }),
        options: ['True pasta pasta', 'False None pasta', 'True None pasta', "KeyError: '1'"],
        answer: 1,
        why: 'JSON keys are always text. The key <code>1</code> goes out as <code>"1"</code> and comes back as the text <code>"1"</code>. So <code>back</code> is not the same as <code>plan</code>, <code>back.get(1)</code> finds nothing and gives <code>None</code>, and <code>back["1"]</code> is <code>pasta</code>.',
        hint: 'Lesson 59: what kind of value is a key in a JSON file, always?'
      },
      {
        type: 'pick', q: '<code>kitchen.py</code> is in the folder, next to <code>coach.py</code>. Press Run on <code>coach.py</code>. What does it print?',
        pic: code(KITCHEN_LINES, { title: 'kitchen.py' }) +
          run(['from kitchen import kcal_in', 'import kitchen', '', 'print("Ana:", kcal_in(80, 380))'], { title: 'coach.py', files: { 'kitchen.py': KITCHEN_LINES.join('\n') + '\n' } }),
        options: ['Ana: 304', 'Cookbook open, then Ana: 304', 'Cookbook open, Cookbook open, then Ana: 304', 'Cookbook open, Testing: 195, then Ana: 304'],
        answer: 1,
        why: 'Python runs a module <b>once</b>, on the first import, so the line at the left edge prints <code>Cookbook open</code> once. The second import reuses the open book. The test line is under the guard, and kitchen\'s <code>__name__</code> is <code>"kitchen"</code> here, not <code>"__main__"</code>, so it is skipped. 80 * 380 / 100 is 304.',
        hint: 'Lesson 60: how many times does a module run? Who is the main program here?'
      },
      {
        type: 'type', q: 'Ben\'s meals this week, and the days in February 2027. Predict the output. Type exactly what appears, then press Run on the code to check.',
        pic: run(['from collections import Counter', 'from datetime import date', '', 'meals = ["oats", "tofu", "oats", "rice", "oats"]', 'counts = Counter(meals)', 'gap = date(2027, 3, 1) - date(2027, 2, 1)', 'print(counts["oats"], counts["quinoa"], gap.days)'], { title: 'week.py' }),
        prompt: 'output >',
        answers: ['3 0 28'],
        accept: '^3 0 28$',
        why: '<code>Counter</code> counts every item: oats 3 times. A food that never came up counts as <code>0</code>, with no KeyError. Taking one date from another gives a length of time, and <code>.days</code> is the number: February 2027 has <b>28</b> days, because 2027 is not a leap year. <code>date</code> knows every month\'s real length.',
        hint: 'Lesson 61: what does a Counter give for a missing item? How many days does February have in 2027?'
      },
      {
        type: 'pick', q: 'Python 3.15. The Run boxes here use 3.14, so this one has no Run button. Line 1 is one letter short. You run it on your computer. What happens?',
        pic: code(['lazy import big_cookbok      # one letter short', '', 'print("Coach ready")', 'mode = "plan"', 'if mode == "plan":', '    print(big_cookbok.plan("Ana"))'], { title: 'coach.py, needs Python 3.15' }),
        options: ['ModuleNotFoundError at line 1, before anything prints', "Coach ready, then ModuleNotFoundError: No module named 'big_cookbok'", 'SyntaxError: lazy is not allowed at the top', 'Coach ready, and nothing else'],
        answer: 1,
        why: 'A lazy import does not look for the book at line 1. It only puts a "later" note on the name. So <code>Coach ready</code> prints. Line 6 is the first use of the name: now Python looks for <code>big_cookbok.py</code>, finds nothing, and stops. In shopping mode it would never stop at all. That is the price of lazy: the error shows up <b>late</b>.',
        hint: 'Lesson 62: when does a lazy import open the book?'
      },
      {
        type: 'match', q: 'Match each line to what it does.',
        pairs: [
          ['import kitchen', 'open your own kitchen.py from this folder'],
          ['from collections import Counter', 'take one card out of a book that comes free'],
          ['if __name__ == "__main__":', 'only when this file runs on its own'],
          ['lazy import big_cookbook', 'Python 3.15: open the book at its first use'],
          ['python3 -m venv .venv', 'make a small shelf for this one project'],
          ['python3 -m pip install tabulate', 'bring a package from PyPI to this Python']
        ],
        why: 'A module is just a .py file, and <code>import</code> opens it. <code>from ... import</code> takes one card out by name, here from the standard library. The <code>__name__</code> guard keeps test lines out of every program that imports the file. <code>lazy</code> waits for the first use. And the last two are terminal commands: a venv is a small shelf per project, and <code>python3 -m pip</code> uses the pip of <b>this</b> python3.',
        hint: 'Lessons 60 to 63. Start with the ones you are sure of. Which two are typed in the terminal, not in code?'
      },
      {
        type: 'fix', q: 'Hardest one. Chloe\'s likes are a set, so <code>json.dump</code> stops with <code>TypeError: Object of type set is not JSON serializable</code>. Fix it so <code>chloe.json</code> is saved with her likes as a <b>sorted list</b>, and the program prints <code>[\'berries\', \'pudding\']</code>. (The red box also shows lines inside Python\'s own json code, and a last line that says <code>when serializing dict item \'likes\'</code>. Your line is the one in <b>chloe.py</b>.)',
        code: ['import json', '', 'chloe = {"name": "Chloe", "likes": {"pudding", "berries"}, "gluten_free": True}', '', 'with open("chloe.json", "w") as f:', '    json.dump(chloe, f, indent=2)', '', 'with open("chloe.json") as f:', '    back = json.load(f)', 'print(back["likes"])'],
        title: 'chloe.py',
        check: [
          'import json as _json',
          'try:',
          '    with open("chloe.json") as _r:',
          '        saved = _json.load(_r)',
          'except Exception:',
          '    saved = None',
          'if not isinstance(saved, dict):',
          '    msg = "chloe.json could not be read back as a dict. Save the whole chloe dict with json.dump."',
          'elif saved.get("name") != "Chloe" or saved.get("gluten_free") is not True:',
          '    msg = "Keep Chloe\'s name and gluten_free in the file. Change only the likes."',
          'elif saved.get("likes") == ["berries", "pudding"] and out == "[\'berries\', \'pudding\']":',
          '    ok = True',
          'elif isinstance(saved.get("likes"), list) and sorted(saved["likes"]) == ["berries", "pudding"]:',
          '    msg = "Close, but not A to Z. A set has no order, so list() can give either order. Use sorted() for a fixed A to Z order."',
          'else:',
          '    msg = "The likes in chloe.json are: " + repr(saved.get("likes")) + ". They should be [\'berries\', \'pudding\']."'
        ].join('\n'),
        why: 'Add <code>chloe["likes"] = sorted(chloe["likes"])</code> before the <code>with</code> line. <code>sorted()</code> hands back a <b>list</b>, in a fixed order, and JSON can write a list. When you load it back, <code>set(back["likes"])</code> turns it into a set again if you need one.',
        hint: 'Lesson 59: JSON knows dicts, lists, text, numbers, True, False and None. Which tool turns a set into a list in A to Z order?'
      }
    ]
  });
})();
