/* Lesson 89: Testing with pytest (module 8). One file per lesson.
   Terminal output checked with Python 3.15.2 (Homebrew, macOS), pip 26.2.2, pytest 9.2.0, on 2026-11-23
   (only the rootdir path was shortened to /Users/you/kitchen-coach, and the long ==== and ____ rules
   and the padding before [100%] were shortened so the lines fit a phone).
   The Run boxes were checked with Python 3.14 and in this page (Pyodide, Python 3.14): pytest is not in Pyodide,
   so the Run boxes call the test functions by hand. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l89  Testing with pytest
     ===================================================================== */

  const COACH = [
    'def daily_kcal(meals, shake=0):',
    '    """Add up a day of meals, plus a protein shake if there was one."""',
    '    return sum(meals) + shake',
    '',
    '',
    'def protein_left(goal, eaten):',
    '    """Grams of protein still to eat today."""',
    '    if eaten < 0:',
    '        raise ValueError(f"eaten must be 0 or more, got {eaten}")',
    '    return goal - eaten'
  ];
  const coachFile = COACH.join('\n') + '\n';
  const coachBug = coachFile.replace('shake=0)', 'shake=250)');

  // A tasting spoon: a bowl at (cx, cy) and a handle going up. state: 'ok', 'bad' or 'none'.
  const spoon = (cx, cy, label, state) => {
    const col = state === 'ok' ? P.ok : state === 'bad' ? P.danger : P.ink2;
    const fill = state === 'ok' ? P.okT : state === 'bad' ? P.dangerT : P.white;
    return `<rect x="${cx - 6}" y="${cy - 118}" width="12" height="100" rx="6" fill="${P.sand}" stroke="${P.ink}" stroke-width="2.5"/>` +
      `<ellipse cx="${cx + 3}" cy="${cy + 4}" rx="36" ry="24" fill="${P.ink}"/>` +
      `<ellipse cx="${cx}" cy="${cy}" rx="36" ry="24" fill="${fill}" stroke="${P.ink}" stroke-width="2.5"/>` +
      (state === 'ok' ? `<path d="M${cx - 12} ${cy} l8 9 l17 -19" fill="none" stroke="${P.ok}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>` : '') +
      (state === 'bad' ? T(cx, cy + 8, 'F', { s: 22, f: P.danger }) : '') +
      box(cx - 66, cy + 40, 132, 34, P.white, 8) + T(cx, cy + 63, label, { s: 14, m: true, f: col });
  };

  /* ---- The idea: taste tests, and assert ---- */
  const ideaSvg = svg(600, 270, 'A taste-test station for coach.py. Three tasting spoons, labelled test_ana, test_ben and test_chloe, each with a green tick. Each spoon checks one number: Ana\'s day is 2600 kcal, Ben\'s day is 2100 kcal, Chloe has 25 g of protein left. One command, python3 -m pytest, runs them all: 3 passed.',
    T(300, 24, 'python3 -m pytest  →  3 passed', { s: 15, m: true, f: P.ok }) +
    spoon(130, 158, 'test_ana', 'ok') + spoon(300, 158, 'test_ben', 'ok') + spoon(470, 158, 'test_chloe', 'ok') +
    T(130, 258, 'Ana: 2600 kcal', { s: 13, w: 700, f: P.ink2 }) + T(300, 258, 'Ben: 2100 kcal', { s: 13, w: 700, f: P.ink2 }) + T(470, 258, 'Chloe: 25 g left', { s: 13, w: 700, f: P.ink2 }));
  const assertDemo = [
    'from coach import daily_kcal',
    '',
    'total = daily_kcal([650, 850, 300, 800])',
    'print("Ana\'s day:", total)',
    '',
    'assert total == 2600',
    'print("Taste test passed: 2600, as planned")',
    '',
    'assert total == 2500, "Ana\'s day should be 2500"',
    'print("This line runs only if the check above passes")'
  ];
  const ideaPic = `<div style="width:100%;min-width:0">${ideaSvg}${code(COACH, { title: 'coach.py' })}${run(assertDemo, { title: 'taste.py', files: { 'coach.py': coachFile } })}</div>`;

  /* ---- The code: a test file, and pytest ---- */
  const TESTS = [
    'from coach import daily_kcal, protein_left',
    '',
    '',
    'def test_ana():',
    '    assert daily_kcal([650, 850, 300, 800]) == 2600',
    '',
    '',
    'def test_ben():',
    '    assert daily_kcal([500, 700, 650], shake=250) == 2100',
    '',
    '',
    'def test_chloe():',
    '    assert protein_left(90, 65) == 25'
  ];
  const byHand = TESTS.concat([
    '',
    '',
    '# pytest does the next 4 lines for you. This page has no pytest,',
    '# so here we call the taste tests by hand.',
    'test_ana()',
    'test_ben()',
    'test_chloe()',
    'print("all 3 taste tests passed")'
  ]);
  const folderSvg = svg(600, 196, 'The kitchen-coach project folder. coach.py holds the real code. test_coach.py sits right next to it and holds the taste tests. .venv is the small shelf from lesson 63, where pytest is installed. pytest looks for files whose names start with test_, and inside them for functions whose names start with test_.',
    box(20, 16, 300, 166, P.white, 14) + T(40, 46, 'kitchen-coach/', { s: 15, m: true, a: 'start' }) +
    box(40, 62, 200, 32, P.tint, 8) + T(54, 84, 'coach.py', { s: 14, m: true, a: 'start' }) +
    box(40, 102, 200, 32, P.okT, 8) + T(54, 124, 'test_coach.py', { s: 14, m: true, a: 'start', f: P.ok }) +
    box(40, 142, 200, 30, P.sand, 8) + T(54, 163, '.venv/  (pytest)', { s: 13, m: true, a: 'start', f: P.ink2 }) +
    arrow(252, 78, 340, 64, P.accent, 2.5) + T(350, 58, 'the real recipe', { s: 13.5, w: 700, a: 'start', f: P.accent }) +
    arrow(252, 118, 340, 118, P.ok, 2.5) + T(350, 112, 'pytest opens test_*.py', { s: 13.5, w: 700, a: 'start', f: P.ok }) +
    T(350, 132, 'and runs every test_...()', { s: 13.5, w: 700, a: 'start', f: P.ok }));
  const install = [
    '# in kitchen-coach, with the .venv from lesson 63 switched on',
    '$ python3 -m pip install pytest',
    'Collecting pytest',
    '  Downloading pytest-9.2.0-py3-none-any.whl.metadata (7.9 kB)',
    '# ... it also fetches 4 small helpers pytest needs ...',
    'Installing collected packages: pygments, pluggy, packaging, iniconfig, pytest',
    'Successfully installed iniconfig-2.3.1 packaging-26.4 pluggy-1.7.0 pygments-2.21.0 pytest-9.2.0'
  ];
  const passRun = [
    '$ python3 -m pytest',
    '=== test session starts ===',
    'platform darwin -- Python 3.15.2, pytest-9.2.0, pluggy-1.7.0',
    'rootdir: /Users/you/kitchen-coach',
    'collected 3 items',
    ' ',
    'test_coach.py ...  [100%]',
    ' ',
    '=== 3 passed in 0.01s ==='
  ];
  const verbose = [
    '$ python3 -m pytest -v',
    '# ... the same 4 header lines ...',
    'test_coach.py::test_ana PASSED  [ 33%]',
    'test_coach.py::test_ben PASSED  [ 66%]',
    'test_coach.py::test_chloe PASSED  [100%]',
    ' ',
    '=== 3 passed in 0.01s ==='
  ];
  const codePic = `<div style="width:100%;min-width:0">${run(byHand, { title: 'test_coach.py', files: { 'coach.py': coachFile } })}${folderSvg}` +
    term(install, 'terminal, Python 3.15') + term(passRun, 'terminal: run every taste test') + term(verbose, 'terminal: -v names each test') + `</div>`;

  /* ---- The pain: Ben's change breaks Ana, quietly ---- */
  const plans = [
    'from coach import daily_kcal',
    '',
    '# coach.py changed today: def daily_kcal(meals, shake=250):',
    'print("Ana:  ", daily_kcal([650, 850, 300, 800]), "kcal")',
    'print("Ben:  ", daily_kcal([500, 700, 650]), "kcal")',
    'print("Chloe:", daily_kcal([400, 600, 650, 350]), "kcal")'
  ];
  const changeSvg = svg(600, 150, 'The change. Before: def daily_kcal(meals, shake=0). After: def daily_kcal(meals, shake=250), so Ben does not have to type his shake. Ben\'s day is right: 2100. Ana\'s meal plan now says 2850 kcal instead of 2600, and Python prints no error at all.',
    T(20, 30, 'before', { s: 13, a: 'start', f: P.ink2 }) + T(90, 30, 'def daily_kcal(meals, shake=0):', { s: 14, m: true, a: 'start' }) +
    T(20, 62, 'after', { s: 13, a: 'start', f: P.danger }) + T(90, 62, 'def daily_kcal(meals, shake=250):', { s: 14, m: true, a: 'start', f: P.danger }) +
    box(20, 86, 170, 50, P.okT, 10) + T(105, 117, 'Ben: 2100 ✓', { s: 15, f: P.ok }) +
    box(210, 86, 200, 50, P.dangerT, 10) + T(310, 117, 'Ana: 2850 ✗', { s: 15, f: P.danger }) +
    T(500, 106, 'no error,', { s: 13.5, w: 700, f: P.ink2 }) + T(500, 126, 'no warning', { s: 13.5, w: 700, f: P.ink2 }));
  const failRun = [
    '$ python3 -m pytest',
    '=== test session starts ===',
    'platform darwin -- Python 3.15.2, pytest-9.2.0, pluggy-1.7.0',
    'rootdir: /Users/you/kitchen-coach',
    'collected 3 items',
    ' ',
    'test_coach.py F..  [100%]',
    ' ',
    '=== FAILURES ===',
    '___ test_ana ___',
    ' ',
    '    def test_ana():',
    '>       assert daily_kcal([650, 850, 300, 800]) == 2600',
    'E       assert 2850 == 2600',
    'E        +  where 2850 = daily_kcal([650, 850, 300, 800])',
    ' ',
    'test_coach.py:5: AssertionError',
    '=== short test summary info ===',
    'FAILED test_coach.py::test_ana - assert 2850 == 2600',
    '=== 1 failed, 2 passed in 0.01s ==='
  ];
  const painPic = `<div style="width:100%;min-width:0">${changeSvg}${run(plans, { title: 'plans.py', files: { 'coach.py': coachBug } })}${term(failRun, 'terminal: the taste tests, after the change')}</div>`;

  /* ---- The fix: read the failure, fix the code, run again ---- */
  const fixBox = [
    'def daily_kcal(meals, shake=250):',
    '    return sum(meals) + shake',
    '',
    '',
    'def protein_left(goal, eaten):',
    '    if eaten < 0:',
    '        raise ValueError(f"eaten must be 0 or more, got {eaten}")',
    '    return goal - eaten',
    '',
    '',
    'def test_ana():',
    '    assert daily_kcal([650, 850, 300, 800]) == 2600',
    '',
    '',
    'def test_ben():',
    '    assert daily_kcal([500, 700, 650], shake=250) == 2100',
    '',
    '',
    'def test_chloe():',
    '    assert protein_left(90, 65) == 25',
    '',
    '',
    'test_ana()',
    'test_ben()',
    'test_chloe()',
    'print("all 3 taste tests passed")'
  ];
  const greenRun = [
    '# coach.py: shake=0 again. Ben\'s own code passes shake=250.',
    '$ python3 -m pytest',
    '# ... the same 4 header lines ...',
    'test_coach.py ...  [100%]',
    ' ',
    '=== 3 passed in 0.01s ==='
  ];
  const fixPic = `<div style="width:100%;min-width:0">${run(fixBox, { title: 'fix_default.py' })}${term(greenRun, 'terminal: all green again')}</div>`;

  /* ---- Try it: test the bug first, then pytest.raises and parametrize ---- */
  const overGoal = [
    'def protein_left(goal, eaten):',
    '    if eaten < 0:',
    '        raise ValueError(f"eaten must be 0 or more, got {eaten}")',
    '    return goal - eaten',
    '',
    '',
    'def test_chloe():',
    '    assert protein_left(90, 65) == 25',
    '',
    '',
    '# Chloe ate 110 g today, and Coach told her "-20 g left".',
    '# First, a taste test that shows the bug:',
    'def test_chloe_over_goal():',
    '    assert protein_left(90, 110) == 0',
    '',
    '',
    'test_chloe()',
    'test_chloe_over_goal()',
    'print("all taste tests passed")'
  ];
  const raisesCode = [
    'import pytest',
    '',
    'from coach import daily_kcal, protein_left',
    '',
    '',
    'def test_negative_eaten_is_refused():',
    '    with pytest.raises(ValueError):',
    '        protein_left(140, -20)',
    '',
    '',
    '@pytest.mark.parametrize("meals, total", [',
    '    ([650, 850, 300, 800], 2600),',
    '    ([500, 700, 650, 250], 2100),',
    '    ([400, 600, 650, 350], 2000),',
    '    ([], 0),',
    '])',
    'def test_daily_kcal(meals, total):',
    '    assert daily_kcal(meals) == total'
  ];
  const moreRun = [
    '$ python3 -m pytest test_more.py -v',
    '# ... the same 4 header lines ...',
    'test_more.py::test_negative_eaten_is_refused PASSED  [ 20%]',
    'test_more.py::test_daily_kcal[meals0-2600] PASSED  [ 40%]',
    'test_more.py::test_daily_kcal[meals1-2100] PASSED  [ 60%]',
    'test_more.py::test_daily_kcal[meals2-2000] PASSED  [ 80%]',
    'test_more.py::test_daily_kcal[meals3-0] PASSED  [100%]',
    ' ',
    '=== 5 passed in 0.01s ==='
  ];
  const noRaise = [
    '# if someone deletes the guard from protein_left:',
    '$ python3 -m pytest test_more.py',
    '# ...',
    '    def test_negative_eaten_is_refused():',
    '>       with pytest.raises(ValueError):',
    '             ^^^^^^^^^^^^^^^^^^^^^^^^^',
    'E       Failed: DID NOT RAISE ValueError'
  ];
  const raisesByHand = [
    'def protein_left(goal, eaten):',
    '    if eaten < 0:',
    '        raise ValueError(f"eaten must be 0 or more, got {eaten}")',
    '    return goal - eaten',
    '',
    '',
    '# What  with pytest.raises(ValueError):  does for you, by hand:',
    'def test_negative_eaten_is_refused():',
    '    try:',
    '        protein_left(140, -20)',
    '    except ValueError as err:',
    '        print("Refused, as it should be:", err)',
    '        return',
    '    assert False, "protein_left(140, -20) did not raise ValueError"',
    '',
    '',
    'test_negative_eaten_is_refused()',
    'print("taste test passed")'
  ];
  const tryPic = `<div style="width:100%;min-width:0">${run(overGoal, { title: 'chloe_over.py' })}<div style="height:14px"></div>` +
    code(raisesCode, { title: 'test_more.py', hi: [7, 11] }) + term(moreRun, 'terminal, Python 3.15, pytest 9.2') + term(noRaise, 'terminal: the guard is gone') +
    run(raisesByHand, { title: 'raises_by_hand.py' }) + `</div>`;

  /* ---- The catch: test your rules, one idea per test ---- */
  const badTests = [
    'def test_sorted_sorts():',
    '    assert sorted([3, 1, 2]) == [1, 2, 3]   # tests Python, not you',
    '',
    'def test_everything():',
    '    assert daily_kcal([650, 850, 300, 800]) == 2600',
    '    assert protein_left(90, 65) == 25',
    '    assert daily_kcal([]) == 0             # never reached if line 5 fails'
  ];
  const goodTests = [
    'def test_empty_day_is_zero():',
    '    assert daily_kcal([]) == 0',
    '',
    'def test_shake_is_added():',
    '    assert daily_kcal([500], shake=250) == 750',
    '',
    'def test_chloe_protein_left():',
    '    assert protein_left(90, 65) == 25'
  ];
  const catchPic = `<div style="width:100%;min-width:0">${code(badTests, { title: 'test_bad.py', bad: [1, 2, 4] })}<div style="height:14px"></div>${code(goodTests, { title: 'test_good.py', good: [1, 4, 7] })}</div>`;

  COURSE.add({
    id: 'l89', minutes: 16,
    summary: 'A <b>test</b> is a taste test for your code: a small function whose name starts with <code>test_</code>, that calls your code and checks the answer with <code>assert</code>. <code>assert total == 2600</code> does nothing when it is true, and stops with an <b>AssertionError</b> when it is false. Put the tests in a file named <code>test_coach.py</code> next to <code>coach.py</code>, install pytest in your project\'s venv with <code>python3 -m pip install pytest</code> (lesson 63), and run <code>python3 -m pytest</code>. Each passing test is a dot, a failing one an <b>F</b>, and pytest shows the failing line <b>with both numbers</b>: <code>assert 2850 == 2600</code>. Tests catch a change that quietly breaks somebody else, in a second, every time. <code>with pytest.raises(ValueError):</code> checks that an error <b>is</b> raised, and <code>@pytest.mark.parametrize</code> runs one test with many examples. When you find a bug, write the test that shows it <b>first</b>, then fix it. Test <b>your</b> rules, not Python itself, and keep one idea per test.',
    video: {
      src: 'videos/l89-testing-with-pytest.mp4', poster: 'videos/l89-testing-with-pytest.jpg', length: '1 min 7 s',
      script: [
        "Kitchen Coach has coach.py. daily_kcal adds up a day of meals. How do you know it still works tomorrow? Taste tests.",
        "A test is a small function, and its name starts with test. It calls your code, and assert checks the answer. Ana's day should be 2600 calories. Ben's day, with his shake, 2100. Chloe has 25 grams of protein left.",
        "Type python3 -m pytest. Every spoon gets a green dot. 3 passed, in a hundredth of a second.",
        "Then Ben asks for a change. Add my 250 calorie shake by default. Run the tests again. Ana's spoon turns red. pytest shows the line, and both numbers. 2850 is what the code gave. 2600 is what Ana needs. Without the test, nobody notices until her meal plan is wrong.",
        "Put the default back to zero. Run again. 3 passed.",
        "A test is a taste test you can run any time. pytest runs them all in a second."
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'A taste test you can run any time.',
        text: [
          'A good cook <b>tastes</b> the soup before it goes out. Not once, when the recipe was new, but every time. Code needs the same. Kitchen Coach\'s <code>coach.py</code> has two recipe cards: <code>daily_kcal(meals, shake=0)</code> adds up a day of meals, and <code>protein_left(goal, eaten)</code> says how many grams of protein are still to eat. It refuses a negative amount with <code>raise</code>, as lesson 54 taught.',
          'You know the right answers for your friends. Ana\'s four meals, 650, 850, 300 and 800 kcal, make <b>2600</b>. A taste test checks that the code still says so.',
          'The tool is one new keyword: <code>assert</code>. <code>assert total == 2600</code> means "this must be true". If it is true, <b>nothing happens</b> and the program goes on. If it is false, Python stops with an <b>AssertionError</b>. After a comma you can add a message that is shown when it fails.',
          'Press <b>Run</b>. The first check passes quietly. The second one expects 2500, so it stops the program with your message, and the last line never runs. Now change <code>2500</code> to <code>2600</code> and run again: both pass.'
        ],
        tip: 'Lesson 54 warned that <code>assert</code> is not a guard for real input, because Python can be told to skip every <code>assert</code>. In a <b>test</b> it is exactly right. That is where it belongs.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'test_ functions in a test_ file, and pytest runs them.',
        text: [
          'A <b>test</b> is a plain function whose name starts with <code>test_</code>. It calls your code with known ingredients, and <code>assert</code> checks the answer. One taste test per friend: Ana\'s day is 2600 kcal, Ben\'s day with his 250 kcal shake is 2100, and Chloe, who aims for 90 g of protein and has eaten 65 g, has 25 g left.',
          'The tests live in their own file, <code>test_coach.py</code>, <b>right next to</b> <code>coach.py</code>, and import it like any module (lesson 60). The real code never imports the tests.',
          'Press <b>Run</b>. This page has no pytest, so the last lines call the three tests by hand and print <code>all 3 taste tests passed</code>. On your computer, <b>pytest</b> does that part for you. It is a package, so install it the way lesson 63 did: in the project\'s <code>.venv</code>, switched on, type <code>python3 -m pip install pytest</code>.',
          'Then type <code>python3 -m pytest</code>. pytest finds every file named <code>test_*.py</code>, runs every <code>test_</code> function in it, and prints <b>one dot per passing test</b>. <code>3 passed in 0.01s</code>: three taste tests in a hundredth of a second. Add <code>-v</code> to see each test by name, with <code>PASSED</code>.'
        ],
        tip: 'Lesson 91, Virtual environments, gives each project its own kitchen properly. For now, the <code>.venv</code> from lesson 63 is all pytest needs. In VS Code, the <b>Testing</b> panel (the flask icon) can run the same tests with a click once pytest is installed.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'A change for Ben quietly breaks Ana.',
        text: [
          'Ben has his 250 kcal shake every day, and he is tired of typing <code>shake=250</code>. So someone changes the default (lesson 46): <code>def daily_kcal(meals, shake=250):</code>. Ben\'s day comes out right, 2100, with no typing. Job done?',
          'Press <b>Run</b>. Ana gets <b>2850</b> instead of 2600. Chloe gets 2250 instead of 2000. Neither of them drinks the shake. There is <b>no error</b> and no warning: the numbers just look like numbers. Ana\'s meal plan is 250 kcal too high every day, and nobody notices until her long runs feel wrong, a week later.',
          'Now the same change with the taste tests in place. <code>python3 -m pytest</code> prints <code>F..</code>: the first test <b>F</b>ailed, the other two passed. Read the report from the top: the failing test is <code>test_ana</code>, the <code>&gt;</code> marks the line, and <code>E</code> lines explain it. <code>assert 2850 == 2600</code> is the line <b>with the real values filled in</b>: the left number is what the code gave, the right one is what you wrote. <code>where 2850 = daily_kcal([650, 850, 300, 800])</code> says where 2850 came from.',
          'One second, and the change is caught before Ana ever sees it. Chloe\'s calories were wrong too, but no test covered them. One red spoon was enough to find the problem.'
        ],
        warn: 'Plain Python only says <code>AssertionError</code>. pytest rewrites every <code>assert</code> so the failure shows both sides. That is why you write <code>assert a == b</code> in tests and let pytest explain it.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Read the failure, fix the code, run again.',
        text: [
          'Here is <code>coach.py</code> with the change, and the three taste tests, in one box. Press <b>Run</b>: <code>test_ana()</code> stops with an AssertionError, and the traceback points at the <code>assert</code> line in <code>test_ana</code>.',
          'The test is right. Ana does not drink the shake. The <b>code</b> is wrong: a default should suit every caller, not only Ben. Change <code>shake=250</code> on line 1 back to <code>shake=0</code>, and run again. All three pass. Ben\'s own code passes <code>shake=250</code> as a keyword, the way <code>test_ben</code> does.',
          'On your computer, run <code>python3 -m pytest</code> again: <code>3 passed</code>, all green. From now on, every change gets tasted before it goes out.'
        ],
        tip: 'Never "fix" a red test by changing the expected number until it passes. First ask: is the test right, or the code? Here 2600 is Ana\'s real need, so the code had to change.'
      },
      {
        label: 'Try it', pic: tryPic,
        h: 'Test the bug first. Then two more pytest tools.',
        text: [
          '<b>The habit: a bug report becomes a test first.</b> Chloe ate 110 g of protein, more than her goal of 90, and Coach told her <code>-20 g left</code>. That should be 0. In lesson 88 you found a bug by tracing it. Before you fix one, write the taste test that <b>shows</b> it. Press <b>Run</b> on <code>chloe_over.py</code>: <code>test_chloe_over_goal</code> fails. Good: it proves the bug is real. Now fix line 4 to <code>return max(goal - eaten, 0)</code> and run again. Both pass, and this bug can never come back without a red F.',
          '<b><code>pytest.raises</code>: check that an error IS raised.</b> <code>protein_left(140, -20)</code> must refuse. <code>with pytest.raises(ValueError):</code> is a <b>context manager</b> (lesson 85): the test passes only if the block raises a <code>ValueError</code>. If nothing is raised, pytest says <code>DID NOT RAISE ValueError</code>. The box <code>raises_by_hand.py</code> does the same job with <code>try</code> and <code>except</code>. Delete lines 2 and 3, the guard, and run it: the test fails.',
          '<b><code>@pytest.mark.parametrize</code>: one test, many examples.</b> It is a <b>decorator</b> (lesson 84). Give it the names, <code>"meals, total"</code>, and a list of examples. pytest runs the test once per example and counts each one: 4 examples, plus the raises test, is <code>5 passed</code>. In the names like <code>[meals0-2600]</code>, <code>meals0</code> means "the first list of meals".'
        ],
        tip: '<code>max(goal - eaten, 0)</code> picks the bigger of the two (lesson 31): 25 stays 25, and -20 becomes 0.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Test your rules, one idea per test.',
        text: [
          '<b>Do not test Python itself.</b> <code>sorted</code> sorts, and <code>sum</code> adds. Thousands of people test those already. Test <b>your</b> rules: the shake is added, an empty day is 0 kcal, a negative amount is refused, protein left never goes below 0.',
          '<b>One idea per test.</b> <code>test_everything</code> checks three things. If the first <code>assert</code> fails, the test stops there, so you never learn whether the other two still work. The name tells you nothing either. Small tests with clear names say what broke: <code>FAILED test_shake_is_added</code> needs no detective work.',
          '<b>Test the edges.</b> An empty list, a zero, a number on the line. Bugs like to hide there, as Chloe\'s 110 g did.'
        ],
        warn: 'pytest only finds tests it can recognise. A file called <code>coach_tests.py</code> or a function called <code>check_ana</code> is silently skipped. Start both names with <code>test_</code>.'
      }
    ],
    exercises: [
      {
        file: 'l89_taste_tests.py', title: 'Taste-test Ana\'s week',
        task: 'Kitchen Coach has a new card, <code>average_kcal(days)</code>, for Ana\'s average over the days she logged. It has a bug. Work the way a pro does: first write a taste test, <code>test_ana_average</code>, that <b>shows</b> the bug (it must fail), then fix the card so every test passes.',
        steps: [
          'Press <b>Open in VS Code</b> and run the file. It runs every <code>test_</code> function itself, like a small pytest, and prints <code>ok</code> or <code>FAILED</code> for each.',
          'Between <code>START</code> and <code>END</code>, write <code>def test_ana_average():</code> with an <code>assert</code>. Ana logged 5 days: 2600, 2400, 2800, 2600 and 2600 kcal. Her average must be 2600. Run it: your test should fail, and the check tells you it caught the bug.',
          'Now fix <code>average_kcal</code> and run again until it says <code>PASS</code>.',
          'If pytest is in your venv (part 2), also try <code>python3 -m pytest l89_taste_tests.py</code>. pytest finds the same tests in the file and shows the failing numbers.'
        ]
      }
    ],
    quiz: [
      {
        type: 'bucket', q: 'You type <code>python3 -m pytest</code> in the project folder. Which of these does pytest run as a test?',
        buckets: ['pytest runs it', 'pytest skips it'],
        items: [
          ['def test_ana(): in test_coach.py', 0],
          ['def test_shake_is_added(): in test_coach.py', 0],
          ['def check_ben(): in test_coach.py', 1],
          ['def test_chloe(): in coach_checks.py', 1],
          ['def daily_kcal(meals, shake=0): in coach.py', 1]
        ],
        why: 'pytest looks in files named <code>test_*.py</code> (or <code>*_test.py</code>) and runs the functions whose names start with <code>test_</code>. <code>check_ben</code> has the wrong name, and <code>coach_checks.py</code> is the wrong file, so both are skipped without a word.',
        hint: 'Both the file name and the function name matter.'
      },
      {
        type: 'pick', q: 'pytest prints this. What does <code>2850</code> mean?',
        pic: term(['>       assert daily_kcal([650, 850, 300, 800]) == 2600', 'E       assert 2850 == 2600', 'E        +  where 2850 = daily_kcal([650, 850, 300, 800])'], 'pytest'),
        options: ['It is what daily_kcal really returned', 'It is the number the test expected', 'It is the line number of the failing test', 'It is how many kcal the test is allowed to be off by'],
        answer: 0,
        why: 'pytest fills in the real values of both sides of the <code>==</code>. The left side is what your code gave, 2850. The right side is what you wrote in the test, 2600. The <code>where</code> line says 2850 came from <code>daily_kcal([650, 850, 300, 800])</code>.',
        hint: 'Look at the where line.'
      },
      {
        type: 'fix', q: 'This taste test <b>never fails</b>, even though <code>daily_kcal</code> has Ben\'s bug. Fix <code>test_ana</code> so it catches the bug: the output should say <code>test_ana FAILED: it caught the bug</code>. Leave <code>daily_kcal</code> as it is.',
        code: ['def daily_kcal(meals, shake=250):', '    return sum(meals) + shake', '', '', 'def test_ana():', '    daily_kcal([650, 850, 300, 800]) == 2600', '', '', 'try:', '    test_ana()', '    print("test_ana passed")', 'except AssertionError:', '    print("test_ana FAILED: it caught the bug")'],
        title: 'never_fails.py',
        check: [
          't = globals().get("test_ana")',
          'def _good(meals, shake=0):',
          '    return sum(meals) + shake',
          'def _bad(meals, shake=250):',
          '    return sum(meals) + shake',
          'def _taste(f):',
          '    g = t.__globals__',
          '    old = g.get("daily_kcal")',
          '    g["daily_kcal"] = f',
          '    try:',
          '        t()',
          '        return "pass"',
          '    except AssertionError:',
          '        return "fail"',
          '    except Exception:',
          '        return "error"',
          '    finally:',
          '        g["daily_kcal"] = old',
          'if not callable(t):',
          '    msg = "Keep the function  def test_ana():  The check calls it."',
          'elif _taste(_bad) != "fail":',
          '    msg = "test_ana still passes with the bug. A comparison on its own checks nothing. What keyword makes it stop when it is false?"',
          'elif _taste(_good) != "pass":',
          '    msg = "Now test_ana fails even when daily_kcal is right. Ana\'s day is 650 + 850 + 300 + 800 = 2600."',
          'elif "test_ana FAILED: it caught the bug" not in out:',
          '    msg = "Keep the try and except lines at the bottom: they print the result."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: 'Line 6 computes <code>2850 == 2600</code>, gets <code>False</code>, and throws it away. Nothing checks it. Put <code>assert</code> in front: <code>assert daily_kcal([650, 850, 300, 800]) == 2600</code>. Now a false answer stops the test with an AssertionError.',
        hint: 'A test needs one keyword in front of the comparison.'
      },
      {
        type: 'fix', q: 'The taste tests are right, and <code>protein_left</code> is wrong. Fix <b>the function</b> (not the tests) so both tests print <code>PASSED</code>.',
        code: ['def protein_left(goal, eaten):', '    return eaten - goal', '', '', 'def test_ben():', '    assert protein_left(140, 95) == 45', '', '', 'def test_chloe():', '    assert protein_left(90, 65) == 25', '', '', 'for test in [test_ben, test_chloe]:', '    try:', '        test()', '        print("PASSED", test.__name__)', '    except AssertionError:', '        print("FAILED", test.__name__)'],
        title: 'protein.py',
        check: [
          'f = globals().get("protein_left")',
          'lines = out.strip().splitlines()',
          'if not callable(f):',
          '    msg = "Keep the function  def protein_left(goal, eaten):"',
          'elif lines != ["PASSED test_ben", "PASSED test_chloe"]:',
          '    msg = "Not both PASSED yet. Ben aims for 140 g and ate 95 g: what is left? Which number comes first in the subtraction?"',
          'elif f(120, 80) != 40 or f(100, 0) != 100:',
          '    msg = "The tests pass, but protein_left(120, 80) should be 40. Did you change the function, or only bend it to the two tests?"',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: 'Protein left is the goal minus what was eaten: <code>return goal - eaten</code>. 140 - 95 = 45 for Ben, 90 - 65 = 25 for Chloe. The tests were right all along, so the code had to change.',
        hint: 'Read the failing line: what should 140 and 95 give?'
      },
      {
        type: 'order', q: 'Ana says: "Coach told me 2850 kcal, but my plan is 2600." Put a pro\'s steps in order.',
        items: ['Write a test that expects 2600 for Ana\'s meals', 'Run pytest and watch that test fail', 'Fix the code in coach.py', 'Run pytest again: every test passes', 'Keep the test, so the bug cannot come back unseen'],
        why: 'The test comes <b>first</b>: seeing it fail proves it really catches the bug. Then fix the code, run everything again to check nothing else broke, and keep the test for every future change.',
        hint: 'A test you never saw fail might not test anything.'
      },
      {
        type: 'fill', q: 'Finish the two pytest tools.',
        text: 'import pytest\n\ndef test_negative_is_refused():\n    with pytest.___(ValueError):\n        protein_left(140, -20)\n\n@pytest.mark.___("meals, total", [([500], 500), ([], 0)])\ndef test_daily_kcal(meals, total):\n    ___ daily_kcal(meals) == total',
        options: ['raises', 'parametrize', 'assert', 'except', 'return', 'catch'],
        answer: ['raises', 'parametrize', 'assert'],
        why: '<code>pytest.raises(ValueError)</code> passes only if the block raises that error. <code>@pytest.mark.parametrize</code> runs the test once per example. <code>assert</code> does the checking. <code>return</code> would hand back <code>True</code> or <code>False</code> and check nothing.',
        hint: 'One word expects an error, one runs many examples, one checks.'
      },
      {
        type: 'bucket', q: 'Which of these are worth a taste test in Kitchen Coach?',
        buckets: ['Test it: your rule', 'Skip it: Python already does it'],
        items: [
          ['daily_kcal of an empty day is 0', 0],
          ['protein_left(140, -20) raises ValueError', 0],
          ['the shake is added only when you pass it', 0],
          ['sorted([3, 1, 2]) gives [1, 2, 3]', 1],
          ['len([650, 850]) is 2', 1]
        ],
        why: 'Test the rules <b>you</b> wrote: what an empty day means, what is refused, when the shake counts. <code>sorted</code> and <code>len</code> belong to Python and are tested by its own makers.',
        hint: 'Who wrote the rule being checked?'
      },
      {
        type: 'pick', q: 'Back to lesson 85. <code>pytest.raises</code> is a context manager. Here <code>protein_left</code> raises a ValueError inside the block. What happens on the way out of the <code>with</code>?',
        pic: code(['def test_negative_eaten_is_refused():', '    with pytest.raises(ValueError):', '        protein_left(140, -20)'], { title: 'test_more.py' }),
        options: ['Its __exit__ sees the ValueError it expected, stops it there, and the test passes', 'The ValueError carries on and the test fails', 'The with block runs again until no error is raised', 'Its __exit__ runs only when there is no error'],
        answer: 0,
        why: 'As lesson 85 showed, <code>__exit__</code> runs on the way out and is told about the error. <code>pytest.raises</code> checks it is the type you named, and only then swallows it, so the test passes. With no error at all, it fails the test with <code>DID NOT RAISE</code>. This is the one kind of manager that should swallow an error: it knows exactly which one it expects.',
        hint: 'What did lesson 85 say __exit__ is told about?'
      }
    ]
  });
})();
