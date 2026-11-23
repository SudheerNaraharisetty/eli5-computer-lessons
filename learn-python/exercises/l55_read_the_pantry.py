# Lesson 55 exercise: Read the pantry notebook
#
# Kitchen Coach forgets the pantry every time the program ends. So you
# wrote it down in a notebook: the text file l55_pantry.txt, right next
# to this file. Open it in VS Code and have a look (do not change it).
# It has one line per item: the name, a comma, the grams.
#
#   rice,900
#   oats,400
#   ...
#
# Your job, between START and END:
# 1. Read the notebook LINE BY LINE into the dict called pantry.
#    The name is the key. The grams are the value, as a NUMBER (int).
#    So the first line gives  pantry["rice"] = 900
#    Remember: each line ends with a hidden "\n" (strip it off),
#    .split(",") cuts a line at the comma, and int() turns "900" into 900.
# 2. Close the notebook when the loop is done:  f.close()
# 3. Print every item with LESS THAN 200 g left, one per line, like:
#        Running low: lentils (0 g)
#    Any wording is fine, as long as each line names the item.
#
# Use the name NOTEBOOK to open the file:  f = open(NOTEBOOK)
# The check also runs your lines on a DIFFERENT notebook, so read the file.
# Do not type the items or the numbers in yourself.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l55_read_the_pantry.py
#
# What happens when you run it, in two steps:
# - STEP 1. Your lines run on l55_pantry.txt, and you see what they print.
# - STEP 2, THE CHECK. It looks at your pantry dict and what you printed,
#   then tries a second notebook. It says PASS, or gives you one hint.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, and the check runs your lines with a time limit.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# This finds the notebook next to this file, wherever you run it from.
# Lesson 58 (Paths with pathlib) explains how it works.
NOTEBOOK = pathlib.Path(__file__).parent / "l55_pantry.txt"

# >>> START: write your lines below this line

pantry = {}

f = open(NOTEBOOK)
for line in f:
    print(line)    # First, see what each line looks like. Then change this.
f.close()

# Then print every item with less than 200 g left.

# <<< END: write your lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your lines from between
# START and END, runs them in a separate Python with a 5 second limit, once
# on l55_pantry.txt and once on another notebook, and looks at the results.
def _check():
    import ast
    import json
    import pathlib
    import subprocess
    import sys
    import tempfile

    here = pathlib.Path(__file__).parent
    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your lines between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    try:
        ast.parse(your_code)
    except SyntaxError as error:
        return ("HINT: Python could not read your lines: " + str(error)
                + "  Check the colon after  for line in f  and the 4 spaces in front of the lines inside the loop.")

    notebook = here / "l55_pantry.txt"
    if not notebook.exists():
        return ("HINT: The notebook l55_pantry.txt is missing. It should sit next to this file. "
                "Get a fresh copy of the exercises folder.")

    # Runs your lines with NOTEBOOK set to the file given, then reports the pantry dict.
    runner = (
        "import json, pathlib, sys\n"
        "ns = {'__name__': '__main__', 'pathlib': pathlib, 'NOTEBOOK': pathlib.Path(sys.argv[2])}\n"
        "exec(compile(sys.argv[1], 'your lines', 'exec'), ns)\n"
        "p = ns.get('pantry')\n"
        "rep = {'kind': type(p).__name__, 'items': []}\n"
        "if isinstance(p, dict):\n"
        "    rep['items'] = [[repr(k), type(k).__name__, repr(v), type(v).__name__] for k, v in p.items()]\n"
        "sys.stderr.write('@@PANTRY ' + json.dumps(rep) + '\\n')\n"
    )

    def run_on(path):
        try:
            done = subprocess.run([sys.executable, "-c", runner, your_code, str(path)],
                                  capture_output=True, text=True, timeout=5, encoding="utf-8")
        except subprocess.TimeoutExpired:
            return None
        found = [l for l in done.stderr.splitlines() if l.startswith("@@PANTRY ")]
        errors = [l for l in done.stderr.splitlines() if not l.startswith("@@PANTRY ")]
        return {
            "printed": [l.rstrip() for l in done.stdout.splitlines()],
            "error": (errors or [""])[-1] if done.returncode != 0 else "",
            "pantry": json.loads(found[0][len("@@PANTRY "):]) if found else None,
        }

    def expected(path):
        want = {}
        for line in path.read_text(encoding="utf-8").splitlines():
            if line.strip():
                name, grams = line.strip().split(",")
                want[name] = int(grams)
        return want

    def judge(result, want, label):
        if result is None:
            return "HINT: Your lines never ended, so they were stopped after 5 seconds. Is there a while loop? A for loop over f is all you need."
        err = result["error"]
        if err:
            if err.startswith("FileNotFoundError"):
                return "HINT: Python stopped with: " + err + "\n  Open the notebook with  f = open(NOTEBOOK)  so it is found next to this file."
            if err.startswith("TypeError") and ("'<'" in err or "'>'" in err or "concatenate" in err):
                return ("HINT: Python stopped with: " + err + "\n  The grams are still text. A file is only text. "
                        "Store  int(grams)  in the pantry, not grams.")
            if err.startswith("ValueError") and "unpack" in err:
                return ("HINT: Python stopped with: " + err + "\n  Split each line at the comma:  name, grams = line.strip().split(\",\")  "
                        "gives exactly two pieces.")
            if err.startswith("ValueError") and "int()" in err:
                return ("HINT: Python stopped with: " + err + "\n  int() got something that is not only digits. "
                        "Did you split the line first, and give int() only the grams part?")
            if err.startswith("NameError"):
                return "HINT: Python stopped with: " + err + "\n  Check the spelling. The jars are called pantry, f, line, NOTEBOOK."
            return "HINT: Python stopped with an error: " + err + "  Read it from the bottom up (lesson 4)."
        rep = result["pantry"]
        if rep is None or rep["kind"] != "dict":
            return "HINT: Keep  pantry = {}  at the top, and fill that dict in your loop."
        items = rep["items"]
        if not items:
            return ("HINT: pantry is still empty. Inside the loop, cut each line into a name and the grams, "
                    "and store it:  pantry[name] = int(grams)")
        if any("\\n" in k for k, _, _, _ in items):
            return ("HINT: A key in your pantry ends with \\n, the hidden newline. "
                    "Strip the line before you split it:  line.strip()")
        if any(vt == "str" for _, _, _, vt in items):
            return ("HINT: Your pantry has the grams as text, like " + items[0][2] + ". A file is only text. "
                    "Convert them as you store them:  pantry[name] = int(grams)")
        got = {}
        for k, kt, v, vt in items:
            got[k] = v
        want_r = {repr(k): repr(v) for k, v in want.items()}
        if got != want_r:
            return ("HINT (" + label + "): your pantry has " + str(len(got)) + " items, but the notebook has "
                    + str(len(want)) + ". It should be " + str(want) + ". Read every line of the file, and do not type items in yourself.")
        printed = [l for l in result["printed"] if l.strip()]
        low = [n for n, g in want.items() if g < 200]
        high = [n for n, g in want.items() if g >= 200]
        words = lambda l: l.replace(":", " ").replace("(", " ").replace(",", " ").split()
        for n in low:
            if not any(n in words(l) for l in printed):
                return ("HINT (" + label + "): " + n + " has " + str(want[n]) + " g left, less than 200, but your lines never print it. "
                        "Loop over  pantry.items()  and print the items where  grams < 200")
        for n in high:
            if any(n in words(l) for l in printed):
                return ("HINT (" + label + "): " + n + " has " + str(want[n]) + " g, which is not less than 200, but it is printed. "
                        "Print only the items where  grams < 200. Is a print(line) from step 1 still there?")
        return ""

    first = run_on(notebook)
    print("STEP 1: what your lines print with l55_pantry.txt")
    print("-" * 50)
    if first is None:
        print("(stopped after 5 seconds)")
    else:
        print("\n".join(first["printed"]) if first["printed"] else "(nothing yet)")
        if first["error"]:
            print(first["error"])
    print("-" * 50)
    print("STEP 2, THE CHECK")

    hint = judge(first, expected(notebook), "l55_pantry.txt")
    if hint:
        return hint
    with tempfile.TemporaryDirectory() as folder:
        other = pathlib.Path(folder) / "other_pantry.txt"
        other.write_text("honey,120\nmilk,2000\nsugar,199\nsalt,200\nbutter,50\n", encoding="utf-8")
        hint = judge(run_on(other), expected(other), "a second notebook")
    if hint:
        return hint
    if ".close()" not in your_code:
        return "HINT: Everything works. One last thing: close the notebook after the loop with  f.close()"
    return ("PASS: The notebook is read line by line, the text is turned into a pantry dict with real numbers, "
            "and only the items under 200 g are printed. It even works on a notebook it has never seen.")


verdict = _check()
print(verdict)
