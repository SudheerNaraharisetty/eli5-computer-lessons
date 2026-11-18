/* Lesson 19: Encapsulation (module 2). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l19  Encapsulation
     ===================================================================== */

  /* ---- The idea: a bank teller ---- */
  const bankPic = svg(600, 280, 'A customer asks a bank teller to take out money. The teller checks the balance in the vault first. A request for 50 dollars goes through. A request for 500 dollars is turned away.',
    T(105, 34, 'YOU ASK', { s: 12.5, f: P.ink2 }) + T(300, 34, 'THE TELLER CHECKS', { s: 12.5, f: P.accent }) + T(490, 34, 'THE VAULT', { s: 12.5, f: P.ink2 }) +
    box(30, 62, 150, 46, P.okT, 12) + T(105, 91, 'take out $50', { s: 14, f: P.ok }) +
    box(30, 150, 150, 46, P.dangerT, 12) + T(105, 179, 'take out $500', { s: 14, f: P.danger }) +
    box(236, 62, 128, 134, P.tint, 16) + T(300, 112, 'teller', { s: 16, f: P.accent }) + T(300, 136, 'is there', { s: 12.5, w: 700, f: P.ink2 }) + T(300, 153, 'enough?', { s: 12.5, w: 700, f: P.ink2 }) +
    arrow(186, 85, 230, 85, P.ok, 3) + arrow(186, 173, 230, 173, P.danger, 3) +
    arrow(370, 85, 414, 85, P.ok, 3) +
    `<line x1="372" y1="161" x2="396" y2="185" stroke="${P.danger}" stroke-width="4" stroke-linecap="round"/><line x1="396" y1="161" x2="372" y2="185" stroke="${P.danger}" stroke-width="4" stroke-linecap="round"/>` +
    box(420, 62, 150, 134, P.white, 16) + T(495, 108, 'your balance', { s: 12.5, w: 700, f: P.ink2 }) + T(495, 146, '$80', { s: 28, m: true }) + T(495, 176, 'private', { s: 12.5, f: P.accent }) +
    T(300, 238, 'Nobody walks into the vault.', { s: 14 }) +
    T(300, 260, 'Every change goes past someone who checks the rules.', { s: 13, w: 700, f: P.ink2 }));

  /* ---- The code and the pain: the open shelf ---- */
  const shelfCode = [
    'def earn_points(card, price):',
    '    card.points = card.points + price',
    '',
    'def use_free_cookie(card):',
    '    card.points = card.points - 30',
    '',
    'def birthday_gift(card):',
    '    card.points = card.points + 10',
    '',
    'def review_thanks(card):',
    '    card.points = card.points + 5'
  ];
  const refundCode = shelfCode.concat(['', 'def refund(card, price):', '    card.points = card.points - price']);

  const jobs = ['earn', 'free cookie', 'birthday', 'review', 'refund'];
  const whoPic = svg(600, 196, 'Five jobs all write to card.points. The value is minus 12 and nothing says which job wrote it.',
    jobs.map((s, i) => {
      const x = 14 + i * 116;
      return box(x, 14, 106, 36, P.white, 10) + T(x + 53, 37, s, { s: 12.5 }) + arrow(x + 53, 56, 240 + i * 30, 112, P.danger, 2.5) +
        T(x + 53, 84, '?', { s: 17, f: P.danger });
    }).join('') +
    box(170, 120, 260, 50, P.dangerT, 14) + T(300, 152, 'card.points   -12', { s: 17, m: true, f: P.danger }) +
    T(300, 192, 'Five jobs can write here. The number does not say which one did.', { s: 12.5, w: 700, f: P.ink2 }));
  const painPic = `<div style="width:100%">${code(refundCode, { title: 'points.py, with the new refund job', bad: [14] })}${whoPic}</div>`;

  /* ---- The fix: a class with two doors ---- */
  const cardClass = [
    'class LoyaltyCard:',
    '    _points = 0',
    '',
    '    def balance(self):',
    '        return self._points',
    '',
    '    def earn(self, amount):',
    '        self._points = self._points + amount',
    '',
    '    def spend(self, amount):',
    '        if amount > self._points:',
    '            return False',
    '        self._points = self._points - amount',
    '        return True'
  ];
  const callers = [
    'def use_free_cookie(card):',
    '    return card.spend(30)',
    '',
    'def refund(card, price):',
    '    return card.spend(price)'
  ];
  const fixPic = `<div style="width:100%">${code(cardClass, { title: 'card.py', hi: [2], good: [11, 12] })}${code(callers, { title: 'points.py, two of the five jobs', good: [2, 5] })}</div>`;

  /* ---- The test: walk the doors ---- */
  const row = (y, name, verdict, ok) =>
    box(318, y, 120, 34, P.white, 10) + T(378, y + 22, name, { s: 13, m: true }) +
    T(452, y + 22, verdict, { s: 12.5, w: 700, f: ok ? P.ok : P.danger, a: 'start' });
  const doorsPic = svg(600, 250, 'On the open shelf any line can write minus 12, so the answer to the test is yes. With the class you check three doors. balance only looks, spend checks, and earn has a gap.',
    T(150, 30, 'OPEN SHELF', { s: 12.5, f: P.danger }) + T(450, 30, 'BEHIND DOORS', { s: 12.5, f: P.ok }) +
    `<line x1="300" y1="20" x2="300" y2="236" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    box(34, 56, 232, 44, P.dangerT, 12) + T(150, 84, 'card.points = -12', { s: 14, m: true, f: P.danger }) +
    T(150, 130, 'any line, anywhere, can do this', { s: 13, w: 700, f: P.ink2 }) +
    T(150, 176, 'Can the outside break it?', { s: 13 }) + T(150, 204, 'YES', { s: 22, f: P.danger }) +
    row(52, 'balance()', 'only looks', true) + row(98, 'spend()', 'checks first', true) + row(144, 'earn()', 'earn(-50)? a gap', false) +
    T(450, 204, 'three doors to check,', { s: 13 }) + T(450, 224, 'not the whole program', { s: 13, w: 700, f: P.ink2 }));
  const earnFixed = [
    'def earn(self, amount):',
    '    if amount > 0:',
    '        self._points = self._points + amount'
  ];
  const testPic = `<div style="width:100%">${doorsPic}${code(earnFixed, { title: 'card.py, the earn door with its check', good: [2] })}</div>`;

  /* ---- When not to: doors that check nothing ---- */
  const ceremony = [
    'class Cookie:',
    '    _name = "choc chip"',
    '    _flavour = "sweet"',
    '',
    '    def get_name(self):',
    '        return self._name',
    '    def set_name(self, name):',
    '        self._name = name',
    '',
    '    def get_flavour(self):',
    '        return self._flavour',
    '    def set_flavour(self, flavour):',
    '        self._flavour = flavour'
  ];
  const plain = [
    'cookie.name = "choc chip"',
    'cookie.flavour = "sweet"'
  ];
  const overPic = `<div style="width:100%">${code(ceremony, { title: 'cookie.py, four doors that check nothing', bad: [8, 13] })}${code(plain, { title: 'the plain version does exactly the same', good: [1, 2] })}</div>`;

  COURSE.add({
    id: 'l19', minutes: 9,
    summary: 'A part of a program should <b>keep its own data inside</b> and let the outside change it only through a few doors that it controls. That is <b>encapsulation</b>. The doors check the rules, so nobody outside can break the data.',
    video: {
      src: 'videos/l19-encapsulation.mp4', poster: 'videos/l19-encapsulation.jpg', length: '1 min 1 s',
      script: [
        "Maya's loyalty card has one shop rule. Points can never go below zero.",
        'In her code, the points sit like a jar on an open shelf. 4 jobs reach in and change the number themselves.',
        'Then a fifth job arrives. Refunds. It takes 20 points back, and it never checks.',
        'Ben had 8 points. Now he has -12. Days later, Maya sees it on a receipt. 5 jobs touch that jar. Which one did it?',
        'The fix. Move the points behind a counter, with two small doors. Earn, and spend. Nothing else can touch them.',
        'Spend checks first. Not enough points? It says no.',
        'Now run the refund again. 20 from 8? Refused. Ben keeps his 8 points. And the rule lives in one place.',
        'That is encapsulation. Keep the insides private, and let the doors check the rules.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: bankPic,
        h: 'You cannot walk into the vault.',
        text: [
          'At a bank, you cannot walk into the vault and write a new number on your account. You ask a <b>teller</b>, and the teller checks first. Take out $50 when you have $80? Fine. Take out $500? No.',
          '<b>Encapsulation</b> means a part of a program keeps its own data <b>inside</b>. The outside can change that data only through <b>a few doors</b> that the part controls.',
          'Every change has to come through a door, so the door can <b>check the rules</b>. The data can never be left in a state that makes no sense, like a balance below zero.'
        ],
        tip: 'How is this different from lesson 18, Abstraction? Abstraction is about what the <b>user</b> of a part gets to ignore. Encapsulation is about what the part <b>protects</b>. A vending machine is both. One simple front with a few buttons is abstraction. A locked case, so nobody reaches in and takes the money, is encapsulation.'
      },
      {
        label: 'The code', pic: code(shelfCode, { title: 'points.py', hi: [2, 5, 8, 11] }),
        h: 'A jar on an open shelf.',
        text: [
          'Back to the loyalty card from lesson 2. <code>card.points</code> is the number of points on a customer\'s card. The shop has two rules. A free cookie <b>costs 30 points</b>. And points can <b>never go below zero</b>.',
          'Four jobs change the points. Buying earns 1 point per dollar. A free cookie takes 30 away. A birthday adds 10. A review adds 5. Each job reaches in and <b>writes the new number itself</b>.',
          'Now look for the rule "never below zero". It is <b>not in this file</b>. The till asks lesson 2\'s question, <code>card.points &gt;= 30</code>, before it runs <code>use_free_cookie</code>. So the rule holds only while <b>every writer remembers it</b>.'
        ],
        tip: '<code>card.points</code> is like a jar on an open shelf. Anyone walking past can put a hand in.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Minus twelve points.',
        text: [
          'Sam, Maya\'s helper, adds a fifth job. When a customer returns something, <code>refund</code> takes back the points it earned. It is two lines, just like the other four. It <b>checks nothing</b>.',
          'Ben has 38 points. He uses 30 on a free cookie, which leaves 8. Then he returns a $20 cake. The refund takes 20 from 8. Ben now has <b>-12 points</b>.',
          'Nothing crashes. A week later Maya sees a receipt that says <b>Points: -12</b>. Which job did it? <b>Five jobs</b> write to <code>card.points</code>, and the number does not say who wrote it. She has to read all five and guess.'
        ],
        warn: 'The receipt is where the problem <b>showed up</b>. It is not where the problem was <b>made</b>. With an open shelf, those two places can be far apart.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Behind a counter, with two doors.',
        text: [
          'This needs one new piece of Python. A <b>class</b> bundles some data with the jobs that work on that data. Here the data is the points, and the jobs are <code>balance</code>, <code>earn</code> and <code>spend</code>. Writing <code>card = LoyaltyCard()</code> makes a new card, and line 2 starts it at 0 points.',
          'Inside the class, <code>self</code> means <b>"this particular card"</b>. When a job says <code>card.spend(30)</code>, Python fills in <code>self</code> with that card, so the job only gives the amount.',
          'A name that starts with an underscore, like <code>_points</code>, is Python\'s way of saying <b>"private, hands off"</b>. To be honest, Python does not lock it. It is an agreement that programmers keep. Many other languages do enforce it.',
          'So the points now sit behind a counter. The outside gets <b>two doors</b>, <code>earn</code> and <code>spend</code>, and one way to look, <code>balance</code>. The <code>spend</code> door checks first. If the amount is more than the card holds, it hands back <code>False</code>, which means no, and <b>changes nothing</b>.',
          'Run Ben\'s refund again. He has 8 points and the refund asks for 20. Line 11 asks: is 20 more than 8? Yes. So the card says no, and Ben <b>keeps his 8 points</b>. Sam finds out the first time he tries his job, not a week later.'
        ],
        tip: 'The spending rule now has <b>one home</b>, as lesson 6, DRY, asked. If a card ever looks wrong, there is one small class to read, not five jobs. Here a bad request gets a quiet no. Sometimes it is better to stop the program loudly. That is lesson 22, Fail fast.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Can the outside break it?',
        text: [
          'Point at a piece of data and ask: <b>"Can outside code put this data into a state that makes no sense?"</b>',
          'Try it on the open shelf. Any line in the program can write <code>card.points = -12</code>. The answer is <b>yes</b>.',
          'Now try it on <code>LoyaltyCard</code>, one door at a time. <code>balance</code> only looks. <code>spend</code> checks first. And <code>earn</code>? Try <code>card.earn(-50)</code> on a card with 8 points. 8 plus -50 is <b>-42</b>. The test found a gap.',
          'Maya adds one check, so that <code>earn</code> only adds amounts above zero. Notice where the repair went. <b>One door</b>, not five jobs. Now the answer is <b>no</b>.'
        ],
        tip: 'With doors, checking the data means checking a few doors. With an open shelf, it means checking every line that can reach the shelf.'
      },
      {
        label: 'When not to', pic: overPic,
        h: 'A door that checks nothing is a hole.',
        text: [
          'After this lesson it is tempting to wrap <b>every</b> value in a class, with a <code>get_</code> job and a <code>set_</code> job for each one. Look at the first picture. Four doors, and <b>none of them checks anything</b>. <code>cookie.set_name("x")</code> saves whatever it is given, exactly as <code>cookie.name = "x"</code> would.',
          'That is <b>ceremony, not protection</b>. The door is just a hole with a longer name. The reader gets 13 lines to read, and they protect nothing.',
          'A simple bundle of facts <b>with no rules to keep</b>, like a name and a flavour, can stay plain. Add a door on the day a real rule arrives. If Maya decides a price must never be below zero, that is the day the price earns one.',
          'And do not hide what the outside really needs. A card with no <code>balance</code> would be very safe and no use to anyone. Lesson 18, Abstraction, gave the same warning about hiding too much.'
        ],
        warn: 'Ask the question from lesson 4, Trade-offs, not laws: <b>"Is this problem real right now?"</b> No rule to protect means no problem to solve.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'The points live in <code>LoyaltyCard</code> now. Which job breaks the agreement?',
        pic: code([
          'def earn_points(card, price):',
          '    card.earn(price)',
          '',
          'def double_day(card):',
          '    card._points = card._points * 2',
          '',
          'def show_points(card):',
          '    display(card.balance())'
        ], { title: 'points.py' }),
        options: ['earn_points', 'double_day', 'show_points', 'None of them'],
        answer: 1,
        why: '<code>double_day</code> reaches past the doors and writes <code>_points</code> itself. The underscore means hands off. It should ask through a door: <code>card.earn(card.balance())</code>.',
        hint: 'Look for a line outside the class that touches a name starting with an underscore.'
      },
      {
        type: 'type', q: 'Ben\'s card holds 8 points. Then <code>card.spend(20)</code> runs. What does <code>card.balance()</code> hand back now? Type the number.',
        pic: code(cardClass, { title: 'card.py', hi: [11, 12] }),
        prompt: 'points >',
        answers: ['8', 'eight'],
        why: 'Line 11 asks if 20 is more than 8. It is, so line 12 hands back <code>False</code> and the job ends there. Line 13 never runs. The card still holds 8.',
        hint: 'Walk through <code>spend</code> with amount 20. Does line 13 get a turn?'
      },
      {
        type: 'pick', q: 'A card holds 40 points. <code>card.spend(30)</code> runs, and then <code>card.spend(30)</code> runs again. What happens?',
        options: ['Both work, and the card holds -20', 'The first works and the second is refused. The card holds 10', 'Both are refused, and the card holds 40', 'The program crashes'],
        answer: 1,
        why: 'First time: 30 is not more than 40, so the card goes to 10. Second time: 30 is more than 10, so the door says no. The card can be asked twice. It cannot be pushed below zero.',
        hint: 'Work out the balance after the first call, then run the check again.'
      },
      {
        type: 'fill', q: 'Rebuild the <code>spend</code> door so it checks before it changes anything.',
        text: 'def spend(self, amount):\n    if amount > self.___:\n        return ___\n    self._points = self._points - amount\n    return True',
        options: ['_points', 'False', 'points', 'True'],
        answer: ['_points', 'False'],
        why: 'The door compares the amount with its own private points. If there are not enough, it hands back <code>False</code> and leaves the points alone.',
        hint: 'The private name starts with an underscore. And when there are not enough points, the answer is no.'
      },
      {
        type: 'bucket', q: 'Real protection, or just ceremony?',
        buckets: ['Real protection', 'Just ceremony'],
        items: [
          ['spend() refuses when there are not enough points', 0],
          ['A stock count that only changes through add() and remove(), and remove() checks', 0],
          ['set_name() saves whatever it is given', 1],
          ['A get_ and a set_ for every value, with no checks', 1],
          ['A class around a name and a flavour that have no rules', 1]
        ],
        why: 'A door earns its place by checking a rule. A door that lets everything through is a hole with a longer name.',
        hint: 'Ask of each one: does anything get checked?'
      },
      {
        type: 'match', q: 'Match each principle to what it is about.',
        pairs: [
          ['Encapsulation', 'What a part protects from the outside'],
          ['Abstraction (lesson 18)', 'What the user of a part gets to ignore'],
          ['DRY (lesson 6)', 'Every rule has one home'],
          ['Loose coupling (lesson 3)', 'Parts know little about each other']
        ],
        why: 'They work together. The doors hide the insides, protect the insides, give the rule one home, and keep other parts from leaning on <code>_points</code>.',
        hint: 'A vending machine has a simple front and a locked case. Which one is the lock?'
      },
      {
        type: 'pick', q: 'Back to lesson 1. A new shop rule arrives: a card can hold at most 500 points. Three jobs add points through <code>card.earn</code>. How many places must change?',
        pic: code([
          'def earn_points(card, price):',
          '    card.earn(price)',
          '',
          'def birthday_gift(card):',
          '    card.earn(10)',
          '',
          'def review_thanks(card):',
          '    card.earn(5)'
        ], { title: 'points.py' }),
        options: ['0', '1', '3', '5'],
        answer: 1,
        why: 'Only the <code>earn</code> door inside <code>LoyaltyCard</code> changes. Every job that adds points already goes through it. With the open shelf it would have been three edits, and three chances to miss one.',
        hint: 'Where do all three jobs send their points?'
      },
      {
        type: 'pick', q: 'With the open shelf, why was Ben\'s -12 so hard to track down? Pick all that apply.',
        options: ['Five jobs could all write to card.points', 'The bad number showed up far from the job that made it', 'The program crashed with an error message', 'The card had too many doors'],
        answer: [0, 1],
        why: 'Any of five writers could have done it, and the receipt only showed the result. A crash would have been easier, because a crash points at a line.',
        hint: 'Two of these really happened in the story. Nothing crashed.'
      }
    ]
  });
})();
