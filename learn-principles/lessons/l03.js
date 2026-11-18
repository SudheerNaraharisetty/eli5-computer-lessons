/* Lesson 3: Loose coupling (module 0). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l03  Loose coupling
     ===================================================================== */
  const lamp = (x, y, fill) =>
    `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + 44}" stroke="${P.ink}" stroke-width="5" stroke-linecap="round"/>` +
    `<rect x="${x - 22}" y="${y + 44}" width="44" height="9" rx="4" fill="${P.ink}"/>` +
    `<path d="M${x - 30} ${y} L${x + 30} ${y} L${x + 18} ${y - 40} L${x - 18} ${y - 40}z" fill="${fill}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>`;

  const socketPic = svg(600, 290, 'A lamp plugged into a wall socket next to a lamp wired straight into the wall',
    T(150, 34, 'PLUGGED IN', { s: 12.5, f: P.ok }) + T(450, 34, 'WIRED INTO THE WALL', { s: 12.5, f: P.danger }) +
    `<line x1="300" y1="24" x2="300" y2="270" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    /* left: socket, plug, lamp */
    box(40, 96, 62, 86, P.white, 12) +
    `<rect x="58" y="124" width="7" height="22" rx="3" fill="${P.ink}"/><rect x="77" y="124" width="7" height="22" rx="3" fill="${P.ink}"/>` +
    `<path d="M158 139 C196 139 180 205 214 205" fill="none" stroke="${P.ink}" stroke-width="4" stroke-linecap="round"/>` +
    `<line x1="112" y1="131" x2="128" y2="131" stroke="${P.ink}" stroke-width="4" stroke-linecap="round"/><line x1="112" y1="147" x2="128" y2="147" stroke="${P.ink}" stroke-width="4" stroke-linecap="round"/>` +
    `<rect x="126" y="120" width="32" height="38" rx="8" fill="${P.accent}" stroke="${P.ink}" stroke-width="2.5"/>` +
    lamp(236, 156, P.warnT) +
    T(150, 244, 'they only agree on the plug shape', { s: 13, w: 700, f: P.ink2 }) +
    T(150, 264, 'swap the lamp in two seconds', { s: 13, f: P.ok }) +
    /* right: lamp wired into a hole in the wall */
    box(340, 76, 62, 126, P.sand, 8) +
    `<path d="M352 122 L366 112 L378 120 L392 114 L388 134 L394 150 L378 158 L364 152 L350 158 L356 140z" fill="${P.dangerT}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>` +
    `<path d="M368 130 C430 110 470 220 514 205" fill="none" stroke="${P.danger}" stroke-width="4" stroke-linecap="round"/>` +
    `<path d="M374 144 C420 170 450 150 514 205" fill="none" stroke="${P.ink}" stroke-width="4" stroke-linecap="round"/>` +
    lamp(536, 156, P.warnT) +
    T(450, 244, 'the lamp knows the wires in the wall', { s: 13, w: 700, f: P.ink2 }) +
    T(450, 264, 'to swap it, open the wall', { s: 13, f: P.danger }));

  const shopCode = [
    'def print_receipt(total):',
    '    printer.x200_memory.append(total)',
    '    printer.x200_motor.start()',
    '',
    'def kitchen_ticket(order):',
    '    printer.x200_memory.append(order)',
    '    printer.x200_motor.start()',
    '',
    'def loyalty_coupon(code):',
    '    printer.x200_memory.append(code)',
    '    printer.x200_motor.start()'
  ];
  const fixedCode = [
    'def print_line(text):',
    '    printer.zip_queue.add(text)',
    '    printer.zip_roller.roll()',
    '',
    'def print_receipt(total):',
    '    print_line(total)',
    '',
    'def kitchen_ticket(order):',
    '    print_line(order)',
    '',
    'def loyalty_coupon(code):',
    '    print_line(code)'
  ];

  const cross = (x, y) => `<path d="M${x - 7} ${y - 7} L${x + 7} ${y + 7} M${x + 7} ${y - 7} L${x - 7} ${y + 7}" stroke="${P.danger}" stroke-width="3.5" stroke-linecap="round"/>`;
  const snapPic = `<div style="width:100%">${code(shopCode, { title: 'shop.py, with the new printer', bad: [2, 3, 6, 7, 10, 11] })}` +
    svg(600, 176, 'Three parts of the shop each had two wires into the old printer. With the new printer all six wires are broken.',
      ['receipt', 'kitchen ticket', 'loyalty coupon'].map((s, i) => {
        const y = 14 + i * 52;
        return box(20, y, 160, 38, P.white, 10) + T(100, y + 24, s, { s: 13 }) +
          `<line x1="186" y1="${y + 12}" x2="${286 + i * 8}" y2="${52 + i * 18}" stroke="${P.danger}" stroke-width="3" stroke-linecap="round" stroke-dasharray="7 6"/>` + cross(294 + i * 8, 54 + i * 18) +
          `<line x1="186" y1="${y + 28}" x2="${262 + i * 8}" y2="${96 + i * 18}" stroke="${P.danger}" stroke-width="3" stroke-linecap="round" stroke-dasharray="7 6"/>` + cross(270 + i * 8, 98 + i * 18);
      }).join('') +
      box(390, 14, 190, 142, P.tint, 14) + T(485, 40, 'new printer: Zip 5', { s: 13 }) +
      box(410, 54, 150, 36, P.white, 10) + T(485, 77, 'zip_queue', { s: 13, m: true }) +
      box(410, 104, 150, 36, P.white, 10) + T(485, 127, 'zip_roller', { s: 13, m: true })) + `</div>`;

  const swapPic = svg(600, 300, 'Swapping a loosely coupled part changes one place. Swapping a tightly coupled part breaks three parts.',
    T(150, 34, 'LOOSE COUPLING', { s: 12.5, f: P.ok }) + T(450, 34, 'TIGHT COUPLING', { s: 12.5, f: P.danger }) +
    box(90, 54, 120, 46, P.warnT, 12) + T(150, 83, 'swap 1 part', { s: 14 }) +
    arrow(150, 106, 150, 168, P.ok, 3.5) +
    box(80, 176, 140, 46, P.okT, 12) + T(150, 205, 'fix 1 place', { s: 14, f: P.ok }) +
    T(150, 262, 'the other parts never notice', { s: 13, w: 700, f: P.ink2 }) +
    `<line x1="300" y1="24" x2="300" y2="280" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    box(390, 54, 120, 46, P.warnT, 12) + T(450, 83, 'swap 1 part', { s: 14 }) +
    [0, 1, 2].map(i => {
      const x = 356 + i * 94;
      return arrow(450, 106, x, 168, P.danger, 3) + box(x - 40, 176, 80, 46, P.dangerT, 12) + T(x, 205, 'broken', { s: 13, f: P.danger });
    }).join('') +
    T(450, 262, 'every part that knew its insides breaks', { s: 13, w: 700, f: P.ink2 }));

  const wrapPic = svg(600, 290, 'A plain sum next to the same sum buried inside three wrappers',
    T(150, 34, 'DIRECT', { s: 12.5, f: P.ok }) + T(450, 34, 'WRAPPED "JUST IN CASE"', { s: 12.5, f: P.danger }) +
    `<line x1="300" y1="24" x2="300" y2="270" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    box(80, 110, 140, 60, P.okT, 14) + T(150, 147, 'price + tip', { s: 15, m: true }) +
    T(150, 244, 'one line to read', { s: 13, w: 700, f: P.ink2 }) +
    box(330, 56, 240, 168, P.dangerT, 18) + T(450, 78, 'wrapper', { s: 12, f: P.danger }) +
    box(352, 88, 196, 122, P.white, 16) + T(450, 109, 'wrapper', { s: 12, f: P.danger }) +
    box(374, 119, 152, 78, P.dangerT, 14) + T(450, 139, 'wrapper', { s: 12, f: P.danger }) +
    box(396, 149, 108, 36, P.white, 10) + T(450, 173, 'price + tip', { s: 12.5, m: true }) +
    T(450, 250, '3 layers to open', { s: 13, w: 700, f: P.ink2 }) + T(450, 268, 'to find the same line', { s: 13, w: 700, f: P.ink2 }));

  COURSE.add({
    id: 'l03', minutes: 7,
    summary: 'A program is made of parts that talk to each other. <b>Loose coupling</b> means each part knows as little as possible about the others, so you can swap one without breaking the rest.',
    video: {
      src: 'videos/l03-loose-coupling.mp4', poster: 'videos/l03-loose-coupling.jpg', length: '1 min 2 s',
      script: [
        'Meet Maya again. Her cookie shop has a receipt printer, the X200.',
        'Three parts of her program use it. The receipt, the kitchen ticket, and the loyalty coupon.',
        "Here is the code. Look closely. Every part reaches right inside the printer. Into its memory, and into its motor. 6 lines that know this printer's insides.",
        'Then the printer breaks. Maya buys a different brand. Inside, nothing has the same name. So every line snaps. 1, 2, 3, 4, 5, 6. All she did was swap a printer.',
        "The fix is one small job, called print_line. Only it knows the printer's insides. Every other part just asks it to print.",
        'Next time the printer changes, Maya fixes one place. The other parts never notice.',
        'That is loose coupling. Parts that know as little as possible about each other.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: socketPic,
        h: 'Agree on the plug, nothing more.',
        text: [
          'A lamp works in any wall socket. The lamp and the wall agree on one small thing: <b>the shape of the plug</b>. Neither knows anything else about the other.',
          'Now picture a lamp wired straight into the wall. To swap it, you have to open the wall.',
          '<b>Coupling</b> is how much one part of a program needs to know about another part. <b>Loose coupling</b> means it knows as little as possible.'
        ],
        tip: 'Lesson 2, High cohesion, was about what goes <b>inside</b> one part. Coupling is about the <b>connections between</b> parts.'
      },
      {
        label: 'The code', pic: code(shopCode, { title: 'shop.py', hi: [2, 3, 6, 7, 10, 11] }),
        h: 'Three parts, one printer.',
        text: [
          "Maya's shop prints three things: a receipt, a ticket for the kitchen, and a loyalty coupon. Her printer is a model called the X200.",
          'In code, a dot means "reach inside". So <code>printer.x200_memory</code> reaches inside the printer for its memory, the list of lines waiting to be printed. <code>.append(total)</code> adds one more line to that list.',
          '<code>printer.x200_motor.start()</code> reaches inside again and starts the motor that pushes the paper out.',
          'Count the lines that reach inside the printer. <b>Six.</b> Three parts of the shop all know how this one printer works inside.'
        ]
      },
      {
        label: 'The pain', pic: snapPic,
        h: 'One new printer, three broken parts.',
        text: [
          'The X200 breaks. Maya buys a different brand, the Zip 5. Inside, it has a <code>zip_queue</code> and a <code>zip_roller</code>. Nothing is called <code>x200</code> any more.',
          'All six lines ask for things that no longer exist. The receipt crashes. The kitchen ticket crashes. The loyalty coupon crashes.',
          'Maya only swapped a printer. Now she has to open <b>three parts</b> of her shop and fix <b>six lines</b>.'
        ],
        warn: 'The new printer is not the problem. The problem is that three parts knew the old printer\'s insides. That is called <b>tight coupling</b>.'
      },
      {
        label: 'The fix', pic: code(fixedCode, { title: 'shop.py, fixed', good: [1, 2, 3], hi: [6, 9, 12] }),
        h: 'One small job that knows.',
        text: [
          'Maya writes one small job, <code>print_line</code>. It is the <b>only place</b> that reaches inside the printer.',
          'The receipt, the kitchen ticket and the coupon just say <code>print_line(...)</code>. They no longer know which printer sits on the counter, or what is inside it.',
          'Next time the printer changes, Maya fixes lines 2 and 3. The other three parts <b>do not change at all</b>.'
        ],
        tip: '<code>print_line</code> is a small agreed way of talking, like the plug shape. You will go deeper into this idea in lesson 19, Encapsulation, and lesson 25, Law of Demeter.'
      },
      {
        label: 'The test', pic: swapPic,
        h: 'Imagine a swap.',
        text: [
          'Pick one part and imagine replacing it with a different one. Ask: <b>"If this part is swapped, how many other parts must change?"</b>',
          'None or one means the parts are loosely coupled. Many means they know too much about each other.'
        ],
        tip: 'A quick sign in code: a chain of dots like <code>printer.x200_motor.start()</code>. Each extra dot reaches one step deeper inside another part.'
      },
      {
        label: 'When not to', pic: wrapPic,
        h: "Don't wrap everything.",
        text: [
          'Parts <b>must</b> talk to each other, or the program does nothing. Zero coupling is impossible. The goal is less, not none.',
          'And do not put a wrapper around every single thing "just in case". Each extra layer is one more place to look when you read the code.',
          'Loosen the connections to things that are <b>likely to change</b>, like a printer, a card reader or an outside service. Leave simple, steady things alone.'
        ],
        warn: 'How much is too much? There is no fixed answer. That is the subject of lesson 4, Trade-offs, not laws.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does "coupling" measure?',
        options: ['How fast two parts run', 'How much one part needs to know about another', 'How many lines a part has', 'How many parts a program has'],
        answer: 1,
        why: 'The less a part knows about the others, the looser the coupling, and the easier it is to swap one part.',
        hint: 'Think of the lamp and the wall. What do they need to know about each other?'
      },
      {
        type: 'pick', q: 'Which line reaches deep inside another part?',
        pic: code([
          'def take_payment(total):',
          '    reader.charge(total)',
          '',
          'def refund(total):',
          '    reader.chip_v2.pins.send(total)',
          '',
          'def show_total(total):',
          '    display(total)'
        ], { title: 'payments.py' }),
        options: ['Line 2', 'Line 5', 'Line 8', 'None of them'],
        answer: 1,
        why: 'Line 5 knows the reader has a <code>chip_v2</code> and that the chip has <code>pins</code>. A new card reader would break it. Line 2 only asks the reader to charge.',
        hint: 'Look for the longest chain of dots.'
      },
      {
        type: 'pick', q: 'Maya buys a new scale with different insides. How many jobs must she fix?',
        pic: code([
          'def weigh(item):',
          '    return scale.kilo9_sensor.read(item)',
          '',
          'def price_cookies(bag):',
          '    return weigh(bag) * 12',
          '',
          'def price_cake(cake):',
          '    return weigh(cake) * 20',
          '',
          'def shipping_cost(box):',
          '    return weigh(box) * 3'
        ], { title: 'scale.py' }),
        options: ['1', '2', '3', '4'],
        answer: 0,
        why: 'Only <code>weigh</code> reaches inside the scale. The three pricing jobs just call <code>weigh</code>, so they never notice the swap.',
        hint: 'Which jobs mention the insides of the scale?'
      },
      {
        type: 'order', q: "Put Maya's printer story in order.",
        items: ['Three parts reach inside the X200 printer', 'The X200 breaks and Maya buys a different brand', 'Six lines crash in three parts of the shop', 'Maya writes print_line, the only job that knows the printer', 'The next printer swap changes one place'],
        why: 'The trouble was built in from the start. It only showed up on the day the printer changed.',
        hint: 'The problem begins with how the code was first written.'
      },
      {
        type: 'bucket', q: 'Loose coupling or tight coupling?',
        buckets: ['Loose coupling', 'Tight coupling'],
        items: [
          ['A lamp with a plug', 0],
          ['Other parts just call print_line(text)', 0],
          ['You can swap one part and the rest never notice', 0],
          ['A lamp wired straight into the wall', 1],
          ['Three parts all use printer.x200_motor', 1],
          ['A new printer breaks the loyalty coupon', 1]
        ],
        why: 'Loose coupling means a small agreed way of talking. Tight coupling means knowing the insides.'
      },
      {
        type: 'fill', q: 'Finish the fix so only one job knows the printer.',
        text: 'def print_line(text):\n    printer.zip_queue.add(text)\n    printer.zip_roller.roll()\n\ndef print_receipt(total):\n    ___(total)\n\ndef kitchen_ticket(order):\n    ___(order)',
        options: ['print_line', 'print_line', 'printer.zip_queue.add', 'printer.x200_motor.start'],
        answer: ['print_line', 'print_line'],
        why: 'Both parts ask <code>print_line</code> to do the printing. Neither one reaches inside the printer.',
        hint: 'Both blanks take the same name. Neither blank mentions the printer.'
      },
      {
        type: 'match', q: 'Bring back lessons 1 and 2. Match each idea to its test question.',
        pairs: [
          ['Easy to change', 'If one thing changes, how many places must I touch?'],
          ['High cohesion', 'Do the things that change together live together?'],
          ['Loose coupling', 'If this part is swapped, how many other parts must change?']
        ],
        why: 'Cohesion looks inside one part. Coupling looks at the connections between parts. Both serve lesson 1: code that is easy to change.',
        hint: 'Cohesion is about what lives together. Coupling is about swapping a part.'
      },
      {
        type: 'pick', q: 'When is it worth loosening a connection? Pick all that apply.',
        options: ['The other part is likely to be swapped one day, like a printer', 'Many parts would break if the other part changed', 'Always, around every single line, just in case', 'Never, because parts should not talk at all'],
        answer: [0, 1],
        why: 'Loosen the connections that are likely to hurt. Wrapping everything makes code harder to follow, and parts that never talk do nothing.',
        hint: 'Two answers go too far in opposite directions.'
      }
    ]
  });
})();
