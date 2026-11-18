/* Lesson 45: Leaky abstractions (module 5). One file per lesson. */
(function () {
  const { P, code, term, svg, box, T, arrow, esc } = PR;

  /* =====================================================================
     l45  Leaky abstractions
     ===================================================================== */
  const divider = (x, y1, y2) => `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>`;
  const two = (x, y, a, b, o) => T(x, y, a, o) + T(x, y + ((o && o.gap) || 17), b, o);

  /* ---- The idea: the same wheel and pedals on a normal day and on a bad day ---- */
  const wheel = (cx, cy) =>
    `<circle cx="${cx}" cy="${cy}" r="40" fill="${P.white}" stroke="${P.ink}" stroke-width="8"/>` +
    `<path d="M${cx} ${cy} L${cx} ${cy + 38} M${cx} ${cy} L${cx - 37} ${cy - 11} M${cx} ${cy} L${cx + 37} ${cy - 11}" stroke="${P.ink}" stroke-width="6" stroke-linecap="round"/>` +
    `<circle cx="${cx}" cy="${cy}" r="11" fill="${P.accent}" stroke="${P.ink}" stroke-width="2.5"/>`;
  const pedals = (x, y, fill) => box(x, y + 10, 30, 50, P.tint, 9) + box(x + 44, y, 24, 60, fill || P.tint, 9);
  const ideaPic = svg(600, 300, 'On a normal day the driver presses the go pedal and the car goes. On a bad day the same pedal does nothing, because the tank is empty. The fuel gauge is the car being honest about what is hidden inside.',
    T(150, 30, 'A NORMAL DAY', { s: 12.5, f: P.ok }) + T(450, 30, 'A BAD DAY', { s: 12.5, f: P.danger }) +
    divider(300, 18, 284) +
    wheel(104, 116) + pedals(180, 86) +
    T(195, 172, 'stop', { s: 12, w: 700, f: P.ink2 }) + T(236, 172, 'go', { s: 12, w: 700, f: P.ink2 }) +
    box(60, 196, 180, 40, P.okT, 12) + T(150, 221, 'press go: the car goes', { s: 13, f: P.ok }) +
    two(150, 262, 'You never think about', 'what is under the bonnet.', { s: 13, w: 700, f: P.ink2 }) +
    wheel(374, 116) + pedals(440, 86, P.dangerT) +
    /* fuel gauge on empty */
    `<path d="M512 132 A40 40 0 0 1 592 132" fill="${P.white}" stroke="${P.ink}" stroke-width="3"/>` +
    `<line x1="552" y1="132" x2="520" y2="118" stroke="${P.danger}" stroke-width="4" stroke-linecap="round"/>` +
    `<circle cx="552" cy="132" r="5" fill="${P.ink}"/>` +
    T(520, 148, 'E', { s: 12, f: P.danger }) + T(584, 148, 'F', { s: 12, f: P.ink2 }) + T(552, 166, 'fuel', { s: 11.5, w: 700, f: P.ink2 }) +
    box(336, 196, 228, 40, P.dangerT, 12) + T(450, 221, 'press go: nothing happens', { s: 13, f: P.danger }) +
    two(450, 262, 'Now you need to know one thing', 'about the insides: it burns fuel.', { s: 13, w: 700, f: P.ink2 }));

  /* ---- The code: two simple fronts ---- */
  const notifyCode = [
    'def notify(customer, message):',
    '    line = phone_company.connect()',
    '    number = "+1" + customer.phone',
    '    message = message[:160]',
    '    reply = line.send(number, message)',
    '    if reply != "OK":',
    '        line.send(number, message)'
  ];
  const rulesCode = [
    'class SalesBook:',
    '    def save(self, time, total, points):',
    '        pass',
    '',
    'def record_sale(order, sales_book):',
    '    total = order.price + order.price * TAX_RATE',
    '    points = order.price',
    '    sales_book.save(order.time, total, points)'
  ];
  const frontPic = svg(600, 150, 'Two handles and what each one promises. Notify promises to tell the customer. Save promises to save the sale. Neither one mentions phones, limits, the internet or time.',
    T(300, 24, 'WHAT THE FRONT SAYS', { s: 12.5, f: P.accent }) +
    box(24, 40, 264, 56, P.tint, 14) + T(156, 64, 'notify(customer, message)', { s: 12.5, m: true }) + T(156, 84, '"tell the customer"', { s: 12.5, w: 700, f: P.ink2 }) +
    box(312, 40, 264, 56, P.tint, 14) + T(444, 64, 'sales_book.save(...)', { s: 12.5, m: true }) + T(444, 84, '"save the sale"', { s: 12.5, w: 700, f: P.ink2 }) +
    T(300, 126, 'No phones. No limits. No internet. No waiting.', { s: 13, w: 700, f: P.ink2 }) +
    T(300, 144, 'That is the promise, and on a normal day it holds.', { s: 13, w: 700, f: P.ink2 }));
  const codePic = `<div style="width:100%">${code(notifyCode, { title: 'shop.py, the text version of notify from lesson 18', hi: [1] })}${code(rulesCode, { title: 'rules.py, from lesson 32', hi: [2, 8] })}${frontPic}</div>`;

  /* ---- The pain, leak 1: 190 characters go in, 160 come out ---- */
  const MSG = 'Your cake is ready! Come to the side door on Baker Street and ring the bell twice. We are open until 6 pm tonight, so there is no need to rush. Show this code at the door: your code is 4471.';
  const LIMIT = 160;
  const wrap = (s, n) => {
    const out = []; let cur = '';
    s.split(' ').forEach(w => {
      if (cur && (cur + ' ' + w).length > n) { out.push(cur + ' '); cur = w; } else cur = cur ? cur + ' ' + w : w;
    });
    out.push(cur);
    return out;
  };
  const monoLine = (x, y, kept, cutPart) =>
    `<text x="${x}" y="${y}" font-size="11.5" font-weight="600" font-family="JetBrains Mono, monospace" xml:space="preserve">` +
    `<tspan fill="${P.ink}">${esc(kept)}</tspan>` +
    (cutPart ? `<tspan fill="${P.danger}" font-weight="800" text-decoration="line-through">${esc(cutPart)}</tspan>` : '') + `</text>`;
  const wroteLines = (() => {
    let at = 0;
    return wrap(MSG, 40).map((l, i) => {
      const keep = Math.max(0, Math.min(l.length, LIMIT - at));
      at += l.length;
      return monoLine(36, 76 + i * 20, l.slice(0, keep), l.slice(keep));
    }).join('');
  })();
  const gotLines = wrap(MSG.slice(0, LIMIT), 23).map((l, i) => monoLine(398, 78 + i * 19, l, '')).join('');
  const cutPic = svg(600, 262, 'Sam wrote 190 characters. The phone shows only the first 160. The message stops in the middle of a sentence, and the pickup code 4471 never arrives.',
    T(170, 30, 'WHAT SAM WROTE: ' + MSG.length + ' CHARACTERS', { s: 12.5, f: P.ink }) + T(482, 30, 'WHAT ARRIVED: ' + LIMIT, { s: 12.5, f: P.danger }) +
    box(22, 46, 316, 136, P.white, 14) + wroteLines +
    arrow(346, 114, 372, 114, P.ink, 3) +
    box(382, 46, 200, 186, P.paper2, 20) + box(390, 58, 184, 162, P.okT, 12) + gotLines +
    T(180, 208, 'last ' + (MSG.length - LIMIT) + ' characters: cut, with no warning', { s: 13, f: P.danger }) +
    T(180, 230, 'notify finished happily. No error.', { s: 13, w: 700, f: P.ink2 }) +
    T(482, 254, 'no code, no cake', { s: 13, f: P.danger }));
  const samCode = [
    'def cake_ready(customer):',
    '    # 190 characters. The pickup code comes last.',
    '    message = cake_message(customer)',
    '    notify(customer, message)'
  ];

  /* ---- The pain, leak 2: same front, three very different books ---- */
  const onlineCode = [
    'import web_books',
    'from rules import SalesBook',
    '',
    'class OnlineBook(SalesBook):',
    '    def save(self, time, total, points):',
    '        web_books.post(time, total, points)'
  ];
  const bookRow = (y, name, time, where, bad) =>
    box(24, y, 170, 40, bad ? P.dangerT : P.okT, 12) + T(109, y + 25, name, { s: 12.5, m: true }) +
    T(290, y + 25, time, { s: 13, f: bad ? P.danger : P.ok }) +
    T(470, y + 25, where, { s: 12.5, w: 700, f: bad ? P.danger : P.ink2 });
  const booksPic = svg(600, 226, "Three books with the same save job. Maya's timer shows the spreadsheet book takes about 0.1 seconds, the database book 0.01 seconds, and the online book from 0.4 to 3 seconds. Only the online book needs the internet.",
    T(109, 24, 'SAME FRONT: save(...)', { s: 12.5, f: P.accent }) + T(290, 24, "MAYA'S TIMER", { s: 12.5, f: P.ink2 }) + T(470, 24, 'WHAT IT NEEDS', { s: 12.5, f: P.ink2 }) +
    bookRow(38, 'SpreadsheetBook', 'about 0.1 s', 'a file on this computer') +
    bookRow(92, 'DatabaseBook', '0.01 s', 'a file on this computer') +
    bookRow(146, 'OnlineBook', '0.4 s to 3 s', 'the internet, every time', true) +
    T(300, 214, 'The buttons match. The behaviour behind them does not.', { s: 13, w: 700, f: P.ink2 }));
  const painPic = `<div style="width:100%">${code(samCode, { title: "shop.py, Sam's cake message", bad: [4] })}${cutPic}` +
    code(onlineCode, { title: 'online_book.py, from lesson 32', bad: [6] }) + booksPic +
    term(['$ python till.py', 'Saving sale 41 ...', 'Saving sale 42 ...', 'ConnectionError: cannot reach the web_books server'], 'the till, Saturday 10:40') + `</div>`;

  /* ---- The fix ---- */
  const notifyFixed = [
    'MAX_TEXT = 160',
    '',
    'def notify(customer, message):',
    '    """Send one text. At most 160 characters."""',
    '    if len(message) > MAX_TEXT:',
    '        raise ValueError("message is " + str(len(message))',
    '                         + " characters, max " + str(MAX_TEXT))',
    '    line = phone_company.connect()',
    '    number = "+1" + customer.phone',
    '    reply = line.send(number, message)',
    '    if reply != "OK":',
    '        line.send(number, message)'
  ];
  const rulesFixed = [
    'class BookUnavailable(Exception):',
    '    pass',
    '',
    'class SalesBook:',
    '    """save may be slow. It may raise BookUnavailable."""',
    '    def save(self, time, total, points):',
    '        pass'
  ];
  const onlineFixed = [
    'import web_books',
    'from rules import SalesBook, BookUnavailable',
    '',
    'class OnlineBook(SalesBook):',
    '    """Needs the internet. Can take 3 seconds."""',
    '    def save(self, time, total, points):',
    '        try:',
    '            web_books.post(time, total, points)',
    '        except ConnectionError:',
    '            raise BookUnavailable("no internet")'
  ];
  const tillFixed = [
    'try:',
    '    record_sale(order, sales_book)',
    'except BookUnavailable:',
    '    waiting.append(order)',
    '    show("Sale kept on this till. Saved later.")',
    'print_receipt(order)'
  ];
  const plate = (x, y, w, s, fill, col) => box(x, y, w, 30, fill, 9) + T(x + w / 2, y + 20, s, { s: 12, f: col });
  const labelPic = svg(600, 196, 'The two handles again, now with honest labels on the front. Notify says: at most 160 characters. Save says: may take a few seconds, and may raise BookUnavailable.',
    T(300, 24, 'THE SAME FRONTS, WITH HONEST LABELS', { s: 12.5, f: P.ok }) +
    box(24, 40, 264, 136, P.white, 14) + T(156, 68, 'notify(customer, message)', { s: 12.5, m: true }) +
    plate(52, 86, 208, 'at most 160 characters', P.okT, P.ok) +
    plate(52, 128, 208, 'longer: a clear error', P.okT, P.ok) +
    box(312, 40, 264, 136, P.white, 14) + T(444, 68, 'sales_book.save(...)', { s: 12.5, m: true }) +
    plate(340, 86, 208, 'may take a few seconds', P.okT, P.ok) +
    plate(340, 128, 208, 'may raise BookUnavailable', P.okT, P.ok));
  const fixPic = `<div style="width:100%">${code(notifyFixed, { title: 'shop.py, notify says its limit', good: [1, 4, 5, 6, 7] })}` +
    code(rulesFixed, { title: 'rules.py, the idea names its own bad day', good: [1, 2, 5] }) +
    code(onlineFixed, { title: 'online_book.py, the error is translated', good: [2, 5, 7, 9, 10] }) +
    code(tillFixed, { title: 'till.py, a plan for the bad day', good: [1, 3, 4, 5] }) + labelPic + `</div>`;

  /* ---- The test ---- */
  const row = (y, name, good, bad1, bad2) =>
    box(20, y, 200, 50, P.tint, 12) + T(120, y + 30, name, { s: 12, m: true }) +
    box(232, y, 150, 50, P.okT, 12) + T(307, y + 30, good, { s: 12.5, f: P.ok }) +
    box(394, y, 186, 50, P.dangerT, 12) + T(487, y + 22, bad1, { s: 12, f: P.danger }) + T(487, y + 39, bad2, { s: 12, f: P.danger });
  const testPic = svg(600, 262, 'Three handles from the shop. For each one, what it says on a good day and what you would need to know on a bad day. Notify: texts hold 160 characters. Save: the book may be far away, slow or offline. Print line: printers sleep and run out of paper.',
    T(120, 24, 'THE HANDLE', { s: 12.5, f: P.accent }) + T(307, 24, 'A GOOD DAY', { s: 12.5, f: P.ok }) + T(487, 24, 'A BAD DAY: I MUST KNOW', { s: 12.5, f: P.danger }) +
    row(38, 'notify(customer, message)', 'tells the customer', 'a text holds', '160 characters') +
    row(100, 'sales_book.save(...)', 'saves the sale', 'the book may be', 'far away, slow or offline') +
    row(162, 'print_line(text)', 'prints a line', 'printers sleep and', 'run out of paper') +
    T(300, 240, 'If the right column is not written on the front, write it there.', { s: 13, w: 700, f: P.ink2 }));

  /* ---- When not to ---- */
  const noHandle = [
    'def cake_ready(customer):',
    '    # "I do not trust notify any more."',
    '    line = phone_company.connect()',
    '    message = cake_message(customer)',
    '    reply = line.send(customer.phone, message)',
    '    if reply != "OK":',
    '        line.send(customer.phone, message)'
  ];
  const sealed = [
    'class OnlineBook(SalesBook):',
    '    def save(self, time, total, points):',
    '        try:',
    '            web_books.post(time, total, points)',
    '        except ConnectionError:',
    '            pass'
  ];
  const whenNotPic = `<div style="width:100%">${code(noHandle, { title: 'overdone: no more handles', bad: [3, 5] })}${code(sealed, { title: 'overdone: a handle that never leaks', bad: [5, 6] })}</div>`;

  COURSE.add({
    id: 'l45', minutes: 10,
    summary: 'A handle promises "you do not need to know how this works inside". On a normal day that is true. On a bad day the hidden machinery shows through: a limit, a wait, a strange error. That is a <b>leaky abstraction</b>. You cannot seal every leak, so make each handle <b>honest</b> about where it leaks.',
    video: {
      src: 'videos/l45-leaky-abstractions.mp4', poster: 'videos/l45-leaky-abstractions.jpg', length: '1 min 14 s',
      script: [
        'In lesson 18, Maya built notify. One simple handle. Behind it, all the fiddly steps of sending a text.',
        'On a normal day, Sam presses it, and it works.',
        "Then Sam writes a long message, with the pickup code at the end. Notify reports no problem. But the customer's text stops mid sentence. The code is missing. Inside, every text is cut at 160 characters. That hidden detail just leaked out.",
        'Save is a handle too. Maya plugs in an online sales book. Now save takes 3 seconds. And when the internet drops, the till freezes, with an error the word save never mentioned.',
        'That is a leaky abstraction. On a bad day, the hidden machinery shows through.',
        'You cannot seal every leak. So be honest. Write the limits on the front. Max 160 characters. Needs internet. And turn strange errors into plain words.',
        'A good handle is simple on a good day, and honest on a bad day.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'The pedal has no word for "empty".',
        text: [
          'In lesson 18, Abstraction, you drove a car with a <b>wheel and two pedals</b>. You never thought about fuel, pistons or gears. That is the promise of every abstraction: <b>"you do not need to know how this works inside."</b>',
          'On a normal day the promise holds. Then one morning you press the go pedal and nothing happens. The tank is empty. The pedal has no word for that. To understand your morning, you suddenly need to know something about the insides: <b>this machine burns fuel</b>.',
          'Lesson 18 also said you can swap the petrol engine for an electric motor and drive the same way. True, on a normal day. On a long trip you find out that charging takes much longer than filling a tank. <b>Same wheel, same pedals, different behaviour behind them.</b>',
          'The hidden machinery is still real. On a bad day its behaviour comes through the simple front: a <b>limit</b> nobody mentioned, a <b>wait</b> you did not expect, a <b>failure</b> the front has no word for. When that happens, people say the abstraction <b>leaks</b>.',
          'Notice what a good car does about it. It does not pretend the engine is not there. It gives you a <b>fuel gauge</b> and a warning light. That is a simple front being honest about its insides.'
        ],
        tip: 'The name comes from Joel Spolsky, a programmer and writer. In a 2002 essay he stated the Law of Leaky Abstractions: "All non-trivial abstractions, to some degree, are leaky." Non-trivial means anything that hides real work. So this is not about badly made handles. It is about all of them.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'Two simple fronts.',
        text: [
          'Here are two handles you already know. Both work, and both are good designs.',
          'The first is <code>notify(customer, message)</code> from lesson 18, in its text version. The front says "tell the customer". Behind it sit the phone company, the country code, the retry, and line 4: <code>message[:160]</code> keeps only the first 160 characters, because one text message holds no more.',
          'The second is the sales book from lesson 32, Dependency inversion. The rules ask for one thing, <code>sales_book.save(...)</code>. The front says "save the sale". Behind it there can be a <code>SpreadsheetBook</code>, a <code>DatabaseBook</code> or an <code>OnlineBook</code>. One idea, three plugs.',
          'Read only the two fronts, as lesson 11, Least astonishment, asked you to. Neither one mentions a length limit, the internet, or how long it takes. On a <b>normal day</b> that is exactly right. Sam sends "Your cake is ready!" and the customer gets it. The till saves a sale and prints the receipt.'
        ],
        tip: 'In lesson 44, Layers and the dependency rule, tools like the database and the printer sit on the outside ring, and the rules in the centre never mention them. That still stands. This lesson is about the day something on the outside misbehaves and the inside feels it anyway.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Two bad days.',
        text: [
          '<b>Leak 1: a limit.</b> This is the one lesson 18 promised. Sam writes a friendly cake message with the side door, the opening hours and, at the very end, the pickup code. It is <b>190 characters</b>. He calls <code>notify</code>. It finishes with no error.',
          'The customer\'s phone shows the first 160 characters. The message stops in the middle of a sentence: "Show this code a". The last <b>30 characters</b>, with code 4471 in them, are gone. To understand the bug, Sam has to learn how long a text message can be. That is the very detail <code>notify</code> was built to hide.',
          '<b>Leak 2: speed and failure.</b> The accountant moves to the online bookkeeping service, so Maya plugs in <code>OnlineBook</code>. Lines changed in the rules: 0, just as lesson 32 promised. The front is the same word, <code>save</code>.',
          'But <code>save</code> used to write to a file on the shop\'s own computer. Now every sale travels across the internet. Maya puts a timer on it, as in lesson 10, Premature optimisation. The database book took <b>0.01 seconds</b>. The online book takes 0.4 seconds on a good day and <b>3 seconds</b> on a slow one. On Saturday morning every customer waits for it.',
          'Then the shop\'s internet drops. <code>save</code> stops with <code>ConnectionError</code>, which is Python\'s own name for "the link to the other computer failed". The till has no line for that, so the till program stops, with a queue at the counter. The word <code>save</code> never hinted that a sale could fail because of a cable.'
        ],
        warn: 'Lesson 30, Liskov substitution, said stand-ins may differ in what no caller relies on, like a payment that takes two seconds longer. Here the till <b>was</b> relying on something: that <code>save</code> is quick and always works. Nobody had written that down, so nobody noticed it was a promise.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Put a gauge on the front.',
        text: [
          'Maya cannot make texts longer or the internet perfect. The leaks are real. What she can do is <b>stop pretending</b> they are not there. Four moves.',
          '<b>1. Say the limit on the front door.</b> Look at the new <code>notify</code>. The limit has a name on line 1. Line 4 is a docstring, the note in triple quotes from lesson 40, Design by contract. And lines 5 to 7 refuse a long message loudly, as in lesson 22, Fail fast. <code>len(message)</code> counts the characters. The quiet <code>message[:160]</code> is gone. Sam now gets "message is 190 characters, max 160" the first time he tries his job, and he moves the code to the front of a shorter message. Maya could also have split a long message into two texts. Either is fine. Cutting in silence is not.',
          '<b>2. Let the idea name its own bad day.</b> In <code>rules.py</code>, line 1 is new Python. <code>Exception</code> is Python\'s family name for every kind of problem. <code>class BookUnavailable(Exception)</code> makes a new kind of problem, with a name in shop words. Line 5 says on the front of <code>SalesBook</code> that <code>save</code> may be slow and may fail in that one way.',
          '<b>3. Translate errors from below.</b> In <code>online_book.py</code>, <code>try</code> and <code>except</code> are from lesson 39, Defensive programming. If the post stops with <code>ConnectionError</code>, line 10 raises <code>BookUnavailable</code> in its place. A network word goes in. A shop word comes out. On line 2, the comma fetches two names from <code>rules.py</code> at once.',
          'Now the till can plan for the bad day in words it understands. In <code>till.py</code>, a sale that cannot be saved is kept in a <code>waiting</code> list, the screen says so plainly, and the receipt still prints. Nothing freezes.',
          '<b>4. Choose the plug knowing how it behaves.</b> The three books have matching buttons and very different speeds. With her timer\'s numbers in hand, Maya gives the counter the quick <code>DatabaseBook</code> and sends the day\'s sales to the online book at closing time. The accountant sees the sales that evening, not that second. She decides that is a fair price.'
        ],
        tip: 'There is a fifth move, and it is not code. <b>Learn one level below the tools you lean on.</b> Abstractions save you time working. They do not save you time learning. Sooner or later somebody in the shop has to know that texts have a length and that the online book lives far away.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Picture the bad day.',
        text: [
          'Point at any handle you depend on and ask: <b>"On a bad day, what would I need to know about the insides of this to understand what went wrong?"</b>',
          'Try it on the picture. For <code>notify</code>: a text holds 160 characters. For <code>save</code>: the book may be far away, slow, or offline. For <code>print_line</code> from lesson 3: printers go to sleep and run out of paper. You met that one already. In lesson 10 the slow report was a sleeping printer showing through.',
          'Then ask a second question: <b>"Is that written on the front?"</b> The front is the name, the docstring and the errors. If the answer lives only in the insides, the next person will find it the way Sam did.',
          'Three places hide most leaks: a <b>limit</b> (how much, how long, how many), <b>time</b> (how long it takes), and <b>failure</b> (what can go wrong that the name does not mention).'
        ],
        tip: 'Lesson 23, Explicit over implicit, asked whether a line shows what it depends on. This is the same question asked of a whole handle. <code>save</code> depended on the internet, and nothing on the front said so.'
      },
      {
        label: 'When not to', pic: whenNotPic,
        h: 'Do not give up on handles. Do not try to seal them.',
        text: [
          '<b>A leak is not a reason to stop using abstractions.</b> Suppose Sam, once bitten, decides never to trust <code>notify</code> again and talks to the phone company himself, "so I can see everything". Look at the first picture. He is back to the fiddly steps of lesson 18, and he has forgotten the <code>"+1"</code> again. Without handles nobody could build anything. Lesson 18 stands. A handle that works on 99 days out of 100 has still saved you 99 days.',
          '<b>Do not try to build a perfectly sealed one.</b> Suppose Maya decides <code>save</code> must never fail. Look at the second picture. <code>pass</code> swallows the error. The till never freezes again. And on a day with no internet every sale is quietly thrown away. That is not a sealed leak. It is the silent bug that lesson 22, Fail fast, warned about.',
          'The other way to "seal" it is to build something enormous: retries, three backup books, a second internet line. For a cookie shop that is far more machine than the problem deserves. Lesson 4, Trade-offs, not laws, asked what a thing costs, and lesson 8, YAGNI, asked who is asking for it.',
          '<b>Do not write every detail on the front either.</b> A label that lists twenty facts about the insides is no longer a simple front. Say the few things that can hurt a caller: the limit, the wait, the failure. Let the rest stay hidden.'
        ],
        warn: 'The aim is not a handle that never leaks. There is no such thing. The aim is a handle that is <b>simple on a good day and honest on a bad day</b>.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does it mean to say an abstraction "leaks"?',
        options: [
          'It was badly written and should be thrown away',
          'A detail it was meant to hide shows through, and the person using it has to understand that detail',
          'It hides too little, like add(a, b)',
          'Other code reaches inside it and changes its data'
        ],
        answer: 1,
        why: 'The hidden machinery is still real. On a bad day its limits, its speed or its failures come through the simple front. Even good handles do this.',
        hint: 'Think of pressing the go pedal with an empty tank.'
      },
      {
        type: 'type', q: 'The shop prints name labels for cake boxes. A customer is called <b>Alexandra Montgomery</b>. Type exactly what is printed on her label.',
        pic: code([
          'def print_label(name):',
          '    label = name[:12]',
          '    print_line(label)'
        ], { title: 'shop.py' }),
        prompt: 'label >',
        answers: ['Alexandra Mo', '"Alexandra Mo"'],
        why: '<code>name[:12]</code> keeps the first 12 characters, and the space counts as one. Nothing on the front of <code>print_label</code> says so. The label is 12 characters wide, and that hidden fact has just leaked onto a cake box.',
        hint: 'Count 12 characters from the start. A space is a character too.'
      },
      {
        type: 'bucket', q: 'What the front promises, or a detail that leaks through on a bad day?',
        buckets: ['The front: the what', 'A leak from the insides'],
        items: [
          ['notify tells the customer something', 0],
          ['save records the sale', 0],
          ['print_line prints one line', 0],
          ['A text message holds 160 characters', 1],
          ['The online book needs the internet', 1],
          ['save can take 3 seconds', 1]
        ],
        why: 'The left side is what the caller asked for. The right side is how the machinery behind happens to behave. You only meet the right side on a bad day, unless the front tells you first.'
      },
      {
        type: 'fill', q: 'Translate the error from below into a word the shop understands.',
        text: 'class OnlineBook(SalesBook):\n    def save(self, time, total, points):\n        try:\n            web_books.post(time, total, points)\n        except ___:\n            raise ___("no internet")',
        options: ['ConnectionError', 'BookUnavailable', 'ValueError', 'SalesBook'],
        answer: ['ConnectionError', 'BookUnavailable'],
        why: 'The network\'s word, <code>ConnectionError</code>, is caught where it happens. The shop\'s word, <code>BookUnavailable</code>, is what callers see. The till can plan for that without learning about networks.',
        hint: 'The first blank is the problem that arrives. The second is the problem that is passed on.'
      },
      {
        type: 'pick', q: 'Back to lesson 10, Premature optimisation. The end-of-day report took 4 seconds, and Maya\'s timer showed that 3.9 of them were the printer waking up. In the words of this lesson, what happened?',
        options: [
          'The adding loop was too slow',
          'A hidden detail of the printer, that it goes to sleep, showed through the simple job of printing',
          'The report had too many lines',
          'Maya used the wrong name for the job'
        ],
        answer: 1,
        why: 'Printing looked like one simple step. Behind it was a machine with habits of its own. Maya only found the leak because she <b>measured</b>. A timer is one of the best tools for seeing through a handle.',
        hint: 'Where did the timer say the time went?'
      },
      {
        type: 'pick', q: 'Which of these are honest ways to deal with a leak? Pick all that apply.',
        options: [
          'Write the limit in the docstring and refuse anything over it with a clear error',
          'Catch the low-level error and raise one in the caller\'s own words',
          'Cut the message quietly so that nothing ever fails',
          'Catch the error and do nothing, so the till never freezes'
        ],
        answer: [0, 1],
        why: 'The first two tell the caller the truth, early and in plain words. The last two hide the leak, and with it a lost pickup code or a lost sale.',
        hint: 'Two of these tell the caller something. Two keep quiet.'
      },
      {
        type: 'match', q: 'Match each leak to the honest answer from the story.',
        pairs: [
          ['Texts are cut at 160 characters', 'notify refuses long messages and says the limit'],
          ['save stops with ConnectionError', 'OnlineBook raises BookUnavailable in its place'],
          ['save takes up to 3 seconds', 'Time each book, then pick the quick one for the counter'],
          ['Nobody knew texts had a length', 'Learn one level below the tools you lean on']
        ],
        why: 'A limit goes on the front. An error is translated. Speed is measured before choosing. And somebody has to know what is one level down.',
        hint: 'Start with the two errors. One is about length and one is about the network.'
      },
      {
        type: 'pick', q: 'After the cut-off message, Sam says: "Handles lie. From now on I will call the phone company directly." What is wrong with that?',
        options: [
          'Nothing. It is the safest way to work',
          'He takes back every fiddly step that notify was hiding, in every job, to avoid one leak that can be labelled',
          'Calling the phone company directly is slower',
          'Python does not allow it'
        ],
        answer: 1,
        why: 'Lesson 18, Abstraction, still stands. The answer to a leaky handle is an honest handle, not no handle. One label on <code>notify</code> fixes the leak for all six jobs at once.',
        hint: 'What did Sam forget the last time he copied those steps by hand?'
      }
    ]
  });
})();
