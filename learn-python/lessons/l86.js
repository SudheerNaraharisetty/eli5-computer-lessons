/* Lesson 86: Template strings (module 7). One file per lesson.
   Output checked with Python 3.15.2 (Homebrew, macOS) and Python 3.14 on 2026-11-23.
   The Run boxes were also checked in this page (Pyodide, Python 3.14). */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l86  Template strings
     ===================================================================== */

  // A small chip: grey for fixed text, coloured for a value.
  const chip = (x, y, w, s, kind) => {
    const fill = kind === 'val' ? P.tint : kind === 'ok' ? P.okT : P.sand;
    const col = kind === 'val' ? P.accent : kind === 'ok' ? P.ok : P.ink2;
    return `<rect x="${x}" y="${y}" width="${w}" height="30" rx="8" fill="${fill}" stroke="${col}" stroke-width="2"/>` +
      T(x + w / 2, y + 20, s, { s: 12.5, m: true, f: col });
  };
  // A browser window with a menu card. rows: [text, bold?, mono?]
  const browser = (x, y, w, rows, title) => {
    let s = box(x, y, w, 46 + rows.length * 34 + 16, P.white, 14) +
      `<path d="M${x} ${y + 34} h${w}" stroke="${P.ink}" stroke-width="2"/>` +
      [0, 1, 2].map(k => `<circle cx="${x + 18 + k * 16}" cy="${y + 17}" r="5" fill="${[P.danger, P.warn, P.ok][k]}"/>`).join('') +
      T(x + 72, y + 22, title, { s: 12, w: 700, f: P.ink2, a: 'start', m: true });
    rows.forEach((r, i) => {
      const yy = y + 66 + i * 34;
      s += `<circle cx="${x + 24}" cy="${yy - 5}" r="4" fill="${P.ink}"/>` +
        T(x + 38, yy, r[0], { s: r[1] ? 15.5 : 14, w: r[1] ? 800 : 500, a: 'start', m: !!r[2], f: r[1] ? P.ink : P.ink2 });
    });
    return s;
  };

  /* ---- The idea: an f-string makes text now, a t-string keeps the blanks apart ---- */
  const ideaPic = svg(600, 300, 'Top: f"{guest}: {dish}" turns straight into one finished piece of text, "Ben: bean chili", a str. Bottom: t"{guest}: {dish}" turns into a Template with two trays kept apart: the fixed text parts in grey, and the values Ben and bean chili as coloured chips. A function decides how to put them together.',
    T(16, 30, 'f-string', { s: 13, a: 'start', f: P.ink2 }) +
    box(16, 42, 190, 40, '#15132B', 10) + T(111, 68, 'f"{guest}: {dish}"', { s: 13, m: true, f: '#ECEAFF' }) +
    arrow(214, 62, 266, 62, P.ink2, 2.5) +
    box(276, 42, 200, 40, P.white, 10) + T(376, 68, 'Ben: bean chili', { s: 14, m: true }) +
    T(490, 60, 'a str,', { s: 12.5, w: 700, f: P.ink2, a: 'start' }) + T(490, 76, 'made now', { s: 12.5, w: 700, f: P.ink2, a: 'start' }) +
    `<line x1="16" y1="104" x2="584" y2="104" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    T(16, 134, 't-string', { s: 13, a: 'start', f: P.accent }) +
    box(16, 146, 190, 40, '#15132B', 10) + T(111, 172, 't"{guest}: {dish}"', { s: 13, m: true, f: '#ECEAFF' }) +
    arrow(214, 166, 262, 166, P.accent, 2.5) +
    box(270, 120, 314, 166, P.paper2, 14) +
    T(286, 144, 'Template', { s: 13, a: 'start', f: P.accent }) +
    T(286, 172, '.strings', { s: 12, w: 700, a: 'start', m: true, f: P.ink2 }) +
    chip(370, 156, 44, "''", 'txt') + chip(422, 156, 60, "': '", 'txt') + chip(490, 156, 44, "''", 'txt') +
    T(286, 218, '.values', { s: 12, w: 700, a: 'start', m: true, f: P.ink2 }) +
    chip(370, 202, 64, "'Ben'", 'val') + chip(442, 202, 128, "'bean chili'", 'val') +
    T(427, 270, 'kept apart, not joined yet', { s: 12.5, w: 700, f: P.ink2 }));

  const cardBox = [
    'guest = "Ben"',
    'dish = "bean chili"',
    '',
    'text = f"{guest}: {dish}"',
    'card = t"{guest}: {dish}"',
    '',
    'print(type(text))',
    'print(type(card))',
    'print(text)',
    'print(card.strings)',
    'print(card.values)'
  ];
  const ideaAll = `<div style="width:100%;min-width:0">${ideaPic}${run(cardBox, { title: 'card.py' })}</div>`;

  /* ---- The code: walk through the parts ---- */
  const partsBox = [
    'from string.templatelib import Interpolation',
    '',
    'guest = "Ana"',
    'km = 21.1',
    'card = t"{guest} runs {km:.1f} km on Sunday"',
    '',
    'for part in card:',
    '    if isinstance(part, Interpolation):',
    '        print("value:", part.value, "  from:", part.expression)',
    '    else:',
    '        print("text: ", f"[{part}]")',
    '',
    'km_blank = card.interpolations[1]',
    'print("look: ", km_blank.format_spec)'
  ];

  /* ---- The pain: f-string glues the note straight into the page ---- */
  const NOTES = [
    'notes = {',
    '    "Ana": "pasta, no onions",',
    '    "Ben": "<b>extra cheese",',
    '    "Chloe": "gluten-free brownie",',
    '}'
  ];
  const painBox = [...NOTES, '',
    'lines = ["<ul>"]',
    'for name, note in notes.items():',
    '    lines.append(f"<li>{name}: {note}</li>")',
    'lines.append("</ul>")',
    'print("\\n".join(lines))'
  ];
  const painSvg = svg(600, 210, 'The menu card in the browser. Ana\'s line is normal. From Ben\'s line on, everything is bold: the browser read Ben\'s note as a bold tag, so Chloe\'s line is bold too. A WRONG stamp.',
    browser(16, 14, 390, [['Ana: pasta, no onions', false], ['Ben: extra cheese', true], ['Chloe: gluten-free brownie', true]], 'menu.html') +
    box(426, 26, 158, 58, P.warnT, 12) + T(505, 50, 'Ben typed', { s: 12, w: 700, f: P.ink2 }) + T(505, 72, '<b>extra cheese', { s: 12.5, m: true, f: P.warn }) +
    arrow(440, 92, 330, 116, P.warn, 2.5) +
    box(434, 136, 140, 44, P.dangerT, 12) + T(504, 164, 'WRONG', { s: 17, f: P.danger }) +
    T(211, 200, 'from Ben down, the whole card is bold', { s: 12.5, w: 700, f: P.danger }));
  const painPic = `<div style="width:100%;min-width:0">${run(painBox, { title: 'menu_card.py' })}${painSvg}</div>`;

  /* ---- The fix: a t-string and a small safe_html function ---- */
  const SAFE = [
    'from html import escape',
    'from string.templatelib import Interpolation',
    '',
    'def safe_html(template):',
    '    pieces = []',
    '    for part in template:',
    '        if isinstance(part, Interpolation):',
    '            part = escape(str(part.value))',
    '        pieces.append(part)',
    '    return "".join(pieces)'
  ];
  const fixBox = [...SAFE, '', ...NOTES,
    'for name, note in notes.items():',
    '    print(safe_html(t"<li>{name}: {note}</li>"))'
  ];
  const fixSvg = svg(600, 218, 'The same menu card after the fix. No line is bold. Ben\'s line shows his note as plain characters, angle brackets and all. A green check.',
    browser(16, 14, 430, [['Ana: pasta, no onions', false], ['Ben: <b>extra cheese', false, true], ['Chloe: gluten-free brownie', false]], 'menu.html') +
    box(466, 40, 118, 44, P.okT, 12) + T(525, 68, 'safe', { s: 17, f: P.ok }) +
    T(525, 120, 'the tag is just', { s: 12, w: 700, f: P.ink2 }) + T(525, 138, 'characters now', { s: 12, w: 700, f: P.ink2 }) +
    T(231, 208, 'fixed text untouched, only the values escaped', { s: 12.5, w: 700, f: P.ok }));
  const fixPic = `<div style="width:100%;min-width:0">${run(fixBox, { title: 'safe_menu.py' })}${fixSvg}</div>`;

  /* ---- Try it: keep the look, escape the value ---- */
  const tryBox = [
    'from html import escape',
    'from string.templatelib import Interpolation',
    '',
    'def safe_html(template):',
    '    pieces = []',
    '    for part in template:',
    '        if isinstance(part, Interpolation):',
    '            value = format(part.value, part.format_spec)',
    '            part = escape(value)',
    '        pieces.append(part)',
    '    return "".join(pieces)',
    '',
    'dish = "Mac & cheese"',
    'price = 6.5',
    'print(safe_html(t"<p>{dish}: ${price:.2f}</p>"))'
  ];

  /* ---- The catch: a t-string is not text ---- */
  const catchBox = [
    'servings = 4',
    'card = t"Serves {servings}"',
    '',
    'print(card)',
    'print(str(card))',
    'print(card + " guests")'
  ];
  const oldTerm = term([
    '$ python3 --version',
    'Python 3.9.6',
    '$ python3 card.py',
    '  File "/Users/ana/kitchen/card.py", line 2',
    '    card = t"Serves {servings}"',
    '            ^',
    'SyntaxError: invalid syntax'
  ], 'an older Python does not know t-strings');
  const catchPic = `<div style="width:100%;min-width:0">${run(catchBox, { title: 'not_text.py' })}${oldTerm}</div>`;

  COURSE.add({
    id: 'l86', minutes: 13,
    summary: 'An f-string fills its blanks <b>right away</b> and gives you finished text. That is a problem when the values come from other people: on a web page, a guest\'s note <code>&lt;b&gt;extra cheese</code> is glued straight into the HTML, and the browser obeys it. A <b>t-string</b>, new in Python 3.14, looks the same with a <code>t</code> in front: <code>t"&lt;li&gt;{name}: {note}&lt;/li&gt;"</code>. But it does <b>not</b> make a str. It makes a <code>Template</code> (from <code>string.templatelib</code>) that keeps the <b>fixed text</b> (<code>.strings</code>) and the <b>filled-in values</b> (<code>.values</code>, or <code>Interpolation</code> objects with <code>.value</code>, <code>.expression</code>, <code>.conversion</code> and <code>.format_spec</code>) <b>apart</b>. Loop over it and you get both, in order. Then a function decides how to join them: <code>safe_html</code> escapes only the values with <code>html.escape</code>, so the note shows as plain text. The catch: a Template is not text. <code>print(card)</code> shows <code>Template(...)</code>, <code>card + " guests"</code> is a <code>TypeError</code>, and you always pass it to a function that renders it. For everyday printing, keep using f-strings.',
    video: {
      src: 'videos/l86-template-strings.mp4', poster: 'videos/l86-template-strings.jpg', length: '1 min 9 s',
      script: [
        "Kitchen Coach prints tonight's menu as a small web page. Guests type their own notes. Ana wants pasta. Ben types a bold tag, and then, extra cheese.",
        "The code builds each line with an f-string. It glues the note straight into the page, so the browser reads Ben's tag as an instruction. Everything after it turns bold. The card is broken. And a sneakier guest could slip in a script.",
        "Change one letter. The f becomes a t. Now you get a template, not text. It keeps two trays apart. The fixed text stays in one tray. The guest's values go in the other.",
        "A small function, safe HTML, walks through the template. It leaves the fixed text alone, escapes each value, so the tag turns into harmless characters, and joins the pieces.",
        "Now the card shows Ben's note as plain text. Nothing turns bold.",
        "An f-string makes text now. A t-string keeps the blanks apart, so a function can fill them safely."
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaAll,
        h: 'Keep the blanks apart.',
        text: [
          'Since lesson 15 you fill blanks with an <b>f-string</b>: <code>f"{guest}: {dish}"</code>. Python fills every blank <b>right away</b> and hands you one finished piece of text, a <code>str</code>. Nobody can tell any more which part you wrote and which part came from a jar.',
          'A <b>t-string</b> (t for template) looks exactly the same, with a <code>t</code> in front: <code>t"{guest}: {dish}"</code>. It is <b>new in Python 3.14</b>. It does <b>not</b> make a str. It makes a <code>Template</code>: two trays, kept apart. One tray holds the <b>fixed text</b> you wrote. The other holds the <b>values</b> that go in the blanks.',
          'Press <b>Run</b>. <code>type(card)</code> says <code>string.templatelib.Template</code>. <code>card.strings</code> is the fixed text: <code>(\'\', \': \', \'\')</code>. There is a piece before, between and after the blanks, even when it is empty. <code>card.values</code> is <code>(\'Ben\', \'bean chili\')</code>. Nothing has been glued together yet.'
        ],
        tip: 'Why keep them apart? Because then a <b>function</b> can decide how to put them together, and it can treat your text and your guests\' text differently. That is the whole point of this lesson.'
      },
      {
        label: 'The code', pic: run(partsBox, { title: 'parts.py' }),
        h: 'Loop over a template.',
        text: [
          'A Template is <b>iterable</b> (lesson 82): loop over it and you get every part <b>in order</b>. Fixed text comes out as a plain <code>str</code>. Each blank comes out as an <code>Interpolation</code>, a small object from the <code>string.templatelib</code> module that holds everything about that blank. Empty text pieces are skipped.',
          '<code>isinstance(part, Interpolation)</code> (lesson 70) asks "is this a blank?". A blank knows its <code>.value</code> (<code>21.1</code>), its <code>.expression</code>, the code you wrote in the braces (<code>"km"</code>), and its <code>.format_spec</code>, the look after the colon (<code>".1f"</code>, lesson 15). There is also <code>.conversion</code>, for <code>!r</code> or <code>!s</code> in the braces, and it is <code>None</code> here.',
          'Press <b>Run</b>. Look at <code>value: 21.1</code>: the look <code>.1f</code> was <b>not</b> applied. A t-string only remembers it. Whoever joins the parts decides whether to use it. Now change <code>km</code> to <code>21.0975</code> (a half-marathon, Ana\'s race) and run it again. The value is the raw number, and the look is still <code>.1f</code>.'
        ],
        tip: '<code>card.interpolations</code> is a tuple of every blank, so <code>card.interpolations[1]</code> is the second one, the km blank.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'One note turns the whole card bold.',
        text: [
          'Kitchen Coach prints tonight\'s menu card as a small <b>web page</b>. A web page is HTML: text with <b>tags</b> in angle brackets. <code>&lt;li&gt;</code> starts a line of a list, <code>&lt;b&gt;</code> means "bold from here", and the browser obeys every tag it sees. Each guest types their own note.',
          'Ben types <code>&lt;b&gt;extra cheese</code>. The f-string glues his note <b>straight into the page</b>. Press <b>Run</b>: his line now reads <code>&lt;li&gt;Ben: &lt;b&gt;extra cheese&lt;/li&gt;</code>. The browser does not show <code>&lt;b&gt;</code>. It <b>obeys</b> it. Nothing ever says "stop bold", so Ben\'s line and everything after it turns bold.',
          'Bold is the friendly version. A note like <code>&lt;/ul&gt;&lt;h1&gt;FREE DESSERT&lt;/h1&gt;</code> rewrites your menu, and a guest called <code>Chloe &lt;script&gt;</code> could run her own code in every visitor\'s browser. This is called <b>injection</b>: text from a guest sneaks into the instructions.'
        ],
        warn: 'The f-string did nothing wrong. It did exactly what it always does: it glued the text in. The problem is that once the text is glued, nobody can tell <b>your</b> tags from <b>the guest\'s</b> tags.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'A t-string and a safe_html function.',
        text: [
          'Change one letter: <code>f"&lt;li&gt;..."</code> becomes <code>t"&lt;li&gt;..."</code>. Now <code>safe_html</code> gets the two trays and walks through them. The <b>fixed text</b> is yours, so it goes in as it is: <code>&lt;li&gt;</code> stays a real tag. Each <b>value</b> came from a guest, so it goes through <code>escape</code> first. Then <code>"".join(pieces)</code> (lesson 31) glues the pieces into one str.',
          '<code>escape</code> comes from <code>html</code>, a standard module (lesson 61). It swaps the characters that HTML treats as special for safe codes: <code>&lt;</code> becomes <code>&amp;lt;</code>, <code>&gt;</code> becomes <code>&amp;gt;</code>, <code>&amp;</code> becomes <code>&amp;amp;</code>, and quote marks too. The browser shows those codes as the plain characters, and never reads them as a tag. <code>str()</code> comes first because <code>escape</code> only takes text.',
          'Press <b>Run</b>. Ben\'s line is <code>&lt;li&gt;Ben: &amp;lt;b&amp;gt;extra cheese&lt;/li&gt;</code>. In the browser that shows <b>Ben: &lt;b&gt;extra cheese</b>, as plain text. Nothing turns bold. Now change Chloe\'s note to <code>&lt;/ul&gt;&lt;h1&gt;FREE DESSERT&lt;/h1&gt;</code> and run it. Every bracket is escaped. Your <code>&lt;li&gt;</code> tags are not.'
        ],
        tip: 'This is what t-strings are for. Libraries for <b>HTML</b>, <b>SQL</b> (talking to a database) and <b>logging</b> can accept a t-string and do the escaping for you, the right way for their language. You write <code>t"..."</code>, they keep it safe.'
      },
      {
        label: 'Try it', pic: run(tryBox, { title: 'price_card.py' }),
        h: 'Keep the look, escape the value.',
        text: [
          'Chloe\'s dessert card shows a price. <code>{price:.2f}</code> should show <code>6.50</code>, but a t-string only <b>remembers</b> the look. So this <code>safe_html</code> uses it: <code>format(part.value, part.format_spec)</code> does exactly what the colon does in an f-string, and gives back text. Then <code>escape</code> makes that text safe.',
          'Press <b>Run</b>: <code>&lt;p&gt;Mac &amp;amp; cheese: $6.50&lt;/p&gt;</code>. The <code>&amp;</code> in the dish name is escaped too, and a browser shows it as a plain <code>&amp;</code>.',
          'Now change it. First change <code>{price:.2f}</code> to <code>{price}</code> and run: the price shows <code>6.5</code>. Then put it back and change the dish to <code>"&lt;i&gt;Mac&lt;/i&gt; &amp; cheese"</code>. Before you run it, say what the output will be.'
        ],
        tip: 'Same template, different function, different result. You could write a <code>shout(template)</code> that makes only the values upper-case, or one for a shopping-list file that removes line breaks from notes. The template does not care. The function decides.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'A t-string is not text.',
        text: [
          '<b>You must render it.</b> A Template is a box of parts, not words. Press <b>Run</b>: <code>print(card)</code> does not show <code>Serves 4</code>. It shows <code>Template(strings=(\'Serves \', \'\'), interpolations=(...))</code>, and <code>str(card)</code> gives the same. Joining it to text stops with <code>TypeError: can only concatenate string.templatelib.Template (not "str") to string.templatelib.Template</code>, and <code>card.upper()</code> stops with <code>AttributeError</code>. Always pass a t-string to a function that turns it into text.',
          '<b>It needs Python 3.14 or newer.</b> An older Python does not know the <code>t</code> in front, and stops with <code>SyntaxError: invalid syntax</code> before it runs a single line. Check with <code>python3 --version</code>. On a Mac, plain <code>python3</code> can be an old 3.9.',
          '<b>Use it only when it helps.</b> Printing a receipt in your own terminal, with your own jars? An <b>f-string</b> is simpler, and it is still the everyday tool. Reach for a t-string when text from <b>someone else</b> goes into HTML, a database query or a log, and a function can make it safe.'
        ],
        warn: 'One wrong letter switches the safety off without a sound. <code>safe_html(f"...")</code> gets finished text, not a Template, so there are no values to escape, and Ben\'s tag goes straight through. Good libraries check <code>isinstance(template, Template)</code> and refuse plain text.'
      }
    ],
    exercises: [
      {
        file: 'l86_safe_menu.py', title: 'The safe menu card',
        task: 'Write <code>render(template)</code>. It gets a t-string, keeps the <b>fixed text</b> as it is, turns each <b>value</b> into text with its look (<code>format(part.value, part.format_spec)</code>), <b>escapes</b> it with <code>escape</code> from <code>html</code>, and returns everything joined into one str. The check tries tricky names like <code>Chloe &lt;script&gt;</code> and <code>Ana &amp; Ben</code>.',
        steps: [
          'This exercise needs <b>Python 3.14 or newer</b>. In VS Code, click the Python version at the bottom right and pick 3.14 or newer. On an older Python the file only prints a friendly message.',
          'Press <b>Open in VS Code</b> and run the file. The starter returns empty text, so the check gives the first hint.',
          'Between <code>START</code> and <code>END</code>, loop over the template. Use <code>isinstance(part, Interpolation)</code> to spot a value. Run it until it says <code>PASS</code>.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'What does this print?',
        pic: code(['servings = 4', 'card = t"Serves {servings}"', 'print(type(card))'], { title: 'type.py' }),
        options: ["<class 'string.templatelib.Template'>", "<class 'str'>", 'Serves 4', "<class 't-string'>"],
        answer: 0,
        why: 'A t-string does not make text. It makes a <code>Template</code> from the <code>string.templatelib</code> module, which keeps the fixed text and the values apart.',
        hint: 'Does the t in front make text, or something else?'
      },
      {
        type: 'bucket', q: 'Here is <code>card = t"&lt;li&gt;{name}: {note}&lt;/li&gt;"</code>. Where does each part end up?',
        buckets: ['card.strings (fixed text)', 'card.values (filled in)'],
        items: [
          ['"<li>"', 0],
          ['": "', 0],
          ['"</li>"', 0],
          ['what is in name', 1],
          ['what is in note', 1]
        ],
        why: 'Everything you typed between the blanks is fixed text, in <code>.strings</code>. Whatever the names held when the line ran goes in <code>.values</code>. The two stay apart until a function joins them.',
        hint: 'Which parts did you write yourself, and which came from a jar?'
      },
      {
        type: 'fix', q: 'Ben\'s note turns the card bold again. One character is wrong. Fix it so his tag is escaped.',
        code: [...SAFE, '', 'note = "<b>extra cheese"', 'print(safe_html(f"<li>Ben: {note}</li>"))'],
        title: 'oops.py',
        check: [
          'import html',
          'line = out.strip()',
          'if line == "<li>Ben: &lt;b&gt;extra cheese</li>":',
          '    ok = True',
          'elif line == "<li>Ben: <b>extra cheese</li>":',
          '    msg = "Still a real &lt;b&gt; tag. safe_html got plain text with no values to escape. Which letter makes a template?"',
          'elif "&lt;li&gt;" in line:',
          '    msg = "Now &lt;li&gt; is escaped too. Only the values should be escaped. Change only the letter before the quotes."',
          'else:',
          '    msg = "It should print  &lt;li&gt;Ben: &amp;lt;b&amp;gt;extra cheese&lt;/li&gt;  It printed  " + html.escape(line)'
        ].join('\n'),
        why: '<code>f"..."</code> made finished text before <code>safe_html</code> ever saw it. Looping over a str gives single characters, none of them an <code>Interpolation</code>, so nothing was escaped. With <code>t"..."</code>, the note arrives as a value and gets escaped.',
        hint: 'Look at the last line. f or t?'
      },
      {
        type: 'fix', q: 'Now the page shows the tags as text: <code>&amp;lt;li&amp;gt;</code>. Escape only the <b>values</b>, not the fixed text.',
        code: ['from html import escape', 'from string.templatelib import Interpolation', '', 'def safe_html(template):', '    pieces = []', '    for part in template:', '        if isinstance(part, Interpolation):', '            part = str(part.value)', '        pieces.append(escape(part))', '    return "".join(pieces)', '', 'note = "<b>extra cheese"', 'print(safe_html(t"<li>Ben: {note}</li>"))'],
        title: 'too_safe.py',
        check: [
          'import html',
          'line = out.strip()',
          'if line == "<li>Ben: &lt;b&gt;extra cheese</li>":',
          '    ok = True',
          'elif "&lt;li&gt;" in line:',
          '    msg = "The fixed text is still escaped. Move escape(...) into the if, around str(part.value), and append part as it is."',
          'elif "<b>" in line:',
          '    msg = "Now nothing is escaped. Ben\'s note still needs escape()."',
          'else:',
          '    msg = "It should print  &lt;li&gt;Ben: &amp;lt;b&amp;gt;extra cheese&lt;/li&gt;  It printed  " + html.escape(line)'
        ].join('\n'),
        why: 'The fixed text is yours, and <code>&lt;li&gt;</code> must stay a real tag. Only values from guests need escaping: <code>part = escape(str(part.value))</code> inside the <code>if</code>, then <code>pieces.append(part)</code>.',
        hint: 'Which line escapes every part? Make it escape only inside the if.'
      },
      {
        type: 'fill', q: 'Finish <code>safe_html</code>: spot a value, escape it, keep the fixed text, and join.',
        text: 'for part in template:\n    if isinstance(part, ___):\n        part = ___(str(part.value))\n    pieces.append(part)\nreturn "".___(pieces)',
        options: ['Interpolation', 'escape', 'join', 'Template', 'str', 'format'],
        answer: ['Interpolation', 'escape', 'join'],
        why: 'Each blank comes out of the loop as an <code>Interpolation</code>. <code>escape</code> from <code>html</code> makes its value harmless. <code>"".join(pieces)</code> glues all the pieces into one str.',
        hint: 'A blank in a template is called an ...? The html tool that makes text harmless is ...?'
      },
      {
        type: 'pick', q: 'Back to lesson 15. In this t-string, what is <code>card.interpolations[0].format_spec</code>?',
        pic: code(['price = 6.5', 'card = t"Brownie: ${price:.2f}"'], { title: 'look.py' }),
        options: ["'.2f'", "'6.50'", '6.5', "'$'"],
        answer: 0,
        why: 'The look after the colon, as in lesson 15, is kept as text in <code>.format_spec</code>. The value stays <code>6.5</code>. A t-string only remembers the look. <code>format(part.value, part.format_spec)</code> applies it and gives <code>\'6.50\'</code>.',
        hint: 'What did you write after the colon?'
      },
      {
        type: 'pick', q: 'What happens?',
        pic: code(['servings = 4', 'card = t"Serves {servings}"', 'print(card + " guests")'], { title: 'join.py' }),
        options: ['TypeError: a Template and a str cannot be added', 'Serves 4 guests', 'Template(...) guests', 'Serves {servings} guests'],
        answer: 0,
        why: 'A Template is not text, so <code>+</code> with a str stops: <code>TypeError: can only concatenate string.templatelib.Template (not "str") to string.templatelib.Template</code>. Render it first with a function, or use an f-string if you just want text.',
        hint: 'Is a t-string a str?'
      },
      {
        type: 'bucket', q: 'f-string or t-string?',
        buckets: ['f-string is fine', 't-string and a safe function'],
        items: [
          ['print Ben\'s protein in your own terminal', 0],
          ['a receipt line from your own price jars', 0],
          ['a web page that shows notes guests typed', 1],
          ['a database search with a name a user typed', 1],
          ['a debug line with {total=}', 0]
        ],
        why: 'An f-string is the everyday tool when the text is yours. When text from someone else goes into HTML or a database query, a t-string lets a function escape just that text, so it cannot sneak into the instructions.',
        hint: 'Who typed the values? You, or a stranger?'
      }
    ]
  });
})();
