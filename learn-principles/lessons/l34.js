/* Lesson 34: Inversion of control (module 3). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l34  Inversion of control
     ===================================================================== */
  const DARK = '#15132B', LITE = '#ECEAFF';
  const divider = (x, y1, y2) => `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>`;
  // A dashed arrow: "here is my number". Solid arrows are real calls.
  const dash = (x1, y1, x2, y2, col) => {
    const a = Math.atan2(y2 - y1, x2 - x1), mx = x2 - 15 * Math.cos(a), my = y2 - 15 * Math.sin(a);
    return `<line x1="${x1}" y1="${y1}" x2="${mx}" y2="${my}" stroke="${col}" stroke-width="3" stroke-linecap="round" stroke-dasharray="5 7"/>` + arrow(mx, my, x2, y2, col, 3);
  };

  /* ---- The idea: keep asking, or leave your number ---- */
  const ideaPic = svg(600, 300, 'On the left a customer walks to the restaurant desk three times to ask if the table is ready. On the right the customer leaves a phone number once, and the restaurant sends one text when the table is ready.',
    T(150, 30, 'KEEP ASKING', { s: 12.5, f: P.danger }) + T(450, 30, 'LEAVE YOUR NUMBER', { s: 12.5, f: P.ok }) +
    divider(300, 18, 286) +
    box(22, 62, 84, 150, P.white, 14) + T(64, 142, 'you', { s: 15 }) +
    box(194, 62, 84, 150, P.paper2, 14) + T(236, 134, 'the', { s: 13 }) + T(236, 152, 'restaurant', { s: 13 }) +
    [92, 137, 182].map(y => T(150, y - 8, 'ready yet?', { s: 11.5, w: 700, f: P.ink2 }) + arrow(114, y, 188, y, P.danger, 3)).join('') +
    T(150, 250, 'You do the calling.', { s: 13, w: 700, f: P.ink2 }) + T(150, 268, 'Again and again.', { s: 13, w: 700, f: P.ink2 }) +
    box(322, 62, 84, 150, P.white, 14) + T(364, 142, 'you', { s: 15 }) +
    box(494, 62, 84, 150, P.paper2, 14) + T(536, 134, 'the', { s: 13 }) + T(536, 152, 'restaurant', { s: 13 }) +
    T(450, 96, 'my number', { s: 11.5, w: 700, f: P.ink2 }) + dash(414, 104, 488, 104, P.mute) +
    T(450, 164, 'table is ready', { s: 11.5, w: 700, f: P.ok }) + arrow(488, 172, 414, 172, P.ok, 3.5) +
    T(450, 250, 'They do the calling.', { s: 13, w: 700, f: P.ink2 }) + T(450, 268, 'Once, at the right moment.', { s: 13, w: 700, f: P.ink2 }));

  /* ---- The code: one loop that steers everything ---- */
  const loopCode = [
    'while True:',
    '    order = wait_for_order()',
    '    print_kitchen_ticket(order)',
    '    send_confirmation(order)',
    '    update_stock(order)',
    '    add_points(order)'
  ];
  const jobs = [['kitchen ticket', P.white], ['confirmation text', P.white], ['stock count', P.white], ['loyalty points', P.white]];
  const loopPic = svg(600, 250, 'The loop in online.py is in charge. Four arrows start at the loop and point at the kitchen ticket, the confirmation text, the stock count and the loyalty points, numbered 1 to 4.',
    T(300, 24, 'Every arrow starts at the loop', { s: 15 }) +
    box(30, 70, 180, 110, DARK, 14) + T(120, 104, 'online.py', { s: 12, m: true, f: '#A9A5D6' }) + T(120, 130, 'while True:', { s: 14, m: true, f: LITE }) + T(120, 158, 'IN CHARGE', { s: 12.5, f: '#FFC24B' }) +
    jobs.map((j, i) => {
      const y = 42 + i * 46;
      return arrow(218, 104 + i * 14, 392, y + 18, P.accent, 3) +
        `<circle cx="${305}" cy="${(104 + i * 14 + y + 18) / 2}" r="11" fill="${P.tint}" stroke="${P.ink}" stroke-width="2.5"/>` + T(305, (104 + i * 14 + y + 18) / 2 + 4.5, String(i + 1), { s: 12 }) +
        box(400, y, 170, 36, j[1], 10) + T(485, y + 23, j[0], { s: 13 });
    }).join('') +
    T(300, 240, 'The loop names each job and calls it, in a fixed order.', { s: 13, w: 700, f: P.ink2 }));
  const codePic = `<div style="width:100%">${code(loopCode, { title: 'online.py', hi: [3, 4, 5, 6] })}${loopPic}</div>`;

  /* ---- The pain: two new ideas, two visits inside the loop ---- */
  const painCode = [
    'while True:',
    '    order = wait_for_order()',
    '    print_kitchen_ticket(order)',
    '    ring_bell(order)',
    '    send_confirmation(order)',
    '    update_stock(order)',
    '    add_points(order)',
    'log_for_tax(order)'
  ];
  const stat = (x, n, a, b, bad) => box(x, 22, 176, 92, bad ? P.dangerT : P.warnT, 14) + T(x + 88, 62, n, { s: 30, f: bad ? P.danger : P.ink }) +
    T(x + 88, 84, a, { s: 12, w: 700, f: P.ink2 }) + T(x + 88, 100, b, { s: 12, w: 700, f: P.ink2 });
  const countPic = svg(600, 134, 'The loop was opened 2 times. The tax log holds 0 orders. 0 of the jobs can be tried on their own.',
    stat(20, '2', 'times the loop', 'was opened') + stat(212, '0', 'orders in', 'the tax log', true) + stat(404, '0', 'jobs Maya can try', 'on their own', true));
  const painPic = `<div style="width:100%">${code(painCode, { title: 'online.py, after two new ideas', good: [4], bad: [8] })}${countPic}</div>`;

  /* ---- The fix: a board with hooks ---- */
  const boardCode = [
    'handlers = []',
    '',
    'def when_new(handler):',
    '    handlers.append(handler)',
    '',
    'def new_order(order):',
    '    for handler in handlers:',
    '        handler(order)',
    '',
    'def run():',
    '    while True:',
    '        new_order(wait_for_order())'
  ];
  const wiringCode = [
    'import orders',
    '',
    'orders.when_new(print_kitchen_ticket)',
    'orders.when_new(send_confirmation)',
    'orders.when_new(update_stock)',
    'orders.when_new(add_points)',
    '',
    'orders.run()'
  ];
  const bellCode = [
    'import orders',
    '',
    'def ring_bell(order):',
    '    bell.ring()',
    '',
    'orders.when_new(print_kitchen_ticket)',
    'orders.when_new(send_confirmation)',
    'orders.when_new(update_stock)',
    'orders.when_new(add_points)',
    'orders.when_new(ring_bell)',
    'orders.when_new(log_for_tax)',
    '',
    'orders.run()'
  ];
  const hookJobs = ['ticket', 'text', 'stock', 'points', 'bell'];
  const boardPic = svg(600, 330, 'Before, the loop pointed at each job and called it by name. After, a board called orders owns the loop. Each job points a dashed arrow up at the board to register once. The board points a solid arrow down at each job to call it for every order. A new job, the bell, is added without changing the board.',
    T(96, 28, 'BEFORE', { s: 12.5, f: P.danger }) + T(402, 28, 'AFTER', { s: 12.5, f: P.ok }) +
    divider(196, 16, 316) +
    box(22, 48, 148, 62, DARK, 14) + T(96, 74, "Maya's loop", { s: 13, f: LITE }) + T(96, 94, 'names every job', { s: 11, w: 700, f: '#A9A5D6' }) +
    [44, 96, 148].map(x => arrow(96, 118, x, 190, P.danger, 3)).join('') +
    [['ticket', 20], ['text', 72], ['stock', 124]].map(j => box(j[1], 196, 48, 34, P.white, 9) + T(j[1] + 24, 218, j[0], { s: 11.5 })).join('') +
    T(96, 262, 'To add a job,', { s: 12.5, w: 700, f: P.ink2 }) + T(96, 280, 'open the loop.', { s: 12.5, w: 700, f: P.ink2 }) +
    box(222, 44, 360, 74, P.tint, 14) + T(402, 70, 'the board: orders.py', { s: 13.5, f: P.accent }) + T(402, 92, 'for handler in handlers: handler(order)', { s: 11, m: true }) + T(402, 109, 'owns the loop, knows no job by name', { s: 11, w: 700, f: P.ink2 }) +
    hookJobs.map((j, i) => {
      const x = 250 + i * 76, last = i === 4;
      return dash(x - 11, 192, x - 11, 128, P.mute) + arrow(x + 11, 126, x + 11, 190, P.ok, 3) +
        box(x - 32, 196, 64, 34, last ? P.okT : P.white, 9) + T(x, 218, j, { s: 11.5, f: last ? P.ok : P.ink });
    }).join('') +
    dash(232, 262, 268, 262, P.mute) + T(276, 266, '"call me": said once', { s: 12, w: 700, f: P.ink2, a: 'start' }) +
    arrow(418, 262, 454, 262, P.ok, 3) + T(462, 266, 'called, every order', { s: 12, w: 700, f: P.ink2, a: 'start' }) +
    T(402, 296, 'To add the bell, hang one more job.', { s: 12.5, w: 700, f: P.ink2 }) + T(402, 314, 'The board is not opened.', { s: 12.5, w: 700, f: P.ink2 }));
  const fixPic = `<div style="width:100%">${code(boardCode, { title: 'orders.py: the board', good: [4, 7, 8] })}${code(wiringCode, { title: 'online.py: each job is hung on the board', good: [3, 4, 5, 6] })}${code(bellCode, { title: 'online.py, with the bell and the tax log', good: [3, 4, 10, 11] })}${boardPic}</div>`;

  /* ---- The test: who decides when? And the three names. ---- */
  const chip = (x, y, s) => box(x, y, 236, 30, P.white, 9) + T(x + 118, y + 20, s, { s: 11.5, m: true });
  const whoPic = svg(600, 262, 'Two columns. On the left, my code decides when: my code calls a helper. On the right, something else decides when: a board, a button or a clock calls my code.',
    T(150, 28, 'MY CODE DECIDES WHEN', { s: 12.5, f: P.accent }) + T(450, 28, 'SOMETHING ELSE DECIDES WHEN', { s: 12.5, f: P.ok }) +
    divider(300, 16, 248) +
    box(28, 48, 104, 46, P.tint, 12) + T(80, 77, 'my code', { s: 13 }) + arrow(140, 71, 176, 71, P.accent, 3.5) + box(184, 48, 88, 46, P.white, 12) + T(228, 77, 'a helper', { s: 13 }) +
    T(150, 122, 'I call it when I want.', { s: 13, w: 700, f: P.ink2 }) +
    chip(32, 140, 'final_total(price)') + chip(32, 180, 'print_line(text)') + chip(32, 220, 'ring_bell(order)') +
    box(316, 48, 116, 46, P.white, 12) + T(374, 68, 'a board, a', { s: 11.5 }) + T(374, 84, 'button, a clock', { s: 11.5 }) + arrow(440, 71, 476, 71, P.ok, 3.5) + box(484, 48, 96, 46, P.okT, 12) + T(532, 77, 'my code', { s: 13 }) +
    T(450, 122, 'It calls me when the moment comes.', { s: 13, w: 700, f: P.ink2 }) +
    chip(332, 140, 'when_new(ring_bell)') + chip(332, 180, 'when_clicked(open_menu)') + chip(332, 220, 'every_night_at(9, back_up)'));
  const row = (y, name, where, a, b, hot) => box(14, y, 196, 62, hot ? P.tint : P.white, 12) + T(112, y + 28, name, { s: 13, f: hot ? P.accent : P.ink }) + T(112, y + 47, where, { s: 11.5, w: 700, f: P.ink2 }) +
    T(226, y + 27, a, { s: 13, a: 'start' }) + T(226, y + 46, b, { s: 12, w: 700, f: P.ink2, a: 'start' });
  const namesPic = svg(600, 256, 'A table of three names. Dependency inversion, lesson 32, is a rule about which way dependencies point. Dependency injection, lesson 33, is a technique: hand a part what it needs. Inversion of control, this lesson, is the wider idea of who is in charge of when code runs.',
    T(300, 24, 'THREE NAMES THAT SOUND ALIKE', { s: 12.5, f: P.accent }) +
    row(40, 'Dependency inversion', 'lesson 32', 'A rule: which way dependencies point.', 'The rules own the idea. The details fit it.') +
    row(112, 'Dependency injection', 'lesson 33', 'A technique: hand a part what it needs.', 'It does not fetch or build its own helpers.') +
    row(184, 'Inversion of control', 'this lesson', 'The wider idea: who is in charge.', 'Something else decides when your code runs.', true));
  const testPic = `<div style="width:100%">${whoPic}${namesPic}</div>`;

  /* ---- When not to: a fixed recipe wants to be read ---- */
  const plainClose = [
    'def close_shop():',
    '    count_till()',
    '    back_up_sales()',
    '    lock_up()'
  ];
  const overClose = [
    'import closing',
    '',
    'closing.when_closing(lock_up)',
    'closing.when_closing(count_till)',
    'closing.when_closing(back_up_sales)',
    '',
    'closing.run()'
  ];
  const notPic = `<div style="width:100%">${code(plainClose, { title: 'closing time: three steps in a fixed order', good: [2, 3, 4] })}${code(overClose, { title: 'the same three steps, hung on a board', bad: [3] })}</div>`;

  COURSE.add({
    id: 'l34', minutes: 9,
    summary: 'In a plain program your code is in charge: it runs from the top and calls its helpers when it wants them. <b>Inversion of control</b> flips that. You hand your code to something else, and it calls you when the moment comes. <b>Don\'t call us, we\'ll call you.</b>',
    video: {
      src: 'videos/l34-inversion-of-control.mp4', poster: 'videos/l34-inversion-of-control.jpg', length: '58 s',
      script: [
        "Maya's shop takes orders online. One loop runs it all, and Maya's code is in charge.",
        'An order arrives. The loop calls the ticket. Then the text. Then the stock. Then the points. Always in that order.',
        'Then Sam wants a kitchen bell. The accountant wants a tax log. Each new idea means opening the one loop that every order runs through.',
        'So Maya flips it. A small board owns the loop now. Each job leaves its name, and says: call me when an order arrives.',
        'An order drops in. The board calls every job on its list.',
        'The kitchen bell? One new job, and one new line. The next order rings it too. And the loop stays shut.',
        "That is inversion of control. Your code stops calling. It gets called. Don't call us, we'll call you. Ask: who decides when this code runs?"
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Leave your number.',
        text: [
          'A restaurant is full. You could walk back to the desk every two minutes and ask "is my table ready yet?". Or you leave your phone number, sit down, and they text you when it is ready.',
          'In the first version <b>you</b> are in charge of the asking. In the second you handed that over. You said what you want and how to reach you, and <b>they decide the moment</b>.',
          'Code has the same two styles. In a plain program, <b>your code is in charge</b>. It runs from the top to the bottom and calls its helpers when it wants them.',
          '<b>Inversion of control</b> flips that. You hand the steering wheel to something else, and <b>it calls your code</b> when the right moment comes. You write only the small pieces: "when an order arrives, do this".',
          'You have met this already, without the name. A button on a web page: "when clicked, run this". A phone alarm: "at 7:00, ring". A job that runs every night at 9. In all three you did not write the waiting. You only said what should happen.'
        ],
        tip: 'People call this the <b>Hollywood principle</b>, after what film studios tell hopeful actors: "Don\'t call us, we\'ll call you." A helper that you call is often called a <b>library</b>. A thing that calls you is often called a <b>framework</b>.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'One loop, and Maya steers it.',
        text: [
          'Maya\'s shop takes orders online now. This is the whole program that handles them, <code>online.py</code>.',
          'One new piece of Python is on line 1. <code>while True:</code> means "repeat the pushed-in lines <b>forever</b>". You met <code>True</code> in lesson 28. Lines that repeat are called a <b>loop</b>, as in lesson 10.',
          'Line 2 waits. <code>wait_for_order()</code> does nothing until a customer orders. Then it hands back that order.',
          'Lines 3 to 6 are everything the shop does with a new order. Print the ticket for the kitchen. Text the customer to say the order is in. Take the cookies off the stock count. Add the loyalty points. Then the loop goes round again and waits for the next order.',
          'Look at who is in charge. <b>The loop names every job, and the loop calls it</b>, in a fixed order. In the picture, every arrow starts at the loop.'
        ],
        tip: 'For four steps that never change, this is good code. You can read it from top to bottom and see exactly what happens, and in which order. Hold on to that thought. It comes back at the end of the lesson.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Every new idea goes through the loop.',
        text: [
          'Sam wants the bell in the kitchen to ring for each online order. Maya opens the loop and adds line 4. It works.',
          'A week later the accountant wants every order logged for tax. Maya opens the loop again and adds line 8. But the line lands at the <b>left edge</b>. It is not pushed in, so it is <b>not part of the loop</b>. Python would only reach it when the loop ends, and this loop never ends.',
          'A month later the accountant opens the tax log. It is <b>empty</b>. Nothing crashed. Tickets printed and bells rang the whole time.',
          'There is a second problem. Maya could not try the tax job <b>on its own</b>. The only way to run it was to run the whole loop: wait for a real order, print a real ticket and text a real customer. So she did not try it.',
          'Count it up. Two new ideas, and the loop was opened <b>2 times</b>. It is the one piece of code that every online order runs through. Lesson 29, Open/closed, warned about exactly this: adding something new should not mean editing code that already works.'
        ],
        warn: 'Maya is not careless. The loop is the only door into the shop\'s online orders. So every new idea, from Sam, from the accountant or from anyone else, has to go through that loop and through Maya.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Flip who makes the call.',
        text: [
          'Maya writes one small file, <code>orders.py</code>. Think of it as a <b>board on the wall with a row of hooks</b>. It knows nothing about tickets, texts, stock or points.',
          'Line 1 makes an empty list called <code>handlers</code>. You met lists in lesson 7. <code>when_new</code> adds one job to that list. <code>new_order</code> goes through the list with a loop, as in lesson 10, and <b>calls each job</b> with the order. <code>run</code> holds the <code>while True</code> loop. So the board owns the loop now.',
          'Now read <code>online.py</code>. Line 1 fetches the whole board, as <code>import</code> did in lesson 32. Lines 3 to 6 hang each job on a hook. Line 8 starts the board.',
          'Look closely at line 3: <code>orders.when_new(print_kitchen_ticket)</code>. There are <b>no brackets</b> after <code>print_kitchen_ticket</code>. Brackets after a name mean "run this job now". The bare name means "here is the job itself, keep it for later". A job that is handed over like this is called a <b>callback</b> or a <b>handler</b>.',
          'That explains line 8 of <code>orders.py</code>. <code>handler</code> is one of the jobs from the list. <code>handler(order)</code> has brackets, so that is the moment the job really runs. <b>The board decides when.</b>',
          'Now the kitchen bell. Maya writes <b>one new job</b> and adds <b>one new line</b>, <code>orders.when_new(ring_bell)</code>. The board hands every job the order, so <code>ring_bell</code> takes one too, even though it only rings. The tax log goes in the same way. <code>orders.py</code> is not opened, and there is no loop to slip in.',
          'Each job can also be tried on its own now. <code>ring_bell(test_order)</code> rings the bell and does nothing else.'
        ],
        tip: 'Is the new <code>when_new</code> line an edit? Yes, a tiny one, as in lesson 29. It is a line of wiring, the word from lesson 33, with no logic in it. And look at the shape of the board. The checkout in lesson 29 also looped over a list and called whatever was in it. This lesson gives that shape its name.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Who decides when?',
        text: [
          'Point at a piece of code and ask: <b>"Who decides when this code runs: my code, or something my code handed itself to?"</b>',
          'Try the old loop. Maya\'s own lines say <code>print_kitchen_ticket(order)</code>. Her code decides. Try the new version. Her code only says <code>when_new(print_kitchen_ticket)</code>, and the board calls the job later. Something else decides.',
          'Neither answer is wrong. The question tells you <b>which kind of code you are reading</b>, and so where to look when you want to know what happens next.',
          '<b>Three names that sound alike.</b> Learners mix these up all the time, so the second picture puts them side by side. Dependency <b>inversion</b> is a rule about which way dependencies point. Dependency <b>injection</b> is a technique: hand a part what it needs. Inversion of <b>control</b> is the wider idea of who is in charge.',
          'Injection is one small case of inverted control. In lesson 33 the checkout stopped choosing its own parts, and its caller chose them. Here the jobs stop choosing their own moment, and the board chooses it.'
        ],
        tip: 'The sign to look for in code: a job\'s <b>name with no brackets</b>, handed to something else. Each line on the right of the first picture says the same thing: here is my number, call me.'
      },
      {
        label: 'When not to', pic: notPic,
        h: 'A fixed recipe wants to be read.',
        text: [
          '<b>You lose the top to bottom read.</b> In the old loop, "what happens when an order arrives?" had one answer, on one screen. Now the answer is: whatever was hung on the board. In <code>online.py</code> the hooks still sit together. In a big program each feature hangs itself up from its own file, and the answer becomes a hunt. That is the cost lesson 23, Explicit over implicit, warned about. And a job that runs when nobody seems to call it is a surprise, as in lesson 11, Least astonishment.',
          '<b>The order becomes a quiet fact.</b> Our board calls the jobs in the order they were hung. Many real ones promise no order at all. And this simple board has no safety net. If one job stops with an error, the jobs after it are never called.',
          '<b>Finding a bug takes more hops.</b> When a job misbehaves, you cannot read upwards to find the line that called it. The caller is a loop over a list. You have to find out who put the job on that list.',
          '<b>Do not invert a fixed sequence.</b> At closing time the shop counts the till, backs up the sales and locks up, as in lesson 17. Suppose Maya loves this lesson and hangs those three on a closing board. Later someone tidies the lines, and <code>lock_up</code> is hung first. The door is locked before the till is counted. Three steps in a fixed order are clearer as three plain lines. Lesson 5, KISS, would keep them.'
        ],
        warn: 'Ask lesson 4\'s question: "Is this problem real right now?" Invert control where things really plug in and keep changing, like the jobs for a new order. Leave a short fixed recipe as a recipe. This was the last principle of module 3. Next is lesson 35, Review: SOLID and friends.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'Which line hands the job to the board, so that the bell rings for every new order?',
        pic: code([
          'orders.when_new(ring_bell)',
          'orders.when_new(ring_bell())'
        ], { title: 'online.py' }),
        options: ['Line 1', 'Line 2', 'Both lines do the same', 'Neither line'],
        answer: 0,
        why: 'Line 1 hands over the job itself. Line 2 has brackets after <code>ring_bell</code>, so it tries to run the job right now, once, and gives the board whatever comes back. That is not a job the board can call later.',
        hint: 'Brackets after a name mean "run this now".'
      },
      {
        type: 'type', q: 'Three jobs are hung on the board. Then two orders arrive. How many times does the board call a job in total? Type the number.',
        pic: code([
          'orders.when_new(print_kitchen_ticket)',
          'orders.when_new(update_stock)',
          'orders.when_new(ring_bell)',
          '',
          'orders.new_order(order_1)',
          'orders.new_order(order_2)'
        ], { title: 'trying the board' }),
        prompt: 'calls >',
        answers: ['6', 'six', '6.0'],
        why: 'Each order makes the board go through its whole list. 3 jobs × 2 orders = 6 calls. Lines 1 to 3 call nothing. They only hang the jobs up.',
        hint: 'How many jobs are on the list? Each order calls all of them.'
      },
      {
        type: 'fill', q: 'Sam wants the shop light to flash for each online order. Add it without opening the board.',
        text: 'def flash_light(___):\n    light.flash()\n\norders.when_new(___)',
        options: ['order', 'flash_light', 'flash_light()', 'handlers'],
        answer: ['order', 'flash_light'],
        why: 'The board hands every job the order, so the new job takes one. Then the bare name, with no brackets, is hung on the board.',
        hint: 'The first blank is what the board hands to every job. The second is a name with no brackets.'
      },
      {
        type: 'bucket', q: 'Who decides when this code runs?',
        buckets: ['My code decides', 'Something else calls it'],
        items: [
          ['A script that runs from top to bottom', 0],
          ['total = final_total(price)', 0],
          ['A job hung up with when_new', 1],
          ['The "when clicked" job of a button', 1],
          ['A phone alarm set for 7:00', 1],
          ['A backup that runs every night at 9', 1]
        ],
        why: 'When you write the call yourself, you choose the moment. When you hand a job to a board, a button or a clock, it chooses the moment and calls you.',
        hint: 'Ask of each one: did I write the line that makes it run right now?'
      },
      {
        type: 'match', q: 'Four names from the last three lessons. Match each to what it means.',
        pairs: [
          ['Dependency inversion (lesson 32)', 'A rule about which way dependencies point'],
          ['Dependency injection (lesson 33)', 'A technique: hand a part what it needs'],
          ['Inversion of control (this lesson)', 'Something else decides when your code runs'],
          ['Callback, or handler', 'A job handed over to be called later']
        ],
        why: 'Inversion is about arrows. Injection is about handing parts in. Inversion of control is the wider idea of who is in charge, and a callback is how you hand your job over.',
        hint: 'Start with the one from this lesson. It is about the moment.'
      },
      {
        type: 'pick', q: 'After the fix, the accountant asks for the tax log again. What does Maya touch?',
        pic: code(wiringCode, { title: 'online.py' }),
        options: [
          'The while True loop inside orders.py',
          'One new job, and one new when_new line',
          'Every job that is already hung on the board',
          'Nothing at all. The board finds new jobs by itself'
        ],
        answer: 1,
        why: 'She writes <code>log_for_tax</code> and hangs it up with one line. The loop in <code>orders.py</code> stays shut, so there is nothing in it to break.',
        hint: 'How did the kitchen bell get onto the board?'
      },
      {
        type: 'pick', q: 'When is a plain top to bottom list of steps the better choice? Pick all that apply.',
        options: [
          'Three steps that must always run in the same order, like closing the shop',
          'A short script that Maya runs once',
          'New jobs for each order keep arriving from different people',
          'Many separate features all need to hear about the same event'
        ],
        answer: [0, 1],
        why: 'A fixed recipe is clearest when you can read it in order. Inverting control pays for itself where things really plug in and keep changing.',
        hint: 'Two of these have nothing that plugs in or changes.'
      },
      {
        type: 'pick', q: 'Back to an earlier lesson. In a big program, twelve files each hang a job on the board. Sam asks: "What happens when an order arrives?" Nobody can answer without searching every file. Which lesson warned about code where the reader has to already know?',
        options: ['Lesson 6, DRY', 'Lesson 10, Premature optimisation', 'Lesson 23, Explicit over implicit', 'Lesson 30, Liskov substitution'],
        answer: 2,
        why: 'Explicit means it is written where you are looking. When control is inverted, what runs is no longer written in one place. That is the price, and it is why a short fixed sequence should stay plain.',
        hint: 'Its question was: can I tell what this depends on from the line itself?'
      }
    ]
  });
})();
