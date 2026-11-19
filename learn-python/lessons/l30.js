/* Lesson 30: Review: decisions and loops (module 2). Quiz only, no video, no exercise. */
(function () {
  const { P, code, run, svg, box, T, arrow } = PR;

  /* =====================================================================
     l30  Review: decisions and loops
     ===================================================================== */

  // One station on the stove: a burner tab with the lesson number, then a card with the title, the key code and one plain line.
  const station = (x, y, n, title, mono, plain, tint) =>
    `<rect x="${x + 22}" y="${y}" width="88" height="18" rx="5" fill="${P.ink}"/>` +
    `<circle cx="${x + 34}" cy="${y + 9}" r="5.5" fill="none" stroke="${P.warnT}" stroke-width="1.6"/>` +
    `<circle cx="${x + 34}" cy="${y + 9}" r="2" fill="${P.warnT}"/>` +
    T(x + 72, y + 13.5, 'Lesson ' + n, { s: 10.5, f: P.white }) +
    box(x, y + 16, 132, 88, P.white, 16) +
    `<rect x="${x + 7}" y="${y + 24}" width="118" height="72" rx="8" fill="${tint}" stroke="${P.ink}" stroke-width="1.5"/>` +
    T(x + 66, y + 42, title, { s: title.length > 14 ? 11.5 : 12.5 }) +
    T(x + 66, y + 64, mono, { s: mono.length > 14 ? 10.5 : 11.5, m: true, w: 700 }).replace('<text ', '<text style="font-variant-ligatures:none" ') +
    T(x + 66, y + 86, plain, { s: 11, w: 700, f: P.ink2 });

  const stations = [
    [19, 'if', 'if soup_c > 90:', 'runs only if True', P.tint],
    [20, 'else and elif', 'elif c >= 70:', 'first True wins', P.tint],
    [21, 'Comparisons', 'oven_c >= 180', '>= means at least', P.tint],
    [22, 'and, or, not', 'veg and gf', 'both, one, flipped', P.tint],
    [23, 'Truthy and falsy', 'if plate:', 'empty counts as no', P.tint],
    [24, 'match and case', 'case "P" | "F":', 'first case wins', P.tint],
    [25, 'while loops', 'while stirs < 5:', 'set, check, change', P.okT],
    [26, 'for loops', 'for g in guests:', 'once per item', P.okT],
    [27, 'range', 'range(1, 8)', 'stop is left out', P.okT],
    [28, 'break, continue', 'continue / break', 'skip one, or leave', P.okT],
    [29, 'Nested loops', 'for g: for c:', 'inner runs in full', P.okT],
    [30, 'Review', 'you are here', 'mixed practice', P.warnT]
  ];
  // The stove top under each row of stations.
  const rail = y => `<rect x="10" y="${y}" width="580" height="9" rx="3" fill="${P.sand}" stroke="${P.ink}" stroke-width="2"/>`;
  const recapPic = svg(600, 372, 'Twelve stations on a stove, one per lesson of module 2, each with its key code and one plain idea. Decisions: if, else and elif, comparisons, and or not, truthy and falsy, match and case. Loops: while, for, range, break and continue, nested loops. The last station is this review.',
    T(300, 20, 'Module 2: one stove, eleven stations', { s: 15 }) +
    stations.map((s, i) => station(21 + (i % 4) * 142, 30 + Math.floor(i / 4) * 114, ...s)).join('') +
    [138, 252, 366].map(y => rail(y - 4)).join(''));

  // How to play: predict, run, compare. And the Stop button for a loop that never ends.
  const step = (x, n, head, line1, line2, fill) =>
    box(x, 20, 170, 104, fill, 14) +
    `<circle cx="${x + 26}" cy="${42}" r="12" fill="${P.ink}"/>` + T(x + 26, 46.5, String(n), { s: 12.5, f: P.white }) +
    T(x + 46, 47, head, { s: 15, a: 'start' }) +
    T(x + 85, 82, line1, { s: 12, w: 700, f: P.ink2 }) +
    T(x + 85, 102, line2, { s: 12, w: 700, f: P.ink2 });
  const playPic = `<div style="width:100%;min-width:0">` +
    svg(600, 196, 'Three steps: 1 predict the output before you run, 2 press Run, 3 compare. Below: a loop that never ends? Press the red Stop button. After 10 seconds the page stops it for you.',
      step(14, 1, 'Predict', 'say every line', 'out loud first', P.tint) +
      arrow(190, 72, 212, 72, P.accent, 3) +
      step(216, 2, 'Run', 'press Run and', 'read every line', P.warnT) +
      arrow(392, 72, 414, 72, P.accent, 3) +
      step(418, 3, 'Compare', 'surprised? that is', 'the lesson to reread', P.okT) +
      box(14, 142, 572, 40, P.dangerT, 12) +
      `<rect x="28" y="150" width="70" height="24" rx="7" fill="${P.danger}"/>` + T(63, 166.5, '■ Stop', { s: 12.5, f: P.white }) +
      T(112, 167, 'A loop that never ends? Press Stop. After 10 s the page stops it.', { s: 12.5, w: 700, a: 'start', f: P.ink })) +
    run(['# Warm up: say all three lines out loud, then press Run', 'for guest in ["Ana", "Ben", "Chloe"]:', '    if guest == "Ben":', '        print(guest, "gets the bean chili")', '    else:', '        print(guest, "gets the chicken")'], { title: 'warm_up.py' }) +
    run(['# This loop never ends: nothing changes stirs.', '# Press Run, watch it pour out, then press Stop.', 'stirs = 0', 'while stirs < 3:', '    print("Stir")', 'print("Done")'], { title: 'stop_me.py' }) +
    `</div>`;

  COURSE.add({
    id: 'l30', minutes: 25,
    summary: 'Eleven lessons of decisions and loops on one stove: <code>if</code>, <code>else</code> and <code>elif</code>, comparisons, <code>and</code>/<code>or</code>/<code>not</code>, truthy and falsy, <code>match</code>, <code>while</code>, <code>for</code>, <code>range</code>, <code>break</code> and <code>continue</code>, and nested loops. Then <b>16 mixed questions</b>, easy to hard, with <b>7 real bugs</b> to fix. Most of them you can <b>run</b>.',
    parts: [
      {
        label: 'Recap', pic: recapPic,
        h: 'One stove, eleven stations.',
        text: [
          'Module 2 taught your program to <b>decide</b> and to <b>repeat</b>. Each station in the picture is one lesson, with the <b>one line of code</b> to remember and the <b>one idea</b> behind it.',
          '<b>Decisions</b> (blue). An <code>if</code> asks a question and runs its block only when the answer is True. <code>elif</code> adds more paths and the <b>first True wins</b>, so the narrow check goes first. Comparisons like <code>&gt;=</code> give the answer, <code>and</code>, <code>or</code> and <code>not</code> join answers, and an empty value counts as no. <code>match</code> picks a path by one fixed value.',
          '<b>Loops</b> (green). <code>while</code> repeats as long as a question is True, so something inside must <b>change</b>. <code>for</code> runs once per item. <code>range</code> hands it numbers, and the stop is never included. <code>continue</code> skips one round, <code>break</code> leaves the loop. A loop inside a loop runs <b>in full</b> for every round of the outer one.',
          '<b>Spaces</b> hold it all together. The colon opens a block, and the spaces in front of a line say which <code>if</code> or loop it belongs to.'
        ],
        tip: 'Module 1 still applies: <code>input()</code> always hands back text, so convert it before you compare it with a number. And an f-string fills values into text.'
      },
      {
        label: 'How to play', pic: playPic,
        h: 'Predict first. Then press Run.',
        text: [
          'Most questions show a small piece of Kitchen Coach you have not seen before. Before you answer, <b>say the output out loud</b>, line by line. With a loop, say one line per round. Then pick your answer, and press <b>Run</b> to check it.',
          'The <b>fix</b> questions are real code that goes wrong. Change it, then press <b>Run and check</b>. The page runs your code and checks what it prints. There is often more than one good fix.',
          'One of the bugs is a loop that <b>never ends</b>. That is safe here. Press the red <b>Stop</b> button, or wait: after 10 seconds the page stops it by itself. Try it now on <code>stop_me.py</code> above.'
        ],
        warn: 'Running the code first and then picking the answer works, but it teaches you very little. The guess is where the learning happens.'
      }
    ],
    quiz: [
      {
        type: 'bucket', q: 'Warm up. Would <code>if value:</code> run its block? Sort each value. Not sure? Ask Python: <code>print(bool(...))</code> in any code box.',
        buckets: ['Truthy: the block runs', 'Falsy: the block is skipped'],
        items: [
          ['250', 0],
          ['-1', 0],
          ['" "', 0],
          ['"0"', 0],
          ['"False"', 0],
          ['0', 1],
          ['0.0', 1],
          ['""', 1],
          ['None', 1],
          ['False', 1]
        ],
        why: 'Only the empty things are falsy: <code>0</code>, <code>0.0</code>, empty text <code>""</code>, <code>None</code> and <code>False</code>. Everything else counts as yes. <code>" "</code> holds a space, and <code>"0"</code> and <code>"False"</code> are text with letters in them, so they are not empty.',
        hint: 'Lesson 23: falsy means empty or zero. Is text with something in it ever empty?'
      },
      {
        type: 'pick', q: 'The soup is at exactly 90 degrees. What does Kitchen Coach print?',
        pic: run(['soup_c = 90', 'if soup_c > 90:', '    print("Boiling, turn it down")', 'elif soup_c >= 70:', '    print("Simmering nicely")', 'else:', '    print("Too cold, heat it")'], { title: 'soup.py' }),
        options: ['Simmering nicely', 'Boiling, turn it down', 'Boiling, turn it down, then Simmering nicely', 'Too cold, heat it'],
        answer: 0,
        why: '<code>90 &gt; 90</code> is False: 90 is not more than 90. So Python asks the <code>elif</code>: <code>90 &gt;= 70</code> is True, and its block runs. Exactly one block of a chain runs, so the <code>else</code> is skipped.',
        hint: 'Lesson 21: is 90 more than 90? Then lesson 20: Python asks the questions top to bottom.'
      },
      {
        type: 'pick', q: 'Back to lesson 15. Ana runs 21.1 km over 3 weeks. What does this print?',
        pic: run(['ana_km = 21.1', 'weeks = 3', 'print(f"Ana: {ana_km / weeks:.1f} km a week")'], { title: 'ana_km.py' }),
        options: ['Ana: 7.0 km a week', 'Ana: 7.033333333333333 km a week', 'Ana: 7 km a week', 'Ana: {ana_km / weeks:.1f} km a week'],
        answer: 0,
        why: '21.1 divided by 3 is 7.0333... The <code>:.1f</code> after the sum asks for one digit after the point, so the f-string fills in <code>7.0</code>. The <code>f</code> in front is there, so the braces are filled, not printed.',
        hint: 'What does <code>:.1f</code> do to a long number? Count the digits after the point.'
      },
      {
        type: 'pick', q: 'A pasta order comes in for a table of 6. Which pot does Kitchen Coach pick?',
        pic: run(['order = "P"', 'guests = 6', 'match order:', '    case "P" if guests > 6:', '        print("Big pasta pot")', '    case "P":', '        print("Small pasta pot")', '    case _:', '        print("Ask the waiter")'], { title: 'tickets.py' }),
        options: ['Small pasta pot', 'Big pasta pot', 'Ask the waiter', 'Big pasta pot, then Small pasta pot'],
        answer: 0,
        why: 'The first case fits the <code>"P"</code>, but its guard asks <code>6 &gt; 6</code>, which is False. So Python tries the next case: <code>"P"</code> fits, and that block runs. Only one case ever runs.',
        hint: 'Lesson 24: a case runs only when the value fits AND its guard is True. Is 6 more than 6?'
      },
      {
        type: 'match', q: 'Match each tool from this module to the kitchen job it does.',
        pairs: [
          ['if / elif / else', 'too hot, too cold or just right: one path from several questions'],
          ['match / case', 'read the code on the ticket and pick the station'],
          ['while', 'keep stirring as long as the sauce is thin'],
          ['for', 'serve each guest at the table, one after another'],
          ['range(1, 21)', 'hand a loop the numbers 1 to 20'],
          ['break', 'the smoke alarm: leave the loop right now'],
          ['continue', 'skip the burnt cookie, go on with the next one'],
          ['for ... else', 'runs only when the loop ended without a break']
        ],
        why: 'One tool, one job. A question about one value with fixed answers is a <code>match</code>. "As long as" is a <code>while</code>. "For each" is a <code>for</code>. The <code>else</code> of a loop reads as "no break".',
        hint: 'Start with the ones you are sure of. The stations at the top of this page have most of them.'
      },
      {
        type: 'type', q: 'Every guest gets three courses. Predict the output. Type exactly what appears, then press Run on the code to check.',
        pic: run(['plates = 0', 'for guest in ["Ana", "Ben", "Chloe"]:', '    for course in range(1, 4):', '        plates += 1', 'print("Plates to wash:", plates)'], { title: 'wash_up.py' }),
        prompt: 'output >',
        answers: ['Plates to wash: 9'],
        why: '<code>range(1, 4)</code> gives 1, 2 and 3: three courses, because the stop 4 is left out. The inner loop runs in full for each of the 3 guests, so <code>plates += 1</code> runs 3 times 3, which is 9 times. The <code>print</code> is at the left edge, so it runs once, after both loops.',
        hint: 'How many numbers does <code>range(1, 4)</code> give? And how many times does the inner loop run in full?'
      },
      {
        type: 'order', q: 'Trace this loop. Put the steps in the order Python does them.',
        pic: run(['sauce_ml = 300', 'while sauce_ml > 150:', '    sauce_ml -= 60', '    print(f"Simmer: {sauce_ml} ml left")', 'print("Thick enough")'], { title: 'reduce.py' }),
        items: [
          'Fill the jar: sauce_ml is 300',
          'Ask 300 > 150: True. Take 60 away, print 240',
          'Ask 240 > 150: True. Take 60 away, print 180',
          'Ask 180 > 150: True. Take 60 away, print 120',
          'Ask 120 > 150: False. The loop is over',
          'Print Thick enough'
        ],
        why: 'A <code>while</code> asks its question <b>before every round</b>. The jar shrinks by 60 each round: 240, 180, 120. At 120 the answer is False, so the loop ends and Python goes on with the first line at the left edge. Three rounds, four questions.',
        hint: 'The question comes before each round, including one last time when the answer is False.'
      },
      {
        type: 'pick', q: 'Chloe tastes her caramel at odd minutes only, and the timer rings at minute 5. What does this print?',
        pic: run(['for minute in range(1, 8):', '    if minute % 2 == 0:', '        continue', '    if minute == 5:', '        print("Timer rings at", minute)', '        break', '    print("Taste at minute", minute)', 'else:', '    print("The timer never rang")'], { title: 'caramel.py' }),
        options: [
          'Taste at minute 1, Taste at minute 3, Timer rings at 5',
          'Taste at minute 1, Taste at minute 3, Timer rings at 5, The timer never rang',
          'Taste at minute 1 to 7, then The timer never rang',
          'Taste at minute 1, Taste at minute 3, Timer rings at 5, Taste at minute 7'
        ],
        answer: 0,
        why: 'Even minutes hit <code>continue</code>, so nothing more happens in those rounds. Minutes 1 and 3 are tasted. At 5 the timer rings and <code>break</code> leaves the loop, so 7 is never reached. The loop ended with a break, so its <code>else</code> stays quiet.',
        hint: 'Lesson 28: continue skips the rest of one round. break leaves the loop. A loop else means "no break happened".'
      },
      {
        type: 'fix', q: 'Press Run and read the error. Fix it so it prints one plate per guest, then <code>All plated</code> once. There is more than one problem: after each fix, run it again.',
        code: ['for guest in ["Ana", "Ben", "Chloe"]', 'print(f"Plate for {guest}")', 'print("All plated")'],
        title: 'plates.py',
        check: [
          'want = "Plate for Ana\\nPlate for Ben\\nPlate for Chloe\\nAll plated"',
          'if out == want:',
          '    ok = True',
          'elif out.count("All plated") > 1:',
          '    msg = "All plated is printed every round. Only the plate line belongs inside the loop."',
          'else:',
          '    msg = "It should print three lines, Plate for Ana, Plate for Ben, Plate for Chloe, then All plated."'
        ].join('\n'),
        why: 'A <code>for</code> line ends with a colon, and the block under it is pushed in by 4 spaces. <code>print("All plated")</code> stays at the left edge, so it runs once, after the loop.',
        hint: 'Lesson 19: the colon opens a block, and the block is pushed in. Which line belongs inside the loop?'
      },
      {
        type: 'fix', q: 'Chloe is gluten-free. Kitchen Coach says every dish has flour, even the rice pudding. Fix line 2 so it prints <code>pancakes: has flour, not for Chloe</code>, <code>rice pudding: safe for Chloe</code>, <code>cake: has flour, not for Chloe</code>.',
        code: ['for dish in ["pancakes", "rice pudding", "cake"]:', '    if dish == "pancakes" or "cake":', '        print(f"{dish}: has flour, not for Chloe")', '    else:', '        print(f"{dish}: safe for Chloe")'],
        title: 'chloe_check.py',
        check: [
          'want = "pancakes: has flour, not for Chloe\\nrice pudding: safe for Chloe\\ncake: has flour, not for Chloe"',
          'if out == want:',
          '    ok = True',
          'elif "rice pudding: has flour" in out:',
          '    msg = "The rice pudding still has flour. The right side of or must be a whole question too."',
          'else:',
          '    msg = "Keep the three dishes. It should print the three lines in the question."'
        ].join('\n'),
        why: '<code>or "cake"</code> does not compare anything. The text <code>"cake"</code> is not empty, so it is truthy, and the whole question is always yes. Ask the whole question twice: <code>dish == "pancakes" or dish == "cake"</code>.',
        hint: 'Lesson 22: what is on the right of the <code>or</code>? Is it a question, or just some text that is never empty?'
      },
      {
        type: 'fix', q: 'Ben\'s goal is 120 g of protein a day. At 125 g, Kitchen Coach says "nearly there". Fix it so it prints <code>95 g: eat more protein</code>, <code>110 g: nearly there</code>, <code>125 g: goal reached</code>.',
        code: ['for protein_g in [95, 110, 125]:', '    if protein_g >= 100:', '        print(f"{protein_g} g: nearly there")', '    elif protein_g >= 120:', '        print(f"{protein_g} g: goal reached")', '    else:', '        print(f"{protein_g} g: eat more protein")'],
        title: 'ben_protein.py',
        check: [
          'want = "95 g: eat more protein\\n110 g: nearly there\\n125 g: goal reached"',
          'if out == want:',
          '    ok = True',
          'elif "125 g: nearly there" in out:',
          '    msg = "125 still stops at nearly there. 125 is at least 100 too, and the first True wins."',
          'else:',
          '    msg = "Keep the three amounts. It should print the three lines in the question."'
        ].join('\n'),
        why: 'Python asks top to bottom and the <b>first True wins</b>. 125 is at least 100, so the wide check catches it before the goal check is ever asked. Put the narrow check <code>&gt;= 120</code> first, then <code>&gt;= 100</code>.',
        hint: 'Lesson 20: which check is narrower, at least 100 or at least 120? It must come first.'
      },
      {
        type: 'fix', q: 'Ana needs <b>at least</b> 60 g of carbs before a long run. With exactly 60 g she is told to eat a banana. Fix it so the middle line reads <code>60 g: ready to run</code>.',
        code: ['for carbs_g in [45, 60, 80]:', '    if carbs_g > 60:', '        print(f"{carbs_g} g: ready to run")', '    else:', '        print(f"{carbs_g} g: eat a banana first")'],
        title: 'ana_carbs.py',
        check: [
          'want = "45 g: eat a banana first\\n60 g: ready to run\\n80 g: ready to run"',
          'if out == want:',
          '    ok = True',
          'elif "60 g: eat a banana" in out:',
          '    msg = "60 g still gets a banana. Is 60 more than 60? Which sign says at least?"',
          'elif "45 g: ready" in out:',
          '    msg = "Now 45 g is ready too. Only 60 and more should be."',
          'else:',
          '    msg = "Keep the three amounts. It should print: 45 g: eat a banana first, 60 g: ready to run, 80 g: ready to run"'
        ].join('\n'),
        why: '<code>60 &gt; 60</code> is False: the edge is left out. "At least 60" is <code>carbs_g &gt;= 60</code>, which counts 60 itself.',
        hint: 'Lesson 21: read the sign out loud. Does "more than 60" include 60?'
      },
      {
        type: 'fix', q: 'Ana wants her total running time for the week. Kitchen Coach prints four totals, and only the last is real. Fix it so it prints just one line: <code>Ana ran 125 minutes this week</code>.',
        code: ['run_minutes = 0', 'for day_minutes in [40, 0, 55, 30]:', '    run_minutes += day_minutes', '    print(f"Ana ran {run_minutes} minutes this week")'],
        title: 'ana_week.py',
        check: [
          'total = globals().get("run_minutes")',
          'if out == "Ana ran 125 minutes this week" and total == 125:',
          '    ok = True',
          'elif out.count("\\n") > 0:',
          '    msg = "Still more than one line. Which line should run once, after the loop?"',
          'elif total != 125:',
          '    msg = "Keep the total in run_minutes, adding up all four days."',
          'else:',
          '    msg = "It should print exactly: Ana ran 125 minutes this week"'
        ].join('\n'),
        why: 'The <code>print</code> was pushed in, so it ran every round. Move it back to the left edge: it runs once, after the loop, when all four days are added. Set before, add inside, print after.',
        hint: 'Lesson 26: before the loop, inside the loop, after the loop. Where does the print belong?'
      },
      {
        type: 'fix', q: 'Back to lesson 14. The guest types <code>6</code> (this box answers it for you). Press Run, read the error, then fix it so the last line is <code>Use the big pot</code>.',
        code: ['guests = input("How many guests? ")', 'if guests > 4:', '    print("Use the big pot")', 'else:', '    print("Use the small pot")'],
        title: 'pot.py',
        inputs: ['6'],
        check: [
          'lines = out.splitlines()',
          'g = globals().get("guests")',
          'if lines and lines[-1] == "Use the big pot" and type(g) is int and g == 6:',
          '    ok = True',
          'elif type(g) is str:',
          '    msg = "The jar guests still holds text. Convert the answer to a whole number as you ask."',
          'elif type(g) is float:',
          '    msg = "Close. Guests are counted, so int() fits better than float()."',
          'else:',
          '    msg = "Keep the answer in the jar guests. The last line should be: Use the big pot"'
        ].join('\n'),
        why: '<code>input()</code> always hands back text, and Python will not compare the text <code>"6"</code> with the number 4. Convert as you ask: <code>guests = int(input("How many guests? "))</code>. Then 6 &gt; 4 is True.',
        hint: 'Read the last line of the error. What kind of value is in guests, and what is 4?'
      },
      {
        type: 'fix', q: 'Hard one. The pot heats up by 20 degrees each round. Press Run: the loop never ends (press Stop, or wait 10 seconds). Fix it so it prints <code>Heating: 20 C</code>, <code>40 C</code>, <code>60 C</code>, <code>80 C</code>, then <code>Boiling. Add the pasta</code>.',
        code: ['water_c = 20', 'while water_c < 100:', '    print(f"Heating: {water_c} C")', 'print("Boiling. Add the pasta")'],
        title: 'boil.py',
        check: [
          'want = "Heating: 20 C\\nHeating: 40 C\\nHeating: 60 C\\nHeating: 80 C\\nBoiling. Add the pasta"',
          'if out == want:',
          '    ok = True',
          'elif out.startswith("Heating: 40 C"):',
          '    msg = "It starts at 40. The change line runs before the print. Put it after the print."',
          'elif "Heating: 100 C" in out:',
          '    msg = "It prints 100 too. Keep the question as water_c < 100."',
          'else:',
          '    msg = "It should print Heating: 20 C, 40 C, 60 C and 80 C, one per line, then Boiling. Add the pasta"'
        ].join('\n'),
        why: 'A safe <code>while</code> has three parts: set, check and <b>change</b>. Nothing changed <code>water_c</code>, so the question was True forever. Add <code>water_c += 20</code> inside the loop, after the print, pushed in like it.',
        hint: 'Lesson 25: set, check, change. Which of the three is missing?'
      },
      {
        type: 'fix', q: 'Hardest one. <code>None</code> means Ben has not logged his shakes yet, and <code>0</code> is a real answer: no shakes today. Fix it so it prints <code>Ben logged 2 shakes</code>, <code>Ben logged 0 shakes</code>, <code>Ben has not logged yet</code>.',
        code: ['for shakes in [2, 0, None]:', '    if shakes:', '        print(f"Ben logged {shakes} shakes")', '    else:', '        print("Ben has not logged yet")'],
        title: 'ben_shakes.py',
        check: [
          'want = "Ben logged 2 shakes\\nBen logged 0 shakes\\nBen has not logged yet"',
          'if out == want:',
          '    ok = True',
          'elif "Ben logged None" in out:',
          '    msg = "Now None counts as logged. Ask about None itself."',
          'elif out.count("not logged") == 2:',
          '    msg = "0 is still treated as not logged. 0 is falsy, but here it is a real answer."',
          'else:',
          '    msg = "Keep the three values. It should print the three lines in the question."'
        ].join('\n'),
        why: '<code>if shakes:</code> asks "is it empty?", and <code>0</code> counts as empty. When 0 is a real answer, ask the exact question: <code>if shakes is not None:</code>. Now only the empty jar, <code>None</code>, means "not logged yet".',
        hint: 'Lesson 23: when 0 is a real answer, do not ask "is it truthy?". Ask about None.'
      }
    ]
  });
})();
