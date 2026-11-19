/* Lesson 7: Maths in Python (module 1). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l07  Maths in Python
     ===================================================================== */

  // One sign card: the sign, what it does, and a kitchen example.
  const sign = (x, y, s, name, ex, res) =>
    box(x, y, 132, 120, P.white, 14) +
    T(x + 66, y + 44, s, { s: 28, m: true, f: P.accent }) +
    T(x + 66, y + 68, name, { s: 12.5, w: 700, f: P.ink2 }) +
    T(x + 66, y + 92, ex, { s: 12, m: true }) +
    T(x + 66, y + 110, res, { s: 12, m: true, f: P.ok });

  const signsPic = svg(600, 300, 'Seven maths signs in Python, each with a kitchen example. Plus adds, minus takes away, star times, slash divides exactly, two slashes give whole pieces, percent gives what is left over, two stars make a power.',
    T(300, 26, 'Python\'s kitchen calculator', { s: 16 }) +
    sign(18, 44, '+', 'add', '200 + 50', '250') +
    sign(162, 44, '-', 'take away', '500 - 120', '380') +
    sign(306, 44, '*', 'times', '250 * 2', '500') +
    sign(450, 44, '/', 'divide', '7 / 2', '3.5') +
    sign(90, 176, '//', 'whole pieces', '14 // 3', '4') +
    sign(234, 176, '%', 'left over', '14 % 3', '2') +
    sign(378, 176, '**', 'power', '10 ** 2', '100'));

  const mathLines = [
    'print(200 + 50)',
    'print(500 - 120)',
    'print(250 * 2)',
    'print(12 / 3)',
    'print(7 / 2)',
    'print(3.14 * 10 ** 2)'
  ];

  // The bill: what you meant and what Python did.
  const painPic = `<div style="width:100%">` +
    code(['print("Each friend pays:")', 'print(60 + 15 / 3)'], { title: 'bill.py', bad: [2] }) +
    term(['$ python3 bill.py', 'Each friend pays:', '65.0'], 'terminal') +
    svg(600, 200, 'What you meant: add 60 and 15 to get 75, then split it 3 ways, 25 each. What Python did: split only the 15 into 5, then added 60, 65 each.',
      box(18, 16, 272, 168, P.okT, 16) +
      T(154, 44, 'WHAT YOU MEANT', { s: 12.5, f: P.ok }) +
      T(154, 82, '60 + 15 = 75', { s: 17, m: true }) +
      T(154, 116, '75 / 3 = 25.0', { s: 17, m: true }) +
      T(154, 160, 'each friend pays $25', { s: 13, w: 700, f: P.ok }) +
      box(310, 16, 272, 168, P.dangerT, 16) +
      T(446, 44, 'WHAT PYTHON DID', { s: 12.5, f: P.danger }) +
      T(446, 82, '15 / 3 = 5.0', { s: 17, m: true }) +
      T(446, 116, '60 + 5.0 = 65.0', { s: 17, m: true }) +
      T(446, 160, 'only the tip got split', { s: 13, w: 700, f: P.danger })) +
    code(['print(7 / 2)'], { title: 'cookies.py', hi: [1] }) +
    term(['$ python3 cookies.py', '3.5'], 'terminal') + `</div>`;

  const billLines = [
    'print("Each friend pays:")',
    'print(60 + 15 / 3)'
  ];

  const cookieLines = [
    'print("Cookies each:")',
    'print(14 // 3)',
    'print("Left on the tray:")',
    'print(14 % 3)',
    'print(divmod(14, 3))'
  ];
  const benLines = [
    'print(abs(118 - 140))',
    'print(min(118, 140, 95))',
    'print(max(118, 140, 95))'
  ];

  const catchPic = `<div style="width:100%">` +
    code(['print(3 * 1.10)', 'print(round(3 * 1.10, 2))', 'print(round(2.5))', 'print(round(3.5))', 'print(-7 // 2)'], { title: 'catch.py', hi: [1, 3, 5] }) +
    term(['$ python3 catch.py', '3.3000000000000003', '3.3', '2', '4', '-4'], 'terminal') +
    svg(600, 120, 'A number line from minus 5 to 0. Minus 3.5 sits between minus 4 and minus 3. Two slashes always go down, to the left, so minus 7 // 2 is minus 4.',
      `<line x1="40" y1="64" x2="560" y2="64" stroke="${P.ink}" stroke-width="3" stroke-linecap="round"/>` +
      [-5, -4, -3, -2, -1, 0].map((n, i) => {
        const x = 60 + i * 96;
        return `<line x1="${x}" y1="54" x2="${x}" y2="74" stroke="${P.ink}" stroke-width="3" stroke-linecap="round"/>` + T(x, 98, String(n), { s: 14, m: true, f: n === -4 ? P.danger : P.ink });
      }).join('') +
      `<circle cx="204" cy="64" r="8" fill="${P.accent}" stroke="${P.ink}" stroke-width="2"/>` +
      T(204, 36, '-3.5', { s: 13, m: true, f: P.accent }) +
      arrow(194, 44, 162, 56, P.danger, 2.5) +
      T(420, 30, '// always goes DOWN', { s: 13, f: P.danger })) + `</div>`;

  COURSE.add({
    id: 'l07', minutes: 10,
    summary: 'Python is a kitchen calculator. <code>+ - * /</code> work like on paper, but <code>/</code> always gives a <b>float</b>. <code>//</code> gives <b>whole</b> pieces and <code>%</code> gives the <b>leftovers</b>. Python multiplies and divides before it adds, so use <b>brackets</b> to say what goes first.',
    video: {
      src: 'videos/l07-maths.mp4', poster: 'videos/l07-maths.jpg', length: '1 min 6 s',
      script: [
        'Ana, Ben and Chloe are coming to dinner, and dinner needs a little maths. Python does it with signs you already know.',
        'Double the pasta. 250, times 2. 500 grams.',
        'Now split the bill. Dinner is 60 dollars, plus a 15 dollar tip, shared by 3 friends.',
        '60 plus 15, divided by 3. Python says 65 each. That is wrong.',
        'Python divides before it adds. So only the tip got split.',
        'Put brackets around the sum. Brackets go first. Now each friend pays 25.',
        'See the point zero? One slash always gives a float, even when it divides evenly.',
        'Now dessert. 14 cookies, 3 plates. Two slashes deal whole cookies only. 4 each.',
        'The percent sign gives the leftovers. 2 cookies, still on the tray.',
        'Brackets first. One slash for exact. Two slashes for whole. Percent for the rest.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: signsPic,
        h: 'Your kitchen needs a calculator.',
        text: [
          'Cooking is full of small sums. Ana trains hard this week, so you <b>double</b> her pasta. The dinner bill is <b>split</b> three ways. Chloe counts the cookies so everyone gets a <b>fair share</b>.',
          'Python does all of it. You already know most of the signs from school: <code>+</code> adds and <code>-</code> takes away. Two look different on a keyboard: <code>*</code> (a star) means <b>times</b>, and <code>/</code> (a slash) means <b>divide</b>.',
          'Python adds three more that a kitchen loves: <code>//</code> for <b>whole pieces</b>, <code>%</code> for <b>what is left over</b>, and <code>**</code> for a <b>power</b>.'
        ],
        tip: 'A sum like <code>250 * 2</code> is called an <b>expression</b>. Python works it out to one value, here 500, and then <code>print</code> shows that value.'
      },
      {
        label: 'The code', pic: run(mathLines, { title: 'maths.py' }),
        h: 'Sums inside print.',
        text: [
          'Put the sum inside <code>print( )</code>, with no quote marks. Python works it out first, then shows the answer. Spaces around the signs are optional, but they make it easier to read.',
          'Line 3 doubles 250 grams of pasta: <code>500</code>. Line 4 shares 12 cookies between 3 friends. Look closely: Python shows <code>4.0</code>, not <code>4</code>. One slash <b>always</b> gives a float (lesson 6), even when it divides evenly.',
          'Line 6 is the area of a round cake tin, 10 cm from the centre to the edge. <code>10 ** 2</code> means 10 times 10. Python keeps a more exact pi in its <code>math</code> cookbook. Lesson 60, Modules and import, opens it.',
          'Press <b>Run</b>. Then change line 3 to triple the pasta, and run again.'
        ],
        tip: 'You can type sums straight into the <code>&gt;&gt;&gt;</code> prompt from lesson 6, with no print at all. Type <code>250 * 3</code> and press Enter. It is the fastest calculator on your computer.'
      },
      {
        label: 'The pain', pic: painPic,
        h: '65 dollars each for a 75 dollar dinner.',
        text: [
          'Dinner cost <b>$60</b>, plus a <b>$15</b> tip, for 3 friends. You write <code>60 + 15 / 3</code> and Python says each friend pays <code>65.0</code>. That is almost the whole bill, each!',
          'There is no error. Python did exactly what the line says. It follows the school rule: <b>divide and multiply before you add and take away</b>. So it split only the tip, 15 / 3 = 5, and then added the 60.',
          'The second surprise: <code>7 / 2</code>. Seven cookies for two friends, and you expect <code>3</code>. Python says <code>3.5</code>. One slash means an <b>exact</b> share, so Python cuts the last cookie in half.'
        ],
        warn: 'A wrong sum with no error is the worst kind of bug. Python will not warn you. Check one answer in your head before you trust it.'
      },
      {
        label: 'The fix', pic: run(billLines, { title: 'bill.py' }),
        h: 'Brackets go first.',
        text: [
          'Put <b>brackets</b> around the part you want done first: <code>(60 + 15) / 3</code>. Now Python adds the bill, then splits it. Each friend pays <code>25.0</code>.',
          'The full order Python uses: 1. <b>brackets</b>. 2. <code>**</code> powers. 3. <code>*</code> <code>/</code> <code>//</code> <code>%</code>. 4. <code>+</code> and <code>-</code>. When two signs are on the same level, Python goes from left to right.',
          'Fix line 2 above and press <b>Run</b>. You should see <code>25.0</code>.',
          'Not sure about the order? Add brackets anyway. Extra brackets never hurt, and the next reader sees what you meant.'
        ],
        tip: 'Money with cents? Use one slash, then round to 2 places as in lesson 6: <code>round(75.60 / 3, 2)</code> gives <code>25.2</code>, so $25.20 each.'
      },
      {
        label: 'Try it', pic: `<div style="width:100%">${run(cookieLines, { title: 'cookies.py' })}${run(benLines, { title: 'protein.py' })}</div>`,
        h: 'Share the cookies. Track Ben\'s protein.',
        text: [
          '<b>Cookies.</b> Chloe baked 14 cookies for 3 friends. Nobody wants a crumb. <code>14 // 3</code> deals <b>whole</b> cookies only: 4 each. <code>14 % 3</code> gives the <b>leftovers</b>: 2 cookies still on the tray. The sign <code>%</code> is called <b>modulo</b>, but "the remainder" is fine.',
          '<code>divmod(14, 3)</code> gives both answers at once: <code>(4, 2)</code>. Change 14 to <b>20</b> on every line and run again. Can you guess the answers first?',
          '<b>Ben\'s protein.</b> Ben aims for 140 grams and ate 118 today. <code>abs</code> gives the distance from the target, always positive: <code>22</code>. Over three days he ate 118, 140 and 95 grams. <code>min</code> finds the lowest day and <code>max</code> the highest. Put the numbers inside, separated by commas.',
          'Try <code>abs(140 - 118)</code> too. Same answer, because a distance has no minus sign.'
        ],
        tip: 'Right now you type the same number many times, like 14 on three lines. Lesson 11 gives you labelled jars, called variables, so you write it once.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Money, halves and minus signs.',
        text: [
          '<b>Money is a float.</b> Three loaves at $1.10 print <code>3.3000000000000003</code>. That is the tiny scale error from lesson 6. Round money when you show it: <code>round(3 * 1.10, 2)</code>.',
          '<b>Halves go to the even number.</b> <code>round(2.5)</code> is <code>2</code> and <code>round(3.5)</code> is <code>4</code>. Python rounds a value exactly halfway to the nearest even number, so over many sums the rounding does not keep pushing the total up.',
          '<b>Two slashes always go down.</b> <code>-7 // 2</code> is <code>-4</code>, not -3, because -4 is the lower number. With positive numbers you never notice.'
        ],
        warn: 'If a shop or a bank uses your numbers, the rounding rules matter. Later lessons show the exact tools for money. For now, round when you show a price.'
      }
    ],
    exercises: [
      {
        file: 'l07_split_the_bill.py', title: 'Split the bill, share the cookies',
        task: 'Write three expressions: each person\'s share of a <b>$75.60</b> bill split 3 ways, rounded to 2 places; the <b>whole</b> cookies each friend gets from <b>20</b> cookies; and the cookies <b>left over</b>. The file checks your work when you run it.',
        steps: [
          'Press <b>Open in VS Code</b>. If nothing happens, open VS Code yourself and use File, Open to find the path shown below.',
          'Between the <code>START</code> and <code>END</code> lines, replace each <code>...</code> with a sum. Let Python do the maths: do not type the answers. Save the file.',
          'Run it with the Run button at the top right of VS Code. At the bottom you see <code>PASS</code> or a hint that tells you what to change.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does this line show?',
        pic: code(['print(12 / 3)'], { title: 'cookies.py' }),
        options: ['4.0', '4', '3', '12 / 3'],
        answer: 0,
        why: 'One slash always gives a float, even when it divides evenly. So you see <code>4.0</code>.',
        hint: 'It is about the kind of number. Does one slash give an int or a float?'
      },
      {
        type: 'match', q: 'Match each sign to its kitchen job.',
        pairs: [
          ['*', 'Double the recipe: <code>250 ? 2</code>'],
          ['/', 'An exact share: <code>7 ? 2</code> is 3.5'],
          ['//', 'Whole cookies each: <code>14 ? 3</code> is 4'],
          ['%', 'Cookies left on the tray: <code>14 ? 3</code> is 2'],
          ['**', 'A power: <code>10 ? 2</code> is 100']
        ],
        why: 'Star times, slash exact, two slashes whole, percent the leftovers, two stars a power.',
        hint: 'Start with the ones you are sure about. The leftovers are the remainder.'
      },
      {
        type: 'pick', q: 'Dinner was $60 and the tip $15. What does this show?',
        pic: code(['print(60 + 15 / 3)'], { title: 'bill.py' }),
        options: ['65.0', '25.0', '25', '75'],
        answer: 0,
        why: 'Python divides before it adds: 15 / 3 is 5.0, then 60 + 5.0 is <code>65.0</code>. Only the tip was split.',
        hint: 'Which does Python do first: the plus or the divide?'
      },
      {
        type: 'fix', q: 'Make this print the fair share for each of 3 friends: <code>25.0</code>. Keep the numbers 60, 15 and 3.',
        code: ['print(60 + 15 / 3)'],
        title: 'bill.py',
        check: [
          'if out.strip() == "25.0":',
          '    ok = True',
          'elif out.strip() == "65.0":',
          '    msg = "Still 65.0. Only the tip is split. Put brackets around 60 + 15."',
          'elif out.strip() == "25":',
          '    msg = "Right amount, but keep one slash. Money needs an exact share."',
          'else:',
          '    msg = "It printed " + out.strip() + ". Add the bill first, then divide by 3."'
        ].join('\n'),
        why: '<code>(60 + 15) / 3</code>: brackets go first, so the whole $75 is split. $25 each.',
        hint: 'Brackets go first. Which part should Python do first?'
      },
      {
        type: 'fix', q: 'Chloe shares <b>17</b> cookies between 3 friends. Make line 1 print the whole cookies each, and line 2 the cookies left over.',
        code: ['print(17 / 3)', 'print(17 - 3)'],
        title: 'cookies.py',
        check: [
          'lines = out.splitlines()',
          'if lines == ["5", "2"]:',
          '    ok = True',
          'elif len(lines) != 2:',
          '    msg = "Keep exactly 2 print lines."',
          'elif lines[0].startswith("5.6"):',
          '    msg = "Line 1 still cuts cookies into pieces. Use two slashes for whole ones."',
          'elif lines[0] != "5":',
          '    msg = "Line 1 printed " + lines[0] + ". 17 cookies, 3 friends: how many whole ones each?"',
          'else:',
          '    msg = "Line 1 is right. Line 2 printed " + lines[1] + ". Which sign gives the leftovers?"'
        ].join('\n'),
        why: '<code>17 // 3</code> is 5 whole cookies each (15 used), and <code>17 % 3</code> is the 2 left on the tray.',
        hint: 'Two slashes for whole pieces. The percent sign for the leftovers.'
      },
      {
        type: 'pick', q: 'Which of these lines print exactly <code>4</code>? (Not 4.0.)',
        options: ['print(14 // 3)', 'print(12 / 3)', 'print(8 // 2)', 'print(2 ** 2)', 'print(9 % 5)'],
        answer: [0, 2, 3, 4],
        why: '14 // 3 is 4, 8 // 2 is 4, 2 ** 2 is 4 and 9 % 5 is 4 (9 is one 5 and 4 left over). But <code>12 / 3</code> gives <code>4.0</code>, because one slash always gives a float.',
        hint: 'Work each one out. Watch for the one that gives a float.'
      },
      {
        type: 'type', q: 'Ben aims for 140 grams of protein and ate 118. Type a line that prints how far he is from his target, as a number without a minus sign.',
        prompt: '>>>',
        answers: ['print(abs(118 - 140))', 'print(abs(140 - 118))'],
        accept: '^print\\(\\s*abs\\(\\s*(118\\s*-\\s*140|140\\s*-\\s*118)\\s*\\)\\s*\\)$',
        why: '<code>abs</code> gives the distance, always positive: 22 grams. Either order works.',
        hint: 'print, then abs, then the take-away sum inside. Two pairs of brackets.'
      },
      {
        type: 'pick', q: 'Back to lesson 4. You split the bill among 0 friends by mistake. Read the note from the bottom up. What went wrong?',
        pic: term(['$ python3 bill.py', 'Traceback (most recent call last):', '  File "bill.py", line 1, in <module>', '    print(75.60 / 0)', '          ~~~~~~^~~', 'ZeroDivisionError: division by zero'], 'terminal'),
        options: ['You divided by zero, on line 1', 'The number 75.60 is too big', 'print is spelled wrong', 'Python cannot divide floats'],
        answer: 0,
        why: 'The last line names the problem: <code>ZeroDivisionError: division by zero</code>. The line above says where: line 1, with <code>^</code> under the slash. Nobody can share a bill between 0 people.',
        hint: 'The last line names the problem. Read it word by word.'
      }
    ]
  });
})();
