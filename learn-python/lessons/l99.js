/* Lesson 99: Concurrency (module 9). One file per lesson.
   Every Run box was checked with Python 3.14.4 (Homebrew) and in this page (Pyodide, Python 3.14).
   The page's Python cannot start threads or processes: threading raises
   "RuntimeError: can't start new thread" and ProcessPoolExecutor raises NotImplementedError.
   So the Run boxes show the one-cook timing, and a step-by-step simulation of two cooks
   (generators) that makes the lost update happen every time. time.sleep and threading.Lock work there.
   Terminal pictures are real: Python 3.15.2 (Homebrew), macOS, 10 cores, run on 2026-11-23.
   Timings are rounded to 0.1 s and change a little from run to run.
   No free-threaded Python (python3.14t or python3.15t) was installed on this Mac, so the
   free-threaded build is described, not shown. The -X gil=0 error and sys._is_gil_enabled() are real. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l99  Concurrency
     ===================================================================== */

  // A bar on a timeline: 150 px per second from x0.
  const bar = (x, y, w, label, kind) => {
    const fill = kind === 'wait' ? P.warnT : kind === 'work' ? P.accent : kind === 'ok' ? P.okT : P.dangerT;
    const col = kind === 'wait' ? '#8a5410' : kind === 'work' ? P.white : kind === 'ok' ? P.ok : P.danger;
    const line = kind === 'wait' ? P.warn : kind === 'ok' ? P.ok : kind === 'bad' ? P.danger : P.ink;
    return `<rect x="${x}" y="${y}" width="${w}" height="30" rx="7" fill="${fill}" stroke="${line}" stroke-width="2"/>` +
      (label ? T(x + w / 2, y + 20, label, { s: 12.5, f: col }) : '');
  };
  const axis = (x0, y, secs, px) => `<line x1="${x0}" y1="${y}" x2="${x0 + secs * px}" y2="${y}" stroke="${P.ink}" stroke-width="2"/>` +
    Array.from({ length: secs + 1 }, (_, i) => `<line x1="${x0 + i * px}" y1="${y}" x2="${x0 + i * px}" y2="${y + 6}" stroke="${P.ink}" stroke-width="2"/>` + T(x0 + i * px, y + 22, i + ' s', { s: 12, w: 700, f: P.ink2 })).join('');
  const lbl = (x, y, s, col) => T(x, y, s, { s: 13, a: 'start', f: col || P.ink });

  /* ---- The idea: two kinds of slow ---- */
  const ideaSvg = svg(600, 250, 'Two kinds of slow. Left, waiting work: the dish sits in the oven for 1 second and the cook stands idle. Examples: downloads, reading files, a timer. Right, heavy work: chopping a big bowl of carrots, and the cook is busy every moment. Examples: big sums, resizing photos, counting to 40 million.',
    box(12, 14, 280, 222, P.white, 14) +
    T(152, 44, 'Waiting work', { s: 17, f: P.warn }) +
    bar(32, 62, 240, 'oven: 1 s', 'wait') +
    lbl(32, 118, 'the cook stands idle', P.ink2) +
    T(32, 150, 'downloads, files,', { s: 12.5, w: 700, a: 'start', f: P.ink2 }) +
    T(32, 170, 'a timer, a database', { s: 12.5, w: 700, a: 'start', f: P.ink2 }) +
    T(152, 216, 'more cooks help: threads', { s: 13, f: P.ok }) +
    box(308, 14, 280, 222, P.white, 14) +
    T(448, 44, 'Heavy work', { s: 17, f: P.accent }) +
    bar(328, 62, 240, 'chopping: 1 s', 'work') +
    lbl(328, 118, 'the cook is busy every moment', P.ink2) +
    T(328, 150, 'big sums, resizing photos,', { s: 12.5, w: 700, a: 'start', f: P.ink2 }) +
    T(328, 170, 'counting to 40 million', { s: 12.5, w: 700, a: 'start', f: P.ink2 }) +
    T(448, 216, 'more kitchens help: processes', { s: 13, f: P.ok }));
  const oneCook = [
    'import time',
    '',
    '',
    'def cook(order):',
    '    time.sleep(1)  # waiting for the oven: the cook just stands there',
    '    return f"{order} ready"',
    '',
    '',
    'orders = ["pasta", "chili", "pudding"]',
    '',
    'start = time.perf_counter()',
    'for order in orders:',
    '    print(cook(order))',
    'print(f"one cook took {time.perf_counter() - start:.1f} s")'
  ];
  const ideaPic = `<div style="width:100%;min-width:0">${ideaSvg}${run(oneCook, { title: 'one_cook.py' })}</div>`;

  /* ---- The code: ThreadPoolExecutor ---- */
  const threeCooks = [
    'import time',
    'from concurrent.futures import ThreadPoolExecutor',
    '',
    '',
    'def cook(order):',
    '    time.sleep(1)  # waiting for the oven',
    '    return f"{order} ready"',
    '',
    '',
    'orders = ["pasta", "chili", "pudding"]',
    '',
    'start = time.perf_counter()',
    'with ThreadPoolExecutor(max_workers=3) as pool:',
    '    for dish in pool.map(cook, orders):',
    '        print(dish)',
    'print(f"three cooks took {time.perf_counter() - start:.1f} s")'
  ];
  const threeRun = ['$ python3 three_cooks.py', 'pasta ready', 'chili ready', 'pudding ready', 'three cooks took 1.0 s'];
  const X0 = 150, PX = 140;
  const timeSvg = svg(600, 246, 'Two timelines for three orders that each wait 1 second. One cook: pasta from 0 to 1 second, chili from 1 to 2, pudding from 2 to 3. Done at 3 seconds. Three cooks, three threads: pasta, chili and pudding all wait from 0 to 1 second at the same time. Done at about 1 second.',
    T(14, 22, 'one cook', { s: 13.5, a: 'start' }) +
    lbl(14, 51, 'cook', P.ink2) + bar(X0, 32, PX - 4, 'pasta', 'wait') + bar(X0 + PX, 32, PX - 4, 'chili', 'wait') + bar(X0 + 2 * PX, 32, PX - 4, 'pudding', 'wait') +
    T(X0 + 3 * PX + 8, 52, '3 s', { s: 14, a: 'start', f: P.danger }) +
    T(14, 96, 'three cooks (threads)', { s: 13.5, a: 'start' }) +
    lbl(14, 125, 'thread 1', P.ink2) + bar(X0, 106, PX - 4, 'pasta', 'wait') +
    lbl(14, 161, 'thread 2', P.ink2) + bar(X0, 142, PX - 4, 'chili', 'wait') +
    lbl(14, 197, 'thread 3', P.ink2) + bar(X0, 178, PX - 4, 'pudding', 'wait') +
    T(X0 + PX + 8, 162, 'about 1 s', { s: 14, a: 'start', f: P.ok }) +
    axis(X0, 214, 3, PX));
  const thisKitchen = [
    'from concurrent.futures import ThreadPoolExecutor',
    '',
    'orders = ["pasta", "chili", "pudding"]',
    '',
    'try:',
    '    with ThreadPoolExecutor(max_workers=3) as pool:',
    '        print(list(pool.map(len, orders)))',
    'except RuntimeError as error:',
    '    print("No extra cooks in this kitchen:", error)'
  ];
  const kitchenMac = ['$ python3 this_kitchen.py', '[5, 5, 7]'];
  const codePic = `<div style="width:100%;min-width:0">${code(threeCooks, { title: 'three_cooks.py', hi: [2, 13, 14] })}${term(threeRun, 'terminal, Python 3.15')}${timeSvg}` +
    `${run(thisKitchen, { title: 'this_kitchen.py' })}${term(kitchenMac, 'the same file on a Mac, Python 3.15')}</div>`;

  /* ---- The pain: two cooks, one whiteboard ---- */
  const step = (x, y, s, kind) => {
    const fill = kind === 'read' ? P.tint : kind === 'bad' ? P.dangerT : kind === 'ok' ? P.okT : P.sand;
    const col = kind === 'read' ? P.accent : kind === 'bad' ? P.danger : kind === 'ok' ? P.ok : P.mute;
    return `<rect x="${x}" y="${y}" width="104" height="30" rx="7" fill="${fill}" stroke="${col}" stroke-width="2"/>` + T(x + 52, y + 20, s, { s: 12.5, f: col });
  };
  const boardCol = (x, v, col) => T(x + 52, 166, v, { s: 22, f: col || P.ink, m: true });
  const raceSvg = svg(600, 214, 'An unlucky order of steps. The whiteboard says 5 plates served. Step 1, cook 1 reads 5. Step 2, cook 2 reads 5, before cook 1 has written. Step 3, cook 1 writes 5 plus 1, so 6. Step 4, cook 2 writes its own 5 plus 1, also 6. Two plates went out, but the whiteboard went from 5 to 6, not 7. One plate is lost.',
    [1, 2, 3, 4].map(i => `<circle cx="${130 + (i - 1) * 116 + 52}" cy="18" r="12" fill="${P.ink}"/>` + T(130 + (i - 1) * 116 + 52, 23, String(i), { s: 12, f: P.white })).join('') +
    lbl(14, 56, 'cook 1') + lbl(14, 102, 'cook 2') + lbl(14, 166, 'whiteboard', P.ink2) +
    step(130, 36, 'read 5', 'read') + step(246, 82, 'read 5', 'read') + step(362, 36, 'write 6', 'bad') + step(478, 82, 'write 6', 'bad') +
    `<line x1="124" y1="132" x2="590" y2="132" stroke="${P.sand}" stroke-width="2"/>` +
    boardCol(130, '5') + boardCol(246, '5') + boardCol(362, '6') + boardCol(478, '6', P.danger) +
    T(300, 204, '2 plates went out. The board says 6, not 7.', { s: 13.5, f: P.danger }));
  const unlucky = [
    'board = {"served": 5}',
    '',
    '',
    'def cook(name):',
    '    seen = board["served"]',
    '    print(f"{name} reads {seen}")',
    '    yield  # pause here: the other cook may move now',
    '    board["served"] = seen + 1',
    '    print(f"{name} writes {seen + 1}")',
    '',
    '',
    'cooks = {1: cook("cook 1"), 2: cook("cook 2")}',
    'turns = [1, 2, 1, 2]  # who moves next? You never choose this.',
    'for turn in turns:',
    '    next(cooks[turn], None)',
    '',
    'print("whiteboard:", board["served"], "| 2 more plates, so it should be 7")'
  ];
  const whiteboard = [
    'import time',
    'from concurrent.futures import ThreadPoolExecutor',
    '',
    'board = {"served": 0}',
    '',
    '',
    'def serve(plates):',
    '    for plate in range(plates):',
    '        seen = board["served"]      # read',
    '        time.sleep(0.001)           # glance at the pan',
    '        board["served"] = seen + 1  # add 1 and write',
    '',
    '',
    'with ThreadPoolExecutor(max_workers=3) as pool:',
    '    list(pool.map(serve, [10, 10, 10]))',
    'print("plates served:", board["served"], "| should be 30")'
  ];
  const whiteRun = ['$ python3 whiteboard.py', 'plates served: 10 | should be 30', '$ python3 whiteboard.py', 'plates served: 10 | should be 30'];
  const painPic = `<div style="width:100%;min-width:0">${raceSvg}${run(unlucky, { title: 'unlucky.py' })}` +
    code(whiteboard, { title: 'whiteboard.py: three real threads', bad: [9, 10, 11] }) + term(whiteRun, 'terminal, Python 3.15') + `</div>`;

  /* ---- The fix: a lock ---- */
  const lockSvg = svg(600, 214, 'The same two cooks with a lock on the whiteboard. Cook 1 takes the lock, reads 5, writes 6, and gives the lock back. Meanwhile cook 2 wants to read, finds the board locked, and waits. Then cook 2 takes the lock, reads 6 and writes 7. Two plates, and the board went from 5 to 7.',
    [1, 2, 3, 4].map(i => `<circle cx="${130 + (i - 1) * 116 + 52}" cy="18" r="12" fill="${P.ink}"/>` + T(130 + (i - 1) * 116 + 52, 23, String(i), { s: 12, f: P.white })).join('') +
    lbl(14, 56, 'cook 1') + lbl(14, 102, 'cook 2') + lbl(14, 166, 'whiteboard', P.ink2) +
    `<rect x="126" y="31" width="228" height="40" rx="10" fill="none" stroke="${P.warn}" stroke-width="2.5" stroke-dasharray="6 5"/>` +
    `<rect x="358" y="77" width="228" height="40" rx="10" fill="none" stroke="${P.warn}" stroke-width="2.5" stroke-dasharray="6 5"/>` +
    step(130, 36, 'read 5', 'read') + step(246, 36, 'write 6', 'ok') + step(246, 82, 'waits', 'wait') + step(362, 82, 'read 6', 'read') + step(478, 82, 'write 7', 'ok') +
    `<line x1="124" y1="132" x2="590" y2="132" stroke="${P.sand}" stroke-width="2"/>` +
    boardCol(130, '5') + boardCol(246, '6') + boardCol(362, '6') + boardCol(478, '7', P.ok) +
    T(300, 204, 'Dashed box: holding the lock. Read and write stay together.', { s: 13, f: P.warn }));
  const locked = [
    'import threading',
    '',
    'board = {"served": 5}',
    'lock = threading.Lock()',
    '',
    '',
    'def cook(name):',
    '    while lock.locked():',
    '        print(f"{name} waits: the whiteboard is locked")',
    '        yield',
    '    with lock:',
    '        seen = board["served"]',
    '        print(f"{name} reads {seen}")',
    '        yield  # pause here: the other cook may move now',
    '        board["served"] = seen + 1',
    '        print(f"{name} writes {seen + 1}")',
    '',
    '',
    'cooks = {1: cook("cook 1"), 2: cook("cook 2")}',
    'turns = [1, 2, 1, 2, 1, 2]',
    'for turn in turns:',
    '    next(cooks[turn], None)',
    '',
    'print("whiteboard:", board["served"], "| 2 more plates, so it should be 7")',
    'print("lock still held?", lock.locked())'
  ];
  const lockedReal = [
    'import threading',
    'import time',
    'from concurrent.futures import ThreadPoolExecutor',
    '',
    'board = {"served": 0}',
    'lock = threading.Lock()',
    '',
    '',
    'def serve(plates):',
    '    for plate in range(plates):',
    '        with lock:',
    '            seen = board["served"]',
    '            time.sleep(0.001)',
    '            board["served"] = seen + 1',
    '',
    '',
    'with ThreadPoolExecutor(max_workers=3) as pool:',
    '    list(pool.map(serve, [10, 10, 10]))',
    'print("plates served:", board["served"], "| should be 30")'
  ];
  const lockedRun = ['$ python3 whiteboard.py', 'plates served: 30 | should be 30'];
  const fixPic = `<div style="width:100%;min-width:0">${lockSvg}${run(locked, { title: 'locked.py' })}` +
    code(lockedReal, { title: 'whiteboard.py, with the lock', good: [6, 11, 12, 13, 14] }) + term(lockedRun, 'terminal, Python 3.15') + `</div>`;

  /* ---- Try it: heavy work, the GIL, processes and free-threading ---- */
  const chop = [
    'import sys',
    'import time',
    '',
    '',
    'def chop(cuts):',
    '    done = 0',
    '    for cut in range(cuts):',
    '        done += 1  # real work: the cook is busy every moment',
    '    return done',
    '',
    '',
    'start = time.perf_counter()',
    'print(chop(10_000_000), "cuts")',
    'print(f"one bowl took {time.perf_counter() - start:.1f} s")',
    'print("Is the GIL on?", sys._is_gil_enabled())'
  ];
  const GX = 150, GP = 140;
  const slices = Array.from({ length: 15 }, (_, k) => {
    const lane = k % 3;
    return `<rect x="${GX + k * 26}" y="${40 + lane * 26}" width="25" height="22" rx="4" fill="${P.accent}" stroke="${P.ink}" stroke-width="1.5"/>`;
  }).join('');
  const lanes3 = (y0, names) => names.map((n, i) => T(14, y0 + i * 26 + 16, n, { s: 12, w: 700, a: 'start', f: P.ink2 })).join('');
  const gilSvg = svg(600, 380, 'Three bowls of chopping on three kinds of kitchen. Normal build, 3 threads: one talking stick, the GIL. Only the thread holding it runs Python, so the three threads take turns in tiny slices, and it takes as long as one cook. 3 processes: three separate kitchens, each with its own Python and its own GIL. All three chop at the same time. Free-threaded build, new and officially supported since Python 3.14: no stick, so the three threads in one kitchen chop at the same time.',
    T(14, 22, 'Normal Python, 3 threads: one talking stick (the GIL)', { s: 13.5, a: 'start' }) +
    lanes3(40, ['thread 1', 'thread 2', 'thread 3']) + slices +
    `<rect x="${GX + 14 * 26 + 34}" y="88" width="46" height="24" rx="12" fill="#FFC24B" stroke="${P.ink}" stroke-width="2"/>` + T(GX + 14 * 26 + 57, 105, 'GIL', { s: 12 }) +
    T(14, 140, 'they take turns: no faster than one cook', { s: 12.5, a: 'start', f: P.danger }) +
    T(14, 172, '3 processes: 3 kitchens, each with its own Python', { s: 13.5, a: 'start' }) +
    [0, 1, 2].map(i => `<rect x="10" y="${184 + i * 28}" width="${GX + GP + 30}" height="26" rx="6" fill="none" stroke="${P.ink}" stroke-width="1.5"/>` +
      T(16, 202 + i * 28, 'kitchen ' + (i + 1), { s: 12, w: 700, a: 'start', f: P.ink2 }) + `<rect x="${GX}" y="${187 + i * 28}" width="${GP - 4}" height="20" rx="4" fill="${P.accent}" stroke="${P.ink}" stroke-width="1.5"/>`).join('') +
    T(GX + GP + 50, 216, 'all at once', { s: 13, a: 'start', f: P.ok }) +
    T(GX + GP + 50, 234, '(+ time to open the kitchens)', { s: 11.5, w: 700, a: 'start', f: P.ink2 }) +
    T(14, 290, 'Free-threaded build (3.14+): no stick', { s: 13.5, a: 'start' }) +
    lanes3(300, ['thread 1', 'thread 2', 'thread 3']) +
    [0, 1, 2].map(i => `<rect x="${GX}" y="${302 + i * 26}" width="${GP - 4}" height="20" rx="4" fill="${P.accent}" stroke="${P.ink}" stroke-width="1.5"/>`).join('') +
    T(GX + GP + 20, 336, 'one kitchen, all at once', { s: 13, a: 'start', f: P.ok }) +
    `<rect x="${GX + GP + 210}" y="318" width="46" height="24" rx="12" fill="#FFC24B" stroke="${P.mute}" stroke-width="2" opacity="0.45"/>` +
    `<line x1="${GX + GP + 204}" y1="346" x2="${GX + GP + 262}" y2="314" stroke="${P.danger}" stroke-width="3"/>`);
  const bowls = [
    'import time',
    'from concurrent.futures import ProcessPoolExecutor, ThreadPoolExecutor',
    '',
    '',
    'def chop(cuts):',
    '    done = 0',
    '    for cut in range(cuts):',
    '        done += 1',
    '    return done',
    '',
    '',
    'bowls = [40_000_000, 40_000_000, 40_000_000]',
    '',
    'if __name__ == "__main__":',
    '    start = time.perf_counter()',
    '    print([chop(bowl) for bowl in bowls])',
    '    print(f"one cook: {time.perf_counter() - start:.1f} s")',
    '',
    '    start = time.perf_counter()',
    '    with ThreadPoolExecutor(max_workers=3) as pool:',
    '        print(list(pool.map(chop, bowls)))',
    '    print(f"three threads: {time.perf_counter() - start:.1f} s")',
    '',
    '    start = time.perf_counter()',
    '    with ProcessPoolExecutor(max_workers=3) as pool:',
    '        print(list(pool.map(chop, bowls)))',
    '    print(f"three processes: {time.perf_counter() - start:.1f} s")'
  ];
  const bowlsRun = ['$ python3 bowls.py', '[40000000, 40000000, 40000000]', 'one cook: 1.2 s', '[40000000, 40000000, 40000000]', 'three threads: 1.2 s', '[40000000, 40000000, 40000000]', 'three processes: 0.5 s'];
  const gilRun = [
    '$ python3 -c "import sys; print(sys._is_gil_enabled())"',
    'True',
    '$ python3 -X gil=0 -c "print(1)"',
    'Fatal Python error: config_read_gil: Disabling the GIL is not supported by this build',
    'Python runtime state: preinitialized',
    '# the normal build always has the stick. A free-threaded Python is a separate',
    '# program, usually named python3.14t or python3.15t (t for threads).'
  ];
  const tryPic = `<div style="width:100%;min-width:0">${run(chop, { title: 'chop.py' })}${gilSvg}` +
    code(bowls, { title: 'bowls.py', hi: [14, 20, 25] }) + term(bowlsRun, 'terminal, Python 3.15, a Mac with 10 cores') + term(gilRun, 'terminal, Python 3.15 (the normal build)') + `</div>`;

  /* ---- The catch ---- */
  const catchPy = [
    'from concurrent.futures import ProcessPoolExecutor',
    '',
    'plates = []',
    '',
    '',
    'def serve(dish):',
    '    plates.append(dish)',
    '    return len(plates)',
    '',
    '',
    'if __name__ == "__main__":',
    '    with ProcessPoolExecutor(max_workers=3) as pool:',
    '        list(pool.map(serve, ["pasta", "chili", "pudding"]))',
    '    print("plates in the main kitchen:", plates)'
  ];
  const catchRun = ['$ python3 own_jars.py', 'plates in the main kitchen: []'];
  const noGuard = [
    '$ python3 no_guard.py',
    '# ...about 280 lines of tracebacks from the new kitchens. The lines that matter:',
    'RuntimeError: ',
    '        An attempt has been made to start a new process before the',
    '        current process has finished its bootstrapping phase.',
    'concurrent.futures.process.BrokenProcessPool: A process in the process pool was terminated abruptly while the future was running or pending.'
  ];
  const lost = [
    'from concurrent.futures import ThreadPoolExecutor',
    '',
    '',
    'def per_plate(plates):',
    '    return 820 // plates  # Ben\'s chili, in kcal per plate',
    '',
    '',
    'with ThreadPoolExecutor(max_workers=3) as pool:',
    '    pool.map(per_plate, [2, 0, 1])',
    'print("done. No error?")'
  ];
  const lostRun = [
    '$ python3 lost_error.py',
    'done. No error?',
    '# now read the results: print(list(pool.map(per_plate, [2, 0, 1])))',
    '$ python3 lost_error.py',
    'Traceback (most recent call last):',
    '  ...',
    '    return 820 // plates  # Ben\'s chili, in kcal per plate',
    '           ~~~~^^~~~~~~~',
    'ZeroDivisionError: division by zero'
  ];
  const catchPic = `<div style="width:100%;min-width:0">${code(catchPy, { title: 'own_jars.py', hi: [3, 7] })}${term(catchRun, 'terminal, Python 3.15')}` +
    term(noGuard, 'terminal, Python 3.15: the same pool without if __name__ == "__main__":') +
    code(lost, { title: 'lost_error.py', bad: [9] }) + term(lostRun, 'terminal, Python 3.15') + `</div>`;

  COURSE.add({
    id: 'l99', minutes: 16,
    summary: 'There are two kinds of slow. <b>Waiting work</b>: the dish sits in the oven, a download, a file, a timer, and the cook just stands there. <b>Heavy work</b>: chopping, big sums, and the cook is busy every moment. For waiting work, use <b>threads</b>: <code>with ThreadPoolExecutor(max_workers=3) as pool:</code> and <code>pool.map(cook, orders)</code> lets three cooks wait at the same time, so three 1-second orders take about 1 second, not 3, and the results come back in order. For heavy work, normal Python has <b>one talking stick, the GIL</b> (Global Interpreter Lock): only one thread runs Python at a time, so threads are no faster. <b>Processes</b> are separate kitchens, each with its own Python: <code>ProcessPoolExecutor</code> really chops in parallel, needs <code>if __name__ == "__main__":</code>, and its kitchens do not share your variables. The <b>free-threaded build</b> (<code>python3.14t</code>, officially supported since 3.14) removes the stick. Whatever you use, two cooks that <b>read, add and write</b> the same thing can lose an update. Guard it with <code>lock = threading.Lock()</code> and <code>with lock:</code>.',
    video: {
      src: 'videos/l99-concurrency.mp4', poster: 'videos/l99-concurrency.jpg', length: '1 min 12 s',
      script: [
        'Three orders. Each one waits 1 second in the oven. One cook does them one after another. 3 seconds.',
        'But waiting is not working. Hire 3 cooks. In Python, they are threads. All 3 wait together, and everything is ready in about 1 second.',
        'Now real work. Chopping 3 big bowls of carrots. 3 threads again. But the kitchen has one talking stick, called the GIL. Only the cook holding it may chop. They take turns, so it is no faster.',
        'Processes are 3 separate kitchens, each with its own Python. All 3 chop at the same time.',
        'And the free-threaded build, officially supported since Python 3.14, takes the stick away.',
        'One more danger. Two cooks read the whiteboard. 5 plates served. Each adds one, and both write 6. Two plates went out, but only one was counted. Lock the whiteboard. One cook at a time.',
        'Threads help with waiting. Processes or free-threading help with heavy work. Shared things need a lock.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Two kinds of slow: waiting, and working.',
        text: [
          'Tonight three orders come in: pasta for Ana, chili for Ben, pudding for Chloe. Each one goes in the oven for a while. A program is slow for one of two reasons, and the fix depends on which one.',
          '<b>Waiting work.</b> The dish is in the oven, and the cook just <b>stands there</b>. In programs that is a download, reading a big file, asking a database, or a timer. The computer is not busy at all. It is waiting for something outside.',
          '<b>Heavy work.</b> Chopping a mountain of carrots. The cook is <b>busy every moment</b>. In programs that is a big sum, resizing photos, or a loop that runs 40 million times.',
          'Press <b>Run</b> on <code>one_cook.py</code>. <code>time.sleep(1)</code> (lesson 62) stands in for the oven: it waits 1 second and does nothing. One cook, one order after another: <code>3.0 s</code>. Change <code>sleep(1)</code> to <code>sleep(0.5)</code> and run again, or add a fourth order. The total is always every wait added up.'
        ],
        tip: '<b>Concurrency</b> means several jobs are in progress at the same time, even if only one moves at any moment. <b>Parallel</b> means several jobs really move at the same moment, on different cores of the chip. Waiting work needs the first. Heavy work needs the second.'
      },
      {
        label: 'The code', pic: codePic,
        h: 'Three cooks wait together: ThreadPoolExecutor.',
        text: [
          'A <b>thread</b> is one more cook in the same kitchen. Same jars, same pantry, its own place in the recipe. The easy way to hire some is <code>ThreadPoolExecutor</code> from the standard <code>concurrent.futures</code> module.',
          '<code>with ThreadPoolExecutor(max_workers=3) as pool:</code> opens a pool of <b>3 cooks</b>. It is a context manager (lesson 85): at the end of the <code>with</code> block it <b>waits for every cook to finish</b>, then sends them home. <code>pool.map(cook, orders)</code> works like <code>map</code> from lesson 81: it calls <code>cook</code> on every order, but now the three calls run at the same time.',
          'The three cooks put their dishes in the oven together and wait together: <code>1.0 s</code> instead of <code>3.0 s</code>. And <code>pool.map</code> hands back the results <b>in the same order as the orders</b>, even if chili happens to finish first.',
          '<b>One catch for this page.</b> Your browser\'s Python has only one cook. Press <b>Run</b> on <code>this_kitchen.py</code>: starting a thread fails with <code>RuntimeError: can\'t start new thread</code>, so the <code>except</code> catches it. The same file on a Mac prints <code>[5, 5, 7]</code>. That is why the real threads in this lesson are terminal pictures, run with Python 3.15.'
        ],
        tip: '<code>max_workers=3</code> because there are 3 orders. For downloads, people often use 10 or 20 workers: waiting cooks are cheap. Leave it out and Python picks a number from your computer\'s cores.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'Two cooks, one whiteboard: a plate goes missing.',
        text: [
          'The kitchen has a whiteboard: <b>plates served</b>. Every cook who sends out a plate does three small things: <b>read</b> the number, <b>add 1</b> in their head, <b>write</b> the new number. Lesson 96 showed that Python runs your lines as tiny bytecode steps, and <code>served += 1</code> is 4 of them. Another thread can get its turn <b>between any two steps</b>.',
          'Look at the picture. The board says 5. Cook 1 reads 5. Before cook 1 writes, cook 2 also reads 5. Cook 1 writes 6. Cook 2 writes 6 too. Two plates went out, and the board only went up by one. This is a <b>race condition</b>: the answer depends on who gets there first.',
          'The page cannot run threads, so <code>unlucky.py</code> plays the two cooks step by step. Each cook is a generator (lesson 83): a bare <code>yield</code> pauses it and hands back nothing, and <code>next(cooks[turn], None)</code> (lesson 82) lets that cook do its next step. Press <b>Run</b>: <code>whiteboard: 6</code>. Change <code>turns</code> to <code>[1, 1, 2, 2]</code>, so cook 1 finishes before cook 2 starts: 7. Same code, different luck.',
          'With real threads you never choose the turns. <code>whiteboard.py</code> makes the gap between read and write a little longer with a 1 millisecond glance at the pan, and 3 threads serve 10 plates each. On a Mac it printed <code>10</code> instead of 30, every time we ran it.'
        ],
        warn: 'Without the <code>sleep</code>, plain <code>board["served"] += 1</code> in 3 threads, a million times each, gave the right 3,000,000 in all 5 of our runs on Python 3.15. That is the nasty part: a race can hide for weeks, then lose an order on a busy night. Never trust a shared update to luck.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Lock the whiteboard. One cook at a time.',
        text: [
          '<code>lock = threading.Lock()</code> makes a <b>lock</b>: a pen for the whiteboard that only one cook can hold. <code>with lock:</code> takes the pen, runs the block, and gives it back at the end, <b>always, even if the block raises an error</b>. That is lesson 85\'s context manager again. A cook who wants the pen while another holds it simply <b>waits</b>.',
          'Put the whole <b>read, add, write</b> inside the <code>with lock:</code> block. Now nobody can read the board while someone else is halfway through updating it.',
          'Press <b>Run</b> on <code>locked.py</code>. It is <code>unlucky.py</code> with a lock: cook 2 arrives while cook 1 holds the pen and prints <code>waits</code>. Then it reads 6 and writes 7. <code>lock.locked()</code> says whether someone holds the pen, and at the end it is <code>False</code>: <code>with</code> gave it back. Try <code>turns = [2, 1, 2, 1, 2, 1]</code>. Any order, always 7.',
          'The real threads with the lock printed <code>30</code>. Keep the locked part <b>small</b>: only the lines that touch the shared thing. Everything inside it runs one cook at a time.'
        ],
        tip: 'A lock only helps if <b>every</b> cook uses the same one. One cook who updates the board without <code>with lock:</code> brings the race back.'
      },
      {
        label: 'Try it', pic: tryPic,
        h: 'Heavy work: the talking stick, and two ways around it.',
        text: [
          'Press <b>Run</b> on <code>chop.py</code>. It counts 10 million cuts, which is pure heavy work, and prints how long it took. Double the cuts to <code>20_000_000</code>: the time roughly doubles. The last line asks Python <code>sys._is_gil_enabled()</code> (since 3.13): <code>True</code>.',
          '<b>The GIL</b>, the <b>Global Interpreter Lock</b>, is a talking stick inside normal Python. A thread may run Python bytecode (lesson 96) <b>only while it holds the stick</b>. So three threads that chop just pass the stick around and take turns. On a Mac, <code>bowls.py</code> chopped three bowls in 1.2 s with one cook and 1.2 s with three threads. No faster. Threads still help with waiting, because a waiting thread puts the stick down.',
          '<b>Processes</b> are three separate kitchens. <code>ProcessPoolExecutor</code> starts new copies of Python, each with its <b>own</b> stick, and your computer runs them on different cores: 0.5 s. Every new kitchen first <b>imports your file</b>, which is why the pool must sit under <code>if __name__ == "__main__":</code> (lesson 60). Without it, each kitchen would try to open kitchens of its own.',
          '<b>The free-threaded build</b> is a second kind of Python with the stick removed, so threads chop at the same time in one kitchen. It was an experiment in 3.13 and is <b>officially supported since Python 3.14</b> (PEP 779). It is a separate program, <code>python3.14t</code> or <code>python3.15t</code>, and the normal <code>python3</code> still has the GIL: it even refuses <code>-X gil=0</code>.'
        ],
        tip: 'The underscore in <code>sys._is_gil_enabled()</code> means "for the experts, may change". It is fine for looking, as here. On a free-threaded Python it says <code>False</code>.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Separate kitchens, hidden errors, and when to skip it all.',
        text: [
          '<b>Processes do not share jars.</b> Each kitchen has its own copy of your variables. In <code>own_jars.py</code> three processes each append a dish to <code>plates</code>, and the main kitchen still has <code>[]</code>. Send values back with <code>return</code>, and use the results of <code>pool.map</code>. Opening a kitchen also costs time: 3 processes took 0.5 s, not a third of 1.2 s.',
          '<b>Errors hide until you read the results.</b> If a cook raises an error, <code>pool.map</code> keeps it until you ask for that result. <code>lost_error.py</code> divides by zero in one thread and still prints <code>done. No error?</code>. Wrap it in <code>list(...)</code>, as every example here does, and the <code>ZeroDivisionError</code> appears.',
          '<b>Free-threading is not magic.</b> Without the stick, two threads really do read and write at the same moment, so <b>you still need locks</b> for shared things. Some packages are not ready for it yet, and plain single-threaded code can run a little slower on it.',
          '<b>Most programs need none of this.</b> First measure which step is slow (lesson 98, Performance and profiling). If it is waiting on many downloads or messages, lesson 100, async and await, shows another way: one cook who starts the rice and chops while it cooks.'
        ],
        warn: 'Use threads for waiting, processes (or the free-threaded build) for heavy work, and a lock for anything two cooks change.'
      }
    ],
    exercises: [
      {
        file: 'l99_three_cooks.py', title: 'Three cooks, one whiteboard',
        task: 'Three orders each wait half a second in the oven. Make <code>three_cooks()</code> cook them with a <code>ThreadPoolExecutor</code> so they wait together and come back in order. Then make <code>serve()</code> update the shared whiteboard inside <code>with board_lock:</code>, so 3 threads with 10000 plates each always end at 30000.',
        steps: [
          'Press <b>Open in VS Code</b> and run the file as it is. STEP 1 shows one cook and "three cooks" both taking about 1.5 s.',
          'Between <code>START</code> and <code>END</code>, change <code>three_cooks()</code>: <code>with ThreadPoolExecutor(max_workers=3) as pool:</code> and return <code>list(pool.map(cook, orders))</code>. Run it: about 0.5 s.',
          'Now STEP 2 counts how often the lock was taken. Put <code>board["served"] += 1</code> inside <code>with board_lock:</code>, inside the <code>for</code> loop.',
          'Run it until it says <code>PASS</code>. Bonus: change <code>max_workers=3</code> to <code>1</code> and watch the time go back to 1.5 s.'
        ]
      }
    ],
    quiz: [
      {
        type: 'bucket', q: 'Which helper speeds up each job on normal Python?',
        buckets: ['Waiting work: threads', 'Heavy work: processes'],
        items: [
          ['downloading 20 recipe pages', 0],
          ['asking a database for 50 orders', 0],
          ['reading 30 files from a slow drive', 0],
          ['counting to 40 million', 1],
          ['resizing 500 food photos', 1],
          ['checking every pair of 10,000 meals', 1]
        ],
        why: 'While a thread waits for the network, a file or a database, it puts the GIL down and the other threads carry on. Heavy work keeps the cook busy every moment, and with one talking stick only one thread can chop. Separate processes each have their own Python, so they really chop in parallel.',
        hint: 'Is the cook standing by the oven, or busy chopping?'
      },
      {
        type: 'pick', q: 'Four downloads each wait 2 seconds. How long does this take, roughly?',
        pic: code(['with ThreadPoolExecutor(max_workers=4) as pool:', '    pages = list(pool.map(download, urls))  # 4 urls'], { title: 'fetch.py' }),
        options: ['about 2 seconds', 'about 8 seconds', 'about 0.5 seconds', 'about 4 seconds'],
        answer: 0,
        why: 'Four cooks wait at the same time, so the total is about one wait: 2 seconds, plus a little. One cook alone would take 4 × 2 = 8 seconds. Threads cannot make one wait shorter than it is.',
        hint: 'All four wait together. How long is one wait?'
      },
      {
        type: 'pick', q: 'Ben runs a heavy counting job in 3 threads on normal Python 3.15. It takes as long as 1 thread. Why?',
        options: ['The GIL lets only one thread run Python at a time, so they take turns', 'ThreadPoolExecutor runs the jobs one after another on purpose', 'His Mac has only one core', 'He forgot if __name__ == "__main__":'],
        answer: 0,
        why: 'One talking stick: a thread runs Python bytecode only while it holds the GIL. For heavy work the three threads just pass it around. Use <code>ProcessPoolExecutor</code>, or a free-threaded Python like <code>python3.14t</code>, for real parallel work.',
        hint: 'What is the talking stick called?'
      },
      {
        type: 'fix', q: 'Two cooks play their steps in this unlucky order, and the board ends at 6. Add a lock so it ends at <b>7</b>. Do not change <code>turns</code>.',
        code: [
          'import threading',
          '',
          'board = {"served": 5}',
          'lock = threading.Lock()',
          '',
          '',
          'def cook(name):',
          '    while lock.locked():',
          '        print(f"{name} waits")',
          '        yield',
          '    seen = board["served"]',
          '    print(f"{name} reads {seen}")',
          '    yield',
          '    board["served"] = seen + 1',
          '    print(f"{name} writes {seen + 1}")',
          '',
          '',
          'cooks = {1: cook("cook 1"), 2: cook("cook 2")}',
          'turns = [1, 2, 1, 2, 1, 2]',
          'for turn in turns:',
          '    next(cooks[turn], None)',
          '',
          'print("whiteboard:", board["served"])'
        ],
        title: 'board.py',
        check: [
          'if globals().get("turns") != [1, 2, 1, 2, 1, 2]:',
          '    msg = "Keep turns = [1, 2, 1, 2, 1, 2]. The cooks do not choose their turns, the lock has to do the work."',
          'elif board.get("served") == 6:',
          '    msg = "Still 6: both cooks read 5. Put the read, the yield and the write inside  with lock:  (indent those 5 lines)."',
          'elif board.get("served") != 7:',
          '    msg = "The board should end at 7: two more plates on top of 5. It is " + str(board.get("served")) + "."',
          'elif "waits" not in out:',
          '    msg = "It says 7, but cook 2 never waited. Use the lock with  with lock:  around the read and the write."',
          'elif lock.locked():',
          '    msg = "The lock is still held at the end. Use  with lock:  so it is always given back."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: 'With <code>with lock:</code> around the read, the <code>yield</code> and the write, cook 2 finds the board locked, prints <code>cook 2 waits</code>, and only reads after cook 1 has written 6. Then it reads 6 and writes 7. <code>with</code> gives the lock back when the block ends.',
        hint: 'Add  with lock:  above  seen = board["served"]  and indent the 5 lines below it under it.'
      },
      {
        type: 'match', q: 'Match each tool to its job.',
        pairs: [
          ['ThreadPoolExecutor', 'several cooks who wait at the same time'],
          ['ProcessPoolExecutor', 'separate kitchens, each with its own Python'],
          ['threading.Lock()', 'one pen for a shared whiteboard'],
          ['the GIL', 'the talking stick: one thread runs Python at a time'],
          ['python3.14t', 'a Python without the talking stick']
        ],
        why: 'Threads share one kitchen and are great for waiting. Processes are separate kitchens for heavy work. A lock guards something two cooks change. The GIL is the stick in normal Python, and the free-threaded build (the <b>t</b> is for threads) removes it.',
        hint: 'The t at the end of python3.14t stands for threads.'
      },
      {
        type: 'pick', q: 'Back to lesson 60. Why must a <code>ProcessPoolExecutor</code> sit under <code>if __name__ == "__main__":</code>?',
        pic: code(['def chop(cuts):', '    ...', '', '', 'if __name__ == "__main__":', '    with ProcessPoolExecutor(max_workers=3) as pool:', '        print(list(pool.map(chop, bowls)))'], { title: 'bowls.py' }),
        options: ['Each new kitchen imports your file first. The guard stops it from starting kitchens of its own', 'It makes the processes run faster', 'Without it, chop() cannot be found by name', 'ProcessPoolExecutor only works inside an if'],
        answer: 0,
        why: 'A new process starts a fresh Python that imports your file to find <code>chop</code>. When it is imported, <code>__name__</code> is not <code>"__main__"</code>, so the guarded lines do not run in the new kitchen. Without the guard, Python 3.15 on a Mac stops with <code>RuntimeError: An attempt has been made to start a new process before the current process has finished its bootstrapping phase</code>.',
        hint: 'What does a module\'s top-level code do when the file is imported?'
      },
      {
        type: 'fill', q: 'Finish the safe update: the shared counter must never lose a plate.',
        text: 'import threading\n\nboard = {"served": 0}\nlock = threading.___()\n\n\ndef serve(plates):\n    for plate in range(plates):\n        ___ lock:\n            board["served"] += 1',
        options: ['Lock', 'with', 'Thread', 'try', 'global', 'Pool'],
        answer: ['Lock', 'with'],
        why: '<code>threading.Lock()</code> makes the lock. <code>with lock:</code> takes it for the update and always gives it back. <code>try</code> would not take the lock at all, and <code>Thread</code> makes a new cook, not a pen.',
        hint: 'One word makes the pen. One word holds it for a block.'
      },
      {
        type: 'pick', q: 'Which of these are true? Pick all that apply.',
        options: ['The free-threaded build is officially supported since Python 3.14', 'With the free-threaded build you still need locks for shared things', 'Three processes can change the same list in your main program', 'pool.map gives the results back in the same order as the inputs', 'This page\'s Python can start real threads'],
        answer: [0, 1, 3],
        why: 'PEP 779 made the free-threaded build officially supported in 3.14. Without the stick, threads really run at the same moment, so races are still possible and locks are still needed. Processes each have their own copy of your variables, so the main list stays empty. In the browser, starting a thread raises <code>RuntimeError: can\'t start new thread</code>.',
        hint: 'Two of the options are about separate kitchens and this page.'
      }
    ]
  });
})();
