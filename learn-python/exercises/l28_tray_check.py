# Lesson 28 exercise: Check the tray
#
# A tray of cookies is out of the oven. It is a PREVIEW list (lesson 31
# explains lists): each item says how one cookie looks, left to right.
#   "ok"     a good cookie
#   "burnt"  a burnt cookie
#   "SMOKE"  the smoke alarm goes off
#
# Check the cookies one at a time with a for loop:
#   - "burnt": skip it with continue. It is not counted.
#   - "SMOKE": print  Smoke alarm!  and stop the loop with break.
#              Cookies after the smoke are never checked or counted.
#   - "ok":    add 1 to good.
# Give the for loop an else (lined up with for, not with if). It runs only
# when the loop finished WITHOUT a break, so it prints  No smoke
# After the loop, print the count:  Good cookies: 2
#
# With the tray below, the program prints EXACTLY these 2 lines:
#
#   Smoke alarm!
#   Good cookies: 2
#
# With a tray that has no smoke, like ["ok", "burnt", "ok"], it prints:
#
#   No smoke
#   Good cookies: 2
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l28_tray_check.py
# - The check runs your lines on 6 different trays, each with a 5 second
#   limit, so a loop that never ends gets stopped and you get a hint.
# - At the bottom you see PASS, or one hint that tells you what to change.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, and the check runs your lines with a time limit.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

tray = ["ok", "burnt", "ok", "SMOKE", "ok"]    # do not change this line

# >>> START: write your lines below this line

good = 0
for cookie in tray:
    # Write your two if checks here, ABOVE the counting line:
    #   a burnt cookie: skip the rest of this round with continue
    #   SMOKE: print("Smoke alarm!"), then leave the loop with break
    good += 1

# Add an else: here, lined up with for, that prints "No smoke".

print(f"Good cookies: {good}")

# <<< END: write your lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your lines from between
# START and END, runs them on 6 trays in a separate Python with a 5 second
# limit, shows what they printed for the first tray, and then looks at it.
def _check():
    import ast
    import subprocess
    import sys

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your lines between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    try:
        tree = ast.parse(your_code)
    except SyntaxError as error:
        return ("HINT: Python could not read your lines: " + str(error)
                + "  Check the colons, and that every line in a block is pushed in by 4 spaces.")

    for node in ast.walk(tree):
        if isinstance(node, (ast.Assign, ast.AugAssign)):
            targets = node.targets if isinstance(node, ast.Assign) else [node.target]
            for target in targets:
                if isinstance(target, ast.Name) and target.id == "tray":
                    return ("HINT: Do not store a new value in tray between START and END. "
                            "The check fills the tray itself, with other cookies.")

    # Stop a program that prints forever, too, not only one that runs forever.
    cap = (
        "import ast, os, sys\n"
        "class _Cap:\n"
        "    def __init__(self, real):\n"
        "        self.real, self.n = real, 0\n"
        "    def write(self, text):\n"
        "        self.n += len(text)\n"
        "        if self.n > 20000:\n"
        "            self.real.flush()\n"
        "            os._exit(3)\n"
        "        return self.real.write(text)\n"
        "    def flush(self):\n"
        "        self.real.flush()\n"
        "sys.stdout = _Cap(sys.stdout)\n"
        "exec(compile(sys.argv[1], 'your lines', 'exec'), {'__name__': '__main__', 'tray': ast.literal_eval(sys.argv[2])})\n"
    )

    def expected(cookies):
        good, lines = 0, []
        for c in cookies:
            if c == "burnt":
                continue
            if c == "SMOKE":
                lines.append("Smoke alarm!")
                break
            good += 1
        else:
            lines.append("No smoke")
        return lines + ["Good cookies: " + str(good)]

    trays = [
        ["ok", "burnt", "ok", "SMOKE", "ok"],
        ["ok", "burnt", "ok"],
        ["SMOKE", "ok", "ok"],
        ["ok", "burnt", "ok", "ok", "SMOKE", "burnt", "SMOKE"],
        ["burnt", "burnt"],
        [],
    ]
    for number, cookies in enumerate(trays, 1):
        try:
            done = subprocess.run([sys.executable, "-c", cap, your_code, repr(cookies)],
                                  capture_output=True, text=True, timeout=5)
        except subprocess.TimeoutExpired:
            return ("HINT: With tray = " + repr(cookies) + " your loop never ended, so it was "
                    "stopped after 5 seconds. Use a for loop:  for cookie in tray:  "
                    "It ends by itself after the last cookie.")
        printed = done.stdout
        if number == 1:
            print("Your lines printed, with the tray in the file:")
            print("\n".join("  " + line for line in printed.splitlines()[:12]) or "  (nothing)")
            print()
        if done.returncode == 3:
            return "HINT: Your loop printed forever, so it was stopped. Use  for cookie in tray:"
        if done.returncode != 0:
            last = (done.stderr.strip().splitlines() or ["an error"])[-1]
            return ("HINT: With tray = " + repr(cookies) + " Python stopped with an error: "
                    + last + "  Read it from the bottom up (lesson 4).")

        lines = [line.rstrip() for line in printed.splitlines() if line.strip()]
        want = expected(cookies)
        if lines == want:
            continue
        shown = ("With tray = " + repr(cookies) + " you printed:\n  "
                 + "\n  ".join(lines or ["(nothing)"]) + "\nIt should be:\n  " + "\n  ".join(want) + "\n")
        has_smoke = "SMOKE" in cookies
        if has_smoke and lines.count("Smoke alarm!") > 1:
            return ("HINT: " + shown + "Smoke alarm! came more than once, so the loop went on "
                    "after the smoke. Put break under the print, inside the SMOKE if.")
        if has_smoke and "No smoke" in lines:
            return ("HINT: " + shown + "No smoke was printed, but there was smoke. Is your else "
                    "lined up with the for (no spaces in front)? Lined up with an if, it runs "
                    "for every cookie that is not SMOKE. And is there a break in the SMOKE if?")
        if has_smoke and "Smoke alarm!" not in lines:
            return ("HINT: " + shown + "Inside the loop, check  if cookie == \"SMOKE\":  and "
                    "under it print(\"Smoke alarm!\") and then break.")
        if not has_smoke and "No smoke" not in lines:
            return ("HINT: " + shown + "There was no smoke, so the loop never broke. Add  else:  "
                    "lined up with for, and under it print(\"No smoke\").")
        if not has_smoke and lines.count("No smoke") > 1:
            return ("HINT: " + shown + "No smoke came more than once. The else belongs to the "
                    "for, at the left edge, not inside the loop.")
        count_lines = [line for line in lines if line.startswith("Good cookies")]
        if len(count_lines) != 1:
            return ("HINT: " + shown + "Print the count ONCE, after the loop, at the left edge: "
                    "print(f\"Good cookies: {good}\")")
        if "burnt" in cookies and count_lines[0] != want[-1]:
            counted_burnt = expected([c for c in cookies if c != "burnt"])[-1]
            if count_lines[0] != counted_burnt:
                return ("HINT: " + shown + "The count is off. Did you count the burnt ones? A burnt "
                        "cookie must skip  good += 1  with continue, so put that if ABOVE the counting line.")
        return ("HINT: " + shown + "Check the order: Smoke alarm! or No smoke first, then "
                "Good cookies: last.")

    kinds = {type(node).__name__ for node in ast.walk(tree)}
    if "Continue" not in kinds:
        return ("HINT: Every tray is right. Now use continue for the burnt cookies, as the lesson "
                "does:  if cookie == \"burnt\":  then  continue  pushed in under it.")
    if "Break" not in kinds:
        return "HINT: Every tray is right. Now stop at the smoke with break, as the lesson does."
    if not any(isinstance(node, ast.For) and node.orelse for node in ast.walk(tree)):
        return ("HINT: Every tray is right. Now print No smoke from an else that belongs to the "
                "for loop (lined up with for), not from a flag.")

    return ("PASS: 6 trays checked. Burnt cookies skipped, the smoke stopped the tray every time, "
            "and the clean trays rang the No smoke bell. Nice work, cook!")


verdict = _check()
print("-" * 40)
print(verdict)
