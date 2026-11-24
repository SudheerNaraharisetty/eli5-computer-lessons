# Lesson 91 exercise: Which kitchen am I in?
#
# Every project should cook in a kitchen of its own: a virtual environment,
# or venv. This little program tells you which kitchen it is running in.
#
# Python keeps two names in the sys module:
#
#     sys.prefix        the kitchen this Python is cooking in right now
#     sys.base_prefix   the real Python that kitchen was built from
#
# Outside a venv the two are the SAME folder. Inside a venv they are
# DIFFERENT: sys.prefix is the .venv folder.
#
# Your job, in two parts:
#
#   1. Between START and END, finish in_own_kitchen(prefix, base_prefix).
#      It must give True when the two folders are different (a venv), and
#      False when they are the same (no venv). Right now it always says False.
#
#   2. Run the file twice:
#      a. as it is, with no venv. The check says your code is right, but
#         you are still in the shared kitchen.
#      b. inside a venv. In a terminal, in this exercises folder:
#             python3 -m venv .venv            (Windows: py -m venv .venv)
#             source .venv/bin/activate        (Windows: .venv\Scripts\activate)
#             python l91_which_kitchen.py
#         The prompt starts with (.venv), and the check says PASS.
#         In VS Code: Python: Select Interpreter, pick the one in .venv,
#         then press Run again.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l91_which_kitchen.py
#
# What happens when you run it, in two steps:
# - STEP 1. It shows which Python is running and which kitchen it is in.
# - STEP 2, THE CHECK. It says PASS, or gives you one hint.

# Leave these lines as they are. They start the check at the bottom of this
# file first, so an error in your lines shows up as a hint, not a crash.
import pathlib
if __name__ == "__main__":
    exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
    raise SystemExit

# >>> START: write your lines below this line
def in_own_kitchen(prefix, base_prefix):
    """True when Python is running inside a virtual environment."""
    return False  # change this line: compare prefix and base_prefix
# <<< END: write your lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your lines from between
# START and END, shows which kitchen you are in, and checks your function.
def _check():
    import sys

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your lines between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]

    ns = {"__name__": "which_kitchen"}
    try:
        exec(compile(your_code, "your lines", "exec"), ns)
    except SyntaxError as error:
        return "HINT: Python could not read your lines: " + str(error)
    except Exception as error:
        return "HINT: Python stopped with an error: " + type(error).__name__ + ": " + str(error)

    in_own_kitchen = ns.get("in_own_kitchen")
    if not callable(in_own_kitchen):
        return "HINT: Keep the function  def in_own_kitchen(prefix, base_prefix):"

    print("STEP 1: which kitchen am I in?")
    print("-" * 60)
    print("Python      ", sys.version.split()[0])
    print("Which Python", sys.executable)
    print("Kitchen     ", sys.prefix)
    print("Built from  ", sys.base_prefix)
    try:
        answer = in_own_kitchen(sys.prefix, sys.base_prefix)
    except Exception as error:
        print("-" * 60)
        print("STEP 2, THE CHECK")
        return ("HINT: in_own_kitchen stopped with " + type(error).__name__ + ": " + str(error))
    print("In a venv?  ", "yes, a kitchen of its own" if answer is True
          else "no, the shared kitchen" if answer is False else repr(answer))
    print("-" * 60)
    print("STEP 2, THE CHECK")

    # Your function, tried on two pretend computers.
    venv = ("/Users/you/kitchen-coach/.venv", "/opt/homebrew/opt/python@3.15")
    shared = ("/opt/homebrew/opt/python@3.15", "/opt/homebrew/opt/python@3.15")
    try:
        in_venv, in_shared = in_own_kitchen(*venv), in_own_kitchen(*shared)
    except Exception as error:
        return "HINT: in_own_kitchen stopped with " + type(error).__name__ + ": " + str(error)
    if in_venv is not True or in_shared is not False:
        if in_venv is False and in_shared is False:
            return ("HINT: in_own_kitchen always says False. Inside a venv, prefix and "
                    "base_prefix are different folders. Return the comparison: prefix != base_prefix")
        if in_venv is False and in_shared is True:
            return ("HINT: It is the wrong way round. The SAME folder means no venv. "
                    "Use != (not equal), not ==.")
        return ("HINT: in_own_kitchen should return True or False: the result of "
                "prefix != base_prefix")

    if sys.prefix == sys.base_prefix:
        return ("GOOD: Your function is right. But this Python is the shared kitchen: "
                "Kitchen and Built from are the same folder. Now make a venv and run the file "
                "inside it (part 2b at the top of this file). Look at the prompt: it must "
                "start with (.venv). In VS Code, pick the .venv interpreter.")

    return ("PASS: You are cooking in a kitchen of your own: " + sys.prefix + ". "
            "Anything you pip install now goes on this kitchen's shelf only. "
            "Type deactivate to step back out.")


if __name__ == "__main__":
    print(_check())
