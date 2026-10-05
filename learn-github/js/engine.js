/* Learn GitHub course engine: data registry, picture helpers, quiz types, routing, progress. */
(function () {
  const COURSE = window.COURSE = {
    modules: [
      { id: 0, name: 'Start here', blurb: 'What Git is, why it exists, and getting your computer ready.' },
      { id: 1, name: 'Your first repo', blurb: 'Save your work, look back in time, and undo mistakes on your own machine.' },
      { id: 2, name: 'Branches', blurb: 'Parallel copies of your project, and how to join them back together.' },
      { id: 3, name: 'GitHub', blurb: 'Put your work online, then build things with other people.' },
      { id: 4, name: 'Pro level', blurb: 'Automation, rescue missions, and how Git really works inside.' }
    ],
    lessons: [],
    add(l) { this.lessons.push(l); }
  };

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const looksCmd = s => /^(\$ )?(git|gh|cd|ls|pwd|mkdir|touch|echo|cat|ssh|rm|mv|cp|code|open|brew|winget|sudo|clear|man|nano|vim)\b/.test(s) || /^\.git|^\*|^\//.test(s);
  const CHEV = '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>';

  /* ---------- progress ---------- */
  const KEY = 'learn-github-v1';
  let S = { done: {}, q: {} };
  try { const raw = JSON.parse(localStorage.getItem(KEY) || '{}'); S.done = raw.done || {}; S.q = raw.q || {}; } catch (e) { }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } };

  /* ---------- picture helpers (used by lesson files) ---------- */
  const P = { ink: '#0E0C1D', ink2: '#3E3B52', mute: '#6F6B80', accent: '#3B37E6', tint: '#E6E3FF', ok: '#1F7A5C', okT: '#DDEFE6', warn: '#B9741A', warnT: '#FBEBD2', danger: '#B8235A', dangerT: '#FBE0EA', sand: '#ECE7DF', paper: '#F6F1EB', paper2: '#FBF8F4', white: '#fff' };
  const LANE = [P.accent, P.ok, P.warn, P.danger, P.ink2];

  // Terminal picture. Lines: "$ cmd", "# comment", anything else is output.
  function term(lines, title) {
    const body = lines.map(l => {
      if (l.startsWith('$ ')) return `<div class="ln c">${esc(l.slice(2))}</div>`;
      if (l.startsWith('# ')) return `<div class="ln m">${esc(l)}</div>`;
      return `<div class="ln o">${esc(l)}</div>`;
    }).join('');
    return `<div class="term"><div class="tb"><i></i><i></i><i></i><span>${esc(title || 'terminal')}</span></div><div class="tbody">${body}</div></div>`;
  }

  // Command list in a terminal frame with copy buttons. items: [{c, d}]
  function cmds(items) {
    const rows = items.map(x => `<div class="cmd"><div class="cx"><div class="cc">${esc(x.c)}</div>${x.d ? `<div class="cd">${x.d}</div>` : ''}</div><button class="copy" type="button" data-copy="${esc(x.c)}">copy</button></div>`).join('');
    return `<div class="term"><div class="tb"><i></i><i></i><i></i><span>commands</span></div><div class="tbody">${rows}</div></div>`;
  }

  // Commit graph. spec: {lanes:['main','feature'], commits:[{id,lane,parents:[],label,msg,ghost,hi,x}], refs:{main:'C'}, head:'main'|commitId, msgs:true}
  function graph(s) {
    const lanes = s.lanes || ['main'];
    const cs = s.commits;
    const DX = s.dx || 82, DY = 84;
    const stacks = {};
    const refs = Object.entries(s.refs || {});
    refs.forEach(([, id]) => { stacks[id] = (stacks[id] || 0) + 1; });
    const detached = s.head && !(s.head in (s.refs || {}));
    if (detached) stacks[s.head] = (stacks[s.head] || 0) + 1;
    const maxStack = Math.max(1, ...cs.filter(c => (c.lane || 0) === 0).map(c => stacks[c.id] || 0));
    const top = 30 + maxStack * 26;
    const pos = {};
    cs.forEach((c, i) => { pos[c.id] = { x: 44 + (c.x != null ? c.x : i) * DX, y: top + (c.lane || 0) * DY, c }; });
    let W = Math.max(...Object.values(pos).map(p => p.x)) + 70;
    const H = top + (lanes.length - 1) * DY + (s.msgs ? 58 : 40);
    let edges = '', nodes = '', pills = '';
    cs.forEach(c => {
      const p = pos[c.id], col = LANE[(c.lane || 0) % LANE.length];
      (c.parents || []).forEach(pid => {
        const q = pos[pid]; if (!q) return;
        const d = q.y === p.y ? `M${q.x} ${q.y} L${p.x} ${p.y}` : `M${q.x} ${q.y} C${q.x + DX * .55} ${q.y} ${p.x - DX * .55} ${p.y} ${p.x} ${p.y}`;
        edges += `<path d="${d}" fill="none" stroke="${col}" stroke-width="4" stroke-linecap="round"${c.ghost ? ' stroke-dasharray="6 7" opacity=".55"' : ''}/>`;
      });
    });
    cs.forEach(c => {
      const p = pos[c.id], col = LANE[(c.lane || 0) % LANE.length];
      const fill = c.hi ? col : P.white, tc = c.hi ? P.white : P.ink;
      nodes += `<g${c.ghost ? ' opacity=".5"' : ''}><circle cx="${p.x}" cy="${p.y}" r="19" fill="${fill}" stroke="${c.ghost ? P.mute : P.ink}" stroke-width="2.5"${c.ghost ? ' stroke-dasharray="4 4"' : ''}/><circle cx="${p.x}" cy="${p.y}" r="13" fill="none" stroke="${col}" stroke-width="3" opacity="${c.hi ? 0 : 1}"/>`;
      nodes += `<text x="${p.x}" y="${p.y + 4.5}" text-anchor="middle" font-size="13" font-weight="800" fill="${tc}">${esc(c.label || c.id)}</text></g>`;
      if (s.msgs && c.msg) nodes += `<text x="${p.x}" y="${p.y + 38}" text-anchor="middle" font-size="11.5" font-weight="700" fill="${P.ink2}">${esc(c.msg)}</text>`;
    });
    const used = {};
    const pill = (id, text, kind) => {
      const p = pos[id]; if (!p) return;
      const k = used[id] = (used[id] || 0) + 1;
      const w = text.length * 7.4 + 20, y = p.y - 26 - k * 26 + 4;
      const fill = kind === 'head' ? P.ink : kind === 'remote' ? P.paper2 : P.tint;
      const tc = kind === 'head' ? P.white : kind === 'remote' ? P.ink2 : P.accent;
      pills += `<g><rect x="${p.x - w / 2}" y="${y}" width="${w}" height="21" rx="10.5" fill="${fill}" stroke="${P.ink}" stroke-width="2"${kind === 'remote' ? ' stroke-dasharray="4 3"' : ''}/><text x="${p.x}" y="${y + 14.5}" text-anchor="middle" font-size="11.5" font-weight="800" fill="${tc}">${esc(text)}</text></g>`;
      if (k === 1) pills += `<line x1="${p.x}" y1="${y + 21}" x2="${p.x}" y2="${p.y - 20}" stroke="${P.ink}" stroke-width="2"/>`;
      W = Math.max(W, p.x + w / 2 + 10);
    };
    refs.forEach(([name, id]) => pill(id, s.head === name ? 'HEAD → ' + name : name, s.head === name ? 'head' : name.includes('/') ? 'remote' : 'branch'));
    if (detached) pill(s.head, 'HEAD', 'head');
    return `<svg class="gsvg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(s.label || 'commit graph')}">${edges}${nodes}${pills}</svg>`;
  }

  // The four places your code lives. spec: {n:3|4, hi:[i], files:{0:['a.txt']}, arrows:[{f,t,l}]}
  function areas(s) {
    s = s || {};
    const n = s.n || 4, names = ['Working folder', 'Staging area', 'Local repo', 'GitHub'], subs = ['files you edit', 'ready to save', 'saved history', 'online copy'];
    const BW = 150, GAP = 64, X0 = 16, Y = 92, BH = 136;
    const W = X0 * 2 + n * BW + (n - 1) * GAP, H = 300;
    const bx = i => X0 + i * (BW + GAP);
    const icon = (i, cx, cy) => {
      if (i === 0) return `<path d="M${cx - 26} ${cy - 14} h18 l6 7 h28 v29 h-52z" fill="${P.warnT}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>`;
      if (i === 1) return `<path d="M${cx - 28} ${cy - 4} l10 -14 h36 l10 14 v18 h-56z" fill="${P.tint}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/><path d="M${cx - 28} ${cy - 4} h16 a12 8 0 0 0 24 0 h16" fill="none" stroke="${P.ink}" stroke-width="2.5"/>`;
      if (i === 2) return [0, 1, 2].map(k => `<rect x="${cx - 24}" y="${cy - 18 + k * 12}" width="48" height="11" rx="4" fill="${k === 0 ? P.okT : P.white}" stroke="${P.ink}" stroke-width="2.5"/>`).join('');
      return `<path d="M${cx - 22} ${cy + 14} a12 12 0 0 1 2 -24 a16 16 0 0 1 30 -2 a11 11 0 0 1 12 26z" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/>`;
    };
    let out = '';
    for (let i = 0; i < n; i++) {
      const x = bx(i), hi = (s.hi || []).includes(i);
      out += `<rect x="${x}" y="${Y + 5}" width="${BW}" height="${BH}" rx="18" fill="${P.ink}"/><rect x="${x}" y="${Y}" width="${BW}" height="${BH}" rx="18" fill="${hi ? P.tint : P.white}" stroke="${P.ink}" stroke-width="2.5"/>`;
      out += icon(i, x + BW / 2, Y + 34);
      out += `<text x="${x + BW / 2}" y="${Y + 80}" text-anchor="middle" font-size="15" font-weight="800" fill="${P.ink}">${names[i]}</text><text x="${x + BW / 2}" y="${Y + 98}" text-anchor="middle" font-size="12" font-weight="600" fill="${P.mute}">${subs[i]}</text>`;
      ((s.files || {})[i] || []).slice(0, 2).forEach((f, k) => {
        out += `<rect x="${x + 14}" y="${Y + 106 + k * 0}" width="${BW - 28}" height="20" rx="6" fill="${P.sand}"/><text x="${x + BW / 2}" y="${Y + 120}" text-anchor="middle" font-size="11.5" font-weight="700" font-family="JetBrains Mono, monospace" fill="${P.ink}">${esc(f)}</text>`;
      });
    }
    (s.arrows || []).forEach(a => {
      const fwd = a.t > a.f, x1 = bx(a.f) + BW / 2 + (fwd ? 22 : -22), x2 = bx(a.t) + BW / 2 + (fwd ? -22 : 22);
      const yb = fwd ? Y - 4 : Y + BH + 4, lift = fwd ? -44 - Math.abs(a.t - a.f) * 8 : 44 + Math.abs(a.t - a.f) * 8;
      const mx = (x1 + x2) / 2, my = yb + lift;
      const col = a.c || (fwd ? P.accent : P.danger);
      out += `<path d="M${x1} ${yb} Q${mx} ${my} ${x2} ${yb}" fill="none" stroke="${col}" stroke-width="3.5" stroke-linecap="round" marker-end="url(#ah${col.slice(1)})"/>`;
      const tw = a.l.length * 7.6 + 18, ty = yb + lift / 2 + (fwd ? -2 : 2);
      out += `<rect x="${mx - tw / 2}" y="${ty - 12}" width="${tw}" height="24" rx="12" fill="${P.white}" stroke="${col}" stroke-width="2"/><text x="${mx}" y="${ty + 4.5}" text-anchor="middle" font-size="12.5" font-weight="800" font-family="JetBrains Mono, monospace" fill="${col}">${esc(a.l)}</text>`;
    });
    const marks = [P.accent, P.danger, P.ok, P.warn].map(c => `<marker id="ah${c.slice(1)}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" fill="${c}"/></marker>`).join('');
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Working folder, staging area, local repo and GitHub"><defs>${marks}</defs>${out}</svg>`;
  }

  /* ---------- quizzes ---------- */
  const QLABEL = { pick: 'Click the answer', order: 'Drag into order', match: 'Drag to match', bucket: 'Drag to sort', type: 'Type the command', fill: 'Drag to fill the blanks' };

  function quizShell(q, n) {
    return `<div class="qh"><span class="sq"><b>Q${n}</b></span><div class="qt"><small>${QLABEL[q.type]}${q.type === 'pick' && Array.isArray(q.answer) ? ' (pick all that apply)' : ''}</small><b>${q.q}</b></div></div><div class="qbody"></div><div class="acts"></div><div class="fb" aria-live="polite"></div>`;
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
        `<div class="tin"><label for="${id}">${esc(q.prompt || '~/my-project $')}</label><input id="${id}" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="type here, then press Enter"></div>`;
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
  let ordered = [], byId = {};
  const lessonNo = l => ordered.indexOf(l) + 1;
  const isDone = l => !!S.done[l.id];
  const doneCount = () => ordered.filter(isDone).length;

  function renderPills(t) {
    const pills = [['home', 'Course map'], ['play', 'Playground'], ['cheats', 'Cheat sheet']];
    document.getElementById('pills').innerHTML = pills.map(([h, n]) => `<a class="pill${t === h ? ' on' : ''}" href="#${h}">${n}</a>`).join('') +
      `<a class="pill" href="#home" title="Lessons finished"><span class="nb"><span class="n">${doneCount()}/${ordered.length}</span>${doneCount() ? `<span class="n ok">done</span>` : ''}</span></a>`;
  }

  function allCmds() {
    const out = [];
    ordered.forEach(l => (l.parts || []).forEach(p => (p.cmds || []).forEach(c => out.push({ ...c, l }))));
    return out;
  }

  function renderHome() {
    const total = ordered.length, d = doneCount(), pct = total ? Math.round(d / total * 100) : 0;
    const qTotal = ordered.reduce((a, l) => a + (l.quiz || []).length, 0);
    const qDone = Object.keys(S.q).filter(k => S.q[k]).length;
    const next = ordered.find(l => !isDone(l)) || ordered[0];
    const uniq = new Set(allCmds().map(c => c.c)).size;
    let html = `<section class="hero rv"><div><div class="kicker"><span class="tag accent">Beginner to expert</span><span class="tag">Git + GitHub, from the terminal</span></div><h1>Learn GitHub.</h1><p>You know nothing about Git yet. That is the starting line. Every lesson is a few big pictures, a handful of words, the real commands, and a quiz you click, drag or type.</p>
      <div class="btnrow">${next ? `<a class="btn primary" href="#${next.id}">${d ? 'Continue' : 'Start'} with lesson ${lessonNo(next)}</a>` : ''}<a class="btn" href="#play">Open the playground</a></div></div>
      <div class="avatars"><a class="orb" href="#${next ? next.id : 'home'}" style="background:${pct === 100 ? 'var(--ok)' : 'var(--accent)'}">${pct}%<span class="badge">done</span></a></div></section>
      <div class="grid g4 rv d1">
      <div class="card stat"><b>${d}/${total}</b><span>Lessons finished</span><div class="bar"><i data-w="${pct}"></i></div></div>
      <div class="card stat"><b>${qDone}</b><span>Quiz questions solved of ${qTotal}</span></div>
      <div class="card stat"><b>${uniq}</b><span>Commands taught</span></div>
      <div class="card stat"><b>${COURSE.modules.length}</b><span>Modules, start to pro</span></div></div>`;
    COURSE.modules.forEach((m, mi) => {
      const ls = ordered.filter(l => l.module === m.id);
      html += `<section class="mod rv d2"><div class="sec"><h3>Module ${mi} · ${esc(m.name)}</h3><span class="tag">${ls.length ? ls.filter(isDone).length + ' of ' + ls.length + ' done' : 'coming next'}</span></div><p class="lead">${esc(m.blurb)}</p>`;
      html += ls.length ? `<div class="grid g3">${ls.map(l => `<a class="card link tk lcard${isDone(l) ? ' done' : ''}" href="#${l.id}">${isDone(l) ? '<span class="stamp">Done</span>' : ''}<div class="head"><span class="dot">${lessonNo(l)}</span><b>${esc(l.title)}</b></div><div class="foot"><span>${esc(l.kicker)}</span>${CHEV}</div></a>`).join('')}</div>`
        : `<div class="card empty">Lessons for this module are being written.</div>`;
      html += `</section>`;
    });
    html += `<footer>Progress is saved in this browser only. Clearing site data resets it.</footer>`;
    app().innerHTML = html;
    requestAnimationFrame(() => document.querySelectorAll('.stat .bar i[data-w]').forEach(i => i.style.width = i.dataset.w + '%'));
  }

  function renderLesson(l) {
    const n = lessonNo(l), mod = COURSE.modules[l.module];
    const prev = ordered[n - 2], next = ordered[n];
    let html = `<section class="hero rv"><div><div class="kicker"><span class="tag accent">Module ${l.module} · ${esc(mod.name)}</span><span class="tag">Lesson ${n} of ${ordered.length}</span>${l.minutes ? `<span class="tag">${l.minutes} min</span>` : ''}</div><h1>${esc(l.title)}</h1><p>${l.summary}</p></div>
      <div class="avatars"><span class="orb" style="background:${isDone(l) ? 'var(--ok)' : 'var(--accent)'}">${n}<span class="badge">${isDone(l) ? 'done' : 'lesson'}</span></span></div></section>`;
    l.parts.forEach((p, i) => {
      html += `<section class="part${i % 2 ? ' flip' : ''}"><div class="pic">${p.pic || ''}</div><div class="say"><span class="tag ink">Picture ${i + 1}</span><h2>${p.h}</h2>${p.text.map ? p.text.map(t => `<p>${t}</p>`).join('') : `<p>${p.text}</p>`}${p.cmds ? cmds(p.cmds) : ''}${p.tip ? `<div class="note ok"><span class="lbl">Tip.</span>${p.tip}</div>` : ''}${p.warn ? `<div class="note warn"><span class="lbl">Careful.</span>${p.warn}</div>` : ''}</div></section>`;
    });
    const qs = l.quiz || [];
    html += `<div class="sec"><h3>Practice</h3><span class="qprog" id="qprog">${qs.map((q, i) => `<i class="${S.q[l.id + '-' + i] ? 'on' : ''}"></i>`).join('')}</span></div><div class="qwrap" id="qwrap"></div>`;
    html += `<div id="finish"></div>`;
    const lcmds = l.parts.flatMap(p => p.cmds || []);
    if (lcmds.length) html += `<div class="sec"><h3>Commands from this lesson</h3><a href="#cheats">Full cheat sheet</a></div><div class="card"><div class="tw"><table class="cheat">${lcmds.map(c => `<tr><td><code>${esc(c.c)}</code></td><td>${c.d || ''}</td></tr>`).join('')}</table></div></div>`;
    html += `<div class="lnav">${prev ? `<a class="btn" href="#${prev.id}">← Lesson ${n - 1}: ${esc(prev.title)}</a>` : `<a class="btn" href="#home">← Course map</a>`}${next ? `<a class="btn primary" href="#${next.id}">Lesson ${n + 1}: ${esc(next.title)} →</a>` : ''}</div>`;
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

  function renderCheats() {
    const list = allCmds();
    app().innerHTML = `<section class="hero rv"><div><h1>Cheat sheet.</h1><p>Every command taught in the course, in lesson order. Type to filter.</p></div><div class="avatars"><span class="orb">${list.length}<span class="badge">cmds</span></span></div></section>
      <input class="search" id="cheat-q" type="search" placeholder="Search, for example: undo, branch, push" aria-label="Search commands">
      <div id="cheat-body"></div>`;
    const body = document.getElementById('cheat-body');
    const draw = f => {
      f = f.toLowerCase().trim();
      let html = '';
      COURSE.modules.forEach((m, mi) => {
        const rows = list.filter(c => c.l.module === m.id && (!f || (c.c + ' ' + (c.d || '') + ' ' + c.l.title).toLowerCase().includes(f)));
        if (!rows.length) return;
        html += `<div class="sec"><h3>Module ${mi} · ${esc(m.name)}</h3><span class="tag">${rows.length}</span></div><div class="card"><div class="tw"><table class="cheat">${rows.map(c => `<tr><td><code>${esc(c.c)}</code></td><td>${c.d || ''}</td><td class="lk"><a class="tag accent" href="#${c.l.id}">Lesson ${lessonNo(c.l)}</a></td></tr>`).join('')}</table></div></div>`;
      });
      body.innerHTML = html || `<div class="card empty">Nothing matches "${esc(f)}".</div>`;
    };
    document.getElementById('cheat-q').addEventListener('input', e => draw(e.target.value));
    draw('');
  }

  function renderPlay() {
    if (window.GH.renderPlay) return window.GH.renderPlay(app());
    app().innerHTML = `<section class="hero rv"><div><h1>Playground.</h1><p>A safe pretend terminal where you can run Git commands and watch the picture change. It is being built next.</p></div></section>`;
  }

  function route() {
    const t = (location.hash || '#home').slice(1);
    if (t === 'play') renderPlay();
    else if (t === 'cheats') renderCheats();
    else if (byId[t]) renderLesson(byId[t]);
    else renderHome();
    renderPills(byId[t] ? t : t || 'home');
    window.scrollTo(0, 0);
  }

  document.addEventListener('click', e => {
    const b = e.target.closest('[data-copy]'); if (!b) return;
    const done = () => { b.textContent = 'copied'; setTimeout(() => b.textContent = 'copy', 1200); };
    try { navigator.clipboard.writeText(b.dataset.copy).then(done, () => { }); } catch (err) { }
  });

  window.GH = {
    P, esc, term, cmds, graph, areas, shuffle,
    start() {
      ordered = COURSE.lessons.slice().sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
      byId = Object.fromEntries(ordered.map(l => [l.id, l]));
      window.addEventListener('hashchange', route);
      route();
    }
  };
})();
