# Lesson 94 exercise: Fix the cookbook's cover page
#
# Ben wants Kitchen Coach on his own laptop. You are packaging it, like a
# cookbook. The cover page is pyproject.toml. pip reads it to learn the
# book's name, its version, which Python it needs, and which command to make.
#
# The project looks like this:
#
#     kitchen-coach/
#         pyproject.toml          <- the cover page (below, as a string)
#         README.md
#         src/kitchen_coach/
#             __init__.py
#             plans.py
#             cli.py              <- has  def main():
#         tests/
#
# And this is cli.py. Look at the name of its function:
#
#     import sys
#
#     from kitchen_coach.plans import PLANS, plan_for
#
#
#     def main():
#         names = sys.argv[1:]
#         ...
#
# The cover page between START and END has THREE mistakes:
#
#   1. A field pip cannot build without is missing. (Every release needs one.)
#   2. The kitchen-coach command points at a function cli.py does not have.
#   3. requires-python asks for a Python that does not exist yet, so nobody,
#      not even Ben with Python 3.15, could install it.
#
# Your job: fix the three mistakes inside the COVER string. Keep the
# [build-system] lines as they are.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l94_cookbook_cover.py
#
# What happens when you run it, in two steps:
# - STEP 1. Python reads your cover page with tomllib and shows what pip
#   would see.
# - STEP 2, THE CHECK. It says PASS, or gives you one hint.
#
# tomllib comes free with Python 3.11 and newer. It reads TOML files like
# pyproject.toml into dicts.

# Leave these lines as they are. They start the check at the bottom of this
# file first, so an error in your lines shows up as a hint, not a crash.
import pathlib
if __name__ == "__main__":
    exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
    raise SystemExit

# >>> START: write your lines below this line
COVER = """
[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[project]
name = "kitchen-coach"
description = "Today's meal plan for Ana, Ben and Chloe"
requires-python = ">=3.16"
dependencies = []

[project.scripts]
kitchen-coach = "kitchen_coach.cli:start"
"""
# <<< END: write your lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your lines from between
# START and END, reads the cover page like pip would, and checks it.
def _check():
    import sys

    try:
        import tomllib
    except ImportError:
        return ("HINT: This Python is " + sys.version.split()[0] + ". tomllib comes with "
                "Python 3.11 and newer. Run the file with Python 3.15 (in VS Code: "
                "Python: Select Interpreter).")

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your lines between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]

    ns = {"__name__": "cookbook_cover"}
    try:
        exec(compile(your_code, "your lines", "exec"), ns)
    except SyntaxError as error:
        return "HINT: Python could not read your lines: " + str(error)
    except Exception as error:
        return "HINT: Python stopped with an error: " + type(error).__name__ + ": " + str(error)

    cover = ns.get("COVER")
    if not isinstance(cover, str):
        return 'HINT: Keep the string  COVER = """ ... """  between START and END.'

    try:
        book = tomllib.loads(cover)
    except tomllib.TOMLDecodeError as error:
        return ("HINT: tomllib could not read the cover page: " + str(error) + ". "
                'In TOML every text value needs quotes, like  version = "0.1.0"')

    project = book.get("project", {})
    scripts = project.get("scripts", {})
    print("STEP 1: what pip would read on the cover")
    print("-" * 60)
    print("Name:     ", project.get("name", "(missing)"))
    print("Version:  ", project.get("version", "(missing)"))
    print("Needs:     Python", project.get("requires-python", "(missing)"))
    for command, target in scripts.items():
        print("Command:  ", command, "runs", target)
    print("-" * 60)
    print("STEP 2, THE CHECK")

    build = book.get("build-system", {})
    if build.get("requires") != ["hatchling"] or build.get("build-backend") != "hatchling.build":
        return ("HINT: Keep the [build-system] lines as they were: "
                'requires = ["hatchling"] and build-backend = "hatchling.build"')
    if project.get("name") != "kitchen-coach":
        return 'HINT: Keep the name as it was: name = "kitchen-coach"'

    # Mistake 1: the version.
    version = project.get("version")
    if version is None:
        return ("HINT: The cover has no version. Without one, the build stops with "
                "'Field `project.version` can only be resolved dynamically'. "
                'Add a line under name:  version = "0.1.0"')
    parts = str(version).split(".")
    if not isinstance(version, str) or len(parts) != 3 or not all(p.isdigit() for p in parts):
        return ('HINT: Write the version as text with three numbers and two dots, '
                'in quotes:  version = "0.1.0"')

    # Mistake 3: requires-python.
    needs = project.get("requires-python", "")
    if not isinstance(needs, str) or not needs.startswith(">=3."):
        return 'HINT: requires-python should look like  ">=3.14"  : this Python or newer.'
    minor = needs[len(">=3."):]
    if not minor.isdigit():
        return 'HINT: requires-python should look like  ">=3.14"  : a 3, a dot, and one number.'
    if int(minor) > 15:
        return ("HINT: requires-python says " + needs + ". Python 3." + minor + " does not "
                "exist yet, so pip on Ben's laptop stops with: requires a different Python: "
                "3.15.2 not in '" + needs + "'. Kitchen Coach runs on 3.14 and newer: \">=3.14\"")
    if int(minor) < 11:
        return ("HINT: requires-python says " + needs + ". That is too old: Kitchen Coach "
                "uses f-strings and other newer features. Use \">=3.14\"")

    # Mistake 2: the command.
    if "kitchen-coach" not in scripts:
        return ("HINT: Keep the command name under [project.scripts]: kitchen-coach, "
                "with a hyphen. That is what Ben types.")
    target = scripts["kitchen-coach"]
    if target.endswith(":start"):
        return ("HINT: The command points at kitchen_coach.cli:start, but cli.py has no "
                "start. After pip install, typing kitchen-coach would crash with "
                "ImportError: cannot import name 'start'. Look at the top of this file: "
                "what is the function in cli.py called?")
    if target != "kitchen_coach.cli:main":
        return ('HINT: The command should run the main function in kitchen_coach/cli.py: '
                '"kitchen_coach.cli:main" (module with dots and an underscore, then a '
                'colon, then the function).')

    return ("PASS: The cover page is right. pip would build kitchen_coach-" + version +
            "-py3-none-any.whl, and after pip install, Ben types kitchen-coach and gets "
            "today's plan.")


if __name__ == "__main__":
    print(_check())
