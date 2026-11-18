/* Lesson 24: Review: one piece of code (module 2). Quiz only, no video. One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l24  Review: one piece of code
     ===================================================================== */
  // One row per principle: lesson number, name, its test question on two lines, and its group.
  const GROUP = { cut: P.warnT, front: P.tint, honest: P.okT, trouble: P.white };
  const recapRows = [
    [15, 'Separation of concerns', 'Can I change how it looks without touching', 'how it is worked out or saved?', 'cut'],
    [16, 'Single responsibility', 'Who could ask me', 'to change this?', 'cut'],
    [17, 'Small functions', 'Can I say what it does without "and"?', 'Can I see all of it at once?', 'cut'],
    [18, 'Abstraction', 'Can I use this knowing only', 'what it does, not how?', 'front'],
    [19, 'Encapsulation', 'Can outside code put this data', 'into a state that makes no sense?', 'front'],
    [20, 'Command-query separation', 'If I call this twice in a row, is anything', 'different the second time?', 'honest'],
    [21, 'Guard clauses', 'Is the main job at the left edge, with', 'the odd cases dealt with above it?', 'trouble'],
    [22, 'Fail fast', 'If this value is wrong, will the code stop here', 'and say so, or carry on and fail elsewhere?', 'trouble'],
    [23, 'Explicit over implicit', 'Can I tell what this line depends on, and', 'what it means, from the line itself?', 'honest']
  ];
  const recapPic = svg(600, 592, 'The nine principles of module 2, each with its test question. Separation of concerns: can I change how it looks without touching how it is worked out or saved. Single responsibility: who could ask me to change this. Small functions: can I say what it does without the word and, and can I see all of it at once. Abstraction: can I use this knowing only what it does, not how. Encapsulation: can outside code put this data into a state that makes no sense. Command-query separation: if I call this twice in a row, is anything different the second time. Guard clauses: is the main job at the left edge, with the odd cases dealt with above it. Fail fast: if this value is wrong, will the code stop here and say so, or carry on and fail somewhere else. Explicit over implicit: can I tell what this line depends on, and what it means, from the line itself.',
    T(300, 26, 'NINE PRINCIPLES, NINE QUESTIONS', { s: 12.5 }) +
    recapRows.map((r, i) => {
      const y = 46 + i * 56;
      return `<circle cx="24" cy="${y + 20}" r="13" fill="${P.ink}"/>` + T(24, y + 25, r[0], { s: 12, f: P.white }) +
        box(46, y, 190, 40, GROUP[r[4]], 10) + T(141, y + 25, r[1], { s: 12 }) +
        T(250, y + 17, r[2], { s: 12.5, w: 700, a: 'start' }) + T(250, y + 34, r[3], { s: 12.5, w: 700, a: 'start' });
    }).join('') +
    [['cut it right', 'cut'], ['front and inside', 'front'], ['honest calls', 'honest'], ['trouble first', 'trouble']].map((g, i) => {
      const x = 20 + i * 146;
      return `<rect x="${x}" y="556" width="18" height="18" rx="5" fill="${GROUP[g[1]]}" stroke="${P.ink}" stroke-width="2.5"/>` +
        T(x + 26, 570, g[0], { s: 12.5, a: 'start' });
    }).join(''));

  const playCode = [
    'def is_birthday(card):',
    '    if card.birthday == today():',
    '        card.earn(10)',
    '        return True',
    '    return False'
  ];
  const playPic = `<div style="width:100%">${code(playCode, { title: 'points.py', bad: [2, 3] })}` +
    svg(600, 126, 'Line 2 breaks explicit over implicit because it reads the clock inside the job. Line 3 breaks command-query separation because a question gives out points.',
      box(20, 16, 270, 64, P.dangerT, 14) + T(155, 42, 'line 2: reads the clock inside', { s: 13 }) + T(155, 64, 'Explicit over implicit', { s: 13, f: P.danger }) +
      box(310, 16, 270, 64, P.dangerT, 14) + T(445, 42, 'line 3: a question gives points', { s: 13 }) + T(445, 64, 'Command-query separation', { s: 13, f: P.danger }) +
      T(300, 114, 'one small job, two broken principles', { s: 13, w: 700, f: P.ink2 })) + `</div>`;

  /* ---------- quiz programs, all new ---------- */
  const ovenCode = [
    'def oven_is_hot(oven):',
    '    if oven.degrees < 180:',
    '        switch_on(oven)',
    '    return oven.degrees >= 180'
  ];
  const giftCode = [
    'def sell_gift_card(dollars):',
    '    print_paper("Maya\'s gift card")',
    '    bonus = dollars * 0.10',
    '    print_paper("You paid", dollars)',
    '    value = dollars + bonus',
    '    save_to_file(value)',
    '    print_paper("Card value", value)'
  ];
  const rainCode = [
    'from weather import is_raining',
    '',
    'def delivery_minutes(km):',
    '    minutes = km * 4',
    '    if is_raining():',
    '        minutes = minutes + 10',
    '    return minutes'
  ];
  const nestedCake = [
    'def cake_booking_reply(order):',
    '    if order.paid:',
    '        if order.days_ahead >= 2:',
    '            return "Booked."',
    '        else:',
    '            return "We need 2 days."',
    '    else:',
    '        return "Please pay first."'
  ];
  const lateCheck = [
    'def book_class(name, seats):',
    '    save_booking(name, seats)',
    '    tell_kitchen(seats)',
    '    if seats <= 0:',
    '        raise ValueError(',
    '            "seats must be 1 or more, got " + str(seats))',
    '    print_slip(name, seats)'
  ];
  const allergyCode = [
    'def print_allergy_label(cookie):',
    '    if cookie.allergens is None:',
    '        return',
    '    print_paper("Contains:", cookie.allergens)'
  ];
  const labelCode = [
    'def box_label(box):',
    '    print_paper("Maya\'s Cookies")',
    '    print_paper(box.flavour)',
    '    print_paper("Cookies:", box.count)',
    '    print_paper("Baked:", box.baked_on)',
    '    print_paper("Best before:", box.best_before)',
    '    print_paper("Keep in a cool, dry place")'
  ];
  const pantryCode = [
    'def bake_batch(pantry):',
    '    pantry.take_flour(2)',
    '',
    'def monday_order(pantry):',
    '    if pantry._flour_kilos < 10:',
    '        order_flour()',
    '',
    'def stock_report(pantry):',
    '    print_paper("Flour", pantry.flour_left())',
    '',
    'def spring_clean(pantry):',
    '    pantry._flour_kilos = 0'
  ];
  const addOrderCode = [
    'def add_order(orders, order):',
    '    orders.append(order)',
    '    return len(orders)',
    '',
    'def phone_order(orders, order):',
    '    number = add_order(orders, order)',
    '    print_paper("Your order number is", number)'
  ];
  const everyJobCode = [
    'def book_class(name, seats):',
    '    if seats <= 0:',
    '        raise ValueError("seats must be 1 or more")',
    '    save_booking(name, seats)',
    '    tell_kitchen(seats)',
    '',
    'def save_booking(name, seats):',
    '    if seats <= 0:',
    '        raise ValueError("seats must be 1 or more")',
    '    save_to_file(name, seats)',
    '',
    'def tell_kitchen(seats):',
    '    if seats < 0:',
    '        raise ValueError("seats must be 1 or more")',
    '    print_paper("Class for", seats)'
  ];
  const trayCode = [
    'class CookieTray:',
    '    name = "choc chip"',
    '    flavour = "sweet"',
    '    count = 0',
    '',
    'def sell(tray, how_many):',
    '    tray.count = tray.count - how_many',
    '',
    'def give_sample(tray):',
    '    tray.count = tray.count - 1',
    '',
    'def bin_broken(tray, how_many):',
    '    tray.count = tray.count - how_many'
  ];
  const saveSaleCode = [
    '# today',
    'def end_sale(sale):',
    '    save_sale(sale)',
    '    print_receipt(sale)',
    '',
    '# Sam\'s idea',
    'def end_sale(sale):',
    '    save_sale(sale, file="sales.txt", retries=2, backup=True)',
    '    print_receipt(sale)'
  ];
  const tickCode = [
    'def gift_card_is_ok(card, price):',
    '    if card is not None:',
    '        if card.dollars > 0:',
    '            card.dollars = card.dollars - price',
    '            return True',
    '        else:',
    '            return False',
    '    else:',
    '        return False'
  ];

  COURSE.add({
    id: 'l24', minutes: 15,
    summary: 'Nine ways to shape one piece of code, on one page. Then you are the detective again. Here is some code from Maya\'s shop: <b>which principle is being broken?</b>',
    parts: [
      {
        label: 'Recap', pic: recapPic,
        h: 'Nine principles, nine questions.',
        text: [
          'Module 2 was about <b>one piece of code</b>: a single function or class. It gave you nine principles, and each one came with <b>one question to ask</b>. The picture puts all nine on one page. The number in the circle is the lesson.',
          'They fall into four small groups. <b>Cut it right</b>: three ways to decide where one piece ends and the next begins. Separation of concerns cuts by kind of work. Single responsibility cuts by who asks for changes. Small functions cuts by what you can name honestly and see whole.',
          '<b>Front and inside</b>: every piece has a front that others use and an inside they should not need. Abstraction keeps the front simple, so the inside can change. Encapsulation keeps the inside safe, behind doors that check.',
          '<b>Honest calls</b>: a call should hold no secrets. Command-query separation means that asking a question never changes anything. Explicit over implicit means that nothing comes in through the back.',
          '<b>Trouble first</b>: deal with what is odd or wrong at the top of a job. Guard clauses give a normal odd case a calm answer and leave. Fail fast stops loudly when a value cannot be right.'
        ],
        tip: 'All nine serve the goal from lesson 1, Easy to change. And lesson 4, Trade-offs, not laws, applies to every one of them. Each can be overdone.'
      },
      {
        label: 'How to play', pic: playPic,
        h: 'Same game, sharper tools.',
        text: [
          'In each lesson, the quiz asked "what does this principle mean?". In a review the question changes, as it did in lesson 14. You will see a small program from Maya\'s shop that you have not met before, and the question is: <b>which principle is being broken here?</b>',
          'Real code usually breaks <b>more than one</b>. Look at the picture. The name on line 1 sounds like a question. But line 3 hands out 10 points every time someone asks it. And line 2 reads the clock inside the job, so nobody can ask about any day except today. Two problems in five lines.',
          'A good way to work: run through the nine questions from the recap, one at a time. Stop at each one that gets a bad answer.'
        ],
        warn: 'Sometimes the code is <b>fine</b>. Then the right answer is "leave it alone". And sometimes two principles pull in different directions. Then you pick the better call and say why. That is lesson 4 at work.'
      }
    ],
    quiz: [
      {
        type: 'match', q: 'Warm up. Match each principle from this module to its test question.',
        pairs: [
          ['Separation of concerns', 'Can I change how it looks without touching how it is worked out or saved?'],
          ['Single responsibility', 'Who could ask me to change this?'],
          ['Small functions', 'Can I say what it does without the word "and", and can I see all of it at once?'],
          ['Abstraction', 'Can I use this knowing only what it does, not how?'],
          ['Encapsulation', 'Can outside code put this data into a state that makes no sense?'],
          ['Command-query separation', 'If I call this twice in a row, is anything different the second time?'],
          ['Guard clauses', 'Is the main job at the left edge, with the odd cases dealt with above it?'],
          ['Fail fast', 'If this value is wrong, will the code stop here and say so, or carry on and fail somewhere else?'],
          ['Explicit over implicit', 'Can I tell what this line depends on, and what it means, from the line itself?']
        ],
        why: 'Nine principles, nine questions. In the rest of this quiz, these questions are your tools. Ask them of each program in turn.',
        hint: 'Two of them are about trouble. One asks where the main job stands. The other asks what happens to a wrong value.'
      },
      {
        type: 'pick', q: 'The shop is closed for the night. A screen by the door calls this job every minute, to show a red dot or a green dot. In the morning the oven has been on all night. Which principle does the job break?',
        pic: code(ovenCode, { title: 'oven.py' }),
        options: ['Abstraction', 'Command-query separation', 'Guard clauses', 'Fail fast'],
        answer: 1,
        why: 'The name sounds like a question, and line 4 answers it. But line 3 also switches the oven on. Ask the question from lesson 20, Command-query separation: if I call this twice in a row, is anything different the second time? Yes. The oven is heating up. Looking should be free. Let <code>oven_is_hot</code> only look, and let the job that really wants a hot oven call <code>switch_on</code> in plain sight.',
        hint: 'Read only the name. Is it a question or an order? Now read line 3.',
        hints: {
          0: 'The name is at a fine level, and the screen does not need to know how an oven works. The trouble is what line 3 does when someone only wants to look.',
          2: 'Nothing here is nested, and there is no odd case to send away. Read the name, then read line 3.',
          3: 'No value here is wrong, so there is nothing to stop for. Read the name, then read line 3.'
        }
      },
      {
        type: 'pick', q: 'Only Maya ever asks for changes to this job. Now she wants a new look for the printed card, with bigger letters and a border. She is afraid to touch it, because the save line sits in among the printing lines. Which principle does the job break?',
        pic: code(giftCode, { title: 'gift_cards.py' }),
        options: ['Single responsibility', 'Fail fast', 'Separation of concerns', 'Encapsulation'],
        answer: 2,
        why: 'Three kinds of work take turns, line by line: show, work out, show, work out, save, show. Ask the question from lesson 15, Separation of concerns: can I change how it looks without touching how it is worked out or saved? Not here. Give each kind of work its own part. Then a new look opens only the printing part, and the save line is not in it.',
        hint: 'Say what each line does: show, save or work out. Do the three kinds sit apart, or do they take turns?',
        hints: {
          0: 'Lesson 16 counts people, and only Maya asks for changes here. Count the kinds of work instead.',
          1: 'No value here is wrong, so there is nothing to stop for. Look at what each line does: show, save or work out.',
          3: 'No job here reaches into data that belongs to another part. Look at what each line does: show, save or work out.'
        }
      },
      {
        type: 'pick', q: 'It is a dry evening. Rain is forecast for tomorrow, and Sam is planning tomorrow\'s deliveries. He calls <code>delivery_minutes(5)</code> and gets 20. In tomorrow\'s rain the trip will take 30. Which fix is right?',
        pic: code(rainCode, { title: 'delivery.py', hi: [5] }),
        options: [
          'Run the plan again tomorrow, once it is raining',
          'Hand the job the weather as well: delivery_minutes(km, raining)',
          'Always add the 10 minutes, to be safe',
          'Raise an error whenever it is not raining'
        ],
        answer: 1,
        why: 'Line 3 says the job is given one thing, the distance. But the answer also depends on the weather, and that comes in through the back on line 5. That breaks lesson 23, Explicit over implicit. Bring it round to the front. For tomorrow, Sam writes <code>delivery_minutes(5, raining=True)</code> and gets 30. The driver\'s screen wants the time right now, so it writes <code>delivery_minutes(5, is_raining())</code>.',
        hint: 'The answer depends on two things. Line 3 shows only one of them. How could the call itself say which weather Sam means?',
        hints: {
          0: 'Then Sam can only plan a rainy day on a rainy day. How could the call itself say which weather he means?',
          2: 'Then every dry trip is planned 10 minutes too long. The job needs to be told which weather the caller means.',
          3: 'A dry day is not a mistake, so there is nothing to stop for. The trouble is an input that the call does not show.'
        }
      },
      {
        type: 'match', q: 'Match each sign of trouble to the principle it points to.',
        pairs: [
          ['Single responsibility', 'One number, worked out once, feeds the baker\'s plan and the accountant\'s report'],
          ['Small functions', 'A 50-line job with six chunks, each under its own <code>#</code> note'],
          ['Abstraction', 'Seven jobs each repeat the same five fiddly steps to talk to the card reader'],
          ['Encapsulation', 'Five jobs each write a new number straight into <code>fridge.eggs</code>'],
          ['Guard clauses', 'The line that says yes sits five steps from the left edge, above a ladder of <code>else</code> lines'],
          ['Explicit over implicit', '<code>set_oven(180, 12, True)</code>']
        ],
        why: 'Two people behind one value. A job too long to see whole. The how repeated in every caller. Data on an open shelf. A main job buried in questions. And a call that makes you guess: 12 what, and yes to what? Each sign has its own principle.',
        hint: 'Two of them are about several jobs. In one, the jobs repeat steps. In the other, they all write to the same value.'
      },
      {
        type: 'fill', q: 'Custom cakes must be paid for, and ordered at least 2 days ahead. Rewrite this job with guard clauses, so the main job stands at the left edge.',
        pic: code(nestedCake, { title: 'cakes.py, the nested version' }),
        text: 'def cake_booking_reply(order):\n    if ___ order.paid:\n        return "Please pay first."\n    if order.days_ahead ___ 2:\n        return ___\n    return "Booked."',
        options: ['not', '<', '"We need 2 days."', '>=', '"Booked."', 'else'],
        answer: ['not', '<', '"We need 2 days."'],
        why: 'Each question is flipped so that it asks about the odd case, and its answer sits right under it. <code>not</code> turns "is it paid?" into "is it not paid?". "At least 2" flips to "less than 2". The main job, "Booked.", now stands at the left edge, and no <code>else</code> is needed anywhere.',
        hint: 'Flip each question so that it asks about the odd case. The last line already says "Booked.", so the blank above it holds a different reply.'
      },
      {
        type: 'order', q: 'Maya runs a cookie baking class. Sam books Mrs Lee in, and his finger slips: <code>book_class("Mrs Lee", -2)</code>. Put what happens in order.',
        pic: code(lateCheck, { title: 'classes.py' }),
        items: [
          'A booking for -2 seats is saved',
          'The kitchen is told to expect -2 people',
          'The check sees that -2 cannot be right',
          'The job stops with a clear message',
          'Sam types 2, but the -2 booking is still in the file'
        ],
        why: 'The check is loud and clear, but it stands in the wrong place. By the time it runs, the bad number has been saved and sent to the kitchen. Lesson 22, Fail fast, says to check at the door. Move lines 4 to 6 above line 2, and -2 is stopped before it touches anything.',
        hint: 'Read the job from the top. Which lines run before the check on line 4?'
      },
      {
        type: 'pick', q: 'A shop rule: every cookie on the menu has an allergy list, even if the list says "none". So a missing list can only be a mistake. Sam adds a walnut cookie and forgets its list. This job prints nothing, and the cookies go on the shelf with no label. Which fix is right?',
        pic: code(allergyCode, { title: 'labels.py', bad: [2, 3] }),
        options: [
          'Print "Contains: none" when the list is missing',
          'Raise an error that says which cookie has no allergy list',
          'Leave it. Lines 2 and 3 are a guard clause, and guards are good',
          'Hand back False, so that a caller can check if it wants to'
        ],
        answer: 1,
        why: 'A customer with no card is an odd but normal case, so a calm answer is right. A cookie with no allergy list is a mistake, and line 3 hides it. Lesson 21, Guard clauses, warned about this: do not use a guard to hide a mistake. Lesson 22, Fail fast, gives the fix: <code>raise ValueError("no allergy list for " + cookie.name)</code>. Sam finds out the moment he tries to print, not when a customer falls ill.',
        hint: 'Is a missing allergy list an odd but normal case, or a mistake? Lessons 21 and 22 treat those two differently.',
        hints: {
          0: 'That makes up a value. A walnut cookie would be labelled as safe. What did lesson 22 say about made-up values?',
          2: 'A guard is for an odd case that is normal, like a customer with no card. Is a missing allergy list normal in this shop?',
          3: 'A quiet no only works if every caller looks at the answer. Lesson 22 showed a caller that did not.'
        }
      },
      {
        type: 'bucket', q: 'A principle is a tool, not a law. Is each of these a good use of one, or is it overdoing it?',
        buckets: ['Use it here', 'Overdoing it'],
        items: [
          ['Splitting a job where printing, saving and sums take turns', 0],
          ['Putting an egg count behind doors that refuse to go below zero', 0],
          ['Stopping with an error when a job is handed -2 seats', 0],
          ['Writing set_timer(minutes=12) so the unit is on the line', 0],
          ['Cutting a 50-line job into five steps with honest names', 0],
          ['Cutting a clear 3-line job into four one-line jobs', 1],
          ['Writing add(a, b) to hide a + b', 1],
          ['A get_ and a set_ that check nothing, around a name and a flavour', 1],
          ['Stopping a whole order with an error because the printer is out of paper', 1],
          ['Passing paper, ink and font on every call, though they never differ', 1],
          ['Rewriting "weekend hours or weekday hours" as a guard clause', 1]
        ],
        why: 'Each one on the left fixes a real problem at a small cost. Each one on the right pushes a good idea past the point where it helps: small functions, abstraction, encapsulation, fail fast, explicit over implicit and guard clauses, all overdone. They come from the "When not to" part of each lesson.',
        hint: 'Ask the two questions from lesson 4. Is the problem real right now? What will this cost the next reader?'
      },
      {
        type: 'pick', q: 'Sam has just finished this module and wants to improve this job. Only Maya decides what the label says, and nobody has had any trouble with it. What is the best call?',
        pic: code(labelCode, { title: 'labels.py' }),
        options: [
          'Cut it into six small jobs, one for each line',
          'Put box in a class with a get_ job for every value',
          'Leave it alone. It does one kind of work, for one person, and you can see all of it',
          'Make it raise an error when the printer is out of paper'
        ],
        answer: 2,
        why: 'Not every piece of code is broken. This job only prints, only Maya asks for changes to it, and it fits on the screen under one honest name. Each "improvement" pushes a principle too far: one-line jobs with no real names (lesson 17, Small functions), doors that check nothing (lesson 19, Encapsulation), and a crash over a paper roll (lesson 22, Fail fast). Lesson 4, Trade-offs, not laws, says: no real problem, no fix.',
        hint: 'Ask the first question from lesson 4. Is there a real problem here right now?',
        hints: {
          0: 'What would you call the job that prints line 4? If the best name is do_step_3, it is not a real step.',
          1: 'Would any of those get_ jobs check a rule? Lesson 19 called a door that checks nothing a hole with a longer name.',
          3: 'An empty paper roll is a normal hiccup, not a mistake inside the program. What did lesson 22 say to do about those?'
        }
      },
      {
        type: 'type', q: 'Back to lesson 3, Loose coupling. Flour lives in a <code>Pantry</code> class with two doors, <code>take_flour</code> and <code>flour_left</code>. Maya changes the inside of the class. It now counts flour in bags, and <code>_flour_kilos</code> is gone. Both doors work just as before. Ask the lesson 3 question: how many of these four jobs must change? Type the number.',
        pic: code(pantryCode, { title: 'four jobs that use the pantry' }),
        prompt: 'jobs >',
        answers: ['2', 'two'],
        why: '<code>monday_order</code> and <code>spring_clean</code> reach past the doors and touch <code>_flour_kilos</code> themselves, so both break. The other two only use the doors, and they never notice the swap. This is how lesson 19, Encapsulation, and lesson 3 work together. A job that reaches inside a part is tied to how that part is built. A job that uses the doors is tied only to the doors.',
        hint: 'Look for the jobs that touch a name starting with an underscore.'
      },
      {
        type: 'pick', q: 'Sam says: "<code>add_order</code> changes the list <b>and</b> hands something back. That breaks lesson 20, Command-query separation. Split it into two jobs." What is the best call?',
        pic: code(addOrderCode, { title: 'orders.py' }),
        options: [
          'Sam is right. Add a job order_count(orders), and make every caller use both',
          'Leave it. The name says it changes something, and the number is a small note about what it just did',
          'Leave it. Command-query separation does not apply to lists',
          'Rename it to order_count, so that it sounds like a question'
        ],
        answer: 1,
        why: 'The code is fine. Lesson 20 aims at the question that secretly changes things. <code>add_order</code> is not a question. Its name says it does something, and nobody calls it just to find something out. The number it hands back is a small note about what it just did, like the <code>True</code> or <code>False</code> from <code>card.spend</code>. And the split is less safe. With two tills, a second order can slip in between the adding and the counting. Then two customers are told the same number.',
        hint: 'Lesson 20 said a command may hand back a small note about what it just did. Does anyone call add_order just to ask a question?',
        hints: {
          0: 'Picture two tills. Each adds an order, and then each asks for the count. What number do both customers hear?',
          2: 'Right call, wrong reason. A question that quietly changed a list would break the rule too. Why is this job different?',
          3: 'Then a name that sounds like a question would change the list. That is the very thing lesson 20 warns about.'
        }
      },
      {
        type: 'pick', q: 'Back to module 1. Sam loved lesson 22, Fail fast, so he put the seats check into every job, "to be extra safe". Only <code>book_class</code> ever calls the other two. Compare lines 2, 8 and 13. Which earlier principle does this break?',
        pic: code(everyJobCode, { title: 'classes.py', hi: [2, 8, 13] }),
        options: ['KISS', 'DRY', 'Premature optimisation', 'Meaningful names'],
        answer: 1,
        why: 'One rule, "seats must be 1 or more", has three homes. Ask the question from lesson 6, DRY: if this rule changes, would I have to change it in more than one place? Yes, in three. And the copies have already drifted apart. Line 13 says <code>&lt;</code> where the other two say <code>&lt;=</code>, so it would let 0 seats through. Lesson 22 said the same: check once, at the door where the data comes in. Here that door is <code>book_class</code>.',
        hint: 'Suppose classes are now for 2 people or more. How many lines would Maya have to edit?',
        hints: {
          0: 'Each job reads aloud well enough. Compare lines 2, 8 and 13 with each other.',
          2: 'Nothing here was done for speed. Compare lines 2, 8 and 13 with each other.',
          3: 'The names are honest. Compare lines 2, 8 and 13 with each other.'
        }
      },
      {
        type: 'pick', q: 'Two principles pull against each other. Last week the stock screen said <b>-4 choc chip</b>. Sam says: "Lesson 19, Encapsulation. Put all three values behind <code>get_</code> and <code>set_</code> jobs." Maya says: "Lesson 5, KISS. Plain values are the simplest thing. Leave all three plain." What is the best call?',
        pic: code(trayCode, { title: 'tray.py', hi: [7, 10, 13] }),
        options: [
          'Sam. Every value in a class should sit behind a get_ and a set_',
          'Maya. Plain is simplest, and each job that takes cookies can remember to check',
          'Give count doors that check. Leave name and flavour plain, because they have no rule to keep',
          'Leave it all plain, and make the stock screen show 0 whenever the count is below zero'
        ],
        answer: 2,
        why: 'Ask the first lesson 4 question of each value: is the problem real right now? For <code>count</code> it is. A count must never go below zero, three jobs write to it, and it has already been wrong. So it earns a door, like <code>take(how_many)</code>, that checks before it changes anything. KISS asks for the simplest code that solves all of today\'s problem, and a tray that says -4 does not solve it. The name and the flavour have no rule to keep. A <code>get_</code> and a <code>set_</code> around them would be ceremony.',
        hint: 'Ask the first lesson 4 question for each of the three values. Which one has a rule, and has that rule really been broken?',
        hints: {
          0: 'What would set_flavour check? Lesson 19 called a door that checks nothing a hole with a longer name.',
          1: 'Three jobs already had to remember, and the screen said -4. How many places should hold the rule?',
          3: 'That hides the mistake at the place where it shows up. It does not stop it at the place where it is made.'
        }
      },
      {
        type: 'pick', q: 'Two principles pull against each other again. Nine jobs in the shop call <code>save_sale(sale)</code>. Sam says: "Lesson 23, Explicit over implicit. Each call should say where the sale goes, and how." Maya says: "Lesson 18, Abstraction. A caller should know what it does, not how." The file, the retries and the backup are the same for every caller. Who is right, and why?',
        pic: code(saveSaleCode, { title: 'till.py, today and with Sam\'s idea', hi: [8] }),
        options: [
          'Sam. Explicit always beats hidden, so a call should list everything the job uses',
          'Maya. Those details are the same for every caller, and behind the handle she can change them in one place',
          'Sam. Without those three inputs, a reader cannot tell that the sale is saved',
          'Maya. A job should never be handed more than one thing'
        ],
        answer: 1,
        why: 'Lesson 23 asks you to be explicit about what is surprising, risky, or different from one caller to the next. These three details are none of those. They are the <b>how</b>, and they are the same on every call. Spelling them out nine times buries the one input that matters, the sale. It also ties nine callers to a file name. On the day Maya moves the sales somewhere else, she would have to edit nine calls. Behind the handle, she edits one job. The last answer goes too far. In lesson 23, <code>sale_price</code> needed the day as a second input, because the day really did differ between callers.',
        hint: 'Would two callers ever want a different file, or a different number of retries?',
        hints: {
          0: 'Lesson 23 had a "When not to" part. What did it say about inputs that are the same on every call?',
          2: 'Read the name save_sale aloud. What does it already tell the reader?',
          3: 'Right person, wrong reason. sale_price(price, day) takes two things, and it needed both. Why is this case different?'
        }
      },
      {
        type: 'pick', q: 'The last one is a real mix. The till calls this job to decide whether to show a green tick. Only Maya sets the gift card rules. Try it with one case: a card that holds $3 is used for a $5 box. Which principles does the code break? Pick all that apply.',
        pic: code(tickCode, { title: 'gift_cards.py' }),
        options: ['Command-query separation', 'Guard clauses', 'Encapsulation', 'Single responsibility', 'Explicit over implicit'],
        answer: [0, 1, 2],
        why: 'The name sounds like a question, but line 4 takes money off the card: lesson 20, Command-query separation. Show the tick twice and the customer pays twice. The yes line is wrapped in two questions, with a ladder of <code>else</code> lines under it: lesson 21, Guard clauses. And line 4 writes straight into <code>card.dollars</code> after a weak check, so the $3 card ends at -$2: lesson 19, Encapsulation. The other two are fine. Only Maya asks for changes, and both inputs come in through the front. A good fix has three parts. Give the card a <code>spend(price)</code> door that refuses when there is too little. Turn this job into a question with two guards that only looks. And let the till call <code>spend</code> in plain sight.',
        hint: 'Check three things: the name against line 4, the shape of the ifs, and what the $3 card holds afterwards.'
      }
    ]
  });
})();
