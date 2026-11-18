/* Lesson 41: Robustness principle (module 4). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l41  Robustness principle
     ===================================================================== */

  /* ---- The idea: speak clearly, listen generously ---- */
  const ideaPic = svg(600, 318, 'When you speak, you say one clear sentence. When you listen, you understand three messy versions of the same sentence, because the meaning is clear.',
    T(150, 26, 'WHEN YOU SPEAK: CAREFUL', { s: 12.5, f: P.accent }) + T(450, 26, 'WHEN YOU LISTEN: GENEROUS', { s: 12.5, f: P.ok }) +
    `<line x1="300" y1="14" x2="300" y2="262" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    box(40, 96, 220, 52, P.tint, 14) + T(150, 128, '"Two cookies, please."', { s: 14 }) +
    T(150, 180, 'one clear sentence', { s: 13, w: 700, f: P.ink2 }) +
    T(150, 198, 'even a fussy listener gets it', { s: 13, w: 700, f: P.ink2 }) +
    ['"2 cookies pls"', '"TWO COOKIES!!"', '"two cookies ,please"'].map((s, i) => {
      const y = 44 + i * 58;
      return box(330, y, 190, 40, P.white, 12) + T(425, y + 25, s, { s: 12.5 }) +
        `<circle cx="552" cy="${y + 20}" r="14" fill="${P.ok}" stroke="${P.ink}" stroke-width="2.5"/><path d="M545 ${y + 21} l5 5 l9 -11" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
    }).join('') +
    T(450, 232, 'three shapes, one meaning', { s: 13, w: 700, f: P.ink2 }) +
    T(450, 250, 'you understand all of them', { s: 13, w: 700, f: P.ink2 }) +
    box(60, 272, 480, 36, P.warnT, 12) + T(300, 295, 'Strict in what you send. Forgiving in what you accept.', { s: 13.5 }));

  /* ---- The code: a strict reader and two sloppy writers ---- */
  const strictCode = [
    'COOKIES = ["choc chip", "oat", "ginger"]',
    '',
    'def read_order(line):',
    '    parts = line.split(",")',
    '    if len(parts) != 2:',
    '        raise ValueError("need exactly: cookie,count")',
    '    name = parts[0]',
    '    if name not in COOKIES:',
    '        raise ValueError("unknown cookie: " + name)',
    '    count = clean_count(parts[1])',
    '    return name, count'
  ];
  const sloppyCode = [
    'def tell_app(name, count):',
    '    send("ready: " + str(count) + " " + name)',
    '',
    'def tell_planner(name, count):',
    '    send(name + " x" + str(count) + " READY! $" + str(count * 3))'
  ];
  const codePic = `<div style="width:100%">${code(strictCode, { title: 'orders.py: reading what comes in', hi: [5, 7, 8] })}${code(sloppyCode, { title: 'orders.py: writing what goes out', hi: [2, 5] })}</div>`;

  /* One row: a line of text on a dark chip, an arrow, and what happened to it. */
  const tone = { ok: [P.okT, P.ok], bad: [P.dangerT, P.danger], warn: [P.warnT, P.warn] };
  const row = (y, line, result, t) => {
    const c = tone[t];
    return box(14, y, 216, 30, '#15132B', 8) + T(122, y + 20, line, { s: 12.5, m: true, f: '#ECEAFF' }) +
      arrow(236, y + 15, 256, y + 15, c[1], 2.5) +
      box(262, y, 324, 30, c[0], 8) + T(424, y + 20, result, { s: 12.5, f: c[1] });
  };

  /* ---- The pain: backwards ---- */
  const painPic = svg(600, 372, 'Coming in, three order lines with a harmless difference are all rejected. Going out, two replies in two home-made shapes cannot be read by the delivery app. Maya is strict where she should forgive and sloppy where she should be strict.',
    T(122, 20, 'COMES IN', { s: 12, f: P.ink2 }) + T(424, 20, "MAYA'S READER SAYS", { s: 12, f: P.ink2 }) +
    row(30, 'choc chip,3', 'accepted', 'ok') +
    row(70, 'Choc Chip,3', 'rejected: unknown cookie', 'bad') +
    row(110, 'choc chip ,3', 'rejected: unknown cookie', 'bad') +
    row(150, 'choc chip,3,gift', 'rejected: need exactly cookie,count', 'bad') +
    `<line x1="20" y1="200" x2="580" y2="200" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    T(122, 226, 'MAYA SENDS OUT', { s: 12, f: P.ink2 }) + T(424, 226, "THE OTHER PROGRAM'S READER SAYS", { s: 12, f: P.ink2 }) +
    row(236, 'ready: 3 choc chip', 'cannot read it', 'bad') +
    row(276, 'choc chip x3 READY! $9', 'cannot read it', 'bad') +
    T(300, 334, 'The agreed reply was:  ready,choc chip,3,900', { s: 12.5, m: true, f: P.ink2 }) +
    T(300, 360, 'Strict where she should forgive. Sloppy where she should be strict.', { s: 13, f: P.danger }));

  /* ---- The fix: a forgiving reader and a strict writer ---- */
  const readerCode = [
    'def read_order(line):',
    '    parts = line.split(",")',
    '    if len(parts) < 2:',
    '        raise ValueError("need: cookie,count")',
    '    name = parts[0].strip().lower()',
    '    if name not in COOKIES:',
    '        raise ValueError("unknown cookie: " + name)',
    '    count = clean_count(parts[1])',
    '    return name, count'
  ];
  const writerCode = [
    'def confirmation(name, count):',
    '    cents = count * 300',
    '    return "ready," + name + "," + str(count) + "," + str(cents)',
    '',
    'def tell_app(name, count):',
    '    send(confirmation(name, count))',
    '',
    'def tell_planner(name, count):',
    '    send(confirmation(name, count))'
  ];
  const fixPic = `<div style="width:100%">${code(readerCode, { title: 'orders.py: a forgiving reader', good: [3, 5], hi: [6, 7, 8] })}` +
    svg(600, 262, 'With the forgiving reader, the three harmless variations all go in as choc chip, 3. Three lines whose meaning is unclear are still sent back with a reason.',
      T(122, 20, 'COMES IN', { s: 12, f: P.ink2 }) + T(424, 20, 'THE NEW READER SAYS', { s: 12, f: P.ink2 }) +
      row(30, 'Choc Chip,3', 'goes in as  choc chip, 3', 'ok') +
      row(70, 'choc chip ,3', 'goes in as  choc chip, 3', 'ok') +
      row(110, 'choc chip,3,gift', 'goes in as  choc chip, 3', 'ok') +
      row(150, 'choc chip,a few', 'sent back: how many is that?', 'warn') +
      row(190, 'choc chip,-5', 'sent back: count must be 1 to 100', 'warn') +
      row(230, 'cookie,3', 'sent back: unknown cookie', 'warn')) +
    code(writerCode, { title: 'orders.py: a strict writer', good: [1, 2, 3, 6, 9] }) + `</div>`;

  /* ---- The test: form or meaning? ---- */
  const pair = (x, y, a, b, t) => {
    const c = tone[t];
    return box(x, y, 104, 32, '#15132B', 8) + T(x + 52, y + 21, a, { s: 12.5, m: true, f: '#ECEAFF' }) +
      box(x + 114, y, 146, 32, c[0], 8) + T(x + 187, y + 21, b, { s: 12, f: c[1] });
  };
  const testPic = svg(600, 300, 'On the left, four inputs that differ only in form and have one clear meaning: forgive them. On the right, four inputs whose meaning is unclear or impossible: reject them.',
    T(150, 22, 'ONLY THE FORM IS OFF', { s: 12.5, f: P.ok }) + T(450, 22, 'THE MEANING IS OFF', { s: 12.5, f: P.danger }) +
    T(150, 42, 'one sensible reading: forgive', { s: 12.5, w: 700, f: P.ink2 }) + T(450, 42, 'no single reading: reject, and say why', { s: 12.5, w: 700, f: P.ink2 }) +
    `<line x1="300" y1="12" x2="300" y2="246" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    pair(20, 58, '" 3 "', 'it is 3', 'ok') +
    pair(20, 104, '"Choc Chip"', 'it is choc chip', 'ok') +
    pair(20, 150, '"3,gift"', 'it is 3, extra ignored', 'ok') +
    pair(20, 196, '"oat" + Enter', 'it is oat', 'ok') +
    pair(320, 58, '"03/04"', '3 April or 4 March?', 'bad') +
    pair(320, 104, '"a few"', 'how many?', 'bad') +
    pair(320, 150, '"-5"', 'not an order', 'bad') +
    pair(320, 196, '"cookie"', 'which cookie?', 'bad') +
    box(40, 254, 520, 36, P.warnT, 12) + T(300, 277, 'Forgiving never means guessing.', { s: 13.5 }));

  /* ---- When not to: tolerance you can never take back, and a forgiving lock ---- */
  const creep = (x, title, lines, fill, col) =>
    box(x, 40, 176, 150, fill, 14) + T(x + 88, 62, title, { s: 12.5, f: col }) +
    lines.map((s, i) => T(x + 88, 86 + i * 19, s, { s: 12.5, m: true })).join('');
  const loginCode = [
    'def staff_login(typed, password):',
    '    return typed.strip().lower() == password.lower()'
  ];
  const whenNotPic = `<div style="width:100%">` +
    svg(600, 252, 'Month by month Maya accepts more spellings of choc chip. A year later three partner programs send the shortest one, cc, and a new cookie called coconut crunch makes cc unclear. She cannot take the tolerance back.',
      T(300, 22, 'Spellings Maya accepts for "choc chip"', { s: 13.5 }) +
      creep(20, 'MONTH 1', ['choc chip', 'Choc Chip'], P.okT, P.ok) +
      creep(212, 'MONTH 6', ['choc chip', 'Choc Chip', 'chocchip', 'choc-chip'], P.warnT, P.warn) +
      creep(404, 'MONTH 12', ['choc chip', 'Choc Chip', 'chocchip', 'choc-chip', 'cc'], P.dangerT, P.danger) +
      T(300, 216, 'Now 3 partner programs send "cc", and Maya adds coconut crunch.', { s: 12.5, w: 700, f: P.ink2 }) +
      T(300, 238, 'Which cookie is "cc"? She cannot tighten it without breaking them.', { s: 12.5, f: P.danger })) +
    code(loginCode, { title: 'a "forgiving" staff login', bad: [2] }) + `</div>`;

  COURSE.add({
    id: 'l41', minutes: 9,
    summary: 'When your program talks to programs you do not control, be <b>strict in what you send</b> and <b>forgiving in what you accept</b>. Send exactly the agreed format. Accept harmless differences in form, as long as the meaning is clear. That is the <b>robustness principle</b>.',
    video: {
      src: 'videos/l41-robustness-principle.mp4', poster: 'videos/l41-robustness-principle.jpg', length: '1 min 7 s',
      script: [
        "Maya's shop now takes orders from other programs. Each order is one line of text. Choc chip, comma, 3.",
        "Her reader is very strict. A capital letter? Rejected. A stray space? Rejected. An extra word on the end? Rejected. On Friday night, 40 real orders bounce.",
        "And what does Maya send back? Her own replies are a mess. A different shape every time. The other programs cannot read them.",
        "She has it exactly backwards. So she flips it.",
        "The in window gets a patient reader. Make the letters small. Trim the spaces. Ignore the extra word. Three crooked lines, one neat order.",
        "But it never guesses. A few cookies? Minus 5? Back to the sender, with a note.",
        "The out window gets one stamp. Every reply leaves in exactly one shape.",
        "That is the robustness principle. Be strict in what you send. Be forgiving in what you accept."
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Speak clearly. Listen generously.',
        text: [
          'When you talk to a stranger, you speak clearly and carefully. But you still understand people with an accent, a typo or a missing comma. A good postman delivers a letter even when the postcode is slightly wrong.',
          'Programs talk to each other too, and often they were written by strangers. The <b>robustness principle</b> gives your program the same two manners. What you <b>send out</b> should follow the agreed format exactly, so that even the fussiest receiver understands it. What you <b>take in</b> should put up with harmless differences, like extra spaces or capital letters, as long as the <b>meaning is clear</b>.',
          'This is how millions of different programs, written by people who never met, managed to talk to each other at all.'
        ],
        tip: 'It is also called <b>Postel\'s law</b>, after Jon Postel, who helped write the rules of the early internet. It appears in the 1981 specification of TCP, one of the internet\'s basic sets of rules for moving data (RFC 793): "be conservative in what you do, be liberal in what you accept from others". Conservative means careful. Liberal means generous.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'Other programs start ordering.',
        text: [
          'Maya\'s shop now gets orders from two <b>other programs</b>: a food delivery app, and a party planner\'s spreadsheet. Maya did not write either of them. On day one, everyone agreed on two formats. An order arrives as one line of text, <code>cookie,count</code>, like <code>choc chip,3</code>. Maya replies with <code>ready,cookie,count,cents</code>, like <code>ready,choc chip,3,900</code>. Three cookies at 300 cents each is 900 cents.',
          '<code>read_order</code> reads a line that comes in. Line 4 has one new piece of Python. <code>.split(",")</code> <b>cuts text at every comma</b> and hands back a list of the pieces. So <code>"choc chip,3".split(",")</code> gives <code>["choc chip", "3"]</code>. <code>parts[0]</code> is the first piece and <code>parts[1]</code> is the second, because Python counts from 0, as in lesson 11.',
          'Line 5 uses <code>len</code> from lesson 36 to count the pieces. Anything but exactly 2 is refused. Line 8 uses the guest list from lesson 39, Defensive programming: the name must be one of the three cookies. Line 10 is <code>clean_count</code>, the gate from that same lesson. It turns the text into a whole number from 1 to 100. Line 11 hands back two things at once, the name and the count.',
          'The second file sends the replies. Each program got its own job, written on a different day. Run them for 3 choc chip cookies. One sends <code>ready: 3 choc chip</code>. The other sends <code>choc chip x3 READY! $9</code>. Neither is the agreed format.'
        ]
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Maya has it backwards.',
        text: [
          'The delivery app sends <code>Choc Chip,3</code>, with capital letters. Line 8 looks for exactly that text on the list. <code>"Choc Chip"</code> is not <code>"choc chip"</code>. <b>Rejected.</b>',
          'The spreadsheet sends <code>choc chip ,3</code>, with a space before the comma. The first piece is now <code>"choc chip "</code>, with a space on the end. <b>Rejected.</b> Sometimes it adds a third column, <code>choc chip,3,gift</code>. That is 3 pieces, not 2. <b>Rejected.</b>',
          'Any person can see what all three mean: 3 choc chip cookies. On Friday night <b>40 real orders</b> bounce like this. The customers buy their cookies somewhere else, over a capital letter.',
          'Now look the other way. Maya\'s own replies come in two home-made shapes. One has no price, and the other writes the price as <code>$9</code>. The delivery app\'s reader expects <code>ready,choc chip,3,900</code>. It cannot read either, so customers are never told their cookies are ready.'
        ],
        warn: 'She is <b>strict where she should forgive</b>, and <b>sloppy where she should be strict</b>. Exactly backwards. Nothing in her own program crashed. The damage is all at the edges, where her program meets someone else\'s.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'A forgiving reader. A strict writer.',
        text: [
          '<b>The reader forgives form.</b> Line 5 uses two jobs you met in lesson 25. <code>.strip()</code> <b>trims the spaces off both ends</b> of a piece of text. <code>.lower()</code> <b>turns every letter into a small letter</b>. So <code>"Choc Chip"</code> and <code>"choc chip "</code> both become <code>"choc chip"</code>. Line 3 now asks for <b>at least</b> 2 pieces, so an extra column the shop does not know is simply ignored.',
          '<b>The reader still checks meaning.</b> Lines 6 to 8 did not get any softer. The cleaned name must be on the guest list. The count must pass <code>clean_count</code>. <code>choc chip,a few</code> is sent back. So is <code>choc chip,-5</code>. So is <code>cookie,3</code>. Whoever calls <code>read_order</code> catches the <code>ValueError</code>, as <code>order_form</code> did in lesson 39, and returns the line to the sender with the reason.',
          '<b>Only the strict form goes inside.</b> Whatever shape came in, <code>read_order</code> hands back <code>"choc chip"</code> and the number <code>3</code>. The kitchen and the till never see a capital letter or a stray space.',
          '<b>The writer has one shape.</b> One job, <code>confirmation</code>, builds every reply. Both senders call it. Every reply that leaves the shop is now <code>ready,choc chip,3,900</code>, down to the last comma. If the format ever changes, it changes in one place, as lesson 6, DRY, asked.'
        ],
        tip: 'A careful reader will ask: does "forgiving" break lesson 22, Fail fast, and lesson 39? No. Those lessons said never carry on with a value that <b>cannot be right</b>, and never guess. <code>"Choc Chip"</code> is not a wrong value. It is the right value in a different coat. The gate takes the coat off. A value with no clear meaning is still stopped, loudly, at the same gate.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Two questions, one for each direction.',
        text: [
          'Point at the place where your program meets another one and ask: <b>"Is my output exactly the agreed format? And does my input accept every form whose meaning is clear?"</b>',
          'For the second half, sort what arrives into two piles. <b>Only the form is off</b>: spaces, capital letters, an extra field, a line ending. There is <b>exactly one sensible reading</b>, so accept it and turn it into the strict form at the gate. <b>The meaning is off</b>: is <code>03/04</code> the 3rd of April or the 4th of March? How many is "a few"? Is -5 cookies an order? There is no single reading, so reject it and say why.',
          'What about the word <code>ten</code>? A person knows what it means. But then you must also take "eleven", "a dozen" and "tne". Each one you add is a new guess. The agreed format said digits, so Maya sends it back.'
        ],
        tip: 'A short rule for the gate: <b>one sensible reading, or no entry</b>. Forgiving never means guessing.'
      },
      {
        label: 'When not to', pic: whenNotPic,
        h: 'Forgiveness has a bill.',
        text: [
          'Many engineers today think this principle has been pushed too far, and their reasons are good ones.',
          '<b>Senders never learn.</b> If every sloppy line is quietly accepted, nobody finds out that their program is sloppy. The sloppiness spreads. Suppose Maya loves this lesson and keeps adding spellings: <code>chocchip</code>, <code>choc-chip</code>, then <code>cc</code>. A year later three partner programs send <code>cc</code> and she starts selling coconut crunch. Now <code>cc</code> has two meanings, and she cannot take it away without breaking those programs. Whatever you accept, somebody comes to depend on. That has a name: lesson 55, Hyrum\'s law.',
          '<b>Never forgive at a lock.</b> Look at the login in the picture. It trims and lower-cases the password to be "kind". Now <code>COOKIE42</code> opens a door whose password is <code>Cookie42</code>, and there are far fewer passwords left to guess. In logins, payments and permissions, anything that is not exactly right is rejected.',
          '<b>New formats, and both ends yours.</b> When you design something new, or you control the sender and the receiver, many engineers now prefer: be strict, and say clearly what was wrong. Mistakes then get fixed on day one, by the person who made them.'
        ],
        warn: 'So: forgive <b>form</b> when you talk to the messy outside world you do not control. Be strict inside your own system, in anything that touches money or access, and when you design something new. A middle road also helps: accept the harmless slip, and tell the sender about it.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does line 2 put in <code>name</code>?',
        pic: code([
          'typed = " Oat "',
          'name = typed.strip().lower()'
        ], { title: 'orders.py' }),
        options: ['" oat "', '"Oat"', '"oat"', '"OAT"'],
        answer: 2,
        why: '<code>.strip()</code> trims the spaces off both ends. <code>.lower()</code> turns every letter into a small letter. What is left is <code>"oat"</code>, the strict form.',
        hint: 'Two jobs run, one after the other. First the spaces go. Then the capital letter.'
      },
      {
        type: 'match', q: 'Match each piece of Python to what it does.',
        pairs: [
          ['.split(",")', 'Cuts text at every comma and hands back a list of the pieces'],
          ['.strip()', 'Trims the spaces off both ends'],
          ['.lower()', 'Turns every letter into a small letter'],
          ['parts[0]', 'The first piece in the list']
        ],
        why: 'Cut, trim, make small. Three small jobs turn many shapes of the same order into one.',
        hint: 'Python counts from 0, as in lesson 11.'
      },
      {
        type: 'pick', q: 'The party planner sends <code>Oat,12</code>. What does this strict reader do?',
        pic: code(strictCode, { title: 'orders.py: the strict reader' }),
        options: ['Accepts it as 12 oat cookies', 'Stops on line 6: need exactly cookie,count', 'Stops on line 9: unknown cookie', 'Accepts it, but as 1 cookie'],
        answer: 2,
        why: 'There are exactly 2 pieces, so line 5 is happy. But <code>"Oat"</code> is not the same text as <code>"oat"</code>, so line 8 does not find it on the list. A real order is lost over one capital letter.',
        hint: 'Count the pieces first. Then compare the name with the list on line 1, letter by letter.'
      },
      {
        type: 'fill', q: 'Make the reader forgive spaces and capital letters.',
        text: 'def read_order(line):\n    parts = line.___(",")\n    name = parts[0].___().___()\n    if name not in COOKIES:\n        raise ValueError("unknown cookie: " + name)',
        options: ['split', 'strip', 'lower', 'upper', 'append'],
        answer: ['split', 'strip', 'lower'],
        why: 'Cut the line at the commas. Trim the first piece. Make it small letters. Then check the cleaned name against the guest list.',
        hint: 'The list of cookies is written in small letters, so the name has to end up in small letters too.'
      },
      {
        type: 'bucket', q: 'An order arrives. Forgive it, or send it back?',
        buckets: ['Only the form is off: accept', 'The meaning is unclear: send back'],
        items: [
          ['GINGER,2', 0],
          ['ginger , 2', 0],
          ['ginger,2,gift', 0],
          ['ginger,a couple', 1],
          ['ginger,-2', 1],
          ['biscuit,2', 1]
        ],
        why: 'Capital letters, spaces and an extra column leave one sensible reading: 2 ginger cookies. "A couple", minus 2 and a cookie that is not on the menu do not.',
        hint: 'Ask of each one: is there exactly one sensible reading?'
      },
      {
        type: 'pick', q: 'Back to lesson 22, Fail fast. The line <code>choc chip,-5</code> arrives. What should a "forgiving" reader do?',
        options: ['Flip it to 5. That is probably what they meant.', 'Accept -5. Forgiving means accepting.', 'Send it back and say: count must be 1 to 100', 'Change it to 1 so that the order still goes through'],
        answer: 2,
        why: 'Forgiving is about <b>form</b>, never about meaning. Flipping the sign or making up a 1 is a guess. Lesson 22 called a made-up value a quiet bug in a tidy coat. Stop at the gate and say clearly what was wrong.',
        hint: 'Is there exactly one sensible reading of minus 5 cookies?'
      },
      {
        type: 'pick', q: 'Three jobs in Maya\'s shop send a reply to the delivery app. What is the best way to keep every reply in the agreed format?',
        pic: code([
          'def tell_ready(name, count):',
          '    send("ready: " + str(count) + " " + name)',
          '',
          'def tell_late(name, count):',
          '    send("LATE " + name + " x" + str(count))',
          '',
          'def tell_cancelled(name, count):',
          '    send(name + "," + str(count) + ",cancelled")'
        ], { title: 'replies.py' }),
        options: ['Ask the delivery app to accept all three shapes', 'One job builds every reply, and all three senders call it', 'Check each reply by eye before it is sent', 'Add capital letters so that the replies stand out'],
        answer: 1,
        why: 'Strict in what you send. One writer, like <code>confirmation</code>, means there is one shape and one place to change it. Asking the receiver to cope is pushing your mess onto somebody else.',
        hint: 'How did Maya make sure both of her senders used the same format?'
      },
      {
        type: 'pick', q: 'Where should Maya be <b>strict</b> about what she accepts? Pick all that apply.',
        options: [
          'A staff password typed at the till',
          'The amount in a payment request',
          'A brand new format between two programs she writes herself',
          'The cookie name in a line from the delivery app, which she does not control'
        ],
        answer: [0, 1, 2],
        why: 'At a lock, with money, and in a new format where both ends are yours, reject anything that is not exactly right and say why. Forgiving form is for the messy outside world you cannot fix.',
        hint: 'Three of these are about access, money, or a format she fully controls.'
      }
    ]
  });
})();
