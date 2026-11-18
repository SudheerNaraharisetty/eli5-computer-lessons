/* Lesson 35: Review: SOLID and friends (module 3). Quiz only, no video. One file per lesson. */
(function () {
  const { P, code, svg, box, T, arrow } = PR;

  /* =====================================================================
     l35  Review: SOLID and friends
     ===================================================================== */
  // The five SOLID tiles: letter, name on two lines, lesson number.
  const solid = [['S', 'Single', 'responsibility', 16], ['O', 'Open/', 'closed', 29], ['L', 'Liskov', 'substitution', 30], ['I', 'Interface', 'segregation', 31], ['D', 'Dependency', 'inversion', 32]];
  // One row per principle of module 3: lesson number, name, its test question on two lines, its group, and its SOLID letter if it has one.
  const GROUP = { talk: P.okT, plug: P.tint, charge: P.warnT };
  const recapRows = [
    [25, ['Law of Demeter'], 'Am I reaching through one thing', 'into another thing\'s insides?', 'talk'],
    [26, ['Tell, don\'t ask'], 'Am I asking for this data only to make', 'a decision its owner should make?', 'talk'],
    [27, ['Composition over', 'inheritance'], 'Is it truly a kind of that thing, forever?', 'Or does it just need something it has?', 'plug'],
    [28, ['Program to an interface'], 'Does this code know which part it is', 'talking to, or only what it can ask for?', 'plug'],
    [29, ['Open/closed'], 'To add the next one of these, do I have', 'to edit code that already works?', 'plug', 'O'],
    [30, ['Liskov substitution'], 'Could I swap this in everywhere, with nobody', 'having to check which one they got?', 'plug', 'L'],
    [31, ['Interface segregation'], 'Does every part that signs this list really', 'use or provide everything on it?', 'plug', 'I'],
    [32, ['Dependency inversion'], 'Does my important rules code mention any', 'supplier, file type or brand by name?', 'charge', 'D'],
    [33, ['Dependency injection'], 'Does this code build or fetch its own', 'helpers, or is it handed them?', 'charge'],
    [34, ['Inversion of control'], 'Who decides when this code runs: my code,', 'or something my code handed itself to?', 'charge']
  ];
  const recapPic = svg(600, 790, 'At the top, the five SOLID letters as tiles. S, Single responsibility, lesson 16, from module 2. O, Open/closed, lesson 29. L, Liskov substitution, lesson 30. I, Interface segregation, lesson 31. D, Dependency inversion, lesson 32. Below, the ten principles of module 3, each with its test question. Law of Demeter: am I reaching through one thing into another thing\'s insides. Tell, don\'t ask: am I asking for this data only so that I can make a decision its owner should make. Composition over inheritance: is this truly a kind of that thing, in every way, forever, or does it just need something that thing has. Program to an interface: does this code know which part it is talking to, or only what it can ask for. Open/closed: to add the next one of these, do I have to edit code that already works. Liskov substitution: could I swap this in everywhere the original is used, without anyone having to check which one they got. Interface segregation: does every part that signs this list really use or provide everything on it. Dependency inversion: does my important rules code mention any supplier, file type or brand by name. Dependency injection: does this code build or fetch its own helpers, or is it handed them. Inversion of control: who decides when this code runs, my code or something my code handed itself to.',
    T(300, 24, 'SOLID: FIVE LETTERS', { s: 12.5 }) +
    solid.map((r, i) => {
      const x = 10 + i * 117;
      return box(x, 36, 108, 96, i ? P.white : P.sand, 14) + T(x + 54, 70, r[0], { s: 28, f: P.accent }) +
        T(x + 54, 90, r[1], { s: 11 }) + T(x + 54, 104, r[2], { s: 11 }) + T(x + 54, 123, 'lesson ' + r[3], { s: 11, w: 700, f: P.ink2 });
    }).join('') +
    T(300, 158, 'S is from module 2. The other four are from this module.', { s: 12, w: 700, f: P.ink2 }) +
    T(300, 184, 'MODULE 3: TEN PRINCIPLES, TEN QUESTIONS', { s: 12.5 }) +
    recapRows.map((r, i) => {
      const y = 196 + i * 56, cx = r[5] ? 125 : 141;
      return `<circle cx="24" cy="${y + 20}" r="13" fill="${P.ink}"/>` + T(24, y + 25, r[0], { s: 12, f: P.white }) +
        box(46, y, 190, 40, GROUP[r[4]], 10) +
        (r[1].length > 1 ? T(cx, y + 17, r[1][0], { s: 11.5 }) + T(cx, y + 32, r[1][1], { s: 11.5 }) : T(cx, y + 25, r[1][0], { s: r[5] ? 11.5 : 12 })) +
        (r[5] ? `<rect x="206" y="${y + 8}" width="24" height="24" rx="6" fill="${P.accent}"/>` + T(218, y + 25, r[5], { s: 13, f: P.white }) : '') +
        T(250, y + 17, r[2], { s: 12.5, w: 700, a: 'start' }) + T(250, y + 34, r[3], { s: 12.5, w: 700, a: 'start' });
    }).join('') +
    [['talk politely', 'talk', 16], ['plugs and sockets', 'plug', 150], ['who is in charge', 'charge', 310]].map(g =>
      `<rect x="${g[2]}" y="762" width="18" height="18" rx="5" fill="${GROUP[g[1]]}" stroke="${P.ink}" stroke-width="2.5"/>` +
      T(g[2] + 26, 776, g[0], { s: 12.5, a: 'start' })).join('') +
    `<rect x="466" y="762" width="18" height="18" rx="5" fill="${P.accent}"/>` + T(492, 776, 'SOLID letter', { s: 12.5, a: 'start' }));

  const playCode = [
    'def open_shop(shop):',
    '    radio = ShopRadio()',
    '    shop.kitchen.oven.switch_on()',
    '    radio.play()'
  ];
  const playPic = `<div style="width:100%">${code(playCode, { title: 'opening.py', bad: [2, 3] })}` +
    svg(600, 126, 'Line 2 breaks dependency injection because the job builds its own radio. Line 3 breaks the Law of Demeter because it reaches through the shop and the kitchen to the oven.',
      box(20, 16, 270, 64, P.dangerT, 14) + T(155, 42, 'line 2: builds its own radio', { s: 13 }) + T(155, 64, 'Dependency injection', { s: 13, f: P.danger }) +
      box(310, 16, 270, 64, P.dangerT, 14) + T(445, 42, 'line 3: reaches through the shop', { s: 13 }) + T(445, 64, 'Law of Demeter', { s: 13, f: P.danger }) +
      T(300, 114, 'one small job, two broken principles', { s: 13, w: 700, f: P.ink2 })) + `</div>`;

  /* ---------- quiz programs, all new ---------- */
  const fridgeCode = [
    'def milk_is_low(shop):',
    '    return shop.kitchen.fridge.milk_litres() < 2',
    '',
    'def morning_check(shop):',
    '    if shop.kitchen.fridge.is_too_warm():',
    '        call_repair()',
    '',
    'def shopping_list(shop):',
    '    if shop.needs_milk():',
    '        print_paper("Milk")',
    '',
    'def end_of_day(shop):',
    '    shop.kitchen.fridge.throw_out_old_milk()',
    '    shop.switch_off_lights()'
  ];
  const candleCode = [
    'def birthday_cake(candle_box, age):',
    '    if candle_box.left() >= age:',
    '        candle_box.take(age)',
    '        light_candles(age)',
    '',
    'def number_cake(candle_box, digits):',
    '    if candle_box.left() >= digits:',
    '        candle_box.take(digits)',
    '        light_candles(digits)'
  ];
  const staffCode = [
    '# before: class Baker(Staff) and class Driver(Staff)',
    '# after: one Staff class, and each duty is a part',
    '',
    'class Staff:',
    '    name = ""',
    '    duties = []',
    '',
    'class OvenDuty:',
    '    def start(self):',
    '        switch_on_oven()',
    '',
    'class VanDuty:',
    '    def start(self):',
    '        check_van_fuel()'
  ];
  const packCode = [
    'def pack(order, how):',
    '    if how == "box":',
    '        box_folder.fold_flat_pack()',
    '        box_folder.fill(order)',
    '    elif how == "bag":',
    '        bag_rack.open_next()',
    '        bag_rack.drop_in(order)',
    '    elif how == "tin":',
    '        tin_press.load(order)',
    '        tin_press.seal_lid()'
  ];
  const scaleCode = [
    '# the promise: weigh(item) hands back the weight in grams',
    '',
    'class CounterScale:',
    '    def weigh(self, item):',
    '        return counter_sensor.grams(item)',
    '',
    'class ParcelScale:',
    '    def weigh(self, item):',
    '        return parcel_sensor.kilos(item)',
    '',
    'def nut_price_cents(scale, bag):',
    '    grams = scale.weigh(bag)',
    '    return grams * 2'
  ];
  const boardCode = [
    'handlers = []',
    '',
    'def when_done(handler):',
    '    handlers.append(handler)',
    '',
    'def tray_done(tray):',
    '    for handler in handlers:',
    '        handler(tray)'
  ];
  const bakeryCode = [
    'import oven_board',
    '',
    'oven_board.when_done(beep_twice)',
    'oven_board.when_done(start_cooling_fan)',
    '',
    '# later, the oven finishes a tray',
    'oven_board.tray_done(tray_1)'
  ];
  const namesCode = [
    '# A: bake.py',
    'def bake(tray, timer):',
    '    timer.start(12)',
    '',
    '# B: oven_rules.py',
    'class Timer:',
    '    def start(self, minutes):',
    '        pass',
    '',
    '# B: dial_timer.py',
    'from oven_rules import Timer',
    '',
    'class DialTimer(Timer):',
    '    def start(self, minutes):',
    '        dial.turn_to(minutes)',
    '',
    '# C: alarms.py',
    'timer.when_time_is_up(open_oven_door)'
  ];
  const zoneCode = [
    'def delivery_zone(order):',
    '    town = order.address.town.strip().lower()',
    '    if town == "oakfield":',
    '        return "near"',
    '    return "far"'
  ];
  const drinkCode = [
    'class Drink:',
    '    name = ""',
    '    price = 0',
    '    def menu_line(self):',
    '        return self.name + "  $" + str(self.price)',
    '',
    'class Coffee(Drink):',
    '    name = "coffee"',
    '    price = 3',
    '',
    'class Tea(Drink):',
    '    name = "tea"',
    '    price = 2'
  ];
  const stickerCode = [
    '# the list. Every scale must offer:',
    '#   weigh(item)   set_to_zero()   print_sticker()',
    '',
    'class CounterScale:',
    '    def weigh(self, item):',
    '        return counter_sensor.grams(item)',
    '    def set_to_zero(self):',
    '        counter_sensor.reset()',
    '    def print_sticker(self):',
    '        sticker_roll.print_price()',
    '',
    'class PocketScale:',
    '    def weigh(self, item):',
    '        return pocket_sensor.grams(item)',
    '    def set_to_zero(self):',
    '        pocket_sensor.reset()',
    '    def print_sticker(self):',
    '        pass'
  ];
  const signCode = [
    'def window_sign(cake):',
    '    display(cake.name)',
    '    display("$" + str(cake.price))',
    '    display(str(cake.slices_left()) + " slices left")'
  ];
  const bunsCode = [
    'def morning_bake(bakery):',
    '    oven = GasOven()',
    '    if bakery.store_room.sugar_sack.kilos() >= 2:',
    '        bakery.store_room.sugar_sack.take(2)',
    '        oven.bake("buns")'
  ];

  COURSE.add({
    id: 'l35', minutes: 16,
    summary: 'Five SOLID letters and six friends, on one page. Then you are the detective again. Here is some code from Maya\'s shop: <b>which principle is being broken?</b>',
    parts: [
      {
        label: 'Recap', pic: recapPic,
        h: 'Five letters and six friends.',
        text: [
          'Module 3 was about <b>how pieces of code connect</b>. It gave you ten principles, and each one came with <b>one question to ask</b>. The picture puts all ten on one page. The number in the circle is the lesson.',
          'Four of the ten are letters of <b>SOLID</b>: O, L, I and D. The S is lesson 16, Single responsibility, from module 2. The strip at the top shows all five. The other six are the <b>friends</b>. They are not letters, but they work side by side with the letters.',
          'The ten fall into three groups. <b>Talk politely</b>: the Law of Demeter is about <b>who</b> a piece talks to. Only its close friends. Tell, don\'t ask is about <b>how</b> it talks. With a request, not an inspection.',
          '<b>Plugs and sockets</b>: Composition over inheritance builds a thing from parts. Program to an interface makes the socket, a short list of jobs. Open/closed is the reward: a new plug needs no edit to code that works. Liskov substitution is the safety rule: every plug must keep the promises. Interface segregation keeps each list small, so no plug has to fake a job.',
          '<b>Who is in charge</b>: three names that sound alike. Dependency inversion says the rules own the idea, and the details are built to fit it. Dependency injection hands a job its parts from outside. Inversion of control lets something else decide when your code runs.'
        ],
        tip: 'All ten serve the goal from lesson 1, Easy to change. Most of them are lesson 3, Loose coupling, turned into something you can check. And lesson 4, Trade-offs, not laws, applies to every one of them. Each can be overdone.'
      },
      {
        label: 'How to play', pic: playPic,
        h: 'Same game, bigger pieces.',
        text: [
          'In each lesson, the quiz asked "what does this principle mean?". In a review the question changes, as it did in lessons 14 and 24. You will see a small program from Maya\'s shop that you have not met before, and the question is: <b>which principle is being broken here?</b>',
          'Real code usually breaks <b>more than one</b>. Look at the picture. Line 2 builds its own radio, so nobody can hand the job a silent one for a try-out. Line 3 reaches through the shop and its kitchen to get at the oven. Two problems in four lines.',
          'A good way to work: run through the ten questions from the recap, one at a time. Stop at each one that gets a bad answer.'
        ],
        warn: 'Sometimes the code is <b>fine</b>. Then the right answer is "leave it alone". And sometimes two principles pull in different directions. Then you pick the better call and say why. That is lesson 4 at work.'
      }
    ],
    quiz: [
      {
        type: 'match', q: 'Warm up, part 1. Match each of these five principles to its test question.',
        pairs: [
          ['Law of Demeter', 'Am I reaching through one thing into another thing\'s insides?'],
          ['Tell, don\'t ask', 'Am I asking for this data only so that I can make a decision its owner should make?'],
          ['Composition over inheritance', 'Is this truly a kind of that thing, in every way, forever? Or does it just need something that thing has?'],
          ['Program to an interface', 'Does this code know which part it is talking to, or only what it can ask for?'],
          ['Open/closed', 'To add the next one of these, do I have to edit code that already works?']
        ],
        why: 'Lessons 25 to 29. The first two are about how a piece talks to its neighbours. The other three are about parts that plug in.',
        hint: 'Two of them are about talking to another object. One asks about the route. The other asks who makes the decision.'
      },
      {
        type: 'match', q: 'Warm up, part 2. Match the other five principles to their test questions.',
        pairs: [
          ['Liskov substitution', 'Could I swap this in everywhere the original is used, without anyone having to check which one they got?'],
          ['Interface segregation', 'Does every part that signs this list really use or provide everything on it?'],
          ['Dependency inversion', 'Does my important rules code mention any supplier, file type or brand by name?'],
          ['Dependency injection', 'Does this code build or fetch its own helpers, or is it handed them?'],
          ['Inversion of control', 'Who decides when this code runs: my code, or something my code handed itself to?']
        ],
        why: 'Lessons 30 to 34. Ten principles, ten questions. In the rest of this quiz, these questions are your tools. Ask them of each program in turn.',
        hint: 'Three of the names sound alike. One is about what the rules mention. One is about where the helpers come from. One is about the moment.'
      },
      {
        type: 'type', q: 'Back to lesson 1, Easy to change. Maya moves the fridge out of the kitchen and into the store room. So <code>shop.kitchen.fridge</code> is gone, and the route is now <code>shop.store_room.fridge</code>. Ask the lesson 1 question of this file: how many of its lines must change? Type the number.',
        pic: code(fridgeCode, { title: 'fridge_jobs.py' }),
        prompt: 'lines >',
        answers: ['3', 'three'],
        why: 'Lines 2, 5 and 13. Each one walks through the shop and through the kitchen to get at the fridge. That is the reach-through from lesson 25, Law of Demeter. Where the fridge stands should be the shop\'s own business, but three lines had the map written into them. Line 9 asks the shop a real question, <code>needs_milk()</code>, so it never notices the move.',
        hint: 'Find every line that walks through <code>kitchen</code>.'
      },
      {
        type: 'match', q: 'SOLID is five letters. Match each letter to what it asks for.',
        pairs: [
          ['S', 'One piece of code has one reason to change'],
          ['O', 'Add new behaviour without editing code that works'],
          ['L', 'A stand-in keeps every promise of the thing it replaces'],
          ['I', 'Small, focused lists, so nobody signs for a job it cannot do'],
          ['D', 'The rules depend on an idea of their own, not on a detail']
        ],
        why: 'S is lesson 16, Single responsibility. O is lesson 29, Open/closed. L is lesson 30, Liskov substitution. I is lesson 31, Interface segregation. D is lesson 32, Dependency inversion. Five letters, five ways to keep code easy to change.',
        hint: 'The strip at the top of the recap picture has all five names.'
      },
      {
        type: 'pick', q: 'Two jobs take candles from the same box. Which principles does this code break? Pick all that apply. One of them is from module 1.',
        pic: code(candleCode, { title: 'candles.py' }),
        options: ['Tell, don\'t ask', 'DRY', 'Law of Demeter', 'YAGNI'],
        answer: [0, 1],
        why: 'Each job asks the box how many candles are left, decides, and then changes the box. That is ask, decide, change, done from outside: lesson 26, Tell, don\'t ask. The box owns the count, so the box should decide. And the rule "you cannot take more candles than the box holds" is written in two callers. One rule, two homes: lesson 6, DRY. One fix cures both. Give the box a <code>take(how_many)</code> that checks for itself and answers <code>True</code> or <code>False</code>. Then each job says <code>if candle_box.take(age):</code>.',
        hint: 'One answer is about who makes the decision. The other is about how many places hold it.'
      },
      {
        type: 'fill', q: 'Sam bakes. On Fridays he also drives the van. In the old family tree he could hang on only one branch. So Maya turned the two duties into parts. Build Sam from parts.',
        pic: code(staffCode, { title: 'staff.py' }),
        text: 'sam = ___()\nsam.name = "Sam"\nsam.duties = [OvenDuty(), ___()]\n\nfor duty in sam.duties:\n    duty.___()',
        options: ['Staff', 'VanDuty', 'start', 'Baker', 'Driver', 'start_shift'],
        answer: ['Staff', 'VanDuty', 'start'],
        why: 'Sam is one <code>Staff</code> who <b>has</b> two duties. Nobody had to invent a <code>BakerDriver</code> class or copy code from one branch to the other. Ask the question from lesson 27, Composition over inheritance: is Sam truly a kind of driver, in every way, forever? No. He just needs the van duty on Fridays. On other days Maya leaves that part off his list.',
        hint: 'The Baker and Driver classes are gone. Sam is plain staff with parts. The last blank is the one job that every duty has.'
      },
      {
        type: 'pick', q: 'This job packs an order. Customers keep asking for new kinds of packing. The tin arrived last month, and a gift basket is next. Which principles does the job break? Pick all that apply.',
        pic: code(packCode, { title: 'packing.py' }),
        options: ['Open/closed', 'Program to an interface', 'Liskov substitution', 'Interface segregation', 'Composition over inheritance'],
        answer: [0, 1],
        why: 'The chain asks "which kind is it?" and has to grow with every new kind. So each new kind means editing a job that already works: lesson 29, Open/closed. And the job knows <b>who</b> it is talking to. It names three tools and knows the habits of each: lesson 28, Program to an interface. One fix cures both, as it did for the checkout. Each kind of packing becomes a small class with one job, <code>pack(order)</code>, and this job is handed one and calls only that. The other three do not apply. Nothing here stands in for anything yet, there is no list for anyone to sign, and no class has a parent.',
        hint: 'One answer is about what must happen when the gift basket arrives. The other is about the three tool names.'
      },
      {
        type: 'type', q: 'Nuts cost 2 cents a gram. Sam puts a 500 gram bag on the new <code>ParcelScale</code>. Its sensor counts in kilos. What does <code>nut_price_cents</code> hand back? Type the number.',
        pic: code(scaleCode, { title: 'scales.py', hi: [1] }),
        prompt: 'cents >',
        answers: ['1', '1.0', '1.00', 'one', '1 cent', '1c'],
        why: '500 grams is 0.5 kilos, so line 9 hands back 0.5, and 0.5 × 2 = 1. On the counter scale the answer is 500 × 2 = 1000 cents. So Sam sells a $10 bag of nuts for 1 cent, and nothing crashed. <code>ParcelScale</code> has the right name and the right shape, but it breaks the promise on line 1. That is lesson 30, Liskov substitution: a stand-in must behave. The fix belongs inside the stand-in: <code>return parcel_sensor.kilos(item) * 1000</code>.',
        hint: 'How many kilos is 500 grams? That is what line 9 hands back. Then line 13 doubles it.'
      },
      {
        type: 'order', q: 'The first file is a small board for the oven. The second file uses it. Put what happens in order.',
        pic: `<div style="width:100%">${code(boardCode, { title: 'oven_board.py' })}${code(bakeryCode, { title: 'bakery.py' })}</div>`,
        items: [
          'beep_twice is put on the list. Nothing beeps yet',
          'start_cooling_fan is put on the list. The fan stays off',
          'The oven finishes a tray, and tray_done runs',
          'The board calls beep_twice',
          'The board calls start_cooling_fan'
        ],
        why: 'Lines 3 and 4 of <code>bakery.py</code> only hang the jobs up. A name with no brackets means "here is the job, keep it for later". Nothing beeps until the board goes through its list, and it calls the jobs in the order they were hung. Maya\'s code never calls <code>beep_twice</code> itself. The board decides when. That is lesson 34, Inversion of control.',
        hint: 'A name with no brackets does not run the job. Who calls it, and when?'
      },
      {
        type: 'match', q: 'Three names that sound alike. Each snippet shows one of them at work. Match each name to its snippet.',
        pic: code(namesCode, { title: 'three snippets about a timer', hi: [2, 11, 18] }),
        pairs: [
          ['Dependency injection', 'Snippet A: <code>bake</code> is given its timer between the brackets'],
          ['Dependency inversion', 'Snippet B: the oven rules write down <code>Timer</code>, and the dial timer file fetches it from them'],
          ['Inversion of control', 'Snippet C: <code>open_oven_door</code> is handed over with no brackets']
        ],
        why: 'A is a technique. <code>bake</code> does not build a timer. It is handed one: lesson 33, Dependency injection. B is a rule about which way the arrows point. The oven rules own the idea <code>Timer</code>, and the detail mentions the rules, not the other way round: lesson 32, Dependency inversion. C is about who is in charge. The timer calls <code>open_oven_door</code> when the moment comes: lesson 34, Inversion of control. Lesson 34 also said that A is one small case of C, because the caller now chooses the part. But the name that fits A best is injection.',
        hint: 'Inversion is about arrows. Injection is about handing a part in. Control is about the moment.'
      },
      {
        type: 'bucket', q: 'A principle is a tool, not a law. Is each of these a good use of one, or is it overdoing it?',
        buckets: ['Use it here', 'Overdoing it'],
        items: [
          ['Letting the candle box check its own count before it gives out candles', 0],
          ['One short list of jobs for four real ways to pack an order', 0],
          ['One small class per promotion, when a new promotion arrives every month', 0],
          ['Handing a job its printer, so a try-out can use a pretend one', 0],
          ['Taking refund off the list of a part that could only fake it', 0],
          ['A job called get_kitchen_fridge_milk(), written only to hide three dots', 1],
          ['Moving sign printing and supplier emails into the Fridge class', 1],
          ['Turning every plain fact, like a name, into a part', 1],
          ['Classes and a list for two cases that will never grow', 1],
          ['Demanding that every stand-in takes exactly as long as the original', 1],
          ['One list for every single job, though every part does all of them', 1],
          ['Handing a job the tax rate and a part that only joins text', 1],
          ['Hanging three steps that have a fixed order on a board', 1]
        ],
        why: 'Each one on the left fixes a real problem at a small cost. Each one on the right pushes a good idea past the point where it helps: the Law of Demeter, tell, don\'t ask, composition, open/closed, Liskov substitution, interface segregation, dependency injection and inversion of control, all overdone. They come from the "When not to" part of each lesson.',
        hint: 'Ask the two questions from lesson 4. Is the problem real right now? What will this cost the next reader?'
      },
      {
        type: 'pick', q: 'Sam has just finished lesson 25, Law of Demeter. He counts the dots on line 2 and says: "Four dots. That is a train wreck." Nobody has had any trouble with this job. What is the best call?',
        pic: code(zoneCode, { title: 'delivery.py', hi: [2] }),
        options: [
          'Give Order a job get_address_town(), so the line has fewer dots',
          'Leave it alone. An address is a bundle of plain facts, and strip and lower only hand back text',
          'Leave it alone. The number of dots never matters',
          'Split line 2 into four lines, so that no line has more than one dot'
        ],
        answer: 1,
        why: 'The code is fine. An address is a bundle of plain facts with no rules to protect, so reading <code>order.address.town</code> is fine. <code>.strip()</code> and <code>.lower()</code> each hand back text, so the line never goes deeper into anyone\'s insides. Lesson 25 said it: the dots are the alarm, and the question is the test. Here the answer to the question is no. And lesson 4, Trade-offs, not laws, says: no real problem, no fix.',
        hint: 'The dots are only the alarm. Ask the real question: is this line reaching through one thing into another thing\'s insides?',
        hints: {
          0: 'Read the new name aloud: get, address, town. Has the route gone, or has it only moved into the name?',
          2: 'Right call, wrong reason. <code>shop.kitchen.fridge.milk_litres()</code> had three dots, and those did matter. Why is this line different?',
          3: 'Four lines would walk the same route as one. The dots were only the alarm. What is the real question?'
        }
      },
      {
        type: 'pick', q: 'Maya sells two drinks. Each one is a drink in every way, and no drink has ever needed code from another branch. Sam has just finished lesson 27 and says: "A family tree! Composition over inheritance. Break it into parts." What is the best call?',
        pic: code(drinkCode, { title: 'drinks.py' }),
        options: [
          'Give Drink a Naming part and a Pricing part, so that nothing is inherited',
          'Leave it alone. The tree is shallow and steady, and each child is truly a kind of drink',
          'Leave it alone. A family tree is always simpler than parts',
          'Add HotDrink and ColdDrink in between, in case iced coffee arrives'
        ],
        answer: 1,
        why: 'The code is fine. Lesson 27 said prefer, not never. Ask its question: is coffee truly a kind of drink, in every way, forever? Yes. The tree is two levels deep, nothing is copied between branches, and no class has a name like <code>HotIcedGiftDrink</code>. A part for a name and a part for a price would add classes and dots and gain nothing. Wait for the first drink that wants to sit on two branches.',
        hint: 'Ask the lesson 27 question of coffee and Drink. Then ask lesson 4: is there a real problem here right now?',
        hints: {
          0: 'A part earns its place when it can be mixed, swapped or left out. Is a name ever left out?',
          2: 'Right call, wrong reason. Think of the day one thing wants to sit on two branches. What happens to a tree then?',
          3: '"In case" is the giveaway. Is anyone asking for iced coffee today?'
        }
      },
      {
        type: 'pick', q: 'Two principles pull against each other. The till has a "Print price sticker" button that calls <code>scale.print_sticker()</code>. With the pocket scale, nothing comes out. Sam says: "Lesson 31, Interface segregation. Give every job a list of its own. Three lists." Maya says: "Lesson 2, High cohesion. These jobs belong together. Keep one list." What is the best call?',
        pic: code(stickerCode, { title: 'scales.py', bad: [18] }),
        options: [
          'Sam. Every job should have a list of its own',
          'Maya. One list is simplest, and a job that does nothing harms nobody',
          'Cut out only print_sticker. Keep weigh and set_to_zero together, because every scale really does both',
          'Keep one list, and make the pocket scale raise an error in print_sticker'
        ],
        answer: 2,
        why: 'Both are half right. Ask the lesson 31 question of each job: does every part that signs this list really provide it? The pocket scale has no sticker roll. So <code>print_sticker</code> is a faked box, and the button already trusted it. That job gets a small list of its own, signed only by scales that can print. Then the till can ask before it shows the button, with <code>hasattr(scale, "print_sticker")</code>. But <code>weigh</code> and <code>set_to_zero</code> always come together, and neither was ever faked. Cutting them apart would give two names to remember for one idea. Things that belong together stay together.',
        hint: 'Ask of each of the three jobs: can every scale really do this one?',
        hints: {
          0: 'Every scale weighs, and every scale can be set to zero. What would two separate lists for those buy?',
          1: 'The button on the till trusted that job, and nothing came out. Lesson 31 had a refund button like that.',
          3: 'Then the till stops in the middle of a sale. Lesson 30 said that a part which cannot do a job should not claim it at all.'
        }
      },
      {
        type: 'pick', q: 'Two principles pull against each other again. Sam designs the signs in the shop window, and he changes their look often. Maya sets the rules for cakes. Sam says: "This job asks the cake three times. Lesson 26, Tell, don\'t ask. Move it into the class, as <code>cake.show_window_sign()</code>." Maya says: "Lesson 16, Single responsibility. Then <code>Cake</code> would answer to two people." Who is right, and why?',
        pic: code(signCode, { title: 'signs.py' }),
        options: [
          'Sam. Any job that reads an object\'s data should move into that object',
          'Maya. The job only shows values and decides nothing, and the look of a sign is not the cake\'s business',
          'Sam. Otherwise the rules about cakes end up in two places',
          'Maya. Asking an object for its data is always fine'
        ],
        answer: 1,
        why: 'Lesson 26 has a narrow target: ask, decide, change, done from outside. This job asks, but it decides nothing about the cake and changes nothing in it. It only shows three values, and that is what queries are for. Now ask the lesson 16 question: who could ask for this code to change? Sam, every time the sign gets a new look. If the job moved into <code>Cake</code>, the class would answer to Sam and to Maya. The last answer goes too far. A job that checks <code>slices_left()</code> and then takes a slice off the cake itself is ask, decide, change. That decision should move into the cake.',
        hint: 'Look for the three steps from lesson 26: ask, decide, change. How many of them does this job do?',
        hints: {
          0: 'Lesson 26 had a "When not to" part. What did it say about a receipt that prints the balance?',
          2: 'Look for a rule about cakes in this job. Is there one? The job only shows values.',
          3: 'Right person, wrong reason. Think of the two jobs that checked the candle box and then took candles from it. Was that asking fine too?'
        }
      },
      {
        type: 'pick', q: 'The last one is a real mix. This job runs every morning to bake the buns. Which principles does the code break? Pick all that apply.',
        pic: code(bunsCode, { title: 'morning.py' }),
        options: ['Law of Demeter', 'Tell, don\'t ask', 'Dependency injection', 'Liskov substitution', 'Interface segregation'],
        answer: [0, 1, 2],
        why: 'Line 2 builds its own oven. So nobody can hand the job an electric oven, or a pretend one for a try-out: lesson 33, Dependency injection. Lines 3 and 4 reach through the bakery and its store room into the sugar sack: lesson 25, Law of Demeter. And between them, lines 3 and 4 ask the sack how much is left, decide, and then change the sack: lesson 26, Tell, don\'t ask. The other two do not apply. Nothing here stands in for anything, and there is no list of jobs that anyone was made to sign. A good fix has two parts. Hand the oven in, as <code>morning_bake(bakery, oven)</code>. And tell the nearest neighbour what you want, as <code>if bakery.take_sugar(2):</code>.',
        hint: 'Check three things: where the oven comes from, the dots on line 3, and what lines 3 and 4 do to the sack between them.'
      }
    ]
  });
})();
