/* Module 4a: Pro level. Actions, shipping, rescue, detective tools, power setup. */
(function () {
  const { P, graph, term, esc } = GH;

  // a row of boxes joined by arrows. items: [{t, s, f}]  (title, subtitle, fill)
  const chain = (items, label, opts) => {
    opts = opts || {};
    const BW = opts.bw || 128, BH = 92, G = 42, X0 = 12, Y = 40;
    const W = X0 * 2 + items.length * BW + (items.length - 1) * G, H = Y + BH + 40;
    let out = '';
    items.forEach((it, i) => {
      const x = X0 + i * (BW + G);
      out += `<rect x="${x + 4}" y="${Y + 5}" width="${BW}" height="${BH}" rx="16" fill="${P.ink}"/><rect x="${x}" y="${Y}" width="${BW}" height="${BH}" rx="16" fill="${it.f || P.white}" stroke="${P.ink}" stroke-width="2.5"/>`;
      if (it.big) out += `<text x="${x + BW / 2}" y="${Y + 40}" text-anchor="middle" font-size="26" font-weight="800" fill="${it.bc || P.ink}">${esc(it.big)}</text>`;
      out += `<text x="${x + BW / 2}" y="${Y + (it.big ? 64 : 46)}" text-anchor="middle" font-size="14" font-weight="800" fill="${P.ink}">${esc(it.t)}</text>`;
      if (it.s) out += `<text x="${x + BW / 2}" y="${Y + (it.big ? 80 : 66)}" text-anchor="middle" font-size="11.5" font-weight="700" font-family="JetBrains Mono, monospace" fill="${P.mute}">${esc(it.s)}</text>`;
      if (i < items.length - 1) {
        const ax = x + BW + 6, bx = x + BW + G - 6, ay = Y + BH / 2;
        out += `<path d="M${ax} ${ay} L${bx - 6} ${ay}" stroke="${P.accent}" stroke-width="3.5" stroke-linecap="round"/><path d="M${bx - 9} ${ay - 7} L${bx} ${ay} L${bx - 9} ${ay + 7}z" fill="${P.accent}"/>`;
      }
    });
    if (opts.caption) out += `<text x="${W / 2}" y="24" text-anchor="middle" font-size="12.5" font-weight="800" fill="${P.ink2}" letter-spacing="1.5">${esc(opts.caption)}</text>`;
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(label)}">${out}</svg>`;
  };

  const robot = `<svg viewBox="0 0 560 300" role="img" aria-label="You push code, a robot on GitHub tests it and gives a green check">
    <g transform="translate(20 110)"><rect x="4" y="6" width="120" height="76" rx="10" fill="${P.ink}"/><rect width="120" height="76" rx="10" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>
    <rect x="10" y="10" width="100" height="50" rx="5" fill="${P.paper}"/><text x="60" y="40" text-anchor="middle" font-size="13" font-weight="800" font-family="JetBrains Mono, monospace" fill="${P.ink}">git push</text>
    <rect x="-10" y="76" width="140" height="10" rx="5" fill="${P.ink2}"/><text x="60" y="114" text-anchor="middle" font-size="14" font-weight="800" fill="${P.ink}">You</text></g>
    <path d="M160 150 L222 150" stroke="${P.accent}" stroke-width="4" stroke-linecap="round"/><path d="M216 141 L230 150 L216 159z" fill="${P.accent}"/>
    <g transform="translate(244 54)"><line x1="64" y1="0" x2="64" y2="22" stroke="${P.ink}" stroke-width="3"/><circle cx="64" cy="0" r="7" fill="${P.danger}" stroke="${P.ink}" stroke-width="2.5"/>
    <rect x="18" y="26" width="92" height="66" rx="16" fill="${P.ink}"/><rect x="14" y="22" width="92" height="66" rx="16" fill="${P.tint}" stroke="${P.ink}" stroke-width="2.5"/>
    <circle cx="42" cy="52" r="10" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/><circle cx="78" cy="52" r="10" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/><circle cx="42" cy="52" r="4" fill="${P.ink}"/><circle cx="78" cy="52" r="4" fill="${P.ink}"/>
    <rect x="44" y="70" width="32" height="6" rx="3" fill="${P.ink}"/>
    <rect x="4" y="98" width="120" height="96" rx="18" fill="${P.accent}" stroke="${P.ink}" stroke-width="2.5"/>
    <text x="64" y="138" text-anchor="middle" font-size="13" font-weight="800" fill="${P.white}">GitHub</text><text x="64" y="156" text-anchor="middle" font-size="13" font-weight="800" fill="${P.white}">Actions</text>
    <text x="64" y="176" text-anchor="middle" font-size="11" font-weight="700" font-family="JetBrains Mono, monospace" fill="${P.tint}">npm test</text></g>
    <path d="M384 150 L446 150" stroke="${P.accent}" stroke-width="4" stroke-linecap="round"/><path d="M440 141 L454 150 L440 159z" fill="${P.accent}"/>
    <g transform="translate(462 104)"><circle cx="40" cy="46" r="40" fill="${P.okT}" stroke="${P.ink}" stroke-width="2.5"/><path d="M22 47 L35 60 L60 32" fill="none" stroke="${P.ok}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="40" y="112" text-anchor="middle" font-size="14" font-weight="800" fill="${P.ink}">Checks pass</text></g></svg>`;

  const matrix = (() => {
    const os = ['ubuntu', 'windows', 'macos'], nodes = ['18', '20', '22'];
    let out = `<text x="290" y="28" text-anchor="middle" font-size="12.5" font-weight="800" fill="${P.ink2}" letter-spacing="1.5">ONE WORKFLOW, 9 JOBS AT ONCE</text>`;
    nodes.forEach((n, j) => out += `<text x="${210 + j * 120}" y="62" text-anchor="middle" font-size="13" font-weight="800" font-family="JetBrains Mono, monospace" fill="${P.accent}">node ${n}</text>`);
    os.forEach((o, i) => {
      out += `<text x="132" y="${104 + i * 62}" text-anchor="end" font-size="13" font-weight="800" font-family="JetBrains Mono, monospace" fill="${P.ink}">${o}</text>`;
      nodes.forEach((n, j) => {
        const bad = i === 1 && j === 0, x = 160 + j * 120, y = 78 + i * 62;
        out += `<rect x="${x + 3}" y="${y + 4}" width="100" height="44" rx="12" fill="${P.ink}"/><rect x="${x}" y="${y}" width="100" height="44" rx="12" fill="${bad ? P.dangerT : P.okT}" stroke="${P.ink}" stroke-width="2.5"/>`;
        out += bad ? `<path d="M${x + 40} ${y + 12} l20 20 M${x + 60} ${y + 12} l-20 20" stroke="${P.danger}" stroke-width="5" stroke-linecap="round"/>`
          : `<path d="M${x + 36} ${y + 22} l9 9 l18 -18" fill="none" stroke="${P.ok}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;
      });
    });
    return `<svg viewBox="0 0 560 280" role="img" aria-label="A grid of 3 operating systems by 3 Node versions. One job fails on windows with node 18.">${out}</svg>`;
  })();

  const prChecks = `<svg viewBox="0 0 560 270" role="img" aria-label="A pull request page with three status checks and a badge in the README">
    <rect x="18" y="20" width="524" height="230" rx="18" fill="${P.ink}"/><rect x="14" y="14" width="524" height="230" rx="18" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>
    <text x="38" y="48" font-size="16" font-weight="800" fill="${P.ink}">Pull request #42: Add login page</text>
    ${[['CI / test (push)', 1], ['CI / lint (push)', 1], ['Deploy preview', 0]].map(([t, ok], i) => `<g transform="translate(38 ${68 + i * 46})"><rect width="300" height="36" rx="10" fill="${ok ? P.okT : P.warnT}" stroke="${P.ink}" stroke-width="2"/>
      <circle cx="20" cy="18" r="9" fill="${ok ? P.ok : P.warn}"/><text x="40" y="23" font-size="13" font-weight="800" fill="${P.ink}">${t}</text><text x="286" y="23" text-anchor="end" font-size="12" font-weight="800" fill="${ok ? P.ok : P.warn}">${ok ? 'passed' : 'running'}</text></g>`).join('')}
    <g transform="translate(366 70)"><text x="0" y="0" font-size="11.5" font-weight="800" fill="${P.mute}" letter-spacing="1">README BADGE</text>
    <rect x="0" y="12" width="56" height="26" rx="6" fill="${P.ink2}"/><rect x="56" y="12" width="90" height="26" rx="6" fill="${P.ok}"/><rect x="50" y="12" width="12" height="26" fill="${P.ok}"/>
    <text x="28" y="30" text-anchor="middle" font-size="12" font-weight="800" fill="${P.white}">CI</text><text x="100" y="30" text-anchor="middle" font-size="12" font-weight="800" fill="${P.white}">passing</text>
    <rect x="0" y="80" width="146" height="40" rx="12" fill="${P.ok}" stroke="${P.ink}" stroke-width="2.5"/><text x="73" y="106" text-anchor="middle" font-size="13.5" font-weight="800" fill="${P.white}">Merge allowed</text></g></svg>`;

  COURSE.add({
    id: 'l29', module: 4, minutes: 12,
    title: 'Robots that check your work.',
    kicker: 'GitHub Actions and CI',
    summary: 'GitHub Actions is a robot that wakes up when something happens in your repo. It runs your tests, builds your app, and reports back with a green check or a red cross.',
    parts: [
      {
        pic: robot,
        h: 'A robot runs on every push.',
        text: ['You push code. GitHub starts a fresh computer in the cloud, runs the steps you wrote, then throws the computer away.', 'This is called <b>CI</b>, short for continuous integration. Every change gets tested the same way, every time.'],
        tip: 'Public repos get Actions minutes for free. Private repos get a monthly free allowance.'
      },
      {
        pic: term(['# file: .github/workflows/ci.yml', 'name: CI', 'on:', '  push:', '    branches: [main]', '  pull_request:', '  workflow_dispatch:', '  schedule:', '    - cron: "0 6 * * 1"', 'jobs:', '  test:', '    runs-on: ubuntu-latest', '    steps:', '      - uses: actions/checkout@v4', '      - uses: actions/setup-node@v4', '        with:', '          node-version: 20', '      - run: npm ci', '      - run: npm test'], 'ci.yml'),
        h: 'The recipe is one YAML file.',
        text: ['Workflows live in <code>.github/workflows/</code>. YAML uses spaces for nesting, so indentation matters.', '<b>on</b> says when to wake up. <b>jobs</b> say what to do. Each job has a <b>runs-on</b> machine and a list of <b>steps</b>.', 'A step either <b>uses</b> a ready-made action, like <code>actions/checkout@v4</code>, or <b>run</b>s a shell command.'],
        cmds: [
          { c: 'mkdir -p .github/workflows', d: 'Make the folder where workflow files live.' },
          { c: 'git add .github/workflows/ci.yml', d: 'Stage the workflow like any other file.' },
          { c: 'git commit -m "Add CI" && git push', d: 'Push it. The robot starts on the next push.' }
        ]
      },
      {
        pic: chain([{ t: 'push', s: 'on: push', f: P.tint }, { t: 'pull_request', s: 'PR opened', f: P.tint }, { t: 'schedule', s: 'cron', f: P.warnT }, { t: 'by hand', s: 'Run button', f: P.okT }], 'Four triggers that can wake a workflow', { caption: 'WHAT CAN WAKE THE ROBOT', bw: 118 }),
        h: 'Pick what wakes it up.',
        text: ['<b>push</b>: someone pushed commits. <b>pull_request</b>: a PR was opened or updated.', '<b>schedule</b> runs on a timer written in cron. <code>0 6 * * 1</code> means 06:00 every Monday, in UTC.', '<b>workflow_dispatch</b> adds a Run button, so you can start it by hand.']
      },
      {
        pic: matrix,
        h: 'Test many setups at once.',
        text: ['A <b>matrix</b> runs the same job with different settings side by side.', 'Here one combo fails. You found a Windows bug before your users did.'],
        tip: 'Write it as <code>strategy: matrix: node: [18, 20, 22]</code>, then use the value in a step.'
      },
      {
        pic: prChecks,
        h: 'Checks guard your pull requests.',
        text: ['Every run shows up on the PR as a <b>status check</b>. Teams can block merging until checks are green.', 'A <b>badge</b> in your README shows the latest result to everyone.', '<b>Secrets</b> hold passwords and API keys. In YAML you read one as <code>secrets.NAME</code> inside double curly braces with a dollar sign in front. Secrets never show up in logs.'],
        cmds: [
          { c: 'gh secret set NPM_TOKEN', d: 'Save a secret for this repo. It asks you to paste the value.' },
          { c: 'gh secret list', d: 'Show secret names. Values stay hidden.' },
          { c: 'gh variable set NODE_ENV', d: 'Save a plain, non-secret setting for workflows.' }
        ],
        warn: 'Never put a real password straight into a YAML file. Anyone who can read the repo can read it.'
      },
      {
        pic: term(['$ gh run list', 'STATUS  TITLE        WORKFLOW  BRANCH  ID', '✓       Add login    CI        main    8812', 'X       Fix header   CI        fix-h   8809', '$ gh run view 8809 --log', '$ gh run rerun 8809 --failed', '$ gh run watch'], 'gh run'),
        h: 'Drive the robot from the terminal.',
        text: ['The <code>gh</code> tool lists, starts, watches and reruns workflows without opening the browser.'],
        cmds: [
          { c: 'gh workflow list', d: 'List the workflows in this repo.' },
          { c: 'gh workflow view ci.yml', d: 'Show one workflow and its recent runs.' },
          { c: 'gh workflow run ci.yml', d: 'Start a workflow by hand. It needs a workflow_dispatch trigger.' },
          { c: 'gh workflow disable ci.yml', d: 'Pause a workflow so it stops running.' },
          { c: 'gh workflow enable ci.yml', d: 'Turn a paused workflow back on.' },
          { c: 'gh run list', d: 'List recent runs with pass or fail.' },
          { c: 'gh run view 8809 --log', d: 'Read the full log of one run.' },
          { c: 'gh run watch', d: 'Follow a running job live until it ends.' },
          { c: 'gh run rerun 8809 --failed', d: 'Run only the failed jobs again.' },
          { c: 'gh run download 8809', d: 'Download files (artifacts) a run saved.' },
          { c: 'gh cache list', d: 'List saved caches that make runs faster.' }
        ]
      }
    ],
    quiz: [
      { type: 'pick', q: 'Where must a workflow file live?', options: ['.github/workflows/', 'workflows/github/', '.git/hooks/', 'the README'], answer: 0, hints: { 2: 'That folder is for local hooks. Hooks are not shared, and they run on your machine.' }, why: 'GitHub only reads workflows from .github/workflows/ in the repo.' },
      { type: 'match', q: 'Match each YAML key to its job.', pairs: [['on', 'When the workflow wakes up'], ['runs-on', 'Which machine to use'], ['steps', 'The list of things to do'], ['uses', 'Run a ready-made action'], ['run', 'Run a shell command']], why: 'on, jobs, runs-on, steps, uses and run cover most workflows you will ever write.' },
      { type: 'bucket', q: 'Is it a trigger, or something a step does?', buckets: ['Trigger (on:)', 'Step'], items: [['push', 0], ['pull_request', 0], ['schedule', 0], ['workflow_dispatch', 0], ['uses: actions/checkout@v4', 1], ['run: npm test', 1]], why: 'Triggers sit under on:. Steps sit under a job.' },
      { type: 'order', q: 'Order what happens after you push.', items: ['You run git push', 'GitHub sees the push trigger', 'A fresh machine starts', 'Checkout gets your code', 'Your tests run', 'A check appears on the commit'], why: 'Trigger, machine, checkout, run, report. Every workflow follows this shape.' },
      { type: 'fill', q: 'Finish the first steps of a Node job.', text: 'runs-on: ___\nsteps:\n  - uses: actions/___@v4\n  - run: npm ___', options: ['ubuntu-latest', 'checkout', 'test', 'laptop', 'clone', 'push'], answer: ['ubuntu-latest', 'checkout', 'test'], why: 'Pick a runner, check out the code, then run your tests.' },
      { type: 'type', q: 'A run failed. Rerun only the failed jobs of run 8809.', answers: ['gh run rerun 8809 --failed'], hint: 'gh run rerun, the id, then a flag.', why: 'The --failed flag skips jobs that already passed, which saves time.' },
      { type: 'type', q: 'Save an API key called <code>API_KEY</code> as a repo secret.', answers: ['gh secret set API_KEY'], hint: 'gh secret, then the action, then the name.', why: 'gh secret set prompts for the value, so it never sits in your shell history.' },
      { type: 'pick', q: 'You want a Run button to start the workflow by hand. Which trigger?', options: ['workflow_dispatch', 'schedule', 'push', 'manual: true'], answer: 0, why: 'workflow_dispatch allows manual runs from the Actions tab or gh workflow run.' }
    ]
  });

  /* ---------- l30 Ship it ---------- */
  const gift = `<svg viewBox="0 0 560 280" role="img" aria-label="A gift box tagged v1.0.0 with release notes and a zip file attached">
    <g transform="translate(60 70)"><rect x="5" y="6" width="170" height="140" rx="12" fill="${P.ink}"/><rect width="170" height="140" rx="12" fill="${P.accent}" stroke="${P.ink}" stroke-width="2.5"/>
    <rect x="-10" y="-26" width="190" height="40" rx="10" fill="${P.accent}" stroke="${P.ink}" stroke-width="2.5"/>
    <rect x="72" y="-26" width="26" height="166" fill="${P.warnT}" stroke="${P.ink}" stroke-width="2.5"/>
    <path d="M85 -26 C60 -60 30 -50 50 -30 M85 -26 C110 -60 140 -50 120 -30" fill="none" stroke="${P.ink}" stroke-width="3"/></g>
    <g transform="translate(240 40) rotate(8)"><rect width="104" height="40" rx="8" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/><circle cx="16" cy="20" r="5" fill="${P.ink}"/>
    <text x="60" y="26" text-anchor="middle" font-size="15" font-weight="800" font-family="JetBrains Mono, monospace" fill="${P.ink}">v1.0.0</text></g>
    <g transform="translate(330 110)"><rect x="4" y="5" width="190" height="130" rx="12" fill="${P.ink}"/><rect width="190" height="130" rx="12" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>
    <text x="16" y="28" font-size="13" font-weight="800" fill="${P.ink}">What's new</text>
    ${['Login page', 'Dark mode', 'Fix crash on save'].map((t, i) => `<circle cx="22" cy="${48 + i * 20}" r="3.5" fill="${P.accent}"/><text x="32" y="${52 + i * 20}" font-size="12" font-weight="700" fill="${P.ink2}">${t}</text>`).join('')}
    <rect x="16" y="100" width="88" height="20" rx="6" fill="${P.sand}"/><text x="60" y="114" text-anchor="middle" font-size="11" font-weight="800" font-family="JetBrains Mono, monospace" fill="${P.ink}">app.zip</text></g></svg>`;

  const pages = chain([{ t: 'repo', s: 'index.html', f: P.white }, { t: 'Pages', s: 'build + host', f: P.tint }, { t: 'website', s: 'ana.github.io', f: P.okT }], 'Files in a repo become a website with GitHub Pages', { caption: 'GITHUB PAGES', bw: 150 });

  const extras = `<svg viewBox="0 0 560 250" role="img" aria-label="Three extras: a gist note, a codespace in the cloud, and a package box">
    ${[['Gist', 'a tiny shareable file', P.warnT], ['Codespace', 'your editor in the cloud', P.tint], ['Package', 'a published library', P.okT]].map(([t, s, f], i) => {
      const x = 16 + i * 184;
      const icon = i === 0 ? `<rect x="${x + 52}" y="42" width="60" height="64" rx="4" fill="${P.warnT}" stroke="${P.ink}" stroke-width="2.5"/>${[58, 70, 82].map(y => `<rect x="${x + 62}" y="${y}" width="40" height="5" rx="2.5" fill="${P.warn}"/>`).join('')}`
        : i === 1 ? `<path d="M${x + 52} ${88} a14 14 0 0 1 4 -28 a20 20 0 0 1 38 -4 a14 14 0 0 1 14 32z" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/><text x="${x + 82}" y="${82}" text-anchor="middle" font-size="13" font-weight="800" font-family="JetBrains Mono, monospace" fill="${P.accent}">&lt;/&gt;</text>`
          : `<path d="M${x + 82} ${38} l32 16 v36 l-32 16 l-32 -16 v-36z" fill="${P.okT}" stroke="${P.ink}" stroke-width="2.5" stroke-linejoin="round"/><path d="M${x + 50} ${54} l32 16 l32 -16 M${x + 82} ${70} v36" fill="none" stroke="${P.ink}" stroke-width="2.5"/>`;
      return `<rect x="${x + 4}" y="20" width="164" height="210" rx="16" fill="${P.ink}"/><rect x="${x}" y="16" width="164" height="210" rx="16" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>${icon}
        <text x="${x + 82}" y="150" text-anchor="middle" font-size="17" font-weight="800" fill="${P.ink}">${t}</text><text x="${x + 82}" y="172" text-anchor="middle" font-size="12" font-weight="700" fill="${P.mute}">${s}</text>`;
    }).join('')}</svg>`;

  COURSE.add({
    id: 'l30', module: 4, minutes: 11,
    title: 'Ship it.',
    kicker: 'Releases, Pages, Gists, Codespaces',
    summary: 'Your code works. Now hand it to people: wrap it as a release, host it as a website, share a snippet, or code in the cloud.',
    parts: [
      {
        pic: gift,
        h: 'A release is a wrapped gift.',
        text: ['A <b>release</b> takes a tag like <code>v1.0.0</code> and adds notes and downloadable files.', 'Numbers follow <b>semantic versioning</b>: MAJOR.MINOR.PATCH. Breaking change, new feature, bug fix.', '<code>--generate-notes</code> writes the notes from your merged pull requests. A <b>changelog</b> is the same idea kept in a CHANGELOG.md file.'],
        cmds: [
          { c: 'gh release create v1.0.0 --generate-notes', d: 'Tag and publish a release with auto-written notes.' },
          { c: 'gh release create v1.0.0 --title "First launch" --notes "Hello world"', d: 'Set the title and notes yourself.' },
          { c: 'gh release create v1.0.0 ./app.zip', d: 'Attach a file (an asset) people can download.' },
          { c: 'gh release create v1.1.0-beta --draft --prerelease', d: 'Save as a hidden draft, marked as not stable yet.' }
        ]
      },
      {
        pic: term(['$ gh release list', 'TITLE          TYPE        TAG       PUBLISHED', 'First launch   Latest      v1.0.0    about 2 days ago', 'Beta           Pre-release v1.1.0-b  about 1 hour ago', '$ gh release upload v1.0.0 ./manual.pdf', '$ gh release download v1.0.0'], 'gh release'),
        h: 'Manage releases later.',
        text: ['Add files, read notes, download assets, or delete a release you got wrong.'],
        cmds: [
          { c: 'gh release list', d: 'List all releases.' },
          { c: 'gh release view v1.0.0', d: 'Show the notes and files of one release.' },
          { c: 'gh release upload v1.0.0 ./manual.pdf', d: 'Add another file to an existing release.' },
          { c: 'gh release download v1.0.0', d: 'Download the files of a release.' },
          { c: 'gh release delete v1.0.0', d: 'Delete the release. The git tag stays unless you delete it too.' }
        ]
      },
      {
        pic: pages,
        h: 'Turn a repo into a website.',
        text: ['<b>GitHub Pages</b> hosts static sites for free: HTML, CSS, JavaScript.', 'Serve from a branch and folder, or build with an Actions workflow. Turn it on in <b>Settings, then Pages</b>.', 'A repo named <code>yourname.github.io</code> becomes your personal site at that address.'],
        cmds: [
          { c: 'gh api -X POST repos/OWNER/REPO/pages -f "source[branch]=main" -f "source[path]=/"', d: 'Turn on Pages from the terminal, serving the main branch.' },
          { c: 'gh browse --settings', d: 'Open the repo settings in your browser to find Pages.' }
        ],
        tip: 'Pages is for static files. It cannot run a server or a database.'
      },
      {
        pic: extras,
        h: 'Gists, Codespaces, Packages.',
        text: ['A <b>Gist</b> is one or a few files with its own link. Great for snippets and notes. Each gist is a tiny git repo.', 'A <b>Codespace</b> is a full editor and terminal running in the cloud, set up for your repo. Code from any computer.', '<b>GitHub Packages</b> hosts libraries and container images next to your code. <b>Copilot</b> is GitHub\'s AI helper that suggests code as you type.'],
        cmds: [
          { c: 'gh gist create notes.txt --public', d: 'Share a file as a public gist. Leave off --public for a secret one.' },
          { c: 'gh gist list', d: 'List your gists.' },
          { c: 'gh gist view <id>', d: 'Print a gist in the terminal.' },
          { c: 'gh gist edit <id>', d: 'Edit a gist in your editor.' },
          { c: 'gh codespace create', d: 'Start a new cloud dev machine for a repo.' },
          { c: 'gh codespace list', d: 'List your codespaces.' },
          { c: 'gh codespace ssh', d: 'Open a terminal inside a codespace.' },
          { c: 'gh codespace code', d: 'Open the codespace in VS Code.' },
          { c: 'gh codespace stop', d: 'Stop it so it does not use your hours.' },
          { c: 'gh codespace delete', d: 'Delete a codespace you no longer need.' }
        ],
        warn: 'A secret gist is unlisted, not private. Anyone with the link can read it.'
      }
    ],
    quiz: [
      { type: 'pick', q: 'Your app had a bug fix only. Version was 2.3.1. What comes next?', options: ['2.3.2', '2.4.0', '3.0.0', '2.3.1.1'], answer: 0, hints: { 1: 'That is for a new feature.', 2: 'That is for a breaking change.' }, why: 'Bug fixes bump PATCH, the last number.' },
      { type: 'type', q: 'Publish release <code>v1.0.0</code> with notes written from merged pull requests.', answers: ['gh release create v1.0.0 --generate-notes'], hint: 'gh release create, the tag, then a flag that generates notes.', why: '--generate-notes builds the list of changes for you.' },
      { type: 'match', q: 'Match the GitHub extra to what it does.', pairs: [['Release', 'A tagged version with notes and downloads'], ['Pages', 'Hosts a static website from a repo'], ['Gist', 'Shares a small snippet with a link'], ['Codespace', 'A cloud editor and terminal for a repo'], ['Packages', 'Hosts libraries and container images']], why: 'Each one hands your work to people in a different way.' },
      { type: 'bucket', q: 'Which gh command group does each belong to?', buckets: ['gh release', 'gh gist', 'gh codespace'], items: [['upload', 0], ['download', 0], ['--generate-notes', 0], ['create notes.txt --public', 1], ['edit <id>', 1], ['ssh', 2], ['code', 2], ['stop', 2]], why: 'Same verbs, different groups. The group name tells gh what you mean.' },
      { type: 'fill', q: 'Ship a beta as a hidden draft.', text: 'gh ___ create v2.0.0-beta --___ --prerelease', options: ['release', 'draft', 'tag', 'hidden', 'gist', 'beta'], answer: ['release', 'draft'], why: '--draft keeps it hidden until you publish it. --prerelease marks it as not stable.' },
      { type: 'order', q: 'Order the steps to ship v1.0.0 with a file.', items: ['Merge the last pull request into main', 'Build app.zip', 'gh release create v1.0.0 ./app.zip --generate-notes', 'Share the release link'], why: 'Finish the code, build, release, tell people.' },
      { type: 'pick', q: 'What URL does a repo named <code>ana.github.io</code> get?', options: ['https://ana.github.io', 'https://github.com/ana/pages', 'https://pages.ana.com', 'It gets no URL'], answer: 0, why: 'The special repo name becomes your personal Pages site.' }
    ]
  });

  /* ---------- l31 Rescue missions ---------- */
  const blackbox = `<svg viewBox="0 0 560 270" role="img" aria-label="The reflog is a black box that records every place HEAD has been">
    <g transform="translate(24 70)"><rect x="5" y="6" width="150" height="120" rx="14" fill="${P.ink}"/><rect width="150" height="120" rx="14" fill="${P.warn}" stroke="${P.ink}" stroke-width="2.5"/>
    <rect x="16" y="16" width="118" height="36" rx="8" fill="${P.ink}"/><circle cx="34" cy="34" r="7" fill="${P.danger}"/><text x="88" y="39" text-anchor="middle" font-size="12" font-weight="800" fill="${P.white}">REC</text>
    <text x="75" y="80" text-anchor="middle" font-size="15" font-weight="800" fill="${P.ink}">reflog</text><text x="75" y="100" text-anchor="middle" font-size="11.5" font-weight="700" fill="${P.ink}">black box</text></g>
    <g transform="translate(206 26)"><rect x="4" y="5" width="330" height="222" rx="14" fill="${P.ink}"/><rect width="330" height="222" rx="14" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>
    ${[['HEAD@{0}', 'reset: moving to HEAD~3', P.dangerT], ['HEAD@{1}', 'commit: add search', P.okT], ['HEAD@{2}', 'commit: fix menu', P.white], ['HEAD@{3}', 'checkout: to main', P.white], ['HEAD@{4}', 'commit: start', P.white]].map(([a, b, f], i) =>
      `<rect x="12" y="${14 + i * 40}" width="306" height="32" rx="8" fill="${f}" stroke="${P.sand}" stroke-width="2"/><text x="24" y="${35 + i * 40}" font-size="12.5" font-weight="800" font-family="JetBrains Mono, monospace" fill="${P.accent}">${a}</text><text x="120" y="${35 + i * 40}" font-size="12.5" font-weight="700" fill="${P.ink}">${b}</text>`).join('')}</g></svg>`;

  const wrongBranchBefore = graph({ label: 'Two commits made on main by mistake', commits: [{ id: 'A', parents: [] }, { id: 'B', parents: ['A'] }, { id: 'X', parents: ['B'], hi: true }, { id: 'Y', parents: ['X'], hi: true }], refs: { main: 'Y' }, head: 'main' });
  const wrongBranchAfter = graph({ label: 'After the fix: feature points at Y, main is back at B', lanes: ['main', 'feature'], commits: [{ id: 'A', parents: [] }, { id: 'B', parents: ['A'] }, { id: 'X', lane: 1, parents: ['B'], hi: true }, { id: 'Y', lane: 1, parents: ['X'], hi: true }], refs: { main: 'B', feature: 'Y' }, head: 'feature' });

  COURSE.add({
    id: 'l31', module: 4, minutes: 13,
    title: 'Rescue missions.',
    kicker: 'reflog and recovery recipes',
    summary: 'Almost nothing in Git is truly lost. If you committed it once, Git kept a note. This lesson is your first aid kit.',
    parts: [
      {
        pic: blackbox,
        h: 'The reflog remembers everything.',
        text: ['Every time HEAD moves (commit, reset, switch, rebase), Git writes a line in the <b>reflog</b>. Like a plane\'s black box.', '<code>HEAD@{1}</code> means "where HEAD was one move ago".', 'The reflog is local only. It is not pushed, and old entries expire after about 90 days.'],
        cmds: [
          { c: 'git reflog', d: 'List every place HEAD has been, newest first.' },
          { c: 'git reflog show main', d: 'Show the history of where the main branch pointed.' },
          { c: 'git reset --hard HEAD@{1}', d: 'Undo a bad reset: jump back to where you were one move ago.' }
        ]
      },
      {
        pic: term(['$ git branch -D search', 'Deleted branch search (was 4b7e9d1).', '$ git reflog', '4b7e9d1 HEAD@{2}: commit: add search box', '$ git branch search 4b7e9d1', '# the branch is back'], 'saved'),
        h: 'Bring back a deleted branch.',
        text: ['A branch is just a name on a commit. Delete the name and the commits are still there for a while.', 'Find the hash in the reflog, then put a new name on it.', 'If even the reflog lost it, <code>git fsck --lost-found</code> lists commits that nothing points to.'],
        cmds: [
          { c: 'git branch recovered 4b7e9d1', d: 'Make a new branch on a lost commit.' },
          { c: 'git fsck --lost-found', d: 'Find dangling commits nothing points to anymore.' }
        ]
      },
      {
        pic: term(['$ git merge feature', '# ...a big mess', '$ git reset --hard ORIG_HEAD', '# back to before the merge', '$ git merge --abort', '$ git rebase --abort', '$ git cherry-pick --abort'], 'abort buttons'),
        h: 'Every big move has an undo button.',
        text: ['Before a merge, rebase or reset, Git saves the old spot as <b>ORIG_HEAD</b>.', 'Still in the middle of a messy merge, rebase or cherry-pick? <b>--abort</b> puts everything back as it was before you started.'],
        cmds: [
          { c: 'git reset --hard ORIG_HEAD', d: 'Go back to where you were before the last merge, rebase or reset.' },
          { c: 'git merge --abort', d: 'Stop a merge with conflicts and restore the before state.' },
          { c: 'git rebase --abort', d: 'Stop a rebase and go back to the start.' },
          { c: 'git cherry-pick --abort', d: 'Stop a cherry-pick in progress.' },
          { c: 'git reset --merge', d: 'Undo a merge, keeping changes that were not part of it.' },
          { c: 'git revert -m 1 <merge-hash>', d: 'Undo a merge that is already pushed, by adding a new commit. -m 1 keeps the main side.' }
        ]
      },
      {
        pic: wrongBranchBefore + wrongBranchAfter,
        h: 'Oops, I committed on main.',
        text: ['Top: X and Y landed on main by mistake. Bottom: after three commands they live on a new branch, and main is clean.', 'Only do this before you push main.'],
        cmds: [
          { c: 'git branch feature', d: 'Put a new branch name on your current commit.' },
          { c: 'git reset --hard HEAD~2', d: 'Move main back two commits (use HEAD~1 for one).' },
          { c: 'git switch feature', d: 'Hop onto the branch that now holds your work.' }
        ]
      },
      {
        pic: term(['# typo in the message', '$ git commit --amend -m "Fix login bug"', '# forgot a file', '$ git add forgotten.css', '$ git commit --amend --no-edit', '# already pushed a bad commit', '$ git revert a1b2c3d'], 'quick recipes'),
        h: 'Small oops, small fix.',
        text: ['<b>Wrong message</b>: amend it. <b>Forgot a file</b>: add it and amend with no new message.', '<b>Already pushed</b>: do not rewrite history. Revert adds a new commit that undoes the old one.'],
        cmds: [
          { c: 'git commit --amend -m "Better message"', d: 'Replace the last commit message.' },
          { c: 'git commit --amend --no-edit', d: 'Add staged files to the last commit, same message.' },
          { c: 'git revert a1b2c3d', d: 'Safely undo a pushed commit with a new opposite commit.' }
        ]
      },
      {
        pic: chain([{ t: 'Rotate key', s: 'make it useless', f: P.dangerT, big: '1' }, { t: 'Scrub history', s: 'filter-repo', f: P.warnT, big: '2' }, { t: 'Force push', s: '--force', f: P.tint, big: '3' }, { t: 'Tell team', s: 'fresh clones', f: P.okT, big: '4' }], 'Four steps after pushing a secret', { caption: 'I PUSHED A PASSWORD', bw: 118 }),
        h: 'I pushed a password.',
        text: ['<b>Step 1 is always: rotate the secret.</b> Cancel the old key and make a new one. Bots scan GitHub for keys within minutes.', 'Then scrub it from every commit with <code>git filter-repo</code> (or the BFG tool), force push, and ask teammates to clone fresh.'],
        cmds: [
          { c: 'git filter-repo --path secret.txt --invert-paths', d: 'Rewrite all history without that file. Install git-filter-repo first.' },
          { c: 'git push --force --all', d: 'Replace the history on GitHub with the cleaned one.' }
        ],
        warn: 'Deleting the file in a new commit is not enough. The old commits still contain it.'
      }
    ],
    quiz: [
      { type: 'pick', q: 'You ran <code>git reset --hard</code> by mistake. Which command shows where you were?', options: ['git reflog', 'git status', 'git log --oneline', 'git diff'], answer: 0, hints: { 2: 'log only shows commits your branch still reaches. The lost ones are hidden.' }, why: 'The reflog records every move of HEAD, even the ones log can no longer see.' },
      { type: 'type', q: 'Jump back to where HEAD was one move ago, throwing away the current state.', answers: ['git reset --hard HEAD@{1}'], hint: 'reset --hard, then HEAD with @{1}.', why: 'HEAD@{1} is the previous entry in the reflog.' },
      { type: 'order', q: 'You committed two commits to main by mistake. Fix it.', items: ['git branch feature', 'git reset --hard HEAD~2', 'git switch feature'], why: 'Name the work first, then move main back, then switch to the work.' },
      { type: 'order', q: 'You pushed an API key. What do you do, in order?', items: ['Revoke the key and make a new one', 'git filter-repo to scrub history', 'Force push the cleaned history', 'Tell the team to clone fresh'], why: 'Rotate first. The key may already be copied, so cleaning alone does not protect you.' },
      { type: 'match', q: 'Match the problem to the fix.', pairs: [['Typo in last message', 'git commit --amend -m "..."'], ['Forgot a file in last commit', 'git commit --amend --no-edit'], ['Bad commit already pushed', 'git revert <hash>'], ['Deleted a branch', 'git branch name <hash>'], ['Merge went wrong, still in progress', 'git merge --abort']], why: 'Amend for local fixes, revert for shared history, a new branch name for lost commits.' },
      { type: 'bucket', q: 'Safe on a pushed, shared branch, or only local?', buckets: ['Safe after pushing', 'Only before pushing'], items: [['git revert <hash>', 0], ['git revert -m 1 <merge>', 0], ['git commit --amend', 1], ['git reset --hard HEAD~2', 1], ['git rebase -i', 1]], why: 'Revert adds new commits. The others rewrite history that teammates may already have.' },
      { type: 'fill', q: 'Undo the last merge, rebase or reset.', text: 'git reset --___ ___', options: ['hard', 'ORIG_HEAD', 'soft', 'HEAD', 'origin', 'main'], answer: ['hard', 'ORIG_HEAD'], why: 'Git saves the spot before big moves in ORIG_HEAD.' },
      { type: 'type', q: 'Find commits that nothing points to anymore.', answers: ['git fsck --lost-found', 'git fsck --lost-found --no-reflogs'], hint: 'The file system check command, with a flag about lost things.', why: 'fsck checks the object database and lists dangling commits.' }
    ]
  });

  /* ---------- l32 Detective tools ---------- */
  const bisect = (() => {
    const n = 9; let out = '';
    const states = ['g', 'g', 'g', 'g', '?', 'b', 'b', 'b', 'b'];
    out += `<text x="280" y="24" text-anchor="middle" font-size="12.5" font-weight="800" fill="${P.ink2}" letter-spacing="1.5">FIND THE FIRST BAD COMMIT IN 3 TRIES, NOT 9</text>`;
    out += `<line x1="40" y1="110" x2="520" y2="110" stroke="${P.ink}" stroke-width="4"/>`;
    for (let i = 0; i < n; i++) {
      const x = 40 + i * 60, s = i === 5 ? 'first' : states[i];
      const fill = s === 'g' ? P.okT : s === 'first' ? P.danger : s === 'b' ? P.dangerT : P.tint;
      out += `<circle cx="${x}" cy="110" r="20" fill="${fill}" stroke="${P.ink}" stroke-width="2.5"/><text x="${x}" y="115" text-anchor="middle" font-size="13" font-weight="800" fill="${s === 'first' ? P.white : P.ink}">${i + 1}</text>`;
    }
    out += `<text x="40" y="160" text-anchor="middle" font-size="12" font-weight="800" fill="${P.ok}">good</text><text x="520" y="160" text-anchor="middle" font-size="12" font-weight="800" fill="${P.danger}">bad</text>`;
    [[40, 520, 'try 5: good'], [280, 520, 'try 7: bad'], [280, 400, 'try 6: bad, found it']].forEach(([a, b, t], k) => {
      const y = 190 + k * 26, mid = (a + b) / 2;
      out += `<path d="M${a} ${y} L${b} ${y}" stroke="${P.accent}" stroke-width="3" opacity="${0.45 + k * 0.25}"/><circle cx="${mid}" cy="${y}" r="5" fill="${P.accent}"/><text x="${b + 10}" y="${y + 4}" font-size="11.5" font-weight="800" fill="${P.ink2}">${t}</text>`;
    });
    return `<svg viewBox="0 0 680 280" role="img" aria-label="Bisect halves the range of commits each try until it finds commit 6 as the first bad one">${out}</svg>`;
  })();

  COURSE.add({
    id: 'l32', module: 4, minutes: 12,
    title: 'Detective tools.',
    kicker: 'bisect, pickaxe, grep, blame',
    summary: 'Something broke and nobody knows when. Git can search history like a detective: which commit, which line, which person, and why.',
    parts: [
      {
        pic: bisect,
        h: 'Bisect: the guessing game.',
        text: ['You know an old commit worked and today is broken. <b>Bisect</b> checks out the middle commit and asks: good or bad?', 'Each answer cuts the search in half. 1000 commits take about 10 tries.'],
        cmds: [
          { c: 'git bisect start', d: 'Begin the search.' },
          { c: 'git bisect bad', d: 'Mark the current commit as broken.' },
          { c: 'git bisect good a1b2c3d', d: 'Mark a commit you know worked.' },
          { c: 'git bisect skip', d: 'Skip a commit you cannot test.' },
          { c: 'git bisect reset', d: 'End the search and go back to where you started.' }
        ]
      },
      {
        pic: term(['$ git bisect start', '$ git bisect bad', '$ git bisect good v1.2.0', '$ git bisect run npm test', 'running npm test...', '7f3e2a1 is the first bad commit', 'Author: Raj', '    Change date parsing', '$ git bisect reset'], 'auto bisect'),
        h: 'Let a script answer for you.',
        text: ['<code>git bisect run</code> runs a command on each step. Exit code 0 means good. Anything else means bad.', 'Go get a coffee. Git finds the culprit by itself.'],
        cmds: [
          { c: 'git bisect run npm test', d: 'Let your test command mark each step good or bad automatically.' }
        ]
      },
      {
        pic: term(['$ git log -S "apiKey" --oneline', 'c4d5e6f remove apiKey from config', '91ab2c3 add apiKey to config', '$ git log --grep "fix" --oneline', '7f3e2a1 fix date bug', '$ git log -L :parseDate:utils.js'], 'search history'),
        h: 'Search inside history.',
        text: ['<b>-S</b> (the pickaxe) finds commits that added or removed a piece of text.', '<b>-G</b> does the same with a pattern. <b>--grep</b> searches commit messages instead.', '<b>-L</b> follows the story of some lines or one function through time.'],
        cmds: [
          { c: 'git log -S "apiKey"', d: 'Commits where the count of this text changed (added or removed).' },
          { c: 'git log -G "user\\d+"', d: 'Commits whose changed lines match a regular expression.' },
          { c: 'git log --grep "fix"', d: 'Commits whose message contains "fix".' },
          { c: 'git log -L 10,20:app.js', d: 'History of lines 10 to 20 of app.js.' },
          { c: 'git log -L :parseDate:utils.js', d: 'History of one function.' },
          { c: 'git show --stat 7f3e2a1', d: 'Which files a commit touched, and how much.' }
        ]
      },
      {
        pic: term(['$ git grep -n "TODO"', 'app.js:14:  // TODO handle empty list', 'utils.js:3: // TODO remove', '$ git blame -w -C app.js', '7f3e2a1 (Raj 2026-09-01 14) if (!list) return', '$ git shortlog -sn --since="1 month ago"', '    41  Ana', '    17  Raj'], 'who and where'),
        h: 'Search the code. Find who wrote it.',
        text: ['<b>git grep</b> searches tracked files. It is fast and skips ignored files.', '<b>blame</b> shows who last changed each line. <code>-w</code> ignores space changes and <code>-C</code> follows code moved from other files.', 'Use blame to find context, not someone to blame.'],
        cmds: [
          { c: 'git grep "TODO"', d: 'Search every tracked file for TODO.' },
          { c: 'git grep -n "TODO"', d: 'Same, with line numbers.' },
          { c: 'git blame -w -C app.js', d: 'Who changed each line, ignoring whitespace and following copied code.' },
          { c: 'git blame --ignore-rev 3f9a1c2 app.js', d: 'Blame, but skip a commit like a big reformat.' },
          { c: 'git shortlog -sn --since="1 month ago"', d: 'Count commits per person over the last month.' }
        ],
        tip: 'Put big reformat commits in a <code>.git-blame-ignore-revs</code> file so blame skips them for everyone.'
      }
    ],
    quiz: [
      { type: 'pick', q: 'There are 1000 commits between good and bad. About how many tries does bisect need?', options: ['About 10', 'About 100', 'About 500', '1000'], answer: 0, why: 'Halving 1000 ten times gets you to one commit.' },
      { type: 'order', q: 'Order a manual bisect session.', items: ['git bisect start', 'git bisect bad', 'git bisect good v1.0', 'Test, then mark good or bad until found', 'git bisect reset'], why: 'Start, mark both ends, answer each step, reset when done.' },
      { type: 'type', q: 'Let <code>npm test</code> drive the bisect for you.', answers: ['git bisect run npm test'], hint: 'git bisect, a verb, then your command.', why: 'Exit code 0 means good, anything else means bad.' },
      { type: 'match', q: 'Match the search to the tool.', pairs: [['Which commit added this text?', 'git log -S'], ['Which commit message says fix?', 'git log --grep'], ['Which file mentions TODO now?', 'git grep'], ['Who last changed this line?', 'git blame'], ['How did this function change?', 'git log -L']], why: 'log searches history, grep searches the current files, blame searches lines.' },
      { type: 'bucket', q: 'Does it search commit messages, or code changes?', buckets: ['Messages', 'Code changes'], items: [['git log --grep "login"', 0], ['git log -S "login"', 1], ['git log -G "log.n"', 1], ['git log --grep "fix" -i', 0]], why: '--grep reads messages. -S and -G read the diffs.' },
      { type: 'fill', q: 'Find who changed lines, ignoring whitespace, following copied code.', text: 'git ___ -___ -C app.js', options: ['blame', 'w', 'log', 'S', 'grep', 'n'], answer: ['blame', 'w'], why: '-w ignores whitespace and -C follows code that moved between files.' },
      { type: 'type', q: 'Search all tracked files for <code>TODO</code> with line numbers.', answers: ['git grep -n "TODO"', 'git grep -n TODO', 'git grep -n "TODO" .', 'git grep "TODO" -n'], hint: 'git grep, a flag for numbers, then the word.', why: 'git grep -n prints file:line for every match.' }
    ]
  });

  /* ---------- l33 Power setup ---------- */
  const signed = `<svg viewBox="0 0 560 230" role="img" aria-label="A commit with a Verified badge thanks to an SSH signing key">
    <g transform="translate(30 50)"><rect x="5" y="6" width="120" height="120" rx="16" fill="${P.ink}"/><rect width="120" height="120" rx="16" fill="${P.warnT}" stroke="${P.ink}" stroke-width="2.5"/>
    <circle cx="44" cy="56" r="22" fill="none" stroke="${P.ink}" stroke-width="7"/><rect x="62" y="52" width="44" height="9" rx="3" fill="${P.ink}"/><rect x="88" y="58" width="8" height="16" fill="${P.ink}"/>
    <text x="60" y="108" text-anchor="middle" font-size="12.5" font-weight="800" fill="${P.ink}">your key</text></g>
    <path d="M170 113 L222 113" stroke="${P.accent}" stroke-width="4" stroke-linecap="round"/><path d="M216 104 L230 113 L216 122z" fill="${P.accent}"/>
    <g transform="translate(244 40)"><rect x="5" y="6" width="290" height="140" rx="16" fill="${P.ink}"/><rect width="290" height="140" rx="16" fill="${P.white}" stroke="${P.ink}" stroke-width="2.5"/>
    <text x="20" y="38" font-size="15" font-weight="800" fill="${P.ink}">Add login page</text><text x="20" y="62" font-size="12" font-weight="700" fill="${P.mute}">ana committed 2 hours ago</text>
    <rect x="20" y="82" width="104" height="30" rx="15" fill="${P.okT}" stroke="${P.ok}" stroke-width="2.5"/><text x="72" y="102" text-anchor="middle" font-size="13" font-weight="800" fill="${P.ok}">Verified</text>
    <text x="140" y="102" font-size="12.5" font-weight="800" font-family="JetBrains Mono, monospace" fill="${P.ink2}">3f9a1c2</text></g></svg>`;

  COURSE.add({
    id: 'l33', module: 4, minutes: 13,
    title: 'Make Git yours.',
    kicker: 'aliases, config, hooks, signing',
    summary: 'Pros tune their tools. Short nicknames for long commands, smart defaults, automatic checks before each commit, and a Verified badge on your work.',
    parts: [
      {
        pic: term(['$ git config --global alias.st status', '$ git config --global alias.lg "log --oneline --graph --all"', '$ git st', 'On branch main', 'nothing to commit, working tree clean', '$ git lg', '* 3f9a1c2 (HEAD -> main) add search', '* 91ab2c3 first save'], 'aliases'),
        h: 'Nicknames for long commands.',
        text: ['An <b>alias</b> is your own short command. Type <code>git st</code> and Git runs <code>git status</code>.', 'Aliases live in <code>~/.gitconfig</code>, so they work in every repo.'],
        cmds: [
          { c: 'git config --global alias.st status', d: 'Now git st means git status.' },
          { c: 'git config --global alias.lg "log --oneline --graph --all"', d: 'git lg draws a tidy graph of every branch.' },
          { c: 'git config --global alias.co switch', d: 'git co main switches branches.' },
          { c: 'git config --global alias.unstage "restore --staged"', d: 'git unstage file.txt takes a file out of staging.' }
        ]
      },
      {
        pic: term(['# ~/.gitconfig', '[init]', '    defaultBranch = main', '[push]', '    autoSetupRemote = true', '[pull]', '    rebase = true', '[fetch]', '    prune = true', '[rerere]', '    enabled = true', '[merge]', '    conflictstyle = zdiff3'], '.gitconfig'),
        h: 'Smart defaults, set once.',
        text: ['These settings save keystrokes and headaches every single day.', 'Each one is a line you can read in <code>~/.gitconfig</code>.'],
        cmds: [
          { c: 'git config --global push.autoSetupRemote true', d: 'First push of a new branch just works, no -u needed.' },
          { c: 'git config --global pull.rebase true', d: 'git pull rebases instead of making merge commits.' },
          { c: 'git config --global fetch.prune true', d: 'Fetch removes remote branches that were deleted on GitHub.' },
          { c: 'git config --global rerere.enabled true', d: 'Remember how you solved a conflict and reuse it next time.' },
          { c: 'git config --global help.autocorrect 20', d: 'Typo like git stauts? Git runs the right one after 2 seconds.' },
          { c: 'git config --global diff.colorMoved zebra', d: 'Color lines that were moved, not changed, in diffs.' },
          { c: 'git config --global merge.conflictstyle zdiff3', d: 'Conflicts also show the original version. Easier to solve.' },
          { c: 'git config --global init.defaultBranch main', d: 'New repos start on main.' },
          { c: 'git config --global color.ui auto', d: 'Colored output in the terminal.' },
          { c: 'git config --global core.autocrlf input', d: 'Mac and Linux: turn Windows line endings into Unix ones on commit.' },
          { c: 'git config --global core.autocrlf true', d: 'Windows: check out with Windows endings, commit Unix endings.' }
        ]
      },
      {
        pic: term(['# file: .gitattributes', '* text=auto', '*.sh text eol=lf', '*.png binary', '*.min.js linguist-generated', 'docs/** linguist-documentation'], '.gitattributes'),
        h: 'Rules for kinds of files.',
        text: ['<b>.gitattributes</b> is committed to the repo, so everyone on the team gets the same rules.', '<code>text=auto</code> fixes line endings. <code>eol=lf</code> forces Unix endings. <code>binary</code> says never diff or merge this file as text.', '<b>linguist</b> lines tell GitHub how to count languages and hide generated files in diffs.']
      },
      {
        pic: chain([{ t: 'git commit', s: 'you type', f: P.white }, { t: 'pre-commit', s: 'lint + tests', f: P.warnT }, { t: 'commit-msg', s: 'check message', f: P.warnT }, { t: 'saved', s: 'all passed', f: P.okT }], 'Hooks run checks before the commit is saved', { caption: 'HOOKS: CHECKPOINTS THAT CAN SAY NO', bw: 120 }),
        h: 'Hooks: automatic checkpoints.',
        text: ['A <b>hook</b> is a script Git runs at a moment, like before a commit. If it fails, the commit stops.', '<b>pre-commit</b> runs before saving. <b>commit-msg</b> checks the message. <b>pre-push</b> runs before pushing.', 'Hooks in <code>.git/hooks</code> are not shared. Teams use tools like <b>husky</b> or <b>pre-commit</b>, or point <code>core.hooksPath</code> at a committed folder.'],
        cmds: [
          { c: 'nano .git/hooks/pre-commit', d: 'Write a hook script, for example one line: npm test.' },
          { c: 'chmod +x .git/hooks/pre-commit', d: 'Make the hook runnable. Without this it is ignored.' },
          { c: 'git config core.hooksPath .githooks', d: 'Use hooks from a committed .githooks folder.' },
          { c: 'git commit --no-verify -m "wip"', d: 'Skip hooks for one commit. Use rarely.' }
        ]
      },
      {
        pic: signed,
        h: 'Sign your commits.',
        text: ['Anyone can type your name in <code>user.name</code>. A <b>signature</b> proves the commit came from your key.', 'Add the same SSH key on GitHub as a <b>signing key</b>, and your commits get a <b>Verified</b> badge.'],
        cmds: [
          { c: 'git config --global gpg.format ssh', d: 'Sign with an SSH key instead of GPG.' },
          { c: 'git config --global user.signingkey ~/.ssh/id_ed25519.pub', d: 'Which key to sign with.' },
          { c: 'git config --global commit.gpgsign true', d: 'Sign every commit automatically.' },
          { c: 'git commit -S -m "Signed change"', d: 'Sign just this one commit.' },
          { c: 'git log --show-signature', d: 'Show signature checks in the log.' }
        ]
      },
      {
        pic: term(['# ~/.gitconfig', '[user]', '    email = ana@home.dev', '[includeIf "gitdir:~/work/"]', '    path = ~/.gitconfig-work', '# ~/.gitconfig-work', '[user]', '    email = ana@company.com'], 'two identities'),
        h: 'Work email for work repos.',
        text: ['<b>includeIf</b> loads extra settings only for repos inside a folder. Personal email at home, work email under <code>~/work/</code>.', '<b>git maintenance</b> runs cleanups in the background so big repos stay fast.'],
        cmds: [
          { c: 'git config --global includeIf."gitdir:~/work/".path ~/.gitconfig-work', d: 'Use a second config file for repos under ~/work/.' },
          { c: 'git maintenance start', d: 'Schedule background tidy-ups for this repo.' }
        ]
      }
    ],
    quiz: [
      { type: 'type', q: 'Make <code>git st</code> run <code>git status</code> everywhere.', answers: ['git config --global alias.st status'], hint: 'git config --global alias.NAME COMMAND', why: 'Aliases are config entries under alias.' },
      { type: 'match', q: 'Match the setting to what it does.', pairs: [['push.autoSetupRemote', 'First push of a branch needs no -u'], ['pull.rebase', 'Pull rebases instead of merging'], ['fetch.prune', 'Drop remote branches deleted on GitHub'], ['rerere.enabled', 'Reuse recorded conflict fixes'], ['merge.conflictstyle', 'Show the original version in conflicts']], why: 'Set these once and forget them.' },
      { type: 'bucket', q: 'Shared with the team through the repo, or only on your machine?', buckets: ['Shared (committed)', 'Only on your machine'], items: [['.gitattributes', 0], ['.githooks/ folder', 0], ['.gitignore', 0], ['.git/hooks/pre-commit', 1], ['~/.gitconfig aliases', 1], ['git reflog', 1]], why: 'Anything inside .git/ or your home folder stays with you. Committed files travel.' },
      { type: 'order', q: 'Set up a working pre-commit hook.', items: ['Write the script in .git/hooks/pre-commit', 'chmod +x .git/hooks/pre-commit', 'Run git commit', 'The hook runs before the commit is saved'], why: 'Without chmod +x the hook is silently ignored.' },
      { type: 'fill', q: 'Turn on SSH commit signing.', text: 'git config --global gpg.format ___\ngit config --global user.___ ~/.ssh/id_ed25519.pub\ngit config --global commit.___ true', options: ['ssh', 'signingkey', 'gpgsign', 'gpg', 'email', 'verify'], answer: ['ssh', 'signingkey', 'gpgsign'], why: 'Format, key, then sign everything by default.' },
      { type: 'pick', q: 'A teammate on Windows sees every line changed in a file they did not edit. What usually fixes it?', options: ['Line ending settings: core.autocrlf or * text=auto', 'git reset --hard', 'Deleting .git', 'A new branch'], answer: 0, why: 'Windows uses CRLF, Mac and Linux use LF. Line ending rules stop these fake changes.' },
      { type: 'type', q: 'Commit once without running hooks.', answers: ['git commit --no-verify', 'git commit --no-verify -m "wip"', 'git commit -n'], accept: '^git commit (.* )?(--no-verify|-n)( .*)?$', hint: 'A flag that skips verification.', why: '--no-verify (or -n) skips pre-commit and commit-msg hooks. Use it rarely.' },
      { type: 'pick', q: 'What does the Verified badge on GitHub prove?', options: ['The commit was signed with a key on your account', 'The tests passed', 'A reviewer approved it', 'The email is real'], answer: 0, why: 'Verified means the signature matches a signing key added to your GitHub account.' }
    ]
  });
})();
