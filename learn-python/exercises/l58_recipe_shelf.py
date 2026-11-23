# Lesson 58 exercise: The recipe shelf
#
# Kitchen Coach keeps its recipes as text files on a shelf: a folder called
# l58_recipes, right NEXT TO THIS FILE (in the exercises folder). The recipes
# are in the dict RECIPES below: the name is the key, the text is the value.
#
# Your job, between START and END:
# 1. Point the jar shelf at the folder next to this script:
#        shelf = Path(__file__).parent / "l58_recipes"
#    Path("l58_recipes") alone starts from the folder you run FROM.
# 2. Make the folder with .mkdir(). It must not crash on the second run,
#    when the folder is already there.
# 3. Write each recipe to its own file on the shelf, called <name>.txt,
#    for example l58_recipes/bean_chili.txt, with .write_text(text).
# 4. List the .txt files on the shelf with .glob("*.txt"), SORTED, and print
#    each one's stem (the name without .txt) and how many lines it has:
#        bean_chili: 5 lines
#    Each recipe line ends with "\n", so .read_text().count("\n") counts them.
#
# When it works, running the file prints EXACTLY:
#
#   bean_chili: 5 lines
#   lentil_soup: 4 lines
#   rice_pudding: 3 lines
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l58_recipe_shelf.py
# - Then open the l58_recipes folder next to this file and look at the
#   notebooks your code wrote.
#
# What happens when you run it, in two steps:
# - STEP 1. Your lines run, ON PURPOSE from a different folder, the way Ben
#   might run them. You see what they print.
# - STEP 2, THE CHECK. It looks at the shelf next to this file, runs your
#   lines a second time, then tries other recipes in another place. It says
#   PASS, or gives you one hint. It never deletes your l58_recipes folder.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, and the check runs your lines with a time limit.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# ===== THE RECIPES (do not change) =====
RECIPES = {
    "rice_pudding": "pudding rice, 100 g\nmilk, 700 ml\nsugar, 50 g\n",
    "lentil_soup": "red lentils, 200 g\ncarrots, 2\nonion, 1\nstock, 800 ml\n",
    "bean_chili": "kidney beans, 400 g\nchopped tomatoes, 400 g\nonion, 1\npeppers, 2\nchili powder, 1 tsp\n",
}
# ===== END OF THE RECIPES =====

# >>> START: write your lines below this line
from pathlib import Path

# 1. The shelf. Change this line so it points NEXT TO THIS SCRIPT.
shelf = Path("l58_recipes")

# 2. Make the folder here. No crash when it is already there.

# 3. Write each recipe to shelf / f"{name}.txt" with write_text.
for name, text in RECIPES.items():
    print("Not written yet:", name)

# 4. For each .txt file on the shelf, sorted, print  stem: N lines

# <<< END: write your lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes the recipes and your lines,
# runs them in a separate Python with a 5 second limit, from a different
# folder, then looks at the files your lines wrote.
def _check():
    import ast
    import subprocess
    import sys
    import tempfile

    me = pathlib.Path(__file__).resolve()
    here = me.parent
    source = me.read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    rec_start, rec_end = "# ===== THE RECIPES", "# ===== END OF THE RECIPES"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your lines between them."
    if rec_start not in source or rec_end not in source:
        return "HINT: Keep the recipes as they were. Get a fresh copy of the file if you changed them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    recipes_code = source.split(rec_start, 1)[1].split("\n", 1)[1].split(rec_end, 1)[0]
    try:
        ast.parse(your_code)
    except SyntaxError as error:
        return ("HINT: Python could not read your lines: " + str(error)
                + "  Check the brackets, the quotes and the colon at the end of each for line.")
    try:
        recipes = {}
        exec(recipes_code, recipes)
        recipes = recipes["RECIPES"]
    except Exception:
        return "HINT: Keep the recipes as they were. Get a fresh copy of the file if you changed them."

    runner = (
        "import sys\n"
        "ns = {'__name__': '__main__', '__file__': sys.argv[3]}\n"
        "exec(compile(sys.argv[1], 'the recipes', 'exec'), ns)\n"
        "exec(compile(sys.argv[2], 'your lines', 'exec'), ns)\n"
    )

    def run(recipes_text, script, cwd):
        try:
            done = subprocess.run([sys.executable, "-c", runner, recipes_text, your_code, str(script)],
                                  capture_output=True, text=True, timeout=5, cwd=str(cwd))
        except subprocess.TimeoutExpired:
            return None, [], "timeout"
        printed = [line.rstrip() for line in done.stdout.splitlines() if line.strip()]
        errors = [line for line in done.stderr.splitlines() if line.strip()]
        return done, printed, (errors[-1] if done.returncode != 0 and errors else "")

    def error_hint(err, when):
        if err == "timeout":
            return "HINT: " + when + " your lines never ended, so they were stopped after 5 seconds. Is there a loop that never ends?"
        if err.startswith("FileExistsError"):
            return ("HINT: " + when + " Python stopped with: " + err + "\n  The folder was already there. "
                    "Make it with  shelf.mkdir(exist_ok=True)  so a second run does not crash.")
        if err.startswith("FileNotFoundError"):
            return ("HINT: " + when + " Python stopped with: " + err + "\n  The folder is missing. "
                    "Make it with  shelf.mkdir(exist_ok=True)  BEFORE you write the files into it.")
        if err.startswith("NameError"):
            return ("HINT: " + when + " Python stopped with: " + err + "\n  Check the spelling. Keep  "
                    "from pathlib import Path  at the top, and the jar is called shelf.")
        if err.startswith("TypeError") and "/" in err:
            return ("HINT: " + when + " Python stopped with: " + err + "\n  The / only joins paths when the "
                    "left side is a Path, like  shelf / f\"{name}.txt\".")
        return "HINT: " + when + " Python stopped with an error: " + err + "  Read it from the bottom up (lesson 4)."

    want = [f"{n}: {t.count(chr(10))} lines" for n, t in sorted(recipes.items())]

    # Run 1: from a different folder, the "hallway", with __file__ set to this script.
    with tempfile.TemporaryDirectory() as hall:
        hall = pathlib.Path(hall)
        done, printed, err = run(recipes_code, me, hall)
        print("STEP 1: your lines, run from another folder")
        print("-" * 40)
        print("\n".join(printed) if printed else "(nothing printed yet)")
        if err and err != "timeout":
            print(err)
        print("-" * 40)
        print("STEP 2, THE CHECK")
        if err:
            return error_hint(err, "")
        shelf = here / "l58_recipes"
        if not shelf.is_dir():
            if (hall / "l58_recipes").is_dir():
                return ("HINT: Your folder was made in the folder you ran FROM, not next to this file.\n"
                        "  A short name starts where you stand. Use  shelf = Path(__file__).parent / \"l58_recipes\"")
            return ("HINT: There is no l58_recipes folder next to this file yet. Point the shelf at it with\n"
                    "  shelf = Path(__file__).parent / \"l58_recipes\"  and make it with  shelf.mkdir(exist_ok=True)")

    for name, text in recipes.items():
        f = shelf / f"{name}.txt"
        if not f.is_file():
            odd = sorted(p.name for p in shelf.iterdir())
            return ("HINT: The shelf has no " + f.name + ". It holds: " + (", ".join(odd) or "nothing")
                    + "\n  Write each recipe to  shelf / f\"{name}.txt\"  with  .write_text(text)")
        if f.read_text(encoding="utf-8") != text:
            return ("HINT: " + f.name + " does not hold the recipe text exactly. Write the value from RECIPES as it is:\n"
                    "  (shelf / f\"{name}.txt\").write_text(text)")

    # Run 2: the same again. The folder is there now, so mkdir must not crash.
    with tempfile.TemporaryDirectory() as hall:
        done, printed2, err = run(recipes_code, me, hall)
        if err:
            return error_hint(err, "The second run failed.")

    extra = sorted(p.name for p in shelf.glob("*.txt") if p.stem not in recipes)
    if extra:
        return ("HINT: There are other .txt files on the shelf too: " + ", ".join(extra)
                + "\n  They are left from an earlier try. Delete them from the l58_recipes folder and run again.")
    if not printed:
        return ("HINT: The recipes are on the shelf. Now list them: for each file in\n"
                "  sorted(shelf.glob(\"*.txt\")), print  f\"{recipe.stem}: {lines} lines\"")
    if printed == want:
        pass
    elif sorted(printed) == want:
        return ("HINT: The lines are right, but not in order. The order of glob is not fixed.\n"
                "  Wrap it in sorted():  for recipe in sorted(shelf.glob(\"*.txt\")):")
    elif any(".txt" in line for line in printed):
        return ("HINT: You printed:\n  " + "\n  ".join(printed) + "\n  Print the stem, the name without .txt:  recipe.stem")
    else:
        return ("HINT: You printed:\n  " + "\n  ".join(printed) + "\n  It should be exactly:\n  " + "\n  ".join(want)
                + "\n  Count the lines with  recipe.read_text().count(\"\\n\")")

    # Run 3: other recipes, and the script in another place. The shelf must follow the script.
    other = {"oat_bars": "oats, 200 g\nhoney, 60 g\n", "apple_salad": "apples, 2\nwalnuts, 40 g\nyoghurt, 150 g\n"}
    with tempfile.TemporaryDirectory() as away, tempfile.TemporaryDirectory() as hall:
        script = pathlib.Path(away) / "elsewhere.py"
        done, printed3, err = run("RECIPES = " + repr(other) + "\n", script, hall)
        if err:
            return error_hint(err, "With other recipes,")
        moved = pathlib.Path(away) / "l58_recipes"
        want3 = [f"{n}: {t.count(chr(10))} lines" for n, t in sorted(other.items())]
        if not moved.is_dir() or sorted(p.name for p in moved.iterdir()) != sorted(n + ".txt" for n in other):
            return ("HINT: Your lines work here, but when the script lives in another folder, the shelf does not follow it.\n"
                    "  Build it from the script's own folder:  Path(__file__).parent / \"l58_recipes\"  (no typed-in path).")
        if printed3 != want3 and sorted(printed3) == want3:
            return ("HINT: With other recipes the lines came out in another order:\n  " + "\n  ".join(printed3)
                    + "\n  The order of glob is not fixed. Wrap it in sorted():  for recipe in sorted(shelf.glob(\"*.txt\")):")
        if printed3 != want3:
            return ("HINT: With other recipes your lines printed:\n  " + "\n  ".join(printed3)
                    + "\n  It should be:\n  " + "\n  ".join(want3) + "\n  Use the RECIPES dict and the files on the shelf, not typed-in names.")

    if "write_text" not in your_code:
        return "HINT: It works, but write the files with  .write_text(text)  as this lesson shows."
    if "glob" not in your_code or "sorted" not in your_code:
        return "HINT: It works, but list the shelf with  sorted(shelf.glob(\"*.txt\"))  as this lesson shows."
    return ("PASS: The shelf sits next to the script, wherever you run it from. Three notebooks written, "
            "listed in order, lines counted. Open the l58_recipes folder to see them.")


verdict = _check()
print(verdict)
