# Lesson 2 exercise: check your kitchen
#
# Your stove (Python) and your counter (VS Code) are set up.
# Now check that VS Code really cooks with the new stove.
#
# 1. In VS Code, open the terminal: menu View, then Terminal.
# 2. Type the version check and press Enter:
#       macOS or Linux:   python3 --version
#       Windows:          py --version
#    It answers with something like:   Python 3.15.2
# 3. Change the print line between START and END so it shows the
#    version YOUR terminal answered. For example:
#       print("Python 3.15.2")
# 4. Save the file and run it with the Run button at the top right.
# 5. Read what the check at the bottom says. Keep going until it says PASS.

# >>> START: change the version below this line

print("Python 0.0")

# <<< END: change the version above this line


# ---------------------------------------------------------------------------
# The check. You do not need to read this part yet. It looks at which Python
# ran this file, then runs your line again, quietly, and reads what it printed.
# It is written so that even a very old Python can run it and give you a hint.
# ---------------------------------------------------------------------------
import sys


def _check():
    v = sys.version_info
    running = "%d.%d.%d" % (v[0], v[1], v[2])
    short = "%d.%d" % (v[0], v[1])

    if (v[0], v[1]) < (3, 14):
        return ("HINT: VS Code ran this file with Python " + running + ". That stove is too old."
                + " The course needs Python 3.14 or newer, and teaches 3.15."
                + " Install Python 3.15 from python.org (lesson 2, The code)."
                + " Then click the Python version in the bottom bar of VS Code"
                + " (or run the command Python: Select Interpreter) and pick 3.15.")

    import contextlib
    import io
    import pathlib

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your print line between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]

    printed = io.StringIO()
    with contextlib.redirect_stdout(printed):
        exec(your_code, {})
    lines = [line for line in printed.getvalue().splitlines() if line.strip()]

    if len(lines) == 0:
        return "HINT: Nothing was printed. Write one print(...) line with your version in it."
    if len(lines) > 1:
        return "HINT: Print just one line: the version your terminal showed, like Python " + running + "."
    line = lines[0]
    if short not in line and "0.0" in line:
        return ("HINT: Python 0.0 is only a placeholder. Type the version check in the terminal"
                + " and copy the version it answers into your print line.")
    if short not in line:
        return ("HINT: You printed '" + line + "', but VS Code ran this file with Python " + running + "."
                + " Check the terminal again. If the terminal and VS Code disagree,"
                + " click the Python version in the bottom bar and pick the newest one.")
    return ("PASS: Your terminal and VS Code agree: Python " + running
            + ". The stove is in, the counter is ready. Let's cook!")


print("")
print("-" * 40)
print("This file ran with Python " + "%d.%d.%d" % sys.version_info[:3])
print(_check())
