/* Lesson 27: Composition over inheritance (module 3). One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l27  Composition over inheritance
     ===================================================================== */

  /* ---- small icons shared by the pictures: clock = freshness, bow = gift wrap, van = delivery ---- */
  const clock = (x, y, on) => `<g opacity="${on === false ? 0.22 : 1}"><circle cx="${x}" cy="${y}" r="10" fill="${P.warnT}" stroke="${P.ink}" stroke-width="2.2"/><path d="M${x} ${y - 5} V${y} H${x + 4}" fill="none" stroke="${P.ink}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  const bow = (x, y, on) => `<g opacity="${on === false ? 0.22 : 1}"><path d="M${x} ${y} L${x - 10} ${y - 7} V${y + 7} Z M${x} ${y} L${x + 10} ${y - 7} V${y + 7} Z" fill="${P.dangerT}" stroke="${P.ink}" stroke-width="2.2" stroke-linejoin="round"/><circle cx="${x}" cy="${y}" r="3.4" fill="${P.danger}" stroke="${P.ink}" stroke-width="1.6"/></g>`;
  const van = (x, y, on) => `<g opacity="${on === false ? 0.22 : 1}"><path d="M${x - 11} ${y - 7} H${x + 3} V${y + 5} H${x - 11} Z M${x + 3} ${y - 3} H${x + 8} L${x + 11} ${y + 1} V${y + 5} H${x + 3} Z" fill="${P.tint}" stroke="${P.ink}" stroke-width="2.2" stroke-linejoin="round"/><circle cx="${x - 6}" cy="${y + 6}" r="3" fill="${P.ink}"/><circle cx="${x + 6}" cy="${y + 6}" r="3" fill="${P.ink}"/></g>`;
  const trio = (x, y, a, b, c) => clock(x - 28, y, a) + bow(x, y, b) + van(x + 28, y, c);
  const link = (x1, y1, x2, y2, col, dash) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col || P.ink}" stroke-width="2.5" stroke-linecap="round"${dash ? ' stroke-dasharray="5 6"' : ''}/>`;

  /* ---- The idea: a phone model for every mix, or one phone with apps ---- */
  const phone = (x, y, label, fill) => box(x, y, 96, 44, fill || P.white, 10) + T(x + 48, y + 20, label[0], { s: 12 }) + T(x + 48, y + 35, label[1], { s: 12 });
  const ideaPic = svg(600, 300, 'On the left, a different phone model for every mix of features: plain, camera, maps, music and so on, 8 models in all. On the right, one phone with three apps installed.',
    T(150, 28, 'A MODEL FOR EVERY MIX', { s: 12.5, f: P.danger }) + T(450, 28, 'ONE PHONE, THREE APPS', { s: 12.5, f: P.ok }) +
    `<line x1="300" y1="16" x2="300" y2="284" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    [['plain', 'phone'], ['camera', 'phone'], ['maps', 'phone'], ['music', 'phone'], ['camera +', 'maps'], ['camera +', 'music'], ['maps +', 'music'], ['camera +', 'maps + music']].map((l, i) =>
      phone(40 + (i % 2) * 116, 44 + Math.floor(i / 2) * 54, l, i > 3 ? P.dangerT : P.white)).join('') +
    T(150, 282, '3 features, up to 8 models', { s: 13, w: 700, f: P.ink2 }) +
    box(390, 50, 120, 194, P.white, 20) + T(450, 78, 'phone', { s: 14 }) +
    box(408, 94, 84, 36, P.warnT, 9) + T(450, 117, 'camera', { s: 12.5 }) +
    box(408, 140, 84, 36, P.tint, 9) + T(450, 163, 'maps', { s: 12.5 }) +
    box(408, 186, 84, 36, P.okT, 9) + T(450, 209, 'music', { s: 12.5 }) +
    T(450, 282, '1 phone, 3 parts, any mix', { s: 13, w: 700, f: P.ink2 }));

  /* ---- The code: Maya's family tree ---- */
  const node = (cx, y, w, label, fill) => box(cx - w / 2, y, w, 36, fill || P.white, 10) + T(cx, y + 23, label, { s: 13, m: true });
  const treePic = svg(600, 246, 'A family tree of classes. Item is at the top. BakedItem and GiftItem are its children. Cookie and Cake are children of BakedItem. Mug is a child of GiftItem.',
    link(300, 52, 170, 92) + link(300, 52, 440, 92) + link(170, 128, 96, 172) + link(170, 128, 244, 172) + link(440, 128, 440, 172) +
    node(300, 16, 96, 'Item', P.tint) +
    node(170, 92, 132, 'BakedItem', P.warnT) + node(440, 92, 124, 'GiftItem', P.dangerT) +
    node(96, 172, 100, 'Cookie') + node(244, 172, 88, 'Cake') + node(440, 172, 80, 'Mug') +
    clock(88, 110) + T(42, 104, 'half price', { s: 12, w: 700, f: P.ink2 }) + T(42, 119, 'at closing', { s: 12, w: 700, f: P.ink2 }) +
    bow(520, 110) + T(562, 114, 'gift wrap', { s: 12, w: 700, f: P.ink2 }) +
    T(300, 238, 'Read each line upwards as "is a kind of".', { s: 13, w: 700, f: P.ink2 }));
  const treeCode = [
    'class Item:',
    '    name = ""',
    '    price = 0',
    '',
    'class BakedItem(Item):',
    '    best_before = ""',
    '    def closing_price(self):',
    '        return self.price * 0.5',
    '',
    'class GiftItem(Item):',
    '    message = ""',
    '    def wrapped_price(self):',
    '        return self.price + 2'
  ];
  const leafCode = [
    'class Cookie(BakedItem):',
    '    name = "cookie"',
    '    price = 3',
    '',
    'class Cake(BakedItem):',
    '    name = "cake"',
    '    price = 20',
    '',
    'class Mug(GiftItem):',
    '    name = "mug"',
    '    price = 12'
  ];
  const codePic = `<div style="width:100%">${treePic}${code(treeCode, { title: 'items.py', hi: [5, 10] })}${code(leafCode, { title: 'items.py, further down', hi: [5] })}</div>`;

  /* ---- The pain: one branch only, then the count ---- */
  const boxCode = [
    'class GiftCookieBox(BakedItem):',
    '    name = "gift cookie box"',
    '    price = 18',
    '    message = ""                 # copied from GiftItem',
    '    def wrapped_price(self):     # copied from GiftItem',
    '        return self.price + 2    # copied from GiftItem'
  ];
  const mixes = [['Item', 0, 0, 0], ['BakedItem', 1, 0, 0], ['GiftItem', 0, 1, 0], ['DeliveredItem', 0, 0, 1], ['BakedGiftItem', 1, 1, 0], ['DeliveredBakedItem', 1, 0, 1], ['DeliveredGiftItem', 0, 1, 1], ['DeliveredBakedGiftItem', 1, 1, 1]];
  const countPic = svg(600, 318, 'Three features, each one on or off, make 2 times 2 times 2, which is 8 mixes. As a family tree that could need 8 classes. As parts it needs 3 small parts.',
    T(196, 26, 'AS A TREE: ONE CLASS PER MIX', { s: 12.5, f: P.danger }) + T(496, 26, 'AS PARTS', { s: 12.5, f: P.ok }) +
    `<line x1="398" y1="14" x2="398" y2="300" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    mixes.map((m, i) => {
      const x = 10 + (i % 2) * 190, y = 40 + Math.floor(i / 2) * 60;
      return box(x, y, 180, 48, i > 3 ? P.dangerT : P.white, 10) + T(x + 90, y + 19, m[0], { s: 11, m: true }) + trio(x + 90, y + 35, !!m[1], !!m[2], !!m[3]);
    }).join('') +
    T(196, 300, '2 × 2 × 2 = 8 classes', { s: 14, f: P.danger }) +
    [['Freshness', P.warnT, clock], ['GiftWrap', P.dangerT, bow], ['Delivery', P.tint, van]].map((p, i) => {
      const y = 52 + i * 74;
      return box(424, y, 150, 56, p[1], 12) + p[2](452, y + 28) + T(512, y + 33, p[0], { s: 13, m: true });
    }).join('') +
    T(496, 300, '3 small parts', { s: 14, f: P.ok }));
  const painPic = `<div style="width:100%">${code(boxCode, { title: 'items.py, the gift cookie box', bad: [4, 5, 6] })}${countPic}</div>`;

  /* ---- The fix: one Item that has parts ---- */
  const partsCode = [
    'class Freshness:',
    '    best_before = ""',
    '    def closing_price(self, price):',
    '        return price * 0.5',
    '',
    'class GiftWrap:',
    '    message = ""',
    '    def cost(self):',
    '        return 3',
    '',
    'class Delivery:',
    '    def cost(self):',
    '        return 5'
  ];
  const itemCode = [
    'class Item:',
    '    name = ""',
    '    price = 0',
    '    freshness = None',
    '    gift_wrap = None',
    '    delivery = None',
    '',
    '    def total(self):',
    '        amount = self.price',
    '        if self.gift_wrap is not None:',
    '            amount = amount + self.gift_wrap.cost()',
    '        if self.delivery is not None:',
    '            amount = amount + self.delivery.cost()',
    '        return amount'
  ];
  const shopCode = [
    'box = Item()',
    'box.name = "gift cookie box"',
    'box.price = 18',
    'box.freshness = Freshness()',
    'box.gift_wrap = GiftWrap()',
    '',
    'cake = Item()',
    'cake.name = "delivered cake"',
    'cake.price = 20',
    'cake.freshness = Freshness()',
    'cake.delivery = Delivery()'
  ];
  const fixPic = `<div style="width:100%">${code(partsCode, { title: 'parts.py', hi: [1, 6, 11] })}${code(itemCode, { title: 'item.py', good: [4, 5, 6] })}${code(shopCode, { title: 'shop.py', good: [4, 5, 10, 11] })}</div>`;

  /* ---- The test: is a, or has a ---- */
  const testPic = svg(600, 262, 'Two columns. Is a: a choc chip cookie is a kind of cookie, in every way, forever. Has a: a gift cookie box only needs the wrapping, so give it a gift wrap part.',
    T(150, 28, '"IS A KIND OF"', { s: 12.5, f: P.accent }) + T(450, 28, '"HAS A"', { s: 12.5, f: P.ok }) +
    `<line x1="300" y1="16" x2="300" y2="246" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    node(150, 50, 110, 'Cookie', P.tint) + link(150, 86, 150, 128, P.accent) + node(150, 128, 180, 'ChocChipCookie') +
    T(150, 192, 'in every way, forever', { s: 13 }) +
    T(150, 214, 'a child class can fit', { s: 13, w: 700, f: P.ink2 }) +
    box(354, 50, 192, 114, P.white, 14) + T(450, 76, 'gift cookie box', { s: 13 }) +
    box(370, 92, 76, 56, P.warnT, 10) + clock(408, 112) + T(408, 140, 'fresh', { s: 11, w: 700, f: P.ink2 }) +
    box(454, 92, 76, 56, P.dangerT, 10) + bow(492, 112) + T(492, 140, 'wrap', { s: 11, w: 700, f: P.ink2 }) +
    T(450, 192, 'it just needs the wrapping', { s: 13 }) +
    T(450, 214, 'give it the part', { s: 13, w: 700, f: P.ink2 }) +
    T(300, 252, 'Needing something a class has is not the same as being that class.', { s: 12.5, w: 700, f: P.ink2 }));

  /* ---- When not to: a part for every fact ---- */
  const overCode = [
    'class Naming:',
    '    text = ""',
    '',
    'class Pricing:',
    '    amount = 0',
    '',
    'class Item:',
    '    naming = None',
    '    pricing = None',
    '',
    'cookie = Item()',
    'cookie.naming = Naming()',
    'cookie.naming.text = "cookie"'
  ];
  const plainCode = [
    'cookie = Item()',
    'cookie.name = "cookie"',
    'cookie.price = 3'
  ];
  const overPic = `<div style="width:100%">${code(overCode, { title: 'item.py, a part for every fact', bad: [12, 13] })}${code(plainCode, { title: 'the plain version says the same', good: [2, 3] })}</div>`;

  COURSE.add({
    id: 'l27', minutes: 10,
    summary: 'When two things need the same behaviour, do not rush to make one a "kind of" the other. Give each thing the <b>parts</b> it needs. That is <b>composition over inheritance</b>: build from parts, not family trees.',
    video: {
      src: 'videos/l27-composition.mp4', poster: 'videos/l27-composition.jpg', length: '1 min 3 s',
      script: [
        'Maya sorts everything she sells into a family tree.',
        'At the top, Item. Under it, 2 branches. Baked items, which go half price at closing. And gift items, which can be wrapped.',
        'A cake is a kind of baked item, so it gets the half price rule for free. That is inheritance.',
        'Then comes the gift cookie box. It is baked. It is also a gift. But a tree gives it only one branch. So Maya copies the wrapping code across.',
        'Then delivery arrives. 3 features, and every mix needs its own class. That is up to 8 classes.',
        'The fix. One plain item, and 3 small parts. Freshness. Gift wrap. Delivery. Snap on the ones you need.',
        'A gift cookie box? Freshness and gift wrap. A delivered cake? Freshness and delivery. No new classes.',
        'That is composition over inheritance. Build from parts, not family trees.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'One phone, many apps.',
        text: [
          'Things in a program are often alike. A cake and a cookie are both things Maya sells. One well-known way to share code between them is <b>inheritance</b>. You say that one class <b>is a kind of</b> another class, and it automatically gets everything the other one has. The classes form a <b>family tree</b>, with children under their parents.',
          'People like it because it looks like <b>free reuse</b>. Write a rule once at the top, and everything below gets it.',
          'Now picture buying phones that way. There is a camera phone and a maps phone. Want both? That is a third model. Add music, and with 3 features there could be up to <b>8 models</b>. Real phones do not work like that. You own <b>one phone</b> and install the apps you need.',
          'Building a thing out of parts that it <b>has</b> is called <b>composition</b>. The principle says: when you want to reuse behaviour, prefer giving an object the <b>parts it needs</b> over making it a child in a family tree.'
        ],
        tip: 'The advice comes from the 1994 book <b>Design Patterns</b>. Its four authors are known as the Gang of Four. The book advises favouring object composition over class inheritance.'
      },
      {
        label: 'The code', pic: codePic,
        h: "Maya's family tree.",
        text: [
          'In lesson 19, a <code>class</code> bundled some data with the jobs that work on it. Maya now has a class for the things she sells. Every <code>Item</code> has a name and a price.',
          'Line 5 has the new piece of Python: <code>class BakedItem(Item):</code>. The name in brackets is the <b>parent</b>. It says "a BakedItem is a kind of Item", so a BakedItem starts with <b>everything Item has</b>, here a name and a price. Then it adds its own things: a best-before date, and a job that works out the half price for closing time.',
          'A child can also <b>replace</b> what it was given. <code>Cake</code> replaces the empty name and the 0 price with its own.',
          'Now ask a cake for its closing price: <code>Cake().closing_price()</code>. <code>Cake</code> has no such job. So Python looks in its parent, <code>BakedItem</code>, and finds it there. <code>self.price</code> is the cake\'s own 20, and half of 20 is <b>10</b>. In the same way a mug can be wrapped: 12 plus the $2 gift wrap from lesson 8 is <b>14</b>.',
          '<code>Cake</code> is three lines long and it got a half price rule it never wrote. Tidy.'
        ],
        tip: 'The words you will hear: the parent is also called the <b>base class</b>, the child <b>inherits</b> from it, and replacing something from the parent is called <b>overriding</b>.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Baked and a gift. Which branch?',
        text: [
          'Maya starts selling a <b>gift cookie box</b>. It is baked, so it needs a best-before date and the half price rule. It is also a gift, so it needs wrapping and a message card. Which branch does it hang on?',
          'She picks <code>BakedItem</code> and <b>copies</b> the wrapping lines in from <code>GiftItem</code>. That breaks lesson 6, DRY: the wrapping rule now has two homes.',
          'A month later gift wrap goes up from $2 to $3. Maya changes <code>GiftItem</code>. A wrapped mug is now 12 + 3 = <b>$15</b>. Correct. The box still uses its own copy: 18 + 2 = <b>$20</b>. It should be $21. Nothing crashed.',
          'Then customers ask for <b>delivery</b>. Cakes can be delivered. So can mugs. So can gift cookie boxes. Now there are 3 features, and each one is on or off for every item. That is 2 × 2 × 2 = <b>8 mixes</b>, and in a tree each mix wants <b>a class of its own</b>.'
        ],
        warn: 'Some languages, Python among them, let a class have two parents. That brings puzzles of its own: if both parents have a job with the same name, which one wins? And it does not shrink the count. Every mix still needs its own class.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'One Item that has parts.',
        text: [
          'Maya stops asking "what kind of thing is it?" and asks <b>"what does it have?"</b>. Each feature becomes one small class, a <b>part</b>: <code>Freshness</code>, <code>GiftWrap</code> and <code>Delivery</code>.',
          'There is now one <code>Item</code> class with three empty slots. <code>None</code> means "nothing here", as in lesson 21. A plain item has no parts at all.',
          'Look at <code>shop.py</code>. A gift cookie box is an <code>Item</code> that <b>has a</b> freshness part and <b>has a</b> gift wrap part. Nobody had to decide which branch it belongs to.',
          'The <code>total</code> job asks each part the item really has. <code>is not None</code> asks "is there one?", as in lesson 21. For the box: 18, plus 3 for the wrap, is <b>$21</b>. For the delivered cake: 20, plus 5 for delivery, is <b>$25</b>.',
          'Next week Maya sells a mug that can be delivered. That is one <code>Item</code> with a <code>GiftWrap</code> and a <code>Delivery</code>. A new mix of old parts, and <b>zero new classes</b>. And when gift wrap goes up again, it changes on line 9 of <code>parts.py</code>, for every item at once.'
        ],
        tip: 'Parts can be <b>swapped</b> too. If a customer decides to collect the cake, <code>cake.delivery = None</code> takes the part off. In the tree, a cake and a delivered cake were two different classes. <code>Item</code> can get a <code>closing_price</code> job in the same style as <code>total</code>: ask the freshness part if there is one.'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Is it one, or does it need one?',
        text: [
          'Before you write a class with a parent in brackets, ask: <b>"Is this truly a kind of that thing, in every way, forever? Or does it just need something that thing has?"</b>',
          'Try the gift cookie box and <code>GiftItem</code>. Is the box a gift item in every way? No. It also goes stale, and a mug never does. It just <b>needs the wrapping</b>. So give it the wrapping part.',
          'Try a choc chip cookie and <code>Cookie</code>. In every way, forever? Yes. A child class would fit.',
          'Listen to your own sentence. "It is a..." points to a family tree. "It has a..." or "it needs the..." points to a part.'
        ],
        tip: 'Real things rarely fit one branch. If you catch yourself copying code from a cousin class, or writing a class name like <code>DeliveredBakedGiftItem</code>, the tree is the wrong shape.'
      },
      {
        label: 'When not to', pic: overPic,
        h: 'Inheritance is not banned.',
        text: [
          'The principle says <b>prefer</b>, not never. A shallow, steady tree is fine, and it is often the simplest code. If Maya only ever sold baked things, <code>class Cake(BakedItem):</code> would be all she needs. The rule of thumb: the child must be able to stand in for the parent <b>everywhere</b>. That has a name and an exact test: lesson 30, Liskov substitution.',
          'Ready-made toolkits often ask you to make your class a child of one of theirs. Python\'s own testing toolkit does this. That is how the toolkit is meant to be used. Go along with it.',
          'Parts have a cost too. There are more small pieces, and one more hop to follow when you read, as lesson 4, Trade-offs, not laws, warned. Suppose Maya loves this lesson and turns <b>every fact</b> into a part. Look at the first picture. To name a cookie she now writes <code>cookie.naming.text</code>. Two classes and an extra dot, and nothing was gained. A name is never mixed, swapped or left out.',
          'So do not break a simple two-class tree into parts on day one. Wait for the first item that wants to sit on <b>two branches</b>. That is lesson 8, YAGNI.'
        ],
        warn: 'A part earns its place when it can be mixed, swapped or left out. A plain fact that every item has, like a name or a price, can stay a plain fact.'
      }
    ],
    quiz: [
      {
        type: 'type', q: 'This is the family tree from the start of the lesson. What does <code>Cake().closing_price()</code> hand back? Type the number.',
        pic: code([
          'class Item:',
          '    price = 0',
          '',
          'class BakedItem(Item):',
          '    def closing_price(self):',
          '        return self.price * 0.5',
          '',
          'class Cake(BakedItem):',
          '    price = 20'
        ], { title: 'items.py' }),
        prompt: 'closing price >',
        answers: ['10', '10.0', '10.00', '$10', 'ten'],
        why: '<code>Cake</code> has no <code>closing_price</code> job of its own, so Python uses the one from its parent, <code>BakedItem</code>. The price is the cake\'s own 20, and 20 times 0.5 is 10.',
        hint: 'Cake gets the job from its parent, but the price is its own.'
      },
      {
        type: 'pick', q: 'Which class is the <b>parent</b> of <code>Mug</code>?',
        pic: code([
          'class Item:',
          '    price = 0',
          '',
          'class GiftItem(Item):',
          '    message = ""',
          '',
          'class Mug(GiftItem):',
          '    price = 12'
        ], { title: 'items.py' }),
        options: ['Item', 'GiftItem', 'Mug', 'It has no parent'],
        answer: 1,
        why: 'The parent is the name in the brackets on the <code>class</code> line. <code>Mug</code> is a kind of <code>GiftItem</code>, and <code>GiftItem</code> is a kind of <code>Item</code>.',
        hint: 'Look inside the brackets on line 7.'
      },
      {
        type: 'type', q: 'Back to lesson 6. Gift wrap went up to $3, and Maya changed line 3. What does <code>GiftCookieBox().wrapped_price()</code> hand back? Type the number.',
        pic: code([
          'class GiftItem(Item):',
          '    def wrapped_price(self):',
          '        return self.price + 3',
          '',
          'class GiftCookieBox(BakedItem):',
          '    price = 18',
          '    def wrapped_price(self):     # copied',
          '        return self.price + 2    # copied'
        ], { title: 'items.py', good: [3], bad: [8] }),
        prompt: 'wrapped price >',
        answers: ['20', '20.0', '$20', 'twenty'],
        why: 'The box is not a child of <code>GiftItem</code>, so it never sees the new $3. It uses its own copy: 18 plus 2 is 20. It should be 21. This is the bug from lesson 6, DRY: one rule, two homes, and the copies drifted apart.',
        hint: 'Which wrapped_price does the box use: the one on line 3, or its own on line 8?'
      },
      {
        type: 'pick', q: 'Maya adds a fourth feature: some items are sold frozen. Each feature can be on or off. How many mixes are there now, and how many parts would she need?',
        options: ['8 mixes, 4 parts', '12 mixes, 4 parts', '16 mixes, 4 parts', '16 mixes, 16 parts'],
        answer: 2,
        why: '2 × 2 × 2 × 2 = 16. A tree could need up to 16 classes, one per mix. With composition, a new feature is one new part, so 4 parts cover all 16 mixes.',
        hint: 'Every new feature doubles the number of mixes. It adds just one part.'
      },
      {
        type: 'fill', q: 'Build a birthday cake that goes stale and gets delivered. No gift wrap.',
        text: 'cake = ___()\ncake.price = 20\ncake.freshness = ___()\ncake.___ = Delivery()',
        options: ['Item', 'Freshness', 'delivery', 'GiftWrap', 'Cake', 'gift_wrap'],
        answer: ['Item', 'Freshness', 'delivery'],
        why: 'There is one <code>Item</code> class. The cake <b>has a</b> freshness part and <b>has a</b> delivery part. The gift wrap slot stays empty.',
        hint: 'There is no Cake class any more. Every product is an Item with parts.'
      },
      {
        type: 'type', q: 'A customer wants a cake, gift wrapped and delivered. What does <code>cake.total()</code> hand back? Type the number.',
        pic: code([
          'cake = Item()',
          'cake.price = 20',
          'cake.freshness = Freshness()',
          'cake.gift_wrap = GiftWrap()    # cost() hands back 3',
          'cake.delivery = Delivery()     # cost() hands back 5'
        ], { title: 'shop.py' }),
        prompt: 'total >',
        answers: ['28', '28.0', '$28', 'twenty eight', 'twenty-eight'],
        why: '<code>total</code> starts with the price, 20. The cake has a gift wrap part, so 3 is added. It has a delivery part, so 5 is added. 20 + 3 + 5 = 28. The freshness part adds nothing to the total.',
        hint: 'Start with the price, then add the cost of the gift wrap part and the delivery part.'
      },
      {
        type: 'bucket', q: 'Truly "a kind of", or does it just need a part?',
        buckets: ['Truly a kind of', 'Just needs a part'],
        items: [
          ['A choc chip cookie and Cookie', 0],
          ['A birthday cake and Cake', 0],
          ['A gift cookie box wants the wrapping code from GiftItem', 1],
          ['A mug wants the delivery code from DeliveredCake', 1],
          ['A receipt wants the printing code from Printer', 1]
        ],
        why: 'A choc chip cookie is a cookie in every way, forever. The others only want one thing that another class happens to have. Give them that thing as a part.',
        hint: 'Say it aloud. "A receipt is a kind of printer." Does that sound true?'
      },
      {
        type: 'pick', q: 'When is plain inheritance a fine choice? Pick all that apply.',
        options: [
          'A small, steady tree where the child can stand in for the parent everywhere',
          'A ready-made toolkit asks you to make your class a child of one of theirs',
          'Two classes happen to share three lines today',
          'A new item needs code from two different branches'
        ],
        answer: [0, 1],
        why: 'A true, steady "is a" is often the simplest code, and toolkits are built to be used that way. Sharing a few lines is not "is a". And an item that wants two branches is exactly where the tree breaks.',
        hint: 'Two of these are about a true "is a". Two are about wanting someone else\'s code.'
      }
    ]
  });
})();
