/* Lesson 18: Review: values and variables (module 1). Quiz only, no video, no exercise. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l18  Review: values and variables
     ===================================================================== */

  // One jar on the shelf: a lid with the lesson number, a label with the title, the key code and one plain line.
  const jar = (x, y, n, title, mono, plain, tint) =>
    `<rect x="${x + 24}" y="${y}" width="84" height="18" rx="5" fill="${P.ink}"/>` +
    T(x + 66, y + 13.5, 'Lesson ' + n, { s: 10.5, f: P.white }) +
    box(x, y + 16, 132, 88, P.white, 16) +
    `<rect x="${x + 7}" y="${y + 24}" width="118" height="72" rx="8" fill="${tint}" stroke="${P.ink}" stroke-width="1.5"/>` +
    T(x + 66, y + 42, title, { s: 12.5 }) +
    T(x + 66, y + 64, mono, { s: 11.5, m: true, w: 700 }) +
    T(x + 66, y + 86, plain, { s: 11, w: 700, f: P.ink2 });

  const jars = [
    [6, 'Numbers', 'int 3, float 2.5', 'count or measure', P.tint],
    [7, 'Maths', '7 // 2 is 3', '/ gives a float', P.tint],
    [8, 'Text', '"200" + "50"', 'joins: 20050', P.warnT],
    [9, 'Text tools', '.strip()', 'hands back a copy', P.warnT],
    [10, 'True and False', '140 >= 120', '== asks, = stores', P.okT],
    [11, 'Variables', 'ben_g = 140', 'a label on a jar', P.sand],
    [12, 'Good names', 'cook_minutes', 'what, plus the unit', P.sand],
    [13, 'Converting', 'int("200")', 'convert, then add', P.dangerT],
    [14, 'input()', 'int(input())', 'always gives text', P.dangerT],
    [15, 'f-strings', 'f"{name}"', 'fills the blanks', P.warnT],
    [16, 'None', 'x is None', 'empty on purpose', P.okT],
    [17, 'Comments', '# why, not what', 'Python skips it', P.sand]
  ];
  const shelf = y => `<rect x="10" y="${y}" width="580" height="9" rx="3" fill="${P.sand}" stroke="${P.ink}" stroke-width="2"/>`;
  const recapPic = svg(600, 382, 'A shelf of twelve labelled jars, one per lesson of module 1, each with its key code and one plain idea.',
    T(300, 20, 'Module 1: twelve jars on the shelf', { s: 15 }) +
    jars.map((j, i) => jar(21 + (i % 4) * 142, 32 + Math.floor(i / 4) * 116, ...j)).join('') +
    [142, 258, 374].map(shelf).join(''));

  // How to play: predict, run, compare.
  const step = (x, n, head, line1, line2, fill) =>
    box(x, 20, 170, 104, fill, 14) +
    `<circle cx="${x + 26}" cy="${42}" r="12" fill="${P.ink}"/>` + T(x + 26, 46.5, String(n), { s: 12.5, f: P.white }) +
    T(x + 46, 47, head, { s: 15, a: 'start' }) +
    T(x + 85, 82, line1, { s: 12, w: 700, f: P.ink2 }) +
    T(x + 85, 102, line2, { s: 12, w: 700, f: P.ink2 });
  const playPic = `<div style="width:100%;min-width:0">` +
    svg(600, 140, 'Three steps: 1 predict the output before you run, 2 press Run, 3 compare, and if you were surprised, find out why.',
      step(14, 1, 'Predict', 'say the output', 'out loud first', P.tint) +
      arrow(190, 72, 212, 72, P.accent, 3) +
      step(216, 2, 'Run', 'press Run and', 'read every line', P.warnT) +
      arrow(392, 72, 414, 72, P.accent, 3) +
      step(418, 3, 'Compare', 'surprised? that is', 'the lesson to reread', P.okT)) +
    run(['# Warm up: predict both numbers, then press Run', 'guests = 3', 'rice_g = guests * 75', 'print("Rice for", guests, "guests:", rice_g, "g")'], { title: 'warm_up.py' }) +
    `</div>`;

  COURSE.add({
    id: 'l18', minutes: 20,
    summary: 'Twelve lessons of values and variables on one shelf: numbers, maths, text, text tools, True and False, variables, names, converting, <code>input()</code>, f-strings, <code>None</code> and comments. Then <b>16 mixed questions</b>, easy to hard. Most of them you can <b>run</b>.',
    parts: [
      {
        label: 'Recap', pic: recapPic,
        h: 'Twelve jars on one shelf.',
        text: [
          'Module 1 gave you the things a program keeps in its jars. Each jar in the picture is one lesson, with the <b>one line of code</b> to remember and the <b>one idea</b> behind it.',
          '<b>Values</b> come in a few kinds. Numbers you count are <code>int</code>, numbers you measure are <code>float</code>, words are <code>str</code>, yes and no is <code>bool</code>, and "nothing yet" is <code>None</code>. The kind decides what <code>+</code> does: it adds numbers and joins text.',
          '<b>Variables</b> are the labels. A good label says what is inside and the unit. <code>=</code> fills a jar, <code>==</code> asks a question.',
          '<b>Text from outside</b>, like the answer from <code>input()</code>, is always text. Convert it before you do maths. Then show results with an <b>f-string</b>, and leave a <b>comment</b> where the why is not obvious.'
        ],
        tip: 'Module 0 still applies to every question: Python follows the steps exactly, from the top down, and an error is a note you read from the bottom up.'
      },
      {
        label: 'How to play', pic: playPic,
        h: 'Predict first. Then press Run.',
        text: [
          'Most questions show a small piece of Kitchen Coach you have not seen before. Before you answer, <b>say the output out loud</b>. Then pick your answer, and press <b>Run</b> on the code to check it.',
          'The <b>fix</b> questions are real code that goes wrong. Change it, then press <b>Run and check</b>. The page runs your code and checks what it prints. There is often more than one good fix.',
          'If an answer surprises you, that is the useful part. The lesson number on the jar tells you where to look again.'
        ],
        warn: 'Running the code first and then picking the answer works, but it teaches you very little. The guess is where the learning happens.'
      }
    ],
    quiz: [
      {
        type: 'bucket', q: 'Warm up. Sort each value by its type. Not sure? Ask Python: <code>print(type(...))</code> in any code box.',
        buckets: ['int', 'float', 'str', 'bool', 'None'],
        items: [
          ['3', 0],
          ['7 // 2', 0],
          ['2.5', 1],
          ['10 / 2', 1],
          ['"200"', 2],
          ['"None"', 2],
          ['True', 3],
          ['140 >= 120', 3],
          ['None', 4]
        ],
        why: '<code>//</code> gives a whole number, <code>/</code> always gives a float (<code>5.0</code>). Anything in quotes is text, even <code>"200"</code> and <code>"None"</code>. A comparison gives a bool. Plain <code>None</code> is the only value of its own type, <code>NoneType</code>.',
        hint: 'Quote marks always mean text. And remember lesson 7: what does <code>/</code> always give?'
      },
      {
        type: 'pick', q: 'You share 500 g of pasta between 3 guests, in whole grams. Predict the output, then press Run.',
        pic: run(['pasta_g = 500', 'guests = 3', 'print(pasta_g // guests, pasta_g % guests)'], { title: 'share.py' }),
        options: ['166 2', '166.66666666666666', '2 166', '166 0'],
        answer: 0,
        why: '<code>//</code> gives the whole grams each guest gets: 166. <code>%</code> gives what is left over: 500 minus 3 times 166 is 2.',
        hint: 'Lesson 7: <code>//</code> is the whole pieces, <code>%</code> is the leftovers. They come out in the order they are written.'
      },
      {
        type: 'pick', q: 'Ben has had 95 g of protein, then a 30 g shake. What does this print?',
        pic: run(['ben_protein_g = 95', 'ben_protein_g += 30', 'print(ben_protein_g >= 120)'], { title: 'protein.py' }),
        options: ['True', 'False', '125', '125 >= 120'],
        answer: 0,
        why: '<code>+=</code> updates the jar to 125. Then <code>&gt;=</code> asks a question, and 125 is at least 120, so the answer is <code>True</code>.',
        hint: 'First work out what is in the jar after line 2. Then remember what a comparison gives back.'
      },
      {
        type: 'pick', q: 'What does this print?',
        pic: run(['oven_c = 180', '# oven_c = 220', "print(oven_c)  # Ana's oven runs hot, so 180 is enough"], { title: 'oven.py' }),
        options: ['180', '220', "180  # Ana's oven runs hot, so 180 is enough", 'An error, because line 2 has no value'],
        answer: 0,
        why: 'Python skips everything from <code>#</code> to the end of the line. Line 2 is switched off, and the note on line 3 is never printed.',
        hint: 'Lesson 17: what does Python do with everything after a hash sign?'
      },
      {
        type: 'type', q: 'Predict the output. Type exactly what appears, then press Run on the code to check.',
        pic: run(['dish = "  bean chili "', 'print(dish.strip().title())'], { title: 'menu_card.py' }),
        prompt: 'output >',
        answers: ['Bean Chili'],
        why: '<code>.strip()</code> peels the spaces off both ends, and <code>.title()</code> gives each word a capital letter. print shows the text without quote marks.',
        hint: 'Do the tools from left to right: first the spaces, then the capitals. Quote marks are not part of the output.'
      },
      {
        type: 'pick', q: 'Chloe has not picked her dessert yet. Ben drank zero shakes today. What does this print?',
        pic: run(['chloe_dessert = None', 'ben_shakes = 0', 'print(chloe_dessert is None, ben_shakes is None)'], { title: 'empty_jars.py' }),
        options: ['True False', 'True True', 'False False', 'None 0'],
        answer: 0,
        why: '<code>None</code> means "no answer yet". <code>0</code> is a real answer: zero shakes. So only the first jar is None.',
        hint: 'Lesson 16: is 0 the same as None?'
      },
      {
        type: 'match', q: 'Match each tool from this module to its job.',
        pairs: [
          ['type()', 'tells you which kind a value is'],
          ['//', 'divides into whole pieces only'],
          ['len()', 'counts the characters in some text'],
          ['.strip()', 'peels spaces off both ends of text'],
          ['==', 'asks "are these two the same?"'],
          ['int()', 'turns the text "200" into the number 200'],
          ['input()', 'asks a question and hands back the answer as text'],
          ['f"..."', 'fills the values of names in {braces} into text'],
          ['#', 'starts a note that Python skips']
        ],
        why: 'One tool, one job. When a program goes wrong, the question is often just "did I pick the right tool?".',
        hint: 'Start with the ones you are sure of. The jar shelf at the top of this page has most of them.'
      },
      {
        type: 'type', q: 'Back to lesson 3. Your terminal is already in the folder that holds <code>kitchen_coach.py</code>. Type the command that runs it.',
        prompt: '$',
        answers: ['python3 kitchen_coach.py', 'python kitchen_coach.py', 'py kitchen_coach.py'],
        why: '<code>python3</code> (or <code>py</code> on Windows), a space, then the file name. Python reads the saved file from the top, one line at a time.',
        hint: 'The name of the program that cooks the recipe, a space, then the full file name with .py.'
      },
      {
        type: 'fix', q: 'This should print <code>Chloe gets rice pudding tonight</code>. It prints the curly braces instead, with no error. Fix it.',
        code: ['guest = "Chloe"', 'dessert = "rice pudding"', 'print("{guest} gets {dessert} tonight")'],
        title: 'dessert.py',
        check: [
          'if out == "Chloe gets rice pudding tonight":',
          '    ok = True',
          'elif "{" in out:',
          '    msg = "The braces are still printed as they are. One letter is missing just before the first quote mark."',
          'else:',
          '    msg = "It should print exactly: Chloe gets rice pudding tonight"'
        ].join('\n'),
        why: 'Without the <code>f</code> in front, it is plain text, and the braces are just characters. With <code>f"..."</code> Python opens each jar and drops its value into the blank.',
        hint: 'An f-string starts with one letter before the quote mark.'
      },
      {
        type: 'fix', q: 'Chloe wants 40 g more pudding. Press Run, read the error, then fix it so it prints <code>Chloe\'s pudding: 220 g</code>.',
        code: ['chloe_dessert_g = 180', 'extra_g = 40', 'chloe_dessert_g = chloe_desert_g + extra_g', 'print("Chloe\'s pudding:", chloe_dessert_g, "g")'],
        title: 'pudding.py',
        check: [
          'if out == "Chloe\'s pudding: 220 g":',
          '    ok = True',
          'else:',
          '    msg = "It should print exactly: Chloe\'s pudding: 220 g"'
        ].join('\n'),
        why: 'A jar label must match exactly. <code>chloe_desert_g</code> was never filled, so Python did not know it. It even guessed the right name for you.',
        hint: 'Read the last line of the error. Python says which name it does not know, and what you probably meant.'
      },
      {
        type: 'fix', q: 'Ana had 200 g of carbs, then a 50 g snack. Kitchen Coach says 20050 g. Fix it so it prints <code>Ana\'s carbs today: 250 g</code>.',
        code: ['ana_carbs_g = "200"', 'snack_carbs_g = "50"', 'total_carbs_g = ana_carbs_g + snack_carbs_g', 'print("Ana\'s carbs today:", total_carbs_g, "g")'],
        title: 'carbs.py',
        check: [
          'total = globals().get("total_carbs_g")',
          'if out == "Ana\'s carbs today: 250 g" and total == 250:',
          '    ok = True',
          'elif "20050" in out:',
          '    msg = "Still 20050. The jars hold text, and + joins text. Make the values numbers."',
          'elif "250.0" in out:',
          '    msg = "Close. Grams here are whole numbers, so int() fits better than float()."',
          'elif total != 250:',
          '    msg = "Keep the sum in the jar total_carbs_g, as the number 250."',
          'else:',
          '    msg = "It should print exactly: Ana\'s carbs today: 250 g"'
        ].join('\n'),
        why: '<code>"200"</code> in quotes is text, and <code>+</code> joins text. Take the quotes away, or convert with <code>int()</code>, and <code>+</code> adds: 250.',
        hint: 'Look at the quote marks on lines 1 and 2. What kind of value is inside those jars?'
      },
      {
        type: 'pick', q: 'Back to lesson 4. Python pins this note to <code>coach.py</code>. Read it from the bottom up. Which new line 2 fixes it?',
        pic: `<div style="width:100%;min-width:0">` +
          code(['protein_g = 140', 'print("Ben needs " + protein_g + " g")'], { title: 'coach.py', bad: [2] }) +
          term(['$ python3 coach.py', 'Traceback (most recent call last):', '  File "coach.py", line 2, in <module>', '    print("Ben needs " + protein_g + " g")', '          ~~~~~~~~~~~~~^~~~~~~~~~~', 'TypeError: can only concatenate str (not "int") to str'], 'terminal') +
          `</div>`,
        options: [
          'print("Ben needs " + str(protein_g) + " g")',
          'print("Ben needs " + "protein_g" + " g")',
          'print("Ben needs " + int(protein_g) + " g")',
          'print(f"Ben needs {protein_g} g")',
          'Print("Ben needs " + protein_g + " g")'
        ],
        answer: [0, 3],
        why: 'The last line says text and a number were joined with <code>+</code>. <code>str(protein_g)</code> turns 140 into text first. An f-string fills the number in for you. Quoting the name prints the word "protein_g", and <code>int()</code> leaves it a number.',
        hint: 'Two of them work. Try each one in a code box if you are not sure.'
      },
      {
        type: 'fix', q: 'The label on the pasta bag says <code>2.5</code> kg. Press Run, read the error, then fix it so it prints <code>Double batch: 5.0 kg</code>.',
        code: ['pasta_label = "2.5"', 'pasta_kg = int(pasta_label)', 'print("Double batch:", pasta_kg * 2, "kg")'],
        title: 'pasta.py',
        check: [
          'if out == "Double batch: 5.0 kg":',
          '    ok = True',
          'elif out == "Double batch: 4 kg":',
          '    msg = "That threw the .5 away, so the batch is too small. Which tool keeps the point?"',
          'else:',
          '    msg = "It should print exactly: Double batch: 5.0 kg"'
        ].join('\n'),
        why: '<code>int()</code> only reads whole numbers, so <code>int("2.5")</code> stops with a ValueError. <code>float()</code> reads a number with a point: 2.5, and 2.5 times 2 is 5.0.',
        hint: 'Lesson 13: one tool turns text into a whole number, another into a number with a point.'
      },
      {
        type: 'fix', q: 'Press Run. Line 4 fails. Find the jar with a bad label, give it a new name, and make it print both lines.',
        code: ['print("Kitchen Coach v0.2")', 'print = "Ana\'s long run"', 'run_minutes = 95', 'print(print + ":", run_minutes, "minutes")'],
        title: 'long_run.py',
        check: [
          'if out == "Kitchen Coach v0.2\\nAna\'s long run: 95 minutes" and "print" not in globals():',
          '    ok = True',
          'elif "print" in globals():',
          '    msg = "There is still a jar called print. Give it a name of its own."',
          'else:',
          '    msg = "It should print two lines: Kitchen Coach v0.2, then Ana\'s long run: 95 minutes"'
        ].join('\n'),
        why: 'Line 2 put text in a jar called <code>print</code>, so the print tool was hidden. On line 4, Python tried to "call" the text. A name of its own, like <code>run_label</code>, keeps the tool working.',
        hint: 'Lesson 12: never use a name Python already has. Which jar is named after a tool?'
      },
      {
        type: 'order', q: 'Put the lines in order. Kitchen Coach asks for your <b>name</b> first, then <b>how many guests</b>, then prints how much rice to cook.',
        items: [
          'name = input("Your name? ")',
          'guests = int(input("How many guests? "))',
          'rice_g = guests * 75',
          'print(f"{name}, cook {rice_g} g of rice")'
        ],
        why: 'Python runs from the top down, and a jar must be filled before it is used. Ask both questions in the order the person sees them, work out the rice from the guests, then print.',
        hint: 'Which jar does each line need? It must already be filled by a line above it.'
      },
      {
        type: 'fix', q: 'Hard one. The guest types <code>4</code> (this box answers it for you). Kitchen Coach prints a very long number and no error. Fix it so the last line is <code>Cook 500 g of pasta</code>.',
        code: ['guests = input("How many guests? ")', 'pasta_g = guests * 125', 'print("Cook", pasta_g, "g of pasta")'],
        title: 'pasta_for_guests.py',
        inputs: ['4'],
        check: [
          'lines = out.splitlines()',
          'pasta = globals().get("pasta_g")',
          'if lines and lines[-1] == "Cook 500 g of pasta" and pasta == 500:',
          '    ok = True',
          'elif "4444" in out:',
          '    msg = "Still 4444... The answer from input() is text, and text times 125 repeats it 125 times. Convert it first."',
          'elif lines and lines[-1] == "Cook 500.0 g of pasta":',
          '    msg = "Close. Guests are counted, so int() fits better than float()."',
          'else:',
          '    msg = "Keep the amount in the jar pasta_g. The last line should be: Cook 500 g of pasta"'
        ].join('\n'),
        why: '<code>input()</code> always hands back text. <code>"4" * 125</code> repeats the text 125 times, so there is no error, just nonsense. Wrap it: <code>int(input("How many guests? "))</code>, and 4 times 125 is 500.',
        hint: 'Lesson 14: what kind of value does input() always give back? And what does * do to text?'
      }
    ]
  });
})();
