/* Lesson 4: Trade-offs, not laws (module 0). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l04  Trade-offs, not laws
     ===================================================================== */
  const plate = (cx, fill, grains) =>
    `<ellipse cx="${cx}" cy="151" rx="78" ry="50" fill="${P.ink}"/>` +
    `<ellipse cx="${cx}" cy="146" rx="78" ry="50" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<ellipse cx="${cx}" cy="146" rx="54" ry="32" fill="${fill}" stroke="${P.ink}" stroke-width="2.5"/>` + grains;
  const pinch = [[-14, -6], [6, -10], [18, 4], [-4, 8], [-22, 6]].map(p => `<circle cx="${300 + p[0]}" cy="${146 + p[1]}" r="3" fill="${P.white}" stroke="${P.ink}" stroke-width="1.5"/>`).join('');
  const heap = `<path d="M406 160 Q450 92 494 160 Z" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>` +
    [[-20, 0], [0, -22], [20, 0], [-8, -8], [10, -10]].map(p => `<circle cx="${450 + p[0]}" cy="${150 + p[1]}" r="2.5" fill="${P.ink2}"/>`).join('');
  const saltPic = svg(600, 270, 'Three plates: no salt is bland, a pinch of salt is just right, the whole jar of salt ruins the dish',
    T(150, 40, 'NO SALT', { s: 12.5, f: P.warn }) + T(300, 40, 'A PINCH', { s: 12.5, f: P.ok }) + T(450, 40, 'THE WHOLE JAR', { s: 12.5, f: P.danger }) +
    plate(150, P.warnT, '') + plate(300, P.okT, pinch) + plate(450, P.dangerT, heap) +
    T(150, 234, 'bland', { s: 15 }) + T(300, 234, 'just right', { s: 15, f: P.ok }) + T(450, 234, 'ruined', { s: 15, f: P.danger }) +
    T(300, 258, 'Same salt. The amount is what matters.', { s: 12.5, w: 700, f: P.ink2 }));

  const tinyCode = [
    'def finish_sale(total):',
    '    print_paper(total)',
    '    print_paper("Thank you!")'
  ];

  const bigCode = [
    '# shop.py',
    'from greeting import make_greeting',
    'def finish_sale(total):',
    '    print_paper(total)',
    '    print_paper(make_greeting())',
    '',
    '# greeting.py',
    'from settings import GREETING_ENABLED',
    'from helpers import get_text, get_mark',
    'def make_greeting():',
    '    if GREETING_ENABLED:',
    '        return get_text() + get_mark()',
    '    return ""',
    '',
    '# helpers.py',
    'from settings import THANK_YOU_TEXT',
    'from settings import EXCLAMATION_MARK',
    'def get_text():',
    '    return THANK_YOU_TEXT',
    'def get_mark():',
    '    return EXCLAMATION_MARK',
    '',
    '# settings.py',
    'THANK_YOU_TEXT = "Thank you"',
    'EXCLAMATION_MARK = "!"',
    'GREETING_ENABLED = True'
  ];

  const hopPic = `<div style="width:100%">${code(bigCode, { title: 'the same job, in 4 files', hi: [5, 12, 19], good: [24] })}` +
    svg(600, 132, 'To find the message you open shop.py, then greeting.py, then helpers.py, then settings.py',
      ['shop.py', 'greeting.py', 'helpers.py', 'settings.py'].map((n, i) => {
        const x = 14 + i * 148;
        return box(x, 34, 124, 46, i === 3 ? P.okT : P.white, 12) + T(x + 62, 62, n, { s: 12.5, m: true, f: i === 3 ? P.ok : P.ink }) +
          `<circle cx="${x + 62}" cy="30" r="12" fill="${P.dangerT}" stroke="${P.ink}" stroke-width="2.5"/>` + T(x + 62, 35, String(i + 1), { s: 12.5, f: P.danger }) +
          (i < 3 ? arrow(x + 130, 57, x + 144, 57, P.danger, 3) : '');
      }).join('') +
      T(300, 116, '4 files opened to find 2 words', { s: 13, w: 700, f: P.ink2 })) + `</div>`;

  const fixedCode = [
    'TAX_RATE = 0.09        # 3 jobs use it',
    '',
    'def finish_sale(total):',
    '    print_paper(total)',
    '    print_paper("See you soon!")'
  ];

  const dialPic = svg(600, 300, 'A dial with too little structure on the left, too much on the right and just enough in the middle, where the needle rests',
    `<path d="M170 200 A130 130 0 0 1 430 200" fill="none" stroke="${P.ink}" stroke-width="40"/>` +
    `<path d="M170 200 A130 130 0 0 1 235 87.4" fill="none" stroke="${P.danger}" stroke-width="34"/>` +
    `<path d="M235 87.4 A130 130 0 0 1 365 87.4" fill="none" stroke="${P.ok}" stroke-width="34"/>` +
    `<path d="M365 87.4 A130 130 0 0 1 430 200" fill="none" stroke="${P.danger}" stroke-width="34"/>` +
    `<path d="M150 200 H190 M410 200 H450" stroke="${P.ink}" stroke-width="3"/>` +
    `<path d="M300 92 L291 200 H309 Z" fill="${P.ink}"/><circle cx="300" cy="200" r="15" fill="${P.ink}"/><circle cx="300" cy="200" r="5" fill="${P.white}"/>` +
    T(300, 40, 'JUST ENOUGH', { s: 12.5, f: P.ok }) +
    T(120, 236, 'TOO LITTLE', { s: 12.5, f: P.danger }) + T(120, 256, 'the tax, typed', { s: 12.5, w: 700, f: P.ink2 }) + T(120, 273, 'in 3 places', { s: 12.5, w: 700, f: P.ink2 }) +
    T(480, 236, 'TOO MUCH', { s: 12.5, f: P.danger }) + T(480, 256, '4 files to print', { s: 12.5, w: 700, f: P.ink2 }) + T(480, 273, '2 words', { s: 12.5, w: 700, f: P.ink2 }) +
    T(300, 248, 'for the problems', { s: 12.5, w: 700, f: P.ink2 }) + T(300, 265, 'you really have today', { s: 12.5, w: 700, f: P.ink2 }));

  const copiedCode = [
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

  COURSE.add({
    id: 'l04', minutes: 8,
    summary: 'A principle is a tool with a cost, not a rule to obey. Each one fixes one kind of pain and, pushed too far, <b>causes another</b>.',
    video: {
      src: 'videos/l04-trade-offs.mp4', poster: 'videos/l04-trade-offs.jpg', length: '1 min 1 s',
      script: [
        'Maya learned a good trick. Give a value one name, in one place. Now she uses it everywhere.',
        'Here is a tiny job. It prints the total, then Thank you. 3 lines.',
        'Maya gives the words a name. Then the exclamation mark. Then a switch to turn it off. Then a settings file, and a helper for each. 3 lines are now 19, in 4 files.',
        'Then a simple request. Change the message. Where is it? The shop file. Then greeting. Then helpers. Then settings. 4 files, for 2 words.',
        'Same goal. Opposite mistake. Too little structure hurts. Too much hurts too. Aim for just enough.',
        'Before you use any principle, ask 2 questions. Is this problem real right now? What will this cost the next reader?',
        'Principles are trade-offs, not laws.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: saltPic,
        h: 'A pinch, not the jar.',
        text: [
          'Salt makes food better. A pinch makes the dish. The whole jar ruins it.',
          'Principles work the same way. Each one fixes <b>one kind of pain</b>. Pushed too far, it causes <b>another kind</b>.',
          'So a principle is a <b>tool with a cost</b>. It is not a law you must obey everywhere.'
        ],
        tip: 'You have met three ideas so far: easy to change, high cohesion and loose coupling. All three can be overdone. So can every principle that follows.'
      },
      {
        label: 'The code', pic: code(tinyCode, { title: 'shop.py' }),
        h: 'A tiny job.',
        text: [
          'At the end of a sale, the shop prints the total and then a thank-you. <b>Three lines.</b> Anyone can read them in five seconds.',
          'Maya loved lesson 1. Giving the tax one name saved her from a bug. So she makes a new rule for herself: <b>every value gets a name</b>.'
        ]
      },
      {
        label: 'The pain', pic: hopPic,
        h: 'Three lines become 19.',
        text: [
          'Maya names the words. Then the exclamation mark. Then she adds a switch to turn the greeting off. Then a settings file, and a helper for each value.',
          'A line like <code>from settings import THANK_YOU_TEXT</code> means: go and fetch that name from the file <code>settings.py</code>. A line starting with <code>#</code> is a note for people. Here it shows where each file begins.',
          'Then Sam, her new helper, gets a simple request: <b>change the thank-you message</b>. He opens <code>shop.py</code>. The message is not there. He follows the trail through <b>four files</b> to find two words.'
        ],
        warn: 'The receipt prints exactly what it printed before. All that extra code bought nothing today. Same goal as lesson 1, opposite mistake.'
      },
      {
        label: 'The fix', pic: code(fixedCode, { title: 'shop.py, simple again', good: [1, 5] }),
        h: 'Name what earns a name.',
        text: [
          'Maya deletes the extra files and goes back to three lines. Now the request takes <b>one edit</b>, right where anyone would look first.',
          'Why does <code>TAX_RATE</code> keep its name? The tax <b>really changes</b>, and three jobs use it. That problem was real.',
          'The thank-you is used <b>once</b>. Nobody asked for a switch. So it stays as plain words.'
        ],
        tip: 'If the message is ever needed in a second place, give it a name on that day. Waiting for a real need has a name too: lesson 8, YAGNI.'
      },
      {
        label: 'The test', pic: dialPic,
        h: 'Ask two questions.',
        text: [
          'Before you apply any principle, ask:',
          '<b>1. Is this problem real right now, or am I guessing?</b>',
          '<b>2. What will this cost the next person who reads it?</b>',
          'Too little structure hurts. Too much hurts too. Aim for <b>just enough</b> for the problems you really have today.'
        ]
      },
      {
        label: 'When not to', pic: code(copiedCode, { title: 'shop.py from lesson 1: still a mistake', bad: [2, 6, 10] }),
        h: "Don't use this as an excuse.",
        text: [
          'Trade-offs do not mean <b>anything goes</b>. Copying the tax number into three jobs was still a mistake.',
          'Ask the two questions about it. Was the problem real? Yes. The tax changed and a receipt came out wrong. What did the fix cost? One short line at the top.',
          '<b>Real problem, small cost: use the principle.</b> Guessed problem, big cost: wait.'
        ],
        warn: '"It is a trade-off" is where your thinking starts, not where it ends. You still have to weigh both sides.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does "trade-offs, not laws" mean?',
        options: ['Principles are optional, so you can ignore them', 'Every principle helps with one pain and has a cost, so you weigh it each time', 'You must apply every principle everywhere', 'Principles only matter in very big programs'],
        answer: 1,
        why: 'A principle is a tool. You pick it up when the problem is real and the cost is worth it.',
        hint: 'Think of the salt. Zero is wrong, and the whole jar is wrong too.'
      },
      {
        type: 'bucket', q: 'Too little structure, just enough, or too much?',
        buckets: ['Too little', 'Just enough', 'Too much'],
        items: [
          ['The tax typed by hand in three jobs', 0],
          ['One name for the tax, used by three jobs', 1],
          ['A settings file entry for an exclamation mark', 2],
          ['A helper whose only job is to return one setting', 2],
          ['Swapping the printer means touching one place', 1],
          ['Every job talks to the printer in its own way', 0]
        ],
        why: 'Lessons 1 to 3 showed the pain of too little. This lesson shows the pain of too much. The goal sits between them.',
        hint: 'Ask of each one: does it fix a real problem, and what does it cost to read?'
      },
      {
        type: 'pick', q: 'Which of these names costs more than it gives?',
        pic: code([
          'TAX_RATE = 0.09',
          'DELIVERY_FEE = 5',
          'EXCLAMATION_MARK = "!"',
          'SHOP_NAME = "Cookie Corner"'
        ], { title: 'settings.py' }),
        options: ['TAX_RATE', 'DELIVERY_FEE', 'EXCLAMATION_MARK', 'SHOP_NAME'],
        answer: 2,
        why: 'An exclamation mark will never change, and the name is longer than the thing it names. The reader pays and gets nothing back.',
        hint: 'Which value will never change, no matter what happens to the shop?'
      },
      {
        type: 'order', q: 'Sam must change the thank-you message. Starting from <code>finish_sale</code>, put the files in the order he has to open them.',
        pic: code([
          '# settings.py',
          'THANK_YOU_TEXT = "Thank you"',
          '# shop.py',
          '    print_paper(make_greeting())',
          '# helpers.py',
          '    return THANK_YOU_TEXT',
          '# greeting.py',
          '    return get_text() + get_mark()'
        ], { title: 'one key line from each file' }),
        items: ['shop.py', 'greeting.py', 'helpers.py', 'settings.py'],
        why: 'Each file only points at the next one. Four files opened, and the real words were in the last.',
        hint: 'Each line names something. Find the file where that thing is made.'
      },
      {
        type: 'pick', q: 'A friend says: "Principles are only trade-offs, so typing <code>0.08</code> in three places is fine." Is the friend right?',
        pic: code(copiedCode, { title: 'shop.py from lesson 1' }),
        options: ['Yes. Trade-offs mean any choice is fine', 'No. The problem is real and the fix costs one line', 'Yes. Fewer names is always simpler', 'No. Every number must always have a name'],
        answer: 1,
        why: 'The tax really changes, three jobs use it, and it already caused a wrong receipt. A real problem with a tiny fix. That is exactly when to use the principle.',
        hint: 'Ask the two questions. Is the problem real? What does the fix cost?'
      },
      {
        type: 'pick', q: 'The shop has one printer and no plan to change it. Maya wants to add a printer chooser, a printer settings file and a helper for each, "to keep things loosely coupled". What is the best advice?',
        options: ['Do it. More loose coupling is always better', 'Wait. The problem is a guess, and every reader pays for the extra parts', 'Do it, and add a second chooser to be safe', 'Delete the printer code completely'],
        answer: 1,
        why: 'Loose coupling from lesson 3 is a good tool. Here the problem is not real yet, and the cost is paid by everyone who reads the code.',
        hint: 'Question 1: is this problem real right now, or is Maya guessing?'
      },
      {
        type: 'fill', q: 'Finish the two questions to ask before you apply any principle.',
        text: '1. Is this problem ___ right now, or am I ___?\n2. What will this ___ the next person who reads it?',
        options: ['real', 'guessing', 'cost', 'fast', 'clever'],
        answer: ['real', 'guessing', 'cost'],
        why: 'A real problem and a small cost: go ahead. A guess and a big cost: wait.',
        hint: 'The first question is about today. The second is about the price.'
      },
      {
        type: 'type', q: 'After the fix, the owner wants the receipt to say "Come back soon!". How many lines must change? Type the number.',
        pic: code(fixedCode, { title: 'shop.py, simple again' }),
        prompt: 'lines >',
        answers: ['1', 'one'],
        why: 'One line, in the first place anyone would look. Simple code is easy to change too.',
        hint: 'Find the line that prints the message. Is the message anywhere else?'
      }
    ]
  });
})();
