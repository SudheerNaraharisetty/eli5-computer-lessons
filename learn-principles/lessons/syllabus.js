/* The whole course in learning order. label: foundation | core | extra | review.
   "core" marks the 25 most widely used principles. A lesson appears as "Coming" until its file calls COURSE.add(). */
(function () {
  const rows = [
    // Module 0: Start here
    [0, 'Easy to change', 'The one goal behind every principle', 'foundation'],
    [0, 'High cohesion', 'Things that change together live together', 'core'],
    [0, 'Loose coupling', 'Parts that know little about each other', 'core'],
    [0, 'Trade-offs, not laws', 'Every principle can be overdone', 'foundation'],
    // Module 1: Keep it simple
    [1, 'KISS', 'Keep it simple', 'core'],
    [1, 'DRY', "Don't repeat yourself", 'core'],
    [1, 'Single source of truth', 'Every fact lives in one place', 'core'],
    [1, 'YAGNI', "You aren't gonna need it", 'core'],
    [1, 'Rule of three', 'Wait before you generalise', 'extra'],
    [1, 'Premature optimisation', 'Make it work, make it right, make it fast', 'core'],
    [1, 'Least astonishment', 'Code should do what its name says', 'core'],
    [1, 'Meaningful names', 'Names that explain themselves', 'extra'],
    [1, 'Boy Scout rule', 'Leave the code cleaner than you found it', 'core'],
    [1, 'Review: keep it simple', 'Spot the broken principle', 'review'],
    // Module 2: Shape one piece of code
    [2, 'Separation of concerns', 'One kind of work per part', 'core'],
    [2, 'Single responsibility', 'One reason to change (the S in SOLID)', 'core'],
    [2, 'Small functions', 'Do one thing', 'extra'],
    [2, 'Abstraction', 'Hide the how, show the what', 'core'],
    [2, 'Encapsulation', 'Keep the insides private', 'core'],
    [2, 'Command-query separation', 'Ask or do, never both', 'extra'],
    [2, 'Guard clauses', 'Handle the odd cases first', 'extra'],
    [2, 'Fail fast', 'Stop at the first sign of trouble', 'core'],
    [2, 'Explicit over implicit', 'Say it, do not hide it', 'extra'],
    [2, 'Review: one piece of code', 'Spot the broken principle', 'review'],
    // Module 3: Connect the pieces
    [3, 'Law of Demeter', 'Only talk to your close friends', 'core'],
    [3, "Tell, don't ask", 'Give orders, do not inspect', 'extra'],
    [3, 'Composition over inheritance', 'Build from parts, not family trees', 'core'],
    [3, 'Program to an interface', 'Depend on what, not who', 'core'],
    [3, 'Open/closed', 'Add without editing (the O in SOLID)', 'core'],
    [3, 'Liskov substitution', 'A stand-in must behave (the L in SOLID)', 'core'],
    [3, 'Interface segregation', 'Small, focused contracts (the I in SOLID)', 'core'],
    [3, 'Dependency inversion', 'Depend on ideas, not details (the D in SOLID)', 'core'],
    [3, 'Dependency injection', 'Hand a part what it needs', 'core'],
    [3, 'Inversion of control', "Don't call us, we'll call you", 'extra'],
    [3, 'Review: SOLID and friends', 'Spot the broken principle', 'review'],
    // Module 4: Code that survives
    [4, 'Immutability', 'Data that never changes after it is made', 'core'],
    [4, 'Idempotency', 'Safe to run twice', 'core'],
    [4, 'Least privilege', 'Give only the access that is needed', 'core'],
    [4, 'Defensive programming', 'Never trust the input', 'extra'],
    [4, 'Design by contract', 'Promises between caller and code', 'extra'],
    [4, 'Robustness principle', 'Strict in what you send, forgiving in what you accept', 'extra'],
    [4, 'Statelessness', 'Remember nothing between requests', 'extra'],
    [4, 'Review: code that survives', 'Spot the broken principle', 'review'],
    // Module 5: Bigger structure
    [5, 'Layers and the dependency rule', 'Arrows point inward', 'extra'],
    [5, 'Leaky abstractions', 'When the hidden details show through', 'extra'],
    [5, 'Convention over configuration', 'Sensible defaults beat settings', 'extra'],
    [5, 'Unix philosophy', 'Small tools that do one thing well', 'extra'],
    [5, 'Twelve-factor app', 'Rules for services that run anywhere', 'extra'],
    [5, 'Testing pyramid', 'Many small tests, few big ones', 'extra'],
    [5, 'Technical debt', 'Shortcuts cost interest', 'extra'],
    [5, 'Broken windows', 'Small mess invites big mess', 'extra'],
    [5, 'Review: bigger structure', 'Spot the broken principle', 'review'],
    // Module 6: Laws about teams and projects
    ["6", "Conway's law", 'Software copies the team that built it', 'extra'],
    ["6", "Brooks's law", 'Adding people to a late project makes it later', 'extra'],
    ["6", "Hyrum's law", 'Someone depends on every behaviour', 'extra'],
    ["6", "Chesterton's fence", 'Know why it is there before you remove it', 'extra'],
    ["6", "Gall's law", 'Complex systems grow from simple ones that worked', 'extra'],
    ["6", "Goodhart's law", 'A target stops being a good measure', 'extra'],
    ["6", 'Pareto principle', '80% of the result from 20% of the work', 'extra'],
    ["6", "Hofstadter's law", 'It always takes longer than you expect', 'extra'],
    ["6", "Kernighan's law", 'Debugging is twice as hard as writing', 'extra'],
    ["6", "Occam's razor", 'Prefer the simplest explanation', 'extra'],
    ["6", 'Final exam', 'One messy program, many principles', 'review']
  ];
  rows.forEach((r, i) => COURSE.plan.push({ id: 'l' + String(i + 1).padStart(2, '0'), module: +r[0], title: r[1], kicker: r[2], label: r[3] }));
})();
