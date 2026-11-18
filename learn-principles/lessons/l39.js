/* Lesson 39: Defensive programming (module 4). One file per lesson. */
(function () {
  const { P, code, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l39  Defensive programming
     ===================================================================== */

  // A wall with one gate. Brick lines are drawn from a fixed pattern.
  const wall = (x, y1, y2, gy1, gy2) => {
    const seg = (a, b) => `<rect x="${x}" y="${a}" width="30" height="${b - a}" fill="${P.sand}" stroke="${P.ink}" stroke-width="2.5"/>` +
      Array.from({ length: Math.floor((b - a) / 20) }, (_, i) => `<line x1="${x}" y1="${a + 20 + i * 20}" x2="${x + 30}" y2="${a + 20 + i * 20}" stroke="${P.ink}" stroke-width="1.5" opacity="0.45"/>`).join('');
    return seg(y1, gy1) + seg(gy2, y2);
  };

  const ideaPic = svg(600, 300, 'Things from outside all pass through one gate in a wall, where they are checked once. Inside the wall, the till, the sales file and the kitchen trust what they are given.',
    T(100, 28, 'OUTSIDE', { s: 12.5, f: P.warn }) + T(455, 28, 'INSIDE YOUR PROGRAM', { s: 12.5, f: P.ok }) +
    ['typed into a box', 'an uploaded file', "another company's reply", 'a web address'].map((s, i) => {
      const y = 46 + i * 56;
      return box(14, y, 172, 40, P.warnT, 10) + T(100, y + 25, s, { s: 12 }) + arrow(192, y + 20, 262, 138 + i * 8, P.warn, 2.5);
    }).join('') +
    wall(270, 16, 262, 120, 180) +
    T(285, 290, 'one gate', { s: 12.5 }) + T(285, 274, 'checked once, here', { s: 12, w: 700, f: P.ink2 }) +
    `<circle cx="285" cy="150" r="17" fill="${P.ok}" stroke="${P.ink}" stroke-width="2.5"/><path d="M277 151 l6 6 l11 -13" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>` +
    arrow(306, 150, 344, 150, P.ok, 3) +
    ['till', 'sales file', 'kitchen'].map((s, i) => {
      const y = 56 + i * 68;
      return box(370, y, 170, 46, P.okT, 12) + T(455, y + 29, s, { s: 14, f: P.ok });
    }).join('') +
    `<path d="M350 150 V79 H366 M350 150 H366 M350 150 V215 H366" fill="none" stroke="${P.ok}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>` +
    T(455, 274, 'clean values only', { s: 12.5, f: P.ok }) + T(455, 290, 'no more checks needed in here', { s: 12, w: 700, f: P.ink2 }));

  const trustCode = [
    'COOKIE_PRICE = 3',
    '',
    'def order_form(name, text):',
    '    count = int(text)',
    '    place_order(name, count)',
    '',
    'def place_order(name, count):',
    '    total = count * COOKIE_PRICE',
    '    show_total(total)',
    '    save_sale(name, total)',
    '    send_to_kitchen(name, count)'
  ];

  const gateCode = [
    'ASK = "Please enter a whole number from 1 to 100"',
    '',
    'def clean_count(text):',
    '    count = int(text)',
    '    if count < 1 or count > 100:',
    '        raise ValueError("count must be 1 to 100")',
    '    return count',
    '',
    'def order_form(name, text):',
    '    try:',
    '        count = clean_count(text)',
    '    except ValueError:',
    '        return show_message(ASK)',
    '    place_order(name, count)'
  ];

  const overCode = [
    'def place_order(name, count):',
    '    if count < 1 or count > 100:',
    '        raise ValueError("bad count")',
    '    total = count * COOKIE_PRICE',
    '    show_total(total)',
    '    save_sale(name, total)',
    '    send_to_kitchen(name, count)',
    '',
    'def send_to_kitchen(name, count):',
    '    if count < 1 or count > 99:',
    '        raise ValueError("bad count")',
    '    show_on_kitchen_screen(name, count)'
  ];

  // One row per visitor: what was typed, and what happened to it.
  const parade = (label, head, rows, foot) => {
    const tone = { ok: [P.okT, P.ok], bad: [P.dangerT, P.danger], warn: [P.warnT, P.warn] };
    return svg(600, 62 + rows.length * 40 + (foot ? 24 : 0), label,
      T(92, 22, 'TYPED IN THE BOX', { s: 12, f: P.ink2 }) + T(396, 22, head, { s: 12, f: P.ink2 }) +
      rows.map((r, i) => {
        const y = 34 + i * 40, c = tone[r[2]];
        return box(14, y, 156, 30, '#15132B', 8) + T(92, y + 20, r[0], { s: 13, m: !r[3], f: '#ECEAFF' }) +
          arrow(176, y + 15, 196, y + 15, c[1], 2.5) +
          box(202, y, 384, 30, c[0], 8) + T(394, y + 20, r[1], { s: 12.5, f: c[1] });
      }).join('') +
      (foot ? T(300, 54 + rows.length * 40, foot, { s: 12.5, w: 700, f: P.ink2 }) : ''));
  };

  const codePic = `<div style="width:100%">${code(trustCode, { title: 'website.py', hi: [4] })}` +
    term(['$ "3" * 3', "'333'", '$ int("3") * 3', '9'], 'trying it in Python: text is not a number') + `</div>`;

  const painPic = parade('Seven visitors and what the trusting code does with each. Two are fine, two break the page, two give absurd totals, and one tries to trick the program.',
    'WHAT THE SHOP DOES', [
      ['"3"', 'total $9. Fine.', 'ok'],
      ['"2 "', 'total $6. Fine, int() ignores the space.', 'ok'],
      ['""', 'ValueError. A broken page, the order is lost.', 'bad'],
      ['"three"', 'ValueError. A broken page again.', 'bad'],
      ['"-5"', 'total -$15, saved in the sales file', 'bad'],
      ['"1000000"', '$3,000,000, and a million cookies for the kitchen', 'bad'],
      ['odd symbols', 'in the name box, hoping the program will run them', 'warn', true]
    ], 'Maya only ever tested the first row.');

  const fixPic = `<div style="width:100%">${code(gateCode, { title: 'website.py, with a gate', good: [3, 4, 5, 6, 7, 10, 11, 12, 13] })}` +
    parade('The same visitors with the gate in place. Two go in as real numbers. The other four are sent back with a kind message and nothing inside is touched.',
      'AT THE GATE', [
        ['"3"', 'goes in as the number 3. Total $9.', 'ok'],
        ['"2 "', 'goes in as the number 2. Total $6.', 'ok'],
        ['""', 'sent back with the message', 'warn'],
        ['"three"', 'sent back with the message', 'warn'],
        ['"-5"', 'sent back with the message', 'warn'],
        ['"1000000"', 'sent back with the message', 'warn']
      ], 'The message: Please enter a whole number from 1 to 100') + `</div>`;

  const testPic = svg(600, 322, 'Three questions to ask at the gate: is it present, is it the right kind, is it in range or on the list. Below, a ban list lets an unlisted bad value in, and a guest list turns away everything not on it.',
    T(300, 24, 'Three questions at the gate', { s: 14 }) +
    [
      ['1', 'Is it present?', 'an empty box', 'is not an answer'],
      ['2', 'Is it the right kind?', '"three" is', 'not a number'],
      ['3', 'In range, or on the list?', '1000000 is', 'not 1 to 100']
    ].map((q, i) => {
      const x = 14 + i * 196;
      return box(x, 40, 180, 96, P.white, 12) +
        `<circle cx="${x + 24}" cy="64" r="13" fill="${P.accent}" stroke="${P.ink}" stroke-width="2.5"/>` + T(x + 24, 69, q[0], { s: 13, f: '#fff' }) +
        T(x + 44, 69, q[1], { s: i === 2 ? 11.5 : 12.5, a: 'start' }) +
        T(x + 90, 100, q[2], { s: 12.5, w: 700, f: P.ink2 }) + T(x + 90, 118, q[3], { s: 12.5, w: 700, f: P.ink2 });
    }).join('') +
    `<line x1="20" y1="158" x2="580" y2="158" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    T(150, 186, 'BAN LIST: "NOT THESE"', { s: 12.5, f: P.danger }) + T(450, 186, 'GUEST LIST: "ONLY THESE"', { s: 12.5, f: P.ok }) +
    box(30, 198, 240, 46, '#15132B', 12) + T(150, 227, 'not "mud", not "soap"', { s: 13, m: true, f: '#ECEAFF' }) +
    box(330, 198, 240, 46, '#15132B', 12) + T(450, 227, 'choc chip, oat, ginger', { s: 13, m: true, f: '#ECEAFF' }) +
    T(150, 274, '"glue" is not on it, so glue walks in', { s: 12.5, f: P.danger }) +
    T(450, 274, '"glue" is not on it, so glue is turned away', { s: 12.5, f: P.ok }) +
    T(150, 296, 'you can never list every bad thing', { s: 12.5, w: 700, f: P.ink2 }) +
    T(450, 296, 'you only have to list the good ones', { s: 12.5, w: 700, f: P.ink2 }));

  COURSE.add({
    id: 'l39', minutes: 9,
    summary: 'Anything that arrives from <b>outside</b> your program can be wrong, missing, huge, the wrong kind of thing, or sent to cause trouble. <b>Defensive programming</b> means checking it once, at the border where it comes in, and letting only clean values through. Then the inside of the program can trust its own data.',
    video: {
      src: 'videos/l39-defensive-programming.mp4', poster: 'videos/l39-defensive-programming.jpg', length: '1 min 6 s',
      script: [
        "Maya's website has one box. How many cookies? Whatever a visitor types arrives as text, and the code trusts it.",
        'Watch who turns up. 3. Fine. An empty box. Crash. The word three. Crash. -5. A negative total. 1 million. The kitchen screen floods. And someone types strange symbols, hoping the program will run them.',
        'So Maya builds a wall, with one gate. Everything from outside is checked there, once. Is it there? Is it a number? Is it between 1 and 100?',
        '3 passes. The text becomes a real number, and walks in. The rest are handed back, with a kind note. Please enter a whole number from 1 to 100.',
        'Inside the wall, the kitchen, the till and the sales file simply trust what they are given. No guard in every room.',
        'That is defensive programming. Never trust what comes from outside. Check it once, at the gate.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'One check at the entrance.',
        text: [
          'At an airport, everyone is checked once, at security. After that you walk around freely. Nobody searches your bag again at the coffee stand.',
          'A program has an entrance too. Things arrive from <b>outside</b>: what a person types into a box, a file someone uploads, a reply from another company\'s service, a number in a web address. Your code made none of it. It can be wrong, missing, huge, the wrong kind of thing, or sent by someone who wants to cause trouble.',
          '<b>Defensive programming</b> means: never trust what arrives from outside. Check it at the <b>border</b>, the moment it crosses into your program. Turn it into a clean value that you know is good. Turn the rest away with a clear message. Past the border, the rest of the program can relax and trust its own data.'
        ],
        tip: 'Lesson 22, Fail fast, said to check "at the door where the data comes in", and promised a lesson about where the doors are. This is that lesson.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'A box on the website.',
        text: [
          'Maya\'s website has a box: "How many cookies?" When a customer presses Order, the website runs <code>order_form</code>. It is handed the customer\'s <code>name</code> and <code>text</code>, which is whatever was typed in the box.',
          'Here is a fact that surprises every beginner. What arrives from a form is always <b>text</b>, even when it looks like a number. The text <code>"3"</code> is not the number <code>3</code>. In Python, <code>"3" * 3</code> is <code>"333"</code>. Text times 3 is the same text written 3 times.',
          'So line 4 uses <code>int()</code>, which turns text into a whole number. <code>int("3")</code> gives <code>3</code>. Then <code>place_order</code> works out the total, shows it, saves the sale and tells the kitchen. A cookie costs $3. Tax is left out to keep the sums easy.',
          'Maya tries it. She types 3 and the total is $9. It works, so the form goes live. Now look for the line that asks <b>"is this a sensible number of cookies?"</b> There is none. Maya tested what <b>she</b> would type.'
        ]
      },
      {
        label: 'The pain', pic: painPic,
        h: 'One morning, seven visitors.',
        text: [
          'Real visitors do not type what Maya typed. Here is one morning.',
          '<b>One leaves the box empty. One types "three".</b> <code>int("")</code> and <code>int("three")</code> cannot make a number, so Python raises a <code>ValueError</code>, the error you met in lesson 22. Nothing is there to deal with it. The customer sees a broken page, and the order is lost.',
          '<b>One types -5.</b> That is a perfectly good whole number for <code>int()</code>. The total is <b>-$15</b>, and it is saved, just like the minus three cakes in lesson 22.',
          '<b>One leans on a key and sends 1000000.</b> The total is $3,000,000, and the kitchen screen fills with an order for a million cookies.',
          '<b>One types "2 " with a space after it.</b> That one is fine. <code>int()</code> ignores spaces around a number.',
          '<b>And one types a line of strange symbols into the name box</b>, hoping the shop\'s program will mistake it for instructions and run it. Some people do this on purpose, to every website they can find.'
        ],
        warn: 'None of these visitors is rare. If a box can be typed into, sooner or later someone types everything into it. Maya\'s code is not badly written. It is <b>trusting</b>, and it trusts the one thing it has never seen: what a stranger will send.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'One gate, and everything goes through it.',
        text: [
          'Maya writes one small job whose only work is to be the gate: <code>clean_count</code>. Text goes in. Either a real, sensible number comes out, or the job stops.',
          'Line 4 tries to make a whole number. For <code>""</code>, <code>"three"</code> or <code>"2.5"</code>, <code>int()</code> itself raises a <code>ValueError</code>. Line 5 checks the range. <code>or</code> means "if either one is true". Maya bakes at most 100 cookies for one online order, so a count below 1 or above 100 is turned away with <code>raise</code>, as in lesson 22.',
          'Lines 10 to 13 are new Python. <code>try:</code> means <b>"try the lines pushed in below me"</b>. <code>except ValueError:</code> means <b>"if they stop with a ValueError, do this instead"</b>. So trouble at the gate no longer breaks the page. Line 13 shows the customer a kind message and leaves the job at once, like a guard clause in lesson 21.',
          'Run the morning again. "3" and "2 " go in as the numbers 3 and 2. The empty box, "three", -5 and 1000000 all get the same answer, straight away: <b>Please enter a whole number from 1 to 100</b>. Nothing is saved. The kitchen sees nothing.',
          'Now look at <code>place_order</code>. It has not changed, and it needs no checks. Every count that reaches it came through the gate, so it is a real number from 1 to 100. This <b>is</b> failing fast, at the earliest point there is. For a customer it just looks like a kind message, not a crash.'
        ],
        tip: 'And the strange symbols in the name box? One rule covers them: whatever a visitor types is <b>plain data, never instructions</b>. The program may store a name and print a name. It must never run a name. The name box gets its own small gate too: is anything there, and is it a sensible length?'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Where does it first come in?',
        text: [
          'Point at any value in your code and ask: <b>"Where does this value first enter my program, and is it checked right there?"</b>',
          'At the gate, ask three things. <b>Is it present?</b> An empty box is not an answer. <b>Is it the right kind?</b> A number, not a word. <b>Is it in a sensible range, or on the allowed list?</b> From 1 to 100 cookies. One of the flavours on the menu.',
          'For that last question, a <b>guest list</b> beats a <b>ban list</b>. A ban list says "not these": no minus numbers, no "mud" flavour. But you can never list every bad thing, and the one you forgot walks straight in. A guest list says "only these": 1 to 100, and the three flavours Maya sells. Everything else is turned away, including things nobody thought of.'
        ],
        tip: 'In Python a guest list is one line. <code>if flavour not in FLAVOURS:</code> asks "is this flavour missing from the list?".'
      },
      {
        label: 'When not to', pic: code(overCode, { title: 'website.py, overdone', bad: [2, 3, 10, 11] }),
        h: 'One gate. Not a guard in every room.',
        text: [
          '<b>Do not check the same value again in every job.</b> Suppose Maya loves this lesson and copies the count check into <code>place_order</code> and <code>send_to_kitchen</code> as well. Look at the picture. The checks now crowd out the real work. They have already drifted apart: line 2 says 100 and line 10 says 99, just as lesson 6, DRY, warned. And nobody can tell any more which check is the real gate.',
          '<b>Values made by your own code do not need the border treatment.</b> <code>total</code> was worked out one line earlier, from a checked count and Maya\'s own price. Checking it again protects nothing. Inside the walls, parts trust each other because each one says clearly what it promises. That has a name: lesson 40, Design by contract.',
          '<b>Do not "defend" by guessing.</b> Turning "three" into 0, or -5 into 5, keeps the page running and hides the problem. The customer who typed -5 by mistake gets 5 cookies and a bill. Lesson 22 had a name for this: the same quiet bug wearing a tidy coat.'
        ],
        warn: 'And never write a bare <code>except:</code>, with no error name, just to keep the program running. It catches <b>every</b> problem, including real mistakes in your own code, and hides them all. Catch the one error you expect, by name.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'A customer types 4 in the box. What does line 2 put in <code>total</code>?',
        pic: code([
          'text = "4"            # what the form sends',
          'total = text * 3'
        ], { title: 'website.py' }),
        options: ['The number 12', 'The text "444"', 'The text "43"', 'Nothing: Python stops with an error'],
        answer: 1,
        why: 'What a form sends is text. Text times 3 is the same text written 3 times, so the "total" is <code>"444"</code>. <code>int(text) * 3</code> gives 12.',
        hint: 'Look at the quote marks on line 1. Is that a number, or text?'
      },
      {
        type: 'bucket', q: 'Which of these come from outside and need checking at the border?',
        buckets: ['From outside: check at the border', 'Made inside: already trusted'],
        items: [
          ['What a customer types in the order box', 0],
          ['A photo a customer uploads for a cake', 0],
          ['The reply from the card company\'s service', 0],
          ['An order number in the web address', 0],
          ['COOKIE_PRICE, set in Maya\'s own code', 1],
          ['The total that place_order just worked out', 1]
        ],
        why: 'A box, an upload, another company\'s reply and a web address can all carry anything at all. A value your own code just made from checked values is already inside the wall.',
        hint: 'Ask of each one: did Maya\'s own code make this value, or did it arrive from somewhere else?'
      },
      {
        type: 'match', q: 'Match each thing typed in the "How many cookies?" box to what happens at the gate.',
        pairs: [
          ['An empty box', 'Fails "is it present?"'],
          ['"three"', 'Fails "is it the right kind?"'],
          ['"1000000"', 'Fails "is it in a sensible range?"'],
          ['"12"', 'Passes all three and goes in as the number 12']
        ],
        why: 'Present, right kind, sensible range. Only "12" answers yes three times, and only then is it turned from text into a real number.',
        hint: 'A million is a real number. So which question does it fail?'
      },
      {
        type: 'fill', q: 'Finish the form job so that trouble at the gate becomes a kind message.',
        text: 'def order_form(name, text):\n    ___:\n        count = clean_count(text)\n    ___ ValueError:\n        return show_message(ASK)\n    place_order(name, count)',
        options: ['try', 'except', 'if', 'raise', 'else'],
        answer: ['try', 'except'],
        why: '<code>try:</code> says "try the lines below". <code>except ValueError:</code> says "if they stop with a ValueError, do this instead".',
        hint: 'The first blank means "try this". The second means "if it fails in this way".'
      },
      {
        type: 'pick', q: 'Back to lesson 22, Fail fast. A customer types <code>-5</code> by mistake. What does this "helpful" gate do?',
        pic: code([
          'def clean_count(text):',
          '    count = int(text)',
          '    if count < 0:',
          '        count = -count      # flip it to plus',
          '    return count'
        ], { title: 'a "helpful" gate' }),
        options: ['It shows "Please enter a whole number from 1 to 100"', 'It lets 5 through and tells nobody', 'It stops with a ValueError', 'It lets -5 through'],
        answer: 1,
        why: 'Line 4 guesses what the customer meant and carries on. Maybe they wanted 5. Maybe 50. Nobody is asked. Lesson 22 called a made-up value a quiet bug in a tidy coat. A gate should turn bad input away and say why, not repair it in secret.',
        hint: 'Read line 4. What is count after it runs, and does anyone find out?'
      },
      {
        type: 'pick', q: 'A visitor sends the flavour <code>"glue"</code>. <code>in</code> asks "is it on this list?". Which version turns glue away?',
        pic: code([
          '# version A: a ban list',
          'if flavour in ["mud", "soap"]:',
          '    raise ValueError("not a flavour we sell")',
          '',
          '# version B: a guest list',
          'FLAVOURS = ["choc chip", "oat", "ginger"]',
          'if flavour not in FLAVOURS:',
          '    raise ValueError("not a flavour we sell")'
        ], { title: 'two ways to check a flavour' }),
        options: ['Only version A', 'Only version B', 'Both versions', 'Neither version'],
        answer: 1,
        why: 'Glue is not on the ban list, so version A lets it in. Nobody can list every bad thing. Version B lists the three good ones and turns away everything else, glue included.',
        hint: 'Is "glue" on the list in line 2? Is it on the list in line 6?'
      },
      {
        type: 'pick', q: 'Which of these are defensive programming overdone, or done wrong? Pick all that apply.',
        options: [
          'Checking the count again in place_order, save_sale and send_to_kitchen',
          'Checking the order box once, in order_form, the moment the text arrives',
          'Turning "three" into 0 so that the order still goes through',
          'A bare except: that catches every error and carries on'
        ],
        answer: [0, 2, 3],
        why: 'One gate at the border is the whole idea. A guard in every room buries the real code and drifts apart. Guessing a value hides the problem. And a catch-all hides every problem, including your own bugs.',
        hint: 'Only one of these is the gate itself.'
      },
      {
        type: 'pick', q: 'The delivery page sends <code>km</code>, how far away the customer lives, as text. Three jobs use it. Where does the check belong?',
        pic: code([
          'def delivery_form(name, text):',
          '    km = int(text)',
          '    fee = delivery_fee(km)',
          '    book_driver(name, km)',
          '    print_slip(name, km, fee)'
        ], { title: 'delivery.py' }),
        options: ['In delivery_fee, book_driver and print_slip, to be safe', 'In delivery_form, as its first step, before anything uses km', 'In print_slip, as the last step', 'Nowhere. Customers know where they live.'],
        answer: 1,
        why: '<code>delivery_form</code> is where the text first enters the program. Check it there, once, and the three jobs after it can trust <code>km</code>.',
        hint: 'Use the test: where does this value first enter the program?'
      }
    ]
  });
})();
