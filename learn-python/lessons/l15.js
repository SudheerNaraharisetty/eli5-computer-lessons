/* Lesson 15: f-strings (module 1). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l15  f-strings
     ===================================================================== */

  // A recipe card. vals: [servings, minutes] or null for empty blanks.
  const card = (x, y, vals, title) => {
    const blank = (bx, by, v) => v === null
      ? `<rect x="${bx}" y="${by}" width="54" height="34" rx="8" fill="${P.white}" stroke="${P.accent}" stroke-width="2.5" stroke-dasharray="6 5"/>`
      : `<rect x="${bx}" y="${by}" width="54" height="34" rx="8" fill="${P.tint}" stroke="${P.accent}" stroke-width="2.5"/>` + T(bx + 27, by + 24, v, { s: 17, f: P.accent, m: true });
    return box(x, y, 230, 168, P.paper2, 16) +
      T(x + 20, y + 30, title, { s: 12, w: 800, f: P.ink2, a: 'start' }) +
      T(x + 20, y + 58, 'Bean chili', { s: 19, a: 'start' }) +
      `<line x1="${x + 20}" y1="${y + 72}" x2="${x + 210}" y2="${y + 72}" stroke="${P.sand}" stroke-width="3"/>` +
      T(x + 20, y + 108, 'Serves', { s: 15, a: 'start' }) + blank(x + 92, y + 85, vals && String(vals[0])) +
      T(x + 20, y + 150, 'Takes', { s: 15, a: 'start' }) + blank(x + 92, y + 127, vals && String(vals[1])) +
      T(x + 154, y + 150, 'minutes', { s: 15, a: 'start' });
  };
  const ideaPic = svg(600, 290, 'A recipe card with two empty blanks, and the same card with 4 and 35 filled in. Below, the f-string that does the same in Python.',
    card(24, 22, null, 'THE TEMPLATE') +
    arrow(268, 106, 330, 106, P.accent, 3) +
    T(299, 92, 'fill in', { s: 12, w: 700, f: P.ink2 }) +
    card(346, 22, [4, 35], 'TONIGHT') +
    box(24, 216, 552, 54, '#15132B', 12) +
    T(300, 249, 'f"Serves {servings}"   →   Serves 4', { s: 16, m: true, f: '#ECEAFF' }));

  const cardLines = [
    'dish = "bean chili"',
    'servings = 4',
    'minutes = 35',
    'print(f"{dish.title()}: serves {servings}, takes {minutes} minutes")',
    'print(f"Double it: {servings * 2} servings")',
    '',
    'ben_protein = 140',
    'print(f"Ben needs {ben_protein} g of protein a day")'
  ];

  const painPic = `<div style="width:100%">` +
    code(['ben_protein = 140', 'print("Ben needs " + str(ben_protein) + "g")', 'print("Ben needs {ben_protein} g")'], { title: 'protein.py', bad: [2, 3] }) +
    term(['$ python3 protein.py', 'Ben needs 140g', 'Ben needs {ben_protein} g'], 'terminal') + `</div>`;

  const priceLines = [
    'pasta = 3.5',
    'print(f"Pasta: ${pasta}")',
    'print(f"Pasta: ${pasta:.2f}")',
    '',
    'yearly = 140 * 365',
    'print(f"Ben eats {yearly:,} g of protein a year")',
    '',
    'pace = 128 / 21.1',
    'print(f"Ana\'s pace: {pace:.1f} minutes per km")',
    '',
    'plan_done = 0.85',
    'print(f"Ana has done {plan_done:.0%} of her plan")'
  ];

  const receiptLines = [
    'ana_dish = "Spaghetti"',
    'ana_price = 13.9',
    'ben_dish = "Tofu curry"',
    'ben_price = 11.5',
    'chloe_dish = "Rice pudding"',
    'chloe_price = 6',
    'total = ana_price + ben_price + chloe_price',
    '',
    'print(f"{ana_dish:<14}${ana_price:>6.2f}")',
    'print(f"{ben_dish:<14}${ben_price:>6.2f}")',
    'print(f"{chloe_dish:<14}${chloe_price:>6.2f}")',
    'print("-" * 21)',
    'print(f"{\'Total\':<14}${total:>6.2f}")'
  ];

  const debugLines = [
    'pasta = 1.10',
    'sauce = 2.20',
    'total = pasta + sauce',
    '',
    'print(f"{total=}")',
    'print(f"Total: ${total:.2f}")',
    'print(f"Total: ${round(total, 2)}")'
  ];

  COURSE.add({
    id: 'l15', minutes: 10,
    summary: 'An <b>f-string</b> is text with blanks that Python fills in. Put an <code>f</code> before the quotes and a name in <b>curly braces</b>: <code>f"Ben needs {ben_protein} g"</code>. No <code>str()</code>, no <code>+</code>, no lost spaces. After a colon you choose the look: <code>{price:.2f}</code> always shows <b>2 decimals</b>.',
    video: {
      src: 'videos/l15-f-strings.mp4', poster: 'videos/l15-f-strings.jpg', length: '1 min 3 s',
      script: [
        'Every recipe card has blanks. Serves blank. Takes blank minutes. Tonight you fill them in. Serves 4. Takes 35 minutes.',
        'Python has the same card. It is called an f-string. Write an f before the quote marks, and put a name in curly braces. Python opens that jar, and drops its value into the blank. No plus signs, and no lost spaces.',
        'Now print the dinner bill. Ana\'s pasta costs 14.5. But a price needs 2 decimals. After the name, add a colon, then .2f. Now it says 14.50. Add a width too, and every price snaps into one neat column, right down to the total.',
        'One classic slip. Forget the f, and Python prints the curly braces, exactly as you typed them. No error at all. Put the f back, and the blanks fill in.',
        'An f, and curly braces. Python fills in the blanks.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'A recipe card with blanks.',
        text: [
          'A good recipe card has <b>blanks</b>: "Serves ___. Takes ___ minutes." The words stay the same every time. Only the blanks change. Tonight you write 4 and 35. Next week maybe 6 and 50.',
          'Python has the same thing. It is called an <b>f-string</b>, short for "formatted string". It is text with blanks, and Python <b>fills each blank</b> with a value for you.',
          'You write an <code>f</code> right before the opening quote. Each blank is a pair of <b>curly braces</b> with a name inside: <code>f"Serves {servings}"</code>. Python opens the jar called <code>servings</code> (lesson 11) and puts what it finds into the text.'
        ],
        tip: 'Curly braces are <code>{</code> and <code>}</code>. On most keyboards they share a key with the square brackets: hold Shift.'
      },
      {
        label: 'The code', pic: run(cardLines, { title: 'card.py' }),
        h: 'Any name, any sum, any tool.',
        text: [
          'Line 4 fills three blanks in one line of text. Python finds each value and turns it into text by itself. You never write <code>str()</code>, and numbers and words mix freely.',
          'A blank can hold more than a name. Any small piece of Python that gives a value works: a sum like <code>{servings * 2}</code>, or a text tool from lesson 9 like <code>{dish.title()}</code>. Python works it out first, then fills the blank.',
          'The spaces are just part of the text, so they stay exactly where you typed them. What you see in the quotes is what you get.',
          'Press <b>Run</b>. Then change <code>servings</code> to <code>6</code> on line 2 and run again. Two lines change, and you did not touch them.'
        ],
        tip: 'The f can be small or capital, <code>F"..."</code> works too. Everyone uses the small one.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Glue, str() and a missing f.',
        text: [
          'Before f-strings you glued text with <code>+</code>, as in lesson 8. Line 2 needs <code>str()</code> round the number, or Python stops with a TypeError. It also needs a space inside every quote. One space was forgotten, so the output says <code>140g</code>. The longer the sentence, the more pieces to get wrong.',
          'Line 3 is the classic f-string bug. It has the braces but <b>no f</b>. Without the f, it is just plain text, and curly braces are ordinary characters. So Python prints them, exactly as typed: <code>Ben needs {ben_protein} g</code>.'
        ],
        warn: 'A missing f gives <b>no error</b>. The program runs and prints the braces. When you see <code>{a_name}</code> in your output, look for the missing f.'
      },
      {
        label: 'The fix', pic: run(priceLines, { title: 'prices.py' }),
        h: 'Put an f in front. Choose the look after a colon.',
        text: [
          'Fix line 3 of the pain with one letter: <code>f"Ben needs {ben_protein} g"</code>. Spaces where you want them, and no <code>str()</code>.',
          'A blank can also say <b>how</b> to show its value. Add a colon after the name, then a short code. Press <b>Run</b> and compare:',
          '<code>{pasta:.2f}</code> shows <b>2 decimals</b>, always: <code>3.50</code>, not <code>3.5</code>. Read it as "point 2, fixed". It is the price-tag format. <code>.1f</code> gives one decimal, so Ana\'s pace of 6.0663... minutes per km shows as <code>6.1</code>.',
          '<code>{yearly:,}</code> puts a comma between thousands: <code>51,100</code>. <code>{plan_done:.0%}</code> turns 0.85 into a percentage with no decimals: <code>85%</code>.'
        ],
        tip: 'To print a real curly brace inside an f-string, write it twice: <code>f"Write {{servings}}"</code> prints <code>Write {servings}</code>.'
      },
      {
        label: 'Try it', pic: run(receiptLines, { title: 'receipt.py' }),
        h: 'Print the dinner receipt.',
        text: [
          'Press <b>Run</b>. Every price has 2 decimals, and the prices line up in one column, like a real receipt.',
          'The trick is a <b>width</b>. <code>{ana_dish:&lt;14}</code> fills the dish to 14 characters, with the text on the left (<code>&lt;</code> points left). <code>{ana_price:&gt;6.2f}</code> makes the price 6 characters wide, pushed to the right (<code>&gt;</code>), with 2 decimals. Short names and short prices get spaces, so the columns stay straight.',
          'Now add a fourth line: 3 lemonades for 2.50 each. Make jars <code>drinks_dish = "Lemonade x3"</code> and <code>drinks_price = 3 * 2.5</code> above line 7, add <code>drinks_price</code> to the total, and copy one print line for it. The total should become <code>38.90</code>.'
        ],
        tip: 'Line 13 puts plain text, <code>\'Total\'</code>, in the braces so it gets the same width. It uses single quotes inside the double ones. Since Python 3.12 the same quotes also work, <code>f"{"Total":&lt;14}"</code>, but older Pythons stop with an error, so the mixed quotes are the safe habit.'
      },
      {
        label: 'The catch', pic: run(debugLines, { title: 'debug.py' }),
        h: 'Format to show, = to check.',
        text: [
          'Remember the tiny tail from lesson 6? <code>1.10 + 2.20</code> is really <code>3.3000000000000003</code>. Press <b>Run</b>. <code>{total=}</code>, with an equals sign, prints the name <b>and</b> the real value. It is a quick way to check a jar while you work.',
          'For the guest, <b>format</b> the number: <code>{total:.2f}</code> shows <code>3.30</code>. Do not sprinkle <code>round()</code> everywhere for this. <code>round(total, 2)</code> drops the trailing zero, so the receipt says <code>$3.3</code>. Keep the full number in the jar, and choose the look only when you print.',
          'One more thing you may see: since Python 3.14 there are also <b>t-strings</b>, written <code>t"..."</code>. They look like f-strings, but they do not give you text. They give a <b>Template</b>, which a library checks before it builds the text, for example to keep a web page safe. That is an advanced tool. For printing and everyday text, use f-strings.'
        ],
        warn: 'A t-string is not text. <code>print(t"Serves {servings}")</code> does not print <code>Serves 4</code>. It prints a long <code>Template(...)</code> description. If you wanted the words, you wanted an f.'
      }
    ],
    exercises: [
      {
        file: 'l15_receipt.py', title: 'The dinner receipt',
        task: 'Print a receipt for Ana, Ben and Chloe: <b>3 dish lines and a total</b>, like <code>Pasta: $14.50</code>. Every price needs exactly <b>2 decimals</b> and a <b>$</b> sign. Use <b>f-strings</b> and the jars in the file, so the receipt stays right when a price changes. The file checks your work when you run it.',
        steps: [
          'Press <b>Open in VS Code</b>. If nothing happens, open VS Code yourself and use File, Open to find the path shown below.',
          'Read the jars at the top and the 4 lines the receipt must show. Do not change the jars.',
          'Between the <code>START</code> and <code>END</code> lines, write one <code>print(f"...")</code> per line. Put the names in curly braces and add <code>:.2f</code> after each price. Work out the total from the three prices. Save the file.',
          'Run it with the Run button at the top right of VS Code. At the bottom you see <code>PASS</code> or a hint that tells you what to change.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['servings = 4', 'print(f"Serves {servings * 2}")'], { title: 'double.py' }),
        options: ['Serves 8', 'Serves {servings * 2}', 'Serves 4 * 2', 'Serves 44'],
        answer: 0,
        why: 'Python works out what is in the braces first: 4 * 2 is 8. Then it puts 8 in the blank.',
        hint: 'There is an f before the quotes. What is 4 * 2?'
      },
      {
        type: 'fix', q: 'This prints the curly braces instead of the number. Fix it so it prints <code>Chloe wants 2 desserts</code>.',
        code: ['chloe_desserts = 2', 'print("Chloe wants {chloe_desserts} desserts")'],
        title: 'chloe.py',
        check: [
          'if out.strip() == "Chloe wants 2 desserts":',
          '    ok = True',
          'elif "{" in out:',
          '    msg = "The braces still print. Put an f right before the opening quote: f\\"..."',
          'else:',
          '    msg = "It printed " + out.strip() + ". Keep the words the same, and add an f before the quote."'
        ].join('\n'),
        why: 'Without the f, the braces are ordinary characters. One letter turns the text into an f-string, and Python fills the blank.',
        hint: 'One letter is missing, right before the opening quote.'
      },
      {
        type: 'fix', q: 'A price tag needs 2 decimals. Change line 2 so it prints <code>Pasta: $3.50</code>.',
        code: ['pasta = 3.5', 'print(f"Pasta: ${pasta}")'],
        title: 'tag.py',
        check: [
          'if pasta != 3.5:',
          '    msg = "Keep the price as 3.5. Change how it is shown, not what is in the jar."',
          'elif out.strip() == "Pasta: $3.50":',
          '    ok = True',
          'else:',
          '    msg = "It printed " + out.strip() + ". Inside the braces, add :.2f after the name."'
        ].join('\n'),
        why: '<code>{pasta:.2f}</code> shows the value with exactly 2 decimals. The jar still holds 3.5.',
        hint: 'After the name, inside the braces: a colon, then .2f.'
      },
      {
        type: 'pick', q: '<code>ben_protein = 140</code>. Which line prints <code>Ben needs 140 g</code>?',
        options: ['print(f"Ben needs {ben_protein} g")', 'print("Ben needs {ben_protein} g")', 'print("Ben needs " + ben_protein + " g")', 'print(f"Ben needs (ben_protein) g")'],
        answer: 0,
        why: 'It needs the f <b>and</b> curly braces. Without the f the braces print. With <code>+</code> and no <code>str()</code> Python stops with a TypeError. Round brackets are not blanks.',
        hint: 'Two things must be right: the letter before the quote, and the kind of brackets.'
      },
      {
        type: 'match', q: 'Match each blank to what it shows. <code>ben_protein</code> holds 140.',
        pairs: [
          ['{3.5:.2f}', '<code>3.50</code>'],
          ['{12500:,}', '<code>12,500</code>'],
          ['{0.85:.0%}', '<code>85%</code>'],
          ['{ben_protein=}', '<code>ben_protein=140</code>'],
          ['{{servings}}', '<code>{servings}</code>']
        ],
        why: '<code>.2f</code> gives 2 decimals, a comma adds thousands separators, <code>%</code> makes a percentage, <code>=</code> shows the name and value, and double braces print a real brace.',
        hint: 'Start with the one that has a percent sign.'
      },
      {
        type: 'fill', q: 'Fill the blanks so the dish fills 14 characters on the left and the price is 6 wide on the right, with 2 decimals.',
        text: 'print(f"{dish:___}${price:___}")',
        options: ['<14', '>6.2f', '>14', '<6.2f', '.2f'],
        answer: ['<14', '>6.2f'],
        why: '<code>&lt;</code> pushes text to the left, <code>&gt;</code> pushes it to the right, and the number is the width. <code>.2f</code> comes after the width.',
        hint: 'The arrow points the way the text is pushed. Prices line up on the right.'
      },
      {
        type: 'pick', q: 'Back to lesson 13. A form gave Ana\'s pasta price as text. What happens?',
        pic: code(['price = "3.5"', 'print(f"Pasta: ${price:.2f}")'], { title: 'form.py' }),
        options: ['Python stops with a ValueError: Unknown format code \'f\' for object of type \'str\'', 'It prints Pasta: $3.50', 'It prints Pasta: $3.5', 'It prints Pasta: ${price:.2f}'],
        answer: 0,
        why: '<code>.2f</code> is a number format, and <code>"3.5"</code> is text. Convert first, as in lesson 13: <code>price = float("3.5")</code>. Then <code>{price:.2f}</code> shows <code>3.50</code>.',
        hint: 'The quotes around 3.5 make it text. Can text have 2 decimals?'
      },
      {
        type: 'type', q: '<code>pace</code> holds Ana\'s pace, 6.0663507109004735. Type the line that prints <code>Pace: 6.1</code>.',
        prompt: '>>>',
        answers: ['print(f"Pace: {pace:.1f}")'],
        accept: '^print\\(f["\']Pace: \\{pace:\\.1f\\}["\']\\)$',
        why: '<code>.1f</code> shows one decimal, rounded: 6.07 becomes <code>6.1</code>. The jar keeps the full number.',
        hint: 'print, then an f-string with the name pace and :.1f inside the braces.'
      }
    ]
  });
})();
