/* Lesson 17: Small functions (module 2). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l17  Small functions
     ===================================================================== */

  // code() numbers its lines from 1. This shifts the numbers so an excerpt keeps its real line numbers.
  const startAt = (html, first) => html.replace(/<i>(\d+)<\/i>/g, (m, n) => '<i>' + (+n + first - 1) + '</i>');

  /* close_shop() is 42 lines long. These are its first 22. */
  const longJob = [
    'def close_shop():',
    '    # count the till',
    '    expected = 0',
    '    for amount in sales:',
    '        expected = expected + amount',
    '    in_drawer = count_drawer()',
    '    difference = in_drawer - expected',
    '    print_paper("Sales", expected)',
    '    print_paper("In drawer", in_drawer)',
    '    print_paper("Difference", difference)',
    '    save_till_count(in_drawer)',
    '',
    '    # find the unsold cookies',
    '    unsold = []',
    '    for cookie in baked_today:',
    '        if cookie.on_shelf:',
    '            unsold.append(cookie)',
    '    print_paper("Unsold", len(unsold))',
    '',
    '    # mark them half price for tomorrow',
    '    for cookie in unsold:',
    '        cookie.price = cookie.price - 0.5'
  ];

  const afterCode = [
    'def close_shop():',
    '    count_till()',
    '    unsold = find_unsold()',
    '    mark_down(unsold)',
    '    back_up_sales()',
    '    lock_up()',
    '',
    'def mark_down(unsold):',
    '    for cookie in unsold:',
    '        cookie.price = cookie.price * 0.5'
  ];

  // The five chunks of the long job: [short label, first line, last line, fill]
  const chunks = [
    ['count the till', 2, 11, P.warnT],
    ['find the unsold', 13, 18, P.okT],
    ['mark half price', 20, 22, P.dangerT],
    ['back up the sales', 24, 33, P.tint],
    ['lock up', 35, 42, P.sand]
  ];

  const ideaPic = svg(600, 290, 'A recipe as one unbroken paragraph, next to the same recipe as a short list of four steps',
    T(150, 34, 'ONE UNBROKEN PARAGRAPH', { s: 12.5, f: P.danger }) + T(450, 34, 'A SHORT LIST OF STEPS', { s: 12.5, f: P.ok }) +
    box(40, 54, 220, 180, P.white, 14) +
    Array.from({ length: 11 }, (v, i) => `<rect x="58" y="${72 + i * 14}" width="${i === 10 ? 110 : 184}" height="6" rx="3" fill="${P.mute}"/>`).join('') +
    T(150, 262, 'where is the baking time?', { s: 13, w: 700, f: P.ink2 }) +
    `<line x1="300" y1="24" x2="300" y2="272" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    box(340, 54, 220, 180, P.okT, 14) +
    [['1', 'Make the dough', 'p. 12'], ['2', 'Make the filling', 'p. 14'], ['3', 'Assemble', ''], ['4', 'Bake', '']].map((r, i) => {
      const y = 86 + i * 40;
      return `<circle cx="366" cy="${y - 5}" r="12" fill="${P.ok}"/>` + T(366, y, r[0], { s: 13, f: P.white }) +
        T(388, y, r[1], { s: 14, a: 'start' }) + (r[2] ? T(546, y, r[2], { s: 12.5, w: 700, f: P.ink2, a: 'end' }) : '');
    }).join('') +
    T(450, 262, 'the whole plan in 4 lines', { s: 13, w: 700, f: P.ink2 }));

  const mapPic = (() => {
    const unit = 12.2;
    let x = 44, out = T(300, 22, 'All 42 lines of close_shop: five chunks, each under a comment', { s: 12.5, f: P.ink2 });
    chunks.forEach((c, i) => {
      const w = (c[2] - c[1] + 1) * unit, mid = x + w / 2, up = i % 2 === 0;
      out += box(x, 66, w, 40, c[3], 8) +
        T(mid, up ? 46 : 134, c[0], { s: 12.5 }) +
        T(mid, up ? 60 : 148, 'lines ' + c[1] + '-' + c[2], { s: 11.5, w: 700, f: P.ink2 });
      x += w + 9;
    });
    return svg(600, 160, 'A map of the 42 lines of close_shop: count the till on lines 2 to 11, find the unsold cookies on lines 13 to 18, mark them half price on lines 20 to 22, back up the sales on lines 24 to 33, lock up on lines 35 to 42', out);
  })();

  const codePic = `<div style="width:100%">${code(longJob.slice(0, 11), { title: 'closing.py, lines 1 to 11 of 42', hi: [2] })}${mapPic}</div>`;

  const painPic = `<div style="width:100%">${startAt(code(longJob.slice(12), { title: 'closing.py, lines 13 to 22 of 42', hi: [1, 8], bad: [10] }), 13)}` +
    svg(600, 150, 'The tag should say 1 dollar 50 but it says 2 dollars 50',
      box(40, 26, 200, 70, P.okT, 14) + T(140, 70, '$1.50', { s: 26, m: true, f: P.ok }) + T(140, 114, 'half of $3.00', { s: 12.5, w: 700, f: P.ink2 }) +
      `<circle cx="300" cy="61" r="26" fill="${P.dangerT}" stroke="${P.ink}" stroke-width="2.5"/>` + T(300, 72, '≠', { s: 30, f: P.danger }) +
      box(360, 26, 200, 70, P.white, 14) + T(460, 70, '$2.50', { s: 26, m: true, f: P.danger }) + T(460, 114, 'what the tag says', { s: 12.5, w: 700, f: P.ink2 }) +
      T(300, 142, 'Maya read 22 lines to find 1 wrong character.', { s: 13, f: P.danger })) + `</div>`;

  const namePic = svg(600, 250, 'Each comment becomes the name of a small function',
    T(150, 26, 'THE COMMENT SAID', { s: 12.5, f: P.ink2 }) + T(450, 26, 'THE NAME SAYS', { s: 12.5, f: P.ok }) +
    [['# count the till', 'count_till'], ['# find the unsold cookies', 'find_unsold'], ['# mark them half price', 'mark_down'], ['# back up the sales', 'back_up_sales'], ['# lock up', 'lock_up']].map((r, i) => {
      const y = 44 + i * 40;
      return box(30, y, 240, 30, P.white, 8) + T(150, y + 20, r[0], { s: 12.5, m: true, f: P.ink2 }) +
        arrow(280, y + 15, 322, y + 15, P.ok, 3) +
        box(332, y, 238, 30, P.okT, 8) + T(451, y + 20, r[1], { s: 13, m: true, f: P.ok });
    }).join(''));

  const fixPic = `<div style="width:100%">${code(afterCode, { title: 'closing.py, after extracting', good: [2, 3, 4, 5, 6, 10] })}${namePic}</div>`;

  const testPic = svg(600, 300, 'The old close_shop needs the word and four times and does not fit on the screen. mark_down needs no and, and is three lines.',
    T(150, 30, 'THE OLD close_shop', { s: 12.5, f: P.danger }) + T(450, 30, 'mark_down', { s: 12.5, f: P.ok }) +
    box(30, 46, 240, 150, P.dangerT, 14) +
    ['counts the till', 'finds the unsold cookies', 'marks them half price', 'backs up the sales', 'locks up'].map((s, i) =>
      T(60, 74 + i * 27, s, { s: 13, w: 700, a: 'start' }) + (i ? T(56, 74 + i * 27 - 13, 'and', { s: 11.5, f: P.danger, a: 'end' }) : '')).join('') +
    T(150, 224, '"and" 4 times', { s: 14, f: P.danger }) + T(150, 246, '42 lines: you have to scroll', { s: 13, w: 700, f: P.ink2 }) + T(150, 280, 'no, and no', { s: 14, f: P.danger }) +
    `<line x1="300" y1="20" x2="300" y2="286" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    box(330, 46, 240, 150, P.okT, 14) +
    T(450, 112, 'marks unsold cookies', { s: 14 }) + T(450, 134, 'half price', { s: 14 }) +
    T(450, 224, 'no "and"', { s: 14, f: P.ok }) + T(450, 246, '3 lines: all in view', { s: 13, w: 700, f: P.ink2 }) + T(450, 280, 'yes, and yes', { s: 14, f: P.ok }));

  const choppedCode = [
    'def mark_down(unsold):',
    '    for cookie in unsold:',
    '        do_step_2(cookie)',
    '',
    'def do_step_2(cookie):',
    '    cookie.price = helper(cookie.price)',
    '',
    'def helper(price):',
    '    return half(price)',
    '',
    'def half(price):',
    '    return price * 0.5'
  ];
  const hopPic = svg(600, 110, 'Four functions opened to find one number',
    ['mark_down', 'do_step_2', 'helper', 'half'].map((s, i) => {
      const x = 22 + i * 144;
      return box(x, 22, 122, 44, i === 3 ? P.dangerT : P.white, 10) + T(x + 61, 50, s, { s: 12.5, m: true }) + (i < 3 ? arrow(x + 126, 44, x + 142, 44, P.danger, 3) : '');
    }).join('') +
    T(300, 98, '4 functions opened to find one number, 0.5', { s: 13, f: P.danger }));
  const overPic = `<div style="width:100%">${code(choppedCode, { title: 'closing.py, chopped too small', bad: [5, 8] })}${hopPic}</div>`;

  COURSE.add({
    id: 'l17', minutes: 8,
    summary: 'A function should do <b>one thing</b>, and be short enough to see whole and to name honestly. When a job grows into a long scroll, cut it into <b>small functions</b> with clear names.',
    video: {
      src: 'videos/l17-small-functions.mp4', poster: 'videos/l17-small-functions.jpg', length: '1 min 10 s',
      script: [
        "Every evening, Maya's cookie shop runs one job. It is called close shop.",
        'It started small. Now it is 42 lines long. Count the till. Find the unsold cookies. Mark them half price. Back up the sales. Lock up. All in one long scroll.',
        'Then a customer complains. Day-old cookies should be half price. $1.50. The tag says $2.50.',
        'Where is the mistake? Maya starts at the top and reads. Line after line. Sum after sum. 22 lines down, she finds it. One wrong character.',
        'She fixes it. Then she fixes the real problem. Each chunk is cut out into its own small function, and named after its comment.',
        'Now close shop is just 5 steps. It reads like a list.',
        'Next time something breaks, Maya reads 5 names, opens one, and sees the whole thing at once.',
        'That is the idea of small functions. Each function does one thing, and is small enough to see whole.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'A recipe you can read at a glance.',
        text: [
          'Picture a recipe written as <b>one unbroken paragraph</b>. Dough, filling and oven all run together. To find the baking time, you start reading at the first word.',
          'Now picture the same recipe as a short list: make the dough (page 12), make the filling (page 14), assemble, bake. You see the whole plan in four lines. You turn to page 14 only if the filling is what you care about.',
          'A function is a named job, as in lesson 1. A <b>small function</b> does <b>one thing</b>. It is short enough to <b>see whole</b> and to <b>name honestly</b>. A big job then becomes a short list of small ones.'
        ],
        tip: 'Lesson 16, Single responsibility, asked <b>who</b> can ask for a change. This lesson is about <b>size</b>. Even when one person owns every line, a job can be too long to read.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'One job, 42 lines.',
        text: [
          'Every evening the shop runs <code>close_shop</code>. On day one it only locked the door. Then Maya added one more thing each month, always at the bottom. Today it is <b>42 lines</b> long.',
          'The picture shows the first 11. A line starting with <code>#</code> is a note for people, as in lesson 4. The note on line 2 says what the lines under it are for. Lines 3 to 5 add up today\'s sales with a loop, as in lesson 10. Line 6 counts the money in the drawer. Line 7 works out the difference.',
          'The map under the code shows the rest. There are <b>five</b> of these notes. Each one starts a new chunk, like a paragraph, with a blank line before it. Count the till. Find the unsold cookies. Mark them half price. Back up the sales. Lock up.',
          'No line here is hard. But you cannot see the job <b>whole</b>. You can only scroll through it.'
        ]
      },
      {
        label: 'The pain', pic: painPic,
        h: 'One wrong character, 22 lines down.',
        text: [
          'Day-old cookies are sold at half price. A fresh cookie costs $3, so the tag should say <b>$1.50</b>. A customer points at the tag. It says <b>$2.50</b>.',
          'Somewhere in <code>close_shop</code> a sum is wrong. Nothing in a long scroll says "the half price part starts here". So Maya starts at line 1 and reads down. She checks the sum on line 5. Fine. The sum on line 7. Fine. All the way she carries <code>expected</code>, <code>in_drawer</code> and <code>difference</code> in her head, because any line below might use them.',
          'Then the second chunk. Lines 14 to 17 build the list of unsold cookies. <code>cookie.on_shelf</code> is a yes or a no: is this cookie still on the shelf?',
          'On <b>line 22</b> she finds it. The line takes 0.5 <b>off</b> the price. It should <b>multiply</b> the price by 0.5. A minus sign sits where a <code>*</code> should be. $3 minus 0.5 is $2.50. $3 times 0.5 is $1.50.'
        ],
        warn: 'Nothing crashed. And the bug was never hard to <b>understand</b>. It was hard to <b>find</b>. Maya read 22 lines to reach the 3 that mattered.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Cut out a chunk. Give it a name.',
        text: [
          'Maya fixes line 22. Then she fixes the real problem, with a move called <b>extract</b>. Cut one chunk out of the long job. Make it a function of its own. Give it the name its comment was trying to be.',
          '<code># mark them half price for tomorrow</code> becomes <code>mark_down</code>. Where the chunk used to be, <code>close_shop</code> now calls it, as you saw with <code>final_total</code> in lesson 6. The other four chunks are cut out the same way.',
          'One detail. <code>find_unsold</code> hands back its list with <code>return</code>, and line 3 keeps it as <code>unsold</code>. Line 4 hands that list to <code>mark_down</code>. Each small job is <b>given</b> what it needs. It cannot use, or spoil, the values of the other chunks.',
          'Now <code>close_shop</code> is its name and <b>five steps</b>. It reads like the recipe list. The comments are gone, because the names say the same thing. And the next bug hunt is short: read five names, open one small function, and see all of it at once.'
        ],
        tip: 'You just read <code>close_shop</code> without opening any of the five small jobs, and you still understood it. Trusting a good name and skipping the details has a name: lesson 18, Abstraction.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Two quick questions.',
        text: [
          'Point at a function and ask: <b>"Can I say what it does without the word \'and\'?"</b> Then ask: <b>"Can I see all of it at once?"</b>',
          'Try the old <code>close_shop</code>. It counts the till <b>and</b> finds the unsold cookies <b>and</b> marks them half price <b>and</b> backs up the sales <b>and</b> locks up. And you have to scroll. No, and no.',
          'Try <code>mark_down</code>. It marks unsold cookies half price. Three lines. Yes, and yes.',
          'What about the new <code>close_shop</code>? It runs the closing steps, in order. That is one thing too. It stays at the level of <b>big steps</b> and leaves the small details to the jobs it calls.'
        ],
        tip: 'Other signs that a function does too much: chunks split by blank lines, a comment like <code># now work out the discount</code> above each chunk, and a name you cannot choose. You met the "and" question in lesson 2, High cohesion. There it was asked about a whole file.'
      },
      {
        label: 'When not to', pic: overPic,
        h: 'Small is not the goal. Clear is.',
        text: [
          '<b>Do not chop what is already clear.</b> Suppose Maya loves this lesson and cuts <code>mark_down</code>, three lines, into four functions. To find the <code>0.5</code> you now hop from <code>mark_down</code> to <code>do_step_2</code> to <code>helper</code> to <code>half</code>. That is lesson 4 again: 4 files for 2 words.',
          '<b>A function is not too long because of a number.</b> There is no magic line count. A job of 12 lines that does one thing and fits on the screen is fine.',
          '<b>Extract when a chunk has an honest name of its own.</b> Stop when the pieces stop having one. If the best name you can find is <code>do_step_2</code> or <code>helper</code>, the chunk is not a real step. Lesson 12, Meaningful names, showed what names like that cost the reader.'
        ],
        warn: 'Every small function is one more place to jump to. The jump is worth it when the name tells you so much that you <b>do not need to make it</b>.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'Which of these are signs that a function does more than one thing? Pick all that apply.',
        options: ['You need the word "and" to say what it does', 'It has chunks with a comment above each one', 'You have to scroll to read it', 'It has a clear name of two words'],
        answer: [0, 1, 2],
        why: 'The word "and", comment headers and scrolling all point the same way. A clear, short name is a good sign, not a bad one.',
        hint: 'Three of these describe the old <code>close_shop</code>.'
      },
      {
        type: 'type', q: 'This is the chunk with the bug. A slice of cake costs <b>$4</b> and is left unsold. What price does this code put on its tag? Type the number.',
        pic: code([
          '# mark them half price for tomorrow',
          'for item in unsold:',
          '    item.price = item.price - 0.5'
        ], { title: 'closing.py', bad: [3] }),
        prompt: 'price >', answers: ['3.5', '3.50'],
        why: '4 minus 0.5 is 3.50. Half price would be $2. The line takes 0.5 off when it should multiply by 0.5.',
        hint: 'Do exactly what line 3 says: take 0.5 away from 4.'
      },
      {
        type: 'pick', q: 'Maya extracts lines 2 to 5 into a function of their own. Which name should it get?',
        pic: code([
          'def send_order(order):',
          '    # work out the delivery fee',
          '    fee = 5',
          '    if order.total >= 30:',
          '        fee = 0',
          '',
          '    # print the address label',
          '    print_paper(order.name)',
          '    print_paper(order.street)'
        ], { title: 'orders.py', hi: [2, 3, 4, 5] }),
        options: ['delivery_fee', 'do_step_1', 'helper', 'process_data'],
        answer: 0,
        why: 'The comment already says what the chunk is for. The name takes over that job, and the comment can go.',
        hint: 'Read the comment on line 2. The name should say the same thing.'
      },
      {
        type: 'fill', q: 'Finish <code>close_shop</code> after the five chunks are cut out.',
        text: 'def close_shop():\n    count_till()\n    unsold = ___()\n    ___(unsold)\n    back_up_sales()\n    ___()',
        options: ['find_unsold', 'mark_down', 'lock_up', 'close_shop', 'helper'],
        answer: ['find_unsold', 'mark_down', 'lock_up'],
        why: 'First find the unsold cookies, then mark that list down. Locking up comes last.',
        hint: 'The order is the same as in the long version: find, mark down, back up, lock up.'
      },
      {
        type: 'pick', q: 'A new bug: one morning the door was found unlocked. Maya reads the five steps. Which function does she open?',
        pic: code(afterCode.slice(0, 6), { title: 'closing.py' }),
        options: ['count_till', 'mark_down', 'back_up_sales', 'lock_up'],
        answer: 3,
        why: 'She reads five names and opens one small function. The other four stay closed.',
        hint: 'Which name is about the door?'
      },
      {
        type: 'order', q: 'Put the steps of an extract in order.',
        items: ['Spot a chunk with a comment above it', 'Cut the chunk out into a new function', 'Name the function after what the comment says', 'Call the new function where the chunk used to be', 'Delete the comment, because the name now says it'],
        why: 'The comment was a name waiting to happen. After the extract, the name does its job.',
        hint: 'You cannot name or call a function before it exists.'
      },
      {
        type: 'bucket', q: 'Extract a small function, or leave it alone?',
        buckets: ['Extract', 'Leave it alone'],
        items: [
          ['A 42-line job with five commented chunks', 0],
          ['A chunk under the note "now work out the discount"', 0],
          ['A job you can only describe with "and" three times', 0],
          ['A clear 6-line job that does one thing', 1],
          ['A chunk whose best name would be do_step_2', 1],
          ['One line that is already easy to read', 1]
        ],
        why: 'Extract when a chunk has an honest name of its own. Stop when the pieces stop having one.'
      },
      {
        type: 'pick', q: 'Back to lesson 12, Meaningful names. Maya cuts a long job into three functions and calls them <code>part_1</code>, <code>part_2</code> and <code>part_3</code>. The top function is now short. Is it better?',
        pic: code([
          'def close_shop():',
          '    part_1()',
          '    part_2()',
          '    part_3()'
        ], { title: 'closing.py' }),
        options: ['Yes. Shorter is always better', 'No. The names say nothing, so you must open every one', 'Yes. The numbers show the order', 'No. A function should never call another function'],
        answer: 1,
        why: 'A small function only helps when its name tells you what is inside. <code>part_2</code> needs a decoder, so the reader still has to read everything.',
        hint: 'Could you find the half price sum from these three names?'
      }
    ]
  });
})();
