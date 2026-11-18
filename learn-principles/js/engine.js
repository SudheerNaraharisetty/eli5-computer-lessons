/* Learn Principles course engine: syllabus registry, picture helpers, quiz types, routing, progress.
   Quiz types and the page shell are shared with learn-github/js/engine.js. */
(function () {
  const COURSE = window.COURSE = {
    modules: [
      { id: 0, name: 'Start here', blurb: 'What "good code" means, and the two words every principle is built on.' },
      { id: 1, name: 'Keep it simple', blurb: 'The everyday habits: less code, less repetition, fewer surprises.' },
      { id: 2, name: 'Shape one piece of code', blurb: 'How to build a single function or class so it does one clear thing.' },
      { id: 3, name: 'Connect the pieces', blurb: 'How parts of a program should talk to each other. Includes all of SOLID.' },
      { id: 4, name: 'Code that survives', blurb: 'Principles that keep a program safe when things go wrong.' },
      { id: 5, name: 'Bigger structure', blurb: 'Ideas for whole systems, not single files.' },
      { id: 6, name: 'Laws about teams and projects', blurb: 'What decades of software projects taught people about people.' }
    ],
    plan: [],     // every lesson in the course, in learning order: {id, module, title, kicker, label}
    lessons: [],  // lessons that are written
    add(l) { this.lessons.push(l); }
  };
  const LABEL = {
    core: ['Core', 'accent', 'One of the 25 most widely used principles'],
    foundation: ['Foundation', 'ink', 'Background you need before the principles'],
    extra: ['Extra', '', 'Less common, still worth knowing'],
    review: ['Review', 'warn', 'Mixed practice across earlier lessons']
  };
  const labelTag = k => `<span class="tag ${LABEL[k][1]}" title="${LABEL[k][2]}">${LABEL[k][0]}</span>`;

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  // Answers that are code get the monospace face.
  const looksCmd = s => /[_=()*]|^\d|^def /.test(s) && !/\s\w+\s\w+\s\w+\s\w+/.test(s);
  const CHEV = '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>';

  /* ---------- progress ---------- */
  const KEY = 'learn-principles-v1';
  let S = { done: {}, q: {} };
  try { const raw = JSON.parse(localStorage.getItem(KEY) || '{}'); S.done = raw.done || {}; S.q = raw.q || {}; } catch (e) { }
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
  function code(lines, o) {
    o = o || {};
    const paint = src => {
      const m = src.match(/^((?:[^"'#]|"[^"]*"|'[^']*')*)#/);
      const cut = m ? m[1].length : -1;
      const main = cut < 0 ? src : src.slice(0, cut), cmt = cut < 0 ? '' : src.slice(cut);
      // Colour keywords and numbers, but leave the insides of "strings" alone.
      const html = main.split(/("[^"]*"|'[^']*')/).map((seg, i) => i % 2
        ? `<span class="st">${esc(seg)}</span>`
        : esc(seg)
          .replace(/\b(def|return|if|elif|else|for|while|in|import|from|class|not|and|or|is|raise|try|except|pass|True|False|None)\b/g, '<span class="k">$1</span>')
          .replace(/\b([A-Z][A-Z_]{2,}|\d+(?:\.\d+)?)\b/g, '<span class="nm">$1</span>')).join('');
      return html + (cmt ? `<span class="cmt">${esc(cmt)}</span>` : '');
    };
    const body = lines.map((l, i) => {
      const n = i + 1, cls = (o.bad || []).includes(n) ? ' bad' : (o.good || []).includes(n) ? ' good' : (o.hi || []).includes(n) ? ' hi' : '';
      return `<div class="cl${cls}"><i>${n}</i><span>${paint(l) || ' '}</span></div>`;
    }).join('');
    return `<div class="term code"><div class="tb"><i></i><i></i><i></i><span>${esc(o.title || 'code')}</span></div><div class="tbody">${body}</div></div>`;
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
  const QLABEL = { pick: 'Click the answer', order: 'Drag into order', match: 'Drag to match', bucket: 'Drag to sort', type: 'Type the answer', fill: 'Drag to fill the blanks' };

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
    let html = `<section class="hero rv"><div><div class="kicker"><span class="tag accent">Beginner to master</span><span class="tag">Software engineering principles</span></div><h1>Learn Principles.</h1><p>The ideas good programmers use to decide what "good code" is. Each lesson is a one-minute video, a few pictures, real code before and after, and a quiz you click or drag.</p>
      <div class="btnrow">${next ? `<a class="btn primary" href="#${next.id}">${d ? 'Continue' : 'Start'} with lesson ${lessonNo(next)}</a>` : ''}</div></div>
      <div class="avatars"><a class="orb" href="#${next ? next.id : 'home'}" style="background:${pct === 100 ? 'var(--ok)' : 'var(--accent)'}">${pct}%<span class="badge">done</span></a></div></section>
      <div class="grid g4 rv d1">
      <div class="card stat"><b>${d}/${total}</b><span>Lessons finished</span><div class="bar"><i data-w="${pct}"></i></div></div>
      <div class="card stat"><b>${core}</b><span>Core principles, the most widely used</span></div>
      <div class="card stat"><b>${ready}</b><span>Lessons written so far of ${total}</span></div>
      <div class="card stat"><b>${COURSE.modules.length}</b><span>Modules, in learning order</span></div></div>
      <div class="legend rv d1"><span>Labels:</span>${Object.keys(LABEL).map(k => `${labelTag(k)}<span>${LABEL[k][2]}.</span>`).join('')}</div>
      <div class="chips rv d1" id="filters">${[['all', 'All lessons'], ['core', 'Core 25 only'], ['extra', 'Extras only']].map(([k, n]) => `<button class="chip${filter === k ? ' on' : ''}" type="button" data-f="${k}">${n}</button>`).join('')}</div>`;
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
    const t = (location.hash || '#home').slice(1);
    if (byId[t]) renderLesson(byId[t]); else renderHome();
    renderPills(byId[t] ? t : 'home');
    window.scrollTo(0, 0);
  }

  window.PR = {
    P, esc, term, code, shuffle, svg, box, T, arrow,
    start() {
      byId = Object.fromEntries(COURSE.lessons.map(l => [l.id, l]));
      // The syllabus fixes order, module, title and label; a written lesson adds its content.
      ordered = COURSE.plan.map(p => Object.assign(byId[p.id] || {}, p));
      window.addEventListener('hashchange', route);
      route();
    }
  };
})();
