# Lesson 52 exercise: Read the smoke
#
# Friday night. Kitchen Coach burnt four dishes, one after another.
# The smoke alarm is going. Your job is NOT to fix the dishes (that comes in
# lesson 53). Your job is to READ each traceback, like a detective:
#
#   1. Read the LAST line first. The word before the colon is the
#      exception TYPE, for example  ValueError
#   2. Read the File line just above it. Its line number is the line
#      where the dish BURNT.
#
# Each time you run this file, it cooks the first dish you have not solved
# yet and shows you its smoke. Write what you read between START and END:
#
#   type_1 = "ValueError"    <- the type, in quotes, spelled exactly
#   line_1 = 12              <- the line where it burnt, a plain number
#
# Save, run again, and the next dish starts to smoke. Four dishes, then PASS.
#
# The line numbers are the ones VS Code shows on the left of this file.
# Careful with dish 3: its trail is long. Read it from the bottom.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l52_read_the_smoke.py
# - If Python shows a SyntaxError instead, you broke a quote mark or a line
#   between START and END. Read it from the bottom up (lesson 4), fix it.

# ===== KITCHEN COACH (do not change anything down to START) =====
protein = {"tofu": 17, "lentils": 9, "eggs": 13}


def servings_from(answer):
    return int(answer)


def kcal_per_guest(total_kcal, guests):
    return total_kcal / guests


def protein_of(food):
    return protein[food]


def plate_protein(plate):
    total = 0
    for food in plate:
        total += protein_of(food)
    return total


def kcal_of(grams, per_100g):
    print(f"{grams * per_100g / 100} kcal")


def lunch_kcal():
    return kcal_of(150, 144) + kcal_of(200, 116)


def cook(dish):
    if dish == 1:
        servings_from("two")               # Ana typed a word
    elif dish == 2:
        kcal_per_guest(2400, 0)            # nobody has said yes yet
    elif dish == 3:
        plate_protein(["tofu", "quinoa"])  # Ben's plate
    elif dish == 4:
        lunch_kcal()                       # tofu and lentils


# >>> START: write your answers below this line

type_1 = ""
line_1 = 0

type_2 = ""
line_2 = 0

type_3 = ""
line_3 = 0

type_4 = ""
line_4 = 0

# <<< END: write your answers above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It cooks one dish in a separate
# Python, so you see the real smoke, then compares it with your answers.
def _smoke(dish):
    import subprocess
    import sys
    done = subprocess.run([sys.executable, __file__, "--cook", str(dish)],
                          capture_output=True, text=True, timeout=10)
    lines = done.stderr.rstrip().splitlines()
    name = __file__.replace("\\", "/").rsplit("/", 1)[-1]
    frames = []
    for text in lines:
        text = text.strip()
        if text.startswith("File ") and name in text and ", line " in text:
            frames.append(int(text.split(", line ")[1].split(",")[0]))
    kind = lines[-1].split(":")[0].strip() if lines else ""
    return done.stdout, done.stderr.rstrip(), kind, frames


def _check():
    g = globals()
    yours = {d: (g.get(f"type_{d}", ""), g.get(f"line_{d}", 0)) for d in (1, 2, 3, 4)}
    solved = []
    for dish in (1, 2, 3, 4):
        printed, smoke, kind, frames = _smoke(dish)
        burnt = frames[-1] if frames else 0
        your_type, your_line = yours[dish]
        if your_type == kind and your_line == burnt:
            solved.append(dish)
            continue

        print(f"SMOKE ALARM: dish {dish} of 4 is burning." + (f" Solved so far: dish {', '.join(map(str, solved))}." if solved else ""))
        print("-" * 60)
        if printed:
            print(printed.rstrip())
        print(smoke)
        print("-" * 60)

        tn, ln = f"type_{dish}", f"line_{dish}"
        if not isinstance(your_type, str):
            return f'HINT: {tn} must be text in quote marks, like  {tn} = "ValueError"'
        if your_type == "":
            return (f"HINT: {tn} is still empty. Read the very LAST line of the smoke above. "
                    f'The word before the colon is the type. Write it in quotes:  {tn} = "..."')
        if your_type != kind:
            if ":" in your_type:
                return f"HINT: Only the name before the colon goes in {tn}, not the message after it."
            if your_type.lower() == kind.lower():
                return f"HINT: Nearly. Python is fussy about capitals. Copy the type exactly as it is spelled in the last line."
            return (f'HINT: {tn} = "{your_type}", but that is not what this dish says. '
                    "Read the LAST line of this smoke, not another dish's.")
        if isinstance(your_line, bool) or not isinstance(your_line, int):
            return f"HINT: {ln} must be a plain number with no quote marks, like  {ln} = 12"
        if your_line == 0:
            return (f"HINT: The type is right. Now {ln}: read the File line just ABOVE the last "
                    "lines. Its line number is where it burnt.")
        if your_line in frames:
            return (f"HINT: Line {your_line} is on the trail, but higher up. That line CALLED another "
                    "card. Walk down to the LOWEST File line: that is where it burnt.")
        return (f"HINT: {ln} = {your_line}, but that line is not in the smoke at all. "
                "Find the lowest  File ..., line N  and use that N.")

    return ("PASS: Four dishes, four smoke notes, all read from the bottom. The last line names "
            "the problem, and the File line above it says where it burnt.")


if __name__ == "__main__":
    import sys
    if len(sys.argv) == 3 and sys.argv[1] == "--cook":
        cook(int(sys.argv[2]))
    else:
        print(_check())
