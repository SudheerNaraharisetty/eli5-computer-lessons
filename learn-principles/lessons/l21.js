/* Lesson 21: Guard clauses (module 2). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l21  Guard clauses
     ===================================================================== */

  /* ---- The code: three questions, one inside the other ---- */
  const nestedCode = [
    'def free_cookie_reply(card):',
    '    if card is not None:',
    '        if card.balance() >= 30:',
    '            if cookies_left() > 0:',
    '                return "Yes! One free cookie."',
    '            else:',
    '                return "Sold out today."',
    '        else:',
    '            return "Not enough points."',
    '    else:',
    '        return "No card yet."'
  ];

  /* ---- The pain: the Saturday rule, squeezed in ---- */
  const brokenCode = [
    'def free_cookie_reply(card, day):',
    '    if card is not None:',
    '        if card.balance() >= 30:',
    '            if day != "Saturday":',
    '                if cookies_left() > 0:',
    '                    return "Yes! One free cookie."',
    '                else:',
    '                    return "Not on Saturdays."',
    '            else:',
    '                return "Sold out today."',
    '        else:',
    '            return "Not enough points."',
    '    else:',
    '        return "No card yet."'
  ];

  /* ---- The fix: every odd case first ---- */
  const guardCode = [
    'def free_cookie_reply(card, day):',
    '    if card is None:',
    '        return "No card yet."',
    '    if card.balance() < 30:',
    '        return "Not enough points."',
    '    if day == "Saturday":',
    '        return "Not on Saturdays."',
    '    if cookies_left() == 0:',
    '        return "Sold out today."',
    '    return "Yes! One free cookie."'
  ];

  // Draws the outline of a piece of code: one bar per line, pushed in by its indent. rows: [indent, fill]
  const shape = (x, y, rows, step, w, pitch) => rows.map((r, i) =>
    `<rect x="${x + r[0] * step}" y="${y + i * (pitch || 13)}" width="${w}" height="${pitch ? 6 : 8}" rx="3" fill="${r[1]}"/>`).join('');
  const Q = P.accent, NO = P.danger, EL = P.mute, YES = P.ok;
  const nestedRows = [[0, P.ink], [1, Q], [2, Q], [3, Q], [4, YES], [3, EL], [4, NO], [2, EL], [3, NO], [1, EL], [2, NO]];
  const guardRows = [[0, P.ink], [1, Q], [2, NO], [1, Q], [2, NO], [1, Q], [2, NO], [1, Q], [2, NO], [1, YES]];

  const doorPic = svg(600, 290, 'At a concert door, three people are turned away, each with a reason: no ticket, wrong night, bag too big. The fourth walks straight in to the show.',
    T(160, 30, 'ODD CASES STOP AT THE DOOR', { s: 12.5, f: P.danger }) + T(482, 30, 'THE NORMAL CASE WALKS IN', { s: 12.5, f: P.ok }) +
    box(322, 48, 30, 206, P.tint, 8) + T(337, 278, 'door', { s: 12.5, f: P.accent }) +
    ['no ticket', 'wrong night', 'bag too big'].map((s, i) => {
      const y = 52 + i * 50;
      return `<circle cx="40" cy="${y + 20}" r="13" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
        arrow(60, y + 20, 100, y + 20, P.danger, 3) +
        box(108, y, 190, 40, P.dangerT, 10) + T(203, y + 25, '"Sorry: ' + s + '"', { s: 13, f: P.danger });
    }).join('') +
    `<circle cx="40" cy="226" r="13" fill="${P.okT}" stroke="${P.ink}" stroke-width="2.5"/>` +
    arrow(60, 226, 312, 226, P.ok, 3.5) + arrow(362, 226, 408, 226, P.ok, 3.5) +
    box(416, 150, 160, 100, P.okT, 14) + T(496, 196, 'the show', { s: 16, f: P.ok }) + T(496, 220, 'nothing in the way', { s: 12.5, w: 700, f: P.ink2 }) +
    T(496, 96, 'Nobody is stopped again', { s: 12.5, w: 700, f: P.ink2 }) + T(496, 114, 'halfway to their seat.', { s: 12.5, w: 700, f: P.ink2 }));

  const arrowPic = svg(600, 190, 'The outline of the nested code looks like an arrowhead pointing right. Question 1 on line 2 is answered on line 11, question 2 on line 3 is answered on line 9, and question 3 on line 4 is answered on line 7.',
    T(120, 22, 'THE SHAPE OF THE CODE', { s: 12.5, f: P.ink2 }) +
    shape(30, 36, nestedRows, 26, 110) +
    T(256, 92, 'the yes', { s: 12.5, f: P.ok, a: 'start' }) +
    T(450, 22, 'EACH QUESTION AND ITS "NO"', { s: 12.5, f: P.ink2 }) +
    [['question 1, line 2', 'line 11', '9 lines apart'], ['question 2, line 3', 'line 9', '6 lines apart'], ['question 3, line 4', 'line 7', '3 lines apart']].map((r, i) => {
      const y = 40 + i * 46;
      return box(330, y, 132, 32, P.tint, 8) + T(396, y + 21, r[0], { s: 12, f: P.accent }) +
        arrow(468, y + 16, 492, y + 16, P.danger, 2.5) +
        box(498, y, 76, 32, P.dangerT, 8) + T(536, y + 21, r[1], { s: 12, f: P.danger });
    }).join('') +
    T(450, 184, 'The first question is answered last.', { s: 13, f: P.danger }));

  const codePic = `<div style="width:100%">${code(nestedCode, { title: 'rewards.py', hi: [5] })}${arrowPic}</div>`;

  const caseBox = (x, head, facts, said, should) =>
    box(x, 14, 270, 150, P.white, 14) + T(x + 135, 40, head, { s: 14 }) +
    T(x + 135, 62, facts, { s: 12.5, w: 700, f: P.ink2 }) +
    box(x + 20, 76, 230, 38, '#15132B', 10) + T(x + 135, 101, said, { s: 14, m: true, f: '#ECEAFF' }) +
    T(x + 135, 136, 'should say:', { s: 12, w: 700, f: P.ink2 }) + T(x + 135, 154, should, { s: 13, f: P.ok });
  const wrongPic = svg(600, 204, 'On Tuesday with no cookies left the till says Not on Saturdays. On Saturday with 12 cookies left the till says Sold out today.',
    caseBox(20, 'Tuesday', 'Ben, 38 points, 0 cookies left', '"Not on Saturdays."', '"Sold out today."') +
    caseBox(310, 'Saturday', 'Ben, 38 points, 12 cookies left', '"Sold out today."', '"Not on Saturdays."') +
    T(300, 194, 'Two answers have swapped places. Nothing crashed.', { s: 13, f: P.danger }));
  const painPic = `<div style="width:100%">${code(brokenCode, { title: 'rewards.py, with the Saturday rule', hi: [4, 5], bad: [7, 8, 9, 10] })}${wrongPic}</div>`;

  const flipPic = svg(600, 216, 'Each question is flipped so that it asks about the odd case',
    T(150, 24, 'NESTED: IS IT FINE?', { s: 12.5, f: P.ink2 }) + T(450, 24, 'GUARD: IS IT ODD?', { s: 12.5, f: P.ok }) +
    [['card is not None', 'card is None'], ['card.balance() >= 30', 'card.balance() < 30'], ['day != "Saturday"', 'day == "Saturday"'], ['cookies_left() > 0', 'cookies_left() == 0']].map((r, i) => {
      const y = 40 + i * 43;
      return box(30, y, 240, 32, P.white, 8) + T(150, y + 21, r[0], { s: 12.5, m: true, f: P.ink2 }) +
        arrow(280, y + 16, 322, y + 16, P.ok, 3) +
        box(332, y, 238, 32, P.okT, 8) + T(451, y + 21, r[1], { s: 12.5, m: true, f: P.ok });
    }).join('')).replace(/font-family="JetBrains Mono, monospace"/g, '$& style="font-variant-ligatures:none"');
  const fixPic = `<div style="width:100%">${code(guardCode, { title: 'rewards.py, with guard clauses', hi: [2, 4, 6, 8], good: [10] })}${flipPic}</div>`;

  const testPic = svg(600, 270, 'Two code outlines. In the arrow shape the main job is pushed far to the right. In the guard shape the main job sits at the left edge under four short guards.',
    T(150, 28, 'THE ARROW', { s: 12.5, f: P.danger }) + T(450, 28, 'GUARDS FIRST', { s: 12.5, f: P.ok }) +
    box(30, 44, 240, 176, P.white, 14) +
    `<line x1="72" y1="56" x2="72" y2="208" stroke="${P.sand}" stroke-width="3" stroke-dasharray="5 6"/>` +
    shape(46, 62, [[0, P.ink], [1, Q], [2, Q], [3, Q], [4, Q], [5, YES], [4, EL], [5, NO], [3, EL], [4, NO], [2, EL], [3, NO], [1, EL], [2, NO]], 26, 70, 10) +
    T(150, 244, 'main job: 5 steps from the edge', { s: 13, f: P.danger }) + T(150, 262, 'no', { s: 14, f: P.danger }) +
    `<line x1="300" y1="20" x2="300" y2="260" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    box(330, 44, 240, 176, P.okT, 14) +
    `<line x1="372" y1="56" x2="372" y2="208" stroke="${P.ok}" stroke-width="3" stroke-dasharray="5 6"/>` +
    shape(346, 66, guardRows, 26, 110) +
    T(450, 244, 'main job: at the left edge', { s: 13, f: P.ok }) + T(450, 262, 'yes', { s: 14, f: P.ok }));

  const pairCode = [
    'def opening_time(day):',
    '    if day == "Saturday" or day == "Sunday":',
    '        return "10:00"',
    '    else:',
    '        return "8:00"'
  ];
  const quietCode = [
    'def cookie_total(count, price):',
    '    if count < 0:',
    '        return 0',
    '    return count * price'
  ];
  const overPic = `<div style="width:100%">${code(pairCode, { title: 'hours.py: two equal branches, leave it', good: [2, 4] })}${code(quietCode, { title: 'shop.py: a guard that hides a mistake', bad: [2, 3] })}</div>`;

  COURSE.add({
    id: 'l21', minutes: 8,
    summary: 'Deal with the odd cases at the very top of a function and leave straight away. Those early checks are <b>guard clauses</b>. What is left below them is the main job, with nothing in its way.',
    video: {
      src: 'videos/l21-guard-clauses.mp4', poster: 'videos/l21-guard-clauses.jpg', length: '1 min 6 s',
      script: [
        "At Maya's cookie shop, 30 points win a free cookie. One job decides what the till says.",
        'Here it is. A question, inside a question, inside a question. The one line that says yes is pushed far to the right. And the answers that say no trail below, in reverse order.',
        'Then a new rule. No free cookies on Saturdays. Maya squeezes in one more question. But two of the no answers land on the wrong steps.',
        'On Tuesday, the cookies run out. And the till says: not on Saturdays.',
        'The fix. Flip each question, and move it to the top. No card? Leave with that answer. Not enough points? Leave. Saturday? Leave. Sold out? Leave.',
        'Now the yes line stands at the left edge, with nothing in its way. And the next new rule is just one more check at the door.',
        'Those early exits are called guard clauses. Handle the odd cases first, and the main job reads straight down.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: doorPic,
        h: 'Check at the door.',
        text: [
          'Think of the person at the door of a concert. No ticket? Sorry. Wrong night? Sorry. Bag too big? Sorry. Each odd case is dealt with <b>at the door</b>, and each one gets a clear reason.',
          'Everyone who gets past the door just walks in. Nobody is stopped again halfway to their seat.',
          'A <b>guard clause</b> is the same thing in code. It is a check at the <b>very top</b> of a function that deals with one odd case and <b>leaves straight away</b>. Put all the odd cases first, one after another. What is left below them is the main job, with nothing in its way.'
        ],
        tip: 'Programmers call the main job the <b>happy path</b>. It is what happens when nothing is odd: the customer has a ticket, it is the right night, and the bag is small.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'A question inside a question inside a question.',
        text: [
          'A customer scans a loyalty card, and the till shows one line. <code>free_cookie_reply</code> decides what that line says. It only <b>answers</b>. It changes nothing. Taking the points and handing over the cookie is a different job, as lesson 20, Command-query separation, asked.',
          'Three new bits of Python. <code>None</code> means "nothing here". When the customer has no card, <code>card</code> is <code>None</code>. So <code>card is not None</code> asks: is there a card? And <code>else</code> goes with an <code>if</code>. The pushed-in lines under <code>else</code> run when the answer was <b>no</b>.',
          '<code>card.balance()</code> is the way to look at the points, from lesson 19. <code>cookies_left()</code> hands back how many cookies are in the jar. Since lesson 20 it only looks.',
          'Now look at the <b>shape</b>. Each question sits inside the one before it, one step further right. The line that says yes, line 5, starts <b>16 spaces</b> from the edge. The answers that say no come back in <b>reverse order</b>. The first question, on line 2, gets its answer last, on line 11.',
          'Which <code>else</code> goes with which <code>if</code>? The one directly above it that starts at the <b>same distance from the left edge</b>. You have to line them up by eye.'
        ],
        tip: 'This shape has nicknames: the <b>arrow</b> or the <b>pyramid</b>. Look at the outline under the code and you will see why.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Two answers swap places.',
        text: [
          'Saturdays are too busy. Maya makes a new rule: <b>no free cookies on Saturdays</b>. The job is now handed the <code>day</code> as well.',
          'She adds the new question on line 4. <code>!=</code> means "is not equal to", as in lesson 18. Then she pushes the cookie question and the yes line one step to the right, so they sit inside it.',
          'But she does <b>not</b> push the old <code>else</code> on line 9. It stays where it was. It now lines up with her new question on line 4, so it has become the "no" for <b>Saturday</b>. And it still says "Sold out today."',
          'The cookie question on line 5 has lost its <code>else</code>. Maya sees the gap and fills it on lines 7 and 8 with her new message.',
          'Try a <b>Tuesday</b> when the jar is empty. Ben has 38 points. Line 5 says no, so line 8 runs. The till tells Ben: <b>"Not on Saturdays."</b> And on a real Saturday, with 12 cookies in the jar, line 10 tells him: <b>"Sold out today."</b>'
        ],
        warn: 'Nothing crashed. Every line Maya typed was correct Python. The nested shape asked her to keep four pairs of <code>if</code> and <code>else</code> lined up in her head, and one pair slipped.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Flip each question and leave early.',
        text: [
          'The nested code asks, four times, "is everything fine?". Maya <b>flips</b> each question so it asks about the <b>odd case</b>. "Is there a card?" becomes "is there no card?". The new sign <code>&lt;</code> means "is less than".',
          'Each flipped question goes at the top, with its answer <b>right under it</b>. That is a guard clause. Lines 2 and 3 say: no card? Leave with "No card yet."',
          'Remember what <code>return</code> does. It hands back the answer and the job is <b>over</b>. So line 4 only runs for customers who do have a card. No <code>else</code> is needed anywhere.',
          'After four guards, the yes line stands at the <b>left edge</b> on line 10. Nothing is wrapped around it. And each question now sits next to its own answer, so two answers cannot swap.',
          'Next month Maya adds another rule: staff cards do not win free cookies. That is <b>two new lines</b>, a guard and its answer, placed above line 10. No other line moves.'
        ],
        tip: 'The order of the guards can matter. "No card" has to come first. Line 4 asks the card for its balance, and you cannot ask a card that is not there.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Find the main job.',
        text: [
          'Open a function and ask: <b>"Is the main job at the left edge, with the odd cases dealt with above it?"</b>',
          'Try the nested version with the Saturday rule. The main job is the yes line. It sits 5 steps from the edge, wrapped in four questions. <b>No.</b>',
          'Try the guard version. Four short guards, then the yes line at the edge. <b>Yes.</b>',
          'A quick sign of trouble: a ladder of <code>else</code> lines at the bottom of a function, each one far from the question it belongs to.'
        ],
        tip: 'A second check: read only the <b>last lines</b> of the function. With guards, they are the main job. With nesting, they are the answer to a question you met at the very top.'
      },
      {
        label: 'When not to', pic: overPic,
        h: 'Not every "if" is a guard.',
        text: [
          '<b>Two equal branches are not an odd case.</b> The shop opens at 10:00 at the weekend and at 8:00 on other days. Neither one is the main job. A plain <code>if</code> and <code>else</code> shows them as the pair they are. Rewriting that as a guard would make one half look like an exception.',
          '<b>A long line of guards is a warning.</b> Suppose a job starts with 15 guards before it does anything. Either it does too much, or it is being handed things it should never get. That is a job to split, with lesson 16, Single responsibility, and lesson 17, Small functions. More guards will not fix it.',
          '<b>Do not use a guard to hide a mistake.</b> Look at <code>cookie_total</code>. A count below zero is not an odd customer. It is a <b>bug</b> somewhere else in the program. The guard quietly hands back 0, the sale looks free, and nobody finds out. A customer with no card is normal, so a calm answer is right. A count of -3 is not normal.'
        ],
        warn: 'When the odd case is really a mistake by the code that called the job, stopping loudly is better than a quiet made-up answer. That is the next lesson, Fail fast.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'It is <b>Saturday</b>. Ben has 38 points and there are 12 cookies in the jar. What does this code reply?',
        pic: code(brokenCode, { title: 'rewards.py, with the Saturday rule' }),
        options: ['Yes! One free cookie.', 'Not on Saturdays.', 'Sold out today.', 'Not enough points.'],
        answer: 2,
        why: 'Line 4 asks "is it not Saturday?". The answer is no, so its <code>else</code> runs. That is the one on line 9, at the same distance from the edge, and it says "Sold out today."',
        hint: 'Lines 2 and 3 say yes. Line 4 says no. Now find the <code>else</code> that starts exactly under the <code>if</code> on line 4.'
      },
      {
        type: 'match', q: 'Flip each question so that it asks about the odd case.',
        pairs: [
          ['card is None', '<code>card is not None</code>'],
          ['card.balance() < 30', '<code>card.balance() &gt;= 30</code>'],
          ['day == "Saturday"', '<code>day != "Saturday"</code>'],
          ['cookies_left() == 0', '<code>cookies_left() &gt; 0</code>']
        ],
        why: 'The nested question asks "is it fine?". The guard asks "is it odd?". Same four checks, turned around.',
        hint: 'Each pair is about the same thing: the card, the points, the day or the jar.'
      },
      {
        type: 'fill', q: 'Finish the first two guards.',
        text: 'def free_cookie_reply(card, day):\n    if card is ___:\n        ___ "No card yet."\n    if card.balance() ___ 30:\n        return "Not enough points."',
        options: ['None', 'return', '<', '>=', 'else'],
        answer: ['None', 'return', '<'],
        why: 'A guard asks about the odd case and leaves with <code>return</code>. Fewer than 30 points is the odd case here.',
        hint: 'No <code>else</code> is needed. The second guard should catch customers who do not have enough points.'
      },
      {
        type: 'pick', q: 'Which line is the main job, the "happy path"?',
        pic: code([
          'def delivery_fee(order):',
          '    if order.total >= 30:',
          '        return 0',
          '    if order.is_pickup:',
          '        return 0',
          '    return 5'
        ], { title: 'orders.py' }),
        options: ['Line 2', 'Line 3', 'Line 5', 'Line 6'],
        answer: 3,
        why: 'Lines 2 to 5 are two guards for two special cases: a big order and a pickup. Line 6 is what happens when nothing is special. It sits at the left edge, at the bottom.',
        hint: 'Look for the line that runs when no guard has fired.'
      },
      {
        type: 'pick', q: 'Sam swaps the first two guards, so the points guard comes first. A customer with <b>no card</b> walks up. What happens?',
        pic: code([
          'def free_cookie_reply(card, day):',
          '    if card.balance() < 30:',
          '        return "Not enough points."',
          '    if card is None:',
          '        return "No card yet."'
        ], { title: 'rewards.py, guards swapped', bad: [2] }),
        options: ['The till says "No card yet."', 'The job crashes on line 2: it asks a card that is not there for its balance', 'The customer gets a free cookie', 'The till says "Sold out today."'],
        answer: 1,
        why: 'With no card, <code>card</code> is <code>None</code>, and <code>None</code> has no balance to ask for. The "no card" guard has to stand first, so the lines below it can trust that a card is there.',
        hint: 'Line 2 runs before line 4. What is <code>card</code> for this customer?'
      },
      {
        type: 'order', q: 'Put the steps for turning one nested question into a guard in order.',
        items: ['Find the outermost question', 'Flip it so it asks about the odd case', 'Put its "no" answer right under it, with return', 'Delete its else', 'Pull the lines that were inside it one step left'],
        why: 'Do that once for each question, from the outside in. The arrow gets flatter every time.',
        hint: 'You cannot delete the <code>else</code> before its answer has a new home.'
      },
      {
        type: 'bucket', q: 'A good place for a guard clause, or not?',
        buckets: ['Use a guard', 'Not a guard'],
        items: [
          ['A customer with no card asks for a free cookie', 0],
          ['The jar is empty', 0],
          ['The shop is closed today', 0],
          ['Weekend opening time or weekday opening time', 1],
          ['A count of -3 that can only come from a bug', 1],
          ['Handing back a made-up 0 so that nobody notices a problem', 1]
        ],
        why: 'Guards are for odd but <b>normal</b> cases that deserve a calm answer. Two equal choices are a plain if and else. A real mistake should not be hidden.'
      },
      {
        type: 'pick', q: 'Back to lesson 17, Small functions. A job begins with 15 guards before its main job starts. What should Maya ask first?',
        options: [
          'How can I fit the 15 guards on fewer lines?',
          'Can I say what this job does without the word "and"?',
          'Should the guards be nested to save space?',
          'Which guard can I delete without anyone noticing?'
        ],
        answer: 1,
        why: 'A job that needs 15 guards is probably doing several things, or being handed things it should never get. The "and" question finds the pieces to cut out. Then each small job needs only a guard or two.',
        hint: 'One of these is the test from lesson 17.'
      }
    ]
  });
})();
