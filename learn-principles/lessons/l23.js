/* Lesson 23: Explicit over implicit (module 2). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l23  Explicit over implicit
     ===================================================================== */
  const recipePic = svg(600, 300, 'Two recipe cards. One says bake until done at the usual temperature. The other says bake 12 minutes at 180 degrees Celsius.',
    T(150, 34, 'IMPLICIT', { s: 12.5, f: P.danger }) + T(450, 34, 'EXPLICIT', { s: 12.5, f: P.ok }) +
    box(30, 54, 240, 150, P.white, 16) +
    T(150, 88, 'Cookie recipe', { s: 15 }) +
    T(150, 124, 'Bake until done', { s: 14, w: 700, f: P.ink2 }) +
    T(150, 150, 'at the usual temperature.', { s: 14, w: 700, f: P.ink2 }) +
    `<circle cx="246" cy="70" r="20" fill="${P.dangerT}" stroke="${P.ink}" stroke-width="2.5"/>` + T(246, 79, '?', { s: 24, f: P.danger }) +
    T(150, 184, 'How long? How hot?', { s: 12.5, f: P.danger }) +
    `<line x1="300" y1="24" x2="300" y2="280" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    box(330, 54, 240, 150, P.white, 16) +
    T(450, 88, 'Cookie recipe', { s: 15 }) +
    T(450, 124, 'Bake 12 minutes', { s: 14, w: 700, f: P.ink2 }) +
    T(450, 150, 'at 180°C.', { s: 14, w: 700, f: P.ink2 }) +
    T(450, 184, 'Nothing left to guess', { s: 12.5, f: P.ok }) +
    T(150, 244, 'works only if you already know', { s: 13, w: 700, f: P.ink2 }) + T(150, 262, 'how this kitchen does it', { s: 13, w: 700, f: P.ink2 }) +
    T(450, 244, 'works for anyone', { s: 13, w: 700, f: P.ink2 }) + T(450, 262, 'who can read the card', { s: 13, w: 700, f: P.ink2 }));

  const hiddenCode = [
    'from clock import today',
    '',
    'def sale_price(price):',
    '    if today() == "Tuesday":',
    '        return price - price * 0.10',
    '    return price',
    '',
    'def print_tag(price):',
    '    tag_price = sale_price(price)',
    '    print_paper(tag_price)'
  ];

  const machinePic = `<div style="width:100%">${code(['print_tag(3)     # on a Tuesday: prints 2.70', 'print_tag(3)     # on Monday night: prints 3.00'], { title: 'the same call, on two days', bad: [2] })}` +
    svg(600, 300, 'A machine called sale_price with one visible input, the price, on the front. A second input, the day, comes in through a hidden pipe from the clock behind a wall.',
      T(110, 30, 'WHAT THE CALL SHOWS', { s: 12.5, f: P.ok }) + T(482, 30, 'WHAT IT HIDES', { s: 12.5, f: P.danger }) +
      box(30, 84, 110, 46, P.white, 12) + T(85, 113, 'price: 3', { s: 14, m: true }) +
      arrow(146, 107, 214, 107, P.ink, 3) +
      box(220, 62, 160, 92, P.tint, 16) + T(300, 104, 'sale_price', { s: 15, m: true, f: P.accent }) + T(300, 126, 'the job', { s: 12.5, w: 700, f: P.ink2 }) +
      `<line x1="470" y1="107" x2="398" y2="107" stroke="${P.danger}" stroke-width="3.5" stroke-dasharray="7 6" stroke-linecap="round"/><path d="M386 107 L400 100 L400 114z" fill="${P.danger}"/>` +
      `<rect x="408" y="46" width="20" height="124" rx="4" fill="${P.sand}" stroke="${P.ink}" stroke-width="2.5"/>` +
      T(418, 190, 'wall', { s: 12, w: 700, f: P.ink2 }) +
      box(474, 78, 100, 60, P.dangerT, 12) + T(524, 104, 'the clock', { s: 13 }) + T(524, 124, 'today()', { s: 12.5, m: true, f: P.danger }) +
      arrow(270, 160, 170, 222, P.ok, 3) + arrow(330, 160, 430, 222, P.danger, 3) +
      box(60, 230, 220, 50, P.okT, 12) + T(170, 261, 'on Tuesday: $2.70', { s: 14, f: P.ok }) +
      box(320, 230, 220, 50, P.dangerT, 12) + T(430, 261, 'on Monday night: $3.00', { s: 14, f: P.danger })) + `</div>`;

  const fixedCode = [
    'def sale_price(price, day):',
    '    if day == "Tuesday":',
    '        return price - price * 0.10',
    '    return price',
    '',
    'def print_tag(price, day):',
    '    tag_price = sale_price(price, day)',
    '    print_paper(tag_price)'
  ];
  const fixPic = `<div style="width:100%">${code(fixedCode, { title: 'shop.py, the day is passed in', good: [1, 2, 6, 7] })}${code([
    '# Sam, on Monday night',
    'print_tag(3, "Tuesday")        # prints 2.70',
    '',
    '# the till, at any moment',
    'price_now = sale_price(3, today())'
  ], { title: 'the two callers', good: [2, 5] })}</div>`;

  const testPic = `<div style="width:100%">${code([
    'print_label(box, "box", False)',
    'set_timer(12)',
    'bake_time = 12'
  ], { title: 'you have to already know', bad: [1, 2, 3] })}${code([
    'print_label(box, "box", show_price=False)',
    'set_timer(minutes=12)',
    'bake_minutes = 12'
  ], { title: 'the line says it', good: [1, 2, 3] })}</div>`;

  const overPic = `<div style="width:100%">${code([
    'print_tag(price=3, day="Tuesday",',
    '          currency="USD", paper="white",',
    '          ink="black", font="normal",',
    '          size=12, copies=1,',
    '          printer="front")'
  ], { title: 'everything spelled out, every time', bad: [2, 3, 4, 5] })}${code([
    'print_tag(3, "Tuesday")'
  ], { title: 'only what differs between callers', good: [1] })}</div>`;

  COURSE.add({
    id: 'l23', minutes: 8,
    summary: 'Code should say what it depends on and what it means, right where it is used. <b>Explicit</b> means it is written on the line. <b>Implicit</b> means the reader has to already know.',
    video: {
      src: 'videos/l23-explicit-over-implicit.mp4', poster: 'videos/l23-explicit-over-implicit.jpg', length: '57 s',
      script: [
        "Tuesday is sale day at Maya's cookie shop. 10% off.",
        'Sam writes the job that works out the price. Picture a machine with one slot on the front. A price goes in. A price comes out.',
        'On Tuesday, Sam tries it. $3 in. $2.70 out.',
        "On Monday night, he prints the tags for tomorrow's sale. $3 in. $3 out. Same input, different answer.",
        "Look behind the machine. A hidden pipe runs in from the computer's clock. The job quietly asks what day it is today.",
        'The fix: bring that pipe round to the front. Now the job takes the price, and the day. Sam asks for Tuesday, and gets $2.70 on any day.',
        'Say what your code depends on, right where it is used. Explicit is better than implicit.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: recipePic,
        h: 'Write it on the card.',
        text: [
          'A recipe says: "Bake until done, at the usual temperature." That works for the person who wrote it. Anyone else has to guess. Now read: "Bake 12 minutes at 180°C." Nothing is left to guess.',
          '<b>Implicit</b> means the reader has to already know something that is not written there. <b>Explicit</b> means it is written down, in plain sight, at the place where it is used.',
          'The phrase comes from the Zen of Python, a short list of sayings that ships with the Python language. One of them reads: <b>"Explicit is better than implicit."</b>',
          'In code, the things that get hidden are mostly two. What a line <b>depends on</b>, and what a value <b>means</b>.'
        ],
        tip: 'Lesson 11, Least astonishment, and lesson 12, Meaningful names, were about names matching what code does. This lesson is about <b>inputs and meaning</b>. Can you see them on the line that uses them, or are they tucked away somewhere else?'
      },
      {
        label: 'The code', pic: code(hiddenCode, { title: 'shop.py', hi: [4] }),
        h: 'Tuesday is sale day.',
        text: [
          "Every Tuesday, cookies are 10% off at Maya's. Sam, the helper, writes <code>sale_price</code> to work out the price, and <code>print_tag</code> to print it on a shelf tag.",
          'Line 1 fetches a job called <code>today</code> from the file <code>clock.py</code>, the way lesson 4 fetched names from <code>settings.py</code>. <code>today()</code> asks the computer\'s clock and hands back the name of the day, like <code>"Monday"</code>.',
          'Line 4 asks: is today Tuesday? If yes, line 5 takes 10% off, as in lesson 6. If no, line 6 hands the price back unchanged. A $3 cookie comes out as $2.70 on a Tuesday.',
          'Now read line 3 by itself. It says the job is given <b>one</b> thing: a price. But the answer depends on <b>two</b> things: the price and the day. The second one comes in through the back.'
        ]
      },
      {
        label: 'The pain', pic: machinePic,
        h: 'Same call, different answer.',
        text: [
          'Sam tries his code on a Tuesday. <code>print_tag(3)</code> prints <b>$2.70</b>. Correct. He is done.',
          "On Monday night he prints the tags for tomorrow's sale. Same call, <code>print_tag(3)</code>. Every tag says <b>$3.00</b>. The job never asked which day Sam meant. It quietly read the clock, and the clock said Monday.",
          'On Tuesday morning the flyer in the window says 10% off, and every tag on the shelf says $3.00.',
          'There is a second cost. Sam can only check the Tuesday price on a Tuesday. To test the sale on any other day, he would have to change the clock on the computer.'
        ],
        warn: 'Nothing crashed. And nothing in <code>print_tag(3)</code> could have warned Sam. The call shows one input. The second input is hidden, so nobody thinks to ask about it.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Bring it round to the front.',
        text: [
          'Sam adds <code>day</code> between the brackets on line 1. The job no longer reads the clock. It is <b>given</b> the day, just as it is given the price.',
          'Now look at the two callers. On Monday night Sam writes <code>print_tag(3, "Tuesday")</code> and gets $2.70. The line says which day he means.',
          'The till wants the price right now, so it writes <code>sale_price(3, today())</code>. The clock is still read. But it is read <b>in plain sight</b>, by the caller that really means "today".',
          'Testing is easy too. <code>sale_price(3, "Tuesday")</code> gives $2.70 on any day of the week, and <code>sale_price(3, "Friday")</code> gives $3.'
        ],
        tip: 'Handing a job what it needs, so it does not go and fetch it for itself, grows into one of the big ideas of module 3: lesson 33, Dependency injection.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Read one line, alone.',
        text: [
          'Point at one line and ask: <b>"Can I tell what this line depends on, and what it means, from the line itself?"</b>',
          'Try it on the top picture. Line 1 is from lesson 9, Rule of three. What does that <code>False</code> switch off? You cannot tell. Line 2: 12 what? Seconds? Minutes? Line 3 has the same problem.',
          'One new bit of Python fixes the first two. In lesson 8 you saw <code>currency="USD"</code> on a <code>def</code> line. You can also write an input\'s name at the call. <code>set_timer(minutes=12)</code> means: the input called <code>minutes</code> is 12.',
          'So <code>show_price=False</code> says what the switch is, and <code>minutes=12</code> says the unit. For a plain value, put the unit in the name: <code>bake_minutes</code>.'
        ],
        tip: 'Three things hide most often: an <b>input</b> that comes in through the back, a lone <code>True</code> or <code>False</code>, and a number with <b>no unit</b>.'
      },
      {
        label: 'When not to', pic: overPic,
        h: 'Say what matters. Let the rest stay quiet.',
        text: [
          'Suppose Sam loves this lesson and makes <code>print_tag</code> take everything it could ever depend on. Now every call lists nine inputs. Seven of them are the same on every call in the shop. The two that matter, the price and the day, are buried.',
          'A sensible, well-known default is not a hidden trap. Every tag in the shop is white, in the normal font, one copy. Saying so on every call tells the reader nothing new. Good defaults save noise. That has its own lesson: lesson 46, Convention over configuration.',
          'The same goes for steady facts. <code>TAX_RATE</code> sits at the top of the file, as in lesson 1. It has a clear name and one home, and it is the same for every caller. It does not need to be passed into every job.',
          'So be explicit about what is <b>surprising</b>, <b>risky</b>, or <b>different from one caller to the next</b>. The day was all three.'
        ],
        warn: 'This is lesson 4, Trade-offs, not laws, again. Ask what each extra word costs the next reader. A line that says everything hides the one thing that matters.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'Read only the first line of each job. Which job depends on something that its first line does not show?',
        pic: code([
          'def box_price(cookies, price):',
          '    return cookies * price',
          '',
          'def greeting(name):',
          '    if hour_now() < 12:',
          '        return "Good morning, " + name',
          '    return "Hello, " + name',
          '',
          'def with_tip(total, tip):',
          '    return total + tip'
        ], { title: 'shop.py' }),
        options: ['box_price', 'greeting', 'with_tip', 'None of them'],
        answer: 1,
        why: '<code>greeting</code> says it is given a name. But line 5 also reads the time from the clock. The same call gives a different answer in the afternoon.',
        hint: 'Look inside each job for something that was not handed in between the brackets.'
      },
      {
        type: 'type', q: "This is the code before the fix. It is Wednesday. Sam wants the tag for next Tuesday's sale on a $20 cake, so he runs <code>sale_price(20)</code>. What number does it hand back?",
        pic: code(hiddenCode.slice(0, 6), { title: 'shop.py, before the fix' }),
        answers: ['20', '20.00', '20.0', '$20', '$20.00'],
        prompt: 'dollars >',
        why: 'The job reads the clock, and the clock says Wednesday. So line 6 hands back 20. The Tuesday price would be 18. Sam had no way to say which day he meant.',
        hint: 'Which day does <code>today()</code> hand back when Sam runs it?'
      },
      {
        type: 'fill', q: 'Finish the fix. The job is given the day, and Sam says which day he means.',
        text: 'def sale_price(price, ___):\n    if ___ == "Tuesday":\n        return price - price * 0.10\n    return price\n\nprint_paper(sale_price(20, ___))',
        options: ['day', 'day', '"Tuesday"', 'today', 'price'],
        answer: ['day', 'day', '"Tuesday"'],
        why: 'The day comes in through the front now. The call says which day it means, so it gives 18 on any day of the week.',
        hint: 'The first two blanks take the same name. The last one is the day Sam is asking about.'
      },
      {
        type: 'pick', q: 'You are reading this one line, and nothing else. What does the <code>True</code> do?',
        pic: code(['send_order(order, True, False)'], { title: 'orders.py' }),
        options: ['It sends the order by email', 'It adds gift wrap', 'It marks the order as paid', 'You cannot tell from this line'],
        answer: 3,
        why: 'A lone <code>True</code> says "yes" without saying yes to what. <code>send_order(order, gift_wrap=True, by_email=False)</code> would tell you on the line itself.',
        hint: 'Be honest. Is the answer written anywhere on that line?'
      },
      {
        type: 'match', q: 'Each line on the right makes the reader guess. Drag the explicit version onto it.',
        pairs: [
          ['wait(seconds=5)', '<code>wait(5)</code>'],
          ['oven_celsius = 180', '<code>oven = 180</code>'],
          ['print_label(box, "box", show_price=False)', '<code>print_label(box, "box", False)</code>'],
          ['sale_price(3, "Tuesday")', '<code>sale_price(3)</code>, where the job reads the clock inside']
        ],
        why: 'Two got a unit. One got a name for its switch. One got its hidden input moved to the front.'
      },
      {
        type: 'bucket', q: 'Say it on the line, or let it stay quiet?',
        buckets: ['Say it on the line', 'Let it stay quiet'],
        items: [
          ['Which day a sale price is for', 0],
          ['Whether a timer counts seconds or minutes', 0],
          ['What a lone True switches on', 0],
          ['That tags print in the normal font', 1],
          ['That a price is a number', 1],
          ['That one copy of a receipt is printed', 1]
        ],
        why: 'Say what is surprising, risky, or different from one caller to the next. Things that are the same everywhere, and that everyone expects, can stay quiet.',
        hint: 'Ask of each one: would two callers ever want different answers, or could a reader guess wrong?'
      },
      {
        type: 'pick', q: 'Back to lesson 11, Least astonishment. There, <code>get_total</code> secretly charged a card. Here, <code>sale_price</code> secretly read the clock. What is the difference?',
        options: [
          'There is none. Both jobs had a bad name',
          'get_total hid something it did. sale_price hid something it used',
          'get_total crashed. sale_price did not',
          'sale_price was too long. get_total was not'
        ],
        answer: 1,
        why: 'Lesson 11 was about a hidden action: money left a card. This lesson is about a hidden input: the day. Both are invisible at the call, and both fooled Sam.',
        hint: 'One job did an extra thing. The other job took an extra thing in.'
      },
      {
        type: 'pick', q: 'Back to lesson 1, Easy to change. <code>final_total</code> reads <code>TAX_RATE</code>, which is set once at the top of the same file. Sam says: "That is a hidden input too. Pass the tax into every job." What is the best call?',
        pic: code([
          'TAX_RATE = 0.09',
          '',
          'def final_total(price):',
          '    return price + price * TAX_RATE'
        ], { title: 'shop.py' }),
        options: [
          'Sam is right. Every job should be handed the tax rate',
          'Leave it. The tax is one steady, well-named fact, and it is the same for every caller',
          'Delete TAX_RATE and type 0.09 in each job',
          'Read the tax from the clock'
        ],
        answer: 1,
        why: 'The day differed from one caller to the next, and it changed while nobody looked. The tax has one home, a clear name, and the same value for everyone. Passing it everywhere would be noise.',
        hint: 'Would two callers ever want a different tax rate on the same day?'
      }
    ]
  });
})();
