# Lesson 25 exercise: Ana's training plan
#
# Ana is training for a half-marathon: about 21 km.
# This week her long run is 10 km. Every week she adds 2 km.
# How many weeks until her long run is at least 21 km?
#
# Use a while loop. Each round of the loop is one week:
#   - add 1 to weeks
#   - add 2 to km
#   - print the week, like:  Week 1: 12 km
# Keep going while km is less than 21.
#
# When it works, the program prints EXACTLY these 8 lines:
#
#   Start: 10 km
#   Week 1: 12 km
#   Week 2: 14 km
#   Week 3: 16 km
#   Week 4: 18 km
#   Week 5: 20 km
#   Week 6: 22 km
#   Ready after 6 weeks.
#
# The first and the last print are written for you. Do not type the week
# lines one by one: let the loop print them with an f-string.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l25_training_plan.py
# - Your lines run inside a safety net. If your loop never ends, it is
#   stopped after 5 seconds and you get a hint. (Outside this file, press
#   Ctrl+C in the terminal to stop a program that never ends.)
# - At the bottom you see PASS, or one hint that tells you what to change.

# Leave these 3 lines as they are. They start the check at the bottom of this
# file first, and the check runs your lines with a time limit.
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: write your lines below this line

km = 10      # Ana's long run this week, in km
weeks = 0    # weeks of training so far
print(f"Start: {km} km")

# Write your while loop here.

print(f"Ready after {weeks} weeks.")

# <<< END: write your lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes your lines from between
# START and END, runs them in a separate Python with a 5 second limit, shows
# what they printed, and then looks at it.
def _check():
    import subprocess
    import sys

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your loop between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    plain = "\n".join(line.split("#", 1)[0] for line in your_code.splitlines())

    # Stop a program that prints forever, too, not only one that runs forever.
    cap = (
        "import os, sys\n"
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
        "exec(compile(sys.argv[1], 'your lines', 'exec'), {'__name__': '__main__'})\n"
    )
    try:
        done = subprocess.run([sys.executable, "-c", cap, your_code],
                              capture_output=True, text=True, timeout=5)
    except subprocess.TimeoutExpired:
        return ("HINT: Your loop never ended, so it was stopped after 5 seconds. "
                "Inside the loop, km must grow each round (km += 2), "
                "so that km < 21 becomes False.")
    printed = done.stdout
    if done.returncode == 3:
        print("\n".join(printed.splitlines()[:8]))
        print("... (and on and on)")
        return ("HINT: Your loop printed forever, so it was stopped. "
                "Inside the loop, km must grow each round (km += 2), "
                "so that km < 21 becomes False.")
    print(printed, end="")
    if done.returncode != 0:
        last = (done.stderr.strip().splitlines() or ["an error"])[-1]
        return ("HINT: Python stopped with an error: " + last
                + "  Read the red text from the bottom up (lesson 4).")

    lines = [line.rstrip() for line in printed.splitlines()]
    want = (["Start: 10 km"] + [f"Week {w}: {10 + 2 * w} km" for w in range(1, 7)]
            + ["Ready after 6 weeks."])
    if "while" not in plain:
        return "HINT: Use a while loop:  while km < 21:  and push the lines it repeats in by 4 spaces."
    if "Week 1" in plain or "Week 2" in plain:
        return ('HINT: Let the loop print the weeks. Write ONE print inside the loop: '
                'print(f"Week {weeks}: {km} km")')
    if lines == want:
        return "PASS: 6 weeks of training, from 10 km to 22 km. Ana is ready for her half-marathon!"

    weeks_printed = [line for line in lines if line.startswith("Week")]
    if not weeks_printed:
        return ('HINT: No week lines were printed yet. Inside the loop, add 1 to weeks, '
                'add 2 to km, then print(f"Week {weeks}: {km} km").')
    if weeks_printed == want[1:7] and lines[-1] != want[-1]:
        return "HINT: The weeks are right. The last line should be exactly: Ready after 6 weeks."
    if len(weeks_printed) < 6:
        return ("HINT: Your loop stopped after " + str(len(weeks_printed))
                + " weeks, too early. Keep going while km is less than 21:  while km < 21:")
    if len(weeks_printed) > 6:
        return ("HINT: Your loop ran " + str(len(weeks_printed))
                + " weeks, one too many or more. Ana reaches 22 km in week 6. "
                "Check the question: while km < 21:")
    for got, should in zip(weeks_printed, want[1:7]):
        if got != should:
            return ("HINT: You printed  " + got + "  but this line should be  " + should
                    + "  Add 1 to weeks and 2 to km BEFORE the print, inside the loop.")
    return "HINT: Compare your lines with the 8 lines in the comment at the top. Each must match exactly."


verdict = _check()
print("-" * 40)
print(verdict)
