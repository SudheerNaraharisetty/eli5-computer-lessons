/* Lesson 57: with (module 5). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l57  with
     ===================================================================== */

  // A notebook seen from the front. state: 'open' (two pages, lines written) | 'shut' (cover down).
  const notebook = (x, y, state, col) => {
    if (state === 'shut') {
      return `<rect x="${x}" y="${y}" width="120" height="150" rx="8" fill="${col || P.accent}" stroke="${P.ink}" stroke-width="2.5"/>` +
        `<rect x="${x}" y="${y}" width="18" height="150" rx="4" fill="${P.ink}"/>` +
        `<rect x="${x + 34}" y="${y + 30}" width="70" height="30" rx="5" fill="${P.white}" stroke="${P.ink}" stroke-width="2"/>` +
        T(x + 69, y + 50, 'log', { s: 13, m: true }) +
        `<path d="M${x + 120} ${y + 70} q14 6 0 12 q-14 6 0 12" fill="none" stroke="${P.ink}" stroke-width="2.5"/>`;
    }
    const lines = [0, 1, 2, 3, 4].map(i =>
      `<line x1="${x + 12}" y1="${y + 34 + i * 22}" x2="${x + 88}" y2="${y + 34 + i * 22}" stroke="${P.sand}" stroke-width="2"/>` +
      `<line x1="${x + 112}" y1="${y + 34 + i * 22}" x2="${x + 188}" y2="${y + 34 + i * 22}" stroke="${P.sand}" stroke-width="2"/>`).join('');
    return `<path d="M${x} ${y + 6} q50 -12 100 0 v140 q-50 -12 -100 0 z" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
      `<path d="M${x + 100} ${y + 6} q50 -12 100 0 v140 q-50 -12 -100 0 z" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
      lines;
  };
  // A lightning bolt: the error that flies in.
  const bolt = (x, y) => `<path d="M${x} ${y} l-18 34 h14 l-10 30 l30 -40 h-15 l12 -24 z" fill="${P.danger}" stroke="${P.ink}" stroke-width="2" stroke-linejoin="round"/>`;

  const ideaSvg = svg(600, 300, 'Two kitchens. Left, open and close by hand: an error flies in halfway, close never runs, and the notebook is left open on the counter with its pages blowing, tagged never closed. Right, with: the same error flies in, but the notebook cover snaps shut by itself, tagged closed, and the lines written before the error are saved.',
    T(150, 24, 'open() ... close()', { s: 13, m: true, f: P.danger }) + T(450, 24, 'with open(...) as f:', { s: 13, m: true, f: P.ok }) +
    `<line x1="300" y1="14" x2="300" y2="292" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    // left: left open
    notebook(40, 74, 'open') +
    T(90, 118, 'Ana: pasta', { s: 11, w: 700, f: P.ink2 }) + T(90, 140, 'Ben: chili', { s: 11, w: 700, f: P.ink2 }) +
    `<path d="M150 70 q30 -20 42 -6 M160 84 q34 -14 44 0" fill="none" stroke="${P.mute}" stroke-width="2.5" stroke-linecap="round"/>` +
    bolt(262, 70) + T(262, 158, 'ValueError', { s: 12, m: true, f: P.danger }) +
    `<line x1="20" y1="234" x2="280" y2="234" stroke="${P.ink}" stroke-width="3"/>` +
    box(56, 246, 170, 34, P.dangerT, 10) + T(141, 268, 'never closed', { s: 14, f: P.danger }) +
    // right: snapped shut
    notebook(390, 74, 'shut', P.ok) +
    bolt(562, 70) + T(562, 158, 'ValueError', { s: 12, m: true, f: P.danger }) +
    `<path d="M380 120 l-14 -8 M380 140 h-18 M380 160 l-14 8" stroke="${P.ink}" stroke-width="2.5" stroke-linecap="round"/>` +
    `<line x1="320" y1="234" x2="580" y2="234" stroke="${P.ink}" stroke-width="3"/>` +
    box(356, 246, 188, 34, P.okT, 10) + T(450, 268, 'closed, lines saved', { s: 14, f: P.ok }));

  const crash = [
    'f = open("log.txt", "w")',
    'f.write("Ana: pasta\\n")',
    'f.write("Ben: bean chili\\n")',
    'servings = int("two")',
    'f.write(f"Chloe: pudding x{servings}\\n")',
    'f.close()'
  ];
  const ideaPic = `<div style="width:100%;min-width:0">${ideaSvg}` +
    code(crash, { title: 'log.py', bad: [4, 6] }) +
    term(['$ python3 log.py', 'Traceback (most recent call last):', '  File "log.py", line 4, in <module>', '    servings = int("two")', "ValueError: invalid literal for int() with base 10: 'two'"], 'terminal') + `</div>`;

  // The code: the with block.
  const basic = [
    'with open("log.txt", "a") as f:',
    '    f.write("Ana: pasta, 2 servings\\n")',
    '    f.write("Ben: bean chili, 1 serving\\n")',
    '    print("Inside the block. Closed?", f.closed)',
    '',
    'print("After the block. Closed?", f.closed)',
    '',
    'with open("log.txt") as f:',
    '    for line in f:',
    '        print("Log:", line.strip())'
  ];
  const blockSvg = svg(600, 196, 'The with line opens the notebook and gives it the name f. Every line indented under it runs while the notebook is open, like a hand holding the cover. The first line back at the left edge is after the block: the notebook has already closed itself.',
    box(16, 14, 380, 42, P.tint, 10) + T(30, 41, 'with open("log.txt", "a") as f:', { s: 14, m: true, a: 'start' }) +
    `<rect x="40" y="66" width="356" height="70" rx="10" fill="${P.okT}" stroke="${P.ok}" stroke-width="2.5" stroke-dasharray="6 5"/>` +
    T(80, 92, 'f.write(...)', { s: 14, m: true, a: 'start' }) + T(80, 120, 'f.write(...)', { s: 14, m: true, a: 'start' }) +
    box(16, 148, 380, 38, P.white, 10) + T(30, 173, 'print(f.closed)   # True', { s: 14, m: true, a: 'start' }) +
    arrow(404, 35, 440, 35, P.accent, 2.5) + T(450, 40, 'opens it, names it f', { s: 12.5, w: 700, f: P.accent, a: 'start' }) +
    arrow(404, 101, 440, 101, P.ok, 2.5) + T(450, 96, 'indented:', { s: 12.5, f: P.ok, a: 'start' }) + T(450, 114, 'the notebook is open', { s: 12.5, w: 700, f: P.ok, a: 'start' }) +
    arrow(404, 167, 440, 167, P.ink2, 2.5) + T(450, 162, 'back at the edge:', { s: 12.5, f: P.ink2, a: 'start' }) + T(450, 180, 'closed by itself', { s: 12.5, w: 700, f: P.ink2, a: 'start' }));
  const codePic = `<div style="width:100%;min-width:0">${run(basic, { title: 'notebook.py', files: { 'log.txt': 'Chloe: rice pudding, 1 serving\n' } })}${blockSvg}</div>`;

  // The pain: forgot close(), and an error that skips close().
  const forgot = [
    'f = open("log.txt", "w")',
    'f.write("Ana: pasta\\n")',
    'f.write("Ben: bean chili\\n")',
    'print("Closed?", f.closed)',
    '',
    'peek = open("log.txt")',
    'print(f"In the notebook: [{peek.read().strip()}]")',
    'peek.close()'
  ];
  const halfway = [
    'f = open("log.txt", "w")',
    'try:',
    '    f.write("Ana: pasta\\n")',
    '    servings = int(input("Chloe, how many servings? "))',
    '    f.write(f"Chloe: pudding x{servings}\\n")',
    '    f.close()',
    'except ValueError:',
    '    print("Not a number. Kitchen Coach carries on.")',
    '',
    'print("Closed?", f.closed)',
    'peek = open("log.txt")',
    'print(f"In the notebook: [{peek.read().strip()}]")',
    'peek.close()'
  ];
  const painPic = `<div style="width:100%;min-width:0">${run(forgot, { title: 'forgot.py' })}${run(halfway, { title: 'halfway.py', inputs: ['two'] })}</div>`;

  // The fix: with, even when an error flies in. And try/finally, the long way.
  const withErr = [
    'try:',
    '    with open("log.txt", "w") as f:',
    '        f.write("Ana: pasta\\n")',
    '        servings = int(input("Chloe, how many servings? "))',
    '        f.write(f"Chloe: pudding x{servings}\\n")',
    'except ValueError:',
    '    print("Not a number. Kitchen Coach carries on.")',
    '',
    'print("Closed?", f.closed)',
    'with open("log.txt") as peek:',
    '    print(f"In the notebook: [{peek.read().strip()}]")'
  ];
  const byHand = [
    'f = open("log.txt", "w")',
    'try:',
    '    f.write("Ana: pasta\\n")',
    '    servings = int(input("Chloe, how many servings? "))',
    '    f.write(f"Chloe: pudding x{servings}\\n")',
    'finally:',
    '    f.close()',
    '    print("finally ran. Closed?", f.closed)'
  ];
  const sameSvg = svg(600, 170, 'Two ways to always close the notebook. By hand: open, then try, the work, finally, close. Five lines of wrapping. With: one line, and the work indented under it. Both close the file even when an error happens.',
    box(16, 14, 270, 146, P.warnT, 14) + T(151, 38, 'BY HAND', { s: 13, f: P.warn }) +
    T(32, 64, 'f = open(...)', { s: 12.5, m: true, a: 'start' }) + T(32, 84, 'try:', { s: 12.5, m: true, a: 'start' }) +
    T(56, 104, 'the work', { s: 12.5, m: true, f: P.ink2, a: 'start' }) + T(32, 124, 'finally:', { s: 12.5, m: true, a: 'start' }) +
    T(56, 144, 'f.close()', { s: 12.5, m: true, a: 'start' }) +
    box(314, 14, 270, 146, P.okT, 14) + T(449, 38, 'THE SHORT WAY', { s: 13, f: P.ok }) +
    T(330, 74, 'with open(...) as f:', { s: 12.5, m: true, a: 'start' }) + T(354, 94, 'the work', { s: 12.5, m: true, f: P.ink2, a: 'start' }) +
    T(330, 134, 'closes itself, always', { s: 12.5, w: 700, f: P.ok, a: 'start' }));
  const fixPic = `<div style="width:100%;min-width:0">${run(withErr, { title: 'with_error.py', inputs: ['two'] })}${run(byHand, { title: 'finally.py', inputs: ['two'] })}${sameSvg}</div>`;

  // Try it: two notebooks in one with.
  const shopping = [
    'with (',
    '    open("pantry.txt") as pantry,',
    '    open("shopping.txt", "w") as shop,',
    '):',
    '    for line in pantry:',
    '        food, grams = line.strip().split(",")',
    '        if int(grams) < 200:',
    '            shop.write(food + "\\n")',
    '            print("Running low:", food)',
    '',
    'with open("shopping.txt") as shop:',
    '    print("Shopping list:", shop.read().split())'
  ];
  const pantryFile = 'oats,500\nrice,150\nlentils,80\npasta,900\ntofu,0\n';

  // The catch: too late, the notebook is shut.
  const late = [
    'with open("log.txt", "w") as f:',
    '    f.write("Ana: pasta\\n")',
    'f.write("Ben: bean chili\\n")'
  ];
  const catchPic = `<div style="width:100%;min-width:0">${run(late, { title: 'too_late.py' })}</div>`;

  COURSE.add({
    id: 'l57', minutes: 12,
    summary: 'A file you open must be closed, or what you wrote may never reach the notebook. <code>f.close()</code> by hand is easy to forget, and an error halfway skips it. <code>with open("log.txt", "a") as f:</code> opens the file and names it <code>f</code>. The <b>indented block</b> is the time the notebook is open. When the block ends, Python <b>closes it for you</b>, <b>even if an error happens inside</b>. Use it for reading and writing, and open two files in one <code>with</code>. <code>try</code> and <code>finally</code> do the same by hand. <code>with</code> is the short way.',
    video: {
      src: 'videos/l57-with.mp4', poster: 'videos/l57-with.jpg', length: '1 min 5 s',
      script: [
        'Kitchen Coach keeps a dinner log. Open the notebook. Write Ana\'s pasta. Write Ben\'s chili. Then close it.',
        'But tonight, Chloe types her servings as the word "two". int fails. A ValueError, halfway through. The close line never runs. The notebook is left open on the counter, and the lines you wrote may never be saved.',
        'The fix is one word. With. With open the log, as f. Everything indented under it is the time the notebook is open. When the block ends, Python closes it for you. f.closed is True.',
        'And if an error flies in halfway? The cover still snaps shut. Ana and Ben are safe on the page.',
        'Reading works the same way. One with can even open 2 notebooks. The pantry to read, and the shopping list to write.',
        'Try and finally can do this by hand. With is the short way.',
        'With opens the notebook, and always closes it, even when something goes wrong.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'An error halfway, and the notebook stays open.',
        text: [
          'Kitchen Coach writes the dinner log the way lesson 56 showed: <code>open</code>, <code>write</code>, <code>write</code>, and <code>f.close()</code> at the end. Every step has to run, in order, for the notebook to be closed.',
          'Tonight Chloe types her servings as the word <code>two</code>. <code>int("two")</code> on line 4 raises a <b>ValueError</b>, the error from lesson 52. Python stops right there. Line 6, <code>f.close()</code>, <b>never runs</b>.',
          'Python keeps what you write in its memory first and puts it in the file in one go, at the latest when the file is <b>closed</b>. A notebook that is never closed is a notebook whose last lines may never be written. You want a notebook with a <b>spring-loaded cover</b>: it shuts by itself when you let go, whatever happened. That is <code>with</code>.'
        ],
        tip: 'Lessons 55 and 56 said "always close the file" and pointed here for the better way. This is it.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'with opens it, and closes it when the block ends.',
        text: [
          '<code>with open("log.txt", "a") as f:</code> reads like a sentence: "with the log open for adding, called <code>f</code>". It ends with a colon, like <code>if</code> and <code>for</code>.',
          'The lines <b>indented</b> under it are the <b>block</b>. While they run, the notebook is open, like a hand holding the cover. Inside, you use <code>f</code> exactly as before: <code>f.write(...)</code>, <code>f.read()</code>, <code>for line in f</code>.',
          'When Python reaches the first line back at the left edge, the block is over and Python <b>closes the file for you</b>. No <code>f.close()</code> anywhere. <code>f.closed</code> is <code>True</code> or <code>False</code>: is this notebook shut? Press <b>Run</b>: False inside the block, True after it.',
          'The second <code>with</code> opens the log for <b>reading</b>, the way lesson 55 read it. The box starts with Chloe\'s line already in <code>log.txt</code>, and <code>"a"</code> adds Ana and Ben after it. Now change <code>"a"</code> to <code>"w"</code> on line 1 and run it again. Chloe\'s line is gone: <code>"w"</code> starts a fresh page (lesson 56).'
        ],
        tip: 'Every Run here starts in a fresh, empty folder, with any ready-made files the box needs. Nothing you write carries over to the next run.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Forget close(), or let an error skip it.',
        text: [
          '<b>forgot.py</b> writes two lines and never closes the file. Press <b>Run</b>. <code>Closed? False</code>. Then it peeks into <code>log.txt</code> with a second <code>open()</code>: <code>In the notebook: []</code>. <b>Empty.</b> Ana and Ben are still waiting in Python\'s memory, not in the file.',
          '<b>halfway.py</b> does remember <code>f.close()</code>, and it even catches the error, as lesson 53 taught. The ready-made answer is <code>two</code>. <code>int()</code> raises a ValueError, Python jumps to <code>except</code>, and <code>f.close()</code> is <b>skipped</b>. Kitchen Coach carries on with the notebook open and Ana\'s line unsaved: <code>Closed? False</code>, <code>[]</code>.',
          'When a short program ends, Python usually tidies up open files for you. But Kitchen Coach is meant to keep running all evening. A file left open is a page you think is saved, and is not.'
        ],
        warn: 'The bug is invisible. No error, no warning. The program says "carries on" and the notebook is quietly missing lines. That is why you do not trust yourself to remember <code>close()</code>.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'with closes it, even when an error flies in.',
        text: [
          '<b>with_error.py</b> is halfway.py with <code>with</code> instead of <code>open</code> and <code>close</code>. The ValueError flies out of the block, and on its way out, <code>with</code> <b>closes the notebook</b>. Then <code>except</code> catches the error as usual. Press <b>Run</b>: <code>Closed? True</code>, and <code>[Ana: pasta]</code> is safe in the file.',
          'Now change line 4 to <code>servings = int("3")</code> and run it again. No error this time: both lines are saved, and the notebook is closed. Error or not, the cover snaps shut.',
          '<b>finally.py</b> is the manual way, from lesson 53. <code>finally:</code> is a block that runs <b>no matter what</b>: error or no error. Put <code>f.close()</code> there and it always runs. Press <b>Run</b>: <code>finally ran. Closed? True</code> appears, and only <b>then</b> does the ValueError stop the program.',
          '<code>with</code> does exactly that <code>try</code> and <code>finally</code> work for you, in one line. Use <code>with</code>.'
        ],
        tip: 'Read <code>with ... as f:</code> as "while I hold this notebook open". The block is the holding. Letting go, for any reason, shuts it.'
      },
      {
        label: 'Try it', pic: run(shopping, { title: 'shopping.py', files: { 'pantry.txt': pantryFile } }),
        h: 'Two notebooks in one with.',
        text: [
          'Kitchen Coach reads the pantry and writes a shopping list in the same go. <code>pantry.txt</code> is already in the box: one food per line, then a comma, then the grams, like <code>rice,150</code>.',
          'One <code>with</code> can open <b>two</b> files. Separate them with a comma. The brackets after <code>with</code> let you put each one on its own line, which is easier to read. On one line it is the same thing: <code>with open("pantry.txt") as pantry, open("shopping.txt", "w") as shop:</code>',
          'Inside the block, <code>for line in pantry</code> reads each line, <code>strip</code> and <code>split(",")</code> cut it into food and grams (lesson 55), and anything under 200 g goes onto the shopping list. When the block ends, <b>both</b> notebooks close. Press <b>Run</b>.',
          'Now change <code>200</code> to <code>600</code> on line 7 and run it again. The oats join the list. Then add <code>shop.write("milk\\n")</code> as a new line 10, pushed in by 4 spaces like the <code>for</code> line, so milk is always on the list. It is still inside the block, so it is saved.'
        ],
        tip: 'The brackets around several files after <code>with</code> need Python 3.10 or newer. You have 3.15, and this page runs 3.14, so both work.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Do the work inside the block.',
        text: [
          'After the block, <code>f</code> is still a name you can use, but the notebook it points to is <b>shut</b>. Press <b>Run</b>: <code>ValueError: I/O operation on closed file.</code> "I/O" means input and output: reading and writing.',
          'Line 3 is at the left edge, so it runs after the block has ended. Push it in by 4 spaces so it lines up with line 2, and run again. Every read and write belongs <b>inside</b> the block.',
          'Keep the block short: open, read or write, done. Do the slow thinking before or after, so the notebook is open only as long as you need it.',
          '<code>with</code> is not only for files. Anything that must be cleaned up afterwards can work with it: a lock, a network connection, a timer. Lesson 85, Context managers, shows how to make your own.'
        ],
        warn: 'If you see <code>f.close()</code> in someone\'s code, look for an error that could skip it. Nearly always, <code>with</code> is the better choice.'
      }
    ],
    exercises: [
      {
        file: 'l57_close_the_notebook.py', title: 'Close the notebook',
        task: 'Kitchen Coach\'s <code>log_dinner(path, orders)</code> opens the dinner log, writes a line per order, and calls <code>f.close()</code>. Chloe\'s <code>"two"</code> raises a ValueError halfway, so the notebook is left open and Ana and Ben\'s lines are not saved. Rewrite the card with <code>with open(path, "w") as f:</code> so the notebook always closes, and let the ValueError out to the caller.',
        steps: [
          'Press <b>Open in VS Code</b>. Run the file once: <code>In the log:</code> shows nothing at all, and the check says the notebook was left open.',
          'Between <code>START</code> and <code>END</code>, replace the <code>open</code> line with a <code>with</code> line, indent the loop under it, and remove <code>f.close()</code>. Save the file.',
          'Run it again. The log shows Ana and Ben, and the check says <code>PASS</code> or gives you one hint. Open <code>dinner_log.txt</code> next to the exercise to see the notebook itself.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does the last line print?',
        pic: code(['with open("log.txt", "w") as f:', '    f.write("Ben: bean chili\\n")', 'print(f.closed)'], { title: 'log.py' }),
        options: ['True', 'False', 'Nothing: f does not exist after the block', 'An error: you forgot f.close()'],
        answer: 0,
        why: 'When the block ends, <code>with</code> closes the file. <code>f</code> is still there, so <code>f.closed</code> works and says <code>True</code>.',
        hint: 'Line 3 is back at the left edge. Is the block over?'
      },
      {
        type: 'pick', q: 'Which lines run when the notebook is <b>already closed</b>?',
        pic: code(['with open("pantry.txt") as f:', '    text = f.read()', '    print(len(text), "characters")', 'print("Done reading")', 'again = f.read()'], { title: 'pantry.py' }),
        options: ['Lines 4 and 5', 'Only line 5', 'Lines 2 and 3', 'None of them: the file closes at the end of the program'],
        answer: 0,
        why: 'Lines 2 and 3 are indented, so the notebook is open while they run. Line 4 is back at the left edge, so the block is over and the file is shut. Printing is fine, but line 5 tries to read a closed file and gets <code>ValueError: I/O operation on closed file.</code>',
        hint: 'The block is the indented lines. Where does the indent stop?'
      },
      {
        type: 'fix', q: 'Chloe\'s <code>"two"</code> skips <code>f.close()</code>, so the notebook stays open and Ana and Ben are not saved. Rewrite the file part with <code>with open("log.txt", "w") as f:</code> so it closes even after the error. Keep the <code>try</code> and <code>except</code>.',
        code: ['try:', '    f = open("log.txt", "w")', '    f.write("Ana: pasta\\n")', '    f.write("Ben: bean chili\\n")', '    servings = int("two")', '    f.close()', 'except ValueError:', '    print("Not a number.")'],
        title: 'log.py',
        check: [
          'f = globals().get("f")',
          'if f is None or not hasattr(f, "closed"):',
          '    msg = "Keep the name f:  with open(\\"log.txt\\", \\"w\\") as f:"',
          'elif not f.closed:',
          '    msg = "The notebook is still open after the error. Use  with open(\\"log.txt\\", \\"w\\") as f:  and indent the writes under it."',
          'else:',
          '    with open("log.txt") as r:',
          '        text = r.read()',
          '    if text != "Ana: pasta\\nBen: bean chili\\n":',
          '        msg = "The notebook should hold Ana and Ben, one per line. It holds: [" + text.strip() + "]"',
          '    elif out.strip() != "Not a number.":',
          '        msg = "The program should still print: Not a number."',
          '    else:',
          '        ok = True'
        ].join('\n'),
        why: 'Inside the <code>try</code>: <code>with open("log.txt", "w") as f:</code>, then the two writes and the <code>int</code> line indented one more step. No <code>f.close()</code>. When the ValueError flies out of the block, <code>with</code> closes the file, and Ana and Ben are saved.',
        hint: 'Replace line 2 with the <code>with</code> line, push lines 3 to 5 in by 4 more spaces, and delete <code>f.close()</code>.'
      },
      {
        type: 'fix', q: 'This should save the foods under 200 g to <code>shopping.txt</code>, but the list comes out empty. Use <b>one</b> <code>with</code> that opens both files, so they close and the list is saved.',
        code: ['pantry = open("pantry.txt")', 'shop = open("shopping.txt", "w")', 'for line in pantry:', '    food, grams = line.strip().split(",")', '    if int(grams) < 200:', '        shop.write(food + "\\n")'],
        title: 'shopping.py', files: { 'pantry.txt': 'oats,500\nrice,150\nlentils,80\npasta,900\n' },
        check: [
          'g = globals()',
          'if "shop" not in g or "pantry" not in g:',
          '    msg = "Keep the names: open the pantry as pantry and the list as shop."',
          'elif not (g["shop"].closed and g["pantry"].closed):',
          '    msg = "A file is still open. Open both in one with:  with open(\\"pantry.txt\\") as pantry, open(\\"shopping.txt\\", \\"w\\") as shop:"',
          'else:',
          '    with open("shopping.txt") as r:',
          '        text = r.read()',
          '    if text == "rice\\nlentils\\n":',
          '        ok = True',
          '    else:',
          '        msg = "shopping.txt should hold rice and lentils, one per line. It holds: [" + text.strip() + "]"'
        ].join('\n'),
        why: '<code>with open("pantry.txt") as pantry, open("shopping.txt", "w") as shop:</code>, then the loop indented under it. When the block ends, both files close, and Python writes rice and lentils into the list.',
        hint: 'Turn lines 1 and 2 into one <code>with</code> line with a comma between the two <code>open(...) as ...</code> parts, then indent the loop under it.'
      },
      {
        type: 'fill', q: 'Finish the line that opens the log for adding and calls it <code>f</code>.',
        text: '___ open("log.txt", "a") ___ f:\n    f.write("Chloe: rice pudding\\n")',
        options: ['with', 'as', 'try', 'for', 'in', 'open'],
        answer: ['with', 'as'],
        why: '<code>with</code> starts the block. <code>as f</code> gives the open file its name. The colon and the indent do the rest.',
        hint: 'Read it as a sentence: "with the log open, ___ f".'
      },
      {
        type: 'pick', q: 'Back to lesson 56. Ana\'s log already has 3 lines. Kitchen Coach should add Chloe\'s line <b>at the end</b> and keep the other 3. Which mode?',
        pic: code(['with open("log.txt", ___) as f:', '    f.write("Chloe: rice pudding\\n")'], { title: 'add.py' }),
        options: ['"a"', '"w"', 'No mode: open() always adds', '"r"'],
        answer: 0,
        why: '<code>"a"</code> means append: add at the end. <code>"w"</code> starts a fresh page and wipes the 3 lines. With no mode, <code>open</code> reads (<code>"r"</code>), and writing to it fails.',
        hint: 'One mode starts a fresh page. The other adds to the end.'
      },
      {
        type: 'pick', q: 'Back to lesson 53. What does this print before the error stops the program?',
        pic: code(['f = open("log.txt", "w")', 'try:', '    servings = int("two")', '    print("Got a number")', 'finally:', '    f.close()', '    print("Closed:", f.closed)'], { title: 'finally.py' }),
        options: ['Closed: True', 'Got a number, then Closed: True', 'Nothing: the error stops it at line 3', 'Closed: False'],
        answer: 0,
        why: 'Line 3 raises a ValueError, so line 4 is skipped. But <code>finally</code> runs <b>no matter what</b>, so the file is closed and <code>Closed: True</code> is printed. Then the ValueError carries on and stops the program.',
        hint: 'finally runs whether or not there was an error. Does line 4 run?'
      },
      {
        type: 'type', q: 'Type the line that opens <code>pantry.txt</code> for <b>reading</b> with <code>with</code>, and calls it <code>p</code>.',
        prompt: '>>>',
        answers: ['with open("pantry.txt") as p:', 'with open("pantry.txt", "r") as p:', "with open('pantry.txt') as p:", "with open('pantry.txt', 'r') as p:"],
        why: '<code>with open("pantry.txt") as p:</code>. Reading is the default mode, so <code>"r"</code> is optional. Do not forget the colon at the end.',
        hint: 'with, then open(...), then as and the name, then a colon.'
      }
    ]
  });
})();
