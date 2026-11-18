/* Lesson 36: Immutability (module 4). One file per lesson. */
(function () {
  const { P, code, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l36  Immutability
     ===================================================================== */
  const ideaPic = svg(600, 262, 'A whiteboard that anyone can wipe and rewrite, next to a printed receipt that never changes',
    T(150, 30, 'MUTABLE: CAN BE CHANGED', { s: 12.5, f: P.danger }) + T(450, 30, 'IMMUTABLE: NEVER CHANGES', { s: 12.5, f: P.ok }) +
    box(40, 50, 220, 130, P.white, 10) +
    T(150, 78, "Today's specials", { s: 13 }) +
    T(150, 110, 'choc chip  $3', { s: 14, m: true, f: P.mute }) +
    `<line x1="88" y1="105" x2="212" y2="105" stroke="${P.danger}" stroke-width="3" stroke-linecap="round"/>` +
    T(150, 150, 'choc chip  $1 ?!', { s: 15, m: true, f: P.danger }) +
    T(150, 218, 'anyone walking past can rub it out', { s: 13, w: 700, f: P.ink2 }) +
    T(150, 238, 'to trust it, you must keep watching it', { s: 13, w: 700, f: P.ink2 }) +
    `<line x1="300" y1="20" x2="300" y2="250" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    box(365, 50, 170, 130, P.white, 6) +
    T(450, 76, 'RECEIPT', { s: 11.5, f: P.mute }) +
    T(450, 102, '2 cookies   $6', { s: 12.5, m: true }) +
    T(450, 122, '1 cake     $20', { s: 12.5, m: true }) +
    `<line x1="385" y1="134" x2="515" y2="134" stroke="${P.ink}" stroke-width="2" stroke-dasharray="3 4"/>` +
    T(450, 160, 'TOTAL $26', { s: 16, m: true }) +
    `<circle cx="535" cy="50" r="17" fill="${P.ok}" stroke="${P.ink}" stroke-width="2.5"/><path d="M527 51 l6 6 l11 -13" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>` +
    T(450, 218, 'printed once, never rewritten', { s: 13, w: 700, f: P.ink2 }) +
    T(450, 238, 'a correction is a new slip', { s: 13, w: 700, f: P.ink2 }));

  const shopCode = [
    'def checkout(order):',
    '    suggest_extra(order)',
    '    send_to_kitchen(order)',
    '    print_receipt(order)',
    '',
    "# Sam's new job",
    'def suggest_extra(order):',
    '    preview = order',
    '    preview.append("brownie")',
    '    show_offer(preview)',
    '',
    'order = ["cookie", "cookie", "cake"]',
    'checkout(order)'
  ];

  const chips = ['cookie', 'cookie', 'cake', 'brownie'].map((s, i) => {
    const x = 258 + i * 77, hot = i === 3;
    return `<rect x="${x}" y="108" width="71" height="38" rx="8" fill="${hot ? P.dangerT : P.paper2}" stroke="${hot ? P.danger : P.ink}" stroke-width="2.5"/>` + T(x + 35.5, 132, s, { s: 12, m: true, f: hot ? P.danger : P.ink });
  }).join('');
  const namesPic = svg(600, 240, 'Two name tags, order and preview, both tied to one list. A brownie added through preview is in the list that order sees.',
    T(300, 28, 'Two names, one list', { s: 16 }) +
    box(30, 62, 130, 44, P.tint, 22) + T(95, 90, 'order', { s: 15, m: true, f: P.accent }) +
    box(30, 150, 130, 44, P.warnT, 22) + T(95, 178, 'preview', { s: 15, m: true, f: P.warn }) +
    T(410, 74, 'the one and only list', { s: 12.5, w: 700, f: P.ink2 }) +
    box(250, 86, 320, 82, '#15132B', 14) + chips +
    arrow(166, 86, 246, 114, P.accent, 3) + arrow(166, 170, 246, 142, P.warn, 3) +
    T(527, 196, 'added through preview', { s: 12.5, f: P.danger, a: 'end' }) +
    arrow(540, 200, 540, 152, P.danger, 2.5) +
    T(300, 228, 'order shows 4 items too, because order is the same list', { s: 13, w: 700, f: P.ink2 }));

  const codePic = `<div style="width:100%">${code(shopCode, { title: 'shop.py', hi: [8, 9] })}${namesPic}</div>`;

  const painPic = svg(600, 318, 'One order with a brownie on it is read by the offer screen, the kitchen and the receipt. The customer said no, the kitchen bakes a brownie, and the receipt says 28 dollars.',
    box(210, 16, 180, 128, P.white, 10) +
    T(300, 40, 'THE ORDER', { s: 11.5, f: P.mute }) +
    T(300, 62, 'cookie', { s: 13.5, m: true }) + T(300, 82, 'cookie', { s: 13.5, m: true }) + T(300, 102, 'cake', { s: 13.5, m: true }) +
    `<rect x="250" y="110" width="100" height="24" rx="7" fill="${P.dangerT}" stroke="${P.danger}" stroke-width="2"/>` + T(300, 127, 'brownie', { s: 13.5, m: true, f: P.danger }) +
    arrow(246, 150, 110, 186, P.ink, 2.5) + arrow(300, 150, 300, 186, P.ink, 2.5) + arrow(354, 150, 490, 186, P.ink, 2.5) +
    box(20, 192, 170, 92, '#15132B', 14) + T(105, 226, 'Add a brownie?', { s: 13.5, f: '#ECEAFF' }) + T(105, 256, 'She taps: No thanks', { s: 12.5, w: 700, f: '#C9C6FF' }) +
    box(215, 192, 170, 92, P.warnT, 14) + T(300, 218, 'KITCHEN', { s: 11.5, f: P.warn }) + T(300, 242, 'bakes 1 brownie', { s: 13.5 }) + T(300, 264, 'nobody chose it', { s: 12.5, w: 700, f: P.danger }) +
    box(410, 192, 170, 92, P.white, 14) + T(495, 218, 'RECEIPT, 4 items', { s: 11.5, f: P.mute }) + T(495, 246, 'TOTAL $28', { s: 17, m: true, f: P.danger }) + T(495, 268, 'should be $26', { s: 12.5, w: 700, f: P.ink2 }) +
    T(105, 308, "Sam's offer", { s: 12.5, w: 700, f: P.ink2 }) + T(300, 308, 'kitchen: code not touched', { s: 12.5, w: 700, f: P.ink2 }) + T(495, 308, 'receipt: code not touched', { s: 12.5, w: 700, f: P.ink2 }));

  const fixedCode = [
    'def checkout(order):',
    '    suggest_extra(order)',
    '    send_to_kitchen(order)',
    '    print_receipt(order)',
    '',
    "# Sam's job, fixed",
    'def suggest_extra(order):',
    '    preview = order + ("brownie",)',
    '    show_offer(preview)',
    '',
    'order = ("cookie", "cookie", "cake")',
    'checkout(order)'
  ];
  const fixPic = `<div style="width:100%">${term([
    '# Step 1. The order is sealed. Sam runs his old job once:',
    '$ python shop.py',
    '  File "shop.py", line 9, in suggest_extra',
    '    preview.append("brownie")',
    "AttributeError: 'tuple' object has no attribute 'append'"
  ], 'the end of the error message')}<div style="height:14px"></div>${code(fixedCode, { title: 'shop.py, step 2: build a new one', good: [8, 11] })}</div>`;

  const testPic = svg(600, 278, 'A sales book where sale 41 is never edited and a refund is added as a new record, 42, that points at sale 41',
    T(300, 28, 'The sales book only grows', { s: 16 }) +
    box(40, 50, 520, 58, P.white, 12) +
    `<circle cx="74" cy="79" r="18" fill="${P.tint}" stroke="${P.ink}" stroke-width="2.5"/>` + T(74, 84, '41', { s: 13, f: P.accent }) +
    T(106, 84, 'Mon', { s: 13.5, a: 'start' }) + T(160, 84, 'sale', { s: 13.5, a: 'start' }) + T(404, 84, '$26.00', { s: 14.5, m: true, a: 'end' }) +
    `<rect x="424" y="66" width="120" height="26" rx="13" fill="${P.sand}"/>` + T(484, 84, 'never edited', { s: 12, f: P.ink2 }) +
    arrow(300, 146, 300, 118, P.ok, 3) + T(314, 136, 'points at sale 41', { s: 12.5, w: 700, f: P.ok, a: 'start' }) +
    box(40, 150, 520, 58, P.okT, 12) +
    `<circle cx="74" cy="179" r="18" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` + T(74, 184, '42', { s: 13, f: P.ok }) +
    T(106, 184, 'Tue', { s: 13.5, a: 'start' }) + T(160, 184, 'refund, for sale 41', { s: 13.5, a: 'start' }) + T(404, 184, '-$20.00', { s: 14.5, m: true, a: 'end' }) +
    `<rect x="424" y="166" width="120" height="26" rx="13" fill="${P.ok}"/>` + T(484, 184, 'new record', { s: 12, f: P.white }) +
    T(300, 240, 'Money kept: $26 - $20 = $6. Monday still says $26.', { s: 13.5, w: 700, f: P.ink2 }) +
    T(300, 264, 'Wrong way: open record 41 and change $26 to $6.', { s: 13, f: P.danger }));

  const buildCode = [
    'def take_order():',
    '    items = []                 # private',
    '    for item in scan_items():',
    '        items.append(item)     # fine to change here',
    '    return tuple(items)        # frozen, then shared'
  ];

  COURSE.add({
    id: 'l36', minutes: 9,
    summary: 'Data that can be changed after it is made can be changed by anyone who holds it. <b>Immutable</b> data never changes once it is made: to get a different value, you make a new one and leave the original alone. Then you can hand it to anyone and trust it.',
    video: {
      src: 'videos/l36-immutability.mp4', poster: 'videos/l36-immutability.jpg', length: '1 min 5 s',
      script: [
        "Maya's shop takes an order. Cookie, cookie, cake. 26 dollars.",
        "That one list is handed to three jobs. The kitchen. The receipt. And Sam's new job, which offers the customer an extra.",
        'Sam wants a copy to play with. So he writes, preview equals order. But that copies nothing. It is a second name for the same list.',
        'He adds a brownie to his preview. The customer says, no thanks. Too late. The brownie is on the real order. The kitchen bakes it. The receipt says 28 dollars. Nothing crashed.',
        "So Maya makes the order a tuple. Like a list, but sealed. It can never be changed. Now Sam's line fails at once, with a loud error.",
        'To try a brownie, he builds a new one. Order, plus brownie. A fresh copy for Sam. The original stays untouched.',
        'That is immutability. Data that never changes after it is made. Change things privately. Share things frozen.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'A whiteboard, or a printed receipt?',
        text: [
          "Maya writes today's specials on a whiteboard by the door. Anyone walking past can rub out a price and write another. To trust what it says, she would have to watch it all day.",
          'A printed receipt is different. Once it is printed, it says what it says. If something on it was wrong, the shop prints a new slip. Nobody rubs out the old one.',
          'Data in a program comes in the same two kinds. <b>Mutable</b> means it can be changed after it is made. <b>Immutable</b> means that once it is made, it never changes. To get a different value, you make a <b>new one</b> and leave the original alone.',
          'Why care? When several parts of a program hold the same piece of mutable data, any one of them can change it under the feet of the others. If it cannot change, you can hand it to anyone, at any time, and know it is still what it was.'
        ],
        tip: 'Module 3 was about how the parts of a program connect. Module 4, Code that survives, is about code that stays correct when the world around it is rough: shared data, repeated calls, bad input. It starts with data that nobody can spoil.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'Two names, one list.',
        text: [
          'Line 12 makes an order. Square brackets make a <b>list</b>, as in lesson 7. Line 13 hands it to <code>checkout</code>, and <code>checkout</code> hands it on to three jobs: a new offer job, the kitchen and the receipt.',
          'Sam, the helper, wrote the offer job. It asks the customer "Add a brownie for $2?" and shows what the bag would hold. Sam does not want to touch the real order. So on line 8 he makes what he believes is a copy, called <code>preview</code>. On line 9 he adds the brownie to it. You met <code>.append</code> in lesson 3.',
          'Here is the most surprising fact in this lesson. <code>preview = order</code> does <b>not copy</b> the list. It gives the <b>same list a second name</b>. Look at the picture under the code: two name tags tied to one box.',
          'Handing a list to a job does not copy it either. The job gets the very same list. So the <code>order</code> on line 12, the <code>order</code> inside every job and Sam\'s <code>preview</code> are all names for <b>one list</b>. A Python list is mutable, and every job that is handed it can change it.'
        ],
        tip: 'A name in Python is like a name tag on a string. <code>=</code> ties a tag to a thing. It never makes a second thing.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'A brownie nobody chose.',
        text: [
          'A customer orders two cookies and a cake. $3 + $3 + $20 is <b>$26</b>. Tax is left out to keep the sums easy. The offer pops up: add a brownie for $2? She taps <b>No thanks</b>.',
          'But line 9 has already run. The brownie is in the one and only list. Line 3 sends that list to the kitchen, and the baker makes a brownie nobody chose. Line 4 prints a receipt with four items and a total of <b>$28</b>.',
          'Nothing crashed. The kitchen code and the receipt code are correct, and nobody touched them. The mistake is in a job about offers. The symptom is on a receipt. Maya starts by reading the receipt code, and finds nothing wrong there.',
          'It did not have to be <code>.append</code>. <code>.remove</code>, from lesson 10, takes an item out of the same shared list. <code>order.sort()</code> puts the same shared list into alphabetical order, in place. Any job that is handed the list can do any of these.'
        ],
        warn: 'Programmers call this <b>action at a distance</b>: a change made in one place shows up somewhere far away. To trust a shared list, you would have to read every job that was ever handed it.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Seal it. Then build new ones.',
        text: [
          '<b>Step 1: seal it.</b> Maya swaps the square brackets for round ones. <code>("cookie", "cookie", "cake")</code> is a <b>tuple</b>. A tuple is like a list that is sealed the moment it is made. It is immutable. You can read it, count it with <code>len</code> and loop over it. You cannot add to it, remove from it or rearrange it.',
          'Now Sam\'s old line 9 cannot work, because a tuple has no <code>.append</code>. The first time Sam runs his job, Python stops with an <code>AttributeError</code>, the error from lesson 25. The top picture shows it. That is lesson 22, Fail fast: the mistake is caught on the spot, in Sam\'s own job, before the kitchen or the receipt ever sees it.',
          '<b>Step 2: build a new one.</b> In the fixed code, line 8 says <code>order + ("brownie",)</code>. In lesson 18, <code>+</code> joined two pieces of text. Here it joins two tuples into a <b>new</b> tuple: everything in the order, then a brownie. The original is not touched.',
          'The odd comma matters. Round brackets around one thing are just brackets, as in a sum. The comma is what tells Python "this is a tuple with one item".',
          'Run the same order again. Sam\'s <code>preview</code> holds four items. <code>order</code> still holds three. The kitchen bakes two cookies and a cake. The receipt says <b>$26</b>.'
        ],
        tip: 'You have used immutable things since lesson 1. Numbers and text in Python can never be changed in place. <code>name.lower()</code> from lesson 25 hands back new text and leaves the old text alone. Sorting comes as the same kind of pair: <code>order.sort()</code> rearranges a list in place, and <code>sorted(order)</code> hands back a new sorted list and leaves the original alone.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Can it change behind my back?',
        text: [
          'Point at a piece of data that more than one part of the program holds, and ask: <b>"After I hand this to someone else, can it change without me knowing?"</b>',
          'Try the list. Yes. Any job that was handed it can add, remove or reorder. Try the tuple. No. What the kitchen was given is what the kitchen has.',
          'For one kind of data the answer must always be no: <b>records of things that already happened</b>. Lesson 7, Single source of truth, said Monday\'s receipt must keep Monday\'s price. A sale is a fact about the past.',
          'Suppose the customer brings the $20 cake back on Tuesday. Do not open Monday\'s record and change $26 to $6. Add a <b>new record</b>: a refund of $20 that points at sale 41. The book now tells the whole story, and Monday\'s numbers still add up.'
        ],
        tip: 'A sale has several named facts: a day, a list of items, a total. Python can also make simple unchangeable bundles of named values, called frozen dataclasses. The idea is the same as a tuple: once made, never changed.'
      },
      {
        label: 'When not to', pic: code(buildCode, { title: 'orders.py', good: [5] }),
        h: 'Change privately. Share frozen.',
        text: [
          '<b>Building in private is fine.</b> Suppose Maya loves this lesson and bans <code>.append</code> everywhere. Look at <code>take_order</code>. Here <code>scan_items()</code> hands over what the customer put on the counter, and the loop from lesson 10 goes through it. While the order is being taken, <code>items</code> lives inside this one job. Nobody else holds it yet, so there is nobody to surprise. Making a whole new tuple for every item would protect nothing. So the job appends freely and freezes the result on its last line. <code>tuple(items)</code> makes a tuple with the same things in it.',
          '<b>Some things are meant to change.</b> The cookie count from lesson 20 goes down all day. The points on a loyalty card go up and down. That is fine when <b>one owner</b> controls the change behind doors that check, as in lesson 19, Encapsulation. The trouble in this lesson was never change. It was change by anyone, to something shared.',
          '<b>A new copy costs time and memory.</b> Copying three items to add a brownie costs nothing you could notice. Copying a list of a million sales each time one more is added, inside a loop, is another matter. If it feels slow, measure first, as lesson 10, Premature optimisation, said. Then let that one slow spot use a list that a single job owns.'
        ],
        warn: 'One honest limit: a tuple seals only its own slots. If you put a list inside a tuple, that inner list can still be changed. Freeze the things inside as well.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does line 4 print?',
        pic: code([
          'a = ["cookie", "cake"]',
          'b = a',
          'b.append("pie")',
          'print(len(a))'
        ], { title: 'try.py' }),
        options: ['2', '3', '0', 'It stops with an error'],
        answer: 1,
        why: '<code>b = a</code> does not copy. <code>a</code> and <code>b</code> are two names for one list. The pie added through <code>b</code> is in the list that <code>a</code> names, so its length is 3.',
        hint: 'How many lists were made in this program? Count the square brackets.'
      },
      {
        type: 'pick', q: 'Which line stops this program with an error?',
        pic: code([
          'order = ("cookie", "cake")',
          'count = len(order)',
          'bigger = order + ("pie",)',
          'order.append("pie")',
          'print(bigger)'
        ], { title: 'try.py' }),
        options: ['Line 2', 'Line 3', 'Line 4', 'None of them'],
        answer: 2,
        why: 'Round brackets make a tuple. Counting it is fine. Line 3 builds a new tuple and leaves <code>order</code> alone. Line 4 tries to change the tuple itself, and a tuple has no <code>.append</code>.',
        hint: 'Reading a tuple and building a new one are both allowed. Which line tries to change the original?'
      },
      {
        type: 'bucket', q: '<code>xs</code> is a list. Does each line change that list, or make a new one?',
        buckets: ['Changes the list itself', 'Makes a new one, original untouched'],
        items: [
          ['xs.append(4)', 0],
          ['xs.sort()', 0],
          ['xs.remove(4)', 0],
          ['sorted(xs)', 1],
          ['xs + [4]', 1]
        ],
        why: 'The three with a dot after <code>xs</code> reach in and change the list in place. <code>sorted(xs)</code> and <code>xs + [4]</code> hand back a new list and leave <code>xs</code> exactly as it was.'
      },
      {
        type: 'fill', q: 'Sam writes a job that shows the order with gift wrap added. Finish it so the real order is never changed.',
        text: 'def with_wrap(order):\n    wrapped = order ___ ("gift wrap"___)\n    return ___',
        options: ['+', ',', 'wrapped', '.append', 'order'],
        answer: ['+', ',', 'wrapped'],
        why: '<code>+</code> builds a new tuple. The comma makes <code>("gift wrap",)</code> a tuple with one item. The job hands back the new one, and <code>order</code> stays as it was.',
        hint: 'A tuple has no .append. And round brackets around one thing need something extra to become a tuple.'
      },
      {
        type: 'pick', q: 'Why was the brownie bug so hard to find? Pick all that apply.',
        options: ['Nothing crashed', 'The kitchen code and the receipt code were correct and untouched', 'The wrong receipt showed up far from the line that caused it', 'The receipt code added the prices wrongly'],
        answer: [0, 1, 2],
        why: 'The receipt added four prices correctly. It was handed a list that another job had quietly changed. With shared mutable data, the place where a bug shows is not the place where it was made.',
        hint: 'Three of these are true. The receipt did its sums correctly.'
      },
      {
        type: 'pick', q: 'Lesson 7, Single source of truth, said Monday\'s receipt must keep Monday\'s price. On Tuesday a customer returns the $20 cake from sale 41. What should the program do?',
        options: ['Change the total of sale 41 from $26 to $6', 'Delete sale 41 and write a new sale for $6', 'Add a new refund record for $20 that points at sale 41', 'Lower the price of a cake in menu.py'],
        answer: 2,
        why: 'A sale is a fact about the past, so its record never changes. The refund is a new fact with its own record. Together they say what really happened: $26 came in on Monday, and $20 went back on Tuesday.',
        hint: 'What happened on Monday still happened. Which answer leaves Monday alone?'
      },
      {
        type: 'bucket', q: 'Freeze it before sharing, or let it change behind doors with one owner?',
        buckets: ['Freeze it', 'One owner, behind doors'],
        items: [
          ['A finished order sent to the kitchen and the receipt', 0],
          ["Monday's sales records", 0],
          ['A printed receipt', 0],
          ['The points on a loyalty card', 1],
          ['The number of cookies left in the jar', 1]
        ],
        why: 'Points and the cookie count are meant to change all day. Lesson 19, Encapsulation, keeps that safe: one owner, and doors that check. Finished orders and records of the past are handed around, so they should not be able to change at all.'
      },
      {
        type: 'type', q: 'After these three lines, how many items does <code>order</code> hold? Type the number.',
        pic: code([
          'order = ("cookie", "cookie", "cake")',
          'preview = order + ("brownie",)',
          'extra = preview + ("pie",)'
        ], { title: 'try.py' }),
        prompt: 'items >',
        answers: ['3', 'three'],
        why: 'Each <code>+</code> builds a new tuple. <code>preview</code> holds 4 and <code>extra</code> holds 5. <code>order</code> was never touched, so it still holds 3.',
        hint: 'Does any line change order itself, or does each line build something new?'
      }
    ]
  });
})();
