/* Lesson 5: KISS (module 1). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l05  KISS
     ===================================================================== */
  const house = (x, y) =>
    `<rect x="${x - 17}" y="${y}" width="34" height="26" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<path d="M${x - 25} ${y} L${x} ${y - 21} L${x + 25} ${y}z" fill="${P.warnT}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>` +
    `<rect x="${x - 5}" y="${y + 10}" width="10" height="16" fill="${P.accent}" stroke="${P.ink}" stroke-width="2"/>`;

  const routePic = svg(600, 300, 'Plain directions and a riddle both lead to the same house. The directions get you there at once. The riddle has to be solved first.',
    T(150, 34, 'PLAIN DIRECTIONS', { s: 12.5, f: P.ok }) + T(450, 34, 'A RIDDLE', { s: 12.5, f: P.danger }) +
    `<line x1="300" y1="24" x2="300" y2="286" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    box(30, 54, 240, 92, P.okT, 16) +
    T(150, 94, '"Left at the bakery.', { s: 15 }) + T(150, 118, 'Second door."', { s: 15 }) +
    arrow(150, 156, 150, 192, P.ok, 3.5) + house(150, 220) +
    T(150, 278, 'you are there in two minutes', { s: 13, w: 700, f: P.ink2 }) +
    box(330, 54, 240, 92, P.dangerT, 16) +
    T(450, 82, '"Go where bread is born.', { s: 13 }) + T(450, 104, 'Turn to the side of your heart.', { s: 13 }) + T(450, 126, 'Knock after the first."', { s: 13 }) +
    arrow(450, 156, 450, 192, P.danger, 3.5) + house(450, 220) +
    T(450, 278, 'same house, after a lot of puzzling', { s: 13, w: 700, f: P.ink2 }));

  const cleverCode = [
    'def is_open(d, h):',
    '    s = d[0] == "S"',
    '    return 8 + 2 * s <= h < 18 - 2 * s'
  ];
  const brokenCode = cleverCode.slice();
  brokenCode[2] = '    return 8 + 2 * s <= h < 18 - 4 * s';

  const simpleCode = [
    'def is_open(day, hour):',
    '    opens = 8',
    '    closes = 18',
    '    if day == "Saturday" or day == "Sunday":',
    '        opens = 10',
    '        closes = 16',
    '    return opens <= hour < closes'
  ];
  const sundayCode = simpleCode.slice(0, 6).concat([
    '    if day == "Sunday":',
    '        closes = 14',
    simpleCode[6]
  ]);

  const hoursPic = svg(600, 112, 'Opening hours: Monday to Friday 8 to 18, Saturday 10 to 16, Sunday 10 to 16',
    [['Monday to Friday', '8 to 18', P.tint], ['Saturday', '10 to 16', P.warnT], ['Sunday', '10 to 16', P.warnT]].map((r, i) => {
      const x = 20 + i * 192;
      return box(x, 14, 176, 66, r[2], 14) + T(x + 88, 40, r[0], { s: 13 }) + T(x + 88, 66, r[1], { s: 17, m: true });
    }).join('') +
    T(300, 104, 'hours on a 24-hour clock: 18 is 6 pm, 16 is 4 pm', { s: 12.5, w: 700, f: P.ink2 }));
  const codePic = `<div style="width:100%">${code(cleverCode, { title: 'shop.py', hi: [2, 3] })}${hoursPic}</div>`;

  const painPic = `<div style="width:100%">${code(brokenCode, { title: 'shop.py, after the Sunday change', bad: [3] })}` +
    svg(600, 150, 'On Saturday at 15:00 the changed code asks whether 15 is less than 14. It is not, so the sign says closed.',
      box(24, 22, 262, 84, P.white, 14) + T(155, 54, 'Saturday, 15:00', { s: 14 }) + T(155, 84, '10 <= 15 < 14 ?  no', { s: 15, m: true, f: P.danger }) +
      arrow(298, 64, 356, 64, P.danger, 3.5) +
      box(368, 22, 208, 84, P.dangerT, 14) + T(472, 60, 'CLOSED', { s: 22, f: P.danger }) + T(472, 86, 'sign in the window', { s: 12.5, w: 700, f: P.ink2 }) +
      T(300, 138, 'Saturday should stay open until 16.', { s: 13, w: 700, f: P.ink2 })) + `</div>`;

  const bubble = (x, fill, lines, mono) =>
    box(x, 78, 240, 108, fill, 18) +
    `<path d="M${x + 44} 184 L${x + 34} 212 L${x + 76} 184z" fill="${fill}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>` +
    `<line x1="${x + 46}" y1="185" x2="${x + 74}" y2="185" stroke="${fill}" stroke-width="4"/>` +
    lines.map((s, i) => T(x + 120, 112 + i * 24, s, { s: 13.5, m: mono })).join('');
  const readPic = svg(600, 300, 'Sam reads the simple code aloud as plain sentences. Reading the clever code aloud, he gets stuck.',
    T(150, 34, 'SIMPLE', { s: 12.5, f: P.ok }) + T(450, 34, 'CLEVER', { s: 12.5, f: P.danger }) +
    T(150, 60, 'Sam reads it aloud:', { s: 12.5, w: 700, f: P.ink2 }) + T(450, 60, 'Sam reads it aloud:', { s: 12.5, w: 700, f: P.ink2 }) +
    `<line x1="300" y1="24" x2="300" y2="286" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    bubble(30, P.okT, ['"It opens at 8 and', 'closes at 18. At the', 'weekend, 10 and 16."']) +
    bubble(330, P.dangerT, ['"s is d, zero, equals S?', '8 plus 2 times s is', 'less than... wait."']) +
    T(150, 250, 'he can say what it does', { s: 13, f: P.ok }) + T(150, 272, 'so he can change it safely', { s: 13, w: 700, f: P.ink2 }) +
    T(450, 250, 'he has to decode it first', { s: 13, f: P.danger }) + T(450, 272, 'so every change is a guess', { s: 13, w: 700, f: P.ink2 }));

  const tooSimple = [
    'def is_open(day, hour):',
    '    return 8 <= hour < 18'
  ];
  const overPic = `<div style="width:100%">${code(tooSimple, { title: 'shop.py, with the weekend rules deleted', bad: [2] })}` +
    svg(600, 150, 'On Sunday at 8:00 the cut-down code says open, but the shop does not open until 10.',
      box(24, 22, 262, 84, P.white, 14) + T(155, 54, 'Sunday, 8:00', { s: 14 }) + T(155, 84, '8 <= 8 < 18 ?  yes', { s: 15, m: true, f: P.danger }) +
      arrow(298, 64, 356, 64, P.danger, 3.5) +
      box(368, 22, 208, 84, P.dangerT, 14) + T(472, 60, 'OPEN', { s: 22, f: P.danger }) + T(472, 86, 'but the door is locked', { s: 12.5, w: 700, f: P.ink2 }) +
      T(300, 138, 'On Sunday the shop opens at 10. The code forgot.', { s: 13, w: 700, f: P.ink2 })) + `</div>`;

  COURSE.add({
    id: 'l05', minutes: 8,
    summary: '<b>KISS</b> means keep it simple. Write the plainest code that solves today\'s problem. Clever is not the same as good.',
    video: {
      src: 'videos/l05-kiss.mp4', poster: 'videos/l05-kiss.jpg', length: '1 min 3 s',
      script: [
        "Maya's cookie shop has a sign in the window. Her program decides when it says open.",
        'Here is the code. Maya is proud of it. 3 short lines, packed with clever tricks.',
        'And it works. Weekdays, 8 to 6. Weekends, 10 to 4.',
        'Then a simple request arrives. On Sundays, close 2 hours early.',
        'Maya stares at her own code. Where does Sunday go? She guesses, and changes one number.',
        'Sunday is right. But Saturday closes early too. Saturday afternoon, the shop is full of cookies, and the sign says closed.',
        'So Maya writes it again, in plain steps. Opening time. Closing time. Weekend hours. Anyone can read it out loud.',
        'Now the Sunday rule is 2 new lines. Nothing else is touched.',
        'That is KISS. Keep it simple. Clever code is fun to write. Simple code is easy to change.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: routePic,
        h: 'Directions, not a riddle.',
        text: [
          'A friend asks the way to your house. You say: "Left at the bakery, second door." You could also hand over a riddle that hides the same route. Both are correct. Only one is <b>kind to the person using it</b>.',
          'Code is the same. Lesson 1 said a program is changed far more often than it is first written. Before anyone can change code, they have to <b>read</b> it.',
          '<b>KISS</b> means: write the simplest thing that solves today\'s problem, so the next reader gets directions and not a riddle.'
        ],
        tip: 'KISS stands for "Keep it simple, stupid". Say it kindly. Nobody is being called stupid. It is the <b>design</b> that should be simple.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'Three clever lines.',
        text: [
          'The shop has a light-up sign in the window. This job decides if it says OPEN. It is given the name of the day, <code>d</code>, and the hour on a 24-hour clock, <code>h</code>. So 18 means 6 pm.',
          'Line 2 is the first trick. <code>d[0]</code> is the first letter of the day. <code>==</code> asks "are these the same?". Only Saturday and Sunday start with S, so <code>s</code> is yes at the weekend and no on other days.',
          'Line 3 is the second trick. Python lets you do sums with yes and no: yes counts as 1 and no counts as 0. So <code>2 * s</code> is 2 at the weekend and 0 on other days. The weekend opens 2 hours later and closes 2 hours earlier.',
          'It works, and Maya is proud of it. But look how much you had to be <b>told</b> before three lines made sense.'
        ]
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Where does Sunday go?',
        text: [
          'A simple request arrives: <b>on Sundays, close two hours early</b>. That means 14, not 16.',
          'Maya opens the file a month later. The word "Sunday" is nowhere in it. She remembers that the end of line 3 is the closing time, so she guesses and changes the last <code>2</code> to a <code>4</code>.',
          'Sunday is right: 18 - 4 = 14. But <code>s</code> is also yes on <b>Saturday</b>. Now Saturday closes at 14 too. At 3 in the afternoon the shop is full of cookies and the sign says CLOSED.'
        ],
        warn: 'Nothing crashed. And Maya wrote this code herself. Clever code fools its own author as soon as the tricks are forgotten.'
      },
      {
        label: 'The fix', pic: code(sundayCode, { title: 'shop.py, in plain steps', good: [7, 8] }),
        h: 'Say each step plainly.',
        text: [
          'Maya writes the job again. Full names: <code>day</code>, <code>hour</code>, <code>opens</code>, <code>closes</code>. One small step per line.',
          'A line starting with <code>if</code> asks a question. The pushed-in lines under it only run when the answer is yes. <code>or</code> means either one will do.',
          'Read it from the top. Start with the normal hours. At the weekend, use the weekend hours. The last line gives the answer: is the hour at least <code>opens</code> and less than <code>closes</code>?',
          'Now the Sunday rule is <b>lines 7 and 8</b>. Two new lines, sitting right where a reader would look. No old line was touched, so Saturday cannot break.'
        ],
        tip: 'Two things made the first version hard: the tricks and the one-letter names. Both come back later, in lesson 11, Least astonishment, and lesson 12, Meaningful names.'
      },
      {
        label: 'The test', pic: readPic,
        h: 'Read it aloud.',
        text: [
          'Ask: <b>"Could someone new read this aloud and say what it does?"</b>',
          'Sam, the new helper from lesson 4, tries both versions. The simple one comes out as plain sentences. The clever one comes out as a puzzle.',
          'If code cannot be read aloud, it cannot be changed safely. Every edit becomes a guess, like Maya\'s <code>4</code>.'
        ]
      },
      {
        label: 'When not to', pic: overPic,
        h: 'Simple is not short. Simple is not less.',
        text: [
          '<b>Simple does not mean short.</b> The clever version was 3 lines. The simple one is 9, and it is the better one. Count the time it takes to understand, not the lines.',
          '<b>Simple does not mean leaving things out.</b> Suppose Maya loves the idea so much that she deletes the weekend rules to get one tidy line. It is very easy to read, and it is wrong. On Sunday at 8 the sign says OPEN and the door is locked.',
          'The weekend hours are real, so they belong in the code. And some problems really are complicated. Then you cannot make the whole thing small. You can still keep <b>each piece</b> simple.'
        ],
        warn: 'KISS means the simplest thing that solves <b>all</b> of today\'s problem. Not half of it.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does KISS ask you to do?',
        options: ['Write as few lines as you can', 'Write the simplest code that solves today\'s problem', 'Use the cleverest trick you know', 'Leave out rules to keep the code small'],
        answer: 1,
        why: 'Simple means easy to read and easy to change. It does not mean shortest, and it does not mean leaving out what the problem needs.',
        hint: 'Think of the directions to the house. What made them good?'
      },
      {
        type: 'pick', q: 'Decode this clever line. Which plain sentence says what it does?',
        pic: code([
          'def price_for(count):',
          '    return count * 3 - 3 * (count > 11)'
        ], { title: 'prices.py' }),
        options: [
          'Each cookie costs $3, and you get $3 off when you buy 12 or more',
          'Each cookie costs $3, and you get $3 off when you buy 11 or more',
          'Each cookie costs $3, and you get $11 off a big order',
          'Each cookie costs $3, and every 11th cookie is free'
        ],
        answer: 0,
        why: '<code>count &gt; 11</code> is yes for 12 or more, and yes counts as 1. So $3 comes off. You just had to solve a riddle to read one line. Two plain lines with an <code>if</code> would have said it.',
        hint: 'Yes counts as 1 and no counts as 0. Is 11 itself more than 11?'
      },
      {
        type: 'type', q: 'This is Maya\'s code after her guess. Work it out: at what hour does the shop now close on a Saturday? Type the number.',
        pic: code(brokenCode, { title: 'shop.py, after the Sunday change' }),
        prompt: 'closes at >',
        answers: ['14', '14:00', '2 pm', '2pm'],
        why: 'Saturday starts with S, so <code>s</code> counts as 1. Then 18 - 4 * 1 = 14. The change meant for Sunday quietly hit Saturday too.',
        hint: 'On Saturday <code>s</code> counts as 1. Put 1 into <code>18 - 4 * s</code>.'
      },
      {
        type: 'bucket', q: 'Simple, or just clever?',
        buckets: ['Simple', 'Just clever'],
        items: [
          ['Names like opens and closes', 0],
          ['One small step on each line', 0],
          ['A new helper can read it aloud', 0],
          ['Names like d, h and s', 1],
          ['Checking the first letter to find the weekend', 1],
          ['Doing sums with yes and no', 1]
        ],
        why: 'The clever tricks all work. They just make the reader do the work that the writer skipped.'
      },
      {
        type: 'fill', q: 'A new request: on Fridays the shop stays open until 20. Add the rule to the simple version.',
        text: 'def is_open(day, hour):\n    opens = 8\n    closes = 18\n    if day == "___":\n        ___ = ___\n    return opens <= hour < closes',
        options: ['Friday', 'closes', '20', 'opens', 'Sunday', '18'],
        answer: ['Friday', 'closes', '20'],
        why: 'Two plain lines, and nothing else changes. In simple code the request tells you what to type.',
        hint: 'Which day? Which of the two times moves? What is the new hour?'
      },
      {
        type: 'order', q: "Put Maya's story in order.",
        items: ['Maya writes is_open in three clever lines', 'A request arrives: close early on Sundays', 'Maya guesses and changes one number', 'Saturday closes early too', 'Maya rewrites the job in plain steps', 'The Sunday rule is two new lines'],
        why: 'The clever version worked on day one. The trouble only showed on the day it had to change.',
        hint: 'The bug comes from the guess, and the rewrite comes after the bug.'
      },
      {
        type: 'pick', q: 'Back to lesson 1. Ask its question about this code: the weekend opening time moves from 10 to 11. How many lines must change?',
        pic: code(sundayCode, { title: 'shop.py, in plain steps' }),
        options: ['1', '2', '3', '9'],
        answer: 0,
        why: 'Only line 5. "If one thing changes, how many places must I touch?" Here the answer is one, and you can see which one at a glance.',
        hint: 'Find the line that sets the opening time at the weekend.'
      },
      {
        type: 'pick', q: 'Which of these are true? Pick all that apply.',
        options: ['Simple code can have more lines than clever code', 'A real rule, like the Sunday hours, belongs in the code', 'The shortest version is always the simplest', 'To keep code simple, leave out the rules that are awkward'],
        answer: [0, 1],
        why: 'Simple is about how easy the code is to understand. It is not about size, and it never means solving less than the real problem.',
        hint: 'Two of these are the mistakes from "When not to".'
      }
    ]
  });
})();
