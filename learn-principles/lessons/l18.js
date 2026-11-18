/* Lesson 18: Abstraction (module 2). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l18  Abstraction
     ===================================================================== */
  const gear = (x, y, r) =>
    `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${P.ink}" stroke-width="7" stroke-dasharray="5 5"/>` +
    `<circle cx="${x}" cy="${y}" r="${r - 4}" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<circle cx="${x}" cy="${y}" r="4" fill="${P.ink}"/>`;

  const carPic = svg(600, 290, 'A steering wheel and two pedals, which is all a driver uses, next to the gears and pipes of the engine that the driver never sees',
    T(150, 34, 'WHAT YOU USE', { s: 12.5, f: P.ok }) + T(450, 34, 'WHAT YOU NEVER SEE', { s: 12.5, f: P.danger }) +
    `<line x1="300" y1="24" x2="300" y2="270" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    /* left: wheel and two pedals */
    `<circle cx="104" cy="130" r="50" fill="${P.white}" stroke="${P.ink}" stroke-width="9"/>` +
    `<path d="M104 130 L104 178 M104 130 L58 116 M104 130 L150 116" stroke="${P.ink}" stroke-width="7" stroke-linecap="round"/>` +
    `<circle cx="104" cy="130" r="13" fill="${P.accent}" stroke="${P.ink}" stroke-width="2.5"/>` +
    box(188, 106, 34, 60, P.tint, 9) + box(238, 96, 26, 70, P.tint, 9) +
    T(205, 196, 'stop', { s: 12, w: 700, f: P.ink2 }) + T(251, 196, 'go', { s: 12, w: 700, f: P.ink2 }) +
    T(150, 238, 'a wheel and two pedals', { s: 13, w: 700, f: P.ink2 }) +
    T(150, 258, 'the what', { s: 13, f: P.ok }) +
    /* right: under the bonnet */
    box(350, 62, 200, 140, P.sand, 16) +
    `<path d="M366 176 C392 150 380 96 410 118 S452 184 470 150 S508 80 534 104" fill="none" stroke="${P.danger}" stroke-width="3.5" stroke-linecap="round"/>` +
    gear(404, 112, 24) + gear(452, 152, 18) + gear(504, 108, 21) +
    T(450, 238, 'fuel, pistons, gears', { s: 13, w: 700, f: P.ink2 }) +
    T(450, 258, 'the how', { s: 13, f: P.danger }));

  const lowCode = [
    'def order_ready(customer):',
    '    line = phone_company.connect()',
    '    number = "+1" + customer.phone',
    '    message = "Your order is ready!"',
    '    message = message[:160]',
    '    reply = line.send(number, message)',
    '    if reply != "OK":',
    '        line.send(number, message)'
  ];
  const samCode = [
    'def cake_ready(customer):',
    '    line = phone_company.connect()',
    '    message = "Your cake is ready!"',
    '    message = message[:160]',
    '    reply = line.send(customer.phone, message)',
    '    if reply != "OK":',
    '        line.send(customer.phone, message)'
  ];
  const fixedCode = [
    'def notify(customer, message):',
    '    line = phone_company.connect()',
    '    number = "+1" + customer.phone',
    '    message = message[:160]',
    '    reply = line.send(number, message)',
    '    if reply != "OK":',
    '        line.send(number, message)',
    '',
    'def order_ready(customer):',
    '    notify(customer, "Your order is ready!")',
    '',
    'def cake_ready(customer):',
    '    notify(customer, "Your cake is ready!")'
  ];
  const emailCode = [
    'def notify(customer, message):',
    '    email.send(customer.email, message)',
    '',
    'def order_ready(customer):',
    '    notify(customer, "Your order is ready!")',
    '',
    'def cake_ready(customer):',
    '    notify(customer, "Your cake is ready!")'
  ];

  const jobs = ['order ready', 'order late', 'delivery', 'refund', 'birthday', 'cake'];
  const painPic = `<div style="width:100%">${code(samCode, { title: "shop.py, Sam's new job", bad: [5, 7] })}` +
    svg(600, 156, 'Six jobs in a row. Each one carries its own copy of the steps for sending a text. Sam\'s copy has only five steps, because the country code is missing.',
      jobs.map((s, i) => {
        const x = 12 + i * 98, sam = i === 5;
        return box(x, 12, 86, 34, P.white, 10) + T(x + 43, 34, s, { s: 11.5 }) +
          `<line x1="${x + 43}" y1="52" x2="${x + 43}" y2="66" stroke="${P.ink}" stroke-width="3"/>` +
          box(x, 66, 86, 38, P.dangerT, 10) + T(x + 43, 90, sam ? '5 steps' : '6 steps', { s: 12, f: P.danger }) +
          (sam ? T(x + 43, 124, 'no "+1"', { s: 12, f: P.danger }) : '');
      }).join('') +
      T(250, 146, 'six jobs, six copies of the how', { s: 13, w: 700, f: P.ink2 })) + `</div>`;

  const fixPic = `<div style="width:100%">${code(fixedCode, { title: 'shop.py, with one handle', good: [1], hi: [10, 13] })}` +
    code(emailCode, { title: 'shop.py, after the switch to email', good: [2], hi: [5, 8] }) + `</div>`;

  const level = (y, fill, name, verdict, note, col) =>
    box(30, y, 350, 50, fill, 12) + T(205, y + 31, name, { s: 13, m: true }) +
    T(486, y + 23, verdict, { s: 14, f: col }) + T(486, y + 42, note, { s: 11.5, w: 700, f: P.ink2 });
  const testPic = svg(600, 270, 'Three handles for the same job. One names its insides and is too detailed. One says nothing and is too vague. Notify, customer, message is just right.',
    T(300, 26, 'Three handles for the same job', { s: 13, w: 700, f: P.ink2 }) +
    level(46, P.dangerT, 'send_text_with_retry(number, text)', 'too detailed', 'the how is in the name', P.danger) +
    level(120, P.okT, 'notify(customer, message)', 'just right', 'says what, hides how', P.ok) +
    level(194, P.dangerT, 'handle(thing)', 'too vague', 'what does it do?', P.danger));

  const limitPic = `<div style="width:100%">` +
    svg(600, 128, "Sam's message is 190 characters long. The first 160 are sent. The last 30, which hold the pickup code, are cut off.",
      T(300, 22, "Sam's cake message: 190 characters", { s: 13, w: 700, f: P.ink2 }) +
      box(24, 38, 464, 44, P.okT, 10) + T(256, 65, 'Your cake is ready! Come to the side door ...', { s: 12.5 }) +
      box(488, 38, 88, 44, P.dangerT, 10) + T(532, 65, 'code 4471', { s: 12, f: P.danger }) +
      `<line x1="488" y1="30" x2="488" y2="96" stroke="${P.ink}" stroke-width="3" stroke-dasharray="5 5"/>` +
      T(256, 112, 'first 160: sent', { s: 13, f: P.ok }) + T(532, 112, 'last 30: cut', { s: 13, f: P.danger })) +
    code([
      'def add(a, b):',
      '    return a + b',
      '',
      'def get_cookie_price():',
      '    return COOKIE_PRICE',
      '',
      'total = add(get_cookie_price(), tip)'
    ], { title: 'handles that hide nothing', bad: [1, 4] }) + `</div>`;

  COURSE.add({
    id: 'l18', minutes: 8,
    summary: 'An <b>abstraction</b> is a simple handle on something complicated. You use it by knowing <b>what</b> it does, without knowing <b>how</b>. Then the how can change and nobody who uses it notices.',
    video: {
      src: 'videos/l18-abstraction.mp4', poster: 'videos/l18-abstraction.jpg', length: '1 min 3 s',
      script: [
        'Maya wants to text her customers when their order is ready.',
        'Here is the code. Open a line to the phone company. Add the country code. Cut the message to 160 characters. Send it. Check the reply. Try again if it failed.',
        'Five jobs in her shop send a text. Every one of them repeats all those fiddly steps.',
        'Sam, her helper, only wants to add one more message. Your cake is ready. But first, he has to learn how phone networks work.',
        'So Maya builds one handle, called notify. You give it a customer and a message. All the fiddly steps move behind it, into one place.',
        'Now each job just says what it wants. Sam adds his message in one line.',
        'Later, Maya switches from texts to email. She swaps what is behind the handle. The six jobs in front do not change at all.',
        'That is abstraction. Hide the how. Show the what.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: carPic,
        h: 'A wheel and two pedals.',
        text: [
          'You drive a car with a <b>wheel and two pedals</b>. Turn the wheel and the car turns. Press a pedal and it goes or stops. You never think about fuel, pistons or gears.',
          'Swap the petrol engine for an electric motor and you still drive the same way. The <b>how</b> changed completely. The <b>what</b> did not change at all.',
          'An <b>abstraction</b> is a simple handle on something complicated. You use it by knowing <b>what</b> it does, without knowing <b>how</b> it does it.'
        ],
        tip: 'You have already used two. In lesson 3, Loose coupling, <code>print_line(text)</code> let the shop print without knowing the printer. In lesson 17, Small functions, you read <code>close_shop</code> as five named steps without opening any of them.'
      },
      {
        label: 'The code', pic: code(lowCode, { title: 'shop.py', hi: [2, 3, 5, 6, 7, 8] }),
        h: 'One text, six fiddly steps.',
        text: [
          'Maya wants to send a customer a text message when their order is ready. Line 4 is <b>what</b> she wants to say. Every other line is <b>how</b> a text gets sent.',
          'Line 2 opens a line to the phone company. Line 3 puts the country code <code>"+1"</code> in front of the number. A <code>+</code> between two pieces of text joins them. And <code>customer.phone</code> uses the dot from lesson 3 to reach inside the customer for their phone number.',
          'Line 5 is new. <code>message[:160]</code> means "keep only the first 160 characters". One text message can hold 160 characters and no more.',
          'Line 6 sends the message and keeps the phone company\'s <code>reply</code>. On line 7, <code>!=</code> means "is not equal to". So if the reply is not <code>"OK"</code>, line 8 tries once more.',
          'It works. But <b>five jobs</b> in the shop send a text, and each one has its own copy of these six steps. That is 30 fiddly lines.'
        ]
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Sam has to learn phone networks.',
        text: [
          'Sam, the helper, gets a small task: tell customers <b>"Your cake is ready!"</b>. That is five words. But to send them, Sam has to copy six steps he does not understand.',
          'He copies them and misses one. His job sends to <code>customer.phone</code> with no <code>"+1"</code> in front. The phone company cannot place the number. The reply is not <code>"OK"</code>. Line 7 tries again, and that fails too.',
          '<b>Nothing crashes.</b> The cake sits on the shelf and the customer never hears about it.',
          'It gets worse. Maya wants to switch from texts to email. Now she must open <b>six jobs</b> and rewrite every copy.'
        ],
        warn: 'Sam is not the problem. He wanted to say <b>what</b> to tell the customer. The code forced him to also know <b>how</b> a text travels.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'One handle: notify.',
        text: [
          'Maya writes one job, <code>notify(customer, message)</code>. The six steps move inside it and live in <b>one place</b>.',
          'Every other job now says only <b>what</b> it wants: who to tell, and the words. Read line 10 aloud: "notify the customer, your order is ready". Sam\'s whole job is line 13. He cannot forget the country code, because he never touches it.',
          'Now look at the second file. Maya has switched to email. She changed <b>only the inside</b> of <code>notify</code>. The lines for <code>order_ready</code> and <code>cake_ready</code> are the same, letter for letter. The jobs that call <code>notify</code> never noticed.'
        ],
        tip: 'Lesson 6, DRY, would also tell you to merge six copies. Abstraction adds something more: a <b>name at the right level</b>, so callers can stop thinking about phones altogether. Stopping other code from reaching behind the handle and meddling is the next lesson, Encapsulation.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Ask one question.',
        text: [
          'Look at any handle and ask: <b>"Can I use this knowing only what it does, not how?"</b>',
          'A good handle sits at the right <b>level</b>. <code>send_text_with_retry(number, text)</code> is too detailed. The how is in the name, and the day Maya switches to email the name becomes a lie. <code>handle(thing)</code> is too vague. It tells you nothing. <code>notify(customer, message)</code> says what happens and hides how.',
          'A second check: imagine the inside being <b>swapped</b>. If no caller would have to change, the handle is hiding the right things.'
        ],
        tip: 'Lesson 17, Small functions, was about <b>cutting</b> a long job into named pieces. This lesson is about what those names let you <b>ignore</b>, and about picking the right level for them.'
      },
      {
        label: 'When not to', pic: limitPic,
        h: 'A handle can hide too much.',
        text: [
          '<b>Do not hide what the caller needs to know.</b> Look again at line 4 of the text version of <code>notify</code>. It quietly cuts every message at 160 characters. Sam writes a 190 character cake message with the pickup code at the end. The customer gets the message with <b>no code</b>. A handle may hide the how. It must not hide a surprise. Lesson 11, Least astonishment, said the same about names. When a hidden detail shows through like this, it has a name: lesson 45, Leaky abstractions.',
          '<b>Do not wrap what is already simple.</b> <code>add(a, b)</code> hides nothing that <code>a + b</code> did not already say. It is one more place to look, for no gain. Lesson 4, Trade-offs, not laws, asked what a thing costs the next reader.',
          '<b>Do not build the handle too early.</b> Maya wrote <code>notify</code> after five real jobs showed her its shape: a customer and a message. Had she guessed after one job, she might have built <code>notify(phone_number)</code> and been stuck when email came. That is lesson 9, Rule of three.'
        ],
        warn: 'Every handle is a promise: "you do not need to look inside". Make that promise only when it is true.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What is an abstraction?',
        options: ['A simple handle you can use by knowing what it does, not how', 'A very short function', 'A comment that explains a hard line', 'Code that nobody is allowed to read'],
        answer: 0,
        why: 'Like the wheel and pedals of a car. You know what they do. The engine can stay out of your head.',
        hint: 'Think about what a driver needs to know about the engine.'
      },
      {
        type: 'pick', q: 'This job is a list of named steps. One line drops down to a lower level and shows the how. Which line?',
        pic: code([
          'def close_shop():',
          '    count_till()',
          '    unsold = find_unsold()',
          '    mark_down(unsold)',
          '    back_up_sales()',
          '    door.lock_motor.pins.send(1)'
        ], { title: 'shop.py' }),
        options: ['Line 2', 'Line 4', 'Line 5', 'Line 6'],
        answer: 3,
        why: 'Lines 2 to 5 say <b>what</b> happens. Line 6 says <b>how</b> a lock works, with a chain of dots like the one in lesson 3. In lesson 17 this step had a name at the right level: <code>lock_up()</code>.',
        hint: 'Four lines are plain names. One reaches deep inside a machine.'
      },
      {
        type: 'pick', q: 'Maya switches from texts to email. How many of these four jobs must she edit?',
        pic: code([
          'def notify(customer, message):',
          '    line = phone_company.connect()',
          '    line.send("+1" + customer.phone, message)',
          '',
          'def order_ready(customer):',
          '    notify(customer, "Your order is ready!")',
          '',
          'def order_late(customer):',
          '    notify(customer, "Sorry, 10 more minutes.")',
          '',
          'def refund_sent(customer):',
          '    notify(customer, "Your refund is on its way.")'
        ], { title: 'shop.py' }),
        options: ['1', '2', '3', '4'],
        answer: 0,
        why: 'Only <code>notify</code> knows that a text is being sent. The other three jobs say what to tell the customer, and that has not changed.',
        hint: 'Which jobs mention the phone company?'
      },
      {
        type: 'fill', q: 'Finish Sam\'s job so it only says what he wants.',
        text: 'def cake_ready(customer):\n    ___(___, "Your cake is ready!")',
        options: ['notify', 'customer', 'line.send', 'phone_company'],
        answer: ['notify', 'customer'],
        why: 'Sam says who to tell and what to say. The phone company, the country code and the retry all stay behind <code>notify</code>.',
        hint: 'The first blank is the handle. The second is who gets the message.'
      },
      {
        type: 'bucket', q: 'Should a job that calls notify have to know this?',
        buckets: ['Yes: the what', 'No: the how, hidden behind notify'],
        items: [
          ['Which customer to tell', 0],
          ['The words of the message', 0],
          ['The country code "+1"', 1],
          ['Which phone company carries it', 1],
          ['Trying again when the reply is not "OK"', 1],
          ['Whether it goes by text or by email', 1]
        ],
        why: 'The caller brings the customer and the words. Everything about the journey belongs behind the handle, where it can change freely.'
      },
      {
        type: 'match', q: 'Match each handle to its level.',
        pairs: [
          ['notify(customer, message)', 'Just right: says what, hides how'],
          ['send_text_with_retry(number, text)', 'Too detailed: the how is in the name'],
          ['handle(thing)', 'Too vague: you cannot tell what it does'],
          ['add(a, b)', 'Hides nothing: a + b was already simple']
        ],
        why: 'A good handle says enough to be used and trusted, and nothing about its insides.',
        hint: 'Ask of each one: would the name still be true after a switch to email?'
      },
      {
        type: 'pick', q: 'Back to lesson 3, Loose coupling. The receipt, the kitchen ticket and the coupon all call <code>print_line(text)</code>. Maya buys a new printer. What do those three parts need to know about it?',
        options: ['Its brand and its model', 'The names of the parts inside it', 'How fast it prints', 'Nothing at all'],
        answer: 3,
        why: '<code>print_line</code> was an abstraction all along. The three parts know <b>what</b> it does: it prints a line. Only <code>print_line</code> knows how. That is also why they are loosely coupled.',
        hint: 'What happened to those three parts the last time the printer changed?'
      },
      {
        type: 'pick', q: 'When is a new handle a bad idea? Pick all that apply.',
        options: [
          'It wraps something already simple, like a + b',
          'You have seen one use and are guessing what the others will need',
          'It quietly drops part of the message and does not say so',
          'Six jobs repeat the same fiddly steps, and those steps may change'
        ],
        answer: [0, 1, 2],
        why: 'A wrapper around nothing is a layer for no gain. A handle built on a guess has the wrong shape. A handle that hides a surprise breaks its promise. The last one is exactly when a handle earns its place.',
        hint: 'One of these is the story of <code>notify</code>. The other three are warnings from "When not to".'
      }
    ]
  });
})();
