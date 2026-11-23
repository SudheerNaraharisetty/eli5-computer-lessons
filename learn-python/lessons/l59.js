/* Lesson 59: Saving data as JSON (module 5). One file per lesson. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l59  Saving data as JSON
     ===================================================================== */

  // A glass jar with a dark lid and a value inside. v: the value text ('' for empty).
  const jar = (x, y, label, v, o) => {
    o = o || {};
    return `<rect x="${x + 8}" y="${y}" width="54" height="12" rx="4" fill="${P.ink}"/>` +
      `<rect x="${x}" y="${y + 10}" width="70" height="76" rx="12" fill="${o.fill || P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
      (v ? T(x + 35, y + 48, v, { s: 15, m: true, f: o.col || P.ink }) : '') +
      T(x + 35, y + 74, label, { s: 11, w: 700, f: P.ink2 });
  };
  // The freezer box: a JSON file on disk. rows: lines of JSON text.
  const freezer = (x, y, w, h, name, rows) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="#E3EEFB" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<path d="M${x} ${y + 34} v-20 a14 14 0 0 1 14 -14 h${w - 28} a14 14 0 0 1 14 14 v20 z" fill="${P.ink}"/>` +
    T(x + 14, y + 23, name, { s: 13, m: true, f: P.white, a: 'start' }) +
    rows.map((r, i) => T(x + 16, y + 58 + i * 20, r.replace(/^ +/, m => '\u00a0'.repeat(m.length)), { s: 12.5, m: true, a: 'start' })).join('');

  /* ---- The idea ---- */
  const ideaSvg = svg(600, 290, 'Today: Kitchen Coach holds the pantry in three jars, rice 900, oats 400, lentils 250. json.dump packs the dict into a freezer box called pantry.json, as JSON text with quotes and curly braces. The program ends. Tomorrow: json.load unpacks the box and the jars refill with the same real numbers.',
    T(95, 22, 'TODAY', { s: 13, f: P.accent }) + T(300, 22, 'ON DISK', { s: 13, f: P.ink2 }) + T(505, 22, 'TOMORROW', { s: 13, f: P.ok }) +
    jar(14, 40, 'rice', '900') + jar(94, 40, 'oats', '400') + jar(54, 140, 'lentils', '250') +
    T(95, 256, 'in memory: gone', { s: 12, w: 700, f: P.danger }) + T(95, 274, 'when the program ends', { s: 12, w: 700, f: P.danger }) +
    arrow(178, 120, 214, 120, P.accent, 3) + T(196, 108, 'dump', { s: 12, m: true, f: P.accent }) +
    freezer(220, 52, 162, 158, 'pantry.json', ['{', '  "rice": 900,', '  "oats": 400,', '  "lentils": 250', '}']) +
    T(301, 232, 'plain text,', { s: 12, w: 700, f: P.ink2 }) + T(301, 250, 'stays on the shelf', { s: 12, w: 700, f: P.ink2 }) +
    arrow(388, 120, 424, 120, P.ok, 3) + T(406, 108, 'load', { s: 12, m: true, f: P.ok }) +
    jar(424, 40, 'rice', '900', { fill: P.okT, col: P.ok }) + jar(504, 40, 'oats', '400', { fill: P.okT, col: P.ok }) + jar(464, 140, 'lentils', '250', { fill: P.okT, col: P.ok }) +
    T(505, 256, 'real numbers again,', { s: 12, w: 700, f: P.ok }) + T(505, 274, 'not "900"', { s: 12, w: 700, f: P.ok }));
  const byHand = [
    'pantry = {}',
    'with open("pantry.txt") as f:',
    '    for line in f:',
    '        name, grams = line.strip().split(",")',
    '        pantry[name] = int(grams)'
  ];
  const ideaPic = `<div style="width:100%;min-width:0">${ideaSvg}${code(byHand, { title: 'lesson 55: every line by hand', hi: [4, 5] })}</div>`;

  /* ---- The code: dumps and loads ---- */
  const first = [
    'import json',
    '',
    'pantry = {"rice": 900, "oats": 400, "lentils": 250}',
    '',
    'text = json.dumps(pantry, indent=2)',
    'print(text)',
    'print(type(text))',
    '',
    'back = json.loads(text)',
    'print(back["rice"] - 150, "g of rice after Ana\'s risotto")',
    'print(type(back["rice"]))'
  ];
  const sSvg = svg(600, 120, 'json.dumps turns the dict into one string of JSON text. json.loads turns that string back into a dict. The s at the end of both names stands for string.',
    box(16, 22, 150, 76, P.warnT, 12) + T(91, 54, 'dict', { s: 15 }) + T(91, 78, '{"rice": 900}', { s: 11.5, m: true, f: P.ink2 }) +
    arrow(172, 46, 422, 46, P.accent, 2.5) + T(297, 36, 'json.dumps(pantry)', { s: 13, m: true, f: P.accent }) +
    arrow(422, 78, 172, 78, P.ok, 2.5) + T(297, 100, 'json.loads(text)', { s: 13, m: true, f: P.ok }) +
    box(428, 22, 156, 76, '#E3EEFB', 12) + T(506, 54, 'str', { s: 15 }) + T(506, 78, '\'{"rice": 900}\'', { s: 11.5, m: true, f: P.ink2 }) +
    T(297, 118, 'the s at the end = string', { s: 12, w: 700, f: P.ink2 }));
  const codePic = `<div style="width:100%;min-width:0">${run(first, { title: 'pantry.py' })}${sSvg}</div>`;

  /* ---- The pain: str() is not a way back ---- */
  const strSave = [
    'from pathlib import Path',
    '',
    'guests = {',
    '    "Ana": {"kcal": 2600, "likes": ["pasta", "oats"]},',
    '    "Ben": {"kcal": 2800, "likes": ["tofu", "lentils"]},',
    '}',
    'Path("guests.txt").write_text(str(guests))',
    '',
    'text = Path("guests.txt").read_text()',
    'print(text)',
    'print(text["Ben"]["likes"])'
  ];
  const painPic = `<div style="width:100%;min-width:0">${run(strSave, { title: 'guests.py' })}</div>`;

  /* ---- The fix: dump and load, with a file ---- */
  const GUESTS = '{\n  "Ana": {\n    "kcal": 2600,\n    "likes": [\n      "pasta",\n      "oats"\n    ]\n  }\n}';
  const dumpLoad = [
    'import json',
    '',
    'guests = {',
    '    "Ana": {"kcal": 2600, "likes": ["pasta", "oats"]},',
    '    "Ben": {"kcal": 2800, "likes": ["tofu", "lentils"]},',
    '    "Chloe": {"kcal": 2000, "gluten_free": True, "likes": ["pudding"]},',
    '}',
    'with open("guests.json", "w") as f:',
    '    json.dump(guests, f, indent=2)',
    '',
    '# Tomorrow, the program starts again with nothing in memory:',
    'with open("guests.json") as f:',
    '    back = json.load(f)',
    '',
    'print(back["Ben"]["likes"][0])',
    'print(back["Chloe"]["gluten_free"])',
    'print(back == guests)'
  ];
  const withPath = [
    'import json',
    'from pathlib import Path',
    '',
    'path = Path("guests.json")',
    'print(path.read_text())',
    '',
    'back = json.loads(path.read_text())',
    'print(back["Ana"]["kcal"] + 300, "kcal on a long-run day")'
  ];
  const fourSvg = svg(600, 150, 'Four tools in a two by two grid. With a file: json.dump(obj, f) saves, json.load(f) brings back. With a string: json.dumps(obj) makes text, json.loads(text) reads text.',
    T(210, 22, 'save', { s: 13, f: P.accent }) + T(450, 22, 'bring back', { s: 13, f: P.ok }) +
    T(20, 62, 'a file f', { s: 13, w: 700, f: P.ink2, a: 'start' }) + T(20, 116, 'a string', { s: 13, w: 700, f: P.ink2, a: 'start' }) +
    box(110, 36, 210, 44, P.tint, 10) + T(215, 63, 'json.dump(obj, f)', { s: 13.5, m: true, f: P.accent }) +
    box(350, 36, 210, 44, P.okT, 10) + T(455, 63, 'json.load(f)', { s: 13.5, m: true, f: P.ok }) +
    box(110, 92, 210, 44, P.tint, 10) + T(215, 119, 'json.dumps(obj)', { s: 13.5, m: true, f: P.accent }) +
    box(350, 92, 210, 44, P.okT, 10) + T(455, 119, 'json.loads(text)', { s: 13.5, m: true, f: P.ok }));
  const fixPic = `<div style="width:100%;min-width:0">${run(dumpLoad, { title: 'guests.py' })}${fourSvg}${run(withPath, { title: 'with_path.py', files: { 'guests.json': GUESTS } })}</div>`;

  /* ---- Try it: Kitchen Coach remembers the pantry ---- */
  const PANTRY = '{\n  "rice": 900,\n  "oats": 400,\n  "lentils": 250\n}';
  const coach = [
    'import json',
    'from pathlib import Path',
    '',
    'path = Path("pantry.json")',
    'try:',
    '    pantry = json.loads(path.read_text())',
    '    print("Loaded:", pantry)',
    'except FileNotFoundError:',
    '    pantry = {"rice": 900, "oats": 400}',
    '    print("No pantry yet. Starting fresh.")',
    '',
    'pantry["rice"] -= 150                               # risotto for Ana',
    'pantry["quinoa"] = pantry.get("quinoa", 0) + 500    # bought for Ben',
    '',
    'path.write_text(json.dumps(pantry, indent=2))',
    'print(path.read_text())'
  ];

  /* ---- The catch: what changes on the way ---- */
  const surprises = [
    'import json',
    '',
    'plan = {',
    '    "run_km": (5, 8, 16),',
    '    1: "Mon",',
    '    "rest_day": None,',
    '    "carbs": True,',
    '}',
    'text = json.dumps(plan)',
    'print(text)',
    '',
    'back = json.loads(text)',
    'print(back)',
    'print(back.get(1), back.get("1"))'
  ];
  const setErr = [
    'import json',
    '',
    'chloe = {"name": "Chloe", "likes": {"pudding", "berries"}}',
    'try:',
    '    text = json.dumps(chloe)',
    '    print(text)',
    'except TypeError as err:',
    '    print("TypeError:", err)'
  ];
  const setTerm = term([
    '$ python3 chloe.py',
    'Traceback (most recent call last):',
    '  File "chloe.py", line 4, in <module>',
    '    text = json.dumps(chloe)',
    '  ... 4 more File lines, inside Python\'s own json code ...',
    'TypeError: Object of type set is not JSON serializable',
    "when serializing dict item 'likes'"
  ], 'terminal, Python 3.15, without try');
  const tableSvg = svg(600, 214, 'What survives a trip through JSON. Comes back the same: dict with text keys, list, str, int, float, True and False (written true and false), None (written null). Comes back changed: a tuple comes back as a list, a number key comes back as text. Cannot go in: a set raises TypeError.',
    box(14, 14, 280, 190, P.okT, 14) + T(154, 40, 'COMES BACK THE SAME', { s: 13, f: P.ok }) +
    [['dict, list', '{ } [ ]'], ['str', '"oats"'], ['int, float', '900  2.5'], ['True, False', 'true, false'], ['None', 'null']].map(([a, b], i) =>
      T(30, 72 + i * 28, a, { s: 13, w: 700, a: 'start' }) + T(278, 72 + i * 28, b, { s: 13, m: true, f: P.ok, a: 'end' })).join('') +
    box(306, 14, 280, 116, P.warnT, 14) + T(446, 40, 'COMES BACK CHANGED', { s: 13, f: P.warn }) +
    T(322, 72, '(5, 8, 16)', { s: 13, m: true, a: 'start' }) + T(570, 72, '→ [5, 8, 16]', { s: 13, m: true, f: P.warn, a: 'end' }) +
    T(322, 104, '{1: "Mon"}', { s: 13, m: true, a: 'start' }) + T(570, 104, '→ {"1": "Mon"}', { s: 13, m: true, f: P.warn, a: 'end' }) +
    box(306, 142, 280, 62, P.dangerT, 14) + T(446, 166, 'CANNOT GO IN', { s: 13, f: P.danger }) +
    T(446, 190, 'a set: TypeError', { s: 13, m: true, f: P.danger }));
  const catchPic = `<div style="width:100%;min-width:0">${tableSvg}${run(surprises, { title: 'plan.py' })}${run(setErr, { title: 'chloe.py' })}${setTerm}</div>`;

  COURSE.add({
    id: 'l59', minutes: 12,
    summary: '<b>JSON</b> saves dicts and lists as text, and brings them back <b>with their types</b>. <code>import json</code> opens Python\'s JSON tools. <code>json.dump(pantry, f, indent=2)</code> writes the dict into an open file, and <code>json.load(f)</code> reads it back as a dict, with <code>900</code> still a number. With a string instead of a file: <code>json.dumps(obj)</code> and <code>json.loads(text)</code> (the <b>s</b> is for <b>string</b>), handy with <code>path.write_text()</code> and <code>path.read_text()</code>. Nested data works too. On the first day there is no file yet, so catch <code>FileNotFoundError</code> and start fresh. Watch out: a tuple comes back as a <b>list</b>, a number key comes back as <b>text</b> (<code>1</code> becomes <code>"1"</code>), and a <b>set</b> cannot go in at all (<code>TypeError</code>), so save <code>sorted(the_set)</code>.',
    video: {
      src: 'videos/l59-saving-data-as-json.mp4', poster: 'videos/l59-saving-data-as-json.jpg', length: '1 min 8 s',
      script: [
        'Kitchen Coach keeps the pantry in jars. Rice, 900 grams. Oats, 400. But when the program ends, the lights go off, and the jars are empty.',
        'In lesson 55, you saved it as lines of text, and split and converted every number back by hand. And Ben\'s guest card, a list inside a dict, does not fit on a line at all.',
        'So, import json. json.dump packs the whole dict into a freezer box, as text. Quotes, braces, the same shape.',
        'Lights off. Next morning, json.load unpacks it. The jars refill, and 900 is a real number again, not text.',
        'Two surprises. A set bounces off the box. TypeError. Object of type set is not JSON serializable. Save a sorted list instead. And the number key 1 comes back as text, in quotes.',
        'json.dump to save. json.load to bring it back. Dicts and lists, ready for tomorrow.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Freeze the whole dict, and thaw it tomorrow.',
        text: [
          'Kitchen Coach keeps the pantry in a dict: <code>{"rice": 900, "oats": 400, "lentils": 250}</code>. Those are jars in its <b>memory</b>. When the program ends, the memory is wiped and the jars are empty.',
          'In lesson 55 you saved the pantry as lines like <code>rice,900</code>. Reading it back took work: <code>strip()</code>, <code>split(",")</code>, and <code>int()</code> on every number, because <b>a file is only text</b>. And the guest book from lesson 41, a dict of dicts with a list of likes inside, does not fit on one line at all.',
          '<b>JSON</b> is a way to write dicts and lists <b>as text</b>, with quotes, curly braces and square brackets, so they keep their shape. Think of a labelled freezer box: <code>json.dump</code> packs the whole dict in, the box waits on the shelf overnight, and <code>json.load</code> unpacks it tomorrow, with <code>900</code> still a <b>number</b>.'
        ],
        tip: 'JSON stands for JavaScript Object Notation. You say it "jay-son". It started on the web, but now almost every language reads it, so other programs can open your pantry too.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'json.dumps makes the text. json.loads reads it back.',
        text: [
          '<code>import json</code> on line 1 opens Python\'s JSON tools, a cookbook that comes with Python. After it, the tools are called <code>json.</code> and a name. Lesson 60, Modules and import, tells the full story.',
          '<code>json.dumps(pantry, indent=2)</code> turns the dict into <b>one string</b> of JSON text. <code>indent=2</code> puts each item on its own line, pushed in by 2 spaces, so a person can read it. Press <b>Run</b>: the text looks almost like your dict, but <code>type(text)</code> says <code>&lt;class \'str\'&gt;</code>.',
          '<code>json.loads(text)</code> goes the other way: text in, dict out. <code>back["rice"] - 150</code> is <code>750</code>, real maths, because <code>back["rice"]</code> is the <b>int</b> <code>900</code>, not the text <code>"900"</code>.',
          'Now add <code>"quinoa": 500</code> to the pantry on line 3 and run it again. Then remove <code>, indent=2</code> on line 5: the whole pantry lands on one line. Same data, harder to read.'
        ],
        tip: 'The <b>s</b> at the end of <code>dumps</code> and <code>loads</code> stands for <b>string</b>. No s means a file, as in the next parts.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'str() writes it down, but nothing reads it back.',
        text: [
          '<code>write_text()</code> needs a string, so the first idea is <code>str(guests)</code>. Press <b>Run</b>. The file looks fine when you print it: every guest, every like, all in there.',
          'Then line 11 stops with <code>TypeError: string indices must be integers, not \'str\'</code>. <code>read_text()</code> handed back <b>text</b>, not a dict. <code>text["Ben"]</code> asks a string for the item called "Ben", and a string only has items numbered 0, 1, 2 (lesson 32).',
          'Turning that text back into a dict by hand means cutting at every brace, comma and colon, and guessing which pieces are numbers. That is the lesson 55 job again, only much harder.'
        ],
        warn: 'A file never remembers types. Whatever you write is just characters. The question is only whether something can read them back into a dict for you.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'json.dump to save, json.load to bring it back.',
        text: [
          '<b>guests.py</b> saves the guest book with <code>json.dump(guests, f, indent=2)</code>, inside <code>with open("guests.json", "w") as f:</code> from lesson 57. The dict goes first, the file second. Then it opens the file for reading and <code>json.load(f)</code> hands back a <b>dict</b>.',
          'Press <b>Run</b>. <code>back["Ben"]["likes"][0]</code> is <code>tofu</code>: lists inside dicts survive the trip. <code>True</code> comes back as <code>True</code>, and <code>back == guests</code> is <code>True</code>: the same pantry of guests, ready tomorrow.',
          '<b>with_path.py</b> does the reading with a <code>Path</code> from lesson 58. <code>guests.json</code> is already in the box. <code>path.read_text()</code> gives the JSON text, and <code>json.loads()</code> turns it into a dict. To save that way: <code>path.write_text(json.dumps(guests, indent=2))</code>. Both ways make the same file. Pick one and stay with it.'
        ],
        tip: 'JSON files end in <code>.json</code>. Open one in VS Code and you see plain text with colours: you can read it, and even fix a number by hand.'
      },
      {
        label: 'Try it', pic: run(coach, { title: 'kitchen_coach.py', files: { 'pantry.json': PANTRY } }),
        h: 'Kitchen Coach remembers the pantry.',
        text: [
          'This is the shape every "remember it" program has: <b>load</b>, change, <b>save</b>. <code>pantry.json</code> is already in the box, saved yesterday. Press <b>Run</b>: it loads the pantry, uses 150 g of rice, adds quinoa, and saves it again.',
          'On the <b>very first day</b> there is no file yet, and <code>read_text()</code> raises <code>FileNotFoundError</code>. The <code>try</code> and <code>except</code> from lesson 53 catch it and start with a fresh pantry. Change <code>"pantry.json"</code> on line 4 to <code>"pantry2.json"</code> and run it again to see the first day.',
          'Every Run here starts in a fresh folder, so the box always starts from yesterday\'s file. On your own computer the file stays, and each run starts from what the last one saved. The exercise below shows that.'
        ],
        tip: '<code>if path.exists():</code> from lesson 58 also works for the first day. <code>try</code> and <code>except FileNotFoundError</code> is the safer habit: it also covers a file that disappears between the check and the read.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Tuples, number keys and sets do not come back the same.',
        text: [
          'JSON knows only a few kinds of things: objects (dicts with text keys), arrays (lists), text, numbers, <code>true</code>, <code>false</code> and <code>null</code>. Python\'s <code>True</code>, <code>False</code> and <code>None</code> are written in small letters, and come back as themselves.',
          '<b>plan.py</b>: press <b>Run</b>. The tuple <code>(5, 8, 16)</code> comes back as the <b>list</b> <code>[5, 8, 16]</code>. The key <code>1</code> comes back as the <b>text</b> <code>"1"</code>, so <code>back.get(1)</code> is <code>None</code> and <code>back.get("1")</code> is <code>Mon</code>. JSON keys are always text. Surprise.',
          '<b>chloe.py</b>: a set from lesson 39 cannot go in at all. Press <b>Run</b>: <code>TypeError: Object of type set is not JSON serializable</code>. "Serializable" means "can be written out as text". The box catches the error with <code>except TypeError as err:</code> (lesson 53) to keep it short. Without the <code>try</code>, the terminal shows the full traceback below it, which also walks through Python\'s own json code, and ends with a line saying where: <code>when serializing dict item \'likes\'</code>.',
          'Fix it: add <code>chloe["likes"] = sorted(chloe["likes"])</code> as a new line 4, above <code>try:</code>, and run it again. <code>sorted()</code> hands back a <b>list</b> (lesson 34), in a fixed order: <code>["berries", "pudding"]</code>. When you load it back, <code>set(...)</code> turns it into a set again.'
        ],
        warn: 'Keep the data you save simple: dicts with text keys, lists, text, numbers, True, False and None. Anything else, change it into one of those before you save it.'
      }
    ],
    exercises: [
      {
        file: 'l59_save_the_pantry.py', title: 'Save the pantry',
        task: 'Give Kitchen Coach a memory. Write <code>load_pantry(path)</code>: read the JSON file at <code>path</code>, or hand back <code>{"rice": 900, "oats": 400, "lentils": 250}</code> on the first day, when there is no file yet. Write <code>save_pantry(path, pantry)</code>: save the dict as JSON with <code>indent=2</code>. The orders at the bottom use some rice, add quinoa, and save.',
        steps: [
          'Press <b>Open in VS Code</b>. Run the file once: the check says nothing was saved.',
          'Between <code>START</code> and <code>END</code>, write both cards. Use <code>with open(path) as f:</code> and <code>json.load(f)</code> inside <code>try</code>, and <code>except FileNotFoundError:</code> for the first day. Then <code>with open(path, "w") as f:</code> and <code>json.dump(pantry, f, indent=2)</code>.',
          'Run it <b>twice</b>. The second run starts from what the first one saved: rice 750, then 600. Open <code>pantry.json</code> next to the exercise to see the file. The check says <code>PASS</code> or gives you one hint.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['import json', 'print(json.dumps({"ok": True, "note": None}))'], { title: 'flags.py' }),
        options: ['{"ok": true, "note": null}', '{"ok": True, "note": None}', "{'ok': True, 'note': None}", 'TypeError: True cannot be saved'],
        answer: 0,
        why: 'JSON writes <code>True</code> as <code>true</code> and <code>None</code> as <code>null</code>, and always uses double quotes. <code>json.loads</code> turns them back into <code>True</code> and <code>None</code>.',
        hint: 'JSON has its own small-letter words for True and None.'
      },
      {
        type: 'match', q: 'Match each tool to what it does.',
        pairs: [
          ['json.dump(obj, f)', 'writes obj into an open file'],
          ['json.load(f)', 'reads an open file, hands back a dict or list'],
          ['json.dumps(obj)', 'hands back obj as a string of JSON'],
          ['json.loads(text)', 'turns a string of JSON into a dict or list']
        ],
        why: 'No s: a file. With s: a string. dump and dumps save, load and loads bring back.',
        hint: 'The s at the end stands for string.'
      },
      {
        type: 'pick', q: 'What happens on the last line?',
        pic: code(['import json', 'days = json.loads(json.dumps({1: "Mon", 2: "Tue"}))', 'print(days[1])'], { title: 'days.py' }),
        options: ['KeyError: 1', 'Mon', 'Tue', '"Mon", with the quotes'],
        answer: 0,
        why: 'JSON keys are always text. After the trip, the dict is <code>{"1": "Mon", "2": "Tue"}</code>. There is no key <code>1</code>, only <code>"1"</code>, so <code>days[1]</code> stops with a KeyError. <code>days["1"]</code> works.',
        hint: 'What happens to a number key on its way through JSON?'
      },
      {
        type: 'bucket', q: 'You save this with <code>json.dump</code> and load it back. What happens?',
        buckets: ['Comes back the same', 'Changes or fails'],
        items: [
          ['{"rice": 900}', 0],
          ['["pasta", "oats"]', 0],
          ['2.5', 0],
          ['None', 0],
          ['(5, 8, 16)', 1],
          ['{1: "Mon"}', 1],
          ['{"tofu", "lentils"}', 1]
        ],
        why: 'Dicts with text keys, lists, numbers, text, True, False and None all survive. A tuple comes back as a list, a number key as text, and a set raises TypeError.',
        hint: 'Look at the brackets. Round ones and curly ones without colons are the troublemakers.'
      },
      {
        type: 'fix', q: 'Chloe\'s likes are a set, so <code>json.dump</code> stops with <code>TypeError: Object of type set is not JSON serializable</code>. Fix it so <code>chloe.json</code> holds her likes as a <b>sorted list</b>: <code>["berries", "pudding"]</code>.',
        code: ['import json', '', 'chloe = {"name": "Chloe", "likes": {"pudding", "berries"}}', 'with open("chloe.json", "w") as f:', '    json.dump(chloe, f)'],
        title: 'chloe.py',
        check: [
          'import json as _json',
          'try:',
          '    with open("chloe.json") as _f:',
          '        _back = _json.load(_f)',
          'except FileNotFoundError:',
          '    _back = None',
          'except ValueError:',
          '    _back = "bad"',
          'if _back is None:',
          '    msg = "There is no chloe.json. Keep the file name and the with line."',
          'elif _back == "bad":',
          '    msg = "chloe.json is not complete JSON. Make the likes a list before json.dump runs."',
          'elif _back == {"name": "Chloe", "likes": ["berries", "pudding"]}:',
          '    ok = True',
          'elif isinstance(_back, dict) and sorted(_back.get("likes") or []) == ["berries", "pudding"]:',
          '    msg = "Close. Use sorted(), so the list is always in the same order: berries, then pudding."',
          'else:',
          '    msg = "chloe.json holds " + _json.dumps(_back) + ". It should hold Chloe\'s name and her likes as a sorted list."'
        ].join('\n'),
        why: 'Add <code>chloe["likes"] = sorted(chloe["likes"])</code> before the <code>with</code>, or write <code>"likes": sorted({"pudding", "berries"})</code>. <code>sorted()</code> hands back a list, and a list can go into JSON.',
        hint: 'Which Python tool turns a set into a list, in order?'
      },
      {
        type: 'fix', q: 'It is Kitchen Coach\'s first day, so there is no <code>pantry.json</code> yet and line 2 stops with <code>FileNotFoundError</code>. Catch it and start with an empty pantry <code>{}</code>, so the program prints <code>0 items</code>.',
        code: ['import json', 'with open("pantry.json") as f:', '    pantry = json.load(f)', '', 'print(len(pantry), "items")'],
        title: 'first_day.py',
        check: [
          'g = globals()',
          'if g.get("pantry") != {}:',
          '    msg = "Under  except FileNotFoundError:  write  pantry = {}"',
          'elif out.strip() != "0 items":',
          '    msg = "The program should print exactly: 0 items. It printed: " + out.strip()',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: 'Put the <code>with</code> block inside <code>try:</code>, then <code>except FileNotFoundError:</code> and <code>pantry = {}</code> under it. The last line still runs, and prints <code>0 items</code>. Tomorrow, when the file exists, the <code>try</code> part loads it.',
        hint: 'Write <code>try:</code> above line 2 and push lines 2 and 3 in by 4 spaces. Then add <code>except FileNotFoundError:</code> and <code>    pantry = {}</code>.'
      },
      {
        type: 'pick', q: 'Back to lesson 55. You read the line <code>rice,900</code> from <code>pantry.txt</code> and run <code>name, grams = line.strip().split(",")</code>. What is <code>grams</code>?',
        options: ['The text "900", so you still need int(grams)', 'The number 900', 'A list: ["rice", "900"]', 'The whole line "rice,900"'],
        answer: 0,
        why: '<code>split</code> cuts text into text. <code>grams</code> is <code>"900"</code>, and <code>int()</code> makes it a number. With JSON, <code>json.load</code> does that for you: <code>900</code> comes back as an int.',
        hint: 'A file is only text. What does split hand back?'
      },
      {
        type: 'type', q: 'The file is open as <code>f</code>. Type the line that reads the JSON in it into a dict called <code>pantry</code>.',
        prompt: '>>>',
        answers: ['pantry = json.load(f)', 'pantry=json.load(f)'],
        why: '<code>pantry = json.load(f)</code>. No s, because it reads from a file, not a string.',
        hint: 'json, a dot, the tool that brings it back, and the file in brackets.'
      }
    ]
  });
})();
