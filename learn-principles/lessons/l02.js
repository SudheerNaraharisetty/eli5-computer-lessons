/* Lesson 2: High cohesion (module 0). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l02  High cohesion
     ===================================================================== */
  const chip = (x, y, w, s, fill) => box(x, y, w, 32, fill || P.white, 10) + T(x + w / 2, y + 21, s, { s: 13 });

  const kitchenPic = svg(600, 300, 'Baking things kept on one shelf, next to the same things spread over four rooms of a house',
    T(150, 34, 'ONE SHELF', { s: 12.5, f: P.ok }) + T(450, 34, 'ALL OVER THE HOUSE', { s: 12.5, f: P.danger }) +
    box(40, 56, 220, 170, P.okT, 18) + T(150, 84, 'baking shelf', { s: 12.5, w: 700, f: P.ink2 }) +
    chip(60, 100, 84, 'flour') + chip(156, 100, 84, 'sugar') + chip(60, 156, 84, 'whisk') + chip(156, 156, 84, 'tray') +
    T(150, 262, 'everything in one trip', { s: 13, w: 700, f: P.ink2 }) +
    `<line x1="300" y1="24" x2="300" y2="280" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    [['bedroom', 'flour'], ['garage', 'sugar'], ['bathroom', 'whisk'], ['attic', 'tray']].map((r, i) => {
      const x = 330 + (i % 2) * 126, y = 56 + Math.floor(i / 2) * 90;
      return box(x, y, 114, 76, P.dangerT, 14) + T(x + 57, y + 22, r[0], { s: 12.5, w: 700, f: P.ink2 }) + chip(x + 15, y + 32, 84, r[1]);
    }).join('') +
    T(450, 262, 'every batch starts with a hunt', { s: 13, w: 700, f: P.ink2 }));

  const shopCode = [
    'COOKIE_PRICE = 3',
    '',
    'def print_header():',
    '    print_paper("Maya\'s Cookies")',
    '',
    'def earn_points(card):',
    '    card.points = card.points + 1',
    '',
    'CAKE_PRICE = 20',
    '',
    'def print_total(total):',
    '    print_paper("Total", total)',
    '',
    'def free_cookie(card):',
    '    return card.points >= 10'
  ];
  const brokenCode = shopCode.slice();
  brokenCode[5] = 'def earn_points(card, price):';
  brokenCode[6] = '    card.points = card.points + price';

  const topics = [['menu', P.warnT], ['receipt', P.tint], ['points', P.okT]];
  const mapPic = svg(600, 132, 'A map of shop.py. The topics take turns: menu, receipt, points, menu, receipt, points.',
    T(300, 24, 'What each part of shop.py is about', { s: 13 }) +
    [[0, 'line 1'], [1, 'lines 3-4'], [2, 'lines 6-7'], [0, 'line 9'], [1, 'lines 11-12'], [2, 'lines 14-15']].map((b, i) => {
      const x = 21 + i * 94;
      return box(x, 44, 84, 44, topics[b[0]][1], 12) + T(x + 42, 71, topics[b[0]][0], { s: 13.5 }) + T(x + 42, 116, b[1], { s: 12, w: 700, f: P.ink2 });
    }).join(''));
  const codePic = `<div style="width:100%">${code(shopCode, { title: 'shop.py', hi: [6, 7, 14, 15] })}${mapPic}</div>`;

  const cookie = (x, y) => `<circle cx="${x}" cy="${y}" r="15" fill="#E2AD6B" stroke="${P.ink}" stroke-width="2.5"/><circle cx="${x - 5}" cy="${y - 4}" r="2.5" fill="#5A3418"/><circle cx="${x + 5}" cy="${y + 2}" r="2.5" fill="#5A3418"/><circle cx="${x - 2}" cy="${y + 7}" r="2" fill="#5A3418"/>`;
  const painPic = `<div style="width:100%">${code(brokenCode, { title: 'shop.py, after the points change', good: [6, 7], bad: [15] })}` +
    svg(600, 150, 'Four cookies cost 12 dollars and earn 12 points. The old rule still says 10 points, so the customer wins a free cookie far too early.',
      box(24, 22, 250, 84, P.white, 14) + [0, 1, 2, 3].map(i => cookie(62 + i * 40, 54)).join('') + T(149, 92, '4 cookies = $12 = 12 points', { s: 13 }) +
      arrow(286, 64, 352, 64, P.danger, 3.5) +
      box(364, 22, 212, 84, P.dangerT, 14) + T(470, 58, 'FREE COOKIE', { s: 17, f: P.danger }) + T(470, 82, 'line 15 still says 10', { s: 12.5, w: 700, f: P.ink2 }) +
      T(300, 138, 'It should take 10 cookies, not 4.', { s: 13, w: 700, f: P.ink2 })) + `</div>`;

  const fixPic = `<div style="width:100%">` +
    code(['COOKIE_PRICE = 3', 'CAKE_PRICE = 20'], { title: 'menu.py' }) +
    code(['def print_header():', '    print_paper("Maya\'s Cookies")', '', 'def print_total(total):', '    print_paper("Total", total)'], { title: 'receipt.py' }) +
    code(['def earn_points(card, price):', '    card.points = card.points + price', '', 'def free_cookie(card):', '    return card.points >= 30'], { title: 'points.py', good: [2, 5] }) + `</div>`;

  const testPic = svg(600, 290, 'A file about one topic has high cohesion. A file about three topics joined by the word and has low cohesion.',
    T(150, 34, 'HIGH COHESION', { s: 12.5, f: P.ok }) + T(450, 34, 'LOW COHESION', { s: 12.5, f: P.danger }) +
    box(60, 54, 180, 46, P.white, 12) + T(150, 83, 'points.py', { s: 15, m: true }) +
    T(150, 132, 'What is it about?', { s: 12.5, w: 700, f: P.ink2 }) +
    box(40, 148, 220, 62, P.okT, 14) + T(150, 185, '"loyalty points"', { s: 15, f: P.ok }) +
    T(150, 250, 'one topic, one place to look', { s: 13, w: 700, f: P.ink2 }) +
    `<line x1="300" y1="24" x2="300" y2="270" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    box(360, 54, 180, 46, P.white, 12) + T(450, 83, 'shop.py', { s: 15, m: true }) +
    T(450, 132, 'What is it about?', { s: 12.5, w: 700, f: P.ink2 }) +
    box(326, 148, 248, 62, P.dangerT, 14) + T(450, 175, '"prices AND receipts', { s: 14, f: P.danger }) + T(450, 196, 'AND points"', { s: 14, f: P.danger }) +
    T(450, 250, 'every "and" is another topic', { s: 13, w: 700, f: P.ink2 }));

  const tag = (x, y, t) => `<rect x="${x}" y="${y}" width="66" height="22" rx="11" fill="${topics[t][1]}" stroke="${P.ink}" stroke-width="2"/>` + T(x + 33, y + 15.5, topics[t][0], { s: 12 });
  const overPic = svg(600, 310, 'Two ways to get it wrong: six tiny files for two topics, and one constants file that mixes three topics.',
    T(150, 34, 'SPLIT TOO SMALL', { s: 12.5, f: P.danger }) + T(450, 34, 'GROUPED BY KIND', { s: 12.5, f: P.danger }) +
    ['earn_points.py', 'free_cookie.py', 'print_header.py', 'print_total.py', 'cookie_price.py', 'cake_price.py'].map((f, i) => {
      const x = 16 + (i % 2) * 138, y = 58 + Math.floor(i / 2) * 58;
      return box(x, y, 128, 40, P.white, 10) + T(x + 64, y + 25, f, { s: 12, m: true });
    }).join('') +
    T(150, 258, 'one topic is spread over files,', { s: 13, w: 700, f: P.ink2 }) + T(150, 276, 'so you are hunting again', { s: 13, w: 700, f: P.ink2 }) +
    `<line x1="300" y1="24" x2="300" y2="290" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    box(322, 58, 256, 164, P.white, 14) + T(450, 84, 'constants.py', { s: 14, m: true }) +
    [['COOKIE_PRICE = 3', 0], ['SHOP_NAME = "Maya\'s"', 1], ['FREE_COOKIE_AT = 30', 2]].map((r, i) =>
      T(338, 120 + i * 36, r[0], { s: 12, m: true, a: 'start' }) + tag(500, 104 + i * 36, r[1])).join('') +
    T(450, 258, 'all numbers and names,', { s: 13, w: 700, f: P.ink2 }) + T(450, 276, 'but three different topics', { s: 13, w: 700, f: P.ink2 }));

  COURSE.add({
    id: 'l02', minutes: 8,
    summary: 'Code about one topic should sit in one place. That is <b>high cohesion</b>: things that change together live together.',
    video: {
      src: 'videos/l02-high-cohesion.mp4', poster: 'videos/l02-high-cohesion.jpg', length: '1 min 5 s',
      script: [
        "Maya's cookie shop is growing. And so is her code.",
        'Her file now covers three topics. The menu. The receipt. And loyalty points. But look. They are all mixed together.',
        'Then the loyalty card changes. Points will count dollars, not cookies. So a free cookie should need 30 points, not 10.',
        'Maya hunts through the file and fixes how points are earned. But the free cookie rule is hiding far below. She misses it.',
        'Now 4 cookies win a free one. Nothing crashed. The shop just quietly gives cookies away.',
        'The fix. Move the code so each topic lives together. Menu with menu. Receipt with receipt. Points with points.',
        'Now both points rules sit side by side. Maya spots the old 10 at once, and fixes it.',
        'Next time points change, she opens one small file.',
        'That is high cohesion. Things that change together live together.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: kitchenPic,
        h: 'Keep the baking things together.',
        text: [
          'Picture a house where the flour is in the bedroom, the sugar is in the garage and the tray is in the attic. Every batch of cookies starts with a hunt. A good kitchen keeps all the baking things on <b>one shelf</b>.',
          'Code works the same way. <b>Cohesion</b> means how strongly the things inside one unit belong together. A unit can be a function or a file.',
          '<b>High cohesion</b> means everything in the unit is about one topic. Low cohesion means the unit is a mix of topics.'
        ],
        tip: 'The short version: things that <b>change together</b> should <b>live together</b>.'
      },
      {
        label: 'The code', pic: codePic,
        h: "Maya's file has grown.",
        text: [
          'Maya added each new thing at the bottom of <code>shop.py</code>, on the day she needed it. The file now covers three topics: the <b>menu</b>, the <b>receipt</b> and <b>loyalty points</b>.',
          'Two new bits of Python. <code>card.points</code> means the points saved on a customer\'s loyalty card. <code>return</code> hands back an answer. On line 15 the answer is yes or no: does this card have at least 10 points? (<code>&gt;=</code> means "at least".)',
          'Now look at the map under the code. The topics <b>take turns</b>. The two jobs about points are lines 6 and 14, with other topics in between.'
        ]
      },
      {
        label: 'The pain', pic: painPic,
        h: 'One topic, two far-apart edits.',
        text: [
          'Maya starts selling $20 cakes. A cake should earn more points than a $3 cookie. So the loyalty card changes. Old rule: 1 point per item, free cookie at 10 points. New rule: <b>1 point per dollar</b>, free cookie at <b>30 points</b>.',
          'That is one topic but two edits. Maya scrolls down, reading receipt code on the way, and fixes <code>earn_points</code>. The free cookie rule is 8 lines lower, behind more code about other things. She misses it.',
          'Now 4 cookies cost $12, earn 12 points and win a free cookie. It should take <b>10 cookies</b>.'
        ],
        warn: 'Nothing crashed. The shop just quietly gives cookies away. Notice this is not a copied number like lesson 1. It is two different lines about the same topic, kept far apart.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Move it, do not rewrite it.',
        text: [
          'No new code is written. The same lines are <b>moved</b> so each topic gets its own small file: <code>menu.py</code>, <code>receipt.py</code> and <code>points.py</code>.',
          'Now both points rules sit <b>side by side</b>. When Maya changes line 2 of <code>points.py</code>, the old <code>10</code> is right under her eyes. She fixes it to <code>30</code>.',
          'Next time the points rules change, she opens one small file and everything she needs is there.'
        ],
        tip: 'The other files can still use these jobs. How files talk to each other is the next lesson, Loose coupling.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Ask what the file is about.',
        text: [
          'Point at a file or a function and ask: <b>"What is this about?"</b> If the honest answer is one topic, cohesion is high.',
          'If the answer needs the word <b>"and"</b> again and again, like "prices and receipts and points", cohesion is low.',
          'Then use the question from lesson 1: if one topic changes, how many places must I look? With high cohesion the answer is <b>one</b>.'
        ]
      },
      {
        label: 'When not to', pic: overPic,
        h: 'Group by topic, and stop there.',
        text: [
          'Do not split so finely that every tiny function gets its own file. Then one topic is spread over many files and you are <b>hunting again</b>.',
          'Do not group by <b>kind of code</b> either. A file called <code>constants.py</code> that holds every number in the shop looks tidy. But a price and a points rule never change for the same reason. That is fake cohesion.'
        ],
        warn: 'The question is never "what kind of code is this?". It is "what changes together?".'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does "high cohesion" mean?',
        options: ['The file is as short as possible', 'Everything in one file or function is about the same topic', 'Every function has its own file', 'All the numbers are kept in one file'],
        answer: 1,
        why: 'Cohesion is about belonging together. Size is not the point.',
        hint: 'Think of the baking shelf.'
      },
      {
        type: 'bucket', q: 'Sort each line into the file where it belongs.',
        buckets: ['menu.py', 'receipt.py', 'points.py'],
        items: [
          ['CAKE_PRICE = 20', 0],
          ['COOKIE_PRICE = 3', 0],
          ['print_paper("Thank you!")', 1],
          ['print_paper("Total", total)', 1],
          ['card.points = card.points + price', 2],
          ['return card.points >= 30', 2]
        ],
        why: 'Each file is now about one topic. A change to that topic has one place to go.'
      },
      {
        type: 'pick', q: 'This file is called <code>receipt.py</code>. Which job does not belong here?',
        pic: code([
          'def print_header():',
          '    print_paper("Maya\'s Cookies")',
          '',
          'def print_total(total):',
          '    print_paper("Total", total)',
          '',
          'def free_cookie(card):',
          '    return card.points >= 30',
          '',
          'def print_footer():',
          '    print_paper("Thank you!")'
        ], { title: 'receipt.py' }),
        options: ['print_header', 'print_total', 'free_cookie', 'print_footer'],
        answer: 2,
        why: '<code>free_cookie</code> is a loyalty points rule. Nobody would look for it in a file about receipts.',
        hint: 'Three of these jobs print something on paper.'
      },
      {
        type: 'match', q: 'A change request arrives. Match each one to the file Maya should open.',
        pairs: [
          ['menu.py', 'Cakes now cost $22'],
          ['receipt.py', 'Add the shop phone number under the total'],
          ['points.py', 'A free cookie now needs 40 points']
        ],
        why: 'With one topic per file, the request itself tells you which file to open.'
      },
      {
        type: 'fill', q: 'Finish <code>points.py</code> for the new rule: 1 point per dollar, free cookie at 30 points.',
        text: 'def earn_points(card, price):\n    card.points = card.points + ___\n\ndef free_cookie(card):\n    return card.points >= ___',
        options: ['price', '30', '1', '10'],
        answer: ['price', '30'],
        why: 'Both rules sit together, so it is easy to change them together.',
        hint: 'The first blank is not a number. The second blank is the new number of points for a free cookie.'
      },
      {
        type: 'pick', q: 'Back to lesson 1. This file has high cohesion: it is all about points. The free cookie moves from 30 points to 40. How many lines must change?',
        pic: code([
          'def free_cookie(card):',
          '    return card.points >= 30',
          '',
          'def points_to_go(card):',
          '    return 30 - card.points'
        ], { title: 'points.py' }),
        options: ['0', '1', '2', '5'],
        answer: 2,
        why: 'The <code>30</code> is typed twice, on lines 2 and 5. Cohesion put them close together. Lesson 1 finishes the job: give the number one name, like <code>FREE_COOKIE_AT = 30</code>.',
        hint: 'Count every line where <code>30</code> appears.'
      },
      {
        type: 'pick', q: 'Which of these are signs of low cohesion? Pick all that apply.',
        options: ['You need "and" three times to say what the file is about', 'One small change makes you scroll past lots of code about other things', 'The file has only 5 lines', 'Every line in the file is about receipts'],
        answer: [0, 1],
        why: 'Many topics in one place, and one topic in many places. Both mean hunting.',
        hint: 'Two of these describe a file that mixes topics.'
      },
      {
        type: 'pick', q: 'Maya moves every number in the shop into one file called <code>constants.py</code>. Is that high cohesion?',
        options: ['Yes, because all the numbers are together', 'No, because the numbers are about different topics', 'Yes, because the file is short', 'No, because numbers should not have names'],
        answer: 1,
        why: 'Grouping by kind of code is fake cohesion. A price and a points rule do not change together, so they should not live together.',
        hint: 'Ask what changes together, not what looks alike.'
      }
    ]
  });
})();
