# Lesson 24 exercise: The ticket router
#
# Tickets come through the kitchen pass. Each ticket has a short code, and
# Kitchen Coach sends it to the right station. The code is in the jar
# order (it is filled for you, above the START line).
#
# Use match and case to print EXACTLY ONE of these lines, word for word:
#
#   "P"           ->  Pasta station
#   "C"           ->  Chili station
#   "S"           ->  Soup station
#   "R" or "F"    ->  Dessert station     (ONE case, joined with |)
#   anything else ->  Ask the waiter      (case _: at the very end)
#
# R is rice pudding for Chloe and F is fruit salad. They share one case:
#   case "R" | "F":
#
# Write each code in quotes. A plain name with no quotes, like  case pasta:
# catches every ticket instead of comparing.
# Do not set order yourself between START and END.
# This needs Python 3.10 or newer. You installed 3.15 in lesson 2.
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#   In a terminal you can also type:  python3 l24_ticket_router.py
#
# What happens when you run it, in two steps:
# - STEP 1. Your lines run once, for Ana's ticket, P.
# - STEP 2, THE CHECK. Your lines run again for every code, P, C, S, R and F,
#   and for three codes nobody planned for. Each time there must be exactly
#   one line, and the right one. The check says PASS, or gives you one hint.
# - If Python shows a SyntaxError instead, read it from the bottom up
#   (lesson 4). A missing colon or missing quotes are the usual cause.

order = "P"

# >>> START: write your lines below this line

match order:
    case "P":
        print("Pasta station")
    # add a case for "C" here
    # add a case for "S" here
    # add ONE case for "R" and "F" here, joined with |
    # add the catch-all, case _:, last

# <<< END: write your lines above this line


# ---------------------------------------------------------------------------
# STEP 2, THE CHECK. You do not need to read this part yet. It runs your lines
# again for many ticket codes and reads what was printed each time.
# ---------------------------------------------------------------------------
def _check():
    import ast
    import contextlib
    import io
    import pathlib

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your lines between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]
    tree = ast.parse(your_code)

    for node in ast.walk(tree):
        if isinstance(node, (ast.Assign, ast.AugAssign)):
            targets = node.targets if isinstance(node, ast.Assign) else [node.target]
            if any(isinstance(t, ast.Name) and t.id == "order" for t in targets):
                return ("HINT: Do not store a value in order between START and END. "
                        "The check fills that jar itself, with a different code each time.")

    matches = [n for n in ast.walk(tree) if isinstance(n, ast.Match)]
    if not matches:
        return ("HINT: Use match and case for this one. Start with  match order:  and "
                "put one case under it for each code.")

    cases = [
        ("P", "Pasta station"),
        ("C", "Chili station"),
        ("S", "Soup station"),
        ("R", "Dessert station"),
        ("F", "Dessert station"),
        ("X", "Ask the waiter"),
        ("p", "Ask the waiter"),
        ("", "Ask the waiter"),
    ]
    for code, want in cases:
        shown = '"' + code + '"'
        printed = io.StringIO()
        try:
            with contextlib.redirect_stdout(printed):
                exec(your_code, {"order": code})
        except Exception as error:
            return ("HINT: For the ticket " + shown + ", Python stopped with "
                    + type(error).__name__ + ": " + str(error))
        lines = [line for line in printed.getvalue().splitlines() if line.strip()]
        if len(lines) == 0:
            if want == "Ask the waiter":
                return ("HINT: For the unknown ticket " + shown + ", nothing was printed. "
                        "The ticket just vanished. Add  case _:  as the LAST case, with "
                        "print(\"Ask the waiter\") pushed in under it.")
            return ("HINT: For the ticket " + shown + ", nothing was printed. Add a case "
                    "for it that prints: " + want)
        if len(lines) > 1:
            return ("HINT: For the ticket " + shown + ", your program printed "
                    + str(len(lines)) + " lines:\n  " + "\n  ".join(lines) + "\n"
                    "Each ticket needs exactly one station. Use one match with cases, "
                    "not several separate ones.")
        got = lines[0]
        if got != want:
            if code == "p":
                return ("HINT: For the small letter ticket \"p\" you printed: " + got
                        + "\nA case compares exactly, and \"p\" is not \"P\". Here an "
                        "unknown code should go to the waiter.")
            return ("HINT: For the ticket " + shown + " you printed: " + got
                    + "\nIt should be, word for word: " + want)

    has_wild = any(isinstance(c.pattern, ast.MatchAs) and c.pattern.pattern is None
                   and c.pattern.name is None and c.guard is None
                   for m in matches for c in m.cases)
    if not has_wild:
        return ("HINT: Every answer is right. Now catch unknown codes with  case _:  as "
                "the last case, instead of listing them. That is the safety net this "
                "lesson is about.")
    has_or = any(isinstance(n, ast.MatchOr) for n in ast.walk(tree))
    if not has_or:
        return ("HINT: Every answer is right. Now join R and F into ONE case with a bar: "
                " case \"R\" | \"F\":  so the two dessert codes share one station door.")

    return ("PASS: 8 tickets, from Ana's pasta to a code nobody planned for, and every "
            "one went to exactly one station. The pass is running smoothly.")


print()
print("-" * 40)
print("STEP 2, THE CHECK: 8 tickets through the pass")
print(_check())
