/* Lesson 1: Easy to change (module 0). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l01  Easy to change
     ===================================================================== */
  const lifePic = svg(600, 250, 'A short slice of time for writing code and a much longer slice for changing it',
    T(300, 34, 'The life of a program', { s: 16 }) +
    box(30, 70, 110, 70, P.tint, 14) + T(85, 112, 'write it', { s: 15, f: P.accent }) +
    box(152, 70, 418, 70, P.warnT, 14) + T(361, 104, 'change it', { s: 17 }) + T(361, 126, 'again, and again, and again', { s: 12.5, w: 700, f: P.ink2 }) +
    ['new price', 'new rule', 'new feature', 'bug fix'].map((s, i) => {
      const x = 196 + i * 110;
      return arrow(x, 196, x, 150, P.warn, 2.5) + T(x, 218, s, { s: 12.5, w: 700, f: P.ink2 });
    }).join(''));

  const shopCode = [
    'def show_price(price):',
    '    total = price + price * 0.08',
    '    display(total)',
    '',
    'def take_payment(price):',
    '    total = price + price * 0.08',
    '    charge_card(total)',
    '',
    'def print_receipt(price):',
    '    total = price + price * 0.08',
    '    print_paper(total)'
  ];
  const brokenCode = shopCode.map((l, i) => (i === 1 || i === 5) ? l.replace('0.08', '0.09') : l);
  const fixedCode = ['TAX_RATE = 0.09', ''].concat(shopCode.map(l => l.replace('0.08', 'TAX_RATE')));

  const mismatchPic = `<div style="width:100%">${code(brokenCode, { title: 'shop.py, after the tax change', good: [2, 6], bad: [10] })}` +
    svg(600, 120, 'The screen shows 10.90 dollars but the receipt prints 10.80 dollars',
      box(40, 26, 200, 70, '#15132B', 14) + T(140, 70, '$10.90', { s: 26, m: true, f: '#ECEAFF' }) + T(140, 114, 'screen', { s: 12.5, w: 700, f: P.ink2 }) +
      `<circle cx="300" cy="61" r="26" fill="${P.dangerT}" stroke="${P.ink}" stroke-width="2.5"/>` + T(300, 72, '≠', { s: 30, f: P.danger }) +
      box(360, 26, 200, 70, P.white, 14) + T(460, 70, '$10.80', { s: 26, m: true }) + T(460, 114, 'receipt', { s: 12.5, w: 700, f: P.ink2 })) + `</div>`;

  const touchPic = svg(600, 300, 'One change needing one edit is easy. One change needing three edits is risky.',
    T(150, 34, 'EASY TO CHANGE', { s: 12.5, f: P.ok }) + T(450, 34, 'HARD TO CHANGE', { s: 12.5, f: P.danger }) +
    box(90, 54, 120, 46, P.warnT, 12) + T(150, 83, '1 change', { s: 14 }) +
    arrow(150, 106, 150, 168, P.ok, 3.5) +
    box(90, 176, 120, 46, P.okT, 12) + T(150, 205, '1 edit', { s: 14, f: P.ok }) +
    T(150, 262, 'nothing to forget', { s: 13, w: 700, f: P.ink2 }) +
    `<line x1="300" y1="24" x2="300" y2="280" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    box(390, 54, 120, 46, P.warnT, 12) + T(450, 83, '1 change', { s: 14 }) +
    [0, 1, 2].map(i => {
      const x = 356 + i * 94;
      return arrow(450, 106, x, 168, P.danger, 3) + box(x - 40, 176, 80, 46, i === 2 ? P.dangerT : P.white, 12) + T(x, 205, i === 2 ? 'missed' : 'edit', { s: 13, f: i === 2 ? P.danger : P.ink });
    }).join('') +
    T(450, 262, 'every extra place is a chance to miss one', { s: 13, w: 700, f: P.ink2 }));

  const overPic = svg(600, 280, 'A simple box next to a box covered in unused switches and dials',
    T(150, 34, 'SIMPLE', { s: 12.5, f: P.ok }) + T(450, 34, 'OVER-PREPARED', { s: 12.5, f: P.danger }) +
    box(80, 90, 140, 110, P.okT, 18) + T(150, 140, 'does the job', { s: 14 }) + T(150, 162, 'needed today', { s: 12.5, w: 700, f: P.ink2 }) +
    box(380, 90, 140, 110, P.dangerT, 18) + T(450, 150, 'does the job', { s: 14 }) +
    [[362, 110], [362, 150], [362, 186], [538, 110], [538, 150], [538, 186], [410, 76], [450, 76], [490, 76], [410, 214], [450, 214], [490, 214]].map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="11" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/><line x1="${p[0]}" y1="${p[1]}" x2="${p[0] + 5}" y2="${p[1] - 6}" stroke="${P.ink}" stroke-width="2.5" stroke-linecap="round"/>`).join('') +
    T(150, 244, 'easy to read, easy to change', { s: 13, w: 700, f: P.ink2 }) +
    T(450, 250, '12 switches "just in case"', { s: 13, w: 700, f: P.ink2 }) + T(450, 268, 'nobody uses them', { s: 13, w: 700, f: P.ink2 }));

  COURSE.add({
    id: 'l01', minutes: 7,
    summary: 'Before any principle has a name, you need the one goal they all serve. Good code is code that is <b>easy to change</b>.',
    video: {
      src: 'videos/l01-easy-to-change.mp4', poster: 'videos/l01-easy-to-change.jpg', length: '1 min 7 s',
      script: [
        'Meet Maya. She runs a small cookie shop, and she wrote a little program to run it.',
        'The program does three jobs. It shows the price, takes the payment, and prints the receipt. Each job adds eight percent sales tax.',
        'Here is the code. Look closely. The tax, 0.08, is typed in three separate places.',
        'Then the city raises the tax to nine percent. Maya opens the code and fixes it. Here. And here. But she misses the third one.',
        'Now the screen shows one price, and the receipt prints another. Nothing crashed. The code is just quietly wrong.',
        'The fix is small. Give the tax one name, in one place, and let every job use that name.',
        'Next time the tax changes, Maya changes one line. And nothing gets missed.',
        'That is what good code means. Code that is easy to change. Every principle in this course is one more way to keep it that way.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: lifePic,
        h: 'Code is never finished.',
        text: [
          'A program is not written once and then left alone. Prices change. Rules change. People ask for new things.',
          'Over its life, a program is <b>changed</b> far more often than it is first written. So the best thing code can be is <b>easy to change</b>.'
        ],
        tip: 'Every principle in this course is a trick for keeping code easy to change. When a principle feels confusing, come back to that.'
      },
      {
        label: 'The code', pic: code(shopCode, { title: 'shop.py', hi: [2, 6, 10] }),
        h: "Maya's cookie shop.",
        text: [
          'This program does three jobs. A line starting with <code>def</code> begins a named job, called a <b>function</b>. The pushed-in lines under it are the steps of that job.',
          'Each job works out the total: the price, plus the price times <code>0.08</code>. That <code>0.08</code> is the 8% sales tax.',
          'Count how many times <code>0.08</code> appears. <b>Three.</b> The same fact, typed in three places.'
        ]
      },
      {
        label: 'The pain', pic: mismatchPic,
        h: 'One change, three places.',
        text: [
          'The city raises the tax to 9%. Maya fixes the first job and the second job. She misses the third.',
          'Now the screen says <b>$10.90</b> and the receipt says <b>$10.80</b> for the same cookies.',
          'Nothing crashed. No error message appeared. The program is just <b>quietly wrong</b>, and those are the hardest bugs to find.'
        ],
        warn: 'Maya is not careless. The code set a trap: it asked her to remember three places, and people forget.'
      },
      {
        label: 'The fix', pic: code(fixedCode, { title: 'shop.py, fixed', good: [1, 4, 8, 12] }),
        h: 'Say it once.',
        text: [
          'Give the tax a <b>name</b>, <code>TAX_RATE</code>, on one line at the top. Every job uses the name, not the number.',
          'Next time the tax changes, Maya edits <b>line 1</b> and all three jobs follow. There is nothing left to forget.'
        ],
        tip: 'This fix has a name: <b>single source of truth</b>. You will meet it properly in lesson 7. The repeated <code>total = ...</code> line can be improved too. That is lesson 6, DRY.'
      },
      {
        label: 'The test', pic: touchPic,
        h: 'Ask one question.',
        text: [
          'To judge any piece of code, ask: <b>"If this one thing changes, how many places do I have to touch?"</b>',
          'One place means easy to change. Many places means every change is a chance to miss one.'
        ]
      },
      {
        label: 'When not to', pic: overPic,
        h: "Don't over-prepare.",
        text: [
          '"Easy to change" does not mean "ready for every possible future". Adding switches and options <b>just in case</b> makes code longer, harder to read, and harder to change.',
          'Aim for simple code you can change <b>when the need arrives</b>, not code that guesses every need in advance.'
        ],
        warn: 'Guessing the future is its own mistake. It has a name too: lesson 8, YAGNI.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'In this course, what makes code "good"?',
        options: ['It runs as fast as possible', 'It has the fewest lines', 'It is easy to change', 'It uses the newest tools'],
        answer: 2,
        why: 'Speed and size matter sometimes. Being easy to change matters every single week.',
        hint: 'Think about what happened to Maya when the tax went up.'
      },
      {
        type: 'pick', q: 'The delivery fee goes up from <code>5</code> to <code>6</code>. How many lines must change?',
        pic: code([
          'def cart_total(items):',
          '    return sum(items) + 5',
          '',
          'def order_email(items):',
          '    return "Total: " + str(sum(items) + 5)',
          '',
          'def refund(items):',
          '    return sum(items) + 5'
        ], { title: 'orders.py' }),
        options: ['1', '2', '3', '0'],
        answer: 2,
        why: 'The fee <code>5</code> is typed in three jobs: lines 2, 5 and 8. Miss one and customers get refunded the wrong amount.',
        hint: 'Count every line where the fee <code>5</code> appears.'
      },
      {
        type: 'order', q: "Put Maya's story in order.",
        items: ['The tax is typed in three places', 'The city raises the tax', 'Maya updates two places and misses one', 'The screen and the receipt disagree', 'The tax gets one name in one place'],
        why: 'The trap was set on day one, long before the tax ever changed.',
        hint: 'The problem starts with how the code was first written.'
      },
      {
        type: 'bucket', q: 'Easy to change, or hard to change?',
        buckets: ['Easy to change', 'Hard to change'],
        items: [
          ['A value with a clear name, set once', 0],
          ['One change means editing one line', 0],
          ['The same number copied into five files', 1],
          ['You must search the whole program to update one rule', 1],
          ['Missing one spot causes a quiet bug', 1]
        ],
        why: 'The fewer places a change touches, the safer it is.'
      },
      {
        type: 'fill', q: 'Finish the fix so the tax lives in one place.',
        text: '___ = 0.09\n\ndef show_price(price):\n    total = price + price * ___',
        options: ['TAX_RATE', 'TAX_RATE', '0.08', 'total'],
        answer: ['TAX_RATE', 'TAX_RATE'],
        why: 'Name it once at the top, then use the name everywhere.',
        hint: 'Both blanks take the same name. Neither one is a number.'
      },
      {
        type: 'pick', q: "Why was Maya's bug so dangerous? Pick all that apply.",
        options: ['The program ran with no error message', 'The screen and the receipt showed different totals', 'The computer was too slow', 'She wrote too few lines of code'],
        answer: [0, 1],
        why: 'A crash gets fixed in minutes. A quiet wrong answer can sit there for months.',
        hint: 'Two of these really happened in the story.'
      },
      {
        type: 'pick', q: 'Which question best tests whether code is easy to change?',
        options: ['How many lines does it have?', 'If one thing changes, how many places must I touch?', 'How long did it take to write?', 'Which language is it written in?'],
        answer: 1,
        why: 'One place is the goal. You will use this question in every lesson from here on.'
      }
    ]
  });
})();
