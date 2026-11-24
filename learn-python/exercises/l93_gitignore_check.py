# Lesson 93 exercise: Write Kitchen Coach's .gitignore
#
# Git needs a list of things it must NOT save: the .gitignore file.
# Here you write that list as a Python list of strings, one rule each.
# The check at the bottom tries your rules on 13 real paths from the
# Kitchen Coach folder, and tells you what git would save and what it skips.
#
# Your rules must make git SKIP:
#   - the venv kitchen ........ .venv/lib/python3.15/site-packages/pytest/__init__.py
#   - Python's scraps ......... __pycache__/coach.cpython-315.pyc
#   - the same, in tests ...... tests/__pycache__/test_coach.cpython-315-pytest-9.2.0.pyc
#   - pytest's cache .......... .pytest_cache/v/cache/lastfailed
#   - Ruff's cache ............ .ruff_cache/CACHEDIR.TAG
#   - the secret key .......... .env
# and still let git SAVE:
#   coach.py, meal_planner.py, tests/test_coach.py, requirements.txt,
#   README.md, .gitignore, and .env.example (the same names as .env,
#   with fake values, so others know what to set).
#
# How the rules work (the same as in git, for the two kinds you need):
#   ".venv/"    ends with /  -> a FOLDER rule. It skips everything inside
#                               any folder called .venv, wherever it is.
#   "*.pyc"     no /         -> a NAME rule. It skips any file or folder
#                               whose name matches. * means "any letters".
#   ".env"      no /, no *   -> a NAME rule for that exact name only.
# Keep the rules simple: no / at the start or in the middle.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l93_gitignore_check.py
# - It prints what git would do with each path, then PASS or one hint.
# - Bonus: copy your rules, one per line, into a real file called
#   .gitignore in your own project folder, and run  git status

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, so an error in your lines shows up as a hint, not a crash.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: write your rules below this line

GITIGNORE = [
    ".venv/",
]

# <<< END: write your rules above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your lines from between
# START and END, and tries your rules on each path.
def _check():
    import ast
    from fnmatch import fnmatchcase
    from pathlib import PurePosixPath

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your rules between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    try:
        ast.parse(your_code)
    except SyntaxError as error:
        return ("HINT: Python could not read your lines: " + str(error)
                + "\n  Each rule is a string in quotes, with a comma after it, inside the [ ] brackets.")
    ns = {}
    try:
        exec(compile(your_code, "your lines", "exec"), ns)
    except Exception as error:
        return "HINT: Python stopped with an error: " + type(error).__name__ + ": " + str(error)

    rules = ns.get("GITIGNORE")
    if not isinstance(rules, list):
        return "HINT: Keep the name GITIGNORE, and make it a list: GITIGNORE = [ ... ]"
    clean = []
    for rule in rules:
        if not isinstance(rule, str):
            return "HINT: Every rule must be a string in quotes. This one is not: " + repr(rule)
        rule = rule.strip()
        if not rule or rule.startswith("#"):
            continue
        if "/" in rule.rstrip("/"):
            return ("HINT: The rule " + repr(rule) + " has a / at the start or in the middle. Real git "
                    "understands that, but it means 'only in one place'. Write just the name, "
                    "like " + repr(rule.strip("/").split("/")[-1] + ("/" if rule.endswith("/") else "")) + ".")
        clean.append(rule)

    def rule_for(path):
        """The first rule that skips this path, or None if git would save it."""
        parts = PurePosixPath(path).parts
        for rule in clean:
            if rule.endswith("/"):                              # a FOLDER rule
                if rule[:-1] in parts[:-1]:
                    return rule
            elif any(fnmatchcase(part, rule) for part in parts):  # a NAME rule
                return rule
        return None

    skip = {
        ".venv/lib/python3.15/site-packages/pytest/__init__.py":
            "the venv is a whole kitchen, almost 900 files, built for your computer only. Add the folder rule  .venv/",
        "__pycache__/coach.cpython-315.pyc":
            "Python makes __pycache__ folders by itself when you run your code. Add the folder rule  __pycache__/",
        "tests/__pycache__/test_coach.cpython-315-pytest-9.2.0.pyc":
            "there is a __pycache__ inside tests too. A folder rule like  __pycache__/  works in every folder.",
        ".pytest_cache/v/cache/lastfailed":
            "pytest keeps notes about your last test run here (lesson 89). Add the folder rule  .pytest_cache/",
        ".ruff_cache/CACHEDIR.TAG":
            "Ruff keeps a cache here (lesson 92). Add the folder rule  .ruff_cache/",
        ".env":
            "this file holds the secret key. It must never be committed. Add the rule  .env",
    }
    keep = ["coach.py", "meal_planner.py", "tests/test_coach.py", "requirements.txt",
            "README.md", ".gitignore", ".env.example"]

    print("Your rules:", ", ".join(clean) if clean else "(none yet)")
    print("-" * 66)
    for path in sorted(list(skip) + keep):
        print(("skip  " if rule_for(path) else "SAVE  ") + path)
    print("-" * 66)

    for path in keep:
        rule = rule_for(path)
        if rule:
            extra = ""
            if path == ".env.example":
                extra = ("\n  .env.example has only fake values, so it is safe to commit. "
                         "Write the rule as just  .env  so it matches that one name exactly.")
            elif path.endswith(".py"):
                extra = "\n  That rule is too wide: it hides your own code. Did you mean  *.pyc ?"
            return "HINT: " + path + " would be skipped by your rule " + repr(rule) + ", but git must save it." + extra
    for path, why in skip.items():
        if not rule_for(path):
            return "HINT: git would save " + path + "\n  But " + why
    return ("PASS: git saves your code, tests, requirements, README and .env.example, and skips "
            "the venv, every __pycache__, the tool caches and the secret .env. "
            "Copy these rules into a real .gitignore file, one per line.")


verdict = _check()
print(verdict)
