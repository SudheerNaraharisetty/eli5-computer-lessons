/* Lesson 100: async and await (module 9). One file per lesson.
   Output checked with Python 3.15.2 (Homebrew, macOS) and Python 3.14.4 on 2026-11-23.
   The Run boxes were also checked in this page (Pyodide, Python 3.14). In this page, time.sleep()
   inside async code does NOT block other tasks (Pyodide lets the browser run them), so the
   time.sleep trap is shown as a terminal picture with real Python 3.15 output. */
(function () {
  const { P, code, run, term, svg, box, T, arrow } = PR;

  /* =====================================================================
     l100  async and await
     ===================================================================== */

  // A timeline bar: x0 is minute 0, k pixels per minute.
  const bar = (x0, k, y, from, mins, col, label) =>
    `<rect x="${x0 + from * k}" y="${y}" width="${mins * k}" height="20" rx="5" fill="${col}"/>` +
    T(x0 + from * k + 6, y + 15, label, { s: 11.5, a: 'start', f: P.white });
  const lane = (x, y, name) => T(x, y + 15, name, { s: 12.5, m: true, a: 'start', f: P.ink2 });
  // A small cook face with a chef hat, centre (x, y).
  const cook = (x, y) =>
    `<rect x="${x - 11}" y="${y - 25}" width="22" height="13" rx="6" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<circle cx="${x}" cy="${y}" r="13" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>` +
    `<circle cx="${x - 4.5}" cy="${y - 2}" r="1.8" fill="${P.ink}"/><circle cx="${x + 4.5}" cy="${y - 2}" r="1.8" fill="${P.ink}"/>` +
    `<path d="M${x - 5} ${y + 4} Q${x} ${y + 9} ${x + 5} ${y + 4}" fill="none" stroke="${P.ink}" stroke-width="2"/>`;
  const axis = (x0, k, y) =>
    `<line x1="${x0}" y1="${y}" x2="${x0 + 30 * k}" y2="${y}" stroke="${P.ink}" stroke-width="2.5"/>` +
    [0, 15, 30].map(m => T(x0 + m * k, y + 16, m === 30 ? '30 min' : String(m), { s: 11.5, f: P.mute })).join('');

  /* ---- The idea: one by one, or one cook with many pots ---- */
  const X0 = 120, K = 15;
  const ideaPic = svg(600, 330, 'Two timelines for the same dinner. One by one: rice 15 minutes, then eggs 10, then veg 5, one after another, 30 minutes in all. One cook, many pots: the cook starts the rice, and at each await moves on to start the eggs and the veg, so all three cook at once and dinner is ready after 15 minutes, the time of the longest dish.',
    T(20, 22, 'ONE BY ONE', { s: 12, a: 'start', f: P.danger }) + T(580, 22, 'stare at each pot: 30 min', { s: 12, w: 700, a: 'end', f: P.danger }) +
    lane(20, 34, 'rice') + lane(20, 60, 'eggs') + lane(20, 86, 'veg') +
    bar(X0, K, 34, 0, 15, P.warn, '15 min') + bar(X0, K, 60, 15, 10, P.accent, '10 min') + bar(X0, K, 86, 25, 5, P.ok, '5') +
    axis(X0, K, 118) +
    `<line x1="20" y1="152" x2="580" y2="152" stroke="${P.sand}" stroke-width="3" stroke-dasharray="6 8"/>` +
    T(20, 180, 'ONE COOK, MANY POTS', { s: 12, a: 'start', f: P.ok }) + T(580, 180, 'start it, move on: 15 min', { s: 12, w: 700, a: 'end', f: P.ok }) +
    lane(20, 194, 'rice') + lane(20, 220, 'eggs') + lane(20, 246, 'veg') +
    bar(X0, K, 194, 0, 15, P.warn, '15 min') + bar(X0, K, 220, 0, 10, P.accent, '10 min') + bar(X0, K, 246, 0, 5, P.ok, '5') +
    cook(94, 214) +
    T(92, 262, 'await', { s: 10.5, m: true, a: 'end', f: P.accent }) +
    arrow(104, 224, 116, 230, P.accent, 2) + arrow(100, 228, 116, 254, P.accent, 2) +
    `<line x1="${X0 + 15 * K}" y1="186" x2="${X0 + 15 * K}" y2="274" stroke="${P.ink}" stroke-width="3"/>` +
    axis(X0, K, 278) +
    T(300, 322, 'The pots do the waiting. The cook only starts things, then moves on.', { s: 12.5, w: 700, f: P.ink2 }));

  /* ---- The code: asyncio.gather ---- */
  const dinner = [
    'import asyncio',
    'import time',
    '',
    'MINUTE = 0.1   # 1 kitchen minute = 0.1 real seconds',
    '',
    'async def cook(dish, minutes):',
    '    print(f"{dish} on")',
    '    await asyncio.sleep(minutes * MINUTE)   # the pot cooks, the cook is free',
    '    print(f"{dish} ready")',
    '    return dish',
    '',
    'async def main():',
    '    start = time.perf_counter()',
    '    dishes = await asyncio.gather(cook("rice", 15), cook("eggs", 10), cook("veg", 5))',
    '    print(dishes)',
    '    minutes = (time.perf_counter() - start) / MINUTE',
    '    print(f"dinner after {minutes:.0f} minutes")',
    '',
    'asyncio.run(main())'
  ];

  /* ---- The pain: time.sleep inside async code ---- */
  const asleep = dinner.map(l => l.startsWith('    await asyncio.sleep') ? '    time.sleep(minutes * MINUTE)   # the cook falls asleep at the stove' : l);
  const asleepTerm = term([
    '$ python3 dinner.py',
    'rice on',
    'rice ready',
    'eggs on',
    'eggs ready',
    'veg on',
    'veg ready',
    "['rice', 'eggs', 'veg']",
    'dinner after 30 minutes'
  ], 'terminal, Python 3.15');
  const painPic = `<div style="width:100%;min-width:0">${code(asleep, { title: 'dinner.py', bad: [8] })}${asleepTerm}</div>`;

  /* ---- The fix: await asyncio.sleep, or asyncio.to_thread for a blocking call ---- */
  const fixedTerm = term([
    '$ python3 dinner.py',
    'rice on',
    'eggs on',
    'veg on',
    'veg ready',
    'eggs ready',
    'rice ready',
    "['rice', 'eggs', 'veg']",
    'dinner after 15 minutes'
  ], 'terminal, Python 3.15');
  const toThread = [
    'async def cook(dish, minutes):',
    '    print(f"{dish} on")',
    '    # a blocking call you cannot change? run it in a helper thread',
    '    await asyncio.to_thread(time.sleep, minutes * MINUTE)',
    '    print(f"{dish} ready")',
    '    return dish'
  ];
  const fixPic = `<div style="width:100%;min-width:0">${code(['async def cook(dish, minutes):', '    print(f"{dish} on")', '    await asyncio.sleep(minutes * MINUTE)', '    print(f"{dish} ready")', '    return dish'], { title: 'dinner.py, fixed', good: [3] })}${fixedTerm}${code(toThread, { title: 'dinner.py, with a blocking call', good: [4] })}</div>`;

  /* ---- Try it: asyncio.TaskGroup ---- */
  const group = [
    'import asyncio',
    'import time',
    '',
    'MINUTE = 0.1',
    '',
    'async def cook(dish, minutes):',
    '    await asyncio.sleep(minutes * MINUTE)',
    '    print(f"{dish} ready")',
    '    return dish',
    '',
    'async def main():',
    '    start = time.perf_counter()',
    '    async with asyncio.TaskGroup() as stove:',
    '        rice = stove.create_task(cook("rice", 15))',
    '        eggs = stove.create_task(cook("eggs", 10))',
    '        veg = stove.create_task(cook("veg", 5))',
    '    # here, every task in the group is done',
    '    print(rice.result(), eggs.result(), veg.result())',
    '    minutes = (time.perf_counter() - start) / MINUTE',
    '    print(f"dinner after {minutes:.0f} minutes")',
    '',
    'asyncio.run(main())'
  ];

  /* ---- The catch: forget await ---- */
  const forgot = [
    'import asyncio',
    '',
    'async def cook(dish):',
    '    print(f"{dish} on the stove")',
    '    return dish',
    '',
    'async def main():',
    '    cook("rice")              # no await: the rice never cooks',
    '    pot = cook("eggs")',
    '    print(type(pot).__name__)',
    '    print(await pot)          # await runs it',
    '    print(await cook("veg"))',
    '',
    'asyncio.run(main())'
  ];
  const card = (x, w, head, col, tint, lines) => box(x, 16, w, 210, tint, 12) +
    T(x + w / 2, 44, head, { s: 14, f: col }) +
    lines.map((s, i) => T(x + 12, 74 + i * 22, s, { s: 12, w: 700, a: 'start', f: P.ink2 })).join('');
  const whenPic = svg(600, 256, 'Three cards. Lots of waiting, like many downloads, a web server with many guests, or many timers: use async, one cook with many pots. Lots of working, like counting calories in ten million rows: async does not help, use processes from lesson 99. A small script that waits for one thing: plain code is fine.',
    card(8, 188, 'Lots of waiting', P.ok, P.okT, ['100 recipe downloads', 'a web server, many', '  guests at once', 'many timers or chats', '', 'async: one cook,', '  many pots']) +
    card(206, 188, 'Lots of working', P.danger, P.dangerT, ['count calories in', '  10 million rows', 'resize 500 photos', '', 'async does not help:', '  the cook is busy.', '  Lesson 99: processes']) +
    card(404, 188, 'One small job', P.ink2, P.sand, ['read one file', 'fetch one page', 'a 20-line script', '', 'plain code is fine.', '  async adds work', '  for no speed-up']) +
    T(300, 250, 'async speeds up waiting, never working', { s: 12.5, w: 700, f: P.ink2 }));
  const catchPic = `<div style="width:100%;min-width:0">${run(forgot, { title: 'forgot.py' })}${whenPic}</div>`;

  /* ---- quiz code ---- */
  const oneByOne = [
    'import asyncio',
    'import time',
    '',
    'MINUTE = 0.05',
    '',
    'async def cook(dish, minutes):',
    '    await asyncio.sleep(minutes * MINUTE)',
    '    return dish',
    '',
    'async def main():',
    '    start = time.perf_counter()',
    '    rice = await cook("rice", 15)',
    '    eggs = await cook("eggs", 10)',
    '    veg = await cook("veg", 5)',
    '    print([rice, eggs, veg])',
    '    minutes = (time.perf_counter() - start) / MINUTE',
    '    print(f"dinner after {minutes:.0f} minutes")',
    '',
    'asyncio.run(main())'
  ];

  COURSE.add({
    id: 'l100', minutes: 14,
    summary: '<b>async</b> is one cook with many pots. While the rice simmers, you do not stare at it: you start the eggs. <code>async def</code> makes a <b>coroutine function</b>: a recipe that can pause. Calling it <b>runs nothing yet</b>, it hands back a coroutine object (like a generator, lesson 83). <code>await</code> runs it, and says "I am waiting here, go do something else". <code>asyncio.run(main())</code> starts the <b>event loop</b>, the cook who jumps between pots. <code>asyncio.gather(cook("rice", 15), cook("eggs", 10), cook("veg", 5))</code> runs them <b>together</b>, so dinner takes about as long as the <b>longest</b> dish (15 minutes), not the sum (30), and the results come back in the order you passed them. <code>asyncio.TaskGroup</code> with <code>async with</code> is the modern, tidy way to start several tasks. The trap: <code>time.sleep()</code> inside async code puts the <b>whole cook</b> to sleep and nothing else moves. Use <code>await asyncio.sleep()</code>, or <code>await asyncio.to_thread(...)</code> for a blocking call. Forget <code>await</code> and Python warns: <code>RuntimeWarning: coroutine \'cook\' was never awaited</code>. Async speeds up <b>waiting</b> (network, files, timers), never <b>working</b> (lesson 99).',
    video: {
      src: 'videos/l100-async-and-await.mp4', poster: 'videos/l100-async-and-await.jpg', length: '1 min 8 s',
      script: [
        'Dinner for Ana, Ben and Chloe. Rice takes 15 minutes, eggs take 10, and the veg takes 5.',
        'Cook them one by one, and dinner takes 30 minutes. You stand and stare at each pot.',
        'A good cook starts the rice, and while it cooks, moves on. That is async.',
        'Async def makes a recipe that can pause. At each await, the cook says: I\'m waiting, go do something else.',
        'Asyncio dot gather puts all three on the stove. The rice starts. At await, the cook jumps to the eggs. Await again, on to the veg.',
        'The veg is ready first, then the eggs, then the rice. Dinner in 15 minutes, not 30.',
        'One trap. Time dot sleep in async code puts the cook to sleep at the stove. Nothing else moves. 30 minutes again.',
        'Write await asyncio dot sleep instead. The pot waits, not the cook.',
        'Await says: I\'m waiting, go do something else. One cook, many pots.'
      ]
    },
    parts: [
      {
        label: 'The idea', pic: ideaPic,
        h: 'Start the rice, then move on.',
        text: [
          'Dinner for Ana, Ben and Chloe: rice takes 15 minutes, eggs 10, veg 5. Cook them <b>one by one</b> and dinner takes 30 minutes, and most of that time you stand and stare at a pot. A good cook <b>starts</b> the rice, and while it simmers, starts the eggs, then the veg. Dinner is ready after <b>15 minutes</b>, the time of the longest dish.',
          'Lesson 99 split work in two. <b>Working</b> work keeps the cook busy: chopping, counting. <b>Waiting</b> work does not: a pot simmering, a web page on its way, a file being read. Threads gave you more cooks for the waiting. <b>async</b> does it with <b>one cook</b>: one thread that never sits still while something else could happen.',
          'The cook only switches pots at one word: <code>await</code>. It means "I am waiting for this. Go do something else, and come back when it is ready." So nothing switches by surprise in the middle of your line, and the race conditions of lesson 99 are much rarer.'
        ],
        tip: 'Programmers call this <b>concurrency</b>: many jobs in progress at once. It is not <b>parallel</b> work. Only one line of your code runs at any moment. The speed-up comes from the waiting happening together.'
      },
      {
        label: 'The code', pic: run(dinner, { title: 'dinner.py' }),
        h: 'async def, await, asyncio.run, asyncio.gather.',
        text: [
          '<code>async def cook(...)</code> makes a <b>coroutine function</b>: a recipe that can pause. Like a generator (lesson 83), calling it <b>runs nothing yet</b>. <code>cook("rice", 15)</code> only hands back a <b>coroutine</b> object, a recipe ready to go. <code>await</code> runs it, and the line waits for its result.',
          '<code>await asyncio.sleep(...)</code> is the pot simmering. While this coroutine waits there, the cook is free for other coroutines. <code>asyncio.gather(...)</code> starts all three at once and waits until every one is done. It hands back the results <b>in the order you passed them</b>, rice first, even though the veg finished first. <code>asyncio.run(main())</code> starts the <b>event loop</b>, the cook, and runs <code>main()</code> until it ends.',
          'Press <b>Run</b>: all three go on, the veg is ready first, and dinner takes <b>15 minutes</b> (1.5 real seconds). Now change line 14 to cook one by one: <code>dishes = [await cook("rice", 15), await cook("eggs", 10), await cook("veg", 5)]</code>. Run it again. Each <code>await</code> now waits for its pot before the next one starts: <b>30 minutes</b>.'
        ],
        tip: 'You can only write <code>await</code> inside an <code>async def</code>. That is why the code lives in <code>async def main()</code>, and <code>asyncio.run()</code> starts it from normal code. One <code>asyncio.run()</code> per program, at the bottom, like the <code>if __name__ == "__main__":</code> door of lesson 60.'
      },
      {
        label: 'The pain', pic: painPic,
        h: 'time.sleep puts the whole cook to sleep.',
        text: [
          'A teammate changes one line: <code>time.sleep(minutes * MINUTE)</code> instead of <code>await asyncio.sleep(...)</code>. It looks the same. It waits the same time. In a real terminal, dinner takes <b>30 minutes again</b>, and the output is one by one: rice on, rice ready, eggs on...',
          '<code>time.sleep()</code> does not know about the cook. It does not say "go do something else". It just stops the <b>one</b> thread, so the cook falls asleep at the rice pot and <b>nothing else moves</b>. <code>gather</code> cannot help: there is no <code>await</code> where it could switch.',
          'The same happens with anything that waits <b>without</b> <code>await</code>: a download with the popular <code>requests</code> package (pip, lesson 63), <code>input()</code>, reading a huge file with plain <code>open()</code>, or a long loop of real work. One blocking line stops every task.'
        ],
        warn: 'The Run boxes on this page run inside the browser, which already has its own event loop. <code>asyncio.run()</code> works here, but <code>time.sleep()</code> here does <b>not</b> block the other tasks the way it does on your computer. That is why this part is a terminal picture. Always time async code in a real file.'
      },
      {
        label: 'The fix', pic: fixPic,
        h: 'Every wait gets an await.',
        text: [
          'Put back <code>await asyncio.sleep(...)</code>. Now the pot waits, not the cook. In the terminal the three dishes go on together again, and dinner takes <b>15 minutes</b>.',
          'The rule for async code: <b>every wait must be an <code>await</code></b>. For a web page, use a library made for asyncio, such as <code>httpx</code> or <code>aiohttp</code>, so the download line becomes <code>await client.get(url)</code>. Its async methods pause at <code>await</code> while the data travels.',
          'Stuck with a blocking call you cannot change? Hand it to a helper thread: <code>await asyncio.to_thread(time.sleep, minutes * MINUTE)</code>. The blocking call runs in a thread (lesson 99), and your coroutine waits for it with <code>await</code>, so the cook stays free.'
        ],
        tip: '<code>asyncio.to_thread(func, arg1, arg2)</code> takes the function and its arguments separately, the way <code>pool.map(cook, ...)</code> in lesson 99 took the function, not a call. Write <code>to_thread(time.sleep, 2)</code>, not <code>to_thread(time.sleep(2))</code>.'
      },
      {
        label: 'Try it', pic: run(group, { title: 'stove.py' }),
        h: 'asyncio.TaskGroup: one stove for a group of tasks.',
        text: [
          'Since Python 3.11 there is a tidier way to start several tasks: a <b>TaskGroup</b>. <code>async with asyncio.TaskGroup() as stove:</code> works like the <code>with</code> of lesson 85, but its enter and exit can <code>await</code>. Inside it, <code>stove.create_task(cook("rice", 15))</code> puts a dish on the stove <b>right away</b> and hands back a <b>task</b>.',
          'The <code>async with</code> block does not end until <b>every</b> task in the group is done. After it, <code>rice.result()</code> gives you what <code>cook</code> returned. If one dish fails, the group cancels the others and the error comes out of the block, so no pot is left forgotten on the stove.',
          'Press <b>Run</b>: 15 minutes. Now add Ben\'s tofu inside the block: <code>tofu = stove.create_task(cook("tofu", 12))</code>. Still 15 minutes, because the rice is still the longest. Then make the tofu 20 minutes. Dinner now takes 20.'
        ],
        tip: 'Use <code>gather</code> for a quick "run these and give me a list". Use a <code>TaskGroup</code> when tasks are started in a loop or one by one, or when a failure should stop the rest. Both run the tasks together.'
      },
      {
        label: 'The catch', pic: catchPic,
        h: 'Forget await, and async where it does not help.',
        text: [
          '<b>Forget <code>await</code></b> and the coroutine never runs. Python warns you, as soon as the coroutine is thrown away: <code>RuntimeWarning: coroutine \'cook\' was never awaited</code>. Press <b>Run</b>: the rice never goes on the stove, <code>pot</code> is only a <code>coroutine</code> object, and <code>await pot</code> finally cooks the eggs. Read that warning as "you forgot <code>await</code>".',
          '<b>Async speeds up waiting, never working.</b> The cook can only do one thing at a time. Counting calories in 10 million rows keeps the cook busy, and every other task waits. For working work use processes (lesson 99). For a small script that fetches one page, plain code is simpler: async needs <code>async def</code> all the way up, from the line that waits to <code>asyncio.run()</code>.',
          'Async shines when there is <b>lots of waiting</b>: a web server with thousands of guests, a hundred downloads, many chats or timers. One thread can keep thousands of coroutines going, where thousands of threads would be heavy.'
        ],
        warn: 'Async code is "contagious": a function that uses <code>await</code> must be <code>async def</code>, so its caller must <code>await</code> it, and so on up. Plan where the event loop starts before you turn half a project async.'
      }
    ],
    exercises: [
      {
        file: 'l100_dinner_rush.py', title: 'Dinner rush',
        task: 'Three async dishes cook <b>one by one</b>, and <code>boil_eggs</code> uses <code>time.sleep</code>. Make dinner take about <b>15 kitchen minutes</b> instead of 30: replace <code>time.sleep</code> with <code>await asyncio.sleep</code>, and run the three dishes together with <code>asyncio.gather</code> (or a <code>TaskGroup</code>). <code>dinner()</code> must still return <code>["rice for Ana", "eggs for Ben", "salad for Chloe"]</code> in that order. The check times it in a real Python.',
        steps: [
          'Press <b>Open in VS Code</b> and run the file. The check gives the first hint.',
          'Fix <code>boil_eggs</code> first, then <code>dinner</code>, between <code>START</code> and <code>END</code>.',
          'Run the file after each fix until it says <code>PASS</code>.'
        ]
      }
    ],
    quiz: [
      {
        type: 'pick', q: 'Inside <code>main()</code>, what does this line do? (No <code>await</code>.)',
        pic: code(['async def cook(dish, minutes):', '    await asyncio.sleep(minutes * MINUTE)', '    return dish', '', 'async def main():', '    pot = cook("rice", 15)'], { title: 'dinner.py' }),
        options: [
          'It hands back a coroutine object. Nothing cooks yet',
          'It cooks the rice for 15 minutes, then goes on',
          'It starts the rice in the background and goes on',
          'It stops with a SyntaxError'
        ],
        answer: 0,
        why: 'Calling an <code>async def</code> function runs none of its lines. You get a coroutine, a recipe ready to go. Only <code>await</code> (or <code>gather</code>, or <code>create_task</code>) runs it. If it is never run, Python warns "coroutine \'cook\' was never awaited".',
        hint: 'Think of lesson 83: what did calling a generator function do?'
      },
      {
        type: 'pick', q: 'How long does dinner take, in kitchen minutes?',
        pic: code(['await asyncio.gather(', '    cook("rice", 15),', '    cook("eggs", 10),', '    cook("veg", 5),', ')'], { title: 'dinner.py' }),
        options: ['About 15', 'About 30', 'About 5', 'About 10'],
        answer: 0,
        why: 'All three wait at the same time, so dinner is ready when the <b>longest</b> one is: 15 minutes. One by one it would be the sum, 30.',
        hint: 'The pots simmer together.'
      },
      {
        type: 'order', q: '<code>cook</code> prints <code>"{dish} on"</code>, then awaits <code>asyncio.sleep</code>, then prints <code>"{dish} ready"</code>. Put the lines this prints in order.',
        pic: code(['await asyncio.gather(cook("rice", 15), cook("eggs", 10), cook("veg", 5))'], { title: 'dinner.py' }),
        items: ['rice on', 'eggs on', 'veg on', 'veg ready', 'eggs ready', 'rice ready'],
        why: 'The rice starts and pauses at <code>await</code>, so the cook starts the eggs, then the veg. Then they finish shortest first. (<code>gather</code> still returns <code>[\'rice\', \'eggs\', \'veg\']</code> in the order you passed them.)',
        hint: 'Each dish pauses at await right after "on".'
      },
      {
        type: 'pick', q: 'On your computer this prints <code>dinner after 30 minutes</code>, even with <code>gather</code>. Why?',
        pic: code(['async def cook(dish, minutes):', '    print(f"{dish} on")', '    time.sleep(minutes * MINUTE)', '    print(f"{dish} ready")', '    return dish', '', 'async def main():', '    await asyncio.gather(cook("rice", 15), cook("eggs", 10), cook("veg", 5))'], { title: 'dinner.py', bad: [3] }),
        options: [
          'time.sleep() blocks the one thread, so no other task can run while it sleeps',
          'gather() always runs tasks one by one',
          'time.sleep() is slower than asyncio.sleep()',
          'cook needs to be a normal def for gather to work'
        ],
        answer: 0,
        why: 'There is no <code>await</code> in <code>cook</code>, so the cook never gets a chance to switch pots. Each <code>time.sleep</code> freezes everything. Write <code>await asyncio.sleep(minutes * MINUTE)</code>.',
        hint: 'Where in cook could the cook switch to another pot?'
      },
      {
        type: 'fix', q: 'This dinner cooks one by one and takes 30 minutes. Make it take about <b>15</b>, and still print <code>[\'rice\', \'eggs\', \'veg\']</code>.',
        code: oneByOne, title: 'dinner.py',
        check: [
          'import re',
          'lines = out.splitlines()',
          'm = re.search(r"dinner after (\\d+) minutes", out)',
          'mins = int(m.group(1)) if m else None',
          'if "[\'rice\', \'eggs\', \'veg\']" not in lines:',
          '    msg = "Print the dishes in this order: [\'rice\', \'eggs\', \'veg\']. asyncio.gather gives them back in the order you pass them."',
          'elif mins is None:',
          '    msg = "Keep the last print, so the check can see how long dinner took."',
          'elif mins > 20:',
          '    msg = "Still " + str(mins) + " minutes: each await waits for its pot before the next starts. Try  rice, eggs, veg = await asyncio.gather(cook(\\"rice\\", 15), cook(\\"eggs\\", 10), cook(\\"veg\\", 5))"',
          'elif mins < 14:',
          '    msg = "Only " + str(mins) + " minutes? Keep the cooking times 15, 10 and 5."',
          'else:',
          '    ok = True'
        ].join('\n'),
        why: '<code>rice, eggs, veg = await asyncio.gather(cook("rice", 15), cook("eggs", 10), cook("veg", 5))</code> starts all three, waits for all three, and unpacks the list in the order you passed them (lesson 36). Dinner takes as long as the rice.',
        hint: 'Replace the three await lines with one asyncio.gather(...) line.'
      },
      {
        type: 'bucket', q: 'Will async make this faster?',
        buckets: ['Yes: lots of waiting', 'No: working, or too small to matter'],
        items: [
          ['Download 100 recipe pages', 0],
          ['A web server answering many guests at once', 0],
          ['Wait for 50 oven timers', 0],
          ['Count calories in 10 million rows', 1],
          ['Resize 500 food photos', 1],
          ['A script that reads one small file', 1]
        ],
        why: 'Async helps when most of the time is spent <b>waiting</b> for something outside the cook: the network, a timer. Busy work keeps the one cook busy, so use processes (lesson 99). One small wait is not worth the extra code.',
        hint: 'Is the cook busy, or just waiting?'
      },
      {
        type: 'pick', q: 'Inside an <code>async def</code>, which line waits 2 seconds <b>and</b> lets other tasks run meanwhile?',
        options: ['await asyncio.sleep(2)', 'time.sleep(2)', 'asyncio.sleep(2)', 'await time.sleep(2)'],
        answer: 0,
        why: '<code>time.sleep(2)</code> blocks everything. <code>asyncio.sleep(2)</code> without <code>await</code> only makes a coroutine and never sleeps ("was never awaited"). <code>await time.sleep(2)</code> blocks for 2 seconds, then stops with a <code>TypeError</code>: <code>time.sleep</code> returns <code>None</code>, and <code>None</code> cannot be awaited.',
        hint: 'You need the asyncio version, and the word that lets the cook switch.'
      },
      {
        type: 'pick', q: 'Back to lesson 83. Which earlier idea is most like <code>await</code>?',
        options: [
          'yield: a generator pauses on that line and later wakes up right there',
          'return: the function ends and hands back a value',
          'break: the loop stops early',
          'a decorator: a function wraps another function'
        ],
        answer: 0,
        why: 'A generator pauses at <code>yield</code> and continues on the same line at the next <code>next()</code>. A coroutine pauses at <code>await</code> and continues on the same line when what it waited for is ready. In fact, asyncio was first built on generators.',
        hint: 'Which word pauses a function without ending it?'
      }
    ]
  });
})();
