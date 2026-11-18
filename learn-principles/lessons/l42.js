/* Lesson 42: Statelessness (module 4). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l42  Statelessness
     ===================================================================== */
  const divider = (x, y1, y2) => `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>`;

  /* ---- The idea: a call centre with notes in one head, or in one shared file ---- */
  const agents = (x0, fills, names) => names.map((n, i) => box(x0 + i * 98, 120, 80, 40, fills[i], 10) + T(x0 + i * 98 + 40, 145, n, { s: 13 })).join('');
  const ideaPic = svg(600, 300, 'Two call centres. In the first, only Dana has your notes, and Dana is away, so the other agents cannot help. In the second, every agent can open the shared notes for case 311, so any agent can help.',
    T(150, 24, 'THE NOTES ARE WITH ONE AGENT', { s: 12.5, f: P.danger }) + T(450, 24, 'THE NOTES ARE SHARED', { s: 12.5, f: P.ok }) +
    divider(300, 14, 288) +
    box(105, 40, 90, 36, P.white, 10) + T(150, 63, 'you', { s: 13 }) +
    arrow(150, 82, 56, 114, P.ink, 2.5) + arrow(150, 82, 150, 114, P.ink, 2.5) + arrow(150, 82, 244, 114, P.ink, 2.5) +
    agents(12, [P.dangerT, P.white, P.white], ['Dana', 'Eli', 'Fay']) +
    T(52, 180, 'away today', { s: 12, w: 700, f: P.danger }) + T(150, 180, '"Who are you?"', { s: 12, w: 700, f: P.ink2 }) + T(248, 180, '"Who are you?"', { s: 12, w: 700, f: P.ink2 }) +
    box(12, 200, 80, 40, P.warnT, 10) + T(52, 225, 'her notes', { s: 12 }) +
    T(150, 276, 'Only Dana can help you.', { s: 13, w: 700, f: P.ink2 }) +
    box(385, 40, 130, 36, P.white, 10) + T(450, 63, 'you: case 311', { s: 13 }) +
    arrow(450, 82, 356, 114, P.ink, 2.5) + arrow(450, 82, 450, 114, P.ink, 2.5) + arrow(450, 82, 544, 114, P.ink, 2.5) +
    agents(312, [P.okT, P.okT, P.okT], ['Dana', 'Eli', 'Fay']) +
    arrow(352, 166, 420, 198, P.ok, 2.5) + arrow(450, 166, 450, 198, P.ok, 2.5) + arrow(548, 166, 480, 198, P.ok, 2.5) +
    box(370, 204, 160, 40, P.tint, 10) + T(450, 229, 'notes for case 311', { s: 12.5, f: P.accent }) +
    T(450, 276, 'Any agent can help you.', { s: 13, w: 700, f: P.ink2 }));

  /* ---- The code: baskets kept inside the running program ---- */
  const beforeCode = [
    'baskets = {}',
    '',
    'def add_to_basket(visitor, item):',
    '    if visitor not in baskets:',
    '        baskets[visitor] = []',
    '    baskets[visitor].append(item)',
    '',
    'def show_basket(visitor):',
    '    if visitor not in baskets:',
    '        return []',
    '    return baskets[visitor]'
  ];
  const insidePic = svg(600, 150, 'One running program. The baskets table lives inside the program\'s own memory. Ben\'s basket holds 2 cookies.',
    box(150, 16, 300, 112, P.white, 16) + T(300, 40, 'the running website program', { s: 13 }) +
    box(176, 54, 248, 58, P.warnT, 12) + T(300, 77, 'baskets = {}', { s: 12.5, m: true }) + T(300, 99, 'ben: cookie, cookie', { s: 12.5, m: true, f: P.ink2 }) +
    box(16, 46, 96, 50, P.white, 12) + T(64, 68, 'Ben', { s: 13 }) + T(64, 86, 'add a cookie', { s: 11.5, w: 700, f: P.ink2 }) +
    arrow(118, 71, 144, 71, P.ink, 3) +
    T(526, 64, 'The memory is', { s: 12, w: 700, f: P.ink2 }) + T(526, 82, 'inside the', { s: 12, w: 700, f: P.ink2 }) + T(526, 100, 'program.', { s: 12, w: 700, f: P.ink2 }));
  const codePic = `<div style="width:100%">${code(beforeCode, { title: 'website.py', hi: [1, 6] })}${insidePic}</div>`;

  /* ---- The pain: a restart wipes it, two copies disagree ---- */
  const pad = (x, y, name, line, fill, col) => box(x, y, 150, 62, fill, 12) + T(x + 75, y + 24, name, { s: 12.5 }) + T(x + 75, y + 46, line, { s: 12.5, m: true, f: col || P.ink });
  const painSvg = svg(600, 330, 'First: the program restarts at 2 pm and every basket is wiped. Second: with two copies, copy A holds Ben\'s 2 cookies and copy B has never heard of him, so his basket shows 2 cookies, then empty, then 2 cookies.',
    T(300, 22, '1. ONE COPY, RESTARTED AT 2 PM', { s: 12.5, f: P.danger }) +
    pad(40, 36, 'before', 'ben: 2 cookies', P.white) +
    arrow(200, 67, 258, 67, P.danger, 3) + T(229, 54, 'restart', { s: 12, f: P.danger }) +
    pad(268, 36, 'after', 'nothing', P.dangerT, P.danger) +
    T(506, 60, 'Every basket', { s: 12.5, w: 700, f: P.ink2 }) + T(506, 78, 'in the shop is gone.', { s: 12.5, w: 700, f: P.ink2 }) +
    `<line x1="20" y1="122" x2="580" y2="122" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    T(300, 148, '2. TWO COPIES, EACH WITH ITS OWN MEMORY', { s: 12.5, f: P.danger }) +
    pad(40, 162, 'copy A', 'ben: 2 cookies', P.white) + pad(410, 162, 'copy B', 'nothing', P.dangerT, P.danger) +
    [['click 1 lands on A', 'add 2 cookies', P.white, P.ink], ['click 2 lands on B', 'basket: empty', P.dangerT, P.danger], ['click 3 lands on A', 'basket: 2 cookies', P.white, P.ink]].map((r, i) => {
      const x = 22 + i * 190;
      return box(x, 246, 176, 58, r[2], 12) + T(x + 88, 269, r[0], { s: 12 }) + T(x + 88, 290, r[1], { s: 12.5, m: true, f: r[3] });
    }).join('') +
    T(300, 326, 'Same customer, same minute, two different answers.', { s: 12.5, w: 700, f: P.ink2 }));
  const painPic = `<div style="width:100%">${painSvg}${code(beforeCode.slice(0, 6), { title: 'website.py, the line that sets the trap', bad: [1] })}</div>`;

  /* ---- The fix: load, change, save, forget ---- */
  const afterCode = [
    'def add_to_basket(store, basket_id, item):',
    '    basket = store.load(basket_id)',
    '    basket.append(item)',
    '    store.save(basket_id, basket)',
    '',
    'def show_basket(store, basket_id):',
    '    return store.load(basket_id)'
  ];
  const storePic = svg(600, 250, 'A request carries basket number 7305. It can land on copy A, copy B or copy C. Every copy loads and saves the same card in one shared store, so every copy gives the same answer.',
    box(16, 86, 130, 66, P.white, 14) + T(81, 110, 'add a cookie', { s: 12.5 }) +
    `<rect x="34" y="120" width="94" height="24" rx="6" fill="#FFC24B" stroke="${P.ink}" stroke-width="2"/>` + T(81, 137, 'basket 7305', { s: 11.5, m: true }) +
    arrow(152, 104, 204, 54, P.ink, 2.5) + arrow(152, 119, 204, 119, P.ink, 2.5) + arrow(152, 134, 204, 184, P.ink, 2.5) +
    ['copy A', 'copy B', 'copy C'].map((n, i) => box(212, 28 + i * 66, 120, 50, P.okT, 12) + T(272, 52 + i * 66, n, { s: 13 }) + T(272, 68 + i * 66, 'remembers nothing', { s: 10.5, w: 700, f: P.ink2 })).join('') +
    arrow(338, 54, 404, 104, P.ok, 2.5) + arrow(338, 119, 404, 119, P.ok, 2.5) + arrow(338, 184, 404, 134, P.ok, 2.5) +
    box(412, 60, 172, 118, P.tint, 14) + T(498, 86, 'the shared store', { s: 13, f: P.accent }) +
    `<rect x="428" y="98" width="140" height="62" rx="8" fill="${P.white}" stroke="${P.ink}" stroke-width="2"/>` + T(498, 122, 'basket 7305', { s: 12, m: true }) + T(498, 144, 'cookie, cookie', { s: 12, m: true, f: P.ink2 }) +
    T(300, 236, 'Any copy, any order, the same basket.', { s: 12.5, w: 700, f: P.ink2 }));
  const fixPic = `<div style="width:100%">${code(afterCode, { title: 'website.py, stateless', good: [2, 3, 4, 7] })}${storePic}</div>`;

  /* ---- The test: restart it, or let another copy answer ---- */
  const testRow = (y, what, a, b, ok) =>
    box(16, y, 568, 40, ok ? P.okT : P.dangerT, 10) +
    T(30, y + 25, what, { s: 12, m: true, a: 'start' }) + T(356, y + 25, a, { s: 12.5, f: ok ? P.ink : P.danger }) + T(470, y + 25, b, { s: 12.5, f: ok ? P.ink : P.danger }) +
    T(548, y + 25, ok ? 'yes' : 'no', { s: 12.5, f: ok ? P.ok : P.danger });
  const testPic = svg(600, 276, 'Four pieces of code, tested by a restart and by a different copy answering. The baskets table and the list of orders in memory fail. The basket in the store and a total worked out from what it is handed pass.',
    T(30, 28, 'WHAT THE CODE RELIES ON', { s: 12, f: P.ink2, a: 'start' }) + T(356, 28, 'AFTER A RESTART', { s: 12, f: P.ink2 }) + T(470, 28, 'ANOTHER COPY', { s: 12, f: P.ink2 }) + T(548, 28, 'SAFE?', { s: 12, f: P.ink2 }) +
    testRow(40, 'baskets = {} in the program', 'lost', 'different', false) +
    testRow(92, 'orders = [] in the program', 'lost', 'different', false) +
    testRow(144, 'store.load(basket_id)', 'still there', 'the same', true) +
    testRow(196, 'basket_total(basket)', 'nothing to lose', 'the same', true) +
    T(300, 264, 'Stateless code passes both columns.', { s: 12.5, w: 700, f: P.ink2 }));

  /* ---- When not to: the memory moved, it did not vanish ---- */
  const cacheCode = [
    '# a saved copy for speed: fine, it can be rebuilt',
    'cache = {}',
    '',
    'def cookie_price(store):',
    '    if "cookie" not in cache:',
    '        cache["cookie"] = store.load("cookie_price")',
    '    return cache["cookie"]'
  ];
  const movedPic = svg(600, 150, 'Statelessness moves the memory out of the program and into the store. The program gets simpler. The store now has to be fast, backed up and always on.',
    box(20, 30, 200, 80, P.okT, 14) + T(120, 60, 'the program', { s: 13.5, f: P.ok }) + T(120, 82, 'remembers nothing', { s: 12, w: 700, f: P.ink2 }) + T(120, 98, 'easy to restart and copy', { s: 12, w: 700, f: P.ink2 }) +
    arrow(230, 70, 368, 70, P.ink, 3) + T(299, 58, 'the memory moved', { s: 12 }) +
    box(380, 30, 200, 80, P.warnT, 14) + T(480, 56, 'the store', { s: 13.5, f: P.warn }) + T(480, 76, 'must be fast,', { s: 12, w: 700, f: P.ink2 }) + T(480, 92, 'backed up, always on', { s: 12, w: 700, f: P.ink2 }) +
    T(300, 140, 'The memory did not vanish. It has one home now, and that home matters.', { s: 12.5, w: 700, f: P.ink2 }));
  const whenPic = `<div style="width:100%">${movedPic}${code(cacheCode, { title: 'website.py, a cache on purpose', hi: [2] })}</div>`;

  const doneCode = [
    'done = {}',
    '',
    'def place_order(cart, ticket):',
    '    if ticket in done:',
    '        return done[ticket]',
    '    charge_card(cart.total)',
    '    save_order(cart)',
    '    done[ticket] = "Thank you!"',
    '    return done[ticket]'
  ];
  const numberCode = [
    'orders = []',
    '',
    'def new_order(basket):',
    '    orders.append(basket)',
    '    return len(orders)    # the order number'
  ];

  COURSE.add({
    id: 'l42', minutes: 9,
    summary: '<b>State</b> is anything a program remembers from before. A <b>stateless</b> program keeps nothing in its own memory between one request and the next. Each request brings what is needed, and anything worth keeping lives in one shared store. Then any copy of the program can answer any request.',
    video: {
      src: 'videos/l42-statelessness.mp4', poster: 'videos/l42-statelessness.jpg', length: '1 min 11 s',
      script: [
        "Maya's website keeps every visitor's basket in its own memory. Like a clerk with a private notepad.",
        'Ben adds 2 cookies. The clerk writes it down.',
        "Then the program restarts. The notepad is wiped. Ben's basket is empty.",
        'For the Christmas rush, Maya runs 2 copies of the program. 2 clerks. 2 notepads.',
        'Ben adds 2 cookies at window A. His next click lands on window B. Empty. Back to A. 2 cookies. His basket flickers.',
        'Nothing is broken. Each copy just has its own private memory.',
        'So throw the notepads away. Put one shared cabinet behind every window, and give Ben a basket number. 7305.',
        'Now every request carries that number. Any clerk pulls the same card, changes it, puts it back, and forgets.',
        'Swap a clerk mid-order. Nothing is lost. Run 5 copies. Every window gives the same answer.',
        'That is statelessness. The program remembers nothing between requests. The memory lives in one shared place.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: '"Is Dana in today?"',
        text: [
          'You ring a call centre about a refund. Dana sorts it out and says "ring back tomorrow". Tomorrow Eli answers. He has never heard of you. The notes are <b>with Dana</b>, and Dana is away. You start again from the beginning.',
          'A better call centre gives you a <b>case number</b>. Every agent can open the same notes under that number. It does not matter who picks up the phone, or whether yesterday\'s agent has gone home.',
          '<b>State</b> is anything a program remembers from before. In lesson 37, Idempotency, a click sent a <b>request</b> to the shop and the shop sent a reply. A <b>stateless</b> program keeps <b>nothing in its own memory</b> between one request and the next. Each request brings what is needed: who is asking, and what they want. Anything worth keeping is looked up in <b>one shared place</b> that is built for remembering, such as a database.',
          'Stateless does <b>not</b> mean the shop has no memory. It means the memory is not inside whichever worker happened to serve you last.'
        ],
        tip: 'The same idea works in the small. In lesson 23, Explicit over implicit, a job that is handed everything it depends on was easy to trust. A function whose answer does not depend on <b>earlier calls</b> is stateless too.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'A basket in the program\'s head.',
        text: [
          'Maya\'s website lets a visitor fill a basket before paying. Here is how <code>website.py</code> remembers it.',
          'Line 1 makes an empty dictionary, the lookup table from lesson 37. It will hold one basket for each visitor. <code>visitor not in baskets</code> asks "is this visitor missing from the table?", as in lesson 39. If so, line 5 gives them an empty list, <code>[]</code>. Line 6 adds the item to that visitor\'s list.',
          '<code>show_basket</code> hands back the visitor\'s list, or an empty list for someone new.',
          'Now ask where <code>baskets</code> lives. It is not in a file. It is not in a database. It lives in the <b>memory of the running program</b>, and only there. While that one program keeps running, everything works. Ben adds 2 cookies, looks at his basket, and sees 2 cookies.'
        ]
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Empty. Two cookies. Empty.',
        text: [
          '<b>First, a restart.</b> At 2 pm Maya restarts the program for a small update. A program that starts again starts with a fresh memory. Line 1 runs again and <code>baskets</code> is empty. <b>Every basket in the shop is gone.</b> Fourteen customers in the middle of an order find an empty basket.',
          '<b>Then, the Christmas rush.</b> One program cannot keep up, so Maya runs <b>two copies</b> of it behind one web address. A small helper in front hands each click to whichever copy is free. Twice as many people can be served.',
          'Ben adds 2 cookies. That click lands on copy A. His next click lands on copy B. Copy B has its own <code>baskets</code>, and Ben is not in it. <b>Empty.</b> He clicks again and lands on A. <b>2 cookies.</b> The basket flickers in and out.',
          'It gets worse. Ben adds a $20 cake while he is on copy B, and pays there. He wanted 2 cookies at $3 and a cake: <b>$26</b>. Copy B knows only the cake. He is charged <b>$20</b>, and no cookies arrive. (Tax is left out to keep the sums easy.)'
        ],
        warn: 'Nothing crashed, and neither copy has a bug. Each copy has its own private memory, so there are <b>two truths</b> about one basket. Ask the question from lesson 7, Single source of truth: if two places disagree, which one wins? Nobody can say.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Load it. Change it. Save it. Forget it.',
        text: [
          'Maya deletes line 1. The program no longer remembers any basket. Baskets are saved in the shop\'s <b>database</b>, the tool for keeping records safe from lesson 32. In the code it is called <code>store</code>, and it is handed in, as lesson 33, Dependency injection, taught.',
          'Every basket gets a <b>basket number</b>. Ben\'s is <b>7305</b>. His browser keeps that number and sends it with every click. So a request now says everything: "basket 7305: add a cookie".',
          'Read <code>add_to_basket</code>. Line 2 <b>loads</b> the basket saved under that number. (For a number it has never seen, the store hands back an empty basket.) Line 3 changes it. Line 4 <b>saves</b> it back. Then the job ends, and the program <b>forgets</b>. Nothing about Ben is left inside it.',
          'Play the bad day again. Ben adds 2 cookies through copy A. His next click lands on copy B. Copy B loads basket 7305 from the store: <b>2 cookies</b>. He adds the cake and pays <b>$26</b>. Maya restarts copy A at 2 pm. <b>Nothing is lost</b>, because nothing was kept there. For the rush she starts copies C, D and E. They are useful from their first second.'
        ],
        tip: 'Lesson 37 kept its finished tickets in <code>done = {}</code>, and warned that a real shop keeps them in a database. Now you can see why. A table inside one running program is forgotten on a restart and unknown to every other copy.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Restart it in your head.',
        text: [
          'Point at a piece of code and ask: <b>"If this program restarted right now, or a different copy answered the next request, would anything be lost or different?"</b>',
          'Try the old <code>baskets</code> table. A restart loses it, and another copy has a different one. No. A list of orders kept the same way, <code>orders = []</code>, fails for the same reason. Try <code>store.load(basket_id)</code>. The basket is still in the store, and every copy loads the same one. Yes.',
          'Try a small function such as <code>basket_total(basket)</code>, which adds up the prices of what it is handed. It keeps nothing, so there is nothing to lose. The same basket gives the same total, in any copy, on any day. That is why functions like it are so easy to test.',
          'A sign to look for: a name made <b>outside</b> every function, at the left edge of the file, that the functions <b>keep changing</b>. Line 1 of the old file was exactly that. A fixed value such as <code>TAX_RATE</code> is different. Nothing changes it, so every copy and every restart has the same one.'
        ]
      },
      {
        label: 'When not to', pic: whenPic,
        h: 'The memory moved. It did not vanish.',
        text: [
          '<b>The state has to live somewhere.</b> Stateless code does not delete the basket. It moves it into the store. Now the store has to be fast, backed up and always running. If the store stops, every copy stops with it. That is a good trade, because it is easier to look after one careful store than a memory in every copy. But it is a trade, not magic.',
          '<b>Loading and saving cost time.</b> So some things are kept in memory on purpose, as a <b>cache</b>, the saved answer from lesson 10. Look at the code. The cookie price is loaded once and then reused. That is fine, because it is a throwaway copy. Wipe it and the program loads it again. Lesson 7 gave the rule: everyone knows which one is the original, and the copy is refreshed from it. A basket kept only in memory is no copy. It is the only one.',
          '<b>One copy on one machine can keep state.</b> Suppose Maya loves this lesson and gives her stock-counting script a database. The script is 10 lines. It runs once a week on her laptop and ends. Now it needs a database to be running before it can count anything. Nothing restarts it halfway, and there is no second copy. A plain list in memory was right. Lesson 8, YAGNI, asked who is asking for this.',
          '<b>Some jobs are one long conversation.</b> A video call or a game in progress sends many messages a second to the same worker. Loading and saving on every one would be too slow. Keeping that state in the worker for a while is the right trade, as long as you know what a restart would lose.'
        ],
        warn: 'Stateless is about <b>between requests</b>. Inside one request, a program remembers plenty: the basket it just loaded, a total it is adding up. That is not the problem. The problem is what is still there when the next request arrives.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does it mean for Maya\'s website program to be stateless?',
        options: ['The shop keeps no record of any basket', 'The program keeps nothing in its own memory between requests', 'The program never uses a database', 'Only one copy of the program may run'],
        answer: 1,
        why: 'The baskets are still remembered. They live in one shared store, not inside the program. That is what lets a copy restart, or many copies run.',
        hint: 'The basket still exists after the fix. Where does it live?'
      },
      {
        type: 'pick', q: 'Ben sees 2 cookies on copy A and an empty basket on copy B. Which earlier question does this fail?',
        options: ['"Is someone asking for this now, or am I guessing?"', '"If two places disagree about this, which one wins?"', '"Could someone new read this aloud?"', '"Have I measured it, and is this the slow part?"'],
        answer: 1,
        why: 'That is the question from lesson 7, Single source of truth. Two private memories are two homes for one fact. The fix gives the basket one home: the store.',
        hint: 'Two places hold the same fact, and they disagree.'
      },
      {
        type: 'pick', q: 'This is the ticket check from lesson 37, Idempotency. Maya runs it as two copies. Ben clicks Pay with ticket 4817 and copy A charges him. The reply is lost, so he clicks again, and the retry lands on copy B. What happens?',
        pic: code(doneCode, { title: 'shop.py, from lesson 37', hi: [1, 4] }),
        options: ['Copy B finds ticket 4817 on line 4 and charges nothing', 'Copy B has its own empty done table, so Ben is charged twice', 'Copy B stops with an error on line 4', 'Copy B asks copy A what to do'],
        answer: 1,
        why: '<code>done</code> lives in the memory of one running copy. Copy B never saw ticket 4817, so line 4 says no and line 6 charges again. Kept in the shared store, the ticket would be found by every copy.',
        hint: 'Line 1 runs once in each copy. What is in copy B\'s table?'
      },
      {
        type: 'fill', q: 'Finish the stateless version. Nothing about the basket stays in the program.',
        text: 'def add_to_basket(store, basket_id, item):\n    basket = store.___(basket_id)\n    basket.append(item)\n    store.___(basket_id, basket)',
        options: ['load', 'save', 'append', 'baskets'],
        answer: ['load', 'save'],
        why: 'Load the basket under its number, change it, and save it back. After the last line the program holds nothing.',
        hint: 'First get the basket out of the store. Last, put it back.'
      },
      {
        type: 'bucket', q: 'Two copies of the website are running. Where may each thing live?',
        buckets: ['Fine in the program\'s own memory', 'Must live in the shared store'],
        items: [
          ['A total being added up during one request', 0],
          ['A saved copy of the menu that can be loaded again', 0],
          ['TAX_RATE = 0.09', 0],
          ['A visitor\'s basket', 1],
          ['Which tickets are already paid', 1],
          ['A customer\'s loyalty points', 1]
        ],
        why: 'A working value inside one request, a throwaway copy and a fixed value are safe in memory. Anything that the next request needs, and that cannot be rebuilt, must be where every copy can find it.',
        hint: 'Ask of each one: if the program restarted now, would something be gone for good?'
      },
      {
        type: 'pick', q: 'Maya runs two copies of this. Copy A takes the first order of the day. Copy B takes the second. What order numbers do the two customers get?',
        pic: code(numberCode, { title: 'orders.py', hi: [1, 5] }),
        options: ['1 and 2', '1 and 1', '2 and 2', 'The second one crashes'],
        answer: 1,
        why: '<code>len(orders)</code> counts the list, as in lesson 36. Each copy has its own list, and each list holds one order. Both customers get number 1. The kitchen now has two different orders with the same number.',
        hint: 'How many orders are in copy B\'s own list after it takes its first one?'
      },
      {
        type: 'type', q: 'Ben is in <code>baskets</code> with 2 cookies. The program restarts, and line 1, <code>baskets = {}</code>, runs again. What does <code>"ben" in baskets</code> give now? Type True or False.',
        prompt: 'answer >',
        answers: ['False', 'false'],
        why: 'A program that starts again starts with a fresh memory. The table is empty, so Ben is not in it.',
        hint: 'What is in the table right after line 1 runs?'
      },
      {
        type: 'pick', q: 'Which of these are true? Pick all that apply.',
        options: ['Stateless code still needs the data to be kept somewhere', 'A cache in memory is fine if it can be thrown away and rebuilt', 'A 10-line script that runs once on one laptop should save every step to a database', 'Stateless means a program may not remember anything while it handles one request'],
        answer: [0, 1],
        why: 'The memory moves to a store, and that store must be looked after. A throwaway copy for speed is fine. A small script with one copy can keep its state in memory. And inside one request a program remembers whatever it needs.',
        hint: 'Two of these come straight from "When not to".'
      }
    ]
  });
})();
