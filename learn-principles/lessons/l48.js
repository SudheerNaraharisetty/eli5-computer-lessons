/* Lesson 48: Twelve-factor app (module 5). One file per lesson. */
(function () {
  const { P, code, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l48  Twelve-factor app
     ===================================================================== */
  const divider = (x, y1, y2) => `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>`;
  const NIGHT = '#15132B';

  /* ---- The idea: a restaurant built into one building, or a food truck ---- */
  const root = (x, y1, y2) => `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${P.danger}" stroke-width="3.5" stroke-linecap="round"/>`;
  const ideaPic = svg(600, 290, 'A restaurant is built into one building: its gas pipe, cellar and street cannot move with it. A food truck carries its own kitchen and only plugs into water and power, so it can park in any town.',
    T(150, 24, 'A RESTAURANT: BUILT INTO ONE PLACE', { s: 12.5, f: P.danger }) + T(450, 24, 'A FOOD TRUCK: PARKS ANYWHERE', { s: 12.5, f: P.ok }) +
    divider(300, 14, 278) +
    root(70, 136, 190) + root(150, 136, 190) + root(230, 136, 190) +
    box(40, 50, 220, 86, P.white, 14) + T(150, 86, 'restaurant', { s: 15 }) + T(150, 110, 'the kitchen is part of the walls', { s: 12, w: 700, f: P.ink2 }) +
    [['gas pipe', 70], ['cellar', 150], ['this street', 230]].map(r => box(r[1] - 38, 190, 76, 34, P.dangerT, 10) + T(r[1], 212, r[0], { s: 11.5, f: P.danger })).join('') +
    T(150, 262, 'To move it, you rebuild it.', { s: 13, w: 700, f: P.ink2 }) +
    box(340, 56, 170, 74, P.okT, 14) + T(425, 88, 'food truck', { s: 15, f: P.ok }) + T(425, 110, 'carries its own kitchen', { s: 12, w: 700, f: P.ink2 }) +
    box(510, 82, 50, 48, P.white, 10) +
    `<circle cx="380" cy="140" r="14" fill="${P.ink}"/><circle cx="380" cy="140" r="5" fill="${P.white}"/><circle cx="520" cy="140" r="14" fill="${P.ink}"/><circle cx="520" cy="140" r="5" fill="${P.white}"/>` +
    arrow(400, 158, 390, 186, P.ok, 2.5) + arrow(500, 158, 510, 186, P.ok, 2.5) +
    box(340, 192, 100, 34, P.tint, 10) + T(390, 214, 'water', { s: 12, f: P.accent }) +
    box(460, 192, 100, 34, P.tint, 10) + T(510, 214, 'power', { s: 12, f: P.accent }) +
    T(450, 262, 'Park. Plug in. Start trading.', { s: 13, w: 700, f: P.ink2 }));

  /* ---- The code: a file that quietly describes one computer ---- */
  const beforeCode = [
    'import receipt_maker',
    '',
    'DATABASE_URL = "localhost"',
    'PAYMENT_KEY = "sk_test_1234"   # put the real key back before going live',
    '',
    'def note(event):',
    '    log = open("/Users/maya/shop/log.txt", "a")',
    '    log.write(event + "\\n")',
    '    log.close()'
  ];

  /* ---- The pain: moving day ---- */
  const moveRow = (y, a, b, c, quiet) =>
    box(16, y, 568, 42, quiet ? P.warnT : P.dangerT, 10) +
    T(30, y + 26, a, { s: 12, m: true, a: 'start' }) + T(318, y + 26, b, { s: 12.5 }) + T(486, y + 26, c, { s: 12, m: !quiet, f: quiet ? P.warn : P.danger });
  const movePic = svg(600, 268, 'Four lines of the code, what each one assumed, and what the rented machine really had. Three of them stop the program with an error. The fourth runs happily with the test key and charges nobody.',
    T(30, 26, 'WHAT THE CODE SAYS', { s: 12, f: P.ink2, a: 'start' }) + T(318, 26, 'ON THE RENTED MACHINE', { s: 12, f: P.ink2 }) + T(486, 26, 'WHAT HAPPENS', { s: 12, f: P.ink2 }) +
    moveRow(38, 'import receipt_maker', 'never installed', 'ModuleNotFoundError') +
    moveRow(90, '"localhost"', 'no database here', 'cannot connect') +
    moveRow(142, '"/Users/maya/shop/"', 'no such folder', 'FileNotFoundError') +
    moveRow(194, '"sk_test_1234"', 'runs happily', 'nobody is charged', true) +
    T(300, 258, 'Three loud failures, and one quiet one.', { s: 12.5, w: 700, f: P.ink2 }));
  const painPic = `<div style="width:100%">${term(['# on the rented machine', '$ python website.py', "ModuleNotFoundError: No module named 'receipt_maker'"], 'moving day, first try')}${movePic}</div>`;

  /* ---- The fix: the same code, a small card of settings per place ---- */
  const afterCode = [
    'import os',
    'import receipt_maker',
    '',
    'DATABASE_URL = os.environ["DATABASE_URL"]',
    'PAYMENT_KEY = os.environ["PAYMENT_KEY"]',
    '',
    'def note(event):',
    '    print(event)'
  ];
  const place = (x, name, db, key, keyCol) =>
    T(x + 90, 24, name, { s: 12.5, f: P.ink2 }) +
    `<rect x="${x + 4}" y="${41}" width="180" height="48" rx="12" fill="${P.ink}"/><rect x="${x}" y="36" width="180" height="48" rx="12" fill="${NIGHT}" stroke="${P.ink}" stroke-width="2.5"/>` +
    T(x + 90, 57, 'website.py', { s: 12.5, m: true, f: '#ECEAFF' }) + T(x + 90, 74, 'the same code', { s: 11, w: 700, f: '#A9A5D6' }) +
    `<line x1="${x + 90}" y1="90" x2="${x + 90}" y2="108" stroke="${P.ink}" stroke-width="2.5"/>` +
    box(x, 108, 180, 104, P.warnT, 12) +
    T(x + 14, 130, 'DATABASE_URL', { s: 11, m: true, a: 'start', f: P.ink2 }) + T(x + 14, 148, db, { s: 12.5, m: true, a: 'start' }) +
    T(x + 14, 174, 'PAYMENT_KEY', { s: 11, m: true, a: 'start', f: P.ink2 }) + T(x + 14, 192, key, { s: 12.5, m: true, a: 'start', f: keyCol || P.ink });
  const placesPic = svg(600, 250, 'Three places run the same website.py. Each has its own small card of settings. The laptop uses localhost and the test key. The test copy uses a test database and the test key. Only the real shop holds the real key.',
    place(14, "MAYA'S LAPTOP", 'localhost', 'sk_test_1234') +
    place(210, 'THE TEST COPY', 'test-db.example', 'sk_test_1234') +
    place(406, 'THE REAL SHOP', 'shop-db.example', '(the real key)', P.danger) +
    T(300, 240, 'One file. Three cards. The real key lives in one place, and not in the code.', { s: 12.5, w: 700, f: P.ink2 }));
  const fixPic = `<div style="width:100%">${code(afterCode, { title: 'website.py, with the roots pulled up', good: [4, 5, 8] })}` +
    code(['receipt_maker'], { title: 'requirements.txt: every tool the program needs' }) +
    term(["# on Maya's laptop", '$ DATABASE_URL=localhost PAYMENT_KEY=sk_test_1234 python website.py', 'order 12 paid'], 'the settings are handed over at the start') +
    `${placesPic}</div>`;

  /* ---- The test: all twelve on one card ---- */
  const big = (x, n, name, note) =>
    box(x, 30, 134, 84, P.okT, 14) +
    T(x + 14, 62, n, { s: 22, a: 'start', f: P.ok }) +
    `<circle cx="${x + 110}" cy="52" r="12" fill="${P.ok}" stroke="${P.ink}" stroke-width="2"/><path d="M${x + 104} 52 l4.5 4.5 l8 -9" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>` +
    T(x + 14, 84, name, { s: 12.5, a: 'start' }) + T(x + 14, 102, note, { s: 10.5, w: 700, a: 'start', f: P.ink2 });
  const fourPic = svg(600, 130, 'The four factors taught in this lesson: 3 Config, 4 Backing services, 6 Processes and 11 Logs.',
    T(16, 18, 'THE FOUR YOU JUST LEARNED', { s: 12, f: P.ok, a: 'start' }) +
    big(14, '3', 'Config', 'settings from the place') +
    big(160, '4', 'Backing services', 'attached by address') +
    big(306, '6', 'Processes', 'stateless: lesson 42') +
    big(452, '11', 'Logs', 'just print the lines'));
  const eight = [
    ['1', 'Codebase', 'One original copy of the code, with its history.', 'Every place runs that same code. Lesson 7.'],
    ['2', 'Dependencies', 'Every tool the program needs is on a list that travels', 'with the code. Nothing is installed by hand. Lesson 23.'],
    ['5', 'Build, release, run', 'Prepare the code, add one place\'s settings, run it:', 'three separate steps. Nobody edits the running copy.'],
    ['7', 'Port binding', 'The program answers requests itself, at a numbered', 'door on its machine, called a port.'],
    ['8', 'Concurrency', 'To serve more people, run more copies side by side.', 'Lesson 42 made that possible.'],
    ['9', 'Disposability', 'A copy starts in seconds and can be stopped at any', 'moment without losing work. Lessons 37 and 42.'],
    ['10', 'Dev/prod parity', 'Keep the laptop, the test copy and the real shop as', 'alike as you can. Same tools, same kind of database.'],
    ['12', 'Admin processes', 'One-off chores, like fixing old records, run as small', 'programs with the same code and the same settings.']
  ];
  const eightPic = svg(600, 380, 'The other eight factors, one plain sentence each: Codebase, Dependencies, Build release run, Port binding, Concurrency, Disposability, Dev/prod parity and Admin processes.',
    T(16, 18, 'THE OTHER EIGHT, ONE LINE EACH', { s: 12, f: P.ink2, a: 'start' }) +
    eight.map((r, i) => {
      const y = 28 + i * 44;
      return box(14, y, 570, 37, P.white, 10) +
        T(38, y + 24, r[0], { s: 14, f: P.accent }) + T(60, y + 23, r[1], { s: 12, a: 'start' }) +
        T(196, y + 16, r[2], { s: 10.5, w: 700, a: 'start', f: P.ink2 }) + T(196, y + 30, r[3], { s: 10.5, w: 700, a: 'start', f: P.ink2 });
    }).join(''));
  const testPic = `<div style="width:100%">${fourPic}${eightPic}</div>`;

  /* ---- When not to: who needs it, and what is not config ---- */
  const whoPic = svg(600, 150, 'A web service that runs for months on rented machines needs most of the list. A script run once, a game, a phone app or a spreadsheet needs very little of it.',
    box(16, 22, 270, 92, P.okT, 14) + T(151, 50, 'a web service', { s: 14, f: P.ok }) + T(151, 72, 'runs for months, on rented machines,', { s: 11.5, w: 700, f: P.ink2 }) + T(151, 88, 'in several copies', { s: 11.5, w: 700, f: P.ink2 }) + T(151, 106, 'most of the list applies', { s: 12 }) +
    box(314, 22, 270, 92, P.warnT, 14) + T(449, 50, 'everything else', { s: 14, f: P.warn }) + T(449, 72, 'a script you run once, a game,', { s: 11.5, w: 700, f: P.ink2 }) + T(449, 88, 'a phone app, a spreadsheet', { s: 11.5, w: 700, f: P.ink2 }) + T(449, 106, 'very little of it applies', { s: 12 }) +
    T(300, 140, 'The list answers one question: how do I run this anywhere? Not every program asks it.', { s: 12, w: 700, f: P.ink2 }));
  const overCode = [
    'import os',
    '',
    'DATABASE_URL = os.environ["DATABASE_URL"]    # differs between places',
    'PAYMENT_KEY = os.environ["PAYMENT_KEY"]      # differs between places',
    'TAX_RATE = os.environ["TAX_RATE"]            # the same everywhere',
    'SHOP_NAME = os.environ["SHOP_NAME"]          # the same everywhere',
    'THANK_YOU = os.environ["THANK_YOU"]          # the same everywhere'
  ];
  const whenPic = `<div style="width:100%">${whoPic}${code(overCode, { title: 'website.py, with everything turned into a setting', good: [3, 4], bad: [5, 6, 7] })}</div>`;

  /* ---- quiz pictures ---- */
  const spotCode = [
    'import os',
    '',
    'SHOP_NAME = "Maya\'s Cookies"',
    'DATABASE_URL = "localhost"',
    'TEXT_KEY = "txt_test_1234"',
    'TAX_RATE = 0.09'
  ];
  const logCode = [
    '# version A',
    'def note(event):',
    '    log = open("/home/shop/log.txt", "a")',
    '    log.write(event + "\\n")',
    '    log.close()',
    '',
    '# version B',
    'def note(event):',
    '    print(event)'
  ];

  COURSE.add({
    id: 'l48', minutes: 10,
    summary: 'The <b>Twelve-Factor App</b> is a checklist of twelve habits for web programs that run on rented computers. A program that follows them can be copied to a new machine, started, stopped, multiplied and moved <b>without anyone editing its code</b>.',
    video: {
      src: 'videos/l48-twelve-factor.mp4', poster: 'videos/l48-twelve-factor.jpg', length: '1 min 11 s',
      script: [
        "Maya's website has run on one old computer in her shop for years. It works perfectly.",
        'Then she rents a new computer in a data centre, and copies the code across. It falls over.',
        'Why? The code had grown roots into the old machine. The database address says localhost, meaning this computer. The payment key is typed into the file. A tool she installed by hand is missing. And the log goes to a folder that only existed there.',
        'The cure is a famous checklist, the twelve-factor app. Its heart is simple. Take everything that differs between places out of the code. Give it a name, and let each place hand it in at the start. List the tools you need. And just print what happens.',
        'Now the same code runs on her laptop, on a test machine, and in the real shop. Only a small settings card changes. 3 copies for Christmas? Copy, set, start.',
        'That is the twelve-factor app. Code that runs anywhere, with nobody editing it.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'A food truck, not a restaurant.',
        text: [
          'A restaurant is built into one building. The gas pipe, the cellar and the street outside are all part of it. To move it across town, you rebuild it.',
          'A food truck carries its own kitchen. It can park in any town, plug into <b>water and power</b>, and start trading. Nobody rebuilds the truck. Is the crowd too big? Send a second truck.',
          'Some programs are restaurants. They only run on the one computer they grew up on. The <b>Twelve-Factor App</b> is a list of twelve habits that turn a program into a food truck. Follow them, and the program can be <b>copied to a new machine, started, stopped, multiplied and moved without anyone editing its code</b>.',
          'It is a real document. It was published in 2011 at 12factor.net by Adam Wiggins and his colleagues at Heroku. Heroku was a company that ran other people\'s web programs on its own computers. So its engineers watched a very large number of programs being set up, and they wrote down what they saw working again and again.',
          'It was written for one kind of program: a <b>web service</b>. That is a program like Maya\'s website, which keeps running and answers requests, the word from lesson 37. And it expects the service to run on <b>rented computers</b> in a big building called a data centre. People call that "the cloud".'
        ],
        tip: 'A <b>factor</b> here just means one item on the list. You will learn four of them properly in this lesson. Several of the others are earlier lessons wearing a new name. The whole list is on one card in The test.'
      },
      {
        label: 'The code', pic: code(beforeCode, { title: 'website.py, on Maya\'s laptop', hi: [1, 3, 4, 7] }),
        h: '"It works on my machine."',
        text: [
          'Since lesson 7, Maya\'s website has run on one old computer in the back room of the shop. She set that computer up herself, bit by bit, over two years. On it, the website works perfectly.',
          'Here is the top of <code>website.py</code>. Line 1 fetches a ready-made tool for laying out receipts, the way lesson 32 fetched <code>spreadsheet</code>. Maya installed that tool by hand two years ago, and has forgotten that she did.',
          'Line 3 says where the database is. <code>"localhost"</code> is a special name that means <b>this very computer</b>. In the back room, the database runs on the same machine as the website, so that is true there.',
          'Line 4 is the secret key that lets the program take card payments. The payment company gave Maya two keys. The <b>test key</b> only pretends to charge. The <b>real key</b> moves real money. On the back-room computer, line 4 holds the real key. On her laptop she swaps in the test key, so that trying things out costs nobody anything.',
          'Lines 6 to 9 keep a <b>log</b>: a diary of what the program did, one line per event. <code>open</code> with <code>"a"</code> adds to the end of a file, as in lesson 38. <code>"\\n"</code> means "start a new line". Line 9 closes the file again.',
          'Now read lines 1, 3, 4 and 7 once more. Each one quietly describes <b>one particular computer</b>.'
        ]
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Moving day.',
        text: [
          'The back-room computer is old, and every power cut takes the shop offline. So Maya rents a computer in a data centre. She copies the code over from her laptop. Then she types <code>python website.py</code> to start it, in a terminal like the one in lesson 47.',
          '<b>1. A missing tool.</b> Python stops on line 1 with <code>ModuleNotFoundError</code>. Nobody ever wrote down that the program needs <code>receipt_maker</code>. Maya installs it by hand, again.',
          '<b>2. The wrong address.</b> Line 3 says the database is on "this very computer". The rented machine has no database on it. The shop\'s database now lives on a machine of its own, with its own address. So Maya edits line 3, right there on the rented machine.',
          '<b>3. A folder that is not there.</b> The first order comes in, and line 7 stops with <code>FileNotFoundError</code>. A rented computer has no <code>/Users/maya/</code>. She makes the folder by hand.',
          '<b>4. The quiet one.</b> Now everything runs. Orders come in all Saturday and cookies go out. On Sunday Maya looks at the bank account. Nothing has arrived. Line 4 still holds the <b>test key</b> from her laptop. Every payment was pretend.',
          'Count the damage. Two fixes made by hand that exist on one machine only. A <code>website.py</code> on the rented machine that no longer matches the one on her laptop. And the real key has to be typed into line 4 somewhere, so whoever gets a copy of that file gets the key: Sam, the backup, the next helper.'
        ],
        warn: 'Lesson 38, Least privilege, said to keep secrets out of the code. Lesson 7, Single source of truth, asked which one wins when two copies disagree. Maya now has two versions of one file, and each is right for only one machine.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Pull up the roots.',
        text: [
          'Every problem had the same cause. The code had <b>grown roots</b> into one machine. The fix is to take out of the code everything that belongs to a place, and let each place supply it. Four of the twelve factors do most of that work.',
          '<b>Factor 3, Config.</b> Config is everything that <b>differs from one place to the next</b>: the database address, the payment key, whether this is a test. Those do not belong in the code. They are read from the <b>environment</b>. An <b>environment variable</b> is a named setting that the computer hands to a program when it starts. The program asks for it by name, so the same code gets different values in different places.',
          'In Python, <code>import os</code> fetches a built-in tool for talking to the computer the program runs on. <code>os.environ</code> is a lookup table, like the dictionary from lesson 37. It holds every setting the program was handed. So line 4 means: give me the setting called <code>DATABASE_URL</code>. If nobody set it, Python stops at once with <code>KeyError: \'DATABASE_URL\'</code>, the error from lesson 46. That is lesson 22, Fail fast. A missing setting is loud at the start, not quiet on Sunday.',
          'Look at the three places in the last picture. All three run <b>the same file</b>. Each place has its own small card of settings. On her laptop Maya types them in front of the start command, as the terminal shows. A rented machine has a settings page for them. The real key now exists in one place, and it is not in the code. That is what lesson 38 asked for.',
          '<b>Factor 4, Backing services.</b> A backing service is anything the program reaches over a wire: the database, the payment company, the service that sends texts. Treat each one as an <b>attachment</b>, reached at an address that comes from config. Then swapping the practice database for the real one is a change to a setting, not to the code. This is lesson 32, Dependency inversion, and lesson 33, Dependency injection, at the size of a whole program. The wiring in <code>main.py</code> reads the address and hands the part in.',
          '<b>Factor 6, Processes.</b> One running copy of a program is called a process. This factor says every process must be <b>stateless</b>. That is exactly lesson 42, Statelessness. Maya had already moved the baskets into the shared store, so a fresh copy on a fresh machine is useful from its first second. Without that, moving day would have had a fifth problem.',
          '<b>Factor 11, Logs.</b> The program should not look after log files. It just <b>prints</b> what happens, one line per event. <code>print</code> puts a line of text on the program\'s output, the lines of text from lesson 47. Whatever runs the program collects them. On the laptop they appear in the terminal. On rented machines, the lines from every copy flow into one place where Maya can search them.',
          'And the missing tool? That is <b>factor 2, Dependencies</b>. Every tool the program needs is written in a list that travels with the code. In Python that list is usually a file called <code>requirements.txt</code>. A new machine installs everything on it in one step. Real lists also say which version of each tool.'
        ],
        tip: 'Now "move it to a new machine" and "run three copies for Christmas" are the same three steps. <b>Copy the same code. Set the settings for that place. Start.</b>'
      },
      {
        label: 'The test', pic: testPic,
        h: 'Picture a brand-new machine.',
        text: [
          'Ask: <b>"Could I start this on a brand-new machine by copying the code and setting a few named settings, without editing any file?"</b>',
          'Try the old <code>website.py</code>. Copying was not enough. Maya edited line 3, had to edit line 4, installed a tool and made a folder. No. Try the new one. Copy the code, install what is on the list, set <code>DATABASE_URL</code> and <code>PAYMENT_KEY</code>, start. Yes.',
          'There is a second quick check, just for config. <b>Could you show this code to a stranger without giving away a secret?</b> If a password or a key is typed into any file, the answer is no.',
          'Those two questions cover a lot of the list. The picture has all twelve. The four on top are the ones you just learned. The other eight get one line each, and several of them point back to a lesson you already know.',
          'Two words in the table are new. A <b>port</b> is a numbered door on a computer. It lets several programs on one machine each receive their own messages. And <b>dev/prod</b> is short for development and production: the place where you write the program, and the place where real customers use it.'
        ],
        tip: 'You do not need to know the twelve by heart. Know that the list exists, know these four, and look the rest up on the day you put a program on a rented machine. The numbers are only the order they have in the document.'
      },
      {
        label: 'When not to', pic: whenPic,
        h: 'A checklist, not a scorecard.',
        text: [
          '<b>It was written for one kind of program.</b> A web service that runs for months on rented machines. A script you run once on your own laptop, a game, a phone app or a spreadsheet needs very little of it. The 10-line stock counter from lesson 42 does not need settings from the environment or a stream of logs. Lesson 4, Trade-offs, not laws, and lesson 8, YAGNI, both said to wait for a real need.',
          '<b>Not every value is config.</b> Suppose Maya loves this lesson and moves everything into the environment. Look at the code. <code>TAX_RATE</code> is the same on her laptop and in the real shop. It does not differ between places. Now it has to be set in three places, and one day the laptop says 0.08 while the shop says 0.09. Lesson 1 gave the tax one home in the code, and that was right. Lesson 46, Convention over configuration, warned that every setting is a cost. Config is only for what <b>really differs between places</b>.',
          '<b>Parts of it are dated or debated.</b> The list is from 2011. Today many teams keep secrets in a dedicated secret store, a locked service that hands out keys, because plain environment variables are easy to leak by accident. People argue about the details of other factors too. The aims have lasted better than some of the exact instructions.',
          '<b>It is not a score.</b> "We follow 12 out of 12" says nothing about whether the shop works. Use the list as twelve questions to ask when a program is hard to move, start or copy.'
        ],
        warn: 'One honest gap. Environment variables always arrive as <b>text</b>. A setting of <code>"False"</code> is a piece of text, not the value <code>False</code>, so the program has to turn it into what it means. That is input from outside, and lesson 39, Defensive programming, said to check it at the door.'
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'This file is going to a rented machine. Which lines hold something that differs between places, and should be read from the environment? Pick all that apply.',
        pic: code(spotCode, { title: 'texts.py' }),
        options: ['Line 3, the shop name', 'Line 4, the database address', 'Line 5, the key for the texting service', 'Line 6, the tax rate'],
        answer: [1, 2],
        why: 'The address and the key differ between the laptop, the test copy and the real shop, and the key is a secret. The shop name and the tax rate are the same everywhere, so they keep their one home in the code.',
        hint: 'Ask of each line: is this different on Maya\'s laptop and in the real shop?'
      },
      {
        type: 'fill', q: 'Finish the line so the payment key comes from the environment, not from the code.',
        text: 'import ___\n\nPAYMENT_KEY = os.___["PAYMENT_KEY"]',
        options: ['os', 'environ', 'open', 'localhost'],
        answer: ['os', 'environ'],
        why: '<code>import os</code> fetches the tool, and <code>os.environ</code> is the lookup table of settings the program was handed when it started.',
        hint: 'First fetch the tool. Then look in its table of settings.'
      },
      {
        type: 'pick', q: 'Maya starts the new <code>website.py</code> on a fresh machine, but forgets to set <code>PAYMENT_KEY</code>. What happens?',
        pic: code(afterCode.slice(0, 5), { title: 'website.py', hi: [5] }),
        options: ['It runs with the test key', 'It stops at once with KeyError: \'PAYMENT_KEY\'', 'It runs and charges nobody', 'It runs with an empty key'],
        answer: 1,
        why: 'The name is not in the table, so Python stops on line 5 before a single order is taken. That is lesson 22, Fail fast. Compare it with the old file, which ran all Saturday on the wrong key.',
        hint: 'Lesson 46 showed what Python does when a key is not in a lookup table.'
      },
      {
        type: 'match', q: 'Several factors are earlier lessons with a new name. Match each factor to the lesson behind it.',
        pairs: [
          ['Config', 'The payment key is not typed into any file (lesson 38, Least privilege)'],
          ['Backing services', 'The database is a part that is handed in and can be swapped (lesson 33, Dependency injection)'],
          ['Processes', 'No running copy keeps a basket in its own memory (lesson 42, Statelessness)'],
          ['Codebase', 'There is one original, and every place runs it (lesson 7, Single source of truth)'],
          ['Dependencies', 'What the program needs is written down, not hidden (lesson 23, Explicit over implicit)']
        ],
        why: 'The twelve factors did not invent most of these ideas. They collected them into one list for one kind of program.',
        hint: 'Start with the two you are sure of. Baskets belong to lesson 42.'
      },
      {
        type: 'pick', q: 'Three copies of the website run on three rented machines. Which version of <code>note</code> follows the Logs factor?',
        pic: code(logCode, { title: 'two ways to keep a log' }),
        options: ['A, because a file is safer than printing', 'B, because the program only prints, and whatever runs it collects the lines', 'A, because print is only for trying things out', 'They are the same'],
        answer: 1,
        why: 'Version A needs a folder that may not exist, and leaves three separate log files on three machines. Version B prints one line per event, and the lines from every copy can be gathered in one place.',
        hint: 'Which one would have survived moving day?'
      },
      {
        type: 'bucket', q: 'Config, or code? Sort each one.',
        buckets: ['Config: read it from the environment', 'Stays in the code'],
        items: [
          ['The address of the database', 0],
          ['The payment company\'s secret key', 0],
          ['Whether payments are test or real', 0],
          ['TAX_RATE = 0.09', 1],
          ['The rule "10% off orders of $20 or more"', 1],
          ['How a total is worked out', 1]
        ],
        why: 'Config is what differs between the laptop, the test copy and the real shop. Rules and facts that are the same everywhere keep their one home in the code, as lessons 1, 6 and 7 taught.',
        hint: 'Would this be different on Maya\'s laptop and in the real shop?'
      },
      {
        type: 'order', q: 'The Christmas rush is here. Put the steps for starting one more copy of the website in order.',
        items: ['Rent one more machine', 'Copy the same code onto it', 'Install the tools on the list', 'Set the settings for the real shop', 'Start the program'],
        why: 'Nobody opens a file to edit it. The code is the same, the list says what to install, and the settings say which place this is.',
        hint: 'The program reads its settings at the moment it starts.'
      },
      {
        type: 'pick', q: 'Which of these are true? Pick all that apply.',
        options: ['A script you run once on your own laptop needs very little of the list', 'Every value in a program should become an environment variable', 'The list was written for web services on rented machines', 'A program that follows all twelve needs no testing'],
        answer: [0, 2],
        why: 'It is a checklist for one kind of program, not a law for all of them. Only what differs between places is config. And it says nothing about whether the code is correct. Testing is the next lesson.',
        hint: 'Two of these come straight from "When not to".'
      }
    ]
  });
})();
