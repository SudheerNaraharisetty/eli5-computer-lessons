/* Playground: a small pretend Git that runs in the page and draws what happens. */
(function () {
  const { esc, graph } = GH;
  const START_FILES = { 'README.md': '# My app', 'app.js': 'console.log("hi")' };
  const fresh = () => ({
    inited: false, files: { ...START_FILES }, index: {}, commits: {}, order: [], n: 0,
    branches: {}, head: { b: 'main', id: null }, prevBranch: null, lanes: { main: 0 }, tags: {},
    stash: [], reflog: [], remote: null, rt: {}, upstream: {}, merging: null, flags: {}, cwdName: 'my-app'
  });
  let st = fresh();
  let out = [], hist = [], hpos = 0;

  /* ---------- helpers ---------- */
  const say = (t, c) => out.push({ t, c: c || 'o' });
  const err = t => say(t, 'e');
  const hash = () => Math.random().toString(16).slice(2, 9).padEnd(7, '0');
  const headId = () => st.head.b ? st.branches[st.head.b] || null : st.head.id;
  const tree = id => id ? st.commits[id].tree : {};
  const headTree = () => tree(headId());
  const same = (a, b) => JSON.stringify(sortObj(a)) === JSON.stringify(sortObj(b));
  const sortObj = o => Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
  const keys = (...objs) => [...new Set(objs.flatMap(o => Object.keys(o)))].sort();
  const short = id => id ? id.slice(0, 7) : '';
  const laneFor = name => { if (!(name in st.lanes)) st.lanes[name] = Math.min(4, Object.keys(st.lanes).length); return st.lanes[name]; };
  const ancestors = id => { const s = new Set(), q = id ? [id] : []; while (q.length) { const c = q.pop(); if (s.has(c)) continue; s.add(c); q.push(...st.commits[c].parents); } return s; };
  const mergeBase = (a, b) => { const A = ancestors(a); let best = null; ancestors(b).forEach(c => { if (A.has(c) && (!best || st.commits[c].t > st.commits[best].t)) best = c; }); return best; };
  const logMove = (id, why) => { if (id) st.reflog.unshift({ id, why }); };
  const setHead = (id, why) => { if (st.head.b) st.branches[st.head.b] = id; else st.head.id = id; logMove(id, why); };
  const mk = (msg, parents, t, lane) => {
    const id = hash(); st.n++;
    st.commits[id] = { id, n: st.n, t: st.n, msg, parents, tree: { ...t }, lane };
    st.order.push(id); return id;
  };
  const curLane = () => st.head.b ? laneFor(st.head.b) : (headId() ? st.commits[headId()].lane : 0);
  const changes = (from, to) => keys(from, to).filter(f => from[f] !== to[f]).map(f => ({ f, k: !(f in from) ? 'new file' : !(f in to) ? 'deleted' : 'modified' }));
  const dirty = () => !same(st.files, headTree()) || !same(st.index, headTree());
  const trackedDirty = () => { const h = headTree(); return keys(h, st.index).some(f => st.files[f] !== h[f] || st.index[f] !== h[f]); };
  function resolve(r) {
    if (!r) return null;
    let m = r.match(/^(.+?)((?:[~^]\d*)*)$/), base = m[1], suf = m[2];
    let id = base === 'HEAD' || base === '@' ? headId()
      : base === 'ORIG_HEAD' ? st.orig
      : st.branches[base] || st.tags[base] || (base.startsWith('origin/') && st.rt[base.slice(7)])
      || (/^\d+$/.test(base) && (Object.values(st.commits).find(c => String(c.n) === base) || {}).id)
      || (base.length >= 4 && Object.keys(st.commits).find(h => h.startsWith(base)));
    const rl = base.match(/^HEAD@\{(\d+)\}$/); if (rl) id = (st.reflog[+rl[1]] || {}).id;
    if (!id) return null;
    for (const s of suf.match(/[~^]\d*/g) || []) {
      const n = s.length > 1 ? +s.slice(1) : 1;
      if (s[0] === '~') { for (let i = 0; i < n && id; i++) id = st.commits[id].parents[0]; }
      else id = st.commits[id].parents[n - 1];
      if (!id) return null;
    }
    return id;
  }
  const args = line => [...line.matchAll(/"([^"]*)"|'([^']*)'|(\S+)/g)].map(m => m[1] ?? m[2] ?? m[3]);
  const flag = (a, ...f) => f.some(x => a.includes(x));
  const needRepo = () => { if (!st.inited) { err('fatal: not a git repository (or any of the parent directories): .git'); say('# Run git init first.', 'm'); return false; } return true; };
  const checkout = (id, keepChanges) => {
    const t = tree(id);
    if (keepChanges) {
      const h = headTree(), w = { ...t }, ix = { ...t };
      keys(h, st.files).forEach(f => { if (st.files[f] !== h[f]) { if (st.files[f] === undefined) delete w[f]; else w[f] = st.files[f]; } });
      keys(h, st.index).forEach(f => { if (st.index[f] !== h[f]) { if (st.index[f] === undefined) delete ix[f]; else ix[f] = st.index[f]; } });
      st.files = w; st.index = ix;
    } else { st.files = { ...t }; st.index = { ...t }; }
  };
  const blocked = id => { const h = headTree(), t = tree(id); return keys(h, st.files, st.index).filter(f => (st.files[f] !== h[f] || st.index[f] !== h[f]) && t[f] !== h[f] && f in h); };

  /* ---------- git commands ---------- */
  const G = {};
  G.init = () => {
    if (st.inited) return say('Reinitialized existing Git repository in ~/' + st.cwdName + '/.git/');
    st.inited = true; say('Initialized empty Git repository in ~/' + st.cwdName + '/.git/');
  };
  G.status = a => {
    const h = headTree(), staged = changes(h, st.index), conf = st.merging ? st.merging.conflicts : [];
    const unstaged = keys(st.index, st.files).filter(f => f in st.index && st.files[f] !== st.index[f] && !conf.includes(f)).map(f => ({ f, k: f in st.files ? 'modified' : 'deleted' }));
    const untracked = Object.keys(st.files).filter(f => !(f in st.index) && !(f in h)).sort();
    if (flag(a, '-s', '--short')) {
      keys(st.files, st.index, h).forEach(f => {
        const x = conf.includes(f) ? 'UU' : untracked.includes(f) ? '??' : ((staged.find(s => s.f === f) || {}).k || '').charAt(0).replace('n', 'A').toUpperCase().replace(/^$/, ' ') + ((unstaged.find(s => s.f === f) || {}).k || ' ').charAt(0).toUpperCase();
        if (x.trim()) say(x + ' ' + f);
      });
      return;
    }
    say(st.head.b ? 'On branch ' + st.head.b : 'HEAD detached at ' + short(st.head.id));
    if (st.head.b && st.upstream[st.head.b]) {
      const up = st.rt[st.head.b], me = headId();
      if (up && me) {
        const ahead = [...ancestors(me)].filter(c => !ancestors(up).has(c)).length, behind = [...ancestors(up)].filter(c => !ancestors(me).has(c)).length;
        say(ahead && behind ? `Your branch and 'origin/${st.head.b}' have diverged.` : ahead ? `Your branch is ahead of 'origin/${st.head.b}' by ${ahead} commit${ahead > 1 ? 's' : ''}.` : behind ? `Your branch is behind 'origin/${st.head.b}' by ${behind} commit${behind > 1 ? 's' : ''}.` : `Your branch is up to date with 'origin/${st.head.b}'.`);
      }
    }
    if (!headId() && !st.merging) say('No commits yet');
    if (st.merging) say(conf.length ? 'You have unmerged paths. Fix conflicts and run "git commit".' : 'All conflicts fixed but you are still merging. Run "git commit".', 'w');
    if (conf.length) { say('Unmerged paths:'); conf.forEach(f => say('    both modified:   ' + f, 'e')); }
    if (staged.length) { say('Changes to be committed:'); staged.forEach(s => say(`    ${(s.k + ':').padEnd(13)}${s.f}`, 'g')); }
    if (unstaged.length) { say('Changes not staged for commit:'); unstaged.forEach(s => say(`    ${(s.k + ':').padEnd(13)}${s.f}`, 'e')); }
    if (untracked.length) { say('Untracked files:'); untracked.forEach(f => say('    ' + f, 'e')); }
    if (!staged.length && !unstaged.length && !untracked.length && !conf.length) say('nothing to commit, working tree clean');
  };
  G.add = a => {
    const t = a.filter(x => !x.startsWith('-'));
    const all = flag(a, '-A', '--all') || t.includes('.') ;
    const list = all ? keys(st.files, st.index) : t;
    if (!list.length) return err('Nothing specified, nothing added. Try: git add <file> or git add .');
    for (const f of list) {
      if (!(f in st.files) && !(f in st.index)) return err(`fatal: pathspec '${f}' did not match any files`);
      if (f in st.files) st.index[f] = st.files[f]; else delete st.index[f];
      if (st.merging) st.merging.conflicts = st.merging.conflicts.filter(c => c !== f || /<{7}/.test(st.files[f]));
      if (st.merging && /<{7}/.test(st.files[f] || '')) say(`Careful: ${f} still has conflict markers. Edit it first.`, 'w');
    }
  };
  G.restore = a => {
    const t = a.filter(x => !x.startsWith('-')), h = headTree();
    if (!t.length) return err('fatal: you must specify path(s) to restore');
    const src = (a.find(x => x.startsWith('--source=')) || '').slice(9);
    const from = src ? tree(resolve(src)) : null;
    if (src && !resolve(src)) return err(`fatal: could not resolve ${src}`);
    for (const f of (t.includes('.') ? keys(st.files, st.index, h) : t)) {
      if (flag(a, '--staged', '-S')) { if (f in h) st.index[f] = h[f]; else delete st.index[f]; }
      else { const v = from ? from[f] : st.index[f]; if (v === undefined) { if (!from && !(f in st.index)) { err(`error: pathspec '${f}' did not match any file(s) known to git`); continue; } delete st.files[f]; } else st.files[f] = v; }
    }
  };
  G.rm = a => {
    const t = a.filter(x => !x.startsWith('-'));
    t.forEach(f => { if (!(f in st.index)) return err(`fatal: pathspec '${f}' did not match any files`); delete st.index[f]; if (!flag(a, '--cached')) delete st.files[f]; say(`rm '${f}'`); });
  };
  G.mv = a => {
    const [x, y] = a; if (!(x in st.index)) return err(`fatal: not under version control, source=${x}`);
    st.files[y] = st.files[x]; delete st.files[x]; st.index[y] = st.index[x]; delete st.index[x];
  };
  G.commit = a => {
    const mi = a.findIndex(x => x === '-m' || x === '-am' || x === '-a' && a[a.indexOf(x) + 1] === '-m');
    let msg = null; for (let i = 0; i < a.length; i++) if ((a[i] === '-m' || a[i] === '-am') && a[i + 1] !== undefined) msg = a[i + 1];
    if (flag(a, '-a', '-am')) keys(st.index).forEach(f => { if (f in st.files) st.index[f] = st.files[f]; else delete st.index[f]; });
    if (st.merging && st.merging.conflicts.length) return err('error: Committing is not possible because you have unmerged files. Fix them, then git add.');
    if (flag(a, '--amend')) {
      const old = headId(); if (!old) return err('fatal: You have nothing to amend.');
      const c = st.commits[old], id = mk(msg || (flag(a, '--no-edit') ? c.msg : c.msg), c.parents.slice(), st.index, c.lane);
      st.orig = old; setHead(id, 'commit (amend): ' + st.commits[id].msg);
      say(`[${st.head.b || 'detached HEAD'} ${short(id)}] ${st.commits[id].msg}`); say('# The old commit is not changed. A new one replaces it.', 'm');
      st.flags.amended = true; return;
    }
    if (msg === null) return err('Aborting commit: add a message with -m "your message" (this playground has no editor).');
    void mi;
    const parent = headId();
    if (!st.merging && same(st.index, headTree()) && !flag(a, '--allow-empty')) {
      say(st.head.b && !parent ? 'nothing added to commit but untracked files present (use "git add" to track)' : 'nothing to commit, working tree clean', 'w');
      return say('# Stage something first with git add.', 'm');
    }
    const parents = parent ? [parent] : [];
    if (st.merging) parents.push(st.merging.theirs);
    const id = mk(msg, parents, st.index, curLane());
    setHead(id, 'commit: ' + msg);
    if (st.merging) { st.merging = null; st.flags.merged = true; st.flags.resolved = true; say('# Merge finished. Conflict solved.', 'm'); }
    const ch = changes(tree(parent), st.index);
    say(`[${st.head.b || 'detached HEAD ' + short(id)}${parent ? '' : ' (root-commit)'} ${short(id)}] ${msg}`);
    say(` ${ch.length} file${ch.length === 1 ? '' : 's'} changed`);
  };
  G.log = a => {
    const start = flag(a, '--all') ? null : headId();
    let ids = start ? [...ancestors(start)] : reachable();
    if (!ids.length) return err(`fatal: your current branch '${st.head.b}' does not have any commits yet`);
    ids = ids.map(i => st.commits[i]).filter(c => !c.remoteOnly).sort((x, y) => y.t - x.t);
    const nm = flag(a, '-n') ? +a[a.indexOf('-n') + 1] : (a.find(x => /^-\d+$/.test(x)) ? -a.find(x => /^-\d+$/.test(x)) : 99);
    ids.slice(0, nm).forEach(c => {
      const dec = decorations(c.id);
      if (flag(a, '--oneline')) say(`${short(c.id)}${dec ? ' (' + dec + ')' : ''} ${c.msg}`, 'y');
      else { say(`commit ${c.id}${'0'.repeat(33)}${dec ? ' (' + dec + ')' : ''}`, 'y'); if (c.parents.length > 1) say('Merge: ' + c.parents.map(short).join(' ')); say('Author: You <you@example.com>'); say(''); say('    ' + c.msg); say(''); }
    });
  };
  const decorations = id => {
    const d = [];
    if (headId() === id) d.push(st.head.b ? 'HEAD -> ' + st.head.b : 'HEAD');
    Object.entries(st.branches).forEach(([b, c]) => { if (c === id && b !== st.head.b) d.push(b); });
    Object.entries(st.rt).forEach(([b, c]) => { if (c === id) d.push('origin/' + b); });
    Object.entries(st.tags).forEach(([t, c]) => { if (c === id) d.push('tag: ' + t); });
    return d.join(', ');
  };
  G.show = a => { const id = resolve(a[0] || 'HEAD'); if (!id) return err('fatal: bad revision'); const c = st.commits[id]; say(`commit ${id}`, 'y'); say('    ' + c.msg); changes(tree(c.parents[0]), c.tree).forEach(x => say(`${x.k}: ${x.f}`, x.k === 'deleted' ? 'e' : 'g')); };
  G.diff = a => {
    const from = flag(a, '--staged', '--cached') ? headTree() : st.index, to = flag(a, '--staged', '--cached') ? st.index : st.files;
    const ch = changes(from, to).filter(c => flag(a, '--staged', '--cached') || c.f in st.index || c.f in headTree());
    if (!ch.length) return say(flag(a, '--staged', '--cached') ? '# Nothing staged.' : '# No unstaged changes to tracked files.', 'm');
    ch.forEach(c => { say(`diff --git a/${c.f} b/${c.f}`, 'y'); (from[c.f] || '').split('\n').filter(Boolean).forEach(l => { if (!(to[c.f] || '').split('\n').includes(l)) say('- ' + l, 'e'); }); (to[c.f] || '').split('\n').filter(Boolean).forEach(l => { if (!(from[c.f] || '').split('\n').includes(l)) say('+ ' + l, 'g'); }); });
  };
  G.branch = a => {
    const t = a.filter(x => !x.startsWith('-'));
    if (flag(a, '-d', '-D')) {
      const b = t[0]; if (!(b in st.branches)) return err(`error: branch '${b}' not found`);
      if (b === st.head.b) return err(`error: cannot delete branch '${b}' used by worktree. Switch away first.`);
      if (!flag(a, '-D') && !ancestors(headId()).has(st.branches[b])) return err(`error: the branch '${b}' is not fully merged. Use -D to force.`);
      say(`Deleted branch ${b} (was ${short(st.branches[b])}).`); delete st.branches[b]; return;
    }
    if (flag(a, '-m')) {
      const [x, y] = t.length > 1 ? t : [st.head.b, t[0]]; if (!(x in st.branches) && x !== st.head.b) return err(`error: no branch named '${x}'`);
      st.branches[y] = st.branches[x]; delete st.branches[x]; st.lanes[y] = st.lanes[x]; if (st.head.b === x) st.head.b = y; return;
    }
    if (!t.length) {
      if (flag(a, '-r')) return Object.keys(st.rt).forEach(b => say('  origin/' + b, 'e'));
      Object.keys(st.branches).concat(st.head.b && !(st.head.b in st.branches) ? [st.head.b] : []).sort().forEach(b => say((b === st.head.b ? '* ' : '  ') + b + (flag(a, '-v', '-vv') ? '  ' + short(st.branches[b]) + (st.upstream[b] && flag(a, '-vv') ? ' [origin/' + b + ']' : '') : ''), b === st.head.b ? 'g' : 'o'));
      if (!st.head.b) say('* (HEAD detached at ' + short(st.head.id) + ')', 'g');
      if (flag(a, '-a')) Object.keys(st.rt).forEach(b => say('  remotes/origin/' + b, 'e'));
      return;
    }
    if (!headId()) return err(`fatal: not a valid object name: '${st.head.b}'. Make a first commit before creating branches.`);
    if (t[0] in st.branches) return err(`fatal: a branch named '${t[0]}' already exists`);
    const at = t[1] ? resolve(t[1]) : headId(); if (!at) return err('fatal: not a valid object name');
    st.branches[t[0]] = at; laneFor(t[0]);
  };
  function switchTo(target, a, create) {
    if (st.merging) return err('error: you need to resolve your current merge first (or git merge --abort).');
    if (target === '-') { if (!st.prevBranch) return err('fatal: no previous branch'); target = st.prevBranch; }
    if (create) {
      if (target in st.branches) return err(`fatal: a branch named '${target}' already exists`);
      if (!headId()) { st.prevBranch = st.head.b; st.head = { b: target, id: null }; laneFor(target); return say(`Switched to a new branch '${target}'`); }
      st.branches[target] = headId(); laneFor(target);
      st.prevBranch = st.head.b; st.head = { b: target, id: null }; logMove(headId(), 'checkout: moving to ' + target);
      st.flags.branched = true; return say(`Switched to a new branch '${target}'`);
    }
    let id = st.branches[target], isBranch = true;
    if (!id && st.rt[target]) { st.branches[target] = st.rt[target]; st.upstream[target] = true; laneFor(target); id = st.rt[target]; say(`branch '${target}' set up to track 'origin/${target}'.`); }
    if (!id) { id = resolve(target); isBranch = false; if (!id || (a.cmd === 'switch' && !flag(a.raw, '--detach'))) return err(id ? `fatal: a branch is expected, got commit '${target}'. Use git switch --detach ${target}` : `fatal: invalid reference: ${target}`); }
    const bad = blocked(id); if (bad.length) { err('error: Your local changes to the following files would be overwritten:'); bad.forEach(f => err('    ' + f)); return err('Please commit your changes or stash them before you switch branches.'); }
    checkout(id, true);
    if (st.head.b) st.prevBranch = st.head.b;
    st.head = isBranch ? { b: target, id: null } : { b: null, id };
    logMove(id, 'checkout: moving to ' + target);
    if (isBranch) { say(`Switched to branch '${target}'`); if (target !== 'main') st.flags.branched = true; }
    else { say(`HEAD is now at ${short(id)} ${st.commits[id].msg}`); say("You are in 'detached HEAD' state. Look around. To keep work, run git switch -c <new-branch>.", 'w'); st.flags.detached = true; }
  }
  G.switch = a => { const t = a.filter(x => !x.startsWith('-') || x === '-'); if (!t.length) return err('fatal: missing branch name'); switchTo(t[0], { cmd: 'switch', raw: a }, flag(a, '-c', '-C')); };
  G.checkout = a => {
    if (a.includes('--')) return G.restore(a.slice(a.indexOf('--') + 1));
    if (flag(a, '--ours', '--theirs')) { const f = a.find(x => !x.startsWith('-')); if (!st.merging) return err('error: not merging'); st.files[f] = st.merging[flag(a, '--ours') ? 'ours' : 'theirsT'][f]; return say(`# Took ${flag(a, '--ours') ? 'our' : 'their'} version of ${f}. Now git add it.`, 'm'); }
    const t = a.filter(x => !x.startsWith('-') || x === '-'); if (!t.length) return err('fatal: missing branch name');
    if (!flag(a, '-b') && !(t[0] in st.branches) && !st.rt[t[0]] && !resolve(t[0]) && (t[0] in st.files || t[0] in st.index)) return G.restore(t);
    switchTo(t[0], { cmd: 'checkout', raw: a }, flag(a, '-b'));
  };
  G.merge = a => {
    if (flag(a, '--abort')) { if (!st.merging) return err('fatal: There is no merge to abort.'); checkout(headId()); st.merging = null; return say('# Merge cancelled. Back to how it was.', 'm'); }
    if (st.merging) return err('error: You are already merging. Finish it with git commit, or git merge --abort.');
    const name = a.find(x => !x.startsWith('-')); const them = resolve(name);
    if (!them) return err(`merge: ${name} - not something we can merge`);
    const me = headId();
    if (trackedDirty()) return err('error: Your local changes would be overwritten by merge. Commit or stash them first.');
    if (ancestors(me).has(them)) return say('Already up to date.');
    st.orig = me;
    if (me && ancestors(them).has(me) && !flag(a, '--no-ff')) {
      if (flag(a, '--squash')) { /* fall through to squash below */ }
      else { setHead(them, 'merge ' + name + ': Fast-forward'); checkout(them); say(`Updating ${short(me)}..${short(them)}`); say('Fast-forward', 'g'); st.flags.merged = true; return; }
    }
    if (flag(a, '--ff-only')) return err('fatal: Not possible to fast-forward, aborting.');
    const base = tree(mergeBase(me, them)), ours = tree(me), theirs = tree(them), res = {}, conflicts = [];
    keys(base, ours, theirs).forEach(f => {
      const b = base[f], o = ours[f], t = theirs[f];
      if (o === t) { if (o !== undefined) res[f] = o; }
      else if (o === b) { if (t !== undefined) res[f] = t; }
      else if (t === b) { if (o !== undefined) res[f] = o; }
      else { conflicts.push(f); res[f] = `<<<<<<< HEAD\n${o || ''}\n=======\n${t || ''}\n>>>>>>> ${name}`; }
    });
    if (flag(a, '--squash')) { st.files = { ...res }; st.index = { ...res }; say('Squash commit -- not updating HEAD. Now run git commit -m "..."'); return; }
    if (conflicts.length) {
      st.files = { ...res }; st.index = { ...res }; conflicts.forEach(f => { st.index[f] = ours[f]; });
      st.merging = { theirs: them, conflicts, ours, theirsT: theirs };
      conflicts.forEach(f => say(`CONFLICT (content): Merge conflict in ${f}`, 'e'));
      say('Automatic merge failed; fix conflicts and then commit the result.', 'e');
      say(`# Look: cat ${conflicts[0]}. Fix: echo "final text" > ${conflicts[0]}, then git add ${conflicts[0]}, then git commit -m "merge".`, 'm');
      st.flags.conflict = true; return;
    }
    const id = mk(`Merge branch '${name}'`, [me, them], res, curLane());
    setHead(id, 'merge ' + name); checkout(id);
    say("Merge made by the 'ort' strategy.", 'g'); st.flags.merged = true;
  };
  G.reset = a => {
    const t = a.filter(x => !x.startsWith('-'));
    if (t.length && !resolve(t[0]) && (t[0] in st.index || t[0] in st.files)) return G.restore(['--staged', ...t]);
    const id = t.length ? resolve(t[0]) : headId(); if (!id) return err(`fatal: ambiguous argument '${t[0]}': unknown revision`);
    if (flag(a, '--merge') && st.merging) { st.merging = null; checkout(headId()); return say('# Merge undone.', 'm'); }
    st.orig = headId(); setHead(id, 'reset: moving to ' + (t[0] || 'HEAD'));
    if (flag(a, '--hard')) { checkout(id); say(`HEAD is now at ${short(id)} ${st.commits[id].msg}`); }
    else if (flag(a, '--soft')) say('# Branch moved. Your changes are still staged.', 'm');
    else { st.index = { ...tree(id) }; say('Unstaged changes after reset. Your edits are still in the folder.', 'm'); }
    if (st.orig !== id) st.flags.undid = true;
  };
  G.revert = a => {
    const id = resolve(a.find(x => !x.startsWith('-'))); if (!id) return err('fatal: bad revision');
    if (trackedDirty()) return err('error: your local changes would be overwritten by revert. Commit or stash first.');
    const c = st.commits[id], p = tree(c.parents[0]), nt = { ...headTree() };
    keys(c.tree, p).forEach(f => { if (c.tree[f] !== p[f]) { if (p[f] === undefined) delete nt[f]; else nt[f] = p[f]; } });
    const nid = mk(`Revert "${c.msg}"`, [headId()], nt, curLane()); setHead(nid, 'revert'); checkout(nid);
    say(`[${st.head.b} ${short(nid)}] Revert "${c.msg}"`); st.flags.undid = true;
  };
  G['cherry-pick'] = a => {
    const id = resolve(a.find(x => !x.startsWith('-'))); if (!id) return err('fatal: bad revision');
    const c = st.commits[id], p = tree(c.parents[0]), nt = { ...headTree() };
    keys(c.tree, p).forEach(f => { if (c.tree[f] !== p[f]) { if (c.tree[f] === undefined) delete nt[f]; else nt[f] = c.tree[f]; } });
    const nid = mk(c.msg, [headId()], nt, curLane()); setHead(nid, 'cherry-pick'); checkout(nid);
    say(`[${st.head.b} ${short(nid)}] ${c.msg}`); say('# Same change, new commit with a new id.', 'm');
  };
  G.rebase = a => {
    if (flag(a, '-i')) return err('# Interactive rebase opens an editor, which this playground does not have. Learn it in lesson 17.');
    const target = resolve(a.find(x => !x.startsWith('-'))); if (!target) return err('fatal: invalid upstream');
    if (!st.head.b) return err('fatal: rebase needs a branch. Switch to one first.');
    if (trackedDirty()) return err('error: cannot rebase: You have unstaged changes. Commit or stash them.');
    const me = headId(), base = mergeBase(me, target);
    if (ancestors(target).has(me)) { setHead(target, 'rebase: fast-forward'); checkout(target); return say('Fast-forwarded ' + st.head.b + '.'); }
    if (ancestors(me).has(target)) return say('Current branch ' + st.head.b + ' is up to date.');
    const list = []; let c = me; while (c && c !== base) { list.unshift(c); c = st.commits[c].parents[0]; }
    let cur = target; st.orig = me;
    for (const id of list) {
      const cm = st.commits[id], p = tree(cm.parents[0]), nt = { ...tree(cur) };
      for (const f of keys(cm.tree, p)) if (cm.tree[f] !== p[f]) {
        if (nt[f] !== p[f] && nt[f] !== cm.tree[f]) { return err(`CONFLICT in ${f}. This playground stops here. Try git merge instead to practise conflicts.`); }
        if (cm.tree[f] === undefined) delete nt[f]; else nt[f] = cm.tree[f];
      }
      cur = mk(cm.msg, [cur], nt, curLane());
    }
    setHead(cur, 'rebase finished'); checkout(cur);
    say(`Successfully rebased and updated refs/heads/${st.head.b}.`, 'g'); say('# The faded circles are the old commits. Your branch now uses new copies.', 'm');
    st.flags.rebased = true;
  };
  G.stash = a => {
    const sub = a[0] && !a[0].startsWith('-') ? a[0] : 'push';
    if (sub === 'list') return st.stash.forEach((s, i) => say(`stash@{${i}}: ${s.msg}`));
    if (sub === 'pop' || sub === 'apply') {
      if (!st.stash.length) return err('No stash entries found.');
      const s = st.stash[0];
      Object.entries(s.w).forEach(([f, v]) => { if (v === null) delete st.files[f]; else st.files[f] = v; });
      Object.entries(s.i).forEach(([f, v]) => { if (v === null) delete st.index[f]; else st.index[f] = v; });
      if (sub === 'pop') { st.stash.shift(); say('Dropped refs/stash@{0}'); st.flags.stashed = true; }
      return G.status([]);
    }
    if (sub === 'drop') { if (!st.stash.length) return err('No stash entries found.'); st.stash.shift(); return say('Dropped refs/stash@{0}'); }
    if (sub === 'clear') { st.stash = []; return; }
    const h = headTree(), w = {}, i = {}, withU = flag(a, '-u', '--include-untracked');
    keys(h, st.files, st.index).forEach(f => {
      const untracked = !(f in h) && !(f in st.index);
      if (untracked && !withU) return;
      if (st.files[f] !== h[f]) w[f] = st.files[f] ?? null;
      if (st.index[f] !== h[f]) i[f] = st.index[f] ?? null;
    });
    if (!Object.keys(w).length && !Object.keys(i).length) return say('No local changes to save');
    const mi = a.indexOf('-m'), msg = (mi > -1 ? 'On ' + st.head.b + ': ' + a[mi + 1] : 'WIP on ' + st.head.b + ': ' + short(headId()));
    st.stash.unshift({ w, i, msg });
    Object.keys(w).forEach(f => { if (f in h) st.files[f] = h[f]; else delete st.files[f]; });
    Object.keys(i).forEach(f => { if (f in h) st.index[f] = h[f]; else delete st.index[f]; });
    say('Saved working directory and index state ' + msg);
  };
  G.tag = a => {
    const t = a.filter(x => !x.startsWith('-')).filter((x, i, arr) => !(a[a.indexOf(x) - 1] === '-m'));
    if (flag(a, '-d')) { delete st.tags[t[0]]; return say(`Deleted tag '${t[0]}'`); }
    if (!t.length) return Object.keys(st.tags).sort().forEach(x => say(x));
    const id = t[1] ? resolve(t[1]) : headId(); if (!id) return err('fatal: Failed to resolve as a valid ref.');
    st.tags[t[0]] = id; st.flags.tagged = true;
  };
  G.reflog = () => st.reflog.slice(0, 15).forEach((r, i) => say(`${short(r.id)} HEAD@{${i}}: ${r.why}`, 'y'));
  G.remote = a => {
    if (a[0] === 'add') { if (st.remote) return err('error: remote origin already exists.'); st.remote = { url: a[2] || 'git@github.com:you/my-app.git', branches: {} }; return say('# Remote "origin" saved. Nothing sent yet.', 'm'); }
    if (a[0] === 'remove' || a[0] === 'rm') { st.remote = null; st.rt = {}; return; }
    if (!st.remote) return;
    if (flag(a, '-v')) { say('origin  ' + st.remote.url + ' (fetch)'); say('origin  ' + st.remote.url + ' (push)'); } else say('origin');
  };
  const needRemote = () => { if (!st.remote) { err("fatal: 'origin' does not appear to be a git repository"); say('# Add one first: git remote add origin git@github.com:you/my-app.git', 'm'); return false; } return true; };
  G.push = a => {
    if (!needRemote()) return;
    const t = a.filter(x => !x.startsWith('-'));
    if (flag(a, '--delete', '-d')) { const b = t[1]; delete st.remote.branches[b]; delete st.rt[b]; return say(' - [deleted]         ' + b); }
    if (flag(a, '--tags')) { say(' * [new tag]         ' + Object.keys(st.tags).join(', ')); return; }
    let b = t[1] || st.head.b;
    if (!t.length && !st.upstream[b]) { err(`fatal: The current branch ${b} has no upstream branch.`); return say(`# First push: git push -u origin ${b}`, 'm'); }
    const local = st.branches[b]; if (!local) return err(`error: src refspec ${b} does not match any`);
    const rem = st.remote.branches[b];
    if (rem && !ancestors(local).has(rem) && !flag(a, '--force', '-f', '--force-with-lease')) {
      err(` ! [rejected]        ${b} -> ${b} (fetch first)`); err('error: failed to push some refs. Someone pushed work you do not have.');
      return say('# Fix: git pull, then git push again.', 'm');
    }
    if (rem && flag(a, '--force-with-lease') && st.rt[b] !== rem) return err(' ! [rejected] (stale info). Someone pushed since your last fetch. Fetch first.');
    st.remote.branches[b] = local; st.rt[b] = local;
    if (flag(a, '-u', '--set-upstream') || !st.upstream[b]) { if (flag(a, '-u', '--set-upstream')) say(`branch '${b}' set up to track 'origin/${b}'.`); }
    if (flag(a, '-u', '--set-upstream')) st.upstream[b] = true;
    say(`To ${st.remote.url}`); say(`   ${rem ? short(rem) + '..' + short(local) : ' * [new branch]   '} ${b} -> ${b}`, 'g');
    st.flags.pushed = true;
  };
  G.fetch = () => {
    if (!needRemote()) return;
    let any = false;
    Object.entries(st.remote.branches).forEach(([b, id]) => { if (st.rt[b] !== id) { any = true; say(`   ${short(st.rt[b] || '')}..${short(id)}  ${b} -> origin/${b}`, 'g'); } st.rt[b] = id; ancestors(id).forEach(c => delete st.commits[c].remoteOnly); });
    Object.keys(st.rt).forEach(b => { if (!(b in st.remote.branches)) delete st.rt[b]; });
    if (!any) say('# Nothing new on GitHub.', 'm');
    st.flags.fetched = true;
  };
  G.pull = a => {
    if (!needRemote()) return;
    const b = st.head.b; if (!st.upstream[b] && !a.length) { err('There is no tracking information for the current branch.'); return say(`# Try: git branch -u origin/${b}  or  git pull origin ${b}`, 'm'); }
    G.fetch();
    if (!st.rt[b]) return err(`fatal: couldn't find remote ref ${b}`);
    if (flag(a, '--rebase')) G.rebase(['origin/' + b]); else G.merge(['origin/' + b]);
    st.flags.pulled = true;
  };
  G.clone = () => err('# The playground already has a project. Try git init, or press "Start over".');
  G.help = () => say('# Try: git status, git add, git commit -m, git log --oneline, git branch, git switch -c, git merge, git reset, git revert, git stash, git tag, git remote add, git push -u, git pull, git reflog', 'm');

  /* ---------- shell commands ---------- */
  function run(line) {
    say(line, 'c');
    const raw = line.trim(); if (!raw) return;
    const redirect = raw.match(/^echo\s+(?:"([^"]*)"|'([^']*)'|(.*?))\s*(>>?)\s*(\S+)$/);
    if (redirect) {
      const text = redirect[1] ?? redirect[2] ?? redirect[3], f = redirect[5];
      st.files[f] = redirect[4] === '>>' && st.files[f] !== undefined ? st.files[f] + '\n' + text : text; return;
    }
    const a = args(raw), cmd = a.shift();
    switch (cmd) {
      case 'clear': out = []; return;
      case 'help': return G.help();
      case 'ls': { const f = Object.keys(st.files).sort(); if (flag(a, '-a', '-la', '-al')) f.unshift('.', '..', ...(st.inited ? ['.git'] : [])); return say(f.join('   ') || '# empty folder', f.length ? 'o' : 'm'); }
      case 'pwd': return say('/Users/you/' + st.cwdName);
      case 'cat': return a.forEach(f => f in st.files ? st.files[f].split('\n').forEach(l => say(l, /^(<{7}|={7}|>{7})/.test(l) ? 'e' : 'o')) : err(`cat: ${f}: No such file or directory`));
      case 'touch': return a.forEach(f => { if (!(f in st.files)) st.files[f] = ''; });
      case 'rm': return a.filter(x => !x.startsWith('-')).forEach(f => f in st.files ? delete st.files[f] : err(`rm: ${f}: No such file or directory`));
      case 'echo': return say(a.join(' '));
      case 'git': {
        const sub = a.shift();
        if (!sub || sub === 'help' || sub === '--help') return G.help();
        if (sub === '--version') return say('git version 2.47.0');
        if (sub === 'config') return say('# Saved (pretend). Real setup is in lesson 4.', 'm');
        if (sub === 'clone') return G.clone();
        if (!G[sub]) return err(`git: '${sub}' is not a git command in this playground. Type help.`);
        if (sub !== 'init' && !needRepo()) return;
        return G[sub](a);
      }
      default: return err(`zsh: command not found: ${cmd}`);
    }
  }

  /* ---------- teammate on GitHub ---------- */
  function teammate() {
    if (!st.remote || !st.remote.branches.main) { out.push({ t: '# Your teammate needs a GitHub copy first: git remote add origin <url>, then git push -u origin main.', c: 'm' }); return draw(); }
    const p = st.remote.branches.main, t = { ...tree(p) }, k = Object.keys(st.commits).length;
    t['notes.md'] = (t['notes.md'] ? t['notes.md'] + '\n' : '') + 'Ana was here ' + k;
    const id = mk('Ana: update notes', [p], t, laneFor('teammate'));
    st.commits[id].remoteOnly = true; st.remote.branches.main = id;
    out.push({ t: '# Ana pushed a commit to GitHub. Your laptop does not know yet. Try git fetch, then git status, or git pull.', c: 'w' });
    draw();
  }

  /* ---------- missions ---------- */
  const MISSIONS = [
    ['Start a repo', 'git init', () => st.inited],
    ['Make your first commit', 'git add .', () => Object.values(st.commits).some(c => !c.remoteOnly)],
    ['Make a branch and switch to it', 'git switch -c feature', () => st.flags.branched],
    ['Merge a branch into main', 'git merge feature', () => st.flags.merged],
    ['Cause and fix a merge conflict', 'echo "blue" > app.js', () => st.flags.resolved],
    ['Undo a commit with reset or revert', 'git revert HEAD', () => st.flags.undid],
    ['Stash work, then pop it back', 'git stash', () => st.flags.stashed],
    ['Tag a release', 'git tag v1.0', () => st.flags.tagged],
    ['Push to the pretend GitHub', 'git remote add origin git@github.com:you/my-app.git', () => st.flags.pushed],
    ['Pull a teammate\'s commit', 'git pull', () => st.flags.pulled]
  ];

  /* ---------- drawing ---------- */
  function reachable() {
    const s = new Set();
    [headId(), ...Object.values(st.branches), ...Object.values(st.tags), ...Object.values(st.rt)].forEach(id => ancestors(id).forEach(c => s.add(c)));
    return [...s];
  }
  function drawGraph() {
    const vis = st.order.filter(id => !st.commits[id].remoteOnly);
    if (!vis.length) return `<div class="empty">No commits yet. Your first commit appears here as a circle.</div>`;
    const live = new Set(reachable());
    const lanesUsed = Math.max(...vis.map(id => st.commits[id].lane)) + 1;
    const refs = {};
    Object.entries(st.branches).forEach(([b, id]) => refs[b] = id);
    Object.entries(st.rt).forEach(([b, id]) => refs['origin/' + b] = id);
    Object.entries(st.tags).forEach(([t, id]) => refs['tag ' + t] = id);
    const svg = graph({
      label: 'Your commit graph', lanes: Array(lanesUsed).fill(0), dx: 70,
      commits: vis.map((id, i) => { const c = st.commits[id]; return { id, label: String(c.n), lane: c.lane, parents: c.parents.filter(p => vis.includes(p)), x: i, ghost: !live.has(id), hi: id === headId() }; }),
      refs, head: st.head.b && st.branches[st.head.b] ? st.head.b : headId()
    });
    const w = +svg.match(/viewBox="0 0 ([\d.]+)/)[1];
    return `<div style="overflow-x:auto;text-align:center">${svg.replace('<svg ', `<svg style="width:${Math.round(w * .8)}px;max-width:none;display:inline-block" `)}</div>`;
  }
  function fileRows() {
    const h = headTree(), conf = st.merging ? st.merging.conflicts : [];
    const all = keys(st.files, st.index, h);
    if (!all.length) return `<div class="empty">Folder is empty.</div>`;
    return all.map(f => {
      let s, cls;
      if (conf.includes(f)) [s, cls] = ['conflict', 'danger'];
      else if (!(f in st.files)) [s, cls] = [f in st.index ? 'deleted, not staged' : 'deleted, staged', 'warn'];
      else if (!(f in st.index) && !(f in h)) [s, cls] = ['untracked', 'warn'];
      else if (st.files[f] !== st.index[f]) [s, cls] = ['changed, not staged', 'warn'];
      else if (st.index[f] !== h[f]) [s, cls] = ['staged', 'accent'];
      else [s, cls] = ['saved', 'ok'];
      return `<div class="row"><div class="sq ${cls === 'accent' ? '' : cls === 'danger' ? 'danger' : cls}"><b>${esc(f.split('.').pop().slice(0, 4).toUpperCase())}</b></div><div class="t"><b class="mono" style="font-size:15px">${esc(f)}</b><span>${esc((st.files[f] || '').split('\n')[0].slice(0, 40)) || '&nbsp;'}</span></div><span class="tag ${cls}">${s}</span></div>`;
    }).join('');
  }
  function draw() {
    const box = document.getElementById('pg-out'); if (!box) return;
    box.innerHTML = out.map(l => `<div class="pl ${l.c}">${esc(l.t) || '&nbsp;'}</div>`).join('');
    box.scrollTop = box.scrollHeight;
    document.getElementById('pg-where').textContent = st.inited ? `~/${st.cwdName} (${st.head.b || short(st.head.id)})` : `~/${st.cwdName}`;
    document.getElementById('pg-files').innerHTML = fileRows();
    document.getElementById('pg-graph').innerHTML = drawGraph();
    const rem = st.remote ? Object.entries(st.remote.branches) : [];
    document.getElementById('pg-remote').innerHTML = !st.remote ? 'Not connected. Add a remote to get a pretend GitHub.' : rem.length ? rem.map(([b, id]) => `<span class="tag accent">${esc(b)} → ${st.commits[id].n}</span>`).join(' ') : 'Connected to origin. Nothing pushed yet.';
    const sb = document.getElementById('pg-stash'); sb.textContent = st.stash.length + ' in the stash'; sb.hidden = !st.stash.length;
    const done = MISSIONS.filter(m => m[2]()).length;
    document.getElementById('pg-mcount').textContent = `${done} of ${MISSIONS.length}`;
    document.getElementById('pg-missions').innerHTML = MISSIONS.map(([n, hint, ok]) => `<div class="row"><div class="tile ${ok() ? 'good' : 'unk'}"><small>${ok() ? 'DONE' : 'TODO'}</small><b>${ok() ? '✓' : '·'}</b></div><div class="t"><b>${esc(n)}</b><span>Hint: <button type="button" class="hintcmd" data-cmd="${esc(hint)}">${esc(hint)}</button></span></div></div>`).join('');
  }

  GH.renderPlay = function (root) {
    root.innerHTML = `<style>
      .pg{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:22px;align-items:start}
      @media(max-width:900px){.pg{grid-template-columns:1fr}}
      .pg .term{margin:0}
      #pg-out{height:420px;overflow-y:auto;padding:12px 14px;font:13.5px/1.55 var(--mono)}
      .pl{white-space:pre-wrap;word-break:break-word}.pl.c{color:#fff;font-weight:700}.pl.c::before{content:"$ ";color:#7CF0B5}
      .pl.o{color:#CFCBF5}.pl.e{color:#FF9DB5}.pl.g{color:#7CF0B5}.pl.y{color:#FFD27A}.pl.m{color:#8E8AC0}.pl.w{color:#FFC24B}
      .pgin{display:flex;gap:8px;align-items:center;border-top:2px solid var(--ink);padding:10px 14px;background:var(--night2)}
      .pgin label{color:#7CF0B5;font:700 13.5px var(--mono);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:45%}
      .pgin input{flex:1;min-width:0;background:transparent;border:0;outline:0;color:#fff;font:700 14.5px var(--mono);caret-color:#7CF0B5}
      .pgside{display:grid;gap:16px;min-width:0}
      .pgside .card{padding:16px 18px}
      .pgside .list .row{padding:10px 14px}
      .pgside .sq{width:44px;height:44px;border-radius:12px}.pgside .sq b{font-size:10.5px}
      .pgside .tile{width:52px;height:52px;border-radius:12px}.pgside .tile b{font-size:18px}
      .pgsec{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px;gap:10px;flex-wrap:wrap}
      .pgsec h3{font:800 12.5px "Manrope",sans-serif;letter-spacing:.12em;text-transform:uppercase;color:var(--ink2);margin:0}
      .hintcmd{border:0;background:var(--sand);border-radius:6px;padding:1px 6px;font:700 12.5px var(--mono);color:var(--ink);cursor:pointer}
      .hintcmd:hover{background:var(--accent-tint)}
      .quick{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
    </style>
    <section class="hero rv"><div><div class="kicker"><span class="tag accent">Safe to break</span><span class="tag">Nothing here touches your real computer</span></div><h1>Playground.</h1><p>A pretend Git in your browser. Type real commands and watch your files and commit graph change. Edit files with <code>echo "text" &gt; file</code>.</p></div>
    <div class="avatars"><span class="orb" id="pg-mcount-orb">Git<span class="badge">sandbox</span></span></div></section>
    <div class="pg">
      <div>
        <div class="term"><div class="tb"><i></i><i></i><i></i><span>playground terminal</span></div><div id="pg-out" aria-live="polite"></div>
        <form class="pgin" id="pg-form"><label for="pg-in" id="pg-where">~/my-app</label><input id="pg-in" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="type a command, Enter to run"></form></div>
        <div class="quick" aria-label="Quick commands">${['git status', 'git add .', 'git commit -m "save"', 'git log --oneline', 'git branch', 'ls', 'git reflog'].map(c => `<button type="button" class="chip" data-cmd="${esc(c)}">${esc(c)}</button>`).join('')}</div>
        <div class="btnrow"><button class="btn small" type="button" id="pg-team">Teammate pushes to GitHub</button><button class="btn small" type="button" id="pg-reset">Start over</button></div>
      </div>
      <div class="pgside">
        <div class="card"><div class="pgsec"><h3>Commit graph</h3><span class="tag" id="pg-stash"></span></div><div id="pg-graph"></div></div>
        <div><div class="pgsec"><h3>Files in your folder</h3><span class="tag">live</span></div><div class="list" id="pg-files"></div></div>
        <div class="card"><div class="pgsec"><h3>Pretend GitHub</h3></div><div id="pg-remote" style="font-weight:600;color:var(--ink2)"></div></div>
      </div>
    </div>
    <div class="sec"><h3>Missions</h3><span class="tag ok" id="pg-mcount"></span></div>
    <div class="list" id="pg-missions"></div>
    <footer>The playground copies how Git behaves for common commands. Some things are simplified: there is no editor, and rebase stops on conflicts. Your real terminal behaves the same way for everything shown here.</footer>`;
    if (!out.length) { say('# Welcome. This folder has two files and no Git yet.', 'm'); say('# Start with: git init   then: git status', 'm'); }
    const input = document.getElementById('pg-in');
    const exec = c => { try { run(c); } catch (e) { err('# Playground hiccup: ' + e.message); } hist.push(c); hpos = hist.length; draw(); };
    document.getElementById('pg-form').addEventListener('submit', e => { e.preventDefault(); const v = input.value; input.value = ''; exec(v); });
    input.addEventListener('keydown', e => {
      if (e.key === 'ArrowUp' && hpos > 0) { input.value = hist[--hpos]; e.preventDefault(); }
      if (e.key === 'ArrowDown') { hpos = Math.min(hist.length, hpos + 1); input.value = hist[hpos] || ''; e.preventDefault(); }
    });
    root.addEventListener('click', e => { const b = e.target.closest('[data-cmd]'); if (!b) return; if (b.classList.contains('hintcmd')) { input.value = b.dataset.cmd; input.focus(); } else exec(b.dataset.cmd); });
    document.getElementById('pg-team').addEventListener('click', teammate);
    document.getElementById('pg-reset').addEventListener('click', () => { st = fresh(); out = []; say('# Fresh start. Two files, no Git yet. Try git init.', 'm'); draw(); });
    draw();
  };
  GH._pg = { run, state: () => st, out: () => out };
})();
