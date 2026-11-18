/* Lesson 9: Rule of three (module 1). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l09  Rule of three
     ===================================================================== */
  const tool = (x, y, w, fill, name) => box(x, y, w, 30, fill, 8) + T(x + w / 2, y + 20, name, { s: 12.5 });

  const cupboardPic = svg(600, 300, 'A cupboard built after buying one tool is too small for the saw that comes next. A cupboard built after three tools fits all of them.',
    T(150, 34, 'BUILT AFTER 1 TOOL', { s: 12.5, f: P.danger }) + T(450, 34, 'BUILT AFTER 3 TOOLS', { s: 12.5, f: P.ok }) +
    `<line x1="300" y1="24" x2="300" y2="280" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    /* left: a cupboard sized for one hammer, and a saw that sticks out */
    box(40, 62, 120, 150, P.dangerT, 12) +
    `<line x1="40" y1="137" x2="160" y2="137" stroke="${P.ink}" stroke-width="2.5"/>` +
    tool(58, 86, 84, P.white, 'hammer') +
    tool(58, 160, 216, P.warnT, 'saw') +
    T(232, 148, 'sticks out', { s: 12.5, f: P.danger }) +
    T(150, 250, 'the size was a guess', { s: 13, w: 700, f: P.ink2 }) + T(150, 268, 'and the guess was wrong', { s: 13, w: 700, f: P.ink2 }) +
    /* right: a cupboard that holds all three */
    box(330, 62, 240, 150, P.okT, 12) +
    `<line x1="330" y1="137" x2="570" y2="137" stroke="${P.ink}" stroke-width="2.5"/>` +
    tool(346, 86, 84, P.white, 'hammer') + tool(446, 86, 108, P.white, 'drill') +
    tool(346, 160, 208, P.white, 'saw') +
    T(450, 250, 'three tools showed', { s: 13, w: 700, f: P.ink2 }) + T(450, 268, 'what it has to hold', { s: 13, w: 700, f: P.ink2 }));

  const twoCode = [
    'def cookie_label(cookie):',
    '    print_paper("Maya\'s Cookies")',
    '    print_paper(cookie.name)',
    '    print_paper(cookie.price)',
    '    print_paper("Best within 5 days")',
    '',
    'def cake_label(cake):',
    '    print_paper("Maya\'s Cookies")',
    '    print_paper(cake.name)',
    '    print_paper(cake.price)',
    '    print_paper("Keep in the fridge")'
  ];
  const mergedCode = [
    'def print_label(item, kind):',
    '    print_paper("Maya\'s Cookies")',
    '    print_paper(item.name)',
    '    print_paper(item.price)',
    '    if kind == "cookie":',
    '        print_paper("Best within 5 days")',
    '    if kind == "cake":',
    '        print_paper("Keep in the fridge")'
  ];
  const codePic = `<div style="width:100%">` +
    code(twoCode, { title: 'labels.py, two look-alikes', hi: [2, 3, 4, 8, 9, 10] }) +
    code(mergedCode, { title: 'labels.py, merged straight away', hi: [1, 5, 7] }) + `</div>`;

  const tangledCode = [
    'def print_label(item, kind, show_price=False):',
    '    print_paper("Maya\'s Cookies")',
    '    print_paper(item.name)',
    '    if show_price:',
    '        print_paper(item.price)',
    '    if kind == "box":',
    '        print_paper("Contains nuts")',
    '    if kind == "cookie":',
    '        print_paper("Best within 5 days")',
    '    if kind == "cake":',
    '        print_paper("Keep in the fridge")',
    '',
    'print_label(choc_chip, "cookie")'
  ];
  const slip = (x, title, rows) => box(x, 40, 190, 118, P.white, 10) +
    T(x + 95, 28, title, { s: 12.5, w: 700, f: P.ink2 }) +
    rows.map((r, i) => r[1]
      ? `<rect x="${x + 22}" y="${52 + i * 26}" width="146" height="20" rx="6" fill="${P.dangerT}" stroke="${P.danger}" stroke-width="2" stroke-dasharray="5 4"/>` + T(x + 95, 67 + i * 26, r[0], { s: 12, f: P.danger })
      : T(x + 95, 67 + i * 26, r[0], { s: i === 0 ? 13 : 12.5, w: i === 0 ? 800 : 700 })).join('');
  const painPic = `<div style="width:100%">${code(tangledCode, { title: 'labels.py, after "making boxes easier"', bad: [1], hi: [4, 5, 13] })}` +
    svg(600, 190, 'Before the change the cookie label showed the price of 3 dollars. After the change for boxes, the cookie label has no price.',
      slip(60, 'cookie label, before', [["Maya's Cookies"], ['Choc chip'], ['$3'], ['Best within 5 days']]) +
      arrow(266, 99, 326, 99, P.danger, 3.5) +
      slip(346, 'cookie label, after', [["Maya's Cookies"], ['Choc chip'], ['no price', true], ['Best within 5 days']]) +
      T(300, 182, 'A change made for boxes. A cookie label that broke.', { s: 13, w: 700, f: P.ink2 })) + `</div>`;

  const fixedCode = [
    'def label_top(item):',
    '    print_paper("Maya\'s Cookies")',
    '    print_paper(item.name)',
    '',
    'def cookie_label(cookie):',
    '    label_top(cookie)',
    '    print_paper(cookie.price)',
    '    print_paper("Best within 5 days")',
    '',
    'def cake_label(cake):',
    '    label_top(cake)',
    '    print_paper(cake.price)',
    '    print_paper("Keep in the fridge")',
    '',
    'def box_label(box):',
    '    label_top(box)',
    '    print_paper("Contains nuts")'
  ];

  const step = (x, n, fill, head, l1, l2) =>
    box(x, 64, 164, 150, fill, 16) +
    `<circle cx="${x + 82}" cy="64" r="20" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` + T(x + 82, 71, n, { s: 18 }) +
    T(x + 82, 116, head, { s: 15 }) + T(x + 82, 150, l1, { s: 12.5, w: 700, f: P.ink2 }) + T(x + 82, 170, l2, { s: 12.5, w: 700, f: P.ink2 });
  const testPic = svg(600, 290, 'The first time, write it. The second time, copy it. The third time, pull out the part that is truly the same.',
    T(300, 26, 'How many times have I seen it?', { s: 14 }) +
    step(24, '1', P.white, 'Write it', 'just make', 'it work') +
    arrow(194, 139, 212, 139, P.ink, 3) +
    step(218, '2', P.warnT, 'Copy it', 'wince,', 'and copy it anyway') +
    arrow(388, 139, 406, 139, P.ink, 3) +
    step(412, '3', P.okT, 'Pull out', 'only the part that', 'is truly the same') +
    T(300, 252, 'Three real examples show you the shape.', { s: 13, w: 700, f: P.ink2 }) +
    T(300, 272, 'Two only let you guess it.', { s: 13, w: 700, f: P.ink2 }));

  const row = (x, y, s, fill) => box(x, y, 252, 34, fill, 10) + T(x + 126, y + 22, s, { s: 12.5 });
  const limitPic = svg(600, 320, 'Copies of the same rule or fact must be merged at once, even when there are only two. Things that only look alike can wait for more examples.',
    T(150, 34, 'MERGE AT ONCE', { s: 12.5, f: P.ok }) + T(450, 34, 'WAIT AND WATCH', { s: 12.5, f: P.warn }) +
    `<line x1="300" y1="24" x2="300" y2="300" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    row(24, 56, 'the delivery fee, typed twice', P.okT) +
    row(24, 104, 'how a total is worked out', P.okT) +
    row(24, 152, 'the price of a cookie', P.okT) +
    T(150, 226, 'one rule or one fact:', { s: 13, w: 700, f: P.ink2 }) +
    T(150, 246, 'the copies must never disagree', { s: 13, w: 700, f: P.ink2 }) +
    T(150, 276, 'two copies is already too many', { s: 13, f: P.ok }) +
    row(324, 56, 'two labels with similar lines', P.warnT) +
    row(324, 104, 'two emails that start the same', P.warnT) +
    row(324, 152, 'two screens that look alike', P.warnT) +
    T(450, 226, 'maybe the same thing,', { s: 13, w: 700, f: P.ink2 }) +
    T(450, 246, 'maybe only a look-alike', { s: 13, w: 700, f: P.ink2 }) +
    T(450, 276, 'a third example will tell you', { s: 13, f: P.warn }));

  const emailCode = [
    'def order_email(order):',
    '    send("Hello from Maya\'s Cookies")',
    '    send("Your total is", order.total)',
    '',
    'def welcome_email(customer):',
    '    send("Hello from Maya\'s Cookies")',
    '    send("Welcome,", customer.name)',
    '',
    'def refund_email(order):',
    '    send("Hello from Maya\'s Cookies")',
    '    send("We refunded", order.total)'
  ];
  const lookalikeCode = [
    'def big_order_discount(price):',
    '    return price * 0.10',
    '',
    'def suggested_tip(price):',
    '    return price * 0.10'
  ];

  COURSE.add({
    id: 'l09', minutes: 8,
    summary: 'Do not merge look-alike code the moment you see it twice. The <b>rule of three</b> says: write it, copy it, and only on the third time pull out what is <b>truly shared</b>.',
    video: {
      src: 'videos/l09-rule-of-three.mp4', poster: 'videos/l09-rule-of-three.jpg', length: '1 min 4 s',
      script: [
        'Maya prints a label for every bag of cookies. One small function does it.',
        'Then she starts selling cakes. The cake label is nearly the same.',
        "Lesson 6 said, don't repeat yourself. So Maya merges the two into one function, straight away.",
        'Then gift boxes arrive. A box label has no price, and it needs a nut warning. It does not fit.',
        'So Maya patches it. An extra option here. An extra question there. The function swells.',
        'Later, she flips that option to make boxes easier. Now cookie labels print with no price.',
        'Rewind. This time, Maya waits. 3 labels, side by side. Now she can see what is truly the same. Only the top.',
        'So she pulls out just that part. Everything else stays separate.',
        'That is the rule of three. The first time, write it. The second time, copy it. The third time, pull out what is truly shared.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: cupboardPic,
        h: 'Do not build the cupboard yet.',
        text: [
          'You take up a hobby and buy a hammer. You do not build a cupboard for your tools that day. You have one tool, so any size you pick is a <b>guess</b>. The saw you buy next will not fit.',
          'After three tools you can see what the cupboard really has to hold. Now it is worth building.',
          'Code works the same way. The <b>rule of three</b> says: the first time you need something, just write it. The second time, wince and <b>copy it anyway</b>. The third time, you have enough examples to see what is really shared. Now pull that part into one shared piece.'
        ],
        tip: 'Lesson 6, DRY, ended with a promise: knowing when to wait has its own lesson. This is it. DRY is the accelerator. The rule of three is the brake.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'Two look-alikes, merged at once.',
        text: [
          'Maya has a job that prints the label for a bag of cookies. <code>cookie.name</code> means the name of this cookie, just like <code>card.points</code> in lesson 2. Then she starts selling cakes and writes <code>cake_label</code>. Look at the highlighted lines. Three of the four lines in each job are <b>nearly the same</b>.',
          'Maya has just finished lesson 6. "Repeated code!" she thinks, and merges the two <b>straight away</b> into one job, <code>print_label</code>.',
          'The new job is given the item and a word saying what <code>kind</code> of item it is. Lines 5 and 7 ask which kind, and print the right last line. 11 lines became 8. It looks tidy.',
          'But Maya has only seen <b>two</b> labels. Her merged job is a guess about every label still to come: a shop name, a name, a price, then one last line.'
        ]
      },
      {
        label: 'The pain', pic: painPic,
        h: 'The third one does not fit.',
        text: [
          'Then Maya starts selling <b>gift boxes</b>. A box label needs a "Contains nuts" warning. It must <b>not</b> show a price, because it is a gift. The guess was wrong.',
          'Maya patches the job. She adds a question for boxes on line 6. She adds an option, <code>show_price=True</code>. You met this in lesson 8: if nobody says, the answer is <code>True</code>, which means yes. Boxes are printed with <code>print_label(box, "box", False)</code>. <code>False</code> means no. Read that call again. What does the <code>False</code> switch off? You cannot tell without opening the job.',
          'Weeks later there are three sizes of gift box, and Maya is tired of typing <code>False</code> every time. So she flips line 1 to <code>show_price=False</code>. Boxes are easy now.',
          'But look at line 13. Cookie labels never said anything about the price. They trusted the old answer. Now every cookie label and every cake label prints with <b>no price</b>.'
        ],
        warn: 'Nothing crashed. A change made for boxes broke cookies, because one job was serving three things that are less alike than Maya guessed. Programmers call this a <b>hasty abstraction</b>. In plain words: one shared piece of code, built before you understood what was shared.'
      },
      {
        label: 'The fix', pic: code(fixedCode, { title: 'labels.py, after waiting for three', good: [1, 2, 3], hi: [6, 11, 16] }),
        h: 'Wait for three, then look.',
        text: [
          'Rewind. This time Maya writes <code>cookie_label</code>. When cakes arrive she winces and <b>copies it</b>. When gift boxes arrive she writes a third job. Now three real labels sit side by side, and she can compare them line by line.',
          'The shop name and the item name are in <b>all three</b>. The price is in only two. The last line is different every time. So the truly shared part is small: <b>the top two lines</b>.',
          'Maya pulls out only that, into <code>label_top</code>. Each label calls it, as you saw with <code>final_total</code> in lesson 6, and then adds its own lines in plain sight.',
          'Now a change for boxes is made inside <code>box_label</code>. Cookie labels cannot break, because they do not share that code. And if the shop gets a new name, Maya changes <b>line 2</b> and all three labels follow.'
        ],
        tip: 'The two copies were not wasted work. They were the evidence. Merging two copies later takes a few minutes. Pulling apart a wrong merge means untangling every <code>if</code> and checking everything that calls it.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Count, then look.',
        text: [
          'Before you merge look-alike code, ask: <b>"Have I seen this three times, and do I know which part is truly the same?"</b>',
          'Both halves matter. The count gives you enough examples. The second half makes you <b>look at them</b>. Maya\'s three labels shared two lines, not four.',
          'A warning sign that a merge came too early: the shared job keeps growing questions like <code>if kind == ...</code> and options like <code>show_price</code>. Each one is a place where the things it serves are <b>not</b> the same.'
        ]
      },
      {
        label: 'When not to', pic: limitPic,
        h: 'Three is a rule of thumb, not a count to obey.',
        text: [
          'Picture Maya obeying the count. The delivery fee, <code>5</code>, is typed in two jobs. "Only twice," she says. "The rule of three tells me to wait." Then the fee goes up to 6. She changes one job and misses the other. The cart shows one fee and the email shows another.',
          'That is the bug from lesson 1 all over again. The fee is one <b>fact</b>. How a total is worked out is one <b>rule</b>. Copies of the same rule or fact must <b>never disagree</b>, so give them one home at once, as in lesson 6, DRY, and lesson 7, Single source of truth. Two copies is already one too many.',
          'So when do you wait? Only when you are <b>not sure</b> whether two things are the same or just look alike. Ask the question from lesson 6: if one changed, would the other have to change too? "Yes" means merge now. "I do not know yet" means wait and watch.',
          'And three is not magic. Sometimes the third example still does not show the shape. Then wait for a fourth.'
        ],
        warn: 'The number is not the point. Understanding is. Merge when you know what is shared, and not before.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does the rule of three tell you to do?',
        options: ['Never have more than three functions in a file', 'Write it, copy it, and on the third time pull out what is truly shared', 'Merge look-alike code the moment you see it twice', 'Copy every piece of code three times, to be safe'],
        answer: 1,
        why: 'Two examples only let you guess what is shared. Three let you see it.',
        hint: 'Think of the cupboard. When was it worth building?'
      },
      {
        type: 'type', q: 'Line 1 now says <code>show_price=False</code>. Line 13 runs. How many lines does the cookie label print? Type the number.',
        pic: code(tangledCode, { title: 'labels.py' }),
        prompt: 'lines >',
        answers: ['3', 'three'],
        why: 'The shop name, the cookie name, and "Best within 5 days". Line 13 does not say anything about the price, so <code>show_price</code> is <code>False</code> and line 5 is skipped. The price is gone.',
        hint: 'Walk down the job. Which questions get the answer yes for a cookie?'
      },
      {
        type: 'pick', q: 'Maya now has three emails. Which part is truly the same in all three?',
        pic: code(emailCode, { title: 'emails.py' }),
        options: ['The greeting line', 'The line about the total', 'The whole email', 'Nothing at all'],
        answer: 0,
        why: 'Lines 2, 6 and 10 are the same in every email. The total is only in two of them, and each says something different about it. Pull out the greeting and leave the rest.',
        hint: 'Compare the three jobs line by line. Which line appears in every one?'
      },
      {
        type: 'fill', q: 'Finish the fix. Each label uses the shared top and then adds its own lines.',
        text: 'def cookie_label(cookie):\n    ___(cookie)\n    print_paper(cookie.price)\n    print_paper("Best within 5 days")\n\ndef box_label(box):\n    label_top(box)\n    print_paper("___")',
        options: ['label_top', 'Contains nuts', 'print_label', 'Keep in the fridge'],
        answer: ['label_top', 'Contains nuts'],
        why: '<code>label_top</code> holds the two lines every label shares. The nut warning belongs to the box alone, so it stays in <code>box_label</code>.',
        hint: 'The first blank is the name of the small shared job. The second is the line only a gift box needs.'
      },
      {
        type: 'order', q: "Put Maya's first try in order.",
        items: ['Maya writes a job for cookie labels', 'Cake labels look nearly the same, so she merges the two at once', 'Gift boxes arrive and do not fit the merged job', 'The job grows an extra question and an extra option', 'A change for boxes removes the price from cookie labels'],
        why: 'The trap was set at the merge. It only showed when the third kind of label arrived.',
        hint: 'The merge comes before the gift boxes. That was the problem.'
      },
      {
        type: 'bucket', q: 'You have seen each of these only twice. Merge at once, or wait?',
        buckets: ['Same rule or fact: merge now', 'Might only look alike: wait'],
        items: [
          ['The tax rate, typed in two jobs', 0],
          ['How a total is worked out, in two jobs', 0],
          ['The price of a cookie, stored in two files', 0],
          ['Two labels with a few similar lines', 1],
          ['Two emails that start with the same greeting', 1],
          ['Two screens that look alike today', 1]
        ],
        why: 'The left side is lessons 1, 6 and 7: one fact or one rule, and its copies must never disagree. The right side might be the same thing or might not. A third example will tell you.',
        hint: 'Ask: if one changed, would the other have to change too?'
      },
      {
        type: 'pick', q: 'Back to lesson 6. These two jobs look the same. A third 10% job appears next week. What should Maya do?',
        pic: code(lookalikeCode, { title: 'tips_and_discounts.py' }),
        options: ['Merge all three, because now she has seen it three times', 'Keep them apart, because they are different rules that share a number today', 'Merge the first two now and add the third later', 'Delete the tip job'],
        answer: 1,
        why: 'The count is only half the test. The other half is "do I know which part is truly the same?". A discount and a tip change for different reasons, so nothing here is truly shared, however many times 10% shows up.',
        hint: 'Read the second half of this lesson\'s test again.'
      },
      {
        type: 'pick', q: 'Which of these are signs that code was merged too early? Pick all that apply.',
        options: ['The shared job keeps gaining <code>if kind == ...</code> questions', 'A call like <code>print_label(box, "box", False)</code> that you cannot read without opening the job', 'A change for one kind breaks another kind', 'The shared job is only three lines long'],
        answer: [0, 1, 2],
        why: 'Every extra question and option marks a place where the things are not the same. A small shared job like <code>label_top</code> is a good sign, not a bad one.',
        hint: 'Three of these happened to Maya\'s merged job.'
      }
    ]
  });
})();
