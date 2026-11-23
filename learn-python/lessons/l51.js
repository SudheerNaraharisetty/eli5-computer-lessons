/* Lesson 51: Review: functions (module 4). Quiz only, no video, no exercise. */
(function () {
  const { P, code, run, svg, box, T, arrow } = PR;

  /* =====================================================================
     l51  Review: functions
     ===================================================================== */

  // One recipe card in the box: a tab with the lesson number, then a ruled card with the title, the key code and one plain line.
  const card = (x, y, n, title, mono, plain, tint) =>
    `<rect x="${x + 18}" y="${y}" width="96" height="18" rx="5" fill="${P.ink}"/>` +
    T(x + 66, y + 13, n === 51 ? 'This review' : 'Lesson ' + n, { s: 10.5, f: P.white }) +
    box(x, y + 16, 132, 88, P.white, 10) +
    `<rect x="${x + 7}" y="${y + 24}" width="118" height="72" rx="6" fill="${tint}" stroke="${P.ink}" stroke-width="1.5"/>` +
    `<line x1="${x + 7}" y1="${y + 50}" x2="${x + 125}" y2="${y + 50}" stroke="${P.danger}" stroke-width="1.4"/>` +
    T(x + 66, y + 42, title, { s: title.length > 14 ? 11.5 : 12.5 }) +
    T(x + 66, y + 68, mono, { s: mono.length > 14 ? 10.5 : 11.5, m: true, w: 700 }).replace('<text ', '<text style="font-variant-ligatures:none" ') +
    T(x + 66, y + 88, plain, { s: 11, w: 700, f: P.ink2 });

  const cards = [
    [44, 'def', 'print_breakfast()', 'the () runs it', P.tint],
    [45, 'Parameters', 'return g * p / 100', 'print is not return', P.tint],
    [46, 'Defaults', 'pot(60, salt_g=0)', 'plain values first', P.tint],
    [47, 'Scope', 't = eat(t, 450)', 'pass in, hand back', P.okT],
    [48, 'Docstrings', '"""Return ..."""', 'first line inside', P.okT],
    [49, 'Small functions', 'label(protein())', 'one card, one job', P.okT],
    [50, 'Recursion', 'if folds == 0:', 'a base case stops it', P.warnT],
    [51, 'Review', 'you are here', 'mixed practice', P.warnT]
  ];
  // The recipe box: two rows of cards standing in a wooden box.
  const shelf = y => `<rect x="10" y="${y}" width="580" height="9" rx="3" fill="${P.sand}" stroke="${P.ink}" stroke-width="2"/>`;
  const recapPic = svg(600, 258, 'Eight recipe cards in a recipe box, one per lesson of module 4, each with its key code and one plain idea. Write and use a card: def, parameters and return, defaults and keyword arguments. Keep cards clean: scope, docstrings, small functions. A card that uses itself: recursion. The last card is this review.',
    T(300, 20, 'Module 4: one recipe box, seven cards', { s: 15 }) +
    cards.map((s, i) => card(21 + (i % 4) * 142, 30 + Math.floor(i / 4) * 114, ...s)).join('') +
    [138, 252].map(y => shelf(y - 4)).join(''));

  // How to play: predict, run, compare. And: the last line of an error names the problem.
  const step = (x, n, head, line1, line2, fill) =>
    box(x, 20, 170, 104, fill, 14) +
    `<circle cx="${x + 26}" cy="${42}" r="12" fill="${P.ink}"/>` + T(x + 26, 46.5, String(n), { s: 12.5, f: P.white }) +
    T(x + 46, 47, head, { s: 15, a: 'start' }) +
    T(x + 85, 82, line1, { s: 12, w: 700, f: P.ink2 }) +
    T(x + 85, 102, line2, { s: 12, w: 700, f: P.ink2 });
  const playPic = `<div style="width:100%;min-width:0">` +
    svg(600, 196, 'Three steps: 1 predict the output before you run, 2 press Run, 3 compare. Below: an error? Read its last line. TypeError, SyntaxError and UnboundLocalError each name the problem.',
      step(14, 1, 'Predict', 'say every line', 'out loud first', P.tint) +
      arrow(190, 72, 212, 72, P.accent, 3) +
      step(216, 2, 'Run', 'press Run and', 'read every line', P.warnT) +
      arrow(392, 72, 414, 72, P.accent, 3) +
      step(418, 3, 'Compare', 'surprised? that is', 'the lesson to reread', P.okT) +
      box(14, 142, 572, 40, P.dangerT, 12) +
      `<rect x="28" y="150" width="86" height="24" rx="7" fill="${P.danger}"/>` + T(71, 166.5, 'TypeError', { s: 12.5, f: P.white, m: true }) +
      T(128, 167, 'An error? Its last line names the problem. Read it first.', { s: 12.5, w: 700, a: 'start', f: P.ink })) +
    run(['# Warm up: say the output out loud, then press Run', 'def protein_in(grams, per_100g):', '    return grams * per_100g / 100', '', 'tofu = protein_in(150, 17)', 'print("Ben\'s tofu:", tofu, "g protein")'], { title: 'warm_up.py' }) +
    run(['# This one stops. Read the last line of the error first.', 'def porridge(oats_g, milk_ml=250, salt_g=1):', '    return f"{oats_g} g oats, {milk_ml} ml milk, {salt_g} g salt"', '', 'print(porridge(salt_g=0))'], { title: 'read_the_error.py' }) +
    `</div>`;

  COURSE.add({
    id: 'l51', minutes: 25,
    summary: 'Seven lessons of functions in one recipe box: <code>def</code>, parameters and return, defaults and keyword arguments, scope, docstrings, small functions and recursion. Then <b>16 mixed questions</b>, easy to hard, with <b>6 real bugs</b> to fix. Most of them you can <b>run</b>.',
    parts: [
      {
        label: 'Recap', pic: recapPic,
        h: 'One recipe box, seven cards.',
        text: [
          'Module 4 taught you to write your own <b>recipe cards</b>. Each card in the picture is one lesson, with the <b>one line of code</b> to remember and the <b>one idea</b> behind it.',
          '<b>Write and use a card</b> (blue). <code>def</code> writes the card and runs nothing. The <b>call</b>, with brackets, runs it. A name without <code>()</code> does nothing at all. Parameters are the jars on the card, and a call fills them <b>in order</b>. <code>return</code> hands a value back and ends the card at once. A card that only prints hands back <code>None</code>. A <b>default</b> fills a jar you leave out, and a <b>keyword argument</b> names the jar at the call. Plain values come first, names after.',
          '<b>Keep cards clean</b> (green). Every call cooks in its <b>own pan</b>: names made inside are local, and gone after the call. Putting a value in a counter name inside a card makes a new pan jar, so <b>pass it in and hand it back</b>. A <b>docstring</b> is a string in triple quotes, on the first line inside the card. Small cards do <b>one job</b> each and return their answer, so one card\'s answer can go straight into the next.',
          '<b>A card that uses itself</b> (orange). A recursive function calls itself on a smaller piece of the job. It needs a <b>base case</b> that answers without calling again. Without one, Python stops with <code>RecursionError</code>.'
        ],
        tip: 'Module 3 still applies: a list can change in place, so a list as a default is one basket that every call shares. And <code>.sort()</code> hands back <code>None</code>, just like a card with no <code>return</code>.'
      },
      {
        label: 'How to play', pic: playPic,
        h: 'Predict first. Then press Run.',
        text: [
          'Most questions show a small piece of Kitchen Coach you have not seen before. Before you answer, <b>say the output out loud</b>. Follow every call into its card and back out with its value. Then pick your answer, and press <b>Run</b> to check it.',
          'The <b>fix</b> questions are real code that goes wrong. Change it, then press <b>Run and check</b>. The page runs your code, checks what it prints, and also tries your card with other values. So fix the card, do not just print the right words. There is often more than one good fix.',
          'Many bugs in this module stop with an error. Read the <b>last line</b> first. <code>TypeError</code> with <code>missing</code> or <code>NoneType</code> means a jar is empty or a card handed back <code>None</code>. <code>SyntaxError</code> means Python could not even read the line. <code>UnboundLocalError</code> means a pan jar was read before it was filled. Try it now on <code>read_the_error.py</code> above.'
        ],
        warn: 'Running the code first and then picking the answer works, but it teaches you very little. The guess is where the learning happens.'
      }
    ],
    quiz: [
      {
        type: 'bucket', q: 'Warm up. The card is <code>def porridge(oats_g, milk_ml=250, salt_g=1):</code>. Does each call run, or stop with an error? Not sure? Paste the card from <code>read_the_error.py</code> and one call into any code box.',
        buckets: ['Runs', 'Stops with an error'],
        items: [
          ['porridge(80)', 0],
          ['porridge(80, 300)', 0],
          ['porridge(60, salt_g=0)', 0],
          ['porridge(salt_g=0, oats_g=60)', 0],
          ['porridge(80, 300, 2)', 0],
          ['porridge()', 1],
          ['porridge(milk_ml=300, 80)', 1],
          ['porridge(80, salt=0)', 1],
          ['porridge(80, 300, 1, 2)', 1]
        ],
        why: '<code>oats_g</code> has no default, so <code>porridge()</code> stops: <code>missing 1 required positional argument</code>. A plain value after a named one is a <code>SyntaxError</code>. <code>salt</code> is not a jar on the card (Python asks: Did you mean \'salt_g\'?), and four values do not fit three jars. Named jars can come in any order, and plain values fill the jars from the left.',
        hint: 'Lesson 46: is the oats jar filled, do plain values come before names, and does every name match a jar on the card?'
      },
      {
        type: 'pick', q: 'Chloe\'s dessert card is written. What does Kitchen Coach print?',
        pic: run(['def print_dessert():', '    print("Rice pudding for Chloe")', '', 'print("Dinner is ready")', 'print_dessert', 'print("Enjoy!")'], { title: 'dinner.py' }),
        options: ['Dinner is ready, then Rice pudding for Chloe, then Enjoy!', 'Dinner is ready, then Enjoy!', 'Dinner is ready, then an error', 'Rice pudding for Chloe, then Dinner is ready, then Enjoy!'],
        answer: 1,
        why: 'Line 5 only <b>names</b> the card. It has no brackets, so it is not a call. Python sees nothing wrong: no error, and no pudding. <code>print_dessert()</code> with brackets would run it.',
        hint: 'Lesson 44: what turns a name into a call?'
      },
      {
        type: 'type', q: 'Ben has 300 g of Greek yogurt (10 g of protein in every 100 g) and 100 g of eggs (13 g in every 100 g). Predict the output. Type exactly what appears, then press Run on the code to check.',
        pic: run(['def protein_in(grams, per_100g):', '    return grams * per_100g / 100', '', 'breakfast = protein_in(300, 10) + protein_in(100, 13)', 'print(breakfast)'], { title: 'ben_breakfast.py' }),
        prompt: 'output >',
        answers: ['43.0'],
        accept: '^43\\.0$',
        why: 'Each call becomes its value. 300 * 10 / 100 is 30.0, and 100 * 13 / 100 is 13.0. <code>/</code> always gives a float, so the sum is <code>43.0</code>, not 43.',
        hint: 'Lesson 45: work out each call, then add. What kind of number does / give?'
      },
      {
        type: 'match', q: 'Match each word from this module to what it means on a recipe card.',
        pairs: [
          ['parameter', 'a named empty jar on the def line, like grams'],
          ['return', 'hands the dish back to the caller and leaves the card'],
          ['default', 'the usual amount, written on the card: salt_g=1'],
          ['keyword argument', 'names the jar at the call: salt_g=0'],
          ['local name', 'a jar in the pan, washed away when the call ends'],
          ['docstring', 'the note in triple quotes, first line inside the card'],
          ['base case', 'the call that answers at once, without calling itself']
        ],
        why: 'The jars on the card are parameters, and a default gives one a usual amount. A keyword argument names a jar at the call. <code>return</code> hands the dish back. Names made inside a call are local. The docstring is the note at the top. And a recursive card stops at its base case.',
        hint: 'Start with the ones you are sure of. Which ones are written on the def line, and which at the call?'
      },
      {
        type: 'pick', q: 'Ben eats three snacks. Kitchen Coach adds up their protein. What does it print?',
        pic: run(['def total_protein(snacks_g):', '    total = 0', '    for g in snacks_g:', '        total += g', '        return total', '', 'print(total_protein([25, 8, 30]))'], { title: 'snacks.py' }),
        options: ['63', '25', 'None', '0'],
        answer: 1,
        why: '<code>return</code> is pushed in under the <code>for</code>, so it is <b>inside</b> the loop. In the first round <code>total</code> becomes 25, and <code>return</code> hands it back and leaves the card at once. The loop never gets to 8 or 30. Move <code>return total</code> back 4 spaces, in line with the <code>for</code>, to get 63.',
        hint: 'Lesson 45: return ends the card right away. Which block is the return in?'
      },
      {
        type: 'pick', q: 'Ben\'s chili card feeds 4. What does this print?',
        pic: run(['servings = 4', '', 'def scale(recipe_grams):', '    servings = 8', '    return recipe_grams / 4 * servings', '', 'print(scale(600), servings)'], { title: 'scale.py' }),
        options: ['1200.0 8', '600.0 4', '1200.0 4', "UnboundLocalError: cannot access local variable 'servings'"],
        answer: 2,
        why: 'Line 4 puts 8 in a <b>pan</b> jar called <code>servings</code>, and the card uses its own jar: 600 / 4 * 8 is 1200.0. The counter jar on line 1 is a different jar, never touched, so it still holds 4. There is no error: the pan jar gets its value on line 4, before line 5 reads it.',
        hint: 'Lesson 47: does = inside the card change the counter jar, or make a pan jar?'
      },
      {
        type: 'pick', q: 'Chloe\'s cake card has a comment and a note. What does this print?',
        pic: run(['def oven_minutes(cake_g):', '    # Bake time for Chloe\'s cakes.', '    minutes = 20 + cake_g / 50', '    """Return the minutes to bake a cake of this many grams."""', '    return minutes', '', 'print(oven_minutes(500), oven_minutes.__doc__)'], { title: 'cake.py' }),
        options: ["30.0 Bake time for Chloe's cakes.", '30.0 Return the minutes to bake a cake of this many grams.', 'SyntaxError', '30.0 None'],
        answer: 3,
        why: 'The comment on line 2 is skipped, as every comment is. The string on line 4 comes after a line of code, so it is a lost string, not a docstring. The card still works: 20 + 500 / 50 is 30.0. But <code>__doc__</code> is <code>None</code>, and no error tells you.',
        hint: 'Lesson 48: a docstring must be a string, and the first line inside the card.'
      },
      {
        type: 'fill', q: 'Two small cards, one job each. Fill the blanks so the program prints <code>Ben: 25.5 g protein</code>.',
        text: 'def protein_in(grams, per_100g):\n    ___ grams * per_100g / 100\n\ndef label(name, grams):\n    return f"{name}: {grams} g protein"\n\nprint(label("Ben", ___(150, 17)))',
        options: ['return', 'print', 'protein_in', 'label', 'def'],
        answer: ['return', 'protein_in'],
        why: '<code>protein_in</code> works out a number, so it must <b>return</b> it, not print it. Then the call <code>protein_in(150, 17)</code> becomes 25.5, and that value goes straight into <code>label</code> as its second argument. Small cards that hand back values can be joined like this.',
        hint: 'Lesson 49: a card that works something out hands it back. Which card gives the grams of protein?'
      },
      {
        type: 'pick', q: 'Puff pastry: every fold doubles the layers. A sheet with no folds is 1 layer. What does this print?',
        pic: run(['def layers(folds):', '    if folds == 0:', '        return 1', '    return 2 * layers(folds - 1)', '', 'print(layers(4))'], { title: 'puff_pastry.py' }),
        options: ['8', '16', '32', 'RecursionError: maximum recursion depth exceeded'],
        answer: 1,
        why: '<code>layers(4)</code> is 2 * <code>layers(3)</code>, which is 2 * <code>layers(2)</code>, and so on down to <code>layers(0)</code>. That is the base case: it returns 1 without calling again. Then the answers come back up, doubling each time: 2, 4, 8, 16.',
        hint: 'Lesson 50: follow the calls down to folds == 0, then double on the way back up.'
      },
      {
        type: 'pick', q: 'Someone deleted the base case. This one has no Run button. What happens when you run it?',
        pic: code(['def layers(folds):', '    return 2 * layers(folds - 1)', '', 'print(layers(4))'], { title: 'no_base_case.py' }),
        options: ['It prints 16', 'It prints 0', 'It runs forever, until you press Stop', 'RecursionError: maximum recursion depth exceeded'],
        answer: 3,
        why: 'Nothing tells the card to stop. <code>layers(4)</code> calls <code>layers(3)</code>, then 2, 1, 0, -1, -2, and on. Each call waits for the next one. Python has a limit on how many calls can wait at once, about 1000, and stops with <code>RecursionError</code> long before forever.',
        hint: 'Lesson 50: which call answers without calling again? Is there one?'
      },
      {
        type: 'fix', q: 'Chloe bakes 1200 kcal of cake and cuts it into 4 slices. Kitchen Coach stops with <code>TypeError: per_slice() missing 1 required positional argument: \'slices\'</code>. Fix it so it prints <code>Chloe\'s cake: 300.0 kcal a slice</code>.',
        code: ['def per_slice(total_kcal, slices):', '    return total_kcal / slices', '', 'cake = per_slice(1200)', 'print(f"Chloe\'s cake: {cake} kcal a slice")'],
        title: 'cake_slices.py',
        check: [
          'f = globals().get("per_slice")',
          'want = "Chloe\'s cake: 300.0 kcal a slice"',
          'if not callable(f):',
          '    msg = "Keep the card called per_slice."',
          'elif out == want:',
          '    try:',
          '        ok = f(800, 4) == 200',
          '    except TypeError:',
          '        ok = False',
          '    if not ok:',
          '        msg = "Right words, but keep the card working for any cake: per_slice(800, 4) should give 200.0."',
          'elif "0.0033" in out:',
          '    msg = "The jars are swapped: 4 went into total_kcal. Pass the kcal first, then the slices."',
          'else:',
          '    msg = "It should print: Chloe\'s cake: 300.0 kcal a slice"'
        ].join('\n'),
        why: 'The card has two jars, so the call needs two values: <code>per_slice(1200, 4)</code>. Clearer still: <code>per_slice(1200, slices=4)</code>. A default on the card, <code>slices=4</code>, works too.',
        hint: 'Lesson 45: count the jars on the card, then count the values in the call.'
      },
      {
        type: 'fix', q: 'Chloe\'s gluten-free pasta needs less salt. Python stops before anything runs: <code>SyntaxError: positional argument follows keyword argument</code>. Fix the call so it prints <code>100 g pasta, 1 l water, 5 g salt</code>.',
        code: ['def make_pasta(grams, water_l=1, salt_g=10):', '    return f"{grams} g pasta, {water_l} l water, {salt_g} g salt"', '', 'print(make_pasta(salt_g=5, 100))'],
        title: 'chloe_pasta.py',
        check: [
          'f = globals().get("make_pasta")',
          'try:',
          '    same = f(200, 2, 20) == "200 g pasta, 2 l water, 20 g salt" and f(120) == "120 g pasta, 1 l water, 10 g salt"',
          'except TypeError:',
          '    same = False',
          'if out == "100 g pasta, 1 l water, 5 g salt" and same:',
          '    ok = True',
          'elif out == "100 g pasta, 1 l water, 5 g salt":',
          '    msg = "Right output, but the card changed. Leave the def line as it was, and fix the call."',
          'elif "10 g salt" in out:',
          '    msg = "Chloe still gets 10 g of salt. Name the salt jar in the call: salt_g=5."',
          'elif "5 l water" in out:',
          '    msg = "The 5 went into the water jar. Plain values fill the jars in order. Name the salt jar instead."',
          'else:',
          '    msg = "It should print: 100 g pasta, 1 l water, 5 g salt"'
        ].join('\n'),
        why: 'Plain values first, names after: <code>make_pasta(100, salt_g=5)</code>. Naming both, <code>make_pasta(salt_g=5, grams=100)</code>, works too. The water is left out, so it keeps its default, 1.',
        hint: 'Lesson 46: plain values first, names after.'
      },
      {
        type: 'fix', q: 'Ana\'s dinner card prints instead of returning. Press Run: two numbers appear, then <code>TypeError: unsupported operand type(s) for +: \'NoneType\' and \'NoneType\'</code>. Fix the card so the program prints only <code>Ana\'s dinner: 406.0 kcal</code>.',
        code: ['def kcal_in(grams, per_100g):', '    print(grams * per_100g / 100)', '', 'pasta = kcal_in(200, 158)    # cooked pasta', 'sauce = kcal_in(150, 60)     # tomato sauce', 'print(f"Ana\'s dinner: {pasta + sauce} kcal")'],
        title: 'ana_dinner.py',
        check: [
          'import io, contextlib',
          'f = globals().get("kcal_in")',
          'shown = io.StringIO()',
          'try:',
          '    with contextlib.redirect_stdout(shown):',
          '        back = f(100, 144)',
          'except TypeError:',
          '    back = "no"',
          'if back == 144 and shown.getvalue() == "" and out == "Ana\'s dinner: 406.0 kcal":',
          '    ok = True',
          'elif back is None:',
          '    msg = "kcal_in still hands back None. Change print(...) on line 2 to return ..."',
          'elif shown.getvalue() != "":',
          '    msg = "The card returns now, but it still prints too. Let it only return. Print outside the card."',
          'elif back != 144:',
          '    msg = "kcal_in(100, 144) should give 144.0. Keep the jars and the maths: grams * per_100g / 100."',
          'else:',
          '    msg = "It printed: " + out + ". It should print only: Ana\'s dinner: 406.0 kcal"'
        ].join('\n'),
        why: 'Line 2 becomes <code>return grams * per_100g / 100</code>. Now each call becomes a number: 316.0 for the pasta and 90.0 for the sauce. They add up to 406.0, and the only print is outside the card.',
        hint: 'Lesson 45: a card with no return hands back None. Which word hands a value back, instead of showing it?'
      },
      {
        type: 'fix', q: 'Each friend should get a new basket with one item. Press Run: every basket holds all three. Fix the card so it prints <code>[\'bananas\'] [\'tofu\'] [\'berries\']</code>. A call that brings its own basket must still work.',
        code: ['def start_basket(item, basket=[]):', '    basket.append(item)', '    return basket', '', 'ana = start_basket("bananas")', 'ben = start_basket("tofu")', 'chloe = start_basket("berries")', 'print(ana, ben, chloe)'],
        title: 'baskets.py',
        check: [
          'f = globals().get("start_basket")',
          'if not callable(f):',
          '    msg = "Keep the card called start_basket."',
          'elif out != "[\'bananas\'] [\'tofu\'] [\'berries\']":',
          '    if out.count("bananas") > 1:',
          '        msg = "The baskets are still shared. The [] on the def line is made only once. Default to None, and make a new [] inside the card."',
          '    else:',
          '        msg = "It should print: [\'bananas\'] [\'tofu\'] [\'berries\']"',
          'else:',
          '    try:',
          '        mine = f("milk", ["oats"])',
          '        f("salt")',
          '        fresh = f("rice")',
          '    except TypeError:',
          '        mine = fresh = None',
          '    if mine != ["oats", "milk"]:',
          '        msg = "Your own basket must still work: start_basket(\\"milk\\", [\\"oats\\"]) should give [\'oats\', \'milk\']."',
          '    elif fresh != ["rice"]:',
          '        msg = "Call it twice more and the baskets are shared again. Make the new [] inside the card, at every call."',
          '    else:',
          '        ok = True'
        ].join('\n'),
        why: 'The default <code>[]</code> is made once, when Python reads the <code>def</code> line, so every call shares that one basket. Default to <code>None</code> instead: <code>def start_basket(item, basket=None):</code>, then <code>if basket is None:</code> and <code>basket = []</code> inside the card. Now each call that leaves the basket out gets a new one.',
        hint: 'Lesson 46: how many times is the [] on the def line made? Which safe default did the lesson use instead?'
      },
      {
        type: 'fix', q: 'Kitchen Coach counts plates for the table and stops with <code>UnboundLocalError</code>. Fix it <b>without</b> <code>global</code>: make the card <code>add_plates(total, n)</code> hand back the new total, and store it, so the program prints <code>Set 4 plates</code>.',
        code: ['plates = 0', '', 'def add_plates(n):', '    plates = plates + n', '', 'add_plates(3)    # Ana, Ben and Chloe', 'add_plates(1)    # and you', 'print(f"Set {plates} plates")'],
        title: 'plates.py',
        check: [
          'import dis',
          'f = globals().get("add_plates")',
          'if not callable(f):',
          '    msg = "Keep the card called add_plates."',
          'elif any(i.opname == "STORE_GLOBAL" for i in dis.get_instructions(f)):',
          '    msg = "It works, but the card changes the counter jar with global. Pass the total in and return the new total instead."',
          'else:',
          '    try:',
          '        back = f(10, 2)',
          '    except TypeError:',
          '        back = "no"',
          '    if back == "no":',
          '        msg = "Give the card two jars: def add_plates(total, n):"',
          '    elif back is None:',
          '        msg = "add_plates(10, 2) handed back None. Did you forget return?"',
          '    elif back != 12:',
          '        msg = "add_plates(10, 2) should hand back 12. Use the jars: return total + n"',
          '    elif out != "Set 4 plates":',
          '        msg = "It printed: " + out + ". Store what the card hands back: plates = add_plates(plates, 3)"',
          '    else:',
          '        ok = True'
        ].join('\n'),
        why: 'The card becomes <code>def add_plates(total, n):</code> with <code>return total + n</code>. The calls become <code>plates = add_plates(plates, 3)</code> and <code>plates = add_plates(plates, 1)</code>. The value goes in, the new value comes back, and the counter jar changes on a line you can see.',
        hint: 'Lesson 47: two jars on the card, return the sum, and put plates = in front of each call.'
      },
      {
        type: 'fix', q: 'Hardest one. A recipe can have parts, and a part can have parts of its own. The lasagne bakes for 45 minutes. Its ragu cooks for 40, after a 10 minute soffritto, and the bechamel takes 15. Kitchen Coach prints <code>Lasagne: 45 minutes</code>. Fix the card so it prints <code>Lasagne: 110 minutes</code>.',
        code: [
          'def total_minutes(recipe):',
          '    minutes = recipe["minutes"]',
          '    for part in recipe["parts"]:',
          '        total_minutes(part)',
          '    return minutes',
          '',
          'soffritto = {"minutes": 10, "parts": []}',
          'ragu = {"minutes": 40, "parts": [soffritto]}',
          'bechamel = {"minutes": 15, "parts": []}',
          'lasagne = {"minutes": 45, "parts": [ragu, bechamel]}',
          'print(f"Lasagne: {total_minutes(lasagne)} minutes")'
        ],
        title: 'lasagne.py',
        check: [
          'f = globals().get("total_minutes")',
          'if out == "Lasagne: 110 minutes":',
          '    try:',
          '        t = f({"minutes": 5, "parts": [{"minutes": 2, "parts": [{"minutes": 1, "parts": []}]}]})',
          '    except Exception:',
          '        t = None',
          '    if t == 8:',
          '        ok = True',
          '    else:',
          '        msg = "The lasagne is right, but the card must work for any recipe. Let every part add up its own parts."',
          'elif out == "Lasagne: 100 minutes":',
          '    msg = "The soffritto is missing. Do not add part[\\"minutes\\"]. Call total_minutes(part), so each part adds its own parts too."',
          'elif out == "Lasagne: 45 minutes":',
          '    msg = "Still 45. The call on line 4 hands back the part\'s minutes, but nothing keeps them. Add them to minutes."',
          'else:',
          '    msg = "It should print: Lasagne: 110 minutes"'
        ].join('\n'),
        why: 'The call <code>total_minutes(part)</code> <b>becomes</b> that part\'s minutes, with all its own parts. But line 4 throws the number away, as <code>plate_up(800)</code> did in lesson 47. Keep it: <code>minutes += total_minutes(part)</code>. A recipe with no parts is the base case: the loop does not run, and the card returns its own minutes.',
        hint: 'Lesson 45: a call becomes its value. Where does line 4 put that value?'
      }
    ]
  });
})();
