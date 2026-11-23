/* Learn Python course engine: syllabus registry, picture helpers, quiz types, routing, progress,
   plus runnable Python (Pyodide in a Web Worker, loaded on the first Run click; Stop, a 10 second
   limit and inline input()) and "Open in VS Code" exercises.
   Copied from learn-principles/js/engine.js and extended; quiz types are shared with it. */
(function () {
  const COURSE = window.COURSE = {
    modules: [
      { id: 0, name: 'Start here', blurb: 'What a program is, setting up your kitchen, and cooking your first recipe.' },
      { id: 1, name: 'Values and variables', blurb: 'Numbers, text, yes and no, and the labelled jars that hold them.' },
      { id: 2, name: 'Decisions and loops', blurb: 'Taste it and decide. Stir 20 times. Serve each guest.' },
      { id: 3, name: 'Collections', blurb: 'Shopping lists, the pantry, and how to pick the right container.' },
      { id: 4, name: 'Functions', blurb: 'Recipe cards you write once and use again and again.' },
      { id: 5, name: 'Errors, files and modules', blurb: 'When the dish burns, the recipe notebook, and cookbooks on the shelf.' },
      { id: 6, name: 'Classes and objects', blurb: 'Templates for dishes and kitchen appliances.' },
      { id: 7, name: 'Pythonic Python', blurb: 'The short, clear way Python cooks write it.' },
      { id: 8, name: 'Tools of a pro', blurb: 'Debugging, taste tests, type hints, clean kitchens and save points.' },
      { id: 9, name: 'Advanced', blurb: 'How Python really works under the hood, and how to make it fast.' },
      { id: 10, name: 'Projects', blurb: 'Finish Kitchen Coach, the app that plans meals for your friends.' }
    ],
    plan: [],     // every lesson in the course, in learning order: {id, module, title, kicker, label}
    lessons: [],  // lessons that are written
    add(l) { this.lessons.push(l); }
  };
  const LABEL = {
    core: ['Core', 'accent', 'What every Python programmer must know'],
    extra: ['Extra', '', 'Deeper topics, worth knowing'],
    review: ['Review', 'warn', 'Mixed practice across earlier lessons']
  };
  const labelTag = k => `<span class="tag ${LABEL[k][1]}" title="${LABEL[k][2]}">${LABEL[k][0]}</span>`;

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  // Answers that are code get the monospace face.
  const looksCmd = s => /[_=()*]|^\d|^def /.test(s) && !/\s\w+\s\w+\s\w+\s\w+/.test(s);
  const CHEV = '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>';

  /* ---------- progress ---------- */
  const KEY = 'learn-python-v1';
  let S = { done: {}, q: {}, root: '' };
  try { const raw = JSON.parse(localStorage.getItem(KEY) || '{}'); S.done = raw.done || {}; S.q = raw.q || {}; S.root = raw.root || ''; } catch (e) { }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } };

  /* ---------- picture helpers (used by lesson files) ---------- */
  const P = { ink: '#0E0C1D', ink2: '#3E3B52', mute: '#6F6B80', accent: '#3B37E6', tint: '#E6E3FF', ok: '#1F7A5C', okT: '#DDEFE6', warn: '#B9741A', warnT: '#FBEBD2', danger: '#B8235A', dangerT: '#FBE0EA', sand: '#ECE7DF', paper: '#F6F1EB', paper2: '#FBF8F4', white: '#fff' };

  // Plain terminal-style panel. Lines: "$ cmd", "# comment", anything else is output.
  function term(lines, title) {
    const body = lines.map(l => {
      if (l.startsWith('$ ')) return `<div class="ln c">${esc(l.slice(2))}</div>`;
      if (l.startsWith('# ')) return `<div class="ln m">${esc(l)}</div>`;
      return `<div class="ln o">${esc(l)}</div>`;
    }).join('');
    return `<div class="term"><div class="tb"><i></i><i></i><i></i><span>${esc(title || 'terminal')}</span></div><div class="tbody">${body}</div></div>`;
  }

  // Code picture with line numbers. o: {title, bad:[lineNo], good:[lineNo], hi:[lineNo]} (line numbers start at 1)
  // Colour one line of Python: keywords, CONSTANTS and numbers, "strings", # comments.
  const KW = /\b(def|return|if|elif|else|for|while|in|import|from|class|not|and|or|is|raise|try|except|finally|pass|break|continue|with|as|lambda|yield|match|case|async|await|del|global|nonlocal|assert|True|False|None)\b/g;
  function paint(src) {
    const m = src.match(/^((?:[^"'#]|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')*)#/);
    const cut = m ? m[1].length : -1;
    const main = cut < 0 ? src : src.slice(0, cut), cmt = cut < 0 ? '' : src.slice(cut);
    // Colour keywords and numbers, but leave the insides of "strings" alone.
    const html = main.split(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/).map((seg, i) => i % 2
      ? `<span class="st">${esc(seg)}</span>`
      : esc(seg)
        .replace(KW, '<span class="k">$1</span>')
        .replace(/\b([A-Z][A-Z_]{2,}|\d+(?:\.\d+)?)\b/g, '<span class="nm">$1</span>')).join('');
    return html + (cmt ? `<span class="cmt">${esc(cmt)}</span>` : '');
  }

  // Code picture with line numbers. o: {title, bad:[lineNo], good:[lineNo], hi:[lineNo]} (line numbers start at 1)
  function code(lines, o) {
    o = o || {};
    const body = lines.map((l, i) => {
      const n = i + 1, cls = (o.bad || []).includes(n) ? ' bad' : (o.good || []).includes(n) ? ' good' : (o.hi || []).includes(n) ? ' hi' : '';
      return `<div class="cl${cls}"><i>${n}</i><span>${paint(l) || ' '}</span></div>`;
    }).join('');
    return `<div class="term code"><div class="tb"><i></i><i></i><i></i><span>${esc(o.title || 'code')}</span></div><div class="tbody">${body}</div></div>`;
  }

  /* ---------- runnable Python (Pyodide in a Web Worker) ---------- */
  // Newest stable Pyodide verified on the CDN (2026-11-19). It runs CPython 3.14 compiled to WebAssembly.
  const PYODIDE = 'https://cdn.jsdelivr.net/pyodide/v314.0.8/full/';
  const PY_NOTE = 'runs Python 3.14 in your browser';
  const LIMIT = 10;          // seconds a program may run before the page stops it
  const OUT_CAP = 200000;    // characters of output kept; the rest is counted but not shown

  // Python runs in a Web Worker, so an endless loop never freezes the page: Stop (or the 10 second
  // limit) simply throws the worker away, and the next Run starts a fresh one.
  // This function never runs on the page. Its source text becomes the worker (see newWorker), built
  // from a Blob URL because Chrome refuses `new Worker('js/file.js')` on a page opened from file://.
  // Do not use names from outside this function inside it, except OUT_CAP (newWorker passes it in).
  //
  // input(): a worker cannot wait for the page without SharedArrayBuffer, which needs cross-origin
  // isolation (file:// and GitHub Pages do not give it). So input() is "replayed": when Python asks
  // and no answer is known yet, the run stops and the page shows an input field. The learner's
  // answer is added to the list and the whole program runs again from the top, with the same random
  // seed, and this time input() returns the known answers in order.
  function workerMain() {
    const SETUP = [
      'import builtins, sys, _course',
      'class _NeedInput(BaseException):',
      '    pass',
      'def input(prompt=""):',
      '    prompt = str(prompt)',
      '    sys.stdout.write(prompt)',
      '    sys.stdout.flush()',
      '    answer = _course.ask(prompt)',
      '    if answer is None:',
      '        raise _NeedInput()',
      '    _course.echo(answer + "\\n")',
      '    return answer',
      'builtins.input = input'
    ].join('\n');
    let py = null, job = 0, chunks = [], pend = [], size = 0, cut = false, last = 0, need = null, answers = [], ai = 0;
    const flush = () => { if (pend.length) { postMessage({ id: job, t: 'out', add: pend, cut }); pend = []; } last = Date.now(); };
    const push = (k, s) => {
      if (s && size >= OUT_CAP) cut = true;
      else if (s) {
        if (size + s.length > OUT_CAP) { s = s.slice(0, OUT_CAP - size); cut = true; }
        size += s.length; chunks.push(s); pend.push([k, s]);
      }
      if (pend.length && Date.now() - last > 120) flush();
    };
    const stream = () => { const dec = new TextDecoder(); return { write: buf => { push('o', dec.decode(buf, { stream: true })); return buf.length; } }; };
    async function boot(url) {
      // This Pyodide refuses to run in a classic worker, and Chrome will not start a module worker from
      // a Blob URL on a file:// page. So: a classic worker that loads Pyodide with import(), with
      // importScripts switched off so Pyodide takes its module-worker path (verified on file:// and http://).
      self.importScripts = () => { throw new Error('modules only'); };
      const { loadPyodide } = await import(url + 'pyodide.mjs');
      py = await loadPyodide({ indexURL: url });
      py.setStdout(stream());
      py.setStderr(stream());
      py.registerJsModule('_course', {
        ask: p => { if (ai < answers.length) return String(answers[ai++]); need = p; return undefined; },
        echo: s => push('a', s)
      });
      py.runPython(SETUP);
    }
    async function handle(m) {
      job = m.id;
      if (!py) {
        try { await boot(m.url); }
        catch (e) { py = null; postMessage({ id: job, t: 'fatal', msg: String(e && e.message || e) }); return; }
      }
      try { await py.loadPackagesFromImports(m.src, { messageCallback: () => { }, errorCallback: () => { } }); } catch (e) { /* a bad import shows up as a normal error below */ }
      chunks = []; pend = []; size = 0; cut = false; need = null; answers = m.answers || []; ai = 0; last = Date.now();
      // Every run starts in a fresh, empty kitchen folder, with the box's ready-made files (o.files) in it.
      // Modules imported from that folder by an earlier run are forgotten, so a seeded kitchen.py is always read fresh.
      try {
        py.runPython("import os, shutil, sys, importlib\nfor _n, _m in list(sys.modules.items()):\n    if (getattr(_m, '__file__', None) or '').startswith('/home/pyodide/kitchen/'): del sys.modules[_n]\nimportlib.invalidate_caches()\nos.chdir('/')\nshutil.rmtree('/home/pyodide/kitchen', ignore_errors=True)\nos.makedirs('/home/pyodide/kitchen')\nos.chdir('/home/pyodide/kitchen')");
        for (const [name, text] of Object.entries(m.files || {})) {
          const full = '/home/pyodide/kitchen/' + name, dir = full.slice(0, full.lastIndexOf('/'));
          py.FS.mkdirTree(dir);
          py.FS.writeFile(full, text);
        }
      } catch (e) { }
      postMessage({ id: job, t: 'start' });
      const ns = py.globals.get('dict')();
      ns.set('__name__', '__main__');
      let err = null, check = null;
      try {
        py.runPython('import random\nrandom.seed(' + (m.seed | 0) + ')');
        await py.runPythonAsync(m.src, { globals: ns, filename: m.file });
      } catch (e) { err = String(e && e.message || e); }
      try { py.runPython('import sys\nsys.stdout.flush()\nsys.stderr.flush()'); } catch (e) { }
      if (need === null && err === null && m.check) {
        try {
          ns.set('out', chunks.join('').replace(/\n$/, ''));
          py.runPython('ok = False\nmsg = ""\n' + m.check, { globals: ns });
          check = { ok: !!ns.get('ok'), msg: String(ns.get('msg') || '') };
        } catch (e) { check = { ok: false, msg: '', bad: true }; }
      }
      flush();
      try { ns.destroy(); } catch (e) { }
      postMessage({ id: job, t: 'done', err: need === null ? err : null, need, cut, check, dead: !!(err && /fatal error/i.test(err)) });
    }
    let chain = Promise.resolve();
    self.onmessage = e => {
      chain = chain.then(() => handle(e.data)).catch(x => postMessage({ id: e.data.id, t: 'done', err: String(x && x.message || x), need: null, cut: false, check: null, dead: true }));
    };
  }

  let worker = null, workerUsed = false, workerReady = false, cur = null, seq = 0;
  function newWorker() {
    const src = `const OUT_CAP = ${OUT_CAP};\n(${workerMain.toString()})();`;
    const w = new Worker(URL.createObjectURL(new Blob([src], { type: 'text/javascript' })));
    w.onmessage = e => onWorker(e.data);
    w.onerror = e => { e.preventDefault(); if (window.console) console.warn('Python worker error:', e.message); if (w !== worker) return; if (cur) giveUp(cur.box, 'Python stopped working unexpectedly. Press Run to start it again.'); killWorker(); };
    workerUsed = true;
    return w;
  }
  function killWorker() { if (worker) worker.terminate(); worker = null; workerReady = false; }

  // Keep the part of the traceback that is about the learner's code (Pyodide adds its own frames above it).
  // Running with filename=file makes Python print the source line and ^^^ markers, as it does for a real file.
  function cleanErr(msg, src, file) {
    const lines = msg.replace(/\s+$/, '').split('\n');
    const first = lines.findIndex(l => l.includes(`File "${file}"`) || l.includes('File "<exec>"'));
    if (first < 0) return lines.slice(-1)[0];
    const code = src.split('\n'), keep = ['Traceback (most recent call last):'];
    let syntax = false;
    for (let i = first; i < lines.length; i++) {
      let l = lines[i].replace('File "<exec>"', `File "${file}"`);
      keep.push(l);
      const m = l.match(/^\s*File "[^"]*", line (\d+)(, in .*)?$/);
      if (m && !m[2]) syntax = true;
      if (m && m[2] && !(lines[i + 1] || '').startsWith('    ') && code[+m[1] - 1] !== undefined) keep.push('    ' + code[+m[1] - 1].trim());
    }
    return (syntax ? keep.slice(1) : keep).join('\n');
  }
  function errHtml(err) {
    const last = err.split('\n').filter(Boolean).slice(-1)[0] || err;
    const ln = (err.match(/line (\d+)/g) || []).slice(-1)[0];
    return `<span class="lbl">Python stopped</span><p class="say">${ln ? `The problem is on <b>${esc(ln)}</b>. ` : ''}Read the last line first: it names the problem.</p><pre>${esc(err).replace(esc(last), `<b>${esc(last)}</b>`)}</pre>`;
  }
  // Printed text, with the learner's input() answers marked so they look typed.
  const outText = chunks => chunks.map(([k, s]) => k === 'a' ? `<span class="ans">${esc(s)}</span>` : esc(s)).join('');
  const cutNote = st => st.cut ? `\n<span class="none">(More output was hidden: only the first ${OUT_CAP.toLocaleString('en')} characters are shown.)</span>` : '';

  const lineNos = n => Array.from({ length: n }, (_, i) => `<div>${i + 1}</div>`).join('');
  // Editable, runnable code block. lines: array of strings.
  // o: {title, inputs: ['Ana', '3']}. inputs are ready-made answers that input() uses first, in order;
  // when they run out, the output panel asks the learner.
  // o.files: {'notebook.txt': 'oats\nrice\n'}. Each run starts in a fresh folder holding these files.
  function run(lines, o) {
    o = o || {};
    const src = lines.join('\n');
    return `<div class="run" data-src="${esc(src)}" data-file="${esc(o.title || 'main.py')}"${o.files ? ` data-files="${esc(JSON.stringify(o.files))}"` : ''}${o.inputs ? ` data-inputs="${esc(JSON.stringify(o.inputs.map(String)))}"` : ''}><div class="term code"><div class="tb"><i></i><i></i><i></i><span>${esc(o.title || 'main.py')} · you can edit this</span></div>` +
      `<div class="ed"><div class="gut">${lineNos(lines.length)}</div><div class="scr"><div><pre aria-hidden="true">${lines.map(paint).join('\n')}\n</pre><textarea wrap="off" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" aria-label="Python code you can edit">${esc(src)}</textarea></div></div></div>` +
      `<div class="runbar"><button type="button" class="btn small go" data-run>▶ Run</button><button type="button" class="btn small stop" data-stop hidden>■ Stop</button><button type="button" class="btn small" data-reset>Reset</button><span class="ver">${PY_NOTE}</span></div>` +
      `<div class="out" aria-live="polite"></div></div></div>`;
  }
  function syncEd(ta) {
    const ed = ta.closest('.ed'), v = ta.value;
    ed.querySelector('pre').innerHTML = v.split('\n').map(paint).join('\n') + '\n';
    ed.querySelector('.gut').innerHTML = lineNos(v.split('\n').length);
  }

  function setBusy(box, on) {
    const go = box.querySelector('[data-run],[data-fixrun]'), stop = box.querySelector('[data-stop]');
    if (go) go.hidden = on;
    if (stop) stop.hidden = !on;
    box.classList.toggle('busy', on);
  }
  // Start a fresh run of this box. opts: {check, after} (used by the fix quiz).
  function startRun(box, opts) {
    if (cur && cur.box === box) return;
    let answers = [];
    let files = {};
    try { answers = JSON.parse(box.dataset.inputs || '[]'); } catch (e) { }
    try { files = JSON.parse(box.dataset.files || '{}'); } catch (e) { }
    box._st = Object.assign({ src: box.querySelector('textarea').value, file: box.dataset.file, answers, files, seed: Math.floor(Math.random() * 2147483647), chunks: [] }, opts || {});
    exec(box, false);
  }
  function exec(box, replay) {
    if (cur && cur.box !== box) stopRun('other');
    const st = box._st, outEl = box.querySelector('.out');
    st.cut = false;
    const id = ++seq;
    cur = { id, box, timer: null };
    setBusy(box, true);
    if (!replay) {
      outEl.className = 'out';
      outEl.innerHTML = `<span class="wait">${workerReady ? 'Running…' : workerUsed ? 'Restarting Python…' : 'Starting Python (first time takes a few seconds)…'}</span>`;
    }
    if (!worker) {
      try { worker = newWorker(); }
      catch (e) { giveUp(box, 'This browser could not start Python in the background. Try a recent Chrome, Edge, Firefox or Safari.'); return; }
    }
    worker.postMessage({ id, url: PYODIDE, src: st.src, file: st.file, answers: st.answers, files: st.files, seed: st.seed, check: st.check || '' });
  }
  function giveUp(box, msg) {
    if (cur && cur.box === box) { clearTimeout(cur.timer); cur = null; }
    setBusy(box, false);
    const outEl = box.querySelector('.out');
    outEl.className = 'out err';
    outEl.innerHTML = `<span class="lbl">Could not start Python</span><p class="say">${esc(msg)}</p>`;
  }
  const STOPPED = {
    time: `Stopped after ${LIMIT} seconds. Is there a loop that never ends?`,
    user: 'Stopped. You pressed Stop.',
    other: 'Stopped, because you ran another code box.'
  };
  function stopRun(why) {
    if (!cur) return;
    const box = cur.box, st = box._st;
    clearTimeout(cur.timer); cur = null;
    killWorker();
    setBusy(box, false);
    if (why === 'quiet') return;
    const outEl = box.querySelector('.out');
    outEl.className = 'out stop';
    outEl.innerHTML = (st.chunks.length ? `<span class="lbl">Printed before it stopped</span>${outText(st.chunks).replace(/\n$/, '')}${cutNote(st)}\n` : '') +
      `<span class="lbl">Python was stopped</span><p class="say">${STOPPED[why] || STOPPED.user}</p>` +
      (why === 'time' ? `<p class="say sub">A program that runs this long in a lesson is almost always stuck. Look for a <code>while</code> loop whose condition never becomes False.</p>` : '');
    outEl.scrollTop = outEl.scrollHeight;
    if (st.after) st.after({ stopped: why });
  }
  function onWorker(m) {
    if (!cur || m.id !== cur.id) return; // a message from a run that was already stopped
    const box = cur.box, st = box._st, outEl = box.querySelector('.out');
    if (m.t === 'start') {
      workerReady = true;
      cur.timer = setTimeout(() => stopRun('time'), LIMIT * 1000);
    } else if (m.t === 'out') {
      st.chunks.push(...m.add); st.cut = m.cut;
      outEl.className = 'out';
      outEl.innerHTML = `<span class="lbl">Output</span>${outText(st.chunks)}${cutNote(st)}<span class="wait live">Running…</span>`;
      outEl.scrollTop = outEl.scrollHeight;
    } else if (m.t === 'fatal') {
      if (window.console) console.warn('Python (Pyodide) did not load:', m.msg);
      giveUp(box, 'Could not download Python. Check your internet connection and try again.');
      killWorker();
    } else if (m.t === 'done') {
      clearTimeout(cur.timer); cur = null;
      setBusy(box, false);
      if (m.dead) killWorker();
      st.cut = m.cut;
      const text = outText(st.chunks);
      if (m.need !== null) {
        // input() is waiting: show the field right after the prompt, like a terminal.
        outEl.className = 'out ask';
        outEl.innerHTML = `<span class="lbl">Output</span>${text}<input class="ans-in" type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="Your answer to: ${esc(m.need || 'input()')}">` +
          `<span class="askhint">Python is waiting for your answer. Type it and press Enter.</span>`;
        outEl.scrollTop = outEl.scrollHeight;
        outEl.querySelector('.ans-in').focus({ preventScroll: true });
        return;
      }
      if (m.err) {
        outEl.className = 'out err';
        outEl.innerHTML = (st.chunks.length ? `<span class="lbl">Printed before it stopped</span>${text.replace(/\n$/, '')}${cutNote(st)}\n` : '') + errHtml(cleanErr(m.err, st.src, st.file));
        outEl.scrollTop = outEl.scrollHeight;
      } else {
        outEl.className = 'out' + (m.check && m.check.ok ? ' pass' : '');
        outEl.innerHTML = `<span class="lbl">Output</span>${st.chunks.length ? text.replace(/\n$/, '') + cutNote(st) : '<span class="none">(nothing was printed)</span>'}`;
      }
      if (st.after) st.after({ err: m.err, check: m.check });
    }
  }
  function wireRunners(root) {
    root.addEventListener('input', e => { if (e.target.matches('.ed textarea')) syncEd(e.target); });
    root.addEventListener('keydown', e => {
      const t = e.target;
      if (!t.matches) return;
      if (t.matches('.out .ans-in') && e.key === 'Enter') {
        e.preventDefault();
        const box = t.closest('.run'); if (!box || !box._st || t.disabled) return;
        t.disabled = true;
        box._st.answers = box._st.answers.concat(t.value);
        box._st.chunks = [];
        exec(box, true);
        return;
      }
      if (!t.matches('.ed textarea')) return;
      if (e.key === 'Tab' && !e.shiftKey) { e.preventDefault(); t.setRangeText('    ', t.selectionStart, t.selectionEnd, 'end'); syncEd(t); }
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); const b = t.closest('.run').querySelector('[data-run],[data-fixrun]'); if (b && !b.hidden) b.click(); }
    });
    root.addEventListener('click', e => {
      const box = e.target.closest('.run'); if (!box) return;
      const ta = box.querySelector('textarea'), outEl = box.querySelector('.out');
      if (e.target.closest('[data-stop]')) { if (cur && cur.box === box) stopRun('user'); return; }
      if (e.target.closest('[data-reset]')) {
        if (cur && cur.box === box) stopRun('quiet');
        box._st = null; ta.value = box.dataset.src; syncEd(ta); outEl.className = 'out'; outEl.innerHTML = ''; return;
      }
      if (e.target.closest('[data-run],[data-fixrun]')) startRun(box, box._opts);
    });
  }

  /* ---------- tiny SVG kit for lesson pictures ---------- */
  const svg = (w, h, label, body) => `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}">${body}</svg>`;
  const box = (x, y, w, h, fill, r) => `<rect x="${x + 4}" y="${y + 5}" width="${w}" height="${h}" rx="${r || 14}" fill="${P.ink}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r || 14}" fill="${fill || P.white}" stroke="${P.ink}" stroke-width="2.5"/>`;
  const T = (x, y, s, o) => { o = o || {}; return `<text x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" font-size="${o.s || 13}" font-weight="${o.w || 800}" fill="${o.f || P.ink}"${o.m ? ' font-family="JetBrains Mono, monospace"' : ''}>${esc(s)}</text>`; };
  const arrow = (x1, y1, x2, y2, col, w) => {
    const a = Math.atan2(y2 - y1, x2 - x1), b = 13, s = 7;
    const p1 = [x2 - b * Math.cos(a) + s * Math.sin(a), y2 - b * Math.sin(a) - s * Math.cos(a)];
    const p2 = [x2 - b * Math.cos(a) - s * Math.sin(a), y2 - b * Math.sin(a) + s * Math.cos(a)];
    const ex = x2 - (b - 2) * Math.cos(a), ey = y2 - (b - 2) * Math.sin(a);
    return `<line x1="${x1}" y1="${y1}" x2="${ex}" y2="${ey}" stroke="${col || P.ink}" stroke-width="${w || 3}" stroke-linecap="round"/><path d="M${x2} ${y2} L${p1[0]} ${p1[1]} L${p2[0]} ${p2[1]}z" fill="${col || P.ink}"/>`;
  };

  /* ---------- quizzes ---------- */
  const QLABEL = { pick: 'Click the answer', order: 'Drag into order', match: 'Drag to match', bucket: 'Drag to sort', type: 'Type the answer', fill: 'Drag to fill the blanks', fix: 'Fix the code, then press Check' };

  function quizShell(q, n) {
    return `<div class="qh"><span class="sq"><b>Q${n}</b></span><div class="qt"><small>${QLABEL[q.type]}${q.type === 'pick' && Array.isArray(q.answer) ? ' (pick all that apply)' : ''}</small><b>${q.q}</b></div></div>${q.pic ? `<div class="qpic">${q.pic}</div>` : ''}<div class="qbody"></div><div class="acts"></div><div class="fb" aria-live="polite"></div>`;
  }

  function feedback(el, ok, q, extra) {
    const fb = el.querySelector('.fb');
    fb.innerHTML = ok
      ? `<div class="fix ok"><span class="lbl">Correct.</span> ${q.why || ''}</div>`
      : `<div class="fix warn"><span class="lbl">Not yet.</span> ${extra || q.hint || 'Look at the picture above again, then try once more.'}</div>`;
  }

  // Generic chip drag + tap-to-place for match, bucket, fill.
  function chipBoard(root, onChange) {
    let sel = null, justDragged = false;
    const clearSel = () => { if (sel) sel.classList.remove('sel'); sel = null; };
    const pool = root.querySelector('[data-pool]');
    const place = (chip, zone) => {
      if (zone.dataset.cap === '1') { const cur = zone.querySelector('.chipd'); if (cur && cur !== chip) pool.appendChild(cur); }
      zone.appendChild(chip); chip.classList.remove('ok', 'bad'); clearSel(); onChange && onChange();
    };
    root.addEventListener('pointerdown', e => {
      const chip = e.target.closest('.chipd'); if (!chip || e.button > 0) return;
      const sx = e.clientX, sy = e.clientY; let ghost = null, hot = null;
      const move = ev => {
        if (!ghost && Math.hypot(ev.clientX - sx, ev.clientY - sy) > 6) {
          ghost = chip.cloneNode(true); ghost.classList.add('ghost'); ghost.classList.remove('sel'); document.body.appendChild(ghost); chip.classList.add('dragging');
        }
        if (ghost) {
          ev.preventDefault();
          ghost.style.left = ev.clientX + 'px'; ghost.style.top = ev.clientY + 'px';
          const t = document.elementFromPoint(ev.clientX, ev.clientY); const z = t && t.closest('[data-drop]');
          if (hot && hot !== z) hot.classList.remove('hot'); hot = z && root.contains(z) ? z : null; if (hot) hot.classList.add('hot');
        }
      };
      const up = ev => {
        window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up);
        if (hot) hot.classList.remove('hot');
        if (ghost) {
          ghost.remove(); chip.classList.remove('dragging'); justDragged = true; setTimeout(() => justDragged = false, 50);
          if (hot) place(chip, hot);
        }
      };
      window.addEventListener('pointermove', move, { passive: false }); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
    });
    root.addEventListener('click', e => {
      if (justDragged) return;
      const chip = e.target.closest('.chipd');
      if (chip) {
        // tapping a chip that sits in a slot sends it home; tapping a pool chip selects it
        if (sel === chip) { clearSel(); return; }
        if (!chip.parentElement.hasAttribute('data-pool') && !sel) { pool.appendChild(chip); chip.classList.remove('ok', 'bad'); onChange && onChange(); return; }
        if (sel && !chip.parentElement.hasAttribute('data-pool')) { place(sel, chip.parentElement); return; }
        clearSel(); sel = chip; chip.classList.add('sel');
        // fill quizzes: a tap with no target goes to the first empty blank
        if (root.dataset.autofill) { const empty = [...root.querySelectorAll('.slot')].find(z => !z.querySelector('.chipd')); if (empty) place(chip, empty); }
        return;
      }
      const zone = e.target.closest('[data-drop]');
      if (zone && sel) place(sel, zone);
    });
    root.addEventListener('keydown', e => {
      const zone = e.target.closest('[data-drop]');
      if (zone && !e.target.closest('.chipd') && (e.key === 'Enter' || e.key === ' ') && sel) { e.preventDefault(); place(sel, zone); }
    });
  }
  const chip = (t, i) => `<button type="button" class="chipd${looksCmd(t) ? '' : ' txt'}" data-v="${esc(t)}" data-i="${i}">${esc(t)}</button>`;

  const QUIZ = {
    // Fix this code: the learner edits a runnable box until a hidden check passes.
    // q.code: starting lines. q.check: Python that can read `out` (everything printed, with input()
    // prompts and answers as they appear in the output panel) and the learner's names, and sets
    // ok = True/False and, optionally, msg = "a specific hint". q.inputs: optional answers for input().
    fix(el, q, done) {
      const body = el.querySelector('.qbody');
      body.innerHTML = run(q.code, { title: q.title || 'fix_me.py', inputs: q.inputs, files: q.files });
      const box = body.querySelector('.run');
      const go = box.querySelector('[data-run]');
      go.removeAttribute('data-run'); go.setAttribute('data-fixrun', ''); go.textContent = '▶ Run and check';
      box._opts = {
        check: q.check,
        after(r) {
          if (r.stopped) { if (r.stopped !== 'other') feedback(el, false, q, 'Python was stopped before it finished, so nothing could be checked. Make sure every loop can end, then run again.'); return; }
          if (r.err) { feedback(el, false, q, 'Python stopped with an error. Read the red box, fix that line, and run again.'); return; }
          const c = r.check || { ok: false, msg: '' };
          feedback(el, c.ok, q, c.bad ? 'The check could not read your result. ' + (q.hint || '') : c.msg || q.hint);
          if (c.ok) done();
        }
      };
    },
    pick(el, q, done) {
      const multi = Array.isArray(q.answer);
      const body = el.querySelector('.qbody');
      body.innerHTML = `<div class="opts">${q.options.map((o, i) => `<button type="button" class="opt${looksCmd(o) ? ' mono' : ''}" data-i="${i}">${esc(o)}</button>`).join('')}</div>`;
      if (multi) el.querySelector('.acts').innerHTML = `<button class="btn primary small" type="button" data-check>Check</button>`;
      body.addEventListener('click', e => {
        const b = e.target.closest('.opt'); if (!b) return;
        if (multi) { b.classList.toggle('picked'); return; }
        body.querySelectorAll('.opt').forEach(x => x.classList.remove('wrong'));
        const ok = +b.dataset.i === q.answer;
        if (ok) { b.classList.add('right'); done(); } else { void b.offsetWidth; b.classList.add('wrong'); }
        feedback(el, ok, q, q.hints && q.hints[b.dataset.i]);
      });
      if (multi) el.querySelector('[data-check]').addEventListener('click', () => {
        const picked = [...body.querySelectorAll('.opt.picked')].map(b => +b.dataset.i).sort().join();
        const ok = picked === q.answer.slice().sort().join();
        body.querySelectorAll('.opt').forEach(b => b.classList.toggle('right', ok && b.classList.contains('picked')));
        feedback(el, ok, q, `You picked ${picked ? picked.split(',').length : 0}. ${q.hint || 'There are ' + q.answer.length + ' right answers.'}`);
        if (ok) done();
      });
    },
    order(el, q, done) {
      const body = el.querySelector('.qbody');
      let order = q.items.map((t, i) => i);
      do { order = shuffle(order); } while (order.every((v, i) => v === i) && q.items.length > 1);
      body.innerHTML = `<ol class="ord">${order.map(i => `<li class="oi" data-i="${i}"><span class="grip">⋮⋮</span><span class="ot${looksCmd(q.items[i]) ? ' mono' : ''}">${esc(q.items[i])}</span><button type="button" class="mv" data-up aria-label="Move up">↑</button><button type="button" class="mv" data-down aria-label="Move down">↓</button></li>`).join('')}</ol>`;
      el.querySelector('.acts').innerHTML = `<button class="btn primary small" type="button" data-check>Check order</button>`;
      const list = body.querySelector('.ord');
      const clear = () => list.querySelectorAll('.oi').forEach(x => x.classList.remove('ok', 'bad'));
      list.addEventListener('click', e => {
        const it = e.target.closest('.oi'); if (!it) return;
        if (e.target.closest('[data-up]') && it.previousElementSibling) list.insertBefore(it, it.previousElementSibling);
        if (e.target.closest('[data-down]') && it.nextElementSibling) list.insertBefore(it.nextElementSibling, it);
        clear();
      });
      list.addEventListener('pointerdown', e => {
        const it = e.target.closest('.oi'); if (!it || e.target.closest('button') || e.button > 0) return;
        e.preventDefault(); it.classList.add('lift'); clear();
        try { it.setPointerCapture(e.pointerId); } catch (err) { }
        const move = ev => {
          const sibs = [...list.children].filter(x => x !== it);
          for (const sb of sibs) { const r = sb.getBoundingClientRect(); if (ev.clientY < r.top + r.height / 2) { if (it.nextElementSibling !== sb) list.insertBefore(it, sb); return; } }
          if (list.lastElementChild !== it) list.appendChild(it);
        };
        const up = () => { it.classList.remove('lift'); it.removeEventListener('pointermove', move); it.removeEventListener('pointerup', up); it.removeEventListener('pointercancel', up); };
        it.addEventListener('pointermove', move); it.addEventListener('pointerup', up); it.addEventListener('pointercancel', up);
      });
      el.querySelector('[data-check]').addEventListener('click', () => {
        const items = [...list.children]; let right = 0;
        items.forEach((it, i) => { const ok = +it.dataset.i === i; it.classList.toggle('ok', ok); it.classList.toggle('bad', !ok); if (ok) right++; });
        const ok = right === items.length;
        feedback(el, ok, q, `${right} of ${items.length} are in the right spot (green). ${q.hint || ''}`);
        if (ok) done();
      });
    },
    match(el, q, done) {
      const body = el.querySelector('.qbody');
      const rows = shuffle(q.pairs.map((p, i) => i));
      body.innerHTML = `<div class="pool" data-pool data-drop>${shuffle(q.pairs.map((p, i) => i)).map(i => chip(q.pairs[i][0], i)).join('')}</div>` +
        `<div class="mrows">${rows.map(i => `<div class="mrow"><div class="md">${q.pairs[i][1]}</div><div class="slot" data-drop data-cap="1" data-want="${i}" tabindex="0" aria-label="Drop slot"></div></div>`).join('')}</div>`;
      el.querySelector('.acts').innerHTML = `<button class="btn primary small" type="button" data-check>Check matches</button>`;
      chipBoard(body);
      el.querySelector('[data-check]').addEventListener('click', () => {
        const slots = [...body.querySelectorAll('.slot')]; let right = 0, empty = 0;
        slots.forEach(z => { const c = z.querySelector('.chipd'); if (!c) { empty++; return; } const ok = c.dataset.i === z.dataset.want; c.classList.toggle('ok', ok); c.classList.toggle('bad', !ok); if (ok) right++; });
        const ok = right === slots.length;
        feedback(el, ok, q, empty ? `${empty} slot${empty > 1 ? 's are' : ' is'} still empty.` : `${right} of ${slots.length} match. Red ones are in the wrong place. Tap a chip to send it back.`);
        if (ok) done();
      });
    },
    bucket(el, q, done) {
      const body = el.querySelector('.qbody');
      body.innerHTML = `<div class="pool" data-pool data-drop>${shuffle(q.items.map((it, i) => i)).map(i => chip(q.items[i][0], i)).join('')}</div>` +
        `<div class="buckets">${q.buckets.map((b, bi) => `<div class="bucket"><h4>${esc(b)}</h4><div class="zone" data-drop data-b="${bi}" tabindex="0" aria-label="${esc(b)}"></div></div>`).join('')}</div>`;
      el.querySelector('.acts').innerHTML = `<button class="btn primary small" type="button" data-check>Check</button>`;
      chipBoard(body);
      el.querySelector('[data-check]').addEventListener('click', () => {
        const left = body.querySelectorAll('[data-pool] .chipd').length; let wrong = 0;
        body.querySelectorAll('.zone .chipd').forEach(c => { const ok = q.items[c.dataset.i][1] === +c.closest('.zone').dataset.b; c.classList.toggle('ok', ok); c.classList.toggle('bad', !ok); if (!ok) wrong++; });
        const ok = !left && !wrong;
        feedback(el, ok, q, left ? `${left} still to place.` : `${wrong} in the wrong group (red). Tap one to send it back.`);
        if (ok) done();
      });
    },
    fill(el, q, done) {
      const body = el.querySelector('.qbody');
      let k = 0;
      const text = esc(q.text).replace(/___/g, () => `<span class="slot" data-drop data-cap="1" data-want="${k++}" tabindex="0" aria-label="Blank"></span>`);
      body.innerHTML = `<div class="pool" data-pool data-drop>${shuffle(q.options.map((o, i) => i)).map(i => chip(q.options[i], i)).join('')}</div><div class="fillcode">${text.replace(/\n/g, '<br>')}</div>`;
      body.dataset.autofill = '1';
      el.querySelector('.acts').innerHTML = `<button class="btn primary small" type="button" data-check>Check</button>`;
      chipBoard(body);
      el.querySelector('[data-check]').addEventListener('click', () => {
        const slots = [...body.querySelectorAll('.slot')]; let right = 0;
        slots.forEach(z => { const c = z.querySelector('.chipd'); if (!c) return; const ok = c.dataset.v === q.answer[+z.dataset.want]; c.classList.toggle('ok', ok); c.classList.toggle('bad', !ok); if (ok) right++; });
        const ok = right === slots.length;
        feedback(el, ok, q);
        if (ok) done();
      });
    },
    type(el, q, done) {
      const body = el.querySelector('.qbody');
      const id = 'tin-' + Math.random().toString(36).slice(2, 8);
      body.innerHTML = (q.context ? `<div class="tctx">${term(q.context, q.title || 'terminal')}</div>` : '') +
        `<div class="tin"><label for="${id}">${esc(q.prompt || 'answer >')}</label><input id="${id}" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="type here, then press Enter"></div>`;
      el.querySelector('.acts').innerHTML = `<button class="btn primary small" type="button" data-check>Run</button><button class="btn small" type="button" data-show hidden>Show answer</button>`;
      const input = body.querySelector('input'); let fails = 0;
      const norm = s => s.trim().replace(/^\$\s*/, '').replace(/[“”‘’']/g, '"').replace(/\s+/g, ' ').replace(/\s*;$/, '');
      const check = () => {
        const v = norm(input.value); if (!v) return;
        const ok = q.answers.some(a => norm(a) === v) || (q.accept && new RegExp(q.accept).test(v));
        if (!ok) { fails++; if (fails >= 2) el.querySelector('[data-show]').hidden = false; }
        feedback(el, ok, q, fails >= 2 ? (q.hint || '') + ' Stuck? Press Show answer.' : q.hint);
        if (ok) done();
      };
      input.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
      el.querySelector('[data-check]').addEventListener('click', check);
      el.querySelector('[data-show]').addEventListener('click', () => { input.value = q.answers[0]; input.focus(); });
    }
  };

  /* ---------- views ---------- */
  const app = () => document.getElementById('app');
  let ordered = [], byId = {}, filter = 'all';
  const lessonNo = l => ordered.findIndex(x => x.id === l.id) + 1;
  const built = id => byId[id];
  const isDone = l => !!S.done[l.id];
  const doneCount = () => ordered.filter(isDone).length;

  function renderPills(t) {
    document.getElementById('pills').innerHTML = `<a class="pill${t === 'home' ? ' on' : ''}" href="#home">Course map</a>` +
      `<a class="pill" href="#home" title="Lessons finished"><span class="nb"><span class="n">${doneCount()}/${ordered.length}</span>${doneCount() ? `<span class="n ok">done</span>` : ''}</span></a>`;
  }

  function renderHome() {
    const total = ordered.length, d = doneCount(), pct = total ? Math.round(d / total * 100) : 0;
    const ready = COURSE.lessons.length;
    const core = ordered.filter(l => l.label === 'core').length;
    const next = ordered.find(l => built(l.id) && !isDone(l)) || ordered.find(l => built(l.id));
    let html = `<section class="hero rv"><div><div class="kicker"><span class="tag accent">Zero to master</span><span class="tag">Python 3.15</span><span class="tag ok">Run code in the page</span></div><h1>Learn Python.</h1><p>Your first program to writing Python like a pro, told in your own kitchen. You cook for three friends, Ana, Ben and Chloe, and build Kitchen Coach, a small app that plans their meals. Each lesson is a one-minute video, a few pictures, code you can run and change right here, a quiz, and an exercise you open in VS Code.</p>
      <div class="btnrow">${next ? `<a class="btn primary" href="#${next.id}">${d ? 'Continue' : 'Start'} with lesson ${lessonNo(next)}</a>` : ''}</div></div>
      <div class="avatars"><a class="orb" href="#${next ? next.id : 'home'}" style="background:${pct === 100 ? 'var(--ok)' : 'var(--accent)'}">${pct}%<span class="badge">done</span></a></div></section>
      <div class="grid g4 rv d1">
      <div class="card stat"><b>${d}/${total}</b><span>Lessons finished</span><div class="bar"><i data-w="${pct}"></i></div></div>
      <div class="card stat"><b>${core}</b><span>Core lessons, what every Python programmer needs</span></div>
      <div class="card stat"><b>${ready}</b><span>Lessons written so far of ${total}</span></div>
      <div class="card stat"><b>${COURSE.modules.length}</b><span>Modules, in learning order</span></div></div>
      <div class="legend rv d1"><span>Labels:</span>${Object.keys(LABEL).map(k => `${labelTag(k)}<span>${LABEL[k][2]}.</span>`).join('')}</div>
      <div class="chips rv d1" id="filters">${[['all', 'All lessons'], ['core', 'Core only'], ['extra', 'Extras only']].map(([k, n]) => `<button class="chip${filter === k ? ' on' : ''}" type="button" data-f="${k}">${n}</button>`).join('')}</div>`;
    COURSE.modules.forEach((m, mi) => {
      const all = ordered.filter(l => l.module === m.id);
      const ls = all.filter(l => filter === 'all' || l.label === filter);
      if (!ls.length) return;
      html += `<section class="mod rv d2"><div class="sec"><h3>Module ${mi} · ${esc(m.name)}</h3><span class="tag">${all.filter(isDone).length} of ${all.length} done</span></div><p class="lead">${esc(m.blurb)}</p><div class="grid g3">`;
      html += ls.map(l => {
        const inner = `<div class="head"><span class="dot">${lessonNo(l)}</span><b>${esc(l.title)}</b></div><div class="foot"><span>${esc(l.kicker)}</span>${built(l.id) ? CHEV : ''}</div><div class="tags">${labelTag(l.label)}${built(l.id) ? '' : '<span class="tag">Coming</span>'}</div>`;
        return built(l.id)
          ? `<a class="card link tk lcard${isDone(l) ? ' done' : ''}" href="#${l.id}">${isDone(l) ? '<span class="stamp">Done</span>' : ''}${inner}</a>`
          : `<div class="card tk lcard soon">${inner}</div>`;
      }).join('');
      html += `</div></section>`;
    });
    html += `<footer>Progress is saved in this browser only. Clearing site data resets it.</footer>`;
    app().innerHTML = html;
    document.getElementById('filters').addEventListener('click', e => { const b = e.target.closest('[data-f]'); if (!b) return; filter = b.dataset.f; const y = window.scrollY; renderHome(); window.scrollTo(0, y); });
    requestAnimationFrame(() => document.querySelectorAll('.stat .bar i[data-w]').forEach(i => i.style.width = i.dataset.w + '%'));
  }

  function renderLesson(l) {
    const n = lessonNo(l), mod = COURSE.modules[l.module];
    const prev = ordered.slice(0, n - 1).reverse().find(x => built(x.id)), next = ordered.slice(n).find(x => built(x.id));
    const upcoming = ordered[n];
    let html = `<section class="hero rv"><div><div class="kicker"><span class="tag accent">Module ${l.module} · ${esc(mod.name)}</span>${labelTag(l.label)}<span class="tag">Lesson ${n} of ${ordered.length}</span>${l.minutes ? `<span class="tag">${l.minutes} min</span>` : ''}</div><h1>${esc(l.title)}</h1><p>${l.summary}</p></div>
      <div class="avatars"><span class="orb" style="background:${isDone(l) ? 'var(--ok)' : 'var(--accent)'}">${n}<span class="badge">${isDone(l) ? 'done' : 'lesson'}</span></span></div></section>`;
    if (l.video) html += `<div class="sec"><h3>Watch first</h3><span class="tag">${esc(l.video.length || 'about 1 min')}</span></div><div class="card vid rv d1"><video controls preload="metadata" playsinline${l.video.poster ? ` poster="${esc(l.video.poster)}"` : ''} src="${esc(l.video.src)}"></video>${l.video.script ? `<details><summary>Read the narration</summary>${l.video.script.map(t => `<p>${t}</p>`).join('')}</details>` : ''}</div>`;
    l.parts.forEach((p, i) => {
      html += `<section class="part${i % 2 ? ' flip' : ''}"><div class="pic">${p.pic || ''}</div><div class="say"><span class="tag ink">${esc(p.label || 'Picture ' + (i + 1))}</span><h2>${p.h}</h2>${p.text.map ? p.text.map(t => `<p>${t}</p>`).join('') : `<p>${p.text}</p>`}${p.tip ? `<div class="note ok"><span class="lbl">Tip.</span>${p.tip}</div>` : ''}${p.warn ? `<div class="note warn"><span class="lbl">Careful.</span>${p.warn}</div>` : ''}</div></section>`;
    });
    if (l.exercises && l.exercises.length) html += exercisesHtml(l);
    const qs = l.quiz || [];
    html += `<div class="sec"><h3>Practice</h3><span class="qprog" id="qprog">${qs.map((q, i) => `<i class="${S.q[l.id + '-' + i] ? 'on' : ''}"></i>`).join('')}</span></div><div class="qwrap" id="qwrap"></div>`;
    html += `<div id="finish"></div>`;
    html += `<div class="lnav">${prev ? `<a class="btn" href="#${prev.id}">← Lesson ${lessonNo(prev)}: ${esc(prev.title)}</a>` : `<a class="btn" href="#home">← Course map</a>`}${next ? `<a class="btn primary" href="#${next.id}">Lesson ${lessonNo(next)}: ${esc(next.title)} →</a>` : upcoming ? `<span class="tag">Up next, not written yet: ${esc(upcoming.title)}</span>` : ''}</div>`;
    app().innerHTML = html;
    const wrap = document.getElementById('qwrap');
    qs.forEach((q, i) => {
      const key = l.id + '-' + i;
      const el = document.createElement('div');
      el.className = 'card quiz';
      el.innerHTML = (S.q[key] ? '<span class="stamp">Solved</span>' : '') + quizShell(q, i + 1);
      wrap.appendChild(el);
      QUIZ[q.type](el, q, () => {
        if (!el.querySelector('.stamp')) el.insertAdjacentHTML('afterbegin', '<span class="stamp">Solved</span>');
        S.q[key] = true;
        document.querySelectorAll('#qprog i')[i].classList.add('on');
        if (qs.every((x, j) => S.q[l.id + '-' + j]) && !S.done[l.id]) { S.done[l.id] = true; showFinish(l, next); }
        save(); renderPills(l.id);
      });
    });
    if (isDone(l)) showFinish(l, next, true);
  }

  function showFinish(l, next, quiet) {
    document.getElementById('finish').innerHTML = `<div class="card finish${quiet ? '' : ' rv'}" style="margin-top:22px;background:var(--ok-tint)"><h2>Lesson ${lessonNo(l)} done.</h2><p style="margin:0 0 16px;font-weight:600;color:var(--ink2)">${quiet ? 'You already passed this one. Redo the quiz any time.' : 'Every question solved. Your progress is saved.'}</p>${next ? `<a class="btn primary" href="#${next.id}">Next: ${esc(next.title)} →</a>` : `<a class="btn primary" href="#home">Back to the course map</a>`}</div>`;
  }

  function route() {
    if (cur) stopRun('quiet');
    const t = (location.hash || '#home').slice(1);
    if (byId[t]) renderLesson(byId[t]); else renderHome();
    renderPills(byId[t] ? t : 'home');
    window.scrollTo(0, 0);
  }

  /* ---------- VS Code exercises ---------- */
  // Exercise files live in learn-python/exercises/. A vscode://file/ link needs the absolute path,
  // which differs per machine, so the learner tells us once where the course folder is.
  const DEFAULT_ROOT = '/Users/sudheer/personal/eli5lessons';
  const rootDir = () => (S.root || DEFAULT_ROOT).replace(/[\\/]+$/, '');
  const exRel = f => 'learn-python/exercises/' + f;
  const exAbs = f => rootDir() + '/' + exRel(f);
  const vsLink = f => 'vscode://file' + (/^[A-Za-z]:/.test(rootDir()) ? '/' : '') + encodeURI(exAbs(f).replace(/\\/g, '/'));
  function exercisesHtml(l) {
    return `<div class="sec"><h3>Try it in VS Code</h3><span class="tag ok">${l.exercises.length} exercise${l.exercises.length > 1 ? 's' : ''}</span></div>` +
      l.exercises.map((x, i) => `<div class="card ex rv d1"><div class="exh"><span class="sq"><b>E${i + 1}</b></span><div><small>Exercise file</small><b>${esc(x.title)}</b></div></div>` +
        `<p>${x.task}</p>` + (x.steps ? `<ol>${x.steps.map(t => `<li>${t}</li>`).join('')}</ol>` : '') +
        `<div class="btnrow" style="margin-top:0"><a class="btn vs" data-vs="${esc(x.file)}" href="${esc(vsLink(x.file))}">Open in VS Code</a></div>` +
        `<div class="pathrow"><code data-abs="${esc(x.file)}">${esc(exAbs(x.file))}</code><button type="button" class="btn small" data-copy="${esc(x.file)}">Copy path</button></div>` +
        `<p style="font-size:14px">In the course folder the file is <code>${esc(exRel(x.file))}</code>. To run it in the terminal: <code>python3 ${esc(x.file)}</code> from the <code>exercises</code> folder (on Windows, <code>py ${esc(x.file)}</code>).</p>` +
        (i === 0 ? `<div class="where"><label for="rootdir">Where did you put this course on your computer?</label><div class="row2"><input id="rootdir" spellcheck="false" value="${esc(rootDir())}"><button type="button" class="btn small primary" data-saveroot>Save</button></div><small>The folder that holds <code>learn-python</code>. The Open in VS Code button uses it. Saved in this browser only.</small></div>` : '') +
        `</div>`).join('');
  }
  function wireExercises(root) {
    root.addEventListener('click', e => {
      if (e.target.closest('[data-saveroot]')) {
        const v = document.getElementById('rootdir').value.trim();
        S.root = v && v !== DEFAULT_ROOT ? v : ''; save();
        document.querySelectorAll('[data-vs]').forEach(a => a.href = vsLink(a.dataset.vs));
        document.querySelectorAll('[data-abs]').forEach(c => c.textContent = exAbs(c.dataset.abs));
        e.target.textContent = 'Saved'; setTimeout(() => e.target.textContent = 'Save', 1400);
      }
      const cp = e.target.closest('[data-copy]');
      if (cp) {
        const t = exAbs(cp.dataset.copy);
        const ok = () => { cp.textContent = 'Copied'; setTimeout(() => cp.textContent = 'Copy path', 1400); };
        if (navigator.clipboard) navigator.clipboard.writeText(t).then(ok, () => window.prompt('Copy this path:', t)); else window.prompt('Copy this path:', t);
      }
    });
  }

  window.PR = {
    P, esc, term, code, run, paint, shuffle, svg, box, T, arrow,
    start() {
      byId = Object.fromEntries(COURSE.lessons.map(l => [l.id, l]));
      // The syllabus fixes order, module, title and label; a written lesson adds its content.
      ordered = COURSE.plan.map(p => Object.assign(byId[p.id] || {}, p));
      window.addEventListener('hashchange', route);
      if (document.body) { wireRunners(document.body); wireExercises(document.body); }
      route();
    }
  };
})();
