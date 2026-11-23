/* Lesson 58: Paths with pathlib (module 5). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l58  Paths with pathlib
     ===================================================================== */

  const SOUP = 'red lentils, 200 g\ncarrots, 2\nonion, 1\nstock, 800 ml\n';
  const PANTRY = 'rice,900\noats,400\n';

  // A notebook lying on a shelf: a small card with a coloured spine and its file name.
  const book = (x, y, w, name, o) => {
    o = o || {};
    return `<rect x="${x}" y="${y}" width="${w}" height="34" rx="6" fill="${o.fill || P.white}" stroke="${o.stroke || P.ink}" stroke-width="${o.sw || 2}"/>` +
      `<rect x="${x}" y="${y}" width="10" height="34" rx="3" fill="${o.spine || P.accent}"/>` +
      T(x + 18, y + 22, name, { s: 12.5, m: true, a: 'start', f: o.f || P.ink });
  };
  // A folder drawn as a cupboard with a name tab.
  const folder = (x, y, w, h, name, fill) =>
    `<rect x="${x + 12}" y="${y - 18}" width="${name.length * 8 + 24}" height="24" rx="6" fill="${fill}" stroke="${P.ink}" stroke-width="2"/>` +
    T(x + 24, y - 1, name, { s: 12.5, m: true, a: 'start', f: P.ink }) +
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${fill}" stroke="${P.ink}" stroke-width="2.5"/>`;
  // A person standing: you.
  const person = (x, y, col) =>
    `<circle cx="${x}" cy="${y}" r="11" fill="${col || P.warnT}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<path d="M${x} ${y + 11} v30 M${x - 16} ${y + 24} h32 M${x} ${y + 41} l-12 22 M${x} ${y + 41} l12 22" stroke="${P.ink}" stroke-width="3" stroke-linecap="round" fill="none"/>`;
  // A map pin.
  const pin = (x, y) =>
    `<path d="M${x} ${y} c-14 -16 -16 -24 -16 -30 a16 16 0 0 1 32 0 c0 6 -2 14 -16 30 z" fill="${P.danger}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<circle cx="${x}" cy="${y - 30}" r="6" fill="${P.white}"/>`;

  /* ---- The idea: a path is the way to a notebook ---- */
  const ideaSvg = svg(600, 300, 'A map of the kitchen. On the left, the hallway, where you stand. On the right, a cupboard called kitchen. It holds the notebook pantry.txt and a smaller cupboard called recipes, which holds lentil_soup.txt and bean_chili.txt. An arrow goes from kitchen into recipes and on to lentil_soup.txt. Underneath, the same address written two ways: kitchen, backslash, recipes, backslash, lentil_soup.txt on Windows, and with forward slashes on a Mac.',
    T(76, 30, 'hallway', { s: 13, f: P.ink2 }) +
    `<rect x="16" y="40" width="120" height="172" rx="12" fill="${P.paper2}" stroke="${P.ink}" stroke-width="2" stroke-dasharray="6 5"/>` +
    person(76, 96) +
    T(76, 186, 'you stand here', { s: 12, w: 700, f: P.ink2 }) +
    folder(160, 40, 424, 172, 'kitchen', P.white) +
    `<line x1="176" y1="118" x2="324" y2="118" stroke="${P.ink}" stroke-width="4"/>` +
    book(184, 82, 134, 'pantry.txt', { spine: P.warn }) +
    T(250, 142, 'a notebook', { s: 12, w: 700, f: P.ink2 }) +
    T(250, 160, 'on the shelf', { s: 12, w: 700, f: P.ink2 }) +
    folder(342, 72, 228, 126, 'recipes', P.tint) +
    book(356, 94, 200, 'lentil_soup.txt', { stroke: P.accent, sw: 3 }) +
    book(356, 146, 200, 'bean_chili.txt') +
    `<path d="M268 36 C 290 4, 330 8, 370 50" fill="none" stroke="${P.accent}" stroke-width="3" stroke-dasharray="7 6"/>` +
    arrow(366, 46, 372, 56, P.accent, 3) +
    T(300, 238, 'kitchen / recipes / lentil_soup.txt', { s: 16, m: true, f: P.accent }) +
    T(300, 266, 'Windows writes  kitchen\\recipes\\lentil_soup.txt', { s: 12.5, m: true, f: P.ink2 }) +
    T(300, 288, 'a Mac writes  kitchen/recipes/lentil_soup.txt', { s: 12.5, m: true, f: P.ink2 }));
  const ideaPic = `<div style="width:100%;min-width:0">${ideaSvg}${term([
    '# the same notebook, its full address on two laptops',
    'C:\\Users\\you\\kitchen\\pantry.txt      (your Windows laptop)',
    '/Users/ben/kitchen/pantry.txt        (Ben\'s Mac)'
  ], 'two full paths')}</div>`;

  /* ---- The code: Path, / and the parts ---- */
  const parts = [
    'from pathlib import Path',
    '',
    'recipe = Path("recipes") / "lentil_soup.txt"',
    'print(recipe)',
    'print("name:  ", recipe.name)',
    'print("stem:  ", recipe.stem)',
    'print("suffix:", recipe.suffix)',
    'print("parent:", recipe.parent)',
    'print("exists:", recipe.exists())',
    'print("standing in:", Path.cwd())'
  ];
  const partsSvg = svg(600, 130, 'The parts of the path recipes/lentil_soup.txt. parent is the folder, recipes. name is the whole file name, lentil_soup.txt. stem is the name without its ending, lentil_soup. suffix is the ending, .txt.',
    T(300, 50, 'recipes / lentil_soup.txt', { s: 22, m: true }) +
    // parent under "recipes"
    `<path d="M140 62 v10 h96 v-10" fill="none" stroke="${P.warn}" stroke-width="2.5"/>` + T(188, 96, '.parent', { s: 13.5, m: true, f: P.warn }) +
    // name over "lentil_soup.txt"
    `<path d="M276 22 v-8 h198 v8" fill="none" stroke="${P.accent}" stroke-width="2.5"/>` +
    T(540, 20, '.name', { s: 13.5, m: true, f: P.accent }) + `<line x1="476" y1="16" x2="512" y2="16" stroke="${P.accent}" stroke-width="2"/>` +
    // stem and suffix
    `<path d="M276 62 v10 h140 v-10" fill="none" stroke="${P.ok}" stroke-width="2.5"/>` + T(346, 96, '.stem', { s: 13.5, m: true, f: P.ok }) +
    `<path d="M422 62 v10 h52 v-10" fill="none" stroke="${P.danger}" stroke-width="2.5"/>` + T(448, 96, '.suffix', { s: 13.5, m: true, f: P.danger }) +
    T(300, 124, 'A Path knows its own parts. No cutting text by hand.', { s: 12.5, w: 700, f: P.ink2 }));
  const codePic = `<div style="width:100%;min-width:0">${run(parts, { title: 'paths.py', files: { 'recipes/lentil_soup.txt': SOUP } })}${partsSvg}</div>`;

  /* ---- The pain: a glued string, and the folder you run from ---- */
  const glued = [
    'folder = "recipes"',
    'path = folder + "\\\\" + "lentil_soup.txt"',
    'print("Looking for:", path)',
    '',
    'with open(path) as f:',
    '    print(f.read())'
  ];
  const hallSvg = svg(600, 160, 'Two ways to run the same coach.py. Left: standing in the kitchen folder, the short name pantry.txt finds the notebook. Right: standing in the hallway, the home folder, the same short name finds nothing, and Python raises FileNotFoundError.',
    box(16, 14, 276, 136, P.okT, 14) + T(154, 38, 'cd ~/kitchen', { s: 13.5, m: true }) +
    person(52, 68, P.white) + arrow(80, 96, 128, 96, P.ok, 2.5) + book(136, 80, 140, 'pantry.txt', { spine: P.warn }) +
    T(206, 138, 'found', { s: 13, f: P.ok }) +
    box(308, 14, 276, 136, P.dangerT, 14) + T(446, 38, 'cd ~   (the hallway)', { s: 13.5, m: true }) +
    person(344, 68, P.white) + arrow(372, 96, 420, 96, P.danger, 2.5) +
    `<rect x="428" y="80" width="140" height="34" rx="6" fill="none" stroke="${P.danger}" stroke-width="2.5" stroke-dasharray="7 5"/>` +
    T(498, 102, 'pantry.txt?', { s: 12.5, m: true, f: P.danger }) +
    T(498, 138, 'FileNotFoundError', { s: 12.5, m: true, f: P.danger }));
  const hallTerm = term([
    '$ cd ~/kitchen',
    '$ python3 coach.py',
    'rice,900',
    'oats,400',
    '$ cd ~',
    '$ python3 kitchen/coach.py',
    'Traceback (most recent call last):',
    '  File "/Users/ben/kitchen/coach.py", line 1, in <module>',
    '    with open("pantry.txt") as f:',
    '         ~~~~^^^^^^^^^^^^^^',
    "FileNotFoundError: [Errno 2] No such file or directory: 'pantry.txt'"
  ], 'terminal, Python 3.15, on Ben\'s Mac');
  const painPic = `<div style="width:100%;min-width:0">${run(glued, { title: 'glued.py', files: { 'recipes/lentil_soup.txt': SOUP } })}${hallSvg}${hallTerm}</div>`;

  /* ---- The fix: Path and /, and Path(__file__).parent ---- */
  const fixed = [
    'from pathlib import Path',
    '',
    'path = Path("recipes") / "lentil_soup.txt"',
    'print("Looking for:", path)',
    '',
    'with open(path) as f:',
    '    print(f.read())'
  ];
  const coach = [
    'from pathlib import Path',
    '',
    'HERE = Path(__file__).parent',
    'print("The script lives in:", HERE)',
    'print("You are standing in:", Path.cwd())',
    '',
    'with open(HERE / "pantry.txt") as f:',
    '    print(f.read(), end="")'
  ];
  const pinSvg = svg(600, 170, 'The hallway on the left, with you standing in it. On the right, the kitchen folder with coach.py and pantry.txt. A red pin sits on coach.py\'s folder: that is Path(__file__).parent. An arrow goes from the pin to pantry.txt, so the notebook is found wherever you stand.',
    `<rect x="16" y="20" width="120" height="136" rx="12" fill="${P.paper2}" stroke="${P.ink}" stroke-width="2" stroke-dasharray="6 5"/>` +
    person(76, 60) + T(76, 140, 'you, anywhere', { s: 12, w: 700, f: P.ink2 }) +
    folder(164, 38, 420, 118, 'kitchen', P.white) +
    book(184, 64, 150, 'coach.py', { spine: P.ok }) +
    book(184, 108, 150, 'pantry.txt', { spine: P.warn, stroke: P.ok, sw: 3 }) +
    pin(360, 64) +
    T(470, 70, 'Path(__file__).parent', { s: 13.5, m: true, f: P.danger }) +
    T(470, 92, 'the pin: where the script lives', { s: 12, w: 700, f: P.ink2 }) +
    `<path d="M352 66 C 340 90, 344 118, 340 124" fill="none" stroke="${P.ok}" stroke-width="3"/>` + arrow(342, 120, 338, 127, P.ok, 3) +
    T(470, 128, '/ "pantry.txt"', { s: 13.5, m: true, f: P.ok }));
  const pinTerm = term([
    '$ cd ~',
    '$ python3 kitchen/coach.py',
    'The script lives in: /Users/ben/kitchen',
    'You are standing in: /Users/ben',
    'rice,900',
    'oats,400'
  ], 'terminal, Python 3.15, from the hallway');
  const setupLines = code([
    '# lesson 55',
    'NOTEBOOK = pathlib.Path(__file__).parent / "l55_pantry.txt"',
    '# lesson 56',
    'path = pathlib.Path(__file__).with_name("l56_shopping.txt")',
    '# lesson 57, the older way with os.path',
    'LOG = os.path.join(os.path.dirname(os.path.abspath(__file__)), "dinner_log.txt")'
  ], { title: 'the setup lines from the exercises', hi: [2] });

  const fixPic = `<div style="width:100%;min-width:0">${run(fixed, { title: 'glued.py', files: { 'recipes/lentil_soup.txt': SOUP } })}${code(coach, { title: 'kitchen/coach.py', hi: [3, 7] })}${pinSvg}${pinTerm}${setupLines}</div>`;

  /* ---- Try it: a shelf of recipes ---- */
  const shelf = [
    'from pathlib import Path',
    '',
    'shelf = Path("recipes")',
    'shelf.mkdir(exist_ok=True)',
    '',
    '(shelf / "bean_chili.txt").write_text("kidney beans, 400 g\\ntomatoes, 400 g\\nonion, 1\\n")',
    '(shelf / "rice_pudding.txt").write_text("pudding rice, 100 g\\nmilk, 700 ml\\n")',
    '',
    'for recipe in shelf.glob("*.txt"):',
    '    lines = recipe.read_text().count("\\n")',
    '    print(f"{recipe.stem}: {lines} lines")'
  ];

  /* ---- The catch: write_text wipes, and mkdir twice ---- */
  const wipe = [
    'from pathlib import Path',
    '',
    'log = Path("dinner_log.txt")',
    'log.write_text("Mon: lentil soup\\n")',
    'log.write_text("Tue: bean chili\\n")',
    '',
    'print(log.read_text())'
  ];
  const mkdirTerm = term([
    '$ python3 shelf.py',
    'Made recipes',
    '$ python3 shelf.py',
    'Traceback (most recent call last):',
    '  File "/Users/ben/kitchen/shelf.py", line 4, in <module>',
    '    shelf.mkdir()',
    '    ~~~~~~~~~~~^^',
    '  File ".../lib/python3.15/pathlib/__init__.py", line 1210, in mkdir',
    '    os.mkdir(self, mode)',
    '    ~~~~~~~~^^^^^^^^^^^^',
    "FileExistsError: [Errno 17] File exists: 'recipes'"
  ], 'terminal, Python 3.15, the second run (a long folder name shortened to ...)');
  const catchPic = `<div style="width:100%;min-width:0">${run(wipe, { title: 'wipe.py' })}${mkdirTerm}</div>`;

  COURSE.add({
    id: 'l58', minutes: 14,
    summary: 'A <b>path</b> is the address of a file: folders, then the file name. Windows writes it with <code>\\</code>, a Mac with <code>/</code>, so a path typed or glued as text breaks on someone else\'s computer. <code>from pathlib import Path</code>, then build it with <code>/</code>: <code>Path("recipes") / "soup.txt"</code> is right on <b>every</b> computer. A Path knows its parts: <code>.name</code>, <code>.stem</code>, <code>.suffix</code>, <code>.parent</code>, and <code>.exists()</code>. A short name like <code>"pantry.txt"</code> starts from the folder you <b>run from</b>, <code>Path.cwd()</code>, not the script\'s folder. <code>Path(__file__).parent</code> is where the script <b>lives</b>: start from there. <code>.read_text()</code>, <code>.write_text()</code>, <code>.mkdir(exist_ok=True)</code> and <code>sorted(shelf.glob("*.txt"))</code> do the rest.',
    video: {
      src: 'videos/l58-paths-with-pathlib.mp4', poster: 'videos/l58-paths-with-pathlib.jpg', length: '1 min 7 s',
      script: [
        'Kitchen Coach works on your laptop. Then Ben runs it on his Mac, and it crashes. File not found. C, Users, you, kitchen. That address only exists on your laptop.',
        'Picture the computer as a kitchen. Folders are shelves. A file is a notebook on a shelf. A path is the way to that notebook.',
        'From pathlib, import Path. Path, recipes, then a slash, then soup dot txt. The slash draws the arrow, and Python writes it the right way on every computer. The path knows its name, its stem, and its suffix.',
        'Now a second trap. Ben runs the script from the hallway. It asks for pantry dot txt. Nothing here. A short name starts from where you stand, the current working directory.',
        'So put a pin where the script lives. Path of dunder file, dot parent. Then slash, pantry dot txt. Found, from anywhere.',
        'Build paths with Path and slash. Start from where your script lives.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Every notebook has an address.',
        text: [
          'Kitchen Coach works on your laptop. Then Ben copies the folder to his Mac, runs it, and it crashes: <code>FileNotFoundError</code>. Same code, same notebook. What changed is the <b>address</b>.',
          'Think of the computer as a house. A <b>folder</b> is a cupboard with shelves, a <b>file</b> is a notebook on a shelf, and folders can sit inside folders. A <b>path</b> is the way to one notebook: the folders, one after another, then the file name. <code>kitchen/recipes/lentil_soup.txt</code>.',
          'Two catches. Windows puts a <b>backslash</b> <code>\\</code> between the folders and starts with a drive like <code>C:</code>. A Mac and Linux put a <b>forward slash</b> <code>/</code>. And a <b>full path</b> names every folder from the very top, so it only fits <b>one</b> computer: your laptop has no <code>/Users/ben</code>, and Ben\'s Mac has no <code>C:\\Users\\you</code>.'
        ],
        tip: 'A short path with no folders in front, like <code>"pantry.txt"</code>, is a <b>relative</b> path: "from where I am now". Lesson 55 opened files that way. The pain below shows where "now" really is.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'Path, and a / between the parts.',
        text: [
          '<code>from pathlib import Path</code> takes <code>Path</code> out of <code>pathlib</code>, a cookbook that comes with Python. Lesson 60, Modules and import, explains <code>import</code>. For now: write that line at the top.',
          '<code>Path("recipes")</code> makes a <b>Path</b>, a value that is an address, like a string is text. Then <code>/</code> adds the next step: <code>Path("recipes") / "lentil_soup.txt"</code>. Here <code>/</code> does not divide. Between paths it means "and then into". Python writes the right slash for the computer it runs on.',
          'A Path knows its own parts. <code>.name</code> is the file name, <code>.stem</code> the name without its ending, <code>.suffix</code> the ending, and <code>.parent</code> the folder it is in. <code>.exists()</code> asks: is something really there? <code>Path.cwd()</code> is the folder you are <b>standing in</b>. Press <b>Run</b>.',
          'Now change <code>"lentil_soup.txt"</code> to <code>"bean_chili.txt"</code> on line 3 and run it again. The address is fine, but <code>exists: False</code>: no such notebook on the shelf yet.'
        ],
        tip: 'Every Run box on this page starts in an empty folder, <code>/home/pyodide/kitchen</code>, with the files the box needs. On your computer <code>Path.cwd()</code> shows your own folder, like <code>/Users/ben/kitchen</code>.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Glued text, and the folder you run from.',
        text: [
          '<b>glued.py</b> builds the address as text, the Windows way: the folder, a backslash, the file name. In Python text a backslash starts a special character, like <code>\\n</code>, so one real backslash is written <code>"\\\\"</code>. Press <b>Run</b>. On Windows this works. This page runs like a Mac, where <code>\\</code> is not a separator, just a letter. Python looks for <b>one</b> file called <code>recipes\\lentil_soup.txt</code>, and finds nothing.',
          'A typed-in full path like <code>open("C:\\\\Users\\\\you\\\\kitchen\\\\pantry.txt")</code> is worse. It names <b>your</b> folders. On Ben\'s Mac: <code>FileNotFoundError</code>.',
          'The second trap hides even on one computer. <code>open("pantry.txt")</code> does not look next to the script. It looks in the folder you <b>run from</b>, called the <b>current working directory</b>. Stand in <code>~/kitchen</code> and run <code>coach.py</code>: found. Stand in the hallway, your home folder <code>~</code>, and run <code>kitchen/coach.py</code>: the same script, the same notebook, and <b>nothing there</b>.'
        ],
        warn: 'VS Code\'s Run button runs from the folder you <b>opened</b> in VS Code, which is often not the folder your script is in. That is why the exercises since lesson 55 had a setup line to find their files. This lesson explains it.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Build it with /. Start where the script lives.',
        text: [
          'Fix one: build every address with <code>Path</code> and <code>/</code>, never by gluing text. Press <b>Run</b> on the new <b>glued.py</b>: the recipe is found. The same line works on Windows, a Mac and Linux. <code>open()</code> takes a Path just like a string.',
          'Fix two: start from the script, not from where you stand. When Python runs a file, it puts that file\'s full address in a name called <code>__file__</code>, with two underscores on each side ("dunder file"). <code>Path(__file__)</code> makes it a Path, and <code>.parent</code> is the folder the script <b>lives</b> in: a pin on the map. Then <code>HERE / "pantry.txt"</code> is the notebook next to the script, wherever you stand.',
          'Now the setup lines from the exercises. Lesson 55 used exactly this: <code>pathlib.Path(__file__).parent / "l55_pantry.txt"</code>. <code>import pathlib</code> and then <code>pathlib.Path</code> is the same Path, with the cookbook\'s name in front. Lesson 56 used <code>.with_name("l56_shopping.txt")</code>: take this path and <b>swap the name</b> at the end. Same address.',
          'Lesson 57 used the <b>older</b> way, from the <code>os</code> cookbook, which you will still see in other people\'s code. Read it from the inside out: <code>os.path.abspath(__file__)</code> is the script\'s full address, <code>os.path.dirname(...)</code> its folder, like <code>.parent</code>, and <code>os.path.join(..., "dinner_log.txt")</code> adds the name with the right slash, like <code>/</code>. All three lines say: <b>next to this script</b>.'
        ],
        tip: '<code>__file__</code> only exists when Python runs a <b>file</b>. The Run boxes on this page are not files on a disk, so there it stops with <code>NameError: name \'__file__\' is not defined. Did you mean: \'__name__\'?</code> Try <b>coach.py</b> in VS Code instead, and run it from two different folders.'
      },
      {
        label: 'Try it', pic: run(shelf, { title: 'shelf.py', files: { 'recipes/lentil_soup.txt': SOUP, 'recipes/notes.md': 'Ana wants more carbs before Sunday\n' } }),
        h: 'A shelf of recipes.',
        text: [
          'The box starts with a <code>recipes</code> folder holding <code>lentil_soup.txt</code> and a note, <code>notes.md</code>. Line 4 makes the folder: <code>.mkdir()</code> means "make directory", another word for folder. <code>exist_ok=True</code> says: if it is already there, that is fine.',
          'Lines 6 and 7 are the short way to write a whole file. <code>.write_text(text)</code> opens the file with <code>"w"</code>, writes, and closes it, all in one go, like <code>with</code> in lesson 57. <code>.read_text()</code> opens, reads it all and closes. Line 10 counts the <code>"\\n"</code> at the line ends: one per line.',
          '<code>.glob("*.txt")</code> hands you every path on the shelf whose name ends in <code>.txt</code>. The <code>*</code> means "anything". Press <b>Run</b>. Look at the order: soup, chili, pudding. Not A to Z. <code>glob</code> hands them over in whatever order the computer keeps them, and that can differ between computers.',
          'So sort them. Change line 9 to <code>for recipe in sorted(shelf.glob("*.txt")):</code> and run it again: bean_chili, lentil_soup, rice_pudding. Then change <code>"*.txt"</code> to <code>"*"</code> and run it: the note joins the list.'
        ],
        tip: 'Paths sort by their text, A to Z, so <code>sorted()</code> works on them like on a list of words. Sort whenever you show files to a person or a check compares them.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'write_text is "w". mkdir likes to be asked nicely.',
        text: [
          '<code>.write_text()</code> always opens with <code>"w"</code>: a clean page (lesson 56). Press <b>Run</b> on <b>wipe.py</b>: only Tuesday is left. Monday was wiped by the second write.',
          'To add to a log, use <code>"a"</code> with <code>with</code>, and give <code>open</code> the Path. Replace line 5 with <code>with open(log, "a") as f:</code> and, pushed in by 4 spaces under it, <code>f.write("Tue: bean chili\\n")</code>. Run it: Monday and Tuesday.',
          'And <code>.mkdir()</code> on its own makes the folder the first time, and stops with <b>FileExistsError</b> the second time, because the folder is now there. Write <code>.mkdir(exist_ok=True)</code> in any script you will run more than once. For folders inside new folders, add <code>parents=True</code> too.'
        ],
        warn: 'Never type your own full path, like <code>/Users/ben/...</code> or <code>C:\\Users\\you\\...</code>, into a program you will share. Build it from <code>Path(__file__).parent</code>, and it travels with the script.'
      }
    ],
    exercises: [
      {
        file: 'l58_recipe_shelf.py', title: 'The recipe shelf',
        task: 'Kitchen Coach keeps its recipes in a dict. Make a folder <code>l58_recipes</code> <b>next to the script</b> with <code>Path(__file__).parent</code>, write each recipe into it as <code>&lt;name&gt;.txt</code> with <code>.write_text()</code>, then list the shelf with <code>sorted(shelf.glob("*.txt"))</code> and print each one like <code>bean_chili: 5 lines</code>. The check runs your lines <b>from another folder</b> on purpose, and twice, so <code>mkdir</code> must not crash the second time.',
        steps: [
          'Press <b>Open in VS Code</b>. Run the file once: it prints three "Not written yet" lines, and the check says there is no shelf yet.',
          'Between <code>START</code> and <code>END</code>, point <code>shelf</code> next to the script, make the folder with <code>exist_ok=True</code>, and write each recipe with <code>(shelf / f"{name}.txt").write_text(text)</code>.',
          'Then loop over the sorted shelf and print each stem with its line count. Run it until the check says <code>PASS</code>, and open the <code>l58_recipes</code> folder to see your notebooks.'
        ]
      }
    ],
    quiz: [
      {
        type: 'match', q: 'Take <code>recipe = Path("recipes/lentil_soup.txt")</code>. Match each part to what it gives.',
        pairs: [
          ['recipe.name', 'lentil_soup.txt'],
          ['recipe.stem', 'lentil_soup'],
          ['recipe.suffix', '.txt'],
          ['recipe.parent', 'recipes']
        ],
        why: '<code>.name</code> is the whole file name, <code>.stem</code> is the name without its ending, <code>.suffix</code> is the ending with its dot, and <code>.parent</code> is the folder it sits in.',
        hint: 'Stem is the name with its ending cut off. Parent is the folder.'
      },
      {
        type: 'pick', q: 'Ben is in his home folder, <code>/Users/ben</code>, and types <code>python3 kitchen/coach.py</code>. Inside, <code>coach.py</code> runs <code>open("pantry.txt")</code>. Where does Python look?',
        options: ['/Users/ben/pantry.txt', '/Users/ben/kitchen/pantry.txt', 'In every folder until it finds one', 'Next to the Python program itself'],
        answer: 0,
        why: 'A short name starts from the <b>current working directory</b>, the folder you run from: <code>/Users/ben</code>. Where the script lives does not matter. <code>Path(__file__).parent / "pantry.txt"</code> would look in <code>/Users/ben/kitchen</code>.',
        hint: 'A short name means "from where I am standing". Where is Ben standing?'
      },
      {
        type: 'fix', q: 'On Ben\'s Mac this cannot find the soup: the backslash is glued in as text. Build <code>path</code> with <code>Path</code> and <code>/</code> so it prints the recipe on every computer.',
        code: glued,
        title: 'glued.py', files: { 'recipes/lentil_soup.txt': SOUP },
        check: [
          'from pathlib import PurePath as _P',
          'if "red lentils, 200 g" not in out:',
          '    msg = "The recipe should be printed. It starts with: red lentils, 200 g"',
          'elif not isinstance(globals().get("path"), _P):',
          '    msg = "It printed, but path is still text. Build it with Path:  path = Path(folder) / \\"lentil_soup.txt\\"  and add  from pathlib import Path  at the top."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: '<code>from pathlib import Path</code> at the top, then <code>path = Path(folder) / "lentil_soup.txt"</code>. Python writes the right slash for the computer it runs on, and <code>open()</code> takes the Path as it is.',
        hint: 'Add <code>from pathlib import Path</code> as line 1. Then turn the folder into a Path and use <code>/</code> instead of <code>+ "\\\\" +</code>.'
      },
      {
        type: 'fill', q: 'Finish the setup line that finds <code>pantry.txt</code> <b>next to the script</b>, wherever it is run from.',
        text: 'from pathlib import Path\n\nHERE = Path(__file__).___\nNOTEBOOK = HERE ___ "pantry.txt"',
        options: ['parent', '/', 'cwd()', '+', 'name', 'stem'],
        answer: ['parent', '/'],
        why: '<code>Path(__file__)</code> is the script\'s own address, and <code>.parent</code> is the folder it lives in. <code>/</code> then adds the file name. <code>cwd()</code> would be the folder you run from, the very thing to avoid.',
        hint: 'You want the folder the script is in, then "and then into" the notebook.'
      },
      {
        type: 'fix', q: 'The <code>recipes</code> folder is already there, like on the second run. Python stops with <code>FileExistsError</code>. Fix it so it adds <code>curry.txt</code> and prints both recipes. (The red box also shows a line inside pathlib itself. Your line is the one in <b>shelf.py</b>.)',
        code: [
          'from pathlib import Path',
          '',
          'shelf = Path("recipes")',
          'shelf.mkdir()',
          '(shelf / "curry.txt").write_text("chickpeas, 400 g\\ncoconut milk, 400 ml\\n")',
          'print(sorted(shelf.glob("*.txt")))'
        ],
        title: 'shelf.py', files: { 'recipes/lentil_soup.txt': SOUP },
        check: [
          'from pathlib import Path as _P',
          'if not (_P("recipes") / "curry.txt").exists():',
          '    msg = "recipes/curry.txt is not there. Keep the write_text line."',
          'elif "curry.txt" not in out or "lentil_soup.txt" not in out:',
          '    msg = "Print both recipes on the shelf. Keep the last line."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: '<code>shelf.mkdir(exist_ok=True)</code>: make the folder if it is missing, and carry on if it is already there.',
        hint: 'One argument inside the brackets of <code>mkdir()</code> says "already there is fine".'
      },
      {
        type: 'pick', q: 'Back to lesson 57. Which one does the same as <code>text = Path("pantry.txt").read_text()</code>?',
        pic: code(['# A', 'with open("pantry.txt") as f:', '    text = f.read()', '# B', 'with open("pantry.txt", "w") as f:', '    text = f.read()', '# C', 'f = open("pantry.txt")', 'text = f.read()', '# D', 'text = open("pantry.txt")'], { title: 'four ways' }),
        options: ['A', 'B', 'C', 'D'],
        answer: 0,
        why: '<code>.read_text()</code> opens the notebook, reads all of it into one string, and closes it again, like a <code>with</code> block. C never closes the file. B opens with <code>"w"</code>, which wipes it, and D hands back the open file, not its text.',
        hint: 'Which one reads the text AND closes the notebook?'
      },
      {
        type: 'bucket', q: 'You will share Kitchen Coach with Ben. Which lines travel well, and which break on his computer?',
        buckets: ['Works on every computer', 'Breaks somewhere else'],
        items: [
          ['Path("recipes") / "soup.txt"', 0],
          ['Path(__file__).parent / "pantry.txt"', 0],
          ['"recipes" + "\\\\" + "soup.txt"', 1],
          ['open("C:\\\\Users\\\\you\\\\kitchen\\\\pantry.txt")', 1],
          ['open("/Users/ben/kitchen/pantry.txt")', 1],
          ['sorted(shelf.glob("*.txt"))', 0]
        ],
        why: 'Paths built with <code>Path</code> and <code>/</code> get the right slash everywhere, and <code>Path(__file__).parent</code> moves with the script. Glued backslashes only work on Windows, and a typed-in full path only fits one computer.',
        hint: 'Does the line name someone\'s own folders, or glue in one kind of slash?'
      },
      {
        type: 'pick', q: 'On your laptop the shelf prints soup, chili, pudding. On Ben\'s it prints chili, pudding, soup. Same files. What makes both print the same, A to Z?',
        pic: code(['for recipe in shelf.glob("*.txt"):', '    print(recipe.stem)'], { title: 'shelf.py' }),
        options: ['for recipe in sorted(shelf.glob("*.txt")):', 'for recipe in shelf.glob("*.txt").sort():', 'for recipe in shelf.glob("a-z"):', 'Nothing: Ben\'s computer is wrong'],
        answer: 0,
        why: '<code>glob</code> hands paths over in the order the computer keeps them, which is not fixed. <code>sorted()</code> from lesson 34 makes a new list, A to Z. <code>glob()</code> does not hand back a list, so <code>.sort()</code> does not work on it.',
        hint: 'Which tool from lesson 34 hands back a new, ordered list of anything you give it?'
      }
    ]
  });
})();
