/* Lesson 38: Least privilege (module 4). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l38  Least privilege
     ===================================================================== */
  const tick = (x, y, col) => `<circle cx="${x}" cy="${y}" r="11" fill="${col || P.ok}" stroke="${P.ink}" stroke-width="2"/><path d="M${x - 5} ${y} l4 4 l7 -8" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`;
  const dash = (x, y) => `<rect x="${x - 7}" y="${y - 2}" width="14" height="4" rx="2" fill="#C9C3BA"/>`;
  const lock = (x, y) => `<circle cx="${x}" cy="${y}" r="11" fill="${P.ink}"/><path d="M${x - 3.5} ${y - 1} v-3 a3.5 3.5 0 0 1 7 0 v3" fill="none" stroke="#fff" stroke-width="2"/><rect x="${x - 5.5}" y="${y - 1.5}" width="11" height="8" rx="2" fill="#fff"/>`;
  const keyShape = (x, y, fill, s) => `<g transform="translate(${x} ${y}) scale(${s || 1})"><path d="M-4 14 h8 v40 h-8 z M4 32 h8 v8 h-8 z M4 44 h6 v7 h-6 z" fill="${fill}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/><circle cx="0" cy="0" r="13" fill="${fill}" stroke="${P.ink}" stroke-width="2.5"/><circle cx="0" cy="0" r="4.5" fill="#fff" stroke="${P.ink}" stroke-width="2"/></g>`;

  // The idea: a hotel key card opens two doors, not every door.
  const hotelPic = svg(600, 290, 'A hotel key card opens your own room and the gym. Every other door stays shut.',
    T(300, 30, 'One key card, two doors', { s: 16 }) +
    [['Room 11', 0], ['Room 12', 1], ['Room 13', 0], ['Gym', 1], ['Office', 0]].map((d, i) => {
      const x = 28 + i * 112, open = d[1];
      return box(x, 56, 96, 130, open ? P.okT : P.white, 10) +
        T(x + 48, 92, d[0], { s: 14, f: open ? P.ok : P.ink }) +
        (i === 1 ? T(x + 48, 110, 'yours', { s: 12, w: 700, f: P.ok }) : '') +
        (open ? tick(x + 48, 146) : lock(x + 48, 146));
    }).join('') +
    box(214, 216, 172, 50, P.tint, 12) + `<rect x="228" y="232" width="34" height="18" rx="4" fill="${P.accent}"/>` + T(318, 247, 'your key card', { s: 13.5 }) +
    arrow(250, 214, 196, 192, P.ok, 2.5) + arrow(350, 214, 404, 192, P.ok, 2.5));

  const beforeCode = [
    '# labels.py: Leo runs this every Saturday',
    '',
    'def make_labels(shop):',
    '    todo = shop.menu',
    '    for item in todo:',
    '        print_label(item)',
    '    todo.clear()        # tidy up my own list',
    '',
    'make_labels(shop)       # handed the whole shop'
  ];
  const afterCode = [
    '# labels.py: handed only what it needs',
    '',
    'def make_labels(item_names):',
    '    todo = item_names',
    '    for item in todo:',
    '        print_label(item)',
    '    todo.clear()        # the bug is still here',
    '',
    'make_labels(tuple(shop.menu))   # a sealed copy'
  ];
  const modeCode = [
    'book = open("sales.txt", "r")   # r: read only',
    'book.write("oops")              # refused: not writable',
    '',
    'book = open("sales.txt", "a")   # a: add to the end',
    'book.write("cake 20")           # fine. Old lines stay',
    '',
    'book = open("sales.txt", "w")   # w: wipe, then write',
    '                                # every old sale is gone'
  ];

  const ringPic = svg(600, 150, "Maya's one login carries five keys: the till, the menu, the sales records, the customer details and the safe. Leo is using it, and so is his label program.",
    T(300, 24, "Maya's login, now in Leo's hands", { s: 14 }) +
    `<path d="M60 62 Q300 26 540 62" fill="none" stroke="${P.ink}" stroke-width="3" stroke-linecap="round"/>` +
    ['till', 'menu', 'sales', 'customers', 'safe'].map((n, i) => {
      const x = 80 + i * 110, y = [66, 54, 50, 54, 66][i];
      return keyShape(x, y, '#FFC24B') + T(x, y + 78, n, { s: 12.5, w: 700, f: P.ink2 });
    }).join(''));

  // Floor plan of the shop. all=true: the master key, everything is in reach.
  function plan(all) {
    const rooms = [['Till', 0, 0], ['Menu', 1, 0], ['Sales records', 2, 0], ['Labels', 0, 1], ['Customer details', 1, 1], ['Safe', 2, 1]];
    const W = 170, H = 84, X0 = 30, GAP = 15, Y0 = 50, HALL = 36;
    let s = T(300, 28, all ? "Leo logs in as Maya" : 'Leo logs in as leo-labels', { s: 15 }) +
      `<rect x="${X0}" y="${Y0 + H}" width="${W * 3 + GAP * 2}" height="${HALL}" fill="${all ? P.dangerT : P.sand}" stroke="${P.ink}" stroke-width="2.5"/>`;
    rooms.forEach(r => {
      const x = X0 + r[1] * (W + GAP), y = Y0 + r[2] * (H + HALL);
      const red = all || r[0] === 'Labels';
      const dy = r[2] ? y : y + H, dx = x + 112;
      s += `<rect x="${x}" y="${y}" width="${W}" height="${H}" rx="8" fill="${red ? P.dangerT : P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
        T(x + 12, y + (r[2] ? 70 : 24), r[0], { s: 13, a: 'start', f: red ? P.danger : P.ink });
      if (red) {
        // open door: a gap in the wall and a leaf swung into the room
        s += `<line x1="${dx}" y1="${dy}" x2="${dx + 36}" y2="${dy}" stroke="${all ? P.dangerT : P.sand}" stroke-width="4"/>` +
          `<line x1="${dx + 36}" y1="${dy}" x2="${dx + 44}" y2="${dy + (r[2] ? 30 : -30)}" stroke="${P.ink}" stroke-width="4" stroke-linecap="round"/>`;
      } else if (r[0] === 'Menu') {
        s += `<rect x="${x + 82}" y="${dy - 30}" width="78" height="22" rx="11" fill="${P.ok}"/>` + T(x + 121, dy - 15, 'read only', { s: 11.5, f: '#fff' });
      } else {
        s += lock(dx + 18, dy + (r[2] ? 20 : -20));
      }
    });
    s += all
      ? T(X0 + W + GAP + 60, Y0 + 52, 'emptied', { s: 12.5, f: P.danger })
      : T(X0 + 12, Y0 + H + HALL + 48, 'worst case: wrong labels', { s: 11.5, w: 700, a: 'start', f: P.danger });
    s += box(150, 268, 300, 40, all ? P.danger : P.white, 12) +
      T(300, 294, all ? 'Blast radius: the whole shop' : 'Blast radius: the label corner', { s: 14, f: all ? '#fff' : P.danger });
    return svg(600, 326, all
      ? 'With Maya\'s login every door is open, so a mistake that starts in the label corner can reach every room. Blast radius: the whole shop.'
      : 'With the leo-labels login every other door is shut and the menu is read only. Only the label corner can be harmed. Blast radius: the label corner.', s);
  }

  const cols = ['Read menu', 'Print labels', 'Change prices', 'Give refunds', 'Customer details', 'Sales records'];
  const tablePic = svg(600, 232, 'A table of who is allowed to do what. Maya has every tick. Leo and labels.py have two each: read the menu and print labels. The checkout can read the menu and add to the sales records.',
    box(20, 16, 560, 200, P.white, 14) +
    `<rect x="20" y="16" width="560" height="56" rx="14" fill="${P.sand}" stroke="${P.ink}" stroke-width="2.5"/>` +
    cols.map((c, i) => { const x = 190 + i * 70, w = c.split(' '); return T(x, 40, w[0], { s: 11.5 }) + T(x, 55, w[1], { s: 11.5 }); }).join('') +
    [['Maya (admin)', [1, 1, 1, 1, 1, 1]], ['Leo', [1, 1, 0, 0, 0, 0]], ['labels.py', [1, 1, 0, 0, 0, 0]], ['checkout.py', [1, 0, 0, 0, 0, 2]]].map((r, j) => {
      const y = 98 + j * 34;
      return T(36, y + 5, r[0], { s: 13, a: 'start', m: j > 1 }) +
        (j ? `<line x1="30" y1="${y - 17}" x2="570" y2="${y - 17}" stroke="${P.sand}" stroke-width="2"/>` : '') +
        r[1].map((v, i) => { const x = 190 + i * 70; return v === 2 ? T(x, y + 5, 'add only', { s: 10.5, f: P.ok }) : v ? tick(x, y) : dash(x, y); }).join('');
    }).join(''));

  const overPic = svg(600, 280, 'Locks that are too tight: the password ends up on a sticky note and the door is propped open with a chair. A simple split into an everyday login and an admin login is enough for a small shop.',
    T(150, 30, 'TOO TIGHT', { s: 12.5, f: P.danger }) + T(450, 30, 'ENOUGH FOR A SMALL SHOP', { s: 12.5, f: P.ok }) +
    box(60, 60, 180, 110, '#15132B', 12) + T(150, 104, 'ask Maya', { s: 13, f: '#ECEAFF' }) + T(150, 124, 'for every click', { s: 13, f: '#ECEAFF' }) +
    `<rect x="176" y="134" width="96" height="62" fill="#FFE38A" stroke="${P.ink}" stroke-width="2.5" transform="rotate(7 224 165)"/>` +
    `<g transform="rotate(7 224 165)">` + T(224, 158, "Maya's", { s: 11.5 }) + T(224, 174, 'password', { s: 11.5 }) + T(224, 189, 'cookie123', { s: 11, m: true, f: P.danger }) + `</g>` +
    T(150, 232, 'people stick the master', { s: 13, w: 700, f: P.ink2 }) + T(150, 250, 'password on the screen', { s: 13, w: 700, f: P.ink2 }) +
    `<line x1="300" y1="20" x2="300" y2="264" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    box(340, 70, 100, 96, P.okT, 12) + keyShape(390, 96, '#7CF0B5', 0.8) + T(390, 156, 'everyday', { s: 12.5, f: P.ok }) +
    box(460, 70, 100, 96, P.warnT, 12) + keyShape(510, 96, '#FFC24B', 0.8) + T(510, 156, 'admin', { s: 12.5, f: P.warn }) +
    T(450, 204, 'sell and print with one', { s: 13, w: 700, f: P.ink2 }) + T(450, 222, 'change prices and refund', { s: 13, w: 700, f: P.ink2 }) + T(450, 240, 'with the other', { s: 13, w: 700, f: P.ink2 }));

  COURSE.add({
    id: 'l38', minutes: 9,
    summary: 'Give every person, every program and every piece of code the smallest set of permissions that still lets it do its job, and nothing more. That is <b>least privilege</b>. Mistakes and break-ins will happen. What a thing is allowed to do sets the limit on the damage.',
    video: {
      src: 'videos/l38-least-privilege.mp4', poster: 'videos/l38-least-privilege.jpg', length: '1 min 4 s',
      script: [
        'Maya hires Leo to print price labels on Saturdays. To save time, she gives him her own login. It opens every room in the shop. The till. The menu. The sales records. The customer details. The safe.',
        "Leo's label program runs with that same key. One Saturday it has a bug. It meant to clear its own list. It empties the menu.",
        'How much worse could it get? As bad as the key allows. Every door it opens is a door the damage can walk through. People call that the blast radius. Here, it is the whole shop.',
        'So Maya gives Leo his own login. One small key. It can read the menu, and print labels. Nothing else.',
        'Same Saturday. Same bug. It tries to empty the menu. Refused. Every other door is shut. The worst a mistake can do now is spoil some labels.',
        'That is least privilege. Give every person, and every piece of code, only the access the job needs.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: hotelPic,
        h: 'A key card, not a master key.',
        text: [
          'A hotel key card opens <b>your room and the gym</b>. It does not open every room. A valet key starts the car but does not open the glovebox. You give the dog-sitter the front door key, not your bank card.',
          'Nobody thinks the guest, the valet or the dog-sitter is a thief. Keys get lost and people make mistakes. A small key can only cause a small problem.',
          'A <b>privilege</b> is a permission: something you are allowed to do. <b>Least privilege</b> means every person, every program and every piece of code gets the <b>smallest set of permissions that still lets it do its job</b>, for as long as it needs them, and nothing more.',
          'When something goes wrong, the damage is limited by what that one thing was <b>allowed</b> to do. People call that limit the <b>blast radius</b>: how far the harm can spread from the place it started.'
        ],
        tip: 'The principle was set out by Jerome Saltzer and Michael Schroeder in a 1975 paper about protecting information in computer systems. Lesson 31, Interface segregation, said a part should only be offered the abilities it uses. This is the safety version of the same instinct.'
      },
      {
        label: 'The code', pic: `<div style="width:100%">${code(beforeCode, { title: 'labels.py', hi: [3, 9] })}${ringPic}</div>`,
        h: 'The weekend helper gets the master key.',
        text: [
          'Maya hires Leo, a student, to print price labels on Saturdays. Setting up a login for him feels like a chore. So she gives him <b>her own</b>. That login can change prices, give refunds, see every customer\'s phone number and address, and delete sales records.',
          'Leo writes a small program for the job. A program runs with the powers of <b>whoever runs it</b>. Leo is logged in as Maya, so as far as the computer can tell, <code>labels.py</code> is Maya.',
          'Now read the code. In lesson 33, Dependency injection, a job was handed its parts. Line 9 hands this job <code>shop</code>: the whole shop. The menu is in there as <code>shop.menu</code>, next to <code>shop.sales</code> and <code>shop.customers</code>.',
          'Lines 5 and 6 are a loop, as in lesson 10. They print one label for each item. Line 7 is new: <code>.clear()</code> <b>empties a list</b>.',
          'Count what the job needs: the names and prices on the menu, to read. Count what it was handed: <b>everything, with the power to change it</b>.'
        ]
      },
      {
        label: 'The pain', pic: plan(true),
        h: 'How bad is it? As bad as the key allows.',
        text: [
          'Look at line 4 again. Lesson 36, Immutability, showed this trap. <code>todo = shop.menu</code> copies nothing. It is a <b>second name for the same list</b>. So when line 7 tidies up "my own list", it empties the real menu.',
          'It is Saturday, the busiest day. The till looks up a price and finds no cookies at all. Nothing crashed in <code>labels.py</code>. It printed every label and finished happily.',
          'Now ask the real question. <b>How bad could this have been?</b> One wrong word and line 4 could have said <code>shop.sales</code> or <code>shop.customers</code>. Nothing would have stopped it. The blast radius of this little label job is the whole shop.',
          'The same is true of Leo. Suppose he gets an email about a "delivery problem", clicks the link and types the password into a fake page. A stranger now holds the key to prices, refunds, the books and every customer\'s personal details. And because the login is shared, the records only ever say "Maya did it".'
        ],
        warn: 'Leo is not careless and he is not a thief. The size of the disaster was decided on the day Maya handed over the big key, long before anything went wrong.'
      },
      {
        label: 'The fix', pic: `<div style="width:100%">${code(afterCode, { title: 'labels.py, handed less', good: [3, 9], bad: [7] })}${plan(false)}</div>`,
        h: 'Give each job its own small key.',
        text: [
          '<b>For the code: hand it less.</b> The job now gets <code>item_names</code>, not <code>shop</code>. It cannot touch the sales or the customers, because it was never given them.',
          '<b>And hand it read-only.</b> A tuple is the sealed list from lesson 36. <code>tuple(shop.menu)</code> makes a sealed copy of the menu. The bug on line 7 is still there, on purpose. Run it. The labels print, then Python stops with <code>\'tuple\' object has no attribute \'clear\'</code>. The real menu is untouched, and Leo can see exactly which line to delete.',
          '<b>For Leo: his own login.</b> Maya makes one called <code>leo-labels</code>. It can read the menu and print. Nothing else. Now the fake email wins a stranger one small key. Maya switches off that one login, and nobody else is locked out.',
          'Four habits go with this. <b>One account per person</b>, never a shared password, so you can also tell who did what. <b>Keep secrets out of the code.</b> The payment company\'s key must not be typed into a file that every helper, and every copy of the code, can read. <b>Give temporary access an end date.</b> And <b>look through the list now and then</b>, and remove what people no longer need.'
        ],
        tip: 'Least privilege did not fix the bug. It made the bug small. That is the point: you will never catch every mistake, so decide in advance how far one can spread.'
      },
      {
        label: 'The test', pic: `<div style="width:100%">${tablePic}${code(modeCode, { title: 'three ways to open the sales book', good: [1, 4], bad: [7, 8] })}</div>`,
        h: 'What is the worst it could do?',
        text: [
          'Point at any account, or any piece of code, and ask: <b>"If this went wrong or was stolen right now, what is the worst it could do? And does it need all of that to do its job?"</b>',
          'Try it on Leo with Maya\'s login. The worst: everything. Does printing labels need refunds? No. Try it on <code>leo-labels</code>. The worst: some wrong labels. Does the job need that much? Yes. That row of the table is right.',
          'The same test works on a single file. To keep this small, picture the sales book as a plain text file. <code>open</code> asks the computer for a file, and the letter after the name says <b>what you plan to do with it</b>. <code>"r"</code> means read only, <code>"a"</code> means add to the end, and <code>"w"</code> means wipe it and start writing.',
          'The checkout only ever adds a sale, so it should ask for <code>"a"</code>. The weekly report only reads, so it asks for <code>"r"</code>. Then a slip in either one cannot erase the past. Almost nothing in the shop needs <code>"w"</code> on the sales book.'
        ],
        tip: 'An empty box in the table is not an insult. It is a promise: whatever goes wrong with that row, it cannot go wrong over there.'
      },
      {
        label: 'When not to', pic: overPic,
        h: 'A lock nobody can live with gets propped open.',
        text: [
          '<b>Locks cost convenience.</b> Suppose Maya loves this lesson and locks everything. Leo must ask her before each print. Sam cannot give a refund while she is at the bank. Within a week her password is on a sticky note by the till. That is <b>worse than before</b>, because now it looks safe.',
          '<b>Match the locks to the shop.</b> For a shop of one person, twelve kinds of login are theatre. A simple split is enough: an everyday login for selling, and a separate admin login for changing prices and giving refunds. Lesson 4, Trade-offs, not laws, asked whether the problem is real right now.',
          '<b>Start from nothing and add what is asked for.</b> When someone needs more to do their job, give it quickly. If asking is slow or awkward, people will find a way around you, and you will not know about it.'
        ],
        warn: 'The goal is not the fewest permissions. It is the fewest that still let everyone do their work. A helper who cannot do the job has too little, and that is a mistake too.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'This job emails one receipt. What is the worst it could do if it had a bug?',
        pic: code([
          'def email_receipt(shop, order):',
          '    address = order.email',
          '    send_email(address, "Thanks! Total: " + str(order.total))',
          '',
          'email_receipt(shop, order)'
        ], { title: 'receipt.py' }),
        options: ['Only send one wrong email', 'Anything that can be done to the whole shop', 'Nothing, because it only reads', 'Only change this one order'],
        answer: 1,
        why: 'It uses two facts from one order, but it was handed <code>shop</code>. Its blast radius is everything inside <code>shop</code>. Hand it the address and the total, and the worst case shrinks to one wrong email.',
        hint: 'Do not look at what it uses. Look at what it was handed on line 1.'
      },
      {
        type: 'bucket', q: 'Leo prints price labels on Saturdays. What should his login be able to do?',
        buckets: ['Needs it', 'Does not need it'],
        items: [
          ['Read the item names', 0],
          ['Read the prices', 0],
          ['Use the label printer', 0],
          ['Change a price', 1],
          ['Give a refund', 1],
          ['See customer addresses', 1],
          ['Delete a sales record', 1]
        ],
        why: 'A label is a name and a price on paper. Reading and printing is the whole job. Everything else is power he would carry around for nothing.'
      },
      {
        type: 'type', q: 'The checkout only ever <b>adds</b> a new sale to the end of the sales book. Which letter should it open the file with?',
        context: ['# checkout.py', 'book = open("sales.txt", "?")', 'book.write("cake 20")'],
        title: 'checkout.py',
        prompt: 'letter >',
        answers: ['a', '"a"'],
        why: '<code>"a"</code> can only add to the end. A bug in the checkout can write a bad line, but it cannot wipe last month.',
        hint: 'r is read only. w wipes the file first. One letter is left.'
      },
      {
        type: 'pick', q: 'Leo types his <code>leo-labels</code> password into a fake page. What can the stranger do with it? Pick all that apply.',
        options: ['Read the menu', 'Print labels on the shop printer', 'Refund themselves $500', 'Download every customer\'s address'],
        answer: [0, 1],
        why: 'A stolen key opens exactly what the key opened. Maya switches off one login and the damage stops at the label corner.',
        hint: 'The stranger gets what Leo\'s login had. No more.'
      },
      {
        type: 'fill', q: 'Finish the fix so the label job gets only the names, and cannot change them.',
        text: 'def make_labels(___):\n    for item in item_names:\n        print_label(item)\n\nmake_labels(___(shop.menu))',
        options: ['item_names', 'tuple', 'shop', 'list'],
        answer: ['item_names', 'tuple'],
        why: 'Hand it less: the names, not the shop. And hand it sealed: a tuple cannot be emptied.',
        hint: 'The first blank is the name the loop uses. The second makes a sealed copy.'
      },
      {
        type: 'match', q: 'Match each habit to the trouble it prevents.',
        pairs: [
          ['One account per person', 'Something was deleted and the records only say "Maya did it"'],
          ['Keep secrets out of the code', 'Every helper who can read the files also holds the payment key'],
          ['Give access an end date', 'The holiday helper from last winter can still log in'],
          ['Make it easy to ask for more', 'People share the admin password to get their work done']
        ],
        why: 'Each habit closes one way that a small key quietly turns back into a big one.'
      },
      {
        type: 'pick', q: 'Back to lesson 33, Dependency injection. Which version makes it <b>possible</b> to give the label job less?',
        pic: code([
          '# version A',
          'def make_labels():',
          '    for item in load_everything().menu:',
          '        print_label(item)',
          '',
          '# version B',
          'def make_labels(item_names):',
          '    for item in item_names:',
          '        print_label(item)'
        ], { title: 'two label jobs' }),
        options: ['A, because it asks nobody for anything', 'B, because the caller decides what it is handed', 'Both are the same', 'Neither'],
        answer: 1,
        why: 'Version A fetches for itself, so it can fetch anything. Version B can only use what it is handed, so the caller can choose to hand it very little.',
        hint: 'Which one lets somebody else choose what it gets?'
      },
      {
        type: 'pick', q: 'Maya locks the till so tightly that Sam must phone her for every refund. A week later her password is on a sticky note. What went wrong?',
        options: ['Sam is dishonest', 'The permissions were too tight for the job, so people went around them', 'Least privilege never works in a shop', 'The sticky note was the wrong colour'],
        answer: 1,
        why: 'Least privilege means the smallest set that still lets the job get done. Too little is also a mistake, and the workaround is usually worse than the problem.',
        hint: 'Sam still had to do his job somehow.'
      }
    ]
  });
})();
